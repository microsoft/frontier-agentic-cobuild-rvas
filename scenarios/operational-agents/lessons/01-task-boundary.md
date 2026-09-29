# Module 1 - Define the task boundary

Start with the work a customer wants to delegate. Identify the systems it may
read and the effects it may propose. A useful answer does not prove that an
operation completed.

## What you build

A bounded task with explicit record scope and a refusal path. Inputs are the
customer's task description, source owner, and permitted operations. Name one
real operation and its destination. For example, inspect a service request and
propose moving it to an approved status. The `record-001` reference below shows
the boundary; replace that generic task with the customer's operation.

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

In the existing backlog, define the record scope and the exact fields
an operation may read or change. Have the source owner approve a test record in
the tenant and identify the application identity allowed to access it. Keep
writes disabled until module 6's approval boundary is connected.

Specify a successful result that can be checked independently in the
destination system. For a read-only release, that may be an evidence-backed
investigation shown to an authorized user. For a write, require the
destination's operation receipt. A model explanation is not enough.

### Optional reference check

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

The destination owner can identify the allowed operation and excluded records.
The implementation team has an approved read path and a named user channel.
Confirm an out-of-scope record cannot be retrieved through that path. If access
is blocked, record the blocker; the local check below does not replace the
tenant result.

The first command returns `completed` with a record read in `evidence`. The
second exits nonzero with `failed` and an outside-scope error. It must contain
no tool result for `record-002`.

A missing source is a failure, not an empty successful result. If scope denial
does not stop execution, fix the application boundary before adding writes.

## Next module

[Choose the execution foundation](02-foundation.md). Decide whether the next
check needs a real model or can first be proved deterministically.
