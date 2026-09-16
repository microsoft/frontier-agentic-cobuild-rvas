# Operational Agents: carry out bounded work

Build an agent that uses approved tools, pauses for an exact human decision, and
retains evidence when execution is interrupted. The sample uses synthetic records
and generic updates. Bring the customer's task and map its operations to these
controls.

An **agent harness** is the application code around the model that controls tool
execution and task progress. Here, it owns the approval boundary and recovery
state. The model may request a tool call; it cannot authorize a write.

## The eight modules

| Module | You decide | Outcome |
|---|---|---|
| [1. Task boundary](lesson.html?scenario=operational-agents&lesson=task-boundary) | What may the agent attempt? | Scope violations stop without effects. |
| [2. Foundation](lesson.html?scenario=operational-agents&lesson=foundation) | Offline exercise or live Foundry call? | Explicit mode and connection evidence. |
| [3. Tool contracts](lesson.html?scenario=operational-agents&lesson=tool-contracts) | What does each operation accept and prove? | Typed requests and conditional updates. |
| [4. Task state](lesson.html?scenario=operational-agents&lesson=task-state) | What must survive a process restart? | Reloadable progress and pending approval. |
| [5. Bounded execution](lesson.html?scenario=operational-agents&lesson=bounded-execution) | What limits stop the loop? | Budgets that persist across resume. |
| [6. Approval](lesson.html?scenario=operational-agents&lesson=approval) | Who approves which exact change? | A decision bound to the proposal and record version. |
| [7. Recovery](lesson.html?scenario=operational-agents&lesson=recovery) | Did an interrupted operation commit? | Reconciliation without blind write retries. |
| [8. Evaluate and operate](lesson.html?scenario=operational-agents&lesson=evaluate-operate) | What evidence is enough for the agreed pilot? | Behavioral checks and visible integration gaps. |

## Choose this track when execution is the difficult part

Use AI Grounding for trusted answers over approved content. Use Content
Understanding when document extraction and review drive the workflow.
Operational Agents addresses tasks where several tool calls and their effects
must remain controlled across failure or interruption. A customer can combine
these patterns.

**Start with one agent and a narrow operation set.** Add distributed execution
only when the task requires it. The guided path does not require persistent
personal memory, a multi-agent framework, or a new approval UI.

## Start locally

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

**Customer-specific work remains:** tool authentication, an authenticated
approval service, and shared storage if multiple hosts must operate tasks.
Choose trace retention and validate the customer's actual operations before a
pilot. Local checks do not prove Azure permissions or model quality.

The shared [Action Tools activity](activity.html?id=advanced-action-tools)
owns the approval and provenance policy. This track adds task state and
reconciliation without changing that policy. Reuse
[Tracing & Observability](activity.html?id=advanced-tracing-observability)
when connecting operational evidence to the customer's telemetry.
