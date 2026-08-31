@tool
class_name GDialog
extends Control

signal confirmed
signal cancelled
signal closed

@export var title: String = "Dialog Title":
	set(val):
		title = val
		if _title_label: _title_label.text = title

@export var content_text: String = "Are you sure you want to proceed with this operation?":
	set(val):
		content_text = val
		if _body_label: _body_label.text = content_text

@export var confirm_button_text: String = "Confirm"
@export var cancel_button_text: String = "Cancel"
@export var show_cancel_button: bool = true
@export var mask_closable: bool = true
@export var dialog_width: float = 460.0

var _mask: ColorRect
var _panel: PanelContainer
var _vbox: VBoxContainer
var _header_container: HBoxContainer
var _footer_container: HBoxContainer
var _close_btn: Button
var _title_label: Label
var _body_label: Label
var _confirm_btn: GButton
var _cancel_btn: GButton

# Slot Proxy System
var _current_slot_name: String = ""
var _slot_proxies: Dictionary = {}

var slotName: Variant:
	get:
		var target_name = _current_slot_name if _current_slot_name != "" else "default"
		return get_slot(target_name)
	set(val):
		if val is String or val is StringName:
			var s_name = str(val)
			if not GSlotProxy.validate_slot_name(s_name):
				return
			_current_slot_name = s_name
		elif val is Control or val is Node:
			var target_name = _current_slot_name if _current_slot_name != "" else "default"
			set_slot_node(target_name, val)

func get_slot(p_slot_name: String) -> GSlotProxy:
	if not _slot_proxies.has(p_slot_name):
		var target_node: Control = null
		match p_slot_name:
			"header", "title":
				target_node = _title_label
			"default", "body", "content":
				target_node = _body_label
			"footer":
				target_node = _confirm_btn
			"close":
				target_node = _close_btn
			_:
				target_node = _body_label
		_slot_proxies[p_slot_name] = GSlotProxy.new(target_node, p_slot_name, self)
	return _slot_proxies[p_slot_name]

func set_slot_node(p_slot_name: String, node: Control) -> void:
	match p_slot_name:
		"header":
			set_header(node)
		"default", "body", "content":
			set_content(node)
		"footer":
			set_footer(node)

func set_header(node: Control) -> void:
	if _header_container and is_instance_valid(_header_container):
		for c in _header_container.get_children():
			if c != _close_btn:
				c.queue_free()
		_header_container.add_child(node)
		_header_container.move_child(node, 0)
	get_slot("header").target_node = node

func set_content(node: Control) -> void:
	if _vbox and is_instance_valid(_vbox):
		if _body_label and is_instance_valid(_body_label):
			_body_label.visible = false
		_vbox.add_child(node)
		_vbox.move_child(node, 1)
	get_slot("default").target_node = node

func set_footer(node: Control) -> void:
	if _footer_container and is_instance_valid(_footer_container):
		for c in _footer_container.get_children():
			c.queue_free()
		_footer_container.add_child(node)
	get_slot("footer").target_node = node

func _get(property: StringName) -> Variant:
	var prop_str = str(property)
	if prop_str in ["header", "default", "footer", "close", "content", "title"] or prop_str.begins_with("t") or _slot_proxies.has(prop_str):
		return get_slot(prop_str)
	return null

func _set(property: StringName, value: Variant) -> bool:
	var prop_str = str(property)
	if prop_str == "slotName":
		slotName = value
		return true
	return false

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	_setup_ui()
	visible = false

