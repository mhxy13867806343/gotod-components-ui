extends Control

@onready var nav_list: VBoxContainer = $HSplit/Sidebar/Scroll/NavList
@onready var content_title: Label = $HSplit/MainArea/Header/Title
@onready var content_container: VBoxContainer = $HSplit/MainArea/Scroll/Content
@onready var preset_option: OptionButton = $HSplit/MainArea/Header/PresetOption
@onready var theme_toggle: Button = $HSplit/MainArea/Header/ThemeToggle

var current_page: String = "button"
var is_dark_mode: bool = true

func _ready() -> void:
	_init_theme_controls()
	_init_sidebar()
	_show_page("button")

func _init_theme_controls() -> void:
	preset_option.clear()
	preset_option.add_item("Naive UI (Green)", 0)
	preset_option.add_item("Element Plus (Blue)", 1)
	preset_option.add_item("Ant Design (Geek Blue)", 2)
	preset_option.add_item("Vant UI (Mobile Style)", 3)
	preset_option.item_selected.connect(_on_preset_selected)
	
	theme_toggle.pressed.connect(_on_toggle_theme)

func _on_preset_selected(idx: int) -> void:
	if GotodTheme.instance:
		match idx:
			0: GotodTheme.instance.current_preset = GThemeTokens.Preset.NAIVE_UI
			1: GotodTheme.instance.current_preset = GThemeTokens.Preset.ELEMENT_PLUS
			2: GotodTheme.instance.current_preset = GThemeTokens.Preset.ANT_DESIGN
			3: GotodTheme.instance.current_preset = GThemeTokens.Preset.VANT_UI

func _on_toggle_theme() -> void:
	is_dark_mode = !is_dark_mode
	theme_toggle.text = "🌙 Dark" if is_dark_mode else "☀️ Light"
	if GotodTheme.instance:
		GotodTheme.instance.current_mode = GThemeTokens.Mode.DARK if is_dark_mode else GThemeTokens.Mode.LIGHT

func _init_sidebar() -> void:
	for child in nav_list.get_children():
		child.queue_free()
		
	var categories = [
			{"name": "General", "items": [
				{"id": "button", "label": "Button 按钮"},
				{"id": "text", "label": "Text / Typography 文本"},
				{"id": "divider", "label": "Divider 分割线"},
				{"id": "menu", "label": "Menu 菜单导航"},
			]},
		{"name": "Form Controls", "items": [
			{"id": "input", "label": "Input 输入框"},
			{"id": "textarea", "label": "Textarea 文本域"},
			{"id": "input_number", "label": "InputNumber 数字输入"},
			{"id": "switch", "label": "Switch 开关"},
			{"id": "checkbox", "label": "Checkbox 多选框"},
			{"id": "radio", "label": "Radio 单选框"},
			{"id": "select", "label": "Select 下拉选择"},
			{"id": "slider", "label": "Slider 滑块"},
			{"id": "form", "label": "Form 表单校验"},
		]},
		{"name": "Feedback", "items": [
			{"id": "dialog", "label": "Dialog / Modal 弹窗"},
			{"id": "message", "label": "Message 全局消息"},
			{"id": "alert", "label": "Alert 警告提示"},
			{"id": "drawer", "label": "Drawer 抽屉"},
		]},
		{"name": "Data Display", "items": [
			{"id": "card", "label": "Card 卡片"},
			{"id": "tag", "label": "Tag 标签"},
			{"id": "badge", "label": "Badge 徽标"},
			{"id": "avatar", "label": "Avatar 头像"},
			{"id": "progress", "label": "Progress 进度条"},
			{"id": "tabs", "label": "Tabs 标签页"},
			{"id": "collapse", "label": "Collapse 折叠面板"},
			{"id": "steps", "label": "Steps 步骤条"},
		]}
	]
	
	for cat in categories:
		var cat_lbl = Label.new()
		cat_lbl.text = cat["name"]
		cat_lbl.add_theme_font_size_override("font_size", 12)
		cat_lbl.add_theme_color_override("font_color", Color("#767c82"))
		nav_list.add_child(cat_lbl)
		
		for item in cat["items"]:
			var btn = GButton.new()
			btn.text = item["label"]
			btn.button_type = GButton.ButtonType.DEFAULT
			btn.variant = GButton.Variant.TEXT
			btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			btn.pressed.connect(_show_page.bind(item["id"]))
			nav_list.add_child(btn)

