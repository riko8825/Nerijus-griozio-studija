#!/usr/bin/env bash
# Sync src/pages/*.html → root with path conversion
# Naudoja sed pattern be `"` priekyje (multi-line srcset palaikymas — žr. CLAUDE.md)
set -e

cd "$(dirname "$0")/.."

PAGES=(
  "index.html"
  "produkter.html"
  "produkt.html"
  "handlekurv.html"
)

for page in "${PAGES[@]}"; do
  if [ -f "src/pages/$page" ]; then
    cp "src/pages/$page" "$page"
    sed -i 's|\.\./css/|/src/css/|g; s|\.\./js/|/src/js/|g; s|\.\./assets/|/src/assets/|g' "$page"
    echo "✓ Synced: $page"
  else
    echo "⚠ Missing: src/pages/$page"
  fi
done

# Verify no remaining ../ paths
remaining=$(grep -c "\.\./" "${PAGES[@]}" 2>/dev/null | grep -v ":0$" || true)
if [ -n "$remaining" ]; then
  echo "⚠ Remaining ../ paths found:"
  echo "$remaining"
  exit 1
fi

echo "✓ All paths converted. Sync OK."
