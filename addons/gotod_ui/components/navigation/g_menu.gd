@tool
class_name GMenu
extends BoxContainer

## GMenu: 对标 Element Plus Menu 的导航菜单组件。
## 支持横向/纵向排列、子菜单展开、默认激活项、唯一展开、禁用菜单项与弹出方向计算。

signal item_selected(index: String, key_path: Array, item: Dictionary)
signal submenu_opened(index: String, key_path: Array)
signal submenu_closed(index: String, key_path: Array)

enum MenuMode {
	VERTICAL,
	HORIZONTAL
}

enum PopperPlacement {
	AUTO,
	BOTTOM,
	TOP
}

@export_enum("VERTICAL", "HORIZONTAL") var mode: int = MenuMode.VERTICAL:
	set(val):
		mode = val
		if is_node_ready():
			_rebuild_menu()

@export var items: Array[Dictionary] = []:
	set(val):
		items = val
		if is_node_ready():
			_rebuild_menu()

@export var active_index: String = "":
	set(val):
		active_index = val
		if is_node_ready():
			_rebuild_menu()

@export var default_openeds: Array[String] = []:
	set(val):
		default_openeds = val
		_opened_indices = default_openeds.duplicate()
		if is_node_ready():
			_rebuild_menu()

@export var unique_opened: bool = false

@export var collapse: bool = false:
	set(val):
		collapse = val
		if is_node_ready():
			_rebuild_menu()

@export_enum("AUTO", "BOTTOM", "TOP") var popper_placement: int = PopperPlacement.AUTO
@export var popper_offset: int = 8

@export var item_height: int = 40:
	set(val):
		item_height = max(28, val)
		if is_node_ready():
			_rebuild_menu()

var _opened_indices: Array[String] = [] # 当前展开的子菜单 index 列表。
var _current_slot_name: String = "" # 当前点语法选中的插槽名。
var _slot_proxies: Dictionary = {} # 缓存 default/title/icon 等插槽代理。
var _submenu_popup: PopupPanel # 横向/折叠态子菜单使用的浮层，避免纵向缩进展开。
var _popup_source_index: String = "" # 当前浮层对应的父菜单 index，用于再次点击时关闭。

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

func _ready() -> void:
	_opened_indices = default_openeds.duplicate()
	_rebuild_menu()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_rebuild_menu)

## 追加一个菜单项；children 可继续传入子菜单列表。
func add_item(index: String, label: String, icon_text: String = "", disabled: bool = false, children: Array[Dictionary] = []) -> void:
	items.append({
		"index": index,
		"label": label,
		"icon": icon_text,
		"disabled": disabled,
		"children": children
	})
	_rebuild_menu()

## 清空全部菜单项。
func clear_items() -> void:
	items.clear()
	active_index = ""
	_opened_indices.clear()
	_rebuild_menu()

## 通过 index 选中菜单项，并发出 item_selected 信号。
func select(index: String) -> void:
	var target_item = _find_item(index, items)
	if target_item.is_empty() or target_item.get("disabled", false):
		return
	active_index = index
	item_selected.emit(index, _find_key_path(index, items), target_item)
	_rebuild_menu()

## 展开或收起子菜单。横向/折叠态走浮层，纵向走手风琴，都不靠缩进塞子项。
func toggle_submenu(index: String) -> void:
	if _opened_indices.has(index):
		close_submenu(index)
		_hide_submenu_popup()
		if not _uses_popup_submenu():
			_rebuild_menu()
		return
	open_submenu(index)
	if not _uses_popup_submenu():
		_rebuild_menu()

## 展开指定子菜单；unique_opened 为 true 时会先关闭其它子菜单。
func open_submenu(index: String) -> void:
	if _opened_indices.has(index):
		return
	if unique_opened:
		_opened_indices.clear()
	_opened_indices.append(index)
	submenu_opened.emit(index, _find_key_path(index, items))

## 关闭指定子菜单。
func close_submenu(index: String) -> void:
	if not _opened_indices.has(index):
		return
	_opened_indices.erase(index)
	submenu_closed.emit(index, _find_key_path(index, items))

## 关闭全部已展开子菜单。
func close_all_submenus() -> void:
	for index in _opened_indices.duplicate():
		submenu_closed.emit(index, _find_key_path(index, items))
	_opened_indices.clear()
	_rebuild_menu()

## 判断指定子菜单当前是否展开。
func is_submenu_open(index: String) -> bool:
	return _opened_indices.has(index)

