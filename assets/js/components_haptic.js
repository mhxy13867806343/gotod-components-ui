// =========================================================================
// Gotod Components UI - Component: haptic (GHaptic)
// 跨平台移动端触感震动与点击物理反馈引擎
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['haptic'] = {
  "title": "Haptic 触觉反馈引擎 (GHaptic)",
  "desc": "无缝对接 iOS Taptic Engine 与 Android 振动马达，提供多种轻快、刚性、柔和点击物理触感反馈。全面支持按钮点击、技能命中、抽卡出金、开箱及生命值告警等游戏高频场景。",
  "demos": [
    {
      "title": "1. 触感振动反馈类型测试 (Haptic Feedback Patterns)",
      "render": `
        <div style="max-width:540px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
            📱 点击下方按钮触发对应马达触感震动（支持手机浏览器与移动端真机）：
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-bottom:14px;">
            <button class="g-btn g-btn-default" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('light')">
              🪶 轻快 (Light)
            </button>
            <button class="g-btn g-btn-default" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('medium')">
              ⚡ 柔和 (Medium)
            </button>
            <button class="g-btn g-btn-default" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('heavy')">
              🔨 刚性 (Heavy)
            </button>
            <button class="g-btn g-btn-primary" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('success')">
              ✨ 成功 (Success)
            </button>
            <button class="g-btn g-btn-warning" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('warning')">
              ⚠️ 警告 (Warning)
            </button>
            <button class="g-btn g-btn-danger" style="font-size:12px; padding:8px 12px; justify-content:center;" onclick="window.triggerHaptic('error')">
              💥 错误 (Error)
            </button>
          </div>

          <div id="hapticFeedbackBox" style="background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); padding:10px 14px; font-size:12px; color:var(--text-regular); display:flex; justify-content:space-between; align-items:center;">
            <span>当前触觉状态：</span>
            <span id="hapticStatusText" style="font-weight:700; color:var(--primary);">等待触发</span>
          </div>
        </div>
      `,
      "code": "# GDScript: 触觉震动反馈\nGHaptic.impact(GHaptic.ImpactStyle.HEAVY) # 刚性重击\nGHaptic.notification(GHaptic.NotificationType.SUCCESS) # 抽卡出金/强化成功"
    }
  ],
  "props": [
    {
      "name": "enabled",
      "type": "boolean",
      "default": "true",
      "desc": "全局触感震动总开关（可通过设置面板由玩家关闭）",
      "version": "v1.4.0"
    },
    {
      "name": "intensity_multiplier",
      "type": "float",
      "default": "1.0",
      "desc": "振动强度全局缩放倍率 (0.0 ~ 2.0)",
      "version": "v1.4.0"
    }
  ],
  "events": [
    {
      "name": "haptic_triggered",
      "desc": "当设备成功触发一次物理触感震动时广播",
      "params": "(type: String, duration_ms: int)",
      "version": "v1.4.0"
    }
  ],
  "methods": [
    {
      "name": "impact(style: ImpactStyle)",
      "desc": "触发一次物理碰撞触感：LIGHT (轻), MEDIUM (中), HEAVY (重), RIGID (刚性), SOFT (柔和)",
      "params": "(style: ImpactStyle) -> void",
      "version": "v1.4.0"
    },
    {
      "name": "notification(type: NotificationType)",
      "desc": "触发通知型复合振动节奏：SUCCESS (出金/成功), WARNING (警告), ERROR (失败)",
      "params": "(type: NotificationType) -> void",
      "version": "v1.4.0"
    },
    {
      "name": "vibrate(duration_ms: int)",
      "desc": "底层自定义时长（毫秒）连续微振动",
      "params": "(duration_ms: int) -> void",
      "version": "v1.4.0"
    }
  ]
};
