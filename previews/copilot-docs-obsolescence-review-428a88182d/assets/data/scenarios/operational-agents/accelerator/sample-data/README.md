# Synthetic execution fixtures

All records and values are fictional. They describe no business process or
industry. Replace them only with approved data outside this repository.

`records.json` seeds two records without overwriting existing state.
`read.json` requests one allowed read. `update.json` reads and proposes a change
from version 1 to value `reviewed`. `out-of-scope.json` requests the second record,
which is outside the default task scope.

**Use a fresh state directory for each update exercise.** Reusing a directory
after a successful update leaves version 2 in place, so the version-1 proposal
must fail. Seeding must never reset an existing system just to make a demo pass.

`expected.json` supplies the statuses and operation counts asserted by the
behavioral suite. Runtime fault injection is explicit through the offline CLI's
`--fault` option. The model cannot enable it through a tool argument.

The scripted driver proves application behavior. It is not a model benchmark
and does not predict what a live agent will request.
