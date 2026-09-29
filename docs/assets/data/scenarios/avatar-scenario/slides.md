---
marp: true
title: Avatar Scenario Customer Discussion Deck
paginate: true
---
<!-- slide:id=scenario-open -->

# Avatar Scenario
## An application with accessible output

Build an interactive assistant or a repeatable content-production application in the customer's
tenant. Start with the application goal, then choose whether an avatar helps.

**Workshop outcome:** choose the application goal, media path, approval boundary, accessible
fallback, and evidence needed for a controlled pilot.

---
<!-- slide:id=scenario-intro -->

# How to use this conversation

Each module moves through the same three steps:

| Step | Customer question |
|---|---|
| Discuss | Which user or content outcome are we trying to improve? |
| Decide | Which experience and control path fits the risk? |
| Prove | What must the customer see before the team moves on? |

Record the choice, owner, open question, and evidence gate as you go. Keep build detail in the
scenario modules.

---
<!-- slide:id=lesson-experience-selection-context -->

# Module 1 — Context
## Choose the application goal

**Interactive assistant:** help users ask questions or complete a task using approved knowledge.

**Content-production application:** turn approved source revisions into media through a repeatable
generation and publishing workflow.

Neither is the default. Agree on the first user task or workflow trigger and the evidence that
proves delivery. Producing one video is an integration check.

---
<!-- slide:id=lesson-experience-selection-choices -->

# Module 1 — Choices and trade-offs
## Match capability to risk and value

Choose the media format after the application goal:

- **Batch avatar video:** a rendering step in a content-production application; requires job handling and controlled publication.
- **Real-time avatar:** more interactive; higher latency, consent, moderation, and support expectations.
- **Voice or audio-first:** lower production weight; may meet accessibility and channel needs better.
- **Video translation:** maintain language versions in the content workflow; review translated meaning before publication.
- **No avatar:** still valid when disclosure, accessibility, cost, or trust argues for a simpler format.

The decision must cover consent, likeness and voice rights, supported regions, identity model,
pricing, accessibility coverage, content-safety controls, and an exit path.

---
<!-- slide:id=lesson-experience-selection-evidence -->

# Module 1 — What must be true
## A capability decision the sponsor can defend

By the end of this module, the team should have a short decision record that states:

- selected experience capability and why it fits the pilot
- application goal, user task or workflow trigger, and acceptance checks
- alternatives considered and why they were not selected
- consent, disclosure, accessibility, privacy, residency, and retention assumptions
- operating owner, support path, and conditions that would stop or simplify the experience

**Discussion:** If the avatar option became unavailable tomorrow, could the onboarding outcome still be delivered safely?

---
<!-- slide:id=lesson-foundation-context -->

# Module 2 — Context
## Provision the Foundry and Speech foundation

The scenario needs a foundation so each prototype does not become a one-off integration.

The foundation should support:

- keyless access patterns where possible
- a model and grounding path only when assisted authoring or live answers are needed
- Speech or media services for the selected experience capability
- access to the approved content; add indexed retrieval only when the selected path needs it
- telemetry that helps owners understand behavior without over-collecting employee data

This becomes the shared base for policy, learning, and multilingual communication scenarios.

---
<!-- slide:id=lesson-foundation-choices -->

# Module 2 — Choices and trade-offs
## Reusable platform, not hard-coded demo

Key design choices decide whether the pilot can become a repeatable pattern:

- **Identity:** managed identity and role-based access reduce secret handling, but require clear ownership.
- **Region and capacity:** availability, latency, data residency, and cost may point to different deployment choices.
- **Model path:** a general model may be enough for drafting; stricter use cases may need more evaluation and guardrails.
- **Observability:** useful traces help diagnose issues, but message content capture must be intentional and governed.
- **Seams:** keep rendering, assistant, content, and approval components replaceable.

Build a foundation customers can adapt. Avoid a locked architecture.

---
<!-- slide:id=lesson-foundation-evidence -->

# Module 2 — What must be true
## A foundation ready for governed work

The test is whether the foundation can run accountably:

- required resources are provisioned with the intended identity model
- environment settings are documented without exposing secrets
- content, assistant, rendering, approval, and telemetry components can connect
- owners know where logs, traces, and configuration evidence will live
- the runtime identity can reach the selected services from the customer's approved network

**Discussion:** Can the team explain who can access what, why, and how that access is reviewed?

---
<!-- slide:id=lesson-content-pipeline-context -->

