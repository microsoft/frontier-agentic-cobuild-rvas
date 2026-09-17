---
name: foundry-toolboxes
description: Curate intent-based Microsoft Foundry Toolboxes (preview) — one MCP-compatible endpoint bundling MCP, Web Search, Azure AI Search, Code Interpreter, File Search, OpenAPI, A2A, Browser Automation, and Computer Use tools. Use when a scenario needs a toolbox integration.
---

# foundry-toolboxes (stub)

> **Minimal stub** — pointer to the upstream [`microsoft/skills`](https://github.com/microsoft/skills)
> skill. Install on demand; do not vendor the full body (avoids context rot).

**Install the full skill:**

```bash
npx skills add microsoft/skills --skill foundry-toolboxes
```

**Maps to:** Scenario tool integrations and the Operational Agents approval contract.

**Before implementing:** query `foundry-mcp` and `microsoft-docs` for the current toolbox API.
The local execution and approval example is in `scenarios/operational-agents/accelerator/`.
A toolbox adapter is separate integration work; preserve the scenario's exact-operation approval rules.

**Upstream source:** `.github/plugins/microsoft-foundry/skills/foundry-toolboxes/`
