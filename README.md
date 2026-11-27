# Agentic Co-build

**Agree before you delegate.** Agents made code cheaper to produce. They didn't
make understanding cheaper. Agentic Co-build takes any application, with or
without AI, from idea to a reviewed build on Azure, in your own repository:
your team agrees on what to build with diagrams and a prototype, agents build
it, and you check the result.

[Portal](https://microsoft.github.io/frontier-agentic-cobuild-rvas/)
| [Start](docs/start.md)
| [The path, steps 00–08](docs/path.md)
| [Why: the talk](docs/slides/agree-before-you-delegate.md)
| [Run a co-build day](docs/co-build-day.md)

[What can you build?](docs/applications.md)
| [Worked example](docs/example.md)
| [Participant requirements](docs/participant-requirements.md)
| [Discovery session guide](docs/discovery-session.md)

Bring your own use case. The [worked example](examples/storm-surge/) is for
teams that have none yet, can't use their data, or want to learn the flow first.

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

Can't use plugins? Install the skills with `npx skills add` and add the
Microsoft Learn MCP server yourself. See
[install the skills by hand](docs/start.md#or-install-the-skills-by-hand).

## Use it in your application workspace

| Skill | When to use it |
| --- | --- |
| **Azure Solution Architect** (`azure-solution-architect`) | You know what you want to build or evolve. It interviews you and produces the architecture package. |
| **Idea Forge** (`idea-forge`) | You know the customer and industry but need an evidence-backed idea first. |
| **Cloud Architecture Diagram** (`cloud-architecture-diagram`) | The creator uses it for editable diagrams with local assets and explicit review gates. |

Select `azure-solution-architect` from your host's skill picker or slash completion and
describe the intended application. Plugin skill names may be qualified by the host;
use the name it displays rather than guessing a prefix.
Use **Claude Opus 5.5** for the full creator session and implementation, as
required by the [Start guide](docs/start.md#check-the-workspace).

The creator writes:

```text
docs/architecture/
  solution.drawio
  solution.md
  specification.md
  implementation-plan.md
  cost-estimate.md
  visuals/
```

`visuals/` holds the swimlane, domain map, lifecycle, and scenarios you confirm
at the end of discovery, as Mermaid source and HTML rendered with the required
bundled `diagram-design` skill.

After the five architecture files are complete and reconciled, the creator asks
whether you want a final clickable wireframe prototype in the same session. If
you accept, it
uses the bundled `wireframer` skill
and writes the mock-data prototype under `docs/architecture/prototype/`.

**The creator stops after architecture handoff and the prototype choice.**
Approve the architecture, then start implementation in a new session with the
current specification, architecture, and plan attached.
Validate acceptance criteria and resolve implementation and security-review
findings before deployment. The [Start guide](docs/start.md) provides the handoff
prompt and separate instructions for both hosts.

The plugin supplies public Microsoft Learn documentation MCP, not cloud access.
If diagram rendering or independent review is unavailable, record and explicitly
accept a manual-review exception. XML validation alone is not visual approval.

## Maintain this repository

This is the tooling and documentation repository, not the customer's application.
The bundled skills live under `plugins/agentic-cobuild/skills/`. Third-party skills
are copied there unmodified, with their licenses and credits.

```bash
npm run build
npm test
npm run test:diagrams
```

Commit generated Overview and reading-page HTML with their sources. After you
change the slides under `docs/slides/`, run `npm run export:slides` and commit
the regenerated PDF.
See [Contributing](CONTRIBUTING.md) for installation checks and publishing setup.

The repository's MIT license does not replace the diagram assets'
[attribution and permitted-use terms](plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
