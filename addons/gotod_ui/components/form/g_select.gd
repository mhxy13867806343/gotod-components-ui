@tool
class_name GSelect
extends PanelContainer

## =========================================================================
## GSelect: 下拉选择器 (Benchmarked against Element Plus Select)
## 当选项过多时，使用下拉菜单展示并供用户选择内容。
## 支持单选、多选 Tags 折叠、搜索筛选 (Filterable)、一键清空 (Clearable)、分组与自定义插槽。
## =========================================================================

signal item_selected(index: int, value: Variant, label: String)
signal selection_changed(values: Array)
signal cleared
signal popup_visibility_changed(is_visible: bool)

@export var placeholder_text: String = "请选择 / Select...":
	set(val):
		placeholder_text = val
		_update_display()

@export var clearable: bool = true:
	set(val):
		clearable = val
		_update_buttons()

@export var filterable: bool = true:
	set(val):
		filterable = val

@export var multiple: bool = false:
	set(val):
		multiple = val
		if not multiple:
			selected_values.clear()
		_update_display()

@export var collapse_tags: bool = false:
	set(val):
		collapse_tags = val
		_update_display()

@export var max_collapse_tags: int = 1:
	set(val):
		max_collapse_tags = val
		_update_display()

@export var disabled: bool = false:
	set(val):
		disabled = val
		_update_styles()

@export var options: Array[Dictionary] = []:
	set(val):
		options = val
		_filtered_options = options.duplicate(true)
		_update_display()

@export var selected_index: int = -1:
	set(val):
		selected_index = val
		if selected_index >= 0 and selected_index < options.size():
			var opt = options[selected_index]
			selected_value = opt.get("value", opt.get("label", ""))
		else:
			selected_value = null
		_update_display()

var selected_value: Variant = null
var selected_values: Array = [] # For multiple mode: Array[Variant]

var _filtered_options: Array[Dictionary] = []
var _hbox: HBoxContainer
var _tags_container: HBoxContainer
var _label: Label
var _clear_btn: Button
var _arrow_icon: Label
var _popup_panel: PopupPanel
var _popup_vbox: VBoxContainer
var _search_input: LineEdit
var _options_list_container: VBoxContainer
var _empty_label: Label
var _is_hovered: bool = false

# Slot Proxy Support
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
		_slot_proxies[p_slot_name] = GSlotProxy.new(self, p_slot_name, self)
	return _slot_proxies[p_slot_name]

func set_slot_node(p_slot_name: String, node: Control) -> void:
	add_child(node)
	get_slot(p_slot_name).target_node = node

func _get(property: StringName) -> Variant:
	var prop_str = str(property)
	if prop_str in ["default", "prefix", "suffix", "empty", "tag"] or prop_str.begins_with("t") or _slot_proxies.has(prop_str):
		return get_slot(prop_str)
	return null

func _set(property: StringName, value: Variant) -> bool:
	var prop_str = str(property)
	if prop_str == "slotName":
		slotName = value
		return true
	return false

func _ready() -> void:
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	_filtered_options = options.duplicate(true)
	_setup_children()
	_setup_popup()
	_update_styles()
	_update_display()
	
	mouse_entered.connect(func(): _is_hovered = true; _update_buttons())
	mouse_exited.connect(func(): _is_hovered = false; _update_buttons())
	
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_children() -> void:
	for child in get_children():
		if child != _popup_panel:
			child.queue_free()
		
	_hbox = HBoxContainer.new()
	_hbox.alignment = BoxContainer.ALIGNMENT_BEGIN
	_hbox.add_theme_constant_override("separation", 6)
	_hbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_hbox.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	add_child(_hbox)
	
	_tags_container = HBoxContainer.new()
	_tags_container.add_theme_constant_override("separation", 4)
	_tags_container.visible = false
	_hbox.add_child(_tags_container)
	
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
	_clear_btn.add_theme_font_size_override("font_size", 14)
	_hbox.add_child(_clear_btn)
	
	_arrow_icon = Label.new()
	_arrow_icon.text = "▼"
	_arrow_icon.add_theme_font_size_override("font_size", 10)
	_hbox.add_child(_arrow_icon)

