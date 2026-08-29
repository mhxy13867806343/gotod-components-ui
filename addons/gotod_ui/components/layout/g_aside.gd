@tool
class_name GAside
extends PanelContainer

## =========================================================================
## GAside: 侧边栏容器 (Element Plus Aside)
## =========================================================================

@export var width: float = 200.0:
	set(val):
		width = val
		custom_minimum_size.x = width

func _ready() -> void:
	size_flags_vertical = Control.SIZE_EXPAND_FILL
	custom_minimum_size.x = width

## 链式样式定义
func css(rules_or_func: Variant) -> GAside:
	GStyle.apply_css_to_instance(self, rules_or_func)
	return self
