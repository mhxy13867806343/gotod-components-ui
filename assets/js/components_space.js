// =========================================================================
// Gotod Components UI - Component: space
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['space'] = {
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
      "desc": "子节点间距 (像素)",
      "version": "v1.0"
    },
    {
      "name": "wrap",
      "type": "boolean",
      "default": "true",
      "desc": "超出容器宽度时是否自动换行",
      "version": "v1.0"
    },
    {
      "name": "direction",
      "type": "enum",
      "default": "HORIZONTAL",
      "desc": "排列方向：HORIZONTAL, VERTICAL",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [],
  "slots": [
    {
      "name": "default",
      "desc": "间距容器内所有自动排列的子节点插槽",
      "child": "Array[Control]",
      "example": "<template #default><GButton>选项A</GButton><GButton>选项B</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "split",
      "desc": "子元素之间的自定义分隔符插槽",
      "child": "GDivider / Control",
      "example": "<template #split><GDivider vertical /></template>",
      "version": "v1.0"
    }
  ]
};