func _setup_popup() -> void:
	if _popup_panel and is_instance_valid(_popup_panel):
		_popup_panel.queue_free()
		
	_popup_panel = PopupPanel.new()
	var p_sb = StyleBoxFlat.new()
	p_sb.bg_color = Color(0.14, 0.14, 0.18, 0.98)
	p_sb.border_color = Color(0.24, 0.24, 0.32, 1.0)
	p_sb.set_border_width_all(1)
	p_sb.set_corner_radius_all(6)
	p_sb.set_content_margin_all(8)
	p_sb.shadow_color = Color(0, 0, 0, 0.35)
	p_sb.shadow_size = 8
	_popup_panel.add_theme_stylebox_override("panel", p_sb)
	
	_popup_vbox = VBoxContainer.new()
	_popup_vbox.add_theme_constant_override("separation", 6)
	_popup_panel.add_child(_popup_vbox)
	
	_search_input = LineEdit.new()
	_search_input.placeholder_text = "🔍 输入关键字搜索..."
	_search_input.text_changed.connect(_on_filter_text_changed)
	_popup_vbox.add_child(_search_input)
	
	var scroll = ScrollContainer.new()
	scroll.custom_minimum_size = Vector2(0, 160)
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	_popup_vbox.add_child(scroll)
	
	_options_list_container = VBoxContainer.new()
	_options_list_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_options_list_container.add_theme_constant_override("separation", 2)
	scroll.add_child(_options_list_container)
	
	_empty_label = Label.new()
	_empty_label.text = "无匹配数据 (No Data)"
	_empty_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_empty_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6))
	_empty_label.visible = false
	_popup_vbox.add_child(_empty_label)
	
	_popup_panel.popup_hide.connect(func(): popup_visibility_changed.emit(false); if _arrow_icon: _arrow_icon.text = "▼")
	add_child(_popup_panel)

func _gui_input(event: InputEvent) -> void:
	if disabled: return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		toggle_popup()
		accept_event()

func toggle_popup() -> void:
	if disabled: return
	if _popup_panel.visible:
		_popup_panel.hide()
	else:
		show_popup()

func show_popup() -> void:
	if disabled: return
	_search_input.visible = filterable
	_search_input.text = ""
	_filtered_options = options.duplicate(true)
	_render_popup_items()
	
	var global_pos = global_position + Vector2(0, size.y + 4)
	_popup_panel.position = Vector2i(int(global_pos.x), int(global_pos.y))
	_popup_panel.min_size = Vector2i(int(max(size.x, 200)), 0)
	_popup_panel.popup()
	if _arrow_icon: _arrow_icon.text = "▲"
	if filterable:
		_search_input.grab_focus()
	popup_visibility_changed.emit(true)

func _render_popup_items() -> void:
	for child in _options_list_container.get_children():
		child.queue_free()
		
	if _filtered_options.is_empty():
		_empty_label.visible = true
		return
	else:
		_empty_label.visible = false
		
	var current_group = ""
	for i in range(_filtered_options.size()):
		var opt = _filtered_options[i]
		var grp = opt.get("group", "")
		if grp != "" and grp != current_group:
			current_group = grp
			var grp_lbl = Label.new()
			grp_lbl.text = "— " + current_group + " —"
			grp_lbl.add_theme_font_size_override("font_size", 11)
			grp_lbl.add_theme_color_override("font_color", Color(0.5, 0.5, 0.6))
			_options_list_container.add_child(grp_lbl)
			
		var btn = Button.new()
		var opt_label = opt.get("label", str(opt.get("value", "")))
		var opt_val = opt.get("value", opt_label)
		var is_opt_disabled = opt.get("disabled", false)
		
		btn.text = opt_label
		btn.alignment = HORIZONTAL_ALIGNMENT_LEFT
		btn.flat = true
		btn.disabled = is_opt_disabled
		
		# Check if selected
		var is_selected = false
		if multiple:
			is_selected = selected_values.has(opt_val)
		else:
			is_selected = (selected_value == opt_val)
			
		if is_selected:
			btn.add_theme_color_override("font_color", GotodTheme.get_color("primary", Color("#409eff")))
			btn.text = "✓ " + opt_label
		
		var raw_index = options.find(opt)
		btn.pressed.connect(func(): _on_item_clicked(raw_index, opt))
		_options_list_container.add_child(btn)

