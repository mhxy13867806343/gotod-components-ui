@tool
class_name GTextarea
extends PanelContainer

signal text_changed

@export_multiline var text: String = "":
	set(val):
		text = val
		if _text_edit and _text_edit.text != val:
			_text_edit.text = val
		_update_word_count()

@export var placeholder_text: String = "Please input multi-line content...":
	set(val):
		placeholder_text = val
		if _text_edit:
			_text_edit.placeholder_text = placeholder_text

@export var show_word_limit: bool = true:
	set(val):
		show_word_limit = val
		_update_word_count()

@export var max_length: int = 200:
	set(val):
		max_length = val
		_update_word_count()

@export var rows: int = 4:
	set(val):
		rows = val
		custom_minimum_size.y = rows * 24.0

var _vbox: VBoxContainer
var _text_edit: TextEdit
var _count_label: Label
var _is_focused: bool = false

func _ready() -> void:
	_setup_children()
	_update_styles()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_styles)

func _setup_children() -> void:
	for child in get_children():
		child.queue_free()
		
	_vbox = VBoxContainer.new()
	add_child(_vbox)
	
	_text_edit = TextEdit.new()
	_text_edit.text = text
	_text_edit.placeholder_text = placeholder_text
	_text_edit.wrap_mode = TextEdit.LINE_WRAPPING_BOUNDARY
	_text_edit.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_text_edit.size_flags_vertical = Control.SIZE_EXPAND_FILL
	
	var empty_sb = StyleBoxEmpty.new()
	_text_edit.add_theme_stylebox_override("normal", empty_sb)
	_text_edit.add_theme_stylebox_override("focus", empty_sb)
	
	_text_edit.text_changed.connect(_on_text_changed)
	_text_edit.focus_entered.connect(_on_focus_entered)
	_text_edit.focus_exited.connect(_on_focus_exited)
	_vbox.add_child(_text_edit)
	
	_count_label = Label.new()
	_count_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	_count_label.add_theme_font_size_override("font_size", 11)
	_count_label.visible = show_word_limit
	_vbox.add_child(_count_label)
	_update_word_count()

func _on_text_changed() -> void:
	text = _text_edit.text
	_update_word_count()
	text_changed.emit()

func _on_focus_entered() -> void:
	_is_focused = true
	_update_styles()

func _on_focus_exited() -> void:
	_is_focused = false
	_update_styles()

func _update_word_count() -> void:
	if _count_label:
		_count_label.visible = show_word_limit
		_count_label.text = "%d / %d" % [text.length(), max_length]
		if text.length() > max_length:
			_count_label.add_theme_color_override("font_color", GotodTheme.get_color("danger", Color.RED))
		else:
			_count_label.add_theme_color_override("font_color", GotodTheme.get_color("text_secondary"))

func _update_styles() -> void:
	custom_minimum_size.y = max(80.0, rows * 24.0)
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	if _is_focused:
		border_col = GotodTheme.get_color("primary", Color("#18a058"))
		
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 6.0, 10.0, 8.0)
	add_theme_stylebox_override("panel", sb)
