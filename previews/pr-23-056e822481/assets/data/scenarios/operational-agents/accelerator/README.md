# Operational Agents accelerator

**A runnable local reference for controlled execution.** The engine supports a
scripted offline driver and an explicit live Foundry driver. Both use the same
scope checks and approval boundary. The tools always operate on synthetic local
records; live mode changes the model connection, not the tool destination.

## Prerequisites

Run commands from the repository root. Use Linux or macOS with Python 3.10 or
later. The local task lock uses `fcntl`; on Windows, use WSL or the dev container.
Offline exercises need only the Python standard library.

State defaults to `$XDG_STATE_HOME/operational-agents`, or
`~/.local/state/operational-agents`. Pass `--state-dir` **before** the subcommand
to isolate an exercise. Never put databases or outputs under `scenarios/` or
`docs/`; the CLI rejects those paths.

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py --help
python3 -B scenarios/operational-agents/accelerator/cli.py start
```

`completed` means the bounded run ended with tool evidence. It does not certify
that the model's explanation is correct. Inspect `evidence`; treat `answer` as
untrusted model or scripted text. A model-only claim cannot complete the task.

## Approve one exact update

Use a fresh directory so the sample record starts at version 1:

```bash
STATE="$(mktemp -d)"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" start \
  --allow-writes \
  --fixture scenarios/operational-agents/accelerator/sample-data/update.json
```

Expect `waiting_approval`. Copy `id` and `pending.digest` from that JSON into the
variables below. `--allow-writes` permits proposals; it does not approve them.

```bash
TASK_ID="paste-the-task-id"
DIGEST="paste-the-pending-digest"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" show "$TASK_ID"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" approve "$TASK_ID" --digest "$DIGEST"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" resume "$TASK_ID"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" records
```

Expect `completed`, record value `reviewed`, and version `2`. The task evidence
contains a matching `operation_id`. Repeating `resume` must not increment the
version. To refuse, use `deny` instead of `approve`; denial is terminal.

The approval command records the local OS username. **This is operator
attribution, not enterprise authentication.** The trusted local operator can
read and modify these files. Replace this boundary before using customer data.

## Recover an interrupted write

Create and approve a fresh update task as above. Instead of ordinary resume:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" resume "$TASK_ID" --fault after-commit
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" reconcile "$TASK_ID"
python3 -B scenarios/operational-agents/accelerator/cli.py --state-dir "$STATE" resume "$TASK_ID"
```

The injected interruption exits nonzero. Reconciliation reads the independent
tool ledger and returns `ready`; resume finishes with exactly one operation.

Repeat with another fresh task and `--fault before-dispatch`. Reconciliation must
return `unresolved`, with no operation and no change to the record. **Do not reset
the status or replay the write.** The sample stops for operator review. A
customer adapter needs its own authoritative absence/retry contract.

Fault injection is unavailable in live mode. For repeatable exercises without
manual IDs:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py --case recovery
```

## Execution limits

Defaults are eight model turns, twelve tool attempts, and an active-execution
budget of 120 seconds. `start` accepts `--max-turns`, `--max-calls`, and `--seconds`.
Use positive finite limits. Each SDK request has a bounded timeout; automatic
SDK retries are disabled. A failed synthetic read can retry twice, charging each
attempt. Writes are never automatically retried.

Before a call, the engine reserves time and persists it. It refunds unused time
when the call returns. An interrupted call retains its reservation, so restarting
cannot create a fresh budget. Waiting for human approval consumes no budget.
Evidence reads also consume calls; an exhausted reconciliation remains unresolved.

## Explicit live Foundry mode

**This path makes billable Azure calls.** Use an approved project and model
deployment. Verify current [function-calling guidance](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/function-calling)
and [response continuation](https://learn.microsoft.com/azure/foundry/agents/concepts/runtime-components)
before changing SDK code.

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r scenarios/operational-agents/accelerator/requirements.txt
az login
export AZURE_AI_PROJECT_ENDPOINT="https://YOUR-ACCOUNT.services.ai.azure.com/api/projects/YOUR-PROJECT"
export AZURE_AI_MODEL_DEPLOYMENT_NAME="YOUR-DEPLOYMENT"
python3 -B scenarios/operational-agents/accelerator/cli.py setup-live --agent-name operational-agents
```

`setup-live` creates a prompt-agent version with the two function schemas. Copy
its returned name and version:

```bash
AGENT_NAME="paste-the-agent-name"
AGENT_VERSION="paste-the-agent-version"
python3 -B scenarios/operational-agents/accelerator/cli.py start --mode live \
  --agent-name "$AGENT_NAME" --agent-version "$AGENT_VERSION"
python3 -B scenarios/operational-agents/accelerator/validate.py --live \
  --agent-name "$AGENT_NAME" --agent-version "$AGENT_VERSION"
```

The live validator performs a read-only model/tool round trip and prints its
evidence. It does not prove approval quality or customer integration. Live tasks
pin the agent version and retain response IDs for continuation. If the model
request is interrupted, the sample stops rather than guessing remote state.
Missing credentials or an unavailable response must remain visible errors.

Response history is stored by the service for continuation. Use synthetic
prompts only and agree cloud retention before customer use. Delete the specific
agent version created by this exercise in the Foundry portal when no longer
needed. Do not delete a shared project or deployment.

### Optional clean-demo foundation

Bring-your-own is preferred when an approved environment exists. The template
creates a public-Azure Foundry account/project and one explicitly selected chat
deployment. It grants the operator scoped data-plane roles. It does not create
Search, embeddings, a hosted worker, or an enterprise landing zone.

Copy `parameters.example.json` outside the repository. Replace every `REPLACE`
value after checking model availability, version, SKU, and quota through current
Microsoft Learn and Foundry tools. The script rejects unedited placeholders.

```bash
PARAMETERS="/absolute/path/to/your/parameters.json"
bash scenarios/operational-agents/accelerator/scripts/deploy.sh \
  YOUR-APPROVED-RESOURCE-GROUP YOUR-REGION "$PARAMETERS"
```

The script creates resources and role assignments. It writes environment
outputs to a private temporary directory and prints the `source` command.
Review those outputs, load them, then run `setup-live`. Track the created
resources with the environment owner and remove only resources belonging to
this exercise when finished.

## Verify and adapt

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py
```

Tests execute real local tools and restart processes against temporary SQLite
files. Expected values are in [sample-data/expected.json](sample-data/expected.json).
Tests clean up their own state; manual exercise directories belong to the
operator and are not automatically deleted.

Read [solution.md](solution.md) before replacing the backend. Customer APIs must
enforce authorization and conditional updates themselves. An idempotency key in
the runner alone cannot prevent duplicate external effects.
