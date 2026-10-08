# Unified IQ composition

## Use when / avoid when

Use when one agent needs more than one IQ plane under the
[knowledge and context boundaries](../runtimes/README.md#knowledge-and-context-boundaries).
For one plane alone, use its own tool or card; for document retrieval alone,
compare [agentic retrieval / IQ](05-agentic-retrieval.md). Select platform and
channel independently. Use a simpler composition when one verified source path
meets the journey.

## Evidence classification

**Locally composed recipe** combining official Fabric IQ, Foundry IQ, and
Work IQ product guidance. Microsoft documents the three as standalone,
composable workloads, not a single certified "unified IQ" product or
reference architecture.

## Responsibilities and components

Core: the selected agent runtime, a verified connection for each required plane,
and owners for source access, consent, governance, and business actions.
The planes have documented integration surfaces:

| Plane | Candidate connection | Verify for the selected runtime |
| --- | --- | --- |
| Fabric IQ | A governed Fabric data agent or the selected Fabric IQ surface | Published endpoint, caller permissions, source support, and connector maturity |
| Foundry IQ | Knowledge-base retrieval or a Foundry Agent Service MCP connection | Retrieval API, source permissions, and connector compatibility under the [knowledge card](05-agentic-retrieval.md) |
| Work IQ | MCP tools, or the API's context/chat/workspace surface | Exact endpoint and operation; MCP, REST, and A2A serve different responsibilities |

Choose the [runtime](../runtimes/README.md) by its selection contract. Product-level
integration support establishes candidates, not every cross-product composition.
When Copilot Studio is selected, read its
[IQ tools variant](../runtimes/copilot-studio-agent.md#iq-tools-variant).

## Flows

Caller -> selected runtime -> authorized per-plane query/tool -> grounding and
references -> answer. Consequential actions pass through their own authorization
and approval path. Add a delegated agent only for a confirmed responsibility
split; verify its protocol, identity, and downstream connections separately.

## Evidence reconciliation

Preserve the plane, source, timestamp, permission context and citation for each
claim before synthesis. Define source authority by claim type; overlapping
results do not establish consensus, and a model must not resolve conflicting
facts by majority vote. Expose material disagreement or route it to the owning
person/system instead of blending it into one unsupported answer.

Make partial failure visible. A timeout, denied connection or unsupported route
cannot become silent absence. Deduplicate only evidence the caller is authorized
to see, without discarding provenance or changing the source's access semantics.
Keep calculations and authoritative business state in their governed source or
deterministic service; the agent reconciles explanations, not numeric truth.

## Trust boundaries and ownership

Specify authentication and enforcement for each connection separately:

- **Fabric IQ / Fabric data agent:** the agent authenticates as the calling
  user. Fabric applies workspace, item, row-level (RLS), and column-level
  (CLS)/object-level security (OLS) exactly as it would for direct access; a
  data agent is a governed entry point, not a bypass. Data agents are
  read-only by default.
- **Foundry IQ:** permission enforcement depends on the knowledge source.
  Indexed sources can synchronize ACLs or honor Microsoft Purview sensitivity
  labels only when that metadata is present and synchronization is
  explicitly configured; absent that, document-level access is not
  automatically enforced. Remote SharePoint knowledge sources instead enforce
  permissions directly through the Copilot Retrieval API at query time.
- **Work IQ:** per-user sign-in; every request is scoped to that user and
  evaluated by a centralized policy engine. Work IQ is read-only unless an
  administrator explicitly enables write operations, and MCP tool calls can
  require per-call approval; writes need their own approval path, distinct
  from read access.

Trace identity and consent at each connection and delegated hop. A service
connection credential does not establish caller-level access to its results.
Verify end-to-end user delegation for the selected composition before using it
for access-sensitive answers or actions.

## Support gates

- **Maturity:** verify each product, endpoint, connector, and protocol separately.
  Fabric data agent GA is independent of any external connector's maturity.
  Foundry IQ retrieval and managed-connector maturity follow the knowledge card.
  Copilot Studio-specific gates belong to its IQ tools variant.
- **Constraint:** Fabric data agent RLS/CLS/OLS enforcement, Foundry IQ ACL/
  sensitivity-label enforcement, and Work IQ's Rego-based policy enforcement
  are three separate mechanisms with separate configuration and separate
  failure modes; verifying one does not verify another.
- **Unverified:** native support for every plane on every runtime is not
  established here. Verify each selected route's identity, connectivity, and
  compatibility; an assumed adapter does not establish support.
- **Recommendation:** verify tenant enablement, regional availability,
  per-connection consent/approval, and admin-configured governance or spending
  policy for each plane independently.
- **Recommendation:** define per-claim source authority, conflict behavior,
  provenance retention and partial-failure semantics before cross-plane synthesis.

## Tradeoffs

Direct connections avoid an extra orchestration hop when their capabilities fit.
Delegation can reuse specialist behavior but adds identity, state, latency, and
lifecycle boundaries. Multiple planes add governance and result-reconciliation
work; overlapping data coverage is a reason to test fit, not to add every plane.

## Diagram mapping

Context: caller, Fabric workspace owners, Foundry IQ data owners, and
Microsoft 365/Work IQ data owners. Components: selected runtime, each IQ
connection, reconciliation responsibility, and any delegated agent. AI and data
flow: per-plane retrieval/action calls, RLS/OLS and document ACL enforcement
points, provenance, conflict and partial-failure paths, consent and approval
steps, and explicit read-versus-write approval. Deployment: selected runtime
lifecycle, connection identities, tenant/admin governance boundaries, and each
plane's resources.
For Copilot Studio, include its harness and manual ALM gates.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Fabric IQ, Foundry IQ, and Work IQ are three standalone, composable IQ workloads | [What is Foundry IQ?](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq#relationship-to-fabric-iq-and-work-iq) | 2026-10-01 | Treat each plane as an independent tool/connection to add only when the journey needs it |
| Fabric IQ models ontologies, semantic models, graphs, and data agents over OneLake/Power BI | [What is Fabric IQ?](https://learn.microsoft.com/fabric/iq/overview) | 2026-10-01 | Select Fabric IQ for structured/ontology-backed business data, not document retrieval |
| Fabric data agents support external orchestrators and enforce caller permissions through governed read-only access | [Fabric data agent concepts](https://learn.microsoft.com/fabric/data-science/concept-data-agent) | 2026-10-06 | Verify the selected external route and preserve source permission enforcement |
| Fabric data agents are a governed interface that never exposes more data than the user could already retrieve in Fabric | [Data security for AI and analytics](https://learn.microsoft.com/azure/cloud-adoption-framework/data/operational-standards-data-product-security-standards-unify-data-platform#3-fabric-data-agent-data-security) | 2026-10-01 | Prefer Fabric data agents over bypassing connectors for governed structured-data access |
| Foundry IQ document-level access is enforced only when the knowledge source supports it and ACL/label sync is explicitly configured; remote SharePoint sources enforce via the Copilot Retrieval API instead | [Foundry IQ frequently asked questions](https://learn.microsoft.com/azure/foundry/agents/concepts/foundry-iq-faq#how-does-foundry-iq-handle-permissions) | 2026-10-01 | Verify ACL/label synchronization per knowledge source; do not assume enforcement by default |
| Foundry Agent Service connects to a Foundry IQ knowledge base through MCP | [Connect a Foundry IQ knowledge base to Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/how-to/foundry-iq-connect) | 2026-10-06 | Verify this managed connector independently of retrieval backend maturity |
| Work IQ supports organizational/business context and cross-runtime MCP, REST, and A2A surfaces with user-scoped policy enforcement | [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) | 2026-10-06 | Choose the required API surface and verify its source access, licensing, and compatibility |
| Work IQ writes require explicit administrator enablement | [Work IQ in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/use-work-iq) | 2026-10-06 | Verify write enablement and action approval separately from read access |
