// ==========================================
// Gotod Components UI - Interactive Docs Engine
// Inspired by Naive UI, Element Plus, AntD, Vant UI
// ==========================================

// Global Theme & Mode Manager
window.changePreset = function(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  showToast('Theme switched to: ' + preset.toUpperCase() + ' design tokens', 'info');
};

window.toggleTheme = function() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  document.getElementById('themeText').innerText = next === 'dark' ? 'Dark' : 'Light';
};

// Toast Floating Message System
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

// Copy Code
window.copyCode = function(btn, codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    btn.style.background = 'var(--primary)';
    showToast('GDScript snippet copied to clipboard!', 'success');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
    }, 2000);
  });
};

// Modal Dialog Controls
window.openDialog = function(title, body) {
  document.getElementById('dialogTitle').innerText = title || 'Dialog Modal';
  document.getElementById('dialogBody').innerText = body || 'Dialog Content';
  document.getElementById('dialogModal').classList.add('active');
};
window.closeDialog = function(e) {
  if (e.target.id === 'dialogModal') closeDialogDirect();
};
window.closeDialogDirect = function() {
  document.getElementById('dialogModal').classList.remove('active');
};
window.confirmDialog = function() {
  closeDialogDirect();
  showToast('Dialog operation confirmed!', 'success');
};

// Drawer Controls
window.openDrawer = function(placement) {
  const drawerBox = document.querySelector('.g-drawer-box');
  if (drawerBox && placement) {
    if (placement === 'left') {
      document.getElementById('drawerModal').style.justifyContent = 'flex-start';
    } else {
      document.getElementById('drawerModal').style.justifyContent = 'flex-end';
    }
  }
  document.getElementById('drawerModal').classList.add('active');
};
window.closeDrawer = function(e) {
  if (e.target.id === 'drawerModal') closeDrawerDirect();
};
window.closeDrawerDirect = function() {
  document.getElementById('drawerModal').classList.remove('active');
};

// Tabs Switching Helper
window.switchTabDemo = function(tabIndex, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabs = container.querySelectorAll('.sim-tab-header');
  const panels = container.querySelectorAll('.sim-tab-panel');
  
  tabs.forEach((tab, idx) => {
    const isActive = (idx === tabIndex);
    tab.classList.toggle('active', isActive);
    tab.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
    if (tab.getAttribute('data-tab-type') === 'card') {
      tab.style.background = isActive ? 'var(--bg-card)' : 'var(--bg-surface)';
      tab.style.borderBottomColor = isActive ? 'var(--bg-card)' : 'var(--border-base)';
    } else if (tab.getAttribute('data-tab-type') === 'border-card') {
      tab.style.background = isActive ? 'var(--bg-card)' : 'transparent';
      tab.style.borderBottomColor = isActive ? 'transparent' : 'var(--border-base)';
    } else {
      tab.style.borderBottomColor = isActive ? 'var(--primary)' : 'transparent';
    }
    tab.style.fontWeight = isActive ? '600' : 'normal';
  });

  panels.forEach((panel, idx) => {
    panel.style.display = (idx === tabIndex) ? 'block' : 'none';
  });
  showToast(`Switched to Tab ${tabIndex + 1}`, 'info');
};

