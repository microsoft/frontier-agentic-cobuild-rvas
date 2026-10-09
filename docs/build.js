#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const marked = require('./assets/js/marked.min.js');
const inventory = require('../scripts/agentic-skills.json');

const pages = [
  {
    slug: 'start',
    title: 'Start',
    description: 'Install Agentic Co-build in Copilot CLI or VS Code and design your own AI application in your repository.',
    heading: 'Start in <span>your repository.</span>',
    lede: 'Install the workflow. Define your application, approve its architecture, then build in a separate session.',
    sections: [
      ['work-in-your-own-repository', 'Your workspace'],
      ['install-the-plugin', 'Plugin installation'],
      ['install-the-supporting-skills', 'Supporting skills'],
      ['check-the-workspace-before-starting', 'Readiness check'],
      ['describe-what-you-want-to-build', 'Discovery and architecture'],
      ['start-implementation-in-a-new-session', 'Implementation handoff'],
      ['need-an-idea-first', 'Idea Forge'],
      ['updates-and-team-setup', 'Updates'],
    ],
  },
  {
    slug: 'applications',
    title: 'What can you build?',
    description: 'Understand the AI application families covered by the Agentic Co-build design workflow.',
    heading: 'What can <span>you build?</span>',
    lede: 'Explore the kinds of AI applications you can bring to discovery, including capabilities added to existing systems.',
  },
  {
    slug: 'agent-or-workflow',
    title: 'Does this need an agent?',
    description: 'Compare fixed rules, bounded model calls, explicit workflows, and agents against your user journey.',
    heading: 'Does this need <span>an agent?</span>',
    lede: 'Use runtime planning where it earns its place. Keep known rules and sequences explicit.',
  },
  {
    slug: 'architecture-options',
    title: 'Choose an architecture that fits',
    description: 'Separate behavior, platform, channel, and ownership before choosing an AI application architecture.',
    heading: 'Choose an architecture <span>that fits.</span>',
    lede: 'Reuse what works. Compare platform-managed and custom execution against the requirements you actually have.',
  },
  {
    slug: 'existing-applications',
    title: 'Add AI to an existing application',
    description: 'Prepare an existing application for architecture-first AI design without assuming a rewrite.',
    heading: 'Add AI to <span>an existing application.</span>',
    lede: 'Design a bounded addition. Preserve established interfaces and make reuse or migration decisions explicit.',
  },
];

function supportingMarkdown() {
  const sections = inventory.sources.map((source) =>
    `### ${source.repository}\n\n` +
    source.skills.map((skill) => `\`${skill}\``).join(', ') + '\n\n```bash\n' +
    `npx --yes ${inventory.installer} add ${source.repository} --skill ${source.skills.join(' ')} --agent ${inventory.agent} --copy --yes\n` +
    '```\n');
  return '# Supporting skills\n\n' +
    '<!-- Generated from scripts/agentic-skills.json by npm run build. -->\n\n' +
    `Run these commands from your application directory with Node.js ${inventory.minimumNode} or newer.\n` +
    'Inspect existing skills first. Direct commands do not provide the setup script\'s conflict checks or ownership record.\n\n' +
    sections.join('\n');
}

function renderPage(page) {
  const markdown = fs.readFileSync(path.join(__dirname, `${page.slug}.md`), 'utf8')
    .replace('<!-- upstream-commands -->', supportingMarkdown().replace(/^# Supporting skills[\s\S]*?(?=### )/, ''));
  const renderer = new marked.Renderer();
  const anchors = new Set();
  const sections = [];
  renderer.heading = (text, level, raw) => {
    const base = raw.replace(/<[^>]+>/g, '').replace(/[`*]/g, '').trim().toLowerCase()
      .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    let id = base;
    let suffix = 1;
    while (anchors.has(id)) id = `${base}-${suffix++}`;
    anchors.add(id);
    if (level === 2) sections.push([id, text]);
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };
  renderer.table = (header, body) =>
    '<div class="guide-table" role="region" aria-label="Scrollable table" tabindex="0">\n' +
    `<table>\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n</div>\n`;
  const body = marked.parse(markdown, { renderer });
  const sectionLinks = (page.sections || sections)
    .map(([id, label]) => `<a href="#${id}">${label}</a>`).join('\n        ');
  const pageLinks = page.slug === 'start' ? '' : '<div class="guide-pages">\n' +
    pages.filter((candidate) => candidate.slug !== 'start').map((candidate) =>
      `<a href="${candidate.slug}.html"${candidate.slug === page.slug ? ' aria-current="page"' : ''}>${candidate.title}</a>`
    ).join('\n') + '\n</div>\n';
  const primaryLinks = '<a href="index.html">Overview</a>\n' +
    `<a href="applications.html"${page.slug === 'applications' ? ' aria-current="page"' : ''}>Learn</a>\n` +
    `<a href="start.html"${page.slug === 'start' ? ' aria-current="page"' : ''}>Start</a>\n` +
    '<a href="https://github.com/microsoft/frontier-agentic-cobuild-rvas">GitHub</a>';
  return fs.readFileSync(path.join(__dirname, 'start.template.html'), 'utf8')
    .replace('{{page-title}}', () => page.title)
    .replace('{{page-description}}', () => page.description)
    .replace('<!-- primary-links -->', () => primaryLinks)
    .replace('<!-- page-heading -->', () => page.heading)
    .replace('<!-- page-lede -->', () => page.lede)
    .replace('<!-- guide-navigation -->', () => pageLinks + sectionLinks)
    .replace('<!-- guide-body -->', () => body);
}

function renderGuide() {
  return renderPage(pages[0]);
}

function build() {
  fs.writeFileSync(path.join(__dirname, 'supporting-skills.md'), supportingMarkdown());
  for (const page of pages) {
    fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), renderPage(page));
  }
  console.log(`Built ${pages.length} reading pages and supporting skill commands.`);
}

if (require.main === module) build();
module.exports = { build, pages, renderPage, renderGuide, supportingMarkdown };
