// =========================================================================
// Gotod Components UI - Component: collapse
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['collapse'] = {
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
      "desc": "标题",
      "version": "v1.0"
    },
    {
      "name": "is_open",
      "type": "boolean",
      "default": "false",
      "desc": "是否展开",
      "version": "v1.0"
    },
    {
      "name": "accordion",
      "type": "boolean",
      "default": "false",
      "desc": "是否手风琴互斥模式",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "toggled(is_open)",
      "desc": "展开/收起状态改变时触发",
      "params": "(is_open: bool)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "toggle()",
      "desc": "切换展开与收起状态",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "set_open(open_state: bool)",
      "desc": "显式设置面板展开或收起",
      "params": "(open_state: bool) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "折叠面板展开后的主体内容插槽",
      "child": "Control / VBoxContainer",
      "example": "<template #default><div>画质等级: 超高 / 60FPS / 动态光影</div></template>",
      "version": "v1.0"
    },
    {
      "name": "title",
      "desc": "自定义折叠面板标题栏插槽（透传 { is_expanded }）",
      "child": "HBoxContainer / GText",
      "example": "<template #title=\"{ is_expanded }\"><span>高级图形渲染设置</span></template>",
      "version": "v1.0"
    },
    {
      "name": "extra",
      "desc": "折叠面板标题栏右侧操作项插槽",
      "child": "GButton / GTag",
      "example": "<template #extra><GTag type=\"success\">推荐配置</GTag></template>",
      "version": "v1.0"
    },
    {
      "name": "arrow",
      "desc": "自定义展开/折叠箭头指示图标插槽（透传 { is_expanded }）",
      "child": "GIcon / TextureRect",
      "example": "<template #arrow=\"{ is_expanded }\"><GIcon :name=\"is_expanded ? 'angle-up' : 'angle-down'\" /></template>",
      "version": "v1.0"
    }
  ]
};
