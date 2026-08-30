# Gotod Components UI 🎨

<p align="center">
  <b>Modern Vue / UniApp-Style UI Component Library & Game Development Toolchain for Godot 4.x (4.6+)</b>
  <br>
  <i>Inspired by Naive UI, Element Plus, Ant Design Vue, and Vant UI</i>
</p>

<p align="center">
  <a href="https://mhxy13867806343.github.io/gotod-components-ui/"><img src="https://img.shields.io/badge/Online%20Demo-GitHub%20Pages-success.svg?logo=githubpages" alt="Online Demo"></a>
  <a href="https://github.com/mhxy13867806343/gotod-components-ui"><img src="https://img.shields.io/badge/GitHub-gotod--components--ui-blue.svg?logo=github" alt="GitHub"></a>
  <a href="https://gitee.com/fangjiayu/gotod-components-ui"><img src="https://img.shields.io/badge/Gitee-gotod--components--ui-red.svg?logo=gitee" alt="Gitee"></a>
  <a href="https://gitcode.com/m200s/gotod-components-ui"><img src="https://img.shields.io/badge/GitCode-gotod--components--ui-orange.svg" alt="GitCode"></a>
  <img src="https://img.shields.io/badge/Godot-4.x%20%7C%204.6%2B-478cbf?logo=godotengine&logoColor=white" alt="Godot 4.x">
  <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"></a>
</p>

---

## 🌐 Online Interactive Web Preview

This project includes a complete interactive documentation & live sandbox deployed on GitHub Pages:

