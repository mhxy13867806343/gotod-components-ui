# 📋 Gotod Components UI - 开发日志与 Bug 修复全记录 (Changelog & DevLog)

<p align="center">
  <b><a href="CHANGELOG.md">🇨🇳 简体中文</a></b> |
  <b><a href="CHANGELOG.en.md">🇺🇸 English</a></b> |
  <b><a href="README.md">📖 返回 README</a></b> |
  <b><a href="https://mhxy13867806343.github.io/gotod-components-ui/">🌐 在线演示预览</a></b>
</p>

---

## 🎯 目录索引 (Table of Contents)
1. [🌟 版本历程与功能汇总 (Done List)](#-版本历程与功能汇总-done-list)
2. [🐛 遇到的 Bug 与问题排查 (Bugs & Issues Encountered)](#-遇到的-bug-与问题排查-bugs--issues-encountered)
3. [🔧 具体代码修改与前后对比 (Before & After Code Comparison)](#-具体代码修改与前后对比-before--after-code-comparison)
4. [📦 发布与构建记录 (Release History)](#-发布与构建记录-release-history)

---

## 🌟 版本历程与功能汇总 (Done List)

### 📌 当前版本: v1.6.3 (最新发布 · 全量矢量图标集成与 GIcon 智能检索版)
* **🎨 25,988+ 矢量图标全量集成与极致压缩**:
  * ⚡ **全量压缩导出**: 将包含 Godot 核心节点图标、GameIcons、Tabler、Lucide、FontAwesome、Remix、IconPark、Pixel、Brands 等全量 25,988 个矢量图标全量压缩导出至 `res://addons/gotod_ui/assets/icons/` 对应分类目录。
  * 🎯 **Godot 渲染调和**: 统一单色 SVG 格式为 `#ffffff`（纯白），彻底解决 `currentColor` 或深色 fill 导致 Godot `modulate` (`icon_color`) 着色发黑/变暗的问题。
* **🔍 `GIcon` 智能检索自愈与模糊匹配升级**:
  * 📂 **多分类子目录自动递归检索**: 支持 `node/`, `tabler/`, `lucide/`, `gameicons/`, `fontawesome/` 等子目录图标无需输入前缀，直接输入 `arrow_turn_up_right` 即可秒级命中。
  * 🔀 **下划线与中划线自动互转**: 自动兼容 `arrow_turn_up_right` 与 `arrow-turn-up-right` 等不同命名风格。
  * ⚠️ **明确缺失告警**: 缺失文件打印清晰的 `push_warning` 提示，避免静默失败回退。
* **🛠️ 开发者工具链增强**:
  * 📝 新增 `library/scripts/export_all_icons.js` (全量秒级压缩导出脚本) 与 `library/scripts/extract_icon.js` (按需提取脚本)。

### 📌 历史版本概览
* **v1.6.2**: 全量实战深度修复 + `gcd` 稳定基石认证规范。
* **v1.6.1**: 插件包体积极致瘦身（21MB ➔ 159KB / 解压 136MB ➔ 1MB），离线图标按需解耦与网页端 26,000+ 图标中心。
* **v1.6.0**: 新增 `GShaderStudio` (GPU 实时着色器工坊)、`GSkeletonParticleBinder` (骨骼粒子挂点绑定器) 与 `GFab` (多态悬浮按钮)。
* **v1.5.0**: 新增 `GParticleStudio` UI 粒子特效工坊与 `GAIDialogueTree` 大模型/本地行为树智能多分支剧本推理引擎。
* **v1.4.0**: 新增 `GTable` & `TableV2`（十万行虚拟化表格）、`GHud3D`（3D 空间透视看板）与 `GHaptic`（跨平台触感马达震动）。
* **v1.3.0**: 新增 `GVirtualList`（百万级数据虚拟列表）、`GI18n`（全场景国际化多语言动态热切换引擎）与 `GCollapse` 触控手势滑动。
* **v1.2.0**: 新增基于 `GSteps` 步骤条的专用 Changelog 页面与更新流导航。
* **v1.0.5**: 全面重构 API 文档体系，增加显式 Version 版本标记列与示例。
* **v1.0.4**: 引入 26,000+ 离线矢量图标超级中心与全场景生态集成。
* **v1.0.0 ~ v1.0.3**: 完成基础 52+ UI 组件体系搭建（按钮、表单、弹窗、布局、数据展示）。

---

## 🐛 遇到的 Bug 与问题排查 (Bugs & Issues Encountered)

在组件库架构演进与实战游戏项目对齐过程中，重点排查并解决了以下典型 Bug：

| 序号 | 影响模块 | Bug 现象 / 错误原因 | 严重级别 | 修复状态 | gcd 认证 |
| :--- | :--- | :--- | :---: | :---: | :---: |
| 1 | **GMessageBox** | `confirm`/`prompt` 先 `add_child` 触发 `_ready` 后才配置参数，导致取消按钮与输入框丢失 | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 2 | **GPopup** | `_ready` 前调用 `set_content()` 因容器未建导致内容丢失空白 | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 3 | **GDialog** | `_ready` 前调用插槽方法时容器为 null 或二次初始化误销毁子节点 | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 4 | **GSteps** | `current_step` 修改仅 `queue_redraw`，未刷新子节点高亮配色与序号 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 5 | **GFab** | 赋值 `items` 或使用 `create()` 时，未进入场景树导致子菜单项未生成 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 6 | **GNoticeBar** | 动态修改 `notice_type` 或 `mode` 时未触发背景色与关闭按钮刷新 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 7 | **UseCooldown** | 调用 `reset()` 时 `while` 退出误发射 `cooldown_finished` 信号 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 8 | **GSelect / GCheckboxGroup** | 接收普通字面量数组时在严格类型推导模式下可能产生类型不匹配 | 低危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 9 | **GBadge / GAvatar** | 极端无主题或离线渲染环境下获取默认字体为空引发空引用 | 低危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 10 | **GRouter** | 静态 `push` 内部 `await` Tween 若被跳过导致 `_is_transitioning` 死锁 | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 11 | **GDivider** | 垂直分割线绘制公式误用 `size.y / 2.0` 代替 `size.x / 2.0` 导致偏移 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |

| 12 | **GFab (Web)** | Web 目录脚本字符转义与断行导致 `SyntaxError: Invalid or unexpected token` | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 13 | **@tool 脚本** | 自定义 Enum 直接作为 `@export` 类型在 Godot 4 检查器修改时触发类型转换异常 | 中危 | ✅ 已规范化 | `[gcd]` 已验证 |
| 14 | **GAxios** | 使用点语法直接访问 `final_config.params` 字典键在 GDScript 4 抛错；请求枚举未转整型 | 低危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 15 | **GMenu (浮层)** | 5 级递归深层子菜单在点击子项时冒泡触发父级菜单意外关闭 | 中危 | ✅ 已彻底修复 | `[gcd]` 已验证 |
| 16 | **GLoading** | 遮罩层未拦截背景事件导致点击穿透误触底部游戏操作 | 高危 | ✅ 已彻底修复 | `[gcd]` 已验证 |


---

## 🔧 具体代码修改与前后对比 (Before & After Code Comparison)

### 1. `GFab` 悬浮按钮生命周期守卫与 Pre-ready 初始化修复
* **问题**: 用户在创建 `GFab` 实例后立即调用 `add_action()`，此时节点尚未 `add_child` 进场景树，`_ready()` 尚未执行，`_menu_container` 为 `null` 导致崩溃。
* **修复前 (Before)**:
  ```gdscript
  func _rebuild_menu() -> void:
      for child in _menu_container.get_children():  # ❌ _menu_container 未就绪时抛出空指针
          child.queue_free()
  ```
* **修复后 (After)**:
  ```gdscript
  func _rebuild_menu() -> void:
      if not _menu_container:
          _setup_layout()  # ✅ 允许在节点进入场景树前提前自动初始化布局并配置动作项
      for child in _menu_container.get_children():
          child.queue_free()
  ```

---

### 2. `GDivider` 垂直方向分割线坐标居中修复
* **问题**: 垂直分割线绘制误将 X 轴居中写成 `size.y / 2.0`，在宽矩形容器内导致线条偏移。
* **修复前 (Before)**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.y / 2.0  # ❌ 错误使用了 Y 轴高度进行 X 轴偏移
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```
* **修复后 (After)**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.x / 2.0  # ✅ 正确使用 X 轴宽度居中
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```

---

### 3. `@tool` 脚本导出枚举类型与 `@export_enum` 规范
* **问题**: 在 Godot 4 `@tool` 模式下直接使用自定义 Enum 类型导出容易导致类型转换异常，且 Setter 在节点未就绪前调用容易触发子节点空指针。
* **修复前 (Before)**:
  ```gdscript
  @export var button_type: ButtonType = ButtonType.DEFAULT:
      set(val):
          button_type = val
          _update_styles()  # ❌ 未就绪前调用易引发子节点空指针
  ```
* **修复后 (After)**:
  ```gdscript
  @export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO")           var button_type: int = ButtonType.DEFAULT:
      set(val):
          button_type = val
          if is_node_ready():
              _update_styles()  # ✅ 增加 is_node_ready 防御守卫
  ```

---

### 4. `GRouter` 转场动画死锁与旧场景生命周期安全
* **问题**: 静态 `push` 方法内部如果动画未执行完毕，`_is_transitioning` 锁无法释放；快速连续转场时旧场景可能被提前释放导致野指针。
* **修复前 (Before)**:
  ```gdscript
  static func push(...) -> GResult:
      await _play_transition_animation(...)
      _is_transitioning = false
  ```
* **修复后 (After)**:
  ```gdscript
  static func push(...) -> Variant:
      _play_transition_animation(root, next_scene, transition, duration, false, tree, func():
          _is_transitioning = false  # ✅ 回调保障无论何时均能可靠释放状态锁
      )
      return GResult.ok(null)

  tween.finished.connect(func():
      if old_scene and old_scene != new_scene and is_instance_valid(old_scene):
          old_scene.queue_free()  # ✅ 增加 is_instance_valid 安全保护
  )
  ```

---

### 5. `GAxios` 字典安全索引与请求参数强转
* **问题**: 使用点语法直接访问 Dictionary 属性在部分 GDScript 环境报错。
* **修复前 (Before)**:
  ```gdscript
  if final_config.has("params") and final_config.params is Dictionary:  # ❌ 点语法报错
      for k in final_config.params.keys(): ...
  ```
* **修复后 (After)**:
  ```gdscript
  if final_config.has("params") and final_config["params"] is Dictionary:  # ✅ 安全下标索引
      for k in final_config["params"].keys(): ...
  var req_method: int = int(final_config.get("method", HTTPClient.METHOD_GET))
  ```

---

## 📦 发布与构建记录 (Release History)

* **v1.6.3** (2026-09-02): [gotod-components-ui-v1.6.3.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.3) (25,988+ 矢量图标全量集成与 GIcon 智能检索升级)
* **v1.6.2** (2026-09-01): [gotod-components-ui-v1.6.2.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.2) (全量实战深度修复 + gcd 稳定基石认证，161 KB)
* **v1.6.1** (2026-09-01): [gotod-components-ui-v1.6.1.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.1) (插件包极致瘦身，159 KB)
* **v1.6.0** (2026-08-31): [gotod-components-ui-v1.6.0.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.0)
* **v1.5.0** (2026-08-31): [Release v1.5.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.5.0)
* **v1.4.0** (2026-08-31): [Release v1.4.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.4.0)
* **v1.3.0** (2026-08-31): [Release v1.3.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.3.0)
* **v1.2.0** (2026-08-31): [Release v1.2.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.2.0)
* **v1.0.5** (2026-08-31): [Release v1.0.5](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.5)
* **v1.0.4** (2026-08-30): [Release v1.0.4](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.4)

