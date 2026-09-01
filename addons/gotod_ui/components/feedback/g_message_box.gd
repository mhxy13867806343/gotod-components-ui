class_name GMessageBox
extends Control

signal confirmed()
signal canceled()
signal prompt_submitted(value: String)

static var _current_box: GMessageBox = null

## 统一弹窗服务方法 (对标 service 规范避免与 Godot 冲突)
static func service(options_or_message: Variant, context_node: Node = null) -> GMessageBox:
	if options_or_message is Dictionary:
		var opts = options_or_message as Dictionary
		var box_type = opts.get("type", "alert")
		match box_type:
			"confirm": return confirm(opts, "确认", {}, context_node)
			"prompt": return prompt(opts, "输入", {}, context_node)
			_: return alert(opts, "提示", {}, context_node)
	return alert(str(options_or_message), "提示", {}, context_node)

## 启动别名方法
static func open(options_or_message: Variant, context_node: Node = null) -> GMessageBox:
	return service(options_or_message, context_node)

## 消息提示框 (Alert Dialog - 支持 String 或 Dictionary 配置对象)
static func alert(message_or_options: Variant, title: String = "提示", options: Dictionary = {}, context_node: Node = null) -> GMessageBox:
	var final_msg = ""
	var final_title = title
	var final_opts = options.duplicate()
	var final_ctx = context_node
	if message_or_options is Dictionary:
		final_opts = (message_or_options as Dictionary).duplicate()
		final_msg = final_opts.get("message", final_opts.get("text", ""))
		final_title = final_opts.get("title", title)
	else:
		final_msg = str(message_or_options)
	return _create_box(final_title, final_msg, final_opts, final_ctx, false, false)

## 确认取消框 (Confirm Dialog - 支持 String 或 Dictionary 配置对象)
static func confirm(message_or_options: Variant, title: String = "确认", options: Dictionary = {}, context_node: Node = null) -> GMessageBox:
	var final_msg = ""
	var final_title = title
	var final_opts = options.duplicate()
	var final_ctx = context_node
	if message_or_options is Dictionary:
		final_opts = (message_or_options as Dictionary).duplicate()
		final_msg = final_opts.get("message", final_opts.get("text", ""))
		final_title = final_opts.get("title", title)
	else:
		final_msg = str(message_or_options)
	return _create_box(final_title, final_msg, final_opts, final_ctx, true, false)

## 输入提交框 (Prompt Dialog - 支持 String 或 Dictionary 配置对象)
static func prompt(message_or_options: Variant, title: String = "输入", options: Dictionary = {}, context_node: Node = null) -> GMessageBox:
	var final_msg = ""
	var final_title = title
	var final_opts = options.duplicate()
	var final_ctx = context_node
	if message_or_options is Dictionary:
		final_opts = (message_or_options as Dictionary).duplicate()
		final_msg = final_opts.get("message", final_opts.get("text", ""))
		final_title = final_opts.get("title", title)
	else:
		final_msg = str(message_or_options)
	return _create_box(final_title, final_msg, final_opts, final_ctx, true, true)

## 关闭当前弹窗
static func close() -> void:
	if _current_box and is_instance_valid(_current_box):
		_current_box._close_direct()

static func _create_box(title: String, message: String, options: Dictionary, context_node: Node = null, show_cancel: bool = false, has_input: bool = false) -> GMessageBox:
	if _current_box and is_instance_valid(_current_box):
		_current_box._close_direct()
		
	var box = GMessageBox.new()
	box._title_text = title
	box._message_text = message
	box._options = options
	box._options["show_cancel"] = show_cancel if not options.has("show_cancel") else options["show_cancel"]
	box._options["has_input"] = has_input if not options.has("has_input") else options["has_input"]
	
	var tree: SceneTree = null
	if context_node and is_instance_valid(context_node) and context_node.get_tree():
		tree = context_node.get_tree()
	elif Engine.get_main_loop() is SceneTree:
		tree = Engine.get_main_loop() as SceneTree
		
	if tree and tree.root:
		var canvas = CanvasLayer.new()
		canvas.layer = 128
		canvas.add_child(box)
		tree.root.add_child(canvas)
		box.set_meta("_canvas_parent", canvas)
		_current_box = box
		
	return box


var _title_text: String = "提示"
var _message_text: String = ""
var _options: Dictionary = {}
var _card: PanelContainer
var _input_field: LineEdit

func _ready() -> void:
	anchors_preset = Control.PRESET_FULL_RECT
	
	var mask = ColorRect.new()
	mask.anchors_preset = Control.PRESET_FULL_RECT
	mask.color = Color(0, 0, 0, 0.5)
	add_child(mask)
	
	_card = PanelContainer.new()
	_card.anchor_left = 0.5
	_card.anchor_top = 0.5
	_card.anchor_right = 0.5
	_card.anchor_bottom = 0.5
	_card.grow_horizontal = Control.GROW_DIRECTION_BOTH
	_card.grow_vertical = Control.GROW_DIRECTION_BOTH
	_card.custom_minimum_size = Vector2(400, 0)
	
	var bg_col = GotodTheme.get_color("bg_surface", Color("#18181c"))
	var border_col = GotodTheme.get_color("border_base", Color("#383842"))
	var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 8.0, 20.0, 16.0, Color(0, 0, 0, 0.4), 16)
	_card.add_theme_stylebox_override("panel", sb)
	add_child(_card)
	
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 14)
	_card.add_child(vbox)
	
	# Header
	var title_lbl = Label.new()
	title_lbl.text = _title_text
	title_lbl.add_theme_font_size_override("font_size", 16)
	title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary"))
	vbox.add_child(title_lbl)
	
	# Body
	var msg_lbl = Label.new()
	msg_lbl.text = _message_text
	msg_lbl.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	msg_lbl.add_theme_font_size_override("font_size", 13)
	msg_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_regular"))
	vbox.add_child(msg_lbl)
	
	if _options.get("has_input", false):
		_input_field = LineEdit.new()
		_input_field.placeholder_text = _options.get("input_placeholder", "请输入...")
		vbox.add_child(_input_field)
		
	# Footer Buttons
	var btn_box = HBoxContainer.new()
	btn_box.alignment = BoxContainer.ALIGNMENT_END
	btn_box.add_theme_constant_override("separation", 10)
	vbox.add_child(btn_box)
	
	if _options.get("show_cancel", false):
		var cancel_btn = Button.new()
		cancel_btn.text = _options.get("cancel_text", "取消")
		cancel_btn.pressed.connect(func():
			canceled.emit()
			_close_direct()
		)
		btn_box.add_child(cancel_btn)
		
	var confirm_btn = Button.new()
	confirm_btn.text = _options.get("confirm_text", "确定")
	confirm_btn.pressed.connect(func():
		if _input_field:
			prompt_submitted.emit(_input_field.text)
		confirmed.emit()
		_close_direct()
	)
	btn_box.add_child(confirm_btn)

func _setup_buttons(show_cancel: bool, has_input: bool) -> void:
	_options["show_cancel"] = show_cancel
	_options["has_input"] = has_input

func _close_direct() -> void:
	var canvas = get_meta("_canvas_parent", null)
	if canvas and is_instance_valid(canvas):
		canvas.queue_free()
	else:
		queue_free()
	_current_box = null
