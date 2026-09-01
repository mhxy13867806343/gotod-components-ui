#!/usr/bin/env node
/**
 * Gotod UI - 矢量图标按需提取与极限压缩工具
 * 从本地 25000+ 矢量图标库 (assets/js/icons_catalog.js) 中按需提取图标并压缩输出至 res://assets/icons/
 * 
 * 用法:
 *   node library/scripts/extract_icon.js arrow_turn_up_right [更多图标名...]
 *   node library/scripts/extract_icon.js --search arrow
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CATALOG_PATH = path.join(ROOT_DIR, 'assets/js/icons_catalog.js');
const OUTPUT_DIR = path.join(ROOT_DIR, 'assets/icons');

function optimizeSvg(svgStr) {
  if (!svgStr) return '';
  return svgStr
    // 移除 XML 声明和注释
    .replace(/<\?xml[\s\S]*?\?>/gi, '')
    .replace(/<!--[\s\S]*?-->/gi, '')
    // 统一颜色为纯白 #ffffff，确保 Godot modulate 染色精准
    .replace(/fill="#[0-9a-fA-F]{3,8}"/gi, 'fill="#ffffff"')
    .replace(/fill='#[0-9a-fA-F]{3,8}'/gi, 'fill="#ffffff"')
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/gi, 'stroke="#ffffff"')
    // 移除多余换行与空格
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`\n\x1b[36m[Gotod UI 图标提取 & 压缩工具]\x1b[0m`);
    console.log(`用法: node library/scripts/extract_icon.js <图标名称1> [图标名称2...]`);
    console.log(`搜索: node library/scripts/extract_icon.js --search <关键词>`);
    console.log(`示例: node library/scripts/extract_icon.js arrow_turn_up_right sword shield`);
    process.exit(0);
  }

  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`\x1b[31m[错误] 找不到图标库文件: ${CATALOG_PATH}\x1b[0m`);
    process.exit(1);
  }

  console.log(`\x1b[90m正在读取图标库...\x1b[0m`);
  const catalogContent = fs.readFileSync(CATALOG_PATH, 'utf8');
  const match = catalogContent.match(/window\.AT_ICONS_LIST\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    console.error(`\x1b[31m[错误] 无法解析 window.AT_ICONS_LIST\x1b[0m`);
    process.exit(1);
  }

  const list = JSON.parse(match[1]);

  if (args[0] === '--search') {
    const keyword = (args[1] || '').toLowerCase();
    const results = list.filter(i => i.name.toLowerCase().includes(keyword) || (i.description && i.description.toLowerCase().includes(keyword))).slice(0, 30);
    console.log(`\n\x1b[32m找到 ${results.length} 个匹配图标:\x1b[0m`);
    results.forEach(i => console.log(`  - \x1b[1m${i.name}\x1b[0m (\x1b[33m${i.libName}\x1b[0m: ${i.description})`));
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;
  for (const name of args) {
    const icon = list.find(i => i.name === name || i.name === name.replace(/-/g, '_') || i.name === name.replace(/_/g, '-'));
    if (!icon || !icon.svg) {
      console.warn(`\x1b[33m[未找到] 图标库中未找到 "${name}"\x1b[0m`);
      continue;
    }

    const optimized = optimizeSvg(icon.svg);
    const outFile = path.join(OUTPUT_DIR, `${icon.name}.svg`);
    fs.writeFileSync(outFile, optimized, 'utf8');
    const bytes = Buffer.byteLength(optimized, 'utf8');
    console.log(`\x1b[32m✔ 已导出并压缩: \x1b[1m${icon.name}.svg\x1b[0m (${bytes} bytes) -> res://assets/icons/${icon.name}.svg`);
    successCount++;
  }

  console.log(`\n\x1b[36m完成！成功提取并压缩 ${successCount} 个图标至 res://assets/icons/\x1b[0m`);
}

main();
