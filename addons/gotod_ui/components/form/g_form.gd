@tool
class_name GForm
extends VBoxContainer

enum LabelPosition {
	LEFT,
	TOP,
	RIGHT
}

@export var label_position: LabelPosition = LabelPosition.LEFT:
	set(val):
		label_position = val
		_propagate_props()

@export var label_width: float = 120.0:
	set(val):
		label_width = val
		_propagate_props()

@export var disabled: bool = false:
	set(val):
		disabled = val
		_propagate_props()

func _ready() -> void:
	add_theme_constant_override("separation", 16)
	_propagate_props()

func _propagate_props() -> void:
	for child in get_children():
		if child is GFormItem:
			child.label_position = label_position as GFormItem.LabelPosition
			child.label_width = label_width
