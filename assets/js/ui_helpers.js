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
        let val = r[h.key] !== undefined ? r[h.key] : '';
        if (h.key === 'name') {
          const vStr = r.version || r.since;
          const vTag = vStr ? `<span class="g-tag ${vStr.includes('1.2') || vStr.includes('1.0.5') ? 'g-tag-success' : 'g-tag-primary'}" style="font-size:10px; padding:1px 6px; margin-left:6px; border-radius:10px; font-weight:700;">${vStr}</span>` : '';
          return `<td class="${h.className || 'api-prop'}"><code>${val}</code>${vTag}</td>`;
        }
        if (h.key === 'version') {
          const vStr = val || r.version || r.since || 'v1.0.0';
          const isNew = String(vStr).includes('1.2') || String(vStr).includes('1.0.5');
          return `<td class="api-type" style="text-align:center;"><span class="g-tag ${isNew ? 'g-tag-success' : 'g-tag-primary'}" style="font-size:10px; padding:2px 7px; border-radius:10px; font-weight:700;">${vStr}</span></td>`;
        }
        if (h.isCode) {
          const esc = (window.escapeHtml ? window.escapeHtml(val) : String(val).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
          return `<td><code style="word-break:break-all;">${esc}</code></td>`;
        }
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
// 4. Uni-UI Style FAB Toggle & Drag Handlers
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

window.startFabDrag = function(e, fab) {
  if (!fab) return;
  e.preventDefault();
  const container = fab.parentElement;
  if (!container) return;
  const isTouch = e.type && e.type.startsWith('touch');
  let startX = isTouch ? e.touches[0].clientX : e.clientX;
  let startY = isTouch ? e.touches[0].clientY : e.clientY;
  let startLeft = fab.offsetLeft;
  let startTop = fab.offsetTop;
  fab.style.cursor = 'grabbing';
  fab.style.transition = 'none';

  const posBadge = document.getElementById('fabPosBadge');

  function onMove(ev) {
    let clientX = isTouch ? (ev.touches[0] ? ev.touches[0].clientX : startX) : ev.clientX;
    let clientY = isTouch ? (ev.touches[0] ? ev.touches[0].clientY : startY) : ev.clientY;
    let dx = clientX - startX;
    let dy = clientY - startY;

    let maxL = container.clientWidth - fab.offsetWidth - 10;
    let maxT = container.clientHeight - fab.offsetHeight - 10;
    let newLeft = Math.max(10, Math.min(maxL, startLeft + dx));
    let newTop = Math.max(10, Math.min(maxT, startTop + dy));

    fab.style.left = newLeft + 'px';
    fab.style.top = newTop + 'px';
    fab.style.bottom = 'auto';
    fab.style.right = 'auto';

    if (posBadge) {
      posBadge.innerText = `坐标: (${Math.round(newLeft)}, ${Math.round(newTop)})`;
    }
  }

  function onEnd() {
    fab.style.cursor = 'grab';
    const autoDockCheck = document.getElementById('fabAutoDock');
    const shouldDock = autoDockCheck ? autoDockCheck.checked : false;

    if (shouldDock) {
      fab.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      const center = container.clientWidth / 2;
      if (fab.offsetLeft < center) {
        fab.style.left = '14px';
        if (window.showToast) window.showToast('FAB 已自动吸附贴靠至【左侧】', 'info');
      } else {
        fab.style.left = (container.clientWidth - fab.offsetWidth - 14) + 'px';
        if (window.showToast) window.showToast('FAB 已自动吸附贴靠至【右侧】', 'info');
      }
    } else {
      if (window.showToast) window.showToast(`已自由放置在位置 (${Math.round(fab.offsetLeft)}, ${Math.round(fab.offsetTop)})`, 'success');
    }

    document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onMove);
    document.removeEventListener(isTouch ? 'touchend' : 'mouseup', onEnd);
  }

  document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onMove);
  document.addEventListener(isTouch ? 'touchend' : 'mouseup', onEnd);
};

// ==========================================
// 4.5 Tabs Dynamic CRUD & Drag Reorder Handlers
// ==========================================
window.crudTabCount = 3;

window.selectCrudTab = function(id) {
  const bar = document.getElementById('crudTabBar');
  const panelBox = document.getElementById('crudPanelBox');
  if (!bar || !panelBox) return;
  Array.from(bar.children).forEach(t => {
    const isCur = t.id === id;
    t.className = isCur ? 'g-tag g-tag-primary' : 'g-tag g-tag-default';
    t.style.boxShadow = isCur ? '0 0 0 2px var(--primary)' : 'none';
  });
  Array.from(panelBox.children).forEach(p => {
    p.style.display = (p.id === 'panel_' + id) ? 'block' : 'none';
  });
};

window.addCrudTab = function() {
  window.crudTabCount = (window.crudTabCount || 3) + 1;
  const bar = document.getElementById('crudTabBar');
  const panelBox = document.getElementById('crudPanelBox');
  if (!bar || !panelBox) return;
  const newId = 'crudT_' + window.crudTabCount;
  
  const tab = document.createElement('div');
  tab.id = newId;
  tab.className = 'g-tag g-tag-primary';
  tab.style = 'display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;';
  tab.innerHTML = `<span class="tab-title" ondblclick="window.editTabTitle(this)">自定义面板 ${window.crudTabCount}</span> <i class="fa-solid fa-pen" style="font-size:10px; opacity:0.6;" title="重命名" onclick="window.editTabTitle(this.previousElementSibling)"></i> <i class="fa-solid fa-xmark" style="font-size:11px; margin-left:2px;" title="关闭" onclick="window.removeCrudTab('${newId}')"></i>`;
  tab.onclick = function(e) {
    if (!e.target.classList.contains('fa-xmark') && !e.target.classList.contains('fa-pen') && e.target.tagName !== 'INPUT') {
      window.selectCrudTab(newId);
    }
  };
  bar.appendChild(tab);

  const p = document.createElement('div');
  p.id = 'panel_' + newId;
  p.style = 'display:none; font-size:13px; color:var(--text-regular); line-height:1.6;';
  p.innerHTML = `📄 这是 <b>自定义面板 ${window.crudTabCount}</b> 的内容区。<br><span style="color:var(--text-secondary); font-size:11px;">创建时间: ${new Date().toLocaleTimeString()}</span>`;
  panelBox.appendChild(p);

  window.selectCrudTab(newId);
  if (window.showToast) window.showToast(`已成功新增【自定义面板 ${window.crudTabCount}】`, 'success');
};

window.editTabTitle = function(spanEl) {
  if (!spanEl || spanEl.querySelector('input')) return;
  const oldText = spanEl.innerText;
  spanEl.innerHTML = `<input type="text" value="${oldText}" style="width:90px; height:20px; font-size:11px; padding:0 4px; border:1px solid var(--primary); border-radius:3px; outline:none; background:var(--bg-card); color:var(--text-primary);" autofocus>`;
  const input = spanEl.querySelector('input');
  input.focus();
  input.select();
  function finish() {
    const newTitle = input.value.trim() || oldText;
    spanEl.innerText = newTitle;
    if (window.showToast) window.showToast('标签已重命名为：' + newTitle, 'info');
  }
  input.onblur = finish;
  input.onkeydown = function(e) {
    if (e.key === 'Enter') finish();
  };
};

