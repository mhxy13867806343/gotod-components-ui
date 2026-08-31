// =========================================================================
// Gotod Components UI - Component: tour
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tour'] = {
  "title": "Tour 漫游式引导 (GTour)",
  "desc": "分步引导用户了解新功能或界面布局。深度对标 Element Plus Tour 规范，提供全屏镂空暗色遮罩、气泡指示卡片与分步上一步/下一步。",
  "demos": [
    {
      "title": "1. 基础多步骤漫游引导 (Basic Tour)",
      "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('开启新手漫游引导：第 1 步 · 认识装备背包', 'info')\">🎯 启动新手功能引导</button>",
      "code": "# GDScript: 新手引导\nvar tour = GTour.new()\ntour.add_step(bag_btn, \"点击这里打开背包\", \"装备背包\")\ntour.start()"
    },
    {
      "title": "2. 目标元素高亮挖孔遮罩 (Hole Punch Spotlight)",
      "render": "<div style=\"max-width:340px; background:rgba(0,0,0,0.5); padding:16px; border-radius:8px; color:#fff; font-size:12px; text-align:center;\"><div style=\"border:2px dashed #ffd04b; padding:8px; border-radius:6px; display:inline-block; margin-bottom:8px; background:rgba(255,208,75,0.2);\">⭐ 聚焦高亮目标按键 ⭐</div><div>全屏暗色遮罩自动挖孔聚焦高亮目标节点</div></div>",
      "code": "# GDScript: 挖孔高亮\ntour.spotlight_radius = 8.0"
    },
    {
      "title": "3. 步骤指示器与进度 (Step Indicators: 1/3)",
      "render": "<div style=\"max-width:300px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:12px; font-size:12px;\"><div style=\"font-weight:700; margin-bottom:4px;\">第一步：了解体力机制</div><div style=\"color:var(--text-secondary); margin-bottom:10px;\">每次进入副本将消耗 10 点体力。</div><div style=\"display:flex; justify-content:space-between; align-items:center;\"><span style=\"color:var(--primary); font-weight:600;\">1 / 3</span><button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"showToast('进入下一步', 'info')\">下一步</button></div></div>",
      "code": "# GDScript: 进度指示\ntour.show_indicators = true"
    },
    {
      "title": "4. 位置自适应气泡 (Placement Adaptive Bubble)",
      "render": "<div style=\"display:flex; gap:8px; font-size:12px;\"><span class=\"g-tag g-tag-primary\">自动检测边界</span><span class=\"g-tag g-tag-success\">防溢出屏幕</span></div>",
      "code": "# GDScript: 自动定位\ntour.adaptive_placement = true"
    },
    {
      "title": "5. 游戏新手教学战斗操作引导 (Game Battle Tutorial Tour)",
      "render": "<div style=\"max-width:360px; background:linear-gradient(135deg, #1e1b4b, #312e81); border:1px solid #ffd04b; border-radius:8px; padding:12px; color:#fff; font-size:12px;\"><div style=\"color:#ffd04b; font-weight:700; font-size:13px; margin-bottom:4px;\">⚔️ 新手导师·雷恩</div><div>\"蓄力满能量条后，点击右下角终极技能即可对全屏敌人造成巨额伤害！\"</div></div>",
      "code": "# GDScript: 战斗教学流\nvar battle_tour = GTour.new_battle_tutorial(hero_node)"
    }
  ],
  "props": [
    {
      "name": "steps",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "引导步骤数组 [{\"target\": NodePath, \"title\": \"\", \"description\": \"\", \"placement\": \"BOTTOM\"}]",
      "version": "v1.0"
    },
    {
      "name": "current_step",
      "type": "int",
      "default": "0",
      "desc": "当前激活步骤索引 (从 0 开始)",
      "version": "v1.0"
    },
    {
      "name": "mask",
      "type": "boolean",
      "default": "true",
      "desc": "是否显示全屏半透明遮罩层",
      "version": "v1.0"
    },
    {
      "name": "show_arrow",
      "type": "boolean",
      "default": "true",
      "desc": "是否展示气泡定位小箭头",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "step_change(current_step)",
      "desc": "步骤发生切换时触发",
      "params": "(current_step: int)",
      "version": "v1.0"
    },
    {
      "name": "finish()",
      "desc": "完成所有引导步骤时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "close()",
      "desc": "用户中途关闭引导时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "add_step(step_dict: Dictionary)",
      "desc": "动态追加单个漫游步骤",
      "params": "(step_dict: Dictionary) -> void",
      "version": "v1.0"
    },
    {
      "name": "add_steps(step_list: Array[Dictionary])",
      "desc": "批量追加一组漫游步骤",
      "params": "(step_list: Array[Dictionary]) -> void",
      "version": "v1.0"
    },
    {
      "name": "start()",
      "desc": "从第一步开始启动漫游引导",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "next()",
      "desc": "前进至下一步",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "prev()",
      "desc": "后退至上一步",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "close_tour()",
      "desc": "关闭并退出漫游引导",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "自定义引导气泡内容区插槽（透传 { step, current, total }）",
      "child": "Control / VBoxContainer",
      "example": "<template #default=\"{ step }\"><h4>{{ step.title }}</h4><p>{{ step.desc }}</p></template>",
      "version": "v1.0"
    },
    {
      "name": "indicators",
      "desc": "自定义步骤指示器圆点插槽（透传 { current, total }）",
      "child": "HBoxContainer",
      "example": "<template #indicators=\"{ current, total }\"><span>第 {{ current + 1 }} / {{ total }} 步</span></template>",
      "version": "v1.0"
    },
    {
      "name": "prev",
      "desc": "自定义上一步按钮插槽",
      "child": "GButton",
      "example": "<template #prev><GButton>上一步</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "next",
      "desc": "自定义下一步按钮插槽",
      "child": "GButton",
      "example": "<template #next><GButton type=\"primary\">下一步</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "finish",
      "desc": "自定义完成按钮插槽",
      "child": "GButton",
      "example": "<template #finish><GButton type=\"success\">开始冒险</GButton></template>",
      "version": "v1.0"
    }
  ]
};
