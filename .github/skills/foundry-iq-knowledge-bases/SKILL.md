---
name: foundry-iq-knowledge-bases
description: Build Microsoft Foundry IQ knowledge bases (preview) — multi-source, permission-aware grounding with agentic retrieval (query decomposition + parallel search + reranking); expose to agents via MCP. Use for AI Grounding knowledge-base lessons.
---

# foundry-iq-knowledge-bases (stub)

> **Minimal stub** — pointer to the upstream [`microsoft/skills`](https://github.com/microsoft/skills)
> skill. Install on demand; do not vendor the full body (avoids context rot).

**Install the full skill:**

```bash
npx skills add microsoft/skills --skill foundry-iq-knowledge-bases
```

**Maps to:** AI Grounding ingestion, retrieval, and knowledge-base lessons.

**Before implementing:** query `microsoft-docs` and `foundry-mcp` for the current knowledge-base API.
Reuse the scripts and scenario data under `scenarios/ai-grounding/accelerator/`.
Follow the lesson's identity and permission checks when adapting retrieval.

**Upstream source:** `.github/plugins/microsoft-foundry/skills/foundry-iq-knowledge-bases/`