// Tabs Dynamic Add & Remove (Element Plus style)
window.addDynamicTabPane = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabHeaderBox = container.querySelector('.sim-tab-nav-list');
  const panelBox = container.querySelector('.sim-tab-panel-box');
  if (!tabHeaderBox || !panelBox) return;

  const currentCount = tabHeaderBox.querySelectorAll('.sim-tab-header').length + 1;
  const newIndex = currentCount - 1;

  // New Tab Header
  const newTab = document.createElement('div');
  newTab.className = 'sim-tab-header';
  newTab.setAttribute('data-tab-type', 'card');
  newTab.style.cssText = 'color:var(--text-secondary); cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-bottom:1px solid var(--border-base); border-radius:4px 4px 0 0; background:var(--bg-surface); display:inline-flex; align-items:center; gap:8px;';
  newTab.innerHTML = `<span>Tab ${currentCount}</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, '${containerId}');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>`;
  newTab.onclick = () => switchTabDemo(newIndex, containerId);

  // Insert before add button if any
  const addBtn = tabHeaderBox.querySelector('.sim-tab-add-btn');
  if (addBtn) {
    tabHeaderBox.insertBefore(newTab, addBtn);
  } else {
    tabHeaderBox.appendChild(newTab);
  }

  // New Tab Panel
  const newPanel = document.createElement('div');
  newPanel.className = 'sim-tab-panel';
  newPanel.style.cssText = 'display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);';
  newPanel.innerHTML = `<h3>Tab ${currentCount} content</h3><p style="color:var(--text-secondary); margin-top:6px;">This is dynamically created Tab ${currentCount} content.</p>`;
  panelBox.appendChild(newPanel);

  // Activate new tab
  switchTabDemo(newIndex, containerId);
  showToast(`Added Tab ${currentCount}`, 'success');
};

window.removeDynamicTabPane = function(btn, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabHeader = btn.closest('.sim-tab-header');
  const tabHeaderBox = container.querySelector('.sim-tab-nav-list');
  const panelBox = container.querySelector('.sim-tab-panel-box');
  if (!tabHeader || !tabHeaderBox || !panelBox) return;

  const allTabs = Array.from(tabHeaderBox.querySelectorAll('.sim-tab-header'));
  const idx = allTabs.indexOf(tabHeader);
  if (idx !== -1) {
    const panels = panelBox.querySelectorAll('.sim-tab-panel');
    tabHeader.remove();
    if (panels[idx]) panels[idx].remove();

    // Switch to adjacent tab
    const remainingTabs = tabHeaderBox.querySelectorAll('.sim-tab-header');
    if (remainingTabs.length > 0) {
      const nextIdx = Math.max(0, idx - 1);
      switchTabDemo(nextIdx, containerId);
    }
    showToast('Tab closed', 'info');
  }
};

// Tabs Position Changer
window.changeTabPosDemo = function(pos, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const wrapper = container.querySelector('.sim-tab-wrapper');
  const navList = container.querySelector('.sim-tab-nav-list');
  if (!wrapper || !navList) return;

  if (pos === 'left') {
    wrapper.style.flexDirection = 'row';
    navList.style.flexDirection = 'column';
    navList.style.borderBottom = 'none';
    navList.style.borderRight = '1px solid var(--border-base)';
  } else if (pos === 'right') {
    wrapper.style.flexDirection = 'row-reverse';
    navList.style.flexDirection = 'column';
    navList.style.borderBottom = 'none';
    navList.style.borderLeft = '1px solid var(--border-base)';
  } else if (pos === 'bottom') {
    wrapper.style.flexDirection = 'column-reverse';
    navList.style.flexDirection = 'row';
    navList.style.borderBottom = 'none';
    navList.style.borderTop = '1px solid var(--border-base)';
  } else { // top
    wrapper.style.flexDirection = 'column';
    navList.style.flexDirection = 'row';
    navList.style.borderBottom = '1px solid var(--border-base)';
    navList.style.borderTop = 'none';
    navList.style.borderLeft = 'none';
    navList.style.borderRight = 'none';
  }
  showToast(`Tab position: ${pos.toUpperCase()}`, 'info');
};

// Collapse Accordion Helper
window.toggleCollapseDemo = function(headerElem) {
  const parent = headerElem.closest('.sim-collapse-item');
  const body = parent.querySelector('.sim-collapse-body');
  const arrow = parent.querySelector('.sim-collapse-arrow');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
};

