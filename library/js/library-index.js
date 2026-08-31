(function () {
  const state = { language: 'zh', active: -1 };
  const $ = (id) => document.getElementById(id);
  const total = groups.reduce((sum, group) => sum + group[2].length, 0);
  const renderTabs = () => {
    $('libraryTabs').innerHTML = [`<button class="library-tab" data-index="-1">${state.language === 'zh' ? '所有' : 'All'} (${total})</button>`, ...groups.map((group, index) => `<button class="library-tab" data-index="${index}">${state.language === 'zh' ? group[0] : group[1]} (${group[2].length})</button>`)].join('');
    $('libraryTabs').querySelector(`[data-index="${state.active}"]`).classList.add('active');
  };
  const renderCards = () => {
    const query = $('librarySearch').value.trim().toLowerCase();
    const group = state.active === -1 ? ['所有', 'All', groups.flatMap((item) => item[2])] : groups[state.active];
    const items = group[2].filter((item) => item.join(' ').toLowerCase().includes(query));
    $('libraryCount').textContent = `${items.length} 个项目 · ${state.language === 'zh' ? group[0] : group[1]}`;
    $('libraryGrid').innerHTML = items.length ? items.map(([name, desc, repo, ...tags]) => `<article class="library-card" data-repo="https://github.com/${repo}"><div class="library-card-media"><div class="library-avatar">◈</div><h2>${name}</h2></div><div class="library-card-body"><p>${desc}</p><div class="library-tags">${tags.map((tag) => `<span class="library-tag">${tag}</span>`).join('')}</div></div><div class="library-card-footer"><a class="library-github" href="https://github.com/${repo}" target="_blank" rel="noreferrer">GitHub ↗</a><button class="library-copy" data-copy="https://github.com/${repo}">复制链接</button></div></article>`).join('') : '<div class="library-empty">没有找到匹配的项目，请换一个关键词。</div>';
  };
  $('libraryTabs').addEventListener('click', (event) => { const tab = event.target.closest('.library-tab'); if (!tab) return; state.active = Number(tab.dataset.index); $('librarySearch').value = ''; renderTabs(); renderCards(); });
  $('librarySearch').addEventListener('input', renderCards);
  $('languageToggle').addEventListener('click', () => { state.language = state.language === 'zh' ? 'en' : 'zh'; renderTabs(); renderCards(); });
  $('libraryGrid').addEventListener('click', (event) => { const copy = event.target.closest('[data-copy]'); if (copy) navigator.clipboard?.writeText(copy.dataset.copy).then(() => { copy.textContent = '已复制'; setTimeout(() => { copy.textContent = '复制链接'; }, 1200); }); });
  renderTabs();
  renderCards();
})();
