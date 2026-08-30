// =========================================================================
// Gotod Components UI - 10. 格式化工具、多媒体导入与转场路由 (Utils, Asset & Router)
// assets/js/utils_router_catalog.js
// 包含: GFormat 格式化 + GAsset 资源导入 + GRouter 转场路由 + GLifecycleGuard 生命周期安全校验
// =========================================================================

// State for GFormat Interactive Demo
window.simFormatState = {
  hp: 750,
  maxHp: 1000,
  seconds: 3665,
  number: 1450000
};

window.updateSimHpFormat = function(val) {
  window.simFormatState.hp = parseInt(val);
  const hp = window.simFormatState.hp;
  const max = window.simFormatState.maxHp;
  const pct = (hp / max) * 100;

  const bar = document.getElementById('simFormatHpBar');
  const text = document.getElementById('simFormatHpText');
  const tag = document.getElementById('simFormatHpTag');
  const code = document.getElementById('simFormatHpCode');

  let color = '#18a058';
  let tagText = '健康 (Safe)';
  let tagType = 'success';

  if (pct < 30) {
    color = '#d03050';
    tagText = '濒死 (Critical)';
    tagType = 'danger';
  } else if (pct < 65) {
    color = '#f0a020';
    tagText = '受创 (Warning)';
    tagType = 'warning';
  }

  if (bar) {
    bar.style.width = pct + '%';
    bar.style.background = color;
  }
  if (text) text.innerText = `${hp} / ${max} (${pct.toFixed(0)}%)`;
  if (tag) {
    tag.className = `g-tag g-tag-${tagType}`;
    tag.innerText = tagText;
  }
  if (code) {
    code.innerText = `var color: Color = GFormat.hp_color(${hp}, ${max}) # 返回 ${color}`;
  }
};

window.updateSimTimeFormat = function(sec) {
  const s = parseInt(sec) || 0;
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const fmt1 = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const fmt2 = `${hrs > 0 ? hrs + '小时' : ''}${mins}分${secs}秒`;

  const outElem = document.getElementById('simFormatTimeOut');
  if (outElem) outElem.innerText = `时分秒: ${fmt1}  |  中文单位: ${fmt2}`;
};

// Lifecycle Guard Simulator
window.simTestLifecycleCall = function(isValid) {
  const outBox = document.getElementById('simLifecycleGuardOutput');
  if (!outBox) return;

  if (isValid) {
    const res = {
      success: true,
      error_code: "OK",
      message: "✅ 生命周期状态正常 (Node.is_inside_tree() == true)",
      hint: "",
      data: { "action": "GRouter.push", "target": "res://scenes/shop.tscn" }
    };
    outBox.innerHTML = `<span style="color:var(--success); font-weight:700;">[Godot Engine OK] API 校验通过:</span>\n` + JSON.stringify(res, null, 2);
    showToast('✅ [生命周期正常] API 安全执行成功！', 'success');
  } else {
    const errRes = {
      success: false,
      error_code: "ERR_NOT_IN_SCENETREE",
      message: "❌ [GotodUI 生命周期异常] API 'GRouter.push' 必须在 Godot 节点生命周期内调用！当前节点 'UnmountedActor' 尚未挂载到场景树 (is_inside_tree == false)。",
      hint: "请确保在 Node 的 '_ready()'、'_process()' 或通过 'add_child()' 挂载后再调用此 API；切勿在 '_init()' 中调用 UI/路由操作。",
      data: null
    };
    outBox.innerHTML = `<span style="color:var(--danger); font-weight:700;">[Godot Engine push_error] 捕获生命周期异常:</span>\n` + JSON.stringify(errRes, null, 2);
    showToast('❌ [生命周期异常拦截] 请在 _ready() 或挂载节点中调用！', 'danger');
  }
};

// State for GRouter Interactive Viewport Simulator
window.simRouterState = {
  history: ['res://scenes/main_menu.tscn'],
  currentParams: {},
  currentPage: 'main_menu'
};

