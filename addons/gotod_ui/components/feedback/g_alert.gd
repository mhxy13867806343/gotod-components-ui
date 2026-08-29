@tool
class_name GAlert
extends PanelContainer

signal closed

@export var title: String = "Alert Title":
	set(val):
		title = val
		if _title_lbl: _title_lbl.text = title

@export var description: String = "":
	set(val):
		description = val
		_update_content()

@export var type: GThemeTokens.Status = GThemeTokens.Status.INFO:
	set(val):
		type = val
		_update_styles()

@export var closable: bool = false:
	set(val):
		closable = val
		if _close_btn: _close_btn.visible = closable

@export var show_icon: bool = true:
	set(val):
		show_icon = val
		if _icon_lbl: _icon_lbl.visible = show_icon

var _icon_lbl: Label
var _title_lbl: Label
var _desc_lbl: Label
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
	hbox.add_theme_constant_override("separation", 10)
	add_child(hbox)
	
	_icon_lbl = Label.new()
	_icon_lbl.visible = show_icon
	hbox.add_child(_icon_lbl)
	
	var vbox = VBoxContainer.new()
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.add_theme_constant_override("separation", 2)
	hbox.add_child(vbox)
	
	_title_lbl = Label.new()
	_title_lbl.text = title
	vbox.add_child(_title_lbl)
	
	_desc_lbl = Label.new()
	_desc_lbl.text = description
	_desc_lbl.visible = !description.is_empty()
	_desc_lbl.add_theme_font_size_override("font_size", 12)
	vbox.add_child(_desc_lbl)
	
	_close_btn = Button.new()
	_close_btn.text = "×"
	_close_btn.flat = true
	_close_btn.focus_mode = Control.FOCUS_NONE
	_close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_close_btn.visible = closable
	_close_btn.pressed.connect(_on_close)
	hbox.add_child(_close_btn)

func _update_content() -> void:
	if _desc_lbl:
		_desc_lbl.text = description
		_desc_lbl.visible = !description.is_empty()

func _on_close() -> void:
	closed.emit()
	queue_free()

func _update_styles() -> void:
	var col = GotodTheme.get_status_color(type)
	var bg_col = col * Color(1, 1, 1, 0.12)
	var border_col = col * Color(1, 1, 1, 0.3)
	
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0, 14.0, 10.0)
	add_theme_stylebox_override("panel", sb)
	
	var prefix_icon = "●"
	match type:
		GThemeTokens.Status.SUCCESS: prefix_icon = "✔"
		GThemeTokens.Status.WARNING: prefix_icon = "⚠"
		GThemeTokens.Status.DANGER: prefix_icon = "✖"
		GThemeTokens.Status.INFO: prefix_icon = "ℹ"
		_: prefix_icon = "●"
		
	if _icon_lbl:
		_icon_lbl.text = prefix_icon
		_icon_lbl.add_theme_color_override("font_color", col)
		
	if _title_lbl:
		_title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
	if _desc_lbl:
		_desc_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_secondary"))
