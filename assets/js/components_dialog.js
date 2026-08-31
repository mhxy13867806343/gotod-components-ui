// =========================================================================
// Gotod Components UI - Component: dialog
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['dialog'] = {
  "title": "Dialog / Modal 对话框 (GDialog)",
  "desc": "居中弹出的模态对话框，包含基础确认、删除高危确认、自定义内容区、无取消按钮等完整弹窗场景。",
  "demos": [
    {
      "title": "1. 快速构建与三大调用形态 (Quick Build: xx(str) / xx(opts) / xx(a,b,c))",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"openSimModalDialog('是否确认开启深渊挑战？', '深渊挑战确认', function(){ showToast('已开启深渊挑战！', 'success') })\">打开模态对话框</button>",
      "code": "# 方式 1: 单一文本内容快捷构建\nvar dlg1 = GDialog.create(\"是否确认开启深渊挑战？\")\n\n# 方式 2: 完整字典配置对象 (或服务化调用)\nvar dlg2 = GDialog.create({\n    \"title\": \"神话级强化确认\",\n    \"content\": \"本次强化将消耗 10 颗神圣宝石，成功率 65%。\",\n    \"confirm_text\": \"立即强化\",\n    \"on_confirm\": func(): GMessage.success(\"强化成功！\")\n})\n\n# 方式 3: 多参数位置传参 (标题, 内容, 确认回调)\nvar dlg3 = GDialog.create(\"系统提示\", \"装备耐久度已归零\", func(): print(\"已知悉\"))"
    },
    {
      "title": "2. 自定义 Header 与 Footer 插槽 (Custom Header & Footer)",
      "render": "<div style=\"max-width:320px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;\"><div style=\"padding:10px 14px; border-bottom:1px solid var(--border-base); font-weight:700; color:var(--primary);\">🔥 神话级强化确认</div><div style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary);\">本次强化将消耗 10 颗神圣宝石，成功率 65%。</div><div style=\"padding:8px 14px; background:var(--bg-surface); display:flex; justify-content:flex-end; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">取消</button><button class=\"g-btn g-btn-danger\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"showToast('强化成功！+16 圣辉战刃！', 'success')\">立即强化</button></div></div>",
      "code": "# GDScript: 自定义插槽\ndialog.header.title = \"神话级强化确认\""
    },
    {
      "title": "3. 异步确认加载状态 (Async Loading Dialog)",
      "render": "<button class=\"g-btn g-btn-warning\" onclick=\"openSimModalDialog({ title: '💎 购买月卡', message: '将消耗 300 钻石兑换 30 天月卡特权，是否继续？', confirmText: '立即支付', onConfirm: function(){ showToast('支付成功！月卡已生效', 'success') } })\">💎 购买月卡 (带 Loading 确认)</button>",
      "code": "# GDScript: 异步加载\ndialog.before_close = func(action, done):\n    # 异步联网处理\n    done.call()"
    },
    {
      "title": "4. 居中与自定义尺寸 (Center Alignment & Width)",
      "render": "<button class=\"g-btn g-btn-default\" onclick=\"openSimModalDialog({ title: '大号系统设置弹窗 (500px)', message: '居中全屏遮罩展示大号模态对话框，支持嵌入复杂的技能加点树或装备列表。', confirmText: '保存设置' })\">居中大号对话框</button>",
      "code": "# GDScript: 对齐与尺寸\ndialog.center = true\ndialog.width = 500.0"
    },
    {
      "title": "5. 游戏抽卡十连抽奖励弹窗 (Game Gacha Reward Dialog)",
      "render": "<div style=\"max-width:360px; background:linear-gradient(135deg, #1e1b4b, #312e81); border:2px solid #ffd04b; border-radius:10px; padding:14px; text-align:center; color:#fff;\"><div style=\"font-size:16px; font-weight:800; color:#ffd04b; margin-bottom:8px;\">✨ 恭喜获得十连抽大奖 ✨</div><div style=\"font-size:32px; margin:10px 0;\">👑 🗡️ 🛡️ 🧪 💎</div><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('全部放入背包！', 'success')\">收下全部奖励</button></div>",
      "code": "# GDScript: 抽卡奖励弹窗\nvar gacha_dlg = GDialog.new_gacha_reward(rewards)"
    },
    {
      "title": "6. 背景点击与防误触控制 (close_on_click_overlay: false 默认不可点 / true 可点)",
      "render": "<div style=\"display:flex; gap:12px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-danger\" onclick=\"openSimModalDialog({ title: '⚠ 高危操作确认', message: '当前弹窗默认不可点击背景关闭 (close_on_click_overlay: false)，防止用户误触退出！', close_on_click_overlay: false })\">默认防误触 (不可点背景)</button><button class=\"g-btn g-btn-default\" onclick=\"openSimModalDialog({ title: '轻量提示', message: '已开启允许点击背景关闭 (close_on_click_overlay: true)。', close_on_click_overlay: true })\">允许点击背景关闭</button></div>",
      "code": "# GDScript: 背景点击防误触配置\n# 1. 默认防误触 (默认不可点击背景关闭)\nvar dlg_safe = GDialog.create({\n    \"title\": \"高危分解确认\",\n    \"content\": \"分解后将永久销毁装备！\",\n    \"close_on_click_overlay\": false # 默认 false\n})\n\n# 2. 允许点击背景快速退出\nvar dlg_quick = GDialog.create({\n    \"title\": \"活动详情\",\n    \"content\": \"点击背景任意区域即可退出\",\n    \"close_on_click_overlay\": true\n})"
    },
    {
      "title": "7. 自定义背景遮罩色彩 (Custom Overlay Mask Color)",
      "render": "<div style=\"display:flex; gap:12px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-danger\" onclick=\"openSimModalDialog({ title: '🔥 灭世灾厄降临', message: '暗红色半透明全屏遮罩，烘托危机战场氛围！', overlay_color: 'rgba(120, 0, 0, 0.75)' })\">暗红高危遮罩</button><button class=\"g-btn g-btn-primary\" onclick=\"openSimModalDialog({ title: '🌌 深渊星空秘境', message: '深蓝色半透明全屏遮罩，沉浸感夜空背景！', overlay_color: 'rgba(10, 25, 60, 0.8)' })\">深蓝秘境遮罩</button></div>",
      "code": "# GDScript: 自定义遮罩背景色\nvar dlg_danger = GDialog.create({\n    \"title\": \"灭世灾厄\",\n    \"content\": \"红色危机警戒遮罩\",\n    \"overlay_color\": Color(0.47, 0.0, 0.0, 0.75) # 自定义暗红背景\n})"
    }
  ],
  "props": [
    {
      "name": "title",
      "type": "String",
      "default": "\"Dialog Title\"",
      "desc": "弹窗标题",
      "version": "v1.0"
    },
    {
      "name": "content_text",
      "type": "String",
      "default": "\"\"",
      "desc": "弹窗正文文本",
      "version": "v1.0"
    },
    {
      "name": "confirm_button_text",
      "type": "String",
      "default": "\"Confirm\"",
      "desc": "确认按钮文本",
      "version": "v1.0"
    },
    {
      "name": "cancel_button_text",
      "type": "String",
      "default": "\"Cancel\"",
      "desc": "取消按钮文本",
      "version": "v1.0"
    },
    {
      "name": "show_cancel_button",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示取消按钮",
      "version": "v1.0"
    },
    {
      "name": "mask_closable",
      "type": "boolean",
      "default": "true",
      "desc": "点击背景遮罩是否允许关闭",
      "version": "v1.0"
    },
    {
      "name": "dialog_width",
      "type": "float",
      "default": "460.0",
      "desc": "对话框宽度 (像素)",
      "version": "v1.0"
    },
    {
      "name": "fullscreen",
      "type": "boolean",
      "default": "false",
      "desc": "是否以全屏铺满形式展示",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "confirmed()",
      "desc": "点击确认按钮时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "cancelled()",
      "desc": "点击取消按钮时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "opened()",
      "desc": "弹窗打开动画结束时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "closed()",
      "desc": "弹窗关闭动画结束时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "open()",
      "desc": "播放弹性入场动画打开弹窗",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "关闭弹窗并播放淡出动画",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "对话框主体内容插槽",
      "child": "Control / VBoxContainer",
      "example": "<template #default><p>确认要丢弃这件神话装备？</p></template>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "对话框顶部标题栏插槽",
      "child": "HBoxContainer / GText",
      "example": "<template #header><h3>⚠️ 高危操作警告</h3></template>",
      "version": "v1.0"
    },
    {
      "name": "close",
      "desc": "自定义右上角关闭按钮插槽",
      "child": "GButton / GIcon",
      "example": "<template #close><GIcon name=\"xmark\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "footer",
      "desc": "对话框底部操作按钮栏插槽（默认确认/取消）",
      "child": "HBoxContainer / GSpace / GButton",
      "example": "<template #footer><GButton type=\"danger\">确认丢弃</GButton></template>",
      "version": "v1.0"
    }
  ]
};
