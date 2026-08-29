@tool
class_name GSlider
extends HSlider

@export var show_tooltip: bool = true
@export var status: GThemeTokens.Status = GThemeTokens.Status.PRIMARY:
	set(val):
		status = val
		_update_styles()

func _ready() -> void:
	custom_minimum_size.y = 20
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _update_styles() -> void:
	var primary_c = GotodTheme.get_status_color(status)
	var bg_c = GotodTheme.get_color("border_base", Color("#383842"))
	
	var grabber_sb = GotodTheme.create_stylebox_flat(primary_c, Color.WHITE, 2, 999.0)
	var slider_bg = GotodTheme.create_stylebox_flat(bg_c, Color.TRANSPARENT, 0, 999.0)
	slider_bg.content_margin_top = 3
	slider_bg.content_margin_bottom = 3
	
	add_theme_stylebox_override("slider", slider_bg)
	add_theme_stylebox_override("grabber_area", GotodTheme.create_stylebox_flat(primary_c, Color.TRANSPARENT, 0, 999.0))
	add_theme_stylebox_override("grabber_area_highlight", GotodTheme.create_stylebox_flat(primary_c.lightened(0.1), Color.TRANSPARENT, 0, 999.0))
