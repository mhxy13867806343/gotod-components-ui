@tool
class_name GText
extends Label

enum TextType {
	DEFAULT,
	PRIMARY,
	SUCCESS,
	WARNING,
	DANGER,
	INFO,
	SECONDARY
}

enum Hierarchy {
	BODY,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	CAPTION,
	CODE
}

## 修复：@export_enum + int，避免内部枚举 setter 类型冲突
@export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO", "SECONDARY") \
		var text_type: int = TextType.DEFAULT:
	set(val):
		text_type = val
		if is_node_ready():
			_update_styles()

@export_enum("BODY", "H1", "H2", "H3", "H4", "H5", "H6", "CAPTION", "CODE") \
		var hierarchy: int = Hierarchy.BODY:
	set(val):
		hierarchy = val
		if is_node_ready():
			_update_styles()

@export var strong: bool = false:
	set(val):
		strong = val
		if is_node_ready():
			_update_styles()

@export var italic: bool = false:
	set(val):
		italic = val
		if is_node_ready():
			_update_styles()

@export var code_style: bool = false:
	set(val):
		code_style = val
		if is_node_ready():
			_update_styles()

func _ready() -> void:
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)
	_update_styles()

func _update_styles() -> void:
	var font_size = 14
	match hierarchy:
		Hierarchy.H1: font_size = 32
		Hierarchy.H2: font_size = 24
		Hierarchy.H3: font_size = 20
		Hierarchy.H4: font_size = 18
		Hierarchy.H5: font_size = 16
		Hierarchy.H6: font_size = 14
		Hierarchy.CAPTION: font_size = 12
		Hierarchy.CODE: font_size = 13
		_: font_size = 14

	add_theme_font_size_override("font_size", font_size)

	var col = GotodTheme.get_color("text_primary")
	match text_type:
		TextType.PRIMARY:   col = GotodTheme.get_color("primary")
		TextType.SUCCESS:   col = GotodTheme.get_color("success")
		TextType.WARNING:   col = GotodTheme.get_color("warning")
		TextType.DANGER:    col = GotodTheme.get_color("danger")
		TextType.INFO:      col = GotodTheme.get_color("info")
		TextType.SECONDARY: col = GotodTheme.get_color("text_secondary")
		_:                  col = GotodTheme.get_color("text_primary")

	add_theme_color_override("font_color", col)

## 静态多态构建工厂 (支持 1. 单值简写 create(text), 2. 字典对象 create({ ... }), 3. 多参数 create(text, type, hierarchy))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GText:
	var label = GText.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("text"): label.text = str(opts["text"])
		if opts.has("type"):
			if opts["type"] is int: label.text_type = opts["type"]
			elif opts["type"] is String: label.text_type = _parse_text_type(opts["type"])
		if opts.has("hierarchy"):
			if opts["hierarchy"] is int: label.hierarchy = opts["hierarchy"]
			elif opts["hierarchy"] is String: label.hierarchy = _parse_hierarchy(opts["hierarchy"])
		if opts.has("strong"): label.strong = bool(opts["strong"])
		if opts.has("italic"): label.italic = bool(opts["italic"])
		if opts.has("code_style"): label.code_style = bool(opts["code_style"])
	elif arg1 != null:
		label.text = str(arg1)
		if arg2 != null:
			if arg2 is int: label.text_type = arg2
			elif arg2 is String: label.text_type = _parse_text_type(arg2)
		if arg3 != null:
			if arg3 is int: label.hierarchy = arg3
			elif arg3 is String: label.hierarchy = _parse_hierarchy(arg3)
	return label

static func _parse_text_type(name: String) -> int:
	match name.to_lower():
		"primary": return TextType.PRIMARY
		"success": return TextType.SUCCESS
		"warning": return TextType.WARNING
		"danger", "error": return TextType.DANGER
		"info": return TextType.INFO
		"secondary": return TextType.SECONDARY
		_: return TextType.DEFAULT

static func _parse_hierarchy(name: String) -> int:
	match name.to_lower():
		"h1": return Hierarchy.H1
		"h2": return Hierarchy.H2
		"h3": return Hierarchy.H3
		"h4": return Hierarchy.H4
		"h5": return Hierarchy.H5
		"h6": return Hierarchy.H6
		"caption": return Hierarchy.CAPTION
		"code": return Hierarchy.CODE
		_: return Hierarchy.BODY
