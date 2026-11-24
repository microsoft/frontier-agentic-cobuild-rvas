#!/usr/bin/env node
// Exports docs/why.html to a 16:9 PDF (one slide per page) with headless Chromium,
// then records the deck source hash so tests can detect a stale PDF.
// Usage: npm run export:slides
'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright-core');
const deck = require('../docs/deck');

const DOCS = path.join(__dirname, '..', 'docs');
const OUT_DIR = path.join(DOCS, 'assets', 'slides');
const PDF = path.join(OUT_DIR, 'agree-before-you-delegate.pdf');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

function writeWhy() {
  let html;
  try {
    html = require('../docs/build').renderWhy();
  } catch (error) {
    console.warn(`build.renderWhy failed (${error.message}); rendering with docs/deck.js directly.`);
    html = deck.renderWhy();
  }
  fs.writeFileSync(path.join(DOCS, 'why.html'), html);
}

function serve() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '');
    const file = path.resolve(DOCS, rel || 'index.html');
    if (!file.startsWith(DOCS + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function main() {
  writeWhy();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const server = await serve();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/why.html`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
    await page.pdf({ path: PDF, width: '13.333in', height: '7.5in', printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
    server.close();
  }
  fs.writeFileSync(`${PDF}.sha256`, `${deck.deckSourceHash()}\n`);
  // The page shows the PDF size, so render it again now the file exists.
  writeWhy();
  console.log(`Wrote ${path.relative(process.cwd(), PDF)} (${fs.statSync(PDF).size} bytes).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
