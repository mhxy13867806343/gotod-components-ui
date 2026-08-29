# GPicker - Godot 4.x Vant UI Style Universal Picker / Wheel Selector Component
# 选择器组件 (提供多列滚轮或单选列表，常用于职业选择、地区选择、日期时间与游戏关卡挑选)
class_name GPicker
extends Control

signal confirm(selected_values: Array, selected_indexes: Array)
signal cancel()
signal change(selected_values: Array, column_index: int)

@export var title: String = "请选择"
@export var confirm_button_text: String = "确认"
@export var cancel_button_text: String = "取消"
@export var show_toolbar: bool = true
@export var columns: Array = [] # 字符串数组 ["战士", "法师", "射手"] 或 多列数组
@export var default_index: int = 0
@export var item_height: float = 44.0
@export var visible_item_count: int = 5

var _selected_index: int = 0

func _ready() -> void:
	visible = false

func add_column(items: Array) -> void:
	columns.append(items)

func set_columns(column_list: Array) -> void:
	columns = column_list

func open() -> void:
	visible = true

func close() -> void:
	visible = false
