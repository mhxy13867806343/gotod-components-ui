class_name GMessage
extends CanvasLayer

static var _instance: GMessage = null
var _container: VBoxContainer

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

static func info(content: String, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.INFO, duration)

static func success(content: String, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.SUCCESS, duration)

static func warning(content: String, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.WARNING, duration)

static func error(content: String, duration: float = 3.0) -> void:
	_show_toast(content, GThemeTokens.Status.DANGER, duration)

static func _show_toast(content: String, status: GThemeTokens.Status, duration: float) -> void:
	if _instance == null:
		print("[GMessage] ", content)
		return
	_instance._spawn_toast(content, status, duration)

func _spawn_toast(content: String, status: GThemeTokens.Status, duration: float) -> void:
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
			toast.queue_free()
