// =========================================================================
// Gotod Components UI - Guide & Game UI Templates Catalog
// 1. 指南系统 (Guide & Installation)
// 3. 游戏实战案例 (Game UI Templates using Gotod Components)
// =========================================================================

window.GUIDE_CATALOG = {
  'guide-install': {
    title: '📥 安装与快速上手 (Installation & Quick Start)',
    desc: '了解如何在 Godot 4.x (4.6+) 引擎项目中引入 gotod-components-ui 并快速开始构建游戏界面。',
    demos: [
      {
        title: 'Step 1: 复制插件目录至项目 addons/',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
            <p style="color:var(--text-primary); margin-bottom:10px;">将 <code>addons/gotod_ui</code> 文件夹复制到您的 Godot 4 项目根目录下的 <code>res://addons/</code> 中：</p>
            <div class="code-box" style="margin:0;"><pre><code>your-project/
├── addons/
│   └── gotod_ui/
│       ├── components/    # 全部 28+ 个 UI 组件
│       ├── theme/         # 主题 Token 与样式盒引擎
│       ├── plugin.cfg     # 插件配置文件
│       └── plugin.gd      # 节点注册脚本
└── project.godot</code></pre></div>
          </div>
        `,
        code: `# Git 仓库克隆方式
git clone https://github.com/mhxy13867806343/gotod-components-ui.git`
      },
      {
        title: 'Step 2: 在 Godot 项目设置中启用插件',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>1. 打开 Godot 4 编辑器，点击顶部菜单 <strong>Project (项目) -> Project Settings (项目设置)</strong>。</p>
            <p>2. 切换到 <strong>Plugins (插件)</strong> 标签页。</p>
            <p>3. 找到 <code>gotod-components-ui</code> 并勾选 <strong>Enable (启用)</strong> 复选框。</p>
            <p>4. 启用后，编辑器节点列表中将自动出现 <code>GButton</code>、<code>GInput</code>、<code>GDialog</code>、<code>GTabs</code> 等全套自定义控件。</p>
          </div>
        `,
        code: `# 插件启用后，在任何脚本中均可直接实例化组件
var btn = GButton.new()
btn.text = "Hello Godot 4"
btn.button_type = GButton.ButtonType.PRIMARY
add_child(btn)`
      }
    ]
  },

  'guide-theme': {
    title: '🎨 主题 Token 与暗黑模式 (Design Tokens & Theming)',
    desc: '深度集成 Vue 主流组件库的设计 Token 系统，支持 Naive UI、Element Plus、Ant Design、Vant UI 风格以及 Dark/Light 明暗模式一键切换。',
    demos: [
      {
        title: '运行时动态切换设计主题',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:480px;">
            <p style="color:var(--text-secondary);">通过单例 <code>GotodTheme</code> 可在游戏运行时无缝切换整套色彩与圆角体系：</p>
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="changePreset('naive')">Naive UI (Green)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('element')">Element Plus (Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('ant')">Ant Design (Geek Blue)</button>
              <button class="g-btn g-btn-primary" onclick="changePreset('vant')">Vant UI (Mobile)</button>
            </div>
          </div>
        `,
        code: `# GDScript: 动态换肤
# 切换为 Element Plus 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ELEMENT_PLUS)

# 切换为 Ant Design 风格
GotodTheme.set_preset(GThemeTokens.ThemePreset.ANT_DESIGN)

# 切换明亮模式
GotodTheme.set_dark_mode(false)`
      }
    ]
  },

  'guide-autoload': {
    title: '⚙️ Autoload 全局服务配置 (GMessage / GotodTheme)',
    desc: '单例服务用于全局悬浮 Toast 消息提示与主题状态同步。',
    demos: [
      {
        title: '配置项目 Autoload 自动加载单例',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.7;">
            <p>在 <code>project.godot</code> 的 <code>[autoload]</code> 中注册全局单例：</p>
            <div class="code-box" style="margin:0;"><pre><code>[autoload]
GotodTheme="*res://addons/gotod_ui/theme/gotod_theme.gd"
GMessage="*res://addons/gotod_ui/components/feedback/g_message.gd"</code></pre></div>
          </div>
        `,
        code: `# 在任何 GDScript 业务脚本中随时随地调用：
GMessage.success("任务完成！获得金币 +100")
GMessage.error("网络连接断开")`
      }
    ]
  }
};

window.GAME_CATALOG = {
  // ========================================================
  // 1. 角色属性与装备面板
  // ========================================================
  'game-character': {
    title: '👤 游戏角色属性与装备面板 (Character RPG Stats & Equipment)',
    desc: '使用 GCard、GAvatar、GTag、GProgress、GButton、GBadge 打造的标准 RPG 角色状态与装备管理面板。点击装备槽位可实时计算属性加成！',
    demos: [
      {
        title: 'Interactive RPG Character Sheet 角色状态面板',
        render: `
          <div style="display:flex; gap:24px; flex-wrap:wrap; width:100%;">
            <!-- Left: Character Card & Stats -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:48px; height:48px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700;">⚔️</div>
                  <div>
                    <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">影刃狂剑士 <span class="g-tag g-tag-primary" style="font-size:10px;">Lv.45</span></div>
                    <div style="font-size:0.82rem; color:var(--text-secondary);">职业：近战物理输出 · 暴击流派</div>
                  </div>
                </div>
              </div>
              
              <!-- HP & MP Bars -->
              <div style="margin-top:16px; display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>❤️ 生命值 (HP)</span>
                    <span style="font-weight:600; color:var(--danger);">3,850 / 3,850</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--danger);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>💧 魔法值 (MP)</span>
                    <span style="font-weight:600; color:var(--info);">1,240 / 1,240</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--info);"></div></div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                    <span>⭐ 经验值 (EXP)</span>
                    <span style="font-weight:600; color:var(--warning);">82.5%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:82.5%; background:var(--warning);"></div></div>
                </div>
              </div>

              <!-- Base Attributes Table -->
              <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.88rem;">
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理攻击：</span>
                  <span id="statAtk" style="font-weight:700; color:var(--primary);">845</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">物理防御：</span>
                  <span id="statDef" style="font-weight:700; color:var(--primary);">420</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">暴击率：</span>
                  <span id="statCrit" style="font-weight:700; color:var(--warning);">48.5%</span>
                </div>
                <div style="padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius); border:1px solid var(--border-base);">
                  <span style="color:var(--text-secondary);">移动速度：</span>
                  <span style="font-weight:700; color:var(--info);">360</span>
                </div>
              </div>
            </div>

            <!-- Right: Equipment Slots -->
            <div class="sim-card" style="flex:1; min-width:300px;">
              <div class="sim-card-header">
                <span>当前穿戴装备 (Equipment Slots)</span>
                <span class="g-tag g-tag-success" style="font-size:10px;">战斗力: 12,450</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
                <!-- Weapon Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); cursor:pointer;" onclick="showToast('主手武器：龙鳞弑神之刃 (+180 攻击力)', 'warning')">
                  <div style="font-size:11px; color:var(--warning); font-weight:600;">[主武器] SSR 传说</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🗡️ 龙鳞弑神剑 +12</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">攻击 +180 · 暴击 +15%</div>
                </div>
                <!-- Armor Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--info); border-radius:var(--radius); cursor:pointer;" onclick="showToast('身体防具：暗影斗篷 (+95 防御)', 'info')">
                  <div style="font-size:11px; color:var(--info); font-weight:600;">[防具] SR 史诗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">🛡️ 暗影夜行斗篷</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">防御 +95 · 闪避 +8%</div>
                </div>
                <!-- Ring Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--danger); border-radius:var(--radius); cursor:pointer;" onclick="showToast('饰品：血魔指环 (+800 生命值)', 'danger')">
                  <div style="font-size:11px; color:var(--danger); font-weight:600;">[饰品] SSR 圣遗</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">💍 鲜血狂怒之戒</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">生命 +800 · 吸血 +6%</div>
                </div>
                <!-- Boots Slot -->
                <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--success); border-radius:var(--radius); cursor:pointer;" onclick="showToast('鞋子：风行者长靴 (+45 移速)', 'success')">
                  <div style="font-size:11px; color:var(--success); font-weight:600;">[鞋子] R 精良</div>
                  <div style="font-size:0.95rem; font-weight:700; margin-top:4px;">👢 疾风掠影长靴</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">移速 +45 · 耐力 +20</div>
                </div>
              </div>
              <div style="margin-top:16px; display:flex; justify-content:flex-end; gap:10px;">
                <button class="g-btn g-btn-default" onclick="showToast('已脱下全部装备'); document.getElementById('statAtk').innerText='420';">一键卸装</button>
                <button class="g-btn g-btn-primary" onclick="showToast('已自动穿戴最高战力装备！', 'success'); document.getElementById('statAtk').innerText='845';">一键最佳配装</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 角色装备面板组件代码
