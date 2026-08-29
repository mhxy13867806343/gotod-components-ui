@tool
class_name WeaponComponent
extends RefCounted

## 装饰器模式抽象构件接口 (Decorator Pattern - Component Interface)
## 参考: https://godothub.com/oss/gdscript-tutorial/10.object-oriented-intro/10.7.design-patterns/10.7.2.structural-patterns/10.7.2.3.decorator-pattern.html

func get_name() -> String:
	return "基础武器"

func get_attack() -> int:
	return 10

func get_description() -> String:
	return "没有任何附魔的基础武器"
