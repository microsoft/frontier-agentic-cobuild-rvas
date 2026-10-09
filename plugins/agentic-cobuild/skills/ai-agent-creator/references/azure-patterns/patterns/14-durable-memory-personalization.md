# Durable memory and personalization

## Use when / avoid when

Use when an agent must learn user-specific context that persists across sessions.
Use conversation history for current-session context, a knowledge layer for
curated organizational facts, workflow state for progress, and systems of record
for authoritative business data.

## Evidence classification

**Locally composed platform-neutral pattern** from managed memory and framework
context guidance. Product memory features have independent maturity, identity,
network, retention, model, and quota gates.

## Responsibilities and components

Core: authenticated caller, memory policy, candidate extraction, validation,
scoped memory store, retrieval, user inspection/correction/deletion, evaluation,
and audit. Separate:

| State | Purpose |
| --- | --- |
| Conversation history | Current interaction continuity |
| User-profile memory | Stable preferences or personal context |
| Summary or episodic memory | Relevant prior interactions |
| Procedural memory | Reusable user-specific routines |
| Workflow/checkpoint state | Durable process progress |
| Knowledge base | Curated shared evidence |
| System of record | Authoritative business facts and decisions |

## Flows

Authenticate and authorize -> retrieve scope-bound memory -> combine with current
request and evidence -> answer or propose an action -> extract a candidate memory
-> apply consent, sensitivity, provenance, and conflict policy -> write or reject
-> expose inspect, correct, forget, expiry, and deletion behavior.

An action revalidates authoritative facts and authorization at execution time.
Memory can influence personalization; it cannot authorize an operation or replace
a current system-of-record lookup.

## Trust boundaries and ownership

Treat extracted, consolidated, and retrieved memory as untrusted model-derived
context. Bind each item to tenant, subject, source, timestamp, policy version,
retention, and sensitivity. Define which facts require explicit user consent or
must never be inferred or retained. Preserve corrections and conflicts rather
than silently letting model consolidation rewrite consequential facts.

## Quality and safety

Evaluate memory-write precision, useful recall, stale and conflicting facts,
cross-user and cross-tenant leakage, prompt-injection persistence, memory
poisoning, correction, explicit remember/forget, expiry, deletion propagation,
and behavior when memory is unavailable. Keep a no-memory baseline so measured
personalization benefit justifies the privacy and operational cost.

## Support gates

- **Maturity, checked 2026-10-07:** Foundry Agent Service memory and Memory Store
  API are preview.
- **Constraint:** verify scope resolution, item CRUD, TTL, supported models,
  regions, quotas, network support, pricing, and post-create configuration for
  the selected API version.
- **Security:** memory tools and APIs need explicit read/write authorization;
  a user identifier in a prompt is not a storage boundary.
- **Recommendation:** default to bounded retention and user-visible control;
  retain only memory that produces measured journey value.

## Tradeoffs

Memory improves continuity and reduces repetition, but adds privacy, poisoning,
staleness, conflict, deletion, and evaluation work. Deterministic profiles are
safer than model-extracted memory when the schema and update rules are known.

## Diagram mapping

Context: memory subject, reviewer/privacy owner, and systems of record.
Components: policy, extraction, validation, scoped store, retrieval, and user
controls. AI and data flow: candidate write and authorized recall with rejection,
correction, deletion, and unavailable-memory paths. Deployment: scope keys,
identity, retention, network, telemetry, backup, and operator ownership.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Foundry memory distinguishes short-term context from managed long-term memory and supports profile, summary, and procedural memory | [Memory in Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-memory) | 2026-10-07 | Select the memory class and keep it separate from workflow and authoritative state |
| Memory supports item operations, default TTL, and direct remember/forget behavior in preview | [Memory management and retention](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-memory#memory-management-and-retention) | 2026-10-07 | Make user control and lifecycle part of the architecture |
| Memory extraction can introduce prompt-injection and corruption risk | [Memory security risks](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-memory#security-risks) | 2026-10-07 | Evaluate poisoning and persistent injection before production |
