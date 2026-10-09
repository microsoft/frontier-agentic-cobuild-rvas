'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { audit, sourceDocs, checkLink } = require('./audit-docs');
const { pages, renderIndex, renderPage, supportingMarkdown } = require('../docs/build');
const inventory = require('./agentic-skills.json');
const ROOT = path.resolve(__dirname, '..');

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
  assert.deepEqual(skills, ['ai-agent-creator', 'cloud-architecture-diagram', 'customer-activity-forge']);
  for (const skill of skills) {
    assert.match(fs.readFileSync(path.join(directory, 'skills', skill, 'SKILL.md'), 'utf8'),
      new RegExp(`^name: ${skill}$`, 'm'));
  }
  const mcp = JSON.parse(fs.readFileSync(path.join(directory, 'mcp.json')));
  assert.deepEqual(Object.keys(mcp.mcpServers), ['microsoft-learn']);
  assert.equal(mcp.mcpServers['microsoft-learn'].type, 'streamable-http');
});

test('generated reading pages and manual commands match their current sources', () => {
  assert.equal(fs.readFileSync(path.join(ROOT, 'docs/index.html'), 'utf8'), renderIndex());
  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, `docs/${page.slug}.html`), 'utf8');
    assert.equal(html, renderPage(page), page.slug);
    assert.doesNotMatch(html, /{{page-|<!-- (?:guide-body|guide-navigation|primary-links|page-heading|page-lede) -->/);
  }
  assert.equal(fs.readFileSync(path.join(ROOT, 'docs/supporting-skills.md'), 'utf8'), supportingMarkdown());
  for (const { repository, skills } of inventory.sources) {
    assert.ok(supportingMarkdown().includes(`${repository} --skill ${skills.join(' ')}`));
  }
});

test('Start lists each supporting skill and its direct project-local installation command', () => {
  const markdown = supportingMarkdown();
  const html = renderPage(pages.find((page) => page.slug === 'start'));
  const commands = [...markdown.matchAll(/```bash\n([^\n]+)\n```/g)].map((match) => match[1]);
  assert.equal(commands.length, inventory.sources.length);
  for (const [index, source] of inventory.sources.entries()) {
    assert.equal(commands[index], `npx --yes ${inventory.installer} add ${source.repository} --skill ${source.skills.join(' ')} --agent ${inventory.agent} --copy --yes`);
    assert.deepEqual(Object.keys(source.descriptions).sort(), source.skills.slice().sort());
    for (const skill of source.skills) {
      assert.ok(source.descriptions[skill].trim(), skill);
      assert.ok(markdown.includes(`| \`${skill}\` | ${source.descriptions[skill]} |`), skill);
      assert.ok(html.includes(`<td><code>${skill}</code></td>`), skill);
      assert.ok(html.includes(source.descriptions[skill]), skill);
    }
  }
  assert.doesNotMatch(commands.join('\n'), /--global|--all|humanize-writing/);
  assert.doesNotMatch(html, /setup-agentic-repo|\.agentic-cobuild-setup|Manual npx alternative/);
  assert.match(html, /can overwrite existing copies/);
});

test('intro diagrams embed accessible wide and narrow layouts without fixed-width scrolling', () => {
  const figures = [
    [renderIndex(), 'approval-handoff'],
    [renderPage(pages.find((page) => page.slug === 'start')), 'approval-handoff'],
    [renderPage(pages.find((page) => page.slug === 'agent-or-workflow')), 'runtime-choice'],
    [renderPage(pages.find((page) => page.slug === 'existing-applications')), 'existing-app-delta'],
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

test('reading pages share section disclosure and Learn pages retain distinct page navigation', () => {
  for (const page of pages) {
    const html = renderPage(page);
    assert.match(html, /class="wrap guide-layout"/);
    assert.match(html, /<details class="guide-contents"><summary>On this page<\/summary>/);
    assert.ok(html.indexOf('class="guide-contents"') < html.indexOf('<article'));
    if (page.slug === 'start') {
      assert.doesNotMatch(html, /class="guide-pages"/);
      assert.match(html, /href="start.html" aria-current="page">Start/);
    } else {
      assert.match(html, /href="applications.html" aria-current="page">Learn/);
      assert.ok(html.includes(`href="${page.slug}.html" aria-current="page">${page.navigationLabel}</a>`));
    }
  }
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

test('comparison tables retain semantics inside a keyboard-accessible scroll region', () => {
  const html = renderPage(pages.find((page) => page.slug === 'architecture-options'));
  assert.match(html, /<div class="guide-table" role="region" aria-label="Scrollable table" tabindex="0">\s*<table>\s*<thead>/);
  assert.match(html, /<\/thead>\s*<tbody>[\s\S]*<\/tbody>\s*<\/table>\s*<\/div>/);
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
    '.impeccable/surfaces/docs-slides-html.md']) {
    assert.equal(fs.existsSync(path.join(ROOT, retired)), false, retired);
  }
  for (const file of ['README.md', 'PRODUCT.md', 'docs/index.html', 'docs/start.html',
    '.github/workflows/deploy-pages.yml',
    'plugins/agentic-cobuild/skills/customer-activity-forge/SKILL.md']) {
    assert.doesNotMatch(fs.readFileSync(path.join(ROOT, file), 'utf8'), /use-case-mapper|scenarios\/|validate:scenarios|test:scenarios/);
  }
});
