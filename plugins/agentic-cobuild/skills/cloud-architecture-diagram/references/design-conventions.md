# Design conventions

Apply these while laying out a diagram. The independent critique in
[review-contract.md](review-contract.md) owns semantic and cross-page correctness;
[layout-antipatterns.md](layout-antipatterns.md) owns overlap repair.

## Layout

- For topology, use a left-to-right main path and zones that reflect the confirmed
  boundaries; 3-4 zones are a starting point, not a requirement. For auth/API
  interactions and CI/CD stages, use the branch-specific layout in
  [topology-patterns.md](topology-patterns.md).
- Size service icons 50-70 px with the full service name nearby; keep labels at
  least 13 px.
- Keep Microsoft icons undistorted, uncropped, unflipped and unrotated, and
  reserve them for the service they represent.
- Draw thick VNet frames and dashed subnet frames where the facts confirm
  them. Draw a PaaS service and its private endpoint as separate shapes; the
  endpoint does not move the service into the subnet.

## Flows

- Label network connections with their known protocol and port, or mark them
  unknown. Label logical and temporal transitions with the action, event, or
  decision; they need no invented protocol or port.
- Use blue for primary traffic, dashed lines for secondary flows, and red only for
  failure or denial. Explain the conventions in a legend.
- Pin anchors and route parallel edges through separate corridors. Label a
  simplified trunk as an aggregate flow so it does not imply that a subnet is an
  application endpoint. Keep every meaningful flow; reduce clutter by routing.
- Number temporal steps and show known failure paths.
- Keep connectors static by default. Add `flowAnimation=1` when the user asks, and
  check the viewer or exporter before promising animation; PNG and PDF are static.

## Inspection

Check the requested renderer for overlapping labels, crossed icons, clipping, and
wrong or missing images. When inspection is impossible, say so. The independent
critique, targeted recheck, repairs, stop reason and residual limitations are
recorded per [review-contract.md](review-contract.md); local self-review is not
that gate.
