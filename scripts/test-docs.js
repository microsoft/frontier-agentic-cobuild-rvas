'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { audit, sourceDocs, checkLink } = require('./audit-docs');
const { pages, renderIndex, renderPage } = require('../docs/build');
const ROOT = path.resolve(__dirname, '..');

function guideInteraction(language, command, writeText) {
  const children = [];
  const timers = new Map();
  let nextTimer = 0;
  const heading = { tagName: 'H3', textContent: 'Your application workspace' };
  const pre = {
    previousElementSibling: heading,
    prepend: (child) => children.unshift(child),
    appendChild: (child) => children.push(child),
  };
  const code = { parentElement: pre, textContent: command, classList: [`language-${language}`] };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'docs/assets/js/guide.js'), 'utf8'), {
    document: {
      querySelectorAll: () => [code],
      createElement: () => ({
        dataset: {},
        attributes: {},
        listeners: {},
        textContent: '',
        setAttribute(name, value) { this.attributes[name] = value; },
        removeAttribute(name) { delete this.attributes[name]; },
        addEventListener(name, callback) { this.listeners[name] = callback; },
      }),
    },
    navigator: { clipboard: writeText ? { writeText } : undefined },
    setTimeout(callback) { timers.set(++nextTimer, callback); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
  });
  return {
    code,
    button: children.find((child) => child.className === 'copy-command'),
    status: children.find((child) => child.className === 'copy-status'),
    label: children.find((child) => child.className === 'command-label'),
    timers,
  };
}

test('copying preserves the exact command and announces its destination', async () => {
  for (const [language, command, destination] of [
    ['bash', 'git init\n', /terminal/],
    ['json', '{\n  "existing": true\n}\n', /existing settings/],
    ['text', '/agentic-cobuild:ai-agent-creator Design an application.\n', /application workspace/],
    ['text', 'Implement the attached plan.\n', /new session.*approved architecture files/],
  ]) {
    let copied;
    const interaction = guideInteraction(language, command, async (text) => { copied = text; });
    await interaction.button.listeners.click();
    assert.equal(copied, command);
    assert.equal(interaction.code.textContent, command);
    assert.match(interaction.status.textContent, destination);
    assert.equal(interaction.status.attributes.role, 'status');
    assert.match(interaction.button.attributes['aria-label'], /Your application workspace/);
    assert.equal(interaction.button.dataset.state, 'copied');
    assert.equal(interaction.button.attributes['aria-disabled'], undefined);
    [...interaction.timers.values()][0]();
    assert.equal(interaction.status.textContent, '');
    assert.equal(interaction.button.dataset.state, undefined);
  }
});

test('copying ignores duplicate requests while pending and replaces old reset timers', async () => {
  let resolveCopy;
  let calls = 0;
  const { button, timers, status } = guideInteraction('bash', 'git init\n', () => {
    calls++;
    return new Promise((resolve) => { resolveCopy = resolve; });
  });
  const pending = button.listeners.click();
  assert.equal(button.attributes['aria-disabled'], 'true');
  assert.equal(button.dataset.state, 'pending');
  await button.listeners.click();
  assert.equal(calls, 1);
  resolveCopy();
  await pending;
  const oldTimer = [...timers.keys()][0];
  const repeated = button.listeners.click();
  assert.equal(timers.has(oldTimer), false);
  assert.equal(status.textContent, '');
  resolveCopy();
  await repeated;
  assert.equal(calls, 2);
  assert.equal(timers.size, 1);
  assert.equal(button.dataset.state, 'copied');
});

test('clipboard rejection exposes recovery and a subsequent copy can succeed', async () => {
  let fail = true;
  const { button, status, code } = guideInteraction('bash', 'git init\n', async () => {
    if (fail) throw new Error('Permission denied');
  });
  await button.listeners.click();
  assert.equal(button.dataset.state, 'error');
  assert.match(status.textContent, /Select the code and copy it manually/);
  assert.equal(code.textContent, 'git init\n');
  fail = false;
  await button.listeners.click();
  assert.equal(button.dataset.state, 'copied');
  assert.match(status.textContent, /Paste into your terminal/);

  const unavailable = guideInteraction('bash', 'git init\n');
  await unavailable.button.listeners.click();
  assert.equal(unavailable.button.dataset.state, 'error');
  assert.match(unavailable.status.textContent, /copy it manually/);
});

