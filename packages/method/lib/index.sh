#!/usr/bin/env bash
set -euo pipefail

# run-lib.sh
#  Usage: ./run-lib.sh <relative-path-in-lib> [args...]
#
#  e.g. ./run-lib.sh bitcoin/test-bitcoin-getblock.ts foo bar

if [ $# -lt 1 ]; then
  echo "📘 Usage: $0 <relative-path-in-lib> [args...]"
  exit 1
fi

SCRIPT="$1"; shift

# Ensure lib/SCRIPT exists
if [ ! -f "lib/$SCRIPT" ]; then
  echo "❌ File not found: lib/$SCRIPT"
  exit 2
fi

# Execute under tsx
exec tsx "lib/$SCRIPT" "$@"
