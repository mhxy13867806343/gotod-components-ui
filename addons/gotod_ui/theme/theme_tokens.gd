class_name GThemeTokens
extends RefCounted

enum Preset {
	NAIVE_UI,
	ELEMENT_PLUS,
	ANT_DESIGN,
	VANT_UI,
	CUSTOM
}

enum Mode {
	LIGHT,
	DARK
}

enum Size {
	SMALL,
	MEDIUM,
	LARGE
}

enum Status {
	DEFAULT,
	PRIMARY,
	SUCCESS,
	WARNING,
	DANGER,
	INFO
}

static func get_preset_colors(preset: Preset = Preset.NAIVE_UI) -> Dictionary:
	match preset:
		Preset.ELEMENT_PLUS:
			return {
				"primary": Color("#409eff"),
				"primary_hover": Color("#66b1ff"),
				"primary_active": Color("#3a8ee6"),
				"primary_light": Color("#ecf5ff"),
				"success": Color("#67c23a"),
				"success_hover": Color("#85ce61"),
				"success_light": Color("#f0f9eb"),
				"warning": Color("#e6a23c"),
				"warning_hover": Color("#ebb563"),
				"warning_light": Color("#fdf6ec"),
				"danger": Color("#f56c6c"),
				"danger_hover": Color("#f78989"),
				"danger_light": Color("#fef0f0"),
				"info": Color("#909399"),
				"info_hover": Color("#a6a9ad"),
				"info_light": Color("#f4f4f5"),
			}
		Preset.ANT_DESIGN:
			return {
				"primary": Color("#1677ff"),
				"primary_hover": Color("#4096ff"),
				"primary_active": Color("#0958d9"),
				"primary_light": Color("#e6f4ff"),
				"success": Color("#52c41a"),
				"success_hover": Color("#73d13d"),
				"success_light": Color("#f6ffed"),
				"warning": Color("#faad14"),
				"warning_hover": Color("#ffc53d"),
				"warning_light": Color("#fffbe6"),
				"danger": Color("#ff4d4f"),
				"danger_hover": Color("#ff7875"),
				"danger_light": Color("#fff1f0"),
				"info": Color("#1677ff"),
				"info_hover": Color("#4096ff"),
				"info_light": Color("#e6f4ff"),
			}
		Preset.VANT_UI:
			return {
				"primary": Color("#1989fa"),
				"primary_hover": Color("#399bfb"),
				"primary_active": Color("#0570db"),
				"primary_light": Color("#e8f4ff"),
				"success": Color("#07c160"),
				"success_hover": Color("#28d079"),
				"success_light": Color("#e6faf0"),
				"warning": Color("#ff976a"),
				"warning_hover": Color("#ffab85"),
				"warning_light": Color("#fff5f0"),
				"danger": Color("#ee0a24"),
				"danger_hover": Color("#f13247"),
				"danger_light": Color("#feecee"),
				"info": Color("#969799"),
				"info_hover": Color("#abadb0"),
				"info_light": Color("#f7f8fa"),
			}
		_: # Preset.NAIVE_UI default
			return {
				"primary": Color("#18a058"),
				"primary_hover": Color("#36ad6a"),
				"primary_active": Color("#0c7a43"),
				"primary_light": Color("#e7f6ed"),
				"success": Color("#18a058"),
				"success_hover": Color("#36ad6a"),
				"success_light": Color("#e7f6ed"),
				"warning": Color("#f0a020"),
				"warning_hover": Color("#fcb040"),
				"warning_light": Color("#fef6e9"),
				"danger": Color("#d03050"),
				"danger_hover": Color("#de576d"),
				"danger_light": Color("#fbecee"),
				"info": Color("#2080f0"),
				"info_hover": Color("#4098fc"),
				"info_light": Color("#e8f3fe"),
			}

static func get_mode_colors(mode: Mode = Mode.DARK) -> Dictionary:
	if mode == Mode.DARK:
		return {
			"bg_base": Color("#121214"),
			"bg_surface": Color("#18181c"),
			"bg_card": Color("#242428"),
			"bg_popover": Color("#28282c"),
			"bg_overlay": Color(0, 0, 0, 0.65),
			"text_primary": Color("#f0f0f5"),
			"text_regular": Color("#d0d0d8"),
			"text_secondary": Color("#90909e"),
			"text_disabled": Color("#555560"),
			"border_base": Color("#383842"),
			"border_light": Color("#2e2e36"),
			"divider": Color("#303038"),
			"hover_overlay": Color(1, 1, 1, 0.06),
			"active_overlay": Color(1, 1, 1, 0.12),
		}
	else:
		return {
			"bg_base": Color("#f7f8fa"),
			"bg_surface": Color("#ffffff"),
			"bg_card": Color("#ffffff"),
			"bg_popover": Color("#ffffff"),
			"bg_overlay": Color(0, 0, 0, 0.45),
			"text_primary": Color("#1f2225"),
			"text_regular": Color("#333639"),
			"text_secondary": Color("#767c82"),
			"text_disabled": Color("#b3b5b8"),
			"border_base": Color("#dcdfe6"),
			"border_light": Color("#e4e7ed"),
			"divider": Color("#ebeef5"),
			"hover_overlay": Color(0, 0, 0, 0.04),
			"active_overlay": Color(0, 0, 0, 0.08),
		}

static func get_radius_tokens() -> Dictionary:
	return {
		"small": 4.0,
		"base": 6.0,
		"large": 10.0,
		"round": 999.0
	}

static func get_size_dimensions(size: Size = Size.MEDIUM) -> Dictionary:
	match size:
		Size.SMALL:
			return {
				"height": 28.0,
				"padding_h": 10.0,
				"padding_v": 4.0,
				"font_size": 12,
				"radius": 4.0,
				"icon_size": 14.0
			}
		Size.LARGE:
			return {
				"height": 42.0,
				"padding_h": 20.0,
				"padding_v": 10.0,
				"font_size": 16,
				"radius": 8.0,
				"icon_size": 20.0
			}
		_: # Medium
			return {
				"height": 34.0,
				"padding_h": 16.0,
				"padding_v": 6.0,
				"font_size": 14,
				"radius": 6.0,
				"icon_size": 16.0
			}
