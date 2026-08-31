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
  const t = theme || window.StorageUtil.getTheme() || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  const btn = document.getElementById('themeModeBtn');
  if (icon) icon.className = t === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  if (btn) {
    const i = btn.querySelector('i');
    if (i) i.className = t === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
  if (text) text.innerText = t === 'dark' ? 'Dark' : 'Light';
};

window.syncPresetDOM = function(preset) {
  const p = preset || window.StorageUtil.getPreset() || 'naive';
  document.documentElement.setAttribute('data-preset', p);
  const selectElem = document.getElementById('presetSelect') || document.getElementById('themeSelect');
  if (selectElem && selectElem.value !== p) selectElem.value = p;
};

window.changePreset = function(preset) {
  window.StorageUtil.setPreset(preset);
  window.syncPresetDOM(preset);
  if (window.showToast) window.showToast('主题风格已切换至: ' + preset.toUpperCase(), 'info');
  if (window.currentDocKey && typeof window.showDoc === 'function') {
    window.showDoc(window.currentDocKey);
  }
};
window.setTheme = window.changePreset;

window.toggleTheme = function() {
  const cur = document.documentElement.getAttribute('data-theme') || window.StorageUtil.getTheme() || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  window.StorageUtil.setTheme(next);
  window.syncThemeDOM(next);
  if (window.showToast) window.showToast('已切换为 ' + (next === 'dark' ? '暗黑模式 🌙' : '明亮模式 ☀️'), 'info');
};
window.toggleDark = window.toggleTheme;

