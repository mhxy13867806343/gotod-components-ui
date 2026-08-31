# GStepper - Godot 4.x Vant UI Style Stepper Component
# 步进器组件 (用于在一定范围内通过点击加减按钮或直接输入来调节数值)
class_name GStepper
extends HBoxContainer

signal value_changed(val: float)
signal overlimit(limit_type: String) # "min" or "max"

@export var value: float = 1.0:
	set(val):
		var clamped = clamp(val, min_value, max_value)
		if integer:
			clamped = round(clamped)
		if value != clamped:
			value = clamped
			_update_ui()
			value_changed.emit(value)

@export var min_value: float = 1.0
@export var max_value: float = 100.0
@export var step: float = 1.0
@export var integer: bool = true
@export var disabled: bool = false
@export var disable_input: bool = false
@export var button_size: float = 28.0
@export var round_theme: bool = false

var _minus_btn: Button
var _plus_btn: Button
var _input_box: LineEdit

func _ready() -> void:
	_setup_nodes()
	_update_ui()

func _setup_nodes() -> void:
	add_theme_constant_override("separation", 2)
	_minus_btn = Button.new()
	_minus_btn.text = "-"
	_minus_btn.pressed.connect(_on_minus_pressed)
	add_child(_minus_btn)

	_input_box = LineEdit.new()
	_input_box.alignment = HORIZONTAL_ALIGNMENT_CENTER
	_input_box.text_submitted.connect(_on_input_submitted)
	add_child(_input_box)

	_plus_btn = Button.new()
	_plus_btn.text = "+"
	_plus_btn.pressed.connect(_on_plus_pressed)
	add_child(_plus_btn)

func _on_minus_pressed() -> void:
	if value <= min_value:
		overlimit.emit("min")
		return
	value -= step

func _on_plus_pressed() -> void:
	if value >= max_value:
		overlimit.emit("max")
		return
	value += step

func _on_input_submitted(text_val: String) -> void:
	if text_val.is_valid_float():
		value = text_val.to_float()

func _update_ui() -> void:
	if _input_box:
		_input_box.text = str(int(value) if integer else value)
	if _minus_btn:
		_minus_btn.disabled = disabled or (value <= min_value)
	if _plus_btn:
		_plus_btn.disabled = disabled or (value >= max_value)

## 静态多态构建工厂 (支持 1. 数值单值 create(10), 2. 字典对象 create({ ... }), 3. 多参数 create(value, min_val, max_val))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GStepper:
	var st = GStepper.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("min"): st.min_value = float(opts["min"])
		if opts.has("max"): st.max_value = float(opts["max"])
		if opts.has("step"): st.step = float(opts["step"])
		if opts.has("value"): st.value = float(opts["value"])
		if opts.has("integer"): st.integer = bool(opts["integer"])
		if opts.has("disabled"): st.disabled = bool(opts["disabled"])
		if opts.has("on_change") and opts["on_change"] is Callable: st.value_changed.connect(opts["on_change"])
	elif arg1 != null:
		st.value = float(arg1)
		if arg2 != null:
			st.min_value = float(arg2)
		if arg3 != null:
			st.max_value = float(arg3)
	return st
