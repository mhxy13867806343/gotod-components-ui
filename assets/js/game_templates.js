// =========================================================================
// Gotod Components UI - Guide & Game UI Templates Catalog
// 1. 指南系统 (Guide & Installation)
// 3. 游戏实战案例 (Game UI Templates using Gotod Components)
// =========================================================================

window.GUIDE_CATALOG = {
  'guide-install': {
    title: '📥 安装与快速上手 (Installation & Quick Start)',
    desc: '了解如何在 Godot 4.x (4.6+) 引擎项目中引入 gotod-components-ui 并快速开始构建游戏界面。',
    demos: [
      {
        title: 'Step 1: 复制插件目录至项目 addons/',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
            <p style="color:var(--text-primary); margin-bottom:10px;">将 <code>addons/gotod_ui</code> 文件夹复制到您的 Godot 4 项目根目录下的 <code>res://addons/</code> 中：</p>
            <div class="code-box" style="margin:0;"><pre><code>your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 全部 28+ 个 UI 组件
│       ├── theme/         # 主题 Token 与样式盒引擎
│       ├── plugin.cfg     # 插件配置文件
│       └── plugin.gd      # 节点注册脚本
└── project.godot</code></pre></div>
          </div>
        `,
        code: `# Git 仓库克隆方式
git clone https://github.com/mhxy13867806343/gotod-components-ui.git`
      },
      {
        title: 'Step 2: 在 Godot 项目设置中启用插件',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>1. 打开 Godot 4 编辑器，点击顶部菜单 <strong>Project (项目) -> Project Settings (项目设置)</strong>。</p>
            <p>2. 切换到 <strong>Plugins (插件)</strong> 标签页。</p>
            <p>3. 找到 <code>gotod-components-ui</code> 并勾选 <strong>Enable (启用)</strong> 复选框。</p>
            <p>4. 启用后，编辑器节点列表中将自动出现 <code>GButton</code>、<code>GInput</code>、<code>GDialog</code>、<code>GTabs</code> 等全套自定义控件。</p>
          </div>
        `,
        code: `# 插件启用后，在任何脚本中均可直接实例化组件
var btn = GButton.new()
btn.text = "Hello Godot 4"
btn.button_type = GButton.ButtonType.PRIMARY
add_child(btn)`
      }
    ]
  },

  'guide-third-party': {
    title: '🔌 与第三方库生态配合 (QFramework / Dialogic / 状态机实战)',
    desc: 'Gotod Components UI 专职负责表现层 (View / Control)，遵循 Godot 4 标准节点与信号规范，能够以极其纯粹的解耦方式与 QFramework (架构层)、Dialogic 2.x (剧情对话系统)、状态机、任务及背包系统协同工作。',
    demos: [
      {
        title: '1. 与 QFramework (GD-QFramework) 架构层配合实战 (M-C-S-V 架构)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🧩 QFramework 响应式 Model 绑定与 Command 指令流演练</span>
              <span class="g-tag g-tag-primary">M-C-S-V 解耦</span>
            </div>

            <!-- Simulated Game UI Panel (View Layer) -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px; display:flex; flex-direction:column; gap:14px;">
              <!-- Model State Display -->
              <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                <span class="g-tag g-tag-warning" style="font-size:13px; padding:4px 10px;">
                  💰 金币 (Model.gold): <strong id="simQFGoldCount" style="margin-left:4px;">1200</strong>
                </span>
                <span class="g-tag g-tag-success" style="font-size:13px; padding:4px 10px;">
                  🧪 生命药水 (Model.potion): <strong id="simQFPotionCount" style="margin-left:4px;">5</strong> 瓶
                </span>
                <span class="g-tag g-tag-info" style="font-size:13px; padding:4px 10px;">
                  🛡️ 角色等级: <strong>Lv.18 游侠</strong>
                </span>
              </div>

              <!-- View Layer Triggers Commands & Events -->
              <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:4px;">
                <button class="g-btn g-btn-primary" onclick="simQFrameworkBuy()">
                  <i class="fa-solid fa-cart-shopping"></i> 发送指令: BuyPotionCommand (消耗 100 G)
                </button>
                <button class="g-btn g-btn-warning" onclick="simQFrameworkFull()">
                  <i class="fa-solid fa-bell"></i> 广播事件: InventoryFullEvent (背包已满)
                </button>
                <button class="g-btn g-btn-danger" onclick="
                  openSimDialogue({
                    text: '【QFramework Command】确认执行【清空角色存档数据】指令吗？此操作不可逆！',
                    speaker: '安全卫士',
                    avatar: '⚠️',
                    options: ['确认发送 DeleteSaveCommand', '取消操作']
                  })
                ">
                  <i class="fa-solid fa-trash"></i> 弹窗确认: DeleteSaveCommand
                </button>
              </div>
            </div>

            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              💡 <strong>核心模式</strong>：View 节点通过 <code>this.get_model()</code> 获取响应式数据并更新 Gotod UI；用户点击 Gotod 按钮时，通过 <code>this.send_command()</code> 派发业务指令，保持 UI 无业务逻辑。
            </div>
          </div>
        `,
        code: `# =========================================================================
# QFramework + Gotod UI 实战：View 层绑定与指令分发 (GDScript 4.x)
# =========================================================================
extends Control
# 实现 QFramework IController 接口

@onready var gold_tag: GTag = $Header/GoldTag
@onready var potion_tag: GTag = $Header/PotionTag
@onready var buy_btn: GButton = $ShopPanel/BuyBtn
@onready var count_stepper: GStepper = $ShopPanel/CountStepper

func _ready() -> void:
    var player_model = this.get_model(PlayerModel)
    
    # 1. 响应式绑定：Model 数据变化时，自动驱动 Gotod UI 刷新
    player_model.gold.register_with_init_value(func(val):
        gold_tag.text = "金币: %d" % val
    ).unbind_on_tree_exited(self)
    
    player_model.potion_count.register_with_init_value(func(val):
        potion_tag.text = "生命药水: %d 瓶" % val
    ).unbind_on_tree_exited(self)
    
    # 2. 交互分发：Gotod UI 按钮点击 -> 发送业务 Command
    buy_btn.pressed.connect(func():
        var count = int(count_stepper.value)
        this.send_command(BuyPotionCommand.new(count))
    )
    
    # 3. 监听全局事件：Event 触发 -> 调用 Gotod 全局提示
    this.register_event(InventoryFullEvent, func(e):
        GMessage.warning("背包已满，无法放入更多药水！", self)
    ).unbind_on_tree_exited(self)

    this.register_event(ItemBoughtSuccessEvent, func(e):
        GMessage.success("购买成功！消耗金币 %d" % e.cost, self)
    ).unbind_on_tree_exited(self)`
      },
      {
        title: '2. 与 Dialogic 2.x 剧情系统配合实战 (Timeline 触发与信号联动)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎭 Dialogic 2.x 剧情时间线启动与 Gotod 结算通知</span>
              <span class="g-tag g-tag-success">剧情与结算闭环</span>
            </div>

            <!-- NPC Interactor Card -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px; display:flex; align-items:center; justify-content:space-between; gap:16px;">
              <div style="display:flex; align-items:center; gap:14px;">
                <div style="font-size:40px;">🧝‍♀️</div>
                <div>
                  <div style="font-weight:700; color:var(--text-primary); font-size:14px;">森林魔女·爱丽丝</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">NPC 头顶绑定 GInteractPrompt [ E ]，靠近时触发 Dialogic 时间线</div>
                </div>
              </div>
              <button class="g-btn g-btn-primary" onclick="
                showToast('已启动 Dialogic.start(\\'alice_quest_timeline\\')', 'info');
                setTimeout(() => {
                  showToast('Dialogic timeline_ended: 剧情结束，派发 Gotod 任务结算通知！', 'success');
                }, 1200);
              ">
                <i class="fa-solid fa-comment-dots"></i> 按 E 触发 Dialogic 剧情
              </button>
            </div>

            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              💡 <strong>核心模式</strong>：NPC 挂载 <code>GInteractPrompt</code> 负责探测玩家距离并展示 <code>[E]</code> 交互按键；玩家按下后调用 <code>Dialogic.start(...)</code>；剧情结束或在 timeline 触发 <code>signal_event</code> 时，桥接到 Gotod 的 <code>GNotification</code> 与 <code>GMessage</code> 弹出任务结算奖励。
            </div>
          </div>
        `,
        code: `# =========================================================================
# Dialogic 2.x + Gotod UI 实战：头顶按键触发与剧情信号结算 (GDScript 4.x)
# =========================================================================
extends CharacterBody2D

@export var timeline_name: String = "alice_encounter"

func _ready() -> void:
    # 1. 使用 Gotod 的头顶悬浮按键组件绑定 NPC
    GInteractPrompt.attach_to(self, "E", func():
        # 靠近按下 E 键启动 Dialogic 剧情时间线
        Dialogic.start(timeline_name)
    )
    
    # 2. 监听 Dialogic 时间线结束信号 -> 弹出 Gotod 任务通知
    Dialogic.timeline_ended.connect(func():
        GNotification.show({
            "title": "任务更新",
            "message": "已完成【森林魔女爱丽丝的试炼】！",
            "type": "success"
        })
    )
    
    # 3. 监听 Dialogic 中发送的自定义事件 (Dialogic.signal_event)
    Dialogic.signal_event.connect(func(param: String):
        if param == "give_shadow_wand":
            GMessage.success("获得任务奖励：【暗影魔杖 +9】x1！")
        elif param == "trigger_boss_fight":
            GMessage.error("爱丽丝发起了决斗！进入战斗！")
    )`
      },
      {
        title: '3. 与任务追踪系统 (Quest System) & 背包状态联动',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">📜 GSteps 步骤条与 GCollapse 折叠面板追踪游戏任务状态</span>
              <span class="g-tag g-tag-warning">任务与背包联动</span>
            </div>

            <!-- Quest Status Card -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px; display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span id="simQuestStepBadge" style="font-weight:700; font-size:14px; color:var(--primary);">阶段 1/3: 前往暗影森林调查</span>
                <button class="g-btn g-btn-default" style="height:26px; font-size:11px;" onclick="simQuestNextStep()">
                  <i class="fa-solid fa-forward-step"></i> 推进下一阶段
                </button>
              </div>
              <div id="simQuestStepDesc" style="font-size:13px; color:var(--text-secondary);">
                靠近爱丽丝并进行交谈，查明暗影魔术的真相。
              </div>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 任务系统 QuestManager 与 Gotod UI GSteps 步骤条联动
# =========================================================================
extends Control

@onready var quest_steps: GSteps = $QuestPanel/GSteps
@onready var quest_log_collapse: GCollapse = $QuestPanel/GCollapse

func _ready() -> void:
    # 监听任务管理器阶段变更信号
    QuestManager.quest_step_changed.connect(func(quest_id: String, step_index: int, title: String):
        quest_steps.current_step = step_index
        GMessage.info("任务进度已更新: %s" % title, self)
    )
    
    # 监听新装备获得信号 -> 更新背包 Tab 徽标红点
    InventoryManager.item_added.connect(func(item_data):
        $MainTabs.set_tab_badge(1, "NEW") # 在“装备”分页打上红点
        GToast.show("获得了新物品: %s" % item_data.name)
    )`
      },
      {
        title: '4. 第三方库生态协作矩阵与架构职责边界',
        render: `
          <div style="overflow-x:auto;">
            <table class="api-table" style="width:100%;">
              <thead>
                <tr>
                  <th style="width:20%;">系统 / 框架</th>
                  <th style="width:25%;">第三方框架负责的职责</th>
                  <th style="width:30%;">Gotod UI 负责的职责</th>
                  <th style="width:25%;">推荐桥接机制</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style="color:var(--primary);">QFramework (GD-QF)</strong></td>
                  <td>Model 数据状态、Command 业务逻辑分发、Event 事件总线、System 核心服务</td>
                  <td>View 表现层渲染（GButton, GInput, GDialog, GMessage, GTheme 换肤）</td>
                  <td><code>send_command()</code><br><code>register_event()</code></td>
                </tr>
                <tr>
                  <td><strong style="color:var(--success);">Dialogic 2.x</strong></td>
                  <td>剧情 Timeline 编排、分支对话树、角色与变量存储系统、音效与立绘切换</td>
                  <td>头顶按键 (<code>GInteractPrompt</code>)、结算通知 (<code>GNotification</code>)、样式定制</td>
                  <td><code>Dialogic.timeline_ended</code><br><code>Dialogic.signal_event</code></td>
                </tr>
                <tr>
                  <td><strong style="color:var(--warning);">LimboAI / StateMachine</strong></td>
                  <td>有限状态机/行为树运转（巡逻、追击、战斗、死亡等 AI 与玩家状态）</td>
                  <td>状态 HUD 显示（血条 <code>GProgress</code>、受击闪烁、头顶状态图标 <code>GBadge</code>）</td>
                  <td><code>state_changed(new_state)</code> 信号</td>
                </tr>
                <tr>
                  <td><strong style="color:#ba55d3);">Quest / Inventory</strong></td>
                  <td>任务条件判断、背包道具堆叠、掉落物计算、存档持久化</td>
                  <td>任务步骤条 (<code>GSteps</code>)、背包卡片 (<code>GCard</code>)、分类 (<code>GTabs</code>)、红点 (<code>GBadge</code>)</td>
                  <td><code>item_added</code> / <code>quest_updated</code> 信号</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        code: `# 架构职责总结：
# 1. Gotod UI 永远只通过 Signal (发出交互) 和 Props (接收数据) 与外界沟通。
# 2. 避免在 Gotod UI 组件内部直接编写复杂的游戏核心业务逻辑。
# 3. 让 QFramework / Dialogic / 业务 Manager 专注逻辑，让 Gotod UI 专注极速打造高颜值界面！`
      }
    ]
  },

  'guide-css-style-engine': {
    title: '🎨 .css() 与 .style() 动态样式引擎 (Dynamic Style Engine)',
    desc: '提供类似现代前端 CSS / Tailwind 的链式与字典化样式定义体系。支持通过 .css() 进行全局或实例级快速样式定义，以及通过 .style({ name, func }).css() 针对特定组件进行深度全域定制，全面兼容 Godot 4 官方全部 StyleBox、Color、Font 与 Theme 规范。',
    demos: [
      {
        title: '1. .css({...}) 字典化与函数式样式设定 (Instance & Global CSS)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:14px; color:var(--text-primary);">⚡ 实时样式预览与切换 (Live Style Switching)</span>
              <span class="g-tag g-tag-primary">全域 / 实例级链式支持</span>
            </div>
            
            <!-- Live Preview Elements -->
            <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap; padding:16px; background:var(--bg-card); border-radius:var(--radius); border:1px dashed var(--border-base);" id="cssPreviewContainer">
              <button id="cssPreviewBtn" class="g-btn g-btn-primary" style="height:36px; padding:0 18px; border-radius:8px; transition:all 0.3s ease;">
                <i class="fa-solid fa-wand-magic-sparkles"></i> 示例动态按钮
              </button>
              <div id="cssPreviewBadge" style="padding:4px 12px; background:rgba(64,158,255,0.15); color:var(--primary); border:1px solid var(--primary); border-radius:6px; font-size:12px; font-weight:600; transition:all 0.3s ease;">
                Status: Dynamic CSS Active
              </div>
            </div>

            <!-- Style Preset Switchers -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-default" onclick="
                const btn = document.getElementById('cssPreviewBtn');
                btn.style.background = '#409eff';
                btn.style.borderRadius = '8px';
                btn.style.boxShadow = '0 4px 12px rgba(64,158,255,0.3)';
                btn.style.border = 'none';
                btn.style.color = '#fff';
                showToast('已应用: 极简扁平主题 (Clean Flat)', 'success');
              ">应用: 极简扁平主题</button>

              <button class="g-btn g-btn-default" onclick="
                const btn = document.getElementById('cssPreviewBtn');
                btn.style.background = 'linear-gradient(135deg, #e6a23c, #f56c6c)';
                btn.style.borderRadius = '99px';
                btn.style.boxShadow = '0 6px 16px rgba(245,108,108,0.4)';
                btn.style.border = '2px solid #ffd04b';
                btn.style.color = '#fff';
                showToast('已应用: 炫彩流光主题 (Gradient Glow)', 'warning');
              ">应用: 炫彩流光主题</button>

              <button class="g-btn g-btn-default" onclick="
                const btn = document.getElementById('cssPreviewBtn');
                btn.style.background = '#141414';
                btn.style.borderRadius = '4px';
                btn.style.boxShadow = '0 0 12px rgba(103,194,58,0.5)';
                btn.style.border = '1px solid #67c23a';
                btn.style.color = '#67c23a';
                showToast('已应用: 赛博朋克终端 (Cyber Terminal)', 'info');
              ">应用: 赛博朋克终端</button>
            </div>
          </div>
        `,
        code: `# GDScript 方式 1: 字典化直接设定样式
my_button.css({
    "bg_color": Color.hex(0x409eff),
    "corner_radius": 8,
    "font_color": Color.WHITE,
    "font_size": 14,
    "shadow_color": Color(0, 0, 0, 0.3),
    "shadow_size": 6
})

# GDScript 方式 2: 函数式回调深度定制 (支持原生 Godot 4 Control API)
my_button.css(func(ctrl: Control):
    var sb = StyleBoxFlat.new()
    sb.bg_color = Color(0.12, 0.14, 0.18)
    sb.set_corner_radius_all(10)
    sb.border_width_bottom = 3
    sb.border_color = Color.hex(0x67c23a)
    ctrl.add_theme_stylebox_override("normal", sb)
)`
      },
      {
        title: '2. .style({...}) 专属组件定制与链式全局调用 (.style & Chaining)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:14px; color:var(--text-primary);">🎯 .style({ name, func }) 组件类型精准定制</span>
              <span class="g-tag g-tag-success">.style().style().css() 链式驱动</span>
            </div>
            <p style="font-size:13px; color:var(--text-regular); margin:0; line-height:1.6;">
              <code style="color:var(--primary); font-family:var(--font-mono);">.style()</code> 用于针对某种特定组件类型（例如所有 <code style="color:var(--primary); font-family:var(--font-mono);">GFab</code>、<code style="color:var(--primary); font-family:var(--font-mono);">GButton</code> 或 <code style="color:var(--primary); font-family:var(--font-mono);">GDialog</code>）进行统一规则配置，末尾可无缝串联 <code style="color:var(--primary); font-family:var(--font-mono);">.css()</code> 设定全域字体与通用底色。
            </p>
            <div style="display:flex; gap:12px;">
              <button class="g-btn g-btn-primary" onclick="showToast('模拟 GStyle 链式规则已成功注入场景树！', 'success')">
                <i class="fa-solid fa-play"></i> 执行 GStyle 链式注入
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 针对特定组件进行全域定制，并链式配置全局样式
GStyle.style({
    "name": "GFab",
    "func": func(fab: GFab):
        fab.expand_duration = 0.35
        fab.css({
            "bg_color": Color.hex(0xe6a23c),
            "corner_radius": 99,
            "shadow_size": 8
        })
}).style({
    "name": "GButton",
    "func": func(btn: GButton):
        btn.round_theme = true
        btn.add_theme_font_size_override("font_size", 14)
}).style({
    "name": "GDialog",
    "func": func(dlg: GDialog):
        dlg.round_corner = true
}).css({
    # 此处 .css() 作用于全局所有 UI 控件
    "font_color": Color.WHITE,
    "border_color": Color.hex(0x3a3a48)
})

# 一键递归应用到当前场景树节点
GStyle.apply_to(self)`
      },
      {
        title: '3. 实例方法流式链式编程范式 (Fluent Method Chaining Paradigm)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:14px; color:var(--text-primary);">🔗 全组件方法原生流式链式支持</span>
              <span class="g-tag g-tag-primary">Fluent API: return self</span>
            </div>
            <p style="font-size:13px; color:var(--text-regular); margin:0; line-height:1.6;">
              Gotod UI 中所有组件的 <code style="color:var(--primary); font-family:var(--font-mono);">.css()</code>、属性设值器以及动作添加方法均默认返回 <code style="color:var(--primary); font-family:var(--font-mono);">self</code>，支持无需中间临时变量的一行流式声明式构建。
            </p>
            <div style="display:flex; gap:12px;">
              <button class="g-btn g-btn-primary" onclick="showToast('流式链式构造测试通过: GButton + GFab + GTabs 链式初始化', 'success')">
                <i class="fa-solid fa-code"></i> 测试流式链式实例化
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 全组件流畅链式调用 (无需中间变量)

# 1. 链式配置按钮
var btn = GButton.new() \\
    .set_text("立即加入战斗") \\
    .css({
        "bg_color": Color.hex(0x409eff),
        "corner_radius": 8,
        "font_color": Color.WHITE,
        "font_size": 15,
        "shadow_size": 6
    }) \\
    .css(func(b): b.round_theme = true) \\
    .on_click(func(): print("Button Clicked!"))

# 2. 链式配置悬浮菜单 GFab
var fab = GFab.new() \\
    .css({ "bg_color": Color.hex(0xe6a23c), "corner_radius": 99 }) \\
    .add_action("album", "相册", icon_album) \\
    .add_action("home", "首页", icon_home) \\
    .on_clicked(func(idx, name): print("Fab Clicked:", name))

# 3. 链式配置下拉选择 GSelect
var sel = GSelect.new() \\
    .css({ "corner_radius": 6, "font_size": 13 }) \\
    .add_options([
        { "label": "Godot 4.3 Forward+", "value": "4.3" },
        { "label": "Godot 4.4 Latest", "value": "4.4" }
    ]) \\
    .on_selected(func(idx, val, label): print("Selected:", label))

# 4. 挂载到场景树
add_child(btn)`
      }
    ],
    props: [
      { name: 'name / type', type: 'String', default: '""', desc: '目标组件类名 (如 "GFab", "GButton", "GSelect", "GDialog", "GTabs")' },
      { name: 'func / apply', type: 'Callable', default: 'Callable()', desc: '针对该组件的专属样式配置回调 func(component: Control) -> void' },
      { name: 'bg_color', type: 'Color / String', default: 'Color.WHITE', desc: '背景底色 (StyleBoxFlat.bg_color)' },
      { name: 'corner_radius', type: 'int / Vector4', default: '0', desc: '四角圆角半径 (支持单数值或 Vector4(左上, 右上, 右下, 左下))' },
      { name: 'border_color', type: 'Color / String', default: 'Color.TRANSPARENT', desc: '边框描边颜色 (StyleBoxFlat.border_color)' },
      { name: 'border_width', type: 'int / Vector4', default: '0', desc: '边框描边粗细 (StyleBoxFlat.border_width)' },
      { name: 'shadow_color', type: 'Color / String', default: 'Color(0,0,0,0.3)', desc: '投影阴影颜色 (StyleBoxFlat.shadow_color)' },
      { name: 'shadow_size', type: 'int', default: '0', desc: '投影弥散大小 (StyleBoxFlat.shadow_size)' },
      { name: 'shadow_offset', type: 'Vector2', default: 'Vector2.ZERO', desc: '投影位移偏移量 (StyleBoxFlat.shadow_offset)' },
      { name: 'content_margin', type: 'float / Vector4', default: '0.0', desc: '内部边距 (StyleBoxFlat.content_margin)' },
      { name: 'font_color', type: 'Color / String', default: 'Color.WHITE', desc: '文本字体颜色 (add_theme_color_override)' },
      { name: 'font_size', type: 'int', default: '14', desc: '文本字号大小 (add_theme_font_size_override)' },
      { name: 'font', type: 'Font', default: 'null', desc: '自定义字体资源 (add_theme_font_override)' }
    ],
    events: [],
    methods: [
      { name: 'css(rules_or_func: Variant)', desc: '配置全域通用或实例级样式（支持 Dictionary 或 Callable）', params: '(rules_or_func: Variant) -> GStyle' },
      { name: 'style(definition: Dictionary)', desc: '针对指定组件类名注册专属定制逻辑 {"name": "GFab", "func": Callable}', params: '(definition: Dictionary) -> GStyle' },
      { name: 'apply_to(target: Node)', desc: '将已注册的全部动态样式规则递归应用至目标场景树', params: '(target: Node) -> void' }
    ],
    slots: []
  },

  'guide-common-methods': {
    title: '🛠️ 全局通用基类方法与事件 (Universal Control Methods)',
    desc: '所有 Gotod UI 组件（GButton, GInput, GTabs, GDialog 等）均继承自 Godot 4 的 Control / Node 基类，因此天然具备以下完整的全局通用方法、生命周期销毁与信号订阅能力。',
    demos: [
      {
        title: '通用基类方法调用示例 (GDScript Common Usage)',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p style="color:var(--text-primary); margin-bottom:8px;">在任何 UI 脚本中，您都可以直接调用这些原生继承的通用 API：</p>
            <div class="code-box" style="margin:0;"><pre><code># 1. 显式显示与隐藏
my_component.show()
my_component.hide()
my_component.set_visible(true)

# 2. 焦点获取与判断
my_component.grab_focus()
if my_component.has_focus():
    print("处于激活交互状态")

# 3. 动态重设尺寸与位置
my_component.set_size(Vector2(240, 48))
my_component.set_position(Vector2(100, 200))

# 4. 动态设置提示气泡
my_component.set_tooltip_text("点击保存当前装备数据")

# 5. 信号连接与自定义发射
my_component.connect("custom_event", Callable(self, "_on_custom_event"))
my_component.emit_signal("custom_event", "arg1", 123)

# 6. 安全销毁
my_component.queue_free()</code></pre></div>
          </div>
        `,
        code: `# GDScript: Universal Control API
var btn = GButton.new()
btn.text = "Universal Control"
btn.grab_focus()
btn.set_tooltip_text("悬浮提示文字")
add_child(btn)`
      }
    ],
    props: [],
    methods: [
      { name: 'show() / hide()', desc: '显式显示或隐藏当前控件节点', params: '() -> void' },
      { name: 'set_visible(visible: bool)', desc: '动态控制控件的可见性', params: '(visible: bool) -> void' },
      { name: 'is_visible_in_tree()', desc: '查询当前控件在场景树中是否全局可见', params: '() -> bool' },
      { name: 'grab_focus()', desc: '使控件获取键盘/手柄交互焦点', params: '() -> void' },
      { name: 'release_focus()', desc: '主动释放当前焦点', params: '() -> void' },
      { name: 'has_focus()', desc: '查询控件当前是否正处于聚焦状态', params: '() -> bool' },
      { name: 'set_size(size: Vector2)', desc: '设置控件的实际像素宽高尺寸', params: '(size: Vector2) -> void' },
      { name: 'get_size()', desc: '读取控件的实际像素宽高尺寸', params: '() -> Vector2' },
      { name: 'set_position(pos: Vector2)', desc: '设置控件的相对局部坐标位置', params: '(pos: Vector2) -> void' },
      { name: 'get_position()', desc: '读取控件的相对局部坐标位置', params: '() -> Vector2' },
      { name: 'set_tooltip_text(text: String)', desc: '动态设置鼠标悬停提示气泡文本', params: '(text: String) -> void' },
      { name: 'queue_free()', desc: '在当前帧末安全销毁并释放节点内存', params: '() -> void' },
      { name: 'connect(signal_name, callable)', desc: '订阅并绑定信号至指定回调函数', params: '(signal_name: StringName, callable: Callable) -> Error' },
      { name: 'emit_signal(signal_name, ...)', desc: '手动发射自定义信号与携带参数', params: '(signal_name: StringName, ...) -> Error' },
      { name: 'add_theme_color_override(name, color)', desc: '动态覆盖控件的主题文字/边框颜色', params: '(name: StringName, color: Color) -> void' },
      { name: 'add_theme_stylebox_override(name, stylebox)', desc: '动态覆盖控件的主题背景样式盒 StyleBox', params: '(name: StringName, stylebox: StyleBox) -> void' }
    ]
  },

  'guide-dynamic-api': {
    title: '🧩 GTabs.new() 外部方法与自定义信号 (Dynamic Scripting & Signals)',
    desc: '通过代码动态创建 GTabs.new() 并调用外部 API 进行增删查改、拦截判断以及订阅自定义信号。',
    demos: [
      {
        title: 'GTabs.new() 完整代码动态构建示例',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p style="color:var(--text-primary); margin-bottom:8px;">以下是在 GDScript 中通过纯代码动态构建选项卡界面的完整流程：</p>
            <div class="code-box" style="margin:0;"><pre><code># 1. 实例化 GTabs
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.closable = true
tabs.addable = true

# 2. 动态添加标签页与内容面板
var p1 = PanelContainer.new()
var p2 = PanelContainer.new()
tabs.add_tab("角色属性", p1, false)
tabs.add_tab("背包物品", p2, true)

# 3. 订阅自定义信号
tabs.tab_clicked.connect(func(idx, name):
    print("点击了标签:", idx, name)
)
tabs.tab_changed.connect(func(idx, name):
    print("当前激活标签切换为:", name)
)
tabs.tab_close_requested.connect(func(idx, name):
    print("请求关闭标签:", name)
    # 可在此弹出 GDialog 确认框二次确认
)
tabs.tab_added.connect(func(idx, name):
    print("新增了标签:", name)
)

# 4. 标签切换前拦截 (Before Leave Hook)
tabs.set_before_leave(func(cur_idx, next_idx) -> bool:
    if is_form_dirty:
        GMessage.warning("表单未保存，无法离开当前标签！")
        return false
    return true
)

# 5. 添加到场景树
add_child(tabs)</code></pre></div>
          </div>
        `,
        code: `# GDScript: GTabs.new()
var tabs = GTabs.new()
tabs.add_tab("Tab 1", panel1)
tabs.add_tab("Tab 2", panel2)
tabs.tab_changed.connect(func(idx, name): print(name))
add_child(tabs)`
      }
    ],
    events: [
      { name: 'tab_clicked(index, name)', desc: '用户点击选中某个选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_changed(index, name)', desc: '当前激活选项卡发生改变时触发', params: '(index: int, name: String)' },
      { name: 'tab_added(index, name)', desc: '动态添加新选项卡时触发', params: '(index: int, name: String)' },
      { name: 'tab_removed(index, name)', desc: '选项卡被移除销毁时触发', params: '(index: int, name: String)' },
      { name: 'tab_close_requested(index, name)', desc: '用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)', params: '(index: int, name: String)' }
    ],
    methods: [
      { name: 'add_tab(name, panel, closable=false, icon=null)', desc: '动态追加一个选项卡及关联内容面板', params: '(name: String, panel: Control, closable: bool, icon: Texture2D) -> int' },
      { name: 'insert_tab(index, name, panel, closable=false, icon=null)', desc: '在指定索引位置插入一个选项卡', params: '(index: int, name: String, panel: Control, closable: bool, icon: Texture2D) -> void' },
      { name: 'remove_tab(index_or_name)', desc: '根据索引或标题名称移除指定选项卡', params: '(index_or_name: Variant) -> void' },
      { name: 'clear_tabs()', desc: '清空并销毁所有选项卡及关联面板', params: '() -> void' },
      { name: 'get_tab_count()', desc: '获取当前选项卡总数量', params: '() -> int' },
      { name: 'get_tab_name(index)', desc: '获取指定索引的选项卡标题文本', params: '(index: int) -> String' },
      { name: 'set_tab_title(index, new_title)', desc: '动态修改指定选项卡的标题文本', params: '(index: int, new_title: String) -> void' },
      { name: 'get_tab_panel(index)', desc: '获取指定索引绑定的内容面板 Control 节点', params: '(index: int) -> Control' },
      { name: 'set_tab_disabled(index, is_disabled)', desc: '设置指定选项卡是否禁用点击切换', params: '(index: int, is_disabled: bool) -> void' },
      { name: 'is_tab_disabled(index)', desc: '查询指定选项卡当前是否处于禁用状态', params: '(index: int) -> bool' },
      { name: 'set_tab_icon(index, icon)', desc: '为指定选项卡动态设置图标纹理', params: '(index: int, icon: Texture2D) -> void' },
      { name: 'find_tab_by_name(name)', desc: '根据标题名称反查选项卡的索引位置 (-1 为未找到)', params: '(name: String) -> int' },
      { name: 'next_tab() / prev_tab()', desc: '程序化前进/后退循环切换激活标签', params: '() -> void' },
      { name: 'set_before_leave(callback)', desc: '设置标签切换拦截钩子函数 Callable(cur, next) -> bool', params: '(callback: Callable) -> void' }
    ]
  },

  'guide-theme': {
    title: '🎨 主题 Token 与暗黑模式 (Design Tokens & Theming)',
    desc: '深度集成 Vue 主流组件库的设计 Token 系统，支持 Naive UI、Element Plus、Ant Design、Vant UI 风格以及 Dark/Light 明暗模式一键切换。',
    demos: [
      {
        title: '运行时动态切换设计主题',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:480px;">
            <p style="color:var(--text-secondary);">通过单例 <code>GotodTheme</code> 可在游戏运行时无缝切换整套色彩与圆角体系：</p>
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="changePreset('naive')">Naive UI (Green)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('element')">Element Plus (Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('ant')">Ant Design (Geek Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('vant')">Vant UI (Mobile)</button>
            </div>
          </div>
        `,
        code: `# GDScript: 动态换肤
# 切换为 Element Plus 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ELEMENT_PLUS)

# 切换为 Ant Design 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ANT_DESIGN)

# 切换明亮模式
GotodTheme.set_dark_mode(false)`
      }
    ]
  },

  'guide-autoload': {
    title: '⚙️ Autoload 全局服务配置 (GMessage / GotodTheme)',
    desc: '单例服务用于全局悬浮 Toast 消息提示与主题状态同步。',
    demos: [
      {
        title: '配置项目 Autoload 自动加载单例',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>在 <code>project.godot</code> 的 <code>[autoload]</code> 中注册全局单例：</p>
            <div class="code-box" style="margin:0;"><pre><code>[autoload]
GotodTheme="*res://addons/gotod_ui/theme/gotod_theme.gd"
GMessage="*res://addons/gotod_ui/components/feedback/g_message.gd"</code></pre></div>
          </div>
        `,
        code: `# 在任何 GDScript 业务脚本中随时随地调用：
GMessage.success("任务完成！获得金币 +100")
GMessage.error("网络连接断开")`
      }
    ]
  },

  'guide-treeshaking': {
    title: '📦 生产环境按需打包与摇树优化 (Tree-Shaking & Export Plugin)',
    desc: '开发环境支持随意调用全部 28+ 个组件；在项目生产环境发布导出 (Project -> Export) 时，EditorExportPlugin 会自动静态分析项目中所有 .tscn 和 .gd，未被使用的组件会自动被 skip() 排除出最终安装包，大幅减小游戏包体体积！',
    demos: [
      {
        title: '生产环境摇树依赖分析与自动剔除模拟器 (Tree-Shaking Live Analyzer)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            <div class="sim-card" style="width:100%;">
              <div class="sim-card-header">
                <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 项目场景组件引用模拟扫描器 (Dependency Scanner)</span>
                <span class="g-tag g-tag-success" id="shakerOptimizeTag">包体优化率: 82.1%</span>
              </div>
              <div style="padding:14px; background:var(--bg-surface); border-radius:var(--radius); margin-top:12px;">
                <p style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">勾选您在游戏中实际用到的组件，模拟导出时的按需过滤：</p>
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-size:12px;" id="shakerCheckGrid">
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GButton (按钮)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GInput (输入框)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GTabs (选项卡)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GDialog (弹窗)</label>
                  <label><input type="checkbox" checked onchange="runLiveTreeShaker()"> GProgress (进度条)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCard (卡片)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSelect (下拉框)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSlider (滑块)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSwitch (开关)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GDrawer (抽屉)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GSteps (步骤条)</label>
                  <label><input type="checkbox" onchange="runLiveTreeShaker()"> GCollapse (折叠面板)</label>
                </div>
              </div>

              <!-- Output Statistics -->
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:14px;">
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--text-secondary);">开发环境全量组件</div>
                  <div style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-top:2px;">28 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--primary);">生产实际打包组件</div>
                  <div id="shakerUsedCount" style="font-size:1.4rem; font-weight:700; color:var(--primary); margin-top:2px;">5 个</div>
                </div>
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); text-align:center;">
                  <div style="font-size:11px; color:var(--danger);">自动 skip() 剔除组件</div>
                  <div id="shakerUnusedCount" style="font-size:1.4rem; font-weight:700; color:var(--danger); margin-top:2px;">23 个</div>
                </div>
              </div>

              <!-- Godot Console Output Simulation -->
              <div style="margin-top:14px; padding:10px 14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); font-family:var(--font-mono); font-size:11px; color:#cfd0d8;">
                <div style="color:var(--primary); font-weight:700; margin-bottom:4px;">[Godot 4 EditorExportPlugin 导出日志]:</div>
                <div id="shakerLogText" style="line-height:1.6; color:#a0a5ad;">
                  [GotodUI Tree-Shaker] 扫描完成: 实际打包 5 个组件，自动剔除 23 个未引用组件 (GCard, GSelect, GSlider, GSwitch, GDrawer, GSteps, GCollapse...)。
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# Godot 4 生产环境自动运行的 EditorExportPlugin 核心逻辑:
# addons/gotod_ui/export/gotod_export_plugin.gd
class_name GotodExportPlugin
extends EditorExportPlugin

func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int) -> void:
    # 扫描项目所有场景依赖
    var result = GotodTreeShaker.analyze_project_used_components()
    print("[GotodUI Tree-Shaker] 已使用组件: %d, 剔除未引用: %d" % [result.used_count, result.unused_count])

func _export_file(file_path: String, type: String, features: PackedStringArray) -> void:
    # 未被任何场景引用的组件脚本直接调用 skip() 排除出导出包
    if file_path in _unused_script_paths:
        skip()`
      }
    ]
  },

  'guide-imperative-api': {
    title: '⚡ 命令式/编程式方法调用与上下文继承 (Imperative Calls & Context Injection)',
    desc: '除了在场景中放置节点外，Gotod UI 提供了全套静态命令式调用方法（类似 Element Plus 的 ElMessage、ElMessageBox、ElNotification、ElLoading.service）。支持传递 context_node (self) 继承当前场景树、视口与主题上下文环境！',
    demos: [
      {
        title: '1. GMessage 全局消息提示与 close_all() 手动关闭',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('操作成功！获得经验值 +200', 'success')">GMessage.success()</button>
              <button class="g-btn g-btn-warning" onclick="showToast('请注意：装备耐久度不足 20%', 'warning')">GMessage.warning()</button>
              <button class="g-btn g-btn-danger" onclick="showToast('网络连接中断，请重试', 'danger')">GMessage.error()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已手动关闭所有消息提示', 'info')">GMessage.close_all()</button>
            </div>
            <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); font-size:12px; line-height:1.7;">
              <strong>应用程序上下文继承 (Context Injection):</strong>
              <p style="color:var(--text-secondary); margin:4px 0 0;">通过将当前节点（<code>self</code>）作为第二个参数传入 <code>GMessage.success("...", self)</code>，弹出的 Toast 自动挂载到当前 SceneTree 根视口，并无缝继承当前场景的主题 Token 与屏幕缩放比例！</p>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式调用与上下文继承
# 1. 基础消息提示 (传入 self 作为上下文)
GMessage.success("购买道具成功！", self)
GMessage.warning("背包剩余空间不足！", self)
GMessage.error("金币不足，无法升级", self)

# 2. 手动关闭所有激活的消息实例 (类似 ElMessage.closeAll())
GMessage.close_all()

# 3. 字典配置高级调用
GMessage.show({
    "message": "自定义停留 5 秒的消息",
    "type": "success",
    "duration": 5.0
}, self)`
      },
      {
        title: '2. GMessageBox 编程式确认弹窗 (Alert / Confirm / Prompt)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="openSimDialog('装备强化成功！', '强化结果')">GMessageBox.alert()</button>
              <button class="g-btn g-btn-warning" onclick="openSimDialog('确定要分解这件神话装备吗？此操作不可逆！', '分解确认')">GMessageBox.confirm()</button>
              <button class="g-btn g-btn-default" onclick="openSimDialog('请输入新的公会名称：', '创建公会')">GMessageBox.prompt()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式弹窗
# 1. 简单警告弹窗
GMessageBox.alert("服务器将于 10 分钟后维护！", "系统通知", {}, self)

# 2. 确认/取消双选弹窗并监听信号
var confirm_box = GMessageBox.confirm("确定要出售这件传说武器吗？", "出售确认", {}, self)
confirm_box.confirmed.connect(func():
    GMessage.success("武器已成功出售！", self)
)

# 3. 输入 Prompt 弹窗
var prompt_box = GMessageBox.prompt("请输入角色昵称：", "修改昵称", {}, self)
prompt_box.prompt_submitted.connect(func(new_name: String):
    GMessage.success("昵称已修改为: " + new_name, self)
)`
      },
      {
        title: '3. GLoading 全局遮罩加载服务 (GLoading.service)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="showToast('GLoading.service() 正在加载地图资源...', 'info')">GLoading.service()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已调用 loading.close() 关闭加载遮罩', 'success')">loading.close()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 命令式全局加载遮罩
# 1. 开启全局 Loading 遮罩
var loading = GLoading.service({
    "text": "正在进入跨服战场，请稍候...",
    "spinner_size": 42.0
}, self)

# 2. 异步业务完成后关闭
await get_tree().create_timer(2.0).timeout
loading.close()`
      },
      {
        title: '4. GNotification 右上角通知气泡 (GNotification.notify)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('【成就解锁】首次击败世界Boss！', 'success')">GNotification.success()</button>
              <button class="g-btn g-btn-warning" onclick="showToast('【排位赛】匹配队伍准备就绪', 'warning')">GNotification.warning()</button>
              <button class="g-btn g-btn-default" onclick="showToast('已关闭所有通知气泡', 'info')">GNotification.close_all()</button>
            </div>
          </div>
        `,
        code: `# GDScript: 右上角全局通知气泡
GNotification.success("【成就达成】", "首次单挑通关深渊副本第 100 层！", self)
GNotification.warning("【电量预警】", "设备电量低于 15%，请及时充电", self)

# 关闭所有通知实例
GNotification.close_all()`
      }
    ]
  }
};

