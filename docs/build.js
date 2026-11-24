#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const marked = require('./assets/js/marked.min.js');

function embedDiagrams(content) {
  return content.replace(/<!-- diagram: ([a-z0-9-]+) -->/g, (_, name) => {
    const source = fs.readFileSync(path.join(__dirname, 'assets/diagrams', `${name}.html`), 'utf8');
    const style = source.match(/<style data-diagram-style>([\s\S]*?)<\/style>/);
    const figure = source.match(/<figure class="intro-diagram"(?: data-family="[a-z-]+")?>[\s\S]*?<\/figure>/);
    if (!style || !figure) throw new Error(`Diagram ${name} is missing its style or figure.`);
    return `<style>${style[1]}</style>\n${figure[0]}`;
  });
}

function renderIndex() {
  return embedDiagrams(fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8'))
    .replace('<!-- primary-links -->', () => primaryLinks('overview'));
}

function renderWhy() {
  return require('./deck').renderWhy({ primaryLinks: primaryLinks('why') });
}

const pages = [
  {
    slug: 'start',
    section: 'start',
    title: 'Start',
    description: 'Install Agentic Co-build in Copilot CLI or VS Code, describe your own application, and reach confirmed discovery.',
    heading: 'Start with <span>your own app.</span>',
    lede: 'Install the plugin or the skills, describe what you want to build, and agree on it before any code is written.',
  },
  {
    slug: 'path',
    section: 'path',
    title: 'The path',
    description: 'Nine steps from idea to a reviewed application on Azure: agree on what to build, delegate the build, verify the result.',
    heading: 'From idea to Azure, <span>with an agent at your side.</span>',
    lede: 'Nine steps in three bands. You agree on what to build, delegate the build, and verify the result. Each gate is a decision a person makes.',
  },
  {
    slug: 'applications',
    section: 'learn',
    navigationLabel: 'Application types',
    title: 'What can you build?',
    description: 'Applications you can design with Agentic Co-build, with or without AI, including changes to existing systems.',
    heading: 'What can <span>you build?</span>',
    lede: 'A new application or a change to an existing one. AI is one option, not a requirement.',
  },
  {
    slug: 'example',
    section: 'learn',
    navigationLabel: 'Worked example',
    title: 'Worked example: Storm Surge Response Board',
    description: 'A fictional insurance scenario with synthetic data for teams that want to learn the path before using their own use case.',
    heading: 'A worked example, <span>for when you need one.</span>',
    lede: 'Bring your own use case if you can. Use this one if you have none yet, can\'t use your data, or want to learn the flow first.',
  },
  {
    slug: 'co-build-day',
    section: 'learn',
    navigationLabel: 'Co-build day',
    title: 'Run a co-build day',
    description: 'Agenda, preparation, and facilitator notes for a one-day co-build from idea to a reviewed application on Azure.',
    heading: 'Run a <span>co-build day.</span>',
    lede: 'One day, one team, one use case. Teams agree on what to build in the morning and deliver it in the afternoon.',
  },
  {
    slug: 'participant-requirements',
    section: 'learn',
    navigationLabel: 'Participant requirements',
    title: 'Prepare for the co-build',
    description: 'Check the customer knowledge, specialists, tools, repositories, and cloud access needed for an Agentic Co-build.',
    heading: 'Prepare for <span>the co-build.</span>',
    lede: 'Bring the business context. Arrange the people, tools, and approved access needed for the work.',
  },
  {
    slug: 'discovery-session',
    section: 'learn',
    navigationLabel: 'Discovery session',
    title: 'Run the initial discovery session',
    description: 'Run a customer discovery discussion and prepare an evidence-based brief for Azure Solution Architect.',
    heading: 'Run a focused <span>discovery session.</span>',
    lede: 'Capture the customer goal, first user journey, operating constraints, and open questions before the creator starts architecture work.',
  },
];

const primaryItems = [
  ['overview', 'index.html', 'Overview'],
  ['why', 'why.html', 'Why'],
  ['path', 'path.html', 'The path'],
  ['start', 'start.html', 'Start'],
  ['learn', 'applications.html', 'Learn'],
];

function primaryLinks(current) {
  return primaryItems.map(([section, href, label]) =>
    `<a href="${href}"${section === current ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('\n') + '\n<a href="https://github.com/microsoft/frontier-agentic-cobuild-rvas">GitHub</a>';
}

function renderPage(page) {
  const markdown = fs.readFileSync(path.join(__dirname, `${page.slug}.md`), 'utf8');
  const renderer = new marked.Renderer();
  const anchors = new Set();
  renderer.heading = (text, level, raw) => {
    const base = raw.replace(/<[^>]+>/g, '').replace(/[`*]/g, '').trim().toLowerCase()
      .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    let id = base;
    let suffix = 1;
    while (anchors.has(id)) id = `${base}-${suffix++}`;
    anchors.add(id);
    const label = text.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
    const permalink = '<a class="heading-link" href="#' + id + '" aria-label="Link to ' + label + '">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 1 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" />' +
      '</svg></a>';
    return `<h${level} id="${id}">${text}${permalink}</h${level}>\n`;
  };
  renderer.table = (header, body) =>
    '<div class="guide-table" role="region" aria-label="Scrollable table" tabindex="0">\n' +
    `<table>\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n</div>\n`;
  const content = marked.parse(markdown, { renderer }).replace(
    /<!-- application-family -->\s*(<h3 id="([^"]+)">[\s\S]*?)\s*(<!-- diagram: family-[a-z-]+ -->)/g,
    (_, copy, id, diagram) =>
      `<section class="application-family" aria-labelledby="${id}">\n` +
      `<div class="application-family-copy">${copy}</div>\n${diagram}\n</section>`
  );
  const collapsible = content.replace(
    /<!-- workflow -->\s*(<h3[^>]*>[\s\S]*?<\/h3>)([\s\S]*?)<!-- workflow-end -->/g,
    (_, heading, rest) => `<details class="workflow">\n<summary>${heading}</summary>\n${rest}</details>`
  );
  const body = embedDiagrams(collapsible);
  const pageLinks = page.section !== 'learn' ? '' : '<div class="guide-pages">\n' +
    pages.filter((candidate) => candidate.section === 'learn').map((candidate) =>
      `<a href="${candidate.slug}.html"${candidate.slug === page.slug ? ' aria-current="page"' : ''}>${candidate.navigationLabel}</a>`
    ).join('\n') + '\n</div>\n';
  return fs.readFileSync(path.join(__dirname, 'start.template.html'), 'utf8')
    .replace('{{page-title}}', () => page.title)
    .replace('{{page-description}}', () => page.description)
    .replace('<!-- primary-links -->', () => primaryLinks(page.section))
    .replace('<!-- page-heading -->', () => page.heading)
    .replace('<!-- page-lede -->', () => page.lede)
    .replace(/[ \t]*<!-- guide-navigation -->/, () => pageLinks
      ? `<nav class="guide-nav" aria-label="Reading navigation">\n${pageLinks}</nav>`
      : '')
    .replace('<!-- guide-body -->', () => body);
}

function renderGuide() {
  return renderPage(pages[0]);
}

function build() {
  fs.writeFileSync(path.join(__dirname, 'index.html'), renderIndex());
  fs.writeFileSync(path.join(__dirname, 'why.html'), renderWhy());
  for (const page of pages) {
    fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), renderPage(page));
  }
  console.log(`Built Overview, Why, ${pages.length} reading pages.`);
}

if (require.main === module) build();
module.exports = { build, pages, primaryLinks, renderIndex, renderPage, renderGuide, renderWhy };
