@tool
class_name GButton
extends Button

enum ButtonType {
	DEFAULT,
	PRIMARY,
	SUCCESS,
	WARNING,
	DANGER,
	INFO
}

enum Variant {
	SOLID,
	OUTLINE,
	DASHED,
	TEXT,
	LINK
}

enum Shape {
	DEFAULT,
	ROUND,
	CIRCLE,
	SQUARE
}

## 修复：@export_enum + int，避免 @tool 脚本内部枚举 setter 类型冲突
@export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO") \
		var button_type: int = ButtonType.DEFAULT:
	set(val):
		button_type = val
		_update_styles()

@export_enum("SOLID", "OUTLINE", "DASHED", "TEXT", "LINK") \
		var variant: int = Variant.SOLID:
	set(val):
		variant = val
		_update_styles()

@export var button_size: GThemeTokens.Size = GThemeTokens.Size.MEDIUM:
	set(val):
		button_size = val
		_update_styles()

@export_enum("DEFAULT", "ROUND", "CIRCLE", "SQUARE") \
		var shape: int = Shape.DEFAULT:
	set(val):
		shape = val
		_update_styles()


@export var loading: bool = false:
	set(val):
		loading = val
		disabled = loading
		_update_loading_state()

@export var block: bool = false:
	set(val):
		block = val
		if block:
			size_flags_horizontal = Control.SIZE_EXPAND_FILL
		else:
			size_flags_horizontal = Control.SIZE_SHRINK_CENTER

@export var ghost: bool = false:
	set(val):
		ghost = val
		_update_styles()

@export var icon_texture: Texture2D = null:
	set(val):
		icon_texture = val
		icon = icon_texture

var _spinner: Control = null
var _orig_text: String = ""

func _ready() -> void:
	focus_mode = Control.FOCUS_ALL
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	
	if Engine.is_editor_hint():
		_update_styles()
		return
	
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)
	_update_styles()

func _update_loading_state() -> void:
	if loading:
		_orig_text = text
		text = " " + _orig_text
	else:
		if _orig_text != "":
			text = _orig_text

func _get_type_colors() -> Dictionary:
	var primary_c = GotodTheme.get_color("primary", Color("#18a058"))
	var hover_c = GotodTheme.get_color("primary_hover", Color("#36ad6a"))
	var active_c = GotodTheme.get_color("primary_active", Color("#0c7a43"))
	
	match button_type:
		ButtonType.PRIMARY:
			return {"main": primary_c, "hover": hover_c, "active": active_c, "text": Color.WHITE}
		ButtonType.SUCCESS:
			var sc = GotodTheme.get_color("success", Color("#18a058"))
			var sh = GotodTheme.get_color("success_hover", Color("#36ad6a"))
			return {"main": sc, "hover": sh, "active": sc.darkened(0.15), "text": Color.WHITE}
		ButtonType.WARNING:
			var wc = GotodTheme.get_color("warning", Color("#f0a020"))
			var wh = GotodTheme.get_color("warning_hover", Color("#fcb040"))
			return {"main": wc, "hover": wh, "active": wc.darkened(0.15), "text": Color.WHITE}
		ButtonType.DANGER:
			var dc = GotodTheme.get_color("danger", Color("#d03050"))
			var dh = GotodTheme.get_color("danger_hover", Color("#de576d"))
			return {"main": dc, "hover": dh, "active": dc.darkened(0.15), "text": Color.WHITE}
		ButtonType.INFO:
			var ic = GotodTheme.get_color("info", Color("#2080f0"))
			var ih = GotodTheme.get_color("info_hover", Color("#4098fc"))
			return {"main": ic, "hover": ih, "active": ic.darkened(0.15), "text": Color.WHITE}
		_: # DEFAULT
			var bg = GotodTheme.get_color("bg_surface", Color("#18181c"))
			var border = GotodTheme.get_color("border_base", Color("#383842"))
			var txt = GotodTheme.get_color("text_primary", Color("#f0f0f5"))
			return {
				"main": bg,
				"hover": bg.lightened(0.08),
				"active": bg.darkened(0.08),
				"border": border,
				"border_hover": primary_c,
				"text": txt,
				"text_hover": primary_c
			}

