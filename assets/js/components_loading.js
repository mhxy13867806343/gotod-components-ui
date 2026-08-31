// =========================================================================
// Gotod Components UI - Component: loading
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['loading'] = {
  "title": "Loading 加载指示器 (GLoading)",
  "desc": "加载数据时显示动效，防止用户以为系统卡死。",
  "demos": [
    {
      "title": "1. 局部容器加载服务 (Container Loading Service)",
      "render": "<div style=\"max-width:320px; height:80px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;\"><i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:20px; color:var(--primary);\"></i><span style=\"font-size:12px; color:var(--text-secondary);\">正在加载游戏资源...</span></div>",
      "code": "# GDScript: 局部容器加载 (对标 ElLoading.service)\nvar loading = GLoading.in_container(my_panel, \"正在加载游戏资源...\")\n# 异步任务完成后：\nloading.close()"
    },
    {
      "title": "2. 自定义文案与图标对象配置 (Custom Text & Icon Object)",
      "render": "<div style=\"display:flex; align-items:center; gap:10px; font-size:13px;\"><i class=\"fa-solid fa-gear fa-spin\" style=\"font-size:22px; color:var(--success);\"></i><span>物理引擎初始化中 (gear spin)...</span></div>",
      "code": "# GDScript: 字典对象完整配置 (service / open)\nvar loading = GLoading.service({\n    \"icon\": \"gear\",\n    \"text\": \"物理引擎初始化中...\",\n    \"spinner_size\": 40.0\n})\n# 异步初始化完成后：\nloading.close()"
    },
    {
      "title": "3. 全屏加载蒙层服务 (Full Screen Loading Service - 支持字符串与对象)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-primary\" onclick=\"openSimLoading({ text: '正在同步服务器数据 (GLoading.fullscreen)...', duration: 2500 })\"><i class=\"fa-solid fa-spinner fa-spin\"></i> 全屏整页 Loading (对象配置)</button><button class=\"g-btn g-btn-default\" onclick=\"openSimLoading('正在解压资源地图包...')\">字符串简写调用</button></div>",
      "code": "# GDScript: 全屏整页加载蒙层 (支持字符串简写与字典对象)\n# 1. 字符串简写：\nvar loading = GLoading.fullscreen(\"正在同步服务器数据...\")\n\n# 2. 完整字典对象配置：\nvar loading = GLoading.fullscreen({\n    \"text\": \"正在同步服务器数据...\",\n    \"spinner_size\": 48.0,\n    \"background_blur\": true\n})\n# 任务完成后手动关闭：\nloading.close()"
    },
    {
      "title": "4. 背景透明度与毛玻璃控制 (Background Blur)",
      "render": "<div style=\"max-width:320px; height:70px; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); border-radius:8px; display:flex; align-items:center; justify-content:center; gap:8px; color:#fff; font-size:13px;\"><i class=\"fa-solid fa-rotate fa-spin\" style=\"color:#ffd04b;\"></i><span>高斯模糊毛玻璃加载</span></div>",
      "code": "# GDScript: 开启毛玻璃背景模糊\nvar loading = GLoading.service({\n    \"text\": \"高斯模糊毛玻璃加载\",\n    \"background_blur\": true\n})"
    },
    {
      "title": "5. 游戏跨场景切换加载与一键关闭 (Scene Switch Loading & Close All)",
      "render": "<div style=\"display:flex; align-items:center; gap:12px;\"><div style=\"width:36px; height:36px; border-radius:50%; border:3px solid var(--border-base); border-top-color:#a855f7; animation:fa-spin 1s infinite linear;\"></div><span style=\"font-size:12px; color:#a855f7; font-weight:600;\">正在进入副本：【堕落神殿】</span></div>",
      "code": "# GDScript: 场景切换加载与一键关闭\nGLoading.fullscreen(\"正在进入副本：【堕落神殿】\")\n# 场景加载完毕后全局清除：\nGLoading.close_all()"
    },
    {
      "title": "6. 背景点击与防误触控制 (close_on_click_overlay: false 默认锁定背景 / true 允许点击退出)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-primary\" onclick=\"openSimLoading({ text: '核心资产打包中...', close_on_click_overlay: false, duration: 4000 })\">默认防误触 (不可点背景关闭)</button><button class=\"g-btn g-btn-default\" onclick=\"openSimLoading({ text: '非关键数据同步 (可点背景取消)', close_on_click_overlay: true, duration: 6000 })\">允许点击背景手动关闭</button></div>",
      "code": "# GDScript: 背景点击防误触配置\n# 1. 默认防误触 (默认不可点击背景关闭，防止加载中打断任务)\nvar loading_safe = GLoading.service({\n    \"text\": \"核心数据写入中...\",\n    \"close_on_click_overlay\": false # 默认 false\n})\n\n# 2. 允许玩家点击背景手动取消/关闭\nvar loading_cancelable = GLoading.service({\n    \"text\": \"正在搜索附近房间...\",\n    \"close_on_click_overlay\": true\n})"
    },
    {
      "title": "7. 自定义加载遮罩背景颜色 (Custom Overlay / Mask Color)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-danger\" onclick=\"openSimLoading({ text: 'BOSS 狂暴蓄力中...', overlay_color: 'rgba(90, 0, 0, 0.85)', duration: 3000 })\">暗红危机加载</button><button class=\"g-btn g-btn-default\" onclick=\"openSimLoading({ text: '系统高斯亮色加载...', overlay_color: 'rgba(255, 255, 255, 0.75)', text_color: '#333', duration: 3000 })\">亮色遮罩加载</button></div>",
      "code": "# GDScript: 自定义遮罩背景色与主题\nvar loading = GLoading.service({\n    \"text\": \"BOSS 狂暴蓄力中...\",\n    \"mask_color\": Color(0.35, 0.0, 0.0, 0.85) # 自定义暗红危机蒙层\n})"
    }
  ],
  "props": [
    {
      "name": "text",
      "type": "String",
      "default": "\"Loading...\"",
      "desc": "加载提示文字",
      "version": "v1.0"
    },
    {
      "name": "spinner_size",
      "type": "float",
      "default": "36.0",
      "desc": "旋转圈尺寸 (像素)",
      "version": "v1.0"
    },
    {
      "name": "fullscreen",
      "type": "boolean",
      "default": "false",
      "desc": "是否覆盖全屏遮罩加载",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "service(options: Dictionary = {}, context_node: Node = null) -> GLoading",
      "desc": "静态命令式启动加载指示器服务 (对标 Element Plus ElLoading.service，支持 String 或 Dictionary 选项对象)",
      "params": "(options: Variant, context_node: Node) -> GLoading",
      "version": "v1.0.6"
    },
    {
      "name": "open(options: Dictionary = {}, context_node: Node = null) -> GLoading",
      "desc": "启动加载指示器的便捷别名方法",
      "params": "(options: Variant, context_node: Node) -> GLoading",
      "version": "v1.0.6"
    },
    {
      "name": "fullscreen(text: String, context_node: Node = null) -> GLoading",
      "desc": "以全屏覆盖遮罩模式启动 Loading 服务",
      "params": "(text: String, context_node: Node) -> GLoading",
      "version": "v1.0.6"
    },
    {
      "name": "in_container(target: Node, text: String) -> GLoading",
      "desc": "在指定局部容器或面板节点内部启动 Loading 遮罩",
      "params": "(target: Node, text: String) -> GLoading",
      "version": "v1.0.6"
    },
    {
      "name": "close() -> void",
      "desc": "关闭并销毁当前 Loading 实例",
      "params": "() -> void",
      "version": "v1.0.6"
    },
    {
      "name": "close_all() -> void",
      "desc": "一键清除并销毁全局所有正在展示的 Loading 遮罩",
      "params": "() -> void",
      "version": "v1.0.6"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "被加载遮罩包裹的主体业务节点插槽",
      "child": "Control",
      "example": "<template #default><div class=\"game-data-table\">...</div></template>",
      "version": "v1.0"
    },
    {
      "name": "spinner",
      "desc": "自定义 Loading 旋转图标或序列帧动画插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #spinner><GIcon name=\"spinner\" class=\"fa-spin\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "description",
      "desc": "加载提示文本插槽",
      "child": "Label / GText",
      "example": "<template #description>正在连接游戏服务器，请稍候...</template>",
      "version": "v1.0"
    }
  ]
};
