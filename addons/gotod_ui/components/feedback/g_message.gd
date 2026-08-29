class_name GMessage
extends CanvasLayer

static var _instance: GMessage = null
var _container: VBoxContainer
var _active_toasts: Array[PanelContainer] = []

func _ready() -> void:
	_instance = self
	layer = 120
	
	_container = VBoxContainer.new()
	_container.anchors_preset = Control.PRESET_TOP_WIDE
	_container.alignment = BoxContainer.ALIGNMENT_BEGIN
	_container.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_container.custom_minimum_size = Vector2(0, 0)
	_container.position = Vector2(0, 24)
	_container.add_theme_constant_override("separation", 12)
	add_child(_container)

# ==========================================
# 命令式 / 编程式静态调用 API (Imperative Static Methods)
# 支持传递 context_node 继承当前应用程序上下文/视口/主题
# ==========================================

## 信息提示 (Info Message)
static func info(content: String, context_node: Node = null, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.INFO, duration, context_node)

## 成功提示 (Success Message)
static func success(content: String, context_node: Node = null, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.SUCCESS, duration, context_node)

## 警告提示 (Warning Message)
static func warning(content: String, context_node: Node = null, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.WARNING, duration, context_node)

## 错误提示 (Error Message)
static func error(content: String, context_node: Node = null, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.DANGER, duration, context_node)

## 关闭所有活跃的消息实例 (Close All Active Messages)
static func close_all() -> void:
	if _instance and is_instance_valid(_instance):
		for toast in _instance._active_toasts.duplicate():
			if is_instance_valid(toast):
				toast.queue_free()
		_instance._active_toasts.clear()

## 字典选项配置调用 (Options Object Call)
static func show(options: Dictionary, context_node: Node = null) -> void:
	var msg = options.get("message", "")
	var type_str = options.get("type", "info")
	var duration = options.get("duration", 3.0)
	var status = GThemeTokens.Status.INFO
	match type_str:
		"success": status = GThemeTokens.Status.SUCCESS
		"warning": status = GThemeTokens.Status.WARNING
		"error", "danger": status = GThemeTokens.Status.DANGER
		_: status = GThemeTokens.Status.INFO
	_show_toast(msg, status, duration, context_node)

static func _show_toast(content: String, status: GThemeTokens.Status, duration: float, context_node: Node = null) -> void:
	# 若尚未初始化单例实例，或 context_node 存在，动态确保实例注入
	if _instance == null or not is_instance_valid(_instance):
		_instance = GMessage.new()
		var tree: SceneTree = null
		if context_node and is_instance_valid(context_node) and context_node.get_tree():
			tree = context_node.get_tree()
		elif Engine.get_main_loop() is SceneTree:
			tree = Engine.get_main_loop() as SceneTree
			
		if tree and tree.root:
			tree.root.add_child(_instance)
		else:
			print("[GMessage Fallback]: ", content)
			return
			
	_instance._spawn_toast(content, status, duration, context_node)

func _spawn_toast(content: String, status: GThemeTokens.Status, duration: float, context_node: Node = null) -> void:
	var toast = PanelContainer.new()
	toast.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	toast.mouse_filter = Control.MOUSE_FILTER_PASS
	
	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 8)
	toast.add_child(hbox)
	
	var icon_lbl = Label.new()
	var prefix_icon = "●"
	var col = GotodTheme.get_status_color(status)
	match status:
		GThemeTokens.Status.SUCCESS: prefix_icon = "✔"
		GThemeTokens.Status.WARNING: prefix_icon = "⚠"
		GThemeTokens.Status.DANGER: prefix_icon = "✖"
		GThemeTokens.Status.INFO: prefix_icon = "ℹ"
		
	icon_lbl.text = prefix_icon
	icon_lbl.add_theme_color_override("font_color", col)
	hbox.add_child(icon_lbl)
	
	var msg_lbl = Label.new()
	msg_lbl.text = content
	msg_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
	hbox.add_child(msg_lbl)
	
	var bg_col = GotodTheme.get_color("bg_card", Color("#242428"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 8.0, 16.0, 8.0, Color(0, 0, 0, 0.3), 8)
	toast.add_theme_stylebox_override("panel", sb)
	
	_container.add_child(toast)
	_active_toasts.append(toast)
	
	# Enter animation
	toast.modulate.a = 0.0
	toast.position.y -= 15
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	tw.tween_property(toast, "modulate:a", 1.0, 0.25)
	tw.tween_property(toast, "position:y", toast.position.y + 15, 0.25)
	
	await get_tree().create_timer(duration).timeout
	if is_instance_valid(toast):
		var tw_out = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		tw_out.tween_property(toast, "modulate:a", 0.0, 0.2)
		tw_out.tween_property(toast, "position:y", toast.position.y - 15, 0.2)
		await tw_out.finished
		if is_instance_valid(toast):
			_active_toasts.erase(toast)
			toast.queue_free()
