"""Compare the bundled Azure icons with an extracted official icon pack.

Offline and read-only by default. Download and unzip the Azure architecture
icon archive yourself, then pass its `Icons` directory:

    python3 refresh_azure_catalog.py --pack-dir /path/to/Azure_Public_Service_Icons/Icons

Reports bundled SVGs that have no `azure:*` catalog entry and pack SVGs that are
not bundled (matched by SHA-256). `--output` writes a new candidate catalog
outside the installed skill, adding entries labelled from file names. Curate
common-service labels and aliases before adopting it. Maintainers may use
`--write` only in a writable source checkout to update its catalog in place.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
CATALOG = SKILL / "references" / "microsoft-icon-catalog.json"
INVENTORY = SKILL / "references" / "azure2-complete-catalog.txt"
ICONS = SKILL / "assets" / "az" / "i"
UPSTREAM_PREFIX = "Azure_Public_Service_Icons/Icons/"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def slug(name: str) -> str:
    name = name.replace("+", " plus ")
    name = re.sub(r"\(([^)]*)\)", r" \1 ", name)
    return re.sub(r"[^A-Za-z0-9]+", "-", name).strip("-").lower()


def name_of(relative: str) -> str:
    return re.sub(r"^\d+-", "", Path(relative).name[:-4])


def compare(pack_dir: Path, catalog: dict) -> dict:
    if not pack_dir.is_dir():
        raise FileNotFoundError(f"icon pack directory does not exist: {pack_dir}")
    pack = {}
    for path in sorted(pack_dir.rglob("*.svg")):
        pack.setdefault(digest(path), str(path.relative_to(pack_dir)).replace("\\", "/"))
    bundled = {}
    for line in INVENTORY.read_text(encoding="utf-8").splitlines()[1:]:
        bundled.setdefault(digest(ICONS / line), line)
    catalogued = {e["sha256"] for k, e in catalog["icons"].items() if k.startswith("azure:")}
    return {
        "pack": pack,
        "uncatalogued": {sha: rel for sha, rel in bundled.items() if sha not in catalogued},
        "not_bundled": {sha: rel for sha, rel in pack.items() if sha not in bundled},
    }


def add_entries(catalog: dict, report: dict) -> list[str]:
    icons = catalog["icons"]
    labels = {e["label"].casefold() for e in icons.values()}
    added = []
    for sha, rel in sorted(report["uncatalogued"].items(), key=lambda item: item[1]):
        if sha not in report["pack"]:
            raise ValueError(f"bundled icon is not in the supplied pack: {rel}")
        name = name_of(rel)
        key = "azure:" + slug(name)
        category = rel.split("/")[0]
        if key in icons:
            key += "-" + category
        label = re.sub(r"\s+", " ", name.replace("-", " ")).strip()
        if label.casefold() in labels:
            label += f" ({category})"
        labels.add(label.casefold())
        icons[key] = {"label": label, "path": f"assets/az/i/{rel}", "source_family": "azure",
                      "upstream_filename": UPSTREAM_PREFIX + report["pack"][sha], "sha256": sha}
        added.append(key)
    catalog["icons"] = dict(sorted(icons.items()))
    return added


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--pack-dir", required=True, type=Path)
    destination = parser.add_mutually_exclusive_group()
    destination.add_argument("--output", type=Path, help="write a new candidate catalog outside the skill")
    destination.add_argument("--write", action="store_true",
                             help="maintainer only: update the catalog in a writable source checkout")
    args = parser.parse_args(argv)
    try:
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        report = compare(args.pack_dir, catalog)
        print(f"uncatalogued bundled icons: {len(report['uncatalogued'])}")
        for rel in report["uncatalogued"].values():
            print(f"  {rel}")
        print(f"pack icons not bundled: {len(report['not_bundled'])}")
        for rel in report["not_bundled"].values():
            print(f"  {rel}")
        if args.output is not None:
            output = args.output.resolve()
            if output.is_relative_to(SKILL.resolve()):
                raise ValueError("candidate output must be outside the installed skill")
            added = add_entries(catalog, report)
            content = json.dumps(catalog, indent=2, ensure_ascii=False) + "\n"
            with output.open("x", encoding="utf-8") as candidate:
                candidate.write(content)
            print(f"wrote candidate {output} ({len(added)} added catalog entries)")
        elif args.write and report["uncatalogued"]:
            added = add_entries(catalog, report)
            CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"added {len(added)} catalog entries")
    except (OSError, ValueError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
