## Use the session to collect evidence

Use this session when the idea is spread across people or documents. Get approval
for recording, transcription, storage, and AI processing before the call.

Capture the intended outcome, first journey, decisions, and open questions. The
record is evidence, not approval or authorization. Review the
[participant requirements](participant-requirements.html) and keep the needed
specialists reachable.

## Prepare the call

Before recording starts:

- state the purpose and how the transcript will be used;
- agree who can access the files, where they are stored, and when they are deleted;
- tell participants not to share live secrets; and
- open the approved repository, diagrams, process records, and sample inputs.

If the customer cannot approve recording or AI processing, take structured notes
instead. The same question set still applies.

## Guide the discussion

Use these topics as a route, not a script. Ask for concrete examples and measurable
meaning behind words such as "fast," "secure," or "automated."

### 1. Outcome and reason for change

- What problem should change, for whom, and why now?
- What result would make the work worthwhile?
- Is this a new application or a change to an existing one?
- What is outside scope?

### 2. Users and current process

- Who starts, participates in, and owns the process?
- Walk through one recent case from start to finish.
- Where do people wait, repeat work, search, or correct errors?
- What already works and should remain unchanged?

### 3. First user journey

- What starts the journey, and what context is available?
- What should the application investigate, produce, recommend, or do?
- What requires review or approval?
- What marks completion, and what happens when evidence is insufficient or unsafe?

Keep the first journey bounded. Capture later journeys separately instead of
combining every possible use case into the initial design.

### 4. Information and evidence

- Which sources are needed, who owns them, and which is authoritative?
- How current are they, and what may each user see?
- Are citations or an audit trail required?
- What representative inputs can the team provide?

Distinguish business knowledge from conversation history and long-term memory.
Ask what the solution may retain, for how long, and who can delete or correct it.

### 5. Systems and integrations

- Which systems and existing integrations are involved?
- Does the solution read only, or change a system of record?
- What identities and authentication methods apply?
- Who owns documentation, test access, and approval?

Record names and owners. Do not guess interfaces, credentials, or product support
from the conversation.

### 6. Agent behavior, actions, and approvals

- Where does choosing the next step add value, and which steps stay fixed?
- What may the solution propose or execute?
- Which actions require confirmation or business approval?
- What limits and failure behavior apply?

The session may reveal that a search experience, model call, or fixed workflow
fits better than an agent. Capture the journey first and let architecture discovery
test the execution model.

### 7. Identity, security, and data rules

- Who signs in, and does the solution act as the user or application?
- Which roles control access?
- What sensitive information and handling rules apply?
- Who approves the security and compliance design?

Capture the customer's existing controls. The co-build should fit them rather
than invent a parallel access model.

### 8. Experience and channels

- Where should the user encounter the capability?
- Is a new interface needed?
- How does the user understand, correct, cancel, or escalate?
- Which language, device, or accessibility needs apply?

### 9. Operating expectations

- What volume and response time matter?
- What availability, recovery, and support expectations apply?
- Which quality, safety, and telemetry checks are allowed?
- What cost, region, model, or capacity limits apply?

Use ranges when exact numbers are unavailable. Mark estimates as assumptions.

### 10. Delivery and ownership

- Which repository, environments, and delivery path will the team use?
- Which landing-zone and policy rules apply?
- Who approves access, architecture, resources, and deployment?
- Who owns the solution, and what evidence supports acceptance?

End by reading back the intended outcome, first journey, boundaries, decisions,
and open questions. Assign an owner to every question that could block architecture
or implementation.

## Capture a discovery brief

Create a short, traceable brief in the customer repository. Separate confirmed
facts, assumptions, and open questions.

Use this structure:

```markdown
# Discovery brief

## Session
- Customer:
- Date:
- Participants and roles:
- Recording or transcript location:
- Facilitator:

## Intended outcome

## Users and current process

## First user journey
1.

## Scope and non-goals

## Inputs, outputs, and evidence

## Systems, sources, and owners

## Actions, limits, and approvals

## Identity, security, and data rules

## Experience and operating expectations

## Existing application and delivery constraints

## Success evidence

## Confirmed decisions

## Assumptions to validate

## Open questions
| Question | Owner | Needed by | Effect if unresolved |
| --- | --- | --- | --- |

## Source references
| Statement or decision | Source | Timestamp or section |
| --- | --- | --- |
```

Do not fill gaps with plausible answers. Leave them visible for AI Agent Creator
to ask about.

## Create the brief with WorkIQ

Use WorkIQ when the signed-in user can access the meeting through the customer's
Microsoft 365 environment. Availability depends on tenant policy and permissions.

Ask WorkIQ to create the brief from one clearly identified meeting:

```text
Find the customer discovery meeting titled [meeting title] held on [date].
Using only content available from that meeting, prepare a discovery brief with:
the intended outcome; users and current process; the first user journey; scope
and non-goals; inputs and outputs; systems, data sources, and owners; actions,
limits, and approvals; identity, security, and data constraints; experience and
operating expectations; delivery constraints; success evidence; confirmed
decisions; assumptions; and open questions with owners.

Keep confirmed statements separate from inference. Include timestamps or source
references where available. Do not invent missing details or treat the meeting
as architecture approval.
```

Check the result against the meeting, then save the corrected brief as
`docs/discovery/discovery-brief.md` when policy allows.

## Create the brief from a transcript

If WorkIQ is unavailable, attach the approved transcript and ask:

```text
Read the attached customer discovery transcript and prepare
@docs/discovery/discovery-brief.md with these sections:

- Session: customer, date, participants and roles, transcript location, facilitator
- Intended outcome
- Users and current process
- First user journey
- Scope and non-goals
- Inputs, outputs, and evidence
- Systems, sources, and owners
- Actions, limits, and approvals
- Identity, security, and data rules
- Experience and operating expectations
- Existing application and delivery constraints
- Success evidence
- Confirmed decisions
- Assumptions to validate
- Open questions, with owner, needed-by date, and effect if unresolved
- Source references, with transcript timestamps or document sections

Use only the transcript and attached customer documents as evidence. Separate
confirmed statements, assumptions, and open questions. Preserve conflicting
statements instead of choosing one silently. Add timestamps or speaker references
where available. Do not propose an architecture yet and do not treat the
transcript as customer approval.
```

Remove off-topic or restricted content. Keep the original transcript in its
approved location.

## Start AI Agent Creator

Have the customer or product owner review the brief. Keep unresolved points open.

From the customer application repository, invoke AI Agent Creator with the brief:

```text
/ai-agent-creator Use @docs/discovery/discovery-brief.md as discovery evidence
for the application we want to design. Inspect this repository and preserve its
existing constraints.

Treat confirmed facts, assumptions, and open questions differently. Ask about
anything needed to complete discovery. Do not treat the transcript or brief as
requirements approval. Present the shared-understanding record and wait for
explicit customer confirmation before architecture work begins.
```

The brief accelerates discovery. It does not replace confirmation, architecture
review, or package approval.
