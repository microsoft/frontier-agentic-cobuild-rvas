---
marp: true
paginate: true
title: Content Understanding and Document Workflow
description: Facilitator and customer discussion deck
version: 0.2.0
---
<!-- slide:id=scenario-open -->

# Content Understanding and Document Workflow

**Customer discussion deck**

Extract typed results from documents, review them against the source, and control the downstream action.

Use this deck to agree on the decision, automation evidence, and controls needed before deployment.

---
<!-- slide:id=scenario-intro -->

## How to use this conversation

Use this deck with sponsors, SMEs, security, data owners, and engineering to make decisions.
The scenario modules contain the implementation steps.

Each module moves through the same three steps:

- **Discuss:** Why the decision matters to the business outcome.
- **Decide:** Which path fits the documents, workflow, and operating environment.
- **Prove:** What the team must show before moving forward.

Record the choice, owner, open question, and evidence gate as you go. The practical steps live in the
scenario modules.

---
<!-- slide:id=lesson-foundation-context -->

## Module 1. Confirm scope and connect the foundation

Agree the document class and downstream action. Select the intended extraction path before
provisioning, and reuse approved tenant resources.

Discuss:

- Which business decision this workflow will improve.
- Which teams own identity, networking, storage, monitoring, and model access.
- Which environments are needed for experimentation, pilots, and production.
- How to apply keyless access, least privilege, and traceability from the start.

---
<!-- slide:id=lesson-foundation-choices -->

## Foundation choices and trade-offs

Key decisions:

- **Shared vs. dedicated resources:** Shared foundations reduce setup work; dedicated resources can simplify isolation and chargeback.
- **Region and model availability:** Consider model choice, data residency, latency, and quota together.
- **Identity model:** Prefer managed identity and role-based access over keys where possible.
- **Observability baseline:** Start tracing and monitoring early so later workflow issues are diagnosable.

Record any deferred production controls and their owners.

---
<!-- slide:id=lesson-foundation-evidence -->

## Foundation evidence

Before the team proceeds, confirm:

- The Foundry foundation, storage, model deployments, and monitoring plan have owners.
- The access model is documented and keyless-first.
- The team has documented the environment boundaries.
- Later modules can use required outputs without copying secrets into notes or code.
- The team knows what still needs security, networking, or operations review.

Decision question: **Can engineering safely build on this foundation without re-deciding basic platform controls each module?**

---
<!-- slide:id=lesson-document-source-context -->

## Module 2. Connect an approved document source

Process only documents whose owners have approved their use.

Discuss:

- Which workflow source is authoritative: Azure Blob, ADLS Gen2, SharePoint, OneLake, or another governed store.
- Who is allowed to approve sample use.
- How source identity, document version, permissions, and retention are preserved.
- How unsafe, unsupported, or out-of-scope files are quarantined.

For customer documents, a staging folder needs source approval and access controls.

---
<!-- slide:id=lesson-document-source-choices -->

## Document source choices and trade-offs

Key decisions:

- **Business source vs. staging area:** Direct integration preserves context; staging can simplify processing but adds governance work.
- **Representative samples:** Include normal, edge, low-quality, multilingual, and failure cases, not only ideal examples.
- **Permissions:** Decide whether the workflow inherits source permissions or uses a separate processing identity.
- **Retention:** Define how originals, extracted results, evidence, and corrections are retained.

Check source provenance and authorization before intake.

---
<!-- slide:id=lesson-document-source-evidence -->

## Document source evidence

Before moving forward, confirm:

- The document source is approved for this scenario.
- Sample documents are representative and authorized for testing.
- Each document traces to its source, version, owner, and retention policy.
- The team has a clear path for quarantine, deletion, and exception handling.
- Access checks allow intended users and deny unauthorized users.

Decision question: **Can every document used by the workflow be explained, traced, and governed?**

---
<!-- slide:id=lesson-extraction-selection-context -->

## Module 3. Select the extraction capability

Choose extraction based on document variability, schema needs, confidence requirements, and operating constraints.

Discuss:

- Whether Content Understanding analyzers fit the document classes and fields.
- Where Document Intelligence, LLM structured outputs, or multimodal approaches may fit better.
- Which fields require exact evidence versus broad summarization.
- Which errors are tolerable, reviewable, or unacceptable.

Record the chosen capability and the document evidence behind it.

---
<!-- slide:id=lesson-extraction-selection-choices -->

## Extraction choices and trade-offs

Key decisions:

- **Content Understanding:** Fits SMEs who need to shape classes and schemas for varied content.
- **Document Intelligence:** Useful for established document extraction patterns and form-like structure.
- **LLM structured outputs:** Flexible for reasoning over text but require strict validation and evidence controls.
- **Multimodal processing:** Helpful when layout, images, or visual cues matter.

Include validation, review, cost, and monitoring work in the capability decision.

---
<!-- slide:id=lesson-extraction-selection-evidence -->

## Extraction selection evidence

Before implementation, confirm:

- The selected capability matches document quality, field complexity, region, cost, and review needs.
- The target schema is specific enough to test.
- Known failure cases are included in the decision.
- The team has agreed when a field must be empty rather than inferred.
- Human-review rules are part of the extraction decision.

Decision question: **Can the team explain why this capability is the right fit for the first controlled workflow?**

---
<!-- slide:id=lesson-typed-extraction-context -->

## Module 4. Implement typed extraction with evidence

A useful extraction result is typed, validated, and supported by evidence.

Discuss:

- Which fields are required, optional, derived, or prohibited.
- What evidence is needed for each important value: page, span, citation, confidence, or source reference.
- How missing, ambiguous, conflicting, or low-confidence values should be represented.
- Where the workflow must avoid inferred values.

Keep the source evidence and review reasons with the typed result.

