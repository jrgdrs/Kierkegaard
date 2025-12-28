#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/rename_versions.sh [-n|--dry-run] [VERSIONS_DIR]
#
# For each regular file in VERSIONS_DIR (default: versions),
# - looks in the last 200 lines for `versionMajor` and `versionMinor` values
# - if both are found, renames the file to <major>.<minor>.<first6chars>.<ext>
# - preserves extension and avoids overwriting by adding a numeric suffix if needed

DRY_RUN=0
VERSIONS_DIR="versions"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -n|--dry-run) DRY_RUN=1; shift ;;
        -h|--help) echo "Usage: $0 [-n|--dry-run] [VERSIONS_DIR]"; exit 0 ;;
        *) VERSIONS_DIR="$1"; shift ;;
    esac
done

if [ ! -d "$VERSIONS_DIR" ]; then
    echo "Directory not found: $VERSIONS_DIR" >&2
    exit 2
fi

shopt -s nullglob
for f in "$VERSIONS_DIR"/*; do
    [ -f "$f" ] || continue

    # examine only tail of file to find version values
    tailblock=$(tail -n 200 -- "$f" 2>/dev/null || cat "$f")

    major=$(printf "%s" "$tailblock" | grep -E -m1 'versionMajor' || true)
    minor=$(printf "%s" "$tailblock" | grep -E -m1 'versionMinor' || true)

    if [ -z "$major" ] || [ -z "$minor" ]; then
        echo "Skipping $(basename "$f"): versionMajor or versionMinor not found" >&2
        continue
    fi

    # extract numeric values (allow separators like = or : and trailing punctuation)
    majnum=$(printf "%s" "$major" | sed -E 's/.*versionMajor[^0-9]*([0-9]+).*/\1/')
    minnum_raw=$(printf "%s" "$minor" | sed -E 's/.*versionMinor[^0-9]*([0-9]+).*/\1/')

    if [ -z "$majnum" ] || [ -z "$minnum_raw" ]; then
        echo "Skipping $(basename "$f"): couldn't parse numeric major/minor" >&2
        continue
    fi

    # format minor version as four digits with leading zeros
    minnum=$(printf "%04d" "$minnum_raw")

    fname=$(basename -- "$f")
    short6=${fname:0:6}

    # get extension (if no extension, keep original name suffixless)
    if [[ "$fname" == *.* ]]; then
        ext="${fname##*.}"
    else
        ext=""
    fi

    newname="${majnum}.${minnum}.${short6}"
    if [ -n "$ext" ]; then
        newname+=".${ext}"
    fi

    target="$VERSIONS_DIR/$newname"

    # avoid clobbering existing files: add numeric suffix
    if [ -e "$target" ] && [ "$target" != "$f" ]; then
        i=1
        base_noext="$newname"
        if [ -n "$ext" ]; then
            base_noext="${newname%.*}"
            while [ -e "$VERSIONS_DIR/${base_noext}_$i.${ext}" ]; do
                i=$((i+1))
            done
            target="$VERSIONS_DIR/${base_noext}_$i.${ext}"
        else
            while [ -e "$VERSIONS_DIR/${base_noext}_$i" ]; do
                i=$((i+1))
            done
            target="$VERSIONS_DIR/${base_noext}_$i"
        fi
    fi

    if [ "$DRY_RUN" -eq 1 ]; then
        echo "DRY-RUN: Would rename '$f' -> '$(basename "$target")'"
    else
        mv -- "$f" "$target"
        echo "Renamed '$f' -> '$(basename "$target")'"
    fi

done
