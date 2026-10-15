# AI Gateway governance

## Use when / avoid when

Use Azure API Management as an AI Gateway when several consumers, model
backends, remote MCP servers, or agent APIs need one governed traffic boundary.
Typical drivers are per-consumer token quotas, shared capacity, centralized
authentication, policy enforcement, observability, load balancing, failover, or
developer self-service.

Prefer direct access when one workload owns one backend and its native identity,
quota, monitoring, and resilience controls meet the requirements. A gateway is
not a default agent component, agent runtime, or substitute for business
authorization.

## Evidence classification

**Official capability guidance and enterprise operations guidance**, composed as
a cross-cutting governance variant. Selected policies, protocols, service tiers,
and Foundry integrations have separate maturity and compatibility gates.

## Responsibilities and components

Core: authenticated consumers, APIM gateway, governed endpoints, backend
identities, policy lifecycle, telemetry, and platform operations. Keep three
surfaces distinct:

- **Model gateway:** model inference APIs, token allocation, routing, and backend
  resilience.
- **Tool gateway:** REST APIs and remote MCP servers, with operation-level
  authorization outside model reasoning.
- **Agent gateway:** remote agent or A2A APIs, with explicit caller, delegation,
  state, and protocol boundaries.

The workload still owns prompts, agent behavior, retrieval permissions, tool
authorization, approvals, and authoritative business state.

## Flows

Caller -> gateway authentication and consumer policy -> selected model, tool, or
agent endpoint -> result -> governed telemetry. Show backend managed identity or
credential exchange separately from caller authorization. Preserve streaming,
timeout, retry, circuit-breaker, and partial-failure behavior for each protocol.

## Trust boundaries and ownership

Assign gateway, API, model-capacity, policy, and workload owners. Gateway access
authorizes use of an endpoint; it does not authorize a business action. Apply
least privilege to gateway-to-backend identities and preserve end-user or tenant
authorization where the backend requires it.

Treat semantic cache entries as shared derived data. Disable semantic caching for
permission-sensitive, user-specific, mutable, consequential, or regulated
responses unless the cache key, partition, retention, invalidation, and deletion
rules preserve every relevant authorization and freshness boundary. Similarity
is not an authorization check.

## Support gates

- **Constraint:** justify the gateway with a shared governance, capacity,
  security, resilience, or developer-access requirement. Existing APIM policy is
  enterprise evidence; an empty application repository is not.
- **Constraint:** verify the exact model API, streaming or real-time behavior,
  MCP or A2A contract, authentication flow, private-network path, and APIM tier.
- **Constraint:** scale gateway capacity and backend model capacity separately.
  Load balancing cannot manufacture model quota.
- **Maturity, checked 2026-10-15:** core AI Gateway capabilities extend APIM;
  individual capabilities vary by tier. Unified model API and direct AI Gateway
  integration in Microsoft Foundry are preview.
- **Recommendation:** define token and request limits by an authenticated consumer
  or tenant key, not an untrusted caller-supplied identifier.
- **Recommendation:** classify prompt/completion logging before enabling payload
  capture; prefer minimum necessary telemetry and governed retention.
- **Unverified:** confirm selected policy availability, region, tier, protocol,
  identity, and networking combinations through current Microsoft Learn evidence.

## Tradeoffs

A shared gateway improves consistency, fleet visibility, capacity allocation, and
incident containment. It also adds latency, cost, policy-release work, capacity
planning, and a shared failure domain. Compare it with backend-native controls and
workload-owned direct access before selection.

## Diagram mapping

Context: consumers, platform owner, workload owner, and governed providers.
Components: separate model, tool, and agent gateway surfaces where selected.
AI and data flow: caller identity, policy evaluation, routing, backend identity,
streaming, and telemetry. Deployment: APIM tier and regions, private connectivity,
DNS, backend pools, cache where justified, monitoring, policy promotion, and
failure domains.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| AI Gateway governs model APIs, MCP servers, and A2A agent APIs | [AI gateway in Azure API Management](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities) | 2026-10-15 | Model, tool, and agent surfaces can share APIM while retaining distinct contracts |
| A single application can use backend-native TPM controls; portfolio growth creates per-consumer quota needs | [AI gateway scalability and performance](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities#scalability-and-performance) | 2026-10-15 | Select APIM from a demonstrated shared-control need rather than by default |
| Enterprise agent operations recommend a managed gateway for centralized policy and traffic control | [Manage AI agents across your organization](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/integrate-manage-operate#administration-of-ai-agents) | 2026-10-15 | Treat the gateway as a platform governance boundary with named ownership |
| Managed identity, OAuth, content safety, backend load balancing, circuit breakers, and token telemetry are separate capabilities | [AI gateway capabilities](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities) | 2026-10-15 | Select and verify policies individually; one enabled policy does not certify the full path |

During architecture, consult `azure-aigateway` only for read-only policy and
topology guidance. Configuration, identity grants, policy deployment, testing,
and APIM provisioning belong to the later delivery workflow.
