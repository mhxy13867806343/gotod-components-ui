// =========================================================================
// Gotod Components UI - Component: particle-studio (GParticleStudio)
// UI 粒子特效工坊 & Godot 4 GPUParticles2D 实时调节与配置导出器
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['particle-studio'] = {
  "title": "UI 粒子特效工坊 (GParticleStudio)",
  "desc": "可视化调节金币爆发、抽卡流光、魔法爆炸粒子发射器，实时渲染粒子物理模拟并一键导出 Godot 4 GPUParticles2D / CPUParticles2D 标准 .tres 材质与 GDScript 挂载代码。",
  "demos": [
    {
      "title": "1. 实时粒子特效调节与爆发模拟器 (Interactive Particle Emitter)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- Preset Switcher -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">特效预设：</span>
              <button class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.applyParticlePreset('coin')">💰 金币爆发</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.applyParticlePreset('gacha')">✨ 抽卡金光</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.applyParticlePreset('fire')">🔥 烈焰爆炸</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.applyParticlePreset('magic')">💫 魔法星尘</button>
            </div>
            <button class="g-btn g-btn-success" style="font-size:11px; padding:3px 12px; font-weight:700;" onclick="window.triggerParticleBurst()">
              🚀 触发发射 (Burst)
            </button>
          </div>

          <!-- Live Particle Canvas Viewport -->
          <div style="position:relative; width:100%; height:220px; background:#080b12; border:1px solid var(--border-base); border-radius:6px; overflow:hidden; margin-bottom:14px; display:flex; align-items:center; justify-content:center; cursor:crosshair;" onclick="window.onParticleCanvasClick(event, this)">
            <canvas id="particleCanvas" width="640" height="220" style="position:absolute; inset:0; width:100%; height:100%;"></canvas>
            <div style="position:absolute; bottom:8px; left:12px; font-size:11px; color:rgba(255,255,255,0.6); pointer-events:none;">
              💡 点击画布任意位置产生空间发射源
            </div>
            <div id="particleCountBadge" style="position:absolute; top:8px; right:12px; background:rgba(0,0,0,0.6); padding:2px 8px; border-radius:10px; font-size:11px; color:#67c23a; font-family:var(--font-mono); border:1px solid rgba(103,194,58,0.3);">
              活动粒子: 0
            </div>
          </div>

          <!-- Parameter Controllers Grid -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; background:var(--bg-card); padding:12px; border-radius:6px; border:1px solid var(--border-base); margin-bottom:12px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>粒子数量 (Amount)</span>
                <span id="pValAmount" style="font-weight:700; color:var(--primary);">60</span>
              </div>
              <input type="range" id="pCtrlAmount" min="10" max="200" value="60" style="width:100%; accent-color:var(--primary);" oninput="window.updateParticleParam('amount', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>扩散角度 (Spread)</span>
                <span id="pValSpread" style="font-weight:700; color:var(--primary);">180°</span>
              </div>
              <input type="range" id="pCtrlSpread" min="10" max="360" value="180" style="width:100%; accent-color:var(--primary);" oninput="window.updateParticleParam('spread', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>初速度 (Velocity)</span>
                <span id="pValVelocity" style="font-weight:700; color:var(--primary);">280</span>
              </div>
              <input type="range" id="pCtrlVelocity" min="50" max="600" value="280" style="width:100%; accent-color:var(--primary);" oninput="window.updateParticleParam('velocity', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>重力加速度 (Gravity Y)</span>
                <span id="pValGravity" style="font-weight:700; color:var(--primary);">400</span>
              </div>
              <input type="range" id="pCtrlGravity" min="-300" max="800" value="400" style="width:100%; accent-color:var(--primary);" oninput="window.updateParticleParam('gravity', this.value)">
            </div>
          </div>

          <!-- Code Exporter -->
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <button class="g-btn g-btn-primary" style="font-size:12px; padding:4px 14px;" onclick="window.copyGodotParticleCode()">
              📋 复制 Godot 4 GPUParticles2D 材质与代码
            </button>
            <span style="font-size:11px; color:var(--text-secondary);">一键生成 ParticleProcessMaterial 配置</span>
          </div>
        </div>
      `,
      "code": "# GDScript: 生成并挂载 GPUParticles2D\nvar particles = GPUParticles2D.new()\nvar mat = ParticleProcessMaterial.new()\nmat.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_POINT\nmat.spread = 180.0\nmat.initial_velocity_min = 200.0\nmat.initial_velocity_max = 350.0\nmat.gravity = Vector3(0, 400, 0)\nmat.color = Color(1.0, 0.84, 0.0) # 金币金色\nparticles.process_material = mat\nparticles.amount = 60\nparticles.one_shot = true\nparticles.explosiveness = 0.9\nadd_child(particles)\nparticles.emitting = true"
    }
  ],
  "props": [
    {
      "name": "amount",
      "type": "int",
      "default": "64",
      "desc": "同屏最大发射粒子数量",
      "version": "v1.5.0"
    },
    {
      "name": "lifetime",
      "type": "float",
      "default": "1.0",
      "desc": "单颗粒子的存活生命周期（秒）",
      "version": "v1.5.0"
    },
    {
      "name": "explosiveness",
      "type": "float",
      "default": "0.85",
      "desc": "瞬时爆发度 (0.0 均匀连续发射 ~ 1.0 全量瞬发)",
      "version": "v1.5.0"
    },
    {
      "name": "initial_velocity",
      "type": "float",
      "default": "300.0",
      "desc": "粒子发射初始冲力速度",
      "version": "v1.5.0"
    },
    {
      "name": "gravity",
      "type": "Vector2",
      "default": "Vector2(0, 400)",
      "desc": "重力加速度矢量（Y 向下）",
      "version": "v1.5.0"
    }
  ],
  "events": [
    {
      "name": "burst_finished",
      "desc": "当 one_shot 单次爆发粒子全部消散完毕后触发",
      "params": "()",
      "version": "v1.5.0"
    }
  ],
  "methods": [
    {
      "name": "burst(pos: Vector2, count: int = -1)",
      "desc": "在指定 2D 坐标瞬时喷发一波粒子特效",
      "params": "(pos: Vector2, count: int) -> void",
      "version": "v1.5.0"
    },
    {
      "name": "apply_preset(preset_name: String)",
      "desc": "加载内置预设（coin, gacha, fire, magic, snow）",
      "params": "(preset_name: String) -> void",
      "version": "v1.5.0"
    }
  ]
};
