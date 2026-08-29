@tool
class_name GInteractPrompt
extends Control

## =========================================================================
## GInteractPrompt: NPC/世界实体头顶交互提示按键 (Floating Key Prompt)
## 在 2D/3D NPC 或可交互物体头顶悬浮按键徽章 (如 [ R ], [ E ], [ A ], [ 💬 ])
## 支持目标节点世界坐标自动跟随、进入范围弹跳出现与按键触发对话。
## =========================================================================

signal triggered()

@export var key_text: String = "R":
	set(val):
		key_text = val
		if _label:
			_label.text = key_text

@export var target_node: Node2D = null
@export var offset: Vector2 = Vector2(0, -45)
@export var action_key: Key = KEY_R

var _circle_panel: PanelContainer
var _label: Label
var _tween: Tween

func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_PASS
	
	_circle_panel = PanelContainer.new()
	var sb = StyleBoxFlat.new()
	sb.bg_color = Color(0.08, 0.08, 0.1, 0.92) # Dark circular badge
	sb.border_color = Color(1.0, 1.0, 1.0, 0.85)
	sb.set_border_width_all(2)
	sb.set_corner_radius_all(14)
	sb.custom_minimum_size = Vector2(28, 28)
	_circle_panel.add_theme_stylebox_override("panel", sb)
	
	_label = Label.new()
	_label.text = key_text
	_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	_label.add_theme_font_size_override("font_size", 13)
	_label.add_theme_color_override("font_color", Color.WHITE)
	_circle_panel.add_child(_label)
	
	add_child(_circle_panel)
	_circle_panel.position = -_circle_panel.custom_minimum_size / 2.0
	
	_play_hover_bobbing()

func _process(_delta: float) -> void:
	if target_node and is_instance_valid(target_node):
		var screen_pos = target_node.get_global_transform_with_canvas().origin + offset
		global_position = screen_pos

func _unhandled_input(event: InputEvent) -> void:
	if not visible:
		return
	if event is InputEventKey and event.pressed and event.keycode == action_key:
		triggered.emit()

func _play_hover_bobbing() -> void:
	if _tween and _tween.is_valid():
		_tween.kill()
	_tween = create_tween().set_loops()
	_tween.tween_property(_circle_panel, "position:y", -_circle_panel.custom_minimum_size.y / 2.0 - 4.0, 0.45).set_trans(Tween.TRANS_SINE)
	_tween.tween_property(_circle_panel, "position:y", -_circle_panel.custom_minimum_size.y / 2.0 + 2.0, 0.45).set_trans(Tween.TRANS_SINE)

## 静态快捷绑定：为任意 NPC 创建头顶 [ R ] 交互按键
static func attach_to(npc: Node2D, key: String = "R", on_interact: Callable = Callable()) -> GInteractPrompt:
	var prompt = GInteractPrompt.new()
	prompt.key_text = key
	prompt.target_node = npc
	if on_interact.is_valid():
		prompt.triggered.connect(on_interact)
	npc.get_tree().root.add_child(prompt)
	return prompt
