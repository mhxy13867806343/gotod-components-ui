@tool
class_name GContainer
extends BoxContainer

## =========================================================================
## GContainer: 布局容器 (benchmarked against Element Plus Container)
## 当子节点中包含 GHeader 或 GFooter 时，全部子节点会自动垂直排列，否则水平排列。
## =========================================================================

enum Direction {
	AUTO,
	HORIZONTAL,
	VERTICAL
}

@export_enum("AUTO", "HORIZONTAL", "VERTICAL") var direction: int = Direction.AUTO:
	set(val):
		direction = val
		if is_node_ready():
			_update_direction()

func _ready() -> void:
	size_flags_horizontal = Control.SIZE_EXPAND_FILL
	size_flags_vertical = Control.SIZE_EXPAND_FILL
	child_entered_tree.connect(func(_node): _update_direction())
	child_exiting_tree.connect(func(_node): _update_direction())
	_update_direction()

func _update_direction() -> void:
	match direction:
		Direction.HORIZONTAL:
			vertical = false
		Direction.VERTICAL:
			vertical = true
		Direction.AUTO:
			var has_header_or_footer = false
			for c in get_children():
				if c is GHeader or c is GFooter:
					has_header_or_footer = true
					break
			vertical = has_header_or_footer

## 链式样式定义
func css(rules_or_func: Variant) -> GContainer:
	GStyle.apply_css_to_instance(self, rules_or_func)
	return self

## 静态多态构建工厂 (支持 1. 数组简写 create([c1, c2]), 2. 字典对象 create({ ... }), 3. 多参数 create(direction, separation, children))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GContainer:
	var container = GContainer.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("direction"):
			if opts["direction"] is int: container.direction = opts["direction"]
			elif str(opts["direction"]).to_lower() == "vertical": container.direction = Direction.VERTICAL
			elif str(opts["direction"]).to_lower() == "horizontal": container.direction = Direction.HORIZONTAL
		if opts.has("separation") or opts.has("gap"):
			container.add_theme_constant_override("separation", int(opts.get("separation", opts.get("gap", 0))))
		if opts.has("children") and opts["children"] is Array:
			for c in opts["children"]:
				if c is Node: container.add_child(c)
	elif arg1 is Array:
		for c in (arg1 as Array):
			if c is Node: container.add_child(c)
	elif arg1 != null:
		if arg1 is int: container.direction = arg1
		elif str(arg1).to_lower() == "vertical": container.direction = Direction.VERTICAL
		elif str(arg1).to_lower() == "horizontal": container.direction = Direction.HORIZONTAL
		if arg2 != null:
			container.add_theme_constant_override("separation", int(arg2))
		if arg3 is Array:
			for c in (arg3 as Array):
				if c is Node: container.add_child(c)
	return container
