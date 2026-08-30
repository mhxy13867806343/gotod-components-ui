# =========================================================================
# GCoord: Godot 4.x 全能 2D 游戏坐标系转换与向量几何计算工具库
# 专为 2D 游戏量身打造：
# 1. 2D 世界坐标 ➔ 屏幕画布 / UI 互转 (头顶血条、小地图、屏幕边缘指示器)
# 2. 屏幕边缘目标指示器 (Off-Screen Pointer / Target Indicator)
# 3. 2.5D 等轴测 (Isometric 45度斜视角) 与 直角坐标系互转
# 4. 2D 网格对齐、瓦片 TileMap 坐标与 Chunk 区块计算
# 5. 圆周环绕点阵 (环绕法球/弹幕) 与 宝箱开箱抛物线 (Bezier 曲线)
# 6. 2D 扇形视野探测 (FoV Cone Detection) 与 极坐标平滑插值
# =========================================================================
@tool
class_name GCoord
extends RefCounted

# =========================================================================
# 1. 2D 世界、屏幕与视口坐标转换 (World <-> Screen <-> Canvas)
# =========================================================================

## 2D 世界坐标转当前屏幕/UI 画布像素坐标
## 适用于：在 CanvasLayer 上绘制 NPC 头顶血条、任务光标、小地图
static func world_to_screen_2d(canvas_item: CanvasItem, world_pos: Vector2) -> Vector2:
	var canvas_transform = canvas_item.get_canvas_transform()
	return canvas_transform * world_pos

## 2D 屏幕/UI 像素坐标转 2D 世界坐标
## 适用于：鼠标点击屏幕位置转化为角色移动目标点、技能准心世界位置
static func screen_to_world_2d(canvas_item: CanvasItem, screen_pos: Vector2) -> Vector2:
	var canvas_transform = canvas_item.get_canvas_transform()
	return canvas_transform.affine_inverse() * screen_pos

## 全局坐标转目标节点局部坐标
static func global_to_local_2d(node: Node2D, global_pos: Vector2) -> Vector2:
	return node.to_local(global_pos)

## 局部坐标转全局坐标
static func local_to_global_2d(node: Node2D, local_pos: Vector2) -> Vector2:
	return node.to_global(local_pos)

# =========================================================================
# 2. 屏幕边缘目标指示器 (Off-Screen Target Pointer / Arrow Indicator)
# =========================================================================

## 计算屏幕外敌人或任务目标的边缘夹紧位置与指示箭头朝向
## 返回字典: { "screen_pos": Vector2, "angle": float, "is_on_screen": bool, "distance": float }
static func get_offscreen_indicator_2d(canvas_item: CanvasItem, target_world_pos: Vector2, padding: float = 32.0) -> Dictionary:
	var vp = canvas_item.get_viewport()
	if not vp:
		return { "screen_pos": Vector2.ZERO, "angle": 0.0, "is_on_screen": true, "distance": 0.0 }
		
	var vp_size = vp.get_visible_rect().size
	var target_screen_pos = world_to_screen_2d(canvas_item, target_world_pos)
	var screen_center = vp_size / 2.0
	
	var is_on_screen = (
		target_screen_pos.x >= padding and 
		target_screen_pos.x <= vp_size.x - padding and 
		target_screen_pos.y >= padding and 
		target_screen_pos.y <= vp_size.y - padding
	)
	
	if is_on_screen:
		return {
			"screen_pos": target_screen_pos,
			"angle": (target_screen_pos - screen_center).angle(),
			"is_on_screen": true,
			"distance": target_screen_pos.distance_to(screen_center)
		}
		
	# 射线相交屏幕边缘夹紧算法
	var dir = (target_screen_pos - screen_center).normalized()
	var angle = dir.angle()
	
	var min_x = padding
	var max_x = vp_size.x - padding
	var min_y = padding
	var max_y = vp_size.y - padding
	
	var clamped_x = clamp(target_screen_pos.x, min_x, max_x)
	var clamped_y = clamp(target_screen_pos.y, min_y, max_y)
	
	# 从中心向边缘计算交点
	var slope = dir.y / (dir.x if abs(dir.x) > 0.0001 else 0.0001)
	
	if dir.x > 0: # 偏右
		clamped_x = max_x
		clamped_y = screen_center.y + (max_x - screen_center.x) * slope
	elif dir.x < 0: # 偏左
		clamped_x = min_x
		clamped_y = screen_center.y + (min_x - screen_center.x) * slope
		
	if clamped_y > max_y: # 偏下
		clamped_y = max_y
		clamped_x = screen_center.x + (max_y - screen_center.y) / slope
	elif clamped_y < min_y: # 偏上
		clamped_y = min_y
		clamped_x = screen_center.x + (min_y - screen_center.y) / slope
		
	return {
		"screen_pos": Vector2(clamped_x, clamped_y),
		"angle": angle,
		"is_on_screen": false,
		"distance": target_screen_pos.distance_to(screen_center)
	}

