(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  const auth = new URLSearchParams({ t: params.get("t") ?? "", ws: params.get("ws") ?? "" });
  const api = (path, extra = {}) => `${path}?${new URLSearchParams({ ...Object.fromEntries(auth), ...extra })}`;
  const $ = (id) => document.getElementById(id);
  const NS = "http://www.w3.org/2000/svg";

  const state = { index: null, current: null, seen: new Map(), lastFocus: undefined, firstLoad: true, token: 0 };

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v === true ? "" : v);
    }
    node.append(...children.filter((c) => c != null));
    return node;
  }

  // ---------- Markdown (HTML in the source is escaped, never passed through) ----------
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function inline(text, linkBase) {
    const codes = [];
    let out = esc(text).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
    out = out
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:]|$)/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => link(label, href.replace(/&amp;/g, "&"), linkBase));
    return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
  }

  function link(label, href, base) {
    if (/^https?:\/\//i.test(href)) return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return label;
    const [pathPart] = href.split("#");
    const target = pathPart ? resolvePath(base, pathPart) : null;
    if (target && state.index?.items.some((i) => i.present && i.path === target))
      return `<a href="#" data-artifact="${esc(target)}">${label}</a>`;
    return `<span title="${esc(href)}">${label}</span>`;
  }

  function resolvePath(base, rel) {
    const parts = base.split("/").slice(0, -1);
    for (const seg of rel.split("/")) {
      if (seg === "..") parts.pop();
      else if (seg && seg !== ".") parts.push(seg);
    }
    return parts.join("/");
  }

  function markdown(src, base) {
    const lines = src.replace(/\r\n?/g, "\n").replace(/^---\n[\s\S]*?\n---\n/, "").split("\n");
    const out = [];
    let i = 0;
    const isBlockStart = (l) => /^(#{1,6}\s|```|>\s?|\s*([-*+]|\d+\.)\s|\s*\|)/.test(l) || /^\s*$/.test(l);

    while (i < lines.length) {
      const line = lines[i];
      if (/^\s*$/.test(line)) { i++; continue; }

      const fence = line.match(/^```\s*([\w-]*)/);
      if (fence) {
        const body = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
        i++;
        const lang = fence[1];
        if (lang === "mermaid") out.push(`<p class="src-label">Mermaid source</p>`);
        out.push(`<pre><code>${esc(body.join("\n"))}</code></pre>`);
        continue;
      }

      const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
      if (h) { out.push(`<h${h[1].length}>${inline(h[2], base)}</h${h[1].length}>`); i++; continue; }

      if (/^(-{3,}|\*{3,})\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

      if (/^\s*\|/.test(line) && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1] ?? "")) {
        const cells = (l) => l.trim().replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
        const head = cells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
        out.push(
          `<table><thead><tr>${head.map((c) => `<th>${inline(c, base)}</th>`).join("")}</tr></thead><tbody>` +
            rows.map((r) => `<tr>${head.map((_, n) => `<td>${inline(r[n] ?? "", base)}</td>`).join("")}</tr>`).join("") +
            `</tbody></table>`
        );
        continue;
      }

      if (/^>\s?/.test(line)) {
        const body = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ""));
        out.push(`<blockquote>${markdown(body.join("\n"), base)}</blockquote>`);
        continue;
      }

      if (/^\s*([-*+]|\d+\.)\s/.test(line)) {
        const ordered = /^\s*\d+\./.test(line);
        const items = [];
        while (i < lines.length && /^\s*([-*+]|\d+\.)\s/.test(lines[i])) {
          const m = lines[i].match(/^(\s*)(?:[-*+]|\d+\.)\s+(.*)$/);
          items.push({ depth: Math.floor(m[1].length / 2), text: m[2] });
          i++;
          while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*+]|\d+\.)\s/.test(lines[i]))
            items[items.length - 1].text += " " + lines[i++].trim();
        }
        out.push(renderList(items, ordered, base));
        continue;
      }

      const para = [line];
      i++;
      while (i < lines.length && !isBlockStart(lines[i])) para.push(lines[i++]);
      out.push(`<p>${inline(para.join(" "), base)}</p>`);
    }
    return out.join("\n");
  }

  function renderList(items, ordered, base) {
    const tag = ordered ? "ol" : "ul";
    let html = "";
    let open = 0;
    for (const item of items) {
      const depth = Math.min(item.depth, open);
      while (open > depth + 1) { html += `</li></${tag}>`; open--; }
      if (open === depth + 1) html += "</li>";
      else { html += `<${tag}>`; open++; }
      html += `<li>${inline(item.text, base)}`;
    }
    while (open-- > 0) html += `</li></${tag}>`;
    return html;
  }

  // ---------- draw.io renderer ----------
  async function inflateBase64(b64) {
    const bytes = Uint8Array.from(atob(b64.trim()), (c) => c.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return decodeURIComponent(await new Response(stream).text());
  }

  async function parseDrawio(text) {
    const doc = new DOMParser().parseFromString(text, "text/xml");
    if (doc.querySelector("parsererror")) throw new Error("The .drawio file is not valid XML.");
    const diagrams = [...doc.querySelectorAll("diagram")];
    const roots = [];
    if (!diagrams.length) {
      const model = doc.querySelector("mxGraphModel");
      if (model) roots.push({ name: "Page 1", model });
    }
    for (const [n, d] of diagrams.entries()) {
      let model = d.querySelector("mxGraphModel");
      if (!model && d.textContent.trim()) {
        const xml = await inflateBase64(d.textContent);
        model = new DOMParser().parseFromString(xml, "text/xml").querySelector("mxGraphModel");
      }
      if (model) roots.push({ name: d.getAttribute("name") || `Page ${n + 1}`, model });
    }
    if (!roots.length) throw new Error("No diagram pages found in the .drawio file.");
    return roots;
  }

  const styleOf = (s) => {
    const o = {};
    for (const part of (s ?? "").split(";")) {
      if (!part) continue;
      const eq = part.indexOf("=");
      if (eq < 0) o[part] = "1";
      else o[part.slice(0, eq)] = part.slice(eq + 1);
    }
    return o;
  };

  function labelText(value) {
    if (!value) return "";
    if (!/[<&]/.test(value)) return value;
    const html = new DOMParser().parseFromString(value.replace(/<br\s*\/?>|<\/(div|p|li)>/gi, "\n"), "text/html");
    return html.body.textContent.replace(/\n{3,}/g, "\n\n").trim();
  }

  // Only inline raster/SVG data URIs render. An SVG inside <image> cannot run script or fetch resources.
  function safeImage(uri) {
    if (!uri) return null;
    if (/^data:image\/svg\+xml,%3C[A-Za-z0-9%._~!*'()-]*$/.test(uri)) return uri;
    const u = /^data:image\/svg\+xml,[A-Za-z0-9+/=]+$/.test(uri) ? uri.replace("data:image/svg+xml,", "data:image/svg+xml;base64,") : uri;
    return /^data:image\/(svg\+xml|png|jpe?g|gif);base64,[A-Za-z0-9+/=]+$/.test(u) ? u : null;
  }

  function wrap(text, widthPx, fontSize) {
    const max = Math.max(4, Math.floor(widthPx / (fontSize * 0.56)));
    const lines = [];
    for (const para of text.split("\n")) {
      let cur = "";
      for (const word of para.split(/\s+/)) {
        if (!cur) cur = word;
        else if ((cur + " " + word).length <= max) cur += " " + word;
        else { lines.push(cur); cur = word; }
      }
      lines.push(cur);
    }
    return lines;
  }

  function svgEl(tag, attrs = {}) {
    const node = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  }

  function drawText(parent, text, box, st) {
    if (!text) return;
    const size = parseFloat(st.fontSize) || 12;
    const below = st.verticalLabelPosition === "bottom";
    const lines = wrap(text, Math.max(box.w, 60) - 8, size);
    const lh = size * 1.25;
    const align = st.align ?? "center";
    const x = align === "left" ? box.x + 6 : align === "right" ? box.x + box.w - 6 : box.x + box.w / 2;
    const anchor = align === "left" ? "start" : align === "right" ? "end" : "middle";
    const vAlign = below ? "top" : st.verticalAlign ?? (st.swimlane || st.container === "1" ? "top" : "middle");
    const total = lines.length * lh;
    let y;
    if (below) y = box.y + box.h + 4;
    else if (vAlign === "top") y = box.y + 4;
    else if (vAlign === "bottom") y = box.y + box.h - total - 4;
    else y = box.y + (box.h - total) / 2;
    const t = svgEl("text", {
      "font-size": size, "text-anchor": anchor, fill: st.fontColor && st.fontColor !== "default" ? st.fontColor : "#1f2937",
      "font-weight": (parseInt(st.fontStyle ?? "0", 10) & 1) ? "700" : "400",
      "font-family": "Inter, system-ui, sans-serif",
    });
    lines.forEach((l, n) => {
      const span = svgEl("tspan", { x, y: y + size + n * lh - size * 0.2 });
      span.textContent = l;
      t.append(span);
    });
    parent.append(t);
  }

  function colour(v, fallback) {
    if (!v || v === "default") return fallback;
    return v === "none" ? "none" : /^#?[0-9a-fA-F]{3,8}$/.test(v) ? (v[0] === "#" ? v : "#" + v) : /^[a-z]+$/i.test(v) ? v : fallback;
  }

  function renderModel(model) {
    const cells = new Map();
    const order = [];
    for (const c of model.querySelectorAll("mxCell, object > mxCell, UserObject > mxCell")) {
      const wrapper = c.parentElement.tagName !== "root" ? c.parentElement : null;
      const id = (wrapper ?? c).getAttribute("id");
      const geo = c.querySelector(":scope > mxGeometry");
      const num = (a) => parseFloat(geo?.getAttribute(a) ?? "0") || 0;
      const cell = {
        id, parent: c.getAttribute("parent"), source: c.getAttribute("source"), target: c.getAttribute("target"),
        vertex: c.getAttribute("vertex") === "1", edge: c.getAttribute("edge") === "1",
        value: wrapper?.getAttribute("label") ?? c.getAttribute("value") ?? "", st: styleOf(c.getAttribute("style")),
        g: geo ? { x: num("x"), y: num("y"), w: num("width"), h: num("height") } : null,
        pts: [...(geo?.querySelectorAll('Array[as="points"] > mxPoint') ?? [])].map((p) => ({ x: +p.getAttribute("x") || 0, y: +p.getAttribute("y") || 0 })),
        sp: geo?.querySelector('mxPoint[as="sourcePoint"]'), tp: geo?.querySelector('mxPoint[as="targetPoint"]'),
      };
      cells.set(id, cell);
      order.push(cell);
    }

    const abs = (cell) => {
      if (cell.box) return cell.box;
      let { x, y, w, h } = cell.g ?? { x: 0, y: 0, w: 0, h: 0 };
      const p = cells.get(cell.parent);
      if (p?.vertex) { const pb = abs(p); x += pb.x; y += pb.y; }
      return (cell.box = { x, y, w, h });
    };

    const svg = svgEl("svg", { xmlns: NS });
    const defs = svgEl("defs");
    const marker = svgEl("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "8", markerHeight: "8", orient: "auto-start-reverse" });
    marker.append(svgEl("path", { d: "M0 0L10 5L0 10z", fill: "context-stroke" }));
    defs.append(marker);
    svg.append(defs);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const grow = (x, y) => { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); };

    const edgePoint = (box, toward) => {
      const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      const dx = toward.x - cx, dy = toward.y - cy;
      if (!dx && !dy) return { x: cx, y: cy };
      const sx = dx ? box.w / 2 / Math.abs(dx) : Infinity, sy = dy ? box.h / 2 / Math.abs(dy) : Infinity;
      const s = Math.min(sx, sy);
      return { x: cx + dx * s, y: cy + dy * s };
    };

    for (const cell of order) {
      const st = cell.st;
      const text = labelText(cell.value);
      if (cell.vertex && cell.g) {
        const b = abs(cell);
        grow(b.x, b.y); grow(b.x + b.w, b.y + b.h);
        const g = svgEl("g");
        const image = safeImage(st.image);
        const fill = colour(st.fillColor, st.swimlane || st.container === "1" || st.text !== undefined ? "none" : "#fff");
        const stroke = colour(st.strokeColor, "#6b7280");
        const common = { fill, stroke, "stroke-width": st.strokeWidth ?? 1 };
        if (st.dashed === "1") common["stroke-dasharray"] = "6 4";
        if (image) {
          g.append(svgEl("image", { href: image, x: b.x, y: b.y, width: b.w, height: b.h, preserveAspectRatio: "xMidYMid meet" }));
        } else if (st.text !== undefined || st.shape === "text") {
          // Text-only cell: label without an outline.
        } else if (st.ellipse !== undefined || st.shape === "ellipse") {
          g.append(svgEl("ellipse", { cx: b.x + b.w / 2, cy: b.y + b.h / 2, rx: b.w / 2, ry: b.h / 2, ...common }));
        } else if (st.rhombus !== undefined || st.shape === "rhombus") {
          const { x, y, w, h } = b;
          g.append(svgEl("polygon", { points: `${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`, ...common }));
        } else {
          const r = st.rounded === "1" ? Math.min(12, b.w / 6, b.h / 6) : 0;
          g.append(svgEl("rect", { x: b.x, y: b.y, width: b.w, height: b.h, rx: r, ry: r, ...common }));
          if (st.swimlane !== undefined) {
            const start = parseFloat(st.startSize) || 23;
            g.append(svgEl("line", { x1: b.x, y1: b.y + start, x2: b.x + b.w, y2: b.y + start, stroke }));
          }
        }
        drawText(g, text, b, st);
        svg.append(g);
      }
    }

    // Edges after vertices so they stay visible over containers.
    for (const cell of order) {
      if (!cell.edge) continue;
      const src = cells.get(cell.source), tgt = cells.get(cell.target);
      const sb = src?.vertex ? abs(src) : null, tb = tgt?.vertex ? abs(tgt) : null;
      const pt = (n) => (n ? { x: +n.getAttribute("x") || 0, y: +n.getAttribute("y") || 0 } : null);
      let pts = cell.pts.slice();
      const first = pts[0] ?? (tb ? { x: tb.x + tb.w / 2, y: tb.y + tb.h / 2 } : pt(cell.tp));
      const last = pts[pts.length - 1] ?? (sb ? { x: sb.x + sb.w / 2, y: sb.y + sb.h / 2 } : pt(cell.sp));
      const start = sb && first ? edgePoint(sb, first) : pt(cell.sp);
      const end = tb && last ? edgePoint(tb, last) : pt(cell.tp);
      if (!start || !end) continue;
      let path = [start, ...pts, end];
      if (!pts.length && cell.st.edgeStyle?.startsWith("orthogonal") && Math.abs(start.x - end.x) > 1 && Math.abs(start.y - end.y) > 1) {
        const horizontal = sb && tb ? Math.abs(start.x - end.x) >= Math.abs(start.y - end.y) : true;
        const mid = horizontal ? { x: (start.x + end.x) / 2 } : { y: (start.y + end.y) / 2 };
        path = horizontal
          ? [start, { x: mid.x, y: start.y }, { x: mid.x, y: end.y }, end]
          : [start, { x: start.x, y: mid.y }, { x: end.x, y: mid.y }, end];
      }
      path.forEach((p) => grow(p.x, p.y));
      const stroke = colour(cell.st.strokeColor, "#374151");
      const line = svgEl("polyline", {
        points: path.map((p) => `${p.x},${p.y}`).join(" "), fill: "none", stroke, "stroke-width": cell.st.strokeWidth ?? 1.5,
      });
      if (cell.st.dashed === "1") line.setAttribute("stroke-dasharray", "6 4");
      if (cell.st.endArrow !== "none") line.setAttribute("marker-end", "url(#arrow)");
      if (cell.st.startArrow && cell.st.startArrow !== "none") line.setAttribute("marker-start", "url(#arrow)");
      svg.append(line);
      const text = labelText(cell.value);
      if (text) {
        const m = path[Math.floor(path.length / 2)], p0 = path[Math.floor((path.length - 1) / 2)];
        const mid = path.length % 2 ? m : { x: (m.x + p0.x) / 2, y: (m.y + p0.y) / 2 };
        const lines = wrap(text, 160, 11);
        const w = Math.min(160, Math.max(...lines.map((l) => l.length)) * 6.2 + 8), h = lines.length * 14 + 4;
        svg.append(svgEl("rect", { x: mid.x - w / 2, y: mid.y - h / 2, width: w, height: h, fill: "#fff", opacity: ".9", rx: 3 }));
        drawText(svg, text, { x: mid.x - w / 2, y: mid.y - h / 2, w, h }, { fontSize: 11, verticalAlign: "middle" });
      }
    }

    if (!isFinite(minX)) throw new Error("This page has no drawable shapes.");
    const pad = 30;
    return { svg, box: { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad } };
  }

  function mountDiagram(pages, container, fileNote) {
    const wrapEl = el("div", { class: "diagram" });
    const bar = el("div", { class: "bar" });
    const stage = el("div", { style: "flex:1;min-height:0;display:flex" });
    wrapEl.append(bar, stage);
    container.replaceChildren(wrapEl);

    let current = 0, view, svg, base;
    const apply = () => svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
    const fit = () => { view = { ...base }; apply(); };
    const zoom = (f, cx, cy) => {
      cx ??= view.x + view.w / 2; cy ??= view.y + view.h / 2;
      view = { x: cx - (cx - view.x) * f, y: cy - (cy - view.y) * f, w: view.w * f, h: view.h * f };
      apply();
    };

    function show(n) {
      current = n;
      let rendered;
      try { rendered = renderModel(pages[n].model); } catch (e) { stage.replaceChildren(el("div", { class: "err" }, e.message)); return; }
      svg = rendered.svg; base = rendered.box;
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      stage.replaceChildren(svg);
      fit();
      svg.addEventListener("wheel", (e) => {
        e.preventDefault();
        const r = svg.getBoundingClientRect();
        const cx = view.x + ((e.clientX - r.left) / r.width) * view.w, cy = view.y + ((e.clientY - r.top) / r.height) * view.h;
        zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, cx, cy);
      }, { passive: false });
      let drag;
      svg.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY }; svg.setPointerCapture(e.pointerId); svg.classList.add("drag"); });
      svg.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const r = svg.getBoundingClientRect();
        const scale = Math.max(view.w / r.width, view.h / r.height);
        view.x -= (e.clientX - drag.x) * scale; view.y -= (e.clientY - drag.y) * scale;
        drag = { x: e.clientX, y: e.clientY };
        apply();
      });
      const end = () => { drag = null; svg.classList.remove("drag"); };
      svg.addEventListener("pointerup", end);
      svg.addEventListener("pointercancel", end);
      [...bar.querySelectorAll("[data-page]")].forEach((b, i) => b.setAttribute("aria-pressed", String(i === n)));
    }

    pages.forEach((p, n) => { if (pages.length > 1) bar.append(el("button", { "data-page": n, onclick: () => show(n) }, p.name)); });
    bar.append(
      el("span", { class: "sp" }),
      el("button", { onclick: () => zoom(1 / 1.25) }, "Zoom in"),
      el("button", { onclick: () => zoom(1.25) }, "Zoom out"),
      el("button", { onclick: fit }, "Fit"),
      el("span", { class: "hint" }, fileNote)
    );
    show(0);
    return { page: () => current, show };
  }

  // ---------- Viewer ----------
  const view = () => $("view");
  async function fetchText(path) {
    const r = await fetch(api("/api/file", { path }));
    if (!r.ok) throw new Error(`Cannot read ${path} (${r.status})`);
    return r;
  }

  const OVERVIEW = "@overview";
  const PHASES = ["Discover", "Architect", "Approve", "Handoff"];
  const PLANNED = {
    "visuals/shared-understanding.md": ["Discover", "The gate visuals and plain-language record of what the session agreed. The creator writes it before you confirm the shared understanding."],
    "solution.drawio": ["Architect", "The editable architecture diagram, one page per view. It is reviewed in a diagram gate before approval."],
    "solution.md": ["Architect", "The solution design: outcome, first journey, assumptions, components and trust boundary."],
    "specification.md": ["Architect", "Numbered requirements and acceptance criteria that the plan and implementation trace back to."],
    "cost-estimate.md": ["Architect", "The cost estimate with its pricing assumptions."],
    "implementation-plan.md": ["Architect", "The delivery plan, written before architecture approval. Implementation itself starts separately."],
  };

  function showOverview() {
    state.token++;
    state.current = OVERVIEW;
    renderNav();
    const items = state.index?.items ?? [];
    const core = items.filter((i) => i.core);
    const done = core.filter((i) => i.present).length;
    const phase = state.index?.phase;
    const wrap = el("article", { class: "doc" },
      el("h1", {}, "Co-build board"),
      el("p", {}, "This screen shows the architecture package as the creator writes it into ", el("code", {}, "docs/architecture/"), ". It is read-only: confirmations and approvals happen in the chat."),
      el("div", { class: "phases" }, ...PHASES.map((name) => el("span", { class: "phase-step", "aria-current": String(phase === name) }, name))),
      el("p", {}, phase ? `Current phase: ${phase}${state.index.note ? ". " + state.index.note : ""}` : "No phase reported yet."),
      el("h2", {}, `Package: ${done} of ${core.length} written`),
      el("ul", {}, ...core.map((i) => el("li", {},
        i.present
          ? el("a", { href: "#", "data-artifact": i.path }, i.title)
          : el("a", { href: "#", "data-planned": i.path }, i.title),
        i.present ? " is written." : ` comes in ${PLANNED[i.path]?.[0] ?? "a later phase"}.`)))
    );
    view().replaceChildren(wrap);
    view().scrollTop = 0;
  }

  function showPlanned(path) {
    state.token++;
    state.current = path;
    renderNav();
    const item = state.index.items.find((i) => i.path === path);
    const [phase, what] = PLANNED[path] ?? ["a later phase", "This file is not written yet."];
    view().replaceChildren(el("article", { class: "doc" },
      el("h1", {}, item?.title ?? path),
      el("p", {}, el("strong", {}, "Not written yet. "), `The creator produces it in the ${phase} phase.`),
      el("p", {}, what),
      el("p", {}, el("code", {}, "docs/architecture/" + path)),
      el("p", {}, el("a", { href: "#", "data-overview": "1" }, "Back to overview"))
    ));
  }

  async function openArtifact(path, { keepScroll = false } = {}) {
    const mine = ++state.token;
    state.current = path;
    renderNav();
    const main = view();
    const scroll = keepScroll ? main.scrollTop : 0;
    const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
    try {
      if (ext === ".md") {
        const text = await (await fetchText(path)).text();
        if (mine !== state.token) return;
        const doc = el("article", { class: "doc" });
        doc.innerHTML = markdown(text, path);
        main.replaceChildren(doc);
        main.scrollTop = scroll;
      } else if (ext === ".drawio") {
        const text = await (await fetchText(path)).text();
        const pages = await parseDrawio(text);
        if (mine !== state.token) return;
        mountDiagram(pages, main, "Editable source: open the .drawio file in draw.io to change it.");
      } else if (ext === ".html") {
        main.replaceChildren(el("iframe", { class: "frame", sandbox: "allow-scripts", src: api("/api/file", { path }), title: path }));
      } else {
        main.replaceChildren(el("div", { class: "img-wrap" }, el("img", { src: api("/api/file", { path }), alt: path })));
      }
    } catch (e) {
      if (mine === state.token) main.replaceChildren(el("div", { class: "err" }, e.message));
    }
  }

  function renderNav() {
    const nav = $("nav");
    const items = state.index?.items ?? [];
    nav.replaceChildren();
    nav.append(el("button", { "aria-current": String(state.current === OVERVIEW), onclick: () => { $("follow").checked = false; showOverview(); } }, el("span", {}, "Overview")));
    const groups = [["Package", items.filter((i) => i.core)], ["Other files", items.filter((i) => !i.core)]];
    for (const [title, list] of groups) {
      if (!list.length) continue;
      nav.append(el("h2", {}, title));
      for (const item of list) {
        const fresh = item.present && (state.seen.get(item.path) ?? 0) < item.mtime && state.current !== item.path;
        const tag = !item.present ? el("span", { class: "tag todo" }, "Not yet") : fresh ? el("span", { class: "tag" }, state.seen.has(item.path) ? "Updated" : "New") : null;
        nav.append(
          el("button", {
            class: item.present ? "" : "missing", "aria-current": String(state.current === item.path),
            onclick: () => { $("follow").checked = false; if (item.present) select(item.path); else showPlanned(item.path); },
          }, el("span", {}, item.title), tag)
        );
      }
    }
  }

  function select(path) {
    const item = state.index.items.find((i) => i.path === path);
    if (item?.mtime) state.seen.set(path, item.mtime);
    return openArtifact(path);
  }

  function onIndex(index) {
    const prev = state.index;
    state.index = index;
    $("phase").hidden = !index.phase;
    $("phase").textContent = index.phase;
    $("note").textContent = index.note ?? "";
    const present = index.items.filter((i) => i.present);
    const changed = present.filter((i) => !prev || (prev.items.find((p) => p.path === i.path)?.mtime ?? 0) < i.mtime);

    if (state.firstLoad) {
      for (const i of present) state.seen.set(i.path, i.mtime);
      state.firstLoad = false;
      const start = index.focus ?? present[0]?.path;
      if (start) select(start); else { state.autoOverview = true; showOverview(); }
      state.lastFocus = index.focus;
      return;
    }

    if (index.focus && index.focus !== state.lastFocus) {
      state.lastFocus = index.focus;
      select(index.focus);
      return;
    }

    if (state.autoOverview && present.length) {
      state.autoOverview = false;
      select(index.focus ?? present[0].path);
      return;
    }

    if (state.current === OVERVIEW) {
      showOverview();
      return;
    }

    if (state.current && changed.some((i) => i.path === state.current)) {
      state.seen.set(state.current, present.find((i) => i.path === state.current).mtime);
      openArtifact(state.current, { keepScroll: true });
    } else if ($("follow").checked && changed.length) {
      const newest = changed.reduce((a, b) => (a.mtime >= b.mtime ? a : b));
      select(newest.path);
    } else {
      renderNav();
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[data-artifact], a[data-planned], a[data-overview]");
    if (!a) return;
    e.preventDefault();
    $("follow").checked = false;
    if (a.dataset.overview) showOverview();
    else if (a.dataset.planned) showPlanned(a.dataset.planned);
    else select(a.dataset.artifact);
  });

  function connect() {
    const source = new EventSource(api("/api/events"));
    source.addEventListener("index", (e) => { $("live").textContent = "Live"; $("live").classList.add("on"); onIndex(JSON.parse(e.data)); });
    source.onerror = () => { $("live").textContent = "Reconnecting"; $("live").classList.remove("on"); };
  }
  connect();
})();
