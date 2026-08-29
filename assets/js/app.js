// ==========================================
// Gotod Components UI - Interactive Docs Engine
// Inspired by Naive UI, Element Plus, AntD, Vant UI
// ==========================================

// Global Theme & Mode Manager
window.changePreset = function(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  showToast('Theme switched to: ' + preset.toUpperCase() + ' design tokens', 'info');
};

window.toggleTheme = function() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  document.getElementById('themeText').innerText = next === 'dark' ? 'Dark' : 'Light';
};

// Toast Floating Message System
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

// Copy Code
window.copyCode = function(btn, codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    btn.style.background = 'var(--primary)';
    showToast('GDScript snippet copied to clipboard!', 'success');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
    }, 2000);
  });
};

// Modal Dialog Controls
window.openDialog = function(title, body) {
  document.getElementById('dialogTitle').innerText = title || 'Dialog Modal';
  document.getElementById('dialogBody').innerText = body || 'Dialog Content';
  document.getElementById('dialogModal').classList.add('active');
};
window.closeDialog = function(e) {
  if (e.target.id === 'dialogModal') closeDialogDirect();
};
window.closeDialogDirect = function() {
  document.getElementById('dialogModal').classList.remove('active');
};
window.confirmDialog = function() {
  closeDialogDirect();
  showToast('Dialog operation confirmed!', 'success');
};

// Drawer Controls
window.openDrawer = function(placement) {
  const drawerBox = document.querySelector('.g-drawer-box');
  if (drawerBox && placement) {
    if (placement === 'left') {
      document.getElementById('drawerModal').style.justifyContent = 'flex-start';
    } else {
      document.getElementById('drawerModal').style.justifyContent = 'flex-end';
    }
  }
  document.getElementById('drawerModal').classList.add('active');
};
window.closeDrawer = function(e) {
  if (e.target.id === 'drawerModal') closeDrawerDirect();
};
window.closeDrawerDirect = function() {
  document.getElementById('drawerModal').classList.remove('active');
};

// Tabs Switching Helper
window.switchTabDemo = function(tabIndex, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabs = container.querySelectorAll('.sim-tab-header');
  const panels = container.querySelectorAll('.sim-tab-panel');
  
  tabs.forEach((tab, idx) => {
    const isActive = (idx === tabIndex);
    tab.classList.toggle('active', isActive);
    tab.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
    tab.style.borderBottomColor = isActive ? 'var(--primary)' : 'transparent';
    tab.style.fontWeight = isActive ? '600' : 'normal';
  });

  panels.forEach((panel, idx) => {
    panel.style.display = (idx === tabIndex) ? 'block' : 'none';
  });
  showToast(`Switched to Tab ${tabIndex + 1}`, 'info');
};

// Collapse Accordion Helper
window.toggleCollapseDemo = function(headerElem) {
  const parent = headerElem.closest('.sim-collapse-item');
  const body = parent.querySelector('.sim-collapse-body');
  const arrow = parent.querySelector('.sim-collapse-arrow');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
};

// Steps Process Helper
window.changeStepDemo = function(delta) {
  const box = document.getElementById('demoStepsBox');
  if (!box) return;
  let cur = parseInt(box.getAttribute('data-step') || '1');
  cur = Math.max(1, Math.min(3, cur + delta));
  box.setAttribute('data-step', cur);
  
  for (let i = 1; i <= 3; i++) {
    const num = document.getElementById('stepNum' + i);
    const txt = document.getElementById('stepText' + i);
    const line = document.getElementById('stepLine' + i);
    if (i <= cur) {
      if (num) { num.style.background = 'var(--primary)'; num.style.color = '#fff'; num.style.borderColor = 'var(--primary)'; }
      if (txt) { txt.style.color = 'var(--text-primary)'; txt.style.fontWeight = '600'; }
    } else {
      if (num) { num.style.background = 'var(--bg-surface)'; num.style.color = 'var(--text-secondary)'; num.style.borderColor = 'var(--border-base)'; }
      if (txt) { txt.style.color = 'var(--text-disabled)'; txt.style.fontWeight = 'normal'; }
    }
    if (line) {
      line.style.background = (i < cur) ? 'var(--primary)' : 'var(--border-base)';
    }
  }
  const desc = document.getElementById('stepStatusDesc');
  if (desc) {
    const titles = ["Step 1: Configuration & Project Init", "Step 2: Theme Tokens Selection", "Step 3: Build & Export Successfully!"];
    desc.innerText = titles[cur - 1];
  }
};

// Tag Remove Helper
window.removeTagDemo = function(btn) {
  const tag = btn.closest('.g-tag');
  if (tag) {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'all 0.2s';
    setTimeout(() => tag.remove(), 200);
    showToast('Tag removed', 'info');
  }
};

// Dynamic Tag Adding
window.addDynamicTag = function() {
  const container = document.getElementById('dynamicTagBox');
  const count = container.querySelectorAll('.g-tag').length + 1;
  const newTag = document.createElement('span');
  newTag.className = 'g-tag g-tag-primary';
  newTag.innerHTML = `Tag ${count} <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button>`;
  container.appendChild(newTag);
  showToast(`Added Tag ${count}`, 'success');
};

// Checkbox Check All
window.toggleCheckAll = function(master) {
  const list = document.querySelectorAll('.cb-child');
  list.forEach(cb => cb.checked = master.checked);
  showToast(master.checked ? 'Selected all options' : 'Deselected all options', 'info');
};

