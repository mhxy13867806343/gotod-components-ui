@tool
class_name GCheckboxGroup
extends BoxContainer

signal value_changed(selected_values: Array[String])



@export var selected_values: Array = []:
	set(val):
		var arr: Array[String] = []
		for item in val:
			arr.append(str(item))
		selected_values = arr
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

## 静态多态构建工厂 (支持 1. 初始选中列表 create(["选项A", "选项B"]), 2. 字典配置 create({ ... }))
static func create(arg1: Variant = null) -> GCheckboxGroup:
	var group = GCheckboxGroup.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("selected_values") and opts["selected_values"] is Array:
			group.selected_values = opts["selected_values"]
		if opts.has("options") and opts["options"] is Array:
			for opt in opts["options"]:
				var cb = GCheckbox.new()
				if opt is Dictionary:
					cb.text = str(opt.get("label", opt.get("text", "")))
				else:
					cb.text = str(opt)
				group.add_child(cb)
	elif arg1 is Array:
		group.selected_values = arg1
	return group