window.simRouterPush = function(mode) {
  const transition = document.getElementById('simRouterAnimSelect') ? document.getElementById('simRouterAnimSelect').value : 'slide_left';
  const viewport = document.getElementById('simRouterScreen');
  if (!viewport) return;

  // Setup Outgoing & Incoming animation classes
  let animOutClass = 'anim-slide-left-out';
  let animInClass = 'anim-slide-left-in';

  if (transition === 'slide_right') {
    animOutClass = 'anim-slide-right-out';
    animInClass = 'anim-slide-right-in';
  } else if (transition === 'slide_up') {
    animOutClass = 'anim-slide-up-out';
    animInClass = 'anim-slide-up-in';
  } else if (transition === 'slide_down') {
    animOutClass = 'anim-slide-down-out';
    animInClass = 'anim-slide-down-in';
  } else if (transition === 'zoom_in' || transition === 'zoom_center') {
    animOutClass = 'anim-zoom-center-out';
    animInClass = 'anim-zoom-in';
  } else if (transition === 'zoom_out') {
    animOutClass = 'anim-zoom-center-out';
    animInClass = 'anim-zoom-out';
  } else if (transition === 'zoom_bounce') {
    animOutClass = 'anim-fade-out';
    animInClass = 'anim-zoom-bounce';
  } else if (transition === 'fade') {
    animOutClass = 'anim-fade-out';
    animInClass = 'anim-fade-in';
  }

  const oldPage = viewport.querySelector('.sim-page-active');
  if (oldPage) {
    oldPage.className = `sim-page ${animOutClass}`;
    setTimeout(() => oldPage.remove(), 350);
  }

  const newPage = document.createElement('div');
  newPage.className = `sim-page ${animInClass} sim-page-active`;

  if (mode === 'batch_20') {
    newPage.innerHTML = `
      <div style="background:#15121e; height:100%; padding:10px 14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:#ba55d3; font-size:12px;">📊 结算统计 (20+ 批量参数全量遍历)</span>
            <span class="g-tag g-tag-primary" style="font-size:9px;">for key in params</span>
          </div>
          <div style="margin-top:6px; max-height:92px; overflow-y:auto; padding:6px 8px; background:rgba(0,0,0,0.4); border-radius:6px; font-size:10px; line-height:1.4; color:#e0e0e0; display:flex; flex-direction:column; gap:2px;">
            <div>• <span style="color:#ffd04b;">hero_name</span>: 狂剑士·阿尔法</div>
            <div>• <span style="color:#ffd04b;">level</span>: Lv.85 | <span style="color:#ffd04b;">hp</span>: 14200/14200</div>
            <div>• <span style="color:#ffd04b;">atk</span>: 3850 | <span style="color:#ffd04b;">def</span>: 1920</div>
            <div>• <span style="color:#ffd04b;">crit_rate</span>: 68.5% | <span style="color:#ffd04b;">crit_dmg</span>: 245%</div>
            <div>• <span style="color:#ffd04b;">exp_gained</span>: +85,000 | <span style="color:#ffd04b;">gold</span>: +12,400</div>
            <div>• <span style="color:#ffd04b;">stage_id</span>: 108 | <span style="color:#ffd04b;">difficulty</span>: Hell</div>
            <div>• <span style="color:#ffd04b;">clear_time</span>: 02:45 | <span style="color:#ffd04b;">rank</span>: SSS</div>
            <div>• <span style="color:#ffd04b;">loot_count</span>: 18 件战利品</div>
          </div>
        </div>
        <button class="g-btn g-btn-default" style="width:100%; height:26px; font-size:10px;" onclick="simRouterBack()">
          ◀ GRouter.back() 返回主界面
        </button>
      </div>
    `;
    showToast('【GRouter】已传递 20+ 个参数，目标页面通过 for 循环与反射自动全量装配！', 'success');
  } else if (mode === 'params') {
    newPage.innerHTML = `
      <div style="background:#1e1e28; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:var(--danger); font-size:13px;">⚔️ 战场关卡 (res://scenes/battle.tscn)</span>
            <span class="g-tag g-tag-danger" style="font-size:9px;">基础参数路由</span>
          </div>
          <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.3); border-radius:6px; font-size:11px; line-height:1.5;">
            <div style="color:var(--text-secondary); margin-bottom:4px;">GRouter.get_params() 接收到的数据:</div>
            <div>• 关卡 ID: <strong style="color:var(--primary);">108</strong></div>
            <div>• 遭遇 Boss: <strong style="color:var(--danger);">深渊魔龙 (Lv.80)</strong></div>
            <div>• 难度: <span class="g-tag g-tag-warning" style="font-size:9px;">Hell 地狱</span></div>
          </div>
        </div>
        <button class="g-btn g-btn-default" style="width:100%; height:30px; font-size:11px;" onclick="simRouterBack()">
          ◀ GRouter.back() 返回主界面
        </button>
      </div>
    `;
    showToast(`【GRouter】已通过 [${transition}] 动画跳转至新页面！`, 'success');
  } else {
    newPage.innerHTML = `
      <div style="background:#1a221d; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:var(--success); font-size:13px;">🛒 道具商城 (res://scenes/shop.tscn)</span>
            <span class="g-tag g-tag-success" style="font-size:9px;">极简无参路由</span>
          </div>
          <p style="font-size:11px; color:var(--text-secondary); margin-top:8px;">
            通过默认向左滑动动画进入商城场景。
          </p>
        </div>
        <button class="g-btn g-btn-default" style="width:100%; height:30px; font-size:11px;" onclick="simRouterBack()">
          ◀ GRouter.back() 返回主菜单
        </button>
      </div>
    `;
    showToast(`【GRouter】已通过 [${transition}] 动画跳转至新页面！`, 'success');
  }

  viewport.appendChild(newPage);
  window.simRouterState.history.push(mode);
};

window.simRouterBack = function() {
  const viewport = document.getElementById('simRouterScreen');
  if (!viewport) return;

  const oldPage = viewport.querySelector('.sim-page-active');
  if (oldPage) {
    oldPage.className = 'sim-page anim-slide-right-out';
    setTimeout(() => oldPage.remove(), 350);
  }

  const menuPage = document.createElement('div');
  menuPage.className = 'sim-page anim-slide-right-in sim-page-active';
  menuPage.innerHTML = `
    <div style="background:#16161a; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px; box-sizing:border-box;">
      <div style="font-size:1.8rem; color:var(--primary);">🎮</div>
      <div style="font-weight:700; font-size:13px;">游戏主菜单 (Main Scene)</div>
      <div style="font-size:11px; color:var(--text-secondary);">点击左侧按钮体验转场</div>
    </div>
  `;
  viewport.appendChild(menuPage);
  showToast('【GRouter】已返回上一场景', 'info');
};

