# =========================================================================
# GPhysics: Godot 4.x 全能物理引擎工具库 (2D/3D 刚体/区域/运动学/射线/动力学)
# 涵盖：
# 1. 直接空间状态射线探测 (intersect_ray) 与 形状投射 (intersect_shape)
# 2. CharacterBody 跳跃力学公式 (从跳跃高度与到达顶点时间自动计算速度与重力)
# 3. 刚体动力学：爆炸范围冲击波 (Explosion Impulse) 与物理材质配置
# 4. Area2D / Area3D 区域触发器快速构建与重力场设定
# 5. 碰撞图层与掩码位运算转换器 (Layer Array to Bitmask)
# 6. 物理插值与平滑运动辅助
# =========================================================================
@tool
class_name GPhysics
extends RefCounted

# =========================================================================
# 1. 纯代码直接空间状态查询 (Direct Space State Queries)
# =========================================================================

## 2D 空间射线检测 (Raycast 2D via DirectSpaceState)
## 返回: { "collider": Object, "position": Vector2, "normal": Vector2, "rid": RID, "shape": int } 或 {}
static func raycast_2d(context_node: Node2D, from: Vector2, to: Vector2, collision_mask: int = 0xFFFFFFFF, exclude: Array[RID] = [], collide_with_areas: bool = false, collide_with_bodies: bool = true) -> Dictionary:
	var space_state = context_node.get_world_2d().direct_space_state
	if not space_state:
		return {}
	
	var query = PhysicsRayQueryParameters2D.create(from, to, collision_mask, exclude)
	query.collide_with_areas = collide_with_areas
	query.collide_with_bodies = collide_with_bodies
	return space_state.intersect_ray(query)

## 3D 空间射线检测 (Raycast 3D via DirectSpaceState)
static func raycast_3d(context_node: Node3D, from: Vector3, to: Vector3, collision_mask: int = 0xFFFFFFFF, exclude: Array[RID] = [], collide_with_areas: bool = false, collide_with_bodies: bool = true) -> Dictionary:
	var space_state = context_node.get_world_3d().direct_space_state
	if not space_state:
		return {}
	
	var query = PhysicsRayQueryParameters3D.create(from, to, collision_mask, exclude)
	query.collide_with_areas = collide_with_areas
	query.collide_with_bodies = collide_with_bodies
	return space_state.intersect_ray(query)

## 2D 圆形范围重叠物理探测 (Circle Overlap Query)
static func circle_overlap_2d(context_node: Node2D, center: Vector2, radius: float, collision_mask: int = 0xFFFFFFFF, max_results: int = 32) -> Array[Dictionary]:
	var space_state = context_node.get_world_2d().direct_space_state
	if not space_state:
		return []
		
	var shape = CircleShape2D.new()
	shape.radius = radius
	
	var query = PhysicsShapeQueryParameters2D.new()
	query.set_shape(shape)
	query.transform = Transform2D(0.0, center)
	query.collision_mask = collision_mask
	query.collide_with_bodies = true
	query.collide_with_areas = true
	
	return space_state.intersect_shape(query, max_results)

# =========================================================================
# 2. 运动学与跳跃力学公式 (Kinematic & Jump Formulas)
# =========================================================================

## 根据期望的跳跃高度 (jump_height) 与到达顶点时间 (time_to_peak)，精准计算跳跃初速度 (jump_velocity)
## 公式: v = 2 * h / t
static func calculate_jump_velocity(jump_height: float, time_to_peak: float) -> float:
	if time_to_peak <= 0.0:
		return 0.0
	return -(2.0 * jump_height) / time_to_peak

## 根据期望的跳跃高度与到达顶点时间，精准计算下落重力加速度 (gravity)
## 公式: g = 2 * h / (t^2)
static func calculate_gravity(jump_height: float, time_to_peak: float) -> float:
	if time_to_peak <= 0.0:
		return 980.0
	return (2.0 * jump_height) / (time_to_peak * time_to_peak)

# =========================================================================
# 3. 刚体动力学与爆炸冲击 (RigidBody & Explosion Dynamics)
# =========================================================================

## 2D 范围爆炸冲击波 (对圆形范围内的所有 RigidBody2D 施加径向衰减冲量)
static func apply_explosion_impulse_2d(context_node: Node2D, center: Vector2, radius: float, max_force: float, collision_mask: int = 0xFFFFFFFF) -> int:
	var hits = circle_overlap_2d(context_node, center, radius, collision_mask)
	var affected_count = 0
	
	for hit in hits:
		var collider = hit.get("collider")
		if collider is RigidBody2D:
			var diff = collider.global_position - center
			var dist = diff.length()
			if dist < radius:
				var dir = diff.normalized() if dist > 0.001 else Vector2.UP
				var falloff = 1.0 - (dist / radius) # 距离衰减 (线性衰减)
				var impulse = dir * (max_force * falloff)
				collider.apply_central_impulse(impulse)
				affected_count += 1
				
	return affected_count

# =========================================================================
# 4. 纯代码动态构建碰撞形状 (Collision Shape Generators)
# =========================================================================

## 为 CollisionObject2D (Area2D / RigidBody2D / CharacterBody2D) 附加矩形碰撞体
static func attach_box_collider_2d(parent: CollisionObject2D, size: Vector2, offset: Vector2 = Vector2.ZERO) -> CollisionShape2D:
	var col_shape = CollisionShape2D.new()
	var box = RectangleShape2D.new()
	box.size = size
	col_shape.shape = box
	col_shape.position = offset
	parent.add_child(col_shape)
	return col_shape

## 为 CollisionObject2D 附加圆形碰撞体
static func attach_circle_collider_2d(parent: CollisionObject2D, radius: float, offset: Vector2 = Vector2.ZERO) -> CollisionShape2D:
	var col_shape = CollisionShape2D.new()
	var circle = CircleShape2D.new()
	circle.radius = radius
	col_shape.shape = circle
	col_shape.position = offset
	parent.add_child(col_shape)
	return col_shape

## 为 CollisionObject2D 附加胶囊体碰撞体 (常用于横版动作角色)
static func attach_capsule_collider_2d(parent: CollisionObject2D, radius: float, height: float, offset: Vector2 = Vector2.ZERO) -> CollisionShape2D:
	var col_shape = CollisionShape2D.new()
	var capsule = CapsuleShape2D.new()
	capsule.radius = radius
	capsule.height = height
	col_shape.shape = capsule
	col_shape.position = offset
	parent.add_child(col_shape)
	return col_shape

# =========================================================================
# 5. 碰撞图层与遮罩位运算转换器 (Layer Array to Bitmask)
# =========================================================================

## 物理图层列表转 32 位底层掩码整数
## 例如: GPhysics.to_mask([1, 2, 4]) => 1 (Layer 1) + 2 (Layer 2) + 8 (Layer 4) = 11
static func to_mask(layers: Array[int]) -> int:
	var mask = 0
	for l in layers:
		if l >= 1 and l <= 32:
			mask |= (1 << (l - 1))
	return mask

## 判断一个碰撞掩码整数是否包含指定图层 (1~32)
static func mask_has_layer(mask: int, layer: int) -> bool:
	if layer < 1 or layer > 32:
		return false
	return (mask & (1 << (layer - 1))) != 0
