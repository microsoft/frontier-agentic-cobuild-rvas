#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const PDFDocument = require('pdfkit');
const pptxgen = require('pptxgenjs');
const JSZip = require('jszip');
const { loadScenarioRegistry } = require('../docs/build');

const ROOT = path.resolve(__dirname, '..');
const BUILD_TIMESTAMP = '1980-01-01T00:00:00.000Z';
const OUTPUT_DIR = path.join(ROOT, 'docs', 'assets', 'downloads');
const FONT_OUTPUT_DIR = path.join(ROOT, 'docs', 'assets', 'fonts');
const LOGO_DARK = path.join(ROOT, 'docs', 'assets', 'img', 'logo-mark-slide.png');
const LOGO_LIGHT = path.join(ROOT, 'docs', 'assets', 'img', 'logo-mark-white-slide.png');
const FONT_FILES = {
  outfit500: path.join(ROOT, 'node_modules', '@fontsource', 'outfit', 'files', 'outfit-latin-500-normal.woff2'),
  outfit700: path.join(ROOT, 'node_modules', '@fontsource', 'outfit', 'files', 'outfit-latin-700-normal.woff2'),
  inter400: path.join(ROOT, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-400-normal.woff2'),
  inter600: path.join(ROOT, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-600-normal.woff2'),
};
const PDF_FONT_FILES = {
  outfit700: path.join(FONT_OUTPUT_DIR, 'outfit-700.ttf'),
  inter400: path.join(FONT_OUTPUT_DIR, 'inter-400.ttf'),
  inter600: path.join(FONT_OUTPUT_DIR, 'inter-600.ttf'),
};
const COLORS = {
  navy: '032254',
  blue: '1A77E3',
  blueDark: '0F3A7A',
  bluePale: 'E8F2FF',
  teal: '14868A',
  purple: '504092',
  ink: '111827',
  muted: '52647B',
  line: 'DDE6F7',
  white: 'FFFFFF',
};

function stripInline(markdown) {
  return String(markdown || '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[*_`~]/gu, '')
    .replace(/<[^>]+>/gu, '')
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
    .trim();
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/u);
  if (!match) return { attributes: {}, content: source.trim() };
  const attributes = {};
  match[1].split('\n').forEach((line) => {
    const entry = line.match(/^([a-z0-9_-]+):\s*(.*)$/iu);
    if (entry) attributes[entry[1]] = entry[2].replace(/^["']|["']$/gu, '');
  });
  return { attributes, content: source.slice(match[0].length).trim() };
}

function parseBlocks(markdown) {
  const lines = markdown.replace(/<!--[\s\S]*?-->/gu, '').split('\n');
  const headings = [];
  const blocks = [];
  let paragraph = [];
  let list = [];
  let table = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: stripInline(paragraph.join(' ')) });
      paragraph = [];
    }
    if (list.length) {
      blocks.push({ type: 'list', items: list });
      list = [];
    }
    if (table.length) {
      const rows = table
        .map((line) => line.split('|').slice(1, -1).map((cell) => stripInline(cell)))
        .filter((row) => !row.every((cell) => /^:?-{3,}:?$/u.test(cell)));
      if (rows.length) blocks.push({ type: 'table', rows });
      table = [];
    }
  };

  lines.forEach((line) => {
    const heading = line.match(/^(#{1,3})\s+(.+)$/u);
    if (heading) {
      flush();
      headings.push({ level: heading[1].length, text: stripInline(heading[2]) });
      return;
    }
    if (/^\s*\|.*\|\s*$/u.test(line)) {
      if (paragraph.length || list.length) flush();
      table.push(line.trim());
      return;
    }
    const bullet = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)$/u);
    if (bullet) {
      if (paragraph.length || table.length) flush();
      list.push(stripInline(bullet[1]));
      return;
    }
    if (!line.trim()) {
      flush();
      return;
    }
    paragraph.push(line.trim());
  });
  flush();
  return { headings, blocks };
}

