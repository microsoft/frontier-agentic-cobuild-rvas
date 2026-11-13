import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, joinSession } from "@github/copilot-sdk/extension";

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(HERE, "public");
const ARCH_DIR = "docs/architecture";
const POLL_MS = 1500;

// Core package artifacts in reading order. Anything else under docs/architecture is listed after them.
const CORE = [
    ["solution.drawio", "Architecture diagram"],
    ["solution.md", "Solution design"],
    ["specification.md", "Specification"],
    ["cost-estimate.md", "Cost estimate"],
    ["implementation-plan.md", "Implementation plan"],
    ["visuals/shared-understanding.md", "Shared understanding"],
];
const VIEWABLE = new Set([".md", ".drawio", ".html", ".svg", ".png", ".jpg", ".jpeg"]);
// Agent instructions for the prototype, not customer-facing artifacts.
const IGNORED = new Set(["prototype/agents.md"]);
const ignored = (rel) => IGNORED.has(rel.split(sep).join("/").toLowerCase());
const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/plain; charset=utf-8",
    ".drawio": "text/plain; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};

/** One workspace per open canvas instance. */
const workspaces = new Map();
let server;
let serverPort;
const token = randomBytes(24).toString("hex");

function inside(root, target) {
    return target === root || target.startsWith(root + sep);
}

async function listFiles(dir, base = dir) {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }
    const out = [];
    for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...(await listFiles(full, base)));
        else if (entry.isFile() && VIEWABLE.has(extname(entry.name).toLowerCase()) && !ignored(relative(base, full)))
            out.push(relative(base, full).split(sep).join("/"));
    }
    return out;
}

async function buildIndex(ws) {
    const archRoot = join(ws.root, ARCH_DIR);
    const found = await listFiles(archRoot);
    const coreSet = new Set(CORE.map(([p]) => p));
    const items = [];
    for (const [path, title] of CORE) {
        const present = found.includes(path);
        const item = { path, title, core: true, present };
        if (present) item.mtime = (await stat(join(archRoot, path))).mtimeMs;
        items.push(item);
    }
    for (const path of found.filter((p) => !coreSet.has(p)).sort()) {
        const mtime = (await stat(join(archRoot, path))).mtimeMs;
        items.push({ path, title: path, core: false, present: true, mtime });
    }
    return { root: ws.root, items, focus: ws.focus, phase: ws.phase, note: ws.note, generatedAt: Date.now() };
}

function snapshotKey(index) {
    return JSON.stringify([index.items.map((i) => [i.path, i.mtime ?? 0]), index.focus, index.phase, index.note]);
}

async function notifyClients(ws) {
    const index = await buildIndex(ws);
    const key = snapshotKey(index);
    if (key === ws.lastKey) return;
    ws.lastKey = key;
    for (const res of ws.clients) res.write(`event: index\ndata: ${JSON.stringify(index)}\n\n`);
}

function authorized(url) {
    return url.searchParams.get("t") === token;
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
    res.writeHead(status, {
        "content-type": type,
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
        "referrer-policy": "no-referrer",
    });
    res.end(body);
}

async function handle(req, res) {
    const url = new URL(req.url, "http://127.0.0.1");
    if (req.method !== "GET") return send(res, 405, "Method not allowed");
    if (!authorized(url)) return send(res, 403, "Forbidden");

    const wsId = url.searchParams.get("ws");
    const ws = workspaces.get(wsId);

    if (url.pathname === "/" || url.pathname === "/app.js" || url.pathname === "/styles.css" || url.pathname === "/vendor/mermaid.min.js") {
        const name = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
        const body = await readFile(join(PUBLIC_DIR, name));
        return send(res, 200, body, MIME[extname(name)]);
    }

    if (!ws) return send(res, 404, "Unknown workspace");

    if (url.pathname === "/api/index") {
        return send(res, 200, JSON.stringify(await buildIndex(ws)), MIME[".json"]);
    }

    if (url.pathname === "/api/events") {
        res.writeHead(200, {
            "content-type": "text/event-stream",
            "cache-control": "no-store",
            connection: "keep-alive",
        });
        ws.clients.add(res);
        res.write(`event: index\ndata: ${JSON.stringify(await buildIndex(ws))}\n\n`);
        req.on("close", () => ws.clients.delete(res));
        return;
    }

    if (url.pathname === "/api/file") {
        const archRoot = resolve(ws.root, ARCH_DIR);
        const target = resolve(archRoot, url.searchParams.get("path") ?? "");
        const ext = extname(target).toLowerCase();
        if (!inside(archRoot, target) || !VIEWABLE.has(ext) || ignored(relative(archRoot, target))) return send(res, 404, "Not found");
        try {
            return send(res, 200, await readFile(target), MIME[ext] ?? "application/octet-stream");
        } catch {
            return send(res, 404, "Not found");
        }
    }

    return send(res, 404, "Not found");
}

