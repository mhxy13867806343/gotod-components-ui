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
		if not font: font = ThemeDB.fallback_font
		var font_size = int(avatar_size * 0.45)
		var str_sz = font.get_string_size(text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size) if font else Vector2(16, 16)
		var pos = Vector2(center.x - str_sz.x / 2.0, center.y + str_sz.y * 0.35)
		if font:
			draw_string(font, pos, text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size, Color.WHITE)


## 静态多态构建工厂 (支持 1. 文本/路径单值 create("U"), 2. 字典对象 create({ ... }), 3. 多参数 create(text, size, shape))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GAvatar:
	var av = GAvatar.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("text"): av.text = str(opts["text"])
		if opts.has("size"): av.avatar_size = float(opts["size"])
		if opts.has("shape"):
			if opts["shape"] is int: av.shape = opts["shape"]
			elif str(opts["shape"]).to_lower() == "square": av.shape = Shape.SQUARE
		if opts.has("texture") and opts["texture"] is Texture2D: av.avatar_texture = opts["texture"]
		elif opts.has("src") and opts["src"] is String and ResourceLoader.exists(opts["src"]): av.avatar_texture = load(opts["src"])
		if opts.has("bg_color") or opts.has("background"): av.background_color = Color(opts.get("bg_color", opts.get("background", Color.TRANSPARENT)))
	elif arg1 != null:
		if arg1 is Texture2D:
			av.avatar_texture = arg1
		elif str(arg1).begins_with("res://") and ResourceLoader.exists(str(arg1)):
			av.avatar_texture = load(str(arg1))
		else:
			av.text = str(arg1)
		if arg2 != null:
			av.avatar_size = float(arg2)
		if arg3 != null:
			if arg3 is int: av.shape = arg3
			elif str(arg3).to_lower() == "square": av.shape = Shape.SQUARE
	return av
