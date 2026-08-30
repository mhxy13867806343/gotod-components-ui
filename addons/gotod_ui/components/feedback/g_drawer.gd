@tool
class_name GDrawer
extends Control

signal closed
signal opened

enum Placement {
	RIGHT,
	LEFT,
	TOP,
	BOTTOM
}

@export var title: String = "Drawer Title":
	set(val):
		title = val
		if _title_lbl: _title_lbl.text = title

@export_enum("RIGHT", "LEFT", "TOP", "BOTTOM") var placement: int = Placement.RIGHT
@export var drawer_size: float = 360.0
@export var mask_closable: bool = true

var _mask: ColorRect
var _panel: PanelContainer
var _title_lbl: Label
var _content_box: VBoxContainer

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	_setup_ui()
	visible = false

func _setup_ui() -> void:
	for child in get_children():
		child.queue_free()
		
	_mask = ColorRect.new()
	_mask.anchors_preset = Control.PRESET_FULL_RECT
	_mask.color = Color(0, 0, 0, 0.5)
	_mask.gui_input.connect(_on_mask_input)
	add_child(_mask)
	
	_panel = PanelContainer.new()
	add_child(_panel)
	
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 16)
	_panel.add_child(vbox)
	
	var header = HBoxContainer.new()
	_title_lbl = Label.new()
	_title_lbl.text = title
	_title_lbl.add_theme_font_size_override("font_size", 16)
	_title_lbl.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	header.add_child(_title_lbl)
	
	var close_btn = Button.new()
	close_btn.text = "×"
	close_btn.flat = true
	close_btn.focus_mode = Control.FOCUS_NONE
	close_btn.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	close_btn.pressed.connect(close)
	header.add_child(close_btn)
	vbox.add_child(header)
	
	_content_box = VBoxContainer.new()
	_content_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_box.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_child(_content_box)
	
	_update_styles()

func get_content_box() -> VBoxContainer:
	if not _content_box:
		_setup_ui()
	return _content_box

func _update_styles() -> void:
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 0.0, 16.0, 16.0, Color(0, 0, 0, 0.35), 12)
	_panel.add_theme_stylebox_override("panel", sb)

func open() -> void:
	visible = true
	_update_panel_anchors_initial()
	
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
	tw.tween_property(_mask, "modulate:a", 1.0, 0.25)
	
	match placement:
		Placement.RIGHT:
			tw.tween_property(_panel, "position:x", size.x - drawer_size, 0.25)
		Placement.LEFT:
			tw.tween_property(_panel, "position:x", 0.0, 0.25)
		Placement.TOP:
			tw.tween_property(_panel, "position:y", 0.0, 0.25)
		Placement.BOTTOM:
			tw.tween_property(_panel, "position:y", size.y - drawer_size, 0.25)
			
	await tw.finished
	opened.emit()

func close() -> void:
	var tw = create_tween().set_parallel(true).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	tw.tween_property(_mask, "modulate:a", 0.0, 0.2)
	
	match placement:
		Placement.RIGHT:
			tw.tween_property(_panel, "position:x", size.x, 0.2)
		Placement.LEFT:
			tw.tween_property(_panel, "position:x", -drawer_size, 0.2)
		Placement.TOP:
			tw.tween_property(_panel, "position:y", -drawer_size, 0.2)
		Placement.BOTTOM:
			tw.tween_property(_panel, "position:y", size.y, 0.2)
			
	await tw.finished
	visible = false
	closed.emit()

func _update_panel_anchors_initial() -> void:
	_mask.modulate.a = 0.0
	match placement:
		Placement.RIGHT:
			_panel.size = Vector2(drawer_size, size.y)
			_panel.position = Vector2(size.x, 0)
		Placement.LEFT:
			_panel.size = Vector2(drawer_size, size.y)
			_panel.position = Vector2(-drawer_size, 0)
		Placement.TOP:
			_panel.size = Vector2(size.x, drawer_size)
			_panel.position = Vector2(0, -drawer_size)
		Placement.BOTTOM:
			_panel.size = Vector2(size.x, drawer_size)
			_panel.position = Vector2(0, size.y)

func _on_mask_input(event: InputEvent) -> void:
	if mask_closable and event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		close()
