// =========================================================================
// Gotod Components UI - Component Catalog Part 5 / 6
// Group: alert, drawer, tooltip, loading, skeleton, tour, card
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "alert": {
    "title": "Alert 警告提示 (GAlert)",
    "desc": "用于页面中展示重要的提示信息。支持成功、警告、危险与信息4种状态色彩，支持关闭按钮。",
    "demos": [
      {
        "title": "1. 基础主题语义色 (4 Semantic Types)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:10px; max-width:440px;\"><div class=\"g-alert g-alert-success\" style=\"background:rgba(103,194,58,0.1); border:1px solid rgba(103,194,58,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--success);\"><i class=\"fa-solid fa-circle-check\"></i> 成功：当前关卡存档已成功同步至云端！</div><div class=\"g-alert g-alert-warning\" style=\"background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--warning);\"><i class=\"fa-solid fa-triangle-exclamation\"></i> 警告：当前角色处于红名通缉状态，死亡将掉落装备。</div><div class=\"g-alert g-alert-danger\" style=\"background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--danger);\"><i class=\"fa-solid fa-circle-xmark\"></i> 危险：网络连接已断开，正在尝试重连...</div></div>",
        "code": "# GDScript: 基础警告条\nvar alert_s = GAlert.new(\"存档已同步\", GotodTheme.Type.SUCCESS)\nadd_child(alert_s)"
      },
      {
        "title": "2. 带有辅助性描述文字 (Alert with Description)",
        "render": "<div style=\"max-width:440px; background:rgba(64,158,255,0.08); border:1px solid rgba(64,158,255,0.3); border-radius:6px; padding:10px 14px;\"><div style=\"font-weight:700; color:var(--primary); font-size:13px; margin-bottom:4px;\"><i class=\"fa-solid fa-circle-info\"></i> 版本更新内容说明</div><div style=\"font-size:12px; color:var(--text-secondary); line-height:1.5;\">本次更新重构了 26,000+ 矢量图标库，大幅提升了在 4K 游戏高分屏下的渲染锐度与加载速度。</div></div>",
        "code": "# GDScript: 带描述警告\nalert.title = \"版本更新内容说明\"\nalert.description = \"本次更新重构了 26,000+ 矢量图标库...\""
      },
      {
        "title": "3. 自定义关闭按钮与回调 (Closable Alert)",
        "render": "<div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;\"><span>💡 提示：按键盘 ESC 键可随时呼出主菜单。</span><span style=\"color:var(--primary); cursor:pointer; font-weight:600;\" onclick=\"this.parentElement.remove()\">知道了</span></div>",
        "code": "# GDScript: 自定义关闭\nalert.close_text = \"知道了\""
      },
      {
        "title": "4. 居中对齐排版 (Center Alignment)",
        "render": "<div style=\"max-width:440px; background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; text-align:center; font-size:12px; color:var(--warning);\"><i class=\"fa-solid fa-shield-halved\"></i> 安全提示：请勿向任何人透露您的游戏账号密码</div>",
        "code": "# GDScript: 居中对齐\nalert.center = true"
      },
      {
        "title": "5. 游戏系统维护与封禁警告 (Game Maintenance Warning)",
        "render": "<div style=\"max-width:440px; background:linear-gradient(90deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05)); border-left:4px solid #ef4444; padding:10px 14px; border-radius:0 6px 6px 0;\"><div style=\"font-weight:700; color:#ef4444; font-size:13px;\">🚨 账号安全异常警告</div><div style=\"font-size:11px; color:var(--text-secondary); margin-top:2px;\">检测到异地 IP 登录，已临时限制金币交易功能。</div></div>",
        "code": "# GDScript: 游戏警告\nvar ban_alert = GAlert.new_game_warning(\"账号安全异常\", \"检测到异地登录\")"
      }
    ],
    "props": [
      {
        "name": "type",
        "type": "enum",
        "default": "INFO",
        "desc": "类型：INFO, SUCCESS, WARNING, DANGER"
      },
      {
        "name": "title",
        "type": "String",
        "default": "\"Alert Title\"",
        "desc": "标题文本"
      },
      {
        "name": "description",
        "type": "String",
        "default": "\"\"",
        "desc": "辅助描述详细说明"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示关闭按钮"
      },
      {
        "name": "center",
        "type": "boolean",
        "default": "false",
        "desc": "文字是否居中"
      }
    ],
    "events": [
      {
        "name": "closed()",
        "desc": "点击关闭按钮时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "close()",
        "desc": "关闭并移除该 Alert",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "提示内容正文插槽",
        "child": "Label / RichTextLabel",
        "example": "<template #default><span>核心渲染节点已就绪，耗时 12ms。</span></template>"
      },
      {
        "name": "title",
        "desc": "提示标题插槽",
        "child": "GText / Label",
        "example": "<template #title><b>初始化成功</b></template>"
      },
      {
        "name": "icon",
        "desc": "自定义前置状态图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #icon><GIcon name=\"circle-info\" /></template>"
      },
      {
        "name": "close",
        "desc": "自定义右上角关闭按钮插槽",
        "child": "GButton / GIcon",
        "example": "<template #close><GIcon name=\"xmark\" /></template>"
      },
      {
        "name": "action",
        "desc": "提示右侧/底部快捷操作项插槽",
        "child": "GButton / HBoxContainer",
        "example": "<template #action><GButton size=\"small\">查看详情</GButton></template>"
      }
    ]
  },
  "drawer": {
    "title": "Drawer 抽屉 (GDrawer)",
    "desc": "从屏幕边缘平滑滑出的浮层面板。支持从上、下、左、右四个方位滑出，内嵌长表单、设置项与自定义操作。",
    "demos": [
      {
        "title": "1. 基础右侧抽屉 (Basic Right Drawer)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('从屏幕右侧滑出抽屉面板', 'info')\">👉 打开右侧抽屉</button>",
        "code": "# GDScript: 右侧抽屉\nvar drawer = GDrawer.new()\ndrawer.direction = GDrawer.Direction.RIGHT\ndrawer.show_drawer()"
      },
      {
        "title": "2. 四向滑出位置 (Directions: Left / Top / Bottom / Right)",
        "render": "<div style=\"display:flex; gap:8px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"showToast('从左侧打开抽屉', 'info')\">左侧 (Left)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"showToast('从顶部打开抽屉', 'info')\">顶部 (Top)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"showToast('从底部打开抽屉', 'info')\">底部 (Bottom)</button></div>",
        "code": "# GDScript: 四向抽屉\ndrawer.direction = GDrawer.Direction.LEFT"
      },
      {
        "title": "3. 自定义宽度尺寸 (Custom Size / Percentage)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('打开 40% 屏幕宽度的宽屏抽屉', 'info')\">打开 40% 宽屏抽屉</button>",
        "code": "# GDScript: 抽屉宽度\ndrawer.size_ratio = 0.4"
      },
      {
        "title": "4. 抽屉内嵌套操作表单 (Drawer with Form & Actions)",
        "render": "<div style=\"max-width:320px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:12px; font-size:12px;\"><div style=\"font-weight:700; margin-bottom:8px;\">角色属性调优</div><input type=\"text\" class=\"g-input\" placeholder=\"角色昵称...\" style=\"width:100%; margin-bottom:8px;\"><div style=\"display:flex; justify-content:flex-end; gap:6px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:3px 10px;\">保存修改</button></div></div>",
        "code": "# GDScript: 抽屉表单\ndrawer.add_child(config_form)"
      },
      {
        "title": "5. 游戏玩家背包与装备侧滑栏 (Game Inventory Drawer)",
        "render": "<div style=\"max-width:340px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:12px;\"><div style=\"display:flex; justify-content:space-between; font-weight:700; font-size:13px; margin-bottom:10px;\"><span>🎒 随身储物空间 (38/50)</span><span style=\"color:#e6a23c;\">12,500 🪙</span></div><div style=\"display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;\"><div style=\"height:44px; background:var(--bg-card); border:1px solid #e6a23c; border-radius:4px; display:flex; align-items:center; justify-content:center;\">⚔️</div><div style=\"height:44px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:4px; display:flex; align-items:center; justify-content:center;\">🧪</div><div style=\"height:44px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:4px; display:flex; align-items:center; justify-content:center;\">📜</div><div style=\"height:44px; background:var(--bg-card); border:1px dashed var(--border-base); border-radius:4px;\"></div></div></div>",
        "code": "# GDScript: 背包侧滑栏\nvar bag_drawer = GDrawer.new_inventory_drawer()"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Drawer Title\"",
        "desc": "抽屉标题"
      },
      {
        "name": "placement",
        "type": "enum",
        "default": "RIGHT",
        "desc": "展开方向：RIGHT, LEFT, TOP, BOTTOM"
      },
      {
        "name": "drawer_size",
        "type": "float",
        "default": "360.0",
        "desc": "抽屉宽度或高度 (像素)"
      },
      {
        "name": "mask_closable",
        "type": "boolean",
        "default": "true",
        "desc": "点击背景遮罩是否允许关闭"
      },
      {
        "name": "show_close",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示右上角关闭叉号"
      }
    ],
    "events": [
      {
        "name": "opened()",
        "desc": "抽屉滑出动画结束时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "抽屉滑回关闭时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "open()",
        "desc": "展开滑出抽屉面板",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "收起并关闭抽屉面板",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "抽屉主体内容插槽",
        "child": "Control / ScrollContainer",
        "example": "<template #default><ScrollContainer><VBoxContainer>...</VBoxContainer></ScrollContainer></template>"
      },
      {
        "name": "header",
        "desc": "抽屉顶部标题区插槽",
        "child": "HBoxContainer / GText",
        "example": "<template #header><h3>全局游戏设置</h3></template>"
      },
      {
        "name": "footer",
        "desc": "抽屉底部操作栏插槽",
        "child": "HBoxContainer / GSpace",
        "example": "<template #footer><GButton type=\"primary\">保存配置</GButton></template>"
      }
    ]
  },
  "tooltip": {
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
  },
  "loading": {
    "title": "Loading 加载指示器 (GLoading)",
    "desc": "加载数据时显示动效，防止用户以为系统卡死。",
    "demos": [
      {
        "title": "1. 局部容器加载 (Container Loading)",
        "render": "<div style=\"max-width:320px; height:80px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;\"><i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:20px; color:var(--primary);\"></i><span style=\"font-size:12px; color:var(--text-secondary);\">正在加载游戏资源...</span></div>",
        "code": "# GDScript: 局部加载\nGLoading.show_in_container(my_panel, \"正在加载游戏资源...\")"
      },
      {
        "title": "2. 自定义文案与动画图标 (Custom Text & Icon)",
        "render": "<div style=\"display:flex; align-items:center; gap:10px; font-size:13px;\"><i class=\"fa-solid fa-gear fa-spin\" style=\"font-size:22px; color:var(--success);\"></i><span>物理引擎初始化中 (gear spin)...</span></div>",
        "code": "# GDScript: 自定义图标\nGLoading.show({ \"icon\": \"gear\", \"text\": \"物理引擎初始化中...\" })"
      },
      {
        "title": "3. 全屏加载蒙层 (Full Screen Loading)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('全屏加载遮罩启动 (2秒后自动解除)...', 'info')\">全屏整页 Loading</button>",
        "code": "# GDScript: 全屏加载\nGLoading.show_fullscreen(\"正在同步服务器数据...\")"
      },
      {
        "title": "4. 背景透明度与毛玻璃控制 (Background Blur)",
        "render": "<div style=\"max-width:320px; height:70px; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); border-radius:8px; display:flex; align-items:center; justify-content:center; gap:8px; color:#fff; font-size:13px;\"><i class=\"fa-solid fa-rotate fa-spin\" style=\"color:#ffd04b;\"></i><span>高斯模糊毛玻璃加载</span></div>",
        "code": "# GDScript: 毛玻璃加载\nloading.background_blur = true"
      },
      {
        "title": "5. 游戏跨场景切换加载环 (Scene Switch Loading)",
        "render": "<div style=\"display:flex; align-items:center; gap:12px;\"><div style=\"width:36px; height:36px; border-radius:50%; border:3px solid var(--border-base); border-top-color:#a855f7; animation:fa-spin 1s infinite linear;\"></div><span style=\"font-size:12px; color:#a855f7; font-weight:600;\">正在进入副本：【堕落神殿】</span></div>",
        "code": "# GDScript: 场景切换加载\nGLoading.new_scene_loader(\"堕落神殿\")"
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"Loading...\"",
        "desc": "加载提示文字"
      },
      {
        "name": "spinner_size",
        "type": "float",
        "default": "36.0",
        "desc": "旋转圈尺寸 (像素)"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "default": "false",
        "desc": "是否覆盖全屏遮罩加载"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "show()",
        "desc": "显示加载指示器",
        "params": "() -> void"
      },
      {
        "name": "hide()",
        "desc": "隐藏加载指示器",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "被加载遮罩包裹的主体业务节点插槽",
        "child": "Control",
        "example": "<template #default><div class=\"game-data-table\">...</div></template>"
      },
      {
        "name": "spinner",
        "desc": "自定义 Loading 旋转图标或序列帧动画插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #spinner><GIcon name=\"spinner\" class=\"fa-spin\" /></template>"
      },
      {
        "name": "description",
        "desc": "加载提示文本插槽",
        "child": "Label / GText",
        "example": "<template #description>正在连接游戏服务器，请稍候...</template>"
      }
    ]
  },
  "skeleton": {
    "title": "Skeleton 骨架屏 (GSkeleton)",
    "desc": "在页面数据加载完成前，先展示出页面的大致结构与占位图，常用于首屏加载、列表拉取等场景，大幅减少用户等待焦虑。深度对标 Vant UI Skeleton 规范，支持头像、标题、多行段落与流光扫光动效。",
    "demos": [
      {
        "title": "1. 基础图文骨架屏 (Basic Skeleton)",
        "render": "<div style=\"max-width:360px; display:flex; gap:12px; align-items:center;\"><div style=\"width:40px; height:40px; border-radius:50%; background:var(--bg-surface); animation:gPulse 1.5s infinite;\"></div><div style=\"flex:1; display:flex; flex-direction:column; gap:6px;\"><div style=\"height:14px; width:50%; background:var(--bg-surface); border-radius:4px; animation:gPulse 1.5s infinite;\"></div><div style=\"height:12px; width:90%; background:var(--bg-surface); border-radius:4px; animation:gPulse 1.5s infinite;\"></div></div></div>",
        "code": "# GDScript: 基础骨架屏\nvar skel = GSkeleton.new()\nskel.rows = 2\nskel.has_avatar = true\nadd_child(skel)"
      },
      {
        "title": "2. 闪烁渐变波光动画 (Active Shimmer Animation)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:8px;\"><div style=\"height:16px; width:75%; background:linear-gradient(90deg, var(--bg-surface) 25%, var(--border-base) 50%, var(--bg-surface) 75%); background-size:200% 100%; border-radius:4px; animation:gPulse 1.2s infinite;\"></div><div style=\"height:16px; width:100%; background:linear-gradient(90deg, var(--bg-surface) 25%, var(--border-base) 50%, var(--bg-surface) 75%); background-size:200% 100%; border-radius:4px; animation:gPulse 1.2s infinite;\"></div></div>",
        "code": "# GDScript: 闪烁动画\nskel.animated = true"
      },
      {
        "title": "3. 真实内容无缝切换 (Skeleton to Real Content)",
        "render": "<div style=\"max-width:360px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"font-size:12px; color:var(--text-secondary); margin-bottom:8px;\">点击按钮模拟数据加载完成：</div><button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:2px 10px;\" onclick=\"showToast('数据加载完成，骨架屏已切换为真实卡片', 'success')\">完成加载 (Hide Skeleton)</button></div>",
        "code": "# GDScript: 加载完成切换\nskel.loading = false"
      },
      {
        "title": "4. 自定义骨架网格块 (Custom Grid Skeleton)",
        "render": "<div style=\"display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; max-width:320px;\"><div style=\"height:60px; background:var(--bg-surface); border-radius:6px; animation:gPulse 1.5s infinite;\"></div><div style=\"height:60px; background:var(--bg-surface); border-radius:6px; animation:gPulse 1.5s infinite;\"></div><div style=\"height:60px; background:var(--bg-surface); border-radius:6px; animation:gPulse 1.5s infinite;\"></div></div>",
        "code": "# GDScript: 网格骨架\nskel.grid_mode = true"
      },
      {
        "title": "5. 游戏好友排行榜骨架 (Game Leaderboard Skeleton)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:6px;\"><div style=\"display:flex; justify-content:space-between; align-items:center; padding:6px; background:var(--bg-surface); border-radius:4px;\"><div style=\"width:20px; height:20px; background:var(--border-base); border-radius:50%;\"></div><div style=\"width:120px; height:12px; background:var(--border-base); border-radius:3px;\"></div><div style=\"width:40px; height:12px; background:var(--border-base); border-radius:3px;\"></div></div><div style=\"display:flex; justify-content:space-between; align-items:center; padding:6px; background:var(--bg-surface); border-radius:4px;\"><div style=\"width:20px; height:20px; background:var(--border-base); border-radius:50%;\"></div><div style=\"width:120px; height:12px; background:var(--border-base); border-radius:3px;\"></div><div style=\"width:40px; height:12px; background:var(--border-base); border-radius:3px;\"></div></div></div>",
        "code": "# GDScript: 排行榜骨架\nvar board_skel = GSkeleton.new_leaderboard_skeleton(5)"
      }
    ],
    "props": [
      {
        "name": "loading",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示骨架屏，为 false 时自动展示子内容插槽"
      },
      {
        "name": "avatar",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示左侧头像占位图"
      },
      {
        "name": "avatar_shape",
        "type": "enum",
        "default": "ROUND",
        "desc": "头像占位图形状：ROUND (圆形), SQUARE (方形)"
      },
      {
        "name": "avatar_size",
        "type": "float",
        "default": "40.0",
        "desc": "头像占位图大小 (像素)"
      },
      {
        "name": "show_title",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示标题占位条"
      },
      {
        "name": "title_width",
        "type": "float",
        "default": "40.0",
        "desc": "标题占位宽度 (百分比 %)"
      },
      {
        "name": "rows",
        "type": "int",
        "default": "3",
        "desc": "段落占位行数"
      },
      {
        "name": "row_width",
        "type": "Array[float]",
        "default": "[100.0, 100.0, 60.0]",
        "desc": "各行段落占位宽度数组 (百分比 %)"
      },
      {
        "name": "animate",
        "type": "boolean",
        "default": "true",
        "desc": "是否开启波浪扫光流动动画效果"
      }
    ],
    "events": [
      {
        "name": "loading_changed(is_loading)",
        "desc": "加载状态发生改变时触发",
        "params": "(is_loading: bool)"
      }
    ],
    "methods": [
      {
        "name": "set_loading(val: bool)",
        "desc": "程序化设置骨架屏加载状态",
        "params": "(val: bool) -> void"
      },
      {
        "name": "set_content(node: Control)",
        "desc": "绑定数据加载完成后显示的真实内容控件",
        "params": "(node: Control) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "加载完成（loading = false）后展示的真实业务组件插槽",
        "child": "Control",
        "example": "<template #default><HeroCard :hero=\"heroData\" /></template>"
      },
      {
        "name": "template",
        "desc": "自定义骨架占位模版结构插槽",
        "child": "VBoxContainer / Array[Control]",
        "example": "<template #template><div class=\"my-custom-skeleton\"></div></template>"
      }
    ]
  },
  "tour": {
    "title": "Tour 漫游式引导 (GTour)",
    "desc": "分步引导用户了解新功能或界面布局。深度对标 Element Plus Tour 规范，提供全屏镂空暗色遮罩、气泡指示卡片与分步上一步/下一步。",
    "demos": [
      {
        "title": "1. 基础多步骤漫游引导 (Basic Tour)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('开启新手漫游引导：第 1 步 · 认识装备背包', 'info')\">🎯 启动新手功能引导</button>",
        "code": "# GDScript: 新手引导\nvar tour = GTour.new()\ntour.add_step(bag_btn, \"点击这里打开背包\", \"装备背包\")\ntour.start()"
      },
      {
        "title": "2. 目标元素高亮挖孔遮罩 (Hole Punch Spotlight)",
        "render": "<div style=\"max-width:340px; background:rgba(0,0,0,0.5); padding:16px; border-radius:8px; color:#fff; font-size:12px; text-align:center;\"><div style=\"border:2px dashed #ffd04b; padding:8px; border-radius:6px; display:inline-block; margin-bottom:8px; background:rgba(255,208,75,0.2);\">⭐ 聚焦高亮目标按键 ⭐</div><div>全屏暗色遮罩自动挖孔聚焦高亮目标节点</div></div>",
        "code": "# GDScript: 挖孔高亮\ntour.spotlight_radius = 8.0"
      },
      {
        "title": "3. 步骤指示器与进度 (Step Indicators: 1/3)",
        "render": "<div style=\"max-width:300px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:12px; font-size:12px;\"><div style=\"font-weight:700; margin-bottom:4px;\">第一步：了解体力机制</div><div style=\"color:var(--text-secondary); margin-bottom:10px;\">每次进入副本将消耗 10 点体力。</div><div style=\"display:flex; justify-content:space-between; align-items:center;\"><span style=\"color:var(--primary); font-weight:600;\">1 / 3</span><button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"showToast('进入下一步', 'info')\">下一步</button></div></div>",
        "code": "# GDScript: 进度指示\ntour.show_indicators = true"
      },
      {
        "title": "4. 位置自适应气泡 (Placement Adaptive Bubble)",
        "render": "<div style=\"display:flex; gap:8px; font-size:12px;\"><span class=\"g-tag g-tag-primary\">自动检测边界</span><span class=\"g-tag g-tag-success\">防溢出屏幕</span></div>",
        "code": "# GDScript: 自动定位\ntour.adaptive_placement = true"
      },
      {
        "title": "5. 游戏新手教学战斗操作引导 (Game Battle Tutorial Tour)",
        "render": "<div style=\"max-width:360px; background:linear-gradient(135deg, #1e1b4b, #312e81); border:1px solid #ffd04b; border-radius:8px; padding:12px; color:#fff; font-size:12px;\"><div style=\"color:#ffd04b; font-weight:700; font-size:13px; margin-bottom:4px;\">⚔️ 新手导师·雷恩</div><div>\"蓄力满能量条后，点击右下角终极技能即可对全屏敌人造成巨额伤害！\"</div></div>",
        "code": "# GDScript: 战斗教学流\nvar battle_tour = GTour.new_battle_tutorial(hero_node)"
      }
    ],
    "props": [
      {
        "name": "steps",
        "type": "Array[Dictionary]",
        "default": "[]",
        "desc": "引导步骤数组 [{\"target\": NodePath, \"title\": \"\", \"description\": \"\", \"placement\": \"BOTTOM\"}]"
      },
      {
        "name": "current_step",
        "type": "int",
        "default": "0",
        "desc": "当前激活步骤索引 (从 0 开始)"
      },
      {
        "name": "mask",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示全屏半透明遮罩层"
      },
      {
        "name": "show_arrow",
        "type": "boolean",
        "default": "true",
        "desc": "是否展示气泡定位小箭头"
      }
    ],
    "events": [
      {
        "name": "step_change(current_step)",
        "desc": "步骤发生切换时触发",
        "params": "(current_step: int)"
      },
      {
        "name": "finish()",
        "desc": "完成所有引导步骤时触发",
        "params": "()"
      },
      {
        "name": "close()",
        "desc": "用户中途关闭引导时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "add_step(step_dict: Dictionary)",
        "desc": "动态追加单个漫游步骤",
        "params": "(step_dict: Dictionary) -> void"
      },
      {
        "name": "add_steps(step_list: Array[Dictionary])",
        "desc": "批量追加一组漫游步骤",
        "params": "(step_list: Array[Dictionary]) -> void"
      },
      {
        "name": "start()",
        "desc": "从第一步开始启动漫游引导",
        "params": "() -> void"
      },
      {
        "name": "next()",
        "desc": "前进至下一步",
        "params": "() -> void"
      },
      {
        "name": "prev()",
        "desc": "后退至上一步",
        "params": "() -> void"
      },
      {
        "name": "close_tour()",
        "desc": "关闭并退出漫游引导",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "自定义引导气泡内容区插槽（透传 { step, current, total }）",
        "child": "Control / VBoxContainer",
        "example": "<template #default=\"{ step }\"><h4>{{ step.title }}</h4><p>{{ step.desc }}</p></template>"
      },
      {
        "name": "indicators",
        "desc": "自定义步骤指示器圆点插槽（透传 { current, total }）",
        "child": "HBoxContainer",
        "example": "<template #indicators=\"{ current, total }\"><span>第 {{ current + 1 }} / {{ total }} 步</span></template>"
      },
      {
        "name": "prev",
        "desc": "自定义上一步按钮插槽",
        "child": "GButton",
        "example": "<template #prev><GButton>上一步</GButton></template>"
      },
      {
        "name": "next",
        "desc": "自定义下一步按钮插槽",
        "child": "GButton",
        "example": "<template #next><GButton type=\"primary\">下一步</GButton></template>"
      },
      {
        "name": "finish",
        "desc": "自定义完成按钮插槽",
        "child": "GButton",
        "example": "<template #finish><GButton type=\"success\">开始冒险</GButton></template>"
      }
    ]
  },
  "card": {
    "title": "Card 卡片 (GCard)",
    "desc": "将信息聚合在卡片容器中展示。支持标题栏、右上角 Extra 扩展操作区与边框阴影。",
    "demos": [
      {
        "title": "1. 基础卡片 (Basic Card: Header & Body & Footer)",
        "render": "<div class=\"g-card\" style=\"max-width:380px;\"><div class=\"g-card-header\" style=\"display:flex; justify-content:space-between; align-items:center;\"><span style=\"font-weight:600; font-size:14px;\">🏰 领主城堡管理</span><button class=\"g-btn g-btn-primary\" style=\"padding:4px 10px; font-size:12px;\" onclick=\"showToast('进入城堡大厅', 'info')\">进入大厅</button></div><div class=\"g-card-body\" style=\"font-size:13px; color:var(--text-secondary); line-height:1.6;\">城堡等级：Lv.18<br>当前税收产出：1,250 金币/小时<br>驻防守卫：48 / 60 骑士团</div><div class=\"g-card-footer\" style=\"display:flex; justify-content:flex-end; gap:8px; font-size:12px; border-top:1px solid var(--border-base); padding:8px 16px; color:var(--text-secondary);\"><span>维护状态：极佳</span></div></div>",
        "code": "# GDScript: 基础卡片\nvar card = GCard.new()\ncard.header.text = \"🏰 领主城堡管理\"\ncard.body.text = \"城堡等级：Lv.18\"\nadd_child(card)"
      },
      {
        "title": "2. 阴影触发时机 (Shadow Trigger: Always / Hover / Never)",
        "render": "<div style=\"display:flex; gap:16px; flex-wrap:wrap;\"><div class=\"g-card\" style=\"width:180px; box-shadow:var(--shadow-base);\"><div class=\"g-card-body\" style=\"font-size:13px; text-align:center;\"><strong>Always 始终有阴影</strong></div></div><div class=\"g-card g-card-hover\" style=\"width:180px; cursor:pointer;\" onclick=\"showToast('悬浮触发阴影', 'success')\"><div class=\"g-card-body\" style=\"font-size:13px; text-align:center;\"><strong>Hover 悬浮时阴影</strong></div></div><div class=\"g-card\" style=\"width:180px; box-shadow:none; border:1px solid var(--border-base);\"><div class=\"g-card-body\" style=\"font-size:13px; text-align:center;\"><strong>Never 无阴影</strong></div></div></div>",
        "code": "# GDScript: 阴影模式\ncard.shadow = GCard.Shadow.HOVER"
      },
      {
        "title": "3. 极简卡片与无边框模式 (Simple & Borderless Card)",
        "render": "<div class=\"g-card\" style=\"max-width:320px; border:none; background:var(--bg-surface);\"><div class=\"g-card-body\" style=\"font-size:13px;\"><div style=\"font-weight:600; margin-bottom:6px;\">极简无边框通栏卡片</div><div style=\"color:var(--text-secondary);\">适合融入背景面板或内嵌于 Dialog/Drawer 中使用。</div></div></div>",
        "code": "# GDScript: 极简卡片\ncard.borderless = true"
      },
      {
        "title": "4. 游戏装备词条特写卡片 (RPG Equipment Specs Card)",
        "render": "<div class=\"g-card\" style=\"max-width:340px; border-color:#e6a23c; background:rgba(230,162,60,0.05);\"><div class=\"g-card-header\" style=\"display:flex; align-items:center; gap:8px;\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"color:#e6a23c; font-size:16px;\"></i><span style=\"color:#e6a23c; font-weight:700;\">圣辉破晓法杖 (SSR)</span></div><div class=\"g-card-body\" style=\"font-size:12px; line-height:1.8;\"><div>⚔️ 魔法攻击力: <strong style=\"color:var(--success);\">+1,480</strong></div><div>✨ 施法急速: <strong style=\"color:var(--primary);\">+15.5%</strong></div><div>🔥 附魔词条: [烈焰风暴] 暴击率增加 25%</div></div></div>",
        "code": "# GDScript: 游戏装备卡片\nvar equip_card = GCard.new()\nequip_card.border_color = Color(\"#e6a23c\")"
      },
      {
        "title": "5. 游戏英雄角色抽卡展示卡片 (Hero Character Card)",
        "render": "<div class=\"g-card\" style=\"max-width:300px; padding:0; overflow:hidden; border-radius:12px; border:2px solid #a855f7;\"><div style=\"height:120px; background:linear-gradient(135deg, #a855f7, #3b82f6); display:flex; align-items:center; justify-content:center; color:#fff; font-size:40px;\">🧙‍♂️</div><div style=\"padding:14px;\"><div style=\"display:flex; justify-content:space-between; align-items:center;\"><span style=\"font-weight:700; font-size:15px;\">大魔导师·艾兰</span><span class=\"g-tag g-tag-warning\" style=\"font-size:10px;\">SSR 传说</span></div><p style=\"font-size:12px; color:var(--text-secondary); margin:8px 0;\">奥术禁咒导师，擅长群体控制与高额爆发奥术伤害。</p><button class=\"g-btn g-btn-primary\" style=\"width:100%; font-size:12px;\" onclick=\"showToast('出战艾兰！', 'success')\">立即出战</button></div></div>",
        "code": "# GDScript: 英雄卡片\nvar hero_card = GCard.new()"
      },
      {
        "title": "6. 复合交互列表卡片 (Interactive List Card)",
        "render": "<div class=\"g-card\" style=\"max-width:360px;\"><div class=\"g-card-header\" style=\"font-weight:600; font-size:13px;\">每日公会任务</div><div class=\"g-card-body\" style=\"padding:0;\"><div style=\"padding:10px 16px; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>击败 5 只哥布林</span><span class=\"g-tag g-tag-success\" style=\"font-size:11px;\">已完成</span></div><div style=\"padding:10px 16px; display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>护送商队 1 次</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\" onclick=\"showToast('开始护送商队', 'info')\">前往</button></div></div></div>",
        "code": "# GDScript: 任务卡片\nvar quest_card = GCard.new()"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Card Title\"",
        "desc": "卡片标题"
      },
      {
        "name": "extra_text",
        "type": "String",
        "default": "\"\"",
        "desc": "右上角额外操作文本"
      },
      {
        "name": "bordered",
        "type": "boolean",
        "default": "true",
        "desc": "是否带有边框"
      },
      {
        "name": "shadow",
        "type": "enum",
        "default": "ALWAYS",
        "desc": "阴影展示时机：ALWAYS, HOVER, NEVER"
      }
    ],
    "events": [
      {
        "name": "extra_clicked()",
        "desc": "点击右上角 Extra 文本时触发",
        "params": "()"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "卡片主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><p>跨服巅峰赛小组赛第一轮战报</p></template>"
      },
      {
        "name": "header",
        "desc": "卡片标题区插槽",
        "child": "GText / Label / HBoxContainer",
        "example": "<template #header><span>战术小队战报</span></template>"
      },
      {
        "name": "extra",
        "desc": "卡片右上角操作区插槽（如“更多”、“编辑”等按钮）",
        "child": "GButton / GSpace",
        "example": "<template #extra><a href=\"javascript:void(0)\">查看全部 →</a></template>"
      },
      {
        "name": "cover",
        "desc": "卡片顶部封面图片/媒体插槽",
        "child": "TextureRect / SubViewportContainer",
        "example": "<template #cover><img src=\"res://cover_s4.png\" /></template>"
      },
      {
        "name": "footer",
        "desc": "卡片底部操作栏插槽",
        "child": "HBoxContainer / GSpace",
        "example": "<template #footer><GButton icon=\"share\">分享战报</GButton></template>"
      }
    ]
  }
});
