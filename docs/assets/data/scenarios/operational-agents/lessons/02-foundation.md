# Module 2 - Choose and verify the execution foundation

Connect the customer application's execution environment and approved model
deployment. Choose where its task state and credentials will live. The local
reference has offline and live-model modes; neither connects the customer's
tools automatically.

## What you build

An explicit execution mode and a verified connection when live inference is
needed. Inputs are Python, an approved state directory, and, for live work, a
Foundry project with a deployed chat model.

## Choose your path

| Path | What it proves | What it does not prove |
|---|---|---|
| **Offline first** | Local approval and recovery behavior. | Model selection or Azure access. |
| Bring your own Foundry project | Real model requests through the engine. | Customer API authorization. |
| Optional demo foundation | A separate account/project and chat deployment. | A hosted worker or enterprise landing zone. |

**Use the approved existing environment when one is available.** The optional
template deliberately omits Search and embeddings because this track does not
need an index.

## Implementation

Work in the customer's private repository. Identify the runtime identity, model
endpoint, and network route to the approved tool API. Confirm the runtime can
authenticate to each service without embedding credentials in code. Choose the
task-store location and access policy; module 4 will add restart-safe state.

If reusing the reference engine, use its explicit live setup below, then replace
the synthetic tool adapter in module 3. If the customer already has an agent
application, keep that host and apply the same scope and approval contracts
there. Store its model/version configuration with the deployment.

### Reference connection check

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/cli.py start --mode offline
```

For live mode, follow the [accelerator setup](../accelerator/README.md#explicit-live-foundry-mode).
Install its pinned dependencies, sign in, and export the two documented
environment values. Run `setup-live` to create a prompt-agent version; retain
the exact name and version for subsequent calls.

Check [current Microsoft Learn function-calling guidance](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/function-calling)
before changing the SDK. The app executes function requests and submits
results. That service pattern does not supply this sample's approval store.

## Verify

From the selected runtime, make a permitted model request and an authorized
read of the approved test record. Retain their correlation IDs without logging
record contents or credentials. Test a denied identity. The reference validator
below checks only its synthetic tool path.

Offline output must say `"mode": "offline"` and contain a real local tool result.
For the live path, after setting `AGENT_NAME` and `AGENT_VERSION` from setup:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py --live \
  --agent-name "$AGENT_NAME" --agent-version "$AGENT_VERSION"
```

Expect `live_read_passed: true`, a real response ID, and an `inspect_record`
result. A missing deployment, denied permission, or failed model response must
exit nonzero. Do not count an offline pass as a substitute.

## Next module

[Define the tool contracts](03-tool-contracts.md). Decide which request fields
and result evidence the application must enforce.
