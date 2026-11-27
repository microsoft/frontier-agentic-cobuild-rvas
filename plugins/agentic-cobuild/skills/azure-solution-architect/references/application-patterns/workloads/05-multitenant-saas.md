# Multitenant SaaS

## Use when / avoid when

Use when one product serves several customer organizations with their own
users, data, and possibly configuration or regions. Avoid when the product
serves a single organization; tenancy machinery then adds cost without value.

## Evidence classification

Official multitenant architecture guidance and the Well-Architected SaaS
workload guide; the composition is a **locally composed recipe**.

## Responsibilities and components

Core: tenant catalog (tenant id, tier, region, stamp, configuration), tenant
onboarding and lifecycle, identity per tenant (Entra External ID or federated
Entra ID), tenant-aware authorization, data isolation model, per-tenant
metering, and a control plane separate from the application plane. Scale with
Deployment Stamps when tenants outgrow a shared unit or need residency.

## Flows

Sign-in resolves tenant -> request carries tenant context -> app enforces
tenant filter or routes to the tenant's database/stamp -> usage metered per
tenant. Onboarding: control plane creates the tenant record, identity
configuration, and data or stamp placement.

## Trust boundaries and ownership

Tenant isolation is a security boundary: enforce it in the data layer (row-level
security, database-per-tenant, or stamp) and test it. The provider owns the
control plane; tenant admins own their users and configuration.

## Support gates

- **Constraint:** choose the isolation model per resource (shared, pooled, or
  dedicated) and record why; it fixes cost and noisy-neighbor exposure.
- **Recommendation:** meter usage per tenant from the first release to support
  pricing and cost attribution.
- **Unverified:** tenant count, size distribution, and residency demands.

## Tradeoffs

Shared resources lower cost per tenant but raise noisy-neighbor and blast-radius
risk; dedicated resources isolate at higher cost. Stamps bound blast radius and
support regions but add deployment fleet management.

## Diagram mapping

Context: tenant organizations, their users, provider operators. Components:
control plane, application plane, tenant catalog, metering. Runtime and data
flow: tenant resolution, isolation enforcement, onboarding. Deployment: shared
versus per-tenant resources, stamps, regions.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Tenancy models and isolation approaches | [Multitenant architectural approaches](https://learn.microsoft.com/azure/architecture/guide/multitenant/approaches/overview) | 2026-11-24 | Decide isolation per resource |
| SaaS workload design areas | [Well-Architected SaaS](https://learn.microsoft.com/azure/well-architected/saas/get-started) | 2026-11-24 | Review business model, lifecycle, and billing alongside architecture |
| Scale units | [Deployment Stamps](https://learn.microsoft.com/azure/architecture/patterns/deployment-stamp) | 2026-11-24 | Bound blast radius and support residency |
