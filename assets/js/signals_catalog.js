// =========================================================================
// Gotod Components UI - 7. 自定义信号与事件总线 (Signals & Events)
// assets/js/signals_catalog.js
// 深度支持：1. 跨页面/跨场景全局通信 (Cross-Page)  2. 同页面组件局部通信 (Same-Page)
// =========================================================================

// Cross-Page Simulated State
window.crossPageSimState = {
  playerHp: 450,
  maxHp: 1000,
  gold: 2400
};

window.triggerCrossPageHeal = function() {
  const healAmount = 250;
  window.crossPageSimState.playerHp = Math.min(window.crossPageSimState.maxHp, window.crossPageSimState.playerHp + healAmount);
  window.crossPageSimState.gold = Math.max(0, window.crossPageSimState.gold - 50);

  const pct = ((window.crossPageSimState.playerHp / window.crossPageSimState.maxHp) * 100).toFixed(0);

  // Update Page B (HUD / Character Sheet) UI
  const hpBar = document.getElementById('simHudHpBar');
  const hpText = document.getElementById('simHudHpText');
  const goldText = document.getElementById('simHudGoldText');

  if (hpBar) hpBar.style.width = pct + '%';
  if (hpText) hpText.innerText = `${window.crossPageSimState.playerHp} / ${window.crossPageSimState.maxHp} (${pct}%)`;
  if (goldText) goldText.innerText = `${window.crossPageSimState.gold} G`;

  emitSimEvent('cross_page_heal_used', {
    source_scene: 'res://scenes/shop_or_bag.tscn',
    target_scene: 'res://scenes/character_hud.tscn',
    heal_amount: healAmount,
    current_hp: window.crossPageSimState.playerHp
  });

  showToast(`【跨页面事件】背包场景已触发加血，HUD场景血量恢复至 ${pct}%！`, 'success');
};

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
};

window.clearSimEventLogs = function() {
  window.simEventLogs = [];
  renderSimEventConsole();
  showToast('【GEventBus】事件日志监控台已清空', 'info');
};

