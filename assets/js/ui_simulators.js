// =========================================================================
// Gotod Components UI - Basic & Form Simulators
// =========================================================================
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

  const total = checkboxes.length || 52;
  const unused = total - used;
  const rate = total > 0 ? ((unused / total) * 100).toFixed(1) : '0.0';

  const totalCntElem = document.getElementById('shakerTotalCount');
  const usedCntElem = document.getElementById('shakerUsedCount');
  const unusedCntElem = document.getElementById('shakerUnusedCount');
  const tagElem = document.getElementById('shakerOptimizeTag');
  const logElem = document.getElementById('shakerLogText');

  if (totalCntElem) totalCntElem.innerText = `${total} 个`;
  if (usedCntElem) usedCntElem.innerText = `${used} 个`;
  if (unusedCntElem) unusedCntElem.innerText = `${unused} 个`;
  if (tagElem) tagElem.innerText = `包体优化率: ${rate}%`;
  if (logElem) {
    const unusedSample = unusedNames.slice(0, 6).join(', ');
    const moreTxt = unusedNames.length > 6 ? ` 等 ${unusedNames.length} 个` : '';
    logElem.innerHTML = `[GotodUI Tree-Shaker] 扫描完成: 实际打包 ${used} 个组件 (${usedNames.slice(0, 8).join(', ')}${usedNames.length > 8 ? '...' : ''})，自动 skip() 剔除 ${unused} 个未引用组件 (${unusedSample}${moreTxt})。`;
  }
};

window.setTreeShakerPreset = function(preset, btn) {
  const grid = document.getElementById('shakerCheckGrid');
  if (!grid) return;
  const checkboxes = Array.from(grid.querySelectorAll('input[type="checkbox"]'));
  
  const coreSet = new Set(['GButton', 'GInput', 'GTabs', 'GDialog', 'GProgress', 'GCard']);
  const rpgSet = new Set([
    'GButton', 'GText', 'GIcon', 'GFab', 'GInput', 'GSlider', 'GDialog', 'GDialogue',
    'GChat', 'GCard', 'GTag', 'GBadge', 'GAvatar', 'GProgress', 'GTabs', 'GHaptic',
    'GAIDialogueTree', 'GI18n'
  ]);

  let msg = '预设已应用';

  if (preset === 'all') {
    checkboxes.forEach(cb => { cb.checked = true; });
    msg = '已全选 52 个组件';
  } else if (preset === 'invert') {
    checkboxes.forEach(cb => { cb.checked = !cb.checked; });
    msg = '已执行组件反选';
  } else if (preset === 'none') {
    checkboxes.forEach(cb => { cb.checked = false; });
    msg = '已清空所有组件勾选';
  } else if (preset === 'core') {
    checkboxes.forEach(cb => {
      const name = cb.parentElement.innerText.trim().split(' ')[0];
      cb.checked = coreSet.has(name);
    });
    msg = '已应用【核心精简】预设 (6个)';
  } else if (preset === 'rpg') {
    checkboxes.forEach(cb => {
      const name = cb.parentElement.innerText.trim().split(' ')[0];
      cb.checked = rpgSet.has(name);
    });
    msg = '已应用【中重度 RPG】预设 (18个)';
  }

  // Update button active style
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('button').forEach(b => {
      b.className = 'g-btn g-btn-default';
    });
    btn.className = 'g-btn g-btn-primary';
  }

  window.runLiveTreeShaker();
  if (window.showToast) {
    window.showToast(msg, 'info');
  }
};

