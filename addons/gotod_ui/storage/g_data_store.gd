@tool
class_name GDataStore
extends RefCounted

## 纯类化轻量级 NoSQL 文档集合引擎 (Class-based Document Store for Godot 4)
## 支持表集合 (Collection) 的增删改查 (CRUD)、主键ID、复杂过滤、分页与聚合，替代 SQLite 的轻量化方案！

const STORE_KEY_PREFIX = "gotod_db_"

## 插入一条新记录 (Create / Insert)
## 自动生成自增或时间戳唯一 ID
static func insert(collection: String, doc: Dictionary) -> Dictionary:
	var list: Array = _get_collection_data(collection)
	var new_doc = doc.duplicate(true)
	
	if not new_doc.has("id"):
		new_doc["id"] = _generate_uuid()
	new_doc["_created_at"] = Time.get_unix_time_from_system()
	new_doc["_updated_at"] = new_doc["_created_at"]
	
	list.append(new_doc)
	_save_collection_data(collection, list)
	return new_doc

## 根据条件查询全部匹配记录 (Read / Find)
## @param query 键值过滤字典，如 {"type": "WEAPON", "level": 10}
static func find(collection: String, query: Dictionary = {}) -> Array[Dictionary]:
	var list: Array = _get_collection_data(collection)
	if query.is_empty():
		var typed_list: Array[Dictionary] = []
		for item in list: typed_list.append(item)
		return typed_list
		
	var results: Array[Dictionary] = []
	for item in list:
		if _matches_query(item, query):
			results.append(item)
	return results

## 根据主键 ID 查询单条记录 (Find by ID)
static func find_by_id(collection: String, id: Variant) -> Dictionary:
	var list: Array = _get_collection_data(collection)
	for item in list:
		if str(item.get("id")) == str(id):
			return item
	return {}

## 查询单条符合条件的记录 (Find One)
static func find_one(collection: String, query: Dictionary) -> Dictionary:
	var list: Array = _get_collection_data(collection)
	for item in list:
		if _matches_query(item, query):
			return item
	return {}

## 根据条件修改/更新记录 (Update)
## @return 成功更新的记录数量
static func update(collection: String, query: Dictionary, update_data: Dictionary) -> int:
	var list: Array = _get_collection_data(collection)
	var updated_count = 0
	
	for i in range(list.size()):
		if _matches_query(list[i], query):
			for k in update_data.keys():
				list[i][k] = update_data[k]
			list[i]["_updated_at"] = Time.get_unix_time_from_system()
			updated_count += 1
			
	if updated_count > 0:
		_save_collection_data(collection, list)
	return updated_count

## 根据主键 ID 修改单条记录 (Update by ID)
static func update_by_id(collection: String, id: Variant, update_data: Dictionary) -> bool:
	return update(collection, {"id": id}, update_data) > 0

## 根据条件删除记录 (Delete)
## @return 成功删除的记录数量
static func delete(collection: String, query: Dictionary) -> int:
	var list: Array = _get_collection_data(collection)
	var initial_size = list.size()
	var new_list: Array = []
	
	for item in list:
		if not _matches_query(item, query):
			new_list.append(item)
			
	var deleted_count = initial_size - new_list.size()
	if deleted_count > 0:
		_save_collection_data(collection, new_list)
	return deleted_count

## 根据主键 ID 删除记录 (Delete by ID)
static func delete_by_id(collection: String, id: Variant) -> bool:
	return delete(collection, {"id": id}) > 0

## 分页查询 (Pagination)
static func paginate(collection: String, page: int = 1, page_size: int = 10, query: Dictionary = {}) -> Dictionary:
	var all_matching = find(collection, query)
	var total = all_matching.size()
	var start_idx = (page - 1) * page_size
	var paged_items: Array[Dictionary] = []
	
	if start_idx < total:
		var end_idx = min(start_idx + page_size, total)
		for i in range(start_idx, end_idx):
			paged_items.append(all_matching[i])
			
	return {
		"items": paged_items,
		"total": total,
		"page": page,
		"page_size": page_size,
		"total_pages": int(ceil(float(total) / float(page_size)))
	}

## 获取集合总记录数 (Count)
static func count(collection: String, query: Dictionary = {}) -> int:
	return find(collection, query).size()

## 清空集合 (Drop Collection)
static func drop_collection(collection: String) -> void:
	GStorage.remove_item(STORE_KEY_PREFIX + collection)


# ----------------------------------------------------
# 内部辅助方法
# ----------------------------------------------------
static func _get_collection_data(collection: String) -> Array:
	var key = STORE_KEY_PREFIX + collection
	var data = GStorage.get_item(key, [])
	if data is Array:
		return data
	return []

static func _save_collection_data(collection: String, list: Array) -> void:
	var key = STORE_KEY_PREFIX + collection
	GStorage.set_item(key, list)

static func _matches_query(item: Dictionary, query: Dictionary) -> bool:
	for k in query.keys():
		if not item.has(k) or str(item[k]) != str(query[k]):
			return false
	return true

static func _generate_uuid() -> String:
	return "%d_%d" % [Time.get_ticks_msec(), randi() % 10000]
