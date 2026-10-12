# Azure AI architectural patterns

Use these **starting points**, not certified or deployment-ready architectures.
Read when selecting a workload pattern. It owns card suitability, evidence classes,
and composition; execution/platform/model choices belong to the
[selection matrix](runtimes/README.md).

## Workload index

| Card | Use when | Evidence class / composition |
| --- | --- | --- |
| [Simple chat POC](patterns/01-simple-chat-poc.md) | Learning or a disposable chat experiment | Official reference architecture; POC only |
| [Secure grounded chat](patterns/02-secure-grounded-chat.md) | Production-oriented answers over authorized content | Official reference architecture; baseline |
| [Enterprise landing zone](patterns/03-enterprise-landing-zone.md) | A workload uses shared platform networking and governance | Official reference architecture; ownership variant |
| [Agent tools and approvals](patterns/04-agent-tools-approvals.md) | Planning or tool selection adds value, including business actions | Locally composed recipe |
| [Agentic retrieval / IQ](patterns/05-agentic-retrieval.md) | Knowledge-source orchestration or complex retrieval is justified | Capability guidance; knowledge variant |
| [Multimodal content processing](patterns/06-multimodal-content-processing.md) | Media becomes structured results with review | Official solution idea; independent workflow |
| [Structured document extraction](patterns/07-structured-document-extraction.md) | Standard document types or trained extraction models fit | Locally composed recipe from capability guidance |
| [Conversational avatar](patterns/08-conversational-avatar.md) | Interactive audiovisual presentation is part of the journey | Locally composed experience extension |
| [Batch avatar](patterns/09-batch-avatar.md) | Scripts become asynchronous video artifacts | Locally composed independent job/extension |
| [Voice Live](patterns/10-voice-live-agent.md) | Bidirectional speech is the primary interaction | Locally composed recipe with transport-specific gates |
| [Unified IQ composition](patterns/11-unified-iq-agent.md) | A single agent needs more than one of Fabric IQ, Foundry IQ, or Work IQ context | Locally composed recipe; platform-neutral, separately verified connections |
| [Document classification and segmentation](patterns/12-document-classification-segmentation.md) | Bundles must be split, classified against a governed taxonomy, and optionally routed | Locally composed recipe from Content Understanding guidance |
| [Agent coordination](patterns/13-agent-coordination.md) | Multiple agents or specialist roles must coordinate | Locally composed platform-neutral selection recipe |
| [Durable memory and personalization](patterns/14-durable-memory-personalization.md) | Learned user context must persist across sessions | Locally composed platform-neutral pattern with product-specific gates |

## Cross-cutting assurance

Read [AI safety and release assurance](assurance/ai-safety-release.md) when the
journey has external users, untrusted content, sensitive data, regulated
decisions, consequential tools, or broad autonomy.

## Select, adapt, verify

1. Match the confirmed first journey, inputs, knowledge, action risk, enterprise
   starting point, and constraints. Identify an unsuitable near-match.
2. Pick the closest pattern. Add compatible variants or experience extensions
   only when the journey requires them; an extraction workflow need not be chat.
3. Apply the selection matrix and load only matching runtime recipes, including
   Copilot Studio when its capabilities fit. A card supplies no reason to add an
   agent runtime to a confirmed no-agent journey.
4. Adapt components by responsibility. Distinguish a required capability from
   one reference's service/tier choice; justify production controls against the
   workload's requirements. An App Service reference topology is not a requirement
   to create a web host. Reuse adequate platform or existing capabilities and
   record the confirmed requirement or gap that justifies any custom component.
5. Account for every selected card's support gates under the
   [Microsoft Learn evidence contract](../microsoft-learn-evidence.md).
6. Record choices under the [architecture record contract](../architecture-quality.md):
   inherited elements, deviations, rejected matches, and unresolved gates.

**Complete when:** every selected card/variant fits the confirmed journey; each
support gate has evidence, a requirement decision, or an owned deferral; and
consequential unverified connections remain conditional with dependent work blocked.

## Reading evidence

**Reference architecture** supplies an official topology; **solution idea**
illustrates a starting shape; **capability guidance** supports a particular
behavior; **sample** demonstrates one implementation; **locally composed recipe**
is our combination of documented capabilities. These classifications do not
certify a customized workload.

Treat checked dates as snapshots. The evidence contract owns live verification,
source failure behavior, and maturity distinctions.

## Card and diagram contract

Cards separate suitability, evidence class, responsibilities, flows, boundaries,
support gates, tradeoffs, diagram mapping, and source evidence. Gate labels are
**constraint**, **recommendation**, **maturity**, or **unverified**.

Use each card's diagram mapping with architecture quality's four views and the
diagram specialist's creation/review workflow. Card geometry or sample topology
is not proof of service support. This library adds no separate approval process.
