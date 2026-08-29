@tool
class_name GLifecycleGuardian
extends Node

## Godot 引擎生命周期守护与卡死异常自动保存 (Engine Lifecycle Guardian & Freeze Watchdog)
## 自动在 Godot 引擎生命周期通知中触发中断存储，无需手动干预！
## 监听: 异常关闭、崩溃通知、窗口切出后台、移动端暂停、主线程卡顿看门狗

static var instance: GLifecycleGuardian = null

## 业务层注册状态收集回调 (用于自动保存时抓取当前玩家与游戏数据)
static var _state_providers: Array[Callable] = []

## 看门狗配置
var enable_watchdog: bool = true
var watchdog_heartbeat_interval: float = 30.0 # 每 30 秒自动快照
var _last_heartbeat_time: float = 0.0

func _enter_tree() -> void:
	instance = self
	process_mode = Node.PROCESS_MODE_ALWAYS # 即使游戏被暂停 (get_tree().paused = true) 也持续运行守护

func _ready() -> void:
	_last_heartbeat_time = Time.get_unix_time_from_system()

## 注册自定义状态收集器 (在业务脚本中挂载)
static func register_state_provider(provider_callback: Callable) -> void:
	if not _state_providers.has(provider_callback):
		_state_providers.append(provider_callback)

## 移除状态收集器
static func unregister_state_provider(provider_callback: Callable) -> void:
	_state_providers.erase(provider_callback)

## 收集当前所有已注册模块的数据快照
static func collect_all_game_state() -> Dictionary:
	var combined_state: Dictionary = {
		"_guardian_timestamp": Time.get_unix_time_from_system(),
		"_datetime": Time.get_datetime_string_from_system()
	}
	for provider in _state_providers:
		if provider.is_valid():
			var data = provider.call()
			if data is Dictionary:
				combined_state.merge(data, true)
	return combined_state

## 核心: 捕获 Godot 官方生命周期通知
func _notification(what: int) -> void:
	match what:
		# 1. 窗口关闭请求 (用户点击 X、Alt+F4 或任务管理器终止)
		NOTIFICATION_WM_CLOSE_REQUEST:
			_perform_emergency_save("生命周期守护: 窗口关闭请求 (WM_CLOSE_REQUEST)")
			
		# 2. 移动端/全屏切出后台或游戏被暂停
		NOTIFICATION_APPLICATION_PAUSED, NOTIFICATION_APPLICATION_FOCUS_OUT:
			_perform_emergency_save("生命周期守护: 游戏切后台/失去焦点 (APPLICATION_PAUSED)")
			
		# 3. 移动端返回键退出
		NOTIFICATION_WM_GO_BACK_REQUEST:
			_perform_emergency_save("生命周期守护: 移动端返回键退出 (WM_GO_BACK_REQUEST)")
			
		# 4. 引擎节点树销毁前夕
		NOTIFICATION_PREDELETE:
			_perform_emergency_save("生命周期守护: 引擎销毁前夕 (PREDELETE)")
			
		# 5. 引擎崩溃通知 (如果引擎触发了崩溃钩子)
		NOTIFICATION_CRASH:
			_perform_emergency_save("🚨 紧急守护: 游戏发生严重崩溃 (NOTIFICATION_CRASH)")

## 心跳看门狗 (在 _process 中检测卡死或定时静默备份)
func _process(delta: float) -> void:
	if not enable_watchdog: return
	
	var now = Time.get_unix_time_from_system()
	if now - _last_heartbeat_time >= watchdog_heartbeat_interval:
		_last_heartbeat_time = now
		_perform_emergency_save("心跳看门狗: 定时静默防卡死快照 (Heartbeat Auto-Save)")

## 触发紧急写入中断存储
static func _perform_emergency_save(reason: String) -> void:
	var state_data = collect_all_game_state()
	GSaveManager.save_checkpoint(reason, state_data)
	print("[GLifecycleGuardian] 已在 Godot 生命周期中自动触发中断存档: ", reason)
