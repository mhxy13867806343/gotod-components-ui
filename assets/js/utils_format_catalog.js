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
