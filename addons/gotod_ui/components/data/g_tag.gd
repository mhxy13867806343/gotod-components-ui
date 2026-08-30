@tool
class_name GTag
extends PanelContainer

signal closed

enum Variant {
	LIGHT,
	OUTLINE,
	SOLID
}

@export var text: String = "Tag":
	set(val):
		text = val
		if _label: _label.text = text

@export var type: GThemeTokens.Status = GThemeTokens.Status.DEFAULT:
	set(val):
		type = val
		_update_styles()

@export_enum("LIGHT", "OUTLINE", "SOLID") var variant: int = Variant.LIGHT:
	set(val):
		variant = val
		if is_node_ready():
			_update_styles()

@export var round_shape: bool = false:
	set(val):
		round_shape = val
		_update_styles()

@export var closable: bool = false:
	set(val):
		closable = val
		if _close_btn: _close_btn.visible = closable

var _label: Label
var _close_btn: Button

func _ready() -> void:
	_setup_ui()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_ui() -> void:
	for child in get_children():
		child.queue_free()
		
	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 4)
	add_child(hbox)
	
	_label = Label.new()
	_label.text = text
	_label.add_theme_font_size_override("font_size", 12)
	hbox.add_child(_label)
	
	_close_btn = Button.new()
	_close_btn.text = "×"
	_close_btn.flat = true
	_close_btn.focus_mode = Control.FOCUS_NONE
	_close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_close_btn.visible = closable
	_close_btn.pressed.connect(_on_close)
	hbox.add_child(_close_btn)

func _on_close() -> void:
	closed.emit()
	queue_free()

func _update_styles() -> void:
	var col = GotodTheme.get_status_color(type)
	var radius = 999.0 if round_shape else 4.0
	
	var bg_col: Color
	var border_col: Color
	var text_col: Color
	
	match variant:
		Variant.SOLID:
			bg_col = col
			border_col = Color.TRANSPARENT
			text_col = Color.WHITE
		Variant.OUTLINE:
			bg_col = Color.TRANSPARENT
			border_col = col
			text_col = col
		Variant.LIGHT:
			bg_col = col * Color(1, 1, 1, 0.15)
			border_col = col * Color(1, 1, 1, 0.3)
			text_col = col
			
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, radius, 8.0, 2.0)
	add_theme_stylebox_override("panel", sb)
	
	if _label:
		_label.add_theme_color_override("font_color", text_col)
