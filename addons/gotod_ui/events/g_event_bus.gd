@tool
class_name GEventBus
extends RefCounted

## 全局与局部统一事件总线 (Class-based Unified Event Bus for Godot 4)
## 同时支持：
## 1. 跨页面/跨场景全局广播 (Cross-Scene / Cross-Page Global Events via Static Methods)
## 2. 同页面/单组件局部通信 (Same-Page Local Events via Instance Methods)

# ==========================================
# 1. 静态全局跨页面总线 (Cross-Page Global Event Bus)
# ==========================================
static var _global_listeners: Dictionary = {}      # event_name -> Array[Callable]
static var _global_once_listeners: Dictionary = {} # event_name -> Array[Callable]
static var _global_history: Array[Dictionary] = []

## 跨页面注册全局事件监听 (Cross-Page Subscribe)
static func on_global(event_name: String, callback: Callable) -> void:
	if not _global_listeners.has(event_name):
		_global_listeners[event_name] = []
	if not _global_listeners[event_name].has(callback):
		_global_listeners[event_name].append(callback)

## 跨页面注册一次性事件监听 (Cross-Page Subscribe Once)
static func once_global(event_name: String, callback: Callable) -> void:
	if not _global_once_listeners.has(event_name):
		_global_once_listeners[event_name] = []
	if not _global_once_listeners[event_name].has(callback):
		_global_once_listeners[event_name].append(callback)

## 跨页面派发全局事件 (Cross-Page Broadcast)
static func emit_global(event_name: String, payload: Variant = null) -> void:
	_record_global_history(event_name, payload)
	
	if _global_listeners.has(event_name):
		for cb in _global_listeners[event_name].duplicate():
			if cb.is_valid():
				if payload != null:
					cb.call(payload)
				else:
					cb.call()
					
	if _global_once_listeners.has(event_name):
		var list = _global_once_listeners[event_name].duplicate()
		_global_once_listeners.erase(event_name)
		for cb in list:
			if cb.is_valid():
				if payload != null:
					cb.call(payload)
				else:
					cb.call()

## 跨页面注销全局监听
static func off_global(event_name: String, callback: Callable) -> void:
	if _global_listeners.has(event_name):
		_global_listeners[event_name].erase(callback)
	if _global_once_listeners.has(event_name):
		_global_once_listeners[event_name].erase(callback)

# 兼容简写别名
static func on(event_name: String, callback: Callable) -> void: on_global(event_name, callback)
static func emit_event(event_name: String, payload: Variant = null) -> void: emit_global(event_name, payload)
static func once(event_name: String, callback: Callable) -> void: once_global(event_name, callback)
static func off(event_name: String, callback: Callable) -> void: off_global(event_name, callback)


# ==========================================
# 2. 局部同页面实例总线 (Same-Page Local Event Bus Instance)
# ==========================================
var _local_listeners: Dictionary = {}

## 局部同页面监听
func on_local(event_name: String, callback: Callable) -> void:
	if not _local_listeners.has(event_name):
		_local_listeners[event_name] = []
	if not _local_listeners[event_name].has(callback):
		_local_listeners[event_name].append(callback)

## 局部同页面派发
func emit_local(event_name: String, payload: Variant = null) -> void:
	if _local_listeners.has(event_name):
		for cb in _local_listeners[event_name].duplicate():
			if cb.is_valid():
				if payload != null: cb.call(payload)
				else: cb.call()

## 局部同页面移除监听
func off_local(event_name: String, callback: Callable) -> void:
	if _local_listeners.has(event_name):
		_local_listeners[event_name].erase(callback)

## 局部清空
func clear_local() -> void:
	_local_listeners.clear()


static func _record_global_history(event_name: String, payload: Variant) -> void:
	_global_history.append({
		"event": event_name,
		"payload": payload,
		"timestamp": Time.get_ticks_msec()
	})
	if _global_history.size() > 100:
		_global_history.pop_front()
