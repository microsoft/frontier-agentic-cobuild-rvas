# Icon and diagram references

These resources were supplied with `drawio-mcp-diagramming` 1.0.0 and adapted for
`cloud-architecture-diagram`; see [source and asset terms](#source-and-asset-terms).
Adapted by Paolo Montagna from original work by Thomas Thornton.

## Local first

- `../assets/az/i`: 710 bundled Microsoft Azure SVGs. Paths use compact category
  codes and omit the redundant `icon-service-` filename prefix to keep Windows
  checkouts portable; each filename retains its original numeric identifier and
  searchable service name.
- `microsoft-icon-catalog.json`: 672 exact entries covering Azure, Fabric, Power
  Platform, Entra, Dynamics 365, GitHub and generic Microsoft 365 symbols.
  Every bundled Azure SVG has a catalog ID (`azure:<slug>`), with the common
  services (storage, networking, data, AI, security, monitoring, compute)
  carrying product labels and aliases such as `Cosmos DB` or `AKS`. Portal
  glyphs keep their file-name label, for example `Search glyph`.
  Azure artwork has no Container Apps application, Voice Live, Purview or
  Durable Task icon, so those stay labelled boxes in the coverage file.
  The Azure entries pin retained files; additional SVGs extend the snapshot.
  The catalog records labels,
  upstream filenames, source versions, archive fingerprints, and per-icon hashes.
  Family namespaces prevent semantic collisions such as Microsoft Fabric versus
  Azure Service Fabric and Power BI versus Power BI Embedded.
- `azure2-complete-catalog.txt`: curated inventory of 710 paths matching that
  local icon set. Despite its inherited filename, these numbered/hyphenated
  paths are **not verified jgraph Azure2 web library paths**. Do not prepend
  `img/lib/azure2/` to them. Resolve against the bundled Icons directory.

For Microsoft and GitHub icon lookup, follow the authoritative procedure in
[builder-api.md#icons](builder-api.md#icons).
Catalogs are snapshots, not proof that the installed renderer supports every
entry.

## Embedding and rendering

Embed the SVG path returned by the catalog procedure with `svg_data_uri(path)`:
`image=data:image/svg+xml,<percent-encoded-svg>;`. Do not put a bare local path,
URL, or `img/lib/...` in an otherwise standalone artifact.

`resolve_icon` verifies the catalog schema, exact ID, safe local path, file
existence, and recorded SHA-256 before returning an SVG.

draw.io styles use semicolons as separators. Canonical `;base64` data URIs break
that grammar; the builder uses percent-encoded SVG and draw.io's PNG comma form
`data:image/png,<base64>`. These are draw.io image values, not a general browser
data-URI API. Verify the requested renderer.

Use category colors consistently (compute orange, networking purple, storage
green, security red) but prefer readability and accurate labels over decoration.
Plain flow diagrams can skip cloud icons entirely.

## Creator component coverage

`architecture-icon-coverage.json` maps the creator's pattern and runtime cards
to candidate components and records non-product presentations. It is an icon
coverage contract, not a requirement to deploy every listed component.

The [builder lookup procedure](builder-api.md#icons) accepts exact IDs, canonical
labels and explicit aliases, without fuzzy matching. For example, `Azure AI
Search` resolves the existing `Cognitive-Search` file, and `Document Intelligence`
resolves `Form-Recognizers`.

The result contains `id`, `label`, `icon_id`, `presentation` and `path`.
Non-product component mappings also carry a `reason`:

| Presentation | Required handling |
| --- | --- |
| `product-icon` | Embed the exact SVG and retain the product label. |
| `family-icon` | Name both the product family and capability; do not claim dedicated capability artwork. |
| `generic-symbol` | Keep the actual system label and record that the symbol is not its product logo. |
| `labelled-box` | Use a labelled card or boundary; `path` is `None`. Preserve its interactions and ownership. |

Teams, SharePoint, Outlook, Microsoft Graph, Microsoft 365 Copilot and Work IQ
have generic-symbol mappings. Fabric IQ is a labelled boundary whose selected
items have their own icons, including ontology, graph model and data agent.
Content Understanding uses an explicit generic document symbol; Voice Live is a
labelled box; Speech avatar and Copilot SDK use labelled family artwork.
Container Apps application, worker and environment mappings remain distinct.

### GitHub component identity

The pack includes GitHub's mark, Copilot, workflow, repository, package,
Codespaces, and Dependabot Octicons. Resolve GitHub Actions with `github:actions`,
GitHub repositories with `github:repository`, and GitHub Packages with
`github:packages`. Their workflow/repository/package glyphs are explicitly
generic symbols from GitHub's icon set, not separate product logos.
`github:copilot-sdk` retains its Copilot family-icon disclosure.

Keep GitHub labels and artwork on GitHub components. `azure:azure-devops` is a
separate mapping, used only when Azure DevOps is explicitly requested; it is
never a substitute for GitHub or GitHub Actions.

When artwork is used, resolve every component that needs it, not only those in
the selected card. Account for all other components with labelled shapes.
Report gaps and agree a labelled fallback; missing artwork never removes a
component or selects a different architecture. Offline
tests validate each mapping, alias and embedded SVG. Repository tests require
coverage entries for every creator pattern and runtime card.

## Optional public GitHub search / refresh

This helper performs outbound HTTPS only with explicit `--allow-network`.
It requests public jgraph resources; it does not receive architecture files
or need credentials. Review organization network policy first.

```bash
python3 "$SKILL_DIR/scripts/search_azure2_icons_github.py" --allow-network --search gateway
```

Azure searches the jgraph `dev` tree and emits relative web-library SVG paths,
not the bundled Microsoft filename inventory. `--validate` checks public image
URLs and returns failure if any URL check fails.
No matches, malformed/truncated data, HTTP failures, and invalid
parameters return a nonzero status; never fabricate output when GitHub fails.

For a separate reviewed catalog update, use `--max-results 9999` and capture
stdout to a **new candidate file outside the installed skill**. Check the exit
code before using it; shell redirection can create an empty/partial file on
failure. Record the actual upstream revision and retrieval date before a
maintainer replaces any catalog. The script does not rewrite installed files.
Never replace the bundled Azure inventory with web-library paths without
updating its documented meaning and tests.

## Additional guidance

- [Topology and flow patterns](topology-patterns.md): cloud placement and synthetic
  examples; apply only facts confirmed in the user's system.
- [Standalone file requirements](standalone-file-requirements.md): complete XML,
  geometry, IDs, image portability, and validation limits.
- [Layout anti-patterns](layout-antipatterns.md): useful routing/label repair
  fragments, not executable complete diagrams or real customer topology.

Example requests: "Diagram the Azure components in my approved input with private
endpoints distinguished from managed services"; "Show the confirmed GitHub
Actions build and approval flow into Azure"; "Show the Microsoft Entra login
interaction with the API". Use only supplied connectivity and identity facts.

## Source and asset terms

The supplied snapshot and adaptation retain their original attribution. The
repository owner's authorization covers redistribution of this skill in Agentic
Co-build. The artwork below has separate permitted-use terms; the repository's
MIT license does not replace them.

### Microsoft Azure artwork

The 710 retained SVG icons remain byte-for-byte as supplied. Their official terms
are published at `https://learn.microsoft.com/azure/architecture/icons/`. They
are not MIT-licensed by this import.

The supplied terms permit architectural diagrams, training materials, or
documentation, and copying, distribution, and display only for that permitted
use unless Microsoft grants explicit permission; other rights are reserved.
Do not crop, flip, rotate, distort, or change icon shapes, or use a Microsoft
product icon to represent another product or service. Keep the full service
name nearby without overlap. Proportionate SVG resizing is supported.
Redistribution is for architectural diagramming, not a general artwork or
trademark license; retain the supplied terms and permitted-use restrictions.

### Microsoft Fabric artwork

The curated Fabric subset comes from `@fabric-msft/svg-icons` 8.2.0, retrieved
2026-10-07. The package declares the MIT license reproduced below. Product and
service names remain Microsoft trademarks; use the artwork to identify the
represented Fabric product or item, retain nearby labels, and preserve its
proportions. Current icon guidance is published at
`https://learn.microsoft.com/fabric/fundamentals/icons`.

#### Fabric MIT license

MIT License

Copyright (c) 2025 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Microsoft Power Platform artwork

The eight Power Platform SVGs remain byte-for-byte from the official scalable
icon package. Current terms are published at
`https://learn.microsoft.com/power-platform/guidance/icons`. The permitted use
is architectural diagrams, training materials, or documentation. Do not crop,
rotate, distort, recolor, or use a product icon to represent another service.
Power BI is intentionally sourced from the Fabric catalog; Power BI Embedded
remains a distinct Azure icon.

### Microsoft Entra artwork

The four product-level Entra SVGs remain byte-for-byte from the official October
2023 package. Current terms and branding guidance are published at
`https://learn.microsoft.com/entra/architecture/architecture-icons`. Use these
for Entra product boundaries; continue to use Azure resource icons for specific
deployed capabilities such as managed identities or private access.

### Additional architecture artwork

The five Microsoft 365 symbols come byte-for-byte from the official 2024 content
icon package linked at
`https://learn.microsoft.com/previous-versions/microsoft-365/solutions/architecture-icons-templates`.
That page permits architectural diagrams, training materials and documentation,
including copying, distribution and display for those uses. These are generic
content symbols, not Teams, SharePoint, Outlook, Graph, Copilot or Work IQ logos.
Microsoft 365 product artwork remains unbundled until an approved redistributable
source is recorded; Office UI Fabric's separately licensed CDN assets are not
treated as covered by the architecture package's terms.

The Dynamics 365 product SVG is unchanged from the official scalable package
linked at `https://learn.microsoft.com/dynamics365/get-started/icons`. Its terms
permit architectural diagrams, training materials and documentation, including
copying, distribution and display for those uses. Preserve the icon, proportions
and nearby product name; do not use it to identify another product.

The seven GitHub SVGs come unchanged from the pinned `primer/octicons`
revision recorded in the catalog. Retain `assets/github/LICENSE.txt` (MIT).
The mark and named capability glyphs identify GitHub responsibilities; generic
workflow, repository, and package symbols retain explicit disclosures. The
Copilot SDK mapping uses the Copilot family icon, not dedicated SDK artwork.
Trademarks remain with their owners.

The added Fabric ontology, graph model and operations-agent SVGs come from the
same MIT-licensed Fabric package as the existing subset. Retained Azure files
keep their original per-file fingerprints; the source manifest records the
retained subset. Exact Azure catalog entries are verified against the V24
archive recorded in the catalog.

The Azure catalog is the local Microsoft inventory despite its inherited
`azure2` filename. Names and refresh scripts grant no rights to third-party
logos or fetched jgraph assets. The repository/plugin MIT license does not
supersede these asset terms.

### Import adaptations

- Renamed the skill to describe its architecture deliverable; retained Azure,
  Microsoft ecosystem, auth/API, and pipeline guidance and repaired service/subnet
  distinctions, XML examples, and icon advice.
- Limited the pack to Microsoft and GitHub, with Azure DevOps available only
  when explicitly requested. Removed competing-provider material and third-party
  product/device artwork, and added separately mapped GitHub capability glyphs.
- Replaced mandatory hosted MCP use with local standard-library generation and
  explicit consent for hosted content transmission. No hosted service or
  dependencies are installed automatically.
- Made paths portable and retained/adapted four helpers for XML handling,
  embedding, PNG trimming, and opt-in refresh, with explicit failures and no
  routine writes to installed files.
- Shortened the local Azure asset tree for Windows-compatible checkouts while
  preserving icon bytes, numeric identifiers, searchable service names, terms,
  and the catalog inventory.
- Added offline tests, instruction scenarios, optional Pillow requirements, and
  the source fingerprint manifest.
- Excluded two compiled `scripts/__pycache__/*.pyc` files, archives, generated
  evaluation workspaces, customer data, and generator outputs.
