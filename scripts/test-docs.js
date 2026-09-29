'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { sourceDocs, resolveScript, auditScriptReferences, auditRetiredReferences } = require('./audit-docs');
const { copyScenarioAssets, detectScenarioProblems, loadScenarioRegistry, scenarioOutput } = require('../docs/build');
const ROOT = path.resolve(__dirname, '..');

test('guide anchors retain explicit IDs and support section deep links', () => {
  const window = { location: { hash: '#recover-an-interrupted-write' } };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'docs/assets/js/core.js'), 'utf8'), {
    window,
    document: { addEventListener() {} },
    CSS: { escape: (value) => value },
    requestAnimationFrame: (callback) => callback(),
  });
  let scrolled = false;
  const headings = [
    { textContent: 'Recover an interrupted write', id: '', scrollIntoView() { scrolled = true; } },
    { textContent: 'Other heading', id: 'explicit-anchor' },
  ];
  const container = {
    querySelectorAll: () => headings,
    querySelector: (selector) => headings.find((heading) => '#' + heading.id === selector),
  };
  window.FP.ensureGuideAnchors(container);
  assert.equal(headings[0].id, 'recover-an-interrupted-write');
  assert.equal(headings[1].id, 'explicit-anchor');
  window.FP.scrollToGuideAnchor(container);
  assert.equal(scrolled, true);
});

test('documentation audit includes every scenario and the shared guidance', () => {
  const files = new Set(sourceDocs().map((file) => path.relative(ROOT, file)));
  for (const scenario of loadScenarioRegistry()) {
    for (const file of ['README.md', scenario.slides, scenario.accelerator, ...scenario.lessons.map((lesson) => lesson.path)]) {
      assert.ok(files.has(path.relative(ROOT, path.join(scenario.root, file))), file);
    }
  }
  assert.ok(files.has('PRODUCT.md'));
  assert.ok(files.has('scenarios/README.md'));
});

test('root-relative scenario scripts resolve from nested guides, with or without ./', () => {
  for (const scenario of loadScenarioRegistry()) {
    const doc = path.join(scenario.root, scenario.accelerator);
    const script = path.relative(ROOT, path.join(scenario.root, 'accelerator/scripts/deploy.sh'));
    for (const prefix of ['', './']) {
      assert.equal(resolveScript(doc, prefix + script, false).existing, path.join(ROOT, script));
    }
    assert.equal(resolveScript(doc, 'scripts/deploy.sh', true).existing, path.join(ROOT, script));
  }
});

test('scenario validation rejects missing, reordered and mismatched module IDs', () => {
  const scenario = loadScenarioRegistry()[0];
  assert.deepEqual(detectScenarioProblems([scenario]), []);
  const variants = [
    scenario.build_modules.slice(1),
    [...scenario.build_modules].reverse(),
    scenario.build_modules.map((module, index) => index ? module : { ...module, id: 'wrong-lesson' }),
  ];
  for (const build_modules of variants) {
    assert.ok(detectScenarioProblems([{ ...scenario, build_modules }])
      .some((problem) => problem.includes('matching IDs and order')));
  }
});

test('scenario modules cannot declare activity prerequisites', () => {
  for (const scenario of loadScenarioRegistry()) {
    assert.ok(scenario.build_modules.every((module) => !Object.hasOwn(module, 'activity_id')));
    const build_modules = scenario.build_modules.map((module, index) =>
      index ? module : { ...module, activity_id: 'foundations' });
    assert.ok(detectScenarioProblems([{ ...scenario, build_modules }])
      .some((problem) => problem.includes('references a retired activity')));
  }
});