func _setup_ui() -> void:
	for child in get_children():
		child.queue_free()
		
	# Backdrop Mask
	_mask = ColorRect.new()
	_mask.anchors_preset = Control.PRESET_FULL_RECT
	_mask.color = Color(0, 0, 0, 0.6)
	_mask.gui_input.connect(_on_mask_input)
	add_child(_mask)
	
	# Modal Box
	_panel = PanelContainer.new()
	_panel.custom_minimum_size = Vector2(dialog_width, 0)
	_panel.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	_panel.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	
	# Center anchor
	_panel.anchor_left = 0.5
	_panel.anchor_top = 0.5
	_panel.anchor_right = 0.5
	_panel.anchor_bottom = 0.5
	_panel.grow_horizontal = Control.GROW_DIRECTION_BOTH
	_panel.grow_vertical = Control.GROW_DIRECTION_BOTH
	
	_vbox = VBoxContainer.new()
	_vbox.add_theme_constant_override("separation", 16)
	_panel.add_child(_vbox)
	
	# Header
	_header_container = HBoxContainer.new()
	_title_label = Label.new()
	_title_label.text = title
	_title_label.add_theme_font_size_override("font_size", 18)
	_title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_header_container.add_child(_title_label)
	
	_close_btn = Button.new()
	_close_btn.text = "×"
	_close_btn.flat = true
	_close_btn.focus_mode = Control.FOCUS_NONE
	_close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_close_btn.pressed.connect(close)
	_header_container.add_child(_close_btn)
	_vbox.add_child(_header_container)
	
	# Body
	_body_label = Label.new()
	_body_label.text = content_text
	_body_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_vbox.add_child(_body_label)
	
	# Footer
	_footer_container = HBoxContainer.new()
	_footer_container.alignment = BoxContainer.ALIGNMENT_END
	_footer_container.add_theme_constant_override("separation", 12)
	
	if show_cancel_button:
		_cancel_btn = GButton.new()
		_cancel_btn.text = cancel_button_text
		_cancel_btn.button_type = GButton.ButtonType.DEFAULT
		_cancel_btn.pressed.connect(_on_cancel)
		_footer_container.add_child(_cancel_btn)
		
	_confirm_btn = GButton.new()
	_confirm_btn.text = confirm_button_text
	_confirm_btn.button_type = GButton.ButtonType.PRIMARY
	_confirm_btn.pressed.connect(_on_confirm)
	_footer_container.add_child(_confirm_btn)
	
	_vbox.add_child(_footer_container)
	add_child(_panel)
	
	# Sync initial slot proxies
	if _slot_proxies.has("header"): _slot_proxies["header"].target_node = _title_label
	if _slot_proxies.has("default"): _slot_proxies["default"].target_node = _body_label
	if _slot_proxies.has("footer"): _slot_proxies["footer"].target_node = _confirm_btn
	
	_update_styles()

func _update_styles() -> void:
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 10.0, 20.0, 20.0, Color(0, 0, 0, 0.4), 16)
	_panel.add_theme_stylebox_override("panel", sb)

func open() -> void:
	visible = true
	_panel.pivot_offset = _panel.size / 2.0
	_panel.scale = Vector2(0.9, 0.9)
	_mask.modulate.a = 0.0
	_panel.modulate.a = 0.0
	
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	tw.tween_property(_panel, "scale", Vector2.ONE, 0.25)
	tw.tween_property(_panel, "modulate:a", 1.0, 0.2)
	tw.tween_property(_mask, "modulate:a", 1.0, 0.2)

func close() -> void:
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	tw.tween_property(_panel, "scale", Vector2(0.95, 0.95), 0.15)
	tw.tween_property(_panel, "modulate:a", 0.0, 0.15)
	tw.tween_property(_mask, "modulate:a", 0.0, 0.15)
	await tw.finished
	visible = false
	closed.emit()

func _on_confirm() -> void:
	confirmed.emit()
	close()

func _on_cancel() -> void:
	cancelled.emit()
	close()

func _on_mask_input(event: InputEvent) -> void:
	if mask_closable and event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		close()

## 静态多态构建工厂 (支持 1. 标题单值 create("对话框标题"), 2. 字典对象 create({ ... }), 3. 多参数 create(title, content, on_confirm))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GDialog:
	var dlg = GDialog.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("title"): dlg.title = str(opts["title"])
		if opts.has("content") or opts.has("message"): dlg.content_text = str(opts.get("content", opts.get("message", "")))
		if opts.has("confirm_text"): dlg.confirm_button_text = str(opts["confirm_text"])
		if opts.has("cancel_text"): dlg.cancel_button_text = str(opts["cancel_text"])
		if opts.has("show_cancel"): dlg.show_cancel_button = bool(opts["show_cancel"])
		if opts.has("width"): dlg.dialog_width = float(opts["width"])
		if opts.has("on_confirm") and opts["on_confirm"] is Callable: dlg.confirmed.connect(opts["on_confirm"])
		if opts.has("on_cancel") and opts["on_cancel"] is Callable: dlg.cancelled.connect(opts["on_cancel"])
	elif arg1 != null:
		dlg.title = str(arg1)
		if arg2 != null:
			dlg.content_text = str(arg2)
		if arg3 is Callable:
			dlg.confirmed.connect(arg3)
	return dlg
