# GNoticeBar - Godot 4.x Vant UI Style Universal NoticeBar Component
# 通知栏组件 (在页面顶部以醒目通告条形式向用户广播消息，支持跑马灯平滑滚动、左侧喇叭图标与右侧操作)
class_name GNoticeBar
extends PanelContainer

signal click()
signal close()

enum NoticeMode {
	DEFAULT,
	CLOSEABLE,
	LINK
}

enum NoticeType {
	WARNING, # 黄色警示 (默认)
	INFO,    # 蓝色通告
	SUCCESS, # 绿色通知
	DANGER   # 红色紧急
}

@export var text: String = "这是一条跑马灯滚动广播通知信息，提醒用户注意最新活动或系统维护公告。":
	set(val):
		text = val
		if _label:
			_label.text = text

@export var scrollable: bool = true
@export var scroll_speed: float = 50.0 # 像素/秒
@export_enum("DEFAULT", "CLOSEABLE", "LINK") var mode: int = NoticeMode.DEFAULT
@export_enum("WARNING", "INFO", "SUCCESS", "DANGER") var notice_type: int = NoticeType.WARNING
@export var wrap: bool = false
@export var left_icon: Texture2D

var _label: Label
var _scroll_offset: float = 0.0
var _clip_control: Control

func _ready() -> void:
	_setup_ui()

func _setup_ui() -> void:
	custom_minimum_size = Vector2(0, 36)
	size_flags_horizontal = SIZE_EXPAND_FILL

	# 样式背景
	var bg_col = Color(0.98, 0.94, 0.85, 0.95) # 默认黄底
	var text_col = Color(0.85, 0.55, 0.15)
	match notice_type:
		NoticeType.INFO:
			bg_col = Color(0.12, 0.20, 0.32, 0.95)
			text_col = Color(0.35, 0.65, 0.95)
		NoticeType.SUCCESS:
			bg_col = Color(0.10, 0.25, 0.18, 0.95)
			text_col = Color(0.35, 0.85, 0.55)
		NoticeType.DANGER:
			bg_col = Color(0.30, 0.12, 0.15, 0.95)
			text_col = Color(0.95, 0.40, 0.45)

	var sb = StyleBoxFlat.new()
	sb.bg_color = bg_col
	sb.set_corner_radius_all(6)
	sb.content_margin_left = 12
	sb.content_margin_right = 12
	add_theme_stylebox_override("panel", sb)

	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 8)
	add_child(hbox)

	var icon_lbl = Label.new()
	icon_lbl.text = "📢"
	icon_lbl.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	hbox.add_child(icon_lbl)

	_clip_control = Control.new()
	_clip_control.clip_contents = true
	_clip_control.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_clip_control.size_flags_vertical = Control.SIZE_EXPAND_FILL
	hbox.add_child(_clip_control)

	_label = Label.new()
	_label.text = text
	_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	_label.add_theme_color_override("font_color", text_col)
	_label.add_theme_font_size_override("font_size", 13)
	_clip_control.add_child(_label)

	if mode == NoticeMode.CLOSEABLE:
		var close_btn = Button.new()
		close_btn.text = "✕"
		close_btn.flat = true
		close_btn.pressed.connect(func():
			visible = false
			close.emit()
		)
		hbox.add_child(close_btn)

func _process(delta: float) -> void:
	if scrollable and _label and _clip_control:
		_scroll_offset -= scroll_speed * delta
		_label.position.x = _scroll_offset
		if _scroll_offset < -_label.size.x:
			_scroll_offset = _clip_control.size.x

## 静态多态构建工厂 (支持 1. 广播文本单值 create(text), 2. 字典对象 create({ ... }), 3. 多参数 create(text, type, scrollable))
static func create(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> GNoticeBar:
	var bar = GNoticeBar.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("text"): bar.text = str(opts["text"])
		if opts.has("scrollable"): bar.scrollable = bool(opts["scrollable"])
		if opts.has("speed"): bar.scroll_speed = float(opts["speed"])
		if opts.has("type"):
			if opts["type"] is int: bar.notice_type = opts["type"]
			elif str(opts["type"]).to_lower() == "info": bar.notice_type = NoticeType.INFO
			elif str(opts["type"]).to_lower() == "success": bar.notice_type = NoticeType.SUCCESS
			elif str(opts["type"]).to_lower() == "danger": bar.notice_type = NoticeType.DANGER
		if opts.has("mode"):
			if opts["mode"] is int: bar.mode = opts["mode"]
			elif str(opts["mode"]).to_lower() == "closeable": bar.mode = NoticeMode.CLOSEABLE
			elif str(opts["mode"]).to_lower() == "link": bar.mode = NoticeMode.LINK
	elif arg1 != null:
		bar.text = str(arg1)
		if arg2 != null:
			if arg2 is int: bar.notice_type = arg2
		if arg3 != null:
			bar.scrollable = bool(arg3)
	return bar