window.removeCrudTab = function(id) {
  const tab = document.getElementById(id);
  const panel = document.getElementById('panel_' + id);
  const bar = document.getElementById('crudTabBar');
  if (bar && bar.children.length <= 1) {
    if (window.showToast) window.showToast('至少保留一个标签页，无法继续删除！', 'warning');
    return;
  }
  if (tab) tab.remove();
  if (panel) panel.remove();
  if (window.showToast) window.showToast('已关闭并移除标签页', 'info');
  if (bar && bar.children.length > 0) {
    window.selectCrudTab(bar.children[0].id);
  }
};

// Drag & Drop Sort Handlers
window.draggedTabItem = null;

window.onTabDragStart = function(e, el) {
  window.draggedTabItem = el;
  el.style.opacity = '0.4';
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', el.getAttribute('data-name') || '');
  }
};

window.onTabDragOver = function(e, el) {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  const container = el.parentElement;
  if (!container || !window.draggedTabItem || window.draggedTabItem === el) return;
  const bounding = el.getBoundingClientRect();
  const offset = e.clientX - bounding.left - bounding.width / 2;
  if (offset > 0) {
    container.insertBefore(window.draggedTabItem, el.nextSibling);
  } else {
    container.insertBefore(window.draggedTabItem, el);
  }
};

window.onTabDrop = function(e, el) {
  e.preventDefault();
};

window.onTabDragEnd = function(e, el) {
  el.style.opacity = '1';
  window.draggedTabItem = null;
  const container = document.getElementById('sortableTabBar');
  if (container) {
    const items = Array.from(container.querySelectorAll('.drag-tab-item')).map(i => i.getAttribute('data-name'));
    if (window.showToast) window.showToast('标签新顺序: ' + items.join(' → '), 'success');
  }
};

window.shiftTabLeft = function() {
  const container = document.getElementById('sortableTabBar');
  if (container && container.firstElementChild) {
    container.appendChild(container.firstElementChild);
    const items = Array.from(container.querySelectorAll('.drag-tab-item')).map(i => i.getAttribute('data-name'));
    if (window.showToast) window.showToast('标签新顺序: ' + items.join(' → '), 'info');
  }
};

