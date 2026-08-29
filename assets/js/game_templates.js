// =========================================================================
// Gotod Components UI - Guide & Game UI Templates Catalog
// 1. 指南系统 (Guide & Installation)
// 3. 游戏实战案例 (Game UI Templates using Gotod Components)
// =========================================================================

window.GUIDE_CATALOG = {
  'guide-install': {
    title: '📥 安装与快速上手 (Installation & Quick Start)',
    desc: '了解如何在 Godot 4.x (4.6+) 引擎项目中引入 gotod-components-ui 并快速开始构建游戏界面。',
    demos: [
      {
        title: 'Step 1: 复制插件目录至项目 addons/',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
            <p style="color:var(--text-primary); margin-bottom:10px;">将 <code>addons/gotod_ui</code> 文件夹复制到您的 Godot 4 项目根目录下的 <code>res://addons/</code> 中：</p>
            <div class="code-box" style="margin:0;"><pre><code>your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 全部 28+ 个 UI 组件
│       ├── theme/         # 主题 Token 与样式盒引擎
│       ├── plugin.cfg     # 插件配置文件
│       └── plugin.gd      # 节点注册脚本
└── project.godot</code></pre></div>
          </div>
        `,
        code: `# Git 仓库克隆方式
git clone https://github.com/mhxy13867806343/gotod-components-ui.git`
      },
      {
        title: 'Step 2: 在 Godot 项目设置中启用插件',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>1. 打开 Godot 4 编辑器，点击顶部菜单 <strong>Project (项目) -> Project Settings (项目设置)</strong>。</p>
            <p>2. 切换到 <strong>Plugins (插件)</strong> 标签页。</p>
            <p>3. 找到 <code>gotod-components-ui</code> 并勾选 <strong>Enable (启用)</strong> 复选框。</p>
            <p>4. 启用后，编辑器节点列表中将自动出现 <code>GButton</code>、<code>GInput</code>、<code>GDialog</code>、<code>GTabs</code> 等全套自定义控件。</p>
          </div>
        `,
        code: `# 插件启用后，在任何脚本中均可直接实例化组件
var btn = GButton.new()
btn.text = "Hello Godot 4"
btn.button_type = GButton.ButtonType.PRIMARY
add_child(btn)`
      }
    ]
  },

  'guide-common-methods': {
    title: '🛠️ 全局通用基类方法与事件 (Universal Control Methods)',
    desc: '所有 Gotod UI 组件（GButton, GInput, GTabs, GDialog 等）均继承自 Godot 4 的 Control / Node 基类，因此天然具备以下完整的全局通用方法、生命周期销毁与信号订阅能力。',
    demos: [
      {
        title: '通用基类方法调用示例 (GDScript Common Usage)',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p style="color:var(--text-primary); margin-bottom:8px;">在任何 UI 脚本中，您都可以直接调用这些原生继承的通用 API：</p>
            <div class="code-box" style="margin:0;"><pre><code># 1. 显式显示与隐藏
my_component.show()
my_component.hide()
my_component.set_visible(true)

# 2. 焦点获取与判断
my_component.grab_focus()
if my_component.has_focus():
    print("处于激活交互状态")

# 3. 动态重设尺寸与位置
my_component.set_size(Vector2(240, 48))
my_component.set_position(Vector2(100, 200))

# 4. 动态设置提示气泡
my_component.set_tooltip_text("点击保存当前装备数据")

# 5. 信号连接与自定义发射
my_component.connect("custom_event", Callable(self, "_on_custom_event"))
my_component.emit_signal("custom_event", "arg1", 123)

# 6. 安全销毁
my_component.queue_free()</code></pre></div>
          </div>
        `,
        code: `# GDScript: Universal Control API
var btn = GButton.new()
btn.text = "Universal Control"
btn.grab_focus()
btn.set_tooltip_text("悬浮提示文字")
add_child(btn)`
      }
    ],
    props: [],
    methods: [
      { name: 'show() / hide()', desc: '显式显示或隐藏当前控件节点', params: '() -> void' },
      { name: 'set_visible(visible: bool)', desc: '动态控制控件的可见性', params: '(visible: bool) -> void' },
      { name: 'is_visible_in_tree()', desc: '查询当前控件在场景树中是否全局可见', params: '() -> bool' },
      { name: 'grab_focus()', desc: '使控件获取键盘/手柄交互焦点', params: '() -> void' },
      { name: 'release_focus()', desc: '主动释放当前焦点', params: '() -> void' },
      { name: 'has_focus()', desc: '查询控件当前是否正处于聚焦状态', params: '() -> bool' },
      { name: 'set_size(size: Vector2)', desc: '设置控件的实际像素宽高尺寸', params: '(size: Vector2) -> void' },
      { name: 'get_size()', desc: '读取控件的实际像素宽高尺寸', params: '() -> Vector2' },
      { name: 'set_position(pos: Vector2)', desc: '设置控件的相对局部坐标位置', params: '(pos: Vector2) -> void' },
      { name: 'get_position()', desc: '读取控件的相对局部坐标位置', params: '() -> Vector2' },
      { name: 'set_tooltip_text(text: String)', desc: '动态设置鼠标悬停提示气泡文本', params: '(text: String) -> void' },
      { name: 'queue_free()', desc: '在当前帧末安全销毁并释放节点内存', params: '() -> void' },
      { name: 'connect(signal_name, callable)', desc: '订阅并绑定信号至指定回调函数', params: '(signal_name: StringName, callable: Callable) -> Error' },
      { name: 'emit_signal(signal_name, ...)', desc: '手动发射自定义信号与携带参数', params: '(signal_name: StringName, ...) -> Error' },
      { name: 'add_theme_color_override(name, color)', desc: '动态覆盖控件的主题文字/边框颜色', params: '(name: StringName, color: Color) -> void' },
      { name: 'add_theme_stylebox_override(name, stylebox)', desc: '动态覆盖控件的主题背景样式盒 StyleBox', params: '(name: StringName, stylebox: StyleBox) -> void' }
    ]
  },

  'guide-dynamic-api': {
    title: '🧩 GTabs.new() 外部方法与自定义信号 (Dynamic Scripting & Signals)',
    desc: '通过代码动态创建 GTabs.new() 并调用外部 API 进行增删查改、拦截判断以及订阅自定义信号。',
    demos: [
      {
        title: 'GTabs.new() 完整代码动态构建示例',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p style="color:var(--text-primary); margin-bottom:8px;">以下是在 GDScript 中通过纯代码动态构建选项卡界面的完整流程：</p>
            <div class="code-box" style="margin:0;"><pre><code># 1. 实例化 GTabs
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.closable = true
tabs.addable = true

# 2. 动态添加标签页与内容面板
var p1 = PanelContainer.new()
var p2 = PanelContainer.new()
tabs.add_tab("角色属性", p1, false)
tabs.add_tab("背包物品", p2, true)

# 3. 订阅自定义信号
tabs.tab_clicked.connect(func(idx, name):
    print("点击了标签:", idx, name)
)
tabs.tab_changed.connect(func(idx, name):
    print("当前激活标签切换为:", name)
)
tabs.tab_close_requested.connect(func(idx, name):
    print("请求关闭标签:", name)
    # 可在此弹出 GDialog 确认框二次确认
)
tabs.tab_added.connect(func(idx, name):
    print("新增了标签:", name)
)

# 4. 标签切换前拦截 (Before Leave Hook)
tabs.set_before_leave(func(cur_idx, next_idx) -> bool:
    if is_form_dirty:
        GMessage.warning("表单未保存，无法离开当前标签！")
        return false
    return true
)

# 5. 添加到场景树
add_child(tabs)</code></pre></div>
          </div>
        `,
        code: `# GDScript: GTabs.new()
var tabs = GTabs.new()
tabs.add_tab("Tab 1", panel1)
tabs.add_tab("Tab 2", panel2)
tabs.tab_changed.connect(func(idx, name): print(name))
add_child(tabs)`
      }
    ],
    events: [
      { name: 'tab_clicked(index, name)', desc: '用户点击选中某个选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_changed(index, name)', desc: '当前激活选项卡发生改变时触发', params: '(index: int, name: String)' },
      { name: 'tab_added(index, name)', desc: '动态添加新选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_removed(index, name)', desc: '选项卡被移除销毁时触发', params: '(index: int, name: String)' },
      { name: 'tab_close_requested(index, name)', desc: '用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)', params: '(index: int, name: String)' }
    ],
    methods: [
      { name: 'add_tab(name, panel, closable=false, icon=null)', desc: '动态追加一个选项卡及关联内容面板', params: '(name: String, panel: Control, closable: bool, icon: Texture2D) -> int' },
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
      { name: 'next_tab() / prev_tab()', desc: '程序化前进/后退循环切换激活标签', params: '() -> void' },
      { name: 'set_before_leave(callback)', desc: '设置标签切换拦截钩子函数 Callable(cur, next) -> bool', params: '(callback: Callable) -> void' }
    ]
  },

  'guide-theme': {
    title: '🎨 主题 Token 与暗黑模式 (Design Tokens & Theming)',
    desc: '深度集成 Vue 主流组件库的设计 Token 系统，支持 Naive UI、Element Plus、Ant Design、Vant UI 风格以及 Dark/Light 明暗模式一键切换。',
    demos: [
      {
        title: '运行时动态切换设计主题',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:480px;">
            <p style="color:var(--text-secondary);">通过单例 <code>GotodTheme</code> 可在游戏运行时无缝切换整套色彩与圆角体系：</p>
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="changePreset('naive')">Naive UI (Green)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('element')">Element Plus (Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('ant')">Ant Design (Geek Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('vant')">Vant UI (Mobile)</button>
            </div>
          </div>
        `,
        code: `# GDScript: 动态换肤
# 切换为 Element Plus 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ELEMENT_PLUS)

# 切换为 Ant Design 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ANT_DESIGN)

# 切换明亮模式
GotodTheme.set_dark_mode(false)`
      }
    ]
  },

  'guide-autoload': {
    title: '⚙️ Autoload 全局服务配置 (GMessage / GotodTheme)',
    desc: '单例服务用于全局悬浮 Toast 消息提示与主题状态同步。',
    demos: [
      {
        title: '配置项目 Autoload 自动加载单例',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>在 <code>project.godot</code> 的 <code>[autoload]</code> 中注册全局单例：</p>
            <div class="code-box" style="margin:0;"><pre><code>[autoload]
GotodTheme="*res://addons/gotod_ui/theme/gotod_theme.gd"
GMessage="*res://addons/gotod_ui/components/feedback/g_message.gd"</code></pre></div>
          </div>
        `,
        code: `# 在任何 GDScript 业务脚本中随时随地调用：
GMessage.success("任务完成！获得金币 +100")
GMessage.error("网络连接断开")`
      }
    ]
  },

  'guide-treeshaking': {
    title: '📦 生产环境按需打包与摇树优化 (Tree-Shaking & Export Plugin)',
    desc: '开发环境支持随意调用全部 28+ 个组件；在项目生产环境发布导出 (Project -> Export) 时，EditorExportPlugin 会自动静态分析项目中所有 .tscn 和 .gd，未被使用的组件会自动被 skip() 排除出最终安装包，大幅减小游戏包体体积！',
    demos: [
      {
        title: '生产环境摇树依赖分析与自动剔除模拟器 (Tree-Shaking Live Analyzer)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            <div class="sim-card" style="width:100%;">
              <div class="sim-card-header">
                <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 项目场景组件引用模拟扫描器 (Dependency Scanner)</span>
                <span class="g-tag g-tag-success" id="shakerOptimizeTag">包体优化率: 82.1%</span>
              </div>
              <div style="padding:14px; background:var(--bg-surface); border-radius:var(--radius); margin-top:12px;">
                <p style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">勾选您在游戏中实际用到的组件，模拟导出时的按需过滤：</p>
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-size:12px;" id="shakerCheckGrid">
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GButton (按钮)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GInput (输入框)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GTabs (选项卡)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GDialog (弹窗)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GProgress (进度条)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCard (卡片)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSelect (下拉框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSlider (滑块)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSwitch (开关)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GDrawer (抽屉)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSteps (步骤条)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCollapse (折叠面板)</label>
                </div>
              </div>

              <!-- Output Statistics -->
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:14px;">
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--text-secondary);">开发环境全量组件</div>
                  <div style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-top:2px;">28 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--primary);">生产实际打包组件</div>
                  <div id="shakerUsedCount" style="font-size:1.4rem; font-weight:700; color:var(--primary); margin-top:2px;">5 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--danger);">自动 skip() 剔除组件</div>
                  <div id="shakerUnusedCount" style="font-size:1.4rem; font-weight:700; color:var(--danger); margin-top:2px;">23 个</div>
                </div>
              </div>

              <!-- Godot Console Output Simulation -->
              <div style="margin-top:14px; padding:10px 14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); font-family:var(--font-mono); font-size:11px; color:#cfd0d8;">
                <div style="color:var(--primary); font-weight:700; margin-bottom:4px;">[Godot 4 EditorExportPlugin 导出日志]:</div>
                <div id="shakerLogText" style="line-height:1.6; color:#a0a5ad;">
                  [GotodUI Tree-Shaker] 扫描完成: 实际打包 5 个组件，自动剔除 23 个未引用组件 (GCard, GSelect, GSlider, GSwitch, GDrawer, GSteps, GCollapse...)。
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# Godot 4 生产环境自动运行的 EditorExportPlugin 核心逻辑:
# addons/gotod_ui/export/gotod_export_plugin.gd
class_name GotodExportPlugin
extends EditorExportPlugin

func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int) -> void:
    # 扫描项目所有场景依赖
    var result = GotodTreeShaker.analyze_project_used_components()
    print("[GotodUI Tree-Shaker] 已使用组件: %d, 剔除未引用: %d" % [result.used_count, result.unused_count])

func _export_file(file_path: String, type: String, features: PackedStringArray) -> void:
    # 未被任何场景引用的组件脚本直接调用 skip() 排除出导出包
    if file_path in _unused_script_paths:
        skip()`
      }
    ]
  }
};

