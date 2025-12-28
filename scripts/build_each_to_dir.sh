#!/usr/bin/env bash

SRC_DIR="versions"
OUT_ROOT="versions_out"


if [ ! -d "$SRC_DIR" ]; then
    echo "Source directory not found: $SRC_DIR" >&2
    exit 2
fi

mkdir -p "$OUT_ROOT"

for gp in "$SRC_DIR"/*.glyphs; do
    base=$(basename -- "$gp" .glyphs)
    dest_dir="$OUT_ROOT/$base"
    mkdir -p "$dest_dir"
    fontmake -g "$gp" -o otf --output-dir "$dest_dir"
done
