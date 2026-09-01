@tool
class_name GChat
extends Control

## =========================================================================
## GChat: 微信 / IM 气泡式聊天与对话流组件 (WeChat / Game Chat Stream)
## 支持微信风格左右对话气泡、系统时间戳胶囊、富文本、装备链接、输入栏与自动滚屏。
## =========================================================================

signal message_sent(text: String)
signal message_clicked(msg_data: Dictionary)

enum MessageType {
	TEXT,
	IMAGE,
	VOICE,
	SYSTEM,
	CARD
}

@export var self_bubble_color: Color = Color(0.18, 0.76, 0.45, 1.0) # WeChat Green
@export var other_bubble_color: Color = Color(0.16, 0.18, 0.22, 1.0) # Dark Theme Bubble
@export var show_input_bar: bool = true
@export var auto_scroll: bool = true

var _scroll_container: ScrollContainer
var _messages_vbox: VBoxContainer
var _input_bar: PanelContainer
var _line_edit: LineEdit
var _send_btn: Button
var _history: Array[Dictionary] = []

func _ready() -> void:
	_setup_ui()

func _setup_ui() -> void:
	if _messages_vbox:
		return
		
	size_flags_horizontal = Control.SIZE_EXPAND_FILL
	size_flags_vertical = Control.SIZE_EXPAND_FILL
	
	var main_vbox = VBoxContainer.new()
	main_vbox.anchors_preset = Control.PRESET_FULL_RECT
	main_vbox.add_theme_constant_override("separation", 0)
	
	# 1. Scrollable Messages Area
	_scroll_container = ScrollContainer.new()
	_scroll_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_scroll_container.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_scroll_container.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	
	_messages_vbox = VBoxContainer.new()
	_messages_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_messages_vbox.add_theme_constant_override("separation", 12)
	_messages_vbox.custom_minimum_size.x = 200
	_scroll_container.add_child(_messages_vbox)
	main_vbox.add_child(_scroll_container)
	
	# 2. WeChat Bottom Input Toolbar
	if show_input_bar:
		_input_bar = PanelContainer.new()
		var ib_sb = StyleBoxFlat.new()
		ib_sb.bg_color = Color(0.12, 0.13, 0.16)
		ib_sb.border_color = Color(0.22, 0.24, 0.28)
		ib_sb.border_width_top = 1
		ib_sb.set_content_margin_all(8)
		_input_bar.add_theme_stylebox_override("panel", ib_sb)
		
		var ib_hbox = HBoxContainer.new()
		ib_hbox.add_theme_constant_override("separation", 8)
		
		_line_edit = LineEdit.new()
		_line_edit.placeholder_text = "发送消息..."
		_line_edit.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		_line_edit.text_submitted.connect(_on_send_pressed)
		ib_hbox.add_child(_line_edit)
		
		_send_btn = Button.new()
		_send_btn.text = "发送"
		_send_btn.custom_minimum_size = Vector2(64, 32)
		_send_btn.pressed.connect(func(): _on_send_pressed(_line_edit.text))
		ib_hbox.add_child(_send_btn)
		
		_input_bar.add_child(ib_hbox)
		main_vbox.add_child(_input_bar)
	
	add_child(main_vbox)

func _on_send_pressed(txt: String) -> void:
	txt = txt.strip_edges()
	if txt.is_empty():
		return
	if _line_edit:
		_line_edit.clear()
	send_self_message(txt)
	message_sent.emit(txt)

## 添加发送方/我方消息 (右侧绿色气泡)
func send_self_message(text: String, avatar: Texture2D = null) -> GChat:
	add_message({
		"is_self": true,
		"text": text,
		"avatar": avatar,
		"name": "我",
		"time": Time.get_time_string_from_system().substr(0, 5)
	})
	return self

## 添加接收方/对方消息 (左侧白色/暗色气泡)
func receive_message(text: String, sender_name: String = "队友", avatar: Texture2D = null) -> GChat:
	add_message({
		"is_self": false,
		"text": text,
		"avatar": avatar,
		"name": sender_name,
		"time": Time.get_time_string_from_system().substr(0, 5)
	})
	return self

## 添加系统时间戳或事件胶囊 ("昨天 21:30", "你与【赵小芸】已成为好友")
func add_system_notice(text: String) -> GChat:
	add_message({
		"type": MessageType.SYSTEM,
		"text": text
	})
	return self

## 批量添加/渲染消息记录
func add_messages(msgs: Array) -> GChat:
	for m in msgs:
		if m is Dictionary:
			add_message(m)
	return self

