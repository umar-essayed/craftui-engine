#!/usr/bin/env bash
set -e

# CraftUI Engine Universal Installer for Linux & macOS
# Usage:
#   Local (current project):  curl -fsSL https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.sh | bash
#   Global (machine-wide):   curl -fsSL https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.sh | bash -s -- --global

REPO_URL="https://github.com/umar-essayed/craftui-engine.git"
MODE="local"

for arg in "$@"; do
  case $arg in
    --global|-g)
      MODE="global"
      shift
      ;;
    --local|-l)
      MODE="local"
      shift
      ;;
  esac
done

echo ""
echo "🚀 Installing CraftUI Engine ($MODE mode)..."

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

git clone --depth 1 "$REPO_URL" "$TMP_DIR" > /dev/null 2>&1

if [ "$MODE" = "global" ]; then
  TARGET_DIR="$HOME/.gemini/config/skills/craftui-engine"
  mkdir -p "$TARGET_DIR"
  cp -r "$TMP_DIR/SKILL.md" "$TMP_DIR/references" "$TMP_DIR/templates" "$TMP_DIR/snippets" "$TARGET_DIR/"
  
  echo "✅ CraftUI Engine installed globally at: $TARGET_DIR"
  echo "⚡ Available across ALL projects for Google Antigravity & AI agents!"
else
  TARGET_DIR="$(pwd)/.agents/skills/craftui-engine"
  mkdir -p "$TARGET_DIR"
  cp -r "$TMP_DIR/SKILL.md" "$TMP_DIR/references" "$TMP_DIR/templates" "$TMP_DIR/snippets" "$TARGET_DIR/"

  # Setup Cursor rule if .cursor directory exists or create rule file
  mkdir -p "$(pwd)/.cursor/rules"
  cat << 'EOF' > "$(pwd)/.cursor/rules/craftui-engine.mdc"
---
description: CraftUI Engine B2B High-Density & De-AI refactoring protocol
globs: *.{tsx,jsx,vue,svelte,html,css,ts,js}
alwaysApply: false
---
When reviewing or writing frontend UI/UX, follow craftui-engine protocol:
1. No glowing box-shadows or neon decorations.
2. High density: compact table rows (38px) and tabular-nums.
3. Form rule: 4 vital fields upfront, accordion for extras.
4. Support 80mm thermal receipts and UTF-8 BOM (\uFEFF) on Arabic CSV.
EOF

  echo "✅ CraftUI Engine installed locally in: $TARGET_DIR"
  echo "⚡ Also configured .cursor/rules/craftui-engine.mdc for Cursor / Windsurf!"
fi

echo ""
echo "🎉 Installation complete!"
echo "👉 How to use in Antigravity: Ask your agent: 'Audit UI using craftui-engine' or 'Apply craftui-engine to refactor this view'"
echo ""
