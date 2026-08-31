// =========================================================================
// Gotod Components UI - Component: skeleton-particle (GSkeletonParticleBinder)
// 骨骼动画粒子特效绑定器 (Spine / DragonBones / 2D Skeleton 关节挂点粒子)
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['skeleton-particle'] = {
  "title": "骨骼动画粒子挂点绑定器 (GSkeletonParticleBinder)",
  "desc": "支持将 GParticleStudio 粒子发射器动态锚定至 2D/3D 骨骼关节（如 Spine, DragonBones, Godot 2D Skeleton 骨骼点）。实现武器挥砍刀光流光、法杖聚气、角色足底跑动灰尘与受击火花的自动坐标空间同步。",
  "demos": [
    {
      "title": "1. 2D 骨骼角色关节挂点与粒子实时联动 (Bone Socket & Realtime Particle Binding)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- Controls Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">选择绑定骨骼关节：</span>
              <button id="boneBtn_weapon" class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.switchBoneSocket('weapon')">⚔️ 右手大剑 (hand_R)</button>
              <button id="boneBtn_staff" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchBoneSocket('staff')">✨ 法杖顶端 (staff_gem)</button>
              <button id="boneBtn_feet" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchBoneSocket('feet')">💨 双足奔跑 (feet_dust)</button>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-danger" style="font-size:11px; padding:3px 12px; font-weight:700;" onclick="window.playSkeletonAttackAnim()">
                ⚔️ 挥砍攻击 (Play Attack)
              </button>
            </div>
          </div>

          <!-- Live Skeleton Canvas Viewport -->
          <div style="position:relative; width:100%; height:240px; background:radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%); border:1px solid var(--border-base); border-radius:6px; overflow:hidden; margin-bottom:14px;">
            <canvas id="skeletonCanvas" width="640" height="240" style="position:absolute; inset:0; width:100%; height:100%;"></canvas>
            
            <div id="boneStatusOverlay" style="position:absolute; top:10px; left:12px; font-size:11.5px; color:#fff; background:rgba(0,0,0,0.6); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.15); pointer-events:none;">
              当前挂点: <span id="curBoneLabel" style="color:var(--primary); font-weight:700;">hand_R_weapon</span> (X: 0, Y: 0)
            </div>
            <div style="position:absolute; bottom:8px; right:12px; font-size:11px; color:rgba(255,255,255,0.5); pointer-events:none;">
              💡 骨骼旋转角与世界变换矩阵自动同步至粒子发射器
            </div>
          </div>

          <!-- Parameter Toggles -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; background:var(--bg-card); padding:10px 14px; border-radius:6px; border:1px solid var(--border-base);">
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chkFollowRotation" checked onchange="window.toggleBoneFollowRotation(this.checked)">
              <span>继承骨骼旋转角 (Follow Bone Rotation)</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chkAutoEmitOnMove" checked>
              <span>运动速度阈值自动触发发射</span>
            </label>
          </div>
        </div>
      `,
      "code": "# GDScript: 绑定粒子至 Spine / Godot 骨骼节点\nvar binder = GSkeletonParticleBinder.new()\nbinder.skeleton_path = \"../HeroSkeleton2D\"\nbinder.bone_name = \"hand_R_weapon\"\nbinder.particle_emitter = $SwordLightParticles\nbinder.inherit_rotation = true\nbinder.local_offset = Vector2(45, 0) # 剑尖偏移\nadd_child(binder)"
    }
  ],
  "props": [
    {
      "name": "skeleton_path",
      "type": "NodePath",
      "default": "^\"\"",
      "desc": "目标 Skeleton2D / SpineSprite / Bone2D 骨骼根节点路径",
      "version": "v1.6.0"
    },
    {
      "name": "bone_name",
      "type": "String",
      "default": "\"\"",
      "desc": "需要绑定的骨骼关节名称（如 \"hand_R\", \"weapon_socket\", \"foot_L\"）",
      "version": "v1.6.0"
    },
    {
      "name": "local_offset",
      "type": "Vector2",
      "default": "Vector2(0, 0)",
      "desc": "相对骨骼关节点局部坐标系的位置三维/二维偏移量",
      "version": "v1.6.0"
    },
    {
      "name": "inherit_rotation",
      "type": "boolean",
      "default": "true",
      "desc": "粒子发射角度是否随骨骼动画旋转姿态实时同步偏转",
      "version": "v1.6.0"
    },
    {
      "name": "inherit_scale",
      "type": "boolean",
      "default": "false",
      "desc": "是否随骨骼变形缩放比例同步调整粒子发射域尺寸",
      "version": "v1.6.0"
    }
  ],
  "events": [
    {
      "name": "bone_transformed",
      "desc": "当每一帧骨骼动画更新并完成粒子位置重映射时触发",
      "params": "(global_pos: Vector2, rotation: float)",
      "version": "v1.6.0"
    }
  ],
  "methods": [
    {
      "name": "bind_to_bone(bone_name: String, offset: Vector2 = Vector2.ZERO)",
      "desc": "动态切换绑定至指定名称的新骨骼关节点",
      "params": "(bone_name: String, offset: Vector2) -> void",
      "version": "v1.6.0"
    },
    {
      "name": "set_emitting(enabled: bool)",
      "desc": "快速控制挂载粒子的发射激活与暂停状态",
      "params": "(enabled: bool) -> void",
      "version": "v1.6.0"
    }
  ]
};
