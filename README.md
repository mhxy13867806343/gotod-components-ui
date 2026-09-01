# Gotod Components UI 🎨

<p align="center">
  <b><a href="README.md">🇨🇳 简体中文</a></b> |
  <b><a href="README.en.md">🇺🇸 English</a></b> |
  <b><a href="CHANGELOG.md">📋 版本日志 & Bug修复</a></b> |
  <b><a href="https://mhxy13867806343.github.io/gotod-components-ui/">🌐 在线预览</a></b>
</p>

<p align="center">
  <b>专为 Godot 4.x (4.6+) 打造的 Vue / UniApp 风格现代化 UI 组件库与全套游戏研发工具链</b>
  <br>
  <i>融合 Naive UI、Element Plus、Ant Design Vue 与 Vant UI 设计精髓</i>
</p>

<p align="center">
  <a href="https://mhxy13867806343.github.io/gotod-components-ui/"><img src="https://img.shields.io/badge/Online%20Demo-GitHub%20Pages-success.svg?logo=githubpages" alt="Online Demo"></a>
  <a href="https://github.com/mhxy13867806343/gotod-components-ui"><img src="https://img.shields.io/badge/GitHub-gotod--components--ui-blue.svg?logo=github" alt="GitHub"></a>
  <a href="https://gitee.com/fangjiayu/gotod-components-ui"><img src="https://img.shields.io/badge/Gitee-gotod--components--ui-red.svg?logo=gitee" alt="Gitee"></a>
  <a href="https://gitcode.com/m200s/gotod-components-ui"><img src="https://img.shields.io/badge/GitCode-gotod--components--ui-orange.svg" alt="GitCode"></a>
  <img src="https://img.shields.io/badge/Godot-4.x%20%7C%204.6%2B-478cbf?logo=godotengine&logoColor=white" alt="Godot 4.x">
  <a href="#-开源协议-license"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"></a>
</p>

---

## 📱 全平台兼容性支持说明 (Multi-Platform Compatibility)

| <img src="https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white" height="20"> | <img src="https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white" height="20"> | <img src="https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black" height="20"> | <img src="https://img.shields.io/badge/Android-3DDC84?style=flat&logo=android&logoColor=white" height="20"> | <img src="https://img.shields.io/badge/iOS-000000?style=flat&logo=apple&logoColor=white" height="20"> | <img src="https://img.shields.io/badge/visionOS-9333EA?style=flat&logo=apple&logoColor=white" height="20"> | <img src="https://img.shields.io/badge/Web_HTML5-E34F26?style=flat&logo=html5&logoColor=white" height="20"> |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Windows Desktop** | **macOS** | **Linux** | **Android** | **iOS** | **visionOS** | **Web (Wasm)** |
| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

> Gotod Components UI 基于 Godot 4.x (4.6+) 纯原生渲染架构打造，全部 52+ 组件与工具链均实现 **100% 跨平台零修改原生编译**。

---

## 🌐 在线实时交互预览站点

本项目自带完整的单页文档与交互式演练系统，已部署上线：

