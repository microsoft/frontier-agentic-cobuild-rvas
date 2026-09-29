# Facilitator reference: Operational Agents

The code is complete for the stated local contract. Participants change one
boundary at a time and inspect resulting evidence. Do not describe these
exercises as a production approval system.

## Code map

| File | Responsibility |
|---|---|
| `cli.py` | Explicit commands, mode selection, operator attribution, JSON output. |
| `runtime.py` | Scope enforcement, budgets, approval state, dispatch and reconciliation. |
| `state.py` | SQLite task snapshots and a per-task process lock. |
| `tools.py` | Exact argument validation, synthetic records, transactional operation ledger. |
| `foundry_client.py` | Keyless live adapter with pinned agent references and response continuation. |
| `validate.py` | Offline behavioral selection and opt-in live read verification. |

The kernel lock serializes local operators for one task and releases on process
exit. SQLite transactions protect snapshots and backend updates. This avoids
stale distributed leases in a deliberately single-machine reference. It is not
a distributed locking design.

## State transitions

`ready` runs reads or requests another model response. A write proposal becomes
`waiting_approval`. The CLI moves it to `approved` or terminal `denied`.
Approved work rechecks the digest and record version before `dispatching`.

The tool update and operation ledger commit in one backend transaction.
Reconciliation compares that result with the exact approved arguments. A match
returns the task to `ready`; the next model response may finish the run.
An unavailable or absent result remains `unresolved`.

`failed` and `exhausted` are terminal in the sample. They do not imply that every
prior operation was rolled back. Inspect the evidence and backend before
starting replacement work. An exhausted task may already contain a successful
approved operation.

## Proof boundaries

The JSON `answer` is not an execution receipt. `evidence` contains tool calls
and results; a write result must match the stored operation ID and new version.
The sample checks whether that particular operation committed, not whether its
value remains current after unrelated subsequent updates.

The offline driver supplies scripted calls. Injection fixtures prove that
untrusted text cannot bypass the application checks. They do not measure a
model's resistance to injection or its ability to select a useful tool.

An unknown write result never triggers automatic replay. When no operation is
found, this sample deliberately stops. Before adding retries to a customer
adapter, establish whether a lookup can conclusively prove absence and whether
the same idempotency key is honored across failures.

## Adaptation seams

**Tool system:** replace `Backend` with approved adapters. Keep schema validation
and enforce authorization in the destination service. Make the operation lookup
authoritative, bind keys to payloads, and preserve conditional version checks.
The built-in tools use local SQLite timeouts; network adapters need their own
bounded deadlines and error classification.

**Approval:** replace local username attribution with authenticated identity.
Bind decisions to the canonical proposal, relevant policy version, and expiry
rules. The model must not possess a credential that bypasses this service.

**State:** choose a shared transactional store before distributing workers.
Persist tool-call IDs and consumed budgets. Define ownership and recovery from
concurrent claims. Do not mount this SQLite sample across independent hosts and
assume equivalent behavior.

**Observability:** correlate task ID, operation ID, and the live response ID with
customer traces. This sample emits local JSON evidence; it does not export
OpenTelemetry spans to Application Insights. Use
[module 8's telemetry setup](../lessons/08-evaluate-operate.md)
for that integration. Exclude secrets and choose retention before logging
customer tool arguments.

## Facilitation checks

Ask the participant to show a denied write and the unchanged backend record.
Then interrupt a fresh approved task after commit. Its resumed run should
recover exactly one result. Change the record version before execution and
confirm that the old approval is no longer enough.

Finally, use a representative live prompt against synthetic data. Compare the
tool selected and the final explanation with the evidence. An offline pass
cannot replace that comparison.

## Sources for live implementation

- [Function calling](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/function-calling)
- [Versioned agents and response continuation](https://learn.microsoft.com/azure/foundry/agents/concepts/runtime-components)
- [Keyless authentication and authorization](https://learn.microsoft.com/azure/foundry/concepts/authentication-authorization)
- [Foundry account template](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/2025-06-01/accounts)
- [Foundry project template](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/2025-06-01/accounts/projects)

Re-check Microsoft Learn and the matching repository skills before changing
SDK methods or resource versions. Service availability and access requirements
must be proved in the customer's environment.
