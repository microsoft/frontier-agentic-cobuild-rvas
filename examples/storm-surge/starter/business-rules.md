# Operating rules (synthetic)

These rules describe the claims and assistance operation in this exercise. Some rules are incomplete on purpose.

## Cover

- Wind, fallen tree, rain and water ingress damage require `covers_storm = True`.
- Flood requires `covers_flood = True`.
- Vehicle damage applies only to Motor Own Damage policies.
- The tool does not reject a claim without apparent cover. It flags the claim for a human decision.

## Priority factors

The factors below exist. There are no official weights. Who decides their relative order is an open question.

- Risk to people (power line down, gas, bedridden person).
- Home uninhabitable.
- Vulnerable customer.
- Severity of the damage.
- Exposure of the area (wind and flood).
- Sum insured.
- Age of the request.

## Capacity

- Each adjuster has a daily visit limit and works only from `available_from`.
- Each adjuster has skills. Structural damage requires `structural`. Large losses (sum insured above 500,000 EUR or structural damage) require `large_loss`.
- Each provider serves only the municipalities it lists and only the trades it lists.
- Provider messages in the inbox can reduce, increase or withdraw capacity. The most recent message prevails.
- A provider with a 48 hour SLA must not be assigned to a case with risk to people.

## System limits

- The tool proposes a plan. The leader reviews and adjusts it.
- No work order is issued.
- No customer is contacted.
- When information is insufficient or contradictory, the case goes to human review with the reason stated.
- Nothing may be invented: policy, address, severity and trade must come from the documents or the data.

## Conflicts the plan must show

- Demand above capacity for a trade and region.
- Case without apparent cover.
- Document that does not identify a single policy.
- Contradictory data (for example, an address that does not match the policy).
