// =========================================================================
// Gotod Components UI - Procedural Physics & Collision Catalog
// =========================================================================
window.PHYSICS_CATALOG = {
'phys-programmatic': {
    title: '🎯 纯程序化物理碰撞与直接空间查询 (PhysicsDirectSpaceState2D & Raycast)',
    desc: '依据 Godot 4 物理引擎规范，除了在场景树中手动添加 CollisionShape2D 节点外，还可以通过 PhysicsDirectSpaceState2D 进行完全不依赖场景树节点的直接空间物理投射（射线 intersect_ray、形状投射 intersect_shape、点查询 intersect_point）与动态碰撞体构建。',
    demos: [
      {
        title: '1. GPhysics 纯代码直接空间射线探测与雷达扫描模拟器 (Live Raycast Visualizer)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 PhysicsDirectSpaceState2D 射线投射雷达</span>
              <span id="simRaycastResultTag" class="g-tag g-tag-success">未命中障碍物 (Clear Line of Sight)</span>
            </div>

            <!-- Interactive Radar Canvas Simulation -->
            <div style="position:relative; height:180px; background:#0a0e17; border:2px solid #1a2a4a; border-radius:var(--radius); overflow:hidden; display:flex; align-items:center; justify-content:center;">
              <!-- Target Obstacle Box -->
              <div id="simObstacleBox" style="position:absolute; right:80px; top:50px; width:70px; height:80px; background:#f56c6c; border:2px solid #ff7875; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:11px;">
                障碍物<br>(Body2D)
              </div>

              <!-- Player Raycast Source -->
              <div style="position:absolute; left:60px; top:80px; display:flex; flex-direction:column; align-items:center;">
                <div style="font-size:32px;">🧙‍♂️</div>
                <span style="font-size:11px; color:#409eff; font-weight:700;">玩家发射点</span>
              </div>

              <!-- Laser Ray Line -->
              <div id="simLaserRay" style="position:absolute; left:95px; top:95px; width:180px; height:3px; background:linear-gradient(90deg, #409eff, #67c23a); box-shadow:0 0 8px #409eff; transition:all 0.3s ease;"></div>
              
              <!-- Hit Indicator Marker -->
              <div id="simHitPoint" style="position:absolute; left:275px; top:90px; width:12px; height:12px; background:#ff4d4f; border-radius:50%; box-shadow:0 0 10px #ff4d4f; animation:gBlink 0.4s infinite alternate;"></div>
            </div>

            <!-- Controls -->
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <button class="g-btn g-btn-primary" onclick="
                const tag = document.getElementById('simRaycastResultTag');
                const laser = document.getElementById('simLaserRay');
                const hit = document.getElementById('simHitPoint');
                laser.style.width = '180px';
                laser.style.background = 'linear-gradient(90deg, #409eff, #f56c6c)';
                hit.style.display = 'block';
                tag.className = 'g-tag g-tag-danger';
                tag.innerText = '🎯 命中障碍物: Position (275, 95), Normal (-1, 0)';
                showToast('GPhysics.raycast_2d: 成功检测到碰撞阻挡！', 'danger');
              "><i class="fa-solid fa-crosshairs"></i> 触发正向射线检测 (Hit Obstacle)</button>

              <button class="g-btn g-btn-default" onclick="
                const tag = document.getElementById('simRaycastResultTag');
                const laser = document.getElementById('simLaserRay');
                const hit = document.getElementById('simHitPoint');
                laser.style.width = '320px';
                laser.style.background = 'linear-gradient(90deg, #409eff, #67c23a)';
                hit.style.display = 'none';
                tag.className = 'g-tag g-tag-success';
                tag.innerText = '空旷无阻挡 (No Hit, Range: 320px)';
                showToast('GPhysics.raycast_2d: 前方无遮挡，视线通畅！', 'success');
              "><i class="fa-solid fa-eye"></i> 偏转角度检测 (Clear View)</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# Godot 4.x 纯代码程序化物理与直接空间状态查询实战 (GDScript 4.x)
# =========================================================================
extends CharacterBody2D

# 1. 在 _physics_process 中进行纯代码直接空间射线探测 (无场景节点开销)
func _physics_process(delta: float) -> void:
    var space_state = get_world_2d().direct_space_state
    
    # 构造射线检测参数 (从玩家当前位置向正前方发射 200 像素)
    var from_pos = global_position
    var to_pos = from_pos + transform.x * 200.0
    
    var query = PhysicsRayQueryParameters2D.create(from_pos, to_pos)
    query.collision_mask = GPhysics.to_mask([1, 2]) # 仅检测第 1 层(地形)与第 2 层(敌人)
    query.exclude = [get_rid()] # 排除自身 RID
    
    var result: Dictionary = space_state.intersect_ray(query)
    if not result.is_empty():
        var hit_collider = result.collider
        var hit_position = result.position
        var hit_normal = result.normal
        # 视线被阻挡，触发反弹或命中敌人
        print("射线命中: %s, 碰撞点: %v, 法线: %v" % [hit_collider.name, hit_position, hit_normal])

# 2. 纯代码为 NPC 或掉落物动态附加碰撞体
func create_dynamic_pickup_item(item_data: Dictionary, spawn_pos: Vector2) -> Area2D:
    var area = Area2D.new()
    area.global_position = spawn_pos
    
    # 使用 GPhysics 动态挂载圆形碰撞体 (半径 16px)
    var col = GPhysics.attach_circle_collider_2d(area, 16.0)
    
    # 监听进入事件
    area.body_entered.connect(func(body):
        if body.is_in_group("player"):
            GMessage.success("拾取到道具: %s" % item_data.name)
            area.queue_free()
    )
    get_parent().add_child(area)
    return area`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.6 CharacterBody 运动学与 RigidBody 刚体动力学
  // --------------------------------------------------------
  'phys-character-rigidbody': {
    title: '🏃 CharacterBody 运动学公式与 RigidBody 刚体爆炸力学',
    desc: '封装 Godot 4.x 平台跳跃手感公式（由期望跳跃高度与滞空时间反推初速度和重力加速度）以及刚体动力学（径向衰减范围爆炸冲击波 apply_central_impulse、碰撞反弹力学与物理材质配置）。',
    demos: [
      {
        title: '1. 平台跳跃力学公式计算器 (Jump Velocity & Gravity Solver)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🦘 纯数学精准跳跃手感反推器 (v = 2h/t, g = 2h/t²)</span>
              <span class="g-tag g-tag-success">无物理手感玄学</span>
            </div>

            <!-- Jump Params Control Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;">
              <div>
                <label style="font-size:12px; color:var(--text-secondary); display:block; margin-bottom:4px;">期望最大跳跃高度 (jump_height: 像素)</label>
                <input type="number" id="simJumpH" class="g-input" value="120" style="width:100%; height:32px;" oninput="
                  const h = parseFloat(this.value) || 120;
                  const t = parseFloat(document.getElementById('simJumpT').value) || 0.4;
                  const v = (2 * h) / t;
                  const g = (2 * h) / (t * t);
                  document.getElementById('simResV').innerText = '-' + v.toFixed(1) + ' px/s';
                  document.getElementById('simResG').innerText = g.toFixed(1) + ' px/s²';
                ">
              </div>
              <div>
                <label style="font-size:12px; color:var(--text-secondary); display:block; margin-bottom:4px;">到达最高点时间 (time_to_peak: 秒)</label>
                <input type="number" step="0.05" id="simJumpT" class="g-input" value="0.38" style="width:100%; height:32px;" oninput="
                  const t = parseFloat(this.value) || 0.38;
                  const h = parseFloat(document.getElementById('simJumpH').value) || 120;
                  const v = (2 * h) / t;
                  const g = (2 * h) / (t * t);
                  document.getElementById('simResV').innerText = '-' + v.toFixed(1) + ' px/s';
                  document.getElementById('simResG').innerText = g.toFixed(1) + ' px/s²';
                ">
              </div>
            </div>

            <!-- Output Calculation Results -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius); text-align:center;">
                <div style="font-size:11px; color:var(--primary); font-weight:700;">计算所得跳跃初速度 (JUMP_VELOCITY)</div>
                <div id="simResV" style="font-size:1.4rem; font-weight:800; color:var(--primary); margin-top:2px;">-631.6 px/s</div>
              </div>
              <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); text-align:center;">
                <div style="font-size:11px; color:var(--warning); font-weight:700;">计算所得重力加速度 (GRAVITY)</div>
                <div id="simResG" style="font-size:1.4rem; font-weight:800; color:var(--warning); margin-top:2px;">1662.0 px/s²</div>
              </div>
            </div>

            <!-- Explosion Impulse Simulator -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-base); padding-top:12px;">
              <span style="font-size:12px; color:var(--text-secondary);">💣 范围爆炸冲量 (Explosion Impulse)</span>
              <button class="g-btn g-btn-danger" style="height:30px; font-size:12px;" onclick="
                showToast('GPhysics.apply_explosion_impulse_2d: 爆炸半径 200px 内 6 个刚体受冲击散开！', 'danger');
              "><i class="fa-solid fa-burst"></i> 引爆手榴弹冲击波</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# CharacterBody2D 极佳跳跃手感公式 + 刚体范围爆炸力学 (GDScript 4.x)
# =========================================================================
extends CharacterBody2D

# 设定直观的游戏参数 (无需凭感觉盲调数字)
@export var jump_height: float = 120.0     # 角色能跳过 120 像素高的障碍
@export var time_to_peak: float = 0.38     # 0.38 秒到达最高点 (手感干脆利落)
@export var move_speed: float = 240.0

var jump_velocity: float
var gravity: float

func _ready() -> void:
    # 自动精准求解初速度与重力
    jump_velocity = GPhysics.calculate_jump_velocity(jump_height, time_to_peak)
    gravity = GPhysics.calculate_gravity(jump_height, time_to_peak)

func _physics_process(delta: float) -> void:
    # 施加重力
    if not is_on_floor():
        velocity.y += gravity * delta
        
    # 处理跳跃按键
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_velocity
        
    # 水平移动
    var dir = Input.get_axis("ui_left", "ui_right")
    velocity.x = dir * move_speed
    
    move_and_slide()

# 投掷手榴弹：对周围刚体产生距离衰减的冲击力
func throw_grenade(explode_pos: Vector2) -> void:
    var affected = GPhysics.apply_explosion_impulse_2d(self, explode_pos, 200.0, 850.0)
    print("爆炸波及了 %d 个刚体对象！" % affected)`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.7 Area2D / 3D 区域触发器与碰撞形状
  // --------------------------------------------------------
  'phys-area-collision': {
    title: '📦 Area2D 触发器、重力场与 2D/3D 碰撞形状 (Collision Shapes)',
    desc: '详解 Area2D/Area3D 核心机制：重力点汇聚（黑洞吸引力）、风力/液体阻尼场、拾取物区域检测，以及 Rectangle、Circle、Capsule、Convex/Concave 多边形碰撞形状的快速构造与位掩码过滤。',
    demos: [
      {
        title: '1. Area2D 拾取检测与点重力场 (Point Gravity / Attractor)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('Area2D body_entered: 玩家进入战利品金币吸引范围，金币自动被吸附！', 'success')">
                <i class="fa-solid fa-magnet"></i> 模拟金币磁力吸附场 (Point Gravity)
              </button>
              <button class="g-btn g-btn-warning" onclick="showToast('Area2D area_entered: 触发刺针机关，受到 35 点穿刺伤害！', 'warning')">
                <i class="fa-solid fa-triangle-exclamation"></i> 模拟伤害陷阱区域 (Trap Area)
              </button>
              <button class="g-btn g-btn-info" onclick="showToast('Area2D linear_damp = 8.0: 进入水下/泥浆区域，移动速度与阻尼自动减缓！', 'info')">
                <i class="fa-solid fa-water"></i> 模拟水体减速阻尼场 (Damping Field)
              </button>
            </div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              💡 <strong>Area 物理场特性</strong>：通过勾选 <code>gravity_space_override = SPACE_OVERRIDE_COMBINE</code>，无需写任何物理受力代码，即可由引擎底层自动产生黑洞吸力、龙卷风升力或水体浮力！
            </div>
          </div>
        `,
        code: `# =========================================================================
# Area2D 黑洞点重力吸引场与拾取判定实战 (GDScript 4.x)
# =========================================================================
extends Area2D

func _ready() -> void:
    # 1. 开启点重力场 (黑洞吸力效果)
    gravity_space_override = Area2D.SPACE_OVERRIDE_COMBINE
    gravity_point = true
    gravity_point_unit_distance = 64.0
    gravity_point_center = Vector2.ZERO
    gravity = 1200.0 # 强大向心吸附力
    
    # 2. 动态挂载圆形吸引半径 (180px)
    GPhysics.attach_circle_collider_2d(self, 180.0)
    
    # 3. 监听玩家接触
    body_entered.connect(func(body):
        if body.is_in_group("player"):
            GMessage.warning("警告：已被卷入暗影重力黑洞！")
    )`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.8 GCoord 2D 游戏坐标系转换与向量几何计算
  // --------------------------------------------------------
  'phys-coord-transforms': {
    title: '📐 GCoord: 2D 游戏全能坐标系与向量几何计算 (Screen / World / Isometric / FoV)',
    desc: '专为 2D 游戏量身打造的高频坐标与数学工具库：2D 世界坐标转屏幕画布、屏幕外目标边缘箭头指示器 (Off-Screen Indicator)、2.5D 等轴测斜视角 (Isometric 45°) 转换、战利品开箱拱形抛物线 (Bezier Arc)、圆周环绕法球点阵以及 2D 扇形锥体视线探测 (FoV Cone Check)。',
    demos: [
      {
        title: '1. 2D 屏幕外目标边缘指示箭头模拟器 (Off-Screen Target Pointer)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 屏幕边缘夹紧指示器 (在屏幕边缘显示指向目标的旋转箭头与距离)</span>
              <span id="simOffscreenTag" class="g-tag g-tag-danger">目标在屏幕右外侧 (Off-Screen)</span>
            </div>

            <!-- Screen Viewport Box -->
            <div style="position:relative; height:180px; background:#070b14; border:2px dashed #409eff; border-radius:var(--radius); overflow:hidden;">
              <div style="position:absolute; top:8px; left:8px; font-size:10px; color:#409eff; font-weight:700;">📺 2D 主摄像机屏幕视口范围 (Viewport Bounds)</div>
              
              <!-- Player Center -->
              <div style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center;">
                <div style="font-size:28px;">🧙‍♂️</div>
                <span style="font-size:10px; color:#fff; font-weight:700;">玩家 (屏幕中心)</span>
              </div>

              <!-- Edge Indicator Pointer -->
              <div id="simEdgePointer" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:#ff4d4f; color:#fff; padding:4px 10px; border-radius:14px; font-size:11px; font-weight:800; display:flex; align-items:center; gap:6px; box-shadow:0 0 12px #ff4d4f; transition:all 0.3s ease;">
                <span>👹 领主 (640m)</span>
                <span style="font-size:14px;">➔</span>
              </div>
            </div>

            <!-- Controls -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = '12px';
                ptr.style.top = '50%';
                ptr.style.left = 'auto';
                ptr.style.bottom = 'auto';
                ptr.innerHTML = '<span>👹 右侧领主 (640m)</span> <span>➔</span>';
                tag.className = 'g-tag g-tag-danger';
                tag.innerText = '目标在屏幕右外侧 (Off-Screen Right)';
                showToast('GCoord.get_offscreen_indicator_2d: 箭头已吸附至右侧屏幕边缘', 'info');
              "><i class="fa-solid fa-arrow-right"></i> 目标在屏幕右侧远处</button>

              <button class="g-btn g-btn-warning" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = 'auto';
                ptr.style.top = '12px';
                ptr.style.left = '50%';
                ptr.style.bottom = 'auto';
                ptr.innerHTML = '<span>⬆️ 北方传送门 (820m)</span>';
                tag.className = 'g-tag g-tag-warning';
                tag.innerText = '目标在屏幕上方外侧 (Off-Screen Top)';
                showToast('GCoord.get_offscreen_indicator_2d: 箭头已吸附至顶部屏幕边缘', 'warning');
              "><i class="fa-solid fa-arrow-up"></i> 目标在屏幕上方远处</button>

              <button class="g-btn g-btn-success" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = 'auto';
                ptr.style.left = '75%';
                ptr.style.top = '40%';
                ptr.innerHTML = '<span>🎯 视野内目标 (直接显示)</span>';
                tag.className = 'g-tag g-tag-success';
                tag.innerText = '目标已进入屏幕视口 (In-Screen)';
                showToast('GCoord.get_offscreen_indicator_2d: 目标在屏幕内，is_on_screen = true', 'success');
              "><i class="fa-solid fa-eye"></i> 目标在屏幕内</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 2D 屏幕外目标指示器 (Off-Screen Indicator) 实战 (GDScript 4.x)
# =========================================================================
extends Control

@export var target_boss: Node2D
@onready var indicator_arrow: Control = $IndicatorArrow
@onready var distance_label: Label = $IndicatorArrow/DistLabel

func _process(delta: float) -> void:
    if not is_instance_valid(target_boss):
        indicator_arrow.visible = false
        return
        
    # 计算目标相对于屏幕边缘的夹紧坐标与方向角
    var info = GCoord.get_offscreen_indicator_2d(self, target_boss.global_position, 36.0)
    
    if info.is_on_screen:
        # 目标在屏幕内部时隐藏边缘指示箭头
        indicator_arrow.visible = false
    else:
        # 目标在屏幕外时显示红色边缘箭头，并旋转指向目标方向
        indicator_arrow.visible = true
        indicator_arrow.position = info.screen_pos
        indicator_arrow.rotation = info.angle
        distance_label.text = "%dm" % int(info.distance / 10.0)`
      },
      {
        title: '2. 2.5D 等轴测 (Isometric 45°) 与直角坐标双向转换',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🗺️ 2.5D 斜视角 (Isometric) 坐标互转计算器</span>
              <span class="g-tag g-tag-primary">X_iso = x - y, Y_iso = (x + y)/2</span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; background:var(--bg-card); padding:14px; border-radius:var(--radius); border:1px solid var(--border-base);">
              <div>
                <label style="font-size:12px; color:var(--text-secondary);">输入直角坐标 (Cartesian X, Y):</label>
                <div style="display:flex; gap:8px; margin-top:4px;">
                  <input type="number" id="simCartX" class="g-input" value="100" style="width:50%; height:32px;" placeholder="X">
                  <input type="number" id="simCartY" class="g-input" value="60" style="width:50%; height:32px;" placeholder="Y">
                </div>
              </div>
              <div>
                <label style="font-size:12px; color:var(--text-secondary);">计算所得 2.5D 等轴测坐标 (Isometric):</label>
                <div id="simIsoRes" style="font-size:15px; font-weight:800; color:#409eff; height:32px; display:flex; align-items:center; margin-top:4px;">
                  Vector2(40.0, 80.0)
                </div>
              </div>
            </div>

            <button class="g-btn g-btn-primary" style="height:32px;" onclick="
              const x = parseFloat(document.getElementById('simCartX').value) || 0;
              const y = parseFloat(document.getElementById('simCartY').value) || 0;
              const isoX = x - y;
              const isoY = (x + y) * 0.5;
              document.getElementById('simIsoRes').innerText = 'Vector2(' + isoX.toFixed(1) + ', ' + isoY.toFixed(1) + ')';
              showToast('GCoord.cartesian_to_isometric_2d 计算完成！', 'success');
            "><i class="fa-solid fa-calculator"></i> 转换坐标</button>
          </div>
        `,
        code: `# =========================================================================
# 2.5D 等轴测斜视角 (Isometric) 坐标互转实战 (GDScript 4.x)
# =========================================================================

# 1. 将直角笛卡尔世界位置转为 45° 等轴测渲染位置
var iso_pos = GCoord.cartesian_to_isometric_2d(Vector2(100, 60)) # => Vector2(40, 80)

# 2. 将鼠标点击的等轴测位置还原为直角坐标
var cart_pos = GCoord.isometric_to_cartesian_2d(iso_pos) # => Vector2(100, 60)`
      },
      {
        title: '3. 战利品开箱拱形抛物线 (Bezier Arc) 与法球环绕点阵 (Orbit Points)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">✨ 宝箱金币爆出抛物线 & 角色环绕护盾点阵</span>
              <span class="g-tag g-tag-warning">贝塞尔曲线 / 极坐标</span>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-warning" onclick="
                showToast('GCoord.get_loot_arc_pos_2d: 成功生成 8 枚金币向上拱起抛物线掉落动画轨迹！', 'warning');
              "><i class="fa-solid fa-coins"></i> 模拟金币爆出优雅抛物线 (Bezier Loot Arc)</button>

              <button class="g-btn g-btn-info" onclick="
                showToast('GCoord.get_orbit_points_2d: 已计算角色周围 6 颗旋转冰霜法球的环绕坐标点阵！', 'info');
              "><i class="fa-solid fa-circle-nodes"></i> 模拟生成 6 个环绕法球点阵 (Orbit Points)</button>

              <button class="g-btn g-btn-success" onclick="
                showToast('GCoord.is_in_fov_cone_2d: 检测敌人处于前方 90 度扇形近战攻击范围内，判定命中！', 'success');
              "><i class="fa-solid fa-bullseye"></i> 模拟 2D 扇形攻击判定 (FoV Cone)</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 战利品掉落抛物线 + 环绕法球点阵 + 扇形视线判定 (GDScript 4.x)
# =========================================================================

# 1. 宝箱开箱：让掉落物沿二次贝塞尔曲线优雅向上拱起落地
func spawn_loot_drop(start_pos: Vector2, land_pos: Vector2) -> void:
    var loot = preload("res://scenes/gem.tscn").instantiate()
    get_parent().add_child(loot)
    
    var tween = create_tween()
    tween.tween_method(func(t: float):
        # arc_height = 80 像素 (向上拱起的最大高度)
        loot.global_position = GCoord.get_loot_arc_pos_2d(start_pos, land_pos, 80.0, t)
    , 0.0, 1.0, 0.6).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)

# 2. 环绕法球：在角色周围均匀生成 4 颗旋转法球
func update_orbiting_shields(delta: float) -> void:
    orbit_angle += delta * 2.0 # 旋转速度
    var orbit_points = GCoord.get_orbit_points_2d(global_position, 64.0, 4, orbit_angle)
    for i in range(4):
        shields[i].global_position = orbit_points[i]

# 3. 扇形近战攻击：判定目标是否在角色正前方 90 度扇形内
func check_melee_cleave(target_enemy: Node2D) -> bool:
    var forward = Vector2.RIGHT.rotated(rotation)
    return GCoord.is_in_fov_cone_2d(global_position, forward, target_enemy.global_position, 120.0, 90.0)`
      }
    ]
  }
};
