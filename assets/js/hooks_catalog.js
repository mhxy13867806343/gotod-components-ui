// =========================================================================
// Gotod Components UI - 7. Hooks 响应式组合式钩子 (Vue Hooks for Godot 4)
// assets/js/hooks_catalog.js
// 深度集成 Vue 3 组合式 API (Composables / Hooks) 思想在 Godot 4 中的实现
// =========================================================================

// Live Simulated Hook State Handlers for Web Demos
window.simCooldownState = {
  duration: 5.0,
  remaining: 0.0,
  intervalId: null
};

window.triggerSimCooldown = function() {
  if (window.simCooldownState.remaining > 0) return;
  
  window.simCooldownState.remaining = window.simCooldownState.duration;
  const btn = document.getElementById('simCdButton');
  const mask = document.getElementById('simCdMask');
  const text = document.getElementById('simCdText');
  
  if (btn) btn.disabled = true;

  if (window.simCooldownState.intervalId) clearInterval(window.simCooldownState.intervalId);

  window.simCooldownState.intervalId = setInterval(() => {
    window.simCooldownState.remaining -= 0.1;
    if (window.simCooldownState.remaining <= 0) {
      window.simCooldownState.remaining = 0;
      clearInterval(window.simCooldownState.intervalId);
      if (btn) btn.disabled = false;
      if (mask) mask.style.height = '0%';
      if (text) text.innerText = '释放技能 (斩击)';
      showToast('【useCooldown】技能冷却完毕！可再次释放', 'success');
      return;
    }

    const pct = (window.simCooldownState.remaining / window.simCooldownState.duration) * 100;
    if (mask) mask.style.height = pct + '%';
    if (text) text.innerText = `冷却中: ${window.simCooldownState.remaining.toFixed(1)}s`;
  }, 100);

  showToast('【useCooldown】技能已释放，进入 5.0s 冷却倒计时！', 'info');
};

window.simFormState = {
  username: '',
  password: '',
  errors: {}
};

window.validateSimForm = function() {
  const u = document.getElementById('simHookUsername').value.trim();
  const p = document.getElementById('simHookPassword').value.trim();
  const uErr = document.getElementById('simHookUserErr');
  const pErr = document.getElementById('simHookPassErr');

  let valid = true;
  if (!u) {
    uErr.innerText = '用户名不能为空！';
    valid = false;
  } else if (u.length < 3) {
    uErr.innerText = '用户名长度不能少于 3 个字符';
    valid = false;
  } else {
    uErr.innerText = '';
  }

  if (!p) {
    pErr.innerText = '密码不能为空！';
    valid = false;
  } else if (p.length < 6) {
    pErr.innerText = '密码长度不能少于 6 位';
    valid = false;
  } else {
    pErr.innerText = '';
  }

  if (valid) {
    showToast(`【useForm】表单校验通过！账号: ${u}`, 'success');
  } else {
    showToast('【useForm】表单校验失败，请检查错误提示', 'danger');
  }
};

window.simPaginationState = {
  page: 1,
  pageSize: 8,
  total: 24
};

window.changeSimPage = function(delta) {
  const maxPage = Math.ceil(window.simPaginationState.total / window.simPaginationState.pageSize);
  let next = window.simPaginationState.page + delta;
  if (next < 1) next = 1;
  if (next > maxPage) next = maxPage;
  window.simPaginationState.page = next;

  const pageLbl = document.getElementById('simPageDisplay');
  const grid = document.getElementById('simPageItemsGrid');
  if (pageLbl) pageLbl.innerText = `第 ${next} / ${maxPage} 页 (共 ${window.simPaginationState.total} 件物品)`;

  if (grid) {
    const start = (next - 1) * window.simPaginationState.pageSize + 1;
    grid.innerHTML = Array.from({ length: window.simPaginationState.pageSize }, (_, i) => {
      const id = start + i;
      return `<div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
        <div style="font-size:1.2rem;">⚔️</div>
        <div style="font-weight:600; margin-top:4px;">装备 #${id}</div>
      </div>`;
    }).join('');
  }
  showToast(`【usePagination】已翻到第 ${next} 页`, 'info');
};

