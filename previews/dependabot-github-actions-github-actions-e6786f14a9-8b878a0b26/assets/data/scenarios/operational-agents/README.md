# Operational Agents: carry out bounded work

Build an agent that performs a scoped task in **your tenant** with approved tools
and an exact human decision before any write. Retain evidence when execution is
interrupted. Bring one business operation and its destination-system owner.

The application code controls tool execution and task progress. It enforces
approval and stores recovery state. The model may request a tool call; it
cannot authorize a write.

## The eight modules

| Module | You decide | Outcome |
|---|---|---|
| [1. Task boundary](lesson.html?scenario=operational-agents&lesson=task-boundary) | What may the agent attempt? | Scope violations stop without effects. |
| [2. Foundation](lesson.html?scenario=operational-agents&lesson=foundation) | Where does the customer application run? | Runtime access to the required services. |
| [3. Tool contracts](lesson.html?scenario=operational-agents&lesson=tool-contracts) | What does each operation accept and prove? | Typed requests and conditional updates. |
| [4. Task state](lesson.html?scenario=operational-agents&lesson=task-state) | What must survive a process restart? | Reloadable progress and pending approval. |
| [5. Bounded execution](lesson.html?scenario=operational-agents&lesson=bounded-execution) | What limits stop the loop? | Budgets that persist across resume. |
| [6. Approval](lesson.html?scenario=operational-agents&lesson=approval) | Who approves which exact change? | A decision bound to the proposal and record version. |
| [7. Recovery](lesson.html?scenario=operational-agents&lesson=recovery) | Did an interrupted operation commit? | Reconciliation without blind write retries. |
| [8. Evaluate and operate](lesson.html?scenario=operational-agents&lesson=evaluate-operate) | Does the delivered task meet the agreed scope? | Tenant acceptance and operating handoff. |

## Choose this track when execution is the difficult part

Use AI Grounding for trusted answers over approved content. Use Content
Understanding when document extraction and review drive the workflow.
Operational Agents fits tasks where several tool calls and their effects must
stay controlled across failure or interruption. A customer can combine these
patterns.

**Start with one agent and a narrow operation set.** Add distributed execution
only when the task requires it. The guided path does not require persistent
personal memory, a multi-agent framework, or a new approval UI.

## Define the tenant work

Choose one task, such as inspecting a service request and proposing a permitted
status change. Agree on its record scope and acceptance result with the
destination owner. Connect the actual read API in module 3; if writes are in
scope, connect authenticated approval in module 6 and prove recovery against
the destination in module 7.

Keep application and operating state in customer-owned systems. Reuse the reference engine where
it fits, or apply its contracts in the customer's existing application.
**A live model connected to the synthetic backend is still only a reference check.**
The evidence must come from the real approved integration.

## Optional local reference check

Run from the repository root on Linux or macOS with Python 3.10 or later:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py start
python3 -B scenarios/operational-agents/accelerator/validate.py
```

The first command uses a scripted model driver and local synthetic data. It makes
no Azure calls. The task JSON includes its ID, consumed budgets, and evidence.
Follow the [accelerator guide](accelerator/README.md) for approval and recovery,
or the explicit live Foundry path.

## Implementation boundary

The accelerator implements a local CLI and two SQLite stores. Its operation
ledger and record update commit together. This proves the sample's retry
contract; it does not make an arbitrary customer API idempotent.

The modules identify where the customer must implement tool authentication, authenticated approval,
and durable state that fits the runtime. The local code does not supply those tenant integrations.
Assign them during scope selection and complete them before accepting the corresponding module.

Module 6 binds approval to an exact operation; module 8 verifies the connected task and operating
handoff. Use the local records only to inspect reference behavior, not as the customer's task store.
