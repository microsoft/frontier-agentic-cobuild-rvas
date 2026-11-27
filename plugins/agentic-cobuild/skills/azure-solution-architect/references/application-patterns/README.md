# Application branch

Read for every workload. Select the application shape here before any AI
branch is applied on top of it. Cards are **starting points**, not certified or
deployment-ready architectures.

## Selection sequence

Decide in this order. Each step narrows the next; reopen an earlier step only
when evidence invalidates it.

1. **Architecture style** per bounded context, from the journey, quality
   attributes, and team capability (table below). Combine styles where contexts
   differ; purity is not a goal.
2. **Compute and hosting** per component: [compute selection](selection/compute.md).
3. **Data and state** per access pattern: [data selection](selection/data.md).
4. **Messaging and integration** per interaction in the integration ledger:
   [messaging selection](selection/messaging.md).
5. **Cross-cutting boundaries**: identity, ingress and network, secrets,
   observability, delivery, Well-Architected review, and design patterns:
   [cross-cutting selection](selection/cross-cutting.md).
6. **Workload card**: match the closest card below and adapt it. Compose a
   second card only for a confirmed second shape (for example, a web app with a
   durable approval workflow).

Each decision records the chosen option, the closest rejected option, and the
requirement that separated them.

## Architecture style

| Style | Choose when | Principal cost |
| --- | --- | --- |
| Modular monolith (N-tier or layered) | One team, one deployable, clear internal modules; independent scaling not required | Whole-application deployment and scaling |
| Web-Queue-Worker | A web front end plus long-running or resource-intensive work | Duplicate processing and database/message consistency |
| Microservices | A complex domain with independently deployed and scaled capabilities and teams | Distributed data, interservice calls, and operations |
| Event-driven | Reactive, near-real-time, fan-out, or IoT workloads | Delivery, ordering, and eventual consistency design |
| Big data | Large-scale batch or streaming analytics | Coordinated ingestion, processing, and analytical storage |
| Big compute | Parallel simulation, rendering, scientific or financial computation | Task distribution and platform fit for coupled work |

Prefer the simplest style that meets the confirmed quality attributes. A
microservices proposal names the bounded contexts and team ownership that
justify it.

## Workload index

| Card | Use when | Evidence class |
| --- | --- | --- |
| [Transactional web app or API](workloads/01-transactional-web-app.md) | Users or clients create and read business records over HTTP | Official reference architecture; baseline |
| [Web-queue-worker](workloads/02-web-queue-worker.md) | Requests trigger work that outlives the HTTP call | Official architecture style; locally composed recipe |
| [Microservices on containers](workloads/03-microservices.md) | Several bounded contexts ship and scale independently | Official reference architectures |
| [Event-driven integration](workloads/04-event-driven-integration.md) | Systems react to business events or telemetry streams | Official architecture style and reference architecture |
| [Multitenant SaaS](workloads/05-multitenant-saas.md) | One product serves several customer organizations | Official guidance; locally composed recipe |
| [Durable business workflow](workloads/06-durable-business-workflow.md) | A process spans waits, approvals, retries, or compensation | Official capability guidance; locally composed recipe |
| [Batch and data processing](workloads/07-batch-and-data-processing.md) | Scheduled or bulk processing, analytics, or parallel compute | Official architecture styles; locally composed recipe |
| [Modernize an existing application](workloads/08-modernize-existing-app.md) | An existing system is extended, migrated, or incrementally replaced | Official patterns and guidance; locally composed recipe |

## Select, adapt, verify

1. Match the confirmed journey, workload shape, tenancy, constraints, and
   enterprise starting point. Name the near-match you rejected.
2. Adapt components by responsibility. A reference's service or tier choice is
   one option, not a requirement; reuse adequate existing platform capabilities
   and record the requirement or gap behind any new component.
3. Account for every selected card's support gates under the
   [Microsoft Learn evidence contract](../microsoft-learn-evidence.md).
4. Record choices under the [architecture record contract](../architecture-quality.md):
   inherited elements, deviations, rejected matches, and unresolved gates.

**Complete when:** each bounded context has a style; each component has a
compute, data, and messaging choice with its rejected alternative; each selected
card's gates have evidence, a requirement decision, or an owned deferral; and no
retired or retiring service is proposed for new work without a recorded reason.

## Card and diagram contract

Cards use the same sections and gate labels as the AI cards: suitability,
evidence class, responsibilities, flows, boundaries, support gates
(**constraint**, **recommendation**, **maturity**, **unverified**), tradeoffs,
diagram mapping, and source evidence. Use each card's diagram mapping with
architecture quality's four views. Checked dates are snapshots; the evidence
contract owns live verification.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Choose styles per context from quality attributes and constraints | [Architecture styles](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/) | 2026-11-24 | Record style per bounded context with its tradeoff |
| Monolith organized into internal modules is a valid single deployment | [Common web application architectures](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures) | 2026-11-24 | Prefer it when independent deployment is not required |
| Azure application architecture fundamentals | [Architecture guide](https://learn.microsoft.com/azure/architecture/guide/) | 2026-11-24 | Follow style, technology choice, and WAF review in order |
