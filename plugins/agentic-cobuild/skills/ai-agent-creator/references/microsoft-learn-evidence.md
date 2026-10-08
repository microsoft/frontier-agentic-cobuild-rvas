# Microsoft Learn evidence contract

Use the configured `microsoft-learn` MCP server when a design or implementation
choice depends on current Microsoft product documentation. Query after the
workload and constraints are understood so research answers a real decision
rather than producing a generic service catalog.

## Verify through Microsoft Learn

Consult Microsoft Learn for claims about:

- service capabilities, supported scenarios, and documented limitations;
- current SDKs, language support, authentication patterns, and API contracts;
- managed identity, Entra ID, RBAC, private networking, and integration behavior;
- Microsoft Foundry model, agent, evaluation, tracing, and knowledge features;
- Copilot Studio orchestration, channels/clients, intended user audiences,
  connector identity, data policies, licensing, and environment lifecycle;
- Power Platform solution ALM: what solution import promotes automatically
  versus the manual/admin gates (authentication, publication, sharing, some
  data-policy settings) that stay outside promotion;
- Fabric IQ, Fabric data agent, Foundry IQ, and Work IQ: which IQ workload a
  journey actually needs and its own connector/maturity. Verify each against
  its own dedicated Microsoft Learn source rather than one page standing in
  for all three; the layers are not interchangeable knowledge or context
  backends;
- cross-platform agent delegation and tool integration: exact Activity, A2A,
  MCP or HTTP contract, endpoint, authentication, feature maturity, and
  connectivity for the selected composition;
- direct-versus-delegated topology: whether a verified route exists for calling
  a tool or knowledge source directly, versus delegating through a connected or
  second agent, and the identity each hop requires;
- Azure service compatibility, regional documentation, limits, lifecycle, and
  deprecation guidance;
- recommended implementation and operational patterns that affect the target
  architecture or software-library selection.

Use official owner documentation for non-Microsoft SDK facts, including GitHub
Copilot SDK behavior. Specialist guidance and sample code do not replace
decision-bearing product evidence.

## Evidence scope and privacy

Documentation establishes capabilities, not live tenant/resource state,
enterprise policy, or authorization to change resources. Obtain workload-specific
facts from authorized evidence or the discovery frontier. Query public capability
terms; keep source code, customer/resident data, secrets, credentials, and
confidential business content out of documentation requests.

## Evidence recording

Add `## Microsoft Learn evidence` to `solution.md`. Record only sources that
influence the approved design:

| Decision or claim | Microsoft Learn source | Verified | Design implication |
| --- | --- | --- | --- |
| {claim} | {learn.microsoft.com URL} | {YYYY-MM-DD} | {what changed or was confirmed} |

Add compatibility details that affect implementation to
`implementation-plan.md` under `## Microsoft Learn evidence and compatibility
notes`. Link each source to the component, library, SDK, or delivery phase it
supports.

Prefer a small set of decision-bearing sources over a long bibliography. Never
claim a service, SDK, feature, region, or limitation was verified unless the MCP
result or official fallback source supports it.
Verify service, feature, connector and protocol maturity separately. A missing
preview label is not evidence of GA for an end-to-end composition. For external
users, verify channel authentication and business authorization separately from
the identity used by a connection.
Also distinguish API, SDK/package, language, model, region and deployment mode.
A GA service can expose preview features or prerelease clients; sample/portal
coverage establishes only the path it documents.

## Failure behavior

If the `microsoft-learn` MCP server is unavailable:

1. Use an official `learn.microsoft.com` page through the available web-fetch
   mechanism when possible.
2. Record that the MCP server was unavailable and identify the fallback source.
3. Mark unresolved time-sensitive claims as assumptions or deferred verification.
4. Do not block logical architecture work that does not depend on the missing
   fact, but do not present unverified product details as settled decisions.

A missing source or broken link is unresolved evidence, not proof that a
capability is unsupported. Record the failure and actual fallback or owned check.
