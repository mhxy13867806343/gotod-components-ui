// =========================================================================
// Gotod Components UI - Component: dialog
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['dialog'] = {
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
};
