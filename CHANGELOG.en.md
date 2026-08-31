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

### 📌 Current Release: v1.6.0 (Latest)
* **Key Highlights**:
  * 🎨 **GShaderStudio (GPU Realtime Shader Studio)**: Visually tweak Dissolve, Hologram, Scanlines, and Frosted Glass shaders with one-click export for Godot 4 `shader_type canvas_item;` code.
  * 🦴 **GSkeletonParticleBinder (Skeleton Joint Particle Attacher)**: Dynamically attach `GParticleStudio` particle emitters to 2D/3D skeleton joints (Spine, DragonBones, Godot Skeleton2D) for weapon slash trails, foot dust, and spell effects.
  * 🕹️ **GFab (Polymorphic Floating Action Button)**: Full support for 3 creation styles (`GFab.create(items)` / `GFab.create(opts)` / `GFab.create(a,b,c)`), batch `add_actions`, 2D free dragging, and magnetic screen-edge docking.

### 📌 Previous Versions Overview
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

| # | Component | Issue / Root Cause | Severity | Status |
| :--- | :--- | :--- | :---: | :---: |
| 1 | **GFab** | Web catalog script string escape and newline issue causing `SyntaxError: Invalid or unexpected token` | High | ✅ Fixed |
| 2 | **GFab** | Calling `add_action()` before `_ready()` threw Null Pointer Exception on `_menu_container` | Medium | ✅ Fixed |
| 3 | **GDivider** | Vertical divider drawing formula incorrectly used `size.y / 2.0` instead of `size.x / 2.0` | Medium | ✅ Fixed |
| 4 | **@tool Scripts** | Custom Enum directly exported via `@export` caused type conversion exceptions in Godot 4 Inspector | Medium | ✅ Normalized |
| 5 | **GRouter** | Skipping Tween inside static `push` caused `_is_transitioning` deadlock; rapid scene switching crashed on freed old scene | High | ✅ Fixed |
| 6 | **GAxios** | Accessing dictionary key via dot syntax `final_config.params` caused GDScript error; HTTP enum required integer cast | Low | ✅ Fixed |
| 7 | **GMenu** | Clicking child item in 5-level nested submenu bubbled up and caused unexpected parent menu closure | Medium | ✅ Fixed |
| 8 | **GDialog / GLoading** | Overlay mask failed to stop event propagation, leading to background misclicks | High | ✅ Fixed |

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

* **v1.6.0** (2026-08-31): [gotod-components-ui-v1.6.0.zip](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.6.0)
* **v1.5.0** (2026-08-31): [Release v1.5.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.5.0)
* **v1.4.0** (2026-08-31): [Release v1.4.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.4.0)
* **v1.3.0** (2026-08-31): [Release v1.3.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.3.0)
* **v1.2.0** (2026-08-31): [Release v1.2.0](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.2.0)
* **v1.0.5** (2026-08-31): [Release v1.0.5](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.5)
* **v1.0.4** (2026-08-30): [Release v1.0.4](https://github.com/mhxy13867806343/gotod-components-ui/releases/tag/v1.0.4)
