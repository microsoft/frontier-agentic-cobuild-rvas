# Secure grounded chat

## Use when / avoid when

Use for production-oriented answers backed by content the caller may access.
For extraction-only work, use [content processing](06-multimodal-content-processing.md).
Use [document classification and segmentation](12-document-classification-segmentation.md)
first when mixed bundles need type routing before approved content is indexed.
For shared platform dependencies, add the [landing-zone variant](03-enterprise-landing-zone.md).
Add [durable memory](14-durable-memory-personalization.md) only when measured
cross-session personalization is part of the journey.

## Evidence classification

Official reference architecture; production-oriented **baseline**, adapted to
the workload. Authorization-aware retrieval also draws on official design guidance.

## Responsibilities and components

Core: authenticated caller/channel, chosen orchestrator, model, authorized
retrieval, approved content/indexing, state where needed, and observability.
Select platform and channel through the [matrix](../runtimes/README.md); a
custom application is one option. The official reference's application topology
uses App Service, Foundry Agent Service, workload-owned dependencies,
private access, and controlled egress. Keep its dedicated agent state stores
separate from application-owned records. Adapt tiers/redundancy to actual SLOs.

## Flows

Online: user -> selected caller/channel -> orchestrator -> authorized retrieval -> grounding
and model -> cited answer. Offline: approved content -> extraction/chunking ->
index with access metadata. Deletion and permission updates also reach the index.
Compose content processing when complex layout, tables or visual material need
enrichment before indexing; classification is a separate step only when the
ingestion journey needs document-type or bundle routing.

## Trust boundaries and ownership

Apply caller/tenant permissions on every retrieval path, including agent tool
calls and caches. A service identity reaching Search is not end-user
authorization. The workload owns identity, content lifecycle, DNS/private access,
egress rules, state, and its recovery requirements.

## Retrieval quality and trust

Treat retrieved chunks, metadata, summaries and citations as untrusted evidence,
not instructions. Retrieval cannot authorize a tool call or business action.
Preserve source identity through prompting and citations, define when the answer
must abstain, and route consequential operations through their own authorized
tool and approval boundary.

Evaluate retrieval separately from answer generation. Cover retrieval relevance
against representative ground truth, groundedness, citation completeness,
answerability/abstention, caller-ACL leakage, indirect prompt injection,
freshness, deletion and permission propagation. Version ingestion, chunking,
embedding and index configuration so reindexing, comparison and rollback are
controlled releases rather than in-place mutations.

## Support gates

- **Constraint:** grounded content must respect caller permissions.
- **Constraint:** retrieved content remains data even when it contains imperative
  text; it cannot override system policy or directly invoke actions.
- **Maturity:** classic search, IQ, and managed connectors have different gates;
  read [agentic retrieval](05-agentic-retrieval.md) if selected.
- **Recommendation:** evaluate prompt-attack defenses as one layer in a wider
  trust design; detection does not replace source governance, authorization,
  action isolation, grounding evaluation or safe failure behavior.
- **Recommendation:** plan availability, capacity, tracing privacy, restore,
  and regional recovery per dependency rather than copying resource counts.
- **Unverified:** confirm exact SDK/API/model/region and private-access combination.

## Tradeoffs

Private networking and redundant dependencies increase cost and operations.
Compare application-owned fixed RAG with managed agent orchestration; a retrieval
journey does not automatically need autonomous tools.

## Diagram mapping

Context: user, channel and content owners. Components: caller, orchestration, retrieval,
model, and stores. AI and data flow: ingestion versus online permissions/citations.
Deployment: actual endpoints, private DNS, ingress/egress, state and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Private baseline and dedicated agent dependencies | [Baseline Foundry chat](https://learn.microsoft.com/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-chat) | 2026-10-01 | Adapt the official baseline; retain explicit ownership |
| Retrieval must enforce tenant/user boundaries | [Secure multitenant RAG](https://learn.microsoft.com/azure/architecture/ai-ml/guide/secure-multitenant-rag) | 2026-10-01 | Include authorization on agent and application retrieval paths |
| Retrieval and answer quality need separate measures | [RAG evaluators](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/rag-evaluators) | 2026-10-07 | Evaluate retrieved evidence, grounded answers and citations independently |
| Retrieved documents can contain indirect prompt attacks | [Prompt Shields for documents](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection#prompt-shields-for-documents) | 2026-10-07 | Treat retrieved content as untrusted and keep actions behind trusted execution |

Use the baseline's linked implementation as a reference, not drop-in certification.