---
<!-- slide:id=lesson-typed-extraction-choices -->

## Typed extraction choices and trade-offs

Key decisions:

- **Strict schema vs. flexible notes:** Strict schemas help automation; flexible notes may help SMEs explain unusual cases.
- **Confidence thresholds:** High thresholds reduce false approvals and increase review volume.
- **Evidence granularity:** More detailed evidence improves trust but can increase storage and UI complexity.
- **Failure behavior:** Empty-with-reason is safer than filling a field without support.

Test missing and uncertain fields as well as correctly extracted values.

---
<!-- slide:id=lesson-typed-extraction-evidence -->

## Typed extraction evidence

Before the workflow can use extracted results, confirm:

- The output validates against the agreed schema.
- Important fields include evidence and confidence where appropriate.
- Missing and low-confidence fields follow a consistent policy.
- Unsupported values are not invented to satisfy the schema.
- Reviewers can see enough source context to confirm or challenge a value.

Decision question: **Would a business reviewer understand what was extracted, why it was trusted, and what still needs attention?**

---
<!-- slide:id=lesson-human-review-context -->

## Module 5. Build review, correction, and handoff

Build the review path before allowing extraction results to reach a business system.

Discuss:

- Which cases require review: missing fields, low confidence, conflicting values, sensitive decisions, or policy exceptions.
- Who can approve, correct, reject, or escalate.
- What correction reason and evidence must be retained.
- Which downstream system receives approved results.

Show the source evidence and flagged fields together in the review interface.
---
<!-- slide:id=lesson-human-review-choices -->

## Review and handoff choices and trade-offs

Key decisions:

- **Reviewer queue vs. embedded workflow:** Queues centralize review; embedded workflows meet users where they already work.
- **Correction model:** Corrections should update the case record and feed evaluation. Do not silently overwrite history.
- **Approval boundary:** Decide which results can flow automatically and which require a named approver.
- **Handoff contract:** Use a governed downstream contract. Do not write directly from unreviewed extraction.

Keep correction history when simplifying review.

---
<!-- slide:id=lesson-human-review-evidence -->

## Review evidence

Before handoff is trusted, confirm:

- Review rules are explicit and testable.
- A reviewer can correct, approve, reject, and explain the decision.
- Corrections retain the document, evidence, reviewer, timestamp, and contract version.
- Approved results are handed off through a controlled interface.
- Exceptions have an owner and a resolution path.

Decision question: **Can the customer prove who approved a result, what changed, and why it was sent downstream?**

---
<!-- slide:id=lesson-prove-and-observe-context -->

## Module 6. Evaluate and trace the workflow

Measure the workflow on representative cases and confirm operators can diagnose failures.

Discuss:

- Which quality measures matter: field accuracy, routing accuracy, false approvals, review rate, latency, and cost.
- Which adversarial or messy cases should be tested.
- What traces must show across intake, extraction, review, and handoff.
- How corrections become future evaluation evidence.

Evaluate review routing and downstream approval alongside model output quality.

---
<!-- slide:id=lesson-prove-and-observe-choices -->

## Evaluation and tracing choices and trade-offs

Key decisions:

- **Holdout data:** Keep evaluation examples separate from tuning examples.
- **Quality gates:** Define thresholds for automation, review, and rejection.
- **Trace detail:** Capture enough context to debug without exposing unnecessary sensitive content.
- **Regression testing:** Re-run important cases when schemas, analyzers, prompts, or review rules change.

Check each change against the agreed quality gates before expanding automation.

---
<!-- slide:id=lesson-prove-and-observe-evidence -->

## Evaluation evidence

Before promotion, confirm:

- Representative test cases cover normal, edge, and failure segments.
- Field accuracy, review volume, false approval risk, and latency are measured.
- Traces connect document intake, extraction, policy, review, correction, and handoff.
- Failures have named causes and owners.
- The release decision covers rollback and monitoring.

Decision question: **Can the team defend the workflow with evidence rather than a successful demo?**

---
<!-- slide:id=lesson-deploy-context -->

## Module 7. Deploy the reviewable workflow

Assign the deployed workflow's access, support, and rollback owners.

Discuss:

- Who can invoke the workflow and under what identity.
- Which environment receives the pilot and what production controls are required.
- How analyzer or schema versions are promoted.
- How monitoring, support, rollback, and change management work.

Limit pilot access, check traces, and rehearse rollback.

---
<!-- slide:id=lesson-deploy-choices -->

## Deployment choices and trade-offs

Key decisions:

- **Pilot scope:** Start with a bounded document set, user group, and decision path.
- **Endpoint and identity:** Use authenticated access and managed identity where possible.
- **Versioning:** Track analyzer, schema, policy, review rules, and downstream contract together.
- **Operations:** Decide alert ownership, support process, rollback criteria, and release cadence.

Resolve support and rollback gaps before broad rollout.

---
<!-- slide:id=lesson-deploy-evidence -->

## Deployment evidence

Before controlled rollout, confirm:

- The workflow runs behind approved access controls.
- Monitoring and tracing are enabled for the end-to-end path.
- Version and rollback information is documented.
- Review and correction data stay available after deployment.
- The pilot owner can decide whether to expand, pause, or revise the workflow.

Decision question: **Is the workflow ready to serve a bounded real use case with accountable controls?**

---
<!-- slide:id=scenario-next-session -->

## Close the discussion

Before the next working session, record:

- the first high-value document decision and its business owner
- the approved source and 15–30 safe, representative samples
- expected fields, unacceptable errors, and review rules
- the SME, engineering, security, and workflow handoff owners
- current constraints for identity, retention, monitoring, and deployment
- one owner and due date for every unresolved decision

Agree on the first pilot scope and the evidence needed before expansion.
