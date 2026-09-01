@tool
class_name GSteps
extends BoxContainer

@export var current_step: int = 0:
	set(val):
		current_step = val
		_rebuild_steps()

@export var steps: Array = ["Step 1", "Step 2", "Step 3"]:
	set(val):
		var arr: Array[String] = []
		for s in val:
			if s is Dictionary:
				arr.append(str(s.get("title", s.get("name", ""))))
			else:
				arr.append(str(s))
		steps = arr
		_rebuild_steps()

func _ready() -> void:
	add_theme_constant_override("separation", 16)
	_rebuild_steps()
	if GotodTheme.instance:
		GotodTheme.instance.theme_changed.connect(_rebuild_steps)

func add_step(title: String) -> void:
	steps.append(title)
	_rebuild_steps()

func add_steps(step_list: Array) -> void:
	for s in step_list:
		if s is String:
			steps.append(s)
		elif s is Dictionary:
			steps.append(s.get("title", s.get("name", "")))
	_rebuild_steps()

func _rebuild_steps() -> void:
	for child in get_children():
		child.queue_free()
		
	for i in range(steps.size()):
		var step_box = HBoxContainer.new()
		step_box.add_theme_constant_override("separation", 8)
		
		var num_lbl = Label.new()
		num_lbl.text = str(i + 1)
		num_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		num_lbl.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
		num_lbl.custom_minimum_size = Vector2(24, 24)
		
		var is_active = (i <= current_step)
		var bg_col = GotodTheme.get_color("primary") if is_active else GotodTheme.get_color("bg_surface")
		var border_col = GotodTheme.get_color("primary") if is_active else GotodTheme.get_color("border_base")
		var text_col = Color.WHITE if is_active else GotodTheme.get_color("text_secondary")
		
		var sb = GotodTheme.create_stylebox_flat(bg_col, border_col, 1, 999.0)
		num_lbl.add_theme_stylebox_override("normal", sb)
		num_lbl.add_theme_color_override("font_color", text_col)
		step_box.add_child(num_lbl)
		
		var title_lbl = Label.new()
		title_lbl.text = steps[i]
		title_lbl.add_theme_color_override("font_color", GotodTheme.get_color("text_primary") if is_active else GotodTheme.get_color("text_disabled"))
		step_box.add_child(title_lbl)
		
		add_child(step_box)
		
		if i < steps.size() - 1:
			var line = Control.new()
			line.custom_minimum_size = Vector2(30, 2)
			line.size_flags_vertical = Control.SIZE_SHRINK_CENTER
			line.draw.connect(func(): line.draw_line(Vector2(0, 1), Vector2(30, 1), GotodTheme.get_color("divider"), 1.5))
			add_child(line)

## 静态多态构建工厂 (支持 1. 数组单值 create(steps), 2. 字典对象 create({ ... }))
static func create(arg1: Variant = null, arg2: Variant = null) -> GSteps:
	var st = GSteps.new()
	if arg1 is Dictionary:
		var opts = arg1 as Dictionary
		if opts.has("steps") and opts["steps"] is Array: st.steps = opts["steps"]
		if opts.has("current_step") or opts.has("current"):
			st.current_step = int(opts.get("current_step", opts.get("current", 0)))
	elif arg1 is Array:
		st.steps = arg1
		if arg2 != null:
			st.current_step = int(arg2)
	return st

