#!/usr/bin/env bash
set -euo pipefail

# Usage: do-lib.sh <subdir> <script> [args...]

SUBDIR="$1"; shift
exec lib/run-lib.sh "$SUBDIR/$@"
