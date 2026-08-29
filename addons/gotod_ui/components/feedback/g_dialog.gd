@tool
class_name GDialog
extends Control

signal confirmed
signal cancelled
signal closed

@export var title: String = "Dialog Title":
	set(val):
		title = val
		if _title_label: _title_label.text = title

@export var content_text: String = "Are you sure you want to proceed with this operation?":
	set(val):
		content_text = val
		if _body_label: _body_label.text = content_text

@export var confirm_button_text: String = "Confirm"
@export var cancel_button_text: String = "Cancel"
@export var show_cancel_button: bool = true
@export var mask_closable: bool = true
@export var dialog_width: float = 460.0

var _mask: ColorRect
var _panel: PanelContainer
var _title_label: Label
var _body_label: Label
var _confirm_btn: GButton
var _cancel_btn: GButton

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	_setup_ui()
	visible = false

func _setup_ui() -> void:
	for child in get_children():
		child.queue_free()
		
	# Backdrop Mask
	_mask = ColorRect.new()
	_mask.anchors_preset = Control.PRESET_FULL_RECT
	_mask.color = Color(0, 0, 0, 0.6)
	_mask.gui_input.connect(_on_mask_input)
	add_child(_mask)
	
	# Modal Box
	_panel = PanelContainer.new()
	_panel.custom_minimum_size = Vector2(dialog_width, 0)
	_panel.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	_panel.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	
	# Center anchor
	_panel.anchor_left = 0.5
	_panel.anchor_top = 0.5
	_panel.anchor_right = 0.5
	_panel.anchor_bottom = 0.5
	_panel.grow_horizontal = Control.GROW_DIRECTION_BOTH
	_panel.grow_vertical = Control.GROW_DIRECTION_BOTH
	
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 16)
	_panel.add_child(vbox)
	
	# Header
	var header = HBoxContainer.new()
	_title_label = Label.new()
	_title_label.text = title
	_title_label.add_theme_font_size_override("font_size", 18)
	_title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	header.add_child(_title_label)
	
	var close_btn = Button.new()
	close_btn.text = "×"
	close_btn.flat = true
	close_btn.focus_mode = Control.FOCUS_NONE
	close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	close_btn.pressed.connect(close)
	header.add_child(close_btn)
	vbox.add_child(header)
	
	# Body
	_body_label = Label.new()
	_body_label.text = content_text
	_body_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	vbox.add_child(_body_label)
	
	# Footer
	var footer = HBoxContainer.new()
	footer.alignment = BoxContainer.ALIGNMENT_END
	footer.add_theme_constant_override("separation", 12)
	
	if show_cancel_button:
		_cancel_btn = GButton.new()
		_cancel_btn.text = cancel_button_text
		_cancel_btn.button_type = GButton.ButtonType.DEFAULT
		_cancel_btn.pressed.connect(_on_cancel)
		footer.add_child(_cancel_btn)
		
	_confirm_btn = GButton.new()
	_confirm_btn.text = confirm_button_text
	_confirm_btn.button_type = GButton.ButtonType.PRIMARY
	_confirm_btn.pressed.connect(_on_confirm)
	footer.add_child(_confirm_btn)
	
	vbox.add_child(footer)
	add_child(_panel)
	
	_update_styles()

func _update_styles() -> void:
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 10.0, 20.0, 20.0, Color(0, 0, 0, 0.4), 16)
	_panel.add_theme_stylebox_override("panel", sb)

func open() -> void:
	visible = true
	_panel.pivot_offset = _panel.size / 2.0
	_panel.scale = Vector2(0.9, 0.9)
	_mask.modulate.a = 0.0
	_panel.modulate.a = 0.0
	
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	tw.tween_property(_panel, "scale", Vector2.ONE, 0.25)
	tw.tween_property(_panel, "modulate:a", 1.0, 0.2)
	tw.tween_property(_mask, "modulate:a", 1.0, 0.2)

func close() -> void:
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	tw.tween_property(_panel, "scale", Vector2(0.95, 0.95), 0.15)
	tw.tween_property(_panel, "modulate:a", 0.0, 0.15)
	tw.tween_property(_mask, "modulate:a", 0.0, 0.15)
	await tw.finished
	visible = false
	closed.emit()

func _on_confirm() -> void:
	confirmed.emit()
	close()

func _on_cancel() -> void:
	cancelled.emit()
	close()

func _on_mask_input(event: InputEvent) -> void:
	if mask_closable and event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		close()
