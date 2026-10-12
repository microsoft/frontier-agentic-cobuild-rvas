## Use the session to collect evidence

Run an initial discussion with the customer before starting AI Agent Creator when
the idea is still spread across several people or documents. Record the session
only after the customer confirms that recording, transcription, storage, and AI
processing follow its policy.

The facilitator's job is to make the intended outcome and first user journey
clear enough for structured discovery. The recording or transcript is evidence.
It is not an approved requirement, architecture decision, or authorization to
access customer systems.

Review the [participant requirements](participant-requirements.html) before the
call. Invite the business participant and product owner. Arrange for technical
specialists to join or remain reachable when identity, networking, data, or
deployment questions arise.

## Prepare the call

Before recording starts:

- state the purpose of the session and how the transcript will be used;
- confirm who may access the recording, transcript, and generated discovery brief;
- agree where those files will be stored and when they should be deleted;
- ask participants not to share passwords, access tokens, private keys, or other
  live secrets;
- have a facilitator lead the discussion and a second person watch for unanswered
  questions when possible; and
- open the customer repository, existing diagrams, process documents, and sample
  inputs that participants are allowed to discuss.

If the customer cannot approve recording or AI processing, take structured notes
instead. The same question set still applies.

## Guide the discussion

Use the topics below as a route through the conversation, not as a questionnaire
that must be read word for word. Follow concrete examples. When someone says the
solution should be "fast," "secure," or "automated," ask what that means in the
customer's process.

### 1. Outcome and reason for change

- What problem should this solution solve, and why address it now?
- Who feels the problem today? What happens if nothing changes?
- What business result would make the co-build worthwhile?
- Is the customer creating a new application or changing an existing one?
- Which ideas are explicitly outside this effort?

### 2. Users and current process

- Who starts the process, who participates, and who owns the final result?
- Walk through one recent, representative case from beginning to end.
- Where do people wait, repeat work, search for information, or correct errors?
- Which decisions require expertise or judgment?
- What work already functions well and should remain unchanged?

### 3. First user journey

- What event starts the journey?
- What does the user provide, and what context is already available?
- What should the application investigate, produce, recommend, or do?
- What must the user review or approve?
- What marks the journey as complete?
- How should the application respond when information is missing, conflicting,
  unsafe, or outside scope?

Keep the first journey bounded. Capture later journeys separately instead of
combining every possible use case into the initial design.

### 4. Information and evidence

- Which sources contain the information needed for the journey?
- Which source is authoritative when records disagree?
- Who owns each source, and how does it stay current?
- What may each user see? Do source permissions need to carry into the answer?
- Are citations, source links, or an audit trail required?
- What representative documents, records, or sample payloads can the team provide?

Distinguish business knowledge from conversation history and long-term memory.
Ask what the solution may retain, for how long, and who can delete or correct it.

### 5. Systems and integrations

- Which applications, APIs, databases, SharePoint sites, queues, or document
  stores are involved?
- Which integrations already exist and should be reused?
- Does the solution only read information, or can it change a system of record?
- What identities and authentication methods do those systems use?
- Is a non-production endpoint available for implementation and testing?
- Who owns access approval and technical documentation for each integration?

Record names and owners. Do not guess interfaces, credentials, or product support
from the conversation.

### 6. Agent behavior, actions, and approvals

- Where would planning or choosing the next step add value?
- Which steps are fixed business rules and should remain deterministic?
- What actions may the solution propose? Which may it execute?
- Which actions need user confirmation or a separate business approval?
- What limits apply to amount, frequency, destination, or affected records?
- What happens after a timeout, partial failure, duplicate request, or rejected
  approval?

The session may reveal that a search experience, model call, or fixed workflow
fits better than an agent. Capture the journey first and let architecture discovery
test the execution model.

### 7. Identity, security, and data rules

- Who signs in, and should the solution act as the user or as an application?
- Which roles or groups control access?
- What sensitive, personal, regulated, or confidential information may appear?
- Are there residency, retention, encryption, audit, or private-network rules?
- What content must never be sent to a model or external service?
- Which security or compliance owner must approve the design?

Capture the customer's existing controls. The co-build should fit them rather
than invent a parallel access model.

### 8. Experience and channels

- Where should the user encounter the capability: an existing application, web
  interface, Teams, voice channel, background process, or another surface?
- Does the user need a conversation, a form, a notification, or no new interface?
- What must the experience explain before a user trusts the result?
- How can a user correct an answer, cancel an action, or reach a person?
- Which languages, devices, or accessibility needs affect the design?

### 9. Operating expectations

- How many users, requests, documents, or events should the solution handle?
- Which response times matter to the user? Can any work run asynchronously?
- What availability, recovery, and support expectations already apply?
- What quality or safety checks will run before release and after changes?
- What telemetry may the operating team collect?
- Are there cost limits, approved regions, model restrictions, or capacity concerns?

Use ranges when exact numbers are unavailable. Mark estimates as assumptions.

### 10. Delivery and ownership

- Which repository, branching rules, and CI/CD path will the team use?
- Where will development, test, and production resources run?
- Which Azure landing-zone, naming, tagging, and policy rules apply?
- Who can approve architecture, data access, resource creation, and deployment?
- Who owns the solution after the co-build?
- What evidence will show that the first journey works well enough to accept?

End by reading back the intended outcome, first journey, boundaries, decisions,
and open questions. Assign an owner to every question that could block architecture
or implementation.

## Capture a discovery brief

Turn the session into a short brief in the customer repository. Keep statements
traceable to the transcript, notes, or customer documents. Separate what the
customer confirmed from facilitator interpretation.

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

Use WorkIQ when the meeting and its transcript or notes are available to the
signed-in user through the customer's Microsoft 365 environment. WorkIQ can
synthesize meeting content the user is allowed to access. Availability still
depends on tenant configuration, policy, and the connected user's permissions.

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

Review the result against the meeting evidence. Save the corrected brief in the
customer repository, for example as `docs/discovery/discovery-brief.md`. Do not
copy information into the repository if its classification or retention policy
does not allow it.

## Create the brief from a transcript

If WorkIQ is unavailable, export the approved transcript or attach it directly
to the working session. Ask the assistant:

```text
Read the attached customer discovery transcript and prepare
@docs/discovery/discovery-brief.md using the discovery brief structure in the
Agentic Co-build discovery-session guide.

Use only the transcript and attached customer documents as evidence. Separate
confirmed statements, assumptions, and open questions. Preserve conflicting
statements instead of choosing one silently. Add timestamps or speaker references
where available. Do not propose an architecture yet and do not treat the
transcript as customer approval.
```

Remove off-topic conversation and redact content that the repository should not
retain. Keep the original transcript in its approved location rather than
committing it by default.

## Start AI Agent Creator

The customer or product owner should review the discovery brief before handoff.
Corrections belong in the brief. Unresolved points should stay marked as open.

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

AI Agent Creator may reopen topics from the recorded discussion. That is expected.
The brief accelerates discovery; it does not remove the creator's confirmation
gate, architecture review, or final package approval.
