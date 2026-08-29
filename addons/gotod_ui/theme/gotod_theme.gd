@tool
class_name GotodTheme
extends Node

signal theme_changed

@export var current_preset: GThemeTokens.Preset = GThemeTokens.Preset.NAIVE_UI:
	set(val):
		current_preset = val
		_reload_colors()
		theme_changed.emit()

@export var current_mode: GThemeTokens.Mode = GThemeTokens.Mode.DARK:
	set(val):
		current_mode = val
		_reload_colors()
		theme_changed.emit()

var brand_colors: Dictionary = {}
var mode_colors: Dictionary = {}

static var instance: GotodTheme = null

func _enter_tree() -> void:
	if instance == null:
		instance = self
	_reload_colors()

func _reload_colors() -> void:
	brand_colors = GThemeTokens.get_preset_colors(current_preset)
	mode_colors = GThemeTokens.get_mode_colors(current_mode)

static func get_color(key: String, default: Color = Color.WHITE) -> Color:
	if instance == null:
		var b = GThemeTokens.get_preset_colors(GThemeTokens.Preset.NAIVE_UI)
		var m = GThemeTokens.get_mode_colors(GThemeTokens.Mode.DARK)
		if b.has(key): return b[key]
		if m.has(key): return m[key]
		return default
	
	if instance.brand_colors.has(key):
		return instance.brand_colors[key]
	if instance.mode_colors.has(key):
		return instance.mode_colors[key]
	return default

static func get_status_color(status: GThemeTokens.Status) -> Color:
	match status:
		GThemeTokens.Status.PRIMARY:
			return get_color("primary")
		GThemeTokens.Status.SUCCESS:
			return get_color("success")
		GThemeTokens.Status.WARNING:
			return get_color("warning")
		GThemeTokens.Status.DANGER:
			return get_color("danger")
		GThemeTokens.Status.INFO:
			return get_color("info")
		_:
			return get_color("text_regular")

static func create_stylebox_flat(
	bg_color: Color = Color.TRANSPARENT,
	border_color: Color = Color.TRANSPARENT,
	border_width: int = 0,
	corner_radius: float = 6.0,
	content_margin_h: float = 0.0,
	content_margin_v: float = 0.0,
	shadow_color: Color = Color.TRANSPARENT,
	shadow_size: int = 0
) -> StyleBoxFlat:
	var sb = StyleBoxFlat.new()
	sb.bg_color = bg_color
	sb.set_border_width_all(border_width)
	sb.border_color = border_color
	sb.set_corner_radius_all(int(corner_radius))
	sb.content_margin_left = content_margin_h
	sb.content_margin_right = content_margin_h
	sb.content_margin_top = content_margin_v
	sb.content_margin_bottom = content_margin_v
	if shadow_size > 0:
		sb.shadow_color = shadow_color
		sb.shadow_size = shadow_size
		sb.shadow_offset = Vector2(0, 2)
	return sb

static func create_card_style(mode: GThemeTokens.Mode = GThemeTokens.Mode.DARK) -> StyleBoxFlat:
	var m = GThemeTokens.get_mode_colors(mode)
	return create_stylebox_flat(
		m["bg_card"],
		m["border_base"],
		1,
		8.0,
		16.0,
		16.0,
		Color(0, 0, 0, 0.25) if mode == GThemeTokens.Mode.DARK else Color(0, 0, 0, 0.05),
		4
	)
