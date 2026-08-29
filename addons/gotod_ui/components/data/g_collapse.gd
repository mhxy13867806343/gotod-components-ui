@tool
class_name GCollapse
extends VBoxContainer

signal toggled(is_open: bool)

@export var title: String = "Collapse Title":
	set(val):
		title = val
		if _title_lbl: _title_lbl.text = title

@export var is_open: bool = false:
	set(val):
		if is_open != val:
			is_open = val
			_update_open_state()
			toggled.emit(is_open)

var _header_panel: PanelContainer
var _title_lbl: Label
var _arrow_lbl: Label
var _body_container: PanelContainer

func _ready() -> void:
	add_theme_constant_override("separation", 0)
	_setup_ui()
	_update_open_state()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_ui() -> void:
	if _header_panel: return
	
	_header_panel = PanelContainer.new()
	_header_panel.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_header_panel.gui_input.connect(_on_header_input)
	add_child(_header_panel)
	
	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 8)
	_header_panel.add_child(hbox)
	
	_title_lbl = Label.new()
	_title_lbl.text = title
	_title_lbl.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	hbox.add_child(_title_lbl)
	
	_arrow_lbl = Label.new()
	_arrow_lbl.text = "▶"
	_arrow_lbl.add_theme_font_size_override("font_size", 10)
	hbox.add_child(_arrow_lbl)
	
	_body_container = PanelContainer.new()
	_body_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	add_child(_body_container)

func get_body_container() -> PanelContainer:
	return _body_container

func _on_header_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		is_open = !is_open

func _update_open_state() -> void:
	if _arrow_lbl:
		_arrow_lbl.text = "▼" if is_open else "▶"
	if _body_container:
		_body_container.visible = is_open

func _update_styles() -> void:
	var bg_header = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var bg_body = GotodTheme.get_color("bg_card", Color("#242428"))
	var border = GotodTheme.get_color("border_base", Color("#383842"))
	
	var sb_header = GotodTheme.create_stylebox_flat(bg_header, border, 1, 6.0, 14.0, 10.0)
	var sb_body = GotodTheme.create_stylebox_flat(bg_body, border, 1, 6.0, 14.0, 12.0)
	
	if _header_panel: _header_panel.add_theme_stylebox_override("panel", sb_header)
	if _body_container: _body_container.add_theme_stylebox_override("panel", sb_body)
	if _title_lbl: _title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
