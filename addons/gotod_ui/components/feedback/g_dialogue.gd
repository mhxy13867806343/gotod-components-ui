@tool
class_name GDialogue
extends CanvasLayer

## =========================================================================
## GDialogue: 经典 JRPG 剧情对话系统 (支持 2人双向立绘对峙、分支选择支、宝箱调查触发)
## =========================================================================

signal text_completed()
signal dialogue_finished()
signal option_selected(index: int, text: String)

enum Position {
	BOTTOM,
	TOP,
	CENTER
}

static var _instance: GDialogue = null

var _box_container: PanelContainer
var _left_avatar_rect: TextureRect
var _right_avatar_rect: TextureRect
var _speaker_panel: PanelContainer
var _speaker_label: Label
var _content_label: RichTextLabel
var _next_indicator: Label
var _options_container: VBoxContainer

var _queue: Array = []
var _is_typing: bool = false
var _full_text: String = ""
var _char_index: int = 0
var _typing_speed: float = 0.03
var _typing_timer: float = 0.0
var _active_options: Array = []

func _ready() -> void:
	_instance = self
	layer = 140
	
	# Main Dialog Box
	_box_container = PanelContainer.new()
	_box_container.custom_minimum_size = Vector2(760, 150)
	_box_container.visible = false
	
	# Classical JRPG Dark Blue & Double Silver/Gold Border Theme
	var sb = StyleBoxFlat.new()
	sb.bg_color = Color(0.04, 0.12, 0.28, 0.95) # Deep navy blue
	sb.border_color = Color(0.85, 0.88, 0.95) # Silver border
	sb.set_border_width_all(3)
	sb.set_corner_radius_all(6)
	sb.set_content_margin_all(14)
	sb.shadow_color = Color(0, 0, 0, 0.6)
	sb.shadow_size = 10
	_box_container.add_theme_stylebox_override("panel", sb)
	
	var main_hbox = HBoxContainer.new()
	main_hbox.add_theme_constant_override("separation", 14)
	
	# Left Avatar portrait (e.g. Hero / Protagonist)
	_left_avatar_rect = TextureRect.new()
	_left_avatar_rect.custom_minimum_size = Vector2(88, 88)
	_left_avatar_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	_left_avatar_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	_left_avatar_rect.visible = false
	main_hbox.add_child(_left_avatar_rect)
	
	# Center Text Box Column
	var text_vbox = VBoxContainer.new()
	text_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	text_vbox.add_theme_constant_override("separation", 6)
	
	# Speaker Name Badge
	_speaker_panel = PanelContainer.new()
	var sp_sb = StyleBoxFlat.new()
	sp_sb.bg_color = Color(0.08, 0.18, 0.4, 0.9)
	sp_sb.border_color = Color(0.9, 0.75, 0.3) # Gold accent
	sp_sb.set_border_width_all(1)
	sp_sb.set_corner_radius_all(4)
	sp_sb.content_margin_left = 8
	sp_sb.content_margin_right = 8
	sp_sb.content_margin_top = 2
	sp_sb.content_margin_bottom = 2
	_speaker_panel.add_theme_stylebox_override("panel", sp_sb)
	_speaker_panel.visible = false
	
	_speaker_label = Label.new()
	_speaker_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.35))
	_speaker_label.add_theme_font_size_override("font_size", 14)
	_speaker_panel.add_child(_speaker_label)
	text_vbox.add_child(_speaker_panel)
	
	# RichText Dialog Body
	_content_label = RichTextLabel.new()
	_content_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_label.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_content_label.bbcode_enabled = true
	_content_label.fit_content = false
	_content_label.scroll_active = false
	_content_label.add_theme_font_size_override("normal_font_size", 16)
	_content_label.add_theme_color_override("default_color", Color.WHITE)
	text_vbox.add_child(_content_label)
	
	# Options container
	_options_container = VBoxContainer.new()
	_options_container.visible = false
	text_vbox.add_child(_options_container)
	
	main_hbox.add_child(text_vbox)
	
	# Right Avatar portrait (e.g. NPC / Villain / Companion)
	_right_avatar_rect = TextureRect.new()
	_right_avatar_rect.custom_minimum_size = Vector2(88, 88)
	_right_avatar_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	_right_avatar_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	_right_avatar_rect.visible = false
	main_hbox.add_child(_right_avatar_rect)
	
	# Blinking Next Indicator Arrow
	_next_indicator = Label.new()
	_next_indicator.text = "▼"
	_next_indicator.add_theme_color_override("font_color", Color(1.0, 0.85, 0.35))
	_next_indicator.add_theme_font_size_override("font_size", 14)
	_next_indicator.visible = false
	main_hbox.add_child(_next_indicator)
	
	_box_container.add_child(main_hbox)
	add_child(_box_container)
	_reposition_box(Position.BOTTOM)

