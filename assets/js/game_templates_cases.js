// =========================================================================
// Gotod Components UI - Game UI Templates (Cases & Gameplay Mechanics)
// =========================================================================
window.GAME_CASES_CATALOG = {
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
};
