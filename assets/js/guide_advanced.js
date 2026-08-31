// =========================================================================
// Gotod Components UI - Guide Catalog (Advanced Architecture & Tooling)
// =========================================================================
window.GUIDE_CATALOG = window.GUIDE_CATALOG || {};
Object.assign(window.GUIDE_CATALOG, {
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
    desc: '开发环境支持随意调用全部 52+ 个高保真游戏 UI 组件；在项目生产环境发布导出 (Project -> Export) 时，EditorExportPlugin 会自动静态分析项目中所有 .tscn 和 .gd，未被使用的组件会自动被 skip() 排除出最终安装包，大幅减小游戏包体体积！',
    demos: [
      {
        title: '生产环境摇树依赖分析与自动剔除模拟器 (Tree-Shaking Live Analyzer)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            <div class="sim-card" style="width:100%;">
              <div class="sim-card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 项目场景组件引用模拟扫描器 (52 全量组件 Dependency Scanner)</span>
                <span class="g-tag g-tag-success" id="shakerOptimizeTag">包体优化率: 88.5%</span>
              </div>
              
              <!-- Quick Preset Actions Toolbar -->
              <div style="display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:wrap;">
                <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">快速预设:</span>
                <button type="button" class="g-btn g-btn-primary" style="padding:3px 10px; font-size:11px; height:26px; border-radius:4px; font-weight:700;" onclick="setTreeShakerPreset('core')">
                  <i class="fa-solid fa-bolt"></i> 核心精简 (6个)
                </button>
                <button type="button" class="g-btn g-btn-default" style="padding:3px 10px; font-size:11px; height:26px; border-radius:4px; font-weight:600;" onclick="setTreeShakerPreset('rpg')">
                  <i class="fa-solid fa-gamepad"></i> RPG 实战 (18个)
                </button>
                <button type="button" class="g-btn g-btn-default" style="padding:3px 10px; font-size:11px; height:26px; border-radius:4px;" onclick="setTreeShakerPreset('all')">
                  <i class="fa-solid fa-check-double"></i> 全选 (52个)
                </button>
                <button type="button" class="g-btn g-btn-default" style="padding:3px 10px; font-size:11px; height:26px; border-radius:4px;" onclick="setTreeShakerPreset('none')">
                  <i class="fa-solid fa-xmark"></i> 清空
                </button>
              </div>

              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); margin-top:12px;">
                <p style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">勾选您在游戏中实际用到的组件，模拟导出时的按需过滤：</p>
                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(170px, 1fr)); gap:8px 12px; font-size:12px; max-height:280px; overflow-y:auto; padding-right:6px;" id="shakerCheckGrid">
                  <!-- General & Layout (7) -->
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GButton (按钮)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GText (文本)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GIcon (图标)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GFab (悬浮动作按钮)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GDivider (分割线)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSpace (间距)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GContainer (容器布局)</label>
                  <!-- Form (11) -->
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GInput (输入框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GTextarea (多行文本)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GInputNumber (数字输入)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GStepper (步进器)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSwitch (开关)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCheckbox (复选框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GRadio (单选框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSelect (下拉框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GPicker (选择器)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSlider (滑块)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GForm (表单校验)</label>
                  <!-- Feedback (16) -->
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GDialog (弹窗对话框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GDialogue (剧情对话)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GChat (聊天气泡)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GPopup (弹出层)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GOverlay (遮罩层)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GActionSheet (动作面板)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GPopover (气泡卡片)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GNoticeBar (通告栏)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GMessage (全局消息)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GToast (轻提示)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GAlert (警告提示)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GDrawer (抽屉面板)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GTooltip (悬浮提示)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GLoading (加载动画)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSkeleton (骨架屏)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GTour (漫游引导)</label>
                  <!-- Data Display (10) -->
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GCard (卡片)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GTag (标签)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GBadge (徽标)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GAvatar (头像)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GProgress (进度条)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GTabs (选项卡)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCollapse (折叠面板)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSteps (步骤条)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GTable (高性能表格)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GVirtualList (虚拟列表)</label>
                  <!-- Engine Studios & Ecosystem (8) -->
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GHud3D (3D投影HUD)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GHaptic (触觉马达)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GAIDialogueTree (AI对话树)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GI18n (国际化引擎)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GParticleStudio (粒子工坊)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSkeletonParticleBinder (骨骼挂点)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GShaderStudio (GPU着色器)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GRouter (路由转场)</label>
                </div>
              </div>

              <!-- Output Statistics -->
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:14px;">
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--text-secondary);">开发环境全量组件</div>
                  <div id="shakerTotalCount" style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-top:2px;">52 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--primary);">生产实际打包组件</div>
                  <div id="shakerUsedCount" style="font-size:1.4rem; font-weight:700; color:var(--primary); margin-top:2px;">6 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--danger);">自动 skip() 剔除组件</div>
                  <div id="shakerUnusedCount" style="font-size:1.4rem; font-weight:700; color:var(--danger); margin-top:2px;">46 个</div>
                </div>
              </div>

              <!-- Godot Console Output Simulation -->
              <div style="margin-top:14px; padding:10px 14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); font-family:var(--font-mono); font-size:11px; color:#cfd0d8;">
                <div style="color:var(--primary); font-weight:700; margin-bottom:4px;">[Godot 4 EditorExportPlugin 导出日志]:</div>
                <div id="shakerLogText" style="line-height:1.6; color:#a0a5ad;">
                  [GotodUI Tree-Shaker] 扫描完成: 实际打包 6 个组件 (GButton, GInput, GDialog, GCard, GProgress, GTabs)，自动 skip() 剔除 46 个未引用组件 (GText, GIcon, GFab, GDivider, GSpace, GContainer 等 46 个)。
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
  },

  'guide-imperative-api': {
    title: '⚡ 命令式/编程式方法调用与上下文继承 (Imperative Calls & Context Injection)',
    desc: '除了在场景中放置节点外，Gotod UI 提供了全套静态命令式调用方法（类似 Element Plus 的 ElMessage、ElMessageBox、ElNotification、ElLoading.service）。支持传递 context_node (self) 继承当前场景树、视口与主题上下文环境！',
    demos: [
      {
        title: '1. GMessage 全局消息提示与 close_all() 手动关闭',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('操作成功！获得经验值 +200', 'success')">GMessage.success()</button>
              <button class="g-btn g-btn-warning" onclick="showToast('请注意：装备耐久度不足 20%', 'warning')">GMessage.warning()</button>
              <button class="g-btn g-btn-danger" onclick="showToast('网络连接中断，请重试', 'danger')">GMessage.error()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已手动关闭所有消息提示', 'info')">GMessage.close_all()</button>
            </div>
            <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); font-size:12px; line-height:1.7;">
              <strong>应用程序上下文继承 (Context Injection):</strong>
              <p style="color:var(--text-secondary); margin:4px 0 0;">通过将当前节点（<code>self</code>）作为第二个参数传入 <code>GMessage.success("...", self)</code>，弹出的 Toast 自动挂载到当前 SceneTree 根视口，并无缝继承当前场景的主题 Token 与屏幕缩放比例！</p>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式调用与上下文继承
# 1. 基础消息提示 (传入 self 作为上下文)
GMessage.success("购买道具成功！", self)
GMessage.warning("背包剩余空间不足！", self)
GMessage.error("金币不足，无法升级", self)

# 2. 手动关闭所有激活的消息实例 (类似 ElMessage.closeAll())
GMessage.close_all()

# 3. 字典配置高级调用
GMessage.show({
    "message": "自定义停留 5 秒的消息",
    "type": "success",
    "duration": 5.0
}, self)`
      },
      {
        title: '2. GMessageBox 编程式确认弹窗 (Alert / Confirm / Prompt)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="openSimDialog('装备强化成功！', '强化结果')">GMessageBox.alert()</button>
              <button class="g-btn g-btn-warning" onclick="openSimDialog('确定要分解这件神话装备吗？此操作不可逆！', '分解确认')">GMessageBox.confirm()</button>
              <button class="g-btn g-btn-default" onclick="openSimDialog('请输入新的公会名称：', '创建公会')">GMessageBox.prompt()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式弹窗
# 1. 简单警告弹窗
GMessageBox.alert("服务器将于 10 分钟后维护！", "系统通知", {}, self)

# 2. 确认/取消双选弹窗并监听信号
var confirm_box = GMessageBox.confirm("确定要出售这件传说武器吗？", "出售确认", {}, self)
confirm_box.confirmed.connect(func():
    GMessage.success("武器已成功出售！", self)
)

# 3. 输入 Prompt 弹窗
var prompt_box = GMessageBox.prompt("请输入角色昵称：", "修改昵称", {}, self)
prompt_box.prompt_submitted.connect(func(new_name: String):
    GMessage.success("昵称已修改为: " + new_name, self)
)`
      },
      {
        title: '3. GLoading 全局遮罩加载服务 (GLoading.service)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="showToast('GLoading.service() 正在加载地图资源...', 'info')">GLoading.service()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已调用 loading.close() 关闭加载遮罩', 'success')">loading.close()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式全局加载遮罩
# 1. 开启全局 Loading 遮罩
var loading = GLoading.service({
    "text": "正在进入跨服战场，请稍候...",
    "spinner_size": 42.0
}, self)

# 2. 异步业务完成后关闭
await get_tree().create_timer(2.0).timeout
loading.close()`
      },
      {
        title: '4. GNotification 右上角通知气泡 (GNotification.notify)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('【成就解锁】首次击败世界Boss！', 'success')">GNotification.success()</button>
              <button class="g-btn g-btn-warning" onclick="showToast('【排位赛】匹配队伍准备就绪', 'warning')">GNotification.warning()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已关闭所有通知气泡', 'info')">GNotification.close_all()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 右上角全局通知气泡
GNotification.success("【成就达成】", "首次单挑通关深渊副本第 100 层！", self)
GNotification.warning("【电量预警】", "设备电量低于 15%，请及时充电", self)

# 关闭所有通知实例
GNotification.close_all()`
      }
    ]
  }
};

});
