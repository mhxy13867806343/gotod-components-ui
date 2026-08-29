// =========================================================================
// Gotod Components UI - Top Navigation GSelect Dropdown Component
// assets/js/nav_dropdown.js
// 使用 Gotod UI 规范打造的顶部模块快速切换下拉选择器 (GSelect / GDropdown)
// =========================================================================

window.TOP_SECTIONS = [
  { key: 'guide', label: '1. 指南与安装 (Guide)', icon: 'fa-book-open', desc: '快速上手、全局基类方法、动态实例化指南' },
  { key: 'components', label: '2. 组件库 (Components)', icon: 'fa-cube', desc: '全部 28+ 个 UI 控件全量文档与 API 字典' },
  { key: 'game', label: '3. 游戏实战案例 (Game UI)', icon: 'fa-gamepad', desc: '背包、角色面板、系统设置等游戏场景' },
  { key: 'playground', label: '4. 属性与方法演练 (API Playground)', icon: 'fa-flask-vial', desc: '实时属性调节器与方法调用测试' },
  { key: 'studio', label: '5. .tres 资源工坊与主题导出 (Resource Studio)', icon: 'fa-file-code', desc: 'Godot 4 主题面板与 .tres 导入导出' }
];

// Initialize Top Nav GSelect Dropdown
window.initTopNavDropdown = function() {
  const container = document.getElementById('topNavSelectContainer');
  if (!container) return;

  const currentKey = window.currentTopSection || 'components';
  const currentItem = window.TOP_SECTIONS.find(s => s.key === currentKey) || window.TOP_SECTIONS[1];

  container.innerHTML = `
    <div class="g-nav-select" id="gNavSelectDropdown">
      <div class="g-nav-select-trigger" onclick="toggleNavDropdown(event)">
        <i class="fa-solid ${currentItem.icon}" style="color:var(--primary);"></i>
        <span class="g-nav-select-label" id="gNavSelectLabel">${currentItem.label}</span>
        <i class="fa-solid fa-chevron-down g-nav-select-arrow" id="gNavSelectArrow"></i>
      </div>

      <div class="g-nav-select-menu" id="gNavSelectMenu">
        ${window.TOP_SECTIONS.map(sec => `
          <div class="g-nav-select-option ${sec.key === currentKey ? 'selected' : ''}" data-key="${sec.key}" onclick="selectNavSection('${sec.key}')">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid ${sec.icon}" style="width:16px; text-align:center; color:${sec.key === currentKey ? 'var(--primary)' : 'var(--text-secondary)'};"></i>
              <div>
                <div style="font-weight:600; font-size:12px; color:${sec.key === currentKey ? 'var(--primary)' : 'var(--text-primary)'};">${sec.label}</div>
                <div style="font-size:11px; color:var(--text-disabled);">${sec.desc}</div>
              </div>
            </div>
            ${sec.key === currentKey ? '<i class="fa-solid fa-check" style="color:var(--primary); font-size:11px;"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('gNavSelectDropdown');
    const menu = document.getElementById('gNavSelectMenu');
    const arrow = document.getElementById('gNavSelectArrow');
    if (dropdown && !dropdown.contains(e.target) && menu) {
      menu.classList.remove('open');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });
};

// Toggle Dropdown Open/Close
window.toggleNavDropdown = function(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('gNavSelectMenu');
  const arrow = document.getElementById('gNavSelectArrow');
  if (!menu) return;

  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  } else {
    menu.classList.add('open');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
};

// Select Section from Dropdown
window.selectNavSection = function(sectionKey) {
  const menu = document.getElementById('gNavSelectMenu');
  const arrow = document.getElementById('gNavSelectArrow');
  if (menu) menu.classList.remove('open');
  if (arrow) arrow.style.transform = 'rotate(0deg)';

  // Switch top section
  if (typeof window.switchTopSection === 'function') {
    window.switchTopSection(sectionKey);
  }

  // Update Dropdown UI
  syncNavDropdownUI(sectionKey);
};

// Synchronize Dropdown UI with current section
window.syncNavDropdownUI = function(sectionKey) {
  const item = window.TOP_SECTIONS.find(s => s.key === sectionKey);
  if (!item) return;

  const labelElem = document.getElementById('gNavSelectLabel');
  const triggerElem = document.querySelector('.g-nav-select-trigger');
  
  if (labelElem) {
    labelElem.innerText = item.label;
  }
  if (triggerElem) {
    const icon = triggerElem.querySelector('.fa-solid:first-child');
    if (icon) {
      icon.className = `fa-solid ${item.icon}`;
    }
  }

  // Update option selected classes
  const options = document.querySelectorAll('.g-nav-select-option');
  options.forEach(opt => {
    const isSel = opt.getAttribute('data-key') === sectionKey;
    opt.classList.toggle('selected', isSel);
    
    const checkIcon = opt.querySelector('.fa-check');
    if (isSel && !checkIcon) {
      const i = document.createElement('i');
      i.className = 'fa-solid fa-check';
      i.style.color = 'var(--primary)';
      i.style.fontSize = '11px';
      opt.appendChild(i);
    } else if (!isSel && checkIcon) {
      checkIcon.remove();
    }
  });
};

// Hook into DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(window.initTopNavDropdown, 20);
});
