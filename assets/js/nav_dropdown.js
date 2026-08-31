// =========================================================================
// Gotod Components UI - Top Navigation GSelect Dropdown Component
// assets/js/nav_dropdown.js
// =========================================================================

window.TOP_SECTIONS = [
  { key: 'guide', label: '1. 指南与快速上手 (Guide)', icon: 'fa-book-open', desc: '安装、按需加载、生命周期与全局服务' },
  { key: 'components', label: '2. 组件库全量文档 (Components)', icon: 'fa-cube', desc: '全部 30+ UI 控件属性、事件与插槽字典' },
  { key: 'game', label: '3. 游戏实战案例 (Game UI)', icon: 'fa-gamepad', desc: '背包、角色面板、系统设置、任务与商城' },
  { key: 'playground', label: '4. 属性与方法演练 (Playground)', icon: 'fa-flask-vial', desc: '实时属性调节器与方法调用测试' },
  { key: 'imperative', label: '5. 编程式/命令式调用 (Imperative API)', icon: 'fa-bolt', desc: 'GMessage/GMessageBox/GLoading/通知气泡' },
  { key: 'hooks', label: '6. Hooks 响应式钩子 (Vue Hooks)', icon: 'fa-link', desc: 'useCountDown/useToggle/useDebounce 等' },
  { key: 'signals', label: '7. 自定义信号与事件总线 (Signals & Events)', icon: 'fa-tower-broadcast', desc: '全域 EventBus、防抖信号与跨场景通信' },
  { key: 'decorator', label: '8. 装饰器设计模式工坊 (Decorator Pattern)', icon: 'fa-wand-magic-sparkles', desc: '音效装饰器、流光扫光、防重复点击与冷却' },
  { key: 'storage', label: '9. 游戏存档与中断存储 (Game Save & Checkpoint)', icon: 'fa-floppy-disk', desc: '多槽位加密读写、版本迁移与自动保存' },
  { key: 'router', label: '10. 格式化、资源导入与转场路由 (Utils & Router)', icon: 'fa-route', desc: '富文本、音效、场景平滑转场路由与守卫' },
  { key: 'lifecycle', label: '11. Godot 4 全量生命周期与节点钩子 (Lifecycle Atlas)', icon: 'fa-rotate', desc: '7 大阶段生命周期状态机与可视化追踪' },
  { key: 'studio', label: '12. .tres 资源工坊与主题导出 (Resource Studio)', icon: 'fa-palette', desc: '实时可视化主题定制与 .tres 文件生成' },
  { key: 'godot-globals', label: '13. 全局与基类方法速查 (Godot Globals & Base APIs)', icon: 'fa-globe', desc: 'Node 核心树方法、@GlobalScope 全局函数速查' },
  { key: 'networking', label: '14. 网络通信与程序化物理 (Networking & Physics)', icon: 'fa-network-wired', desc: 'WebSocket/RPC 多人联机与 2D/3D 物理引擎' },
  { key: 'slots', label: '15. Slots 插槽系统专题 (Vue-Style Slot System)', icon: 'fa-cubes', desc: '默认插槽、具名插槽与作用域插槽' },
  { key: 'icons-gallery', label: '16. 矢量图标超级中心 (26,000+ Icons)', icon: 'fa-icons', desc: '全图库检索与复制代码' },
  { key: 'changelog', label: '17. 版本更新日志与步骤时间线 (Changelog - GSteps)', icon: 'fa-clock-rotate-left', desc: '基于 GSteps 步骤条展示的发布历程与路线图' }
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
        <span class="g-nav-select-label" id="gNavSelectLabel">${currentItem.label.split(' ')[1] || currentItem.label}</span>
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
    labelElem.innerText = item.label.split(' ')[1] || item.label;
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
