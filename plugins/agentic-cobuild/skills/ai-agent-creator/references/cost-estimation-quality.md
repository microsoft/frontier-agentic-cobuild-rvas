# Cost and consumption estimate contract

Read for every confirmed architecture. Create
`docs/architecture/cost-estimate.md` even when the user does not ask about cost.
AI architecture changes consumption shape: model calls, context, tool fan-out,
retries, evaluation, media processing, and agent coordination must be visible
and priced as far as evidence permits before final package handoff.

## Required document

Use this structure:

```markdown
# AI solution cost and consumption estimate

## Status, scope, and architecture revision
## Workload scenarios and volume basis
## AI consumption model
## Platform and infrastructure resource model
## Unit prices and pricing evidence
## Scenario calculations and totals
## Sensitivity, limits, and budget controls
## Assumptions, exclusions, and unresolved inputs
## Cost-estimation handoff
```

Set status to one of:

- `Provisional - consumption or pricing inputs incomplete`;
- `Pricing attempted - source or tool unavailable`;
- `Scenario estimate - retail prices verified`;
- `Scenario estimate - negotiated prices verified`.

Use `Not calculated` for a missing amount. Name its blocking input, owner, and
decision gate. A missing amount is not zero.

Retain this required structure after invoking `cost-estimation`. The specialist
supplies meter discovery, pricing evidence, and calculations; it does not replace
the architecture package's cost document with a shorter standalone report.

## Workload scenarios

Define low, expected, and high scenarios where volume or agent behavior can
materially change consumption. Record the applicable basis:

- active users or batch items;
- sessions or jobs per user/period;
- turns or items per session/job;
- peak and average concurrency;
- environments and operating schedules;
- monthly growth and seasonality;
- development, test, evaluation, red-team, and production traffic.

Use measured or stakeholder-confirmed values when available. Label an assumption
with its evidence, owner, measurement method, and decision gate.

## AI consumption model

Model each billable AI path using stable architecture responsibility IDs:

| Journey / step | Architecture ID | Billing unit | Calls or units per interaction | Low / expected / high quantity | Evidence / owner |
| --- | --- | --- | --- | --- | --- |
| Named online, batch, evaluation, or background step | Component or boundary ID | Tokens, credits, messages, executions, minutes, pages, characters, images, or another verified unit | Include retries, fan-out, and replans | Quantity per interaction and period | Measurement, requirement, assumption, and owner |

For token-billed inference, separate billable classes exposed by the selected
provider and model. These can include input, cached input, output, audio, image,
batch, fine-tuning, or other documented classes. Do not invent a token class or
assume that every platform bills by tokens.

Account for:

- system instructions, conversation history, retrieved grounding, tool results,
  user input, and generated output;
- coordinator, specialist, reviewer, aggregator, and delegated-agent calls;
- retries, repair calls, safety checks, routing, summarization, compaction,
  memory extraction, evaluation, and red-team runs;
- retrieval queries, indexing or vectorization, reranking, knowledge or context
  platform units, and data transfer;
- speech, audio, avatar, image, and document-processing units where applicable;
- platform-managed credits, messages, actions, or capacity units when those are
  the verified billing model.

Make amplification explicit. A multi-agent interaction is the sum of every
coordinator, specialist, review, join, retry, and replan path that can execute.
Show the probability or scenario assumption for conditional paths.

Use transparent formulas, for example:

```text
monthly interactions =
  active users x sessions per user x turns per session

monthly model calls =
  monthly interactions x calls per interaction
  + retries + background + evaluation calls

monthly input tokens =
  sum(calls by path x average billable input tokens for that path)

monthly output tokens =
  sum(calls by path x average billable output tokens for that path)
```

## Platform and infrastructure model

Inventory every billable service and shared prerequisite:

| Architecture ID | Service / pricing model | Region | Environment / quantity | Low / expected / high usage | Unit price / source | Period cost / status |
| --- | --- | --- | --- | --- | --- | --- |
| Stable ID | Selected service or unresolved candidate kept separate | Named or unresolved | Count, capacity, schedule | Meter-aligned units | Verified price or `Pending` | Formula or `Not calculated` |

Include applicable hosting, storage, databases, queues, search, networking,
private endpoints, observability, backups, safety/evaluation services, licenses,
support, and managed-platform consumption. Separate workload-attributable cost
from shared enterprise allocations.

## Calculations and controls

For every calculated line preserve product/service, SKU or pricing model, region,
meter/unit, price type, currency, unit price, quantity, formula, and retrieval
date. Label retail and negotiated prices separately. Combine only one currency
and one stated price basis in a total.

Report:

- cost per interaction, job, or processed item;
- daily or monthly AI consumption by billable class;
- monthly and annual steady-state cost;
- one-time build, indexing, migration, or adaptation cost;
- development, test, evaluation, and release-assurance consumption;
- optional capacity, DR, support, and license scenarios.

Identify the dominant cost sensitivities. Record architecture limits that bound
consumption, such as maximum turns, calls, retries, replans, tool fan-out,
retrieval depth, context size, response tokens, concurrency, queue depth, job
duration, and per-user or per-tenant budgets. Link each limit to its owning
requirement, architecture boundary, and delivery validation.

## Package links and completion

In `solution.md`, include `## Cost and consumption handoff` with the estimate
status, a link to `cost-estimate.md`, and the architecture choices that control
consumption. Keep detailed quantities and calculations in `cost-estimate.md`.

In `implementation-plan.md`, provide the environment schedules, rollout traffic,
evaluation volume, migration/indexing work, load-test scenarios, and measurement
steps consumed by the estimate. Link phases rather than copying calculations.

Before final handoff, load `cost-estimation` as a bounded consultation. Distinguish
hypothetical pricing for the new design from existing-scope spend forecasting.
For every meter-ready model, platform, or infrastructure line, execute the
applicable retail pricing workflow and preserve product/model, SKU or deployment
type, token or platform unit, region, currency, price type, retrieval date, and
source. Use negotiated-price workflows when requested and the billing scope is
available; keep retail and negotiated values separate.

If a meter is ambiguous, ask only for the minimum missing discriminator and
combine independent missing details into one cost-input round before reconciliation.
If model/deployment, token class, region, currency, quantity, billing scope, or
pricing tooling is unavailable, record the exact blocked lines, attempted
source/tool when an attempt was possible, owner, and completion gate. Do not call
a merely meter-ready handoff complete when enough evidence exists to retrieve
prices.

After handoff, `cost-estimation` or another approved pricing owner handles refreshes
when usage measurements, architecture revisions, negotiated rates, or prices
change. Pricing incompleteness is a cost blocker, not a reason to reopen package
acceptance.

The estimate is complete when the file exists, names the architecture revision,
represents every billable path or explicitly excludes it, and traces every
material quantity to evidence or an owned gate. Calculated totals trace to dated
pricing evidence. Every meter-ready line has dated pricing evidence or a concrete
pricing-attempt blocker. Blocked totals say `Not calculated`. The package contains no
invented token volume, unit price, discount, savings claim, or exact total.