👉 **[https://mhxy13867806343.github.io/gotod-components-ui/](https://mhxy13867806343.github.io/gotod-components-ui/)**

在在线演示中，您可以体验：
- 4 大主流设计主题切换（**Naive 绿**、**Element 蓝**、**AntD 极客蓝**、**Vant 橙红**）与深浅色模式。
- 52+ 基础、表单、反馈、数据展示及游戏专用控件的实时交互。
- **GDScript 4.x** 与 **C# (.NET 8.0/9.0)** 双语言代码实时切换与一键复制。
- 2D 游戏数学、物理运动学、网络请求、跨页面通信与场景转场沙盒。
- 生产环境 52 组件全量摇树依赖扫描器 (Tree-Shaking Live Analyzer)。

---

## 🌟 核心体系与特性

### 🛡️ `gcd` 稳定基石认证规范 (Godot Component Done)
> **`[gcd]` 认证标识**：代表该组件已通过全场景实机游戏测试、多端生命周期覆盖、严格类型校验与边界异常自愈，已进入**稳定冻结保护状态**。
> 
> **研发守则**：后续版本升级中，凡带有 `[gcd]` 标记的历史核心代码与 API 签名将保持严格稳定与向下兼容，**绝不随意修改旧逻辑**；所有新能力以增量模式扩展，通过全套实操检验后赋予 `[gcd]` 标识。

### 1. 🧩 52+ 开箱即用 UI 组件与游戏专用控件 (全部核心均获 `[gcd]` 稳定认证)
- **基础控件**：`[gcd]` Button 按钮、`[gcd]` Text 排版文本、`[gcd]` Divider 分割线、`[gcd]` Icon 矢量图标（内置 30+ 款高频通用 UI 图标，更多 26,000+ 矢量图标可在[在线文档中心](https://mhxy13867806343.github.io/gotod-components-ui/)即时检索并一键复制）、`[gcd]` Fab 悬浮按钮、`[gcd]` Space 间距容器。
- **表单输入**：`[gcd]` Input 输入框、`[gcd]` Textarea 多行文本、`[gcd]` InputNumber 数字步进、`[gcd]` Select 选择器、`[gcd]` Switch 开关、`[gcd]` Checkbox 复选框、`[gcd]` Radio 单选框、`[gcd]` Slider 滑块、`[gcd]` Stepper 步进器、`[gcd]` Picker 拾取器、`[gcd]` Form 响应式表单容器。
- **反馈交互**：`[gcd]` Dialog 模态弹窗、`[gcd]` Dialogue JRPG剧情对话流、`[gcd]` Chat 聊天气泡、`[gcd]` Popup 弹出层、`[gcd]` Overlay 遮罩层、`[gcd]` ActionSheet 动作面板、`[gcd]` Popover 气泡卡片、`[gcd]` NoticeBar 滚动通告栏、`[gcd]` Message 全局浮动吐司、`[gcd]` MessageBox 确认/输入框、`[gcd]` Toast 轻提示、`[gcd]` Alert 警告条、`[gcd]` Drawer 抽屉、`[gcd]` Tooltip 提示、`[gcd]` Loading 加载、`[gcd]` Skeleton 骨架屏、`[gcd]` Tour 漫游引导。
- **数据展示**：`[gcd]` Card 卡片、`[gcd]` Tag 标签、`[gcd]` Badge 徽标、`[gcd]` Avatar 头像、`[gcd]` Progress 进度条、`[gcd]` Tabs 选项卡、`[gcd]` Collapse 折叠面板、`[gcd]` Steps 步骤条、`[gcd]` Table 表格、`[gcd]` VirtualList 百万级虚拟列表。
- **引擎工坊与生态**：`[gcd]` GHud3D 3D空间透视HUD、`[gcd]` GHaptic 跨平台触感马达、`[gcd]` GAIDialogueTree AI对话树、`[gcd]` GI18n 国际化引擎、`[gcd]` GParticleStudio 粒子工坊、`[gcd]` GSkeletonParticleBinder 骨骼挂点绑定、`[gcd]` GShaderStudio GPU着色器工坊、`[gcd]` GRouter 路由转场、`[gcd]` GEventBus 统一事件总线、`[gcd]` GStorage / GDataStore / GSaveManager 游戏存储栈。

> 💡 **纯净轻量化设计**：插件包采用按需精简架构，整体发布包仅 **~160 KB**（解压约 1 MB），默认预置 30+ 款常用核心图标，Godot 4 秒级导入无压力。如需使用其他特定图标，请直接访问[网页图标中心](https://mhxy13867806343.github.io/gotod-components-ui/)一键复制 SVG 源码或 GDScript 代码即可。

---

## 🚀 安装与快速上手 (Installation)

### 方式 1: 下载发布包 (.zip) (推荐)
- 👉 **[GitHub Releases 发行页](https://github.com/mhxy13867806343/gotod-components-ui/releases)**
- 📦 **[直接下载最新 v1.6.2 发布包 (.zip)](https://github.com/mhxy13867806343/gotod-components-ui/archive/refs/tags/v1.6.2.zip)**

解压并将 `addons/gotod_ui` 文件夹直接复制到您的 Godot 4 项目根目录下的 `res://addons/` 即可。


### 方式 2: Git 仓库克隆
```bash
git clone https://github.com/mhxy13867806343/gotod-components-ui.git
```

### 启用插件
1. 打开 Godot 4 编辑器。
2. 进入 **项目 (Project) -> 项目设置 (Project Settings) -> 插件 (Plugins)**。
3. 勾选 **Gotod Components UI** 后的 **启用 (Enable)** 复选框。
4. 即可在场景中自由添加组件节点，或在 GDScript / C# 中直接调用！

---

## 📚 快速代码范例 (GDScript & C# 双语支持)

### 1. 创建 UI 按钮与提示 (GButton & GMessage)

**GDScript 4.x**:
```gdscript
var btn = GButton.new()
btn.text = "进入战斗"
btn.button_type = GButton.ButtonType.PRIMARY
btn.pressed.connect(func():
    GMessage.success("正在前往副本战场！")
    GRouter.push("res://scenes/battle.tscn", { "stage_id": 108 }, GRouter.TransitionType.ZOOM_IN)
)
add_child(btn)
```

**C# (.NET 8.0/9.0)**:
```csharp
using Godot;
using GotodUI;

public partial class MyScene : Control
{
    public override void _Ready()
    {
        var btn = new GButton();
        btn.Text = "进入战斗";
        btn.ButtonType = GButton.ButtonTypeEnum.Primary;
        btn.Pressed += () => {
            GMessage.Success("正在前往副本战场！");
            GRouter.Push("res://scenes/battle.tscn", new Godot.Collections.Dictionary { { "stage_id", 108 } }, GRouter.TransitionTypeEnum.ZoomIn);
        };
        AddChild(btn);
    }
}
```

### 2. 创建多态悬浮操作按钮 (GFab)

**GDScript 4.x**:
```gdscript
# 方式 1: 批量动作数组快捷构建 / add_actions
var fab = GFab.create([
    { "name": "plus", "label": "新建副本" },
    { "name": "qrcode", "label": "扫码加入" }
])
fab.add_actions([
    { "name": "chat", "label": "公会聊天" },
    { "name": "setting", "label": "快捷设置" }
])
fab.item_clicked.connect(func(idx, name): GMessage.info("点击了: " + name))
add_child(fab)

# 方式 2: 完整配置对象 (支持自由拖拽与磁性贴边)
var fab2 = GFab.create({
    "direction": "vertical",
    "draggable": true,
    "magnetic_dock": true,
    "items": [{ "name": "potion", "label": "补血药水" }],
    "on_click": func(idx, name): GMessage.success("已使用: " + name)
})
```

**C# (.NET 8.0/9.0)**:
```csharp
var fab = new GFab();
fab.AddAction("plus", "新建副本");
fab.AddAction("qrcode", "扫码加入");
fab.ItemClicked += (idx, name) => GMessage.Info($"点击了: {name}");
AddChild(fab);
```

### 3. 跨页面全局通信 (GEvent / uni.$emit)

**GDScript 4.x**:
```gdscript
# 发送端:
GEvent.emit("user_info_updated", { "nickname": "龙骑士", "gold": 99999 })

# 接收端:
func _ready() -> void:
    GEvent.on("user_info_updated", func(data):
        $Nickname.text = data.get("nickname")
        $Gold.text = str(data.get("gold"))
    , self)
```

**C# (.NET 8.0/9.0)**:
```csharp
// 发送端:
GEvent.Emit("user_info_updated", new Godot.Collections.Dictionary {
    { "nickname", "龙骑士" },
    { "gold", 99999 }
});

// 接收端:
public override void _Ready()
{
    GEvent.On("user_info_updated", (data) => {
        var dict = (Godot.Collections.Dictionary)data;
        GetNode<Label>("Nickname").Text = dict["nickname"].AsString();
        GetNode<Label>("Gold").Text = dict["gold"].ToString();
    }, this);
}
```

### 4. Axios 风格异步请求 (GAxios)

**GDScript 4.x**:
```gdscript
var res: Dictionary = await GAxios.get("https://api.game.com/player/profile", { "id": 1001 })
if res.success:
    print("玩家数据获取成功:", res.data)
```

**C# (.NET 8.0/9.0)**:
```csharp
var res = await GAxios.GetAsync("https://api.game.com/player/profile", new Godot.Collections.Dictionary { { "id", 1001 } });
if (res.Success)
{
    GD.Print("玩家数据获取成功: ", res.Data);
}
```

### 5. 2D 视野外敌人边缘指示与跳跃物理 (GCoord & GPhysics)

**GDScript 4.x**:
```gdscript
# 1. 计算视野外 Boss 屏幕边缘指示器坐标与旋转角
var indicator = GCoord.get_offscreen_indicator_2d(self, boss.global_position, 40.0)
$ArrowIcon.position = indicator.screen_pos
$ArrowIcon.rotation = indicator.angle

# 2. 精确起跳速度计算
var jump_velocity = GPhysics.calculate_jump_velocity(180.0, 0.4) # 高度 180px, 时间 0.4s
```

**C# (.NET 8.0/9.0)**:
```csharp
// 1. 计算视野外 Boss 屏幕边缘指示器坐标与旋转角
var indicator = GCoord.GetOffscreenIndicator2D(this, boss.GlobalPosition, 40.0f);
GetNode<Node2D>("ArrowIcon").Position = indicator.ScreenPos;
GetNode<Node2D>("ArrowIcon").Rotation = indicator.Angle;

// 2. 精确起跳速度计算
float jumpVelocity = GPhysics.CalculateJumpVelocity(180.0f, 0.4f); // 高度 180px, 时间 0.4s
```

---

## 🛠️ Demo 实战问题排查与修复对比 (Bug Fixes & Before/After Code Comparison)

在针对真实 Godot 4 游戏实战项目 (`gotod-components-ui-demo` 记忆大师) 的开发与对齐中，对组件库底层进行了全方位的健壮性排查与修复：

### 1. `GDivider` 垂直方向分割线坐标与尺寸计算错误
* **问题现象**：垂直分割线绘制时误将 X 轴中点写为 `size.y / 2.0`，导致在长矩形控件中线条偏移甚至不可见；且切换方向时未同步刷新 `custom_minimum_size`。
* **修复前 (Before)**：
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.y / 2.0  # ❌ 错误使用了 Y 轴高度
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```
* **修复后 (After)**：
  ```gdscript
  func _draw() -> void:
      if orientation == Orientation.VERTICAL:
          var x = size.x / 2.0  # ✅ 正确使用 X 轴宽度居中
          draw_line(Vector2(x, 0), Vector2(x, size.y), col, 1.0)
  ```

### 2. `@tool` 脚本枚举类型 Setter 冲突与 `@export_enum` 规范
* **问题现象**：在 Godot 4 `@tool` 模式下直接使用自定义 Enum 作为 `@export` 类型容易在检查器或动态赋值时触发类型转换异常。
* **修复前 (Before)**：
  ```gdscript
  @export var button_type: ButtonType = ButtonType.DEFAULT:
      set(val):
          button_type = val
          _update_styles()  # ❌ 未就绪前调用易引发子节点空指针
  ```
* **修复后 (After)**：
  ```gdscript
  @export_enum("DEFAULT", "PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO") \
          var button_type: int = ButtonType.DEFAULT:
      set(val):
          button_type = val
          if is_node_ready():
              _update_styles()  # ✅ 增加 is_node_ready 防御守卫
  ```

### 3. `GFab` 悬浮按钮生命周期与 Pre-ready 调用崩溃
* **问题现象**：在 `_ready()` 执行前调用 `add_action()` 时，`_menu_container` 为空抛出 Null Reference。
* **修复前 (Before)**：
  ```gdscript
  func _rebuild_menu() -> void:
      for child in _menu_container.get_children():  # ❌ _menu_container 未初始化抛异常
          child.queue_free()
  ```
* **修复后 (After)**：
  ```gdscript
  func _rebuild_menu() -> void:
      if not _menu_container:
          _setup_layout()  # ✅ 允许在节点进入场景树前提前配置动作项
      for child in _menu_container.get_children():
          child.queue_free()
  ```

### 4. `GRouter` 转场动画死锁与旧场景释放后访问保护
* **问题现象**：静态 `push` 方法内部 `await` Tween 如果被外部跳过，可能导致 `_is_transitioning` 状态锁永久无法释放；快速连续转场时访问已释放的 `old_scene` 崩溃。
* **修复前 (Before)**：
  ```gdscript
  static func push(...) -> GResult:
      await _play_transition_animation(...)
      _is_transitioning = false
  ```
* **修复后 (After)**：
  ```gdscript
  static func push(...) -> Variant:
      _play_transition_animation(root, next_scene, transition, duration, false, tree, func():
          _is_transitioning = false  # ✅ 无论何时均能可靠释放状态锁
      )
      return GResult.ok(null)
  
  tween.finished.connect(func():
      if old_scene and old_scene != new_scene and is_instance_valid(old_scene):
          old_scene.queue_free()  # ✅ 增加 is_instance_valid 保护
  )
  ```

### 5. `GAxios` 字典安全索引与请求方法强类型转换
* **问题现象**：使用 `final_config.params` 点语法直接索引 Dictionary 字段报错；请求方法未显式强转为 `int`。
* **修复前 (Before)**：
  ```gdscript
  if final_config.has("params") and final_config.params is Dictionary:  # ❌ 点语法报错
      for k in final_config.params.keys(): ...
  ```
* **修复后 (After)**：
  ```gdscript
  if final_config.has("params") and final_config["params"] is Dictionary:  # ✅ 安全键索引
      for k in final_config["params"].keys(): ...
  var req_method: int = int(final_config.get("method", HTTPClient.METHOD_GET))  # ✅ 显式整型转换
  ```

---

## 📄 开源协议 (License)

本项目基于 **[MIT License](LICENSE)** 宽松开源协议发布。

允许任何个人或商业公司免费用于商业/非商业游戏开发、修改及二次分发，无需支付授权费用。

Copyright (c) 2026 gotod-components-ui Contributors
