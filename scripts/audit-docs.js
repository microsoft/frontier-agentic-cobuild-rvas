#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { TextDecoder } = require('node:util');
const marked = require('../docs/assets/js/marked.min.js');
const ROOT = path.resolve(__dirname, '..');

function walk(directory, predicate, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory() && !['vendor', 'graphify-out', '__pycache__'].includes(entry.name) && !entry.name.startsWith('.')) {
      walk(file, predicate, files);
    }
    else if (predicate(file)) files.push(file);
  }
  return files;
}

function sourceDocs() {
  return ['README.md', 'CONTRIBUTING.md', 'PRODUCT.md', 'DESIGN.md'].map((name) => path.join(ROOT, name))
    .concat(walk(path.join(ROOT, 'docs'), (file) => file.endsWith('.md')))
    .concat(walk(path.join(ROOT, 'plugins'), (file) => file.endsWith('.md')));
}

function slug(text) {
  return text.replace(/<[^>]+>/g, '').replace(/[`*]/g, '').trim().toLowerCase()
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function anchors(file) {
  const text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.html')) return new Set([...text.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
  return new Set([...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => slug(match[1])));
}

function checkLink(file, href, failures) {
  if (!href || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(href)) return;
  const [pathname, hash] = href.split('#', 2);
  let resolved;
  try { resolved = pathname ? path.resolve(path.dirname(file), decodeURIComponent(pathname.split('?')[0])) : file; }
  catch (error) { failures.push(`${path.relative(ROOT, file)}: invalid link encoding ${href}`); return; }
  if (!resolved.startsWith(ROOT + path.sep) || !fs.existsSync(resolved)) {
    failures.push(`${path.relative(ROOT, file)}: broken local link ${href}`);
  } else if (hash && /\.(md|html)$/.test(resolved) && !anchors(resolved).has(hash)) {
    failures.push(`${path.relative(ROOT, file)}: missing anchor ${href}`);
  }
}

function auditLinks(file, text, failures) {
  if (file.endsWith('.md')) {
    marked.walkTokens(marked.lexer(text), (token) => {
      if (token.type === 'link' || token.type === 'image') checkLink(file, token.href, failures);
    });
  } else {
    for (const match of text.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) checkLink(file, match[1], failures);
  }
}

function audit(files) {
  const failures = [];
  for (const file of files) {
    let text;
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(file)); }
    catch (error) { failures.push(`${path.relative(ROOT, file)}: invalid UTF-8`); continue; }
    if (/\uFFFD|Ã[\u0080-\u00bf]|â€/.test(text)) failures.push(`${path.relative(ROOT, file)}: invalid text encoding`);
    auditLinks(file, text, failures);
  }
  return failures;
}

function run(mode) {
  const html = ['index.html', 'start.html'].map((name) => path.join(ROOT, 'docs', name));
  const files = mode === '--generated' ? html : mode === '--source' ? sourceDocs() : sourceDocs().concat(html);
  const failures = audit(files);
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  } else console.log(`Documentation audit passed (${files.length} files).`);
}

if (require.main === module) run(process.argv[2]);
module.exports = { sourceDocs, audit, checkLink };