test('lessons cannot link to retired activities, including optional sections', () => {
  const original = loadScenarioRegistry()[0];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scenario-continuity-'));
  try {
    const lesson = original.lessons[0];
    const target = path.join(dir, lesson.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const scenario = { ...original, root: dir, lessons: [lesson], build_modules: [original.build_modules[0]] };
    const link = '[Required build](../../../activities/foundations/README.md)';
    const errors = () => detectScenarioProblems([scenario]).filter((problem) =>
      problem.includes('links to a retired activity'));
    fs.writeFileSync(target, `## Implementation\n${link}\n`);
    assert.equal(errors().length, 1);
    fs.writeFileSync(target, `## Optional reference\n${link}\n## Next module\nContinue.`);
    assert.equal(errors().length, 1);
    fs.writeFileSync(target, `## Optional reference\nBackground.\n## Implementation\n${link}\n`);
    assert.equal(errors().length, 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('retired workshop files and published routes stay removed', () => {
  for (const retired of [
    'activities', 'resources', 'scripts/action-backend',
    'scripts/setup-foundations.sh', 'scripts/validate-foundations.py', 'scripts/cleanup.sh',
    'docs/activities', 'docs/activity.html', 'docs/reference.html', 'docs/assets/js/activity.js',
    'docs/assets/js/catalog.js', 'docs/assets/data/activities',
    'docs/assets/data/dependency-graph.json', 'docs/resources',
    'docs/index.md', 'docs/idea-forge.md', 'docs/resources.md',
    'docs/assets/css/just-the-docs-default.scss',
  ]) {
    assert.equal(fs.existsSync(path.join(ROOT, retired)), false, retired);
  }
  const platform = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/assets/data/platform.json'), 'utf8'));
  assert.deepEqual(Object.keys(platform), ['scenarios']);
  assert.deepEqual(platform.scenarios, loadScenarioRegistry().map(scenarioOutput));
  assert.ok(platform.scenarios.every((scenario) => scenario.build_modules.every((module) =>
    !Object.hasOwn(module, 'activity_path'))));
});

test('documentation audit rejects retired links and bootstrap commands', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retired-docs-'));
  const doc = path.join(dir, 'README.md');
  try {
    for (const text of [
      '[Library](reference.html)', '[Example](activities/foundations/README.md)',
      'bash scripts/setup-foundations.sh', 'npm run test:activities',
    ]) {
      fs.writeFileSync(doc, text);
      const failures = [];
      auditRetiredReferences([doc], failures);
      assert.equal(failures.length, 1, text);
    }
  } finally {
    fs.unlinkSync(doc);
    fs.rmdirSync(dir);
  }
});

test('documentation audit rejects retired repository and Pages links', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retired-repository-docs-'));
  const doc = path.join(dir, 'README.md');
  try {
    for (const text of [
      'https://github.com/microsoft/agentic-cobuild',
      'https://codespaces.new/microsoft/agentic-cobuild',
      'https://microsoft.github.io/agentic-cobuild/index.html',
    ]) {
      fs.writeFileSync(doc, text);
      const failures = [];
      auditRetiredReferences([doc], failures);
      assert.equal(failures.length, 1, text);
    }
  } finally {
    fs.unlinkSync(doc);
    fs.rmdirSync(dir);
  }
});

test('build rejects missing scenario accelerators', () => {
  const scenario = loadScenarioRegistry()[0];
  const failures = detectScenarioProblems([{ ...scenario, accelerator: 'missing.md' }]);
  assert.ok(failures.some((problem) => problem.includes('accelerator missing.md missing')));
});

test('source script checks reject undocumented flags', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentic-cobuild-docs-test-'));
  const doc = path.join(dir, 'README.md');
  try {
    fs.writeFileSync(doc, 'Run from the repository root.\n```bash\npython scripts/audit-diagrams.py --strict-bindings\n```\n');
    const valid = [];
    auditScriptReferences([doc], valid);
    assert.deepEqual(valid, []);

    fs.writeFileSync(doc, 'Run from the repository root.\n```bash\npython scripts/audit-diagrams.py --unsupported-flag\n```\n');
    const invalid = [];
    auditScriptReferences([doc], invalid);
    assert.equal(invalid.length, 1);
    assert.match(invalid[0], /documented flag --unsupported-flag is not handled/);
  } finally {
    fs.unlinkSync(doc);
    fs.rmdirSync(dir);
  }
});

test('scenario publication excludes private state but retains fixtures and source', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scenario-publication-'));
  const source = path.join(dir, 'source');
  const output = path.join(dir, 'output');
  fs.mkdirSync(source);
  const privateFiles = ['.env', '.env.local', 'tasks.sqlite3', 'tools.sqlite3-wal',
    'tasks.db-journal', 'run.log', 'actions.journal', '.deployment-outputs.json'];
  const publicFiles = ['.env.sample', 'records.json', 'runtime.py', 'diagram.png', 'main.bicep'];
  try {
    for (const name of [...privateFiles, ...publicFiles]) fs.writeFileSync(path.join(source, name), name);
    for (const name of ['__pycache__', '.venv', '.runtime', 'journals']) {
      fs.mkdirSync(path.join(source, name));
      fs.writeFileSync(path.join(source, name, 'private.txt'), 'not for publication');
    }
    copyScenarioAssets([{ root: source, id: 'example' }], output);
    const published = fs.readdirSync(path.join(output, 'example')).sort();
    assert.deepEqual(published, publicFiles.sort());
  } finally {
    fs.rmSync(source, { recursive: true, force: true });
    fs.rmSync(output, { recursive: true, force: true });
    fs.rmdirSync(dir);
  }
});

test('Operational Agents has eight linked modules and all public entry points', () => {
  const scenario = loadScenarioRegistry().find((item) => item.id === 'operational-agents');
  assert.ok(scenario);
  assert.equal(scenario.order, 4);
  assert.equal(scenario.lessons.length, 8);
  assert.deepEqual(detectScenarioProblems([scenario]), []);
  const slides = fs.readFileSync(path.join(scenario.root, scenario.slides), 'utf8');
  for (const lesson of scenario.lessons) {
    for (const kind of ['context', 'choices', 'evidence']) {
      assert.ok(slides.includes(`slide:id=lesson-${lesson.id}-${kind}`));
    }
  }
  assert.ok(fs.readFileSync(path.join(ROOT, 'docs/index.html'), 'utf8').includes('scenario.html?id=operational-agents'));
});

test('home page offers a distinct custom co-build route', () => {
  const homeScript = fs.readFileSync(path.join(ROOT, 'docs/assets/js/home.js'), 'utf8');
  assert.match(homeScript, /Fully custom scenario/);
  assert.match(homeScript, /Microsoft Cloud Solution Architect/);
  assert.match(homeScript, /outcome-card-custom/);
});

test('intake skills cover every scenario track and the Start page links both', () => {
  const forge = fs.readFileSync(path.join(ROOT, '.github/skills/customer-activity-forge/SKILL.md'), 'utf8');
  for (const scenario of loadScenarioRegistry()) {
    assert.ok(forge.includes(`**${scenario.name}**`), scenario.name);
    assert.ok(forge.includes(`scenario.html?id=${scenario.id}`), scenario.id);
  }
  assert.match(forge, /use-case-mapper/);
  assert.ok(fs.existsSync(path.join(ROOT, '.github/skills/use-case-mapper/SKILL.md')));
  const start = fs.readFileSync(path.join(ROOT, 'docs/start.html'), 'utf8');
  assert.ok(start.includes('id="idea-forge"') && start.includes('id="use-case-mapper"'));
});

test('diagram branches keep refusals separate and require approval after review', () => {
  const edges = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, 'scenarios', file), 'utf8'))
    .elements.filter((element) => element.type === 'arrow')
    .map((element) => [element.startBinding?.elementId, element.endBinding?.elementId].join('->'));
  const claims = edges('avatar-onboarding/diagrams/04-grounded-assistant-boundary.excalidraw');
  assert.ok(claims.includes('gate->answer'));
  assert.ok(claims.includes('gate->refuse'));
  assert.ok(!claims.includes('answer->refuse'));
  const review = edges('content-understanding/diagrams/05-human-review-handoff.excalidraw');
  for (const edge of ['gate->review', 'gate->clean', 'review->approval', 'clean->approval']) {
    assert.ok(review.includes(edge), edge);
  }
  const surface = edges('ai-grounding/diagrams/08-surface-decision.excalidraw');
  assert.ok(surface.includes('plain->adapter'));
  assert.ok(surface.includes('agent->adapter'));
});

