---
name: customer-activity-forge
description: "Research a customer and industry from public sources, then generate ranked AI-application ideas mapped to relevant scenario playbooks, with implementation gaps made explicit."
argument-hint: "Company name and industry are required. Optional: region/segment and known pain points."
---

## Context

Use this skill when a participant has a customer or industry but no bounded AI opportunity. It
turns “we should do something with AI” into a useful customer conversation: research public facts,
propose about ten achievable ideas, and map the best candidates to a scenario playbook.

This is an intake tool, not an architecture approval or delivery commitment. After choosing an idea,
map its parts to scenario modules with the `use-case-mapper` skill. Use that map to agree the first
implementation scope with the customer, including acceptance criteria. Confirm data access and the
approved environment before building.

## Input

**Required**
- `customer_name` — company or business unit.
- `industry` — sector, such as retail, healthcare, financial services, or manufacturing.

**Optional**
- `region_or_segment` — geography or sub-segment.
- `known_pain_points` — customer signals to verify during research.

If either required input is missing, ask for it before proceeding.

## Process

### 1. Research public sources only

Use `web_search` and `web_fetch` to collect:

- the company’s products, services, customer segments, recent announcements, and stated priorities;
- public evidence of operating activities from investor relations, annual reports, earnings material,
  leadership posts, or official press releases;
- current industry pressures and AI/automation trends from freely accessible industry bodies,
  analysts, or government sources.

Cite every company or industry claim with a URL and retrieval date. Mark unavailable facts with
⚠️ rather than guessing. Do not use account plans, CRM data, confidential material, or non-public
information.

### 2. Generate approximately ten ideas

Every idea must tie to the research, be safe enough for a first demonstration, and include:

| Field | Guidance |
|---|---|
| **Title** | Outcome-first, 4–8 words |
| **Description** | What improves, how the experience works, and the first tangible output |
| **Target user** | The role benefiting from the result |
| **Business outcome** | What becomes faster, safer, cheaper, or more reliable |
| **Scenario direction** | The track or tracks the idea draws on, plus any part no track covers |
| **First decision** | The scope or design question to resolve before planning the relevant sessions |
| **Effort** | `Starter`, `Core`, or `Stretch` |
| **Research fit** | Why the idea fits this customer, with citation |
| **Safe representative context** | Candidate documents, data product, approved content, or sample to use in a demonstration |
| **Evidence** | The routine, edge, refusal, review, or access case that proves the first outcome |

**Read every `scenarios/*/manifest.json` before labelling ideas.** Use each manifest's `name` as the
label and its `tagline` and `customer_outcome` to judge fit. A folder without a manifest is not a
supported track yet. The current tracks are:

| Scenario direction | Use when |
|---|---|
| **AI Grounding / IQ** | Trusted answers require the right mix of enterprise knowledge and operational context. This can include Foundry IQ, Fabric IQ, Work IQ, Web IQ, SharePoint, or a Copilot Studio discussion. |
| **Content Understanding and Document Workflow** | Business content needs SME-authored understanding, extraction, review, and handoff into a process. |
| **Avatar Scenario** | Approved learning, communications, onboarding, or support content needs an accessible, governed semi-automated avatar-led presentation. |
| **Operational Agents** | An agent must carry out bounded work in a business system, with validated tool calls, exact human approval, and recovery from interrupted operations. |

If a manifest exists for a track not in this table, use it the same way.

Visual input, structured data, evaluation, tracing, and deployment are capabilities, not
separate scenarios. Mention them only when the proposed proof needs them.

These tracks are starting points, not a complete catalog of customer use cases. One idea may draw on
several tracks, and a match for one part does not cover the whole use case. When a part has no
matching guidance, write `New pattern needed` and describe the gap.

### 3. Calibrate scope

| Effort | Meaning |
|---|---|
| `Starter` | A narrow demonstrator for one user and one customer decision: a safe sample, an explicit owner, and a small evidence set. |
| `Core` | A credible customer workshop or event-day proof: one bounded outcome, an evaluation/golden-data slice, and a clear review or operating decision. |
| `Stretch` | A follow-on proof requiring multiple systems, a richer integration, multiple interfaces, or a more mature operating model. State what is intentionally deferred. |

Apply these guardrails:

- Do not propose a generic chatbot, a broad autonomous workflow, or a production integration that
  cannot be shown safely.
- Do not assume that every idea needs RAG, a new landing zone, or a Foundry-only implementation.
- Do not use file counts as an architecture decision. Start with ownership, access, freshness,
  quality, and the evidence needed.
- Every idea needs an approved or synthetic representative sample. If customer data is not ready,
  name the gap and use a safe sample only for the conversation.

### 4. Produce the result

Return the following sections, in this order:

#### Part A — Research summary

Three to five sentences with inline citations and explicit coverage gaps.

#### Part B — Ranked summary

| # | Title | Effort | Scenario direction | Why it fits |
|---|---|---|---|---|
| 1 | … | Core | AI Grounding / IQ | … |

Rank by customer fit, achievable first proof, and what makes the idea distinct.

#### Part C — Idea details

Give all ten fields from step 2 for every idea.

#### Part D — Recommended top three

Name the top three and give a one-sentence reason for each.

#### Part E — Scenario handoff

For the top idea, pre-fill this handoff. Clearly mark information the customer must confirm.

| Scenario input | Pre-filled direction |
|---|---|
| Customer outcome | … |
| Target users and access boundary | … |
| Context and source owner | … |
| Existing environment | … |
| Ownership model | … |
| Relevant tracks and lessons | … |
| Golden-dataset / evidence starter | … |
| First customer decision | … |

Then map the top idea to modules by following the `use-case-mapper` skill
(`.github/skills/use-case-mapper/SKILL.md`), using the handoff above as its input. Include its
**Map**, **Build order and first slice**, and **Gaps and open questions** sections. The customer
must confirm the map before it becomes an agreed session plan.

End with the playbook URL for each matched track, `docs/scenario.html?id=<manifest id>`:

| Track | URL |
|---|---|
| AI Grounding / IQ | `docs/scenario.html?id=ai-grounding` |
| Content Understanding and Document Workflow | `docs/scenario.html?id=content-understanding-document-workflow` |
| Avatar Scenario | `docs/scenario.html?id=avatar-scenario` |
| Operational Agents | `docs/scenario.html?id=operational-agents` |

If a new pattern is needed, state that gap instead of inventing a playbook URL. Effort tags describe
the initial proof only; they do not estimate the full customer implementation.

## Anti-patterns

- Fabricating company facts or leaving research claims uncited.
- Treating the output as an approved architecture or a product recommendation.
- Prescribing Foundry, Copilot Studio, SharePoint, Fabric, or an IQ flavor before the customer’s
  data ownership, access, licensing, and operating constraints are discussed.
- Suggesting a landing zone, broad infrastructure baseline, or production deployment for a first
  demonstration.
- Omitting the customer owner, safe representative context, or first evidence case.
