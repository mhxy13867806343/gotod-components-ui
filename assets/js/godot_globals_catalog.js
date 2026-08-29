// =========================================================================
// Godot 4.x 全局方法与 Node 核心常用函数速查手册 (Godot Global & Node Core APIs)
// =========================================================================

window.GODOT_GLOBALS_CATALOG = {
  'godot-globals': {
    title: 'Godot 全局内置方法与 Node 核心 API (Global & Node APIs)',
    desc: '系统化梳理 GDScript 中最常用、最核心的全局内置函数（@GlobalScope）、Node 节点树通用方法以及 Object 反射机制，助您快速编写优雅的 Godot 4 逻辑。',
    demos: [
      {
        title: '1. Node 核心节点树操作 (Tree Operations: add_child, queue_free, get_node)',
        render: `
          <div style="background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:14px; color:var(--text-primary);">🌐 Node 节点树动态挂载与销毁</span>
              <span class="g-tag g-tag-primary">Node 基类继承</span>
            </div>
            <p style="font-size:13px; color:var(--text-regular); margin:0;">在任意继承自 <code style="color:var(--primary); font-family:var(--font-mono);">Node</code> / <code style="color:var(--primary); font-family:var(--font-mono);">Control</code> 的脚本中，均可直接像本地方法一样调用 <code style="color:var(--primary); font-family:var(--font-mono);">add_child()</code> 动态挂载节点，或调用 <code style="color:var(--primary); font-family:var(--font-mono);">queue_free()</code> 安全释放内存。</p>
            <div style="display:flex; gap:12px;">
              <button class="g-btn g-btn-primary" onclick="showToast('模拟 add_child: 新增战斗血条控件', 'success')">模拟 add_child() 挂载</button>
              <button class="g-btn g-btn-danger" onclick="showToast('模拟 queue_free: 延迟安全释放节点', 'warning')">模拟 queue_free() 释放</button>
            </div>
          </div>
        `,
        code: `# GDScript: Node 核心节点树操作
# 1. 动态创建并挂载子节点
var new_btn = GButton.new()
new_btn.text = "战斗开始"
add_child(new_btn) # 挂载到当前节点树下

# 2. 获取节点 (相对路径 / $语法糖)
var hp_bar = $VBox/HealthBar
var parent_node = get_parent()

# 3. 遍历子节点
for child in get_children():
    if child is Control:
        child.visible = true

# 4. 安全释放节点内存
target_enemy.queue_free()`
      },
      {
        title: '2. @GlobalScope 引擎全局内置函数 (Built-in Global Functions)',
        render: `
          <div style="background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:14px; color:var(--text-primary);">⚡ @GlobalScope 常用数学、资源与调试函数</span>
              <span class="g-tag g-tag-success">全局无前缀直接调用</span>
            </div>
            <p style="font-size:13px; color:var(--text-regular); margin:0;">由 GDScript 全局作用域提供，无需导入任何命名空间即可直接在任意代码行调用：</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <span class="g-tag g-tag-default">preload() 常量预加载</span>
              <span class="g-tag g-tag-default">clamp() 数值区间限制</span>
              <span class="g-tag g-tag-default">lerp() 线性插值</span>
              <span class="g-tag g-tag-default">print_rich() 富文本日志</span>
              <span class="g-tag g-tag-default">is_instance_valid() 实例安全检测</span>
            </div>
          </div>
        `,
        code: `# GDScript: @GlobalScope 全局内置函数
# 1. 资源预加载与动态加载
const ICON_STAR = preload("res://icons/star.svg")
var dynamic_scene = load("res://scenes/Level_02.tscn")

# 2. 数学限制与平滑插值
var current_hp = clamp(hp + 20, 0, max_hp)
position = lerp(position, target_pos, delta * 5.0)

# 3. 随机数与数值映射
var drop_gold = randi_range(100, 500)
var alpha = remap(distance, 100.0, 500.0, 1.0, 0.0)

# 4. 安全实例检测与富文本打印
if is_instance_valid(target_boss):
    print_rich("[color=green][b]Boss Target Locked![/b][/color]")`
      }
    ],
    props: [
      { name: 'add_child(node, force_readable_name, internal)', type: 'Node -> void', default: 'Node API', desc: '将指定的子节点挂载到当前节点树下' },
      { name: 'remove_child(node)', type: 'Node -> void', default: 'Node API', desc: '从当前节点树移除子节点（不释放内存）' },
      { name: 'queue_free()', type: '() -> void', default: 'Node API', desc: '在当前帧末安全销毁当前节点并释放内存' },
      { name: 'get_node(path) / $Path', type: 'NodePath -> Node', default: 'Node API', desc: '根据相对或绝对路径检索场景树中的目标节点' },
      { name: 'get_parent()', type: '() -> Node', default: 'Node API', desc: '获取当前节点的直接父级节点' },
      { name: 'get_children()', type: '() -> Array[Node]', default: 'Node API', desc: '获取当前节点所有的直接子节点列表' },
      { name: 'create_tween()', type: '() -> Tween', default: 'Node API', desc: '创建绑定在当前节点生命周期上的补间动画管理器' },
      { name: 'get_tree()', type: '() -> SceneTree', default: 'Node API', desc: '获取主场景树单例，用于全局切场景与暂停控制' },
      { name: 'preload(path)', type: 'String -> Resource', default: '@GlobalScope', desc: '编译期静态预加载资源 (Texture/Scene/Script)' },
      { name: 'load(path)', type: 'String -> Resource', default: '@GlobalScope', desc: '运行时动态根据路径加载资源' },
      { name: 'clamp(val, min, max)', type: 'Variant -> Variant', default: '@GlobalScope', desc: '将数值限制在 [min, max] 区间范围内' },
      { name: 'lerp(from, to, weight)', type: 'Variant -> Variant', default: '@GlobalScope', desc: '数值/向量/颜色的标准线性插值计算' },
      { name: 'is_instance_valid(obj)', type: 'Object -> bool', default: '@GlobalScope', desc: '安全判断对象实例是否存活且未被释放' }
    ],
    events: [
      { name: 'tree_entered()', desc: '节点进入场景树时触发', params: '()' },
      { name: 'tree_exited()', desc: '节点退出场景树时触发', params: '()' },
      { name: 'ready()', desc: '节点及其所有子节点均初始化就绪时触发', params: '()' }
    ],
    methods: [
      { name: 'add_child(node: Node)', desc: '动态添加并挂载子节点', params: '(node: Node) -> void' },
      { name: 'remove_child(node: Node)', desc: '从树中剥离指定子节点', params: '(node: Node) -> void' },
      { name: 'queue_free()', desc: '延迟到当前帧安全销毁释放', params: '() -> void' },
      { name: 'reparent(new_parent: Node)', desc: '一键将节点迁移至新的父节点', params: '(new_parent: Node) -> void' }
    ],
    slots: []
  },

  'godot-docs': {
    title: 'Godot 4 官方文档与资源传送门 (Official Docs Portal)',
    desc: '汇总 Godot 引擎官方核心参考文档、类库全景与学习资源，助您随时深入查阅底层架构细节。',
    demos: [
      {
        title: '1. Godot 官方核心文档直达通道 (Official Quick Links)',
        render: `
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; width:100%;">
            <a href="https://docs.godotengine.org/zh-cn/4.x/classes/class_@globalscope.html" target="_blank" style="text-decoration:none; color:inherit; background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:8px; transition:border-color 0.2s;" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border-base)'">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:var(--primary); font-size:15px;">🌐 @GlobalScope 官方文档</span>
                <span>↗</span>
              </div>
              <p style="font-size:12px; color:var(--text-secondary); margin:0; line-height:1.5;">全量查阅 Godot 4 所有的全局内置数学公式、资源加载、类型判定与日志函数。</p>
            </a>

            <a href="https://docs.godotengine.org/zh-cn/4.x/classes/class_node.html" target="_blank" style="text-decoration:none; color:inherit; background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:8px; transition:border-color 0.2s;" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border-base)'">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:var(--primary); font-size:15px;">🌳 Node 核心节点类官方文档</span>
                <span>↗</span>
              </div>
              <p style="font-size:12px; color:var(--text-secondary); margin:0; line-height:1.5;">深入了解场景树层级结构、节点生命周期、进程模式与群组（Groups）管理机制。</p>
            </a>

            <a href="https://docs.godotengine.org/zh-cn/4.x/classes/class_control.html" target="_blank" style="text-decoration:none; color:inherit; background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:8px; transition:border-color 0.2s;" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border-base)'">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:var(--primary); font-size:15px;">🎨 Control UI 控件系统官方文档</span>
                <span>↗</span>
              </div>
              <p style="font-size:12px; color:var(--text-secondary); margin:0; line-height:1.5;">锚点（Anchors）、边距（Margins）、主题覆盖（Theme Overrides）与响应式排版指南。</p>
            </a>

            <a href="https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/gdscript/gdscript_basics.html" target="_blank" style="text-decoration:none; color:inherit; background:var(--bg-surface); padding:18px 20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:8px; transition:border-color 0.2s;" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border-base)'">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:var(--primary); font-size:15px;">📖 GDScript 基础教程与语法规范</span>
                <span>↗</span>
              </div>
              <p style="font-size:12px; color:var(--text-secondary); margin:0; line-height:1.5;">掌握静态强类型推断、Lambda 匿名函数、信号绑定与协程 await 最佳实践。</p>
            </a>
          </div>
        `,
        code: `# 随时访问 Godot 官方中文文档站点：
# https://docs.godotengine.org/zh-cn/4.x/`
      }
    ],
    props: [],
    events: [],
    methods: [],
    slots: []
  }
};
