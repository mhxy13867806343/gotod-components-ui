// =========================================================================
// Gotod Components UI - Component: popover
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['popover'] = {
  "title": "Popover 气泡弹出框 (GPopover)",
  "desc": "基于目标元素定位的气泡卡片，常用于展示快捷操作菜单或轻量信息提示。深度对标 Vant UI 气泡规范，支持 Dark/Light 双色主题与菜单列表。",
  "demos": [
    {
      "title": "1. 基础点击触发 (Click Trigger Popover)",
      "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('弹出气泡卡片：展示装备强化成功率 75%', 'info')\">🔍 查看强化几率</button>",
      "code": "# GDScript: 基础气泡卡片\nvar pop = GPopover.new()\npop.content = \"强化成功率: 75%\"\nadd_child(pop)"
    },
    {
      "title": "2. 悬浮触发 (Hover Trigger)",
      "render": "<div style=\"display:inline-block; border-bottom:1px dashed var(--primary); color:var(--primary); font-size:13px; cursor:help;\" title=\"暴击伤害初始为 150%，每点暴击伤害词条增加 1%\">什么是暴击倍率？</div>",
      "code": "# GDScript: 悬浮触发\npop.trigger = GPopover.Trigger.HOVER"
    },
    {
      "title": "3. 嵌套表单与复杂确认交互 (Nested Form in Popover)",
      "render": "<div style=\"max-width:260px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:12px; font-size:12px;\"><div style=\"font-weight:600; margin-bottom:6px;\">修改公会名</div><input type=\"text\" class=\"g-input\" value=\"弑神战队\" style=\"width:100%; font-size:12px; margin-bottom:8px;\"><div style=\"display:flex; justify-content:flex-end; gap:6px;\"><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">取消</button><button class=\"g-btn g-btn-primary\" style=\"padding:2px 8px; font-size:11px;\" onclick=\"showToast('公会名已修改', 'success')\">确定</button></div></div>",
      "code": "# GDScript: 嵌套表单气泡\npop.add_child(custom_form)"
    },
    {
      "title": "4. 多方向定位 (Placement: Top / Bottom / Left / Right)",
      "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">上方 (Top)</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">下方 (Bottom)</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">左侧 (Left)</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">右侧 (Right)</button></div>",
      "code": "# GDScript: 方位设定\npop.placement = GPopover.Placement.TOP"
    },
    {
      "title": "5. 游戏技能图标悬浮详情浮窗 (Game Skill Hover Popover)",
      "render": "<div style=\"display:inline-flex; align-items:center; gap:8px; background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px; border:1px solid #a855f7;\"><div style=\"font-size:24px;\">🔮</div><div style=\"font-size:12px;\"><div style=\"color:#a855f7; font-weight:700;\">虚空黑洞 (Lv.5)</div><div style=\"color:var(--text-secondary); font-size:11px;\">消耗 120 MP | 冷却 30秒</div></div></div>",
      "code": "# GDScript: 技能详情气泡\nvar skill_pop = GPopover.new_skill_tooltip(skill_data)"
    }
  ],
  "props": [
    {
      "name": "placement",
      "type": "enum",
      "default": "BOTTOM",
      "desc": "弹出定位：TOP, BOTTOM, LEFT, RIGHT",
      "version": "v1.0"
    },
    {
      "name": "theme",
      "type": "enum",
      "default": "DARK",
      "desc": "主题风格：DARK (深色), LIGHT (浅色)",
      "version": "v1.0"
    },
    {
      "name": "actions",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "菜单选项列表 [{\"text\": \"\", \"icon\": Texture2D, \"disabled\": false}]",
      "version": "v1.0"
    },
    {
      "name": "show_arrow",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示小三角箭头",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "item_selected(index, action)",
      "desc": "点击菜单项时触发",
      "params": "(index: int, action: Dictionary)",
      "version": "v1.0"
    },
    {
      "name": "opened()",
      "desc": "气泡打开时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "closed()",
      "desc": "气泡关闭时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "add_action(text, icon=null, disabled=false)",
      "desc": "动态添加单个气泡菜单项",
      "params": "(text: String, icon: Texture2D, disabled: bool) -> void",
      "version": "v1.0"
    },
    {
      "name": "add_actions(action_list: Array[Dictionary])",
      "desc": "批量追加一组气泡菜单项",
      "params": "(action_list: Array[Dictionary]) -> void",
      "version": "v1.0"
    },
    {
      "name": "open_for_node(target: Control)",
      "desc": "针对指定控件节点弹出气泡",
      "params": "(target: Control) -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "关闭气泡框",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "toggle_for_node(target: Control)",
      "desc": "切换气泡开启/关闭",
      "params": "(target: Control) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "触发气泡的宿主目标节点插槽",
      "child": "GButton / Control",
      "example": "<template #default><GButton icon=\"ellipsis\">更多</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "content",
      "desc": "气泡弹出卡片内部自定义内容插槽",
      "child": "Control / VBoxContainer",
      "example": "<template #content><VBoxContainer><GButton icon=\"qrcode\">扫一扫</GButton></VBoxContainer></template>",
      "version": "v1.0"
    }
  ]
};
