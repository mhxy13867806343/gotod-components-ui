@tool
class_name GResult
extends RefCounted

## Gotod UI 通用统一 API 返回响应对象 (Unified API Response Object)
## 包含执行状态、错误码、提示信息以及详细的生命周期修复指引

var success: bool = true
var error_code: String = "OK"
var message: String = "Success"
var hint: String = ""
var data: Variant = null

static func ok(data_payload: Variant = null, msg: String = "Success") -> GResult:
	var r = GResult.new()
	r.success = true
	r.error_code = "OK"
	r.message = msg
	r.data = data_payload
	return r

static func fail(code: String, msg: String, fix_hint: String = "", data_payload: Variant = null) -> GResult:
	var r = GResult.new()
	r.success = false
	r.error_code = code
	r.message = msg
	r.hint = fix_hint
	r.data = data_payload
	return r

func to_dict() -> Dictionary:
	return {
		"success": success,
		"error_code": error_code,
		"message": message,
		"hint": hint,
		"data": data
	}

func _to_string() -> String:
	if success:
		return "[GResult: OK] %s" % message
	else:
		return "[GResult: ERROR %s] %s | 修复指引: %s" % [error_code, message, hint]
