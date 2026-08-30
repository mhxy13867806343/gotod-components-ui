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
