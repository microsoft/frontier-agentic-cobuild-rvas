---
name: idea-forge
description: "Find a bounded AI opportunity from public customer and industry evidence when the team does not yet know what to build. Rank ideas and prepare an unapproved brief for AI Agent Creator."
argument-hint: "Company name and industry; optionally region, known pain points, or existing capabilities."
---

# Idea Forge

Use public evidence to help the user choose what to build. If the user already has
a bounded use case, recommend invoking `ai-agent-creator` with it and stop.
That routing branch is complete when the recommendation is given. Otherwise,
follow the research workflow below.

This is an intake workflow. Its brief is not an approved architecture or a delivery
commitment. Run in the user's application workspace; this skill requires no files
from the tooling repository.

## 1. Establish the research scope

Ask for the customer name and industry when missing. Accept optional region,
known pain points, and existing capabilities as user-provided context, not verified
public facts. Use the host's question form where available; otherwise ask directly
and wait.

## 2. Research public sources

Prefer company publications, annual reports, official announcements, and freely
accessible industry bodies or government sources. Research the customer's work,
stated priorities, and pressures that could justify a bounded AI capability.

Cite every customer or industry claim. Do not send private application files or
customer data to research services. Public
research is separate from permission to connect enterprise systems.

**Research gate:** Before ranking, every retained candidate must have a cited
customer or industry observation. Label the proposed opportunity as an inference
and unconfirmed pain or benefits as assumptions. Industry-only evidence supports
a customer-fit hypothesis. State any missing evidence.

If no candidate meets this bar, explain the research gap, ask for public sources
or a revised scope, and wait. Resume research after the user responds.

## 3. Propose and rank ideas

Propose 8-10 distinct ideas when evidence supports them. Return fewer and explain
why when it does not. Present one compact ranked table with these columns:

| Column | Required content |
| --- | --- |
| Rank | Position in the comparison |
| Idea and target user | A short, outcome-first name and the role that benefits |
| First proof | One bounded user journey and its first tangible output |
| Evidence and fit | The cited observation and the proposed opportunity, clearly distinguished |
| Effort | Starter, Core, or Stretch for the first proof only |
| Key uncertainty | The assumption or scope/access decision that most affects feasibility |

Rank by customer fit and an achievable first proof. Explain what makes each idea
distinct. Suggest deterministic automation when AI adds no useful responsibility.
Do not prescribe a platform, new UI, grounding approach, or autonomous execution
before architecture discovery establishes the need.

`Starter` means one narrow user journey with a small evidence set. `Core` adds
integration or a richer evaluation slice. `Stretch` needs broader dependencies;
name what must be deferred. These labels are not full implementation estimates.

## 4. Let the user select

Return a short cited research summary and the table from step 3. Recommend the
strongest candidate and explain its fit. Ask the user to choose an idea, request
shortlist details, or revise the direction, then wait. A ranking is not the user's
approval.

If the user requests more detail, expand only the named candidates using the
field table in step 5. Label these as candidate details and keep selection
pending. Ask the user to select or revise, then wait.

## 5. Hand off the selected idea

After the user selects an idea, prepare a brief in the conversation labelled
**Unapproved idea brief**:

| Brief field | Content |
| --- | --- |
| Intended outcome and user | The task, its beneficiary, and proposed observable improvement |
| Evidence | Cited observations distinguished from inference; label user-provided context and assumptions |
| First journey | What the user does and the first tangible output |
| Data and systems | Known capabilities and sources to reuse, owners, and unknown access boundaries |
| Existing environment | Facts supplied by the user; otherwise unknown |
| Constraints | Known safety, operating, and delivery constraints |
| Safe representative input | Approved or synthetic context for an initial check; state access gaps |
| Acceptance starter | A routine case and a relevant failure, refusal, or access check for discovery to refine |
| Open questions | The first scope decision and assumptions the customer must confirm |

Tell the user to invoke `ai-agent-creator` with this brief in their application
repository. Do not invoke it automatically, select an architecture, or create
implementation work. The creator owns discovery confirmation and architecture
approval.

The research workflow is complete when the user has selected an idea and received
the unapproved brief with every field above addressed. Mark unknowns explicitly.
