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
  const codeEl = card.querySelector('.demo-source-wrapper code, pre code, code');
  if (!codeEl) return;
  const text = codeEl.innerText || codeEl.textContent;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--primary);"></i>';
      setTimeout(() => { btn.innerHTML = origHtml; }, 1500);
      if (window.showToast) window.showToast('✅ 源代码已成功复制到剪贴板！', 'success');
    });
  } else {
    if (window.showToast) window.showToast('源代码已复制！', 'success');
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
  cs = cs.replace(/signal\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/g, (m, sig, params) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `[Signal]\npublic delegate void ${pascalSig}EventHandler(${params});`;
  });
  cs = cs.replace(/signal\s+([a-zA-Z0-9_]+)/g, (m, sig) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `[Signal]\npublic delegate void ${pascalSig}EventHandler();`;
  });

  // 6. Signal emits: sig_name.emit(...) -> EmitSignal(SignalName.SigName, ...)
  cs = cs.replace(/([a-zA-Z0-9_]+)\.emit\((.*?)\)/g, (m, sig, args) => {
    const pascalSig = sig.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `EmitSignal(SignalName.${pascalSig}${args ? ', ' + args : ''})`;
  });

  // 7. If / Else
  cs = cs.replace(/if\s+(.*?):/g, 'if ($1)\n    {');
  cs = cs.replace(/elif\s+(.*?):/g, '} else if ($1)\n    {');
  cs = cs.replace(/else:/g, '} else\n    {');

  // 8. Methods
  cs = cs.replace(/func\s+_ready\(\)\s*(?:->\s*void)?:/g, 'public override void _Ready()\n    {');
  cs = cs.replace(/func\s+_process\(delta(?::\s*float)?\)\s*(?:->\s*void)?:/g, 'public override void _Process(double delta)\n    {');
  cs = cs.replace(/func\s+_physics_process\(delta(?::\s*float)?\)\s*(?:->\s*void)?:/g, 'public override void _PhysicsProcess(double delta)\n    {');
  cs = cs.replace(/func\s+([a-zA-Z0-9_]+)\((.*?)\)\s*(?:->\s*void)?:/g, 'private void $1($2)\n    {');
  cs = cs.replace(/func\s+([a-zA-Z0-9_]+)\((.*?)\)\s*->\s*([a-zA-Z0-9_]+):/g, 'private $3 $1($2)\n    {');

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

  let bodyCode = formattedLines.join('\n');
  const openBraces = (bodyCode.match(/\{/g) || []).length;
  const closeBraces = (bodyCode.match(/\}/g) || []).length;
  for (let i = 0; i < openBraces - closeBraces; i++) {
    bodyCode += '\n    }';
  }

  let result = '';
  if (isFullScript) {
    result = `// C# (Godot 4 .NET)\nusing Godot;\nusing System;\nusing GotodUI;\n\npublic partial class ${className} : ${baseClass}\n{\n${bodyCode.split('\n').map(l => '    ' + l).join('\n')}\n}`;
  } else {
    result = `// C# (Godot 4 .NET)\nusing Godot;\nusing GotodUI;\n\n` + bodyCode;
  }

  return result;
};

window.switchCodeLanguage = function(lang, btn) {
  window.currentCodeLang = lang;
  localStorage.setItem('gotod_code_lang', lang);

  // Update all language button styles across all demo cards
  document.querySelectorAll('.g-lang-btn').forEach(b => {
    const isThisLang = b.getAttribute('data-lang') === lang;
    b.style.background = isThisLang ? 'var(--primary)' : 'transparent';
    b.style.borderColor = isThisLang ? 'var(--primary)' : 'var(--border-base)';
    b.style.color = isThisLang ? '#ffffff' : 'var(--text-secondary)';
  });

  // Toggle code display panels
  document.querySelectorAll('.code-panel-gdscript').forEach(p => {
    p.style.display = (lang === 'gdscript') ? 'block' : 'none';
  });
  document.querySelectorAll('.code-panel-csharp').forEach(p => {
    p.style.display = (lang === 'csharp') ? 'block' : 'none';
  });

  if (window.showToast) {
    window.showToast(`已切换至【${lang === 'csharp' ? 'C# (Godot .NET)' : 'GDScript'}】代码模式`, 'info');
  }
};