func _show_page(page_id: String) -> void:
	current_page = page_id
	for child in content_container.get_children():
		child.queue_free()

		match page_id:
			"button": _render_button_demo()
			"menu": _render_menu_demo()
			"input": _render_input_demo()
			"dialog": _render_dialog_demo()
		"message": _render_message_demo()
		"switch": _render_switch_demo()
		"checkbox": _render_checkbox_demo()
		"radio": _render_radio_demo()
		"select": _render_select_demo()
		"slider": _render_slider_demo()
		"card": _render_card_demo()
		"tag": _render_tag_demo()
		"progress": _render_progress_demo()
		"alert": _render_alert_demo()
		"drawer": _render_drawer_demo()
		"steps": _render_steps_demo()
		_: _render_button_demo()

func _render_button_demo() -> void:
	content_title.text = "Button 按钮"
	
	var card1 = GCard.new()
	card1.title = "Button Types 按钮类型"
	var space1 = GSpace.new()
	
	var types = [
		{"type": GButton.ButtonType.DEFAULT, "text": "Default"},
		{"type": GButton.ButtonType.PRIMARY, "text": "Primary"},
		{"type": GButton.ButtonType.SUCCESS, "text": "Success"},
		{"type": GButton.ButtonType.WARNING, "text": "Warning"},
		{"type": GButton.ButtonType.DANGER, "text": "Danger"},
		{"type": GButton.ButtonType.INFO, "text": "Info"}
	]
	for t in types:
		var btn = GButton.new()
		btn.button_type = t["type"]
		btn.text = t["text"]
		space1.add_child(btn)
	card1.get_node("VBoxContainer").add_child(space1)
	content_container.add_child(card1)
	
	var card2 = GCard.new()
	card2.title = "Variants 按钮形态"
	var space2 = GSpace.new()
	var variants = [
		{"variant": GButton.Variant.SOLID, "text": "Solid Primary"},
		{"variant": GButton.Variant.OUTLINE, "text": "Outline Primary"},
		{"variant": GButton.Variant.DASHED, "text": "Dashed Primary"},
		{"variant": GButton.Variant.TEXT, "text": "Text Primary"},
		{"variant": GButton.Variant.LINK, "text": "Link Primary"},
	]
	for v in variants:
		var btn = GButton.new()
		btn.button_type = GButton.ButtonType.PRIMARY
		btn.variant = v["variant"]
		btn.text = v["text"]
		space2.add_child(btn)
	card2.get_node("VBoxContainer").add_child(space2)
	content_container.add_child(card2)

func _render_menu_demo() -> void:
	content_title.text = "Menu 菜单导航"
	var card = GCard.new()
	card.title = "Vertical Menu"
	var menu = GMenu.new()
	menu.items = [
		{"index": "dashboard", "label": "仪表盘", "icon": "⌂"},
		{"index": "workbench", "label": "工作台", "icon": "▣", "children": [
			{"index": "workbench-assets", "label": "资源库", "icon": "▦"},
			{"index": "workbench-scenes", "label": "场景管理", "icon": "▶"}
		]},
		{"index": "settings", "label": "设置", "icon": "⚙"}
	]
	menu.default_openeds = ["workbench"]
	menu.active_index = "dashboard"
	menu.item_selected.connect(func(index, _path, item):
		GMessage.success("Selected: " + str(item.get("label", index)), self)
	)
	card.get_node("VBoxContainer").add_child(menu)
	content_container.add_child(card)

	var card_h = GCard.new()
	card_h.title = "Horizontal Menu (Popup Submenu)"
	var menu_h = GMenu.new()
	menu_h.mode = GMenu.MenuMode.HORIZONTAL
	menu_h.popper_placement = GMenu.PopperPlacement.AUTO
	menu_h.items = [
		{"index": "overview", "label": "总览", "icon": "⌂"},
		{"index": "workspace", "label": "工作区", "icon": "▣", "children": [
			{"index": "assets", "label": "资源库", "icon": "▦"},
			{"index": "scenes", "label": "场景管理", "icon": "▶"}
		]},
		{"index": "orders", "label": "订单", "icon": "≡"}
	]
	menu_h.active_index = "overview"
	menu_h.item_selected.connect(func(index, _path, item):
		GMessage.info("Selected: " + str(item.get("label", index)), self)
	)
	card_h.get_node("VBoxContainer").add_child(menu_h)
	content_container.add_child(card_h)

func _render_input_demo() -> void:
	content_title.text = "Input 输入框"
	var card = GCard.new()
	card.title = "Basic & Clearable Input"
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 12)
	
	var inp1 = GInput.new()
	inp1.placeholder_text = "Basic Input"
	vbox.add_child(inp1)
	
	var inp2 = GInput.new()
	inp2.placeholder_text = "Clearable Input"
	inp2.clearable = true
	inp2.text = "Initial Text"
	vbox.add_child(inp2)
	
	var inp3 = GInput.new()
	inp3.placeholder_text = "Password Input"
	inp3.secret = true
	inp3.show_password_toggle = true
	vbox.add_child(inp3)
	
	card.get_node("VBoxContainer").add_child(vbox)
	content_container.add_child(card)

