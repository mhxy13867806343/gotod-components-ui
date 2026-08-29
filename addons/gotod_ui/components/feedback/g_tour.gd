# GTour - Godot 4.x Element Plus Style Universal Tour / Onboarding Walkthrough Component
# 漫游式新手引导组件 (分步引导用户了解新功能或界面布局，支持遮罩挖孔高亮、目标气泡卡片与下一步操作)
class_name GTour
extends Control

signal step_change(current_step: int)
signal close()
signal finish()

enum Placement {
	TOP,
	BOTTOM,
	LEFT,
	RIGHT
}

@export var steps: Array[Dictionary] = [] # [{ target: NodePath, title: "步骤1", description: "说明", placement: Placement.BOTTOM }]
@export var current_step: int = 0
@export var mask: bool = true
@export var close_on_click_mask: bool = false
@export var show_arrow: bool = true

var _active_target: Control

func _ready() -> void:
	visible = false

func add_step(target: NodePath, title: String, description: String = "", placement: int = 1) -> void:
	steps.append({
		"target": target,
		"title": title,
		"description": description,
		"placement": placement
	})

func add_steps(step_list: Array) -> void:
	for s in step_list:
		if s is Dictionary:
			steps.append(s)

func start() -> void:
	current_step = 0
	visible = true
	_show_step(0)

func next() -> void:
	if current_step < steps.size() - 1:
		current_step += 1
		_show_step(current_step)
		step_change.emit(current_step)
	else:
		finish.emit()
		close_tour()

func prev() -> void:
	if current_step > 0:
		current_step -= 1
		_show_step(current_step)
		step_change.emit(current_step)

func close_tour() -> void:
	visible = false
	close.emit()

func _show_step(idx: int) -> void:
	if idx < 0 or idx >= steps.size():
		return
	var step_data = steps[idx]
	# 高亮目标节点并重新定位气泡卡片
