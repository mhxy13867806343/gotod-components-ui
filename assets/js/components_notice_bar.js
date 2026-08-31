// =========================================================================
// Gotod Components UI - Component: notice-bar
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['notice-bar'] = {
  "title": "NoticeBar 通知栏 (GNoticeBar)",
  "desc": "在页面顶部展示通告栏，用于向用户广播消息或系统维护通知。深度对标 Vant UI 通知栏规范，支持平滑滚动跑马灯、警示/信息/成功色彩与关闭按钮。",
  "demos": [
    {
      "title": "1. 基础跑马灯滚动 (Basic Scrolling NoticeBar)",
      "render": "<div class=\"g-notice-bar\" style=\"background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; display:flex; align-items:center; gap:8px; font-size:12px; color:#e6a23c; overflow:hidden;\"><i class=\"fa-solid fa-volume-high\"></i><div style=\"white-space:nowrap; overflow:hidden; text-overflow:ellipsis;\">【全服广播】恭喜玩家【龙之誓约】抽中不朽神话武器【圣辉破晓之剑】！</div></div>",
      "code": "# GDScript: 基础跑马灯\nvar notice = GNoticeBar.new(\"【全服广播】恭喜玩家抽中神话装备！\")\nnotice.scrollable = true\nadd_child(notice)"
    },
    {
      "title": "2. 滚动速度控制 (Scroll Speed)",
      "render": "<div class=\"g-notice-bar\" style=\"background:rgba(64,158,255,0.1); border:1px solid rgba(64,158,255,0.3); border-radius:4px; padding:8px 12px; display:flex; align-items:center; gap:8px; font-size:12px; color:var(--primary);\"><i class=\"fa-solid fa-bell\"></i><span>极速滚动模式 (Speed: 80px/s)</span></div>",
      "code": "# GDScript: 滚动速度\nnotice.speed = 80.0"
    },
    {
      "title": "3. 可关闭模式 (Closeable Mode)",
      "render": "<div class=\"g-notice-bar\" style=\"background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--danger);\"><div style=\"display:flex; align-items:center; gap:8px;\"><i class=\"fa-solid fa-triangle-exclamation\"></i><span>服务器将于今晚 24:00 进行停服热更维护。</span></div><i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.style.display='none'; showToast('通告已关闭', 'info')\"></i></div>",
      "code": "# GDScript: 可关闭\nnotice.mode = GNoticeBar.Mode.CLOSEABLE"
    },
    {
      "title": "4. 垂直多条通告轮播 (Vertical Multi-Notice Swiper)",
      "render": "<div style=\"max-width:380px; height:32px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:4px; padding:0 12px; display:flex; align-items:center; font-size:12px; overflow:hidden;\"><i class=\"fa-solid fa-bullhorn\" style=\"color:var(--warning); margin-right:8px;\"></i><span>1. 跨服公会战报名现已火热开启！</span></div>",
      "code": "# GDScript: 垂直轮播\nnotice.direction = GNoticeBar.Direction.VERTICAL"
    },
    {
      "title": "5. 游戏全服大喇叭广播 (Game World Speaker Notice)",
      "render": "<div style=\"background:linear-gradient(90deg, #1e1b4b, #312e81); border:1px solid #ffd04b; border-radius:6px; padding:8px 14px; display:flex; align-items:center; gap:10px; color:#ffd04b; font-size:13px; font-weight:700;\"><span style=\"color:#fff; font-weight:400; font-size:12px;\">📢【剑心】: 100 级地狱副本缺强力奶妈，速来上车！(4/5)</span></div>",
      "code": "# GDScript: 游戏大喇叭\nvar speaker = GNoticeBar.new_world_speaker(\"剑心\", \"100 级地狱副本缺奶妈！\")"
    }
  ],
  "props": [
    {
      "name": "text",
      "type": "String",
      "default": "\"\"",
      "desc": "通告栏文本内容",
      "version": "v1.0"
    },
    {
      "name": "scrollable",
      "type": "boolean",
      "default": "true",
      "desc": "是否开启水平无缝循环滚动跑马灯",
      "version": "v1.2"
    },
    {
      "name": "scroll_speed",
      "type": "float",
      "default": "50.0",
      "desc": "滚动速度 (像素/秒)",
      "version": "v1.2"
    },
    {
      "name": "notice_type",
      "type": "enum",
      "default": "WARNING",
      "desc": "通知色彩风格：WARNING (警示橙), INFO (信息蓝), SUCCESS (成功绿), DANGER (紧急红)",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "click()",
      "desc": "点击通告栏主体时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "点击右侧关闭图标时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [],
  "slots": [
    {
      "name": "default",
      "desc": "滚动播报文本主体插槽",
      "child": "Label / RichTextLabel",
      "example": "<template #default><span>🔥 [重要通告] 全服限时掉落双倍神话强化石！</span></template>",
      "version": "v1.0"
    },
    {
      "name": "left-icon",
      "desc": "左侧通知喇叭图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #left-icon><GIcon name=\"bullhorn\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "right-icon",
      "desc": "右侧更多/关闭操作区插槽",
      "child": "GIcon / GButton",
      "example": "<template #right-icon><GIcon name=\"chevron-right\" /></template>",
      "version": "v1.0"
    }
  ]
};