async function ensureServer() {
    if (server) return;
    server = createServer((req, res) => {
        handle(req, res).catch((error) => {
            if (!res.headersSent) send(res, 500, "Internal error");
            else res.end();
            console.error(error);
        });
    });
    await new Promise((ok, fail) => {
        server.once("error", fail);
        server.listen(0, "127.0.0.1", ok);
    });
    serverPort = server.address().port;
    setInterval(() => {
        for (const ws of workspaces.values()) if (ws.clients.size) notifyClients(ws).catch(() => {});
    }, POLL_MS).unref();
}

function requireWorkspace(instanceId) {
    const ws = workspaces.get(instanceId);
    if (!ws) throw new Error("Open the Co-build board canvas first.");
    return ws;
}

function normalizeArtifactPath(ws, path) {
    const archRoot = resolve(ws.root, ARCH_DIR);
    const target = resolve(archRoot, path);
    if (!inside(archRoot, target) || !VIEWABLE.has(extname(target).toLowerCase()) || ignored(relative(archRoot, target)))
        throw new Error(`Not a viewable file under ${ARCH_DIR}/: ${path}`);
    return relative(archRoot, target).split(sep).join("/");
}

const workspaceCanvas = createCanvas({
    id: "cobuild-board",
    displayName: "Co-build board",
    description:
        "Shared screen for a customer co-build session: architecture package artifacts from docs/architecture/, updated live.",
    inputSchema: {
        type: "object",
        properties: {
            root: { type: "string", description: "Repository root. Defaults to the session working directory." },
        },
        additionalProperties: false,
    },
    actions: [
        {
            name: "show_artifact",
            description:
                "Bring an artifact into focus, for example 'solution.drawio' or 'visuals/process-swimlane.html'. Path is relative to docs/architecture/.",
            inputSchema: {
                type: "object",
                properties: { path: { type: "string" } },
                required: ["path"],
                additionalProperties: false,
            },
            handler: async ({ instanceId, input }) => {
                const ws = requireWorkspace(instanceId);
                ws.focus = normalizeArtifactPath(ws, input.path);
                await notifyClients(ws);
                return `Showing ${ws.focus}`;
            },
        },
        {
            name: "set_status",
            description:
                "Set the phase label and a one-line note shown above the artifacts, for example phase 'Discovery' and note 'Waiting for confirmation of the shared understanding'. Display only: this never records or implies an approval.",
            inputSchema: {
                type: "object",
                properties: {
                    phase: { type: "string", maxLength: 60 },
                    note: { type: "string", maxLength: 240 },
                },
                required: ["phase"],
                additionalProperties: false,
            },
            handler: async ({ instanceId, input }) => {
                const ws = requireWorkspace(instanceId);
                ws.phase = input.phase;
                ws.note = input.note ?? "";
                await notifyClients(ws);
                return "Status updated";
            },
        },
        {
            name: "refresh",
            description: "Rescan docs/architecture/ now. The canvas also rescans every couple of seconds.",
            handler: async ({ instanceId }) => {
                const ws = requireWorkspace(instanceId);
                const index = await buildIndex(ws);
                ws.lastKey = undefined;
                await notifyClients(ws);
                return `${index.items.filter((i) => i.present).length} artifacts found`;
            },
        },
    ],
    open: async ({ instanceId, input, session }) => {
        const root = resolve(input?.root ?? session?.workingDirectory ?? process.cwd());
        await ensureServer();
        const existing = workspaces.get(instanceId);
        workspaces.set(instanceId, existing ?? { root, clients: new Set(), phase: "", note: "" });
        const query = new URLSearchParams({ t: token, ws: instanceId });
        return {
            url: `http://127.0.0.1:${serverPort}/?${query}`,
            title: "Co-build board",
        };
    },
    onClose: ({ instanceId }) => {
        const ws = workspaces.get(instanceId);
        if (!ws) return;
        for (const res of ws.clients) res.end();
        workspaces.delete(instanceId);
    },
});

await joinSession({ canvases: [workspaceCanvas] });
