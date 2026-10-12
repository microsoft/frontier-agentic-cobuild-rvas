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

**Use for:** Knowledge-base guidance when the approved application architecture needs it.

**Before implementing:** query `microsoft-docs` and `foundry-mcp` for the current knowledge-base API.
Follow the application's approved identity, permission, and retrieval contracts.

**Upstream source:** `.github/plugins/microsoft-foundry/skills/foundry-iq-knowledge-bases/`