# =========================================================================
# 3. 2.5D 等轴测 (Isometric 45° 视角) 坐标互转
# =========================================================================

## 直角笛卡尔坐标 (2D Cartesian) 转 等轴测斜视角坐标 (2.5D Isometric)
## 公式: X_iso = x - y, Y_iso = (x + y) / 2
static func cartesian_to_isometric_2d(cart_pos: Vector2) -> Vector2:
	return Vector2(cart_pos.x - cart_pos.y, (cart_pos.x + cart_pos.y) * 0.5)

## 等轴测斜视角坐标 (2.5D Isometric) 转 直角笛卡尔坐标 (2D Cartesian)
## 公式: X_cart = (2y + x) / 2, Y_cart = (2y - x) / 2
static func isometric_to_cartesian_2d(iso_pos: Vector2) -> Vector2:
	return Vector2((2.0 * iso_pos.y + iso_pos.x) * 0.5, (2.0 * iso_pos.y - iso_pos.x) * 0.5)

# =========================================================================
# 4. 2D 网格对齐、瓦片 TileMap 坐标与大世界区块 (Chunk)
# =========================================================================

## 2D 世界坐标对齐/吸附到指定大小网格中心
static func snap_to_grid_2d(world_pos: Vector2, cell_size: Vector2 = Vector2(32, 32)) -> Vector2:
	var gx = floor(world_pos.x / cell_size.x) * cell_size.x + (cell_size.x * 0.5)
	var gy = floor(world_pos.y / cell_size.y) * cell_size.y + (cell_size.y * 0.5)
	return Vector2(gx, gy)

## 2D 世界坐标转整数网格瓦片索引 (TileMap Cell Coord)
static func world_to_grid_coord_2d(world_pos: Vector2, cell_size: Vector2 = Vector2(32, 32)) -> Vector2i:
	return Vector2i(int(floor(world_pos.x / cell_size.x)), int(floor(world_pos.y / cell_size.y)))

## 根据大世界坐标计算所在的 Chunk 区块索引
static func get_chunk_coord(world_pos: Vector2, chunk_size: float = 512.0) -> Vector2i:
	return Vector2i(int(floor(world_pos.x / chunk_size)), int(floor(world_pos.y / chunk_size)))

## 大世界浮动原点平移 (Floating Origin Reset)
## 玩家远离世界中心超过 threshold 距离时平移整个世界根节点，彻底消除浮点抖动
static func check_and_shift_floating_origin(world_root: Node2D, player_pos: Vector2, threshold: float = 10000.0) -> Vector2:
	if player_pos.length_squared() > threshold * threshold:
		var shift_offset = -player_pos
		world_root.global_position += shift_offset
		return shift_offset
	return Vector2.ZERO

