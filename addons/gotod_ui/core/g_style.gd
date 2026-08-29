@tool
class_name GStyle
extends Object

## =========================================================================
## GStyle: 全局与专属组件样式引擎 (Dynamic Style Engine for Godot 4)
## 支持 .css({})、.css(Callable) 与 .style({ name, func }).css() 链式调用
## =========================================================================

static var _component_styles: Dictionary = {} # { "GFab": [Callable], "GButton": [Callable] }
static var _global_css_rules: Array[Variant] = [] # [Dictionary or Callable]

## 1. 全局或实例 CSS 样式配置 (.css)
## 支持 Dictionary 字典或 Callable 函数式回调
static func css(rules_or_func: Variant) -> Object:
	_global_css_rules.append(rules_or_func)
	return GStyle

## 1.1 实例级链式 CSS 应用 (返回控件自身支持流畅链式调用)
static func apply_css_to_instance(ctrl: Control, rules_or_func: Variant) -> Control:
	if not ctrl:
		return ctrl
	if rules_or_func is Dictionary:
		apply_dict_to_control(ctrl, rules_or_func)
	elif rules_or_func is Callable and rules_or_func.is_valid():
		rules_or_func.call(ctrl)
	return ctrl

## 2. 针对特定组件类型的全域定制 (.style)
## 接受 Dictionary 参数: { "name": "GFab", "func": func(fab): ... }
static func style(def: Dictionary) -> Object:
	var comp_name = def.get("name", def.get("type", ""))
	var callback = def.get("func", def.get("apply", def.get("callback", Callable())))
	if comp_name != "" and callback is Callable and callback.is_valid():
		if not _component_styles.has(comp_name):
			_component_styles[comp_name] = []
		_component_styles[comp_name].append(callback)
	return GStyle

## 3. 将样式规则递归应用到目标节点树
static func apply_to(target: Node) -> void:
	if not target:
		return
	_apply_single_node(target)
	for child in target.get_children():
		apply_to(child)

static func _apply_single_node(node: Node) -> void:
	if not (node is Control):
		return
	
	var ctrl: Control = node as Control
	
	# A. 执行针对该组件类型的 .style 回调
	var type_name = ctrl.get_class()
	if ctrl.get_script():
		var script_path = ctrl.get_script().resource_path.get_file().get_basename()
		# Match GFab, GButton, etc.
		for key in _component_styles.keys():
			if key.to_lower() == type_name.to_lower() or key.to_lower() == script_path.to_lower():
				for fn in _component_styles[key]:
					if fn is Callable and fn.is_valid():
						fn.call(ctrl)
	
	# B. 执行全域 .css 规则
	for rule in _global_css_rules:
		if rule is Dictionary:
			apply_dict_to_control(ctrl, rule)
		elif rule is Callable and rule.is_valid():
			rule.call(ctrl)

## 4. 字典样式解析器：支持 Godot 4 官方全部 StyleBox / Color / Font 属性
static func apply_dict_to_control(ctrl: Control, rules: Dictionary) -> void:
	var sb: StyleBoxFlat = null
	var current_sb = ctrl.get_theme_stylebox("normal") if ctrl.has_theme_stylebox("normal") else null
	if current_sb is StyleBoxFlat:
		sb = current_sb.duplicate()
	else:
		sb = StyleBoxFlat.new()

	var modified_sb = false

	# 背景色
	if rules.has("bg_color"):
		var col = rules["bg_color"]
		sb.bg_color = col if col is Color else Color.from_string(str(col), Color.WHITE)
		modified_sb = true

	# 圆角
	if rules.has("corner_radius"):
		var cr = rules["corner_radius"]
		if cr is int or cr is float:
			sb.set_corner_radius_all(int(cr))
		elif cr is Vector4:
			sb.corner_radius_top_left = int(cr.x)
			sb.corner_radius_top_right = int(cr.y)
			sb.corner_radius_bottom_right = int(cr.z)
			sb.corner_radius_bottom_left = int(cr.w)
		modified_sb = true

	# 描边与边框
	if rules.has("border_color"):
		var bc = rules["border_color"]
		sb.border_color = bc if bc is Color else Color.from_string(str(bc), Color.TRANSPARENT)
		modified_sb = true
	if rules.has("border_width"):
		var bw = rules["border_width"]
		if bw is int or bw is float:
			sb.set_border_width_all(int(bw))
		modified_sb = true

	# 投影
	if rules.has("shadow_color"):
		var sc = rules["shadow_color"]
		sb.shadow_color = sc if sc is Color else Color.from_string(str(sc), Color(0, 0, 0, 0.3))
		modified_sb = true
	if rules.has("shadow_size"):
		sb.shadow_size = int(rules["shadow_size"])
		modified_sb = true
	if rules.has("shadow_offset") and rules["shadow_offset"] is Vector2:
		sb.shadow_offset = rules["shadow_offset"]
		modified_sb = true

	# 内边距
	if rules.has("content_margin"):
		var cm = rules["content_margin"]
		if cm is int or cm is float:
			sb.set_content_margin_all(float(cm))
		elif cm is Vector4:
			sb.content_margin_left = cm.x
			sb.content_margin_top = cm.y
			sb.content_margin_right = cm.z
			sb.content_margin_bottom = cm.w
		modified_sb = true

	if modified_sb:
		ctrl.add_theme_stylebox_override("normal", sb)

	# 文字颜色与字号
	if rules.has("font_color"):
		var fc = rules["font_color"]
		ctrl.add_theme_color_override("font_color", fc if fc is Color else Color.from_string(str(fc), Color.WHITE))
	if rules.has("font_size"):
		ctrl.add_theme_font_size_override("font_size", int(rules["font_size"]))
	if rules.has("font") and rules["font"] is Font:
		ctrl.add_theme_font_override("font", rules["font"])
