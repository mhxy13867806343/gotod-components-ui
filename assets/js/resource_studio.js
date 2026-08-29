// =========================================================================
// Gotod Components UI - 5. .tres 资源工坊与主题编辑器 (Resource Studio)
// 深度集成 Godot 4 官方 Theme Editor 规范与 Resource (.tres) 序列化导出引擎
// 参考: https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/resources.html
// =========================================================================

// Global Theme Studio State
window.tresStudioState = {
  fileName: 'button-001.tres',
  targetType: 'Button',
  fontSize: 16,
  fontColor: '#ffffff',
  fontHoverColor: '#36ad6a',
  fontPressedColor: '#0c7a43',
  fontDisabledColor: '#8a8a98',
  bgColor: '#18181c',
  bgHoverColor: '#202024',
  bgPressedColor: '#101014',
  bgDisabledColor: '#2d2d34',
  borderColor: '#2d2d34',
  borderHoverColor: '#18a058',
  borderWidth: 1,
  cornerRadius: 6,
  paddingH: 16,
  paddingV: 8
};

window.updateTresProperty = function(key, val) {
  window.tresStudioState[key] = val;
  refreshTresPreview();
};

window.applyStudioPreset = function(presetName) {
  if (presetName === 'naive') {
    tresStudioState.fontHoverColor = '#36ad6a';
    tresStudioState.borderHoverColor = '#18a058';
    tresStudioState.cornerRadius = 6;
  } else if (presetName === 'element') {
    tresStudioState.fontHoverColor = '#66b1ff';
    tresStudioState.borderHoverColor = '#409eff';
    tresStudioState.cornerRadius = 4;
  } else if (presetName === 'ant') {
    tresStudioState.fontHoverColor = '#4096ff';
    tresStudioState.borderHoverColor = '#1677ff';
    tresStudioState.cornerRadius = 6;
  } else if (presetName === 'cyberpunk') {
    tresStudioState.fontColor = '#00ffcc';
    tresStudioState.fontHoverColor = '#ff0055';
    tresStudioState.bgColor = '#0a0a14';
    tresStudioState.borderHoverColor = '#00ffcc';
    tresStudioState.cornerRadius = 0;
    tresStudioState.borderWidth = 2;
  } else if (presetName === 'gold') {
    tresStudioState.fontColor = '#ffe082';
    tresStudioState.fontHoverColor = '#ffd54f';
    tresStudioState.bgColor = '#1e1b18';
    tresStudioState.borderHoverColor = '#ffb300';
    tresStudioState.cornerRadius = 8;
  }
  refreshTresPreview();
  showToast(`已载入预设主题: ${presetName.toUpperCase()}`, 'success');
};

window.refreshTresPreview = function() {
  const s = window.tresStudioState;
  
  // Update Live Preview Button Styles
  const normalBtn = document.getElementById('tresDemoNormal');
  const hoverBtn = document.getElementById('tresDemoHover');
  const pressedBtn = document.getElementById('tresDemoPressed');
  const disabledBtn = document.getElementById('tresDemoDisabled');
  const flatBtn = document.getElementById('tresDemoFlat');
  const lineEdit = document.getElementById('tresDemoLineEdit');

  if (normalBtn) {
    normalBtn.style.background = s.bgColor;
    normalBtn.style.color = s.fontColor;
    normalBtn.style.borderColor = s.borderColor;
    normalBtn.style.borderWidth = s.borderWidth + 'px';
    normalBtn.style.borderRadius = s.cornerRadius + 'px';
    normalBtn.style.padding = `${s.paddingV}px ${s.paddingH}px`;
    normalBtn.style.fontSize = s.fontSize + 'px';
  }
  if (hoverBtn) {
    hoverBtn.style.background = s.bgHoverColor;
    hoverBtn.style.color = s.fontHoverColor;
    hoverBtn.style.borderColor = s.borderHoverColor;
    hoverBtn.style.borderWidth = s.borderWidth + 'px';
    hoverBtn.style.borderRadius = s.cornerRadius + 'px';
    hoverBtn.style.padding = `${s.paddingV}px ${s.paddingH}px`;
  }
  if (pressedBtn) {
    pressedBtn.style.background = s.bgPressedColor;
    pressedBtn.style.color = s.fontPressedColor;
    pressedBtn.style.borderColor = s.borderHoverColor;
    pressedBtn.style.borderWidth = s.borderWidth + 'px';
    pressedBtn.style.borderRadius = s.cornerRadius + 'px';
    pressedBtn.style.padding = `${s.paddingV}px ${s.paddingH}px`;
  }
  if (disabledBtn) {
    disabledBtn.style.borderRadius = s.cornerRadius + 'px';
  }
  if (lineEdit) {
    lineEdit.style.borderRadius = s.cornerRadius + 'px';
    lineEdit.style.borderColor = s.borderColor;
  }

  // Update Generated .tres Code Box
  const codeBox = document.getElementById('tresGeneratedCode');
  if (codeBox) {
    codeBox.innerText = generateTresString();
  }
};

