## Choose the execution model from the task

**An AI application does not always need an agent loop.** The creator compares
execution models against the actual user journey before selecting a runtime.
Calling something an assistant or copilot leaves that decision open.

Use a maintenance request as an illustrative example. The intended outcome is
to help a property manager handle it correctly. Different requirements lead
to different designs.

## Four ways to handle the same request

### Fixed rules

The request already contains a category and location. Known rules assign the
correct queue and flag urgent cases. The inputs and sequence are defined.

Keep this deterministic when exact rules are enough. A model should not replace
an authoritative rule merely to make the application sound agentic.

### One bounded model call

A resident supplies free text. A model summarizes it into a defined response
schema for the manager to review. The application supplies the context and
controls what happens next.

This can be useful AI without runtime planning. Validate the output and define
how uncertainty or malformed results reach a reviewer.

### Retrieval or an explicit workflow

The application retrieves the relevant procedure, prepares a draft, and asks
the manager for approval in a known sequence. The workflow defines branches and
state transitions.

Retrieval does not automatically make the process agentic. When the path is
known, explicit orchestration may meet the requirement. Approval and retries
still need an owner.

### An agent with bounded tools

The manager asks why the request keeps recurring. The system decides which
authorized history or procedure to inspect next, preserves its findings, and
changes the investigation when the manager asks a follow-up.

Here, choosing the next evidence source is part of the work. The agent may
propose a work order, but authority to submit it remains a separate decision.
A read-only investigator can still be an agent.

Microsoft's [agent design guidance](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
distinguishes direct model calls from agents with tools and multi-agent
orchestration. More complex arrangements add coordination costs and failure modes.

<!-- diagram: runtime-choice -->

## Test where runtime choice adds value

Bring these questions to discovery:

| Question | Design consequence |
| --- | --- |
| Must the system decide how to pursue a goal? | Compare runtime planning with a predefined sequence. |
| Must it choose which source or tool to use next? | Define the permitted choices and selection evidence. |
| Does an investigation continue across turns or pauses? | Specify what state must persist and who owns it. |
| Can a follow-up change the evidence or operation needed? | Evaluate the whole conversation, not only its first response. |
| Can it propose or execute a business action? | Separate recommendation from authorization and approval. |

Avoid narrowing the journey just to make a simpler architecture fit. A form,
prepared evidence packet, or stateless response should be an agreed scope choice.
If the user needs an open investigation, compare that requirement honestly.

## Bound the agent's responsibility

If runtime choice earns its place, specify its limits. Name the permitted tools
and the evidence each can access. Set a stopping condition and resource limits.
Define how unresolved work reaches a human.

Decide what the system may recommend and what it may execute. For an action,
identify the caller's authority, required approval, and duplicate-operation
protection. Retrieved content is evidence, not permission to take an action.

Evaluate routine and failure cases against the same requirements. Include a
request outside the allowed scope and a case where evidence is insufficient.

## Use multiple agents only for a reason

Separate agents may be justified by distinct access boundaries or specialist
responsibilities. Start by describing what a single agent cannot do adequately.
Then define what each specialist owns and how disagreement is resolved.

A sequence of prompts alone does not prove that several autonomous agents are
needed. The creator's job is to compare meaningful options, not maximize agent
count.

## Bring the comparison to discovery

You do not need to settle this before installing the plugin:

```text
Help us design a maintenance-request investigation capability. Compare fixed
rules, a bounded model call, an explicit retrieval workflow, and an agent.
Preserve the user's need to ask follow-up questions. Explain which runtime
choices add value and which actions still require human approval.
```

[Start in your repository](start.html). Once the behavior is clear,
[choose an architecture that fits](architecture-options.html).
