// =========================================================================
// Gotod Components UI - All Components Comprehensive Catalog
// 深度涵盖 Element Plus, Naive UI, Ant Design Vue, Vant UI
// 包含全量场景示例、Attributes (属性)、Events (事件/信号)、Methods (方法名)、Slots (插槽)、子组件属性
// =========================================================================

window.COMPONENT_CATALOG = {
  // ========================================================
  // 1. BUTTON 按钮 (GButton)
  // ========================================================
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

  // ========================================================
  // 2. INPUT 输入框 (GInput)
  // ========================================================
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

  // ========================================================
  // 3. DIALOG 对话框 (GDialog)
  // ========================================================
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

  // ========================================================
  // 4. FORM 表单 (GForm & GFormItem)
  // ========================================================
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

  // ========================================================
  // 5. DRAWER 抽屉 (GDrawer)
  // ========================================================
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

  // ========================================================
  // 6. SELECT 下拉选择 (GSelect)
  // ========================================================
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

  // ========================================================
  // 7. COLLAPSE 折叠面板 (GCollapse)
  // ========================================================
  'collapse': {
    title: 'Collapse 折叠面板 (GCollapse)',
    desc: '通过折叠面板收纳内容区域。具备点击平滑展开/折叠动效与箭头旋转。',
    demos: [
      {
        title: '1. Interactive Accordion 折叠手风琴',
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
      { name: 'title', type: 'String', default: '"Collapse Title"', desc: '折叠面板标题' },
      { name: 'is_open', type: 'boolean', default: 'false', desc: '是否默认展开' },
      { name: 'accordion', type: 'boolean', default: 'false', desc: '是否开启手风琴互斥展开模式' }
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

  // ========================================================
  // 8. STEPS 步骤条 (GSteps)
  // ========================================================
  'steps': {
    title: 'Steps 步骤条 (GSteps)',
    desc: '引导用户按照流程完成任务的分步导航条。支持点击下一步/上一步动态驱动连线与状态点亮。',
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
  }
};

// Merge into global DOCS
if (typeof DOCS !== 'undefined') {
  Object.assign(DOCS, window.COMPONENT_CATALOG);
}
