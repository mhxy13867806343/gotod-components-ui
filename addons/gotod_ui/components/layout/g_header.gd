@tool
class_name GHeader
extends PanelContainer

## =========================================================================
## GHeader: 顶栏容器 (Element Plus Header)
## =========================================================================

@export var height: float = 60.0:
	set(val):
		height = val
		custom_minimum_size.y = height

func _ready() -> void:
	size_flags_horizontal = Control.SIZE_EXPAND_FILL
	custom_minimum_size.y = height

## 链式样式定义
func css(rules_or_func: Variant) -> GHeader:
	GStyle.apply_css_to_instance(self, rules_or_func)
	return self
