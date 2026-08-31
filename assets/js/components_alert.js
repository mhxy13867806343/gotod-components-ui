// =========================================================================
// Gotod Components UI - Component: alert
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['alert'] = {
  "title": "Alert 警告提示 (GAlert)",
  "desc": "用于页面中展示重要的提示信息。支持成功、警告、危险与信息4种状态色彩，支持关闭按钮。",
  "demos": [
    {
      "title": "1. 基础主题语义色 (4 Semantic Types)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:10px; max-width:440px;\"><div class=\"g-alert g-alert-success\" style=\"background:rgba(103,194,58,0.1); border:1px solid rgba(103,194,58,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--success);\"><i class=\"fa-solid fa-circle-check\"></i> 成功：当前关卡存档已成功同步至云端！</div><div class=\"g-alert g-alert-warning\" style=\"background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--warning);\"><i class=\"fa-solid fa-triangle-exclamation\"></i> 警告：当前角色处于红名通缉状态，死亡将掉落装备。</div><div class=\"g-alert g-alert-danger\" style=\"background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:8px 12px; font-size:12px; color:var(--danger);\"><i class=\"fa-solid fa-circle-xmark\"></i> 危险：网络连接已断开，正在尝试重连...</div></div>",
      "code": "# GDScript: 基础警告条\nvar alert_s = GAlert.new(\"存档已同步\", GotodTheme.Type.SUCCESS)\nadd_child(alert_s)"
    },
    {
      "title": "2. 带有辅助性描述文字 (Alert with Description)",
      "render": "<div style=\"max-width:440px; background:rgba(64,158,255,0.08); border:1px solid rgba(64,158,255,0.3); border-radius:6px; padding:10px 14px;\"><div style=\"font-weight:700; color:var(--primary); font-size:13px; margin-bottom:4px;\"><i class=\"fa-solid fa-circle-info\"></i> 版本更新内容说明</div><div style=\"font-size:12px; color:var(--text-secondary); line-height:1.5;\">本次更新重构了 26,000+ 矢量图标库，大幅提升了在 4K 游戏高分屏下的渲染锐度与加载速度。</div></div>",
      "code": "# GDScript: 带描述警告\nalert.title = \"版本更新内容说明\"\nalert.description = \"本次更新重构了 26,000+ 矢量图标库...\""
    },
    {
      "title": "3. 自定义关闭按钮与回调 (Closable Alert)",
      "render": "<div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;\"><span>💡 提示：按键盘 ESC 键可随时呼出主菜单。</span><span style=\"color:var(--primary); cursor:pointer; font-weight:600;\" onclick=\"this.parentElement.remove()\">知道了</span></div>",
      "code": "# GDScript: 自定义关闭\nalert.close_text = \"知道了\""
    },
    {
      "title": "4. 居中对齐排版 (Center Alignment)",
      "render": "<div style=\"max-width:440px; background:rgba(230,162,60,0.1); border:1px solid rgba(230,162,60,0.3); border-radius:4px; padding:8px 12px; text-align:center; font-size:12px; color:var(--warning);\"><i class=\"fa-solid fa-shield-halved\"></i> 安全提示：请勿向任何人透露您的游戏账号密码</div>",
      "code": "# GDScript: 居中对齐\nalert.center = true"
    },
    {
      "title": "5. 游戏系统维护与封禁警告 (Game Maintenance Warning)",
      "render": "<div style=\"max-width:440px; background:linear-gradient(90deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05)); border-left:4px solid #ef4444; padding:10px 14px; border-radius:0 6px 6px 0;\"><div style=\"font-weight:700; color:#ef4444; font-size:13px;\">🚨 账号安全异常警告</div><div style=\"font-size:11px; color:var(--text-secondary); margin-top:2px;\">检测到异地 IP 登录，已临时限制金币交易功能。</div></div>",
      "code": "# GDScript: 游戏警告\nvar ban_alert = GAlert.new_game_warning(\"账号安全异常\", \"检测到异地登录\")"
    }
  ],
  "props": [
    {
      "name": "type",
      "type": "enum",
      "default": "INFO",
      "desc": "类型：INFO, SUCCESS, WARNING, DANGER",
      "version": "v1.0"
    },
    {
      "name": "title",
      "type": "String",
      "default": "\"Alert Title\"",
      "desc": "标题文本",
      "version": "v1.0"
    },
    {
      "name": "description",
      "type": "String",
      "default": "\"\"",
      "desc": "辅助描述详细说明",
      "version": "v1.0"
    },
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示关闭按钮",
      "version": "v1.0"
    },
    {
      "name": "center",
      "type": "boolean",
      "default": "false",
      "desc": "文字是否居中",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "closed()",
      "desc": "点击关闭按钮时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "close()",
      "desc": "关闭并移除该 Alert",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "提示内容正文插槽",
      "child": "Label / RichTextLabel",
      "example": "<template #default><span>核心渲染节点已就绪，耗时 12ms。</span></template>",
      "version": "v1.0"
    },
    {
      "name": "title",
      "desc": "提示标题插槽",
      "child": "GText / Label",
      "example": "<template #title><b>初始化成功</b></template>",
      "version": "v1.0"
    },
    {
      "name": "icon",
      "desc": "自定义前置状态图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #icon><GIcon name=\"circle-info\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "close",
      "desc": "自定义右上角关闭按钮插槽",
      "child": "GButton / GIcon",
      "example": "<template #close><GIcon name=\"xmark\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "action",
      "desc": "提示右侧/底部快捷操作项插槽",
      "child": "GButton / HBoxContainer",
      "example": "<template #action><GButton size=\"small\">查看详情</GButton></template>",
      "version": "v1.0"
    }
  ]
};
