// =========================================================================
// Gotod Components UI - Sidebar Navigation Manifest & Layout Renderer
// 提取自 app.js：12大板块侧边栏菜单配置、分组渲染与即时搜索过滤
// =========================================================================

window.SIDEBAR_CONFIG = {
  'guide': {
    placeholder: 'Search guide...',
    groups: [
      {
        title: 'Development 指南',
        items: [
          { key: 'guide-install', title: '📥 安装与快速上手' },
          { key: 'guide-imperative-api', title: '⚡ 命令式调用与上下文继承' },
          { key: 'guide-treeshaking', title: '📦 生产环境按需打包与摇树优化' },
          { key: 'guide-common-methods', title: '🛠️ 全局通用基类方法与事件' },
          { key: 'guide-dynamic-api', title: '🧩 GTabs 动态方法与自定义信号' },
          { key: 'guide-theme', title: '🎨 主题 Token 与暗黑模式' },
          { key: 'guide-autoload', title: '⚙️ Autoload 全局服务' }
        ]
      }
    ],
    defaultKey: 'guide-install'
  },
  'imperative': {
    placeholder: 'Search imperative API...',
    groups: [
      {
        title: 'Imperative API 编程式静态调用',
        items: [
          { key: 'imp-message', title: '💬 GMessage 全局消息与 close_all' },
          { key: 'imp-message-box', title: '📦 GMessageBox 命令式弹窗' },
          { key: 'imp-loading', title: '⏳ GLoading 遮罩加载服务' },
          { key: 'imp-notification', title: '🔔 GNotification 四角通知气泡' }
        ]
      }
    ],
    defaultKey: 'imp-message'
  },
  'game': {
    placeholder: 'Search game templates...',
    groups: [
      {
        title: 'Game Templates 游戏实战案例',
        items: [
          { key: 'game-character', title: '👤 角色状态与装备面板' },
          { key: 'game-inventory', title: '🎒 游戏背包与物品栏' },
          { key: 'game-settings', title: '🎮 游戏系统设置中心' },
          { key: 'game-quest', title: '📜 任务与剧情日志' },
          { key: 'game-shop', title: '🛒 神秘商人道具商城' }
        ]
      }
    ],
    defaultKey: 'game-character'
  },
  'playground': {
    placeholder: 'Search API playground...',
    groups: [
      {
        title: 'API Playground 属性与方法实验室',
        items: [
          { key: 'play-tabs', title: '🧪 GTabs 选项卡演练' },
          { key: 'play-button', title: '🧪 GButton 按钮演练' },
          { key: 'play-input', title: '🧪 GInput 输入框演练' },
          { key: 'play-progress', title: '🧪 GProgress 进度条演练' },
          { key: 'play-dialog', title: '🧪 GDialog 弹窗演练' }
        ]
      }
    ],
    defaultKey: 'play-tabs'
  },
  'hooks': {
    placeholder: 'Search hooks...',
    groups: [
      {
        title: 'Vue-Style Hooks 响应式钩子',
        items: [
          { key: 'hook-cooldown', title: '⏳ useCooldown 技能冷却' },
          { key: 'hook-form', title: '📝 useForm 表单响应式校验' },
          { key: 'hook-pagination', title: '📑 usePagination 列表分页器' },
          { key: 'hook-dialog', title: '🪟 useDialog 组合式弹窗' }
        ]
      }
    ],
    defaultKey: 'hook-cooldown'
  },
  'signals': {
    placeholder: 'Search signals & events...',
    groups: [
      {
        title: 'Class-Based 信号与事件总线',
        items: [
          { key: 'signal-event-bus', title: '⚡ GEventBus 类化全局事件总线' },
          { key: 'signal-custom-class', title: '📡 GCustomSignal 动态信号对象' }
        ]
      }
    ],
    defaultKey: 'signal-event-bus'
  },
  'decorator': {
    placeholder: 'Search decorators...',
    groups: [
      {
        title: 'Decorator 装饰器设计模式',
        items: [
          { key: 'decorator-weapon', title: '🛡️ 武器多重附魔装饰器' },
          { key: 'decorator-ui', title: '🎨 UI 控件能力装饰器' }
        ]
      }
    ],
    defaultKey: 'decorator-weapon'
  },
  'storage': {
    placeholder: 'Search storage & save...',
    groups: [
      {
        title: 'Game Save 游戏存档与生命周期守护',
        items: [
          { key: 'storage-save-slots', title: '💾 游戏多槽位存档与中断存储' },
          { key: 'storage-lifecycle-guardian', title: '⚡ 引擎生命周期守护与卡死自动保存' }
        ]
      }
    ],
    defaultKey: 'storage-save-slots'
  },
  'router': {
    placeholder: 'Search router & utils...',
    groups: [
      {
        title: 'Router & Utils 路由与工具',
        items: [
          { key: 'util-router', title: '🚀 GRouter 转场动画路由' },
          { key: 'util-lifecycle-guard', title: '🛡️ GLifecycleGuard 生命周期校验' },
          { key: 'util-format', title: '🎨 GFormat HP颜色与时间格式化' },
          { key: 'util-asset', title: '🎵 GAsset 音视频与纹理导入' }
        ]
      }
    ],
    defaultKey: 'util-router'
  },
  'lifecycle': {
    placeholder: 'Search lifecycles...',
    groups: [
      {
        title: 'Godot 4 节点生命周期',
        items: [
          { key: 'lifecycle-overview', title: '🔄 全量生命周期全景与模拟器' },
          { key: 'lifecycle-apis', title: '📖 7大阶段 API 示例大全' }
        ]
      }
    ],
    defaultKey: 'lifecycle-overview'
  },
  'studio': {
    placeholder: 'Search resource studio...',
    groups: [
      {
        title: 'Godot 4 .tres 资源与主题工坊',
        items: [
          { key: 'studio-theme-editor', title: '🎨 Godot 4 官方主题编辑器 & .tres 导出' },
          { key: 'studio-custom-resource', title: '💾 自定义 Resource 数据资源 (.tres)' }
        ]
      }
    ],
    defaultKey: 'studio-theme-editor'
  },
  'components': {
    placeholder: 'Search components...',
    groups: [
      {
        title: 'General 基础',
        items: [
          { key: 'button', title: 'GButton 按钮' },
          { key: 'text', title: 'GText / GTitle 文本' },
          { key: 'divider', title: 'GDivider 分割线' },
          { key: 'icon', title: 'GIcon 图标' },
          { key: 'fab', title: 'GFab 悬浮按钮' }
        ]
      },
      {
        title: 'Form 表单',
        items: [
          { key: 'input', title: 'GInput 输入框' },
          { key: 'textarea', title: 'GTextarea 文本域' },
          { key: 'input-number', title: 'GInputNumber 数字输入' },
          { key: 'switch', title: 'GSwitch 开关' },
          { key: 'checkbox', title: 'GCheckbox 多选框' },
          { key: 'radio', title: 'GRadio 单选框' },
          { key: 'select', title: 'GSelect 下拉选择' },
          { key: 'slider', title: 'GSlider 滑块' },
          { key: 'form', title: 'GForm 表单布局' }
        ]
      },
      {
        title: 'Feedback 反馈',
        items: [
          { key: 'dialog', title: 'GDialog / GModal 弹窗' },
          { key: 'popup', title: 'GPopup 弹出层' },
          { key: 'overlay', title: 'GOverlay 遮罩层' },
          { key: 'message', title: 'GMessage 全局提示' },
          { key: 'alert', title: 'GAlert 警告提示' },
          { key: 'drawer', title: 'GDrawer 抽屉' },
          { key: 'tooltip', title: 'GTooltip 悬浮提示' },
          { key: 'loading', title: 'GLoading 加载指示器' },
          { key: 'skeleton', title: 'GSkeleton 骨架屏' }
        ]
      },
      {
        title: 'Data Display 数据',
        items: [
          { key: 'card', title: 'GCard 卡片' },
          { key: 'tag', title: 'GTag 标签' },
          { key: 'badge', title: 'GBadge 徽标' },
          { key: 'avatar', title: 'GAvatar 头像' },
          { key: 'progress', title: 'GProgress 进度条' },
          { key: 'tabs', title: 'GTabs 标签页' },
          { key: 'collapse', title: 'GCollapse 折叠面板' },
          { key: 'steps', title: 'GSteps 步骤条' },
          { key: 'space', title: 'GSpace 间距布局' }
        ]
      }
    ],
    defaultKey: 'tabs'
  }
};