👉 **[https://mhxy13867806343.github.io/gotod-components-ui/](https://mhxy13867806343.github.io/gotod-components-ui/)**

In the live web preview, you can:
- Switch across 4 design themes (**Naive Green**, **Element Blue**, **AntD Geek Blue**, **Vant Red/Orange**) and Dark / Light modes.
- Interactively test 35+ basic, form, feedback, data presentation, and game-specific components.
- Run live sandboxes for 2D game math, physics kinematics, networking, cross-page event broadcasting, and scene routing.
- Click **"Copy GDScript"** to instantly copy code snippets to your clipboard.

---

## 🌟 Core Modules & Features

### 1. 🧩 35+ Ready-to-Use UI Components & Game Controls
- **Basic**: Button, Text typography, Divider, Icon, Fab floating action button.
- **Form**: Input, InputNumber, Select, Switch, Checkbox, Radio, Slider, Stepper, Picker, Form responsive container.
- **Feedback**: Dialog modal, Message toast, NoticeBar ticker, Toast, Dialogue (JRPG/AVG system), Chat (WeChat/Lifeline stream), InteractPrompt (floating key), Alert, Drawer, Tooltip, Popconfirm, Skeleton, Loading overlay, Tour guide.
- **Data**: Card, Tag, Badge, Avatar, Progress, Tabs, Collapse, Steps, Space container.

### 2. 🎰 Vue-Style Dot Slot Property Syntax (`GSlotProxy`)
- **Default Slot**: Component defaults to default slot, assign properties directly via `btn.slotName.color = "red"` or `btn.slotName.text = "Confirm"`.
- **Named Slots**: Direct dot access like `dlg.header.text = "🔥 Legendary Chest"`, `dlg.footer.confirm_text = "Open Now"`.
- **Dynamic Custom Slots**: Set `card.slotName = "t1"` and access dynamically via `card.t1.color = "cyan"` or `card.t1.text = 124`.
- **Keywords Guard**: Automatic interception of Godot 4 built-in keywords to prevent collision with helpful runtime diagnostics.

### 3. 🎯 2D Game Math & Coordinate Utilities (`GCoord`)
- **Off-Screen Target Indicator** (`get_offscreen_indicator_2d`): Automatically computes clamped screen boundary coordinates, indicator arrow rotation angle, and world distance for off-screen bosses/enemies.
- **2.5D Isometric Transformations** (`cartesian_to_isometric_2d` / `isometric_to_cartesian_2d`): Bidirectional 45° isometric tile grid math.
- **Loot Drop Quadratic Bezier Arcs** (`get_loot_arc_pos_2d`): Natural loot coin/chest pop trajectories.
- **Orbital Point Patterns** (`get_orbit_points_2d`): Bullet hell patterns and rotating shield coordinates.
- **2D FoV Cone Detection** (`is_in_fov_cone_2d`): Melee sweep & sector cone vision checks.

### 4. ⚙️ 2D Physics Kinematics & Colliders (`GPhysics`)
- **Exact Jump Kinematics**: Calculates initial jump velocity $v = \frac{2h}{t}$ and gravity $g = \frac{2h}{t^2}$ from desired jump height $h$ and time-to-peak $t$.
- **Radial Explosion Impulse** (`apply_explosion_impulse_2d`): Radial falloff impulse applied to nearby `RigidBody2D` nodes.
- **Dynamic Collider Attachment**: One-liner creation of Box, Circle, and Capsule collision shapes.

### 5. 🌐 Networking & Multiplayer (`GAxios` / `GWebSocket` / `GMultiplayer`)
- **Axios-Style HTTP Client** (`GAxios`): Request/response interceptors, automatic JWT injection, timeouts, and RESTful wrappers.
- **WebSocket Full-Duplex Client** (`GWebSocket`): Auto heartbeat keep-alive, reconnection backoff, and event dispatching.
- **High-Level Multiplayer Rooms** (`GMultiplayer`): ENet-based room hosting, joining, and RPC synchronization.

### 5. ⚡ UniApp / Vue-Style Global Cross-Page Event Bus (`GEvent`)
- Full support for `uni.$emit`, `uni.$on`, `uni.$once`, and `uni.$off` syntax.
- **Memory-Leak Protection**: Pass `self` to automatically unregister listeners on `_exit_tree`.
- Complete side-by-side comparison with Godot's official **Autoload + Typed Signals** pattern.

### 7. 🚀 Scene Router & 8 Transition Animations (`GRouter`)
- Clean syntax: `GRouter.push("res://scenes/shop.tscn")`
- 8 transitions: 4-direction slides (Left/Right/Up/Down) + 3 zoom variations (Zoom In expand, Zoom Out focus, Jelly Bounce) + Fade.
- **Batch 20+ Parameter Injection**: `GRouter.apply_params_to(self)` one-line reflection injection.

### 7. 🎨 Game Data Formatter (`GFormat`)
- HP dynamic color transitions (Safe Green / Warning Yellow / Critical Red), seconds-to-duration conversion, Chinese (万/亿) & English (K/M/B) compact numbers, stat modifiers (+15% / -20), item rarity BBCode styling, and file size / transfer rates.

### 9. 🎵 5 Multimedia Asset Management Schemes (`GAsset`)
- Multi-threaded async loading (`await GAsset.load_async`), external MOD/avatar image loading, 16-channel global audio pool, dual-channel BGM crossfading, and SpriteSheet atlas slicing.

---

## 📦 Directory Structure

```
your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 35+ Vue/Uni-style UI Controls
│       ├── core/          # Slot Proxy (GSlotProxy), Styling & Lifecycle Guard
│       ├── theme/         # Design Tokens & StyleBox Engine (Naive, Element, AntD, Vant)
│       ├── events/        # Global Event Bus (GEvent uni.$emit / uni.$on)
│       ├── router/        # Scene Transition Router (GRouter)
│       ├── utils/         # Networking (Axios/WS/Multiplayer), 2D Math, Physics, Formatting, Asset Loader
│       ├── lifecycle/     # Lifecycle Guardian (GLifecycleGuard)
│       ├── plugin.cfg     # Plugin Metadata
│       └── plugin.gd      # Node Registration Plugin Script
├── assets/                # Web showcase stylesheet and script resources
├── index.html             # Standalone interactive web documentation
└── project.godot
```

---

## 🚀 Installation & Quick Start

### Method 1: Download Release Archive (.zip) (Recommended)
- 👉 **[GitHub Releases Page](https://github.com/mhxy13867806343/gotod-components-ui/releases)**
- 📦 **[Direct Download v1.0.3 Archive (.zip)](https://github.com/mhxy13867806343/gotod-components-ui/archive/refs/tags/v1.0.3.zip)**

Extract the archive and copy the `addons/gotod_ui` folder directly into your Godot 4 project root at `res://addons/`.

### Method 2: Clone via Git
```bash
git clone https://github.com/mhxy13867806343/gotod-components-ui.git
```

### Enabling the Plugin
1. Open Godot 4 Editor.
2. Go to **Project -> Project Settings -> Plugins**.
3. Check the **Enable** box for **Gotod Components UI**.
4. Start adding component nodes in your scenes or calling utility classes directly in GDScript!

---

## 📚 Quick Code Examples

### 1. UI Button & Route Navigation
```gdscript
var btn = GButton.new()
btn.text = "Enter Dungeon"
btn.button_type = GButton.ButtonType.PRIMARY
btn.pressed.connect(func():
    GMessage.success("Heading to the battlefield!")
    GRouter.push("res://scenes/battle.tscn", { "stage_id": 108 }, GRouter.TransitionType.ZOOM_IN)
)
add_child(btn)
```

### 2. Cross-Page Global Event (GEvent / uni.$emit)
```gdscript
# Sender Scene:
GEvent.emit("user_info_updated", { "nickname": "Dragon Knight", "gold": 99999 })

# Receiver Scene:
func _ready() -> void:
    GEvent.on("user_info_updated", func(data):
        $Nickname.text = data.get("nickname")
        $Gold.text = str(data.get("gold"))
    , self)
```

### 3. Axios-Style Async HTTP Request
```gdscript
var res: Dictionary = await GAxios.get("https://api.game.com/player/profile", { "id": 1001 })
if res.success:
    print("Player profile fetched:", res.data)
```

### 4. 2D Off-Screen Enemy Indicator & Jump Physics
```gdscript
# 1. Compute off-screen boss screen boundary indicator
var indicator = GCoord.get_offscreen_indicator_2d(self, boss.global_position, 40.0)
$ArrowIcon.position = indicator.screen_pos
$ArrowIcon.rotation = indicator.angle

# 2. Exact jump velocity calculation
var jump_velocity = GPhysics.calculate_jump_velocity(180.0, 0.4) # height 180px, time 0.4s
```

---

## 🛠️ Demo Bug Fixes & Before/After Code Comparison

During real-world game development and alignment with `gotod-components-ui-demo` (Memory Match Game), the component library underwent rigorous robustness auditing and bug fixing:

### 1. `GDivider` Vertical Orientation Coordinate & Size Bug
* **Issue**: Vertical divider drawing calculated X center as `size.y / 2.0` instead of `size.x / 2.0`, causing line displacement in rectangular controls.
* **Before (Buggy)**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.y / 2.0  # ❌ Used Y-axis height
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```
* **After (Fixed)**:
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.x / 2.0  # ✅ Used X-axis width
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```

### 2. `@tool` Script Enum Setter Collision & `@export_enum` Safety
* **Issue**: Direct Enum exports in `@tool` mode caused type casting conflicts during Inspector updates or dynamic assignments.
* **Before (Buggy)**:
  ```gdscript
  @export var button_type: ButtonType = ButtonType.DEFAULT:
      set(val):
          button_type = val
          _update_styles()  # ❌ Called before ready -> null reference
  ```
* **After (Fixed)**:
  ```gdscript
  @export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO") \
          var button_type: int = ButtonType.DEFAULT:
      set(val):
          button_type = val
          if is_node_ready():
              _update_styles()  # ✅ Protected by is_node_ready() guard
  ```

### 3. `GFab` Floating Action Button Pre-ready Invocation Crash
* **Issue**: Calling `add_action()` before node entered tree triggered a crash on uninitialized `_menu_container`.
* **Before (Buggy)**:
  ```gdscript
  func _rebuild_menu() -> void:
      for child in _menu_container.get_children():  # ❌ null reference
          child.queue_free()
  ```
* **After (Fixed)**:
  ```gdscript
  func _rebuild_menu() -> void:
      if not _menu_container:
          _setup_layout()  # ✅ Safe pre-ready fallback initialization
      for child in _menu_container.get_children():
          child.queue_free()
  ```

### 4. `GRouter` Scene Transition Deadlock & Freed Node Access Guard
* **Issue**: Unawaited transitions left `_is_transitioning` permanently locked; rapid transitions accessed previously freed scenes.
* **Before (Buggy)**:
  ```gdscript
  static func push(...) -> GResult:
      await _play_transition_animation(...)
      _is_transitioning = false
  ```
* **After (Fixed)**:
  ```gdscript
  static func push(...) -> Variant:
      _play_transition_animation(root, next_scene, transition, duration, false, tree, func():
          _is_transitioning = false  # ✅ Always releases lock upon completion
      )
      return GResult.ok(null)
  
  tween.finished.connect(func():
      if old_scene and old_scene != new_scene and is_instance_valid(old_scene):
          old_scene.queue_free()  # ✅ Protected with is_instance_valid
  )
  ```

### 5. `GAxios` Dictionary Bracket Indexing & Method Type Casting
* **Issue**: Dot notation access `final_config.params` caused runtime crashes on Dictionaries.
* **Before (Buggy)**:
  ```gdscript
  if final_config.has("params") and final_config.params is Dictionary:  # ❌ Dot syntax error
      for k in final_config.params.keys(): ...
  ```
* **After (Fixed)**:
  ```gdscript
  if final_config.has("params") and final_config["params"] is Dictionary:  # ✅ Safe bracket syntax
      for k in final_config["params"].keys(): ...
  var req_method: int = int(final_config.get("method", HTTPClient.METHOD_GET))  # ✅ Integer casting
  ```

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.

Free for both personal and commercial game development, modification, and redistribution.

Copyright (c) 2026 gotod-components-ui Contributors
