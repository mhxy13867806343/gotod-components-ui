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
      },
      {
        title: '6. 插槽自定义内容 (Custom Slot Usage: #default & #icon & #loading)',
        render: `
          <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:center;">
            <!-- #icon + #default slot -->
            <button class="g-btn g-btn-primary" onclick="showToast('点击了自定义插槽按钮', 'success')">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>购买强化石 <b style="color:#fcd34d; margin-left:4px;">¥99</b></span>
            </button>

            <!-- Custom #icon slot with Badge -->
            <button class="g-btn g-btn-default" onclick="showToast('点击了带角标插槽按钮')">
              <span style="position:relative; display:inline-flex; align-items:center;">
                <i class="fa-solid fa-bell"></i>
                <span style="position:absolute; top:-4px; right:-6px; width:6px; height:6px; background:var(--danger); border-radius:50%;"></span>
              </span>
              <span style="margin-left:6px;">消息通知</span>
            </button>

            <!-- Custom #loading slot -->
            <button class="g-btn g-btn-warning">
              <i class="fa-solid fa-circle-notch fa-spin" style="color:#fff;"></i>
              <span style="margin-left:6px;">同步云存档中...</span>
            </button>
          </div>
        `,
        code: `<!-- 方式 1: Vue 3 模板插槽语法 (Vue Template Slots) -->
<GButton type="primary">
  <template #icon>
    <GIcon name="cart-shopping" color="yellow" />
  </template>
  <template #default>
    <span>购买强化石 <b style="color:#fcd34d;">¥99</b></span>
  </template>
</GButton>

# 方式 2: Godot GDScript 点语法直接配置 Slot (Dot Slot Property Syntax)
var btn = GButton.new()
btn.button_type = GButton.ButtonType.PRIMARY

# 1. 默认插槽配置 (默认无名字 default slot)
btn.slotName = ""              # 默认 default 插槽
btn.slotName.text = "购买强化石"
btn.slotName.color = "white"

# 2. 具名插槽配置 (Named slot: icon)
btn.slotName = "icon"
btn.icon.name = "cart-shopping"
btn.icon.color = "yellow"

# 3. 自定义具名插槽绑定与赋值 (Custom Slot: t1)
btn.slotName = "t1"
btn.t1.color = "#fcd34d"
btn.t1.text = 99               # 直接修改插槽文本与色彩`
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
      { name: 'default', desc: '按钮内部文字或自定义节点插槽', child: 'GText / Label / Control', example: '<template #default>确认支付 ¥99</template>' },
      { name: 'icon', desc: '按钮前置自定义图标插槽', child: 'GIcon / TextureRect', example: '<template #icon><GIcon name="bag-shopping" /></template>' },
      { name: 'loading', desc: '自定义加载中动画或占位插槽', child: 'GLoading / TextureProgressBar', example: '<template #loading><GLoading size="14" /></template>' }
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
    slots: [
      { name: 'default', desc: '文本主体内容插槽', child: 'Label / RichTextLabel', example: '<template #default>这是一段带渐变高亮的正文</template>' },
      { name: 'prefix', desc: '文本前置修饰插槽（如标签或图标）', child: 'GIcon / GTag / Control', example: '<template #prefix><GTag type="primary">HOT</GTag></template>' },
      { name: 'suffix', desc: '文本后置修饰插槽（如角标或单位）', child: 'GIcon / GBadge / Control', example: '<template #suffix><GBadge is_dot /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 2.2 GContainer 布局容器 (Element Plus 对标 & 游戏实战布局)
  // --------------------------------------------------------
  'container': {
    title: 'Container 布局容器 (GContainer & Game Layouts)',
    desc: '用于搭建游戏 HUD 主界面、JRPG 战术面板、MMORPG 战场或后台管理系统的全套整体布局架构。深度对标 Element Plus Container 规范，提供 GContainer（外层弹性容器）、GHeader（顶栏）、GAside（侧边栏）、GMain（主要区域）与 GFooter（底栏）。支持灵活的嵌套组合与自定义游戏主题布局。',
    demos: [
      {
        title: '1. 回合制 JRPG 主菜单与队伍状态布局 (Turn-based RPG Main Menu - 对标截图 1)',
        render: `
          <div style="width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);">
            <!-- Middle Split: Left Hero Status Panel + Right 2x5 Action Grid & Summary Box -->
            <div style="display:flex; gap:14px; min-height:220px;">
              <!-- Left Aside: Big Character Status Box (Gothic Gold Border) -->
              <div style="flex:1.2; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:10px; position:relative; box-shadow:inset 0 0 15px rgba(0,0,0,0.6);">
                <div style="display:flex; gap:12px; align-items:center; border-bottom:1px solid #1a2d5a; padding-bottom:8px;">
                  <div style="width:48px; height:48px; background:rgba(255,255,255,0.08); border:1px solid #b8860b; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:24px;">🧙‍♂️</div>
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; font-weight:700; font-size:13px; color:#ffd700;">
                      <span>纳哈特</span>
                      <span>自由人</span>
                    </div>
                    <div style="font-size:11px; color:#a4b0be; margin-top:2px;">LV 1 (前排)</div>
                  </div>
                  <div style="text-align:right; font-size:11px;">
                    <div style="color:#67c23a; font-weight:700;">HP 10 / 10</div>
                    <div style="color:#409eff; font-weight:700; margin-top:2px;">MP 20 / 20</div>
                  </div>
                </div>
                <div style="flex:1; display:flex; align-items:center; justify-content:center; color:#57606f; font-size:11px; border:1px dashed #1a2d5a; border-radius:4px;">
                  [ 角色 2D 像素待机与装备插槽区域 ]
                </div>
              </div>

              <!-- Right Column: 2x5 Grid Commands + Time & Gold Summary -->
              <div style="flex:1; display:flex; flex-direction:column; gap:10px;">
                <!-- 2x5 Action Grid (职业, 能力, 道具, 魔法·技能, 装备, 状态, 队列, 设定, 中断, 储存) -->
                <div style="background:#0a1733; border:2px solid #b8860b; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">职业</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">能力</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">道具</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">魔法·技能</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">装备</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">状态</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">队列</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">设定</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">中断</button>
                  <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;">储存</button>
                </div>

                <!-- Bottom Right Summary (TIME & 金币) -->
                <div style="background:#0a1733; border:2px solid #b8860b; border-radius:8px; padding:8px 12px; font-size:11px; display:flex; flex-direction:column; gap:4px;">
                  <div style="display:flex; justify-content:space-between; color:#a4b0be;"><span>TIME</span><b style="color:#fff;">0:00</b></div>
                  <div style="display:flex; justify-content:space-between; color:#a4b0be;"><span>金币</span><b style="color:#ffd700;">10000</b></div>
                </div>
              </div>
            </div>

            <!-- Bottom Action Row: [ 替换 ] on Left, [ 返回 ] on Right -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:4px;">
              <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;">替换</button>
              <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;" onclick="showToast('点击返回上一级菜单')">返回</button>
            </div>
          </div>
        `,
        code: `# GDScript: 回合制 JRPG 主菜单结构 (1:1 还原截图 1)
var menu_root = GContainer.new() # 根容器

# 1. 中间水平双分栏：左侧角色大卡片 + 右侧 2x5 指令与概览
var mid_box = GContainer.new()
mid_box.direction = GContainer.Direction.HORIZONTAL

var left_hero_aside = GAside.new()
left_hero_aside.size_flags_stretch_ratio = 1.2
left_hero_aside.add_child(hero_status_card)

var right_col = GContainer.new()
right_col.direction = GContainer.Direction.VERTICAL
right_col.add_child(grid_2x5_command_buttons)
right_col.add_child(time_gold_summary_box)

mid_box.add_child(left_hero_aside)
mid_box.add_child(right_col)

# 2. 底栏操作条：左侧【替换】+ 右侧【返回】
var footer_bar = GFooter.new()
footer_bar.height = 40.0
footer_bar.add_child(bottom_replace_and_return_hbox)

menu_root.add_child(mid_box)
menu_root.add_child(footer_bar)
add_child(menu_root)`
      },
      {
        title: '2. 游戏多分页系统设定面板 (Game Settings Panel - 对标截图 2)',
        render: `
          <div style="width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);">
            <div style="font-weight:700; font-size:15px; color:#fff;">设定 1</div>
            
            <!-- Center Main Settings Card (Gothic Gold Frame) -->
            <div style="background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:16px 20px; display:flex; flex-direction:column; gap:14px; box-shadow:inset 0 0 15px rgba(0,0,0,0.6);">
              <div style="font-size:12px; color:#a4b0be; border-bottom:1px solid #1a2d5a; padding-bottom:6px;">设定BGM音量</div>
              
              <!-- BGM & SE Sliders -->
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="display:flex; align-items:center; gap:14px;">
                  <span style="width:50px; color:#ffd700; font-weight:700;">BGM</span>
                  <input type="range" style="flex:1;" value="80">
                </div>
                <div style="display:flex; align-items:center; gap:14px;">
                  <span style="width:50px; color:#ffd700; font-weight:700;">SE</span>
                  <input type="range" style="flex:1;" value="65">
                </div>
              </div>

              <!-- Operation Mode [ 默认 | 滑动 | 固定 ] -->
              <div style="display:flex; align-items:center; gap:14px; margin-top:4px;">
                <span style="width:50px; color:#ffd700; font-weight:700;">操作</span>
                <div style="display:flex; gap:8px;">
                  <button class="g-btn g-btn-primary" style="height:26px; padding:0 14px; font-size:11px;">默认</button>
                  <button class="g-btn g-btn-default" style="height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;">滑动</button>
                  <button class="g-btn g-btn-default" style="height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;">固定</button>
                </div>
              </div>

              <!-- Minimap Toggle [ ON | OFF ] -->
              <div style="display:flex; align-items:center; gap:14px;">
                <span style="width:70px; color:#ffd700; font-weight:700;">显示小地图</span>
                <div style="display:flex; gap:8px;">
                  <button class="g-btn g-btn-primary" style="height:26px; padding:0 14px; font-size:11px;">ON</button>
                  <button class="g-btn g-btn-default" style="height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;">OFF</button>
                </div>
              </div>

              <div style="font-size:11px; color:#a4b0be; margin-top:8px;">音量、操作方式和小地图显示会保存到设置档。</div>
            </div>

            <!-- Bottom Row: [ 1 ] [ 2 ] [ 3 ] on Left, [ 返回 ] on Right -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:4px;">
              <div style="display:flex; gap:6px;">
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;">1</button>
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;">2</button>
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;">3</button>
              </div>
              <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;" onclick="showToast('返回主菜单')">返回</button>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏多分页系统设置面板 (1:1 还原截图 2)
var settings_root = GContainer.new()

var header_title = GHeader.new()
header_title.height = 36.0
header_title.add_child(GText.new().set_text("设定 1"))

var main_settings_card = GMain.new()
main_settings_card.add_child(audio_sliders_vbox)
main_settings_card.add_child(control_mode_radio_group)
main_settings_card.add_child(minimap_toggle_switch)

var footer_nav = GFooter.new()
footer_nav.height = 40.0
footer_nav.add_child(pagination_and_back_button_hbox)

settings_root.add_child(header_title)
settings_root.add_child(main_settings_card)
settings_root.add_child(footer_nav)
add_child(settings_root)`
      },
      {
        title: '3. 游戏存储/读档文件管理器 (Save & Load Storage - 对标截图 3)',
        render: `
          <div style="width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);">
            <div style="font-weight:700; font-size:15px; color:#fff;">存储</div>
            
            <div style="background:#0a1733; border:1px solid #b8860b; border-radius:4px; padding:4px 12px; text-align:center; font-size:11px; color:#ffd700;">选择存档文件</div>

            <!-- Save Slots List -->
            <div style="background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:8px;">
              <div style="background:#132347; border:1px solid #b8860b; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="showToast('选中存档 01', 'info')">
                <span style="font-weight:700; color:#ffd700;">文件01</span>
                <span>纳哈特</span>
                <span>LV 1</span>
                <span style="color:#a4b0be;">TIME 00:18</span>
                <span style="color:#67c23a;">非之世界</span>
              </div>
              
              <div style="background:#132347; border:1px solid #b8860b; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="showToast('选中存档 02', 'info')">
                <span style="font-weight:700; color:#ffd700;">文件02</span>
                <span>纳哈特</span>
                <span>LV 1</span>
                <span style="color:#a4b0be;">TIME 00:32</span>
                <span style="color:#67c23a;">非之世界</span>
              </div>

              <div style="background:#101a30; border:1px dashed #1a2d5a; border-radius:6px; padding:8px; text-align:center; color:#ffd700; font-weight:700; cursor:pointer;" onclick="showToast('已新建存档槽位', 'success')">
                新增存档
              </div>
            </div>

            <!-- Bottom Row: [ 删除 ] on Left, [ 返回 ] on Right -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:4px;">
              <button class="g-btn g-btn-danger" style="height:28px; padding:0 24px; font-size:11px; font-weight:700;" onclick="showToast('请选择要删除的存档', 'warning')">删除</button>
              <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;" onclick="showToast('返回主菜单')">返回</button>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏存储与读档面板架构 (1:1 还原截图 3)
var save_root = GContainer.new()

var header_bar = GHeader.new()
header_bar.height = 54.0
header_bar.add_child(storage_title_and_sub_banner)

var main_slots_list = GMain.new()
main_slots_list.add_child(save_slots_vbox)

var footer_action = GFooter.new()
footer_action.height = 40.0
footer_action.add_child(delete_and_return_hbox)

save_root.add_child(header_bar)
save_root.add_child(main_slots_list)
save_root.add_child(footer_action)
add_child(save_root)`
      },
      {
        title: '4. 角色魔法·技能分配双分栏布局 (Magic & Skill Allocator - 对标截图 4)',
        render: `
          <div style="width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:10px; box-shadow:0 8px 30px rgba(0,0,0,0.8);">
            <div style="font-weight:700; font-size:15px; color:#fff;">魔法·技能</div>
            
            <!-- Top Character Switch Card (< Avatar > + HP/MP) -->
            <div style="background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:8px 14px; display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:10px;">
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #1a2d5a; color:#ffd700; width:24px; height:24px; padding:0;">&lt;</button>
                <div style="width:36px; height:36px; background:rgba(255,255,255,0.08); border:1px solid #b8860b; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:18px;">🧙‍♂️</div>
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #1a2d5a; color:#ffd700; width:24px; height:24px; padding:0;">&gt;</button>
                <div>
                  <div style="font-weight:700; color:#ffd700;">纳哈特 (自由人)</div>
                  <div style="font-size:11px; color:#a4b0be;">LV 1</div>
                </div>
              </div>
              <div style="text-align:right; font-size:11px;">
                <div style="color:#67c23a; font-weight:700;">HP 10 / 10</div>
                <div style="color:#409eff; font-weight:700; margin-top:2px;">MP 20 / 20</div>
              </div>
            </div>

            <div style="background:#0a1733; border:1px solid #b8860b; border-radius:4px; padding:3px 10px; font-size:11px; color:#ffd700;">查看习得的白魔法</div>

            <!-- Middle 2-Column: Left Spell Grid (70%) + Right Category Tabs (30%) -->
            <div style="display:flex; gap:12px; min-height:140px;">
              <!-- Left Spell Grid -->
              <div style="flex:2; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                <div style="background:#132347; border:1px solid #b8860b; border-radius:4px; padding:6px; display:flex; justify-content:space-between; font-size:11px; cursor:pointer;" onclick="showToast('释放: 小回复 (消耗 MP 10)', 'success')">
                  <span>小回复</span><b style="color:#409eff;">MP 10</b>
                </div>
                <div style="background:#132347; border:1px solid #b8860b; border-radius:4px; padding:6px; display:flex; justify-content:space-between; font-size:11px; cursor:pointer;" onclick="showToast('释放: 解毒 (消耗 MP 6)', 'success')">
                  <span>解毒</span><b style="color:#409eff;">MP 6</b>
                </div>
              </div>

              <!-- Right Category List (白魔法, 黑魔法) -->
              <div style="flex:1; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:6px;">
                <button class="g-btn g-btn-primary" style="background:#1e3568; border:1px solid #ffd700; color:#ffd700; height:28px; font-size:11px; font-weight:700;">白魔法</button>
                <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #1a2d5a; color:#a4b0be; height:28px; font-size:11px;" onclick="showToast('切换至黑魔法列表')">黑魔法</button>
              </div>
            </div>

            <!-- Bottom Row: [ 返回 ] on Right -->
            <div style="display:flex; justify-content:flex-end; align-items:center; padding-top:4px;">
              <button class="g-btn g-btn-default" style="background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;" onclick="showToast('返回上一级')">返回</button>
            </div>
          </div>
        `,
        code: `# GDScript: 魔法·技能多栏分配面板 (1:1 还原截图 4)
var magic_root = GContainer.new()

var top_header = GHeader.new()
top_header.height = 70.0
top_header.add_child(hero_switch_card_with_arrows)

var mid_split = GContainer.new()
mid_split.direction = GContainer.Direction.HORIZONTAL

var left_spells_grid = GMain.new()
left_spells_grid.size_flags_stretch_ratio = 2.0
left_spells_grid.add_child(spells_2col_grid)

var right_categories = GAside.new()
right_categories.size_flags_stretch_ratio = 1.0
right_categories.add_child(magic_type_tabs_vbox)

mid_split.add_child(left_spells_grid)
mid_split.add_child(right_categories)

var bottom_bar = GFooter.new()
bottom_bar.height = 40.0
bottom_bar.add_child(return_button_hbox)

magic_root.add_child(top_header)
magic_root.add_child(mid_split)
magic_root.add_child(bottom_bar)
add_child(magic_root)`
      },
      {
        title: '5. 经典 JRPG 《黄金太阳》(Golden Sun) 精灵矩阵与精神力布局',
        render: `
          <div style="width:100%; border:2px solid #5c4326; border-radius:12px; overflow:hidden; background:#1c1610; color:#eed8ae; font-size:12px; display:flex; flex-direction:column; box-shadow:0 8px 30px rgba(0,0,0,0.6);">
            <!-- Top: 4 Element Djinn Spirits Bar -->
            <div style="background:linear-gradient(90deg, #3d2b15, #2c1f0f); padding:10px 18px; border-bottom:1px solid #5c4326; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:#f5d76e; font-size:13px;">🌟 四大元素精灵矩阵 (Djinn Matrix)</span>
              <div style="display:flex; gap:12px; font-weight:600;">
                <span style="color:#f56c6c;">🔥 火炎: 4/4</span>
                <span style="color:#409eff;">💧 水泉: 4/4</span>
                <span style="color:#67c23a;">🌿 地灵: 4/4</span>
                <span style="color:#e6a23c;">⚡ 风暴: 4/4</span>
              </div>
            </div>

            <!-- Middle: Left Psynergy List + Center Summon View -->
            <div style="display:flex; min-height:160px;">
              <div style="width:200px; background:#17120d; border-right:1px solid #5c4326; padding:12px; display:flex; flex-direction:column; gap:8px;">
                <div style="font-weight:700; color:#f5d76e; margin-bottom:4px;">精神力术式 (Psynergy)</div>
                <div style="padding:6px 8px; background:rgba(245,215,110,0.1); border-radius:4px; border:1px solid #5c4326; cursor:pointer;" onclick="showToast('选择精神力: 诸神黄昏 (Ragnarok)')">
                  <div style="font-weight:600; color:#fff;">诸神黄昏 (Ragnarok)</div>
                  <div style="font-size:10px; color:#eed8ae;">PP 消耗: 7 | 召唤黄金巨剑</div>
                </div>
                <div style="padding:6px 8px; background:rgba(255,255,255,0.03); border-radius:4px; cursor:pointer;" onclick="showToast('选择精神力: 痊愈光环 (Wish)')">
                  <div style="font-weight:600; color:#fff;">痊愈光环 (Wish)</div>
                  <div style="font-size:10px; color:#eed8ae;">PP 消耗: 9 | 全队恢复 400 HP</div>
                </div>
              </div>

              <div style="flex:1; background:radial-gradient(circle at center, #2e2112 0%, #140d07 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
                <div style="font-size:32px; margin-bottom:6px;">🗡️✨</div>
                <div style="color:#f5d76e; font-weight:700;">【神殿战场】 地之使者·罗宾 (Robin)</div>
                <p style="font-size:11px; color:#eed8ae; margin-top:4px; opacity:0.8;">精灵附体加成: 攻击力 +45, 敏捷 +20</p>
              </div>
            </div>

            <!-- Bottom: Action Confirm Bar -->
            <div style="background:#2c1f0f; padding:10px 18px; border-top:1px solid #5c4326; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:#eed8ae;">按 A 键确认精神力释放，按 B 键切换精灵待机</span>
              <button class="g-btn g-btn-warning" style="height:28px; font-size:11px;" onclick="showToast('精神力召唤法阵已展开！', 'success')">释放精灵召唤术 ⚡</button>
            </div>
          </div>
        `,
        code: `# GDScript: 《黄金太阳》精灵契约与精神力施法界面
var gs_container = GContainer.new()

var djinns_header = GHeader.new()
djinns_header.height = 42.0
djinns_header.add_child(element_djinns_hbox)

var body_container = GContainer.new()
body_container.direction = GContainer.Direction.HORIZONTAL

var psynergy_aside = GAside.new()
psynergy_aside.width = 200.0
psynergy_aside.add_child(psynergy_spell_list)

var summon_main = GMain.new()
summon_main.add_child(summon_animation_viewport)

body_container.add_child(psynergy_aside)
body_container.add_child(summon_main)

var footer_action = GFooter.new()
footer_action.height = 46.0
footer_action.add_child(action_prompt_hbox)

gs_container.add_child(djinns_header)
gs_container.add_child(body_container)
gs_container.add_child(footer_action)
add_child(gs_container)`
      },
      {
        title: '3. 大型网游 MMORPG (魔兽世界 / FF14) 全景游戏 HUD 布局',
        render: `
          <div style="width:100%; border:2px solid #2c3e50; border-radius:12px; overflow:hidden; background:#0b0f19; color:#f1f2f6; font-size:12px; display:flex; flex-direction:column; box-shadow:0 8px 30px rgba(0,0,0,0.6);">
            <!-- Top: Target Info & Raid Buffs -->
            <div style="background:rgba(18,24,38,0.95); padding:10px 18px; border-bottom:1px solid #202d42; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700; color:#409eff;">🛡️ 团队首领战: 熔火核心拉格纳罗斯</span>
                <span class="g-tag g-tag-danger">狂暴倒计时 04:32</span>
              </div>
              <div style="display:flex; gap:6px;">
                <span class="g-tag g-tag-default">⚔️ 强效王者祝福</span>
                <span class="g-tag g-tag-default">🛡️ 耐力光环</span>
                <span class="g-tag g-tag-default">⚡ 嗜血/英勇就绪</span>
              </div>
            </div>

            <!-- Middle: Left Team Raid + Center Game World + Right Minimap -->
            <div style="display:flex; min-height:180px;">
              <!-- Left: Team Raid Frame (20-man team) -->
              <div style="width:180px; background:rgba(11,15,25,0.9); border-right:1px solid #202d42; padding:10px; display:flex; flex-direction:column; gap:6px;">
                <div style="font-weight:700; font-size:11px; color:#a4b0be; margin-bottom:2px;">👥 20人团队框架 (Raid Frame)</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                  <div style="background:#27ae60; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">主T·战士</div>
                  <div style="background:#27ae60; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">副T·圣骑</div>
                  <div style="background:#2980b9; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">治疗·白魔</div>
                  <div style="background:#2980b9; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">治疗·学者</div>
                  <div style="background:#c0392b; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">DPS·黑魔</div>
                  <div style="background:#c0392b; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;">DPS·龙骑</div>
                </div>
              </div>

              <!-- Center: MMORPG Main World View -->
              <div style="flex:1; background:radial-gradient(circle at center, #1e2b40 0%, #0a0e17 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
                <div style="font-size:36px; margin-bottom:6px;">🔥🌋</div>
                <div style="font-weight:700; color:#f56c6c;">主战场 3D 视野 (World Camera Viewport)</div>
                <div style="font-size:11px; color:#a4b0be; margin-top:4px;">当前 FPS: 144 | 延迟: 18ms</div>
              </div>

              <!-- Right: Minimap & Quest Log -->
              <div style="width:200px; background:rgba(11,15,25,0.9); border-left:1px solid #202d42; padding:10px; display:flex; flex-direction:column; gap:8px;">
                <div style="background:#1a233a; height:70px; border-radius:6px; border:1px solid #202d42; display:flex; align-items:center; justify-content:center; color:#409eff; font-weight:600; font-size:11px;">
                  🗺️ 小地图 (Minimap)
                </div>
                <div style="font-size:11px;">
                  <div style="font-weight:700; color:#e6a23c; margin-bottom:2px;">📜 史诗任务追踪:</div>
                  <div style="color:#a4b0be; line-height:1.4;">击败炎魔之王 (1/1)<br>收集萨弗拉斯铁锭 (8/8)</div>
                </div>
              </div>
            </div>

            <!-- Bottom: 12-Slot Action Bar & Chat Window -->
            <div style="background:rgba(18,24,38,0.95); padding:10px 18px; border-top:1px solid #202d42; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; gap:6px;">
                <button class="g-btn g-btn-primary" style="width:36px; height:36px; padding:0; font-weight:700;">1</button>
                <button class="g-btn g-btn-primary" style="width:36px; height:36px; padding:0; font-weight:700;">2</button>
                <button class="g-btn g-btn-primary" style="width:36px; height:36px; padding:0; font-weight:700;">3</button>
                <button class="g-btn g-btn-primary" style="width:36px; height:36px; padding:0; font-weight:700;">4</button>
                <button class="g-btn g-btn-default" style="width:36px; height:36px; padding:0; font-weight:700;">Q</button>
                <button class="g-btn g-btn-default" style="width:36px; height:36px; padding:0; font-weight:700;">E</button>
                <button class="g-btn g-btn-danger" style="width:36px; height:36px; padding:0; font-weight:700;">R</button>
              </div>
              <div style="font-size:11px; color:#a4b0be;">XP: 88,450 / 100,000 (88.4%)</div>
            </div>
          </div>
        `,
        code: `# GDScript: MMORPG 5 分栏全景 HUD 布局 (魔兽/FF14 结构)
var mmo_root = GContainer.new()

# 1. 顶栏：首领状态与光环
var top_header = GHeader.new()
top_header.height = 48.0
top_header.add_child(boss_status_hud)

# 2. 中间横向三栏：左侧团队框架 + 中央战场 + 右侧小地图
var mid_container = GContainer.new()
mid_container.direction = GContainer.Direction.HORIZONTAL

var left_raid = GAside.new()
left_raid.width = 180.0
left_raid.add_child(raid_frame_grid)

var center_world = GMain.new()
center_world.add_child(world_viewport_3d)

var right_minimap = GAside.new()
right_minimap.width = 200.0
right_minimap.add_child(minimap_and_quest_tracker)

mid_container.add_child(left_raid)
mid_container.add_child(center_world)
mid_container.add_child(right_minimap)

# 3. 底栏：技能快捷键栏与经验条
var bottom_bar = GFooter.new()
bottom_bar.height = 56.0
bottom_bar.add_child(action_hotkey_slots)

# 4. 组装并挂载
mmo_root.add_child(top_header)
mmo_root.add_child(mid_container)
mmo_root.add_child(bottom_bar)
add_child(mmo_root)`
      },
      {
        title: '4. 经典三栏纸娃娃装备与属性面板 (3-Column Paperdoll)',
        render: `
          <div style="width:100%; border:1px solid var(--border-base); border-radius:12px; overflow:hidden; background:var(--bg-surface); color:var(--text-primary); font-size:12px; display:flex; flex-direction:column;">
            <div style="background:var(--bg-card); padding:12px 18px; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">👤 角色装备与战斗属性面板 (Character Paperdoll)</span>
              <span class="g-tag g-tag-success">装等 (iLvl): 645</span>
            </div>

            <div style="display:flex; min-height:200px;">
              <!-- Left Equipment Column -->
              <div style="width:140px; background:var(--bg-surface); border-right:1px solid var(--border-base); padding:12px; display:flex; flex-direction:column; gap:8px;">
                <div style="padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;">🪖 龙王头盔 +15</div>
                <div style="padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;">🥋 泰坦胸铠 +15</div>
                <div style="padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;">⚔️ 圣剑·誓约之刃</div>
                <div style="padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;">🛡️ 狮鹫纹章盾</div>
              </div>

              <!-- Center Model Viewport -->
              <div style="flex:1; background:var(--bg-card); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
                <div style="font-size:48px; margin-bottom:8px;">🧙‍♂️</div>
                <div style="font-weight:700; font-size:14px;">大魔导师·罗兰 (Roland)</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Lv.99 宗师级奥术大法师</div>
              </div>

              <!-- Right Attribute Column -->
              <div style="width:160px; background:var(--bg-surface); border-left:1px solid var(--border-base); padding:12px; display:flex; flex-direction:column; gap:6px; font-size:11px;">
                <div style="font-weight:700; color:var(--primary); margin-bottom:4px;">📊 基础属性值</div>
                <div style="display:flex; justify-content:space-between;"><span>物理攻击:</span><b>3,420</b></div>
                <div style="display:flex; justify-content:space-between;"><span>法术强度:</span><b style="color:var(--primary);">8,950</b></div>
                <div style="display:flex; justify-content:space-between;"><span>暴击率:</span><b style="color:var(--warning);">68.5%</b></div>
                <div style="display:flex; justify-content:space-between;"><span>暴击伤害:</span><b>245%</b></div>
                <div style="display:flex; justify-content:space-between;"><span>元素抗性:</span><b style="color:var(--success);">75.0%</b></div>
              </div>
            </div>

            <div style="background:var(--bg-card); padding:10px 18px; border-top:1px solid var(--border-base); display:flex; justify-content:flex-end; gap:10px;">
              <button class="g-btn g-btn-default" style="height:28px; font-size:11px;" onclick="showToast('已一键卸下全部装备')">一键卸装</button>
              <button class="g-btn g-btn-primary" style="height:28px; font-size:11px;" onclick="showToast('已自动穿戴最高装等神装！', 'success')">一键穿戴最高装等 ⚡</button>
            </div>
          </div>
        `,
        code: `# GDScript: 三栏纸娃娃装备与属性面板架构
var equip_panel = GContainer.new()

var header = GHeader.new()
header.height = 48.0
header.add_child(character_title_hud)

var body = GContainer.new()
body.direction = GContainer.Direction.HORIZONTAL

var left_slots = GAside.new()
left_slots.width = 140.0
left_slots.add_child(equipment_slots_vbox)

var center_model = GMain.new()
center_model.add_child(hero_model_viewport_2d)

var right_stats = GAside.new()
right_stats.width = 160.0
right_stats.add_child(attributes_stats_list)

body.add_child(left_slots)
body.add_child(center_model)
body.add_child(right_stats)

var footer = GFooter.new()
footer.height = 48.0
footer.add_child(quick_buttons_hbox)

equip_panel.add_child(header)
equip_panel.add_child(body)
equip_panel.add_child(footer)
add_child(equip_panel)`
      },
      {
        title: '5. 网游商城与祈愿抽卡 Multi-container 布局 (Market & Gacha Studio)',
        render: `
          <div style="width:100%; border:1px solid var(--border-base); border-radius:12px; overflow:hidden; background:var(--bg-surface); color:var(--text-primary); font-size:12px; display:flex; flex-direction:column;">
            <!-- Top: Player Currency HUD -->
            <div style="background:var(--bg-card); padding:10px 18px; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:var(--warning); font-size:13px;">🛒 远古星辰道具商城 & 英雄祈愿池</span>
              <div style="display:flex; gap:14px; font-weight:600;">
                <span>💎 钻石: <b style="color:var(--primary);">12,800</b></span>
                <span>🔮 纠缠之缘: <b style="color:var(--warning);">45</b></span>
                <span>🪙 金币: <b style="color:var(--success);">3,450,000</b></span>
              </div>
            </div>

            <!-- Middle: Left Categories + Center Gacha Showcase -->
            <div style="display:flex; min-height:180px;">
              <div style="width:140px; background:var(--bg-surface); border-right:1px solid var(--border-base); padding:10px; display:flex; flex-direction:column; gap:6px;">
                <div style="padding:8px; background:var(--primary); color:#fff; border-radius:6px; font-weight:600; text-align:center; cursor:pointer;">✨ 限时神话卡池</div>
                <div style="padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;" onclick="showToast('切换至武器专武池')">⚔️ 专属武器库</div>
                <div style="padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;" onclick="showToast('切换至道具商城')">🧪 消耗品杂货</div>
                <div style="padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;" onclick="showToast('切换至皮肤工坊')">🎨 英雄限定皮肤</div>
              </div>

              <div style="flex:1; background:radial-gradient(circle at center, rgba(64,158,255,0.15) 0%, var(--bg-card) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
                <div style="font-size:40px; margin-bottom:6px;">🌟⚔️</div>
                <div style="font-weight:800; font-size:15px; color:var(--primary);">【星穹破晓】限定 SSR 圣剑女武神 · 概率 UP!</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">保底计数: 72/90 抽必出金色传说</div>
              </div>
            </div>

            <!-- Bottom: 1-Pull & 10-Pull Buttons -->
            <div style="background:var(--bg-card); padding:12px 18px; border-top:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-secondary);">单次祈愿消耗 1 颗祈愿石，十连必得 SR 以上道具</span>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-default" style="height:32px; font-weight:600;" onclick="showToast('单抽祈愿: 获得【星光精粹】x1')">祈愿 1 次 (160 💎)</button>
                <button class="g-btn g-btn-primary" style="height:32px; font-weight:700;" onclick="showToast('🎉 十连抽大爆！恭喜获得金色传说【圣剑女武神】！', 'success')">祈愿 10 次 (1600 💎) ✨</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 商城与祈愿抽卡 Multi-container 布局
var shop_root = GContainer.new()

var currency_header = GHeader.new()
currency_header.height = 46.0
currency_header.add_child(currency_status_bar)

var shop_body = GContainer.new()
shop_body.direction = GContainer.Direction.HORIZONTAL

var tab_aside = GAside.new()
tab_aside.width = 140.0
tab_aside.add_child(category_tabs_vbox)

var gacha_main = GMain.new()
gacha_main.add_child(gacha_banner_showcase)

shop_body.add_child(tab_aside)
shop_body.add_child(gacha_main)

var gacha_footer = GFooter.new()
gacha_footer.height = 56.0
gacha_footer.add_child(pull_buttons_hbox)

shop_root.add_child(currency_header)
shop_root.add_child(shop_body)
shop_root.add_child(gacha_footer)
add_child(shop_root)`
      },
      {
        title: '6. 基础结构：顶栏 + 主要区域 + 底栏 (Header + Main + Footer)',
        render: `
          <div style="width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; display:flex; flex-direction:column; text-align:center; font-size:13px; font-weight:600;">
            <div style="background:rgba(64,158,255,0.18); color:var(--primary); padding:16px; border-bottom:1px solid var(--border-base);">GHeader (高度: 60px)</div>
            <div style="background:rgba(103,194,58,0.12); color:var(--success); padding:36px; min-height:120px; display:flex; align-items:center; justify-content:center;">GMain (自动撑满剩余空间)</div>
            <div style="background:rgba(64,158,255,0.18); color:var(--primary); padding:16px; border-top:1px solid var(--border-base);">GFooter (高度: 60px)</div>
          </div>
        `,
        code: `# GDScript: Header + Main + Footer 基础上下布局
var container = GContainer.new()
container.add_child(GHeader.new())
container.add_child(GMain.new())
container.add_child(GFooter.new())
add_child(container)`
      },
      {
        title: '7. 基础结构：侧边栏通顶 + 顶栏与内容 (Aside + (Header + Main + Footer))',
        render: `
          <div style="width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; display:flex; text-align:center; font-size:13px; font-weight:600;">
            <div style="background:rgba(230,162,60,0.15); color:var(--warning); width:150px; display:flex; align-items:center; justify-content:center; border-right:1px solid var(--border-base);">GAside (通顶导航)</div>
            <div style="flex:1; display:flex; flex-direction:column;">
              <div style="background:rgba(64,158,255,0.18); color:var(--primary); padding:14px; border-bottom:1px solid var(--border-base);">GHeader</div>
              <div style="background:rgba(103,194,58,0.12); color:var(--success); min-height:120px; display:flex; align-items:center; justify-content:center;">GMain</div>
              <div style="background:rgba(64,158,255,0.18); color:var(--primary); padding:14px; border-top:1px solid var(--border-base);">GFooter</div>
            </div>
          </div>
        `,
        code: `# GDScript: Aside + (Header + Main + Footer) 侧边栏通顶布局
var root_container = GContainer.new()
var aside = GAside.new()
var right_box = GContainer.new()

right_box.add_child(GHeader.new())
right_box.add_child(GMain.new())
right_box.add_child(GFooter.new())

root_container.add_child(aside)
root_container.add_child(right_box)
add_child(root_container)`
      }
    ],
    props: [
      { name: 'direction', type: 'enum', default: 'AUTO', desc: '子元素排列方向：AUTO (包含 Header/Footer 时自动垂直，否则水平), HORIZONTAL, VERTICAL' }
    ],
    events: [],
    methods: [
      { name: 'css(rules_or_func: Variant)', desc: '链式设定当前容器的样式规则', params: '(rules_or_func: Variant) -> GContainer' }
    ],
    slots: [
      { name: 'default', desc: '容器内部承载的子节点插槽', child: 'Control / VBoxContainer / HBoxContainer', example: '<template #default><GButton>内部控件</GButton></template>' }
    ],
    paneProps: [
      { name: 'GHeader.height', type: 'float', default: '60.0', desc: '顶栏容器的高度 (像素)' },
      { name: 'GAside.width', type: 'float', default: '200.0', desc: '侧边栏容器的宽度 (像素)' },
      { name: 'GMain.size_flags', type: 'int', default: 'SIZE_EXPAND_FILL', desc: '主要区域自动撑满并占满可用空间' },
      { name: 'GFooter.height', type: 'float', default: '60.0', desc: '底栏容器的高度 (像素)' }
    ]
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
      { name: 'default', desc: '分割线居中或靠左/靠右嵌入的文字/图标内容插槽', child: 'Control / Label / GText', example: '<template #default><span>第三方快捷登录</span></template>' }
    ]
  },

  // --------------------------------------------------------
  // 4. GIcon 图标
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 4. GIcon 矢量图标 (Godot @icons / AT-Icons 620+ 全套图库)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 4. GIcon 矢量图标 (4,600+ 全场景矢量图库超级中心)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 4. GIcon 矢量图标 (7,300+ 全场景矢量图库超级中心)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 4. GIcon 矢量图标 (26,000+ 离线图库 + 300,000+ IconBuddy 全域检索)
  // --------------------------------------------------------
  'icon': {
    title: 'Icon 矢量图标 (GIcon)',
    desc: '专为 Godot 4 打造的高性能全场景矢量图标超级组件库，已完整集成 GameIcons.net (4,134+ 游戏与RPG)、Tabler Icons (6,232+)、SimpleIcons (3,730+ 品牌与科技)、RemixIcon (3,229+)、字节跳动 IconPark (2,658+)、Lucide (1,854+)、FontAwesome 6 (1,407+)、PixelArt 像素艺术 (1,306+)、Nieobie Game (815+) 与 Godot @icons (623+) 全量 26,000+ 本地离线矢量 SVG 图标资产，并支持 IconBuddy / Iconify 300,000+ 全域云端即时检索！',
    demos: [
      {
        title: '1. 26,000+ 本地离线图库 & 300,000+ 全网图库超级检索中心',
        render: `
          <div class="icon-gallery-container" id="iconGalleryContainer">
            <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text-regular); background:rgba(64, 158, 255, 0.08); border:1px solid rgba(64, 158, 255, 0.25); border-radius:var(--radius); padding:8px 14px;">
              <i class="fa-solid fa-circle-info" style="color:var(--primary); font-size:14px;"></i>
              <span>💡 <strong>操作提示</strong>：点击下方任意图标卡片即可直接复制对应图标的 GDScript 实例化代码与 <code>@icon</code> 注解路径。</span>
            </div>

            <!-- Library Source Selector -->
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:12px; font-weight:600; color:var(--text-secondary);">10 大主流图库:</span>
              <button class="icon-category-btn active" onclick="window.filterIconLib('all', this)">全部图库 (<span id="iconCountBadge">26,000+</span>)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('gameicons', this)">⚔️ GameIcons RPG (4,134+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('pixel', this)">👾 PixelArt 像素 (1,306+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('nieobie', this)">🎒 Nieobie 游戏 (815+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('at-icons', this)">🎮 Godot @icons (623+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('iconpark', this)">🚀 字节 IconPark (2,658+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('tabler', this)">⚡ Tabler UI (6,232+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('remix', this)">💎 RemixIcon (3,229+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('lucide', this)">✨ Lucide UI (1,854+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('fontawesome', this)">🏷️ FontAwesome 6 (1,407+)</button>
              <button class="icon-category-btn" onclick="window.filterIconLib('brands', this)">🌐 品牌与科技 (3,730+)</button>
            </div>

            <!-- Categories and Search -->
            <div class="icon-toolbar">
              <div class="icon-category-tabs">
                <button class="icon-category-btn active" onclick="window.filterIconCategory('all', this)">全部分类</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('game', this)">⚔️ 游戏战斗与魔法</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('items', this)">🎒 装备道具与食材</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('ui', this)">🎛️ 基础 UI 与控件</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('media', this)">🎵 媒体音效与设备</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('nature', this)">🍃 自然建筑与天气</button>
                <button class="icon-category-btn" onclick="window.filterIconCategory('system', this)">⚙️ 系统节点与科技</button>
              </div>
              <div class="icon-search-wrapper">
                <input type="text" id="iconSearchInput" class="icon-search-input" placeholder="🔍 搜索 26,000+ 离线 / 300,000+ 全网图标 (如 sword, dragon, clear)..." 
                       oninput="window.handleIconSearchInput(this.value)">
                <span id="iconSearchClearBtn" class="icon-search-clear-btn" onclick="window.clearIconSearch()" style="display:none;" title="一键清空搜索内容">
                  <i class="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            </div>

            <!-- Size & Color Controls -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; font-size:12px; color:var(--text-secondary); background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px 14px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span id="iconFilteredCount" style="font-weight:600; color:var(--text-primary); margin-right:6px;">共检索到 25,988 个图标</span>
                <span>尺寸 (偶数步进):</span>
                <div style="display:flex; align-items:center; gap:4px;" id="iconSizeBtnGroup">
                  <button class="icon-size-btn" data-size="10" onclick="window.changeIconSize(10, this)">10px</button>
                  <button class="icon-size-btn active" data-size="16" onclick="window.changeIconSize(16, this)">16px (默认)</button>
                  <button class="icon-size-btn" data-size="24" onclick="window.changeIconSize(24, this)">24px</button>
                  <button class="icon-size-btn" data-size="32" onclick="window.changeIconSize(32, this)">32px</button>
                  <button class="icon-size-btn" data-size="48" onclick="window.changeIconSize(48, this)">48px</button>
                  <button class="icon-size-btn" data-size="64" onclick="window.changeIconSize(64, this)">64px</button>
                  <button class="icon-size-btn" data-size="96" onclick="window.changeIconSize(96, this)">96px</button>
                  <button class="icon-size-btn" data-size="128" onclick="window.changeIconSize(128, this)">128px</button>
                </div>

                <div class="icon-size-input-wrapper" title="自定义输入偶数尺寸 (步长 2px)">
                  <button class="icon-size-step-btn" onclick="window.stepIconSize(-2)" title="减小 2px"><i class="fa-solid fa-minus"></i></button>
                  <input type="number" id="iconCustomSizeInput" class="icon-custom-size-input" value="16" min="8" max="256" step="2"
                         oninput="window.changeIconSizeInput(this.value)" onchange="window.changeIconSize(this.value, null)">
                  <span style="font-size:10px; color:var(--text-secondary); font-weight:600;">px</span>
                  <button class="icon-size-step-btn" onclick="window.stepIconSize(2)" title="增加 2px"><i class="fa-solid fa-plus"></i></button>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="font-weight:500;">Godot 着色方案:</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="icon-color-swatch active" style="background:#409eff;" onclick="window.changeIconColor('#409eff', this)" title="Element 蓝 (#409eff)"></span>
                  <span class="icon-color-swatch" style="background:#8da5f5;" onclick="window.changeIconColor('#8da5f5', this)" title="Godot Node2D 蓝 (#8da5f5)"></span>
                  <span class="icon-color-swatch" style="background:#8df58d;" onclick="window.changeIconColor('#8df58d', this)" title="Godot Control 绿 (#8df58d)"></span>
                  <span class="icon-color-swatch" style="background:#fc7f7f;" onclick="window.changeIconColor('#fc7f7f', this)" title="Godot Node3D 红 (#fc7f7f)"></span>
                  <span class="icon-color-swatch" style="background:#ff9f43;" onclick="window.changeIconColor('#ff9f43', this)" title="Godot Animation 橙 (#ff9f43)"></span>
                  <span class="icon-color-swatch" style="background:#a855f7;" onclick="window.changeIconColor('#a855f7', this)" title="神话/魔法紫 (#a855f7)"></span>
                  <span class="icon-color-swatch" style="background:#ffffff;" onclick="window.changeIconColor('#ffffff', this)" title="原生 Node 白 (#ffffff)"></span>
                  <span class="icon-color-swatch" style="background:#ffd04b;" onclick="window.changeIconColor('#ffd04b', this)" title="金币/成就黄 (#ffd04b)"></span>
                  
                  <div style="display:flex; align-items:center; gap:4px; margin-left:4px; padding-left:8px; border-left:1px solid var(--border-base);">
                    <span style="font-size:11px;">自定义:</span>
                    <input type="color" id="iconCustomColorInput" class="icon-custom-color-picker" value="#409eff" 
                           onchange="window.changeIconColor(this.value, null)" oninput="window.changeIconColor(this.value, null)" 
                           title="点击打开全色域取色盘">
                  </div>
                </div>
              </div>
            </div>

            <div class="icon-grid-list" id="iconGridList"></div>
            <div class="icon-pagination-bar" id="iconPaginationBar"></div>
          </div>
        `,
        code: `# GDScript: 1. 动态实例化 GIcon 矢量图标 (支持 26,000+ 本地离线图标)
var icon = GIcon.new("sword", 16.0, Color("#409eff"))
add_child(icon)

# GDScript: 2. 在自定义 Node 脚本顶部使用 @icon 注解 (Godot 4.x 原生支持)
@icon("res://addons/gotod_ui/assets/icons/gameicons/sword.svg")
class_name MyCustomWeaponNode extends Node2D

# 动态修改图标名称与色彩
icon.icon_name = "chest"
icon.icon_color = Color("#e6a23c")
icon.icon_size = 32.0`
      },
      {
        title: '2. 常用尺寸与主题着色 (Scalable Sizes & Theme Colors)',
        render: `
          <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
              <i class="fa-solid fa-gamepad" style="font-size:16px; color:var(--primary);"></i>
              <span style="font-size:11px; color:var(--text-secondary);">16px (迷你)</span>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
              <i class="fa-solid fa-shield" style="font-size:24px; color:var(--success);"></i>
              <span style="font-size:11px; color:var(--text-secondary);">24px (标准)</span>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
              <i class="fa-solid fa-coins" style="font-size:32px; color:var(--warning);"></i>
              <span style="font-size:11px; color:var(--text-secondary);">32px (中型)</span>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
              <i class="fa-solid fa-wand-magic-sparkles" style="font-size:44px; color:#a855f7;"></i>
              <span style="font-size:11px; color:var(--text-secondary);">44px (神话特大)</span>
            </div>
          </div>
        `,
        code: `# GDScript: 多尺寸与色彩设定
var icon_mini = GIcon.new("gamepad", 16.0, GotodTheme.get_color("primary"))
var icon_std = GIcon.new("shield", 24.0, GotodTheme.get_color("success"))
var icon_large = GIcon.new("wand-magic-sparkles", 44.0, Color("#a855f7"))
add_child(icon_large)`
      },
      {
        title: '3. 持续旋转动画 (Spin Animation & Loading)',
        render: `
          <div style="display:flex; gap:28px; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; color:var(--primary);"></i>
              <span style="font-size:13px;">加载中... (spinner spin)</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-rotate fa-spin" style="font-size:24px; color:var(--warning);"></i>
              <span style="font-size:13px;">同步中... (rotate spin)</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-gear fa-spin" style="font-size:24px; color:var(--success);"></i>
              <span style="font-size:13px;">引擎运转中 (gear spin)</span>
            </div>
          </div>
        `,
        code: `# GDScript: 开启持续旋转动画
var loading_icon = GIcon.new("spinner", 24.0, Color("#409eff"))
loading_icon.spin = true # 👈 开启持续匀速旋转动画
add_child(loading_icon)`
      },
      {
        title: '4. 结合按钮、输入框与徽标组件装配 (Component Integration)',
        render: `
          <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="showToast('点击了带魔法棒图标的按钮', 'success')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> 强化附魔
            </button>
            <button class="g-btn g-btn-danger" onclick="showToast('点击了战斗开战按钮', 'info')">
              <i class="fa-solid fa-fire"></i> 立即开战
            </button>
            <div style="position:relative; display:inline-block;">
              <i class="fa-solid fa-bell" style="font-size:22px; color:var(--text-primary);"></i>
              <span class="g-badge" style="position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;">9+</span>
            </div>
          </div>
        `,
        code: `# GDScript: 结合按钮插槽装配图标
var btn = GButton.new()
btn.text = "强化附魔"
btn.icon = GIcon.new("wand-magic-sparkles") # 自动装配前缀图标
add_child(btn)`
      }
    ],
    props: [
      { name: 'icon_name', type: 'String', default: '"gamepad"', desc: '图标名称（支持 26,000+ 离线矢量图标 & 300,000+ 全网图库）' },
      { name: 'icon_size', type: 'float', default: '16.0', desc: '图标渲染尺寸（像素宽高）' },
      { name: 'icon_color', type: 'Color', default: 'Color.WHITE', desc: '图标调制着色' },
      { name: 'spin', type: 'boolean', default: 'false', desc: '是否开启持续顺时针旋转动画' }
    ],
    events: [],
    methods: [
      { name: '_init(name="gamepad", size=16.0, color=Color.WHITE)', desc: '便捷构造函数', params: '(name: String, size: float, color: Color) -> void' }
    ],
    slots: [
      { name: 'default', desc: '自定义矢量图形或纹理节点插槽', child: 'TextureRect / Control', example: '<template #default><TextureRect texture="res://icon.png" /></template>' },
      { name: 'badge', desc: '图标右上角徽标插槽', child: 'GBadge / Control', example: '<template #badge><GBadge value="99+" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 4.5. GFab 悬浮按钮 (Uni-UI / FAB Speed Dial)
  // --------------------------------------------------------
  'fab': {
    title: 'Fab 悬浮按钮 (GFab)',
    desc: '浮动在屏幕角落的操作按钮，支持点击向左/向上展开多子项操作菜单（深度对标 Uni-UI Fab、Material Design Speed Dial 展开菜单）。',
    demos: [
      {
        title: '1. 水平展开悬浮按钮 (Horizontal Uni-UI Speed Dial)',
        render: `
          <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-base); display:flex; justify-content:flex-end; align-items:center;">
            <div id="demoFabHoriz" style="display:flex; align-items:center; gap:8px; background:var(--bg-card); padding:6px 12px; border-radius:30px; border:1px solid var(--border-base); box-shadow:0 6px 20px rgba(0,0,0,0.3);">
              <div class="demo-fab-menu" style="display:flex; align-items:center; gap:8px;">
                <button class="g-btn g-btn-text" style="font-size:12px; padding:4px 8px;" onclick="showToast('点击了相册', 'info')"><i class="fa-solid fa-image"></i> 相册</button>
                <button class="g-btn g-btn-text" style="font-size:12px; padding:4px 8px;" onclick="showToast('点击了首页', 'success')"><i class="fa-solid fa-house"></i> 首页</button>
                <button class="g-btn g-btn-text" style="font-size:12px; padding:4px 8px;" onclick="showToast('点击了收藏', 'warning')"><i class="fa-solid fa-star"></i> 收藏</button>
              </div>
              <button class="g-btn g-btn-default g-btn-round" style="width:32px; height:32px; padding:0;" onclick="toggleDemoFab('demoFabHoriz')"><span class="demo-fab-icon">✕</span></button>
            </div>
          </div>
        `,
        code: `# GDScript 方式 1: 单项链式添加
var fab = GFab.new()
fab.direction = GFab.Direction.HORIZONTAL
fab.fab_position = GFab.Position.BOTTOM_RIGHT
fab.add_action("album", "相册", preload("res://icons/image.svg"))
fab.add_action("home", "首页", preload("res://icons/home.svg"))
fab.add_action("star", "收藏", preload("res://icons/star.svg"))

# GDScript 方式 2: 批量数组添加 (Batch Actions)
fab.add_actions([
    { "name": "album", "label": "相册", "icon": preload("res://icons/image.svg") },
    { "name": "home", "label": "首页", "icon": preload("res://icons/home.svg") },
    { "name": "star", "label": "收藏", "icon": preload("res://icons/star.svg") }
])
fab.item_clicked.connect(func(idx, name): print("Clicked: ", name))
add_child(fab)`
      },
      {
        title: '2. 垂直向上展开悬浮按钮 (Vertical Speed Dial)',
        render: `
          <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-base); display:flex; justify-content:flex-end; align-items:flex-end; min-height:180px;">
            <div id="demoFabVert" style="display:flex; flex-direction:column-reverse; align-items:center; gap:8px;">
              <button class="g-btn g-btn-primary g-btn-round" style="width:44px; height:44px; padding:0; box-shadow:0 4px 12px rgba(0,0,0,0.3);" onclick="toggleDemoFab('demoFabVert', true)"><span class="demo-fab-icon">✕</span></button>
              <div class="demo-fab-menu" style="display:flex; flex-direction:column-reverse; align-items:center; gap:8px;">
                <button class="g-btn g-btn-default g-btn-round" style="width:36px; height:36px; padding:0;" title="分享" onclick="showToast('点击了分享')"><i class="fa-solid fa-share-nodes"></i></button>
                <button class="g-btn g-btn-default g-btn-round" style="width:36px; height:36px; padding:0;" title="下载" onclick="showToast('点击了下载')"><i class="fa-solid fa-download"></i></button>
                <button class="g-btn g-btn-default g-btn-round" style="width:36px; height:36px; padding:0;" title="点赞" onclick="showToast('点击了点赞')"><i class="fa-solid fa-thumbs-up"></i></button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Vertical Speed Dial
var fab = GFab.new()
fab.direction = GFab.Direction.VERTICAL
fab.add_actions([
    { "name": "share", "label": "分享", "icon": icon_share },
    { "name": "download", "label": "下载", "icon": icon_download },
    { "name": "like", "label": "点赞", "icon": icon_like }
])
add_child(fab)`
      }
    ],
    props: [
      { name: 'direction', type: 'enum', default: 'HORIZONTAL', desc: '展开方向：HORIZONTAL (水平向左), VERTICAL (垂直向上)' },
      { name: 'fab_position', type: 'enum', default: 'BOTTOM_RIGHT', desc: '挂载位置：BOTTOM_RIGHT, BOTTOM_LEFT, TOP_RIGHT, TOP_LEFT' },
      { name: 'main_icon', type: 'Texture2D', default: 'null', desc: '主触发按钮图标 (默认显示加号/叉号旋转切换)' },
      { name: 'auto_collapse_on_click', type: 'boolean', default: 'true', desc: '点击子操作项后是否自动收起菜单' },
      { name: 'expand_duration', type: 'float', default: '0.25', desc: '展开/收起动画过渡时长 (秒)' }
    ],
    events: [
      { name: 'item_clicked', params: 'index: int, item_name: String', desc: '点击子项菜单时触发' },
      { name: 'expanded_changed', params: 'is_expanded: bool', desc: '展开/收起状态发生变化时触发' }
    ],
    methods: [
      { name: 'toggle()', returns: 'void', desc: '切换展开与收起状态' },
      { name: 'expand()', returns: 'void', desc: '主动执行展开动画' },
      { name: 'collapse()', returns: 'void', desc: '主动执行收起动画' },
      { name: 'add_action(name, label, icon)', returns: 'void', desc: '动态添加单个子菜单项' },
      { name: 'add_actions(action_list)', returns: 'void', desc: '批量追加一组子菜单项 [{"name": "", "label": "", "icon": null}]' }
    ],
    slots: [
      { name: 'default', desc: '悬浮按钮主触发球图标插槽', child: 'GIcon / TextureRect', example: '<template #default><GIcon name="plus" /></template>' },
      { name: 'menu', desc: '展开的子快捷操作菜单项插槽', child: 'VBoxContainer / Array[GButton]', example: '<template #menu><GButton icon="share">分享</GButton></template>' }
    ]
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
          <div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start;">
            <div class="g-input-wrapper" style="width:fit-content; max-width:100%;">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-right:8px; white-space:nowrap;">https://</span>
              <input class="g-input" type="text" value="github.com/mhxy1386780634" style="width:230px; font-family:inherit;">
            </div>
            <div class="g-input-wrapper" style="width:fit-content; max-width:100%;">
              <input class="g-input" type="text" value="99.9" style="width:48px; font-family:inherit;">
              <span style="color:var(--text-secondary); font-size:0.85rem; margin-left:8px; white-space:nowrap;">USD / Month</span>
            </div>
          </div>
        `,
        code: `# GDScript: Prefix & Suffix
var input = GInput.new()
input.prefix_text = "https://"
input.text = "github.com/mhxy1386780634"
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
      { name: 'default', desc: '输入框主体控件插槽', child: 'LineEdit / Control', example: '<template #default><LineEdit placeholder="请输入..." /></template>' },
      { name: 'prefix', desc: '输入框前置图标或文字插槽', child: 'GIcon / GText / TextureRect', example: '<template #prefix><GIcon name="magnifying-glass" /></template>' },
      { name: 'suffix', desc: '输入框后置图标或操作按钮插槽', child: 'GIcon / GButton / GText', example: '<template #suffix><GText>USD / Month</GText></template>' },
      { name: 'prepend', desc: '输入框外层前置复合内容（如协议头或选择器）', child: 'GSelect / GButton / Control', example: '<template #prepend><GSelect options="https://,http://" /></template>' },
      { name: 'append', desc: '输入框外层后置复合按钮（如搜索或发送验证码）', child: 'GButton / Control', example: '<template #append><GButton type="primary">搜索</GButton></template>' }
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
    slots: [
      { name: 'default', desc: '多行文本框主体控件插槽', child: 'TextEdit / Control', example: '<template #default><TextEdit placeholder="请详细描述问题..." /></template>' },
      { name: 'footer', desc: '文本框底部自定义操作或字数统计栏插槽', child: 'HBoxContainer / GText', example: '<template #footer><span>已输入 18/200 字</span></template>' }
    ]
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
    slots: [
      { name: 'decrease-icon', desc: '自定义递减按钮图标插槽', child: 'GIcon / TextureRect', example: '<template #decrease-icon><GIcon name="minus" /></template>' },
      { name: 'increase-icon', desc: '自定义递增按钮图标插槽', child: 'GIcon / TextureRect', example: '<template #increase-icon><GIcon name="plus" /></template>' },
      { name: 'prefix', desc: '输入框前置单位插槽（如货币符号 ¥）', child: 'GText / Label', example: '<template #prefix>¥</template>' },
      { name: 'suffix', desc: '输入框后置单位插槽（如计量单位“件/个”）', child: 'GText / Label', example: '<template #suffix>件</template>' }
    ]
  },

  // --------------------------------------------------------
  // 7.1 GStepper 步进器 (Vant UI 对标)
  // --------------------------------------------------------
  'stepper': {
    title: 'Stepper 步进器 (GStepper)',
    desc: '步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数值。深度对标 Vant UI 步进器规范，支持步长、最大最小值、圆角圆圈按钮与动态限制。',
    demos: [
      {
        title: '1. 基础步进器与圆角按钮 (Basic & Round Theme)',
        render: `
          <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            <div id="demoStepperBasic" class="g-stepper">
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperBasic', -1)">-</button>
              <input class="g-stepper-input" value="1" readonly>
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperBasic', 1)">+</button>
            </div>
            <div id="demoStepperRound" class="g-stepper round">
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperRound', -1)">-</button>
              <input class="g-stepper-input" value="5" readonly>
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperRound', 1)">+</button>
            </div>
          </div>
        `,
        code: `# GDScript: 基础步进器与圆角风格
var stepper = GStepper.new()
stepper.value = 1
stepper.min_value = 1
stepper.max_value = 99
stepper.step = 1
stepper.round_theme = true
add_child(stepper)`
      },
      {
        title: '2. 步长与最大最小值限制 (Step & Min/Max Bounds)',
        render: `
          <div style="display:flex; gap:16px; align-items:center;">
            <div id="demoStepperStep" class="g-stepper">
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperStep', -5, 5, 50)">-</button>
              <input class="g-stepper-input" value="10" readonly>
              <button class="g-stepper-btn" onclick="stepperChange('demoStepperStep', 5, 5, 50)">+</button>
            </div>
            <span style="font-size:12px; color:var(--text-secondary);">步长: 5 | 范围: [5, 50]</span>
          </div>
        `,
        code: `# GDScript: 自定义步长
var stepper = GStepper.new()
stepper.step = 5
stepper.min_value = 5
stepper.max_value = 50
add_child(stepper)`
      }
    ],
    props: [
      { name: 'value', type: 'float', default: '1.0', desc: '当前输入值' },
      { name: 'min_value', type: 'float', default: '1.0', desc: '最小值限制' },
      { name: 'max_value', type: 'float', default: '100.0', desc: '最大值限制' },
      { name: 'step', type: 'float', default: '1.0', desc: '点击加减按钮每次变化的步长' },
      { name: 'integer', type: 'boolean', default: 'true', desc: '是否只允许输入整数' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用步进器' },
      { name: 'round_theme', type: 'boolean', default: 'false', desc: '是否启用圆角/圆圈极简主题风格' }
    ],
    events: [
      { name: 'value_changed(val)', desc: '当数值发生改变时触发', params: '(val: float)' },
      { name: 'overlimit(limit_type)', desc: '当点击加减超出限制范围时触发 ("min" / "max")', params: '(limit_type: String)' }
    ],
    methods: [
      { name: 'set_value(val)', desc: '设置当前步进器数值', params: '(val: float) -> void' },
      { name: 'get_value()', desc: '获取当前步进器数值', params: '() -> float' }
    ],
    slots: [
      { name: 'minus', desc: '步进器减少按钮插槽', child: 'GIcon / GButton', example: '<template #minus><GIcon name="angle-left" /></template>' },
      { name: 'plus', desc: '步进器增加按钮插槽', child: 'GIcon / GButton', example: '<template #plus><GIcon name="angle-right" /></template>' },
      { name: 'default', desc: '步进器中间数值输入/显示区域插槽', child: 'GInput / Label', example: '<template #default><span>Lv. {{ level }}</span></template>' }
    ]
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
    slots: [
      { name: 'checked-icon', desc: '开启状态滑块内部图标插槽', child: 'GIcon / TextureRect', example: '<template #checked-icon><GIcon name="check" /></template>' },
      { name: 'unchecked-icon', desc: '关闭状态滑块内部图标插槽', child: 'GIcon / TextureRect', example: '<template #unchecked-icon><GIcon name="xmark" /></template>' },
      { name: 'default', desc: '开关右侧伴随文本标签插槽', child: 'GText / Label', example: '<template #default><span>开启音效 (SFX)</span></template>' }
    ]
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
      },
      {
        title: '2. 按钮样式多选框 (Button Style Checkbox)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="g-btn-group-segmented">
              <label class="g-btn-segmented-item">
                <input type="checkbox" onchange="this.parentElement.classList.toggle('active', this.checked); showToast('北京: ' + this.checked);">
                <span>北京 (Beijing)</span>
              </label>
              <label class="g-btn-segmented-item active">
                <input type="checkbox" checked onchange="this.parentElement.classList.toggle('active', this.checked); showToast('上海: ' + this.checked);">
                <span>上海 (Shanghai)</span>
              </label>
              <label class="g-btn-segmented-item active">
                <input type="checkbox" checked onchange="this.parentElement.classList.toggle('active', this.checked); showToast('广州: ' + this.checked);">
                <span>广州 (Guangzhou)</span>
              </label>
              <label class="g-btn-segmented-item">
                <input type="checkbox" onchange="this.parentElement.classList.toggle('active', this.checked); showToast('深圳: ' + this.checked);">
                <span>深圳 (Shenzhen)</span>
              </label>
            </div>
            <span style="font-size:12px; color:var(--text-secondary);">按钮样式的复选框，激活时呈现主题色高亮，常用于多维度筛选。</span>
          </div>
        `,
        code: `# GDScript: 按钮样式多选框组
var group = GCheckboxGroup.new()
var cb1 = GCheckbox.new()
cb1.text = "北京"
cb1.button_style = true

var cb2 = GCheckbox.new()
cb2.text = "上海"
cb2.button_style = true

group.add_child(cb1)
group.add_child(cb2)`
      }
    ],
    props: [
      { name: 'checked / v-model', type: 'boolean', default: 'false', desc: '是否勾选' },
      { name: 'text / label', type: 'String', default: '"Checkbox"', desc: '说明文字' },
      { name: 'button_style', type: 'boolean', default: 'false', desc: '是否启用类似分段按钮的样式外观' },
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
      { name: 'default', desc: '复选框右侧描述文本或富文本标签插槽', child: 'Label / RichTextLabel / Control', example: '<template #default>我已阅读并同意《服务协议》</template>' },
      { name: 'icon', desc: '自定义复选勾选状态图标插槽（透传 { checked }）', child: 'GIcon / TextureRect', example: '<template #icon="{ checked }"><GIcon :name="checked ? \'square-check\' : \'square\'" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 10. GRadio 单选框
  // --------------------------------------------------------
  'radio': {
    title: 'Radio 单选框 (GRadio & Group)',
    desc: '在一组备选项中进行单选。配合 GRadioGroup 自动管理选中互斥状态，支持常规圆形圆点与按钮化 (Button Style) 两种形态。',
    demos: [
      {
        title: '1. Radio Group 单选选项组 (Classic Circles)',
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
      },
      {
        title: '2. 按钮样式单选框 (Button Style Radio Group)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="g-btn-group-segmented" id="radioSegmentGroup">
              <label class="g-btn-segmented-item active" onclick="document.querySelectorAll('#radioSegmentGroup .g-btn-segmented-item').forEach(e=>e.classList.remove('active')); this.classList.add('active'); showToast('选择画质：极速流畅 (60 FPS)', 'info');">
                <input type="radio" name="r_btn_demo" checked>
                <span>流畅 (60 FPS)</span>
              </label>
              <label class="g-btn-segmented-item" onclick="document.querySelectorAll('#radioSegmentGroup .g-btn-segmented-item').forEach(e=>e.classList.remove('active')); this.classList.add('active'); showToast('选择画质：高清逼真 (120 FPS)', 'info');">
                <input type="radio" name="r_btn_demo">
                <span>高清 (120 FPS)</span>
              </label>
              <label class="g-btn-segmented-item" onclick="document.querySelectorAll('#radioSegmentGroup .g-btn-segmented-item').forEach(e=>e.classList.remove('active')); this.classList.add('active'); showToast('选择画质：4K 光追极限 (Ray Tracing)', 'success');">
                <input type="radio" name="r_btn_demo">
                <span>4K 光追 (Ultra)</span>
              </label>
            </div>
            <span style="font-size:12px; color:var(--text-secondary);">单选按钮组形态，在游戏画质、阵营切换和分段控制器场景中使用极广。</span>
          </div>
        `,
        code: `# GDScript: 按钮样式单选框
var rg = GRadioGroup.new()
var r1 = GRadio.new()
r1.text = "流畅 60FPS"
r1.button_style = true

var r2 = GRadio.new()
r2.text = "高清 120FPS"
r2.button_style = true

rg.add_child(r1)
rg.add_child(r2)`
      }
    ],
    props: [
      { name: 'checked / v-model', type: 'boolean', default: 'false', desc: '是否被选中' },
      { name: 'value', type: 'String', default: '""', desc: '选项标识绑定值' },
      { name: 'button_style', type: 'boolean', default: 'false', desc: '是否开启按钮式外观形态' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' }
    ],
    events: [
      { name: 'selected()', desc: '被选中时触发', params: '()' }
    ],
    methods: [],
    slots: [
      { name: 'default', desc: '单选框右侧描述文本插槽', child: 'Label / RichTextLabel / Control', example: '<template #default>顺丰次日达 (+ ¥12)</template>' },
      { name: 'icon', desc: '自定义单选圆点选中状态图标插槽（透传 { checked }）', child: 'GIcon / TextureRect', example: '<template #icon="{ checked }"><GIcon :name="checked ? \'circle-dot\' : \'circle\'" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 11. GSelect 下拉选择器 (Element Plus 对标扩充)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 11. GSelect 下拉选择器 (Element Plus 对标)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 11. GSelect 下拉选择器 (Element Plus 对标)
  // --------------------------------------------------------
  'select': {
    title: 'Select 下拉选择器 (GSelect)',
    desc: '当选项过多时，使用下拉菜单展示并供用户选择内容。深度对标 Element Plus Select 规范，支持单选、有禁用选项、禁用状态、可清空单选、实时搜索筛选、多选 Tags 折叠、分组选择器与自定义模板。',
    demos: [
      {
        title: '1. 基础用法与可清空单选 (Basic Select & Clearable)',
        render: `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div id="demo_select_basic" style="width: 340px;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">💡 包含 <code style="color:var(--primary);">clearable = true</code> 属性，鼠标悬浮在选择框上时会出现 <code style="color:var(--danger);">×</code> 按钮，点击一键清空。</span>
          </div>
        `,
        code: `# GDScript: 基础单选与一键清空
var sel = GSelect.new()
sel.placeholder_text = "请选择渲染管线..."
sel.clearable = true
sel.options = [
    {"label": "Godot 4.3 (Forward+ 高画质管线)", "value": "4.3_forward"},
    {"label": "Godot 4.3 (Mobile 移动端轻量)", "value": "4.3_mobile"},
    {"label": "Godot 4.4 (Latest 最新稳定版)", "value": "4.4_latest"},
    {"label": "Godot 4.6+ (Future 未来试验特性)", "value": "4.6_future"}
]
sel.item_selected.connect(func(idx, val, label):
    print("已选择内核:", label, "值:", val)
)
sel.cleared.connect(func():
    print("已一键清空选中值")
)
add_child(sel)`
      },
      {
        title: '2. 有禁用选项与禁用状态 (Disabled Options & Disabled Select)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <div style="font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;">① 有禁用选项（在 option 中设定 disabled 为 true）</div>
              <div id="demo_select_opt_disabled" style="width: 360px;"></div>
            </div>
            <div>
              <div style="font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;">② 禁用整个选择器组件（为 select 设置 disabled 属性）</div>
              <div id="demo_select_full_disabled" style="width: 360px;"></div>
            </div>
          </div>
        `,
        code: `# GDScript: 1. 有禁用选项 (Disabled Options)
var sel_opt = GSelect.new()
sel_opt.options = [
    {"label": "初级强化石 (+1~+5 成功率 100%)", "value": "opt1"},
    {"label": "中级祝福水晶 (+6~+9 铁匠3级解锁 - 禁用)", "value": "opt2", "disabled": true}, # 👈 禁用该项
    {"label": "高级天界神石 (+10~+15 成功率 85%)", "value": "opt3"},
    {"label": "太古不灭符文 (未解锁副本 - 禁用)", "value": "opt4", "disabled": true},     # 👈 禁用该项
    {"label": "神话虚空精粹 (+20 终极附魔)", "value": "opt5"}
]
add_child(sel_opt)

# GDScript: 2. 禁用整个选择器组件 (Disabled Select)
var sel_full = GSelect.new()
sel_full.disabled = true # 👈 整个组件置灰并阻断点击交互
add_child(sel_full)`
      },
      {
        title: '3. 实时搜索与模糊筛选 (Filterable & Searchable)',
        render: `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div id="demo_select_filterable" style="width: 360px;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">🔍 点击展开下拉菜单后，可在顶部搜索框输入拼音、英文或中文即时过滤；无匹配时自动展示「无匹配数据」空状态。</span>
          </div>
        `,
        code: `# GDScript: 开启搜索筛选与过滤
var sel = GSelect.new()
sel.filterable = true # 开启搜索过滤输入框
sel.clearable = true
sel.placeholder_text = "输入关键字搜索组件库/算法..."
sel.options = [
    {"label": "Element Plus 现代化组件库 (Select/Dialog)", "value": "el_plus"},
    {"label": "Naive UI 极速类型安全组件 (TypeScript)", "value": "naive"},
    {"label": "Ant Design Vue 极客设计体系 (AntD)", "value": "antd"},
    {"label": "Vant UI 移动端轻提示与选择器 (Mobile)", "value": "vant"},
    {"label": "Vue.js 3 响应式底层 (Reactivity Core)", "value": "vue3"}
]
add_child(sel)`
      },
      {
        title: '4. 多选标签与折叠展示 (Multiple Tags & Collapse Tags)',
        render: `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div id="demo_select_multiple" style="width: 420px;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">🏷️ 支持点击任意选项多选勾选，多选标签支持单独点 <code style="color:var(--danger);">×</code> 移除；超出数量时自动折叠显示 <code style="color:var(--primary);">+N</code>。</span>
          </div>
        `,
        code: `# GDScript: 多选模式与标签折叠
var sel = GSelect.new()
sel.multiple = true           # 开启多选
sel.collapse_tags = true      # 开启超长标签折叠
sel.max_collapse_tags = 2     # 最大保留展示 2 个 Tag，其余折叠显示 +N
sel.filterable = true
sel.clearable = true

# 批量赋予已选中的值
sel.selected_values = ["physics", "particles", "dialogue"]

sel.selection_changed.connect(func(selected_array):
    print("当前多选勾选列表:", selected_array)
)
add_child(sel)`
      },
      {
        title: '5. 分组选项与禁用项 (Option Grouping & Disabled Options)',
        render: `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div id="demo_select_group" style="width: 360px;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">🚫 支持按分类分组渲染，带有 <code style="color:var(--danger);">disabled: true</code> 的选项将置灰且无法点击。</span>
          </div>
        `,
        code: `# GDScript: 分组选择器与选项禁用
var sel = GSelect.new()
sel.filterable = true
sel.clearable = true

sel.options = [
    {"label": "狂暴战 (Warrior - 近战输出)", "value": "warrior", "group": "近战狂暴系 (Melee)"},
    {"label": "圣骑士 (Paladin - 需暗影通关 - 禁用)", "value": "paladin", "group": "近战狂暴系 (Melee)", "disabled": true},
    {"label": "潜行者 (Rogue - 致命背刺)", "value": "rogue", "group": "近战狂暴系 (Melee)"},
    {"label": "大魔导师 (Archmage - 暴风雪)", "value": "archmage", "group": "远程魔法系 (Caster)"},
    {"label": "暗影术士 (Warlock - 诅咒之箭)", "value": "warlock", "group": "远程魔法系 (Caster)"}
]
add_child(sel)`
      },
      {
        title: '6. 自定义选项模板与插槽 (Custom Option Template & Slots)',
        render: `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div id="demo_select_custom" style="width: 380px;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">✨ 深度支持自定义 HTML / Godot 场景节点，展示带英雄头像、专属技能与 SSR/SR 品阶标签的高级选项。</span>
          </div>
        `,
        code: `# GDScript: 自定义选项模板与插槽
var sel = GSelect.new()
sel.filterable = true
sel.clearable = true

# 点语法访问插槽
sel.slotName = "prefix"
sel.prefix.icon = "wand-magic-sparkles"

sel.slotName = "empty"
sel.empty.text = "没有找到符合条件的神话伙伴"

# 动态自定义渲染
sel.item_selected.connect(func(idx, val, label):
    print("出战伙伴切换:", val)
)
add_child(sel)`
      }
    ],
    props: [
      { name: 'options', type: 'Array[Dictionary]', default: '[]', desc: '选项数据源 [{"label": "", "value": "", "disabled": false, "group": ""}]' },
      { name: 'selected_index', type: 'int', default: '-1', desc: '单选模式下当前选中项的索引' },
      { name: 'selected_value', type: 'Variant', default: 'null', desc: '当前选中的具体值 (单选模式)' },
      { name: 'selected_values', type: 'Array', default: '[]', desc: '多选模式下已选中的值列表 Array[Variant]' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '是否支持一键清空选中值 (鼠标悬浮显示 × 图标)' },
      { name: 'filterable', type: 'boolean', default: 'true', desc: '是否开启下拉列表实时模糊搜索过滤输入框' },
      { name: 'multiple', type: 'boolean', default: 'false', desc: '是否开启多选 Tags 模式' },
      { name: 'collapse_tags', type: 'boolean', default: 'false', desc: '多选模式下是否折叠超长标签' },
      { name: 'max_collapse_tags', type: 'int', default: '1', desc: '折叠标签模式下最多展示的 Tag 数量' },
      { name: 'placeholder_text', type: 'String', default: '"请选择..."', desc: '选择框未选值时的占位提示文本' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用整个选择器组件（不可点击交互）' }
    ],
    events: [
      { name: 'item_selected(index, value, label)', desc: '单选模式下选中新选项时触发', params: '(index: int, value: Variant, label: String)' },
      { name: 'selection_changed(values)', desc: '选中值集合改变时触发（单选返回单元素数组，多选返回全量数组）', params: '(values: Array)' },
      { name: 'cleared()', desc: '点击一键清空按钮时触发', params: '()' },
      { name: 'popup_visibility_changed(is_visible)', desc: '下拉弹窗展开或收起状态改变时触发', params: '(is_visible: bool)' }
    ],
    methods: [
      { name: 'add_option(label, value=null, disabled=false, group="")', desc: '动态追加单个下拉选项，支持指定分组与禁用状态', params: '(label: String, value: Variant, disabled: bool, group: String) -> void' },
      { name: 'add_options(opt_list: Array)', desc: '批量追加一组下拉选项 Array[Dictionary | String]', params: '(opt_list: Array) -> void' },
      { name: 'clear_options()', desc: '清空全部选项数据与当前选中状态', params: '() -> void' },
      { name: 'show_popup()', desc: '显式弹出下拉菜单并自动聚焦搜索框', params: '() -> void' },
      { name: 'toggle_popup()', desc: '切换下拉菜单展开或收起状态', params: '() -> void' }
    ],
    slots: [
      { name: 'default', desc: '下拉选择框主体触发器展示内容插槽', child: 'Control / GText', example: '<template #default><span>请选择法术流派</span></template>' },
      { name: 'prefix', desc: '选择框左侧前置图标插槽', child: 'GIcon / TextureRect', example: '<template #prefix><GIcon name="wand-magic" /></template>' },
      { name: 'arrow', desc: '自定义下拉展开箭头指示器插槽（旋转动画）', child: 'GIcon / TextureRect', example: '<template #arrow><GIcon name="chevron-down" /></template>' },
      { name: 'option', desc: '自定义下拉菜单列表每一项渲染插槽（透传 { item, index }）', child: 'Control / HBoxContainer', example: '<template #option="{ item }"><GIcon :name="item.icon" /> {{ item.label }}</template>' },
      { name: 'empty', desc: '无匹配搜索结果时的空状态插槽', child: 'Control / GText', example: '<template #empty><span>未找到相关角色</span></template>' }
    ]
  },

  'picker': {
    title: 'Picker 选择器 (GPicker)',
    desc: '提供多个选项供用户选择，支持单列选择和多列级联选择，常与弹出层配合使用。深度对标 Vant UI 移动端选择器规范。',
    demos: [
      {
        title: '1. 基础职业选择 (Basic Column Picker)',
        render: `
          <div style="display:flex; gap:12px; align-items:center;">
            <button class="g-btn g-btn-primary" onclick="openSimPicker({ title:'选择英雄职业', columns:['狂暴战士 (Warrior)', '奥术法师 (Mage)', '神圣牧师 (Priest)', '暗影刺客 (Rogue)', '猎魔射手 (Hunter)'], defaultIndex:1, onConfirm:(val) => { document.getElementById('pickerRes1').innerText = val; } })">选择职业 (Open Picker)</button>
            <span style="font-size:13px; color:var(--text-secondary);">已选职业：<b id="pickerRes1" style="color:var(--primary);">奥术法师 (Mage)</b></span>
          </div>
        `,
        code: `# GDScript: 基础选择器
var picker = GPicker.new()
picker.title = "选择英雄职业"
picker.columns = ["战士", "法师", "牧师", "刺客", "射手"]
picker.confirm.connect(func(vals, idxs): print("Selected:", vals))
picker.open()`
      },
      {
        title: '2. 地区/关卡难度选择器 (Difficulty Picker)',
        render: `
          <div style="display:flex; gap:12px; align-items:center;">
            <button class="g-btn g-btn-warning" onclick="openSimPicker({ title:'挑选副本难度', columns:['普通难度 (Normal)', '精英难度 (Hard)', '噩梦难度 (Nightmare)', '地狱深渊 (Hell - 推荐 5 人组队)'], defaultIndex:2 })">挑选副本难度</button>
          </div>
        `,
        code: `# GDScript: 难度选择
var picker = GPicker.new()
picker.title = "副本难度"
picker.columns = ["普通", "困难", "噩梦", "地狱"]
picker.open()`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '"请选择"', desc: '顶部工具栏标题' },
      { name: 'columns', type: 'Array', default: '[]', desc: '选项列表（单列为字符串数组，多列为对象数组）' },
      { name: 'default_index', type: 'int', default: '0', desc: '单列选择器的默认选中项索引' },
      { name: 'confirm_button_text', type: 'String', default: '"确认"', desc: '确认按钮文字' },
      { name: 'cancel_button_text', type: 'String', default: '"取消"', desc: '取消按钮文字' },
      { name: 'show_toolbar', type: 'boolean', default: 'true', desc: '是否显示顶部工具栏' }
    ],
    events: [
      { name: 'confirm(values, indexes)', desc: '点击完成按钮时触发', params: '(values: Array, indexes: Array)' },
      { name: 'cancel()', desc: '点击取消按钮时触发', params: '()' },
      { name: 'change(values, index)', desc: '选项改变时触发', params: '(values: Array, index: int)' }
    ],
    methods: [
      { name: 'set_columns(cols: Array)', desc: '批量设置多列或单列选项数据', params: '(cols: Array) -> void' },
      { name: 'add_column(items: Array)', desc: '动态追加一列备选数据', params: '(items: Array) -> void' },
      { name: 'open()', desc: '呼出选择器面板', params: '() -> void' },
      { name: 'close()', desc: '关闭选择器面板', params: '() -> void' },
      { name: 'get_selected_value()', desc: '获取当前选中的值', params: '() -> Variant' }
    ],
    slots: [
      { name: 'option', desc: '轮盘每一行选项自定义渲染插槽（透传 { item, index }）', child: 'Control / GText', example: '<template #option="{ item }"><b>{{ item.text }}</b></template>' },
      { name: 'top-toolbar', desc: '选择器顶部自定义工具栏插槽（取消/确认按钮区）', child: 'HBoxContainer / GButton', example: '<template #top-toolbar><GButton>取消</GButton><GButton type="primary">完成</GButton></template>' }
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
    slots: [
      { name: 'thumb', desc: '自定义滑块抓手把手插槽', child: 'Control / GIcon / TextureRect', example: '<template #thumb><GIcon name="volume-high" /></template>' },
      { name: 'mark', desc: '自定义刻度标记渲染插槽（透传 { value, label }）', child: 'Control / GText', example: '<template #mark="{ value }"><span>{{ value }}%</span></template>' }
    ]
  },

  // --------------------------------------------------------
  // 13. GForm 表单
  // --------------------------------------------------------
  'form': {
    title: 'Form 表单布局 (GForm & GFormItem)',
    desc: '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验和提交数据。支持标签位置 (Top/Left/Right)、统一宽度与星号必填校验。',
    demos: [
      {
        title: '1. 基础表单排版与校验提交 (Form Layout & Validation)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:440px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 账号</span>
              <div class="g-input-wrapper" style="flex:1;"><input id="formUser" class="g-input" value="勇者卡米尔"></div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="width:80px; text-align:right; font-size:0.88rem; color:var(--text-secondary);"><span style="color:var(--danger)">*</span> 密码</span>
              <div class="g-input-wrapper" style="flex:1;"><input id="formPwd" class="g-input" type="password" value="123456"></div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:6px;">
              <button class="g-btn g-btn-default" onclick="document.getElementById('formUser').value=''; document.getElementById('formPwd').value=''; showToast('表单已重置');">重置</button>
              <button class="g-btn g-btn-primary" onclick="showToast('提交成功: ' + document.getElementById('formUser').value, 'success')">提交表单</button>
            </div>
          </div>
        `,
        code: `# GDScript: Form & FormItem
var form = GForm.new()
form.label_width = 100.0

var user_item = GFormItem.new()
user_item.label = "账号"
user_item.required = true
user_item.add_child(GInput.new())
form.add_child(user_item)

add_child(form)`
      },
      {
        title: '2. 标签对齐与位置切换 (Label Position: Left / Right / Top)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:440px;">
            <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
              <span style="font-size:12px; color:var(--text-secondary);">标签对齐切换：</span>
              <button class="g-btn g-btn-default" style="height:28px; padding:0 8px; font-size:11px;" onclick="changeFormLabelAlign('left')">LEFT 靠左</button>
              <button class="g-btn g-btn-default" style="height:28px; padding:0 8px; font-size:11px;" onclick="changeFormLabelAlign('right')">RIGHT 靠右</button>
              <button class="g-btn g-btn-default" style="height:28px; padding:0 8px; font-size:11px;" onclick="changeFormLabelAlign('top')">TOP 靠顶</button>
            </div>
            <div id="demoFormDynamic" style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="g-form-label" style="width:90px; text-align:right; font-size:13px; color:var(--text-secondary);">公会名称</span>
                <div class="g-input-wrapper" style="flex:1;"><input class="g-input" value="晨曦骑士团"></div>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="g-form-label" style="width:90px; text-align:right; font-size:13px; color:var(--text-secondary);">活动主城</span>
                <select class="select-theme" style="flex:1; height:32px;">
                  <option>王城奥格瑞玛</option>
                  <option>暴风主城</option>
                  <option>达拉然浮空岛</option>
                </select>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: Form Label Position
var form = GForm.new()
form.label_position = GForm.LabelPosition.TOP
form.label_width = 120.0`
      },
      {
        title: '3. 游戏系统复合设置表单 (Game Multi-Control Settings Form)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:440px; background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; color:var(--text-primary);">🔊 开启背景音乐 (BGM):</span>
              <label class="g-switch"><input type="checkbox" checked onchange="showToast('BGM 开关: ' + this.checked)"><span class="g-switch-slider"></span></label>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; color:var(--text-primary);">⚔️ 伤害数字显示:</span>
              <label class="g-switch"><input type="checkbox" checked onchange="showToast('伤害飘字: ' + this.checked)"><span class="g-switch-slider"></span></label>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-primary);">
                <span>🎮 主音量大小:</span>
                <span id="formVolText" style="color:var(--primary); font-weight:600;">80%</span>
              </div>
              <input type="range" class="g-slider" min="0" max="100" value="80" oninput="document.getElementById('formVolText').innerText = this.value + '%'">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
              <button class="g-btn g-btn-primary" style="height:32px; font-size:12px;" onclick="showToast('游戏设置已保存到 Local / ConfigFile', 'success')">保存设置</button>
            </div>
          </div>
        `,
        code: `# GDScript: Composite Game Settings Form
var form = GForm.new()
var bgm_item = GFormItem.new()
bgm_item.label = "开启背景音乐"
bgm_item.add_child(GSwitch.new())

var vol_item = GFormItem.new()
vol_item.label = "音量大小"
vol_item.add_child(GSlider.new())

form.add_child(bgm_item)
form.add_child(vol_item)`
      },
      {
        title: '4. 动态表单项增删 (Dynamic Form Item Add/Remove)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%; max-width:460px;">
            <div id="dynamicFormItemList" style="display:flex; flex-direction:column; gap:10px;">
              <div class="g-form-item" style="display:flex; align-items:center; gap:12px;">
                <span style="width:90px; text-align:right; font-size:13px; color:var(--text-secondary);">装备词条 1</span>
                <div class="g-input-wrapper" style="flex:1;"><input class="g-input" value="暴击率 +15.5%"></div>
                <button class="g-btn g-btn-danger" style="height:32px; padding:0 10px;" onclick="this.parentElement.remove(); showToast('已删除词条项', 'warning');">×</button>
              </div>
              <div class="g-form-item" style="display:flex; align-items:center; gap:12px;">
                <span style="width:90px; text-align:right; font-size:13px; color:var(--text-secondary);">装备词条 2</span>
                <div class="g-input-wrapper" style="flex:1;"><input class="g-input" value="物理穿透 +320"></div>
                <button class="g-btn g-btn-danger" style="height:32px; padding:0 10px;" onclick="this.parentElement.remove(); showToast('已删除词条项', 'warning');">×</button>
              </div>
            </div>
            <div style="display:flex; gap:10px; margin-top:4px;">
              <button class="g-btn g-btn-default" style="flex:1; height:32px; font-size:12px;" onclick="addDynamicFormItem()"><i class="fa-solid fa-plus"></i> 追加新词条</button>
            </div>
          </div>
        `,
        code: `# GDScript: Dynamic Add FormItem
func add_item():
    var item = GFormItem.new()
    item.label = "自定义属性"
    item.add_child(GInput.new())
    form.add_child(item)`
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
      { name: 'default', desc: '表单主体内容插槽，放置各类表单控件与 GFormItem', child: 'Control / VBoxContainer', example: '<template #default><GFormItem label="账号"><GInput /></GFormItem></template>' },
      { name: 'label', desc: '自定义表单项左侧标签栏插槽（透传 { label, required }）', child: 'HBoxContainer / GText', example: '<template #label><span>用户名 <i style="color:red;">*</i></span></template>' },
      { name: 'error', desc: '自定义表单校验失败错误提示插槽（透传 { error_message }）', child: 'Control / GText', example: '<template #error="{ error_message }"><span class="err">{{ error_message }}</span></template>' },
      { name: 'extra', desc: '表单项底部额外辅助说明插槽', child: 'Control / GText', example: '<template #extra><small>密码长度建议在 8-16 位之间</small></template>' }
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
      },
      {
        title: '3. 插槽自定义对话框 (Custom Slots: #header / #default / #footer / #close)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <button class="g-btn g-btn-warning" onclick="
              openDialog(
                '🔥 获得神话首领宝箱',
                '<div style=\\'text-align:center; padding:10px;\\'><div style=\\'font-size:48px; margin-bottom:8px;\\'>🎁✨</div><div style=\\'font-weight:700; color:var(--text-primary); font-size:15px;\\'>【史诗战役通关奖励】</div><p style=\\'font-size:12px; color:var(--text-secondary); margin-top:6px;\\'>内含：极品神话圣剑 ×1 · 纯净以太结晶 ×50 · 钻石 ×888</p></div>',
                '💎 立即开启宝箱',
                '收入背包'
              );
            ">
              <i class="fa-solid fa-gift"></i> 打开插槽自定义结算弹窗
            </button>
          </div>
        `,
        code: `<!-- 方式 1: Vue 3 模板多插槽定制 (Vue Template Multi-Slots) -->
<GDialog v-model:open="showRewardModal">
  <!-- #header 顶部自定义标题插槽 -->
  <template #header>
    <div style="display:flex; align-items:center; gap:8px;">
      <span>🔥 获得神话首领宝箱</span>
      <GBadge value="HOT" />
    </div>
  </template>

  <!-- #default 正文内容插槽 (可内嵌任意子组件或 3D Viewport) -->
  <template #default>
    <div class="reward-box">
      <div class="reward-icon">🎁✨</div>
      <h4>【史诗战役通关奖励】</h4>
      <p>内含：极品神话圣剑 ×1 · 纯净以太结晶 ×50</p>
    </div>
  </template>

  <!-- #footer 底部操作栏插槽 -->
  <template #footer>
    <GButton @click="saveToInventory">收入背包</GButton>
    <GButton type="warning" @click="openNow">💎 立即开启宝箱</GButton>
  </template>
</GDialog>

# 方式 2: Godot GDScript 点语法直接配置 Slot (Dot Slot Property Syntax)
var dlg = GDialog.new()

# 1. 默认正文插槽 (默认无名字 default slot)
dlg.slotName = ""              # default 插槽
dlg.slotName.text = "【史诗战役通关奖励】内含极品神话圣剑！"
dlg.slotName.color = "white"

# 2. 具名标题插槽 (Named slot: header)
dlg.slotName = "header"
dlg.header.text = "🔥 获得神话首领宝箱"
dlg.header.color = "gold"

# 3. 具名底部插槽 (Named slot: footer)
dlg.slotName = "footer"
dlg.footer.confirm_text = "💎 立即开启宝箱"
dlg.footer.cancel_text = "收入背包"

dlg.open()`
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
      { name: 'default', desc: '对话框主体内容插槽', child: 'Control / VBoxContainer', example: '<template #default><p>确认要丢弃这件神话装备？</p></template>' },
      { name: 'header', desc: '对话框顶部标题栏插槽', child: 'HBoxContainer / GText', example: '<template #header><h3>⚠️ 高危操作警告</h3></template>' },
      { name: 'close', desc: '自定义右上角关闭按钮插槽', child: 'GButton / GIcon', example: '<template #close><GIcon name="xmark" /></template>' },
      { name: 'footer', desc: '对话框底部操作按钮栏插槽（默认确认/取消）', child: 'HBoxContainer / GSpace / GButton', example: '<template #footer><GButton type="danger">确认丢弃</GButton></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.1 GDialogue 剧情对话系统 (JRPG / AVG / MMO 对标)
  // --------------------------------------------------------
  'dialogue': {
    title: 'Dialogue 剧情对话系统 (GDialogue & Prompts)',
    desc: '专为 JRPG 战术游戏、文字冒险 AVG / GalGame、MMORPG 任务交接与 NPC 互动设计的全功能剧情对话系统。支持打字机逐字输出、说话者印章姓名牌、立绘插槽、多段对话队列、分支选择支、科幻六边形气泡与头顶悬浮按键提示。',
    demos: [
      {
        title: '1. 两人双向立绘对峙对话 (Dual-Character Confrontation & Active Highlighting)',
        render: `
          <div style="background:#0c111d; border:2px solid #233554; border-radius:12px; padding:20px; display:flex; flex-direction:column; gap:16px; position:relative; overflow:hidden;">
            <!-- Dual Standee Portraits: Hero on Left, Villain on Right -->
            <div style="display:flex; justify-content:space-between; align-items:flex-end; padding:0 30px; height:120px;">
              <div id="dualSpeakerLeft" style="display:flex; flex-direction:column; align-items:center; transition:all 0.3s ease;">
                <div style="font-size:56px; filter:drop-shadow(0 4px 10px rgba(64,158,255,0.4));">🧙‍♂️</div>
                <span style="font-size:12px; font-weight:700; color:#409eff; background:rgba(64,158,255,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;">罗宾 (Robin)</span>
              </div>

              <div id="dualSpeakerRight" style="display:flex; flex-direction:column; align-items:center; opacity:0.4; transform:scale(0.92); transition:all 0.3s ease;">
                <div style="font-size:56px; filter:drop-shadow(0 4px 10px rgba(245,108,108,0.4));">🦹‍♂️</div>
                <span style="font-size:12px; font-weight:700; color:#f56c6c; background:rgba(245,108,108,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;">萨堤罗斯 (Saturos)</span>
              </div>
            </div>

            <!-- Dialogue Box with Dynamic Side Switching -->
            <div style="background:linear-gradient(180deg, #0a1f44 0%, #051026 100%); border:3px solid #d4d9e6; border-radius:6px; padding:14px 18px; color:#fff;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span id="dualActiveSpeakerName" style="background:#1b356d; border:1px solid #ffd04b; color:#ffd04b; font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px;">罗宾</span>
                <span style="font-size:11px; color:#a4b0be;">点击下方按钮切换对话角色</span>
              </div>
              <div id="dualDialogText" style="font-size:15px; line-height:1.6; min-height:48px;">
                萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！
              </div>
            </div>

            <!-- Interactive Controller Buttons -->
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" style="flex:1;" onclick="
                document.getElementById('dualSpeakerLeft').style.opacity = '1';
                document.getElementById('dualSpeakerLeft').style.transform = 'scale(1.05)';
                document.getElementById('dualSpeakerRight').style.opacity = '0.35';
                document.getElementById('dualSpeakerRight').style.transform = 'scale(0.92)';
                document.getElementById('dualActiveSpeakerName').innerText = '罗宾';
                document.getElementById('dualActiveSpeakerName').style.borderColor = '#409eff';
                document.getElementById('dualActiveSpeakerName').style.color = '#409eff';
                document.getElementById('dualDialogText').innerText = '萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！';
              ">▶ 罗宾发言 (左侧主角高亮)</button>

              <button class="g-btn g-btn-danger" style="flex:1;" onclick="
                document.getElementById('dualSpeakerRight').style.opacity = '1';
                document.getElementById('dualSpeakerRight').style.transform = 'scale(1.05)';
                document.getElementById('dualSpeakerLeft').style.opacity = '0.35';
                document.getElementById('dualSpeakerLeft').style.transform = 'scale(0.92)';
                document.getElementById('dualActiveSpeakerName').innerText = '萨堤罗斯';
                document.getElementById('dualActiveSpeakerName').style.borderColor = '#f56c6c';
                document.getElementById('dualActiveSpeakerName').style.color = '#f56c6c';
                document.getElementById('dualDialogText').innerText = '哼，天真的小鬼！封印精神力只会让世界慢慢衰亡，点燃灯塔才是唯一的救赎！';
              ">▶ 萨堤罗斯发言 (右侧反派高亮)</button>
            </div>
          </div>
        `,
        code: `# GDScript: 2人面对面双向立绘对峙对话 (自动高亮当前说话者，未说话者半透明淡出)
GDialogue.converse([
    {
        "speaker": "罗宾",
        "left_avatar": preload("res://portraits/robin.png"),
        "right_avatar": preload("res://portraits/saturos.png"),
        "side": "left",
        "text": "萨堤罗斯！放弃点燃元素灯塔的野心吧！"
    },
    {
        "speaker": "萨堤罗斯",
        "left_avatar": preload("res://portraits/robin.png"),
        "right_avatar": preload("res://portraits/saturos.png"),
        "side": "right",
        "text": "哼，天真的小鬼！点燃灯塔才是拯救世界的唯一救赎！"
    }
])`
      },
      {
        title: '2. 场景宝箱开启与战利品掉落触发 (Treasure Chest Loot Trigger)',
        render: `
          <div style="background:#151009; border:2px solid #5c4326; border-radius:12px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:20px;">
            <div style="display:flex; align-items:center; gap:16px;">
              <div id="simChestIcon" style="font-size:48px; cursor:pointer; transition:all 0.3s ease;" onclick="
                this.style.transform = 'scale(1.2) rotate(-8deg)';
                setTimeout(() => {
                  this.innerHTML = '✨🎁';
                  this.style.transform = 'scale(1)';
                  openSimDialogue({
                    text: '开启了【远古龙神遗迹宝箱】！\\n获得战利品：【神圣誓约之刃 +12】x1，【神话强化石】x5，金币 x8,800！',
                    speaker: '宝箱开启',
                    avatar: '🗡️'
                  });
                }, 300);
              ">📦</div>
              <div>
                <div style="font-weight:700; color:#ffd700; font-size:14px;">远古龙神遗迹宝箱 (点击开箱)</div>
                <div style="font-size:11px; color:#eed8ae; margin-top:2px;">点击宝箱触发开箱判定、掉落动效与战利品对话</div>
              </div>
            </div>
            <button class="g-btn g-btn-warning" style="height:34px;" onclick="document.getElementById('simChestIcon').click()">
              <i class="fa-solid fa-key"></i> 开启宝箱 (Open Chest)
            </button>
          </div>
        `,
        code: `# GDScript: 点击宝箱触发开箱对话与掉落物展示
func _on_treasure_chest_clicked():
    play_chest_open_animation()
    GDialogue.loot_chest("远古龙神遗迹宝箱", [
        "【神圣誓约之刃 +12】x1",
        "【神话强化石】x5",
        "金币 x8,800"
    ], func():
        add_items_to_inventory()
        GMessage.success("物品已收入背包！")
    )`
      },
      {
        title: '3. 二次元/手游立绘剧场对话与【跳过剧情 >>】(Anime Story Theater - 对标截图)',
        render: `
          <div style="position:relative; width:100%; min-height:220px; background:linear-gradient(135deg, #180d2b 0%, #0d0617 100%); border:2px solid #5a2e8c; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:16px; user-select:none;">
            <!-- Top Right: Skip Story Button [ 跳过剧情 >> ] -->
            <div style="display:flex; justify-content:flex-end;">
              <button class="g-btn g-btn-default" style="background:rgba(230,162,60,0.15); border:1px solid #ffd04b; color:#ffd04b; font-weight:800; font-size:12px; height:28px; padding:0 14px; border-radius:14px; cursor:pointer; transition:all 0.2s;" onmouseenter="this.style.background='rgba(230,162,60,0.3)'" onmouseleave="this.style.background='rgba(230,162,60,0.15)'" onclick="simAnimeTheaterSkip()">
                跳过剧情 &gt;&gt;
              </button>
            </div>

            <!-- Left Character Standee + Bottom Dialogue Bar -->
            <div style="display:flex; align-items:flex-end; gap:16px;">
              <div id="animeStandeeAvatar" style="font-size:72px; line-height:1; filter:drop-shadow(0 0 16px rgba(186,85,211,0.5)); flex-shrink:0; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">🎭</div>
              
              <!-- Full-width Translucent Purple Dialogue Bar (Clickable to continue) -->
              <div id="animeDialogueBox" title="点击继续剧情" style="flex:1; background:rgba(35, 15, 60, 0.88); border:1px solid #8a4baf; border-radius:8px; padding:12px 18px; position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.6); cursor:pointer; transition:all 0.2s;" onmouseenter="this.style.borderColor='#ffd04b'; this.style.boxShadow='0 0 16px rgba(255,208,75,0.25)';" onmouseleave="this.style.borderColor='#8a4baf'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.6)';" onclick="simAnimeTheaterNext()">
                <div id="animeDialogueSpeaker" style="font-weight:800; color:#ffd04b; font-size:14px; margin-bottom:4px; text-shadow:0 0 8px rgba(255,208,75,0.6);">疯狂得爱丽丝啊</div>
                <div id="animeDialogueText" style="font-size:13px; color:#f1f2f6; line-height:1.5; min-height:40px;">
                  来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。
                </div>
                <!-- Golden Next Chevron > (Clickable button) -->
                <div id="animeDialogueNextBtn" title="点击继续" style="position:absolute; right:14px; bottom:10px; color:#ffd04b; font-size:18px; font-weight:800; animation:gBlink 0.6s infinite alternate; padding:2px 8px; border-radius:4px; background:rgba(255,208,75,0.1); border:1px solid rgba(255,208,75,0.3);">&gt;</div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 二次元手游剧场式立绘对话 (带跳过剧情按钮与点击继续)
var theater_dialog = GDialogue.say({
    "speaker": "疯狂得爱丽丝啊",
    "avatar": preload("res://portraits/alice_mask.png"),
    "text": "来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。",
    "allow_skip": true
})
theater_dialog.next_line_triggered.connect(func():
    print("玩家点击继续，进入下一句剧场台词")
)`
      },
      {
        title: '4. 《梦幻西游》经典 NPC 任务交接与红色选项分支 (Westward Journey NPC Quest)',
        render: `
          <div style="background:#0e131d; border:2px solid #4a5568; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; gap:16px; align-items:flex-end;">
              <!-- Left NPC 3D Bust with Name -->
              <div style="display:flex; flex-direction:column; align-items:center; width:90px;">
                <div style="width:72px; height:72px; background:radial-gradient(circle, #2d3748, #1a202c); border:2px solid #718096; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:36px;">🥋</div>
                <span style="font-size:12px; font-weight:700; color:#fff; background:#2d3748; padding:2px 8px; border-radius:4px; margin-top:-6px; border:1px solid #4a5568;">首席大弟子</span>
              </div>

              <!-- CRT Scanline Dark Dialogue Box with Red Clickable Branches -->
              <div style="flex:1; background:rgba(15, 20, 30, 0.95); border:2px solid #cbd5e0; border-radius:8px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
                <div style="color:#fff; font-size:13px; font-weight:600;">
                  敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！
                </div>
                <div style="display:flex; flex-direction:column; gap:4px; margin-top:2px;">
                  <a href="javascript:void(0)" style="color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;" onclick="showToast('触发战斗：进入首席弟子挑战副本！', 'danger')">
                    ▶ 我奉师傅之命，特来挑战——看招！
                  </a>
                  <a href="javascript:void(0)" style="color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;" onclick="showToast('触发剧情：我是路过拜访你的师傅老人家的。', 'info')">
                    ▶ 我是路过拜访你的师傅老人家的。
                  </a>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 《梦幻西游》NPC 任务交接与红字选择支
var diag = GDialogue.ask(
    "敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！",
    [
        "我奉师傅之命，特来挑战——看招！",
        "我是路过拜访你的师傅老人家的。"
    ],
    "首席大弟子",
    avatar_chief
)
diag.option_selected.connect(func(idx, text):
    if idx == 0:
        start_chief_boss_battle()
    else:
        open_dialog_greeting()
)`
      },
      {
        title: '5. 科幻/二次元斜切六边形气泡 (Sci-Fi Hexagonal Polygon Bubble - 对标截图)',
        render: `
          <div style="background:radial-gradient(circle at center, #1b2640 0%, #0a0f1d 100%); border:2px solid #2b4c7e; border-radius:12px; padding:20px; position:relative; overflow:hidden; display:flex; flex-direction:column; gap:16px; user-select:none;">
            <!-- Top Controls [ AUTO ] [ SKIP ] -->
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button id="scifiAutoBtn" class="g-btn g-btn-default" style="background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;" onclick="simSciFiToggleAuto()">AUTO</button>
              <button class="g-btn g-btn-default" style="background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;" onclick="simSciFiSkip()">SKIP</button>
            </div>

            <!-- Hexagonal Tech Dialogue Bubble -->
            <div id="scifiDialogueBox" title="点击继续对话" style="position:relative; background:#0d1a33; border:2px solid #409eff; padding:16px 24px; border-radius:14px; clip-path:polygon(0% 0%, 94% 0%, 100% 50%, 94% 100%, 0% 100%); box-shadow:0 0 16px rgba(64,158,255,0.3); cursor:pointer; min-height:80px;" onclick="simSciFiNext()">
              <!-- Speaker Tag Badge -->
              <div id="scifiSpeakerTag" style="position:absolute; top:-12px; left:20px; background:#409eff; color:#fff; font-size:11px; font-weight:800; padding:2px 14px; border-radius:4px; clip-path:polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%);">
                シマトラ
              </div>
              <div id="scifiDialogueText" style="color:#fff; font-size:13px; line-height:1.6; margin-top:2px;">
                誰が、どうやって、何の目的で――<br>そのあたりは、これから調査するのである
              </div>
              <div style="position:absolute; right:36px; bottom:10px; color:#409eff; font-size:14px; font-weight:800; animation:gBlink 0.6s infinite alternate;">&gt;&gt;</div>
            </div>
          </div>
        `,
        code: `# GDScript: 科幻/二次元斜切六边形气泡对话框
var scifi_diag = GDialogue.say("誰が、どうやって、何の目的で――\\nそのあたりは、これから調査するのである", "シマトラ")`
      },
      {
        title: '6. 《黄金太阳》经典 JRPG 对话框 (Golden Sun Style)',
        render: `
          <div style="display:flex; gap:12px; align-items:center;">
            <button class="g-btn g-btn-primary" onclick="openSimDialogue([
              { text: '修炼精神力的话，会学到不同的招式。', speaker: '神秘长者', avatar: '🧙‍♂️' },
              { text: '去北方的索罗神殿吧，四大元素的封印正在苏醒！', speaker: '神秘长者', avatar: '🧙‍♂️' }
            ])">
              <i class="fa-solid fa-play"></i> 播放黄金太阳经典对话
            </button>
          </div>
        `,
        code: `# GDScript: 黄金太阳经典对话
GDialogue.say("修炼精神力的话，会学到不同的招式。", "神秘长者")`
      },
      {
        title: '7. 像素 RPG 靠近 NPC 头顶悬浮交互按键 (Floating Prompt [ R ] / [ E ])',
        render: `
          <div style="background:#1e2b18; padding:16px 20px; border-radius:10px; border:2px solid #3c5a2e; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:16px;">
              <div style="font-size:36px; position:relative;">
                🧔‍♂️
                <div style="position:absolute; top:-16px; right:-8px; background:#000; color:#fff; border:2px solid #fff; border-radius:50%; width:20px; height:20px; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; animation:gBlink 0.6s infinite alternate;">R</div>
              </div>
              <div>
                <div style="font-weight:700; color:#a3e635; font-size:13px;">湖畔垂钓翁·姜老</div>
                <div style="font-size:11px; color:#d9f99d; margin-top:2px;">靠近时自动浮现 [ R ] 交互按键，按 R 或点击开始对话</div>
              </div>
            </div>
            <button class="g-btn g-btn-primary" style="height:32px; font-size:12px;" onclick="openSimDialogue({ text: '小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！', speaker: '姜老', avatar: '🎣' })">
              按 R 键交谈
            </button>
          </div>
        `,
        code: `# GDScript: 为 2D NPC 绑定头顶交互按键
GInteractPrompt.attach_to(npc_old_man, "R", func():
    GDialogue.say("小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！", "姜老", avatar_old_man)
)`
      }
    ],
    props: [
      { name: 'typing_speed', type: 'float', default: '0.03', desc: '打字机单字输出时间间隔 (秒)' },
      { name: 'position', type: 'enum', default: 'BOTTOM', desc: '对话框位置：BOTTOM (底部居中), TOP (顶部), CENTER (居中)' }
    ],
    events: [
      { name: 'text_completed()', desc: '当前句打字机输出完毕时触发', params: '()' },
      { name: 'dialogue_finished()', desc: '整段对话队列全部播放完毕并关闭时触发', params: '()' },
      { name: 'option_selected(index, text)', desc: '玩家点击分支选项时触发', params: '(index: int, text: String)' }
    ],
    methods: [
      { name: 'say(lines, speaker="", avatar=null)', desc: '播放单句或多句对话队列', params: '(lines: Variant, speaker: String, avatar: Texture2D) -> GDialogue' },
      { name: 'ask(question, options, speaker="", avatar=null)', desc: '播放带分支选择支的剧情对话', params: '(question: String, options: Array, speaker: String, avatar: Texture2D) -> GDialogue' }
    ],
    slots: [
      { name: 'default', desc: '剧情对话正文打字机富文本区域', child: 'RichTextLabel / Control', example: '<template #default>勇士，燃烧军团的阴影已笼罩艾泽拉斯！</template>' },
      { name: 'name', desc: '说话者姓名牌印章区域', child: 'GText / PanelContainer', example: '<template #name><span>大魔导师·卡德加 (Lv.99)</span></template>' },
      { name: 'avatar', desc: '说话者半身立绘/动态插画插槽', child: 'TextureRect / AnimatedSprite2D', example: '<template #avatar><TextureRect texture="res://npc_khadgar.png" /></template>' },
      { name: 'options', desc: '分支选择支列表插槽（透传 { option_list }）', child: 'VBoxContainer / GButton', example: '<template #options><GButton>接受拯救世界任务</GButton></template>' },
      { name: 'next-icon', desc: '右下角打字机完毕后的翻页闪烁指示图标插槽', child: 'GIcon / TextureRect', example: '<template #next-icon><GIcon name="angles-down" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.2 GChat 微信 / 气泡对话流 (WeChat & Lifeline Style)
  // --------------------------------------------------------
  'chat': {
    title: 'Chat 微信与气泡对话流 (GChat & Lifeline)',
    desc: '提供类似微信 (WeChat)、QQ 以及文字冒险解密游戏《生命线 Lifeline》的对话气泡流组件。支持左右双向分色气泡、系统事件时间胶囊、自适应文本长度、打字中动效与底部即时发送工具栏。',
    demos: [
      {
        title: '1. 微信经典双向气泡聊天流 (WeChat IM Stream)',
        render: `
          <div class="g-chat-container">
            <div class="g-chat-messages" id="simChatMsgList">
              <div class="g-chat-sys-pill">昨天 21:40</div>
              <div class="g-chat-row is-other">
                <div class="g-chat-avatar">🧙‍♂️</div>
                <div class="g-chat-col">
                  <span style="font-size:11px; color:var(--text-secondary);">神秘贤者</span>
                  <div class="g-chat-bubble">勇者，你已经准备好前往索罗神殿了吗？</div>
                </div>
              </div>
              <div class="g-chat-row is-self">
                <div class="g-chat-avatar">⚔️</div>
                <div class="g-chat-col">
                  <div class="g-chat-bubble">已经整理好全套神话装备，随时可以出发！</div>
                </div>
              </div>
            </div>
            <div style="padding:10px 14px; background:var(--bg-card); border-top:1px solid var(--border-base); display:flex; gap:8px; align-items:center;">
              <input type="text" id="simChatInput" class="g-input" placeholder="输入消息..." style="flex:1; height:34px;" onkeydown="if(event.key==='Enter') document.getElementById('simChatSendBtn').click()">
              <button class="g-btn g-btn-primary" id="simChatSendBtn" style="height:34px; padding:0 16px;" onclick="
                const inp = document.getElementById('simChatInput');
                const val = inp.value.trim();
                if (!val) return;
                const list = document.getElementById('simChatMsgList');
                const row = document.createElement('div');
                row.className = 'g-chat-row is-self';
                row.innerHTML = '<div class=\\'g-chat-avatar\\'>⚔️</div><div class=\\'g-chat-col\\'><div class=\\'g-chat-bubble\\'>' + val + '</div></div>';
                list.appendChild(row);
                inp.value = '';
                list.scrollTop = list.scrollHeight;
                setTimeout(() => {
                  const replyRow = document.createElement('div');
                  replyRow.className = 'g-chat-row is-other';
                  replyRow.innerHTML = '<div class=\\'g-chat-avatar\\'>🧙‍♂️</div><div class=\\'g-chat-col\\'><span style=\\'font-size:11px; color:var(--text-secondary);\\'>神秘贤者</span><div class=\\'g-chat-bubble\\'>收到！愿风灵之力庇护你！</div></div>';
                  list.appendChild(replyRow);
                  list.scrollTop = list.scrollHeight;
                }, 800);
              ">发送</button>
            </div>
          </div>
        `,
        code: `# GDScript: 微信风格聊天流
var chat = GChat.new()
chat.receive_message("勇者，你已经准备好前往索罗神殿了吗？", "神秘贤者", avatar_sage)
chat.send_self_message("已经整理好全套神话装备，随时可以出发！", avatar_hero)

# 监听用户发送事件
chat.message_sent.connect(func(text):
    print("Player sent:", text)
    # 模拟自动回复
    await get_tree().create_timer(1.0).timeout
    chat.receive_message("收到！愿风灵之力庇护你！", "神秘贤者", avatar_sage)
)`
      },
      {
        title: '2. 《生命线 Lifeline》 文字冒险自适应深色气泡流 (Lifeline Dark Style)',
        render: `
          <div class="g-lifeline-container" id="simLifelineBox">
            <div class="g-lifeline-bubble">不是特别方便说</div>
            <div class="g-lifeline-bubble highlight">好吧，那如果公司来不及救你的话，现在要怎么办？</div>
            <div class="g-lifeline-bubble">去科朗2-C地表吧</div>
            <div class="g-lifeline-bubble">那里有液态水和氧气</div>
            <div class="g-lifeline-bubble">计算的氧气浓度也适合人类呼吸</div>
            <div class="g-lifeline-bubble">在那里我能撑更久</div>
            <div style="display:flex; gap:10px; margin-top:10px;">
              <button class="g-btn g-btn-default" style="flex:1; border-color:#555; color:#fff;" onclick="showToast('选择了分支：立即前往地表飞船', 'info')">▶ 前往地表飞船</button>
              <button class="g-btn g-btn-default" style="flex:1; border-color:#555; color:#fff;" onclick="showToast('选择了分支：留在原地继续呼救', 'warning')">▶ 原地等待救援</button>
            </div>
          </div>
        `,
        code: `# GDScript: 《生命线 Lifeline》自适应文本气泡流
var lifeline_chat = GChat.new()
lifeline_chat.self_bubble_color = Color.hex(0x44444a)
lifeline_chat.other_bubble_color = Color.hex(0x38383c)

lifeline_chat.receive_message("去科朗2-C地表吧")
lifeline_chat.receive_message("那里有液态水和氧气")
lifeline_chat.receive_message("计算的氧气浓度也适合人类呼吸")
lifeline_chat.receive_message("在那里我能撑更久")`
      }
    ],
    props: [
      { name: 'self_bubble_color', type: 'Color', default: 'Color.hex(0x07c160)', desc: '我方发送气泡底色 (默认微信绿)' },
      { name: 'other_bubble_color', type: 'Color', default: 'Color.hex(0x242426)', desc: '对方接收气泡底色' },
      { name: 'auto_scroll', type: 'boolean', default: 'true', desc: '新消息到达时是否自动平滑滚动到底部' }
    ],
    events: [
      { name: 'message_sent(text: String)', desc: '玩家在底部输入框输入并点击发送或回车时触发', params: '(text: String)' }
    ],
    methods: [
      { name: 'send_self_message(text, avatar=null)', desc: '添加一条我方右侧气泡消息', params: '(text: String, avatar: Texture2D) -> GChat' },
      { name: 'receive_message(text, sender="队友", avatar=null)', desc: '添加一条对方左侧气泡消息', params: '(text: String, sender: String, avatar: Texture2D) -> GChat' },
      { name: 'add_system_notice(text)', desc: '添加一条居中系统时间戳或事件胶囊', params: '(text: String) -> GChat' },
      { name: 'clear()', desc: '清空当前聊天记录列表', params: '() -> void' }
    ],
    slots: [
      { name: 'message', desc: '单条消息气泡自定义渲染插槽（透传 { message_data, is_self }）', child: 'Control / HBoxContainer', example: '<template #message="{ msg, is_self }"><div :class="is_self ? \'my-msg\' : \'peer-msg\'">{{ msg.text }}</div></template>' },
      { name: 'avatar', desc: '发言玩家头像插槽（透传 { user_info }）', child: 'GAvatar', example: '<template #avatar="{ user }"><GAvatar :src="user.avatar_url" /></template>' },
      { name: 'input', desc: '底部自定义输入与表情选择工具栏插槽', child: 'GInput / GButton', example: '<template #input><GInput placeholder="输入消息..." /><GButton>发送</GButton></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.3 GPopup 弹出层 (Vant UI 对标)
  // --------------------------------------------------------
  'popup': {
    title: 'Popup 弹出层 (GPopup)',
    desc: '弹出层容器，用于展示多方向弹出的面板、规格选择器、快捷菜单或对话框。深度对标 Vant UI Popup 规范，支持居中缩放、顶部滑出、底部抽屉、左右侧滑、大圆角与关闭图标定制。',
    demos: [
      {
        title: '1. 基础居中弹出 (Basic Center Popup)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="openPopupDemo('center')">居中弹出 (Center)</button>
          </div>
        `,
        code: `# GDScript: 基础居中弹出
var popup = GPopup.new()
popup.position_type = GPopup.PositionType.CENTER
popup.closeable = true
popup.open()
add_child(popup)`
      },
      {
        title: '2. 弹出位置 (Position: Top / Bottom / Left / Right)',
        render: `
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="g-btn g-btn-default" onclick="openPopupDemo('top')">顶部弹出 (Top)</button>
            <button class="g-btn g-btn-default" onclick="openPopupDemo('bottom')">底部弹出 (Bottom)</button>
            <button class="g-btn g-btn-default" onclick="openPopupDemo('left')">左侧弹出 (Left)</button>
            <button class="g-btn g-btn-default" onclick="openPopupDemo('right')">右侧弹出 (Right)</button>
          </div>
        `,
        code: `# GDScript: 4 方向滑出弹出层
var popup = GPopup.new()
popup.position_type = GPopup.PositionType.BOTTOM # TOP, LEFT, RIGHT
popup.round_corner = true
popup.open()`
      },
      {
        title: '3. 圆角弹窗与关闭图标 (Round Corner & Close Icon)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-warning" onclick="openPopupDemo('round-bottom')">底部圆角弹窗 (Round Bottom)</button>
            <button class="g-btn g-btn-warning" onclick="openPopupDemo('round-center')">居中圆角卡片 (Round Center)</button>
          </div>
        `,
        code: `# GDScript: 圆角弹窗
var popup = GPopup.new()
popup.position_type = GPopup.PositionType.BOTTOM
popup.round_corner = true
popup.closeable = true
popup.open()`
      },
      {
        title: '4. 游戏实战：商品道具购买规格选择器 (Game Item ActionSheet)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-success" onclick="openPopupDemo('actionsheet')">弹出购买规格浮层 (ActionSheet)</button>
          </div>
        `,
        code: `# GDScript: 游戏商品规格选择
var popup = GPopup.new()
popup.position_type = GPopup.PositionType.BOTTOM
popup.round_corner = true
popup.set_content(item_buy_panel)
popup.open()`
      }
    ],
    props: [
      { name: 'position_type', type: 'enum', default: 'CENTER', desc: '弹出位置：CENTER (居中), TOP (顶部), BOTTOM (底部), LEFT (左侧), RIGHT (右侧)' },
      { name: 'round_corner', type: 'boolean', default: 'false', desc: '是否显示圆角 (顶部/底部弹出时自动为上方或下方大圆角)' },
      { name: 'closeable', type: 'boolean', default: 'false', desc: '是否显示右上角/左上角关闭图标' },
      { name: 'close_icon_position', type: 'enum', default: 'TOP_RIGHT', desc: '关闭图标位置：TOP_RIGHT, TOP_LEFT, BOTTOM_RIGHT, BOTTOM_LEFT' },
      { name: 'overlay', type: 'boolean', default: 'true', desc: '是否显示背景遮罩层' },
      { name: 'close_on_click_overlay', type: 'boolean', default: 'true', desc: '是否在点击背景遮罩层后自动关闭' },
      { name: 'duration', type: 'float', default: '0.3', desc: '过渡动画时长 (秒)' }
    ],
    events: [
      { name: 'opened()', desc: '弹出层打开动画结束时触发', params: '()' },
      { name: 'closed()', desc: '弹出层关闭动画结束时触发', params: '()' },
      { name: 'click_overlay()', desc: '点击背景遮罩层时触发', params: '()' },
      { name: 'click_close_icon()', desc: '点击关闭图标时触发', params: '()' }
    ],
    methods: [
      { name: 'open()', desc: '打开弹出层并执行对应方位的 Tween 滑入/缩放动效', params: '() -> void' },
      { name: 'close()', desc: '关闭弹出层并执行滑出/淡出动效', params: '() -> void' },
      { name: 'toggle()', desc: '切换弹出层的开启/关闭状态', params: '() -> void' },
      { name: 'set_content(node)', desc: '动态设置弹出层内部承载的子节点内容', params: '(node: Control) -> void' }
    ],
    slots: [
      { name: 'default', desc: '弹层主体内容插槽', child: 'Control / VBoxContainer', example: '<template #default><div class="goods-sku-panel">...</div></template>' },
      { name: 'header', desc: '顶部标题/导航栏插槽', child: 'HBoxContainer', example: '<template #header><h4>选择武器精炼规格</h4></template>' },
      { name: 'close', desc: '自定义关闭按钮插槽', child: 'GButton / GIcon', example: '<template #close><GIcon name="xmark" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.2 GOverlay 遮罩层 (Vant UI 对标)
  // --------------------------------------------------------
  'overlay': {
    title: 'Overlay 遮罩层 (GOverlay)',
    desc: '创建一个全屏遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。深度对标 Vant UI Overlay 规范，支持内嵌居中卡片插槽与背景淡入淡出。',
    demos: [
      {
        title: '1. 基础遮罩层 (Basic Overlay)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="openOverlayDemo('basic')">显示基础遮罩 (点击背景关闭)</button>
          </div>
        `,
        code: `# GDScript: 基础遮罩层
var overlay = GOverlay.new()
overlay.open()
add_child(overlay)`
      },
      {
        title: '2. 嵌入内容 (Embedded Centered Content / Slot)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-success" onclick="openOverlayDemo('content')">嵌入居中加载卡片 (Embedded Content)</button>
          </div>
        `,
        code: `# GDScript: 遮罩层嵌入内容
var overlay = GOverlay.new()
var card = PanelContainer.new()
# 添加居中内容卡片...
overlay.set_content(card)
overlay.open()`
      },
      {
        title: '3. 自定义遮罩层颜色与透明度 (Custom Background Color)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-warning" onclick="openOverlayDemo('green')">绿色沉浸遮罩 (Green Tint)</button>
            <button class="g-btn g-btn-danger" onclick="openOverlayDemo('danger')">红色警戒遮罩 (Danger Tint)</button>
          </div>
        `,
        code: `# GDScript: 自定义遮罩颜色
var overlay = GOverlay.new()
overlay.mask_color = Color(0.1, 0.6, 0.3, 0.5) # 自定义颜色
overlay.open()`
      }
    ],
    props: [
      { name: 'mask_color', type: 'Color', default: 'Color(0, 0, 0, 0.7)', desc: '遮罩背景颜色与透明度' },
      { name: 'duration', type: 'float', default: '0.3', desc: '淡入淡出动画时长 (秒)' },
      { name: 'lock_scroll', type: 'boolean', default: 'true', desc: '是否锁定底层滚动或输入阻断' }
    ],
    events: [
      { name: 'click()', desc: '点击遮罩层时触发', params: '()' },
      { name: 'opened()', desc: '遮罩层淡入打开结束时触发', params: '()' },
      { name: 'closed()', desc: '遮罩层淡出关闭结束时触发', params: '()' }
    ],
    methods: [
      { name: 'open()', desc: '打开遮罩层并播放淡入动效', params: '() -> void' },
      { name: 'close()', desc: '关闭遮罩层并播放淡出动效', params: '() -> void' },
      { name: 'toggle()', desc: '切换遮罩层的开启与关闭状态', params: '() -> void' },
      { name: 'set_content(node)', desc: '向遮罩层中央插槽挂载自定义控件节点', params: '(node: Control) -> void' }
    ],
    slots: [
      { name: 'default', desc: '遮罩层内部居中/挂载的子节点插槽', child: 'Control', example: '<template #default><div class="center-loading-card">数据同步中...</div></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.3 GActionSheet 动作面板 (Vant UI 对标)
  // --------------------------------------------------------
  'action-sheet': {
    title: 'ActionSheet 动作面板 (GActionSheet)',
    desc: '从页面底部弹出的模态操作菜单，用于提供一组与当前上下文相关的备选操作，深度对标 Vant UI 动作面板规范，支持标题、子标题、危险项高亮与取消按钮。',
    demos: [
      {
        title: '1. 基础菜单列表 (Basic ActionSheet)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="openSimActionSheet({ actions: [{ name:'微信好友分享' }, { name:'朋友圈海报生成' }, { name:'复制活动邀请码' }] })">呼出基础动作面板</button>
          </div>
        `,
        code: `# GDScript 方式 1: 批量数组添加
var sheet = GActionSheet.new()
sheet.add_actions([
    { "name": "微信好友分享" },
    { "name": "朋友圈海报生成" },
    { "name": "复制活动邀请码" }
])
sheet.select.connect(func(item, idx): print("Action:", item.name))
sheet.open()`
      },
      {
        title: '2. 带标题与高危警示操作 (Title & Danger Option)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-danger" onclick="openSimActionSheet({ title: '⚠️ 您正在对公会成员进行管理操作', actions: [{ name:'提升为公会副会长' }, { name:'移出公会 (Kick Out)', danger:true }] })">公会管理动作面板 (含高危操作)</button>
          </div>
        `,
        code: `# GDScript: 带标题与高危项
var sheet = GActionSheet.new()
sheet.title = "公会成员管理"
sheet.add_actions([
    { "name": "提升为副会长" },
    { "name": "踢出公会", "danger": true }
])
sheet.open()`
      }
    ],
    props: [
      { name: 'title', type: 'String', default: '""', desc: '面板顶部标题' },
      { name: 'description', type: 'String', default: '""', desc: '面板标题下方的描述信息' },
      { name: 'actions', type: 'Array[Dictionary]', default: '[]', desc: '面板选项列表 [{"name": "", "subname": "", "danger": false, "disabled": false}]' },
      { name: 'cancel_text', type: 'String', default: '"取消"', desc: '底部取消按钮文字' },
      { name: 'round_corner', type: 'boolean', default: 'true', desc: '是否显示圆角' }
    ],
    events: [
      { name: 'select(item, index)', desc: '点击选项时触发', params: '(item: Dictionary, index: int)' },
      { name: 'cancel()', desc: '点击取消按钮时触发', params: '()' }
    ],
    methods: [
      { name: 'add_action(name, subname="", danger=false, disabled=false)', desc: '动态添加单个动作项', params: '(name: String, subname: String, danger: bool, disabled: bool) -> void' },
      { name: 'add_actions(action_list: Array[Dictionary])', desc: '批量追加一组动作面板选项', params: '(action_list: Array[Dictionary]) -> void' },
      { name: 'open()', desc: '呼出底部动作面板', params: '() -> void' },
      { name: 'close()', desc: '关闭动作面板', params: '() -> void' }
    ],
    slots: [
      { name: 'title', desc: '面板顶部标题或说明插槽', child: 'GText / Label', example: '<template #title><h4>请选择快捷分享方式</h4></template>' },
      { name: 'action', desc: '自定义每个操作条目渲染插槽（透传 { item, index }）', child: 'Control / GButton', example: '<template #action="{ item }"><GButton icon="share">{{ item.name }}</GButton></template>' },
      { name: 'cancel', desc: '底部取消按钮插槽', child: 'GButton', example: '<template #cancel><GButton>关闭面板</GButton></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.4 GPopover 气泡弹出框 (Vant UI 对标)
  // --------------------------------------------------------
  'popover': {
    title: 'Popover 气泡弹出框 (GPopover)',
    desc: '基于目标元素定位的气泡卡片，常用于展示快捷操作菜单或轻量信息提示。深度对标 Vant UI 气泡规范，支持 Dark/Light 双色主题与菜单列表。',
    demos: [
      {
        title: '1. 暗黑主题与明亮主题气泡 (Dark & Light Theme)',
        render: `
          <div style="display:flex; gap:36px; align-items:center; flex-wrap:wrap;">
            <div class="g-popover-wrapper">
              <button class="g-btn g-btn-primary" onclick="toggleSimPopover(this, { theme:'dark' })">暗黑气泡 (Dark Popover)</button>
              <div class="g-popover-bubble">
                <div class="g-popover-item" onclick="showToast('点击了发起群聊'); toggleSimPopover(this.parentElement.previousElementSibling);"><i class="fa-solid fa-comments"></i> 发起群聊</div>
                <div class="g-popover-item" onclick="showToast('点击了添加好友'); toggleSimPopover(this.parentElement.previousElementSibling);"><i class="fa-solid fa-user-plus"></i> 添加好友</div>
                <div class="g-popover-item" onclick="showToast('点击了扫一扫'); toggleSimPopover(this.parentElement.previousElementSibling);"><i class="fa-solid fa-qrcode"></i> 扫一扫</div>
              </div>
            </div>

            <div class="g-popover-wrapper">
              <button class="g-btn g-btn-default" onclick="toggleSimPopover(this, { theme:'light' })">浅色气泡 (Light Popover)</button>
              <div class="g-popover-bubble light">
                <div class="g-popover-item" onclick="showToast('点击了设为星标'); toggleSimPopover(this.parentElement.previousElementSibling);"><i class="fa-solid fa-star" style="color:var(--warning);"></i> 设为星标</div>
                <div class="g-popover-item" onclick="showToast('点击了静音提醒'); toggleSimPopover(this.parentElement.previousElementSibling);"><i class="fa-solid fa-bell-slash"></i> 静音提醒</div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 气泡弹出框 (批量配置菜单)
var popover = GPopover.new()
popover.theme = GPopover.Theme.DARK
popover.add_actions([
    { "text": "发起群聊", "icon": icon_chat },
    { "text": "添加好友", "icon": icon_user },
    { "text": "扫一扫", "icon": icon_scan }
])
popover.open_for_node(target_btn)`
      }
    ],
    props: [
      { name: 'placement', type: 'enum', default: 'BOTTOM', desc: '弹出定位：TOP, BOTTOM, LEFT, RIGHT' },
      { name: 'theme', type: 'enum', default: 'DARK', desc: '主题风格：DARK (深色), LIGHT (浅色)' },
      { name: 'actions', type: 'Array[Dictionary]', default: '[]', desc: '菜单选项列表 [{"text": "", "icon": Texture2D, "disabled": false}]' },
      { name: 'show_arrow', type: 'boolean', default: 'true', desc: '是否显示小三角箭头' }
    ],
    events: [
      { name: 'item_selected(index, action)', desc: '点击菜单项时触发', params: '(index: int, action: Dictionary)' },
      { name: 'opened()', desc: '气泡打开时触发', params: '()' },
      { name: 'closed()', desc: '气泡关闭时触发', params: '()' }
    ],
    methods: [
      { name: 'add_action(text, icon=null, disabled=false)', desc: '动态添加单个气泡菜单项', params: '(text: String, icon: Texture2D, disabled: bool) -> void' },
      { name: 'add_actions(action_list: Array[Dictionary])', desc: '批量追加一组气泡菜单项', params: '(action_list: Array[Dictionary]) -> void' },
      { name: 'open_for_node(target: Control)', desc: '针对指定控件节点弹出气泡', params: '(target: Control) -> void' },
      { name: 'close()', desc: '关闭气泡框', params: '() -> void' },
      { name: 'toggle_for_node(target: Control)', desc: '切换气泡开启/关闭', params: '(target: Control) -> void' }
    ],
    slots: [
      { name: 'default', desc: '触发气泡的宿主目标节点插槽', child: 'GButton / Control', example: '<template #default><GButton icon="ellipsis">更多</GButton></template>' },
      { name: 'content', desc: '气泡弹出卡片内部自定义内容插槽', child: 'Control / VBoxContainer', example: '<template #content><VBoxContainer><GButton icon="qrcode">扫一扫</GButton></VBoxContainer></template>' }
    ]
  },

  // --------------------------------------------------------
  // 14.5 GNoticeBar 通知栏 (Vant UI 对标)
  // --------------------------------------------------------
  'notice-bar': {
    title: 'NoticeBar 通知栏 (GNoticeBar)',
    desc: '在页面顶部展示通告栏，用于向用户广播消息或系统维护通知。深度对标 Vant UI 通知栏规范，支持平滑滚动跑马灯、警示/信息/成功色彩与关闭按钮。',
    demos: [
      {
        title: '1. 滚动跑马灯通告栏 (Marquee NoticeBar)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div class="g-notice-bar g-notice-bar-warning">
              <span>📢</span>
              <div class="g-notice-marquee">
                <span class="g-notice-content">🔥 [重要通告] 《全域战线》S4 跨服巅峰冠军赛将于今晚 20:00 准时打响，全服限时掉落双倍神话强化石！</span>
              </div>
              <button onclick="this.parentElement.style.display='none'; showToast('通告栏已关闭');" style="background:none; border:none; color:inherit; cursor:pointer; font-size:14px;">✕</button>
            </div>

            <div class="g-notice-bar g-notice-bar-info">
              <span>🔔</span>
              <div class="g-notice-marquee">
                <span class="g-notice-content">技术公告：引擎已全面支持 Godot 4.3 渲染管线与 Vue 响应式 UI 模组。</span>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 跑马灯通知栏
var bar = GNoticeBar.new()
bar.text = "🔥 [重要通告] 全服限时掉落双倍神话强化石！"
bar.scrollable = true
bar.notice_type = GNoticeBar.NoticeType.WARNING
add_child(bar)`
      }
    ],
    props: [
      { name: 'text', type: 'String', default: '""', desc: '通告栏文本内容' },
      { name: 'scrollable', type: 'boolean', default: 'true', desc: '是否开启水平无缝循环滚动跑马灯' },
      { name: 'scroll_speed', type: 'float', default: '50.0', desc: '滚动速度 (像素/秒)' },
      { name: 'notice_type', type: 'enum', default: 'WARNING', desc: '通知色彩风格：WARNING (警示橙), INFO (信息蓝), SUCCESS (成功绿), DANGER (紧急红)' }
    ],
    events: [
      { name: 'click()', desc: '点击通告栏主体时触发', params: '()' },
      { name: 'close()', desc: '点击右侧关闭图标时触发', params: '()' }
    ],
    methods: [],
    slots: [
      { name: 'default', desc: '滚动播报文本主体插槽', child: 'Label / RichTextLabel', example: '<template #default><span>🔥 [重要通告] 全服限时掉落双倍神话强化石！</span></template>' },
      { name: 'left-icon', desc: '左侧通知喇叭图标插槽', child: 'GIcon / TextureRect', example: '<template #left-icon><GIcon name="bullhorn" /></template>' },
      { name: 'right-icon', desc: '右侧更多/关闭操作区插槽', child: 'GIcon / GButton', example: '<template #right-icon><GIcon name="chevron-right" /></template>' }
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
    slots: [
      { name: 'default', desc: '全局轻量消息正文插槽', child: 'Label / RichTextLabel', example: '<template #default><span>系统配置已成功保存！</span></template>' },
      { name: 'icon', desc: '自定义前置状态图标插槽', child: 'GIcon / TextureRect', example: '<template #icon><GIcon name="circle-check" style="color:green;" /></template>' }
    ]
  },

  // --------------------------------------------------------
  // 15.2 GToast 轻提示 (Vant UI 对标)
  // --------------------------------------------------------
  'toast': {
    title: 'Toast 轻提示 (GToast)',
    desc: '在页面中间或顶部/底部弹出轻量级半透明黑色反馈气泡，用于即时反馈、成功、失败、加载中与倒计时等场景。深度对标 Vant UI 轻提示规范，支持静态单例直接调用与流畅链式 API。',
    demos: [
      {
        title: '1. 文字提示与多位置展示 (Text & Positions)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="openSimToast('这是一条居中纯文字轻提示')">文字提示 (Middle)</button>
            <button class="g-btn g-btn-default" onclick="openSimToast({ message: '顶部通知轻提示', position: 'top' })">顶部提示 (Top)</button>
            <button class="g-btn g-btn-default" onclick="openSimToast({ message: '底部安全区轻提示', position: 'bottom' })">底部提示 (Bottom)</button>
          </div>
        `,
        code: `# GDScript: 文字轻提示
# 1. 默认居中展示
GToast.text("这是一条纯文字轻提示")

# 2. 顶部或底部展示
GToast.text_top("顶部轻提示", 2.0, GToast.Position.TOP)
GToast.text("底部轻提示", 2.0, GToast.Position.BOTTOM)`
      },
      {
        title: '2. 成功与失败状态 (Success & Fail)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="openSimToast({ message: '当前网络延迟 25ms', type: 'info' })">信息提示 (Info)</button>
            <button class="g-btn g-btn-warning" onclick="openSimToast({ message: '生命值过低警告！', type: 'warning' })">警告提示 (Warning)</button>
            <button class="g-btn g-btn-success" onclick="openSimToast({ message: '装备强化成功！', type: 'success' })">成功提示 (Success)</button>
            <button class="g-btn g-btn-danger" onclick="openSimToast({ message: '金币不足强化失败', type: 'fail' })">失败提示 (Fail Toast)</button>
          </div>
        `,
        code: `# GDScript: 状态轻提示
GToast.success("装备强化成功！")
GToast.fail("金币不足，强化失败")`
      },
      {
        title: '3. 加载中与点击穿透限制 (Loading & Forbid Click)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-primary" onclick="
              openSimToast({ message: '正在加载游戏资源...', type: 'loading', forbidClick: true, duration: 2500 });
            ">加载中提示 (Loading 2.5s)</button>

            <button class="g-btn g-btn-default" onclick="
              let count = 3;
              openSimToast({ message: '倒计时 ' + count + ' 秒...', type: 'loading', forbidClick: true, duration: 3200 });
              const timer = setInterval(() => {
                count--;
                const elem = document.getElementById('simToastMsg');
                if (elem && count > 0) elem.innerText = '倒计时 ' + count + ' 秒...';
                else clearInterval(timer);
              }, 1000);
            ">动态更新倒计时 (Dynamic Message)</button>
          </div>
        `,
        code: `# GDScript: 加载中轻提示与动态文案更新
var toast = GToast.loading("正在连接游戏服务器...", true)

# 模拟异步任务完成后更新或关闭
await get_tree().create_timer(2.0).timeout
toast.set_message("同步存档中...")

await get_tree().create_timer(1.0).timeout
GToast.success("登录成功！")`
      },
      {
        title: '4. 自定义图标与参数对象调用 (Custom Icon & Options)',
        render: `
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="g-btn g-btn-warning" onclick="openSimToast({ message: '获得神话勋章！', icon: '<i class=\\'fa-solid fa-medal\\'></i>', duration: 2000 })">自定义勋章图标</button>
            <button class="g-btn g-btn-default" onclick="openSimToast({ message: '已加入我的收藏', icon: '<i class=\\'fa-solid fa-heart\\' style=\\'color:#f56c6c;\\'></i>', duration: 2000 })">自定义红心图标</button>
          </div>
        `,
        code: `# GDScript: 自定义图标轻提示
GToast.custom({
    "message": "获得神话勋章！",
    "icon_text": "🎖️",
    "duration": 2.5
})`
      }
    ],
    props: [
      { name: 'type', type: 'enum', default: 'TEXT', desc: '提示类型：TEXT (纯文字), INFO (信息), WARNING (警告), SUCCESS (成功), FAIL (失败), LOADING (加载转圈), CUSTOM (自定义)' },
      { name: 'message', type: 'String', default: '""', desc: '提示文本内容' },
      { name: 'position', type: 'enum', default: 'MIDDLE', desc: '提示显示位置：TOP, MIDDLE, BOTTOM' },
      { name: 'duration', type: 'float', default: '2.0', desc: '展示时长 (秒)，设置为 0 时不自动关闭' },
      { name: 'forbid_click', type: 'boolean', default: 'false', desc: '是否启用透明遮罩禁止背景点击穿透' }
    ],
    events: [],
    methods: [
      { name: 'show(message, duration=2.0, position=MIDDLE)', desc: '弹出文字提示', params: '(message: String, duration: float, position: int) -> GToast' },
      { name: 'success(message, duration=2.0)', desc: '弹出成功状态提示 (带对勾图标)', params: '(message: String, duration: float) -> GToast' },
      { name: 'fail(message, duration=2.0)', desc: '弹出失败状态提示 (带叉号图标)', params: '(message: String, duration: float) -> GToast' },
      { name: 'loading(message="加载中...", forbid_click=true, duration=0.0)', desc: '弹出加载中转圈提示', params: '(message: String, forbid_click: bool, duration: float) -> GToast' },
      { name: 'custom(options: Dictionary)', desc: '使用完整配置字典弹出轻提示', params: '(options: Dictionary) -> GToast' },
      { name: 'set_message(new_msg: String)', desc: '动态更新当前正在展示的轻提示文本 (如倒计时)', params: '(new_msg: String) -> GToast' },
      { name: 'clear()', desc: '一键清除并关闭当前所有正在展示的轻提示', params: '() -> void' }
    ],
    slots: [
      { name: 'default', desc: 'Toast 提示正文内容插槽', child: 'Label / RichTextLabel', example: '<template #default><span>获得成就：初出茅庐 🎖️</span></template>' },
      { name: 'icon', desc: '自定义 Toast 图标或 Loading 动画插槽', child: 'GIcon / TextureRect / GLoading', example: '<template #icon><GIcon name="medal" /></template>' }
    ]
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
      { name: 'default', desc: '提示内容正文插槽', child: 'Label / RichTextLabel', example: '<template #default><span>核心渲染节点已就绪，耗时 12ms。</span></template>' },
      { name: 'title', desc: '提示标题插槽', child: 'GText / Label', example: '<template #title><b>初始化成功</b></template>' },
      { name: 'icon', desc: '自定义前置状态图标插槽', child: 'GIcon / TextureRect', example: '<template #icon><GIcon name="circle-info" /></template>' },
      { name: 'close', desc: '自定义右上角关闭按钮插槽', child: 'GButton / GIcon', example: '<template #close><GIcon name="xmark" /></template>' },
      { name: 'action', desc: '提示右侧/底部快捷操作项插槽', child: 'GButton / HBoxContainer', example: '<template #action><GButton size="small">查看详情</GButton></template>' }
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
      },
      {
        title: '2. 插槽自定义抽屉 (Custom Slots: #header / #default / #footer)',
        render: `
          <div style="display:flex; gap:12px;">
            <button class="g-btn g-btn-success" onclick="
              openDrawer('right');
              showToast('已打开内嵌道具背包插槽的抽屉面板', 'success');
            ">
              <i class="fa-solid fa-box-archive"></i> 打开道具背包自定义抽屉
            </button>
          </div>
        `,
        code: `<!-- 方式 1: Vue 3 模板抽屉多插槽定制 (Vue Template Slots) -->
<GDrawer v-model:open="showInventory" placement="right" size="400">
  <!-- #header 自定义标题栏插槽 -->
  <template #header>
    <div style="display:flex; align-items:center; gap:8px;">
      <i class="fa-solid fa-backpack"></i>
      <span>冒险者背包 (28/50)</span>
    </div>
  </template>

  <!-- #default 抽屉正文插槽 (承载网格列表与装备描述) -->
  <template #default>
    <ScrollContainer>
      <div class="inventory-grid">
        <!-- 动态背包网格卡片 -->
      </div>
    </ScrollContainer>
  </template>

  <!-- #footer 抽屉底部操作插槽 -->
  <template #footer>
    <GButton @click="sortInventory">一键整理</GButton>
    <GButton type="primary" @click="saveInventory">保存并关闭</GButton>
  </template>
</GDrawer>

# 方式 2: GDScript 代码组装挂载抽屉插槽
var drawer = GDrawer.new()
drawer.placement = GDrawer.Placement.RIGHT
drawer.set_header(custom_header_hbox)
drawer.set_content(inventory_scroll_container)
drawer.set_footer(action_buttons_space)
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
      { name: 'default', desc: '抽屉主体内容插槽', child: 'Control / ScrollContainer', example: '<template #default><ScrollContainer><VBoxContainer>...</VBoxContainer></ScrollContainer></template>' },
      { name: 'header', desc: '抽屉顶部标题区插槽', child: 'HBoxContainer / GText', example: '<template #header><h3>全局游戏设置</h3></template>' },
      { name: 'footer', desc: '抽屉底部操作栏插槽', child: 'HBoxContainer / GSpace', example: '<template #footer><GButton type="primary">保存配置</GButton></template>' }
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
      { name: 'default', desc: '触发提示的宿主目标节点插槽', child: 'GButton / Control', example: '<template #default><GButton icon="circle-question">帮助</GButton></template>' },
      { name: 'content', desc: '提示内部自定义内容/富文本插槽', child: 'Control / Label', example: '<template #content><RichTextLabel text="[b]神话属性[/b]: 全体攻击力 +20%" /></template>' }
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
    slots: [
      { name: 'default', desc: '被加载遮罩包裹的主体业务节点插槽', child: 'Control', example: '<template #default><div class="game-data-table">...</div></template>' },
      { name: 'spinner', desc: '自定义 Loading 旋转图标或序列帧动画插槽', child: 'GIcon / TextureRect', example: '<template #spinner><GIcon name="spinner" class="fa-spin" /></template>' },
      { name: 'description', desc: '加载提示文本插槽', child: 'Label / GText', example: '<template #description>正在连接游戏服务器，请稍候...</template>' }
    ]
  },

  // --------------------------------------------------------
  // 19.1 GSkeleton 骨架屏 (Vant UI 对标)
  // --------------------------------------------------------
  'skeleton': {
    title: 'Skeleton 骨架屏 (GSkeleton)',
    desc: '在页面数据加载完成前，先展示出页面的大致结构与占位图，常用于首屏加载、列表拉取等场景，大幅减少用户等待焦虑。深度对标 Vant UI Skeleton 规范，支持头像、标题、多行段落与流光扫光动效。',
    demos: [
      {
        title: '1. 基础用法 (Basic Skeleton: Title + 3 Rows)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:8px; border:1px solid var(--border-base); width:100%; max-width:480px;">
            <div class="g-skeleton-box">
              <div class="g-skeleton-content">
                <div class="g-skeleton-title g-skeleton-animate"></div>
                <div class="g-skeleton-row g-skeleton-animate" style="width:100%;"></div>
                <div class="g-skeleton-row g-skeleton-animate" style="width:100%;"></div>
                <div class="g-skeleton-row g-skeleton-animate" style="width:60%;"></div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 基础骨架屏
var skeleton = GSkeleton.new()
skeleton.show_title = true
skeleton.rows = 3
skeleton.row_width = [100.0, 100.0, 60.0]
skeleton.animate = true
add_child(skeleton)`
      },
      {
        title: '2. 显示头像与形状切换 (Avatar Shape: Round / Square)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:8px; border:1px solid var(--border-base); width:100%; max-width:480px;">
            <div class="g-skeleton-box">
              <div class="g-skeleton-avatar g-skeleton-avatar-round g-skeleton-animate" style="width:44px; height:44px;"></div>
              <div class="g-skeleton-content">
                <div class="g-skeleton-title g-skeleton-animate" style="width:50%;"></div>
                <div class="g-skeleton-row g-skeleton-animate" style="width:100%;"></div>
                <div class="g-skeleton-row g-skeleton-animate" style="width:80%;"></div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 带头像骨架屏
var skeleton = GSkeleton.new()
skeleton.avatar = true
skeleton.avatar_shape = GSkeleton.AvatarShape.ROUND
skeleton.avatar_size = 44.0
add_child(skeleton)`
      },
      {
        title: '3. 动态加载切换 (Loading Switch / Content Slot)',
        render: `
          <div id="demoSkeletonToggle" style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:480px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; color:var(--text-secondary);">切换 loading 状态：</span>
              <label class="g-switch"><input type="checkbox" checked onchange="toggleSkeletonLoading('demoSkeletonToggle')"><span class="g-switch-slider"></span></label>
            </div>
            <div style="background:var(--bg-surface); padding:20px; border-radius:8px; border:1px solid var(--border-base);">
              <div class="demo-skeleton-box g-skeleton-box">
                <div class="g-skeleton-avatar g-skeleton-avatar-round g-skeleton-animate" style="width:48px; height:48px;"></div>
                <div class="g-skeleton-content">
                  <div class="g-skeleton-title g-skeleton-animate" style="width:40%;"></div>
                  <div class="g-skeleton-row g-skeleton-animate" style="width:100%;"></div>
                  <div class="g-skeleton-row g-skeleton-animate" style="width:70%;"></div>
                </div>
              </div>
              <div class="demo-skeleton-real-content" style="display:none;">
                <div style="display:flex; gap:14px; align-items:center;">
                  <div style="width:48px; height:48px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; font-size:24px; color:#fff;">🧙‍♂️</div>
                  <div>
                    <div style="font-weight:700; color:var(--text-primary); font-size:15px;">大魔导师·卡德加 (Lv.99)</div>
                    <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">法力值: 18,500 / 18,500 | 达拉然六人议会领袖</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 动态切换加载与真实内容
var skeleton = GSkeleton.new()
skeleton.avatar = true
skeleton.set_content(real_hero_card)

# 数据加载完成时
skeleton.loading = false`
      }
    ],
    props: [
      { name: 'loading', type: 'boolean', default: 'true', desc: '是否显示骨架屏，为 false 时自动展示子内容插槽' },
      { name: 'avatar', type: 'boolean', default: 'false', desc: '是否显示左侧头像占位图' },
      { name: 'avatar_shape', type: 'enum', default: 'ROUND', desc: '头像占位图形状：ROUND (圆形), SQUARE (方形)' },
      { name: 'avatar_size', type: 'float', default: '40.0', desc: '头像占位图大小 (像素)' },
      { name: 'show_title', type: 'boolean', default: 'true', desc: '是否显示标题占位条' },
      { name: 'title_width', type: 'float', default: '40.0', desc: '标题占位宽度 (百分比 %)' },
      { name: 'rows', type: 'int', default: '3', desc: '段落占位行数' },
      { name: 'row_width', type: 'Array[float]', default: '[100.0, 100.0, 60.0]', desc: '各行段落占位宽度数组 (百分比 %)' },
      { name: 'animate', type: 'boolean', default: 'true', desc: '是否开启波浪扫光流动动画效果' }
    ],
    events: [
      { name: 'loading_changed(is_loading)', desc: '加载状态发生改变时触发', params: '(is_loading: bool)' }
    ],
    methods: [
      { name: 'set_loading(val: bool)', desc: '程序化设置骨架屏加载状态', params: '(val: bool) -> void' },
      { name: 'set_content(node: Control)', desc: '绑定数据加载完成后显示的真实内容控件', params: '(node: Control) -> void' }
    ],
    slots: [
      { name: 'default', desc: '加载完成（loading = false）后展示的真实业务组件插槽', child: 'Control', example: '<template #default><HeroCard :hero="heroData" /></template>' },
      { name: 'template', desc: '自定义骨架占位模版结构插槽', child: 'VBoxContainer / Array[Control]', example: '<template #template><div class="my-custom-skeleton"></div></template>' }
    ]
  },

  // --------------------------------------------------------
  // 19.2 GTour 漫游式引导 (Element Plus 对标)
  // --------------------------------------------------------
  'tour': {
    title: 'Tour 漫游式引导 (GTour)',
    desc: '分步引导用户了解新功能或界面布局。深度对标 Element Plus Tour 规范，提供全屏镂空暗色遮罩、气泡指示卡片与分步上一步/下一步。',
    demos: [
      {
        title: '1. 触发新手引导流程 (Trigger Onboarding Tour)',
        render: `
          <div style="display:flex; gap:12px; align-items:center;">
            <button class="g-btn g-btn-primary" onclick="openSimTour()">🚀 启动系统漫游引导 (Start Tour)</button>
          </div>
        `,
        code: `# GDScript: 漫游式新手引导 (批量配置步骤)
var tour = GTour.new()
tour.add_steps([
    { "target": node_search, "title": "全局搜索", "description": "按 Ctrl+K 快速检索全部组件" },
    { "target": node_theme, "title": "主题切换", "description": "随时切换 4 大主题预设" },
    { "target": node_game, "title": "游戏实战", "description": "体验角色背包与商店模板" }
])
tour.start()`
      }
    ],
    props: [
      { name: 'steps', type: 'Array[Dictionary]', default: '[]', desc: '引导步骤数组 [{"target": NodePath, "title": "", "description": "", "placement": "BOTTOM"}]' },
      { name: 'current_step', type: 'int', default: '0', desc: '当前激活步骤索引 (从 0 开始)' },
      { name: 'mask', type: 'boolean', default: 'true', desc: '是否显示全屏半透明遮罩层' },
      { name: 'show_arrow', type: 'boolean', default: 'true', desc: '是否展示气泡定位小箭头' }
    ],
    events: [
      { name: 'step_change(current_step)', desc: '步骤发生切换时触发', params: '(current_step: int)' },
      { name: 'finish()', desc: '完成所有引导步骤时触发', params: '()' },
      { name: 'close()', desc: '用户中途关闭引导时触发', params: '()' }
    ],
    methods: [
      { name: 'add_step(step_dict: Dictionary)', desc: '动态追加单个漫游步骤', params: '(step_dict: Dictionary) -> void' },
      { name: 'add_steps(step_list: Array[Dictionary])', desc: '批量追加一组漫游步骤', params: '(step_list: Array[Dictionary]) -> void' },
      { name: 'start()', desc: '从第一步开始启动漫游引导', params: '() -> void' },
      { name: 'next()', desc: '前进至下一步', params: '() -> void' },
      { name: 'prev()', desc: '后退至上一步', params: '() -> void' },
      { name: 'close_tour()', desc: '关闭并退出漫游引导', params: '() -> void' }
    ],
    slots: [
      { name: 'default', desc: '自定义引导气泡内容区插槽（透传 { step, current, total }）', child: 'Control / VBoxContainer', example: '<template #default="{ step }"><h4>{{ step.title }}</h4><p>{{ step.desc }}</p></template>' },
      { name: 'indicators', desc: '自定义步骤指示器圆点插槽（透传 { current, total }）', child: 'HBoxContainer', example: '<template #indicators="{ current, total }"><span>第 {{ current + 1 }} / {{ total }} 步</span></template>' },
      { name: 'prev', desc: '自定义上一步按钮插槽', child: 'GButton', example: '<template #prev><GButton>上一步</GButton></template>' },
      { name: 'next', desc: '自定义下一步按钮插槽', child: 'GButton', example: '<template #next><GButton type="primary">下一步</GButton></template>' },
      { name: 'finish', desc: '自定义完成按钮插槽', child: 'GButton', example: '<template #finish><GButton type="success">开始冒险</GButton></template>' }
    ]
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
      { name: 'default', desc: '卡片主体内容插槽', child: 'Control / VBoxContainer', example: '<template #default><p>跨服巅峰赛小组赛第一轮战报</p></template>' },
      { name: 'header', desc: '卡片标题区插槽', child: 'GText / Label / HBoxContainer', example: '<template #header><span>战术小队战报</span></template>' },
      { name: 'extra', desc: '卡片右上角操作区插槽（如“更多”、“编辑”等按钮）', child: 'GButton / GSpace', example: '<template #extra><a href="javascript:void(0)">查看全部 →</a></template>' },
      { name: 'cover', desc: '卡片顶部封面图片/媒体插槽', child: 'TextureRect / SubViewportContainer', example: '<template #cover><img src="res://cover_s4.png" /></template>' },
      { name: 'footer', desc: '卡片底部操作栏插槽', child: 'HBoxContainer / GSpace', example: '<template #footer><GButton icon="share">分享战报</GButton></template>' }
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
    slots: [
      { name: 'default', desc: '标签内部文字或内容插槽', child: 'Label / Control', example: '<template #default>Godot 4.3 渲染引擎</template>' },
      { name: 'icon', desc: '标签前置图标插槽', child: 'GIcon / TextureRect', example: '<template #icon><GIcon name="fire" /></template>' },
      { name: 'close-icon', desc: '自定义可关闭标签的关闭按钮插槽', child: 'GIcon / GButton', example: '<template #close-icon><GIcon name="xmark" /></template>' }
    ]
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
      { name: 'default', desc: '徽标所依附的主体节点插槽', child: 'GButton / GAvatar / GIcon / Control', example: '<template #default><GButton icon="bell">通知中心</GButton></template>' },
      { name: 'content', desc: '自定义角标内部内容插槽（替代纯数字）', child: 'GIcon / Label', example: '<template #content><GIcon name="fire" style="color:yellow;" /></template>' }
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
    slots: [
      { name: 'default', desc: '自定义头像内部文字或自定义图像节点插槽', child: 'Label / TextureRect', example: '<template #default><span>K</span></template>' },
      { name: 'badge', desc: '头像角标（如在线状态小绿点、等级徽章）插槽', child: 'GBadge / Control', example: '<template #badge><span class="online-status-dot"></span></template>' }
    ]
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
    slots: [
      { name: 'default', desc: '自定义进度条内部/右侧进度文字渲染插槽（透传 { percentage }）', child: 'Label / GText', example: '<template #default="{ percentage }"><span>{{ percentage }}% 已下载</span></template>' }
    ]
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
        code: `# GDScript 方式 1: 单项链式添加
var tabs = GTabs.new()
tabs.add_tab("User", user_panel)
tabs.add_tab("Config", config_panel)
tabs.add_tab("Role", role_panel)
tabs.add_tab("Task", task_panel)

# GDScript 方式 2: 批量数组添加 (Batch Array)
tabs.add_tabs([
    { "name": "User", "panel": user_panel },
    { "name": "Config", "panel": config_panel },
    { "name": "Role", "panel": role_panel, "closable": true },
    { "name": "Task", "panel": task_panel }
])
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
      { name: 'tab_clicked(index, name)', desc: '点击选中某个选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_changed(index, name)', desc: '当前激活选项卡发生改变时触发', params: '(index: int, name: String)' },
      { name: 'tab_added(index, name)', desc: '动态添加新选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_removed(index, name)', desc: '选项卡被移除销毁时触发', params: '(index: int, name: String)' },
      { name: 'tab_close_requested(index, name)', desc: '用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)', params: '(index: int, name: String)' }
    ],
    methods: [
      { name: 'add_tab(name, panel, closable=false, icon=null)', desc: '动态追加一个选项卡及关联内容面板', params: '(name: String, panel: Control, closable: bool, icon: Texture2D) -> int' },
      { name: 'add_tabs(tab_list: Array[Dictionary])', desc: '批量追加一组选项卡 [{"name": "", "panel": Control, "closable": false}]', params: '(tab_list: Array[Dictionary]) -> void' },
      { name: 'insert_tab(index, name, panel, closable=false, icon=null)', desc: '在指定索引位置插入一个选项卡', params: '(index: int, name: String, panel: Control, closable: bool, icon: Texture2D) -> void' },
      { name: 'remove_tab(index_or_name)', desc: '根据索引或标题名称移除指定选项卡', params: '(index_or_name: Variant) -> void' },
      { name: 'clear_tabs()', desc: '清空并销毁所有选项卡及关联面板', params: '() -> void' },
      { name: 'get_tab_count()', desc: '获取当前选项卡总数量', params: '() -> int' },
      { name: 'get_tab_name(index)', desc: '获取指定索引的选项卡标题文本', params: '(index: int) -> String' },
      { name: 'set_tab_title(index, new_title)', desc: '动态修改指定选项卡的标题文本', params: '(index: int, new_title: String) -> void' },
      { name: 'get_tab_panel(index)', desc: '获取指定索引绑定的内容面板 Control 节点', params: '(index: int) -> Control' },
      { name: 'set_tab_disabled(index, is_disabled)', desc: '设置指定选项卡是否禁用点击切换', params: '(index: int, is_disabled: bool) -> void' },
      { name: 'is_tab_disabled(index)', desc: '查询指定选项卡当前是否处于禁用状态', params: '(index: int) -> bool' },
      { name: 'set_tab_icon(index, icon)', desc: '为指定选项卡动态设置图标纹理', params: '(index: int, icon: Texture2D) -> void' },
      { name: 'find_tab_by_name(name)', desc: '根据标题名称反查选项卡的索引位置 (-1 为未找到)', params: '(name: String) -> int' },
      { name: 'next_tab()', desc: '程序化切换至下一个标签页 (循环)', params: '() -> void' },
      { name: 'prev_tab()', desc: '程序化切换至上一个标签页 (循环)', params: '() -> void' },
      { name: 'set_before_leave(callback)', desc: '设置标签切换拦截钩子函数 Callable(cur, next) -> bool', params: '(callback: Callable) -> void' }
    ],
    slots: [
      { name: 'default', desc: '标签页内容面板插槽（包含所有 Tab 面板）', child: 'Array[Control]', example: '<template #default><GTabPane label="背包">...</GTabPane></template>' },
      { name: 'tab', desc: '自定义 Tab 头部标签按钮插槽（透传 { tab_name, active, index }）', child: 'HBoxContainer / GIcon / GText', example: '<template #tab="{ name }"><GIcon name="box" /> <span>{{ name }}</span></template>' },
      { name: 'prefix', desc: 'Tab 栏最左侧附加控件插槽', child: 'Control / GIcon', example: '<template #prefix><GIcon name="bars" /></template>' },
      { name: 'suffix', desc: 'Tab 栏最右侧附加操作按钮插槽（如“+ 新增Tab”）', child: 'GButton / GSpace', example: '<template #suffix><GButton icon="plus" size="small" /></template>' }
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
      { name: 'default', desc: '折叠面板展开后的主体内容插槽', child: 'Control / VBoxContainer', example: '<template #default><div>画质等级: 超高 / 60FPS / 动态光影</div></template>' },
      { name: 'title', desc: '自定义折叠面板标题栏插槽（透传 { is_expanded }）', child: 'HBoxContainer / GText', example: '<template #title="{ is_expanded }"><span>高级图形渲染设置</span></template>' },
      { name: 'extra', desc: '折叠面板标题栏右侧操作项插槽', child: 'GButton / GTag', example: '<template #extra><GTag type="success">推荐配置</GTag></template>' },
      { name: 'arrow', desc: '自定义展开/折叠箭头指示图标插槽（透传 { is_expanded }）', child: 'GIcon / TextureRect', example: '<template #arrow="{ is_expanded }"><GIcon :name="is_expanded ? \'angle-up\' : \'angle-down\'" /></template>' }
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
        code: `# GDScript 方式 1: 批量配置步骤名称
var st = GSteps.new()
st.add_steps(["角色创建", "技能配置", "进入世界"])

# GDScript 方式 2: 单步动态追加
st.add_step("探索副本")
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
      { name: 'add_step(title: String)', desc: '动态追加单个步骤', params: '(title: String) -> void' },
      { name: 'add_steps(step_list: Array)', desc: '批量设置/追加步骤列表 ["步骤1", "步骤2"]', params: '(step_list: Array) -> void' },
      { name: 'next()', desc: '前进至下一步', params: '() -> void' },
      { name: 'prev()', desc: '返回上一步', params: '() -> void' },
      { name: 'set_step(index: int)', desc: '直接跳转到指定步骤', params: '(index: int) -> void' }
    ],
    slots: [
      { name: 'icon', desc: '自定义步骤节点图标插槽（透传 { index, status }）', child: 'GIcon / TextureRect', example: '<template #icon="{ index }"><GIcon name="circle-check" /></template>' },
      { name: 'title', desc: '自定义步骤标题插槽（透传 { index, title }）', child: 'GText / Label', example: '<template #title="{ index, title }"><span>步骤 {{ index + 1 }}: {{ title }}</span></template>' },
      { name: 'description', desc: '自定义步骤详细描述插槽（透传 { index, desc }）', child: 'Label / Control', example: '<template #description="{ desc }"><small>{{ desc }}</small></template>' }
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
      { name: 'default', desc: '间距容器内所有自动排列的子节点插槽', child: 'Array[Control]', example: '<template #default><GButton>选项A</GButton><GButton>选项B</GButton></template>' },
      { name: 'split', desc: '子元素之间的自定义分隔符插槽', child: 'GDivider / Control', example: '<template #split><GDivider vertical /></template>' }
    ]
  }
};

// =========================================================================
// 所有组件通用的 Control / Node 基类继承方法 (Universal Common Methods)
// =========================================================================
window.COMMON_CONTROL_METHODS = [
  { name: 'show() / hide()', desc: '显式显示或隐藏当前控件', params: '() -> void' },
  { name: 'set_visible(visible)', desc: '动态控制控件的可见性', params: '(visible: bool) -> void' },
  { name: 'is_visible_in_tree()', desc: '查询当前控件在场景树中是否全局可见', params: '() -> bool' },
  { name: 'grab_focus()', desc: '使控件获取键盘/手柄交互焦点', params: '() -> void' },
  { name: 'release_focus()', desc: '主动释放当前焦点', params: '() -> void' },
  { name: 'has_focus()', desc: '查询控件当前是否正处于聚焦状态', params: '() -> bool' },
  { name: 'set_size(size) / get_size()', desc: '设置或读取控件的实际像素宽高尺寸', params: '(size: Vector2) -> void / Vector2' },
  { name: 'set_position(pos) / get_position()', desc: '设置或读取控件的相对局部坐标位置', params: '(pos: Vector2) -> void / Vector2' },
  { name: 'set_tooltip_text(text)', desc: '动态设置鼠标悬停提示气泡文本', params: '(text: String) -> void' },
  { name: 'queue_free()', desc: '在当前帧末安全销毁并释放节点内存', params: '() -> void' },
  { name: 'connect(signal_name, callable)', desc: '订阅并绑定信号至指定回调函数', params: '(signal_name: StringName, callable: Callable) -> Error' },
  { name: 'emit_signal(signal_name, ...)', desc: '手动发射自定义信号与携带参数', params: '(signal_name: StringName, ...) -> Error' },
  { name: 'add_theme_color_override(name, color)', desc: '动态覆盖控件的主题文字/边框颜色', params: '(name: StringName, color: Color) -> void' },
  { name: 'add_theme_stylebox_override(name, stylebox)', desc: '动态覆盖控件的主题背景样式盒 StyleBox', params: '(name: StringName, stylebox: StyleBox) -> void' }
];

// Merge into global DOCS
if (typeof DOCS !== 'undefined') {
  Object.assign(DOCS, window.COMPONENT_CATALOG);
}
