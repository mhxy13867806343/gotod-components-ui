@tool
class_name GRadioGroup
extends BoxContainer

signal value_changed(value: String)

@export var selected_value: String = "":
	set(val):
		selected_value = val
		_sync_children()
		value_changed.emit(selected_value)

func _ready() -> void:
	add_theme_constant_override("separation", 16)
	_sync_children()

func _sync_children() -> void:
	for child in get_children():
		if child is GRadio:
			var val = child.value if !child.value.is_empty() else child.text
			if not child.selected.is_connected(_on_child_selected.bind(val)):
				child.selected.connect(_on_child_selected.bind(val))
			child.checked = (val == selected_value)

func _on_child_selected(val: String) -> void:
	selected_value = val
	for child in get_children():
		if child is GRadio:
			var c_val = child.value if !child.value.is_empty() else child.text
			child.checked = (c_val == selected_value)