function parseDeck(source) {
  const { attributes, content } = parseFrontmatter(source);
  const slides = content.split(/\n---\s*\n/gu).filter(Boolean).map((raw, index) => {
    const marker = raw.match(/^\s*<!--\s*slide:id=([a-z0-9-]+)\s*-->\s*/iu);
    const id = marker ? marker[1].toLowerCase() : `slide-${index + 1}`;
    const markdown = marker ? raw.slice(marker[0].length).trimStart() : raw.trimStart();
    const parsed = parseBlocks(markdown);
    return {
      id,
      kind: slideKind(id),
      title: parsed.headings[0]?.text || 'Discussion slide',
      subtitle: parsed.headings[1]?.text || '',
      blocks: parsed.blocks,
    };
  });
  return { attributes, slides };
}

function slideKind(id) {
  if (id.endsWith('-choices')) return 'choices';
  if (id.endsWith('-evidence')) return 'evidence';
  if (id.endsWith('-context')) return 'context';
  if (id.includes('next-session') || id.includes('close')) return 'close';
  return 'orient';
}

function addPptxChrome(pptx, slide, scenario, item, index, total) {
  const dark = item.kind === 'orient' || item.kind === 'close';
  slide.background = { color: dark ? COLORS.navy : COLORS.white };
  if (!dark) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.333, h: 0.08,
      line: { color: COLORS.blue, transparency: 100 },
      fill: { color: COLORS.blue },
    });
  }
  slide.addImage({
    path: dark ? LOGO_LIGHT : LOGO_DARK,
    x: 0.48, y: 0.25, w: 0.42, h: 0.42,
    transparency: dark ? 5 : 12,
  });
  slide.addText(scenario.name, {
    x: 1.0, y: 0.28, w: 9.7, h: 0.22,
    fontFace: 'Inter', fontSize: 8.5, bold: true,
    color: dark ? 'C8DDFB' : COLORS.muted, charSpacing: 0.7,
    margin: 0, breakLine: false,
  });
  slide.addText(`${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, {
    x: 11.7, y: 0.28, w: 1.1, h: 0.22,
    fontFace: 'Inter', fontSize: 8.5, bold: true,
    color: dark ? 'C8DDFB' : COLORS.muted, align: 'right', margin: 0,
  });
}

function addPptxContent(pptx, slide, item) {
  const dark = item.kind === 'orient' || item.kind === 'close';
  const titleColor = dark ? COLORS.white : COLORS.navy;
  const bodyColor = dark ? COLORS.white : COLORS.ink;
  const density = item.blocks.reduce((sum, block) => {
    if (block.type === 'table') return sum + block.rows.flat().join(' ').length * 1.25;
    if (block.type === 'list') return sum + block.items.join(' ').length;
    return sum + block.text.length;
  }, 0);
  const titleSize = item.title.length > 58 ? 25 : item.title.length > 38 ? 29 : 34;
  const bodySize = density > 950 ? 13 : density > 650 ? 15 : 17;
  let y = 0.95;

  slide.addText(item.title, {
    x: 0.78, y, w: 11.55, h: item.subtitle ? 0.66 : 0.9,
    fontFace: 'Outfit', fontSize: titleSize, bold: true,
    color: titleColor, margin: 0, breakLine: false, fit: 'shrink',
  });
  y += item.subtitle ? 0.72 : 1.0;
  if (item.subtitle) {
    slide.addText(item.subtitle, {
      x: 0.8, y, w: 11.3, h: 0.55,
      fontFace: 'Outfit', fontSize: Math.max(19, titleSize - 8), bold: true,
      color: dark ? 'BFDBFE' : COLORS.blue, margin: 0, fit: 'shrink',
    });
    y += 0.72;
  }

  const remaining = 6.7 - y;
  const tableBlock = item.blocks.find((block) => block.type === 'table');
  const otherBlocks = item.blocks.filter((block) => block !== tableBlock);
  if (tableBlock) {
    if (otherBlocks.length) {
      const intro = otherBlocks.map(blockText).filter(Boolean).join('\n\n');
      slide.addText(intro, {
        x: 0.82, y, w: 11.4, h: Math.min(1.15, remaining * 0.24),
        fontFace: 'Inter', fontSize: Math.min(16, bodySize), color: bodyColor,
        margin: 0, breakLine: false, valign: 'top', fit: 'shrink',
      });
      y += Math.min(1.35, remaining * 0.27);
    }
    const rows = tableBlock.rows;
    slide.addTable(rows, {
      x: 0.8, y, w: 11.7, h: Math.max(2.2, 6.85 - y),
      border: { type: 'solid', color: dark ? '6887B8' : COLORS.line, pt: 0.7 },
      fill: dark ? COLORS.blueDark : COLORS.white,
      color: bodyColor,
      fontFace: 'Inter', fontSize: Math.max(11, bodySize - 2),
      margin: 0.08,
      bold: false,
      autoFit: false,
      rowH: 0.42,
    });
    return;
  }

  const runs = [];
  otherBlocks.forEach((block, blockIndex) => {
    if (blockIndex) runs.push({ text: '\n', options: { breakLine: true } });
    if (block.type === 'list') {
      block.items.forEach((itemText) => {
        runs.push({
          text: itemText,
          options: { bullet: { indent: bodySize }, hanging: 3, breakLine: true },
        });
      });
    } else {
      runs.push({ text: block.text, options: { breakLine: true } });
    }
  });
  slide.addText(runs.length ? runs : '', {
    x: 0.82, y, w: 11.35, h: Math.max(1.2, 6.78 - y),
    fontFace: 'Inter', fontSize: bodySize, color: bodyColor,
    margin: 0, breakLine: false, breakLineOnTextOverflow: false,
    paraSpaceAfterPt: 8, valign: 'top', fit: 'shrink',
  });
}

function blockText(block) {
  if (block.type === 'list') return block.items.map((item) => `• ${item}`).join('\n');
  return block.text || '';
}

function buildDate() {
  return new Date(BUILD_TIMESTAMP);
}

async function normalizePptx(buffer) {
  const archive = await JSZip.loadAsync(buffer);
  const coreProperties = archive.file('docProps/core.xml');
  if (!coreProperties) throw new Error('PowerPoint core properties are missing.');

  const metadata = await coreProperties.async('string');
  archive.file(
    'docProps/core.xml',
    metadata
      .replace(/(<dcterms:created[^>]*>)[^<]+(<\/dcterms:created>)/u, `$1${BUILD_TIMESTAMP}$2`)
      .replace(/(<dcterms:modified[^>]*>)[^<]+(<\/dcterms:modified>)/u, `$1${BUILD_TIMESTAMP}$2`),
    { date: buildDate() },
  );
  archive.forEach((_path, entry) => {
    entry.date = buildDate();
  });

  return archive.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
    platform: 'DOS',
  });
}

async function writePptx(scenario, deck, outputPath) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Real Value Acceleration Program';
  pptx.company = 'Microsoft';
  pptx.subject = 'Customer decision discussion deck';
  pptx.title = deck.attributes.title || scenario.name;
  pptx.lang = 'en-US';
  pptx.theme = {
    headFontFace: 'Outfit',
    bodyFontFace: 'Inter',
    lang: 'en-US',
  };
  deck.slides.forEach((item, index) => {
    const slide = pptx.addSlide();
    addPptxChrome(pptx, slide, scenario, item, index, deck.slides.length);
    addPptxContent(pptx, slide, item);
  });
  const output = await pptx.write({ outputType: 'nodebuffer', compression: true });
  fs.writeFileSync(outputPath, await normalizePptx(output));
}

function pdfColor(hex) {
  return `#${hex}`;
}

