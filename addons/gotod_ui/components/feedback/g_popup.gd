# GPopup - Godot 4.x Vant UI / Vue Style Universal Popup Component
# 弹出层组件 (支持居中、顶部、底部、左侧、右侧滑出动画、圆角与遮罩点击)
class_name GPopup
extends Control

signal opened()
signal closed()
signal click_overlay()
signal click_close_icon()

enum PositionType {
	CENTER,  # 居中弹出 (缩放淡入)
	TOP,     # 顶部滑出 (从上往下滑入)
	BOTTOM,  # 底部滑出 (从下往上滑入，常见于 ActionSheet、Picker)
	LEFT,    # 左侧滑出 (从左往右滑入)
	RIGHT    # 右侧滑出 (从右往左滑入)
}

enum CloseIconPosition {
	TOP_RIGHT,
	TOP_LEFT,
	BOTTOM_RIGHT,
	BOTTOM_LEFT
}

@export_enum("CENTER", "TOP", "BOTTOM", "LEFT", "RIGHT") var position_type: int = PositionType.CENTER
@export var round_corner: bool = false
@export var closeable: bool = false
@export_enum("TOP_RIGHT", "TOP_LEFT", "BOTTOM_RIGHT", "BOTTOM_LEFT") var close_icon_position: int = CloseIconPosition.TOP_RIGHT
@export var overlay: bool = true
@export var close_on_click_overlay: bool = true
@export var duration: float = 0.3

var is_open: bool = false

var _overlay_rect: ColorRect
var _panel_container: PanelContainer
var _close_button: Button
var _content_slot: Control
var _tween: Tween

func _ready() -> void:
	_setup_nodes()
	visible = false

func _setup_nodes() -> void:
	set_anchors_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE

	# 1. Overlay Mask
	if overlay:
		_overlay_rect = ColorRect.new()
		_overlay_rect.set_anchors_preset(PRESET_FULL_RECT)
		_overlay_rect.color = Color(0, 0, 0, 0.6)
		_overlay_rect.gui_input.connect(_on_overlay_gui_input)
		add_child(_overlay_rect)

	# 2. Main Popup Panel Container
	_panel_container = PanelContainer.new()
	_panel_container.mouse_filter = MOUSE_FILTER_STOP
	add_child(_panel_container)

	# 3. Content Slot Mount
	if _content_slot and is_instance_valid(_content_slot):
		if _content_slot.get_parent() != _panel_container:
			_panel_container.add_child(_content_slot)

	# 4. Close Button
	if closeable:
		_close_button = Button.new()
		_close_button.text = "✕"
		_close_button.flat = true
		_close_button.pressed.connect(_on_close_button_pressed)
		_panel_container.add_child(_close_button)

func set_content(node: Control) -> void:
	if _content_slot and is_instance_valid(_content_slot) and _content_slot != node:
		if _panel_container and is_instance_valid(_panel_container) and _content_slot.get_parent() == _panel_container:
			_panel_container.remove_child(_content_slot)
	_content_slot = node
	if _panel_container and is_instance_valid(_panel_container) and node:
		if node.get_parent() != _panel_container:
			_panel_container.add_child(node)

## 获取内部面板容器
func get_panel_container() -> PanelContainer:
	if not _panel_container:
		_setup_nodes()
	return _panel_container

func _on_overlay_gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		click_overlay.emit()
		if close_on_click_overlay:
			close()

func _on_close_button_pressed() -> void:
	click_close_icon.emit()
	close()

func open() -> void:
	if is_open:
		return
	is_open = true
	visible = true

	if _tween and _tween.is_running():
		_tween.kill()

	_tween = create_tween().set_parallel(true).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

	# Fade overlay
	if _overlay_rect:
		_overlay_rect.modulate.a = 0.0
		_tween.tween_property(_overlay_rect, "modulate:a", 1.0, duration)

	# Animate panel by position
	_setup_initial_transform()
	_animate_open_transform()

	_tween.chain().tween_callback(func(): opened.emit())

func close() -> void:
	if not is_open:
		return
	is_open = false

	if _tween and _tween.is_running():
		_tween.kill()

	_tween = create_tween().set_parallel(true).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_IN)

	# Fade overlay
	if _overlay_rect:
		_tween.tween_property(_overlay_rect, "modulate:a", 0.0, duration)

	_animate_close_transform()

	_tween.chain().tween_callback(func():
		visible = false
		closed.emit()
	)

