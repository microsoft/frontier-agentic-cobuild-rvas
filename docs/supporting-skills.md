# Supporting skills

<!-- Generated from scripts/agentic-skills.json by npm run build. -->

Run these commands from your application directory with Node.js 22.20.0 or newer.
Review the selected skills and inspect existing installations before running these commands.

### Skills from mattpocock/skills

Upstream source: [`mattpocock/skills`](https://github.com/mattpocock/skills).

| Skill | What it does |
| --- | --- |
| `grilling` | Question a plan until the decisions and assumptions are clear. |
| `domain-modeling` | Define domain terms and record them in a glossary and architecture decisions. |
| `codebase-design` | Design module interfaces and decide where to separate responsibilities. |
| `implement` | Implement a specification or tickets, run checks, and review the changes. Includes a commit step. |
| `tdd` | Build features or fix bugs through failing tests, implementation, and refactoring. |
| `diagnosing-bugs` | Reproduce a bug or performance regression and test possible causes. |
| `code-review` | Compare changes against repository standards and the originating specification. |
| `handoff` | Write a conversation handoff for a fresh agent session. |

```bash
npx --yes skills@1.7.1 add mattpocock/skills --skill grilling domain-modeling codebase-design implement tdd diagnosing-bugs code-review handoff --agent github-copilot --copy --yes
```

### Skills from microsoft/azure-skills

Upstream source: [`microsoft/azure-skills`](https://github.com/microsoft/azure-skills).

| Skill | What it does |
| --- | --- |
| `discover-azure-skills` | Find additional Azure skills for a task in the upstream catalog. |
| `azure-enterprise-infra-planner` | Plan enterprise Azure infrastructure and generate Bicep or Terraform. |
| `microsoft-foundry` | Build and manage Foundry agents, models, and resources, including deployment and evaluation. |
| `azure-ai` | Work with Azure AI Search, Speech, OpenAI, and Document Intelligence. |
| `foundry-iq` | Create or troubleshoot Foundry IQ knowledge bases and connect them to agents. |
| `entra-agent-id` | Configure identities and authentication for AI agents through Microsoft Entra Agent ID. |
| `entra-app-registration` | Register Microsoft Entra applications and configure OAuth and MSAL authentication. |
| `azure-aigateway` | Configure Azure API Management policies for AI models, MCP tools, and agents. |

```bash
npx --yes skills@1.7.1 add microsoft/azure-skills --skill discover-azure-skills azure-enterprise-infra-planner microsoft-foundry azure-ai foundry-iq entra-agent-id entra-app-registration azure-aigateway --agent github-copilot --copy --yes
```
