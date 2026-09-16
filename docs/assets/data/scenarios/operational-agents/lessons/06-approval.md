# Module 6 - Approve an exact operation

Approval belongs to a specific proposal. The model cannot carry it forward to
different arguments or a changed record.

![Model proposals and operator decisions meet at the application gate](../diagrams/execution-boundary.png)

## What you build

A persisted proposal and a separate human decision. The proposal digest binds
the task ID to the exact tool call, including its expected record version.

## Choose your path

| Option | Suitable boundary | Limitation |
|---|---|---|
| **Local CLI approval** | Synthetic exercises run by a trusted operator. | The OS username is attribution only. |
| Authenticated approval service | A customer pilot with real effects. | Requires approver authorization and policy rules. |
| Existing workflow approval | The customer already has an approval system. | Its decision must bind to the exact proposal. |

The shared [Action Tools contract](../../../activities/advanced-action-tools/README.md)
requires the requested function, arguments, human decision, and result to remain
traceable. This track adds persistence without replacing that policy.

## Implementation

Follow the [accelerator's exact-update commands](../accelerator/README.md#approve-one-exact-update).
Inspect the proposal before approving it. The `approve` command records a
decision; `resume` performs the separately gated operation.

`propose_update` cannot call `Backend.apply` directly. The engine validates the
digest again and fetches the current record version before dispatch. The backend
then checks that version transactionally, closing the concurrent-update gap.

Noninteractive `start` and `resume` stop at `waiting_approval`. They never
interpret model text, tool output, or `--allow-writes` as approval.

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py --case approval
```

## Verify

The suite must prove denial leaves version 1 unchanged. An approved unmodified
proposal reaches version 2 once. A changed digest or stale expected version
must fail without applying the proposed value.

For customer systems, add authenticated approver identity and expiry. Enforce
those checks outside the model and again at the write boundary.

## Next module

[Recover interrupted work](07-recovery.md). Decide how to establish whether a
write committed when the caller never received a result.
