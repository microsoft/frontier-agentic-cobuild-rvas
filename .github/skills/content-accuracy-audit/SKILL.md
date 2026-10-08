---
name: content-accuracy-audit
description: "Audit plugin guidance, setup commands, documentation, and bundled resources for current facts, broken references, and contradictions. Report verified findings and apply confirmed fixes."
argument-hint: "Optional source path, such as plugins/agentic-cobuild or docs/start.md."
disable-model-invocation: true
user-invocable: true
---

# Content Accuracy Audit

Inspect the requested sources for correctness and currency. Apply fixes only
after the user confirms findings. Read the
[audit checklist](references/audit-checklist.md) for the checks.

## Scope

| Source | Check |
| --- | --- |
| `plugins/agentic-cobuild/skills/` | References, approval gates, resource paths, and current product guidance |
| `scripts/agentic-skills.json`, `scripts/setup-agentic-repo.*` | Upstream selectors, runtime requirements, flags, and preservation behavior |
| `docs/start.md`, `docs/index.html` | Installation and handoff instructions |
| `docs/start.html`, `docs/supporting-skills.md` | Generated consistency; fix sources and rebuild |
| `README.md`, `CONTRIBUTING.md`, `PRODUCT.md` | Cross-links and claims |
| `.github/skills/` | Maintainer guidance and references |

## Procedure

1. Inventory the requested source files.
2. Extract checkable claims: commands, SDK signatures, resource paths, host
   capabilities, approval boundaries, and product maturity.
3. Verify Microsoft claims through current Microsoft Learn evidence. Verify
   Copilot/VS Code behavior through official host documentation. Verify upstream
   skill selectors against the source repository and installed resources.
4. Compare commands with the local implementation. Check requirements against
   tests rather than assuming setup success proves delivery readiness.
5. Report ranked findings with file/line references, evidence, and the smallest
   proposed fix using the [report template](assets/findings-report-template.md).
6. After confirmation, fix sources and run `npm run build`, `npm test`, and
   affected diagram tests. Report any unavailable verification explicitly.

Complete when every reported claim has evidence or an explicit verification
gap, fixes preserve the intended workflow, and generated files match their sources.
