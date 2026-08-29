@tool
class_name GTabs
extends BoxContainer

signal tab_clicked(index: int, name: String)
signal tab_changed(index: int, name: String)
signal tab_removed(name: String)
signal tab_added()

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
			if before_leave.is_valid() and not before_leave.call(current_tab, val):
				return
			current_tab = val
			_sync_tab_selection()
			var name = get_tab_name(current_tab)
			tab_changed.emit(current_tab, name)

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
var _divider: Control
var _add_button: GButton
var _tabs_data: Array[Dictionary] = [] # [{"name": "", "panel": Control, "closable": bool, "icon": Texture2D}]

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

func add_tab(tab_name: String, panel_content: Control, is_closable: bool = false, icon: Texture2D = null) -> void:
	_tabs_data.append({
		"name": tab_name,
		"panel": panel_content,
		"closable": is_closable or closable,
		"icon": icon
	})
	_content_stack.add_child(panel_content)
	_rebuild_ui()
	tab_added.emit()

func remove_tab(tab_index: int) -> void:
	if tab_index < 0 or tab_index >= _tabs_data.size(): return
	var removed = _tabs_data[tab_index]
	_tabs_data.remove_at(tab_index)
	if removed["panel"] and is_instance_valid(removed["panel"]):
		removed["panel"].queue_free()
		
	if current_tab >= _tabs_data.size():
		current_tab = max(0, _tabs_data.size() - 1)
	_rebuild_ui()
	tab_removed.emit(removed["name"])

func get_tab_name(index: int) -> String:
	if index >= 0 and index < _tabs_data.size():
		return _tabs_data[index]["name"]
	return ""

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
		_add_button.pressed.connect(func(): tab_added.emit())
		_tab_bar_box.add_child(_add_button)
		
	_sync_tab_selection()

func _create_tab_button(idx: int, data: Dictionary) -> Control:
	var tab_container = HBoxContainer.new()
	tab_container.add_theme_constant_override("separation", 6)
	
	var btn = GButton.new()
	btn.text = data["name"]
	btn.button_type = GButton.ButtonType.PRIMARY if idx == current_tab else GButton.ButtonType.DEFAULT
	btn.variant = GButton.Variant.TEXT if type == TabType.LINE else GButton.Variant.SOLID
	if data["icon"]:
		btn.icon = data["icon"]
	if stretch:
		btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		
	btn.pressed.connect(func():
		current_tab = idx
		tab_clicked.emit(idx, data["name"])
	)
	tab_container.add_child(btn)
	
	if data["closable"]:
		var close_btn = Button.new()
		close_btn.text = "×"
		close_btn.flat = true
		close_btn.pressed.connect(func(): remove_tab(idx))
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
