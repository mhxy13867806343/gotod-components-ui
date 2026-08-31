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

func get_content_box() -> VBoxContainer:
	if not _content_box:
		_setup_ui()
	return _content_box

func _update_styles() -> void:
	var bg_col = GotodTheme.get_color("bg_card", Color("#242428"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842")) if bordered else Color.TRANSPARENT
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1 if bordered else 0, 8.0, 16.0, 16.0, Color(0, 0, 0, 0.2), 6)
	add_theme_stylebox_override("panel", sb)
	
	if _title_lbl:
		_title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))

## 静态多态构建工厂 (支持 1. 标题单值 create("卡片标题"), 2. 字典对象 create({ ... }), 3. 多参数 create(title, extra, content_node))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GCard:
	var card = GCard.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("title") or opts.has("header"): card.title = str(opts.get("title", opts.get("header", "")))
		if opts.has("extra"): card.extra_text = str(opts["extra"])
		if opts.has("bordered"): card.bordered = bool(opts["bordered"])
		if opts.has("body") and opts["body"] is Node:
			card.get_content_box().add_child(opts["body"])
		elif opts.has("children") and opts["children"] is Array:
			for c in opts["children"]:
				if c is Node: card.get_content_box().add_child(c)
	elif arg1 != null:
		card.title = str(arg1)
		if arg2 != null and arg2 is String:
			card.extra_text = str(arg2)
		elif arg2 != null and arg2 is Node:
			card.get_content_box().add_child(arg2)
		if arg3 != null and arg3 is Node:
			card.get_content_box().add_child(arg3)
	return card
