# Enterprise landing-zone integration

## Use when / avoid when

Use when a workload relies on shared identity, networking, DNS, governance, or
operations. For an existing estate, inventory and reuse it; do not build a
parallel foundation simply because the source shows one.

## Evidence classification

Official reference architecture; **ownership/deployment variant** of
[secure grounded chat](02-secure-grounded-chat.md). Apply its ownership ideas to
other workloads only as an explicitly adapted composition.

## Responsibilities and components

Core: workload subscription/resources and named platform dependencies.
Reference choices include hub/spoke connectivity, firewall, DNS, policy, and
cross-premises access. Workload-owned Foundry resources, applications, and data
remain distinct from platform-owned shared controls.

## Flows

Preserve workload data flows. Add spoke-to-platform resolution, controlled egress,
cross-premises access when required, and IaC/pipeline promotion paths.

## Trust boundaries and ownership

Draw platform versus workload ownership. Record who approves network/policy
changes and who operates shared dependencies. The source recommends
workload-owned Foundry resources rather than centralizing them indiscriminately.

## Support gates

- **Constraint:** actual platform policy and address-space availability govern fit.
- **Recommendation:** coordinate DNS, routing, egress, capacity, and failure modes
  with platform owners.
- **Unverified:** confirm the selected runtime's private access and toolbox paths;
  a hub/spoke drawing alone does not establish support.

## Tradeoffs

Shared controls reduce duplication but introduce cross-team dependencies and
change coordination. A centralized model endpoint or gateway may be a dependency;
it does not imply that all workload agent resources should also be centralized.

## Diagram mapping

Context: workload and platform owners. Components: existing versus new capabilities.
AI and data flow: unchanged workload logic. Deployment: subscription/ownership
boundaries, hub/spoke, private endpoints/DNS, delivery and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Baseline adapted to shared platform controls | [Foundry chat in an Azure landing zone](https://learn.microsoft.com/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-landing-zone) | 2026-10-01 | Name shared dependencies and preserve workload ownership |

The reference's topology is guidance; live estate inventory is separate evidence.
