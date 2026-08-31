// =========================================================================
// Gotod Components UI - Slots Catalog & Documentation Engine
// 深度对标 Vue 3 Slots RFC 标准规范，配套 Godot 4 GSlotProxy 点语法系统
// =========================================================================

window.SLOTS_CATALOG = {
  // ========================================================
  // 1. 插槽设计理念与点语法规范
  // ========================================================
  'slot-concept': {
    title: '🎰 Vue-Style Slots 插槽系统设计规范 (Slot System Overview)',
    desc: 'gotod-components-ui 深度对标 Vue 3 Slots RFC 标准，在 Godot 4 中独创 GSlotProxy 点语法代理引擎。开发者无需手动 add_child / remove_child，直接通过 xx.slotName = "header"、xx.header.text = "..."、xx.header.color = "gold" 进行极简、声明式的子节点挂载与动态样式配置。',
    demos: [
      {
        title: '1. Godot 插槽点语法标准模型 (Standard Dot Property Syntax)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);"><i class="fa-solid fa-code"></i> 插槽语法模型演示</span>
              <span class="g-tag g-tag-success">Godot 4.x</span>
            </div>
              <!-- Default Slot Box -->
              <div style="border:2px dashed var(--success); border-radius:8px; padding:12px; background:rgba(24,160,88,0.06);">
                <div style="font-size:11px; font-weight:700; color:var(--success); margin-bottom:4px;">1. 默认插槽 (Default Slot - 可直接省略 slotName = "")</div>
                <div style="font-size:10px; color:var(--text-secondary); margin-bottom:6px;">💡 组件实例化后默认即指向 default 插槽，无需显式赋值 slotName = ""</div>
                <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
                  btn.slotName.text = "确认支付 ¥99"<br>
                  btn.slotName.color = "gold"
                </div>
                <button class="g-btn g-btn-primary" onclick="showToast('点击了默认插槽按钮: 确认支付 ¥99', 'success')">
                  <span>确认支付 <b style="color:#fcd34d;">¥99</b></span>
                </button>
              </div>

              <!-- Named Slot Box -->
              <div style="border:2px dashed var(--warning); border-radius:8px; padding:12px; background:rgba(230,162,60,0.06);">
                <div style="font-size:11px; font-weight:700; color:var(--warning); margin-bottom:6px;">2. 具名插槽 (Named Slot: header/footer)</div>
                <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
                  dlg.slotName = "header"<br>
                  dlg.header.text = "🔥 首领宝箱"<br>
                  dlg.header.color = "gold"
                </div>
                <button class="g-btn g-btn-warning" onclick="openDialog('🔥 获得神话首领宝箱', '内含：极品神话圣剑 ×1 · 钻石 ×888', '立即开启', '收入背包')">
                  <i class="fa-solid fa-gift"></i> 打开具名插槽对话框
                </button>
              </div>

              <!-- Dynamic Named Slot Box -->
              <div style="border:2px dashed var(--primary); border-radius:8px; padding:12px; background:rgba(64,158,255,0.06);">
                <div style="font-size:11px; font-weight:700; color:var(--primary); margin-bottom:6px;">3. 动态自定义插槽 (Dynamic Slot: t1)</div>
                <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
                  card.slotName = "t1"<br>
                  card.t1.color = "cyan"<br>
                  card.t1.text = 124
                </div>
                <div style="padding:6px 12px; background:var(--bg-card); border:1px solid var(--primary); border-radius:6px; display:inline-flex; align-items:center; gap:8px;">
                  <span style="font-size:11px; color:#38bdf8; font-weight:700;">[Slot: t1]</span>
                  <span style="font-size:12px; font-weight:800; color:#38bdf8;">124 魔法穿透</span>
                </div>
              </div>
            </div>
        `,
        code: `# =========================================================================
# 🎰 Godot 4 插槽标准点语法使用规范 (Dot Slot Property Syntax)
# =========================================================================

# -------------------------------------------------------------------------
# 1. 默认无名插槽 (Default Slot)
# 💡 特性：组件默认即指向 default 插槽，"btn.slotName = """ 这一行完全可以不写！
# -------------------------------------------------------------------------
var btn = GButton.new()
# btn.slotName = ""            # 👈 这行可以省略不写！默认就是 default 插槽
btn.slotName.color = "red"     # 直接修改默认插槽文字颜色
btn.slotName.text = "确认支付"  # 直接设置默认插槽文本
# 也可以直接通过 btn.default 访问：
# btn.default.color = "red"

# -------------------------------------------------------------------------
# 2. 具名插槽访问 (Named Slots)
# -------------------------------------------------------------------------
var dlg = GDialog.new()
dlg.slotName = "header"        # 切换绑定至 header 具名插槽
dlg.header.text = "🔥 获得神话首领宝箱"
dlg.header.color = "gold"

dlg.slotName = "footer"        # 绑定至 footer 具名插槽
dlg.footer.confirm_text = "立即开启"
dlg.footer.cancel_text = "收入背包"

# -------------------------------------------------------------------------
# 3. 动态自定义具名插槽 (Dynamic Custom Slot: t1 / t2)
# -------------------------------------------------------------------------
var card = GCard.new()
card.slotName = "t1"           # 自定义插槽名为 t1
card.t1.color = "cyan"         # 动态赋值色彩
card.t1.text = 124             # 动态赋值文本或数值 (自动强转类型)
card.t1.visible = true`
      },
      {
        title: '2. 🚫 命名规范与保留字拦截守卫 (Reserved Keywords & Built-ins Guard)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:13px; color:var(--danger);"><i class="fa-solid fa-ban"></i> 严禁将系统保留字作为 slotName</span>
              <span class="g-tag g-tag-danger">运行时安全拦截</span>
            </div>
            
            <p style="font-size:11px; color:var(--text-secondary); line-height:1.6;">
              由于 Godot 点语法需要访问对象成员（如 <code>xx.slotName = "if"</code> 会导致后续无法通过 <code>xx.if</code> 访问，且引发 GDScript 语法冲突；<code>xx.slotName = "position"</code> 会覆盖 Node 核心属性），底层 <code>GSlotProxy.validate_slot_name()</code> 会自动检测并拦截下列保留字：
            </p>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <!-- Keywords Box -->
              <div style="background:rgba(245,108,108,0.06); border:1px solid rgba(245,108,108,0.3); border-radius:6px; padding:10px;">
                <div style="font-weight:700; font-size:11px; color:var(--danger); margin-bottom:4px;">❌ 严禁使用的 GDScript 关键字</div>
                <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-secondary); line-height:1.5;">
                  <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>match</code>, <code>var</code>, <code>func</code>, <code>class</code>, <code>extends</code>, <code>self</code>, <code>super</code>, <code>await</code>, <code>signal</code>, <code>null</code>, <code>true</code>, <code>false</code>
                </div>
              </div>

              <!-- Node Built-in Box -->
              <div style="background:rgba(230,162,60,0.06); border:1px solid rgba(230,162,60,0.3); border-radius:6px; padding:10px;">
                <div style="font-weight:700; font-size:11px; color:var(--warning); margin-bottom:4px;">❌ 严禁使用的 Node 内置属性/方法</div>
                <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-secondary); line-height:1.5;">
                  <code>position</code>, <code>size</code>, <code>scale</code>, <code>rotation</code>, <code>visible</code>, <code>modulate</code>, <code>name</code>, <code>owner</code>, <code>parent</code>, <code>tree</code>, <code>add_child</code>, <code>queue_free</code>
                </div>
              </div>
            </div>

            <!-- Positive Recommendation -->
            <div style="background:rgba(24,160,88,0.06); border:1px solid var(--success); border-radius:6px; padding:8px 12px; font-size:11px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <span style="color:var(--success); font-weight:700;">✅ 推荐命名规范：</span>
              <span>使用业务语义名（如 <code>header</code>, <code>footer</code>, <code>avatar</code>, <code>item_tag</code>）或槽位编号（如 <code>t1</code>, <code>t2</code>, <code>slot_a</code>）。</span>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 🚫 严禁使用系统保留字与内置属性作为 slotName
# =========================================================================

# ❌ 错误写法 1: 使用 GDScript 语法关键字 (导致语法解析崩溃)
xx.slotName = "if"     # ❌ 抛出错误: [GotodUI Slots Error] 'if' 是 GDScript 关键字！
# 无法编写 xx.if.text = ... (if 是保留字)

# ❌ 错误写法 2: 覆盖 Node / Control 核心内置属性
xx.slotName = "position" # ❌ 抛出错误: 会破坏控件底层坐标系统！
xx.slotName = "size"     # ❌ 抛出错误: 会破坏控件尺寸布局！
xx.slotName = "visible"  # ❌ 抛出错误: 会覆盖节点显隐状态！

# -------------------------------------------------------------------------
# ✅ 正确规范写法 (Recommended Naming)
# -------------------------------------------------------------------------
# 1. 使用具名业务语义
xx.slotName = "header"
xx.header.text = "标题"

# 2. 使用槽位编号或业务前缀
xx.slotName = "t1"
xx.t1.color = "cyan"
xx.t1.text = 124

xx.slotName = "item_badge"
xx.item_badge.text = "NEW"`
      }
    ]
  },

  // ========================================================
  // 2. 默认与具名插槽实战
  // ========================================================
  'slot-default-named': {
    title: '🏷️ 默认与具名插槽全阶实战 (Default & Named Slots)',
    desc: '系统内置具名插槽（如 #header, #footer, #icon, #default, #prefix, #suffix, #close, #extra）在 GButton、GDialog、GCard、GDrawer、GInput 等组件中的全场景实战演示。',
    demos: [
      {
        title: '1. GButton 与 GInput 具名前后缀插槽 (Prefix & Suffix & Icon)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="font-weight:700; font-size:13px; color:var(--primary);">输入框与复合按钮插槽组合</div>
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
              <div class="g-input-wrapper" style="width:240px; display:flex; align-items:center;">
                <span style="color:var(--text-secondary); margin-right:6px;"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input class="g-input" placeholder="输入搜索角色名称..." style="border:none; padding:0; flex:1; outline:none; background:transparent;">
                <span class="g-tag g-tag-primary" style="font-size:9px;">Enter ↵</span>
              </div>
              <button class="g-btn g-btn-primary" onclick="showToast('已发起插槽符合搜索', 'success')">
                <i class="fa-solid fa-search"></i> 搜索
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 具名前后缀插槽点语法
var input = GInput.new()

# 前置图标插槽
input.slotName = "prefix"
input.prefix.icon = "magnifying-glass"
input.prefix.color = "gray"

# 后置快捷标签插槽
input.slotName = "suffix"
input.suffix.text = "Enter ↵"
input.suffix.color = "primary"`
      },
      {
        title: '2. GDialog 对话框多具名插槽组合 (#header / #default / #footer)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; gap:12px;">
            <button class="g-btn g-btn-danger" onclick="openDialog('⚠️ 装备分解确认', '分解【强化+12 灭世神剑】将获得：\\n• 纯净魔晶 ×120\\n• 泰坦神铁 ×15\\n此操作不可逆！', '确认分解', '取消')">
              <i class="fa-solid fa-triangle-exclamation"></i> 呼出具名插槽分解弹窗
            </button>
          </div>
        `,
        code: `# GDScript: GDialog 具名插槽组合
var dlg = GDialog.new()

# 具名头部插槽
dlg.slotName = "header"
dlg.header.text = "⚠️ 装备分解确认"
dlg.header.color = "red"

# 默认正文插槽
dlg.slotName = ""
dlg.slotName.text = "分解将获得纯净魔晶 ×120\\n此操作不可逆！"
dlg.slotName.color = "white"

# 具名底部插槽
dlg.slotName = "footer"
dlg.footer.confirm_text = "确认分解"
dlg.footer.cancel_text = "取消"
dlg.open()`
      }
    ]
  },

  // ========================================================
  // 3. 动态与自定义插槽
  // ========================================================
  'slot-custom-dynamic': {
    title: '⚡ 动态与自定义插槽 (Dynamic & Custom Named Slots)',
    desc: '通过 xx.slotName = "t1" 自由命名插槽，随后通过 xx.t1.color = "xxx"、xx.t1.text = 124 动态注入任意数据或挂载自定义节点。',
    demos: [
      {
        title: '1. 装备词条多插槽动态赋值 (.t1 ~ .t4 词条属性)',
        render: `
          <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:13px; color:#fcd34d;">🗡️ 诸神黄昏·灭世之刃 (+15)</span>
              <span class="g-tag g-tag-warning">神话装备</span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div style="padding:6px 10px; background:rgba(56,189,248,0.1); border:1px solid #38bdf8; border-radius:4px; font-size:11px; color:#38bdf8; font-weight:700;">
                [t1]: 物理攻击力 +1280
              </div>
              <div style="padding:6px 10px; background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:4px; font-size:11px; color:#ef4444; font-weight:700;">
                [t2]: 暴击伤害 +65%
              </div>
              <div style="padding:6px 10px; background:rgba(234,179,8,0.1); border:1px solid #eab308; border-radius:4px; font-size:11px; color:#eab308; font-weight:700;">
                [t3]: 攻击速度 +24%
              </div>
              <div style="padding:6px 10px; background:rgba(168,85,247,0.1); border:1px solid #a855f7; border-radius:4px; font-size:11px; color:#a855f7; font-weight:700;">
                [t4]: 破甲穿透 +320
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 动态自定义插槽 .t1 ~ .t4 词条构建
var equip_card = GCard.new()

# 动态绑定并配置 t1 词条插槽
equip_card.slotName = "t1"
equip_card.t1.color = "cyan"
equip_card.t1.text = "物理攻击力 +1280"

# 动态绑定并配置 t2 词条插槽
equip_card.slotName = "t2"
equip_card.t2.color = "red"
equip_card.t2.text = "暴击伤害 +65%"

# 动态绑定并配置 t3 词条插槽
equip_card.slotName = "t3"
equip_card.t3.color = "yellow"
equip_card.t3.text = "攻击速度 +24%"

# 动态绑定并配置 t4 词条插槽
equip_card.slotName = "t4"
equip_card.t4.color = "purple"
equip_card.t4.text = 320 # 支持整数直接赋值，自动强转`
      }
    ]
  },

  // ========================================================
  // 4. 作用域插槽
  // ========================================================
  'slot-scoped': {
    title: '🧬 作用域插槽与数据透传 (Scoped Slots & Props Forwarding)',
    desc: '对标 Vue 3 的 <template #slot="{ item, index }">，在 Godot 中通过 Callable 回调或透传 Dictionary，将子项状态（如翻面、冷却时间、角色属性）回传给父级模板自由渲染。',
    demos: [
      {
        title: '1. 作用域插槽透传参数驱动 (Callable Scoped Slot)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="font-weight:700; font-size:13px; color:var(--primary);">记忆卡片作用域插槽渲染 (Scoped Slot)</div>
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-default" style="height:50px; width:70px; font-size:22px;" onclick="this.innerText='👑'; showToast('透传状态: { is_flipped: true, id: 1 }', 'success');">❓</button>
              <button class="g-btn g-btn-default" style="height:50px; width:70px; font-size:22px;" onclick="this.innerText='💎'; showToast('透传状态: { is_flipped: true, id: 2 }', 'success');">❓</button>
              <button class="g-btn g-btn-default" style="height:50px; width:70px; font-size:22px;" onclick="this.innerText='⚡'; showToast('透传状态: { is_flipped: true, id: 3 }', 'success');">❓</button>
            </div>
          </div>
        `,
        code: `# GDScript: 作用域插槽 Callable 渲染函数
var grid = MemoryGrid.new()

# 透传数据 { item, index, is_flipped }
grid.set_card_renderer(func(item: Dictionary, is_flipped: bool) -> Control:
    var box = PanelContainer.new()
    if is_flipped:
        var lbl = Label.new()
        lbl.text = item.emoji
        lbl.add_theme_color_override("font_color", Color.GOLD)
        box.add_child(lbl)
    else:
        var back = TextureRect.new()
        back.texture = preload("res://card_back.png")
        box.add_child(back)
    return box
)`
      }
    ]
  },

  // ========================================================
  // 5. GSlotProxy 底层实现与原理
  // ========================================================
  'slot-engine-impl': {
    title: '⚙️ GSlotProxy 底层实现与 Godot 4 引擎原理 (GSlotProxy Architecture)',
    desc: '解析 GSlotProxy 如何利用 Godot 4 的 _get / _set 元编程拦截属性访问，实现零运行时开销的动态代理与类型转换。',
    demos: [
      {
        title: '1. GSlotProxy 核心源码实现 (Core Implementation Source)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:13px; color:var(--primary);"><i class="fa-solid fa-microchip"></i> GSlotProxy 核心架构机制</span>
              <span class="g-tag g-tag-primary">RefCounted 轻量内存管理</span>
            </div>
            <p style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              通过重写 GDScript 的 <code>_get(property)</code> 和 <code>_set(property, value)</code>，当开发者编写 <code>xx.slotName = "header"</code> 时，底层自动关联对应子节点，并在 <code>xx.header.color = "gold"</code> 时完成色彩、文本与属性的自动映射分发。
            </p>
          </div>
        `,
        code: `@tool
class_name GSlotProxy
extends RefCounted

## GSlotProxy: Godot 4 Vue-style Slot Proxy
## 支持 xx.slotName = "header"; xx.header.text = "标题"; xx.header.color = "gold"; xx.slotName.color = "red" 等点语法

var target_node: Control
var slot_name: String = "default"
var owner_component: Control
var custom_data: Dictionary = {}

func _init(p_target: Control = null, p_slot_name: String = "default", p_owner: Control = null) -> void:
    target_node = p_target
    slot_name = p_slot_name
    owner_component = p_owner

## 设置文本 (支持自动类型强转换为 String)
func set_text(val: Variant) -> void:
    var text_val = str(val)
    if target_node and is_instance_valid(target_node):
        if "text" in target_node:
            target_node.text = text_val
    custom_data["text"] = text_val

## 设置色彩 (支持 Color, "red", "gold", "yellow", "#fcd34d" 等)
func set_color(val: Variant) -> void:
    var col = _parse_color(val)
    if target_node and is_instance_valid(target_node):
        if target_node is Label or target_node is RichTextLabel:
            target_node.add_theme_color_override("font_color", col)
        else:
            target_node.modulate = col
    custom_data["color"] = col

## 动态属性拦截与赋值
func _set(property: StringName, value: Variant) -> bool:
    var prop = str(property)
    match prop:
        "text": set_text(value); return true
        "color": set_color(value); return true
        "visible": set_visible(bool(value)); return true
        _:
            custom_data[prop] = value
            return true

## 动态属性拦截与读取
func _get(property: StringName) -> Variant:
    var prop = str(property)
    if prop == "text": return get_text()
    if prop == "color": return custom_data.get("color", Color.WHITE)
    return custom_data.get(prop, null)`
      }
    ]
  },

  // ========================================================
  // 6. 万物皆可插槽 (Support ANYTHING in Slots)
  // ========================================================
  'slot-anything': {
    title: '✨ 万物皆可插槽 (Support ANYTHING in Slots: Text, Nodes, 3D Viewports, Scenes, Callables)',
    desc: '深度贯彻 Vue 3 插槽哲学：插槽内支持放置任何内容！在 Godot 中，无论是普通文本、基础色彩、任意 UI 控件、PackedScene 预制体、Callable 函数式组件、还是 3D Viewport 角色模型与粒子特效，均可直接赋给 Slot！',
    demos: [
      {
        title: '1. 六大内容类型多态挂载 (Polymorphic Slot Mount Types)',
        render: `
          <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:14px;">
            <div style="font-weight:700; font-size:13px; color:var(--primary);">Godot Slot 多态内容支持全览</div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
              <!-- 1. Text & Primitives -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:var(--success); margin-bottom:4px;">① 纯文本 / 数字 (Primitives)</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  dlg.header = "🔥 史诗战报"<br>
                  btn.slotName = 99
                </div>
              </div>

              <!-- 2. Custom Controls -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:var(--primary); margin-bottom:4px;">② 任意 Godot UI 控件 (Controls)</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  dlg.default = my_inventory_grid<br>
                  card.extra = GButton.new()
                </div>
              </div>

              <!-- 3. PackedScene (.tscn) -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:var(--warning); margin-bottom:4px;">③ 场景预制体 (.tscn 自动实例化)</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  dlg.default = preload("reward.tscn")
                </div>
              </div>

              <!-- 4. Functional Callable -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:#a855f7; margin-bottom:4px;">④ 函数式组件 / 工厂 (Callable)</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  card.t1 = func(): return build_view()
                </div>
              </div>

              <!-- 5. 3D Viewport / Particles -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:#ec4899; margin-bottom:4px;">⑤ 3D 模型视口 / 粒子特效</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  card.cover = my_3d_viewport_box<br>
                  btn.loading = my_gpu_particles_2d
                </div>
              </div>

              <!-- 6. Array of Nodes -->
              <div style="padding:10px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px;">
                <div style="font-weight:700; font-size:11px; color:#f97316; margin-bottom:4px;">⑥ 数组列表 (Array of Nodes)</div>
                <div style="font-size:10px; color:var(--text-secondary); font-family:var(--font-mono);">
                  btn.icon = [icon_node, badge_node]
                </div>
              </div>
            </div>

            <!-- Live Action Showcase -->
            <div style="display:flex; gap:10px; margin-top:6px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="openDialog('✨ 3D 角色立绘插槽弹窗', '<div style=\\'display:flex; flex-direction:column; align-items:center; gap:8px; padding:10px;\\'><div style=\\'font-size:54px; filter:drop-shadow(0 0 16px gold);\\'>🧙‍♂️✨</div><b>【动态 3D SubViewport 角色模型已装载至 #default 插槽】</b></div>', '与导师对话', '离开')">
                <i class="fa-solid fa-cube"></i> 打开内嵌 3D 视口插槽弹窗
              </button>
              <button class="g-btn g-btn-success" onclick="showToast('已挂载包含 [Icon + Label + Badge] 的多节点复合插槽！', 'success')">
                <i class="fa-solid fa-layer-group"></i> 体验多节点 Array 复合插槽
              </button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# ✨ Vue-Style 万物皆可插槽实战代码 (Support ANYTHING in Slot)
# =========================================================================

# -------------------------------------------------------------------------
# 1. 挂载 3D 视口或粒子特效 (3D SubViewport / GPUParticles2D)
# -------------------------------------------------------------------------
var card = GCard.new()
var viewport_container = SubViewportContainer.new()
var viewport = SubViewport.new()
var character_3d = preload("res://models/hero_character_3d.tscn").instantiate()
viewport.add_child(character_3d)
viewport_container.add_child(viewport)

# 直接将 3D 视口赋给插槽！
card.slotName = "cover"
card.cover.mount(viewport_container)

# -------------------------------------------------------------------------
# 2. 挂载 PackedScene 预制体 (场景文件自动实例化)
# -------------------------------------------------------------------------
var dlg = GDialog.new()
dlg.slotName = "header"
dlg.header = preload("res://ui/custom_boss_header.tscn") # 自动 instantiate 并挂载

# -------------------------------------------------------------------------
# 3. 挂载 Callable 函数式工厂组件
# -------------------------------------------------------------------------
dlg.slotName = ""
dlg.slotName.mount(func() -> Control:
    var vbox = VBoxContainer.new()
    var label = Label.new()
    label.text = "动态实时生成的装备词条数据"
    vbox.add_child(label)
    return vbox
)

# -------------------------------------------------------------------------
# 4. 挂载多节点数组 (Array of Nodes -> 自动生成 HBox 水平流)
# -------------------------------------------------------------------------
var btn = GButton.new()
var icon_node = GIcon.new()
icon_node.icon_name = "cart-shopping"
var badge_node = GBadge.new()
badge_node.value = "HOT"

btn.slotName = "icon"
btn.icon.mount([icon_node, badge_node]) # 多个子节点同时插入插槽`
      }
    ]
  }
};

// Keep the original sidebar routes working after the default/named slot docs
// were consolidated into one document.
window.SLOTS_CATALOG['slot-default'] = window.SLOTS_CATALOG['slot-default-named'];
window.SLOTS_CATALOG['slot-named'] = window.SLOTS_CATALOG['slot-default-named'];
