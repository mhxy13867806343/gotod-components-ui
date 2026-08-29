# GOverlay - Godot 4.x Vant UI Style Universal Overlay Component
# 遮罩层组件 (用于强调特定的页面元素，并阻止用户进行其他操作，支持内嵌插槽与淡入淡出动效)
class_name GOverlay
extends Control

signal click()
signal opened()
signal closed()

@export var mask_color: Color = Color(0, 0, 0, 0.7)
@export var duration: float = 0.3
@export var lock_scroll: bool = true

var is_open: bool = false
var _color_rect: ColorRect
var _content_center: CenterContainer
var _tween: Tween

func _ready() -> void:
	_setup_nodes()
	visible = false

func _setup_nodes() -> void:
	set_anchors_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_STOP

	_color_rect = ColorRect.new()
	_color_rect.set_anchors_preset(PRESET_FULL_RECT)
	_color_rect.color = mask_color
	_color_rect.gui_input.connect(_on_gui_input)
	add_child(_color_rect)

	_content_center = CenterContainer.new()
	_content_center.set_anchors_preset(PRESET_FULL_RECT)
	_content_center.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(_content_center)

func set_content(node: Control) -> void:
	if _content_center:
		node.mouse_filter = MOUSE_FILTER_STOP
		_content_center.add_child(node)

func _on_gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		click.emit()

func open() -> void:
	if is_open:
		return
	is_open = true
	visible = true

	if _tween and _tween.is_running():
		_tween.kill()

	modulate.a = 0.0
	_tween = create_tween().set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	_tween.tween_property(self, "modulate:a", 1.0, duration)
	_tween.tween_callback(func(): opened.emit())

func close() -> void:
	if not is_open:
		return
	is_open = false

	if _tween and _tween.is_running():
		_tween.kill()

	_tween = create_tween().set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_IN)
	_tween.tween_property(self, "modulate:a", 0.0, duration)
	_tween.tween_callback(func():
		visible = false
		closed.emit()
	)

func toggle() -> void:
	if is_open:
		close()
	else:
		open()
