@tool
class_name GInput
extends PanelContainer

signal text_changed(new_text: String)
signal text_submitted(new_text: String)
signal cleared

enum Status {
	DEFAULT,
	ERROR,
	WARNING,
	SUCCESS
}

@export var text: String = "":
	set(val):
		text = val
		if _line_edit and _line_edit.text != val:
			_line_edit.text = val
		_update_clear_button()

@export var placeholder_text: String = "Please input...":
	set(val):
		placeholder_text = val
		if _line_edit:
			_line_edit.placeholder_text = placeholder_text

@export var input_size: GThemeTokens.Size = GThemeTokens.Size.MEDIUM:
	set(val):
		input_size = val
		_update_styles()

@export_enum("DEFAULT", "ERROR", "WARNING", "SUCCESS") var status: int = Status.DEFAULT:
	set(val):
		status = val
		if is_node_ready():
			_update_styles()

@export var clearable: bool = false:
	set(val):
		clearable = val
		_update_clear_button()

@export var show_password_toggle: bool = false:
	set(val):
		show_password_toggle = val
		_update_password_toggle()

@export var secret: bool = false:
	set(val):
		secret = val
		if _line_edit:
			_line_edit.secret = secret

@export var prefix_text: String = "":
	set(val):
		prefix_text = val
		_update_prefix()

@export var suffix_text: String = "":
	set(val):
		suffix_text = val
		_update_suffix()

@export var disabled: bool = false:
	set(val):
		disabled = val
		if _line_edit:
			_line_edit.editable = !disabled
		_update_styles()

var _hbox: HBoxContainer
var _line_edit: LineEdit
var _clear_btn: Button
var _toggle_pwd_btn: Button
var _prefix_lbl: Label
var _suffix_lbl: Label
var _is_focused: bool = false

func _ready() -> void:
	_setup_children()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_children() -> void:
	for child in get_children():
		child.queue_free()
		
	_hbox = HBoxContainer.new()
	_hbox.alignment = BoxContainer.ALIGNMENT_BEGIN
	_hbox.add_theme_constant_override("separation", 6)
	add_child(_hbox)
	
	_prefix_lbl = Label.new()
	_prefix_lbl.visible = !prefix_text.is_empty()
	_hbox.add_child(_prefix_lbl)
	
	_line_edit = LineEdit.new()
	_line_edit.text = text
	_line_edit.placeholder_text = placeholder_text
	_line_edit.secret = secret
	_line_edit.editable = !disabled
	_line_edit.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_line_edit.flat = true
	
	# Transparent LineEdit styles so parent PanelContainer handles background/borders
	var empty_sb = StyleBoxEmpty.new()
	_line_edit.add_theme_stylebox_override("normal", empty_sb)
	_line_edit.add_theme_stylebox_override("focus", empty_sb)
	_line_edit.add_theme_stylebox_override("read_only", empty_sb)
	
	_line_edit.text_changed.connect(_on_text_changed)
	_line_edit.text_submitted.connect(_on_text_submitted)
	_line_edit.focus_entered.connect(_on_focus_entered)
	_line_edit.focus_exited.connect(_on_focus_exited)
	_hbox.add_child(_line_edit)
	
	_clear_btn = Button.new()
	_clear_btn.text = "×"
	_clear_btn.flat = true
	_clear_btn.focus_mode = Control.FOCUS_NONE
	_clear_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_clear_btn.pressed.connect(_on_clear_pressed)
	_clear_btn.visible = clearable and !text.is_empty()
	_hbox.add_child(_clear_btn)
	
	_toggle_pwd_btn = Button.new()
	_toggle_pwd_btn.text = "👁"
	_toggle_pwd_btn.flat = true
	_toggle_pwd_btn.focus_mode = Control.FOCUS_NONE
	_toggle_pwd_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_toggle_pwd_btn.pressed.connect(_on_toggle_pwd_pressed)
	_toggle_pwd_btn.visible = show_password_toggle
	_hbox.add_child(_toggle_pwd_btn)
	
	_suffix_lbl = Label.new()
	_suffix_lbl.visible = !suffix_text.is_empty()
	_hbox.add_child(_suffix_lbl)

