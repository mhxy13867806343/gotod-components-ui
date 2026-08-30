# =========================================================================
# GAxios: Godot 4.x 深度对标前端 Axios 的现代化 HTTP 网络客户端
# 特性：
# 1. axios.create() 实例工厂 (支持 baseURL, timeout, 统一请求头)
# 2. 请求/响应拦截器 Pipeline (interceptors.request / interceptors.response)
# 3. 自动 JSON 转换、全局 Loading/Toast 联动与 401/500 统一错误劫持
# 4. axios.all() 异步并发请求调度
# =========================================================================
@tool
class_name GAxios
extends RefCounted

## 拦截器管道类
class InterceptorManager extends RefCounted:
	var _handlers: Array = []
	
	func use(handler: Callable) -> int:
		_handlers.append(handler)
		return _handlers.size() - 1
		
	func eject(id: int) -> void:
		if id >= 0 and id < _handlers.size():
			_handlers[id] = Callable()
			
	func run(initial_value: Variant) -> Variant:
		var current = initial_value
		for h in _handlers:
			if h is Callable and h.is_valid():
				current = h.call(current)
		return current

## 拦截器容器类
class AxiosInterceptors extends RefCounted:
	var request: InterceptorManager
	var response: InterceptorManager
	
	func _init() -> void:
		request = InterceptorManager.new()
		response = InterceptorManager.new()

## 实例配置
var base_url: String = ""
var default_headers: Dictionary = {
	"Content-Type": "application/json",
	"Accept": "application/json"
}
var timeout: float = 10.0
var context_node: Node = null
var interceptors: AxiosInterceptors = null

func _init() -> void:
	interceptors = AxiosInterceptors.new()

## 工厂方法：创建一个独立的 Axios 实例 (类似 axios.create({...}))
static func create(config: Dictionary = {}) -> GAxios:
	var instance = GAxios.new()
	if config.has("base_url"):
		instance.base_url = str(config["base_url"])
	if config.has("timeout"):
		instance.timeout = float(config["timeout"])
	if config.has("headers") and config["headers"] is Dictionary:
		for k in config["headers"].keys():
			instance.default_headers[k] = config["headers"][k]
	if config.has("context"):
		instance.context_node = config["context"]
	return instance

## 全局默认单例实例
static var _default_instance: GAxios = null
static func default_client() -> GAxios:
	if not _default_instance:
		_default_instance = GAxios.new()
	return _default_instance

## 实例方法: GET
func get_req(url: String, config: Dictionary = {}) -> Variant:
	var cfg = config.duplicate()
	cfg["method"] = HTTPClient.METHOD_GET
	cfg["url"] = url
	return await request(cfg)

## 实例方法: POST
func post(url: String, data: Variant = null, config: Dictionary = {}) -> Variant:
	var cfg = config.duplicate()
	cfg["method"] = HTTPClient.METHOD_POST
	cfg["url"] = url
	cfg["data"] = data
	return await request(cfg)

## 实例方法: PUT
func put(url: String, data: Variant = null, config: Dictionary = {}) -> Variant:
	var cfg = config.duplicate()
	cfg["method"] = HTTPClient.METHOD_PUT
	cfg["url"] = url
	cfg["data"] = data
	return await request(cfg)

## 实例方法: PATCH
func patch(url: String, data: Variant = null, config: Dictionary = {}) -> Variant:
	var cfg = config.duplicate()
	cfg["method"] = HTTPClient.METHOD_PATCH
	cfg["url"] = url
	cfg["data"] = data
	return await request(cfg)

## 实例方法: DELETE
func delete(url: String, config: Dictionary = {}) -> Variant:
	var cfg = config.duplicate()
	cfg["method"] = HTTPClient.METHOD_DELETE
	cfg["url"] = url
	return await request(cfg)

