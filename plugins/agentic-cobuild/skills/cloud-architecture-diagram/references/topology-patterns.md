# Topology and temporal flow patterns

Adapted from the supplied Azure topology and flow guidance. Examples below
are synthetic and never establish facts about the user's deployment.

## Azure placement

Use thick VNet borders and dashed subnet borders, with labels for known CIDRs
and delegations. Do not automatically put every service into a subnet:

- VMs/NICs and deployed subnet-integrated resources belong in their confirmed
  subnets. Model actual deployment modes, such as an injected/delegated database
  deployment, rather than inferring placement from the product name.
- Azure SQL Database, Storage, Key Vault, and other managed endpoints are not
  placed inside a customer subnet merely because they use Private Link. Draw a
  separate **private endpoint** in the subnet and the service outside the VNet.
- App Service outbound VNet integration is distinct from inbound private
  endpoints; Azure API Management network modes vary by tier/configuration.
  Label the known mode, or leave it unknown.
- Monitor, Log Analytics, and Sentinel stay outside the VNet. Their private
  connectivity endpoints/scopes are separate objects, if configured.
- NSGs, routing, DNS, public access settings, and authorization determine
  connectivity. A frame or private endpoint icon alone does not prove isolation.

This complete builder snippet assumes `Diagram` was imported as in SKILL.md:

```python
d = Diagram("Synthetic Azure private access", 1200, 700)
d.container(40, 100, 680, 500, "Example VNet", "#d5e8d4", "#82b366")
d.sub(80, 180, 600, 340, "Example subnet", "#e6f4ea", "#82b366")
vm = d.card(120, 280, 180, 90, "Azure Virtual Machine")
pe = d.card(430, 280, 180, 90, "Private endpoint")
sql = d.card(890, 280, 240, 90, "Azure SQL Database", "Managed service")
d.edge(vm, pe, "SQL connection (port unspecified)", sx=1, sy=0.5, tx=0, ty=0.5)
d.edge(pe, sql, "Private Link", sx=1, sy=0.5, tx=0, ty=0.5)
# Save to the caller's approved output path with d.save(...).
```

These are deliberately generic labelled cards, not substitutes pretending to be
official icons. Use embedded Azure SVGs when appropriate and preserve full names.
Keep PE/service pairs aligned horizontally. Place peering in its own corridor;
represent peering as connectivity, not an application request.

## Auth and API interaction flows

Use 2-5 actor columns with headers and light backgrounds. Steps run top-to-bottom,
numbered in execution order, with explicit caller/callee direction and separate
requests/responses. Keep all cells at root with absolute coordinates if using
the builder. Start at roughly 1400x900 for three actors; add width as needed.

Blue denotes requests, teal responses, dashed amber identity/redirect operations,
dashed indigo async events, and red errors. Label the actual OAuth/OIDC flow,
token audience, and validation actor if supplied, not an imagined security model.
Use placeholders such as `[redacted token]`, never actual tokens or client secrets.
An arrow labelled "validate" is not proof that validation is implemented correctly.

## CI/CD flow

Use horizontal numbered stages (source, build, test, staging, approval, production)
only where they exist in the supplied process. `stage`, `decision`, and
`terminator` helpers support these shapes. Route a known failure path downward
to rollback/notify, avoiding the main path. A useful starting canvas is 1700x600.
Distinguish manual approval from automated checks; do not run a deployment.
When the brief names GitHub, use the bundled GitHub mark, Actions workflow,
repository, Packages, Codespaces, or Copilot mapping for the named responsibility.
Use Azure DevOps only when the brief explicitly names it; it is not a substitute
for GitHub. If no CI/CD platform is supplied, keep stages generic.

## Routing and detail

Use 50-70 px icons and readable labels. Reserve empty corridors for edges; set
anchors and waypoints to avoid icons and separate parallel lanes. Add protocols,
ports, subnet CIDRs, and network-isolation legends only from verified inputs.
Color is a legend convention, not a security assertion.
Simplify only with explicitly labelled aggregate flows. Do not drop real error
paths or required relationships merely to achieve a line-count limit.
