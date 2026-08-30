# GActionSheet - Godot 4.x Vant UI Style Universal ActionSheet Component
# 动作面板 (从页面底部弹出的模态操作菜单，用于提供一组与当前上下文相关的备选操作或退出确认)
class_name GActionSheet
extends Control

signal select(item: Dictionary, index: int)
signal cancel()
signal opened()
signal closed()

@export var title: String = ""
@export var description: String = ""
@export var cancel_text: String = "取消"
@export var actions: Array[Dictionary] = [] # [{ name: "选项", subname: "描述", color: Color(), disabled: false, loading: false }]
@export var close_on_click_action: bool = true
@export var round_corner: bool = true

var _mask: ColorRect
var _panel: PanelContainer
var _vbox: VBoxContainer

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	visible = false

func add_action(name: String, subname: String = "", is_danger: bool = false, is_disabled: bool = false) -> void:
	actions.append({
		"name": name,
		"subname": subname,
		"danger": is_danger,
		"disabled": is_disabled
	})

func add_actions(action_list: Array) -> void:
	for act in action_list:
		if act is Dictionary:
			actions.append(act)
		elif act is String:
			actions.append({ "name": act })

func open() -> void:
	_build_ui()
	visible = true
	opened.emit()

func close() -> void:
	visible = false
	closed.emit()

func _build_ui() -> void:
	for child in get_children():
		child.queue_free()

	_mask = ColorRect.new()
	_mask.anchors_preset = Control.PRESET_FULL_RECT
	_mask.color = Color(0, 0, 0, 0.5)
	_mask.mouse_filter = Control.MOUSE_FILTER_STOP
	_mask.gui_input.connect(func(event):
		if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
			close()
			cancel.emit()
	)
	add_child(_mask)

	_panel = PanelContainer.new()
	_panel.anchors_preset = Control.PRESET_BOTTOM_WIDE
	_panel.position.y = -260
	_panel.custom_minimum_size = Vector2(0, 240)
	var sb = StyleBoxFlat.new()
	sb.bg_color = Color(0.10, 0.12, 0.18, 0.98)
	sb.set_corner_radius_all(14 if round_corner else 0)
	sb.content_margin_left = 16
	sb.content_margin_right = 16
	sb.content_margin_top = 16
	sb.content_margin_bottom = 16
	_panel.add_theme_stylebox_override("panel", sb)
	add_child(_panel)

	_vbox = VBoxContainer.new()
	_vbox.add_theme_constant_override("separation", 8)
	_panel.add_child(_vbox)

	if not title.is_empty():
		var t_lbl = Label.new()
		t_lbl.text = title
		t_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		t_lbl.add_theme_font_size_override("font_size", 16)
		t_lbl.add_theme_color_override("font_color", Color("f0f0f5"))
		_vbox.add_child(t_lbl)

	if not description.is_empty():
		var d_lbl = Label.new()
		d_lbl.text = description
		d_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		d_lbl.add_theme_font_size_override("font_size", 12)
		d_lbl.add_theme_color_override("font_color", Color("8a8a9e"))
		_vbox.add_child(d_lbl)

	for i in range(actions.size()):
		var act = actions[i]
		var btn = Button.new()
		btn.text = act.get("name", "")
		if act.get("danger", false):
			btn.add_theme_color_override("font_color", Color("e04050"))
		btn.disabled = act.get("disabled", false)
		var idx = i
		btn.pressed.connect(func():
			select.emit(act, idx)
			if close_on_click_action:
				close()
		)
		_vbox.add_child(btn)

	var cancel_btn = Button.new()
	cancel_btn.text = cancel_text
	cancel_btn.pressed.connect(func():
		close()
		cancel.emit()
	)
	_vbox.add_child(cancel_btn)
