#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const marked = require('./assets/js/marked.min.js');
const inventory = require('../scripts/agentic-skills.json');

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

function renderGuide() {
  const markdown = fs.readFileSync(path.join(__dirname, 'start.md'), 'utf8')
    .replace('<!-- upstream-commands -->', supportingMarkdown().replace(/^# Supporting skills[\s\S]*?(?=### )/, ''));
  const renderer = new marked.Renderer();
  const anchors = new Set();
  renderer.heading = (text, level, raw) => {
    const base = raw.replace(/<[^>]+>/g, '').replace(/[`*]/g, '').trim().toLowerCase()
      .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    let id = base;
    let suffix = 1;
    while (anchors.has(id)) id = `${base}-${suffix++}`;
    anchors.add(id);
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };
  const body = marked.parse(markdown, { renderer });
  return fs.readFileSync(path.join(__dirname, 'start.template.html'), 'utf8').replace('<!-- guide-body -->', body);
}

function build() {
  fs.writeFileSync(path.join(__dirname, 'supporting-skills.md'), supportingMarkdown());
  fs.writeFileSync(path.join(__dirname, 'start.html'), renderGuide());
  console.log('Built Start guide and supporting skill commands.');
}

if (require.main === module) build();
module.exports = { build, renderGuide, supportingMarkdown };
