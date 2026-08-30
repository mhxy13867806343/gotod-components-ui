@tool
class_name GAvatar
extends Control

enum Shape {
	CIRCLE,
	SQUARE
}

@export var text: String = "U":
	set(val):
		text = val
		queue_redraw()

@export var avatar_texture: Texture2D = null:
	set(val):
		avatar_texture = val
		queue_redraw()

@export_enum("CIRCLE", "SQUARE") var shape: int = Shape.CIRCLE:
	set(val):
		shape = val
		queue_redraw()

@export var avatar_size: float = 40.0:
	set(val):
		avatar_size = val
		custom_minimum_size = Vector2(avatar_size, avatar_size)
		queue_redraw()

@export var background_color: Color = Color.TRANSPARENT:
	set(val):
		background_color = val
		queue_redraw()

func _ready() -> void:
	custom_minimum_size = Vector2(avatar_size, avatar_size)
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _draw() -> void:
	var center = size / 2.0
	var radius = min(size.x, size.y) / 2.0
	var rect = Rect2(Vector2.ZERO, size)
	var bg_col = background_color if background_color != Color.TRANSPARENT else GotodTheme.get_color("primary", Color("#18a058"))
	
	if shape == Shape.CIRCLE:
		draw_circle(center, radius, bg_col)
	else:
		draw_rect(rect, bg_col, true, 6.0)
		
	if avatar_texture:
		# Draw texture centered
		draw_texture_rect(avatar_texture, rect, false)
	elif !text.is_empty():
		var font = get_theme_default_font()
		var font_size = int(avatar_size * 0.45)
		var str_sz = font.get_string_size(text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
		var pos = Vector2(center.x - str_sz.x / 2.0, center.y + str_sz.y * 0.35)
		draw_string(font, pos, text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size, Color.WHITE)