# Module 3 — Context
## Build the governed content pipeline

The avatar cannot become an unreviewed policy source. It must express approved content.

For every claim used in the experience, the pipeline needs:

- source, version, owner, and review cycle
- audience and locale
- sensitivity and escalation route
- expiry or withdrawal conditions
- traceability from source to script segment

This makes onboarding content a controlled input for the assistant, storyboard, approvals, and
published experience.

---
<!-- slide:id=lesson-content-pipeline-choices -->

# Module 3 — Choices and trade-offs
## Govern claims without slowing every edit

Teams need controls that protect employees without making simple updates impossible.

Discussion choices:

- What counts as an approved source: policy page, HR guide, learning page, legal FAQ, or SME note?
- Which changes need full reapproval versus owner review?
- How granular should claims be for traceability?
- How are locale-specific policy differences handled?
- Who can retire, pause, or replace content when guidance changes?

This is a speed-versus-confidence choice. Start with a small, well-owned pilot corpus.

---
<!-- slide:id=lesson-content-pipeline-evidence -->

# Module 3 — What must be true
## Versioned claims with named ownership

Build a traceable claim set that downstream steps can use:

- each claim has an authoritative source and owner
- versions and expiry rules are visible
- sensitive topics are marked with review and escalation requirements
- unapproved or expired material is excluded from drafting
- the source-to-script relationship can be shown to reviewers
- exact wording is approved before module 5 creates a private preview

**Discussion:** If an employee challenges a statement in the avatar experience, can the owner show where it came from and whether it was current?

---
<!-- slide:id=lesson-grounded-assistant-context -->

# Module 4 — Context
## Build the grounded assistant behind the experience

Skip model-based drafting when the wording is already approved.
When assisted authoring or live answers are needed, connect only the permitted sources.

Expected behavior:

- cite approved sources when making claims
- refuse or escalate when content is missing or expired
- avoid policy interpretation beyond the approved corpus
- support human review rather than replacing it
- preserve a clear path from source to script to final experience

Reviewers must be able to see why the assistant said what it said.

---
<!-- slide:id=lesson-grounded-assistant-choices -->

# Module 4 — Choices and trade-offs
## Helpful drafting versus unsafe authority

The assistant can speed preparation. It cannot become the decision-maker.

Design choices include:

- how strict retrieval should be before drafting
- whether the assistant answers employee questions directly or routes to human support
- how it handles missing, conflicting, or stale content
- what tone and reading level it uses for onboarding audiences
- how citations appear for reviewers versus employees

Make the assistant reliable at grounded drafting, refusal, and escalation before you broaden
interaction.

---
<!-- slide:id=lesson-grounded-assistant-evidence -->

# Module 4 — What must be true
## Cited drafts and visible refusals

The evidence should show accountable content work:

- draft segments include source links or claim references
- unsupported requests are refused or routed for human help
- reviewer prompts produce evidence, not unsupported confidence
- sensitive policy questions trigger the expected escalation path
- logs or traces help diagnose grounding failures without overexposing employee data

**Discussion:** Which answer would worry us more: “I don’t know” or a confident answer without a source?

---
<!-- slide:id=lesson-experience-generation-context -->

# Module 5 — Context
## Connect generation to the application

Content production needs a deployed workflow with persisted job state and failure recovery.
An interactive assistant needs a client connected to the bounded answer path.

The question is whether employees can understand the message clearly and honestly:

- synthetic-media disclosure is visible and plain
- captions and transcript are available
- keyboard, mobile, and low-bandwidth access are considered
- languages and locale differences are handled intentionally
- a non-avatar alternative exists where needed

Accessibility and disclosure belong in the product, not post-production cleanup.

---
<!-- slide:id=lesson-experience-generation-choices -->

# Module 5 — Choices and trade-offs
## Design for trust, not novelty

Experience choices shape employee trust:

- **Avatar style:** realistic avatars can feel polished, but may raise impersonation concerns.
- **Voice:** branded voice can improve consistency, but requires consent and rights clarity.
- **Disclosure placement:** early and visible disclosure is safer than hidden footnotes.
- **Fallback:** transcript, audio, or human-led alternatives reduce exclusion.
- **Localization:** translation must preserve meaning, policy nuance, and accessibility.
- **Channel:** Teams, learning platform, intranet, or email each changes measurement and support.

The experience should never imply that a real person said something they did not approve.

---
<!-- slide:id=lesson-experience-generation-evidence -->

# Module 5 — What must be true
## Approved revision rendered accessibly