window.GAME_CATALOG = {
  // ========================================================
  // 1. 角色属性与装备面板
  // ========================================================
  'game-character': {
    title: '👤 游戏角色属性与装备面板 (Character RPG Stats & Equipment)',
    desc: '使用 GCard、GAvatar、GTag、GProgress、GButton、GBadge 打造的标准 RPG 角色状态与装备管理面板。点击装备槽位可实时计算属性加成！',
    demos: [
      {
        title: 'Interactive RPG Character Sheet 角色状态面板',
        render: `
          <div style="display:flex; gap:24px; flex-wrap:wrap; width:100%;">
            <!-- Left: Character Card & Stats -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:48px; height:48px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700;">⚔️</div>
                  <div>
                    <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">影刃狂剑士 <span class="g-tag g-tag-primary" style="font-size:10px;">Lv.45</span></div>
                    <div style="font-size:0.82rem; color:var(--text-secondary);">职业：近战物理输出 · 暴击流派</div>
                  </div>
                </div>
              </div>
              
              <!-- HP & MP Bars -->
              <div style="margin-top:16px; display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>❤️ 生命值 (HP)</span>
                    <span style="font-weight:600; color:var(--danger);">3,850 / 3,850</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--danger);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>💧 魔法值 (MP)</span>
                    <span style="font-weight:600; color:var(--info);">1,240 / 1,240</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--info);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>⭐ 经验值 (EXP)</span>
                    <span style="font-weight:600; color:var(--warning);">82.5%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:82.5%; background:var(--warning);"></div></div>
                </div>
              </div>

              <!-- Base Attributes Table -->
              <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.88rem;">
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理攻击：</span>
                  <span id="statAtk" style="font-weight:700; color:var(--primary);">845</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理防御：</span>
                  <span id="statDef" style="font-weight:700; color:var(--primary);">420</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">暴击率：</span>
                  <span id="statCrit" style="font-weight:700; color:var(--warning);">48.5%</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">移动速度：</span>
                  <span style="font-weight:700; color:var(--info);">360</span>
                </div>
              </div>
            </div>

            <!-- Right: Equipment Slots -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <span>当前穿戴装备 (Equipment Slots)</span>
                <span class="g-tag g-tag-success" style="font-size:10px;">战斗力: 12,450</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
                <!-- Weapon Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); cursor:pointer;" onclick="showToast('主手武器：龙鳞弑神之刃 (+180 攻击力)', 'warning')">
                  <div style="font-size:11px; color:var(--warning); font-weight:600;">[主武器] SSR 传说</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🗡️ 龙鳞弑神剑 +12</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">攻击 +180 · 暴击 +15%</div>
                </div>
                <!-- Armor Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--info); border-radius:var(--radius); cursor:pointer;" onclick="showToast('身体防具：暗影斗篷 (+95 防御)', 'info')">
                  <div style="font-size:11px; color:var(--info); font-weight:600;">[防具] SR 史诗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🛡️ 暗影夜行斗篷</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">防御 +95 · 闪避 +8%</div>
                </div>
                <!-- Ring Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); cursor:pointer;" onclick="showToast('饰品：血魔指环 (+800 生命值)', 'danger')">
                  <div style="font-size:11px; color:var(--danger); font-weight:600;">[饰品] SSR 圣遗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">💍 鲜血狂怒之戒</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">生命 +800 · 吸血 +6%</div>
                </div>
                <!-- Boots Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--success); border-radius:var(--radius); cursor:pointer;" onclick="showToast('鞋子：风行者长靴 (+45 移速)', 'success')">
                  <div style="font-size:11px; color:var(--success); font-weight:600;">[鞋子] R 精良</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">👢 疾风掠影长靴</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">移速 +45 · 耐力 +20</div>
                </div>
              </div>
              <div style="margin-top:16px; display:flex; justify-content:flex-end; gap:10px;">
                <button class="g-btn g-btn-default" onclick="showToast('已脱下全部装备'); document.getElementById('statAtk').innerText='420';">一键卸装</button>
                <button class="g-btn g-btn-primary" onclick="showToast('已自动穿戴最高战力装备！', 'success'); document.getElementById('statAtk').innerText='845';">一键最佳配装</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 角色装备面板组件代码
class_name CharacterPanel
extends GCard

@onready var hp_bar = GProgress.new()
@onready var mp_bar = GProgress.new()
@onready var equip_grid = GridContainer.new()

func _ready() -> void:
    title = "角色状态"
    extra_text = "Lv.45"
    
    # 动态配置血条与蓝条
    hp_bar.status = GThemeTokens.Status.DANGER
    hp_bar.percentage = 100.0
    add_child(hp_bar)
    
    # 监听装备点击信号
    for item in equip_slots:
        item.pressed.connect(func(): _on_equip_clicked(item))`
      }
    ]
  },

  // ========================================================
  // 2. 背包与物品栏
  // ========================================================
  'game-inventory': {
    title: '🎒 游戏背包与物品栏系统 (Inventory & Item Grid)',
    desc: '使用 GTabs、GBadge、GDialog、GButton 组合实现的 4x5 物品背包，支持道具分类过滤（消耗品/装备/材料）、品质框高亮与点击使用弹窗。',
    demos: [
      {
        title: 'Interactive 20-Slot Item Grid 背包网格',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700; font-size:1.05rem;">冒险者背包 (Inventory)</span>
                <span class="g-tag g-tag-default" style="font-size:11px;">容量: <span id="invUsed">6</span> / 20</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; color:var(--warning); font-weight:700; font-size:0.95rem;">
                <span>🪙 84,250</span> 金币
              </div>
            </div>

            <!-- Item Type Filters -->
            <div style="display:flex; gap:12px; margin-top:12px; padding-bottom:12px; border-bottom:1px solid var(--border-base);">
              <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:28px;">全部物品 (6)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">装备 (2)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">消耗药剂 (3)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">强化材料 (1)</button>
            </div>

            <!-- 4x5 Grid Slots -->
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; margin-top:16px;">
              <!-- Slot 1 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--danger); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 高级生命药水', '使用后瞬间恢复 2,000 点生命值。确认使用吗？')">
                <span style="font-size:1.8rem;">🧪</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x15</span>
              </div>
              <!-- Slot 2 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--info); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 法力水晶', '使用后瞬间恢复 800 点法力值。')">
                <span style="font-size:1.8rem;">💎</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x8</span>
              </div>
              <!-- Slot 3 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('装备详情: 黄金战弓', '品质: SSR 传说\n物理攻击力: +240\n射程: +50')">
                <span style="font-size:1.8rem;">🏹</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">SSR</span>
              </div>
              <!-- Slot 4 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--success); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('材料: 秘银矿石', '用于在铁匠铺锻造 40 级史诗武器的稀有材料。')">
                <span style="font-size:1.8rem;">🧱</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x32</span>
              </div>
              <!-- Slot 5 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('宝箱: 远古龙蛋', '开启后随机获得一只 S 级飞行战斗坐骑。')">
                <span style="font-size:1.8rem;">🥚</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x1</span>
              </div>
              <!-- Slot 6 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--primary); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('卷轴: 回城卷轴', '使用后吟唱 3 秒传送回主城旅店。')">
                <span style="font-size:1.8rem;">📜</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x5</span>
              </div>
              <!-- Empty Slots 7~10 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
            </div>

            <!-- Footer Actions -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
              <button class="g-btn g-btn-default" onclick="showToast('背包已自动按品质整理排序！', 'success')">一键整理背包</button>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-danger" onclick="openDialog('批量分解', '是否将所有白色与绿色品质装备分解为强化碎片？')">批量分解</button>
                <button class="g-btn g-btn-primary" onclick="showToast('成功扩充 5 个背包格子！', 'success')">扩充背包 (+5格)</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏背包实现
