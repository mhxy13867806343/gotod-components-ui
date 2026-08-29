@tool
class_name UseCooldown
extends RefCounted

signal cooldown_started()
signal cooldown_updated(remaining: float, percent: float)
signal cooldown_finished()

var duration: float = 5.0
var remaining_time: float = 0.0
var is_cooling: bool = false
var _timer: SceneTreeTimer = null

static func create(cd_duration: float = 5.0) -> UseCooldown:
	var hook = UseCooldown.new()
	hook.duration = cd_duration
	return hook

func start(tree: SceneTree) -> void:
	if is_cooling:
		return
	is_cooling = true
	remaining_time = duration
	cooldown_started.emit()
	_tick(tree)

func _tick(tree: SceneTree) -> void:
	while remaining_time > 0:
		await tree.create_timer(0.1).timeout
		remaining_time -= 0.1
		if remaining_time < 0: remaining_time = 0.0
		var percent = 1.0 - (remaining_time / duration)
		cooldown_updated.emit(remaining_time, percent)
		
	is_cooling = false
	cooldown_finished.emit()

func reset() -> void:
	remaining_time = 0.0
	is_cooling = false
