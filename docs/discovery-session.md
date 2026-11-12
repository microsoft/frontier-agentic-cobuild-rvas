## Collect discovery evidence

Use this session when the idea is spread across several people or documents.
Get approval for recording, transcription, storage, and AI processing before
the call.

Capture the intended outcome, the first journey, decisions, and open questions.
A recording isn't an approval. Review the
[participant requirements](participant-requirements.html) and keep the
specialists you need within reach.

## Prepare the call

Before recording starts:

- say why you're recording and how the transcript will be used;
- agree who can access the files, where they're stored, and when they're deleted;
- ask participants not to share live secrets; and
- open the repository, diagrams, process records, and sample inputs.

If the customer can't approve recording or AI processing, take notes. The
questions are the same.

## Guide the discussion

Ask for concrete examples. What does "fast," "secure," or "automated" mean in
numbers?

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

Keep the first journey small. Note later journeys separately.

### 4. Information and evidence

- Which sources are needed, who owns them, and which is authoritative?
- How current are they, and what may each user see?
- Are citations or an audit trail required?
- What representative inputs can the team provide?

Business knowledge, conversation history, and long-term memory are different
things. Ask what the solution may keep, for how long, and who can correct or
delete it.

### 5. Systems and integrations

- Which systems and existing integrations are involved?
- Does the solution read only, or change a system of record?
- What identities and authentication methods apply?
- Who owns documentation, test access, and approval?

Write down names and owners. Don't guess at interfaces, credentials, or what a
product supports.

### 6. Agent behavior, actions, and approvals

- Where does choosing the next step add value, and which steps stay fixed?
- What may the solution propose or execute?
- Which actions require confirmation or business approval?
- What limits and failure behavior apply?

You may find that search, a single model call, or a fixed workflow fits better
than an agent. Capture the journey first. Architecture discovery will test the
execution model.

### 7. Identity, security, and data rules

- Who signs in, and does the solution act as the user or application?
- Which roles control access?
- What sensitive information and handling rules apply?
- Who approves the security and compliance design?

Record the customer's existing controls. The co-build should fit them, not
invent a parallel access model.

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

End by reading back the outcome, first journey, boundaries, decisions, and open
questions. Give every question that could block architecture or implementation
an owner.

## Capture a discovery brief

Write a short brief in the customer repository. Keep confirmed facts,
assumptions, and open questions apart, and note where each statement came from.

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

Leave gaps empty so AI Agent Creator asks about them. Don't fill them with guesses.

## Create the brief with WorkIQ

Use WorkIQ if the signed-in user can open the meeting in the customer's
Microsoft 365 environment. Tenant policy and permissions decide whether that works.

Provide the brief template above and identify the meeting:

```text
Find the customer discovery meeting titled [meeting title] held on [date].
Using only content available from that meeting, fill in the supplied discovery
brief template, including owners for open questions.

Keep confirmed statements separate from inference. Include timestamps or source
references where available. Do not invent missing details or treat the meeting
as architecture approval.
```

Check the result against the meeting, then save the corrected brief as
`docs/discovery/discovery-brief.md` if policy allows.

## Create the brief from a transcript

If WorkIQ isn't available, attach the approved transcript and the brief template
above:

```text
Read the attached customer discovery transcript and prepare
@docs/discovery/discovery-brief.md using the supplied discovery brief template.

Use only the transcript and attached customer documents as evidence. Separate
confirmed statements, assumptions, and open questions. Preserve conflicting
statements instead of choosing one silently. Add timestamps or speaker references
where available. Do not propose an architecture yet and do not treat the
transcript as customer approval.
```

Remove anything off-topic or restricted. Leave the original transcript where
it's approved to live.

## Start AI Agent Creator

Have the customer or product owner review the brief, and leave unresolved points
open. Then open the customer's application repository and give the brief to AI
Agent Creator:

```text
/agentic-cobuild:ai-agent-creator Use @docs/discovery/discovery-brief.md as discovery evidence
for the application we want to design. Inspect this repository and preserve its
existing constraints.

Treat confirmed facts, assumptions, and open questions differently. Ask about
anything needed to complete discovery. Do not treat the transcript or brief as
requirements approval. Present the shared-understanding record and wait for
explicit customer confirmation before architecture work begins.
```

The brief doesn't replace discovery confirmation, architecture review, or
package approval.
