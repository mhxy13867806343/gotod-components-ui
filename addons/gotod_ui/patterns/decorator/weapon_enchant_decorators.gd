@tool
class_name WeaponDecorator
extends WeaponComponent

## 抽象装饰器基类 (Holds reference to wrapped WeaponComponent)
var _wrapped_weapon: WeaponComponent

func _init(weapon: WeaponComponent) -> void:
	_wrapped_weapon = weapon

func get_name() -> String:
	return _wrapped_weapon.get_name()

func get_attack() -> int:
	return _wrapped_weapon.get_attack()

func get_description() -> String:
	return _wrapped_weapon.get_description()


# ==========================================
# 具体构件 (Concrete Component)
# ==========================================
class IronSword extends WeaponComponent:
	func get_name() -> String:
		return "精钢长剑"
	func get_attack() -> int:
		return 50
	func get_description() -> String:
		return "一柄普通的精钢单手剑"


# ==========================================
# 具体装饰器 (Concrete Decorators)
# ==========================================

## 烈焰附魔装饰器 (Flame Enchantment Decorator)
class FlameEnchant extends WeaponDecorator:
	func get_name() -> String:
		return "🔥 烈焰 " + _wrapped_weapon.get_name()
	func get_attack() -> int:
		return _wrapped_weapon.get_attack() + 35
	func get_description() -> String:
		return _wrapped_weapon.get_description() + "，攻击附带 35 点持续灼烧烈焰伤害"

## 寒霜附魔装饰器 (Frost Enchantment Decorator)
class FrostEnchant extends WeaponDecorator:
	func get_name() -> String:
		return "❄️ 寒霜 " + _wrapped_weapon.get_name()
	func get_attack() -> int:
		return _wrapped_weapon.get_attack() + 20
	func get_description() -> String:
		return _wrapped_weapon.get_description() + "，攻击造成 20 点冰冻伤害并减速目标 30%"

## 雷霆附魔装饰器 (Thunder Enchantment Decorator)
class ThunderEnchant extends WeaponDecorator:
	func get_name() -> String:
		return "⚡ 雷霆 " + _wrapped_weapon.get_name()
	func get_attack() -> int:
		return _wrapped_weapon.get_attack() + 45
	func get_description() -> String:
		return _wrapped_weapon.get_description() + "，击中时有 30% 概率触发连锁闪电"
