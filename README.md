# Gotod Components UI 🎨

<p align="center">
  <b>专为 Godot 4.x (4.6+) 打造的 Vue 风格现代化 UI 组件库</b>
  <br>
  <i>融合 Naive UI、Element Plus、Ant Design Vue 与 Vant UI 设计精髓</i>
</p>

<p align="center">
  <a href="https://github.com/mhxy13867806343/gotod-components-ui"><img src="https://img.shields.io/badge/GitHub-gotod--components--ui-blue.svg?logo=github" alt="GitHub"></a>
  <a href="https://gitee.com/fangjiayu/gotod-components-ui"><img src="https://img.shields.io/badge/Gitee-gotod--components--ui-red.svg?logo=gitee" alt="Gitee"></a>
  <a href="https://gitcode.com/m200s/gotod-components-ui"><img src="https://img.shields.io/badge/GitCode-gotod--components--ui-orange.svg" alt="GitCode"></a>
  <img src="https://img.shields.io/badge/Godot-4.x%20%7C%204.6%2B-478cbf?logo=godotengine&logoColor=white" alt="Godot 4.x">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

---

## 🌟 核心特性

- 🧩 **Vue 风格开发体验**：深度吸纳 **Naive UI**、**Element Plus**、**Ant Design Vue** 及 **Vant UI** 的组件 API 规范与视觉质感。
- 🎨 **多套主流主题预设**：内置 **Naive 绿**、**Element 蓝**、**AntD 极客蓝**、**Vant 橙红**及深浅色（Dark/Light）模式动态换肤。
- 📦 **开箱即用丰富组件**：涵盖基础（Button、Text、Divider）、表单（Input、Select、Switch、Checkbox、Radio、Slider、Form）、反馈（Dialog、Message Toast、Alert、Drawer）及数据展示（Card、Tag、Badge、Avatar、Progress、Tabs、Collapse、Steps）。
- 💻 **网页在线预览与复制代码**：配备交互式 Web 演示系统，支持实时模拟组件交互，一键复制 GDScript 代码与场景属性。
- ⚡ **纯 GDScript 轻量高效**：基于 Godot 4 渲染机制深度优化，支持跨平台（Desktop / Mobile / Web Export）。

---

## 🚀 网页在线预览

本项目自带单页文档与交互式预览系统（可直接部署于 GitHub/Gitee/GitCode Pages）：

1. 直接在浏览器打开项目根目录下的 `index.html`。
2. 或开启本地简易服务器：
   ```bash
   python3 -m http.server 8080
   # 访问 http://localhost:8080
   ```
3. 在网页中您可以：
   - 实时切换 4 大主流主题预设（Naive / Element / AntD / Vant）
   - 切换深色 / 浅色模式
   - 点击预览各种组件动效与弹窗交互
   - 点击 **"Copy GDScript"** 一键复制代码至剪贴板

---

## 📦 安装与配置

### 方式一：作为 Godot 插件安装（推荐）

1. 将本仓库克隆或下载解压到您的 Godot 项目中：
   ```bash
   git clone https://github.com/mhxy13867806343/gotod-components-ui.git
   ```
2. 复制 `addons/gotod_ui` 目录至您项目的 `addons/` 文件夹下。
3. 打开 Godot 4 编辑器：
   - 进入 **项目 (Project) -> 项目设置 (Project Settings) -> 插件 (Plugins)**。
   - 启用 **Gotod Components UI**。
4. 在 **Autoload (全局加载)** 中添加（若未自动配置）：
   - `GMessage`: `res://addons/gotod_ui/components/feedback/g_message.gd`
   - `GotodTheme`: `res://addons/gotod_ui/theme/gotod_theme.gd`

---

## 📚 组件目录与示例

### 1. Button 按钮 (`GButton`)

```gdscript
# 创建 Primary 主要按钮
var btn = GButton.new()
btn.text = "提交数据"
btn.button_type = GButton.ButtonType.PRIMARY
btn.variant = GButton.Variant.SOLID
btn.shape = GButton.Shape.ROUND
btn.pressed.connect(func(): GMessage.success("操作成功！"))
add_child(btn)
```

### 2. Message 全局提示 (`GMessage`)

```gdscript
# 全局静态调用悬浮吐司
GMessage.success("保存成功！")
GMessage.warning("请注意检查输入项")
GMessage.error("网络连接超时")
GMessage.info("有新版本可用")
```

### 3. Dialog 模态弹窗 (`GDialog`)

```gdscript
var dialog = GDialog.new()
dialog.title = "确认删除"
dialog.content_text = "确认删除该配置项？此操作不可撤回。"
dialog.confirmed.connect(func(): GMessage.success("已确认删除"))
dialog.cancelled.connect(func(): GMessage.info("已取消操作"))
add_child(dialog)

dialog.open()
```

### 4. Form 表单与输入 (`GInput`, `GSwitch`, `GSelect`)

```gdscript
var input = GInput.new()
input.placeholder_text = "请输入用户名..."
input.clearable = true
input.text_changed.connect(func(val): print("输入值: ", val))
add_child(input)

var switch = GSwitch.new()
switch.checked = true
switch.toggled.connect(func(is_on): print("开关状态: ", is_on))
add_child(switch)
```

---

## 🎨 主题动态切换

您可以随时在运行时切换主题与深浅模式：

```gdscript
# 切换为 Element Plus 风格
GotodTheme.instance.current_preset = GThemeTokens.Preset.ELEMENT_PLUS

# 切换为 Ant Design 风格
GotodTheme.instance.current_preset = GThemeTokens.Preset.ANT_DESIGN

# 切换为浅色模式
GotodTheme.instance.current_mode = GThemeTokens.Mode.LIGHT
```

---

## 📂 项目结构

```
gotod-components-ui/
├── addons/
│   └── gotod_ui/                     # 核心组件库与插件
│       ├── plugin.cfg                # 插件配置文件
│       ├── plugin.gd                 # 自定义节点注册
│       ├── theme/                    # 主题引擎与 Token 定义
│       │   ├── gotod_theme.gd        # 全局主题管理器
│       │   └── theme_tokens.gd       # Naive/Element/AntD/Vant 调色板
│       └── components/               # GDScript 组件集合
│           ├── general/              # GButton, GText, GDivider, GIcon
│           ├── form/                 # GInput, GTextarea, GSelect, GSwitch, GCheckbox, GRadio, GSlider, GForm
│           ├── feedback/             # GDialog, GMessage, GAlert, GDrawer, GTooltip, GLoading
│           ├── data/                 # GCard, GTag, GBadge, GAvatar, GProgress, GTabs, GCollapse, GSteps
│           └── layout/               # GSpace
├── demo/                             # 引擎内交互式演示场景
│   ├── demo_main.tscn
│   └── demo_main.gd
├── index.html                        # 网页在线交互式预览与文档系统
├── project.godot                     # Godot 4.x 项目配置
├── LICENSE                           # MIT 开源协议
├── README.md                         # 中文文档
└── README.en.md                      # 英文文档
```

---

## 🔗 代码仓库

- **GitCode**: [https://gitcode.com/m200s/gotod-components-ui.git](https://gitcode.com/m200s/gotod-components-ui.git)
- **GitHub**: [https://github.com/mhxy13867806343/gotod-components-ui.git](https://github.com/mhxy13867806343/gotod-components-ui.git)
- **Gitee**: [https://gitee.com/fangjiayu/gotod-components-ui.git](https://gitee.com/fangjiayu/gotod-components-ui.git)

---

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 许可协议开源。
