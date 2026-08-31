// =========================================================================
// Gotod Components UI - Component: chat
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['chat'] = {
  "title": "Chat 微信与气泡对话流 (GChat & Lifeline)",
  "desc": "提供类似微信 (WeChat)、QQ 以及文字冒险解密游戏《生命线 Lifeline》的对话气泡流组件。支持左右双向分色气泡、系统事件时间胶囊、自适应文本长度、打字中动效与底部即时发送工具栏。",
  "demos": [
    {
      "title": "1. 基础双向聊天流 (Basic Chat Stream)",
      "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; gap:8px;\"><div style=\"width:32px; height:32px; border-radius:50%; background:#8da5f5; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">团长</div><div style=\"background:var(--bg-card); padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px; border:1px solid var(--border-base);\">今晚 8 点公会战准时开打！</div></div><div style=\"display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--primary); color:#fff; padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px;\">收到！已强化 +15！</div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div></div>",
      "code": "# GDScript: 基础聊天\nvar chat = GChat.new()\nchat.add_message(\"今晚 8 点公会战准时开打！\", GChat.Sender.OTHER)\nchat.add_message(\"收到！已强化 +15！\", GChat.Sender.ME)"
    },
    {
      "title": "2. 语音消息条与播放时长 (Voice Audio Message)",
      "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; align-items:center;\"><div style=\"width:30px; height:30px; border-radius:50%; background:#67c23a; color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\">法师</div><div style=\"background:var(--bg-card); padding:6px 12px; border-radius:16px; font-size:12px; display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border-base); cursor:pointer;\" onclick=\"showToast('正在播放语音 (12秒)...', 'info')\"><i class=\"fa-solid fa-volume-high\" style=\"color:var(--primary);\"></i><span>12\"</span></div></div>",
      "code": "# GDScript: 语音条\nchat.add_voice_message(\"res://audio/voice_1.ogg\", 12.0)"
    },
    {
      "title": "3. 游戏装备道具分享卡片 (Item Share Card Message)",
      "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:10px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--bg-card); border:1px solid #ffd04b; padding:8px 12px; border-radius:8px; font-size:12px; cursor:pointer;\" onclick=\"showToast('查看分享的 SSR 武器详情', 'success')\"><div style=\"color:#ffd04b; font-weight:700;\">⚔️ [分享] 圣辉破晓之剑 (SSR)</div><div style=\"color:var(--text-secondary); font-size:11px;\">攻击力 +1,200 | 点击查看</div></div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div>",
      "code": "# GDScript: 道具分享卡片\nchat.add_item_card_message(item_data, GChat.Sender.ME)"
    },
    {
      "title": "4. 系统通知与时间戳 (System Notice & Timestamps)",
      "render": "<div style=\"text-align:center; font-size:11px; color:var(--text-secondary);\"><span style=\"background:var(--bg-surface); padding:2px 8px; border-radius:10px;\">昨天 19:45 · 队长邀请了【神谕者】加入队伍</span></div>",
      "code": "# GDScript: 系统提示\nchat.add_system_notice(\"队长邀请了【神谕者】加入队伍\")"
    },
    {
      "title": "5. 快捷表情与输入栏面板 (Emoji Picker & Input Bar)",
      "render": "<div style=\"max-width:380px; display:flex; gap:6px; align-items:center;\"><button class=\"g-btn g-btn-default\" style=\"padding:4px 8px;\" onclick=\"showToast('打开表情面板 😄🎉⚔️', 'info')\">😀</button><input type=\"text\" class=\"g-input\" placeholder=\"输入聊天内容...\" style=\"flex:1; font-size:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">发送</button></div>",
      "code": "# GDScript: 输入栏\nchat.enable_input_bar = true"
    }
  ],
  "props": [
    {
      "name": "self_bubble_color",
      "type": "Color",
      "default": "Color.hex(0x07c160)",
      "desc": "我方发送气泡底色 (默认微信绿)"
    },
    {
      "name": "other_bubble_color",
      "type": "Color",
      "default": "Color.hex(0x242426)",
      "desc": "对方接收气泡底色"
    },
    {
      "name": "auto_scroll",
      "type": "boolean",
      "default": "true",
      "desc": "新消息到达时是否自动平滑滚动到底部"
    }
  ],
  "events": [
    {
      "name": "message_sent(text: String)",
      "desc": "玩家在底部输入框输入并点击发送或回车时触发",
      "params": "(text: String)"
    }
  ],
  "methods": [
    {
      "name": "send_self_message(text, avatar=null)",
      "desc": "添加一条我方右侧气泡消息",
      "params": "(text: String, avatar: Texture2D) -> GChat"
    },
    {
      "name": "receive_message(text, sender=\"队友\", avatar=null)",
      "desc": "添加一条对方左侧气泡消息",
      "params": "(text: String, sender: String, avatar: Texture2D) -> GChat"
    },
    {
      "name": "add_system_notice(text)",
      "desc": "添加一条居中系统时间戳或事件胶囊",
      "params": "(text: String) -> GChat"
    },
    {
      "name": "clear()",
      "desc": "清空当前聊天记录列表",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "message",
      "desc": "单条消息气泡自定义渲染插槽（透传 { message_data, is_self }）",
      "child": "Control / HBoxContainer",
      "example": "<template #message=\"{ msg, is_self }\"><div :class=\"is_self ? 'my-msg' : 'peer-msg'\">{{ msg.text }}</div></template>"
    },
    {
      "name": "avatar",
      "desc": "发言玩家头像插槽（透传 { user_info }）",
      "child": "GAvatar",
      "example": "<template #avatar=\"{ user }\"><GAvatar :src=\"user.avatar_url\" /></template>"
    },
    {
      "name": "input",
      "desc": "底部自定义输入与表情选择工具栏插槽",
      "child": "GInput / GButton",
      "example": "<template #input><GInput placeholder=\"输入消息...\" /><GButton>发送</GButton></template>"
    }
  ]
};
