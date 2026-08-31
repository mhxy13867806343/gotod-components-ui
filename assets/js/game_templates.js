// =========================================================================
// Gotod Components UI - Guide & Game UI Templates Catalog
// 1. 指南系统 (Guide & Installation)
// 3. 游戏实战案例 (Game UI Templates using Gotod Components)
// =========================================================================

window.GUIDE_CATALOG = {
  'guide-install': {
    title: '📥 安装与快速上手 (Installation & Quick Start)',
    desc: '了解如何在 Godot 4.x (4.6+) 引擎项目中引入 gotod-components-ui 并快速开始构建游戏界面与核心逻辑系统。',
    demos: [
      {
        title: 'Step 1: 下载插件压缩包安装或通过 Git 克隆 (Download Release Zip / Git Clone)',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:14px;">
            
            <!-- Prominent Download Banner Card -->
            <div style="background:linear-gradient(135deg, rgba(64,158,255,0.1), rgba(103,194,58,0.1)); border:1px solid var(--primary); padding:14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div>
                <div style="font-weight:800; font-size:13px; color:var(--primary); display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-box-archive"></i> gotod-components-ui v1.0.0 独立安装包 (.zip)
                </div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
                  免装 Git 工具，直接下载压缩包解压即用 (包含完整 28+ 组件与全部工具库)
                </div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <a href="https://github.com/mhxy13867806343/gotod-components-ui/releases/download/v1.0.0/gotod-components-ui-v1.0.0.zip" class="g-btn g-btn-primary" style="height:32px; font-size:12px; font-weight:700;">
                  <i class="fa-solid fa-download"></i> 立即下载 gotod-components-ui-v1.0.0.zip
                </a>
                <a href="https://github.com/mhxy13867806343/gotod-components-ui/releases" target="_blank" class="g-btn g-btn-success" style="height:32px; font-size:11px;">
                  <i class="fa-brands fa-github"></i> GitHub Releases
                </a>
                <a href="https://gitee.com/fangjiayu/gotod-components-ui/releases" target="_blank" class="g-btn g-btn-warning" style="height:32px; font-size:11px;">
                  <i class="fa-solid fa-bolt"></i> Gitee 国内下载
                </a>
              </div>
            </div>

            <!-- Path instructions -->
            <p style="color:var(--text-secondary); font-size:11px; margin:0; line-height:1.6;">
              📥 <strong>安装目录指引</strong>：将解压得到的 <code>addons/gotod_ui</code> 文件夹直接复制到您的 Godot 4 项目根目录下的 <code>res://addons/</code> 中：
            </p>

            <div class="code-box" style="margin:0;"><pre><code>your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 全部 28+ 个 UI 组件 (Button, Dialog, Tabs, Input, Select, etc.)
│       ├── theme/         # 主题 Token 与样式盒引擎 (Naive, Element, AntD, Vant)
│       ├── events/        # 全局事件总线 (GEvent uni.$emit / uni.$on)
│       ├── router/        # 场景转场路由管理器 (GRouter 4向滑动+3大缩放)
│       ├── utils/         # 网络(Axios/WS/联机)、2D坐标计算、物理公式、格式化、资产加载
│       ├── lifecycle/     # 生命周期安全守卫 (GLifecycleGuard)
│       ├── plugin.cfg     # 插件配置文件
│       └── plugin.gd      # 节点自动注册插件脚本
└── project.godot</code></pre></div>
          </div>
        `,
        code: `# 方式 1: 直接下载官方 Release 独立安装包 (推荐，免 Git)
# 下载直链: https://github.com/mhxy13867806343/gotod-components-ui/releases/download/v1.0.0/gotod-components-ui-v1.0.0.zip

# 方式 2: Git 仓库克隆方式
git clone https://github.com/mhxy13867806343/gotod-components-ui.git`
      },
      {
        title: 'Step 2: 在 Godot 项目设置中启用插件',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7; font-size:12px;">
            <p>1. 打开 Godot 4 编辑器，点击顶部菜单 <strong>Project (项目) -> Project Settings (项目设置)</strong>。</p>
            <p>2. 切换到 <strong>Plugins (插件)</strong> 标签页。</p>
            <p>3. 找到 <code>gotod-components-ui</code> 并勾选 <strong>Enable (启用)</strong> 复选框。</p>
            <p>4. 启用后，编辑器节点列表中将自动注册 <code>GButton</code>、<code>GInput</code>、<code>GDialog</code>、<code>GTabs</code> 等全套自定义控件，且 <code>GEvent</code>、<code>GRouter</code>、<code>GAxios</code>、<code>GCoord</code>、<code>GPhysics</code>、<code>GFormat</code>、<code>GAsset</code> 均为静态工具类，直接在脚本中调用即可！</p>
          </div>
        `,
        code: `# 插件启用后，在任何脚本中均可直接实例化组件与调用工具类
# 1. UI 控件
var btn = GButton.new()
btn.text = "Hello Godot 4"
btn.button_type = GButton.ButtonType.PRIMARY
add_child(btn)

# 2. 路由跳转 (带默认向左滑入动画)
GRouter.push("res://scenes/shop.tscn")

# 3. 全局事件广播 (uni.$emit)
GEvent.emit("player_level_up", { "new_level": 50 })

# 4. Axios 风格异步请求
var res = await GAxios.get("https://api.game.com/player/info")`
      },
      {
        title: 'Step 3: 开源协议与在线文档 (MIT License & Online Preview)',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:var(--primary);">📄 MIT License 开源协议</span>
              <span class="g-tag g-tag-success">Commercial & Personal Free</span>
            </div>
            <p style="color:var(--text-secondary); margin:0; line-height:1.6;">
              本项目基于 <strong>MIT 宽松开源协议</strong> 发布，完全免费允许商业及个人游戏开发使用、修改与二次分发，无需支付授权费用。
            </p>
            <div style="display:flex; gap:10px; margin-top:4px;">
              <a href="https://github.com/mhxy13867806343/gotod-components-ui" target="_blank" class="g-btn g-btn-default" style="height:30px; font-size:11px;">
                <i class="fa-brands fa-github"></i> GitHub 源码仓库
              </a>
              <a href="https://mhxy13867806343.github.io/gotod-components-ui/" target="_blank" class="g-btn g-btn-primary" style="height:30px; font-size:11px;">
                <i class="fa-solid fa-up-right-from-square"></i> GitHub Pages 实时预览
              </a>
            </div>
          </div>
        `,
        code: `# MIT License
# Copyright (c) 2026 gotod-components-ui Contributors
# 允许任何个人或团队自由用于商业/非商业游戏项目。`
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
  // 0. 记忆大师实战案例全套复盘与演示
  // ========================================================
  'game-memory-match': {
    title: '🎴 记忆大师实战案例 (Memory Match Game Full Showcase)',
    desc: '基于 gotod-components-ui 构建的完整 Godot 4 游戏实战项目。深度集成 28+ UI 组件、指令式服务、Vue Hooks、GRouter 场景路由与 GAxios 真实网络请求。现提供 8 个从基础到高级/复杂的渐进式示例，可在右侧查看交互预览与 GDScript 实现。',
    demos: [
      {
        title: '1. 记忆大作战主菜单大厅 (Main Menu & Navigation)',
        render: `
          <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <!-- Notice Bar Simulation -->
            <div style="background:rgba(230,162,60,0.12); border:1px solid var(--warning); border-radius:6px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between; font-size:12px;">
              <div style="display:flex; align-items:center; gap:8px; color:var(--warning); font-weight:600;">
                <i class="fa-solid fa-fire"></i> 🔥 欢迎来到记忆大师！今日全服双倍连击积分活动进行中，快来挑战专家难度！
              </div>
              <button style="background:none; border:none; color:var(--text-secondary); cursor:pointer;" onclick="this.parentElement.style.display='none'; showToast('通知栏已关闭', 'info');">×</button>
            </div>

            <!-- User Header Bar -->
            <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg, #18a058, #36ad6a); display:flex; align-items:center; justify-content:center; font-size:18px; position:relative;">
                  👑
                  <span style="position:absolute; top:-2px; right:-2px; background:#f56c6c; color:#fff; border-radius:10px; font-size:9px; padding:0 4px; font-weight:700;">3</span>
                </div>
                <div>
                  <div style="font-weight:700; font-size:13px; color:var(--text-primary);">冒险家 <span class="g-tag g-tag-success" style="font-size:10px; padding:1px 6px;">✨ 记忆星耀</span></div>
                  <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Lv.1 (EXP 240/500) · 💰 888 金币</div>
                </div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="g-btn g-btn-primary" style="height:28px; font-size:11px;" onclick="showToast('已通过 GRouter.push 跳转至道具商城', 'success')"><i class="fa-solid fa-cart-shopping"></i> 道具商城</button>
                <button class="g-btn g-btn-default" style="height:28px; font-size:11px;" onclick="showToast('已打开 GDrawer 战绩与背包抽屉', 'info')"><i class="fa-solid fa-box-archive"></i> 战绩背包</button>
                <button class="g-btn g-btn-warning" style="height:28px; font-size:11px;" onclick="showToast('已打开 GActionSheet 快捷面板', 'warning')"><i class="fa-solid fa-bolt"></i> 快捷操作</button>
              </div>
            </div>

            <!-- Level Select Cards Grid -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:6px; cursor:pointer;" onclick="showToast('已切换至【简单】关卡', 'success')">
                <div style="font-weight:700; font-size:12px; color:var(--primary);">🌱 简单</div>
                <div style="font-size:10px; color:var(--text-secondary); margin:4px 0;">4×3 网格 · 6对 · 90秒</div>
                <span class="g-tag g-tag-primary" style="font-size:9px;">✅ 当前已选</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; cursor:pointer;" onclick="showToast('已切换至【普通】关卡', 'info')">
                <div style="font-weight:700; font-size:12px; color:var(--text-primary);">⚡ 普通</div>
                <div style="font-size:10px; color:var(--text-secondary); margin:4px 0;">4×4 网格 · 8对 · 120秒</div>
                <span class="g-tag g-tag-default" style="font-size:9px;">选择此难度</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; cursor:pointer;" onclick="showToast('已切换至【困难】关卡', 'info')">
                <div style="font-weight:700; font-size:12px; color:var(--text-primary);">🔥 困难</div>
                <div style="font-size:10px; color:var(--text-secondary); margin:4px 0;">6×4 网格 · 12对 · 120秒</div>
                <span class="g-tag g-tag-default" style="font-size:9px;">选择此难度</span>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; cursor:pointer;" onclick="showToast('已切换至【专家】关卡', 'warning')">
                <div style="font-weight:700; font-size:12px; color:var(--warning);">💀 专家</div>
                <div style="font-size:10px; color:var(--text-secondary); margin:4px 0;">6×5 网格 · 15对 · 150秒</div>
                <span class="g-tag g-tag-warning" style="font-size:9px;">高额奖励</span>
              </div>
            </div>
          </div>
        `,
        diffTip: '💡 重点修复：CanvasLayer 根节点响应式全屏锚点定位、GRouter 场景无缝转场，以及 GMessage 依附层级规范。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): 规范挂载 CanvasLayer 与 GRouter 转场
# =========================================================================
extends Node2D

var _ui_layer: CanvasLayer

func _setup_ui() -> void:
    _ui_layer = CanvasLayer.new()
    _ui_layer.layer = 10
    add_child(_ui_layer)

    # 1. 响应式全屏根容器 (避免多分辨率下界面右侧出现大面积黑屏空隙)
    var root_container = VBoxContainer.new()
    root_container.set_anchors_preset(Control.PRESET_FULL_RECT)
    root_container.offset_left = 16
    root_container.offset_right = -16
    root_container.offset_top = 8
    root_container.offset_bottom = -12
    root_container.add_theme_constant_override("separation", 10)
    _ui_layer.add_child(root_container)

    # 2. 顶部广播通知栏
    var notice_bar = GNoticeBar.new()
    notice_bar.text = "🔥 欢迎来到记忆大师！今日全服双倍连击积分活动进行中！"
    notice_bar.scrollable = true
    notice_bar.mode = GNoticeBar.NoticeMode.CLOSEABLE
    root_container.add_child(notice_bar)

    # 3. 使用 GRouter 安全转场进入游戏场景 (带平滑滑动过渡动画)
    var start_btn = GButton.new()
    start_btn.text = "🚀  立即开启关卡挑战"
    start_btn.button_type = GButton.ButtonType.PRIMARY
    start_btn.pressed.connect(func():
        GRouter.push("res://scenes/game.tscn", { "level": GameState.selected_level }, GRouter.TransitionType.SLIDE_LEFT)
    )
    root_container.add_child(start_btn)`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): 硬编码坐标、原生切场景导致动画丢失
# =========================================================================
extends Node2D

func _setup_ui() -> void:
    var root_container = VBoxContainer.new()
    # ❌ 错误 1: 直接赋值 anchors_preset 无法自动同步 offset，在窗口拉伸时右侧产生断层
    root_container.anchors_preset = Control.PRESET_FULL_RECT
    add_child(root_container)

    # ❌ 错误 2: 忽略 GNoticeBar 的关闭模式与滚动速度
    var notice_bar = GNoticeBar.new()
    notice_bar.text = "欢迎来到记忆大师！"
    root_container.add_child(notice_bar)

    # ❌ 错误 3: 绕过 GRouter 使用底层方法切换场景，丢失转场动效与路由栈参数
    var start_btn = Button.new()
    start_btn.text = "开始游戏"
    start_btn.pressed.connect(func():
        get_tree().change_scene_to_file("res://scenes/game.tscn")
    )
    root_container.add_child(start_btn)`
      },
      {
        title: '2. 翻牌对局、技能冷却 (UseCooldown) 与连击通知系统',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:13px; color:var(--primary);">🎮 记忆卡片对局模拟 (4×2 网格)</span>
              <span class="g-tag g-tag-warning">倒计时: <strong id="simGameTimer">78s</strong></span>
            </div>

            <!-- Card Grid Simulation -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
              <button class="g-btn g-btn-default" style="height:54px; font-size:20px;" onclick="this.innerText='🐉'; showToast('翻开卡片: 🐉', 'info');">❓</button>
              <button class="g-btn g-btn-default" style="height:54px; font-size:20px;" onclick="this.innerText='🐉'; showToast('✨ 配对成功！连击 +1', 'success');">❓</button>
              <button class="g-btn g-btn-default" style="height:54px; font-size:20px;" onclick="this.innerText='🦊'; showToast('翻开卡片: 🦊', 'info');">❓</button>
              <button class="g-btn g-btn-default" style="height:54px; font-size:20px;" onclick="this.innerText='🦊'; showToast('✨ 配对成功！连击 +2', 'success');">❓</button>
            </div>

            <!-- Skill Cooldown Bar -->
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:6px;">
              <button id="simCdBtn" class="g-btn g-btn-warning" style="font-size:12px;" onclick="
                this.disabled = true;
                let t = 5;
                this.innerText = '⏳ 冷却中 (' + t + 's)';
                let itv = setInterval(() => {
                  t--;
                  if(t <= 0){
                    clearInterval(itv);
                    this.disabled = false;
                    this.innerText = '⚡ 透视之眼 (5s CD)';
                    showToast('透视技能已冷却完毕！', 'success');
                  } else {
                    this.innerText = '⏳ 冷却中 (' + t + 's)';
                  }
                }, 1000);
              ">⚡ 透视之眼 (5s CD)</button>
              <div style="font-size:11px; color:var(--text-secondary);">使用 Vue-Style <code>UseCooldown</code> 钩子精确调度</div>
            </div>
          </div>
        `,
        diffTip: '💡 重点修复：UseCooldown 销毁解绑守卫、GDialog 取消按钮私有成员越界访问修复、卡片动画 Tween 链式平滑驱动。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): 封装完备的 UseCooldown 与 GDialog 响应
# =========================================================================
var _peek_cd: UseCooldown

func _setup_cooldowns() -> void:
    _peek_cd = UseCooldown.create(8.0)
    _peek_cd.cooldown_started.connect(func():
        _skill_peek_btn.disabled = true
    )
    _peek_cd.cooldown_updated.connect(func(rem: float, pct: float):
        _skill_peek_btn.text = "⏳ 透视 (%.1fs)" % rem
    )
    _peek_cd.cooldown_finished.connect(func():
        _skill_peek_btn.disabled = false
        _skill_peek_btn.text = "👁️  透视之眼 (8s CD)"
        GToast.text_top("透视技能冷却完毕！", 1.0)
    )

func _on_win() -> void:
    _win_dialog.title = "🎉 恭喜通关！"
    _win_dialog.content_text = "最终得分：%d 分\\n获得经验: +150 EXP  金币: +200 💰" % score
    # 修复：通过标准 API 动态配置对话框按钮，不直接操作私有属性
    _win_dialog.confirm_button_text = "下一关 ▶"
    _win_dialog.cancel_button_text = "再玩一次"
    _win_dialog.open()`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): 越界访问 GDialog 内部私有变量
# =========================================================================
func _on_win() -> void:
    _win_dialog.title = "🎉 恭喜通关！"
    # ❌ 错误：直接操作组件内部私有下划线节点 _cancel_btn，破坏封装且在不同版本会报空指针
    if is_instance_valid(_win_dialog._cancel_btn):
        _win_dialog._cancel_btn.visible = next_ok
    _win_dialog.open()`
      },
      {
        title: '3. 真实在线数据请求 (GAxios) 与全服排行榜动态卡片渲染',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <span style="font-weight:700; font-size:13px; color:var(--primary);">📡 GAxios 在线接口请求 & 动态卡片列表</span>
              <button class="g-btn g-btn-primary" style="height:30px; font-size:12px;" onclick="
                showToast('GAxios 发起异步 GET 请求...', 'info');
                setTimeout(() => {
                  showToast('✓ 成功拉取并渲染 3 条在线排行榜卡片！', 'success');
                }, 600);
              ">⚡ 请求实时排行榜接口并渲染卡片</button>
            </div>

            <!-- Rendered Hero Cards List -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="padding:10px 14px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span style="font-weight:800; font-size:16px; color:#f0a020;">#1</span>
                  <div style="width:30px; height:30px; border-radius:50%; background:rgba(240,160,32,0.2); display:flex; align-items:center; justify-content:center;">👑</div>
                  <div>
                    <div style="font-weight:700; font-size:13px;">神级脑力王</div>
                    <div style="font-size:10px; color:var(--text-secondary);">胜率: 98.5%  积分: 9850</div>
                  </div>
                </div>
                <span class="g-tag g-tag-success" style="font-size:10px;">传奇宗师</span>
              </div>

              <div style="padding:10px 14px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span style="font-weight:800; font-size:16px; color:var(--text-secondary);">#2</span>
                  <div style="width:30px; height:30px; border-radius:50%; background:rgba(64,158,255,0.2); display:flex; align-items:center; justify-content:center;">⚡</div>
                  <div>
                    <div style="font-weight:700; font-size:13px;">暗影速记手</div>
                    <div style="font-size:10px; color:var(--text-secondary);">胜率: 94.2%  积分: 8620</div>
                  </div>
                </div>
                <span class="g-tag g-tag-primary" style="font-size:10px;">最强王者</span>
              </div>
            </div>
          </div>
        `,
        diffTip: '💡 重点修复：GAxios 字典键访问语法、HTTPClient 请求方法显式整型转换、全套拦截器流水线。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): GAxios 实例工厂、参数字典安全解析与拦截器
# =========================================================================
func _on_test_live_fetch() -> void:
    var loader = GLoading.service({"text": "正在从全服云端同步数据..."}, self)
    
    # 1. 创建 GAxios 实例并配置超时
    var axios = GAxios.create({
        "timeout": 5.0,
        "context": self
    })
    
    # 2. 发起异步 GET 请求 (字典参数与请求方法已做底层类型强转换防护)
    var res = await axios.get("https://api.game.com/leaderboard", {
        "limit": 10,
        "season": "current"
    })
    
    loader.close()
    
    if res.ok:
        _render_leaderboard(res.data)
        GMessage.success("网络数据请求并渲染完毕！", self, 2.0)
    else:
        GMessage.error("请求失败: " + str(res.error), self)`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): preload 冗余引用与字典点语法报错
# =========================================================================
func _on_test_live_fetch() -> void:
    # ❌ 错误 1: GAxios 是全局 class_name，无需冗余 preload
    var axios_cls = preload("res://addons/gotod_ui/utils/g_axios.gd")
    var axios = axios_cls.create({"timeout": 5.0})
    
    # ❌ 错误 2: 底层直接使用 config.params 点语法访问 Dictionary 抛出运行时崩溃
    # ❌ 错误 3: method 未经 int() 转换直接传给 HTTPRequest 报错`
      },
      {
        title: '4. 游戏实战 Slot 全阶体系示例 (基础 · 中级 · 高级 · 复杂组合)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:18px; display:flex; flex-direction:column; gap:16px;">
            <!-- Tab Navigation for Slot Levels -->
            <div style="display:flex; gap:8px; border-bottom:1px solid var(--border-base); padding-bottom:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" style="height:28px; font-size:11px;" onclick="switchMemorySlotTab(0, this)">1. 🟢 基础插槽 (Basic #default)</button>
              <button class="g-btn g-btn-default" style="height:28px; font-size:11px;" onclick="switchMemorySlotTab(1, this)">2. 🟡 中级具名 (Named #header/#footer)</button>
              <button class="g-btn g-btn-default" style="height:28px; font-size:11px;" onclick="switchMemorySlotTab(2, this)">3. 🟣 高级作用域 (Scoped #card)</button>
              <button class="g-btn g-btn-default" style="height:28px; font-size:11px;" onclick="switchMemorySlotTab(3, this)">4. 🔴 复杂复合 (Complex HUD & Modal)</button>
            </div>

            <!-- Panel 0: Basic Slot -->
            <div id="memorySlotPanel0" class="memory-slot-panel" style="display:flex; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:13px; color:var(--success);">🟢 基础插槽示例：卡片内容独立封装 (Single #default Slot)</div>
              <p style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                将每张翻牌卡片作为插槽容器，默认插槽可自由放入表情、神话装备图标、贴图或动画精灵，父级无需侵入卡片内部实现。
              </p>
              <div style="display:flex; gap:12px; align-items:center;">
                <div style="width:64px; height:80px; background:linear-gradient(135deg, #1e293b, #0f172a); border:2px solid var(--primary); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;" onclick="showToast('插槽卡片：神话法杖 (+280 魔力)', 'success')">
                  <span style="font-size:24px;">🪄</span>
                  <span style="font-size:9px; color:#fcd34d; font-weight:700; margin-top:2px;">神话法杖</span>
                </div>
                <div style="width:64px; height:80px; background:linear-gradient(135deg, #1e293b, #0f172a); border:2px solid var(--warning); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;" onclick="showToast('插槽卡片：巨龙徽章 (暴击 +15%)', 'warning')">
                  <span style="font-size:24px;">🐲</span>
                  <span style="font-size:9px; color:#fcd34d; font-weight:700; margin-top:2px;">巨龙徽章</span>
                </div>
              </div>
            </div>

            <!-- Panel 1: Intermediate Named Slots -->
            <div id="memorySlotPanel1" class="memory-slot-panel" style="display:none; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:13px; color:var(--warning);">🟡 中级具名插槽示例：胜利结算弹窗全区域定制 (#header / #default / #footer)</div>
              <p style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                胜利结算对话框将顶部星级横幅 (#header)、金币经验结算数据 (#default)、双主控操作按钮 (#footer) 拆分为三大独立插槽。
              </p>
              <button class="g-btn g-btn-warning" style="align-self:flex-start;" onclick="
                openDialog('🏆 SSS级完美通关', '耗时: 24.5s | 翻牌连击: 8 Combo\\n获得: 300 EXP · 500 💰 · 记忆神石×2', '领奖并下一关', '保存战报');
              ">呼出具名插槽结算弹窗 (Show Victory Modal)</button>
            </div>

            <!-- Panel 2: Advanced Scoped Slots -->
            <div id="memorySlotPanel2" class="memory-slot-panel" style="display:none; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:13px; color:#a855f7;">🟣 高级作用域插槽示例：数据驱动网格 (#card="{ item, index, is_flipped }")</div>
              <p style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                父组件向子插槽透传实时翻面状态与连击系数，插槽内部可根据 <code>is_flipped</code> 决定是否播放流光扫光粒子或显示背面卡背。
              </p>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-default" style="height:32px; font-size:11px;" onclick="showToast('作用域插槽透传: { id: 101, flipped: true, combo: 3 }', 'info')">查看透传作用域参数 (Inspect Props)</button>
              </div>
            </div>

            <!-- Panel 3: Complex Multi-Component Slots -->
            <div id="memorySlotPanel3" class="memory-slot-panel" style="display:none; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:13px; color:var(--danger);">🔴 复杂复合插槽示例：全景 HUD + 实时抽屉 + 动态条件插槽协同</div>
              <p style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                在大型游戏中，多个组件的插槽形成联动：顶部 GNoticeBar 动态插槽广播连击 -> GContainer 复合插槽承载网格 -> GDrawer 右侧抽屉内嵌道具背包插槽。
              </p>
              <div style="display:flex; gap:8px;">
                <button class="g-btn g-btn-danger" style="height:32px; font-size:11px;" onclick="showToast('复合插槽游戏场景初始化完毕！', 'success')">体验全套复合插槽管线 (Launch Pipeline)</button>
              </div>
            </div>
          </div>
        `,
        diffTip: '💡 架构规范：通过基础默认插槽、具名插槽、作用域透传插槽与复合联动，实现高内聚低耦合的 Godot 游戏 UI。',
        code: `# =========================================================================
# 🎴 记忆大师 Slot 全阶实战代码 (Vue 3 模板与 GDScript 对齐)
# =========================================================================

# -------------------------------------------------------------------------
# 1. 🟢 基础单插槽 (Basic #default Slot)
# -------------------------------------------------------------------------
# Godot GDScript 语法:
var card = MemoryCard.new()
card.slotName = ""              # 默认 default 插槽
card.slotName.color = "gold"    # 修改默认插槽样式
card.slotName.text = "神话法杖"

# -------------------------------------------------------------------------
# 2. 🟡 中级具名插槽 (Named #header / #default / #footer Slots)
# -------------------------------------------------------------------------
# Godot GDScript 语法:
var win_dlg = GDialog.new()

# 具名头部插槽
win_dlg.slotName = "header"
win_dlg.header.text = "🏆 SSS级完美通关 (8 Combo)"
win_dlg.header.color = "gold"

# 默认正文插槽
win_dlg.slotName = ""
win_dlg.slotName.text = "获得经验: +300 EXP | 金币: +500 💰"
win_dlg.slotName.color = "white"

# 具名底部插槽
win_dlg.slotName = "footer"
win_dlg.footer.confirm_text = "下一关 ▶"
win_dlg.footer.cancel_text = "再玩一次"
win_dlg.open()

# -------------------------------------------------------------------------
# 3. 🟣 高级作用域插槽 (Scoped Slot - 自定义 slotName 绑定)
# -------------------------------------------------------------------------
# Godot GDScript 语法:
var item_slot = GCard.new()
item_slot.slotName = "t1"       # 绑定具名插槽 t1
item_slot.t1.color = "cyan"     # 动态修改 t1 插槽色彩
item_slot.t1.text = 124         # 动态赋值 t1 插槽数值/文本
item_slot.t1.visible = true

# -------------------------------------------------------------------------
# 4. 🔴 复杂复合插槽联动 (Complex Multi-Slot Pipeline)
# -------------------------------------------------------------------------
var hud = GContainer.new()
hud.slotName = "notice"
hud.notice.text = "🔥 全服双倍活动进行中！"
hud.notice.color = "orange"

hud.slotName = "bag"
hud.bag.text = "背包 (28/50)"
hud.bag.count = 28`
      },
      {
        title: '5. 🟢 基础：新手教学与记忆规则卡 (Tutorial & Rules)',
        render: `
          <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:stretch;">
            <div style="flex:1; min-width:220px; padding:16px; background:linear-gradient(145deg,#102a43,#0b1b2b); border:1px solid #2f80ed; border-radius:10px; color:#fff;">
              <div style="font-size:11px; color:#7dd3fc; font-weight:700; letter-spacing:1px;">MEMORY ACADEMY · 01</div>
              <div style="font-size:20px; font-weight:800; margin:8px 0;">记住每一对卡片</div>
              <div style="font-size:12px; color:#cbd5e1; line-height:1.7;">翻开两张卡片，找到相同图案。配对成功会锁定卡片，配对失败会自动翻回。</div>
              <div style="display:flex; gap:8px; margin-top:14px;"><span style="padding:5px 8px; border-radius:5px; background:rgba(255,255,255,.12); font-size:11px;">🎯 目标：6 对</span><span style="padding:5px 8px; border-radius:5px; background:rgba(255,255,255,.12); font-size:11px;">⏱ 90 秒</span></div>
            </div>
            <div style="flex:1; min-width:220px; padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:10px;">
              <div style="font-weight:700; margin-bottom:10px;">三步快速上手</div>
              <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;"><div>① 观察牌面，记住位置</div><div>② 点击两张相同卡片</div><div>③ 完成所有配对通关</div></div>
              <button class="g-btn g-btn-primary" style="margin-top:14px; width:100%;" onclick="showToast('教学完成！已解锁简单关卡', 'success');">完成教学并开始</button>
            </div>
          </div>
        `,
        code: `# GDScript: 新手教学状态机
class_name MemoryTutorial
extends Control

signal tutorial_finished
var step := 0

func _on_next_pressed() -> void:
    step += 1
    $StepLabel.text = "步骤 %d / 3" % step
    $Progress.value = step / 3.0 * 100.0
    if step >= 3:
        tutorial_finished.emit()
        GMessage.success("教学完成，开始第一关！")`
      },
      {
        title: '6. 🟢 基础：可复用卡片网格与翻牌状态 (Reusable Card Grid)',
        render: `
          <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;"><div><b>森林主题 · 练习关卡</b><div style="font-size:11px; color:var(--text-secondary); margin-top:3px;">点击卡片体验 flip / match / reset 状态</div></div><span id="basicMemoryScore" class="g-tag g-tag-primary">0 / 2 对</span></div>
            <div style="display:grid; grid-template-columns:repeat(4, minmax(48px,1fr)); gap:8px; max-width:400px;">
              <button class="g-btn g-btn-default" style="height:58px; font-size:23px;" onclick="this.innerText='🌲'; this.disabled=true;">?</button><button class="g-btn g-btn-default" style="height:58px; font-size:23px;" onclick="this.innerText='🌲'; this.disabled=true; document.getElementById('basicMemoryScore').innerText='1 / 2 对'; showToast('找到一对：森林树木', 'success');">?</button><button class="g-btn g-btn-default" style="height:58px; font-size:23px;" onclick="this.innerText='🦉'; this.disabled=true;">?</button><button class="g-btn g-btn-default" style="height:58px; font-size:23px;" onclick="this.innerText='🦉'; this.disabled=true; document.getElementById('basicMemoryScore').innerText='2 / 2 对'; showToast('练习完成！', 'success');">?</button>
            </div>
            <button class="g-btn g-btn-default" style="margin-top:12px;" onclick="location.reload();">重新洗牌</button>
          </div>
        `,
        code: `# GDScript: 可复用 MemoryCard 与网格
class_name MemoryBoard
extends GridContainer

var cards: Array[MemoryCard] = []
var opened: Array[MemoryCard] = []

func setup(deck: Array) -> void:
    columns = 4
    for value in deck:
        var card := MemoryCard.new()
        card.value = value
        card.flipped.connect(_on_card_flipped.bind(card))
        add_child(card)
        cards.append(card)

func _on_card_flipped(card: MemoryCard) -> void:
    opened.append(card)
    if opened.size() == 2:
        _resolve_pair.call_deferred()`
      },
      {
        title: '7. 🟡 中级：连击、提示技能与结算统计 (Combo & Skill System)',
        render: `
          <div style="padding:15px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;"><div><b style="color:var(--warning);">⚡ 限时连击挑战</b><div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">连续配对提升倍率，错误会清空连击</div></div><div style="display:flex; gap:6px;"><span class="g-tag g-tag-success">Combo <strong id="comboDemo">4</strong>x</span><span class="g-tag g-tag-warning">得分 <strong id="comboScore">1,280</strong></span></div></div>
            <div style="height:8px; background:var(--bg-card); border-radius:5px; overflow:hidden; margin:14px 0 10px;"><div id="comboProgress" style="height:100%; width:72%; background:linear-gradient(90deg,var(--warning),#f56c6c); transition:width .3s;"></div></div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;"><button id="comboSkillDemo" class="g-btn g-btn-warning" onclick="this.disabled=true; this.innerText='⏳ 冷却 5s'; let s=5; let timer=setInterval(()=>{s--;this.innerText='⏳ 冷却 '+s+'s';if(s<=0){clearInterval(timer);this.disabled=false;this.innerText='👁 透视之眼';showToast('技能恢复，可以再次使用', 'success')}},1000); showToast('已揭示两张卡片 1.5 秒', 'info');">👁 透视之眼</button><button class="g-btn g-btn-primary" onclick="let c=document.getElementById('comboDemo'); let n=Math.min(9,parseInt(c.innerText)+1); c.innerText=n; document.getElementById('comboScore').innerText=(1280+n*120).toLocaleString(); document.getElementById('comboProgress').style.width=Math.min(100,72+n*3)+'%'; showToast('完美配对！连击提升至 '+n+'x', 'success');">模拟完美配对</button><button class="g-btn g-btn-default" onclick="document.getElementById('comboDemo').innerText='0'; showToast('配对失误，连击已重置', 'warning');">模拟失误</button></div>
          </div>
        `,
        code: `# GDScript: 连击与技能冷却协作
var combo := 0
var score := 0
var peek_cd: UseCooldown

func _ready() -> void:
    peek_cd = UseCooldown.create(5.0)
    peek_cd.cooldown_finished.connect(func():
        $PeekButton.disabled = false
        $PeekButton.text = "透视之眼")

func on_pair_resolved(is_match: bool) -> void:
    combo = combo + 1 if is_match else 0
    score += 100 * maxi(combo, 1)
    $ComboLabel.text = "Combo %dx" % combo`
      },
      {
        title: '8. 🟣 高级 / 复杂：每日挑战、排行榜与断线恢复 (Live Challenge Pipeline)',
        render: `
          <div style="padding:15px; background:linear-gradient(135deg,var(--bg-surface),rgba(124,58,237,.08)); border:1px solid #8b5cf6; border-radius:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;"><div><b style="color:#a855f7;">🌌 星轨每日挑战 #1284</b><div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">挑战种子固定 · 云端保存 · 全服排名</div></div><span id="syncStatusDemo" class="g-tag g-tag-success">● 已同步</span></div>
            <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px; margin-top:14px;"><div style="padding:12px; background:var(--bg-card); border-radius:8px;"><div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);"><span>当前进度</span><span>18 / 24 对</span></div><div class="g-progress-bar" style="margin:8px 0 12px;"><div class="g-progress-fill" style="width:75%; background:#8b5cf6;"></div></div><div style="display:flex; gap:7px; flex-wrap:wrap;"><button class="g-btn g-btn-primary" onclick="let s=document.getElementById('syncStatusDemo'); s.className='g-tag g-tag-warning'; s.innerText='◌ 同步中'; setTimeout(()=>{s.className='g-tag g-tag-success';s.innerText='● 已同步';showToast('战绩已上传，当前排名 #42', 'success')},900);">上传战绩</button><button class="g-btn g-btn-default" onclick="showToast('已从云端恢复至 18 / 24 对', 'info');">恢复进度</button></div></div><div style="padding:12px; background:var(--bg-card); border-radius:8px;"><div style="font-size:12px; font-weight:700; margin-bottom:8px;">实时排行榜</div><div style="display:flex; flex-direction:column; gap:6px; font-size:11px;"><div style="display:flex; justify-content:space-between;"><span>🥇 记忆旅人</span><b>24 对 · 31.2s</b></div><div style="display:flex; justify-content:space-between;"><span>🥈 星尘猎手</span><b>24 对 · 34.8s</b></div><div style="display:flex; justify-content:space-between; color:var(--primary);"><span>🎮 你</span><b>18 对 · 52.4s</b></div></div></div></div>
          </div>
        `,
        code: `# GDScript: 每日挑战的状态机与网络恢复
enum MatchState { IDLE, PLAYING, PAUSED, SYNCING, FINISHED }
var state := MatchState.PLAYING
var challenge_seed: int

func load_daily_challenge() -> void:
    var result = await GAxios.get("/memory/daily", {"date": Time.get_date_string_from_system()})
    if result.ok:
        challenge_seed = result.data["seed"]
        _build_deck(challenge_seed)
        _restore_local_progress(result.data.get("progress", {}))

func sync_result() -> void:
    state = MatchState.SYNCING
    var result = await GAxios.post("/memory/results", {"seed": challenge_seed, "score": score})
    state = MatchState.FINISHED if result.ok else MatchState.PAUSED
    if not result.ok:
        GNotification.warning("同步失败", "结果已保存在本地，稍后自动重试")`
      }
    ]
  },

  // ========================================================
  // 0.1 独立玩法分类：从基础关卡到联机竞技
  // ========================================================
  'game-memory-campaign': {
    title: '🗺️ 基础：记忆冒险关卡地图 (Memory Campaign)',
    desc: '用 GCard、GProgress 与 GButton 组合出可解锁的章节地图，适合制作新手到正式关卡的渐进式流程。',
    demos: [{
      title: '章节地图与关卡解锁',
      render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><span>🌲 晨雾森林</span><span class="g-tag g-tag-success">3 / 5 已完成</span></div><div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;"><button class="g-btn g-btn-primary" onclick="showToast('进入第一关：森林初识', 'success')">⭐ 1 初识</button><button class="g-btn g-btn-primary" onclick="showToast('进入第二关：溪谷回声', 'success')">⭐ 2 溪谷</button><button class="g-btn g-btn-success" onclick="showToast('第三关已完成，奖励已领取', 'success')">✅ 3 古树</button><button class="g-btn g-btn-default" onclick="showToast('完成前置关卡后解锁', 'warning')">🔒 4 遗迹</button><button class="g-btn g-btn-default" onclick="showToast('完成本章后解锁', 'warning')">🔒 5 Boss</button></div><div style="margin-top:14px;" class="g-progress-bar"><div class="g-progress-fill" style="width:60%;"></div></div></div>`,
      code: `# GDScript: 章节关卡解锁
func complete_level(level_id: int) -> void:
    campaign[level_id].completed = true
    if level_id + 1 < campaign.size():
        campaign[level_id + 1].locked = false
    _save_campaign()
    GMessage.success("关卡完成，下一关已解锁！")`
    }]
  },
  'game-memory-duel': {
    title: '⚔️ 基础：双人翻牌对战 (Local Memory Duel)',
    desc: '展示本地双人轮流翻牌、回合提示与得分同步，适合快速搭建派对游戏或课堂小游戏。',
    demos: [{
      title: 'P1 vs P2 回合对战',
      render: `<div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg);"><div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;"><span class="g-tag g-tag-primary">🔵 P1  3 分</span><b style="color:var(--warning);">当前回合：P2</b><span class="g-tag g-tag-danger">🔴 P2  2 分</span></div><div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; max-width:420px; margin-top:14px;">${['🐳','🌙','🐳','🌙'].map((icon, i) => `<button class="g-btn g-btn-default" style="height:52px; font-size:20px;" onclick="this.innerText='${icon}'; showToast('P2 翻开第 ${i + 1} 张卡片', 'info');">?</button>`).join('')}</div></div>`,
      code: `# GDScript: 双人回合控制
var active_player := 0
var scores := [0, 0]

func _on_pair_resolved(matched: bool) -> void:
    if matched:
        scores[active_player] += 1
    else:
        active_player = 1 - active_player
    $TurnLabel.text = "P%d 的回合" % (active_player + 1)`
    }]
  },
  'game-memory-combo-lab': {
    title: '⚡ 中级：连击规则实验室 (Combo Rules Lab)',
    desc: '将计分规则拆成可配置策略，演示连击倍率、限时加成和失误惩罚的组合。',
    demos: [{
      title: '规则开关与实时评分预览',
      render: `<div class="sim-card" style="width:100%; max-width:620px;"><div class="sim-card-header"><b>连击规则配置</b><span id="labScore" class="g-tag g-tag-warning">当前分数：1,450</span></div><div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;"><label style="display:flex; justify-content:space-between; align-items:center;">连续配对倍率 <input id="labCombo" type="range" min="1" max="5" value="3" oninput="document.getElementById('labComboValue').innerText=this.value+'x'; document.getElementById('labScore').innerText='当前分数：'+(1000+this.value*150).toLocaleString()" style="width:55%;"><b id="labComboValue">3x</b></label><label style="display:flex; justify-content:space-between; align-items:center;">错误扣分 <input type="checkbox" checked onchange="showToast(this.checked?'已启用错误扣分':'已关闭错误扣分')"></label><button class="g-btn g-btn-primary" onclick="showToast('规则已应用到当前对局', 'success')">应用规则</button></div></div>`,
      code: `# GDScript: 可配置计分策略
class_name ScoreRules
var combo_multiplier := 3
var mismatch_penalty := 50

func calculate_pair_score(combo: int, elapsed: float) -> int:
    var speed_bonus := maxi(0, 100 - int(elapsed * 2.0))
    return (100 + speed_bonus) * mini(combo, combo_multiplier)

func on_mismatch(score: int) -> int:
    return maxi(0, score - mismatch_penalty)`
    }]
  },
  'game-memory-quest': {
    title: '📜 中级：任务链与奖励路线 (Quest & Rewards)',
    desc: '把记忆对局接入任务系统，支持阶段目标、奖励领取和任务链推进。',
    demos: [{
      title: '每日任务进度卡',
      render: `<div class="sim-card" style="width:100%; max-width:650px;"><div class="sim-card-header"><span>📜 今日记忆委托</span><span class="g-tag g-tag-success">奖励可领取</span></div><div style="display:flex; flex-direction:column; gap:12px; margin-top:15px;"><div><div style="display:flex; justify-content:space-between; font-size:12px;"><span>完成 3 次配对</span><b style="color:var(--success);">3 / 3</b></div><div class="g-progress-bar" style="margin-top:6px;"><div class="g-progress-fill" style="width:100%; background:var(--success);"></div></div></div><div><div style="display:flex; justify-content:space-between; font-size:12px;"><span>达成一次 5x 连击</span><b>4 / 5</b></div><div class="g-progress-bar" style="margin-top:6px;"><div class="g-progress-fill" style="width:80%; background:var(--warning);"></div></div></div><button class="g-btn g-btn-success" onclick="this.disabled=true; this.innerText='已领取 · +300 EXP'; showToast('任务奖励已加入背包', 'success')">领取阶段奖励 · 300 EXP</button></div></div>`,
      code: `# GDScript: 任务条件聚合
func update_memory_task(event: Dictionary) -> void:
    for task in active_tasks:
        if task.matches(event):
            task.progress = mini(task.progress + 1, task.target)
            if task.progress == task.target:
                task.state = QuestState.READY_TO_CLAIM
                GNotification.success("任务完成", task.title, self)`
    }]
  },
  'game-memory-roguelike': {
    title: '🌀 高级：随机肉鸽记忆迷宫 (Roguelike Memory Maze)',
    desc: '展示随机种子、房间分支、遗物效果与失败重开，适合构建高重复游玩价值的记忆玩法。',
    demos: [{
      title: '分支房间与遗物选择',
      render: `<div style="padding:16px; background:linear-gradient(135deg,var(--bg-surface),rgba(245,158,11,.08)); border:1px solid var(--warning); border-radius:var(--radius-lg);"><div style="display:flex; justify-content:space-between;"><b>第 4 层 · 迷雾回廊</b><span class="g-tag g-tag-warning">生命 2 / 3</span></div><div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:15px;"><button class="g-btn g-btn-default" onclick="showToast('进入精英战：卡组扩大 2 对', 'warning')">👁 精英战</button><button class="g-btn g-btn-primary" onclick="showToast('获得遗物：时间沙漏', 'success')">💎 宝藏房</button><button class="g-btn g-btn-default" onclick="showToast('恢复 1 点生命值', 'success')">🌿 休息室</button></div></div>`,
      code: `# GDScript: 随机房间生成与遗物修正
func generate_floor(seed: int, floor: int) -> Array:
    var rng := RandomNumberGenerator.new()
    rng.seed = seed + floor
    return [Room.random(rng), Room.random(rng), Room.random(rng)]

func apply_relic(relic_id: String) -> void:
    if relic_id == "hourglass":
        rules.mismatch_grace += 1
        timer.add_time(10.0)`
    }]
  },
  'game-memory-online': {
    title: '🌐 复杂：实时联机记忆竞技场 (Online Arena)',
    desc: '组合房间匹配、权威服务器、断线重连与排行榜提交，作为多人记忆游戏的完整架构起点。',
    demos: [{
      title: '房间状态与同步监控',
      render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><span>🌐 房间 ARENA-2048</span><span id="arenaState" class="g-tag g-tag-success">● 连接稳定 · 42ms</span></div><div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; margin-top:14px;"><div style="padding:12px; background:var(--bg-surface); border-radius:8px;"><div style="font-size:11px; color:var(--text-secondary);">玩家</div><b>6 / 8</b></div><div style="padding:12px; background:var(--bg-surface); border-radius:8px;"><div style="font-size:11px; color:var(--text-secondary);">服务器 Tick</div><b>20 Hz</b></div><div style="padding:12px; background:var(--bg-surface); border-radius:8px;"><div style="font-size:11px; color:var(--text-secondary);">当前回合</div><b>Round 12</b></div></div><button class="g-btn g-btn-warning" style="margin-top:14px;" onclick="let s=document.getElementById('arenaState'); s.className='g-tag g-tag-warning'; s.innerText='◌ 重连中'; setTimeout(()=>{s.className='g-tag g-tag-success';s.innerText='● 已恢复 · 45ms';showToast('已恢复房间状态，进度未丢失', 'success')},1000);">模拟断线重连</button></div>`,
      code: `# GDScript: 联机房间同步与断线恢复
@rpc("authority", "call_local", "reliable")
func submit_pair(card_a: int, card_b: int) -> void:
    if not multiplayer.is_server(): return
    var result := board.resolve_pair(card_a, card_b)
    broadcast_pair_result.rpc(result)

func _on_connection_lost() -> void:
    reconnect_timer.start()
    local_snapshot = board.create_snapshot()
    GNotification.warning("连接中断", "正在恢复对局状态...")`
    }]
  },
  'game-memory-speedrun': {
    title: '🏁 竞速：极速记忆挑战 (Speedrun)',
    desc: '限时翻牌、分段计时与最佳成绩展示，适合竞速型记忆玩法。',
    demos: [{ title: '极速计时面板', render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><b>极速挑战 · 12 对</b><span id="speedTimer" class="g-tag g-tag-danger">00:42.8</span></div><div class="g-progress-bar" style="margin:16px 0;"><div class="g-progress-fill" style="width:68%; background:var(--danger);"></div></div><button class="g-btn g-btn-danger" onclick="showToast('计时已暂停，当前成绩 00:42.8', 'warning')">暂停计时</button> <button class="g-btn g-btn-primary" onclick="showToast('新纪录！比最佳成绩快 1.2 秒', 'success')">完成本段</button></div>`, code: `# GDScript: 分段计时
var elapsed := 0.0
var best_time := INF
func _process(delta: float) -> void:
    if state == MatchState.PLAYING:
        elapsed += delta
func finish_run() -> void:
    best_time = minf(best_time, elapsed)
    GMessage.success("成绩：%.1f 秒" % elapsed)` }]
  },
  'game-memory-boss': {
    title: '🐉 Boss：巨龙记忆战 (Boss Memory Battle)',
    desc: '把配对正确率、连击和 Boss 血条结合起来，形成有阶段变化的战斗关卡。',
    demos: [{ title: 'Boss 血条与阶段技能', render: `<div class="sim-card" style="width:100%; max-width:640px;"><div class="sim-card-header"><b>🐉 远古记忆龙 · 阶段 2</b><span class="g-tag g-tag-danger">HP 62%</span></div><div class="g-progress-bar" style="margin:14px 0;"><div class="g-progress-fill" style="width:62%; background:var(--danger);"></div></div><div style="display:flex; gap:8px; flex-wrap:wrap;"><button class="g-btn g-btn-primary" onclick="showToast('配对成功，Boss 受到 180 点伤害', 'success')">配对攻击</button><button class="g-btn g-btn-warning" onclick="showToast('Boss 释放记忆迷雾：卡片暂时重排', 'warning')">触发迷雾</button></div></div>`, code: `# GDScript: Boss 阶段切换
func on_match_success(combo: int) -> void:
    boss.hp -= 60 + combo * 20
    if boss.hp_ratio < 0.5 and boss.phase == 1:
        boss.phase = 2
        board.shuffle_hidden_cards()` }]
  },
  'game-memory-story': {
    title: '📖 剧情：记忆王国冒险 (Story Adventure)',
    desc: '将对局结果接入剧情节点、对话和分支选择，让每次配对都推动故事发展。',
    demos: [{ title: '剧情节点选择', render: `<div style="padding:16px; background:linear-gradient(135deg,#312e81,#172554); border-radius:10px; color:#fff;"><div style="font-size:12px; color:#c4b5fd;">第 3 章 · 被遗忘的钟楼</div><p style="line-height:1.6;">“你记起了门上的星纹，但钟楼里还有两条路……”</p><button class="g-btn g-btn-primary" onclick="showToast('选择左侧道路：获得月光卡组', 'success')">探索左侧</button> <button class="g-btn g-btn-default" onclick="showToast('选择右侧道路：触发隐藏关卡', 'info')">探索右侧</button></div>`, code: `# GDScript: 剧情节点
func resolve_story_choice(choice: String) -> void:
    story_flags[choice] = true
    DialogueService.play("chapter_3_" + choice)
    SaveManager.checkpoint({"chapter": 3, "choice": choice})` }]
  },
  'game-memory-puzzle': {
    title: '🧩 解谜：机关卡牌迷阵 (Puzzle Grid)',
    desc: '加入锁定格、旋转机关和顺序条件，展示传统翻牌之外的解谜组合。',
    demos: [{ title: '机关网格', render: `<div style="display:grid; grid-template-columns:repeat(4,54px); gap:7px; padding:15px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:10px; width:max-content;">${['↗','🔒','↘','✦','✦','↘','🔒','↗'].map((v, i) => `<button class="g-btn g-btn-default" style="width:54px;height:54px;font-size:20px;" onclick="this.innerText=this.innerText==='?'?'${v}':'?'; showToast('机关格 ${i + 1} 已切换', 'info');">?</button>`).join('')}</div>`, code: `# GDScript: 机关解锁
func can_open_gate(sequence: Array[int]) -> bool:
    return sequence == [2, 4, 1, 3] and not gate_locked
func rotate_tile(index: int) -> void:
    tiles[index].rotation = fmod(tiles[index].rotation + 90.0, 360.0)` }]
  },
  'game-memory-collection': {
    title: '🎁 收集：卡牌图鉴与成就 (Collection Book)',
    desc: '为记忆卡片增加稀有度、图鉴收集进度和成就奖励，适合长期养成。',
    demos: [{ title: '卡牌图鉴进度', render: `<div class="sim-card" style="width:100%; max-width:620px;"><div class="sim-card-header"><span>🌌 星界图鉴</span><span class="g-tag g-tag-warning">28 / 60</span></div><div class="g-progress-bar" style="margin:14px 0;"><div class="g-progress-fill" style="width:46%; background:var(--warning);"></div></div><div style="display:flex; gap:10px; flex-wrap:wrap;"><span class="g-tag g-tag-success">✅ 森林 12/12</span><span class="g-tag g-tag-primary">进行中：星界 8/20</span><span class="g-tag">🔒 深渊 0/16</span></div><button class="g-btn g-btn-warning" style="margin-top:14px;" onclick="showToast('成就解锁：收集家 · 奖励 500 金币', 'success')">查看可领取成就</button></div>`, code: `# GDScript: 图鉴与成就
func register_card(card_id: String) -> void:
    collection[card_id] = true
    var count := collection.values().count(true)
    if count in [10, 25, 50]:
        Achievement.unlock("collector_" + str(count))` }]
  },
  'game-memory-daily': {
    title: '📅 日常：每日随机挑战 (Daily Challenge)',
    desc: '按日期生成固定牌组，提供连续签到、每日词缀和过期倒计时。',
    demos: [{ title: '每日挑战卡', render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><b>📅 8 月 31 日挑战</b><span class="g-tag g-tag-warning">剩余 08:42:15</span></div><div style="margin:14px 0; font-size:12px;">今日词缀：<span class="g-tag g-tag-primary">卡片会旋转</span> <span class="g-tag g-tag-danger">错误 -100 分</span></div><button class="g-btn g-btn-primary" onclick="showToast('已生成今日固定牌组 Seed: 831204', 'success')">生成今日牌组</button></div>`, code: `# GDScript: 日期种子
func daily_seed() -> int:
    var date := Time.get_date_dict_from_system()
    return date.year * 10000 + date.month * 100 + date.day
func build_daily_deck() -> void:
    deck.shuffle_with_seed(daily_seed())` }]
  },
  'game-memory-tournament': {
    title: '🏆 赛事：淘汰赛记忆杯 (Tournament Bracket)',
    desc: '展示报名、晋级树、轮次锁定和赛事结算，适合线上或线下记忆比赛。',
    demos: [{ title: '淘汰赛晋级树', render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><b>记忆杯 · 八强赛</b><span class="g-tag g-tag-success">Round 3</span></div><div style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:14px;"><div style="padding:10px; background:var(--bg-surface); border-left:3px solid var(--success);">神经元战队 <b>2 : 1</b><br><small>晋级半决赛</small></div><div style="padding:10px; background:var(--bg-surface);">星尘旅团 <b>1 : 2</b><br><small>等待下一场</small></div></div><button class="g-btn g-btn-warning" style="margin-top:14px;" onclick="showToast('比赛房间将在 10 秒后锁定', 'warning')">锁定比赛房间</button></div>`, code: `# GDScript: 赛事轮次
func advance_match(winner_id: String) -> void:
    bracket[current_round].winner = winner_id
    if bracket[current_round].is_complete():
        current_round += 1
        Matchmaking.open_round(current_round)` }]
  },
  'game-memory-accessibility': {
    title: '♿ 无障碍：辅助记忆模式 (Accessible Mode)',
    desc: '提供高对比度、读屏提示、减少动画和键盘操作，展示更包容的游戏 UI。',
    demos: [{ title: '辅助选项预览', render: `<div class="sim-card" style="width:100%; max-width:620px;"><div class="sim-card-header"><b>辅助记忆设置</b><span class="g-tag g-tag-success">已优化</span></div><div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;"><label style="display:flex;justify-content:space-between;">高对比度模式 <input type="checkbox" checked onchange="showToast('高对比度：'+(this.checked?'开启':'关闭'))"></label><label style="display:flex;justify-content:space-between;">读屏提示 <input type="checkbox" checked onchange="showToast('读屏提示：'+(this.checked?'开启':'关闭'))"></label><label style="display:flex;justify-content:space-between;">减少翻牌动画 <input type="checkbox" onchange="showToast('动画设置已更新')"></label></div></div>`, code: `# GDScript: 无障碍设置
func apply_accessibility(settings: Dictionary) -> void:
    ThemeManager.high_contrast = settings.get("high_contrast", false)
    board.reduced_motion = settings.get("reduced_motion", false)
    Accessibility.announce("辅助记忆模式已启用")` }]
  },
  'game-memory-replay': {
    title: '🎬 回放：对局录像分析 (Replay Viewer)',
    desc: '记录每次翻牌操作、时间线和失误位置，帮助玩家复盘并分享精彩对局。',
    demos: [{ title: '对局时间线', render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><b>对局回放 · 03:18</b><span class="g-tag g-tag-primary">第 18 / 24 对</span></div><input type="range" min="0" max="100" value="64" style="width:100%; margin:18px 0;" oninput="showToast('回放进度：'+this.value+'%')"><div style="display:flex; gap:8px;"><button class="g-btn g-btn-primary" onclick="showToast('正在播放回放', 'info')">▶ 播放</button><button class="g-btn g-btn-default" onclick="showToast('已复制回放分享链接', 'success')">分享链接</button></div></div>`, code: `# GDScript: 回放事件流
var replay_events: Array[Dictionary] = []
func record_flip(card_id: int, timestamp: float) -> void:
    replay_events.append({"card": card_id, "time": timestamp})
func seek_replay(progress: float) -> void:
    board.reset()
    for event in replay_events:
        if event.time <= progress: board.replay_flip(event.card)` }]
  },
  'game-memory-analytics': {
    title: '📊 数据：玩家行为分析 (Game Analytics)',
    desc: '把平均反应时间、错误热区和关卡流失率可视化，为难度调优提供依据。',
    demos: [{ title: '关卡数据看板', render: `<div class="sim-card" style="width:100%;"><div class="sim-card-header"><b>Level 06 数据看板</b><span class="g-tag g-tag-success">数据已更新</span></div><div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; margin-top:15px;"><div style="padding:12px;background:var(--bg-surface);border-radius:8px;"><small>通关率</small><h3 style="color:var(--success);margin:6px 0;">72.4%</h3></div><div style="padding:12px;background:var(--bg-surface);border-radius:8px;"><small>平均用时</small><h3 style="color:var(--primary);margin:6px 0;">84.2s</h3></div><div style="padding:12px;background:var(--bg-surface);border-radius:8px;"><small>错误热区</small><h3 style="color:var(--danger);margin:6px 0;">C3 / D4</h3></div></div><button class="g-btn g-btn-primary" style="margin-top:14px;" onclick="showToast('已导出 CSV 分析报告', 'success')">导出分析报告</button></div>`, code: `# GDScript: 事件埋点
func track_match(result: Dictionary) -> void:
    Analytics.track("memory_pair", {
        "level": level_id,
        "matched": result.matched,
        "reaction_ms": result.reaction_time * 1000.0,
        "position": result.position
    })` }]
  },

  // ========================================================
  // 0.2 常见问题排查与代码对比全景
  // ========================================================
  'game-troubleshooting-diff': {
    title: '🛠️ Demo 常见问题排查与修复对比 (Troubleshooting & Code Diff)',
    desc: '汇总在 gotod-components-ui-demo 实际游戏开发中发现的 8 大典型 Bug 与重构优化，提供详细的原因分析、修复前代码与修复后代码 Tab 切换对比。',
    demos: [
      {
        title: '问题 1: GDivider 垂直方向分割线坐标与尺寸计算错误',
        render: `
          <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; align-items:center; justify-content:space-around; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; height:48px;">
              <span>左侧内容</span>
              <div style="width:1px; height:32px; background:var(--border-base);"></div>
              <span>右侧内容 (垂直分割线正常居中)</span>
            </div>
            <span class="g-tag g-tag-success">✓ 坐标 size.x/2 修复完毕</span>
          </div>
        `,
        diffTip: '垂直分割线绘制时误将 X 轴中点写为 size.y / 2.0，导致在长矩形控件中线条偏移甚至不可见。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): 修正 X 轴居中与最小尺寸约束
# =========================================================================
@export_enum("HORIZONTAL", "VERTICAL") var orientation: int = Orientation.HORIZONTAL:
    set(val):
        orientation = val
        if is_node_ready():
            _update_min_size()
        queue_redraw()

func _update_min_size() -> void:
    if orientation == Orientation.HORIZONTAL:
        custom_minimum_size.y = 24
        custom_minimum_size.x = 0
        size_flags_horizontal = Control.SIZE_EXPAND_FILL
        size_flags_vertical = Control.SIZE_SHRINK_CENTER
    else:
        custom_minimum_size.x = 16
        custom_minimum_size.y = 0
        size_flags_horizontal = Control.SIZE_SHRINK_CENTER
        size_flags_vertical = Control.SIZE_EXPAND_FILL

func _draw() -> void:
    if orientation == Orientation.VERTICAL:
        var x = size.x / 2.0  # ✅ 正确计算 X 轴水平中心线
        draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): 误用 size.y 导致垂直线严重偏位
# =========================================================================
func _draw() -> void:
    if orientation == Orientation.VERTICAL:
        var x = size.y / 2.0  # ❌ 严重 Bug: 误用了 Y 轴高度来计算 X 轴坐标！
        draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)`
      },
      {
        title: '问题 2: @tool 脚本中枚举 Setter 类型冲突与 @export_enum 修复',
        render: `
          <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); font-size:12px; line-height:1.6;">
            💡 <strong>原因说明</strong>：Godot 4 的 <code>@tool</code> 模式下，直接使用 <code>@export var type: ButtonType</code> 在检查器序列化或脚本动态赋值时，易发生底层类型转换异常。<br>
            ✅ <strong>解决方案</strong>：统一改用 <code>@export_enum(...) var type: int</code>，并增加 <code>if is_node_ready():</code> 防御性判断。
          </div>
        `,
        diffTip: '影响组件：GButton, GInput, GText, GContainer, GSpace, GDivider, GFab 等。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): 规范 @export_enum 与 is_node_ready 守卫
# =========================================================================
@export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO") \\
        var button_type: int = ButtonType.DEFAULT:
    set(val):
        button_type = val
        if is_node_ready():
            _update_styles()`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): 直接使用未注解的枚举类型
# =========================================================================
@export var button_type: ButtonType = ButtonType.DEFAULT:
    set(val):
        button_type = val
        _update_styles()  # ❌ 在节点 _ready 之前调用可能引发内部子节点空引用`
      },
      {
        title: '问题 3: GFab 悬浮按钮生命周期与 Pre-ready 崩溃',
        render: `
          <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
            <span>GFab 允许在 <code>_ready()</code> 执行前调用 <code>add_action()</code> 添加操作项</span>
            <span class="g-tag g-tag-success">✓ 空容器自动延迟创建</span>
          </div>
        `,
        diffTip: '脚本在 new GFab() 后立即 add_action() 时，_menu_container 尚未 ready 导致空指针崩溃。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): 容器多重初始化守卫与安全重建
# =========================================================================
func _setup_layout() -> void:
    if _menu_container:
        return
    custom_minimum_size = Vector2(56, 56)
    # ... 构建布局容器 ...

func _rebuild_menu() -> void:
    if not _menu_container:
        _setup_layout()  # ✅ 容器不存在时立即安全初始化，允许 pre-ready 调用
    for child in _menu_container.get_children():
        child.queue_free()`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): 未做容器初始化检查
# =========================================================================
func _rebuild_menu() -> void:
    # ❌ 崩溃：若在 add_child(fab) 之前调用 add_action()，_menu_container 为 null 报错！
    for child in _menu_container.get_children():
        child.queue_free()`
      },
      {
        title: '问题 4: GRouter 场景切换死锁与场景对象释放后访问',
        render: `
          <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
            <span>GRouter 转场 Tween 信号绑定与 <code>is_instance_valid</code> 保护</span>
            <span class="g-tag g-tag-primary">✓ 杜绝 _is_transitioning 永久死锁</span>
          </div>
        `,
        diffTip: '静态 push 方法内部 await Tween 如果被外部跳过，导致状态锁无法释放；且旧场景被释放后二次访问会崩溃。',
        code: `# =========================================================================
# ✨ 修复后代码 (After / Fixed): Tween.finished 信号回调 + is_instance_valid 守卫
# =========================================================================
static func push(scene_path: String, params: Dictionary = {}, transition: TransitionType = TransitionType.SLIDE_LEFT, duration: float = 0.35, context_node: Node = null) -> Variant:
    if _is_transitioning:
        return GResult.fail("转场进行中，请勿重复调用")
    _is_transitioning = true
    # ...
    _play_transition_animation(root, next_scene, transition, duration, false, tree, func():
        _is_transitioning = false  # ✅ 确保无论何时动画完成均能可靠释放状态锁
    )
    return GResult.ok(null)

# 动画结束清理旧场景
tween.finished.connect(func():
    if old_scene and old_scene != new_scene and is_instance_valid(old_scene):
        old_scene.queue_free()  # ✅ 避免访问已销毁场景节点
    if on_finished.is_valid():
        on_finished.call()
)`,
        codeBefore: `# =========================================================================
# ❌ 修复前代码 (Before / Problematic): await 阻塞与无实例有效性校验
# =========================================================================
static func push(...) -> GResult:
    await _play_transition_animation(...)  # ❌ 如果调用方未加 await，内部逻辑可能异常断裂
    _is_transitioning = false

# ❌ 无 is_instance_valid 保护，快速连点时访问已释放的 old_scene 抛出崩溃
await tween.finished
if old_scene and old_scene != new_scene:
    old_scene.queue_free()`
      }
    ]
  },

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
