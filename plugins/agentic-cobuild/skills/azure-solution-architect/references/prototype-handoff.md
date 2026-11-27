# Prototype handoff

Use only after step 3's explicit opt-in. The five reconciled architecture files
remain authoritative; the prototype illustrates them rather than changing them.

## Scope the Wireframer invocation

Load the installed `wireframer` skill from `agilek/wireframer-skill`. Pass the
confirmed actors, channel, first journey, relevant requirement and acceptance IDs,
and required review, error, and empty states from the architecture package.
Make the confirmed scenarios (`SC-###` in `docs/architecture/visuals/`)
clickable paths, and label each path with its scenario ID.
For an existing or platform-managed interface, illustrate that experience rather
than proposing a new production channel. A background-only journey can show
its agreed inputs and outputs without adding a user interface to the architecture.

Use `docs/architecture/prototype/` in the customer's selected repository as the
prototype workspace. Keep all generated UI, assets, and Wireframer's persistent
context rules inside that directory; its initialization must not append prototype
aesthetics to the application's root instruction files.

Prefer a standalone HTML/CSS/JavaScript prototype with no build step. Keep any
prototype-only dependencies local to that directory. Preserve application source,
root dependency manifests and lockfiles, tests, IaC, and cloud resources.
Use synthetic fixtures and simulated actions only: no live authentication,
business APIs, model calls, data writes, provisioning, or deployment.
Label the result as a low-fidelity prototype, not a working application.

## Validate and hand back

Use available local tools to check screen navigation, simulated interactions,
and the confirmed journey's acceptance states. Report what was actually checked
and any unavailable preview or browser validation. Record the entry file, how to
open it, mapped requirement IDs, and limitations in the existing lifecycle record.
If the prototype exposes a material design change, return to the affected
discovery or review gate before updating the architecture baseline.

Complete when the clickable prototype and its validation evidence are recorded,
or a concrete blocker is recorded. Return to the creator's final handoff.
This optional deliverable does not authorize production implementation; the user
still starts that workflow separately.