test('customer pages display modules while keeping existing routes and slide links', async () => {
  const scenario = scenarioOutput(loadScenarioRegistry().find((item) => item.id === 'avatar-scenario'));
  const lesson = scenario.lessons[1];
  for (const page of ['lesson', 'scenario']) {
    const elements = new Map();
    let init;
    const element = (id) => {
      if (!elements.has(id)) elements.set(id, {
        textContent: '', innerHTML: '', href: '',
        querySelectorAll: () => [],
      });
      return elements.get(id);
    };
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, `docs/assets/js/${page}.js`), 'utf8'), {
      document: {
        title: '',
        addEventListener: (event, callback) => { if (event === 'DOMContentLoaded') init = callback; },
        getElementById: element,
      },
      FP: {
        qp: (key) => ({ scenario: scenario.id, lesson: lesson.id, id: scenario.id })[key],
        loadData: async () => ({ scenarios: [scenario] }),
        esc: String,
        levelBadge: () => '',
        durBadge: () => '',
        renderMd() {},
        applyGuideAccordions() {},
        initDiagramZoom() {},
      },
      fetch: async () => ({ ok: true, text: async () => '# Module content' }),
    });
    await init();
    if (page === 'lesson') {
      assert.match(element('lessonEyebrow').textContent, /module 2/);
      assert.match(element('lessonBreadcrumbs').innerHTML, /Module 2/);
      assert.match(element('lessonBottomPager').innerHTML, /Previous module/);
      assert.match(element('lessonBottomPager').innerHTML, /Next module/);
      assert.ok(element('lessonBottomPager').innerHTML.includes(scenario.lessons[2].lesson_path));
      assert.equal(element('lessonSlidesLink').href, `slides.html?id=${scenario.id}#lesson-${lesson.id}`);
      assert.match(element('lessonSummary').textContent, /your tenant/);
    } else {
      assert.match(element('scenarioMeta').innerHTML, /7 modules/);
      assert.match(element('scenarioPager').innerHTML, /Module 1:/);
      assert.ok(element('scenarioPager').innerHTML.includes(scenario.lessons[0].lesson_path));
    }
  }
});