// Steps Process Helper
window.changeStepDemo = function(delta) {
  const box = document.getElementById('demoStepsBox');
  if (!box) return;
  let cur = parseInt(box.getAttribute('data-step') || '1');
  cur = Math.max(1, Math.min(3, cur + delta));
  box.setAttribute('data-step', cur);
  
  for (let i = 1; i <= 3; i++) {
    const num = document.getElementById('stepNum' + i);
    const txt = document.getElementById('stepText' + i);
    const line = document.getElementById('stepLine' + i);
    if (i <= cur) {
      if (num) { num.style.background = 'var(--primary)'; num.style.color = '#fff'; num.style.borderColor = 'var(--primary)'; }
      if (txt) { txt.style.color = 'var(--text-primary)'; txt.style.fontWeight = '600'; }
    } else {
      if (num) { num.style.background = 'var(--bg-surface)'; num.style.color = 'var(--text-secondary)'; num.style.borderColor = 'var(--border-base)'; }
      if (txt) { txt.style.color = 'var(--text-disabled)'; txt.style.fontWeight = 'normal'; }
    }
    if (line) {
      line.style.background = (i < cur) ? 'var(--primary)' : 'var(--border-base)';
    }
  }
  const desc = document.getElementById('stepStatusDesc');
  if (desc) {
    const titles = ["Step 1: Configuration & Project Init", "Step 2: Theme Tokens Selection", "Step 3: Build & Export Successfully!"];
    desc.innerText = titles[cur - 1];
  }
};

// Tag Remove Helper
window.removeTagDemo = function(btn) {
  const tag = btn.closest('.g-tag');
  if (tag) {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'all 0.2s';
    setTimeout(() => tag.remove(), 200);
    showToast('Tag removed', 'info');
  }
};

// Checkbox Check All
window.toggleCheckAll = function(master) {
  const list = document.querySelectorAll('.cb-child');
  list.forEach(cb => cb.checked = master.checked);
  showToast(master.checked ? 'Selected all options' : 'Deselected all options', 'info');
};

