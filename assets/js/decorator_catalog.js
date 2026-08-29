// =========================================================================
// Gotod Components UI - 装饰器模式工坊 (Decorator Pattern Studio)
// assets/js/decorator_catalog.js
// 参考教程: https://godothub.com/oss/gdscript-tutorial/10.object-oriented-intro/10.7.design-patterns/10.7.2.structural-patterns/10.7.2.3.decorator-pattern.html
// =========================================================================

window.simEnchantState = {
  baseAtk: 50,
  flame: false,
  frost: false,
  thunder: false,
  vampire: false
};

window.toggleSimEnchant = function(enchantType, checked) {
  window.simEnchantState[enchantType] = checked;
  renderSimEnchantWeapon();
};

window.renderSimEnchantWeapon = function() {
  const s = window.simEnchantState;
  let totalAtk = s.baseAtk;
  let namePrefix = '';
  let descList = ['一柄精钢打造的双手单手剑 (基础攻击 50)'];
  let gdscriptCode = `var weapon: WeaponComponent = IronSword.new()\n`;

  if (s.flame) {
    totalAtk += 35;
    namePrefix = '🔥 烈焰 ' + namePrefix;
    descList.push('附带 35 点持续灼烧烈焰伤害');
    gdscriptCode += `weapon = FlameEnchant.new(weapon) # 动态叠加烈焰装饰器\n`;
  }
  if (s.frost) {
    totalAtk += 20;
    namePrefix = '❄️ 寒霜 ' + namePrefix;
    descList.push('造成 20 点冰冻伤害并减速目标 30%');
    gdscriptCode += `weapon = FrostEnchant.new(weapon) # 动态叠加寒霜装饰器\n`;
  }
  if (s.thunder) {
    totalAtk += 45;
    namePrefix = '⚡ 雷霆 ' + namePrefix;
    descList.push('击中时有 30% 概率触发连锁闪电');
    gdscriptCode += `weapon = ThunderEnchant.new(weapon) # 动态叠加雷霆装饰器\n`;
  }
  if (s.vampire) {
    totalAtk += 15;
    namePrefix = '🩸 嗜血 ' + namePrefix;
    descList.push('造成伤害的 15% 转化为自身生命值');
    gdscriptCode += `weapon = VampireEnchant.new(weapon) # 动态叠加嗜血装饰器\n`;
  }

  gdscriptCode += `\nprint("最终武器名称:", weapon.get_name())\nprint("最终总攻击力:", weapon.get_attack())`;

  const fullName = (namePrefix + '精钢长剑').trim();

  const nameElem = document.getElementById('simWeaponName');
  const atkElem = document.getElementById('simWeaponAtk');
  const descElem = document.getElementById('simWeaponDesc');
  const codeElem = document.getElementById('simWeaponCode');

  if (nameElem) nameElem.innerText = fullName;
  if (atkElem) atkElem.innerText = `🗡️ 攻击力: ${totalAtk}`;
  if (descElem) descElem.innerHTML = descList.map(d => `• ${d}`).join('<br>');
  if (codeElem) codeElem.innerText = gdscriptCode;
};

