@tool
class_name GTooltip
extends PanelContainer

@export var content: String = "Tooltip content":
	set(val):
		content = val
		if _label: _label.text = content

@export var dark_theme: bool = true

var _label: Label

func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	_label = Label.new()
	_label.text = content
	_label.add_theme_font_size_override("font_size", 12)
	add_child(_label)
	_update_styles()

func _update_styles() -> void:
	var bg_col = Color("#222226") if dark_theme else Color("#ffffff")
	var text_col = Color("#ffffff") if dark_theme else Color("#1f2225")
	var border_col = Color("#44444e") if dark_theme else Color("#e4e7ed")
	
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 4.0, 8.0, 4.0, Color(0, 0, 0, 0.25), 6)
	add_theme_stylebox_override("panel", sb)
	if _label:
		_label.add_theme_color_override("font_color", text_col)
