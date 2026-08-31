// =========================================================================
// Gotod Components UI - Component Catalog Part 4 / 6
// Group: popup, overlay, action-sheet, popover, notice-bar, message, toast
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "popup": {
    "title": "Popup 弹出层 (GPopup)",
    "desc": "弹出层容器，用于展示多方向弹出的面板、规格选择器、快捷菜单或对话框。深度对标 Vant UI Popup 规范，支持居中缩放、顶部滑出、底部抽屉、左右侧滑、大圆角与关闭图标定制。",
    "demos": [
      {
        "title": "1. 基础弹出层 (Basic Popup)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('居中弹出 Popup 内容', 'info')\">居中弹出层</button>",
        "code": "# GDScript: 基础弹出层\nvar pop = GPopup.new()\npop.show_popup()"
      },
      {
        "title": "2. 四向弹出 (Top / Bottom / Left / Right)",
        "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\">从顶部滑出</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\">从底部滑出</button></div>",
        "code": "# GDScript: 底部弹出\npop.position = GPopup.Position.BOTTOM"
      },
      {
        "title": "3. 圆角与遮罩控制 (Round & Overlay)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('底部圆角弹出层', 'info')\">圆角弹出层</button>",
        "code": "# GDScript: 圆角弹出\npop.round = true"
      },
      {
        "title": "4. 关闭图标 (Close Icon)",
        "render": "<div style=\"background:var(--bg-surface); padding:8px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:8px; font-size:12px;\"><span>带右上角关闭键</span><i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\"></i></div>",
        "code": "# GDScript: 关闭图标\npop.closeable = true"
      },
      {
        "title": "5. 游戏底部装备更换抽屉菜单 (Game Gear Swap Popup)",
        "render": "<div style=\"max-width:320px; background:var(--bg-surface); padding:10px; border-radius:8px; border:1px solid var(--border-base); font-size:12px;\"><div style=\"font-weight:700; margin-bottom:6px;\">更换武器装备</div><div style=\"display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); padding:6px 10px; border-radius:4px;\"><span>破晓之刃 (+850 攻)</span><button class=\"g-btn g-btn-primary\" style=\"font-size:10px; padding:1px 6px;\">装备</button></div></div>",
        "code": "# GDScript: 游戏装备更换\nvar gear_pop = GPopup.new_gear_swap()"
      }
    ],
    "props": [
      {
        "name": "position_type",
        "type": "enum",
        "default": "CENTER",
        "desc": "弹出位置：CENTER (居中), TOP (顶部), BOTTOM (底部), LEFT (左侧), RIGHT (右侧)"
      },
      {
        "name": "round_corner",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示圆角 (顶部/底部弹出时自动为上方或下方大圆角)"
      },
      {
        "name": "closeable",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示右上角/左上角关闭图标"
      },
      {
        "name": "close_icon_position",
        "type": "enum",
        "default": "TOP_RIGHT",
        "desc": "关闭图标位置：TOP_RIGHT, TOP_LEFT, BOTTOM_RIGHT, BOTTOM_LEFT"
      },
      {
        "name": "overlay",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示背景遮罩层"
      },
      {
        "name": "close_on_click_overlay",
        "type": "boolean",
        "default": "true",
        "desc": "是否在点击背景遮罩层后自动关闭"
      },
      {
        "name": "duration",
        "type": "float",
        "default": "0.3",
        "desc": "过渡动画时长 (秒)"
      }
    ],
    "events": [
      {
        "name": "opened()",
        "desc": "弹出层打开动画结束时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "弹出层关闭动画结束时触发",
        "params": "()"
      },
      {
        "name": "click_overlay()",
        "desc": "点击背景遮罩层时触发",
        "params": "()"
      },
      {
        "name": "click_close_icon()",
        "desc": "点击关闭图标时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "open()",
        "desc": "打开弹出层并执行对应方位的 Tween 滑入/缩放动效",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭弹出层并执行滑出/淡出动效",
        "params": "() -> void"
      },
      {
        "name": "toggle()",
        "desc": "切换弹出层的开启/关闭状态",
        "params": "() -> void"
      },
      {
        "name": "set_content(node)",
        "desc": "动态设置弹出层内部承载的子节点内容",
        "params": "(node: Control) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "弹层主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><div class=\"goods-sku-panel\">...</div></template>"
      },
      {
        "name": "header",
        "desc": "顶部标题/导航栏插槽",
        "child": "HBoxContainer",
        "example": "<template #header><h4>选择武器精炼规格</h4></template>"
      },
      {
        "name": "close",
        "desc": "自定义关闭按钮插槽",
        "child": "GButton / GIcon",
        "example": "<template #close><GIcon name=\"xmark\" /></template>"
      }
    ]
  },
  "overlay": {
    "title": "Overlay 遮罩层 (GOverlay)",
    "desc": "创建一个全屏遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。深度对标 Vant UI Overlay 规范，支持内嵌居中卡片插槽与背景淡入淡出。",
    "demos": [
      {
        "title": "1. 基础遮罩层 (Basic Overlay)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('显示全屏背景遮罩', 'info')\">显示遮罩层</button>",
        "code": "# GDScript: 基础遮罩\nvar overlay = GOverlay.new()\noverlay.show()"
      },
      {
        "title": "2. 嵌入居中内容 (Embedded Content in Overlay)",
        "render": "<div style=\"max-width:280px; height:80px; background:rgba(0,0,0,0.6); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px;\">遮罩中居中展示的内容</div>",
        "code": "# GDScript: 居中内容\noverlay.add_child(center_box)"
      },
      {
        "title": "3. 点击遮罩关闭事件 (Close on Click Overlay)",
        "render": "<span style=\"font-size:12px; color:var(--text-secondary);\">默认点击遮罩空白区域自动平滑淡出关闭</span>",
        "code": "# GDScript: 点击关闭\noverlay.close_on_click = true"
      },
      {
        "title": "4. 毛玻璃虚化特效 (Backdrop Blur Effect)",
        "render": "<div style=\"background:rgba(255,255,255,0.08); backdrop-filter:blur(6px); padding:8px 14px; border-radius:6px; font-size:12px;\">高斯模糊毛玻璃遮罩</div>",
        "code": "# GDScript: 毛玻璃\noverlay.backdrop_blur = true"
      },
      {
        "title": "5. 游戏全屏暂停蒙层 (Game Pause Menu Overlay)",
        "render": "<div style=\"max-width:320px; background:rgba(0,0,0,0.8); border:1px solid #475569; border-radius:8px; padding:14px; text-align:center; color:#fff;\"><div style=\"font-size:16px; font-weight:800; margin-bottom:10px;\">⏸️ 游戏已暂停</div><div style=\"display:flex; justify-content:center; gap:8px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:11px;\">继续游戏</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">退出关卡</button></div></div>",
        "code": "# GDScript: 游戏暂停蒙层\nvar pause_overlay = GOverlay.new_pause_menu()"
      }
    ],
    "props": [
      {
        "name": "mask_color",
        "type": "Color",
        "default": "Color(0, 0, 0, 0.7)",
        "desc": "遮罩背景颜色与透明度"
      },
      {
        "name": "duration",
        "type": "float",
        "default": "0.3",
        "desc": "淡入淡出动画时长 (秒)"
      },
      {
        "name": "lock_scroll",
        "type": "boolean",
        "default": "true",
        "desc": "是否锁定底层滚动或输入阻断"
      }
    ],
    "events": [
      {
        "name": "click()",
        "desc": "点击遮罩层时触发",
        "params": "()"
      },
      {
        "name": "opened()",
        "desc": "遮罩层淡入打开结束时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "遮罩层淡出关闭结束时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "open()",
        "desc": "打开遮罩层并播放淡入动效",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭遮罩层并播放淡出动效",
        "params": "() -> void"
      },
      {
        "name": "toggle()",
        "desc": "切换遮罩层的开启与关闭状态",
        "params": "() -> void"
      },
      {
        "name": "set_content(node)",
        "desc": "向遮罩层中央插槽挂载自定义控件节点",
        "params": "(node: Control) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "遮罩层内部居中/挂载的子节点插槽",
        "child": "Control",
        "example": "<template #default><div class=\"center-loading-card\">数据同步中...</div></template>"
      }
    ]
  },
  "action-sheet": {
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
  },
  "popover": {
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
        "desc": "弹出定位：TOP, BOTTOM, LEFT, RIGHT"
      },
      {
        "name": "theme",
        "type": "enum",
        "default": "DARK",
        "desc": "主题风格：DARK (深色), LIGHT (浅色)"
      },
      {
        "name": "actions",
        "type": "Array[Dictionary]",
        "default": "[]",
        "desc": "菜单选项列表 [{\"text\": \"\", \"icon\": Texture2D, \"disabled\": false}]"
      },
      {
        "name": "show_arrow",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示小三角箭头"
      }
    ],
    "events": [
      {
        "name": "item_selected(index, action)",
        "desc": "点击菜单项时触发",
        "params": "(index: int, action: Dictionary)"
      },
      {
        "name": "opened()",
        "desc": "气泡打开时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "气泡关闭时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "add_action(text, icon=null, disabled=false)",
        "desc": "动态添加单个气泡菜单项",
        "params": "(text: String, icon: Texture2D, disabled: bool) -> void"
      },
      {
        "name": "add_actions(action_list: Array[Dictionary])",
        "desc": "批量追加一组气泡菜单项",
        "params": "(action_list: Array[Dictionary]) -> void"
      },
      {
        "name": "open_for_node(target: Control)",
        "desc": "针对指定控件节点弹出气泡",
        "params": "(target: Control) -> void"
      },
      {
        "name": "close()",
        "desc": "关闭气泡框",
        "params": "() -> void"
      },
      {
        "name": "toggle_for_node(target: Control)",
        "desc": "切换气泡开启/关闭",
        "params": "(target: Control) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "触发气泡的宿主目标节点插槽",
        "child": "GButton / Control",
        "example": "<template #default><GButton icon=\"ellipsis\">更多</GButton></template>"
      },
      {
        "name": "content",
        "desc": "气泡弹出卡片内部自定义内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #content><VBoxContainer><GButton icon=\"qrcode\">扫一扫</GButton></VBoxContainer></template>"
      }
    ]
  },
  "notice-bar": {
    "title": "NoticeBar 通知栏 (GNoticeBar)",
    "desc": "在页面顶部展示通告栏，用于向用户广播消息或系统维护通知。深度对标 Vant UI 通知栏规范，支持平滑滚动跑马灯、警示/信息/成功色彩与关闭按钮。",
    "demos": [
      {
        "title": "1. 基础跑马灯滚动 (Basic Scrolling NoticeBar)",
        "render": "<div class=\"g-notice-bar\" style=\"background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; display:flex; align-items:center; gap:8px; font-size:12px; color:#e6a23c; overflow:hidden;\"><i class=\"fa-solid fa-volume-high\"></i><div style=\"white-space:nowrap; overflow:hidden; text-overflow:ellipsis;\">【全服广播】恭喜玩家【龙之誓约】抽中不朽神话武器【圣辉破晓之剑】！</div></div>",
        "code": "# GDScript: 基础跑马灯\nvar notice = GNoticeBar.new(\"【全服广播】恭喜玩家抽中神话装备！\")\nnotice.scrollable = true\nadd_child(notice)"
      },
      {
        "title": "2. 滚动速度控制 (Scroll Speed)",
        "render": "<div class=\"g-notice-bar\" style=\"background:rgba(64,158,255,0.1); border:1px solid rgba(64,158,255,0.3); border-radius:4px; padding:8px 12px; display:flex; align-items:center; gap:8px; font-size:12px; color:var(--primary);\"><i class=\"fa-solid fa-bell\"></i><span>极速滚动模式 (Speed: 80px/s)</span></div>",
        "code": "# GDScript: 滚动速度\nnotice.speed = 80.0"
      },
      {
        "title": "3. 可关闭模式 (Closeable Mode)",
        "render": "<div class=\"g-notice-bar\" style=\"background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--danger);\"><div style=\"display:flex; align-items:center; gap:8px;\"><i class=\"fa-solid fa-triangle-exclamation\"></i><span>服务器将于今晚 24:00 进行停服热更维护。</span></div><i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.style.display='none'; showToast('通告已关闭', 'info')\"></i></div>",
        "code": "# GDScript: 可关闭\nnotice.mode = GNoticeBar.Mode.CLOSEABLE"
      },
      {
        "title": "4. 垂直多条通告轮播 (Vertical Multi-Notice Swiper)",
        "render": "<div style=\"max-width:380px; height:32px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:4px; padding:0 12px; display:flex; align-items:center; font-size:12px; overflow:hidden;\"><i class=\"fa-solid fa-bullhorn\" style=\"color:var(--warning); margin-right:8px;\"></i><span>1. 跨服公会战报名现已火热开启！</span></div>",
        "code": "# GDScript: 垂直轮播\nnotice.direction = GNoticeBar.Direction.VERTICAL"
      },
      {
        "title": "5. 游戏全服大喇叭广播 (Game World Speaker Notice)",
        "render": "<div style=\"background:linear-gradient(90deg, #1e1b4b, #312e81); border:1px solid #ffd04b; border-radius:6px; padding:8px 14px; display:flex; align-items:center; gap:10px; color:#ffd04b; font-size:13px; font-weight:700;\"><span style=\"color:#fff; font-weight:400; font-size:12px;\">📢【剑心】: 100 级地狱副本缺强力奶妈，速来上车！(4/5)</span></div>",
        "code": "# GDScript: 游戏大喇叭\nvar speaker = GNoticeBar.new_world_speaker(\"剑心\", \"100 级地狱副本缺奶妈！\")"
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"\"",
        "desc": "通告栏文本内容"
      },
      {
        "name": "scrollable",
        "type": "boolean",
        "default": "true",
        "desc": "是否开启水平无缝循环滚动跑马灯"
      },
      {
        "name": "scroll_speed",
        "type": "float",
        "default": "50.0",
        "desc": "滚动速度 (像素/秒)"
      },
      {
        "name": "notice_type",
        "type": "enum",
        "default": "WARNING",
        "desc": "通知色彩风格：WARNING (警示橙), INFO (信息蓝), SUCCESS (成功绿), DANGER (紧急红)"
      }
    ],
    "events": [
      {
        "name": "click()",
        "desc": "点击通告栏主体时触发",
        "params": "()"
      },
      {
        "name": "close()",
        "desc": "点击右侧关闭图标时触发",
        "params": "()"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "滚动播报文本主体插槽",
        "child": "Label / RichTextLabel",
        "example": "<template #default><span>🔥 [重要通告] 全服限时掉落双倍神话强化石！</span></template>"
      },
      {
        "name": "left-icon",
        "desc": "左侧通知喇叭图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #left-icon><GIcon name=\"bullhorn\" /></template>"
      },
      {
        "name": "right-icon",
        "desc": "右侧更多/关闭操作区插槽",
        "child": "GIcon / GButton",
        "example": "<template #right-icon><GIcon name=\"chevron-right\" /></template>"
      }
    ]
  },
  "message": {
    "title": "Message 全局提示 (GMessage)",
    "desc": "全局悬浮吐司提示（Autoload 单例），在页面顶部居中堆叠展示，支持自动倒计时移除与进入/淡出动效。",
    "demos": [
      {
        "title": "1. 基础主要提示 (Basic Info Message)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('这是一条基础顶部消息提示', 'info')\">弹出顶部提示 (Info)</button>",
        "code": "# GDScript: 全局提示\nGMessage.info(\"这是一条普通消息提示\")"
      },
      {
        "title": "2. 四大主题语义色 (4 Semantic Types)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-success\" style=\"font-size:12px;\" onclick=\"showToast('操作成功！数据已持久化', 'success')\">成功 (Success)</button><button class=\"g-btn g-btn-warning\" style=\"font-size:12px;\" onclick=\"showToast('网络波动，可能存在延迟', 'warning')\">警告 (Warning)</button><button class=\"g-btn g-btn-danger\" style=\"font-size:12px;\" onclick=\"showToast('连接超时，请检查网络', 'error')\">错误 (Error)</button></div>",
        "code": "# GDScript: 语义化消息\nGMessage.success(\"恭喜强化成功！\")\nGMessage.warning(\"背包空间不足\")\nGMessage.error(\"金币不足，无法购买\")"
      },
      {
        "title": "3. 可手动关闭消息 (Closable Message)",
        "render": "<div style=\"background:rgba(64,158,255,0.1); border:1px solid rgba(64,158,255,0.3); border-radius:6px; padding:8px 14px; display:inline-flex; align-items:center; gap:10px; font-size:13px; color:var(--primary);\"><span>这是一条需要玩家手动关闭的重要提示</span><i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.remove()\"></i></div>",
        "code": "# GDScript: 可关闭消息\nGMessage.show({ \"text\": \"重要系统消息\", \"closable\": true, \"duration\": 0 })"
      },
      {
        "title": "4. 自定义图标与停留时长 (Custom Icon & Duration)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('⭐ 获得成就【初出茅庐】！', 'success')\">🏆 弹出自定义成就消息</button>",
        "code": "# GDScript: 自定义成就消息\nGMessage.show({ \"text\": \"获得成就【初出茅庐】！\", \"icon\": \"trophy\", \"duration\": 5.0 })"
      },
      {
        "title": "5. 游戏战斗连击与金币拾取消息 (Game Combo & Coin Popup)",
        "render": "<div style=\"display:flex; gap:12px;\"><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('🪙 拾取金币 +500！', 'success')\">🪙 拾取金币</button><button class=\"g-btn g-btn-danger\" style=\"font-weight:700;\" onclick=\"showToast('🔥 100 连击 (COMBO x100)!', 'error')\">💥 100 连击</button></div>",
        "code": "# GDScript: 战斗金币消息\nGMessage.new_game_loot(\"🪙 获得金币 +500\")"
      }
    ],
    "props": [],
    "events": [],
    "methods": [
      {
        "name": "success(content: String, duration: float = 3.0)",
        "desc": "弹出成功提示",
        "params": "(content: String, duration: float) -> void"
      },
      {
        "name": "warning(content: String, duration: float = 3.0)",
        "desc": "弹出警告提示",
        "params": "(content: String, duration: float) -> void"
      },
      {
        "name": "error(content: String, duration: float = 3.0)",
        "desc": "弹出错误提示",
        "params": "(content: String, duration: float) -> void"
      },
      {
        "name": "info(content: String, duration: float = 3.0)",
        "desc": "弹出普通信息提示",
        "params": "(content: String, duration: float) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "全局轻量消息正文插槽",
        "child": "Label / RichTextLabel",
        "example": "<template #default><span>系统配置已成功保存！</span></template>"
      },
      {
        "name": "icon",
        "desc": "自定义前置状态图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #icon><GIcon name=\"circle-check\" style=\"color:green;\" /></template>"
      }
    ]
  },
  "toast": {
    "title": "Toast 轻提示 (GToast)",
    "desc": "在页面中间或顶部/底部弹出轻量级半透明黑色反馈气泡，用于即时反馈、成功、失败、加载中与倒计时等场景。深度对标 Vant UI 轻提示规范，支持静态单例直接调用与流畅链式 API。",
    "demos": [
      {
        "title": "1. 文字轻提示 (Text Toast)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('这是一条居中轻提示文字', 'info')\">弹出文字 Toast</button>",
        "code": "# GDScript: 文字 Toast\nGToast.show(\"操作已记录\")"
      },
      {
        "title": "2. 成功与失败图标提示 (Success / Fail Toast)",
        "render": "<div style=\"display:flex; gap:10px;\"><button class=\"g-btn g-btn-success\" onclick=\"showToast('强化成功！', 'success')\">成功提示</button><button class=\"g-btn g-btn-danger\" onclick=\"showToast('网络连接中断！', 'error')\">失败提示</button></div>",
        "code": "# GDScript: 成功/失败\nGToast.success(\"强化成功！\")\nGToast.fail(\"网络连接失败\")"
      },
      {
        "title": "3. 加载中 Loading 提示 (Loading Toast)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('数据同步中 (Loading)...', 'info')\">⏳ Loading 提示</button>",
        "code": "# GDScript: 加载提示\nGToast.loading(\"正在下载地图包...\")"
      },
      {
        "title": "4. 自定义位置与时长 (Position: Top / Middle / Bottom)",
        "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">顶部</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">居中</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">底部</button></div>",
        "code": "# GDScript: 位置与时长\nGToast.show(\"底部提示\", GToast.Position.BOTTOM, 2.0)"
      },
      {
        "title": "5. 游戏保存存档与联网重试 Toast (Game Save & Retry Toast)",
        "render": "<button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('💾 游戏存档已写入 Slot 1', 'success')\">💾 游戏自动存档</button>",
        "code": "# GDScript: 游戏存档 Toast\nGToast.new_game_saved(1)"
      }
    ],
    "props": [
      {
        "name": "type",
        "type": "enum",
        "default": "TEXT",
        "desc": "提示类型：TEXT (纯文字), INFO (信息), WARNING (警告), SUCCESS (成功), FAIL (失败), LOADING (加载转圈), CUSTOM (自定义)"
      },
      {
        "name": "message",
        "type": "String",
        "default": "\"\"",
        "desc": "提示文本内容"
      },
      {
        "name": "position",
        "type": "enum",
        "default": "MIDDLE",
        "desc": "提示显示位置：TOP, MIDDLE, BOTTOM"
      },
      {
        "name": "duration",
        "type": "float",
        "default": "2.0",
        "desc": "展示时长 (秒)，设置为 0 时不自动关闭"
      },
      {
        "name": "forbid_click",
        "type": "boolean",
        "default": "false",
        "desc": "是否启用透明遮罩禁止背景点击穿透"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "show(message, duration=2.0, position=MIDDLE)",
        "desc": "弹出文字提示",
        "params": "(message: String, duration: float, position: int) -> GToast"
      },
      {
        "name": "success(message, duration=2.0)",
        "desc": "弹出成功状态提示 (带对勾图标)",
        "params": "(message: String, duration: float) -> GToast"
      },
      {
        "name": "fail(message, duration=2.0)",
        "desc": "弹出失败状态提示 (带叉号图标)",
        "params": "(message: String, duration: float) -> GToast"
      },
      {
        "name": "loading(message=\"加载中...\", forbid_click=true, duration=0.0)",
        "desc": "弹出加载中转圈提示",
        "params": "(message: String, forbid_click: bool, duration: float) -> GToast"
      },
      {
        "name": "custom(options: Dictionary)",
        "desc": "使用完整配置字典弹出轻提示",
        "params": "(options: Dictionary) -> GToast"
      },
      {
        "name": "set_message(new_msg: String)",
        "desc": "动态更新当前正在展示的轻提示文本 (如倒计时)",
        "params": "(new_msg: String) -> GToast"
      },
      {
        "name": "clear()",
        "desc": "一键清除并关闭当前所有正在展示的轻提示",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "Toast 提示正文内容插槽",
        "child": "Label / RichTextLabel",
        "example": "<template #default><span>获得成就：初出茅庐 🎖️</span></template>"
      },
      {
        "name": "icon",
        "desc": "自定义 Toast 图标或 Loading 动画插槽",
        "child": "GIcon / TextureRect / GLoading",
        "example": "<template #icon><GIcon name=\"medal\" /></template>"
      }
    ]
  }
});
