# =========================================================================
# GHttp: Godot 4.x 现代化 Promise/Await 风格异步 HTTP 请求库
# 专为 RESTful API、JSON 交互、文件下载与 HTTPS 设计
# =========================================================================
@tool
class_name GHttp
extends RefCounted

## 响应数据结构字典
## { "ok": bool, "status": int, "data": String, "json": Variant, "headers": Dictionary, "error": String }

## 静态 GET 请求
static func get(url: String, headers: PackedStringArray = [], timeout: float = 10.0, context: Node = null) -> Dictionary:
	return await _request(url, HTTPClient.METHOD_GET, "", headers, timeout, context)

## 静态 POST JSON 请求
static func post_json(url: String, json_data: Variant, headers: PackedStringArray = [], timeout: float = 10.0, context: Node = null) -> Dictionary:
	var final_headers = Array(headers)
	var has_content_type = false
	for h in final_headers:
		if (h as String).to_lower().begins_with("content-type:"):
			has_content_type = true
			break
	if not has_content_type:
		final_headers.append("Content-Type: application/json")
	
	var body_str = JSON.stringify(json_data)
	return await _request(url, HTTPClient.METHOD_POST, body_str, PackedStringArray(final_headers), timeout, context)

## 静态 POST 表单请求
static func post_form(url: String, form_data: Dictionary, headers: PackedStringArray = [], timeout: float = 10.0, context: Node = null) -> Dictionary:
	var final_headers = Array(headers)
	final_headers.append("Content-Type: application/x-www-form-urlencoded")
	
	var query_parts: Array[String] = []
	for k in form_data.keys():
		query_parts.append("%s=%s" % [str(k).uri_encode(), str(form_data[k]).uri_encode()])
	var body_str = "&".join(query_parts)
	return await _request(url, HTTPClient.METHOD_POST, body_str, PackedStringArray(final_headers), timeout, context)

## 静态 PUT 请求
static func put_json(url: String, json_data: Variant, headers: PackedStringArray = [], timeout: float = 10.0, context: Node = null) -> Dictionary:
	var final_headers = Array(headers)
	final_headers.append("Content-Type: application/json")
	var body_str = JSON.stringify(json_data)
	return await _request(url, HTTPClient.METHOD_PUT, body_str, PackedStringArray(final_headers), timeout, context)

## 静态 DELETE 请求
static func delete(url: String, headers: PackedStringArray = [], timeout: float = 10.0, context: Node = null) -> Dictionary:
	return await _request(url, HTTPClient.METHOD_DELETE, "", headers, timeout, context)

## 内部底层请求调度器
static func _request(url: String, method: int, body: String, headers: PackedStringArray, timeout: float, context: Node) -> Dictionary:
	var root: SceneTree = Engine.get_main_loop() as SceneTree
	if not root or not root.current_scene:
		return { "ok": false, "status": 0, "data": "", "json": null, "headers": {}, "error": "SceneTree unavailable" }
	
	var parent_node: Node = context if context else root.current_scene
	var http_node = HTTPRequest.new()
	http_node.timeout = timeout
	parent_node.add_child(http_node)
	
	var err = http_node.request(url, headers, method, body)
	if err != OK:
		http_node.queue_free()
		return { "ok": false, "status": 0, "data": "", "json": null, "headers": {}, "error": "HTTPRequest error code: %d" % err }
	
	var res: Array = await http_node.request_completed
	http_node.queue_free()
	
	var result_code = res[0] as int
	var response_code = res[1] as int
	var resp_headers_raw = res[2] as PackedStringArray
	var body_bytes = res[3] as PackedByteArray
	
	var resp_headers: Dictionary = {}
	for h in resp_headers_raw:
		var parts = h.split(":", true, 1)
		if parts.size() == 2:
			resp_headers[parts[0].strip_edges().to_lower()] = parts[1].strip_edges()
	
	var resp_str = body_bytes.get_string_from_utf8()
	var json_parsed = null
	if resp_str.length() > 0:
		var json = JSON.new()
		if json.parse(resp_str) == OK:
			json_parsed = json.data
	
	var is_ok = (result_code == HTTPRequest.RESULT_SUCCESS) and (response_code >= 200 and response_code < 300)
	var err_msg = ""
	if not is_ok:
		if result_code != HTTPRequest.RESULT_SUCCESS:
			err_msg = "Network failure (Code %d)" % result_code
		else:
			err_msg = "HTTP %d Error" % response_code
	
	return {
		"ok": is_ok,
		"status": response_code,
		"data": resp_str,
		"json": json_parsed,
		"headers": resp_headers,
		"error": err_msg
	}
