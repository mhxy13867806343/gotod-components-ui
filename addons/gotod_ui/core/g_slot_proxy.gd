@tool
class_name GSlotProxy
extends RefCounted

## GSlotProxy: Godot 4 Vue-style Universal Slot Proxy
## 深度对标 Vue 3 Slots，支持在 Slot 中放置任何东西 (Support ANYTHING in Slots)
## 内置 GDScript 关键字与 Godot 引擎保留属性拦截守卫 (Reserved Keywords Guard)

const RESERVED_KEYWORDS: Array[String] = [
	# 1. GDScript 语法保留关键字
	"if", "elif", "else", "for", "while", "match", "break", "continue", "pass", "return",
	"var", "const", "enum", "func", "static", "class", "class_name", "extends", "is", "as",
	"self", "super", "signal", "await", "assert", "void", "null", "true", "false",
	# 2. Godot Object / Node / Control 核心内置成员与方法
	"position", "global_position", "size", "rotation", "scale", "modulate", "self_modulate",
	"visible", "z_index", "theme", "owner", "parent", "get_parent", "name", "get_name",
	"tree", "get_tree", "add_child", "remove_child", "get_child", "get_children",
	"queue_free", "free", "duplicate", "emit_signal", "connect", "disconnect",
	"_ready", "_process", "_physics_process", "_input", "_gui_input", "_draw", "_notification"
]

## 静态校验：判断是否为系统保留字或内置方法
static func is_reserved_name(p_name: String) -> bool:
	var lower = p_name.strip_edges().to_lower()
	return lower in RESERVED_KEYWORDS

## 静态校验与守卫拦截：如果为保留字则抛出错误并返回 false
static func validate_slot_name(p_name: String) -> bool:
	var trimmed = p_name.strip_edges()
	if trimmed == "":
		return true # 允许默认空字符串代表 default 插槽
	if is_reserved_name(trimmed):
		push_error("[GotodUI Slots Error] '%s' 是 GDScript 关键字或 Godot 引擎核心内置成员，严禁作为 slotName 使用！建议改用 't_%s' 或具名语义名称（如 'item_tag', 'card_header'）。" % [trimmed, trimmed])
		return false
	return true

var target_node: Control
var slot_container: Control
var slot_name: String = "default"
var owner_component: Control
var custom_data: Dictionary = {}
var mounted_children: Array[Node] = []

func _init(p_target: Control = null, p_slot_name: String = "default", p_owner: Control = null, p_container: Control = null) -> void:
	target_node = p_target
	slot_name = p_slot_name
	owner_component = p_owner
	slot_container = p_container if p_container else (p_target.get_parent() if p_target else null)

## =========================================================================
## 核心多态挂载器：在 Slot 中装配任何内容 (Universal Mount Method)
## =========================================================================
func mount(content: Variant) -> Control:
	if content == null:
		clear()
		return null

	# 1. 传入已实例化的 Node / Control
	if content is Control:
		return _mount_control(content)
	elif content is Node:
		var wrapper = Control.new()
		wrapper.add_child(content)
		return _mount_control(wrapper)

	# 2. 传入 PackedScene 场景预制体 (.tscn)
	elif content is PackedScene:
		var inst = content.instantiate()
		if inst is Control:
			return _mount_control(inst)
		else:
			var wrapper = Control.new()
			wrapper.add_child(inst)
			return _mount_control(wrapper)

	# 3. 传入 Callable 函数式组件 / 工厂函数
	elif content is Callable:
		var result = content.call()
		if result != null:
			return mount(result)
		return null

	# 4. 传入 Texture2D 贴图
	elif content is Texture2D:
		var tr = TextureRect.new()
		tr.texture = content
		tr.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		tr.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
		tr.custom_minimum_size = Vector2(32, 32)
		return _mount_control(tr)

	# 5. 传入 Array 多个子节点 (对标 Vue 插槽内多个平级标签)
	elif content is Array:
		var box = HBoxContainer.new()
		box.add_theme_constant_override("separation", 8)
		for item in content:
			var child_ctrl = _create_control_from_any(item)
			if child_ctrl:
				box.add_child(child_ctrl)
		return _mount_control(box)

	# 6. 传入 Color 色彩
	elif content is Color:
		set_color(content)
		return target_node

	# 7. 传入基础数据类型 (String / int / float)
	else:
		set_text(content)
		return target_node

## 追加子节点 (对标 Vue template slot 内连续 append)
func append(child_content: Variant) -> void:
	var ctrl = _create_control_from_any(child_content)
	if not ctrl:
		return

	if slot_container and is_instance_valid(slot_container):
		slot_container.add_child(ctrl)
		mounted_children.append(ctrl)
	elif target_node and is_instance_valid(target_node):
		target_node.add_child(ctrl)
		mounted_children.append(ctrl)

## 清空当前插槽挂载的自定义内容
func clear() -> void:
	for c in mounted_children:
		if is_instance_valid(c):
			c.queue_free()
	mounted_children.clear()

	if target_node and is_instance_valid(target_node):
		target_node.visible = true

