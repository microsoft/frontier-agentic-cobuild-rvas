# Builder API

Reference for `scripts/drawio_builder.py`. Import it from `SKILL_DIR/scripts` as
shown in the generator snippet in `SKILL.md`.

## Shapes and edges

Helpers: `banner`, `container`, `sub`, `note`, `icon`, `card`, `stage`,
`decision`, `terminator`, `edge`, and `box`/`raw` for custom styles.

- Labels are plain text (including `<`, `&`, and line breaks), not HTML.
- Build vertices before their edges.
- Give both coordinates of each anchor, each in 0..1. Keep waypoints and geometry
  finite and sizes positive; the builder rejects anything else.

## Icons

This section owns the Microsoft and GitHub icon lookup procedure. Plain flows and diagrams
using only labelled generic shapes need no catalog lookup. When artwork is
requested, resolve in this order; each step fails explicitly instead of falling
back to a similar service.

| Need | Call | Result |
| --- | --- | --- |
| Named component from the brief | `resolve_component_icon(SKILL_DIR, "Teams")` | `id`, `label`, `presentation`, `path`, and `reason` for non-product mappings. `path` is `None` for a labelled box; render it as a labelled card, not a missing-image placeholder. |
| Name or alias failed | `search_icons(SKILL_DIR, "gateway")` | Candidate `id`, `label` and `presentation` entries. It lists; you choose, then pass the `id` to `resolve_component_icon`. |
| Exact ID | `resolve_icon(SKILL_DIR, "azure:api-management")` | Verified SVG path. Rejects unknown IDs, unsafe paths and changed bytes. |
| Embed | `svg_data_uri(path)` | Data URI for `Diagram.icon`. |

`find_icon(root, fragment)` returns the first lexically sorted filename match.
Reserve it for a user-supplied icon folder outside the bundled catalog, and
inspect the returned name. Use the catalog procedure above for bundled artwork.

GitHub mappings use the `github:*` family, separate from `azure:azure-devops`.
Resolve the exact named responsibility, such as `github:github`,
`github:actions`, `github:repository`, or `github:copilot`. Workflow, repository,
and package symbols retain their generic-symbol disclosures; they are GitHub
Octicons, not dedicated product logos. Azure DevOps artwork is used only for an
explicitly requested Azure DevOps component.

## Multiple pages and validation

Create a `Diagram` per view, then call
`save_diagrams([context, components, data_flow, deployment], output_path)` to write
one `.drawio` in that order. Page names become page IDs and must be unique. Cell
IDs may repeat across pages; references resolve within their own page.
`Diagram.save` uses the same writer for a single page.

Call `validate_file(output_path)` after saving or editing. It returns the parsed
XML root after checking the uncompressed builder format, page dimensions, base
cells, references, geometry, and embedded images. Check page names, order and
architecture meaning separately. Convert compressed editor files on a copy before
validating. The writer replaces its destination; it neither merges existing pages
nor preserves hand edits.
