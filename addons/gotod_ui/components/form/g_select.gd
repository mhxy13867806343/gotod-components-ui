@tool
class_name GSelect
extends PanelContainer

signal item_selected(index: int, value: Variant, label: String)
signal cleared

@export var options: Array[Dictionary] = []: # [{"label": "Option 1", "value": 1, "disabled": false}]
	set(val):
		options = val
		_update_display_text()

@export var selected_index: int = -1:
	set(val):
		selected_index = val
		_update_display_text()

@export var placeholder_text: String = "Select an option...":
	set(val):
		placeholder_text = val
		_update_display_text()

@export var clearable: bool = true:
	set(val):
		clearable = val
		_update_buttons()

@export var disabled: bool = false:
	set(val):
		disabled = val
		_update_styles()

var _hbox: HBoxContainer
var _label: Label
var _arrow_icon: Label
var _clear_btn: Button
var _popup_menu: PopupMenu
var _is_open: bool = false

func _ready() -> void:
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
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
	
	_label = Label.new()
	_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_label.text = placeholder_text
	_hbox.add_child(_label)
	
	_clear_btn = Button.new()
	_clear_btn.text = "×"
	_clear_btn.flat = true
	_clear_btn.focus_mode = Control.FOCUS_NONE
	_clear_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_clear_btn.pressed.connect(_on_clear_pressed)
	_clear_btn.visible = false
	_hbox.add_child(_clear_btn)
	
	_arrow_icon = Label.new()
	_arrow_icon.text = "▼"
	_arrow_icon.add_theme_font_size_override("font_size", 10)
	_hbox.add_child(_arrow_icon)
	
	_popup_menu = PopupMenu.new()
	_popup_menu.id_pressed.connect(_on_menu_id_pressed)
	add_child(_popup_menu)
	_update_display_text()

func _gui_input(event: InputEvent) -> void:
	if disabled: return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		_toggle_popup()
		accept_event()

func _toggle_popup() -> void:
	if options.is_empty(): return
	_popup_menu.clear()
	for i in range(options.size()):
		var opt = options[i]
		var l = opt.get("label", str(opt.get("value", "")))
		_popup_menu.add_item(l, i)
		if opt.get("disabled", false):
			_popup_menu.set_item_disabled(i, true)
			
	var global_pos = global_position + Vector2(0, size.y + 4)
	_popup_menu.position = Vector2i(int(global_pos.x), int(global_pos.y))
	_popup_menu.min_size = Vector2i(int(size.x), 0)
	_popup_menu.popup()

func _on_menu_id_pressed(id: int) -> void:
	selected_index = id
	var opt = options[id]
	item_selected.emit(id, opt.get("value", id), opt.get("label", ""))
	_update_display_text()

func _on_clear_pressed() -> void:
	selected_index = -1
	_update_display_text()
	cleared.emit()

func add_option(label: String, value: Variant = null, is_disabled: bool = false) -> void:
	options.append({
		"label": label,
		"value": value if value != null else label,
		"disabled": is_disabled
	})
	_update_display_text()

func add_options(opt_list: Array) -> void:
	for opt in opt_list:
		if opt is Dictionary:
			options.append(opt)
		elif opt is String:
			options.append({ "label": opt, "value": opt, "disabled": false })
	_update_display_text()

func _update_display_text() -> void:
	if not _label: return
	if selected_index >= 0 and selected_index < options.size():
		_label.text = options[selected_index].get("label", "")
		_label.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
	else:
		_label.text = placeholder_text
		_label.add_theme_color_override("font_color", GotodTheme.get_color("text_disabled"))
	_update_buttons()

func _update_buttons() -> void:
	if _clear_btn:
		_clear_btn.visible = clearable and selected_index >= 0 and !disabled

func _update_styles() -> void:
	custom_minimum_size = Vector2(160, 34)
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0, 12.0, 0.0)
	add_theme_stylebox_override("panel", sb)
	
	if _arrow_icon:
		_arrow_icon.add_theme_color_override("font_color", GotodTheme.get_color("text_secondary"))