// ==========================================
// Comprehensive Component Documentation & Demos
// ==========================================
const DOCS = {
  // --------------------------------------------------------
  // TABS (100% COMPLETE ELEMENT PLUS MATCH)
  // --------------------------------------------------------
  'tabs': {
    title: 'Tabs 标签页 (GTabs)',
    desc: '分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。',
    demos: [
      {
        title: '1. 基础用法 (Basic Usage)',
        render: `
          <div id="tabsBasicContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:24px; border-bottom:1px solid var(--border-base); margin-bottom:16px;">
                <div class="sim-tab-header active" onclick="switchTabDemo(0, 'tabsBasicContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding-bottom:10px; border-bottom:2px solid var(--primary); transition:all 0.2s;">User</div>
                <div class="sim-tab-header" onclick="switchTabDemo(1, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Config</div>
                <div class="sim-tab-header" onclick="switchTabDemo(2, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Role</div>
                <div class="sim-tab-header" onclick="switchTabDemo(3, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Task</div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>User</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">User panel content in Godot 4.x GTabs.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Config</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Config panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Role</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Role panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Task</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Task panel content.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Basic Tabs
var tabs = GTabs.new()
tabs.add_tab("User", user_panel)
tabs.add_tab("Config", config_panel)
tabs.add_tab("Role", role_panel)
tabs.add_tab("Task", task_panel)
tabs.tab_changed.connect(func(idx, name): print("Active tab:", name))
add_child(tabs)`
      },

      {
        title: '2. 选项卡样式 (Card Style: type="card")',
        render: `
          <div id="tabsCardContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:0; border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" data-tab-type="card" onclick="switchTabDemo(0, 'tabsCardContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-bottom:1px solid var(--bg-card); background:var(--bg-card); border-radius:4px 4px 0 0;">User</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(1, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Config</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(2, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Role</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(3, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Task</div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>User</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style User content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Config</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style Config content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Role</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style Role content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Task</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style Task content.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Card Style
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.add_tab("User", user_panel)
tabs.add_tab("Config", config_panel)
add_child(tabs)`
      },

      {
        title: '3. 边框卡片化 (Border Card: type="border-card")',
        render: `
          <div id="tabsBorderCardContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
              <div class="sim-tab-nav-list" style="display:flex; background:var(--bg-surface); border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" data-tab-type="border-card" onclick="switchTabDemo(0, 'tabsBorderCardContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:10px 20px; background:var(--bg-card); border-right:1px solid var(--border-base);">User</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(1, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px; border-right:1px solid var(--border-base);">Config</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(2, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px; border-right:1px solid var(--border-base);">Role</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(3, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px;">Task</div>
              </div>
              <div class="sim-tab-panel-box" style="padding:18px; background:var(--bg-card);">
                <div class="sim-tab-panel" style="display:block;"><h3>User</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card User panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Config</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Config panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Role</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Role panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Task</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Task panel.</p></div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Border Card Style
var tabs = GTabs.new()
tabs.type = GTabs.TabType.BORDER_CARD
tabs.add_tab("User", user_panel)
add_child(tabs)`
      },

      {
        title: '4. 自定义标签页内容与图标 (Custom Tab with Icon)',
        render: `
          <div id="tabsIconContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:24px; border-bottom:1px solid var(--border-base); margin-bottom:16px;">
                <div class="sim-tab-header active" onclick="switchTabDemo(0, 'tabsIconContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding-bottom:10px; border-bottom:2px solid var(--primary); display:inline-flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-moon"></i> Route 路线
                </div>
                <div class="sim-tab-header" onclick="switchTabDemo(1, 'tabsIconContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; display:inline-flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-shapes"></i> Config 配置
                </div>
                <div class="sim-tab-header" onclick="switchTabDemo(2, 'tabsIconContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; display:inline-flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-cube"></i> Task 任务
                </div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Route</h3><p style="color:var(--text-secondary); margin-top:4px;">Custom tab with icon content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Config</h3><p style="color:var(--text-secondary); margin-top:4px;">Config panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Task</h3><p style="color:var(--text-secondary); margin-top:4px;">Task panel content.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Custom Icon Tabs
var tabs = GTabs.new()
tabs.add_tab("Route", route_panel, false, icon_texture)
add_child(tabs)`
      },

      {
        title: '5. 动态增减标签页 (Dynamic Add & Remove Tabs: closable & addable)',
        render: `
          <div id="tabsDynamicContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:0; border-bottom:1px solid var(--border-base); align-items:center;">
                <div class="sim-tab-header active" data-tab-type="card" onclick="switchTabDemo(0, 'tabsDynamicContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-bottom:1px solid var(--bg-card); background:var(--bg-card); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 1</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, 'tabsDynamicContainer');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>
                </div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(1, 'tabsDynamicContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 2</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, 'tabsDynamicContainer');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>
                </div>
                <button class="sim-tab-add-btn" onclick="addDynamicTabPane('tabsDynamicContainer')" style="margin-left:8px; background:var(--bg-surface); border:1px solid var(--border-base); color:var(--text-primary); border-radius:4px; padding:4px 10px; cursor:pointer; font-size:14px; font-weight:700;">+</button>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 1 content</h3><p style="color:var(--text-secondary); margin-top:4px;">Tab 1 initial panel.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 2 content</h3><p style="color:var(--text-secondary); margin-top:4px;">Tab 2 initial panel.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Dynamic Add & Remove Tabs
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.closable = true
tabs.addable = true

tabs.tab_added.connect(func():
    var count = tabs._tabs_data.size() + 1
    var p = Label.new()
    p.text = "New Tab " + str(count) + " Content"
    tabs.add_tab("Tab " + str(count), p, true)
)
tabs.tab_removed.connect(func(tab_name):
    print("Removed tab: ", tab_name)
)
add_child(tabs)`
      },

      {
        title: '6. 自定义增加标签页触发器 (Custom Add Tab Trigger)',
        render: `
          <div id="tabsCustomTriggerContainer" style="width:100%; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:flex-start;">
              <button class="g-btn g-btn-default" style="font-size:12px; padding:4px 12px;" onclick="addDynamicTabPane('tabsCustomTriggerContainer')">add tab 外部触发新增</button>
            </div>
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:0; border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" data-tab-type="card" onclick="switchTabDemo(0, 'tabsCustomTriggerContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-bottom:1px solid var(--bg-card); background:var(--bg-card); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 1</span>
                </div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(1, 'tabsCustomTriggerContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 2</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, 'tabsCustomTriggerContainer');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>
                </div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 1 content</h3>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 2 content</h3>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Custom Add Trigger Button
var add_btn = GButton.new()
add_btn.text = "add tab"
add_btn.pressed.connect(func():
    tabs.add_tab("New Tab", custom_panel, true)
)
add_child(add_btn)`
      },

      {
        title: '7. 位置设置 (Tab Positions: top / right / bottom / left)',
        render: `
          <div id="tabsPosContainer" style="width:100%; display:flex; flex-direction:column; gap:16px;">
            <!-- Position Switcher Radios -->
            <div style="display:flex; gap:18px; align-items:center;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="changeTabPosDemo('top', 'tabsPosContainer')"><input type="radio" name="tab_pos_radio" checked> <span>top 上方</span></label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="changeTabPosDemo('right', 'tabsPosContainer')"><input type="radio" name="tab_pos_radio"> <span>right 右侧</span></label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="changeTabPosDemo('bottom', 'tabsPosContainer')"><input type="radio" name="tab_pos_radio"> <span>bottom 底部</span></label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="changeTabPosDemo('left', 'tabsPosContainer')"><input type="radio" name="tab_pos_radio"> <span>left 左侧</span></label>
            </div>

            <!-- Positioned Tabs Container -->
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column; min-height:160px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
              <div class="sim-tab-nav-list" style="display:flex; gap:20px; padding:10px 16px; background:var(--bg-surface); border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" onclick="switchTabDemo(0, 'tabsPosContainer')" style="color:var(--primary); font-weight:600; cursor:pointer;">User</div>
                <div class="sim-tab-header" onclick="switchTabDemo(1, 'tabsPosContainer')" style="color:var(--text-secondary); cursor:pointer;">Config</div>
                <div class="sim-tab-header" onclick="switchTabDemo(2, 'tabsPosContainer')" style="color:var(--text-secondary); cursor:pointer;">Role</div>
                <div class="sim-tab-header" onclick="switchTabDemo(3, 'tabsPosContainer')" style="color:var(--text-secondary); cursor:pointer;">Task</div>
              </div>
              <div class="sim-tab-panel-box" style="flex:1; padding:18px; background:var(--bg-card);">
                <div class="sim-tab-panel" style="display:block;"><h3>User Panel</h3><p style="color:var(--text-secondary); margin-top:4px;">Positioned User content.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Config Panel</h3><p style="color:var(--text-secondary); margin-top:4px;">Positioned Config content.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Role Panel</h3><p style="color:var(--text-secondary); margin-top:4px;">Positioned Role content.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Task Panel</h3><p style="color:var(--text-secondary); margin-top:4px;">Positioned Task content.</p></div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Position Setting
var tabs = GTabs.new()
tabs.tab_position = GTabs.TabPosition.LEFT # TOP, BOTTOM, LEFT, RIGHT
add_child(tabs)`
      }
    ],

    // Exact Element Plus Tabs Attributes
    props: [
      { name: 'model-value / current_tab', type: 'string / number', default: '0', desc: '绑定值，选中选项卡的 name 或索引，默认是第一个 tab' },
      { name: 'type', type: 'enum', default: "'' (LINE)", desc: '风格类型：LINE, CARD, BORDER_CARD, SEGMENT' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '标签是否可关闭' },
      { name: 'addable', type: 'boolean', default: 'false', desc: '标签是否可增加' },
      { name: 'editable', type: 'boolean', default: 'false', desc: '标签是否同时可增加和关闭' },
      { name: 'tab-position', type: 'enum', default: 'top', desc: '选项卡所在位置：top, bottom, left, right' },
      { name: 'stretch', type: 'boolean', default: 'false', desc: '标签的宽度是否自撑开' },
      { name: 'before-leave', type: 'Callable / Function', default: '() => true', desc: '切换标签之前的钩子函数，若返回 false 则阻止切换' }
    ],

    // Exact Element Plus Tabs Events / Signals
    events: [
      { name: 'tab-click(index, name)', desc: 'tab 被选中点击时触发', params: '(index: int, name: String)' },
      { name: 'tab-change(active_name)', desc: 'activeName 改变时触发', params: '(index: int, name: String)' },
      { name: 'tab-remove(name)', desc: '点击 tab 移除按钮时触发', params: '(name: String)' },
      { name: 'tab-add()', desc: '点击 tab 新增按钮时触发', params: '()' },
      { name: 'edit(target_name, action)', desc: '点击 tab 的新增或移除按钮后触发', params: '(name: String, action: String)' }
    ],

    // Exact Element Plus Tabs Slots
    slots: [
      { name: 'default', desc: '默认插槽，放入 Tab-pane 或各面板内容节点', child: 'Tab-pane / Control' },
      { name: 'add-icon', desc: '自定义添加按钮图标', child: 'GIcon / Texture2D' }
    ],

    // Exact Element Plus Tab-pane Attributes
    paneProps: [
      { name: 'label', type: 'string', default: "''", desc: '选项卡标题文字' },
      { name: 'name', type: 'string / number', default: "''", desc: '与选项卡绑定值 value 对应的标识符' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用该标签页' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '该标签是否可单独关闭' },
      { name: 'lazy', type: 'boolean', default: 'false', desc: '标签是否延迟渲染（仅在激活时初始化）' }
    ]
  },

  // --------------------------------------------------------
  // BUTTON (Full Scenarios)
  // --------------------------------------------------------
  'button': {
    title: 'Button 按钮 (GButton)',
    desc: '融合 Naive UI, Element Plus, Ant Design Vue, Vant UI 特性的通用按钮组件，支持多种色彩主题、形态样式、尺寸规格、加载动效与图标。',
    demos: [
      {
        title: '1. Basic Types 基础色彩类型',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-default" onclick="showToast('Default button clicked')">Default 默认</button>
            <button class="g-btn g-btn-primary" onclick="showToast('Primary button clicked', 'success')">Primary 主要</button>
            <button class="g-btn g-btn-success" onclick="showToast('Success button clicked', 'success')">Success 成功</button>
            <button class="g-btn g-btn-warning" onclick="showToast('Warning button clicked', 'warning')">Warning 警告</button>
            <button class="g-btn g-btn-danger" onclick="showToast('Danger button clicked', 'danger')">Danger 危险</button>
            <button class="g-btn g-btn-info" onclick="showToast('Info button clicked', 'info')">Info 信息</button>
          </div>
        `,
        code: `# GDScript: Basic Types
var btn_p = GButton.new()
btn_p.text = "Primary Button"
btn_p.button_type = GButton.ButtonType.PRIMARY
add_child(btn_p)`
      },
      {
        title: '2. Variants & Plain 变体形态',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary">Solid 实心</button>
            <button class="g-btn g-btn-outline">Outline 边框</button>
            <button class="g-btn g-btn-dashed">Dashed 虚线</button>
            <button class="g-btn g-btn-text">Text 文本</button>
            <button class="g-btn g-btn-text" style="text-decoration:underline;">Link 链接</button>
          </div>
        `,
        code: `var outline_btn = GButton.new()
outline_btn.text = "Outline Button"
outline_btn.variant = GButton.Variant.OUTLINE
add_child(outline_btn)`
      },
      {
        title: '3. Shapes & Pill 形状形态',
        render: `
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary g-btn-round">Round 胶囊圆角</button>
            <button class="g-btn g-btn-success g-btn-round" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-check"></i></button>
            <button class="g-btn g-btn-danger" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-trash"></i></button>
          </div>
        `,
        code: `var round_btn = GButton.new()
round_btn.text = "Round Pill"
round_btn.shape = GButton.Shape.ROUND
add_child(round_btn)`
      },
      {
        title: '4. Loading & Disabled 状态',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary"><i class="fa-solid fa-spinner fa-spin"></i> Loading 加载中</button>
            <button class="g-btn g-btn-primary" style="opacity:0.5; cursor:not-allowed;" disabled>Disabled 禁用</button>
          </div>
        `,
        code: `var load_btn = GButton.new()
load_btn.loading = true
add_child(load_btn)`
      }
    ],
    props: [
      { name: 'button_type', type: 'ButtonType', default: 'DEFAULT', desc: '色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO' },
      { name: 'variant', type: 'Variant', default: 'SOLID', desc: '表现形态：SOLID, OUTLINE, DASHED, TEXT, LINK' },
      { name: 'button_size', type: 'Size', default: 'MEDIUM', desc: '尺寸规格：SMALL, MEDIUM, LARGE' },
      { name: 'shape', type: 'Shape', default: 'DEFAULT', desc: '几何形状：DEFAULT, ROUND, CIRCLE, SQUARE' },
      { name: 'loading', type: 'bool', default: 'false', desc: '是否进入加载动画状态' },
      { name: 'block', type: 'bool', default: 'false', desc: '是否展开为全宽通栏按钮' }
    ]
  },

  // --------------------------------------------------------
  // INPUT (Full Scenarios)
  // --------------------------------------------------------
  'input': {
    title: 'Input 输入框 (GInput)',
    desc: '支持前后缀、一键清空、密码掩码切换、多种校验状态描边、字数限制与尺寸切换。',
    demos: [
      {
        title: '1. Basic & Clearable 基础与一键清空',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper"><input class="g-input" type="text" placeholder="Basic Input 请输入..." value="gotod-ui"></div>
            <div class="g-input-wrapper" style="position:relative;">
              <input id="demoClearInput" class="g-input" type="text" placeholder="Clearable 可清空..." value="Click clear button">
              <button onclick="document.getElementById('demoClearInput').value=''; showToast('Input cleared');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px;">×</button>
            </div>
          </div>
        `,
        code: `var input = GInput.new()
input.placeholder_text = "Enter content..."
input.clearable = true
add_child(input)`
      },
      {
        title: '2. Password & Reveal 密码明暗文切换',
        render: `
          <div class="g-input-wrapper" style="position:relative; width:100%; max-width:340px;">
            <input id="demoPwdInput" class="g-input" type="password" placeholder="Password input..." value="Godot4Password">
            <button onclick="let el=document.getElementById('demoPwdInput'); el.type = el.type === 'password' ? 'text' : 'password';" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;"><i class="fa-solid fa-moon"></i></button>
          </div>
        `,
        code: `var pwd_input = GInput.new()
pwd_input.secret = true
pwd_input.show_password_toggle = true
add_child(pwd_input)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '输入框绑定的文本内容' },
      { name: 'placeholder_text', type: 'String', default: '"Please input..."', desc: '占位提示文字' },
      { name: 'clearable', type: 'bool', default: 'false', desc: '是否显示一键清空按钮' },
      { name: 'secret', type: 'bool', default: 'false', desc: '是否开启密码密文模式' },
      { name: 'status', type: 'Status', default: 'DEFAULT', desc: '校验边框状态：DEFAULT, ERROR, WARNING, SUCCESS' }
    ]
  }
};

// Main Render Dispatcher
window.showDoc = function(key) {
  if (window.COMPONENT_CATALOG) {
    Object.assign(DOCS, window.COMPONENT_CATALOG);
  }
  const doc = DOCS[key] || (window.COMPONENT_CATALOG && window.COMPONENT_CATALOG[key]) || DOCS['tabs'];
  
  // Sidebar active toggle
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-key') === key);
  });

  // Render Demos
  let demosHtml = '';
  if (doc.demos) {
    doc.demos.forEach((d) => {
      demosHtml += `
        <div class="demo-section">
          <div class="demo-section-header">
            <span class="demo-section-title">${d.title}</span>
          </div>
          <div class="demo-canvas">
            ${d.render}
          </div>
          <div class="code-box">
            <button class="btn-copy" onclick="copyCode(this, \`${d.code.replace(/`/g, '\\`')}\`)">
              <i class="fa-regular fa-copy"></i> Copy GDScript
            </button>
            <pre><code>${escapeHtml(d.code)}</code></pre>
          </div>
        </div>
      `;
    });
  }

  // Render Attributes Table (Props)
  let propsHtml = '';
  if (doc.props) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Attributes (属性列表)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:25%;">属性名 / Attribute</th>
            <th style="width:40%;">说明 / Description</th>
            <th style="width:20%;">类型 / Type</th>
            <th style="width:15%;">默认值 / Default</th>
          </tr>
        </thead>
        <tbody>
          ${doc.props.map(p => `
            <tr>
              <td class="api-prop">${p.name}</td>
              <td>${p.desc}</td>
              <td class="api-type">${p.type}</td>
              <td><code>${p.default}</code></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Events Table
  if (doc.events) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Events & Signals (事件与信号)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">事件名 / Signal Name</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">回调参数 / Parameters</th>
          </tr>
        </thead>
        <tbody>
          ${doc.events.map(e => `
            <tr>
              <td class="api-prop">${e.name}</td>
              <td>${e.desc}</td>
              <td class="api-type">${e.params}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Methods / Exposes Table
  if (doc.methods) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Methods / Exposes (方法名与暴露函数)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">方法名 / Method Name</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">参数及返回值 / Parameters & Return</th>
          </tr>
        </thead>
        <tbody>
          ${doc.methods.map(m => `
            <tr>
              <td class="api-prop">${m.name}</td>
              <td>${m.desc}</td>
              <td class="api-type">${m.params}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Slots Table
  if (doc.slots) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Slots (插槽与节点挂载)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">插槽名 / Slot Name</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">子标签 / Child Node</th>
          </tr>
        </thead>
        <tbody>
          ${doc.slots.map(s => `
            <tr>
              <td class="api-prop">${s.name}</td>
              <td>${s.desc}</td>
              <td class="api-type">${s.child}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Sub-component Attributes Table
  if (doc.paneProps) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">Sub-component Attributes (子组件/子面板属性)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:25%;">属性名 / Attribute</th>
            <th style="width:40%;">说明 / Description</th>
            <th style="width:20%;">类型 / Type</th>
            <th style="width:15%;">默认值 / Default</th>
          </tr>
        </thead>
        <tbody>
          ${doc.paneProps.map(p => `
            <tr>
              <td class="api-prop">${p.name}</td>
              <td>${p.desc}</td>
              <td class="api-type">${p.type}</td>
              <td><code>${p.default}</code></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  document.getElementById('mainContent').innerHTML = `
    <div class="doc-header">
      <h1 class="doc-title">${doc.title}</h1>
      <p class="doc-desc">${doc.desc}</p>
    </div>
    ${demosHtml}
    ${propsHtml}
  `;
};

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.filterNav = function(q) {
  const val = q.toLowerCase();
  document.querySelectorAll('.nav-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(val) ? 'flex' : 'none';
  });
};

// Default initial render on load
document.addEventListener('DOMContentLoaded', () => {
  showDoc('tabs');
});
