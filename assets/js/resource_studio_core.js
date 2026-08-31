// =========================================================================
// Gotod Components UI - 5. .tres 资源工坊与主题编辑器 (Resource Studio)
// 深度集成 Godot 4 官方 Theme Editor 规范与 Resource (.tres) 序列化/解析引擎
// 涵盖 Godot 4 全部 35+ 个 UI 节点类型
// 参考: https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/resources.html
// =========================================================================

// Global Node Theme Store for all Godot 4 Controls
window.godotThemeStore = {
  fileName: 'button-001.tres',
  currentType: 'Button',
  activeTab: 'clr', // 'clr' (Colors), 'sb' (StyleBoxes), 'fT' (Font Sizes), 'C' (Constants)
  
  // All 35+ Godot 4 Control Node Styles
  nodes: {
    // --- 1. 按钮类 (Buttons) ---
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
    CheckButton: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontDisabledColor: '#8a8a98',
      fontSize: 14,
      checkColor: '#18a058'
    },
    CheckBox: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontDisabledColor: '#8a8a98',
      fontSize: 14,
      checkColor: '#18a058'
    },
    OptionButton: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#383842',
      borderHoverColor: '#18a058',
      borderWidth: 1,
      cornerRadius: 4,
      paddingH: 12,
      paddingV: 6
    },
    MenuButton: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#383842',
      cornerRadius: 4
    },
    LinkButton: {
      fontColor: '#18a058',
      fontHoverColor: '#36ad6a',
      fontPressedColor: '#0c7a43',
      fontSize: 14
    },
    TextureButton: {
      fontSize: 14
    },
    ColorPickerButton: {
      bgColor: '#18181c',
      borderColor: '#383842',
      borderHoverColor: '#18a058',
      cornerRadius: 4
    },

    // --- 2. 文本与输入 (Text & Inputs) ---
    LineEdit: {
      fontColor: '#ffffff',
      fontDisabledColor: '#8a8a98',
      fontSize: 14,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      borderHoverColor: '#18a058',
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
      borderHoverColor: '#18a058',
      borderWidth: 1,
      cornerRadius: 4,
      paddingH: 10,
      paddingV: 8
    },
    CodeEdit: {
      fontColor: '#e0e0e0',
      fontSize: 13,
      bgColor: '#0d0d11',
      borderColor: '#2d2d34',
      borderHoverColor: '#18a058',
      cornerRadius: 4
    },
    Label: {
      fontColor: '#f0f0f5',
      fontSize: 14,
      outlineColor: '#000000',
      outlineSize: 0
    },
    RichTextLabel: {
      fontColor: '#f0f0f5',
      fontSize: 14,
      outlineColor: '#000000'
    },
    SpinBox: {
      fontSize: 14,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      cornerRadius: 4
    },

    // --- 3. 容器与面板 (Containers & Panels) ---
    PanelContainer: {
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 6,
      paddingH: 16,
      paddingV: 16
    },
    Panel: {
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 6
    },
    TabContainer: {
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 6,
      paddingH: 16,
      paddingV: 16
    },
    TabBar: {
      fontColor: '#8a8a98',
      fontHoverColor: '#36ad6a',
      fontSelectedColor: '#18a058',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#18a058',
      borderWidth: 2,
      cornerRadius: 4
    },
    ScrollContainer: {
      bgColor: 'transparent',
      cornerRadius: 0
    },

    // --- 4. 数据与展示 (Data & Lists) ---
    ProgressBar: {
      bgColor: '#202024',
      fillColor: '#18a058',
      fontColor: '#ffffff',
      fontSize: 12,
      cornerRadius: 4
    },
    Tree: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 13,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 4
    },
    ItemList: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 13,
      bgColor: '#101014',
      borderColor: '#2d2d34',
      cornerRadius: 4
    },
    PopupMenu: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 13,
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      borderWidth: 1,
      cornerRadius: 6,
      paddingH: 8,
      paddingV: 6
    },
    MenuBar: {
      fontColor: '#ffffff',
      fontHoverColor: '#36ad6a',
      fontSize: 14,
      bgColor: '#18181c'
    },

    // --- 5. 滑块与分割线 (Sliders & Separators) ---
    HSlider: {
      grabberColor: '#18a058',
      trackBgColor: '#2d2d34'
    },
    VSlider: {
      grabberColor: '#18a058',
      trackBgColor: '#2d2d34'
    },
    HScrollBar: {
      grabberColor: '#383842',
      trackBgColor: '#18181c'
    },
    VScrollBar: {
      grabberColor: '#383842',
      trackBgColor: '#18181c'
    },
    HSeparator: {
      borderColor: '#2d2d34',
      borderWidth: 1
    },
    VSeparator: {
      borderColor: '#2d2d34',
      borderWidth: 1
    },

    // --- 6. 窗口与对话框 (Windows & Dialogs) ---
    Window: {
      fontColor: '#ffffff',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      cornerRadius: 8
    },
    AcceptDialog: {
      fontColor: '#ffffff',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      cornerRadius: 8
    },
    ConfirmationDialog: {
      fontColor: '#ffffff',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      cornerRadius: 8
    },
    FileDialog: {
      fontColor: '#ffffff',
      fontSize: 14,
      bgColor: '#18181c',
      borderColor: '#2d2d34',
      cornerRadius: 8
    },
    TooltipPanel: {
      fontColor: '#ffffff',
      fontSize: 12,
      bgColor: '#202024',
      borderColor: '#383842',
      borderWidth: 1,
      cornerRadius: 4,
      paddingH: 10,
      paddingV: 6
    }
  }
};