window.UTILS_ROUTER_CATALOG = {
  // --------------------------------------------------------
  // 1. GRouter 页面路由与转场动画
  // --------------------------------------------------------
  'util-router': {
    title: '🚀 GRouter (页面路由跳转与向左滑动转场动画)',
    desc: '面向 Godot 4 游戏多场景切换的路由管理器。支持极简无参跳转、携带 20+ 个复杂业务参数批量遍历注入、默认向左推入滑动 (Slide Left) 动画、淡入淡出、以及返回传参。',
    demos: [
      {
        title: '多场景转场动画与参数传递演练 (Interactive Route Sandbox)',
        render: `
          <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; width:100%;">
            
            <!-- Left: Route Controls -->
            <div style="display:flex; flex-direction:column; gap:12px; background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius);">
              <div>
                <label style="font-size:12px; font-weight:600;">选择转场动画类型 (Transition Type):</label>
                <select id="simRouterAnimSelect" class="select-theme" style="width:100%; height:32px; margin-top:4px;">
                  <option value="slide_left" selected>👈 1. 从右向左滑向中间 (Slide Left to Center - 默认)</option>
                  <option value="slide_right">👉 2. 从左向右滑向中间 (Slide Right to Center)</option>
                  <option value="slide_up">👆 3. 从底部向上滑向中间 (Slide Up to Center)</option>
                  <option value="slide_down">👇 4. 从顶部向下滑向中间 (Slide Down to Center)</option>
                  <option value="zoom_in">🔍 5. 中心从小放大展开 (Zoom In: 0.01 ➔ 1.0)</option>
                  <option value="zoom_out">🔎 6. 远景由大缩小汇聚 (Zoom Out: 2.0 ➔ 1.0)</option>
                  <option value="zoom_bounce">🔮 7. Q弹果冻弹性缩放 (Jelly Spring Bounce)</option>
                  <option value="fade">🌫️ 8. 经典淡入淡出 (Fade In/Out)</option>
                </select>
              </div>

              <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
                <button class="g-btn g-btn-primary" style="height:32px; font-size:12px; justify-content:center;" onclick="simRouterPush('simple')">
                  <i class="fa-solid fa-arrow-right"></i> 1. 极简跳转 (仅传路径): GRouter.push("shop.tscn")
                </button>
                <button class="g-btn g-btn-warning" style="height:32px; font-size:12px; justify-content:center;" onclick="simRouterPush('params')">
                  <i class="fa-solid fa-arrow-right-to-bracket"></i> 2. 常规传参跳转: GRouter.push("battle.tscn", {...})
                </button>
                <button class="g-btn g-btn-success" style="height:32px; font-size:12px; justify-content:center;" onclick="simRouterPush('batch_20')">
                  <i class="fa-solid fa-list-check"></i> 3. 批量 20+ 业务参数全量注入与 for 遍历
                </button>
              </div>
            </div>

            <!-- Right: Simulated Game Screen Viewport -->
            <div style="display:flex; flex-direction:column; gap:8px; align-items:center;">
              <div style="font-size:12px; font-weight:700; color:var(--text-secondary);">
                游戏视口转场动画实时预览:
              </div>
              
              <!-- Screen Container -->
              <div id="simRouterScreen" style="width:280px; height:180px; background:#000; border:2px solid var(--border-base); border-radius:10px; overflow:hidden; position:relative; box-shadow:var(--shadow-lg);">
                <div class="sim-page sim-page-active" style="background:#16161a; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px; box-sizing:border-box;">
                  <div style="font-size:1.8rem; color:var(--primary);">🎮</div>
                  <div style="font-weight:700; font-size:13px;">游戏主菜单 (Main Scene)</div>
                  <div style="font-size:11px; color:var(--text-secondary);">点击左侧按钮体验转场</div>
                </div>
              </div>
            </div>

          </div>
        `,
        code: `# =========================================================================
# GRouter 极简调用、4 向滑入转场与 20+ 个批量参数处理 (GDScript 4.x)
# =========================================================================

# ---------------------------------------------------------
# A. 4 大方向往中间滑入与 3 大中心缩放转场:
# ---------------------------------------------------------
# 1. 默认：从右向左滑入中间
GRouter.push("res://scenes/shop.tscn")

# 2. 从左向右滑入中间
GRouter.push("res://scenes/hero_detail.tscn", {}, GRouter.TransitionType.SLIDE_RIGHT)

# 3. 从底部向上滑入中间 (抽屉/弹窗风格)
GRouter.push("res://scenes/bag_modal.tscn", {}, GRouter.TransitionType.SLIDE_UP)

# 4. 从顶部向下滑入中间 (公告/横幅风格)
GRouter.push("res://scenes/announcement.tscn", {}, GRouter.TransitionType.SLIDE_DOWN)

# 5. 中心从小放大展开 (Zoom In: 0.01 ➔ 1.0)
GRouter.push("res://scenes/boss_battle.tscn", {}, GRouter.TransitionType.ZOOM_IN)

# 6. 远景由大缩小汇聚 (Zoom Out: 2.0 ➔ 1.0 远景拉近)
GRouter.push("res://scenes/world_map.tscn", {}, GRouter.TransitionType.ZOOM_OUT)

# 7. Q弹果冻弹性缩放 (Jelly Spring Bounce 强化弹窗)
GRouter.push("res://scenes/reward_dialog.tscn", {}, GRouter.TransitionType.ZOOM_BOUNCE)

# ---------------------------------------------------------
# B. 跳转页面并传递 20+ 个复杂业务参数 (发送端)
# ---------------------------------------------------------
GRouter.push("res://scenes/settlement.tscn", {
    "hero_name": "狂剑士·阿尔法",
    "level": 85,
    "hp": 14200, "max_hp": 14200,
    "mp": 3600,  "max_mp": 3600,
    "atk": 3850, "def": 1920,
    "crit_rate": 0.685, "crit_dmg": 2.45,
    "exp_gained": 85000, "gold_gained": 12400,
    "stage_id": 108, "difficulty": "Hell",
    "clear_time_sec": 165, "rank": "SSS",
    "loot_items": ["神圣誓约之刃+12", "神话强化石x5", "暗金宝箱x2"]
})

# ---------------------------------------------------------
# B. 目标页面 _ready() 中处理 20+ 个参数的 4 种最佳方式 (接收端)
# ---------------------------------------------------------
func _ready() -> void:
    var params: Dictionary = GRouter.get_params()

    # 方式 1:【for 循环遍历】全量键值对遍历 (最通用，打印或批量建 UI)
    for key in params:
        var val = params[key]
        print("📦 路由参数 [%s] = %s" % [key, str(val)])

    # 方式 2:【一键反射自动赋值】自动给当前脚本同名变量赋值 (极力推荐！)
    # 只要当前脚本定义了 var hp, var atk, var stage_id, var rank 等变量，
    # 这一行代码即可把 20 个参数自动装配到脚本变量中，无需手写 20 行代码！
    var injected_count: int = GRouter.apply_params_to(self)
    print("✅ 已自动反射装配 %d 个变量到当前场景脚本" % injected_count)

    # 方式 3:【字典合并】直接覆盖合并到本地状态字典
    # local_state.merge(params, true)

    # 方式 4:【数组循环】遍历数组型列表数据 (如战利品列表)
    for item_name in params.get("loot_items", []):
        var badge = GTag.new()
        badge.text = item_name
        $LootContainer.add_child(badge)`
      }
    ],
    props: [
      { name: 'TransitionType.SLIDE_LEFT', desc: '👈 从右向左滑向中间 (默认向左推入)', type: 'TransitionType', default: '0' },
      { name: 'TransitionType.SLIDE_RIGHT', desc: '👉 从左向右滑向中间 (向右推入)', type: 'TransitionType', default: '1' },
      { name: 'TransitionType.SLIDE_UP', desc: '👆 从底部向上滑向中间 (抽屉/Modal 弹窗风格)', type: 'TransitionType', default: '2' },
      { name: 'TransitionType.SLIDE_DOWN', desc: '👇 从顶部向下滑向中间 (系统公告/全服横幅风格)', type: 'TransitionType', default: '3' },
      { name: 'TransitionType.ZOOM_IN', desc: '🔍 从屏幕中心从小放大展开 (0.01 ➔ 1.0，Boss登场/关卡进入)', type: 'TransitionType', default: '4' },
      { name: 'TransitionType.ZOOM_OUT', desc: '🔎 从远景由大缩小汇聚 (2.0 ➔ 1.0 远景聚焦拉近)', type: 'TransitionType', default: '5' },
      { name: 'TransitionType.ZOOM_BOUNCE', desc: '🔮 Q弹果冻弹性缩放 (带 TRANS_BACK 物理回弹，抽卡/开箱奖励)', type: 'TransitionType', default: '6' },
      { name: 'TransitionType.FADE', desc: '🌫️ 经典透明度淡入淡出 (黑屏切换/章节更替)', type: 'TransitionType', default: '7' },
      { name: 'TransitionType.NONE', desc: '⚡ 无转场动画瞬间切换', type: 'TransitionType', default: '8' }
    ],
    methods: [
      {
        name: 'GRouter.push(scene_path, params?, transition?, duration?, context_node?)',
        desc: '跳转到目标场景。除 scene_path 必传外其余参数全部可选，自动播放对应转场动画并安全挂载。',
        params: 'scene_path: String, params: Dict = {}, transition: Enum = SLIDE_LEFT, duration: float = 0.35, node: Node = null -> GResult'
      },
      {
        name: 'GRouter.back(result_data?, duration?, context_node?)',
        desc: '返回上一场景。支持携带返回结果字典回传给上一页面，自动反向播放转场过渡。',
        params: 'result_data: Dict = {}, duration: float = 0.3, node: Node = null -> void'
      },
      {
        name: 'GRouter.get_params()',
        desc: '在目标页面 _ready() 中提取当前路由传递过来的全部参数字典。',
        params: '() -> Dictionary'
      },
      {
        name: 'GRouter.get_param(key, default_val?)',
        desc: '提取指定键名的单个路由参数，若不存在则返回 default_val。',
        params: 'key: String, default_val: Variant = null -> Variant'
      },
      {
        name: 'GRouter.apply_params_to(target_object)',
        desc: '🌟 一键反射自动装配：自动将 20+ 个路由参数按同名匹配反射赋值给当前对象 (如传入 self)，免去手动写 20 行赋值代码。',
        params: 'target_object: Object -> int (成功赋值的变量数)'
      }
    ]
  },

  // --------------------------------------------------------
  // 2. GLifecycleGuard 生命周期安全校验与异常拦截
  // --------------------------------------------------------
  'util-lifecycle-guard': {
    title: '🛡️ GLifecycleGuard (API 生命周期强校验与异常拦截器)',
    desc: '强校验所有 API 方法必须在 Godot 节点合法生命周期（`_ready()`、`_process()` 或 `is_inside_tree() == true`）中调用。若非法调用，主动触发 Godot `push_error` 异常并在返回结果中提示开发者与用户！',
    demos: [
      {
        title: '生命周期异常拦截与 GResult 返回演练',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:600px;">
            
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-danger" style="flex:1; height:34px; font-size:12px; font-weight:700;" onclick="simTestLifecycleCall(false)">
                <i class="fa-solid fa-triangle-exclamation"></i> 模拟脱离生命周期非法调用 (Out of Lifecycle)
              </button>
              <button class="g-btn g-btn-success" style="flex:1; height:34px; font-size:12px; font-weight:700;" onclick="simTestLifecycleCall(true)">
                <i class="fa-solid fa-circle-check"></i> 模拟在 _ready() 正常调用 (Inside Lifecycle)
              </button>
            </div>

            <!-- JSON Output Box -->
            <pre class="code-box" style="margin:0; max-height:220px; overflow-y:auto;"><code id="simLifecycleGuardOutput" style="font-family:var(--font-mono); font-size:11px;">点击上方按钮模拟生命周期校验拦截...</code></pre>

          </div>
        `,
        code: `# GDScript: 生命周期异常防御与统一返回值机制

# 1. 业务脚本中调用 API 时传入 self 节点:
func _ready() -> void:
    # 挂载在场景树中，调用成功返回 GResult.ok
    var result: GResult = GRouter.push("res://scenes/shop.tscn", {}, GRouter.TransitionType.SLIDE_LEFT, 0.35, self)
    if not result.success:
        GMessage.error("跳转失败: " + result.message, self)

# 2. 如果在 _init() 或未挂载的裸对象中非法调用:
func _init() -> void:
    # ❌ 触发 Godot 异常: push_error("API 'GRouter.push' 必须在生命周期内调用...")
    # 并返回带有清晰排查指引的 GResult.fail 对象给用户
    var result = GRouter.push("res://scenes/shop.tscn", {}, GRouter.TransitionType.SLIDE_LEFT, 0.35, self)
    print("错误码:", result.error_code, "修复建议:", result.hint)`
      }
    ]
  },

  // --------------------------------------------------------
  // 3. GFormat 格式化工具类 (HP颜色/时间/数值/词条/BBCode/文件大小)
  // --------------------------------------------------------
  'util-format': {
    title: '🎨 GFormat (HP血量颜色、时间戳、万/亿大数值、BBCode 与数据格式化)',
    desc: '全能游戏 UI 格式化工具库。提供 HP 动态渐变色、秒数转时分秒/中文、相对时间（刚刚/5分钟前）、英文 K/M/B 与中文 万/亿 大数值缩写、词条加成正负着色、装备品阶富文本 BBCode 包装、以及人类可读文件与下载速率转换。',
    demos: [
      {
        title: '1. HP 动态血量颜色与时间倒计时演练 (HP Gradient & Duration)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:620px;">
            
            <!-- HP Color Format Sandbox -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:700;">❤️ HP 动态血量颜色算法 (拖动滑块查看渐变):</span>
                <span id="simFormatHpTag" class="g-tag g-tag-success" style="font-size:10px; font-weight:700;">健康 (Safe)</span>
              </div>
              <input type="range" min="0" max="1000" value="750" style="width:100%;" oninput="updateSimHpFormat(this.value)">
              
              <!-- Progress Bar -->
              <div style="height:12px; background:rgba(255,255,255,0.08); border-radius:6px; overflow:hidden;">
                <div id="simFormatHpBar" style="width:75%; height:100%; background:#18a058; transition:all 0.15s ease;"></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
                <span>当前 HP: <strong id="simFormatHpText" style="color:var(--text-primary);">750 / 1000 (75%)</strong></span>
                <span id="simFormatHpCode" style="font-family:var(--font-mono); color:var(--primary);">GFormat.hp_color(750, 1000)</span>
              </div>
            </div>

            <!-- Time Format Sandbox -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px;">
              <span style="font-size:12px; font-weight:700;">⏱️ 秒数与时间格式化:</span>
              <div style="display:flex; gap:10px; align-items:center;">
                <input type="number" value="3665" class="g-input" style="width:140px; height:32px;" oninput="updateSimTimeFormat(this.value)" placeholder="输入秒数...">
                <span style="font-size:12px; color:var(--text-secondary);">秒</span>
              </div>
              <div id="simFormatTimeOut" style="font-family:var(--font-mono); font-size:12px; color:var(--primary); font-weight:700;">
                时分秒: 01:01:05  |  中文单位: 1小时1分5秒
              </div>
            </div>

          </div>
        `,
        code: `# =========================================================================
# HP 动态血量颜色与时间格式化 (GDScript 4.x)
# =========================================================================

# 1. 动态 HP 颜色 (自动在健康绿 #18a058、警告黄 #f0a020、濒死红 #d03050 间计算)
var bar_color: Color = GFormat.hp_color(player.hp, player.max_hp)
hp_progress_bar.modulate = bar_color
hp_status_label.text = GFormat.hp_status_text(player.hp, player.max_hp) # "健康" / "受创" / "濒死"

# 2. 格式化游戏时长与倒计时 (秒 -> 字符串)
var time_str = GFormat.duration(3665)         # 返回 "01:01:05"
var cn_str   = GFormat.duration(3665, true)   # 返回 "1小时1分5秒"
var cd_str   = GFormat.cooldown(4.8)          # 返回 "4.8s" (技能冷却)

# 3. 友好相对时间
var rel_time = GFormat.relative_time(1788000000) # 返回 "刚刚" / "5分钟前" / "昨天"`
      },
      {
        title: '2. 货币战力、万/亿大数值与千分位 (Currency, K/M/B & Chinese Numbers)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:700;">🔢 输入大数值 (金币 / 伤害 / 战力):</span>
              <span class="g-tag g-tag-primary">实时算法转换</span>
            </div>

            <input type="number" id="simFormatInputVal" class="g-input" value="14580000" style="width:100%; height:34px; font-size:14px; font-weight:700; font-family:var(--font-mono);" oninput="
              const val = parseFloat(this.value) || 0;
              
              // K/M/B
              let compact = val.toString();
              if (Math.abs(val) >= 1e9) compact = (val / 1e9).toFixed(2) + 'B';
              else if (Math.abs(val) >= 1e6) compact = (val / 1e6).toFixed(2) + 'M';
              else if (Math.abs(val) >= 1e3) compact = (val / 1e3).toFixed(1) + 'K';
              
              // 中文 万/亿
              let cnNum = val.toString();
              if (Math.abs(val) >= 1e11) cnNum = (val / 1e11).toFixed(2) + '万亿';
              else if (Math.abs(val) >= 1e8) cnNum = (val / 1e8).toFixed(2) + '亿';
              else if (Math.abs(val) >= 1e4) cnNum = (val / 1e4).toFixed(2) + '万';
              
              // 千分位
              const comma = Number(val).toLocaleString('en-US');
              // 街机得分 8位补零
              const score = String(Math.floor(val)).padStart(8, '0');

              document.getElementById('simOutCompact').innerText = compact;
              document.getElementById('simOutChinese').innerText = cnNum;
              document.getElementById('simOutComma').innerText = comma;
              document.getElementById('simOutScore').innerText = score;
            ">

            <!-- Result Cards Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:4px;">
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">英文缩写 (compact_number):</div>
                <div id="simOutCompact" style="font-size:1.2rem; font-weight:800; color:var(--primary); margin-top:2px;">14.58M</div>
              </div>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">中文缩写 (chinese_number):</div>
                <div id="simOutChinese" style="font-size:1.2rem; font-weight:800; color:var(--warning); margin-top:2px;">1458.00万</div>
              </div>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">千分位逗号 (comma_number):</div>
                <div id="simOutComma" style="font-size:1.2rem; font-weight:800; color:var(--success); margin-top:2px;">14,580,000</div>
              </div>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">街机8位得分 (score_pad):</div>
                <div id="simOutScore" style="font-size:1.2rem; font-weight:800; color:#ba55d3; margin-top:2px; font-family:var(--font-mono);">14580000</div>
              </div>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 大数值、战力、金币与中文单位缩写实战 (GDScript 4.x)
# =========================================================================

# 1. 英文 K/M/B 大数值精简 (用于 HUD 界面紧凑显示)
var k_val = GFormat.compact_number(12500)       # => "12.5K"
var m_val = GFormat.compact_number(14580000)    # => "14.58M"
var b_val = GFormat.compact_number(2500000000)  # => "2.50B"

# 2. 中文 万/亿/万亿 大数值精简 (符合国内 RPG 手游习惯)
var cn_w = GFormat.chinese_number(14580000)     # => "1458.00万"
var cn_y = GFormat.chinese_number(250000000)    # => "2.50亿"

# 3. 金币与伤害千分位逗号 (让大数字一目了然)
var coin_str = GFormat.comma_number(14580000)   # => "14,580,000"

# 4. 街机像素游戏固定位补零得分 (Score Pad)
var score_str = GFormat.score_pad(450, 8)       # => "00000450"`
      },
      {
        title: '3. 装备品阶富文本 BBCode、词条加成与文件网络大小',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="font-size:12px; font-weight:700;">💎 装备品质炫彩富文本 (bb_item_quality) & 词条增益 (stat_modifier):</div>

            <!-- Rich item preview box -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:12px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:14px; font-weight:800; color:#ffd04b;">[传说] 灭世天罚重剑 +15</span>
                <span class="g-tag g-tag-warning" style="font-size:10px;">品阶: 4 (传说金)</span>
              </div>
              <div style="font-size:11px; line-height:1.6; color:#dcdcdc;">
                <div>• 基础攻击力: <span style="color:#67c23a; font-weight:700;">+1,480</span> (GFormat.stat_modifier(1480))</div>
                <div>• 暴击伤害加成: <span style="color:#67c23a; font-weight:700;">+35.5%</span> (GFormat.stat_modifier(0.355, true))</div>
                <div>• 移动速度减益: <span style="color:#f56c6c; font-weight:700;">-12</span> (GFormat.stat_modifier(-12))</div>
              </div>
            </div>

            <!-- File Size & Network Speed Box -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:4px;">
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">📦 存档文件大小 (file_size):</div>
                <div style="font-size:13px; font-weight:700; color:var(--primary); margin-top:2px;">1548576 字节 ➔ 1.48 MB</div>
              </div>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">⚡ 实时下载网速 (speed_rate):</div>
                <div style="font-size:13px; font-weight:700; color:var(--success); margin-top:2px;">3450000 字节/s ➔ 3.29 MB/s</div>
              </div>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 富文本 BBCode、词条加成与文件/网络大小格式化 (GDScript 4.x)
# =========================================================================

# 1. 装备品质富文本自动着色 (支持 0:白 1:绿 2:蓝 3:紫 4:金 5:红神话)
var item_bbcode = GFormat.bb_item_quality("灭世天罚重剑+15", 4)
$RichTextLabel.text = item_bbcode # 自动生成 [b][color=#ffd04b]灭世天罚重剑+15[/color][/b]

# 2. 词条增益正负自动带符号 (+ / -)
var atk_bonus = GFormat.stat_modifier(1480)         # => "+1480"
var crit_bonus = GFormat.stat_modifier(0.355, true) # => "+35.5%"
var speed_debuff = GFormat.stat_modifier(-12)       # => "-12"

# 3. 动态属性颜色 (正收益返回绿, 负减益返回红)
var color_atk = GFormat.stat_color(1480) # Color("#67c23a")
var color_spd = GFormat.stat_color(-12)  # Color("#f56c6c")

# 4. 文件与资源包大小 (用于更新进度条、存档管理)
var save_size_str = GFormat.file_size(1548576)      # => "1.48 MB"
var dlc_size_str  = GFormat.file_size(3450000000)   # => "3.21 GB"

# 5. 下载/传输速率
var speed_str = GFormat.speed_rate(3450000)         # => "3.29 MB/s"

# 6. 字符串超长截断与脱敏
var title_sub = GFormat.truncate("超长传说级魔剑神器描述文本", 6) # => "超长传说级..."
var safe_phone = GFormat.mask_phone("13812345678")                # => "138****5678"`
      }
    ],
    methods: [
      {
        name: 'GFormat.hp_color(current_hp, max_hp)',
        desc: '根据血量百分比动态计算健康绿 (#18a058)、受创黄 (#f0a020)、濒死红 (#d03050)。',
        params: 'current_hp: float, max_hp: float -> Color'
      },
      {
        name: 'GFormat.hp_status_text(current_hp, max_hp)',
        desc: '获取血量当前状态文本（"健康" / "良好" / "受创" / "濒死" / "阵亡"）。',
        params: 'current_hp: float, max_hp: float -> String'
      },
      {
        name: 'GFormat.duration(seconds, chinese_unit?)',
        desc: '将秒数转为标准时分秒 "01:05:30" 或中文 "1小时5分30秒"。',
        params: 'seconds: float, chinese_unit: bool = false -> String'
      },
      {
        name: 'GFormat.cooldown(seconds)',
        desc: '将秒数转为技能冷却文本（如 4.8 -> "4.8s", 0 -> "Ready"）。',
        params: 'seconds: float -> String'
      },
      {
        name: 'GFormat.relative_time(unix_timestamp)',
        desc: '将 Unix 时间戳转为友好相对时间（"刚刚" / "5分钟前" / "3天前"）。',
        params: 'unix_timestamp: int -> String'
      },
      {
        name: 'GFormat.compact_number(val)',
        desc: '英文大数值缩写转换（如 12500 -> "12.5K", 1500000 -> "1.50M", 2500000000 -> "2.50B"）。',
        params: 'val: float -> String'
      },
      {
        name: 'GFormat.chinese_number(val)',
        desc: '中文大数值缩写转换（如 14500000 -> "1450.00万", 250000000 -> "2.50亿"）。',
        params: 'val: float -> String'
      },
      {
        name: 'GFormat.comma_number(val)',
        desc: '数字千分位逗号分隔（如 1234567 -> "1,234,567"）。',
        params: 'val: int -> String'
      },
      {
        name: 'GFormat.score_pad(val, total_digits?)',
        desc: '固定位数补零街机得分（如 450, 8 -> "00000450"）。',
        params: 'val: int, total_digits: int = 8 -> String'
      },
      {
        name: 'GFormat.percentage(val, decimals?)',
        desc: '浮点数转百分比文本（如 0.6852 -> "68.5%"）。',
        params: 'val: float, decimals: int = 1 -> String'
      },
      {
        name: 'GFormat.stat_modifier(val, is_percent?, decimals?)',
        desc: '词条属性增益正负符号格式化（如 150 -> "+150", 0.15, true -> "+15.0%", -20 -> "-20"）。',
        params: 'val: float, is_percent: bool = false, decimals: int = 1 -> String'
      },
      {
        name: 'GFormat.stat_color(val)',
        desc: '属性词条正负收益颜色（正加成返回绿，负减益返回红，零返回灰）。',
        params: 'val: float -> Color'
      },
      {
        name: 'GFormat.file_size(bytes)',
        desc: '字节数转人类可读文件/存档大小（如 "512 B", "1.48 MB", "3.21 GB"）。',
        params: 'bytes: int -> String'
      },
      {
        name: 'GFormat.speed_rate(bytes_per_sec)',
        desc: '网络下载/带宽速率格式化（如 3450000 -> "3.29 MB/s"）。',
        params: 'bytes_per_sec: float -> String'
      },
      {
        name: 'GFormat.bb_item_quality(item_name, quality_level)',
        desc: '装备品质富文本自动着色（0:白 1:绿 2:蓝 3:紫 4:金 5:红神话）。',
        params: 'item_name: String, quality_level: int = 0 -> String (BBCode)'
      },
      {
        name: 'GFormat.truncate(text, max_chars, ellipsis?)',
        desc: '字符串超长截断并追加省略号。',
        params: 'text: String, max_chars: int, ellipsis: String = "..." -> String'
      },
      {
        name: 'GFormat.mask_phone(phone)',
        desc: '手机号/账号敏感信息中间脱敏遮蔽（如 "138****5678"）。',
        params: 'phone: String -> String'
      }
    ]
  },

  // --------------------------------------------------------
  // 4. GAsset 资源导入器 (音效/图片/视频)
  // --------------------------------------------------------
  // --------------------------------------------------------
  // 4. GAsset 全能多媒体资源管理系统 (5 大核心方案)
  // --------------------------------------------------------
  'util-asset': {
    title: '🎵 GAsset (多线程异步加载、外部MOD贴图、音频池与图集切片)',
    desc: '面向 Godot 4 的全套多媒体与资产管理解决方案。涵盖：多线程异步资源加载（Threaded Async & Await）、外部玩家头像/MOD 贴图动态导入（External Image Loader）、高性能全局音频对象池与 BGM 交叉淡入淡出（Audio Pool & Crossfade）、大图集 SpriteSheet 动态切片（AtlasTexture Slicer）、以及场景级内存缓存智能清理。',
    demos: [
      {
        title: '1. 多线程异步加载与进度条绑定演练 (Threaded Async Loader with Await)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:700; color:var(--primary);">🚀 多线程异步加载大场景与高模贴图 (彻底杜绝主线程卡死)</span>
              <span id="simAsyncTag" class="g-tag g-tag-info">等待触发 (Idle)</span>
            </div>

            <!-- Animated Progress Bar -->
            <div style="height:14px; background:rgba(0,0,0,0.4); border-radius:7px; overflow:hidden; border:1px solid var(--border-base);">
              <div id="simAsyncBar" style="width:0%; height:100%; background:linear-gradient(90deg, #409eff, #67c23a); transition:width 0.15s ease;"></div>
            </div>

            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
              <span id="simAsyncPath">当前目标: res://scenes/open_world_map.tscn</span>
              <span id="simAsyncPct" style="font-weight:700; color:var(--primary);">0%</span>
            </div>

            <button class="g-btn g-btn-primary" style="height:32px; font-size:12px;" onclick="
              const bar = document.getElementById('simAsyncBar');
              const pct = document.getElementById('simAsyncPct');
              const tag = document.getElementById('simAsyncTag');
              const path = document.getElementById('simAsyncPath');
              
              tag.className = 'g-tag g-tag-warning';
              tag.innerText = '加载中 (Loading...)';
              let cur = 0;
              const timer = setInterval(() => {
                cur += 15;
                if (cur >= 100) {
                  cur = 100;
                  clearInterval(timer);
                  bar.style.width = '100%';
                  pct.innerText = '100%';
                  tag.className = 'g-tag g-tag-success';
                  tag.innerText = '加载完成 (Loaded)';
                  path.innerText = '✅ 资源已准备就绪，可直接进入场景！';
                  showToast('GAsset.load_async: 场景多线程预加载完成！', 'success');
                } else {
                  bar.style.width = cur + '%';
                  pct.innerText = cur + '%';
                  path.innerText = '正在后台子线程流式读取: res://textures/highres_terrain_' + cur + '.png';
                }
              }, 120);
            "><i class="fa-solid fa-play"></i> 触发多线程异步加载 (await GAsset.load_async)</button>
          </div>
        `,
        code: `# =========================================================================
# 方案 1: 多线程异步资源加载与 Await 进度条 (GDScript 4.x)
# =========================================================================

# 1. 异步加载单个大场景 (使用 await 语法，主线程保持 60 帧丝滑不卡顿)
func load_battle_scene_async():
    var scene_resource = await GAsset.load_async("res://scenes/open_world.tscn", get_tree(), 
        func(prog: float):
            loading_bar.value = prog * 100.0
            status_label.text = "正在多线程加载世界地图: %d%%" % int(prog * 100.0)
    )
    if scene_resource:
        var world = scene_resource.instantiate()
        get_tree().root.add_child(world)

# 2. 批量预加载资源清单 (常用于游戏启动页或章节过场)
var asset_list = [
    "res://audio/bgm_boss.mp3",
    "res://textures/dragon.png",
    "res://scenes/dungeon_floor_5.tscn"
]

GAsset.preload_batch(asset_list, get_tree(),
    func(overall_prog: float, current_path: String):
        print("总进度: %d%% | 正在加载: %s" % [int(overall_prog * 100), current_path]),
    func():
        GMessage.success("所有战斗资源已预加载就绪！")
)`
      },
      {
        title: '2. 高性能音频对象池与 BGM 交叉淡入淡出 (Audio Pool & Dual-Channel Crossfade)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="font-size:12px; font-weight:700; color:var(--primary);">🎵 双通道 BGM 交叉淡入淡出模拟器 (无缝切歌，无爆音):</div>

            <!-- Dual channel visualizer -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">通道 A (主城音乐 - 平和):</div>
                <div id="simBgmVolA" style="font-size:13px; font-weight:700; color:var(--success); margin-top:2px;">音量: 0.0 dB (正在播放)</div>
              </div>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base);">
                <div style="font-size:11px; color:var(--text-secondary);">通道 B (战斗音乐 - 激昂):</div>
                <div id="simBgmVolB" style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-top:2px;">音量: -80.0 dB (静音待机)</div>
              </div>
            </div>

            <!-- Controls -->
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="g-btn g-btn-success" onclick="
                document.getElementById('simBgmVolA').innerText = '音量: 0.0 dB (正在播放)';
                document.getElementById('simBgmVolA').style.color = 'var(--success)';
                document.getElementById('simBgmVolB').innerText = '音量: -80.0 dB (已淡出静音)';
                document.getElementById('simBgmVolB').style.color = 'var(--text-secondary)';
                showToast('GAsset.play_bgm: 平滑淡出战斗音乐，淡入主城 BGM (1.5s Crossfade)', 'info');
              "><i class="fa-solid fa-peace"></i> 切换至主城 BGM (淡入通道 A)</button>

              <button class="g-btn g-btn-danger" onclick="
                document.getElementById('simBgmVolB').innerText = '音量: 0.0 dB (正在播放)';
                document.getElementById('simBgmVolB').style.color = '#ff4d4f';
                document.getElementById('simBgmVolA').innerText = '音量: -80.0 dB (已淡出静音)';
                document.getElementById('simBgmVolA').style.color = 'var(--text-secondary)';
                showToast('GAsset.play_bgm: 平滑淡出主城音乐，激昂淡入 Boss 战歌！', 'warning');
              "><i class="fa-solid fa-fire"></i> 切换至 Boss 战斗 BGM (淡入通道 B)</button>

              <button class="g-btn g-btn-primary" onclick="
                showToast('GAsset.play_sfx: 从 16 路音效池自动复用闲置 AudioStreamPlayer，零 GC 损耗！', 'success');
              "><i class="fa-solid fa-volume-high"></i> 并发触发音效 (play_sfx)</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 方案 2: 高性能全局音频对象池与 BGM 交叉淡入淡出 (GDScript 4.x)
# =========================================================================

# 1. 一行代码并发播放音效 (自动复用内部 16 路对象池，零 GC 垃圾产生)
GAsset.play_sfx("res://audio/slash.wav", 0.0, 1.0, self)
GAsset.play_sfx("res://audio/crit_hit.wav", 2.0, 1.2, self) # 带音量与音高随机偏移

# 2. 场景切换时平滑淡入淡出 BGM (Dual Channel Crossfade，持续 1.5 秒)
# 自动将上首音乐音量从 0dB 降到 -80dB 并停止，同时将新音乐从 -80dB 淡入到 0dB
GAsset.play_bgm("res://audio/bgm_boss_dragon.mp3", 1.5, 0.0, self)`
      },
      {
        title: '3. 外部玩家头像/自制 MOD 贴图动态导入 (External Image Loader)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="font-size:12px; font-weight:700; color:var(--primary);">🖼️ 动态读取磁盘外部文件 (玩家自定义头像 / 创意工坊 MOD / CDN 缓存):</div>

            <div style="display:flex; gap:12px; align-items:center; background:var(--bg-card); padding:12px; border-radius:6px; border:1px solid var(--border-base);">
              <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #409eff, #ba55d3); display:flex; align-items:center; justify-content:center; font-size:24px; color:#fff;">
                🧙‍♂️
              </div>
              <div style="font-size:12px; line-height:1.5;">
                <div style="font-weight:700; color:var(--text-primary);">用户自定义本地头像 (user://avatars/avatar_01.png)</div>
                <div style="color:var(--text-secondary); font-size:11px;">无需预编译打包进 pck，游戏运行时随时动态读取 PNG/JPG/WEBP 生成 ImageTexture！</div>
              </div>
            </div>

            <button class="g-btn g-btn-primary" style="height:32px; font-size:12px;" onclick="
              showToast('GAsset.load_external_image: 成功从 user:// 动态加载外部图片并生成 ImageTexture！', 'success');
            "><i class="fa-solid fa-image"></i> 模拟动态加载外部图片</button>
          </div>
        `,
        code: `# =========================================================================
# 方案 3: 外部文件与 MOD 贴图实时导入 (GDScript 4.x)
# =========================================================================

# 从 user:// 或系统绝对路径读取外部图片 (支持玩家自选头像或自制 MOD)
func load_player_custom_avatar(file_path: String) -> void:
    var external_texture: ImageTexture = GAsset.load_external_image(file_path)
    if external_texture:
        $AvatarTextureRect.texture = external_texture
        GMessage.success("玩家自定义头像已成功加载！")
    else:
        GMessage.error("读取外部图片失败，请检查文件是否存在")`
      },
      {
        title: '4. 精灵图集与 SpriteSheet 动态网格切片 (AtlasTexture Slicer)',
        render: `
          <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:12px; width:100%; max-width:620px;">
            <div style="font-size:12px; font-weight:700; color:var(--primary);">🧩 SpriteSheet 大图集零开销切片 (切出 32x32 独立技能图标):</div>

            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <div style="width:40px; height:40px; background:rgba(64,158,255,0.2); border:1px solid #409eff; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:18px;">🔥</div>
              <div style="width:40px; height:40px; background:rgba(103,194,58,0.2); border:1px solid #67c23a; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:18px;">⚡</div>
              <div style="width:40px; height:40px; background:rgba(230,162,60,0.2); border:1px solid #e6a23c; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:18px;">❄️</div>
              <div style="width:40px; height:40px; background:rgba(186,85,211,0.2); border:1px solid #ba55d3; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:18px;">🌪️</div>
              <div style="width:40px; height:40px; background:rgba(245,108,108,0.2); border:1px solid #f56c6c; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:18px;">🛡️</div>
            </div>

            <button class="g-btn g-btn-warning" style="height:32px; font-size:12px;" onclick="
              showToast('GAsset.create_grid_atlas_textures: 成功从 256x256 图集中批量切片出 64 个 AtlasTexture！', 'warning');
            "><i class="fa-solid fa-table-cells"></i> 批量网格切片图集 (create_grid_atlas_textures)</button>
          </div>
        `,
        code: `# =========================================================================
# 方案 4: 图集与 SpriteSheet 动态切片实战 (GDScript 4.x)
# =========================================================================

# 1. 从技能图集中切出单个指定区域的子纹理 (AtlasTexture)
var icons_atlas: Texture2D = GAsset.load_texture("res://textures/skills_sheet.png")
var fireball_icon = GAsset.create_atlas_subtexture(icons_atlas, Rect2(0, 0, 32, 32))
$SkillButton.icon = fireball_icon

# 2. 批量按 32x32 网格切出图集里的全部 64 个图标帧
var all_skill_icons: Array[AtlasTexture] = GAsset.create_grid_atlas_textures(icons_atlas, Vector2(32, 32))
for i in range(all_skill_icons.size()):
    var slot = ItemSlot.new()
    slot.texture = all_skill_icons[i]
    $GridContainer.add_child(slot)

# 3. 场景销毁时清理内存缓存池
func _exit_tree() -> void:
    GAsset.clear_cache(true, false) # 释放当前场景所有无用贴图`
      }
    ],
    methods: [
      {
        name: 'GAsset.load_async(path, tree?, on_progress?)',
        desc: '🌟 异步多线程加载资源（支持 await 语法，进度回调，主线程 60 帧不卡死）。',
        params: 'path: String, tree: SceneTree = null, on_progress: Callable = Callable() -> Resource'
      },
      {
        name: 'GAsset.preload_batch(paths, tree, on_progress?, on_completed?)',
        desc: '批量异步预加载资源列表并实时汇报总进度。',
        params: 'paths: Array[String], tree: SceneTree, on_progress: Callable, on_completed: Callable -> void'
      },
      {
        name: 'GAsset.play_sfx(path, volume_db?, pitch?, context_node?)',
        desc: '🌟 高性能音效播放：自动复用内部 16 路 AudioStreamPlayer 对象池，零 GC 掉帧。',
        params: 'path: String, volume_db: float = 0.0, pitch: float = 1.0, node: Node = null -> AudioStreamPlayer'
      },
      {
        name: 'GAsset.play_bgm(path, fade_duration?, volume_db?, context_node?)',
        desc: '🌟 双通道 BGM 交叉平滑淡入淡出（Crossfade），自动切换曲目无爆音。',
        params: 'path: String, fade_duration: float = 1.5, volume_db: float = 0.0, node: Node = null -> void'
      },
      {
        name: 'GAsset.load_external_image(file_path)',
        desc: '🌟 外部图片动态加载：从本地磁盘绝对路径或 user:// 目录读取图片生成 ImageTexture（用于玩家头像、MOD）。',
        params: 'file_path: String -> ImageTexture'
      },
      {
        name: 'GAsset.create_atlas_subtexture(atlas_tex, region_rect)',
        desc: '从大图集 (SpriteSheet) 中按区域矩形切出子纹理 (AtlasTexture)。',
        params: 'atlas_tex: Texture2D, region_rect: Rect2 -> AtlasTexture'
      },
      {
        name: 'GAsset.create_grid_atlas_textures(atlas_tex, cell_size)',
        desc: '按等宽等高网格批量切出大图集中的全部帧图标数组。',
        params: 'atlas_tex: Texture2D, cell_size: Vector2 -> Array[AtlasTexture]'
      },
      {
        name: 'GAsset.load_texture(path)',
        desc: '加载 Texture2D 贴图并自动加入内存缓存。',
        params: 'path: String -> Texture2D'
      },
      {
        name: 'GAsset.load_audio(path)',
        desc: '加载 AudioStream 音频并自动加入内存缓存。',
        params: 'path: String -> AudioStream'
      },
      {
        name: 'GAsset.clear_cache(clear_textures?, clear_audios?)',
        desc: '清理释放内存中的贴图与音频缓存池。',
        params: 'clear_textures: bool = true, clear_audios: bool = true -> void'
      }
    ]
  }
};

