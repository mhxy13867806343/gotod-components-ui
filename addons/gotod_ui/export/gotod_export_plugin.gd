@tool
class_name GotodExportPlugin
extends EditorExportPlugin

var _analysis_result: Dictionary = {}
var _unused_script_paths: Array[String] = []

func _get_name() -> String:
	return "GotodUITreeShakerExportPlugin"

func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int) -> void:
	# 在开发/调试导出且未开启生产摇树时，允许完整导出
	# 在生产发布打包时，执行自动化摇树依赖分析
	_analysis_result = GotodTreeShaker.analyze_project_used_components()
	_unused_script_paths.clear()
	
	var unused_dict = _analysis_result.get("unused", {})
	for comp_name in unused_dict.keys():
		_unused_script_paths.append(unused_dict[comp_name])
		
	var used_cnt = _analysis_result.get("used_count", 0)
	var unused_cnt = _analysis_result.get("unused_count", 0)
	var total_cnt = _analysis_result.get("total_count", 0)
	
	print("\n=======================================================")
	print("[GotodUI Tree-Shaker] 生产环境按需打包与摇树优化已激活:")
	print("  • 项目中实际使用的组件 (%d/%d): %s" % [used_cnt, total_cnt, str(_analysis_result.get("used", {}).keys())])
	print("  • 自动剔除未引用的组件 (%d 个): %s" % [unused_cnt, str(unused_dict.keys())])
	print("=======================================================\n")

func _export_file(file_path: String, type: String, features: PackedStringArray) -> void:
	# 如果当前要打包的文件是未被项目引用的组件脚本，调用 skip() 排除出导出包
	if file_path in _unused_script_paths:
		skip()
