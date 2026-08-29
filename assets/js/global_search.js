// =========================================================================
// Gotod Components UI - 全局搜索系统 (Global Search & Command Palette)
// assets/js/global_search.js
// 基于 GInput + GDialog + GTag + 快捷键 (Ctrl+K / Cmd+K) 全局索引全部板块与组件
// =========================================================================

// Build All Indexed Search Items from Catalogs
window.getAllSearchIndex = function() {
  const index = [];

  // Helper to push items
  function pushCategory(catalog, categoryName, sectionKey, tagType) {
    if (!catalog) return;
    Object.keys(catalog).forEach(key => {
      const item = catalog[key];
      index.push({
        key: key,
        section: sectionKey,
        title: item.title || key,
        desc: item.desc || '',
        category: categoryName,
        tagType: tagType
      });
    });
  }

  pushCategory(window.GUIDE_CATALOG, '指南 (Guide)', 'guide', 'info');
  pushCategory(window.COMPONENT_CATALOG, '组件 (Component)', 'components', 'primary');
  pushCategory(window.GAME_CATALOG, '游戏实战 (Game UI)', 'game', 'warning');
  pushCategory(window.PLAYGROUND_CATALOG, '属性演练 (Playground)', 'playground', 'success');
  pushCategory(window.IMPERATIVE_CATALOG, '编程式调用 (Imperative)', 'imperative', 'danger');
  pushCategory(window.HOOKS_CATALOG, 'Hooks 钩子 (Hooks)', 'hooks', 'primary');
  pushCategory(window.SIGNALS_CATALOG, '信号事件 (Signals)', 'signals', 'success');
  pushCategory(window.DECORATOR_CATALOG, '设计模式 (Decorator)', 'decorator', 'warning');
  pushCategory(window.STUDIO_CATALOG, '资源工坊 (Studio)', 'studio', 'info');

  return index;
};

// Open Global Search Modal
window.openGlobalSearch = function() {
  const modal = document.getElementById('globalSearchModal');
  const input = document.getElementById('globalSearchInput');
  if (!modal) return;

  modal.classList.add('active');
  modal.style.display = 'flex';
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 50);
    renderSearchResults('');
  }
};

// Close Global Search Modal
window.closeGlobalSearch = function() {
  const modal = document.getElementById('globalSearchModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
};

// Perform Real-time Filtering
window.handleGlobalSearchInput = function(query) {
  renderSearchResults(query.trim());
};

// Render Filtered Search Results
window.renderSearchResults = function(query) {
  const container = document.getElementById('globalSearchResults');
  if (!container) return;

  const allItems = getAllSearchIndex();
  const q = query.toLowerCase();

  const filtered = q === '' 
    ? allItems.slice(0, 12) 
    : allItems.filter(item => {
        return item.title.toLowerCase().includes(q) || 
               item.key.toLowerCase().includes(q) || 
               item.desc.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q);
      });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 32px 16px; text-align: center; color: var(--text-secondary);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; opacity: 0.3; margin-bottom: 10px;"></i>
        <div>未找到与 "<strong>${escapeHtml(query)}</strong>" 匹配的组件或文档</div>
        <div style="font-size: 11px; margin-top: 4px; color: var(--text-disabled);">尝试搜索: GButton, GTabs, useCooldown, GMessage, 角色面板, .tres</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, idx) => `
    <div class="search-result-item" onclick="selectSearchResult('${item.section}', '${item.key}')" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:var(--radius); cursor:pointer; transition:background 0.15s; border-bottom:1px solid rgba(255,255,255,0.04);">
      <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
        <span class="g-tag g-tag-${item.tagType}" style="font-size:10px; flex-shrink:0;">${item.category}</span>
        <div style="overflow:hidden;">
          <div style="font-weight:600; font-size:13px; color:var(--text-primary); text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">
            ${highlightSearchMatch(item.title, query)}
          </div>
          <div style="font-size:11px; color:var(--text-secondary); text-overflow:ellipsis; white-space:nowrap; overflow:hidden; margin-top:2px;">
            ${item.desc}
          </div>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right" style="font-size:11px; color:var(--text-disabled); margin-left:8px; flex-shrink:0;"></i>
    </div>
  `).join('');
};

// Highlight matched search keywords
function highlightSearchMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, `<span style="color:var(--primary); font-weight:700; text-decoration:underline;">$1</span>`);
}

// Select Result and Navigate
window.selectSearchResult = function(sectionKey, docKey) {
  closeGlobalSearch();
  
  if (typeof window.switchTopSection === 'function') {
    window.switchTopSection(sectionKey);
  }
  
  setTimeout(() => {
    if (typeof window.showDoc === 'function') {
      window.showDoc(docKey);
    }
  }, 30);
  
  showToast(`已跳转到: ${docKey}`, 'success');
};

// Global Keyboard Shortcut: Ctrl+K / Cmd+K / ESC
document.addEventListener('keydown', function(e) {
  // Ctrl + K or Cmd + K
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const modal = document.getElementById('globalSearchModal');
    if (modal && modal.style.display === 'flex') {
      closeGlobalSearch();
    } else {
      openGlobalSearch();
    }
  }

  // ESC to close
  if (e.key === 'Escape') {
    closeGlobalSearch();
  }
});
