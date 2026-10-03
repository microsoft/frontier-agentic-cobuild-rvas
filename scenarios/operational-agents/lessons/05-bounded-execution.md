# Module 5. Bound the execution loop

Each resume continues an existing budget. Restarting the caller must not grant
the agent another unrestricted run.

## What you build

Finite model-turn and tool-attempt limits, plus an active-execution budget.
Inputs are the task's acceptable work bound and the destination's timeout and
retry contract.

## Choose your path

| Operation | Default behavior | Why |
|---|---|---|
| Model request | One bounded attempt. | A failed continuation may have changed remote state. |
| Read | At most two retries after the first timeout. | Repeated reads have no intended external effect. |
| Mutation | No automatic retry. | A timeout may occur after commit. |
| Approval wait | Pause without consuming active budget. | Human deliberation is not model execution. |

The sample has one agent and a fixed tool registry. Do not add orchestration
or background workers merely because one interactive response is slow.

## Implementation

Set limits for the customer's actual task: maximum model turns, tool attempts,
and active execution time. Include SDK and gateway retries in that budget.
Persist the counters before dispatch so a restart cannot give the task a new
allowance.

Configure timeouts against the destination's contract. Test a slow read and an
interrupted write in an approved non-production environment. A timeout after a
write must enter reconciliation, not an automatic retry. Module 7 implements
that destination check.

### Reference budget check

Read `_attempt` in `accelerator/runtime.py`. It persists counters and reserves
time before a call. On return it refunds unused time. A crash retains the
reservation. The live SDK disables its automatic retry loop.

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py start --max-turns 1
python3 -B scenarios/operational-agents/accelerator/validate.py --case limits
```

The first command permits the initial read but cannot request the final scripted
response. Its result must be `exhausted`, with the read retained in `evidence`.

For customer adapters, pass a bounded timeout to each network operation.
Separate retryable reads from ambiguous writes using the API's actual error
contract; do not infer that a failed response means nothing happened.

## Verify

Exhaust a budget through the connected application and restart it. The task
must remain stopped with its previous evidence and counters. Confirm in the
destination that no hidden retry bypassed the limit. The local commands below
demonstrate the same invariant without customer tools.

The CLI exits nonzero with `turns: 1`. Resuming that task must leave its budget
unchanged. The behavioral report must also show that read retries are capped
and that an exhausted evidence lookup preserves an unresolved write.

An exhausted task may already contain a successful approved operation. Inspect
its receipts before creating replacement work.

## Next module

[Approve an exact operation](06-approval.md). Decide what the reviewer must see
and what changes invalidate their decision.
