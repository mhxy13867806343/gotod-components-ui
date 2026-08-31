// =========================================================================
// Gotod Components UI - Advanced UI Components (Select, Icons, Table, VList, I18n)
// =========================================================================
// ==========================================================================
// Element Plus High-Fidelity Custom Select Component Engine
// ==========================================================================
window.customSelectStores = {};

window.registerCustomSelect = function(id, config) {
  window.customSelectStores[id] = {
    options: config.options || [],
    selected: config.multiple ? (config.selected || []) : (config.selected !== undefined ? config.selected : null),
    placeholder: config.placeholder || '请选择 / Select...',
    clearable: config.clearable !== false,
    filterable: config.filterable !== false,
    multiple: !!config.multiple,
    collapseTags: !!config.collapseTags,
    maxCollapseTags: config.maxCollapseTags || 1,
    disabled: !!config.disabled,
    onChange: config.onChange || null,
    searchQuery: ''
  };
  window.renderCustomSelect(id);
};

window.renderCustomSelect = function(id) {
  const store = window.customSelectStores[id];
  const container = document.getElementById(id);
  if (!store || !container) return;

  const hasValue = store.multiple 
    ? (store.selected && store.selected.length > 0) 
    : (store.selected !== null && store.selected !== undefined && store.selected !== '');

  // 1. Render Value Area
  let valueHtml = '';
  if (!hasValue) {
    valueHtml = `<span class="g-custom-select-placeholder">${store.placeholder}</span>`;
  } else if (store.multiple) {
    const selectedOpts = store.options.filter(o => store.selected.includes(o.value));
    const showCount = store.collapseTags ? Math.min(selectedOpts.length, store.maxCollapseTags) : selectedOpts.length;
    
    for (let i = 0; i < showCount; i++) {
      const opt = selectedOpts[i];
      valueHtml += `
        <span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 6px; display:inline-flex; align-items:center; gap:4px;">
          ${opt.label}
          <i class="fa-solid fa-xmark" style="cursor:pointer; font-size:10px;" onclick="event.stopPropagation(); window.removeCustomSelectTag('${id}', '${opt.value}')"></i>
        </span>
      `;
    }

    if (store.collapseTags && selectedOpts.length > store.maxCollapseTags) {
      valueHtml += `<span class="g-tag g-tag-info" style="font-size:11px; padding:2px 6px;">+${selectedOpts.length - store.maxCollapseTags}</span>`;
    }
  } else {
    const selectedOpt = store.options.find(o => o.value === store.selected);
    const label = selectedOpt ? (selectedOpt.customHtml || selectedOpt.label) : store.selected;
    valueHtml = `<span class="g-custom-select-single-value">${label}</span>`;
  }

  // 2. Filter options
  const q = store.searchQuery.toLowerCase().trim();
  const filtered = q === '' 
    ? store.options 
    : store.options.filter(o => (o.label && o.label.toLowerCase().includes(q)) || (o.value && String(o.value).toLowerCase().includes(q)) || (o.group && o.group.toLowerCase().includes(q)));

  let optionsHtml = '';
  if (filtered.length === 0) {
    optionsHtml = `<div class="g-custom-select-empty"><i class="fa-solid fa-inbox" style="margin-right:4px;"></i> 无匹配数据 (No Data)</div>`;
  } else {
    let currentGroup = '';
    filtered.forEach(opt => {
      if (opt.group && opt.group !== currentGroup) {
        currentGroup = opt.group;
        optionsHtml += `<div class="g-custom-select-group-header">— ${currentGroup} —</div>`;
      }

      const isSelected = store.multiple 
        ? (store.selected && store.selected.includes(opt.value)) 
        : (store.selected === opt.value);

      const disabledClass = opt.disabled ? ' is-disabled' : '';
      const selectedClass = isSelected ? ' is-selected' : '';
      const checkIcon = isSelected ? '<i class="fa-solid fa-check" style="color:var(--primary); font-size:12px;"></i>' : '';
      const displayContent = opt.customHtml || opt.label;

      optionsHtml += `
        <div class="g-custom-select-option${selectedClass}${disabledClass}" 
             onclick="${opt.disabled ? '' : `window.selectCustomOption('${id}', '${opt.value}')`}">
          <div>${displayContent}</div>
          ${checkIcon}
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="g-custom-select-wrapper" id="${id}_wrapper">
      <div class="g-custom-select-control ${store.disabled ? 'is-disabled' : ''}" 
           onclick="${store.disabled ? '' : `window.toggleCustomSelect('${id}')`}" id="${id}_ctrl">
        <div class="g-custom-select-value-area">
          ${valueHtml}
        </div>
        <div class="g-custom-select-actions">
          ${store.clearable && hasValue && !store.disabled ? `<span class="g-custom-select-clear has-value" onclick="event.stopPropagation(); window.clearCustomSelect('${id}')"><i class="fa-solid fa-xmark"></i></span>` : ''}
          <span class="g-custom-select-arrow"><i class="fa-solid fa-chevron-down"></i></span>
        </div>
      </div>
      <div class="g-custom-select-dropdown" id="${id}_drop">
        ${store.filterable ? `
          <div class="g-custom-select-search-box" onclick="event.stopPropagation();">
            <input type="text" class="g-custom-select-search-input" placeholder="🔍 输入关键字过滤选项..." 
                   value="${store.searchQuery}" oninput="window.filterCustomOptions('${id}', this.value)" id="${id}_search_inp">
          </div>
        ` : ''}
        <div class="g-custom-select-options-list">
          ${optionsHtml}
        </div>
      </div>
    </div>
  `;
};

window.toggleCustomSelect = function(id) {
  const ctrl = document.getElementById(`${id}_ctrl`);
  const drop = document.getElementById(`${id}_drop`);
  if (!ctrl || !drop) return;

  const isOpen = drop.classList.contains('is-open');
  // Close other open selects
  document.querySelectorAll('.g-custom-select-dropdown.is-open').forEach(d => {
    d.classList.remove('is-open');
    if (d.previousElementSibling) d.previousElementSibling.classList.remove('is-open');
  });

  if (!isOpen) {
    drop.classList.add('is-open');
    ctrl.classList.add('is-open');
    const inp = document.getElementById(`${id}_search_inp`);
    if (inp) setTimeout(() => inp.focus(), 50);
  }
};

window.selectCustomOption = function(id, value) {
  const store = window.customSelectStores[id];
  if (!store) return;

  if (store.multiple) {
    const idx = store.selected.indexOf(value);
    if (idx > -1) {
      store.selected.splice(idx, 1);
    } else {
      store.selected.push(value);
    }
  } else {
    store.selected = value;
    const drop = document.getElementById(`${id}_drop`);
    const ctrl = document.getElementById(`${id}_ctrl`);
    if (drop) drop.classList.remove('is-open');
    if (ctrl) ctrl.classList.remove('is-open');
  }

  window.renderCustomSelect(id);
  if (store.multiple) {
    const drop = document.getElementById(`${id}_drop`);
    const ctrl = document.getElementById(`${id}_ctrl`);
    if (drop) drop.classList.add('is-open');
    if (ctrl) ctrl.classList.add('is-open');
  }

  if (store.onChange) {
    const selectedOpt = store.options.find(o => o.value === value);
    store.onChange(store.selected, selectedOpt);
  }
};

window.removeCustomSelectTag = function(id, value) {
  const store = window.customSelectStores[id];
  if (!store || !store.multiple) return;
  const idx = store.selected.indexOf(value);
  if (idx > -1) {
    store.selected.splice(idx, 1);
    window.renderCustomSelect(id);
    if (store.onChange) store.onChange(store.selected, null);
  }
};

window.clearCustomSelect = function(id) {
  const store = window.customSelectStores[id];
  if (!store) return;
  store.selected = store.multiple ? [] : null;
  store.searchQuery = '';
  window.renderCustomSelect(id);
  if (window.showToast) window.showToast('已一键清空选择器选中值', 'info');
  if (store.onChange) store.onChange(store.selected, null);
};

window.filterCustomOptions = function(id, query) {
  const store = window.customSelectStores[id];
  if (!store) return;
  store.searchQuery = query;
  window.renderCustomSelect(id);
  const inp = document.getElementById(`${id}_search_inp`);
  if (inp) {
    inp.focus();
    inp.setSelectionRange(query.length, query.length);
  }
  const drop = document.getElementById(`${id}_drop`);
  const ctrl = document.getElementById(`${id}_ctrl`);
  if (drop) drop.classList.add('is-open');
  if (ctrl) ctrl.classList.add('is-open');
};

// Global click outside to close dropdowns
document.addEventListener('click', function(e) {
  if (!e.target.closest('.g-custom-select-wrapper')) {
    document.querySelectorAll('.g-custom-select-dropdown.is-open').forEach(d => {
      d.classList.remove('is-open');
      if (d.previousElementSibling) d.previousElementSibling.classList.remove('is-open');
    });
  }
});

window.initSelectDemos = function() {
  // Demo 1: Basic Select & Clearable
  window.registerCustomSelect('demo_select_basic', {
    placeholder: '请选择渲染管线...',
    clearable: true,
    filterable: false,
    selected: '4.3_forward',
    options: [
      { label: 'Godot 4.3 (Forward+ 高画质管线)', value: '4.3_forward' },
      { label: 'Godot 4.3 (Mobile 移动端轻量)', value: '4.3_mobile' },
      { label: 'Godot 4.4 (Latest 最新稳定版)', value: '4.4_latest' },
      { label: 'Godot 4.6+ (Future 未来试验特性)', value: '4.6_future' }
    ],
    onChange: (val, opt) => {
      if (val && window.showToast) window.showToast(`已选择渲染管线: ${opt ? opt.label : val}`, 'success');
    }
  });

  // Demo 2-A: Option Disabled (有禁用选项)
  window.registerCustomSelect('demo_select_opt_disabled', {
    placeholder: '请选择装备强化方案...',
    clearable: true,
    filterable: false,
    selected: 'opt1',
    options: [
      { label: '初级强化石 (+1~+5 成功率 100%)', value: 'opt1' },
      { label: '中级祝福水晶 (+6~+9 需要铁匠 3 级 - 已禁用)', value: 'opt2', disabled: true },
      { label: '高级天界神石 (+10~+15 成功率 85%)', value: 'opt3' },
      { label: '太古不灭符文 (未解锁副本 - 已禁用)', value: 'opt4', disabled: true },
      { label: '神话虚空精粹 (+20 终极附魔)', value: 'opt5' }
    ],
    onChange: (val, opt) => {
      if (val && window.showToast) window.showToast(`已选中强化方案: ${opt ? opt.label : val}`, 'info');
    }
  });

  // Demo 2-B: Select Disabled (禁用整个选择器组件)
  window.registerCustomSelect('demo_select_full_disabled', {
    placeholder: '选择器已处于全局禁用状态 (disabled = true)',
    disabled: true,
    clearable: true,
    selected: 'locked_val',
    options: [
      { label: '已锁定的系统默认配置', value: 'locked_val' }
    ]
  });

  // Demo 3: Filterable & Searchable
  window.registerCustomSelect('demo_select_filterable', {
    placeholder: '🔍 输入关键字搜索框架 / 算法...',
    clearable: true,
    filterable: true,
    selected: 'el_plus',
    options: [
      { label: 'Element Plus 现代化组件库 (Select/Dialog)', value: 'el_plus' },
      { label: 'Naive UI 极速类型安全组件 (TypeScript)', value: 'naive' },
      { label: 'Ant Design Vue 极客设计体系 (AntD)', value: 'antd' },
      { label: 'Vant UI 移动端轻提示与选择器 (Mobile)', value: 'vant' },
      { label: 'Vue.js 3 响应式底层 (Reactivity Core)', value: 'vue3' },
      { label: 'A* 智能路径寻路算法 (Pathfinding)', value: 'astar' },
      { label: '二阶贝塞尔弹道抛物线 (GPhysics)', value: 'bezier' },
      { label: 'Godot 4 GDScript 现代化高阶绑定 (Gotod)', value: 'gotod' }
    ],
    onChange: (val, opt) => {
      if (val && window.showToast) window.showToast(`已实时搜索并选中: ${opt ? opt.label : val}`, 'info');
    }
  });

  // Demo 4: Multiple Tags & Collapse Tags
  window.registerCustomSelect('demo_select_multiple', {
    placeholder: '请多选需要启用的游戏核心系统...',
    clearable: true,
    filterable: true,
    multiple: true,
    collapseTags: true,
    maxCollapseTags: 2,
    selected: ['physics', 'particles', 'dialogue', 'axios'],
    options: [
      { label: '2D 物理碰撞运动学 (GPhysics)', value: 'physics' },
      { label: '粒子炫彩特效发射器 (GPUParticles2D)', value: 'particles' },
      { label: 'JRPG 双人剧情对话流 (GDialogue)', value: 'dialogue' },
      { label: 'Axios 风格 REST 客户端 (GAxios)', value: 'axios' },
      { label: '全双工 WebSocket 长连接 (GWebSocket)', value: 'ws' },
      { label: '全局路由场景平滑转场 (GRouter)', value: 'router' },
      { label: '16路全局音效与BGM淡入淡出 (GAsset)', value: 'asset' }
    ],
    onChange: (vals) => {
      if (window.showToast) window.showToast(`多选集合变更，当前已选中 ${vals.length} 项`, 'info');
    }
  });

  // Demo 5: Option Grouping & Group Disabled
  window.registerCustomSelect('demo_select_group', {
    placeholder: '请选择出战英雄职业...',
    clearable: true,
    filterable: true,
    selected: 'warrior',
    options: [
      { label: '狂暴战 (Warrior - 近战输出)', value: 'warrior', group: '近战狂暴系 (Melee)' },
      { label: '圣骑士 (Paladin - 需暗影通关 - 禁用)', value: 'paladin', group: '近战狂暴系 (Melee)', disabled: true },
      { label: '潜行者 (Rogue - 致命背刺)', value: 'rogue', group: '近战狂暴系 (Melee)' },
      { label: '大魔导师 (Archmage - 暴风雪)', value: 'archmage', group: '远程魔法系 (Caster)' },
      { label: '暗影术士 (Warlock - 诅咒之箭)', value: 'warlock', group: '远程魔法系 (Caster)' },
      { label: '自然德鲁伊 (Druid - 宁静守护)', value: 'druid', group: '远程魔法系 (Caster)' }
    ],
    onChange: (val, opt) => {
      if (val && window.showToast) window.showToast(`已锁定出战职业: ${opt ? opt.label : val}`, 'success');
    }
  });

  // Demo 6: Custom Option Template & Slots
  window.registerCustomSelect('demo_select_custom', {
    placeholder: '请挑选神话伙伴出战...',
    clearable: true,
    filterable: true,
    selected: 'kadgar',
    options: [
      {
        label: '大魔导师·卡德加',
        value: 'kadgar',
        customHtml: `
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">🧙‍♂️</span>
              <div>
                <div style="font-weight:700; font-size:13px; color:var(--text-primary);">大魔导师·卡德加</div>
                <div style="font-size:11px; color:var(--text-secondary);">全屏禁咒 · 暴风雪</div>
              </div>
            </div>
            <span class="g-tag g-tag-warning" style="font-size:10px; font-weight:800;">SSR 评级</span>
          </div>
        `
      },
      {
        label: '光明使者·乌瑟尔',
        value: 'uther',
        customHtml: `
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">⚔️</span>
              <div>
                <div style="font-weight:700; font-size:13px; color:var(--text-primary);">光明使者·乌瑟尔</div>
                <div style="font-size:11px; color:var(--text-secondary);">神圣护盾 · 圣光术</div>
              </div>
            </div>
            <span class="g-tag g-tag-warning" style="font-size:10px; font-weight:800;">SSR 评级</span>
          </div>
        `
      },
      {
        label: '风行者·希尔瓦娜斯',
        value: 'sylvanas',
        customHtml: `
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">🏹</span>
              <div>
                <div style="font-weight:700; font-size:13px; color:var(--text-primary);">风行者·希尔瓦娜斯</div>
                <div style="font-size:11px; color:var(--text-secondary);">暗影穿透 · 哀恸之箭</div>
              </div>
            </div>
            <span class="g-tag g-tag-primary" style="font-size:10px; font-weight:800;">SR 评级</span>
          </div>
        `
      }
    ],
    onChange: (val, opt) => {
      if (val && window.showToast) window.showToast(`出战神话伙伴已更新: ${opt ? opt.label : val}`, 'success');
    }
  });
};


// ==========================================================================
// Icon Actions & Enhanced Multi-Format Copy & Download
// ==========================================================================
window.currentCopyFormat = 'gdscript'; // 'gdscript' | 'annotation' | 'bbcode' | 'svg' | 'datauri'
window.iconFavorites = JSON.parse(localStorage.getItem('gotod_icon_favorites') || '[]');

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

  const snippet = `var icon = GIcon.new("${iconName}", ${window.currentIconSize}.0, Color("${window.currentIconColor}"))`;
  const annotation = `@icon("${resPath || 'res://addons/gotod_ui/assets/icons/node/' + iconName + '.svg'}")`;
  const bbcode = `[img=${window.currentIconSize}]${resPath}[/img]`;

  if (fmt === 'gdscript') {
    textToCopy = `# GDScript 实例化:
${snippet}
add_child(icon)`;
    toastMsg = `已复制 GDScript: ${snippet}`;
  } else if (fmt === 'annotation') {
    textToCopy = annotation;
    toastMsg = `已复制 @icon 注解: ${annotation}`;
  } else if (fmt === 'bbcode') {
    textToCopy = bbcode;
    toastMsg = `已复制富文本 BBCode: ${bbcode}`;
  } else if (fmt === 'svg') {
    textToCopy = svg;
    toastMsg = `已复制 SVG 源码 (${iconName}.svg)`;
  } else if (fmt === 'datauri') {
    const b64 = btoa(unescape(encodeURIComponent(svg)));
    textToCopy = `data:image/svg+xml;base64,${b64}`;
    toastMsg = `已复制 Base64 DataURI`;
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

  const totalCount = window.AT_ICONS_LIST ? window.AT_ICONS_LIST.length : 0;
  const countBadge = document.getElementById('iconCountBadge');
  if (countBadge) countBadge.innerText = totalCount + ' Icons';

  window.renderIconGalleryGrid();
};

window.renderIconGalleryGrid = function() {
  const grid = document.getElementById('iconGridList');
  if (!grid) return;

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
  const list = window.AT_ICONS_LIST || [];
  const q = window.currentIconSearch.toLowerCase().trim();
  const lib = window.currentIconLib;
  const cat = window.currentIconCategory;

  const filtered = list.filter(item => {
    const matchLib = (lib === 'all' || item.lib === lib);
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

window.copyIconSnippet = function(iconName, resPath, cardEl) {
  const snippet = `var icon = GIcon.new("${iconName}", ${window.currentIconSize}.0, Color("${window.currentIconColor}"))`;
  const annotation = `@icon("${resPath || 'res://addons/gotod_ui/assets/icons/node/' + iconName + '.svg'}")`;
  
  if (cardEl) {
    cardEl.classList.add('copied-pulse');
    setTimeout(() => cardEl.classList.remove('copied-pulse'), 400);
  }

  const fullText = `# GDScript:
${snippet}
add_child(icon)

# Node 树类注解:
${annotation}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullText).then(() => {
      window.showToast(`已复制: ${iconName}\n${snippet}`, 'success');
    }).catch(() => {
      window.showToast(`已选图标: ${iconName}`, 'success');
    });
  } else {
    window.showToast(`已选图标: ${iconName}`, 'success');
  }
};

// =========================================================================
// GVirtualList Global Demo Helpers
// =========================================================================
window.onVListScroll = function(container) {
  if (!container) return;
  const ITEM_HEIGHT = 46;
  const TOTAL_ITEMS = 1000000;
  const VISIBLE_COUNT = 10;
  const BUFFER = 3;

  const scrollTop = container.scrollTop;
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(TOTAL_ITEMS, startIndex + VISIBLE_COUNT + BUFFER * 2);

  const content = document.getElementById('vListContent');
  if (!content) return;

  content.style.transform = 'translateY(' + (startIndex * ITEM_HEIGHT) + 'px)';

  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    const rank = i + 1;
    const score = (10000000 - i * 9.8).toFixed(0);
    let medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : '⚔️'));
    let bg = rank <= 3 ? 'background:rgba(24,160,88,0.08); border-color:var(--primary);' : 'background:var(--bg-surface);';
    
    html += '<div style="height:' + (ITEM_HEIGHT - 6) + 'px; ' + bg + ' border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">';
    html += '  <div style="display:flex; align-items:center; gap:8px;">';
    html += '    <span style="font-weight:700; width:60px;">' + medal + ' #' + rank + '</span>';
    html += '    <span>传奇勇士_' + (i % 9999 + 1000) + '</span>';
    html += '  </div>';
    html += '  <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">' + score + ' 战力</div>';
    html += '</div>';
  }

  content.innerHTML = html;
  const posTip = document.getElementById('vListPosTip');
  if (posTip) posTip.innerText = '当前视口：第 ' + (startIndex + 1) + ' ~ ' + endIndex + ' 条';
  const domCount = document.getElementById('vListDomCount');
  if (domCount) domCount.innerText = '⚡ 实际渲染节点: ' + (endIndex - startIndex) + ' 个';
};

window.scrollVListTo = function(idx) {
  const container = document.getElementById('vListContainer');
  if (container) {
    const ITEM_HEIGHT = 46;
    container.scrollTop = idx * ITEM_HEIGHT;
    window.onVListScroll(container);
    if (window.showToast) window.showToast('已极速定位至第 ' + (idx + 1) + ' 条数据', 'info');
  }
};

// =========================================================================
// GI18n Global Demo Helpers
// =========================================================================
window.I18N_DICT = {
  zh: {
    title: "🏰 遗忘神庙 · 讨伐任务",
    desc: "勇士 Arthur，你已成功升至 Lv.88！目前剩余 350 点体力，准备好迎接最终 BOSS 战了吗？",
    start: "⚔️ 开始远征",
    shop: "🛒 道具补给"
  },
  en: {
    title: "🏰 Forgotten Temple · Conquest Quest",
    desc: "Warrior Arthur, you have leveled up to Lv.88! You have 350 stamina left. Ready for the final BOSS fight?",
    start: "⚔️ Start Expedition",
    shop: "🛒 Item Supply"
  },
  ja: {
    title: "🏰 忘れられた神殿 · 討伐クエスト",
    desc: "勇者アーサー、Lv.88に到達しました！スタミナ残量 350。最終BOSS戦の準備はできましたか？",
    start: "⚔️ 遠征開始",
    shop: "🛒 アイテム補給"
  },
  ko: {
    title: "🏰 잊혀진 신전 · 토벌 퀘스트",
    desc: "용사 Arthur, Lv.88 달성을 축하합니다! 현재 남은 스테미너 350. 최종 BOSS전에 도전하시겠습니까?",
    start: "⚔️ 원정 시작",
    shop: "🛒 아이템 보급"
  }
};

window.switchDemoLang = function(locale) {
  ['zh', 'en', 'ja', 'ko'].forEach(l => {
    const btn = document.getElementById('i18nBtn_' + l);
    if (btn) btn.className = l === locale ? 'g-btn g-btn-primary' : 'g-btn g-btn-default';
  });
  const t = window.I18N_DICT[locale] || window.I18N_DICT.zh;
  const title = document.getElementById('i18nTitle');
  const desc = document.getElementById('i18nDesc');
  const btnStart = document.getElementById('i18nBtnStart');
  const btnShop = document.getElementById('i18nBtnShop');
  if (title) title.innerText = t.title;
  if (desc) desc.innerText = t.desc;
  if (btnStart) btnStart.innerText = t.start;
  if (btnShop) btnShop.innerText = t.shop;
  if (window.showToast) window.showToast('语言已动态热切换至: ' + locale.toUpperCase(), 'success');
};


// =========================================================================
// GTable & GTableV2 Global Demo Helpers
// =========================================================================
window.toggleTableStripe = function() {
  const t = document.getElementById('demoTable1');
  if (t) {
    t.classList.toggle('g-table-stripe');
    if (window.showToast) window.showToast('斑马纹已切换', 'info');
  }
};

window.toggleTableBorder = function() {
  const t = document.getElementById('demoTable1');
  if (t) {
    t.style.border = t.style.border ? '' : '1px solid var(--border-base)';
    if (window.showToast) window.showToast('边框已切换', 'info');
  }
};

window.onTableSelectAll = function(masterCb) {
  const cbs = document.querySelectorAll('.table-row-cb');
  cbs.forEach(cb => cb.checked = masterCb.checked);
  window.onTableRowSelect();
};

window.onTableRowSelect = function() {
  const body = document.getElementById('tableSelectBody');
  const cbs = document.querySelectorAll('.table-row-cb');
  const checked = Array.from(cbs).filter(cb => cb.checked).length;
  const tip = document.getElementById('tableSelTip');
  if (tip) tip.innerText = `已勾选: ${checked} / ${cbs.length} 项`;
  const master = document.getElementById('tableSelectAll');
  if (master) master.checked = checked === cbs.length && cbs.length > 0;

  // Check if Table is Empty and show Empty State Placeholder
  if (body) {
    const rows = body.querySelectorAll('tr:not(#tableEmptyRow)');
    let emptyRow = document.getElementById('tableEmptyRow');
    if (rows.length === 0) {
      if (!emptyRow) {
        emptyRow = document.createElement('tr');
        emptyRow.id = 'tableEmptyRow';
        emptyRow.innerHTML = `
          <td colspan="5" style="text-align:center; padding:36px 16px; color:var(--text-secondary); background:var(--bg-surface);">
            <div style="font-size:38px; margin-bottom:8px; opacity:0.65;">📭</div>
            <div style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:6px;">暂无数据 (No Data)</div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:14px;">当前表格数据已全部清空或未查询到匹配项</div>
            <button class="g-btn g-btn-primary" style="font-size:11.5px; padding:4px 14px; margin:0 auto;" onclick="window.resetDemoTableData()">
              🔄 恢复默认测试数据
            </button>
          </td>
        `;
        body.appendChild(emptyRow);
      }
    } else if (emptyRow) {
      emptyRow.remove();
    }
  }
};

window.resetDemoTableData = function() {
  const body = document.getElementById('tableSelectBody');
  if (!body) return;
  body.innerHTML = `
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">💎 远古泰坦龙晶</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">5,000</td>
      <td style="padding:10px 12px;">99+</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 远古泰坦龙晶', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">🧪 特效神圣生命药水</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">120</td>
      <td style="padding:10px 12px;">500</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 特效神圣生命药水', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">📜 禁忌回城卷轴</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">800</td>
      <td style="padding:10px 12px;">32</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 禁忌回城卷轴', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
  `;
  window.onTableRowSelect();
  if (window.showToast) window.showToast('已恢复默认道具测试数据！', 'success');
};

window.batchDeleteTable = function() {
  const cbs = document.querySelectorAll('.table-row-cb:checked');
  if (cbs.length === 0) {
    if (window.showToast) window.showToast('请先勾选需要移出的项！', 'warning');
    return;
  }
  cbs.forEach(cb => {
    const row = cb.closest('tr');
    if (row) row.remove();
  });
  window.onTableRowSelect();
  if (window.showToast) window.showToast(`已批量移出 ${cbs.length} 项！`, 'info');
};

window.isTablePriceAsc = false;
window.sortTableByPrice = function() {
  window.isTablePriceAsc = !window.isTablePriceAsc;
  const body = document.getElementById('tableSelectBody');
  if (!body) return;
  const rows = Array.from(body.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const pA = parseInt(a.children[2].innerText.replace(/,/g, ''), 10) || 0;
    const pB = parseInt(b.children[2].innerText.replace(/,/g, ''), 10) || 0;
    return window.isTablePriceAsc ? pA - pB : pB - pA;
  });
  rows.forEach(r => body.appendChild(r));
  if (window.showToast) window.showToast(`已按单价【${window.isTablePriceAsc ? '升序 ↑' : '降序 ↓'}】排序`, 'info');
};

window.onTableV2Scroll = function(container) {
  if (!container) return;
  const ROW_HEIGHT = 36;
  const TOTAL_ROWS = 100000;
  const VISIBLE_COUNT = 8;
  const BUFFER = 2;

  const scrollTop = container.scrollTop;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = Math.min(TOTAL_ROWS, startIndex + VISIBLE_COUNT + BUFFER * 2);

  const content = document.getElementById('tableV2Content');
  if (!content) return;

  content.style.transform = 'translateY(' + (startIndex * ROW_HEIGHT) + 'px)';

  const factions = ['联盟', '部落', '中立', '虚空', '龙族'];
  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    const rank = i + 1;
    const score = (5000000 - i * 42.5).toFixed(0);
    const faction = factions[i % factions.length];
    const floor = 1000 - Math.floor(i / 100);
    let bg = rank <= 3 ? 'background:rgba(24,160,88,0.08);' : (i % 2 === 1 ? 'background:rgba(0,0,0,0.02);' : 'background:var(--bg-surface);');

    html += '<div style=\"height:' + ROW_HEIGHT + 'px; ' + bg + ' border-bottom:1px solid var(--border-base); padding:0 12px; display:flex; align-items:center; font-size:12px;\">';
    html += '  <div style=\"width:70px; font-weight:700;\">' + (rank <= 3 ? '🏆 #' + rank : '#' + rank) + '</div>';
    html += '  <div style=\"width:140px; font-weight:600;\">冒险者_' + (i % 8999 + 1000) + '</div>';
    html += '  <div style=\"width:90px;\"><span class=\"g-tag g-tag-primary\" style=\"font-size:10px; padding:1px 5px;\">' + faction + '</span></div>';
    html += '  <div style=\"width:110px; font-family:var(--font-mono);\">第 ' + floor + ' 层</div>';
    html += '  <div style=\"flex:1; text-align:right; font-weight:700; color:#e6a23c; font-family:var(--font-mono);\">' + score + ' pts</div>';
    html += '</div>';
  }

  content.innerHTML = html;
};

window.scrollTableV2To = function(rowIdx) {
  const container = document.getElementById('tableV2Container');
  if (container) {
    const ROW_HEIGHT = 36;
    container.scrollTop = rowIdx * ROW_HEIGHT;
    window.onTableV2Scroll(container);
    if (window.showToast) window.showToast(`TableV2 已极速定位至第 ${rowIdx + 1} 行`, 'info');
  }
};