func _process(delta: float) -> void:
	if _is_typing:
		_typing_timer += delta
		if _typing_timer >= _typing_speed:
			_typing_timer = 0.0
			_char_index += 1
			if _char_index <= _full_text.length():
				_content_label.text = _full_text.substr(0, _char_index)
			else:
				_finish_typing()
	elif _next_indicator.visible:
		_next_indicator.modulate.a = 0.4 + 0.6 * abs(sin(Time.get_ticks_msec() / 200.0))

func _input(event: InputEvent) -> void:
	if not _box_container.visible:
		return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		_on_dialog_clicked()
	elif event is InputEventKey and event.pressed and (event.keycode == KEY_SPACE or event.keycode == KEY_ENTER or event.keycode == KEY_Z):
		_on_dialog_clicked()

func _on_dialog_clicked() -> void:
	if _is_typing:
		_char_index = _full_text.length()
		_content_label.text = _full_text
		_finish_typing()
	elif _options_container.visible:
		pass
	else:
		_next_indicator.visible = false
		_show_next_in_queue()

func _finish_typing() -> void:
	_is_typing = false
	text_completed.emit()
	if _active_options.size() > 0:
		_render_options()
	else:
		_next_indicator.visible = true

func _render_options() -> void:
	for child in _options_container.get_children():
		child.queue_free()
	_options_container.visible = true
	_next_indicator.visible = false
	
	for i in range(_active_options.size()):
		var opt_text = _active_options[i]
		var btn = Button.new()
		btn.text = "▶  " + opt_text
		btn.alignment = HORIZONTAL_ALIGNMENT_LEFT
		var opt_idx = i
		btn.pressed.connect(func():
			option_selected.emit(opt_idx, opt_text)
			_options_container.visible = false
			_active_options.clear()
			_show_next_in_queue()
		)
		_options_container.add_child(btn)

func _reposition_box(pos: Position) -> void:
	var vp_size = get_viewport().get_visible_rect().size if get_viewport() else Vector2(1152, 648)
	var box_w = min(vp_size.x - 60, 780)
	_box_container.custom_minimum_size.x = box_w
	var x = (vp_size.x - box_w) / 2.0
	var y = vp_size.y - _box_container.custom_minimum_size.y - 24
	if pos == Position.TOP:
		y = 24
	elif pos == Position.CENTER:
		y = (vp_size.y - _box_container.custom_minimum_size.y) / 2.0
	_box_container.position = Vector2(x, y)

# ==========================================
# 静态调用 API (Static Imperative API)
# ==========================================

## 1. 播放单句或多句剧情对话
static func say(lines: Variant, speaker: String = "", avatar: Texture2D = null, position: Position = Position.BOTTOM) -> GDialogue:
	var inst = _get_or_create()
	var arr: Array[Dictionary] = []
	if lines is String:
		arr.append({ "text": lines, "speaker": speaker, "avatar": avatar, "side": "left" })
	elif lines is Array:
		for l in lines:
			if l is String:
				arr.append({ "text": l, "speaker": speaker, "avatar": avatar, "side": "left" })
			elif l is Dictionary:
				arr.append(l)
	inst.start_dialogue(arr, position)
	return inst

