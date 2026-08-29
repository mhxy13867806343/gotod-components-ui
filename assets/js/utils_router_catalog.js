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

window.simRouterPush = function(withParams) {
  const transition = document.getElementById('simRouterAnimSelect') ? document.getElementById('simRouterAnimSelect').value : 'slide_left';
  const viewport = document.getElementById('simRouterScreen');
  if (!viewport) return;

  const targetPage = withParams ? 'battle_stage' : 'game_shop';

  // Setup Outgoing & Incoming animation classes
  let animOutClass = 'anim-slide-left-out';
  let animInClass = 'anim-slide-left-in';

  if (transition === 'slide_right') {
    animOutClass = 'anim-slide-right-out';
    animInClass = 'anim-slide-right-in';
  } else if (transition === 'slide_up') {
    animOutClass = 'anim-slide-up-out';
    animInClass = 'anim-slide-up-in';
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

  if (targetPage === 'battle_stage') {
    newPage.innerHTML = `
      <div style="background:#1e1e28; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:var(--danger); font-size:13px;">⚔️ 战场关卡 (res://scenes/battle.tscn)</span>
            <span class="g-tag g-tag-danger" style="font-size:9px;">带参数路由</span>
          </div>
          <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.3); border-radius:6px; font-size:11px; line-height:1.5;">
            <div style="color:var(--text-secondary); margin-bottom:4px;">GRouter.get_params(self) 接收到的数据:</div>
            <div>• 关卡 ID: <strong style="color:var(--primary);">108</strong></div>
            <div>• 遭遇 Boss: <strong style="color:var(--danger);">深渊魔龙 (Lv.80)</strong></div>
            <div>• 难度: <span class="g-tag g-tag-warning" style="font-size:9px;">Hell 地狱</span></div>
            <div>• 掉落加成: <span style="color:var(--success);">+200%</span></div>
          </div>
        </div>
        <button class="g-btn g-btn-default" style="width:100%; height:30px; font-size:11px;" onclick="simRouterBack()">
          ◀ GRouter.back() 返回主界面
        </button>
      </div>
    `;
  } else {
    newPage.innerHTML = `
      <div style="background:#1a221d; height:100%; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:var(--success); font-size:13px;">🛒 道具商城 (res://scenes/shop.tscn)</span>
            <span class="g-tag g-tag-success" style="font-size:9px;">无参路由</span>
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
  }

  viewport.appendChild(newPage);
  window.simRouterState.history.push(targetPage);
  showToast(`【GRouter】已通过 [${transition}] 动画跳转至新页面！`, 'success');
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
      <div style="font-size:11px; color:var(--text-secondary);">等待触发页面跳转...</div>
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
    desc: '面向 Godot 4 游戏多场景切换的路由管理器。支持带参数/不带参数跳转、默认向左推入滑动 (Slide Left) 动画、淡入淡出、以及返回传参。',
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
                  <option value="slide_left" selected>向左滑动 (Slide Left - 默认)</option>
                  <option value="slide_right">向右滑动 (Slide Right)</option>
                  <option value="slide_up">向上滑入 (Slide Up / Modal)</option>
                  <option value="fade">淡入淡出 (Fade In/Out)</option>
                </select>
              </div>

              <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
                <button class="g-btn g-btn-primary" style="height:34px; font-size:12px; justify-content:center;" onclick="simRouterPush(false)">
                  <i class="fa-solid fa-arrow-right"></i> 跳页面 (不带参数): GRouter.push("shop.tscn")
                </button>
                <button class="g-btn g-btn-warning" style="height:34px; font-size:12px; justify-content:center;" onclick="simRouterPush(true)">
                  <i class="fa-solid fa-arrow-right-to-bracket"></i> 跳页面 (带参数): GRouter.push("battle.tscn", {...})
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
        code: `# GDScript 页面跳转与动画代码:

# 1. 跳页面 (不带参数, 默认向左滑动动画)
GRouter.push("res://scenes/shop.tscn", {}, GRouter.TransitionType.SLIDE_LEFT, 0.35, self)

# 2. 跳页面 (带参数 + 指定动画)
GRouter.push(
    "res://scenes/battle.tscn", 
    { "stage_id": 108, "boss": "深渊魔龙", "difficulty": "Hell" },
    GRouter.TransitionType.SLIDE_LEFT,
    0.35,
    self
)

# 3. 在目标页面 _ready() 提取参数:
func _ready() -> void:
    var params = GRouter.get_params(self)
    print("进入关卡:", params.get("stage_id"), "Boss:", params.get("boss"))

# 4. 返回上一页并传递结果:
func _on_back_pressed() -> void:
    GRouter.back({"reward_collected": true}, 0.3, self)`
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
  // 3. GFormat 格式化工具类 (HP颜色/时间/缩写)
  // --------------------------------------------------------
  'util-format': {
    title: '🎨 GFormat (HP血量颜色、时间与数值格式化工具库)',
    desc: '提供 HP 动态渐变色算法、秒数转时分秒/中文时间、相对时间（刚刚/5分钟前）以及大数值 K/M/B 缩写。',
    demos: [
      {
        title: 'HP 动态血量颜色与时间格式化演练',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:560px;">
            
            <!-- HP Color Format Sandbox -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:700;">❤️ HP 动态血量颜色算法 (拖动滑块试试):</span>
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
        code: `# GDScript 格式化方法调用示例:
# 1. 动态 HP 颜色 (自动在健康绿、警告黄、濒死红之间计算)
var bar_color = GFormat.hp_color(player.hp, player.max_hp)
hp_progress_bar.modulate = bar_color

# 2. 格式化游戏时长 (秒 -> 字符串)
var time_str = GFormat.duration(3665) # 返回 "01:01:05"
var cn_str = GFormat.duration(3665, true) # 返回 "1小时1分5秒"

# 3. 大数值缩写
var gold_str = GFormat.compact_number(1450000) # 返回 "1.45M"`
      }
    ]
  },

  // --------------------------------------------------------
  // 4. GAsset 资源导入器 (音效/图片/视频)
  // --------------------------------------------------------
  'util-asset': {
    title: '🎵 GAsset (音效、图片纹理与视频流资源导入器)',
    desc: '封装 Godot 4 资源加载与异步预加载池，支持一行代码播放全局音效、加载动态图片与视频流。',
    demos: [
      {
        title: '多媒体资源加载 API 规范',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%; max-width:540px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('【GAsset】成功加载音效 res://audio/click.wav 并自动播放！', 'info')">
                <i class="fa-solid fa-volume-high"></i> GAsset.play_sfx("click.wav")
              </button>
              <button class="g-btn g-btn-success" onclick="showToast('【GAsset】异步预加载 12 个资源完成 (100%)', 'success')">
                <i class="fa-solid fa-download"></i> GAsset.preload_batch(...)
              </button>
            </div>
          </div>
        `,
        code: `# GDScript 资源导入与加载代码:

# 1. 一行代码播放全局音效 (自动创建播放器并在播放完成后自动释放)
GAsset.play_sfx("res://audio/sfx_coin.wav", 0.0, 1.0, self)

# 2. 加载图片/纹理资源 (带自动内存缓存)
var sword_texture: Texture2D = GAsset.load_texture("res://icons/sword.png")
icon_rect.texture = sword_texture

# 3. 异步批量预加载 (常用于游戏加载过渡页)
var assets_to_load: Array[String] = [
    "res://scenes/world.tscn",
    "res://audio/bgm_boss.mp3",
    "res://textures/boss.png"
]

GAsset.preload_batch(assets_to_load, get_tree(), 
    func(progress: float, current_path: String):
        loading_progress_bar.value = progress * 100
        status_label.text = "正在加载: " + current_path,
    func():
        GRouter.push("res://scenes/world.tscn", {}, GRouter.TransitionType.SLIDE_LEFT, 0.35, self)
)`
      }
    ]
  }
};