test('reading-section permalinks resolve without changing their heading IDs', () => {
  for (const page of pages) {
    const html = renderPage(page);
    const headings = [...html.matchAll(/<h[23] id="([^"]+)">([\s\S]*?)<\/h[23]>/g)];
    assert.ok(headings.length);
    for (const [, id, body] of headings) {
      assert.ok(body.includes(`class="heading-link" href="#${id}"`), id);
      assert.match(body, /aria-label="Link to [^"]+"/);
    }
  }
});

test('mobile navigation restores focus on Escape and closes when focus leaves the toggle', () => {
  const listeners = {};
  const toggle = {
    attributes: {},
    dataset: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    focus() { this.focused = true; },
  };
  const classes = new Set();
  const links = {
    listeners: {},
    classList: {
      contains: (name) => classes.has(name),
      remove: (name) => classes.delete(name),
      toggle(name) {
        if (classes.has(name)) { classes.delete(name); return false; }
        classes.add(name);
        return true;
      },
    },
    contains: (target) => target === links,
    addEventListener(name, callback) { this.listeners[name] = callback; },
  };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'docs/assets/js/shell.js'), 'utf8'), {
    window: { matchMedia: () => ({ matches: true }) },
    document: {
      readyState: 'complete',
      querySelector: (selector) => selector === '.nav-toggle' ? toggle : links,
      querySelectorAll: () => [],
      addEventListener: (name, callback) => { listeners[name] = callback; },
    },
  });
  toggle.listeners.click();
  assert.equal(toggle.attributes['aria-label'], 'Close navigation');
  listeners.keydown({ key: 'Escape' });
  assert.equal(toggle.focused, true);
  assert.equal(toggle.attributes['aria-expanded'], 'false');
  assert.equal(toggle.attributes['aria-label'], 'Open navigation');
  toggle.listeners.click();
  links.listeners.focusout({ relatedTarget: toggle });
  assert.equal(toggle.attributes['aria-expanded'], 'true');
  toggle.listeners.focusout({ relatedTarget: {} });
  assert.equal(toggle.attributes['aria-expanded'], 'false');
});

test('plugin and marketplace resolve the same complete portable package', () => {
  const marketplace = require('../.github/plugin/marketplace.json');
  const plugin = marketplace.plugins[0];
  const directory = path.resolve(ROOT, plugin.source);
  const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'plugin.json')));
  assert.equal(metadata.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
  assert.equal(metadata.name, plugin.name);
  assert.equal(metadata.version, plugin.version);
  assert.equal(metadata.repository, 'https://github.com/microsoft/frontier-agentic-cobuild-rvas');
  const skills = fs.readdirSync(path.join(directory, 'skills')).sort();
  assert.deepEqual(skills, ['ai-agent-creator', 'cloud-architecture-diagram', 'cost-estimation', 'diagram-design', 'domain-modeling',
    'grilling', 'idea-forge', 'wait-what', 'wireframer']);
  for (const skill of skills) {
    assert.match(fs.readFileSync(path.join(directory, 'skills', skill, 'SKILL.md'), 'utf8'),
      new RegExp(`^name: ${skill}$`, 'm'));
  }
  const mcp = JSON.parse(fs.readFileSync(path.join(directory, 'mcp.json')));
  assert.deepEqual(Object.keys(mcp.mcpServers), ['microsoft-learn']);
  assert.equal(mcp.mcpServers['microsoft-learn'].type, 'streamable-http');
});

