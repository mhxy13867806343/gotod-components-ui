@tool
class_name GCard
extends PanelContainer

@export var title: String = "Card Title":
	set(val):
		title = val
		if _title_lbl: _title_lbl.text = title

@export var extra_text: String = "":
	set(val):
		extra_text = val
		if _extra_lbl:
			_extra_lbl.text = extra_text
			_extra_lbl.visible = !extra_text.is_empty()

@export var hoverable: bool = true
@export var bordered: bool = true:
	set(val):
		bordered = val
		_update_styles()

var _vbox: VBoxContainer
var _header: HBoxContainer
var _title_lbl: Label
var _extra_lbl: Label
var _content_box: VBoxContainer

func _ready() -> void:
	_setup_ui()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_ui() -> void:
	if _vbox: return
	
	_vbox = VBoxContainer.new()
	_vbox.add_theme_constant_override("separation", 12)
	add_child(_vbox)
	
	_header = HBoxContainer.new()
	_vbox.add_child(_header)
	
	_title_lbl = Label.new()
	_title_lbl.text = title
	_title_lbl.add_theme_font_size_override("font_size", 16)
	_title_lbl.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_header.add_child(_title_lbl)
	
	_extra_lbl = Label.new()
	_extra_lbl.text = extra_text
	_extra_lbl.visible = !extra_text.is_empty()
	_extra_lbl.add_theme_color_override("font_color", GotodTheme.get_color("primary", Color("#18a058")))
	_header.add_child(_extra_lbl)
	
	var div = GDivider.new()
	_vbox.add_child(div)
	
	_content_box = VBoxContainer.new()
	_content_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_box.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_vbox.add_child(_content_box)

func _update_styles() -> void:
	var bg_col = GotodTheme.get_color("bg_card", Color("#242428"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842")) if bordered else Color.TRANSPARENT
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1 if bordered else 0, 8.0, 16.0, 16.0, Color(0, 0, 0, 0.2), 6)
	add_theme_stylebox_override("panel", sb)
	
	if _title_lbl:
		_title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
