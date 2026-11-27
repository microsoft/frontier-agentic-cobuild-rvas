---
name: idea-forge
description: "Research a customer's business, industry, and public priorities on the web when the team needs AI opportunity ideas. Propose internal and external agentic-application ideas by complexity, each as a business-case chapter, and prepare the selected idea's unapproved brief for Azure Solution Architect."
argument-hint: "Company name and industry; optionally region, known pain points, or existing capabilities."
---

# Idea Forge

Use public evidence to help the user choose what to build. If the user already has
a bounded use case, recommend invoking `azure-solution-architect` with it and stop.
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

Proceed when the customer and industry are identified. Resolve ambiguous company
names before researching.

## 2. Research public sources

Use internet search and read the underlying sources; search snippets alone are
not evidence. If browsing is unavailable, report the blocker and wait for access
or user-supplied public source content.

Build a cited research summary covering:

- **Business:** What the customer sells or delivers, whom it serves, and how it operates.
- **Industry:** Relevant market pressures and operating constraints.
- **Publicly stated priorities:** Goals or commitments the company or its leadership has stated.

Prioritize the customer's investor relations and stakeholder publications,
annual reports, earnings materials, and leadership statements. Use credible
articles and freely accessible industry bodies or government sources for context.
Check for newer statements before treating an older priority as current. Record
publication dates where available and explain material conflicts between sources.
Mark missing public evidence explicitly.

Cite every customer or industry claim. Do not send private application files or
customer data to research services. Public research is separate from permission
to connect enterprise systems.

**Research gate:** Before ranking, every retained candidate must have a cited
customer or industry observation and an explicit connection to the proposed AI
capability. Distinguish company-stated priorities from industry pressures. Label
the proposed opportunity as an inference and unconfirmed pain or benefits as
assumptions. Industry-only evidence supports a customer-fit hypothesis.
Treat benefits as hypotheses to measure; do not invent customer metrics or ROI.

If no candidate meets this bar, explain the research gap, ask for public sources
or a revised scope, and wait. Resume research after the user responds.

## 3. Propose and rank ideas

Every idea is an **agentic application**: software where an agent reasons over a
goal, chooses among tools or data sources, and takes or prepares multi-step actions
for a business user, customer, or partner. Apply the **agent test** to each
candidate: the value comes from the agent deciding what to do next, not from
a fixed sequence or a single model call. Drop candidates that fail it:

- Developer-workflow ideas (code generation, review, tests, migration, docs for the customer's engineers) that GitHub Copilot already serves.
- Deterministic automation, reporting, or rules. Recommend these separately, outside the idea count.
- Chat over documents with no decisions, tool use, or action.

Classify each idea by its primary beneficiary: **Internal** (employees or internal
operations) or **External** (customers, partners, other external users). Place a
cross-audience idea in its primary group and name the secondary beneficiary.

Target five distinct ideas per audience: **two Simple, two Medium, and one
Complex**. These are per-audience caps, not quotas. Return fewer when the research
gate cannot support the mix, and explain which complexity slots are unsupported
and what evidence is missing. Rank within each audience by customer fit and an
achievable first proof.

Classify the proposed bounded capability, not just its demonstration:

- **Simple:** One narrow task with limited data dependencies and low operating risk; no substantial integration.
- **Medium:** Requires system integration or coordination across data sources, with bounded actions and review needs.
- **Complex:** Requires broader workflow coordination, substantial data or system dependencies, or high-impact actions needing stronger controls.

Use the highest complexity warranted by the dependencies or risk, and name the
driver. Labels are relative scope, not delivery estimates. A small first proof can
test a Complex idea; name what it defers. Leave platform, UI, grounding, and
autonomous-execution decisions to architecture discovery.

### Output shape

Open with the cited research summary, then a one-row-per-idea **overview table**
for each audience (Rank, Idea, Target user, Complexity). Then give **each idea its
own chapter**, grouped by audience and ordered by rank:

```markdown
### <Rank>. <Outcome-first idea name> (<Internal|External>, <Simple|Medium|Complex>)

<Business description, always three short paragraphs separated by blank lines:
1. Who has the problem and what it costs them today, tied to the cited observation.
2. What the agent does, as a sequence a sponsor could picture.
3. How the work changes, and what stays with a person.>

- **Target user:** role that benefits
- **Business outcome (hypothesis):** observable improvement to measure
- **Why an agent:** the decisions, tools or sources, and actions that fail the "fixed sequence" test
- **First proof:** one bounded journey and its first tangible output
- **Evidence and fit:** cited observation, then the inferred opportunity
- **Complexity:** label and the dependency or risk driving it
- **Key uncertainty:** the assumption or access decision that most affects feasibility
```

Write the description as connected prose, not a restated bullet list; the bullets
carry the checkable facts. Make each idea distinct in beneficiary or workflow, and
state what separates it from its neighbours.

**Proposal gate:** Every retained idea passes the research gate and the agent test,
has a prose description and every bullet addressed, and differs from the others.
Check each audience against the 2/2/1 mix and explain every unsupported slot before
asking the user to select.

## 4. Let the user select

Recommend the strongest candidate overall and explain its fit. Ask the user to
choose an idea, request deeper detail on named candidates, or revise the direction,
then wait. A ranking is not the user's approval.

If the user requests more detail, expand only the named chapters using the fields
in step 5. Label these as candidate details and keep selection pending.

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

Tell the user to invoke `azure-solution-architect` with this brief in their application
repository. Do not invoke it automatically, select an architecture, or create
implementation work. The creator owns discovery confirmation and architecture
approval.

The research workflow is complete when the user has selected an idea and received
the unapproved brief with every field above addressed. Mark unknowns explicitly.
