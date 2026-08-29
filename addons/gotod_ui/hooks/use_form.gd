@tool
class_name UseForm
extends RefCounted

signal validated(is_valid: bool, errors: Dictionary)
signal form_reset()

var form_data: Dictionary = {}
var rules: Dictionary = {}
var errors: Dictionary = {}

static func create(initial_data: Dictionary = {}, validation_rules: Dictionary = {}) -> UseForm:
	var hook = UseForm.new()
	hook.form_data = initial_data.duplicate()
	hook.rules = validation_rules
	return hook

func set_field(field_name: String, value: Variant) -> void:
	form_data[field_name] = value

func get_field(field_name: String, default_val: Variant = null) -> Variant:
	return form_data.get(field_name, default_val)

func validate() -> bool:
	errors.clear()
	for field in rules.keys():
		var val = form_data.get(field, "")
		var rule_list: Array = rules[field]
		for r in rule_list:
			if r.get("required", false):
				if str(val).strip_edges().is_empty():
					errors[field] = r.get("message", "此项为必填项")
					break
			if r.has("min_length"):
				if str(val).length() < r["min_length"]:
					errors[field] = r.get("message", "长度不能少于 %d 个字符" % r["min_length"])
					break
					
	var is_valid = errors.is_empty()
	validated.emit(is_valid, errors)
	return is_valid

func reset(default_data: Dictionary = {}) -> void:
	form_data = default_data.duplicate()
	errors.clear()
	form_reset.emit()