func toggle() -> void:
	if is_open:
		close()
	else:
		open()

func _setup_initial_transform() -> void:
	var vp_size = get_viewport_rect().size
	match position_type:
		PositionType.CENTER:
			_panel_container.set_anchors_preset(PRESET_CENTER)
			_panel_container.scale = Vector2(0.7, 0.7)
			_panel_container.modulate.a = 0.0
		PositionType.TOP:
			_panel_container.set_anchors_preset(PRESET_TOP_WIDE)
			_panel_container.position.y = -_panel_container.size.y
		PositionType.BOTTOM:
			_panel_container.set_anchors_preset(PRESET_BOTTOM_WIDE)
			_panel_container.position.y = vp_size.y
		PositionType.LEFT:
			_panel_container.set_anchors_preset(PRESET_LEFT_WIDE)
			_panel_container.position.x = -_panel_container.size.x
		PositionType.RIGHT:
			_panel_container.set_anchors_preset(PRESET_RIGHT_WIDE)
			_panel_container.position.x = vp_size.x

func _animate_open_transform() -> void:
	var vp_size = get_viewport_rect().size
	match position_type:
		PositionType.CENTER:
			_tween.tween_property(_panel_container, "scale", Vector2.ONE, duration)
			_tween.tween_property(_panel_container, "modulate:a", 1.0, duration)
		PositionType.TOP:
			_tween.tween_property(_panel_container, "position:y", 0.0, duration)
		PositionType.BOTTOM:
			var target_y = vp_size.y - _panel_container.size.y
			_tween.tween_property(_panel_container, "position:y", target_y, duration)
		PositionType.LEFT:
			_tween.tween_property(_panel_container, "position:x", 0.0, duration)
		PositionType.RIGHT:
			var target_x = vp_size.x - _panel_container.size.x
			_tween.tween_property(_panel_container, "position:x", target_x, duration)

func _animate_close_transform() -> void:
	var vp_size = get_viewport_rect().size
	match position_type:
		PositionType.CENTER:
			_tween.tween_property(_panel_container, "scale", Vector2(0.7, 0.7), duration)
			_tween.tween_property(_panel_container, "modulate:a", 0.0, duration)
		PositionType.TOP:
			_tween.tween_property(_panel_container, "position:y", -_panel_container.size.y, duration)
		PositionType.BOTTOM:
			_tween.tween_property(_panel_container, "position:y", vp_size.y, duration)
		PositionType.LEFT:
			_tween.tween_property(_panel_container, "position:x", -_panel_container.size.x, duration)
		PositionType.RIGHT:
			_tween.tween_property(_panel_container, "position:x", vp_size.x, duration)

## 静态多态构建工厂 (支持 1. 内容节点 create(content_node, pos), 2. 字典对象 create({ ... }))
static func create(arg1: Variant = null, arg2: Variant = null) -> GPopup:
	var popup = GPopup.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("position") or opts.has("placement"):
			var p = opts.get("position", opts.get("placement", PositionType.CENTER))
			if p is int: popup.position_type = p
			elif str(p).to_lower() == "top": popup.position_type = PositionType.TOP
			elif str(p).to_lower() == "bottom": popup.position_type = PositionType.BOTTOM
			elif str(p).to_lower() == "left": popup.position_type = PositionType.LEFT
			elif str(p).to_lower() == "right": popup.position_type = PositionType.RIGHT
		if opts.has("closeable") or opts.has("closable"):
			popup.closeable = bool(opts.get("closeable", opts.get("closable", false)))
		if opts.has("round_corner"): popup.round_corner = bool(opts["round_corner"])
		if opts.has("overlay"): popup.overlay = bool(opts["overlay"])
		if opts.has("close_on_click_overlay"): popup.close_on_click_overlay = bool(opts["close_on_click_overlay"])
		if opts.has("duration"): popup.duration = float(opts["duration"])
		if opts.has("content") and opts["content"] is Control:
			popup.set_content(opts["content"])
	elif arg1 is Control:
		popup.set_content(arg1)
		if arg2 != null and arg2 is int:
			popup.position_type = arg2
	return popup
