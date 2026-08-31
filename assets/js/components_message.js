// =========================================================================
// Gotod Components UI - Component: message
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['message'] = {
  "title": "Message 全局提示 (GMessage)",
  "desc": "全局悬浮吐司提示（Autoload 单例），在页面顶部居中堆叠展示，支持自动倒计时移除与进入/淡出动效。",
  "demos": [
    {
      "title": "1. 基础主要提示 (Basic Info Message)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast({ message: '这是一条基础顶部消息提示', type: 'info' })\"><i class=\"fa-solid fa-circle-info\"></i> 弹出顶部提示 (Info)</button>",
      "code": "# GDScript: 字符串简写或配置对象调用\nGMessage.info(\"这是一条普通消息提示\")\n# 亦可使用配置字典：\nGMessage.show({ \"message\": \"这是一条普通消息提示\", \"type\": \"info\" })"
    },
    {
      "title": "2. 四大主题语义色 (4 Semantic Types)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-success\" style=\"font-size:12px;\" onclick=\"showToast({ message: '操作成功！数据已持久化', type: 'success' })\"><i class=\"fa-solid fa-circle-check\"></i> 成功 (Success)</button><button class=\"g-btn g-btn-warning\" style=\"font-size:12px;\" onclick=\"showToast({ message: '网络波动，可能存在延迟', type: 'warning' })\"><i class=\"fa-solid fa-triangle-exclamation\"></i> 警告 (Warning)</button><button class=\"g-btn g-btn-danger\" style=\"font-size:12px;\" onclick=\"showToast({ message: '连接超时，请检查网络', type: 'error' })\"><i class=\"fa-solid fa-circle-xmark\"></i> 错误 (Error)</button></div>",
      "code": "# GDScript: 语义化消息 (支持快捷方法与字典配置)\nGMessage.success(\"恭喜强化成功！\")\nGMessage.warning(\"背包空间不足\")\nGMessage.error(\"金币不足，无法购买\")\n\n# 字典形式：\nGMessage.show({ \"message\": \"恭喜强化成功！\", \"type\": \"success\", \"duration\": 3.0 })"
    },
    {
      "title": "3. 可手动关闭消息 (Closable Message - Object Config)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast({ message: '这是一条需要玩家手动关闭的重要提示', type: 'info', closable: true, duration: 0 })\"><i class=\"fa-solid fa-circle-info\"></i> 弹出可关闭消息 (对象配置)</button>",
      "code": "# GDScript: 对象配置可关闭消息 (closable = true, duration = 0 不自动关闭)\nGMessage.show({\n    \"message\": \"重要系统升级维护通知，请手动点击关闭\",\n    \"type\": \"info\",\n    \"closable\": true,\n    \"duration\": 0.0 # 0 表示永久展示直至用户点击关闭\n})"
    },
    {
      "title": "4. 自定义图标与停留时长 (Custom Icon & Duration Object)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" onclick=\"showToast({ message: '获得成就【初出茅庐】！', type: 'success', duration: 5, icon: '🏆' })\"><i class=\"fa-solid fa-trophy\"></i> 🏆 自定义成就消息</button><button class=\"g-btn g-btn-warning\" onclick=\"showToast({ message: '⚡ 暴击率临时提升 50% (持续 8 秒)', type: 'warning', duration: 4, icon: '⚡' })\">⚡ 属性增益消息</button></div>",
      "code": "# GDScript: 自定义图标与停留时长 (通过字典对象传入参数)\nGMessage.show({\n    \"message\": \"获得成就【初出茅庐】！\",\n    \"type\": \"success\",\n    \"duration\": 5.0,\n    \"closable\": true\n})"
    },
    {
      "title": "5. 一键清除所有消息 (Close All Active Messages)",
      "render": "<div style=\"display:flex; gap:10px;\"><button class=\"g-btn g-btn-primary\" onclick=\"showToast('消息 1'); setTimeout(()=>showToast('消息 2'), 200); setTimeout(()=>showToast('消息 3'), 400);\">批量弹出 3 条消息</button><button class=\"g-btn g-btn-danger\" onclick=\"GMessage.closeAll(); showToast('已清空全部消息', 'info');\">一键清空 (close_all)</button></div>",
      "code": "# GDScript: 一键关闭所有正在展示的消息\nGMessage.close_all()"
    }
  ],
  "props": [
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示右侧 clear/close 图标；开启后点击图标立即关闭当前消息",
      "version": "v1.0.6"
    },
    {
      "name": "duration",
      "type": "float",
      "default": "3.0",
      "desc": "消息自动关闭时间；设为 0 时不自动关闭，通常配合 closable 手动关闭",
      "version": "v1.0.6"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "success(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false)",
      "desc": "弹出成功提示",
      "params": "(content: String, context_node: Node, duration: float, closable: bool) -> void",
      "version": "v1.0.6"
    },
    {
      "name": "warning(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false)",
      "desc": "弹出警告提示",
      "params": "(content: String, context_node: Node, duration: float, closable: bool) -> void",
      "version": "v1.0.6"
    },
    {
      "name": "error(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false)",
      "desc": "弹出错误提示",
      "params": "(content: String, context_node: Node, duration: float, closable: bool) -> void",
      "version": "v1.0.6"
    },
    {
      "name": "info(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false)",
      "desc": "弹出普通信息提示",
      "params": "(content: String, context_node: Node, duration: float, closable: bool) -> void",
      "version": "v1.0.6"
    },
    {
      "name": "display(options: Dictionary, context_node: Node = null)",
      "desc": "通过字典配置弹出消息，支持 message/text、type、duration、closable",
      "params": "(options: Dictionary, context_node: Node) -> void",
      "version": "v1.0.6"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "全局轻量消息正文插槽",
      "child": "Label / RichTextLabel",
      "example": "<template #default><span>系统配置已成功保存！</span></template>",
      "version": "v1.0"
    },
    {
      "name": "icon",
      "desc": "自定义前置状态图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #icon><GIcon name=\"circle-check\" style=\"color:green;\" /></template>",
      "version": "v1.0"
    }
  ]
};
