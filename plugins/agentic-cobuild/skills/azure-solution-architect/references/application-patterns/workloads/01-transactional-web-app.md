# Transactional web app or API

## Use when / avoid when

Use when users or client systems create, read, and update business records over
HTTP: portals, line-of-business apps, public APIs, back-office tools. Avoid as
the whole design when requests trigger long-running work (add
[web-queue-worker](02-web-queue-worker.md)) or several teams ship
independently ([microservices](03-microservices.md)).

## Evidence classification

Official reference architectures: **basic web app** (introductory, single
region) and **baseline zone-redundant web app** (production baseline).

## Responsibilities and components

Core: client (browser, mobile, or calling system), web/API host, relational or
document store, identity provider, secrets, and telemetry. The baseline uses
App Service, Application Gateway with WAF, private endpoints, Azure SQL, Key
Vault, and Application Insights; select each by the
[selection guides](../README.md#selection-sequence). Optional: Static Web Apps
for a separate front end, Azure Managed Redis for Cache-Aside, Blob Storage
with Valet Key for uploads, Front Door for global entry.

## Flows

Client -> ingress (WAF) -> web/API -> authorization check -> store; reads may
pass through cache. Uploads go client -> Blob Storage with a scoped token; the
API stores the reference.

## Trust boundaries and ownership

Users authenticate with Entra ID (workforce) or Entra External ID (customers).
The API enforces business authorization on every operation. The app reaches
data, cache, and Key Vault with a managed identity over private endpoints in
production.

## Support gates

- **Constraint:** the basic reference is not production; the zone-redundant
  baseline sets the production starting point.
- **Recommendation:** set availability and recovery targets before choosing
  zone redundancy, multi-region, or database tier.
- **Maturity:** verify zone-redundancy support for the chosen SKUs and region.
- **Unverified:** expected request rate and data size until the customer
  supplies them; carry as cost and scale assumptions.

## Tradeoffs

A single deployable is the cheapest to build and operate; it scales as one
unit. Private networking and WAF add cost and setup but are the production
default for customer data.

## Diagram mapping

Context: users, client channel, external systems. Components: UI, API, domain
modules, store. Runtime and data flow: request, authorization, write, read via
cache. Deployment: ingress, app host, private endpoints, data, identity, region
and zones.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Introductory single-region web app | [Basic web app](https://learn.microsoft.com/azure/architecture/web-apps/app-service/architectures/basic-web-app) | 2026-11-24 | POC or dev starting point only |
| Production App Service baseline with WAF and private access | [Baseline zone-redundant web app](https://learn.microsoft.com/azure/architecture/web-apps/app-service/architectures/baseline-zone-redundant) | 2026-11-24 | Production default; former Reliable/Modern Web App links resolve here |
