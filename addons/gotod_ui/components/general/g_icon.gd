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

## 静态多态构建工厂 (支持 1. 单值简写 create("heart"), 2. 字典对象 create({ ... }), 3. 多参数 create(name, size, color))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GIcon:
	var icon = GIcon.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("name"): icon.icon_name = str(opts["name"])
		elif opts.has("icon"): icon.icon_name = str(opts["icon"])
		if opts.has("size"): icon.icon_size = float(opts["size"])
		if opts.has("color"):
			if opts["color"] is Color: icon.icon_color = opts["color"]
			elif opts["color"] is String: icon.icon_color = Color(opts["color"])
		if opts.has("spin"): icon.spin = bool(opts["spin"])
	elif arg1 != null:
		icon.icon_name = str(arg1)
		if arg2 != null:
			icon.icon_size = float(arg2)
		if arg3 != null:
			if arg3 is Color: icon.icon_color = arg3
			elif arg3 is String: icon.icon_color = Color(arg3)
	return icon
