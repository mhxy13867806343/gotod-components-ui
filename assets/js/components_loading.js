// =========================================================================
// Gotod Components UI - Component: loading
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['loading'] = {
  "title": "Loading 加载指示器 (GLoading)",
  "desc": "加载数据时显示动效，防止用户以为系统卡死。",
  "demos": [
    {
      "title": "1. 局部容器加载 (Container Loading)",
      "render": "<div style=\"max-width:320px; height:80px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;\"><i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:20px; color:var(--primary);\"></i><span style=\"font-size:12px; color:var(--text-secondary);\">正在加载游戏资源...</span></div>",
      "code": "# GDScript: 局部加载\nGLoading.show_in_container(my_panel, \"正在加载游戏资源...\")"
    },
    {
      "title": "2. 自定义文案与动画图标 (Custom Text & Icon)",
      "render": "<div style=\"display:flex; align-items:center; gap:10px; font-size:13px;\"><i class=\"fa-solid fa-gear fa-spin\" style=\"font-size:22px; color:var(--success);\"></i><span>物理引擎初始化中 (gear spin)...</span></div>",
      "code": "# GDScript: 自定义图标\nGLoading.show({ \"icon\": \"gear\", \"text\": \"物理引擎初始化中...\" })"
    },
    {
      "title": "3. 全屏加载蒙层 (Full Screen Loading)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('全屏加载遮罩启动 (2秒后自动解除)...', 'info')\">全屏整页 Loading</button>",
      "code": "# GDScript: 全屏加载\nGLoading.show_fullscreen(\"正在同步服务器数据...\")"
    },
    {
      "title": "4. 背景透明度与毛玻璃控制 (Background Blur)",
      "render": "<div style=\"max-width:320px; height:70px; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); border-radius:8px; display:flex; align-items:center; justify-content:center; gap:8px; color:#fff; font-size:13px;\"><i class=\"fa-solid fa-rotate fa-spin\" style=\"color:#ffd04b;\"></i><span>高斯模糊毛玻璃加载</span></div>",
      "code": "# GDScript: 毛玻璃加载\nloading.background_blur = true"
    },
    {
      "title": "5. 游戏跨场景切换加载环 (Scene Switch Loading)",
      "render": "<div style=\"display:flex; align-items:center; gap:12px;\"><div style=\"width:36px; height:36px; border-radius:50%; border:3px solid var(--border-base); border-top-color:#a855f7; animation:fa-spin 1s infinite linear;\"></div><span style=\"font-size:12px; color:#a855f7; font-weight:600;\">正在进入副本：【堕落神殿】</span></div>",
      "code": "# GDScript: 场景切换加载\nGLoading.new_scene_loader(\"堕落神殿\")"
    }
  ],
  "props": [
    {
      "name": "text",
      "type": "String",
      "default": "\"Loading...\"",
      "desc": "加载提示文字"
    },
    {
      "name": "spinner_size",
      "type": "float",
      "default": "36.0",
      "desc": "旋转圈尺寸 (像素)"
    },
    {
      "name": "fullscreen",
      "type": "boolean",
      "default": "false",
      "desc": "是否覆盖全屏遮罩加载"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "show()",
      "desc": "显示加载指示器",
      "params": "() -> void"
    },
    {
      "name": "hide()",
      "desc": "隐藏加载指示器",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "被加载遮罩包裹的主体业务节点插槽",
      "child": "Control",
      "example": "<template #default><div class=\"game-data-table\">...</div></template>"
    },
    {
      "name": "spinner",
      "desc": "自定义 Loading 旋转图标或序列帧动画插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #spinner><GIcon name=\"spinner\" class=\"fa-spin\" /></template>"
    },
    {
      "name": "description",
      "desc": "加载提示文本插槽",
      "child": "Label / GText",
      "example": "<template #description>正在连接游戏服务器，请稍候...</template>"
    }
  ]
};
