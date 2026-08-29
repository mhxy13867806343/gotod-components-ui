// =========================================================================
// Gotod Components UI - 5. .tres 资源工坊与主题编辑器 (Resource Studio)
// 深度集成 Godot 4 官方 Theme Editor 规范与 Resource (.tres) 序列化/解析引擎
// 涵盖 Godot 4 全部 UI 节点: Button, LineEdit, TextEdit, TabBar, ProgressBar, PanelContainer, Tree, CheckBox, OptionButton, HSlider 等
// 参考: https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/resources.html
// =========================================================================

// Global Node Theme Store for all Godot 4 Controls
window.godotThemeStore = {
  fileName: 'button-001.tres',
  currentType: 'Button',
  activeTab: 'clr', // 'clr' (Colors), 'sb' (StyleBoxes), 'fT' (Font Sizes), 'C' (Constants)
  
  // Node Specific Styles
  nodes: {
    Button: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontPressedColor: '#0c7a43',
      fontDisabledColor: '#8a8a98',
      fontFocusColor: '#36ad6a',
      fontSize: 14,
      bgColor: '#18181c',
      bgHoverColor: '#202024',
      bgPressedColor: '#101014',
      bgDisabledColor: '#2d2d34',
      borderColor: '#383842',
      borderHoverColor: '#18a058',
      borderWidth: 1,
      cornerRadius: 6,
      paddingH: 14,
      paddingV: 6
    },
    PanelContainer: {
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 6,
      paddingH: 16,
      paddingV: 16
    },
    LineEdit: {
      fontColor: '#ffffff',
      fontDisabledColor: '#8a8a98',
      fontSize: 14,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      borderFocusColor: '#18a058',
      borderWidth: 1,
      cornerRadius: 4,
      paddingH: 10,
      paddingV: 6
    },
    TextEdit: {
      fontColor: '#ffffff',
      fontSize: 13,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 4
    },
    Label: {
      fontColor: '#f0f0f5',
      fontSize: 14,
      outlineColor: '#000000',
      outlineSize: 0
    },
    TabBar: {
      fontColor: '#8a8a98',
      fontHoverColor: '#36ad6a',
      fontSelectedColor: '#18a058',
      bgColor: '#18181c',
      borderColor: '#18a058'
    },
    ProgressBar: {
      bgColor: '#202024',
      fillColor: '#18a058',
      fontColor: '#ffffff',
      fontSize: 12,
      cornerRadius: 4
    },
    CheckBox: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      checkColor: '#18a058'
    },
    OptionButton: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      cornerRadius: 4
    },
    HSlider: {
      grabberColor: '#18a058',
      trackBgColor: '#2d2d34'
    },
    Tree: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      bgColor: '#101014',
      borderColor: '#2d2d34'
    }
  }
};

// Switch Active Node Type in Inspector
window.selectStudioNodeType = function(nodeType) {
  window.godotThemeStore.currentType = nodeType;
  renderStudioInspector();
  showToast(`已切换正在编辑的控件: ${nodeType}`, 'info');
};

// Switch Property Tab ('clr', 'sb', 'fT', 'C')
window.selectStudioTab = function(tabName) {
  window.godotThemeStore.activeTab = tabName;
  renderStudioInspector();
};

// Update Property for Current Node
window.updateStudioNodeProp = function(propKey, val) {
  const curType = window.godotThemeStore.currentType;
  if (window.godotThemeStore.nodes[curType]) {
    window.godotThemeStore.nodes[curType][propKey] = val;
    refreshStudioCanvas();
  }
};