class_name CharacterPanel
extends GCard

@onready var hp_bar = GProgress.new()
@onready var mp_bar = GProgress.new()
@onready var equip_grid = GridContainer.new()

func _ready() -> void:
    title = "角色状态"
    extra_text = "Lv.45"
    
    # 动态配置血条与蓝条
    hp_bar.status = GThemeTokens.Status.DANGER
    hp_bar.percentage = 100.0
    add_child(hp_bar)
    
    # 监听装备点击信号
    for item in equip_slots:
        item.pressed.connect(func(): _on_equip_clicked(item))`
      }
    ]
  },

  // ========================================================
  // 2. 背包与物品栏
  // ========================================================
  'game-inventory': {
    title: '🎒 游戏背包与物品栏系统 (Inventory & Item Grid)',
    desc: '使用 GTabs、GBadge、GDialog、GButton 组合实现的 4x5 物品背包，支持道具分类过滤（消耗品/装备/材料）、品质框高亮与点击使用弹窗。',
    demos: [
      {
        title: 'Interactive 20-Slot Item Grid 背包网格',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700; font-size:1.05rem;">冒险者背包 (Inventory)</span>
                <span class="g-tag g-tag-default" style="font-size:11px;">容量: <span id="invUsed">6</span> / 20</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; color:var(--warning); font-weight:700; font-size:0.95rem;">
                <span>🪙 84,250</span> 金币
              </div>
            </div>

            <!-- Item Type Filters -->
            <div style="display:flex; gap:12px; margin-top:12px; padding-bottom:12px; border-bottom:1px solid var(--border-base);">
              <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:28px;">全部物品 (6)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">装备 (2)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">消耗药剂 (3)</button>
              <button class="g-btn g-btn-default" style="padding:4px 12px; font-size:12px; height:28px;">强化材料 (1)</button>
            </div>

            <!-- 4x5 Grid Slots -->
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; margin-top:16px;">
              <!-- Slot 1 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--danger); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 高级生命药水', '使用后瞬间恢复 2,000 点生命值。确认使用吗？')">
                <span style="font-size:1.8rem;">🧪</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x15</span>
              </div>
              <!-- Slot 2 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--info); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('使用道具: 法力水晶', '使用后瞬间恢复 800 点法力值。')">
                <span style="font-size:1.8rem;">💎</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x8</span>
              </div>
              <!-- Slot 3 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('装备详情: 黄金战弓', '品质: SSR 传说\n物理攻击力: +240\n射程: +50')">
                <span style="font-size:1.8rem;">🏹</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">SSR</span>
              </div>
              <!-- Slot 4 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--success); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('材料: 秘银矿石', '用于在铁匠铺锻造 40 级史诗武器的稀有材料。')">
                <span style="font-size:1.8rem;">🧱</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x32</span>
              </div>
              <!-- Slot 5 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--warning); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('宝箱: 远古龙蛋', '开启后随机获得一只 S 级飞行战斗坐骑。')">
                <span style="font-size:1.8rem;">🥚</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x1</span>
              </div>
              <!-- Slot 6 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:2px solid var(--primary); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative;" onclick="openDialog('卷轴: 回城卷轴', '使用后吟唱 3 秒传送回主城旅店。')">
                <span style="font-size:1.8rem;">📜</span>
                <span style="position:absolute; bottom:4px; right:6px; font-size:11px; font-weight:700; color:#fff; background:rgba(0,0,0,0.6); padding:0 4px; border-radius:4px;">x5</span>
              </div>
              <!-- Empty Slots 7~10 -->
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
              <div style="aspect-ratio:1; background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius); opacity:0.4;"></div>
            </div>

            <!-- Footer Actions -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
              <button class="g-btn g-btn-default" onclick="showToast('背包已自动按品质整理排序！', 'success')">一键整理背包</button>
              <div style="display:flex; gap:10px;">
                <button class="g-btn g-btn-danger" onclick="openDialog('批量分解', '是否将所有白色与绿色品质装备分解为强化碎片？')">批量分解</button>
                <button class="g-btn g-btn-primary" onclick="showToast('成功扩充 5 个背包格子！', 'success')">扩充背包 (+5格)</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏背包实现
class_name GameInventory
extends PanelContainer

@export var max_slots: int = 20
var items: Array[Dictionary] = []

func use_item(slot_index: int) -> void:
    var item = items[slot_index]
    if item["type"] == "potion":
        player.heal(item["value"])
        GMessage.success("使用成功：生命恢复 " + str(item["value"]))
        item["count"] -= 1
        _refresh_slots()`
      }
    ]
  },

  // ========================================================
  // 3. 游戏系统设置中心
  // ========================================================
  'game-settings': {
    title: '🎮 游戏系统设置中心 (Game Settings Panel)',
    desc: '使用 GTabs、GSlider、GSwitch、GSelect、GButton 组合实现的完整游戏配置中心（音频/画面/操作/语言）。',
    demos: [
      {
        title: 'Interactive Game Settings 游戏设置界面',
        render: `
          <div class="sim-card" style="width:100%; max-width:580px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">⚙️ 游戏系统设置 (Preferences)</span>
              <button class="g-btn g-btn-text" onclick="showToast('已恢复为默认推荐设置');">恢复默认</button>
            </div>

            <!-- Audio Sliders -->
            <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🔊 主音量 (Master Volume)</span>
                  <span id="volMaster" style="font-weight:700; color:var(--primary);">80%</span>
                </div>
                <input type="range" min="0" max="100" value="80" style="width:100%;" oninput="document.getElementById('volMaster').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>🎵 背景音乐 (BGM Volume)</span>
                  <span id="volBgm" style="font-weight:700; color:var(--primary);">65%</span>
                </div>
                <input type="range" min="0" max="100" value="65" style="width:100%;" oninput="document.getElementById('volBgm').innerText=this.value+'%'">
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;">
                  <span>💥 战斗音效 (SFX Volume)</span>
                  <span id="volSfx" style="font-weight:700; color:var(--primary);">90%</span>
                </div>
                <input type="range" min="0" max="100" value="90" style="width:100%;" oninput="document.getElementById('volSfx').innerText=this.value+'%'">
              </div>

              <!-- Graphics Toggles -->
              <div style="padding-top:14px; border-top:1px solid var(--border-base); display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🖥️ 全屏模式 (Fullscreen)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('全屏模式：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>⚡ 垂直同步 (V-Sync)</span>
                  <label class="g-switch"><input type="checkbox" checked onchange="showToast('垂直同步：' + this.checked)"><span class="g-switch-slider"></span></label>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>🎯 目标渲染帧率 (FPS Limit)</span>
                  <select class="select-theme" style="width:140px; height:32px;">
                    <option value="60">60 FPS</option>
                    <option value="120" selected>120 FPS</option>
                    <option value="144">144 FPS</option>
                    <option value="unlimited">无限制</option>
                  </select>
                </div>
              </div>

              <!-- Footer Buttons -->
              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
                <button class="g-btn g-btn-default" onclick="showToast('取消更改');">取消</button>
                <button class="g-btn g-btn-primary" onclick="showToast('游戏设置已成功保存并即时生效！', 'success');">应用并保存</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 游戏音频与图形设置绑定
func _on_master_slider_value_changed(val: float) -> void:
    AudioServer.set_bus_volume_db(
        AudioServer.get_bus_index("Master"),
        linear_to_db(val / 100.0)
    )

func _on_fullscreen_toggled(is_fullscreen: bool) -> void:
    DisplayServer.window_set_mode(
        DisplayServer.WINDOW_MODE_FULLSCREEN if is_fullscreen 
        else DisplayServer.WINDOW_MODE_WINDOWED
    )`
      }
    ]
  },

  // ========================================================
  // 4. 任务与剧情日志
  // ========================================================
  'game-quest': {
    title: '📜 游戏任务与剧情日志系统 (Quest Log & Objective Tracker)',
    desc: '使用 GCollapse、GSteps、GTag、GProgress、GButton 组合构建的游戏任务日志。包含主线/支线分类、阶段性目标达成与奖励领取。',
    demos: [
      {
        title: 'Interactive Quest Tracker 任务追踪与奖励领取',
        render: `
          <div class="sim-card" style="width:100%; max-width:620px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.05rem;">📜 任务日志 (Quest Log)</span>
              <span class="g-tag g-tag-warning">进行中任务 (2)</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:14px; margin-top:16px;">
              <!-- Main Quest 1 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--primary); font-size:1rem;">[主线第4章] 封印之地的唤醒</div>
                  <span class="g-tag g-tag-primary" style="font-size:11px;">目标已达成</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">前往暗夜森林深处击败看守封印的远古巨龙，取得龙之结晶。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>击败远古黑龙：1 / 1</span>
                    <span style="color:var(--success); font-weight:700;">100%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:100%; background:var(--success);"></div></div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid var(--border-base);">
                  <span style="font-size:0.85rem; color:var(--warning);">奖励：🪙 10,000 金币 · ⭐ 5,000 EXP</span>
                  <button id="btnClaimQuest" class="g-btn g-btn-primary" style="padding:4px 14px; font-size:12px; height:28px;" onclick="this.disabled=true; this.innerText='已领取'; showToast('成功领取任务奖励：金币 +10,000，EXP +5,000！', 'success');">领取奖励</button>
                </div>
              </div>

              <!-- Side Quest 2 -->
              <div style="padding:14px 16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-weight:700; color:var(--text-primary); font-size:1rem;">[支线] 铁匠铺的委托</div>
                  <span class="g-tag g-tag-default" style="font-size:11px;">进行中</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin:8px 0;">采集 10 块黑曜石矿石并交给铁匠布鲁诺。</p>
                <div style="margin:10px 0;">
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span>采集黑曜石：6 / 10</span>
                    <span style="color:var(--warning); font-weight:700;">60%</span>
                  </div>
                  <div class="g-progress-bar"><div class="g-progress-fill" style="width:60%; background:var(--warning);"></div></div>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 任务日志系统
class_name QuestManager
extends Node

signal quest_completed(quest_id: String)

func check_quest_progress(quest_id: String) -> void:
    var quest = active_quests[quest_id]
    if quest.current >= quest.target:
        quest.state = QuestState.READY_TO_CLAIM
        GMessage.info("任务目标已达成：" + quest.title)`
      }
    ]
  },

  // ========================================================
  // 5. 金币商城
  // ========================================================
  'game-shop': {
    title: '🛒 游戏商城与道具购买 (In-Game Shop & Purchasing)',
    desc: '使用 GCard、GBadge、GDialog、GButton 组合实现的道具商店，支持购买确认、金币实时扣除与售罄判定。',
    demos: [
      {
        title: 'Interactive In-Game Store 游戏道具商店',
        render: `
          <div class="sim-card" style="width:100%; max-width:680px;">
            <div class="sim-card-header">
              <span style="font-weight:700; font-size:1.1rem;">🛒 神秘商人道具屋 (Merchant Store)</span>
              <div style="color:var(--warning); font-weight:700;">
                我的金币: 🪙 <span id="shopGold">25,800</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:16px;">
              <!-- Item 1 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700;">🧪 特级狂暴药剂</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">暴击率提升 30%，持续 60 秒</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 500 金币</div>
                </div>
                <button class="g-btn g-btn-primary" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=500){ g.innerText=(cur-500).toLocaleString(); showToast('购买特级狂暴药剂成功！', 'success'); }">购买</button>
              </div>

              <!-- Item 2 -->
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; color:var(--warning);">🗡️ 封印的烈焰之剑</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">传说级双手武器 · 附带灼烧</div>
                  <div style="color:var(--warning); font-size:13px; font-weight:700; margin-top:6px;">🪙 12,000 金币</div>
                </div>
                <button class="g-btn g-btn-warning" style="padding:4px 12px; font-size:12px; height:30px;" onclick="let g=document.getElementById('shopGold'); let cur=parseInt(g.innerText.replace(',','')); if(cur>=12000){ g.innerText=(cur-12000).toLocaleString(); showToast('购买传说武器成功！', 'success'); } else { showToast('金币不足！', 'danger'); }">购买</button>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 商店购买逻辑
func purchase_item(item_id: String, price: int) -> void:
    if player.gold >= price:
        player.gold -= price
        player.inventory.add_item(item_id)
        GMessage.success("购买成功！")
    else:
        GMessage.error("金币不足，无法购买！")`
      }
    ]
  }
};