window.GAME_CATALOG = {
  // ========================================================
  // 1. 角色属性与装备面板
  // ========================================================
  'game-character': {
    title: '👤 游戏角色属性与装备面板 (Character RPG Stats & Equipment)',
    desc: '使用 GCard、GAvatar、GTag、GProgress、GButton、GBadge 打造的标准 RPG 角色状态与装备管理面板。点击装备槽位可实时计算属性加成！',
    demos: [
      {
        title: 'Interactive RPG Character Sheet 角色状态面板',
        render: `
          <div style="display:flex; gap:24px; flex-wrap:wrap; width:100%;">
            <!-- Left: Character Card & Stats -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:48px; height:48px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700;">⚔️</div>
                  <div>
                    <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">影刃狂剑士 <span class="g-tag g-tag-primary" style="font-size:10px;">Lv.45</span></div>
                    <div style="font-size:0.82rem; color:var(--text-secondary);">职业：近战物理输出 · 暴击流派</div>
                  </div>
                </div>
              </div>
              
              <!-- HP & MP Bars -->
              <div style="margin-top:16px; display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>❤️ 生命值 (HP)</span>
                    <span style="font-weight:600; color:var(--danger);">3,850 / 3,850</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--danger);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>💧 魔法值 (MP)</span>
                    <span style="font-weight:600; color:var(--info);">1,240 / 1,240</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--info);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>⭐ 经验值 (EXP)</span>
                    <span style="font-weight:600; color:var(--warning);">82.5%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:82.5%; background:var(--warning);"></div></div>
                </div>
              </div>

              <!-- Base Attributes Table -->
              <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.88rem;">
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理攻击：</span>
                  <span id="statAtk" style="font-weight:700; color:var(--primary);">845</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理防御：</span>
                  <span id="statDef" style="font-weight:700; color:var(--primary);">420</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">暴击率：</span>
                  <span id="statCrit" style="font-weight:700; color:var(--warning);">48.5%</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">移动速度：</span>
                  <span style="font-weight:700; color:var(--info);">360</span>
                </div>
              </div>
            </div>

            <!-- Right: Equipment Slots -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <span>当前穿戴装备 (Equipment Slots)</span>
                <span class="g-tag g-tag-success" style="font-size:10px;">战斗力: 12,450</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
                <!-- Weapon Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); cursor:pointer;" onclick="showToast('主手武器：龙鳞弑神之刃 (+180 攻击力)', 'warning')">
                  <div style="font-size:11px; color:var(--warning); font-weight:600;">[主武器] SSR 传说</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🗡️ 龙鳞弑神剑 +12</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">攻击 +180 · 暴击 +15%</div>
                </div>
                <!-- Armor Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--info); border-radius:var(--radius); cursor:pointer;" onclick="showToast('身体防具：暗影斗篷 (+95 防御)', 'info')">
                  <div style="font-size:11px; color:var(--info); font-weight:600;">[防具] SR 史诗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🛡️ 暗影夜行斗篷</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">防御 +95 · 闪避 +8%</div>
                </div>
                <!-- Ring Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); cursor:pointer;" onclick="showToast('饰品：血魔指环 (+800 生命值)', 'danger')">
                  <div style="font-size:11px; color:var(--danger); font-weight:600;">[饰品] SSR 圣遗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">💍 鲜血狂怒之戒</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">生命 +800 · 吸血 +6%</div>
                </div>
                <!-- Boots Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--success); border-radius:var(--radius); cursor:pointer;" onclick="showToast('鞋子：风行者长靴 (+45 移速)', 'success')">
                  <div style="font-size:11px; color:var(--success); font-weight:600;">[鞋子] R 精良</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">👢 疾风掠影长靴</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">移速 +45 · 耐力 +20</div>
                </div>
              </div>
              <div style="margin-top:16px; display:flex; justify-content:flex-end; gap:10px;">
                <button class="g-btn g-btn-default" onclick="showToast('已脱下全部装备'); document.getElementById('statAtk').innerText='420';">一键卸装</button>
                <button class="g-btn g-btn-primary" onclick="showToast('已自动穿戴最高战力装备！', 'success'); document.getElementById('statAtk').innerText='845';">一键最佳配装</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 角色装备面板组件代码
class_name CharacterPanel
extends GCard

@onready var hp_bar = GProgress.new()
@onready var mp_bar = GProgress.new()
@onready var equip_grid = GridContainer.new()

func _ready() -> void:
    title = "角色状态"
    extra_text = "Lv.45"
    
    # 动态配置血条与蓝条
    hp_bar.status = GThemeTokens.Status.DANGER
    hp_bar.percentage = 100.0
    add_child(hp_bar)
    
    # 监听装备点击信号
    for item in equip_slots:
        item.pressed.connect(func(): _on_equip_clicked(item))`
      }
    ]
  },

  // ========================================================
  // 2. 背包与物品栏
  // ========================================================
  'game-inventory': {
    title: '🎒 游戏背包与物品栏系统 (Inventory & Item Grid)',
    desc: '使用 GTabs、GBadge、GDialog、GButton 组合实现的 4x5 物品背包，支持道具分类过滤（消耗品/装备/材料）、品质框高亮与点击使用弹窗。',
    demos: [
      {
        title: 'Interactive 20-Slot Item Grid 背包网格',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700; font-size:1.05rem;">冒险者背包 (Inventory)</span>
                <span class="g-tag g-tag-default" style="font-size:11px;">容量: <span id="invUsed">6</span> / 20</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; color:var(--warning); font-weight:700; font-size:0.95rem;">
                <span>🪙 84,250</span> 金币
              </div>
            </div>

            <!-- Item Type Filters -->
            <div style="display:flex; gap:12px; margin-top:12px; padding-bottom:12px; border-bottom:1px solid var(--border-base);">
              <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:28px;">全部物品 (6)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">装备 (2)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">消耗药剂 (3)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">强化材料 (1)</button>
            </div>

            <!-- 4x5 Grid Slots -->
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; margin-top:16px;">
              <!-- Slot 1 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--danger); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 高级生命药水', '使用后瞬间恢复 2,000 点生命值。确认使用吗？')">
                <span style="font-size:1.8rem;">🧪</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x15</span>
              </div>
              <!-- Slot 2 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--info); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 法力水晶', '使用后瞬间恢复 800 点法力值。')">
                <span style="font-size:1.8rem;">💎</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x8</span>
              </div>
              <!-- Slot 3 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('装备详情: 黄金战弓', '品质: SSR 传说\n物理攻击力: +240\n射程: +50')">
                <span style="font-size:1.8rem;">🏹</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">SSR</span>
              </div>
              <!-- Slot 4 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--success); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('材料: 秘银矿石', '用于在铁匠铺锻造 40 级史诗武器的稀有材料。')">
                <span style="font-size:1.8rem;">🧱</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x32</span>
              </div>
              <!-- Slot 5 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('宝箱: 远古龙蛋', '开启后随机获得一只 S 级飞行战斗坐骑。')">
                <span style="font-size:1.8rem;">🥚</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x1</span>
              </div>
              <!-- Slot 6 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--primary); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('卷轴: 回城卷轴', '使用后吟唱 3 秒传送回主城旅店。')">
                <span style="font-size:1.8rem;">📜</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x5</span>
              </div>
              <!-- Empty Slots 7~10 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
            </div>

            <!-- Footer Actions -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
              <button class="g-btn g-btn-default" onclick="showToast('背包已自动按品质整理排序！', 'success')">一键整理背包</button>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-danger" onclick="openDialog('批量分解', '是否将所有白色与绿色品质装备分解为强化碎片？')">批量分解</button>
                <button class="g-btn g-btn-primary" onclick="showToast('成功扩充 5 个背包格子！', 'success')">扩充背包 (+5格)</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏背包实现
