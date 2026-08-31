// =========================================================================
// Gotod Components UI - Component: progress
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['progress'] = {
  "title": "Progress 进度条 (GProgress)",
  "desc": "用于展示操作进度，告知用户当前状态和预期。支持线性条状与圆形环状。",
  "demos": [
    {
      "title": "1. 基础直线进度条 (Basic Line Progress)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--primary); width:70%; height:100%;\"></div></div><div style=\"display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary);\"><span>主线任务下载中</span><span>70%</span></div></div>",
      "code": "# GDScript: 基础进度条\nvar prog = GProgress.new()\nprog.percentage = 70.0\nadd_child(prog)"
    },
    {
      "title": "2. 百分比内显与粗细定制 (Text Inside & Stroke Width)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:20px; border-radius:10px; overflow:hidden; position:relative;\"><div style=\"background:var(--success); width:85%; height:100%; display:flex; align-items:center; justify-content:flex-end; padding-right:8px; color:#fff; font-size:11px; font-weight:600;\">85%</div></div></div>",
      "code": "# GDScript: 内显文字\nprog.text_inside = true\nprog.stroke_width = 20.0"
    },
    {
      "title": "3. 状态主题色与渐变配置 (Theme Status & Gradients)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--success); width:100%; height:100%;\"></div></div><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:linear-gradient(90deg, #3b82f6, #a855f7); width:90%; height:100%;\"></div></div></div>",
      "code": "# GDScript: 渐变色\nprog.gradient = Gradient.new()"
    },
    {
      "title": "4. 环形进度条 (Circle Progress)",
      "render": "<div style=\"display:flex; gap:28px; align-items:center;\"><div style=\"width:70px; height:70px; border-radius:50%; border:6px solid var(--bg-surface); border-top-color:var(--primary); border-right-color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--primary);\">60%</div></div>",
      "code": "# GDScript: 环形进度\nprog.type = GProgress.Type.CIRCLE"
    },
    {
      "title": "5. 仪表盘进度条 (Dashboard Progress)",
      "render": "<div style=\"display:flex; align-items:center; gap:20px;\"><div style=\"width:80px; height:45px; border:6px solid var(--bg-surface); border-bottom:none; border-top-left-radius:50px; border-top-right-radius:50px; border-top-color:var(--warning); display:flex; align-items:flex-end; justify-content:center; font-size:13px; font-weight:700; color:var(--warning);\">75%</div><span style=\"font-size:12px; color:var(--text-secondary);\">引擎负荷率</span></div>",
      "code": "# GDScript: 仪表盘\nprog.type = GProgress.Type.DASHBOARD"
    },
    {
      "title": "6. 游戏 RPG 复合状态条 (Game HP / MP / EXP Bars)",
      "render": "<div style=\"display:flex; flex-direction:column; gap:8px; max-width:360px; background:rgba(0,0,0,0.3); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#ef4444; font-weight:700;\">HP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#ef4444; width:82%; height:100%;\"></div></div><span style=\"font-size:11px; color:#ef4444;\">4,100 / 5,000</span></div><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#3b82f6; font-weight:700;\">MP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#3b82f6; width:45%; height:100%;\"></div></div><span style=\"font-size:11px; color:#3b82f6;\">900 / 2,000</span></div></div>",
      "code": "# GDScript: 游戏血条/蓝条\nvar hp_bar = GProgress.new_game_bar(\"HP\", 4100, 5000, Color(\"#ef4444\"))"
    }
  ],
  "props": [
    {
      "name": "percentage",
      "type": "float",
      "default": "0.0",
      "desc": "进度百分比 (0~100)",
      "version": "v1.0"
    },
    {
      "name": "type",
      "type": "enum",
      "default": "LINE",
      "desc": "类型：LINE (线性), CIRCLE (环形)",
      "version": "v1.0"
    },
    {
      "name": "status",
      "type": "enum",
      "default": "PRIMARY",
      "desc": "状态色彩",
      "version": "v1.0"
    },
    {
      "name": "stroke_width",
      "type": "float",
      "default": "6.0",
      "desc": "进度条线条粗细",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "set_percentage(val: float)",
      "desc": "平滑更新进度条数值",
      "params": "(val: float) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "自定义进度条内部/右侧进度文字渲染插槽（透传 { percentage }）",
      "child": "Label / GText",
      "example": "<template #default=\"{ percentage }\"><span>{{ percentage }}% 已下载</span></template>",
      "version": "v1.0"
    }
  ]
};