window.generateTresString = function() {
  const s = window.tresStudioState;
  const hexToColor = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 6) {
      const r = (parseInt(hex.substring(0,2), 16) / 255).toFixed(4);
      const g = (parseInt(hex.substring(2,4), 16) / 255).toFixed(4);
      const b = (parseInt(hex.substring(4,6), 16) / 255).toFixed(4);
      return `Color(${r}, ${g}, ${b}, 1)`;
    }
    return `Color(1, 1, 1, 1)`;
  };

  return `[gd_resource type="Theme" load_steps=5 format=3 uid="uid://${Math.random().toString(36).substring(2, 12)}"]

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_disabled"]
content_margin_left = ${s.paddingH}.0
content_margin_top = ${s.paddingV}.0
content_margin_right = ${s.paddingH}.0
content_margin_bottom = ${s.paddingV}.0
bg_color = ${hexToColor(s.bgDisabledColor)}
border_width_left = ${s.borderWidth}
border_width_top = ${s.borderWidth}
border_width_right = ${s.borderWidth}
border_width_bottom = ${s.borderWidth}
border_color = ${hexToColor(s.borderColor)}
corner_radius_top_left = ${s.cornerRadius}
corner_radius_top_right = ${s.cornerRadius}
corner_radius_bottom_right = ${s.cornerRadius}
corner_radius_bottom_left = ${s.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_hover"]
content_margin_left = ${s.paddingH}.0
content_margin_top = ${s.paddingV}.0
content_margin_right = ${s.paddingH}.0
content_margin_bottom = ${s.paddingV}.0
bg_color = ${hexToColor(s.bgHoverColor)}
border_width_left = ${s.borderWidth}
border_width_top = ${s.borderWidth}
border_width_right = ${s.borderWidth}
border_width_bottom = ${s.borderWidth}
border_color = ${hexToColor(s.borderHoverColor)}
corner_radius_top_left = ${s.cornerRadius}
corner_radius_top_right = ${s.cornerRadius}
corner_radius_bottom_right = ${s.cornerRadius}
corner_radius_bottom_left = ${s.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_normal"]
content_margin_left = ${s.paddingH}.0
content_margin_top = ${s.paddingV}.0
content_margin_right = ${s.paddingH}.0
content_margin_bottom = ${s.paddingV}.0
bg_color = ${hexToColor(s.bgColor)}
border_width_left = ${s.borderWidth}
border_width_top = ${s.borderWidth}
border_width_right = ${s.borderWidth}
border_width_bottom = ${s.borderWidth}
border_color = ${hexToColor(s.borderColor)}
corner_radius_top_left = ${s.cornerRadius}
corner_radius_top_right = ${s.cornerRadius}
corner_radius_bottom_right = ${s.cornerRadius}
corner_radius_bottom_left = ${s.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_pressed"]
content_margin_left = ${s.paddingH}.0
content_margin_top = ${s.paddingV}.0
content_margin_right = ${s.paddingH}.0
content_margin_bottom = ${s.paddingV}.0
bg_color = ${hexToColor(s.bgPressedColor)}
border_width_left = ${s.borderWidth}
border_width_top = ${s.borderWidth}
border_width_right = ${s.borderWidth}
border_width_bottom = ${s.borderWidth}
border_color = ${hexToColor(s.borderHoverColor)}
corner_radius_top_left = ${s.cornerRadius}
corner_radius_top_right = ${s.cornerRadius}
corner_radius_bottom_right = ${s.cornerRadius}
corner_radius_bottom_left = ${s.cornerRadius}

[resource]
default_font_size = ${s.fontSize}
Button/colors/font_color = ${hexToColor(s.fontColor)}
Button/colors/font_disabled_color = ${hexToColor(s.fontDisabledColor)}
Button/colors/font_focus_color = ${hexToColor(s.fontHoverColor)}
Button/colors/font_hover_color = ${hexToColor(s.fontHoverColor)}
Button/colors/font_pressed_color = ${hexToColor(s.fontPressedColor)}
Button/font_sizes/font_size = ${s.fontSize}
Button/styles/disabled = SubResource("StyleBoxFlat_disabled")
Button/styles/focus = SubResource("StyleBoxFlat_hover")
Button/styles/hover = SubResource("StyleBoxFlat_hover")
Button/styles/normal = SubResource("StyleBoxFlat_normal")
Button/styles/pressed = SubResource("StyleBoxFlat_pressed")
`;
};