## 渲染单条聊天项
func add_message(msg: Dictionary) -> void:
	if not _messages_vbox:
		_setup_ui()
		
	_history.append(msg)
	
	var msg_type = msg.get("type", MessageType.TEXT)
	if msg_type == MessageType.SYSTEM:
		_render_system_pill(msg.get("text", ""))
	else:
		_render_bubble(msg)
		
	if auto_scroll:
		call_deferred("_scroll_to_bottom")

func _render_system_pill(text: String) -> void:
	if not _messages_vbox:
		_setup_ui()
		
	var center_box = CenterContainer.new()
	center_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	
	var pill = PanelContainer.new()
	var sb = StyleBoxFlat.new()
	sb.bg_color = Color(0, 0, 0, 0.25)
	sb.set_corner_radius_all(10)
	sb.content_margin_left = 10
	sb.content_margin_right = 10
	sb.content_margin_top = 3
	sb.content_margin_bottom = 3
	pill.add_theme_stylebox_override("panel", sb)
	
	var lbl = Label.new()
	lbl.text = text
	lbl.add_theme_font_size_override("font_size", 11)
	lbl.add_theme_color_override("font_color", Color(0.7, 0.7, 0.75))
	pill.add_child(lbl)
	
	center_box.add_child(pill)
	_messages_vbox.add_child(center_box)

func _render_bubble(msg: Dictionary) -> void:
	if not _messages_vbox:
		_setup_ui()
		
	var is_self: bool = msg.get("is_self", false)
	var text: String = msg.get("text", "")
	var name_str: String = msg.get("name", "")
	var avatar_tex: Texture2D = msg.get("avatar", null)
	
	var row_hbox = HBoxContainer.new()
	row_hbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	row_hbox.alignment = BoxContainer.ALIGNMENT_END if is_self else BoxContainer.ALIGNMENT_BEGIN
	row_hbox.add_theme_constant_override("separation", 8)
	
	# Avatar
	var avatar = TextureRect.new()
	avatar.custom_minimum_size = Vector2(36, 36)
	avatar.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	avatar.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	if avatar_tex:
		avatar.texture = avatar_tex
	
	# Bubble Box Column
	var col_vbox = VBoxContainer.new()
	col_vbox.alignment = BoxContainer.ALIGNMENT_END if is_self else BoxContainer.ALIGNMENT_BEGIN
	col_vbox.add_theme_constant_override("separation", 2)
	
	# Nickname
	if not is_self and not name_str.is_empty():
		var name_lbl = Label.new()
		name_lbl.text = name_str
		name_lbl.add_theme_font_size_override("font_size", 11)
		name_lbl.add_theme_color_override("font_color", Color(0.65, 0.68, 0.75))
		col_vbox.add_child(name_lbl)
	
	# Bubble Container
	var bubble = PanelContainer.new()
	var sb = StyleBoxFlat.new()
	sb.bg_color = self_bubble_color if is_self else other_bubble_color
	sb.set_corner_radius_all(8)
	sb.content_margin_left = 12
	sb.content_margin_right = 12
	sb.content_margin_top = 8
	sb.content_margin_bottom = 8
	bubble.add_theme_stylebox_override("panel", sb)
	
	var content_lbl = RichTextLabel.new()
	content_lbl.bbcode_enabled = true
	content_lbl.text = text
	content_lbl.fit_content = true
	content_lbl.scroll_active = false
	content_lbl.custom_minimum_size.x = min(360, text.length() * 16)
	content_lbl.add_theme_font_size_override("normal_font_size", 14)
	content_lbl.add_theme_color_override("default_color", Color.WHITE if not is_self else Color.BLACK)
	bubble.add_child(content_lbl)
	
	col_vbox.add_child(bubble)
	
	if is_self:
		row_hbox.add_child(col_vbox)
		row_hbox.add_child(avatar)
	else:
		row_hbox.add_child(avatar)
		row_hbox.add_child(col_vbox)
		
	_messages_vbox.add_child(row_hbox)

func _scroll_to_bottom() -> void:
	if _scroll_container and _messages_vbox:
		_scroll_container.scroll_vertical = int(_messages_vbox.size.y)

## 清空所有聊天记录
func clear() -> void:
	_history.clear()
	if _messages_vbox:
		for child in _messages_vbox.get_children():
			child.queue_free()

## 静态多态构建工厂 (支持 1. 字典对象 create({ ... }))
static func create(arg1: Variant = null) -> GChat:
	var chat = GChat.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("self_color"): chat.self_bubble_color = Color(opts["self_color"])
		if opts.has("other_color"): chat.other_bubble_color = Color(opts["other_color"])
		if opts.has("show_input"): chat.show_input_bar = bool(opts["show_input"])
		if opts.has("auto_scroll"): chat.auto_scroll = bool(opts["auto_scroll"])
		if opts.has("messages") and opts["messages"] is Array: chat.add_messages(opts["messages"])
	return chat