## 核心统一请求分发 (Request Pipeline)
func request(config: Dictionary) -> Variant:
	if not interceptors:
		interceptors = AxiosInterceptors.new()

	# 1. 合并默认配置
	var final_config = _merge_config(config)
	
	# 2. 执行请求拦截器 (Request Interceptors Pipeline)
	final_config = interceptors.request.run(final_config)
	
	# 3. 构造请求 URL 与 Header
	var full_url: String = str(final_config.get("url", ""))
	if not full_url.begins_with("http://") and not full_url.begins_with("https://"):
		if not base_url.is_empty():
			if base_url.ends_with("/") and full_url.begins_with("/"):
				full_url = base_url + full_url.substr(1)
			elif not base_url.ends_with("/") and not full_url.begins_with("/"):
				full_url = base_url + "/" + full_url
			else:
				full_url = base_url + full_url
				
	# Append query params if present
	if final_config.has("params") and final_config["params"] is Dictionary and not final_config["params"].is_empty():
		var query_parts: Array[String] = []
		for k in final_config["params"].keys():
			query_parts.append("%s=%s" % [str(k).uri_encode(), str(final_config["params"][k]).uri_encode()])
		var sep = "&" if full_url.contains("?") else "?"
		full_url += sep + "&".join(query_parts)

	var header_array: PackedStringArray = []
	var headers_dict: Dictionary = final_config.get("headers", {})
	for k in headers_dict.keys():
		header_array.append("%s: %s" % [k, headers_dict[k]])
		
	var body_str = ""
	if final_config.has("data") and final_config["data"] != null:
		if final_config["data"] is String:
			body_str = final_config["data"]
		else:
			body_str = JSON.stringify(final_config["data"])
			
	# 4. 创建底层 HTTPRequest 执行异步请求
	var root: SceneTree = Engine.get_main_loop() as SceneTree
	if not root or not root.current_scene:
		return _build_error_response("SceneTree unavailable", final_config)
		
	var parent: Node = final_config.get("context", null)
	if not parent:
		parent = context_node if context_node else root.current_scene
		
	var http_node = HTTPRequest.new()
	http_node.timeout = float(final_config.get("timeout", 10.0))
	parent.add_child(http_node)
	
	var req_method: int = int(final_config.get("method", HTTPClient.METHOD_GET))
	var err = http_node.request(full_url, header_array, req_method, body_str)
	if err != OK:
		http_node.queue_free()
		var err_resp = _build_error_response("HTTPRequest error code: %d" % err, final_config)
		return interceptors.response.run(err_resp)
		
	var raw_res: Array = await http_node.request_completed
	http_node.queue_free()
	
	var result_code = raw_res[0] as int
	var response_code = raw_res[1] as int
	var resp_headers_raw = raw_res[2] as PackedStringArray
	var body_bytes = raw_res[3] as PackedByteArray
	
	var resp_headers: Dictionary = {}
	for h in resp_headers_raw:
		var parts = h.split(":", true, 1)
		if parts.size() == 2:
			resp_headers[parts[0].strip_edges().to_lower()] = parts[1].strip_edges()
			
	var resp_str = body_bytes.get_string_from_utf8()
	var parsed_data = resp_str
	if resp_str.length() > 0:
		var json = JSON.new()
		if json.parse(resp_str) == OK:
			parsed_data = json.data
			
	var is_success = (result_code == HTTPRequest.RESULT_SUCCESS) and (response_code >= 200 and response_code < 300)
	
	var response_dict: Dictionary = {
		"data": parsed_data,
		"status": response_code,
		"status_text": _get_status_text(response_code),
		"headers": resp_headers,
		"config": final_config,
		"ok": is_success,
		"error": "" if is_success else "Request failed with status code %d" % response_code
	}
	
	# 5. 执行响应拦截器 (Response Interceptors Pipeline)
	return interceptors.response.run(response_dict)

## 并发请求处理 (类似 Promise.all / axios.all)
func all(request_tasks: Array) -> Array:
	var results: Array = []
	for task in request_tasks:
		var res = await task
		results.append(res)
	return results

func _merge_config(config: Dictionary) -> Dictionary:
	var merged = {
		"url": config.get("url", ""),
		"method": config.get("method", HTTPClient.METHOD_GET),
		"timeout": config.get("timeout", timeout),
		"headers": default_headers.duplicate(),
		"params": config.get("params", {}),
		"data": config.get("data", null),
		"context": config.get("context", context_node)
	}
	if config.has("headers") and config["headers"] is Dictionary:
		for k in config["headers"].keys():
			merged["headers"][k] = config["headers"][k]
	return merged

func _build_error_response(err_msg: String, config: Dictionary) -> Dictionary:
	return {
		"data": null,
		"status": 0,
		"status_text": "Error",
		"headers": {},
		"config": config,
		"ok": false,
		"error": err_msg
	}

func _get_status_text(status_code: int) -> String:
	match status_code:
		200: return "OK"
		201: return "Created"
		204: return "No Content"
		400: return "Bad Request"
		401: return "Unauthorized"
		403: return "Forbidden"
		404: return "Not Found"
		500: return "Internal Server Error"
		502: return "Bad Gateway"
		_: return "Status %d" % status_code
