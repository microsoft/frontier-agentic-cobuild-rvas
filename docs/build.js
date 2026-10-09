#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const marked = require('./assets/js/marked.min.js');
const inventory = require('../scripts/agentic-skills.json');

function embedDiagrams(content) {
  return content.replace(/<!-- diagram: ([a-z0-9-]+) -->/g, (_, name) => {
    const source = fs.readFileSync(path.join(__dirname, 'assets/diagrams', `${name}.html`), 'utf8');
    const style = source.match(/<style data-diagram-style>([\s\S]*?)<\/style>/);
    const figure = source.match(/<figure class="intro-diagram">[\s\S]*?<\/figure>/);
    if (!style || !figure) throw new Error(`Diagram ${name} is missing its style or figure.`);
    return `<style>${style[1]}</style>\n${figure[0]}`;
  });
}

function renderIndex() {
  return embedDiagrams(fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8'));
}

const pages = [
  {
    slug: 'start',
    title: 'Start',
    description: 'Install Agentic Co-build in Copilot CLI or VS Code and design your own AI application in your repository.',
    heading: 'Start in <span>your repository.</span>',
    lede: 'Install the plugin and supporting skills. Approve the architecture before starting implementation in a separate session.',
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
    lede: 'Use an agent when the task requires it to choose the next step. Keep known rules and sequences explicit.',
  },
  {
    slug: 'architecture-options',
    title: 'Choose an architecture that fits',
    description: 'Separate behavior, platform, channel, and ownership before choosing an AI application architecture.',
    heading: 'Choose an architecture <span>that fits.</span>',
    lede: 'Check existing capabilities first. Compare platform-managed and custom execution against your requirements.',
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
    `### Skills from ${source.repository}\n\n` +
    `Upstream source: [\`${source.repository}\`](https://github.com/${source.repository}).\n\n` +
    '| Skill | What it does |\n| --- | --- |\n' +
    source.skills.map((skill) => {
      const description = source.descriptions[skill];
      if (!description) throw new Error(`Missing description for supporting skill ${skill}.`);
      return `| \`${skill}\` | ${description} |`;
    }).join('\n') + '\n\n```bash\n' +
    `npx --yes ${inventory.installer} add ${source.repository} --skill ${source.skills.join(' ')} --agent ${inventory.agent} --copy --yes\n` +
    '```\n');
  return '# Supporting skills\n\n' +
    '<!-- Generated from scripts/agentic-skills.json by npm run build. -->\n\n' +
    `Run these commands from your application directory with Node.js ${inventory.minimumNode} or newer.\n` +
    'Review the selected skills and inspect existing installations before running these commands.\n\n' +
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
  const body = embedDiagrams(marked.parse(markdown, { renderer }));
  const sectionLinks = (page.sections || sections)
    .map(([id, label]) => `<a href="#${id}">${label}</a>`).join('\n        ');
  const pageLinks = page.slug === 'start' ? '' : '<div class="guide-pages">\n' +
    pages.filter((candidate) => candidate.slug !== 'start').map((candidate) =>
      `<a href="${candidate.slug}.html"${candidate.slug === page.slug ? ' aria-current="page"' : ''}>${candidate.title}</a>`
    ).join('\n') + '\n</div>\n';
  const primaryLinks = '<a href="index.html">Overview</a>\n' +
    `<a href="applications.html"${page.slug !== 'start' ? ' aria-current="page"' : ''}>Learn</a>\n` +
    `<a href="start.html"${page.slug === 'start' ? ' aria-current="page"' : ''}>Start</a>\n` +
    '<a href="https://github.com/microsoft/frontier-agentic-cobuild-rvas">GitHub</a>';
  return fs.readFileSync(path.join(__dirname, 'start.template.html'), 'utf8')
    .replace('{{layout-class}}', () => page.slug === 'start' ? '' : ' guide-layout--learn')
    .replace('{{page-title}}', () => page.title)
    .replace('{{page-description}}', () => page.description)
    .replace('<!-- primary-links -->', () => primaryLinks)
    .replace('<!-- page-heading -->', () => page.heading)
    .replace('<!-- page-lede -->', () => page.lede)
    .replace('<!-- guide-navigation -->', () => page.slug === 'start' ? sectionLinks :
      pageLinks + '<details class="guide-contents"><summary>On this page</summary>\n' +
      `<div class="guide-section-links">${sectionLinks}</div>\n</details>`)
    .replace('<!-- guide-body -->', () => body);
}

function renderGuide() {
  return renderPage(pages[0]);
}

function build() {
  fs.writeFileSync(path.join(__dirname, 'index.html'), renderIndex());
  fs.writeFileSync(path.join(__dirname, 'supporting-skills.md'), supportingMarkdown());
  for (const page of pages) {
    fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), renderPage(page));
  }
  console.log(`Built Overview, ${pages.length} reading pages, and supporting skill commands.`);
}

if (require.main === module) build();
module.exports = { build, pages, renderIndex, renderPage, renderGuide, supportingMarkdown };
