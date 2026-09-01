@tool
class_name UseCooldown
extends RefCounted

signal cooldown_started()
signal cooldown_updated(remaining: float, percent: float)
signal cooldown_finished()

var duration: float = 5.0
var remaining_time: float = 0.0
var is_cooling: bool = false
var _cancelled: bool = false

static func create(cd_duration: float = 5.0) -> UseCooldown:
	var hook = UseCooldown.new()
	hook.duration = cd_duration
	return hook

func start(tree: SceneTree = null) -> void:
	if is_cooling:
		return
	var target_tree = tree
	if target_tree == null:
		target_tree = Engine.get_main_loop() as SceneTree
	if not target_tree:
		return

	is_cooling = true
	_cancelled = false
	remaining_time = duration
	cooldown_started.emit()
	_tick(target_tree)

func _tick(tree: SceneTree) -> void:
	while remaining_time > 0 and not _cancelled:
		if not is_instance_valid(tree):
			break
		await tree.create_timer(0.1).timeout
		if _cancelled or not is_instance_valid(tree):
			break
		remaining_time -= 0.1
		if remaining_time < 0: remaining_time = 0.0
		var percent = 1.0 - (remaining_time / duration) if duration > 0 else 1.0
		cooldown_updated.emit(remaining_time, percent)
		
	is_cooling = false
	if not _cancelled:
		cooldown_finished.emit()

func reset() -> void:
	_cancelled = true
	remaining_time = 0.0
	is_cooling = false

