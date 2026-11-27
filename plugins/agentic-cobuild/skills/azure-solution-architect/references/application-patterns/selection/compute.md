# Compute and hosting selection

Select per component, not per solution: a web front end, an API, a worker, and
a scheduled job can land on different hosts. The decision tree yields
candidates; confirm each against the component's requirements.

## Build new

| Component needs | Start with | Choose the alternative when |
| --- | --- | --- |
| Managed HTTP app or API, code or container | **App Service** | Several containers, scale to zero, event-driven scaling, or sidecars point to Container Apps |
| Containerized services without managing Kubernetes | **Container Apps** | Kubernetes APIs, ecosystem tooling, or cluster-level control justify **AKS** (consider AKS Automatic) |
| Event-triggered code, short bursts | **Functions** (evaluate Flex Consumption for new serverless apps) | Long-running or always-warm work fits a Container Apps job or App Service |
| Static front end with a small API | **Static Web Apps** with managed Functions or a linked backend | The API outgrows the plan's constraints |
| One un-orchestrated container, short task | **Container Instances** | Scheduling, scaling, or networking needs point to Container Apps jobs |
| Scheduled parallel or HPC work | **Batch** | Data-parallel analytics fit Fabric or Databricks instead |
| Full OS or infrastructure control, licensed software | **Virtual Machines** | A managed platform meets the requirement |

## Migrate existing

Separate **rehost** (VMs or Azure VMware Solution, like-for-like) from
**replatform** (App Service, Container Apps, AKS, managed databases). Assess App
Service first for web apps that can run on managed hosting. The
[modernization card](../workloads/08-modernize-existing-app.md) owns sequencing.

## Retiring or closed to new work

| Service | Status | Direction |
| --- | --- | --- |
| Azure Spring Apps (all plans) | Retires 31 March 2028 | Container Apps or AKS; App Service for suitable web apps |
| Functions Linux Consumption plan | Retires 30 September 2028 | Flex Consumption; Windows Consumption is not affected |

**Complete when:** each component names its host, the rejected alternative,
and the requirement that decided it; scaling unit, cold-start tolerance,
networking mode, and region availability are recorded or carried as gates.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Compute decision tree for build and migrate paths | [Choose a compute service](https://learn.microsoft.com/azure/architecture/guide/technology-choices/compute-decision-tree) | 2026-11-24 | Use as candidate generator, then confirm per component |
| Container service selection | [Choose a container service](https://learn.microsoft.com/azure/architecture/guide/choose-azure-container-service); [Container Apps comparison](https://learn.microsoft.com/azure/container-apps/compare-options) | 2026-11-24 | Container Apps unless Kubernetes control is a requirement |
| Static Web Apps API options | [API support](https://learn.microsoft.com/azure/static-web-apps/apis-overview) | 2026-11-24 | Check plan and API constraints |
| Linux Consumption retirement | [Functions Consumption plan](https://learn.microsoft.com/azure/azure-functions/consumption-plan) | 2026-11-24 | Use Flex Consumption for new serverless apps |
| Azure Spring Apps retirement | [Retirement announcement](https://learn.microsoft.com/azure/spring-apps/basic-standard/retirement-announcement) | 2026-11-24 | Exclude from new designs |
