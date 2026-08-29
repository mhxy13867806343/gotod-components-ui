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
        const val = r[h.key] !== undefined ? r[h.key] : '';
        if (h.isCode) return `<td><code>${val}</code></td>`;
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
// 4. Uni-UI Style FAB Toggle Function
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

// ==========================================
// 5. Toast Floating Message System
// ==========================================
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

// ==========================================
// 6. Dual-Engine Clipboard Copy Utility
// ==========================================
window.copyCode = function(btn, codeText) {
  if (!codeText) {
    const card = btn.closest('.demo-card') || btn.closest('.code-box') || btn.parentElement;
    if (card) {
      const codeElem = card.querySelector('.code-box pre code') || card.querySelector('pre code') || card.querySelector('code');
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
