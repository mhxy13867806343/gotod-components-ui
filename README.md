# Gotod Components UI 🎨

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

## 🌐 在线实时交互预览站点

本项目自带完整的单页文档与交互式演练系统，已部署上线：

👉 **[https://mhxy13867806343.github.io/gotod-components-ui/](https://mhxy13867806343.github.io/gotod-components-ui/)**

在在线演示中，您可以体验：
- 4 大主流设计主题切换（**Naive 绿**、**Element 蓝**、**AntD 极客蓝**、**Vant 橙红**）与深浅色模式。
- 35+ 基础、表单、反馈、数据展示及游戏专用控件的实时交互。
- 2D 游戏数学、物理运动学、网络请求、跨页面通信与场景转场沙盒。
- 点击 **"Copy GDScript"** 一键复制组件与系统源码。

---

## 🌟 核心体系与特性

### 1. 🧩 35+ 开箱即用 UI 组件与游戏专用控件
- **基础控件**：Button 按钮、Text 排版文本、Divider 分割线、Icon 图标、Fab 悬浮按钮。
- **表单输入**：Input 输入框、InputNumber 数字步进、Select 选择器、Switch 开关、Checkbox 复选框、Radio 单选框、Slider 滑块、Stepper 步进器、Picker 拾取器、Form 响应式表单容器。
- **反馈交互**：Dialog 模态弹窗、Message 全局浮动吐司、NoticeBar 滚动通告栏、Toast 轻提示、Dialogue JRPG/剧情对话流、Chat 微信/即时通讯流、InteractPrompt 浮动交互按键、Alert 警告条、Drawer 抽屉、Tooltip 提示、Popconfirm 气泡确认、Skeleton 骨架屏、Loading 遮罩、Tour 漫游引导。
- **数据展示**：Card 卡片、Tag 标签、Badge 徽标、Avatar 头像、Progress 进度条、Tabs 选项卡、Collapse 折叠面板、Steps 步骤条、Space 间距容器。

### 2. 🎰 Vue 风格点语法插槽系统 (`GSlotProxy`)
- **默认无名插槽**：组件默认指向 default 插槽，`btn.slotName.color = "red"` 或 `btn.slotName.text = "确认支付"` 直接赋值。
- **具名插槽点语法**：`dlg.header.text = "🔥 获得神话宝箱"`，`dlg.footer.confirm_text = "立即开启"`。
- **动态自定义插槽**：支持 `card.slotName = "t1"`，`card.t1.color = "cyan"`，`card.t1.text = 124` 动态透传与强转。
- **保留字防冲突守卫**：全自动拦截 Godot 4 系统属性冲突，提供明确的运行时警告与调试建议。

### 3. 🎯 2D 游戏数学与坐标系统 (`GCoord`)
- **屏幕边缘视野外目标指示器** (`get_offscreen_indicator_2d`)：自动计算 Boss/精英怪在屏幕边缘的夹持坐标、指示箭头旋转角及世界距离。
- **2.5D Isometric 等距投影转换** (`cartesian_to_isometric_2d` / `isometric_to_cartesian_2d`)：45° 斜视角与笛卡尔网格互转。
- **宝箱爆金币抛物线轨迹** (`get_loot_arc_pos_2d`)：二阶贝塞尔抛物线动画。
- **环形弹幕与护盾点集** (`get_orbit_points_2d`)：均匀分布圆周轨道坐标。
- **2D 扇形攻击与视野检测** (`is_in_fov_cone_2d`)：圆锥扇形夹角判定。

### 4. ⚙️ 2D 物理运动学与碰撞装配 (`GPhysics`)
- **跳跃物理公式计算**：根据期望跳跃高度 $h$ 与到达顶点时间 $t$，精确求解起跳初速度 $v = \frac{2h}{t}$ 与重力加速度 $g = \frac{2h}{t^2}$。
- **范围爆炸冲击力** (`apply_explosion_impulse_2d`)：根据距离衰减对周围 `RigidBody2D` 施加径向冲击力。
- **动态碰撞体装配**：一行代码为节点添加 Box / Circle / Capsule 碰撞体。

### 5. 🌐 网络与多人游戏通信 (`GAxios` / `GWebSocket` / `GMultiplayer`)
- **Axios 风格 HTTP 客户端** (`GAxios`)：支持全局请求/响应拦截器、JWT Token 自动注入、超时控制与 RESTful 封装。
- **WebSocket 实时客户端** (`GWebSocket`)：支持自动心跳保活、断线重连与全双工数据监听。
- **高阶多人联机房间** (`GMultiplayer`)：基于 ENet 封装的一键开房、加入房间与 RPC 同步。

### 6. ⚡ UniApp / Vue 风格全局跨页面通讯 (`GEvent`)
- 还原 `uni.$emit`、`uni.$on`、`uni.$once`、`uni.$off` 语法。
- **深度防内存泄漏**：支持传入 `self` 节点，节点离开场景树时全自动注销监听！
- 提供与 Godot 官方推荐 **Autoload + 强类型信号 (Typed Signals)** 的架构对比与标准代码。

### 7. 🚀 场景路由与 8 大转场动画 (`GRouter`)
- 极简跳转：`GRouter.push("res://scenes/shop.tscn")`
- 8 种平滑转场：4 方向滑动（左/右/上/下）+ 3 大中心缩放（中心放大展开、远景缩小汇聚、Q弹果冻回弹）+ 经典淡入淡出。
- **20+ 批量参数自动装配**：`GRouter.apply_params_to(self)` 一键反射注入同名变量。

### 8. 🎨 全能数据格式化 (`GFormat`)
- HP 动态渐变色（健康绿/警告黄/濒死红）、时长转时分秒、万/亿/K/M/B 大数值缩写、词条属性增减 (+15%/-20)、装备品阶炫彩 BBCode、文件字节与网速。

### 9. 🎵 5 大多媒体资产加载方案 (`GAsset`)
- 多线程异步加载 (`await GAsset.load_async`)、外部 MOD/本地头像动态读取、16 路全局音效池、BGM 双通道交叉淡入淡出、SpriteSheet 图集网格切片。

---

## 📦 项目目录结构

```
your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 35+ Vue/Uni 风格 UI 组件
│       ├── core/          # 插槽代理 (GSlotProxy)、样式与生命周期守卫
│       ├── theme/         # 主题 Token 与样式盒引擎 (Naive, Element, AntD, Vant)
│       ├── events/        # 全局事件总线 (GEvent uni.$emit / uni.$on)
│       ├── router/        # 场景转场路由管理器 (GRouter)
│       ├── utils/         # 网络 (Axios/WS/联机)、2D坐标、物理公式、格式化、资产加载
│       ├── lifecycle/     # 生命周期安全守卫 (GLifecycleGuard)
│       ├── plugin.cfg     # 插件配置文件
│       └── plugin.gd      # 节点自动注册插件脚本
├── assets/                # 在线交互文档样式与脚本资源
├── index.html             # 交互式文档预览系统单页
└── project.godot
```

---

## 🚀 安装与快速上手

### 方式 1: 直接下载发行版压缩包 (推荐)
- 👉 **[GitHub Releases 发行版页面下载](https://github.com/mhxy13867806343/gotod-components-ui/releases)**
- 📦 **[一键直链下载 v1.0.0 压缩包 (.zip)](https://github.com/mhxy13867806343/gotod-components-ui/archive/refs/tags/v1.0.0.zip)**

下载并解压后，将 `addons/gotod_ui` 文件夹直接复制到您的 Godot 4 项目根目录下的 `res://addons/` 中即可。

### 方式 2: 通过 Git 克隆仓库
```bash
git clone https://github.com/mhxy13867806343/gotod-components-ui.git
```

### 启用插件步骤
1. 打开 Godot 4 编辑器。
2. 点击顶部菜单 **项目 (Project) -> 项目设置 (Project Settings) -> 插件 (Plugins)**。
3. 勾选启用 **Gotod Components UI**。
4. 启用后即可直接在场景树中添加组件节点，或在 GDScript 脚本中直接调用全部工具类！

---

## 📚 快速代码范例

### 1. 创建 UI 按钮与提示
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

### 2. 跨页面全局通信 (GEvent / uni.$emit)
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

### 3. Axios 风格异步请求
```gdscript
var res: Dictionary = await GAxios.get("https://api.game.com/player/profile", { "id": 1001 })
if res.success:
    print("玩家数据获取成功:", res.data)
```

### 4. 2D 视野外敌人边缘指示与跳跃物理
```gdscript
# 1. 计算视野外 Boss 屏幕边缘指示器坐标与旋转角
var indicator = GCoord.get_offscreen_indicator_2d(self, boss.global_position, 40.0)
$ArrowIcon.position = indicator.screen_pos
$ArrowIcon.rotation = indicator.angle

# 2. 精确起跳速度计算
var jump_velocity = GPhysics.calculate_jump_velocity(180.0, 0.4) # 高度 180px, 时间 0.4s
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
