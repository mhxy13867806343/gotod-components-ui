// =========================================================================
// Gotod Components UI - Feedback & Overlay Simulators (Popover, ActionSheet, Stepper, Picker, Tour, Toast)
// =========================================================================
// 1. GPopover Simulator Helper
window.toggleSimPopover = function(btn, options = {}) {
  const wrapper = btn.parentElement;
  if (!wrapper) return;
  const bubble = wrapper.querySelector('.g-popover-bubble');
  if (!bubble) return;

  const isOpen = bubble.classList.contains('active');
  document.querySelectorAll('.g-popover-bubble.active').forEach(b => b.classList.remove('active'));

  if (!isOpen) {
    bubble.classList.add('active');
    if (options.theme === 'light') {
      bubble.classList.add('light');
    } else {
      bubble.classList.remove('light');
    }
    showToast('GPopover 气泡已展开', 'info');
  }
};

// 2. GActionSheet Simulator Helper
window.openSimActionSheet = function(options = {}) {
  const mask = document.getElementById('simActionSheetMask');
  const header = document.getElementById('simActionSheetHeader');
  const list = document.getElementById('simActionSheetList');
  if (!mask || !list) return;

  if (options.title) {
    header.innerText = options.title;
    header.style.display = 'block';
  } else {
    header.style.display = 'none';
  }

  const items = options.actions || [
    { name: '微信好友分享' },
    { name: '朋友圈生成' },
    { name: '复制商品链接' },
    { name: '删除该条目', danger: true }
  ];

  list.innerHTML = items.map((item, idx) => `
    <div class="g-action-sheet-item ${item.danger ? 'danger' : ''}" onclick="closeSimActionSheet(); showToast('已触发: ${item.name}', '${item.danger ? 'danger' : 'success'}');">
      ${item.name}
    </div>
  `).join('');

  mask.style.display = 'block';
  mask.classList.add('active');
  showToast('GActionSheet 动作面板已呼出', 'info');
};

