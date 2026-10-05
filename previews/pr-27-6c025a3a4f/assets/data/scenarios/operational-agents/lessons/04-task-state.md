# Module 4. Separate context from task state

The model's conversation is not the system of record for approval. Persist
application state explicitly so a fresh process can determine what is pending.

## What you build

A task snapshot with its scope, pending proposal, and prior evidence. Inputs
are the allowed operation set and the state that must survive a restart.

## Choose your path

| Information | Keep it in | Reason |
|---|---|---|
| Approved policy or reference content | An owned knowledge source. | Its owner controls changes and access. |
| Current record value/version | The live tool system. | A conversation snapshot may be stale. |
| Pending work and consumed budget | The application task store. | Restart must preserve execution controls. |
| Cross-session preferences | An explicit optional memory design. | Retention and access need their own decision. |

**The guided path implements task state only.** It does not require durable
personal memory. A remembered preference can never authorize a mutation.

## Implementation

Persist the customer task's scope, consumed budgets, pending proposal, and
evidence in the approved application store. Keep the authoritative record
version in the destination system; fetch it again before dispatch. Choose a
durable store and ownership model that fits the runtime. Local SQLite can
demonstrate the contract but is not shared state for replaceable workers.

Authorize task reads and approvals separately from model access. Restart the
application while a task waits for approval, then load it under its existing ID.
Do not reset its budget or replace its pending proposal. Agree retention and
deletion with the operating owner.

### Reference restart check

Follow the [approval exercise](../accelerator/README.md#approve-one-exact-update)
until the task reaches `waiting_approval`. Keep its `STATE` path and `TASK_ID`.
Open a fresh shell, set those variables to the saved values, and run from the
repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" show "$TASK_ID"
```

Read `accelerator/state.py`. Task snapshots live in `tasks.sqlite3`; synthetic
records and committed operation receipts live in `tools.sqlite3`. The stores
have independent commits so recovery exercises can expose the gap between
external success and runner acknowledgement.

The CLI rejects state paths under scenario sources or the published site.
Do not check databases, credentials, or customer evidence into Git.

## Verify

Restart the customer's runtime and verify the same pending operation is visible
to its authorized reviewer. Another user must not gain access to it. Inspect
the destination and confirm waiting for approval caused no write. Then use the
reference check below for local regression.

The fresh process must return the same pending digest and prior evidence.
The record remains unchanged. The automated
`test_recovery_pending_persists_across_processes` check verifies the whole
snapshot, rather than only the task ID.

If a state file is corrupt, report an error. Creating a fresh empty task under
the same identity would erase the evidence needed to recover safely.

## Next module

[Bound the execution loop](05-bounded-execution.md). Decide how much work a task
may consume across all of its resumes.
