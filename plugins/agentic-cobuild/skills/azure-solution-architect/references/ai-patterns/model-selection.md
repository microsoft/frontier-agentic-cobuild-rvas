# Model selection and decision models

Read when the AI branch needs a model family, a deployment type, a routing
choice, or a bounded judgment. The [selection matrix](runtimes/README.md) owns
the inference boundary and adaptation mechanisms; this file owns which model
does the work and how it is served.

## Match the output contract first

Pick by the shape of the answer the step needs, then by quality evidence:

| Step needs | Model class | Choose over the alternatives when |
| --- | --- | --- |
| A typed judgment: true/false, one of N labels, or a position on an ordered scale | **Decision model** (`Microsoft-Decision-1.1`) | No written rationale is needed, and probabilities feed a threshold, route, or queue order |
| Free text, synthesis, extraction to a schema, or tool calls | **Chat / generative model** | The step must produce content or call tools, and evaluation shows a nonreasoning model meets the quality target |
| Multistep planning, mathematics, code, document comparison, or hard tool sequencing | **Reasoning model** | Measured quality gain justifies extra latency and output tokens |
| A narrow task on constrained hardware, offline, or with inference kept on the device | **Small language model** (Phi family, Foundry Local, Windows AI APIs) | Device readiness and model availability are verified, and the owner accepts update and provenance duties |
| A varied request mix where one fixed model wastes cost or quality | **Model router** | A routed pool beats a fixed deployment on the workload's own evaluation |

Compose classes when the journey has distinct steps: a decision model gates or
routes, then a generative or reasoning model produces content only for the
items that need it. Record each step's class in the solution record; a single
"the model" hides a cost and quality decision.

## Decision models

`Microsoft-Decision-1.1` is GA in Foundry for classification, routing, ranking,
grading, and binary decisions. It returns probabilities or scores, not prose.
One request can ask several named questions about the same text, JSON, or image
input.

| Question type | Returns | Typical use |
| --- | --- | --- |
| `noul` | Probability that a condition is true | Gate a tool call, filter content, detect a policy breach |
| `choice` | One option plus a probability per option | Route a ticket, classify intent or document type, select an agent, tool, or model |
| `score` | Probability-weighted position on a lowest-to-highest scale | Prioritize a queue, grade output, rate severity |

Design rules:

- **Thresholds are business decisions.** Set each threshold from the cost of
  false positives versus false negatives on representative labeled examples;
  record the threshold and its owner in the specification.
- **Abstain explicitly.** Route low-confidence items to a fallback: a human
  queue, a generative model with a rationale, or a deterministic default.
- **Treat probabilities as estimates.** Use `score` for relative order and
  thresholds, not as an absolute rating. Test sensitivity to option wording and
  order before release.
- **Keep people in consequential decisions.** A decision about a person's
  access, money, employment, or safety keeps meaningful human review.
- **Validate the option set.** The application rejects a returned label that is
  not in its supplied list rather than trusting it.

Serving: the Microsoft-provider endpoint is
`<resource-endpoint>/providers/microsoft/v1/systemone`; the request `model` is
the deployment name. Deployment types are `GlobalStandard` and, in selected
regions, `DataZoneStandard`. Responses report token usage, so the
[cost estimate](../cost-estimation-quality.md) models it like any other
deployment.

Related contracts to keep distinct:

- **Decision-model judge (preview)** uses `Microsoft-Decision-1`, not 1.1, for
  supported Foundry evaluators without a rationale. Compare it with the current
  judge on labeled data; keep a generative judge where explanations matter.
- **Azure OpenAI Decisions API** is a separate endpoint (`/openai/v1/decisions`)
  and schema (`predicate`, `choice`, `score`) on supported Azure OpenAI models.
  Verify its maturity, model, and region before depending on it.
- **Retired services:** Azure AI Personalizer, Anomaly Detector, and Metrics
  Advisor retired on 1 October 2026. Map those needs to a decision model,
  Azure Machine Learning, or Fabric data science by requirement.
- **Optimization is not classification.** An explicit objective with hard
  constraints (scheduling, allocation, routing vehicles) needs a solver or
  custom model, not a probability.

## Shortlist and evaluate

1. Filter candidates by task and modality, context window, tool and structured
   output support, data residency, region, deployment type, latency, cost, and
   tuning needs.
