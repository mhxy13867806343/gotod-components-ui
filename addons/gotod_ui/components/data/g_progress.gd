@tool
class_name GProgress
extends Control

enum ProgressType {
	LINE,
	CIRCLE
}

@export var percentage: float = 50.0:
	set(val):
		percentage = clampf(val, 0.0, 100.0)
		queue_redraw()

## 修复：@export_enum + int，避免内部枚举 setter 类型冲突
@export_enum("LINE", "CIRCLE") var type: int = ProgressType.LINE:
	set(val):
		type = val
		if is_node_ready():
			_update_min_size()
		queue_redraw()

@export var status: GThemeTokens.Status = GThemeTokens.Status.PRIMARY:
	set(val):
		status = val
		queue_redraw()

@export var stroke_width: float = 6.0:
	set(val):
		stroke_width = val
		queue_redraw()

@export var show_text: bool = true:
	set(val):
		show_text = val
		queue_redraw()

func _ready() -> void:
	_update_min_size()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _update_min_size() -> void:
	if type == ProgressType.LINE:
		custom_minimum_size = Vector2(120, max(20.0, stroke_width + 8.0))
		size_flags_horizontal = Control.SIZE_EXPAND_FILL
	else:
		custom_minimum_size = Vector2(80, 80)
		size_flags_horizontal = Control.SIZE_SHRINK_CENTER

func _draw() -> void:
	var col = GotodTheme.get_status_color(status)
	var bg_col = GotodTheme.get_color("border_base", Color("#383842"))
	var ratio = percentage / 100.0
	var font = get_theme_default_font()
	if not font: font = ThemeDB.fallback_font
	var pct_str = "%d%%" % int(round(percentage))


	if type == ProgressType.LINE:
		var text_w = 40.0 if show_text else 0.0
		var bar_w = size.x - text_w
		var y = size.y / 2.0
		var r = stroke_width / 2.0

		draw_rect(Rect2(0, y - r, bar_w, stroke_width), bg_col, true, r)
		if bar_w * ratio > 0:
			draw_rect(Rect2(0, y - r, bar_w * ratio, stroke_width), col, true, r)

		if show_text:
			var font_size = 12
			var str_sz = font.get_string_size(pct_str, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size)
			draw_string(font, Vector2(bar_w + 10, y + str_sz.y * 0.35), pct_str, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, GotodTheme.get_color("text_primary"))
	else:
		var center = size / 2.0
		var radius = min(size.x, size.y) / 2.0 - stroke_width
		draw_arc(center, radius, 0, TAU, 64, bg_col, stroke_width, true)
		if ratio > 0:
			draw_arc(center, radius, -PI / 2.0, -PI / 2.0 + TAU * ratio, 64, col, stroke_width, true)

		if show_text:
			var font_size = int(radius * 0.5)
			var str_sz = font.get_string_size(pct_str, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
			draw_string(font, Vector2(center.x - str_sz.x / 2.0, center.y + str_sz.y * 0.35), pct_str, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size, GotodTheme.get_color("text_primary"))

## 静态多态构建工厂 (支持 1. 进度单值 create(75), 2. 字典对象 create({ ... }), 3. 多参数 create(percentage, type, status))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GProgress:
	var prog = GProgress.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("percentage") or opts.has("value"): prog.percentage = float(opts.get("percentage", opts.get("value", 0.0)))
		if opts.has("type"):
			if opts["type"] is int: prog.type = opts["type"]
			elif str(opts["type"]).to_lower() == "circle": prog.type = ProgressType.CIRCLE
		if opts.has("status"):
			if opts["status"] is int: prog.status = opts["status"]
			elif opts["status"] is String: prog.status = _parse_status_str(opts["status"])
		if opts.has("stroke_width") or opts.has("stroke"): prog.stroke_width = float(opts.get("stroke_width", opts.get("stroke", 6.0)))
		if opts.has("show_text"): prog.show_text = bool(opts["show_text"])
	elif arg1 != null:
		prog.percentage = float(arg1)
		if arg2 != null:
			if arg2 is int: prog.type = arg2
			elif str(arg2).to_lower() == "circle": prog.type = ProgressType.CIRCLE
		if arg3 != null:
			if arg3 is int: prog.status = arg3
			elif arg3 is String: prog.status = _parse_status_str(arg3)
	return prog

static func _parse_status_str(name: String) -> GThemeTokens.Status:
	match name.to_lower():
		"success": return GThemeTokens.Status.SUCCESS
		"warning": return GThemeTokens.Status.WARNING
		"danger", "error": return GThemeTokens.Status.DANGER
		"info": return GThemeTokens.Status.INFO
		_: return GThemeTokens.Status.PRIMARY
