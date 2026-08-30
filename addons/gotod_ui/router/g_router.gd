@tool
class_name GRouter
extends RefCounted

## 游戏场景路由与转场动画管理器 (Scene Router & Transition Manager for Godot 4)
## 支持带参数/不带参数跳转、向左滑动等多样化动画、参数提取与返回回调

enum TransitionType {
	SLIDE_LEFT,     # 1. 👈 从右侧滑向中间 (Slide Left to Center - 默认)
	SLIDE_RIGHT,    # 2. 👉 从左侧滑向中间 (Slide Right to Center)
	SLIDE_UP,       # 3. 👆 从底部滑向中间 (Slide Up to Center)
	SLIDE_DOWN,     # 4. 👇 从顶部滑向中间 (Slide Down to Center)
	ZOOM_IN,        # 5. 🔍 从中心从小放大展开 (Zoom In: 0.01 -> 1.0)
	ZOOM_OUT,       # 6. 🔎 从远景由大缩小汇聚 (Zoom Out: 2.0 -> 1.0)
	ZOOM_BOUNCE,    # 7. 🔮 Q弹果冻弹性缩放 (Jelly Spring Bounce Zoom)
	ZOOM_CENTER,    # 兼容别名 (等同于 ZOOM_IN)
	FADE,           # 8. 🌫️ 经典淡入淡出 (Fade In/Out)
	NONE            # 9. ⚡ 无动画瞬切 (Instant)
}

static var _route_stack: Array[Dictionary] = [] # 历史栈 [{path, params, scene_instance}]
static var _current_params: Dictionary = {}
static var _is_transitioning: bool = false

# ----------------------------------------------------
# 1. 页面跳转 (Push Route)
# ----------------------------------------------------

## 跳转到新页面/场景 (Push Route)
## @param scene_path 场景路径 (如 "res://scenes/shop.tscn")
## @param params 传递给目标页面的字典参数
## @param transition 转场动画类型 (默认 TransitionType.SLIDE_LEFT 向左滑动)
## @param duration 动画过渡时长 (秒)
## @param context_node 当前调用上下文节点 (必须挂载在场景树上)
## @return GResult 操作结果对象
static func push(scene_path: String, params: Dictionary = {}, transition: TransitionType = TransitionType.SLIDE_LEFT, duration: float = 0.35, context_node: Node = null) -> GResult:
	# 强校验节点生命周期: 必须挂载在场景树上
	if context_node != null:
		var guard_res = GLifecycleGuard.check(context_node, "GRouter.push")
		if not guard_res.success:
			return guard_res
			
	if _is_transitioning:
		return GResult.fail("BUSY", "转场动画执行中，请勿重复调用")
	_is_transitioning = true
	
	var tree = context_node.get_tree() if context_node and context_node.is_inside_tree() else Engine.get_main_loop() as SceneTree
	if not tree or not tree.root:
		_is_transitioning = false
		return GResult.fail("ERR_NO_SCENETREE", "无法获取有效 SceneTree 根节点", "请在合法生命周期内调用")
		
	var root = tree.root
	
	var packed = load(scene_path) as PackedScene
	if not packed:
		push_error("[GRouter] 无法加载目标场景: " + scene_path)
		_is_transitioning = false
		return GResult.fail("ERR_LOAD_FAILED", "无法加载目标场景文件: " + scene_path, "请检查文件路径是否存在")
		
	var next_scene = packed.instantiate() as Node
	_current_params = params.duplicate(true)
	
	# 保存历史记录
	_route_stack.append({
		"path": scene_path,
		"params": params,
		"transition": transition
	})
	
	# 执行转场动画
	await _play_transition_animation(root, next_scene, transition, duration, false, tree)
	_is_transitioning = false
	return GResult.ok(null, "成功跳转至场景: " + scene_path)

# ----------------------------------------------------
# 2. 页面返回 (Pop / Back Route)
# ----------------------------------------------------

## 返回上一页面 (Back)
static func back(result_data: Dictionary = {}, duration: float = 0.3, context_node: Node = null) -> void:
	if _route_stack.size() <= 1 or _is_transitioning:
		return
	_is_transitioning = true
	
	var current_route = _route_stack.pop_back()
	var prev_route = _route_stack.back()
	
	var tree = context_node.get_tree() if context_node and context_node.is_inside_tree() else Engine.get_main_loop() as SceneTree
	var root = tree.root
	
	var packed = load(prev_route["path"]) as PackedScene
	var prev_scene = packed.instantiate()
	_current_params = result_data.duplicate(true)
	
	# 反向播放转场动画
	await _play_transition_animation(root, prev_scene, current_route.get("transition", TransitionType.SLIDE_LEFT), duration, true, tree)
	_is_transitioning = false

# ----------------------------------------------------
# 3. 参数获取 (Get Route Params)
# ----------------------------------------------------

## 在目标页面 _ready() 中获取传过来的参数
static func get_params(_caller: Node = null) -> Dictionary:
	return _current_params

## 获取指定键名的参数
static func get_param(key: String, default_val: Variant = null) -> Variant:
	return _current_params.get(key, default_val)

## 批量将全部路由参数自动反射注入给目标对象 (例如传入 self 自动为匹配变量赋值)
static func apply_params_to(target_object: Object) -> int:
	if not target_object:
		return 0
	var applied_count = 0
	for k in _current_params.keys():
		if k in target_object:
			target_object.set(k, _current_params[k])
			applied_count += 1
	return applied_count

