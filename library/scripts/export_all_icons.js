#!/usr/bin/env node
/**
 * Gotod UI - 全量矢量图标导出与压缩优化工具
 * 自动将 25,988+ 个 SVG 图标从 catalog 导出并压缩写入 addons/gotod_ui/assets/icons/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CATALOG_PATH = path.join(ROOT_DIR, 'assets/js/icons_catalog.js');
const BASE_OUTPUT_DIR = path.join(ROOT_DIR, 'addons/gotod_ui/assets/icons');

function optimizeSvg(svgStr, isBrand = false) {
  if (!svgStr) return '';
  let res = svgStr
    .replace(/<\?xml[\s\S]*?\?>/gi, '')
    .replace(/<!--[\s\S]*?-->/gi, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();

  if (!isBrand) {
    // 替换普通单色图标的 fill/stroke 为 #ffffff，以便 Godot modulate (着色) 正常生效
    res = res.replace(/fill="(?:#e0e0e0|#000000|#000|#333|#333333|currentColor)"/gi, 'fill="#ffffff"');
    res = res.replace(/stroke="(?:#e0e0e0|#000000|#000|#333|#333333|currentColor)"/gi, 'stroke="#ffffff"');
    // 如果没有指定 fill 且不是 stroke 图标，默认在 svg 上补上 fill="#ffffff" (避免某些 Godot 渲染默认为黑)
  }
  return res;
}

function main() {
  console.log('🚀 开始读取 25,000+ 矢量图标库...');
  const startTime = Date.now();
  const catalogContent = fs.readFileSync(CATALOG_PATH, 'utf8');
  const match = catalogContent.match(/window\.AT_ICONS_LIST\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    console.error('❌ 无法解析 icons_catalog.js');
    process.exit(1);
  }

  const list = JSON.parse(match[1]);
  console.log(`📦 共发现 ${list.length} 个图标，正在进行压缩与导出...`);

  let count = 0;
  const createdDirs = new Set();

  for (const item of list) {
    if (!item.resPath || !item.svg) continue;
    // resPath 示例: res://addons/gotod_ui/assets/icons/node/arrow_turn_up_right.svg
    const relPath = item.resPath.replace('res://addons/gotod_ui/assets/icons/', '');
    const outPath = path.join(BASE_OUTPUT_DIR, relPath);
    const dir = path.dirname(outPath);

    if (!createdDirs.has(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      createdDirs.add(dir);
    }

    const isBrand = item.lib === 'brands';
    const optimized = optimizeSvg(item.svg, isBrand);
    fs.writeFileSync(outPath, optimized, 'utf8');
    count++;
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✨ 全部完成！耗时: ${duration}s`);
  console.log(`🎉 成功导出并压缩了 ${count} 个 SVG 图标至: addons/gotod_ui/assets/icons/`);
}

main();