class_name GameInventory
extends PanelContainer

@export var max_slots: int = 20
var items: Array[Dictionary] = []

func use_item(slot_index: int) -> void:
    var item = items[slot_index]
    if item["type"] == "potion":
        player.heal(item["value"])
        GMessage.success("使用成功：生命恢复 " + str(item["value"]))
        item["count"] -= 1
        _refresh_slots()`
      }
    ]
  },

  // ========================================================
  // 3. 游戏系统设置中心
  // ========================================================
  'game-settings': {
    title: '🎮 游戏系统设置中心 (Game Settings Panel)',
    desc: '使用 GTabs、GSlider、GSwitch、GSelect、GButton 组合实现的完整游戏配置中心（音频/画面/操作/语言）。',
    demos: [
      {
        title: 'Interactive Game Settings 游戏设置界面',
        render: `
          <div class="sim-card" style="width:100%; max-width:580px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">⚙️ 游戏系统设置 (Preferences)</span>
              <button class="g-btn g-btn-text" onclick="showToast('已恢复为默认推荐设置');">恢复默认</button>
            </div>

            <!-- Audio Sliders -->
            <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🔊 主音量 (Master Volume)</span>
                  <span id="volMaster" style="font-weight:700; color:var(--primary);">80%</span>
                </div>
                <input type="range" min="0" max="100" value="80" style="width:100%;" oninput="document.getElementById('volMaster').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🎵 背景音乐 (BGM Volume)</span>
                  <span id="volBgm" style="font-weight:700; color:var(--primary);">65%</span>
                </div>
                <input type="range" min="0" max="100" value="65" style="width:100%;" oninput="document.getElementById('volBgm').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>💥 战斗音效 (SFX Volume)</span>
                  <span id="volSfx" style="font-weight:700; color:var(--primary);">90%</span>
                </div>
                <input type="range" min="0" max="100" value="90" style="width:100%;" oninput="document.getElementById('volSfx').innerText=this.value+'%'">
              </div>

              <!-- Graphics Toggles -->
              <div style="padding-top:14px; border-top:1px solid var(--border-base); display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🖥️ 全屏模式 (Fullscreen)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('全屏模式：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>⚡ 垂直同步 (V-Sync)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('垂直同步：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🎯 目标渲染帧率 (FPS Limit)</span>
                  <select class="select-theme" style="width:140px; height:32px;">
                    <option value="60">60 FPS</option>
                    <option value="120" selected>120 FPS</option>
                    <option value="144">144 FPS</option>
                    <option value="unlimited">无限制</option>
                  </select>
                </div>
              </div>

              <!-- Footer Buttons -->
              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
                <button class="g-btn g-btn-default" onclick="showToast('取消更改');">取消</button>
                <button class="g-btn g-btn-primary" onclick="showToast('游戏设置已成功保存并即时生效！', 'success');">应用并保存</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏音频与图形设置绑定