# =========================================================================
# 5. 2D 曲线抛物线、圆周环绕点阵与扇形视线判定
# =========================================================================

## 二次贝塞尔曲线插值 (用于宝箱金币爆出、飞剑弧形弹道)
static func bezier_quadratic_2d(p0: Vector2, p1: Vector2, p2: Vector2, t: float) -> Vector2:
	var u = 1.0 - t
	return (u * u * p0) + (2.0 * u * t * p1) + (t * t * p2)

## 快速生成带拱形弧度的战利品掉落轨迹点 (Loot Arc Trajectory)
## t 从 0.0 ~ 1.0
static func get_loot_arc_pos_2d(start_pos: Vector2, target_pos: Vector2, arc_height: float, t: float) -> Vector2:
	var mid_point = (start_pos + target_pos) * 0.5
	mid_point.y -= arc_height # 向上拱起
	return bezier_quadratic_2d(start_pos, mid_point, target_pos, t)

## 2D 圆周环绕均匀分布点阵生成 (用于环绕法球、圆形环状弹幕)
## 返回一组 Vector2 坐标数组
static func get_orbit_points_2d(center: Vector2, radius: float, count: int, offset_angle_rad: float = 0.0) -> Array[Vector2]:
	var points: Array[Vector2] = []
	if count <= 0:
		return points
	var step = (PI * 2.0) / float(count)
	for i in range(count):
		var angle = offset_angle_rad + (float(i) * step)
		points.append(center + Vector2(radius * cos(angle), radius * sin(angle)))
	return points

## 2D 扇形视野/攻击范围探测 (FoV Cone Check)
## 判断 target_pos 是否在以 source_pos 为顶点、朝向 forward_dir、最大角度 fov_deg、最大距离 max_dist 的扇形锥体内
static func is_in_fov_cone_2d(source_pos: Vector2, forward_dir: Vector2, target_pos: Vector2, max_dist: float, fov_deg: float = 90.0) -> bool:
	var diff = target_pos - source_pos
	var dist_sq = diff.length_squared()
	if dist_sq > max_dist * max_dist:
		return false
	if dist_sq < 0.0001:
		return true
	var dir_to_target = diff.normalized()
	var forward_norm = forward_dir.normalized()
	var angle_diff_deg = rad_to_deg(forward_norm.angle_to(dir_to_target))
	return abs(angle_diff_deg) <= (fov_deg * 0.5)

# =========================================================================
# 6. 3D 兼容投影辅助 (3D World -> 2D Screen UI HUD)
# =========================================================================

## 3D 世界坐标投影至 2D 屏幕坐标 (常用于 3D 角色头顶悬浮 2D UI 血条)
static func world_to_screen_3d(camera: Camera3D, world_pos: Vector3) -> Dictionary:
	if not camera or not camera.is_inside_tree():
		return { "screen_pos": Vector2.ZERO, "is_behind_camera": true, "visible": false }
	var is_behind = camera.is_position_behind(world_pos)
	var screen_pos = camera.unproject_position(world_pos)
	var vp_size = camera.get_viewport().get_visible_rect().size
	var in_screen = (screen_pos.x >= 0 and screen_pos.x <= vp_size.x and screen_pos.y >= 0 and screen_pos.y <= vp_size.y)
	return { "screen_pos": screen_pos, "is_behind_camera": is_behind, "visible": not is_behind and in_screen }

## 极坐标 (半径 r, 弧度角 theta) 转 笛卡尔直角坐标 (Vector2)
static func polar_to_cartesian(radius: float, angle_rad: float) -> Vector2:
	return Vector2(radius * cos(angle_rad), radius * sin(angle_rad))

## 环绕角度平滑插值 (自动处理 0度 与 360度 跨界)
static func lerp_angle_deg(from_deg: float, to_deg: float, weight: float) -> float:
	return rad_to_deg(lerp_angle(deg_to_rad(from_deg), deg_to_rad(to_deg), weight))
