# 📋 Gotod Components UI - Development Log & Bugfix History (Changelog & DevLog)

<p align="center">
  <b><a href="CHANGELOG.md">🇨🇳 简体中文</a></b> |
  <b><a href="CHANGELOG.en.md">🇺🇸 English</a></b> |
  <b><a href="README.en.md">📖 Back to README</a></b> |
  <b><a href="https://mhxy13867806343.github.io/gotod-components-ui/">🌐 Live Online Demo</a></b>
</p>

---

## 🎯 Table of Contents
1. [🌟 Version History & Features (Done List)](#-version-history--features-done-list)
2. [🐛 Bugs & Troubleshooting History](#-bugs--troubleshooting-history)
3. [🔧 Before & After Code Fixes](#-before--after-code-fixes)
4. [📦 Release History & Downloads](#-release-history--downloads)

---

## 🌟 Version History & Features (Done List)

### 📌 Current Release: v1.6.4 (Latest · Native SVG Direct String Rendering & Lean Icon Architecture)
* **⚡ `GIcon` Native Inline SVG String Direct Parsing & Rendering (Zero File Dependency)**:
  * 🚀 **Dynamic Parsing**: Integrated `Image.load_svg_from_string` and `ImageTexture.create_from_image` rendering pipeline, allowing direct `<svg>...</svg>` XML string input for instant vector rendering with aspect-ratio adaptive scaling.
  * 🛠️ **Polymorphic Factory Enhancements**: Added `GIcon.from_svg(svg_str, size, color)`, `set_svg(svg_str)`, and `@export_multiline var svg_data`; `GIcon.create(svg_str)` auto-detects SVG XML strings.
  * 📦 **Ultra-Lean Package Size (~162 KB)**: Replaced 25,000+ loose files with native SVG string generation, keeping only 37 core built-in icons in the repository.
* **📋 Web Icon Center Code Generation Overhaul**:
  * ✨ One-click generation of zero-file-dependency `var svg_str = """..."""` GDScript and C# (.NET) code for all 26,000+ icons in the web gallery.

### 📌 Previous Versions Overview
* **v1.6.2**: Comprehensive real-world bugfixes & `gcd` stable foundation standard.
* **v1.6.2**: Comprehensive real-world bugfixes & `gcd` stable foundation standard.
* **v1.6.1**: Ultra-lean package size (21MB ➔ 159KB / Uncompressed 136MB ➔ 1MB), on-demand icon decoupling.
* **v1.6.0**: Added `GShaderStudio` (GPU Realtime Shader Studio), `GSkeletonParticleBinder` (Skeleton Joint Particle Attacher), and `GFab` (Polymorphic Floating Action Button).
* **v1.5.0**: Added `GParticleStudio` UI Particle Studio and `GAIDialogueTree` LLM/Behavior Tree AI dynamic branching dialogue engine.
* **v1.4.0**: Added `GTable` & `TableV2` (100k rows virtualized table), `GHud3D` (3D billboard perspective projection), and `GHaptic` (cross-platform haptic motor vibration).
* **v1.3.0**: Added `GVirtualList` (1M rows virtual list), `GI18n` (multilingual dynamic hot-reloading engine), and `GCollapse` touch gestures.
* **v1.2.0**: Added dedicated Changelog page built with the `GSteps` timeline component.
* **v1.0.5**: Comprehensive API documentation overhaul with explicit Version tagging.
* **v1.0.4**: Integrated 26,000+ offline vector icons super center.
* **v1.0.0 ~ v1.0.3**: Established the complete 52+ UI component library (Buttons, Forms, Feedback, Layout, Data Display).

---

## 🐛 Bugs & Troubleshooting History

During real-world game development and component architectural hardening, the following key issues were resolved:

| # | Component | Issue / Root Cause | Severity | Status | gcd Certified |
| :--- | :--- | :--- | :---: | :---: | :---: |
| 1 | **GMessageBox** | `confirm`/`prompt` lifecycle race condition causing Cancel button and Input field loss | High | ✅ Fixed | `[gcd]` Verified |
| 2 | **GPopup** | Calling `set_content()` before `_ready()` left container empty | High | ✅ Fixed | `[gcd]` Verified |
| 3 | **GDialog** | Slot container was null or destroyed when configuring slots before `_ready()` | High | ✅ Fixed | `[gcd]` Verified |
| 4 | **GSteps** | Changing `current_step` only queued redraw without updating child highlight colors | Medium | ✅ Fixed | `[gcd]` Verified |
| 5 | **GFab** | Setting `items` or using `create()` did not auto-populate submenu nodes | Medium | ✅ Fixed | `[gcd]` Verified |
| 6 | **GNoticeBar** | Changing `notice_type` or `mode` did not trigger style/close-button re-render | Medium | ✅ Fixed | `[gcd]` Verified |
| 7 | **UseCooldown** | `reset()` loop exit accidentally fired `cooldown_finished` signal | Medium | ✅ Fixed | `[gcd]` Verified |
| 8 | **GSelect / GCheckboxGroup** | Strict type deduction threw errors on array literals | Low | ✅ Fixed | `[gcd]` Verified |
| 9 | **GBadge / GAvatar** | Default font lookup returned null in headless or un-themed rendering | Low | ✅ Fixed | `[gcd]` Verified |
| 10 | **GRouter** | Skipping Tween inside static `push` caused `_is_transitioning` deadlock | High | ✅ Fixed | `[gcd]` Verified |
| 11 | **GDivider** | Vertical divider drawing formula incorrectly used `size.y / 2.0` instead of `size.x / 2.0` | Medium | ✅ Fixed | `[gcd]` Verified |
| 12 | **GFab (Web)** | Web catalog script string escape and newline issue causing syntax error | High | ✅ Fixed | `[gcd]` Verified |
| 13 | **@tool Scripts** | Custom Enum directly exported via `@export` caused type conversion exceptions | Medium | ✅ Normalized | `[gcd]` Verified |
| 14 | **GAxios** | Dot syntax access on Dictionary params caused GDScript error | Low | ✅ Fixed | `[gcd]` Verified |
| 15 | **GMenu** | Clicking child item in 5-level nested submenu bubbled up to parent menu | Medium | ✅ Fixed | `[gcd]` Verified |
| 16 | **GLoading** | Overlay mask failed to stop event propagation, leading to background misclicks | High | ✅ Fixed | `[gcd]` Verified |


---

## 🔧 Before & After Code Fixes

### 1. `GFab` Lifecycle Guard & Pre-ready Initialization Fix
* **Problem**: Invoking `add_action()` before `add_child` or `_ready()` caused `null` reference on `_menu_container`.
* **Before Fix**:
  ```gdscript
  func _rebuild_menu() -> void:
      for child in _menu_container.get_children():  # ❌ Null reference when container is not yet initialized
          child.queue_free()
  ```
* **After Fix**:
  ```gdscript
  func _rebuild_menu() -> void:
      if not _menu_container:
          _setup_layout()  # ✅ Auto-initialize layout container before ready if needed
      for child in _menu_container.get_children():
          child.queue_free()
  ```

---

### 2. `GDivider` Vertical Orientation Center Calculation Fix
* **Problem**: Vertical orientation erroneously used `size.y / 2.0` for X centering.
* **Before Fix**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.y / 2.0  # ❌ Incorrect Y axis used for horizontal offset
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```
* **After Fix**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.x / 2.0  # ✅ Correct X axis used for centering
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```

---

### 3. `@tool` Script `@export_enum` Normalization
* **Problem**: In `@tool` mode, raw custom Enum export caused inspector errors and pre-ready setter null pointers.
* **Before Fix**:
  ```gdscript
  @export var button_type: ButtonType = ButtonType.DEFAULT:
      set(val):
          button_type = val
          _update_styles()  # ❌ Crashed when invoked before node is ready
  ```
* **After Fix**:
  ```gdscript
  @export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO")           var button_type: int = ButtonType.DEFAULT:
      set(val):
          button_type = val
          if is_node_ready():
              _update_styles()  # ✅ Protected by is_node_ready guard
  ```

---

### 4. `GRouter` Transition Deadlock & Lifetime Safety Guard
* **Problem**: Uncompleted `await` in static `push` caused persistent lock; quick transitions crashed on disposed old scene.
* **Before Fix**:
  ```gdscript
  static func push(...) -> GResult:
      await _play_transition_animation(...)
      _is_transitioning = false
  ```
* **After Fix**:
  ```gdscript
  static func push(...) -> Variant:
      _play_transition_animation(root, next_scene, transition, duration, false, tree, func():
          _is_transitioning = false  # ✅ Callback ensures state lock is always released
      )
      return GResult.ok(null)

  tween.finished.connect(func():
      if old_scene and old_scene != new_scene and is_instance_valid(old_scene):
          old_scene.queue_free()  # ✅ Added is_instance_valid check
  )
  ```

---

### 5. `GAxios` Dictionary Safe Indexing & Enum Cast
* **Problem**: Dot property syntax on GDScript Dictionary threw runtime error.
* **Before Fix**:
  ```gdscript
  if final_config.has("params") and final_config.params is Dictionary:  # ❌ Dot syntax error
      for k in final_config.params.keys(): ...
  ```
* **After Fix**:
  ```gdscript
  if final_config.has("params") and final_config["params"] is Dictionary:  # ✅ Safe bracket index
      for k in final_config["params"].keys(): ...
  var req_method: int = int(final_config.get("method", HTTPClient.METHOD_GET))
  ```

---

## 📦 Release History & Downloads
* **v1.6.4** (2026-09-02): [gotod-components-ui-v1.6.4.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.4) (Native SVG zero-dependency string rendering & lean icon center, 162 KB)
* **v1.6.2** (2026-09-01): [gotod-components-ui-v1.6.2.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.2) (Real-world bugfixes & gcd verification, 161 KB)
* **v1.6.1** (2026-09-01): [gotod-components-ui-v1.6.1.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.1) (Ultra-Lean Package Size, 159 KB)
* **v1.6.0** (2026-08-31): [gotod-components-ui-v1.6.0.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.0)
* **v1.5.0** (2026-08-31): [Release v1.5.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.5.0)
* **v1.4.0** (2026-08-31): [Release v1.4.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.4.0)
* **v1.3.0** (2026-08-31): [Release v1.3.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.3.0)
* **v1.2.0** (2026-08-31): [Release v1.2.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.2.0)
* **v1.0.5** (2026-08-31): [Release v1.0.5](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.5)
* **v1.0.4** (2026-08-30): [Release v1.0.4](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.4)

