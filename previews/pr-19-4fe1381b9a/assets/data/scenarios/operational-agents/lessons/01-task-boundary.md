# Module 1 - Define the task boundary

Start with the work a customer wants to delegate. Identify the systems it may
read and the effects it may propose. A useful answer is not sufficient evidence
that an operation completed.

## What you build

A bounded task with explicit record scope and a refusal path. Inputs are the
customer's task description, the source owner, and the operations that owner
permits. The guided exercise uses `record-001`; it does not assume a business
use case.

## Choose your path

| Option | Use when | Trade-off |
|---|---|---|
| **Read-only task** | The team first needs reliable investigation. | No changes can be proposed. |
| Approved mutation | The task has one well-defined state change. | Requires exact approval and recovery evidence. |
| Deterministic workflow | Every next step is already known. | Less model flexibility; simpler control. |

**Start read-only.** Choose an agent only when selecting the next useful tool
requires judgment. A fixed sequence can use the same tool contracts without a
model.

## Implementation

Run commands from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py start --scope record-001
python3 -B scenarios/operational-agents/accelerator/cli.py start --scope record-001 \
  --fixture scenarios/operational-agents/accelerator/sample-data/out-of-scope.json
```

Inspect `scope`, `status`, and `evidence` in both results. Read
`accelerator/tools.py`: the application compares the requested record ID with
the task scope before invoking the backend. Instructions alone do not grant
access.

For the customer, record who owns the source, which operations are excluded,
and the condition that ends or escalates the task. Do not give the model an
arbitrary URL or shell tool to avoid making these choices.

## Verify

The first command returns `completed` with a record read in `evidence`. The
second exits nonzero with `failed` and an outside-scope error. It must contain
no tool result for `record-002`.

A missing source is a failure, not an empty successful result. If scope denial
does not stop execution, fix the application boundary before adding writes.

## Next module

[Choose the execution foundation](02-foundation.md). Decide whether the next
check needs a real model or can first be proved deterministically.
