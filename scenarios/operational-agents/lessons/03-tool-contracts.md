# Module 3 - Define narrow tool contracts

A tool schema describes the request. The destination system must still enforce
permissions and decide whether an update is valid.

## What you build

Two model-visible functions: `inspect_record` and `propose_update`. The
application alone can apply an approved proposal and read its operation
receipt. Inputs are the task scope and the allowed update shape.

## Choose your path

| Option | Use when | Required evidence |
|---|---|---|
| **Local synthetic backend** | Proving execution behavior without customer data. | A transactional record and operation ledger. |
| Approved service adapter | The customer already has a suitable API. | Destination authorization, conditional writes, and operation lookup. |
| New operation API | The destination lacks these guarantees. | Implement and prove those guarantees before agent integration. |

Keep reads separate from writes. Do not expose an unrestricted update object
or permit extra fields that bypass the chosen contract.

## Implementation

Read `accelerator/tools.py`. `validate_call` rejects unknown functions and extra
arguments. A proposal contains `record_id`, `expected_version`, and `new_value`.
The version must be a positive integer; the new value is a bounded string.

`Backend.apply` checks the operation ID and expected record version inside a
transaction. The record update and receipt commit together. Reusing an ID with
different arguments fails.

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py
```

When adapting a tool, retain this distinction: the model sees a proposal
function; the application owns the actual write. Use the shared
[Action Tools activity](../../../activities/advanced-action-tools/README.md)
for the approval and provenance contract.

## Verify

Inspect `test_invalid_tool_contracts` and `test_idempotency_conflict_and_replay`
in the report. They must pass by exercising real local code. The duplicate-key
check must leave the record at version 2, rather than produce a second update.

A key stored only in the runner is insufficient. If the destination cannot
reject a duplicate operation, keep mutations out of scope until it can.

## Next module

[Separate context from task state](04-task-state.md). Decide which facts must
be fetched again and which progress must be persisted.