func _render_dialog_demo() -> void:
	content_title.text = "Dialog 弹窗对话框"
	var card = GCard.new()
	card.title = "Interactive Modal Dialog"
	
	var btn = GButton.new()
	btn.text = "Open Confirm Dialog"
	btn.button_type = GButton.ButtonType.PRIMARY
	
	var dlg = GDialog.new()
	dlg.title = "Confirmation Required"
	dlg.content_text = "Are you sure you want to delete this file? This operation cannot be undone."
	add_child(dlg)
	
	btn.pressed.connect(func(): dlg.open())
	dlg.confirmed.connect(func(): GMessage.success("Confirmed action!"))
	dlg.cancelled.connect(func(): GMessage.info("Cancelled action"))
	
	card.get_node("VBoxContainer").add_child(btn)
	content_container.add_child(card)

func _render_message_demo() -> void:
	content_title.text = "Message 全局消息提示"
	var card = GCard.new()
	card.title = "Global Floating Toast"
	var space = GSpace.new()
	
	var b_info = GButton.new()
	b_info.text = "Info Message"
	b_info.button_type = GButton.ButtonType.INFO
	b_info.pressed.connect(func(): GMessage.info("This is an info message."))
	space.add_child(b_info)
	
	var b_succ = GButton.new()
	b_succ.text = "Success Message"
	b_succ.button_type = GButton.ButtonType.SUCCESS
	b_succ.pressed.connect(func(): GMessage.success("Successfully saved changes!"))
	space.add_child(b_succ)
	
	var b_warn = GButton.new()
	b_warn.text = "Warning Message"
	b_warn.button_type = GButton.ButtonType.WARNING
	b_warn.pressed.connect(func(): GMessage.warning("Network connection unstable."))
	space.add_child(b_warn)
	
	var b_err = GButton.new()
	b_err.text = "Error Message"
	b_err.button_type = GButton.ButtonType.DANGER
	b_err.pressed.connect(func(): GMessage.error("Failed to load resource!"))
	space.add_child(b_err)

	var b_close = GButton.new()
	b_close.text = "Closable Message"
	b_close.button_type = GButton.ButtonType.PRIMARY
	b_close.pressed.connect(func(): GMessage.display({
		"message": "Click the x icon to close this message.",
		"closable": true,
		"duration": 0.0
	}))
	space.add_child(b_close)

	card.get_node("VBoxContainer").add_child(space)
	content_container.add_child(card)

func _render_switch_demo() -> void:
	content_title.text = "Switch 开关"
	var card = GCard.new()
	card.title = "Animated Toggle Switch"
	var space = GSpace.new()
	
	var sw1 = GSwitch.new()
	sw1.checked = true
	space.add_child(sw1)
	
	var sw2 = GSwitch.new()
	sw2.switch_size = GThemeTokens.Size.LARGE
	space.add_child(sw2)
	
	card.get_node("VBoxContainer").add_child(space)
	content_container.add_child(card)

func _render_checkbox_demo() -> void:
	content_title.text = "Checkbox 多选框"
	var card = GCard.new()
	card.title = "Checkbox & Group"
	var vbox = VBoxContainer.new()
	
	var cb1 = GCheckbox.new()
	cb1.text = "Vue 3 & Vite"
	cb1.checked = true
	vbox.add_child(cb1)
	
	var cb2 = GCheckbox.new()
	cb2.text = "Godot 4.x Engine"
	cb2.checked = true
	vbox.add_child(cb2)
	
	var cb3 = GCheckbox.new()
	cb3.text = "TypeScript / GDScript"
	vbox.add_child(cb3)
	
	card.get_node("VBoxContainer").add_child(vbox)
	content_container.add_child(card)

func _render_radio_demo() -> void:
	content_title.text = "Radio 单选框"
	var card = GCard.new()
	card.title = "Radio Group"
	var group = GRadioGroup.new()
	
	var r1 = GRadio.new()
	r1.text = "Naive UI"
	group.add_child(r1)
	
	var r2 = GRadio.new()
	r2.text = "Element Plus"
	group.add_child(r2)
	
	var r3 = GRadio.new()
	r3.text = "Ant Design Vue"
	group.add_child(r3)
	
	group.selected_value = "Naive UI"
	card.get_node("VBoxContainer").add_child(group)
	content_container.add_child(card)

