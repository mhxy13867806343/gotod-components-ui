// ==========================================
// Gotod Components UI - Interactive Docs Engine
// ==========================================

window.currentTopSection = 'components';
window.currentDocKey = 'tabs';

// Global Theme & Mode Manager with LocalStorage Persistence
window.changePreset = function(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  localStorage.setItem('gotod_preset', preset);
  const selectElem = document.getElementById('presetSelect');
  if (selectElem && selectElem.value !== preset) selectElem.value = preset;
  
  showToast('Theme preset switched to: ' + preset.toUpperCase() + ' tokens', 'info');
  if (window.currentDocKey) {
    showDoc(window.currentDocKey);
  }
};

window.toggleTheme = function() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gotod_theme', next);
  
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (icon) icon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  if (text) text.innerText = next === 'dark' ? 'Dark' : 'Light';
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

// Simulated Interactive Component Helpers
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

// ==========================================
// Top Navigation Switcher (Guide / Components / Game / Playground / Imperative / Studio)
// ==========================================
window.switchTopSection = function(section) {
  window.currentTopSection = section;
  localStorage.setItem('gotod_section', section);

  // Toggle active state in top navigation links
  const gLink = document.getElementById('topNavGuide');
  const cLink = document.getElementById('topNavComponents');
  const gaLink = document.getElementById('topNavGame');
  const pLink = document.getElementById('topNavPlayground');
  const iLink = document.getElementById('topNavImperative');
  const sLink = document.getElementById('topNavStudio');

  if (gLink) gLink.classList.toggle('active', section === 'guide');
  if (cLink) cLink.classList.toggle('active', section === 'components');
  if (gaLink) gaLink.classList.toggle('active', section === 'game');
  if (pLink) pLink.classList.toggle('active', section === 'playground');
  if (iLink) iLink.classList.toggle('active', section === 'imperative');
  if (sLink) sLink.classList.toggle('active', section === 'studio');

  const topSelect = document.getElementById('topSectionSelect');
  if (topSelect && topSelect.value !== section) {
    topSelect.value = section;
  }

  const sidebar = document.getElementById('sidebarNav');
  if (!sidebar) return;

  if (section === 'guide') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search guide..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Development 指南</div>
        <div class="nav-item active" data-key="guide-install" onclick="showDoc('guide-install')"><span>📥 安装与快速上手</span></div>
        <div class="nav-item" data-key="guide-imperative-api" onclick="showDoc('guide-imperative-api')"><span>⚡ 命令式调用与上下文继承</span></div>
        <div class="nav-item" data-key="guide-treeshaking" onclick="showDoc('guide-treeshaking')"><span>📦 生产环境按需打包与摇树优化</span></div>
        <div class="nav-item" data-key="guide-common-methods" onclick="showDoc('guide-common-methods')"><span>🛠️ 全局通用基类方法与事件</span></div>
        <div class="nav-item" data-key="guide-dynamic-api" onclick="showDoc('guide-dynamic-api')"><span>🧩 GTabs 动态方法与自定义信号</span></div>
        <div class="nav-item" data-key="guide-theme" onclick="showDoc('guide-theme')"><span>🎨 主题 Token 与暗黑模式</span></div>
        <div class="nav-item" data-key="guide-autoload" onclick="showDoc('guide-autoload')"><span>⚙️ Autoload 全局服务</span></div>
      </div>
    `;
    showDoc('guide-install');
  } else if (section === 'imperative') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search imperative API..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Imperative API 编程式静态调用</div>
        <div class="nav-item active" data-key="imp-message" onclick="showDoc('imp-message')"><span>💬 GMessage 全局消息与 close_all</span></div>
        <div class="nav-item" data-key="imp-message-box" onclick="showDoc('imp-message-box')"><span>📦 GMessageBox 命令式弹窗</span></div>
        <div class="nav-item" data-key="imp-loading" onclick="showDoc('imp-loading')"><span>⏳ GLoading 遮罩加载服务</span></div>
        <div class="nav-item" data-key="imp-notification" onclick="showDoc('imp-notification')"><span>🔔 GNotification 四角通知气泡</span></div>
      </div>
    `;
    showDoc('imp-message');
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
  } else if (section === 'hooks') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search hooks..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Vue-Style Hooks 响应式钩子</div>
        <div class="nav-item active" data-key="hook-cooldown" onclick="showDoc('hook-cooldown')"><span>⏳ useCooldown 技能冷却</span></div>
        <div class="nav-item" data-key="hook-form" onclick="showDoc('hook-form')"><span>📝 useForm 表单响应式校验</span></div>
        <div class="nav-item" data-key="hook-pagination" onclick="showDoc('hook-pagination')"><span>📑 usePagination 列表分页器</span></div>
        <div class="nav-item" data-key="hook-dialog" onclick="showDoc('hook-dialog')"><span>🪟 useDialog 组合式弹窗</span></div>
      </div>
    `;
    showDoc('hook-cooldown');
  } else if (section === 'signals') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search signals & events..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Class-Based 信号与事件总线</div>
        <div class="nav-item active" data-key="signal-event-bus" onclick="showDoc('signal-event-bus')"><span>⚡ GEventBus 类化全局事件总线</span></div>
        <div class="nav-item" data-key="signal-custom-class" onclick="showDoc('signal-custom-class')"><span>📡 GCustomSignal 动态信号对象</span></div>
      </div>
    `;
    showDoc('signal-event-bus');
  } else if (section === 'decorator') {
    sidebar.innerHTML = `
      <input type="text" class="nav-search" placeholder="Search decorators..." oninput="filterNav(this.value)">
      <div class="nav-group">
        <div class="nav-group-title">Decorator 装饰器设计模式</div>
        <div class="nav-item active" data-key="decorator-weapon" onclick="showDoc('decorator-weapon')"><span>🛡️ 武器多重附魔装饰器</span></div>
        <div class="nav-item" data-key="decorator-ui" onclick="showDoc('decorator-ui')"><span>🎨 UI 控件能力装饰器</span></div>
      </div>
    `;
    showDoc('decorator-weapon');
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
  localStorage.setItem('gotod_doc_key', key);
  
  // Combine all sources: GUIDE, GAME, PLAYGROUND, IMPERATIVE, HOOKS, SIGNALS, DECORATOR, STUDIO, COMPONENT
  const catalog = Object.assign(
    {}, 
    window.GUIDE_CATALOG || {}, 
    window.GAME_CATALOG || {}, 
    window.PLAYGROUND_CATALOG || {}, 
    window.IMPERATIVE_CATALOG || {},
    window.HOOKS_CATALOG || {},
    window.SIGNALS_CATALOG || {},
    window.DECORATOR_CATALOG || {},
    window.STUDIO_CATALOG || {}, 
    window.COMPONENT_CATALOG || {}
  );

  const doc = catalog[key];
  if (!doc) return;

  // Update active item in sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-key') === key);
  });

  // Render Demos
  let demosHtml = '';
  if (doc.demos && doc.demos.length > 0) {
    demosHtml = doc.demos.map((d, idx) => `
      <div class="demo-card">
        <div class="demo-card-header">
          <div class="demo-card-title">${d.title}</div>
          <button class="g-btn g-btn-default" style="height:26px; padding:0 8px; font-size:11px;" onclick="copyCode(this, \`${escapeHtml(d.code || '')}\`)">
            <i class="fa-regular fa-copy"></i> 复制代码
          </button>
        </div>
        <div class="demo-card-body">
          ${d.render}
        </div>
        ${d.code ? `
          <div class="code-box">
            <pre><code>${escapeHtml(d.code)}</code></pre>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Render Props Table
  let propsHtml = '';
  if (doc.props && doc.props.length > 0) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Attributes (属性)</h3>
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

  // Render Universal Control/Node Common Methods Table
  if (window.COMMON_CONTROL_METHODS && window.COMMON_CONTROL_METHODS.length > 0 && !key.startsWith('guide-') && !key.startsWith('game-') && !key.startsWith('play-') && !key.startsWith('studio-') && !key.startsWith('imp-')) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">Control & Node Base Methods (全局通用基类方法)</h3>
      <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">所有 UI 控件均继承自 Godot 4 官方 Control / Node 基类，可直接调用以下 14 个核心通用方法：</p>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">通用方法名 / Method</th>
            <th style="width:45%;">功能说明 / Description</th>
            <th style="width:25%;">参数与返回值 / Signature</th>
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

  // Render Component Specific Methods Table
  if (doc.methods && doc.methods.length > 0) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Specific Methods (组件专属外部方法)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">方法名 / Method</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">参数 / Parameters</th>
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

  // Render Events Table
  if (doc.events && doc.events.length > 0) {
    propsHtml += `
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${doc.title.split(' ')[0]} Events / Signals (自定义信号)</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th style="width:30%;">信号名 / Event Name</th>
            <th style="width:45%;">说明 / Description</th>
            <th style="width:25%;">参数 / Parameters</th>
          </tr>
        </thead>
        <tbody>
          ${doc.events.map(m => `
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

// Default initial render on load with complete LocalStorage state restoration
document.addEventListener('DOMContentLoaded', () => {
  // 1. Restore Theme Mode (dark / light)
  const savedTheme = localStorage.getItem('gotod_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (icon) icon.className = savedTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  if (text) text.innerText = savedTheme === 'dark' ? 'Dark' : 'Light';

  // 2. Restore Preset (naive / element / ant / vant)
  const savedPreset = localStorage.getItem('gotod_preset') || 'naive';
  document.documentElement.setAttribute('data-preset', savedPreset);
  const presetSelect = document.getElementById('presetSelect');
  if (presetSelect) presetSelect.value = savedPreset;

  // 3. Restore Section & Doc Key
  const savedSection = localStorage.getItem('gotod_section') || 'components';
  const savedDocKey = localStorage.getItem('gotod_doc_key');
  
  const topSelect = document.getElementById('topSectionSelect');
  if (topSelect) topSelect.value = savedSection;

  switchTopSection(savedSection);
  if (savedDocKey) {
    setTimeout(() => showDoc(savedDocKey), 10);
  }
});
