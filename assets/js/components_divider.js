// =========================================================================
// Gotod Components UI - Component: divider
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['divider'] = {
  "title": "Divider 分割线 (GDivider)",
  "desc": "区隔内容的分割线组件，支持水平与垂直方向、带有文案的分割线、文案位置（Left/Center/Right）、虚线模式与游戏华丽边框风格。",
  "demos": [
    {
      "title": "1. 基础水平分割线 (Basic Horizontal Divider)",
      "render": "\n          <div style=\"max-width:400px; font-size:13px; color:var(--text-secondary);\">\n            <span>上方战斗统计数据</span>\n            <div style=\"border-top:1px solid var(--border-base); margin:12px 0;\"></div>\n            <span>下方掉落物品明细</span>\n          </div>\n        ",
      "code": "# GDScript: 基础分割线\nvar div = GDivider.new()\nadd_child(div)"
    },
    {
      "title": "2. 带有文案的分割线 (Divider with Text / Title)",
      "render": "\n          <div style=\"max-width:400px; font-size:13px;\">\n            <div style=\"display:flex; align-items:center; margin:12px 0; color:var(--text-secondary);\">\n              <div style=\"flex:1; border-top:1px solid var(--border-base);\"></div>\n              <span style=\"padding:0 12px; font-size:12px; font-weight:600;\">更多精彩活动</span>\n              <div style=\"flex:1; border-top:1px solid var(--border-base);\"></div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 带有标题分割线\nvar div = GDivider.new_with_title(\"更多精彩活动\")"
    },
    {
      "title": "3. 文案位置定制 (Content Position: Left / Center / Right)",
      "render": "\n          <div style=\"max-width:400px; display:flex; flex-direction:column; gap:12px; font-size:12px; color:var(--text-secondary);\">\n            <div style=\"display:flex; align-items:center;\">\n              <div style=\"width:24px; border-top:1px solid var(--border-base);\"></div>\n              <span style=\"padding:0 8px; font-weight:600;\">左侧标题 (Left)</span>\n              <div style=\"flex:1; border-top:1px solid var(--border-base);\"></div>\n            </div>\n            <div style=\"display:flex; align-items:center;\">\n              <div style=\"flex:1; border-top:1px solid var(--border-base);\"></div>\n              <span style=\"padding:0 8px; font-weight:600;\">右侧标题 (Right)</span>\n              <div style=\"width:24px; border-top:1px solid var(--border-base);\"></div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 文案位置\ndiv.content_position = GDivider.Position.LEFT # LEFT, CENTER, RIGHT"
    },
    {
      "title": "4. 垂直分割线 (Vertical Divider)",
      "render": "\n          <div style=\"display:flex; align-items:center; gap:12px; font-size:13px;\">\n            <span>生命值</span>\n            <div style=\"height:14px; border-left:1px solid var(--border-base);\"></div>\n            <span>魔法值</span>\n            <div style=\"height:14px; border-left:1px solid var(--border-base);\"></div>\n            <span>护甲值</span>\n          </div>\n        ",
      "code": "# GDScript: 垂直分割线\nvar v_div = GDivider.new_vertical()"
    },
    {
      "title": "5. 虚线与游戏华丽分割线 (Dashed & Game Fancy Divider)",
      "render": "\n          <div style=\"max-width:400px; display:flex; flex-direction:column; gap:16px;\">\n            <div style=\"border-top:1px dashed var(--border-base);\"></div>\n            <div style=\"display:flex; align-items:center; color:#ffd04b;\">\n              <div style=\"flex:1; height:1px; background:linear-gradient(90deg, transparent, #ffd04b);\"></div>\n              <span style=\"padding:0 10px; font-size:14px;\">⚔️ 终局之战 ⚔️</span>\n              <div style=\"flex:1; height:1px; background:linear-gradient(90deg, #ffd04b, transparent);\"></div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 虚线与华丽分割线\ndiv.dashed = true\ndiv.gradient_color = Color(\"#ffd04b\")"
    }
  ],
  "props": [
    {
      "name": "direction",
      "type": "GDivider.Direction",
      "default": "HORIZONTAL",
      "desc": "分割线方向 (HORIZONTAL / VERTICAL)"
    },
    {
      "name": "content_position",
      "type": "GDivider.Position",
      "default": "CENTER",
      "desc": "文案位置 (LEFT / CENTER / RIGHT)"
    },
    {
      "name": "dashed",
      "type": "bool",
      "default": "false",
      "desc": "是否为虚线模式"
    }
  ],
  "events": [],
  "methods": [],
  "slots": [
    {
      "name": "default",
      "desc": "分割线内部自定义文案插槽"
    }
  ]
};
