# Microservices on containers

## Use when / avoid when

Use when a complex domain splits into bounded contexts that separate teams
deploy and scale independently. Avoid when one team owns the product or the
contexts change together; a modular monolith delivers the same separation at a
fraction of the operational cost.

## Evidence classification

Official reference architectures: **Container Apps microservices** and the
**AKS baseline** (production cluster).

## Responsibilities and components

Core: one service per bounded context, each owning its data; an ingress or API
gateway; asynchronous messaging between services; container registry;
centralized telemetry with distributed tracing. Host on Container Apps unless
Kubernetes control is a requirement (AKS). Optional: Dapr on Container Apps
for service invocation and pub/sub, API Management for external APIs.

## Flows

Client -> gateway -> owning service -> its store. Cross-context changes travel
as events or commands through Service Bus or Event Grid; multi-service business
transactions use Saga with compensation. Each hop propagates a trace context.

## Trust boundaries and ownership

Each service has its own managed identity and data access. The gateway
authenticates callers; each service authorizes its own operations. Team
ownership maps one-to-one to services and their pipelines.

## Support gates

- **Constraint:** no shared database across services; cross-service queries go
  through APIs, events, or a read model.
- **Recommendation:** start with the fewest services the bounded contexts
  justify; split later on evidence.
- **Maturity:** verify Container Apps or AKS feature support (workload
  profiles, networking mode, zone redundancy) in the region.
- **Unverified:** the team topology that justifies independent deployment.

## Tradeoffs

Independent deployment and scaling cost distributed data, network failure
modes, and platform engineering. AKS adds control and ecosystem at the price of
cluster operations.

## Diagram mapping

Context: clients and external systems. Components: services by bounded context
with their stores. Runtime and data flow: synchronous calls, events, and saga
steps. Deployment: environment or cluster, ingress, registry, identities,
network.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Microservices style and challenges | [Microservices](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/microservices) | 2026-11-24 | Justify by bounded contexts and team ownership |
| Microservices on Container Apps | [Container Apps microservices](https://learn.microsoft.com/azure/architecture/example-scenario/serverless/microservices-with-container-apps) | 2026-11-24 | Default host without Kubernetes management |
| Production AKS baseline | [AKS baseline](https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aks/baseline-aks) | 2026-11-24 | Use when Kubernetes control is a requirement |
| Distributed transactions | [Saga](https://learn.microsoft.com/azure/architecture/patterns/saga) | 2026-11-24 | Compensate rather than lock across services |
