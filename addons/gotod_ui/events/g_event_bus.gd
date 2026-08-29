@tool
class_name GEventBus
extends RefCounted

## 全局类型安全事件总线 (Class-based Global Event Bus for Godot 4)
## 支持发布/订阅 (Pub/Sub)、一次性事件监听 (once) 与带有数据载荷的事件派发

static var _listeners: Dictionary = {} # event_name -> Array[Callable]
static var _once_listeners: Dictionary = {} # event_name -> Array[Callable]
static var _event_history: Array[Dictionary] = []

## 注册事件监听器 (Subscribe)
static func on(event_name: String, callback: Callable) -> void:
	if not _listeners.has(event_name):
		_listeners[event_name] = []
	if not _listeners[event_name].has(callback):
		_listeners[event_name].append(callback)

## 注册一次性事件监听器 (Subscribe Once)
static func once(event_name: String, callback: Callable) -> void:
	if not _once_listeners.has(event_name):
		_once_listeners[event_name] = []
	if not _once_listeners[event_name].has(callback):
		_once_listeners[event_name].append(callback)

## 触发/派发事件 (Emit / Dispatch)
static func emit_event(event_name: String, payload: Variant = null) -> void:
	_record_history(event_name, payload)
	
	# 触发常规监听器
	if _listeners.has(event_name):
		for cb in _listeners[event_name].duplicate():
			if cb.is_valid():
				if payload != null:
					cb.call(payload)
				else:
					cb.call()
					
	# 触发一次性监听器并移除
	if _once_listeners.has(event_name):
		var list = _once_listeners[event_name].duplicate()
		_once_listeners.erase(event_name)
		for cb in list:
			if cb.is_valid():
				if payload != null:
					cb.call(payload)
				else:
					cb.call()

## 移除事件监听器 (Unsubscribe)
static func off(event_name: String, callback: Callable) -> void:
	if _listeners.has(event_name):
		_listeners[event_name].erase(callback)
	if _once_listeners.has(event_name):
		_once_listeners[event_name].erase(callback)

## 清空指定事件或所有事件监听器 (Clear All)
static func clear(event_name: String = "") -> void:
	if event_name.is_empty():
		_listeners.clear()
		_once_listeners.clear()
	else:
		_listeners.erase(event_name)
		_once_listeners.erase(event_name)

## 获取事件历史记录
static func get_history() -> Array[Dictionary]:
	return _event_history

static func _record_history(event_name: String, payload: Variant) -> void:
	_event_history.append({
		"event": event_name,
		"payload": payload,
		"timestamp": Time.get_ticks_msec()
	})
	if _event_history.size() > 100:
		_event_history.pop_front()