## 根据锚点、弹层尺寸与视口空间计算弹出位置；AUTO 会自动向上或向下。
func resolve_popup_position(anchor_rect: Rect2, popup_size: Vector2, viewport_rect: Rect2 = Rect2()) -> Vector2:
	var visible_rect = viewport_rect
	if visible_rect.size == Vector2.ZERO and get_viewport():
		visible_rect = get_viewport().get_visible_rect()

	var safe_rect = visible_rect.grow(-float(popper_offset))
	var place_top = popper_placement == PopperPlacement.TOP
	if popper_placement == PopperPlacement.AUTO:
		var below_space = visible_rect.position.y + visible_rect.size.y - anchor_rect.end.y
		var above_space = anchor_rect.position.y - visible_rect.position.y
		place_top = below_space < popup_size.y + popper_offset and above_space > below_space

	var x = clamp(anchor_rect.position.x, safe_rect.position.x, safe_rect.end.x - popup_size.x)
	var y = anchor_rect.end.y + popper_offset
	if place_top:
		y = anchor_rect.position.y - popup_size.y - popper_offset
	y = clamp(y, safe_rect.position.y, safe_rect.end.y - popup_size.y)
	return Vector2(x, y)

func get_slot(p_slot_name: String) -> GSlotProxy:
	if not _slot_proxies.has(p_slot_name):
		_slot_proxies[p_slot_name] = GSlotProxy.new(self, p_slot_name, self)
	return _slot_proxies[p_slot_name]

func set_slot_node(p_slot_name: String, node: Control) -> void:
	add_child(node)
	get_slot(p_slot_name).target_node = node

func _get(property: StringName) -> Variant:
	var prop_str = str(property)
	if prop_str in ["default", "title", "icon", "item", "submenu"] or prop_str.begins_with("t") or _slot_proxies.has(prop_str):
		return get_slot(prop_str)
	return null

func _set(property: StringName, value: Variant) -> bool:
	var prop_str = str(property)
	if prop_str == "slotName":
		slotName = value
		return true
	return false

func _rebuild_menu() -> void:
	_ensure_submenu_popup()
	for child in get_children():
		if child == _submenu_popup:
			continue
		child.queue_free()

	vertical = mode == MenuMode.VERTICAL
	add_theme_constant_override("separation", 2 if mode == MenuMode.VERTICAL else 6)
	_build_items(self, items, 0, false)

## 是否用浮层展示子菜单：横向菜单和折叠态都不应该靠缩进展开。
func _uses_popup_submenu() -> bool:
	return mode == MenuMode.HORIZONTAL or collapse

func _ensure_submenu_popup() -> void:
	if _submenu_popup and is_instance_valid(_submenu_popup):
		return
	_submenu_popup = PopupPanel.new()
	_submenu_popup.hide()
	_submenu_popup.popup_hide.connect(func():
		if _popup_source_index != "":
			close_submenu(_popup_source_index)
			_popup_source_index = ""
	)
	add_child(_submenu_popup)

func _hide_submenu_popup() -> void:
	_popup_source_index = ""
	if _submenu_popup and is_instance_valid(_submenu_popup) and _submenu_popup.visible:
		_submenu_popup.hide()

func _show_submenu_popup(index: String, anchor: Control) -> void:
	_ensure_submenu_popup()
	if _popup_source_index == index and _submenu_popup.visible:
		_hide_submenu_popup()
		close_submenu(index)
		return

	var parent_item = _find_item(index, items)
	var children: Array = parent_item.get("children", [])
	if children.is_empty() or not is_instance_valid(anchor):
		return

	open_submenu(index)
	_popup_source_index = index
	for child in _submenu_popup.get_children():
		child.queue_free()

	var box = VBoxContainer.new()
	box.add_theme_constant_override("separation", 2)
	_submenu_popup.add_child(box)
	_build_items(box, children, 1, true)

	var panel_bg = GotodTheme.get_color("bg_card")
	var panel_border = GotodTheme.get_color("border_base")
	_submenu_popup.add_theme_stylebox_override("panel", GotodTheme.create_stylebox_flat(panel_bg, panel_border, 1, 8.0))

	# 按子项数量估算浮层尺寸，再根据锚点下方/上方剩余空间决定弹出方向。
	var popup_size = Vector2(max(anchor.size.x, 180.0), float(children.size() * (item_height + 2) + 16))
	var pos = resolve_popup_position(Rect2(anchor.global_position, anchor.size), popup_size)
	_submenu_popup.popup(Rect2i(int(pos.x), int(pos.y), int(popup_size.x), int(popup_size.y)))

