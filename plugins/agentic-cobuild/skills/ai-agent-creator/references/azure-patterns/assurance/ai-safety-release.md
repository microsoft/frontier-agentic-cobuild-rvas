# AI safety and release assurance

## Use when

Read when generative AI faces external users, untrusted content, sensitive data,
regulated decisions, consequential tools, or broad autonomy. Assurance is a
release system, not a content-filter setting.

## Responsibilities

Name the product, model, data, security, risk, evaluation, and operations owners.
Maintain one risk register that links each credible harm to prevention,
detection, evaluation, response, and residual-risk acceptance.

## Risk-driven evaluation

Select applicable risks from the journey and trust boundaries:

- harmful, illegal, self-harm, sexual, violent, or abusive content;
- direct and indirect prompt injection, jailbreaks, and instruction hierarchy;
- sensitive-data disclosure, tenant leakage, and memorization;
- identity, authorization, approval, and tool-scope bypass;
- fabricated evidence, unsafe overreliance, and consequential factual error;
- unfair or systematically degraded outcomes for affected groups;
- uncontrolled loops, resource exhaustion, and irreversible agent actions.

Evaluate model output, retrieval, memory, tool proposals, trusted execution, and
the end-to-end journey separately. Use representative production-like cases,
adversarial cases, denied and partial-access cases, and expected safe failures.
Automated red teaming broadens coverage; human review remains necessary for
domain harms, novel attacks, and residual-risk acceptance.

## Release and operating contract

Version prompts, policies, models, grounding sources, tool schemas, safety
configuration, and evaluation datasets as one release manifest. Define measurable
promotion thresholds and blocking regressions before testing.

Release through offline evaluation, adversarial testing, security review where
required, controlled canary exposure, monitored promotion, and tested rollback.
Record accepted residual risks and the accountable approver. In production,
monitor safety signals, policy refusals, authorization denials, abnormal tool
activity, user reports, data leakage indicators, quality regressions, and cost or
loop anomalies. Feed confirmed incidents and corrections into governed regression
sets without placing sensitive production data into evaluation or training sets
without approval.

## Support gates

- **Constraint:** content filters do not establish authorization, grounding,
  factual correctness, fairness, privacy, or safe tool execution.
- **Evidence:** validate evaluators and red-team coverage against the workload;
  synthetic attacks do not prove absence of risk.
- **Privacy:** govern prompts, traces, evaluation datasets, reviewer access,
  retention, and incident evidence as production data.
- **Recommendation:** keep a deterministic stop, rollback, and human escalation
  path for safety-sensitive journeys.

## Diagram and artifact mapping

Show safety controls at the boundary they protect. Put evaluation and adversarial
flows on AI and data flow; identities, telemetry, incident destinations, release
environments, canary, and rollback ownership on Deployment. Trace each release
gate to specification acceptance criteria and an implementation phase.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| AI red teaming probes model and application safety risks before release | [AI Red Teaming Agent](https://learn.microsoft.com/azure/foundry/concepts/ai-red-teaming-agent) | 2026-10-07 | Use adversarial testing as release evidence, not as a substitute for risk ownership |
| Risk and safety evaluators measure harmful-content categories and safety behavior | [Risk and safety evaluators](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/risk-safety-evaluators) | 2026-10-07 | Select evaluators from the workload's credible harms and verify coverage |
