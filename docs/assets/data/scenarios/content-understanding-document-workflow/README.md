# Content Understanding: turn documents into reviewable decisions

Build a workflow from an invoice, RFQ, or specification to a typed result a person can check.
The workflow keeps source evidence and never makes a business decision by itself. Each module
compares Microsoft options, recommends a default, and shows when another approved service fits.

Build one document workflow in your tenant. Start with one document type, its owner, and the
team that uses the result. Decide which fields to extract and what happens after review. The
[facilitator reference](accelerator/facilitator-reference.md) includes validation code and optional
invoice fixtures for local development.

## Build in your environment

Select an approved document source and processing identity. Keep the documents and their reviewed
labels in the customer's approved storage, outside this repository. Build the source connector and
posting adapter in the customer's private application repository.

Agree whether the first release ends at a human-reviewed result or writes to a business system.
If it writes downstream, the team must show the destination receipt and prove a retry cannot
create a duplicate. A local review record does not complete that integration.

## The seven modules

| Module | You decide | Outcome |
|---|---|---|
| [1. Confirm scope and connect the foundation](lesson.html?scenario=content-understanding-document-workflow&lesson=foundation) | Which services the document class and intended action need | Approved environment and working runtime access |
| [2. Connect an approved source](lesson.html?scenario=content-understanding-document-workflow&lesson=document-source) | Which source adapter and intake controls to implement | Authorized intake and rejection evidence |
| [3. Select the extraction capability](lesson.html?scenario=content-understanding-document-workflow&lesson=extraction-selection) | CU prebuilt/custom analyzer, DI prebuilt/custom model, LLM structured outputs, or multimodal | Chosen extraction capability and why |
| [4. Typed extraction with evidence](lesson.html?scenario=content-understanding-document-workflow&lesson=typed-extraction) | How to normalize output into one validated contract with confidence + grounding | Structured extraction result and low-confidence failure path |
| [5. Review, correction, and handoff](lesson.html?scenario=content-understanding-document-workflow&lesson=human-review) | Where reviewers work, then how approved results reach the destination | A completed review and authorized handoff |
| [6. Evaluate and trace](lesson.html?scenario=content-understanding-document-workflow&lesson=prove-and-observe) | Foundry evaluators, an offline test suite, and an adversarial pass against agreed thresholds | Scenario evaluation gate and trace review |
| [7. Deploy the workflow](lesson.html?scenario=content-understanding-document-workflow&lesson=deploy) | Hosted agent, container app, or an API behind APIM | Pilot deployment with access controls |

Module 1 checks scope and the intended extraction path before provisioning. Module 3 confirms that
choice against representative documents. Carry the same source and result contract through review
and deployment; the invoice-specific mapper needs adaptation for another document class.

## Decision gates to carry into the customer conversation

Answer these questions before building:

| Gate | Decide before building |
|---|---|
| Document boundary | Which document types are approved, who owns them, and what retention/access rules apply? |
| Extraction boundary | Which fields need evidence, confidence, normalization, and missing-value behavior? |
| Review boundary | Who corrects low-confidence or conflicting values, and what evidence must they see? |
| Handoff boundary | Which downstream action is allowed, approval-gated, queued, or explicitly out of scope? |
| Trust boundary | Which extraction, prompt-injection, review-routing, and deployment-access failures block a pilot? |

## Follow one path

The modules cover extraction, review, evaluation, and deployment. Keep the same documents and
result contract throughout. A customer-system posting API and a production review UI remain
customer-specific integrations; a sample approval record does not supply either.

## Get started

Begin with [module 1](lesson.html?scenario=content-understanding-document-workflow&lesson=foundation) and the approved environment owner.
Reuse existing resources; deploy the optional reference template only after reviewing what the
chosen analyzer actually needs. Each Verify section identifies the evidence to collect from
your connected application.

API facts (API versions, model ids, SDK packages) are cited inline in each module and in
[`accelerator/facilitator-reference.md`](accelerator/facilitator-reference.md). Check current Microsoft Learn guidance
before writing SDK code.

## Non-negotiable boundaries

- **Keep customer data in the tenant.** The repository fixtures are fictional. Use representative
  customer documents only through a path approved by the source and security owners, with agreed
  retention. Never copy them into this public repository.
- **Keyless-first.** `DefaultAzureCredential` + managed identity + Entra RBAC. No keys in code, `.env`,
  or Bicep.
- **Keep source evidence.** Every extracted value keeps its confidence and grounding.
  Reject a value without evidence and route a missing value for review. Never guess.
- Use agents and tools for agent-based handoffs; Prompt Flow is outside this scenario.