window.SECTION_KEYS = Object.keys(window.SIDEBAR_CONFIG);

// Render Sidebar Navigation Dynamically
window.renderSidebarNav = function(section, targetDocKey) {
  const sidebar = document.getElementById('sidebarNav');
  if (!sidebar) return;

  const cfg = window.SIDEBAR_CONFIG[section] || window.SIDEBAR_CONFIG['components'];
  const activeKey = targetDocKey || cfg.defaultKey;

  let html = `<input type="text" class="nav-search" placeholder="${cfg.placeholder}" oninput="filterNav(this.value)">`;

  cfg.groups.forEach(group => {
    html += `<div class="nav-group"><div class="nav-group-title">${group.title}</div>`;
    group.items.forEach(item => {
      const isActive = item.key === activeKey ? 'active' : '';
      html += `<div class="nav-item ${isActive}" data-key="${item.key}" onclick="showDoc('${item.key}')"><span>${item.title}</span></div>`;
    });
    html += `</div>`;
  });

  sidebar.innerHTML = html;
  if (typeof window.showDoc === 'function') {
    window.showDoc(activeKey);
  }
};

// Sidebar Navigation Search Filtering
window.filterNav = function(q) {
  const val = (q || '').toLowerCase().trim();
  document.querySelectorAll('.nav-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(val) ? 'flex' : 'none';
  });
};
