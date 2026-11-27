# Decision-model triage

## Use when / avoid when

Use when a bounded judgment routes, filters, or prioritizes work: ticket or
case routing, intent or document-type classification, policy gates before a
tool call, queue priority, or choosing which agent, tool, or model handles a
request. Avoid when the user needs a written rationale or new content (use a
generative model), when rules are known and exact (use deterministic code), or
when the problem is constrained optimization (use a solver or custom model).

## Evidence classification

Official capability guidance for `Microsoft-Decision-1.1`; the triage topology
is a **locally composed recipe**.

## Responsibilities and components

Core: a caller (API, worker, workflow, or agent), a decision-model deployment,
a threshold and routing policy owned by the business, a fallback path, and the
downstream handlers. Optional: a generative model for items that need a
rationale or response, and a human review queue. See
[model selection](../model-selection.md#decision-models) for question types and
design rules.

## Flows

Item -> caller builds named questions (`noul`, `choice`, `score`) -> decision
model -> caller validates labels and applies thresholds -> route to handler,
or abstain to fallback/human queue -> outcome recorded with probabilities,
threshold version, and model version for evaluation.

## Trust boundaries and ownership

The caller authenticates to the Foundry resource with a managed identity. The
business owns thresholds, option sets, and the review policy; the workload team
owns validation and fallback. Untrusted input stays data: put it in the
request's state, never in the option set or instructions.

## Support gates

- **Constraint:** decisions about people's access, money, employment, or safety
  keep meaningful human review.
- **Recommendation:** validate on representative labeled examples and choose
  thresholds from false-positive and false-negative costs before release.
- **Maturity:** `Microsoft-Decision-1.1` is GA; the decision-model judge is
  preview and uses version 1. Verify the deployment type in the selected region.
- **Unverified:** sensitivity to option wording and order for this workload.

## Tradeoffs

Typed outputs are cheaper to validate and audit than free text, and need fewer
output tokens. They give no rationale; add a generative explanation only where a
reader needs one. A fixed option set needs change control as the taxonomy grows.

## Diagram mapping

Context: item sources and handlers. Components: caller, decision policy, model,
fallback. Runtime and data flow: question, threshold, route, abstain, and
outcome logging. Deployment: Foundry resource, deployment type and region,
identity, and telemetry.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| GA decision model for classification, routing, ranking, grading, binary decisions | [Use Microsoft-Decision-1.1](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/use-foundry-models-microsoft-decision) | 2026-11-24 | Route and gate with typed answers; measure accuracy and latency on labeled examples |
| Decision-model judge for evaluators | [Decision-model judge](https://learn.microsoft.com/azure/foundry/observability/how-to/decision-model-judge) | 2026-11-24 | Optional low-cost judge; keep preview status in the evaluation plan |