func _on_master_slider_value_changed(val: float) -> void:
    AudioServer.set_bus_volume_db(
        AudioServer.get_bus_index("Master"),
        linear_to_db(val / 100.0)
    )

func _on_fullscreen_toggled(is_fullscreen: bool) -> void:
    DisplayServer.window_set_mode(
        DisplayServer.WINDOW_MODE_FULLSCREEN if is_fullscreen 
        else DisplayServer.WINDOW_MODE_WINDOWED
    )`
      }
    ]
  },

  // ========================================================
  // 4. 任务与剧情日志
  // ========================================================
  'game-quest': {
    title: '📜 游戏任务与剧情日志系统 (Quest Log & Objective Tracker)',
    desc: '使用 GCollapse、GSteps、GTag、GProgress、GButton 组合构建的游戏任务日志。包含主线/支线分类、阶段性目标达成与奖励领取。',
    demos: [
      {
        title: 'Interactive Quest Tracker 任务追踪与奖励领取',
        render: `
          <div class="sim-card" style="width:100%; max-width:620px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.05rem;">📜 任务日志 (Quest Log)</span>
              <span class="g-tag g-tag-warning">进行中任务 (2)</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:14px; margin-top:16px;">
              <!-- Main Quest 1 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--primary); font-size:1rem;">[主线第4章] 封印之地的唤醒</div>
                  <span class="g-tag g-tag-primary" style="font-size:11px;">目标已达成</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">前往暗夜森林深处击败看守封印的远古巨龙，取得龙之结晶。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>击败远古黑龙：1 / 1</span>
                    <span style="color:var(--success); font-weight:700;">100%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--success);"></div></div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid var(--border-base);">
                  <span style="font-size:0.85rem; color:var(--warning);">奖励：🪙 10,000 金币 · ⭐ 5,000 EXP</span>
                  <button id="btnClaimQuest" class="g-btn g-btn-primary" style="padding:4px 14px; font-size:12px; height:28px;" onclick="this.disabled=true; this.innerText='已领取'; showToast('成功领取任务奖励：金币 +10,000，EXP +5,000！', 'success');">领取奖励</button>
                </div>
              </div>

              <!-- Side Quest 2 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--text-primary); font-size:1rem;">[支线] 铁匠铺的委托</div>
                  <span class="g-tag g-tag-default" style="font-size:11px;">进行中</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">采集 10 块黑曜石矿石并交给铁匠布鲁诺。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>采集黑曜石：6 / 10</span>
                    <span style="color:var(--warning); font-weight:700;">60%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:60%; background:var(--warning);"></div></div>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 任务日志系统
