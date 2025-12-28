#!/usr/bin/env bash
set -euo pipefail

# Build OTFs from .glyphs files in a directory (default: versions)
# For each .glyphs file, attempt to build instances for:
#   Regular, Italic, ExtraBold, ExtraBoldItalic
# Output files are named: <glyphs-basename>-<Style>.otf and placed in OUTPUT_DIR (default: same as versions dir)
# Usage: scripts/build_versions_otfs.sh [-n|--dry-run] [-f|--force] [-o OUTPUT_DIR] [VERSIONS_DIR]

DRY_RUN=0
FORCE=0
OUTPUT_DIR=""
VERSIONS_DIR="versions"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -n|--dry-run) DRY_RUN=1; shift ;;
        -f|--force) FORCE=1; shift ;;
        -o|--output-dir) OUTPUT_DIR="$2"; shift 2 ;;
        -h|--help) echo "Usage: $0 [-n|--dry-run] [-f|--force] [-o OUTPUT_DIR] [VERSIONS_DIR]"; exit 0 ;;
        *) VERSIONS_DIR="$1"; shift ;;
    esac
done

if [ -z "$OUTPUT_DIR" ]; then
    OUTPUT_DIR="$VERSIONS_DIR"
fi

if [ ! -d "$VERSIONS_DIR" ]; then
    echo "Directory not found: $VERSIONS_DIR" >&2
    exit 2
fi

mkdir -p "$OUTPUT_DIR"

# styles to build and their canonical label for filenames
declare -a STYLES=("Regular" "Italic" "ExtraBold" "ExtraBoldItalic")

# normalize function: lowercase and remove non-alphanumeric
_norm() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]//g'
}

shopt -s nullglob
for gp in "$VERSIONS_DIR"/*.glyphs; do
    [ -f "$gp" ] || continue
    basename_without_ext=$(basename -- "$gp" .glyphs)

    # collect instance names from the .glyphs file (handle quoted and unquoted names)
    instances=()
    while IFS= read -r line; do
        # extract instance name whether it's quoted or not; remove trailing semicolon
        inst=$(printf '%s' "$line" | sed -E 's/.*name[[:space:]]*=[[:space:]]*"?([^";]+)"?;?.*/\1/')
        instances+=("$inst")
    done < <(grep -E '^[[:space:]]*name[[:space:]]*=' "$gp" || true)

    if [ ${#instances[@]} -eq 0 ]; then
        echo "Warning: No instances found in $gp; fontmake may still build default instances" >&2
    fi

    for style in "${STYLES[@]}"; do
        target_label="$style"
        target_filename="$basename_without_ext-$target_label.otf"
        target_path="$OUTPUT_DIR/$target_filename"

        # Find matching instance name (case-insensitive, ignore spaces/dashes)
        chosen_instance=""
        desired_norm=$(_norm "$style")
        for inst in "${instances[@]}"; do
            if [ "$(_norm "$inst")" = "$desired_norm" ]; then
                chosen_instance="$inst"
                break
            fi
        done

        # If no exact normalized match found, try partial matches (e.g., extrabold vs extrabolditalic)
        if [ -z "$chosen_instance" ]; then
            for inst in "${instances[@]}"; do
                inst_norm=$(_norm "$inst")
                if [[ "$inst_norm" == *"$desired_norm"* ]] || [[ "$desired_norm" == *"$inst_norm"* ]]; then
                    chosen_instance="$inst"
                    break
                fi
            done
        fi

        # If still not found, as fallback attempt to use the canonical style name
        if [ -z "$chosen_instance" ]; then
            chosen_instance="$style"
        fi

        # Skip if target exists and not forcing
        if [ -e "$target_path" ] && [ "$FORCE" -ne 1 ]; then
            echo "Skipping existing: $target_filename" >&2
            continue
        fi

        cmd=(fontmake -g "$gp" -i "$chosen_instance" -o otf --output-path "$target_path")

        if [ "$DRY_RUN" -eq 1 ]; then
            echo "DRY-RUN: ${cmd[*]}"
            continue
        fi

        echo "Building $target_filename (instance: '$chosen_instance')"
        if "${cmd[@]}"; then
            echo "Built: $target_path"
        else
            echo "Warning: fontmake failed for $gp instance '$chosen_instance'" >&2
            # do not exit; continue with other styles/files
        fi
    done

done
