// =========================================================================
// Gotod Components UI - Sidebar Navigation Manifest & Layout Renderer
// 提取自 app.js：12大板块侧边栏菜单配置、分组渲染与即时搜索过滤
// =========================================================================

window.SIDEBAR_CONFIG = {
  'changelog': {
    placeholder: '搜索更新日志...',
    groups: [
      {
        title: 'Changelog 版本时间线',
        items: [
          { key: 'changelog-latest', title: '✨ v1.2.0 今日重磅升级 (Steps)' },
          { key: 'changelog-history', title: '📜 历史版本历程 (v1.0 ~ v1.2)' },
          { key: 'changelog-roadmap', title: '🗺️ 未来版本路线图 (Roadmap)' }
        ]
      }
    ],
    defaultKey: 'changelog-latest'
  },
  'guide': {
    placeholder: 'Search guide...',
    groups: [
      {
        title: 'Development 指南',
        items: [
          { key: 'guide-install', title: '📥 安装与快速上手' },
          { key: 'slot-concept', title: '🎰 Vue-Style Slots 插槽系统与点语法' },
          { key: 'guide-third-party', title: '🔌 第三方库配合 (QFramework / Dialogic)' },
          { key: 'guide-css-style-engine', title: '🎨 .css() 与 .style() 样式引擎' },
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
          { key: 'imp-toast', title: '🍞 GToast Vant 风格轻提示' },
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
          { key: 'game-memory-match', title: '🎴 记忆大师实战与问题修复复盘' },
          { key: 'game-troubleshooting-diff', title: '🛠️ Demo 常见问题与代码前后对比' },
          { key: 'game-character', title: '👤 角色状态与装备面板' },
          { key: 'game-inventory', title: '🎒 游戏背包与物品栏' },
          { key: 'game-settings', title: '🎮 游戏系统设置中心' },
          { key: 'game-quest', title: '📜 任务与剧情日志' },
          { key: 'game-shop', title: '🛒 神秘商人道具商城' }
        ]
      }
    ],
    defaultKey: 'game-memory-match'
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
        title: 'UniApp / Vue 风格全局事件通讯与信号',
        items: [
          { key: 'signal-uni-emit', title: '⚡ GEvent (uni.$emit / uni.$on 页面通讯)' },
          { key: 'signal-event-bus', title: '🌐 跨场景/跨页面全局事件联动' },
          { key: 'signal-custom-class', title: '📡 GCustomSignal 动态信号对象' }
        ]
      }
    ],
    defaultKey: 'signal-uni-emit'
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
        title: 'Layout & General 基础与布局',
        items: [
          { key: 'button', title: 'GButton 按钮', version: 'v1.0' },
          { key: 'container', title: 'GContainer 布局容器', version: 'v1.0' },
          { key: 'space', title: 'GSpace 间距布局', version: 'v1.0' },
          { key: 'text', title: 'GText / GTitle 文本', version: 'v1.0' },
          { key: 'divider', title: 'GDivider 分割线', version: 'v1.0' },
          { key: 'icon', title: 'GIcon 矢量图标', version: 'v1.1' },
          { key: 'fab', title: 'GFab 悬浮按钮 (2D拖拽/磁吸)', version: 'v1.2' }
        ]
      },
      {
        title: 'Form 表单与录入',
        items: [
          { key: 'input', title: 'GInput 输入框 (密码显隐)', version: 'v1.2' },
          { key: 'textarea', title: 'GTextarea 文本域', version: 'v1.0' },
          { key: 'input-number', title: 'GInputNumber 数字输入 (极值禁用)', version: 'v1.2' },
          { key: 'stepper', title: 'GStepper 步进器 (极值禁用)', version: 'v1.2' },
          { key: 'switch', title: 'GSwitch 开关', version: 'v1.0' },
          { key: 'checkbox', title: 'GCheckbox 多选框', version: 'v1.0' },
          { key: 'radio', title: 'GRadio 单选框', version: 'v1.0' },
          { key: 'select', title: 'GSelect 下拉选择', version: 'v1.0' },
          { key: 'picker', title: 'GPicker 选择器', version: 'v1.0' },
          { key: 'slider', title: 'GSlider 滑块', version: 'v1.0' },
          { key: 'form', title: 'GForm 表单布局', version: 'v1.0' }
        ]
      },
      {
        title: 'Feedback 反馈与交互',
        items: [
          { key: 'haptic', title: '📳 GHaptic 触觉反馈', version: 'v1.4' },
          { key: 'ai-dialogue', title: '🤖 GAIDialogueTree AI 对话树', version: 'v1.5' },
          { key: 'dialog', title: 'GDialog / GModal 弹窗', version: 'v1.0' },
          { key: 'dialogue', title: 'GDialogue 剧情对话系统', version: 'v1.0' },
          { key: 'chat', title: 'GChat 微信/气泡对话流', version: 'v1.0' },
          { key: 'popup', title: 'GPopup 弹出层', version: 'v1.0' },
          { key: 'overlay', title: 'GOverlay 遮罩层', version: 'v1.0' },
          { key: 'action-sheet', title: 'GActionSheet 动作面板', version: 'v1.0' },
          { key: 'popover', title: 'GPopover 气泡框', version: 'v1.0' },
          { key: 'notice-bar', title: 'GNoticeBar 通知栏', version: 'v1.0' },
          { key: 'message', title: 'GMessage 全局提示', version: 'v1.0' },
          { key: 'toast', title: 'GToast 轻提示', version: 'v1.0' },
          { key: 'alert', title: 'GAlert 警告提示', version: 'v1.0' },
          { key: 'drawer', title: 'GDrawer 抽屉', version: 'v1.0' },
          { key: 'tooltip', title: 'GTooltip 悬浮提示', version: 'v1.0' },
          { key: 'loading', title: 'GLoading 加载指示器', version: 'v1.0' },
          { key: 'skeleton', title: 'GSkeleton 骨架屏', version: 'v1.0' },
          { key: 'tour', title: 'GTour 漫游式引导', version: 'v1.0' }
        ]
      },
      {
        title: 'Data Display 数据展示',
        items: [
          { key: 'table', title: '📊 GTable & TableV2 表格', version: 'v1.4' },
          { key: 'particle-studio', title: '✨ GParticleStudio 粒子工坊', version: 'v1.5' },
          { key: 'skeleton-particle', title: '🦴 GSkeletonParticle 骨骼粒子绑定', version: 'v1.6' },
          { key: 'shader-studio', title: '🔮 GShaderStudio 着色器工坊', version: 'v1.6' },
          { key: 'virtual-list', title: '⚡ GVirtualList 虚拟长列表', version: 'v1.3' },
          { key: 'i18n', title: '🌐 GI18n 国际化引擎', version: 'v1.3' },
          { key: 'tabs', title: 'GTabs 标签页 (吸顶/动画/拖拽)', version: 'v1.2' },
          { key: 'collapse', title: 'GCollapse 折叠面板 (手势/曲线)', version: 'v1.3' },
          { key: 'steps', title: 'GSteps 步骤条', version: 'v1.0' },
          { key: 'card', title: 'GCard 卡片', version: 'v1.0' },
          { key: 'tag', title: 'GTag 标签', version: 'v1.0' },
          { key: 'badge', title: 'GBadge 徽标', version: 'v1.0' },
          { key: 'avatar', title: 'GAvatar 头像', version: 'v1.0' },
          { key: 'progress', title: 'GProgress 进度条', version: 'v1.0' },
          { key: 'space', title: 'GSpace 间距布局', version: 'v1.0' }
        ]
      },
      {
        title: 'Godot 3D & 核心全局 (3D Space & Engine Core)',
        items: [
          { key: 'hud3d', title: '🎮 GHud3D 3D空间HUD投影', version: 'v1.4' },
          { key: 'godot-globals', title: '🌐 Godot 全局方法 & Node 核心 API', version: 'v1.0' },
          { key: 'godot-docs', title: '📖 Godot 4 官方文档与资源传送门', version: 'v1.0' }
        ]
      }
    ],
    defaultKey: 'button'
  },
  'godot-globals': {
    placeholder: 'Search Godot globals & base APIs...',
    groups: [
      {
        title: 'Godot 全局与核心方法 (Engine Globals)',
        items: [
          { key: 'godot-globals', title: '🌐 Godot 全局方法 & Node 核心 API' },
          { key: 'guide-common-methods', title: '🛠️ 全局通用基类方法与事件' },
          { key: 'godot-docs', title: '📖 Godot 4 官方文档与资源传送门' }
        ]
      }
    ],
    defaultKey: 'godot-globals'
  },
  'networking': {
    placeholder: 'Search networking & physics...',
    groups: [
      {
        title: '游戏网络与物理系统 (Networking & Physics)',
        items: [
          { key: 'net-sync', title: '⚡ MultiplayerSynchronizer 多人网络同步' },
          { key: 'net-rpc', title: '📡 RPC 远程过程调用架构' },
          { key: 'physics-2d-rigidbody', title: '🎯 RigidBody2D 刚体物理与碰撞反馈' },
          { key: 'physics-raycast', title: '📐 RayCast2D 射线检测与视线遮挡' }
        ]
      }
    ],
    defaultKey: 'net-sync'
  },
  'slots': {
    placeholder: 'Search slots & proxy...',
    groups: [
      {
        title: 'Vue 风格插槽系统 (Slots Architecture)',
        items: [
          { key: 'slot-concept', title: '💡 插槽核心设计理念' },
          { key: 'slot-default', title: '📦 默认插槽 (Default Slot)' },
          { key: 'slot-named', title: '🏷️ 具名插槽 (Named Slots)' },
          { key: 'slot-scoped', title: '🧬 作用域插槽 (Scoped Slot 数据透传)' },
          { key: 'slot-engine-impl', title: '⚙️ GSlotProxy 底层实现与引擎原理' }
        ]
      }
    ],
    defaultKey: 'slot-concept'
  },
  'icons-gallery': {
    placeholder: 'Search 600+ icons...',
    groups: [
      {
        title: '26,000+ 全场景矢量图库超级中心',
        items: [
          { key: 'icon', title: '🎨 🎨 🎨 26,000+ 矢量图标超级中心 (全图库检索与复制代码) (全图库检索与复制代码) (全图库检索与复制代码)' }
        ]
      }
    ],
    defaultKey: 'icon'
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
      const v = item.version || (item.title && item.title.match(/v\d+\.\d+/)?.[0]) || 'v1.0';
      let vColor = '#909399';
      let vBg = 'rgba(144,147,153,0.15)';
      
      if (v.includes('1.5')) {
        vColor = '#a855f7';
        vBg = 'rgba(168,85,247,0.18)';
      } else if (v.includes('1.4')) {
        vColor = '#3b82f6';
        vBg = 'rgba(59,130,246,0.18)';
      } else if (v.includes('1.3')) {
        vColor = '#e6a23c';
        vBg = 'rgba(230,162,60,0.18)';
      } else if (v.includes('1.2')) {
        vColor = '#18a058';
        vBg = 'rgba(24,160,88,0.18)';
      } else if (v.includes('1.1')) {
        vColor = '#10b981';
        vBg = 'rgba(16,185,129,0.15)';
      }

      // Clean item display title if it had manual (vX.X) in text
      const cleanTitle = item.title.replace(/\s*\(v\d+\.\d+\)/g, '').replace(/^[\d\.\s]+/, '');

      const vBadge = `<span class="nav-v-badge" style="font-size:10px; font-weight:700; color:${vColor}; background:${vBg}; padding:1px 5px; border-radius:4px; margin-left:auto; font-family:var(--font-mono); line-height:1.2; flex-shrink:0;">${v}</span>`;
      
      html += `<div class="nav-item ${isActive}" data-key="${item.key}" onclick="showDoc('${item.key}')" style="display:flex; align-items:center; justify-content:space-between; gap:6px;"><span>${cleanTitle}</span>${vBadge}</div>`;
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
