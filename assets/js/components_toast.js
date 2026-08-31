// =========================================================================
// Gotod Components UI - Component: toast
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['toast'] = {
  "title": "Toast 轻提示 (GToast)",
  "desc": "在页面中间或顶部/底部弹出轻量级半透明黑色反馈气泡，用于即时反馈、成功、失败、加载中与倒计时等场景。深度对标 Vant UI 轻提示规范，支持静态单例直接调用与流畅链式 API。",
  "demos": [
    {
      "title": "1. 文字轻提示 (Text Toast)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('这是一条居中轻提示文字', 'info')\">弹出文字 Toast</button>",
      "code": "# GDScript: 文字 Toast\nGToast.show(\"操作已记录\")"
    },
    {
      "title": "2. 成功与失败图标提示 (Success / Fail Toast)",
      "render": "<div style=\"display:flex; gap:10px;\"><button class=\"g-btn g-btn-success\" onclick=\"showToast('强化成功！', 'success')\">成功提示</button><button class=\"g-btn g-btn-danger\" onclick=\"showToast('网络连接中断！', 'error')\">失败提示</button></div>",
      "code": "# GDScript: 成功/失败\nGToast.success(\"强化成功！\")\nGToast.fail(\"网络连接失败\")"
    },
    {
      "title": "3. 加载中 Loading 提示 (Loading Toast)",
      "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('数据同步中 (Loading)...', 'info')\">⏳ Loading 提示</button>",
      "code": "# GDScript: 加载提示\nGToast.loading(\"正在下载地图包...\")"
    },
    {
      "title": "4. 自定义位置与时长 (Position: Top / Middle / Bottom)",
      "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">顶部</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">居中</button><button class=\"g-btn g-btn-default\" style=\"font-size:11px;\">底部</button></div>",
      "code": "# GDScript: 位置与时长\nGToast.show(\"底部提示\", GToast.Position.BOTTOM, 2.0)"
    },
    {
      "title": "5. 游戏保存存档与联网重试 Toast (Game Save & Retry Toast)",
      "render": "<button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('💾 游戏存档已写入 Slot 1', 'success')\">💾 游戏自动存档</button>",
      "code": "# GDScript: 游戏存档 Toast\nGToast.new_game_saved(1)"
    }
  ],
  "props": [
    {
      "name": "type",
      "type": "enum",
      "default": "TEXT",
      "desc": "提示类型：TEXT (纯文字), INFO (信息), WARNING (警告), SUCCESS (成功), FAIL (失败), LOADING (加载转圈), CUSTOM (自定义)"
    },
    {
      "name": "message",
      "type": "String",
      "default": "\"\"",
      "desc": "提示文本内容"
    },
    {
      "name": "position",
      "type": "enum",
      "default": "MIDDLE",
      "desc": "提示显示位置：TOP, MIDDLE, BOTTOM"
    },
    {
      "name": "duration",
      "type": "float",
      "default": "2.0",
      "desc": "展示时长 (秒)，设置为 0 时不自动关闭"
    },
    {
      "name": "forbid_click",
      "type": "boolean",
      "default": "false",
      "desc": "是否启用透明遮罩禁止背景点击穿透"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "show(message, duration=2.0, position=MIDDLE)",
      "desc": "弹出文字提示",
      "params": "(message: String, duration: float, position: int) -> GToast"
    },
    {
      "name": "success(message, duration=2.0)",
      "desc": "弹出成功状态提示 (带对勾图标)",
      "params": "(message: String, duration: float) -> GToast"
    },
    {
      "name": "fail(message, duration=2.0)",
      "desc": "弹出失败状态提示 (带叉号图标)",
      "params": "(message: String, duration: float) -> GToast"
    },
    {
      "name": "loading(message=\"加载中...\", forbid_click=true, duration=0.0)",
      "desc": "弹出加载中转圈提示",
      "params": "(message: String, forbid_click: bool, duration: float) -> GToast"
    },
    {
      "name": "custom(options: Dictionary)",
      "desc": "使用完整配置字典弹出轻提示",
      "params": "(options: Dictionary) -> GToast"
    },
    {
      "name": "set_message(new_msg: String)",
      "desc": "动态更新当前正在展示的轻提示文本 (如倒计时)",
      "params": "(new_msg: String) -> GToast"
    },
    {
      "name": "clear()",
      "desc": "一键清除并关闭当前所有正在展示的轻提示",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "Toast 提示正文内容插槽",
      "child": "Label / RichTextLabel",
      "example": "<template #default><span>获得成就：初出茅庐 🎖️</span></template>"
    },
    {
      "name": "icon",
      "desc": "自定义 Toast 图标或 Loading 动画插槽",
      "child": "GIcon / TextureRect / GLoading",
      "example": "<template #icon><GIcon name=\"medal\" /></template>"
    }
  ]
};