## 2. 两人面对面双向立绘对话 (Dual-character conversation with active speaker highlighting)
static func converse(dialogue_script: Array[Dictionary], position: Position = Position.BOTTOM) -> GDialogue:
	var inst = _get_or_create()
	inst.start_dialogue(dialogue_script, position)
	return inst

## 3. 播放带分支选择支的对话
static func ask(question: String, options: Array[String], speaker: String = "", avatar: Texture2D = null) -> GDialogue:
	var inst = _get_or_create()
	inst.start_dialogue([{
		"text": question,
		"speaker": speaker,
		"avatar": avatar,
		"options": options,
		"side": "left"
	}], Position.BOTTOM)
	return inst

## 4. 场景物件/石碑调查触发对话 (Inspection Trigger)
static func inspect(text: String, title: String = "调查发现", icon: Texture2D = null) -> GDialogue:
	return say(text, title, icon, Position.CENTER)

## 5. 宝箱开启与战利品获得触发对话 (Treasure Chest Loot Trigger)
static func loot_chest(chest_name: String, items: Array, on_opened: Callable = Callable()) -> GDialogue:
	var item_str = ", ".join(items)
	var text = "开启了【%s】！\n获得了：%s" % [chest_name, item_str]
	var inst = say(text, "宝箱开启", null, Position.CENTER)
	if on_opened.is_valid():
		inst.dialogue_finished.connect(on_opened)
	return inst

static func _get_or_create() -> GDialogue:
	if not _instance or not is_instance_valid(_instance):
		var tree = Engine.get_main_loop() as SceneTree
		if tree and tree.root:
			var d = GDialogue.new()
			tree.root.add_child(d)
			_instance = d
	return _instance

func start_dialogue(dialog_queue: Array[Dictionary], pos: Position = Position.BOTTOM) -> void:
	_queue = dialog_queue.duplicate()
	_reposition_box(pos)
	_box_container.visible = true
	_show_next_in_queue()

func _show_next_in_queue() -> void:
	if _queue.is_empty():
		_box_container.visible = false
		_left_avatar_rect.visible = false
		_right_avatar_rect.visible = false
		dialogue_finished.emit()
		return
	
	var cur = _queue.pop_front()
	var speaker = cur.get("speaker", "")
	var avatar = cur.get("avatar", null)
	var side = cur.get("side", "left") # "left" or "right"
	var text = cur.get("text", "")
	var options = cur.get("options", [])
	
	if speaker != "":
		_speaker_label.text = speaker
		_speaker_panel.visible = true
	else:
		_speaker_panel.visible = false
	
	# Dual-avatar handling
	if cur.has("left_avatar") or cur.has("right_avatar"):
		_left_avatar_rect.visible = cur.has("left_avatar")
		_right_avatar_rect.visible = cur.has("right_avatar")
		if cur.has("left_avatar"):
			_left_avatar_rect.texture = cur["left_avatar"]
		if cur.has("right_avatar"):
			_right_avatar_rect.texture = cur["right_avatar"]
			
		# Highlight active speaker, dim inactive speaker
		if side == "left":
			_left_avatar_rect.modulate = Color(1, 1, 1, 1)
			_right_avatar_rect.modulate = Color(0.4, 0.4, 0.45, 0.8)
		else:
			_right_avatar_rect.modulate = Color(1, 1, 1, 1)
			_left_avatar_rect.modulate = Color(0.4, 0.4, 0.45, 0.8)
	else:
		if side == "left":
			_left_avatar_rect.visible = (avatar != null)
			_right_avatar_rect.visible = false
			if avatar: _left_avatar_rect.texture = avatar
			_left_avatar_rect.modulate = Color(1, 1, 1, 1)
		else:
			_right_avatar_rect.visible = (avatar != null)
			_left_avatar_rect.visible = false
			if avatar: _right_avatar_rect.texture = avatar
			_right_avatar_rect.modulate = Color(1, 1, 1, 1)
		
	_active_options = options if options is Array else []
	_full_text = text
	_char_index = 0
	_typing_timer = 0.0
	_content_label.text = ""
	_is_typing = true
	_next_indicator.visible = false
	_options_container.visible = false
