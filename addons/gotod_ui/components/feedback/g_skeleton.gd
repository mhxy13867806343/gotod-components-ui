# GSkeleton - Godot 4.x Vant UI / Vue Style Universal Skeleton Component
# 骨架屏组件 (在页面数据加载完成前，先展示出页面的大致结构与占位图，支持头像、标题、段落行数与流光动画)
class_name GSkeleton
extends Control

signal loading_changed(is_loading: bool)

enum AvatarShape {
	ROUND,
	SQUARE
}

@export var loading: bool = true:
	set(val):
		loading = val
		_update_visibility()
		loading_changed.emit(loading)

@export var avatar: bool = false
@export_enum("ROUND", "SQUARE") var avatar_shape: int = AvatarShape.ROUND
@export var avatar_size: float = 40.0
@export var show_title: bool = true
@export var title_width: float = 40.0 # 百分比 %
@export var rows: int = 3
@export var row_width: Array[float] = [100.0, 100.0, 60.0]
@export var animate: bool = true

var _skeleton_container: HBoxContainer
var _content_container: Control
var _tween: Tween

func _ready() -> void:
	_setup_nodes()
	_update_visibility()

func _setup_nodes() -> void:
	_skeleton_container = HBoxContainer.new()
	_skeleton_container.add_theme_constant_override("separation", 12)
	_skeleton_container.set_anchors_preset(PRESET_FULL_RECT)
	add_child(_skeleton_container)

	# 1. Avatar Placeholder
	if avatar:
		var av = ColorRect.new()
		av.custom_minimum_size = Vector2(avatar_size, avatar_size)
		av.color = Color(0.2, 0.2, 0.25, 0.6)
		_skeleton_container.add_child(av)

	# 2. Right Content Rows
	var right_box = VBoxContainer.new()
	right_box.size_flags_horizontal = SIZE_EXPAND_FILL
	right_box.add_theme_constant_override("separation", 10)
	_skeleton_container.add_child(right_box)

	if show_title:
		var title_bar = ColorRect.new()
		title_bar.custom_minimum_size = Vector2(0, 16)
		title_bar.size_flags_horizontal = SIZE_FILL
		title_bar.color = Color(0.2, 0.2, 0.25, 0.6)
		right_box.add_child(title_bar)

	for i in range(rows):
		var row_bar = ColorRect.new()
		row_bar.custom_minimum_size = Vector2(0, 14)
		row_bar.size_flags_horizontal = SIZE_FILL
		row_bar.color = Color(0.18, 0.18, 0.22, 0.5)
		right_box.add_child(row_bar)

func set_content(node: Control) -> void:
	_content_container = node
	add_child(node)
	_update_visibility()

func _update_visibility() -> void:
	if _skeleton_container:
		_skeleton_container.visible = loading
	if _content_container:
		_content_container.visible = not loading
