# Platform, channel, and execution selection

Select responsibilities before products. Use this sequence after comparing the
execution model against the journey under
[discovery quality](../../discovery-quality.md#agent-intent-test):

1. **Reuse:** evaluate adequate existing or prebuilt capabilities against
   functional, security, integration, lifecycle, and cost requirements.
2. **Platform:** compare low-code, managed declarative execution, managed custom
   code, and application-owned execution where they fit the remaining gaps.
3. **Channel:** choose an existing experience, a supported platform channel,
   headless processing, or a justified custom client independently of runtime.
4. **Ownership:** assign orchestration, user access, business authorization,
   state, approvals, and operations. Select a framework only where code is needed.

Choose a direct topology (the runtime calls a tool, service, or knowledge source
itself) before a delegated topology (a second agent or connected-agent hop).
Delegation needs its own identity-per-hop, approval, and promotion boundary; it
is a confirmed responsibility split, not a default composition.

Compare meaningful alternatives, not every product for every journey. A confirmed
custom requirement remains a valid constraint; reuse is not a forced migration.
Model provider, knowledge, tools, protocol, and language are separate axes.
When several agents or specialist roles are required, select their dependency
and ownership shape with [agent coordination](../patterns/13-agent-coordination.md)
before mapping it to runtime-specific features.

When custom agent code remains necessary, compare managed custom-code execution
with application-owned execution explicitly. Prefer managed execution when its
channel, protocol, identity, state, networking, region, package and operational
gates fit the journey. Select application hosting for a confirmed need such as
existing application integration, custom ingress/authentication, transactional
state ownership, unsupported connectivity, or workload-controlled runtime
operations. Do not select application hosting only because custom code or Agent
Framework is required.

| Recipe | Select when | Workload team still owns |
| --- | --- | --- |
| [Copilot Studio agent](copilot-studio-agent.md) | Low-code orchestration, connectors, and a supported channel meet requirements | Configuration, connection permissions, business state/approval ownership, environment lifecycle and evaluation |
| [Foundry prompt agent](foundry-prompt-agent.md) | Declarative instructions/model/tools suffice | User access, configuration, tool policy and knowledge permissions |
| [Foundry hosted agent](foundry-hosted-agent.md) | Custom code with managed execution fits | Code/framework, package/protocol choices, business state and approval semantics |
| [Application-hosted Agent Framework](application-hosted-agent-framework.md) | Existing app integration or runtime control matters | Web/worker host, auth, durable state, scaling, deployment and telemetry |
| [GitHub Copilot SDK runtime](copilot-sdk-runtime.md) | Its agent engine/tools add value | CLI process, provider, tools, sessions and isolation; hosting can be Foundry or app-owned |
| [Durable workflow variant](durable-workflow-variant.md) | Resume/checkpoints/waits survive failures | Replay-safe workflow, job/approval state, stores and lifecycle |

For a deterministic flow or single model/search call, choose a governed service,
explicit workflow, or bounded inference path rather than an agent loop. Reuse
existing services or platform capabilities where adequate. This does not require
a new application UI/API; a deterministic tool can also serve an agentic journey.
Agent Framework can be a client to managed agents without owning the agent loop.

## Channel and custom-component decisions

For each selected platform, verify the exact channel/client, identity and user
audience, data permissions, connectivity, deployment lifecycle, and licensing.
Native channels may provide a client; web/custom channels can require one.
Keep a required client distinct from a new backend and from agent hosting.

Record the capability gap or confirmed requirement for each custom UI, API,
adapter, and host. An empty code repository does not settle platform availability.

## Model inference and reuse

For greenfield **workload-owned managed inference**, use a Microsoft Foundry model
deployment by default, or record the requirement for another boundary.
Platform-managed inference needs no additional workload-owned deployment.

Keep model/provider, deployment configuration, inference endpoint/API, and agent
runtime independent. Direct model calls normally use the resource-level inference
endpoint; choose a project or agent endpoint only for a confirmed scoped
capability with current documentation supporting the route.

For brownfield work, evaluate existing Azure OpenAI or Foundry deployments against
identity, networking, compliance, model, capacity, and lifecycle requirements.
Reuse a suitable deployment; terminology alone is not a migration reason.

### Model adaptation and routing

Use the smallest mechanism that closes a measured gap:

| Mechanism | Select for | Keep explicit |
| --- | --- | --- |
| Prompt, schema, or bounded workflow | Instructions, output contracts, and deterministic sequencing | Prompt/configuration version and regression evaluation |
| Retrieval | Current, private, or cited knowledge | Source authority, permissions, freshness, grounding, and deletion |
| Tools | Authoritative calculation or business action | Identity, validation, authorization, approval, idempotency, and audit |
| Model router | A varied request mix where routing can improve quality, latency, or cost | Candidate models, unsupported features, routing evaluation, fallback, quota, and cost attribution |
| Fine-tuning | A repeated behavioral or task gap supported by representative labeled data | Dataset provenance, consent, splits, lineage, training, safety evaluation, deployment, and rollback |
| Distillation | A proven larger-model behavior should move to a smaller model for cost or latency | Teacher evidence, generated-data governance, quality floor, drift, and retraining trigger |

Compare every adaptation with the unmodified baseline on representative and
adversarial cases. Fine-tuning does not replace retrieval for changing facts or
tools for authoritative operations. Version the base model, training dataset,
method, hyperparameters, resulting model, evaluation set, and deployment as one
release lineage. Promote only against defined quality, safety, latency, and cost
thresholds; retain a rollback path and a trigger for base-model or data refresh.

## Knowledge and context boundaries

Fabric IQ, Foundry IQ, and Work IQ are three separate, composable IQ workloads,
not one interchangeable knowledge backend and not substitutes for each other.
Fabric IQ models business entities, ontologies, and semantic models over
Fabric/OneLake analytics, including governed Fabric data agents. Foundry IQ is a
managed, permission-aware knowledge layer for document/content retrieval across
configured enterprise sources; it does not replace Fabric IQ's business-entity
or ontology modeling, and its own document-level permission enforcement depends
on the connected source supporting and synchronizing that metadata. Work IQ
exposes organizational and business context across Microsoft 365 and connected
systems, including Dynamics 365 and Power Platform, with user-scoped,
policy-enforced access. Its API offers context, tools, chat, and workspaces
across frameworks and runtimes. Select by capability and verified source access;
the planes' data coverage can overlap. Verify each connector's own maturity and
licensing. Compare the [unified IQ composition](../patterns/11-unified-iq-agent.md)
pattern when an agent needs more than one plane at once.

Separate retrieval from action: a knowledge connection returns grounding and
references, while a tool or connector performs a business operation. Route
consequential actions through an authorized tool with its own approval gate, not
through a knowledge query, even when both reach the same backend system.

## Composition decisions

Record platform, channel/caller, execution model, any required framework/language,
protocol, provider mode, knowledge access, durable-state and approval owners, and
tool policy. Examples:

- Copilot Studio + a verified native channel + governed business tools.
- Copilot Studio + a justified Foundry connected agent using a verified protocol.
- Prompt agent + a verified knowledge-base MCP connection.
- Hosted Agent Framework code + governed business review and explicit checkpoints.
- Hosted GitHub Copilot SDK + the documented protocol/provider path.
- Application-owned Agent Framework + direct authorized Search retrieval.
- Application-owned GitHub Copilot SDK + restricted tools and Azure/Foundry BYOK.

These are candidate compositions, not certifications of all language/region/API
combinations. Follow the chosen recipe's gates, and use the
[knowledge variant](../patterns/05-agentic-retrieval.md) only when retrieval needs it.

A failed compatibility gate invalidates the affected composition, not every
runtime from the same product family. Recompute adjacent candidates after the
failure. In particular, assess Foundry prompt agents, Foundry Hosted Agents and
application-hosted Agent Framework independently because they have different
protocol, identity, state and operational boundaries.

## Completion criterion

Selection is complete when every chosen responsibility has an owner and each
consequential connection is verified or an explicit owned gate. An unresolved
check blocks its dependent delivery step. Resolve documented requirement conflicts
by changing the choice or obtaining an explicit requirement decision.

Use the [evidence contract](../../microsoft-learn-evidence.md) for maturity and
compatibility claims. A verified adapter can address a documented gap; an assumed
adapter does not establish support for the underlying integration.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Reuse and low-code/managed/custom options precede stack selection | [CAF technology plan](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) | 2026-10-01 | Select by requirements rather than custom-application defaults |
| Channel and client are separate | [Copilot Studio channels](https://learn.microsoft.com/microsoft-copilot-studio/guidance/channels) | 2026-10-01 | Verify client needs instead of assuming every channel includes a UI |
| Fabric IQ models business entities, ontologies, and semantic models over OneLake/Power BI, distinct from Foundry IQ and Work IQ | [What is Fabric IQ?](https://learn.microsoft.com/fabric/iq/overview) | 2026-10-01 | Select Fabric IQ for structured/ontology-backed business data, not document retrieval |
| Foundry IQ is a managed knowledge layer connecting structured and unstructured data across Azure, SharePoint, OneLake, and the web; document-level access depends on the source's ACL/label sync | [What is Foundry IQ?](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq) | 2026-10-01 | Do not treat Foundry IQ as a universal structured-data layer; verify per-source permission enforcement |
| Work IQ combines Microsoft 365 and connected business context, including Dynamics 365 and Power Platform, with user-scoped policy enforcement and cross-runtime APIs | [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) | 2026-10-06 | Select by required capability and verified source access; data categories can overlap with other IQ planes |
| Fine-tuning is appropriate for measured task or behavior gaps backed by representative high-quality data and adds training, hosting, monitoring, and refresh work | [Foundry fine-tuning considerations](https://learn.microsoft.com/azure/foundry/openai/concepts/fine-tuning-considerations) | 2026-10-07 | Compare against prompt, retrieval, and tool baselines before adding model customization |
| Model router selects among supported models and must be evaluated for the workload | [Model router](https://learn.microsoft.com/azure/foundry/openai/concepts/model-router) | 2026-10-07 | Treat routing as a model-deployment decision with explicit quality, feature, latency, and cost gates |
