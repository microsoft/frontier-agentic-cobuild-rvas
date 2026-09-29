---
name: customer-activity-forge
description: "Find a bounded AI opportunity when a customer or industry is known but no use case is defined. Research public sources, rank ideas against scenario playbooks, and expose gaps."
argument-hint: "Company name and industry are required. Optional: region/segment and known pain points."
---

## Start

Use `use-case-mapper` when the team already has a bounded use case. Otherwise, identify a bounded
AI opportunity from public customer and industry research.

This is an intake tool, not an architecture approval or delivery commitment.

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

Search public sources and retrieve the relevant pages to collect:

- the company’s products, services, customer segments, recent announcements, and stated priorities;
- public evidence of operating activities from investor relations, annual reports, earnings material,
  leadership posts, or official press releases;
- current industry pressures and AI/automation trends from freely accessible industry bodies,
  analysts, or government sources.

Cite every company or industry claim with a source link. Mark unavailable facts with ⚠️ rather than
guessing. Use public sources only.

### 2. Generate 8–10 ideas

Every idea must have a distinct cited research fit and be safe enough for a first demonstration. If
the available evidence supports fewer than eight distinct ideas, return fewer and explain why. Each
idea includes:

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

**Read every `scenarios/*/manifest.json` before labelling ideas.** For every idea, compare its
need with every current manifest. Use each manifest's `name` as the label and its `tagline` and
`customer_outcome` to judge fit. A folder without a manifest is not a supported track yet.

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

For the highest-ranked idea, pre-fill this handoff. Clearly mark information the customer must
confirm.

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

Then map the highest-ranked idea to modules by following the `use-case-mapper` skill
(`.github/skills/use-case-mapper/SKILL.md`), using the handoff above as its input. Include its
**Map**, **Build order and first slice**, and **Gaps and open questions** sections. The customer
must confirm the map before it becomes an agreed session plan.

End with `docs/scenario.html?id=<manifest id>` for every matched track. Build each URL from its
manifest ID. If a new pattern is needed, state that gap instead of inventing a playbook URL. Effort
tags describe the initial proof only; they do not estimate the full customer implementation.

## Anti-patterns

- Fabricating company facts or leaving research claims uncited.
- Treating the output as an approved architecture or a product recommendation.
- Prescribing Foundry, Copilot Studio, SharePoint, Fabric, or an IQ flavor before the customer’s
  data ownership, access, licensing, and operating constraints are discussed.
- Suggesting a landing zone, broad infrastructure baseline, or production deployment for a first
  demonstration.
- Omitting the customer owner, safe representative context, or first evidence case.
