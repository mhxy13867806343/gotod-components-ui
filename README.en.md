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
- Interactively test 28+ basic, form, feedback, and data presentation components.
- Run live sandboxes for 2D game math, physics kinematics, networking, cross-page event broadcasting, and scene routing.
- Click **"Copy GDScript"** to instantly copy code snippets to your clipboard.

---

## 🌟 Core Modules & Features

### 1. 🧩 28+ Ready-to-Use UI Components
- **General**: Button, Typography Text, Divider, Icon.
- **Form Controls**: Input, Select, Switch, Checkbox, Radio, Slider, Rate, Form responsive container.
- **Feedback & Overlays**: Modal Dialog, Global Floating Message Toast, Alert banners, Drawer, Tooltip, Popconfirm.
- **Data Display**: Card, Tag, Badge, Avatar, Progress bar, Tabs, Collapse accordion, Steps, Empty states.

### 2. 🎯 2D Game Math & Coordinate Utilities (`GCoord`)
- **Off-Screen Target Indicator** (`get_offscreen_indicator_2d`): Automatically computes clamped screen boundary coordinates, indicator arrow rotation angle, and world distance for off-screen bosses/enemies.
- **2.5D Isometric Transformations** (`cartesian_to_isometric_2d` / `isometric_to_cartesian_2d`): Bidirectional 45° isometric tile grid math.
- **Loot Drop Quadratic Bezier Arcs** (`get_loot_arc_pos_2d`): Natural loot coin/chest pop trajectories.
- **Orbital Point Patterns** (`get_orbit_points_2d`): Bullet hell patterns and rotating shield coordinates.
- **2D FoV Cone Detection** (`is_in_fov_cone_2d`): Melee sweep & sector cone vision checks.

### 3. ⚙️ 2D Physics Kinematics & Colliders (`GPhysics`)
- **Exact Jump Kinematics**: Calculates initial jump velocity $v = \frac{2h}{t}$ and gravity $g = \frac{2h}{t^2}$ from desired jump height $h$ and time-to-peak $t$.
- **Radial Explosion Impulse** (`apply_explosion_impulse_2d`): Radial falloff impulse applied to nearby `RigidBody2D` nodes.
- **Dynamic Collider Attachment**: One-liner creation of Box, Circle, and Capsule collision shapes.

### 4. 🌐 Networking & Multiplayer (`GAxios` / `GWebSocket` / `GMultiplayer`)
- **Axios-Style HTTP Client** (`GAxios`): Request/response interceptors, automatic JWT injection, timeouts, and RESTful wrappers.
- **WebSocket Full-Duplex Client** (`GWebSocket`): Auto heartbeat keep-alive, reconnection backoff, and event dispatching.
- **High-Level Multiplayer Rooms** (`GMultiplayer`): ENet-based room hosting, joining, and RPC synchronization.

### 5. ⚡ UniApp / Vue-Style Global Cross-Page Event Bus (`GEvent`)
- Full support for `uni.$emit`, `uni.$on`, `uni.$once`, and `uni.$off` syntax.
- **Memory-Leak Protection**: Pass `self` to automatically unregister listeners on `_exit_tree`.
- Complete side-by-side comparison with Godot's official **Autoload + Typed Signals** pattern.

### 6. 🚀 Scene Router & 8 Transition Animations (`GRouter`)
- Clean syntax: `GRouter.push("res://scenes/shop.tscn")`
- 8 transitions: 4-direction slides (Left/Right/Up/Down) + 3 zoom variations (Zoom In expand, Zoom Out focus, Jelly Bounce) + Fade.
- **Batch 20+ Parameter Injection**: `GRouter.apply_params_to(self)` one-line reflection injection.

### 7. 🎨 Game Data Formatter (`GFormat`)
- HP dynamic color transitions (Safe Green / Warning Yellow / Critical Red), seconds-to-duration conversion, Chinese (万/亿) & English (K/M/B) compact numbers, stat modifiers (+15% / -20), item rarity BBCode styling, and file size / transfer rates.

### 8. 🎵 5 Multimedia Asset Management Schemes (`GAsset`)
- Multi-threaded async loading (`await GAsset.load_async`), external MOD/avatar image loading, 16-channel global audio pool, dual-channel BGM crossfading, and SpriteSheet atlas slicing.

---

## 📦 Directory Structure

```
your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 28+ Vue/Uni-style UI Controls
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
- 📦 **[Direct Download v1.0.0 Archive (.zip)](https://github.com/mhxy13867806343/gotod-components-ui/archive/refs/tags/v1.0.0.zip)**

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

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.

Free for both personal and commercial game development, modification, and redistribution.

Copyright (c) 2026 gotod-components-ui Contributors
