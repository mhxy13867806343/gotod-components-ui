class_name GMessage
extends CanvasLayer

static var _instance: GMessage = null
var _container: VBoxContainer
var _active_toasts: Array[PanelContainer] = []
var _closing_toasts: Array[PanelContainer] = [] # 正在播放关闭动画的消息，避免手动关闭与自动计时重复释放

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
static func info(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false) -> void:
	_show_toast(content, GThemeTokens.Status.INFO, duration, context_node, closable)

## 成功提示 (Success Message)
static func success(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false) -> void:
	_show_toast(content, GThemeTokens.Status.SUCCESS, duration, context_node, closable)

## 警告提示 (Warning Message)
static func warning(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false) -> void:
	_show_toast(content, GThemeTokens.Status.WARNING, duration, context_node, closable)

## 错误提示 (Error Message)
static func error(content: String, context_node: Node = null, duration: float = 3.0, closable: bool = false) -> void:
	_show_toast(content, GThemeTokens.Status.DANGER, duration, context_node, closable)

## 关闭所有活跃的消息实例 (Close All Active Messages)
static func close_all() -> void:
	if _instance and is_instance_valid(_instance):
		for toast in _instance._active_toasts.duplicate():
			if is_instance_valid(toast):
				toast.queue_free()
		_instance._active_toasts.clear()
		_instance._closing_toasts.clear()

## 统一展示服务方法 (支持 String 简写与 Dictionary 选项对象，对标 service 规范避免与 Godot 冲突)
static func service(options_or_content: Variant, context_node: Node = null) -> void:
	if options_or_content is Dictionary:
		display(options_or_content as Dictionary, context_node)
	else:
		info(str(options_or_content), context_node)

## 启动别名方法
static func open(options_or_content: Variant, context_node: Node = null) -> void:
	service(options_or_content, context_node)

## 字典选项配置调用 (Options Object Call)
static func display(options: Dictionary, context_node: Node = null) -> void:
	var msg = options.get("message", options.get("text", options.get("content", "")))
	var type_str = options.get("type", "info")
	var duration = options.get("duration", 3.0)
	var closable = options.get("closable", false) # 是否显示右侧 clear/close 图标，默认不显示
	var status = GThemeTokens.Status.INFO
	match type_str:
		"success": status = GThemeTokens.Status.SUCCESS
		"warning": status = GThemeTokens.Status.WARNING
		"error", "danger": status = GThemeTokens.Status.DANGER
		_: status = GThemeTokens.Status.INFO
	_show_toast(msg, status, duration, context_node, closable)

static func _show_toast(content: String, status: GThemeTokens.Status, duration: float, context_node: Node = null, closable: bool = false) -> void:
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
			
	_instance._spawn_toast(content, status, duration, context_node, closable)

func _spawn_toast(content: String, status: GThemeTokens.Status, duration: float, context_node: Node = null, closable: bool = false) -> void:
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

	if closable:
		# 可关闭消息需要接收鼠标点击，所以 close 按钮自身使用 pointing hand。
		var close_btn = Button.new()
		close_btn.text = "×"
		close_btn.flat = true
		close_btn.focus_mode = Control.FOCUS_NONE
		close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
		close_btn.pressed.connect(func(): _close_toast(toast))
		hbox.add_child(close_btn)

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

	if duration <= 0.0:
		return

	# 只有设置了正数停留时长才自动淡出；手动关闭消息可用 duration = 0 常驻等待点击。
	await get_tree().create_timer(duration).timeout
	_close_toast(toast)

func _close_toast(toast: PanelContainer) -> void:
	if is_instance_valid(toast):
		if _closing_toasts.has(toast):
			return
		_closing_toasts.append(toast)
		_active_toasts.erase(toast)
		# 关闭统一走淡出上移动画，手动点击和自动超时保持一致。
		var tw_out = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		tw_out.tween_property(toast, "modulate:a", 0.0, 0.2)
		tw_out.tween_property(toast, "position:y", toast.position.y - 15, 0.2)
		await tw_out.finished
		if is_instance_valid(toast):
			toast.queue_free()
		_closing_toasts.erase(toast)
