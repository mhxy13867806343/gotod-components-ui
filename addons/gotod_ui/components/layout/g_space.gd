@tool
class_name GSpace
extends Container

enum Direction {
	HORIZONTAL,
	VERTICAL
}

enum Align {
	START,
	CENTER,
	END,
	BASELINE
}

@export_enum("HORIZONTAL", "VERTICAL") var direction: int = Direction.HORIZONTAL:
	set(val):
		direction = val
		queue_sort()

@export var gap: float = 12.0:
	set(val):
		gap = val
		queue_sort()

@export var wrap: bool = true:
	set(val):
		wrap = val
		queue_sort()

func _notification(what: int) -> void:
	if what == NOTIFICATION_SORT_CHILDREN:
		_resort_children()

func _resort_children() -> void:
	var cur_x = 0.0
	var cur_y = 0.0
	var max_line_h = 0.0
	var max_line_w = 0.0
	
	for child in get_children():
		if not child is Control or not child.visible:
			continue
			
		var c_size = child.get_combined_minimum_size()
		if direction == Direction.HORIZONTAL:
			if wrap and cur_x + c_size.x > size.x and cur_x > 0:
				cur_x = 0.0
				cur_y += max_line_h + gap
				max_line_h = 0.0
				
			fit_child_in_rect(child, Rect2(Vector2(cur_x, cur_y), c_size))
			cur_x += c_size.x + gap
			max_line_h = max(max_line_h, c_size.y)
		else:
			fit_child_in_rect(child, Rect2(Vector2(cur_x, cur_y), c_size))
			cur_y += c_size.y + gap

## 静态多态构建工厂 (支持 1. 间距单值 create(gap), 2. 字典对象 create({ ... }), 3. 多参数 create(gap, direction, wrap))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GSpace:
	var space = GSpace.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("gap"): space.gap = float(opts["gap"])
		elif opts.has("size"): space.gap = float(opts["size"])
		if opts.has("direction"):
			if opts["direction"] is int: space.direction = opts["direction"]
			elif str(opts["direction"]).to_lower() == "vertical": space.direction = Direction.VERTICAL
			elif str(opts["direction"]).to_lower() == "horizontal": space.direction = Direction.HORIZONTAL
		if opts.has("wrap"): space.wrap = bool(opts["wrap"])
		if opts.has("children") and opts["children"] is Array:
			for c in opts["children"]:
				if c is Node: space.add_child(c)
	elif arg1 != null:
		space.gap = float(arg1)
		if arg2 != null:
			if arg2 is int: space.direction = arg2
			elif str(arg2).to_lower() == "vertical": space.direction = Direction.VERTICAL
			elif str(arg2).to_lower() == "horizontal": space.direction = Direction.HORIZONTAL
		if arg3 != null:
			space.wrap = bool(arg3)
	return space
