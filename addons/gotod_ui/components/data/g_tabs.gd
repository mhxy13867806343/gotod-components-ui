@tool
class_name GTabs
extends BoxContainer

# ==========================================
# 自定义外部信号 (Custom Public Signals)
# ==========================================
signal tab_clicked(index: int, name: String)
signal tab_changed(index: int, name: String)
signal tab_added(index: int, name: String)
signal tab_removed(index: int, name: String)
signal tab_close_requested(index: int, name: String)

enum TabType {
	LINE,
	CARD,
	BORDER_CARD,
	SEGMENT
}

enum TabPosition {
	TOP,
	BOTTOM,
	LEFT,
	RIGHT
}

@export var type: TabType = TabType.LINE:
	set(val):
		type = val
		_rebuild_ui()

@export var tab_position: TabPosition = TabPosition.TOP:
	set(val):
		tab_position = val
		_update_position_layout()

@export var current_tab: int = 0:
	set(val):
		if current_tab != val:
			if is_tab_disabled(val):
				return
			if before_leave.is_valid() and not before_leave.call(current_tab, val):
				return
			current_tab = val
			_sync_tab_selection()
			var t_name = get_tab_name(current_tab)
			tab_changed.emit(current_tab, t_name)

@export var closable: bool = false:
	set(val):
		closable = val
		_rebuild_ui()

@export var addable: bool = false:
	set(val):
		addable = val
		_rebuild_ui()

@export var stretch: bool = false:
	set(val):
		stretch = val
		_rebuild_ui()

var before_leave: Callable = Callable()

var _tab_bar_box: Container
var _content_stack: PanelContainer
var _add_button: GButton
var _tabs_data: Array[Dictionary] = [] # [{"name": "", "panel": Control, "closable": bool, "icon": Texture2D, "disabled": bool}]

func _ready() -> void:
	_setup_structure()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_rebuild_ui)

func _setup_structure() -> void:
	for child in get_children():
		child.queue_free()
		
	_update_position_layout()
	
	if tab_position == TabPosition.TOP or tab_position == TabPosition.BOTTOM:
		_tab_bar_box = HBoxContainer.new()
		_tab_bar_box.add_theme_constant_override("separation", 8)
	else:
		_tab_bar_box = VBoxContainer.new()
		_tab_bar_box.add_theme_constant_override("separation", 6)
		
	_content_stack = PanelContainer.new()
	_content_stack.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_stack.size_flags_vertical = Control.SIZE_EXPAND_FILL
	
	if tab_position == TabPosition.TOP or tab_position == TabPosition.LEFT:
		add_child(_tab_bar_box)
		add_child(_content_stack)
	else:
		add_child(_content_stack)
		add_child(_tab_bar_box)
		
	_rebuild_ui()

func _update_position_layout() -> void:
	vertical = (tab_position == TabPosition.TOP or tab_position == TabPosition.BOTTOM)

# ==========================================
# 丰富公开外部方法 (Public External Methods)
# ==========================================

## 动态追加选项卡
func add_tab(tab_name: String, panel_content: Control, is_closable: bool = false, icon: Texture2D = null) -> int:
	var new_idx = _tabs_data.size()
	_tabs_data.append({
		"name": tab_name,
		"panel": panel_content,
		"closable": is_closable or closable,
		"icon": icon,
		"disabled": false
	})
	if panel_content:
		_content_stack.add_child(panel_content)
	_rebuild_ui()
	tab_added.emit(new_idx, tab_name)
	return new_idx

## 在指定索引插入选项卡
func insert_tab(index: int, tab_name: String, panel_content: Control, is_closable: bool = false, icon: Texture2D = null) -> void:
	index = clamp(index, 0, _tabs_data.size())
	_tabs_data.insert(index, {
		"name": tab_name,
		"panel": panel_content,
		"closable": is_closable or closable,
		"icon": icon,
		"disabled": false
	})
	if panel_content:
		_content_stack.add_child(panel_content)
	_rebuild_ui()
	tab_added.emit(index, tab_name)

## 移除选项卡 (支持按索引 int 或按名称 String)
func remove_tab(index_or_name: Variant) -> void:
	var idx = -1
	if index_or_name is int:
		idx = index_or_name
	elif index_or_name is String:
		idx = find_tab_by_name(index_or_name)
		
	if idx < 0 or idx >= _tabs_data.size(): return
	
	var removed = _tabs_data[idx]
	_tabs_data.remove_at(idx)
	if removed["panel"] and is_instance_valid(removed["panel"]):
		removed["panel"].queue_free()
		
	if current_tab >= _tabs_data.size():
		current_tab = max(0, _tabs_data.size() - 1)
	_rebuild_ui()
	tab_removed.emit(idx, removed["name"])

