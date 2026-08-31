// =========================================================================
// Gotod Components UI - Component: card
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['card'] = {
  "title": "Card 卡片 (GCard)",
  "desc": "将信息聚合在卡片容器中展示。支持标题栏、右上角 Extra 扩展操作区与边框阴影。",
  "demos": [
    {
      "title": "1. 快速构建与三大调用形态 (Quick Build: xx(str) / xx(opts) / xx(a,b,c))",
      "render": "<div class=\"g-card\" style=\"max-width:380px;\"><div class=\"g-card-header\" style=\"display:flex; justify-content:space-between; align-items:center;\"><span style=\"font-weight:600; font-size:14px;\">🏰 领主城堡管理</span><button class=\"g-btn g-btn-primary\" style=\"padding:4px 10px; font-size:12px;\" onclick=\"showToast('进入城堡大厅', 'info')\">进入大厅</button></div><div class=\"g-card-body\" style=\"font-size:13px; color:var(--text-secondary); line-height:1.6;\">城堡等级：Lv.18<br>当前税收产出：1,250 金币/小时<br>驻防守卫：48 / 60 骑士团</div><div class=\"g-card-footer\" style=\"display:flex; justify-content:flex-end; gap:8px; font-size:12px; border-top:1px solid var(--border-base); padding:8px 16px; color:var(--text-secondary);\"><span>维护状态：极佳</span></div></div>",
      "code": "# 方式 1: 单一标题文本快捷构建\nvar card1 = GCard.create(\"🏰 领主城堡管理\")\n\n# 方式 2: 完整字典配置对象\nvar card2 = GCard.create({\n    \"title\": \"装备词条特写\",\n    \"extra\": \"详情 >\",\n    \"bordered\": true,\n    \"body\": equip_specs_vbox\n})\n\n# 方式 3: 多参数位置传参 (标题, 右侧扩展文本, 主体节点)\nvar card3 = GCard.create(\"公会任务\", \"更多\", quest_list_node)"
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
      "desc": "卡片标题",
      "version": "v1.0"
    },
    {
      "name": "extra_text",
      "type": "String",
      "default": "\"\"",
      "desc": "右上角额外操作文本",
      "version": "v1.0"
    },
    {
      "name": "bordered",
      "type": "boolean",
      "default": "true",
      "desc": "是否带有边框",
      "version": "v1.0"
    },
    {
      "name": "shadow",
      "type": "enum",
      "default": "ALWAYS",
      "desc": "阴影展示时机：ALWAYS, HOVER, NEVER",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "extra_clicked()",
      "desc": "点击右上角 Extra 文本时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "create(title_or_options: Variant, extra: Variant = null, body_node: Variant = null) -> GCard",
      "desc": "静态多态构建工厂方法。支持单标题参数、字典配置对象、多参数位置传递三种形态",
      "params": "(title_or_options: Variant, extra: Variant = null, body_node: Variant = null) -> GCard",
      "version": "v1.0.6"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "卡片主体内容插槽",
      "child": "Control / VBoxContainer",
      "example": "<template #default><p>跨服巅峰赛小组赛第一轮战报</p></template>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "卡片标题区插槽",
      "child": "GText / Label / HBoxContainer",
      "example": "<template #header><span>战术小队战报</span></template>",
      "version": "v1.0"
    },
    {
      "name": "extra",
      "desc": "卡片右上角操作区插槽（如“更多”、“编辑”等按钮）",
      "child": "GButton / GSpace",
      "example": "<template #extra><a href=\"javascript:void(0)\">查看全部 →</a></template>",
      "version": "v1.0"
    },
    {
      "name": "cover",
      "desc": "卡片顶部封面图片/媒体插槽",
      "child": "TextureRect / SubViewportContainer",
      "example": "<template #cover><img src=\"res://cover_s4.png\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "footer",
      "desc": "卡片底部操作栏插槽",
      "child": "HBoxContainer / GSpace",
      "example": "<template #footer><GButton icon=\"share\">分享战报</GButton></template>",
      "version": "v1.0"
    }
  ]
};
