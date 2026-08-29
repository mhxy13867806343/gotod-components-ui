@tool
class_name GMain
extends PanelContainer

## =========================================================================
## GMain: 主要区域容器 (Element Plus Main)
## 自动撑开占据可用剩余空间
## =========================================================================

func _ready() -> void:
	size_flags_horizontal = Control.SIZE_EXPAND_FILL
	size_flags_vertical = Control.SIZE_EXPAND_FILL

## 链式样式定义
func css(rules_or_func: Variant) -> GMain:
	GStyle.apply_css_to_instance(self, rules_or_func)
	return self