test('diagram icon coverage accounts for every creator architecture card', () => {
  const skills = path.join(ROOT, 'plugins/agentic-cobuild/skills');
  const patterns = path.join(skills, 'ai-agent-creator/references/azure-patterns');
  const coverage = JSON.parse(fs.readFileSync(
    path.join(skills, 'cloud-architecture-diagram/references/architecture-icon-coverage.json'), 'utf8'));
  const cards = ['patterns', 'runtimes'].flatMap((directory) =>
    fs.readdirSync(path.join(patterns, directory))
      .filter((name) => name.endsWith('.md') && name !== 'README.md')
      .map((name) => `${directory}/${name}`)).sort();
  assert.deepEqual(Object.keys(coverage.architectures).sort(), cards);
  const catalog = JSON.parse(fs.readFileSync(
    path.join(skills, 'cloud-architecture-diagram/references/microsoft-icon-catalog.json'), 'utf8'));
  for (const [card, components] of Object.entries(coverage.architectures)) {
    assert.ok(components.length, card);
    for (const id of components) {
      assert.ok(coverage.components[id] || catalog.icons[id], `${card}: unmapped ${id}`);
    }
  }
});

test('generated reading pages and manual commands match their current sources', () => {
  assert.equal(fs.readFileSync(path.join(ROOT, 'docs/index.html'), 'utf8'), renderIndex());
  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, `docs/${page.slug}.html`), 'utf8');
    assert.equal(html, renderPage(page), page.slug);
    assert.doesNotMatch(html, /{{page-|<!-- (?:guide-body|guide-navigation|primary-links|page-heading|page-lede) -->/);
  }
});