2. Shortlist with Foundry leaderboards (preview) for quality, safety,
   throughput, and estimated cost. Public scores do not replace evaluation.
3. Evaluate the shortlist on representative and adversarial workload examples
   against the specification's quality, safety, latency, and cost thresholds.
   Keep the cheapest candidate that passes.
4. For reasoning models, tune `reasoning_effort` where supported against the
   same thresholds. Reasoning tokens consume context and bill as output; size
   output limits so responses are not truncated.

## Deployment type

| Need | Deployment type |
| --- | --- |
| Variable traffic, global processing acceptable | Global Standard |
| Inference processing inside a data zone | Data Zone Standard or Data Zone Provisioned |
| Processing inside one Azure geography | Standard or Regional Provisioned, where supported |
| Sustained demand that needs reserved throughput and stable latency | Provisioned (PTU) |
| Asynchronous bulk work with a 24-hour target | Batch |
| Temporary evaluation of a fine-tuned model | Developer (no SLA or residency guarantee; not production) |

Data at rest and inference processing follow different location rules. Check
each model, region, and deployment-type combination separately.

## Lifecycle

Name an owner for model version upgrades. Standard deployments can auto-upgrade
on the published schedule; provisioned deployments migrate manually. Read the
live retirement schedule during architecture rather than caching dates, and
add the migration and regression evaluation to the implementation plan. Partner
and community catalog models carry their own terms and data-processing
arrangements; check them per model.

For a model router, log the selected model per request, constrain the pool
where compliance or behavior requires it, and evaluate the routed pool as one
deployment. Router version `2025-11-18` is GA; Auto routing and some router
features are preview.

**Complete when:** every AI step names its model class and why; each decision
model has a threshold, abstention path, and labeled-evaluation plan; and the
deployment type, region, lifecycle owner, and maturity of each model are
recorded or carried as owned gates.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| `Microsoft-Decision-1.1` is GA for typed judgments with `noul`, `choice`, `score` | [Use Microsoft-Decision-1.1](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/use-foundry-models-microsoft-decision) | 2026-11-24 | Use for routing and gating before generation; validate thresholds on labeled data |
| Decision-model judge is preview and uses `Microsoft-Decision-1` | [Decision-model judge](https://learn.microsoft.com/azure/foundry/observability/how-to/decision-model-judge) | 2026-11-24 | Keep judge version and maturity explicit in the evaluation plan |
| Azure OpenAI Decisions API is a separate contract | [Decisions API](https://learn.microsoft.com/azure/foundry/openai/how-to/decisions) | 2026-11-24 | Do not interchange its schema with the Foundry decision endpoint |
| Personalizer, Anomaly Detector, Metrics Advisor retired | [End of support 2026](https://learn.microsoft.com/lifecycle/end-of-support/end-of-support-2026) | 2026-11-24 | Exclude from new designs; map needs by requirement |
| Model selection criteria and leaderboard limits | [Choose an AI model](https://learn.microsoft.com/azure/architecture/ai-ml/guide/choose-ai-model); [Leaderboards](https://learn.microsoft.com/azure/foundry/how-to/benchmark-model-in-catalog) | 2026-11-24 | Shortlist publicly, decide on workload evaluation |
| Reasoning effort and token billing | [Reasoning models](https://learn.microsoft.com/azure/foundry/openai/how-to/reasoning) | 2026-11-24 | Budget reasoning tokens as output; tune effort per step |
| Local versus cloud inference | [Local or cloud AI](https://learn.microsoft.com/windows/ai/cloud-ai) | 2026-11-24 | Record device, consent, and fallback rules for hybrid designs |
| Model router modes and preview features | [Model router](https://learn.microsoft.com/azure/foundry/openai/concepts/model-router) | 2026-11-24 | Evaluate the routed pool; log the selected model |
| Deployment types and processing location | [Deployment types](https://learn.microsoft.com/azure/foundry/foundry-models/concepts/deployment-types) | 2026-11-24 | Choose by residency, throughput, and latency needs |
| Version upgrade and retirement policy | [Model retirements](https://learn.microsoft.com/azure/foundry/openai/concepts/model-retirements) | 2026-11-24 | Plan provisioned migrations and regression evaluation |
