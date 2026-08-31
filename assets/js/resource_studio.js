// =========================================================================
// Gotod Components UI - Resource Studio & Theme Visualizer Catalog
// =========================================================================
window.STUDIO_CATALOG = {
  // --------------------------------------------------------
  // 1. Godot 4 官方风格主题编辑器与 .tres 导入/导出器
  // --------------------------------------------------------
  'studio-theme-editor': {
    title: '🎨 Godot 4 主题编辑器与 .tres 资源工坊 (Theme & Node Studio)',
    desc: '1:1 还原 Godot 4 官方编辑器底部主题面板（Theme Dock）。支持导入本地 .tres 资源、从默认主题导入、全 35+ 个 Control 节点多状态预览与一键导出 .tres 文件。',
    demos: [
      {
        title: 'Godot 4 官方主题编辑器 (Theme Panel & .tres Exporter)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; background:var(--bg-surface);">
            
            <!-- Top Toolbar (1:1 Godot 4 Editor Header) -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 14px; background:var(--bg-card); border-bottom:1px solid var(--border-base); flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:700; color:var(--text-secondary); font-size:12px;">主题:</span>
                <span style="display:inline-flex; align-items:center; gap:6px; background:var(--bg-surface); border:1px solid var(--border-base); padding:3px 8px; border-radius:4px; font-family:var(--font-mono); font-size:12px;">
                  <span style="color:#ff4d4f;">🌈</span>
                  <input id="tresFileTitleInput" type="text" value="button-001.tres" style="background:none; border:none; color:var(--text-primary); font-family:inherit; outline:none; width:130px;" oninput="window.godotThemeStore.fileName=this.value;">
                </span>
                
                <!-- Import .tres file input -->
                <input type="file" id="tresFileInput" accept=".tres,.res,.txt" style="display:none;" onchange="handleTresFileUpload(this)">
                <button class="g-btn g-btn-default" style="height:26px; padding:0 8px; font-size:11px;" onclick="document.getElementById('tresFileInput').click()">
                  <i class="fa-solid fa-file-import"></i> 导入 .tres 资源
                </button>
                <button class="g-btn g-btn-default" style="height:26px; padding:0 8px; font-size:11px;" onclick="importGodotDefaultTheme()">
                  <i class="fa-solid fa-arrows-rotate"></i> 导入默认项目
                </button>
              </div>

              <!-- Presets & Actions -->
              <div style="display:flex; align-items:center; gap:6px;">
                <select class="select-theme" style="height:26px; font-size:11px;" onchange="applyStudioPreset(this.value)">
                  <option value="naive">Naive UI (绿色)</option>
                  <option value="element">Element Plus (蓝色)</option>
                  <option value="ant">Ant Design (极客蓝)</option>
                  <option value="cyberpunk">Cyberpunk (赛博朋克)</option>
                  <option value="gold">Dark Gold (黑金RPG)</option>
                </select>

                <button class="g-btn g-btn-primary" style="height:26px; padding:0 10px; font-size:11px;" onclick="downloadTresFile()">
                  <i class="fa-solid fa-download"></i> 导出 .tres 文件
                </button>
                <button class="g-btn g-btn-default" style="height:26px; padding:0 8px; font-size:11px;" onclick="copyCode(this, generateFullGodot4TresString())">
                  <i class="fa-regular fa-copy"></i> 复制纯文本
                </button>
              </div>
            </div>

            <!-- Godot 4 Main Workspace Dock (Left: Preview, Right: Inspector) -->
            <div style="display:grid; grid-template-columns:1.3fr 1fr; min-height:480px;">
              
              <!-- Left Dock: 1:1 Godot 4 Multi-Node Canvas Preview -->
              <div style="padding:16px; border-right:1px solid var(--border-base); background:var(--bg-base); display:flex; flex-direction:column; gap:14px; overflow-y:auto; max-height:540px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">默认预览 (Default Preview)</span>
                    <button class="g-btn g-btn-default" style="height:20px; font-size:10px; padding:0 4px;" onclick="showToast('添加新预览项');">+</button>
                  </div>
                  <span style="font-size:11px; color:var(--text-secondary);">点击左侧控件可快捷选中编辑</span>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                  
                  <!-- Column 1: Buttons & Labels -->
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="cursor:pointer;" onclick="selectStudioNodeType('Label')">
                      <label style="font-size:12px; color:var(--text-primary); font-weight:600;">Label 文本标签</label>
                    </div>

                    <!-- Button: Normal State -->
                    <button id="tresDemoNormal" class="g-btn" style="width:100%; justify-content:center;" onclick="selectStudioNodeType('Button')">
                      按钮 (Normal)
                    </button>

                    <!-- Button: Hover State -->
                    <button id="tresDemoHover" class="g-btn" style="width:100%; justify-content:center;" onclick="selectStudioNodeType('Button')">
                      悬浮按钮 (Hover)
                    </button>

                    <!-- Button: Toggle State -->
                    <button id="tresDemoToggle" class="g-btn" style="width:100%; justify-content:center; background:#101014; border:1px solid #383842; color:#fff;" onclick="selectStudioNodeType('Button')">
                      切换按钮 (Toggle)
                    </button>

                    <!-- Button: Disabled State -->
                    <button id="tresDemoDisabled" class="g-btn" disabled style="width:100%; justify-content:center;" onclick="selectStudioNodeType('Button')">
                      禁用的按钮
                    </button>

                    <!-- Button: Flat State -->
                    <button id="tresDemoFlat" class="g-btn g-btn-text" style="width:100%; justify-content:center;" onclick="selectStudioNodeType('Button')">
                      Flat Button (扁平按钮)
                    </button>
                  </div>

                  <!-- Column 2: Inputs, Tabs, Tree, Progress -->
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <!-- LineEdit -->
                    <div style="cursor:pointer;" onclick="selectStudioNodeType('LineEdit')">
                      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:2px;">LineEdit (单行输入):</div>
                      <input id="tresDemoLineEdit" class="g-input" type="text" value="LineEdit 内容" style="width:100%; height:28px; padding:0 8px; border:1px solid #2d2d34; border-radius:4px; background:#101014; color:#fff; font-size:12px;">
                    </div>

                    <!-- LineEdit Disabled -->
                    <div style="cursor:pointer;" onclick="selectStudioNodeType('LineEdit')">
                      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:2px;">已禁用 LineEdit:</div>
                      <input id="tresDemoLineEditDisabled" class="g-input" type="text" disabled value="已禁用 LineEdit" style="width:100%; height:28px; padding:0 8px; border:1px solid #2d2d34; border-radius:4px; background:#101014; color:#8a8a98; font-size:12px;">
                    </div>

                    <!-- TabBar Preview -->
                    <div style="cursor:pointer; margin-top:4px;" onclick="selectStudioNodeType('TabBar')">
                      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:2px;">TabBar (选项卡):</div>
                      <div style="display:flex; gap:12px; border-bottom:1px solid var(--border-base); font-size:12px;">
                        <span id="tresDemoTab1" style="color:var(--primary); font-weight:600; padding-bottom:4px; border-bottom:2px solid var(--primary);">选项卡 1</span>
                        <span style="color:var(--text-secondary); padding-bottom:4px;">选项卡 2</span>
                      </div>
                    </div>

                    <!-- ProgressBar Preview -->
                    <div style="cursor:pointer; margin-top:6px;" onclick="selectStudioNodeType('ProgressBar')">
                      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:2px;">ProgressBar (进度条):</div>
                      <div style="width:100%; height:14px; background:#202024; border-radius:4px; overflow:hidden;">
                        <div id="tresDemoProgFill" style="width:65%; height:100%; background:var(--primary); transition:all 0.2s;"></div>
                      </div>
                    </div>

                    <!-- Tree Preview -->
                    <div style="cursor:pointer; margin-top:6px; padding:6px 8px; background:#101014; border:1px solid #2d2d34; border-radius:4px; font-size:11px;" onclick="selectStudioNodeType('Tree')">
                      <div style="color:var(--text-secondary);">▼ Tree 树形节点</div>
                      <div style="padding-left:12px; color:var(--primary); margin-top:2px;">• 项目子节点 A</div>
                      <div style="padding-left:12px; color:var(--text-primary);">• 项目子节点 B</div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Right Dock: Property Inspector (1:1 Godot 4 Right Dock) -->
              <div style="padding:14px; background:var(--bg-surface); display:flex; flex-direction:column; gap:12px;">
                
                <!-- Complete 35+ Type Selection Dropdown with optgroups -->
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-base); padding-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:6px; width:100%;">
                    <span style="font-weight:700; font-size:12px; color:var(--text-secondary); flex-shrink:0;">类型:</span>
                    <select id="studioNodeTypeSelect" class="select-theme" style="height:28px; font-size:12px; width:100%; max-width:240px;" onchange="selectStudioNodeType(this.value)">
                      <optgroup label="1. 按钮类 (Buttons)">
                        <option value="Button" selected>Button (按钮)</option>
                        <option value="CheckButton">CheckButton (开关按钮)</option>
                        <option value="CheckBox">CheckBox (复选框)</option>
                        <option value="OptionButton">OptionButton (下拉列表)</option>
                        <option value="MenuButton">MenuButton (菜单按钮)</option>
                        <option value="LinkButton">LinkButton (链接按钮)</option>
                        <option value="TextureButton">TextureButton (纹理按钮)</option>
                        <option value="ColorPickerButton">ColorPickerButton (拾色器按钮)</option>
                      </optgroup>
                      <optgroup label="2. 文本与输入 (Text & Inputs)">
                        <option value="LineEdit">LineEdit (单行输入框)</option>
                        <option value="TextEdit">TextEdit (多行文本编辑)</option>
                        <option value="CodeEdit">CodeEdit (代码编辑器)</option>
                        <option value="Label">Label (文本标签)</option>
                        <option value="RichTextLabel">RichTextLabel (富文本)</option>
                        <option value="SpinBox">SpinBox (数字微调框)</option>
                      </optgroup>
                      <optgroup label="3. 容器与面板 (Containers & Panels)">
                        <option value="PanelContainer">PanelContainer (面板容器)</option>
                        <option value="Panel">Panel (基础面板)</option>
                        <option value="TabContainer">TabContainer (选项卡容器)</option>
                        <option value="TabBar">TabBar (选项卡栏)</option>
                        <option value="ScrollContainer">ScrollContainer (滚动容器)</option>
                      </optgroup>
                      <optgroup label="4. 数据与展示 (Data & Lists)">
                        <option value="ProgressBar">ProgressBar (进度条)</option>
                        <option value="Tree">Tree (树形目录)</option>
                        <option value="ItemList">ItemList (列表项目)</option>
                        <option value="PopupMenu">PopupMenu (弹出菜单)</option>
                        <option value="MenuBar">MenuBar (顶部菜单栏)</option>
                      </optgroup>
                      <optgroup label="5. 滑块与分割线 (Sliders & Separators)">
                        <option value="HSlider">HSlider (水平滑块)</option>
                        <option value="VSlider">VSlider (垂直滑块)</option>
                        <option value="HScrollBar">HScrollBar (水平滚动条)</option>
                        <option value="VScrollBar">VScrollBar (垂直滚动条)</option>
                        <option value="HSeparator">HSeparator (水平分割线)</option>
                        <option value="VSeparator">VSeparator (垂直分割线)</option>
                      </optgroup>
                      <optgroup label="6. 窗口与对话框 (Windows & Dialogs)">
                        <option value="Window">Window (基础窗口)</option>
                        <option value="AcceptDialog">AcceptDialog (确定对话框)</option>
                        <option value="ConfirmationDialog">ConfirmationDialog (确认取消框)</option>
                        <option value="FileDialog">FileDialog (文件对话框)</option>
                        <option value="TooltipPanel">TooltipPanel (悬浮提示面板)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <!-- Godot 4 4-Tab Icons: clr (Colors), sb (StyleBoxes), fT (Font Sizes), .C (Constants) -->
                <div style="display:flex; gap:4px; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
                  <button class="g-btn g-btn-default" style="flex:1; height:24px; padding:0; font-size:11px; font-weight:700; color:var(--primary);" onclick="selectStudioTab('clr')">clr 颜色</button>
                  <button class="g-btn g-btn-default" style="flex:1; height:24px; padding:0; font-size:11px; font-weight:700;" onclick="selectStudioTab('sb')">sb 样式盒</button>
                  <button class="g-btn g-btn-default" style="flex:1; height:24px; padding:0; font-size:11px; font-weight:700;" onclick="selectStudioTab('fT')">fT 字号</button>
                  <button class="g-btn g-btn-default" style="flex:1; height:24px; padding:0; font-size:11px; font-weight:700;" onclick="selectStudioTab('C')">.C 常量</button>
                </div>

                <!-- Dynamic Fields Container -->
                <div id="studioInspectorContent" style="flex:1; overflow-y:auto; max-height:360px;">
                  <!-- Dynamically populated by renderStudioInspector() -->
                </div>

              </div>
            </div>
          </div>
        `,
        code: `# 导出的 .tres 在 Godot 4 中的使用方式:
# 1. 方式一: 在编辑器右侧属性面板 Theme -> Theme 属性中拖入 button-001.tres
# 2. 方式二: 在 GDScript 脚本中动态加载
var custom_theme: Theme = load("res://ui/button/button-001.tres")
my_button.theme = custom_theme`
      },
      {
        title: '生成的 Godot 4 全节点 .tres 资源纯文本 (Full Godot 4 Theme Serialization)',
        render: `
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; color:var(--text-secondary);">符合 Godot 4 官方语法的多节点资源文本 (Multi-Node Godot 4 Theme Resource Text):</span>
              <button class="g-btn g-btn-primary" style="height:26px; padding:0 10px; font-size:11px;" onclick="downloadTresFile()">
                <i class="fa-solid fa-file-arrow-down"></i> 直接下载 .tres
              </button>
            </div>
            <div class="code-box" style="margin:0; max-height:260px; overflow-y:auto;">
              <pre><code id="tresGeneratedCode"></code></pre>
            </div>
          </div>
        `,
        code: `# Godot 4 资源加载
var theme_res = load("res://button-001.tres") as Theme`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. 自定义 Resource (.tres) 序列化工坊
  // --------------------------------------------------------
  'studio-custom-resource': {
    title: '💾 自定义 Resource 数据资源 (.tres) 导出器',
    desc: '基于 Godot 官方教程《Resource 资源系统》，用于生成游戏道具、角色属性、技能树等强类型数据资源文件 (.tres)。',
    demos: [
      {
        title: 'GameItemResource 道具装备资源 (.tres) 导出',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.2rem;">🗡️</span>
                <span style="font-weight:700;">item_legendary_sword.tres (装备数据资源)</span>
              </div>
              <button class="g-btn g-btn-primary" style="height:28px; font-size:12px;" onclick="downloadCustomResourceTres('item')">
                <i class="fa-solid fa-download"></i> 导出 item_legendary_sword.tres
              </button>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px; font-size:13px;">
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">item_id:</span> <span style="font-weight:700; color:var(--primary);">"wpn_flame_sword"</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">item_name:</span> <span style="font-weight:700; color:var(--warning);">"烈焰弑神之刃"</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">rarity (品质):</span> <span class="g-tag g-tag-warning" style="font-size:10px;">SSR 传说</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">price:</span> <span style="font-weight:700; color:var(--warning);">🪙 12,000</span>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript 对应的数据定义类: res://scripts/resources/game_item_resource.gd
class_name GameItemResource
extends Resource

@export var item_id: String = ""
@export var item_name: String = ""
@export var item_type: int = 1
@export var rarity: int = 4
@export var price: int = 12000
@export var stackable: bool = false
@export var stats_bonus: Dictionary = {"atk": 180, "crit_rate": 0.15}
@export_multiline var description: String = ""`
      },
      {
        title: 'CharacterStatsResource 角色状态配置 (.tres) 导出',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.2rem;">👤</span>
                <span style="font-weight:700;">character_warrior_stats.tres (角色数值配置)</span>
              </div>
              <button class="g-btn g-btn-primary" style="height:28px; font-size:12px;" onclick="downloadCustomResourceTres('character')">
                <i class="fa-solid fa-download"></i> 导出 character_warrior_stats.tres
              </button>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px; font-size:13px;">
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">base_hp:</span> <span style="font-weight:700; color:var(--danger);">3,850</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <span style="color:var(--text-secondary);">base_atk:</span> <span style="font-weight:700; color:var(--primary);">845</span>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 加载并应用自定义数据 Resource
var sword_data = load("res://item_legendary_sword.tres") as GameItemResource
print("装备名称:", sword_data.item_name)
print("攻击加成:", sword_data.stats_bonus.get("atk", 0))`
      }
    ]
  }
};