# ----------------------------------------------------
# 4. 内部转场动画驱动 (Tween Animation Engine)
# ----------------------------------------------------
static func _play_transition_animation(root: Window, new_scene: Node, transition: TransitionType, duration: float, is_reverse: bool, tree: SceneTree) -> void:
	var viewport_size = root.get_viewport().get_visible_rect().size
	var old_scene = root.get_child(root.get_child_count() - 1)
	
	root.add_child(new_scene)
	
	if transition == TransitionType.NONE:
		if old_scene: old_scene.queue_free()
		return
		
	var tween = tree.create_tween().set_parallel(true).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	
	if transition == TransitionType.SLIDE_LEFT:
		# 1. 从右向左滑向中间 (Slide Left to Center)
		if not is_reverse:
			if new_scene is Control: new_scene.position.x = viewport_size.x
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:x", -viewport_size.x * 0.35, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:x", 0.0, duration)
		else:
			if new_scene is Control: new_scene.position.x = -viewport_size.x * 0.35
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:x", viewport_size.x, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:x", 0.0, duration)
				
	elif transition == TransitionType.SLIDE_RIGHT:
		# 2. 从左向右滑向中间 (Slide Right to Center)
		if not is_reverse:
			if new_scene is Control: new_scene.position.x = -viewport_size.x
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:x", viewport_size.x * 0.35, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:x", 0.0, duration)
		else:
			if new_scene is Control: new_scene.position.x = viewport_size.x * 0.35
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:x", -viewport_size.x, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:x", 0.0, duration)
				
	elif transition == TransitionType.SLIDE_UP:
		# 3. 从底部向上滑向中间 (Slide Up to Center)
		if not is_reverse:
			if new_scene is Control: new_scene.position.y = viewport_size.y
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:y", -viewport_size.y * 0.35, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:y", 0.0, duration)
		else:
			if new_scene is Control: new_scene.position.y = -viewport_size.y * 0.35
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:y", viewport_size.y, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:y", 0.0, duration)
				
	elif transition == TransitionType.SLIDE_DOWN:
		# 4. 从顶部向下滑向中间 (Slide Down to Center)
		if not is_reverse:
			if new_scene is Control: new_scene.position.y = -viewport_size.y
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:y", viewport_size.y * 0.35, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:y", 0.0, duration)
		else:
			if new_scene is Control: new_scene.position.y = viewport_size.y * 0.35
			if old_scene and old_scene is Control:
				tween.tween_property(old_scene, "position:y", -viewport_size.y, duration)
			if new_scene is Control:
				tween.tween_property(new_scene, "position:y", 0.0, duration)
				
	elif transition == TransitionType.ZOOM_IN or transition == TransitionType.ZOOM_CENTER:
		# 5. 从屏幕中心从小放大展开 (Zoom In: 0.01 -> 1.0)
		if new_scene is Control:
			new_scene.pivot_offset = viewport_size / 2.0
			new_scene.scale = Vector2(0.01, 0.01) if not is_reverse else Vector2(1.2, 1.2)
			tween.tween_property(new_scene, "scale", Vector2.ONE, duration)
		if old_scene and old_scene is Control:
			old_scene.pivot_offset = viewport_size / 2.0
			var target_scale = Vector2(1.2, 1.2) if not is_reverse else Vector2(0.01, 0.01)
			tween.tween_property(old_scene, "scale", target_scale, duration)
			if old_scene is CanvasItem:
				tween.tween_property(old_scene, "modulate:a", 0.0, duration)
				
	elif transition == TransitionType.ZOOM_OUT:
		# 6. 从远景由大缩小汇聚 (Zoom Out: 2.0 -> 1.0)
		if new_scene is Control:
			new_scene.pivot_offset = viewport_size / 2.0
			new_scene.scale = Vector2(2.0, 2.0) if not is_reverse else Vector2(0.01, 0.01)
			if new_scene is CanvasItem: new_scene.modulate.a = 0.0
			tween.tween_property(new_scene, "scale", Vector2.ONE, duration)
			if new_scene is CanvasItem: tween.tween_property(new_scene, "modulate:a", 1.0, duration * 0.6)
		if old_scene and old_scene is Control:
			old_scene.pivot_offset = viewport_size / 2.0
			var target_scale = Vector2(0.01, 0.01) if not is_reverse else Vector2(2.0, 2.0)
			tween.tween_property(old_scene, "scale", target_scale, duration)
			if old_scene is CanvasItem:
				tween.tween_property(old_scene, "modulate:a", 0.0, duration)
				
	elif transition == TransitionType.ZOOM_BOUNCE:
		# 7. Q弹果冻弹性缩放 (Jelly Spring Bounce Zoom)
		if new_scene is Control:
			new_scene.pivot_offset = viewport_size / 2.0
			new_scene.scale = Vector2(0.01, 0.01)
			var bounce_tween = tree.create_tween().set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
			bounce_tween.tween_property(new_scene, "scale", Vector2.ONE, duration)
		if old_scene and old_scene is CanvasItem:
			tween.tween_property(old_scene, "modulate:a", 0.0, duration * 0.8)
				
	elif transition == TransitionType.FADE:
		# 6. 经典淡入淡出 (Fade In/Out)
		if new_scene is CanvasItem: new_scene.modulate.a = 0.0
		if new_scene is CanvasItem:
			tween.tween_property(new_scene, "modulate:a", 1.0, duration)
		if old_scene and old_scene is CanvasItem:
			tween.tween_property(old_scene, "modulate:a", 0.0, duration)
			
	await tween.finished
	if old_scene and old_scene != new_scene:
		old_scene.queue_free()
