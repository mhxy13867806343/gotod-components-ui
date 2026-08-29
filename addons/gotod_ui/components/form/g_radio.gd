@tool
class_name GRadio
extends HBoxContainer

signal selected

@export var text: String = "Radio Option":
	set(val):
		text = val
		if _label: _label.text = text

@export var value: String = ""

@export var checked: bool = false:
	set(val):
		if checked != val:
			checked = val
			if _circle: _circle.queue_redraw()
			if checked: selected.emit()

@export var disabled: bool = false:
	set(val):
		disabled = val
		if _circle: _circle.queue_redraw()
		_update_styles()

var _circle: Control
var _label: Label

func _ready() -> void:
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	add_theme_constant_override("separation", 8)
	_setup_children()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_children() -> void:
	for child in get_children():
		child.queue_free()
		
	_circle = Control.new()
	_circle.custom_minimum_size = Vector2(18, 18)
	_circle.draw.connect(_on_circle_draw)
	_circle.mouse_filter = Control.MOUSE_FILTER_PASS
	add_child(_circle)
	
	_label = Label.new()
	_label.text = text
	_label.mouse_filter = Control.MOUSE_FILTER_PASS
	add_child(_label)

func _gui_input(event: InputEvent) -> void:
	if disabled: return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		if not checked:
			checked = true
		accept_event()

func _on_circle_draw() -> void:
	var center = Vector2(9, 9)
	var radius = 8.0
	var primary_c = GotodTheme.get_color("primary", Color("#18a058"))
	var border_c = GotodTheme.get_color("border_base", Color("#383842"))
	var bg_c = GotodTheme.get_color("bg_surface", Color("#18181c"))
	
	if checked:
		_circle.draw_circle(center, radius, primary_c)
		_circle.draw_circle(center, 3.5, Color.WHITE)
	else:
		_circle.draw_circle(center, radius, bg_c)
		_circle.draw_arc(center, radius, 0, TAU, 32, border_c, 1.2, true)

func _update_styles() -> void:
	if _label:
		var col = GotodTheme.get_color("text_disabled") if disabled else GotodTheme.get_color("text_primary")
		_label.add_theme_color_override("font_color", col)
	if _circle:
		_circle.queue_redraw()
