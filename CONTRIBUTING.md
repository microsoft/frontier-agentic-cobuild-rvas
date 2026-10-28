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

The build renders Overview from `docs/index.template.html`. It renders the Start
guide and four explanatory pages from Markdown through `docs/start.template.html`.
Page metadata and Start's setup section links live in `docs/build.js`. Learn pages
use page tabs without a section menu. The build also generates supporting skill
descriptions and commands from the install inventory. Commit generated HTML and
`docs/supporting-skills.md` with their sources.

Plugin skills live only under `plugins/agentic-cobuild/skills/`. Keep third-party
dependencies in `scripts/agentic-skills.json`, not in the plugin.

### Intro figures

Static intro figures live in `docs/assets/diagrams/` as self-contained HTML. Use
`<!-- diagram: filename-without-extension -->` to embed a figure. The build inlines
its scoped styles and accessible SVG but not its standalone font stylesheet, so
embedded figures use the site's self-hosted Outfit and Inter fonts.

The wide intro figures have a wide and a stacked SVG layout, selected by container
width. Check both: no diagram scrollbar, no clipped labels, no missing
relationships. Keep the before and after snapshots in sync across layouts, because
the documentation tests compare their components and relationships.

Compact application-family figures use one narrow layout. To pair a heading and
its paragraphs with a figure, put `<!-- application-family -->` before the heading
and `<!-- diagram: family-name -->` after the paragraphs.

### What the tests cover

Tests cover plugin resources, local links, generated setup commands and skill
descriptions, page consistency, and accessible intro-figure embedding. Diagram
tests check XML and local asset handling. They do not prove visual correctness or
cloud security.

### Installation changes

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