window.shiftTabRight = function() {
  const container = document.getElementById('sortableTabBar');
  if (container && container.lastElementChild) {
    container.insertBefore(container.lastElementChild, container.firstElementChild);
    const items = Array.from(container.querySelectorAll('.drag-tab-item')).map(i => i.getAttribute('data-name'));
    if (window.showToast) window.showToast('标签新顺序: ' + items.join(' → '), 'info');
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
  
  let icon = 'fa-circle-info';
  let col = 'var(--primary)';
  if (type === 'success') { icon = 'fa-circle-check'; col = 'var(--success)'; }
  else if (type === 'warning') { icon = 'fa-triangle-exclamation'; col = 'var(--warning)'; }
  else if (type === 'danger' || type === 'error') { icon = 'fa-circle-xmark'; col = 'var(--danger)'; }
  else if (type === 'info') { icon = 'fa-circle-info'; col = 'var(--primary)'; }

  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${col}; font-size:16px;"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ==========================================
// 5. Code Tab Switcher for Before vs After Diff
// ==========================================
window.switchCodeTab = function(btn, tabIndex) {
  const container = btn.closest('.code-tab-container');
  if (!container) return;
  
  const buttons = container.querySelectorAll('.code-tab-btn');
  const panels = container.querySelectorAll('.code-tab-panel');
  
  buttons.forEach((b, i) => {
    b.classList.toggle('active', i === tabIndex);
  });
  
  panels.forEach((p, i) => {
    p.classList.toggle('active', i === tabIndex);
  });
};

// ==========================================
// 6. Dual-Engine Clipboard Copy Utility
// ==========================================
window.copyCode = function(btn, codeText) {
  if (!codeText) {
    const card = btn.closest('.demo-card') || btn.closest('.code-tab-container') || btn.closest('.code-box') || btn.parentElement;
    if (card) {
      const activePanel = card.querySelector('.code-tab-panel.active pre code');
      const codeElem = activePanel || card.querySelector('.code-box pre code') || card.querySelector('pre code') || card.querySelector('code');
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
window.openDialog = function(title = "操作确认", content = "您确定要执行当前操作吗？") {
  openSimDialog(title, content);
};

window.openSimDialog = function(title = "操作确认", content = "您确定要执行当前操作吗？") {
  // Support argument swap if needed
  if (typeof title === 'string' && title.length > 25 && content.length < 25) {
    const tmp = title;
    title = content;
    content = tmp;
  }

  const modal = document.getElementById('dialogModal') || document.getElementById('simModal');
  const titleElem = document.getElementById('dialogTitle') || document.getElementById('simModalTitle');
  const bodyElem = document.getElementById('dialogBody') || document.getElementById('simModalBody');
  if (titleElem) titleElem.innerText = title;
  if (bodyElem) bodyElem.innerHTML = content;
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
  }
  showToast(`GDialog 对话框已打开: [${title}]`, 'info');
};

window.closeDialogDirect = function() {
  const modal = document.getElementById('dialogModal') || document.getElementById('simModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
};

window.closeDialog = function(e) {
  if (e && e.target && (e.target.id === 'dialogModal' || e.target.id === 'simModal')) {
    closeDialogDirect();
  }
};

window.confirmDialog = function() {
  closeDialogDirect();
  showToast('GDialog 操作已确认 (Confirmed)', 'success');
};

window.openSimDrawer = function(content = "这是从右侧滑出的抽屉面板，支持自定义配置。", title = "GDrawer 抽屉面板") {
  const drawer = document.getElementById('drawerModal') || document.getElementById('simDrawer');
  const titleElem = document.getElementById('drawerTitle') || document.getElementById('simDrawerTitle');
  if (titleElem) titleElem.innerText = title;
  if (drawer) {
    drawer.style.display = 'flex';
    drawer.classList.add('active');
  }
  showToast(`GDrawer 抽屉已打开: [${title}]`, 'info');
};

window.closeDrawerDirect = function() {
  const drawer = document.getElementById('drawerModal') || document.getElementById('simDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    drawer.style.display = 'none';
  }
};

window.closeDrawer = function(e) {
  if (e && e.target && (e.target.id === 'drawerModal' || e.target.id === 'simDrawer')) {
    closeDrawerDirect();
  }
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

// Interactive GSteps Demo Handler
window.changeStepDemo = function(dir) {
  const box = document.getElementById('demoStepsBox');
  const desc = document.getElementById('stepStatusDesc');
  if (!box) return;
  let cur = parseInt(box.getAttribute('data-step') || '1');
  cur = Math.max(1, Math.min(3, cur + dir));
  box.setAttribute('data-step', cur);

  const stepTitles = [
    'Step 1: Configuration & Project Init',
    'Step 2: Custom Theme & Presets Customization',
    'Step 3: Build, Export & Distribution'
  ];
  if (desc) desc.innerText = stepTitles[cur - 1];

  for (let i = 1; i <= 3; i++) {
    const num = document.getElementById('stepNum' + i);
    const txt = document.getElementById('stepText' + i);
    const line = document.getElementById('stepLine' + i);

    if (i < cur) {
      if (num) {
        num.style.background = 'var(--success)';
        num.style.borderColor = 'var(--success)';
        num.style.color = '#fff';
        num.innerHTML = '✓';
      }
      if (txt) {
        txt.style.color = 'var(--text-primary)';
        txt.style.fontWeight = '600';
      }
      if (line) line.style.background = 'var(--success)';
    } else if (i === cur) {
      if (num) {
        num.style.background = 'var(--primary)';
        num.style.borderColor = 'var(--primary)';
        num.style.color = '#fff';
        num.innerText = i;
      }
      if (txt) {
        txt.style.color = 'var(--text-primary)';
        txt.style.fontWeight = '700';
      }
      if (line) line.style.background = 'var(--border-base)';
    } else {
      if (num) {
        num.style.background = 'var(--bg-surface)';
        num.style.borderColor = 'var(--border-base)';
        num.style.color = 'var(--text-secondary)';
        num.innerText = i;
      }
      if (txt) {
        txt.style.color = 'var(--text-disabled)';
        txt.style.fontWeight = 'normal';
      }
      if (line) line.style.background = 'var(--border-base)';
    }
  }
  showToast(`当前步骤切换至第 ${cur} 步`, 'info');
};

// Interactive GTabs Switcher
window.switchTabDemo = function(idx, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const headers = container.querySelectorAll('.sim-tab-header');
  const panels = container.querySelectorAll('.sim-tab-panel');

  headers.forEach((h, i) => {
    const isActive = (i === idx);
    h.classList.toggle('active', isActive);
    const tabType = h.getAttribute('data-tab-type') || 'line';

    if (tabType === 'card') {
      h.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
      h.style.background = isActive ? 'var(--bg-card)' : 'var(--bg-surface)';
      h.style.borderBottom = isActive ? '1px solid var(--bg-card)' : '1px solid var(--border-base)';
    } else if (tabType === 'border-card') {
      h.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
      h.style.background = isActive ? 'var(--bg-card)' : 'var(--bg-surface)';
    } else {
      h.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
      h.style.borderBottom = isActive ? '2px solid var(--primary)' : '2px solid transparent';
    }
  });

  panels.forEach((p, i) => {
    p.style.display = (i === idx) ? 'block' : 'none';
  });

  const log = document.getElementById('playTabsLog');
  if (log) log.innerText = `[Signal]: tab_changed emitted -> current_tab: ${idx}`;
  showToast(`切换至 Tab ${idx + 1}`);
};

// Interactive GTabs Add Tab Pane
window.addDynamicTabPane = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const nav = container.querySelector('#playTabsNav') || container.querySelector('.sim-tab-nav-list');
  const panels = container.querySelector('#playTabsPanels') || container.querySelector('.sim-tab-panel-box');
  if (!nav || !panels) return;

  const newIdx = nav.children.length;
  const header = document.createElement('div');
  header.className = 'sim-tab-header';
  header.style.cssText = 'color:var(--text-secondary); cursor:pointer; padding-bottom:8px; border-bottom:2px solid transparent; font-weight:600;';
  header.innerText = `Tab ${newIdx + 1}`;
  header.onclick = function() { switchTabDemo(newIdx, containerId); };
  nav.appendChild(header);

  const panel = document.createElement('div');
  panel.className = 'sim-tab-panel';
  panel.style.cssText = 'display:none; padding:16px; background:var(--bg-card); border-radius:var(--radius);';
  panel.innerHTML = `<h4 style="color:var(--text-primary);">动态标签 ${newIdx + 1}</h4><p style="color:var(--text-secondary); font-size:13px; margin-top:4px;">这是由 add_tab() 动态新增的选项卡内容面板。</p>`;
  panels.appendChild(panel);

  showToast(`add_tab("Tab ${newIdx + 1}") 追加成功`, 'success');
};

window.changeTabPosDemo = function(pos, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const wrap = container.querySelector('#playTabsWrapper') || container.firstElementChild;
  if (!wrap) return;
  if (pos === 'top') {
    wrap.style.flexDirection = 'column';
  } else if (pos === 'bottom') {
    wrap.style.flexDirection = 'column-reverse';
  } else if (pos === 'left') {
    wrap.style.flexDirection = 'row';
  } else if (pos === 'right') {
    wrap.style.flexDirection = 'row-reverse';
  }
  showToast(`tab_position = ${pos.toUpperCase()}`);
};

// Aliases for dialog & events
window.openDialog = function(title, content) {
  openSimDialog(content, title);
};

window.triggerCrossPageHeal = function() {
  const logBox = document.getElementById('simEventLogBox');
  if (logBox) {
    const line = document.createElement('div');
    line.style.color = 'var(--success)';
    line.innerText = `[${new Date().toLocaleTimeString()}] 跨页面收到信号 on_hero_heal -> HP恢复 +500 点!`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }
  showToast('【全服事件总线】广播 on_hero_heal 触发成功！', 'success');
};

window.clearSimEventLogs = function() {
  const logBox = document.getElementById('simEventLogBox');
  if (logBox) logBox.innerHTML = '<div style="color:var(--text-disabled); font-style:italic;">[日志已清空，等待新信号触发...]</div>';
  showToast('事件日志已清空', 'info');
};

window.toggleSkeletonLoading = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const skeleton = container.querySelector('.demo-skeleton-box');
  const content = container.querySelector('.demo-skeleton-real-content');
  if (!skeleton || !content) return;

  const isLoading = skeleton.style.display !== 'none';
  if (isLoading) {
    skeleton.style.display = 'none';
    content.style.display = 'block';
    showToast('数据加载完成，骨架屏已自动隐藏', 'success');
  } else {
    skeleton.style.display = 'flex';
    content.style.display = 'none';
    showToast('骨架屏 loading = true', 'info');
  }
};

// Interactive GCollapse Accordion Toggle
window.toggleCollapseDemo = function(header) {
  const item = header.parentElement;
  if (!item) return;
  const body = item.querySelector('.sim-collapse-body');
  const arrow = item.querySelector('.sim-collapse-arrow');
  if (!body) return;

  const isOpen = body.style.display !== 'none';
  if (isOpen) {
    body.style.display = 'none';
    if (arrow) arrow.style.transform = 'rotate(0deg)';
    showToast('收起折叠面板', 'info');
  } else {
    body.style.display = 'block';
    if (arrow) arrow.style.transform = 'rotate(90deg)';
    showToast('展开折叠面板', 'info');
  }
};

// Interactive Dynamic Tab Remove
window.removeDynamicTabPane = function(btn, containerId) {
  const header = btn.parentElement;
  if (!header) return;
  const nav = header.parentElement;
  const container = document.getElementById(containerId);
  if (!nav || !container) return;

  const idx = Array.from(nav.children).indexOf(header);
  const panels = container.querySelector('.sim-tab-panel-box') || container.querySelector('#playTabsPanels');
  
  header.remove();
  if (panels && panels.children[idx]) {
    panels.children[idx].remove();
  }

  // Switch to first remaining tab
  if (nav.children.length > 0) {
    switchTabDemo(0, containerId);
  }
  showToast('已关闭标签页', 'warning');
};

// 1. GPopover Simulator Helper
window.toggleSimPopover = function(btn, options = {}) {
  const wrapper = btn.parentElement;
  if (!wrapper) return;
  const bubble = wrapper.querySelector('.g-popover-bubble');
  if (!bubble) return;

  const isOpen = bubble.classList.contains('active');
  document.querySelectorAll('.g-popover-bubble.active').forEach(b => b.classList.remove('active'));

  if (!isOpen) {
    bubble.classList.add('active');
    if (options.theme === 'light') {
      bubble.classList.add('light');
    } else {
      bubble.classList.remove('light');
    }
    showToast('GPopover 气泡已展开', 'info');
  }
};

// 2. GActionSheet Simulator Helper
window.openSimActionSheet = function(options = {}) {
  const mask = document.getElementById('simActionSheetMask');
  const header = document.getElementById('simActionSheetHeader');
  const list = document.getElementById('simActionSheetList');
  if (!mask || !list) return;

  if (options.title) {
    header.innerText = options.title;
    header.style.display = 'block';
  } else {
    header.style.display = 'none';
  }

  const items = options.actions || [
    { name: '微信好友分享' },
    { name: '朋友圈生成' },
    { name: '复制商品链接' },
    { name: '删除该条目', danger: true }
  ];

  list.innerHTML = items.map((item, idx) => `
    <div class="g-action-sheet-item ${item.danger ? 'danger' : ''}" onclick="closeSimActionSheet(); showToast('已触发: ${item.name}', '${item.danger ? 'danger' : 'success'}');">
      ${item.name}
    </div>
  `).join('');

  mask.style.display = 'block';
  mask.classList.add('active');
  showToast('GActionSheet 动作面板已呼出', 'info');
};

window.closeSimActionSheet = function() {
  const mask = document.getElementById('simActionSheetMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// 3. GStepper Helper
window.stepperChange = function(containerId, delta, min = 1, max = 99) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const input = container.querySelector('.g-stepper-input');
  if (!input) return;

  let val = parseInt(input.value || '1') + delta;
  val = Math.max(min, Math.min(max, val));
  input.value = val;
  showToast(`GStepper 值变更为: ${val}`, 'info');
};

// 4. GPicker Simulator Helper
let currentPickerCallback = null;
let currentPickerSelected = 0;
let currentPickerOptions = [];

window.openSimPicker = function(options = {}) {
  const mask = document.getElementById('simPickerMask');
  const title = document.getElementById('simPickerTitle');
  const list = document.getElementById('simPickerList');
  if (!mask || !list) return;

  title.innerText = options.title || '请选择';
  currentPickerOptions = options.columns || ['狂暴战士 (Warrior)', '奥术法师 (Mage)', '神圣牧师 (Priest)', '暗影刺客 (Rogue)', '猎魔射手 (Hunter)'];
  currentPickerSelected = options.defaultIndex || 0;
  currentPickerCallback = options.onConfirm || null;

  renderPickerList();
  mask.style.display = 'block';
  mask.classList.add('active');
  showToast('GPicker 滚轮选择器已开启', 'info');
};

function renderPickerList() {
  const list = document.getElementById('simPickerList');
  if (!list) return;
  list.innerHTML = currentPickerOptions.map((opt, idx) => `
    <div class="g-picker-item ${idx === currentPickerSelected ? 'selected' : ''}" onclick="selectSimPickerOption(${idx})">
      ${opt}
    </div>
  `).join('');
}

window.selectSimPickerOption = function(idx) {
  currentPickerSelected = idx;
  renderPickerList();
};

window.confirmSimPicker = function() {
  const chosen = currentPickerOptions[currentPickerSelected];
  if (currentPickerCallback) currentPickerCallback(chosen, currentPickerSelected);
  closeSimPicker();
  showToast(`GPicker 已选定: ${chosen}`, 'success');
};

window.closeSimPicker = function() {
  const mask = document.getElementById('simPickerMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// 5. GTour Simulator Helper
let tourSteps = [];
let tourCurrentIdx = 0;

window.openSimTour = function(steps = []) {
  tourSteps = steps.length > 0 ? steps : [
    { title: '1. 快速检索与命令面板', desc: '按 Ctrl+K 即可随时激活全库 28+ 组件与 API 即时搜索！' },
    { title: '2. 风格与主题预设', desc: '在右下角悬浮切换 Naive / Element / Ant / Vant UI 4 套官方主题。' },
    { title: '3. 游戏实战与工坊模板', desc: '左侧顶部切换至“游戏实战案例”，即刻体验背包与角色系统！' }
  ];
  tourCurrentIdx = 0;
  updateTourStepDOM();

  const mask = document.getElementById('simTourMask');
  if (mask) {
    mask.style.display = 'block';
    mask.classList.add('active');
  }
  showToast('新手漫游式引导 (GTour) 已启动！', 'info');
};

function updateTourStepDOM() {
  const title = document.getElementById('simTourTitle');
  const desc = document.getElementById('simTourDesc');
  const indicator = document.getElementById('simTourStepsIndicator');
  const prevBtn = document.getElementById('simTourPrevBtn');
  const nextBtn = document.getElementById('simTourNextBtn');
  const popover = document.getElementById('simTourPopover');

  if (!title || !desc) return;
  const cur = tourSteps[tourCurrentIdx];
  title.innerText = cur.title;
  desc.innerText = cur.desc;
  if (indicator) indicator.innerText = `${tourCurrentIdx + 1} / ${tourSteps.length}`;
  if (prevBtn) prevBtn.style.display = tourCurrentIdx === 0 ? 'none' : 'inline-block';
  if (nextBtn) nextBtn.innerText = tourCurrentIdx === tourSteps.length - 1 ? '完成引导' : '下一步';

  // Position popover
  if (popover) {
    popover.style.top = '40%';
    popover.style.left = '50%';
    popover.style.transform = 'translate(-50%, -50%)';
  }
}

window.nextSimTourStep = function() {
  if (tourCurrentIdx < tourSteps.length - 1) {
    tourCurrentIdx++;
    updateTourStepDOM();
  } else {
    closeSimTour();
    showToast('🎉 恭喜完成新手漫游引导！', 'success');
  }
};

window.prevSimTourStep = function() {
  if (tourCurrentIdx > 0) {
    tourCurrentIdx--;
    updateTourStepDOM();
  }
};

window.closeSimTour = function() {
  const mask = document.getElementById('simTourMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// ==========================================
// Vant UI Style GToast Simulator Helper
// ==========================================
let simToastTimer = null;
window.openSimToast = function(opts) {
  if (typeof opts === 'string') opts = { message: opts };
  const message = opts.message || '轻提示内容';
  const type = opts.type || 'text';
  const duration = opts.duration !== undefined ? opts.duration : 2000;
  const position = opts.position || 'middle';
  const forbidClick = !!opts.forbidClick;
  const icon = opts.icon;

  const mask = document.getElementById('simToastMask');
  const box = document.getElementById('simToastBox');
  if (!mask || !box) return;

  if (simToastTimer) clearTimeout(simToastTimer);

  mask.className = 'g-toast-mask active';
  if (forbidClick) mask.classList.add('forbid-click');
  if (position === 'top') mask.classList.add('pos-top');
  else if (position === 'bottom') mask.classList.add('pos-bottom');
  mask.style.display = 'flex';

  let iconHtml = '';
  let isWithIcon = false;
  if (type === 'success') {
    iconHtml = '<div class="g-toast-icon" style="color:var(--success);"><i class="fa-solid fa-circle-check"></i></div>';
    isWithIcon = true;
  } else if (type === 'fail') {
    iconHtml = '<div class="g-toast-icon" style="color:var(--danger);"><i class="fa-solid fa-circle-xmark"></i></div>';
    isWithIcon = true;
  } else if (type === 'loading') {
    iconHtml = '<div class="g-toast-spinner"></div>';
    isWithIcon = true;
  } else if (icon) {
    iconHtml = `<div class="g-toast-icon" style="color:var(--primary);">${icon}</div>`;
    isWithIcon = true;
  }

  box.className = 'g-toast-box' + (isWithIcon ? ' with-icon' : '');
  box.innerHTML = `
    ${iconHtml}
    <div id="simToastMsg">${message}</div>
  `;

  if (duration > 0) {
    simToastTimer = setTimeout(() => {
      window.closeSimToast();
    }, duration);
  }
};

window.closeSimToast = function() {
  const mask = document.getElementById('simToastMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// ==========================================
// Golden Sun / JRPG GDialogue Simulator Helper
// ==========================================
let simDialogueQueue = [];
let simDialogueTimer = null;
let simDialogueFullText = '';
let simDialogueCharIdx = 0;
let simDialogueIsTyping = false;

window.openSimDialogue = function(queue) {
  if (typeof queue === 'string') queue = [{ text: queue, speaker: '神秘贤者', avatar: '🧙‍♂️' }];
  else if (!Array.isArray(queue)) queue = [queue];
  simDialogueQueue = [...queue];
  
  const mask = document.getElementById('simDialogueMask');
  if (!mask) return;
  mask.style.display = 'flex';
  window.nextSimDialogue();
};

window.nextSimDialogue = function() {
  if (simDialogueIsTyping) {
    simDialogueCharIdx = simDialogueFullText.length;
    const txtElem = document.getElementById('simDialogueText');
    if (txtElem) txtElem.innerText = simDialogueFullText;
    simDialogueIsTyping = false;
    const ind = document.getElementById('simDialogueIndicator');
    if (ind) ind.style.display = 'block';
    return;
  }
  
  if (simDialogueQueue.length === 0) {
    window.closeSimDialogue();
    return;
  }
  
  const item = simDialogueQueue.shift();
  const avatarElem = document.getElementById('simDialogueAvatar');
  const speakerElem = document.getElementById('simDialogueSpeaker');
  const txtElem = document.getElementById('simDialogueText');
  const indElem = document.getElementById('simDialogueIndicator');
  const optContainer = document.getElementById('simDialogueOptions');
  
  if (item.avatar) {
    avatarElem.innerHTML = item.avatar;
    avatarElem.style.display = 'flex';
  } else {
    avatarElem.style.display = 'none';
  }
  
  if (item.speaker) {
    speakerElem.innerText = item.speaker;
    speakerElem.style.display = 'inline-block';
  } else {
    speakerElem.style.display = 'none';
  }
  
  if (optContainer) {
    optContainer.innerHTML = '';
    optContainer.style.display = 'none';
  }
  if (indElem) indElem.style.display = 'none';
  
  simDialogueFullText = item.text || '';
  simDialogueCharIdx = 0;
  simDialogueIsTyping = true;
  if (txtElem) txtElem.innerText = '';
  
  if (simDialogueTimer) clearInterval(simDialogueTimer);
  simDialogueTimer = setInterval(() => {
    if (simDialogueCharIdx < simDialogueFullText.length) {
      simDialogueCharIdx++;
      if (txtElem) txtElem.innerText = simDialogueFullText.substr(0, simDialogueCharIdx);
    } else {
      clearInterval(simDialogueTimer);
      simDialogueIsTyping = false;
      if (item.options && item.options.length > 0 && optContainer) {
        optContainer.style.display = 'flex';
        item.options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.className = 'g-dialogue-option-btn';
          btn.innerHTML = `▶  ${opt}`;
          btn.onclick = (e) => {
            e.stopPropagation();
            showToast(`已选择: ${opt}`, 'success');
            window.nextSimDialogue();
          };
          optContainer.appendChild(btn);
        });
      } else if (indElem) {
        indElem.style.display = 'block';
      }
    }
  }, 25);
};

window.closeSimDialogue = function() {
  if (simDialogueTimer) clearInterval(simDialogueTimer);
  simDialogueIsTyping = false;
  const mask = document.getElementById('simDialogueMask');
  if (mask) mask.style.display = 'none';
};

// ==========================================
// Anime Story Theater Simulator Helper (Demo 3)
// ==========================================
const animeTheaterScript = [
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '🎭',
    speakerColor: '#ffd04b',
    text: '来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。'
  },
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '🪄',
    speakerColor: '#ffd04b',
    text: '不过……要是你敢小看我的暗影魔术，待会儿可别哭着向我求饶哦！'
  },
  {
    speaker: '旅者·卡尔',
    avatar: '⚔️',
    speakerColor: '#409eff',
    text: '（拔出符文长剑）收起你的把戏吧爱丽丝，我不会再让你伤害这里的任何村民了！'
  },
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '👑',
    speakerColor: '#ffd04b',
    text: '呵呵呵……真是有趣的眼神！那就让我们在命运的舞台上，起舞到天明吧！（✨剧情播放完毕，点击重新开始）'
  }
];

let animeTheaterIndex = 0;
let animeTheaterIsTyping = false;
let animeTheaterTimer = null;
let animeTheaterTargetText = '';

window.simAnimeTheaterNext = function() {
  const textEl = document.getElementById('animeDialogueText');
  if (animeTheaterIsTyping) {
    if (animeTheaterTimer) clearInterval(animeTheaterTimer);
    animeTheaterIsTyping = false;
    if (textEl) textEl.innerText = animeTheaterTargetText;
    return;
  }
  animeTheaterIndex = (animeTheaterIndex + 1) % animeTheaterScript.length;
  playAnimeTheaterLine(animeTheaterIndex);
};

window.simAnimeTheaterSkip = function() {
  if (animeTheaterTimer) clearInterval(animeTheaterTimer);
  animeTheaterIndex = animeTheaterScript.length - 1;
  playAnimeTheaterLine(animeTheaterIndex, true);
  if (window.showToast) {
    showToast('已跳过当前剧情，直达决战台词！', 'warning');
  }
};

function playAnimeTheaterLine(idx, instant) {
  const data = animeTheaterScript[idx];
  const avatarEl = document.getElementById('animeStandeeAvatar');
  const speakerEl = document.getElementById('animeDialogueSpeaker');
  const textEl = document.getElementById('animeDialogueText');
  if (!avatarEl || !speakerEl || !textEl) return;

  avatarEl.style.transform = 'scale(1.25) translateY(-8px)';
  setTimeout(() => {
    avatarEl.innerHTML = data.avatar;
    avatarEl.style.transform = 'scale(1) translateY(0)';
  }, 120);

  speakerEl.innerText = data.speaker;
  speakerEl.style.color = data.speakerColor || '#ffd04b';

  animeTheaterTargetText = data.text;
  if (animeTheaterTimer) clearInterval(animeTheaterTimer);

  if (instant) {
    textEl.innerText = data.text;
    animeTheaterIsTyping = false;
    return;
  }

  animeTheaterIsTyping = true;
  textEl.innerText = '';
  let charIdx = 0;
  animeTheaterTimer = setInterval(() => {
    if (charIdx < data.text.length) {
      charIdx++;
      textEl.innerText = data.text.substr(0, charIdx);
    } else {
      clearInterval(animeTheaterTimer);
      animeTheaterIsTyping = false;
    }
  }, 22);
}

// ==========================================
// Sci-Fi Polygon Bubble Dialogue Simulator (Demo 5)
// ==========================================
const scifiScript = [
  {
    speaker: 'シマトラ',
    text: '誰が、どうやって、何の目的で――\nそのあたりは、これから調査するのである。'
  },
  {
    speaker: 'オペレーター',
    text: '高エネルギー反応を感知！第3セクターに接近中の未確認生体シグナルを確認！'
  },
  {
    speaker: 'シマトラ',
    text: '全艦、第一種戦闘配置！迎撃プロトコル【Type-09】を展開せよ！'
  }
];
let scifiIndex = 0;
let scifiIsTyping = false;
let scifiTimer = null;
let scifiAutoInterval = null;
let scifiTargetText = '';

window.simSciFiNext = function() {
  const textEl = document.getElementById('scifiDialogueText');
  if (scifiIsTyping) {
    if (scifiTimer) clearInterval(scifiTimer);
    scifiIsTyping = false;
    if (textEl) textEl.innerText = scifiTargetText;
    return;
  }
  scifiIndex = (scifiIndex + 1) % scifiScript.length;
  playSciFiLine(scifiIndex);
};

window.simSciFiToggleAuto = function() {
  const autoBtn = document.getElementById('scifiAutoBtn');
  if (scifiAutoInterval) {
    clearInterval(scifiAutoInterval);
    scifiAutoInterval = null;
    if (autoBtn) {
      autoBtn.style.background = '#1b356d';
      autoBtn.style.color = '#fff';
      autoBtn.innerText = 'AUTO';
    }
    if (window.showToast) showToast('已关闭自动播放 (AUTO OFF)', 'info');
  } else {
    if (autoBtn) {
      autoBtn.style.background = '#409eff';
      autoBtn.style.color = '#000';
      autoBtn.innerText = 'AUTO ●';
    }
    if (window.showToast) showToast('已开启自动播放 (AUTO ON)', 'success');
    window.simSciFiNext();
    scifiAutoInterval = setInterval(() => {
      window.simSciFiNext();
    }, 2800);
  }
};

window.simSciFiSkip = function() {
  if (scifiTimer) clearInterval(scifiTimer);
  if (scifiAutoInterval) {
    clearInterval(scifiAutoInterval);
    scifiAutoInterval = null;
    const autoBtn = document.getElementById('scifiAutoBtn');
    if (autoBtn) {
      autoBtn.style.background = '#1b356d';
      autoBtn.style.color = '#fff';
      autoBtn.innerText = 'AUTO';
    }
  }
  scifiIndex = scifiScript.length - 1;
  playSciFiLine(scifiIndex, true);
  if (window.showToast) showToast('已跳过通信对话', 'warning');
};

function playSciFiLine(idx, instant) {
  const data = scifiScript[idx];
  const speakerEl = document.getElementById('scifiSpeakerTag');
  const textEl = document.getElementById('scifiDialogueText');
  if (!speakerEl || !textEl) return;

  speakerEl.innerText = data.speaker;
  scifiTargetText = data.text;
  if (scifiTimer) clearInterval(scifiTimer);

  if (instant) {
    textEl.innerText = data.text;
    scifiIsTyping = false;
    return;
  }

  scifiIsTyping = true;
  textEl.innerText = '';
  let charIdx = 0;
  scifiTimer = setInterval(() => {
    if (charIdx < data.text.length) {
      charIdx++;
      textEl.innerText = data.text.substr(0, charIdx);
    } else {
      clearInterval(scifiTimer);
      scifiIsTyping = false;
    }
  }, 20);
}

// ==========================================
// Third-Party Ecosystem Simulators (QFramework / Dialogic)
// ==========================================
let simQFGoldCount = 1200;
let simQFPotionCount = 5;

window.simQFrameworkBuy = function() {
  if (simQFGoldCount < 100) {
    if (window.showToast) showToast('【Command Rejected】金币不足，无法执行购买指令！', 'danger');
    return;
  }
  simQFGoldCount -= 100;
  simQFPotionCount += 1;
  const goldEl = document.getElementById('simQFGoldCount');
  const potionEl = document.getElementById('simQFPotionCount');
  if (goldEl) goldEl.innerText = simQFGoldCount;
  if (potionEl) potionEl.innerText = simQFPotionCount;
  if (window.showToast) {
    showToast('【Command Executed】BuyPotionCommand 执行成功！金币 -100，生命药水 +1', 'success');
  }
};

window.simQFrameworkFull = function() {
  if (window.showToast) {
    showToast('【Event Fired】收到 InventoryFullEvent 事件：背包已满！', 'warning');
  }
};

let simQuestCurrentStep = 0;
const simQuestStepsData = [
  { title: '前往暗影森林调查', desc: '靠近爱丽丝并进行交谈' },
  { title: '通过爱丽丝的试炼', desc: '击败出现的暗影分身' },
  { title: '返回营地领取报酬', desc: '获得神秘魔杖与丰厚金币' }
];

window.simQuestNextStep = function() {
  simQuestCurrentStep = (simQuestCurrentStep + 1) % simQuestStepsData.length;
  const stepIdxEl = document.getElementById('simQuestStepBadge');
  const stepDescEl = document.getElementById('simQuestStepDesc');
  if (stepIdxEl) stepIdxEl.innerText = `阶段 ${simQuestCurrentStep + 1}/3: ${simQuestStepsData[simQuestCurrentStep].title}`;
  if (stepDescEl) stepDescEl.innerText = simQuestStepsData[simQuestCurrentStep].desc;
  if (window.showToast) {
    showToast(`【Quest Event】任务进度已更新：${simQuestStepsData[simQuestCurrentStep].title}`, 'info');
  }
};

window.switchMemorySlotTab = function(panelIndex, btnEl) {
  for (let i = 0; i < 4; i++) {
    const p = document.getElementById('memorySlotPanel' + i);
    if (p) p.style.display = (i === panelIndex ? 'flex' : 'none');
  }
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach((b, idx) => {
      if (idx === panelIndex) {
        b.className = 'g-btn g-btn-primary';
      } else {
        b.className = 'g-btn g-btn-default';
      }
    });
  }
};





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

// ==========================================================================
// Force Hard Reload & Cache Purge Engine
// ==========================================================================
window.forceHardReload = function() {
  try {
    if (window.showToast) window.showToast('正在清除本地缓存并强制更新页面...', 'info');
    
    // Purge browser caches API if present
    if (typeof caches !== 'undefined' && caches.keys) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }

    // Purge local storage if requested or retain essential themes
    const currentTheme = window.StorageUtil ? window.StorageUtil.getTheme() : 'dark';
    const currentPreset = window.StorageUtil ? window.StorageUtil.getPreset() : 'naive';

    setTimeout(() => {
      const ts = Date.now();
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const hash = window.location.hash || '';
      
      // Navigate with timestamp query param to break all proxy/browser caches
      window.location.replace(`${origin}${pathname}?_refresh_ts=${ts}${hash}`);
    }, 150);
  } catch (err) {
    window.location.reload(true);
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
  const cbs = document.querySelectorAll('.table-row-cb');
  const checked = Array.from(cbs).filter(cb => cb.checked).length;
  const tip = document.getElementById('tableSelTip');
  if (tip) tip.innerText = `已勾选: ${checked} / ${cbs.length} 项`;
  const master = document.getElementById('tableSelectAll');
  if (master) master.checked = checked === cbs.length && cbs.length > 0;
};

window.batchRewardTable = function() {
  const cbs = document.querySelectorAll('.table-row-cb:checked');
  if (cbs.length === 0) {
    if (window.showToast) window.showToast('请先勾选需要发放经验的英雄！', 'warning');
    return;
  }
  if (window.showToast) window.showToast(`已成功为 ${cbs.length} 位选中英雄批量发放 50,000 EXP 经验药水！`, 'success');
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

// =========================================================================
// GHud3D Global Demo Helpers
// =========================================================================
window.bossCurrentHp = 750000;
window.trigger3DHit = function() {
  window.bossCurrentHp = Math.max(0, window.bossCurrentHp - 3450);
  const hpPercent = (window.bossCurrentHp / 1000000) * 100;
  const bar = document.getElementById('hud3dBossHp');
  const text = document.getElementById('hud3dHpText');
  const dmg = document.getElementById('hud3dDamageText');

  if (bar) bar.style.width = hpPercent + '%';
  if (text) text.innerText = window.bossCurrentHp.toLocaleString() + ' / 1,000,000';

  if (dmg) {
    dmg.style.opacity = '1';
    dmg.style.transform = 'translateY(-24px) scale(1.15)';
    setTimeout(() => {
      dmg.style.opacity = '0';
      dmg.style.transform = 'translateY(0) scale(1)';
    }, 550);
  }

  if (window.triggerHaptic) window.triggerHaptic('heavy');
  if (window.showToast) window.showToast('💥 暴击命中 3D 空间 BOSS -3450 伤害！', 'error');
};

window.trigger3DHeal = function() {
  window.bossCurrentHp = Math.min(1000000, window.bossCurrentHp + 1200);
  const hpPercent = (window.bossCurrentHp / 1000000) * 100;
  const bar = document.getElementById('hud3dBossHp');
  const text = document.getElementById('hud3dHpText');

  if (bar) bar.style.width = hpPercent + '%';
  if (text) text.innerText = window.bossCurrentHp.toLocaleString() + ' / 1,000,000';

  if (window.triggerHaptic) window.triggerHaptic('light');
  if (window.showToast) window.showToast('💚 为 3D BOSS 恢复 +1200 生命值！', 'success');
};

// =========================================================================
// GHaptic Global Demo Helpers
// =========================================================================
window.triggerHaptic = function(type) {
  const patterns = {
    light: 15,
    medium: 35,
    heavy: 70,
    success: [20, 40, 20],
    warning: [40, 60, 40],
    error: [60, 40, 60, 40, 100]
  };

  const ms = patterns[type] || 30;
  if (navigator.vibrate) {
    try {
      navigator.vibrate(ms);
    } catch (e) {}
  }

  const statusText = document.getElementById('hapticStatusText');
  const box = document.getElementById('hapticFeedbackBox');
  if (statusText) {
    statusText.innerText = `已触发【${type.toUpperCase()}】触觉马达振动 (${Array.isArray(ms) ? ms.join('+') + 'ms' : ms + 'ms'})`;
  }
  if (box) {
    box.style.borderColor = 'var(--primary)';
    box.style.background = 'rgba(24,160,88,0.08)';
    setTimeout(() => {
      box.style.borderColor = 'var(--border-base)';
      box.style.background = 'var(--bg-card)';
    }, 300);
  }

  if (window.showToast) window.showToast(`马达触觉反馈: ${type.toUpperCase()}`, 'info');
};

// =========================================================================
// GParticleStudio Global Demo Helpers
// =========================================================================
window.particleStudioState = {
  amount: 60,
  spread: 180,
  velocity: 280,
  gravity: 400,
  preset: 'coin',
  particles: []
};

window.initParticleStudio = function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dt = 0.016;
    const active = [];

    window.particleStudioState.particles.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += window.particleStudioState.gravity * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);

      if (p.life > 0) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        active.push(p);
      }
    });

    window.particleStudioState.particles = active;
    const badge = document.getElementById('particleCountBadge');
    if (badge) badge.innerText = '活动粒子: ' + active.length;

    requestAnimationFrame(renderLoop);
  }

  renderLoop();
  setTimeout(() => window.triggerParticleBurst(), 100);
};