// ==========================================
// Comprehensive Component Documentation & Demos
// ==========================================
const DOCS = {
  // --------------------------------------------------------
  // 1. BUTTON
  // --------------------------------------------------------
  'button': {
    title: 'Button 按钮 (GButton)',
    desc: '融合 Naive UI, Element Plus, Ant Design Vue, Vant UI 特性的通用按钮组件，支持多种色彩主题、形态样式、尺寸规格、加载动效与图标。',
    demos: [
      {
        title: '1. Basic Types 基础色彩类型 (Naive / Element / AntD / Vant)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-default" onclick="showToast('Default button clicked')">Default 默认</button>
            <button class="g-btn g-btn-primary" onclick="showToast('Primary button clicked', 'success')">Primary 主要</button>
            <button class="g-btn g-btn-success" onclick="showToast('Success button clicked', 'success')">Success 成功</button>
            <button class="g-btn g-btn-warning" onclick="showToast('Warning button clicked', 'warning')">Warning 警告</button>
            <button class="g-btn g-btn-danger" onclick="showToast('Danger button clicked', 'danger')">Danger 危险</button>
            <button class="g-btn g-btn-info" onclick="showToast('Info button clicked', 'info')">Info 信息</button>
          </div>
        `,
        code: `# GDScript: Basic Types
var btn_p = GButton.new()
btn_p.text = "Primary Button"
btn_p.button_type = GButton.ButtonType.PRIMARY
add_child(btn_p)`
      },
      {
        title: '2. Variants & Plain 变体形态 (Solid / Outline / Dashed / Text / Link)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary">Solid 实心</button>
            <button class="g-btn g-btn-outline">Outline 边框</button>
            <button class="g-btn g-btn-dashed">Dashed 虚线</button>
            <button class="g-btn g-btn-text">Text 文本</button>
            <button class="g-btn g-btn-text" style="text-decoration:underline;">Link 链接</button>
          </div>
        `,
        code: `# GDScript: Variants
var outline_btn = GButton.new()
outline_btn.text = "Outline Button"
outline_btn.variant = GButton.Variant.OUTLINE
add_child(outline_btn)`
      },
      {
        title: '3. Shapes & Pill 形状形态 (Round / Circle / Square)',
        render: `
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary g-btn-round">Round 胶囊圆角</button>
            <button class="g-btn g-btn-success g-btn-round" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-check"></i></button>
            <button class="g-btn g-btn-danger" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-trash"></i></button>
          </div>
        `,
        code: `# GDScript: Shapes
var round_btn = GButton.new()
round_btn.text = "Round Pill"
round_btn.shape = GButton.Shape.ROUND
add_child(round_btn)`
      },
      {
        title: '4. Loading & Disabled 状态 (加载中与禁用)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary"><i class="fa-solid fa-spinner fa-spin"></i> Loading 加载中</button>
            <button class="g-btn g-btn-primary" style="opacity:0.5; cursor:not-allowed;" disabled>Disabled 禁用</button>
            <button class="g-btn g-btn-default" style="opacity:0.5; cursor:not-allowed;" disabled>Disabled 默认</button>
          </div>
        `,
        code: `# GDScript: Loading & Disabled
var load_btn = GButton.new()
load_btn.text = "Submit"
load_btn.loading = true # 自动展示旋转动效并禁用交互
add_child(load_btn)`
      },
      {
        title: '5. Block Button 通栏全宽按钮 (Vant / Element 风格)',
        render: `
          <div style="width:100%; display:flex; flex-direction:column; gap:10px;">
            <button class="g-btn g-btn-primary" style="width:100%;">Block Primary Button (100% 宽度)</button>
            <button class="g-btn g-btn-default" style="width:100%;">Block Default Button</button>
          </div>
        `,
        code: `# GDScript: Block Button
var block_btn = GButton.new()
block_btn.text = "Full Width Action"
block_btn.block = true
add_child(block_btn)`
      }
    ],
    props: [
      { name: 'button_type', type: 'ButtonType', default: 'DEFAULT', desc: '色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO' },
      { name: 'variant', type: 'Variant', default: 'SOLID', desc: '表现形态：SOLID, OUTLINE, DASHED, TEXT, LINK' },
      { name: 'button_size', type: 'Size', default: 'MEDIUM', desc: '尺寸规格：SMALL, MEDIUM, LARGE' },
      { name: 'shape', type: 'Shape', default: 'DEFAULT', desc: '几何形状：DEFAULT, ROUND (胶囊), CIRCLE (圆形), SQUARE (方)' },
      { name: 'loading', type: 'bool', default: 'false', desc: '是否进入加载动画状态' },
      { name: 'block', type: 'bool', default: 'false', desc: '是否展开为全宽通栏按钮' }
    ]
  },

  // --------------------------------------------------------
  // 2. INPUT
  // --------------------------------------------------------
  'input': {
    title: 'Input 输入框 (GInput)',
    desc: '支持前后缀、一键清空、密码掩码切换、多种校验状态描边、字数限制与尺寸切换。',
    demos: [
      {
        title: '1. Basic & Clearable 基础与一键清空',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper">
              <input class="g-input" type="text" placeholder="Basic Input 请输入..." value="gotod-ui">
            </div>
            <div class="g-input-wrapper" style="position:relative;">
              <input id="demoClearInput" class="g-input" type="text" placeholder="Clearable 可清空..." value="Click clear button">
              <button onclick="document.getElementById('demoClearInput').value=''; showToast('Input cleared');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px;">×</button>
            </div>
          </div>
        `,
        code: `# GDScript: Clearable Input
var input = GInput.new()
input.placeholder_text = "Enter content..."
input.clearable = true
input.cleared.connect(func(): print("Text cleared"))
add_child(input)`
      },
      {
        title: '2. Password & Reveal 密码模式与眼睛显隐',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper" style="position:relative;">
              <input id="demoPwdInput" class="g-input" type="password" placeholder="Password input..." value="Godot4Password">
              <button onclick="let el=document.getElementById('demoPwdInput'); el.type = el.type === 'password' ? 'text' : 'password';" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;"><i class="fa-solid fa-moon"></i></button>
            </div>
          </div>
        `,
        code: `# GDScript: Password Mode
var pwd_input = GInput.new()
pwd_input.secret = true
pwd_input.show_password_toggle = true
add_child(pwd_input)`
      },
      {
        title: '3. Prefix & Suffix 前缀与后缀 (URL / 单位 / 图标)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:380px;">
            <div class="g-input-wrapper">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-right:8px;">https://</span>
              <input class="g-input" type="text" value="github.com/mhxy13867806343">
            </div>
            <div class="g-input-wrapper">
              <input class="g-input" type="text" value="100">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-left:8px;">RMB / 月</span>
            </div>
          </div>
        `,
        code: `# GDScript: Prefix & Suffix
var url_input = GInput.new()
url_input.prefix_text = "https://"
url_input.suffix_text = ".com"
add_child(url_input)`
      },
      {
        title: '4. Validation Status 校验状态描边 (Error / Warning / Success)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper" style="border-color:var(--success);">
              <input class="g-input" type="text" value="Validation Passed">
              <i class="fa-solid fa-check" style="color:var(--success);"></i>
            </div>
            <div class="g-input-wrapper" style="border-color:var(--warning);">
              <input class="g-input" type="text" value="Warning: Weak password">
              <i class="fa-solid fa-exclamation-triangle" style="color:var(--warning);"></i>
            </div>
            <div class="g-input-wrapper" style="border-color:var(--danger);">
              <input class="g-input" type="text" value="Error: Username exists">
              <i class="fa-solid fa-times-circle" style="color:var(--danger);"></i>
            </div>
          </div>
        `,
        code: `# GDScript: Status Styles
var err_input = GInput.new()
err_input.status = GInput.Status.ERROR
add_child(err_input)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '输入框绑定的文本内容' },
      { name: 'placeholder_text', type: 'String', default: '"Please input..."', desc: '占位提示文字' },
      { name: 'clearable', type: 'bool', default: 'false', desc: '是否显示一键清空按钮' },
      { name: 'secret', type: 'bool', default: 'false', desc: '是否开启密码密文模式' },
      { name: 'prefix_text', type: 'String', default: '""', desc: '前缀文本' },
      { name: 'suffix_text', type: 'String', default: '""', desc: '后缀文本' },
      { name: 'status', type: 'Status', default: 'DEFAULT', desc: '校验边框状态：DEFAULT, ERROR, WARNING, SUCCESS' }
    ]
  },

  // --------------------------------------------------------
  // 3. DIALOG / MODAL
  // --------------------------------------------------------
  'dialog': {
    title: 'Dialog / Modal 对话框 (GDialog)',
    desc: '居中弹出的模态对话框，支持半透明遮罩背景暗化、弹性进入缩放动画、自定义确认/取消操作与内嵌自定义内容。',
    demos: [
      {
        title: '1. Basic Confirmation 基础确认对话框',
        render: `
          <button class="g-btn g-btn-primary" onclick="openDialog('确认执行操作', '您确定要发布当前版本配置吗？该操作将即时同步至生产环境。')">
            打开确认弹窗
          </button>
        `,
        code: `# GDScript: Confirm Dialog
var dlg = GDialog.new()
dlg.title = "Confirm Release"
dlg.content_text = "Do you want to deploy to production?"
dlg.confirmed.connect(func(): GMessage.success("Deployed!"))
add_child(dlg)
dlg.open()`
      },
      {
        title: '2. Danger / Delete Warning 危险删除确认对话框',
        render: `
          <button class="g-btn g-btn-danger" onclick="openDialog('高风险警告', '确认彻底删除选中的 3 个项目文件吗？删除后将无法通过回收站找回！')">
            打开删除警告弹窗
          </button>
        `,
        code: `# GDScript: Danger Dialog
var danger_dlg = GDialog.new()
danger_dlg.title = "Delete File"
danger_dlg.content_text = "This action is irreversible!"
danger_dlg.confirm_button_text = "Confirm Delete"
add_child(danger_dlg)
danger_dlg.open()`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Dialog Title"', desc: '弹窗标题' },
      { name: 'content_text', type: 'String', default: '""', desc: '弹窗正文提示文本' },
      { name: 'confirm_button_text', type: 'String', default: '"Confirm"', desc: '确认按钮文字' },
      { name: 'cancel_button_text', type: 'String', default: '"Cancel"', desc: '取消按钮文字' },
      { name: 'mask_closable', type: 'bool', default: 'true', desc: '点击背景遮罩是否允许关闭' }
    ]
  },

  // --------------------------------------------------------
  // 4. MESSAGE (TOAST)
  // --------------------------------------------------------
  'message': {
    title: 'Message 全局消息提示 (GMessage)',
    desc: '全局悬浮吐司提示（Autoload 单例），在页面顶部居中堆叠展示，支持自动倒计时移除与进入/淡出动效。',
    demos: [
      {
        title: '1. Message Types 提示类型 (Success / Warning / Error / Info)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-success" onclick="showToast('保存配置成功！', 'success')">Success 成功</button>
            <button class="g-btn g-btn-warning" onclick="showToast('网络波动，正在重试连接...', 'warning')">Warning 警告</button>
            <button class="g-btn g-btn-danger" onclick="showToast('加载远程资源失败 (404)', 'danger')">Error 错误</button>
            <button class="g-btn g-btn-info" onclick="showToast('检测到新版本 1.2.0 已就绪', 'info')">Info 消息</button>
          </div>
        `,
        code: `# GDScript: Call GMessage anywhere
GMessage.success("Successfully saved!")
GMessage.warning("Network connection unstable")
GMessage.error("Resource load failed")
GMessage.info("System update available")`
      }
    ],
    props: [
      { name: 'success(content, duration)', type: 'static func', default: '3.0s', desc: '弹出成功提示' },
      { name: 'warning(content, duration)', type: 'static func', default: '3.0s', desc: '弹出警告提示' },
      { name: 'error(content, duration)', type: 'static func', default: '3.0s', desc: '弹出错误提示' },
      { name: 'info(content, duration)', type: 'static func', default: '3.0s', desc: '弹出普通消息提示' }
    ]
  },

  // --------------------------------------------------------
  // 5. TABS
  // --------------------------------------------------------
  'tabs': {
    title: 'Tabs 标签页 (GTabs)',
    desc: '多面板内容切换标签页，支持 Line 风格与 Card 风格，具备真实面板切换。',
    demos: [
      {
        title: '1. Interactive Line Tabs 实时切换（点击标题体验）',
        render: `
          <div id="demoTabsContainer" style="width:100%;">
            <div style="display:flex; gap:24px; border-bottom:1px solid var(--border-base); margin-bottom: 16px;">
              <div class="sim-tab-header active" onclick="switchTabDemo(0, 'demoTabsContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding-bottom:10px; border-bottom:2px solid var(--primary); transition:all 0.2s;">
                <i class="fa-solid fa-cube"></i> Overview 概览
              </div>
              <div class="sim-tab-header" onclick="switchTabDemo(1, 'demoTabsContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">
                <i class="fa-solid fa-shapes"></i> Properties 属性
              </div>
              <div class="sim-tab-header" onclick="switchTabDemo(2, 'demoTabsContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">
                <i class="fa-solid fa-rocket"></i> Signals 信号
              </div>
            </div>

            <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
              <h4 style="margin-bottom:8px; color:var(--primary); font-size:1.05rem;">【Panel 1】Overview 概览内容</h4>
              <p style="color:var(--text-regular); font-size:0.9rem;">GTabs 是专为 Godot 4 打造的高性能选项卡容器，支持动态 add_tab() 挂载任意 Control 派生节点。</p>
            </div>

            <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
              <h4 style="margin-bottom:8px; color:var(--info); font-size:1.05rem;">【Panel 2】Properties 属性参数</h4>
              <p style="color:var(--text-regular); font-size:0.9rem;">current_tab 属性支持双向读写与动画切换。</p>
            </div>

            <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
              <h4 style="margin-bottom:8px; color:var(--success); font-size:1.05rem;">【Panel 3】Signals 信号监听</h4>
              <p style="color:var(--text-regular); font-size:0.9rem;">每当切换标签页时自动发射 tab_changed(index) 信号。</p>
            </div>
          </div>
        `,
        code: `# GDScript: Dynamic Tabs
var tabs = GTabs.new()
tabs.add_tab("Tab 1", panel_overview)
tabs.add_tab("Tab 2", panel_settings)
tabs.tab_changed.connect(func(idx): print("Active:", idx))
add_child(tabs)`
      }
    ],
    props: [
      { name: 'type', type: 'TabType', default: 'LINE', desc: '形态：LINE (下划线), CARD (卡片), SEGMENT (胶囊药丸)' },
      { name: 'current_tab', type: 'int', default: '0', desc: '当前激活的标签页索引' }
    ]
  },

  // --------------------------------------------------------
  // 6. FORM
  // --------------------------------------------------------
  'form': {
    title: 'Form 表单布局 (GForm & GFormItem)',
    desc: '表单管理容器，支持统一设置标签对齐（Top/Left/Right）、宽度、必填校验与错误展示。',
    demos: [
      {
        title: '1. Form Layout & Validation 表单排版与校验',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:440px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 账号</span>
              <div class="g-input-wrapper" style="flex:1;"><input id="formUser" class="g-input" value="admin"></div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 密码</span>
              <div class="g-input-wrapper" style="flex:1;"><input id="formPwd" class="g-input" type="password" value="123456"></div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button class="g-btn g-btn-default" onclick="document.getElementById('formUser').value=''; document.getElementById('formPwd').value=''; showToast('Form reset');">重置</button>
              <button class="g-btn g-btn-primary" onclick="showToast('Form submitted: ' + document.getElementById('formUser').value, 'success')">提交表单</button>
            </div>
          </div>
        `,
        code: `# GDScript: Form & FormItem
var form = GForm.new()
form.label_width = 100.0

var user_item = GFormItem.new()
user_item.label = "Username"
user_item.required = true
user_item.add_child(GInput.new())
form.add_child(user_item)

add_child(form)`
      }
    ],
    props: [
      { name: 'label_position', type: 'LabelPosition', default: 'LEFT', desc: '标签对齐：LEFT, TOP, RIGHT' },
      { name: 'label_width', type: 'float', default: '120.0', desc: '统一标签宽度' }
    ]
  },

  // --------------------------------------------------------
  // 7. SWITCH
  // --------------------------------------------------------
  'switch': {
    title: 'Switch 开关 (GSwitch)',
    desc: '带平滑过渡物理缓动动效的开关组件，支持自定义选中/未选中颜色及尺寸。',
    demos: [
      {
        title: '1. Basic & Interactive Switch 动效开关',
        render: `
          <div style="display:flex; gap:24px; align-items:center;">
            <label class="g-switch">
              <input type="checkbox" checked onchange="showToast('Switch 1 state: ' + this.checked, 'success')">
              <span class="g-switch-slider"></span>
            </label>
            <label class="g-switch">
              <input type="checkbox" onchange="showToast('Switch 2 state: ' + this.checked, 'info')">
              <span class="g-switch-slider"></span>
            </label>
          </div>
        `,
        code: `# GDScript: Switch
var sw = GSwitch.new()
sw.checked = true
sw.toggled.connect(func(is_on): GMessage.info("Switch: " + str(is_on)))
add_child(sw)`
      }
    ],
    props: [
      { name: 'checked', type: 'bool', default: 'false', desc: '开关当前状态' },
      { name: 'switch_size', type: 'Size', default: 'MEDIUM', desc: '开关尺寸：SMALL, MEDIUM, LARGE' }
    ]
  },

  // --------------------------------------------------------
  // 8. CHECKBOX
  // --------------------------------------------------------
  'checkbox': {
    title: 'Checkbox 多选框 (GCheckbox & Group)',
    desc: '多选框组件，支持单独使用或配合 CheckboxGroup 数组双向绑定与全选联动。',
    demos: [
      {
        title: '1. Check All & Indeterminate 全选联动',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600;">
              <input type="checkbox" checked onchange="toggleCheckAll(this)">
              <span>Check All 全选/全不选</span>
            </label>
            <div style="display:flex; gap:16px; margin-left: 20px;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input class="cb-child" type="checkbox" checked> <span>Vue 3</span></label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input class="cb-child" type="checkbox" checked> <span>Godot 4</span></label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input class="cb-child" type="checkbox"> <span>TypeScript</span></label>
            </div>
          </div>
        `,
        code: `# GDScript: Checkbox Group
var group = GCheckboxGroup.new()
var cb1 = GCheckbox.new()
cb1.text = "Godot 4"
group.add_child(cb1)
group.value_changed.connect(func(vals): print("Selected:", vals))
add_child(group)`
      }
    ],
    props: [
      { name: 'checked', type: 'bool', default: 'false', desc: '是否勾选' },
      { name: 'text', type: 'String', default: '"Checkbox"', desc: '说明文字' },
      { name: 'indeterminate', type: 'bool', default: 'false', desc: '半选状态' }
    ]
  },

  // --------------------------------------------------------
  // 9. RADIO
  // --------------------------------------------------------
  'radio': {
    title: 'Radio 单选框 (GRadio & Group)',
    desc: '互斥单选组件，配合 GRadioGroup 自动管理选中项。',
    demos: [
      {
        title: '1. Radio Group 单选选项组',
        render: `
          <div style="display:flex; gap:20px; align-items:center;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Naive UI', 'success')"><input type="radio" name="ui_demo_radio" checked> <span>Naive UI</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Element Plus', 'success')"><input type="radio" name="ui_demo_radio"> <span>Element Plus</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Ant Design', 'success')"><input type="radio" name="ui_demo_radio"> <span>Ant Design</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Vant UI', 'success')"><input type="radio" name="ui_demo_radio"> <span>Vant UI</span></label>
          </div>
        `,
        code: `# GDScript: Radio Group
var rg = GRadioGroup.new()
var r1 = GRadio.new()
r1.text = "Naive UI"
rg.add_child(r1)
rg.value_changed.connect(func(v): print("Selected:", v))
add_child(rg)`
      }
    ],
    props: [
      { name: 'checked', type: 'bool', default: 'false', desc: '是否被选中' },
      { name: 'value', type: 'String', default: '""', desc: '选项绑定值' }
    ]
  },

  // --------------------------------------------------------
  // 10. SELECT
  // --------------------------------------------------------
  'select': {
    title: 'Select 下拉选择器 (GSelect)',
    desc: '下拉菜单选择组件，支持自定义选项列表、禁用项与一键清空。',
    demos: [
      {
        title: '1. Dropdown Select 下拉选项',
        render: `
          <div style="display:flex; align-items:center; gap:16px;">
            <select class="select-theme" style="width: 260px; height: 38px;" onchange="showToast('Selected option: ' + this.value, 'success')">
              <option value="Godot 4.3 (Forward+)">Godot 4.3 (Forward+)</option>
              <option value="Godot 4.4 (Latest)">Godot 4.4 (Latest)</option>
              <option value="Godot 4.6+ (Future)">Godot 4.6+ (Future)</option>
            </select>
          </div>
        `,
        code: `# GDScript: Select
var sel = GSelect.new()
sel.options = [
    {"label": "Godot 4.3", "value": "4.3"},
    {"label": "Godot 4.4", "value": "4.4"}
]
sel.item_selected.connect(func(idx, val, label): print("Selected:", label))
add_child(sel)`
      }
    ],
    props: [
      { name: 'options', type: 'Array[Dictionary]', default: '[]', desc: '选项数组 [{"label": "", "value": ""}]' },
      { name: 'selected_index', type: 'int', default: '-1', desc: '当前选中的索引' }
    ]
  },

  // --------------------------------------------------------
  // 11. SLIDER
  // --------------------------------------------------------
  'slider': {
    title: 'Slider 滑块 (GSlider)',
    desc: '平滑滑动条组件，支持状态色彩与自定义步长。',
    demos: [
      {
        title: '1. Smooth Value Slider 连续滑动条',
        render: `
          <div style="width: 320px;">
            <input type="range" min="0" max="100" value="68" style="width:100%; cursor:pointer;" oninput="document.getElementById('sliderVal').innerText = this.value">
            <div style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 8px;">
              当前滑块数值: <span id="sliderVal" style="color: var(--primary); font-weight:700; font-size:1.1rem;">68</span>%
            </div>
          </div>
        `,
        code: `# GDScript: Slider
var slider = GSlider.new()
slider.value = 68
slider.value_changed.connect(func(v): print("Slider:", v))
add_child(slider)`
      }
    ],
    props: [
      { name: 'value', type: 'float', default: '0.0', desc: '当前滑块数值' },
      { name: 'status', type: 'Status', default: 'PRIMARY', desc: '高亮状态色彩' }
    ]
  },

  // --------------------------------------------------------
  // 12. ALERT
  // --------------------------------------------------------
  'alert': {
    title: 'Alert 警告提示 (GAlert)',
    desc: '页内醒目的状态横幅提示，支持带有状态色彩与关闭按钮。',
    demos: [
      {
        title: '1. Banner Statuses 4类提示横幅',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div class="g-alert-box g-alert-info"><span><i class="fa-solid fa-info-circle"></i> Info: 系统将于今晚 24:00 进行例行维护升级。</span></div>
            <div class="g-alert-box g-alert-success"><span><i class="fa-solid fa-check-circle"></i> Success: 组件库已成功加载至 Godot 引擎！</span></div>
            <div class="g-alert-box g-alert-warning"><span><i class="fa-solid fa-exclamation-triangle"></i> Warning: 请注意检查网络代理连接状态。</span></div>
            <div class="g-alert-box g-alert-danger"><span><i class="fa-solid fa-times-circle"></i> Error: 发生未知异常，请重试。</span></div>
          </div>
        `,
        code: `# GDScript: Alert
var alert = GAlert.new()
alert.type = GThemeTokens.Status.SUCCESS
alert.title = "Loaded Successfully"
alert.closable = true
add_child(alert)`
      }
    ],
    props: [
      { name: 'type', type: 'Status', default: 'INFO', desc: '类型：INFO, SUCCESS, WARNING, DANGER' },
      { name: 'title', type: 'String', default: '"Alert Title"', desc: '标题文本' },
      { name: 'closable', type: 'bool', default: 'false', desc: '是否显示关闭按钮' }
    ]
  },

  // --------------------------------------------------------
  // 13. DRAWER
  // --------------------------------------------------------
  'drawer': {
    title: 'Drawer 抽屉 (GDrawer)',
    desc: '滑出的浮层面板，支持从屏幕右侧/左侧/顶部/底部展开。',
    demos: [
      {
        title: '1. Directional Drawers 抽屉面板',
        render: `
          <div style="display:flex; gap:12px;">
            <button class="g-btn g-btn-primary" onclick="openDrawer('right')">打开右侧抽屉</button>
            <button class="g-btn g-btn-default" onclick="openDrawer('left')">打开左侧抽屉</button>
          </div>
        `,
        code: `# GDScript: Drawer
var drawer = GDrawer.new()
drawer.title = "Configuration Panel"
drawer.placement = GDrawer.Placement.RIGHT
add_child(drawer)
drawer.open()`
      }
    ],
    props: [
      { name: 'placement', type: 'Placement', default: 'RIGHT', desc: '展开方向：RIGHT, LEFT, TOP, BOTTOM' },
      { name: 'drawer_size', type: 'float', default: '360.0', desc: '抽屉尺寸' }
    ]
  },

  // --------------------------------------------------------
  // 14. CARD
  // --------------------------------------------------------
  'card': {
    title: 'Card 卡片 (GCard)',
    desc: '基础内容容器卡片，支持标题栏、Extra 扩展操作区与阴影边框。',
    demos: [
      {
        title: '1. Content Card 基础卡片',
        render: `
          <div class="sim-card">
            <div class="sim-card-header">
              <span>Card Title 卡片标题</span>
              <a href="javascript:void(0)" style="color:var(--primary); font-size:0.85rem; text-decoration:none;" onclick="showToast('Extra action clicked')">More 更多</a>
            </div>
            <div style="color:var(--text-secondary); font-size:0.9rem;">
              gotod-components-ui provides comprehensive components for Godot 4.x game and app development.
            </div>
          </div>
        `,
        code: `# GDScript: Card
var card = GCard.new()
card.title = "User Card"
card.extra_text = "Edit"
add_child(card)`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Card Title"', desc: '卡片标题' },
      { name: 'bordered', type: 'bool', default: 'true', desc: '是否带有边框' }
    ]
  },

  // --------------------------------------------------------
  // 15. TAG
  // --------------------------------------------------------
  'tag': {
    title: 'Tag 标签 (GTag)',
    desc: '用于标记和分类的微型标签组件，支持 Light, Outline, Solid 三种质感及动态添加/关闭操作。',
    demos: [
      {
        title: '1. Dynamic Tags 动态添加与删除',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div id="dynamicTagBox" style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <span class="g-tag g-tag-primary">Godot 4.x <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button></span>
              <span class="g-tag g-tag-success">Vue UI <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button></span>
              <span class="g-tag g-tag-warning">Naive UI</span>
            </div>
            <div>
              <button class="g-btn g-btn-default" onclick="addDynamicTag()">+ New Tag 新增标签</button>
            </div>
          </div>
        `,
        code: `# GDScript: Tag
var tag = GTag.new()
tag.text = "Godot 4.x"
tag.type = GThemeTokens.Status.PRIMARY
tag.closable = true
add_child(tag)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Tag"', desc: '标签文本' },
      { name: 'type', type: 'Status', default: 'DEFAULT', desc: '色彩类型' },
      { name: 'closable', type: 'bool', default: 'false', desc: '是否显示关闭叉号' }
    ]
  },

  // --------------------------------------------------------
  // 16. BADGE
  // --------------------------------------------------------
  'badge': {
    title: 'Badge 徽标 (GBadge)',
    desc: '挂载在控件右上角的小红点或数字徽标，支持 99+ 溢出保护。',
    demos: [
      {
        title: '1. Count & Dot Badges 数量与圆点徽标',
        render: `
          <div style="display:flex; gap:28px; align-items:center;">
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default" onclick="showToast('Notification badge clicked')">Notifications</button>
              <span style="position:absolute; top:-6px; right:-6px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:99px; font-weight:700;">99+</span>
            </div>
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default" onclick="showToast('Message dot clicked')">Messages</button>
              <span style="position:absolute; top:-3px; right:-3px; background:var(--danger); width:8px; height:8px; border-radius:50%;"></span>
            </div>
          </div>
        `,
        code: `# GDScript: Badge
var badge = GBadge.new()
badge.value = 100
badge.max_value = 99
add_child(badge)`
      }
    ],
    props: [
      { name: 'value', type: 'int', default: '0', desc: '徽标数字' },
      { name: 'max_value', type: 'int', default: '99', desc: '超出显示 max_value+' },
      { name: 'is_dot', type: 'bool', default: 'false', desc: '是否仅展示红点' }
    ]
  },

  // --------------------------------------------------------
  // 17. PROGRESS
  // --------------------------------------------------------
  'progress': {
    title: 'Progress 进度条 (GProgress)',
    desc: '展示操作或数值进度的组件，支持线性条状与圆形环状展示。',
    demos: [
      {
        title: '1. Progress Statuses 多状态进度条',
        render: `
          <div style="width: 100%; display: flex; flex-direction: column; gap: 14px;">
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 45%;"></div></div>
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 80%; background: var(--success);"></div></div>
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 60%; background: var(--warning);"></div></div>
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 100%; background: var(--danger);"></div></div>
          </div>
        `,
        code: `# GDScript: Progress
var p = GProgress.new()
p.percentage = 80.0
p.status = GThemeTokens.Status.SUCCESS
add_child(p)`
      }
    ],
    props: [
      { name: 'percentage', type: 'float', default: '0.0', desc: '进度百分比 (0~100)' },
      { name: 'type', type: 'ProgressType', default: 'LINE', desc: 'LINE (线性), CIRCLE (圆形)' }
    ]
  },

  // --------------------------------------------------------
  // 18. COLLAPSE
  // --------------------------------------------------------
  'collapse': {
    title: 'Collapse 折叠面板 (GCollapse)',
    desc: '可折叠收起的手风琴面板，用于收纳大量分组设置项。',
    demos: [
      {
        title: '1. Interactive Accordion 折叠手风琴（点击标题展开/收起）',
        render: `
          <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
            <div class="sim-collapse-item" style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
              <div onclick="toggleCollapseDemo(this)" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; cursor:pointer; font-weight:600;">
                <span>Group 1: Basic Preferences 基础设置</span>
                <span class="sim-collapse-arrow" style="font-size:12px; color:var(--text-secondary); transition:transform 0.2s; transform:rotate(90deg);">▶</span>
              </div>
              <div class="sim-collapse-body" style="display:block; padding:14px 16px; border-top:1px solid var(--border-base); color:var(--text-regular); font-size:0.88rem; background:var(--bg-card);">
                折叠面板 1 内容：支持在运行时动态展开与收起。
              </div>
            </div>
            <div class="sim-collapse-item" style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
              <div onclick="toggleCollapseDemo(this)" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; cursor:pointer; font-weight:600;">
                <span>Group 2: Advanced Rendering 高级渲染配置</span>
                <span class="sim-collapse-arrow" style="font-size:12px; color:var(--text-secondary); transition:transform 0.2s;">▶</span>
              </div>
              <div class="sim-collapse-body" style="display:none; padding:14px 16px; border-top:1px solid var(--border-base); color:var(--text-regular); font-size:0.88rem; background:var(--bg-card);">
                折叠面板 2 内容：默认处于折叠隐藏状态。
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Collapse
var col = GCollapse.new()
col.title = "Advanced Options"
col.is_open = true
add_child(col)`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Collapse Title"', desc: '标题' },
      { name: 'is_open', type: 'bool', default: 'false', desc: '是否展开' }
    ]
  },

  // --------------------------------------------------------
  // 19. STEPS
  // --------------------------------------------------------
  'steps': {
    title: 'Steps 步骤条 (GSteps)',
    desc: '分步引导进度条，清晰展示当前进行到的步骤环节。',
    demos: [
      {
        title: '1. Interactive Step Process 步骤流向（点击前进/后退）',
        render: `
          <div style="width:100%; display:flex; flex-direction:column; gap:20px;">
            <div id="demoStepsBox" data-step="1" style="display:flex; align-items:center; gap:16px; width:100%;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span id="stepNum1" style="width:26px; height:26px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; border:1px solid var(--primary);">1</span>
                <span id="stepText1" style="color:var(--text-primary); font-weight:600; font-size:0.88rem;">Setup</span>
              </div>
              <div id="stepLine1" style="flex:1; height:2px; background:var(--border-base);"></div>

              <div style="display:flex; align-items:center; gap:8px;">
                <span id="stepNum2" style="width:26px; height:26px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); color:var(--text-secondary); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700;">2</span>
                <span id="stepText2" style="color:var(--text-disabled); font-size:0.88rem;">Theme</span>
              </div>
              <div id="stepLine2" style="flex:1; height:2px; background:var(--border-base);"></div>

              <div style="display:flex; align-items:center; gap:8px;">
                <span id="stepNum3" style="width:26px; height:26px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); color:var(--text-secondary); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700;">3</span>
                <span id="stepText3" style="color:var(--text-disabled); font-size:0.88rem;">Build</span>
              </div>
            </div>

            <div style="padding:14px 18px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
              <span id="stepStatusDesc" style="color:var(--primary); font-weight:600;">Step 1: Configuration & Project Init</span>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-default" onclick="changeStepDemo(-1)">Previous 上一步</button>
                <button class="g-btn g-btn-primary" onclick="changeStepDemo(1)">Next 下一步</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Steps
var st = GSteps.new()
st.steps = ["Step 1", "Step 2", "Step 3"]
st.current_step = 1
add_child(st)`
      }
    ],
    props: [
      { name: 'steps', type: 'Array[String]', default: '[]', desc: '步骤名称列表' },
      { name: 'current_step', type: 'int', default: '0', desc: '当前步骤索引' }
    ]
  },

  // --------------------------------------------------------
  // 20. SPACE
  // --------------------------------------------------------
  'space': {
    title: 'Space 间距布局 (GSpace)',
    desc: '流式弹性排版容器，自动为子节点添加均匀间距并支持自动折行 (Wrap)。',
    demos: [
      {
        title: '1. Fluid Spacing 自动间距与流式换行',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-default">Button 1</button>
            <button class="g-btn g-btn-default">Button 2</button>
            <button class="g-btn g-btn-default">Button 3</button>
            <button class="g-btn g-btn-primary">Button 4</button>
          </div>
        `,
        code: `# GDScript: Space
var sp = GSpace.new()
sp.gap = 12.0
sp.wrap = true
add_child(sp)`
      }
    ],
    props: [
      { name: 'gap', type: 'float', default: '12.0', desc: '子节点间距' },
      { name: 'wrap', type: 'bool', default: 'true', desc: '是否自动换行' }
    ]
  },

  // --------------------------------------------------------
  // 21. TEXT, DIVIDER, ICON, AVATAR, TOOLTIP, LOADING, ETC.
  // --------------------------------------------------------
  'text': {
    title: 'Text / Typography 文本 (GText)',
    desc: '排版文本组件，支持 H1~H6 标题层级、状态色、次级灰度文字与代码块字体。',
    demos: [
      {
        title: '1. Headings & Hierarchy 标题与层级',
        render: `
          <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
            <h1 style="font-size:1.8rem; margin:0;">H1 Heading 32px</h1>
            <h2 style="font-size:1.4rem; margin:0;">H2 Heading 24px</h2>
            <h3 style="font-size:1.15rem; margin:0;">H3 Heading 20px</h3>
            <p style="color:var(--text-primary); margin:0;">Body Regular 14px 基础排版正文文本。</p>
            <p style="color:var(--text-secondary); font-size:12px; margin:0;">Caption 12px 辅助说明文本。</p>
          </div>
        `,
        code: `# GDScript: Typography
var title = GText.new()
title.text = "Godot 4.x UI"
title.hierarchy = GText.Hierarchy.H1
add_child(title)`
      }
    ],
    props: [
      { name: 'text_type', type: 'TextType', default: 'DEFAULT', desc: '色彩类型' },
      { name: 'hierarchy', type: 'Hierarchy', default: 'BODY', desc: '层级' }
    ]
  },

  'divider': {
    title: 'Divider 分割线 (GDivider)',
    desc: '区隔内容的分割线，支持水平/垂直方向及标题内嵌。',
    demos: [
      {
        title: '1. Horizontal with Title 带标题分割线',
        render: `
          <div style="width:100%; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="flex:1; height:1px; background:var(--border-base);"></div>
              <span style="color:var(--text-secondary); font-size:0.85rem;">分割文本</span>
              <div style="flex:1; height:1px; background:var(--border-base);"></div>
            </div>
          </div>
        `,
        code: `# GDScript: Divider
var div = GDivider.new()
div.title = "Settings"
add_child(div)`
      }
    ],
    props: [
      { name: 'orientation', type: 'Orientation', default: 'HORIZONTAL', desc: '方向' },
      { name: 'title', type: 'String', default: '""', desc: '内嵌标题' }
    ]
  },

  'icon': {
    title: 'Icon 图标 (GIcon)',
    desc: '可自由缩放尺寸与着色的图标渲染组件。',
    demos: [
      {
        title: '1. Icon Samples 图标示例',
        render: `
          <div style="display:flex; gap:20px; align-items:center;">
            <i class="fa-solid fa-gamepad" style="font-size:26px; color:var(--primary);"></i>
            <i class="fa-solid fa-rocket" style="font-size:26px; color:var(--warning);"></i>
            <i class="fa-solid fa-heart" style="font-size:26px; color:var(--danger);"></i>
            <i class="fa-solid fa-cube" style="font-size:26px; color:var(--info);"></i>
          </div>
        `,
        code: `# GDScript: Icon
var icon = GIcon.new()
icon.icon_size = 24.0
add_child(icon)`
      }
    ],
    props: [
      { name: 'icon_size', type: 'float', default: '16.0', desc: '尺寸' }
    ]
  },

  'textarea': {
    title: 'Textarea 文本域 (GTextarea)',
    desc: '多行自适应文本编辑组件，内置字数统计与超出警示。',
    demos: [
      {
        title: '1. Multiline Editor 多行输入',
        render: `
          <div style="width:100%; max-width:440px;">
            <textarea style="width:100%; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px; color:var(--text-primary); outline:none; font-family:inherit; resize:none;">gotod-components-ui</textarea>
          </div>
        `,
        code: `# GDScript: Textarea
var ta = GTextarea.new()
ta.rows = 4
add_child(ta)`
      }
    ],
    props: [
      { name: 'rows', type: 'int', default: '4', desc: '行数' }
    ]
  },

  'input-number': {
    title: 'InputNumber 数字输入框 (GInputNumber)',
    desc: '带有加减微调按钮与数值边界约束的数字输入组件。',
    demos: [
      {
        title: '1. Step Counter 数字加减器',
        render: `
          <div style="display:inline-flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
            <button class="g-btn g-btn-default" style="border:none; border-radius:0; width:36px; padding:0;" onclick="let el=document.getElementById('numVal'); el.innerText=Math.max(0, parseInt(el.innerText)-1);">-</button>
            <span id="numVal" style="padding:0 18px; font-weight:600; min-width:40px; text-align:center;">10</span>
            <button class="g-btn g-btn-default" style="border:none; border-radius:0; width:36px; padding:0;" onclick="let el=document.getElementById('numVal'); el.innerText=Math.min(100, parseInt(el.innerText)+1);">+</button>
          </div>
        `,
        code: `# GDScript: InputNumber
var num = GInputNumber.new()
num.value = 10
add_child(num)`
      }
    ],
    props: [
      { name: 'value', type: 'float', default: '0.0', desc: '当前数值' }
    ]
  },

  'tooltip': {
    title: 'Tooltip 悬浮提示 (GTooltip)',
    desc: '轻量气泡提示组件，用于说明交互元素的附加信息。',
    demos: [
      {
        title: '1. Tooltip Hover 悬浮气泡',
        render: `
          <button class="g-btn g-btn-default" title="Tooltip details" onclick="showToast('Clicked target')">
            Hover over me 鼠标悬停查看提示
          </button>
        `,
        code: `# GDScript: Tooltip
var tip = GTooltip.new()
tip.content = "More details"
add_child(tip)`
      }
    ],
    props: [
      { name: 'content', type: 'String', default: '""', desc: '提示文本' }
    ]
  },

  'loading': {
    title: 'Loading 加载指示器 (GLoading)',
    desc: '旋转动画加载指示器，支持全屏遮罩或局部容器挂载。',
    demos: [
      {
        title: '1. Animated Spinner 旋转加载',
        render: `
          <div style="display:flex; align-items:center; gap:14px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:28px; color:var(--primary);"></i>
            <span style="color:var(--text-secondary);">Loading assets in progress...</span>
          </div>
        `,
        code: `# GDScript: Loading
var loading = GLoading.new()
add_child(loading)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Loading..."', desc: '加载提示文字' }
    ]
  },

  'avatar': {
    title: 'Avatar 头像 (GAvatar)',
    desc: '支持图片纹理、字母缩写与圆形/圆角矩形形态的用户头像组件。',
    demos: [
      {
        title: '1. Avatar Shapes 头像形态',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <div style="width:42px; height:42px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">G</div>
            <div style="width:42px; height:42px; border-radius:8px; background:var(--info); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">V</div>
          </div>
        `,
        code: `# GDScript: Avatar
var av = GAvatar.new()
av.text = "Godot"
add_child(av)`
      }
    ],
    props: [
      { name: 'avatar_size', type: 'float', default: '40.0', desc: '尺寸' }
    ]
  }
};

// Render Main Document Area
window.showDoc = function(key) {
  const doc = DOCS[key] || DOCS['button'];
  
  // Sidebar active toggle
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-key') === key);
  });

  let demosHtml = '';
  doc.demos.forEach((d) => {
    demosHtml += `
      <div class="demo-section">
        <div class="demo-section-header">
          <span class="demo-section-title">${d.title}</span>
        </div>
        <div class="demo-canvas">
          ${d.render}
        </div>
        <div class="code-box">
          <button class="btn-copy" onclick="copyCode(this, \`${d.code.replace(/`/g, '\\`')}\`)">
            <i class="fa-regular fa-copy"></i> Copy GDScript
          </button>
          <pre><code>${escapeHtml(d.code)}</code></pre>
        </div>
      </div>
    `;
  });

  let propsHtml = '';
  if (doc.props) {
    propsHtml = `
      <h3 style="margin: 32px 0 12px; font-size: 1.25rem;">Props & API 属性列表</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>Property 属性名</th>
            <th>Type 类型</th>
            <th>Default 默认值</th>
            <th>Description 说明</th>
          </tr>
        </thead>
        <tbody>
          ${doc.props.map(p => `
            <tr>
              <td class="api-prop">${p.name}</td>
              <td class="api-type">${p.type}</td>
              <td><code>${p.default}</code></td>
              <td>${p.desc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  document.getElementById('mainContent').innerHTML = `
    <div class="doc-header">
      <h1 class="doc-title">${doc.title}</h1>
      <p class="doc-desc">${doc.desc}</p>
    </div>
    ${demosHtml}
    ${propsHtml}
  `;
};

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.filterNav = function(q) {
  const val = q.toLowerCase();
  document.querySelectorAll('.nav-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(val) ? 'flex' : 'none';
  });
};

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  showDoc('button');
});