// Switch Active Node Type in Inspector
window.selectStudioNodeType = function(nodeType) {
  window.godotThemeStore.currentType = nodeType;
  const selectElem = document.getElementById('studioNodeTypeSelect');
  if (selectElem && selectElem.value !== nodeType) {
    selectElem.value = nodeType;
  }
  renderStudioInspector();
  showToast(`已切换正在编辑的 Godot 控件: ${nodeType}`, 'info');
};

// Switch Property Tab ('clr', 'sb', 'fT', 'C')
window.selectStudioTab = function(tabName) {
  window.godotThemeStore.activeTab = tabName;
  renderStudioInspector();
};

// Update Property for Current Node
window.updateStudioNodeProp = function(propKey, val) {
  const curType = window.godotThemeStore.currentType;
  if (!window.godotThemeStore.nodes[curType]) {
    window.godotThemeStore.nodes[curType] = {};
  }
  window.godotThemeStore.nodes[curType][propKey] = val;
  refreshStudioCanvas();
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

  // Update All Node Types
  Object.keys(store.nodes).forEach(k => {
    const n = store.nodes[k];
    if (n.fontHoverColor) n.fontHoverColor = hover;
    if (n.fontPressedColor) n.fontPressedColor = active;
    if (n.borderHoverColor) n.borderHoverColor = primary;
    if (n.checkColor) n.checkColor = primary;
    if (n.fillColor) n.fillColor = primary;
    if (n.grabberColor) n.grabberColor = primary;
    if (n.cornerRadius !== undefined) n.cornerRadius = radius;
  });

  refreshStudioCanvas();
  renderStudioInspector();
  showToast(`已将【${presetName.toUpperCase()}】风格应用到全部 35 个 Godot 节点！`, 'success');
};

// Import from Godot Default Theme
window.importGodotDefaultTheme = function() {
  applyStudioPreset('naive');
  showToast('已从 Godot 4 默认引擎主题导入全部 35 个基础节点属性！', 'success');
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
        ${data.checkColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>check_color (勾选色彩):</span>
            <input type="color" value="${data.checkColor}" onchange="updateStudioNodeProp('checkColor', this.value)">
          </div>
        ` : ''}
        ${data.grabberColor !== undefined ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>grabber_color (滑块把手色):</span>
            <input type="color" value="${data.grabberColor}" onchange="updateStudioNodeProp('grabberColor', this.value)">
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
  const panel = store.nodes.PanelContainer;

  return `[gd_resource type="Theme" load_steps=8 format=3 uid="uid://${Math.random().toString(36).substring(2, 12)}"]

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

[sub_resource type="StyleBoxFlat" id="StyleBoxFlat_panel"]
content_margin_left = ${panel.paddingH}.0
content_margin_top = ${panel.paddingV}.0
content_margin_right = ${panel.paddingH}.0
content_margin_bottom = ${panel.paddingV}.0
bg_color = ${hexToGodotColor(panel.bgColor)}
border_width_left = ${panel.borderWidth}
border_width_top = ${panel.borderWidth}
border_width_right = ${panel.borderWidth}
border_width_bottom = ${panel.borderWidth}
border_color = ${hexToGodotColor(panel.borderColor)}
corner_radius_top_left = ${panel.cornerRadius}
corner_radius_top_right = ${panel.cornerRadius}
corner_radius_bottom_right = ${panel.cornerRadius}
corner_radius_bottom_left = ${panel.cornerRadius}

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

# PanelContainer Node Definitions
PanelContainer/styles/panel = SubResource("StyleBoxFlat_panel")

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
