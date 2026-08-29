@tool
class_name GTabs
extends VBoxContainer

signal tab_changed(index: int)

enum TabType {
	LINE,
	CARD,
	SEGMENT
}

@export var type: TabType = TabType.LINE:
	set(val):
		type = val
		_rebuild_tab_headers()

@export var current_tab: int = 0:
	set(val):
		current_tab = val
		_sync_tab_selection()
		tab_changed.emit(current_tab)

var _tab_bar_box: HBoxContainer
var _content_stack: Control

func _ready() -> void:
	_setup_structure()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_rebuild_tab_headers)

func _setup_structure() -> void:
	if _tab_bar_box: return
	
	_tab_bar_box = HBoxContainer.new()
	_tab_bar_box.add_theme_constant_override("separation", 8)
	add_child(_tab_bar_box)
	move_child(_tab_bar_box, 0)
	
	var div = GDivider.new()
	add_child(div)
	move_child(div, 1)
	
	_content_stack = Control.new()
	_content_stack.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_stack.size_flags_vertical = Control.SIZE_EXPAND_FILL
	add_child(_content_stack)
	
	_rebuild_tab_headers()

func add_tab(tab_name: String, panel_content: Control) -> void:
	var tab_idx = _tab_bar_box.get_child_count()
	var btn = GButton.new()
	btn.text = tab_name
	btn.button_type = GButton.ButtonType.DEFAULT
	btn.variant = GButton.Variant.TEXT if type == TabType.LINE else GButton.Variant.SOLID
	btn.pressed.connect(func(): current_tab = tab_idx)
	_tab_bar_box.add_child(btn)
	
	panel_content.visible = (tab_idx == current_tab)
	_content_stack.add_child(panel_content)
	_sync_tab_selection()

func _rebuild_tab_headers() -> void:
	if not _tab_bar_box: return
	_sync_tab_selection()

func _sync_tab_selection() -> void:
	if not _tab_bar_box: return
	for i in range(_tab_bar_box.get_child_count()):
		var btn = _tab_bar_box.get_child(i) as GButton
		if btn:
			if i == current_tab:
				btn.button_type = GButton.ButtonType.PRIMARY
			else:
				btn.button_type = GButton.ButtonType.DEFAULT
				
	if _content_stack:
		for i in range(_content_stack.get_child_count()):
			var child = _content_stack.get_child(i) as Control
			if child:
				child.visible = (i == current_tab)
