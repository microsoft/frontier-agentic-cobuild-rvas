# Cross-cutting selection

Apply to every workload after compute, data, and messaging are chosen. Each
section ends on a decision the solution record captures.

## Identity

- **Workforce users**: Microsoft Entra ID.
- **Customer or partner users**: Entra External ID. Azure AD B2C has been closed
  to new customers since 1 May 2025; existing tenants are supported until at
  least May 2030.
- **Service-to-service**: managed identities wherever the target supports
  Entra authentication; Key Vault for remaining secrets and certificates.
- **Authorization**: record where each business permission is enforced (API,
  data layer, or platform role), not only who signs in.

## Ingress and network

| Need | Start with |
| --- | --- |
| Global HTTP entry, CDN, WAF, multi-region failover | **Front Door** |
| Regional HTTP entry with WAF, private backends | **Application Gateway** |
| API policies and developer onboarding | **API Management** (see [messaging](messaging.md)) |
| Private access to PaaS | Private endpoints with private DNS, inside a virtual network |
| Egress control and inspection | Azure Firewall or the platform landing zone's hub |

When the customer has a platform landing zone, the workload inherits its hub,
DNS, policy, and connectivity; record which are inherited and which the
workload owns.

## Observability

Design logs, metrics, traces, alerts, and health signals together. Use Azure
Monitor with Application Insights and OpenTelemetry instrumentation; send
platform logs to Log Analytics. Name the health model: which signals mean
healthy, degraded, and unhealthy for each critical flow, and who is alerted.

## Delivery

Declarative infrastructure as code (Bicep or Terraform), assessing Azure
Verified Modules; `azd` where its provision-and-deploy workflow fits; CI/CD
with automated tests and safe deployment gates per environment.

## Well-Architected review

Prioritize the five pillars against the business goals and record tradeoffs.
Use the checklist codes as review anchors in the solution record:

| Pillar | Checklist | Minimum the record answers |
| --- | --- | --- |
| Reliability | RE:01–RE:10 | Critical flows, failure modes, availability and recovery targets (RTO/RPO), redundancy |
| Security | SE:01–SE:12 | Data classification, identity, network segmentation, secrets, threat model, incident path |
| Cost Optimization | CO:01–CO:14 | Cost model, environment sizing, scaling limits, commitment options |
| Operational Excellence | OE:01–OE:11 | IaC, pipelines, observability, safe deployment, runbooks |
| Performance Efficiency | PE:01–PE:12 | Targets, capacity plan, load-test approach |

Apply the matching workload guide when one exists: mission-critical, SaaS, AI,
or Oracle on Azure. Recommend the Well-Architected Review assessment as a
post-approval activity rather than claiming it was run.

## Design patterns

Choose a pattern for a demonstrated problem in the journey, not because a
service supports it. Record the problem beside the pattern.

| Problem | Pattern |
| --- | --- |
| Transient faults on dependencies | Retry with backoff; Circuit Breaker for persistent failure |
| Bursty load overwhelming a backend | Queue-Based Load Leveling; Competing Consumers |
| Repeated reads that tolerate staleness | Cache-Aside |
| Reads and writes need different models or scale | CQRS (Event Sourcing only when the change history itself is required) |
| Multi-service business transaction | Saga with compensation |
| Incremental replacement of a legacy system | Strangler Fig with an Anti-Corruption Layer |
| One entry point for many backends or clients | Gateway Routing, Offloading, or Aggregation; Backends for Frontends |
| Large payloads through a broker | Claim Check |
| Clients need direct, scoped storage access | Valet Key |
| Tenant or scale isolation | Deployment Stamps; Bulkhead |
| Protecting shared resources | Throttling; Rate Limiting |
| Auxiliary concerns beside the app | Sidecar; Ambassador |

**Complete when:** identity, authorization point, ingress, private access,
secrets, health model, delivery approach, and each pillar's minimum answers are
recorded or carried as owned gates, and every selected pattern names its problem.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Five pillars and review process | [Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/what-is-well-architected-framework) | 2026-11-24 | Record pillar priorities and tradeoffs |
| Pillar checklists | [Reliability](https://learn.microsoft.com/azure/well-architected/reliability/checklist); [Security](https://learn.microsoft.com/azure/well-architected/security/checklist); [Cost](https://learn.microsoft.com/azure/well-architected/cost-optimization/checklist); [Operations](https://learn.microsoft.com/azure/well-architected/operational-excellence/checklist); [Performance](https://learn.microsoft.com/azure/well-architected/performance-efficiency/checklist) | 2026-11-24 | Use codes as review anchors |
| Workload-specific guidance | [Well-Architected workloads](https://learn.microsoft.com/azure/well-architected/workloads) | 2026-11-24 | Apply the matching guide when one exists |
| Pattern catalog | [Cloud design patterns](https://learn.microsoft.com/azure/architecture/patterns/) | 2026-11-24 | Select patterns by demonstrated problem |
| Azure AD B2C closed to new customers | [Azure AD B2C FAQ](https://learn.microsoft.com/azure/active-directory-b2c/faq) | 2026-11-24 | Use Entra External ID for new customer identity |
| Secure ingress | [Network secure ingress](https://learn.microsoft.com/azure/architecture/pattern-implementations/network-secure-ingress) | 2026-11-24 | Choose global versus regional entry deliberately |
| Observability | [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview) | 2026-11-24 | Instrument with OpenTelemetry into Application Insights |
| Landing zones | [What is an Azure landing zone](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/) | 2026-11-24 | Separate inherited platform controls from workload-owned ones |
| `azd` workflow | [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) | 2026-11-24 | Use where its template workflow fits delivery |