Build an experience package that can be reviewed before release:

- generated only from an approved script revision
- includes disclosure, captions, transcript, and fallback
- preserves source and approval references
- supports the selected audience, locale, and channel
- identifies who can pause or withdraw the published version

For content production, repeat a trigger and recover an interrupted job without duplicate output.
For an assistant, test supported and refused questions through the actual client.

**Discussion:** Could an employee understand that the media is synthetic, get the same message without the avatar, and find human help?

---
<!-- slide:id=lesson-approval-gating-context -->

# Module 6 — Context
## Gate publication behind human approval

Human approval turns generated content into accountable communication.

Before anything is published, named reviewers should confirm:

- factual accuracy and source alignment
- legal, compliance, privacy, and labor considerations
- brand, tone, and employee experience fit
- accessibility and inclusive design expectations
- publication scope, support route, and withdrawal authority

For content production, module 3 approved the wording; this module approves the media and release.
For an assistant, approve the application version and content/refusal policy.
Enforce the decision in the customer's release system.

---
<!-- slide:id=lesson-approval-gating-choices -->

# Module 6 — Choices and trade-offs
## Keep approval strong and workable

Approval should protect the organization without turning every typo into a governance crisis.

Decisions to make:

- Which roles are mandatory for each content type?
- What changes reset approval: source change, translation, visual edit, voice change, or channel move?
- Who can emergency-pause an experience?
- How are reviewer disagreements resolved?
- What evidence must be retained, and for how long?

The approval gate must be easy to use and strong enough to stop unsafe publication.

---
<!-- slide:id=lesson-approval-gating-evidence -->

# Module 6 — What must be true
## Publication and withdrawal record

Create a release record that shows:

- approved script revision and rendered experience
- reviewer roles, decisions, and conditions
- accessibility and disclosure review outcome
- publication channel, audience, and owner
- pause, withdrawal, and replacement process

**Prove withdrawal through the user channel.** Changing a local approval file is insufficient.

**Discussion:** If a source policy changes after launch, who knows, who acts, and what happens to the published experience?

---
<!-- slide:id=lesson-prove-and-operate-context -->

# Module 7 — Context
## Evaluate, red-team, trace, and operate

The pilot should produce evidence for a business decision, not just engagement numbers.

Useful evidence includes:

- grounding quality and unsupported-claim defects
- disclosure and accessibility checks
- comprehension, task completion, and support handoffs
- feedback themes from employees and reviewers
- red-team findings around deception, bias, unsafe advice, and stale content
- trace review for failures and improvement opportunities

Use the evidence to decide whether to iterate, scale, pause, or withdraw.

---
<!-- slide:id=lesson-prove-and-operate-choices -->

# Module 7 — Choices and trade-offs
## Measure enough to learn, not enough to surveil

Operating the experience requires careful measurement:

- cohort-level insight is usually safer than individual-level monitoring
- qualitative feedback explains confusion that metrics can hide
- red-team scenarios should include accessibility, language, disclosure, and policy edge cases
- trace capture helps debugging but must respect privacy and data minimization
- scorecards should define action thresholds before the pilot starts

Use evidence to improve the experience without making employees feel observed.

---
<!-- slide:id=lesson-prove-and-operate-evidence -->

# Module 7 — What must be true
## Application acceptance and release decision

**Prove the deployed application.** For content production, run a source update through generation
and approved publication, then recover a failed job and withdraw outdated output. For an assistant,
prove the supported task and refusal through its authenticated client.

Keep release evidence in the customer's existing system:

- pilot scorecard tied to the original onboarding outcome
- known defects and remediation owners
- red-team results and accepted residual risks
- trace review themes and operating improvements
- recommendation to iterate, scale, pause, or withdraw

**Discussion:** What evidence would convince this customer to expand the pattern to another topic, locale, or audience?

---
<!-- slide:id=scenario-next-session -->

# Close the discussion
## Turn the decisions into a pilot plan

Bring one real onboarding moment and the people who own it to the next module.

Before the next working session, record:

- pilot topic, audience, locale, and channel
- application goal and first user task or workflow trigger
- approved source owners and review expectations
- selected experience capability and fallback
- disclosure, accessibility, and human-help requirements
- approval gate and withdrawal path
- first scorecard for operating evidence
- one owner and due date for every unresolved decision

**Working outcome:** a narrow, governed pilot that teams can build, review, and measure. The
Agentic Co-build is not the full production solution.
