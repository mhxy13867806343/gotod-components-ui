@tool
class_name GSaveManager
extends RefCounted

## 游戏存档与中断检查点管理器 (Class-based Game Save & Checkpoint Manager)
## 支持多槽位存档、中断自动存档 (Suspend / Auto-Save)、快速保存 (Quick Save)、覆盖与删除

const SAVE_DIR = "user://saves/"
const AUTO_SAVE_SLOT = "slot_auto"
const CHECKPOINT_SLOT = "slot_checkpoint"

# ----------------------------------------------------
# 1. 槽位存档与覆盖 (Save & Overwrite)
# ----------------------------------------------------

## 保存数据到指定槽位 (Save to Slot)
## @param slot_id 槽位标识 (如 "slot_1", "slot_2", "slot_auto")
## @param game_data 游戏核心数据 (玩家属性、背包、任务、位置等)
## @param metadata 存档元信息 (章节名称、游玩时长、等级、金币等)
static func save_slot(slot_id: String, game_data: Dictionary, metadata: Dictionary = {}) -> bool:
	_ensure_save_dir()
	var file_path = SAVE_DIR + slot_id + ".json"
	
	var full_meta = {
		"slot_id": slot_id,
		"save_name": metadata.get("save_name", "游戏存档 " + slot_id),
		"chapter": metadata.get("chapter", "第一章: 冒险启程"),
		"player_level": metadata.get("player_level", 1),
		"playtime_seconds": metadata.get("playtime_seconds", 0),
		"saved_at": Time.get_datetime_string_from_system(),
		"timestamp": Time.get_unix_time_from_system()
	}
	
	var payload = {
		"version": "1.0",
		"meta": full_meta,
		"data": game_data
	}
	
	var file = FileAccess.open(file_path, FileAccess.WRITE)
	if not file:
		push_error("[GSaveManager] 无法写入存档文件: " + file_path)
		return false
		
	var json_str = JSON.stringify(payload, "\t")
	file.store_string(json_str)
	file.close()
	return true

# ----------------------------------------------------
# 2. 中断存储与自动保存 (Checkpoint & Auto Save)
# ----------------------------------------------------

## 触发中断存储 / 检查点自动保存 (Checkpoint / Suspend Save)
static func save_checkpoint(checkpoint_name: String, game_data: Dictionary) -> bool:
	return save_slot(CHECKPOINT_SLOT, game_data, {
		"save_name": "⚡ 中断自动存档",
		"chapter": checkpoint_name
	})

## 从中断点恢复游戏 (Resume from Checkpoint)
static func resume_checkpoint() -> Dictionary:
	return load_slot(CHECKPOINT_SLOT)

## 检查是否存在中断存档
static func has_checkpoint() -> bool:
	return has_slot(CHECKPOINT_SLOT)

# ----------------------------------------------------
# 3. 读取存档 (Load Game)
# ----------------------------------------------------

## 读取指定槽位的完整数据 (Load Slot)
static func load_slot(slot_id: String) -> Dictionary:
	var file_path = SAVE_DIR + slot_id + ".json"
	if not FileAccess.file_exists(file_path):
		return {}
		
	var file = FileAccess.open(file_path, FileAccess.READ)
	if not file:
		return {}
	var json_str = file.get_as_text()
	file.close()
	
	var json = JSON.new()
	var err = json.parse(json_str)
	if err == OK and json.data is Dictionary:
		return json.data
	return {}

# ----------------------------------------------------
# 4. 删除与清空存档 (Delete Slot)
# ----------------------------------------------------

## 删除指定槽位存档 (Delete Slot)
static func delete_slot(slot_id: String) -> bool:
	var file_path = SAVE_DIR + slot_id + ".json"
	if FileAccess.file_exists(file_path):
		var err = DirAccess.remove_absolute(file_path)
		return err == OK
	return false

## 检查槽位是否存在
static func has_slot(slot_id: String) -> bool:
	var file_path = SAVE_DIR + slot_id + ".json"
	return FileAccess.file_exists(file_path)

# ----------------------------------------------------
# 5. 获取所有存档列表摘要 (Get All Slots Metadata)
# ----------------------------------------------------

## 获取所有存档槽位的元信息列表 (用于渲染存档/读档 UI 面板)
static func get_all_save_slots_meta(max_slots: int = 5) -> Array[Dictionary]:
	var slots: Array[Dictionary] = []
	
	# 检查自动中断存档
	if has_checkpoint():
		var ck_data = load_slot(CHECKPOINT_SLOT)
		slots.append(ck_data.get("meta", {}))
		
	for i in range(1, max_slots + 1):
		var s_id = "slot_%d" % i
		if has_slot(s_id):
			var slot_data = load_slot(s_id)
			slots.append(slot_data.get("meta", {}))
		else:
			slots.append({
				"slot_id": s_id,
				"is_empty": true,
				"save_name": "空存档槽位 #%d" % i
			})
	return slots

static func _ensure_save_dir() -> void:
	if not DirAccess.dir_exists_absolute(SAVE_DIR):
		DirAccess.make_dir_recursive_absolute(SAVE_DIR)
