@tool
class_name GCheckboxGroup
extends BoxContainer

signal value_changed(selected_values: Array[String])



@export var selected_values: Array[String] = []:
	set(val):
		selected_values = val
		_sync_children()
		value_changed.emit(selected_values)

func _ready() -> void:
	add_theme_constant_override("separation", 16)
	_sync_children()

func _sync_children() -> void:
	for child in get_children():
		if child is GCheckbox:
			if not child.toggled.is_connected(_on_child_toggled.bind(child)):
				child.toggled.connect(_on_child_toggled.bind(child))
			child.checked = selected_values.has(child.text)

func _on_child_toggled(is_checked: bool, checkbox: GCheckbox) -> void:
	if is_checked:
		if not selected_values.has(checkbox.text):
			selected_values.append(checkbox.text)
	else:
		selected_values.erase(checkbox.text)
	value_changed.emit(selected_values)
