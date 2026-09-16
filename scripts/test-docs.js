'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { sourceDocs, resolveScript, auditScriptReferences } = require('./audit-docs');
const { copyScenarioAssets, detectMissingReferences, detectScenarioProblems, loadScenarioRegistry, transformMarkdown } = require('../docs/build');
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
  assert.ok(files.has('resources/sample-data/university-faq/README.md'));
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

test('generated activity guides route activity and source-code links', () => {
  const output = transformMarkdown(
    '[Code](validate.py)\n[Activity](../foundations/README.md)\n[Environment](../../.env.sample)',
    { id: 'advanced-action-tools', participant: 'activities/advanced-action-tools/README.md' },
  );
  assert.ok(output.includes('/blob/main/activities/advanced-action-tools/validate.py'));
  assert.ok(output.includes('activity.html?id=foundations'));
  assert.ok(output.includes('/blob/main/.env.sample'));
});

test('activity links to scenarios use manifest IDs rather than folder names', () => {
  const output = transformMarkdown(
    '[Operations](../../scenarios/operational-agents/README.md)\n' +
    '[Avatar](../../scenarios/avatar-onboarding/README.md#working-contract)',
    { id: 'advanced-action-tools', participant: 'activities/advanced-action-tools/README.md' },
  );
  assert.ok(output.includes('](scenario.html?id=operational-agents)'));
  assert.ok(output.includes('](scenario.html?id=avatar-scenario#working-contract)'));
});

test('build rejects a missing guide before writing generated output', () => {
  assert.deepEqual(detectMissingReferences([
    { id: 'example', participant: 'README.md' },
  ], [], []), []);
  for (const participant of [undefined, 'activities/does-not-exist/README.md']) {
    const errors = detectMissingReferences([{ id: 'example', participant }], [], []);
    assert.equal(errors.length, 1);
    assert.match(errors[0], /missing or empty guide/);
  }
});

test('source script checks reject undocumented flags', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'starter-kit-docs-test-'));
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
  for (const page of ['docs/index.html', 'docs/reference.html']) {
    assert.ok(fs.readFileSync(path.join(ROOT, page), 'utf8').includes('scenario.html?id=operational-agents'));
  }
});
