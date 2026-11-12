# Local export, trimming, and offline checks

## Export

Run the installed draw.io executable with absolute paths. Set `OUTPUT_DIR` and
`SKILL_DIR` to approved absolute directories first.

```bash
drawio -x -f png -s 2 --border 10 -o "$OUTPUT_DIR/architecture.png" "$OUTPUT_DIR/architecture.drawio"
python3 "$SKILL_DIR/scripts/trim_png.py" --pad 14 "$OUTPUT_DIR/architecture.png"
```

`-f svg` or `-f pdf` selects other formats. Run with Electron's default sandbox.
When Electron or display support is missing, report that prerequisite and deliver
the `.drawio` as not visually reviewed. Success means a zero exit status and a new,
nonempty, decodable export; a stale existing file is not success.

## Trimming

Trim when you want a uniform-border PNG; skip it where deliberate page layout must
survive. Trimming composites transparency onto `--bg R,G,B` (white by default),
crops only the exported page border, and reapplies `--pad`. It leaves the source
icons untouched. Blank images, bad PNGs, missing Pillow, and invalid parameters
fail explicitly.

## Offline checks

Run from any directory; no network or customer data is involved.

```bash
python3 -B -m unittest discover -s "$SKILL_DIR/tests" -v
```

The tests include a copied installed-like skill imported from an unrelated cwd.
Pillow tests need the optional requirement; a missing Pillow is reported as
skipped, not passed. `evals/evals.json` holds synthetic instruction scenarios;
package tests check their shape and declared fixture paths, not agent behavior.
For behavior evaluation, stage each case's `files` relative to the skill root,
run its prompt in an isolated output directory, and grade its `expectations`
against the artifacts and transcript. Compare the same cases against a snapshot
before claiming improvement. Keep results outside the installed skill and use
the skill-creator review viewer for human inspection. The pinned creator's
`claude -p` description evaluator is not Copilot-compatible and is not run here.

## Refreshing the Azure catalog

Every bundled Azure SVG has an `azure:*` entry in
`references/microsoft-icon-catalog.json`. After the maintainer downloads and
unzips a new official icon archive:

```bash
python3 "$SKILL_DIR/scripts/refresh_azure_catalog.py" --pack-dir /path/to/Azure_Public_Service_Icons/Icons
```

The script lists bundled icons without an entry and pack icons that are not
bundled (SHA-256 match). To add entries labelled from file names, write a candidate
to a new file in an existing output directory outside the installed skill:

```bash
python3 "$SKILL_DIR/scripts/refresh_azure_catalog.py" --pack-dir /path/to/Azure_Public_Service_Icons/Icons --output "$OUTPUT_DIR/microsoft-icon-catalog.candidate.json"
```

The candidate command preserves the installed catalog and refuses an existing
destination. Curate common-service labels and aliases before adopting it.
`--write` is a maintainer-only alternative for a writable source checkout, never
an installed skill. New artwork still requires a separate reviewed change: copy
SVGs into `assets/az/i`, update `azure2-complete-catalog.txt`, the source archive
fingerprint in the catalog, and `source-snapshot.json`.
