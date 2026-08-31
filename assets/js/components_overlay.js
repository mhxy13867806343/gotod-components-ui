// =========================================================================
// Gotod Components UI - Component: overlay
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['overlay'] = {
  "title": "Overlay 遮罩层 (GOverlay)",
  "desc": "创建一个全屏遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。深度对标 Vant UI Overlay 规范，支持内嵌居中卡片插槽与背景淡入淡出。",
  "demos": [
    {
      "title": "1. 基础遮罩层 (Basic Overlay)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('显示全屏背景遮罩', 'info')\">显示遮罩层</button>",
      "code": "# GDScript: 基础遮罩\nvar overlay = GOverlay.new()\noverlay.show()"
    },
    {
      "title": "2. 嵌入居中内容 (Embedded Content in Overlay)",
      "render": "<div style=\"max-width:280px; height:80px; background:rgba(0,0,0,0.6); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px;\">遮罩中居中展示的内容</div>",
      "code": "# GDScript: 居中内容\noverlay.add_child(center_box)"
    },
    {
      "title": "3. 点击遮罩关闭事件 (Close on Click Overlay)",
      "render": "<span style=\"font-size:12px; color:var(--text-secondary);\">默认点击遮罩空白区域自动平滑淡出关闭</span>",
      "code": "# GDScript: 点击关闭\noverlay.close_on_click = true"
    },
    {
      "title": "4. 毛玻璃虚化特效 (Backdrop Blur Effect)",
      "render": "<div style=\"background:rgba(255,255,255,0.08); backdrop-filter:blur(6px); padding:8px 14px; border-radius:6px; font-size:12px;\">高斯模糊毛玻璃遮罩</div>",
      "code": "# GDScript: 毛玻璃\noverlay.backdrop_blur = true"
    },
    {
      "title": "5. 游戏全屏暂停蒙层 (Game Pause Menu Overlay)",
      "render": "<div style=\"max-width:320px; background:rgba(0,0,0,0.8); border:1px solid #475569; border-radius:8px; padding:14px; text-align:center; color:#fff;\"><div style=\"font-size:16px; font-weight:800; margin-bottom:10px;\">⏸️ 游戏已暂停</div><div style=\"display:flex; justify-content:center; gap:8px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:11px;\">继续游戏</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">退出关卡</button></div></div>",
      "code": "# GDScript: 游戏暂停蒙层\nvar pause_overlay = GOverlay.new_pause_menu()"
    }
  ],
  "props": [
    {
      "name": "mask_color",
      "type": "Color",
      "default": "Color(0, 0, 0, 0.7)",
      "desc": "遮罩背景颜色与透明度",
      "version": "v1.0"
    },
    {
      "name": "duration",
      "type": "float",
      "default": "0.3",
      "desc": "淡入淡出动画时长 (秒)",
      "version": "v1.0"
    },
    {
      "name": "lock_scroll",
      "type": "boolean",
      "default": "true",
      "desc": "是否锁定底层滚动或输入阻断",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "click()",
      "desc": "点击遮罩层时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "opened()",
      "desc": "遮罩层淡入打开结束时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "closed()",
      "desc": "遮罩层淡出关闭结束时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "open()",
      "desc": "打开遮罩层并播放淡入动效",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "关闭遮罩层并播放淡出动效",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "toggle()",
      "desc": "切换遮罩层的开启与关闭状态",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "set_content(node)",
      "desc": "向遮罩层中央插槽挂载自定义控件节点",
      "params": "(node: Control) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "遮罩层内部居中/挂载的子节点插槽",
      "child": "Control",
      "example": "<template #default><div class=\"center-loading-card\">数据同步中...</div></template>",
      "version": "v1.0"
    }
  ]
};
