# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Microsoft sellers, partners, facilitators, and customer technical teams shaping an AI engagement.

Customer teams and their technical advisers use the kit to co-build the customer's own AI scenario.
Account teams use the playbooks to qualify the work and agree a scope before delivery.

## Product Purpose

Agentic Co-build helps teams build customer AI scenarios with reusable implementation patterns.
Each playbook breaks architectural choices into code-backed modules with observable checks.
Customer-facing slides support the design discussions.

Success means the team delivers the agreed part of the customer's scenario in their tenant,
with evidence from the actual user channel and a named operating owner. Local fixture checks
and reference deployments do not complete a module's customer delivery work.

## Positioning

Start with the customer's outcome and constraints. **Split the end-to-end use case before
selecting modules.** Map each part to relevant scenario modules. Record the adaptation needed
and any work the kit does not cover. A customer scenario can combine several tracks. Plan modules
from that mapping, preserving module prerequisites.

The kit includes accelerators, but deploying one is only part of the work. It can support a scoped
pilot or a longer co-build engagement. Agree customer-specific engineering and acceptance criteria
before committing to delivery. Module durations do not estimate a full customer implementation, and
module completion does not prove production readiness.

The implementation reference focuses on Microsoft Foundry. The playbooks also discuss options such
as Copilot Studio, SharePoint, and Fabric. Those options do not all have complete implementation
paths in the kit. Choose with the customer and identify any missing work.

## Operating Context

Use Idea Forge when the opportunity is unclear. Teams with a defined use case run Use-Case Mapper
to map its parts to modules. Both are repository skills on the site's Start page. The initial tracks are:

- AI Grounding / IQ
- Content Understanding and Document Workflow
- Avatar Scenario
- Operational Agents

These tracks are reusable starting points, not a complete catalog of AI use cases. Add tracks as
customer needs justify them, using the same contribution contract.

Each playbook includes implementation modules and source-controlled slides. Accelerators supply
sample assets and reusable code; their guides separate local exercises from live Azure work.
Teams can use an approved existing environment or the optional clean-demo foundations.
**Scenario modules are the guided delivery path.** Start from the customer's task and approved
environment. Explain decisions before their dependent build steps, distinguish implemented
paths from integrations, and verify the customer system. Keep reusable reference code in the scenario accelerator.
Share code only when multiple scenarios use it. There is no separate activity catalogue or curriculum.

The repository is also a GitHub Pages documentation site. Scenario assets are source-controlled
under `scenarios/`, generated site data is built under `docs/assets/data/`, and the existing
scenario and diagram checks validate changes.

## Capabilities and Constraints

The kit includes:

- customer-facing scenario pages and printable slide decks;
- practical modules that name decisions, inputs, proof, verification, and the next decision;
- sample assets, reusable code, and optional demo deployment templates, with bring-your-own-environment guidance;
- repository skills that generate customer ideas, map a use case to modules, and work with Microsoft Foundry patterns.

Preserve the RVAS / RVAP identity, customer-specific co-building approach, Microsoft Foundry focus,
and reusable scenario contribution contract. Never fabricate customer evidence.

Accelerators may provision demo resources where their guides say so. They must not provision an
enterprise landing zone. Describe live-service requirements explicitly; local checks do not prove
that a customer deployment works. Preview and fast-moving Microsoft services must direct authors
to current Microsoft documentation and tools before SDK code is written.

## Brand Commitments

The public identity is Agentic Co-build with RVAP visual alignment. Existing assets include the
RVAP/RVAS logo mark, full logo, white logo mark, and Foundry icon under `docs/assets/img/`.

The voice should start with the customer outcome and stay plainspoken, practical, and
decision-oriented. Avoid product-first jargon and over-specific architecture claims unless they
help the customer decide.

## Evidence on Hand

Available evidence includes repository content, scenario manifests, scenario modules,
source-controlled slides, accelerators, sample data, validation scripts, and the GitHub Pages site.

The product must not invent customer testimonials, benchmark claims, deployment commitments, pricing, licensing facts, or evidence that is not present in the repository or confirmed by the user.

## Product Principles

1. Start with the customer's scenario and agree the delivery scope before choosing architecture.
2. Keep scenarios reusable so more tracks can be added without changing the core journey.
3. Provide reusable building blocks that teams adapt to the customer's requirements.
4. Make evidence explicit: every module should produce something observable that the customer can review.
5. Preserve Microsoft Foundry accuracy by checking current documentation for fast-moving or preview capabilities.
6. Distinguish a working proof or pilot from production readiness against customer-specific acceptance criteria.

## Accessibility & Inclusion

No product-specific standard is confirmed beyond accessible, customer-facing web documentation and slides.
