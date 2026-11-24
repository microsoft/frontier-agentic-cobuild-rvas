# Modernize an existing application

## Use when / avoid when

Use when an existing system is extended with new capability, moved to Azure, or
incrementally replaced. Avoid a big-bang rewrite unless the existing system is
small and well understood. For code-level upgrade, assessment, and migration
execution, hand off to the modernization specialist workflows after approval.

## Evidence classification

Official patterns (**Strangler Fig**, **Anti-Corruption Layer**) and Cloud
Adoption Framework guidance; the composition is a **locally composed recipe**.

## Responsibilities and components

Core: an inventory of the current system (components, data, integrations,
owners), a target shape chosen from the other cards, a routing facade (Front
Door, Application Gateway, or API Management) that moves traffic slice by
slice, an Anti-Corruption Layer where new code must not inherit legacy
semantics, and a data migration and synchronization plan.

## Flows

Clients -> facade -> legacy or new component per route. New components read
legacy data through the Anti-Corruption Layer or a synchronized copy until data
ownership moves. Each slice ends with the legacy route removed.

## Trust boundaries and ownership

Record which team owns each slice before and after cutover. Identity often
changes (for example, to Entra ID); plan coexistence. Data ownership moves
explicitly; two writable systems of record for one entity is a recorded,
time-bound exception.

## Support gates

- **Constraint:** the routing facade and data synchronization must exist before
  the first slice moves.
- **Recommendation:** choose rehost, replatform, or refactor per component and
  record why; rehost first is valid when time to exit a datacenter dominates.
- **Unverified:** current-state facts the repository does not show; investigate
  before asking, and record what remains unknown.

## Tradeoffs

Incremental replacement lowers risk and delivers value early but runs two
systems for a while, with synchronization cost. Rehosting is fastest but keeps
technical debt.

## Diagram mapping

Context: current users and systems. Components: legacy and new components
side by side. Runtime and data flow: facade routing, ACL translation, data sync.
Deployment: current estate, landing zone, cutover sequence per slice.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Incremental replacement | [Strangler Fig](https://learn.microsoft.com/azure/architecture/patterns/strangler-fig) | 2026-11-24 | Move by slice behind a facade |
| Isolate legacy semantics | [Anti-Corruption Layer](https://learn.microsoft.com/azure/architecture/patterns/anti-corruption-layer) | 2026-11-24 | Translate at the boundary |
| Rehost versus optimize | [Compute decision tree](https://learn.microsoft.com/azure/architecture/guide/technology-choices/compute-decision-tree) | 2026-11-24 | Decide per component |
| Landing zones for migrated workloads | [Azure landing zones](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/) | 2026-11-24 | Place workloads inside platform guardrails |