window.spawnParticlesAt = function(x, y) {
  const cfg = window.particleStudioState;
  const colors = {
    coin: ['#ffd700', '#ffea00', '#ffa500', '#ffffff'],
    gacha: ['#a855f7', '#ec4899', '#3b82f6', '#ffd700'],
    fire: ['#ef4444', '#f97316', '#fbbf24', '#ffffff'],
    magic: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ffffff']
  };
  const colorList = colors[cfg.preset] || colors.coin;

  for (let i = 0; i < cfg.amount; i++) {
    const angleRad = (Math.random() * cfg.spread - cfg.spread / 2 - 90) * (Math.PI / 180);
    const speed = cfg.velocity * (0.5 + Math.random() * 0.8);
    const maxLife = 0.6 + Math.random() * 0.8;

    window.particleStudioState.particles.push({
      x: x,
      y: y,
      vx: Math.cos(angleRad) * speed,
      vy: Math.sin(angleRad) * speed,
      life: maxLife,
      maxLife: maxLife,
      size: 2.5 + Math.random() * 3.5,
      color: colorList[Math.floor(Math.random() * colorList.length)]
    });
  }
};

window.triggerParticleBurst = function() {
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    window.spawnParticlesAt(canvas.width / 2, canvas.height / 2 + 30);
    if (window.showToast) window.showToast('🚀 触发粒子爆发 (Burst)!', 'success');
  }
};

