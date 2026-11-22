#!/bin/sh
# Renders print/portfolio.html to an A4 PDF with headless Chrome.
# Usage (from the project folder):  sh print/build-pdf.sh [output.pdf]
set -e

here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/../../장효석_포트폴리오.pdf}"

chrome=""
for c in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  "$(command -v google-chrome 2>/dev/null)" \
  "$(command -v chromium 2>/dev/null)"; do
  if [ -n "$c" ] && [ -f "$c" ]; then chrome="$c"; break; fi
done
[ -n "$chrome" ] || { echo "Chrome or Edge not found" >&2; exit 1; }

# Chrome on Windows needs Windows-style paths.
src="$here/portfolio.html"
if command -v cygpath >/dev/null 2>&1; then
  src="$(cygpath -w "$src")"
  out_arg="$(cygpath -w "$out")"
else
  out_arg="$out"
fi

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --print-to-pdf="$out_arg" "file:///$src" >/dev/null 2>&1

echo "Wrote $out"
