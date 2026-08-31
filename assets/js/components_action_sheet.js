// =========================================================================
// Gotod Components UI - Component: action-sheet
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['action-sheet'] = {
  "title": "ActionSheet 动作面板 (GActionSheet)",
  "desc": "从页面底部弹出的模态操作菜单，用于提供一组与当前上下文相关的备选操作，深度对标 Vant UI 动作面板规范，支持标题、子标题、危险项高亮与取消按钮。",
  "demos": [
    {
      "title": "1. 基础动作面板 (Basic ActionSheet)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('从底部滑出动作面板', 'info')\">📋 打开操作面板</button>",
      "code": "# GDScript: 动作面板\nvar sheet = GActionSheet.new()\nsheet.actions = [\"私聊好友\", \"邀请入队\", \"查看装备\"]\nsheet.show_sheet()"
    },
    {
      "title": "2. 展示描述与取消按钮 (Description & Cancel Button)",
      "render": "<div style=\"max-width:300px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden; font-size:13px; text-align:center;\"><div style=\"padding:10px; color:var(--text-secondary); font-size:11px; border-bottom:1px solid var(--border-base);\">确定要将该玩家移出公会吗？</div><div style=\"padding:10px; color:var(--danger); font-weight:700; border-bottom:1px solid var(--border-base); cursor:pointer;\">踢出公会</div><div style=\"padding:10px; color:var(--text-secondary); cursor:pointer;\">取消</div></div>",
      "code": "# GDScript: 带描述\nsheet.description = \"确定要将该玩家移出公会吗？\""
    },
    {
      "title": "3. 危险项与禁用项 (Destructive & Disabled Actions)",
      "render": "<div style=\"max-width:300px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden; font-size:13px; text-align:center;\"><div style=\"padding:10px; border-bottom:1px solid var(--border-base); color:var(--primary);\">正常操作：提升为副会长</div><div style=\"padding:10px; border-bottom:1px solid var(--border-base); color:var(--text-secondary); opacity:0.4; cursor:not-allowed;\">转让会长 (等级不足 Lv.50)</div><div style=\"padding:10px; color:var(--danger); font-weight:700;\">解散公会 (危险)</div></div>",
      "code": "# GDScript: 危险项与禁用\nsheet.set_action_destructive(2, true)\nsheet.set_action_disabled(1, true)"
    },
    {
      "title": "4. 异步操作与加载状态 (Async Loading in Action)",
      "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('正在向服务器同步解绑请求...', 'info')\"><i class=\"fa-solid fa-spinner fa-spin\"></i> 解除账号绑定中...</button>",
      "code": "# GDScript: 异步加载\nsheet.set_action_loading(0, true)"
    },
    {
      "title": "5. 游戏玩家名片快捷交互菜单 (Player Profile Actions)",
      "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px;\">👤 查看玩家名片</button><button class=\"g-btn g-btn-success\" style=\"font-size:12px;\">⚔️ 申请切磋</button><button class=\"g-btn g-btn-warning\" style=\"font-size:12px;\">🎁 赠送鲜花</button></div>",
      "code": "# GDScript: 玩家名片菜单\nvar player_sheet = GActionSheet.new_player_menu(target_player)"
    }
  ],
  "props": [
    {
      "name": "title",
      "type": "String",
      "default": "\"\"",
      "desc": "面板顶部标题"
    },
    {
      "name": "description",
      "type": "String",
      "default": "\"\"",
      "desc": "面板标题下方的描述信息"
    },
    {
      "name": "actions",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "面板选项列表 [{\"name\": \"\", \"subname\": \"\", \"danger\": false, \"disabled\": false}]"
    },
    {
      "name": "cancel_text",
      "type": "String",
      "default": "\"取消\"",
      "desc": "底部取消按钮文字"
    },
    {
      "name": "round_corner",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示圆角"
    }
  ],
  "events": [
    {
      "name": "select(item, index)",
      "desc": "点击选项时触发",
      "params": "(item: Dictionary, index: int)"
    },
    {
      "name": "cancel()",
      "desc": "点击取消按钮时触发",
      "params": "()"
    }
  ],
  "methods": [
    {
      "name": "add_action(name, subname=\"\", danger=false, disabled=false)",
      "desc": "动态添加单个动作项",
      "params": "(name: String, subname: String, danger: bool, disabled: bool) -> void"
    },
    {
      "name": "add_actions(action_list: Array[Dictionary])",
      "desc": "批量追加一组动作面板选项",
      "params": "(action_list: Array[Dictionary]) -> void"
    },
    {
      "name": "open()",
      "desc": "呼出底部动作面板",
      "params": "() -> void"
    },
    {
      "name": "close()",
      "desc": "关闭动作面板",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "title",
      "desc": "面板顶部标题或说明插槽",
      "child": "GText / Label",
      "example": "<template #title><h4>请选择快捷分享方式</h4></template>"
    },
    {
      "name": "action",
      "desc": "自定义每个操作条目渲染插槽（透传 { item, index }）",
      "child": "Control / GButton",
      "example": "<template #action=\"{ item }\"><GButton icon=\"share\">{{ item.name }}</GButton></template>"
    },
    {
      "name": "cancel",
      "desc": "底部取消按钮插槽",
      "child": "GButton",
      "example": "<template #cancel><GButton>关闭面板</GButton></template>"
    }
  ]
};
