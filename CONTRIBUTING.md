# Contributing

This project welcomes contributions and suggestions. Most contributions require you to
agree to a Contributor License Agreement (CLA) declaring that you have the right to,
and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need
to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the
instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Documentation validation

Before submitting documentation or scenario changes, run:

```bash
npm run build
npm run validate:scenarios
npm test
```

The build audits first-party documentation for broken script references, invalid invocation flags,
ambiguous checklist glyphs, invalid UTF-8, likely mojibake, and fragile text icons in the site chrome.
It then regenerates the scenario assets under `docs/assets/data/` and checks their routes.
The scenario checks cover lesson structure and diagram geometry. `npm test` covers build and audit
regressions. These local checks do not prove that a live Azure deployment works.

**Commit generated assets under `docs/assets/data/` with their source changes.**

For scenario accelerator changes, run `npm run test:scenarios` for the offline regression
tests.