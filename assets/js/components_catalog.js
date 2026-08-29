// =========================================================================
// Gotod Components UI - All 28 Components Comprehensive Catalog
// 深度对标 Element Plus, Naive UI, Ant Design Vue, Vant UI
// 包含每个组件的：全量场景示例、Attributes、Events、Methods、Slots、Sub-component Attributes
// =========================================================================

window.COMPONENT_CATALOG = {
  // --------------------------------------------------------
  // 1. GButton 按钮
  // --------------------------------------------------------
  'button': {
    title: 'Button 按钮 (GButton)',
    desc: '常用的操作按钮，融合 Element Plus、Naive UI、Ant Design 与 Vant 规范。包含基础类型、朴素/边框按钮、圆角/圆形胶囊、禁用/加载、不同尺寸以及通栏全宽等全部场景。',
    demos: [
      {
        title: '1. 基础类型 (Basic Types: Primary / Success / Warning / Danger / Info)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <button class="g-btn g-btn-default" onclick="showToast('Default button')">Default 默认</button>
            <button class="g-btn g-btn-primary" onclick="showToast('Primary button', 'success')">Primary 主要</button>
            <button class="g-btn g-btn-success" onclick="showToast('Success button', 'success')">Success 成功</button>
            <button class="g-btn g-btn-warning" onclick="showToast('Warning button', 'warning')">Warning 警告</button>
            <button class="g-btn g-btn-danger" onclick="showToast('Danger button', 'danger')">Danger 危险</button>
            <button class="g-btn g-btn-info" onclick="showToast('Info button', 'info')">Info 信息</button>
          </div>
        `,
        code: `# GDScript: Basic Types
var btn_primary = GButton.new()
btn_primary.text = "Primary"
btn_primary.button_type = GButton.ButtonType.PRIMARY
btn_primary.pressed.connect(func(): GMessage.success("Primary clicked"))
add_child(btn_primary)`
      },
      {
        title: '2. 朴素与变体形态 (Variants: Solid / Outline / Dashed / Text / Link)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <button class="g-btn g-btn-primary">Solid 实心</button>
            <button class="g-btn g-btn-outline" onclick="showToast('Outline')">Outline 边框</button>
            <button class="g-btn g-btn-dashed" onclick="showToast('Dashed')">Dashed 虚线</button>
            <button class="g-btn g-btn-text" onclick="showToast('Text')">Text 纯文本</button>
            <button class="g-btn g-btn-text" style="text-decoration:underline;" onclick="showToast('Link')">Link 链接</button>
          </div>
        `,
        code: `# GDScript: Variants
var outline = GButton.new()
outline.text = "Outline"
outline.variant = GButton.Variant.OUTLINE
add_child(outline)`
      },
      {
        title: '3. 圆角与圆形按钮 (Shapes: Round / Circle / Square)',
        render: `
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary g-btn-round" onclick="showToast('Round Pill')">Round 胶囊圆角</button>
            <button class="g-btn g-btn-success g-btn-round" onclick="showToast('Success Pill')">Success 胶囊</button>
            <button class="g-btn g-btn-primary g-btn-round" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-shapes"></i></button>
            <button class="g-btn g-btn-danger g-btn-round" style="width:36px; height:36px; padding:0;"><i class="fa-solid fa-heart"></i></button>
          </div>
        `,
        code: `# GDScript: Shapes
var pill = GButton.new()
pill.text = "Round Pill"
pill.shape = GButton.Shape.ROUND
add_child(pill)`
      },
      {
        title: '4. 加载状态与禁用 (Loading & Disabled)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <button class="g-btn g-btn-primary"><i class="fa-solid fa-spinner fa-spin"></i> Loading 加载中</button>
            <button class="g-btn g-btn-success"><i class="fa-solid fa-spinner fa-spin"></i> Loading 成功</button>
            <button class="g-btn g-btn-primary" style="opacity:0.5; cursor:not-allowed;" disabled>Disabled 禁用</button>
            <button class="g-btn g-btn-default" style="opacity:0.5; cursor:not-allowed;" disabled>Disabled 默认</button>
          </div>
        `,
        code: `# GDScript: Loading & Disabled
var load_btn = GButton.new()
load_btn.text = "Loading"
load_btn.loading = true
add_child(load_btn)`
      },
      {
        title: '5. 通栏全宽按钮 (Block Button: block="true")',
        render: `
          <div style="width:100%; display:flex; flex-direction:column; gap:10px;">
            <button class="g-btn g-btn-primary" style="width:100%;">Block Primary Button (100% 宽度)</button>
            <button class="g-btn g-btn-default" style="width:100%;">Block Default Button</button>
          </div>
        `,
        code: `# GDScript: Block Button
var block_btn = GButton.new()
block_btn.text = "Full Width"
block_btn.block = true
add_child(block_btn)`
      }
    ],
    props: [
      { name: 'button_type / type', type: 'enum', default: 'DEFAULT', desc: '色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO' },
      { name: 'variant', type: 'enum', default: 'SOLID', desc: '形态样式：SOLID (实心), OUTLINE (描边), DASHED (虚线), TEXT (文字), LINK (链接)' },
      { name: 'button_size / size', type: 'enum', default: 'MEDIUM', desc: '尺寸规格：SMALL, MEDIUM, LARGE' },
      { name: 'shape', type: 'enum', default: 'DEFAULT', desc: '形状：DEFAULT, ROUND (胶囊), CIRCLE (圆), SQUARE (方)' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '是否进入加载动画状态并禁用点击' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用按钮交互' },
      { name: 'block', type: 'boolean', default: 'false', desc: '是否充满父级容器全宽' },
      { name: 'icon_texture / icon', type: 'Texture2D', default: 'null', desc: '按钮图标纹理' }
    ],
    events: [
      { name: 'pressed()', desc: '按钮被点击时触发', params: '()' }
    ],
    methods: [
      { name: 'set_loading(is_loading: bool)', desc: '动态开启或关闭按钮加载动画', params: '(is_loading: bool) -> void' },
      { name: 'set_disabled(is_disabled: bool)', desc: '动态禁用或启用按钮', params: '(is_disabled: bool) -> void' }
    ],
    slots: [
      { name: 'default', desc: '按钮内部文字或自定义节点插槽', child: 'Control / Label' },
      { name: 'icon', desc: '自定义图标插槽', child: 'GIcon / TextureRect' }
    ]
  },

  // --------------------------------------------------------
  // 2. GText 文本排版
  // --------------------------------------------------------
  'text': {
    title: 'Text / Typography 文本 (GText & GTitle)',
    desc: '统一的排版文本组件，支持 H1~H6 标题层级、状态色、次级灰度文字、代码块字体与超出省略。',
    demos: [
      {
        title: '1. 标题与层级排版 (Headings & Hierarchy)',
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
      },
      {
        title: '2. 状态色彩文本 (Status Colors)',
        render: `
          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <span style="color:var(--primary); font-weight:600;">Primary 品牌色</span>
            <span style="color:var(--success); font-weight:600;">Success 成功色</span>
            <span style="color:var(--warning); font-weight:600;">Warning 警告色</span>
            <span style="color:var(--danger); font-weight:600;">Danger 危险色</span>
            <span style="color:var(--info); font-weight:600;">Info 信息色</span>
          </div>
        `,
        code: `var txt = GText.new()
txt.text = "Success Status"
txt.text_type = GText.TextType.SUCCESS
add_child(txt)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '展示的文本内容' },
      { name: 'text_type', type: 'enum', default: 'DEFAULT', desc: '色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO, SECONDARY' },
      { name: 'hierarchy', type: 'enum', default: 'BODY', desc: '层级：BODY, H1, H2, H3, H4, H5, H6, CAPTION, CODE' },
      { name: 'ellipsis', type: 'boolean', default: 'false', desc: '文本超出是否自动显示省略号' }
    ],
    events: [],
    methods: [
      { name: 'set_text(new_text: String)', desc: '更新文本内容', params: '(new_text: String) -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 3. GDivider 分割线
  // --------------------------------------------------------
  'divider': {
    title: 'Divider 分割线 (GDivider)',
    desc: '区隔内容的分割线，支持水平/垂直方向及标题内嵌对齐。',
    demos: [
      {
        title: '1. 带内嵌标题分割线 (Horizontal with Title)',
        render: `
          <div style="width:100%; display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="flex:1; height:1px; background:var(--border-base);"></div>
              <span style="color:var(--text-secondary); font-size:0.85rem;">居中文本分割线</span>
              <div style="flex:1; height:1px; background:var(--border-base);"></div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:30px; height:1px; background:var(--border-base);"></div>
              <span style="color:var(--primary); font-size:0.85rem; font-weight:600;">左对齐标题</span>
              <div style="flex:1; height:1px; background:var(--border-base);"></div>
            </div>
          </div>
        `,
        code: `# GDScript: Divider
var div = GDivider.new()
div.title = "Settings"
div.title_placement = GDivider.TitlePlacement.CENTER
add_child(div)`
      }
    ],
    props: [
      { name: 'orientation', type: 'enum', default: 'HORIZONTAL', desc: '方向：HORIZONTAL, VERTICAL' },
      { name: 'title', type: 'String', default: '""', desc: '内嵌标题文本' },
      { name: 'title_placement', type: 'enum', default: 'CENTER', desc: '标题对齐位置：LEFT, CENTER, RIGHT' },
      { name: 'dashed', type: 'boolean', default: 'false', desc: '是否为虚线形态' }
    ],
    events: [],
    methods: [],
    slots: [
      { name: 'default', desc: '自定义分割线内嵌标题内容', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 4. GIcon 图标
  // --------------------------------------------------------
  'icon': {
    title: 'Icon 图标 (GIcon)',
    desc: '可自由缩放尺寸与着色的图标渲染组件。',
    demos: [
      {
        title: '1. 图标展示与着色 (Scalable Icons)',
        render: `
          <div style="display:flex; gap:24px; align-items:center;">
            <i class="fa-solid fa-gamepad" style="font-size:28px; color:var(--primary);"></i>
            <i class="fa-solid fa-rocket" style="font-size:28px; color:var(--warning);"></i>
            <i class="fa-solid fa-heart" style="font-size:28px; color:var(--danger);"></i>
            <i class="fa-solid fa-cube" style="font-size:28px; color:var(--info);"></i>
          </div>
        `,
        code: `# GDScript: Icon
var icon = GIcon.new()
icon.icon_size = 24.0
icon.icon_color = Color("#18a058")
add_child(icon)`
      }
    ],
    props: [
      { name: 'icon_size', type: 'float', default: '16.0', desc: '图标尺寸 (像素)' },
      { name: 'icon_color', type: 'Color', default: 'Color.WHITE', desc: '图标着色' },
      { name: 'spin', type: 'boolean', default: 'false', desc: '是否持续旋转动画' }
    ],
    events: [],
    methods: [],
    slots: []
  },

  // --------------------------------------------------------
  // 5. GInput 输入框
  // --------------------------------------------------------
  'input': {
    title: 'Input 输入框 (GInput)',
    desc: '通过鼠标或键盘输入字符的基础表单控件。包含基础用法、一键清空、密码切换、带前缀/后缀、校验状态描边、禁用与尺寸控制等完整场景。',
    demos: [
      {
        title: '1. 基础用法与一键清空 (Clearable)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper"><input class="g-input" type="text" placeholder="Please input 请输入..." value="gotod-ui"></div>
            <div class="g-input-wrapper" style="position:relative;">
              <input id="inClearDemo" class="g-input" type="text" placeholder="Clearable 可清空..." value="Click clear button">
              <button onclick="document.getElementById('inClearDemo').value=''; showToast('Input cleared');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px;">×</button>
            </div>
          </div>
        `,
        code: `# GDScript: Clearable Input
var input = GInput.new()
input.placeholder_text = "Enter username..."
input.clearable = true
input.cleared.connect(func(): print("Cleared"))
add_child(input)`
      },
      {
        title: '2. 密码框与显隐切换 (Password & Reveal)',
        render: `
          <div class="g-input-wrapper" style="position:relative; width:100%; max-width:340px;">
            <input id="inPwdDemo" class="g-input" type="password" placeholder="Password input..." value="12345678">
            <button onclick="let el=document.getElementById('inPwdDemo'); el.type = el.type === 'password' ? 'text' : 'password';" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;"><i class="fa-solid fa-moon"></i></button>
          </div>
        `,
        code: `# GDScript: Password Mode
var pwd = GInput.new()
pwd.secret = true
pwd.show_password_toggle = true
add_child(pwd)`
      },
      {
        title: '3. 复合型前缀与后缀输入 (Prefix & Suffix)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:380px;">
            <div class="g-input-wrapper">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-right:8px;">https://</span>
              <input class="g-input" type="text" value="github.com/mhxy13867806343">
            </div>
            <div class="g-input-wrapper">
              <input class="g-input" type="text" value="99.9">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-left:8px;">USD / Month</span>
            </div>
          </div>
        `,
        code: `# GDScript: Prefix & Suffix
var input = GInput.new()
input.prefix_text = "https://"
input.suffix_text = ".com"
add_child(input)`
      },
      {
        title: '4. 状态描边与禁用 (Status: Success / Warning / Error & Disabled)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:340px;">
            <div class="g-input-wrapper" style="border-color:var(--success);"><input class="g-input" value="Validation Passed"><i class="fa-solid fa-check" style="color:var(--success);"></i></div>
            <div class="g-input-wrapper" style="border-color:var(--warning);"><input class="g-input" value="Warning Check"><i class="fa-solid fa-exclamation-triangle" style="color:var(--warning);"></i></div>
            <div class="g-input-wrapper" style="border-color:var(--danger);"><input class="g-input" value="Error Occurred"><i class="fa-solid fa-times-circle" style="color:var(--danger);"></i></div>
            <div class="g-input-wrapper" style="opacity:0.5;"><input class="g-input" value="Disabled input" disabled></div>
          </div>
        `,
        code: `# GDScript: Status Styles
var err_inp = GInput.new()
err_inp.status = GInput.Status.ERROR
add_child(err_inp)`
      }
    ],
    props: [
      { name: 'text / v-model', type: 'String', default: '""', desc: '输入框绑定的文本内容' },
      { name: 'placeholder_text', type: 'String', default: '"Please input..."', desc: '输入框占位文本' },
      { name: 'clearable', type: 'boolean', default: 'false', desc: '是否显示一键清空按钮' },
      { name: 'secret / show-password', type: 'boolean', default: 'false', desc: '是否为密码密文模式' },
      { name: 'show_password_toggle', type: 'boolean', default: 'false', desc: '是否显示密码切换眼睛图标' },
      { name: 'prefix_text', type: 'String', default: '""', desc: '前缀文本' },
      { name: 'suffix_text', type: 'String', default: '""', desc: '后缀文本' },
      { name: 'status', type: 'enum', default: 'DEFAULT', desc: '校验边框状态：DEFAULT, ERROR, WARNING, SUCCESS' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用输入' },
      { name: 'max_length', type: 'int', default: '0', desc: '最大字符输入长度限制 (0 为不限制)' }
    ],
    events: [
      { name: 'text_changed(new_text)', desc: '输入文本改变时触发', params: '(new_text: String)' },
      { name: 'text_submitted(new_text)', desc: '按回车提交时触发', params: '(new_text: String)' },
      { name: 'cleared()', desc: '点击清除按钮时触发', params: '()' },
      { name: 'focus_entered()', desc: '输入框获取焦点时触发', params: '()' },
      { name: 'focus_exited()', desc: '输入框失去焦点时触发', params: '()' }
    ],
    methods: [
      { name: 'clear()', desc: '清空当前输入框内容并发出 cleared 信号', params: '() -> void' },
      { name: 'grab_focus()', desc: '使输入框获取焦点并调出光标', params: '() -> void' },
      { name: 'select_all()', desc: '全选输入框内的所有文本', params: '() -> void' }
    ],
    slots: [
      { name: 'prefix', desc: '输入框头部前缀内容/图标', child: 'GIcon / Control' },
      { name: 'suffix', desc: '输入框尾部后缀内容/图标', child: 'GIcon / Control' }
    ]
  },

  // --------------------------------------------------------
  // 6. GTextarea 文本域
  // --------------------------------------------------------
  'textarea': {
    title: 'Textarea 文本域 (GTextarea)',
    desc: '多行自适应文本编辑组件，内置字数统计与超出警示。',
    demos: [
      {
        title: '1. 多行文本编辑与字数统计 (Multiline & Word Limit)',
        render: `
          <div style="width:100%; max-width:440px;">
            <textarea style="width:100%; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px; color:var(--text-primary); outline:none; font-family:inherit; resize:none;" oninput="document.getElementById('taCount').innerText = this.value.length">gotod-components-ui</textarea>
            <div style="text-align:right; font-size:11px; color:var(--text-secondary); margin-top:4px;"><span id="taCount">19</span> / 200</div>
          </div>
        `,
        code: `# GDScript: Textarea
var ta = GTextarea.new()
ta.rows = 4
ta.max_length = 200
ta.show_word_limit = true
add_child(ta)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '文本内容' },
      { name: 'rows', type: 'int', default: '4', desc: '行数高度' },
      { name: 'max_length', type: 'int', default: '200', desc: '字数限制' },
      { name: 'show_word_limit', type: 'boolean', default: 'true', desc: '是否显示字数统计标签' }
    ],
    events: [
      { name: 'text_changed(new_text)', desc: '内容改变时触发', params: '(new_text: String)' }
    ],
    methods: [
      { name: 'clear()', desc: '清空文本域', params: '() -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 7. GInputNumber 数字输入框
  // --------------------------------------------------------
  'input-number': {
    title: 'InputNumber 数字输入框 (GInputNumber)',
    desc: '带有加减微调按钮与数值边界约束的数字输入组件。',
    demos: [
      {
        title: '1. 步进加减器 (Step Counter)',
        render: `
          <div style="display:inline-flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
            <button class="g-btn g-btn-default" style="border:none; border-radius:0; width:36px; padding:0;" onclick="let el=document.getElementById('numVal'); el.innerText=Math.max(0, parseInt(el.innerText)-1); showToast('Value: ' + el.innerText);">-</button>
            <span id="numVal" style="padding:0 18px; font-weight:600; min-width:40px; text-align:center;">10</span>
            <button class="g-btn g-btn-default" style="border:none; border-radius:0; width:36px; padding:0;" onclick="let el=document.getElementById('numVal'); el.innerText=Math.min(100, parseInt(el.innerText)+1); showToast('Value: ' + el.innerText);">+</button>
          </div>
        `,
        code: `# GDScript: InputNumber
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
      { name: 'value / v-model', type: 'float', default: '0.0', desc: '当前数值' },
      { name: 'min_value / min', type: 'float', default: '0.0', desc: '最小值' },
      { name: 'max_value / max', type: 'float', default: '100.0', desc: '最大值' },
      { name: 'step', type: 'float', default: '1.0', desc: '步进值' },
      { name: 'precision', type: 'int', default: '0', desc: '小数数值精度' }
    ],
    events: [
      { name: 'value_changed(new_value)', desc: '数值改变时触发', params: '(new_value: float)' }
    ],
    methods: [
      { name: 'increase()', desc: '数值按 step 增加', params: '() -> void' },
      { name: 'decrease()', desc: '数值按 step 减少', params: '() -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 8. GSwitch 开关
  // --------------------------------------------------------
  'switch': {
    title: 'Switch 开关 (GSwitch)',
    desc: '表示两种相互对立的状态间的切换，多用于触发即时动作。支持尺寸切换、自定义色彩与禁用。',
    demos: [
      {
        title: '1. 基础与不同尺寸开关 (Sizes & Colors)',
        render: `
          <div style="display:flex; gap:24px; align-items:center;">
            <label class="g-switch"><input type="checkbox" checked onchange="showToast('Switch 1: ' + this.checked, 'success')"><span class="g-switch-slider"></span></label>
            <label class="g-switch"><input type="checkbox" onchange="showToast('Switch 2: ' + this.checked, 'info')"><span class="g-switch-slider"></span></label>
          </div>
        `,
        code: `# GDScript: Switch
var sw = GSwitch.new()
sw.checked = true
sw.toggled.connect(func(val): print("Switch is:", val))
add_child(sw)`
      }
    ],
    props: [
      { name: 'checked / v-model', type: 'boolean', default: 'false', desc: '开关开启状态' },
      { name: 'switch_size', type: 'enum', default: 'MEDIUM', desc: '尺寸规格：SMALL, MEDIUM, LARGE' },
      { name: 'checked_color', type: 'Color', default: 'TRANSPARENT', desc: '激活状态自定义色彩' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' }
    ],
    events: [
      { name: 'toggled(checked)', desc: '开关状态改变时触发', params: '(checked: bool)' }
    ],
    methods: [
      { name: 'toggle()', desc: '翻转当前开关状态', params: '() -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 9. GCheckbox 多选框
  // --------------------------------------------------------
  'checkbox': {
    title: 'Checkbox 多选框 (GCheckbox & Group)',
    desc: '在一组可选项中进行多项选择。支持全选与半选 (Indeterminate) 状态联动。',
    demos: [
      {
        title: '1. Check All 全选联动与多选项 (Check All / Indeterminate)',
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
      { name: 'checked / v-model', type: 'boolean', default: 'false', desc: '是否勾选' },
      { name: 'text / label', type: 'String', default: '"Checkbox"', desc: '说明文字' },
      { name: 'indeterminate', type: 'boolean', default: 'false', desc: '半选/不确定状态' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' }
    ],
    events: [
      { name: 'toggled(checked)', desc: '勾选状态改变时触发', params: '(checked: bool)' }
    ],
    methods: [
      { name: 'set_checked(val: bool)', desc: '设置勾选状态', params: '(val: bool) -> void' }
    ],
    slots: [
      { name: 'default', desc: '自定义复选框文本内容', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 10. GRadio 单选框
  // --------------------------------------------------------
  'radio': {
    title: 'Radio 单选框 (GRadio & Group)',
    desc: '在一组备选项中进行单选。配合 GRadioGroup 自动管理选中互斥状态。',
    demos: [
      {
        title: '1. Radio Group 单选选项组',
        render: `
          <div style="display:flex; gap:20px; align-items:center;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Naive UI', 'success')"><input type="radio" name="r_demo" checked> <span>Naive UI</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Element Plus', 'success')"><input type="radio" name="r_demo"> <span>Element Plus</span></label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="showToast('Selected Ant Design', 'success')"><input type="radio" name="r_demo"> <span>Ant Design</span></label>
          </div>
        `,
        code: `# GDScript: Radio Group
var rg = GRadioGroup.new()
var r1 = GRadio.new()
r1.text = "Option 1"
rg.add_child(r1)
rg.value_changed.connect(func(v): print("Active:", v))
add_child(rg)`
      }
    ],
    props: [
      { name: 'checked / v-model', type: 'boolean', default: 'false', desc: '是否被选中' },
      { name: 'value', type: 'String', default: '""', desc: '选项标识绑定值' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' }
    ],
    events: [
      { name: 'selected()', desc: '被选中时触发', params: '()' }
    ],
    methods: [],
    slots: [
      { name: 'default', desc: '自定义单选按钮文本内容', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 11. GSelect 下拉选择器
  // --------------------------------------------------------
  'select': {
    title: 'Select 下拉选择器 (GSelect)',
    desc: '当选项过多时，使用下拉菜单展示并供用户选择内容。支持一键清空与选项禁用。',
    demos: [
      {
        title: '1. Dropdown Select 下拉选项',
        render: `
          <div style="display:flex; align-items:center; gap:16px;">
            <select class="select-theme" style="width: 260px; height: 38px;" onchange="showToast('Selected: ' + this.value, 'success')">
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
      { name: 'options', type: 'Array[Dictionary]', default: '[]', desc: '选项列表 [{"label": "", "value": "", "disabled": false}]' },
      { name: 'selected_index', type: 'int', default: '-1', desc: '当前选中的索引' },
      { name: 'placeholder_text', type: 'String', default: '"Select..."', desc: '占位提示' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '是否可一键清空' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用选择器' }
    ],
    events: [
      { name: 'item_selected(index, value, label)', desc: '选中项改变时触发', params: '(index: int, value: Variant, label: String)' },
      { name: 'cleared()', desc: '点击清空时触发', params: '()' }
    ],
    methods: [
      { name: 'clear()', desc: '清空当前选中的值', params: '() -> void' },
      { name: 'set_selected_by_value(val: Variant)', desc: '根据绑定的 value 设置选中项', params: '(val: Variant) -> void' }
    ],
    slots: [
      { name: 'prefix', desc: '选择框头部前缀图标', child: 'GIcon / Control' },
      { name: 'empty', desc: '选项列表为空时的占位内容', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 12. GSlider 滑块
  // --------------------------------------------------------
  'slider': {
    title: 'Slider 滑块 (GSlider)',
    desc: '通过拖动滑块在一个固定区间内进行数值的选择。',
    demos: [
      {
        title: '1. 连续滑动条 (Smooth Value Slider)',
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
      { name: 'value / v-model', type: 'float', default: '0.0', desc: '当前滑块数值' },
      { name: 'min_value / min', type: 'float', default: '0.0', desc: '最小值' },
      { name: 'max_value / max', type: 'float', default: '100.0', desc: '最大值' },
      { name: 'step', type: 'float', default: '1.0', desc: '步长' },
      { name: 'status', type: 'enum', default: 'PRIMARY', desc: '状态色彩' }
    ],
    events: [
      { name: 'value_changed(new_value)', desc: '滑块值改变时触发', params: '(new_value: float)' }
    ],
    methods: [
      { name: 'set_value(v: float)', desc: '程序化设置滑块值', params: '(v: float) -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 13. GForm 表单
  // --------------------------------------------------------
  'form': {
    title: 'Form 表单布局 (GForm & GFormItem)',
    desc: '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验和提交数据。支持标签位置 (Top/Left/Right)、统一宽度与星号必填校验。',
    demos: [
      {
        title: '1. 表单排版与校验提交 (Form Layout & Validation)',
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
      { name: 'label_position', type: 'enum', default: 'LEFT', desc: '标签对齐：LEFT (居左), TOP (居顶), RIGHT (居右)' },
      { name: 'label_width', type: 'float', default: '120.0', desc: '统一标签宽度 (像素)' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否统一禁用表单下的所有子输入控件' },
      { name: 'show_message', type: 'boolean', default: 'true', desc: '是否显示错误校验提示信息' }
    ],
    events: [
      { name: 'validate_success()', desc: '表单校验通过时触发', params: '()' },
      { name: 'validate_failed(errors)', desc: '表单校验失败时触发', params: '(errors: Dictionary)' }
    ],
    methods: [
      { name: 'validate()', desc: '对整个表单进行校验，返回 bool 校验结果', params: '() -> bool' },
      { name: 'reset_fields()', desc: '重置表单中所有字段至初始默认值并清除错误', params: '() -> void' },
      { name: 'clear_validate()', desc: '清除所有表单项的错误提示状态', params: '() -> void' }
    ],
    slots: [
      { name: 'default', desc: '表单项 GFormItem 容器插槽', child: 'GFormItem / Control' }
    ],
    paneProps: [
      { name: 'label', type: 'String', default: '""', desc: '表单项标签文本' },
      { name: 'prop', type: 'String', default: '""', desc: '表单域 model 字段名' },
      { name: 'required', type: 'boolean', default: 'false', desc: '是否必填，如为 true 会在 label 前生成红色星号' },
      { name: 'error_message', type: 'String', default: '""', desc: '表单项校验失败提示文本' }
    ]
  },

  // --------------------------------------------------------
  // 14. GDialog 对话框
  // --------------------------------------------------------
  'dialog': {
    title: 'Dialog / Modal 对话框 (GDialog)',
    desc: '居中弹出的模态对话框，包含基础确认、删除高危确认、自定义内容区、无取消按钮等完整弹窗场景。',
    demos: [
      {
        title: '1. 基础确认对话框 (Basic Confirm Dialog)',
        render: `
          <button class="g-btn g-btn-primary" onclick="openDialog('操作确认', '您确定要提交并部署当前配置吗？')">
            打开确认弹窗
          </button>
        `,
        code: `# GDScript: Confirm Dialog
var dlg = GDialog.new()
dlg.title = "Confirm Action"
dlg.content_text = "Do you want to proceed?"
dlg.confirmed.connect(func(): GMessage.success("Confirmed!"))
add_child(dlg)
dlg.open()`
      },
      {
        title: '2. 危险删除确认 (Danger Delete Warning)',
        render: `
          <button class="g-btn g-btn-danger" onclick="openDialog('删除警告', '此操作将彻底删除选中的 3 个文件，数据不可恢复！')">
            打开删除警告弹窗
          </button>
        `,
        code: `# GDScript: Danger Dialog
var danger_dlg = GDialog.new()
danger_dlg.title = "Delete Warning"
danger_dlg.content_text = "This action is irreversible!"
danger_dlg.confirm_button_text = "Confirm Delete"
add_child(danger_dlg)
danger_dlg.open()`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Dialog Title"', desc: '弹窗标题' },
      { name: 'content_text', type: 'String', default: '""', desc: '弹窗正文文本' },
      { name: 'confirm_button_text', type: 'String', default: '"Confirm"', desc: '确认按钮文本' },
      { name: 'cancel_button_text', type: 'String', default: '"Cancel"', desc: '取消按钮文本' },
      { name: 'show_cancel_button', type: 'boolean', default: 'true', desc: '是否显示取消按钮' },
      { name: 'mask_closable', type: 'boolean', default: 'true', desc: '点击背景遮罩是否允许关闭' },
      { name: 'dialog_width', type: 'float', default: '460.0', desc: '对话框宽度 (像素)' },
      { name: 'fullscreen', type: 'boolean', default: 'false', desc: '是否以全屏铺满形式展示' }
    ],
    events: [
      { name: 'confirmed()', desc: '点击确认按钮时触发', params: '()' },
      { name: 'cancelled()', desc: '点击取消按钮时触发', params: '()' },
      { name: 'opened()', desc: '弹窗打开动画结束时触发', params: '()' },
      { name: 'closed()', desc: '弹窗关闭动画结束时触发', params: '()' }
    ],
    methods: [
      { name: 'open()', desc: '播放弹性入场动画打开弹窗', params: '() -> void' },
      { name: 'close()', desc: '关闭弹窗并播放淡出动画', params: '() -> void' }
    ],
    slots: [
      { name: 'header', desc: '自定义弹窗顶部标题区域', child: 'Control' },
      { name: 'default', desc: '弹窗正文内容插槽', child: 'Control' },
      { name: 'footer', desc: '弹窗底部按钮操作区域', child: 'Control / HBoxContainer' }
    ]
  },

  // --------------------------------------------------------
  // 15. GMessage 全局提示
  // --------------------------------------------------------
  'message': {
    title: 'Message 全局提示 (GMessage)',
    desc: '全局悬浮吐司提示（Autoload 单例），在页面顶部居中堆叠展示，支持自动倒计时移除与进入/淡出动效。',
    demos: [
      {
        title: '1. 四类提示类型 (Success / Warning / Error / Info)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-success" onclick="showToast('保存成功！', 'success')">Success 成功</button>
            <button class="g-btn g-btn-warning" onclick="showToast('网络波动提醒...', 'warning')">Warning 警告</button>
            <button class="g-btn g-btn-danger" onclick="showToast('请求超时异常 (504)', 'danger')">Error 错误</button>
            <button class="g-btn g-btn-info" onclick="showToast('系统已更新至最新版本', 'info')">Info 消息</button>
          </div>
        `,
        code: `# GDScript: Call GMessage anywhere
GMessage.success("Successfully saved!")
GMessage.warning("Network connection unstable")
GMessage.error("Request failed (504)")
GMessage.info("System update ready")`
      }
    ],
    props: [],
    events: [],
    methods: [
      { name: 'success(content: String, duration: float = 3.0)', desc: '弹出成功提示', params: '(content: String, duration: float) -> void' },
      { name: 'warning(content: String, duration: float = 3.0)', desc: '弹出警告提示', params: '(content: String, duration: float) -> void' },
      { name: 'error(content: String, duration: float = 3.0)', desc: '弹出错误提示', params: '(content: String, duration: float) -> void' },
      { name: 'info(content: String, duration: float = 3.0)', desc: '弹出普通信息提示', params: '(content: String, duration: float) -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 16. GAlert 警告提示
  // --------------------------------------------------------
  'alert': {
    title: 'Alert 警告提示 (GAlert)',
    desc: '用于页面中展示重要的提示信息。支持成功、警告、危险与信息4种状态色彩，支持关闭按钮。',
    demos: [
      {
        title: '1. Alert Banners 四类状态提示横幅',
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
      { name: 'type', type: 'enum', default: 'INFO', desc: '类型：INFO, SUCCESS, WARNING, DANGER' },
      { name: 'title', type: 'String', default: '"Alert Title"', desc: '标题文本' },
      { name: 'description', type: 'String', default: '""', desc: '辅助描述详细说明' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '是否显示关闭按钮' },
      { name: 'center', type: 'boolean', default: 'false', desc: '文字是否居中' }
    ],
    events: [
      { name: 'closed()', desc: '点击关闭按钮时触发', params: '()' }
    ],
    methods: [
      { name: 'close()', desc: '关闭并移除该 Alert', params: '() -> void' }
    ],
    slots: [
      { name: 'title', desc: '自定义标题插槽', child: 'Control' },
      { name: 'default', desc: '自定义辅助描述内容插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 17. GDrawer 抽屉
  // --------------------------------------------------------
  'drawer': {
    title: 'Drawer 抽屉 (GDrawer)',
    desc: '从屏幕边缘平滑滑出的浮层面板。支持从上、下、左、右四个方位滑出，内嵌长表单、设置项与自定义操作。',
    demos: [
      {
        title: '1. 四方位滑出抽屉 (Directional Drawers)',
        render: `
          <div style="display:flex; gap:12px;">
            <button class="g-btn g-btn-primary" onclick="openDrawer('right')">打开右侧抽屉 (Right)</button>
            <button class="g-btn g-btn-default" onclick="openDrawer('left')">打开左侧抽屉 (Left)</button>
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
      { name: 'title', type: 'String', default: '"Drawer Title"', desc: '抽屉标题' },
      { name: 'placement', type: 'enum', default: 'RIGHT', desc: '展开方向：RIGHT, LEFT, TOP, BOTTOM' },
      { name: 'drawer_size', type: 'float', default: '360.0', desc: '抽屉宽度或高度 (像素)' },
      { name: 'mask_closable', type: 'boolean', default: 'true', desc: '点击背景遮罩是否允许关闭' },
      { name: 'show_close', type: 'boolean', default: 'true', desc: '是否显示右上角关闭叉号' }
    ],
    events: [
      { name: 'opened()', desc: '抽屉滑出动画结束时触发', params: '()' },
      { name: 'closed()', desc: '抽屉滑回关闭时触发', params: '()' }
    ],
    methods: [
      { name: 'open()', desc: '展开滑出抽屉面板', params: '() -> void' },
      { name: 'close()', desc: '收起并关闭抽屉面板', params: '() -> void' }
    ],
    slots: [
      { name: 'header', desc: '自定义抽屉头部', child: 'Control' },
      { name: 'default', desc: '抽屉主体内容插槽', child: 'Control' },
      { name: 'footer', desc: '抽屉底部操作插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 18. GTooltip 悬浮提示
  // --------------------------------------------------------
  'tooltip': {
    title: 'Tooltip 悬浮提示 (GTooltip)',
    desc: '常用于展示鼠标 hover 时的提示信息。',
    demos: [
      {
        title: '1. 鼠标悬停提示 (Tooltip Hover)',
        render: `
          <button class="g-btn g-btn-default" title="This is tooltip info" onclick="showToast('Hovered target clicked')">
            Hover over me 鼠标悬停查看提示
          </button>
        `,
        code: `# GDScript: Tooltip
var tip = GTooltip.new()
tip.content = "More details about this button"
add_child(tip)`
      }
    ],
    props: [
      { name: 'content', type: 'String', default: '""', desc: '提示文本' },
      { name: 'placement', type: 'enum', default: 'TOP', desc: '提示位置：TOP, BOTTOM, LEFT, RIGHT' },
      { name: 'dark_theme', type: 'boolean', default: 'true', desc: '深色/浅色气泡背景' }
    ],
    events: [],
    methods: [
      { name: 'show_tooltip()', desc: '手动显示气泡', params: '() -> void' },
      { name: 'hide_tooltip()', desc: '手动隐藏气泡', params: '() -> void' }
    ],
    slots: [
      { name: 'content', desc: '自定义复杂气泡内容插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 19. GLoading 加载指示器
  // --------------------------------------------------------
  'loading': {
    title: 'Loading 加载指示器 (GLoading)',
    desc: '加载数据时显示动效，防止用户以为系统卡死。',
    demos: [
      {
        title: '1. 旋转加载动效 (Animated Spinner)',
        render: `
          <div style="display:flex; align-items:center; gap:14px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:28px; color:var(--primary);"></i>
            <span style="font-size:0.92rem; color:var(--text-secondary);">Loading assets in progress...</span>
          </div>
        `,
        code: `# GDScript: Loading
var loading = GLoading.new()
loading.text = "Loading..."
add_child(loading)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Loading..."', desc: '加载提示文字' },
      { name: 'spinner_size', type: 'float', default: '36.0', desc: '旋转圈尺寸 (像素)' },
      { name: 'fullscreen', type: 'boolean', default: 'false', desc: '是否覆盖全屏遮罩加载' }
    ],
    events: [],
    methods: [
      { name: 'show()', desc: '显示加载指示器', params: '() -> void' },
      { name: 'hide()', desc: '隐藏加载指示器', params: '() -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 20. GCard 卡片
  // --------------------------------------------------------
  'card': {
    title: 'Card 卡片 (GCard)',
    desc: '将信息聚合在卡片容器中展示。支持标题栏、右上角 Extra 扩展操作区与边框阴影。',
    demos: [
      {
        title: '1. 基础内容卡片 (Basic Card)',
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
card.extra_text = "More"
add_child(card)`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"Card Title"', desc: '卡片标题' },
      { name: 'extra_text', type: 'String', default: '""', desc: '右上角额外操作文本' },
      { name: 'bordered', type: 'boolean', default: 'true', desc: '是否带有边框' },
      { name: 'shadow', type: 'enum', default: 'ALWAYS', desc: '阴影展示时机：ALWAYS, HOVER, NEVER' }
    ],
    events: [
      { name: 'extra_clicked()', desc: '点击右上角 Extra 文本时触发', params: '()' }
    ],
    methods: [],
    slots: [
      { name: 'header', desc: '自定义卡片头部区域', child: 'Control' },
      { name: 'default', desc: '卡片正文内容插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 21. GTag 标签
  // --------------------------------------------------------
  'tag': {
    title: 'Tag 标签 (GTag)',
    desc: '用于标记和选择。支持 Light, Outline, Solid 三种质感及动态添加/关闭操作。',
    demos: [
      {
        title: '1. 动态增减标签 (Dynamic Tags)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div id="dynamicTagBox" style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <span class="g-tag g-tag-primary">Godot 4.x <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button></span>
              <span class="g-tag g-tag-success">Vue UI <button onclick="removeTagDemo(this)" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:4px;">×</button></span>
              <span class="g-tag g-tag-warning">Naive UI</span>
            </div>
            <div><button class="g-btn g-btn-default" onclick="addDynamicTag()">+ New Tag 新增标签</button></div>
          </div>
        `,
        code: `# GDScript: Tag
var tag = GTag.new()
tag.text = "Godot 4"
tag.type = GThemeTokens.Status.PRIMARY
tag.closable = true
add_child(tag)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '"Tag"', desc: '标签文本' },
      { name: 'type', type: 'enum', default: 'DEFAULT', desc: '色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO' },
      { name: 'variant', type: 'enum', default: 'LIGHT', desc: '质感风格：LIGHT, OUTLINE, SOLID' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '是否显示关闭按钮' },
      { name: 'round', type: 'boolean', default: 'false', desc: '是否圆角胶囊形态' }
    ],
    events: [
      { name: 'closed()', desc: '点击关闭按钮时触发', params: '()' },
      { name: 'clicked()', desc: '点击标签本身时触发', params: '()' }
    ],
    methods: [],
    slots: []
  },

  // --------------------------------------------------------
  // 22. GBadge 徽标
  // --------------------------------------------------------
  'badge': {
    title: 'Badge 徽标 (GBadge)',
    desc: '按钮和图标上的数字或状态标记。支持 99+ 溢出保护与小红圆点模式。',
    demos: [
      {
        title: '1. 数量与圆点徽标 (Count & Dot Badges)',
        render: `
          <div style="display:flex; gap:28px; align-items:center;">
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default" onclick="showToast('Notification badge')">Notifications</button>
              <span style="position:absolute; top:-6px; right:-6px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:99px; font-weight:700;">99+</span>
            </div>
            <div style="position:relative; display:inline-block;">
              <button class="g-btn g-btn-default" onclick="showToast('Message dot')">Messages</button>
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
      { name: 'value', type: 'int', default: '0', desc: '徽标显示数字' },
      { name: 'max_value', type: 'int', default: '99', desc: '最大值，超出显示 max_value+' },
      { name: 'is_dot', type: 'boolean', default: 'false', desc: '是否仅显示小红圆点' },
      { name: 'hidden', type: 'boolean', default: 'false', desc: '是否隐藏徽标' }
    ],
    events: [],
    methods: [],
    slots: [
      { name: 'default', desc: '徽标所依附的宿主控件', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 23. GAvatar 头像
  // --------------------------------------------------------
  'avatar': {
    title: 'Avatar 头像 (GAvatar)',
    desc: '用来代表用户或事物，支持图片、图标或字符展示。',
    demos: [
      {
        title: '1. 头像形态 (Avatar Shapes)',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <div style="width:42px; height:42px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">G</div>
            <div style="width:42px; height:42px; border-radius:8px; background:var(--info); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">V</div>
          </div>
        `,
        code: `# GDScript: Avatar
var av = GAvatar.new()
av.text = "Godot"
av.shape = GAvatar.Shape.CIRCLE
add_child(av)`
      }
    ],
    props: [
      { name: 'avatar_size', type: 'float', default: '40.0', desc: '头像尺寸 (像素)' },
      { name: 'shape', type: 'enum', default: 'CIRCLE', desc: '形状：CIRCLE (圆形), SQUARE (圆角矩形)' },
      { name: 'text', type: 'String', default: '"U"', desc: '无图片时的文字首字母' },
      { name: 'texture', type: 'Texture2D', default: 'null', desc: '头像图片纹理' }
    ],
    events: [],
    methods: [],
    slots: []
  },

  // --------------------------------------------------------
  // 24. GProgress 进度条
  // --------------------------------------------------------
  'progress': {
    title: 'Progress 进度条 (GProgress)',
    desc: '用于展示操作进度，告知用户当前状态和预期。支持线性条状与圆形环状。',
    demos: [
      {
        title: '1. 多状态进度条 (Progress Statuses)',
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
      { name: 'type', type: 'enum', default: 'LINE', desc: '类型：LINE (线性), CIRCLE (环形)' },
      { name: 'status', type: 'enum', default: 'PRIMARY', desc: '状态色彩' },
      { name: 'stroke_width', type: 'float', default: '6.0', desc: '进度条线条粗细' }
    ],
    events: [],
    methods: [
      { name: 'set_percentage(val: float)', desc: '平滑更新进度条数值', params: '(val: float) -> void' }
    ],
    slots: []
  },

  // --------------------------------------------------------
  // 25. GTabs 标签页
  // --------------------------------------------------------
  'tabs': {
    title: 'Tabs 标签页 (GTabs)',
    desc: '分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。',
    demos: [
      {
        title: '1. 基础用法 (Basic Usage)',
        render: `
          <div id="tabsBasicContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:24px; border-bottom:1px solid var(--border-base); margin-bottom:16px;">
                <div class="sim-tab-header active" onclick="switchTabDemo(0, 'tabsBasicContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding-bottom:10px; border-bottom:2px solid var(--primary); transition:all 0.2s;">User</div>
                <div class="sim-tab-header" onclick="switchTabDemo(1, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Config</div>
                <div class="sim-tab-header" onclick="switchTabDemo(2, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Role</div>
                <div class="sim-tab-header" onclick="switchTabDemo(3, 'tabsBasicContainer')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:10px; border-bottom:2px solid transparent; transition:all 0.2s;">Task</div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>User</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">User panel content in Godot 4.x GTabs.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Config</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Config panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Role</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Role panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                  <h3>Task</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Task panel content.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Basic Tabs
var tabs = GTabs.new()
tabs.add_tab("User", user_panel)
tabs.add_tab("Config", config_panel)
tabs.add_tab("Role", role_panel)
tabs.add_tab("Task", task_panel)
tabs.tab_changed.connect(func(idx, name): print("Active tab:", name))
add_child(tabs)`
      },
      {
        title: '2. 选项卡样式 (Card Style: type="card")',
        render: `
          <div id="tabsCardContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:0; border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" data-tab-type="card" onclick="switchTabDemo(0, 'tabsCardContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-bottom:1px solid var(--bg-card); background:var(--bg-card); border-radius:4px 4px 0 0;">User</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(1, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Config</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(2, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Role</div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(3, 'tabsCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 20px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0;">Task</div>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>User</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style User content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Config</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Card style Config content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Role</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Role panel content.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Task</h3>
                  <p style="color:var(--text-secondary); margin-top:4px;">Task panel content.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Card Style
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.add_tab("User", user_panel)
add_child(tabs)`
      },
      {
        title: '3. 边框卡片化 (Border Card: type="border-card")',
        render: `
          <div id="tabsBorderCardContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;">
              <div class="sim-tab-nav-list" style="display:flex; background:var(--bg-surface); border-bottom:1px solid var(--border-base);">
                <div class="sim-tab-header active" data-tab-type="border-card" onclick="switchTabDemo(0, 'tabsBorderCardContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:10px 20px; background:var(--bg-card); border-right:1px solid var(--border-base);">User</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(1, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px; border-right:1px solid var(--border-base);">Config</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(2, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px; border-right:1px solid var(--border-base);">Role</div>
                <div class="sim-tab-header" data-tab-type="border-card" onclick="switchTabDemo(3, 'tabsBorderCardContainer')" style="color:var(--text-secondary); cursor:pointer; padding:10px 20px;">Task</div>
              </div>
              <div class="sim-tab-panel-box" style="padding:18px; background:var(--bg-card);">
                <div class="sim-tab-panel" style="display:block;"><h3>User</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card User panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Config</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Config panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Role</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Role panel.</p></div>
                <div class="sim-tab-panel" style="display:none;"><h3>Task</h3><p style="color:var(--text-secondary); margin-top:4px;">Border Card Task panel.</p></div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Border Card Style
var tabs = GTabs.new()
tabs.type = GTabs.TabType.BORDER_CARD
tabs.add_tab("User", user_panel)
add_child(tabs)`
      },
      {
        title: '4. 动态增减与关闭 (Dynamic Add & Remove Tabs)',
        render: `
          <div id="tabsDynamicContainer" style="width:100%;">
            <div class="sim-tab-wrapper" style="display:flex; flex-direction:column;">
              <div class="sim-tab-nav-list" style="display:flex; gap:0; border-bottom:1px solid var(--border-base); align-items:center;">
                <div class="sim-tab-header active" data-tab-type="card" onclick="switchTabDemo(0, 'tabsDynamicContainer')" style="color:var(--primary); font-weight:600; cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-bottom:1px solid var(--bg-card); background:var(--bg-card); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 1</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, 'tabsDynamicContainer');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>
                </div>
                <div class="sim-tab-header" data-tab-type="card" onclick="switchTabDemo(1, 'tabsDynamicContainer')" style="color:var(--text-secondary); cursor:pointer; padding:8px 16px; border:1px solid var(--border-base); border-left:none; border-bottom:1px solid var(--border-base); background:var(--bg-surface); border-radius:4px 4px 0 0; display:inline-flex; align-items:center; gap:8px;">
                  <span>Tab 2</span> <button onclick="event.stopPropagation(); removeDynamicTabPane(this, 'tabsDynamicContainer');" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px;">×</button>
                </div>
                <button class="sim-tab-add-btn" onclick="addDynamicTabPane('tabsDynamicContainer')" style="margin-left:8px; background:var(--bg-surface); border:1px solid var(--border-base); color:var(--text-primary); border-radius:4px; padding:4px 10px; cursor:pointer; font-size:14px; font-weight:700;">+</button>
              </div>
              <div class="sim-tab-panel-box">
                <div class="sim-tab-panel" style="display:block; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 1 content</h3><p style="color:var(--text-secondary); margin-top:4px;">Tab 1 initial panel.</p>
                </div>
                <div class="sim-tab-panel" style="display:none; padding:18px; background:var(--bg-card); border:1px solid var(--border-base); border-top:none; border-radius:0 0 var(--radius) var(--radius);">
                  <h3>Tab 2 content</h3><p style="color:var(--text-secondary); margin-top:4px;">Tab 2 initial panel.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Dynamic Add & Remove Tabs
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.closable = true
tabs.addable = true
add_child(tabs)`
      }
    ],
    props: [
      { name: 'model-value / current_tab', type: 'string / number', default: '0', desc: '绑定值，选中选项卡的 name 或索引，默认是第一个 tab' },
      { name: 'type', type: 'enum', default: "'' (LINE)", desc: '风格类型：LINE, CARD, BORDER_CARD, SEGMENT' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '标签是否可关闭' },
      { name: 'addable', type: 'boolean', default: 'false', desc: '标签是否可增加' },
      { name: 'editable', type: 'boolean', default: 'false', desc: '标签是否同时可增加和关闭' },
      { name: 'tab-position', type: 'enum', default: 'top', desc: '选项卡所在位置：top, bottom, left, right' },
      { name: 'stretch', type: 'boolean', default: 'false', desc: '标签的宽度是否自撑开' },
      { name: 'before-leave', type: 'Callable / Function', default: '() => true', desc: '切换标签之前的钩子函数，若返回 false 则阻止切换' }
    ],
    events: [
      { name: 'tab-click(index, name)', desc: 'tab 被选中点击时触发', params: '(index: int, name: String)' },
      { name: 'tab-change(active_name)', desc: 'activeName 改变时触发', params: '(index: int, name: String)' },
      { name: 'tab-remove(name)', desc: '点击 tab 移除按钮时触发', params: '(name: String)' },
      { name: 'tab-add()', desc: '点击 tab 新增按钮时触发', params: '()' }
    ],
    methods: [
      { name: 'add_tab(name: String, panel: Control, closable: bool = false)', desc: '动态追加一个选项卡及关联面板', params: '(name: String, panel: Control, closable: bool) -> void' },
      { name: 'remove_tab(index: int)', desc: '根据索引移除选项卡及面板', params: '(index: int) -> void' },
      { name: 'set_current_tab(index: int)', desc: '程序化切换当前激活标签', params: '(index: int) -> void' }
    ],
    slots: [
      { name: 'default', desc: '默认插槽，放入 Tab-pane 面板节点', child: 'Tab-pane / Control' },
      { name: 'add-icon', desc: '自定义添加按钮图标', child: 'GIcon / Texture2D' }
    ],
    paneProps: [
      { name: 'label', type: 'string', default: "''", desc: '选项卡标题文字' },
      { name: 'name', type: 'string / number', default: "''", desc: '与选项卡绑定值 value 对应的标识符' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用该标签页' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '该标签是否可单独关闭' }
    ]
  },

  // --------------------------------------------------------
  // 26. GCollapse 折叠面板
  // --------------------------------------------------------
  'collapse': {
    title: 'Collapse 折叠面板 (GCollapse)',
    desc: '通过折叠面板收纳内容区域。具备点击平滑展开/折叠动效与箭头旋转。',
    demos: [
      {
        title: '1. 折叠手风琴面板 (Interactive Accordion)',
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
      { name: 'is_open', type: 'boolean', default: 'false', desc: '是否展开' },
      { name: 'accordion', type: 'boolean', default: 'false', desc: '是否手风琴互斥模式' }
    ],
    events: [
      { name: 'toggled(is_open)', desc: '展开/收起状态改变时触发', params: '(is_open: bool)' }
    ],
    methods: [
      { name: 'toggle()', desc: '切换展开与收起状态', params: '() -> void' },
      { name: 'set_open(open_state: bool)', desc: '显式设置面板展开或收起', params: '(open_state: bool) -> void' }
    ],
    slots: [
      { name: 'title', desc: '自定义面板标题区域', child: 'Control' },
      { name: 'default', desc: '折叠内容插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 27. GSteps 步骤条
  // --------------------------------------------------------
  'steps': {
    title: 'Steps 步骤条 (GSteps)',
    desc: '引导用户按照流程完成任务的分步导航条。支持点击下一步/上一步动态驱动连线与状态点亮。',
    demos: [
      {
        title: '1. 交互式步骤条 (Interactive Step Process)',
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
      { name: 'current_step / active', type: 'int', default: '0', desc: '当前激活步骤索引 (从 0 开始)' },
      { name: 'direction', type: 'enum', default: 'HORIZONTAL', desc: '显示方向：HORIZONTAL, VERTICAL' },
      { name: 'finish_status', type: 'enum', default: 'SUCCESS', desc: '已完成步骤的状态类型' }
    ],
    events: [
      { name: 'step_changed(current_step)', desc: '当前步骤改变时触发', params: '(current_step: int)' }
    ],
    methods: [
      { name: 'next()', desc: '前进至下一步', params: '() -> void' },
      { name: 'prev()', desc: '返回上一步', params: '() -> void' },
      { name: 'set_step(index: int)', desc: '直接跳转到指定步骤', params: '(index: int) -> void' }
    ],
    slots: [
      { name: 'default', desc: '自定义步骤子项插槽', child: 'Control' }
    ]
  },

  // --------------------------------------------------------
  // 28. GSpace 间距布局
  // --------------------------------------------------------
  'space': {
    title: 'Space 间距布局 (GSpace)',
    desc: '设置组件之间的间距。避免组件紧贴在一起，提升页面结构的规整度。支持水平/垂直方向与自动换行 (Wrap)。',
    demos: [
      {
        title: '1. 流式弹性自动间距 (Fluid Spacing & Wrap)',
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
      { name: 'gap', type: 'float', default: '12.0', desc: '子节点间距 (像素)' },
      { name: 'wrap', type: 'boolean', default: 'true', desc: '超出容器宽度时是否自动换行' },
      { name: 'direction', type: 'enum', default: 'HORIZONTAL', desc: '排列方向：HORIZONTAL, VERTICAL' }
    ],
    events: [],
    methods: [],
    slots: [
      { name: 'default', desc: '放置需要保持均匀间距的子节点', child: 'Control' }
    ]
  }
};

// Merge into global DOCS
if (typeof DOCS !== 'undefined') {
  Object.assign(DOCS, window.COMPONENT_CATALOG);
}
