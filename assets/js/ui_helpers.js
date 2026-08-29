// =========================================================================
// Gotod Components UI - Global UI Helpers & Interactive Simulators
// 提取自 app.js：主题状态管理、通用表格渲染器、剪贴板复制、通用模拟器与交互辅助函数
// =========================================================================

// ==========================================
// 1. Unified LocalStorage Persistence Manager
// ==========================================
window.StorageUtil = {
  get: (key, fallback = null) => localStorage.getItem('gotod_' + key) || fallback,
  set: (key, val) => localStorage.setItem('gotod_' + key, val),
  getTheme: () => window.StorageUtil.get('theme', 'dark'),
  setTheme: (t) => window.StorageUtil.set('theme', t),
  getPreset: () => window.StorageUtil.get('preset', 'naive'),
  setPreset: (p) => window.StorageUtil.set('preset', p),
  getSection: () => window.StorageUtil.get('section', 'components'),
  setSection: (s) => window.StorageUtil.set('section', s),
  getDocKey: () => window.StorageUtil.get('doc_key', null),
  setDocKey: (k) => window.StorageUtil.set('doc_key', k)
};

// ==========================================
// 2. Global Theme & Preset DOM Sync Handlers
// ==========================================
window.syncThemeDOM = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  if (text) text.innerText = theme === 'dark' ? 'Dark' : 'Light';
};

window.syncPresetDOM = function(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  const selectElem = document.getElementById('presetSelect');
  if (selectElem && selectElem.value !== preset) selectElem.value = preset;
};

window.changePreset = function(preset) {
  window.StorageUtil.setPreset(preset);
  window.syncPresetDOM(preset);
  showToast('Theme preset switched to: ' + preset.toUpperCase() + ' tokens', 'info');
  if (window.currentDocKey && typeof window.showDoc === 'function') {
    window.showDoc(window.currentDocKey);
  }
};

window.toggleTheme = function() {
  const cur = window.StorageUtil.getTheme();
  const next = cur === 'dark' ? 'light' : 'dark';
  window.StorageUtil.setTheme(next);
  window.syncThemeDOM(next);
};

// ==========================================
// 3. Generic API Table Component Generator
// ==========================================
window.renderApiTable = function(title, headers, rows, subtitle = '') {
  if (!rows || rows.length === 0) return '';
  const subHtml = subtitle ? `<p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">${subtitle}</p>` : '';
  const theadHtml = headers.map(h => `<th style="width:${h.width || 'auto'};">${h.title}</th>`).join('');
  const tbodyHtml = rows.map(r => `
    <tr>
      ${headers.map(h => {
        const val = r[h.key] !== undefined ? r[h.key] : '';
        if (h.isCode) return `<td><code>${val}</code></td>`;
        if (h.className) return `<td class="${h.className}">${val}</td>`;
        return `<td>${val}</td>`;
      }).join('')}
    </tr>
  `).join('');

  return `
    <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${title}</h3>
    ${subHtml}
    <table class="api-table">
      <thead><tr>${theadHtml}</tr></thead>
      <tbody>${tbodyHtml}</tbody>
    </table>
  `;
};

// ==========================================
// 4. Uni-UI Style FAB Toggle Function
// ==========================================
window.toggleFabMenu = function() {
  const menu = document.getElementById('gFabMenu');
  const trigger = document.getElementById('gFabTrigger');
  const icon = document.getElementById('gFabIcon');
  if (!menu || !trigger) return;

  const isCollapsed = menu.classList.contains('collapsed');
  if (isCollapsed) {
    menu.classList.remove('collapsed');
    trigger.classList.remove('collapsed');
    if (icon) icon.className = 'fa-solid fa-xmark';
  } else {
    menu.classList.add('collapsed');
    trigger.classList.add('collapsed');
    if (icon) icon.className = 'fa-solid fa-gear';
  }
};

