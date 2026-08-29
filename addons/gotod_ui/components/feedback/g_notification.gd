class_name GNotification
extends CanvasLayer

static var _instance: GNotification = null
var _container_top_right: VBoxContainer
var _active_notifs: Array[PanelContainer] = []

func _ready() -> void:
	_instance = self
	layer = 126
	
	_container_top_right = VBoxContainer.new()
	_container_top_right.anchors_preset = Control.PRESET_TOP_RIGHT
	_container_top_right.alignment = BoxContainer.ALIGNMENT_BEGIN
	_container_top_right.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_container_top_right.position = Vector2(-360, 20)
	_container_top_right.custom_minimum_size = Vector2(340, 0)
	_container_top_right.add_theme_constant_override("separation", 12)
	add_child(_container_top_right)

# ==========================================
# 命令式通知静态方法 (Imperative Notification Methods)
# ==========================================

static func notify(options: Dictionary, context_node: Node = null) -> void:
	var title = options.get("title", "通知")
	var msg = options.get("message", "")
	var type_str = options.get("type", "info")
	var duration = options.get("duration", 4.5)
	var status = GThemeTokens.Status.INFO
	match type_str:
		"success": status = GThemeTokens.Status.SUCCESS
		"warning": status = GThemeTokens.Status.WARNING
		"error", "danger": status = GThemeTokens.Status.DANGER
		_: status = GThemeTokens.Status.INFO
		
	_show_notification(title, msg, status, duration, context_node)

static func success(title: String, message: String, context_node: Node = null) -> void:
	_show_notification(title, message, GThemeTokens.Status.SUCCESS, 4.5, context_node)

static func warning(title: String, message: String, context_node: Node = null) -> void:
	_show_notification(title, message, GThemeTokens.Status.WARNING, 4.5, context_node)

static func error(title: String, message: String, context_node: Node = null) -> void:
	_show_notification(title, message, GThemeTokens.Status.DANGER, 4.5, context_node)

static func info(title: String, message: String, context_node: Node = null) -> void:
	_show_notification(title, message, GThemeTokens.Status.INFO, 4.5, context_node)

static func close_all() -> void:
	if _instance and is_instance_valid(_instance):
		for item in _instance._active_notifs.duplicate():
			if is_instance_valid(item):
				item.queue_free()
		_instance._active_notifs.clear()

static func _show_notification(title: String, message: String, status: GThemeTokens.Status, duration: float, context_node: Node = null) -> void:
	if _instance == null or not is_instance_valid(_instance):
		_instance = GNotification.new()
		var tree: SceneTree = null
		if context_node and is_instance_valid(context_node) and context_node.get_tree():
			tree = context_node.get_tree()
		elif Engine.get_main_loop() is SceneTree:
			tree = Engine.get_main_loop() as SceneTree
			
		if tree and tree.root:
			tree.root.add_child(_instance)
		else:
			print("[GNotification]: ", title, " - ", message)
			return
			
	_instance._spawn_notification(title, message, status, duration)

func _spawn_notification(title: String, message: String, status: GThemeTokens.Status, duration: float) -> void:
	var box = PanelContainer.new()
	box.custom_minimum_size = Vector2(320, 0)
	box.mouse_filter = Control.MOUSE_FILTER_PASS
	
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 6)
	box.add_child(vbox)
	
	var hbox = HBoxContainer.new()
	hbox.alignment = BoxContainer.ALIGNMENT_BEGIN
	vbox.add_child(hbox)
	
	var col = GotodTheme.get_status_color(status)
	var title_lbl = Label.new()
	title_lbl.text = title
	title_lbl.add_theme_font_size_override("font_size", 14)
	title_lbl.add_theme_color_override("font_color", col)
	hbox.add_child(title_lbl)
	
	var msg_lbl = Label.new()
	msg_lbl.text = message
	msg_lbl.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	msg_lbl.add_theme_font_size_override("font_size", 12)
	msg_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_regular"))
	vbox.add_child(msg_lbl)
	
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 8.0, 16.0, 12.0, Color(0, 0, 0, 0.3), 12)
	box.add_theme_stylebox_override("panel", sb)
	
	_container_top_right.add_child(box)
	_active_notifs.append(box)
	
	box.modulate.a = 0.0
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	tw.tween_property(box, "modulate:a", 1.0, 0.25)
	
	await get_tree().create_timer(duration).timeout
	if is_instance_valid(box):
		var tw_out = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		tw_out.tween_property(box, "modulate:a", 0.0, 0.2)
		await tw_out.finished
		if is_instance_valid(box):
			_active_notifs.erase(box)
			box.queue_free()
