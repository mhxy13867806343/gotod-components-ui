(function () {
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  window.mountGotodCatalog = function (catalog) {
    if (!catalog) return;
    var groups = catalog.groups || [];
    var hubs = catalog.hubs || [];
    var total = catalog.count || groups.reduce(function (sum, group) { return sum + group[2].length; }, 0);
    var state = { active: -1, shown: 150 };
    var PAGE = 150;
    var hubRoot = document.getElementById('catalogHubs');
    var tabsRoot = document.getElementById('catalogTabs');
    var gridRoot = document.getElementById('catalogGrid');
    var countRoot = document.getElementById('catalogCount');
    var searchRoot = document.getElementById('catalogSearch');
    var totalRoot = document.getElementById('catalogTotal');
    var groupRoot = document.getElementById('catalogGroupCount');
    if (totalRoot) totalRoot.textContent = String(total);
    if (groupRoot) groupRoot.textContent = String(groups.length);

    if (hubRoot) {
      hubRoot.innerHTML = hubs.map(function (hub) {
        return '<a class="catalog-hub" href="' + esc(hub[2]) + '" target="_blank" rel="noreferrer"><b>' + esc(hub[3] || 'HUB') + '</b><strong>' + esc(hub[0]) + '</strong><span>' + esc(hub[1]) + '</span></a>';
      }).join('');
    }

    function currentItems() {
      var query = (searchRoot && searchRoot.value || '').trim().toLowerCase();
      var pack = state.active === -1 ? ['全部', 'All', groups.reduce(function (list, group) { return list.concat(group[2]); }, [])] : groups[state.active];
      var items = pack[2].filter(function (item) { return item.join(' ').toLowerCase().indexOf(query) !== -1; });
      return { label: pack[0], items: items };
    }

    function renderTabs() {
      if (!tabsRoot) return;
      tabsRoot.innerHTML = ['<button class="library-tab" type="button" data-index="-1">全部 (' + total + ')</button>'].concat(groups.map(function (group, index) {
        return '<button class="library-tab" type="button" data-index="' + index + '">' + esc(group[0]) + ' (' + group[2].length + ')</button>';
      })).join('');
      var current = tabsRoot.querySelector('[data-index="' + state.active + '"]');
      if (current) current.classList.add('active');
    }

    function renderCards() {
      var view = currentItems();
      if (countRoot) countRoot.textContent = view.items.length + ' 个项目 · ' + view.label;
      if (!gridRoot) return;
      if (!view.items.length) {
        gridRoot.innerHTML = '<div class="library-empty">没有找到匹配的项目，换个关键词或分类再试。</div>';
        return;
      }
      var visible = view.items.slice(0, state.shown);
      var more = view.items.length > visible.length ? '<button class="catalog-more" id="catalogMore" type="button">显示更多 · 还剩 ' + (view.items.length - visible.length) + ' 条</button>' : '';
      gridRoot.innerHTML = visible.map(function (item) {
        var name = item[0], desc = item[1], url = item[2], repo = item[3];
        var tags = item.slice(4);
        var mark = (name.match(/[A-Za-z0-9]/) || ['◈'])[0].toUpperCase();
        return '<article class="library-card"><div class="library-card-media"><div class="library-avatar">' + esc(mark) + '</div><h2>' + esc(name) + '</h2></div><div class="library-card-body"><p>' + esc(desc) + '</p><div class="library-tags">' + tags.map(function (tag) { return '<span class="library-tag">' + esc(tag) + '</span>'; }).join('') + (repo ? '<span class="library-tag">' + esc(repo) + '</span>' : '') + '</div></div><div class="library-card-footer"><a class="library-github" href="' + esc(url) + '" target="_blank" rel="noreferrer">' + (url.indexOf('github.com') !== -1 ? 'GitHub ↗' : '打开 ↗') + '</a><button class="library-copy" type="button" data-copy="' + esc(url) + '">复制链接</button></div></article>';
      }).join('') + more;
    }

    if (tabsRoot) {
      tabsRoot.addEventListener('click', function (event) {
        var tab = event.target.closest('.library-tab');
        if (!tab) return;
        state.active = Number(tab.dataset.index);
        state.shown = PAGE;
        if (searchRoot) searchRoot.value = '';
        renderTabs();
        renderCards();
      });
    }
    if (searchRoot) searchRoot.addEventListener('input', function () {
      state.shown = PAGE;
      renderCards();
    });
    if (gridRoot) {
      gridRoot.addEventListener('click', function (event) {
        var moreBtn = event.target.closest('#catalogMore');
        if (moreBtn) {
          state.shown += PAGE;
          renderCards();
          return;
        }
        var copy = event.target.closest('[data-copy]');
        if (!copy) return;
        navigator.clipboard.writeText(copy.dataset.copy).then(function () {
          copy.textContent = '已复制';
          setTimeout(function () { copy.textContent = '复制链接'; }, 1200);
        }).catch(function () {
          copy.textContent = '复制失败';
          setTimeout(function () { copy.textContent = '复制链接'; }, 1200);
        });
      });
    }
    renderTabs();
    renderCards();
  };
})();
