// =========================================================================
// Gotod Components UI - Component: hud3d (GHud3D)
// 3D 空间 HUD 投影与世界坐标血条/名称 Billboard 投影
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['hud3d'] = {
  "title": "HUD 3D 空间投影组件 (GHud3D)",
  "desc": "支持 2D UI 控件一键透视映射至 3D 游戏世界坐标系，自动 Billboard 朝向摄像机。提供 3D 角色头顶血条、伤害暴击数字飘字、NPC 交互气泡与距离自动遮挡/缩放衰减算法。",
  "demos": [
    {
      "title": "1. 3D 游戏角色头顶血条与伤害飘字 (3D World Space Billboard HUD)",
      "render": `
        <div style="max-width:560px; background:radial-gradient(circle at center, #1a2234 0%, #0d1117 100%); border:1px solid var(--border-base); border-radius:8px; padding:20px; position:relative; overflow:hidden; min-height:260px; display:flex; flex-direction:column; justify-content:space-between;">
          <!-- 3D Grid background simulation -->
          <div style="position:absolute; inset:0; opacity:0.15; background-image:linear-gradient(var(--border-base) 1px, transparent 1px), linear-gradient(90deg, var(--border-base) 1px, transparent 1px); background-size:24px 24px; pointer-events:none;"></div>
          
          <div style="display:flex; justify-content:space-between; align-items:center; z-index:2;">
            <span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 8px;">🎮 3D 场景视口 (Camera3D Billboard)</span>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-danger" style="font-size:11px; padding:3px 10px;" onclick="window.trigger3DHit()">⚔️ 攻击 BOSS (-3450 暴击)</button>
              <button class="g-btn g-btn-success" style="font-size:11px; padding:3px 10px;" onclick="window.trigger3DHeal()">💚 治疗 BOSS (+1200)</button>
            </div>
          </div>

          <!-- 3D Boss Entity & HUD Overlay -->
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; margin:30px 0; position:relative; z-index:2;">
            <!-- Floating Damage Text Container -->
            <div id="hud3dDamageText" style="position:absolute; top:-36px; font-weight:900; font-size:18px; color:#ff4d4f; text-shadow:0 0 10px rgba(255,77,79,0.8); opacity:0; transform:translateY(0); transition:all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28); font-family:var(--font-mono); pointer-events:none;">
              💥 CRITICAL -3450!
            </div>

            <!-- 3D Overhead HUD (Name + Level + HP Bar) -->
            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; margin-bottom:12px; filter:drop-shadow(0 2px 8px rgba(0,0,0,0.8));">
              <div style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#fff;">
                <span class="g-tag g-tag-danger" style="font-size:10px; padding:1px 5px;">BOSS</span>
                <span>🔥 炎魔君主 · 萨弗隆 (Lv.100)</span>
              </div>
              <!-- HP Progress Bar -->
              <div style="width:160px; height:8px; background:rgba(0,0,0,0.6); border-radius:4px; border:1px solid rgba(255,255,255,0.2); overflow:hidden; position:relative;">
                <div id="hud3dBossHp" style="width:75%; height:100%; background:linear-gradient(90deg, #ff4d4f, #ff7875); transition:width 0.4s ease;"></div>
              </div>
              <span id="hud3dHpText" style="font-size:10px; color:#ddd; font-family:var(--font-mono);">750,000 / 1,000,000</span>
            </div>

            <!-- 3D Boss Model Graphic -->
            <div style="width:80px; height:80px; border-radius:12px; background:linear-gradient(135deg, #780206, #061161); display:flex; align-items:center; justify-content:center; font-size:36px; border:2px solid #ff4d4f; box-shadow:0 0 24px rgba(255,77,79,0.4);">
              👹
            </div>
          </div>

          <div style="font-size:11px; color:var(--text-secondary); text-align:center; z-index:2;">
            💡 投影控件自动计算 <code>unproject_position()</code> 与距离深度缩放，确保 3D 镜头拉远时 UI 尺寸清晰自适应。
          </div>
        </div>
      `,
      "code": "# GDScript: 3D 空间 HUD 投影\nvar hud3d = GHud3D.new()\nhud3d.target_node_path = \"../BossCharacter3D\"\nhud3d.offset = Vector3(0, 2.5, 0) # 头顶高度偏移\nhud3d.billboard_mode = GHud3D.Billboard.CAMERA_Y # 始终面向摄像机\nhud3d.distance_fade = true # 距离衰减\nadd_child(hud3d)"
    }
  ],
  "props": [
    {
      "name": "target_node_path",
      "type": "NodePath",
      "default": "^\"\"",
      "desc": "在 3D 空间中绑定的 Node3D 目标节点路径",
      "version": "v1.4.0"
    },
    {
      "name": "offset",
      "type": "Vector3",
      "default": "Vector3(0, 2.0, 0)",
      "desc": "相对 3D 角色基准点的空间三维偏移（如头顶向上 2 米）",
      "version": "v1.4.0"
    },
    {
      "name": "billboard_mode",
      "type": "enum",
      "default": "CAMERA_Y",
      "desc": "Billboard 朝向模式：ALL (全轴面向), CAMERA_Y (仅 Y 轴旋转), FIXED (固定朝向)",
      "version": "v1.4.0"
    },
    {
      "name": "distance_scaling",
      "type": "boolean",
      "default": "true",
      "desc": "是否开启镜头拉远时的 UI 尺寸平滑缩放保护",
      "version": "v1.4.0"
    },
    {
      "name": "cull_behind_camera",
      "type": "boolean",
      "default": "true",
      "desc": "当目标位于摄像机背后时自动剔除隐藏",
      "version": "v1.4.0"
    }
  ],
  "events": [
    {
      "name": "visibility_changed",
      "desc": "当 3D 目标被遮挡或离开摄像机视锥体时触发",
      "params": "(is_visible: bool)",
      "version": "v1.4.0"
    }
  ],
  "methods": [
    {
      "name": "spawn_damage_text(amount: int, is_crit: bool = false)",
      "desc": "在 3D 目标头顶程序化弹射一道飘字伤害动画",
      "params": "(amount: int, is_crit: bool) -> void",
      "version": "v1.4.0"
    },
    {
      "name": "set_target(node: Node3D)",
      "desc": "动态将 HUD 挂载到新的 3D 实体对象上",
      "params": "(node: Node3D) -> void",
      "version": "v1.4.0"
    }
  ]
};
