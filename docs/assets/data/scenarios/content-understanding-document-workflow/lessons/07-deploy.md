# Module 7 — Deploy the reviewable workflow

The workflow passed the gate. Deploy it without losing the controls that made it safe. Deployment
makes keyless auth, monitoring, and rollback operational rather than aspirational.

![Controlled deployment boundary](../diagrams/07-controlled-deployment.png)

## What you build

An authenticated endpoint that runs the reviewed workflow with a managed identity, Application
Insights monitoring and GenAI tracing, plus a rollback path. Confirm that the endpoint rejects
unauthenticated calls.

## Choose your path

| Option | Runtime | Identity + auth | Rollback | Best when |
| --- | --- | --- | --- | --- |
| **A. Hosted agent (`azd ai agent`)** *(default)* | Foundry-hosted container | Managed identity, authenticated endpoint | Pin/swap revision | You built on the Foundry agent stack |
| B. Container app / managed online endpoint | Your container | Managed identity + Entra auth | Revision or blue/green | You need custom runtime or scaling control |
| C. API behind API Management | Your API | Entra-validated via APIM | Deployment slots | You are fronting an existing API estate |
| D. Hosted long-running workflow | Background job handle + later retrieval | Managed identity, authenticated submit/poll | Pin/swap revision | Document processing outlives an interactive request |

**Default hosting choice: Option A for an agent-based workflow.** The preceding modules do not
automatically create an agent or a hosted adapter. Package the workflow you actually built;
keep any unimplemented posting integration disabled. For an existing API, use option C.

**Choose B** when you need a custom runtime, specific scaling, or network isolation unavailable from
hosting. **Choose C** when the workflow belongs behind an existing API Management estate and its
policies. Every option follows the same rule: **no keys**, managed identity, authenticated endpoint,
monitoring enabled, rollback ready.

**Choose D** only for naturally asynchronous work: overnight intake, a file backlog, or a review
process users submit and check later. Return an opaque job handle, authorize every later
status/result read, and persist state outside the container. Do not add
this complexity when a reviewer expects one document to return while waiting.

**Migration cost.** Moving from A to B or C rehosts the same container and identity model. The
workflow, action-tool seam, and evaluation gate remain unchanged. You can make this decision late
and reverse it.

## Implementation

### Option A — Hosted agent (default)

Deploy the reviewed workflow as a hosted agent with managed identity and an authenticated endpoint.
Keep module 6's tracing setup in the runtime. Run the following in a new working directory
outside the repository so the generated project cannot replace this kit's root `azure.yaml`:

```bash
azd auth login
azd ext install microsoft.foundry
HOSTED_DIR="$(mktemp -d)"
cd "$HOSTED_DIR"
azd ai agent init \
  -m https://github.com/microsoft-foundry/foundry-samples/blob/main/samples/python/hosted-agents/agent-framework/responses/01-basic/azure.yaml \
  --deploy-mode code
```

Choose **Use an existing Foundry project**, then select module 1's project and model.
Change into the generated agent directory printed by the wizard.

Replace the sample handler with your extraction and review workflow from modules 3–5.
Keep the generated protocol host and Dockerfile. Expose a narrow document-processing
request, validate its input location, and return the normalized result or review handle.
Never let a prompt call the posting function without the application's approval check.
A basic chat response is not a deployed document workflow.

Review the generated `azure.yaml`: the service must be hosted, point to your source, and
declare its supported protocol. Set the scenario endpoint variables and telemetry connection
in its runtime configuration. Use the per-agent identity for source reads and the separately
scoped destination operation. Keep raw document content out of telemetry.

From that generated directory:

```bash
azd provision
azd ai agent run
```

Submit the same synthetic invoice through the local inspector. Confirm the conflicting
total still reaches review and an approval cannot be replaced by model text. Stop the
local process, then deploy:

```bash
azd deploy
azd ai agent monitor --follow
```

Record the reported endpoint, deployed version, and agent identity. Grant only the required
source/destination roles. Pin the tested version and retain the preceding version for rollback.
Current hosting setup:
<https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-hosted-agent>

### Option B — Container app / managed online endpoint

Run the same container with a system-assigned managed identity and Entra authentication at ingress.
Point Application Insights at it (the connection is already a project connection from module 1). Keep
two revisions so rollback is a revision swap. The action-tool seam and workflow identity remain the
same; only the host changes.

### Option C — API behind API Management

Front the workflow with an API and let API Management validate Entra tokens before requests reach it.
Use deployment slots for rollback. This fits organizations that standardize AI endpoints behind one
gateway. It adds one hop and gains APIM throttling, logging, and policy.

## Verify

Check the deployed endpoint as both attacker and operator. Try it without a token, confirm it uses an
identity rather than a key, and verify that traces still arrive.

**1. The endpoint refuses an unauthenticated caller.**

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://<your-endpoint>/<route>
```

You want `401` or `403`. A `200` exposes the workflow anonymously. Anyone who finds the URL can push
documents through it and read extracted results. Then confirm that an authenticated call still works:

```bash
TOKEN=$(az account get-access-token --resource https://ai.azure.com --query accessToken -o tsv)
curl -sS -o /dev/null -w '%{http_code}\n' -H "Authorization: Bearer $TOKEN" https://<your-endpoint>/<route>
```

**2. The runtime runs as a managed identity, with no keys.**

```bash
grep -inE '(api[_-]?key|account[_-]?key|connection[_-]?string|sharedaccesskey)' \
  scenarios/content-understanding/accelerator/.env
```

Inspect the deployed runtime settings too. This scan flags names for review; it does not prove
that a value is a secret. An Application Insights connection string identifies a telemetry
destination and is not a model API key. Confirm that the deployment identity holds its required roles. Without them,
the endpoint authenticates callers but cannot access models or storage:

```bash
az role assignment list --assignee "<deployment-managed-identity-object-id>" \
  --query "[].roleDefinitionName" -o tsv
```

Expect **Cognitive Services User** and **Storage Blob Data Reader**. A key in configuration or a
missing role breaks the keyless design at the last step.

**3. The deployed runtime still emits traces.**

Send one authenticated request, then query the workspace behind `APPLICATIONINSIGHTS_RESOURCE_ID`:

```kusto
dependencies
| where timestamp > ago(15m)
| where name startswith "document."
| project timestamp, name, duration, operation_Id
| order by timestamp desc
```

Rows for your request mean those spans survived deployment. No rows require checking the
exporter, destination, runtime configuration, and query window.

## Next module

If the deployed checks pass, the seven-module path has produced a reviewable document workflow.
Any disabled customer posting integration remains unfinished work. Start the
next document decision at [Module 1](01-provision-foundation.md), or extend this workflow with
deployment and operations patterns that fit the next customer decision.
