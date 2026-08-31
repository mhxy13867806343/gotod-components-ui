// =========================================================================
// Gotod Components UI - Data Display Simulators (Table, TableV2, VirtualList, I18n)
// =========================================================================
// =========================================================================
// GVirtualList Global Demo Helpers
// =========================================================================
window.onVListScroll = function(container) {
  if (!container) return;
  const ITEM_HEIGHT = 46;
  const TOTAL_ITEMS = 1000000;
  const VISIBLE_COUNT = 10;
  const BUFFER = 3;

  const scrollTop = container.scrollTop;
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(TOTAL_ITEMS, startIndex + VISIBLE_COUNT + BUFFER * 2);

  const content = document.getElementById('vListContent');
  if (!content) return;

  content.style.transform = 'translateY(' + (startIndex * ITEM_HEIGHT) + 'px)';

  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    const rank = i + 1;
    const score = (10000000 - i * 9.8).toFixed(0);
    let medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : '⚔️'));
    let bg = rank <= 3 ? 'background:rgba(24,160,88,0.08); border-color:var(--primary);' : 'background:var(--bg-surface);';
    
    html += '<div style="height:' + (ITEM_HEIGHT - 6) + 'px; ' + bg + ' border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">';
    html += '  <div style="display:flex; align-items:center; gap:8px;">';
    html += '    <span style="font-weight:700; width:60px;">' + medal + ' #' + rank + '</span>';
    html += '    <span>传奇勇士_' + (i % 9999 + 1000) + '</span>';
    html += '  </div>';
    html += '  <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">' + score + ' 战力</div>';
    html += '</div>';
  }

  content.innerHTML = html;
  const posTip = document.getElementById('vListPosTip');
  if (posTip) posTip.innerText = '当前视口：第 ' + (startIndex + 1) + ' ~ ' + endIndex + ' 条';
  const domCount = document.getElementById('vListDomCount');
  if (domCount) domCount.innerText = '⚡ 实际渲染节点: ' + (endIndex - startIndex) + ' 个';
};

window.scrollVListTo = function(idx) {
  const container = document.getElementById('vListContainer');
  if (container) {
    const ITEM_HEIGHT = 46;
    container.scrollTop = idx * ITEM_HEIGHT;
    window.onVListScroll(container);
    if (window.showToast) window.showToast('已极速定位至第 ' + (idx + 1) + ' 条数据', 'info');
  }
};

// =========================================================================
// GI18n Global Demo Helpers
// =========================================================================
window.I18N_DICT = {
  zh: {
    title: "🏰 遗忘神庙 · 讨伐任务",
    desc: "勇士 Arthur，你已成功升至 Lv.88！目前剩余 350 点体力，准备好迎接最终 BOSS 战了吗？",
    start: "⚔️ 开始远征",
    shop: "🛒 道具补给"
  },
  en: {
    title: "🏰 Forgotten Temple · Conquest Quest",
    desc: "Warrior Arthur, you have leveled up to Lv.88! You have 350 stamina left. Ready for the final BOSS fight?",
    start: "⚔️ Start Expedition",
    shop: "🛒 Item Supply"
  },
  ja: {
    title: "🏰 忘れられた神殿 · 討伐クエスト",
    desc: "勇者アーサー、Lv.88に到達しました！スタミナ残量 350。最終BOSS戦の準備はできましたか？",
    start: "⚔️ 遠征開始",
    shop: "🛒 アイテム補給"
  },
  ko: {
    title: "🏰 잊혀진 신전 · 토벌 퀘스트",
    desc: "용사 Arthur, Lv.88 달성을 축하합니다! 현재 남은 스테미너 350. 최종 BOSS전에 도전하시겠습니까?",
    start: "⚔️ 원정 시작",
    shop: "🛒 아이템 보급"
  }
};