// -------------------------------------------------------------
// Component Search / Filter with Autocomplete & Highlight Focus
// -------------------------------------------------------------
window.filterShakerComponents = function(query) {
  const grid = document.getElementById('shakerCheckGrid');
  const dropdown = document.getElementById('shakerSearchDropdown');
  const clearBtn = document.getElementById('shakerSearchClearBtn');
  if (!grid) return;

  const labels = Array.from(grid.querySelectorAll('label'));
  const q = (query || '').trim().toLowerCase();

  if (clearBtn) clearBtn.style.display = q ? 'inline-block' : 'none';

  if (!q) {
    if (dropdown) dropdown.style.display = 'none';
    labels.forEach(l => {
      l.style.opacity = '1';
      l.style.background = 'transparent';
      l.style.display = 'flex';
      l.classList.remove('shaker-item-highlight');
    });
    return;
  }

  const matches = [];
  labels.forEach(l => {
    const text = l.innerText.trim();
    const isMatch = text.toLowerCase().includes(q);
    const compName = text.split(' ')[0]; // e.g. "GIcon", "GButton"
    if (isMatch) {
      l.style.opacity = '1';
      l.style.background = 'rgba(24, 160, 88, 0.14)';
      l.style.borderRadius = '4px';
      l.style.padding = '3px 6px';
      l.style.display = 'flex';
      matches.push({ label: l, text: text, compName: compName });
    } else {
      l.style.opacity = '0.22';
      l.style.background = 'transparent';
      l.classList.remove('shaker-item-highlight');
    }
  });

  if (dropdown) {
    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding:10px 12px; font-size:12px; color:var(--text-secondary); text-align:center;">未找到包含 "${query}" 的组件</div>`;
      dropdown.style.display = 'block';
    } else {
      dropdown.innerHTML = `
        <div style="font-size:11px; color:var(--text-secondary); padding:4px 8px 6px; font-weight:600; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;">
          <span>匹配组件 (${matches.length} 个)</span>
          <span style="font-size:10px; color:var(--primary); font-weight:normal;">点击直接查阅组件文档</span>
        </div>
        ${matches.map(m => `
          <div class="shaker-dropdown-item" onclick="window.jumpToComponentDoc('${m.compName}', event)" style="display:flex; align-items:center; justify-content:space-between; padding:7px 10px; cursor:pointer; font-size:12px; border-radius:4px; transition:all 0.15s; margin-top:2px;" title="点击打开【${m.text}】组件文档">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-cube" style="color:var(--primary); font-size:11px;"></i>
              <span style="font-weight:600; color:var(--text-primary);">${m.text}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="g-btn g-btn-primary" style="height:22px; padding:0 8px; font-size:10px; border-radius:3px; display:inline-flex; align-items:center; gap:4px;">
                <i class="fa-solid fa-book-open"></i> 文档
              </span>
              <span class="g-btn g-btn-default" style="height:22px; padding:0 6px; font-size:10px; border-radius:3px; display:inline-flex; align-items:center; gap:3px;" onclick="window.selectShakerSearchItem('${m.text.replace(/'/g, "\\'")}', event)" title="在当前网格中定位">
                <i class="fa-solid fa-crosshairs"></i> 定位
              </span>
            </div>
          </div>
        `).join('')}
      `;
      dropdown.style.display = 'block';
    }
  }
};

window.jumpToComponentDoc = function(compName, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const dropdown = document.getElementById('shakerSearchDropdown');
  if (dropdown) dropdown.style.display = 'none';

  const cleanName = (compName || '').trim().replace(/^G/, '');
  const kebab = cleanName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  let targetSection = 'components';
  if (window.GAME_CATALOG && window.GAME_CATALOG[kebab]) targetSection = 'game';
  else if (window.STUDIO_CATALOG && window.STUDIO_CATALOG[kebab]) targetSection = 'studio';
  else if (window.GUIDE_CATALOG && window.GUIDE_CATALOG[kebab]) targetSection = 'guide';

  if (typeof window.switchTopSection === 'function') {
    window.switchTopSection(targetSection, kebab);
  } else if (typeof window.showDoc === 'function') {
    window.showDoc(kebab);
  }

  if (window.showToast) {
    window.showToast(`已跳转到【${compName}】组件文档`, 'success');
  }
};

window.selectShakerSearchItem = function(targetText, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const input = document.getElementById('shakerSearchInput');
  const dropdown = document.getElementById('shakerSearchDropdown');
  const grid = document.getElementById('shakerCheckGrid');
  if (input) input.value = targetText;
  if (dropdown) dropdown.style.display = 'none';

  if (grid) {
    const labels = Array.from(grid.querySelectorAll('label'));
    labels.forEach(l => {
      l.classList.remove('shaker-item-highlight');
      if (l.innerText.trim().includes(targetText)) {
        l.style.opacity = '1';
        l.classList.add('shaker-item-highlight');
        l.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        l.style.opacity = '0.22';
      }
    });
  }
  if (window.showToast) window.showToast(`已精确定位组件: ${targetText}`, 'info');
};

window.clearShakerSearch = function() {
  const input = document.getElementById('shakerSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  window.filterShakerComponents('');
  if (window.showToast) window.showToast('已恢复展示全部 52 个组件', 'info');
};

// Global click outside to dismiss autocomplete dropdown
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('shakerSearchDropdown');
  const input = document.getElementById('shakerSearchInput');
  if (dropdown && dropdown.style.display === 'block') {
    if (!dropdown.contains(e.target) && e.target !== input) {
      dropdown.style.display = 'none';
    }
  }
});

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

