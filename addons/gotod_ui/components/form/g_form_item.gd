@tool
class_name GFormItem
extends BoxContainer

enum LabelPosition {
	LEFT,
	TOP,
	RIGHT
}

@export var label: String = "Field Label":
	set(val):
		label = val
		_update_label()

@export var required: bool = false:
	set(val):
		required = val
		_update_label()

@export_enum("LEFT", "TOP", "RIGHT") var label_position: int = LabelPosition.LEFT:
	set(val):
		label_position = val
		vertical = (label_position == LabelPosition.TOP)
		if is_node_ready():
			_update_layout()

@export var label_width: float = 100.0:
	set(val):
		label_width = val
		_update_layout()

@export var error_message: String = "":
	set(val):
		error_message = val
		_update_error()

var _label_node: Label
var _content_box: VBoxContainer
var _error_node: Label

func _ready() -> void:
	add_theme_constant_override("separation", 10)
	_setup_structure()
	_update_label()
	_update_layout()
	_update_error()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_update_theme)

func _setup_structure() -> void:
	if _label_node: return
	
	_label_node = Label.new()
	_label_node.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	add_child(_label_node)
	move_child(_label_node, 0)
	
	_content_box = VBoxContainer.new()
	_content_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_box.add_theme_constant_override("separation", 4)
	add_child(_content_box)
	
	_error_node = Label.new()
	_error_node.add_theme_font_size_override("font_size", 12)
	_error_node.visible = false
	_content_box.add_child(_error_node)

func _update_label() -> void:
	if not _label_node: return
	if required:
		_label_node.text = "* " + label
	else:
		_label_node.text = label

func _update_layout() -> void:
	if not _label_node: return
	if label_position == LabelPosition.TOP:
		vertical = true
		_label_node.custom_minimum_size = Vector2(0, 20)
		_label_node.horizontal_alignment = HORIZONTAL_ALIGNMENT_LEFT
	else:
		vertical = false
		_label_node.custom_minimum_size = Vector2(label_width, 32)
		if label_position == LabelPosition.RIGHT:
			_label_node.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
		else:
			_label_node.horizontal_alignment = HORIZONTAL_ALIGNMENT_LEFT

func _update_error() -> void:
	if not _error_node: return
	if error_message.is_empty():
		_error_node.visible = false
	else:
		_error_node.text = error_message
		_error_node.visible = true
		_error_node.add_theme_color_override("font_color", GotodTheme.get_color("danger", Color.RED))

func _update_theme() -> void:
	if _label_node:
		_label_node.add_theme_color_override("font_color", GotodTheme.get_color("text_regular"))
	_update_error()
