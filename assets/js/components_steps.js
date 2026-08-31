// =========================================================================
// Gotod Components UI - Component: steps
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['steps'] = {
  "title": "Steps 步骤条 (GSteps)",
  "desc": "引导用户按照流程完成任务的分步导航条。支持点击下一步/上一步动态驱动连线与状态点亮。",
  "demos": [
    {
      "title": "1. 基础横向步骤条 (Basic Horizontal Steps)",
      "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">1</span><span>创建角色</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">2</span><span>分配属性</span></div><div style=\"flex:1; height:2px; background:var(--border-base); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--text-secondary);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:flex; align-items:center; justify-content:center;\">3</span><span>进入世界</span></div></div>",
      "code": "# GDScript: 基础步骤条\nvar steps = GSteps.new()\nsteps.active = 1\nsteps.add_step(\"创建角色\")\nsteps.add_step(\"分配属性\")"
    },
    {
      "title": "2. 含错误状态步骤条 (Error Step Status)",
      "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-check\"></i></span><span>实名认证</span></div><div style=\"flex:1; height:2px; background:var(--danger); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--danger);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--danger); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-xmark\"></i></span><span>充值失败</span></div></div>",
      "code": "# GDScript: 错误状态\nsteps.set_step_status(1, GSteps.Status.ERROR)"
    },
    {
      "title": "3. 垂直步骤条 (Vertical Steps)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:300px; font-size:12px;\"><div style=\"display:flex; gap:12px;\"><span style=\"width:22px; height:22px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\"><i class=\"fa-solid fa-check\"></i></span><div><div style=\"font-weight:600; color:var(--text-primary);\">第 1 章：新手营地</div><div style=\"color:var(--text-secondary); font-size:11px;\">已通过考核</div></div></div></div>",
      "code": "# GDScript: 垂直步骤\nsteps.direction = GSteps.Direction.VERTICAL"
    },
    {
      "title": "4. 点状极简步骤条 (Dot Steps)",
      "render": "<div style=\"display:flex; align-items:center; gap:8px; max-width:300px;\"><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--primary);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--border-base);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--border-base);\"></span></div>",
      "code": "# GDScript: 点状步骤\nsteps.is_dot = true"
    },
    {
      "title": "5. 自定义图标步骤条 (Custom Icon Steps)",
      "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:360px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><i class=\"fa-solid fa-user-shield\" style=\"font-size:18px;\"></i><span>创建档案</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary);\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"font-size:18px;\"></i><span>选择专精</span></div></div>",
      "code": "# GDScript: 图标步骤\nsteps.set_step_icon(0, \"user-shield\")"
    },
    {
      "title": "6. 游戏剧情章节通关进度树 (Game Story Quest Steps)",
      "render": "<div style=\"max-width:440px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"font-weight:700; font-size:13px; margin-bottom:10px; color:#ffd04b;\">👑 王国救赎主线流程</div><div style=\"display:flex; justify-content:space-between; font-size:11px;\"><span style=\"color:var(--success);\">① 召集勇者 ✅</span><span style=\"color:var(--success);\">② 锻造圣剑 ✅</span><span style=\"color:var(--primary); font-weight:700;\">③ 讨伐恶龙 ⚔️</span><span style=\"color:var(--text-secondary);\">④ 加冕登基</span></div></div>",
      "code": "# GDScript: 游戏剧情步骤\nvar quest_steps = GSteps.new_story_flow(chapter_data)"
    }
  ],
  "props": [
    {
      "name": "steps",
      "type": "Array[String]",
      "default": "[]",
      "desc": "步骤名称列表",
      "version": "v1.0"
    },
    {
      "name": "current_step / active",
      "type": "int",
      "default": "0",
      "desc": "当前激活步骤索引 (从 0 开始)",
      "version": "v1.0"
    },
    {
      "name": "direction",
      "type": "enum",
      "default": "HORIZONTAL",
      "desc": "显示方向：HORIZONTAL, VERTICAL",
      "version": "v1.0"
    },
    {
      "name": "finish_status",
      "type": "enum",
      "default": "SUCCESS",
      "desc": "已完成步骤的状态类型",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "step_changed(current_step)",
      "desc": "当前步骤改变时触发",
      "params": "(current_step: int)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "add_step(title: String)",
      "desc": "动态追加单个步骤",
      "params": "(title: String) -> void",
      "version": "v1.0"
    },
    {
      "name": "add_steps(step_list: Array)",
      "desc": "批量设置/追加步骤列表 [\"步骤1\", \"步骤2\"]",
      "params": "(step_list: Array) -> void",
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
      "desc": "返回上一步",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "set_step(index: int)",
      "desc": "直接跳转到指定步骤",
      "params": "(index: int) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "icon",
      "desc": "自定义步骤节点图标插槽（透传 { index, status }）",
      "child": "GIcon / TextureRect",
      "example": "<template #icon=\"{ index }\"><GIcon name=\"circle-check\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "title",
      "desc": "自定义步骤标题插槽（透传 { index, title }）",
      "child": "GText / Label",
      "example": "<template #title=\"{ index, title }\"><span>步骤 {{ index + 1 }}: {{ title }}</span></template>",
      "version": "v1.0"
    },
    {
      "name": "description",
      "desc": "自定义步骤详细描述插槽（透传 { index, desc }）",
      "child": "Label / Control",
      "example": "<template #description=\"{ desc }\"><small>{{ desc }}</small></template>",
      "version": "v1.0"
    }
  ]
};
