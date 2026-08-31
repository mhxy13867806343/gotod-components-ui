// =========================================================================
// Gotod Components UI - 5. 命令式与编程式调用实验室 (Imperative API & Context Studio)
// assets/js/imperative_api.js
// 深度对标 Element Plus / Naive UI 的 ElMessage, ElMessageBox, ElNotification, ElLoading
// =========================================================================

window.activeLoadingServiceInstance = null;

// Simulated Imperative Helpers for Web Preview
window.runSimMessage = function(type, text) {
  showToast(text, type);
};

window.runSimMessageBox = function(kind) {
  if (kind === 'alert') {
    openSimDialog('系统检测到游戏版本更新，请前往应用商城升级！', '系统升级通知');
  } else if (kind === 'confirm') {
    openSimDialog('确定要分解【烈焰弑神之刃 +12】吗？分解后将无法找回！', '装备分解确认');
  } else if (kind === 'prompt') {
    openSimDialog('请输入新的公会战队名称：', '创建公会');
  }
};

window.runSimLoadingService = function() {
  const mask = document.createElement('div');
  mask.id = 'simGlobalLoadingMask';
  mask.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.65); z-index: 99999;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 14px; color: #fff; font-size: 14px; font-weight: 600;
    backdrop-filter: blur(4px); animation: fadeIn 0.2s ease;
  `;
  mask.innerHTML = `
    <div style="width: 42px; height: 42px; border: 3px solid rgba(24, 160, 88, 0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
    <div>正在载入跨服战场数据 (GLoading.service)...</div>
    <button class="g-btn g-btn-default" style="margin-top: 8px; height: 26px; font-size: 12px;" onclick="closeSimLoadingService()">手动关闭 (loading.close())</button>
  `;
  document.body.appendChild(mask);
  window.activeLoadingServiceInstance = mask;

  // Auto close after 3s
  setTimeout(() => {
    closeSimLoadingService();
  }, 3000);
};

window.closeSimLoadingService = function() {
  const mask = document.getElementById('simGlobalLoadingMask');
  if (mask) {
    mask.style.opacity = '0';
    mask.style.transition = 'opacity 0.2s ease';
    setTimeout(() => mask.remove(), 200);
    showToast('GLoading 加载服务已关闭 (loading.close())', 'info');
  }
};

window.runSimNotification = function(type, title, msg) {
  showToast(`【${title}】: ${msg}`, type);
};

window.IMPERATIVE_CATALOG = {
  // --------------------------------------------------------
  // 1. GMessage 全局消息提示
  // --------------------------------------------------------
  'imp-message': {
    title: '💬 GMessage 全局消息提示 (命令式调用 & close_all)',
    desc: '从顶部弹出的悬浮消息提示。无需在场景树中放置节点，直接在任何 GDScript 脚本中通过静态函数调用，支持传入 context_node (self) 继承当前场景树与主题。',
    demos: [
      {
        title: '基础静态命令式方法调用 (Success / Warning / Error / Info)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="runSimMessage('success', '购买道具成功！获得金币 +500')">
                <i class="fa-solid fa-circle-check"></i> GMessage.success()
              </button>
              <button class="g-btn g-btn-warning" onclick="runSimMessage('warning', '请注意：背包负重已达到 90%！')">
                <i class="fa-solid fa-triangle-exclamation"></i> GMessage.warning()
              </button>
              <button class="g-btn g-btn-danger" onclick="runSimMessage('danger', '连接服务器超时，请检查网络设置')">
                <i class="fa-solid fa-circle-xmark"></i> GMessage.error()
              </button>
              <button class="g-btn g-btn-default" onclick="runSimMessage('info', '系统将在 5 分钟后刷新日常任务')">
                <i class="fa-solid fa-circle-info"></i> GMessage.info()
              </button>
            </div>
            
            <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
              <button class="g-btn g-btn-default" style="color:var(--danger);" onclick="showToast('已调用 GMessage.close_all() 关闭所有激活实例', 'info')">
                <i class="fa-solid fa-ban"></i> GMessage.close_all() 手动关闭所有实例
              </button>
              <span style="font-size:12px; color:var(--text-secondary);">1:1 对标 Element Plus 的 ElMessage.closeAll()</span>
            </div>
          </div>
        `,
        code: `# GDScript 静态函数调用 (传入 self 继承应用程序上下文)
# 1. 成功提示
GMessage.success("购买道具成功！获得金币 +500", self)

# 2. 警告提示
GMessage.warning("请注意：背包负重已达到 90%！", self)

# 3. 错误提示
GMessage.error("连接服务器超时，请检查网络设置", self)

# 4. 手动关闭所有激活的消息实例
GMessage.close_all()

# 5. 高级字典配置调用
GMessage.display({
    "message": "自定义停留 5 秒的高优先级提示",
    "type": "success",
    "duration": 5.0
}, self)`
      },
      {
        title: '应用程序上下文继承 (Context Injection self) 机制详解',
        render: `
          <div style="padding:16px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); line-height:1.8; font-size:13px;">
            <div style="font-weight:700; color:var(--primary); margin-bottom:8px; font-size:14px;">
              <i class="fa-solid fa-diagram-project"></i> 为什么推荐传入 self 上下文？
            </div>
            <p>当您在子窗口 (Window)、子视口 (SubViewport) 或深层 UI 场景中调用命令式方法时：</p>
            <ul style="padding-left:20px; color:var(--text-secondary); margin:8px 0;">
              <li><strong>自动定位视口：</strong> <code>GMessage</code> 会自动将 CanvasLayer 挂载到 <code>self.get_tree().root</code> 或对应的独立视口中，避免跨视口丢失。</li>
              <li><strong>主题与尺寸同步：</strong> 自动继承当前节点所使用的 <code>GotodTheme</code> 色彩规范与高分屏缩放比例。</li>
              <li><strong>安全生命周期回收：</strong> 当场景切换或调用 <code>close_all()</code> 时，自动安全释放所有弹窗实例。</li>
            </ul>
          </div>
        `,
        code: `# 在您的场景脚本 (如 PlayerInventory.gd) 中使用：
extends Control

func _on_buy_button_pressed() -> void:
    if gold >= 100:
        gold -= 100
        # 传入 self，Toast 自动挂载到当前 SceneTree
        GMessage.success("购买成功！剩余金币: " + str(gold), self)
    else:
        GMessage.error("金币不足！", self)`
      }
    ]
  },

  // --------------------------------------------------------
  // 1.2 GToast Vant 风格轻提示
  // --------------------------------------------------------
  'imp-toast': {
    title: '🍞 GToast 命令式轻提示 (Vant UI Toast)',
    desc: '在屏幕中间或顶部/底部弹出轻量级黑色半透明气泡，支持纯文字、成功、失败、转圈加载以及倒计时动态更新。',
    demos: [
      {
        title: '常用命令式方法演示 (Show / Success / Fail / Loading)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-default" onclick="openSimToast('纯文字轻提示 (居中展示)')">
                <i class="fa-solid fa-comment-dots"></i> GToast.text()
              </button>
              <button class="g-btn g-btn-primary" onclick="openSimToast({ message: '当前网络正常', type: 'info' })">
                <i class="fa-solid fa-circle-info"></i> GToast.info()
              </button>
              <button class="g-btn g-btn-warning" onclick="openSimToast({ message: '生命值过低！', type: 'warning' })">
                <i class="fa-solid fa-triangle-exclamation"></i> GToast.warning()
              </button>
              <button class="g-btn g-btn-success" onclick="openSimToast({ message: '装备强化成功！', type: 'success' })">
                <i class="fa-solid fa-circle-check"></i> GToast.success()
              </button>
              <button class="g-btn g-btn-danger" onclick="openSimToast({ message: '金币不足强化失败', type: 'fail' })">
                <i class="fa-solid fa-circle-xmark"></i> GToast.fail()
              </button>
              <button class="g-btn g-btn-warning" onclick="openSimToast({ message: '正在加载游戏资源...', type: 'loading', forbidClick: true, duration: 2500 })">
                <i class="fa-solid fa-spinner"></i> GToast.loading()
              </button>
            </div>
            
            <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
              <button class="g-btn g-btn-default" style="color:var(--danger);" onclick="closeSimToast(); showToast('已调用 GToast.clear() 清除所有轻提示', 'info')">
                <i class="fa-solid fa-ban"></i> GToast.clear() 一键关闭轻提示
              </button>
            </div>
          </div>
        `,
        code: `# GDScript 静态命令式调用
# 1. 文字提示
GToast.show("纯文字轻提示")

# 2. 状态提示
GToast.success("强化成功！")
GToast.fail("金币不足！")

# 3. 加载中提示与手动关闭
var toast = GToast.loading("正在下载地图资源...", true)
# 异步任务完成后：
toast.set_message("加载完成！")
GToast.clear()`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. GMessageBox 编程式弹窗
  // --------------------------------------------------------
  'imp-message-box': {
    title: '📦 GMessageBox 命令式弹窗 (Alert / Confirm / Prompt)',
    desc: '用于系统确认、关键操作拦截与简单输入的编程式弹窗，提供异步信号监听机制。',
    demos: [
      {
        title: '三大弹窗调用 (Alert 警告 / Confirm 确认 / Prompt 输入)',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="runSimMessageBox('alert')">
                <i class="fa-solid fa-bell"></i> GMessageBox.alert()
              </button>
              <button class="g-btn g-btn-warning" onclick="runSimMessageBox('confirm')">
                <i class="fa-solid fa-circle-question"></i> GMessageBox.confirm()
              </button>
              <button class="g-btn g-btn-default" onclick="runSimMessageBox('prompt')">
                <i class="fa-solid fa-pen-to-square"></i> GMessageBox.prompt()
              </button>
            </div>
          </div>
        `,
        code: `# GDScript 编程式弹窗调用:

# 1. GMessageBox.alert (简单单按钮通知)
GMessageBox.alert("服务器将于 10 分钟后进行停服维护！", "系统升级通知", {}, self)

# 2. GMessageBox.confirm (带确认/取消双按钮与信号监听)
var confirm_box = GMessageBox.confirm("确定要分解这件神话级装备吗？此操作不可逆！", "装备分解确认", {}, self)
confirm_box.confirmed.connect(func():
    GMessage.success("装备分解成功，获得神话精粹 x10", self)
)
confirm_box.canceled.connect(func():
    GMessage.info("已取消分解操作", self)
)

# 3. GMessageBox.prompt (带输入框的确认弹窗)
var prompt_box = GMessageBox.prompt("请输入新的角色昵称：", "修改昵称", {"input_placeholder": "新昵称..."}, self)
prompt_box.prompt_submitted.connect(func(new_name: String):
    GMessage.success("角色昵称已成功修改为: " + new_name, self)
)`
      }
    ]
  },

  // --------------------------------------------------------
  // 3. GLoading 全局遮罩加载服务
  // --------------------------------------------------------
  'imp-loading': {
    title: '⏳ GLoading 全局加载遮罩服务 (GLoading.service)',
    desc: '全屏或局部覆盖的半透明遮罩加载指示器，在异步数据请求或场景切换时阻止用户重复点击。',
    demos: [
      {
        title: 'GLoading.service() 服务启动与 loading.close() 关闭',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px;">
              <button class="g-btn g-btn-primary" onclick="runSimLoadingService()">
                <i class="fa-solid fa-spinner fa-spin"></i> 触发 GLoading.service() (模拟3秒后自动关闭)
              </button>
            </div>
            <p style="font-size:12px; color:var(--text-secondary);">点击上方按钮将唤起全屏半透明高斯模糊加载遮罩，并提供 <code>loading.close()</code> 手动关闭支持。</p>
          </div>
        `,
        code: `# GDScript: 异步加载遮罩服务
func load_game_battle_scene() -> void:
    # 1. 开启全局 Loading 遮罩服务
    var loading = GLoading.service({
        "text": "正在载入跨服战场数据，请稍候...",
        "spinner_size": 42.0
    }, self)
    
    # 2. 执行后台异步资源加载
    await ResourceLoader.load_threaded_request("res://scenes/battle_map.tscn")
    await get_tree().create_timer(1.5).timeout
    
    # 3. 业务完成，调用 close() 销毁遮罩
    loading.close()
    GMessage.success("战场地图加载就绪！", self)`
      }
    ]
  },

  // --------------------------------------------------------
  // 4. GNotification 右上角通知气泡
  // --------------------------------------------------------
  'imp-notification': {
    title: '🔔 GNotification 右上角通知气泡 (GNotification.notify)',
    desc: '悬浮在屏幕右上角的带标题与多行描述的通知气泡，适合游戏成就解锁、系统公告、好友私信等通知。',
    demos: [
      {
        title: 'GNotification 四类气泡与 close_all()',
        render: `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="runSimNotification('success', '成就解锁', '首次单挑击败世界首领【黑龙之王】！')">
                <i class="fa-solid fa-trophy"></i> GNotification.success()
              </button>
              <button class="g-btn g-btn-warning" onclick="runSimNotification('warning', '排位赛匹配', '队伍已准备就绪，10 秒内确认进入战场')">
                <i class="fa-solid fa-gamepad"></i> GNotification.warning()
              </button>
              <button class="g-btn g-btn-danger" onclick="runSimNotification('danger', '领地告警', '您的公会主城正遭受敌方军团进攻！')">
                <i class="fa-solid fa-shield-halved"></i> GNotification.error()
              </button>
              <button class="g-btn g-btn-default" onclick="showToast('已关闭所有通知气泡', 'info')">
                <i class="fa-solid fa-rectangle-xmark"></i> GNotification.close_all()
              </button>
            </div>
          </div>
        `,
        code: `# GDScript: 右上角全局通知气泡
# 1. 成功通知 (如游戏成就)
GNotification.success("【成就达成】", "恭喜首次通关深渊副本第 100 层！", self)

# 2. 警告通知 (如匹配准备)
GNotification.warning("【排位赛提示】", "队伍已准备就绪，请在 10 秒内确认", self)

# 3. 危险通知 (如公会告警)
GNotification.error("【领地告警】", "公会主城正遭受敌方军团进攻！", self)

# 4. 手动关闭所有通知
GNotification.close_all()`
      }
    ]
  }
};
