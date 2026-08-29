// Theme & Preset Management
function changePreset(preset) {
  document.documentElement.setAttribute('data-preset', preset);
  showToast('Theme preset switched: ' + preset.toUpperCase(), 'info');
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  document.getElementById('themeText').innerText = next === 'dark' ? 'Dark' : 'Light';
}

// Toast Message System
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
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
}

// Copy Code Helper
function copyCode(btn, codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    const orig = btn.innerText;
    btn.innerText = 'Copied!';
    btn.style.background = 'var(--primary)';
    showToast('GDScript code copied to clipboard!', 'success');
    setTimeout(() => {
      btn.innerText = orig;
      btn.style.background = '';
    }, 2000);
  });
}

// Modal Dialog helpers
function openDialog(title, body) {
  document.getElementById('dialogTitle').innerText = title;
  document.getElementById('dialogBody').innerText = body;
  document.getElementById('dialogModal').classList.add('active');
}
function closeDialog(e) {
  if (e.target.id === 'dialogModal') closeDialogDirect();
}
function closeDialogDirect() {
  document.getElementById('dialogModal').classList.remove('active');
}
function confirmDialog() {
  closeDialogDirect();
  showToast('Operation confirmed!', 'success');
}

// Drawer helpers
function openDrawer() {
  document.getElementById('drawerModal').classList.add('active');
}
function closeDrawer(e) {
  if (e.target.id === 'drawerModal') closeDrawerDirect();
}
function closeDrawerDirect() {
  document.getElementById('drawerModal').classList.remove('active');
}

