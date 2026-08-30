@tool
class_name GIcon
extends TextureRect

## =========================================================================
## GIcon: 图标组件 (Benchmarked against FontAwesome 6 & AT-Icons)
## 可自由缩放尺寸、着色、旋转动画与插槽绑定的矢量图标渲染组件。
## =========================================================================

@export var icon_name: String = "gamepad":
	set(val):
		icon_name = val
		_update_icon_texture()

@export var icon_color: Color = Color.WHITE:
	set(val):
		icon_color = val
		modulate = icon_color

@export var icon_size: float = 16.0:
	set(val):
		icon_size = val
		custom_minimum_size = Vector2(icon_size, icon_size)
		size = custom_minimum_size

@export var spin: bool = false:
	set(val):
		spin = val
		set_process(spin)
		if not spin:
			rotation = 0.0

var _rotation_speed: float = 4.0

func _init(p_name: String = "gamepad", p_size: float = 16.0, p_color: Color = Color.WHITE) -> void:
	icon_name = p_name
	icon_size = p_size
	icon_color = p_color

func _ready() -> void:
	expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	pivot_offset = Vector2(icon_size / 2.0, icon_size / 2.0)
	custom_minimum_size = Vector2(icon_size, icon_size)
	modulate = icon_color
	_update_icon_texture()
	set_process(spin)

func _process(delta: float) -> void:
	if spin:
		pivot_offset = size / 2.0
		rotation += _rotation_speed * delta

func _update_icon_texture() -> void:
	pivot_offset = Vector2(icon_size / 2.0, icon_size / 2.0)
	# If a local svg resource exists under addons/gotod_ui/assets/icons/
	var icon_path = "res://addons/gotod_ui/assets/icons/" + icon_name + ".svg"
	if ResourceLoader.exists(icon_path):
		texture = load(icon_path)
