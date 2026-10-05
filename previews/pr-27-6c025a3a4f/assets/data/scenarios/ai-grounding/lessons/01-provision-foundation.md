# Module 1. Confirm scope and connect the grounding foundation

Bring the first user task, its source owner, and the channel where people need answers.
**Confirm the platform path before provisioning.** Review module 2's source choices now:
if the build belongs in Copilot Studio, do not create an Azure retrieval stack.

For an Azure build, use approved existing resources first. Agree a provisional chat and
embedding choice with the platform owner before ingestion; module 4 measures and confirms
those choices. A later embedding change requires a separate index or reingestion.

## What you build

A verified connection to the resources your selected build needs. The Azure reference
footprint below is one option, not a requirement for every source/platform choice:

| Resource | Why grounding needs it |
| --- | --- |
| Foundry account (`AIServices`) + project | Hosts models, agents, and the connections everything else uses |
| Chat deployment | Answers questions **and** performs agentic query planning |
| Embedding deployment | Vectorizes approved content for vector/hybrid retrieval |
| Azure AI Search (semantic ranking on) | Backs the knowledge base and agentic retrieval pipeline |
| Storage account + `approved-content` container | The approved corpus a blob knowledge source ingests |
| Log Analytics + Application Insights | Traces and evaluation correlation from module 7 |
| Role assignments | Keyless access between search, project, models, and storage |

Later modules use the generated `.env` file. It must contain no secrets.

## Choose your path

| Option | Reproducible | Creates embedding + storage | Best when | Cost while idle |
| --- | --- | --- | --- | --- |
| A. Scenario Bicep reference | Yes, reviewable IaC | Yes | A new footprint reviewed by the platform owner | Review service tiers and deployment SKUs |
| B. `azd up` (kit root infra) | Yes | No: chat + Search only, no storage/embedding | You are running the whole Agentic Co-build repository end to end | Same, plus ACR |
| C. Foundry portal | No | Manual | A throwaway demo, or a free-tier Search proof of concept | Lowest; free Search tier possible |
| **D. Existing approved environment** *(preferred)* | Customer's IaC | Confirm what exists | The customer already has governed resources | Confirm capacity and incremental usage |

**Prefer D when the platform team provides an approved environment.** Map its endpoints and
deployment names into your application configuration. Test from the intended runtime network
and identity; changing environment variables alone does not establish permission or connectivity.

Use A for an approved new footprint after reviewing the template with the platform team. B adds
the shared kit infrastructure and may provision components this use case does not need. C helps
check a capability, but capture the resulting configuration in the customer's normal deployment
process before relying on it.

### Region and model availability come first

