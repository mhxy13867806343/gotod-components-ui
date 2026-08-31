// =========================================================================
// Gotod Components UI - Component: popup
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['popup'] = {
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
      "desc": "弹出位置：CENTER (居中), TOP (顶部), BOTTOM (底部), LEFT (左侧), RIGHT (右侧)",
      "version": "v1.0"
    },
    {
      "name": "round_corner",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示圆角 (顶部/底部弹出时自动为上方或下方大圆角)",
      "version": "v1.0"
    },
    {
      "name": "closeable",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示右上角/左上角关闭图标",
      "version": "v1.0"
    },
    {
      "name": "close_icon_position",
      "type": "enum",
      "default": "TOP_RIGHT",
      "desc": "关闭图标位置：TOP_RIGHT, TOP_LEFT, BOTTOM_RIGHT, BOTTOM_LEFT",
      "version": "v1.0"
    },
    {
      "name": "overlay",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示背景遮罩层",
      "version": "v1.0"
    },
    {
      "name": "close_on_click_overlay",
      "type": "boolean",
      "default": "true",
      "desc": "是否在点击背景遮罩层后自动关闭",
      "version": "v1.2"
    },
    {
      "name": "duration",
      "type": "float",
      "default": "0.3",
      "desc": "过渡动画时长 (秒)",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "opened()",
      "desc": "弹出层打开动画结束时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "closed()",
      "desc": "弹出层关闭动画结束时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "click_overlay()",
      "desc": "点击背景遮罩层时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "click_close_icon()",
      "desc": "点击关闭图标时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "open()",
      "desc": "打开弹出层并执行对应方位的 Tween 滑入/缩放动效",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "关闭弹出层并执行滑出/淡出动效",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "toggle()",
      "desc": "切换弹出层的开启/关闭状态",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "set_content(node)",
      "desc": "动态设置弹出层内部承载的子节点内容",
      "params": "(node: Control) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "弹层主体内容插槽",
      "child": "Control / VBoxContainer",
      "example": "<template #default><div class=\"goods-sku-panel\">...</div></template>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "顶部标题/导航栏插槽",
      "child": "HBoxContainer",
      "example": "<template #header><h4>选择武器精炼规格</h4></template>",
      "version": "v1.0"
    },
    {
      "name": "close",
      "desc": "自定义关闭按钮插槽",
      "child": "GButton / GIcon",
      "example": "<template #close><GIcon name=\"xmark\" /></template>",
      "version": "v1.0"
    }
  ]
};
