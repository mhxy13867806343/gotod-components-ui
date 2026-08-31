// =========================================================================
// Gotod Components UI - Component: badge
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['badge'] = {
  "title": "Badge 徽标 (GBadge)",
  "desc": "按钮和图标上的数字或状态标记。支持 99+ 溢出保护与小红圆点模式。",
  "demos": [
    {
      "title": "1. 快速构建与三大调用形态 (Quick Build: xx(val) / xx(opts) / xx(a,b,c))",
      "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">未读私信</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">5</span></div><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-primary\">公会申请</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--warning); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">12</span></div></div>",
      "code": "# 方式 1: 单一数值快捷构建\nvar badge1 = GBadge.create(5)\n\n# 方式 2: 完整字典配置对象\nvar badge2 = GBadge.create({\n    \"value\": 150,\n    \"max\": 99,\n    \"is_dot\": false,\n    \"color\": Color(\"#ef4444\")\n})\n\n# 方式 3: 多参数位置传参 (数值, 最大值, 是否为红点)\nvar badge3 = GBadge.create(99, 99, false)"
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
      "desc": "徽标显示数字",
      "version": "v1.0"
    },
    {
      "name": "max_value",
      "type": "int",
      "default": "99",
      "desc": "最大值，超出显示 max_value+",
      "version": "v1.2"
    },
    {
      "name": "is_dot",
      "type": "boolean",
      "default": "false",
      "desc": "是否仅显示小红圆点",
      "version": "v1.2"
    },
    {
      "name": "hidden",
      "type": "boolean",
      "default": "false",
      "desc": "是否隐藏徽标",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "create(value_or_options: Variant, max_val: Variant = null, is_dot: Variant = null) -> GBadge",
      "desc": "静态多态构建工厂方法。支持单数值参数、字典配置对象、多参数位置传递三种形态",
      "params": "(value_or_options: Variant, max_val: Variant = null, is_dot: Variant = null) -> GBadge",
      "version": "v1.0.6"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "徽标所依附的主体节点插槽",
      "child": "GButton / GAvatar / GIcon / Control",
      "example": "<template #default><GButton icon=\"bell\">通知中心</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "content",
      "desc": "自定义角标内部内容插槽（替代纯数字）",
      "child": "GIcon / Label",
      "example": "<template #content><GIcon name=\"fire\" style=\"color:yellow;\" /></template>",
      "version": "v1.0"
    }
  ]
};
