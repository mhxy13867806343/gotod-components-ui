# =========================================================================
# GFormat: Godot 4.x 全能数据、UI 与富文本格式化工具库
# 包含：
# 1. HP 血量动态平滑渐变色与状态判断
# 2. 时长、倒计时、相对时间 (刚刚/3天前) 与时间戳转换
# 3. 英文 K/M/B 与 中文 万/亿/万亿 大数值缩写、千分位逗号
# 4. 百分比、正负属性词条加成 (+15% / -20) 与 战力颜色
# 5. 文件大小 (B/KB/MB/GB) 与网络下载速率
# 6. 富文本 BBCode 标签快速包装与品阶着色
# 7. 字符串超长截断与敏感信息脱敏 (手机号/玩家ID)
# =========================================================================
@tool
class_name GFormat
extends RefCounted

# =========================================================================
# 1. HP 血量与状态动态颜色格式化
# =========================================================================

## 根据 HP 当前值与最大值计算动态颜色 (绿色健康 -> 黄色警告 -> 红色濒死)
static func hp_color(current_hp: float, max_hp: float) -> Color:
	if max_hp <= 0.0: return Color("#e06c75")
	var pct = clamp(current_hp / max_hp, 0.0, 1.0)
	if pct >= 0.65:
		return Color("#18a058") # 健康绿色 (Safe / Healthy)
	elif pct >= 0.30:
		return Color("#f0a020") # 警告黄色 (Warning / Injured)
	else:
		return Color("#d03050") # 濒死危险红色 (Critical / Danger)

## 获取 HP 状态标签文字
static func hp_status_text(current_hp: float, max_hp: float) -> String:
	var pct = current_hp / max_hp if max_hp > 0.0 else 0.0
	if pct >= 0.8: return "健康"
	elif pct >= 0.5: return "良好"
	elif pct >= 0.3: return "受创"
	elif pct > 0.0: return "濒死"
	else: return "阵亡"

# =========================================================================
# 2. 时间、倒计时与相对时间
# =========================================================================

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

## 将秒数格式化为技能/冷却倒计时文本 (如 4.5 -> "04.5s")
static func cooldown(seconds: float) -> String:
	if seconds <= 0.0: return "Ready"
	if seconds < 10.0:
		return "%.1fs" % seconds
	else:
		return "%ds" % int(ceil(seconds))

## 将 Unix 时间戳转为标准日期时间字符串 (格式: "YYYY-MM-DD HH:mm:ss")
static func timestamp_to_datetime_str(unix_timestamp: int) -> String:
	var dict = Time.get_datetime_dict_from_unix_time(unix_timestamp)
	return "%04d-%02d-%02d %02d:%02d:%02d" % [dict.year, dict.month, dict.day, dict.hour, dict.minute, dict.second]

# =========================================================================
# 3. 大数值、战力、金币与中文单位缩写
# =========================================================================

## 英文大数值精简缩写 (如 12500 -> "12.5K", 1500000 -> "1.50M", 2500000000 -> "2.50B")
static func compact_number(val: float) -> String:
	if abs(val) >= 1_000_000_000.0:
		return "%.2fB" % (val / 1_000_000_000.0)
	elif abs(val) >= 1_000_000.0:
		return "%.2fM" % (val / 1_000_000.0)
	elif abs(val) >= 1_000.0:
		return "%.1fK" % (val / 1_000.0)
	else:
		return str(int(val))

## 中文万/亿/万亿大数值精简缩写 (如 12500 -> "1.25万", 150000000 -> "1.50亿")
static func chinese_number(val: float) -> String:
	if abs(val) >= 100_000_000_000.0: # 1000 亿以上
		return "%.2f万亿" % (val / 100_000_000_000.0)
	elif abs(val) >= 100_000_000.0: # 1 亿以上
		return "%.2f亿" % (val / 100_000_000.0)
	elif abs(val) >= 10_000.0: # 1 万以上
		return "%.2f万" % (val / 10_000.0)
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