test('Start explains the gate visuals and the optional wireframe without extra installs', () => {
  const html = renderPage(pages.find((page) => page.slug === 'start'));
  const discovery = html.indexOf('id="describe-what-you-want-to-build"');
  const visuals = html.indexOf('id="review-what-the-creator-understood"');
  const prototype = html.indexOf('id="optional-final-wireframe"');
  const implementation = html.indexOf('id="start-implementation-in-a-new-session"');
  assert.ok(discovery < visuals && visuals < prototype && prototype < implementation);
  assert.doesNotMatch(html, /npx --yes skills@|Install the supporting skills|cathrynlavery\/diagram-design|agilek\/wireframer-skill|mattpocock\/skills/);
  const section = html.slice(visuals, prototype);
  assert.match(section, /docs\/architecture\/visuals\/shared-understanding\.md/);
  assert.match(section, /Render\s+Mermaid Diagram/);
  assert.match(section, /acceptance criteria/);
  const offer = html.slice(prototype, implementation);
  assert.match(offer, /all five architecture files are complete and reconciled/);
  assert.match(offer, /explicitly asks/);
  assert.match(offer, /same session/);
  assert.match(offer, /docs\/architecture\/prototype\//);
  assert.match(offer, /If you say no, the architecture package\s+remains complete/);
  assert.match(offer, /does not authorize\s+delivery/);
});

test('bundled third-party skills ship with their upstream licenses and credits', () => {
  const skills = path.join(ROOT, 'plugins/agentic-cobuild/skills');
  for (const name of ['grilling', 'domain-modeling', 'wait-what', 'diagram-design', 'wireframer', 'cost-estimation']) {
    assert.ok(fs.existsSync(path.join(skills, name, 'SKILL.md')), name);
  }
  for (const name of ['grilling', 'domain-modeling', 'wait-what', 'diagram-design', 'wireframer', 'cost-estimation']) {
    assert.ok(fs.existsSync(path.join(skills, name, 'LICENSE')), `${name} license`);
  }
  const readme = fs.readFileSync(path.join(ROOT, 'plugins/agentic-cobuild/README.md'), 'utf8');
  for (const credit of ['Matt Pocock', 'Cathryn Lavery', 'agilek', 'Microsoft Corporation']) assert.ok(readme.includes(credit), credit);
});

test('website requires Opus 5.5 before the creator session and documents CLI selection', () => {
  const html = renderPage(pages.find((page) => page.slug === 'start'));
  const requirement = html.indexOf('Use Claude Opus 5.5');
  assert.ok(requirement >= 0 && requirement < html.indexOf('id="describe-what-you-want-to-build"'));
  assert.match(html, /whole AI Agent\s+Creator session, including the\s+optional wireframe/);
  assert.match(html, /\/model claude-opus-5\.5/);
  assert.doesNotMatch(html, /Recommended model/);
  const requirements = renderPage(pages.find((page) => page.slug === 'participant-requirements'));
  assert.match(requirements, /Claude Opus 5\.5, the model the/);
});

test('Start leads from setup to discovery before implementation and later references', () => {
  const html = renderPage(pages.find((page) => page.slug === 'start'));
  const steps = [
    'set-up-your-workspace', 'create-a-new-repository', 'install-the-plugin',
    'check-the-workspace',
    'describe-what-you-want-to-build', 'ai-agent-creator-prompts',
    'start-implementation-in-a-new-session', 'direct-from-the-documents',
    'matt-pocock-spec-and-tickets', 'spec-kit',
    'command-and-prompt-reference', 'review-prompts', 'update-the-plugin',
  ].map((id) => html.indexOf(`id="${id}"`));
  assert.ok(steps.every((position) => position >= 0));
  assert.deepEqual(steps, steps.slice().sort((a, b) => a - b));
  assert.ok(html.indexOf('href="#describe-what-you-want-to-build">Start discovery') < steps[0]);
  const approval = html.indexOf('Approval ends this workflow.');
  assert.ok(approval > steps[5] && approval < steps[6]);
  assert.match(html, /Your first milestone is confirmed discovery/);
});

test('intro diagrams embed accessible wide and narrow layouts without fixed-width scrolling', () => {
  const figures = [
    [renderIndex(), 'approval-handoff'],
    [renderPage(pages.find((page) => page.slug === 'start')), 'approval-handoff'],
  ];
  for (const [html, name] of figures) {
    assert.doesNotMatch(html, /<!-- diagram:/);
    assert.ok(html.includes(`aria-labelledby="${name}-title ${name}-desc"`));
    assert.ok(html.includes(`<title id="${name}-title">`));
    assert.match(html, /<div class="diagram-container">/);
    assert.ok(html.includes(`aria-labelledby="${name}-narrow-title ${name}-narrow-desc"`));
    assert.match(html, /<figcaption>[\s\S]+?<\/figcaption>/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, name);
    assert.doesNotMatch(html, /min-width: \d+px|scroll-hint|scroll horizontally/i);
    assert.match(html, /class="diagram-wide"/);
    assert.match(html, /class="diagram-narrow"/);
  }
});

test('Learn pages show page tabs while Start opens directly into its content', () => {
  for (const page of pages) {
    const html = renderPage(page);
    assert.match(html, /class="wrap guide-layout"/);
    assert.doesNotMatch(html, /guide-contents|guide-section-links|On this page/);
    assert.doesNotMatch(html, /href="(?:architecture-options|existing-applications)\.html/);
    if (page.slug === 'start') {
      assert.doesNotMatch(html, /class="guide-nav"/);
      assert.doesNotMatch(html, /class="guide-pages"/);
      assert.match(html, /href="start.html" aria-current="page">Start/);
    } else {
      const tabs = html.match(/<div class="guide-pages">([\s\S]*?)<\/div>/)[1];
      assert.equal([...tabs.matchAll(/<a /g)].length, pages.length - 1);
      assert.ok(html.indexOf('class="guide-pages"') < html.indexOf('<article'));
      assert.match(html, /href="applications.html" aria-current="page">Learn/);
      assert.ok(html.includes(`href="${page.slug}.html" aria-current="page">${page.navigationLabel}</a>`));
    }
  }
});

test('each application family pairs its explanation with an accessible conceptual diagram', () => {
  const html = renderPage(pages.find((page) => page.slug === 'applications'));
  const families = [...html.matchAll(/<section class="application-family" aria-labelledby="([^"]+)">([\s\S]*?)<\/section>/g)];
  assert.equal(families.length, 6);
  for (const family of families) {
    const [, id, content] = family;
    assert.ok(content.includes(`<div class="application-family-copy"><h3 id="${id}">`), id);
    assert.equal([...content.matchAll(/<figure /g)].length, 1, id);
    assert.equal([...content.matchAll(/class="family-product-example"/g)].length, 1, id);
    const examples = content.match(/<div class="family-product-example">([\s\S]*?)\n<\/div>/)[1];
    assert.match(examples, /<span>Example options<\/span>/);
    assert.equal([...examples.matchAll(/<a href="https:\/\/learn.microsoft.com\//g)].length, 2, id);
    assert.equal([...examples.matchAll(/<small>[^<]+<\/small>/g)].length, 2, id);
    assert.equal([...examples.matchAll(/<img /g)].length, 2, id);
    assert.match(examples, /<img src="assets\/icons\/microsoft\/[^"]+\.svg" alt="" width="32" height="32" \/>/);
    assert.match(content, /<svg [^>]*role="img" aria-labelledby="family-[a-z]+-title family-[a-z]+-desc"/);
    assert.match(content, /<figcaption>[^<]+<\/figcaption>/);
    assert.doesNotMatch(content, /<h2 /);
    assert.ok(content.indexOf('</div>') < content.indexOf('<figure'), id);
    const name = content.match(/<figure class="intro-diagram" data-family="([a-z-]+)">/)[1];
    assert.ok(content.includes(`aria-labelledby="family-${name}-title family-${name}-desc"`), id);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  assert.doesNotMatch(html, /<!-- application-family -->|<!-- diagram: family-/);
  assert.match(html, /Microsoft Copilot Studio/);
});

test('architecture snapshots retain identical content and topology across layouts', () => {
  const html = fs.readFileSync(path.join(ROOT, 'docs/assets/diagrams/existing-app-delta.html'), 'utf8');
  for (const snapshot of ['before', 'after']) {
    const pattern = new RegExp(`<g data-snapshot="${snapshot}"[^>]*>([\\s\\S]*?)\\n        <\\/g>`, 'g');
    const bodies = [...html.matchAll(pattern)].map((match) =>
      match[1].replaceAll('existing-app-delta-narrow-arrow', 'existing-app-delta-arrow'));
    assert.equal(bodies.length, 2, snapshot);
    assert.equal(bodies[0], bodies[1], snapshot);
  }
});

test('source and generated documentation links resolve', () => {
  const files = sourceDocs().concat(['index.html', ...pages.map((page) => `${page.slug}.html`)]
    .map((name) => path.join(ROOT, 'docs', name)));
  assert.deepEqual(audit(files), []);
});

test('link audit reports broken files and anchors', () => {
  const errors = [];
  checkLink(path.join(ROOT, 'README.md'), 'docs/start.html#missing-section', errors);
  checkLink(path.join(ROOT, 'README.md'), 'missing-file.md', errors);
  checkLink(path.join(ROOT, 'docs/start.html'), 'applications.html#missing-section', errors);
  assert.equal(errors.length, 3);
  assert.match(errors[0], /missing anchor/);
  assert.match(errors[1], /broken local link/);
});

test('retired application material is absent from source and publishing', () => {
  for (const retired of ['scenarios', 'infra', 'azure.yaml', '.env.sample', 'requirements.txt',
    '.github/skills/use-case-mapper', 'docs/assets/data', 'docs/assets/downloads',
    'docs/scenario.html', 'docs/lesson.html', 'docs/slides.html', 'scripts/build-slides.js',
    'docs/architecture-options.md', 'docs/architecture-options.html',
    'docs/existing-applications.md', 'docs/existing-applications.html',
    '.impeccable/surfaces/docs-slides-html.md', 'docs/agent-or-workflow.md',
    'docs/agent-or-workflow.html', 'docs/assets/diagrams/runtime-choice.html']) {
    assert.equal(fs.existsSync(path.join(ROOT, retired)), false, retired);
  }
  for (const file of ['README.md', 'PRODUCT.md', 'docs/index.html', 'docs/start.html',
    '.github/workflows/deploy-pages.yml',
    'plugins/agentic-cobuild/skills/idea-forge/SKILL.md']) {
    assert.doesNotMatch(fs.readFileSync(path.join(ROOT, file), 'utf8'), /use-case-mapper|scenarios\/|validate:scenarios|test:scenarios/);
  }
});
