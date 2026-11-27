# AI branch

Read when discovery opens the [AI branch](../discovery-quality.md#ai-branch).
This file owns the boundary ladder, agent-intent test, assumption trap, and the
AI card index. Execution, platform, and channel choices belong to the
[selection matrix](runtimes/README.md); model family, deployment type, and
decision models belong to [model selection](model-selection.md). Cards are
**starting points**, not certified or deployment-ready architectures. Apply them
on top of the application shape chosen from the
[application selection guide](../application-patterns/README.md).

## Agent-intent test

Words such as *agent*, *copilot*, and *assistant* express product intent. They do
not settle the execution model. Compare every rung of the **boundary ladder** when
those words appear:

| Boundary | Fits when | Evidence to seek |
| --- | --- | --- |
| Deterministic code | Rules and sequence are known and reproducible | Fixed inputs, fixed steps, exact outputs |
| Direct model call | One bounded interpretation or generation step adds value | Prepared context, one response contract, no runtime choices |
| Retrieval or explicit workflow | Sources or steps vary, but orchestration is explicitly defined in code or a platform | Known branches, explicit state transitions, deterministic routing |
| Agent | The journey benefits from runtime planning or tool/source selection | Goal-directed investigation, dynamic next steps, tool choice, conversational state, or bounded actions |

Test the candidate journey for:

1. **Planning:** must the system decide how to pursue a goal rather than execute a
   predefined sequence?
2. **Tool or source selection:** must it choose which authorized evidence source,
   calculation, retrieval path, or business operation to use next?
3. **Investigation state:** must it preserve findings, hypotheses, missing evidence,
   and next steps across turns or pauses?
4. **Follow-up:** can the user's next question change which evidence or operation is
   needed?
5. **Actions:** may it propose or execute consequential operations, and where does
   approval occur?

Evaluate the whole journey: an agent can be read-only or human-supervised, and
its deterministic tools do not make planning or tool selection deterministic.

For Logic Apps journeys, establish where planning and tool selection happen,
then read the [role selection guidance](runtimes/logic-apps-native-agent.md#role-selection)
before selecting a runtime.

## Assumption trap

A fixed journey must be confirmed, not manufactured. Reopen the frontier when the
proposed journey became fixed because the design already chose:

- a form instead of a goal-oriented conversation;
- a prepared evidence packet instead of dynamic evidence selection;
- one model response instead of a multi-step investigation;
- stateless requests instead of investigation continuity;
- a report download instead of the business outcome named by the user.

Confirm these choices with the user before treating the narrowed journey as scope.

## AI workload index

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
| [AI Gateway governance](patterns/15-ai-gateway-governance.md) | Several consumers, model backends, tools, or agent APIs need shared traffic governance | Official capability guidance; cross-cutting governance variant |
| [Decision-model triage](patterns/16-decision-model-triage.md) | A bounded judgment (gate, choose, score) routes, filters, or prioritizes work | Official capability guidance; locally composed recipe |

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

## Retiring platforms

Design new orchestration in code (Agent Framework workflows, Durable, or Logic
Apps) rather than on these retiring surfaces, and plan migration for brownfield
use:

| Surface | Retirement | Direction |
| --- | --- | --- |
| Foundry declarative (visual) workflows, preview | 1 December 2026 | Agent Framework in a hosted agent, or Logic Apps for a visual business process; code-based hosted-agent orchestration is unaffected ([source](https://learn.microsoft.com/azure/foundry/agents/concepts/workflow)) |
| Prompt flow in Foundry and Azure Machine Learning | 20 April 2027 | Rebuild in Agent Framework ([source](https://learn.microsoft.com/azure/foundry-classic/how-to/prompt-flow-migration-overview)) |
| Personalizer, Anomaly Detector, Metrics Advisor | Retired 1 October 2026 | See [model selection](model-selection.md#decision-models) |

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
