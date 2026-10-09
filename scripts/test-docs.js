'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { audit, sourceDocs, checkLink } = require('./audit-docs');
const { pages, renderPage, supportingMarkdown } = require('../docs/build');
const inventory = require('./agentic-skills.json');
const ROOT = path.resolve(__dirname, '..');
const SETUP = path.join(__dirname, 'setup-agentic-repo.js');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agentic-setup-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const target = path.join(root, 'application with spaces');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(target);
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(bin, 'git'), '#!/bin/sh\nprintf "git version fixture\\n"\n', { mode: 0o755 });
  fs.writeFileSync(path.join(bin, 'npx'), `#!${process.execPath}
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
if (args[0] === '--version') { console.log('fixture'); process.exit(0); }
fs.appendFileSync('.stub-invocations', JSON.stringify(args) + '\\n');
const skills = args.slice(args.indexOf('--skill') + 1, args.indexOf('--agent'));
for (const name of skills) {
  if (name === process.env.OMIT_SKILL) continue;
  fs.mkdirSync(path.join('.agents', 'skills', name), { recursive: true });
  fs.writeFileSync(path.join('.agents', 'skills', name, 'SKILL.md'), '---\\nname: ' + name + '\\n---\\nfixture\\n');
}
if (args.includes(process.env.FAIL_SOURCE)) process.exit(2);
const lock = fs.existsSync('skills-lock.json') ? JSON.parse(fs.readFileSync('skills-lock.json')) : { skills: {} };
for (const name of skills) lock.skills[name] = { source: args[3] };
fs.writeFileSync('skills-lock.json', JSON.stringify(lock));
`, { mode: 0o755 });
  const run = (args = [], env = {}) => spawnSync(process.execPath, [SETUP, ...args, target], {
    cwd: ROOT, encoding: 'utf8', env: { ...process.env, PATH: `${bin}${path.delimiter}${process.env.PATH}`, ...env },
  });
  return { root, target, bin, run };
}

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
  for (const page of pages) {
    const html = fs.readFileSync(path.join(ROOT, `docs/${page.slug}.html`), 'utf8');
    assert.equal(html, renderPage(page), page.slug);
    assert.doesNotMatch(html, /{{page-|<!-- (?:guide-body|guide-navigation|primary-links|page-heading|page-lede) -->/);
  }
  assert.equal(fs.readFileSync(path.join(ROOT, 'docs/supporting-skills.md'), 'utf8'), supportingMarkdown());
  for (const { repository, skills } of inventory.sources) {
    assert.ok(supportingMarkdown().includes(`${repository} --skill ${skills.join(' ')}`));
  }
  const commands = spawnSync(process.execPath, [SETUP, '--print-commands'], { encoding: 'utf8' });
  assert.equal(commands.status, 0, commands.stderr);
  assert.doesNotMatch(commands.stdout, /humanize-writing|lguz\/humanize-writing-skill/);
  for (const line of commands.stdout.trim().split('\n')) assert.ok(supportingMarkdown().includes(line));
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

test('setup dry-run leaves an existing application untouched', (t) => {
  const { target, run } = fixture(t);
  fs.writeFileSync(path.join(target, 'app.py'), 'existing application\n');
  const before = fs.readdirSync(target);
  const result = run(['--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes(`${inventory.sources.flatMap((source) => source.skills).length} skills pending`));
  assert.deepEqual(fs.readdirSync(target), before);
});

test('setup installs the exact set, preserves user configuration, and reruns without upgrades', (t) => {
  const { target, run } = fixture(t);
  for (const file of ['app.py', 'AGENTS.md', '.mcp.json']) fs.writeFileSync(path.join(target, file), `original ${file}`);
  fs.writeFileSync(path.join(target, 'skills-lock.json'), JSON.stringify({ skills: { unrelated: { source: 'existing/source' } } }));
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  const names = inventory.sources.flatMap((source) => source.skills).sort();
  assert.deepEqual(fs.readdirSync(path.join(target, '.agents/skills')).sort(), names);
  const calls = fs.readFileSync(path.join(target, '.stub-invocations'), 'utf8');
  assert.equal(calls.trim().split('\n').length, inventory.sources.length);
  assert.equal(fs.existsSync(path.join(target, '.agents/skills/humanize-writing')), false);
  for (const call of calls.trim().split('\n').map(JSON.parse)) {
    assert.equal(call.includes('--global'), false);
    assert.ok(call.includes('--copy'));
    assert.ok(call.includes('github-copilot'));
  }
  for (const file of ['app.py', 'AGENTS.md', '.mcp.json']) {
    assert.equal(fs.readFileSync(path.join(target, file), 'utf8'), `original ${file}`);
  }
  assert.equal(JSON.parse(fs.readFileSync(path.join(target, 'skills-lock.json'))).skills.unrelated.source, 'existing/source');
  assert.equal(run().status, 0);
  assert.equal(fs.readFileSync(path.join(target, '.stub-invocations'), 'utf8'), calls);
});

test('setup rejects an unmanaged skill before any installs', (t) => {
  const { target, run } = fixture(t);
  const existing = path.join(target, '.agents/skills/grilling');
  fs.mkdirSync(existing, { recursive: true });
  fs.writeFileSync(path.join(existing, 'SKILL.md'), 'user-owned');
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Conflicting or modified skill/);
  assert.equal(fs.existsSync(path.join(target, '.stub-invocations')), false);
  assert.equal(fs.readFileSync(path.join(existing, 'SKILL.md'), 'utf8'), 'user-owned');
});

test('setup rejects a modified managed skill instead of overwriting it', (t) => {
  const { target, run } = fixture(t);
  assert.equal(run().status, 0);
  const skill = path.join(target, '.agents/skills/grilling/SKILL.md');
  fs.appendFileSync(skill, 'local change');
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /modified skill/);
  assert.match(fs.readFileSync(skill, 'utf8'), /local change/);
});

test('setup rejects linked destinations and alternative skill conflicts', (t) => {
  const { root, target, run } = fixture(t);
  const outside = path.join(root, 'outside');
  fs.mkdirSync(outside);
  fs.symlinkSync(outside, path.join(target, '.agents'));
  assert.match(run().stderr, /linked setup destination/);
  assert.deepEqual(fs.readdirSync(outside), []);
  fs.unlinkSync(path.join(target, '.agents'));
  fs.mkdirSync(path.join(target, '.github/skills/grilling'), { recursive: true });
  assert.match(run().stderr, /Conflicting existing skill/);
  assert.equal(fs.existsSync(path.join(target, '.stub-invocations')), false);
});

test('setup reports partial failure and does not run later sources', (t) => {
  const { target, run } = fixture(t);
  const result = run([], { FAIL_SOURCE: inventory.sources[0].repository });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Completed this run: none/);
  assert.match(result.stderr, /partial writes/);
  assert.equal(fs.readFileSync(path.join(target, '.stub-invocations'), 'utf8').trim().split('\n').length, 1);
  assert.equal(fs.existsSync(path.join(target, '.agents/skills/azure-ai')), false);
  assert.notEqual(run().status, 0, 'partially installed unowned skills must require review');
});

test('setup rejects incomplete installer output even when the upstream command succeeds', (t) => {
  const { target, run } = fixture(t);
  const result = run([], { OMIT_SKILL: 'azure-ai' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Installer did not produce azure-ai\/SKILL.md/);
  assert.match(result.stderr, /Completed this run: grilling/);
  assert.equal(fs.readFileSync(path.join(target, '.stub-invocations'), 'utf8').trim().split('\n').length, 2);
  const state = JSON.parse(fs.readFileSync(path.join(target, '.agentic-cobuild-setup.json')));
  assert.deepEqual(Object.keys(state.skills).sort(), inventory.sources[0].skills.slice().sort());
});

test('setup preflights missing tools and missing targets', (t) => {
  const { target, bin, run } = fixture(t);
  fs.writeFileSync(path.join(bin, 'npx'), '#!/bin/sh\nexit 127\n', { mode: 0o755 });
  assert.match(run().stderr, /npx is required/);
  assert.equal(fs.existsSync(path.join(target, '.agents')), false);
  const missing = spawnSync(process.execPath, [SETUP, path.join(target, 'missing')], { encoding: 'utf8' });
  assert.notEqual(missing.status, 0);
});

test('setup rejects incompatible ownership state and missing managed content', (t) => {
  const { target, run } = fixture(t);
  fs.writeFileSync(path.join(target, '.agentic-cobuild-setup.json'), '{"version":999,"skills":{}}');
  assert.match(run().stderr, /Unrecognized setup state/);
  assert.equal(fs.existsSync(path.join(target, '.stub-invocations')), false);
  fs.unlinkSync(path.join(target, '.agentic-cobuild-setup.json'));
  assert.equal(run().status, 0);
  fs.unlinkSync(path.join(target, '.agents/skills/grilling/SKILL.md'));
  assert.match(run().stderr, /Conflicting or modified skill/);
});
