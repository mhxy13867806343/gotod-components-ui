@tool
class_name GBadge
extends Control

@export var value: int = 0:
	set(val):
		value = val
		queue_redraw()

@export var max_value: int = 99:
	set(val):
		max_value = val
		queue_redraw()

@export var is_dot: bool = false:
	set(val):
		is_dot = val
		queue_redraw()

@export var badge_color: Color = Color.TRANSPARENT:
	set(val):
		badge_color = val
		queue_redraw()

@export var hidden: bool = false:
	set(val):
		hidden = val
		queue_redraw()

func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_PASS
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _draw() -> void:
	if hidden or (value <= 0 and !is_dot): return
	
	var col = badge_color if badge_color != Color.TRANSPARENT else GotodTheme.get_color("danger", Color("#d03050"))
	var badge_pos = Vector2(size.x, 0)
	
	if is_dot:
		draw_circle(badge_pos, 4.0, col)
		draw_arc(badge_pos, 4.0, 0, TAU, 16, Color.WHITE, 1.0, true)
	else:
		var txt = str(value) if value <= max_value else "%d+" % max_value
		var font = get_theme_default_font()
		var font_size = 11
		var str_sz = font.get_string_size(txt, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
		var h = 16.0
		var w = max(h, str_sz.x + 8.0)
		var rect = Rect2(badge_pos.x - w / 2.0, badge_pos.y - h / 2.0, w, h)
		
		draw_rect(rect, col, true, h / 2.0)
		draw_string(font, Vector2(rect.position.x + (w - str_sz.x) / 2.0, rect.position.y + h * 0.75), txt, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size, Color.WHITE)
