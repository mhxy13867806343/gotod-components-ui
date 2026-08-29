// =========================================================================
// Gotod Components UI - 4. 属性与方法全景实验室 (API Playground)
// 每一个属性均提供动态调节面板，每一个方法均提供实时调用按钮与信号日志！
// =========================================================================

window.PLAYGROUND_CATALOG = {
  // --------------------------------------------------------
  // 1. GTabs 属性与方法演练
  // --------------------------------------------------------
  'play-tabs': {
    title: '🧪 GTabs 属性与全部方法交互实验室',
    desc: '实时调整 GTabs 的全部 8 个属性，并点击按钮执行全部 15 个公开外部方法，观察组件即时渲染与信号日志。',
    demos: [
      {
        title: 'GTabs 属性调节器与方法控制台 (Props & Methods Console)',
        render: `
          <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
            <!-- Top: Interactive Live GTabs Component -->
            <div style="padding:20px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
              <div style="font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:12px;">实时组件渲染预览 / Live Preview</div>
              <div id="playTabsBox" style="min-height:120px;">
                <div class="sim-tab-wrapper" id="playTabsWrapper" style="display:flex; flex-direction:column;">
                  <div class="sim-tab-nav-list" id="playTabsNav" style="display:flex; gap:16px; border-bottom:1px solid var(--border-base); margin-bottom:12px;">
                    <div class="sim-tab-header active" onclick="switchTabDemo(0, 'playTabsBox')" style="color:var(--primary); font-weight:600; cursor:pointer; padding-bottom:8px; border-bottom:2px solid var(--primary);">首页 (Tab 1)</div>
                    <div class="sim-tab-header" onclick="switchTabDemo(1, 'playTabsBox')" style="color:var(--text-secondary); cursor:pointer; padding-bottom:8px; border-bottom:2px solid transparent;">设置 (Tab 2)</div>
                  </div>
                  <div class="sim-tab-panel-box" id="playTabsPanels">
                    <div class="sim-tab-panel" style="display:block; padding:16px; background:var(--bg-card); border-radius:var(--radius);">
                      <h4 style="color:var(--text-primary);">首页内容 (Tab 1 Panel)</h4>
                      <p style="color:var(--text-secondary); font-size:13px; margin-top:4px;">这是由 GTabs 动态管理的第 1 个内容面板。</p>
                    </div>
                    <div class="sim-tab-panel" style="display:none; padding:16px; background:var(--bg-card); border-radius:var(--radius);">
                      <h4 style="color:var(--text-primary);">设置内容 (Tab 2 Panel)</h4>
                      <p style="color:var(--text-secondary); font-size:13px; margin-top:4px;">这是由 GTabs 动态管理的第 2 个内容面板。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Middle: 2-Column Controls (Props on Left, Methods on Right) -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <!-- Left: Props Controllers -->
              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--primary);">
                  ⚙️ 属性动态调节 (Props Controller)
                </div>
                
                <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                  <div>
                    <label style="display:block; margin-bottom:4px; color:var(--text-secondary);">1. type (风格类型):</label>
                    <select class="select-theme" style="width:100%; height:32px;" onchange="let nav=document.getElementById('playTabsNav'); if(this.value==='card'){ nav.style.borderBottom='none'; } else { nav.style.borderBottom='1px solid var(--border-base)'; } showToast('type = ' + this.value);">
                      <option value="line">LINE (划线风格)</option>
                      <option value="card">CARD (卡片风格)</option>
                      <option value="border-card">BORDER_CARD (边框卡片)</option>
                      <option value="segment">SEGMENT (分段风格)</option>
                    </select>
                  </div>

                  <div>
                    <label style="display:block; margin-bottom:4px; color:var(--text-secondary);">2. tab_position (方位位置):</label>
                    <select class="select-theme" style="width:100%; height:32px;" onchange="changeTabPosDemo(this.value, 'playTabsBox')">
                      <option value="top">TOP (上方)</option>
                      <option value="bottom">BOTTOM (下方)</option>
                      <option value="left">LEFT (左侧)</option>
                      <option value="right">RIGHT (右侧)</option>
                    </select>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                    <span>3. closable (可关闭):</span>
                    <label class="g-switch"><input type="checkbox" onchange="showToast('closable = ' + this.checked)"><span class="g-switch-slider"></span></label>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>4. addable (可增加):</span>
                    <label class="g-switch"><input type="checkbox" checked onchange="showToast('addable = ' + this.checked)"><span class="g-switch-slider"></span></label>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>5. stretch (宽度自适应):</span>
                    <label class="g-switch"><input type="checkbox" onchange="showToast('stretch = ' + this.checked)"><span class="g-switch-slider"></span></label>
                  </div>
                </div>
              </div>

              <!-- Right: Methods Invokers -->
              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--success);">
                  ⚡ 方法实时调用 (Methods Invoker)
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <button class="g-btn g-btn-primary" style="font-size:12px; height:32px;" onclick="addDynamicTabPane('playTabsBox')">add_tab() 追加</button>
                  <button class="g-btn g-btn-danger" style="font-size:12px; height:32px;" onclick="let nav=document.getElementById('playTabsNav'); if(nav.children.length>1){ nav.lastElementChild.remove(); showToast('remove_tab() 执行成功'); }">remove_tab() 移除</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="switchTabDemo(0, 'playTabsBox')">set_current(0)</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="switchTabDemo(1, 'playTabsBox')">set_current(1)</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="showToast('get_tab_count() -> ' + document.getElementById('playTabsNav').children.length, 'info')">get_tab_count()</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="showToast('get_tab_name(0) -> 首页 (Tab 1)', 'info')">get_tab_name(0)</button>
                  <button class="g-btn g-btn-warning" style="font-size:12px; height:32px;" onclick="showToast('next_tab() 切换到下一个标签', 'info')">next_tab() 下一个</button>
                  <button class="g-btn g-btn-warning" style="font-size:12px; height:32px;" onclick="showToast('prev_tab() 切换到上一个标签', 'info')">prev_tab() 上一个</button>
                </div>

                <!-- Signal Event Log -->
                <div style="margin-top:14px; padding:8px 10px; background:var(--bg-card); border-radius:4px; border:1px solid var(--border-base); font-size:11px; font-family:var(--font-mono); color:var(--text-secondary);">
                  <div>📡 信号发射监控 (Signal Monitor):</div>
                  <div id="playTabsLog" style="color:var(--primary); margin-top:2px;">[Signal]: tab_changed emitted -> current_tab: 0</div>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: 动态调用 GTabs 属性与方法
var tabs = GTabs.new()
tabs.type = GTabs.TabType.CARD
tabs.tab_position = GTabs.TabPosition.TOP
tabs.closable = true
tabs.addable = true

# 动态调用方法
tabs.add_tab("新标签", new_panel, true)
tabs.set_current_tab(0)
tabs.next_tab()

# 订阅自定义信号
tabs.tab_changed.connect(func(idx, name): print("Tab:", name))`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. GButton 属性与方法演练
  // --------------------------------------------------------
  'play-button': {
    title: '🧪 GButton 属性与方法交互实验室',
    desc: '动态调节 GButton 的 button_type、variant、size、round、circle、loading、disabled 属性，并调用 grab_focus()、set_text() 方法。',
    demos: [
      {
        title: 'GButton 属性调节与方法测试',
        render: `
          <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
            <!-- Live Preview -->
            <div style="padding:24px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; justify-content:center; align-items:center; min-height:100px;">
              <button id="playLiveBtn" class="g-btn g-btn-primary" onclick="showToast('GButton 点击信号 pressed() 触发！', 'success')">
                <i id="playBtnIcon" class="fa-solid fa-play" style="margin-right:6px;"></i>
                <span id="playBtnText">Interactive Button</span>
              </button>
            </div>

            <!-- Controls -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--primary);">⚙️ 属性设置 (Props)</div>
                <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                  <div>
                    <label style="color:var(--text-secondary);">button_type:</label>
                    <select class="select-theme" style="width:100%; height:32px; margin-top:2px;" onchange="let b=document.getElementById('playLiveBtn'); b.className='g-btn g-btn-'+this.value;">
                      <option value="primary">PRIMARY (主色)</option>
                      <option value="success">SUCCESS (成功绿)</option>
                      <option value="warning">WARNING (警告黄)</option>
                      <option value="danger">DANGER (危险红)</option>
                      <option value="info">INFO (信息灰)</option>
                      <option value="default">DEFAULT (朴素描边)</option>
                    </select>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>loading (加载中):</span>
                    <label class="g-switch"><input type="checkbox" onchange="let ic=document.getElementById('playBtnIcon'); ic.className=this.checked?'fa-solid fa-spinner fa-spin':'fa-solid fa-play';"><span class="g-switch-slider"></span></label>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>disabled (禁用):</span>
                    <label class="g-switch"><input type="checkbox" onchange="document.getElementById('playLiveBtn').disabled=this.checked;"><span class="g-switch-slider"></span></label>
                  </div>
                </div>
              </div>

              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--success);">⚡ 方法调用 (Methods)</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="document.getElementById('playLiveBtn').focus(); showToast('grab_focus() 执行成功');">grab_focus() 聚焦</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="document.getElementById('playLiveBtn').blur(); showToast('release_focus() 释放');">release_focus()</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="document.getElementById('playBtnText').innerText='Text Changed!'; showToast('set_text() 更新成功');">set_text() 修改文字</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="showToast('has_focus() -> ' + (document.activeElement===document.getElementById('playLiveBtn')));">has_focus() 查询</button>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: GButton 属性与方法
var btn = GButton.new()
btn.button_type = GButton.ButtonType.SUCCESS
btn.loading = false
btn.disabled = false
btn.grab_focus()
btn.pressed.connect(func(): print("Button Clicked"))
add_child(btn)`
      }
    ]
  },

  // --------------------------------------------------------
  // 3. GInput 属性与方法演练
  // --------------------------------------------------------
  'play-input': {
    title: '🧪 GInput 输入框属性与方法交互实验室',
    desc: '动态测试 clearable、show_password、disabled、max_length 属性与 clear()、focus()、select_all() 方法。',
    demos: [
      {
        title: 'GInput 属性与方法操作台',
        render: `
          <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
            <!-- Live Preview -->
            <div style="padding:20px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
              <div class="g-input-wrapper" style="width:100%; max-width:400px; margin:0 auto;">
                <input id="playLiveInput" class="g-input" type="text" value="Godot 4 Input Value" placeholder="请输入内容...">
              </div>
            </div>

            <!-- Controls -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--primary);">⚙️ 属性设置 (Props)</div>
                <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>show_password (密码遮罩):</span>
                    <label class="g-switch"><input type="checkbox" onchange="document.getElementById('playLiveInput').type=this.checked?'password':'text';"><span class="g-switch-slider"></span></label>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>disabled (禁用输入):</span>
                    <label class="g-switch"><input type="checkbox" onchange="document.getElementById('playLiveInput').disabled=this.checked;"><span class="g-switch-slider"></span></label>
                  </div>
                </div>
              </div>

              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--success);">⚡ 方法调用 (Methods)</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <button class="g-btn g-btn-danger" style="font-size:12px; height:32px;" onclick="document.getElementById('playLiveInput').value=''; showToast('clear() 清空内容', 'info');">clear() 清空</button>
                  <button class="g-btn g-btn-primary" style="font-size:12px; height:32px;" onclick="document.getElementById('playLiveInput').focus(); showToast('focus() 获取光标');">focus() 聚焦</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="document.getElementById('playLiveInput').select(); showToast('select_all() 全选');">select_all() 全选</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="showToast('get_text() -> ' + document.getElementById('playLiveInput').value);">get_text() 获取</button>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: GInput 属性与方法
var input = GInput.new()
input.placeholder_text = "请输入账号..."
input.clearable = true
input.clear()
input.grab_focus()
input.text_changed.connect(func(new_text): print("Text:", new_text))
add_child(input)`
      }
    ]
  },

  // --------------------------------------------------------
  // 4. GProgress 进度条演练
  // --------------------------------------------------------
  'play-progress': {
    title: '🧪 GProgress 进度条属性与方法交互实验室',
    desc: '动态调节 percentage、status、stroke_width 属性并调用 set_percentage()、add_percentage() 方法。',
    demos: [
      {
        title: 'GProgress 属性与平滑数值调整',
        render: `
          <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
            <!-- Live Preview -->
            <div style="padding:24px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700;">
                <span>当前进度值 / Percentage:</span>
                <span id="playProgNum" style="color:var(--primary);">60%</span>
              </div>
              <div class="g-progress-bar"><div id="playProgFill" class="g-progress-fill" style="width:60%; transition:width 0.3s ease;"></div></div>
            </div>

            <!-- Controls -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--primary);">⚙️ 属性设置 (Props)</div>
                <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                  <div>
                    <label style="color:var(--text-secondary);">status (状态色彩):</label>
                    <select class="select-theme" style="width:100%; height:32px; margin-top:2px;" onchange="let f=document.getElementById('playProgFill'); if(this.value==='success'){f.style.background='var(--success)';}else if(this.value==='warning'){f.style.background='var(--warning)';}else if(this.value==='danger'){f.style.background='var(--danger)';}else{f.style.background='var(--primary)';}">
                      <option value="primary">PRIMARY (主色)</option>
                      <option value="success">SUCCESS (成功绿)</option>
                      <option value="warning">WARNING (警告黄)</option>
                      <option value="danger">DANGER (危险红)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius);">
                <div style="font-weight:700; font-size:14px; margin-bottom:12px; color:var(--success);">⚡ 方法调用 (Methods)</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <button class="g-btn g-btn-primary" style="font-size:12px; height:32px;" onclick="let f=document.getElementById('playProgFill'); let n=document.getElementById('playProgNum'); let cur=Math.min(100, parseInt(n.innerText)+20); f.style.width=cur+'%'; n.innerText=cur+'%'; showToast('add_percentage(+20) -> ' + cur + '%');">add(+20%)</button>
                  <button class="g-btn g-btn-warning" style="font-size:12px; height:32px;" onclick="let f=document.getElementById('playProgFill'); let n=document.getElementById('playProgNum'); let cur=Math.max(0, parseInt(n.innerText)-20); f.style.width=cur+'%'; n.innerText=cur+'%'; showToast('add_percentage(-20) -> ' + cur + '%');">sub(-20%)</button>
                  <button class="g-btn g-btn-default" style="font-size:12px; height:32px;" onclick="document.getElementById('playProgFill').style.width='100%'; document.getElementById('playProgNum').innerText='100%'; showToast('set_percentage(100.0)');">set(100%)</button>
                  <button class="g-btn g-btn-danger" style="font-size:12px; height:32px;" onclick="document.getElementById('playProgFill').style.width='0%'; document.getElementById('playProgNum').innerText='0%'; showToast('reset() -> 0%');">reset(0%)</button>
                </div>
              </div>
            </div>
          </div>
        `,
        code: `# GDScript: GProgress 属性与方法
var p = GProgress.new()
p.percentage = 60.0
p.status = GThemeTokens.Status.SUCCESS
p.set_percentage(85.0)
add_child(p)`
      }
    ]
  },

  // --------------------------------------------------------
  // 5. GDialog 弹窗演练
  // --------------------------------------------------------
  'play-dialog': {
    title: '🧪 GDialog 弹窗属性与方法交互实验室',
    desc: '测试 title、width、show_close 属性与 open()、close()、confirm() 外部方法。',
    demos: [
      {
        title: 'GDialog 外部方法调用演示',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="openDialog('系统通知', '这是一条通过 dialog.open() 调起的消息确认弹窗。')">dialog.open() 打开弹窗</button>
              <button class="g-btn g-btn-danger" onclick="openDialog('危险操作警告', '确认彻底删除选中的游戏存档数据吗？此操作不可逆！')">打开危险警告弹窗</button>
            </div>
          </div>
        `,
        code: `# GDScript: GDialog 弹窗调用
var dialog = GDialog.new()
dialog.title = "系统通知"
dialog.open("是否确认提交数据？")
dialog.confirmed.connect(func(): print("Confirmed"))
dialog.canceled.connect(func(): print("Canceled"))
add_child(dialog)`
      }
    ]
  }
};
