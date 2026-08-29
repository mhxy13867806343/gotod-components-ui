// =========================================================================
// Gotod Components UI - 11. Godot 4 全量生命周期与节点钩子全景工坊 (Lifecycle Atlas)
// assets/js/lifecycle_catalog.js
// 汇聚 Godot 4 官方全量生命周期函数、执行时序图、交互式步进模拟器与基础 API 示例
// =========================================================================

// State for Lifecycle Interactive Stepper Simulator
window.simLifecycleState = {
  stage: 'idle', // 'idle', 'inited', 'ready', 'exited', 'destroyed'
  isInsideTree: false,
  nodeName: 'HeroActor',
  logs: []
};

window.simLifecycleStep = function(action) {
  const s = window.simLifecycleState;
  const now = new Date().toLocaleTimeString();

  if (action === 'new') {
    s.stage = 'inited';
    s.isInsideTree = false;
    s.logs.push({
      time: now,
      fn: '_init()',
      desc: '节点内存实例化完成，构造函数执行',
      treeState: 'is_inside_tree: false (不可访问 get_tree())',
      tagType: 'warning'
    });
    showToast('【1. _init】节点已在内存中实例化 (new)', 'info');
  } else if (action === 'add_child') {
    if (s.stage !== 'inited') {
      showToast('请先点击 [1. Node.new()] 实例化对象！', 'warning');
      return;
    }
    s.stage = 'ready';
    s.isInsideTree = true;
    s.logs.push({
      time: now,
      fn: '_enter_tree()',
      desc: '节点接入场景树 (自顶向下 Top-down 传播)',
      treeState: 'is_inside_tree: true (已可访问 get_tree())',
      tagType: 'primary'
    });
    s.logs.push({
      time: now,
      fn: '_ready()',
      desc: '节点及全部子节点已就绪！黄金初始化期 (自底向上 Bottom-up)',
      treeState: 'is_inside_tree: true (UI/信号/路由挂载黄金期)',
      tagType: 'success'
    });
    showToast('【2. _enter_tree -> 3. _ready】节点已成功挂载入场景树并就绪！', 'success');
  } else if (action === 'process') {
    if (!s.isInsideTree) {
      showToast('节点未挂载至场景树，无法接收 process 循环！', 'danger');
      return;
    }
    s.logs.push({
      time: now,
      fn: '_process(delta: 0.0166)',
      desc: '渲染帧循环更新 (跟随显示器 60Hz/144Hz 刷新率)',
      treeState: 'is_inside_tree: true (UI 动画、输入跟随)',
      tagType: 'info'
    });
    showToast('【4. _process】执行了一次渲染帧更新 (delta=0.016s)', 'info');
  } else if (action === 'physics') {
    if (!s.isInsideTree) {
      showToast('节点未挂载至场景树，无法接收物理步进！', 'danger');
      return;
    }
    s.logs.push({
      time: now,
      fn: '_physics_process(delta: 0.0166)',
      desc: '固定物理时钟更新 (默认固定 60Hz 独立时钟)',
      treeState: 'is_inside_tree: true (刚体移动、物理射线碰撞)',
      tagType: 'warning'
    });
    showToast('【5. _physics_process】执行了一次固定物理步进', 'warning');
  } else if (action === 'gui_input') {
    if (!s.isInsideTree) {
      showToast('节点未在场景树中，无法接收 UI 输入！', 'danger');
      return;
    }
    s.logs.push({
      time: now,
      fn: '_gui_input(event: InputEventMouseButton)',
      desc: '捕获当前 UI 控件自身的鼠标点击/触控事件',
      treeState: 'is_inside_tree: true (UI 局部事件消费)',
      tagType: 'primary'
    });
    showToast('【6. _gui_input】响应了当前 UI 控件点击事件', 'success');
  } else if (action === 'remove_child') {
    if (!s.isInsideTree) {
      showToast('节点不在场景树中，无需移除！', 'warning');
      return;
    }
    s.stage = 'exited';
    s.isInsideTree = false;
    s.logs.push({
      time: now,
      fn: '_exit_tree()',
      desc: '节点从场景树中脱离 (remove_child)',
      treeState: 'is_inside_tree: false (停止接收 process 循环)',
      tagType: 'danger'
    });
    showToast('【7. _exit_tree】节点已脱离场景树', 'info');
  } else if (action === 'queue_free') {
    if (s.stage === 'idle') {
      showToast('节点尚未创建！', 'warning');
      return;
    }
    s.stage = 'destroyed';
    s.isInsideTree = false;
    s.logs.push({
      time: now,
      fn: 'NOTIFICATION_PREDELETE',
      desc: '节点即将彻底从内存释放与析构 (queue_free 完成)',
      treeState: '内存释放完毕',
      tagType: 'danger'
    });
    showToast('【8. NOTIFICATION_PREDELETE】节点对象已彻底销毁！', 'danger');
  } else if (action === 'reset') {
    s.stage = 'idle';
    s.isInsideTree = false;
    s.logs = [];
    showToast('生命周期模拟器已重置', 'info');
  }

  renderSimLifecycleUI();
};

