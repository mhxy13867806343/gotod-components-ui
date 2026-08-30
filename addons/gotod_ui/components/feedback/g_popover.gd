# GPopover - Godot 4.x Vant UI / Vue Style Universal Popover Component
# 气泡弹出框 (基于目标节点相对定位的气泡菜单，支持上/下/左/右多方向、暗黑/明亮主题与菜单列表)
class_name GPopover
extends Control

signal opened()
signal closed()
signal item_selected(index: int, action: Dictionary)

enum Placement {
	TOP,
	BOTTOM,
	LEFT,
	RIGHT
}

enum Theme {
	DARK,
	LIGHT
}

@export_enum("TOP", "BOTTOM", "LEFT", "RIGHT") var placement: int = Placement.BOTTOM
@export_enum("DARK", "LIGHT") var theme_mode: int = Theme.DARK
@export var show_arrow: bool = true
@export var offset: Vector2 = Vector2(0, 8)
@export var actions: Array[Dictionary] = [] # [{ text: "选项1", icon: Texture2D, disabled: false }]

var _is_open: bool = false
var _target_node: Control
var _bubble_panel: PanelContainer

func _ready() -> void:
	visible = false

func add_action(text: String, icon: Texture2D = null, is_disabled: bool = false) -> void:
	actions.append({
		"text": text,
		"icon": icon,
		"disabled": is_disabled
	})

func add_actions(action_list: Array) -> void:
	for act in action_list:
		if act is Dictionary:
			actions.append(act)
		elif act is String:
			actions.append({ "text": act })

func open_for_node(target: Control) -> void:
	_target_node = target
	_is_open = true
	visible = true
	_update_layout()
	opened.emit()

func close() -> void:
	if not _is_open:
		return
	_is_open = false
	visible = false
	closed.emit()

func toggle_for_node(target: Control) -> void:
	if _is_open:
		close()
	else:
		open_for_node(target)

func _update_layout() -> void:
	if not _target_node:
		return
	var target_rect = _target_node.get_global_rect()
	match placement:
		Placement.BOTTOM:
			global_position = Vector2(target_rect.position.x + target_rect.size.x / 2 - size.x / 2, target_rect.end.y + offset.y)
		Placement.TOP:
			global_position = Vector2(target_rect.position.x + target_rect.size.x / 2 - size.x / 2, target_rect.position.y - size.y - offset.y)
		Placement.LEFT:
			global_position = Vector2(target_rect.position.x - size.x - offset.x, target_rect.position.y + target_rect.size.y / 2 - size.y / 2)
		Placement.RIGHT:
			global_position = Vector2(target_rect.end.x + offset.x, target_rect.position.y + target_rect.size.y / 2 - size.y / 2)