window.renderSimEventConsole = function() {
  const container = document.getElementById('simEventBusConsole');
  if (!container) return;

  if (window.simEventLogs.length === 0) {
    container.innerHTML = `<div style="color: var(--text-disabled); font-style: italic;">[GEventBus 空闲] 暂无事件派发记录。点击上方按钮触发跨页面/同页面事件...</div>`;
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
  // 1. 跨页面与跨场景通信 (Cross-Page Global Event Bus)
  // --------------------------------------------------------
  'signal-event-bus': {
    title: '🌐 跨页面 / 跨场景全局通信 (Cross-Page & Cross-Scene Event Bus)',
    desc: '基于类 (Class-based RefCounted) 的全解耦通信。支持在不同场景文件（如背包页、战斗场景、设置页、HUD状态栏）之间实时广播信号与同步数据！',
    demos: [
      {
        title: '跨场景/跨页面实时联动演练 (Cross-Page Live Simulation)',
        render: `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; width:100%;">
            
            <!-- Left: Scene A (Shop / Bag Scene) -->
            <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:700; color:var(--warning);"><i class="fa-solid fa-bag-shopping"></i> 场景 A: 道具背包 / 快捷栏 (Bag.tscn)</span>
                <span class="g-tag g-tag-warning" style="font-size:10px;">发送端 Sender</span>
              </div>
              <p style="font-size:11px; color:var(--text-secondary); margin:0;">
                玩家在背包场景点击使用道具，派发跨页面全局事件：
              </p>
              <button class="g-btn g-btn-primary" style="width:100%; justify-content:center;" onclick="triggerCrossPageHeal()">
                <i class="fa-solid fa-flask-round-potion"></i> 派发: GEventBus.emit_global("use_hp_potion")
              </button>
            </div>

            <!-- Right: Scene B (Main HUD / Character Sheet) -->
            <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:700; color:var(--primary);"><i class="fa-solid fa-heart-pulse"></i> 场景 B: 主界面 HUD 监控 (MainHUD.tscn)</span>
                <span class="g-tag g-tag-primary" style="font-size:10px;">接收端 Listener</span>
              </div>
              
              <!-- HP Progress Bar in HUD -->
              <div>
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:600; margin-bottom:4px;">
                  <span>生命值 (HP):</span>
                  <span id="simHudHpText" style="color:var(--danger);">450 / 1000 (45%)</span>
                </div>
                <div style="height:12px; background:rgba(255,255,255,0.08); border-radius:6px; overflow:hidden;">
                  <div id="simHudHpBar" style="width:45%; height:100%; background:linear-gradient(90deg, #e06c75, #98c379); transition:width 0.4s ease;"></div>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
                <span>金币: <strong id="simHudGoldText" style="color:var(--warning);">2400 G</strong></span>
                <span>跨页面监听: 自动同步</span>
              </div>
            </div>

          </div>

          <!-- Console Logger -->
          <div style="margin-top:14px; padding:12px 14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
              <span style="font-size:12px; font-weight:700; color:var(--primary);">
                <i class="fa-solid fa-terminal"></i> 全局事件派发监控台 (GEventBus History)
              </span>
              <button class="g-btn g-btn-default" style="height:22px; padding:0 6px; font-size:10px;" onclick="clearSimEventLogs()">清空</button>
            </div>
            <div id="simEventBusConsole" style="max-height:130px; overflow-y:auto; line-height:1.5;">
              <div style="color: var(--text-disabled); font-style: italic;">[GEventBus 空闲] 暂无事件派发记录。点击上方使用道具按钮触发跨页面事件...</div>
            </div>
          </div>
        `,
        code: `# GDScript 跨页面 / 跨场景通信实战:

# 【场景 B: HUD 界面 (MainHUD.gd)】订阅跨页面全局事件:
func _ready() -> void:
    GEventBus.on_global("use_hp_potion", _on_potion_used)
    GEventBus.on_global("audio_volume_changed", _on_volume_changed)

func _on_potion_used(payload: Dictionary) -> void:
    print("HUD 捕获跨页面事件，恢复血量:", payload.heal_amount)
    hp_progress_bar.value = payload.current_hp
    GMessage.success("生命值恢复至 " + str(payload.current_hp), self)

# 【场景 A: 背包界面 (Inventory.gd)】派发跨页面全局事件:
func _on_use_item_pressed(item) -> void:
    player.hp += 250
    GEventBus.emit_global("use_hp_potion", {
        "heal_amount": 250,
        "current_hp": player.hp
    })`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. 同页面局部组件通信 (Same-Page Local Events)
  // --------------------------------------------------------
  'signal-custom-class': {
    title: '📄 同页面 / 单组件局部通信 (Same-Page Local Event Bus)',
    desc: '当只需在当前页面或父子子组件间传递事件时，使用实例级的 `var local_bus = GEventBus.new()`，隔离事件作用域，避免污染全局命名空间。',
    demos: [
      {
        title: '同页面局部父子组件通信演示 (Local Page Events)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:480px; padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
            <div style="font-size:12px; font-weight:700; color:var(--text-primary);">
              同页面表单局部事件总线 (Local Page Form):
            </div>
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="showToast('【同页面局部总线】子组件已通知父容器: on_field_change', 'info')">
                <i class="fa-solid fa-circle-dot"></i> 子组件派发 (emit_local)
              </button>
              <button class="g-btn g-btn-default" onclick="showToast('【同页面局部总线】已安全重置本页面所有监听', 'success')">
                <i class="fa-solid fa-rotate-left"></i> 清空局部监听 (clear_local)
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 同页面局部事件总线实例 (Local Page Communication)
extends Control

var local_bus: GEventBus = GEventBus.new() # 仅限当前页面的局部总线

func _ready() -> void:
    # 局部订阅，与其它页面完全隔离
    local_bus.on_local("on_form_validated", func(is_valid: bool):
        submit_btn.disabled = not is_valid
    )

func _on_child_input_changed() -> void:
    local_bus.emit_local("on_form_validated", check_all_inputs())`
      }
    ]
  }
};