class_name GameInventory
extends PanelContainer

@export var max_slots: int = 20
var items: Array[Dictionary] = []

func use_item(slot_index: int) -> void:
    var item = items[slot_index]
    if item["type"] == "potion":
        player.heal(item["value"])
        GMessage.success("使用成功：生命恢复 " + str(item["value"]))
        item["count"] -= 1
        _refresh_slots()`
      }
    ]
  },

  // ========================================================
  // 3. 游戏系统设置中心
  // ========================================================
  'game-settings': {
    title: '🎮 游戏系统设置中心 (Game Settings Panel)',
    desc: '使用 GTabs、GSlider、GSwitch、GSelect、GButton 组合实现的完整游戏配置中心（音频/画面/操作/语言）。',
    demos: [
      {
        title: 'Interactive Game Settings 游戏设置界面',
        render: `
          <div class="sim-card" style="width:100%; max-width:580px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">⚙️ 游戏系统设置 (Preferences)</span>
              <button class="g-btn g-btn-text" onclick="showToast('已恢复为默认推荐设置');">恢复默认</button>
            </div>

            <!-- Audio Sliders -->
            <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🔊 主音量 (Master Volume)</span>
                  <span id="volMaster" style="font-weight:700; color:var(--primary);">80%</span>
                </div>
                <input type="range" min="0" max="100" value="80" style="width:100%;" oninput="document.getElementById('volMaster').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🎵 背景音乐 (BGM Volume)</span>
                  <span id="volBgm" style="font-weight:700; color:var(--primary);">65%</span>
                </div>
                <input type="range" min="0" max="100" value="65" style="width:100%;" oninput="document.getElementById('volBgm').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>💥 战斗音效 (SFX Volume)</span>
                  <span id="volSfx" style="font-weight:700; color:var(--primary);">90%</span>
                </div>
                <input type="range" min="0" max="100" value="90" style="width:100%;" oninput="document.getElementById('volSfx').innerText=this.value+'%'">
              </div>

              <!-- Graphics Toggles -->
              <div style="padding-top:14px; border-top:1px solid var(--border-base); display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🖥️ 全屏模式 (Fullscreen)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('全屏模式：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>⚡ 垂直同步 (V-Sync)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('垂直同步：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🎯 目标渲染帧率 (FPS Limit)</span>
                  <select class="select-theme" style="width:140px; height:32px;">
                    <option value="60">60 FPS</option>
                    <option value="120" selected>120 FPS</option>
                    <option value="144">144 FPS</option>
                    <option value="unlimited">无限制</option>
                  </select>
                </div>
              </div>

              <!-- Footer Buttons -->
              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
                <button class="g-btn g-btn-default" onclick="showToast('取消更改');">取消</button>
                <button class="g-btn g-btn-primary" onclick="showToast('游戏设置已成功保存并即时生效！', 'success');">应用并保存</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏音频与图形设置绑定
