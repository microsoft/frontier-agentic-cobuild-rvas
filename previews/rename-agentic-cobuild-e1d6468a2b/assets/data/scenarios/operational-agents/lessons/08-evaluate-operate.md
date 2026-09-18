# Module 8 - Prove behavior and prepare to operate

Keep runtime correctness separate from model quality. The same engine can
enforce approval while a model still chooses an irrelevant tool or gives a poor
explanation.

## What you build

A behavioral report, selected live evidence, and an explicit list of remaining
customer acceptance requirements. Inputs are the previous modules' fixtures
and the customer's proposed operations.

## Choose your path

| Check | Evidence | Boundary |
|---|---|---|
| **Offline behavioral suite** | Actual state transitions and operation counts. | No inference about model quality. |
| Live synthetic read | A real model/tool round trip. | No proof of customer-tool permissions. |
| Customer acceptance set | Representative tasks against approved integrations. | Requires the customer's owners and acceptance criteria. |

Start with the behavioral suite below. Add live model checks only after module 2's
explicit live setup succeeds. They use the same task engine and synthetic backend.

## Implementation

Run from the repository root:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py
```

Compare results with `accelerator/sample-data/expected.json`. Inspect an
approved run's `evidence`, then inspect the backend record independently.
Retain task and operation IDs for correlation. Live tasks also retain their
response ID; the sample does not export OpenTelemetry spans.

Before a customer pilot, assign owners for the source and destination APIs.
Choose authenticated approval and retention rules. If tasks must run on
multiple hosts, replace local SQLite and process locks with an appropriate
shared-state design.

### Check model behavior

Run the live read check with the agent name and version from module 2:

```bash
python3 -B scenarios/operational-agents/accelerator/validate.py --live \
  --agent-name "$AGENT_NAME" --agent-version "$AGENT_VERSION"
```

Inspect the actual selected function and its arguments, then compare the final explanation
with the backend evidence. A `completed` task is insufficient if the answer invents a write.
Keep the response ID and agent version with the acceptance result.

Add synthetic tasks that request an out-of-scope record, ask to bypass approval, or carry
an instruction inside a tool result. Require refusal or a bounded stop, with no unauthorized
backend change. Run each task in fresh state and inspect the record independently.
The deterministic suite proves the engine's controls; live cases additionally test whether
the model follows the intended task.

### Connect telemetry when operating remotely

The local default retains task evidence and needs no telemetry service. For a live pilot,
configure Azure Monitor once at process startup:

```python
import os
from azure.monitor.opentelemetry import configure_azure_monitor
from opentelemetry import trace

configure_azure_monitor(connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"])
tracer = trace.get_tracer("operational-agents")
```

Wrap the real model call and each tool dispatch in spans. Add the task ID and operation ID
as attributes; retain the response ID already captured by the engine. Emit a new linked
span after approval or reconciliation rather than leaving a span open while waiting for
a person. Keep arguments and returned record values out of telemetry by default.

After one real request, open the connected Application Insights Logs and query:

```kusto
dependencies
| where timestamp > ago(1h)
| where customDimensions has "task_id"
| project timestamp, name, duration, operation_Id, customDimensions
```

Inspect a matching task and its destination receipt. A local JSON file does not prove
telemetry export. Current exporter setup:
<https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=python>

Hosted execution remains optional. Resolve shared-state durability and the remote tool
address before packaging a worker; a local database inside a replaceable container is
not a durable shared store. Keep the current local path until those dependencies exist.

## Verify

Every offline case must pass, including interrupted commit and stale approval.
For the live path, run the explicit check from module 2 and review its tool
selection and final explanation.

Record unsupported or unverified customer behavior as remaining work. An
offline report, template compilation, or successful model call alone does not
establish production readiness.

## Next module

There is no required additional module. Agree the next customer decision:
adapt an approved tool, add authenticated approval, or stop until the
destination can provide the required execution evidence.
