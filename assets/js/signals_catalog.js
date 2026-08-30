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
  // 0. GEvent (UniApp / Vue 风格 uni.$emit & uni.$on 页面通讯)
  // --------------------------------------------------------
  'signal-uni-emit': {
    title: '⚡ GEvent (UniApp 风格 uni.$emit / uni.$on 全局页面通讯)',
    desc: '完全还原 UniApp / Vue 的 `uni.$emit`、`uni.$on`、`uni.$once`、`uni.$off` 全局事件通讯机制。支持跨任意页面、跨场景、跨组件无缝传递复杂字典与数据，并深度融合 Godot 4 节点生命周期，传入 `self` 节点即可在页面销毁时自动注销监听，彻底杜绝内存泄漏与野指针崩溃！',
    demos: [
      {
        title: '跨页面 uni.$emit 与 uni.$on 实时联动演练 (Interactive Cross-Page Sandbox)',
        render: `
          <div style="display:grid; grid-template-columns:1.1fr 1fr; gap:16px; width:100%;">
            
            <!-- Left: Page A (Sender uni.$emit) -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:700; color:var(--primary);"><i class="fa-solid fa-paper-plane"></i> 页面 A: 发送端 (Page A / uni.$emit)</span>
                <span class="g-tag g-tag-primary" style="font-size:10px;">GEvent.emit</span>
              </div>
              <div style="font-size:11px; color:var(--text-secondary);">
                模拟在【用户资料修改页 / 战斗结算页】修改数据并广播给全游戏其他页面：
              </div>

              <!-- Form Inputs -->
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>
                  <label style="font-size:11px; font-weight:600;">玩家昵称 (nickname):</label>
                  <input type="text" id="simEmitNickname" class="g-input" value="龙骑士·伊瑟拉" style="width:100%; height:30px; margin-top:2px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <div>
                    <label style="font-size:11px; font-weight:600;">等级 (level):</label>
                    <input type="number" id="simEmitLevel" class="g-input" value="99" style="width:100%; height:30px; margin-top:2px;">
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:600;">金币 (gold):</label>
                    <input type="number" id="simEmitGold" class="g-input" value="88888" style="width:100%; height:30px; margin-top:2px;">
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button class="g-btn g-btn-primary" style="flex:1; height:32px; font-size:11px; justify-content:center;" onclick="
                  const nick = document.getElementById('simEmitNickname').value;
                  const lvl = document.getElementById('simEmitLevel').value;
                  const gold = document.getElementById('simEmitGold').value;
                  
                  const payload = {
                    nickname: nick,
                    level: parseInt(lvl) || 1,
                    gold: parseInt(gold) || 0,
                    update_time: new Date().toLocaleTimeString()
                  };

                  // Update Page B UI
                  const targetNick = document.getElementById('simListenerNick');
                  const targetLvl = document.getElementById('simListenerLvl');
                  const targetGold = document.getElementById('simListenerGold');
                  const isListening = window.simIsEventListenerActive !== false;

                  if (isListening) {
                    if (targetNick) targetNick.innerText = payload.nickname;
                    if (targetLvl) targetLvl.innerText = 'Lv.' + payload.level;
                    if (targetGold) targetGold.innerText = Number(payload.gold).toLocaleString('en-US') + ' G';
                    showToast('【uni.$emit】成功派发 update_user_info 事件，页面 B 已同步更新！', 'success');
                  } else {
                    showToast('【uni.$emit】事件已派发，但页面 B 已注销监听 (uni.$off)，未接收更新！', 'warning');
                  }

                  emitSimEvent('update_user_info', payload);
                ">
                  <i class="fa-solid fa-bullhorn"></i> GEvent.emit("update_user_info", data)
                </button>
              </div>
            </div>

            <!-- Right: Page B (Listener uni.$on / uni.$off) -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12px; font-weight:700; color:var(--success);"><i class="fa-solid fa-satellite-dish"></i> 页面 B: 接收端 (Page B / uni.$on)</span>
                  <span id="simListenerStatusTag" class="g-tag g-tag-success" style="font-size:10px;">监听中 Active</span>
                </div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
                  模拟【顶部导航栏 / HUD 头像栏】实时监听并刷新数据：
                </div>

                <!-- Page B UI Preview Card -->
                <div style="margin-top:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:12px; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span id="simListenerNick" style="font-size:13px; font-weight:800; color:var(--primary);">龙骑士·伊瑟拉</span>
                    <span id="simListenerLvl" class="g-tag g-tag-warning" style="font-size:10px;">Lv.99</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
                    <span>背包金币:</span>
                    <strong id="simListenerGold" style="color:#ffd04b;">88,888 G</strong>
                  </div>
                </div>
              </div>

              <!-- Unsubscribe Switch Controls -->
              <div style="display:flex; gap:8px;">
                <button class="g-btn g-btn-default" style="flex:1; height:30px; font-size:11px; justify-content:center;" onclick="
                  window.simIsEventListenerActive = true;
                  document.getElementById('simListenerStatusTag').className = 'g-tag g-tag-success';
                  document.getElementById('simListenerStatusTag').innerText = '监听中 Active';
                  showToast('【uni.$on】已注册监听 GEvent.on(\'update_user_info\', callback, self)', 'success');
                ">
                  <i class="fa-solid fa-link"></i> uni.$on 注册监听
                </button>
                <button class="g-btn g-btn-danger" style="flex:1; height:30px; font-size:11px; justify-content:center;" onclick="
                  window.simIsEventListenerActive = false;
                  document.getElementById('simListenerStatusTag').className = 'g-tag g-tag-danger';
                  document.getElementById('simListenerStatusTag').innerText = '已注销 Off';
                  showToast('【uni.$off】已注销监听 GEvent.off(\'update_user_info\')', 'info');
                ">
                  <i class="fa-solid fa-link-slash"></i> uni.$off 移除监听
                </button>
              </div>
            </div>

          </div>
        `,
        code: `# =========================================================================
# 方案 A: UniApp / Vue 风格全局跨页面通讯 (GEvent)
# =========================================================================

# ---------------------------------------------------------
# 1. 页面 A: 发送数据 (等同于 uni.$emit)
# ---------------------------------------------------------
# 在【资料设置页 / 商店购买后 / 战斗胜利后】派发全局事件
func _on_save_button_pressed() -> void:
    var user_data: Dictionary = {
        "nickname": "龙骑士·伊瑟拉",
        "level": 99,
        "gold": 88888,
        "vip_level": 5
    }
    
    # 一行代码广播给全游戏所有页面！
    GEvent.emit("update_user_info", user_data)
    GMessage.success("用户信息已保存并全局广播！")


# ---------------------------------------------------------
# 2. 页面 B: 接收数据 (等同于 uni.$on)
# ---------------------------------------------------------
# 在【顶部导航栏 / 角色主界面】的 _ready() 中注册监听
func _ready() -> void:
    # 传入 self：当该节点从场景树销毁 (_exit_tree) 时，GEvent 自动注销监听！
    # 彻底杜绝 uni-app 中因忘记 uni.$off 造成的内存泄漏与多次触发问题！
    GEvent.on("update_user_info", _on_user_info_updated, self)

func _on_user_info_updated(data: Dictionary) -> void:
    print("收到跨页面通知，最新昵称:", data.get("nickname"))
    $NicknameLabel.text = data.get("nickname", "")
    $GoldLabel.text = str(data.get("gold", 0))


# ---------------------------------------------------------
# 3. 页面 C: 单次监听 (等同于 uni.$once)
# ---------------------------------------------------------
func _ready() -> void:
    GEvent.once("first_recharge_success", func(data):
        print("恭喜完成首充！发放限定神装:", data)
        show_exclusive_reward_modal()
    , self)


# ---------------------------------------------------------
# 4. 手动移除监听 (等同于 uni.$off)
# ---------------------------------------------------------
func _on_leave_page() -> void:
    GEvent.off("update_user_info")`
      },
      {
        title: '2. 🌟 Godot 官网推荐标准方案 (Autoload 单例 + 原生 Typed Signals)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:14px; width:100%; max-width:640px;">
            
            <!-- Recommendation Alert Banner -->
            <div style="background:rgba(64,158,255,0.08); border-left:4px solid var(--primary); padding:12px; border-radius:4px; font-size:12px; line-height:1.6;">
              <div style="font-weight:700; color:var(--primary); margin-bottom:4px;">
                <i class="fa-solid fa-circle-check"></i> 【Godot 官方架构最佳实践 (Best Practice)】
              </div>
              <div style="color:var(--text-secondary);">
                Godot 官方文档强力推荐使用 <strong>Autoload 全局单例 + 强类型信号 (Typed Signals)</strong> 进行场景与页面通讯。具备 <strong>IDE 智能补全、编译期类型安全检查、C++ 底层零反射损耗、节点销毁自动断连</strong> 等绝对优势！
              </div>
            </div>

            <!-- Architecture Comparison Table -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; overflow:hidden;">
              <table style="width:100%; font-size:11px; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:rgba(255,255,255,0.03); border-bottom:1px solid var(--border-base);">
                    <th style="padding:8px 10px; color:var(--text-secondary);">特性对比</th>
                    <th style="padding:8px 10px; color:var(--primary);">🌟 官网推荐: Autoload + Signal</th>
                    <th style="padding:8px 10px; color:var(--warning);">⚡ UniApp 风格: GEvent</th>
                  </tr>
                </thead>
                <tbody style="color:#dcdcdc;">
                  <tr style="border-bottom:1px solid var(--border-base);">
                    <td style="padding:6px 10px; font-weight:600;">IDE 智能补全</td>
                    <td style="padding:6px 10px; color:#67c23a;">✅ 支持 (输入 EventBus. 直接提示所有信号)</td>
                    <td style="padding:6px 10px; color:var(--text-secondary);">字符串名称 (需手动保证拼写一致)</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-base);">
                    <td style="padding:6px 10px; font-weight:600;">编译期类型检查</td>
                    <td style="padding:6px 10px; color:#67c23a;">✅ 强类型参数校验 (传错类型编译器直接标红)</td>
                    <td style="padding:6px 10px; color:var(--text-secondary);">动态 Variant 类型</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-base);">
                    <td style="padding:6px 10px; font-weight:600;">内存泄漏与解绑</td>
                    <td style="padding:6px 10px; color:#67c23a;">✅ C++ 底层在 Node queue_free 时全自动断开</td>
                    <td style="padding:6px 10px; color:#67c23a;">✅ 传入 self 时自动注销</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 10px; font-weight:600;">适用开发场景</td>
                    <td style="padding:6px 10px; color:var(--primary); font-weight:700;">大型商业项目、团队协作规范开发 (强烈推荐)</td>
                    <td style="padding:6px 10px; color:var(--warning);">快速原型、热更新动态事件、Vue/Uni开发者习惯</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 3-Step Setup Guide -->
            <div style="display:flex; flex-direction:column; gap:6px; font-size:11px; color:var(--text-secondary);">
              <div style="font-weight:700; color:var(--text-primary);">🛠️ 官方标准 3 步落地流程：</div>
              <div>1. 新建 <code style="color:var(--primary);">res://scripts/event_bus.gd</code> 继承 Node，定义所有 signal。</div>
              <div>2. 在 Godot 顶部菜单 <strong>【项目 -> 项目设置 -> 自动加载 (Autoload)】</strong> 中添加该脚本，名称设为 <strong>EventBus</strong>。</div>
              <div>3. 发送端调用 <code style="color:#67c23a;">EventBus.gold_updated.emit(100)</code>，接收端调用 <code style="color:#67c23a;">EventBus.gold_updated.connect(...)</code>。</div>
            </div>

          </div>
        `,
        code: `# =========================================================================
# 方案 B: Godot 官网推荐标准架构 (Autoload 全局单例 + Typed Signal)
# 参考官方教程: https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/singletons_autoload.html
# =========================================================================

# -------------------------------------------------------------------------
# 步骤 1: 创建 EventBus.gd (配置在 Project Settings -> Autoload 中作为全局单例)
# -------------------------------------------------------------------------
# res://scripts/event_bus.gd
extends Node

# 声明强类型全局信号 (拥有 IDE 语法高亮、参数提示与类型安全检查)
signal user_info_updated(user_data: Dictionary)
signal player_hp_changed(current_hp: int, max_hp: int)
signal gold_updated(current_gold: int)
signal item_collected(item_name: String, count: int)
signal boss_defeated(boss_id: int, rewards: Array)


# -------------------------------------------------------------------------
# 步骤 2: 发送端页面 (如 Bag.tscn / Settlement.tscn)
# -------------------------------------------------------------------------
func _on_user_saved() -> void:
    var profile = { "nickname": "龙骑士", "level": 99, "gold": 88888 }
    
    # 🌟 官方标准语法: EventBus.信号名.emit(...)
    # IDE 会自动补全 user_info_updated 并提示 Dictionary 参数！
    EventBus.user_info_updated.emit(profile)
    EventBus.gold_updated.emit(profile.gold)


# -------------------------------------------------------------------------
# 步骤 3: 接收端页面 (如 MainHUD.tscn / TopNavBar.tscn)
# -------------------------------------------------------------------------
func _ready() -> void:
    # 🌟 官方标准语法: EventBus.信号名.connect(回调函数)
    EventBus.user_info_updated.connect(_on_user_info_updated)
    EventBus.gold_updated.connect(_on_gold_updated)

func _on_user_info_updated(user_data: Dictionary) -> void:
    $NicknameLabel.text = user_data.get("nickname", "")

func _on_gold_updated(current_gold: int) -> void:
    $GoldLabel.text = str(current_gold)

# 注意: 当监听节点被 queue_free() 释放时，Godot 底层 C++ 会自动断开该连接，
# 完全无需担心内存泄漏！`
      }
    ],
    methods: [
      {
        name: 'GEvent.emit(event_name, data?)',
        desc: '🌟 触发全局自定义事件（等同于 uni.$emit），向所有页面与组件监听者广播传递数据。',
        params: 'event_name: String, data: Variant = null -> int (返回成功响应的监听器数)'
      },
      {
        name: 'GEvent.on(event_name, callback, context_node?)',
        desc: '🌟 注册全局事件监听（等同于 uni.$on）。传入 context_node (self) 可在节点销毁时自动销毁监听，防止内存泄漏。',
        params: 'event_name: String, callback: Callable, context_node: Node = null -> void'
      },
      {
        name: 'GEvent.once(event_name, callback, context_node?)',
        desc: '🌟 注册单次事件监听（等同于 uni.$once），触发一次后自动从总线注销。',
        params: 'event_name: String, callback: Callable, context_node: Node = null -> void'
      },
      {
        name: 'GEvent.off(event_name?, callback?)',
        desc: '🌟 移除事件监听器（等同于 uni.$off）。不传参清空所有；传 event_name 移除该事件；传 callback 仅移除特定回调。',
        params: 'event_name: String = "", callback: Callable = Callable() -> void'
      },
      {
        name: 'GEvent.off_all_for_node(context_node)',
        desc: '主动注销指定 Node 节点绑定的所有事件监听器。',
        params: 'context_node: Node -> void'
      },
      {
        name: 'GEvent.has_listener(event_name)',
        desc: '检查当前事件是否存在有效监听者。',
        params: 'event_name: String -> bool'
      },
      {
        name: 'GEvent.get_listener_count(event_name)',
        desc: '获取指定事件当前的监听者数量。',
        params: 'event_name: String -> int'
      }
    ]
  },

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