// ==========================================
// 5. Toast Floating Message System
// ==========================================
window.showToast = function(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  
  let icon = 'fa-info-circle';
  let col = 'var(--info)';
  if (type === 'success') { icon = 'fa-check-circle'; col = 'var(--success)'; }
  if (type === 'warning') { icon = 'fa-exclamation-triangle'; col = 'var(--warning)'; }
  if (type === 'danger' || type === 'error') { icon = 'fa-times-circle'; col = 'var(--danger)'; }

  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${col};"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ==========================================
// 6. Dual-Engine Clipboard Copy Utility
// ==========================================
window.copyCode = function(btn, codeText) {
  if (!codeText) {
    const card = btn.closest('.demo-card') || btn.closest('.code-box') || btn.parentElement;
    if (card) {
      const codeElem = card.querySelector('.code-box pre code') || card.querySelector('pre code') || card.querySelector('code');
      if (codeElem) codeText = codeElem.innerText;
    }
  }

  if (!codeText) {
    showToast('暂无代码可复制', 'warning');
    return;
  }

  function showSuccess() {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--success);"></i> <span style="color:var(--success);">已复制!</span>';
    showToast('代码已成功复制到剪贴板！', 'success');
    setTimeout(() => {
      btn.innerHTML = orig;
    }, 2000);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(ta);
      if (successful) {
        showSuccess();
      } else {
        showToast('复制失败，请手动选择代码复制', 'danger');
      }
    } catch (err) {
      document.body.removeChild(ta);
      showToast('复制失败: ' + err, 'danger');
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(codeText).then(() => {
      showSuccess();
    }).catch(() => {
      fallbackCopy(codeText);
    });
  } else {
    fallbackCopy(codeText);
  }
};

