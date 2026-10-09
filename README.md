# Agentic Co-build

**Design and build your own AI application in your own repository.** Bring a new
idea or a capability you want to add to an existing application. The Agentic
Co-build plugin helps you define the requirements and approve the architecture
before implementation begins.

[Start guide](https://microsoft.github.io/frontier-agentic-cobuild-rvas/start.html)
| [Guide source](docs/start.md)
| [Supporting skill commands](docs/supporting-skills.md)

[What can you build?](docs/applications.md)
| [Architecture options](docs/architecture-options.md)
| [Extend an existing application](docs/existing-applications.md)

## Install the plugin

For GitHub Copilot CLI:

```bash
copilot plugin marketplace add microsoft/frontier-agentic-cobuild-rvas
copilot plugin install agentic-cobuild@agentic-cobuild
copilot plugin list
```

For VS Code Copilot, add `microsoft/frontier-agentic-cobuild-rvas` to
`chat.plugins.marketplaces`, then install **Agentic Co-build** from the Agent
Plugins view. Enable `chat.plugins.enabled` if needed. Manage the plugin in the
interface where you installed it.

**Install supporting skills in the application repository too.** The
[Start guide](docs/start.md#install-the-supporting-skills) lists every selected
skill, its purpose, and the direct `npx` commands. Use Node.js 22.20 or newer,
Git, and npx. No Bash wrapper or tooling-repository clone is needed.
Review existing skills before installing; the commands can overwrite selected
copies, and a failed install may leave partial files.

## Use it in your application workspace

| Skill | When to use it |
| --- | --- |
| **AI Agent Creator** (`ai-agent-creator`) | You know what you want to build or evolve. It interviews you and produces the architecture package. |
| **Idea Forge** (`idea-forge`) | You know the customer and industry but need an evidence-backed idea first. |
| **Cloud Architecture Diagram** (`cloud-architecture-diagram`) | The creator uses it for editable diagrams with local assets and explicit review gates. |

Select `ai-agent-creator` from your host's skill picker or slash completion and
describe the intended application. Plugin skill names may be qualified by the host;
use the name it displays rather than guessing a prefix.

The creator writes:

```text
docs/architecture/
  solution.drawio
  solution.md
  specification.md
  implementation-plan.md
```

**Architecture approval finishes the creator workflow.** Start implementation in
a new session with the current specification, architecture, and plan attached.
Validate acceptance criteria and resolve implementation and security-review
findings before deployment. The [Start guide](docs/start.md) provides the handoff
prompt and separate instructions for both hosts.

The plugin supplies public Microsoft Learn documentation MCP. It grants no cloud
access. Missing diagram rendering or independent review is reported and needs an
explicit manual-review exception; XML validation alone is not visual approval.

## Maintain this repository

This is the tooling and documentation repository, not the customer's application.
The three bundled skills live under `plugins/agentic-cobuild/skills/`. Third-party
dependencies are selected in `scripts/agentic-skills.json`, not copied into the plugin.

```bash
npm run build
npm test
npm run test:diagrams
```

Commit generated Overview and reading-page HTML and `docs/supporting-skills.md`
with their sources.
See [Contributing](CONTRIBUTING.md) for installation checks and publishing setup.

The repository's MIT license does not replace the diagram assets'
[attribution and permitted-use terms](plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
