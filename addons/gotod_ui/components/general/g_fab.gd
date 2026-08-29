# GFab - Godot 4.x Vue/Uni-UI Style Expandable Floating Action Button
# 悬浮操作按钮 (支持水平/垂直展开动画与多子项菜单)
class_name GFab
extends Control

signal item_clicked(index: int, item_name: String)
signal expanded_changed(is_expanded: bool)

enum Direction {
	HORIZONTAL, # 水平展开（默认向左展开）
	VERTICAL    # 垂直展开（向上展开）
}

enum Position {
	BOTTOM_RIGHT,
	BOTTOM_LEFT,
	TOP_RIGHT,
	TOP_LEFT
}

@export var direction: Direction = Direction.HORIZONTAL
@export var fab_position: Position = Position.BOTTOM_RIGHT
@export var main_icon: Texture2D
@export var auto_collapse_on_click: bool = true
@export var expand_duration: float = 0.25

var is_expanded: bool = false
var items: Array[Dictionary] = []

var _trigger_btn: Button
var _menu_container: BoxContainer
var _tween: Tween

func _ready() -> void:
	_setup_layout()
	_apply_fab_position()

func _setup_layout() -> void:
	custom_minimum_size = Vector2(56, 56)
	
	# Menu Container for child actions
	if direction == Direction.HORIZONTAL:
		_menu_container = HBoxContainer.new()
		_menu_container.alignment = BoxContainer.ALIGNMENT_END
	else:
		_menu_container = VBoxContainer.new()
		_menu_container.alignment = BoxContainer.ALIGNMENT_END
	
	_menu_container.add_theme_constant_override("separation", 8)
	_menu_container.modulate.a = 0.0
	_menu_container.visible = false
	add_child(_menu_container)
	
	# Main Trigger Circular FAB Button
	_trigger_btn = Button.new()
	_trigger_btn.custom_minimum_size = Vector2(48, 48)
	_trigger_btn.icon = main_icon
	_trigger_btn.text = "+" if main_icon == null else ""
	_trigger_btn.pressed.connect(toggle)
	add_child(_trigger_btn)

func _apply_fab_position() -> void:
	set_anchors_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE
	_trigger_btn.mouse_filter = MOUSE_FILTER_STOP

func add_action(item_name: String, label: String = "", icon: Texture2D = null) -> void:
	var item_data = {
		"name": item_name,
		"label": label if label != "" else item_name,
		"icon": icon
	}
	items.append(item_data)
	_rebuild_menu()

func add_actions(action_list: Array) -> void:
	for act in action_list:
		if act is Dictionary:
			var item_data = {
				"name": act.get("name", act.get("id", act.get("key", ""))),
				"label": act.get("label", act.get("text", act.get("name", ""))),
				"icon": act.get("icon", null)
			}
			items.append(item_data)
	_rebuild_menu()

func _rebuild_menu() -> void:
	for child in _menu_container.get_children():
		child.queue_free()
	
	for i in range(items.size()):
		var data = items[i]
		var sub_btn = Button.new()
		sub_btn.text = data.get("label", "")
		sub_btn.icon = data.get("icon", null)
		var item_idx = i
		var item_key = data.get("name", "")
		sub_btn.pressed.connect(func(): _on_sub_btn_pressed(item_idx, item_key))
		_menu_container.add_child(sub_btn)

func _on_sub_btn_pressed(idx: int, item_name: String) -> void:
	item_clicked.emit(idx, item_name)
	if auto_collapse_on_click:
		collapse()

func toggle() -> void:
	if is_expanded:
		collapse()
	else:
		expand()

func expand() -> void:
	if is_expanded:
		return
	is_expanded = true
	_menu_container.visible = true
	
	if _tween and _tween.is_running():
		_tween.kill()
	_tween = create_tween().set_parallel(true).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	_tween.tween_property(_menu_container, "modulate:a", 1.0, expand_duration)
	_tween.tween_property(_trigger_btn, "rotation_degrees", 45.0, expand_duration)
	expanded_changed.emit(true)

func collapse() -> void:
	if not is_expanded:
		return
	is_expanded = false
	
	if _tween and _tween.is_running():
		_tween.kill()
	_tween = create_tween().set_parallel(true).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	_tween.tween_property(_menu_container, "modulate:a", 0.0, expand_duration)
	_tween.tween_property(_trigger_btn, "rotation_degrees", 0.0, expand_duration)
	_tween.chain().tween_callback(func(): _menu_container.visible = false)
	expanded_changed.emit(false)
