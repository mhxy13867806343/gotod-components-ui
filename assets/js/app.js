// =========================================================================
// Gotod Components UI - Main Application Router & Document Engine
// 架构精简版：仅保留路由中枢、文档渲染与主生命周期初始化
// 辅助函数已独立提取至 ui_helpers.js，侧边栏配置已独立提取至 sidebar_nav.js
// =========================================================================

window.currentTopSection = 'components';
window.currentDocKey = 'tabs';

// ==========================================
// Top Navigation Switcher
// ==========================================
window.switchTopSection = function(section, targetDocKey) {
  window.currentSection = section;
  localStorage.setItem('gotod_section', section);

  // Sync Top Select value
  const topSelect = document.getElementById('topSectionSelect');
  if (topSelect && topSelect.value !== section) {
    topSelect.value = section;
  }

  // Render Sidebar and dispatch doc view
  if (typeof window.renderSidebarNav === 'function') {
    window.renderSidebarNav(section, targetDocKey);
  }
};

// ==========================================
// Find which top section a docKey belongs to
// ==========================================
window.findSectionByDocKey = function(docKey) {
  if (!docKey) return 'components';
  if (window.GUIDE_CATALOG && window.GUIDE_CATALOG[docKey]) return 'guide';
  if (window.GAME_CATALOG && window.GAME_CATALOG[docKey]) return 'game';
  if (window.PLAYGROUND_CATALOG && window.PLAYGROUND_CATALOG[docKey]) return 'playground';
  if (window.IMPERATIVE_CATALOG && window.IMPERATIVE_CATALOG[docKey]) return 'imperative';
  if (window.HOOKS_CATALOG && window.HOOKS_CATALOG[docKey]) return 'hooks';
  if (window.SIGNALS_CATALOG && window.SIGNALS_CATALOG[docKey]) return 'signals';
  if (window.DECORATOR_CATALOG && window.DECORATOR_CATALOG[docKey]) return 'decorator';
  if (window.STORAGE_CATALOG && window.STORAGE_CATALOG[docKey]) return 'storage';
  if (window.UTILS_ROUTER_CATALOG && window.UTILS_ROUTER_CATALOG[docKey]) return 'router';
  if (window.LIFECYCLE_CATALOG && window.LIFECYCLE_CATALOG[docKey]) return 'lifecycle';
  if (window.STUDIO_CATALOG && window.STUDIO_CATALOG[docKey]) return 'studio';
  if (window.COMPONENT_CATALOG && window.COMPONENT_CATALOG[docKey]) return 'components';

  const sectionNames = ['guide', 'components', 'game', 'playground', 'imperative', 'hooks', 'signals', 'decorator', 'storage', 'router', 'lifecycle', 'studio'];
  if (sectionNames.includes(docKey)) return docKey;
  return 'components';
};

// ==========================================
// Route from browser address bar URL hash
// ==========================================
window.routeFromHash = function() {
  const hash = window.location.hash.replace(/^#/, '').trim();
  if (!hash) {
    const savedSection = localStorage.getItem('gotod_section') || 'components';
    const savedDocKey = localStorage.getItem('gotod_doc_key') || (savedSection === 'components' ? 'tabs' : null);
    switchTopSection(savedSection, savedDocKey);
    return;
  }

  const sectionNames = ['guide', 'components', 'game', 'playground', 'imperative', 'hooks', 'signals', 'decorator', 'storage', 'router', 'lifecycle', 'studio'];
  if (sectionNames.includes(hash)) {
    switchTopSection(hash);
  } else {
    const targetSection = findSectionByDocKey(hash);
    switchTopSection(targetSection, hash);
  }
};

window.addEventListener('hashchange', () => {
  window.routeFromHash();
});

// ==========================================
// Main Document Renderer Dispatcher
// ==========================================
window.showDoc = function(key) {
  window.currentDocKey = key;
  localStorage.setItem('gotod_doc_key', key);
  
  // Sync URL hash to browser address bar without jarring scrolling
  if (window.location.hash !== '#' + key) {
    history.replaceState(null, '', '#' + key);
  }
  
  // Combine all sources: GUIDE, GAME, PLAYGROUND, IMPERATIVE, HOOKS, SIGNALS, DECORATOR, STORAGE, UTILS_ROUTER, LIFECYCLE, STUDIO, COMPONENT
  const catalog = Object.assign(
    {}, 
    window.GUIDE_CATALOG || {}, 
    window.GAME_CATALOG || {}, 
    window.PLAYGROUND_CATALOG || {}, 
    window.IMPERATIVE_CATALOG || {},
    window.HOOKS_CATALOG || {},
    window.SIGNALS_CATALOG || {},
    window.DECORATOR_CATALOG || {},
    window.STORAGE_CATALOG || {},
    window.UTILS_ROUTER_CATALOG || {},
    window.LIFECYCLE_CATALOG || {},
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
          <button class="g-btn g-btn-default" style="height:26px; padding:0 8px; font-size:11px;" onclick="copyCode(this)">
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

  // Dynamic Workspace Post-Render Hooks
  if (key === 'studio-theme-editor') {
    if (typeof window.refreshStudioCanvas === 'function') setTimeout(window.refreshStudioCanvas, 50);
    if (typeof window.renderStudioInspector === 'function') setTimeout(window.renderStudioInspector, 50);
  } else if (key === 'storage-save-slots') {
    if (typeof window.renderSimSaveSlots === 'function') setTimeout(window.renderSimSaveSlots, 30);
    if (typeof window.updateCurrentGameStatusUI === 'function') setTimeout(window.updateCurrentGameStatusUI, 30);
  } else if (key === 'storage-lifecycle-guardian') {
    if (typeof window.renderSimGuardianConsole === 'function') setTimeout(window.renderSimGuardianConsole, 30);
  } else if (key === 'lifecycle-overview') {
    if (typeof window.renderSimLifecycleUI === 'function') setTimeout(window.renderSimLifecycleUI, 30);
  }
};

// ==========================================
// Default initial render on load
// ==========================================
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

  // 3. Route from URL Hash (or LocalStorage fallback)
  window.routeFromHash();
});
