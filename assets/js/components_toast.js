// =========================================================================
// Gotod Components UI - Component: toast
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['toast'] = {
  "title": "Toast 轻提示 (GToast)",
  "desc": "在页面中间或顶部/底部弹出轻量级半透明黑色反馈气泡，用于即时反馈、成功、失败、加载中与倒计时等场景。深度对标 Vant UI 轻提示规范，支持静态单例直接调用与流畅链式 API。",
  "demos": [
    {
      "title": "1. 文字轻提示 (Text Toast - 字符串或对象配置)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-primary\" onclick=\"openSimToast('操作已记录')\"><i class=\"fa-solid fa-comment-dots\"></i> GToast.text('操作已记录')</button><button class=\"g-btn g-btn-default\" onclick=\"openSimToast({ message: '这是通过对象配置传参的文字提示', duration: 2500 })\">对象配置调用 (service)</button></div>",
      "code": "# GDScript: 文字 Toast (支持字符串或字典对象)\nGToast.text(\"操作已记录\")\n# 或者使用配置字典服务：\nGToast.service({\n    \"message\": \"这是通过对象配置传参的文字提示\",\n    \"duration\": 2.5\n})"
    },
    {
      "title": "2. 加载提示 (Loading Toast - 对标 Vant UI showLoadingToast)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-warning\" onclick=\"openSimToast({ message: '加载中...', type: 'loading', forbidClick: true, duration: 2500 })\"><i class=\"fa-solid fa-spinner fa-spin\"></i> ⏳ GToast.loading() 居中加载</button><button class=\"g-btn g-btn-default\" onclick=\"openSimToast({ message: '下载地图资源中...', type: 'loading', forbidClick: false, duration: 3000 })\">无遮罩 Loading</button></div>",
      "code": "# GDScript: 加载提示 (深色半透明圆角卡片 + 纯白环形旋转动画)\n# forbid_click = true 启用透明遮罩防止背景误触\nGToast.loading(\"正在下载地图包...\", true)\n\n# 亦可使用字典完整配置：\nGToast.service({\n    \"message\": \"正在下载地图包...\",\n    \"type\": GToast.ToastType.LOADING,\n    \"forbid_click\": true,\n    \"duration\": 0.0 # 0 表示持续展示，由业务逻辑手动 GToast.clear()\n})"
    },
    {
      "title": "3. 成功与失败状态提示 (Success / Fail Toast)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-success\" onclick=\"openSimToast({ message: '强化成功！', type: 'success' })\"><i class=\"fa-solid fa-circle-check\"></i> 成功提示 (Success)</button><button class=\"g-btn g-btn-danger\" onclick=\"openSimToast({ message: '网络连接中断！', type: 'fail' })\"><i class=\"fa-solid fa-circle-xmark\"></i> 失败提示 (Fail)</button></div>",
      "code": "# GDScript: 状态提示\nGToast.success(\"强化成功！\")\nGToast.fail(\"网络连接失败\")\n\n# 字典形式：\nGToast.service({ \"message\": \"强化成功！\", \"type\": GToast.ToastType.SUCCESS })"
    },
    {
      "title": "4. 自定义图标与图案 (Custom Icon / Image)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" onclick=\"openSimToast({ message: '获得 SSR 神装！', icon: '👑', duration: 2500 })\">👑 皇冠图标</button><button class=\"g-btn g-btn-default\" onclick=\"openSimToast({ message: '体力恢复满格！', icon: '❤️', duration: 2500 })\">❤️ 爱心图标</button><button class=\"g-btn g-btn-default\" onclick=\"openSimToast({ message: '暴击伤害提升！', icon: '⚔️', duration: 2500 })\">⚔️ 武器图标</button></div>",
      "code": "# GDScript: 自定义图标 (通过 custom 或字典调用)\nGToast.custom({\n    \"message\": \"获得 SSR 神装！\",\n    \"icon_text\": \"👑\",\n    \"duration\": 2.5\n})"
    },
    {
      "title": "5. 自定义位置与时长 (Position: Top / Middle / Bottom)",
      "render": "<div style=\"display:flex; gap:8px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"openSimToast({ message: '顶部轻提示 (Top)', position: 'top', duration: 2000 })\"><i class=\"fa-solid fa-arrow-up\"></i> 顶部展示 (Top)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"openSimToast({ message: '居中轻提示 (Middle)', position: 'middle', duration: 2000 })\"><i class=\"fa-solid fa-arrows-to-dot\"></i> 居中展示 (Middle)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px;\" onclick=\"openSimToast({ message: '底部轻提示 (Bottom)', position: 'bottom', duration: 2000 })\"><i class=\"fa-solid fa-arrow-down\"></i> 底部展示 (Bottom)</button></div>",
      "code": "# GDScript: 指定位置与停留时长\nGToast.text(\"顶部提示\", 2.0, GToast.Position.TOP)\nGToast.text(\"居中提示\", 2.0, GToast.Position.MIDDLE)\nGToast.text(\"底部提示\", 2.0, GToast.Position.BOTTOM)"
    },
    {
      "title": "6. 动态更新文案与倒计时 (Dynamic Message Update & Clear)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"runSimToastCountdown()\"><i class=\"fa-solid fa-clock\"></i> 动态倒计时演示 (3秒)</button><button class=\"g-btn g-btn-danger\" onclick=\"closeSimToast(); showToast('已执行 GToast.clear()', 'info');\"><i class=\"fa-solid fa-ban\"></i> 手动关闭 (GToast.clear())</button></div>",
      "code": "# GDScript: 动态更新提示与倒计时\nvar toast = GToast.loading(\"倒计时 3 秒...\", true, 0.0)\n\n# 倒计时推进更新文案：\ntoast.set_message(\"倒计时 2 秒...\")\ntoast.set_message(\"倒计时 1 秒...\")\n\n# 任务完成后一键清除：\nGToast.clear()"
    }
  ],
  "props": [
    {
      "name": "type",
      "type": "enum",
      "default": "TEXT",
      "desc": "提示类型：TEXT (纯文字), INFO (信息), WARNING (警告), SUCCESS (成功), FAIL (失败), LOADING (加载转圈), CUSTOM (自定义)",
      "version": "v1.0"
    },
    {
      "name": "message",
      "type": "String",
      "default": "\"\"",
      "desc": "提示文本内容",
      "version": "v1.0"
    },
    {
      "name": "position",
      "type": "enum",
      "default": "MIDDLE",
      "desc": "提示显示位置：TOP, MIDDLE, BOTTOM",
      "version": "v1.0"
    },
    {
      "name": "duration",
      "type": "float",
      "default": "2.0",
      "desc": "展示时长 (秒)，设置为 0 时不自动关闭",
      "version": "v1.0"
    },
    {
      "name": "forbid_click",
      "type": "boolean",
      "default": "false",
      "desc": "是否启用透明遮罩禁止背景点击穿透",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "service(options: Variant, duration=2.0, position=MIDDLE) -> GToast",
      "desc": "静态命令式启动 Toast 轻提示服务 (支持 String 或 Dictionary 选项对象)",
      "params": "(options: Variant, duration: float, position: int) -> GToast",
      "version": "v1.0.6"
    },
    {
      "name": "open(options: Variant, duration=2.0, position=MIDDLE) -> GToast",
      "desc": "启动 Toast 轻提示的快捷别名",
      "params": "(options: Variant, duration: float, position: int) -> GToast",
      "version": "v1.0.6"
    },
    {
      "name": "text(message: String, duration=2.0, position=MIDDLE) -> GToast",
      "desc": "弹出纯文字轻提示",
      "params": "(message: String, duration: float, position: int) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "success(message: String, duration=2.0) -> GToast",
      "desc": "弹出成功状态提示 (带对勾图标)",
      "params": "(message: String, duration: float) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "fail(message: String, duration=2.0) -> GToast",
      "desc": "弹出失败状态提示 (带叉号图标)",
      "params": "(message: String, duration: float) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "loading(message=\"加载中...\", forbid_click=true, duration=0.0) -> GToast",
      "desc": "弹出加载中转圈提示 (带防点击穿透遮罩)",
      "params": "(message: String, forbid_click: bool, duration: float) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "custom(options: Dictionary) -> GToast",
      "desc": "使用完整配置字典弹出自定义图标/图案轻提示",
      "params": "(options: Dictionary) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "set_message(new_msg: String) -> GToast",
      "desc": "动态更新当前正在展示的轻提示文本 (如倒计时)",
      "params": "(new_msg: String) -> GToast",
      "version": "v1.0"
    },
    {
      "name": "clear() -> void",
      "desc": "一键清除并关闭当前所有正在展示的轻提示",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "Toast 提示正文内容插槽",
      "child": "Label / RichTextLabel",
      "example": "<template #default><span>获得成就：初出茅庐 🎖️</span></template>",
      "version": "v1.0"
    },
    {
      "name": "icon",
      "desc": "自定义 Toast 图标或 Loading 动画插槽",
      "child": "GIcon / TextureRect / GLoading",
      "example": "<template #icon><GIcon name=\"medal\" /></template>",
      "version": "v1.0"
    }
  ]
};
