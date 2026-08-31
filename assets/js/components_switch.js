// =========================================================================
// Gotod Components UI - Component: switch
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['switch'] = {
  "title": "Switch 开关 (GSwitch)",
  "desc": "表示两种相互对立的状态间的切换，多用于触发即时动作。支持尺寸切换、自定义色彩与禁用。",
  "demos": [
    {
      "title": "1. 基础开关状态 (Basic Switch)",
      "render": "<div style=\"display:flex; gap:20px; align-items:center;\"><label style=\"position:relative; display:inline-block; width:44px; height:24px; cursor:pointer;\"><input type=\"checkbox\" checked style=\"opacity:0; width:0; height:0;\" onchange=\"this.nextElementSibling.style.background = this.checked ? 'var(--primary)' : 'var(--border-base)'; this.nextElementSibling.firstElementChild.style.transform = this.checked ? 'translateX(20px)' : 'translateX(0)';\"><span style=\"position:absolute; top:0; left:0; right:0; bottom:0; background:var(--primary); border-radius:24px; transition:0.3s;\"><span style=\"position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:white; border-radius:50%; transition:0.3s; transform:translateX(20px);\"></span></span></label><span style=\"font-size:13px; color:var(--text-secondary);\">已开启状态</span></div>",
      "code": "# GDScript: 基础开关\nvar sw = GSwitch.new()\nsw.checked = true\nadd_child(sw)"
    },
    {
      "title": "2. 自定义主题配色 (Custom Active Color)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><span style=\"width:40px; height:22px; background:var(--success); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"width:40px; height:22px; background:var(--warning); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"width:40px; height:22px; background:var(--danger); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span></div>",
      "code": "# GDScript: 自定义色彩\nsw.active_color = GotodTheme.get_color(\"success\")"
    },
    {
      "title": "3. 内嵌文字与图标说明 (Text & Icon Inside Switch)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:56px; height:24px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; justify-content:space-between; padding:0 6px; color:#fff; font-size:10px; font-weight:700;\"><span>开</span><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></div><div style=\"width:56px; height:24px; background:var(--border-base); border-radius:20px; display:inline-flex; align-items:center; justify-content:space-between; padding:0 6px; color:var(--text-secondary); font-size:10px; font-weight:700;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span><span>关</span></div></div>",
      "code": "# GDScript: 内嵌文字\nsw.active_text = \"开\"\nsw.inactive_text = \"关\""
    },
    {
      "title": "4. 禁用状态 (Disabled Switch)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center; opacity:0.4;\"><span style=\"width:40px; height:22px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"font-size:12px;\">已锁定禁用</span></div>",
      "code": "# GDScript: 禁用开关\nsw.disabled = true"
    },
    {
      "title": "5. 游戏系统音效与震动设置 (Game Audio Settings)",
      "render": "<div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>🎵 背景音乐 (BGM)</span><span style=\"width:36px; height:20px; background:var(--success); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:16px; height:16px; background:#fff; border-radius:50%;\"></span></span></div><div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>📳 技能命中震动</span><span style=\"width:36px; height:20px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:16px; height:16px; background:#fff; border-radius:50%;\"></span></span></div></div>",
      "code": "# GDScript: 游戏音效设置\nvar bgm_switch = GSwitch.new()"
    }
  ],
  "props": [
    {
      "name": "checked / v-model",
      "type": "boolean",
      "default": "false",
      "desc": "开关开启状态"
    },
    {
      "name": "switch_size",
      "type": "enum",
      "default": "MEDIUM",
      "desc": "尺寸规格：SMALL, MEDIUM, LARGE"
    },
    {
      "name": "checked_color",
      "type": "Color",
      "default": "TRANSPARENT",
      "desc": "激活状态自定义色彩"
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
      "name": "toggled(checked)",
      "desc": "开关状态改变时触发",
      "params": "(checked: bool)"
    }
  ],
  "methods": [
    {
      "name": "toggle()",
      "desc": "翻转当前开关状态",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "checked-icon",
      "desc": "开启状态滑块内部图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #checked-icon><GIcon name=\"check\" /></template>"
    },
    {
      "name": "unchecked-icon",
      "desc": "关闭状态滑块内部图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #unchecked-icon><GIcon name=\"xmark\" /></template>"
    },
    {
      "name": "default",
      "desc": "开关右侧伴随文本标签插槽",
      "child": "GText / Label",
      "example": "<template #default><span>开启音效 (SFX)</span></template>"
    }
  ]
};
