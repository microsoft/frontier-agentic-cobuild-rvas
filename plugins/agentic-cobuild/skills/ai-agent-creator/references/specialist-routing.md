# Specialist routing

Read after selecting design branches. The plugin bundles one specialist,
`cost-estimation`. Every other branch uses Microsoft Learn evidence and the
accelerator's local architecture references, and the approval boundary applies to
every branch.

If the host also has an Azure or Microsoft specialist installed, load it only for
read-only architecture guidance. When a specialist requires dependency setup,
authentication, environment preparation, or another execution prerequisite on
load, use the evidence contract and local architecture references instead. Name
that specialist as a later delivery owner at handoff.

| Branch | Guidance |
|---|---|
| Enterprise Azure topology, landing zones, networking, or multi-resource infrastructure | Microsoft Learn evidence and [Enterprise landing zone](azure-patterns/patterns/03-enterprise-landing-zone.md). Later owner: `azure-enterprise-infra-planner`. |
| Copilot Studio orchestration, channels, connectors, or platform lifecycle | Microsoft Learn evidence |
| Foundry resource, model deployment, project, hosted agent, evaluation, or tracing | Microsoft Learn evidence and the selected Foundry architecture/runtime references. Later owner: `microsoft-foundry`; do not load its execution workflow during architecture. |
| Search, speech, document intelligence, or model-inference SDK implementation | Microsoft Learn evidence. Later owner: `azure-ai`. |
| Foundry knowledge base or retrieval | Microsoft Learn evidence and [Agentic retrieval](azure-patterns/patterns/05-agentic-retrieval.md). Later owner: `foundry-iq`. |
| Logic Apps workflow authoring, connector configuration, or native agent hosting | Microsoft Learn evidence |
| Fabric IQ, Fabric data agent, or Work IQ context/data routing (distinct from Foundry IQ) | Microsoft Learn evidence |
| Power Platform solution ALM, environment lifecycle, or manual/admin promotion gates | Microsoft Learn evidence |
| Agent identity or token exchange | Microsoft Learn evidence. Later owner: `entra-agent-id`. |
| Application OAuth or app registration | Microsoft Learn evidence. Later owner: `entra-app-registration`. |
| APIM AI Gateway policy or topology guidance after selecting [AI Gateway governance](azure-patterns/patterns/15-ai-gateway-governance.md) | Microsoft Learn evidence. Later owner: `azure-aigateway`. |
| Azure resource, model, token, platform-unit, retail, or negotiated pricing | Maintain mandatory `cost-estimate.md` through [cost-estimation-quality.md](cost-estimation-quality.md); invoke the bundled `cost-estimation` as a bounded consultation before final handoff, or record the exact attempted-tool blocker and unresolved evidence |

Loading a specialist is guidance selection, not authorization to configure a
tenant, publish an agent, or start delivery. Expose unresolved gates.

At handoff, name later delivery owners without invoking their workflows. Include
`cost-estimate.md`, its consumption scenarios, pricing status, and unresolved
commercial or measurement owners. The initial pricing attempt occurs during
package construction; later owners refresh it as measurements or rates change.