func _update_prefix() -> void:
	if _prefix_lbl:
		_prefix_lbl.text = prefix_text
		_prefix_lbl.visible = !prefix_text.is_empty()

func _update_suffix() -> void:
	if _suffix_lbl:
		_suffix_lbl.text = suffix_text
		_suffix_lbl.visible = !suffix_text.is_empty()

func _update_clear_button() -> void:
	if _clear_btn:
		_clear_btn.visible = clearable and !text.is_empty()

func _update_password_toggle() -> void:
	if _toggle_pwd_btn:
		_toggle_pwd_btn.visible = show_password_toggle

func _on_text_changed(new_text: String) -> void:
	text = new_text
	_update_clear_button()
	text_changed.emit(new_text)

func _on_text_submitted(new_text: String) -> void:
	text_submitted.emit(new_text)

func _on_clear_pressed() -> void:
	text = ""
	if _line_edit:
		_line_edit.text = ""
	_update_clear_button()
	text_changed.emit("")
	cleared.emit()

func _on_toggle_pwd_pressed() -> void:
	secret = !secret
	if _line_edit:
		_line_edit.secret = secret

func _on_focus_entered() -> void:
	_is_focused = true
	_update_styles()

func _on_focus_exited() -> void:
	_is_focused = false
	_update_styles()

func _update_styles() -> void:
	var dim = GThemeTokens.get_size_dimensions(input_size)
	custom_minimum_size = Vector2(0, dim["height"])
	
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var primary_col = GotodTheme.get_color("primary", Color("#18a058"))
	var danger_col = GotodTheme.get_color("danger", Color("#d03050"))
	var warning_col = GotodTheme.get_color("warning", Color("#f0a020"))
	var success_col = GotodTheme.get_color("success", Color("#18a058"))
	
	if disabled:
		bg_col = GotodTheme.get_color("bg_base")
		border_col = GotodTheme.get_color("border_light")
	elif _is_focused:
		match status:
			Status.ERROR: border_col = danger_col
			Status.WARNING: border_col = warning_col
			Status.SUCCESS: border_col = success_col
			_: border_col = primary_col
	else:
		match status:
			Status.ERROR: border_col = danger_col
			Status.WARNING: border_col = warning_col
			Status.SUCCESS: border_col = success_col
			
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, dim["radius"], dim["padding_h"], 0)
	add_theme_stylebox_override("panel", sb)
	
	if _line_edit:
		_line_edit.add_theme_font_size_override("font_size", int(dim["font_size"]))
		_line_edit.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
		_line_edit.add_theme_color_override("font_placeholder_color", GotodTheme.get_color("text_disabled"))

## 静态多态构建工厂 (支持 1. 单值简写 create(placeholder), 2. 字典对象 create({ ... }), 3. 多参数 create(text, placeholder, clearable))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GInput:
	var inp = GInput.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("text"): inp.text = str(opts["text"])
		if opts.has("placeholder"): inp.placeholder_text = str(opts["placeholder"])
		elif opts.has("placeholder_text"): inp.placeholder_text = str(opts["placeholder_text"])
		if opts.has("clearable"): inp.clearable = bool(opts["clearable"])
		if opts.has("secret") or opts.has("show_password"): inp.secret = bool(opts.get("secret", opts.get("show_password", false)))
		if opts.has("show_password_toggle"): inp.show_password_toggle = bool(opts["show_password_toggle"])
		if opts.has("disabled"): inp.disabled = bool(opts["disabled"])
		if opts.has("prefix"): inp.prefix_text = str(opts["prefix"])
		if opts.has("suffix"): inp.suffix_text = str(opts["suffix"])
		if opts.has("on_change") and opts["on_change"] is Callable: inp.text_changed.connect(opts["on_change"])
		if opts.has("on_submit") and opts["on_submit"] is Callable: inp.text_submitted.connect(opts["on_submit"])
	elif arg1 != null:
		inp.text = str(arg1)
		if arg2 != null:
			inp.placeholder_text = str(arg2)
		if arg3 != null:
			inp.clearable = bool(arg3)
	return inp
