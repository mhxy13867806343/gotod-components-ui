// =========================================================================
// Gotod Components UI - Icon Tools & Multi-Format Code Exporter
// =========================================================================
// ==========================================================================
// Icon Actions & Enhanced Multi-Format Copy & Download
// ==========================================================================
window.currentCopyFormat = 'gdscript'; // 'gdscript' | 'annotation' | 'bbcode' | 'svg' | 'datauri'
window.iconFavorites = JSON.parse(localStorage.getItem('gotod_icon_favorites') || '[]');

window.ensureIconGalleryState = function() {
  const parsedSize = parseInt(window.currentIconSize, 10);
  window.currentIconSize = Number.isFinite(parsedSize) && parsedSize >= 8 ? parsedSize : 16;
  window.currentIconColor = window.currentIconColor || '#409eff';
  window.currentIconSearch = typeof window.currentIconSearch === 'string' ? window.currentIconSearch : '';
  window.currentIconLib = window.currentIconLib || 'all';
  window.currentIconCategory = window.currentIconCategory || 'all';

  const parsedPageSize = parseInt(window.iconPageSize, 10);
  window.iconPageSize = Number.isFinite(parsedPageSize) && parsedPageSize > 0 ? parsedPageSize : 400;

  const parsedPage = parseInt(window.iconCurrentPage, 10);
  window.iconCurrentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

window.setCopyFormat = function(fmt, btnEl) {
  window.currentCopyFormat = fmt;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  window.showToast('已切换复制格式为: ' + fmt.toUpperCase(), 'info');
};

window.toggleIconFavorite = function(iconName, event) {
  if (event) event.stopPropagation();
  const idx = window.iconFavorites.indexOf(iconName);
  if (idx >= 0) {
    window.iconFavorites.splice(idx, 1);
    window.showToast('已从收藏夹移除: ' + iconName, 'info');
  } else {
    window.iconFavorites.push(iconName);
    window.showToast('已收藏图标: ' + iconName, 'success');
  }
  localStorage.setItem('gotod_icon_favorites', JSON.stringify(window.iconFavorites));
  window.renderIconGalleryGrid();
};

window.downloadIconSvg = function(iconName, resPath, event) {
  if (event) event.stopPropagation();
  const list = window.AT_ICONS_LIST || [];
  const icon = list.find(i => i.name === iconName);
  if (!icon || !icon.svg) {
    window.showToast('未找到 SVG 源码', 'warning');
    return;
  }
  const blob = new Blob([icon.svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${iconName}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  window.showToast(`已下载: ${iconName}.svg`, 'success');
};

window.copyIconSnippet = function(iconName, resPath, cardEl) {
  const list = window.AT_ICONS_LIST || [];
  const icon = list.find(i => i.name === iconName) || {};
  const svg = icon.svg || '';
  const fmt = window.currentCopyFormat || 'gdscript';
  let textToCopy = '';
  let toastMsg = '';

  const size = (window.currentIconSize || 16) + '.0';
  const color = window.currentIconColor || '#409eff';
  const safeResPath = resPath || `res://addons/gotod_ui/assets/icons/node/${iconName}.svg`;

  const builtInIcons = ["arrow-down", "arrow-left", "arrow-right", "arrow-up", "bell", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "close", "copy", "edit", "error", "eye-off", "eye", "gamepad", "heart", "home", "info", "lock", "minus", "plus", "question", "refresh", "search", "settings", "shield", "spinner", "star", "success", "sword", "trash", "unlock", "user", "warning", "x"];
  const isBuiltIn = builtInIcons.includes(iconName) || builtInIcons.includes(iconName.replace(/_/g, '-'));

  if (fmt === 'gdscript') {
    if (isBuiltIn) {
      textToCopy = `# 内置核心图标 (直接构建)
var icon = GIcon.create("${iconName}", ${size}, Color("${color}"))
add_child(icon)`;
    } else {
      textToCopy = `# 原生 SVG 字符串直接动态构建 (零本地文件依赖，即拷即用)
var svg_str = """${svg}"""
var icon = GIcon.from_svg(svg_str, ${size})
add_child(icon)`;
    }
    toastMsg = `已复制 GDScript 代码: ${iconName}`;
  } else if (fmt === 'annotation') {
    textToCopy = `@icon("${safeResPath}")`;
    toastMsg = `已复制 @icon 注解: @icon("${safeResPath}")`;
  } else if (fmt === 'bbcode') {
    textToCopy = `[img=${parseInt(size, 10)}]${safeResPath}[/img]`;
    toastMsg = `已复制富文本 BBCode: [img]${safeResPath}[/img]`;
  } else if (fmt === 'svg') {
    textToCopy = svg;
    toastMsg = `已复制 SVG 源码 (${iconName}.svg)`;
  } else if (fmt === 'datauri') {
    const b64 = btoa(unescape(encodeURIComponent(svg)));
    textToCopy = `data:image/svg+xml;base64,${b64}`;
    toastMsg = `已复制 Base64 DataURI`;
  } else if (fmt === 'csharp') {
    textToCopy = `// C# (Godot .NET) 实例化
var icon = GIcon.create("${iconName}", ${size}f, new Color("${color}"));
AddChild(icon);

// 或直接使用 SVG 字符串构建:
var svgStr = @"${svg}";
var iconSvg = GIcon.from_svg(svgStr, ${size}f);
AddChild(iconSvg);`;
    toastMsg = `已复制 C# 调用代码: ${iconName}`;
  }

  if (cardEl) {
    cardEl.classList.add('copied-pulse');
    setTimeout(() => cardEl.classList.remove('copied-pulse'), 400);
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      window.showToast(toastMsg, 'success');
    }).catch(() => {
      window.showToast(`已选图标: ${iconName}`, 'success');
    });
  } else {
    window.showToast(`已选图标: ${iconName}`, 'success');
  }
};

window.initIconGallery = function() {
  const container = document.getElementById('iconGalleryContainer');
  if (!container) return;
  window.ensureIconGalleryState();

  const totalCount = window.AT_ICONS_LIST ? window.AT_ICONS_LIST.length : 0;
  const countBadge = document.getElementById('iconCountBadge');
  if (countBadge) countBadge.innerText = totalCount + ' Icons';

  window.renderIconGalleryGrid();
};

window.renderIconGalleryGrid = function() {
  const grid = document.getElementById('iconGridList');
  if (!grid) return;
  window.ensureIconGalleryState();

  const list = window.AT_ICONS_LIST || [];
  const q = (window.currentIconSearch || '').toLowerCase().trim();
  const lib = window.currentIconLib || 'all';
  const cat = window.currentIconCategory || 'all';
  const favs = window.iconFavorites || [];

  const filtered = list.filter(item => {
    let matchLib = true;
    if (lib === 'favorites') {
      matchLib = favs.includes(item.name);
    } else if (lib !== 'all') {
      matchLib = (item.lib === lib);
    }

    const matchCat = (cat === 'all' || item.category === cat);
    const matchQ = (!q || item.name.toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q)));
    return matchLib && matchCat && matchQ;
  });

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / window.iconPageSize));
  
  if (window.iconCurrentPage > totalPages) {
    window.iconCurrentPage = 1;
  }

  const countEl = document.getElementById('iconFilteredCount');
  if (countEl) countEl.innerText = `共检索到 ${totalCount} 个图标 (第 ${window.iconCurrentPage}/${totalPages} 页)`;

  if (totalCount === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px 16px; text-align: center; color: var(--text-secondary);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"></i>
        <div style="font-size: 14px; font-weight: 600;">未找到与 "${q}" 匹配的矢量图标</div>
        <div style="font-size: 12px; margin-top: 4px;">尝试搜索：sword, shield, chest, clear, heart, user, search, home, potion...</div>
      </div>
    `;
    window.renderPaginationBar(0, 1);
    return;
  }

  const startIndex = (window.iconCurrentPage - 1) * window.iconPageSize;
  const endIndex = Math.min(startIndex + window.iconPageSize, totalCount);
  const displayList = filtered.slice(startIndex, endIndex);

  grid.innerHTML = displayList.map(icon => {
    const isFav = favs.includes(icon.name);
    return `
      <div class="icon-gallery-card" onclick="window.copyIconSnippet('${icon.name}', '${icon.resPath}', this)" title="[${icon.libName}] 点击复制当前格式代码">
        <div style="position:absolute; top:6px; right:6px; display:flex; gap:4px; z-index:2;">
          <button class="icon-card-action-btn" onclick="window.toggleIconFavorite('${icon.name}', event)" title="${isFav ? '取消收藏' : '加入收藏夹'}" style="background:none; border:none; cursor:pointer; font-size:11px; color:${isFav ? '#f59e0b' : 'var(--text-secondary)'}; opacity:${isFav ? '1' : '0.4'};">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
          </button>
          <button class="icon-card-action-btn" onclick="window.downloadIconSvg('${icon.name}', '${icon.resPath}', event)" title="下载 SVG 文件" style="background:none; border:none; cursor:pointer; font-size:11px; color:var(--text-secondary); opacity:0.4;">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
        <div class="icon-preview-box">
          <span class="icon-svg-host" style="width:var(--gallery-icon-size, ${window.currentIconSize}px); height:var(--gallery-icon-size, ${window.currentIconSize}px); display:inline-flex; align-items:center; justify-content:center; color:var(--gallery-icon-color, ${window.currentIconColor});">
            ${icon.svg}
          </span>
        </div>
        <div class="icon-card-name" title="${icon.name}">${icon.name}</div>
        <div class="icon-card-label" title="${icon.libName} · ${icon.description}">${icon.libName}</div>
      </div>
    `;
  }).join('');

  window.renderPaginationBar(totalCount, totalPages);
};

window.renderPaginationBar = function(totalCount, totalPages) {
  const container = document.getElementById('iconPaginationBar');
  if (!container) return;
  window.ensureIconGalleryState();

  if (totalCount === 0 || totalPages <= 1) {
    if (totalCount > 0) {
      container.innerHTML = `
        <div class="icon-pagination-info">
          <span>共 <strong>${totalCount}</strong> 个图标 (每页 <strong>400</strong> 条)</span>
        </div>
        <div style="font-size:12px; color:var(--text-secondary);">单页已展示全部结果</div>
      `;
    } else {
      container.innerHTML = '';
    }
    return;
  }

  const cur = window.iconCurrentPage;
  
  // Calculate smart page range
  let pageButtons = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageButtons.push(i);
  } else {
    if (cur <= 4) {
      pageButtons = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (cur >= totalPages - 3) {
      pageButtons = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageButtons = [1, '...', cur - 1, cur, cur + 1, '...', totalPages];
    }
  }

  const pageBtnsHtml = pageButtons.map(p => {
    if (p === '...') {
      return `<span style="padding: 0 4px; color:var(--text-secondary);">...</span>`;
    }
    const activeClass = (p === cur) ? 'active' : '';
    return `<button class="icon-page-btn ${activeClass}" onclick="window.changeIconPage(${p})">${p}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="icon-pagination-info">
      <span>共 <strong>${totalCount}</strong> 个图标 · 第 <strong>${cur}</strong> / <strong>${totalPages}</strong> 页 (每页 400 条)</span>
    </div>

    <div class="icon-pagination-controls">
      <button class="icon-page-btn" onclick="window.prevIconPage()" ${cur <= 1 ? 'disabled' : ''} title="上一页">
        <i class="fa-solid fa-chevron-left"></i> 上一页
      </button>

      ${pageBtnsHtml}

      <button class="icon-page-btn" onclick="window.nextIconPage()" ${cur >= totalPages ? 'disabled' : ''} title="下一页">
        下一页 <i class="fa-solid fa-chevron-right"></i>
      </button>

      <div class="icon-page-jumper" style="margin-left: 10px;">
        <span>前往</span>
        <input type="number" class="icon-page-input" value="${cur}" min="1" max="${totalPages}"
               onkeydown="if(event.key==='Enter') window.changeIconPage(parseInt(this.value, 10))"
               onchange="window.changeIconPage(parseInt(this.value, 10))">
        <span>页</span>
      </div>
    </div>
  `;
};

window.changeIconPage = function(page) {
  window.ensureIconGalleryState();
  const list = window.AT_ICONS_LIST || [];
  const q = (window.currentIconSearch || '').toLowerCase().trim();
  const lib = window.currentIconLib || 'all';
  const cat = window.currentIconCategory || 'all';
  const favs = window.iconFavorites || [];

  const filtered = list.filter(item => {
    const matchLib = lib === 'favorites' ? favs.includes(item.name) : (lib === 'all' || item.lib === lib);
    const matchCat = (cat === 'all' || item.category === cat);
    const matchQ = (!q || item.name.toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q)));
    return matchLib && matchCat && matchQ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / window.iconPageSize));
  let target = parseInt(page, 10);
  if (isNaN(target) || target < 1) target = 1;
  if (target > totalPages) target = totalPages;

  window.iconCurrentPage = target;
  window.renderIconGalleryGrid();
  
  // Smooth scroll back to top of grid
  const container = document.getElementById('iconGalleryContainer');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.nextIconPage = function() {
  window.changeIconPage(window.iconCurrentPage + 1);
};

window.prevIconPage = function() {
  window.changeIconPage(window.iconCurrentPage - 1);
};

window.filterIconLib = function(lib, btnEl) {
  window.currentIconLib = lib;
  window.iconCurrentPage = 1;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  window.renderIconGalleryGrid();
};

window.filterIconCategory = function(cat, btnEl) {
  window.currentIconCategory = cat;
  window.iconCurrentPage = 1;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  window.renderIconGalleryGrid();
};

window.handleIconSearchInput = function(query) {
  window.currentIconSearch = query;
  window.iconCurrentPage = 1;
  const clearBtn = document.getElementById('iconSearchClearBtn');
  if (clearBtn) {
    clearBtn.style.display = query && query.trim() ? 'flex' : 'none';
  }
  window.renderIconGalleryGrid();
};

window.clearIconSearch = function() {
  const input = document.getElementById('iconSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  window.handleIconSearchInput('');
};

window.changeIconSize = function(sizePx, btnEl) {
  let num = parseInt(sizePx, 10) || 16;
  if (num % 2 !== 0) num += 1;
  window.currentIconSize = num;
  
  const grid = document.getElementById('iconGridList');
  if (grid) {
    grid.style.setProperty('--gallery-icon-size', num + 'px');
  }

  const input = document.getElementById('iconCustomSizeInput');
  if (input) {
    input.value = num;
  }

  const container = document.getElementById('iconSizeBtnGroup');
  if (container) {
    container.querySelectorAll('.icon-size-btn').forEach(b => {
      if (parseInt(b.getAttribute('data-size'), 10) === num) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }
};

window.changeIconSizeInput = function(val) {
  let num = parseInt(val, 10);
  if (isNaN(num) || num < 6) return;
  if (num > 256) num = 256;
  
  window.currentIconSize = num;
  const grid = document.getElementById('iconGridList');
  if (grid) {
    grid.style.setProperty('--gallery-icon-size', num + 'px');
  }

  const container = document.getElementById('iconSizeBtnGroup');
  if (container) {
    container.querySelectorAll('.icon-size-btn').forEach(b => {
      if (parseInt(b.getAttribute('data-size'), 10) === num) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }
};

window.stepIconSize = function(delta) {
  let cur = parseInt(window.currentIconSize, 10) || 16;
  cur += delta;
  if (cur % 2 !== 0) cur += (delta > 0 ? 1 : -1);
  if (cur < 8) cur = 8;
  if (cur > 256) cur = 256;
  window.changeIconSize(cur, null);
};

window.changeIconColor = function(colorCss, swatchEl) {
  window.currentIconColor = colorCss;
  const grid = document.getElementById('iconGridList');
  if (grid) {
    grid.style.setProperty('--gallery-icon-color', colorCss);
  }
  if (swatchEl && swatchEl.parentElement) {
    swatchEl.parentElement.querySelectorAll('.icon-color-swatch').forEach(s => s.classList.remove('active'));
    swatchEl.classList.add('active');
  }
  const colorInput = document.getElementById('iconCustomColorInput');
  if (colorInput && colorCss.startsWith('#')) {
    colorInput.value = colorCss;
  }
};