// ==========================================
// 7. HTML Escaping Utility
// ==========================================
window.escapeHtml = function(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// ==========================================
// 8. Simulated Interactive Component Helpers
// ==========================================
window.openSimDialog = function(content = "This is a modal dialog content.", title = "GDialog Modal") {
  const modal = document.getElementById('simModal');
  const titleElem = document.getElementById('simModalTitle');
  const bodyElem = document.getElementById('simModalBody');
  if (titleElem) titleElem.innerText = title;
  if (bodyElem) bodyElem.innerText = content;
  if (modal) modal.style.display = 'flex';
};

window.closeSimDialog = function() {
  const modal = document.getElementById('simModal');
  if (modal) modal.style.display = 'none';
};

window.openSimDrawer = function(content = "Drawer content body", title = "GDrawer Title") {
  const drawer = document.getElementById('simDrawer');
  const titleElem = document.getElementById('simDrawerTitle');
  if (titleElem) titleElem.innerText = title;
  if (drawer) drawer.classList.add('open');
};

window.closeDrawerDirect = function() {
  const drawer = document.getElementById('simDrawer');
  if (drawer) drawer.classList.remove('open');
};

// Vant UI Style GPopup Simulator Helper
window.openSimPopup = function(options = {}) {
  const position = options.position || 'center'; // 'center', 'top', 'bottom', 'left', 'right'
  const round = options.round ? 'g-popup-round' : '';
  const closeable = options.closeable !== false;
  const title = options.title || '弹出层标题 (Popup)';
  const content = options.content || '这是由 GPopup 动态弹出的内容面板，支持上、下、左、右、居中 5 种位置与圆角动效。';
  const closeIconPos = options.closeIconPosition || 'top-right';

  const mask = document.getElementById('simPopupMask');
  const panel = document.getElementById('simPopupPanel');
  const titleElem = document.getElementById('simPopupTitle');
  const bodyElem = document.getElementById('simPopupBody');
  const closeBtn = document.getElementById('simPopupClose');

  if (!mask || !panel) return;

  // Reset classes
  panel.className = `g-popup-panel g-popup-${position} ${round}`;
  if (titleElem) titleElem.innerText = title;
  if (bodyElem) bodyElem.innerHTML = content;

  if (closeBtn) {
    closeBtn.style.display = closeable ? 'block' : 'none';
  }

  mask.style.display = 'block';
  mask.classList.add('active');
  showToast(`GPopup 已触发: [${position.toUpperCase()}] 弹出`, 'info');
};

window.closeSimPopup = function() {
  const mask = document.getElementById('simPopupMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// Vant UI Style GOverlay Simulator Helper
window.openSimOverlay = function(options = {}) {
  const mask = document.getElementById('simOverlayMask');
  const slot = document.getElementById('simOverlaySlot');
  if (!mask) return;

  if (options.content && slot) {
    slot.innerHTML = options.content;
    slot.style.display = 'block';
  } else if (slot) {
    slot.style.display = 'none';
  }

  if (options.bgColor) {
    mask.style.backgroundColor = options.bgColor;
  } else {
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  }

  mask.style.display = 'flex';
  mask.classList.add('active');
  showToast('GOverlay 遮罩层已开启 (点击背景关闭)', 'info');
};

window.closeSimOverlay = function() {
  const mask = document.getElementById('simOverlayMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// Vant UI Style Preset Demo Dispatchers
window.openPopupDemo = function(type) {
  if (type === 'center') {
    openSimPopup({ position: 'center', round: false, closeable: true, title: '居中弹出层 (Center)', content: '<p>这是基础居中弹出的内容面板，支持点击右上角关闭或点击暗色背景关闭。</p>' });
  } else if (type === 'top') {
    openSimPopup({ position: 'top', title: '🔔 顶部系统公告', content: '<div style="text-align:center; padding:12px 0;">服务器将在 10 分钟后进行热更新维护，请提前做好准备！</div>' });
  } else if (type === 'bottom') {
    openSimPopup({ position: 'bottom', round: true, title: '底部快捷面板', content: '<div style="display:flex; flex-direction:column; gap:10px;"><button class="g-btn g-btn-default" style="width:100%;" onclick="closeSimPopup(); showToast(\'已选择微信好友分享\', \'success\');">微信好友分享</button><button class="g-btn g-btn-default" style="width:100%;" onclick="closeSimPopup(); showToast(\'已生成朋友圈海报\', \'success\');">朋友圈海报生成</button></div>' });
  } else if (type === 'left') {
    openSimPopup({ position: 'left', title: '左侧快捷侧栏', content: '<p>左侧滑出导航菜单与快捷筛选栏。</p>' });
  } else if (type === 'right') {
    openSimPopup({ position: 'right', title: '右侧属性详情', content: '<p>右侧滑出装备详情与人物状态查看。</p>' });
  } else if (type === 'round-bottom') {
    openSimPopup({ position: 'bottom', round: true, closeable: true, title: '圆角底部抽屉', content: '<p style="margin-bottom:12px;">底部弹出时自动带有 18px 优雅顶部圆角，符合移动端与触控交互审美规范。</p><button class="g-btn g-btn-primary" style="width:100%;" onclick="closeSimPopup()">我知道了</button>' });
  } else if (type === 'round-center') {
    openSimPopup({ position: 'center', round: true, closeable: true, title: '圆角居中卡片', content: '<p>居中卡片支持 18px 全圆角，呈现现代感十足的悬浮弹窗。</p>' });
  } else if (type === 'actionsheet') {
    openSimPopup({
      position: 'bottom',
      round: true,
      closeable: true,
      title: '🛒 购买圣剑·艾斯卡诺',
      content: '<div style="display:flex; gap:16px; align-items:center; margin-bottom:16px;"><div style="width:60px; height:60px; background:var(--bg-card); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:28px;">⚔️</div><div><div style="font-weight:700; color:var(--primary); font-size:16px;">金币: 9,999</div><div style="font-size:12px; color:var(--text-secondary);">库存: 剩余 3 件 | 传奇品质</div></div></div><div style="display:flex; gap:10px;"><button class="g-btn g-btn-default" style="flex:1;" onclick="closeSimPopup()">加入心愿单</button><button class="g-btn g-btn-primary" style="flex:1;" onclick="closeSimPopup(); showToast(\'购买成功！已放入背包\', \'success\');">立即兑换</button></div>'
    });
  }
};

window.openOverlayDemo = function(type) {
  if (type === 'basic') {
    openSimOverlay();
  } else if (type === 'content') {
    openSimOverlay({
      content: '<div style="text-align:center;"><div style="font-size:36px; margin-bottom:12px;">⏳</div><div style="font-weight:600; font-size:15px;">资源同步加载中...</div><p style="font-size:12px; color:var(--text-secondary); margin-top:6px;">正在从云存档读取角色数据，请稍候</p><button class="g-btn g-btn-default" style="margin-top:14px; height:28px; font-size:12px;" onclick="closeSimOverlay()">取消加载</button></div>'
    });
  } else if (type === 'green') {
    openSimOverlay({ bgColor: 'rgba(24, 160, 88, 0.45)' });
  } else if (type === 'danger') {
    openSimOverlay({ bgColor: 'rgba(208, 48, 80, 0.45)' });
  }
};

// Form Layout Helpers
window.changeFormLabelAlign = function(align) {
  const form = document.getElementById('demoFormDynamic');
  if (!form) return;
  form.querySelectorAll('.g-form-label').forEach(lbl => {
    lbl.style.textAlign = align === 'top' ? 'left' : align;
    lbl.style.width = align === 'top' ? '100%' : '90px';
    lbl.style.display = align === 'top' ? 'block' : 'inline-block';
  });
  showToast(`表单对齐切换为: ${align.toUpperCase()}`);
};

window.addDynamicFormItem = function() {
  const list = document.getElementById('dynamicFormItemList');
  if (!list) return;
  const count = list.children.length + 1;
  const item = document.createElement('div');
  item.className = 'g-form-item';
  item.style.display = 'flex';
  item.style.alignItems = 'center';
  item.style.gap = '12px';
  item.innerHTML = `
    <span style="width:90px; text-align:right; font-size:13px; color:var(--text-secondary);">装备词条 ${count}</span>
    <div class="g-input-wrapper" style="flex:1;"><input class="g-input" placeholder="输入第 ${count} 条属性..."></div>
    <button class="g-btn g-btn-danger" style="height:32px; padding:0 10px;" onclick="this.parentElement.remove(); showToast('已删除词条项', 'warning');">×</button>
  `;
  list.appendChild(item);
  showToast(`新增词条 ${count}`, 'success');
};

// Interactive Demo GFab Toggle Helper
window.toggleDemoFab = function(containerId, isVertical = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const menu = container.querySelector('.demo-fab-menu');
  const icon = container.querySelector('.demo-fab-icon');
  if (!menu || !icon) return;

  const isCollapsed = menu.style.display === 'none';
  if (isCollapsed) {
    menu.style.display = 'flex';
    icon.innerText = '✕';
    showToast('已展开 FAB 菜单', 'info');
  } else {
    menu.style.display = 'none';
    icon.innerText = '+';
    showToast('已收起 FAB 菜单', 'info');
  }
};

// Interactive Tab Switcher in Demos
window.switchDemoTab = function(btn, panelId) {
  const parent = btn.closest('.sim-tabs-container') || btn.parentElement.parentElement;
  if (!parent) return;
  
  parent.querySelectorAll('.sim-tab-header-item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');

  parent.querySelectorAll('.sim-tab-pane').forEach(el => el.style.display = 'none');
  const target = document.getElementById(panelId);
  if (target) target.style.display = 'block';
};

// Interactive Steps Next/Prev
window.simNextStep = function(id) {
  const container = document.getElementById(id);
  if (!container) return;
  const steps = container.querySelectorAll('.sim-step-item');
  let cur = 0;
  steps.forEach((s, idx) => {
    if (s.classList.contains('active')) cur = idx;
  });
  if (cur < steps.length - 1) {
    steps[cur].classList.remove('active');
    steps[cur].classList.add('finished');
    steps[cur + 1].classList.add('active');
    showToast(`Step progressed to ${cur + 2}`, 'info');
  } else {
    steps.forEach((s, idx) => {
      s.classList.remove('finished', 'active');
      if (idx === 0) s.classList.add('active');
    });
    showToast('Reset back to Step 1', 'info');
  }
};

// Dynamic Tag Closable
window.removeTagDemo = function(btn) {
  const tag = btn.parentElement;
  if (tag) {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'all 0.2s';
    setTimeout(() => tag.remove(), 200);
    showToast('Tag removed', 'info');
  }
};

window.addDynamicTag = function() {
  const container = document.getElementById('dynamicTagBox');
  if (!container) return;
  const count = container.querySelectorAll('.g-tag').length + 1;
  const newTag = document.createElement('span');
  newTag.className = 'g-tag g-tag-primary';
  newTag.innerHTML = `Tag ${count} <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button>`;
  container.appendChild(newTag);
  showToast(`Added Tag ${count}`, 'success');
};

// Tree-Shaking Live Analyzer Calculation
window.runLiveTreeShaker = function() {
  const grid = document.getElementById('shakerCheckGrid');
  if (!grid) return;
  const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
  let used = 0;
  let usedNames = [];
  let unusedNames = [];

  checkboxes.forEach(cb => {
    const label = cb.parentElement.innerText.trim().split(' ')[0];
    if (cb.checked) {
      used++;
      usedNames.push(label);
    } else {
      unusedNames.push(label);
    }
  });

  const total = 28;
  const unused = total - used;
  const rate = ((unused / total) * 100).toFixed(1);

  const usedCntElem = document.getElementById('shakerUsedCount');
  const unusedCntElem = document.getElementById('shakerUnusedCount');
  const tagElem = document.getElementById('shakerOptimizeTag');
  const logElem = document.getElementById('shakerLogText');

  if (usedCntElem) usedCntElem.innerText = `${used} 个`;
  if (unusedCntElem) unusedCntElem.innerText = `${unused} 个`;
  if (tagElem) tagElem.innerText = `包体优化率: ${rate}%`;
  if (logElem) {
    logElem.innerHTML = `[GotodUI Tree-Shaker] 扫描完成: 实际打包 ${used} 个组件 (${usedNames.join(', ')})，自动 skip() 剔除 ${unused} 个未引用组件 (${unusedNames.slice(0, 5).join(', ')}...)。`;
  }
};
