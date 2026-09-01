#!/usr/bin/env bash
set -e

# Gotod Components UI Automated Release Packaging & Publishing Script

TARGET_VER=""
PUBLISH_RELEASE=false

for arg in "$@"; do
  if [ "$arg" = "--release" ] || [ "$arg" = "-r" ]; then
    PUBLISH_RELEASE=true
  elif [ -z "$TARGET_VER" ]; then
    TARGET_VER="$arg"
  fi
done

# 1. Determine Version
if [ -z "$TARGET_VER" ]; then
  CURRENT_VER=$(grep -E '^version=' addons/gotod_ui/plugin.cfg | cut -d'"' -f2)
  if [ -z "$CURRENT_VER" ]; then
    CURRENT_VER="1.0.0"
  fi
  TARGET_VER="$CURRENT_VER"
fi

if [ "$TARGET_VER" = "bump" ] || [ "$TARGET_VER" = "patch" ]; then
  CURRENT_VER=$(grep -E '^version=' addons/gotod_ui/plugin.cfg | cut -d'"' -f2)
  IFS='.' read -r major minor patch <<< "$CURRENT_VER"
  patch=$((patch + 1))
  TARGET_VER="${major}.${minor}.${patch}"
fi

echo "🚀 Packaging Gotod Components UI version: v${TARGET_VER}..."

# 2. Update version in plugin.cfg and project.godot
sed -i '' -E "s/version=\"[^\"]*\"/version=\"${TARGET_VER}\"/" addons/gotod_ui/plugin.cfg
sed -i '' -E "s/config\/version=\"[^\"]*\"/config\/version=\"${TARGET_VER}\"/" project.godot

# 3. Update download links in README.md, README.en.md, guide_catalog.js, and index.html
sed -i '' -E "s/gotod-components-ui-v[0-9]+\.[0-9]+\.[0-9]+\.zip/gotod-components-ui-v${TARGET_VER}.zip/g" README.md README.en.md assets/js/guide_catalog.js 2>/dev/null || true
sed -i '' -E "s/tags\/v[0-9]+\.[0-9]+\.[0-9]+\.zip/tags\/v${TARGET_VER}.zip/g" README.md README.en.md 2>/dev/null || true
sed -i '' -E "s/releases\/download\/v[0-9]+\.[0-9]+\.[0-9]+/releases\/download\/v${TARGET_VER}/g" assets/js/guide_catalog.js 2>/dev/null || true
sed -i '' -E "s/gotod-components-ui v[0-9]+\.[0-9]+\.[0-9]+/gotod-components-ui v${TARGET_VER}/g" assets/js/guide_catalog.js 2>/dev/null || true
sed -i '' -E "s/plugin.cfg \(v[0-9]+\.[0-9]+\.[0-9]+\)/plugin.cfg (v${TARGET_VER})/g" assets/js/guide_catalog.js 2>/dev/null || true
sed -i '' -E "s/下载 v[0-9]+\.[0-9]+\.[0-9]+ 压缩包/下载 v${TARGET_VER} 压缩包/g" README.md 2>/dev/null || true
sed -i '' -E "s/Download v[0-9]+\.[0-9]+\.[0-9]+ Archive/Download v${TARGET_VER} Archive/g" README.en.md 2>/dev/null || true

# 4. Remove previous zip releases from root

rm -f gotod-components-ui-v*.zip

# 5. Build clean zip package
ZIP_NAME="gotod-components-ui-v${TARGET_VER}.zip"
zip -r "$ZIP_NAME" addons/gotod_ui/ -x "*.DS_Store" -x "*.uid" > /dev/null

echo "✅ Package created successfully: $ZIP_NAME"
ls -lh "$ZIP_NAME"

# 6. Publish to GitHub Releases if requested
if [ "$PUBLISH_RELEASE" = true ]; then
  echo "📤 Publishing release v${TARGET_VER} to GitHub..."
  git tag -a "v${TARGET_VER}" -m "Release v${TARGET_VER}" 2>/dev/null || true
  git push origin "v${TARGET_VER}" 2>/dev/null || true
  gh release create "v${TARGET_VER}" "$ZIP_NAME" --title "v${TARGET_VER}: Release - Gotod Components UI" --generate-notes 2>/dev/null || \
  gh release upload "v${TARGET_VER}" "$ZIP_NAME" --clobber
  echo "🎉 Release v${TARGET_VER} published successfully!"
fi
