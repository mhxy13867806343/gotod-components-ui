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

## 修复：改用 @export_enum + int，避免 Godot 4 @tool 脚本内部枚举 setter 类型冲突
@export_enum("HORIZONTAL", "VERTICAL") var orientation: int = Orientation.HORIZONTAL:
	set(val):
		orientation = val
		if is_node_ready():
			_update_min_size()
		queue_redraw()

@export var dashed: bool = false:
	set(val):
		dashed = val
		queue_redraw()

@export var title: String = "":
	set(val):
		title = val
		queue_redraw()

@export_enum("LEFT", "CENTER", "RIGHT") var title_placement: int = TitlePlacement.CENTER:
	set(val):
		title_placement = val
		queue_redraw()

func _ready() -> void:
	_update_min_size()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(queue_redraw)

func _update_min_size() -> void:
	if orientation == Orientation.HORIZONTAL:
		custom_minimum_size.y = 24
		custom_minimum_size.x = 0
		size_flags_horizontal = Control.SIZE_EXPAND_FILL
		size_flags_vertical = Control.SIZE_SHRINK_CENTER
	else:
		custom_minimum_size.x = 16
		custom_minimum_size.y = 0
		size_flags_horizontal = Control.SIZE_SHRINK_CENTER
		size_flags_vertical = Control.SIZE_EXPAND_FILL

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
		var x = size.x / 2.0
		draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
