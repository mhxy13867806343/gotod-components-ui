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

@export_multiline var svg_data: String = "":
	set(val):
		svg_data = val
		_update_icon_texture()

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

## 直接使用原生 SVG 字符串或 Buffer 动态构建纹理
func _load_texture_from_svg_string(p_svg_str: String) -> bool:
	var trimmed = p_svg_str.strip_edges()
	if not (trimmed.begins_with("<svg") or trimmed.begins_with("<?xml") or trimmed.contains("<svg")):
		return false
	
	var image = Image.new()
	var err = image.load_svg_from_string(trimmed)
	if err == OK:
		texture = ImageTexture.create_from_image(image)
		return true
	else:
		push_warning("GIcon: 解析内联 SVG 字符串失败 (Error code: %d)" % err)
		return false

## 动态配置并加载 SVG 文本
func set_svg(p_svg_content: String) -> void:
	svg_data = p_svg_content

func _update_icon_texture() -> void:
	pivot_offset = Vector2(icon_size / 2.0, icon_size / 2.0)
	
	# 1. 优先检查内联 SVG 数据 (svg_data 属性)
	if not svg_data.is_empty():
		if _load_texture_from_svg_string(svg_data):
			return
	
	# 2. 检查 icon_name 是否直接传入了 SVG XML 字符串
	if icon_name.strip_edges().begins_with("<svg") or icon_name.strip_edges().begins_with("<?xml"):
		if _load_texture_from_svg_string(icon_name):
			return
	
	if icon_name.is_empty():
		texture = null
		return
	
	# 3. 本地与内置 SVG 资源文件匹配
	var resolved_path = _find_icon_path(icon_name)
	if not resolved_path.is_empty():
		texture = load(resolved_path)
	else:
		push_warning("GIcon: 未找到图标文件 '%s' (可尝试在 index.html 图标库中搜索或检查名称)" % icon_name)

## 静态快捷工厂: 从 SVG 字符串构建 GIcon 实例
static func from_svg(p_svg_content: String, p_size: float = 16.0, p_color: Color = Color.WHITE) -> GIcon:
	var icon = GIcon.new("", p_size, p_color)
	icon.set_svg(p_svg_content)
	return icon

## 静态多态构建工厂 (支持 1. 单值简写 create("heart"), 2. 字典对象 create({ ... }), 3. 多参数 create(name, size, color))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GIcon:
	var icon = GIcon.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("svg"): icon.set_svg(str(opts["svg"]))
		elif opts.has("name"): icon.icon_name = str(opts["name"])
		elif opts.has("icon"): icon.icon_name = str(opts["icon"])
		if opts.has("size"): icon.icon_size = float(opts["size"])
		if opts.has("color"):
			if opts["color"] is Color: icon.icon_color = opts["color"]
			elif opts["color"] is String: icon.icon_color = Color(opts["color"])
		if opts.has("spin"): icon.spin = bool(opts["spin"])
	elif arg1 != null:
		var str_val = str(arg1)
		if str_val.strip_edges().begins_with("<svg") or str_val.strip_edges().begins_with("<?xml"):
			icon.set_svg(str_val)
		else:
			icon.icon_name = str_val
		if arg2 != null:
			icon.icon_size = float(arg2)
		if arg3 != null:
			if arg3 is Color: icon.icon_color = arg3
			elif arg3 is String: icon.icon_color = Color(arg3)
	return icon
