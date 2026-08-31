@tool
class_name GotodTreeShaker
extends RefCounted

## 扫描项目中所有 .tscn 和 .gd 文件，分析哪些 Gotod UI 组件被实际引用
static func analyze_project_used_components() -> Dictionary:
	var used_components: Dictionary = {}
	var unused_components: Dictionary = {}
	
	# 全部 28+ 个组件列表映射 (组件名 -> 相对脚本路径)
	var all_components: Dictionary = {
		"GButton": "res://addons/gotod_ui/components/general/g_button.gd",
		"GText": "res://addons/gotod_ui/components/general/g_text.gd",
		"GDivider": "res://addons/gotod_ui/components/general/g_divider.gd",
		"GIcon": "res://addons/gotod_ui/components/general/g_icon.gd",
		"GMenu": "res://addons/gotod_ui/components/navigation/g_menu.gd",
		"GInput": "res://addons/gotod_ui/components/form/g_input.gd",
		"GTextarea": "res://addons/gotod_ui/components/form/g_textarea.gd",
		"GInputNumber": "res://addons/gotod_ui/components/form/g_input_number.gd",
		"GSelect": "res://addons/gotod_ui/components/form/g_select.gd",
		"GSwitch": "res://addons/gotod_ui/components/form/g_switch.gd",
		"GCheckbox": "res://addons/gotod_ui/components/form/g_checkbox.gd",
		"GCheckboxGroup": "res://addons/gotod_ui/components/form/g_checkbox_group.gd",
		"GRadio": "res://addons/gotod_ui/components/form/g_radio.gd",
		"GRadioGroup": "res://addons/gotod_ui/components/form/g_radio_group.gd",
		"GSlider": "res://addons/gotod_ui/components/form/g_slider.gd",
		"GForm": "res://addons/gotod_ui/components/form/g_form.gd",
		"GFormItem": "res://addons/gotod_ui/components/form/g_form_item.gd",
		"GDialog": "res://addons/gotod_ui/components/feedback/g_dialog.gd",
		"GMessageBox": "res://addons/gotod_ui/components/feedback/g_message_box.gd",
		"GNotification": "res://addons/gotod_ui/components/feedback/g_notification.gd",
		"GAlert": "res://addons/gotod_ui/components/feedback/g_alert.gd",
		"GDrawer": "res://addons/gotod_ui/components/feedback/g_drawer.gd",
		"GTooltip": "res://addons/gotod_ui/components/feedback/g_tooltip.gd",
		"GLoading": "res://addons/gotod_ui/components/feedback/g_loading.gd",
		"GCard": "res://addons/gotod_ui/components/data/g_card.gd",
		"GTag": "res://addons/gotod_ui/components/data/g_tag.gd",
		"GBadge": "res://addons/gotod_ui/components/data/g_badge.gd",
		"GAvatar": "res://addons/gotod_ui/components/data/g_avatar.gd",
		"GProgress": "res://addons/gotod_ui/components/data/g_progress.gd",
		"GTabs": "res://addons/gotod_ui/components/data/g_tabs.gd",
		"GCollapse": "res://addons/gotod_ui/components/data/g_collapse.gd",
		"GSteps": "res://addons/gotod_ui/components/data/g_steps.gd",
		"GSpace": "res://addons/gotod_ui/components/layout/g_space.gd",
	}
	
	# 收集项目中所有除 addons 之外的场景和脚本
	var project_files: Array[String] = []
	_scan_dir_recursive("res://", project_files)
	
	# 读取每一个文件内容，匹配组件关键字或路径
	for file_path in project_files:
		if file_path.begins_with("res://addons/gotod_ui/"):
			continue # 忽略插件自身
			
		var file = FileAccess.open(file_path, FileAccess.READ)
		if not file:
			continue
		var content = file.get_as_text()
		
		for comp_name in all_components.keys():
			var comp_path = all_components[comp_name]
			if comp_name in content or comp_path in content:
				used_components[comp_name] = comp_path
	
	for comp_name in all_components.keys():
		if not used_components.has(comp_name):
			unused_components[comp_name] = all_components[comp_name]
			
	return {
		"used": used_components,
		"unused": unused_components,
		"total_count": all_components.size(),
		"used_count": used_components.size(),
		"unused_count": unused_components.size()
	}

static func _scan_dir_recursive(path: String, result: Array[String]) -> void:
	var dir = DirAccess.open(path)
	if not dir:
		return
	dir.list_dir_begin()
	var file_name = dir.get_next()
	while file_name != "":
		if file_name != "." and file_name != "..":
			var full_path = path.path_join(file_name)
			if dir.current_is_dir():
				if not full_path.begins_with("res://.godot") and not full_path.begins_with("res://addons/gotod_ui"):
					_scan_dir_recursive(full_path, result)
			else:
				if file_name.ends_with(".tscn") or file_name.ends_with(".gd") or file_name.ends_with(".tres"):
					result.append(full_path)
		file_name = dir.get_next()
