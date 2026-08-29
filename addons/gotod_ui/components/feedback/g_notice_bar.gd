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

@export var text: String = "这是一条跑马灯滚动广播通知信息，提醒用户注意最新活动或系统维护公告。"
@export var scrollable: bool = true
@export var scroll_speed: float = 50.0 # 像素/秒
@export var mode: NoticeMode = NoticeMode.DEFAULT
@export var notice_type: NoticeType = NoticeType.WARNING
@export var wrap: bool = false
@export var left_icon: Texture2D

var _label: Label
var _scroll_offset: float = 0.0

func _ready() -> void:
	_setup_ui()

func _setup_ui() -> void:
	custom_minimum_size = Vector2(0, 40)
	size_flags_horizontal = SIZE_EXPAND_FILL

func _process(delta: float) -> void:
	if scrollable and _label:
		_scroll_offset -= scroll_speed * delta
		_label.position.x = _scroll_offset
		if _scroll_offset < -_label.size.x:
			_scroll_offset = size.x
