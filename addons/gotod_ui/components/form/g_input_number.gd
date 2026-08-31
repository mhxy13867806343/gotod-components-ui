@tool
class_name GInputNumber
extends PanelContainer

signal value_changed(new_value: float)

@export var value: float = 0.0:
	set(val):
		var clamped = clampf(val, min_value, max_value)
		if value != clamped:
			value = clamped
			if _line_edit:
				_line_edit.text = _format_value(value)
			value_changed.emit(value)

@export var min_value: float = 0.0:
	set(val):
		min_value = val
		value = clampf(value, min_value, max_value)

@export var max_value: float = 100.0:
	set(val):
		max_value = val
		value = clampf(value, min_value, max_value)

@export var step: float = 1.0
@export var precision: int = 0
@export var disabled: bool = false:
	set(val):
		disabled = val
		_update_styles()

var _hbox: HBoxContainer
var _dec_btn: Button
var _inc_btn: Button
var _line_edit: LineEdit

func _ready() -> void:
	_setup_children()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _format_value(v: float) -> String:
	if precision > 0:
		return ("%." + str(precision) + "f") % v
	return str(int(round(v)))

func _setup_children() -> void:
	for child in get_children():
		child.queue_free()
		
	_hbox = HBoxContainer.new()
	_hbox.add_theme_constant_override("separation", 2)
	add_child(_hbox)
	
	_dec_btn = Button.new()
	_dec_btn.text = "-"
	_dec_btn.flat = true
	_dec_btn.custom_minimum_size = Vector2(28, 28)
	_dec_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_dec_btn.pressed.connect(func(): value -= step)
	_hbox.add_child(_dec_btn)
	
	_line_edit = LineEdit.new()
	_line_edit.alignment = HORIZONTAL_ALIGNMENT_CENTER
	_line_edit.text = _format_value(value)
	_line_edit.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_line_edit.flat = true
	_line_edit.text_submitted.connect(_on_text_submitted)
	_hbox.add_child(_line_edit)
	
	_inc_btn = Button.new()
	_inc_btn.text = "+"
	_inc_btn.flat = true
	_inc_btn.custom_minimum_size = Vector2(28, 28)
	_inc_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_inc_btn.pressed.connect(func(): value += step)
	_hbox.add_child(_inc_btn)

func _on_text_submitted(new_text: String) -> void:
	if new_text.is_valid_float():
		value = new_text.to_float()
	else:
		_line_edit.text = _format_value(value)

func _update_styles() -> void:
	custom_minimum_size = Vector2(130, 32)
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0, 4.0, 0)
	add_theme_stylebox_override("panel", sb)
	if _line_edit:
		_line_edit.editable = !disabled
		_line_edit.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
	if _dec_btn: _dec_btn.disabled = disabled
	if _inc_btn: _inc_btn.disabled = disabled

## 静态多态构建工厂 (支持 1. 数值单值 create(10), 2. 字典对象 create({ ... }), 3. 多参数 create(value, min_val, max_val))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GInputNumber:
	var num = GInputNumber.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("min"): num.min_value = float(opts["min"])
		if opts.has("max"): num.max_value = float(opts["max"])
		if opts.has("step"): num.step = float(opts["step"])
		if opts.has("precision"): num.precision = int(opts["precision"])
		if opts.has("value"): num.value = float(opts["value"])
		if opts.has("disabled"): num.disabled = bool(opts["disabled"])
		if opts.has("on_change") and opts["on_change"] is Callable: num.value_changed.connect(opts["on_change"])
	elif arg1 != null:
		num.value = float(arg1)
		if arg2 != null:
			num.min_value = float(arg2)
		if arg3 != null:
			num.max_value = float(arg3)
	return num
