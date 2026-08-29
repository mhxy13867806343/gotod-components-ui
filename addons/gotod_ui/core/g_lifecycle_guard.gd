@tool
class_name GLifecycleGuard
extends RefCounted

## Godot 4 API 生命周期安全守护拦截器 (API Lifecycle Guard & Exception Interceptor)
## 强校验 API 是否在合法的 Godot 节点生命周期（_ready, _process, is_inside_tree）中调用
## 若脱离生命周期调用，主动触发 Godot push_error 异常，并向用户返回结构化错误与指引

## 强校验节点生命周期状态
## @param caller_node 调用 API 的 Node 实例 (如 self)
## @param api_name 被调用的 API 方法名 (如 "GRouter.push", "GDialog.alert")
## @return GResult 包含是否合法、错误码与友好修复指引
static func check(caller_node: Node, api_name: String) -> GResult:
	# 1. 检查是否传入了 null 节点
	if not is_instance_valid(caller_node):
		var err_msg = "❌ [GotodUI 生命周期异常] 调用 API '%s' 时未传入有效的 Node 实例！" % api_name
		var hint_msg = "请在参数中传递当前挂载在场景树上的上下文节点 (如 'self')。"
		push_error(err_msg + " -> " + hint_msg)
		return GResult.fail("ERR_NULL_NODE", err_msg, hint_msg)
		
	# 2. 检查节点是否已挂载到场景树 (is_inside_tree)
	if not caller_node.is_inside_tree():
		var node_name = caller_node.name if caller_node else "Unknown"
		var err_msg = "❌ [GotodUI 生命周期异常] API '%s' 必须在 Godot 节点生命周期内调用！当前节点 '%s' 尚未挂载到场景树 (is_inside_tree == false)。" % [api_name, node_name]
		var hint_msg = "请确保在 Node 的 '_ready()'、'_process()' 或通过 'add_child()' 挂载后再调用此 API；切勿在 '_init()' 或未挂载的裸对象中调用 UI/路由操作。"
		push_error(err_msg + " -> " + hint_msg)
		return GResult.fail("ERR_NOT_IN_SCENETREE", err_msg, hint_msg)
		
	# 3. 检查场景树是否正处于退出阶段
	var tree = caller_node.get_tree()
	if not tree:
		var err_msg = "❌ [GotodUI 生命周期异常] 无法获取 SceneTree，场景可能正在销毁。"
		push_error(err_msg)
		return GResult.fail("ERR_NO_SCENETREE", err_msg, "避免在游戏退出销毁阶段调用此 API。")
		
	return GResult.ok(null, "生命周期状态正常")

## 包装并安全执行 API 业务逻辑
## 若生命周期非法，拦截执行并返回带有清晰异常提示的 GResult
static func guard_execute(caller_node: Node, api_name: String, action_callable: Callable) -> GResult:
	var check_res = check(caller_node, api_name)
	if not check_res.success:
		return check_res
		
	# 生命周期正常，安全执行实际业务
	var result_data = action_callable.call()
	if result_data is GResult:
		return result_data
	return GResult.ok(result_data, "执行成功")
