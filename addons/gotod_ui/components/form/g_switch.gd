@tool
class_name GSwitch
extends Control

signal toggled(checked: bool)

@export var checked: bool = false:
	set(val):
		if checked != val:
			checked = val
			_animate_thumb()
			toggled.emit(checked)
			queue_redraw()

@export var switch_size: GThemeTokens.Size = GThemeTokens.Size.MEDIUM:
	set(val):
		switch_size = val
		_update_size()
		queue_redraw()

@export var checked_color: Color = Color.TRANSPARENT:
	set(val):
		checked_color = val
		queue_redraw()

@export var unchecked_color: Color = Color.TRANSPARENT:
	set(val):
		unchecked_color = val
		queue_redraw()

@export var disabled: bool = false:
	set(val):
		disabled = val
		queue_redraw()

var _thumb_pos: float = 0.0
var _tween: Tween

func _ready() -> void:
	focus_mode = Control.FOCUS_ALL
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_update_size()
	_thumb_pos = 1.0 if checked else 0.0
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _update_size() -> void:
	match switch_size:
		GThemeTokens.Size.SMALL:
			custom_minimum_size = Vector2(36, 18)
		GThemeTokens.Size.LARGE:
			custom_minimum_size = Vector2(56, 28)
		_:
			custom_minimum_size = Vector2(44, 22)

func _gui_input(event: InputEvent) -> void:
	if disabled: return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		checked = !checked
		accept_event()
	elif event.is_action_pressed("ui_accept"):
		checked = !checked
		accept_event()

func _animate_thumb() -> void:
	if _tween and _tween.is_valid():
		_tween.kill()
	_tween = create_tween().set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
	var target = 1.0 if checked else 0.0
	_tween.tween_property(self, "_thumb_pos", target, 0.2)
	_tween.parallel().tween_callback(queue_redraw)

func _draw() -> void:
	var w = size.x
	var h = size.y
	var radius = h / 2.0
	var track_rect = Rect2(0, 0, w, h)
	
	var active_c = checked_color if checked_color != Color.TRANSPARENT else GotodTheme.get_color("primary", Color("#18a058"))
	var inactive_c = unchecked_color if unchecked_color != Color.TRANSPARENT else GotodTheme.get_color("border_base", Color("#383842"))
	
	if disabled:
		active_c.a *= 0.5
		inactive_c.a *= 0.5
		
	var current_track_col = inactive_c.lerp(active_c, _thumb_pos)
	draw_rect(track_rect, current_track_col, true, radius)
	
	# Thumb circle
	var thumb_margin = 2.0
	var thumb_radius = (h - thumb_margin * 2.0) / 2.0
	var min_thumb_x = radius
	var max_thumb_x = w - radius
	var thumb_center_x = lerpf(min_thumb_x, max_thumb_x, _thumb_pos)
	draw_circle(Vector2(thumb_center_x, thumb_center_y), thumb_radius, Color.WHITE)

## 静态多态构建工厂 (支持 1. 布尔单值 create(true), 2. 字典对象 create({ ... }), 3. 多参数 create(checked, on_toggle, disabled))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GSwitch:
	var sw = GSwitch.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("checked") or opts.has("value"): sw.checked = bool(opts.get("checked", opts.get("value", false)))
		if opts.has("size"): sw.switch_size = opts["size"]
		if opts.has("disabled"): sw.disabled = bool(opts["disabled"])
		if opts.has("checked_color"): sw.checked_color = Color(opts["checked_color"])
		if opts.has("on_toggle") and opts["on_toggle"] is Callable: sw.toggled.connect(opts["on_toggle"])
		elif opts.has("on_change") and opts["on_change"] is Callable: sw.toggled.connect(opts["on_change"])
	elif arg1 != null:
		sw.checked = bool(arg1)
		if arg2 is Callable:
			sw.toggled.connect(arg2)
		if arg3 != null:
			sw.disabled = bool(arg3)
	return sw
