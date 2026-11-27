'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const marked = require('./assets/js/marked.min.js');

const SOURCE = path.join(__dirname, 'slides', 'agree-before-you-delegate.md');
const VISUALS = path.join(__dirname, 'slides', 'visuals');
const TEMPLATE = path.join(__dirname, 'why.template.html');
const PDF = path.join(__dirname, 'assets', 'slides', 'agree-before-you-delegate.pdf');
const DECK_TITLE = 'Agree before you delegate';
const STAGES = ['Ask', 'Sketch', 'Draw', 'Specify', 'Click'];
const LOGO_LAYOUTS = new Set(['title', 'questions']);
const SCROLLABLE_VISUALS = new Set(['boehm', 'request-two-systems', 'swimlane', 'container-view', 'prototype-cr-0147']);

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function deckSourceFiles() {
  const visuals = fs.readdirSync(VISUALS).filter((name) => /\.(svg|html)$/.test(name))
    .map((name) => path.join(VISUALS, name));
  return [SOURCE, ...visuals].sort((a, b) => {
    const left = path.relative(__dirname, a).split(path.sep).join('/');
    const right = path.relative(__dirname, b).split(path.sep).join('/');
    return left < right ? -1 : left > right ? 1 : 0;
  });
}

function deckSourceHash() {
  const hash = crypto.createHash('sha256');
  for (const file of deckSourceFiles()) hash.update(fs.readFileSync(file));
  return hash.digest('hex');
}

