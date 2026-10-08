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

Before submitting plugin, installer, or documentation changes, use Node.js 22.20
or newer and run:

```bash
npm run build
npm test
npm run test:diagrams
```

The build renders `docs/start.md` and the selected upstream commands into
`docs/start.html` and `docs/supporting-skills.md`. Commit those generated files
with their sources. Plugin skills live only under `plugins/agentic-cobuild/skills/`.
Keep third-party dependencies in `scripts/agentic-skills.json`, not in the plugin.

Tests cover plugin resources, local links, installer failure/preservation behavior,
and generated-guide consistency. Diagram tests check XML and local asset handling;
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