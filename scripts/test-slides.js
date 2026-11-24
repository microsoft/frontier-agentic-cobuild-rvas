'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const build = require('../docs/build');
const deck = require('../docs/deck');

const DOCS = path.join(__dirname, '..', 'docs');
const PDF = path.join(DOCS, 'assets', 'slides', 'agree-before-you-delegate.pdf');
const why = fs.readFileSync(path.join(DOCS, 'why.html'), 'utf8');
const slides = deck.loadDeck();

test('why.html is generated from the deck source', () => {
  assert.equal(why, build.renderWhy(), 'Run `node docs/build.js` to regenerate why.html.');
});

test('the deck has 16 titled slides, readable without JavaScript', () => {
  assert.equal(slides.length, 16);
  for (const slide of slides) {
    assert.ok(slide.title, `slide ${slide.number} has no title`);
    assert.ok(slide.notesHtml.trim(), `slide ${slide.number} has no speaker notes`);
    assert.match(why, new RegExp(`<section class="deck-entry" id="slide-${slide.number}"`));
  }
  // Present mode is the only JS-dependent part; the read view must not be hidden.
  assert.doesNotMatch(why, /<div class="deck"[^>]*hidden/);
});

test('the PDF has one page per slide and matches the current source', () => {
  const pdf = fs.readFileSync(PDF, 'latin1');
  const pages = pdf.match(/\/Type\s*\/Page(?![s\w])/g) || [];
  assert.equal(pages.length, slides.length);
  const recorded = fs.readFileSync(`${PDF}.sha256`, 'utf8').trim();
  assert.equal(recorded, deck.deckSourceHash(), 'Deck source changed: run `npm run export:slides`.');
});

test('ids in why.html are unique', () => {
  const ids = [...why.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepEqual(dupes, []);
});

test('every slide SVG is labelled or hidden from assistive technology', () => {
  for (const svg of why.match(/<svg\b[^>]*>/g)) {
    if (/aria-hidden="true"/.test(svg)) continue;
    assert.match(svg, /role="img"/, svg);
    assert.match(svg, /aria-labelledby="[^"]+"/, svg);
  }
  const labelled = why.match(/<svg\b[^>]*role="img"[^>]*>\s*<title id=/g) || [];
  assert.equal(labelled.length, (why.match(/<svg\b[^>]*role="img"/g) || []).length);
});