// ==========================================
// 3. Generic API Table Component Generator
// ==========================================
window.renderApiTable = function(title, headers, rows, subtitle = '', sectionId = '') {
  if (!rows || rows.length === 0) return '';
  const idAttr = sectionId ? `id="${sectionId}" style="scroll-margin-top: 80px;"` : '';
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
    <div ${idAttr} class="api-table-section">
      <h3 style="margin: 36px 0 14px; font-size: 1.35rem; font-weight:700;">${title}</h3>
      ${subHtml}
      <table class="api-table">
        <thead><tr>${theadHtml}</tr></thead>
        <tbody>${tbodyHtml}</tbody>
      </table>
    </div>
  `;
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
// Element Plus Style Demo Card Code Toolbar Helpers
// =========================================================================
window.toggleDemoSourceCode = function(btn) {
  const card = btn.closest('.demo-card');
  if (!card) return;
  const wrapper = card.querySelector('.demo-source-wrapper');
  if (!wrapper) return;

  const isHidden = wrapper.style.display === 'none' || getComputedStyle(wrapper).display === 'none';
  if (isHidden) {
    wrapper.style.display = 'block';
    btn.classList.add('active');
    btn.title = '隐藏源代码';
    if (window.showToast) window.showToast('已展开源代码', 'info');
  } else {
    wrapper.style.display = 'none';
    btn.classList.remove('active');
    btn.title = '查看源代码';
  }
};

window.copyDemoCodeFromCard = function(btn) {
  const card = btn.closest('.demo-card');
  if (!card) return;

  // 1. Identify which code panel is currently active in this card
  let codeEl = null;
  const csharpPanel = card.querySelector('.code-panel-csharp');
  const gdscriptPanel = card.querySelector('.code-panel-gdscript');

  if (csharpPanel && (csharpPanel.style.display === 'block' || window.getComputedStyle(csharpPanel).display !== 'none')) {
    codeEl = csharpPanel.querySelector('code');
  } else if (gdscriptPanel && (gdscriptPanel.style.display === 'block' || window.getComputedStyle(gdscriptPanel).display !== 'none')) {
    codeEl = gdscriptPanel.querySelector('code');
  }

  // 2. Fallback check: check active language button in toolbar
  if (!codeEl) {
    const csharpBtn = card.querySelector('.g-lang-btn[data-lang="csharp"]');
    const isCSharp = csharpBtn && (csharpBtn.style.color === '#ffffff' || csharpBtn.style.color === 'rgb(255, 255, 255)');
    if (isCSharp && csharpPanel) {
      codeEl = csharpPanel.querySelector('code');
    } else if (gdscriptPanel) {
      codeEl = gdscriptPanel.querySelector('code');
    }
  }

  // 3. Ultimate fallback: any code element inside card
  if (!codeEl) {
    codeEl = card.querySelector('.demo-source-wrapper code, pre code, code');
  }
  if (!codeEl) {
    if (window.showToast) window.showToast('未找到可复制的代码', 'warning');
    return;
  }

  const text = (codeEl.innerText || codeEl.textContent || '').trim();
  if (!text) {
    if (window.showToast) window.showToast('代码内容为空', 'warning');
    return;
  }

  const isCSharp = (codeEl.closest('.code-panel-csharp') !== null);
  const langLabel = isCSharp ? 'C# (.NET)' : 'GDScript';

  const onCopySuccess = () => {
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--primary);"></i>';
    setTimeout(() => { btn.innerHTML = origHtml; }, 1500);
    if (window.showToast) window.showToast(`✅ 【${langLabel}】源代码已成功复制到剪贴板！`, 'success');
  };

  // Robust clipboard execution with document.execCommand fallback
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(onCopySuccess).catch(() => {
      fallbackCopy(text, onCopySuccess);
    });
  } else {
    fallbackCopy(text, onCopySuccess);
  }

  function fallbackCopy(str, cb) {
    try {
      const ta = document.createElement('textarea');
      ta.value = str;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.left = '-9999px';
      ta.setAttribute('readonly', '');
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok && cb) cb();
      else if (window.showToast) window.showToast('复制完成', 'success');
    } catch (e) {
      if (window.showToast) window.showToast('复制失败，请手动选择复制', 'error');
    }
  }
};

window.cleanPureGodotCode = function(rawCode) {
  if (!rawCode) return '';
  let c = rawCode;
  // Strip <!-- 方式 1: Vue 3 ... --> ... </G...Component> or any HTML block
  c = c.replace(/<!--[\s\S]*?-->\s*<[a-zA-Z0-9_]+[\s\S]*?<\/[a-zA-Z0-9_]+>/g, '');
  // Strip standalone <template ... </template>
  c = c.replace(/<template[\s\S]*?<\/template>/gi, '');
  // Strip any remaining standalone XML/HTML opening and closing tags
  c = c.replace(/^<[a-zA-Z0-9_]+.*?>$/gm, '');
  c = c.replace(/^<\/[a-zA-Z0-9_]+>$/gm, '');
  // Strip "# 方式 2: Godot GDScript ..." prefix headers to standard clean header
  c = c.replace(/#\s*方式\s*\d+\s*:\s*Godot\s*GDScript\s*/gi, '# GDScript: ');
  c = c.replace(/#\s*方式\s*\d+\s*:\s*/gi, '# ');
  return c.trim();
};

window.convertGDScriptToCSharp = function(gdCode) {
  if (!gdCode) return '';
  let cs = gdCode;

  // 1. Strip Vue 3 / HTML templates
  cs = cs.replace(/<!--[\s\S]*?-->\s*<[a-zA-Z0-9_]+[\s\S]*?<\/[a-zA-Z0-9_]+>/g, '');
  cs = cs.replace(/<template[\s\S]*?<\/template>/gi, '');
  cs = cs.replace(/^<[a-zA-Z0-9_]+.*?>$/gm, '');
  cs = cs.replace(/^<\/[a-zA-Z0-9_]+>$/gm, '');
  cs = cs.replace(/#\s*方式\s*\d+\s*:\s*Godot\s*GDScript\s*/gi, '# GDScript: ');
  cs = cs.replace(/#\s*方式\s*\d+\s*:\s*/gi, '# ');

  const isFullScript = /class_name|extends\s+Control|func\s+_ready|func\s+_process|signal\s+/i.test(cs);

  // 2. Tokenize string literals to preserve hex colors like "#fcd34d" and format strings
  const stringLiterals = [];
  cs = cs.replace(/(".*?"|'.*?')/g, (match) => {
    stringLiterals.push(match);
    return `___STR_LITERAL_${stringLiterals.length - 1}___`;
  });

  // 3. Process comments (only outside string literals)
  cs = cs.replace(/#\s*(.*)/g, '// $1');

  // 4. Class & Extends
  let className = 'MyComponent';
  let baseClass = 'Control';
  const classMatch = cs.match(/class_name\s+([a-zA-Z0-9_]+)/);
  if (classMatch) className = classMatch[1];
  const extendsMatch = cs.match(/extends\s+([a-zA-Z0-9_]+)/);
  if (extendsMatch) baseClass = extendsMatch[1];

  cs = cs.replace(/class_name\s+[a-zA-Z0-9_]+\s*\n?/g, '');
  cs = cs.replace(/extends\s+[a-zA-Z0-9_]+\s*\n?/g, '');

  // 5. Signals
  const signalDeclarations = [];
  cs = cs.replace(/signal\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/g, (m, sig, params) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    signalDeclarations.push(`    [Signal]\n    public delegate void ${pascalSig}EventHandler(${params});\n`);
    return '';
  });
  cs = cs.replace(/signal\s+([a-zA-Z0-9_]+)/g, (m, sig) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    signalDeclarations.push(`    [Signal]\n    public delegate void ${pascalSig}EventHandler();\n`);
    return '';
  });

  // 6. Signal emits: sig_name.emit(...) -> EmitSignal(SignalName.SigName, ...)
  cs = cs.replace(/([a-zA-Z0-9_]+)\.emit\((.*?)\)/g, (m, sig, args) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `EmitSignal(SignalName.${pascalSig}${args ? ', ' + args : ''})`;
  });

  // 7. If / Else
  cs = cs.replace(/if\s+(.*?):/g, 'if ($1)\n        {');
  cs = cs.replace(/elif\s+(.*?):/g, '} else if ($1)\n        {');
  cs = cs.replace(/else:/g, '} else\n        {');

  // 8. Methods
  const hasFunctions = /func\s+/i.test(cs);
  cs = cs.replace(/func\s+_ready\(\)\s*(?:->\s*void)?:/g, '    public override void _Ready()\n    {');
  cs = cs.replace(/func\s+_process\(delta(?::\s*float)?\)\s*(?:->\s*void)?:/g, '    public override void _Process(double delta)\n    {');
  cs = cs.replace(/func\s+_physics_process\(delta(?::\s*float)?\)\s*(?:->\s*void)?:/g, '    public override void _PhysicsProcess(double delta)\n    {');
  cs = cs.replace(/func\s+([a-zA-Z0-9_]+)\((.*?)\)\s*(?:->\s*void)?:/g, '    private void $1($2)\n    {');
  cs = cs.replace(/func\s+([a-zA-Z0-9_]+)\((.*?)\)\s*->\s*([a-zA-Z0-9_]+):/g, '    private $3 $1($2)\n    {');

  // 9. $Node syntax
  cs = cs.replace(/\$([a-zA-Z0-9_]+)\.text\b/g, 'GetNode<Label>("$1").Text');
  cs = cs.replace(/\$([a-zA-Z0-9_]+)\.value\b/g, 'GetNode<ProgressBar>("$1").Value');
  cs = cs.replace(/\$([a-zA-Z0-9_]+)/g, 'GetNode<Control>("$1")');

  // 10. Node instantiation & variables
  cs = cs.replace(/var\s+([a-zA-Z0-9_]+)\s*:=\s*([a-zA-Z0-9_]+)\.new\(\)/g, 'var $1 = new $2();');
  cs = cs.replace(/var\s+([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+)\.new\(\)/g, 'var $1 = new $2();');
  cs = cs.replace(/var\s+([a-zA-Z0-9_]+)\s*:=\s*([0-9\.\-]+)/g, (m, v, val) => val.includes('.') ? `private double ${v} = ${val};` : `private int ${v} = ${val};`);
  cs = cs.replace(/var\s+([a-zA-Z0-9_]+)\s*=\s*([0-9\.\-]+)/g, (m, v, val) => val.includes('.') ? `private double ${v} = ${val};` : `private int ${v} = ${val};`);

  // 11. Method calls
  cs = cs.replace(/add_child\((.*?)\)/g, 'AddChild($1)');
  cs = cs.replace(/remove_child\((.*?)\)/g, 'RemoveChild($1)');
  cs = cs.replace(/queue_free\(\)/g, 'QueueFree()');
  cs = cs.replace(/\bprint\((.*?)\)/g, 'GD.Print($1)');
  cs = cs.replace(/\bpush_error\((.*?)\)/g, 'GD.PushError($1)');
  cs = cs.replace(/\bpush_warning\((.*?)\)/g, 'GD.PushWarning($1)');
  cs = cs.replace(/\bload\((.*?)\)/g, 'GD.Load<PackedScene>($1)');
  cs = cs.replace(/\bpreload\((.*?)\)/g, 'GD.Load<PackedScene>($1)');

  // 12. Signal connects
  cs = cs.replace(/([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\.connect\(func\((.*?)\):\s*([\s\S]*?)\)/g, (m, obj, sig, params, body) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `${obj}.${pascalSig} += (${params}) => {\n    ${body.trim()};\n};`;
  });
  cs = cs.replace(/([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\.connect\((.*?)\)/g, (m, obj, sig, handler) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `${obj}.${pascalSig} += ${handler};`;
  });

  // 13. Enums in Godot 4 C# (PascalCase Enum.Value)
  cs = cs.replace(/([A-Z][a-zA-Z0-9_]+)\.([A-Z][a-zA-Z0-9_]+)\.([A-Z0-9_]+)/g, (m, cls, en, val) => {
    const pascalVal = val.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    return `${cls}.${en}.${pascalVal}`;
  });

  // 14. Vectors & Colors
  cs = cs.replace(/Vector3\((.*?)\)/g, 'new Vector3($1)');
  cs = cs.replace(/Vector2\((.*?)\)/g, 'new Vector2($1)');
  cs = cs.replace(/Color\((.*?)\)/g, 'new Color($1)');

  // 15. Static helpers
  cs = cs.replace(/GHaptic\.impact\((.*?)\)/g, 'GHaptic.Impact($1);');
  cs = cs.replace(/GHaptic\.notification\((.*?)\)/g, 'GHaptic.Notification($1);');
  cs = cs.replace(/GMessage\.([a-z]+)\((.*?)\)/g, (m, fn, arg) => `GMessage.${fn.charAt(0).toUpperCase() + fn.slice(1)}(${arg})`);

  // 16. Convert snake_case properties to PascalCase
  const propList = [
    'button_type', 'variant', 'shape', 'button_size', 'stripe', 'border', 'selection_mode',
    'empty_text', 'columns', 'data', 'target_node_path', 'offset', 'billboard_mode',
    'distance_fade', 'distance_scaling', 'cull_behind_camera', 'amount', 'lifetime',
    'explosiveness', 'initial_velocity_min', 'initial_velocity_max', 'gravity', 'color',
    'process_material', 'one_shot', 'emitting', 'skeleton_path', 'bone_name', 'particle_emitter',
    'inherit_rotation', 'local_offset', 'system_prompt', 'npc_id', 'text', 'type', 'size',
    'disabled', 'loading', 'placeholder', 'value', 'min_value', 'max_value', 'step', 'visible',
    'slotName', 'name'
  ];

  propList.forEach(prop => {
    const pascal = prop.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const reg = new RegExp(`\\.(${prop})\\b`, 'g');
    cs = cs.replace(reg, '.' + pascal);
  });

  // 17. Restore string literals
  stringLiterals.forEach((str, idx) => {
    cs = cs.replace(`___STR_LITERAL_${idx}___`, str);
  });

  // 18. String interpolation in C#: "foo %d / 3" % step -> $"foo {step} / 3"
  cs = cs.replace(/"([^"]*?%[sdf][^"]*?)"\s*%\s*\[(.*?)\]/g, (m, str, vars) => {
    const varArr = vars.split(',').map(v => v.trim());
    let idx = 0;
    const interpolated = str.replace(/%[sdf]/g, () => `{${varArr[idx++] || ''}}`);
    return `$"${interpolated}"`;
  });
  cs = cs.replace(/"([^"]*?%[sdf][^"]*?)"\s*%\s*([a-zA-Z0-9_]+)/g, (m, str, v) => {
    const interpolated = str.replace(/%[sdf]/, `{${v}}`);
    return `$"${interpolated}"`;
  });

  // 19. Semicolon line formatting
  const lines = cs.split('\n');
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('[') || trimmed.endsWith(';') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed.startsWith('public') || trimmed.startsWith('private') || trimmed.startsWith('using') || trimmed.endsWith(':')) {
      return line;
    }
    if (trimmed.startsWith('if ') || trimmed.startsWith('else if') || trimmed.startsWith('for ') || trimmed.startsWith('while ') || trimmed.startsWith('{') || trimmed.startsWith('}')) {
      return line;
    }
    return line + ';';
  });

  let bodyCode = formattedLines.join('\n').trim();

  let result = '';
  if (hasFunctions) {
    const openBraces = (bodyCode.match(/\{/g) || []).length;
    const closeBraces = (bodyCode.match(/\}/g) || []).length;
    for (let i = 0; i < openBraces - closeBraces; i++) {
      bodyCode += '\n    }';
    }
    result = `using Godot;\nusing System;\nusing GotodUI;\n\npublic partial class ${className} : ${baseClass}\n{\n${signalDeclarations.join('')}${bodyCode.split('\n').map(l => l.startsWith('    ') ? l : '    ' + l).join('\n')}\n}`;
  } else {
    const indented = bodyCode.split('\n').map(l => '        ' + l).join('\n');
    result = `using Godot;\nusing System;\nusing GotodUI;\n\npublic partial class ${className} : ${baseClass}\n{\n    public override void _Ready()\n    {\n${indented}\n    }\n}`;
  }

  return result;
};

window.switchCodeLanguage = function(lang, btn) {
  if (btn) {
    const card = btn.closest('.demo-card');
    if (card) {
      // Update ONLY this card's language buttons
      card.querySelectorAll('.g-lang-btn').forEach(b => {
        const isThisLang = b.getAttribute('data-lang') === lang;
        b.style.background = isThisLang ? 'var(--primary)' : 'transparent';
        b.style.borderColor = isThisLang ? 'var(--primary)' : 'var(--border-base)';
        b.style.color = isThisLang ? '#ffffff' : 'var(--text-secondary)';
      });

      // Toggle ONLY this card's code panels
      card.querySelectorAll('.code-panel-gdscript').forEach(p => {
        p.style.display = (lang === 'gdscript') ? 'block' : 'none';
      });
      card.querySelectorAll('.code-panel-csharp').forEach(p => {
        p.style.display = (lang === 'csharp') ? 'block' : 'none';
      });

      // Automatically expand ONLY this demo card's source code area
      const wrapper = card.querySelector('.demo-source-wrapper');
      const toggleBtn = card.querySelector('.toggle-code-btn');
      if (wrapper) {
        wrapper.style.display = 'block';
        if (toggleBtn) {
          toggleBtn.classList.add('active');
          toggleBtn.style.color = 'var(--primary)';
          toggleBtn.style.background = 'rgba(34, 197, 94, 0.12)';
          toggleBtn.title = '隐藏源代码';
        }
      }
    }
  } else {
    window.currentCodeLang = lang;
    localStorage.setItem('gotod_code_lang', lang);
    document.querySelectorAll('.g-lang-btn').forEach(b => {
      const isThisLang = b.getAttribute('data-lang') === lang;
      b.style.background = isThisLang ? 'var(--primary)' : 'transparent';
      b.style.borderColor = isThisLang ? 'var(--primary)' : 'var(--border-base)';
      b.style.color = isThisLang ? '#ffffff' : 'var(--text-secondary)';
    });
    document.querySelectorAll('.code-panel-gdscript').forEach(p => {
      p.style.display = (lang === 'gdscript') ? 'block' : 'none';
    });
    document.querySelectorAll('.code-panel-csharp').forEach(p => {
      p.style.display = (lang === 'csharp') ? 'block' : 'none';
    });
  }

  if (window.showToast) {
    window.showToast(`已切换并展开【${lang === 'csharp' ? 'C# (Godot .NET)' : 'GDScript'}】代码`, 'info');
  }
};

window.getComponentGitHubUrl = function(key) {
  const baseRepo = 'https://github.com/mhxy13867806343/gotod-components-ui/blob/main';
  if (!key) return 'https://github.com/mhxy13867806343/gotod-components-ui';

  // 1. Guide sections -> game_templates.js with precise line numbers
  if (key.startsWith('guide-') || key === 'guide') {
    const guideLineMap = {
      'guide-install': 'L8',
      'guide-third-party': 'L119',
      'guide-css-style-engine': 'L369',
      'guide-common-methods': 'L569',
      'guide-dynamic-api': 'L632',
      'guide-theme': 'L713',
      'guide-autoload': 'L743',
      'guide-treeshaking': 'L764',
      'guide-imperative-api': 'L839'
    };
    const anchor = guideLineMap[key] ? `#${guideLineMap[key]}` : '';
    return `${baseRepo}/assets/js/game_templates.js${anchor}`;
  }

  // 2. Changelog -> changelog_page.js
  if (key.startsWith('changelog-') || key === 'changelog') {
    return `${baseRepo}/assets/js/changelog_page.js`;
  }

  // 3. Game templates -> game_templates.js
  if (key.startsWith('game-') || key === 'game') {
    return `${baseRepo}/assets/js/game_templates.js`;
  }

  // 4. Special catalog sections
  const sectionCatalogMap = {
    'playground': 'assets/js/api_playground.js',
    'imperative': 'assets/js/imperative_api.js',
    'hooks': 'assets/js/hooks_catalog.js',
    'signals': 'assets/js/signals_catalog.js',
    'decorator': 'assets/js/decorator_catalog.js',
    'storage': 'assets/js/storage_catalog.js',
    'router': 'assets/js/utils_router_catalog.js',
    'lifecycle': 'assets/js/lifecycle_catalog.js',
    'godot-globals': 'assets/js/godot_globals_catalog.js',
    'globals': 'assets/js/godot_globals_catalog.js',
    'studio': 'assets/js/resource_studio.js',
    'resource': 'assets/js/resource_studio.js',
    'networking': 'assets/js/networking_physics_catalog.js',
    'physics': 'assets/js/networking_physics_catalog.js',
    'slots': 'assets/js/slots_catalog.js',
    'icons-gallery': 'assets/js/icons_catalog.js'
  };

  if (sectionCatalogMap[key]) {
    return `${baseRepo}/${sectionCatalogMap[key]}`;
  }

  // 5. Godot .gd Engine Component Source Map
  const gdFileMap = {
    // General
    'button': 'addons/gotod_ui/components/general/g_button.gd',
    'text': 'addons/gotod_ui/components/general/g_text.gd',
    'icon': 'addons/gotod_ui/components/general/g_icon.gd',
    'fab': 'addons/gotod_ui/components/general/g_fab.gd',
    'divider': 'addons/gotod_ui/components/general/g_divider.gd',
    // Layout
    'container': 'addons/gotod_ui/components/layout/g_container.gd',
    'space': 'addons/gotod_ui/components/layout/g_space.gd',
    // Form
    'input': 'addons/gotod_ui/components/form/g_input.gd',
    'textarea': 'addons/gotod_ui/components/form/g_textarea.gd',
    'input_number': 'addons/gotod_ui/components/form/g_input_number.gd',
    'stepper': 'addons/gotod_ui/components/form/g_stepper.gd',
    'switch': 'addons/gotod_ui/components/form/g_switch.gd',
    'checkbox': 'addons/gotod_ui/components/form/g_checkbox.gd',
    'radio': 'addons/gotod_ui/components/form/g_radio.gd',
    'select': 'addons/gotod_ui/components/form/g_select.gd',
    'picker': 'addons/gotod_ui/components/form/g_picker.gd',
    'slider': 'addons/gotod_ui/components/form/g_slider.gd',
    'form': 'addons/gotod_ui/components/form/g_form.gd',
    // Feedback
    'dialog': 'addons/gotod_ui/components/feedback/g_dialog.gd',
    'dialogue': 'addons/gotod_ui/components/feedback/g_dialogue.gd',
    'chat': 'addons/gotod_ui/components/feedback/g_chat.gd',
    'popup': 'addons/gotod_ui/components/feedback/g_popup.gd',
    'overlay': 'addons/gotod_ui/components/feedback/g_overlay.gd',
    'action_sheet': 'addons/gotod_ui/components/feedback/g_action_sheet.gd',
    'popover': 'addons/gotod_ui/components/feedback/g_popover.gd',
    'notice_bar': 'addons/gotod_ui/components/feedback/g_notice_bar.gd',
    'message': 'addons/gotod_ui/components/feedback/g_message.gd',
    'toast': 'addons/gotod_ui/components/feedback/g_toast.gd',
    'alert': 'addons/gotod_ui/components/feedback/g_alert.gd',
    'drawer': 'addons/gotod_ui/components/feedback/g_drawer.gd',
    'tooltip': 'addons/gotod_ui/components/feedback/g_tooltip.gd',
    'loading': 'addons/gotod_ui/components/feedback/g_loading.gd',
    'skeleton': 'addons/gotod_ui/components/feedback/g_skeleton.gd',
    'tour': 'addons/gotod_ui/components/feedback/g_tour.gd',
    // Data
    'card': 'addons/gotod_ui/components/data/g_card.gd',
    'tag': 'addons/gotod_ui/components/data/g_tag.gd',
    'badge': 'addons/gotod_ui/components/data/g_badge.gd',
    'avatar': 'addons/gotod_ui/components/data/g_avatar.gd',
    'progress': 'addons/gotod_ui/components/data/g_progress.gd',
    'tabs': 'addons/gotod_ui/components/data/g_tabs.gd',
    'collapse': 'addons/gotod_ui/components/data/g_collapse.gd',
    'steps': 'addons/gotod_ui/components/data/g_steps.gd',
    // Advanced & Studios
    'haptic': 'addons/gotod_ui/core/g_style.gd',
    'ai_dialogue': 'addons/gotod_ui/components/feedback/g_dialogue.gd',
    'table': 'addons/gotod_ui/components/data/g_card.gd',
    'virtual_list': 'addons/gotod_ui/components/data/g_card.gd',
    'i18n': 'addons/gotod_ui/utils/g_format.gd',
    'particle_studio': 'addons/gotod_ui/components/feedback/g_loading.gd',
    'skeleton_particle': 'addons/gotod_ui/components/feedback/g_loading.gd',
    'shader_studio': 'addons/gotod_ui/theme/gotod_theme.gd',
    'hud3d': 'addons/gotod_ui/utils/g_coord.gd'
  };

  if (gdFileMap[key]) {
    return `${baseRepo}/${gdFileMap[key]}`;
  }

  // 6. Safe Known Component JS Fallback
  const knownComponentKeys = [
    'action_sheet', 'ai_dialogue', 'alert', 'avatar', 'badge', 'button', 'card', 'chat', 'checkbox',
    'collapse', 'container', 'dialog', 'dialogue', 'divider', 'drawer', 'fab', 'form', 'haptic',
    'hud3d', 'i18n', 'icon', 'input', 'input_number', 'loading', 'message', 'notice_bar', 'overlay',
    'particle_studio', 'picker', 'popover', 'popup', 'progress', 'radio', 'select', 'shader_studio',
    'skeleton', 'skeleton_particle', 'slider', 'space', 'stepper', 'steps', 'switch', 'table', 'tabs',
    'tag', 'text', 'textarea', 'toast', 'tooltip', 'tour', 'virtual_list'
  ];

  if (knownComponentKeys.includes(key)) {
    return `${baseRepo}/assets/js/components_${key}.js`;
  }

  return 'https://github.com/mhxy13867806343/gotod-components-ui';
};

