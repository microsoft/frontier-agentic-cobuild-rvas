# Agentic Co-build plugin

The package contains three skills: `ai-agent-creator`,
`cloud-architecture-diagram`, and `idea-forge` (Idea Forge).
It also supplies public Microsoft Learn documentation MCP. It contains no hooks,
live-cloud connections, or application scaffold.

Install it through the marketplace in this repository. Follow the
[Start guide](../../docs/start.md) to install the project-local upstream dependencies
and work in your own application repository.

The creator stops at architecture approval. Implementation starts separately.
Plugin files are read-only inputs; generated architecture records belong in the
application repository.

## Attribution

AI Agent Creator was imported from the supplied AI Application Accelerator.
Cloud Architecture Diagram was adapted by Paolo Montagna from Thomas Thornton's
`drawio-mcp-diagramming`. The supplied source snapshot and attribution remain with
the skill. Redistribution in this plugin was authorized by the repository owner.

The repository's MIT license applies to first-party code and guidance. Bundled
Microsoft artwork has separate
[source and asset terms](skills/cloud-architecture-diagram/references/REFERENCE.md).
Preserve those terms and nearby product labels when using the diagrams.