## 固定位补零街机得分 (如 score(450, 8) -> "00000450")
static func score_pad(val: int, total_digits: int = 8) -> String:
	return ("%0" + str(total_digits) + "d") % val

# =========================================================================
# 4. 百分比、正负属性词条加成与战力增减颜色
# =========================================================================

## 浮点数转百分比字符串 (如 0.6852 -> "68.5%")
static func percentage(val: float, decimals: int = 1) -> String:
	var fmt = "%." + str(decimals) + "f%%"
	return fmt % (val * 100.0)

## 装备属性词条正负加成格式化 (如 +15% 暴击率, -20 攻击力)
static func stat_modifier(val: float, is_percent: bool = false, decimals: int = 1) -> String:
	var prefix = "+" if val > 0.0 else ""
	if is_percent:
		var fmt = prefix + "%." + str(decimals) + "f%%"
		return fmt % (val * 100.0)
	else:
		if is_equal_approx(val, round(val)):
			return "%s%d" % [prefix, int(val)]
		else:
			var fmt = prefix + "%." + str(decimals) + "f"
			return fmt % val

## 属性正负值颜色 (正加成绿, 负减益红, 零中性灰)
static func stat_color(val: float) -> Color:
	if val > 0.0001: return Color("#67c23a") # 绿色正收益
	elif val < -0.0001: return Color("#f56c6c") # 红色负收益
	else: return Color("#909399") # 灰色无变化

# =========================================================================
# 5. 文件与网络字节大小 (File Size & Bandwidth)
# =========================================================================

## 字节数格式化为人类可读文件大小 (如 1548576 -> "1.48 MB")
static func file_size(bytes: int) -> String:
	var f = float(bytes)
	if f >= 1024.0 * 1024.0 * 1024.0:
		return "%.2f GB" % (f / (1024.0 * 1024.0 * 1024.0))
	elif f >= 1024.0 * 1024.0:
		return "%.2f MB" % (f / (1024.0 * 1024.0))
	elif f >= 1024.0:
		return "%.1f KB" % (f / 1024.0)
	else:
		return "%d B" % bytes

## 下载/网络带宽速率 (如 1850000 -> "1.76 MB/s")
static func speed_rate(bytes_per_sec: float) -> String:
	return file_size(int(bytes_per_sec)) + "/s"

# =========================================================================
# 6. 富文本 BBCode 标签包装与品阶炫彩着色
# =========================================================================

## 包装 BBCode 颜色标签
static func bb_color(text: String, hex_color: String) -> String:
	var hex = hex_color if hex_color.begins_with("#") else ("#" + hex_color)
	return "[color=%s]%s[/color]" % [hex, text]

## 包装 BBCode 粗体标签
static func bb_bold(text: String) -> String:
	return "[b]%s[/b]" % text

## 装备品阶富文本着色 (根据品质 0:白 1:绿 2:蓝 3:紫 4:金 5:红神话)
static func bb_item_quality(item_name: String, quality_level: int = 0) -> String:
	var colors = [
		"#ffffff", # 0: 普通 (白)
		"#67c23a", # 1: 优秀 (绿)
		"#409eff", # 2: 稀有 (蓝)
		"#ba55d3", # 3: 史诗 (紫)
		"#ffd04b", # 4: 传说 (金)
		"#ff4d4f"  # 5: 神话 (红)
	]
	var col = colors[clamp(quality_level, 0, colors.size() - 1)]
	return "[b][color=%s]%s[/color][/b]" % [col, item_name]

# =========================================================================
# 7. 文本截断与脱敏遮蔽
# =========================================================================

## 字符串超长截断带省略号 (如 "超长武器描述文字内容", 5 -> "超长武器描...")
static func truncate(text: String, max_chars: int, ellipsis: String = "...") -> String:
	if text.length() <= max_chars:
		return text
	return text.substr(0, max_chars) + ellipsis

## 手机号/玩家账号脱敏遮蔽 (如 "13812345678" -> "138****5678")
static func mask_phone(phone: String) -> String:
	if phone.length() < 7:
		return phone
	return phone.substr(0, 3) + "****" + phone.substr(phone.length() - 4)
