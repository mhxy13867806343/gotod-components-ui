window.COMPONENT_CATALOG = {
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
        "title": "1. 基础右下角悬浮按钮 (Basic Floating Action Button)",
        "render": "\n          <div style=\"position:relative; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;\">\n            <div style=\"position:absolute; bottom:12px; right:12px;\">\n              <button class=\"g-btn g-btn-primary\" style=\"width:44px; height:44px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-base);\" onclick=\"showToast('点击了悬浮创建按钮', 'success')\">\n                <i class=\"fa-solid fa-plus\" style=\"font-size:18px;\"></i>\n              </button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 基础悬浮按钮\nvar fab = GFab.new(\"plus\")\nfab.position_preset = Control.PRESET_BOTTOM_RIGHT\nfab.clicked.connect(func(): print(\"FAB 点击\"))\nadd_child(fab)"
      },
      {
        "title": "2. 多动作展开菜单 (Expandable Action Menu)",
        "render": "\n          <div style=\"display:flex; gap:10px; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:40px; height:40px; border-radius:50%; padding:0;\" title=\"主操作\"><i class=\"fa-solid fa-gear\"></i></button>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">展开菜单：</span>\n            <button class=\"g-btn g-btn-default\" style=\"width:32px; height:32px; border-radius:50%; padding:0;\" title=\"保存\"><i class=\"fa-solid fa-floppy-disk\"></i></button>\n            <button class=\"g-btn g-btn-default\" style=\"width:32px; height:32px; border-radius:50%; padding:0;\" title=\"分享\"><i class=\"fa-solid fa-share-nodes\"></i></button>\n            <button class=\"g-btn g-btn-default\" style=\"width:32px; height:32px; border-radius:50%; padding:0;\" title=\"退出\"><i class=\"fa-solid fa-arrow-right-from-bracket\"></i></button>\n          </div>\n        ",
        "code": "# GDScript: 展开式菜单\nfab.direction = GFab.Direction.TOP\nfab.add_action(\"floppy-disk\", \"保存\")\nfab.add_action(\"share-nodes\", \"分享\")"
      },
      {
        "title": "3. 游戏快捷道具轮盘 (Game Quick Wheel FAB)",
        "render": "\n          <div style=\"display:flex; gap:12px; align-items:center;\">\n            <button class=\"g-btn g-btn-danger\" style=\"width:48px; height:48px; border-radius:50%; padding:0; box-shadow:0 0 10px rgba(239,68,68,0.5);\" onclick=\"showToast('快捷使用大回复药剂', 'success')\">\n              🧪\n            </button>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">战斗中单击一键使用核心消耗品</span>\n          </div>\n        ",
        "code": "# GDScript: 游戏药剂快捷轮盘\nvar potion_fab = GFab.new_quick_item(\"potion_red\")"
      },
      {
        "title": "4. 边缘拖拽吸附模式 (Draggable & Magnetic Docking)",
        "render": "\n          <div style=\"background:var(--bg-surface); padding:8px 12px; border-radius:6px; border:1px solid var(--border-base); font-size:12px; color:var(--text-secondary); max-width:320px;\">\n            <i class=\"fa-solid fa-arrows-up-down-left-right\" style=\"color:var(--primary);\"></i> 支持玩家手指在屏幕任意位置自由拖拽，松手后自动平滑吸附至最近的屏幕左侧或右侧边缘。\n          </div>\n        ",
        "code": "# GDScript: 自由拖拽吸附\nfab.draggable = true\nfab.magnetic_dock = true"
      },
      {
        "title": "5. 带未读徽标与提示 (Badge & Tooltip Integration)",
        "render": "\n          <div style=\"position:relative; display:inline-block;\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:44px; height:44px; border-radius:50%; padding:0;\">\n              <i class=\"fa-solid fa-comment-dots\" style=\"font-size:18px;\"></i>\n            </button>\n            <span class=\"g-badge\" style=\"position:absolute; top:-4px; right:-4px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;\">8</span>\n          </div>\n        ",
        "code": "# GDScript: 带徽标 FAB\nfab.badge = GBadge.new(8)"
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
  },
  "textarea": {
    "title": "Textarea 文本域 (GTextarea)",
    "desc": "用于多行文本输入的组件，支持自适应高度（autosize）、最大字数限制与字数实时统计、只读/禁用以及玩家留言板/公会宣言场景。",
    "demos": [
      {
        "title": "1. 基础多行输入 (Basic Multi-line Input)",
        "render": "\n      <div style=\"max-width:380px;\">\n        <textarea class=\"g-input\" rows=\"3\" style=\"width:100%; resize:vertical;\" placeholder=\"请输入您的游戏心得或建议...\"></textarea>\n      </div>\n    ",
        "code": "# GDScript: 基础文本域\nvar textarea = GTextarea.new()\ntextarea.placeholder = \"请输入您的游戏心得...\"\ntextarea.rows = 3\nadd_child(textarea)"
      },
      {
        "title": "2. 顶部 Header 与底部 Footer 复合插槽 (Header & Footer Slots: 工具栏 + 发布栏)",
        "render": "\n      <div style=\"max-width:400px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface);\">\n        <!-- Header Slot -->\n        <div style=\"padding:6px 10px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; gap:8px; align-items:center; font-size:12px;\">\n          <span style=\"font-size:11px; font-weight:700; color:var(--primary);\"><i class=\"fa-solid fa-puzzle-piece\"></i> #header 插槽:</span>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"加粗\"><b>B</b></button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"斜体\"><i>I</i></button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"代码块\">&lt;/&gt;</button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"插入表情\">😀</button>\n        </div>\n        <!-- Default Slot Area -->\n        <textarea class=\"g-input\" rows=\"3\" style=\"width:100%; border:none; background:transparent; border-radius:0; padding:10px; font-size:12px;\" placeholder=\"支持在顶部 header 插槽放置富文本工具栏，底部 footer 插槽放置字数统计与操作按钮...\"></textarea>\n        <!-- Footer Slot -->\n        <div style=\"padding:6px 10px; background:var(--bg-card); border-top:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; font-size:11px;\">\n          <span style=\"color:var(--text-secondary);\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--warning);\"></i> #footer 插槽: 38/500 字</span>\n          <div style=\"display:flex; gap:6px;\">\n            <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">存为草稿</button>\n            <button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:2px 10px;\" onclick=\"showToast('发布成功！已触发 footer 插槽提交', 'success')\">立即发布</button>\n          </div>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 使用 Header 与 Footer 插槽\nvar ta = GTextarea.new()\n\n# 1. 挂载 Header 工具栏插槽\nta.slotName = \"header\"\nta.header.add_child(toolbar_hbox)\n\n# 2. 挂载 Footer 操作栏插槽\nta.slotName = \"footer\"\nta.footer.add_child(submit_btn)\nta.footer.show_word_limit = true"
      },
      {
        "title": "3. 自适应高度 (Autosize Height: min_rows / max_rows)",
        "render": "\n      <div style=\"max-width:380px;\">\n        <textarea class=\"g-input\" rows=\"2\" style=\"width:100%;\" placeholder=\"内容增多时高度自适应扩展 (min: 2, max: 6)...\" oninput=\"this.style.height = ''; this.style.height = this.scrollHeight + 'px'\"></textarea>\n      </div>\n    ",
        "code": "# GDScript: 自适应高度\ntextarea.autosize = true\ntextarea.min_rows = 2\ntextarea.max_rows = 6"
      },
      {
        "title": "4. 限制字数与统计计数器 (Maxlength & Word Count)",
        "render": "\n      <div style=\"max-width:380px; position:relative;\">\n        <textarea class=\"g-input\" rows=\"3\" maxlength=\"200\" style=\"width:100%;\" placeholder=\"最多输入 200 字公会宣言...\" oninput=\"document.getElementById('taCount').innerText = this.value.length + '/200'\"></textarea>\n        <div id=\"taCount\" style=\"position:absolute; bottom:6px; right:10px; font-size:11px; color:var(--text-secondary);\">0/200</div>\n      </div>\n    ",
        "code": "# GDScript: 字数统计\ntextarea.max_length = 200\ntextarea.show_word_limit = true"
      },
      {
        "title": "5. 只读与禁用状态 (Readonly & Disabled)",
        "render": "\n      <div style=\"max-width:380px; display:flex; flex-direction:column; gap:8px;\">\n        <textarea class=\"g-input\" rows=\"2\" readonly style=\"width:100%; background:var(--bg-surface);\" placeholder=\"【用户协议】本软件遵循 MIT 开源协议...\">【用户协议】本软件遵循 MIT 开源协议...</textarea>\n        <textarea class=\"g-input\" rows=\"2\" disabled style=\"width:100%; opacity:0.5;\" placeholder=\"已禁用的输入框...\"></textarea>\n      </div>\n    ",
        "code": "# GDScript: 只读模式\ntextarea.readonly = true"
      },
      {
        "title": "6. 游戏玩家公会战前誓师宣言 (Game Guild Declaration)",
        "render": "\n      <div style=\"max-width:380px; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px; background:var(--bg-surface);\">\n        <div style=\"font-size:12px; font-weight:600; margin-bottom:6px;\">🛡️ 公会战前誓师宣言</div>\n        <textarea class=\"g-input\" rows=\"2\" style=\"width:100%; font-size:12px;\" placeholder=\"誓死保卫龙息要塞，今晚 20:00 准时集结！\">誓死保卫龙息要塞，今晚 20:00 准时集结！</textarea>\n        <button class=\"g-btn g-btn-primary\" style=\"margin-top:8px; font-size:11px; padding:2px 10px;\" onclick=\"showToast('公会宣言已发布全服！', 'success')\">发布宣言</button>\n      </div>\n    ",
        "code": "# GDScript: 公会宣言编辑\ntextarea.text = \"誓死保卫龙息要塞...\""
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"\"",
        "desc": "文本域绑定内容"
      },
      {
        "name": "rows",
        "type": "int",
        "default": "3",
        "desc": "默认行数"
      },
      {
        "name": "autosize",
        "type": "bool",
        "default": "false",
        "desc": "是否自适应高度"
      },
      {
        "name": "max_length",
        "type": "int",
        "default": "-1",
        "desc": "最大输入字符数"
      },
      {
        "name": "show_word_limit",
        "type": "bool",
        "default": "false",
        "desc": "是否展示字数统计"
      }
    ],
    "events": [
      {
        "name": "text_changed",
        "params": "(new_text: String)",
        "desc": "文本内容改变时触发"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "文本域主体 TextEdit 内容插槽",
        "child": "TextEdit / Control",
        "example": "<template #default><TextEdit placeholder=\"请输入...\" /></template>"
      },
      {
        "name": "header",
        "desc": "文本域顶部工具栏插槽（如富文本加粗、表情选择器、快捷模板短语）",
        "child": "Control / HBoxContainer",
        "example": "<template #header><div class=\"toolbar\">...</div></template>"
      },
      {
        "name": "footer",
        "desc": "文本域底部操作栏插槽（如实时字数统计、发布按钮、一键清空）",
        "child": "Control / HBoxContainer",
        "example": "<template #footer><GButton type=\"primary\">发布留言</GButton></template>"
      },
      {
        "name": "prefix",
        "desc": "文本域左上角/前置指示图标或标签插槽",
        "child": "GIcon / GTag / TextureRect",
        "example": "<template #prefix><GIcon name=\"feather\" /></template>"
      },
      {
        "name": "suffix",
        "desc": "文本域右下角快捷动作插槽",
        "child": "GButton / GIcon",
        "example": "<template #suffix><GButton size=\"small\">清空</GButton></template>"
      }
    ]
  },
  "input-number": {
    "title": "InputNumber 数字输入框 (GInputNumber)",
    "desc": "专用于仅允许输入数值的数字控制器，支持浮点精度（precision）、离散步长（step）、范围严格限制、按钮位置切换（Sides 左右式 / Right 右侧堆叠式）与游戏自由加点分配器。",
    "demos": [
      {
        "title": "1. 基础数字输入与极值禁用 (Basic: [1 ~ 10] 到达边界自动禁用按钮)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n        <button id=\"btnMinus1\" disabled style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo1');\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = Math.max(1, parseInt(el.value || 1) - 1);\n          el.value = val;\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-minus\"></i>\n        </button>\n        <input type=\"text\" id=\"inDemo1\" value=\"1\" style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\" oninput=\"\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = parseInt(this.value) || 1;\n          val = Math.max(1, Math.min(10, val));\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n        <button id=\"btnPlus1\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo1');\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = Math.min(10, parseInt(el.value || 1) + 1);\n          el.value = val;\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-plus\"></i>\n        </button>\n      </div>\n      <span style=\"font-size:12px; color:var(--text-secondary); margin-left:12px;\">范围 [1, 10]，初始为 1 时减号自动 disabled 禁用</span>\n    ",
        "code": "# GDScript: 基础数字输入框（边界自动禁用按钮）\nvar num_input = GInputNumber.new()\nnum_input.value = 1\nnum_input.min_value = 1\nnum_input.max_value = 10\nadd_child(num_input)"
      },
      {
        "title": "2. 步长与精度控制 (Step: 0.25 & Range: [0.00 ~ 3.00])",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n        <button id=\"btnMinus2\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo2');\n          const minus = document.getElementById('btnMinus2');\n          const plus = document.getElementById('btnPlus2');\n          let val = Math.max(0, parseFloat(el.value || 0) - 0.25);\n          el.value = val.toFixed(2);\n          minus.disabled = (val <= 0);\n          minus.style.opacity = (val <= 0) ? '0.35' : '1';\n          minus.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 3.0);\n          plus.style.opacity = (val >= 3.0) ? '0.35' : '1';\n          plus.style.cursor = (val >= 3.0) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-minus\"></i>\n        </button>\n        <input type=\"text\" id=\"inDemo2\" value=\"1.50\" style=\"width:70px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:13px; font-weight:600; outline:none;\">\n        <button id=\"btnPlus2\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo2');\n          const minus = document.getElementById('btnMinus2');\n          const plus = document.getElementById('btnPlus2');\n          let val = Math.min(3.0, parseFloat(el.value || 0) + 0.25);\n          el.value = val.toFixed(2);\n          minus.disabled = (val <= 0);\n          minus.style.opacity = (val <= 0) ? '0.35' : '1';\n          minus.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 3.0);\n          plus.style.opacity = (val >= 3.0) ? '0.35' : '1';\n          plus.style.cursor = (val >= 3.0) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-plus\"></i>\n        </button>\n      </div>\n      <span style=\"font-size:12px; color:var(--text-secondary); margin-left:12px;\">步长: 0.25, 精度: 2 位小数, 范围 [0.00, 3.00]</span>\n    ",
        "code": "# GDScript: 精度与步长\nnum_input.value = 1.50\nnum_input.step = 0.25\nnum_input.precision = 2\nnum_input.min_value = 0.0\nnum_input.max_value = 3.0"
      },
      {
        "title": "3. 范围严格限制与极值置灰 (Strict Range: 10 ~ 100, 步长 10)",
        "render": "\n      <div style=\"display:flex; align-items:center; gap:12px;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n          <button id=\"btnMinus3\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n            const el = document.getElementById('inDemo3');\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = Math.max(10, parseInt(el.value || 50) - 10);\n            el.value = val;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n            <i class=\"fa-solid fa-minus\"></i>\n          </button>\n          <input type=\"text\" id=\"inDemo3\" value=\"100\" style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\" oninput=\"\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = parseInt(this.value) || 10;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n          <button id=\"btnPlus3\" disabled style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n            const el = document.getElementById('inDemo3');\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = Math.min(100, parseInt(el.value || 50) + 10);\n            el.value = val;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n            <i class=\"fa-solid fa-plus\"></i>\n          </button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">范围限定: [10, 100] (当前为 100，加号已自动 disabled 禁用)</span>\n      </div>\n    ",
        "code": "# GDScript: 严格范围约束（到 100 自动禁用 + 按钮）\nnum_input.min_value = 10\nnum_input.max_value = 100\nnum_input.value = 100\nnum_input.step = 10"
      },
      {
        "title": "4. 控制按钮位置与上下键禁用 (Controls Position: 右侧上下堆叠式, 范围 [0 ~ 20])",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center; flex-wrap:wrap;\">\n        <div style=\"display:inline-flex; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-card); overflow:hidden;\">\n          <input type=\"text\" id=\"inDemo4\" value=\"20\" style=\"width:60px; height:36px; border:none; text-align:center; background:transparent; color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\">\n          <div style=\"display:flex; flex-direction:column; border-left:1px solid var(--border-base); width:26px;\">\n            <button id=\"btnUp4\" disabled style=\"flex:1; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:10px; display:flex; align-items:center; justify-content:center; border-bottom:1px solid var(--border-base);\" onclick=\"\n              const el=document.getElementById('inDemo4');\n              const up=document.getElementById('btnUp4');\n              const down=document.getElementById('btnDown4');\n              let val = Math.min(20, parseInt(el.value||0) + 1);\n              el.value = val;\n              up.disabled = (val >= 20);\n              up.style.opacity = (val >= 20) ? '0.35' : '1';\n              up.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n              down.disabled = (val <= 0);\n              down.style.opacity = (val <= 0) ? '0.35' : '1';\n              down.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            \">\n              <i class=\"fa-solid fa-chevron-up\"></i>\n            </button>\n            <button id=\"btnDown4\" style=\"flex:1; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:10px; display:flex; align-items:center; justify-content:center;\" onclick=\"\n              const el=document.getElementById('inDemo4');\n              const up=document.getElementById('btnUp4');\n              const down=document.getElementById('btnDown4');\n              let val = Math.max(0, parseInt(el.value||0) - 1);\n              el.value = val;\n              up.disabled = (val >= 20);\n              up.style.opacity = (val >= 20) ? '0.35' : '1';\n              up.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n              down.disabled = (val <= 0);\n              down.style.opacity = (val <= 0) ? '0.35' : '1';\n              down.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            \">\n              <i class=\"fa-solid fa-chevron-down\"></i>\n            </button>\n          </div>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">当前达到最大上限 20，上箭头已自动 disabled</span>\n      </div>\n    ",
        "code": "# GDScript: 右侧堆叠控制按钮（到上限自动禁用上箭头）\nnum_input.controls_position = GInputNumber.Controls.RIGHT\nnum_input.min_value = 0\nnum_input.max_value = 20\nnum_input.value = 20"
      },
      {
        "title": "5. 全局禁用与只读状态 (Disabled & Readonly)",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden; opacity:0.4;\">\n          <button style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed;\" disabled>-</button>\n          <input type=\"text\" value=\"99\" disabled style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-secondary); cursor:not-allowed;\">\n          <button style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed;\" disabled>+</button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">已禁用状态 (Disabled)</span>\n      </div>\n    ",
        "code": "# GDScript: 禁用状态\nnum_input.disabled = true"
      },
      {
        "title": "6. 游戏自由加点分配器 (RPG Stat Allocator: 潜能点消耗完毕自动禁用加号)",
        "render": "\n      <div style=\"max-width:340px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\">\n        <div style=\"display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-base); padding-bottom:8px;\">\n          <span>剩余潜能点:</span>\n          <strong style=\"color:var(--primary); font-size:14px;\" id=\"statRemain\">2 点</strong>\n        </div>\n        <div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\">\n          <span>💪 力量属性 (STR):</span>\n          <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden; background:var(--bg-card);\">\n            <button id=\"btnStatMinus\" class=\"g-btn g-btn-default\" style=\"width:28px; height:28px; padding:0; border:none; border-radius:0; cursor:pointer;\" onclick=\"\n              const val = document.getElementById('statStr');\n              const rem = document.getElementById('statRemain');\n              const pBtn = document.getElementById('btnStatPlus');\n              const mBtn = document.getElementById('btnStatMinus');\n              let cur = parseInt(val.innerText);\n              let curRem = parseInt(rem.innerText);\n              if (cur > 20) {\n                cur -= 1;\n                curRem += 1;\n                val.innerText = cur;\n                rem.innerText = curRem + ' 点';\n                mBtn.disabled = (cur <= 20);\n                mBtn.style.opacity = (cur <= 20) ? '0.35' : '1';\n                mBtn.style.cursor = (cur <= 20) ? 'not-allowed' : 'pointer';\n                pBtn.disabled = (curRem <= 0);\n                pBtn.style.opacity = (curRem <= 0) ? '0.35' : '1';\n                pBtn.style.cursor = (curRem <= 0) ? 'not-allowed' : 'pointer';\n              }\n            \">-</button>\n            <span id=\"statStr\" style=\"width:36px; text-align:center; font-weight:700; font-size:13px;\">28</span>\n            <button id=\"btnStatPlus\" class=\"g-btn g-btn-primary\" style=\"width:28px; height:28px; padding:0; border:none; border-radius:0; cursor:pointer;\" onclick=\"\n              const val = document.getElementById('statStr');\n              const rem = document.getElementById('statRemain');\n              const pBtn = document.getElementById('btnStatPlus');\n              const mBtn = document.getElementById('btnStatMinus');\n              let cur = parseInt(val.innerText);\n              let curRem = parseInt(rem.innerText);\n              if (curRem > 0) {\n                cur += 1;\n                curRem -= 1;\n                val.innerText = cur;\n                rem.innerText = curRem + ' 点';\n                mBtn.disabled = (cur <= 20);\n                mBtn.style.opacity = (cur <= 20) ? '0.35' : '1';\n                mBtn.style.cursor = (cur <= 20) ? 'not-allowed' : 'pointer';\n                pBtn.disabled = (curRem <= 0);\n                pBtn.style.opacity = (curRem <= 0) ? '0.35' : '1';\n                pBtn.style.cursor = (curRem <= 0) ? 'not-allowed' : 'pointer';\n              }\n            \">+</button>\n          </div>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 潜能点分配器\nvar stat_alloc = GInputNumber.new_stat_point(\"力量\", 28, 2)"
      }
    ],
    "props": [
      {
        "name": "value / v-model",
        "type": "float",
        "default": "0.0",
        "desc": "当前数值"
      },
      {
        "name": "min_value / min",
        "type": "float",
        "default": "0.0",
        "desc": "最小值"
      },
      {
        "name": "max_value / max",
        "type": "float",
        "default": "100.0",
        "desc": "最大值"
      },
      {
        "name": "step",
        "type": "float",
        "default": "1.0",
        "desc": "步进值"
      },
      {
        "name": "precision",
        "type": "int",
        "default": "0",
        "desc": "小数数值精度"
      }
    ],
    "events": [
      {
        "name": "value_changed(new_value)",
        "desc": "数值改变时触发",
        "params": "(new_value: float)"
      }
    ],
    "methods": [
      {
        "name": "increase()",
        "desc": "数值按 step 增加",
        "params": "() -> void"
      },
      {
        "name": "decrease()",
        "desc": "数值按 step 减少",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "decrease-icon",
        "desc": "自定义递减按钮图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #decrease-icon><GIcon name=\"minus\" /></template>"
      },
      {
        "name": "increase-icon",
        "desc": "自定义递增按钮图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #increase-icon><GIcon name=\"plus\" /></template>"
      },
      {
        "name": "prefix",
        "desc": "输入框前置单位插槽（如货币符号 ¥）",
        "child": "GText / Label",
        "example": "<template #prefix>¥</template>"
      },
      {
        "name": "suffix",
        "desc": "输入框后置单位插槽（如计量单位“件/个”）",
        "child": "GText / Label",
        "example": "<template #suffix>件</template>"
      }
    ]
  },
  "stepper": {
    "title": "Stepper 步进器 (GStepper)",
    "desc": "步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数值。深度对标 Vant UI 步进器规范，支持步长、最大最小值、圆角圆圈按钮与动态限制。",
    "demos": [
      {
        "title": "1. 基础移动端步进器与极值禁用 (Basic Stepper: [1 ~ 10], 初始为 1 自动禁用减号)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n        <button id=\"stepMinus1\" disabled style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed; opacity:0.35; color:var(--text-secondary);\" onclick=\"\n          const el = document.getElementById('stepVal1');\n          const m = document.getElementById('stepMinus1');\n          const p = document.getElementById('stepPlus1');\n          let val = Math.max(1, parseInt(el.value || 1) - 1);\n          el.value = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 10);\n          p.style.opacity = (val >= 10) ? '0.35' : '1';\n          p.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">-</button>\n        <input type=\"text\" id=\"stepVal1\" value=\"1\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-primary); font-weight:600;\">\n        <button id=\"stepPlus1\" style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:pointer; color:var(--text-primary);\" onclick=\"\n          const el = document.getElementById('stepVal1');\n          const m = document.getElementById('stepMinus1');\n          const p = document.getElementById('stepPlus1');\n          let val = Math.min(10, parseInt(el.value || 1) + 1);\n          el.value = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 10);\n          p.style.opacity = (val >= 10) ? '0.35' : '1';\n          p.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">+</button>\n      </div>\n    ",
        "code": "# GDScript: 基础步进器\nvar stepper = GStepper.new()\nstepper.value = 1\nstepper.min = 1\nstepper.max = 10\nadd_child(stepper)"
      },
      {
        "title": "2. 步长与最大购买量限制 (Step: 5 & Max: 50, 到 50 自动禁用加号)",
        "render": "\n      <div style=\"display:flex; align-items:center; gap:10px;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n          <button id=\"stepMinus2\" style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('stepVal2');\n            const m = document.getElementById('stepMinus2');\n            const p = document.getElementById('stepPlus2');\n            let val = Math.max(0, parseInt(el.value || 0) - 5);\n            el.value = val;\n            m.disabled = (val <= 0);\n            m.style.opacity = (val <= 0) ? '0.35' : '1';\n            m.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 50);\n            p.style.opacity = (val >= 50) ? '0.35' : '1';\n            p.style.cursor = (val >= 50) ? 'not-allowed' : 'pointer';\n          \">-</button>\n          <input type=\"text\" id=\"stepVal2\" value=\"50\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-primary); font-weight:700;\">\n          <button id=\"stepPlus2\" disabled style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed; opacity:0.35;\" onclick=\"\n            const el = document.getElementById('stepVal2');\n            const m = document.getElementById('stepMinus2');\n            const p = document.getElementById('stepPlus2');\n            let val = Math.min(50, parseInt(el.value || 0) + 5);\n            el.value = val;\n            m.disabled = (val <= 0);\n            m.style.opacity = (val <= 0) ? '0.35' : '1';\n            m.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 50);\n            p.style.opacity = (val >= 50) ? '0.35' : '1';\n            p.style.cursor = (val >= 50) ? 'not-allowed' : 'pointer';\n          \">+</button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">步长 5，上限 50 (当前 50 已禁用 + 按钮)</span>\n      </div>\n    ",
        "code": "# GDScript: 步长上限\nstepper.step = 5\nstepper.max = 50\nstepper.value = 50"
      },
      {
        "title": "3. 全局禁用与只读状态 (Disabled & Readonly)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden; opacity:0.4;\">\n        <button style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed;\" disabled>-</button>\n        <input type=\"text\" value=\"0\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-secondary);\">\n        <button style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed;\" disabled>+</button>\n      </div>\n    ",
        "code": "# GDScript: 禁用步进器\nstepper.disabled = true"
      },
      {
        "title": "4. 圆形胶囊形态 (Round Capsule Stepper)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; gap:8px;\">\n        <button id=\"stepCapM\" style=\"width:28px; height:28px; border-radius:50%; border:none; background:var(--primary); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;\" onclick=\"\n          const el = document.getElementById('stepCapVal');\n          const m = document.getElementById('stepCapM');\n          const p = document.getElementById('stepCapP');\n          let val = Math.max(1, parseInt(el.innerText) - 1);\n          el.innerText = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 5);\n          p.style.opacity = (val >= 5) ? '0.35' : '1';\n          p.style.cursor = (val >= 5) ? 'not-allowed' : 'pointer';\n        \">-</button>\n        <span id=\"stepCapVal\" style=\"font-weight:700; font-size:14px; min-width:24px; text-align:center;\">3</span>\n        <button id=\"stepCapP\" style=\"width:28px; height:28px; border-radius:50%; border:none; background:var(--primary); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;\" onclick=\"\n          const el = document.getElementById('stepCapVal');\n          const m = document.getElementById('stepCapM');\n          const p = document.getElementById('stepCapP');\n          let val = Math.min(5, parseInt(el.innerText) + 1);\n          el.innerText = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 5);\n          p.style.opacity = (val >= 5) ? '0.35' : '1';\n          p.style.cursor = (val >= 5) ? 'not-allowed' : 'pointer';\n        \">+</button>\n      </div>\n    ",
        "code": "# GDScript: 胶囊圆角\nstepper.round = true\nstepper.min = 1\nstepper.max = 5"
      },
      {
        "title": "5. 游戏商店批量购买药水实战 (Game Batch Item Purchase)",
        "render": "\n      <div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n        <div style=\"font-size:13px;\">\n          <div style=\"font-weight:600;\">🧪 特级生命药水</div>\n          <div style=\"font-size:11px; color:#e6a23c;\">单价: 50 🪙</div>\n        </div>\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n          <button id=\"shopStepM\" style=\"border:none; background:var(--bg-card); padding:4px 10px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('shopStepVal');\n            const m = document.getElementById('shopStepM');\n            const p = document.getElementById('shopStepP');\n            let val = Math.max(1, parseInt(el.innerText) - 1);\n            el.innerText = val;\n            m.disabled = (val <= 1);\n            m.style.opacity = (val <= 1) ? '0.35' : '1';\n            m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 20);\n            p.style.opacity = (val >= 20) ? '0.35' : '1';\n            p.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n          \">-</button>\n          <span id=\"shopStepVal\" style=\"padding:0 8px; font-size:13px; font-weight:700;\">5</span>\n          <button id=\"shopStepP\" style=\"border:none; background:var(--bg-card); padding:4px 10px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('shopStepVal');\n            const m = document.getElementById('shopStepM');\n            const p = document.getElementById('shopStepP');\n            let val = Math.min(20, parseInt(el.innerText) + 1);\n            el.innerText = val;\n            m.disabled = (val <= 1);\n            m.style.opacity = (val <= 1) ? '0.35' : '1';\n            m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 20);\n            p.style.opacity = (val >= 20) ? '0.35' : '1';\n            p.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n          \">+</button>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 商店批量购买步进器\nvar shop_stepper = GStepper.new_shop_item(\"potion\", 50)\nshop_stepper.max = 20"
      }
    ],
    "props": [
      {
        "name": "value",
        "type": "float",
        "default": "1.0",
        "desc": "当前输入值"
      },
      {
        "name": "min_value",
        "type": "float",
        "default": "1.0",
        "desc": "最小值限制"
      },
      {
        "name": "max_value",
        "type": "float",
        "default": "100.0",
        "desc": "最大值限制"
      },
      {
        "name": "step",
        "type": "float",
        "default": "1.0",
        "desc": "点击加减按钮每次变化的步长"
      },
      {
        "name": "integer",
        "type": "boolean",
        "default": "true",
        "desc": "是否只允许输入整数"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用步进器"
      },
      {
        "name": "round_theme",
        "type": "boolean",
        "default": "false",
        "desc": "是否启用圆角/圆圈极简主题风格"
      }
    ],
    "events": [
      {
        "name": "value_changed(val)",
        "desc": "当数值发生改变时触发",
        "params": "(val: float)"
      },
      {
        "name": "overlimit(limit_type)",
        "desc": "当点击加减超出限制范围时触发 (\"min\" / \"max\")",
        "params": "(limit_type: String)"
      }
    ],
    "methods": [
      {
        "name": "set_value(val)",
        "desc": "设置当前步进器数值",
        "params": "(val: float) -> void"
      },
      {
        "name": "get_value()",
        "desc": "获取当前步进器数值",
        "params": "() -> float"
      }
    ],
    "slots": [
      {
        "name": "minus",
        "desc": "步进器减少按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #minus><GIcon name=\"angle-left\" /></template>"
      },
      {
        "name": "plus",
        "desc": "步进器增加按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #plus><GIcon name=\"angle-right\" /></template>"
      },
      {
        "name": "default",
        "desc": "步进器中间数值输入/显示区域插槽",
        "child": "GInput / Label",
        "example": "<template #default><span>Lv. {{ level }}</span></template>"
      }
    ]
  },
  "switch": {
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
  },
  "checkbox": {
    "title": "Checkbox 多选框 (GCheckbox & Group)",
    "desc": "在一组可选项中进行多项选择。支持全选与半选 (Indeterminate) 状态联动。",
    "demos": [
      {
        "title": "1. 基础多选框 (Basic Checkbox)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"checkbox\" checked style=\"accent-color:var(--primary);\"><span>自动拾取金币</span></label><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"checkbox\" style=\"accent-color:var(--primary);\"><span>低血量自动喝药</span></label></div>",
        "code": "# GDScript: 基础复选框\nvar cb = GCheckbox.new(\"自动拾取金币\")\ncb.checked = true\nadd_child(cb)"
      },
      {
        "title": "2. 禁用状态 (Disabled Checkbox)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center; opacity:0.5;\"><label style=\"display:inline-flex; align-items:center; gap:6px; font-size:13px;\"><input type=\"checkbox\" checked disabled><span>主线任务锁定 (必选)</span></label></div>",
        "code": "# GDScript: 禁用\ncb.disabled = true"
      },
      {
        "title": "3. 多选框组 (Checkbox Group)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"margin-bottom:8px; font-weight:600; font-size:13px;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer;\"><input type=\"checkbox\" checked style=\"accent-color:var(--primary);\"><span>全选职业技能</span></label></div><div style=\"display:flex; gap:12px; font-size:12px; margin-left:18px;\"><label><input type=\"checkbox\" checked> 破甲击</label><label><input type=\"checkbox\" checked> 旋风斩</label><label><input type=\"checkbox\"> 盾牌猛击</label></div></div>",
        "code": "# GDScript: 多选框组\nvar group = GCheckboxGroup.new()\ngroup.options = [\"破甲击\", \"旋风斩\", \"盾牌猛击\"]"
      },
      {
        "title": "4. 按钮样式形态 (Button Style Checkbox)",
        "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">✓ 战士</button><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">✓ 法师</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 10px;\">牧师</button></div>",
        "code": "# GDScript: 按钮样式\ncb.checkbox_type = GCheckbox.Type.BUTTON"
      },
      {
        "title": "5. 游戏副本掉落筛选多选器 (Game Drop Filter)",
        "render": "<div style=\"display:flex; gap:8px; flex-wrap:wrap; font-size:12px;\"><span class=\"g-tag g-tag-primary\" style=\"cursor:pointer;\">✓ 传说装备 (SSR)</span><span class=\"g-tag g-tag-primary\" style=\"cursor:pointer;\">✓ 稀有材料</span><span class=\"g-tag\" style=\"background:var(--bg-surface); border:1px solid var(--border-base); cursor:pointer;\">普通消耗品</span></div>",
        "code": "# GDScript: 掉落筛选\nvar filter = GCheckboxGroup.new_filter_group([\"SSR\", \"材料\", \"消耗品\"])"
      }
    ],
    "props": [
      {
        "name": "checked / v-model",
        "type": "boolean",
        "default": "false",
        "desc": "是否勾选"
      },
      {
        "name": "text / label",
        "type": "String",
        "default": "\"Checkbox\"",
        "desc": "说明文字"
      },
      {
        "name": "button_style",
        "type": "boolean",
        "default": "false",
        "desc": "是否启用类似分段按钮的样式外观"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "desc": "半选/不确定状态"
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
        "desc": "勾选状态改变时触发",
        "params": "(checked: bool)"
      }
    ],
    "methods": [
      {
        "name": "set_checked(val: bool)",
        "desc": "设置勾选状态",
        "params": "(val: bool) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "复选框右侧描述文本或富文本标签插槽",
        "child": "Label / RichTextLabel / Control",
        "example": "<template #default>我已阅读并同意《服务协议》</template>"
      },
      {
        "name": "icon",
        "desc": "自定义复选勾选状态图标插槽（透传 { checked }）",
        "child": "GIcon / TextureRect",
        "example": "<template #icon=\"{ checked }\"><GIcon :name=\"checked ? 'square-check' : 'square'\" /></template>"
      }
    ]
  },
  "radio": {
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
  },
  "select": {
    "title": "Select 下拉选择器 (GSelect)",
    "desc": "当选项过多时，使用下拉菜单展示并供用户选择内容。深度对标 Element Plus Select 规范，支持单选、有禁用选项、禁用状态、可清空单选、实时搜索筛选、多选 Tags 折叠、分组选择器与自定义模板。",
    "demos": [
      {
        "title": "1. 基础用法与可清空单选 (Basic Select & Clearable)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_basic\" style=\"width: 340px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">💡 包含 <code style=\"color:var(--primary);\">clearable = true</code> 属性，鼠标悬浮在选择框上时会出现 <code style=\"color:var(--danger);\">×</code> 按钮，点击一键清空。</span>\n          </div>\n        ",
        "code": "# GDScript: 基础单选与一键清空\nvar sel = GSelect.new()\nsel.placeholder_text = \"请选择渲染管线...\"\nsel.clearable = true\nsel.options = [\n    {\"label\": \"Godot 4.3 (Forward+ 高画质管线)\", \"value\": \"4.3_forward\"},\n    {\"label\": \"Godot 4.3 (Mobile 移动端轻量)\", \"value\": \"4.3_mobile\"},\n    {\"label\": \"Godot 4.4 (Latest 最新稳定版)\", \"value\": \"4.4_latest\"},\n    {\"label\": \"Godot 4.6+ (Future 未来试验特性)\", \"value\": \"4.6_future\"}\n]\nsel.item_selected.connect(func(idx, val, label):\n    print(\"已选择内核:\", label, \"值:\", val)\n)\nsel.cleared.connect(func():\n    print(\"已一键清空选中值\")\n)\nadd_child(sel)"
      },
      {
        "title": "2. 有禁用选项与禁用状态 (Disabled Options & Disabled Select)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:16px;\">\n            <div>\n              <div style=\"font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;\">① 有禁用选项（在 option 中设定 disabled 为 true）</div>\n              <div id=\"demo_select_opt_disabled\" style=\"width: 360px;\"></div>\n            </div>\n            <div>\n              <div style=\"font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;\">② 禁用整个选择器组件（为 select 设置 disabled 属性）</div>\n              <div id=\"demo_select_full_disabled\" style=\"width: 360px;\"></div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 1. 有禁用选项 (Disabled Options)\nvar sel_opt = GSelect.new()\nsel_opt.options = [\n    {\"label\": \"初级强化石 (+1~+5 成功率 100%)\", \"value\": \"opt1\"},\n    {\"label\": \"中级祝福水晶 (+6~+9 铁匠3级解锁 - 禁用)\", \"value\": \"opt2\", \"disabled\": true}, # 👈 禁用该项\n    {\"label\": \"高级天界神石 (+10~+15 成功率 85%)\", \"value\": \"opt3\"},\n    {\"label\": \"太古不灭符文 (未解锁副本 - 禁用)\", \"value\": \"opt4\", \"disabled\": true},     # 👈 禁用该项\n    {\"label\": \"神话虚空精粹 (+20 终极附魔)\", \"value\": \"opt5\"}\n]\nadd_child(sel_opt)\n\n# GDScript: 2. 禁用整个选择器组件 (Disabled Select)\nvar sel_full = GSelect.new()\nsel_full.disabled = true # 👈 整个组件置灰并阻断点击交互\nadd_child(sel_full)"
      },
      {
        "title": "3. 实时搜索与模糊筛选 (Filterable & Searchable)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_filterable\" style=\"width: 360px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🔍 点击展开下拉菜单后，可在顶部搜索框输入拼音、英文或中文即时过滤；无匹配时自动展示「无匹配数据」空状态。</span>\n          </div>\n        ",
        "code": "# GDScript: 开启搜索筛选与过滤\nvar sel = GSelect.new()\nsel.filterable = true # 开启搜索过滤输入框\nsel.clearable = true\nsel.placeholder_text = \"输入关键字搜索组件库/算法...\"\nsel.options = [\n    {\"label\": \"Element Plus 现代化组件库 (Select/Dialog)\", \"value\": \"el_plus\"},\n    {\"label\": \"Naive UI 极速类型安全组件 (TypeScript)\", \"value\": \"naive\"},\n    {\"label\": \"Ant Design Vue 极客设计体系 (AntD)\", \"value\": \"antd\"},\n    {\"label\": \"Vant UI 移动端轻提示与选择器 (Mobile)\", \"value\": \"vant\"},\n    {\"label\": \"Vue.js 3 响应式底层 (Reactivity Core)\", \"value\": \"vue3\"}\n]\nadd_child(sel)"
      },
      {
        "title": "4. 多选标签与折叠展示 (Multiple Tags & Collapse Tags)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_multiple\" style=\"width: 420px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🏷️ 支持点击任意选项多选勾选，多选标签支持单独点 <code style=\"color:var(--danger);\">×</code> 移除；超出数量时自动折叠显示 <code style=\"color:var(--primary);\">+N</code>。</span>\n          </div>\n        ",
        "code": "# GDScript: 多选模式与标签折叠\nvar sel = GSelect.new()\nsel.multiple = true           # 开启多选\nsel.collapse_tags = true      # 开启超长标签折叠\nsel.max_collapse_tags = 2     # 最大保留展示 2 个 Tag，其余折叠显示 +N\nsel.filterable = true\nsel.clearable = true\n\n# 批量赋予已选中的值\nsel.selected_values = [\"physics\", \"particles\", \"dialogue\"]\n\nsel.selection_changed.connect(func(selected_array):\n    print(\"当前多选勾选列表:\", selected_array)\n)\nadd_child(sel)"
      },
      {
        "title": "5. 分组选项与禁用项 (Option Grouping & Disabled Options)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_group\" style=\"width: 360px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🚫 支持按分类分组渲染，带有 <code style=\"color:var(--danger);\">disabled: true</code> 的选项将置灰且无法点击。</span>\n          </div>\n        ",
        "code": "# GDScript: 分组选择器与选项禁用\nvar sel = GSelect.new()\nsel.filterable = true\nsel.clearable = true\n\nsel.options = [\n    {\"label\": \"狂暴战 (Warrior - 近战输出)\", \"value\": \"warrior\", \"group\": \"近战狂暴系 (Melee)\"},\n    {\"label\": \"圣骑士 (Paladin - 需暗影通关 - 禁用)\", \"value\": \"paladin\", \"group\": \"近战狂暴系 (Melee)\", \"disabled\": true},\n    {\"label\": \"潜行者 (Rogue - 致命背刺)\", \"value\": \"rogue\", \"group\": \"近战狂暴系 (Melee)\"},\n    {\"label\": \"大魔导师 (Archmage - 暴风雪)\", \"value\": \"archmage\", \"group\": \"远程魔法系 (Caster)\"},\n    {\"label\": \"暗影术士 (Warlock - 诅咒之箭)\", \"value\": \"warlock\", \"group\": \"远程魔法系 (Caster)\"}\n]\nadd_child(sel)"
      },
      {
        "title": "6. 自定义选项模板与插槽 (Custom Option Template & Slots)",
        "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_custom\" style=\"width: 380px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">✨ 深度支持自定义 HTML / Godot 场景节点，展示带英雄头像、专属技能与 SSR/SR 品阶标签的高级选项。</span>\n          </div>\n        ",
        "code": "# GDScript: 自定义选项模板与插槽\nvar sel = GSelect.new()\nsel.filterable = true\nsel.clearable = true\n\n# 点语法访问插槽\nsel.slotName = \"prefix\"\nsel.prefix.icon = \"wand-magic-sparkles\"\n\nsel.slotName = \"empty\"\nsel.empty.text = \"没有找到符合条件的神话伙伴\"\n\n# 动态自定义渲染\nsel.item_selected.connect(func(idx, val, label):\n    print(\"出战伙伴切换:\", val)\n)\nadd_child(sel)"
      }
    ],
    "props": [
      {
        "name": "options",
        "type": "Array[Dictionary]",
        "default": "[]",
        "desc": "选项数据源 [{\"label\": \"\", \"value\": \"\", \"disabled\": false, \"group\": \"\"}]"
      },
      {
        "name": "selected_index",
        "type": "int",
        "default": "-1",
        "desc": "单选模式下当前选中项的索引"
      },
      {
        "name": "selected_value",
        "type": "Variant",
        "default": "null",
        "desc": "当前选中的具体值 (单选模式)"
      },
      {
        "name": "selected_values",
        "type": "Array",
        "default": "[]",
        "desc": "多选模式下已选中的值列表 Array[Variant]"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "default": "true",
        "desc": "是否支持一键清空选中值 (鼠标悬浮显示 × 图标)"
      },
      {
        "name": "filterable",
        "type": "boolean",
        "default": "true",
        "desc": "是否开启下拉列表实时模糊搜索过滤输入框"
      },
      {
        "name": "multiple",
        "type": "boolean",
        "default": "false",
        "desc": "是否开启多选 Tags 模式"
      },
      {
        "name": "collapse_tags",
        "type": "boolean",
        "default": "false",
        "desc": "多选模式下是否折叠超长标签"
      },
      {
        "name": "max_collapse_tags",
        "type": "int",
        "default": "1",
        "desc": "折叠标签模式下最多展示的 Tag 数量"
      },
      {
        "name": "placeholder_text",
        "type": "String",
        "default": "\"请选择...\"",
        "desc": "选择框未选值时的占位提示文本"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用整个选择器组件（不可点击交互）"
      }
    ],
    "events": [
      {
        "name": "item_selected(index, value, label)",
        "desc": "单选模式下选中新选项时触发",
        "params": "(index: int, value: Variant, label: String)"
      },
      {
        "name": "selection_changed(values)",
        "desc": "选中值集合改变时触发（单选返回单元素数组，多选返回全量数组）",
        "params": "(values: Array)"
      },
      {
        "name": "cleared()",
        "desc": "点击一键清空按钮时触发",
        "params": "()"
      },
      {
        "name": "popup_visibility_changed(is_visible)",
        "desc": "下拉弹窗展开或收起状态改变时触发",
        "params": "(is_visible: bool)"
      }
    ],
    "methods": [
      {
        "name": "add_option(label, value=null, disabled=false, group=\"\")",
        "desc": "动态追加单个下拉选项，支持指定分组与禁用状态",
        "params": "(label: String, value: Variant, disabled: bool, group: String) -> void"
      },
      {
        "name": "add_options(opt_list: Array)",
        "desc": "批量追加一组下拉选项 Array[Dictionary | String]",
        "params": "(opt_list: Array) -> void"
      },
      {
        "name": "clear_options()",
        "desc": "清空全部选项数据与当前选中状态",
        "params": "() -> void"
      },
      {
        "name": "show_popup()",
        "desc": "显式弹出下拉菜单并自动聚焦搜索框",
        "params": "() -> void"
      },
      {
        "name": "toggle_popup()",
        "desc": "切换下拉菜单展开或收起状态",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "下拉选择框主体触发器展示内容插槽",
        "child": "Control / GText",
        "example": "<template #default><span>请选择法术流派</span></template>"
      },
      {
        "name": "prefix",
        "desc": "选择框左侧前置图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #prefix><GIcon name=\"wand-magic\" /></template>"
      },
      {
        "name": "arrow",
        "desc": "自定义下拉展开箭头指示器插槽（旋转动画）",
        "child": "GIcon / TextureRect",
        "example": "<template #arrow><GIcon name=\"chevron-down\" /></template>"
      },
      {
        "name": "option",
        "desc": "自定义下拉菜单列表每一项渲染插槽（透传 { item, index }）",
        "child": "Control / HBoxContainer",
        "example": "<template #option=\"{ item }\"><GIcon :name=\"item.icon\" /> {{ item.label }}</template>"
      },
      {
        "name": "empty",
        "desc": "无匹配搜索结果时的空状态插槽",
        "child": "Control / GText",
        "example": "<template #empty><span>未找到相关角色</span></template>"
      }
    ]
  },
  "picker": {
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
        "desc": "顶部工具栏标题"
      },
      {
        "name": "columns",
        "type": "Array",
        "default": "[]",
        "desc": "选项列表（单列为字符串数组，多列为对象数组）"
      },
      {
        "name": "default_index",
        "type": "int",
        "default": "0",
        "desc": "单列选择器的默认选中项索引"
      },
      {
        "name": "confirm_button_text",
        "type": "String",
        "default": "\"确认\"",
        "desc": "确认按钮文字"
      },
      {
        "name": "cancel_button_text",
        "type": "String",
        "default": "\"取消\"",
        "desc": "取消按钮文字"
      },
      {
        "name": "show_toolbar",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示顶部工具栏"
      }
    ],
    "events": [
      {
        "name": "confirm(values, indexes)",
        "desc": "点击完成按钮时触发",
        "params": "(values: Array, indexes: Array)"
      },
      {
        "name": "cancel()",
        "desc": "点击取消按钮时触发",
        "params": "()"
      },
      {
        "name": "change(values, index)",
        "desc": "选项改变时触发",
        "params": "(values: Array, index: int)"
      }
    ],
    "methods": [
      {
        "name": "set_columns(cols: Array)",
        "desc": "批量设置多列或单列选项数据",
        "params": "(cols: Array) -> void"
      },
      {
        "name": "add_column(items: Array)",
        "desc": "动态追加一列备选数据",
        "params": "(items: Array) -> void"
      },
      {
        "name": "open()",
        "desc": "呼出选择器面板",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭选择器面板",
        "params": "() -> void"
      },
      {
        "name": "get_selected_value()",
        "desc": "获取当前选中的值",
        "params": "() -> Variant"
      }
    ],
    "slots": [
      {
        "name": "option",
        "desc": "轮盘每一行选项自定义渲染插槽（透传 { item, index }）",
        "child": "Control / GText",
        "example": "<template #option=\"{ item }\"><b>{{ item.text }}</b></template>"
      },
      {
        "name": "top-toolbar",
        "desc": "选择器顶部自定义工具栏插槽（取消/确认按钮区）",
        "child": "HBoxContainer / GButton",
        "example": "<template #top-toolbar><GButton>取消</GButton><GButton type=\"primary\">完成</GButton></template>"
      }
    ]
  },
  "slider": {
    "title": "Slider 滑块 (GSlider)",
    "desc": "通过拖动滑块在一个固定区间内进行数值的选择。",
    "demos": [
      {
        "title": "1. 基础滑块 (Basic Slider: 0 ~ 100)",
        "render": "<div style=\"max-width:360px; display:flex; align-items:center; gap:12px;\"><input type=\"range\" min=\"0\" max=\"100\" value=\"60\" style=\"flex:1; accent-color:var(--primary);\"><span style=\"font-size:12px; font-weight:600; width:30px;\">60%</span></div>",
        "code": "# GDScript: 基础滑块\nvar slider = GSlider.new()\nslider.value = 60.0\nadd_child(slider)"
      },
      {
        "title": "2. 离散步长与刻度标记 (Discrete Step & Marks)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:6px;\"><input type=\"range\" min=\"0\" max=\"100\" step=\"25\" value=\"50\" style=\"width:100%; accent-color:var(--primary);\"><div style=\"display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);\"><span>低 (0)</span><span>中 (25)</span><span>高 (50)</span><span>极高 (75)</span><span>超清 (100)</span></div></div>",
        "code": "# GDScript: 刻度标记\nslider.step = 25.0\nslider.marks = { 0:\"低\", 50:\"高\", 100:\"超清\" }"
      },
      {
        "title": "3. 双滑块范围选择 (Range Slider: [min, max])",
        "render": "<div style=\"max-width:360px; font-size:12px;\"><div style=\"display:flex; justify-content:space-between; margin-bottom:4px; color:var(--text-secondary);\"><span>装备等级筛选区间:</span><strong style=\"color:var(--primary);\">Lv.20 ~ Lv.80</strong></div><input type=\"range\" min=\"0\" max=\"100\" value=\"50\" style=\"width:100%; accent-color:var(--primary);\"></div>",
        "code": "# GDScript: 双滑块范围\nslider.range = true\nslider.range_value = [20.0, 80.0]"
      },
      {
        "title": "4. 垂直滑块 (Vertical Slider)",
        "render": "<div style=\"display:flex; gap:20px; align-items:flex-end; height:90px; padding:10px 0;\"><input type=\"range\" min=\"0\" max=\"100\" value=\"80\" orient=\"vertical\" style=\"writing-mode: vertical-lr; direction: rtl; height:80px; accent-color:var(--success);\"><input type=\"range\" min=\"0\" max=\"100\" value=\"40\" orient=\"vertical\" style=\"writing-mode: vertical-lr; direction: rtl; height:80px; accent-color:var(--primary);\"><span style=\"font-size:12px; color:var(--text-secondary);\">垂直声道音量</span></div>",
        "code": "# GDScript: 垂直滑块\nslider.vertical = true"
      },
      {
        "title": "5. 游戏主音量与画面亮度控制 (Game Audio & Brightness Slider)",
        "render": "<div style=\"max-width:360px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; justify-content:space-between; font-size:12px;\"><span>🔊 主音量 (Master Volume)</span><strong>85%</strong></div><input type=\"range\" min=\"0\" max=\"100\" value=\"85\" style=\"width:100%; accent-color:var(--primary);\"></div>",
        "code": "# GDScript: 游戏音量滑块\nvar audio_slider = GSlider.new_volume_slider(\"Master\")"
      }
    ],
    "props": [
      {
        "name": "value / v-model",
        "type": "float",
        "default": "0.0",
        "desc": "当前滑块数值"
      },
      {
        "name": "min_value / min",
        "type": "float",
        "default": "0.0",
        "desc": "最小值"
      },
      {
        "name": "max_value / max",
        "type": "float",
        "default": "100.0",
        "desc": "最大值"
      },
      {
        "name": "step",
        "type": "float",
        "default": "1.0",
        "desc": "步长"
      },
      {
        "name": "status",
        "type": "enum",
        "default": "PRIMARY",
        "desc": "状态色彩"
      }
    ],
    "events": [
      {
        "name": "value_changed(new_value)",
        "desc": "滑块值改变时触发",
        "params": "(new_value: float)"
      }
    ],
    "methods": [
      {
        "name": "set_value(v: float)",
        "desc": "程序化设置滑块值",
        "params": "(v: float) -> void"
      }
    ],
    "slots": [
      {
        "name": "thumb",
        "desc": "自定义滑块抓手把手插槽",
        "child": "Control / GIcon / TextureRect",
        "example": "<template #thumb><GIcon name=\"volume-high\" /></template>"
      },
      {
        "name": "mark",
        "desc": "自定义刻度标记渲染插槽（透传 { value, label }）",
        "child": "Control / GText",
        "example": "<template #mark=\"{ value }\"><span>{{ value }}%</span></template>"
      }
    ]
  },
  "form": {
    "title": "Form 表单布局 (GForm & GFormItem)",
    "desc": "由输入框、选择器、单选框、多选框等控件组成，用以收集、校验和提交数据。支持标签位置 (Top/Left/Right)、统一宽度与星号必填校验。",
    "demos": [
      {
        "title": "1. 基础表单与字段绑定 (Basic Form & Model)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:12px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">玩家昵称:</span><input type=\"text\" class=\"g-input\" value=\"亚瑟王\" style=\"flex:1;\"></div><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">所属战队:</span><input type=\"text\" class=\"g-input\" value=\"光明骑士团\" style=\"flex:1;\"></div><div style=\"display:flex; justify-content:flex-end; gap:8px;\"><button class=\"g-btn g-btn-primary\" onclick=\"showToast('表单提交成功！', 'success')\">提交注册</button></div></div>",
        "code": "# GDScript: 基础表单\nvar form = GForm.new()\nform.model = { \"name\": \"亚瑟王\", \"guild\": \"光明骑士团\" }\nadd_child(form)"
      },
      {
        "title": "2. 表单校验规则与错误提示 (Form Validation Rules)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:8px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">密码强度:</span><input type=\"password\" class=\"g-input\" value=\"123\" style=\"flex:1; border-color:var(--danger);\"></div><span style=\"margin-left:78px; font-size:11px; color:var(--danger);\">密码长度不能少于 6 位字符</span></div>",
        "code": "# GDScript: 表单校验规则\nform.rules = {\n    \"password\": [{ \"required\": true, \"min\": 6, \"message\": \"密码长度不能少于 6 位\" }]\n}"
      },
      {
        "title": "3. 行内表单 (Inline Form)",
        "render": "<div style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap;\"><input type=\"text\" class=\"g-input\" placeholder=\"按玩家 ID 查询...\" style=\"width:160px;\"><button class=\"g-btn g-btn-primary\">查询</button></div>",
        "code": "# GDScript: 行内表单\nform.inline = true"
      },
      {
        "title": "4. 对齐方式配置 (Label Position: Left / Right / Top)",
        "render": "<div style=\"max-width:300px; display:flex; flex-direction:column; gap:4px;\"><span style=\"font-size:12px; font-weight:600;\">上对齐标签 (Top Label):</span><input type=\"text\" class=\"g-input\" value=\"10010\" style=\"width:100%;\"></div>",
        "code": "# GDScript: 上对齐\nform.label_position = GForm.LabelPosition.TOP"
      },
      {
        "title": "5. 游戏创建角色与公会注册表单 (Game Character Registration)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"font-weight:700; font-size:14px; color:#ffd04b;\">⚔️ 新勇者档案建档</div><input type=\"text\" class=\"g-input\" placeholder=\"输入勇者大名...\" value=\"神圣裁决者\"><div style=\"display:flex; justify-content:space-between; font-size:12px;\"><span>初始职业:</span><strong style=\"color:var(--primary);\">圣骑士</strong></div><button class=\"g-btn g-btn-primary\" onclick=\"showToast('勇者档案建立成功！', 'success')\">开启冒险之旅</button></div>",
        "code": "# GDScript: 创建角色表单\nvar hero_form = GForm.new_hero_form()"
      }
    ],
    "props": [
      {
        "name": "label_position",
        "type": "enum",
        "default": "LEFT",
        "desc": "标签对齐：LEFT (居左), TOP (居顶), RIGHT (居右)"
      },
      {
        "name": "label_width",
        "type": "float",
        "default": "120.0",
        "desc": "统一标签宽度 (像素)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否统一禁用表单下的所有子输入控件"
      },
      {
        "name": "show_message",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示错误校验提示信息"
      }
    ],
    "events": [
      {
        "name": "validate_success()",
        "desc": "表单校验通过时触发",
        "params": "()"
      },
      {
        "name": "validate_failed(errors)",
        "desc": "表单校验失败时触发",
        "params": "(errors: Dictionary)"
      }
    ],
    "methods": [
      {
        "name": "validate()",
        "desc": "对整个表单进行校验，返回 bool 校验结果",
        "params": "() -> bool"
      },
      {
        "name": "reset_fields()",
        "desc": "重置表单中所有字段至初始默认值并清除错误",
        "params": "() -> void"
      },
      {
        "name": "clear_validate()",
        "desc": "清除所有表单项的错误提示状态",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "表单主体内容插槽，放置各类表单控件与 GFormItem",
        "child": "Control / VBoxContainer",
        "example": "<template #default><GFormItem label=\"账号\"><GInput /></GFormItem></template>"
      },
      {
        "name": "label",
        "desc": "自定义表单项左侧标签栏插槽（透传 { label, required }）",
        "child": "HBoxContainer / GText",
        "example": "<template #label><span>用户名 <i style=\"color:red;\">*</i></span></template>"
      },
      {
        "name": "error",
        "desc": "自定义表单校验失败错误提示插槽（透传 { error_message }）",
        "child": "Control / GText",
        "example": "<template #error=\"{ error_message }\"><span class=\"err\">{{ error_message }}</span></template>"
      },
      {
        "name": "extra",
        "desc": "表单项底部额外辅助说明插槽",
        "child": "Control / GText",
        "example": "<template #extra><small>密码长度建议在 8-16 位之间</small></template>"
      }
    ],
    "paneProps": [
      {
        "name": "label",
        "type": "String",
        "default": "\"\"",
        "desc": "表单项标签文本"
      },
      {
        "name": "prop",
        "type": "String",
        "default": "\"\"",
        "desc": "表单域 model 字段名"
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "desc": "是否必填，如为 true 会在 label 前生成红色星号"
      },
      {
        "name": "error_message",
        "type": "String",
        "default": "\"\"",
        "desc": "表单项校验失败提示文本"
      }
    ]
  },
  "dialog": {
    "title": "Dialog / Modal 对话框 (GDialog)",
    "desc": "居中弹出的模态对话框，包含基础确认、删除高危确认、自定义内容区、无取消按钮等完整弹窗场景。",
    "demos": [
      {
        "title": "1. 基础确认对话框 (Basic Modal Dialog)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('弹出基础对话框：是否确认开启深渊挑战？', 'info')\">打开模态对话框</button>",
        "code": "# GDScript: 基础对话框\nGDialog.confirm(\"是否确认开启深渊挑战？\", func(): print(\"确认开启\"))"
      },
      {
        "title": "2. 自定义 Header 与 Footer 插槽 (Custom Header & Footer)",
        "render": "<div style=\"max-width:320px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;\"><div style=\"padding:10px 14px; border-bottom:1px solid var(--border-base); font-weight:700; color:var(--primary);\">🔥 神话级强化确认</div><div style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary);\">本次强化将消耗 10 颗神圣宝石，成功率 65%。</div><div style=\"padding:8px 14px; background:var(--bg-surface); display:flex; justify-content:flex-end; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">取消</button><button class=\"g-btn g-btn-danger\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"showToast('强化成功！+16 圣辉战刃！', 'success')\">立即强化</button></div></div>",
        "code": "# GDScript: 自定义插槽\ndialog.header.title = \"神话级强化确认\""
      },
      {
        "title": "3. 异步确认加载状态 (Async Loading Dialog)",
        "render": "<button class=\"g-btn g-btn-warning\" onclick=\"showToast('正在向云端扣除钻石...', 'info')\">💎 购买月卡 (带 Loading 确认)</button>",
        "code": "# GDScript: 异步加载\ndialog.before_close = func(action, done):\n    # 异步联网处理\n    done.call()"
      },
      {
        "title": "4. 居中与自定义尺寸 (Center Alignment & Width)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('居中弹出 500px 大号对话框', 'info')\">居中大号对话框</button>",
        "code": "# GDScript: 对齐与尺寸\ndialog.center = true\ndialog.width = 500.0"
      },
      {
        "title": "5. 游戏抽卡十连抽奖励弹窗 (Game Gacha Reward Dialog)",
        "render": "<div style=\"max-width:360px; background:linear-gradient(135deg, #1e1b4b, #312e81); border:2px solid #ffd04b; border-radius:10px; padding:14px; text-align:center; color:#fff;\"><div style=\"font-size:16px; font-weight:800; color:#ffd04b; margin-bottom:8px;\">✨ 恭喜获得十连抽大奖 ✨</div><div style=\"font-size:32px; margin:10px 0;\">👑 🗡️ 🛡️ 🧪 💎</div><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('全部放入背包！', 'success')\">收下全部奖励</button></div>",
        "code": "# GDScript: 抽卡奖励弹窗\nvar gacha_dlg = GDialog.new_gacha_reward(rewards)"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Dialog Title\"",
        "desc": "弹窗标题"
      },
      {
        "name": "content_text",
        "type": "String",
        "default": "\"\"",
        "desc": "弹窗正文文本"
      },
      {
        "name": "confirm_button_text",
        "type": "String",
        "default": "\"Confirm\"",
        "desc": "确认按钮文本"
      },
      {
        "name": "cancel_button_text",
        "type": "String",
        "default": "\"Cancel\"",
        "desc": "取消按钮文本"
      },
      {
        "name": "show_cancel_button",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示取消按钮"
      },
      {
        "name": "mask_closable",
        "type": "boolean",
        "default": "true",
        "desc": "点击背景遮罩是否允许关闭"
      },
      {
        "name": "dialog_width",
        "type": "float",
        "default": "460.0",
        "desc": "对话框宽度 (像素)"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "default": "false",
        "desc": "是否以全屏铺满形式展示"
      }
    ],
    "events": [
      {
        "name": "confirmed()",
        "desc": "点击确认按钮时触发",
        "params": "()"
      },
      {
        "name": "cancelled()",
        "desc": "点击取消按钮时触发",
        "params": "()"
      },
      {
        "name": "opened()",
        "desc": "弹窗打开动画结束时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "弹窗关闭动画结束时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "open()",
        "desc": "播放弹性入场动画打开弹窗",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭弹窗并播放淡出动画",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "对话框主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><p>确认要丢弃这件神话装备？</p></template>"
      },
      {
        "name": "header",
        "desc": "对话框顶部标题栏插槽",
        "child": "HBoxContainer / GText",
        "example": "<template #header><h3>⚠️ 高危操作警告</h3></template>"
      },
      {
        "name": "close",
        "desc": "自定义右上角关闭按钮插槽",
        "child": "GButton / GIcon",
        "example": "<template #close><GIcon name=\"xmark\" /></template>"
      },
      {
        "name": "footer",
        "desc": "对话框底部操作按钮栏插槽（默认确认/取消）",
        "child": "HBoxContainer / GSpace / GButton",
        "example": "<template #footer><GButton type=\"danger\">确认丢弃</GButton></template>"
      }
    ]
  },
  "dialogue": {
    "title": "Dialogue 剧情对话系统 (GDialogue & Prompts)",
    "desc": "专为 JRPG 战术游戏、文字冒险 AVG / GalGame、MMORPG 任务交接与 NPC 互动设计的全功能剧情对话系统。支持打字机逐字输出、说话者印章姓名牌、立绘插槽、多段对话队列、分支选择支、科幻六边形气泡与头顶悬浮按键提示。",
    "demos": [
      {
        "title": "1. 两人双向立绘对峙对话 (Dual-Character Confrontation & Active Highlighting)",
        "render": "\n          <div style=\"background:#0c111d; border:2px solid #233554; border-radius:12px; padding:20px; display:flex; flex-direction:column; gap:16px; position:relative; overflow:hidden;\">\n            <!-- Dual Standee Portraits: Hero on Left, Villain on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:flex-end; padding:0 30px; height:120px;\">\n              <div id=\"dualSpeakerLeft\" style=\"display:flex; flex-direction:column; align-items:center; transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(64,158,255,0.4));\">🧙‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#409eff; background:rgba(64,158,255,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">罗宾 (Robin)</span>\n              </div>\n\n              <div id=\"dualSpeakerRight\" style=\"display:flex; flex-direction:column; align-items:center; opacity:0.4; transform:scale(0.92); transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(245,108,108,0.4));\">🦹‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#f56c6c; background:rgba(245,108,108,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">萨堤罗斯 (Saturos)</span>\n              </div>\n            </div>\n\n            <!-- Dialogue Box with Dynamic Side Switching -->\n            <div style=\"background:linear-gradient(180deg, #0a1f44 0%, #051026 100%); border:3px solid #d4d9e6; border-radius:6px; padding:14px 18px; color:#fff;\">\n              <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;\">\n                <span id=\"dualActiveSpeakerName\" style=\"background:#1b356d; border:1px solid #ffd04b; color:#ffd04b; font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px;\">罗宾</span>\n                <span style=\"font-size:11px; color:#a4b0be;\">点击下方按钮切换对话角色</span>\n              </div>\n              <div id=\"dualDialogText\" style=\"font-size:15px; line-height:1.6; min-height:48px;\">\n                萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！\n              </div>\n            </div>\n\n            <!-- Interactive Controller Buttons -->\n            <div style=\"display:flex; gap:10px;\">\n              <button class=\"g-btn g-btn-primary\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerLeft').style.opacity = '1';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerRight').style.opacity = '0.35';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '罗宾';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#409eff';\n                document.getElementById('dualActiveSpeakerName').style.color = '#409eff';\n                document.getElementById('dualDialogText').innerText = '萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！';\n              \">▶ 罗宾发言 (左侧主角高亮)</button>\n\n              <button class=\"g-btn g-btn-danger\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerRight').style.opacity = '1';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerLeft').style.opacity = '0.35';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '萨堤罗斯';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#f56c6c';\n                document.getElementById('dualActiveSpeakerName').style.color = '#f56c6c';\n                document.getElementById('dualDialogText').innerText = '哼，天真的小鬼！封印精神力只会让世界慢慢衰亡，点燃灯塔才是唯一的救赎！';\n              \">▶ 萨堤罗斯发言 (右侧反派高亮)</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 2人面对面双向立绘对峙对话 (自动高亮当前说话者，未说话者半透明淡出)\nGDialogue.converse([\n    {\n        \"speaker\": \"罗宾\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"left\",\n        \"text\": \"萨堤罗斯！放弃点燃元素灯塔的野心吧！\"\n    },\n    {\n        \"speaker\": \"萨堤罗斯\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"right\",\n        \"text\": \"哼，天真的小鬼！点燃灯塔才是拯救世界的唯一救赎！\"\n    }\n])"
      },
      {
        "title": "2. 场景宝箱开启与战利品掉落触发 (Treasure Chest Loot Trigger)",
        "render": "\n          <div style=\"background:#151009; border:2px solid #5c4326; border-radius:12px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:20px;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div id=\"simChestIcon\" style=\"font-size:48px; cursor:pointer; transition:all 0.3s ease;\" onclick=\"\n                this.style.transform = 'scale(1.2) rotate(-8deg)';\n                setTimeout(() => {\n                  this.innerHTML = '✨🎁';\n                  this.style.transform = 'scale(1)';\n                  openSimDialogue({\n                    text: '开启了【远古龙神遗迹宝箱】！\\n获得战利品：【神圣誓约之刃 +12】x1，【神话强化石】x5，金币 x8,800！',\n                    speaker: '宝箱开启',\n                    avatar: '🗡️'\n                  });\n                }, 300);\n              \">📦</div>\n              <div>\n                <div style=\"font-weight:700; color:#ffd700; font-size:14px;\">远古龙神遗迹宝箱 (点击开箱)</div>\n                <div style=\"font-size:11px; color:#eed8ae; margin-top:2px;\">点击宝箱触发开箱判定、掉落动效与战利品对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-warning\" style=\"height:34px;\" onclick=\"document.getElementById('simChestIcon').click()\">\n              <i class=\"fa-solid fa-key\"></i> 开启宝箱 (Open Chest)\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 点击宝箱触发开箱对话与掉落物展示\nfunc _on_treasure_chest_clicked():\n    play_chest_open_animation()\n    GDialogue.loot_chest(\"远古龙神遗迹宝箱\", [\n        \"【神圣誓约之刃 +12】x1\",\n        \"【神话强化石】x5\",\n        \"金币 x8,800\"\n    ], func():\n        add_items_to_inventory()\n        GMessage.success(\"物品已收入背包！\")\n    )"
      },
      {
        "title": "3. 二次元/手游立绘剧场对话与【跳过剧情 >>】(Anime Story Theater - 对标截图)",
        "render": "\n          <div style=\"position:relative; width:100%; min-height:220px; background:linear-gradient(135deg, #180d2b 0%, #0d0617 100%); border:2px solid #5a2e8c; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:16px; user-select:none;\">\n            <!-- Top Right: Skip Story Button [ 跳过剧情 >> ] -->\n            <div style=\"display:flex; justify-content:flex-end;\">\n              <button class=\"g-btn g-btn-default\" style=\"background:rgba(230,162,60,0.15); border:1px solid #ffd04b; color:#ffd04b; font-weight:800; font-size:12px; height:28px; padding:0 14px; border-radius:14px; cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.background='rgba(230,162,60,0.3)'\" onmouseleave=\"this.style.background='rgba(230,162,60,0.15)'\" onclick=\"simAnimeTheaterSkip()\">\n                跳过剧情 &gt;&gt;\n              </button>\n            </div>\n\n            <!-- Left Character Standee + Bottom Dialogue Bar -->\n            <div style=\"display:flex; align-items:flex-end; gap:16px;\">\n              <div id=\"animeStandeeAvatar\" style=\"font-size:72px; line-height:1; filter:drop-shadow(0 0 16px rgba(186,85,211,0.5)); flex-shrink:0; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\">🎭</div>\n              \n              <!-- Full-width Translucent Purple Dialogue Bar (Clickable to continue) -->\n              <div id=\"animeDialogueBox\" title=\"点击继续剧情\" style=\"flex:1; background:rgba(35, 15, 60, 0.88); border:1px solid #8a4baf; border-radius:8px; padding:12px 18px; position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.6); cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.borderColor='#ffd04b'; this.style.boxShadow='0 0 16px rgba(255,208,75,0.25)';\" onmouseleave=\"this.style.borderColor='#8a4baf'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.6)';\" onclick=\"simAnimeTheaterNext()\">\n                <div id=\"animeDialogueSpeaker\" style=\"font-weight:800; color:#ffd04b; font-size:14px; margin-bottom:4px; text-shadow:0 0 8px rgba(255,208,75,0.6);\">疯狂得爱丽丝啊</div>\n                <div id=\"animeDialogueText\" style=\"font-size:13px; color:#f1f2f6; line-height:1.5; min-height:40px;\">\n                  来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\n                </div>\n                <!-- Golden Next Chevron > (Clickable button) -->\n                <div id=\"animeDialogueNextBtn\" title=\"点击继续\" style=\"position:absolute; right:14px; bottom:10px; color:#ffd04b; font-size:18px; font-weight:800; animation:gBlink 0.6s infinite alternate; padding:2px 8px; border-radius:4px; background:rgba(255,208,75,0.1); border:1px solid rgba(255,208,75,0.3);\">&gt;</div>\n              </div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 二次元手游剧场式立绘对话 (带跳过剧情按钮与点击继续)\nvar theater_dialog = GDialogue.say({\n    \"speaker\": \"疯狂得爱丽丝啊\",\n    \"avatar\": preload(\"res://portraits/alice_mask.png\"),\n    \"text\": \"来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\",\n    \"allow_skip\": true\n})\ntheater_dialog.next_line_triggered.connect(func():\n    print(\"玩家点击继续，进入下一句剧场台词\")\n)"
      },
      {
        "title": "4. 《梦幻西游》经典 NPC 任务交接与红色选项分支 (Westward Journey NPC Quest)",
        "render": "\n          <div style=\"background:#0e131d; border:2px solid #4a5568; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px;\">\n            <div style=\"display:flex; gap:16px; align-items:flex-end;\">\n              <!-- Left NPC 3D Bust with Name -->\n              <div style=\"display:flex; flex-direction:column; align-items:center; width:90px;\">\n                <div style=\"width:72px; height:72px; background:radial-gradient(circle, #2d3748, #1a202c); border:2px solid #718096; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:36px;\">🥋</div>\n                <span style=\"font-size:12px; font-weight:700; color:#fff; background:#2d3748; padding:2px 8px; border-radius:4px; margin-top:-6px; border:1px solid #4a5568;\">首席大弟子</span>\n              </div>\n\n              <!-- CRT Scanline Dark Dialogue Box with Red Clickable Branches -->\n              <div style=\"flex:1; background:rgba(15, 20, 30, 0.95); border:2px solid #cbd5e0; border-radius:8px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"color:#fff; font-size:13px; font-weight:600;\">\n                  敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\n                </div>\n                <div style=\"display:flex; flex-direction:column; gap:4px; margin-top:2px;\">\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发战斗：进入首席弟子挑战副本！', 'danger')\">\n                    ▶ 我奉师傅之命，特来挑战——看招！\n                  </a>\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发剧情：我是路过拜访你的师傅老人家的。', 'info')\">\n                    ▶ 我是路过拜访你的师傅老人家的。\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 《梦幻西游》NPC 任务交接与红字选择支\nvar diag = GDialogue.ask(\n    \"敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\",\n    [\n        \"我奉师傅之命，特来挑战——看招！\",\n        \"我是路过拜访你的师傅老人家的。\"\n    ],\n    \"首席大弟子\",\n    avatar_chief\n)\ndiag.option_selected.connect(func(idx, text):\n    if idx == 0:\n        start_chief_boss_battle()\n    else:\n        open_dialog_greeting()\n)"
      },
      {
        "title": "5. 科幻/二次元斜切六边形气泡 (Sci-Fi Hexagonal Polygon Bubble - 对标截图)",
        "render": "\n          <div style=\"background:radial-gradient(circle at center, #1b2640 0%, #0a0f1d 100%); border:2px solid #2b4c7e; border-radius:12px; padding:20px; position:relative; overflow:hidden; display:flex; flex-direction:column; gap:16px; user-select:none;\">\n            <!-- Top Controls [ AUTO ] [ SKIP ] -->\n            <div style=\"display:flex; justify-content:flex-end; gap:8px;\">\n              <button id=\"scifiAutoBtn\" class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiToggleAuto()\">AUTO</button>\n              <button class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiSkip()\">SKIP</button>\n            </div>\n\n            <!-- Hexagonal Tech Dialogue Bubble -->\n            <div id=\"scifiDialogueBox\" title=\"点击继续对话\" style=\"position:relative; background:#0d1a33; border:2px solid #409eff; padding:16px 24px; border-radius:14px; clip-path:polygon(0% 0%, 94% 0%, 100% 50%, 94% 100%, 0% 100%); box-shadow:0 0 16px rgba(64,158,255,0.3); cursor:pointer; min-height:80px;\" onclick=\"simSciFiNext()\">\n              <!-- Speaker Tag Badge -->\n              <div id=\"scifiSpeakerTag\" style=\"position:absolute; top:-12px; left:20px; background:#409eff; color:#fff; font-size:11px; font-weight:800; padding:2px 14px; border-radius:4px; clip-path:polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%);\">\n                シマトラ\n              </div>\n              <div id=\"scifiDialogueText\" style=\"color:#fff; font-size:13px; line-height:1.6; margin-top:2px;\">\n                誰が、どうやって、何の目的で――<br>そのあたりは、これから調査するのである\n              </div>\n              <div style=\"position:absolute; right:36px; bottom:10px; color:#409eff; font-size:14px; font-weight:800; animation:gBlink 0.6s infinite alternate;\">&gt;&gt;</div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 科幻/二次元斜切六边形气泡对话框\nvar scifi_diag = GDialogue.say(\"誰が、どうやって、何の目的で――\\nそのあたりは、これから調査するのである\", \"シマトラ\")"
      },
      {
        "title": "6. 《黄金太阳》经典 JRPG 对话框 (Golden Sun Style)",
        "render": "\n          <div style=\"display:flex; gap:12px; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\" onclick=\"openSimDialogue([\n              { text: '修炼精神力的话，会学到不同的招式。', speaker: '神秘长者', avatar: '🧙‍♂️' },\n              { text: '去北方的索罗神殿吧，四大元素的封印正在苏醒！', speaker: '神秘长者', avatar: '🧙‍♂️' }\n            ])\">\n              <i class=\"fa-solid fa-play\"></i> 播放黄金太阳经典对话\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 黄金太阳经典对话\nGDialogue.say(\"修炼精神力的话，会学到不同的招式。\", \"神秘长者\")"
      },
      {
        "title": "7. 像素 RPG 靠近 NPC 头顶悬浮交互按键 (Floating Prompt [ R ] / [ E ])",
        "render": "\n          <div style=\"background:#1e2b18; padding:16px 20px; border-radius:10px; border:2px solid #3c5a2e; display:flex; align-items:center; justify-content:space-between;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div style=\"font-size:36px; position:relative;\">\n                🧔‍♂️\n                <div style=\"position:absolute; top:-16px; right:-8px; background:#000; color:#fff; border:2px solid #fff; border-radius:50%; width:20px; height:20px; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; animation:gBlink 0.6s infinite alternate;\">R</div>\n              </div>\n              <div>\n                <div style=\"font-weight:700; color:#a3e635; font-size:13px;\">湖畔垂钓翁·姜老</div>\n                <div style=\"font-size:11px; color:#d9f99d; margin-top:2px;\">靠近时自动浮现 [ R ] 交互按键，按 R 或点击开始对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-primary\" style=\"height:32px; font-size:12px;\" onclick=\"openSimDialogue({ text: '小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！', speaker: '姜老', avatar: '🎣' })\">\n              按 R 键交谈\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 为 2D NPC 绑定头顶交互按键\nGInteractPrompt.attach_to(npc_old_man, \"R\", func():\n    GDialogue.say(\"小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！\", \"姜老\", avatar_old_man)\n)"
      }
    ],
    "props": [
      {
        "name": "typing_speed",
        "type": "float",
        "default": "0.03",
        "desc": "打字机单字输出时间间隔 (秒)"
      },
      {
        "name": "position",
        "type": "enum",
        "default": "BOTTOM",
        "desc": "对话框位置：BOTTOM (底部居中), TOP (顶部), CENTER (居中)"
      }
    ],
    "events": [
      {
        "name": "text_completed()",
        "desc": "当前句打字机输出完毕时触发",
        "params": "()"
      },
      {
        "name": "dialogue_finished()",
        "desc": "整段对话队列全部播放完毕并关闭时触发",
        "params": "()"
      },
      {
        "name": "option_selected(index, text)",
        "desc": "玩家点击分支选项时触发",
        "params": "(index: int, text: String)"
      }
    ],
    "methods": [
      {
        "name": "say(lines, speaker=\"\", avatar=null)",
        "desc": "播放单句或多句对话队列",
        "params": "(lines: Variant, speaker: String, avatar: Texture2D) -> GDialogue"
      },
      {
        "name": "ask(question, options, speaker=\"\", avatar=null)",
        "desc": "播放带分支选择支的剧情对话",
        "params": "(question: String, options: Array, speaker: String, avatar: Texture2D) -> GDialogue"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "剧情对话正文打字机富文本区域",
        "child": "RichTextLabel / Control",
        "example": "<template #default>勇士，燃烧军团的阴影已笼罩艾泽拉斯！</template>"
      },
      {
        "name": "name",
        "desc": "说话者姓名牌印章区域",
        "child": "GText / PanelContainer",
        "example": "<template #name><span>大魔导师·卡德加 (Lv.99)</span></template>"
      },
      {
        "name": "avatar",
        "desc": "说话者半身立绘/动态插画插槽",
        "child": "TextureRect / AnimatedSprite2D",
        "example": "<template #avatar><TextureRect texture=\"res://npc_khadgar.png\" /></template>"
      },
      {
        "name": "options",
        "desc": "分支选择支列表插槽（透传 { option_list }）",
        "child": "VBoxContainer / GButton",
        "example": "<template #options><GButton>接受拯救世界任务</GButton></template>"
      },
      {
        "name": "next-icon",
        "desc": "右下角打字机完毕后的翻页闪烁指示图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #next-icon><GIcon name=\"angles-down\" /></template>"
      }
    ]
  },
  "chat": {
    "title": "Chat 微信与气泡对话流 (GChat & Lifeline)",
    "desc": "提供类似微信 (WeChat)、QQ 以及文字冒险解密游戏《生命线 Lifeline》的对话气泡流组件。支持左右双向分色气泡、系统事件时间胶囊、自适应文本长度、打字中动效与底部即时发送工具栏。",
    "demos": [
      {
        "title": "1. 基础双向聊天流 (Basic Chat Stream)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; gap:8px;\"><div style=\"width:32px; height:32px; border-radius:50%; background:#8da5f5; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">团长</div><div style=\"background:var(--bg-card); padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px; border:1px solid var(--border-base);\">今晚 8 点公会战准时开打！</div></div><div style=\"display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--primary); color:#fff; padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px;\">收到！已强化 +15！</div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div></div>",
        "code": "# GDScript: 基础聊天\nvar chat = GChat.new()\nchat.add_message(\"今晚 8 点公会战准时开打！\", GChat.Sender.OTHER)\nchat.add_message(\"收到！已强化 +15！\", GChat.Sender.ME)"
      },
      {
        "title": "2. 语音消息条与播放时长 (Voice Audio Message)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; align-items:center;\"><div style=\"width:30px; height:30px; border-radius:50%; background:#67c23a; color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\">法师</div><div style=\"background:var(--bg-card); padding:6px 12px; border-radius:16px; font-size:12px; display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border-base); cursor:pointer;\" onclick=\"showToast('正在播放语音 (12秒)...', 'info')\"><i class=\"fa-solid fa-volume-high\" style=\"color:var(--primary);\"></i><span>12\"</span></div></div>",
        "code": "# GDScript: 语音条\nchat.add_voice_message(\"res://audio/voice_1.ogg\", 12.0)"
      },
      {
        "title": "3. 游戏装备道具分享卡片 (Item Share Card Message)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:10px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--bg-card); border:1px solid #ffd04b; padding:8px 12px; border-radius:8px; font-size:12px; cursor:pointer;\" onclick=\"showToast('查看分享的 SSR 武器详情', 'success')\"><div style=\"color:#ffd04b; font-weight:700;\">⚔️ [分享] 圣辉破晓之剑 (SSR)</div><div style=\"color:var(--text-secondary); font-size:11px;\">攻击力 +1,200 | 点击查看</div></div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div>",
        "code": "# GDScript: 道具分享卡片\nchat.add_item_card_message(item_data, GChat.Sender.ME)"
      },
      {
        "title": "4. 系统通知与时间戳 (System Notice & Timestamps)",
        "render": "<div style=\"text-align:center; font-size:11px; color:var(--text-secondary);\"><span style=\"background:var(--bg-surface); padding:2px 8px; border-radius:10px;\">昨天 19:45 · 队长邀请了【神谕者】加入队伍</span></div>",
        "code": "# GDScript: 系统提示\nchat.add_system_notice(\"队长邀请了【神谕者】加入队伍\")"
      },
      {
        "title": "5. 快捷表情与输入栏面板 (Emoji Picker & Input Bar)",
        "render": "<div style=\"max-width:380px; display:flex; gap:6px; align-items:center;\"><button class=\"g-btn g-btn-default\" style=\"padding:4px 8px;\" onclick=\"showToast('打开表情面板 😄🎉⚔️', 'info')\">😀</button><input type=\"text\" class=\"g-input\" placeholder=\"输入聊天内容...\" style=\"flex:1; font-size:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">发送</button></div>",
        "code": "# GDScript: 输入栏\nchat.enable_input_bar = true"
      }
    ],
    "props": [
      {
        "name": "self_bubble_color",
        "type": "Color",
        "default": "Color.hex(0x07c160)",
        "desc": "我方发送气泡底色 (默认微信绿)"
      },
      {
        "name": "other_bubble_color",
        "type": "Color",
        "default": "Color.hex(0x242426)",
        "desc": "对方接收气泡底色"
      },
      {
        "name": "auto_scroll",
        "type": "boolean",
        "default": "true",
        "desc": "新消息到达时是否自动平滑滚动到底部"
      }
    ],
    "events": [
      {
        "name": "message_sent(text: String)",
        "desc": "玩家在底部输入框输入并点击发送或回车时触发",
        "params": "(text: String)"
      }
    ],
    "methods": [
      {
        "name": "send_self_message(text, avatar=null)",
        "desc": "添加一条我方右侧气泡消息",
        "params": "(text: String, avatar: Texture2D) -> GChat"
      },
      {
        "name": "receive_message(text, sender=\"队友\", avatar=null)",
        "desc": "添加一条对方左侧气泡消息",
        "params": "(text: String, sender: String, avatar: Texture2D) -> GChat"
      },
      {
        "name": "add_system_notice(text)",
        "desc": "添加一条居中系统时间戳或事件胶囊",
        "params": "(text: String) -> GChat"
      },
      {
        "name": "clear()",
        "desc": "清空当前聊天记录列表",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "message",
        "desc": "单条消息气泡自定义渲染插槽（透传 { message_data, is_self }）",
        "child": "Control / HBoxContainer",
        "example": "<template #message=\"{ msg, is_self }\"><div :class=\"is_self ? 'my-msg' : 'peer-msg'\">{{ msg.text }}</div></template>"
      },
      {
        "name": "avatar",
        "desc": "发言玩家头像插槽（透传 { user_info }）",
        "child": "GAvatar",
        "example": "<template #avatar=\"{ user }\"><GAvatar :src=\"user.avatar_url\" /></template>"
      },
      {
        "name": "input",
        "desc": "底部自定义输入与表情选择工具栏插槽",
        "child": "GInput / GButton",
        "example": "<template #input><GInput placeholder=\"输入消息...\" /><GButton>发送</GButton></template>"
      }
    ]
  },
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
  },
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
  },
  "tag": {
    "title": "Tag 标签 (GTag)",
    "desc": "用于标记和选择。支持 Light, Outline, Solid 三种质感及动态添加/关闭操作。",
    "demos": [
      {
        "title": "1. 基础主题色 (Basic Types: Primary / Success / Warning / Danger / Info)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\">Primary 主要</span><span class=\"g-tag g-tag-success\">Success 成功</span><span class=\"g-tag g-tag-warning\">Warning 警告</span><span class=\"g-tag g-tag-danger\">Danger 危险</span><span class=\"g-tag g-tag-info\">Info 消息</span></div>",
        "code": "# GDScript: 基础标签\nvar tag_p = GTag.new(\"Primary\", GotodTheme.Type.PRIMARY)\nadd_child(tag_p)"
      },
      {
        "title": "2. 可关闭标签 (Closable Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px;\">火系魔法 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了火系魔法标签', 'info')\"></i></span><span class=\"g-tag g-tag-success\" style=\"display:inline-flex; align-items:center; gap:6px;\">疾风步 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了疾风步标签', 'info')\"></i></span></div>",
        "code": "# GDScript: 可移除标签\ntag.closable = true"
      },
      {
        "title": "3. 尺寸与圆角形态 (Sizes: Small / Default / Large / Round)",
        "render": "<div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"padding:1px 6px; font-size:11px;\">Small 迷你</span><span class=\"g-tag g-tag-primary\" style=\"padding:3px 8px; font-size:12px;\">Default 默认</span><span class=\"g-tag g-tag-primary\" style=\"padding:6px 12px; font-size:14px;\">Large 大型</span><span class=\"g-tag g-tag-success\" style=\"border-radius:16px; padding:3px 12px;\">Round 胶囊圆角</span></div>",
        "code": "# GDScript: 尺寸设定\ntag.size = GTag.Size.SMALL\ntag.round = true"
      },
      {
        "title": "4. 朴素描边模式 (Plain / Outline Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--primary); color:var(--primary);\">朴素主要</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--success); color:var(--success);\">朴素成功</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--danger); color:var(--danger);\">朴素危险</span></div>",
        "code": "# GDScript: 朴素边框\ntag.plain = true"
      },
      {
        "title": "5. 游戏品质稀有度标签 (Game Rarity Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:#4b5563; color:#fff; font-weight:600;\">普通 (N)</span><span class=\"g-tag\" style=\"background:#2563eb; color:#fff; font-weight:600;\">精良 (R)</span><span class=\"g-tag\" style=\"background:#9333ea; color:#fff; font-weight:600;\">史诗 (SR)</span><span class=\"g-tag\" style=\"background:linear-gradient(90deg, #d97706, #f59e0b); color:#fff; font-weight:700; box-shadow:0 0 8px rgba(245,158,11,0.5);\">传说 (SSR)</span></div>",
        "code": "# GDScript: 稀有度标签\nvar ssr_tag = GTag.new(\"传说 (SSR)\")"
      },
      {
        "title": "6. 动态可编辑新增标签 (Dynamic Editable Tag Group)",
        "render": "<div style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap;\"><span class=\"g-tag g-tag-primary\">战士</span><span class=\"g-tag g-tag-primary\">法师</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\" onclick=\"showToast('添加新标签', 'info')\">+ 新增标签</button></div>",
        "code": "# GDScript: 动态标签\ntag_group.add_tag(\"刺客\")"
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"Tag\"",
        "desc": "标签文本"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO"
      },
      {
        "name": "variant",
        "type": "enum",
        "default": "LIGHT",
        "desc": "质感风格：LIGHT, OUTLINE, SOLID"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示关闭按钮"
      },
      {
        "name": "round",
        "type": "boolean",
        "default": "false",
        "desc": "是否圆角胶囊形态"
      }
    ],
    "events": [
      {
        "name": "closed()",
        "desc": "点击关闭按钮时触发",
        "params": "()"
      },
      {
        "name": "clicked()",
        "desc": "点击标签本身时触发",
        "params": "()"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "标签内部文字或内容插槽",
        "child": "Label / Control",
        "example": "<template #default>Godot 4.3 渲染引擎</template>"
      },
      {
        "name": "icon",
        "desc": "标签前置图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #icon><GIcon name=\"fire\" /></template>"
      },
      {
        "name": "close-icon",
        "desc": "自定义可关闭标签的关闭按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #close-icon><GIcon name=\"xmark\" /></template>"
      }
    ]
  },
  "badge": {
    "title": "Badge 徽标 (GBadge)",
    "desc": "按钮和图标上的数字或状态标记。支持 99+ 溢出保护与小红圆点模式。",
    "demos": [
      {
        "title": "1. 基础数值徽标 (Basic Count Badge)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">未读私信</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">5</span></div><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-primary\">公会申请</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--warning); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">12</span></div></div>",
        "code": "# GDScript: 基础徽标\nvar badge = GBadge.new(5)\nbtn.add_child(badge)"
      },
      {
        "title": "2. 最大值封顶截断 (Max Value: 99+ / 999+)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">背包爆满</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:600;\">99+</span></div><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">金币收益</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--success); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:600;\">999+</span></div></div>",
        "code": "# GDScript: 最大值封顶\nbadge.value = 150\nbadge.max = 99"
      },
      {
        "title": "3. 小红点模式 (Dot Mode: is_dot)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><i class=\"fa-solid fa-bell\" style=\"font-size:22px; color:var(--text-primary);\"></i><span style=\"position:absolute; top:-2px; right:-2px; width:8px; height:8px; background:var(--danger); border-radius:50%;\"></span></div><div style=\"position:relative; display:inline-block;\"><i class=\"fa-solid fa-envelope\" style=\"font-size:22px; color:var(--primary);\"></i><span style=\"position:absolute; top:-2px; right:-2px; width:8px; height:8px; background:var(--danger); border-radius:50%;\"></span></div></div>",
        "code": "# GDScript: 小红点\nbadge.is_dot = true"
      },
      {
        "title": "4. 自定义色彩方案 (Custom Status Colors)",
        "render": "<div style=\"display:flex; gap:24px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">神话掉落</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:#a855f7; color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;\">NEW</span></div></div>",
        "code": "# GDScript: 自定义颜色\nbadge.badge_color = Color(\"#a855f7\")"
      },
      {
        "title": "5. 独立展示徽标 (Standalone Badge)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><span class=\"g-badge\" style=\"background:var(--primary); color:#fff; font-size:12px; padding:2px 8px; border-radius:10px;\">版本 v1.0.4</span><span class=\"g-badge\" style=\"background:var(--success); color:#fff; font-size:12px; padding:2px 8px; border-radius:10px;\">服务器正常</span></div>",
        "code": "# GDScript: 独立徽标\nvar stand_badge = GBadge.new(\"版本 v1.0.4\", GotodTheme.Type.PRIMARY)"
      },
      {
        "title": "6. 游戏呼吸闪烁动态角标 (Glowing / Breathing Badge)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\">🎁 免费十连抽</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:#ef4444; color:#fff; font-size:10px; padding:1px 6px; border-radius:10px; box-shadow:0 0 10px #ef4444;\">HOT</span></div></div>",
        "code": "# GDScript: 呼吸动画徽标\nbadge.pulse_animation = true"
      }
    ],
    "props": [
      {
        "name": "value",
        "type": "int",
        "default": "0",
        "desc": "徽标显示数字"
      },
      {
        "name": "max_value",
        "type": "int",
        "default": "99",
        "desc": "最大值，超出显示 max_value+"
      },
      {
        "name": "is_dot",
        "type": "boolean",
        "default": "false",
        "desc": "是否仅显示小红圆点"
      },
      {
        "name": "hidden",
        "type": "boolean",
        "default": "false",
        "desc": "是否隐藏徽标"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "徽标所依附的主体节点插槽",
        "child": "GButton / GAvatar / GIcon / Control",
        "example": "<template #default><GButton icon=\"bell\">通知中心</GButton></template>"
      },
      {
        "name": "content",
        "desc": "自定义角标内部内容插槽（替代纯数字）",
        "child": "GIcon / Label",
        "example": "<template #content><GIcon name=\"fire\" style=\"color:yellow;\" /></template>"
      }
    ]
  },
  "avatar": {
    "title": "Avatar 头像 (GAvatar)",
    "desc": "用来代表用户或事物，支持图片、图标或字符展示。",
    "demos": [
      {
        "title": "1. 基础尺寸与形状 (Sizes: Small / Default / Large & Circle / Square)",
        "render": "<div style=\"display:flex; gap:20px; align-items:center; flex-wrap:wrap;\"><div style=\"width:32px; height:32px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; font-weight:600;\">S</div><div style=\"width:40px; height:40px; border-radius:50%; background:var(--success); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:600;\">M</div><div style=\"width:54px; height:54px; border-radius:50%; background:var(--warning); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:18px; font-weight:600;\">L</div><div style=\"width:40px; height:40px; border-radius:8px; background:#8da5f5; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:600;\">方</div></div>",
        "code": "# GDScript: 基础头像\nvar avatar = GAvatar.new()\navatar.size = GAvatar.Size.MEDIUM"
      },
      {
        "title": "2. 图标与文字头像 (Icon & Text Avatars)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:40px; height:40px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:inline-flex; align-items:center; justify-content:center; color:var(--primary); font-size:18px;\"><i class=\"fa-solid fa-user\"></i></div><div style=\"width:40px; height:40px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:13px; font-weight:600;\">亚瑟</div></div>",
        "code": "# GDScript: 图标/文字头像\nvar icon_avatar = GAvatar.new_icon(\"user\")"
      },
      {
        "title": "3. 图片加载失败回退 (Image Fallback)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:40px; height:40px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:inline-flex; align-items:center; justify-content:center; color:var(--text-secondary); font-size:14px;\"><i class=\"fa-solid fa-image\"></i></div><span style=\"font-size:12px; color:var(--text-secondary);\">当图片资源损坏或不存在时，自动回退到 fallback 占位图标</span></div>",
        "code": "# GDScript: 图片回退\navatar.fallback_icon = \"user\""
      },
      {
        "title": "4. 头像组叠放 (AvatarGroup Stack)",
        "render": "<div style=\"display:flex; align-items:center;\"><div style=\"width:36px; height:36px; border-radius:50%; background:#409eff; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); z-index:4;\">勇</div><div style=\"width:36px; height:36px; border-radius:50%; background:#67c23a; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); margin-left:-10px; z-index:3;\">法</div><div style=\"width:36px; height:36px; border-radius:50%; background:#e6a23c; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); margin-left:-10px; z-index:2;\">道</div></div>",
        "code": "# GDScript: 头像组\nvar group = GAvatarGroup.new()"
      },
      {
        "title": "5. 结合徽标与在线状态指示 (Online Status Badge)",
        "render": "<div style=\"display:flex; gap:20px; align-items:center;\"><div style=\"position:relative; display:inline-block;\"><div style=\"width:42px; height:42px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:600;\">队长</div><span style=\"position:absolute; bottom:0; right:0; width:10px; height:10px; background:var(--success); border-radius:50%; border:2px solid var(--bg-card);\" title=\"在线\"></span></div></div>",
        "code": "# GDScript: 在线状态\navatar.status = GAvatar.Status.ONLINE"
      },
      {
        "title": "6. 游戏 VIP 传说光环头像框 (Game VIP Avatar Frame)",
        "render": "<div style=\"display:flex; gap:24px; align-items:center;\"><div style=\"position:relative; display:inline-block; padding:4px; border-radius:50%; background:linear-gradient(135deg, #ffd700, #ff8c00); box-shadow:0 0 12px rgba(255,215,0,0.6);\"><div style=\"width:46px; height:46px; border-radius:50%; background:#1e1b4b; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:18px;\">👑</div><span style=\"position:absolute; top:-6px; right:-4px; background:#ef4444; color:#fff; font-size:9px; font-weight:800; padding:1px 4px; border-radius:4px;\">VIP8</span></div></div>",
        "code": "# GDScript: VIP 头像框\navatar.frame_texture = preload(\"res://assets/frames/vip_gold.png\")"
      }
    ],
    "props": [
      {
        "name": "avatar_size",
        "type": "float",
        "default": "40.0",
        "desc": "头像尺寸 (像素)"
      },
      {
        "name": "shape",
        "type": "enum",
        "default": "CIRCLE",
        "desc": "形状：CIRCLE (圆形), SQUARE (圆角矩形)"
      },
      {
        "name": "text",
        "type": "String",
        "default": "\"U\"",
        "desc": "无图片时的文字首字母"
      },
      {
        "name": "texture",
        "type": "Texture2D",
        "default": "null",
        "desc": "头像图片纹理"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "自定义头像内部文字或自定义图像节点插槽",
        "child": "Label / TextureRect",
        "example": "<template #default><span>K</span></template>"
      },
      {
        "name": "badge",
        "desc": "头像角标（如在线状态小绿点、等级徽章）插槽",
        "child": "GBadge / Control",
        "example": "<template #badge><span class=\"online-status-dot\"></span></template>"
      }
    ]
  },
  "progress": {
    "title": "Progress 进度条 (GProgress)",
    "desc": "用于展示操作进度，告知用户当前状态和预期。支持线性条状与圆形环状。",
    "demos": [
      {
        "title": "1. 基础直线进度条 (Basic Line Progress)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--primary); width:70%; height:100%;\"></div></div><div style=\"display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary);\"><span>主线任务下载中</span><span>70%</span></div></div>",
        "code": "# GDScript: 基础进度条\nvar prog = GProgress.new()\nprog.percentage = 70.0\nadd_child(prog)"
      },
      {
        "title": "2. 百分比内显与粗细定制 (Text Inside & Stroke Width)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:20px; border-radius:10px; overflow:hidden; position:relative;\"><div style=\"background:var(--success); width:85%; height:100%; display:flex; align-items:center; justify-content:flex-end; padding-right:8px; color:#fff; font-size:11px; font-weight:600;\">85%</div></div></div>",
        "code": "# GDScript: 内显文字\nprog.text_inside = true\nprog.stroke_width = 20.0"
      },
      {
        "title": "3. 状态主题色与渐变配置 (Theme Status & Gradients)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--success); width:100%; height:100%;\"></div></div><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:linear-gradient(90deg, #3b82f6, #a855f7); width:90%; height:100%;\"></div></div></div>",
        "code": "# GDScript: 渐变色\nprog.gradient = Gradient.new()"
      },
      {
        "title": "4. 环形进度条 (Circle Progress)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center;\"><div style=\"width:70px; height:70px; border-radius:50%; border:6px solid var(--bg-surface); border-top-color:var(--primary); border-right-color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--primary);\">60%</div></div>",
        "code": "# GDScript: 环形进度\nprog.type = GProgress.Type.CIRCLE"
      },
      {
        "title": "5. 仪表盘进度条 (Dashboard Progress)",
        "render": "<div style=\"display:flex; align-items:center; gap:20px;\"><div style=\"width:80px; height:45px; border:6px solid var(--bg-surface); border-bottom:none; border-top-left-radius:50px; border-top-right-radius:50px; border-top-color:var(--warning); display:flex; align-items:flex-end; justify-content:center; font-size:13px; font-weight:700; color:var(--warning);\">75%</div><span style=\"font-size:12px; color:var(--text-secondary);\">引擎负荷率</span></div>",
        "code": "# GDScript: 仪表盘\nprog.type = GProgress.Type.DASHBOARD"
      },
      {
        "title": "6. 游戏 RPG 复合状态条 (Game HP / MP / EXP Bars)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:8px; max-width:360px; background:rgba(0,0,0,0.3); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#ef4444; font-weight:700;\">HP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#ef4444; width:82%; height:100%;\"></div></div><span style=\"font-size:11px; color:#ef4444;\">4,100 / 5,000</span></div><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#3b82f6; font-weight:700;\">MP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#3b82f6; width:45%; height:100%;\"></div></div><span style=\"font-size:11px; color:#3b82f6;\">900 / 2,000</span></div></div>",
        "code": "# GDScript: 游戏血条/蓝条\nvar hp_bar = GProgress.new_game_bar(\"HP\", 4100, 5000, Color(\"#ef4444\"))"
      }
    ],
    "props": [
      {
        "name": "percentage",
        "type": "float",
        "default": "0.0",
        "desc": "进度百分比 (0~100)"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "LINE",
        "desc": "类型：LINE (线性), CIRCLE (环形)"
      },
      {
        "name": "status",
        "type": "enum",
        "default": "PRIMARY",
        "desc": "状态色彩"
      },
      {
        "name": "stroke_width",
        "type": "float",
        "default": "6.0",
        "desc": "进度条线条粗细"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "set_percentage(val: float)",
        "desc": "平滑更新进度条数值",
        "params": "(val: float) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "自定义进度条内部/右侧进度文字渲染插槽（透传 { percentage }）",
        "child": "Label / GText",
        "example": "<template #default=\"{ percentage }\"><span>{{ percentage }}% 已下载</span></template>"
      }
    ]
  },
  "tabs": {
    "title": "Tabs 标签页 (GTabs)",
    "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。",
    "demos": [
      {
        "title": "1. 基础选项卡 (Basic Tabs)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:12px;\"><button class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary);\">角色属性</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">技能加点</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">天赋树</button></div><div style=\"font-size:13px; color:var(--text-secondary); line-height:1.6;\">力量: 142 | 敏捷: 98 | 智力: 180</div></div>",
        "code": "# GDScript: 基础选项卡\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)"
      },
      {
        "title": "2. 卡片化样式 (Card Style: type=\"card\")",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; gap:4px; margin-bottom:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 12px;\">主线任务 (4)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 12px;\">支线悬赏 (12)</button></div><div style=\"font-size:13px; color:var(--text-secondary);\">当前正在进行：第 7 章 · 迷雾森林的低语</div></div>",
        "code": "# GDScript: 卡片标签页\ntabs.tab_type = GTabs.Type.CARD"
      },
      {
        "title": "3. 标签位置控制 (Position: Top / Bottom / Left / Right)",
        "render": "<div style=\"display:flex; border:1px solid var(--border-base); border-radius:var(--radius); max-width:420px; height:100px;\"><div style=\"width:100px; border-right:1px solid var(--border-base); padding:8px; display:flex; flex-direction:column; gap:4px;\"><button class=\"icon-category-btn active\" style=\"text-align:left; font-size:11px;\">常规设置</button><button class=\"icon-category-btn\" style=\"text-align:left; font-size:11px;\">画面画质</button></div><div style=\"flex:1; padding:12px; font-size:12px; color:var(--text-secondary);\">侧边竖向标签页内容区域</div></div>",
        "code": "# GDScript: 垂直左侧标签\ntabs.tab_position = GTabs.Position.LEFT"
      },
      {
        "title": "4. 自定义图标与徽标插槽 (Custom Icon & Badge Slot)",
        "render": "<div style=\"display:flex; gap:6px;\"><button class=\"icon-category-btn active\"><i class=\"fa-solid fa-envelope\"></i> 邮件 <span class=\"g-badge\" style=\"background:var(--danger); color:#fff; font-size:9px; padding:0 4px; border-radius:8px;\">3</span></button><button class=\"icon-category-btn\"><i class=\"fa-solid fa-users\"></i> 好友</button></div>",
        "code": "# GDScript: 图标徽标标签\ntabs.set_tab_icon(0, \"envelope\")"
      },
      {
        "title": "5. 动态可关闭与新增标签 (Editable & Closable Tabs)",
        "render": "<div style=\"display:flex; gap:6px; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; font-size:12px;\">关卡 1-1 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.remove()\"></i></span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">+ 开启新关卡</button></div>",
        "code": "# GDScript: 可编辑标签\ntabs.editable = true"
      },
      {
        "title": "6. 游戏商城分类切换实战 (Game Store Tabs)",
        "render": "<div style=\"max-width:440px; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px;\"><div style=\"display:flex; gap:8px; margin-bottom:12px;\"><button class=\"icon-category-btn active\">⚔️ 武器装备</button><button class=\"icon-category-btn\">🧪 炼金药水</button></div><div style=\"font-size:12px; color:var(--text-secondary);\">展示对应商店分类网格</div></div>",
        "code": "# GDScript: 商店分类\nvar store_tabs = GTabs.new()"
      }
    ],
    "props": [
      {
        "name": "model-value / current_tab",
        "type": "string / number",
        "default": "0",
        "desc": "绑定值，选中选项卡的 name 或索引，默认是第一个 tab"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "'' (LINE)",
        "desc": "风格类型：LINE, CARD, BORDER_CARD, SEGMENT"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否可关闭"
      },
      {
        "name": "addable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否可增加"
      },
      {
        "name": "editable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否同时可增加和关闭"
      },
      {
        "name": "tab-position",
        "type": "enum",
        "default": "top",
        "desc": "选项卡所在位置：top, bottom, left, right"
      },
      {
        "name": "stretch",
        "type": "boolean",
        "default": "false",
        "desc": "标签的宽度是否自撑开"
      },
      {
        "name": "before-leave",
        "type": "Callable / Function",
        "default": "() => true",
        "desc": "切换标签之前的钩子函数，若返回 false 则阻止切换"
      }
    ],
    "events": [
      {
        "name": "tab_clicked(index, name)",
        "desc": "点击选中某个选项卡时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_changed(index, name)",
        "desc": "当前激活选项卡发生改变时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_added(index, name)",
        "desc": "动态添加新选项卡时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_removed(index, name)",
        "desc": "选项卡被移除销毁时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_close_requested(index, name)",
        "desc": "用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)",
        "params": "(index: int, name: String)"
      }
    ],
    "methods": [
      {
        "name": "add_tab(name, panel, closable=false, icon=null)",
        "desc": "动态追加一个选项卡及关联内容面板",
        "params": "(name: String, panel: Control, closable: bool, icon: Texture2D) -> int"
      },
      {
        "name": "add_tabs(tab_list: Array[Dictionary])",
        "desc": "批量追加一组选项卡 [{\"name\": \"\", \"panel\": Control, \"closable\": false}]",
        "params": "(tab_list: Array[Dictionary]) -> void"
      },
      {
        "name": "insert_tab(index, name, panel, closable=false, icon=null)",
        "desc": "在指定索引位置插入一个选项卡",
        "params": "(index: int, name: String, panel: Control, closable: bool, icon: Texture2D) -> void"
      },
      {
        "name": "remove_tab(index_or_name)",
        "desc": "根据索引或标题名称移除指定选项卡",
        "params": "(index_or_name: Variant) -> void"
      },
      {
        "name": "clear_tabs()",
        "desc": "清空并销毁所有选项卡及关联面板",
        "params": "() -> void"
      },
      {
        "name": "get_tab_count()",
        "desc": "获取当前选项卡总数量",
        "params": "() -> int"
      },
      {
        "name": "get_tab_name(index)",
        "desc": "获取指定索引的选项卡标题文本",
        "params": "(index: int) -> String"
      },
      {
        "name": "set_tab_title(index, new_title)",
        "desc": "动态修改指定选项卡的标题文本",
        "params": "(index: int, new_title: String) -> void"
      },
      {
        "name": "get_tab_panel(index)",
        "desc": "获取指定索引绑定的内容面板 Control 节点",
        "params": "(index: int) -> Control"
      },
      {
        "name": "set_tab_disabled(index, is_disabled)",
        "desc": "设置指定选项卡是否禁用点击切换",
        "params": "(index: int, is_disabled: bool) -> void"
      },
      {
        "name": "is_tab_disabled(index)",
        "desc": "查询指定选项卡当前是否处于禁用状态",
        "params": "(index: int) -> bool"
      },
      {
        "name": "set_tab_icon(index, icon)",
        "desc": "为指定选项卡动态设置图标纹理",
        "params": "(index: int, icon: Texture2D) -> void"
      },
      {
        "name": "find_tab_by_name(name)",
        "desc": "根据标题名称反查选项卡的索引位置 (-1 为未找到)",
        "params": "(name: String) -> int"
      },
      {
        "name": "next_tab()",
        "desc": "程序化切换至下一个标签页 (循环)",
        "params": "() -> void"
      },
      {
        "name": "prev_tab()",
        "desc": "程序化切换至上一个标签页 (循环)",
        "params": "() -> void"
      },
      {
        "name": "set_before_leave(callback)",
        "desc": "设置标签切换拦截钩子函数 Callable(cur, next) -> bool",
        "params": "(callback: Callable) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "标签页内容面板插槽（包含所有 Tab 面板）",
        "child": "Array[Control]",
        "example": "<template #default><GTabPane label=\"背包\">...</GTabPane></template>"
      },
      {
        "name": "tab",
        "desc": "自定义 Tab 头部标签按钮插槽（透传 { tab_name, active, index }）",
        "child": "HBoxContainer / GIcon / GText",
        "example": "<template #tab=\"{ name }\"><GIcon name=\"box\" /> <span>{{ name }}</span></template>"
      },
      {
        "name": "prefix",
        "desc": "Tab 栏最左侧附加控件插槽",
        "child": "Control / GIcon",
        "example": "<template #prefix><GIcon name=\"bars\" /></template>"
      },
      {
        "name": "suffix",
        "desc": "Tab 栏最右侧附加操作按钮插槽（如“+ 新增Tab”）",
        "child": "GButton / GSpace",
        "example": "<template #suffix><GButton icon=\"plus\" size=\"small\" /></template>"
      }
    ],
    "paneProps": [
      {
        "name": "label",
        "type": "string",
        "default": "''",
        "desc": "选项卡标题文字"
      },
      {
        "name": "name",
        "type": "string / number",
        "default": "''",
        "desc": "与选项卡绑定值 value 对应的标识符"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用该标签页"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "该标签是否可单独关闭"
      }
    ]
  },
  "collapse": {
    "title": "Collapse 折叠面板 (GCollapse)",
    "desc": "通过折叠面板收纳内容区域。具备点击平滑展开/折叠动效与箭头旋转。",
    "demos": [
      {
        "title": "1. 基础折叠面板 (Basic Collapse)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;\"><div style=\"padding:10px 14px; background:var(--bg-surface); cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:600;\" onclick=\"const el = this.nextElementSibling; el.style.display = el.style.display==='none'?'block':'none';\"><span>🛡️ 防御机制与护甲计算公式</span><i class=\"fa-solid fa-chevron-down\"></i></div><div style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary); line-height:1.6; border-top:1px solid var(--border-base);\">有效承伤 = 原始伤害 × [ 100 / (100 + 护甲值) ]。护甲越高，边际减伤收益衰减。</div></div>",
        "code": "# GDScript: 基础折叠\nvar collapse = GCollapse.new()\ncollapse.add_item(\"🛡️ 防御机制\", armor_info_node)"
      },
      {
        "title": "2. 手风琴互斥模式 (Accordion Mode)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; font-size:13px;\"><div style=\"padding:10px 14px; background:var(--bg-surface); border-bottom:1px solid var(--border-base); font-weight:600;\">第一章：王城的沦陷 (展开中)</div><div style=\"padding:10px 14px; font-size:12px; color:var(--text-secondary); border-bottom:1px solid var(--border-base);\">在战火中守卫最后的圣骑士军团...</div><div style=\"padding:10px 14px; background:var(--bg-surface); font-weight:600;\">第二章：深渊的回响 (已折叠)</div></div>",
        "code": "# GDScript: 手风琴\ncollapse.accordion = true"
      },
      {
        "title": "3. 自定义头部与图标插槽 (Custom Header & Icon Slot)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;\"><div style=\"padding:10px 14px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"color:#a855f7;\"></i><span style=\"font-weight:600;\">终极禁咒·陨石术</span><span class=\"g-tag g-tag-danger\" style=\"font-size:10px; padding:1px 4px;\">Lv.MAX</span></div><i class=\"fa-solid fa-angle-right\"></i></div></div>",
        "code": "# GDScript: 自定义头部\nitem.header.icon = \"wand-magic-sparkles\""
      },
      {
        "title": "4. 禁用指定面板项 (Disabled Item)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; opacity:0.5;\"><div style=\"padding:10px 14px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; font-size:13px; cursor:not-allowed;\"><span>🔒 噩梦难度通关日志 (通关地狱难度后解锁)</span><i class=\"fa-solid fa-lock\"></i></div></div>",
        "code": "# GDScript: 禁用面板\ncollapse.set_item_disabled(2, true)"
      },
      {
        "title": "5. 极简无边框折叠 (Borderless Collapse)",
        "render": "<div style=\"max-width:420px; font-size:13px;\"><div style=\"padding:8px 0; border-bottom:1px solid var(--border-base); font-weight:600; display:flex; justify-content:space-between;\"><span>查看掉落概率公示</span><i class=\"fa-solid fa-chevron-down\" style=\"font-size:12px;\"></i></div></div>",
        "code": "# GDScript: 无边框\ncollapse.borderless = true"
      },
      {
        "title": "6. 游戏 RPG 任务详情追踪日志 (Quest Log Collapse)",
        "render": "<div style=\"max-width:420px; border:1px solid #67c23a; border-radius:var(--radius); overflow:hidden; background:rgba(103,194,58,0.05);\"><div style=\"padding:10px 14px; font-size:13px; font-weight:700; color:var(--success); display:flex; justify-content:space-between;\"><span>✅ [主线] 寻找失落的古代符文</span><span>100%</span></div><div style=\"padding:10px 14px; font-size:12px; color:var(--text-secondary); line-height:1.6; border-top:1px solid rgba(103,194,58,0.2);\">已在遗忘神殿深处找到远古符文石。</div></div>",
        "code": "# GDScript: 任务详情折叠\nvar quest_collapse = GCollapse.new()"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Collapse Title\"",
        "desc": "标题"
      },
      {
        "name": "is_open",
        "type": "boolean",
        "default": "false",
        "desc": "是否展开"
      },
      {
        "name": "accordion",
        "type": "boolean",
        "default": "false",
        "desc": "是否手风琴互斥模式"
      }
    ],
    "events": [
      {
        "name": "toggled(is_open)",
        "desc": "展开/收起状态改变时触发",
        "params": "(is_open: bool)"
      }
    ],
    "methods": [
      {
        "name": "toggle()",
        "desc": "切换展开与收起状态",
        "params": "() -> void"
      },
      {
        "name": "set_open(open_state: bool)",
        "desc": "显式设置面板展开或收起",
        "params": "(open_state: bool) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "折叠面板展开后的主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><div>画质等级: 超高 / 60FPS / 动态光影</div></template>"
      },
      {
        "name": "title",
        "desc": "自定义折叠面板标题栏插槽（透传 { is_expanded }）",
        "child": "HBoxContainer / GText",
        "example": "<template #title=\"{ is_expanded }\"><span>高级图形渲染设置</span></template>"
      },
      {
        "name": "extra",
        "desc": "折叠面板标题栏右侧操作项插槽",
        "child": "GButton / GTag",
        "example": "<template #extra><GTag type=\"success\">推荐配置</GTag></template>"
      },
      {
        "name": "arrow",
        "desc": "自定义展开/折叠箭头指示图标插槽（透传 { is_expanded }）",
        "child": "GIcon / TextureRect",
        "example": "<template #arrow=\"{ is_expanded }\"><GIcon :name=\"is_expanded ? 'angle-up' : 'angle-down'\" /></template>"
      }
    ]
  },
  "steps": {
    "title": "Steps 步骤条 (GSteps)",
    "desc": "引导用户按照流程完成任务的分步导航条。支持点击下一步/上一步动态驱动连线与状态点亮。",
    "demos": [
      {
        "title": "1. 基础横向步骤条 (Basic Horizontal Steps)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">1</span><span>创建角色</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">2</span><span>分配属性</span></div><div style=\"flex:1; height:2px; background:var(--border-base); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--text-secondary);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:flex; align-items:center; justify-content:center;\">3</span><span>进入世界</span></div></div>",
        "code": "# GDScript: 基础步骤条\nvar steps = GSteps.new()\nsteps.active = 1\nsteps.add_step(\"创建角色\")\nsteps.add_step(\"分配属性\")"
      },
      {
        "title": "2. 含错误状态步骤条 (Error Step Status)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-check\"></i></span><span>实名认证</span></div><div style=\"flex:1; height:2px; background:var(--danger); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--danger);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--danger); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-xmark\"></i></span><span>充值失败</span></div></div>",
        "code": "# GDScript: 错误状态\nsteps.set_step_status(1, GSteps.Status.ERROR)"
      },
      {
        "title": "3. 垂直步骤条 (Vertical Steps)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:300px; font-size:12px;\"><div style=\"display:flex; gap:12px;\"><span style=\"width:22px; height:22px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\"><i class=\"fa-solid fa-check\"></i></span><div><div style=\"font-weight:600; color:var(--text-primary);\">第 1 章：新手营地</div><div style=\"color:var(--text-secondary); font-size:11px;\">已通过考核</div></div></div></div>",
        "code": "# GDScript: 垂直步骤\nsteps.direction = GSteps.Direction.VERTICAL"
      },
      {
        "title": "4. 点状极简步骤条 (Dot Steps)",
        "render": "<div style=\"display:flex; align-items:center; gap:8px; max-width:300px;\"><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--primary);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--border-base);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--border-base);\"></span></div>",
        "code": "# GDScript: 点状步骤\nsteps.is_dot = true"
      },
      {
        "title": "5. 自定义图标步骤条 (Custom Icon Steps)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:360px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><i class=\"fa-solid fa-user-shield\" style=\"font-size:18px;\"></i><span>创建档案</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary);\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"font-size:18px;\"></i><span>选择专精</span></div></div>",
        "code": "# GDScript: 图标步骤\nsteps.set_step_icon(0, \"user-shield\")"
      },
      {
        "title": "6. 游戏剧情章节通关进度树 (Game Story Quest Steps)",
        "render": "<div style=\"max-width:440px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"font-weight:700; font-size:13px; margin-bottom:10px; color:#ffd04b;\">👑 王国救赎主线流程</div><div style=\"display:flex; justify-content:space-between; font-size:11px;\"><span style=\"color:var(--success);\">① 召集勇者 ✅</span><span style=\"color:var(--success);\">② 锻造圣剑 ✅</span><span style=\"color:var(--primary); font-weight:700;\">③ 讨伐恶龙 ⚔️</span><span style=\"color:var(--text-secondary);\">④ 加冕登基</span></div></div>",
        "code": "# GDScript: 游戏剧情步骤\nvar quest_steps = GSteps.new_story_flow(chapter_data)"
      }
    ],
    "props": [
      {
        "name": "steps",
        "type": "Array[String]",
        "default": "[]",
        "desc": "步骤名称列表"
      },
      {
        "name": "current_step / active",
        "type": "int",
        "default": "0",
        "desc": "当前激活步骤索引 (从 0 开始)"
      },
      {
        "name": "direction",
        "type": "enum",
        "default": "HORIZONTAL",
        "desc": "显示方向：HORIZONTAL, VERTICAL"
      },
      {
        "name": "finish_status",
        "type": "enum",
        "default": "SUCCESS",
        "desc": "已完成步骤的状态类型"
      }
    ],
    "events": [
      {
        "name": "step_changed(current_step)",
        "desc": "当前步骤改变时触发",
        "params": "(current_step: int)"
      }
    ],
    "methods": [
      {
        "name": "add_step(title: String)",
        "desc": "动态追加单个步骤",
        "params": "(title: String) -> void"
      },
      {
        "name": "add_steps(step_list: Array)",
        "desc": "批量设置/追加步骤列表 [\"步骤1\", \"步骤2\"]",
        "params": "(step_list: Array) -> void"
      },
      {
        "name": "next()",
        "desc": "前进至下一步",
        "params": "() -> void"
      },
      {
        "name": "prev()",
        "desc": "返回上一步",
        "params": "() -> void"
      },
      {
        "name": "set_step(index: int)",
        "desc": "直接跳转到指定步骤",
        "params": "(index: int) -> void"
      }
    ],
    "slots": [
      {
        "name": "icon",
        "desc": "自定义步骤节点图标插槽（透传 { index, status }）",
        "child": "GIcon / TextureRect",
        "example": "<template #icon=\"{ index }\"><GIcon name=\"circle-check\" /></template>"
      },
      {
        "name": "title",
        "desc": "自定义步骤标题插槽（透传 { index, title }）",
        "child": "GText / Label",
        "example": "<template #title=\"{ index, title }\"><span>步骤 {{ index + 1 }}: {{ title }}</span></template>"
      },
      {
        "name": "description",
        "desc": "自定义步骤详细描述插槽（透传 { index, desc }）",
        "child": "Label / Control",
        "example": "<template #description=\"{ desc }\"><small>{{ desc }}</small></template>"
      }
    ]
  },
  "space": {
    "title": "Space 间距布局 (GSpace)",
    "desc": "设置组件之间的间距。避免组件紧贴在一起，提升页面结构的规整度。支持水平/垂直方向与自动换行 (Wrap)。",
    "demos": [
      {
        "title": "1. 基础水平间距 (Basic Horizontal Space)",
        "render": "<div style=\"display:flex; gap:12px; align-items:center; flex-wrap:wrap;\"><button class=\"g-btn g-btn-primary\">按钮 1</button><button class=\"g-btn g-btn-success\">按钮 2</button><button class=\"g-btn g-btn-warning\">按钮 3</button></div>",
        "code": "# GDScript: 基础水平间距\nvar space = GSpace.new()\nspace.add_child(btn1)\nspace.add_child(btn2)"
      },
      {
        "title": "2. 垂直排列间距 (Vertical Space)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:10px; max-width:240px;\"><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 1</div><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 2</div><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 3</div></div>",
        "code": "# GDScript: 垂直间距\nspace.direction = GSpace.Direction.VERTICAL\nspace.size = 10.0"
      },
      {
        "title": "3. 间距尺寸预设 (Sizes: Small / Middle / Large)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px;\"><div style=\"display:flex; gap:8px; align-items:center;\"><span style=\"font-size:11px; width:60px;\">Small(8px):</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">A</button><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">B</button></div><div style=\"display:flex; gap:24px; align-items:center;\"><span style=\"font-size:11px; width:60px;\">Large(24px):</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">A</button><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">B</button></div></div>",
        "code": "# GDScript: 间距预设\nspace.size = GSpace.Size.LARGE"
      },
      {
        "title": "4. 垂直居中对齐方式 (Alignment: Center)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center; background:var(--bg-surface); padding:10px; border-radius:6px;\"><button class=\"g-btn g-btn-primary\" style=\"height:32px;\">标准按钮</button><span style=\"font-size:16px; font-weight:700;\">大号文字</span><span class=\"g-tag g-tag-success\">居中对齐</span></div>",
        "code": "# GDScript: 对齐方式\nspace.alignment = GSpace.Alignment.CENTER"
      },
      {
        "title": "5. 带分隔符间距 (Space with Divider)",
        "render": "<div style=\"display:flex; gap:10px; align-items:center; font-size:13px;\"><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">用户协议</a><span style=\"color:var(--border-base);\">|</span><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">隐私政策</a><span style=\"color:var(--border-base);\">|</span><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">联系客服</a></div>",
        "code": "# GDScript: 带分隔符\nspace.spacer = GDivider.new_vertical()"
      },
      {
        "title": "6. 游戏技能快捷栏网格间距排版 (Game Skill Bar Layout)",
        "render": "<div style=\"display:flex; gap:10px; align-items:center; background:rgba(0,0,0,0.4); padding:10px 14px; border-radius:10px; border:1px solid var(--border-base);\"><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#38bdf8; font-size:20px;\">⚔️</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#f87171; font-size:20px;\">🔥</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#c084fc; font-size:20px;\">⚡</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-size:20px;\">🧪</div></div>",
        "code": "# GDScript: 技能栏排版\nvar skill_space = GSpace.new_horizontal(10.0)"
      }
    ],
    "props": [
      {
        "name": "gap",
        "type": "float",
        "default": "12.0",
        "desc": "子节点间距 (像素)"
      },
      {
        "name": "wrap",
        "type": "boolean",
        "default": "true",
        "desc": "超出容器宽度时是否自动换行"
      },
      {
        "name": "direction",
        "type": "enum",
        "default": "HORIZONTAL",
        "desc": "排列方向：HORIZONTAL, VERTICAL"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "间距容器内所有自动排列的子节点插槽",
        "child": "Array[Control]",
        "example": "<template #default><GButton>选项A</GButton><GButton>选项B</GButton></template>"
      },
      {
        "name": "split",
        "desc": "子元素之间的自定义分隔符插槽",
        "child": "GDivider / Control",
        "example": "<template #split><GDivider vertical /></template>"
      }
    ]
  }
};
