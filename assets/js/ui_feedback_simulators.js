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

window.closeSimToast = function() {
  const mask = document.getElementById('simToastMask');
  if (mask) {
    mask.classList.remove('active');
    mask.style.display = 'none';
  }
};

