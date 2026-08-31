// =========================================================================
// Gotod Components UI - Component Catalog Part 1 / 6
// Group: button, text, container, divider, icon, fab, input
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "button": {
    "title": "Button 按钮 (GButton)",
    "desc": "常用的操作按钮，融合 Element Plus、Naive UI、Ant Design 与 Vant 规范。包含基础类型、朴素/边框按钮、圆角/圆形胶囊、禁用/加载、不同尺寸以及通栏全宽等全部场景。",
    "demos": [
      {
        "title": "1. 基础类型 (Basic Types: Primary / Success / Warning / Danger / Info)",
        "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-default\" onclick=\"showToast('Default button')\">Default 默认</button>\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('Primary button', 'success')\">Primary 主要</button>\n            <button class=\"g-btn g-btn-success\" onclick=\"showToast('Success button', 'success')\">Success 成功</button>\n            <button class=\"g-btn g-btn-warning\" onclick=\"showToast('Warning button', 'warning')\">Warning 警告</button>\n            <button class=\"g-btn g-btn-danger\" onclick=\"showToast('Danger button', 'danger')\">Danger 危险</button>\n            <button class=\"g-btn g-btn-info\" onclick=\"showToast('Info button', 'info')\">Info 信息</button>\n          </div>\n        ",
        "code": "# GDScript: Basic Types\nvar btn_primary = GButton.new()\nbtn_primary.text = \"Primary\"\nbtn_primary.button_type = GButton.ButtonType.PRIMARY\nbtn_primary.pressed.connect(func(): GMessage.success(\"Primary clicked\"))\nadd_child(btn_primary)"
      },
      {
        "title": "2. 朴素与变体形态 (Variants: Solid / Outline / Dashed / Text / Link)",
        "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\">Solid 实心</button>\n            <button class=\"g-btn g-btn-outline\" onclick=\"showToast('Outline')\">Outline 边框</button>\n            <button class=\"g-btn g-btn-dashed\" onclick=\"showToast('Dashed')\">Dashed 虚线</button>\n            <button class=\"g-btn g-btn-text\" onclick=\"showToast('Text')\">Text 纯文本</button>\n            <button class=\"g-btn g-btn-text\" style=\"text-decoration:underline;\" onclick=\"showToast('Link')\">Link 链接</button>\n          </div>\n        ",
        "code": "# GDScript: Variants\nvar outline = GButton.new()\noutline.text = \"Outline\"\noutline.variant = GButton.Variant.OUTLINE\nadd_child(outline)"
      },
      {
        "title": "3. 圆角与圆形按钮 (Shapes: Round / Circle / Square)",
        "render": "\n          <div style=\"display:flex; gap:12px; align-items:center; flex-wrap:wrap;\">\n            <button class=\"g-btn g-btn-primary g-btn-round\" onclick=\"showToast('Round Pill')\">Round 胶囊圆角</button>\n            <button class=\"g-btn g-btn-success g-btn-round\" onclick=\"showToast('Success Pill')\">Success 胶囊</button>\n            <button class=\"g-btn g-btn-primary g-btn-round\" style=\"width:36px; height:36px; padding:0;\"><i class=\"fa-solid fa-shapes\"></i></button>\n            <button class=\"g-btn g-btn-danger g-btn-round\" style=\"width:36px; height:36px; padding:0;\"><i class=\"fa-solid fa-heart\"></i></button>\n          </div>\n        ",
        "code": "# GDScript: Shapes\nvar pill = GButton.new()\npill.text = \"Round Pill\"\npill.shape = GButton.Shape.ROUND\nadd_child(pill)"
      },
      {
        "title": "4. 加载状态与禁用 (Loading & Disabled)",
        "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\"><i class=\"fa-solid fa-spinner fa-spin\"></i> Loading 加载中</button>\n            <button class=\"g-btn g-btn-success\"><i class=\"fa-solid fa-spinner fa-spin\"></i> Loading 成功</button>\n            <button class=\"g-btn g-btn-primary\" style=\"opacity:0.5; cursor:not-allowed;\" disabled>Disabled 禁用</button>\n            <button class=\"g-btn g-btn-default\" style=\"opacity:0.5; cursor:not-allowed;\" disabled>Disabled 默认</button>\n          </div>\n        ",
        "code": "# GDScript: Loading & Disabled\nvar load_btn = GButton.new()\nload_btn.text = \"Loading\"\nload_btn.loading = true\nadd_child(load_btn)"
      },
      {
        "title": "5. 通栏全宽按钮 (Block Button: block=\"true\")",
        "render": "\n          <div style=\"width:100%; display:flex; flex-direction:column; gap:10px;\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:100%;\">Block Primary Button (100% 宽度)</button>\n            <button class=\"g-btn g-btn-default\" style=\"width:100%;\">Block Default Button</button>\n          </div>\n        ",
        "code": "# GDScript: Block Button\nvar block_btn = GButton.new()\nblock_btn.text = \"Full Width\"\nblock_btn.block = true\nadd_child(block_btn)"
      },
      {
        "title": "6. 插槽自定义内容 (Custom Slot Usage: #default & #icon & #loading)",
        "render": "\n          <div style=\"display:flex; gap:14px; flex-wrap:wrap; align-items:center;\">\n            <!-- #icon + #default slot -->\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('点击了自定义插槽按钮', 'success')\">\n              <i class=\"fa-solid fa-cart-shopping\"></i>\n              <span>购买强化石 <b style=\"color:#fcd34d; margin-left:4px;\">¥99</b></span>\n            </button>\n\n            <!-- Custom #icon slot with Badge -->\n            <button class=\"g-btn g-btn-default\" onclick=\"showToast('点击了带角标插槽按钮')\">\n              <span style=\"position:relative; display:inline-flex; align-items:center;\">\n                <i class=\"fa-solid fa-bell\"></i>\n                <span style=\"position:absolute; top:-4px; right:-6px; width:6px; height:6px; background:var(--danger); border-radius:50%;\"></span>\n              </span>\n              <span style=\"margin-left:6px;\">消息通知</span>\n            </button>\n\n            <!-- Custom #loading slot -->\n            <button class=\"g-btn g-btn-warning\">\n              <i class=\"fa-solid fa-circle-notch fa-spin\" style=\"color:#fff;\"></i>\n              <span style=\"margin-left:6px;\">同步云存档中...</span>\n            </button>\n          </div>\n        ",
        "code": "<!-- 方式 1: Vue 3 模板插槽语法 (Vue Template Slots) -->\n<GButton type=\"primary\">\n  <template #icon>\n    <GIcon name=\"cart-shopping\" color=\"yellow\" />\n  </template>\n  <template #default>\n    <span>购买强化石 <b style=\"color:#fcd34d;\">¥99</b></span>\n  </template>\n</GButton>\n\n# 方式 2: Godot GDScript 点语法直接配置 Slot (Dot Slot Property Syntax)\nvar btn = GButton.new()\nbtn.button_type = GButton.ButtonType.PRIMARY\n\n# 1. 默认插槽配置 (默认无名字 default slot)\nbtn.slotName = \"\"              # 默认 default 插槽\nbtn.slotName.text = \"购买强化石\"\nbtn.slotName.color = \"white\"\n\n# 2. 具名插槽配置 (Named slot: icon)\nbtn.slotName = \"icon\"\nbtn.icon.name = \"cart-shopping\"\nbtn.icon.color = \"yellow\"\n\n# 3. 自定义具名插槽绑定与赋值 (Custom Slot: t1)\nbtn.slotName = \"t1\"\nbtn.t1.color = \"#fcd34d\"\nbtn.t1.text = 99               # 直接修改插槽文本与色彩"
      }
    ],
    "props": [
      {
        "name": "button_type / type",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO"
      },
      {
        "name": "variant",
        "type": "enum",
        "default": "SOLID",
        "desc": "形态样式：SOLID (实心), OUTLINE (描边), DASHED (虚线), TEXT (文字), LINK (链接)"
      },
      {
        "name": "button_size / size",
        "type": "enum",
        "default": "MEDIUM",
        "desc": "尺寸规格：SMALL, MEDIUM, LARGE"
      },
      {
        "name": "shape",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "形状：DEFAULT, ROUND (胶囊), CIRCLE (圆), SQUARE (方)"
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "desc": "是否进入加载动画状态并禁用点击"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用按钮交互"
      },
      {
        "name": "block",
        "type": "boolean",
        "default": "false",
        "desc": "是否充满父级容器全宽"
      },
      {
        "name": "icon_texture / icon",
        "type": "Texture2D",
        "default": "null",
        "desc": "按钮图标纹理"
      }
    ],
    "events": [
      {
        "name": "pressed()",
        "desc": "按钮被点击时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "set_loading(is_loading: bool)",
        "desc": "动态开启或关闭按钮加载动画",
        "params": "(is_loading: bool) -> void"
      },
      {
        "name": "set_disabled(is_disabled: bool)",
        "desc": "动态禁用或启用按钮",
        "params": "(is_disabled: bool) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "按钮内部文字或自定义节点插槽",
        "child": "GText / Label / Control",
        "example": "<template #default>确认支付 ¥99</template>"
      },
      {
        "name": "icon",
        "desc": "按钮前置自定义图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #icon><GIcon name=\"bag-shopping\" /></template>"
      },
      {
        "name": "loading",
        "desc": "自定义加载中动画或占位插槽",
        "child": "GLoading / TextureProgressBar",
        "example": "<template #loading><GLoading size=\"14\" /></template>"
      }
    ]
  },
  "text": {
    "title": "Text / Typography 文本 (GText & GTitle)",
    "desc": "统一的排版文本组件，支持 H1~H6 标题层级、状态色、次级灰度文字、代码块字体与超出省略。",
    "demos": [
      {
        "title": "1. 语义色彩与排版层级 (Types & Hierarchy: H1 ~ Body / Small)",
        "render": "\n      <div style=\"display:flex; flex-direction:column; gap:8px;\">\n        <span style=\"font-size:20px; font-weight:700; color:var(--text-primary);\">H1 标题文本 (Primary)</span>\n        <span style=\"font-size:16px; font-weight:600; color:var(--primary);\">H2 主要语义色文本 (Info/Primary)</span>\n        <span style=\"font-size:14px; color:var(--success);\">正文成功语义色 (Success)</span>\n        <span style=\"font-size:13px; color:var(--warning);\">正文警告语义色 (Warning)</span>\n        <span style=\"font-size:13px; color:var(--danger);\">正文危险语义色 (Danger)</span>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">辅助次要描述文本 (Secondary)</span>\n      </div>\n    ",
        "code": "# GDScript: 基础文本排版\nvar text_h1 = GText.new(\"H1 标题\", GText.Type.H1)\nvar text_desc = GText.new(\"次要描述\", GText.Type.SECONDARY)\nadd_child(text_h1)"
      },
      {
        "title": "2. 文本省略与截断 (Truncated & Multi-line Ellipsis)",
        "render": "\n      <div style=\"max-width:320px; display:flex; flex-direction:column; gap:10px;\">\n        <div style=\"white-space:nowrap; overflow:hidden; text-overflow:ellipsis; background:var(--bg-surface); padding:6px 10px; border-radius:4px; font-size:13px;\" title=\"这是一段非常长的玩家公会宣言，超出容器边界时将自动以省略号进行单行截断展示。\">\n          这是一段非常长的玩家公会宣言，超出容器边界时将自动以省略号进行单行截断展示。\n        </div>\n        <div style=\"display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; font-size:12px; color:var(--text-secondary); line-height:1.5;\">\n          【剧情背景】在古老的神恩大陆上，封印千万年的混沌魔龙苏醒，世界各地的勇者纷纷拿起武器保卫最后的圣域。\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 文本截断与多行省略\ntext_label.truncated = true # 单行省略\ntext_label.line_clamp = 2   # 多行省略"
      },
      {
        "title": "3. 游戏富文本与暴击跳字 (RPG RichText & Damage Numbers)",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center; background:rgba(0,0,0,0.3); padding:10px 14px; border-radius:8px;\">\n        <span style=\"color:#ef4444; font-weight:800; font-size:22px; text-shadow:0 0 8px #ef4444;\">💥 99,999! (暴击)</span>\n        <span style=\"color:#38bdf8; font-weight:700; font-size:16px;\">+1,500 HP (治愈)</span>\n        <span style=\"color:#eab308; font-weight:600; font-size:14px;\">Miss (闪避)</span>\n      </div>\n    ",
        "code": "# GDScript: 战斗跳字排版\nvar dmg_text = GText.new_combat_damage(99999, true) # 暴击大号红色跳字"
      },
      {
        "title": "4. 动态打字机效果 (Typewriter Animation Flow)",
        "render": "\n      <div style=\"background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:12px; max-width:380px;\">\n        <div id=\"typewriterBox\" style=\"font-size:13px; line-height:1.6; font-family:monospace; min-height:38px;\">\n          正在连接神殿核心数据库... [OK]\n        </div>\n        <button class=\"g-btn g-btn-default\" style=\"margin-top:8px; padding:2px 8px; font-size:11px;\" onclick=\"\n          const box = document.getElementById('typewriterBox');\n          const str = '正在连接神殿核心数据库... 正在同步 26,000+ 矢量数据资产... 完成！';\n          box.innerText = '';\n          let i = 0;\n          const timer = setInterval(() => {\n            box.innerText += str[i++];\n            if (i >= str.length) clearInterval(timer);\n          }, 40);\n        \">重新播放打字机</button>\n      </div>\n    ",
        "code": "# GDScript: 打字机特效\nvar story_text = GText.new()\nstory_text.typewriter_speed = 0.04\nstory_text.play_typewriter(\"正在连接神殿核心数据库...\")"
      },
      {
        "title": "5. 一键复制文本与气泡提示 (Copyable Text & Tooltip)",
        "render": "\n      <div style=\"display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:6px 12px; border-radius:6px; max-width:300px;\">\n        <span style=\"font-size:12px; font-family:monospace; flex:1;\">UUID: 8f4a-99b2-c71e</span>\n        <button class=\"g-btn g-btn-primary\" style=\"padding:2px 6px; font-size:11px;\" onclick=\"navigator.clipboard.writeText('8f4a-99b2-c71e'); showToast('已复制 UUID 到剪贴板', 'success')\">\n          <i class=\"fa-solid fa-copy\"></i>\n        </button>\n      </div>\n    ",
        "code": "# GDScript: 可复制文本\ntext_label.copyable = true"
      },
      {
        "title": "6. 渐变艺术字与高亮关键字 (Gradient Art Text & Keyword Highlight)",
        "render": "\n      <div style=\"display:flex; flex-direction:column; gap:8px;\">\n        <span style=\"font-size:24px; font-weight:900; background:linear-gradient(90deg, #f59e0b, #ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent;\">\n          👑 LEGENDARY VICTORY\n        </span>\n        <div style=\"font-size:13px; color:var(--text-secondary);\">\n          在 <span style=\"color:var(--primary); font-weight:700; text-decoration:underline;\">迷雾森林</span> 击败了 <span style=\"color:var(--danger); font-weight:700;\">远古魔王</span>。\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 渐变与关键字高亮\ntext_label.set_gradient(Color(\"#f59e0b\"), Color(\"#ec4899\"))\ntext_label.highlight_keywords([\"迷雾森林\", \"远古魔王\"], Color(\"#409eff\"))"
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"\"",
        "desc": "展示的文本内容"
      },
      {
        "name": "text_type",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO, SECONDARY"
      },
      {
        "name": "hierarchy",
        "type": "enum",
        "default": "BODY",
        "desc": "层级：BODY, H1, H2, H3, H4, H5, H6, CAPTION, CODE"
      },
      {
        "name": "ellipsis",
        "type": "boolean",
        "default": "false",
        "desc": "文本超出是否自动显示省略号"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "set_text(new_text: String)",
        "desc": "更新文本内容",
        "params": "(new_text: String) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "文本主体内容插槽",
        "child": "Label / RichTextLabel",
        "example": "<template #default>这是一段带渐变高亮的正文</template>"
      },
      {
        "name": "prefix",
        "desc": "文本前置修饰插槽（如标签或图标）",
        "child": "GIcon / GTag / Control",
        "example": "<template #prefix><GTag type=\"primary\">HOT</GTag></template>"
      },
      {
        "name": "suffix",
        "desc": "文本后置修饰插槽（如角标或单位）",
        "child": "GIcon / GBadge / Control",
        "example": "<template #suffix><GBadge is_dot /></template>"
      }
    ]
  },
  "container": {
    "title": "Container 布局容器 (GContainer & Game Layouts)",
    "desc": "用于搭建游戏 HUD 主界面、JRPG 战术面板、MMORPG 战场或后台管理系统的全套整体布局架构。深度对标 Element Plus Container 规范，提供 GContainer（外层弹性容器）、GHeader（顶栏）、GAside（侧边栏）、GMain（主要区域）与 GFooter（底栏）。支持灵活的嵌套组合与自定义游戏主题布局。",
    "demos": [
      {
        "title": "1. 回合制 JRPG 主菜单与队伍状态布局 (Turn-based RPG Main Menu - 对标截图 1)",
        "render": "\n          <div style=\"width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);\">\n            <!-- Middle Split: Left Hero Status Panel + Right 2x5 Action Grid & Summary Box -->\n            <div style=\"display:flex; gap:14px; min-height:220px;\">\n              <!-- Left Aside: Big Character Status Box (Gothic Gold Border) -->\n              <div style=\"flex:1.2; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:10px; position:relative; box-shadow:inset 0 0 15px rgba(0,0,0,0.6);\">\n                <div style=\"display:flex; gap:12px; align-items:center; border-bottom:1px solid #1a2d5a; padding-bottom:8px;\">\n                  <div style=\"width:48px; height:48px; background:rgba(255,255,255,0.08); border:1px solid #b8860b; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:24px;\">🧙‍♂️</div>\n                  <div style=\"flex:1;\">\n                    <div style=\"display:flex; justify-content:space-between; font-weight:700; font-size:13px; color:#ffd700;\">\n                      <span>纳哈特</span>\n                      <span>自由人</span>\n                    </div>\n                    <div style=\"font-size:11px; color:#a4b0be; margin-top:2px;\">LV 1 (前排)</div>\n                  </div>\n                  <div style=\"text-align:right; font-size:11px;\">\n                    <div style=\"color:#67c23a; font-weight:700;\">HP 10 / 10</div>\n                    <div style=\"color:#409eff; font-weight:700; margin-top:2px;\">MP 20 / 20</div>\n                  </div>\n                </div>\n                <div style=\"flex:1; display:flex; align-items:center; justify-content:center; color:#57606f; font-size:11px; border:1px dashed #1a2d5a; border-radius:4px;\">\n                  [ 角色 2D 像素待机与装备插槽区域 ]\n                </div>\n              </div>\n\n              <!-- Right Column: 2x5 Grid Commands + Time & Gold Summary -->\n              <div style=\"flex:1; display:flex; flex-direction:column; gap:10px;\">\n                <!-- 2x5 Action Grid (职业, 能力, 道具, 魔法·技能, 装备, 状态, 队列, 设定, 中断, 储存) -->\n                <div style=\"background:#0a1733; border:2px solid #b8860b; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px;\">\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">职业</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">能力</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">道具</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">魔法·技能</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">装备</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">状态</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">队列</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">设定</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">中断</button>\n                  <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">储存</button>\n                </div>\n\n                <!-- Bottom Right Summary (TIME & 金币) -->\n                <div style=\"background:#0a1733; border:2px solid #b8860b; border-radius:8px; padding:8px 12px; font-size:11px; display:flex; flex-direction:column; gap:4px;\">\n                  <div style=\"display:flex; justify-content:space-between; color:#a4b0be;\"><span>TIME</span><b style=\"color:#fff;\">0:00</b></div>\n                  <div style=\"display:flex; justify-content:space-between; color:#a4b0be;\"><span>金币</span><b style=\"color:#ffd700;\">10000</b></div>\n                </div>\n              </div>\n            </div>\n\n            <!-- Bottom Action Row: [ 替换 ] on Left, [ 返回 ] on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; padding-top:4px;\">\n              <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;\">替换</button>\n              <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;\" onclick=\"showToast('点击返回上一级菜单')\">返回</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 回合制 JRPG 主菜单结构 (1:1 还原截图 1)\nvar menu_root = GContainer.new() # 根容器\n\n# 1. 中间水平双分栏：左侧角色大卡片 + 右侧 2x5 指令与概览\nvar mid_box = GContainer.new()\nmid_box.direction = GContainer.Direction.HORIZONTAL\n\nvar left_hero_aside = GAside.new()\nleft_hero_aside.size_flags_stretch_ratio = 1.2\nleft_hero_aside.add_child(hero_status_card)\n\nvar right_col = GContainer.new()\nright_col.direction = GContainer.Direction.VERTICAL\nright_col.add_child(grid_2x5_command_buttons)\nright_col.add_child(time_gold_summary_box)\n\nmid_box.add_child(left_hero_aside)\nmid_box.add_child(right_col)\n\n# 2. 底栏操作条：左侧【替换】+ 右侧【返回】\nvar footer_bar = GFooter.new()\nfooter_bar.height = 40.0\nfooter_bar.add_child(bottom_replace_and_return_hbox)\n\nmenu_root.add_child(mid_box)\nmenu_root.add_child(footer_bar)\nadd_child(menu_root)"
      },
      {
        "title": "2. 游戏多分页系统设定面板 (Game Settings Panel - 对标截图 2)",
        "render": "\n          <div style=\"width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);\">\n            <div style=\"font-weight:700; font-size:15px; color:#fff;\">设定 1</div>\n            \n            <!-- Center Main Settings Card (Gothic Gold Frame) -->\n            <div style=\"background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:16px 20px; display:flex; flex-direction:column; gap:14px; box-shadow:inset 0 0 15px rgba(0,0,0,0.6);\">\n              <div style=\"font-size:12px; color:#a4b0be; border-bottom:1px solid #1a2d5a; padding-bottom:6px;\">设定BGM音量</div>\n              \n              <!-- BGM & SE Sliders -->\n              <div style=\"display:flex; flex-direction:column; gap:10px;\">\n                <div style=\"display:flex; align-items:center; gap:14px;\">\n                  <span style=\"width:50px; color:#ffd700; font-weight:700;\">BGM</span>\n                  <input type=\"range\" style=\"flex:1;\" value=\"80\">\n                </div>\n                <div style=\"display:flex; align-items:center; gap:14px;\">\n                  <span style=\"width:50px; color:#ffd700; font-weight:700;\">SE</span>\n                  <input type=\"range\" style=\"flex:1;\" value=\"65\">\n                </div>\n              </div>\n\n              <!-- Operation Mode [ 默认 | 滑动 | 固定 ] -->\n              <div style=\"display:flex; align-items:center; gap:14px; margin-top:4px;\">\n                <span style=\"width:50px; color:#ffd700; font-weight:700;\">操作</span>\n                <div style=\"display:flex; gap:8px;\">\n                  <button class=\"g-btn g-btn-primary\" style=\"height:26px; padding:0 14px; font-size:11px;\">默认</button>\n                  <button class=\"g-btn g-btn-default\" style=\"height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;\">滑动</button>\n                  <button class=\"g-btn g-btn-default\" style=\"height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;\">固定</button>\n                </div>\n              </div>\n\n              <!-- Minimap Toggle [ ON | OFF ] -->\n              <div style=\"display:flex; align-items:center; gap:14px;\">\n                <span style=\"width:70px; color:#ffd700; font-weight:700;\">显示小地图</span>\n                <div style=\"display:flex; gap:8px;\">\n                  <button class=\"g-btn g-btn-primary\" style=\"height:26px; padding:0 14px; font-size:11px;\">ON</button>\n                  <button class=\"g-btn g-btn-default\" style=\"height:26px; padding:0 14px; font-size:11px; background:#132347; border:1px solid #1a2d5a;\">OFF</button>\n                </div>\n              </div>\n\n              <div style=\"font-size:11px; color:#a4b0be; margin-top:8px;\">音量、操作方式和小地图显示会保存到设置档。</div>\n            </div>\n\n            <!-- Bottom Row: [ 1 ] [ 2 ] [ 3 ] on Left, [ 返回 ] on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; padding-top:4px;\">\n              <div style=\"display:flex; gap:6px;\">\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;\">1</button>\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;\">2</button>\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; width:28px; height:28px; padding:0; font-size:11px; font-weight:700;\">3</button>\n              </div>\n              <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;\" onclick=\"showToast('返回主菜单')\">返回</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 游戏多分页系统设置面板 (1:1 还原截图 2)\nvar settings_root = GContainer.new()\n\nvar header_title = GHeader.new()\nheader_title.height = 36.0\nheader_title.add_child(GText.new().set_text(\"设定 1\"))\n\nvar main_settings_card = GMain.new()\nmain_settings_card.add_child(audio_sliders_vbox)\nmain_settings_card.add_child(control_mode_radio_group)\nmain_settings_card.add_child(minimap_toggle_switch)\n\nvar footer_nav = GFooter.new()\nfooter_nav.height = 40.0\nfooter_nav.add_child(pagination_and_back_button_hbox)\n\nsettings_root.add_child(header_title)\nsettings_root.add_child(main_settings_card)\nsettings_root.add_child(footer_nav)\nadd_child(settings_root)"
      },
      {
        "title": "3. 游戏存储/读档文件管理器 (Save & Load Storage - 对标截图 3)",
        "render": "\n          <div style=\"width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8);\">\n            <div style=\"font-weight:700; font-size:15px; color:#fff;\">存储</div>\n            \n            <div style=\"background:#0a1733; border:1px solid #b8860b; border-radius:4px; padding:4px 12px; text-align:center; font-size:11px; color:#ffd700;\">选择存档文件</div>\n\n            <!-- Save Slots List -->\n            <div style=\"background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:8px;\">\n              <div style=\"background:#132347; border:1px solid #b8860b; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;\" onclick=\"showToast('选中存档 01', 'info')\">\n                <span style=\"font-weight:700; color:#ffd700;\">文件01</span>\n                <span>纳哈特</span>\n                <span>LV 1</span>\n                <span style=\"color:#a4b0be;\">TIME 00:18</span>\n                <span style=\"color:#67c23a;\">非之世界</span>\n              </div>\n              \n              <div style=\"background:#132347; border:1px solid #b8860b; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;\" onclick=\"showToast('选中存档 02', 'info')\">\n                <span style=\"font-weight:700; color:#ffd700;\">文件02</span>\n                <span>纳哈特</span>\n                <span>LV 1</span>\n                <span style=\"color:#a4b0be;\">TIME 00:32</span>\n                <span style=\"color:#67c23a;\">非之世界</span>\n              </div>\n\n              <div style=\"background:#101a30; border:1px dashed #1a2d5a; border-radius:6px; padding:8px; text-align:center; color:#ffd700; font-weight:700; cursor:pointer;\" onclick=\"showToast('已新建存档槽位', 'success')\">\n                新增存档\n              </div>\n            </div>\n\n            <!-- Bottom Row: [ 删除 ] on Left, [ 返回 ] on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; padding-top:4px;\">\n              <button class=\"g-btn g-btn-danger\" style=\"height:28px; padding:0 24px; font-size:11px; font-weight:700;\" onclick=\"showToast('请选择要删除的存档', 'warning')\">删除</button>\n              <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;\" onclick=\"showToast('返回主菜单')\">返回</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 游戏存储与读档面板架构 (1:1 还原截图 3)\nvar save_root = GContainer.new()\n\nvar header_bar = GHeader.new()\nheader_bar.height = 54.0\nheader_bar.add_child(storage_title_and_sub_banner)\n\nvar main_slots_list = GMain.new()\nmain_slots_list.add_child(save_slots_vbox)\n\nvar footer_action = GFooter.new()\nfooter_action.height = 40.0\nfooter_action.add_child(delete_and_return_hbox)\n\nsave_root.add_child(header_bar)\nsave_root.add_child(main_slots_list)\nsave_root.add_child(footer_action)\nadd_child(save_root)"
      },
      {
        "title": "4. 角色魔法·技能分配双分栏布局 (Magic & Skill Allocator - 对标截图 4)",
        "render": "\n          <div style=\"width:100%; border:2px solid #3d2b1f; border-radius:10px; overflow:hidden; background:#071124; color:#fff; font-size:12px; display:flex; flex-direction:column; padding:16px; gap:10px; box-shadow:0 8px 30px rgba(0,0,0,0.8);\">\n            <div style=\"font-weight:700; font-size:15px; color:#fff;\">魔法·技能</div>\n            \n            <!-- Top Character Switch Card (< Avatar > + HP/MP) -->\n            <div style=\"background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:8px 14px; display:flex; align-items:center; justify-content:space-between;\">\n              <div style=\"display:flex; align-items:center; gap:10px;\">\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #1a2d5a; color:#ffd700; width:24px; height:24px; padding:0;\">&lt;</button>\n                <div style=\"width:36px; height:36px; background:rgba(255,255,255,0.08); border:1px solid #b8860b; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:18px;\">🧙‍♂️</div>\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #1a2d5a; color:#ffd700; width:24px; height:24px; padding:0;\">&gt;</button>\n                <div>\n                  <div style=\"font-weight:700; color:#ffd700;\">纳哈特 (自由人)</div>\n                  <div style=\"font-size:11px; color:#a4b0be;\">LV 1</div>\n                </div>\n              </div>\n              <div style=\"text-align:right; font-size:11px;\">\n                <div style=\"color:#67c23a; font-weight:700;\">HP 10 / 10</div>\n                <div style=\"color:#409eff; font-weight:700; margin-top:2px;\">MP 20 / 20</div>\n              </div>\n            </div>\n\n            <div style=\"background:#0a1733; border:1px solid #b8860b; border-radius:4px; padding:3px 10px; font-size:11px; color:#ffd700;\">查看习得的白魔法</div>\n\n            <!-- Middle 2-Column: Left Spell Grid (70%) + Right Category Tabs (30%) -->\n            <div style=\"display:flex; gap:12px; min-height:140px;\">\n              <!-- Left Spell Grid -->\n              <div style=\"flex:2; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px;\">\n                <div style=\"background:#132347; border:1px solid #b8860b; border-radius:4px; padding:6px; display:flex; justify-content:space-between; font-size:11px; cursor:pointer;\" onclick=\"showToast('释放: 小回复 (消耗 MP 10)', 'success')\">\n                  <span>小回复</span><b style=\"color:#409eff;\">MP 10</b>\n                </div>\n                <div style=\"background:#132347; border:1px solid #b8860b; border-radius:4px; padding:6px; display:flex; justify-content:space-between; font-size:11px; cursor:pointer;\" onclick=\"showToast('释放: 解毒 (消耗 MP 6)', 'success')\">\n                  <span>解毒</span><b style=\"color:#409eff;\">MP 6</b>\n                </div>\n              </div>\n\n              <!-- Right Category List (白魔法, 黑魔法) -->\n              <div style=\"flex:1; background:#0a1733; border:3px solid #b8860b; border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:6px;\">\n                <button class=\"g-btn g-btn-primary\" style=\"background:#1e3568; border:1px solid #ffd700; color:#ffd700; height:28px; font-size:11px; font-weight:700;\">白魔法</button>\n                <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #1a2d5a; color:#a4b0be; height:28px; font-size:11px;\" onclick=\"showToast('切换至黑魔法列表')\">黑魔法</button>\n              </div>\n            </div>\n\n            <!-- Bottom Row: [ 返回 ] on Right -->\n            <div style=\"display:flex; justify-content:flex-end; align-items:center; padding-top:4px;\">\n              <button class=\"g-btn g-btn-default\" style=\"background:#132347; border:1px solid #b8860b; color:#ffd700; height:28px; padding:0 24px; font-size:11px; font-weight:700;\" onclick=\"showToast('返回上一级')\">返回</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 魔法·技能多栏分配面板 (1:1 还原截图 4)\nvar magic_root = GContainer.new()\n\nvar top_header = GHeader.new()\ntop_header.height = 70.0\ntop_header.add_child(hero_switch_card_with_arrows)\n\nvar mid_split = GContainer.new()\nmid_split.direction = GContainer.Direction.HORIZONTAL\n\nvar left_spells_grid = GMain.new()\nleft_spells_grid.size_flags_stretch_ratio = 2.0\nleft_spells_grid.add_child(spells_2col_grid)\n\nvar right_categories = GAside.new()\nright_categories.size_flags_stretch_ratio = 1.0\nright_categories.add_child(magic_type_tabs_vbox)\n\nmid_split.add_child(left_spells_grid)\nmid_split.add_child(right_categories)\n\nvar bottom_bar = GFooter.new()\nbottom_bar.height = 40.0\nbottom_bar.add_child(return_button_hbox)\n\nmagic_root.add_child(top_header)\nmagic_root.add_child(mid_split)\nmagic_root.add_child(bottom_bar)\nadd_child(magic_root)"
      },
      {
        "title": "5. 经典 JRPG 《黄金太阳》(Golden Sun) 精灵矩阵与精神力布局",
        "render": "\n          <div style=\"width:100%; border:2px solid #5c4326; border-radius:12px; overflow:hidden; background:#1c1610; color:#eed8ae; font-size:12px; display:flex; flex-direction:column; box-shadow:0 8px 30px rgba(0,0,0,0.6);\">\n            <!-- Top: 4 Element Djinn Spirits Bar -->\n            <div style=\"background:linear-gradient(90deg, #3d2b15, #2c1f0f); padding:10px 18px; border-bottom:1px solid #5c4326; display:flex; justify-content:space-between; align-items:center;\">\n              <span style=\"font-weight:700; color:#f5d76e; font-size:13px;\">🌟 四大元素精灵矩阵 (Djinn Matrix)</span>\n              <div style=\"display:flex; gap:12px; font-weight:600;\">\n                <span style=\"color:#f56c6c;\">🔥 火炎: 4/4</span>\n                <span style=\"color:#409eff;\">💧 水泉: 4/4</span>\n                <span style=\"color:#67c23a;\">🌿 地灵: 4/4</span>\n                <span style=\"color:#e6a23c;\">⚡ 风暴: 4/4</span>\n              </div>\n            </div>\n\n            <!-- Middle: Left Psynergy List + Center Summon View -->\n            <div style=\"display:flex; min-height:160px;\">\n              <div style=\"width:200px; background:#17120d; border-right:1px solid #5c4326; padding:12px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"font-weight:700; color:#f5d76e; margin-bottom:4px;\">精神力术式 (Psynergy)</div>\n                <div style=\"padding:6px 8px; background:rgba(245,215,110,0.1); border-radius:4px; border:1px solid #5c4326; cursor:pointer;\" onclick=\"showToast('选择精神力: 诸神黄昏 (Ragnarok)')\">\n                  <div style=\"font-weight:600; color:#fff;\">诸神黄昏 (Ragnarok)</div>\n                  <div style=\"font-size:10px; color:#eed8ae;\">PP 消耗: 7 | 召唤黄金巨剑</div>\n                </div>\n                <div style=\"padding:6px 8px; background:rgba(255,255,255,0.03); border-radius:4px; cursor:pointer;\" onclick=\"showToast('选择精神力: 痊愈光环 (Wish)')\">\n                  <div style=\"font-weight:600; color:#fff;\">痊愈光环 (Wish)</div>\n                  <div style=\"font-size:10px; color:#eed8ae;\">PP 消耗: 9 | 全队恢复 400 HP</div>\n                </div>\n              </div>\n\n              <div style=\"flex:1; background:radial-gradient(circle at center, #2e2112 0%, #140d07 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;\">\n                <div style=\"font-size:32px; margin-bottom:6px;\">🗡️✨</div>\n                <div style=\"color:#f5d76e; font-weight:700;\">【神殿战场】 地之使者·罗宾 (Robin)</div>\n                <p style=\"font-size:11px; color:#eed8ae; margin-top:4px; opacity:0.8;\">精灵附体加成: 攻击力 +45, 敏捷 +20</p>\n              </div>\n            </div>\n\n            <!-- Bottom: Action Confirm Bar -->\n            <div style=\"background:#2c1f0f; padding:10px 18px; border-top:1px solid #5c4326; display:flex; justify-content:space-between; align-items:center;\">\n              <span style=\"font-size:11px; color:#eed8ae;\">按 A 键确认精神力释放，按 B 键切换精灵待机</span>\n              <button class=\"g-btn g-btn-warning\" style=\"height:28px; font-size:11px;\" onclick=\"showToast('精神力召唤法阵已展开！', 'success')\">释放精灵召唤术 ⚡</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 《黄金太阳》精灵契约与精神力施法界面\nvar gs_container = GContainer.new()\n\nvar djinns_header = GHeader.new()\ndjinns_header.height = 42.0\ndjinns_header.add_child(element_djinns_hbox)\n\nvar body_container = GContainer.new()\nbody_container.direction = GContainer.Direction.HORIZONTAL\n\nvar psynergy_aside = GAside.new()\npsynergy_aside.width = 200.0\npsynergy_aside.add_child(psynergy_spell_list)\n\nvar summon_main = GMain.new()\nsummon_main.add_child(summon_animation_viewport)\n\nbody_container.add_child(psynergy_aside)\nbody_container.add_child(summon_main)\n\nvar footer_action = GFooter.new()\nfooter_action.height = 46.0\nfooter_action.add_child(action_prompt_hbox)\n\ngs_container.add_child(djinns_header)\ngs_container.add_child(body_container)\ngs_container.add_child(footer_action)\nadd_child(gs_container)"
      },
      {
        "title": "3. 大型网游 MMORPG (魔兽世界 / FF14) 全景游戏 HUD 布局",
        "render": "\n          <div style=\"width:100%; border:2px solid #2c3e50; border-radius:12px; overflow:hidden; background:#0b0f19; color:#f1f2f6; font-size:12px; display:flex; flex-direction:column; box-shadow:0 8px 30px rgba(0,0,0,0.6);\">\n            <!-- Top: Target Info & Raid Buffs -->\n            <div style=\"background:rgba(18,24,38,0.95); padding:10px 18px; border-bottom:1px solid #202d42; display:flex; justify-content:space-between; align-items:center;\">\n              <div style=\"display:flex; align-items:center; gap:12px;\">\n                <span style=\"font-weight:700; color:#409eff;\">🛡️ 团队首领战: 熔火核心拉格纳罗斯</span>\n                <span class=\"g-tag g-tag-danger\">狂暴倒计时 04:32</span>\n              </div>\n              <div style=\"display:flex; gap:6px;\">\n                <span class=\"g-tag g-tag-default\">⚔️ 强效王者祝福</span>\n                <span class=\"g-tag g-tag-default\">🛡️ 耐力光环</span>\n                <span class=\"g-tag g-tag-default\">⚡ 嗜血/英勇就绪</span>\n              </div>\n            </div>\n\n            <!-- Middle: Left Team Raid + Center Game World + Right Minimap -->\n            <div style=\"display:flex; min-height:180px;\">\n              <!-- Left: Team Raid Frame (20-man team) -->\n              <div style=\"width:180px; background:rgba(11,15,25,0.9); border-right:1px solid #202d42; padding:10px; display:flex; flex-direction:column; gap:6px;\">\n                <div style=\"font-weight:700; font-size:11px; color:#a4b0be; margin-bottom:2px;\">👥 20人团队框架 (Raid Frame)</div>\n                <div style=\"display:grid; grid-template-columns:1fr 1fr; gap:4px;\">\n                  <div style=\"background:#27ae60; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">主T·战士</div>\n                  <div style=\"background:#27ae60; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">副T·圣骑</div>\n                  <div style=\"background:#2980b9; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">治疗·白魔</div>\n                  <div style=\"background:#2980b9; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">治疗·学者</div>\n                  <div style=\"background:#c0392b; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">DPS·黑魔</div>\n                  <div style=\"background:#c0392b; padding:4px; border-radius:3px; text-align:center; font-size:10px; font-weight:700;\">DPS·龙骑</div>\n                </div>\n              </div>\n\n              <!-- Center: MMORPG Main World View -->\n              <div style=\"flex:1; background:radial-gradient(circle at center, #1e2b40 0%, #0a0e17 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;\">\n                <div style=\"font-size:36px; margin-bottom:6px;\">🔥🌋</div>\n                <div style=\"font-weight:700; color:#f56c6c;\">主战场 3D 视野 (World Camera Viewport)</div>\n                <div style=\"font-size:11px; color:#a4b0be; margin-top:4px;\">当前 FPS: 144 | 延迟: 18ms</div>\n              </div>\n\n              <!-- Right: Minimap & Quest Log -->\n              <div style=\"width:200px; background:rgba(11,15,25,0.9); border-left:1px solid #202d42; padding:10px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"background:#1a233a; height:70px; border-radius:6px; border:1px solid #202d42; display:flex; align-items:center; justify-content:center; color:#409eff; font-weight:600; font-size:11px;\">\n                  🗺️ 小地图 (Minimap)\n                </div>\n                <div style=\"font-size:11px;\">\n                  <div style=\"font-weight:700; color:#e6a23c; margin-bottom:2px;\">📜 史诗任务追踪:</div>\n                  <div style=\"color:#a4b0be; line-height:1.4;\">击败炎魔之王 (1/1)<br>收集萨弗拉斯铁锭 (8/8)</div>\n                </div>\n              </div>\n            </div>\n\n            <!-- Bottom: 12-Slot Action Bar & Chat Window -->\n            <div style=\"background:rgba(18,24,38,0.95); padding:10px 18px; border-top:1px solid #202d42; display:flex; justify-content:space-between; align-items:center;\">\n              <div style=\"display:flex; gap:6px;\">\n                <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">1</button>\n                <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">2</button>\n                <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">3</button>\n                <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">4</button>\n                <button class=\"g-btn g-btn-default\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">Q</button>\n                <button class=\"g-btn g-btn-default\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">E</button>\n                <button class=\"g-btn g-btn-danger\" style=\"width:36px; height:36px; padding:0; font-weight:700;\">R</button>\n              </div>\n              <div style=\"font-size:11px; color:#a4b0be;\">XP: 88,450 / 100,000 (88.4%)</div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: MMORPG 5 分栏全景 HUD 布局 (魔兽/FF14 结构)\nvar mmo_root = GContainer.new()\n\n# 1. 顶栏：首领状态与光环\nvar top_header = GHeader.new()\ntop_header.height = 48.0\ntop_header.add_child(boss_status_hud)\n\n# 2. 中间横向三栏：左侧团队框架 + 中央战场 + 右侧小地图\nvar mid_container = GContainer.new()\nmid_container.direction = GContainer.Direction.HORIZONTAL\n\nvar left_raid = GAside.new()\nleft_raid.width = 180.0\nleft_raid.add_child(raid_frame_grid)\n\nvar center_world = GMain.new()\ncenter_world.add_child(world_viewport_3d)\n\nvar right_minimap = GAside.new()\nright_minimap.width = 200.0\nright_minimap.add_child(minimap_and_quest_tracker)\n\nmid_container.add_child(left_raid)\nmid_container.add_child(center_world)\nmid_container.add_child(right_minimap)\n\n# 3. 底栏：技能快捷键栏与经验条\nvar bottom_bar = GFooter.new()\nbottom_bar.height = 56.0\nbottom_bar.add_child(action_hotkey_slots)\n\n# 4. 组装并挂载\nmmo_root.add_child(top_header)\nmmo_root.add_child(mid_container)\nmmo_root.add_child(bottom_bar)\nadd_child(mmo_root)"
      },
      {
        "title": "4. 经典三栏纸娃娃装备与属性面板 (3-Column Paperdoll)",
        "render": "\n          <div style=\"width:100%; border:1px solid var(--border-base); border-radius:12px; overflow:hidden; background:var(--bg-surface); color:var(--text-primary); font-size:12px; display:flex; flex-direction:column;\">\n            <div style=\"background:var(--bg-card); padding:12px 18px; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n              <span style=\"font-weight:700; font-size:14px; color:var(--primary);\">👤 角色装备与战斗属性面板 (Character Paperdoll)</span>\n              <span class=\"g-tag g-tag-success\">装等 (iLvl): 645</span>\n            </div>\n\n            <div style=\"display:flex; min-height:200px;\">\n              <!-- Left Equipment Column -->\n              <div style=\"width:140px; background:var(--bg-surface); border-right:1px solid var(--border-base); padding:12px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;\">🪖 龙王头盔 +15</div>\n                <div style=\"padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;\">🥋 泰坦胸铠 +15</div>\n                <div style=\"padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;\">⚔️ 圣剑·誓约之刃</div>\n                <div style=\"padding:6px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); text-align:center;\">🛡️ 狮鹫纹章盾</div>\n              </div>\n\n              <!-- Center Model Viewport -->\n              <div style=\"flex:1; background:var(--bg-card); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;\">\n                <div style=\"font-size:48px; margin-bottom:8px;\">🧙‍♂️</div>\n                <div style=\"font-weight:700; font-size:14px;\">大魔导师·罗兰 (Roland)</div>\n                <div style=\"font-size:11px; color:var(--text-secondary); margin-top:2px;\">Lv.99 宗师级奥术大法师</div>\n              </div>\n\n              <!-- Right Attribute Column -->\n              <div style=\"width:160px; background:var(--bg-surface); border-left:1px solid var(--border-base); padding:12px; display:flex; flex-direction:column; gap:6px; font-size:11px;\">\n                <div style=\"font-weight:700; color:var(--primary); margin-bottom:4px;\">📊 基础属性值</div>\n                <div style=\"display:flex; justify-content:space-between;\"><span>物理攻击:</span><b>3,420</b></div>\n                <div style=\"display:flex; justify-content:space-between;\"><span>法术强度:</span><b style=\"color:var(--primary);\">8,950</b></div>\n                <div style=\"display:flex; justify-content:space-between;\"><span>暴击率:</span><b style=\"color:var(--warning);\">68.5%</b></div>\n                <div style=\"display:flex; justify-content:space-between;\"><span>暴击伤害:</span><b>245%</b></div>\n                <div style=\"display:flex; justify-content:space-between;\"><span>元素抗性:</span><b style=\"color:var(--success);\">75.0%</b></div>\n              </div>\n            </div>\n\n            <div style=\"background:var(--bg-card); padding:10px 18px; border-top:1px solid var(--border-base); display:flex; justify-content:flex-end; gap:10px;\">\n              <button class=\"g-btn g-btn-default\" style=\"height:28px; font-size:11px;\" onclick=\"showToast('已一键卸下全部装备')\">一键卸装</button>\n              <button class=\"g-btn g-btn-primary\" style=\"height:28px; font-size:11px;\" onclick=\"showToast('已自动穿戴最高装等神装！', 'success')\">一键穿戴最高装等 ⚡</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 三栏纸娃娃装备与属性面板架构\nvar equip_panel = GContainer.new()\n\nvar header = GHeader.new()\nheader.height = 48.0\nheader.add_child(character_title_hud)\n\nvar body = GContainer.new()\nbody.direction = GContainer.Direction.HORIZONTAL\n\nvar left_slots = GAside.new()\nleft_slots.width = 140.0\nleft_slots.add_child(equipment_slots_vbox)\n\nvar center_model = GMain.new()\ncenter_model.add_child(hero_model_viewport_2d)\n\nvar right_stats = GAside.new()\nright_stats.width = 160.0\nright_stats.add_child(attributes_stats_list)\n\nbody.add_child(left_slots)\nbody.add_child(center_model)\nbody.add_child(right_stats)\n\nvar footer = GFooter.new()\nfooter.height = 48.0\nfooter.add_child(quick_buttons_hbox)\n\nequip_panel.add_child(header)\nequip_panel.add_child(body)\nequip_panel.add_child(footer)\nadd_child(equip_panel)"
      },
      {
        "title": "5. 网游商城与祈愿抽卡 Multi-container 布局 (Market & Gacha Studio)",
        "render": "\n          <div style=\"width:100%; border:1px solid var(--border-base); border-radius:12px; overflow:hidden; background:var(--bg-surface); color:var(--text-primary); font-size:12px; display:flex; flex-direction:column;\">\n            <!-- Top: Player Currency HUD -->\n            <div style=\"background:var(--bg-card); padding:10px 18px; border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n              <span style=\"font-weight:700; color:var(--warning); font-size:13px;\">🛒 远古星辰道具商城 & 英雄祈愿池</span>\n              <div style=\"display:flex; gap:14px; font-weight:600;\">\n                <span>💎 钻石: <b style=\"color:var(--primary);\">12,800</b></span>\n                <span>🔮 纠缠之缘: <b style=\"color:var(--warning);\">45</b></span>\n                <span>🪙 金币: <b style=\"color:var(--success);\">3,450,000</b></span>\n              </div>\n            </div>\n\n            <!-- Middle: Left Categories + Center Gacha Showcase -->\n            <div style=\"display:flex; min-height:180px;\">\n              <div style=\"width:140px; background:var(--bg-surface); border-right:1px solid var(--border-base); padding:10px; display:flex; flex-direction:column; gap:6px;\">\n                <div style=\"padding:8px; background:var(--primary); color:#fff; border-radius:6px; font-weight:600; text-align:center; cursor:pointer;\">✨ 限时神话卡池</div>\n                <div style=\"padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;\" onclick=\"showToast('切换至武器专武池')\">⚔️ 专属武器库</div>\n                <div style=\"padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;\" onclick=\"showToast('切换至道具商城')\">🧪 消耗品杂货</div>\n                <div style=\"padding:8px; background:var(--bg-card); border-radius:6px; text-align:center; cursor:pointer;\" onclick=\"showToast('切换至皮肤工坊')\">🎨 英雄限定皮肤</div>\n              </div>\n\n              <div style=\"flex:1; background:radial-gradient(circle at center, rgba(64,158,255,0.15) 0%, var(--bg-card) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;\">\n                <div style=\"font-size:40px; margin-bottom:6px;\">🌟⚔️</div>\n                <div style=\"font-weight:800; font-size:15px; color:var(--primary);\">【星穹破晓】限定 SSR 圣剑女武神 · 概率 UP!</div>\n                <div style=\"font-size:11px; color:var(--text-secondary); margin-top:4px;\">保底计数: 72/90 抽必出金色传说</div>\n              </div>\n            </div>\n\n            <!-- Bottom: 1-Pull & 10-Pull Buttons -->\n            <div style=\"background:var(--bg-card); padding:12px 18px; border-top:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n              <span style=\"font-size:11px; color:var(--text-secondary);\">单次祈愿消耗 1 颗祈愿石，十连必得 SR 以上道具</span>\n              <div style=\"display:flex; gap:10px;\">\n                <button class=\"g-btn g-btn-default\" style=\"height:32px; font-weight:600;\" onclick=\"showToast('单抽祈愿: 获得【星光精粹】x1')\">祈愿 1 次 (160 💎)</button>\n                <button class=\"g-btn g-btn-primary\" style=\"height:32px; font-weight:700;\" onclick=\"showToast('🎉 十连抽大爆！恭喜获得金色传说【圣剑女武神】！', 'success')\">祈愿 10 次 (1600 💎) ✨</button>\n              </div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 商城与祈愿抽卡 Multi-container 布局\nvar shop_root = GContainer.new()\n\nvar currency_header = GHeader.new()\ncurrency_header.height = 46.0\ncurrency_header.add_child(currency_status_bar)\n\nvar shop_body = GContainer.new()\nshop_body.direction = GContainer.Direction.HORIZONTAL\n\nvar tab_aside = GAside.new()\ntab_aside.width = 140.0\ntab_aside.add_child(category_tabs_vbox)\n\nvar gacha_main = GMain.new()\ngacha_main.add_child(gacha_banner_showcase)\n\nshop_body.add_child(tab_aside)\nshop_body.add_child(gacha_main)\n\nvar gacha_footer = GFooter.new()\ngacha_footer.height = 56.0\ngacha_footer.add_child(pull_buttons_hbox)\n\nshop_root.add_child(currency_header)\nshop_root.add_child(shop_body)\nshop_root.add_child(gacha_footer)\nadd_child(shop_root)"
      },
      {
        "title": "6. 基础结构：顶栏 + 主要区域 + 底栏 (Header + Main + Footer)",
        "render": "\n          <div style=\"width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; display:flex; flex-direction:column; text-align:center; font-size:13px; font-weight:600;\">\n            <div style=\"background:rgba(64,158,255,0.18); color:var(--primary); padding:16px; border-bottom:1px solid var(--border-base);\">GHeader (高度: 60px)</div>\n            <div style=\"background:rgba(103,194,58,0.12); color:var(--success); padding:36px; min-height:120px; display:flex; align-items:center; justify-content:center;\">GMain (自动撑满剩余空间)</div>\n            <div style=\"background:rgba(64,158,255,0.18); color:var(--primary); padding:16px; border-top:1px solid var(--border-base);\">GFooter (高度: 60px)</div>\n          </div>\n        ",
        "code": "# GDScript: Header + Main + Footer 基础上下布局\nvar container = GContainer.new()\ncontainer.add_child(GHeader.new())\ncontainer.add_child(GMain.new())\ncontainer.add_child(GFooter.new())\nadd_child(container)"
      },
      {
        "title": "7. 基础结构：侧边栏通顶 + 顶栏与内容 (Aside + (Header + Main + Footer))",
        "render": "\n          <div style=\"width:100%; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; display:flex; text-align:center; font-size:13px; font-weight:600;\">\n            <div style=\"background:rgba(230,162,60,0.15); color:var(--warning); width:150px; display:flex; align-items:center; justify-content:center; border-right:1px solid var(--border-base);\">GAside (通顶导航)</div>\n            <div style=\"flex:1; display:flex; flex-direction:column;\">\n              <div style=\"background:rgba(64,158,255,0.18); color:var(--primary); padding:14px; border-bottom:1px solid var(--border-base);\">GHeader</div>\n              <div style=\"background:rgba(103,194,58,0.12); color:var(--success); min-height:120px; display:flex; align-items:center; justify-content:center;\">GMain</div>\n              <div style=\"background:rgba(64,158,255,0.18); color:var(--primary); padding:14px; border-top:1px solid var(--border-base);\">GFooter</div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: Aside + (Header + Main + Footer) 侧边栏通顶布局\nvar root_container = GContainer.new()\nvar aside = GAside.new()\nvar right_box = GContainer.new()\n\nright_box.add_child(GHeader.new())\nright_box.add_child(GMain.new())\nright_box.add_child(GFooter.new())\n\nroot_container.add_child(aside)\nroot_container.add_child(right_box)\nadd_child(root_container)"
      }
    ],
    "props": [
      {
        "name": "direction",
        "type": "enum",
        "default": "AUTO",
        "desc": "子元素排列方向：AUTO (包含 Header/Footer 时自动垂直，否则水平), HORIZONTAL, VERTICAL"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "css(rules_or_func: Variant)",
        "desc": "链式设定当前容器的样式规则",
        "params": "(rules_or_func: Variant) -> GContainer"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "容器内部承载的子节点插槽",
        "child": "Control / VBoxContainer / HBoxContainer",
        "example": "<template #default><GButton>内部控件</GButton></template>"
      }
    ],
    "paneProps": [
      {
        "name": "GHeader.height",
        "type": "float",
        "default": "60.0",
        "desc": "顶栏容器的高度 (像素)"
      },
      {
        "name": "GAside.width",
        "type": "float",
        "default": "200.0",
        "desc": "侧边栏容器的宽度 (像素)"
      },
      {
        "name": "GMain.size_flags",
        "type": "int",
        "default": "SIZE_EXPAND_FILL",
        "desc": "主要区域自动撑满并占满可用空间"
      },
      {
        "name": "GFooter.height",
        "type": "float",
        "default": "60.0",
        "desc": "底栏容器的高度 (像素)"
      }
    ]
  },
  "divider": {
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
  },
  "icon": {
    "title": "Icon 矢量图标 (GIcon)",
    "desc": "专为 Godot 4 打造的高性能全场景矢量图标超级组件库，已完整集成 GameIcons.net (4,134+ 游戏与RPG)、Tabler Icons (6,232+)、SimpleIcons (3,730+ 品牌与科技)、RemixIcon (3,229+)、字节跳动 IconPark (2,658+)、Lucide (1,854+)、FontAwesome 6 (1,407+)、PixelArt 像素艺术 (1,306+)、Nieobie Game (815+) 与 Godot @icons (623+) 全量 26,000+ 本地离线矢量 SVG 图标资产，并支持 IconBuddy / Iconify 300,000+ 全域云端即时检索！",
    "demos": [
      {
        "title": "1. 26,000+ 本地离线图库 & 300,000+ 全网图库超级检索中心",
        "render": "\n          <div class=\"icon-gallery-container\" id=\"iconGalleryContainer\">\n            <div style=\"display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text-regular); background:rgba(64, 158, 255, 0.08); border:1px solid rgba(64, 158, 255, 0.25); border-radius:var(--radius); padding:8px 14px;\">\n              <i class=\"fa-solid fa-circle-info\" style=\"color:var(--primary); font-size:14px;\"></i>\n              <span>💡 <strong>操作提示</strong>：点击下方任意图标卡片即可直接复制对应图标的 GDScript 实例化代码与 <code>@icon</code> 注解路径。</span>\n            </div>\n\n            <!-- Copy Format & Quick Tools -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:8px 12px; font-size:12px;\">\n              <div style=\"display:flex; align-items:center; gap:6px; flex-wrap:wrap;\">\n                <span style=\"font-weight:600; color:var(--text-primary);\">📋 点击复制格式:</span>\n                <div style=\"display:flex; gap:4px;\" id=\"copyFormatBtnGroup\">\n                  <button class=\"icon-category-btn active\" onclick=\"window.setCopyFormat('gdscript', this)\" title=\"复制 GIcon 实例化代码\">GDScript 实例</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('annotation', this)\" title=\"复制 @icon 注解路径\">@icon 注解</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('bbcode', this)\" title=\"复制富文本 [img] 标签\">BBCode [img]</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('svg', this)\" title=\"复制原生 SVG 代码\">SVG 源码</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('datauri', this)\" title=\"复制 Base64 DataURI\">Base64 DataURI</button>\n                </div>\n              </div>\n              <div style=\"display:flex; align-items:center; gap:8px;\">\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('favorites', this)\" style=\"color:#f59e0b; font-weight:600;\">\n                  <i class=\"fa-solid fa-star\"></i> ⭐ 我的收藏\n                </button>\n              </div>\n            </div>\n\n            <!-- Library Source Selector -->\n            <div style=\"display:flex; gap:6px; flex-wrap:wrap; align-items:center;\">\n              <span style=\"font-size:12px; font-weight:600; color:var(--text-secondary);\">10 大主流图库:</span>\n              <button class=\"icon-category-btn active\" onclick=\"window.filterIconLib('all', this)\">全部图库 (<span id=\"iconCountBadge\">26,000+</span>)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('gameicons', this)\">⚔️ GameIcons RPG (4,134+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('pixel', this)\">👾 PixelArt 像素 (1,306+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('nieobie', this)\">🎒 Nieobie 游戏 (815+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('at-icons', this)\">🎮 Godot @icons (623+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('iconpark', this)\">🚀 字节 IconPark (2,658+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('tabler', this)\">⚡ Tabler UI (6,232+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('remix', this)\">💎 RemixIcon (3,229+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('lucide', this)\">✨ Lucide UI (1,854+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('fontawesome', this)\">🏷️ FontAwesome 6 (1,407+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('brands', this)\">🌐 品牌与科技 (3,730+)</button>\n            </div>\n\n            <!-- Categories and Search -->\n            <div class=\"icon-toolbar\">\n              <div class=\"icon-category-tabs\">\n                <button class=\"icon-category-btn active\" onclick=\"window.filterIconCategory('all', this)\">全部分类</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('game', this)\">⚔️ 游戏战斗与魔法</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('items', this)\">🎒 装备道具与食材</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('ui', this)\">🎛️ 基础 UI 与控件</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('media', this)\">🎵 媒体音效与设备</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('nature', this)\">🍃 自然建筑与天气</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('system', this)\">⚙️ 系统节点与科技</button>\n              </div>\n              <div class=\"icon-search-wrapper\">\n                <input type=\"text\" id=\"iconSearchInput\" class=\"icon-search-input\" placeholder=\"🔍 搜索 26,000+ 离线 / 300,000+ 全网图标 (如 sword, dragon, clear)...\" \n                       oninput=\"window.handleIconSearchInput(this.value)\">\n                <span id=\"iconSearchClearBtn\" class=\"icon-search-clear-btn\" onclick=\"window.clearIconSearch()\" style=\"display:none;\" title=\"一键清空搜索内容\">\n                  <i class=\"fa-solid fa-circle-xmark\"></i>\n                </span>\n              </div>\n            </div>\n\n            <!-- Size & Color Controls -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; font-size:12px; color:var(--text-secondary); background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px 14px;\">\n              <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n                <span id=\"iconFilteredCount\" style=\"font-weight:600; color:var(--text-primary); margin-right:6px;\">共检索到 25,988 个图标</span>\n                <span>尺寸 (偶数步进):</span>\n                <div style=\"display:flex; align-items:center; gap:4px;\" id=\"iconSizeBtnGroup\">\n                  <button class=\"icon-size-btn\" data-size=\"10\" onclick=\"window.changeIconSize(10, this)\">10px</button>\n                  <button class=\"icon-size-btn active\" data-size=\"16\" onclick=\"window.changeIconSize(16, this)\">16px (默认)</button>\n                  <button class=\"icon-size-btn\" data-size=\"24\" onclick=\"window.changeIconSize(24, this)\">24px</button>\n                  <button class=\"icon-size-btn\" data-size=\"32\" onclick=\"window.changeIconSize(32, this)\">32px</button>\n                  <button class=\"icon-size-btn\" data-size=\"48\" onclick=\"window.changeIconSize(48, this)\">48px</button>\n                  <button class=\"icon-size-btn\" data-size=\"64\" onclick=\"window.changeIconSize(64, this)\">64px</button>\n                  <button class=\"icon-size-btn\" data-size=\"96\" onclick=\"window.changeIconSize(96, this)\">96px</button>\n                  <button class=\"icon-size-btn\" data-size=\"128\" onclick=\"window.changeIconSize(128, this)\">128px</button>\n                </div>\n\n                <div class=\"icon-size-input-wrapper\" title=\"自定义输入偶数尺寸 (步长 2px)\">\n                  <button class=\"icon-size-step-btn\" onclick=\"window.stepIconSize(-2)\" title=\"减小 2px\"><i class=\"fa-solid fa-minus\"></i></button>\n                  <input type=\"number\" id=\"iconCustomSizeInput\" class=\"icon-custom-size-input\" value=\"16\" min=\"8\" max=\"256\" step=\"2\"\n                         oninput=\"window.changeIconSizeInput(this.value)\" onchange=\"window.changeIconSize(this.value, null)\">\n                  <span style=\"font-size:10px; color:var(--text-secondary); font-weight:600;\">px</span>\n                  <button class=\"icon-size-step-btn\" onclick=\"window.stepIconSize(2)\" title=\"增加 2px\"><i class=\"fa-solid fa-plus\"></i></button>\n                </div>\n              </div>\n\n              <div style=\"display:flex; align-items:center; gap:10px; flex-wrap:wrap;\">\n                <span style=\"font-weight:500;\">Godot 着色方案:</span>\n                <div style=\"display:flex; align-items:center; gap:8px;\">\n                  <span class=\"icon-color-swatch active\" style=\"background:#409eff;\" onclick=\"window.changeIconColor('#409eff', this)\" title=\"Element 蓝 (#409eff)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#8da5f5;\" onclick=\"window.changeIconColor('#8da5f5', this)\" title=\"Godot Node2D 蓝 (#8da5f5)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#8df58d;\" onclick=\"window.changeIconColor('#8df58d', this)\" title=\"Godot Control 绿 (#8df58d)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#fc7f7f;\" onclick=\"window.changeIconColor('#fc7f7f', this)\" title=\"Godot Node3D 红 (#fc7f7f)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ff9f43;\" onclick=\"window.changeIconColor('#ff9f43', this)\" title=\"Godot Animation 橙 (#ff9f43)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#a855f7;\" onclick=\"window.changeIconColor('#a855f7', this)\" title=\"神话/魔法紫 (#a855f7)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ffffff;\" onclick=\"window.changeIconColor('#ffffff', this)\" title=\"原生 Node 白 (#ffffff)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ffd04b;\" onclick=\"window.changeIconColor('#ffd04b', this)\" title=\"金币/成就黄 (#ffd04b)\"></span>\n                  \n                  <div style=\"display:flex; align-items:center; gap:4px; margin-left:4px; padding-left:8px; border-left:1px solid var(--border-base);\">\n                    <span style=\"font-size:11px;\">自定义:</span>\n                    <input type=\"color\" id=\"iconCustomColorInput\" class=\"icon-custom-color-picker\" value=\"#409eff\" \n                           onchange=\"window.changeIconColor(this.value, null)\" oninput=\"window.changeIconColor(this.value, null)\" \n                           title=\"点击打开全色域取色盘\">\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"icon-grid-list\" id=\"iconGridList\"></div>\n            <div class=\"icon-pagination-bar\" id=\"iconPaginationBar\"></div>\n          </div>\n        ",
        "code": "# GDScript: 1. 动态实例化 GIcon 矢量图标 (支持 26,000+ 本地离线图标)\nvar icon = GIcon.new(\"sword\", 16.0, Color(\"#409eff\"))\nadd_child(icon)\n\n# GDScript: 2. 在自定义 Node 脚本顶部使用 @icon 注解 (Godot 4.x 原生支持)\n@icon(\"res://addons/gotod_ui/assets/icons/gameicons/sword.svg\")\nclass_name MyCustomWeaponNode extends Node2D\n\n# 动态修改图标名称与色彩\nicon.icon_name = \"chest\"\nicon.icon_color = Color(\"#e6a23c\")\nicon.icon_size = 32.0"
      },
      {
        "title": "2. 常用尺寸与主题着色 (Scalable Sizes & Theme Colors)",
        "render": "\n          <div style=\"display:flex; gap:24px; align-items:center; flex-wrap:wrap;\">\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-gamepad\" style=\"font-size:16px; color:var(--primary);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">16px (迷你)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-shield\" style=\"font-size:24px; color:var(--success);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">24px (标准)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-coins\" style=\"font-size:32px; color:var(--warning);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">32px (中型)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-wand-magic-sparkles\" style=\"font-size:44px; color:#a855f7;\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">44px (神话特大)</span>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 多尺寸与色彩设定\nvar icon_mini = GIcon.new(\"gamepad\", 16.0, GotodTheme.get_color(\"primary\"))\nvar icon_std = GIcon.new(\"shield\", 24.0, GotodTheme.get_color(\"success\"))\nvar icon_large = GIcon.new(\"wand-magic-sparkles\", 44.0, Color(\"#a855f7\"))\nadd_child(icon_large)"
      },
      {
        "title": "3. 持续旋转动画 (Spin Animation & Loading)",
        "render": "\n          <div style=\"display:flex; gap:28px; align-items:center;\">\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:24px; color:var(--primary);\"></i>\n              <span style=\"font-size:13px;\">加载中... (spinner spin)</span>\n            </div>\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-rotate fa-spin\" style=\"font-size:24px; color:var(--warning);\"></i>\n              <span style=\"font-size:13px;\">同步中... (rotate spin)</span>\n            </div>\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-gear fa-spin\" style=\"font-size:24px; color:var(--success);\"></i>\n              <span style=\"font-size:13px;\">引擎运转中 (gear spin)</span>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 开启持续旋转动画\nvar loading_icon = GIcon.new(\"spinner\", 24.0, Color(\"#409eff\"))\nloading_icon.spin = true # 👈 开启持续匀速旋转动画\nadd_child(loading_icon)"
      },
      {
        "title": "4. 结合按钮、输入框与徽标组件装配 (Component Integration)",
        "render": "\n          <div style=\"display:flex; gap:16px; align-items:center; flex-wrap:wrap;\">\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('点击了带魔法棒图标的按钮', 'success')\">\n              <i class=\"fa-solid fa-wand-magic-sparkles\"></i> 强化附魔\n            </button>\n            <button class=\"g-btn g-btn-danger\" onclick=\"showToast('点击了战斗开战按钮', 'info')\">\n              <i class=\"fa-solid fa-fire\"></i> 立即开战\n            </button>\n            <div style=\"position:relative; display:inline-block;\">\n              <i class=\"fa-solid fa-bell\" style=\"font-size:22px; color:var(--text-primary);\"></i>\n              <span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;\">9+</span>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 结合按钮插槽装配图标\nvar btn = GButton.new()\nbtn.text = \"强化附魔\"\nbtn.icon = GIcon.new(\"wand-magic-sparkles\") # 自动装配前缀图标\nadd_child(btn)"
      }
    ],
    "props": [
      {
        "name": "icon_name",
        "type": "String",
        "default": "\"gamepad\"",
        "desc": "图标名称（支持 26,000+ 离线矢量图标 & 300,000+ 全网图库）"
      },
      {
        "name": "icon_size",
        "type": "float",
        "default": "16.0",
        "desc": "图标渲染尺寸（像素宽高）"
      },
      {
        "name": "icon_color",
        "type": "Color",
        "default": "Color.WHITE",
        "desc": "图标调制着色"
      },
      {
        "name": "spin",
        "type": "boolean",
        "default": "false",
        "desc": "是否开启持续顺时针旋转动画"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "_init(name=\"gamepad\", size=16.0, color=Color.WHITE)",
        "desc": "便捷构造函数",
        "params": "(name: String, size: float, color: Color) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "自定义矢量图形或纹理节点插槽",
        "child": "TextureRect / Control",
        "example": "<template #default><TextureRect texture=\"res://icon.png\" /></template>"
      },
      {
        "name": "badge",
        "desc": "图标右上角徽标插槽",
        "child": "GBadge / Control",
        "example": "<template #badge><GBadge value=\"99+\" /></template>"
      }
    ]
  },
  "fab": {
    "title": "Fab 悬浮操作按钮 (GFab)",
    "desc": "悬浮在游戏界面或应用四角的快捷操作按钮，支持多方向展开菜单（Top/Bottom/Left/Right）、快捷轮盘、边缘吸附与未读消息徽标。",
    "demos": [
      {
        "title": "1. 基础右下角悬浮按钮与展开交互 (Basic Expandable FAB: 点击切换展开/折叠)",
        "render": "\n      <div style=\"position:relative; height:130px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden; padding:12px;\">\n        <span style=\"font-size:12px; color:var(--text-secondary);\">点击右下角绿色悬浮按钮查看展开动画与操作项：</span>\n        <!-- Floating FAB Menu -->\n        <div style=\"position:absolute; bottom:12px; right:12px; display:flex; flex-direction:column; align-items:center; gap:8px;\">\n          <!-- Sub Actions (Slide in/out) -->\n          <div id=\"fabDemo1Actions\" style=\"display:none; flex-direction:column; gap:8px; align-items:center; transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-size:13px;\" title=\"新建副本\" onclick=\"showToast('已创建新副本队伍！', 'success')\">\n              <i class=\"fa-solid fa-plus\"></i>\n            </button>\n            <button class=\"g-btn g-btn-warning\" style=\"width:36px; height:36px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-size:13px;\" title=\"扫码加入\" onclick=\"showToast('已呼出扫码加队镜头', 'info')\">\n              <i class=\"fa-solid fa-qrcode\"></i>\n            </button>\n          </div>\n          <!-- Main Trigger Button -->\n          <button id=\"fabDemo1Trigger\" class=\"g-btn g-btn-success\" style=\"width:46px; height:46px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,0,0,0.35); font-size:18px; transition:transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);\" onclick=\"\n            const acts = document.getElementById('fabDemo1Actions');\n            const icon = document.getElementById('fabDemo1Icon');\n            const isHidden = (acts.style.display === 'none' || acts.style.display === '');\n            if (isHidden) {\n              acts.style.display = 'flex';\n              icon.style.transform = 'rotate(45deg)';\n            } else {\n              acts.style.display = 'none';\n              icon.style.transform = 'rotate(0deg)';\n            }\n          \">\n            <i id=\"fabDemo1Icon\" class=\"fa-solid fa-plus\" style=\"transition:transform 0.25s;\"></i>\n          </button>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 基础展开式悬浮按钮\nvar fab = GFab.new(\"plus\")\nfab.direction = GFab.Direction.TOP\nfab.add_action(\"plus\", \"新建副本\")\nfab.add_action(\"qrcode\", \"扫码加入\")\nadd_child(fab)"
      },
      {
        "title": "2. 多动作横向展开菜单 (Expandable Action Menu: 点击齿轮展开 3 项操作)",
        "render": "\n      <div style=\"position:relative; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; align-items:center; padding:0 16px; gap:12px;\">\n        <!-- Main Trigger -->\n        <button id=\"fabGearTrigger\" class=\"g-btn g-btn-primary\" style=\"width:44px; height:44px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 12px rgba(64,158,255,0.4); transition:transform 0.3s;\" onclick=\"\n          const menu = document.getElementById('fabGearSubMenu');\n          const isHidden = menu.style.display === 'none';\n          if (isHidden) {\n            menu.style.display = 'flex';\n            this.style.transform = 'rotate(90deg)';\n            this.className = 'g-btn g-btn-danger';\n          } else {\n            menu.style.display = 'none';\n            this.style.transform = 'rotate(0deg)';\n            this.className = 'g-btn g-btn-primary';\n          }\n        \">\n          <i class=\"fa-solid fa-gear\"></i>\n        </button>\n\n        <span style=\"font-size:12px; color:var(--text-secondary);\">← 点击齿轮展开/收起快捷动作：</span>\n\n        <!-- Expanded Sub-actions -->\n        <div id=\"fabGearSubMenu\" style=\"display:flex; gap:10px; align-items:center;\">\n          <button class=\"g-btn g-btn-default\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"保存数据\" onclick=\"showToast('数据已成功保存至 Slot 1！', 'success')\">\n            <i class=\"fa-solid fa-save\"></i>\n          </button>\n          <button class=\"g-btn g-btn-default\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"分享战报\" onclick=\"showToast('已生成战报分享海报！', 'info')\">\n            <i class=\"fa-solid fa-share-nodes\"></i>\n          </button>\n          <button class=\"g-btn g-btn-danger\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"退出房间\" onclick=\"showToast('已安全退出当前公会战！', 'warning')\">\n            <i class=\"fa-solid fa-arrow-right-from-bracket\"></i>\n          </button>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 横向展开动作菜单\nvar fab = GFab.new(\"gear\")\nfab.direction = GFab.Direction.RIGHT\nfab.add_action(\"save\", \"保存数据\")\nfab.add_action(\"share-nodes\", \"分享战报\")\nfab.add_action(\"arrow-right-from-bracket\", \"退出房间\")"
      },
      {
        "title": "3. 游戏战斗快捷药剂轮盘 (Game Quick Item Potion FAB)",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); max-width:420px; position:relative; overflow:hidden;\">\n        <button class=\"g-btn g-btn-danger\" style=\"width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 0 14px rgba(239,68,68,0.5); cursor:pointer;\" onclick=\"\n          showToast('🧪 使用大生命药水: 生命值恢复 +500 HP！', 'success');\n          const pop = document.getElementById('fabHpPop');\n          pop.style.opacity = '1';\n          pop.style.transform = 'translateY(-20px)';\n          setTimeout(() => {\n            pop.style.opacity = '0';\n            pop.style.transform = 'translateY(0)';\n          }, 1200);\n        \">\n          🧪\n        </button>\n        <div style=\"font-size:12px;\">\n          <div style=\"font-weight:700; color:var(--text-primary);\">战斗快捷消耗品 (Quick Potion)</div>\n          <div style=\"color:var(--text-secondary); margin-top:2px;\">点击药剂瓶实时使用并飘字回血</div>\n        </div>\n        <span id=\"fabHpPop\" style=\"position:absolute; right:30px; font-weight:800; color:#22c55e; font-size:16px; opacity:0; transition:all 0.6s cubic-bezier(0.16, 1, 0.3, 1);\">+500 HP 💚</span>\n      </div>\n    ",
        "code": "# GDScript: 游戏药剂快捷轮盘\nvar potion_fab = GFab.new_quick_item(\"potion_red\")\npotion_fab.clicked.connect(func(): Player.heal(500))"
      },
      {
        "title": "4. 自由拖拽与边缘贴边吸附 (Draggable & Magnetic Docking: 试着在区域内拖动按钮)",
        "render": `
      <div id="fabDragContainer" style="position:relative; height:120px; background:var(--bg-surface); border:2px dashed var(--primary); border-radius:8px; overflow:hidden; user-select:none; padding:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:11px; color:var(--text-secondary);"><i class="fa-solid fa-arrows-up-down-left-right" style="color:var(--primary);"></i> 🖱️ 用鼠标/手指按住下方 FAB 按钮自由拖拽，松手后自动平滑吸附到最近边缘：</span>
          <div style="display:flex; gap:6px;">
            <button class="g-btn g-btn-default" style="font-size:10px; padding:1px 6px;" onclick="const f=document.getElementById('draggableFab'); f.style.transition='left 0.35s cubic-bezier(0.16,1,0.3,1)'; f.style.left='16px'; showToast('FAB 已贴靠至左侧边缘', 'info');">⬅️ 贴左</button>
            <button class="g-btn g-btn-default" style="font-size:10px; padding:1px 6px;" onclick="const f=document.getElementById('draggableFab'); const c=f.parentElement; f.style.transition='left 0.35s cubic-bezier(0.16,1,0.3,1)'; f.style.left=(c.clientWidth-60)+'px'; showToast('FAB 已贴靠至右侧边缘', 'info');">➡️ 贴右</button>
          </div>
        </div>
        <!-- Draggable FAB Circle -->
        <div id="draggableFab" style="position:absolute; left:20px; bottom:14px; width:44px; height:44px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:grab; box-shadow:0 6px 16px rgba(0,0,0,0.3); transition:left 0.35s cubic-bezier(0.16, 1, 0.3, 1);" onmousedown="window.startFabDrag(event, this)" ontouchstart="window.startFabDrag(event, this)">
          <i class="fa-solid fa-arrows-up-down-left-right"></i>
        </div>
      </div>
    `,
        "code": "# GDScript: 自由拖拽与自动吸附贴边\nfab.draggable = true\nfab.magnetic_dock = true # 松手后自动平滑吸附最近屏幕边缘"
      },
      {
        "title": "5. 带未读徽标与一键已读 (Badge & Notification Integration)",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center;\">\n        <div style=\"position:relative; display:inline-block;\">\n          <button id=\"fabMsgBtn\" class=\"g-btn g-btn-primary\" style=\"width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(64,158,255,0.4);\" onclick=\"\n            const b = document.getElementById('fabMsgBadge');\n            b.style.display = 'none';\n            showToast('已查看所有未读私信，徽标已清除！', 'success');\n          \">\n            <i class=\"fa-solid fa-comment-dots\" style=\"font-size:20px;\"></i>\n          </button>\n          <span id=\"fabMsgBadge\" class=\"g-badge\" style=\"position:absolute; top:-4px; right:-4px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700;\">8</span>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">点击悬浮聊天按钮可查看未读消息并自动清空未读角标</span>\n      </div>\n    ",
        "code": "# GDScript: 带未读消息徽标\nfab.badge = GBadge.new(8)\nfab.clicked.connect(func(): fab.badge.clear())"
      }
    ],
    "props": [
      {
        "name": "icon",
        "type": "String",
        "default": "\"plus\"",
        "desc": "悬浮按钮主图标"
      },
      {
        "name": "direction",
        "type": "GFab.Direction",
        "default": "TOP",
        "desc": "菜单展开方向 (TOP / BOTTOM / LEFT / RIGHT)"
      },
      {
        "name": "draggable",
        "type": "bool",
        "default": "false",
        "desc": "是否允许玩家在屏幕上拖拽"
      },
      {
        "name": "magnetic_dock",
        "type": "bool",
        "default": "true",
        "desc": "松手后是否自动吸附贴边"
      }
    ],
    "events": [
      {
        "name": "clicked",
        "params": "()",
        "desc": "点击主按钮触发"
      },
      {
        "name": "action_selected",
        "params": "(action_name: String)",
        "desc": "点击子菜单项触发"
      }
    ],
    "methods": [],
    "slots": []
  },
  "input": {
    "title": "Input 输入框 (GInput)",
    "desc": "通过鼠标或键盘输入字符的基础表单控件。包含基础用法、一键清空、密码切换、带前缀/后缀、校验状态描边、禁用与尺寸控制等完整场景。",
    "demos": [
      {
        "title": "1. 基础输入与禁用状态 (Basic Input & Disabled)",
        "render": "\n      <div style=\"display:flex; gap:12px; max-width:440px; flex-wrap:wrap;\">\n        <input type=\"text\" class=\"g-input\" placeholder=\"请输入玩家昵称...\" style=\"width:200px;\">\n        <input type=\"text\" class=\"g-input\" placeholder=\"已禁用输入\" disabled style=\"width:200px; opacity:0.5;\">\n      </div>\n    ",
        "code": "# GDScript: 基础输入框\nvar input = GInput.new()\ninput.placeholder = \"请输入玩家昵称...\"\nadd_child(input)"
      },
      {
        "title": "2. 状态验证与反馈边框 (Validation Status: Success / Warning / Error)",
        "render": "\n      <div style=\"display:flex; flex-direction:column; gap:12px; max-width:380px;\">\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"Arthur_Legend\" style=\"width:100%; border-color:var(--success); padding-right:32px;\">\n            <i class=\"fa-solid fa-circle-check\" style=\"position:absolute; right:10px; top:10px; color:var(--success);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--success); margin-top:2px; display:block;\">✓ 昵称格式正确且未被占用</span>\n        </div>\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"13800\" style=\"width:100%; border-color:var(--warning); padding-right:32px;\">\n            <i class=\"fa-solid fa-triangle-exclamation\" style=\"position:absolute; right:10px; top:10px; color:var(--warning);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--warning); margin-top:2px; display:block;\">⚠ 手机号位数不足 11 位</span>\n        </div>\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"invalid_email@\" style=\"width:100%; border-color:var(--danger); padding-right:32px;\">\n            <i class=\"fa-solid fa-circle-xmark\" style=\"position:absolute; right:10px; top:10px; color:var(--danger);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--danger); margin-top:2px; display:block;\">✗ 请输入有效的电子邮箱格式 (xxx@domain.com)</span>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 状态校验\ninput.status = GInput.Status.ERROR # SUCCESS, WARNING, ERROR\ninput.status_message = \"请输入有效的电子邮箱\""
      },
      {
        "title": "3. 正则表达式实时格式校验 (Regex Realtime Validation)",
        "render": "\n      <div style=\"max-width:380px;\">\n        <input type=\"text\" class=\"g-input\" id=\"regInput\" placeholder=\"输入 6~16 位英文+数字账号...\" style=\"width:100%;\" oninput=\"\n          const val = this.value;\n          const reg = /^[a-zA-Z0-9]{6,16}$/;\n          const tip = document.getElementById('regTip');\n          if (!val) {\n            this.style.borderColor = 'var(--border-base)';\n            tip.innerText = '格式要求：6~16 位英文字母与数字组合';\n            tip.style.color = 'var(--text-secondary)';\n          } else if (reg.test(val)) {\n            this.style.borderColor = 'var(--success)';\n            tip.innerText = '✓ 账号格式合法！';\n            tip.style.color = 'var(--success)';\n          } else {\n            this.style.borderColor = 'var(--danger)';\n            tip.innerText = '✗ 格式错误：只能包含 6~16 位英文或数字！';\n            tip.style.color = 'var(--danger)';\n          }\n        \">\n        <span id=\"regTip\" style=\"font-size:11px; color:var(--text-secondary); margin-top:4px; display:block;\">格式要求：6~16 位英文字母与数字组合</span>\n      </div>\n    ",
        "code": "# GDScript: 正则校验规则\ninput.validation_pattern = \"^[a-zA-Z0-9]{6,16}$\"\ninput.validate_on_input = true\ninput.validation_failed.connect(func(err): print(\"校验失败:\", err))"
      },
      {
        "title": "4. 异步防抖远程查重校验 (Async Validator: Username Availability Check)",
        "render": "\n      <div style=\"max-width:380px;\">\n        <div style=\"position:relative;\">\n          <input type=\"text\" class=\"g-input\" id=\"asyncInput\" placeholder=\"输入玩家昵称实时查重...\" style=\"width:100%; padding-right:32px;\" oninput=\"\n            const spin = document.getElementById('asyncSpin');\n            const tip = document.getElementById('asyncTip');\n            spin.style.display = 'block';\n            tip.innerText = '正在向服务器校验昵称唯一性...';\n            tip.style.color = 'var(--text-secondary)';\n            clearTimeout(window.asyncTimer);\n            window.asyncTimer = setTimeout(() => {\n              spin.style.display = 'none';\n              if (document.getElementById('asyncInput').value === 'admin' || document.getElementById('asyncInput').value === 'godot') {\n                document.getElementById('asyncInput').style.borderColor = 'var(--danger)';\n                tip.innerText = '✗ 该昵称已被其他玩家注册，请更换！';\n                tip.style.color = 'var(--danger)';\n              } else {\n                document.getElementById('asyncInput').style.borderColor = 'var(--success)';\n                tip.innerText = '✓ 该昵称可以使用！';\n                tip.style.color = 'var(--success)';\n              }\n            }, 600);\n          \">\n          <i id=\"asyncSpin\" class=\"fa-solid fa-spinner fa-spin\" style=\"display:none; position:absolute; right:10px; top:10px; color:var(--primary);\"></i>\n        </div>\n        <span id=\"asyncTip\" style=\"font-size:11px; color:var(--text-secondary); margin-top:4px; display:block;\">输入昵称后自动联网查重</span>\n      </div>\n    ",
        "code": "# GDScript: 异步防抖远程查重\ninput.debounce_time = 0.5\ninput.set_async_validator(func(val):\n    var res = await Network.check_username(val)\n    return res.is_available\n)"
      },
      {
        "title": "5. 复合型插槽矩阵 (Compound Slots: #prepend / #append / #prefix / #suffix)",
        "render": "\n    <div style=\"display:flex; flex-direction:column; gap:12px; max-width:420px;\">\n      <!-- Prepend + Append Slot -->\n      <div>\n        <div style=\"font-size:11px; color:var(--text-secondary); margin-bottom:4px;\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--primary);\"></i> #prepend (前置选择) + #append (后置按钮)</div>\n        <div style=\"display:flex; border:1px solid var(--border-base); border-radius:6px; overflow:hidden;\">\n          <select style=\"background:var(--bg-surface); border:none; border-right:1px solid var(--border-base); font-size:12px; padding:0 8px; color:var(--text-primary); outline:none;\">\n            <option>https://</option>\n            <option>http://</option>\n          </select>\n          <input type=\"text\" value=\"api.godot-game.com/v1\" style=\"flex:1; border:none; background:transparent; padding:6px 10px; font-size:12px; color:var(--text-primary); outline:none;\">\n          <button class=\"g-btn g-btn-primary\" style=\"border-radius:0; font-size:11px; padding:0 12px;\" onclick=\"showToast('正在测试 API 连通性...', 'info')\">测试连接</button>\n        </div>\n      </div>\n\n      <!-- Prefix + Suffix Slot -->\n      <div>\n        <div style=\"font-size:11px; color:var(--text-secondary); margin-bottom:4px;\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--warning);\"></i> #prefix (前置图标) + #suffix (后置单位与复制)</div>\n        <div style=\"display:flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:0 10px;\">\n          <i class=\"fa-solid fa-coins\" style=\"color:#e6a23c; margin-right:8px; font-size:13px;\"></i>\n          <input type=\"number\" value=\"88800\" style=\"flex:1; border:none; background:transparent; padding:6px 0; font-size:12px; color:var(--text-primary); font-weight:700; outline:none;\">\n          <span style=\"font-size:11px; color:var(--warning); font-weight:600; margin-right:8px;\">金币</span>\n          <button class=\"g-btn g-btn-default\" style=\"padding:2px 6px; font-size:10px;\" onclick=\"navigator.clipboard.writeText('88800'); showToast('金币数已复制！', 'success')\"><i class=\"fa-solid fa-copy\"></i></button>\n        </div>\n      </div>\n    </div>\n  ",
        "code": "# GDScript: 使用复合型插槽 (Prepend / Append / Prefix / Suffix)\nvar input = GInput.new()\n\n# 1. 挂载 Prepend 前置大区选择器插槽\ninput.slotName = \"prepend\"\ninput.prepend.add_child(region_select)\n\n# 2. 挂载 Append 后置搜索按钮插槽\ninput.slotName = \"append\"\ninput.append.add_child(search_btn)\n\n# 3. 挂载 Prefix / Suffix 图标与货币单位插槽\ninput.prefix_icon = \"coins\"\ninput.suffix_text = \"金币\""
      },
      {
        "title": "5. 密码显隐与强弱程度检测 (Password Toggle & Strength Indicator)",
        "render": "\n      <div style=\"max-width:360px; display:flex; flex-direction:column; gap:6px;\">\n        <div class=\"icon-search-wrapper\" style=\"width:100%;\">\n          <input type=\"password\" class=\"g-input\" id=\"pwdInputVal\" value=\"Godot4UI@\" style=\"width:100%; padding-right:32px;\" oninput=\"\n            const v = this.value;\n            const bar = document.getElementById('pwdBar');\n            let score = 0;\n            if (v.length >= 6) score += 33;\n            if (/[A-Z]/.test(v) && /[0-9]/.test(v)) score += 33;\n            if (/[^a-zA-Z0-9]/.test(v)) score += 34;\n            bar.style.width = score + '%';\n            bar.style.background = score > 70 ? 'var(--success)' : (score > 35 ? 'var(--warning)' : 'var(--danger)');\n          \">\n          <span style=\"position:absolute; right:8px; cursor:pointer; color:var(--text-secondary);\" onclick=\"const p=document.getElementById('pwdInputVal'); p.type=p.type==='password'?'text':'password';\">\n            <i class=\"fa-solid fa-eye\"></i>\n          </span>\n        </div>\n        <div style=\"background:var(--bg-surface); height:4px; border-radius:2px; overflow:hidden;\">\n          <div id=\"pwdBar\" style=\"background:var(--success); width:100%; height:100%; transition:all 0.3s;\"></div>\n        </div>\n        <span style=\"font-size:11px; color:var(--text-secondary);\">密码强度：强 (包含大写字母、数字及特殊符号)</span>\n      </div>\n    ",
        "code": "# GDScript: 密码强度校验\ninput.show_password = true\ninput.enable_strength_meter = true"
      },
      {
        "title": "6. 一键清空与前后缀插槽 (Clearable & Suffix Slots)",
        "render": "\n      <div style=\"display:flex; flex-direction:column; gap:10px; max-width:360px;\">\n        <div class=\"icon-search-wrapper\" style=\"width:100%;\">\n          <input type=\"text\" class=\"g-input\" value=\"弑神者·亚瑟\" style=\"width:100%; padding-right:28px;\" oninput=\"this.nextElementSibling.style.display=this.value?'block':'none'\">\n          <span style=\"position:absolute; right:8px; cursor:pointer; color:var(--text-secondary);\" onclick=\"this.previousElementSibling.value=''; this.style.display='none';\">\n            <i class=\"fa-solid fa-circle-xmark\"></i>\n          </span>\n        </div>\n        <div style=\"display:flex; align-items:center; background:var(--bg-card); border:1px solid var(--border-base); border-radius:4px; padding:0 8px;\">\n          <input type=\"number\" class=\"g-input\" value=\"5000\" style=\"border:none; background:none; flex:1; font-size:12px;\">\n          <span style=\"color:var(--warning); font-size:12px; font-weight:700;\">🪙 金币</span>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 一键清空与插槽\ninput.clearable = true\ninput.suffix_text = \"🪙 金币\""
      },
      {
        "title": "7. 游戏控制台命令行输入框 (Game Dev Console Command Input)",
        "render": "\n      <div style=\"max-width:400px; background:#0f172a; border:1px solid #334155; border-radius:6px; padding:6px 10px; display:flex; align-items:center; gap:8px;\">\n        <span style=\"color:#22c55e; font-family:monospace; font-weight:700;\">root@game:~#</span>\n        <input type=\"text\" value=\"spawn_boss --type=dragon --level=100\" style=\"background:none; border:none; color:#f8fafc; font-family:monospace; font-size:12px; flex:1; outline:none;\" onkeydown=\"if(event.key==='Enter') showToast('已执行指令: 生成 100 级魔龙 BOSS！', 'success')\">\n        <button class=\"g-btn g-btn-primary\" style=\"padding:2px 8px; font-size:10px;\" onclick=\"showToast('指令执行完毕！', 'success')\">执行 (Enter)</button>\n      </div>\n    ",
        "code": "# GDScript: 游戏指令输入框\nvar console_input = GInput.new_console_command()"
      }
    ],
    "props": [
      {
        "name": "text / v-model",
        "type": "String",
        "default": "\"\"",
        "desc": "输入框绑定的文本内容"
      },
      {
        "name": "placeholder_text",
        "type": "String",
        "default": "\"Please input...\"",
        "desc": "输入框占位文本"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示一键清空按钮"
      },
      {
        "name": "secret / show-password",
        "type": "boolean",
        "default": "false",
        "desc": "是否为密码密文模式"
      },
      {
        "name": "show_password_toggle",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示密码切换眼睛图标"
      },
      {
        "name": "prefix_text",
        "type": "String",
        "default": "\"\"",
        "desc": "前缀文本"
      },
      {
        "name": "suffix_text",
        "type": "String",
        "default": "\"\"",
        "desc": "后缀文本"
      },
      {
        "name": "status",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "校验边框状态：DEFAULT, ERROR, WARNING, SUCCESS"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用输入"
      },
      {
        "name": "max_length",
        "type": "int",
        "default": "0",
        "desc": "最大字符输入长度限制 (0 为不限制)"
      },
      {
        "name": "status",
        "type": "GInput.Status",
        "default": "NORMAL",
        "desc": "校验状态 (NORMAL / SUCCESS / WARNING / ERROR)"
      },
      {
        "name": "status_message",
        "type": "String",
        "default": "\"\"",
        "desc": "校验失败提示文案"
      },
      {
        "name": "validation_pattern",
        "type": "String",
        "default": "\"\"",
        "desc": "正则表达式校验规则"
      },
      {
        "name": "validate_on_input",
        "type": "bool",
        "default": "false",
        "desc": "输入时是否实时触发校验"
      }
    ],
    "events": [
      {
        "name": "text_changed(new_text)",
        "desc": "输入文本改变时触发",
        "params": "(new_text: String)"
      },
      {
        "name": "text_submitted(new_text)",
        "desc": "按回车提交时触发",
        "params": "(new_text: String)"
      },
      {
        "name": "cleared()",
        "desc": "点击清除按钮时触发",
        "params": "()"
      },
      {
        "name": "focus_entered()",
        "desc": "输入框获取焦点时触发",
        "params": "()"
      },
      {
        "name": "focus_exited()",
        "desc": "输入框失去焦点时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "clear()",
        "desc": "清空当前输入框内容并发出 cleared 信号",
        "params": "() -> void"
      },
      {
        "name": "grab_focus()",
        "desc": "使输入框获取焦点并调出光标",
        "params": "() -> void"
      },
      {
        "name": "select_all()",
        "desc": "全选输入框内的所有文本",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "输入框主体控件插槽",
        "child": "LineEdit / Control",
        "example": "<template #default><LineEdit placeholder=\"请输入...\" /></template>"
      },
      {
        "name": "prefix",
        "desc": "输入框内嵌前置图标/文字插槽 (Prefix Slot)",
        "child": "GIcon / GText / TextureRect",
        "example": "<template #prefix><GIcon name=\"magnifying-glass\" /></template>"
      },
      {
        "name": "suffix",
        "desc": "输入框内嵌后置图标/操作按钮/单位插槽 (Suffix Slot)",
        "child": "GIcon / GButton / GText",
        "example": "<template #suffix><GText>🪙 金币</GText></template>"
      },
      {
        "name": "prepend",
        "desc": "输入框外置前置复合控件插槽 (如下拉选择协议头、大区选择) (Prepend Slot)",
        "child": "GSelect / GButton / Control",
        "example": "<template #prepend><GSelect options=\"https://,http://\" /></template>"
      },
      {
        "name": "append",
        "desc": "输入框外置后置复合按钮插槽 (如一键搜索按钮、发送验证码按钮) (Append Slot)",
        "child": "GButton / Control",
        "example": "<template #append><GButton type=\"primary\">搜索</GButton></template>"
      }
    ]
  }
});
