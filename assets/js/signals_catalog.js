// =========================================================================
// Gotod Components UI - 7. 自定义信号与事件总线 (Signals & Events)
// assets/js/signals_catalog.js
// 基于类 (Class-based GEventBus & GCustomSignal) 的发布/订阅与强类型信号系统
// =========================================================================

// In-Memory Simulated Event Bus Logger for Live Web Demos
window.simEventLogs = [];

window.emitSimEvent = function(eventName, payload) {
  const timestamp = new Date().toLocaleTimeString();
  const logItem = {
    time: timestamp,
    event: eventName,
    payload: payload
  };
  window.simEventLogs.unshift(logItem);
  if (window.simEventLogs.length > 20) window.simEventLogs.pop();

  renderSimEventConsole();
  showToast(`【GEventBus】已派发事件: ${eventName}`, 'success');
};

window.clearSimEventLogs = function() {
  window.simEventLogs = [];
  renderSimEventConsole();
  showToast('【GEventBus】事件日志控制台已清空', 'info');
};

window.renderSimEventConsole = function() {
  const container = document.getElementById('simEventBusConsole');
  if (!container) return;

  if (window.simEventLogs.length === 0) {
    container.innerHTML = `<div style="color: var(--text-disabled); font-style: italic;">[GEventBus 空闲] 暂无事件派发记录。点击上方按钮触发事件...</div>`;
    return;
  }

  container.innerHTML = window.simEventLogs.map(log => `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-family:var(--font-mono); font-size:11px;">
      <div>
        <span style="color:var(--text-secondary);">[${log.time}]</span>
        <span style="color:var(--primary); font-weight:700; margin-left:6px;">${log.event}</span>
        <span style="color:#dcdcaa; margin-left:8px;">${JSON.stringify(log.payload)}</span>
      </div>
      <span class="g-tag g-tag-success" style="font-size:9px; padding:1px 4px;">Dispatched</span>
    </div>
  `).join('');
};

window.SIGNALS_CATALOG = {
  // --------------------------------------------------------
  // 1. GEventBus 类化全局事件总线
  // --------------------------------------------------------
  'signal-event-bus': {
    title: '⚡ GEventBus (类化全局事件总线 / PubSub 发布订阅)',
    desc: '基于纯 GDScript 静态类 (Class-based RefCounted) 实现的高性能发布/订阅事件总线。彻底解耦深层 UI、战斗系统与网络层，支持多参传递、一次性监听 (once) 与精准移除 (off)。',
    demos: [
      {
        title: '事件总线派发与监听演练 (Live Event Bus Console)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            <!-- Event Triggers -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="emitSimEvent('on_player_level_up', { 'level': 50, 'bonus_hp': 500, 'unlocked_skill': '龙之咆哮' })">
                <i class="fa-solid fa-arrow-up-right-dots"></i> 派发 on_player_level_up (角色升级)
              </button>
              <button class="g-btn g-btn-warning" onclick="emitSimEvent('on_item_equipped', { 'item_id': 'wpn_flame_sword', 'slot': 'MAIN_HAND', 'atk': 180 })">
                <i class="fa-solid fa-shield"></i> 派发 on_item_equipped (装备穿戴)
              </button>
              <button class="g-btn g-btn-danger" onclick="emitSimEvent('on_boss_killed', { 'boss_name': '深渊魔龙', 'drop_gold': 12000 })">
                <i class="fa-solid fa-skull"></i> 派发 on_boss_killed (首领击杀)
              </button>
              <button class="g-btn g-btn-default" onclick="clearSimEventLogs()">
                <i class="fa-solid fa-trash-can"></i> 清空日志
              </button>
            </div>

            <!-- Event Bus Live Console -->
            <div style="padding:12px 14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
                <span style="font-size:12px; font-weight:700; color:var(--primary);">
                  <i class="fa-solid fa-terminal"></i> GEventBus 实时事件监听监控台
                </span>
                <span style="font-size:10px; color:var(--text-secondary);">订阅者自动捕获</span>
              </div>
              <div id="simEventBusConsole" style="max-height:160px; overflow-y:auto; line-height:1.5;">
                <div style="color: var(--text-disabled); font-style: italic;">[GEventBus 空闲] 暂无事件派发记录。点击上方按钮触发事件...</div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 基于类 (Class-based) 的事件监听与派发
# 1. 在 UI 脚本中订阅事件
func _ready() -> void:
    GEventBus.on("on_player_level_up", _on_level_up)
    GEventBus.once("game_battle_start", func(): print("战场已开启！"))

func _on_level_up(data: Dictionary) -> void:
    print("收到升级事件，新等级:", data.get("level"))
    GMessage.success("恭喜升至 " + str(data["level"]) + " 级！", self)

func _exit_tree() -> void:
    # 场景销毁时注销监听
    GEventBus.off("on_player_level_up", _on_level_up)

# 2. 在业务逻辑或战斗系统中派发事件
func trigger_level_up() -> void:
    GEventBus.emit_event("on_player_level_up", {
        "level": 50,
        "bonus_hp": 500
    })`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. GCustomSignal 类化自定义信号
  // --------------------------------------------------------
  'signal-custom-class': {
    title: '📡 GCustomSignal (类化动态信号对象)',
    desc: '面向对象 (OOP) 风格的自定义信号定义与链式监听类，适合插件内部模块间的高内聚通信。',
    demos: [
      {
        title: '链式信号连接与发射 (Chained Signal Definition)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="showToast('【GCustomSignal】已触发 on_tab_close 信号并传递 tab_index: 2', 'success')">
                <i class="fa-solid fa-bolt"></i> 发射自定义信号 (emit)
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 通过类定义并管理动态信号
# 1. 定义信号对象
var on_tab_close = GCustomSignal.define("on_tab_close")

# 2. 链式订阅
func _ready() -> void:
    on_tab_close.connect_signal(func(tab_idx: int):
        print("选项卡已请求关闭:", tab_idx)
    )

# 3. 发射信号
func _on_close_button_pressed(idx: int) -> void:
    on_tab_close.emit(idx)`
      }
    ]
  }
};