function parseAttributes(text) {
  const attributes = {};
  for (const match of text.matchAll(/([a-z-]+)=("([^"]*)"|\S+)/g)) attributes[match[1]] = match[3] ?? match[2];
  return attributes;
}

function fencedDivs(markdown) {
  const open = [];
  const lines = markdown.split('\n').map((line) => {
    const start = line.match(/^:::\s*([a-z0-9 -]+?)\s*$/);
    if (start) {
      open.push(start[1]);
      return `\n<div class="${start[1]}">\n`;
    }
    if (/^:::\s*$/.test(line)) {
      if (!open.length) throw new Error('Unbalanced ::: in slide source.');
      open.pop();
      return '\n</div>\n';
    }
    return line;
  });
  if (open.length) throw new Error(`Unclosed ::: ${open.at(-1)} in slide source.`);
  return lines.join('\n');
}

function embedVisual(name) {
  const file = ['svg', 'html'].map((ext) => path.join(VISUALS, `${name}.${ext}`)).find((candidate) => fs.existsSync(candidate));
  if (!file) throw new Error(`Slide visual ${name} not found in ${VISUALS}.`);
  const markup = fs.readFileSync(file, 'utf8').replace(/^\s*<!--[\s\S]*?-->\s*/, '').trim();
  if (!SCROLLABLE_VISUALS.has(name)) return `<div class="slide-visual" data-visual="${name}">\n${markup}\n</div>`;
  const label = (markup.match(/<title[^>]*>([^<]+)<\/title>/) || [])[1] || name;
  return `<div class="slide-visual slide-visual-wide" data-visual="${name}" role="region" tabindex="0" aria-label="${escapeHtml(stripTags(label))}">\n${markup}\n</div>`;
}

function renderMarkdown(markdown, number) {
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => level === 2
    ? `<h2 class="slide-title" id="slide-${number}-title">${text}</h2>\n`
    : `<h${level}>${text}</h${level}>\n`;
  return marked.parse(markdown, { renderer });
}

function stageStrip(stage) {
  if (!stage) return '';
  const items = STAGES.map((label) => label.toLowerCase() === stage
    ? `<li aria-current="step">${label}</li>`
    : `<li>${label}</li>`).join('');
  return `<ol class="stage-strip" aria-label="Agreement steps">${items}</ol>\n`;
}

function loadDeck() {
  const source = fs.readFileSync(SOURCE, 'utf8').replace(/\r\n/g, '\n');
  const chunks = source.slice(source.search(/^<!-- slide:/m)).split(/^---[ \t]*$/m);
  const total = chunks.length;
  return chunks.map((chunk, index) => {
    const number = index + 1;
    const meta = chunk.match(/<!--\s*slide:([^>]*?)-->/);
    if (!meta) throw new Error(`Slide ${number} is missing its <!-- slide: --> front matter.`);
    const attributes = parseAttributes(meta[1]);
    const [body, notes = ''] = chunk.replace(meta[0], '').split(/^Notes:[ \t]*$/m);
    let html = renderMarkdown(fencedDivs(body), number)
      .replace(/^\s*<p>([\s\S]*?)<\/p>\s*(<h2 class="slide-title")/, '<p class="slide-kicker">$1</p>\n$2')
      .replace(/<!--\s*visual:\s*([a-z0-9-]+)\s*-->/g, (_, name) => embedVisual(name));
    const heading = html.match(/<h2 class="slide-title"[^>]*>([\s\S]*?)<\/h2>/);
    if (!heading) throw new Error(`Slide ${number} has no ## title.`);
    const layout = attributes.layout || 'default';
    if (LOGO_LAYOUTS.has(layout)) {
      html += '\n<img class="slide-logo" src="assets/img/logo-full.png" alt="Real Value Acceleration Program" />';
    }
    html = stageStrip(attributes.stage) + html.trim() +
      `\n<div class="slide-foot"><span>${DECK_TITLE}</span><span>${number} / ${total}</span></div>`;
    return {
      number,
      id: attributes.id || `slide-${number}`,
      layout,
      stage: attributes.stage || null,
      title: stripTags(heading[1]),
      html,
      notesHtml: marked.parse(notes.trim()).trim(),
    };
  });
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function pdfLabel() {
  return fs.existsSync(PDF) ? `PDF, ${formatSize(fs.statSync(PDF).size)}` : 'PDF';
}

function renderSlide(slide, total) {
  const n = slide.number;
  return `<section class="deck-entry" id="slide-${n}" data-slide-id="${slide.id}" aria-labelledby="slide-${n}-title">
<div class="slide-stage">
<div class="slide-frame">
<div class="slide slide--${slide.layout}">
${slide.html}
</div>
</div>
</div>
<div class="slide-notes">
<div class="slide-notes-head">
<h3 id="slide-${n}-notes">Speaker notes <span class="visually-hidden">for slide ${n} of ${total}</span></h3>
<button class="present-from" type="button" data-present="${n}" hidden>Present from slide ${n}</button>
</div>
${slide.notesHtml}
</div>
</section>`;
}

const ICONS = {
  prev: '<path d="m15 18-6-6 6-6" />',
  next: '<path d="m9 18 6-6-6-6" />',
  notes: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />',
  full: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />',
  exit: '<path d="M6 6l12 12M18 6 6 18" />',
};

function icon(name) {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

function renderDeck(slides) {
  const total = slides.length;
  return `<div class="deck" id="deck" data-total="${total}">
${slides.map((slide) => renderSlide(slide, total)).join('\n')}
<div class="present-bar" hidden>
<button class="present-button" type="button" data-action="prev" aria-label="Previous slide">${icon('prev')}</button>
<p class="present-count" aria-hidden="true"><span data-role="current">1</span> / ${total}</p>
<button class="present-button" type="button" data-action="next" aria-label="Next slide">${icon('next')}</button>
<span class="present-spacer"></span>
<button class="present-button present-button-text" type="button" data-action="notes" aria-pressed="false">${icon('notes')}<span>Notes</span> <kbd>N</kbd></button>
<button class="present-button present-button-text" type="button" data-action="fullscreen" aria-pressed="false">${icon('full')}<span>Full screen</span> <kbd>F</kbd></button>
<button class="present-button present-button-text" type="button" data-action="exit">${icon('exit')}<span>Exit</span> <kbd>Esc</kbd></button>
</div>
<p class="visually-hidden" id="deck-status" aria-live="polite"></p>
</div>`;
}

function renderWhy({ primaryLinks = '' } = {}) {
  const slides = loadDeck();
  return fs.readFileSync(TEMPLATE, 'utf8')
    .replace('<!-- primary-links -->', () => primaryLinks)
    .replace('{{pdf-label}}', () => pdfLabel())
    .replace('{{slide-count}}', () => String(slides.length))
    .replace('<!-- deck -->', () => renderDeck(slides));
}

// The PDF prints why.html through the @media print rules in slides.css.
function renderPrint(options) {
  return renderWhy(options);
}

module.exports = { deckSourceFiles, deckSourceHash, loadDeck, renderPrint, renderWhy };
