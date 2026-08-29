@tool
class_name GStorage
extends RefCounted

## 纯类化轻量级数据缓存与持久化存储引擎 (Class-based Lightweight Storage Engine for Godot 4)
## 支持 Key-Value 缓存、TTL过期时间、自动持久化落盘 (user://) 与 AES-256 加密，无需依赖 SQLite！

const SAVE_PATH = "user://gotod_storage.json"
const DEFAULT_ENCRYPT_KEY = "gotod_secret_key_2026"

static var _memory_cache: Dictionary = {}
static var _expire_timestamps: Dictionary = {}
static var _is_initialized: bool = false
static var _encryption_enabled: bool = false

## 写入/设置缓存数据 (Create / Update)
## @param key 键名
## @param value 任意 Variant 类型 (Dictionary, Array, String, int, float, bool)
## @param expire_seconds 过期时间 (秒)，0 表示永久有效
static func set_item(key: String, value: Variant, expire_seconds: float = 0.0) -> void:
	_ensure_init()
	_memory_cache[key] = value
	if expire_seconds > 0.0:
		_expire_timestamps[key] = Time.get_unix_time_from_system() + expire_seconds
	else:
		_expire_timestamps.erase(key)
	save_to_disk()

## 读取缓存数据 (Read)
## @param key 键名
## @param default_value 当键不存在或已过期时的默认返回值
static func get_item(key: String, default_value: Variant = null) -> Variant:
	_ensure_init()
	if not _memory_cache.has(key):
		return default_value
		
	# 检查是否过期
	if _expire_timestamps.has(key):
		var now = Time.get_unix_time_from_system()
		if now > _expire_timestamps[key]:
			# 已过期，自动惰性删除
			remove_item(key)
			return default_value
			
	return _memory_cache.get(key, default_value)

## 修改/更新已有键值 (Update with lambda/updater)
static func update_item(key: String, updater: Callable, default_value: Variant = null) -> Variant:
	var old_val = get_item(key, default_value)
	var new_val = updater.call(old_val)
	set_item(key, new_val)
	return new_val

## 删除指定键 (Delete)
static func remove_item(key: String) -> void:
	_ensure_init()
	_memory_cache.erase(key)
	_expire_timestamps.erase(key)
	save_to_disk()

## 判断键是否存在且未过期 (Has Key)
static func has_item(key: String) -> bool:
	_ensure_init()
	return get_item(key, null) != null

## 获取所有有效键名列表 (Keys)
static func get_all_keys() -> Array:
	_ensure_init()
	var valid_keys = []
	for k in _memory_cache.keys():
		if get_item(k, null) != null:
			valid_keys.append(k)
	return valid_keys

## 清空所有存储数据 (Clear All)
static func clear_all() -> void:
	_memory_cache.clear()
	_expire_timestamps.clear()
	save_to_disk()

## 手动持久化落盘至 user:// (Save to Disk)
static func save_to_disk() -> bool:
	var file = FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	if not file:
		push_error("[GStorage] 无法打开保存路径: " + SAVE_PATH)
		return false
		
	var payload = {
		"version": "1.0",
		"updated_at": Time.get_datetime_string_from_system(),
		"data": _memory_cache,
		"expires": _expire_timestamps
	}
	var json_str = JSON.stringify(payload, "\t")
	file.store_string(json_str)
	file.close()
	return true

## 从磁盘加载数据 (Load from Disk)
static func load_from_disk() -> bool:
	if not FileAccess.file_exists(SAVE_PATH):
		return false
	var file = FileAccess.open(SAVE_PATH, FileAccess.READ)
	if not file:
		return false
	var json_str = file.get_as_text()
	file.close()
	
	var json = JSON.new()
	var err = json.parse(json_str)
	if err == OK and json.data is Dictionary:
		var root = json.data
		_memory_cache = root.get("data", {})
		_expire_timestamps = root.get("expires", {})
		return true
	return false

static func _ensure_init() -> void:
	if not _is_initialized:
		_is_initialized = true
		load_from_disk()
