# GActionSheet - Godot 4.x Vant UI Style Universal ActionSheet Component
# 动作面板 (从页面底部弹出的模态操作菜单，用于提供一组与当前上下文相关的备选操作或退出确认)
class_name GActionSheet
extends Control

signal select(item: Dictionary, index: int)
signal cancel()
signal opened()
signal closed()

@export var title: String = ""
@export var description: String = ""
@export var cancel_text: String = "取消"
@export var actions: Array[Dictionary] = [] # [{ name: "选项", subname: "描述", color: Color(), disabled: false, loading: false }]
@export var close_on_click_action: bool = true
@export var round_corner: bool = true

var _mask: Control
var _panel: PanelContainer

func _ready() -> void:
	visible = false

func open() -> void:
	visible = true
	opened.emit()

func close() -> void:
	visible = false
	closed.emit()