window.HOOKS_CATALOG = {
  // --------------------------------------------------------
  // 1. useCooldown 技能冷却与倒计时钩子
  // --------------------------------------------------------
  'hook-cooldown': {
    title: '⏳ use_cooldown / UseCooldown (技能冷却与计时器钩子)',
    desc: '面向动作与 RPG 游戏的技能 CD 状态机钩子。封装倒计时递减、冷却百分比与就绪信号，直接与 GButton、GProgress 或自定义技能槽位无缝绑定。',
    demos: [
      {
        title: '技能冷却倒计时交互演练 (Interactive Skill CD Demo)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:540px;">
            <div style="display:flex; align-items:center; gap:16px;">
              <!-- Skill Button with CD Mask -->
              <div style="position:relative; width:140px; height:50px; overflow:hidden; border-radius:var(--radius);">
                <button id="simCdButton" class="g-btn g-btn-primary" style="width:100%; height:100%; justify-content:center; font-weight:700;" onclick="triggerSimCooldown()">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> <span id="simCdText">释放技能 (斩击)</span>
                </button>
                <div id="simCdMask" style="position:absolute; bottom:0; left:0; right:0; height:0%; background:rgba(0,0,0,0.65); pointer-events:none; transition:height 0.1s linear;"></div>
              </div>

              <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
                <div>• CD 周期: <strong>5.0 秒</strong></div>
                <div>• 状态响应: 冷却中自动禁用按钮并实时计算剩余时间</div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript 组合式使用 use_cooldown:
var slash_cd = UseCooldown.create(5.0)

func _ready() -> void:
    # 监听冷却变化，驱动 UI 动画
    slash_cd.cooldown_updated.connect(func(remaining: float, percent: float):
        cd_progress_bar.value = percent * 100
        cd_label.text = "%.1fs" % remaining
    )
    slash_cd.cooldown_finished.connect(func():
        slash_btn.disabled = false
        GMessage.success("技能【烈焰斩击】已冷却完毕！", self)
    )

func _on_slash_button_pressed() -> void:
    if not slash_cd.is_cooling:
        cast_slash_skill()
        slash_btn.disabled = true
        slash_cd.start(get_tree())`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. useForm 表单响应式验证钩子
  // --------------------------------------------------------
  'hook-form': {
    title: '📝 use_form / UseForm (响应式表单校验钩子)',
    desc: '提供类似 Vue 3 Vee-Validate / Element Form 的表单状态与规则验证钩子。支持必填校验、正则匹配、长度限制与错误信息收集。',
    demos: [
      {
        title: '表单数据校验与实时错误反馈 (Form Validation Demo)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:440px; background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius);">
            <div>
              <label style="font-size:12px; font-weight:600; color:var(--text-primary);">用户名 (最少 3 字符):</label>
              <input id="simHookUsername" class="g-input" type="text" placeholder="请输入玩家账号..." style="width:100%; height:32px; margin-top:4px;">
              <div id="simHookUserErr" style="color:var(--danger); font-size:11px; min-height:16px; margin-top:2px;"></div>
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; color:var(--text-primary);">密码 (最少 6 字符):</label>
              <input id="simHookPassword" class="g-input" type="password" placeholder="请输入密码..." style="width:100%; height:32px; margin-top:4px;">
              <div id="simHookPassErr" style="color:var(--danger); font-size:11px; min-height:16px; margin-top:2px;"></div>
            </div>

            <div style="display:flex; gap:10px; margin-top:6px;">
              <button class="g-btn g-btn-primary" style="flex:1;" onclick="validateSimForm()">提交验证 (validate)</button>
              <button class="g-btn g-btn-default" onclick="document.getElementById('simHookUsername').value=''; document.getElementById('simHookPassword').value=''; document.getElementById('simHookUserErr').innerText=''; document.getElementById('simHookPassErr').innerText=''; showToast('表单已重置', 'info');">重置</button>
            </div>
          </div>
        `,
        code: `# GDScript 声明表单规则与响应式校验:
var login_form = UseForm.create(
    {"username": "", "password": ""},
    {
        "username": [{"required": true, "message": "用户名必填"}, {"min_length": 3, "message": "至少3个字符"}],
        "password": [{"required": true, "message": "密码必填"}, {"min_length": 6, "message": "至少6位密码"}]
    }
)

func _on_submit_pressed() -> void:
    login_form.set_field("username", username_input.text)
    login_form.set_field("password", password_input.text)
    
    if login_form.validate():
        GMessage.success("登录验证通过！正在进入游戏...", self)
    else:
        GMessage.error("表单输入有误，请修正: " + str(login_form.errors.values()), self)`
      }
    ]
  },

  // --------------------------------------------------------
  // 3. usePagination 游戏分页器钩子
  // --------------------------------------------------------
  'hook-pagination': {
    title: '📑 use_pagination / UsePagination (背包与列表分页钩子)',
    desc: '面向物品背包栏、排行榜、邮件收件箱的响应式分页控制器。封装当前页、页大小、总页数与自动范围切片。',
    demos: [
      {
        title: '背包物品栏分页演练 (Interactive Inventory Pager)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%; max-width:540px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span id="simPageDisplay" style="font-size:12px; font-weight:700; color:var(--text-secondary);">第 1 / 3 页 (共 24 件物品)</span>
              <div style="display:flex; gap:6px;">
                <button class="g-btn g-btn-default" style="height:28px; font-size:12px;" onclick="changeSimPage(-1)">◀ 上一页</button>
                <button class="g-btn g-btn-default" style="height:28px; font-size:12px;" onclick="changeSimPage(1)">下一页 ▶</button>
              </div>
            </div>

            <!-- Page Items Grid -->
            <div id="simPageItemsGrid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;">
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #1</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #2</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #3</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #4</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #5</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #6</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #7</div>
              </div>
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); text-align:center; font-size:12px;">
                <div style="font-size:1.2rem;">⚔️</div>
                <div style="font-weight:600; margin-top:4px;">装备 #8</div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 物品背包分页钩子
var pager = UsePagination.create({
    "total": all_items.size(),
    "page_size": 8
})

func _ready() -> void:
    pager.page_changed.connect(func(cur_page: int):
        render_current_page_items(pager.get_current_slice(all_items))
    )`
      }
    ]
  },

  // --------------------------------------------------------
  // 4. useDialog 组合式弹窗钩子
  // --------------------------------------------------------
  'hook-dialog': {
    title: '🪟 use_dialog / UseDialog (组合式弹窗状态钩子)',
    desc: '用于解耦弹窗的开启/关闭、数据载荷注入与异步确认回调。',
    demos: [
      {
        title: '组合式状态弹窗 (Composable Dialog Hook)',
        render: `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="openSimDialog('【useDialog】已成功注入数据载荷: Item #1001 (强化等级: +15)', '强化装备确认')">
                <i class="fa-solid fa-arrow-up-from-bracket"></i> use_dialog.open(item_data)
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 组合式弹窗
var enhance_dialog = UseDialog.create("强化装备确认")

func _ready() -> void:
    enhance_dialog.confirmed.connect(func(item):
        print("确认强化物品:", item.name)
        GMessage.success("强化成功！", self)
    )

func _on_item_click(item_data) -> void:
    enhance_dialog.open(item_data)`
      }
    ]
  }
};
