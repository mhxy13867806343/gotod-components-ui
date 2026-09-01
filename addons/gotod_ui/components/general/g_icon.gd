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

const _ICON_SEARCH_PREFIXES: Array[String] = [
	"res://addons/gotod_ui/assets/icons/",
	"res://assets/icons/",
	"res://addons/gotod_ui/assets/icons/node/",
	"res://addons/gotod_ui/assets/icons/gameicons/",
	"res://addons/gotod_ui/assets/icons/tabler/",
	"res://addons/gotod_ui/assets/icons/lucide/",
	"res://addons/gotod_ui/assets/icons/fontawesome/",
	"res://addons/gotod_ui/assets/icons/iconpark/",
	"res://addons/gotod_ui/assets/icons/pixel/",
	"res://addons/gotod_ui/assets/icons/brands/",
	"res://addons/gotod_ui/assets/icons/remix/",
	"res://addons/gotod_ui/assets/icons/game/"
]

func _find_icon_path(p_name: String) -> String:
	if p_name.is_empty():
		return ""
	if p_name.begins_with("res://") or p_name.begins_with("user://"):
		return p_name if ResourceLoader.exists(p_name) else ""
	
	var clean_name = p_name.trim_suffix(".svg")
	var candidates: Array[String] = [clean_name]
	var hyphens = clean_name.replace("_", "-")
	var underscores = clean_name.replace("-", "_")
	if hyphens != clean_name:
		candidates.append(hyphens)
	if underscores != clean_name and not candidates.has(underscores):
		candidates.append(underscores)
	
	for prefix in _ICON_SEARCH_PREFIXES:
		for cand in candidates:
			var path = prefix + cand + ".svg"
			if ResourceLoader.exists(path):
				return path
	return ""

func _update_icon_texture() -> void:
	pivot_offset = Vector2(icon_size / 2.0, icon_size / 2.0)
	if icon_name.is_empty():
		texture = null
		return
	
	var resolved_path = _find_icon_path(icon_name)
	if not resolved_path.is_empty():
		texture = load(resolved_path)
	else:
		push_warning("GIcon: 未找到图标文件 '%s' (可尝试在 index.html 图标库中搜索或检查名称)" % icon_name)

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
