# Agentic retrieval and Foundry IQ

## Use when / avoid when

Use when knowledge-source orchestration or retrieval complexity justifies it.
Compare a single hybrid/semantic query first. Strict-GA requirements may exclude
the particular planning, source, portal, SDK, or managed connector path desired.
Compare the [unified IQ composition](11-unified-iq-agent.md) when the journey
also needs Fabric IQ analytics or Work IQ organizational/business context alongside
this document/knowledge retrieval.

## Evidence classification

**Capability guidance; knowledge variant**, not a framework or hosting service.
Foundry IQ knowledge bases are powered by Azure AI Search agentic retrieval.

## Responsibilities and components

Core: application/agent, knowledge base, at least one knowledge source, and
authorization. Indexed sources have an index; remote sources differ. The model
for answer generation is separate from optional model-based retrieval planning.

## Flows

Caller-scoped query -> knowledge base -> configured sources/reranking -> grounding,
references, and optional activity -> application/model answer. Choose direct REST
retrieval or a verified managed MCP tool connection explicitly.

## Trust boundaries and ownership

Specify caller permission propagation, source ACL updates, project connections,
retrieval identities, and cache isolation. Work IQ and Fabric IQ are different
integration choices, not interchangeable knowledge bases.

## Support gates

- **Maturity, checked 2026-10-01:** `2026-04-01` REST supports GA minimal,
  extractive retrieval with GA source types; model planning, synthesis,
  non-minimal reasoning and multi-turn paths use preview capabilities.
- **Constraint:** portal-created objects can have preview schemas. The managed
  IQ connection guide currently uses a preview API/SDK path; backend GA does not
  establish that connector's GA status.
- **Unverified:** native Copilot SDK-to-IQ integration is not established here.
  An application retrieval tool is a composed integration to verify.
- **Recommendation:** verify regions, source types, ACL semantics, latency and cost.

## Tradeoffs

Source fan-out and model planning add latency/cost. For GA-only work, use a
verified GA retrieval path or simpler authorized search rather than silently
turning on preview planning or a preview managed connector.

## Diagram mapping

Context: callers and content owners. Components: knowledge base/sources versus
orchestrator/model. AI and data flow: identity, retrieval, references, planning
only when selected. Deployment: Search, connections, model and access boundaries.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Retrieval version and feature maturity differ | [Agentic retrieval](https://learn.microsoft.com/azure/search/agentic-retrieval-overview) | 2026-10-01 | Choose exact reasoning/source/API path |
| Managed knowledge-base integration uses MCP | [Connect IQ to an agent](https://learn.microsoft.com/azure/foundry/agents/how-to/foundry-iq-connect) | 2026-10-01 | Verify connector prerequisites separately from backend maturity |
