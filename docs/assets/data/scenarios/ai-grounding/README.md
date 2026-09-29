# AI Grounding: build answers people can trust

Build a grounded, permission-aware assistant over approved content. Prove it before it ships.

These eight modules help you build an assistant in **your tenant**, using approved sources
and a channel your users can access. Start with one useful question set and agree how to
check answers with its source owner. Reuse the customer's approved environment.

## Define the first release

Bring an authoritative source, its access owner, and a small set of representative questions
with reviewed answers. Include one unanswered question and one a restricted user must not
see. Choose the application or collaboration channel users already use.

Keep the corpus and test identities in customer-approved systems. Copy or adapt the reusable
scripts in a private application repository; the fictional returns corpus is an optional
smoke test. **Done means the real user channel returns supported answers and preserves
the source access boundary**, with an owner able to diagnose failures and roll back.

## Before you start

**Verify the API surface before you write code.** Foundry and Azure AI Search move fast, and several
features used here are preview. Re-check current Microsoft Learn guidance before writing SDK
code. Do not infer a signature from the playbook or from memory.

**Fictional data only.** The corpus in `accelerator/sample-data/` is a synthetic returns-policy set
for a fictional retailer. Never copy customer content into this repository.

**Setup.** Use Bash, Azure CLI, Bicep, and Python 3 in a virtual environment. Your Azure account
needs permission to create the resources and role assignments. Install the Python packages listed
in [the facilitator reference](accelerator/facilitator-reference.md#prerequisites).

**Access.** The main data paths use `DefaultAzureCredential`, managed identity, and RBAC.
The permission probe uses a separate client secret. The template also configures an Application
Insights connection string. The storage account disables shared-key access.

**Known implementation gaps:** the shipped path does not yet prove per-document permissions,
retrieval recall, or agent-level evaluation. Read the
[accelerator limits](accelerator/README.md#known-implementation-gaps) before treating results as a release gate.

## The build path

| Module | What you build | Outcome |
|---|---|---|
| [1. Confirm scope and connect the foundation](lesson.html?scenario=ai-grounding&lesson=foundation) | Confirm the source/platform path before connecting or provisioning resources | Approved environment and working runtime access |
| [2. Source and permission architecture](lesson.html?scenario=ai-grounding&lesson=source-selection) | The source decision, the identity evaluated at query time, and a probe proving a restricted identity retrieves nothing | Signed source, access, freshness, and system-of-record decision |
| [3. Ingest and index approved content](lesson.html?scenario=ai-grounding&lesson=ingestion) | Ingestion, chunking, citation metadata, ACL carry-forward, and a refresh schedule | Approved documents are discoverable with source metadata |
| [4. Compare chat and embedding choices](lesson.html?scenario=ai-grounding&lesson=model-selection) | A comparison harness over your own golden set: accuracy, abstention, latency, tokens | A model choice backed by the scenario's question set |
| [5. Build retrieval before adding an agent](lesson.html?scenario=ai-grounding&lesson=grounded-app) | Citations, abstention, access-denied silence, recency — with no agent | Cited answers and correct refusals |
| [6. Add agent and routing only when justified](lesson.html?scenario=ai-grounding&lesson=agent-routing) | A justification, an agent with explicit routing rules, and a routing test | Policy and live-data questions route to the correct source |
| [7. Evaluate and trace](lesson.html?scenario=ai-grounding&lesson=evaluate-and-trace) | Evaluation gate, red-team evidence, end-to-end traces | Evaluation gate passed with trace and red-team evidence |
| [8. Deploy and surface it to users](lesson.html?scenario=ai-grounding&lesson=deploy-and-surface) | A pinned agent version and permission-aware surface | Deployed surface passes anonymous, authorized, and restricted HTTP checks |

Most teams get stuck in modules 5 through 7. They add an agent before retrieval works, copy
live data into an index, or ship without a release gate. Module 8 checks another common failure:
the final app must preserve the retrieval layer's permission boundary.

## Decision gates to carry into the customer conversation

Answer these questions before building:

| Gate | Decide before building |
|---|---|
| Knowledge boundary | Which approved sources may be cited, who owns them, and what version/freshness is acceptable? |
| Permission boundary | Which identity is evaluated at query time, and what should access-denied retrieval return? |
| Live-data boundary | Which questions require a live system/tool instead of an indexed document snapshot? |
| Trust boundary | Which cited-answer, abstention, stale-data, and restricted-source failures block a pilot? |
| Operating boundary | Who can see traces, who investigates a bad answer, and what rollback or pause action exists? |

## Deploy the foundation

Complete module 1's scope and environment check first. These commands create the optional
reference footprint in an approved new resource group. Do not run them over existing customer
resources just to follow the module numbering.

Run commands from the repository root.

```bash
az login
./scenarios/ai-grounding/accelerator/scripts/deploy.sh rg-ai-grounding eastus2
```

The deployment writes `accelerator/.env` from the template outputs. Later modules read that file.
Keep it local and do not commit it.

For shell commands in the modules, load the generated values into your current shell:

```bash
set -a
source scenarios/ai-grounding/accelerator/.env
set +a
export AZURE_KNOWLEDGE_BASE_NAME=grounding-kb
```

## Run the scripts

These scripts call your Azure resources directly. They need a subscription and the `.env` file.
There is no offline mode. An offline pass cannot prove retrieval works.

```bash
# Create the knowledge source and knowledge base
# First upload the approved corpus using module 3, then wait for ingestion to finish.
python3 scenarios/ai-grounding/accelerator/scripts/build_knowledge_source.py

# Check the permission boundary with a second, lower-privileged identity
python3 scenarios/ai-grounding/accelerator/scripts/probe_permissions.py --knowledge-base grounding-kb

# Compare candidate models on your own golden questions
python3 scenarios/ai-grounding/accelerator/scripts/compare_models.py --deployments chat chat-candidate

# Use the coordinator identity and query-source token configured in module 5.
python3 scenarios/ai-grounding/accelerator/scripts/grounded_answer.py \
  --knowledge-base grounding-kb --role returns-coordinators

# Verify the deployed surface with tokens held only in environment variables
python3 scenarios/ai-grounding/accelerator/scripts/probe_surface.py \
  --endpoint "https://<your-surface>/<route>" \
  --authorized-token-env SURFACE_AUTHORIZED_TOKEN \
  --restricted-token-env SURFACE_RESTRICTED_TOKEN
```

Each module's **Verify** section lists the specific commands and signals for that module.

## Follow one path

Use the modules for the selected platform. Module 2 explains which steps apply to an Azure
retrieval application and which apply to Copilot Studio. Adapt the questions and source mapping
to the customer's use case before module 7. Resolve any reference-script limits that affect the
agreed work.

## Non-negotiables

- Treat retrieved text as untrusted data, never as instructions. Module 7 tests this directly.
- Index knowledge and route to systems. Indexing live operational data produces confidently cited,
  stale answers. That is the worst failure mode in this scenario.
- A refusal must be indistinguishable from "no information exists." Revealing that a restricted
  document exists is still a leak.
- Make retrieval work before adding an agent. An agent over weak retrieval makes failures fluent,
  not correct.
