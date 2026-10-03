# AI Grounding accelerator

Build a grounded assistant that answers from approved content and respects the caller's access
boundary. The accelerator includes a fictional corpus, reusable scripts, and an optional Bicep
foundation for a clean Azure demo subscription. It supports a pilot. It does not create an
enterprise landing zone or approve production.

## What the pilot must prove

- Approved content can be found and cited.
- A restricted caller cannot learn that protected content exists.
- The assistant abstains when the source cannot support an answer.
- Live-data questions route to the system of record rather than a stale index.
- The deployed application preserves the same access boundary as retrieval.

## Known implementation gaps

**Do not treat the shipped scripts as a complete release gate.** The blob path does not map the
fictional role labels to per-document Azure permissions. `grounded_answer.py --role` selects
questions for one caller and reports citation hit rate; it does not measure retrieved passages.
Module 7 uses `capture_answers.py` to select a role's questions and invoke retrieval or a pinned
agent, then `evaluate_answers.py` to grade the captured answers against the native JSON case set.
The role flag selects questions only; callers still need actual test identities and access mappings.

Close these gaps before a permission-aware pilot can pass the stated gates.
The model comparison only scopes local prompt context by fixture role. A finite list of text markers
cannot prove every leak is absent.

**Surface probe transport.** `probe_surface.py` accepts HTTP and follows redirects with its
authorization header. Do not send real tokens until HTTPS-only requests and safe redirect handling
are enforced. A redirect can forward a token to another origin.

## Before you start

**Check the current APIs before writing SDK code.** Foundry and Azure AI Search change
quickly, and several features used here are preview. Search current Microsoft Learn guidance
and the relevant Foundry guidance. Do not infer a signature from this accelerator or from memory.

**Use fictional data only.** `sample-data/` contains a synthetic returns-policy set for a fictional
retailer. Keep customer content out of this repository.

**Access.** The main data paths use `DefaultAzureCredential`, managed identity, and RBAC.
The permission probe uses a separate client secret; the template also configures an Application
Insights connection string. Storage shared-key access is disabled.

## Choose an environment

### Clean-subscription demo

Use a disposable subscription after the customer agrees to the pilot boundary. The deployment creates
the demo foundation. Then replace the fictional corpus through the agreed source and permission
process.

### Existing customer environment

Record the approved resource IDs, source boundary, and access model. Do not redeploy this package
into customer resources. Apply the modules and checks to the approved environment instead.

## The build path

| Module | What you build | Evidence |
|---|---|---|
| 1. Foundation | Foundry, chat and embedding deployments, AI Search, storage, and observability | Generated `.env` contract and live resources |
| 2. Source and permissions | Source, freshness, system-of-record, and query-time identity decisions | Restricted caller retrieves no title, snippet, or count |
| 3. Ingest and index | Approved documents, metadata, and ACL carry-forward | Discoverable documents with source metadata |
| 4. Compare models | A comparison over the golden questions | Chosen chat and embedding deployments |
| 5. Grounded retrieval | Cited answers, abstention, and access-denied behavior | Citation, abstention, and recall results |
| 6. Agent and routing | An agent only where it adds value, plus live-data routing | Policy and live questions reach the right source |
| 7. Evaluate and trace | Release gate, red-team cases, and request traces | Evaluation result and trace for a failure |
| 8. Deploy to the user channel | A pinned version behind a permission-aware endpoint | Anonymous, authorized, and restricted HTTP checks |

Complete the modules in order. Add an agent only after retrieval passes its tests.

## Decisions to make with the customer

| Gate | Decide before building |
|---|---|
| Knowledge boundary | Which sources may be cited, who owns them, and what freshness is acceptable? |
| Permission boundary | Which identity is evaluated at query time, and what does access-denied retrieval return? |
| Live-data boundary | Which questions need a live system instead of an indexed document snapshot? |
| Trust boundary | Which citation, abstention, stale-data, and restricted-source failures block a pilot? |
| Operating boundary | Who sees traces, investigates bad answers, and pauses or rolls back a release? |

## Get started

Run these commands from the repository root:

```bash
az login
./scenarios/ai-grounding/accelerator/scripts/deploy.sh rg-ai-grounding eastus2
```

The deployment writes `accelerator/.env`. Later modules use that local file. Do not commit it.
Load it into your shell before running commands that use `$AZURE_*` variables:

```bash
set -a
source scenarios/ai-grounding/accelerator/.env
set +a
export AZURE_KNOWLEDGE_BASE_NAME=grounding-kb
```

Each module's **Verify** section gives the command and signal for that module.

To check helpers and fixtures offline, run
`python3 -B scenarios/ai-grounding/accelerator/scripts/test_offline.py`.
These checks do not verify Azure retrieval or permissions.

## Scope and boundaries

- Treat retrieved text as data, never as instructions. Module 7 tests indirect prompt injection.
- Index knowledge. Route to live systems. An indexed snapshot can give a confidently cited but stale
  answer.
- A denial must not reveal that a protected document exists.
- Pin the agent version in application configuration. Do not send users to a debugging version.

## Continue in the scenario

[Module 7](../lessons/07-evaluate-and-trace.md) contains the capture and gate commands.
It keeps coordinator and supervisor outputs separate under the ignored `.runtime/` directory.
The reports check response contracts, not semantic correctness or retrieval recall.
Use [module 8](../lessons/08-deploy-and-surface.md) for application integration and hosting steps.

Use the [facilitator reference](facilitator-reference.md) to prepare the engagement.
