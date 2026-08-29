@tool
class_name GLoading
extends Control

@export var text: String = "Loading...":
	set(val):
		text = val
		if _label: _label.text = text

@export var spinner_color: Color = Color.TRANSPARENT:
	set(val):
		spinner_color = val
		queue_redraw()

@export var spinner_size: float = 36.0:
	set(val):
		spinner_size = val
		if _spinner:
			_spinner.custom_minimum_size = Vector2(spinner_size, spinner_size)

var _mask: ColorRect
var _vbox: VBoxContainer
var _spinner: Control
var _label: Label
var _angle: float = 0.0

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	_setup_ui()

func _setup_ui() -> void:
	for child in get_children():
		child.queue_free()
		
	_mask = ColorRect.new()
	_mask.anchors_preset = Control.PRESET_FULL_RECT
	_mask.color = Color(0, 0, 0, 0.45)
	add_child(_mask)
	
	_vbox = VBoxContainer.new()
	_vbox.anchor_left = 0.5
	_vbox.anchor_top = 0.5
	_vbox.anchor_right = 0.5
	_vbox.anchor_bottom = 0.5
	_vbox.grow_horizontal = Control.GROW_DIRECTION_BOTH
	_vbox.grow_vertical = Control.GROW_DIRECTION_BOTH
	_vbox.alignment = BoxContainer.ALIGNMENT_CENTER
	_vbox.add_theme_constant_override("separation", 10)
	add_child(_vbox)
	
	_spinner = Control.new()
	_spinner.custom_minimum_size = Vector2(spinner_size, spinner_size)
	_spinner.draw.connect(_on_spinner_draw)
	_vbox.add_child(_spinner)
	
	_label = Label.new()
	_label.text = text
	_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_label.add_theme_font_size_override("font_size", 13)
	_vbox.add_child(_label)

func _process(delta: float) -> void:
	if visible and _spinner:
		_angle += delta * 6.0
		if _angle > TAU: _angle -= TAU
		_spinner.queue_redraw()

func _on_spinner_draw() -> void:
	var center = Vector2(spinner_size / 2.0, spinner_size / 2.0)
	var radius = spinner_size / 2.0 - 2.0
	var col = spinner_color if spinner_color != Color.TRANSPARENT else GotodTheme.get_color("primary", Color("#18a058"))
	
	_spinner.draw_arc(center, radius, 0, TAU, 32, col * Color(1, 1, 1, 0.2), 3.0, true)
	_spinner.draw_arc(center, radius, _angle, _angle + PI * 0.8, 24, col, 3.0, true)