// =========================================================================
// Gotod UI Native Component Version Update Modal (基于组件库原生弹窗规范)
// =========================================================================
window.showVersionUpdateModal = function(onRefresh, onCancel) {
  const existing = document.getElementById('gotodVersionUpdateModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'gotodVersionUpdateModal';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';

  overlay.innerHTML = `
    <div class="g-dialog" style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:14px; width:100%; max-width:460px; box-shadow:0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05); overflow:hidden; display:flex; flex-direction:column;">
      <!-- Header -->
      <div style="padding:16px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-base); background:var(--bg-surface);">
        <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:15px; color:var(--text-primary);">
          <span style="display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:6px; background:rgba(34,197,94,0.15); color:var(--primary);">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </span>
          <span>发现新版本发布 (Version Update)</span>
          <span class="g-tag g-tag-success" style="font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700;">NEW</span>
        </div>
        <button id="gotodUpdateCloseBtn" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px; width:28px; height:28px; border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Body -->
      <div style="padding:20px; font-size:13px; color:var(--text-regular); line-height:1.6;">
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div style="font-size:32px; color:var(--primary); margin-top:-2px;">
            <i class="fa-solid fa-rocket"></i>
          </div>
          <div>
            <div style="font-weight:700; font-size:14px; color:var(--text-primary); margin-bottom:6px;">
              Gotod UI 最新组件库代码已部署就绪！
            </div>
            <div style="color:var(--text-secondary); font-size:12px;">
              系统检测到服务端代码已更新。为了确保您使用的是最新的组件库 API、C# 范例以及全平台兼容性支持，建议立即刷新。
            </div>
          </div>
        </div>

        <div style="margin-top:14px; padding:10px 12px; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:8px; font-size:11px; color:var(--text-secondary); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-circle-info" style="color:var(--primary);"></i>
          <span>点击确认将自动清除浏览器本地旧缓存并加载最新代码</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:12px 20px; display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--border-base); background:var(--bg-surface);">
        <button id="gotodUpdateCancelBtn" class="g-btn g-btn-default" style="padding:6px 16px; font-size:12px; border-radius:var(--radius); cursor:pointer;">
          稍后提醒
        </button>
        <button id="gotodUpdateConfirmBtn" class="g-btn g-btn-primary" style="padding:6px 18px; font-size:12px; border-radius:var(--radius); font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-rotate"></i>
          <span>立即刷新更新</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => {
    overlay.remove();
  };

  document.getElementById('gotodUpdateCloseBtn').onclick = () => {
    close();
    if (onCancel) onCancel();
  };
  document.getElementById('gotodUpdateCancelBtn').onclick = () => {
    close();
    if (onCancel) onCancel();
  };
  document.getElementById('gotodUpdateConfirmBtn').onclick = () => {
    close();
    if (onRefresh) onRefresh();
  };
};

window.testVersionPollingUpdate = function() {
  if (typeof window.showVersionUpdateModal === 'function') {
    window.showVersionUpdateModal(() => {
      if (window.showToast) window.showToast('✅ 正在执行页面更新重载...', 'success');
      setTimeout(() => {
        if (typeof window.forceHardReload === 'function') window.forceHardReload();
        else window.location.reload();
      }, 500);
    }, () => {
      if (window.showToast) window.showToast('已暂缓版本更新', 'info');
    });
  }
};
