// =========================================================================
// Gotod Components UI - Component: tooltip
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tooltip'] = {
  "title": "Tooltip 悬浮提示 (GTooltip)",
  "desc": "常用于展示鼠标 hover 时的提示信息。",
  "demos": [
    {
      "title": "1. 基础悬浮提示 (Basic Tooltip)",
      "render": "<button class=\"g-btn g-btn-default\" title=\"点击立即保存当前进度到第 1 存档槽位\">💾 悬浮查看提示</button>",
      "code": "# GDScript: 基础 Tooltip\nbtn.tooltip_text = \"点击立即保存当前进度\""
    },
    {
      "title": "2. 12 种方位定位 (12 Placements: Top / Bottom / Left / Right)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" title=\"上方居中\">Top</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" title=\"下方居中\">Bottom</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" title=\"左侧居中\">Left</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" title=\"右侧居中\">Right</button></div>",
      "code": "# GDScript: 方位定位\ntooltip.placement = GTooltip.Placement.TOP"
    },
    {
      "title": "3. 深浅主题与高对比度 (Themes: Dark / Light)",
      "render": "<div style=\"display:flex; gap:12px;\"><span class=\"g-tag g-tag-primary\" style=\"cursor:help;\" title=\"深色高对比度背景\">Dark 主题</span><span class=\"g-tag g-tag-success\" style=\"cursor:help;\" title=\"明亮浅色背景\">Light 主题</span></div>",
      "code": "# GDScript: 主题模式\ntooltip.theme_mode = GTooltip.Theme.DARK"
    },
    {
      "title": "4. 快捷键按键映射提示 (Keybinding Hint Tooltip)",
      "render": "<button class=\"g-btn g-btn-primary\" style=\"display:inline-flex; align-items:center; gap:8px;\" title=\"快捷施法 [Q]\"><span>旋风斩</span><kbd style=\"background:rgba(0,0,0,0.2); padding:1px 4px; border-radius:3px; font-size:10px;\">Q</kbd></button>",
      "code": "# GDScript: 按键提示\ntooltip.shortcut_key = \"Q\""
    },
    {
      "title": "5. 游戏装备词条强化悬浮提示 (Game Equipment Tooltip)",
      "render": "<div style=\"display:inline-block; border:1px solid #ffd04b; background:rgba(255,208,75,0.1); padding:8px 12px; border-radius:6px; font-size:12px; cursor:pointer;\" onclick=\"showToast('查看装备强化属性: +15 圣辉破晓之剑', 'success')\"><span style=\"color:#ffd04b; font-weight:700;\">⚔️ 圣辉破晓之剑</span><span style=\"color:var(--text-secondary); font-size:11px; margin-left:6px;\">[悬浮查看详情]</span></div>",
      "code": "# GDScript: 装备提示\nvar equip_tip = GTooltip.new_item_tooltip(item_data)"
    }
  ],
  "props": [
    {
      "name": "content",
      "type": "String",
      "default": "\"\"",
      "desc": "提示文本"
    },
    {
      "name": "placement",
      "type": "enum",
      "default": "TOP",
      "desc": "提示位置：TOP, BOTTOM, LEFT, RIGHT"
    },
    {
      "name": "dark_theme",
      "type": "boolean",
      "default": "true",
      "desc": "深色/浅色气泡背景"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "show_tooltip()",
      "desc": "手动显示气泡",
      "params": "() -> void"
    },
    {
      "name": "hide_tooltip()",
      "desc": "手动隐藏气泡",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "触发提示的宿主目标节点插槽",
      "child": "GButton / Control",
      "example": "<template #default><GButton icon=\"circle-question\">帮助</GButton></template>"
    },
    {
      "name": "content",
      "desc": "提示内部自定义内容/富文本插槽",
      "child": "Control / Label",
      "example": "<template #content><RichTextLabel text=\"[b]神话属性[/b]: 全体攻击力 +20%\" /></template>"
    }
  ]
};