window.onParticleCanvasClick = function(e, container) {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  window.spawnParticlesAt(x, y);
};

window.applyParticlePreset = function(preset) {
  window.particleStudioState.preset = preset;
  if (preset === 'coin') {
    window.particleStudioState.amount = 60;
    window.particleStudioState.spread = 160;
    window.particleStudioState.velocity = 320;
    window.particleStudioState.gravity = 450;
  } else if (preset === 'gacha') {
    window.particleStudioState.amount = 120;
    window.particleStudioState.spread = 360;
    window.particleStudioState.velocity = 260;
    window.particleStudioState.gravity = 0;
  } else if (preset === 'fire') {
    window.particleStudioState.amount = 80;
    window.particleStudioState.spread = 90;
    window.particleStudioState.velocity = 350;
    window.particleStudioState.gravity = -200;
  } else if (preset === 'magic') {
    window.particleStudioState.amount = 70;
    window.particleStudioState.spread = 240;
    window.particleStudioState.velocity = 200;
    window.particleStudioState.gravity = 80;
  }

  // Update controls
  const cA = document.getElementById('pCtrlAmount');
  const cS = document.getElementById('pCtrlSpread');
  const cV = document.getElementById('pCtrlVelocity');
  const cG = document.getElementById('pCtrlGravity');
  if (cA) cA.value = window.particleStudioState.amount;
  if (cS) cS.value = window.particleStudioState.spread;
  if (cV) cV.value = window.particleStudioState.velocity;
  if (cG) cG.value = window.particleStudioState.gravity;

  const pA = document.getElementById('pValAmount');
  const pS = document.getElementById('pValSpread');
  const pV = document.getElementById('pValVelocity');
  const pG = document.getElementById('pValGravity');
  if (pA) pA.innerText = window.particleStudioState.amount;
  if (pS) pS.innerText = window.particleStudioState.spread + '°';
  if (pV) pV.innerText = window.particleStudioState.velocity;
  if (pG) pG.innerText = window.particleStudioState.gravity;

  window.triggerParticleBurst();
};

