@tool
class_name GToast
extends CanvasLayer

## =========================================================================
## GToast: 轻提示 (Toast Prompt benchmarked against Vant UI)
## 在页面中间或顶部/底部弹出轻量级反馈提示，支持文字、成功、失败、加载与自定义图标。
## =========================================================================

enum Position {
	TOP,
	MIDDLE,
	BOTTOM
}

enum ToastType {
	TEXT,
	SUCCESS,
	FAIL,
	LOADING,
	CUSTOM
}

static var _instance: GToast = null
var _overlay_mask: ColorRect
var _toast_box: PanelContainer
var _content_box: VBoxContainer
var _icon_label: Label
var _icon_texture: TextureRect
var _msg_label: Label
var _spinner: Control
var _auto_timer: SceneTreeTimer
var _tween: Tween

func _ready() -> void:
	_instance = self
	layer = 150 # Above dialogs and overlays
	
	_overlay_mask = ColorRect.new()
	_overlay_mask.anchors_preset = Control.PRESET_FULL_RECT
	_overlay_mask.color = Color(0, 0, 0, 0.001)
	_overlay_mask.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_overlay_mask.visible = false
	add_child(_overlay_mask)
	
	_toast_box = PanelContainer.new()
	_toast_box.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_toast_box.visible = false
	
	var sb = StyleBoxFlat.new()
	sb.bg_color = Color(0.12, 0.12, 0.15, 0.9)
	sb.set_corner_radius_all(10)
	sb.set_content_margin_all(16)
	sb.shadow_color = Color(0, 0, 0, 0.3)
	sb.shadow_size = 8
	_toast_box.add_theme_stylebox_override("panel", sb)
	
	_content_box = VBoxContainer.new()
	_content_box.alignment = BoxContainer.ALIGNMENT_CENTER
	_content_box.add_theme_constant_override("separation", 8)
	
	_icon_label = Label.new()
	_icon_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_icon_label.add_theme_font_size_override("font_size", 28)
	_content_box.add_child(_icon_label)
	
	_msg_label = Label.new()
	_msg_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_msg_label.add_theme_font_size_override("font_size", 14)
	_msg_label.add_theme_color_override("font_color", Color.WHITE)
	_msg_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_content_box.add_child(_msg_label)
	
	_toast_box.add_child(_content_box)
	add_child(_toast_box)

# ==========================================
# 静态命令式快捷调用 (Static Imperative API)
# ==========================================

## 文字提示
static func show(message: String, duration: float = 2.0, position: Position = Position.MIDDLE) -> GToast:
	return _display_toast({
		"message": message,
		"type": ToastType.TEXT,
		"duration": duration,
		"position": position,
		"forbid_click": false
	})

## 成功提示
static func success(message: String, duration: float = 2.0) -> GToast:
	return _display_toast({
		"message": message,
		"type": ToastType.SUCCESS,
		"duration": duration,
		"position": Position.MIDDLE,
		"forbid_click": false
	})

## 失败/错误提示
static func fail(message: String, duration: float = 2.0) -> GToast:
	return _display_toast({
		"message": message,
		"type": ToastType.FAIL,
		"duration": duration,
		"position": Position.MIDDLE,
		"forbid_click": false
	})

## 加载中提示
static func loading(message: String = "加载中...", forbid_click: bool = true, duration: float = 0.0) -> GToast:
	return _display_toast({
		"message": message,
		"type": ToastType.LOADING,
		"duration": duration,
		"position": Position.MIDDLE,
		"forbid_click": forbid_click
	})

## 自定义图标或配置调用
static func custom(options: Dictionary) -> GToast:
	return _display_toast(options)

## 一键清除/关闭所有 Toast
static func clear() -> void:
	if _instance and is_instance_valid(_instance):
		_instance._hide_toast()

static func _display_toast(opts: Dictionary) -> GToast:
	if not _instance or not is_instance_valid(_instance):
		var tree = Engine.get_main_loop() as SceneTree
		if tree and tree.root:
			var new_inst = GToast.new()
			tree.root.add_child(new_inst)
			_instance = new_inst
	
	if _instance:
		_instance._show_internal(opts)
	return _instance

func _show_internal(opts: Dictionary) -> void:
	var msg = opts.get("message", "")
	var type = opts.get("type", ToastType.TEXT)
	var duration = opts.get("duration", 2.0)
	var pos = opts.get("position", Position.MIDDLE)
	var forbid_click = opts.get("forbid_click", false)
	
	_overlay_mask.visible = forbid_click
	_overlay_mask.mouse_filter = Control.MOUSE_FILTER_STOP if forbid_click else Control.MOUSE_FILTER_IGNORE
	
	_msg_label.text = msg
	
	match type:
		ToastType.TEXT:
			_icon_label.visible = false
			_toast_box.custom_minimum_size = Vector2(0, 0)
		ToastType.SUCCESS:
			_icon_label.visible = true
			_icon_label.text = "✓"
			_icon_label.add_theme_color_override("font_color", Color.hex(0x67c23a))
			_toast_box.custom_minimum_size = Vector2(120, 100)
		ToastType.FAIL:
			_icon_label.visible = true
			_icon_label.text = "✕"
			_icon_label.add_theme_color_override("font_color", Color.hex(0xf56c6c))
			_toast_box.custom_minimum_size = Vector2(120, 100)
		ToastType.LOADING:
			_icon_label.visible = true
			_icon_label.text = "◌"
			_icon_label.add_theme_color_override("font_color", Color.hex(0x409eff))
			_toast_box.custom_minimum_size = Vector2(120, 100)
		ToastType.CUSTOM:
			_icon_label.visible = opts.has("icon_text")
			if opts.has("icon_text"):
				_icon_label.text = str(opts["icon_text"])
			_toast_box.custom_minimum_size = Vector2(120, 100)
	
	# Layout Position
	_toast_box.visible = true
	_toast_box.modulate = Color(1, 1, 1, 0)
	
	var vp_size = get_viewport().get_visible_rect().size if get_viewport() else Vector2(1152, 648)
	var box_size = _toast_box.get_combined_minimum_size()
	
	var x = (vp_size.x - box_size.x) / 2.0
	var y = (vp_size.y - box_size.y) / 2.0
	match pos:
		Position.TOP:
			y = vp_size.y * 0.15
		Position.BOTTOM:
			y = vp_size.y * 0.82
		Position.MIDDLE:
			y = (vp_size.y - box_size.y) / 2.0
	
	_toast_box.position = Vector2(x, y)
	
	# Animate in
	if _tween and _tween.is_valid():
		_tween.kill()
	_tween = create_tween()
	_tween.tween_property(_toast_box, "modulate:a", 1.0, 0.2)
	
	# Auto dismiss
	if duration > 0:
		_auto_timer = get_tree().create_timer(duration)
		_auto_timer.timeout.connect(func(): _hide_toast())

func _hide_toast() -> void:
	_overlay_mask.visible = false
	if _toast_box and is_instance_valid(_toast_box) and _toast_box.visible:
		if _tween and _tween.is_valid():
			_tween.kill()
		_tween = create_tween()
		_tween.tween_property(_toast_box, "modulate:a", 0.0, 0.2)
		_tween.tween_callback(func(): _toast_box.visible = false)

## 动态修改当前显示文案 (例如更新倒计时)
func set_message(new_msg: String) -> GToast:
	if _msg_label:
		_msg_label.text = new_msg
	return self