func _on_master_slider_value_changed(val: float) -> void:
    AudioServer.set_bus_volume_db(
        AudioServer.get_bus_index("Master"),
        linear_to_db(val / 100.0)
    )

func _on_fullscreen_toggled(is_fullscreen: bool) -> void:
    DisplayServer.window_set_mode(
        DisplayServer.WINDOW_MODE_FULLSCREEN if is_fullscreen 
        else DisplayServer.WINDOW_MODE_WINDOWED
    )`
      }
    ]
  },

  // ========================================================
  // 4. 任务与剧情日志
  // ========================================================
  'game-quest': {
    title: '📜 游戏任务与剧情日志系统 (Quest Log & Objective Tracker)',
    desc: '使用 GCollapse、GSteps、GTag、GProgress、GButton 组合构建的游戏任务日志。包含主线/支线分类、阶段性目标达成与奖励领取。',
    demos: [
      {
        title: 'Interactive Quest Tracker 任务追踪与奖励领取',
        render: `
          <div class="sim-card" style="width:100%; max-width:620px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.05rem;">📜 任务日志 (Quest Log)</span>
              <span class="g-tag g-tag-warning">进行中任务 (2)</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:14px; margin-top:16px;">
              <!-- Main Quest 1 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--primary); font-size:1rem;">[主线第4章] 封印之地的唤醒</div>
                  <span class="g-tag g-tag-primary" style="font-size:11px;">目标已达成</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">前往暗夜森林深处击败看守封印的远古巨龙，取得龙之结晶。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>击败远古黑龙：1 / 1</span>
                    <span style="color:var(--success); font-weight:700;">100%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--success);"></div></div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid var(--border-base);">
                  <span style="font-size:0.85rem; color:var(--warning);">奖励：🪙 10,000 金币 · ⭐ 5,000 EXP</span>
                  <button id="btnClaimQuest" class="g-btn g-btn-primary" style="padding:4px 14px; font-size:12px; height:28px;" onclick="this.disabled=true; this.innerText='已领取'; showToast('成功领取任务奖励：金币 +10,000，EXP +5,000！', 'success');">领取奖励</button>
                </div>
              </div>

              <!-- Side Quest 2 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--text-primary); font-size:1rem;">[支线] 铁匠铺的委托</div>
                  <span class="g-tag g-tag-default" style="font-size:11px;">进行中</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">采集 10 块黑曜石矿石并交给铁匠布鲁诺。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>采集黑曜石：6 / 10</span>
                    <span style="color:var(--warning); font-weight:700;">60%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:60%; background:var(--warning);"></div></div>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 任务日志系统
