# Agentic Co-build plugin

The package contains nine skills: `ai-agent-creator`,
`cloud-architecture-diagram`, and `idea-forge`, plus the bundled MIT-licensed
`cost-estimation`, `diagram-design`, `wireframer`, `grilling`, `domain-modeling`,
and `wait-what`.
It also supplies public Microsoft Learn documentation MCP. It contains no hooks,
live-cloud connections, or application scaffold.

Install it through the marketplace in this repository. Follow the
[Start guide](../../docs/start.md) to work in your own application repository.
The plugin bundles every skill it needs; there is nothing else to install.

The creator stops at architecture approval. Implementation starts separately.
Plugin files are read-only inputs; generated architecture records belong in the
application repository.

## Attribution

AI Agent Creator was imported from the supplied AI Application Accelerator.
Cloud Architecture Diagram was adapted by Paolo Montagna from Thomas Thornton's
`drawio-mcp-diagramming`. The supplied source snapshot and attribution remain with
the skill. Redistribution in this plugin was authorized by the repository owner.

Bundled third-party skills keep their upstream MIT licenses and copyright notices:

| Skills | Author | Source (pinned commit) | License file |
| --- | --- | --- | --- |
| `grilling`, `domain-modeling`, `wait-what` | Matt Pocock | [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | [`LICENSE`](skills/grilling/LICENSE) |
| `cost-estimation` | Microsoft Corporation | [`microsoft/azure-skills`](https://github.com/microsoft/azure-skills/tree/233c51fc11c73d459be46e099e417ebaf3d20a26/.github/plugins/azure-cost/skills/cost-estimation) | [`LICENSE`](skills/cost-estimation/LICENSE) |
| `diagram-design` | Cathryn Lavery | [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design/tree/f2496acbde9f45ccb55c24d4f75210c8a1355df8) | [`LICENSE`](skills/diagram-design/LICENSE), [third-party icons](skills/diagram-design/THIRD_PARTY_LICENSES.md) |
| `wireframer` | agilek; icons by Mike Acler | [`agilek/wireframer-skill`](https://github.com/agilek/wireframer-skill/tree/22ed714abb486d923bcf4d21498fbbeabc9f4fb3), icons from [`agilek/react-doodle-icons`](https://github.com/agilek/react-doodle-icons/tree/43a217f4dc56db621764f2f17a5755f4706b47ec) converted to SVG; offline bundle of [`wired-elements`](https://github.com/wiredjs/wired-elements) 3.0.0-rc.6 (MIT, with Lit BSD-3-Clause) | [`LICENSE`](skills/wireframer/LICENSE), [icons](skills/wireframer/icons/LICENSE), [bundled `wired-elements`](skills/wireframer/vendor/THIRD_PARTY_LICENSES.txt) |

These copies are unmodified apart from path placement. Upstream improvements
require a deliberate re-import from the pinned source.

The repository's MIT license applies to first-party code and guidance. Bundled
Microsoft artwork has separate
[source and asset terms](skills/cloud-architecture-diagram/references/REFERENCE.md).
Preserve those terms and nearby product labels when using the diagrams.
