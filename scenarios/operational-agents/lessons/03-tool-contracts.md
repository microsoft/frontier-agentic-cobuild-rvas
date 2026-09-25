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
| Approved service adapter | The customer already has a suitable API. | Destination authorization, version checks, and operation lookup. |
| New operation API | The destination lacks these guarantees. | Implement and prove those guarantees before agent integration. |

Keep reads separate from writes. Do not expose an unrestricted update object
or permit extra fields that bypass the chosen contract.

## Implementation

### Connect the customer's operation

Define the read and proposal schemas with the destination owner. Map a proposal
to one approved operation, such as changing a service-request status, and reject
unrelated fields. Enforce record authorization in the adapter and destination;
do not trust a record ID merely because the model provided it.

Implement the read first using the identity from module 2. Keep the
destination's version with the returned evidence. Before enabling writes,
confirm how the destination checks concurrent updates and identifies a repeated
operation. If it cannot provide those guarantees, keep the release read-only or
implement the operation API before continuing.

For the reference engine, replace the synthetic backend in the customer's
private code; do not change the model-visible proposal into a direct write.
Keep application-owned dispatch and map the destination's receipt into the task
evidence.

### Inspect the reference contracts

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

When adapting a tool, keep this distinction: the model sees a proposal
function; the application owns the actual write. Persist the requested function
and arguments with the task ID, then retain the human decision and destination
receipt. Module 6 applies that contract to the exact proposal; no separate tool
exercise is required.

## Verify

Call the connected read with an allowed record, a denied record, and an unknown
argument. Only the allowed request may return evidence. In an approved test
environment, prove a stale version and conflicting operation ID are rejected by
the destination before allowing writes. Retain these results with the API's
contract; the local suite proves only the reference backend.

Inspect `test_invalid_tool_contracts` and `test_idempotency_conflict_and_replay`
in the report. They must pass by exercising real local code. The duplicate-key
check must leave the record at version 2, rather than produce a second update.

A key stored only in the runner is insufficient. If the destination cannot
reject a duplicate operation, keep mutations out of scope until it can.

## Next module

[Separate context from task state](04-task-state.md). Decide which facts must
be fetched again and which progress must be persisted.