class_name QuestManager
extends Node

signal quest_completed(quest_id: String)

func check_quest_progress(quest_id: String) -> void:
    var quest = active_quests[quest_id]
    if quest.current >= quest.target:
        quest.state = QuestState.READY_TO_CLAIM
        GMessage.info("任务目标已达成：" + quest.title)`
      }
    ]
  },

  // ========================================================
  // 5. 金币商城
  // ========================================================
  'game-shop': {
    title: '🛒 游戏商城与道具购买 (In-Game Shop & Purchasing)',
    desc: '使用 GCard、GBadge、GDialog、GButton 组合实现的道具商店，支持购买确认、金币实时扣除与售罄判定。',
    demos: [
      {
        title: 'Interactive In-Game Store 游戏道具商店',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">🛒 神秘商人道具屋 (Merchant Store)</span>
              <div style="color:var(--warning); font-weight:700;">
                我的金币: 🪙 <span id="shopGold">25,800</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:16px;">
              <!-- Item 1 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700;">🧪 特级狂暴药剂</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">暴击率提升 30%，持续 60 秒</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 500 金币</div>
                </div>
                <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=500){ g.innerText=(cur-500).toLocaleString(); showToast('购买特级狂暴药剂成功！', 'success'); }">购买</button>
              </div>

              <!-- Item 2 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; color:var(--warning);">🗡️ 封印的烈焰之剑</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">传说级双手武器 · 附带灼烧</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 12,000 金币</div>
                </div>
                <button class="g-btn g-btn-warning" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=12000){ g.innerText=(cur-12000).toLocaleString(); showToast('购买传说武器成功！', 'success'); } else { showToast('金币不足！', 'danger'); }">购买</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 商店购买逻辑
func purchase_item(item_id: String, price: int) -> void:
    if player.gold >= price:
        player.gold -= price
        player.inventory.add_item(item_id)
        GMessage.success("购买成功！")
    else:
        GMessage.error("金币不足，无法购买！")`
      }
    ]
  }
};
