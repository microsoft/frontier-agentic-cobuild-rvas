# Contributing

This project welcomes contributions and suggestions. Most contributions require you to
agree to a Contributor License Agreement (CLA) declaring that you have the right to,
and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot checks whether you need a CLA and updates the PR
with the right label or comment. Follow the bot's instructions. You only need to do this once
across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Documentation validation

Before submitting plugin, dependency-inventory, or documentation changes, use Node.js 22.20
or newer and run:

```bash
npm run build
npm test
npm run test:diagrams
```

The build renders Overview from `docs/index.template.html` and the Start guide
and four explanatory pages from Markdown using `docs/start.template.html`.
Static intro figures live in `docs/assets/diagrams/` as self-contained HTML.
Use `<!-- diagram: filename-without-extension -->` to embed a figure; the build
inlines its scoped styles and accessible SVG without loading its standalone font
stylesheet. Embedded figures use the site's self-hosted Outfit/Inter fonts.
Each figure has wide and stacked SVG layouts selected by its container width.
Check both compositions: no diagram scrollbar, clipped labels, or omitted
relationships. Keep the before/after snapshots synchronized across layouts;
documentation tests compare their components and relationships.
Page metadata lives in `docs/build.js`; section links
for explanatory pages come from their headings. It also generates supporting
skill descriptions and commands from the install inventory. Commit generated HTML and
`docs/supporting-skills.md` with their sources.
Plugin skills live only under `plugins/agentic-cobuild/skills/`.
Keep third-party dependencies in `scripts/agentic-skills.json`, not in the plugin.

Tests cover plugin resources, local links, generated setup commands and skill
descriptions, page consistency, and accessible intro-figure embedding.
Diagram tests check XML and local asset handling;
they do not prove visual correctness or cloud security.

For an installation change, test in a disposable application directory. Use
`copilot --plugin-dir /absolute/path/to/plugins/agentic-cobuild` for local CLI
discovery without installing into a shared plugin registry. In VS Code, add a
local plugin location in a disposable profile and confirm skill and MCP discovery.
Record unavailable host checks explicitly.

## Publishing

A repository administrator must create `gh-pages` for preview storage and select
**GitHub Actions** in **Settings > Pages**. The existing workflow publishes the
site on `main` and branch previews elsewhere. Fork pull requests run checks only.

The published identity is `microsoft/frontier-agentic-cobuild-rvas`. Adding plugin
files here does not create that repository or change this checkout's remote.

Preserve the diagram skill's attribution, source snapshot, and separate icon terms
when updating imported resources.