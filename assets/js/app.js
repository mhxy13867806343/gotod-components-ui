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

  // Sync Flyout item active states
  document.querySelectorAll('.jd-flyout-item').forEach(item => {
    const isThis = item.getAttribute('onclick') && item.getAttribute('onclick').includes(`'${section}'`);
    item.classList.toggle('active', !!isThis);
  });

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
  if (docKey.startsWith('changelog-') || docKey === 'changelog') return 'changelog';
  if (window.GUIDE_CATALOG && window.GUIDE_CATALOG[docKey]) return 'guide';
  if (docKey === 'icon') return 'icons-gallery';
  if (window.SLOTS_CATALOG && window.SLOTS_CATALOG[docKey]) return 'slots';
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

  // Ensure scroll is immediately reset to the top of the page
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const mainScrollContainer = document.getElementById('mainContent');
  if (mainScrollContainer) {
    mainScrollContainer.scrollTop = 0;
  }

  // Handle Changelog Page Rendering (Using GSteps Component)
  if (key.startsWith('changelog-') || key === 'changelog') {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-key') === key);
    });
    if (typeof window.renderChangelogPage === 'function') {
      window.renderChangelogPage(key);
    }
    return;
  }
  
  // Combine all catalog sources
  const catalog = Object.assign(
    {}, 
    window.GUIDE_CATALOG || {}, 
    window.SLOTS_CATALOG || {}, 
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
    demosHtml = doc.demos.map((d, idx) => {
      let codeSection = '';
      if (d.codeTabs && Array.isArray(d.codeTabs)) {
        const curLang = window.currentCodeLang || 'gdscript';
        const tabBtns = d.codeTabs.map((t, tIdx) => `
          <button class="code-tab-btn ${t.type === 'before' ? 'tab-before' : 'tab-after'} ${tIdx === 0 ? 'active' : ''}" onclick="switchCodeTab(this, ${tIdx})">
            ${t.type === 'before' ? '<i class="fa-solid fa-triangle-exclamation"></i>' : '<i class="fa-solid fa-wand-magic-sparkles"></i>'}
            ${t.title}
          </button>
        `).join('');

        const tabPanels = d.codeTabs.map((t, tIdx) => {
          const gdCode = (typeof window.cleanPureGodotCode === 'function') ? window.cleanPureGodotCode(t.code) : t.code;
          const csCode = t.codeCSharp || t.csharpCode || (typeof window.convertGDScriptToCSharp === 'function' ? window.convertGDScriptToCSharp(t.code) : gdCode);
          return `
            <div class="code-tab-panel ${tIdx === 0 ? 'active' : ''}" data-index="${tIdx}">
              ${t.desc ? `<div class="code-diff-tip"><i class="fa-solid fa-circle-info" style="color:var(--primary);"></i> <span>${t.desc}</span></div>` : ''}
              <div class="code-panel-gdscript" style="${curLang === 'gdscript' ? 'display:block;' : 'display:none;'}">
                <div class="code-box" style="${t.type === 'before' ? 'background:#1a1418;' : ''}">
                  <pre><code style="${t.type === 'before' ? 'color:#fca5a5;' : ''}">${escapeHtml(gdCode)}</code></pre>
                </div>
              </div>
              <div class="code-panel-csharp" style="${curLang === 'csharp' ? 'display:block;' : 'display:none;'}">
                <div class="code-box" style="${t.type === 'before' ? 'background:#1f131a;' : 'background:#0f172a;'}">
                  <pre><code style="${t.type === 'before' ? 'color:#fca5a5;' : 'color:#93c5fd;'}">${escapeHtml(csCode)}</code></pre>
                </div>
              </div>
            </div>
          `;
        }).join('');

        codeSection = `
          <div class="code-tab-container">
            <div class="code-tab-bar">
              <div class="code-tab-buttons">${tabBtns}</div>
            </div>
            ${tabPanels}
          </div>
        `;
      } else if (d.codeBefore && d.code) {
        const curLang = window.currentCodeLang || 'gdscript';
        const gdCodeAfter = (typeof window.cleanPureGodotCode === 'function') ? window.cleanPureGodotCode(d.code) : d.code;
        const csCodeAfter = d.codeCSharp || (typeof window.convertGDScriptToCSharp === 'function' ? window.convertGDScriptToCSharp(d.code) : gdCodeAfter);

        const gdCodeBefore = (typeof window.cleanPureGodotCode === 'function') ? window.cleanPureGodotCode(d.codeBefore) : d.codeBefore;
        const csCodeBefore = (typeof window.convertGDScriptToCSharp === 'function' ? window.convertGDScriptToCSharp(d.codeBefore) : gdCodeBefore);

        codeSection = `
          <div class="code-tab-container">
            <div class="code-tab-bar">
              <div class="code-tab-buttons">
                <button class="code-tab-btn tab-after active" onclick="switchCodeTab(this, 0)">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ 修复后代码 (After / Fixed)
                </button>
                <button class="code-tab-btn tab-before" onclick="switchCodeTab(this, 1)">
                  <i class="fa-solid fa-triangle-exclamation"></i> ❌ 修复前代码 (Before / Problematic)
                </button>
              </div>
            </div>
            ${d.diffTip ? `<div class="code-diff-tip"><i class="fa-solid fa-circle-info" style="color:var(--primary);"></i> <span>${d.diffTip}</span></div>` : ''}
            <div class="code-tab-panel active" data-index="0">
              <div class="code-panel-gdscript" style="${curLang === 'gdscript' ? 'display:block;' : 'display:none;'}">
                <div class="code-box">
                  <pre><code>${escapeHtml(gdCodeAfter)}</code></pre>
                </div>
              </div>
              <div class="code-panel-csharp" style="${curLang === 'csharp' ? 'display:block;' : 'display:none;'}">
                <div class="code-box" style="background:#0f172a;">
                  <pre><code style="color:#93c5fd;">${escapeHtml(csCodeAfter)}</code></pre>
                </div>
              </div>
            </div>
            <div class="code-tab-panel" data-index="1">
              <div class="code-panel-gdscript" style="${curLang === 'gdscript' ? 'display:block;' : 'display:none;'}">
                <div class="code-box" style="background:#1a1418;">
                  <pre><code style="color:#fca5a5;">${escapeHtml(gdCodeBefore)}</code></pre>
                </div>
              </div>
              <div class="code-panel-csharp" style="${curLang === 'csharp' ? 'display:block;' : 'display:none;'}">
                <div class="code-box" style="background:#1f131a;">
                  <pre><code style="color:#fca5a5;">${escapeHtml(csCodeBefore)}</code></pre>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (d.code) {
        const curLang = window.currentCodeLang || 'gdscript';
        const gdCode = (typeof window.cleanPureGodotCode === 'function') ? window.cleanPureGodotCode(d.code) : d.code;
        const csCode = d.codeCSharp || d.csharpCode || (typeof window.convertGDScriptToCSharp === 'function' ? window.convertGDScriptToCSharp(d.code) : gdCode);

        codeSection = `
          <div class="code-panel-gdscript" style="${curLang === 'gdscript' ? 'display:block;' : 'display:none;'}">
            <div class="code-box">
              <pre><code class="language-gdscript">${escapeHtml(gdCode)}</code></pre>
            </div>
          </div>
          <div class="code-panel-csharp" style="${curLang === 'csharp' ? 'display:block;' : 'display:none;'}">
            <div class="code-box" style="background:#0f172a;">
              <pre><code class="language-csharp" style="color:#93c5fd;">${escapeHtml(csCode)}</code></pre>
            </div>
          </div>
        `;
      }

      const vStr = d.version || d.since || (idx >= 2 ? 'v1.0.5' : 'v1.0.0');
      const isNew = String(vStr).includes('1.0.5');
      const vBadge = `<span class="g-tag ${isNew ? 'g-tag-success' : 'g-tag-primary'}" style="font-size:10px; padding:2px 7px; margin-left:8px; border-radius:10px; font-weight:700; vertical-align:middle;">${vStr}</span>`;
      const curLang = window.currentCodeLang || 'gdscript';

      return `
        <div class="demo-card">
          <div class="demo-card-header">
            <div class="demo-card-title">${d.title} ${vBadge}</div>
          </div>
          <div class="demo-card-body">
            ${d.render}
          </div>
          ${codeSection ? `
            <div class="demo-toolbar" style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:8px 16px; border-top:1px solid var(--border-base); background:var(--bg-card); box-sizing:border-box;">
              <!-- Element Plus Style Language Switcher Tabs -->
              <div class="code-lang-tabs" style="display:flex; align-items:center; gap:6px;">
                <button class="g-lang-btn" data-lang="gdscript" onclick="window.switchCodeLanguage('gdscript', this)" style="padding:2px 8px; font-size:11px; font-weight:700; border-radius:4px; border:1px solid ${curLang === 'gdscript' ? 'var(--primary)' : 'var(--border-base)'}; background:${curLang === 'gdscript' ? 'var(--primary)' : 'transparent'}; color:${curLang === 'gdscript' ? '#fff' : 'var(--text-secondary)'}; cursor:pointer; transition:all 0.2s;">
                  GDScript
                </button>
                <button class="g-lang-btn" data-lang="csharp" onclick="window.switchCodeLanguage('csharp', this)" style="padding:2px 8px; font-size:11px; font-weight:700; border-radius:4px; border:1px solid ${curLang === 'csharp' ? 'var(--primary)' : 'var(--border-base)'}; background:${curLang === 'csharp' ? 'var(--primary)' : 'transparent'}; color:${curLang === 'csharp' ? '#fff' : 'var(--text-secondary)'}; cursor:pointer; transition:all 0.2s;">
                  C# (.NET)
                </button>
              </div>
              <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
                <a href="${(typeof window.getComponentGitHubUrl === 'function') ? window.getComponentGitHubUrl(key) : 'https://github.com/mhxy13867806343/gotod-components-ui'}" target="_blank" class="g-demo-icon-btn" title="在 GitHub 中查看【${(typeof item !== 'undefined' && item && item.title) ? item.title : key}】组件源码" style="color:var(--text-secondary); text-decoration:none; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:var(--radius); font-size:14px; cursor:pointer;">
                  <i class="fa-brands fa-github"></i>
                </a>
                <button class="g-demo-icon-btn" title="复制代码" onclick="window.copyDemoCodeFromCard(this)" style="color:var(--text-secondary); background:transparent; border:none; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:var(--radius); font-size:13px; cursor:pointer;">
                  <i class="fa-regular fa-copy"></i>
                </button>
                <button class="g-demo-icon-btn toggle-code-btn" title="展开/折叠源代码" onclick="window.toggleDemoSourceCode(this)" style="color:var(--text-secondary); background:transparent; border:none; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:var(--radius); font-size:13px; cursor:pointer;">
                  <i class="fa-solid fa-code"></i>
                </button>
              </div>
            </div>
            <div class="demo-source-wrapper" style="display:none; border-top:1px solid var(--border-base);">
              ${codeSection}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // Common Header Definitions for Tables with Dedicated Version Column
  const propHeaders = [
    { title: '属性名 / Attribute', width: '22%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '36%', key: 'desc' },
    { title: '类型 / Type', width: '18%', key: 'type', className: 'api-type' },
    { title: '默认值 / Default', width: '12%', key: 'default', isCode: true },
    { title: '版本 / Version', width: '12%', key: 'version', className: 'api-type' }
  ];

  const methodHeaders = [
    { title: '方法名 / Method', width: '28%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '38%', key: 'desc' },
    { title: '参数 / Parameters', width: '22%', key: 'params', className: 'api-type' },
    { title: '版本 / Version', width: '12%', key: 'version', className: 'api-type' }
  ];

  const eventHeaders = [
    { title: '信号名 / Event Name', width: '28%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '38%', key: 'desc' },
    { title: '参数 / Parameters', width: '22%', key: 'params', className: 'api-type' },
    { title: '版本 / Version', width: '12%', key: 'version', className: 'api-type' }
  ];

  const slotHeaders = [
    { title: '插槽名 / Slot Name', width: '16%', key: 'name', className: 'api-prop' },
    { title: '说明 / Description', width: '28%', key: 'desc' },
    { title: '子标签 / Child Node', width: '16%', key: 'child', className: 'api-type' },
    { title: '用法示例 / Example (Vue 模板 & GDScript)', width: '28%', key: 'example', isCode: true },
    { title: '版本 / Version', width: '12%', key: 'version', className: 'api-type' }
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

  const docBadge = (doc.version || doc.since) ? `<span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 8px; margin-left:10px; border-radius:10px; font-weight:600; vertical-align:middle;">${doc.version || doc.since}</span>` : `<span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 8px; margin-left:10px; border-radius:10px; font-weight:600; vertical-align:middle;">v1.0.5</span>`;

  const mainContentEl = document.getElementById('mainContent');
  if (mainContentEl) {
    mainContentEl.innerHTML = `
      <div class="doc-header">
        <h1 class="doc-title">${doc.title} ${docBadge}</h1>
        <p class="doc-desc">${doc.desc}</p>
      </div>
      ${demosHtml}
      ${propsHtml}
    `;
    mainContentEl.scrollTop = 0;
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

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
  } else if (key === 'select') {
    if (typeof window.initSelectDemos === 'function') setTimeout(window.initSelectDemos, 30);
  } else if (key === 'icon') {
    if (typeof window.initIconGallery === 'function') setTimeout(window.initIconGallery, 30);
  } else if (key === 'virtual-list') {
    const c = document.getElementById('vListContainer');
    if (c && typeof window.onVListScroll === 'function') setTimeout(() => window.onVListScroll(c), 30);
  } else if (key === 'table') {
    const c = document.getElementById('tableV2Container');
    if (c && typeof window.onTableV2Scroll === 'function') setTimeout(() => window.onTableV2Scroll(c), 30);
  } else if (key === 'particle-studio') {
    if (typeof window.initParticleStudio === 'function') setTimeout(window.initParticleStudio, 30);
  } else if (key === 'skeleton-particle') {
    if (typeof window.initSkeletonDemo === 'function') setTimeout(window.initSkeletonDemo, 30);
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
