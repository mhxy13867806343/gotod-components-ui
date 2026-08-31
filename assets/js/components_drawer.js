// =========================================================================
// Gotod Components UI - Component: drawer
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['drawer'] = {
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
      "desc": "抽屉标题",
      "version": "v1.0"
    },
    {
      "name": "placement",
      "type": "enum",
      "default": "RIGHT",
      "desc": "展开方向：RIGHT, LEFT, TOP, BOTTOM",
      "version": "v1.0"
    },
    {
      "name": "drawer_size",
      "type": "float",
      "default": "360.0",
      "desc": "抽屉宽度或高度 (像素)",
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
      "name": "show_close",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示右上角关闭叉号",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "opened()",
      "desc": "抽屉滑出动画结束时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "closed()",
      "desc": "抽屉滑回关闭时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "open()",
      "desc": "展开滑出抽屉面板",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "收起并关闭抽屉面板",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "抽屉主体内容插槽",
      "child": "Control / ScrollContainer",
      "example": "<template #default><ScrollContainer><VBoxContainer>...</VBoxContainer></ScrollContainer></template>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "抽屉顶部标题区插槽",
      "child": "HBoxContainer / GText",
      "example": "<template #header><h3>全局游戏设置</h3></template>",
      "version": "v1.0"
    },
    {
      "name": "footer",
      "desc": "抽屉底部操作栏插槽",
      "child": "HBoxContainer / GSpace",
      "example": "<template #footer><GButton type=\"primary\">保存配置</GButton></template>",
      "version": "v1.0"
    }
  ]
};
