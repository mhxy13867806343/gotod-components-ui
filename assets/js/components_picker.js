// =========================================================================
// Gotod Components UI - Component: picker
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['picker'] = {
  "title": "Picker 选择器 (GPicker)",
  "desc": "提供多个选项供用户选择，支持单列选择和多列级联选择，常与弹出层配合使用。深度对标 Vant UI 移动端选择器规范。",
  "demos": [
    {
      "title": "1. 基础单列滚动拾取 (Basic Picker)",
      "render": "<div style=\"max-width:260px; height:90px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface); display:flex; flex-direction:column; justify-content:center; align-items:center; font-size:13px;\"><div style=\"color:var(--text-secondary); opacity:0.4; font-size:11px;\">破晓之剑</div><div style=\"color:var(--primary); font-weight:700; padding:4px 0; border-top:1px solid var(--border-base); border-bottom:1px solid var(--border-base); width:100%; text-align:center;\">圣辉破晓法杖 (当前选定)</div><div style=\"color:var(--text-secondary); opacity:0.4; font-size:11px;\">狂战巨斧</div></div>",
      "code": "# GDScript: 基础拾取器\nvar picker = GPicker.new()\npicker.columns = [[\"破晓之剑\", \"圣辉法杖\", \"狂战巨斧\"]]\nadd_child(picker)"
    },
    {
      "title": "2. 多列联动选择 (Multi-Column Cascading Picker)",
      "render": "<div style=\"max-width:320px; height:80px; border:1px solid var(--border-base); border-radius:8px; background:var(--bg-surface); display:grid; grid-template-columns:1fr 1fr; align-items:center; text-align:center; font-size:12px;\"><div style=\"border-right:1px solid var(--border-base); font-weight:600; color:var(--primary);\">艾泽拉斯大区</div><div style=\"font-weight:600; color:var(--primary);\">服务器 1 服</div></div>",
      "code": "# GDScript: 多列联动\npicker.columns = [zones, servers]"
    },
    {
      "title": "3. 底部弹出式拾取器 (Popup Action Sheet Picker)",
      "render": "<button class=\"g-btn g-btn-primary\" style=\"font-size:12px;\" onclick=\"showToast('弹出底部滚轮拾取面板', 'info')\">📅 打开出生日期拾取器</button>",
      "code": "# GDScript: 弹出式拾取器\npicker.show_as_popup()"
    },
    {
      "title": "4. 自定义选项展示插槽 (Custom Item Slot)",
      "render": "<div style=\"display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:8px 12px; border-radius:6px; max-width:240px; font-size:12px;\"><span>⚔️ 战士专精</span><span class=\"g-tag g-tag-success\" style=\"font-size:10px;\">推荐</span></div>",
      "code": "# GDScript: 自定义选项\npicker.set_item_renderer(func(item): ...)"
    },
    {
      "title": "5. 游戏角色出生阵营拾取 (Game Faction Picker)",
      "render": "<div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>🛡️ 当前所属阵营:</span><strong style=\"color:var(--warning);\">光明圣堂骑士团</strong></div>",
      "code": "# GDScript: 阵营拾取器\nvar faction_picker = GPicker.new_game_faction()"
    }
  ],
  "props": [
    {
      "name": "title",
      "type": "String",
      "default": "\"请选择\"",
      "desc": "顶部工具栏标题",
      "version": "v1.0"
    },
    {
      "name": "columns",
      "type": "Array",
      "default": "[]",
      "desc": "选项列表（单列为字符串数组，多列为对象数组）",
      "version": "v1.0"
    },
    {
      "name": "default_index",
      "type": "int",
      "default": "0",
      "desc": "单列选择器的默认选中项索引",
      "version": "v1.0"
    },
    {
      "name": "confirm_button_text",
      "type": "String",
      "default": "\"确认\"",
      "desc": "确认按钮文字",
      "version": "v1.0"
    },
    {
      "name": "cancel_button_text",
      "type": "String",
      "default": "\"取消\"",
      "desc": "取消按钮文字",
      "version": "v1.0"
    },
    {
      "name": "show_toolbar",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示顶部工具栏",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "confirm(values, indexes)",
      "desc": "点击完成按钮时触发",
      "params": "(values: Array, indexes: Array)",
      "version": "v1.0"
    },
    {
      "name": "cancel()",
      "desc": "点击取消按钮时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "change(values, index)",
      "desc": "选项改变时触发",
      "params": "(values: Array, index: int)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "set_columns(cols: Array)",
      "desc": "批量设置多列或单列选项数据",
      "params": "(cols: Array) -> void",
      "version": "v1.0"
    },
    {
      "name": "add_column(items: Array)",
      "desc": "动态追加一列备选数据",
      "params": "(items: Array) -> void",
      "version": "v1.0"
    },
    {
      "name": "open()",
      "desc": "呼出选择器面板",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "关闭选择器面板",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "get_selected_value()",
      "desc": "获取当前选中的值",
      "params": "() -> Variant",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "option",
      "desc": "轮盘每一行选项自定义渲染插槽（透传 { item, index }）",
      "child": "Control / GText",
      "example": "<template #option=\"{ item }\"><b>{{ item.text }}</b></template>",
      "version": "v1.0"
    },
    {
      "name": "top-toolbar",
      "desc": "选择器顶部自定义工具栏插槽（取消/确认按钮区）",
      "child": "HBoxContainer / GButton",
      "example": "<template #top-toolbar><GButton>取消</GButton><GButton type=\"primary\">完成</GButton></template>",
      "version": "v1.0"
    }
  ]
};
