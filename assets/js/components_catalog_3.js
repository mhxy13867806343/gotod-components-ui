// =========================================================================
// Gotod Components UI - Component Catalog Part 3 / 6
// Group: picker, slider, form, dialog, dialogue, chat
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "picker": {
    "title": "Picker 选择器 (GPicker)",
    "desc": "提供多个选项供用户选择，支持单列选择和多列级联选择，常与弹出层配合使用。深度对标 Vant UI 移动端选择器规范。",
    "demos": [
      {
        "title": "1. 基础单列滚动拾取 (Basic Picker)",
        "render": "<div style=\"max-width:260px; height:90px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface); display:flex; flex-direction:column; justify-content:center; align-items:center; font-size:13px;\"><div style=\"color:var(--text-secondary); opacity:0.4; font-size:11px;\">破晓之剑</div><div style=\"color:var(--primary); font-weight:700; padding:4px 0; border-top:1px solid var(--border-base); border-bottom:1px solid var(--border-base); width:100%; text-align:center;\">圣辉破晓法杖 (当前选定)</div><div style=\"color:var(--text-secondary); opacity:0.4; font-size:11px;\">狂战巨斧</div></div>",
        "code": "# GDScript: 基础拾取器\nvar picker = GPicker.new()\npicker.columns = [[\"破晓之剑\", \"圣辉法杖\", \"狂战巨斧\"]]\nadd_child(picker)"
      },
      {
        "title": "2. 多列联动选择 (Multi-Column Cascading Picker)",
        "render": "<div style=\"max-width:320px; height:80px; border:1px solid var(--border-base); border-radius:8px; background:var(--bg-surface); display:grid; grid-template-columns:1fr 1fr; align-items:center; text-align:center; font-size:12px;\"><div style=\"border-right:1px solid var(--border-base); font-weight:600; color:var(--primary);\">艾泽拉斯大区</div><div style=\"font-weight:600; color:var(--primary);\">服务器 1 服</div></div>",
        "code": "# GDScript: 多列联动\npicker.columns = [zones, servers]"
      },
      {
        "title": "3. 底部弹出式拾取器 (Popup Action Sheet Picker)",
        "render": "<button class=\"g-btn g-btn-primary\" style=\"font-size:12px;\" onclick=\"showToast('弹出底部滚轮拾取面板', 'info')\">📅 打开出生日期拾取器</button>",
        "code": "# GDScript: 弹出式拾取器\npicker.show_as_popup()"
      },
      {
        "title": "4. 自定义选项展示插槽 (Custom Item Slot)",
        "render": "<div style=\"display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:8px 12px; border-radius:6px; max-width:240px; font-size:12px;\"><span>⚔️ 战士专精</span><span class=\"g-tag g-tag-success\" style=\"font-size:10px;\">推荐</span></div>",
        "code": "# GDScript: 自定义选项\npicker.set_item_renderer(func(item): ...)"
      },
      {
        "title": "5. 游戏角色出生阵营拾取 (Game Faction Picker)",
        "render": "<div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>🛡️ 当前所属阵营:</span><strong style=\"color:var(--warning);\">光明圣堂骑士团</strong></div>",
        "code": "# GDScript: 阵营拾取器\nvar faction_picker = GPicker.new_game_faction()"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"请选择\"",
        "desc": "顶部工具栏标题"
      },
      {
        "name": "columns",
        "type": "Array",
        "default": "[]",
        "desc": "选项列表（单列为字符串数组，多列为对象数组）"
      },
      {
        "name": "default_index",
        "type": "int",
        "default": "0",
        "desc": "单列选择器的默认选中项索引"
      },
      {
        "name": "confirm_button_text",
        "type": "String",
        "default": "\"确认\"",
        "desc": "确认按钮文字"
      },
      {
        "name": "cancel_button_text",
        "type": "String",
        "default": "\"取消\"",
        "desc": "取消按钮文字"
      },
      {
        "name": "show_toolbar",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示顶部工具栏"
      }
    ],
    "events": [
      {
        "name": "confirm(values, indexes)",
        "desc": "点击完成按钮时触发",
        "params": "(values: Array, indexes: Array)"
      },
      {
        "name": "cancel()",
        "desc": "点击取消按钮时触发",
        "params": "()"
      },
      {
        "name": "change(values, index)",
        "desc": "选项改变时触发",
        "params": "(values: Array, index: int)"
      }
    ],
    "methods": [
      {
        "name": "set_columns(cols: Array)",
        "desc": "批量设置多列或单列选项数据",
        "params": "(cols: Array) -> void"
      },
      {
        "name": "add_column(items: Array)",
        "desc": "动态追加一列备选数据",
        "params": "(items: Array) -> void"
      },
      {
        "name": "open()",
        "desc": "呼出选择器面板",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭选择器面板",
        "params": "() -> void"
      },
      {
        "name": "get_selected_value()",
        "desc": "获取当前选中的值",
        "params": "() -> Variant"
      }
    ],
    "slots": [
      {
        "name": "option",
        "desc": "轮盘每一行选项自定义渲染插槽（透传 { item, index }）",
        "child": "Control / GText",
        "example": "<template #option=\"{ item }\"><b>{{ item.text }}</b></template>"
      },
      {
        "name": "top-toolbar",
        "desc": "选择器顶部自定义工具栏插槽（取消/确认按钮区）",
        "child": "HBoxContainer / GButton",
        "example": "<template #top-toolbar><GButton>取消</GButton><GButton type=\"primary\">完成</GButton></template>"
      }
    ]
  },
  "slider": {
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
  },
  "form": {
    "title": "Form 表单布局 (GForm & GFormItem)",
    "desc": "由输入框、选择器、单选框、多选框等控件组成，用以收集、校验和提交数据。支持标签位置 (Top/Left/Right)、统一宽度与星号必填校验。",
    "demos": [
      {
        "title": "1. 基础表单与字段绑定 (Basic Form & Model)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:12px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">玩家昵称:</span><input type=\"text\" class=\"g-input\" value=\"亚瑟王\" style=\"flex:1;\"></div><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">所属战队:</span><input type=\"text\" class=\"g-input\" value=\"光明骑士团\" style=\"flex:1;\"></div><div style=\"display:flex; justify-content:flex-end; gap:8px;\"><button class=\"g-btn g-btn-primary\" onclick=\"showToast('表单提交成功！', 'success')\">提交注册</button></div></div>",
        "code": "# GDScript: 基础表单\nvar form = GForm.new()\nform.model = { \"name\": \"亚瑟王\", \"guild\": \"光明骑士团\" }\nadd_child(form)"
      },
      {
        "title": "2. 表单校验规则与错误提示 (Form Validation Rules)",
        "render": "<div style=\"max-width:360px; display:flex; flex-direction:column; gap:8px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><span style=\"width:70px; font-size:13px; text-align:right;\">密码强度:</span><input type=\"password\" class=\"g-input\" value=\"123\" style=\"flex:1; border-color:var(--danger);\"></div><span style=\"margin-left:78px; font-size:11px; color:var(--danger);\">密码长度不能少于 6 位字符</span></div>",
        "code": "# GDScript: 表单校验规则\nform.rules = {\n    \"password\": [{ \"required\": true, \"min\": 6, \"message\": \"密码长度不能少于 6 位\" }]\n}"
      },
      {
        "title": "3. 行内表单 (Inline Form)",
        "render": "<div style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap;\"><input type=\"text\" class=\"g-input\" placeholder=\"按玩家 ID 查询...\" style=\"width:160px;\"><button class=\"g-btn g-btn-primary\">查询</button></div>",
        "code": "# GDScript: 行内表单\nform.inline = true"
      },
      {
        "title": "4. 对齐方式配置 (Label Position: Left / Right / Top)",
        "render": "<div style=\"max-width:300px; display:flex; flex-direction:column; gap:4px;\"><span style=\"font-size:12px; font-weight:600;\">上对齐标签 (Top Label):</span><input type=\"text\" class=\"g-input\" value=\"10010\" style=\"width:100%;\"></div>",
        "code": "# GDScript: 上对齐\nform.label_position = GForm.LabelPosition.TOP"
      },
      {
        "title": "5. 游戏创建角色与公会注册表单 (Game Character Registration)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"font-weight:700; font-size:14px; color:#ffd04b;\">⚔️ 新勇者档案建档</div><input type=\"text\" class=\"g-input\" placeholder=\"输入勇者大名...\" value=\"神圣裁决者\"><div style=\"display:flex; justify-content:space-between; font-size:12px;\"><span>初始职业:</span><strong style=\"color:var(--primary);\">圣骑士</strong></div><button class=\"g-btn g-btn-primary\" onclick=\"showToast('勇者档案建立成功！', 'success')\">开启冒险之旅</button></div>",
        "code": "# GDScript: 创建角色表单\nvar hero_form = GForm.new_hero_form()"
      }
    ],
    "props": [
      {
        "name": "label_position",
        "type": "enum",
        "default": "LEFT",
        "desc": "标签对齐：LEFT (居左), TOP (居顶), RIGHT (居右)"
      },
      {
        "name": "label_width",
        "type": "float",
        "default": "120.0",
        "desc": "统一标签宽度 (像素)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否统一禁用表单下的所有子输入控件"
      },
      {
        "name": "show_message",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示错误校验提示信息"
      }
    ],
    "events": [
      {
        "name": "validate_success()",
        "desc": "表单校验通过时触发",
        "params": "()"
      },
      {
        "name": "validate_failed(errors)",
        "desc": "表单校验失败时触发",
        "params": "(errors: Dictionary)"
      }
    ],
    "methods": [
      {
        "name": "validate()",
        "desc": "对整个表单进行校验，返回 bool 校验结果",
        "params": "() -> bool"
      },
      {
        "name": "reset_fields()",
        "desc": "重置表单中所有字段至初始默认值并清除错误",
        "params": "() -> void"
      },
      {
        "name": "clear_validate()",
        "desc": "清除所有表单项的错误提示状态",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "表单主体内容插槽，放置各类表单控件与 GFormItem",
        "child": "Control / VBoxContainer",
        "example": "<template #default><GFormItem label=\"账号\"><GInput /></GFormItem></template>"
      },
      {
        "name": "label",
        "desc": "自定义表单项左侧标签栏插槽（透传 { label, required }）",
        "child": "HBoxContainer / GText",
        "example": "<template #label><span>用户名 <i style=\"color:red;\">*</i></span></template>"
      },
      {
        "name": "error",
        "desc": "自定义表单校验失败错误提示插槽（透传 { error_message }）",
        "child": "Control / GText",
        "example": "<template #error=\"{ error_message }\"><span class=\"err\">{{ error_message }}</span></template>"
      },
      {
        "name": "extra",
        "desc": "表单项底部额外辅助说明插槽",
        "child": "Control / GText",
        "example": "<template #extra><small>密码长度建议在 8-16 位之间</small></template>"
      }
    ],
    "paneProps": [
      {
        "name": "label",
        "type": "String",
        "default": "\"\"",
        "desc": "表单项标签文本"
      },
      {
        "name": "prop",
        "type": "String",
        "default": "\"\"",
        "desc": "表单域 model 字段名"
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "desc": "是否必填，如为 true 会在 label 前生成红色星号"
      },
      {
        "name": "error_message",
        "type": "String",
        "default": "\"\"",
        "desc": "表单项校验失败提示文本"
      }
    ]
  },
  "dialog": {
    "title": "Dialog / Modal 对话框 (GDialog)",
    "desc": "居中弹出的模态对话框，包含基础确认、删除高危确认、自定义内容区、无取消按钮等完整弹窗场景。",
    "demos": [
      {
        "title": "1. 基础确认对话框 (Basic Modal Dialog)",
        "render": "<button class=\"g-btn g-btn-primary\" onclick=\"showToast('弹出基础对话框：是否确认开启深渊挑战？', 'info')\">打开模态对话框</button>",
        "code": "# GDScript: 基础对话框\nGDialog.confirm(\"是否确认开启深渊挑战？\", func(): print(\"确认开启\"))"
      },
      {
        "title": "2. 自定义 Header 与 Footer 插槽 (Custom Header & Footer)",
        "render": "<div style=\"max-width:320px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;\"><div style=\"padding:10px 14px; border-bottom:1px solid var(--border-base); font-weight:700; color:var(--primary);\">🔥 神话级强化确认</div><div style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary);\">本次强化将消耗 10 颗神圣宝石，成功率 65%。</div><div style=\"padding:8px 14px; background:var(--bg-surface); display:flex; justify-content:flex-end; gap:8px;\"><button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">取消</button><button class=\"g-btn g-btn-danger\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"showToast('强化成功！+16 圣辉战刃！', 'success')\">立即强化</button></div></div>",
        "code": "# GDScript: 自定义插槽\ndialog.header.title = \"神话级强化确认\""
      },
      {
        "title": "3. 异步确认加载状态 (Async Loading Dialog)",
        "render": "<button class=\"g-btn g-btn-warning\" onclick=\"showToast('正在向云端扣除钻石...', 'info')\">💎 购买月卡 (带 Loading 确认)</button>",
        "code": "# GDScript: 异步加载\ndialog.before_close = func(action, done):\n    # 异步联网处理\n    done.call()"
      },
      {
        "title": "4. 居中与自定义尺寸 (Center Alignment & Width)",
        "render": "<button class=\"g-btn g-btn-default\" onclick=\"showToast('居中弹出 500px 大号对话框', 'info')\">居中大号对话框</button>",
        "code": "# GDScript: 对齐与尺寸\ndialog.center = true\ndialog.width = 500.0"
      },
      {
        "title": "5. 游戏抽卡十连抽奖励弹窗 (Game Gacha Reward Dialog)",
        "render": "<div style=\"max-width:360px; background:linear-gradient(135deg, #1e1b4b, #312e81); border:2px solid #ffd04b; border-radius:10px; padding:14px; text-align:center; color:#fff;\"><div style=\"font-size:16px; font-weight:800; color:#ffd04b; margin-bottom:8px;\">✨ 恭喜获得十连抽大奖 ✨</div><div style=\"font-size:32px; margin:10px 0;\">👑 🗡️ 🛡️ 🧪 💎</div><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\" onclick=\"showToast('全部放入背包！', 'success')\">收下全部奖励</button></div>",
        "code": "# GDScript: 抽卡奖励弹窗\nvar gacha_dlg = GDialog.new_gacha_reward(rewards)"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Dialog Title\"",
        "desc": "弹窗标题"
      },
      {
        "name": "content_text",
        "type": "String",
        "default": "\"\"",
        "desc": "弹窗正文文本"
      },
      {
        "name": "confirm_button_text",
        "type": "String",
        "default": "\"Confirm\"",
        "desc": "确认按钮文本"
      },
      {
        "name": "cancel_button_text",
        "type": "String",
        "default": "\"Cancel\"",
        "desc": "取消按钮文本"
      },
      {
        "name": "show_cancel_button",
        "type": "boolean",
        "default": "true",
        "desc": "是否显示取消按钮"
      },
      {
        "name": "mask_closable",
        "type": "boolean",
        "default": "true",
        "desc": "点击背景遮罩是否允许关闭"
      },
      {
        "name": "dialog_width",
        "type": "float",
        "default": "460.0",
        "desc": "对话框宽度 (像素)"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "default": "false",
        "desc": "是否以全屏铺满形式展示"
      }
    ],
    "events": [
      {
        "name": "confirmed()",
        "desc": "点击确认按钮时触发",
        "params": "()"
      },
      {
        "name": "cancelled()",
        "desc": "点击取消按钮时触发",
        "params": "()"
      },
      {
        "name": "opened()",
        "desc": "弹窗打开动画结束时触发",
        "params": "()"
      },
      {
        "name": "closed()",
        "desc": "弹窗关闭动画结束时触发",
        "params": "()"
      }
    ],
    "methods": [
      {
        "name": "open()",
        "desc": "播放弹性入场动画打开弹窗",
        "params": "() -> void"
      },
      {
        "name": "close()",
        "desc": "关闭弹窗并播放淡出动画",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "对话框主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><p>确认要丢弃这件神话装备？</p></template>"
      },
      {
        "name": "header",
        "desc": "对话框顶部标题栏插槽",
        "child": "HBoxContainer / GText",
        "example": "<template #header><h3>⚠️ 高危操作警告</h3></template>"
      },
      {
        "name": "close",
        "desc": "自定义右上角关闭按钮插槽",
        "child": "GButton / GIcon",
        "example": "<template #close><GIcon name=\"xmark\" /></template>"
      },
      {
        "name": "footer",
        "desc": "对话框底部操作按钮栏插槽（默认确认/取消）",
        "child": "HBoxContainer / GSpace / GButton",
        "example": "<template #footer><GButton type=\"danger\">确认丢弃</GButton></template>"
      }
    ]
  },
  "dialogue": {
    "title": "Dialogue 剧情对话系统 (GDialogue & Prompts)",
    "desc": "专为 JRPG 战术游戏、文字冒险 AVG / GalGame、MMORPG 任务交接与 NPC 互动设计的全功能剧情对话系统。支持打字机逐字输出、说话者印章姓名牌、立绘插槽、多段对话队列、分支选择支、科幻六边形气泡与头顶悬浮按键提示。",
    "demos": [
      {
        "title": "1. 两人双向立绘对峙对话 (Dual-Character Confrontation & Active Highlighting)",
        "render": "\n          <div style=\"background:#0c111d; border:2px solid #233554; border-radius:12px; padding:20px; display:flex; flex-direction:column; gap:16px; position:relative; overflow:hidden;\">\n            <!-- Dual Standee Portraits: Hero on Left, Villain on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:flex-end; padding:0 30px; height:120px;\">\n              <div id=\"dualSpeakerLeft\" style=\"display:flex; flex-direction:column; align-items:center; transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(64,158,255,0.4));\">🧙‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#409eff; background:rgba(64,158,255,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">罗宾 (Robin)</span>\n              </div>\n\n              <div id=\"dualSpeakerRight\" style=\"display:flex; flex-direction:column; align-items:center; opacity:0.4; transform:scale(0.92); transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(245,108,108,0.4));\">🦹‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#f56c6c; background:rgba(245,108,108,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">萨堤罗斯 (Saturos)</span>\n              </div>\n            </div>\n\n            <!-- Dialogue Box with Dynamic Side Switching -->\n            <div style=\"background:linear-gradient(180deg, #0a1f44 0%, #051026 100%); border:3px solid #d4d9e6; border-radius:6px; padding:14px 18px; color:#fff;\">\n              <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;\">\n                <span id=\"dualActiveSpeakerName\" style=\"background:#1b356d; border:1px solid #ffd04b; color:#ffd04b; font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px;\">罗宾</span>\n                <span style=\"font-size:11px; color:#a4b0be;\">点击下方按钮切换对话角色</span>\n              </div>\n              <div id=\"dualDialogText\" style=\"font-size:15px; line-height:1.6; min-height:48px;\">\n                萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！\n              </div>\n            </div>\n\n            <!-- Interactive Controller Buttons -->\n            <div style=\"display:flex; gap:10px;\">\n              <button class=\"g-btn g-btn-primary\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerLeft').style.opacity = '1';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerRight').style.opacity = '0.35';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '罗宾';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#409eff';\n                document.getElementById('dualActiveSpeakerName').style.color = '#409eff';\n                document.getElementById('dualDialogText').innerText = '萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！';\n              \">▶ 罗宾发言 (左侧主角高亮)</button>\n\n              <button class=\"g-btn g-btn-danger\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerRight').style.opacity = '1';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerLeft').style.opacity = '0.35';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '萨堤罗斯';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#f56c6c';\n                document.getElementById('dualActiveSpeakerName').style.color = '#f56c6c';\n                document.getElementById('dualDialogText').innerText = '哼，天真的小鬼！封印精神力只会让世界慢慢衰亡，点燃灯塔才是唯一的救赎！';\n              \">▶ 萨堤罗斯发言 (右侧反派高亮)</button>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 2人面对面双向立绘对峙对话 (自动高亮当前说话者，未说话者半透明淡出)\nGDialogue.converse([\n    {\n        \"speaker\": \"罗宾\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"left\",\n        \"text\": \"萨堤罗斯！放弃点燃元素灯塔的野心吧！\"\n    },\n    {\n        \"speaker\": \"萨堤罗斯\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"right\",\n        \"text\": \"哼，天真的小鬼！点燃灯塔才是拯救世界的唯一救赎！\"\n    }\n])"
      },
      {
        "title": "2. 场景宝箱开启与战利品掉落触发 (Treasure Chest Loot Trigger)",
        "render": "\n          <div style=\"background:#151009; border:2px solid #5c4326; border-radius:12px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:20px;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div id=\"simChestIcon\" style=\"font-size:48px; cursor:pointer; transition:all 0.3s ease;\" onclick=\"\n                this.style.transform = 'scale(1.2) rotate(-8deg)';\n                setTimeout(() => {\n                  this.innerHTML = '✨🎁';\n                  this.style.transform = 'scale(1)';\n                  openSimDialogue({\n                    text: '开启了【远古龙神遗迹宝箱】！\\n获得战利品：【神圣誓约之刃 +12】x1，【神话强化石】x5，金币 x8,800！',\n                    speaker: '宝箱开启',\n                    avatar: '🗡️'\n                  });\n                }, 300);\n              \">📦</div>\n              <div>\n                <div style=\"font-weight:700; color:#ffd700; font-size:14px;\">远古龙神遗迹宝箱 (点击开箱)</div>\n                <div style=\"font-size:11px; color:#eed8ae; margin-top:2px;\">点击宝箱触发开箱判定、掉落动效与战利品对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-warning\" style=\"height:34px;\" onclick=\"document.getElementById('simChestIcon').click()\">\n              <i class=\"fa-solid fa-key\"></i> 开启宝箱 (Open Chest)\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 点击宝箱触发开箱对话与掉落物展示\nfunc _on_treasure_chest_clicked():\n    play_chest_open_animation()\n    GDialogue.loot_chest(\"远古龙神遗迹宝箱\", [\n        \"【神圣誓约之刃 +12】x1\",\n        \"【神话强化石】x5\",\n        \"金币 x8,800\"\n    ], func():\n        add_items_to_inventory()\n        GMessage.success(\"物品已收入背包！\")\n    )"
      },
      {
        "title": "3. 二次元/手游立绘剧场对话与【跳过剧情 >>】(Anime Story Theater - 对标截图)",
        "render": "\n          <div style=\"position:relative; width:100%; min-height:220px; background:linear-gradient(135deg, #180d2b 0%, #0d0617 100%); border:2px solid #5a2e8c; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:16px; user-select:none;\">\n            <!-- Top Right: Skip Story Button [ 跳过剧情 >> ] -->\n            <div style=\"display:flex; justify-content:flex-end;\">\n              <button class=\"g-btn g-btn-default\" style=\"background:rgba(230,162,60,0.15); border:1px solid #ffd04b; color:#ffd04b; font-weight:800; font-size:12px; height:28px; padding:0 14px; border-radius:14px; cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.background='rgba(230,162,60,0.3)'\" onmouseleave=\"this.style.background='rgba(230,162,60,0.15)'\" onclick=\"simAnimeTheaterSkip()\">\n                跳过剧情 &gt;&gt;\n              </button>\n            </div>\n\n            <!-- Left Character Standee + Bottom Dialogue Bar -->\n            <div style=\"display:flex; align-items:flex-end; gap:16px;\">\n              <div id=\"animeStandeeAvatar\" style=\"font-size:72px; line-height:1; filter:drop-shadow(0 0 16px rgba(186,85,211,0.5)); flex-shrink:0; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\">🎭</div>\n              \n              <!-- Full-width Translucent Purple Dialogue Bar (Clickable to continue) -->\n              <div id=\"animeDialogueBox\" title=\"点击继续剧情\" style=\"flex:1; background:rgba(35, 15, 60, 0.88); border:1px solid #8a4baf; border-radius:8px; padding:12px 18px; position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.6); cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.borderColor='#ffd04b'; this.style.boxShadow='0 0 16px rgba(255,208,75,0.25)';\" onmouseleave=\"this.style.borderColor='#8a4baf'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.6)';\" onclick=\"simAnimeTheaterNext()\">\n                <div id=\"animeDialogueSpeaker\" style=\"font-weight:800; color:#ffd04b; font-size:14px; margin-bottom:4px; text-shadow:0 0 8px rgba(255,208,75,0.6);\">疯狂得爱丽丝啊</div>\n                <div id=\"animeDialogueText\" style=\"font-size:13px; color:#f1f2f6; line-height:1.5; min-height:40px;\">\n                  来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\n                </div>\n                <!-- Golden Next Chevron > (Clickable button) -->\n                <div id=\"animeDialogueNextBtn\" title=\"点击继续\" style=\"position:absolute; right:14px; bottom:10px; color:#ffd04b; font-size:18px; font-weight:800; animation:gBlink 0.6s infinite alternate; padding:2px 8px; border-radius:4px; background:rgba(255,208,75,0.1); border:1px solid rgba(255,208,75,0.3);\">&gt;</div>\n              </div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 二次元手游剧场式立绘对话 (带跳过剧情按钮与点击继续)\nvar theater_dialog = GDialogue.say({\n    \"speaker\": \"疯狂得爱丽丝啊\",\n    \"avatar\": preload(\"res://portraits/alice_mask.png\"),\n    \"text\": \"来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\",\n    \"allow_skip\": true\n})\ntheater_dialog.next_line_triggered.connect(func():\n    print(\"玩家点击继续，进入下一句剧场台词\")\n)"
      },
      {
        "title": "4. 《梦幻西游》经典 NPC 任务交接与红色选项分支 (Westward Journey NPC Quest)",
        "render": "\n          <div style=\"background:#0e131d; border:2px solid #4a5568; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px;\">\n            <div style=\"display:flex; gap:16px; align-items:flex-end;\">\n              <!-- Left NPC 3D Bust with Name -->\n              <div style=\"display:flex; flex-direction:column; align-items:center; width:90px;\">\n                <div style=\"width:72px; height:72px; background:radial-gradient(circle, #2d3748, #1a202c); border:2px solid #718096; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:36px;\">🥋</div>\n                <span style=\"font-size:12px; font-weight:700; color:#fff; background:#2d3748; padding:2px 8px; border-radius:4px; margin-top:-6px; border:1px solid #4a5568;\">首席大弟子</span>\n              </div>\n\n              <!-- CRT Scanline Dark Dialogue Box with Red Clickable Branches -->\n              <div style=\"flex:1; background:rgba(15, 20, 30, 0.95); border:2px solid #cbd5e0; border-radius:8px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"color:#fff; font-size:13px; font-weight:600;\">\n                  敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\n                </div>\n                <div style=\"display:flex; flex-direction:column; gap:4px; margin-top:2px;\">\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发战斗：进入首席弟子挑战副本！', 'danger')\">\n                    ▶ 我奉师傅之命，特来挑战——看招！\n                  </a>\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发剧情：我是路过拜访你的师傅老人家的。', 'info')\">\n                    ▶ 我是路过拜访你的师傅老人家的。\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 《梦幻西游》NPC 任务交接与红字选择支\nvar diag = GDialogue.ask(\n    \"敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\",\n    [\n        \"我奉师傅之命，特来挑战——看招！\",\n        \"我是路过拜访你的师傅老人家的。\"\n    ],\n    \"首席大弟子\",\n    avatar_chief\n)\ndiag.option_selected.connect(func(idx, text):\n    if idx == 0:\n        start_chief_boss_battle()\n    else:\n        open_dialog_greeting()\n)"
      },
      {
        "title": "5. 科幻/二次元斜切六边形气泡 (Sci-Fi Hexagonal Polygon Bubble - 对标截图)",
        "render": "\n          <div style=\"background:radial-gradient(circle at center, #1b2640 0%, #0a0f1d 100%); border:2px solid #2b4c7e; border-radius:12px; padding:20px; position:relative; overflow:hidden; display:flex; flex-direction:column; gap:16px; user-select:none;\">\n            <!-- Top Controls [ AUTO ] [ SKIP ] -->\n            <div style=\"display:flex; justify-content:flex-end; gap:8px;\">\n              <button id=\"scifiAutoBtn\" class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiToggleAuto()\">AUTO</button>\n              <button class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiSkip()\">SKIP</button>\n            </div>\n\n            <!-- Hexagonal Tech Dialogue Bubble -->\n            <div id=\"scifiDialogueBox\" title=\"点击继续对话\" style=\"position:relative; background:#0d1a33; border:2px solid #409eff; padding:16px 24px; border-radius:14px; clip-path:polygon(0% 0%, 94% 0%, 100% 50%, 94% 100%, 0% 100%); box-shadow:0 0 16px rgba(64,158,255,0.3); cursor:pointer; min-height:80px;\" onclick=\"simSciFiNext()\">\n              <!-- Speaker Tag Badge -->\n              <div id=\"scifiSpeakerTag\" style=\"position:absolute; top:-12px; left:20px; background:#409eff; color:#fff; font-size:11px; font-weight:800; padding:2px 14px; border-radius:4px; clip-path:polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%);\">\n                シマトラ\n              </div>\n              <div id=\"scifiDialogueText\" style=\"color:#fff; font-size:13px; line-height:1.6; margin-top:2px;\">\n                誰が、どうやって、何の目的で――<br>そのあたりは、これから調査するのである\n              </div>\n              <div style=\"position:absolute; right:36px; bottom:10px; color:#409eff; font-size:14px; font-weight:800; animation:gBlink 0.6s infinite alternate;\">&gt;&gt;</div>\n            </div>\n          </div>\n        ",
        "code": "# GDScript: 科幻/二次元斜切六边形气泡对话框\nvar scifi_diag = GDialogue.say(\"誰が、どうやって、何の目的で――\\nそのあたりは、これから調査するのである\", \"シマトラ\")"
      },
      {
        "title": "6. 《黄金太阳》经典 JRPG 对话框 (Golden Sun Style)",
        "render": "\n          <div style=\"display:flex; gap:12px; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\" onclick=\"openSimDialogue([\n              { text: '修炼精神力的话，会学到不同的招式。', speaker: '神秘长者', avatar: '🧙‍♂️' },\n              { text: '去北方的索罗神殿吧，四大元素的封印正在苏醒！', speaker: '神秘长者', avatar: '🧙‍♂️' }\n            ])\">\n              <i class=\"fa-solid fa-play\"></i> 播放黄金太阳经典对话\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 黄金太阳经典对话\nGDialogue.say(\"修炼精神力的话，会学到不同的招式。\", \"神秘长者\")"
      },
      {
        "title": "7. 像素 RPG 靠近 NPC 头顶悬浮交互按键 (Floating Prompt [ R ] / [ E ])",
        "render": "\n          <div style=\"background:#1e2b18; padding:16px 20px; border-radius:10px; border:2px solid #3c5a2e; display:flex; align-items:center; justify-content:space-between;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div style=\"font-size:36px; position:relative;\">\n                🧔‍♂️\n                <div style=\"position:absolute; top:-16px; right:-8px; background:#000; color:#fff; border:2px solid #fff; border-radius:50%; width:20px; height:20px; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; animation:gBlink 0.6s infinite alternate;\">R</div>\n              </div>\n              <div>\n                <div style=\"font-weight:700; color:#a3e635; font-size:13px;\">湖畔垂钓翁·姜老</div>\n                <div style=\"font-size:11px; color:#d9f99d; margin-top:2px;\">靠近时自动浮现 [ R ] 交互按键，按 R 或点击开始对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-primary\" style=\"height:32px; font-size:12px;\" onclick=\"openSimDialogue({ text: '小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！', speaker: '姜老', avatar: '🎣' })\">\n              按 R 键交谈\n            </button>\n          </div>\n        ",
        "code": "# GDScript: 为 2D NPC 绑定头顶交互按键\nGInteractPrompt.attach_to(npc_old_man, \"R\", func():\n    GDialogue.say(\"小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！\", \"姜老\", avatar_old_man)\n)"
      }
    ],
    "props": [
      {
        "name": "typing_speed",
        "type": "float",
        "default": "0.03",
        "desc": "打字机单字输出时间间隔 (秒)"
      },
      {
        "name": "position",
        "type": "enum",
        "default": "BOTTOM",
        "desc": "对话框位置：BOTTOM (底部居中), TOP (顶部), CENTER (居中)"
      }
    ],
    "events": [
      {
        "name": "text_completed()",
        "desc": "当前句打字机输出完毕时触发",
        "params": "()"
      },
      {
        "name": "dialogue_finished()",
        "desc": "整段对话队列全部播放完毕并关闭时触发",
        "params": "()"
      },
      {
        "name": "option_selected(index, text)",
        "desc": "玩家点击分支选项时触发",
        "params": "(index: int, text: String)"
      }
    ],
    "methods": [
      {
        "name": "say(lines, speaker=\"\", avatar=null)",
        "desc": "播放单句或多句对话队列",
        "params": "(lines: Variant, speaker: String, avatar: Texture2D) -> GDialogue"
      },
      {
        "name": "ask(question, options, speaker=\"\", avatar=null)",
        "desc": "播放带分支选择支的剧情对话",
        "params": "(question: String, options: Array, speaker: String, avatar: Texture2D) -> GDialogue"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "剧情对话正文打字机富文本区域",
        "child": "RichTextLabel / Control",
        "example": "<template #default>勇士，燃烧军团的阴影已笼罩艾泽拉斯！</template>"
      },
      {
        "name": "name",
        "desc": "说话者姓名牌印章区域",
        "child": "GText / PanelContainer",
        "example": "<template #name><span>大魔导师·卡德加 (Lv.99)</span></template>"
      },
      {
        "name": "avatar",
        "desc": "说话者半身立绘/动态插画插槽",
        "child": "TextureRect / AnimatedSprite2D",
        "example": "<template #avatar><TextureRect texture=\"res://npc_khadgar.png\" /></template>"
      },
      {
        "name": "options",
        "desc": "分支选择支列表插槽（透传 { option_list }）",
        "child": "VBoxContainer / GButton",
        "example": "<template #options><GButton>接受拯救世界任务</GButton></template>"
      },
      {
        "name": "next-icon",
        "desc": "右下角打字机完毕后的翻页闪烁指示图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #next-icon><GIcon name=\"angles-down\" /></template>"
      }
    ]
  },
  "chat": {
    "title": "Chat 微信与气泡对话流 (GChat & Lifeline)",
    "desc": "提供类似微信 (WeChat)、QQ 以及文字冒险解密游戏《生命线 Lifeline》的对话气泡流组件。支持左右双向分色气泡、系统事件时间胶囊、自适应文本长度、打字中动效与底部即时发送工具栏。",
    "demos": [
      {
        "title": "1. 基础双向聊天流 (Basic Chat Stream)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; gap:8px;\"><div style=\"width:32px; height:32px; border-radius:50%; background:#8da5f5; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">团长</div><div style=\"background:var(--bg-card); padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px; border:1px solid var(--border-base);\">今晚 8 点公会战准时开打！</div></div><div style=\"display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--primary); color:#fff; padding:8px 12px; border-radius:8px; font-size:12px; max-width:240px;\">收到！已强化 +15！</div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div></div>",
        "code": "# GDScript: 基础聊天\nvar chat = GChat.new()\nchat.add_message(\"今晚 8 点公会战准时开打！\", GChat.Sender.OTHER)\nchat.add_message(\"收到！已强化 +15！\", GChat.Sender.ME)"
      },
      {
        "title": "2. 语音消息条与播放时长 (Voice Audio Message)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; align-items:center;\"><div style=\"width:30px; height:30px; border-radius:50%; background:#67c23a; color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\">法师</div><div style=\"background:var(--bg-card); padding:6px 12px; border-radius:16px; font-size:12px; display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border-base); cursor:pointer;\" onclick=\"showToast('正在播放语音 (12秒)...', 'info')\"><i class=\"fa-solid fa-volume-high\" style=\"color:var(--primary);\"></i><span>12\"</span></div></div>",
        "code": "# GDScript: 语音条\nchat.add_voice_message(\"res://audio/voice_1.ogg\", 12.0)"
      },
      {
        "title": "3. 游戏装备道具分享卡片 (Item Share Card Message)",
        "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:10px; border-radius:8px; border:1px solid var(--border-base); display:flex; gap:8px; justify-content:flex-end;\"><div style=\"background:var(--bg-card); border:1px solid #ffd04b; padding:8px 12px; border-radius:8px; font-size:12px; cursor:pointer;\" onclick=\"showToast('查看分享的 SSR 武器详情', 'success')\"><div style=\"color:#ffd04b; font-weight:700;\">⚔️ [分享] 圣辉破晓之剑 (SSR)</div><div style=\"color:var(--text-secondary); font-size:11px;\">攻击力 +1,200 | 点击查看</div></div><div style=\"width:32px; height:32px; border-radius:50%; background:#409eff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;\">我</div></div>",
        "code": "# GDScript: 道具分享卡片\nchat.add_item_card_message(item_data, GChat.Sender.ME)"
      },
      {
        "title": "4. 系统通知与时间戳 (System Notice & Timestamps)",
        "render": "<div style=\"text-align:center; font-size:11px; color:var(--text-secondary);\"><span style=\"background:var(--bg-surface); padding:2px 8px; border-radius:10px;\">昨天 19:45 · 队长邀请了【神谕者】加入队伍</span></div>",
        "code": "# GDScript: 系统提示\nchat.add_system_notice(\"队长邀请了【神谕者】加入队伍\")"
      },
      {
        "title": "5. 快捷表情与输入栏面板 (Emoji Picker & Input Bar)",
        "render": "<div style=\"max-width:380px; display:flex; gap:6px; align-items:center;\"><button class=\"g-btn g-btn-default\" style=\"padding:4px 8px;\" onclick=\"showToast('打开表情面板 😄🎉⚔️', 'info')\">😀</button><input type=\"text\" class=\"g-input\" placeholder=\"输入聊天内容...\" style=\"flex:1; font-size:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">发送</button></div>",
        "code": "# GDScript: 输入栏\nchat.enable_input_bar = true"
      }
    ],
    "props": [
      {
        "name": "self_bubble_color",
        "type": "Color",
        "default": "Color.hex(0x07c160)",
        "desc": "我方发送气泡底色 (默认微信绿)"
      },
      {
        "name": "other_bubble_color",
        "type": "Color",
        "default": "Color.hex(0x242426)",
        "desc": "对方接收气泡底色"
      },
      {
        "name": "auto_scroll",
        "type": "boolean",
        "default": "true",
        "desc": "新消息到达时是否自动平滑滚动到底部"
      }
    ],
    "events": [
      {
        "name": "message_sent(text: String)",
        "desc": "玩家在底部输入框输入并点击发送或回车时触发",
        "params": "(text: String)"
      }
    ],
    "methods": [
      {
        "name": "send_self_message(text, avatar=null)",
        "desc": "添加一条我方右侧气泡消息",
        "params": "(text: String, avatar: Texture2D) -> GChat"
      },
      {
        "name": "receive_message(text, sender=\"队友\", avatar=null)",
        "desc": "添加一条对方左侧气泡消息",
        "params": "(text: String, sender: String, avatar: Texture2D) -> GChat"
      },
      {
        "name": "add_system_notice(text)",
        "desc": "添加一条居中系统时间戳或事件胶囊",
        "params": "(text: String) -> GChat"
      },
      {
        "name": "clear()",
        "desc": "清空当前聊天记录列表",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "message",
        "desc": "单条消息气泡自定义渲染插槽（透传 { message_data, is_self }）",
        "child": "Control / HBoxContainer",
        "example": "<template #message=\"{ msg, is_self }\"><div :class=\"is_self ? 'my-msg' : 'peer-msg'\">{{ msg.text }}</div></template>"
      },
      {
        "name": "avatar",
        "desc": "发言玩家头像插槽（透传 { user_info }）",
        "child": "GAvatar",
        "example": "<template #avatar=\"{ user }\"><GAvatar :src=\"user.avatar_url\" /></template>"
      },
      {
        "name": "input",
        "desc": "底部自定义输入与表情选择工具栏插槽",
        "child": "GInput / GButton",
        "example": "<template #input><GInput placeholder=\"输入消息...\" /><GButton>发送</GButton></template>"
      }
    ]
  }
});
