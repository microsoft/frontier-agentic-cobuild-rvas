# Module 7 — Deploy the reviewable workflow

The workflow passed the gate. Deploy it without losing the controls that made it safe. Deployment
makes keyless auth, monitoring, and rollback real.

## What you build

An authenticated endpoint that runs the reviewed workflow with a managed identity, Application
Insights monitoring and GenAI tracing, plus a rollback path. Confirm that the endpoint rejects
unauthenticated calls.

## Choose your path

| Option | Runtime | Identity + auth | Rollback | Best when |
| --- | --- | --- | --- | --- |
| A. Hosted agent (`azd ai agent`) | Foundry-hosted container | Managed identity, authenticated endpoint | Pin/swap revision | Your implementation is an agent-based workflow |
| B. Container app / managed online endpoint | Your container | Managed identity + Entra auth | Revision or blue/green | You need custom runtime or scaling control |
| C. API behind API Management | Your API | Entra-validated via APIM | Deployment slots | You are fronting an existing API estate |
| D. Hosted long-running workflow | Background job handle + later retrieval | Managed identity, authenticated submit/poll | Pin/swap revision | Document processing outlives an interactive request |

**Start with the customer's existing application host when it fits.** The preceding modules do
not require an agent. A deterministic extraction/review workflow can remain an application or
worker; do not add an agent to satisfy the hosting example. Choose A for an agent-based build,
B for a customer-owned container runtime, or C when an existing API needs the gateway.

**Choose B** when you need a custom runtime, specific scaling, or network isolation unavailable from
hosting. **Choose C** when the workflow belongs behind an existing API Management estate and its
policies. Every option follows the same rule: **no keys**, managed identity, authenticated endpoint,
monitoring enabled, rollback ready.

**Choose D** only for naturally asynchronous work: overnight intake, a file backlog, or a review
process users submit and check later. Return an opaque job handle, authorize every later
status/result read, and persist state outside the container. Do not add this complexity when a
reviewer expects one document to return while waiting.

**Migration cost.** Moving from A to B or C rehosts the same container and identity model. The
workflow, action-tool seam, and evaluation gate stay unchanged. You can make this decision late
and reverse it.

## Implementation

### Assemble the customer workflow before hosting it

Build one entry point in the customer's private application repository. Connect the actual
components from modules 2–5:

| Boundary | Implementation and result |
| --- | --- |
| Request to intake | Authenticate the caller and authorize the document reference; reject arbitrary unapproved locations. |
| Intake to analysis | Fetch the approved bytes, preserve their hash, submit to the selected analyzer, and retain the completed response. |
| Analysis to review | Run the adapted mapper from module 4 and persist the result. Return a review handle when a person must act. |
| Review to posting | Resume only after authorized approval of the exact reviewed revision. Call module 5's posting adapter and retain its receipt. |
| Response to user | Return the actual status and authorized result location. A pending review or failed posting must not be reported as completed. |

Test that entry point locally against the approved tenant dependencies before packaging it.
Persist review state outside the process and authorize reads of its status. An asynchronous
review should release the HTTP request while the case waits for a person.

### Option A — Host your agent-based workflow

Deploy the reviewed workflow as a hosted agent with managed identity and an authenticated endpoint.
Keep module 6's tracing setup in the runtime. Work in **your application's source directory**,
outside this public repository. Add the hosting wrapper from the current
[deploy-your-own-code guide](https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-deploy-own-code).
Use the wrapper only for protocol handling; its handler must call the workflow entry point above.
Check that guide's language/runtime and role prerequisites before initializing:

```bash
azd auth login
azd ext install microsoft.foundry
azd ai agent init --protocol responses --deploy-mode code
```

Choose **Use an existing Foundry project**, then select module 1's project and model.
Do not create a separate sample agent to count as deployment. The protocol handler must invoke
your document-processing entry point and return its result or review handle. Keep the approval
check in application code, outside model instructions.

Review the generated `azure.yaml`: the service must be hosted, point to your source, and
declare its supported protocol. Set the scenario endpoint variables and telemetry connection
in its runtime configuration. Use the per-agent identity for source reads and the separately
scoped destination operation. Keep raw document content out of telemetry.

From that generated directory:

```bash
azd provision
azd ai agent run
```

Submit the approved test document through the local inspector. Confirm a conflicting
total still reaches review and an approval cannot be replaced by model text. Stop the
local process, then deploy:

```bash
azd deploy
azd ai agent monitor --follow
```

Record the reported endpoint, deployed version, and agent identity. Grant only the required
source/destination roles. Pin the tested version and retain the preceding version for rollback.
Current hosting setup:
<https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-deploy-own-code>

### Option B — Container app / managed online endpoint

Package the application entry point as the runtime's request handler or worker. Use the customer's
deployment pipeline to build and publish its image. Configure runtime identity, source access,
and authenticated ingress; verify those settings against the selected host's capabilities.
Store review state outside the container and connect telemetry at startup.

Deploy a candidate revision, submit the same accepted and rejected documents, then route the
pilot audience to it. Retain a tested previous revision and rehearse rollback. The host-specific
deployment configuration is part of your implementation; the Foundry commands above do not
deploy this branch.

### Option C — API behind API Management

Deploy the workflow API to the customer's approved host first. Configure the gateway's API
operation and token validation, then restrict backend access so callers cannot bypass the
gateway. Authorize document and review access in the application as well.

Run the acceptance request through the gateway, inspect the correlated backend result, and
test a denied caller. Rollback uses the backend host's supported revision mechanism; API
Management is not itself the application host.

### Option D — Long-running processing

Persist a job before acknowledging submission. Return an opaque handle; authorize later status
and result requests against the submitting user's permitted scope. Run extraction in a worker,
then pause for the review decision in persistent state. Implement cancellation and bounded retries.
Prove a worker restart does not lose the case or post twice. Choose this when the actual
processing/review duration requires it, rather than holding a request open.

## Verify

Have an intended user submit an approved document through the deployed channel. Complete any
required review and inspect the resulting destination record or agreed reviewed-result handoff.
Restart the worker or deploy the previous revision and confirm pending cases remain accessible.
**A healthy container or a generic chat response is not the delivery result.**

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
destination and is not a model API key. Confirm that the deployment identity holds its required
roles. Without them, the endpoint authenticates callers but cannot access models or storage:

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

If the deployed checks pass, the seven-module path produced a reviewable document workflow.
Any disabled customer posting integration remains unfinished work. Start the next document decision
at [Module 1](01-provision-foundation.md), or extend this workflow with deployment and operations
patterns that fit the next customer decision.
