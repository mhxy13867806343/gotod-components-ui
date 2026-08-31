// =========================================================================
// Gotod Components UI - Changelog & Release Updates (Using Steps Component)
// 排序逻辑：未来规划在最前 -> 最新现行版本 -> 历史版本往后排列
// =========================================================================

window.CHANGELOG_DATA = [
  {
    version: "v1.3.0 (规划中)",
    date: "2026-09-15 预计",
    status: "wait", // wait, process, finish
    icon: "fa-compass",
    title: "v1.3.0 未来版本规划 (Roadmap)",
    summary: "计划引入虚拟滚动长列表 (Virtual List)、移动端手势折叠手风琴增强及游戏多语言 i18n 实时热切换引擎。",
    highlights: [
      {
        tag: "Virtual List 虚拟列表",
        type: "info",
        desc: "支持百万级数据超高性能虚拟长列表平滑渲染，GPU 节点自动回收，内存零激增。"
      },
      {
        tag: "i18n 国际化引擎",
        type: "info",
        desc: "无缝对接 Godot 4 国际化 Translation 词条系统，支持全场景多语言动态热切换。"
      },
      {
        tag: "Collapse 手风琴手势",
        type: "info",
        desc: "增强移动端触控滑动展开与自定义折叠过渡曲线。"
      }
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-08-31",
    status: "process",
    icon: "fa-rocket",
    title: "v1.2.0 重磅功能发布 (今日全量升级)",
    summary: "Tabs 滚动吸顶与全交互重构、FAB 二维自由拖拽与磁吸、数字输入范围极值拦截、密码显隐切换与 42 组件单文件解耦架构。",
    highlights: [
      {
        tag: "Tabs 标签页",
        type: "success",
        desc: "新增 <b>滚动吸顶固定 (sticky + offset_top)</b>、<b>内容过渡动画 (Fade/Slide/Zoom)</b>、<b>异步懒加载 (Async Loading)</b>、<b>before-leave 切换拦截钩子</b>、<b>双击重命名/增删</b> 与 <b>HTML5 自由拖拽排序</b>。"
      },
      {
        tag: "FAB 悬浮按钮",
        type: "primary",
        desc: "全面重构二维（XY 轴）自由拖拽放置算法、实时坐标追踪徽标 <code>(X, Y)</code>、松手可选自动磁性贴边及横向扩展菜单。"
      },
      {
        tag: "InputNumber & Stepper",
        type: "warning",
        desc: "达到 <code>min_value</code> 或 <code>max_value</code> 极值时，对应的加减步进按钮自动进入 <code>disabled</code> 变灰禁用状态，防止非法越界。"
      },
      {
        tag: "Input 输入框",
        type: "primary",
        desc: "修复全局 FontAwesome 遮罩冲突方块问题，引入官方 FontAwesome 6 WebFont，密码框支持点击眼睛图标（<code>fa-eye</code> / <code>fa-eye-slash</code>）实时切换明暗文。"
      },
      {
        tag: "组件单文件架构",
        type: "info",
        desc: "将原本 4500+ 行庞大文件彻底拆分为 42 个独立轻量组件文件（<code>components_<name>.js</code>），所有今日增强属性方法全量标注 <code>v1.2</code> 绿色胶囊版本徽标。"
      }
    ]
  },
  {
    version: "v1.1.0",
    date: "2026-08-25",
    status: "finish",
    icon: "fa-cubes",
    title: "v1.1.0 架构重构与性能升级",
    summary: "模块化解耦重构、引入 26,000+ 矢量图标超级中心与 FontAwesome 6 官方 WebFont 矢量字形渲染体系。",
    highlights: [
      {
        tag: "Icon 图标中心",
        type: "primary",
        desc: "整合 26,000+ 通用矢量图标库，支持实时关键词检索、分类筛选与一键复制 GDScript 代码。"
      },
      {
        tag: "Slots 插槽体系",
        type: "success",
        desc: "统一全量组件 Vue 风格插槽定义（<code>#default</code>、<code>#prefix</code>、<code>#suffix</code>、<code>#header</code>、<code>#footer</code>）。"
      }
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-08-10",
    status: "finish",
    icon: "fa-star",
    title: "v1.0.0 正式版首发上线",
    summary: "发布全套 42 个 Modern Vue-Style UI 组件库（Button, Input, Select, Dialog, Chat, Tabs, Table 等），全面支持 Godot 4.x 渲染管线。",
    highlights: [
      {
        tag: "基础组件",
        type: "primary",
        desc: "GButton, GText, GContainer, GDivider, GIcon, GCard, GTag, GBadge, GAvatar, GProgress。"
      },
      {
        tag: "表单与数据录入",
        type: "warning",
        desc: "GInput, GTextarea, GInputNumber, GStepper, GSwitch, GCheckbox, GRadio, GSelect, GPicker, GSlider, GForm。"
      },
      {
        tag: "反馈与弹窗系统",
        type: "danger",
        desc: "GDialog, GDialogue, GChat, GPopup, GOverlay, GActionSheet, GPopover, GNoticeBar, GMessage, GToast, GAlert, GDrawer, GTooltip, GLoading, GSkeleton, GTour。"
      }
    ]
  }
];

window.currentStepIndex = 1; // Default highlight v1.2.0 (index 1)

window.renderChangelogPage = function(subKey = 'changelog-latest') {
  const container = document.getElementById('mainContent');
  if (!container) return;

  if (subKey === 'changelog-roadmap') {
    window.currentStepIndex = 0;
  } else if (subKey === 'changelog-latest') {
    window.currentStepIndex = 1;
  } else if (subKey === 'changelog-history') {
    window.currentStepIndex = 2;
  }

  const stepsCount = window.CHANGELOG_DATA.length;

  let stepsHeaderHtml = `
    <div style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; margin:0 0 6px; display:flex; align-items:center; gap:10px;">
            <i class="fa-solid fa-clock-rotate-left" style="color:var(--primary);"></i>
            版本更新日志与发布历程 (Changelog)
          </h1>
          <p style="font-size:13px; color:var(--text-secondary); margin:0;">
            基于 <b>GSteps (步骤条组件)</b> 构建：未来规划在前 ➔ 最新版本居中 ➔ 历史版本在后。
          </p>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button class="g-btn g-btn-default" style="font-size:12px; padding:4px 12px;" onclick="window.prevChangelogStep()">
            <i class="fa-solid fa-arrow-left"></i> 前一版本
          </button>
          <button class="g-btn g-btn-primary" style="font-size:12px; padding:4px 12px;" onclick="window.nextChangelogStep()">
            后一版本 <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="g-btn g-btn-default" style="font-size:12px; padding:4px 12px;" onclick="window.setChangelogStep(1)">
            <i class="fa-solid fa-bolt" style="color:var(--warning);"></i> 聚焦现行最新版 (v1.2.0)
          </button>
        </div>
      </div>
    </div>
  `;

  // Horizontal Steps Bar (Roadmap -> Latest -> History)
  let horizontalStepsHtml = `
    <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:10px; padding:18px 24px; margin-bottom:24px; box-shadow:0 2px 10px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; position:relative;">
        <div style="position:absolute; top:20px; left:40px; right:40px; height:3px; background:var(--border-base); z-index:1;"></div>
        <div id="stepProgressLine" style="position:absolute; top:20px; left:40px; width:${(window.currentStepIndex / (stepsCount - 1)) * 100}%; height:3px; background:var(--primary); z-index:2; transition:width 0.35s ease;"></div>
        ${window.CHANGELOG_DATA.map((item, idx) => {
          const isActive = idx === window.currentStepIndex;
          let nodeBg = 'var(--bg-card)';
          let nodeBorder = 'var(--border-base)';
          let nodeColor = 'var(--text-secondary)';

          if (item.status === 'process') {
            nodeBg = isActive ? 'var(--primary)' : 'rgba(24,160,88,0.2)';
            nodeBorder = 'var(--primary)';
            nodeColor = isActive ? '#ffffff' : 'var(--primary)';
          } else if (item.status === 'wait') {
            nodeBg = isActive ? '#e6a23c' : 'rgba(230,162,60,0.15)';
            nodeBorder = '#e6a23c';
            nodeColor = isActive ? '#ffffff' : '#e6a23c';
          } else {
            nodeBg = isActive ? 'var(--primary)' : 'var(--bg-card)';
            nodeBorder = isActive ? 'var(--primary)' : 'var(--border-base)';
            nodeColor = isActive ? '#ffffff' : 'var(--text-secondary)';
          }

          return `
            <div style="display:flex; flex-direction:column; align-items:center; position:relative; z-index:3; cursor:pointer;" onclick="window.setChangelogStep(${idx})">
              <div style="width:40px; height:40px; border-radius:50%; background:${nodeBg}; border:2px solid ${nodeBorder}; color:${nodeColor}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; transition:all 0.3s; box-shadow:${isActive ? '0 0 0 5px rgba(24,160,88,0.25)' : 'none'};">
                <i class="fa-solid ${item.icon}"></i>
              </div>
              <div style="font-weight:${isActive ? '700' : '500'}; font-size:12px; margin-top:8px; color:${isActive ? 'var(--primary)' : 'var(--text-primary)'};">${item.version}</div>
              <div style="font-size:10px; color:var(--text-secondary);">${item.date}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Vertical Detailed Steps Timeline (From Top: Future -> Latest -> History)
  let verticalStepsHtml = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      ${window.CHANGELOG_DATA.map((item, idx) => {
        const isCur = idx === window.currentStepIndex;
        let badgeColor = item.status === 'process' ? 'var(--primary)' : (item.status === 'wait' ? '#e6a23c' : 'var(--text-secondary)');
        let badgeText = item.status === 'process' ? 'Latest 现行最新版' : (item.status === 'wait' ? 'Roadmap 规划中' : 'Released 已发布');
        
        return `
          <div id="stepCard_${idx}" class="demo-card" style="border-left:5px solid ${badgeColor}; background:var(--bg-surface); padding:20px; border-radius:8px; transition:all 0.3s; box-shadow:${isCur ? '0 4px 18px rgba(0,0,0,0.12)' : 'none'}; ${isCur ? 'outline: 2px solid ' + badgeColor + ';' : ''}">
            <!-- Step Card Header -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="g-tag" style="font-size:13px; padding:3px 10px; font-weight:800; border-radius:6px; background:${badgeColor}; color:#fff;">
                  ${item.version}
                </span>
                <h3 style="margin:0; font-size:1.15rem; font-weight:700;">${item.title}</h3>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="g-tag g-tag-default" style="font-size:11px; padding:2px 8px;">
                  <i class="fa-regular fa-calendar"></i> ${item.date}
                </span>
                <span style="font-size:11px; font-weight:700; color:${badgeColor};">${badgeText}</span>
              </div>
            </div>

            <!-- Step Card Summary -->
            <div style="font-size:13px; color:var(--text-regular); margin-bottom:14px; line-height:1.6; background:var(--bg-card); padding:10px 14px; border-radius:6px; border:1px solid var(--border-base);">
              💡 <b>版本概览</b>：${item.summary}
            </div>

            <!-- Highlights Checklist -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${item.highlights.map(h => `
                <div style="display:flex; align-items:flex-start; gap:8px; font-size:12.5px; line-height:1.6;">
                  <span class="g-tag g-tag-${h.type}" style="font-size:10.5px; padding:1px 6px; border-radius:4px; font-weight:700; white-space:nowrap; margin-top:2px;">
                    ${h.tag}
                  </span>
                  <div style="color:var(--text-regular); flex:1;">
                    ${h.desc}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = stepsHeaderHtml + horizontalStepsHtml + verticalStepsHtml;
};

window.setChangelogStep = function(idx) {
  if (idx < 0 || idx >= window.CHANGELOG_DATA.length) return;
  window.currentStepIndex = idx;
  window.renderChangelogPage();
  const targetCard = document.getElementById('stepCard_' + idx);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

window.prevChangelogStep = function() {
  if (window.currentStepIndex > 0) {
    window.setChangelogStep(window.currentStepIndex - 1);
  } else {
    if (window.showToast) window.showToast('已是最前方的未来规划版本！', 'info');
  }
};

window.nextChangelogStep = function() {
  if (window.currentStepIndex < window.CHANGELOG_DATA.length - 1) {
    window.setChangelogStep(window.currentStepIndex + 1);
  } else {
    if (window.showToast) window.showToast('已到达最早的历史版本！', 'info');
  }
};

window.CHANGELOG_CATALOG = {
  'changelog-roadmap': { title: "v1.3.0 未来版本规划 (Roadmap)", desc: "未来特性规划。", demos: [] },
  'changelog-latest': { title: "v1.2.0 最新发布 (Steps 步骤条展示)", desc: "使用 GSteps 步骤条组件展示的更新日志。", demos: [] },
  'changelog-history': { title: "历史版本历程 (v1.1 / v1.0)", desc: "历史版本时间线。", demos: [] }
};
