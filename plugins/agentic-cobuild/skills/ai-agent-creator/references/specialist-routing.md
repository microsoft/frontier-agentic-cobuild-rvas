# Specialist routing

Read after selecting design branches. Load only the matching available specialists
for architecture guidance; the accelerator's approval boundary applies to every
delegated branch.

Load a specialist only when its architecture-guidance path is read-only. When a
specialist requires dependency setup, authentication, environment preparation, or
another execution prerequisite on load, use the evidence contract and local
architecture references instead. Name that specialist as a later delivery owner
at handoff.

| Branch | Skill |
|---|---|
| Enterprise Azure topology, landing zones, networking, or multi-resource infrastructure | `azure-enterprise-infra-planner` |
| Copilot Studio orchestration, channels, connectors, or platform lifecycle | Use Microsoft Learn evidence; use `discover-azure-skills` for a matching specialist only if deeper architecture guidance is needed and no loaded skill/tool covers it |
| Foundry resource, model deployment, project, hosted agent, evaluation, or tracing | Use Microsoft Learn evidence and the selected Foundry architecture/runtime references. Name `microsoft-foundry` as the later delivery owner; do not load its execution workflow during architecture. |
| Search, speech, document intelligence, or model-inference SDK implementation | `azure-ai` |
| Foundry knowledge base or retrieval | `foundry-iq` |
| Logic Apps workflow authoring, connector configuration, or native agent hosting | Use Microsoft Learn evidence; use `discover-azure-skills` for a matching specialist only if deeper architecture guidance is needed and no loaded skill/tool covers it |
| Fabric IQ, Fabric data agent, or Work IQ context/data routing (distinct from Foundry IQ) | Use Microsoft Learn evidence; use `discover-azure-skills` for a matching specialist only if deeper architecture guidance is needed and no loaded skill/tool covers it |
| Power Platform solution ALM, environment lifecycle, or manual/admin promotion gates | Use Microsoft Learn evidence; use `discover-azure-skills` for a matching specialist only if deeper architecture guidance is needed and no loaded skill/tool covers it |
| Agent identity or token exchange | `entra-agent-id` |
| Application OAuth or app registration | `entra-app-registration` |
| APIM-based AI gateway governance | `azure-aigateway` |

Skill discovery is guidance selection, not authorization to configure a tenant,
publish an agent, or start delivery. If no matching specialist is available,
continue with verified documentation and expose unresolved gates.

At handoff, name later delivery owners without invoking their workflows.
