---
name: cloud-architecture-diagram
description: Create, edit, or review Azure and Microsoft ecosystem architecture, GitHub CI/CD, and auth/API diagrams as editable draw.io files; resolve Microsoft and GitHub icons. Use for architecture visualization, diagram critique, or missing icons. Azure DevOps only when explicitly requested. Not for competing-cloud architecture, deployment, live discovery, security certification, or unrelated charts.
metadata:
  version: "1.1.0"
  contributors:
    - Paolo Montagna (adapter)
    - Marco Olivo (adapter)
    - Thomas Thornton (original work)
  source-name: drawio-mcp-diagramming
  source-last-updated: "2026-05-19"
compatibility: Python 3.10+ for local XML generation; optional draw.io desktop for rendering and Pillow for PNG trimming. Hosted draw.io MCP and public GitHub access are separate opt-in integrations, not required dependencies.
---

# Cloud Architecture Diagram

Adapted by Paolo Montagna from original work by Thomas Thornton.
Further adaptation by Marco Olivo. See
[source and asset terms](references/REFERENCE.md#source-and-asset-terms) for
provenance and the separate artwork restrictions.

Create accurate, readable diagrams from facts the user supplies. The supported
scope is Azure, the Microsoft ecosystem, and GitHub; confirm the actual products
rather than inferring them. Azure DevOps is supported only when explicitly
requested. Keep GitHub names and artwork distinct from Azure DevOps; a GitHub
repository, Actions workflow, or Copilot component keeps its own identity.
The name describes the outcome;
**draw.io is the editable file format and optional editor/renderer**, not a
technology-independent runtime.

## Inputs and outputs

Establish the components and relationships, audience/detail level, and desired
format. For Azure topology, also establish the verified network/service
deployment model. For artifact writes, establish a writable
output directory. For edits or reviews, identify the existing `.drawio`, any
generator, the requested scope, and which file is authoritative. Read only
user-authorized inputs.

When architecture facts or permissions are missing, report the specific gaps. Ask
for them when interactive; otherwise deliver a clearly labelled incomplete draft
when enough facts exist, with unknowns explicit. Take resources, CIDRs, ports,
redundancy, private access and credentials from the user's facts. A synthetic
example is not a discovered customer architecture.

Creation and editing produce an editable `.drawio`, optionally a user-owned
Python generator, and requested PNG/SVG/PDF exports when an approved renderer is
available. Review-only work produces findings without modifying the source.
Report file paths, assumptions, source facts, missing components/icons, and the
exact review status. XML validation is not evidence of visual correctness or
cloud security.

Out of scope: provisioning infrastructure, enumerating live subscriptions,
deploying services, certifying security/compliance, competing-cloud or
competing-product architecture, and unrelated statistical charts. Explain the
scope gap without accessing cloud accounts, relabelling a competing product as
Azure, or silently dropping a supplied component.

## Tools, permissions, and privacy

| Capability | Prerequisites and access |
|---|---|
| Local `.drawio` generation (default) | Python 3.10+ standard library; read access to this skill and approved inputs, write access to the requested output directory. No network, credentials, MCP, or Python package required. |
| Local rendering | Separately installed, organization-approved draw.io desktop CLI; local executable/display support appropriate to the platform (Linux Electron may need an existing display or approved virtual display). Export commands are in [export-and-checks.md](references/export-and-checks.md). |
| Independent review | A read-only `explore` subagent that inspects the generated `.drawio` and any local PNG/SVG exports. It receives only user-approved local artifact paths and architecture facts, edits nothing, and has no cloud access. |
| Optional PNG trim | Pillow from [requirements.txt](requirements.txt), installed explicitly in an approved isolated environment. Modifies the selected PNG in place; keep a copy when needed. |
| Optional hosted MCP | Organization-approved `https://mcp.draw.io/mcp` and discovered `drawio/create_diagram` capability; network access and any authentication that service requires. Inspect its current tool schema for arguments. |
| Optional catalog refresh | Offline comparison against a supplied icon pack; the public GitHub search helper separately requires explicit `--allow-network`, HTTPS, and no token. Maintainers review candidates outside the installed skill; this is not a normal diagram step. |

Keep MCP configuration out of Baseline, shared runtime configuration unchanged,
and dependency installs explicit. Hosted MCP calls and browser uploads need
organization approval **and explicit user consent to transmit the exact diagram
content**, including embedded images and labels. Customer architecture, secrets,
tokens, internal identifiers and source files stay local unless the user approves
the redacted payload. Auth-flow examples use placeholder tokens. Approval to
diagram locally is not upload consent.

When MCP is unavailable or not approved, generate XML locally and say hosted
editing was not used. When rendering or export is unavailable, deliver the local
`.drawio` marked **not visually reviewed; export not produced**, and report the
missing capability as missing. Distinguish an unavailable renderer from rendering
that was not requested or was prohibited; neither requires a renderer probe.

## Locate installed resources

Resolve `SKILL_DIR` to the **absolute directory of this loaded SKILL.md**, not the
repository cwd or a guessed installation path. All references, scripts, and assets
below are relative to that directory. Treat the installed skill as read-only and
write generators, exports, and refresh candidates to the user's output area.

## Workflow

Choose the branch before taking action:

| Request | Route |
|---|---|
| Create | Follow steps 1-8. |
| Edit | Confirm the authoritative input in step 1, change only the requested content on an authorized copy, then follow steps 5-8. Use steps 2-4 only for new or changed content. |
| Review only | Confirm the supplied artifacts and review scope, then follow steps 5-8 without rebuilding or repairing the source. Use existing exports; create an export only when requested and permitted. Return findings and proposed repairs, not edits. |
| Icon lookup only | Follow the icon procedure in step 3 and return the mapping or coverage gap; no diagram or review gate is needed. |

1. **Confirm** inputs, scope, privacy, and architecture facts. For existing
   diagrams, work on a copy unless overwrite is authorized, and preserve unrelated
   pages, IDs, layout, and edits. The builder creates new files with one or more
   pages; it neither edits nor synchronizes an existing file, so rebuild an
   existing diagram only from a complete description. Account for every named
   external system and channel in the supplied scope or integration ledger. A
   destination does not establish its adapter: show a missing mechanism as an
   unresolved draft fact and request the architectural decision. Preserve
   confirmed identities, permissions, ownership and trust boundaries.
2. **Choose** the topology or temporal flow from
   [topology-patterns.md](references/topology-patterns.md): deployment boundaries,
   Azure examples, and auth/API/pipeline patterns.
3. **Resolve icons locally when artwork is used.** Plain flows and diagrams
   using only labelled generic shapes skip catalog lookup. For Microsoft or GitHub
   artwork, follow [builder-api.md#icons](references/builder-api.md#icons), the
   authoritative lookup procedure. Done when every component using artwork has a
   `resolve_component_icon` result (exact icon, family/generic symbol, or labelled
   box) or a recorded coverage gap. Keep its canonical label and report non-product
   mappings. Every bundled Azure SVG has an `azure:<slug>` catalog ID; GitHub
   artwork uses separate `github:*` IDs.
   Check the selected creator pattern or runtime in
   `references/architecture-icon-coverage.json`; those are coverage candidates, not
   a required service composition. An unknown component is an explicit
   error: propose a labelled shape and record the gap, so the diagram never shows
   another product's icon or drops the component. Artwork comes from the bundled
   catalog, never from per-invocation fetches.
4. **Build** with [scripts/drawio_builder.py](scripts/drawio_builder.py), using
   arithmetic spacing and embedded local SVGs; generic shapes need no image lookup.
   Lay out per [design-conventions.md](references/design-conventions.md). Keep
   facts separate from layout choices. Frames use absolute coordinates and
   `parent="1"`: visual nesting is not semantic mxGraph grouping.
5. **Validate** the saved XML with the builder's `validate_file`. Done when page
   IDs are unique, cell IDs and parent/edge references resolve page-locally,
   `as="geometry"` is present, page dimensions, labels and standalone images are
   correct. See [standalone-file-requirements.md](references/standalone-file-requirements.md).
   On any helper exception, report the failing input/path and cause, and correct it
   before continuing when editing is authorized. In review-only work, record a
   source defect as a finding and continue only the checks supported by the
   available evidence; preserve the supplied file.
6. **Render** locally when requested and available, then inspect the export; repair
   overlaps with [layout-antipatterns.md](references/layout-antipatterns.md),
   iterating on user-owned artifacts only when editing is authorized. Record
   rendering as **not requested**, **prohibited**, **unavailable** (including a
   failed export and its cause), or **completed** with inspected export paths.
   Only requested, permitted rendering warrants a capability check or attempt.
7. **Critique** independently per [review-contract.md](references/review-contract.md),
   after validation and the rendering decision. Done when every critique category
   is recorded as passed, finding, non-applicable, or blocked, and no blocking or
   material finding remains, two repair passes have completed, or the review-only
   report is complete. The contract defines gate outcomes, the reviewer, the
   recheck and the report.
8. **Deliver** paths and review status. Keep the generator beside its generated
   file when requested, and warn that regeneration replaces hand edits. Leave the
   commit to the user.

### Minimal local generator

Save the following as a user-owned Python script. Pass the actual loaded skill
directory and an approved output path as arguments. These are **synthetic**
components; replace them with the user's confirmed architecture facts.

```python
from pathlib import Path
import sys

skill_dir = Path(sys.argv[1]).resolve(strict=True)
sys.path.insert(0, str(skill_dir / "scripts"))
from drawio_builder import Diagram, resolve_icon, svg_data_uri

d = Diagram("Synthetic architecture", 1000, 600)
api = d.icon(120, 180, "Azure API Management",
             svg_data_uri(resolve_icon(skill_dir, "azure:api-management")))
ai = d.icon(500, 180, "Azure OpenAI",
            svg_data_uri(resolve_icon(skill_dir, "azure:openai")))
fabric = d.icon(760, 180, "Microsoft Fabric Lakehouse",
                svg_data_uri(resolve_icon(skill_dir, "fabric:lakehouse")))
d.edge(api, ai, "HTTPS 443 (example)", sx=1, sy=0.5, tx=0, ty=0.5)
d.edge(ai, fabric, "Grounded data request (example)", sx=1, sy=0.5, tx=0, ty=0.5)
d.save(sys.argv[2])
```

Further references, read when the branch applies:

- Shape helpers, icon lookup, multi-page save and `validate_file`:
  [builder-api.md](references/builder-api.md).
- Export, PNG trim, offline tests, Azure catalog refresh:
  [export-and-checks.md](references/export-and-checks.md).
- Icon sources, licences and the optional public GitHub search:
  [REFERENCE.md](references/REFERENCE.md).
