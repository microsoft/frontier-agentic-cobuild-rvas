# Review prompts

Run these against your staged and unstaged changes once the walking skeleton works. Use them as written, then add your own questions. Save the findings in `docs/review-findings.md`.

## Implementation review

```text
/review Review the implementation against docs/architecture/specification.md,
docs/architecture/implementation-plan.md and docs/architecture/solution.md.
Report places where the code contradicts them, where a wrong AI answer can
silently change a priority, where allocation is not deterministic, and where
an output could be read as dispatch or customer contact.
```

## Security review

```text
/security-review Review the staged and unstaged changes. Focus on: document
text reaching a prompt, a query or a file path; secrets or connection strings
in the repository or image; model output used without schema validation; and
anything that lets document content change rules or ranking logic.
```