Agentic retrieval and model availability vary by region. Check both **before** deploying.
`az cognitiveservices account list-skus` lists account SKUs, not model availability.
Use the [model deployment guidance](https://learn.microsoft.com/azure/ai-foundry/how-to/create-manage-deployments)
and region-support reference below.

- Agentic retrieval region support: <https://learn.microsoft.com/azure/search/search-region-support>
- Query-planning models supported by a knowledge base: `gpt-4o`, `gpt-4o-mini`,
  `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano` on
  `2025-11-01-preview` and `2026-05-01-preview`; `gpt-5.1`, `gpt-5.2`, `gpt-5.4`, `gpt-5.4-mini`,
  `gpt-5.4-nano` on `2026-05-01-preview` only. Source:
  <https://learn.microsoft.com/azure/search/agentic-retrieval-how-to-create-knowledge-base>

> **Search tier matters.** The free tier cannot use a managed identity to reach your models. Use
> **Basic or higher** for anything past a portal demo.

## Implementation

### Confirm your environment and access

Record the chosen source and first user channel in the existing backlog. Have the
environment owner identify the subscription, network boundary, and runtime identity. Grant
only the access required for the chosen ingestion and query paths.

For Copilot Studio, confirm the approved Power Platform environment and the creator's access,
then continue with module 2 option C. For Azure, follow D below when resources exist; otherwise
review A before deployment. Do not upload customer content until the source owner approves it.

### Option A. Scenario Bicep reference

The template is [`accelerator/main.bicep`](../accelerator/main.bicep); defaults live in
[`accelerator/parameters.example.json`](../accelerator/parameters.example.json).

Run commands from the repository root.

```bash
az login
az account set --subscription "<subscription-id>"

# Compile before you deploy — catches schema errors without touching Azure.
bicep build scenarios/ai-grounding/accelerator/main.bicep --stdout > /dev/null

./scenarios/ai-grounding/accelerator/scripts/deploy.sh rg-ai-grounding eastus2
```

`deploy.sh` creates the resource group, validates and deploys the template, then writes
`accelerator/.env` from its outputs. It passes your signed-in object ID as `principalId`, giving you
keyless data-plane access without issuing a key.

Load the generated contract before running shell commands in this or later modules:

```bash
set -a
source scenarios/ai-grounding/accelerator/.env
set +a
export AZURE_KNOWLEDGE_BASE_NAME=grounding-kb
```

What the template does and why:

```bicep
// Keyless-first: shared key access is OFF, so ingestion must use Entra ID.
allowSharedKeyAccess: false

// Semantic ranking is required by agentic retrieval.
semanticSearch: 'standard'

// Search calls your embedding/chat models during ingestion and query planning,
// so its managed identity needs Cognitive Services User on the Foundry account.
resource searchToFoundryRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: foundry
  properties: {
    principalId: search.identity.principalId
    roleDefinitionId: roleCognitiveServicesUser
  }
}
```

To deploy into an existing resource group without creating one, skip the script:

```bash
az deployment group create \
  --resource-group <existing-rg> \
  --template-file scenarios/ai-grounding/accelerator/main.bicep \
  --parameters @scenarios/ai-grounding/accelerator/parameters.example.json \
  --parameters principalId="$(az ad signed-in-user show --query id -o tsv)"
```

### Option B. `azd up` (kit root infra)

Use when you want the shared footprint every activity in the kit uses.

```bash
azd auth login
azd up          # provisions infra/main.bicep + infra/resources.bicep
azd env get-values > scenarios/ai-grounding/accelerator/.env
```

The root infra provisions Foundry + project + **chat** deployment + AI Search + observability + ACR.
It does **not** create an embedding deployment or the approved-content container. Add them before
module 3:

```bash
RG=$(azd env get-value AZURE_RESOURCE_GROUP)
ACCOUNT=$(azd env get-value AZURE_AI_FOUNDRY_NAME)

az cognitiveservices account deployment create \
  --resource-group "$RG" --name "$ACCOUNT" \
  --deployment-name embedding \
  --model-name text-embedding-3-large --model-version 1 --model-format OpenAI \
  --sku-name Standard --sku-capacity 30

az storage account create --resource-group "$RG" --name "st${RANDOM}grnd" \
  --sku Standard_LRS --allow-shared-key-access false
```

Then append `AZURE_AI_EMBEDDING_DEPLOYMENT_NAME`, `AZURE_STORAGE_ACCOUNT_NAME`, and
`AZURE_STORAGE_CONTAINER_NAME` to the `.env` file.

### Option C. Foundry portal

For a same-day demo or a zero-cost proof of concept.

1. Open the Foundry portal at <https://ai.azure.com>.
2. Create a project. A Foundry account is created for you.
3. Open **Build → Models** and deploy one chat model and one embedding model.
4. Open **Build → Knowledge** and create or connect a search service that supports agentic retrieval.
   The portal offers a free Search tier for proof-of-concept work.
5. Record the project endpoint and deployment names into `accelerator/.env` by hand.

This path has no deployment template and uses generated names. The platform team has no template
to review, and the free Search tier cannot use managed identity for model access.
Treat this setup as disposable.

### Option D. Bring your own landing zone

Verify the existing resources and fill the same configuration contract without creating new ones.

```bash
# Discover what the customer already has.
az cognitiveservices account list --query "[?kind=='AIServices'].{name:name,rg:resourceGroup,loc:location}" -o table
az search service list --query "[].{name:name,rg:resourceGroup,sku:sku.name,semantic:properties.semanticSearch}" -o table
```

Then confirm the four things this scenario needs:

1. The Foundry account has `allowProjectManagement: true` (otherwise it is not a Foundry account).
2. Search is **Basic or higher** with semantic ranking enabled.
3. Search's managed identity holds **Cognitive Services User** on the Foundry account.
4. Your identity holds **Search Service Contributor** and **Search Index Data Contributor**.

```bash
# Check 1
az cognitiveservices account show -g <rg> -n <account> --query properties.allowProjectManagement

# Check 3 — assign if missing
SEARCH_MI=$(az search service show -g <rg> -n <search> --query identity.principalId -o tsv)
az role assignment create --assignee-object-id "$SEARCH_MI" --assignee-principal-type ServicePrincipal \
  --role "Cognitive Services User" \
  --scope $(az cognitiveservices account show -g <rg> -n <account> --query id -o tsv)
```

Write the discovered values to `accelerator/.env` with the variable names from the template outputs.
Modules 2–7 then work the same across all four options.

## Verify

Check these three things before building on this foundation.

**1. Both model deployments exist.**

```bash
az cognitiveservices account deployment list \
  --name "$AZURE_AI_FOUNDRY_ACCOUNT_NAME" --resource-group "$AZURE_RESOURCE_GROUP" \
  --query "[].name" -o tsv
```

You should see the names set for `AZURE_AI_MODEL_DEPLOYMENT_NAME` and
`AZURE_AI_EMBEDDING_DEPLOYMENT_NAME`. If either is missing, later modules fail with a
deployment-not-found error that looks like a code bug.

**2. Search answers your Entra identity, with no key anywhere.**

```bash
TOKEN=$(az account get-access-token --scope https://search.azure.com/.default --query accessToken -o tsv)
curl -s -H "Authorization: Bearer $TOKEN" \
  "$AZURE_SEARCH_ENDPOINT/indexes?api-version=2024-07-01" | head -c 200
```

A `200` with a JSON body means role-based access works. A `403` means your account lacks **Search
Service Contributor** or **Search Index Data Contributor**. Grant the role instead of falling back
to an admin key, or you will carry that key to production.

**3. The environment contract holds no secrets.**

```bash
grep -iE 'api_key|account_key|connection_string|sas_token' scenarios/ai-grounding/accelerator/.env
```

Expect no output. Investigate any match before continuing.

## Next module

[Module 2. Select the source and permission architecture](02-source-and-permission-architecture.md)
decides where trusted content comes from and whose permissions apply at query time.