// Download .tres File to Local Drive
window.downloadTresFile = function() {
  const content = generateTresString();
  const filename = window.tresStudioState.fileName || 'button-001.tres';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`已成功下载 Godot 4 主题文件: ${filename}！放入 res:// 即可直接生效`, 'success');
};

// Download Custom Resource .tres
window.downloadCustomResourceTres = function(type) {
  let filename = 'custom_item.tres';
  let content = '';

  if (type === 'item') {
    filename = 'item_legendary_sword.tres';
    content = `[gd_resource type="Resource" script_class="GameItemResource" load_steps=2 format=3]

[ext_resource type="Script" path="res://scripts/resources/game_item_resource.gd" id="1_item"]

[resource]
script = ExtResource("1_item")
item_id = "wpn_flame_sword"
item_name = "烈焰弑神之刃"
item_type = 1
rarity = 4
price = 12000
stackable = false
max_stack = 1
stats_bonus = {
"atk": 180,
"crit_rate": 0.15,
"fire_dmg": 45
}
description = "由远古黑龙龙鳞锻造的双手神兵，攻击时附带强烈的灼烧烈焰伤害。"
`;
  } else if (type === 'character') {
    filename = 'character_warrior_stats.tres';
    content = `[gd_resource type="Resource" script_class="CharacterStatsResource" load_steps=2 format=3]

[ext_resource type="Script" path="res://scripts/resources/character_stats_resource.gd" id="1_stats"]

[resource]
script = ExtResource("1_stats")
character_name = "影刃狂剑士"
character_class = "狂战士"
base_hp = 3850
base_mp = 1240
base_atk = 845
base_def = 420
crit_rate = 0.485
move_speed = 360.0
level = 45
skills = ["slash", "berserk", "whirlwind", "dragon_roar"]
`;
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`已成功下载 Godot 4 自定义资源文件: ${filename}！`, 'success');
};

