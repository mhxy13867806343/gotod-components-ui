// =========================================================================
// Gotod Components UI - Component: slider
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['slider'] = {
  "title": "Slider 滑块 (GSlider)",
  "desc": "通过拖动滑块在一个固定区间内进行数值的选择。",
  "demos": [
    {
      "title": "1. 基础滑块 (Basic Slider: 0 ~ 100)",
      "render": "<div style=\"max-width:360px; display:flex; align-items:center; gap:12px;\"><input type=\"range\" min=\"0\" max=\"100\" value=\"60\" style=\"flex:1; accent-color:var(--primary);\"><span style=\"font-size:12px; font-weight:600; width:30px;\">60%</span></div>",
      "code": "# GDScript: 基础滑块\nvar slider = GSlider.new()\nslider.value = 60.0\nadd_child(slider)"
    },
    {
      "title": "2. 离散步长与刻度标记 (Discrete Step & Marks)",
      "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:6px;\"><input type=\"range\" min=\"0\" max=\"100\" step=\"25\" value=\"50\" style=\"width:100%; accent-color:var(--primary);\"><div style=\"display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);\"><span>低 (0)</span><span>中 (25)</span><span>高 (50)</span><span>极高 (75)</span><span>超清 (100)</span></div></div>",
      "code": "# GDScript: 刻度标记\nslider.step = 25.0\nslider.marks = { 0:\"低\", 50:\"高\", 100:\"超清\" }"
    },
    {
      "title": "3. 双滑块范围选择 (Range Slider: [min, max])",
      "render": "<div style=\"max-width:360px; font-size:12px;\"><div style=\"display:flex; justify-content:space-between; margin-bottom:4px; color:var(--text-secondary);\"><span>装备等级筛选区间:</span><strong style=\"color:var(--primary);\">Lv.20 ~ Lv.80</strong></div><input type=\"range\" min=\"0\" max=\"100\" value=\"50\" style=\"width:100%; accent-color:var(--primary);\"></div>",
      "code": "# GDScript: 双滑块范围\nslider.range = true\nslider.range_value = [20.0, 80.0]"
    },
    {
      "title": "4. 垂直滑块 (Vertical Slider)",
      "render": "<div style=\"display:flex; gap:20px; align-items:flex-end; height:90px; padding:10px 0;\"><input type=\"range\" min=\"0\" max=\"100\" value=\"80\" orient=\"vertical\" style=\"writing-mode: vertical-lr; direction: rtl; height:80px; accent-color:var(--success);\"><input type=\"range\" min=\"0\" max=\"100\" value=\"40\" orient=\"vertical\" style=\"writing-mode: vertical-lr; direction: rtl; height:80px; accent-color:var(--primary);\"><span style=\"font-size:12px; color:var(--text-secondary);\">垂直声道音量</span></div>",
      "code": "# GDScript: 垂直滑块\nslider.vertical = true"
    },
    {
      "title": "5. 游戏主音量与画面亮度控制 (Game Audio & Brightness Slider)",
      "render": "<div style=\"max-width:360px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; justify-content:space-between; font-size:12px;\"><span>🔊 主音量 (Master Volume)</span><strong>85%</strong></div><input type=\"range\" min=\"0\" max=\"100\" value=\"85\" style=\"width:100%; accent-color:var(--primary);\"></div>",
      "code": "# GDScript: 游戏音量滑块\nvar audio_slider = GSlider.new_volume_slider(\"Master\")"
    }
  ],
  "props": [
    {
      "name": "value / v-model",
      "type": "float",
      "default": "0.0",
      "desc": "当前滑块数值"
    },
    {
      "name": "min_value / min",
      "type": "float",
      "default": "0.0",
      "desc": "最小值"
    },
    {
      "name": "max_value / max",
      "type": "float",
      "default": "100.0",
      "desc": "最大值"
    },
    {
      "name": "step",
      "type": "float",
      "default": "1.0",
      "desc": "步长"
    },
    {
      "name": "status",
      "type": "enum",
      "default": "PRIMARY",
      "desc": "状态色彩"
    }
  ],
  "events": [
    {
      "name": "value_changed(new_value)",
      "desc": "滑块值改变时触发",
      "params": "(new_value: float)"
    }
  ],
  "methods": [
    {
      "name": "set_value(v: float)",
      "desc": "程序化设置滑块值",
      "params": "(v: float) -> void"
    }
  ],
  "slots": [
    {
      "name": "thumb",
      "desc": "自定义滑块抓手把手插槽",
      "child": "Control / GIcon / TextureRect",
      "example": "<template #thumb><GIcon name=\"volume-high\" /></template>"
    },
    {
      "name": "mark",
      "desc": "自定义刻度标记渲染插槽（透传 { value, label }）",
      "child": "Control / GText",
      "example": "<template #mark=\"{ value }\"><span>{{ value }}%</span></template>"
    }
  ]
};