window.closeSimActionSheet = function() {
  const mask = document.getElementById('simActionSheetMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// 3. GStepper Helper
window.stepperChange = function(containerId, delta, min = 1, max = 99) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const input = container.querySelector('.g-stepper-input');
  if (!input) return;

  let val = parseInt(input.value || '1') + delta;
  val = Math.max(min, Math.min(max, val));
  input.value = val;
  showToast(`GStepper 值变更为: ${val}`, 'info');
};

// 4. GPicker Simulator Helper
let currentPickerCallback = null;
let currentPickerSelected = 0;
let currentPickerOptions = [];

window.openSimPicker = function(options = {}) {
  const mask = document.getElementById('simPickerMask');
  const title = document.getElementById('simPickerTitle');
  const list = document.getElementById('simPickerList');
  if (!mask || !list) return;

  title.innerText = options.title || '请选择';
  currentPickerOptions = options.columns || ['狂暴战士 (Warrior)', '奥术法师 (Mage)', '神圣牧师 (Priest)', '暗影刺客 (Rogue)', '猎魔射手 (Hunter)'];
  currentPickerSelected = options.defaultIndex || 0;
  currentPickerCallback = options.onConfirm || null;

  renderPickerList();
  mask.style.display = 'block';
  mask.classList.add('active');
  showToast('GPicker 滚轮选择器已开启', 'info');
};

function renderPickerList() {
  const list = document.getElementById('simPickerList');
  if (!list) return;
  list.innerHTML = currentPickerOptions.map((opt, idx) => `
    <div class="g-picker-item ${idx === currentPickerSelected ? 'selected' : ''}" onclick="selectSimPickerOption(${idx})">
      ${opt}
    </div>
  `).join('');
}

window.selectSimPickerOption = function(idx) {
  currentPickerSelected = idx;
  renderPickerList();
};

window.confirmSimPicker = function() {
  const chosen = currentPickerOptions[currentPickerSelected];
  if (currentPickerCallback) currentPickerCallback(chosen, currentPickerSelected);
  closeSimPicker();
  showToast(`GPicker 已选定: ${chosen}`, 'success');
};

window.closeSimPicker = function() {
  const mask = document.getElementById('simPickerMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// 5. GTour Simulator Helper
let tourSteps = [];
let tourCurrentIdx = 0;

window.openSimTour = function(steps = []) {
  tourSteps = steps.length > 0 ? steps : [
    { title: '1. 快速检索与命令面板', desc: '按 Ctrl+K 即可随时激活全库 28+ 组件与 API 即时搜索！' },
    { title: '2. 风格与主题预设', desc: '在右下角悬浮切换 Naive / Element / Ant / Vant UI 4 套官方主题。' },
    { title: '3. 游戏实战与工坊模板', desc: '左侧顶部切换至“游戏实战案例”，即刻体验背包与角色系统！' }
  ];
  tourCurrentIdx = 0;
  updateTourStepDOM();

  const mask = document.getElementById('simTourMask');
  if (mask) {
    mask.style.display = 'block';
    mask.classList.add('active');
  }
  showToast('新手漫游式引导 (GTour) 已启动！', 'info');
};

function updateTourStepDOM() {
  const title = document.getElementById('simTourTitle');
  const desc = document.getElementById('simTourDesc');
  const indicator = document.getElementById('simTourStepsIndicator');
  const prevBtn = document.getElementById('simTourPrevBtn');
  const nextBtn = document.getElementById('simTourNextBtn');
  const popover = document.getElementById('simTourPopover');

  if (!title || !desc) return;
  const cur = tourSteps[tourCurrentIdx];
  title.innerText = cur.title;
  desc.innerText = cur.desc;
  if (indicator) indicator.innerText = `${tourCurrentIdx + 1} / ${tourSteps.length}`;
  if (prevBtn) prevBtn.style.display = tourCurrentIdx === 0 ? 'none' : 'inline-block';
  if (nextBtn) nextBtn.innerText = tourCurrentIdx === tourSteps.length - 1 ? '完成引导' : '下一步';

  // Position popover
  if (popover) {
    popover.style.top = '40%';
    popover.style.left = '50%';
    popover.style.transform = 'translate(-50%, -50%)';
  }
}

window.nextSimTourStep = function() {
  if (tourCurrentIdx < tourSteps.length - 1) {
    tourCurrentIdx++;
    updateTourStepDOM();
  } else {
    closeSimTour();
    showToast('🎉 恭喜完成新手漫游引导！', 'success');
  }
};

window.prevSimTourStep = function() {
  if (tourCurrentIdx > 0) {
    tourCurrentIdx--;
    updateTourStepDOM();
  }
};

window.closeSimTour = function() {
  const mask = document.getElementById('simTourMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// ==========================================
// Vant UI Style GToast Simulator Helper
// ==========================================
let simToastTimer = null;
window.openSimToast = function(opts) {
  if (typeof opts === 'string') opts = { message: opts };
  const message = opts.message || '轻提示内容';
  const type = opts.type || 'text';
  const duration = opts.duration !== undefined ? opts.duration : 2000;
  const position = opts.position || 'middle';
  const forbidClick = !!opts.forbidClick;
  const icon = opts.icon;

  const mask = document.getElementById('simToastMask');
  const box = document.getElementById('simToastBox');
  if (!mask || !box) return;

  if (simToastTimer) clearTimeout(simToastTimer);

  mask.className = 'g-toast-mask active';
  if (forbidClick) mask.classList.add('forbid-click');
  if (position === 'top') mask.classList.add('pos-top');
  else if (position === 'bottom') mask.classList.add('pos-bottom');
  mask.style.display = 'flex';

  let iconHtml = '';
  let isWithIcon = false;
  if (type === 'success') {
    iconHtml = '<div class="g-toast-icon" style="color:var(--success);"><i class="fa-solid fa-circle-check"></i></div>';
    isWithIcon = true;
  } else if (type === 'fail') {
    iconHtml = '<div class="g-toast-icon" style="color:var(--danger);"><i class="fa-solid fa-circle-xmark"></i></div>';
    isWithIcon = true;
  } else if (type === 'loading') {
    iconHtml = '<div class="g-toast-spinner"></div>';
    isWithIcon = true;
  } else if (icon) {
    iconHtml = `<div class="g-toast-icon" style="color:var(--primary);">${icon}</div>`;
    isWithIcon = true;
  }

  box.className = 'g-toast-box' + (isWithIcon ? ' with-icon' : '');
  box.innerHTML = `
    ${iconHtml}
    <div id="simToastMsg">${message}</div>
  `;

  if (duration > 0) {
    simToastTimer = setTimeout(() => {
      window.closeSimToast();
    }, duration);
  }
};

let simToastCountdownInterval = null;
window.runSimToastCountdown = function() {
  let second = 3;
  if (simToastCountdownInterval) clearInterval(simToastCountdownInterval);
  window.openSimToast({
    message: `倒计时 ${second} 秒`,
    type: 'loading',
    forbidClick: true,
    duration: 0
  });
  simToastCountdownInterval = setInterval(() => {
    second--;
    if (second > 0) {
      const msgEl = document.getElementById('simToastMsg');
      if (msgEl) msgEl.innerText = `倒计时 ${second} 秒`;
    } else {
      clearInterval(simToastCountdownInterval);
      window.openSimToast({
        message: '执行完成！',
        type: 'success',
        duration: 1500
      });
    }
  }, 1000);
};

window.closeSimToast = function() {
  if (simToastCountdownInterval) clearInterval(simToastCountdownInterval);
  const mask = document.getElementById('simToastMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

// ==========================================
// Fullscreen GLoading Simulator Helper
// ==========================================
let simLoadingTimer = null;
window.openSimLoading = function(opts) {
  if (typeof opts === 'string') opts = { text: opts };
  opts = opts || {};
  const text = opts.text || opts.message || '正在同步服务器数据...';
  const duration = opts.duration !== undefined ? opts.duration : 2500;
  
  let mask = document.getElementById('simLoadingMask');
  if (!mask) {
    mask = document.createElement('div');
    mask.id = 'simLoadingMask';
    mask.className = 'g-loading-fullscreen-mask';
    mask.onclick = window.closeSimLoading;
    document.body.appendChild(mask);
  }

  mask.innerHTML = `
    <div class="g-loading-fullscreen-card" onclick="event.stopPropagation()">
      <div class="g-loading-ring"></div>
      <div class="g-loading-fullscreen-text">${text}</div>
      <div style="font-size:11px; color:var(--text-disabled); margin-top:4px;">点击背景可手动关闭</div>
    </div>
  `;
  mask.style.display = 'flex';

  if (simLoadingTimer) clearTimeout(simLoadingTimer);
  if (duration > 0) {
    simLoadingTimer = setTimeout(() => {
      window.closeSimLoading();
    }, duration);
  }
};

window.closeSimLoading = function() {
  if (simLoadingTimer) clearTimeout(simLoadingTimer);
  const mask = document.getElementById('simLoadingMask');
  if (mask) {
    mask.style.display = 'none';
  }
};

// ==========================================
// 1. Real GDialog / GModal Interactive Simulator
// ==========================================
let simDialogCallback = null;
window.openSimModalDialog = function(opts, customTitle, onConfirm) {
  if (typeof opts === 'string') {
    opts = { message: opts, title: customTitle || '系统确认', onConfirm: onConfirm };
  }
  opts = opts || {};
  const title = opts.title || '系统确认';
  const message = opts.message || opts.content || '是否确认执行此项操作？';
  const confirmText = opts.confirmText || opts.confirm_text || '确认开启';
  const cancelText = opts.cancelText || opts.cancel_text || '取消';
  const showCancel = opts.showCancel !== false && opts.show_cancel !== false;
  simDialogCallback = opts.onConfirm || onConfirm || null;

  let mask = document.getElementById('simDialogModalMask');
  if (!mask) {
    mask = document.createElement('div');
    mask.id = 'simDialogModalMask';
    mask.className = 'g-dialog-modal-mask';
    mask.onclick = window.closeSimModalDialog;
    document.body.appendChild(mask);
  }

  mask.innerHTML = `
    <div class="g-dialog-modal-card" onclick="event.stopPropagation()">
      <div class="g-dialog-modal-header">
        <span>${title}</span>
        <i class="fa-solid fa-xmark" style="cursor:pointer; color:var(--text-secondary); font-size:14px;" onclick="window.closeSimModalDialog()"></i>
      </div>
      <div class="g-dialog-modal-body">
        ${message}
      </div>
      <div class="g-dialog-modal-footer">
        ${showCancel ? `<button class="g-btn g-btn-default" onclick="window.closeSimModalDialog()">${cancelText}</button>` : ''}
        <button class="g-btn g-btn-primary" onclick="window.confirmSimModalDialog()">${confirmText}</button>
      </div>
    </div>
  `;
  mask.style.display = 'flex';
};

window.confirmSimModalDialog = function() {
  if (simDialogCallback && typeof simDialogCallback === 'function') {
    simDialogCallback();
  } else {
    showToast('对话框操作已确认！', 'success');
  }
  window.closeSimModalDialog();
};

window.closeSimModalDialog = function() {
  const mask = document.getElementById('simDialogModalMask');
  if (mask) mask.style.display = 'none';
};

// ==========================================
// 2. Real GOverlay Interactive Simulator
// ==========================================
window.openSimOverlay = function(opts) {
  if (typeof opts === 'string') opts = { content: opts };
  opts = opts || {};
  const content = opts.content || '';

  let mask = document.getElementById('simOverlayMask');
  if (!mask) {
    mask = document.createElement('div');
    mask.id = 'simOverlayMask';
    mask.className = 'g-overlay-fullscreen-mask';
    mask.onclick = window.closeSimOverlay;
    document.body.appendChild(mask);
  }

  if (content) {
    mask.innerHTML = `
      <div class="g-overlay-center-box" onclick="event.stopPropagation()">
        ${content}
        <div style="margin-top:12px;">
          <button class="g-btn g-btn-primary" style="font-size:11px; padding:2px 10px;" onclick="window.closeSimOverlay()">关闭遮罩</button>
        </div>
      </div>
    `;
  } else {
    mask.innerHTML = `
      <div style="color:#fff; font-size:14px; text-align:center; padding:20px;">
        <i class="fa-solid fa-hand-pointer" style="font-size:24px; margin-bottom:8px; display:block;"></i>
        全屏半透明遮罩层已展开，点击任意区域平滑关闭
      </div>
    `;
  }
  mask.style.display = 'flex';
};

window.closeSimOverlay = function() {
  const mask = document.getElementById('simOverlayMask');
  if (mask) mask.style.display = 'none';
};

// ==========================================
// 3. Real GPopup Interactive Simulator
// ==========================================
window.openSimPopup = function(pos = 'center', title = 'Popup 弹出层', content = '这是一个弹出的浮动层内容') {
  let mask = document.getElementById('simPopupMask');
  if (!mask) {
    mask = document.createElement('div');
    mask.id = 'simPopupMask';
    mask.className = 'g-popup-fullscreen-mask';
    mask.onclick = window.closeSimPopup;
    document.body.appendChild(mask);
  }

  mask.innerHTML = `
    <div class="g-popup-panel pos-${pos}" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:700; font-size:14px; color:var(--text-primary);">${title}</span>
        <i class="fa-solid fa-xmark" style="cursor:pointer; color:var(--text-secondary);" onclick="window.closeSimPopup()"></i>
      </div>
      <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
        ${content}
      </div>
      <div style="margin-top:14px; text-align:right;">
        <button class="g-btn g-btn-primary" style="font-size:11px; padding:3px 12px;" onclick="window.closeSimPopup()">我知道了</button>
      </div>
    </div>
  `;
  mask.style.display = 'block';
};

window.closeSimPopup = function() {
  const mask = document.getElementById('simPopupMask');
  if (mask) mask.style.display = 'none';
};

