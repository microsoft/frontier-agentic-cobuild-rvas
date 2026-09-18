# Module 2 - Choose and verify the execution foundation

The local engine is the same in both modes. Offline mode substitutes scripted
model requests; live mode connects to a versioned Foundry agent. Neither mode
moves the synthetic tool system into Azure.

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

Use the approved existing environment when one is available. The optional
template deliberately omits Search and embeddings because this track does not
need an index.

## Implementation

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