function writePdf(scenario, deck, outputPath) {
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({
      autoFirstPage: false,
      size: [960, 540],
      margin: 0,
      info: { CreationDate: buildDate(), ModDate: buildDate() },
    });
    pdf.registerFont('Outfit', PDF_FONT_FILES.outfit700);
    pdf.registerFont('Inter', PDF_FONT_FILES.inter400);
    pdf.registerFont('Inter-Semibold', PDF_FONT_FILES.inter600);
    const output = fs.createWriteStream(outputPath);
    output.on('finish', resolve);
    output.on('error', reject);
    pdf.pipe(output);

    deck.slides.forEach((item, index) => {
      const dark = item.kind === 'orient' || item.kind === 'close';
      pdf.addPage();
      pdf.rect(0, 0, 960, 540).fill(pdfColor(dark ? COLORS.navy : COLORS.white));
      if (!dark) pdf.rect(0, 0, 960, 6).fill(pdfColor(COLORS.blue));
      pdf.fillColor(pdfColor(dark ? 'C8DDFB' : COLORS.muted))
        .font('Inter-Semibold').fontSize(8)
        .text(scenario.name.toUpperCase(), 58, 24, { width: 720, characterSpacing: 0.7 });
      pdf.text(`${String(index + 1).padStart(2, '0')} / ${String(deck.slides.length).padStart(2, '0')}`, 820, 24, { width: 80, align: 'right' });

      let y = 74;
      const titleSize = item.title.length > 58 ? 27 : item.title.length > 38 ? 31 : 36;
      pdf.fillColor(pdfColor(dark ? COLORS.white : COLORS.navy))
        .font('Outfit').fontSize(titleSize)
        .text(item.title, 60, y, { width: 820, lineGap: -2 });
      y = pdf.y + 8;
      if (item.subtitle) {
        pdf.fillColor(pdfColor(dark ? 'BFDBFE' : COLORS.blue))
          .font('Outfit').fontSize(Math.max(20, titleSize - 10))
          .text(item.subtitle, 60, y, { width: 820, lineGap: -1 });
        y = pdf.y + 12;
      }

      const density = item.blocks.map(blockText).join(' ').length;
      const fontSize = density > 950 ? 10.5 : density > 650 ? 12 : 14;
      const bodyColor = pdfColor(dark ? COLORS.white : COLORS.ink);
      item.blocks.forEach((block) => {
        if (block.type === 'table') {
          const columnWidth = 820 / Math.max(1, block.rows[0]?.length || 1);
          block.rows.forEach((row, rowIndex) => {
            const rowHeight = Math.max(28, ...row.map((cell) =>
              pdf.heightOfString(cell, { width: columnWidth - 16 }) + 12));
            row.forEach((cell, columnIndex) => {
              const x = 60 + columnIndex * columnWidth;
              pdf.rect(x, y, columnWidth, rowHeight)
                .strokeColor(pdfColor(dark ? '6887B8' : COLORS.line)).lineWidth(0.6).stroke();
              pdf.fillColor(bodyColor)
                .font(rowIndex === 0 ? 'Inter-Semibold' : 'Inter')
                .fontSize(Math.max(9.5, fontSize - 1))
                .text(cell, x + 8, y + 7, { width: columnWidth - 16, height: rowHeight - 10 });
            });
            y += rowHeight;
          });
        } else if (block.type === 'list') {
          pdf.fillColor(bodyColor).font('Inter').fontSize(fontSize);
          block.items.forEach((text) => {
            pdf.text(`•  ${text}`, 72, y, { width: 800, indent: 0, lineGap: 2 });
            y = pdf.y + 4;
          });
          y += 5;
        } else {
          pdf.fillColor(bodyColor).font('Inter').fontSize(fontSize)
            .text(block.text, 60, y, { width: 820, lineGap: 3 });
          y = pdf.y + 10;
        }
      });
    });
    pdf.end();
  });
}

