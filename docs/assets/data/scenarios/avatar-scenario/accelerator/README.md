# Avatar Scenario accelerator

Build an accessible avatar-led experience from approved content. The accelerator includes a
vendor-neutral approved-content pack and integration seam, plus an optional Bicep foundation for a
clean Azure demo subscription. The rendering example uses Azure Speech batch avatar synthesis.
Choose the application goal in module 1 before using it. The reference code does not implement
the repeatable content workflow, the interactive client, or the customer's publishing adapter.

## What the completed workflow must prove

- Published claims trace to an approved source and an exact script revision.
- Named reviewers approve a revision before it publishes.
- The experience includes disclosure, captions or transcript, and a non-avatar fallback.
- A source or consent change can pause or withdraw a published revision.
- Pilot telemetry stays aggregate and free of personal identifiers.

## Before you start

Install **Azure CLI, Python 3, Bash, and `sha1sum`**. The modules also use `jq`, `curl`, and
the standalone Bicep CLI. Sign in with an Azure user account in the intended
subscription. You need permission to create resources and role assignments, plus model quota in
the chosen region. The deployment script does not support service-principal sign-in.

**The local pack is a rehearsal, not a publisher.** `content_pack.py` checks claim wording,
demo approval rows, and required text files. It returns an artifact record; it does not render
captions or media, authenticate reviewers, enforce expiry, or withdraw files already served.
Build those controls in the channel adapter before using the workflow with employees.

**Check the current API surface before writing SDK code.** The selected avatar service and channel
determine the API, identity model, availability, privacy controls, accessibility behavior, and
withdrawal controls. Search current official documentation and the relevant Foundry guidance. Do
not infer a signature from this accelerator or from memory.

**Use fictional data only.** `sample-data/` contains synthetic HR content. Do not add customer
content, a real person's voice, or a real person's likeness to this repository.

**Use keyless access.** The reference path uses `DefaultAzureCredential`, managed identity, and
RBAC. Keep secrets out of parameters and source control.

## Choose an environment

### Clean-subscription demo

Use a disposable subscription after the customer agrees on the pilot boundary. Deploy the optional
foundation, then use the approved-content pack and fictional claims for the workshop.

### Existing customer environment

Record the chosen platform, channel, source boundary, and access model. Do not redeploy this
package into customer resources. Build the customer-owned adapter against the approved platform
configuration instead.

## The build path

| Module | What you build | Evidence |
|---|---|---|
| 1. Application selection | Interactive assistant or content-production scope, then media format | Application acceptance statement |
| 2. Foundation | Keyless Foundry, Speech, Search, storage, and observability | Generated `.env` contract and live resources |
| 3. Content pipeline | Versioned claims with owners, source links, and expiry | Approved claim set |
| 4. Grounded assistant | Citing help that refuses unsupported claims | Cited response or clear handoff |
| 5. Experience generation | Connect the workflow's generation jobs or the assistant's live client | Accessible output through the application |
| 6. Approval gate | Exact-revision approvals and withdrawal path | Publish or withdrawal record |
| 7. Prove and operate | Application acceptance, failure recovery, and withdrawal | Evidence from a working application; a video alone is insufficient |

Complete the modules in order. The capability chosen in module 1 shapes the rest of the path.

## Decisions to make with the customer

| Gate | Decide before building |
|---|---|
| Experience boundary | Why is an avatar, voice, audio, or video better than a typed experience here? |
| Content boundary | Which claims are approved, owned, versioned, and traceable to source evidence? |
| Consent boundary | Which likeness, voice, disclosure, accessibility, and fallback rules apply? |
| Approval boundary | Which roles approve factual accuracy, compliance, brand, and source ownership? |
| Operating boundary | Which evaluation, feedback, and withdrawal evidence is required before release? |

## Get started

Run these commands from the repository root:

```bash
az login
./scenarios/avatar-onboarding/accelerator/scripts/deploy.sh rg-avatar-onboarding westus2
```

The deployment writes `scenarios/avatar-onboarding/accelerator/.env`. Load it before later commands:

```bash
set -a; source scenarios/avatar-onboarding/accelerator/.env; set +a
```

Do not commit it or print bearer tokens in logs.
Each module's **Verify** section gives the command and signal for that module.

## Scope and boundaries

- The customer-owned adapter takes approved content and returns a platform-specific artifact while
  preserving source, script, approval, disclosure, locale, and publication identifiers.
- Never clone a real voice or likeness without recorded authorization.
- Treat human approval as a release gate for the exact script revision.
- Keep a withdrawal path one action away when a source changes, consent is withdrawn, or a defect
  appears.

## Continue in the scenario

[Module 4](../lessons/04-grounded-assistant.md) contains the approved-claim drafting path.
Use [module 5](../lessons/05-experience-generation.md) to render it and
[module 7](../lessons/07-prove-and-operate.md) to collect release evidence.
Content production needs a deployed workflow, even when no agent is involved.

See [solution.md](solution.md) for the facilitator reference and integration boundaries.