func _mount_control(ctrl: Control) -> Control:
	clear()
	if slot_container and is_instance_valid(slot_container):
		if target_node and is_instance_valid(target_node) and target_node != ctrl:
			target_node.visible = false
		slot_container.add_child(ctrl)
		mounted_children.append(ctrl)
	elif target_node and is_instance_valid(target_node):
		target_node.add_child(ctrl)
		mounted_children.append(ctrl)
	
	target_node = ctrl
	return ctrl

func _create_control_from_any(item: Variant) -> Control:
	if item is Control:
		return item
	elif item is PackedScene:
		var inst = item.instantiate()
		if inst is Control: return inst
		var w = Control.new()
		w.add_child(inst)
		return w
	elif item is Texture2D:
		var tr = TextureRect.new()
		tr.texture = item
		return tr
	elif item != null:
		var lbl = Label.new()
		lbl.text = str(item)
		return lbl
	return null

## =========================================================================
## 属性快捷读写与点语法支持
## =========================================================================

## 设置文本 (支持自动强转类型)
func set_text(val: Variant) -> void:
	var text_val = str(val)
	if not target_node or not is_instance_valid(target_node):
		custom_data["text"] = text_val
		return
	
	if "text" in target_node:
		target_node.text = text_val
	elif target_node is RichTextLabel:
		target_node.text = text_val
	elif target_node.has_method("set_text"):
		target_node.call("set_text", text_val)
	custom_data["text"] = text_val

## 获取文本
func get_text() -> String:
	if target_node and is_instance_valid(target_node):
		if "text" in target_node:
			return target_node.text
	return custom_data.get("text", "")

## 设置色彩 (支持 Color, "red", "gold", "yellow", "#fcd34d" 等)
func set_color(val: Variant) -> void:
	var col = _parse_color(val)
	if not target_node or not is_instance_valid(target_node):
		custom_data["color"] = col
		return
	
	if target_node is Label or target_node is RichTextLabel:
		target_node.add_theme_color_override("font_color", col)
		target_node.add_theme_color_override("default_color", col)
	elif target_node is Button:
		target_node.add_theme_color_override("font_color", col)
		target_node.add_theme_color_override("font_focus_color", col)
		target_node.add_theme_color_override("font_hover_color", col)
	else:
		target_node.modulate = col
	custom_data["color"] = col

## 设置可见性
func set_visible(val: bool) -> void:
	if target_node and is_instance_valid(target_node):
		target_node.visible = val
	custom_data["visible"] = val

## 解析通用颜色字符串或 Color 对象
func _parse_color(val: Variant) -> Color:
	if val is Color:
		return val
	if val is String or val is StringName:
		var s = str(val).strip_edges().to_lower()
		match s:
			"red": return Color(0.96, 0.26, 0.21, 1.0)
			"gold", "yellow": return Color(0.99, 0.83, 0.30, 1.0)
			"green": return Color(0.29, 0.79, 0.44, 1.0)
			"blue", "cyan": return Color(0.25, 0.62, 1.0, 1.0)
			"white": return Color.WHITE
			"black": return Color.BLACK
			"orange": return Color(0.98, 0.55, 0.16, 1.0)
			"purple": return Color(0.66, 0.33, 0.97, 1.0)
			_:
				return Color.from_string(s, Color.WHITE)
	return Color.WHITE

## 动态属性拦截与赋值
func _set(property: StringName, value: Variant) -> bool:
	var prop = str(property)
	match prop:
		"content", "node", "view":
			mount(value)
			return true
		"text":
			set_text(value)
			return true
		"color":
			set_color(value)
			return true
		"visible":
			set_visible(bool(value))
			return true
		"confirm_text":
			if owner_component and "confirm_button_text" in owner_component:
				owner_component.confirm_button_text = str(value)
			custom_data["confirm_text"] = str(value)
			return true
		"cancel_text":
			if owner_component and "cancel_button_text" in owner_component:
				owner_component.cancel_button_text = str(value)
			custom_data["cancel_text"] = str(value)
			return true
		"name", "icon_name":
			if target_node and "icon_name" in target_node:
				target_node.icon_name = str(value)
			custom_data["name"] = str(value)
			return true
		"count", "value":
			custom_data[prop] = value
			set_text(value)
			return true
		_:
			custom_data[prop] = value
			if target_node and is_instance_valid(target_node) and prop in target_node:
				target_node.set(prop, value)
			return true

## 动态属性拦截与读取
func _get(property: StringName) -> Variant:
	var prop = str(property)
	match prop:
		"text":
			return get_text()
		"color":
			return custom_data.get("color", Color.WHITE)
		"visible":
			return target_node.visible if target_node and is_instance_valid(target_node) else custom_data.get("visible", true)
		"node":
			return target_node
		"container":
			return slot_container
		_:
			if custom_data.has(prop):
				return custom_data[prop]
			if target_node and is_instance_valid(target_node) and prop in target_node:
				return target_node.get(prop)
			return null