window.updateParticleParam = function(param, val) {
  window.particleStudioState[param] = parseFloat(val);
  const targetLabel = document.getElementById('pVal' + param.charAt(0).toUpperCase() + param.slice(1));
  if (targetLabel) {
    targetLabel.innerText = param === 'spread' ? val + '°' : val;
  }
};

window.copyGodotParticleCode = function() {
  const cfg = window.particleStudioState;
  const code = `# Godot 4 GPUParticles2D 材质与代码\nvar particles = GPUParticles2D.new()\nvar mat = ParticleProcessMaterial.new()\nmat.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_POINT\nmat.spread = ${cfg.spread}.0\nmat.initial_velocity_min = ${cfg.velocity * 0.8}.0\nmat.initial_velocity_max = ${cfg.velocity * 1.2}.0\nmat.gravity = Vector3(0, ${cfg.gravity}, 0)\nparticles.amount = ${cfg.amount}\nparticles.process_material = mat\nparticles.one_shot = true\nadd_child(particles)\nparticles.emitting = true`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      if (window.showToast) window.showToast('已复制 Godot 4 GPUParticles2D 材质配置！', 'success');
    });
  } else {
    if (window.showToast) window.showToast('材质配置生成完毕！', 'success');
  }
};

// =========================================================================
// GAIDialogueTree Global Demo Helpers
// =========================================================================
window.chooseAIOption = function(type) {
  const stream = document.getElementById('aiDialogueStream');
  const optContainer = document.getElementById('aiOptionsContainer');
  const moodTag = document.getElementById('aiNpcMoodTag');
  if (!stream || !optContainer) return;

  let playerText = '';
  let npcReply = '';
  let newMood = '友善 (Friendly)';
  let moodTagClass = 'g-tag g-tag-primary';

  if (type === 'honest') {
    playerText = '是的，我必须摧毁它以挽救王国！';
    npcReply = '很好，年轻人... 你的眼神中没有贪婪。拿着这块【破晓符文】，它能破除魔核的暗影护盾！';
    newMood = '崇敬 (Admiring)';
    moodTagClass = 'g-tag g-tag-success';
  } else if (type === 'bargain') {
    playerText = '我想要那件蕴含禁忌力量的古代法杖，做个交易吧。';
    npcReply = '哼，凡人终究渴望力量。法杖我可以给你，但你必须替我带回三块深渊原石作为等价交换。';
    newMood = '中立审视 (Neutral)';
    moodTagClass = 'g-tag g-tag-warning';
  } else if (type === 'threat') {
    playerText = '把封印钥匙交出来，否则休怪我剑下无情！';
    npcReply = '放肆！胆敢在守望者之塔拔剑相向，受死吧，狂妄之徒！[触发战斗事件]';
    newMood = '敌对开战 (Hostile)';
    moodTagClass = 'g-tag g-tag-danger';
  }

  // Append Player Bubble
  stream.innerHTML += `
    <div style="display:flex; justify-content:flex-end; gap:8px; align-items:flex-start;">
      <div style="background:var(--primary); color:#fff; padding:8px 12px; border-radius:6px; font-size:12.5px; line-height:1.6; max-width:85%;">
        ${playerText}
      </div>
      <span style="font-size:16px;">👤</span>
    </div>
  `;
  stream.scrollTop = stream.scrollHeight;

  // Simulate AI Thinking
  optContainer.innerHTML = `<div style="font-size:12px; color:var(--text-secondary); padding:8px 0;"><i class="fa-solid fa-spinner fa-spin" style="color:var(--primary);"></i> AI 推理引擎正在根据上下文演算剧情分支...</div>`;

  setTimeout(() => {
    // Append NPC Reply
    stream.innerHTML += `
      <div style="display:flex; gap:8px; align-items:flex-start;">
        <span style="font-size:16px;">🧙‍♂️</span>
        <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12.5px; border:1px solid var(--border-base); color:var(--text-regular); line-height:1.6; max-width:85%;">
          ${npcReply}
        </div>
      </div>
    `;
    stream.scrollTop = stream.scrollHeight;

    // Update Mood
    if (moodTag) {
      moodTag.className = moodTagClass;
      moodTag.innerText = '态度: ' + newMood;
    }

    // Render Next Branches
    if (type === 'threat') {
      optContainer.innerHTML = `
        <button class="g-btn g-btn-danger" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('已进入回合制 BOSS 战斗场景！', 'error')">
          ⚔️ [开战] 拔剑迎战 大法师艾尔温！
        </button>
      `;
    } else {
      optContainer.innerHTML = `
        <button class="g-btn g-btn-primary" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('已接受任务：前往深渊核心！', 'success')">
          📜 [接受] 领受使命，前往深渊之井
        </button>
        <button class="g-btn g-btn-default" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('继续询问世界观细节', 'info')">
          ❓ [追问] 关于封印魔核的历史起源...
        </button>
      `;
    }

    if (window.showToast) window.showToast('AI 剧情分支推理完成！', 'info');
  }, 450);
};