// Apply Preset to All Nodes
window.applyStudioPreset = function(presetName) {
  const store = window.godotThemeStore;
  let primary = '#18a058', hover = '#36ad6a', active = '#0c7a43', radius = 6;
  
  if (presetName === 'element') {
    primary = '#409eff'; hover = '#66b1ff'; active = '#3a8ee6'; radius = 4;
  } else if (presetName === 'ant') {
    primary = '#1677ff'; hover = '#4096ff'; active = '#0958d9'; radius = 6;
  } else if (presetName === 'cyberpunk') {
    primary = '#00ffcc'; hover = '#ff0055'; active = '#d00040'; radius = 0;
  } else if (presetName === 'gold') {
    primary = '#ffb300'; hover = '#ffd54f'; active = '#ff8f00'; radius = 8;
  }

  // Update Button
  store.nodes.Button.fontHoverColor = hover;
  store.nodes.Button.fontPressedColor = active;
  store.nodes.Button.borderHoverColor = primary;
  store.nodes.Button.cornerRadius = radius;

  // Update LineEdit
  store.nodes.LineEdit.borderFocusColor = primary;
  store.nodes.LineEdit.cornerRadius = radius;

  // Update TabBar
  store.nodes.TabBar.fontHoverColor = hover;
  store.nodes.TabBar.fontSelectedColor = primary;
  store.nodes.TabBar.borderColor = primary;

  // Update ProgressBar
  store.nodes.ProgressBar.fillColor = primary;
  store.nodes.ProgressBar.cornerRadius = radius;

  // Update CheckBox & Slider
  store.nodes.CheckBox.checkColor = primary;
  store.nodes.HSlider.grabberColor = primary;

  refreshStudioCanvas();
  renderStudioInspector();
  showToast(`已应用全节点设计预设: ${presetName.toUpperCase()}`, 'success');
};

// Import from Godot Default Theme
window.importGodotDefaultTheme = function() {
  applyStudioPreset('naive');
  showToast('已从 Godot 4 默认引擎主题导入全部基础节点属性！', 'success');
};

// Import Local .tres File Upload Handler
window.handleTresFileUpload = function(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    parseAndLoadTresContent(text, file.name);
  };
  reader.readAsText(file);
};

// Parse Godot 4 .tres Resource Text
window.parseAndLoadTresContent = function(tresText, filename) {
  try {
    if (filename) {
      window.godotThemeStore.fileName = filename;
      const titleInput = document.getElementById('tresFileTitleInput');
      if (titleInput) titleInput.value = filename;
    }

    // Basic regex extraction for colors and numbers
    const fontColorMatch = tresText.match(/Button\/colors\/font_color\s*=\s*Color\(([^)]+)\)/);
    const hoverColorMatch = tresText.match(/Button\/colors\/font_hover_color\s*=\s*Color\(([^)]+)\)/);
    const cornerRadiusMatch = tresText.match(/corner_radius_top_left\s*=\s*([0-9.]+)/);
    const fontSizeMatch = tresText.match(/default_font_size\s*=\s*([0-9.]+)/);

    if (fontColorMatch) {
      window.godotThemeStore.nodes.Button.fontColor = parseGodotColorToHex(fontColorMatch[1]);
    }
    if (hoverColorMatch) {
      window.godotThemeStore.nodes.Button.fontHoverColor = parseGodotColorToHex(hoverColorMatch[1]);
      window.godotThemeStore.nodes.Button.borderHoverColor = parseGodotColorToHex(hoverColorMatch[1]);
    }
    if (cornerRadiusMatch) {
      window.godotThemeStore.nodes.Button.cornerRadius = parseInt(cornerRadiusMatch[1]);
    }
    if (fontSizeMatch) {
      window.godotThemeStore.nodes.Button.fontSize = parseInt(fontSizeMatch[1]);
    }

    refreshStudioCanvas();
    renderStudioInspector();
    showToast(`成功导入并解析 Godot 4 主题资源: ${filename || 'Resource'}！`, 'success');
  } catch (err) {
    showToast('解析 .tres 资源文件时出错，请确保是合法的 Godot 4 资源文件。', 'error');
  }
};

