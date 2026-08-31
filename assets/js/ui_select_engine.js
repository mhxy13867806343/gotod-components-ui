// =========================================================================
// Gotod Components UI - High-Fidelity Custom Select Component Engine
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