async function buildSlides() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(FONT_OUTPUT_DIR, { recursive: true });
  for (const [name, source] of Object.entries(FONT_FILES)) {
    const outputName = {
      outfit500: 'outfit-500.woff2',
      outfit700: 'outfit-700.woff2',
      inter400: 'inter-400.woff2',
      inter600: 'inter-600.woff2',
    }[name];
    fs.copyFileSync(source, path.join(FONT_OUTPUT_DIR, outputName));
  }
  fs.copyFileSync(
    path.join(ROOT, 'node_modules', '@fontsource', 'outfit', 'LICENSE'),
    path.join(FONT_OUTPUT_DIR, 'LICENSE-Outfit.txt'),
  );
  fs.copyFileSync(
    path.join(ROOT, 'node_modules', '@fontsource', 'inter', 'LICENSE'),
    path.join(FONT_OUTPUT_DIR, 'LICENSE-Inter.txt'),
  );
  const scenarios = loadScenarioRegistry();
  for (const scenario of scenarios) {
    const source = fs.readFileSync(path.join(scenario.root, scenario.slides), 'utf8');
    const deck = parseDeck(source);
    await writePptx(scenario, deck, path.join(OUTPUT_DIR, `${scenario.id}.pptx`));
    await writePdf(scenario, deck, path.join(OUTPUT_DIR, `${scenario.id}.pdf`));
    console.log(`Built PDF and PowerPoint for ${scenario.name} (${deck.slides.length} slides).`);
  }
}

if (require.main === module) {
  buildSlides().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { parseDeck, parseFrontmatter, slideKind, stripInline };
