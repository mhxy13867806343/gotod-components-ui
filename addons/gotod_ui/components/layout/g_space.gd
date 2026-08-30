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
