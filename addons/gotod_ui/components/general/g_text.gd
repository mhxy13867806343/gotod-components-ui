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

@export var text_type: TextType = TextType.DEFAULT:
	set(val):
		text_type = val
		_update_styles()

@export var hierarchy: Hierarchy = Hierarchy.BODY:
	set(val):
		hierarchy = val
		_update_styles()

@export var strong: bool = false:
	set(val):
		strong = val
		_update_styles()

@export var italic: bool = false:
	set(val):
		italic = val
		_update_styles()

@export var code_style: bool = false:
	set(val):
		code_style = val
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
		TextType.PRIMARY: col = GotodTheme.get_color("primary")
		TextType.SUCCESS: col = GotodTheme.get_color("success")
		TextType.WARNING: col = GotodTheme.get_color("warning")
		TextType.DANGER: col = GotodTheme.get_color("danger")
		TextType.INFO: col = GotodTheme.get_color("info")
		TextType.SECONDARY: col = GotodTheme.get_color("text_secondary")
		_: col = GotodTheme.get_color("text_primary")
		
	add_theme_color_override("font_color", col)
