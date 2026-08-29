@tool
class_name GIcon
extends TextureRect

@export var icon_color: Color = Color.WHITE:
	set(val):
		icon_color = val
		modulate = icon_color

@export var icon_size: float = 16.0:
	set(val):
		icon_size = val
		custom_minimum_size = Vector2(icon_size, icon_size)

func _ready() -> void:
	expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	custom_minimum_size = Vector2(icon_size, icon_size)
	modulate = icon_color
