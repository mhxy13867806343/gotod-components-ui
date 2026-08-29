@tool
extends EditorPlugin

var _export_plugin: GotodExportPlugin

const CUSTOM_TYPES = [
	# General
	{"name": "GButton", "base": "Button", "script": "res://addons/gotod_ui/components/general/g_button.gd"},
	{"name": "GText", "base": "Label", "script": "res://addons/gotod_ui/components/general/g_text.gd"},
	{"name": "GDivider", "base": "Control", "script": "res://addons/gotod_ui/components/general/g_divider.gd"},
	{"name": "GIcon", "base": "TextureRect", "script": "res://addons/gotod_ui/components/general/g_icon.gd"},
	
	# Form
	{"name": "GInput", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/form/g_input.gd"},
	{"name": "GTextarea", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/form/g_textarea.gd"},
	{"name": "GInputNumber", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/form/g_input_number.gd"},
	{"name": "GSelect", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/form/g_select.gd"},
	{"name": "GSwitch", "base": "Control", "script": "res://addons/gotod_ui/components/form/g_switch.gd"},
	{"name": "GCheckbox", "base": "HBoxContainer", "script": "res://addons/gotod_ui/components/form/g_checkbox.gd"},
	{"name": "GCheckboxGroup", "base": "BoxContainer", "script": "res://addons/gotod_ui/components/form/g_checkbox_group.gd"},
	{"name": "GRadio", "base": "HBoxContainer", "script": "res://addons/gotod_ui/components/form/g_radio.gd"},
	{"name": "GRadioGroup", "base": "BoxContainer", "script": "res://addons/gotod_ui/components/form/g_radio_group.gd"},
	{"name": "GSlider", "base": "HSlider", "script": "res://addons/gotod_ui/components/form/g_slider.gd"},
	{"name": "GForm", "base": "VBoxContainer", "script": "res://addons/gotod_ui/components/form/g_form.gd"},
	{"name": "GFormItem", "base": "VBoxContainer", "script": "res://addons/gotod_ui/components/form/g_form_item.gd"},
	
	# Feedback
	{"name": "GDialog", "base": "Control", "script": "res://addons/gotod_ui/components/feedback/g_dialog.gd"},
	{"name": "GMessageBox", "base": "Control", "script": "res://addons/gotod_ui/components/feedback/g_message_box.gd"},
	{"name": "GNotification", "base": "CanvasLayer", "script": "res://addons/gotod_ui/components/feedback/g_notification.gd"},
	{"name": "GAlert", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/feedback/g_alert.gd"},
	{"name": "GDrawer", "base": "Control", "script": "res://addons/gotod_ui/components/feedback/g_drawer.gd"},
	{"name": "GTooltip", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/feedback/g_tooltip.gd"},
	{"name": "GLoading", "base": "Control", "script": "res://addons/gotod_ui/components/feedback/g_loading.gd"},
	
	# Data
	{"name": "GCard", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/data/g_card.gd"},
	{"name": "GTag", "base": "PanelContainer", "script": "res://addons/gotod_ui/components/data/g_tag.gd"},
	{"name": "GBadge", "base": "Control", "script": "res://addons/gotod_ui/components/data/g_badge.gd"},
	{"name": "GAvatar", "base": "Control", "script": "res://addons/gotod_ui/components/data/g_avatar.gd"},
	{"name": "GProgress", "base": "Control", "script": "res://addons/gotod_ui/components/data/g_progress.gd"},
	{"name": "GTabs", "base": "VBoxContainer", "script": "res://addons/gotod_ui/components/data/g_tabs.gd"},
	{"name": "GCollapse", "base": "VBoxContainer", "script": "res://addons/gotod_ui/components/data/g_collapse.gd"},
	{"name": "GSteps", "base": "BoxContainer", "script": "res://addons/gotod_ui/components/data/g_steps.gd"},
	
	# Layout
	{"name": "GSpace", "base": "Container", "script": "res://addons/gotod_ui/components/layout/g_space.gd"},
]

func _enter_tree() -> void:
	# 注册全部 28+ 个自定义节点类型（开发环境中全部可用）
	for item in CUSTOM_TYPES:
		var script = load(item["script"])
		if script:
			add_custom_type(item["name"], item["base"], script, null)
			
	# 注册生产环境按需打包与摇树优化插件
	_export_plugin = GotodExportPlugin.new()
	add_export_plugin(_export_plugin)

func _exit_tree() -> void:
	for item in CUSTOM_TYPES:
		remove_custom_type(item["name"])
		
	if _export_plugin:
		remove_export_plugin(_export_plugin)
		_export_plugin = null
