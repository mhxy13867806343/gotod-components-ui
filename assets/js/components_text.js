// =========================================================================
// Gotod Components UI - Component: text
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['text'] = {
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
};
