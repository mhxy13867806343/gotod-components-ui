@tool
class_name GCustomSignal
extends RefCounted

## 类化自定义信号发射器 (Class-based Custom Signal System)
## 允许动态创建具名自定义信号对象，支持类型化参数、连接与一键断开

var signal_name: String
var _callbacks: Array[Callable] = []

static func define(sig_name: String) -> GCustomSignal:
	var sig = GCustomSignal.new()
	sig.signal_name = sig_name
	return sig

## 连接自定义监听
func connect_signal(callback: Callable) -> GCustomSignal:
	if not _callbacks.has(callback):
		_callbacks.append(callback)
	return self

## 断开连接
func disconnect_signal(callback: Callable) -> void:
	_callbacks.erase(callback)

## 发射自定义信号
func emit(arg1: Variant = null, arg2: Variant = null, arg3: Variant = null) -> void:
	for cb in _callbacks.duplicate():
		if cb.is_valid():
			var args: Array = []
			if arg1 != null: args.append(arg1)
			if arg2 != null: args.append(arg2)
			if arg3 != null: args.append(arg3)
			cb.callv(args)

## 清除全部连接
func clear_connections() -> void:
	_callbacks.clear()
