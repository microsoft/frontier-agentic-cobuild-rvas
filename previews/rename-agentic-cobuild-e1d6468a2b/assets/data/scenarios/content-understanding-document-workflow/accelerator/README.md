# Content Understanding accelerator

Build a document workflow that extracts typed results a person can review against the source. The
accelerator includes safe local fixtures and an optional Bicep foundation for a clean Azure demo
subscription. It supports a pilot. It does not choose a customer's document process or approve a
production deployment.

## What the completed workflow must prove

- Approved documents enter through a defined intake path.
- Each extracted value carries source evidence and confidence.
- Missing, uncertain, or conflicting values reach a person for review.
- Only approved results reach the downstream handoff.
- The deployed workflow rejects an unauthenticated caller.

## Before you start

Install **Azure CLI, the standalone Bicep CLI, Python 3, Bash, and `sha1sum`** for deployment.
The lessons also use `jq` and `curl`. Sign in with an Azure user account in the intended
subscription. You need permission to create resources and role assignments, plus model quota
in the chosen region. The deployment script does not support service-principal sign-in.

**This package supplies infrastructure, an invoice normalizer, and a result-comparison gate.**
The lessons show how to use them with actual extraction results. Customer intake controls,
the review UI, and the posting/deployment adapters still need integration.
The default Bicep deployment does not configure Content Understanding model
mappings. Check the selected analyzer's supported models and
[configure its deployment mappings](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/models-deployments)
before calling it.

**Check the current API surface before writing SDK code.** Content Understanding, Document
Intelligence, Foundry, and their SDKs change quickly. Search current Microsoft Learn guidance and
the relevant Foundry guidance. Do not infer a signature from this accelerator or from memory.

**Use fictional data only.** `sample-data/` contains fixtures for the local exercise. Do not add
customer documents, endpoints, or secrets to this repository.

**Use keyless access.** The reference path uses `DefaultAzureCredential`, managed identity, and
Entra RBAC. Do not put keys in code, `.env`, or Bicep.

## Choose an environment

### Clean-subscription demo

Use a disposable subscription after the customer agrees the pilot boundary. The deployment creates
the foundation for the exercise. Use the supplied fictional fixtures until owners approve a separate
path for customer documents.

### Existing customer environment

Record the approved resource IDs, source boundary, retention rules, and access model. Do not
redeploy this package into customer resources. Apply the lessons and checks to the approved
environment instead.

## The build path

| Module | What you build | Evidence |
|---|---|---|
| 1. Foundation | Keyless Foundry, document services, storage, and observability | Generated `.env` contract and live resources |
| 2. Document source | Approved intake, retention, access, and quarantine design | Signed source and document-boundary decision |
| 3. Extraction choice | Tested extraction capability for the required fields | Capability decision from representative fixtures |
| 4. Typed extraction | Validated result contract with confidence and grounding | Evidence-backed result and low-confidence path |
| 5. Review and handoff | Reviewer correction and approval-gated downstream seam | Correction record and approved handoff |
| 6. Evaluate and trace | Quality and safety gate with traces | Evaluation result and trace for a failed case |
| 7. Deploy | Authenticated endpoint with rollback path | Endpoint rejects an unauthenticated caller |

Complete the modules in order. A successful extraction call is not proof that the result is correct.

## Decisions to make with the customer

| Gate | Decide before building |
|---|---|
| Document boundary | Which document types are approved, who owns them, and which retention rules apply? |
| Extraction boundary | Which fields need evidence, confidence, normalization, and missing-value behavior? |
| Review boundary | Who resolves uncertain or conflicting values, and what evidence must they see? |
| Handoff boundary | Which downstream action is approved, queued, or outside the pilot? |
| Trust boundary | Which extraction, injection, review-routing, and access failures block a pilot? |

## Get started

Run these commands from the repository root:

```bash
az login
./scenarios/content-understanding/accelerator/scripts/deploy.sh rg-content-understanding eastus2
```

The deployment writes `scenarios/content-understanding/accelerator/.env`. Load it before later commands:

```bash
set -a; source scenarios/content-understanding/accelerator/.env; set +a
```

Do not commit it or print bearer tokens in logs.
Each lesson's **Verify** section gives the command and signal for that module.

## Scope and boundaries

- Keep source evidence with every result. Reject values without usable grounding.
- Surface missing values and low-confidence results for review. Do not guess.
- Preserve the original expected result when a reviewer corrects a value.
- Prompt Flow is outside this scenario. Use agents and tools for agent-based handoffs.

## Continue in the scenario

[Module 4](../lessons/04-typed-extraction.md) runs `normalize.py` over a completed invoice
analysis. [Module 6](../lessons/06-prove-and-observe.md) uses `evaluate_results.py` against
reviewed labels. Both keep runtime outputs in the ignored `.runtime/` directory.

Run their offline behavioral checks without Azure:

```bash
python3 -m unittest discover -s scenarios/content-understanding/accelerator -p test_normalize.py
```

These exercise normalization and comparison logic; they do not establish live extraction
accuracy, reviewer authentication, or a customer-system handoff.

See [solution.md](solution.md) for the facilitator reference and integration boundaries.