func _build_items(parent: Container, item_list: Array, depth: int, in_popup: bool) -> void:
	for raw_item in item_list:
		if not raw_item is Dictionary:
			continue

		var item: Dictionary = raw_item
		var index = str(item.get("index", item.get("key", item.get("label", ""))))
		var children: Array = item.get("children", [])
		var has_children = not children.is_empty()
		var is_active = index == active_index or (has_children and _find_key_path(active_index, items).has(index))
		var is_disabled = item.get("disabled", false)

		var button = Button.new()
		button.text = _format_item_text(item, has_children, depth)
		button.disabled = is_disabled
		button.focus_mode = Control.FOCUS_NONE
		button.alignment = HORIZONTAL_ALIGNMENT_LEFT
		button.custom_minimum_size = Vector2(52 if collapse and not in_popup else 140, item_height)
		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		button.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
		_apply_button_theme(button, is_active, is_disabled, depth)

		if has_children:
			button.pressed.connect(func():
				if _uses_popup_submenu():
					_show_submenu_popup(index, button)
				else:
					toggle_submenu(index)
			)
		else:
			button.pressed.connect(func():
				select(index)
				_hide_submenu_popup()
			)
		parent.add_child(button)

		# 纵向非折叠：子菜单原地展开，不额外缩进。
		if has_children and not _uses_popup_submenu() and _opened_indices.has(index):
			var child_box = VBoxContainer.new()
			child_box.add_theme_constant_override("separation", 2)
			child_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			parent.add_child(child_box)
			_build_items(child_box, children, depth + 1, false)

func _format_item_text(item: Dictionary, has_children: bool, depth: int) -> String:
	var icon_text = str(item.get("icon", ""))
	var label = str(item.get("label", item.get("title", item.get("index", ""))))
	var item_index = str(item.get("index", item.get("key", "")))
	var suffix = ""
	if has_children:
		suffix = "  ▾" if _opened_indices.has(item_index) else "  ▸"
	if collapse and depth == 0:
		return icon_text if icon_text != "" else label.left(1)
	return "%s%s%s" % [icon_text + " " if icon_text != "" else "", label, suffix]

func _apply_button_theme(button: Button, is_active: bool, is_disabled: bool, depth: int) -> void:
	var bg_col = GotodTheme.get_color("primary") if is_active else GotodTheme.get_color("bg_surface")
	var border_col = GotodTheme.get_color("primary") if is_active else GotodTheme.get_color("border_base")
	var text_col = Color.WHITE if is_active else GotodTheme.get_color("text_primary")
	if is_disabled:
		text_col = GotodTheme.get_color("text_disabled")

	var indent = 12 + depth * 16
	var normal = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0)
	normal.content_margin_left = indent
	normal.content_margin_right = 12
	normal.content_margin_top = 6
	normal.content_margin_bottom = 6
	button.add_theme_stylebox_override("normal", normal)

	var hover = GotodTheme.create_stylebox_flat(GotodTheme.get_color("bg_card"), GotodTheme.get_color("primary"), 1, 6.0)
	hover.content_margin_left = indent
	hover.content_margin_right = 12
	hover.content_margin_top = 6
	hover.content_margin_bottom = 6
	button.add_theme_stylebox_override("hover", hover)
	button.add_theme_stylebox_override("pressed", normal)
	button.add_theme_color_override("font_color", text_col)
	button.add_theme_color_override("font_hover_color", GotodTheme.get_color("primary") if not is_active else Color.WHITE)

func _find_item(index: String, item_list: Array) -> Dictionary:
	for raw_item in item_list:
		if not raw_item is Dictionary:
			continue
		var item: Dictionary = raw_item
		var item_index = str(item.get("index", item.get("key", item.get("label", ""))))
		if item_index == index:
			return item
		var found = _find_item(index, item.get("children", []))
		if not found.is_empty():
			return found
	return {}

func _find_key_path(index: String, item_list: Array, prefix: Array = []) -> Array:
	for raw_item in item_list:
		if not raw_item is Dictionary:
			continue
		var item: Dictionary = raw_item
		var item_index = str(item.get("index", item.get("key", item.get("label", ""))))
		var current_path = prefix + [item_index]
		if item_index == index:
			return current_path
		var child_path = _find_key_path(index, item.get("children", []), current_path)
		if not child_path.is_empty():
			return child_path
	return []

## 静态多态构建工厂 (支持 1. 数组单值 create(items_list), 2. 字典对象 create({ ... }), 3. 多参数 create(items, mode, active_idx))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GMenu:
	var menu = GMenu.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("items") and opts["items"] is Array: menu.items = opts["items"]
		if opts.has("mode"):
			if opts["mode"] is int: menu.mode = opts["mode"]
			elif str(opts["mode"]).to_lower() == "horizontal": menu.mode = MenuMode.HORIZONTAL
		if opts.has("active") or opts.has("active_index"): menu.active_index = str(opts.get("active", opts.get("active_index", "")))
		if opts.has("collapse"): menu.collapse = bool(opts["collapse"])
		if opts.has("on_select") and opts["on_select"] is Callable:
			menu.item_selected.connect(func(idx, key_path, item): opts["on_select"].call(idx, item))
	elif arg1 is Array:
		menu.items = arg1 as Array
		if arg2 != null:
			if arg2 is int: menu.mode = arg2
			elif str(arg2).to_lower() == "horizontal": menu.mode = MenuMode.HORIZONTAL
		if arg3 != null:
			menu.active_index = str(arg3)
	return menu