window.renderSimLifecycleUI = function() {
  const s = window.simLifecycleState;
  const statusBadge = document.getElementById('simLifecycleStatusBadge');
  const treeBadge = document.getElementById('simLifecycleTreeBadge');
  const consoleBox = document.getElementById('simLifecycleConsole');

  if (statusBadge) {
    let text = '未创建 (Idle)';
    let cls = 'default';
    if (s.stage === 'inited') { text = '已实例化 (_init)'; cls = 'warning'; }
    else if (s.stage === 'ready') { text = '活跃就绪 (_ready)'; cls = 'success'; }
    else if (s.stage === 'exited') { text = '已脱离树 (_exit_tree)'; cls = 'warning'; }
    else if (s.stage === 'destroyed') { text = '已销毁 (Destroyed)'; cls = 'danger'; }

    statusBadge.className = `g-tag g-tag-${cls}`;
    statusBadge.innerText = text;
  }

  if (treeBadge) {
    treeBadge.className = s.isInsideTree ? 'g-tag g-tag-success' : 'g-tag g-tag-default';
    treeBadge.innerText = `is_inside_tree: ${s.isInsideTree}`;
  }

  if (consoleBox) {
    if (s.logs.length === 0) {
      consoleBox.innerHTML = `<div style="color:var(--text-disabled); font-style:italic;">等待执行生命周期操作，请点击上方按钮...</div>`;
      return;
    }

    consoleBox.innerHTML = s.logs.map(l => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-family:var(--font-mono); font-size:11px;">
        <div>
          <span style="color:var(--text-secondary);">[${l.time}]</span>
          <strong style="color:var(--primary); margin-left:8px; font-size:12px;">${l.fn}</strong>
          <span style="color:#dcdcaa; margin-left:10px;">${l.desc}</span>
        </div>
        <span class="g-tag g-tag-${l.tagType}" style="font-size:9px;">${l.treeState}</span>
      </div>
    `).join('');
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
};

window.LIFECYCLE_CATALOG = {
  // --------------------------------------------------------
  // 1. Godot 4 全量生命周期执行时序与交互模拟器
  // --------------------------------------------------------
  'lifecycle-overview': {
    title: '🔄 Godot 4 全量生命周期全景图与时序模拟器 (Lifecycle Atlas)',
    desc: '系统化拆解 Godot 4 节点从诞生到销毁的 7 大关键生命周期阶段，提供直观的步进模拟演练与执行顺序图谱。',
    demos: [
      {
        title: '节点生命周期步进演练沙盒 (Interactive Lifecycle Stepper)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            
            <!-- Top Lifecycle Stepper Controls -->
            <div style="background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius-lg); display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span style="font-size:13px; font-weight:700;">当前节点生命周期状态:</span>
                  <span id="simLifecycleStatusBadge" class="g-tag g-tag-default">未创建 (Idle)</span>
                  <span id="simLifecycleTreeBadge" class="g-tag g-tag-default">is_inside_tree: false</span>
                </div>
                <button class="g-btn g-btn-default" style="height:26px; font-size:11px;" onclick="simLifecycleStep('reset')">重置演示</button>
              </div>

              <!-- Action Button Sequence -->
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="g-btn g-btn-primary" style="height:32px; font-size:11px;" onclick="simLifecycleStep('new')">
                  1. Node.new() 实例化 (_init)
                </button>
                <button class="g-btn g-btn-success" style="height:32px; font-size:11px;" onclick="simLifecycleStep('add_child')">
                  2. add_child() 挂载入树 (_enter_tree -> _ready)
                </button>
                <button class="g-btn g-btn-default" style="height:32px; font-size:11px;" onclick="simLifecycleStep('process')">
                  3. 运行帧更新 (_process)
                </button>
                <button class="g-btn g-btn-default" style="height:32px; font-size:11px;" onclick="simLifecycleStep('physics')">
                  4. 运行物理步进 (_physics_process)
                </button>
                <button class="g-btn g-btn-primary" style="height:32px; font-size:11px;" onclick="simLifecycleStep('gui_input')">
                  5. 触发 UI 交互 (_gui_input)
                </button>
                <button class="g-btn g-btn-warning" style="height:32px; font-size:11px;" onclick="simLifecycleStep('remove_child')">
                  6. remove_child() 移出树 (_exit_tree)
                </button>
                <button class="g-btn g-btn-danger" style="height:32px; font-size:11px;" onclick="simLifecycleStep('queue_free')">
                  7. queue_free() 释放销毁 (PREDELETE)
                </button>
              </div>
            </div>

            <!-- Console Log Window -->
            <div style="padding:14px; background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius-lg);">
              <div style="font-size:12px; font-weight:700; color:var(--primary); margin-bottom:8px; border-bottom:1px solid var(--border-base); padding-bottom:6px;">
                🖥️ Godot 引擎生命周期执行时序流水 (Execution Log Stream):
              </div>
              <div id="simLifecycleConsole" style="max-height:180px; overflow-y:auto; line-height:1.5;">
                <div style="color:var(--text-disabled); font-style:italic;">等待执行生命周期操作，请点击上方按钮...</div>
              </div>
            </div>

          </div>
        `,
        code: `# Godot 4 官方全量节点生命周期执行顺序参考:
# 1. 构造实例化 (内存分配，不在场景树中)
func _init() -> void:
    print("1. _init: 构造函数，此时 is_inside_tree == false")

# 2. 节点进入场景树 (自顶向下父到子)
func _enter_tree() -> void:
    print("2. _enter_tree: 节点接入场景树，可访问 get_tree()")

# 3. 节点及其所有子节点就绪 (自底向上子到父) - 黄金期
func _ready() -> void:
    print("3. _ready: 黄金初始化期！UI 绑定、信号连接在此完成")

# 4. 渲染帧循环 (UI 动画、输入跟随)
func _process(delta: float) -> void:
    pass

# 5. 固定物理循环 (默认 60Hz，刚体移动、碰撞)
func _physics_process(delta: float) -> void:
    pass

# 6. 节点脱离场景树
func _exit_tree() -> void:
    print("6. _exit_tree: 节点从场景树中移除")

# 7. 内存释放前夕
func _notification(what: int) -> void:
    if what == NOTIFICATION_PREDELETE:
        print("7. NOTIFICATION_PREDELETE: 彻底销毁与资源清理")`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. 全生命周期 API 基础示例大全
  // --------------------------------------------------------
  'lifecycle-apis': {
    title: '📖 Godot 4 全量生命周期 API 与核心钩子示例大全',
    desc: '分类详解构造函数、初始化、逐帧更新、三层输入系统、暂停控制以及系统底层生命周期通知的使用场景与代码范例。',
    demos: [
      {
        title: '7 大生命周期阶段核心 API 快速参考',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            
            <table class="api-table" style="margin-top:0;">
              <thead>
                <tr>
                  <th style="width:20%;">生命周期钩子 / API</th>
                  <th style="width:25%;">触发时机与顺序</th>
                  <th style="width:30%;">推荐核心业务</th>
                  <th style="width:25%;">禁忌与注意事项</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="api-prop"><code>_init()</code></td>
                  <td><code>ClassName.new()</code> 实例化瞬间</td>
                  <td>接收构造传参、初始化纯数据变量</td>
                  <td style="color:var(--danger);">严禁调用 get_tree() 或操作未上树的 UI 节点</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_enter_tree()</code></td>
                  <td><code>add_child()</code> 进树时 (自顶向下)</td>
                  <td>注册全局总线、订阅树级事件</td>
                  <td>此时子节点尚未就绪，切勿直接访问子节点属性</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_ready()</code></td>
                  <td>节点及全部子节点就绪后 (自底向上)</td>
                  <td><strong>UI 属性绑定、信号连接、API 调用的黄金期</strong></td>
                  <td>最安全也最常用的初始化阶段</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_process(delta)</code></td>
                  <td>每渲染帧循环 (变频)</td>
                  <td>UI 动画插值、血条跟随、倒计时更新</td>
                  <td>避免在此处写重度计算逻辑，必须乘以 delta</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_physics_process(delta)</code></td>
                  <td>固定物理帧循环 (定频 60Hz)</td>
                  <td>角色移动 <code>move_and_slide()</code>、物理碰撞</td>
                  <td>与渲染帧率无关，保证多端物理同步</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_gui_input(event)</code></td>
                  <td>仅当前 Control 控件被点击/悬浮时</td>
                  <td>UI 按钮点击、背包物品拖拽、悬浮提示</td>
                  <td>属于最优先级的 UI 局部输入事件</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_unhandled_input(event)</code></td>
                  <td>输入未被任何 UI 控件拦截时</td>
                  <td>游戏角色攻击、跳跃、技能快捷键</td>
                  <td>可防止点击 UI 按钮时意外触发角色攻击</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>_exit_tree()</code></td>
                  <td><code>remove_child()</code> 移出树时</td>
                  <td>注销信号连接、停止定时器、保存现场</td>
                  <td>节点移出树后将暂停接收 process 更新</td>
                </tr>
                <tr>
                  <td class="api-prop"><code>NOTIFICATION_PREDELETE</code></td>
                  <td><code>queue_free()</code> 内存回收前夕</td>
                  <td>释放手动分配的底层 C++ 对象或线程句柄</td>
                  <td>最终析构阶段，节点生命周期的终点</td>
                </tr>
              </tbody>
            </table>

          </div>
        `,
        code: `# GDScript: 三层输入生命周期的优雅分工:
# 1. UI 控件层优先消费 (如背包格子):
func _gui_input(event: InputEvent) -> void:
    if event is InputEventMouseButton and event.pressed:
        print("点击了背包格子！")
        accept_event() # 消费掉事件，阻止向下传递

# 2. 游戏按键层 (只有没点在 UI 上时才触发角色攻击):
func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("attack"):
        player_attack()`
      }
    ]
  }
};
