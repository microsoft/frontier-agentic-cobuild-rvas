# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Customer technical teams and their advisers building a new application, or
changing an existing one, with GitHub Copilot. The application may or may not
use AI. Facilitators use the portal to run a one-day co-build; delivery teams use
the same architecture package to agree scope and acceptance.

## Product Purpose

Agentic Co-build teaches and supports one practice: agree before you delegate.
The portal covers the full path from idea to a reviewed build on Azure, steps 00
to 08 in three bands: Agree (discover, architect, wireframe, task plan), Delegate
(build, design, deploy), and Verify (review). Each gate is a decision a person
makes.

The installable plugin bundles the skills for the Agree band. Azure Solution
Architect owns discovery and architecture approval; implementation starts in a separate
session with the team's chosen workflow. The user works in their own repository.

## Positioning

Lead with **Agree before you delegate**: agents made code cheaper to produce,
not understanding. Two primary actions: use it on your own app (Start) and run a
co-build day. Always prefer the user's own use case. Idea Forge helps users who
need an idea; the Storm Surge worked example is for teams that have no use case,
can't use their data yet, or want to learn the flow first. The "Agree before you
delegate" talk is published as HTML slides with a PDF, and explains why.

## Operating Context

Support GitHub Copilot CLI and VS Code Copilot. Distribute the plugin from
`microsoft/frontier-agentic-cobuild-rvas`. Bundle third-party skills unmodified,
with their licenses and credits, so users install nothing else.
Keep the tooling repository separate from the user's application workspace.

## Capabilities and Constraints

Bundle Azure Solution Architect, Cloud Architecture Diagram, Idea Forge, and the MIT-licensed
third-party skills they rely on, installable as a plugin or with the `skills`
CLI. Later steps use GitHub Spec Kit, Impeccable, the Azure CLI, and the Azure
Developer CLI, which users install when they reach them. Supply
documentation-only Microsoft Learn MCP. Preserve discovery confirmation and
complete-package approval, including explicit diagram-review exceptions.

Installing the plugin grants no permission to change cloud resources.
Architecture approval never starts implementation or deployment.

## Brand Commitments

Preserve the Agentic Co-build name, RVAP/RVAS logos, existing blue/navy palette,
Outfit/Inter fonts, and light reading surfaces. Favor a direct path to setup over
a catalog. Use plain, outcome-first language.

## Evidence on Hand

The bundled skills, their contracts and local diagram assets, upstream
attributions, validation results, the author's talk, and the fictional worked
example under `examples/storm-surge/`. Do not invent customer
evidence, readiness claims, or guarantees about model behavior.

## Product Principles

Start with the customer's outcome and existing environment. Keep approval gates
explicit. Validate delivery against the specification, and report blocked work
with its owner. Third-party guidance and asset terms remain identifiable.

## Accessibility & Inclusion

Provide readable command blocks, visible keyboard focus, responsive navigation,
and setup commands that do not require Bash.
