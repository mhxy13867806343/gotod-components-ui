// =========================================================================
// Gotod Components UI - Guide Catalog (Basics & Integrations)
// =========================================================================
window.GUIDE_CATALOG = window.GUIDE_CATALOG || {};
Object.assign(window.GUIDE_CATALOG, {
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

});
