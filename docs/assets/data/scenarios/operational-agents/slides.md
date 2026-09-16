---
marp: true
title: "Operational Agents"
description: "Customer decisions for bounded tool execution and recovery."
---

# Operational Agents

Carry out bounded work with approved tools and evidence of the result.

**Bring the customer's task.** This playbook supplies reusable execution controls.

---
<!-- slide:id=lesson-task-boundary-context -->

## Define the work before adding an agent

A useful explanation does not prove that an operation completed.

Choose the task boundary and the conditions that require a stop.

---
<!-- slide:id=lesson-task-boundary-choices -->

## Choose how much to delegate

| Option | Decision |
|---|---|
| Read-only | The agent can inspect approved state. |
| Approved mutation | A person must approve the exact proposed effect. |
| Fixed workflow | Use when the next step needs no model judgment. |

---
<!-- slide:id=lesson-task-boundary-evidence -->

## Prove the boundary

Run an allowed read and an out-of-scope request.

**Inspect the destination.** A denied request must produce no effect.

---
<!-- slide:id=lesson-foundation-context -->

## Separate local proof from live inference

The same application controls both modes.

A scripted exercise tests execution behavior. A real model call tests the
connection and the model's selected request.

---
<!-- slide:id=lesson-foundation-choices -->

## Choose the environment

Start locally without Azure calls.

For live work, use an approved project or the optional minimal demo foundation.
Keep customer data out until its owners approve the path.

---
<!-- slide:id=lesson-foundation-evidence -->

## Make the mode visible

An offline run produces local evidence.

**A live check needs a real response ID and tool result.** A missing deployment
or denied permission must remain a failure.

---
<!-- slide:id=lesson-tool-contracts-context -->

## A schema is only the first boundary

The application validates arguments.

The destination service must also enforce access and decide whether the
requested update is still valid.

---
<!-- slide:id=lesson-tool-contracts-choices -->

## Choose a narrow operation set

Separate reads from proposed writes.

Require an expected record version and an operation ID for updates.
Avoid arbitrary commands and unrestricted update objects.

---
<!-- slide:id=lesson-tool-contracts-evidence -->

## Prove destination guarantees

Reject unexpected arguments.

Replay the same operation ID and confirm one effect. Reuse that ID with
different arguments and confirm rejection.

---
<!-- slide:id=lesson-task-state-context -->

## Conversation history is not approval

A new process must know what is pending without asking the model to remember.

Persist progress outside the conversation.

---
<!-- slide:id=lesson-task-state-choices -->

## Put information where it belongs

| Information | Owner |
|---|---|
| Policy | Approved knowledge source |
| Current facts | Live system |
| Pending work and budget | Application task store |
| Optional durable preferences | Explicit memory design |

---
<!-- slide:id=lesson-task-state-evidence -->

## Restart before approving

Open the task from a fresh process.

The proposal digest and prior evidence must match. The destination must still
be unchanged.

---
<!-- slide:id=lesson-bounded-execution-context -->

## Resume must preserve limits

An interrupted caller must not grant another unrestricted budget.

Count work across the task's lifetime.

---
<!-- slide:id=lesson-bounded-execution-choices -->

## Choose stop and retry rules

Bound model turns and tool attempts.

Retry only suitable reads. A write timeout requires reconciliation because
the operation may already have committed.

---
<!-- slide:id=lesson-bounded-execution-evidence -->

## Exhaust the budget deliberately

Confirm the task stops and retains prior results.

**Exhausted does not mean rolled back.** Inspect effects before starting
replacement work.

---
<!-- slide:id=lesson-approval-context -->

## Approval belongs to one proposal

Show the exact tool and arguments to the reviewer.

A changed proposal or record version needs a new decision.

---
<!-- slide:id=lesson-approval-choices -->

## Choose the approval boundary

The local CLI demonstrates the contract using a trusted operator.

A customer pilot needs authenticated approvers and policy rules enforced
outside the model.

---
<!-- slide:id=lesson-approval-evidence -->

## Test approval failure paths

Deny a proposal and inspect the unchanged record.

Then change an approved proposal's arguments or expected version. The old
decision must no longer authorize execution.

---
<!-- slide:id=lesson-recovery-context -->

## A lost reply is an unknown result

The destination can commit before the caller records success.

**Do not equate interruption with failure.**

---
<!-- slide:id=lesson-recovery-choices -->

## Reconcile before deciding

| Destination evidence | Response |
|---|---|
| Matching receipt | Record the result and continue. |
| Contradictory receipt | Stop and investigate. |
| No authoritative result | Keep the task unresolved. |

---
<!-- slide:id=lesson-recovery-evidence -->

## Interrupt after commit

Restart the process and read the operation ledger.

Recover one receipt with one effect. A second write would fail this check.

---
<!-- slide:id=lesson-evaluate-operate-context -->

## Execution correctness and model quality differ

The application can enforce approval while the model chooses a poor next step.

Test both against the customer's task.

---
<!-- slide:id=lesson-evaluate-operate-choices -->

## Choose the pilot evidence

Use local failure cases for runtime behavior.

Add live synthetic prompts and then approved customer integration checks.
Assign owners to work the kit does not implement.

---
<!-- slide:id=lesson-evaluate-operate-evidence -->

## Review the actual outcome

Inspect operation receipts and the destination state.

Record gaps in authenticated approval, shared storage, or telemetry.
Lesson completion alone does not establish production readiness.