window.switchDemoLang = function(locale) {
  ['zh', 'en', 'ja', 'ko'].forEach(l => {
    const btn = document.getElementById('i18nBtn_' + l);
    if (btn) btn.className = l === locale ? 'g-btn g-btn-primary' : 'g-btn g-btn-default';
  });
  const t = window.I18N_DICT[locale] || window.I18N_DICT.zh;
  const title = document.getElementById('i18nTitle');
  const desc = document.getElementById('i18nDesc');
  const btnStart = document.getElementById('i18nBtnStart');
  const btnShop = document.getElementById('i18nBtnShop');
  if (title) title.innerText = t.title;
  if (desc) desc.innerText = t.desc;
  if (btnStart) btnStart.innerText = t.start;
  if (btnShop) btnShop.innerText = t.shop;
  if (window.showToast) window.showToast('语言已动态热切换至: ' + locale.toUpperCase(), 'success');
};


// =========================================================================
// GTable & GTableV2 Global Demo Helpers
// =========================================================================
window.toggleTableStripe = function() {
  const t = document.getElementById('demoTable1');
  if (t) {
    t.classList.toggle('g-table-stripe');
    if (window.showToast) window.showToast('斑马纹已切换', 'info');
  }
};

window.toggleTableBorder = function() {
  const t = document.getElementById('demoTable1');
  if (t) {
    t.style.border = t.style.border ? '' : '1px solid var(--border-base)';
    if (window.showToast) window.showToast('边框已切换', 'info');
  }
};

window.onTableSelectAll = function(masterCb) {
  const cbs = document.querySelectorAll('.table-row-cb');
  cbs.forEach(cb => cb.checked = masterCb.checked);
  window.onTableRowSelect();
};

window.onTableRowSelect = function() {
  const body = document.getElementById('tableSelectBody');
  const cbs = document.querySelectorAll('.table-row-cb');
  const checked = Array.from(cbs).filter(cb => cb.checked).length;
  const tip = document.getElementById('tableSelTip');
  if (tip) tip.innerText = `已勾选: ${checked} / ${cbs.length} 项`;
  const master = document.getElementById('tableSelectAll');
  if (master) master.checked = checked === cbs.length && cbs.length > 0;

  // Check if Table is Empty and show Empty State Placeholder
  if (body) {
    const rows = body.querySelectorAll('tr:not(#tableEmptyRow)');
    let emptyRow = document.getElementById('tableEmptyRow');
    if (rows.length === 0) {
      if (!emptyRow) {
        emptyRow = document.createElement('tr');
        emptyRow.id = 'tableEmptyRow';
        emptyRow.innerHTML = `
          <td colspan="5" style="text-align:center; padding:36px 16px; color:var(--text-secondary); background:var(--bg-surface);">
            <div style="font-size:38px; margin-bottom:8px; opacity:0.65;">📭</div>
            <div style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:6px;">暂无数据 (No Data)</div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:14px;">当前表格数据已全部清空或未查询到匹配项</div>
            <button class="g-btn g-btn-primary" style="font-size:11.5px; padding:4px 14px; margin:0 auto;" onclick="window.resetDemoTableData()">
              🔄 恢复默认测试数据
            </button>
          </td>
        `;
        body.appendChild(emptyRow);
      }
    } else if (emptyRow) {
      emptyRow.remove();
    }
  }
};

window.resetDemoTableData = function() {
  const body = document.getElementById('tableSelectBody');
  if (!body) return;
  body.innerHTML = `
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">💎 远古泰坦龙晶</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">5,000</td>
      <td style="padding:10px 12px;">99+</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 远古泰坦龙晶', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">🧪 特效神圣生命药水</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">120</td>
      <td style="padding:10px 12px;">500</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 特效神圣生命药水', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-base);">
      <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
      <td style="padding:10px 12px; font-weight:600;">📜 禁忌回城卷轴</td>
      <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">800</td>
      <td style="padding:10px 12px;">32</td>
      <td style="padding:10px 12px; text-align:right;">
        <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 禁忌回城卷轴', 'info')">上架</button>
        <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
      </td>
    </tr>
  `;
  window.onTableRowSelect();
  if (window.showToast) window.showToast('已恢复默认道具测试数据！', 'success');
};