func _update_styles() -> void:
	var dim = GThemeTokens.get_size_dimensions(button_size)
	var radius = dim["radius"]
	if shape == Shape.ROUND:
		radius = 999.0
	elif shape == Shape.CIRCLE or shape == Shape.SQUARE:
		radius = 999.0 if shape == Shape.ROUND or shape == Shape.CIRCLE else 4.0
		custom_minimum_size = Vector2(dim["height"], dim["height"])
	else:
		custom_minimum_size = Vector2(0, dim["height"])
	
	add_theme_font_size_override("font_size", int(dim["font_size"]))
	
	var c = _get_type_colors()
	var normal_sb: StyleBoxFlat
	var hover_sb: StyleBoxFlat
	var pressed_sb: StyleBoxFlat
	var disabled_sb: StyleBoxFlat
	
	match variant:
		Variant.SOLID:
			if button_type == ButtonType.DEFAULT:
				normal_sb = GotodTheme.create_stylebox_flat(c["main"], c["border"], 1, radius, dim["padding_h"], dim["padding_v"])
				hover_sb = GotodTheme.create_stylebox_flat(c["hover"], c["border_hover"], 1, radius, dim["padding_h"], dim["padding_v"])
				pressed_sb = GotodTheme.create_stylebox_flat(c["active"], c["border_hover"], 1, radius, dim["padding_h"], dim["padding_v"])
				add_theme_color_override("font_color", c["text"])
				add_theme_color_override("font_hover_color", c["text_hover"])
			else:
				normal_sb = GotodTheme.create_stylebox_flat(c["main"], Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
				hover_sb = GotodTheme.create_stylebox_flat(c["hover"], Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
				pressed_sb = GotodTheme.create_stylebox_flat(c["active"], Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
				add_theme_color_override("font_color", c["text"])
				add_theme_color_override("font_hover_color", c["text"])
		Variant.OUTLINE, Variant.DASHED:
			var main_c = c["main"] if button_type != ButtonType.DEFAULT else c["text"]
			var hover_c = c["hover"] if button_type != ButtonType.DEFAULT else c["border_hover"]
			normal_sb = GotodTheme.create_stylebox_flat(Color.TRANSPARENT, main_c, 1, radius, dim["padding_h"], dim["padding_v"])
			hover_sb = GotodTheme.create_stylebox_flat(hover_c * Color(1, 1, 1, 0.1), hover_c, 1, radius, dim["padding_h"], dim["padding_v"])
			pressed_sb = GotodTheme.create_stylebox_flat(hover_c * Color(1, 1, 1, 0.2), hover_c, 1, radius, dim["padding_h"], dim["padding_v"])
			add_theme_color_override("font_color", main_c)
			add_theme_color_override("font_hover_color", hover_c)
		Variant.TEXT, Variant.LINK:
			var main_c = c["main"] if button_type != ButtonType.DEFAULT else c["text"]
			var hover_c = c["hover"] if button_type != ButtonType.DEFAULT else GotodTheme.get_color("primary")
			normal_sb = GotodTheme.create_stylebox_flat(Color.TRANSPARENT, Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
			var hover_bg = GotodTheme.get_color("hover_overlay") if variant == Variant.TEXT else Color.TRANSPARENT
			hover_sb = GotodTheme.create_stylebox_flat(hover_bg, Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
			pressed_sb = GotodTheme.create_stylebox_flat(GotodTheme.get_color("active_overlay"), Color.TRANSPARENT, 0, radius, dim["padding_h"], dim["padding_v"])
			add_theme_color_override("font_color", main_c)
			add_theme_color_override("font_hover_color", hover_c)
			
	var disabled_bg = GotodTheme.get_color("bg_base").lightened(0.05)
	var disabled_border = GotodTheme.get_color("border_light")
	disabled_sb = GotodTheme.create_stylebox_flat(disabled_bg, disabled_border, 1, radius, dim["padding_h"], dim["padding_v"])
	add_theme_color_override("font_disabled_color", GotodTheme.get_color("text_disabled"))
	
	add_theme_stylebox_override("normal", normal_sb)
	add_theme_stylebox_override("hover", hover_sb)
	add_theme_stylebox_override("pressed", pressed_sb)
	add_theme_stylebox_override("disabled", disabled_sb)
	add_theme_stylebox_override("focus", hover_sb)
