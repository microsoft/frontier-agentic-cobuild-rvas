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
  return embedDiagrams(fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8'));
}

const pages = [
  {
    slug: 'start',
    title: 'Start',
    description: 'Install Agentic Co-build in Copilot CLI or VS Code and design your own AI application in your repository.',
    heading: 'Start in <span>your repository.</span>',
    lede: 'Install the plugin. Approve the architecture before starting implementation in a separate session.',
  },
  {
    slug: 'applications',
    navigationLabel: 'Application types',
    title: 'What can you build?',
    description: 'Explore AI applications you can design with Agentic Co-build, including changes to existing systems.',
    heading: 'What can <span>you build?</span>',
    lede: 'Design a new AI application or add a capability to an existing system.',
  },
  {
    slug: 'participant-requirements',
    navigationLabel: 'Participant requirements',
    title: 'Prepare for the co-build',
    description: 'Check the customer knowledge, specialists, tools, repositories, and cloud access needed for an Agentic Co-build.',
    heading: 'Prepare for <span>the co-build.</span>',
    lede: 'Bring the business context. Arrange the people, tools, and approved access needed for the work.',
  },
  {
    slug: 'discovery-session',
    navigationLabel: 'Discovery session',
    title: 'Run the initial discovery session',
    description: 'Run a customer discovery discussion and prepare an evidence-based brief for AI Agent Creator.',
    heading: 'Run a focused <span>discovery session.</span>',
    lede: 'Capture the customer goal, first user journey, operating constraints, and open questions before the creator starts architecture work.',
  },
];

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
  const body = embedDiagrams(content);
  const pageLinks = page.slug === 'start' ? '' : '<div class="guide-pages">\n' +
    pages.filter((candidate) => candidate.slug !== 'start').map((candidate) =>
      `<a href="${candidate.slug}.html"${candidate.slug === page.slug ? ' aria-current="page"' : ''}>${candidate.navigationLabel}</a>`
    ).join('\n') + '\n</div>\n';
  const primaryLinks = '<a href="index.html">Overview</a>\n' +
    `<a href="applications.html"${page.slug !== 'start' ? ' aria-current="page"' : ''}>Learn</a>\n` +
    `<a href="start.html"${page.slug === 'start' ? ' aria-current="page"' : ''}>Start</a>\n` +
    '<a href="https://github.com/microsoft/frontier-agentic-cobuild-rvas">GitHub</a>';
  return fs.readFileSync(path.join(__dirname, 'start.template.html'), 'utf8')
    .replace('{{page-title}}', () => page.title)
    .replace('{{page-description}}', () => page.description)
    .replace('<!-- primary-links -->', () => primaryLinks)
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
  for (const page of pages) {
    fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), renderPage(page));
  }
  console.log(`Built Overview, ${pages.length} reading pages.`);
}

if (require.main === module) build();
module.exports = { build, pages, renderIndex, renderPage, renderGuide };
