@tool
class_name GFormat
extends RefCounted

## 游戏数据与UI通用格式化工具类 (General Game & UI Format Utilities for Godot 4)
## 提供 HP血量动态颜色、时间戳、游戏时长、货币战力大数值缩写等常用格式化方法

# ----------------------------------------------------
# 1. HP 血量与状态动态颜色格式化
# ----------------------------------------------------

## 根据 HP 当前值与最大值计算动态颜色 (绿色 -> 黄色 -> 红色危险 -> 濒死)
## @return Godot 4 Color 对象
static func hp_color(current_hp: float, max_hp: float) -> Color:
	if max_hp <= 0: return Color("#e06c75")
	var pct = clamp(current_hp / max_hp, 0.0, 1.0)
	if pct >= 0.65:
		return Color("#18a058") # 健康绿色 (Safe / Healthy)
	elif pct >= 0.30:
		return Color("#f0a020") # 警告黄色 (Warning / Injured)
	else:
		return Color("#d03050") # 濒死危险红色 (Critical / Danger)

## 获取 HP 状态标签文字
static func hp_status_text(current_hp: float, max_hp: float) -> String:
	var pct = current_hp / max_hp if max_hp > 0 else 0.0
	if pct >= 0.8: return "健康"
	elif pct >= 0.5: return "良好"
	elif pct >= 0.3: return "受创"
	elif pct > 0: return "濒死"
	else: return "阵亡"

# ----------------------------------------------------
# 2. 时间与倒计时格式化
# ----------------------------------------------------

## 将秒数格式化为时分秒字符串 (如 3665 秒 -> "01:01:05" 或 "1小时1分5秒")
static func duration(seconds: float, chinese_unit: bool = false) -> String:
	var total_sec = int(seconds)
	var hrs = total_sec / 3600
	var mins = (total_sec % 3600) / 60
	var secs = total_sec % 60
	
	if chinese_unit:
		if hrs > 0:
			return "%d小时%d分%d秒" % [hrs, mins, secs]
		elif mins > 0:
			return "%d分%d秒" % [mins, secs]
		else:
			return "%d秒" % [secs]
	else:
		if hrs > 0:
			return "%02d:%02d:%02d" % [hrs, mins, secs]
		else:
			return "%02d:%02d" % [mins, secs]

## 将时间戳转为友好相对时间 (如 "刚刚", "5分钟前", "昨天")
static func relative_time(unix_timestamp: int) -> String:
	var now = Time.get_unix_time_from_system()
	var diff = now - unix_timestamp
	if diff < 60: return "刚刚"
	elif diff < 3600: return "%d 分钟前" % [diff / 60]
	elif diff < 86400: return "%d 小时前" % [diff / 3600]
	elif diff < 2592000: return "%d 天前" % [diff / 86400]
	else: return Time.get_date_string_from_unix_time(unix_timestamp)

## 将秒数格式化为技能/倒计时文本 (如 4.5 -> "04.5s")
static func cooldown(seconds: float) -> String:
	if seconds <= 0: return "Ready"
	if seconds < 10.0:
		return "%.1fs" % seconds
	else:
		return "%ds" % int(ceil(seconds))

# ----------------------------------------------------
# 3. 数字、战力与金币大数值缩写格式化
# ----------------------------------------------------

## 大数值精简缩写 (如 12500 -> "12.5K", 1500000 -> "1.5M", 2500000000 -> "2.5B")
static func compact_number(val: float) -> String:
	if abs(val) >= 1_000_000_000:
		return "%.2fB" % (val / 1_000_000_000.0)
	elif abs(val) >= 1_000_000:
		return "%.2fM" % (val / 1_000_000.0)
	elif abs(val) >= 1_000:
		return "%.1fK" % (val / 1_000.0)
	else:
		return str(int(val))

## 千分位逗号分隔 (如 1234567 -> "1,234,567")
static func comma_number(val: int) -> String:
	var s = str(val)
	var res = ""
	var cnt = 0
	for i in range(s.length() - 1, -1, -1):
		res = s[i] + res
		cnt += 1
		if cnt % 3 == 0 and i > 0 and s[i-1] != "-":
			res = "," + res
	return res