window.resetAIDialogue = function() {
  const stream = document.getElementById('aiDialogueStream');
  const optContainer = document.getElementById('aiOptionsContainer');
  const moodTag = document.getElementById('aiNpcMoodTag');
  if (stream) {
    stream.innerHTML = `
      <div style="display:flex; gap:8px; align-items:flex-start;">
        <span style="font-size:16px;">🧙‍♂️</span>
        <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12.5px; border:1px solid var(--border-base); color:var(--text-regular); line-height:1.6; max-width:85%;">
          旅行者，你身上流淌着远古符文的气息... 是为了封印深渊魔核而来的吗？
        </div>
      </div>
    `;
  }
  if (moodTag) {
    moodTag.className = 'g-tag g-tag-primary';
    moodTag.innerText = '态度: 友善 (Friendly)';
  }
  if (optContainer) {
    optContainer.innerHTML = `
      <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('honest')">
        🗣️ [诚实] 是的，我必须摧毁它以挽救王国 (需要智力 ≥ 12)
      </button>
      <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('bargain')">
        💰 [商贾] 我想要那件蕴含禁忌力量的古代法杖，做个交易吧
      </button>
      <button class="g-btn g-btn-danger" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('threat')">
        ⚔️ [威吓] 把封印钥匙交出来，否则休怪我剑下无情！
      </button>
    `;
  }
  if (window.showToast) window.showToast('AI 对话树已重置为初始状态', 'info');
};
