// =========================================================================
// Gotod Components UI - Changelog & Release Updates (Using Steps Component)
// 排序逻辑：未来规划在最前 -> 最新现行版本 (v1.6.0) -> 历史版本往后排列
// =========================================================================

window.CHANGELOG_DATA = [
  {
    version: "v1.7.0 (规划中)",
    date: "2026-10-15 预计",
    status: "wait", // wait, process, finish
    icon: "fa-compass",
    title: "v1.7.0 未来版本规划 (Roadmap)",
    summary: "计划推出 3D 骨骼逆向动力学 IK 交互约束器、WebRTC 多人近距离空间语音广播与全局热力图遥测中心。",
    highlights: [
      {
        tag: "3D IK 动力学约束",
        type: "info",
        desc: "支持 3D 角色手臂/头部程序化注视追踪目标、脚底地形自适应贴合逆运动学算法。"
      },
      {
        tag: "WebRTC 空间音频",
        type: "info",
        desc: "游戏内近距离 3D 空间衰减语音聊天网关与实时音频波形可视化分析器。"
      }
    ]
  },
  {
    version: "v1.6.0",
    date: "2026-08-31",
    status: "process",
    icon: "fa-cubes-stacked",
    title: "v1.6.0 骨骼粒子绑定与 GPU Shader 工坊重磅发布 (今日最新版)",
    summary: "正式推出 GSkeletonParticleBinder 骨骼动画粒子挂点绑定器，以及 GShaderStudio GPU 实时着色器工坊与动态毛玻璃背景模糊滤镜。",
    highlights: [
      {
        tag: "骨骼粒子挂点绑定 (GSkeletonParticleBinder)",
        type: "success",
        desc: "支持将 <code>GParticleStudio</code> 粒子发射器动态锚定至 2D/3D 骨骼关节（如 Spine, DragonBones, Godot 2D Skeleton）。实现<b>武器挥砍刀光流光、法杖聚气、角色足底跑动灰尘</b>等关节坐标与旋转角的高性能自动同步。"
      },
      {
        tag: "GPU 着色器工坊 (GShaderStudio)",
        type: "primary",
        desc: "可视化调节<b>消融溶解 (Dissolve)、彩虹全息流光 (Hologram)、全息扫描线 (Scanlines)、毛玻璃背景模糊 (Frosted Glass)</b>，一键导出 Godot 4 官方标准 <code>shader_type canvas_item;</code> 源代码与材质配置。"
      }
    ]
  },
  {
    version: "v1.5.0",
    date: "2026-08-31",
    status: "finish",
    icon: "fa-wand-magic-sparkles",
    title: "v1.5.0 UI 粒子工坊与 AI 智能对话树发布",
    summary: "推出 GParticleStudio UI 粒子特效工坊与 Godot 4 GPUParticles2D 配置导出器，以及 GAIDialogueTree 大模型/行为树智能多分支剧本推理引擎。",
    highlights: [
      {
        tag: "UI 粒子工坊",
        type: "success",
        desc: "可视化调节金币爆发、抽卡流光、魔法爆炸粒子发射器，物理加速度实时模拟，一键导出 Godot 4 GPUParticles2D 配置。"
      },
      {
        tag: "AI 智能对话树",
        type: "primary",
        desc: "无缝对接大语言模型与本地行为树，支持 NPC 情绪状态机与智能多分支剧情推理。"
      }
    ]
  },
  {
    version: "v1.4.0",
    date: "2026-08-31",
    status: "finish",
    icon: "fa-table-cells",
    title: "v1.4.0 表格体系、3D 空间 HUD 与触觉引擎发布",
    summary: "推出 Element Plus 规范 GTable 与十万级 TableV2 虚拟化表格、GHud3D 3D空间透视投影组件，以及 GHaptic 移动端跨平台触感振动反馈引擎。",
    highlights: [
      {
        tag: "GTable & TableV2 表格",
        type: "success",
        desc: "全面参考 Element Plus 规范，支持斑马纹、边框、多选/单选、列排序、Scoped Slot 与 100,000+ 行 TableV2 虚拟化极速渲染。"
      },
      {
        tag: "GHud3D 空间投影",
        type: "primary",
        desc: "支持 2D UI 控件一键透视映射至 3D 游戏世界坐标系，自动 Billboard 朝向摄像机，提供头顶血条与暴击伤害飘字。"
      }
    ]
  },
  {
    version: "v1.3.0",
    date: "2026-08-31",
    status: "finish",
    icon: "fa-bolt-lightning",
    title: "v1.3.0 性能与国际化重磅发布",
    summary: "推出百万级数据 GVirtualList 虚拟列表、GI18n 全场景多语言动态热切换引擎，以及 GCollapse 触控手势滑动展开与弹簧过渡曲线。",
    highlights: [
      {
        tag: "GVirtualList 虚拟长列表",
        type: "success",
        desc: "支持 1,000,000+ 百万级数据超高性能平滑渲染，GPU 节点自动切片回收，内存零激增。"
      },
      {
        tag: "GI18n 国际化引擎",
        type: "primary",
        desc: "无缝对接 Godot 4 国际化 Translation 词条系统，支持多语言全 UI 节点动态热切换与参数插值。"
      }
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-08-31",
    status: "finish",
    icon: "fa-rocket",
    title: "v1.2.0 全交互与单文件架构升级",
    summary: "Tabs 滚动吸顶与全交互重构、FAB 二维自由拖拽与磁吸、数字输入范围极值拦截、密码显隐切换与 42 组件单文件解耦架构。",
    highlights: [
      {
        tag: "Tabs 标签页",
        type: "success",
        desc: "新增滚动吸顶固定、内容过渡动画、异步懒加载、before-leave 切换拦截钩子、双击重命名与拖拽排序。"
      }
    ]
  },
  {
    version: "v1.1.0",
    date: "2026-08-25",
    status: "finish",
    icon: "fa-cubes",
    title: "v1.1.0 架构重构与矢量图标中心",
    summary: "模块化解耦重构、引入 26,000+ 矢量图标超级中心与 FontAwesome 6 官方 WebFont 矢量字形渲染体系。",
    highlights: [
      {
        tag: "Icon 图标中心",
        type: "primary",
        desc: "整合 26,000+ 通用矢量图标库，支持实时关键词检索、分类筛选与一键复制代码。"
      }
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-08-10",
    status: "finish",
    icon: "fa-star",
    title: "v1.0.0 正式版首发上线",
    summary: "发布全套 42 个 Modern Vue-Style UI 组件库，全面支持 Godot 4.x 渲染管线。",
    highlights: [
      {
        tag: "核心组件",
        type: "primary",
        desc: "GButton, GInput, GSelect, GDialog, GChat, GTabs, GProgress, GCard 等 42+ 核心控件首发。"
      }
    ]
  }
];

window.currentStepIndex = 1; // Default highlight v1.6.0 (index 1)

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
            基于 <b>GSteps (步骤条组件)</b> 构建：未来规划在前 ➔ 最新版本 (v1.6.0) 居中 ➔ 历史版本在后。
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
            <i class="fa-solid fa-bolt" style="color:var(--warning);"></i> 聚焦现行最新版 (v1.6.0)
          </button>
        </div>
      </div>
    </div>
  `;

  // Horizontal Steps Bar
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

  // Vertical Detailed Steps Timeline
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
  'changelog-roadmap': { title: "v1.7.0 未来版本规划 (Roadmap)", desc: "未来特性规划。", demos: [] },
  'changelog-latest': { title: "v1.6.0 最新发布 (Steps 步骤条展示)", desc: "使用 GSteps 步骤条组件展示的更新日志。", demos: [] },
  'changelog-history': { title: "历史版本历程 (v1.5 ~ v1.0)", desc: "历史版本时间线。", demos: [] }
};
