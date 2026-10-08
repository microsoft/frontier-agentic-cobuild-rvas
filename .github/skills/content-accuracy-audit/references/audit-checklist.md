# Audit checklist

Use for the [content audit](../SKILL.md). Cite the primary source for each
verified or refuted claim.

## Plugin and resources

- Confirm manifest format and marketplace paths with official host guidance.
- Resolve every skill reference from its installed directory.
- Preserve local assets, attribution, and separate artwork terms.
- Keep customer outputs outside the installed plugin.
- Confirm discovery, architecture approval, and independent-review gates.

## Setup

- Verify upstream skill names and the pinned installer's flags.
- Check the Node requirement against the installer package.
- Test empty and existing workspaces, conflicts, reruns, and partial failures.
- Confirm project-only writes and preservation of instructions and MCP settings.
- Distinguish native plugin scope from project-local supporting skills.

## Documentation and product facts

- Verify Microsoft SDK and capability claims with current Microsoft Learn evidence.
- Verify host-specific commands against CLI and VS Code documentation separately.
- Resolve local paths and anchors.
- Compare generated guide and commands with their sources.
- Explain manual review or unavailable capabilities instead of claiming success.
- Keep architecture approval separate from implementation and deployment.

## Findings

Nonexistent APIs or flags are critical. Incorrect or outdated instructions are
high severity when they block or misdirect the workflow. Broken references and
cross-file inconsistencies are medium. Cosmetic clarity issues are low.
