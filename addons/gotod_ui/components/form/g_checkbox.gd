@tool
class_name GCheckbox
extends HBoxContainer

signal toggled(checked: bool)

@export var text: String = "Checkbox":
	set(val):
		text = val
		if _label: _label.text = text

@export var checked: bool = false:
	set(val):
		if checked != val:
			checked = val
			if _box: _box.queue_redraw()
			toggled.emit(checked)

@export var indeterminate: bool = false:
	set(val):
		indeterminate = val
		if _box: _box.queue_redraw()

@export var disabled: bool = false:
	set(val):
		disabled = val
		if _box: _box.queue_redraw()
		_update_styles()

var _box: Control
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
		
	_box = Control.new()
	_box.custom_minimum_size = Vector2(18, 18)
	_box.draw.connect(_on_box_draw)
	_box.mouse_filter = Control.MOUSE_FILTER_PASS
	add_child(_box)
	
	_label = Label.new()
	_label.text = text
	_label.mouse_filter = Control.MOUSE_FILTER_PASS
	add_child(_label)

func _gui_input(event: InputEvent) -> void:
	if disabled: return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		checked = !checked
		accept_event()

func _on_box_draw() -> void:
	var r = Rect2(0, 0, 18, 18)
	var primary_c = GotodTheme.get_color("primary", Color("#18a058"))
	var border_c = GotodTheme.get_color("border_base", Color("#383842"))
	var bg_c = GotodTheme.get_color("bg_surface", Color("#18181c"))
	
	if checked or indeterminate:
		_box.draw_rect(r, primary_c, true, 4.0)
		if indeterminate:
			_box.draw_line(Vector2(4, 9), Vector2(14, 9), Color.WHITE, 2.0)
		else:
			# Checkmark path
			_box.draw_polyline(PackedVector2Array([
				Vector2(4, 9.5),
				Vector2(7.5, 13),
				Vector2(14, 5.5)
			]), Color.WHITE, 2.0)
	else:
		_box.draw_rect(r, bg_c, true, 4.0)
		_box.draw_rect(r, border_c, false, 1.0, 4.0)

func _update_styles() -> void:
	if _label:
		var col = GotodTheme.get_color("text_disabled") if disabled else GotodTheme.get_color("text_primary")
		_label.add_theme_color_override("font_color", col)
	if _box:
		_box.queue_redraw()