// Complete Component Documentation Catalog
const DOCS = {
  'button': {
    title: 'Button 按钮 (GButton)',
    desc: 'Vue 风格的基础交互按钮，支持 Primary, Success, Warning, Danger, Info 等色彩和 Solid, Outline, Dashed, Text, Link 等形态。',
    demos: [
      {
        title: 'Button Types 按钮色彩类型',
        render: `
          <button class="g-btn g-btn-default" onclick="showToast('Default button clicked')">Default</button>
          <button class="g-btn g-btn-primary" onclick="showToast('Primary button clicked', 'success')">Primary</button>
          <button class="g-btn g-btn-success" onclick="showToast('Success button clicked', 'success')">Success</button>
          <button class="g-btn g-btn-warning" onclick="showToast('Warning button clicked', 'warning')">Warning</button>
          <button class="g-btn g-btn-danger" onclick="showToast('Danger button clicked', 'danger')">Danger</button>
          <button class="g-btn g-btn-info" onclick="showToast('Info button clicked', 'info')">Info</button>
        `,
        code: `# GDScript Example
var btn = GButton.new()
btn.text = "Primary Button"
btn.button_type = GButton.ButtonType.PRIMARY
btn.pressed.connect(func(): GMessage.success("Clicked!"))
add_child(btn)`
      },
      {
        title: 'Variants & Shapes 变体与形态',
        render: `
          <button class="g-btn g-btn-outline" onclick="showToast('Outline clicked')">Outline</button>
          <button class="g-btn g-btn-dashed" onclick="showToast('Dashed clicked')">Dashed</button>
          <button class="g-btn g-btn-text" onclick="showToast('Text button clicked')">Text Button</button>
          <button class="g-btn g-btn-primary g-btn-round" onclick="showToast('Round clicked')">Round Pill</button>
        `,
        code: `# Shape & Variant
var round_btn = GButton.new()
round_btn.text = "Round Pill"
round_btn.button_type = GButton.ButtonType.PRIMARY
round_btn.shape = GButton.Shape.ROUND
add_child(round_btn)`
      }
    ],
    props: [
      { name: 'button_type', type: 'ButtonType', default: 'DEFAULT', desc: '按钮色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO' },
      { name: 'variant', type: 'Variant', default: 'SOLID', desc: '按钮表现形态：SOLID, OUTLINE, DASHED, TEXT, LINK' },
      { name: 'button_size', type: 'Size', default: 'MEDIUM', desc: '尺寸规格：SMALL, MEDIUM, LARGE' },
      { name: 'shape', type: 'Shape', default: 'DEFAULT', desc: '形状：DEFAULT, ROUND (胶囊), CIRCLE (圆形), SQUARE (正方形)' },
      { name: 'loading', type: 'bool', default: 'false', desc: '是否处于加载中状态' },
      { name: 'block', type: 'bool', default: 'false', desc: '是否撑满父容器宽度' }
    ]
  },

  'text': {
    title: 'Text / Typography 文本 (GText)',
    desc: '排版文本组件，支持 H1~H6 标题层级、状态色、次级灰度文字与代码块字体。',
    demos: [
      {
        title: 'Headings & Colors 层级与颜色',
        render: `
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <h1 style="font-size: 1.8rem; margin: 0;">H1 Heading 一级标题</h1>
            <h2 style="font-size: 1.4rem; margin: 0;">H2 Heading 二级标题</h2>
            <p style="color: var(--primary);">Primary Text 品牌色文本</p>
            <p style="color: var(--success);">Success Text 成功色文本</p>
            <p style="color: var(--warning);">Warning Text 警告色文本</p>
            <p style="color: var(--danger);">Danger Text 危险色文本</p>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">Secondary Text 次级辅助文本</p>
          </div>
        `,
        code: `# GDScript Typography
var title = GText.new()
title.text = "Godot 4.x UI"
title.hierarchy = GText.Hierarchy.H1
add_child(title)

var primary_txt = GText.new()
primary_txt.text = "Primary Color text"
primary_txt.text_type = GText.TextType.PRIMARY
add_child(primary_txt)`
      }
    ],
    props: [
      { name: 'text_type', type: 'TextType', default: 'DEFAULT', desc: '色彩：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO, SECONDARY' },
      { name: 'hierarchy', type: 'Hierarchy', default: 'BODY', desc: '层级：BODY, H1, H2, H3, H4, H5, H6, CAPTION, CODE' }
    ]
  },

  'divider': {
    title: 'Divider 分割线 (GDivider)',
    desc: '区隔内容的分割线，支持水平/垂直方向及标题内嵌。',
    demos: [
      {
        title: 'Horizontal with Title 带标题分割线',
        render: `
          <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="flex:1; height: 1px; background: var(--border-base);"></div>
              <span style="color: var(--text-secondary); font-size: 0.85rem;">分割文本</span>
              <div style="flex:1; height: 1px; background: var(--border-base);"></div>
            </div>
          </div>
        `,
        code: `# GDScript Divider
var div = GDivider.new()
div.title = "Settings"
div.title_placement = GDivider.TitlePlacement.CENTER
add_child(div)`
      }
    ],
    props: [
      { name: 'orientation', type: 'Orientation', default: 'HORIZONTAL', desc: '方向：HORIZONTAL, VERTICAL' },
      { name: 'title', type: 'String', default: '""', desc: '分割线中嵌入的文本' },
      { name: 'title_placement', type: 'TitlePlacement', default: 'CENTER', desc: '标题对齐：LEFT, CENTER, RIGHT' }
    ]
  },

  'icon': {
    title: 'Icon 图标 (GIcon)',
    desc: '可自由缩放尺寸与着色的图标渲染组件。',
    demos: [
      {
        title: 'Icon Samples 图标示例',
        render: `
          <i class="fa-solid fa-gamepad" style="font-size: 24px; color: var(--primary);"></i>
          <i class="fa-solid fa-rocket" style="font-size: 24px; color: var(--warning);"></i>
          <i class="fa-solid fa-heart" style="font-size: 24px; color: var(--danger);"></i>
          <i class="fa-solid fa-cube" style="font-size: 24px; color: var(--info);"></i>
        `,
        code: `# GDScript Icon
var icon = GIcon.new()
icon.icon_size = 24.0
icon.icon_color = Color("#18a058")
add_child(icon)`
      }
    ],
    props: [
      { name: 'icon_size', type: 'float', default: '16.0', desc: '图标尺寸 (像素)' },
      { name: 'icon_color', type: 'Color', default: 'Color.WHITE', desc: '图标着色' }
    ]
  },

  'input': {
    title: 'Input 输入框 (GInput)',
    desc: '支持前后缀、一键清空、密码掩码切换、不同校验状态描边的文本输入组件。',
    demos: [
      {
        title: 'Basic & Clearable Input 基础与清除',
        render: `
          <div class="g-input-wrapper">
            <input class="g-input" type="text" placeholder="Please input..." value="gotod-components-ui">
          </div>
          <div class="g-input-wrapper">
            <input class="g-input" type="password" placeholder="Password input...">
          </div>
        `,
        code: `# GDScript Input Example
var input = GInput.new()
input.placeholder_text = "Enter username..."
input.clearable = true
input.text_changed.connect(func(text): print("Input:", text))
add_child(input)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '输入框绑定的文本' },
      { name: 'placeholder_text', type: 'String', default: '"Please input..."', desc: '占位提示文字' },
      { name: 'clearable', type: 'bool', default: 'false', desc: '是否显示一键清空按钮' },
      { name: 'secret', type: 'bool', default: 'false', desc: '是否为密码密文模式' },
      { name: 'status', type: 'Status', default: 'DEFAULT', desc: '校验状态：DEFAULT, ERROR, WARNING, SUCCESS' }
    ]
  },

  'textarea': {
    title: 'Textarea 文本域 (GTextarea)',
    desc: '多行自适应文本编辑组件，内置字数统计与超出警示。',
    demos: [
      {
        title: 'Multiline Editor 多行输入',
        render: `
          <div style="width: 100%;">
            <textarea style="width:100%; height: 90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px; color:var(--text-primary); outline:none; font-family:inherit; resize:none;">gotod-components-ui is a modern UI library for Godot 4.</textarea>
          </div>
        `,
        code: `# GDScript Textarea
var ta = GTextarea.new()
ta.rows = 4
ta.max_length = 200
ta.show_word_limit = true
add_child(ta)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '文本内容' },
      { name: 'rows', type: 'int', default: '4', desc: '默认行数高度' },
      { name: 'max_length', type: 'int', default: '200', desc: '字数限制' },
      { name: 'show_word_limit', type: 'bool', default: 'true', desc: '是否显示字数统计标签' }
    ]
  },

  'input-number': {
    title: 'InputNumber 数字输入框 (GInputNumber)',
    desc: '带有加减微调按钮与数值边界约束的数字输入组件。',
    demos: [
      {
        title: 'Step Counter 数字步进器',
        render: `
          <div style="display:inline-flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
            <button class="g-btn g-btn-default" style="border:none; border-radius:0;" onclick="showToast('Decreased')">-</button>
            <span style="padding: 0 16px; font-weight: 600;">10</span>
            <button class="g-btn g-btn-default" style="border:none; border-radius:0;" onclick="showToast('Increased')">+</button>
          </div>
        `,
        code: `# GDScript InputNumber
var num = GInputNumber.new()
num.min_value = 0
num.max_value = 100
num.value = 10
num.step = 1.0
num.value_changed.connect(func(v): print("Value:", v))
add_child(num)`
      }
    ],
    props: [
      { name: 'value', type: 'float', default: '0.0', desc: '当前数值' },
      { name: 'min_value', type: 'float', default: '0.0', desc: '最小值' },
      { name: 'max_value', type: 'float', default: '100.0', desc: '最大值' },
      { name: 'step', type: 'float', default: '1.0', desc: '步进值' }
    ]
  },

  'switch': {
    title: 'Switch 开关 (GSwitch)',
    desc: '带平滑过渡物理缓动动效的开关组件，支持自定义选中/未选中颜色及尺寸。',
    demos: [
      {
        title: 'Switch Demos 开关展示',
        render: `
          <label class="g-switch">
            <input type="checkbox" checked onchange="showToast('Switch toggled: ' + this.checked)">
            <span class="g-switch-slider"></span>
          </label>
          <label class="g-switch">
            <input type="checkbox" onchange="showToast('Switch toggled: ' + this.checked)">
            <span class="g-switch-slider"></span>
          </label>
        `,
        code: `# GDScript Switch
var sw = GSwitch.new()
sw.checked = true
sw.toggled.connect(func(is_on): GMessage.info("Switch is " + str(is_on)))
add_child(sw)`
      }
    ],
    props: [
      { name: 'checked', type: 'bool', default: 'false', desc: '开关当前开启状态' },
      { name: 'switch_size', type: 'Size', default: 'MEDIUM', desc: '开关尺寸' },
      { name: 'checked_color', type: 'Color', default: 'TRANSPARENT', desc: '自定义激活时背景色' }
    ]
  },

  'checkbox': {
    title: 'Checkbox 多选框 (GCheckbox & Group)',
    desc: '多选框组件，支持单独使用或配合 CheckboxGroup 数组双向绑定。',
    demos: [
      {
        title: 'Checkbox Options 多选项',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" checked> <span>Vue 3</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" checked> <span>Godot 4</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox"> <span>GDScript</span></label>
          </div>
        `,
        code: `# GDScript Checkbox Group
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
      { name: 'text', type: 'String', default: '"Checkbox"', desc: '文字描述' },
      { name: 'indeterminate', type: 'bool', default: 'false', desc: '半选/不确定状态' }
    ]
  },

  'radio': {
    title: 'Radio 单选框 (GRadio & Group)',
    desc: '互斥单选组件，配合 GRadioGroup 自动管理选中项。',
    demos: [
      {
        title: 'Radio Group 单选编组',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="framework" checked> <span>Naive UI</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="framework"> <span>Element Plus</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="framework"> <span>Ant Design</span></label>
          </div>
        `,
        code: `# GDScript Radio Group
var rg = GRadioGroup.new()
var r1 = GRadio.new()
r1.text = "Option A"
rg.add_child(r1)

rg.value_changed.connect(func(val): print("Selected radio:", val))
add_child(rg)`
      }
    ],
    props: [
      { name: 'checked', type: 'bool', default: 'false', desc: '是否选中' },
      { name: 'value', type: 'String', default: '""', desc: '选项标识值' }
    ]
  },

  'select': {
    title: 'Select 下拉选择器 (GSelect)',
    desc: '下拉菜单选择组件，支持自定义选项列表、禁用项与一键清空。',
    demos: [
      {
        title: 'Dropdown Selector 下拉框',
        render: `
          <div style="display:flex; align-items:center;">
            <select class="select-theme" style="width: 220px; height: 36px;" onchange="showToast('Selected: ' + this.value, 'success')">
              <option>Godot 4.3 (Stable)</option>
              <option>Godot 4.4 (Latest)</option>
              <option>Godot 4.6+ (Future)</option>
            </select>
          </div>
        `,
        code: `# GDScript Select
var sel = GSelect.new()
sel.options = [
    {"label": "Option 1", "value": 1},
    {"label": "Option 2", "value": 2}
]
sel.item_selected.connect(func(idx, val, label): print("Selected:", label))
add_child(sel)`
      }
    ],
    props: [
      { name: 'options', type: 'Array[Dictionary]', default: '[]', desc: '选项数组 [{"label": "", "value": ""}]' },
      { name: 'selected_index', type: 'int', default: '-1', desc: '当前选中的索引' },
      { name: 'clearable', type: 'bool', default: 'true', desc: '是否可清空' }
    ]
  },

  'slider': {
    title: 'Slider 滑块 (GSlider)',
    desc: '平滑滑动条组件，支持状态色彩与自定义步长。',
    demos: [
      {
        title: 'Value Slider 连续滑块',
        render: `
          <div style="width: 280px;">
            <input type="range" min="0" max="100" value="60" style="width:100%;" oninput="document.getElementById('sliderVal').innerText = this.value">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">当前值: <span id="sliderVal" style="color: var(--primary); font-weight:600;">60</span>%</div>
          </div>
        `,
        code: `# GDScript Slider
var slider = GSlider.new()
slider.value = 60
slider.value_changed.connect(func(v): print("Slider:", v))
add_child(slider)`
      }
    ],
    props: [
      { name: 'value', type: 'float', default: '0.0', desc: '当前滑块数值' },
      { name: 'status', type: 'Status', default: 'PRIMARY', desc: '滑块高亮色彩' }
    ]
  },

  'form': {
    title: 'Form 表单布局 (GForm & GFormItem)',
    desc: '表单管理容器，支持统一设置标签对齐（Top/Left/Right）、宽度、必填校验与错误展示。',
    demos: [
      {
        title: 'Form Layout 表单示例',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:440px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 账号</span>
              <div class="g-input-wrapper" style="flex:1;"><input class="g-input" value="admin"></div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 密码</span>
              <div class="g-input-wrapper" style="flex:1;"><input class="g-input" type="password" value="123456"></div>
            </div>
            <div style="display:flex; justify-content:flex-end;">
              <button class="g-btn g-btn-primary" onclick="showToast('Form submitted successfully!', 'success')">提交表单</button>
            </div>
          </div>
        `,
        code: `# GDScript Form
var form = GForm.new()
form.label_width = 90.0

var item = GFormItem.new()
item.label = "Username"
item.required = true
var input = GInput.new()
item.add_child(input)

form.add_child(item)
add_child(form)`
      }
    ],
    props: [
      { name: 'label_position', type: 'LabelPosition', default: 'LEFT', desc: '标签对齐位置：LEFT, TOP, RIGHT' },
      { name: 'label_width', type: 'float', default: '120.0', desc: '统一标签宽度' }
    ]
  },

  'dialog': {
    title: 'Dialog / Modal 对话框 (GDialog)',
    desc: '居中弹出的模态对话框，支持半透明遮罩暗化、缩放弹性入场动画、确定/取消操作。',
    demos: [
      {
        title: 'Interactive Modal Dialog 对话框示例',
        render: `
          <button class="g-btn g-btn-primary" onclick="openDialog('确认删除操作', '您确定要删除该配置文件吗？此操作将无法撤回。')">
            打开 GDialog 模态弹窗
          </button>
        `,
        code: `# GDScript Dialog
var dlg = GDialog.new()
dlg.title = "Confirm Action"
dlg.content_text = "Are you sure you want to proceed?"
dlg.confirmed.connect(func(): GMessage.success("Confirmed!"))
add_child(dlg)
dlg.open()`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Dialog Title"', desc: '弹窗标题' },
      { name: 'content_text', type: 'String', default: '""', desc: '弹窗正文' },
      { name: 'confirm_button_text', type: 'String', default: '"Confirm"', desc: '确认按钮文字' },
      { name: 'cancel_button_text', type: 'String', default: '"Cancel"', desc: '取消按钮文字' },
      { name: 'mask_closable', type: 'bool', default: 'true', desc: '点击背景遮罩是否自动关闭' }
    ]
  },

  'message': {
    title: 'Message 全局消息提示 (GMessage)',
    desc: '全局悬浮吐司提示（Autoload 单例），支持顶部堆叠、自动倒计时关闭及进入/淡出动效。',
    demos: [
      {
        title: 'Message Notifications 全局提示展示',
        render: `
          <button class="g-btn g-btn-info" onclick="showToast('This is an info message', 'info')">Info Message</button>
          <button class="g-btn g-btn-success" onclick="showToast('Success saved successfully!', 'success')">Success Message</button>
          <button class="g-btn g-btn-warning" onclick="showToast('Warning: Check connection', 'warning')">Warning Message</button>
          <button class="g-btn g-btn-danger" onclick="showToast('Error: Failed to request', 'danger')">Error Message</button>
        `,
        code: `# Call anywhere via Autoload GMessage
GMessage.success("Data synced successfully!")
GMessage.warning("Disk space low")
GMessage.error("Network timeout")
GMessage.info("System updated")`
      }
    ],
    props: [
      { name: 'info(content, duration)', type: 'static func', default: '3.0s', desc: '弹出信息提示' },
      { name: 'success(content, duration)', type: 'static func', default: '3.0s', desc: '弹出成功提示' },
      { name: 'warning(content, duration)', type: 'static func', default: '3.0s', desc: '弹出警告提示' },
      { name: 'error(content, duration)', type: 'static func', default: '3.0s', desc: '弹出错误提示' }
    ]
  },

  'alert': {
    title: 'Alert 警告提示 (GAlert)',
    desc: '页内醒目的状态横幅提示，支持带有状态色彩与关闭按钮。',
    demos: [
      {
        title: 'Alert Banners 提示横幅',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div class="g-alert-box g-alert-info"><span><i class="fa-solid fa-info-circle"></i> 系统将于今晚 24:00 进行例行维护升级。</span></div>
            <div class="g-alert-box g-alert-success"><span><i class="fa-solid fa-check-circle"></i> 组件库已成功加载至 Godot 引擎！</span></div>
            <div class="g-alert-box g-alert-warning"><span><i class="fa-solid fa-exclamation-triangle"></i> 请注意检查网络代理连接状态。</span></div>
            <div class="g-alert-box g-alert-danger"><span><i class="fa-solid fa-times-circle"></i> 发生未知异常，请重试。</span></div>
          </div>
        `,
        code: `# GDScript Alert
var alert = GAlert.new()
alert.type = GThemeTokens.Status.SUCCESS
alert.title = "Loaded Successfully"
alert.closable = true
add_child(alert)`
      }
    ],
    props: [
      { name: 'type', type: 'Status', default: 'INFO', desc: '类型：INFO, SUCCESS, WARNING, DANGER' },
      { name: 'title', type: 'String', default: '"Alert Title"', desc: '标题' },
      { name: 'closable', type: 'bool', default: 'false', desc: '是否显示关闭按钮' }
    ]
  },

  'drawer': {
    title: 'Drawer 抽屉 (GDrawer)',
    desc: '滑出的浮层面板，支持从屏幕右侧/左侧/顶部/底部展开。',
    demos: [
      {
        title: 'Right Drawer 右侧抽屉',
        render: `
          <button class="g-btn g-btn-primary" onclick="openDrawer()">
            打开 GDrawer 抽屉面板
          </button>
        `,
        code: `# GDScript Drawer
var drawer = GDrawer.new()
drawer.title = "Settings Panel"
drawer.placement = GDrawer.Placement.RIGHT
add_child(drawer)
drawer.open()`
      }
    ],
    props: [
      { name: 'placement', type: 'Placement', default: 'RIGHT', desc: '展开方向：RIGHT, LEFT, TOP, BOTTOM' },
      { name: 'drawer_size', type: 'float', default: '360.0', desc: '抽屉宽度/高度' }
    ]
  },

  'tooltip': {
    title: 'Tooltip 悬浮提示 (GTooltip)',
    desc: '轻量气泡提示组件，用于说明交互元素的附加信息。',
    demos: [
      {
        title: 'Tooltip Hover 悬浮气泡',
        render: `
          <button class="g-btn g-btn-default" title="This is tooltip info" onclick="showToast('Tooltip target clicked')">
            Hover over me
          </button>
        `,
        code: `# GDScript Tooltip
var tip = GTooltip.new()
tip.content = "More details about this button"
add_child(tip)`
      }
    ],
    props: [
      { name: 'content', type: 'String', default: '""', desc: '提示文字' },
      { name: 'dark_theme', type: 'bool', default: 'true', desc: '深色/浅色气泡背景' }
    ]
  },

  'loading': {
    title: 'Loading 加载指示器 (GLoading)',
    desc: '旋转动画加载指示器，支持全屏遮罩或局部容器挂载。',
    demos: [
      {
        title: 'Animated Spinner 旋转指示器',
        render: `
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 28px; color: var(--primary);"></i>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">Loading assets...</span>
          </div>
        `,
        code: `# GDScript Loading
var loading = GLoading.new()
loading.text = "Loading..."
add_child(loading)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Loading..."', desc: '加载提示文字' },
      { name: 'spinner_size', type: 'float', default: '36.0', desc: '旋转圈尺寸' }
    ]
  },

  'card': {
    title: 'Card 卡片 (GCard)',
    desc: '基础内容容器卡片，支持标题栏、Extra 扩展操作区与阴影边框。',
    demos: [
      {
        title: 'Card Component 卡片展示',
        render: `
          <div class="sim-card">
            <div class="sim-card-header">
              <span>Card Title 卡片标题</span>
              <a href="#" style="color:var(--primary); font-size:0.85rem; text-decoration:none;" onclick="showToast('More clicked')">More 更多</a>
            </div>
            <div style="color:var(--text-secondary); font-size:0.9rem;">
              gotod-components-ui provides comprehensive components for Godot 4.x game and app development.
            </div>
          </div>
        `,
        code: `# GDScript Card
var card = GCard.new()
card.title = "User Profile"
card.extra_text = "Edit"
add_child(card)`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Card Title"', desc: '卡片标题' },
      { name: 'extra_text', type: 'String', default: '""', desc: '右上角额外操作文本' },
      { name: 'bordered', type: 'bool', default: 'true', desc: '是否带有边框' }
    ]
  },

  'tag': {
    title: 'Tag 标签 (GTag)',
    desc: '用于标记和分类的微型标签组件，支持 Light, Outline, Solid 三种质感及可关闭操作。',
    demos: [
      {
        title: 'Tag Varieties 标签类型',
        render: `
          <span class="g-tag g-tag-default">Default</span>
          <span class="g-tag g-tag-primary">Primary Tag</span>
          <span class="g-tag g-tag-success">Success Tag</span>
          <span class="g-tag g-tag-warning">Warning Tag</span>
          <span class="g-tag g-tag-danger">Danger Tag</span>
        `,
        code: `# GDScript Tag
var tag = GTag.new()
tag.text = "Vue 3 + Godot"
tag.type = GThemeTokens.Status.PRIMARY
tag.closable = true
tag.closed.connect(func(): print("Tag removed"))
add_child(tag)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Tag"', desc: '标签文本' },
      { name: 'type', type: 'Status', default: 'DEFAULT', desc: '色彩类型' },
      { name: 'variant', type: 'Variant', default: 'LIGHT', desc: '质感风格：LIGHT, OUTLINE, SOLID' },
      { name: 'closable', type: 'bool', default: 'false', desc: '是否带有关闭按钮' }
    ]
  },

  'badge': {
    title: 'Badge 徽标 (GBadge)',
    desc: '挂载在控件右上角的小红点或数字徽标，支持 99+ 溢出保护。',
    demos: [
      {
        title: 'Count & Dot Badge 徽标展示',
        render: `
          <div style="display:flex; gap:24px; align-items:center;">
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default">Notifications</button>
              <span style="position:absolute; top:-6px; right:-6px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:99px;">8</span>
            </div>
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default">Messages</button>
              <span style="position:absolute; top:-4px; right:-4px; background:var(--danger); width:8px; height:8px; border-radius:50%;"></span>
            </div>
          </div>
        `,
        code: `# GDScript Badge
var badge = GBadge.new()
badge.value = 8
badge.max_value = 99
add_child(badge)`
      }
    ],
    props: [
      { name: 'value', type: 'int', default: '0', desc: '徽标数字' },
      { name: 'max_value', type: 'int', default: '99', desc: '最大值，超出显示 99+' },
      { name: 'is_dot', type: 'bool', default: 'false', desc: '是否仅展示小红圆点' }
    ]
  },

  'avatar': {
    title: 'Avatar 头像 (GAvatar)',
    desc: '支持图片纹理、字母缩写与圆形/圆角矩形形态的用户头像组件。',
    demos: [
      {
        title: 'Avatar Styles 头像示例',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600;">G</div>
            <div style="width:40px; height:40px; border-radius:6px; background:var(--info); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600;">V</div>
          </div>
        `,
        code: `# GDScript Avatar
var av = GAvatar.new()
av.text = "Godot"
av.shape = GAvatar.Shape.CIRCLE
av.avatar_size = 40.0
add_child(av)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"U"', desc: '无图片时的文字首字母' },
      { name: 'shape', type: 'Shape', default: 'CIRCLE', desc: '形状：CIRCLE (圆), SQUARE (圆角方)' },
      { name: 'avatar_size', type: 'float', default: '40.0', desc: '头像尺寸' }
    ]
  },

  'progress': {
    title: 'Progress 进度条 (GProgress)',
    desc: '展示操作或数值进度的组件，支持线性条状与圆形环状展示。',
    demos: [
      {
        title: 'Progress Bar 进度条展示',
        render: `
          <div style="width: 100%; display: flex; flex-direction: column; gap: 14px;">
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 45%;"></div></div>
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 80%; background: var(--success);"></div></div>
            <div class="g-progress-bar"><div class="g-progress-fill" style="width: 60%; background: var(--warning);"></div></div>
          </div>
        `,
        code: `# GDScript Progress
var p = GProgress.new()
p.percentage = 75.0
p.status = GThemeTokens.Status.PRIMARY
add_child(p)`
      }
    ],
    props: [
      { name: 'percentage', type: 'float', default: '0.0', desc: '进度百分比 (0.0 ~ 100.0)' },
      { name: 'type', type: 'ProgressType', default: 'LINE', desc: '类型：LINE (线性), CIRCLE (环形)' },
      { name: 'status', type: 'Status', default: 'PRIMARY', desc: '状态色彩' }
    ]
  },

  'tabs': {
    title: 'Tabs 标签页 (GTabs)',
    desc: '多面板内容切换标签页，支持 Line 风格与 Card 风格。',
    demos: [
      {
        title: 'Tabs Navigation 选项卡切换',
        render: `
          <div style="width:100%;">
            <div style="display:flex; gap:16px; border-bottom:1px solid var(--border-base); padding-bottom:8px;">
              <span style="color:var(--primary); font-weight:600; cursor:pointer;" onclick="showToast('Tab 1 active')">Overview 概览</span>
              <span style="color:var(--text-secondary); cursor:pointer;" onclick="showToast('Tab 2 active')">Properties 属性</span>
              <span style="color:var(--text-secondary); cursor:pointer;" onclick="showToast('Tab 3 active')">Signals 信号</span>
            </div>
          </div>
        `,
        code: `# GDScript Tabs
var tabs = GTabs.new()
tabs.add_tab("Tab 1", panel1)
tabs.add_tab("Tab 2", panel2)
add_child(tabs)`
      }
    ],
    props: [
      { name: 'type', type: 'TabType', default: 'LINE', desc: '形态：LINE, CARD, SEGMENT' },
      { name: 'current_tab', type: 'int', default: '0', desc: '当前激活的标签页索引' }
    ]
  },

  'collapse': {
    title: 'Collapse 折叠面板 (GCollapse)',
    desc: '可折叠收起的手风琴面板，用于收纳大量分组设置项。',
    demos: [
      {
        title: 'Accordion Panel 折叠展示',
        render: `
          <div class="sim-card" style="cursor:pointer;" onclick="showToast('Collapse toggled')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600;">Advanced Settings 高级设置</span>
              <span style="font-size:12px; color:var(--text-secondary);">▼</span>
            </div>
          </div>
        `,
        code: `# GDScript Collapse
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

  'steps': {
    title: 'Steps 步骤条 (GSteps)',
    desc: '分步引导进度条，清晰展示当前进行到的步骤环节。',
    demos: [
      {
        title: 'Steps Process 步骤条',
        render: `
          <div style="display:flex; align-items:center; gap:16px; width:100%;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px;">1</span>
              <span style="color:var(--text-primary); font-weight:600; font-size:0.88rem;">Setup</span>
            </div>
            <div style="flex:1; height:2px; background:var(--primary);"></div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px;">2</span>
              <span style="color:var(--text-primary); font-weight:600; font-size:0.88rem;">Theme</span>
            </div>
            <div style="flex:1; height:2px; background:var(--border-base);"></div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:24px; height:24px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); color:var(--text-secondary); display:flex; align-items:center; justify-content:center; font-size:12px;">3</span>
              <span style="color:var(--text-disabled); font-size:0.88rem;">Build</span>
            </div>
          </div>
        `,
        code: `# GDScript Steps
var st = GSteps.new()
st.steps = ["Step 1", "Step 2", "Step 3"]
st.current_step = 1
add_child(st)`
      }
    ],
    props: [
      { name: 'steps', type: 'Array[String]', default: '[]', desc: '步骤名称列表' },
      { name: 'current_step', type: 'int', default: '0', desc: '当前所在步骤索引 (从 0 开始)' }
    ]
  },

  'space': {
    title: 'Space 间距布局 (GSpace)',
    desc: '流式弹性排版容器，自动为子节点添加均匀间距并支持自动折行 (Wrap)。',
    demos: [
      {
        title: 'Spacing Layout 自动流式间距',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-default">Button A</button>
            <button class="g-btn g-btn-default">Button B</button>
            <button class="g-btn g-btn-default">Button C</button>
            <button class="g-btn g-btn-primary">Button D</button>
          </div>
        `,
        code: `# GDScript Space
var sp = GSpace.new()
sp.gap = 12.0
sp.wrap = true
sp.add_child(btn1)
sp.add_child(btn2)
add_child(sp)`
      }
    ],
    props: [
      { name: 'gap', type: 'float', default: '12.0', desc: '子节点间距' },
      { name: 'wrap', type: 'bool', default: 'true', desc: '是否自动换行' }
    ]
  }
};

function showDoc(key) {
  const doc = DOCS[key] || DOCS['button'];
  
  // Update active nav based on data-key
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
            <i class="fa-solid fa-copy"></i> Copy GDScript
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
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function filterNav(q) {
  const val = q.toLowerCase();
  document.querySelectorAll('.nav-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(val) ? 'flex' : 'none';
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  showDoc('button');
});
