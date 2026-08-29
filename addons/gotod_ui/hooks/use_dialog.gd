@tool
class_name UseDialog
extends RefCounted

signal opened()
signal closed()
signal confirmed(data: Variant)

var is_open: bool = false
var title: String = "弹窗"
var custom_data: Variant = null

static func create(dialog_title: String = "弹窗") -> UseDialog:
	var hook = UseDialog.new()
	hook.title = dialog_title
	return hook

func open(data: Variant = null) -> void:
	is_open = true
	custom_data = data
	opened.emit()

func close() -> void:
	is_open = false
	closed.emit()

func confirm() -> void:
	confirmed.emit(custom_data)
	close()
