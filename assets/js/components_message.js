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
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('这是一条基础顶部消息提示', 'info')\">弹出顶部提示 (Info)</button>",
      "code": "# GDScript: 全局提示\nGMessage.info(\"这是一条普通消息提示\")"
    },
    {
      "title": "2. 四大主题语义色 (4 Semantic Types)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-success\" style=\"font-size:12px;\" onclick=\"showToast('操作成功！数据已持久化', 'success')\">成功 (Success)</button><button class=\"g-btn g-btn-warning\" style=\"font-size:12px;\" onclick=\"showToast('网络波动，可能存在延迟', 'warning')\">警告 (Warning)</button><button class=\"g-btn g-btn-danger\" style=\"font-size:12px;\" onclick=\"showToast('连接超时，请检查网络', 'error')\">错误 (Error)</button></div>",
      "code": "# GDScript: 语义化消息\nGMessage.success(\"恭喜强化成功！\")\nGMessage.warning(\"背包空间不足\")\nGMessage.error(\"金币不足，无法购买\")"
    },
    {
      "title": "3. 可手动关闭消息 (Closable Message)",
      "render": "<div style=\"background:rgba(64,158,255,0.1); border:1px solid rgba(64,158,255,0.3); border-radius:6px; padding:8px 14px; display:inline-flex; align-items:center; gap:10px; font-size:13px; color:var(--primary);\"><span>这是一条需要玩家手动关闭的重要提示</span><i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.remove()\"></i></div>",
      "code": "# GDScript: 可关闭消息\nGMessage.show({ \"text\": \"重要系统消息\", \"closable\": true, \"duration\": 0 })"
    },
    {
      "title": "4. 自定义图标与停留时长 (Custom Icon & Duration)",
      "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('⭐ 获得成就【初出茅庐】！', 'success')\">🏆 弹出自定义成就消息</button>",
      "code": "# GDScript: 自定义成就消息\nGMessage.show({ \"text\": \"获得成就【初出茅庐】！\", \"icon\": \"trophy\", \"duration\": 5.0 })"
    },
    {
      "title": "5. 游戏战斗连击与金币拾取消息 (Game Combo & Coin Popup)",
      "render": "<div style=\"display:flex; gap:12px;\"><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('🪙 拾取金币 +500！', 'success')\">🪙 拾取金币</button><button class=\"g-btn g-btn-danger\" style=\"font-weight:700;\" onclick=\"showToast('🔥 100 连击 (COMBO x100)!', 'error')\">💥 100 连击</button></div>",
      "code": "# GDScript: 战斗金币消息\nGMessage.new_game_loot(\"🪙 获得金币 +500\")"
    }
  ],
  "props": [],
  "events": [],
  "methods": [
    {
      "name": "success(content: String, duration: float = 3.0)",
      "desc": "弹出成功提示",
      "params": "(content: String, duration: float) -> void",
      "version": "v1.0"
    },
    {
      "name": "warning(content: String, duration: float = 3.0)",
      "desc": "弹出警告提示",
      "params": "(content: String, duration: float) -> void",
      "version": "v1.0"
    },
    {
      "name": "error(content: String, duration: float = 3.0)",
      "desc": "弹出错误提示",
      "params": "(content: String, duration: float) -> void",
      "version": "v1.0"
    },
    {
      "name": "info(content: String, duration: float = 3.0)",
      "desc": "弹出普通信息提示",
      "params": "(content: String, duration: float) -> void",
      "version": "v1.0"
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
