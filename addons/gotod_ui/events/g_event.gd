# =========================================================================
# GEvent: Godot 4.x 全局事件通讯总线 (UniApp / Vue 风格 uni.$emit & uni.$on)
# 参考规范：https://uniapp.dcloud.net.cn/api/window/communication.html
# 
# 核心特性：
# 1. GEvent.emit(event_name, data): 触发全局自定义事件并跨页面/跨组件传参
# 2. GEvent.on(event_name, callback, context_node): 注册全局事件监听 (支持传入 self 自动随节点生命周期销毁)
# 3. GEvent.once(event_name, callback, context_node): 单次监听 (触发一次自动注销)
# 4. GEvent.off(event_name, callback): 灵活注销监听器 (支持注销单个回调、注销某事件全部、或清空所有)
# 5. GEvent.off_all_for_node(context_node): 移除指定节点的所有事件绑定
# =========================================================================
@tool
class_name GEvent
extends RefCounted

# 事件监听存储结构:
# _listeners = {
#    "event_name": [
#        { "callback": Callable, "is_once": bool, "node": Node }
#    ]
# }
static var _listeners: Dictionary = {}

# =========================================================================
# 1. 触发事件 (uni.$emit)
# =========================================================================

## 触发全局自定义事件，并向所有监听者传递数据 (跨页面、跨场景、跨任意组件)
## @param event_name 事件唯一标识名称 (如 "update_user_info", "boss_killed")
## @param data 传递的参数数据 (可以是 Dictionary, int, String, Array, Object 等任意类型)
## @return int 成功接收并响应的监听器数量
static func emit(event_name: String, data: Variant = null) -> int:
	if not _listeners.has(event_name):
		return 0
		
	var list: Array = _listeners[event_name].duplicate()
	var triggered_count = 0
	var to_remove: Array = []
	
	for item in list:
		var cb: Callable = item.get("callback", Callable())
		var is_once: bool = item.get("is_once", false)
		var node: Node = item.get("node", null)
		
		# 节点有效性检查 (若节点已释放，跳过并清理)
		if node != null and not is_instance_valid(node):
			to_remove.append(item)
			continue
			
		if cb.is_valid():
			# 动态按参数个数调用
			if cb.get_argument_count() == 0:
				cb.call()
			else:
				cb.call(data)
			triggered_count += 1
			
		if is_once:
			to_remove.append(item)
			
	# 清理 once 或失效的监听器
	if to_remove.size() > 0 and _listeners.has(event_name):
		for rem in to_remove:
			_listeners[event_name].erase(rem)
		if _listeners[event_name].is_empty():
			_listeners.erase(event_name)
			
	return triggered_count

# =========================================================================
# 2. 注册监听 (uni.$on & uni.$once)
# =========================================================================

## 监听全局自定义事件 (uni.$on)
## @param event_name 事件名称
## @param callback 回调函数 func(data)
## @param context_node 当前节点 (传入 self 时，节点销毁 _exit_tree 自动注销监听，杜绝内存泄漏！)
static func on(event_name: String, callback: Callable, context_node: Node = null) -> void:
	_register_listener(event_name, callback, false, context_node)

## 监听全局自定义事件，只触发一次 (uni.$once)
## @param event_name 事件名称
## @param callback 回调函数 func(data)
## @param context_node 当前节点
static func once(event_name: String, callback: Callable, context_node: Node = null) -> void:
	_register_listener(event_name, callback, true, context_node)

# =========================================================================
# 3. 移除监听 (uni.$off)
# =========================================================================

## 移除全局自定义事件监听器 (uni.$off)
## @param event_name 若为空字符串，则清空所有事件；若指定，则移除该事件下的监听
## @param callback 若为空 Callable，则移除该 event_name 下的所有回调；若指定，则仅移除匹配的回调
static func off(event_name: String = "", callback: Callable = Callable()) -> void:
	if event_name == "":
		# 移除所有事件
		_listeners.clear()
		return
		
	if not _listeners.has(event_name):
		return
		
	if not callback.is_valid():
		# 移除该事件下的全部监听器
		_listeners.erase(event_name)
	else:
		var list: Array = _listeners[event_name]
		for i in range(list.size() - 1, -1, -1):
			if list[i].get("callback") == callback:
				list.remove_at(i)
		if list.is_empty():
			_listeners.erase(event_name)

## 移除某个 Node 绑定的所有事件监听 (通常在节点销毁时调用)
static func off_all_for_node(context_node: Node) -> void:
	if not context_node: return
	for event_name in _listeners.keys():
		var list: Array = _listeners[event_name]
		for i in range(list.size() - 1, -1, -1):
			if list[i].get("node") == context_node:
				list.remove_at(i)
		if list.is_empty():
			_listeners.erase(event_name)

# =========================================================================
# 4. 辅助状态查询方法
# =========================================================================

## 检查某事件是否存在有效监听者
static func has_listener(event_name: String) -> bool:
	return _listeners.has(event_name) and not _listeners[event_name].is_empty()

## 获取当前注册的所有事件名称列表
static func get_event_names() -> Array:
	return _listeners.keys()

## 获取指定事件的监听器数量
static func get_listener_count(event_name: String) -> int:
	if _listeners.has(event_name):
		return _listeners[event_name].size()
	return 0

# -------------------------------------------------------------------------
# 内部注册辅助
# -------------------------------------------------------------------------
static func _register_listener(event_name: String, callback: Callable, is_once: bool, context_node: Node) -> void:
	if not callback.is_valid():
		push_error("[GEvent] 注册事件监听失败: callback 不是合法的 Callable")
		return
		
	if not _listeners.has(event_name):
		_listeners[event_name] = []
		
	var item = {
		"callback": callback,
		"is_once": is_once,
		"node": context_node
	}
	_listeners[event_name].append(item)
	
	# 如果传入了 context_node，自动监听 tree_exited 并在销毁时自动移除监听
	if context_node and is_instance_valid(context_node):
		if not context_node.tree_exited.is_connected(off_all_for_node.bind(context_node)):
			context_node.tree_exited.connect(off_all_for_node.bind(context_node), CONNECT_ONE_SHOT)
