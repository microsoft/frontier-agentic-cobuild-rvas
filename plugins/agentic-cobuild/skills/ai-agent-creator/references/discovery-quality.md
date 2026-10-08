# Discovery quality contract

Read before the first discovery question. This contract owns the frontier,
decision statuses, boundary ladder, and shared-understanding record. Ask
questions and present summaries using the [Voice](../SKILL.md#voice) section.

## Frontier

The **frontier** contains unresolved architecture-changing decisions whose
prerequisites are settled. Investigate available repository/environmental facts
first, then ask the whole answerable frontier in one recommended round and wait.
Questions depending on an unsettled answer belong to a later round; confirmed
choices and discovered facts need no repeat interview.

Start the design tree from:

- outcome and observable business result;
- primary actor and first end-to-end journey;
- available platform capabilities, experience/channel, and their ownership;
- inputs, outputs, integrations, and systems of record;
- AI responsibility and deterministic responsibility;
- knowledge access and evidence provenance;
- action risk, approvals, and failure impact;
- success measures and evaluation evidence;
- scale, latency, budget, schedule, and stack constraints;
- enterprise identity, network, security, operations, and delivery context.

The frontier is empty only when each branch is answered, discovered, or explicitly
deferred with an owner, decision point, and architectural impact.

## Technical decision ownership

Distinguish **technical constraints** from **technical choices**. "No imposed
stack" or "no preference" removes a constraint; it does not approve a proposed
stack or delegate its selection.

For architecture-changing choices not settled by repository evidence or earlier
answers, include them in the current frontier. Cover platform and channel before
dependent runtime/framework, hosting, persistence, identity, and integration
boundaries as their prerequisites resolve, not as a fixed questionnaire. Preserve
discovered enterprise standards and existing application choices; ask about
deviations rather than repeat facts.

### Target-architecture proposal

When the journey, enterprise starting point, channel needs, and material
constraints are sufficient, research and present a **target-architecture
question**. Offer two to four coherent compositions rather than isolated product
choices:

- put the recommended composition first and explain why it fits;
- include at least one meaningful alternative with its trade-off;
- include a visible **custom architecture** option so the user can state the
  platform, channel, runtime, services, or boundaries they already have in mind;
- when the question form supports a default, default to the recommended concrete
  composition, never to delegation or "no preference";
- describe each option at the level currently answerable: channel/caller,
  execution model, platform/runtime, model-inference boundary, knowledge and
  tools, durable state/approvals, hosting, and responsibility ownership;
- verify current product facts before using them to recommend an option.

If evidence invalidates one composition, reopen only the affected choices and
recompute the viable sibling compositions. A limitation in one execution recipe
does not establish the same limitation in another recipe on the same platform.
For example, a prompt-agent channel or identity gap is not evidence that custom
code running as a Foundry Hosted Agent has the same gap.

Do not use a generic statement such as "delegate the architecture selection to
me" as the routine recommendation or default answer. It hides the decision the
user needs to make. If the user explicitly asks the architect to choose, treat
that as permission to research and return with a concrete recommended
composition. Then ask the user to confirm it or provide a custom composition.
Delegation alone does not close the target-architecture frontier.

Record each material choice as one of:

- **Confirmed:** the selected option and its reason.
- **Delegated subchoice:** the user's explicit scope for a lower-level choice;
  compare options and record the resulting selection and reason in the
  architecture package.
- **Deferred:** the owner, decision point, and architectural impact accepted by
  the user.

A delegation may cover only part of the design. Resolve choices outside its scope
through subsequent frontier rounds. Technical delegation permits architecture
selection within that scope, not implementation or provisioning. The top-level
target architecture must be confirmed through a proposal question or explicitly
deferred with an owner and impact; it cannot remain an abstract delegation.
Exact package versions and sizing may remain implementation-time compatibility
checks when they do not change the architectural boundaries.

## Platform and channel selection

Use the [selection matrix](azure-patterns/runtimes/README.md) to compare platform
and channel independently from the boundary ladder. Investigate reusable
capabilities from available evidence; ask about material gaps in the current
frontier rather than treating repository contents as the entire enterprise estate.

Resolve platform, channel, and ownership under the matrix's selection contract
before dependent web-framework choices. Preserve explicit custom requirements.
These decisions use the existing shared-understanding gate.

## Agent-intent test

Words such as *agent*, *copilot*, and *assistant* express product intent. They do
not settle the execution model. Compare every rung of the **boundary ladder** when
those words appear:

| Boundary | Fits when | Evidence to seek |
| --- | --- | --- |
| Deterministic code | Rules and sequence are known and reproducible | Fixed inputs, fixed steps, exact outputs |
| Direct model call | One bounded interpretation or generation step adds value | Prepared context, one response contract, no runtime choices |
| Retrieval or explicit workflow | Sources or steps vary, but orchestration is explicitly defined in code or a platform | Known branches, explicit state transitions, deterministic routing |
| Agent | The journey benefits from runtime planning or tool/source selection | Goal-directed investigation, dynamic next steps, tool choice, conversational state, or bounded actions |

Test the candidate journey for:

1. **Planning:** must the system decide how to pursue a goal rather than execute a
   predefined sequence?
2. **Tool or source selection:** must it choose which authorized evidence source,
   calculation, retrieval path, or business operation to use next?
3. **Investigation state:** must it preserve findings, hypotheses, missing evidence,
   and next steps across turns or pauses?
4. **Follow-up:** can the user's next question change which evidence or operation is
   needed?
5. **Actions:** may it propose or execute consequential operations, and where does
   approval occur?

Evaluate the whole journey: an agent can be read-only or human-supervised, and
its deterministic tools do not make planning or tool selection deterministic.

## Assumption trap

A fixed journey must be confirmed, not manufactured. Reopen the frontier when the
proposed journey became fixed because the design already chose:

- a form instead of a goal-oriented conversation;
- a prepared evidence packet instead of dynamic evidence selection;
- one model response instead of a multi-step investigation;
- stateless requests instead of investigation continuity;
- a report download instead of the business outcome named by the user.

Confirm these choices with the user before treating the narrowed journey as scope.

## Shared-understanding gate

When the frontier is empty, summarize:

```text
Problem:
Primary user:
First journey:
AI boundary:
Execution-model comparison:
Platform and channel:
Target architecture:
Custom choices and delegated subchoices:
Data and knowledge:
Success measures:
Constraints:
Enterprise starting point:
Assumptions:
Explicit deferrals and impact:
```

Ask the user to confirm the record and end the turn. Architecture becomes eligible
only when a later user turn explicitly confirms it. The original request, silence,
batch execution, or the accelerator's own confidence cannot cross this gate.
After confirmation, use the record as the
[specification baseline](specification-quality.md). Keep unresolved decisions
in the frontier or accepted deferrals rather than synthesizing them as facts.

## Completion criterion

Discovery is complete when:

- every design-tree branch is resolved or explicitly deferred;
- the target architecture was proposed as concrete compositions and then
  confirmed, customized, or explicitly deferred;
- lower-level technical choices are confirmed, explicitly delegated, or deferred
  under the technical decision ownership contract;
- platform and channel are resolved independently of the execution model, and
  custom components have a confirmed requirement or documented capability gap;
- repository facts were investigated rather than asked of the user;
- domain terms are recorded as they resolve;
- the boundary ladder is compared against the actual first journey;
- agent-intent prompts receive the full agent-intent test;
- the shared-understanding record contains no hidden execution-model assumption;
- a later user turn explicitly confirms the record.
