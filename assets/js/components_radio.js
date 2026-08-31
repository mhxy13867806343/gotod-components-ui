// =========================================================================
// Gotod Components UI - Component: radio
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['radio'] = {
  "title": "Radio 单选框 (GRadio & Group)",
  "desc": "在一组备选项中进行单选。配合 GRadioGroup 自动管理选中互斥状态，支持常规圆形圆点与按钮化 (Button Style) 两种形态。",
  "demos": [
    {
      "title": "1. 基础单选框 (Basic Radio)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"radio\" name=\"demo_radio\" checked style=\"accent-color:var(--primary);\"><span>男 (Male)</span></label><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"radio\" name=\"demo_radio\" style=\"accent-color:var(--primary);\"><span>女 (Female)</span></label></div>",
      "code": "# GDScript: 基础单选框\nvar radio = GRadio.new(\"男\")\nradio.checked = true\nadd_child(radio)"
    },
    {
      "title": "2. 单选框组 (Radio Group)",
      "render": "<div style=\"display:flex; gap:16px; font-size:13px;\"><label><input type=\"radio\" name=\"pay\" checked> 微信支付</label><label><input type=\"radio\" name=\"pay\"> 支付宝</label><label><input type=\"radio\" name=\"pay\"> 游戏金币</label></div>",
      "code": "# GDScript: 单选框组\nvar group = GRadioGroup.new()\ngroup.options = [\"微信支付\", \"支付宝\", \"游戏金币\"]"
    },
    {
      "title": "3. 按钮样式形态 (RadioButton Style)",
      "render": "<div style=\"display:flex; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\"><button class=\"g-btn g-btn-primary\" style=\"border-radius:0; padding:4px 12px; font-size:12px;\">高清 1080P</button><button class=\"g-btn g-btn-default\" style=\"border-radius:0; border:none; padding:4px 12px; font-size:12px;\">超清 2K</button><button class=\"g-btn g-btn-default\" style=\"border-radius:0; border:none; padding:4px 12px; font-size:12px;\">极致 4K</button></div>",
      "code": "# GDScript: 按钮样式\ngroup.radio_type = GRadioGroup.Type.BUTTON"
    },
    {
      "title": "4. 带边框的单选卡片 (Bordered Radio Card)",
      "render": "<div style=\"display:flex; gap:12px;\"><div style=\"border:1px solid var(--primary); background:rgba(64,158,255,0.05); padding:8px 14px; border-radius:6px; font-size:13px; color:var(--primary); font-weight:600;\">月卡 (¥30)</div><div style=\"border:1px solid var(--border-base); padding:8px 14px; border-radius:6px; font-size:13px; color:var(--text-secondary);\">季卡 (¥88)</div></div>",
      "code": "# GDScript: 边框卡片\nradio.border = true"
    },
    {
      "title": "5. 游戏难度模式选择 (Game Difficulty Selector)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 12px;\">🌱 简单</button><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 12px; font-weight:700;\">⚔️ 普通</button><button class=\"g-btn g-btn-danger\" style=\"font-size:12px; padding:4px 12px;\">🔥 地狱</button></div>",
      "code": "# GDScript: 难度选择\nvar diff_group = GRadioGroup.new_difficulty_selector()"
    }
  ],
  "props": [
    {
      "name": "checked / v-model",
      "type": "boolean",
      "default": "false",
      "desc": "是否被选中"
    },
    {
      "name": "value",
      "type": "String",
      "default": "\"\"",
      "desc": "选项标识绑定值"
    },
    {
      "name": "button_style",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启按钮式外观形态"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用"
    }
  ],
  "events": [
    {
      "name": "selected()",
      "desc": "被选中时触发",
      "params": "()"
    }
  ],
  "methods": [],
  "slots": [
    {
      "name": "default",
      "desc": "单选框右侧描述文本插槽",
      "child": "Label / RichTextLabel / Control",
      "example": "<template #default>顺丰次日达 (+ ¥12)</template>"
    },
    {
      "name": "icon",
      "desc": "自定义单选圆点选中状态图标插槽（透传 { checked }）",
      "child": "GIcon / TextureRect",
      "example": "<template #icon=\"{ checked }\"><GIcon :name=\"checked ? 'circle-dot' : 'circle'\" /></template>"
    }
  ]
};
