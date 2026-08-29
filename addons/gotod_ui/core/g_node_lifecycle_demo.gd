@tool
class_name GNodeLifecycleDemo
extends Control

## Godot 4 官方全量节点生命周期参考模板 (Complete Godot 4 Lifecycle Reference)
## 演示从实例化、进树、就绪、逐帧循环、输入响应、到出树与销毁的全生命周期 API

# ----------------------------------------------------
# 1. 构造初始化阶段 (Instantiation)
# ----------------------------------------------------
## 构造函数：当通过 ClassName.new() 实例化对象时触发
## ⚠️ 注意：此时尚未挂载到场景树，严禁调用 get_tree() 或依赖树的 UI API
func _init(custom_name: String = "GotodActor") -> void:
	name = custom_name
	print("[1. _init] 节点内存实例化完成，当前处于场景树外部 (is_inside_tree = false)")

# ----------------------------------------------------
# 2. 进入场景树阶段 (Entering Tree)
# ----------------------------------------------------
## 当通过 add_child() 将该节点添加到父节点时触发
## 顺序：从父节点到子节点（自顶向下 Top-down）
func _enter_tree() -> void:
	print("[2. _enter_tree] 节点已接入场景树，可访问 get_tree()")

# ----------------------------------------------------
# 3. 就绪阶段 (Ready) - UI 初始化黄金阶段
# ----------------------------------------------------
## 当该节点及其所有子节点均已加入场景树并准备就绪后触发
## 顺序：从子节点到父节点（自底向上 Bottom-up）
## 💡 最佳实践：UI 控件属性绑定、信号连接、GRouter/GDialog API 调用均在此处！
func _ready() -> void:
	print("[3. _ready] 节点及子节点全部就绪！黄金初始化阶段 (is_inside_tree = true)")
	# 示例：连接信号
	# button.pressed.connect(_on_button_pressed)

# ----------------------------------------------------
# 4. 逐帧更新与物理循环阶段 (Process & Physics)
# ----------------------------------------------------
## 渲染帧循环更新：频率受显示器刷新率影响 (delta 为上一渲染帧耗时)
## 适合：UI 动画渐变、输入跟随、非物理逻辑
func _process(delta: float) -> void:
	# pass
	pass

## 固定物理时钟循环更新：默认固定 60Hz 触发 (不受渲染帧率波动影响)
## 适合：刚体物理运动、碰撞检测、定时器计算
func _physics_process(delta: float) -> void:
	# pass
	pass

# ----------------------------------------------------
# 5. 输入响应生命周期 (Input Handling)
# ----------------------------------------------------
## 全局原始输入事件响应 (按键按下、鼠标移动等)
func _input(event: InputEvent) -> void:
	if event is InputEventKey and event.is_pressed():
		# print("[_input] 捕获全局按键: ", event.as_text())
		pass

## 仅当没有任何 UI 控件消费该事件时触发 (常用于游戏角色移动与战斗按键)
func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_accept"):
		# print("[_unhandled_input] 触发未消费操作")
		pass

## 仅针对当前 Control UI 控件自身的输入事件 (点击该按钮/拖拽该区域)
func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed:
		print("[_gui_input] 点击了当前 UI 控件区域")

# ----------------------------------------------------
# 6. 退出场景树与销毁阶段 (Exiting Tree & Destruction)
# ----------------------------------------------------
## 当节点从场景树中被移除 (remove_child) 时触发
func _exit_tree() -> void:
	print("[6. _exit_tree] 节点已从场景树中脱离")

## 底层系统与生命周期通知统一回调
func _notification(what: int) -> void:
	match what:
		# 节点被 queue_free() 释放，内存销毁前夕的最后一次回调
		NOTIFICATION_PREDELETE:
			print("[7. NOTIFICATION_PREDELETE] 节点即将彻底从内存销毁，执行最终资源清理")
		
		# 窗口关闭请求 (点击 X 或强退)
		NOTIFICATION_WM_CLOSE_REQUEST:
			print("[NOTIFICATION_WM_CLOSE_REQUEST] 窗口关闭请求")
			
		# 移动端/全屏切出后台或游戏暂停
		NOTIFICATION_APPLICATION_PAUSED:
			print("[NOTIFICATION_APPLICATION_PAUSED] 游戏切入后台")
			
		# 游戏恢复前台
		NOTIFICATION_APPLICATION_RESUMED:
			print("[NOTIFICATION_APPLICATION_RESUMED] 游戏恢复前台")