window.batchDeleteTable = function() {
  const cbs = document.querySelectorAll('.table-row-cb:checked');
  if (cbs.length === 0) {
    if (window.showToast) window.showToast('请先勾选需要移出的项！', 'warning');
    return;
  }
  cbs.forEach(cb => {
    const row = cb.closest('tr');
    if (row) row.remove();
  });
  window.onTableRowSelect();
  if (window.showToast) window.showToast(`已批量移出 ${cbs.length} 项！`, 'info');
};

window.isTablePriceAsc = false;
window.sortTableByPrice = function() {
  window.isTablePriceAsc = !window.isTablePriceAsc;
  const body = document.getElementById('tableSelectBody');
  if (!body) return;
  const rows = Array.from(body.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const pA = parseInt(a.children[2].innerText.replace(/,/g, ''), 10) || 0;
    const pB = parseInt(b.children[2].innerText.replace(/,/g, ''), 10) || 0;
    return window.isTablePriceAsc ? pA - pB : pB - pA;
  });
  rows.forEach(r => body.appendChild(r));
  if (window.showToast) window.showToast(`已按单价【${window.isTablePriceAsc ? '升序 ↑' : '降序 ↓'}】排序`, 'info');
};

window.onTableV2Scroll = function(container) {
  if (!container) return;
  const ROW_HEIGHT = 36;
  const TOTAL_ROWS = 100000;
  const VISIBLE_COUNT = 8;
  const BUFFER = 2;

  const scrollTop = container.scrollTop;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = Math.min(TOTAL_ROWS, startIndex + VISIBLE_COUNT + BUFFER * 2);

  const content = document.getElementById('tableV2Content');
  if (!content) return;

  content.style.transform = 'translateY(' + (startIndex * ROW_HEIGHT) + 'px)';

  const factions = ['联盟', '部落', '中立', '虚空', '龙族'];
  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    const rank = i + 1;
    const score = (5000000 - i * 42.5).toFixed(0);
    const faction = factions[i % factions.length];
    const floor = 1000 - Math.floor(i / 100);
    let bg = rank <= 3 ? 'background:rgba(24,160,88,0.08);' : (i % 2 === 1 ? 'background:rgba(0,0,0,0.02);' : 'background:var(--bg-surface);');

    html += '<div style=\"height:' + ROW_HEIGHT + 'px; ' + bg + ' border-bottom:1px solid var(--border-base); padding:0 12px; display:flex; align-items:center; font-size:12px;\">';
    html += '  <div style=\"width:70px; font-weight:700;\">' + (rank <= 3 ? '🏆 #' + rank : '#' + rank) + '</div>';
    html += '  <div style=\"width:140px; font-weight:600;\">冒险者_' + (i % 8999 + 1000) + '</div>';
    html += '  <div style=\"width:90px;\"><span class=\"g-tag g-tag-primary\" style=\"font-size:10px; padding:1px 5px;\">' + faction + '</span></div>';
    html += '  <div style=\"width:110px; font-family:var(--font-mono);\">第 ' + floor + ' 层</div>';
    html += '  <div style=\"flex:1; text-align:right; font-weight:700; color:#e6a23c; font-family:var(--font-mono);\">' + score + ' pts</div>';
    html += '</div>';
  }

  content.innerHTML = html;
};

window.scrollTableV2To = function(rowIdx) {
  const container = document.getElementById('tableV2Container');
  if (container) {
    const ROW_HEIGHT = 36;
    container.scrollTop = rowIdx * ROW_HEIGHT;
    window.onTableV2Scroll(container);
    if (window.showToast) window.showToast(`TableV2 已极速定位至第 ${rowIdx + 1} 行`, 'info');
  }
};