## 清空所有选项卡
func clear_tabs() -> void:
	for data in _tabs_data:
		if data["panel"] and is_instance_valid(data["panel"]):
			data["panel"].queue_free()
	_tabs_data.clear()
	current_tab = 0
	_rebuild_ui()

## 获取选项卡总数
func get_tab_count() -> int:
	return _tabs_data.size()

## 获取指定索引的选项卡标题
func get_tab_name(index: int) -> String:
	if index >= 0 and index < _tabs_data.size():
		return _tabs_data[index]["name"]
	return ""

## 修改指定选项卡标题
func set_tab_title(index: int, new_title: String) -> void:
	if index >= 0 and index < _tabs_data.size():
		_tabs_data[index]["name"] = new_title
		_rebuild_ui()

## 获取指定索引的关联面板节点
func get_tab_panel(index: int) -> Control:
	if index >= 0 and index < _tabs_data.size():
		return _tabs_data[index]["panel"]
	return null

## 设置指定选项卡是否禁用
func set_tab_disabled(index: int, is_disabled: bool) -> void:
	if index >= 0 and index < _tabs_data.size():
		_tabs_data[index]["disabled"] = is_disabled
		_rebuild_ui()

## 查询选项卡是否被禁用
func is_tab_disabled(index: int) -> bool:
	if index >= 0 and index < _tabs_data.size():
		return _tabs_data[index].get("disabled", false)
	return false

## 设置指定选项卡图标
func set_tab_icon(index: int, icon: Texture2D) -> void:
	if index >= 0 and index < _tabs_data.size():
		_tabs_data[index]["icon"] = icon
		_rebuild_ui()

## 根据名称查找选项卡索引
func find_tab_by_name(tab_name: String) -> int:
	for i in range(_tabs_data.size()):
		if _tabs_data[i]["name"] == tab_name:
			return i
	return -1

## 切换至下一标签
func next_tab() -> void:
	if _tabs_data.is_empty(): return
	var next_idx = (current_tab + 1) % _tabs_data.size()
	current_tab = next_idx

## 切换至上一标签
func prev_tab() -> void:
	if _tabs_data.is_empty(): return
	var prev_idx = (current_tab - 1 + _tabs_data.size()) % _tabs_data.size()
	current_tab = prev_idx

## 设置切换前拦截钩子
func set_before_leave(callback: Callable) -> void:
	before_leave = callback

# ==========================================
# 内部 UI 构建与同步逻辑
# ==========================================
func _rebuild_ui() -> void:
	if not _tab_bar_box: return
	for child in _tab_bar_box.get_children():
		child.queue_free()
		
	for i in range(_tabs_data.size()):
		var data = _tabs_data[i]
		var tab_btn = _create_tab_button(i, data)
		_tab_bar_box.add_child(tab_btn)
		
	if addable:
		_add_button = GButton.new()
		_add_button.text = "+"
		_add_button.button_type = GButton.ButtonType.DEFAULT
		_add_button.pressed.connect(func(): tab_added.emit(_tabs_data.size(), "New Tab"))
		_tab_bar_box.add_child(_add_button)
		
	_sync_tab_selection()

func _create_tab_button(idx: int, data: Dictionary) -> Control:
	var tab_container = HBoxContainer.new()
	tab_container.add_theme_constant_override("separation", 6)
	
	var btn = GButton.new()
	btn.text = data["name"]
	btn.button_type = GButton.ButtonType.PRIMARY if idx == current_tab else GButton.ButtonType.DEFAULT
	btn.variant = GButton.Variant.TEXT if type == TabType.LINE else GButton.Variant.SOLID
	btn.disabled = data.get("disabled", false)
	if data.get("icon"):
		btn.icon = data["icon"]
	if stretch:
		btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		
	btn.pressed.connect(func():
		current_tab = idx
		tab_clicked.emit(idx, data["name"])
	)
	tab_container.add_child(btn)
	
	if data.get("closable"):
		var close_btn = Button.new()
		close_btn.text = "×"
		close_btn.flat = true
		close_btn.pressed.connect(func():
			tab_close_requested.emit(idx, data["name"])
			remove_tab(idx)
		)
		tab_container.add_child(close_btn)
		
	return tab_container

func _sync_tab_selection() -> void:
	if not _tab_bar_box: return
	var btn_idx = 0
	for child in _tab_bar_box.get_children():
		if child is HBoxContainer:
			var btn = child.get_child(0) as GButton
			if btn:
				if btn_idx == current_tab:
					btn.button_type = GButton.ButtonType.PRIMARY
				else:
					btn.button_type = GButton.ButtonType.DEFAULT
			btn_idx += 1
			
	if _content_stack:
		for i in range(_tabs_data.size()):
			var panel = _tabs_data[i]["panel"] as Control
			if panel and is_instance_valid(panel):
				panel.visible = (i == current_tab)