func _render_select_demo() -> void:
	content_title.text = "Select 下拉选择器"
	var card = GCard.new()
	card.title = "Dropdown Selector"
	
	var sel = GSelect.new()
	sel.options = [
		{"label": "Option 1: Godot 4.3", "value": "4.3"},
		{"label": "Option 2: Godot 4.4", "value": "4.4"},
		{"label": "Option 3: Godot 4.6+", "value": "4.6"}
	]
	sel.selected_index = 0
	card.get_node("VBoxContainer").add_child(sel)
	content_container.add_child(card)

func _render_slider_demo() -> void:
	content_title.text = "Slider 滑块"
	var card = GCard.new()
	card.title = "Smooth Slider"
	
	var sl = GSlider.new()
	sl.value = 65
	card.get_node("VBoxContainer").add_child(sl)
	content_container.add_child(card)

func _render_card_demo() -> void:
	content_title.text = "Card 卡片"
	var card = GCard.new()
	card.title = "Feature Overview"
	card.extra_text = "More Details"
	
	var lbl = Label.new()
	lbl.text = "gotod-components-ui provides comprehensive components for Godot 4.x game and app development."
	card.get_node("VBoxContainer").add_child(lbl)
	content_container.add_child(card)

func _render_tag_demo() -> void:
	content_title.text = "Tag 标签"
	var card = GCard.new()
	card.title = "Tag Statuses & Variants"
	var space = GSpace.new()
	
	var t_types = [
		{"type": GThemeTokens.Status.DEFAULT, "text": "Default"},
		{"type": GThemeTokens.Status.PRIMARY, "text": "Primary"},
		{"type": GThemeTokens.Status.SUCCESS, "text": "Success"},
		{"type": GThemeTokens.Status.WARNING, "text": "Warning"},
		{"type": GThemeTokens.Status.DANGER, "text": "Danger"},
		{"type": GThemeTokens.Status.INFO, "text": "Info"}
	]
	for t in t_types:
		var tag = GTag.new()
		tag.type = t["type"]
		tag.text = t["text"]
		tag.closable = true
		space.add_child(tag)
	card.get_node("VBoxContainer").add_child(space)
	content_container.add_child(card)

func _render_progress_demo() -> void:
	content_title.text = "Progress 进度条"
	var card = GCard.new()
	card.title = "Linear & Circular Progress"
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 16)
	
	var p1 = GProgress.new()
	p1.percentage = 72.0
	p1.status = GThemeTokens.Status.PRIMARY
	vbox.add_child(p1)
	
	var p2 = GProgress.new()
	p2.percentage = 100.0
	p2.status = GThemeTokens.Status.SUCCESS
	vbox.add_child(p2)
	
	var p3 = GProgress.new()
	p3.type = GProgress.ProgressType.CIRCLE
	p3.percentage = 65.0
	p3.status = GThemeTokens.Status.WARNING
	vbox.add_child(p3)
	
	card.get_node("VBoxContainer").add_child(vbox)
	content_container.add_child(card)

func _render_alert_demo() -> void:
	content_title.text = "Alert 警告提示"
	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 12)
	
	var a1 = GAlert.new()
	a1.type = GThemeTokens.Status.INFO
	a1.title = "Informational message"
	a1.description = "Here is some helpful information for the user."
	vbox.add_child(a1)
	
	var a2 = GAlert.new()
	a2.type = GThemeTokens.Status.SUCCESS
	a2.title = "Success Tips"
	a2.closable = true
	vbox.add_child(a2)
	
	var a3 = GAlert.new()
	a3.type = GThemeTokens.Status.DANGER
	a3.title = "Error Warning"
	a3.description = "Something went wrong during data sync."
	vbox.add_child(a3)
	
	content_container.add_child(vbox)

func _render_drawer_demo() -> void:
	content_title.text = "Drawer 抽屉"
	var card = GCard.new()
	card.title = "Slide-out Sheet"
	
	var btn = GButton.new()
	btn.text = "Open Right Drawer"
	btn.button_type = GButton.ButtonType.PRIMARY
	
	var drawer = GDrawer.new()
	drawer.title = "Configuration Panel"
	add_child(drawer)
	
	btn.pressed.connect(func(): drawer.open())
	card.get_node("VBoxContainer").add_child(btn)
	content_container.add_child(card)

func _render_steps_demo() -> void:
	content_title.text = "Steps 步骤条"
	var card = GCard.new()
	card.title = "Step Process"
	
	var st = GSteps.new()
	st.steps = ["Profile Setup", "Theme Choice", "Ready to Build"]
	st.current_step = 1
	card.get_node("VBoxContainer").add_child(st)
	content_container.add_child(card)