window.DECORATOR_CATALOG = {
  // --------------------------------------------------------
  // 1. RPG 武器动态附魔装饰器实战
  // --------------------------------------------------------
  'decorator-weapon': {
    title: '🛡️ 装饰器模式 (Decorator Pattern) - 武器动态附魔',
    desc: '依据 GodotHub 教程《10.7.2.3 装饰器模式》，动态地给对象添加额外职责。通过包装 (Wrapping) 替代繁琐的子类继承爆炸，实现游戏装备、UI能力的任意自由组合叠加！',
    demos: [
      {
        title: '装备多重附魔动态叠加演示 (Interactive Enchantment Sandbox)',
        render: `
          <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; width:100%;">
            
            <!-- Left: Enchant Selection & Live Weapon Card -->
            <div style="display:flex; flex-direction:column; gap:14px;">
              <div style="padding:14px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:8px;">
                  选择要动态包装叠加的装饰器 (Decorators):
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px;">
                  <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" onchange="toggleSimEnchant('flame', this.checked)"> 🔥 烈焰附魔 (+35)
                  </label>
                  <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" onchange="toggleSimEnchant('frost', this.checked)"> ❄️ 寒霜附魔 (+20)
                  </label>
                  <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" onchange="toggleSimEnchant('thunder', this.checked)"> ⚡ 雷霆附魔 (+45)
                  </label>
                  <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" onchange="toggleSimEnchant('vampire', this.checked)"> 🩸 嗜血附魔 (+15)
                  </label>
                </div>
              </div>

              <!-- Weapon Result Preview Card -->
              <div class="sim-card" style="width:100%;">
                <div class="sim-card-header">
                  <span id="simWeaponName" style="font-weight:700; font-size:14px; color:var(--warning);">精钢长剑</span>
                  <span id="simWeaponAtk" class="g-tag g-tag-danger" style="font-size:12px; font-weight:700;">🗡️ 攻击力: 50</span>
                </div>
                <div id="simWeaponDesc" style="font-size:12px; color:var(--text-secondary); line-height:1.6; padding:10px 0;">
                  • 一柄精钢打造的双手单手剑 (基础攻击 50)
                </div>
              </div>
            </div>

            <!-- Right: Real-time GDScript Decorator Execution Code -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="font-size:12px; font-weight:700; color:var(--text-secondary);">
                实时动态生成的 GDScript 包装执行代码:
              </div>
              <div class="code-box" style="margin:0; height:100%; max-height:220px; overflow-y:auto;">
                <pre><code id="simWeaponCode">var weapon: WeaponComponent = IronSword.new()
print("最终武器名称:", weapon.get_name())
print("最终总攻击力:", weapon.get_attack())</code></pre>
              </div>
            </div>

          </div>
        `,
        code: `# GDScript 装饰器模式经典实现结构:
# 1. 抽象构件接口
class_name WeaponComponent extends RefCounted
func get_name() -> String: return ""
func get_attack() -> int: return 0

# 2. 具体构件 (基础剑)
class IronSword extends WeaponComponent:
    func get_name() -> String: return "精钢长剑"
    func get_attack() -> int: return 50

# 3. 抽象装饰器 (持有被包装对象的引用)
class WeaponDecorator extends WeaponComponent:
    var _wrapped: WeaponComponent
    func _init(w: WeaponComponent): _wrapped = w
    func get_name() -> String: return _wrapped.get_name()
    func get_attack() -> int: return _wrapped.get_attack()

# 4. 具体烈焰装饰器
class FlameEnchant extends WeaponDecorator:
    func get_name() -> String: return "🔥 烈焰 " + _wrapped.get_name()
    func get_attack() -> int: return _wrapped.get_attack() + 35`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. UI 控件行为装饰器
  // --------------------------------------------------------
  'decorator-ui': {
    title: '🎨 UI 控件能力装饰器 (Sound / Debounce / Particle Decorator)',
    desc: '使用装饰器为任意 Godot Control 控件无侵入式注入音效播放、防抖防连击（Debounce）、粒子特效等扩展行为。',
    demos: [
      {
        title: 'GButton 能力装饰器组合演练',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('【SoundDecorator】触发点击音效: sfx_click.wav', 'info')">
                <i class="fa-solid fa-volume-high"></i> 音效装饰器 (SoundDecorator)
              </button>
              <button class="g-btn g-btn-warning" onclick="showToast('【DebounceDecorator】已拦截 500ms 内的重复狂点操作', 'warning')">
                <i class="fa-solid fa-hand"></i> 防抖装饰器 (DebounceDecorator)
              </button>
              <button class="g-btn g-btn-success" onclick="showToast('【ParticleDecorator】在点击坐标喷发金币粒子特效！', 'success')">
                <i class="fa-solid fa-sparkles"></i> 特效装饰器 (ParticleDecorator)
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 为按钮无缝挂载装饰器
var submit_btn = GButton.new()

# 1. 挂载音效装饰器
var sound_decorated = SoundEffectDecorator.new(submit_btn, "res://sfx/click.wav")

# 2. 挂载 500ms 防抖装饰器 (防止玩家恶意重复点击发送网络请求)
var debounce_decorated = DebounceDecorator.new(sound_decorated, 0.5)`
      }
    ]
  }
};