window.STUDIO_CATALOG = {
  // --------------------------------------------------------
  // 1. Godot 4 官方风格主题编辑器与 .tres 导出器
  // --------------------------------------------------------
  'studio-theme-editor': {
    title: '🎨 Godot 4 主题编辑器与 .tres 资源导出器 (Theme Editor & Exporter)',
    desc: '1:1 像素级还原 Godot 4 官方编辑器的主题编辑面板。支持实时调整各种控件状态样式盒，并一键导出标准的 Godot 4 .tres 资源文件。',
    demos: [
      {
        title: 'Godot 4 官方主题编辑器 (Theme Panel & .tres Exporter)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; background:var(--bg-surface);">
            
            <!-- Top Toolbar (1:1 Godot 4 Editor Style) -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-weight:700; color:var(--text-secondary); font-size:13px;">主题 (Theme):</span>
                <span style="display:inline-flex; align-items:center; gap:6px; background:var(--bg-surface); border:1px solid var(--border-base); padding:3px 10px; border-radius:4px; font-family:var(--font-mono); font-size:12px;">
                  <span style="color:#ff4d4f;">🌈</span>
                  <input id="tresFileTitleInput" type="text" value="button-001.tres" style="background:none; border:none; color:var(--text-primary); font-family:inherit; outline:none; width:140px;" oninput="window.tresStudioState.fileName=this.value;">
                </span>
                <span class="g-tag g-tag-primary" style="font-size:10px;">Godot 4.x .tres</span>
              </div>

              <!-- Presets & Actions -->
              <div style="display:flex; align-items:center; gap:8px;">
                <select class="select-theme" style="height:28px; font-size:12px;" onchange="applyStudioPreset(this.value)">
                  <option value="naive">预设: Naive UI (绿)</option>
                  <option value="element">预设: Element Plus (蓝)</option>
                  <option value="ant">预设: Ant Design (极客蓝)</option>
                  <option value="cyberpunk">预设: Cyberpunk (赛博朋克)</option>
                  <option value="gold">预设: Dark Gold (黑金RPG)</option>
                </select>

                <button class="g-btn g-btn-primary" style="height:28px; padding:0 12px; font-size:12px;" onclick="downloadTresFile()">
                  <i class="fa-solid fa-download"></i> 导出 .tres 文件
                </button>
                <button class="g-btn g-btn-default" style="height:28px; padding:0 10px; font-size:12px;" onclick="copyCode(this, generateTresString())">
                  <i class="fa-regular fa-copy"></i> 复制内容
                </button>
              </div>
            </div>

            <!-- Godot 4 Main Workspace Dock (Left: Preview, Right: Inspector) -->
            <div style="display:grid; grid-template-columns:1.2fr 1fr; min-height:420px;">
              
              <!-- Left Dock: Preview Canvas (1:1 Godot 4 Preview) -->
              <div style="padding:20px; border-right:1px solid var(--border-base); background:var(--bg-base); display:flex; flex-direction:column; gap:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-base); padding-bottom:8px;">
                  <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">默认预览 (Default Preview)</span>
                  <span style="font-size:11px; color:var(--text-secondary);">Type: Button / Control</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:12px; width:100%; max-width:320px;">
                  <label style="font-size:12px; color:var(--text-secondary);">Label 标签文本</label>

                  <!-- Button: Normal State -->
                  <button id="tresDemoNormal" class="g-btn" style="width:100%; justify-content:center; background:#18181c; border:1px solid #2d2d34; color:#fff; border-radius:6px;">
                    按钮 (Normal)
                  </button>

                  <!-- Button: Hover State -->
                  <button id="tresDemoHover" class="g-btn" style="width:100%; justify-content:center; background:#202024; border:1px solid #18a058; color:#36ad6a; border-radius:6px;">
                    悬浮按钮 (Hover)
                  </button>

                  <!-- Button: Pressed State -->
                  <button id="tresDemoPressed" class="g-btn" style="width:100%; justify-content:center; background:#101014; border:1px solid #18a058; color:#0c7a43; border-radius:6px;">
                    按下按钮 (Pressed)
                  </button>

                  <!-- Button: Disabled State -->
                  <button id="tresDemoDisabled" class="g-btn" disabled style="width:100%; justify-content:center;">
                    禁用的按钮 (Disabled)
                  </button>

                  <!-- LineEdit -->
                  <div style="margin-top:8px;">
                    <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">LineEdit 输入框:</div>
                    <div class="g-input-wrapper" style="width:100%;">
                      <input id="tresDemoLineEdit" class="g-input" type="text" value="Godot 4.x LineEdit Text">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Dock: Property Inspector (1:1 Godot 4 Theme Property Inspector) -->
              <div style="padding:16px; background:var(--bg-surface); display:flex; flex-direction:column; gap:14px; overflow-y:auto; max-height:460px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-weight:700; font-size:13px; color:var(--primary);">类型 (Type): Button</span>
                  <span class="g-tag g-tag-default" style="font-size:10px;">Theme Override</span>
                </div>

                <!-- Colors Section -->
                <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
                  <div style="font-weight:700; color:var(--text-secondary); margin-top:4px;">🎨 颜色 (Colors):</div>
                  
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>font_color (常规字体色):</span>
                    <input type="color" value="#ffffff" onchange="updateTresProperty('fontColor', this.value)">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>font_hover_color (悬浮字体色):</span>
                    <input type="color" value="#36ad6a" onchange="updateTresProperty('fontHoverColor', this.value)">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>font_pressed_color (按下字体色):</span>
                    <input type="color" value="#0c7a43" onchange="updateTresProperty('fontPressedColor', this.value)">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>font_disabled_color (禁用字体色):</span>
                    <input type="color" value="#8a8a98" onchange="updateTresProperty('fontDisabledColor', this.value)">
                  </div>
                </div>

                <!-- StyleBox Flat Section -->
                <div style="display:flex; flex-direction:column; gap:8px; font-size:12px; padding-top:10px; border-top:1px solid var(--border-base);">
                  <div style="font-weight:700; color:var(--text-secondary);">📦 样式盒 (StyleBoxFlat):</div>

                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>bg_color (背景填充色):</span>
                    <input type="color" value="#18181c" onchange="updateTresProperty('bgColor', this.value)">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>border_color (边框颜色):</span>
                    <input type="color" value="#2d2d34" onchange="updateTresProperty('borderColor', this.value)">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>border_hover_color (悬浮边框):</span>
                    <input type="color" value="#18a058" onchange="updateTresProperty('borderHoverColor', this.value)">
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                    <span>corner_radius (圆角弧度):</span>
                    <input type="range" min="0" max="24" value="6" style="width:100px;" oninput="updateTresProperty('cornerRadius', parseInt(this.value))">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>border_width (边框粗细):</span>
                    <input type="range" min="0" max="6" value="1" style="width:100px;" oninput="updateTresProperty('borderWidth', parseInt(this.value))">
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>font_size (字体大小):</span>
                    <input type="range" min="12" max="24" value="16" style="width:100px;" oninput="updateTresProperty('fontSize', parseInt(this.value))">
                  </div>
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
        title: '生成的 Godot 4 标准 .tres 资源纯文本 (Resource Serialization)',
        render: `
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; color:var(--text-secondary);">符合 Godot 4 引擎官方语法的资源文件 (Standard Godot 4 Resource Text):</span>
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