class_name QuestManager
extends Node

signal quest_completed(quest_id: String)

func check_quest_progress(quest_id: String) -> void:
    var quest = active_quests[quest_id]
    if quest.current >= quest.target:
        quest.state = QuestState.READY_TO_CLAIM
        GMessage.info("任务目标已达成：" + quest.title)`
      }
    ]
  },

  // ========================================================
  // 5. 金币商城
  // ========================================================
  'game-shop': {
    title: '🛒 游戏商城与道具购买 (In-Game Shop & Purchasing)',
    desc: '使用 GCard、GBadge、GDialog、GButton 组合实现的道具商店，支持购买确认、金币实时扣除与售罄判定。',
    demos: [
      {
        title: 'Interactive In-Game Store 游戏道具商店',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">🛒 神秘商人道具屋 (Merchant Store)</span>
              <div style="color:var(--warning); font-weight:700;">
                我的金币: 🪙 <span id="shopGold">25,800</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:16px;">
              <!-- Item 1 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700;">🧪 特级狂暴药剂</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">暴击率提升 30%，持续 60 秒</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 500 金币</div>
                </div>
                <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=500){ g.innerText=(cur-500).toLocaleString(); showToast('购买特级狂暴药剂成功！', 'success'); }">购买</button>
              </div>

              <!-- Item 2 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; color:var(--warning);">🗡️ 封印的烈焰之剑</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">传说级双手武器 · 附带灼烧</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 12,000 金币</div>
                </div>
                <button class="g-btn g-btn-warning" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=12000){ g.innerText=(cur-12000).toLocaleString(); showToast('购买传说武器成功！', 'success'); } else { showToast('金币不足！', 'danger'); }">购买</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 商店购买逻辑
func purchase_item(item_id: String, price: int) -> void:
    if player.gold >= price:
        player.gold -= price
        player.inventory.add_item(item_id)
        GMessage.success("购买成功！")
    else:
        GMessage.error("金币不足，无法购买！")`
      }
    ]
  }
};