test('module prose keeps decision-first guidance and explicit tenant delivery boundaries', () => {
  const avatar = path.join(ROOT, 'scenarios/avatar-onboarding/lessons');
  const decision = fs.readFileSync(path.join(avatar, '01-experience-selection.md'), 'utf8');
  assert.doesNotMatch(decision, /```|api-version=|batchsyntheses|AvatarConfig/);
  assert.match(decision, /## What you build/);
  assert.match(decision, /## Verify/);
  const generation = fs.readFileSync(path.join(avatar, '05-experience-generation.md'), 'utf8');
  assert.match(generation, /wording approved in module 3/);
  assert.match(generation, /### Option E — Translate an existing video/);
  const publication = fs.readFileSync(path.join(avatar, '06-approval-gating.md'), 'utf8');
  assert.match(publication, /actual publishing operation and user channel/);
  for (const scenario of loadScenarioRegistry()) {
    for (const lesson of scenario.lessons) {
      const body = fs.readFileSync(path.join(scenario.root, lesson.path), 'utf8');
      assert.match(body, /^# Module \d+/);
      assert.match(body, /## Next module/);
      const prose = body.replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]*`|\]\([^)]*\)|https?:\/\/\S+|<!--[\s\S]*?-->/g, '');
      assert.doesNotMatch(prose, /\blessons?\b/i, lesson.path);
    }
  }
});

test('avatar guidance selects an application before rendering and requires a working delivery', () => {
  const root = path.join(ROOT, 'scenarios/avatar-onboarding');
  const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
  const decision = read('lessons/01-experience-selection.md');
  const applicationHeading = decision.indexOf('### First choose the application goal');
  const presentationHeading = decision.indexOf('### Then choose how the application presents content');
  assert.ok(applicationHeading >= 0 && presentationHeading > applicationHeading);
  for (const file of ['README.md', 'lessons/01-experience-selection.md', 'slides.md', 'accelerator/facilitator-reference.md']) {
    const body = read(file);
    assert.match(body, /interactive assistant/i, file);
    assert.match(body, /content-production application/i, file);
    assert.doesNotMatch(body, /recommended starting path is.*prerecorded|batch.video default/i, file);
  }
  const manifest = JSON.parse(read('manifest.json'));
  assert.match(manifest.decision_prompts[0], /interactive assistant.*content-production application/);
  assert.match(manifest.build_modules[0].summary, /before selecting a media format/);
  assert.match(manifest.build_modules.at(-1).outcome, /generated video alone is insufficient/);
  const generation = read('lessons/05-experience-generation.md');
  assert.doesNotMatch(generation, /Batch avatar synthesis[^\n]*default|Default: Option A/i);
  assert.match(generation, /Retain its state across restarts/);
  const operation = read('lessons/07-prove-and-operate.md');
  assert.match(operation, /complete source-update cycle/);
  assert.match(operation, /without duplicate publication/);
  assert.match(operation, /One generated video is only an integration check/);
  const diagram = JSON.parse(read('diagrams/01-experience-capability-choice.excalidraw'));
  const batch = diagram.elements.find((element) => element.id === 'batch-label');
  assert.match(batch.text, /Workflow jobs/);
  assert.doesNotMatch(batch.text, /default/i);
  assert.equal(batch.text, batch.originalText);
});