func _on_filter_text_changed(new_text: String) -> void:
	var query = new_text.strip_edges().to_lower()
	if query == "":
		_filtered_options = options.duplicate(true)
	else:
		_filtered_options.clear()
		for opt in options:
			var l = opt.get("label", "").to_lower()
			var v = str(opt.get("value", "")).to_lower()
			if query in l or query in v:
				_filtered_options.append(opt)
	_render_popup_items()

func _on_item_clicked(idx: int, opt: Dictionary) -> void:
	var val = opt.get("value", opt.get("label", ""))
	var lbl = opt.get("label", "")
	
	if multiple:
		if selected_values.has(val):
			selected_values.erase(val)
		else:
			selected_values.append(val)
		_update_display()
		selection_changed.emit(selected_values)
		_render_popup_items() # refresh checkmarks without closing
	else:
		selected_index = idx
		selected_value = val
		_update_display()
		item_selected.emit(idx, val, lbl)
		selection_changed.emit([val])
		_popup_panel.hide()

func _on_clear_pressed() -> void:
	selected_index = -1
	selected_value = null
	selected_values.clear()
	_update_display()
	cleared.emit()
	selection_changed.emit([])

func add_option(label: String, value: Variant = null, is_disabled: bool = false, group_name: String = "") -> void:
	options.append({
		"label": label,
		"value": value if value != null else label,
		"disabled": is_disabled,
		"group": group_name
	})
	_filtered_options = options.duplicate(true)
	_update_display()

func add_options(opt_list: Array) -> void:
	for opt in opt_list:
		if opt is Dictionary:
			options.append(opt)
		elif opt is String:
			options.append({ "label": opt, "value": opt, "disabled": false })
	_filtered_options = options.duplicate(true)
	_update_display()

func clear_options() -> void:
	options.clear()
	_filtered_options.clear()
	selected_index = -1
	selected_value = null
	selected_values.clear()
	_update_display()

func _update_display() -> void:
	if not _label or not _tags_container: return
	
	if multiple:
		_label.visible = selected_values.is_empty()
		_label.text = placeholder_text
		_tags_container.visible = not selected_values.is_empty()
		for child in _tags_container.get_children():
			child.queue_free()
			
		if not selected_values.is_empty():
			var show_count = selected_values.size()
			if collapse_tags and show_count > max_collapse_tags:
				show_count = max_collapse_tags
				
			for i in range(show_count):
				var val = selected_values[i]
				var tag_lbl = _find_label_by_value(val)
				var tag_pill = Label.new()
				tag_pill.text = tag_lbl + " ×"
				tag_pill.add_theme_font_size_override("font_size", 12)
				tag_pill.add_theme_color_override("font_color", GotodTheme.get_color("primary", Color("#409eff")))
				_tags_container.add_child(tag_pill)
				
			if collapse_tags and selected_values.size() > max_collapse_tags:
				var extra_pill = Label.new()
				extra_pill.text = "+" + str(selected_values.size() - max_collapse_tags)
				extra_pill.add_theme_font_size_override("font_size", 12)
				extra_pill.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7))
				_tags_container.add_child(extra_pill)
	else:
		_tags_container.visible = false
		_label.visible = true
		if selected_index >= 0 and selected_index < options.size():
			_label.text = options[selected_index].get("label", "")
			_label.add_theme_color_override("font_color", GotodTheme.get_color("text_primary", Color.WHITE))
		else:
			_label.text = placeholder_text
			_label.add_theme_color_override("font_color", GotodTheme.get_color("text_disabled", Color(0.5, 0.5, 0.5)))
			
	_update_buttons()

func _find_label_by_value(val: Variant) -> String:
	for opt in options:
		if opt.get("value") == val:
			return opt.get("label", str(val))
	return str(val)

func _update_buttons() -> void:
	if not _clear_btn: return
	var has_val = (selected_values.size() > 0) if multiple else (selected_index >= 0 or selected_value != null)
	_clear_btn.visible = clearable and has_val and !disabled

func _update_styles() -> void:
	custom_minimum_size = Vector2(160, 36)
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0, 12.0, 0.0)
	add_theme_stylebox_override("panel", sb)
	
	if _arrow_icon:
		_arrow_icon.add_theme_color_override("font_color", GotodTheme.get_color("text_secondary", Color("#909399")))