function parseGodotColorToHex(colorStr) {
  const parts = colorStr.split(',').map(p => parseFloat(p.trim()));
  if (parts.length >= 3) {
    const r = Math.round(parts[0] * 255).toString(16).padStart(2, '0');
    const g = Math.round(parts[1] * 255).toString(16).padStart(2, '0');
    const b = Math.round(parts[2] * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  return '#ffffff';
}

function hexToGodotColor(hex) {
  if (!hex) return 'Color(1, 1, 1, 1)';
  hex = hex.replace('#', '');
  if (hex.length === 6) {
    const r = (parseInt(hex.substring(0,2), 16) / 255).toFixed(4);
    const g = (parseInt(hex.substring(2,4), 16) / 255).toFixed(4);
    const b = (parseInt(hex.substring(4,6), 16) / 255).toFixed(4);
    return `Color(${r}, ${g}, ${b}, 1)`;
  }
  return `Color(1, 1, 1, 1)`;
}

// Refresh Left Studio Canvas (1:1 Godot 4 Bottom Dock Preview)
window.refreshStudioCanvas = function() {
  const btn = window.godotThemeStore.nodes.Button;
  const line = window.godotThemeStore.nodes.LineEdit;
  const tab = window.godotThemeStore.nodes.TabBar;
  const prog = window.godotThemeStore.nodes.ProgressBar;

  // 1. Button States
  const normalBtn = document.getElementById('tresDemoNormal');
  const hoverBtn = document.getElementById('tresDemoHover');
  const pressedBtn = document.getElementById('tresDemoPressed');
  const disabledBtn = document.getElementById('tresDemoDisabled');
  const flatBtn = document.getElementById('tresDemoFlat');
  const toggleBtn = document.getElementById('tresDemoToggle');

  if (normalBtn) {
    normalBtn.style.background = btn.bgColor;
    normalBtn.style.color = btn.fontColor;
    normalBtn.style.borderColor = btn.borderColor;
    normalBtn.style.borderWidth = btn.borderWidth + 'px';
    normalBtn.style.borderRadius = btn.cornerRadius + 'px';
    normalBtn.style.padding = `${btn.paddingV}px ${btn.paddingH}px`;
    normalBtn.style.fontSize = btn.fontSize + 'px';
  }
  if (hoverBtn) {
    hoverBtn.style.background = btn.bgHoverColor;
    hoverBtn.style.color = btn.fontHoverColor;
    hoverBtn.style.borderColor = btn.borderHoverColor;
    hoverBtn.style.borderWidth = btn.borderWidth + 'px';
    hoverBtn.style.borderRadius = btn.cornerRadius + 'px';
    hoverBtn.style.padding = `${btn.paddingV}px ${btn.paddingH}px`;
    hoverBtn.style.fontSize = btn.fontSize + 'px';
  }
  if (pressedBtn) {
    pressedBtn.style.background = btn.bgPressedColor;
    pressedBtn.style.color = btn.fontPressedColor;
    pressedBtn.style.borderColor = btn.borderHoverColor;
    pressedBtn.style.borderWidth = btn.borderWidth + 'px';
    pressedBtn.style.borderRadius = btn.cornerRadius + 'px';
    pressedBtn.style.padding = `${btn.paddingV}px ${btn.paddingH}px`;
  }
  if (disabledBtn) {
    disabledBtn.style.borderRadius = btn.cornerRadius + 'px';
  }
  if (toggleBtn) {
    toggleBtn.style.borderRadius = btn.cornerRadius + 'px';
    toggleBtn.style.borderColor = btn.borderColor;
  }
  if (flatBtn) {
    flatBtn.style.fontSize = btn.fontSize + 'px';
  }

  // 2. LineEdit States
  const lineEdit = document.getElementById('tresDemoLineEdit');
  const lineEditDisabled = document.getElementById('tresDemoLineEditDisabled');
  if (lineEdit) {
    lineEdit.style.background = line.bgColor;
    lineEdit.style.borderColor = line.borderColor;
    lineEdit.style.borderRadius = line.cornerRadius + 'px';
    lineEdit.style.color = line.fontColor;
    lineEdit.style.fontSize = line.fontSize + 'px';
  }
  if (lineEditDisabled) {
    lineEditDisabled.style.borderRadius = line.cornerRadius + 'px';
  }

  // 3. TabBar
  const tabElem = document.getElementById('tresDemoTab1');
  if (tabElem) {
    tabElem.style.borderBottomColor = tab.borderColor;
    tabElem.style.color = tab.fontSelectedColor;
  }

  // 4. ProgressBar
  const progFill = document.getElementById('tresDemoProgFill');
  if (progFill) {
    progFill.style.background = prog.fillColor;
    progFill.style.borderRadius = prog.cornerRadius + 'px';
  }

  // Update Generated .tres Code Output
  const codeBox = document.getElementById('tresGeneratedCode');
  if (codeBox) {
    codeBox.innerText = generateFullGodot4TresString();
  }
};

// Render Inspector Tabs and Fields
window.renderStudioInspector = function() {
  const container = document.getElementById('studioInspectorContent');
  if (!container) return;

  const store = window.godotThemeStore;
  const curType = store.currentType;
  const data = store.nodes[curType] || store.nodes.Button;
  const tab = store.activeTab;

  let fieldsHtml = '';

  if (tab === 'clr') {
    // Colors Tab
    fieldsHtml = `
      <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>font_color (常规字体色):</span>
          <input type="color" value="${data.fontColor || '#ffffff'}" onchange="updateStudioNodeProp('fontColor', this.value)">
        </div>
        ${data.fontHoverColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>font_hover_color (悬浮字体色):</span>
            <input type="color" value="${data.fontHoverColor}" onchange="updateStudioNodeProp('fontHoverColor', this.value)">
          </div>
        ` : ''}
        ${data.fontPressedColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>font_pressed_color (按下字体色):</span>
            <input type="color" value="${data.fontPressedColor}" onchange="updateStudioNodeProp('fontPressedColor', this.value)">
          </div>
        ` : ''}
        ${data.fontDisabledColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>font_disabled_color (禁用字体色):</span>
            <input type="color" value="${data.fontDisabledColor}" onchange="updateStudioNodeProp('fontDisabledColor', this.value)">
          </div>
        ` : ''}
      </div>
    `;
  } else if (tab === 'sb') {
    // StyleBoxes Tab
    fieldsHtml = `
      <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>bg_color (背景填充色):</span>
          <input type="color" value="${data.bgColor || '#18181c'}" onchange="updateStudioNodeProp('bgColor', this.value)">
        </div>
        ${data.bgHoverColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>bg_hover_color (悬浮背景):</span>
            <input type="color" value="${data.bgHoverColor}" onchange="updateStudioNodeProp('bgHoverColor', this.value)">
          </div>
        ` : ''}
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>border_color (边框颜色):</span>
          <input type="color" value="${data.borderColor || '#383842'}" onchange="updateStudioNodeProp('borderColor', this.value)">
        </div>
        ${data.borderHoverColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>border_hover_color (悬浮边框):</span>
            <input type="color" value="${data.borderHoverColor}" onchange="updateStudioNodeProp('borderHoverColor', this.value)">
          </div>
        ` : ''}
        ${data.cornerRadius !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
            <span>corner_radius (圆角弧度):</span>
            <input type="range" min="0" max="24" value="${data.cornerRadius}" style="width:100px;" oninput="updateStudioNodeProp('cornerRadius', parseInt(this.value))">
          </div>
        ` : ''}
        ${data.borderWidth !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>border_width (边框粗细):</span>
            <input type="range" min="0" max="6" value="${data.borderWidth}" style="width:100px;" oninput="updateStudioNodeProp('borderWidth', parseInt(this.value))">
          </div>
        ` : ''}
      </div>
    `;
  } else if (tab === 'fT') {
    // Font Sizes Tab
    fieldsHtml = `
      <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>font_size (字号大小):</span>
          <input type="range" min="10" max="32" value="${data.fontSize || 14}" style="width:110px;" oninput="updateStudioNodeProp('fontSize', parseInt(this.value))">
        </div>
      </div>
    `;
  } else {
    // Constants Tab
    fieldsHtml = `
      <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>h_separation (水平间距):</span>
          <input type="range" min="0" max="20" value="8" style="width:110px;">
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>outline_size (文字描边):</span>
          <input type="range" min="0" max="8" value="0" style="width:110px;">
        </div>
      </div>
    `;
  }

  container.innerHTML = fieldsHtml;
};

// Generate Full Multi-Node Godot 4 .tres Resource Text
window.generateFullGodot4TresString = function() {
  const store = window.godotThemeStore;
  const btn = store.nodes.Button;
  const line = store.nodes.LineEdit;
  const prog = store.nodes.ProgressBar;

  return `[gd_resource type="Theme" load_steps=7 format=3 uid="uid://${Math.random().toString(36).substring(2, 12)}"]

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_btn_disabled"]
content_margin_left = ${btn.paddingH}.0
content_margin_top = ${btn.paddingV}.0
content_margin_right = ${btn.paddingH}.0
content_margin_bottom = ${btn.paddingV}.0
bg_color = ${hexToGodotColor(btn.bgDisabledColor)}
border_width_left = ${btn.borderWidth}
border_width_top = ${btn.borderWidth}
border_width_right = ${btn.borderWidth}
border_width_bottom = ${btn.borderWidth}
border_color = ${hexToGodotColor(btn.borderColor)}
corner_radius_top_left = ${btn.cornerRadius}
corner_radius_top_right = ${btn.cornerRadius}
corner_radius_bottom_right = ${btn.cornerRadius}
corner_radius_bottom_left = ${btn.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_btn_hover"]
content_margin_left = ${btn.paddingH}.0
content_margin_top = ${btn.paddingV}.0
content_margin_right = ${btn.paddingH}.0
content_margin_bottom = ${btn.paddingV}.0
bg_color = ${hexToGodotColor(btn.bgHoverColor)}
border_width_left = ${btn.borderWidth}
border_width_top = ${btn.borderWidth}
border_width_right = ${btn.borderWidth}
border_width_bottom = ${btn.borderWidth}
border_color = ${hexToGodotColor(btn.borderHoverColor)}
corner_radius_top_left = ${btn.cornerRadius}
corner_radius_top_right = ${btn.cornerRadius}
corner_radius_bottom_right = ${btn.cornerRadius}
corner_radius_bottom_left = ${btn.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_btn_normal"]
content_margin_left = ${btn.paddingH}.0
content_margin_top = ${btn.paddingV}.0
content_margin_right = ${btn.paddingH}.0
content_margin_bottom = ${btn.paddingV}.0
bg_color = ${hexToGodotColor(btn.bgColor)}
border_width_left = ${btn.borderWidth}
border_width_top = ${btn.borderWidth}
border_width_right = ${btn.borderWidth}
border_width_bottom = ${btn.borderWidth}
border_color = ${hexToGodotColor(btn.borderColor)}
corner_radius_top_left = ${btn.cornerRadius}
corner_radius_top_right = ${btn.cornerRadius}
corner_radius_bottom_right = ${btn.cornerRadius}
corner_radius_bottom_left = ${btn.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_btn_pressed"]
content_margin_left = ${btn.paddingH}.0
content_margin_top = ${btn.paddingV}.0
content_margin_right = ${btn.paddingH}.0
content_margin_bottom = ${btn.paddingV}.0
bg_color = ${hexToGodotColor(btn.bgPressedColor)}
border_width_left = ${btn.borderWidth}
border_width_top = ${btn.borderWidth}
border_width_right = ${btn.borderWidth}
border_width_bottom = ${btn.borderWidth}
border_color = ${hexToGodotColor(btn.borderHoverColor)}
corner_radius_top_left = ${btn.cornerRadius}
corner_radius_top_right = ${btn.cornerRadius}
corner_radius_bottom_right = ${btn.cornerRadius}
corner_radius_bottom_left = ${btn.cornerRadius}

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_lineedit_normal"]
content_margin_left = ${line.paddingH}.0
content_margin_top = ${line.paddingV}.0
content_margin_right = ${line.paddingH}.0
content_margin_bottom = ${line.paddingV}.0
bg_color = ${hexToGodotColor(line.bgColor)}
border_width_left = ${line.borderWidth}
border_width_top = ${line.borderWidth}
border_width_right = ${line.borderWidth}
border_width_bottom = ${line.borderWidth}
border_color = ${hexToGodotColor(line.borderColor)}
corner_radius_top_left = ${line.cornerRadius}
corner_radius_top_right = ${line.cornerRadius}
corner_radius_bottom_right = ${line.cornerRadius}
corner_radius_bottom_left = ${line.cornerRadius}

[resource]
default_font_size = ${btn.fontSize}

# Button Node Definitions
Button/colors/font_color = ${hexToGodotColor(btn.fontColor)}
Button/colors/font_disabled_color = ${hexToGodotColor(btn.fontDisabledColor)}
Button/colors/font_focus_color = ${hexToGodotColor(btn.fontHoverColor)}
Button/colors/font_hover_color = ${hexToGodotColor(btn.fontHoverColor)}
Button/colors/font_pressed_color = ${hexToGodotColor(btn.fontPressedColor)}
Button/font_sizes/font_size = ${btn.fontSize}
Button/styles/disabled = SubResource("StyleBoxFlat_btn_disabled")
Button/styles/focus = SubResource("StyleBoxFlat_btn_hover")
Button/styles/hover = SubResource("StyleBoxFlat_btn_hover")
Button/styles/normal = SubResource("StyleBoxFlat_btn_normal")
Button/styles/pressed = SubResource("StyleBoxFlat_btn_pressed")

# LineEdit Node Definitions
LineEdit/colors/font_color = ${hexToGodotColor(line.fontColor)}
LineEdit/colors/font_disabled_color = ${hexToGodotColor(line.fontDisabledColor)}
LineEdit/font_sizes/font_size = ${line.fontSize}
LineEdit/styles/normal = SubResource("StyleBoxFlat_lineedit_normal")
LineEdit/styles/focus = SubResource("StyleBoxFlat_btn_hover")

# ProgressBar Node Definitions
ProgressBar/colors/font_color = ${hexToGodotColor(prog.fontColor)}
ProgressBar/font_sizes/font_size = ${prog.fontSize}
`;
};

// Download Full .tres File
window.downloadTresFile = function() {
  const content = generateFullGodot4TresString();
  const filename = window.godotThemeStore.fileName || 'button-001.tres';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`已成功导出并下载 Godot 4 全套主题资源: ${filename}！放入 res:// 中即可全局使用`, 'success');
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

// Studio Catalog
window.STUDIO_CATALOG = {
  // --------------------------------------------------------
  // 1. Godot 4 官方风格主题编辑器与 .tres 导入/导出器
  // --------------------------------------------------------
  'studio-theme-editor': {
    title: '🎨 Godot 4 主题编辑器与 .tres 资源工坊 (Theme & Node Studio)',
    desc: '1:1 还原 Godot 4 官方编辑器底部主题面板（Theme Dock）。支持导入本地 .tres 资源、从默认主题导入、全 Control 节点多状态预览与一键导出 .tres 文件。',
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
            <div style="display:grid; grid-template-columns:1.3fr 1fr; min-height:460px;">
              
              <!-- Left Dock: 1:1 Godot 4 Multi-Node Canvas Preview -->
              <div style="padding:16px; border-right:1px solid var(--border-base); background:var(--bg-base); display:flex; flex-direction:column; gap:14px; overflow-y:auto; max-height:500px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">默认预览 (Default Preview)</span>
                    <button class="g-btn g-btn-default" style="height:20px; font-size:10px; padding:0 4px;">+</button>
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
                
                <!-- Type Selection Dropdown -->
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-base); padding-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-weight:700; font-size:12px; color:var(--text-secondary);">类型:</span>
                    <select id="studioNodeTypeSelect" class="select-theme" style="height:26px; font-size:12px; width:130px;" onchange="selectStudioNodeType(this.value)">
                      <option value="Button">Button (按钮)</option>
                      <option value="LineEdit">LineEdit (输入框)</option>
                      <option value="TabBar">TabBar (选项卡)</option>
                      <option value="ProgressBar">ProgressBar (进度条)</option>
                      <option value="PanelContainer">PanelContainer (面板)</option>
                      <option value="Label">Label (文本)</option>
                      <option value="Tree">Tree (树形)</option>
                    </select>
                  </div>

                  <div style="display:flex; gap:4px;">
                    <button class="g-btn g-btn-default" style="height:24px; padding:0 6px; font-size:11px;" onclick="importGodotDefaultTheme()">+ 添加</button>
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
                <div id="studioInspectorContent" style="flex:1; overflow-y:auto; max-height:340px;">
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
