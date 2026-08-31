// =========================================================================
// Gotod Components UI - Component: skeleton
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['skeleton'] = {
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
      "desc": "是否显示骨架屏，为 false 时自动展示子内容插槽",
      "version": "v1.0"
    },
    {
      "name": "avatar",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示左侧头像占位图",
      "version": "v1.0"
    },
    {
      "name": "avatar_shape",
      "type": "enum",
      "default": "ROUND",
      "desc": "头像占位图形状：ROUND (圆形), SQUARE (方形)",
      "version": "v1.2"
    },
    {
      "name": "avatar_size",
      "type": "float",
      "default": "40.0",
      "desc": "头像占位图大小 (像素)",
      "version": "v1.0"
    },
    {
      "name": "show_title",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示标题占位条",
      "version": "v1.0"
    },
    {
      "name": "title_width",
      "type": "float",
      "default": "40.0",
      "desc": "标题占位宽度 (百分比 %)",
      "version": "v1.0"
    },
    {
      "name": "rows",
      "type": "int",
      "default": "3",
      "desc": "段落占位行数",
      "version": "v1.0"
    },
    {
      "name": "row_width",
      "type": "Array[float]",
      "default": "[100.0, 100.0, 60.0]",
      "desc": "各行段落占位宽度数组 (百分比 %)",
      "version": "v1.0"
    },
    {
      "name": "animate",
      "type": "boolean",
      "default": "true",
      "desc": "是否开启波浪扫光流动动画效果",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "loading_changed(is_loading)",
      "desc": "加载状态发生改变时触发",
      "params": "(is_loading: bool)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "set_loading(val: bool)",
      "desc": "程序化设置骨架屏加载状态",
      "params": "(val: bool) -> void",
      "version": "v1.0"
    },
    {
      "name": "set_content(node: Control)",
      "desc": "绑定数据加载完成后显示的真实内容控件",
      "params": "(node: Control) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "加载完成（loading = false）后展示的真实业务组件插槽",
      "child": "Control",
      "example": "<template #default><HeroCard :hero=\"heroData\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "template",
      "desc": "自定义骨架占位模版结构插槽",
      "child": "VBoxContainer / Array[Control]",
      "example": "<template #template><div class=\"my-custom-skeleton\"></div></template>",
      "version": "v1.0"
    }
  ]
};
