@tool
class_name GDivider
extends Control

enum Orientation {
	HORIZONTAL,
	VERTICAL
}

enum TitlePlacement {
	LEFT,
	CENTER,
	RIGHT
}

@export var orientation: Orientation = Orientation.HORIZONTAL:
	set(val):
		orientation = val
		queue_redraw()

@export var dashed: bool = false:
	set(val):
		dashed = val
		queue_redraw()

@export var title: String = "":
	set(val):
		title = val
		queue_redraw()

@export var title_placement: TitlePlacement = TitlePlacement.CENTER:
	set(val):
		title_placement = val
		queue_redraw()

func _ready() -> void:
	if orientation == Orientation.HORIZONTAL:
		custom_minimum_size.y = 24
		size_flags_horizontal = Control.SIZE_EXPAND_FILL
	else:
		custom_minimum_size.x = 16
		size_flags_vertical = Control.SIZE_EXPAND_FILL
		
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _draw() -> void:
	var col = GotodTheme.get_color("divider", Color("#303038"))
	var font = get_theme_default_font()
	var font_size = 13
	var text_col = GotodTheme.get_color("text_secondary")
	
	if orientation == Orientation.HORIZONTAL:
		var y = size.y / 2.0
		if title.is_empty():
			draw_line(Vector2(0, y), Vector2(size.x, y), col, 1.0)
		else:
			var txt_sz = font.get_string_size(title, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size)
			var pad = 12.0
			var start_x = 24.0
			if title_placement == TitlePlacement.CENTER:
				start_x = (size.x - txt_sz.x) / 2.0
			elif title_placement == TitlePlacement.RIGHT:
				start_x = size.x - txt_sz.x - 24.0
				
			draw_line(Vector2(0, y), Vector2(max(0, start_x - pad), y), col, 1.0)
			draw_string(font, Vector2(start_x, y + txt_sz.y * 0.35), title, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, text_col)
			draw_line(Vector2(start_x + txt_sz.x + pad, y), Vector2(size.x, y), col, 1.0)
	else:
		var x = size.y / 2.0
		draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
