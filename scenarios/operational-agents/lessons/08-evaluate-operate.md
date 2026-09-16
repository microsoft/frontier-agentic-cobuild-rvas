# Module 8 - Prove behavior and prepare to operate

Keep runtime correctness separate from model quality. The same engine can
enforce approval while a model still chooses an irrelevant tool or gives a poor
explanation.

## What you build

A behavioral report, selected live evidence, and an explicit list of remaining
customer acceptance requirements. Inputs are the previous modules' fixtures
and the customer's proposed operations.

## Choose your path

| Check | Evidence | Boundary |
|---|---|---|
| **Offline behavioral suite** | Actual state transitions and operation counts. | No inference about model quality. |
| Live synthetic read | A real model/tool round trip. | No proof of customer-tool permissions. |
| Customer acceptance set | Representative tasks against approved integrations. | Requires the customer's owners and acceptance criteria. |

Use [Evaluation & Red Teaming](../../../activities/advanced-evaluation-redteam/README.md)
to add model-quality and adversarial checks. Reuse
[Tracing & Observability](../../../activities/advanced-tracing-observability/README.md)
for telemetry integration rather than creating another trace convention.

## Implementation

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py
```

Compare results with `accelerator/sample-data/expected.json`. Inspect an
approved run's `evidence`, then inspect the backend record independently.
Retain task and operation IDs for correlation. Live tasks also retain their
response ID; the sample does not export OpenTelemetry spans.

Before a customer pilot, assign owners for the source and destination APIs.
Choose authenticated approval and retention rules. If tasks must run on
multiple hosts, replace local SQLite and process locks with an appropriate
shared-state design.

Hosted execution is an optional adaptation. Follow
[Deploy as a Hosted Agent](../../../activities/advanced-deploy-hosted-agent/README.md)
only after resolving state durability and the remote tool address. A local
database inside a replaceable container is not a durable shared store.

## Verify

Every offline case must pass, including interrupted commit and stale approval.
For the live path, run the explicit check from module 2 and review its tool
selection and final explanation.

Record unsupported or unverified customer behavior as remaining work. An
offline report, template compilation, or successful model call alone does not
establish production readiness.

## Next module

There is no required additional module. Agree the next customer decision:
adapt an approved tool, add authenticated approval, or stop until the
destination can provide the required execution evidence.
