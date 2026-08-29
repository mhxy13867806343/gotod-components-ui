// ==========================================
// Gotod Components UI - Interactive Docs Engine
// 1. 指南 / 2. 组件库 / 3. 游戏实战案例
// ==========================================

window.currentTopSection = 'components';
window.currentDocKey = 'tabs';

// Global Theme & Mode Manager
window.changePreset = function(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  showToast('Theme preset switched to: ' + preset.toUpperCase() + ' tokens', 'info');
  if (window.currentDocKey) {
    showDoc(window.currentDocKey);
  }
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

// Tabs Dynamic Add & Remove
window.addDynamicTabPane = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabHeaderBox = container.querySelector('.sim-tab-nav-list');
  const panelBox = container.querySelector('.sim-tab-panel-box');
  if (!tabHeaderBox || !panelBox) return;

  const currentCount = tabHeaderBox.querySelectorAll('.sim-tab-header').length + 1;
  const newIndex = currentCount - 1;

  const newTab = document.createElement('div');
  newTab.className = 'sim-tab-header';
  newTab.setAttribute('data-tab-type', 'card');
  newTab.style.cssText = 'color:var(--text-secondary); cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-bottom:1px solid var(--border-base); border-radius:4px 4px 0 0; background:var(--bg-surface); display:inline-flex; align-items:center; gap:8px;';
  newTab.innerHTML = `<span>Tab ${currentCount}</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, '${containerId}');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>`;
  newTab.onclick = () => switchTabDemo(newIndex, containerId);

  const addBtn = tabHeaderBox.querySelector('.sim-tab-add-btn');
  if (addBtn) {
    tabHeaderBox.insertBefore(newTab, addBtn);
  } else {
    tabHeaderBox.appendChild(newTab);
  }

  const newPanel = document.createElement('div');
  newPanel.className = 'sim-tab-panel';
  newPanel.style.cssText = 'display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);';
  newPanel.innerHTML = `<h3>Tab ${currentCount} content</h3><p style="color:var(--text-secondary); margin-top:4px;">This is dynamically created Tab ${currentCount} content.</p>`;
  panelBox.appendChild(newPanel);

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

// Tag Dynamic Add & Remove
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

// Checkbox Check All
window.toggleCheckAll = function(master) {
  const list = document.querySelectorAll('.cb-child');
  list.forEach(cb => cb.checked = master.checked);
  showToast(master.checked ? 'Selected all options' : 'Deselected all options', 'info');
};

// ==========================================
// 1. Guide / 2. Components / 3. Game UI Switcher
// ==========================================
window.switchTopSection = function(section) {
  window.currentTopSection = section;

  // Toggle active state in top navigation
  document.getElementById('topNavGuide').classList.toggle('active', section === 'guide');
  document.getElementById('topNavComponents').classList.toggle('active', section === 'components');
  document.getElementById('topNavGame').classList.toggle('active', section === 'game');
  document.getElementById('topNavPlayground').classList.toggle('active', section === 'playground');
  document.getElementById('topNavStudio').classList.toggle('active', section === 'studio');

  const sidebar = document.getElementById('sidebarNav');
  if (!sidebar) return;

  if (section === 'guide') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search guide..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Development 指南</div>
        <div class="nav-item active" data-key="guide-install" onclick="showDoc('guide-install')"><span>📥 安装与快速上手</span></div>
        <div class="nav-item" data-key="guide-common-methods" onclick="showDoc('guide-common-methods')"><span>🛠️ 全局通用基类方法与事件</span></div>
        <div class="nav-item" data-key="guide-dynamic-api" onclick="showDoc('guide-dynamic-api')"><span>🧩 GTabs 动态方法与自定义信号</span></div>
        <div class="nav-item" data-key="guide-theme" onclick="showDoc('guide-theme')"><span>🎨 主题 Token 与暗黑模式</span></div>
        <div class="nav-item" data-key="guide-autoload" onclick="showDoc('guide-autoload')"><span>⚙️ Autoload 全局服务</span></div>
      </div>
    `;
    showDoc('guide-install');
  } else if (section === 'game') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search game templates..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Game Templates 游戏实战案例</div>
        <div class="nav-item active" data-key="game-character" onclick="showDoc('game-character')"><span>👤 角色状态与装备面板</span></div>
        <div class="nav-item" data-key="game-inventory" onclick="showDoc('game-inventory')"><span>🎒 游戏背包与物品栏</span></div>
        <div class="nav-item" data-key="game-settings" onclick="showDoc('game-settings')"><span>🎮 游戏系统设置中心</span></div>
        <div class="nav-item" data-key="game-quest" onclick="showDoc('game-quest')"><span>📜 任务与剧情日志</span></div>
        <div class="nav-item" data-key="game-shop" onclick="showDoc('game-shop')"><span>🛒 神秘商人道具商城</span></div>
      </div>
    `;
    showDoc('game-character');
  } else if (section === 'playground') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search API playground..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">API Playground 属性与方法实验室</div>
        <div class="nav-item active" data-key="play-tabs" onclick="showDoc('play-tabs')"><span>🧪 GTabs 选项卡演练</span></div>
        <div class="nav-item" data-key="play-button" onclick="showDoc('play-button')"><span>🧪 GButton 按钮演练</span></div>
        <div class="nav-item" data-key="play-input" onclick="showDoc('play-input')"><span>🧪 GInput 输入框演练</span></div>
        <div class="nav-item" data-key="play-progress" onclick="showDoc('play-progress')"><span>🧪 GProgress 进度条演练</span></div>
        <div class="nav-item" data-key="play-dialog" onclick="showDoc('play-dialog')"><span>🧪 GDialog 弹窗演练</span></div>
      </div>
    `;
    showDoc('play-tabs');
  } else if (section === 'studio') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search resource studio..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Godot 4 .tres 资源与主题工坊</div>
        <div class="nav-item active" data-key="studio-theme-editor" onclick="showDoc('studio-theme-editor')"><span>🎨 Godot 4 官方主题编辑器 & .tres 导出</span></div>
        <div class="nav-item" data-key="studio-custom-resource" onclick="showDoc('studio-custom-resource')"><span>💾 自定义 Resource 数据资源 (.tres)</span></div>
      </div>
    `;
    showDoc('studio-theme-editor');
  } else {
    // Components
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search components..." oninput="filterNav(this.value)">
      
      <div class="nav-group">
        <div class="nav-group-title">General 基础</div>
        <div class="nav-item" data-key="button" onclick="showDoc('button')"><span>GButton 按钮</span></div>
        <div class="nav-item" data-key="text" onclick="showDoc('text')"><span>GText / GTitle 文本</span></div>
        <div class="nav-item" data-key="divider" onclick="showDoc('divider')"><span>GDivider 分割线</span></div>
        <div class="nav-item" data-key="icon" onclick="showDoc('icon')"><span>GIcon 图标</span></div>
      </div>

      <div class="nav-group">
        <div class="nav-group-title">Form 表单</div>
        <div class="nav-item" data-key="input" onclick="showDoc('input')"><span>GInput 输入框</span></div>
        <div class="nav-item" data-key="textarea" onclick="showDoc('textarea')"><span>GTextarea 文本域</span></div>
        <div class="nav-item" data-key="input-number" onclick="showDoc('input-number')"><span>GInputNumber 数字输入</span></div>
        <div class="nav-item" data-key="switch" onclick="showDoc('switch')"><span>GSwitch 开关</span></div>
        <div class="nav-item" data-key="checkbox" onclick="showDoc('checkbox')"><span>GCheckbox 多选框</span></div>
        <div class="nav-item" data-key="radio" onclick="showDoc('radio')"><span>GRadio 单选框</span></div>
        <div class="nav-item" data-key="select" onclick="showDoc('select')"><span>GSelect 下拉选择</span></div>
        <div class="nav-item" data-key="slider" onclick="showDoc('slider')"><span>GSlider 滑块</span></div>
        <div class="nav-item" data-key="form" onclick="showDoc('form')"><span>GForm 表单布局</span></div>
      </div>

      <div class="nav-group">
        <div class="nav-group-title">Feedback 反馈</div>
        <div class="nav-item" data-key="dialog" onclick="showDoc('dialog')"><span>GDialog / GModal 弹窗</span></div>
        <div class="nav-item" data-key="message" onclick="showDoc('message')"><span>GMessage 全局提示</span></div>
        <div class="nav-item" data-key="alert" onclick="showDoc('alert')"><span>GAlert 警告提示</span></div>
        <div class="nav-item" data-key="drawer" onclick="showDoc('drawer')"><span>GDrawer 抽屉</span></div>
        <div class="nav-item" data-key="tooltip" onclick="showDoc('tooltip')"><span>GTooltip 悬浮提示</span></div>
        <div class="nav-item" data-key="loading" onclick="showDoc('loading')"><span>GLoading 加载指示器</span></div>
      </div>

      <div class="nav-group">
        <div class="nav-group-title">Data Display 数据</div>
        <div class="nav-item" data-key="card" onclick="showDoc('card')"><span>GCard 卡片</span></div>
        <div class="nav-item" data-key="tag" onclick="showDoc('tag')"><span>GTag 标签</span></div>
        <div class="nav-item" data-key="badge" onclick="showDoc('badge')"><span>GBadge 徽标</span></div>
        <div class="nav-item" data-key="avatar" onclick="showDoc('avatar')"><span>GAvatar 头像</span></div>
        <div class="nav-item" data-key="progress" onclick="showDoc('progress')"><span>GProgress 进度条</span></div>
        <div class="nav-item active" data-key="tabs" onclick="showDoc('tabs')"><span>GTabs 标签页</span></div>
        <div class="nav-item" data-key="collapse" onclick="showDoc('collapse')"><span>GCollapse 折叠面板</span></div>
        <div class="nav-item" data-key="steps" onclick="showDoc('steps')"><span>GSteps 步骤条</span></div>
        <div class="nav-item" data-key="space" onclick="showDoc('space')"><span>GSpace 间距布局</span></div>
      </div>
    `;
    showDoc('tabs');
  }
};

// ==========================================
// Main Render Dispatcher
// ==========================================
window.showDoc = function(key) {
  window.currentDocKey = key;
  
  // Combine all sources: GUIDE, GAME, PLAYGROUND, STUDIO, COMPONENT
  const catalog = Object.assign(
    {}, 
    window.GUIDE_CATALOG || {}, 
    window.GAME_CATALOG || {}, 
    window.PLAYGROUND_CATALOG || {}, 
    window.STUDIO_CATALOG || {}, 
    window.COMPONENT_CATALOG || {}
  );

  const doc = catalog[key] || catalog['tabs'] || {
    title: key,
    desc: 'Document Details',
    demos: [],
    props: [],
    events: [],
    methods: [],
    slots: []
  };
  
  // Sidebar active toggle
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-key') === key);
  });

  // Render Demos
  let demosHtml = '';
  if (doc.demos && doc.demos.length > 0) {
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
  if (doc.props && doc.props.length > 0) {
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
  if (doc.events && doc.events.length > 0) {
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

  // Render Methods Table
  if (doc.methods && doc.methods.length > 0) {
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

  // Render Common Control Base Methods Table for all UI components
  if (window.COMMON_CONTROL_METHODS && window.currentTopSection === 'components' && doc.props) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">Universal Methods (全部组件共用通用基类方法)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">通用方法名 / Common Method</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">参数及返回值 / Parameters & Return</th>
          </tr>
        </thead>
        <tbody>
          ${window.COMMON_CONTROL_METHODS.map(m => `
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
  if (doc.slots && doc.slots.length > 0) {
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
  if (doc.paneProps && doc.paneProps.length > 0) {
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

  if (key === 'studio-theme-editor') {
    if (typeof window.refreshStudioCanvas === 'function') setTimeout(window.refreshStudioCanvas, 50);
    if (typeof window.renderStudioInspector === 'function') setTimeout(window.renderStudioInspector, 50);
  }
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
  switchTopSection('components');
});
