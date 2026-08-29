# Gotod Components UI 🎨

<p align="center">
  <b>Modern Vue-Style UI Component Library for Godot 4.x (4.6+)</b>
  <br>
  <i>Inspired by Naive UI, Element Plus, Ant Design Vue, and Vant UI</i>
</p>

<p align="center">
  <a href="https://github.com/mhxy13867806343/gotod-components-ui"><img src="https://img.shields.io/badge/GitHub-gotod--components--ui-blue.svg?logo=github" alt="GitHub"></a>
  <a href="https://gitee.com/fangjiayu/gotod-components-ui"><img src="https://img.shields.io/badge/Gitee-gotod--components--ui-red.svg?logo=gitee" alt="Gitee"></a>
  <a href="https://gitcode.com/m200s/gotod-components-ui"><img src="https://img.shields.io/badge/GitCode-gotod--components--ui-orange.svg" alt="GitCode"></a>
  <img src="https://img.shields.io/badge/Godot-4.x%20%7C%204.6%2B-478cbf?logo=godotengine&logoColor=white" alt="Godot 4.x">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

---

## 🌟 Highlights

- 🧩 **Vue Component Ergonomics**: Intuitive API conventions matching **Naive UI**, **Element Plus**, **Ant Design Vue**, and **Vant UI**.
- 🎨 **Multi-Preset Design Tokens**: Built-in **Naive Green**, **Element Blue**, **AntD Geek Blue**, **Vant Red/Orange**, and Dark / Light modes.
- 📦 **Comprehensive Components**: Includes Buttons, Typography, Dividers, Inputs, Selects, Switches, Checkboxes, Radios, Sliders, Forms, Dialogs/Modals, Message Toasts, Alerts, Drawers, Cards, Tags, Badges, Avatars, Progress bars, Tabs, Collapses, and Steps.
- 💻 **Live Web Preview & Code Copying**: Complete interactive web showcase to simulate component behaviors in the browser with one-click GDScript code copying.
- ⚡ **Pure GDScript & Highly Optimized**: 100% native Godot 4 Control nodes with buttery-smooth tweens and responsive layouts.

---

## 🚀 Interactive Web Preview

Experience all components live with one-click code copy:

1. Open `index.html` located at the root of the project in any browser.
2. Or start a quick HTTP server:
   ```bash
   python3 -m http.server 8080
   # Open http://localhost:8080
   ```
3. Explore theme switching, modal popups, floating toast messages, form controls, and copy GDScript snippets.

---

## 📦 Installation & Setup

### As a Godot Addon (Recommended)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/mhxy13867806343/gotod-components-ui.git
   ```
2. Copy `addons/gotod_ui` into your project's `addons/` directory.
3. In Godot 4 Editor:
   - Go to **Project -> Project Settings -> Plugins**.
   - Enable **Gotod Components UI**.
4. Configure Autoloads (if not configured automatically):
   - `GMessage`: `res://addons/gotod_ui/components/feedback/g_message.gd`
   - `GotodTheme`: `res://addons/gotod_ui/theme/gotod_theme.gd`

---

## 📚 Quick Usage Examples

### 1. Button (`GButton`)

```gdscript
var btn = GButton.new()
btn.text = "Submit Action"
btn.button_type = GButton.ButtonType.PRIMARY
btn.variant = GButton.Variant.SOLID
btn.shape = GButton.Shape.ROUND
btn.pressed.connect(func(): GMessage.success("Action succeeded!"))
add_child(btn)
```

### 2. Message Toast (`GMessage`)

```gdscript
GMessage.success("Saved successfully!")
GMessage.warning("Please check your input")
GMessage.error("Network request failed")
GMessage.info("New update available")
```

### 3. Modal Dialog (`GDialog`)

```gdscript
var dialog = GDialog.new()
dialog.title = "Confirmation"
dialog.content_text = "Are you sure you want to proceed?"
dialog.confirmed.connect(func(): GMessage.success("Confirmed!"))
dialog.cancelled.connect(func(): GMessage.info("Cancelled"))
add_child(dialog)

dialog.open()
```

### 4. Switch & Input (`GSwitch`, `GInput`)

```gdscript
var input = GInput.new()
input.placeholder_text = "Enter your username..."
input.clearable = true
add_child(input)

var switch = GSwitch.new()
switch.checked = true
switch.toggled.connect(func(val): print("Switch is: ", val))
add_child(switch)
```

---

## 🎨 Theme Customization

Switch themes dynamically at runtime:

```gdscript
# Switch to Element Plus Theme
GotodTheme.instance.current_preset = GThemeTokens.Preset.ELEMENT_PLUS

# Switch to Ant Design Theme
GotodTheme.instance.current_preset = GThemeTokens.Preset.ANT_DESIGN

# Switch between Light / Dark Mode
GotodTheme.instance.current_mode = GThemeTokens.Mode.LIGHT
```

---

## 📂 Project Structure

```
gotod-components-ui/
├── addons/
│   └── gotod_ui/                     # Core Component Addon
│       ├── plugin.cfg                # Plugin metadata
│       ├── plugin.gd                 # Custom nodes registration
│       ├── theme/                    # Theme manager and tokens
│       │   ├── gotod_theme.gd        # Global theme engine
│       │   └── theme_tokens.gd       # Theme color palette presets
│       └── components/               # GDScript UI components
│           ├── general/              # GButton, GText, GDivider, GIcon
│           ├── form/                 # GInput, GTextarea, GSelect, GSwitch, GCheckbox, GRadio, GSlider, GForm
│           ├── feedback/             # GDialog, GMessage, GAlert, GDrawer, GTooltip, GLoading
│           ├── data/                 # GCard, GTag, GBadge, GAvatar, GProgress, GTabs, GCollapse, GSteps
│           └── layout/               # GSpace
├── demo/                             # In-engine interactive showcase demo
│   ├── demo_main.tscn
│   └── demo_main.gd
├── index.html                        # Web documentation & live playground
├── project.godot                     # Godot 4.x project settings
├── LICENSE                           # MIT License
├── README.md                         # Chinese Documentation
└── README.en.md                      # English Documentation
```

---

## 🔗 Repository Remotes

- **GitCode**: [https://gitcode.com/m200s/gotod-components-ui.git](https://gitcode.com/m200s/gotod-components-ui.git)
- **GitHub**: [https://github.com/mhxy13867806343/gotod-components-ui.git](https://github.com/mhxy13867806343/gotod-components-ui.git)
- **Gitee**: [https://gitee.com/fangjiayu/gotod-components-ui.git](https://gitee.com/fangjiayu/gotod-components-ui.git)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
