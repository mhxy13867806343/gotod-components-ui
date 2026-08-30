// =========================================================================
// Gotod Components UI - Main Application Router & Document Engine
// 架构精简版：仅保留路由中枢、文档渲染与主生命周期初始化
// 辅助函数已独立提取至 ui_helpers.js，侧边栏配置已独立提取至 sidebar_nav.js
// =========================================================================

window.currentTopSection = 'components';
window.currentDocKey = 'button';

// ==========================================
// Top Navigation Switcher
// ==========================================
window.switchTopSection = function(section, targetDocKey) {
  window.currentSection = section;
  window.StorageUtil.setSection(section);

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
  if (window.GODOT_GLOBALS_CATALOG && window.GODOT_GLOBALS_CATALOG[docKey]) return 'godot-globals';
  if (window.NETWORKING_PHYSICS_CATALOG && window.NETWORKING_PHYSICS_CATALOG[docKey]) return 'networking';
  if (window.COMPONENT_CATALOG && window.COMPONENT_CATALOG[docKey]) return 'components';

  const sections = window.SECTION_KEYS || [];
  if (sections.includes(docKey)) return docKey;
  return 'components';
};

// ==========================================
// Route from browser address bar URL hash
// ==========================================
window.routeFromHash = function() {
  const hash = window.location.hash.replace(/^#/, '').trim();
  if (!hash) {
    const savedSection = window.StorageUtil.getSection();
    const savedDocKey = window.StorageUtil.getDocKey() || (savedSection === 'components' ? 'button' : null);
    switchTopSection(savedSection, savedDocKey);
    return;
  }

  const sections = window.SECTION_KEYS || [];
  if (sections.includes(hash)) {
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
  window.StorageUtil.setDocKey(key);
  
  // Sync URL hash to browser address bar without jarring scrolling
  if (window.location.hash !== '#' + key) {
    history.replaceState(null, '', '#' + key);
  }
  
  // Combine all catalog sources
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
    window.GODOT_GLOBALS_CATALOG || {},
    window.NETWORKING_PHYSICS_CATALOG || {},
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

  // Common Header Definitions for Tables
  const propHeaders = [
    { title: '属性名 / Attribute', width: '25%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '40%', key: 'desc' },
    { title: '类型 / Type', width: '20%', key: 'type', className: 'api-type' },
    { title: '默认值 / Default', width: '15%', key: 'default', isCode: true }
  ];

  const methodHeaders = [
    { title: '方法名 / Method', width: '30%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '45%', key: 'desc' },
    { title: '参数 / Parameters', width: '25%', key: 'params', className: 'api-type' }
  ];

  const eventHeaders = [
    { title: '信号名 / Event Name', width: '30%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '45%', key: 'desc' },
    { title: '参数 / Parameters', width: '25%', key: 'params', className: 'api-type' }
  ];

  const slotHeaders = [
    { title: '插槽名 / Slot Name', width: '30%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '45%', key: 'desc' },
    { title: '子标签 / Child Node', width: '25%', key: 'child', className: 'api-type' }
  ];

  const compName = (doc.title || '').split(' ')[0];
  let propsHtml = '';

  // 1. Attributes Table
  propsHtml += renderApiTable(`${compName} Attributes (属性)`, propHeaders, doc.props);

  // 2. Specific Methods Table
  propsHtml += renderApiTable(`${compName} Specific Methods (组件专属外部方法)`, methodHeaders, doc.methods);

  // 3. Events Table
  propsHtml += renderApiTable(`${compName} Events / Signals (自定义信号)`, eventHeaders, doc.events);

  // 4. Slots Table
  propsHtml += renderApiTable(`${compName} Slots (插槽与节点挂载)`, slotHeaders, doc.slots);

  // 5. Sub-component Attributes Table
  propsHtml += renderApiTable('Sub-component Attributes (子组件/子面板属性)', propHeaders, doc.paneProps);

  // 6. Control/Node Base Methods Table (ONLY rendered on dedicated common methods / godot globals pages)
  if (key === 'guide-common-methods' && window.COMMON_CONTROL_METHODS) {
    propsHtml += renderApiTable(
      'Control & Node Base Methods (全局通用基类方法全览)',
      [
        { title: '通用方法名 / Method', width: '30%', key: 'name', className: 'api-prop' },
        { title: '功能说明 / Description', width: '45%', key: 'desc' },
        { title: '参数与返回值 / Signature', width: '25%', key: 'params', className: 'api-type' }
      ],
      window.COMMON_CONTROL_METHODS,
      '所有 UI 控件均继承自 Godot 4 官方 Control / Node 基类，可直接调用以下 14 个核心通用方法：'
    );
  } else if (!['guide-', 'game-', 'play-', 'studio-', 'imp-', 'godot-'].some(p => key.startsWith(p))) {
    // Elegant tip on component pages
    propsHtml += `
      <div style="margin-top: 32px; padding: 14px 18px; background: var(--bg-surface); border: 1px solid var(--border-base); border-radius: var(--radius); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
        <div style="font-size: 13px; color: var(--text-regular);">
          💡 <b>基类通用方法提示</b>：本组件天然继承 Godot 4 官方 <code style="color:var(--primary); font-family:var(--font-mono);">Control</code> / <code style="color:var(--primary); font-family:var(--font-mono);">Node</code> 基类全部能力（包括 <code style="color:var(--primary); font-family:var(--font-mono);">add_child()</code>, <code style="color:var(--primary); font-family:var(--font-mono);">queue_free()</code>, <code style="color:var(--primary); font-family:var(--font-mono);">create_tween()</code>, <code style="color:var(--primary); font-family:var(--font-mono);">show()</code> 等）。
        </div>
        <button class="g-btn g-btn-default" style="height: 28px; padding: 0 12px; font-size: 12px; white-space: nowrap;" onclick="showDoc('godot-globals')">
          查阅全局与基类方法速查 →
        </button>
      </div>
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
  // 1. Restore Theme & Preset using unified helpers
  window.syncThemeDOM(window.StorageUtil.getTheme());
  window.syncPresetDOM(window.StorageUtil.getPreset());

  // 2. Route from URL Hash (or LocalStorage fallback)
  window.routeFromHash();
});
