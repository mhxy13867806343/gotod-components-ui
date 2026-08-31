// =========================================================================
// Gotod Components UI - Component: select
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['select'] = {
  "title": "Select 下拉选择器 (GSelect)",
  "desc": "当选项过多时，使用下拉菜单展示并供用户选择内容。深度对标 Element Plus Select 规范，支持单选、有禁用选项、禁用状态、可清空单选、实时搜索筛选、多选 Tags 折叠、分组选择器与自定义模板。",
  "demos": [
    {
      "title": "1. 基础用法与可清空单选 (Basic Select & Clearable)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_basic\" style=\"width: 340px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">💡 包含 <code style=\"color:var(--primary);\">clearable = true</code> 属性，鼠标悬浮在选择框上时会出现 <code style=\"color:var(--danger);\">×</code> 按钮，点击一键清空。</span>\n          </div>\n        ",
      "code": "# GDScript: 基础单选与一键清空\nvar sel = GSelect.new()\nsel.placeholder_text = \"请选择渲染管线...\"\nsel.clearable = true\nsel.options = [\n    {\"label\": \"Godot 4.3 (Forward+ 高画质管线)\", \"value\": \"4.3_forward\"},\n    {\"label\": \"Godot 4.3 (Mobile 移动端轻量)\", \"value\": \"4.3_mobile\"},\n    {\"label\": \"Godot 4.4 (Latest 最新稳定版)\", \"value\": \"4.4_latest\"},\n    {\"label\": \"Godot 4.6+ (Future 未来试验特性)\", \"value\": \"4.6_future\"}\n]\nsel.item_selected.connect(func(idx, val, label):\n    print(\"已选择内核:\", label, \"值:\", val)\n)\nsel.cleared.connect(func():\n    print(\"已一键清空选中值\")\n)\nadd_child(sel)"
    },
    {
      "title": "2. 有禁用选项与禁用状态 (Disabled Options & Disabled Select)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:16px;\">\n            <div>\n              <div style=\"font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;\">① 有禁用选项（在 option 中设定 disabled 为 true）</div>\n              <div id=\"demo_select_opt_disabled\" style=\"width: 360px;\"></div>\n            </div>\n            <div>\n              <div style=\"font-size:12px; font-weight:700; color:var(--text-regular); margin-bottom:6px;\">② 禁用整个选择器组件（为 select 设置 disabled 属性）</div>\n              <div id=\"demo_select_full_disabled\" style=\"width: 360px;\"></div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 1. 有禁用选项 (Disabled Options)\nvar sel_opt = GSelect.new()\nsel_opt.options = [\n    {\"label\": \"初级强化石 (+1~+5 成功率 100%)\", \"value\": \"opt1\"},\n    {\"label\": \"中级祝福水晶 (+6~+9 铁匠3级解锁 - 禁用)\", \"value\": \"opt2\", \"disabled\": true}, # 👈 禁用该项\n    {\"label\": \"高级天界神石 (+10~+15 成功率 85%)\", \"value\": \"opt3\"},\n    {\"label\": \"太古不灭符文 (未解锁副本 - 禁用)\", \"value\": \"opt4\", \"disabled\": true},     # 👈 禁用该项\n    {\"label\": \"神话虚空精粹 (+20 终极附魔)\", \"value\": \"opt5\"}\n]\nadd_child(sel_opt)\n\n# GDScript: 2. 禁用整个选择器组件 (Disabled Select)\nvar sel_full = GSelect.new()\nsel_full.disabled = true # 👈 整个组件置灰并阻断点击交互\nadd_child(sel_full)"
    },
    {
      "title": "3. 实时搜索与模糊筛选 (Filterable & Searchable)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_filterable\" style=\"width: 360px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🔍 点击展开下拉菜单后，可在顶部搜索框输入拼音、英文或中文即时过滤；无匹配时自动展示「无匹配数据」空状态。</span>\n          </div>\n        ",
      "code": "# GDScript: 开启搜索筛选与过滤\nvar sel = GSelect.new()\nsel.filterable = true # 开启搜索过滤输入框\nsel.clearable = true\nsel.placeholder_text = \"输入关键字搜索组件库/算法...\"\nsel.options = [\n    {\"label\": \"Element Plus 现代化组件库 (Select/Dialog)\", \"value\": \"el_plus\"},\n    {\"label\": \"Naive UI 极速类型安全组件 (TypeScript)\", \"value\": \"naive\"},\n    {\"label\": \"Ant Design Vue 极客设计体系 (AntD)\", \"value\": \"antd\"},\n    {\"label\": \"Vant UI 移动端轻提示与选择器 (Mobile)\", \"value\": \"vant\"},\n    {\"label\": \"Vue.js 3 响应式底层 (Reactivity Core)\", \"value\": \"vue3\"}\n]\nadd_child(sel)"
    },
    {
      "title": "4. 多选标签与折叠展示 (Multiple Tags & Collapse Tags)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_multiple\" style=\"width: 420px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🏷️ 支持点击任意选项多选勾选，多选标签支持单独点 <code style=\"color:var(--danger);\">×</code> 移除；超出数量时自动折叠显示 <code style=\"color:var(--primary);\">+N</code>。</span>\n          </div>\n        ",
      "code": "# GDScript: 多选模式与标签折叠\nvar sel = GSelect.new()\nsel.multiple = true           # 开启多选\nsel.collapse_tags = true      # 开启超长标签折叠\nsel.max_collapse_tags = 2     # 最大保留展示 2 个 Tag，其余折叠显示 +N\nsel.filterable = true\nsel.clearable = true\n\n# 批量赋予已选中的值\nsel.selected_values = [\"physics\", \"particles\", \"dialogue\"]\n\nsel.selection_changed.connect(func(selected_array):\n    print(\"当前多选勾选列表:\", selected_array)\n)\nadd_child(sel)"
    },
    {
      "title": "5. 分组选项与禁用项 (Option Grouping & Disabled Options)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_group\" style=\"width: 360px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">🚫 支持按分类分组渲染，带有 <code style=\"color:var(--danger);\">disabled: true</code> 的选项将置灰且无法点击。</span>\n          </div>\n        ",
      "code": "# GDScript: 分组选择器与选项禁用\nvar sel = GSelect.new()\nsel.filterable = true\nsel.clearable = true\n\nsel.options = [\n    {\"label\": \"狂暴战 (Warrior - 近战输出)\", \"value\": \"warrior\", \"group\": \"近战狂暴系 (Melee)\"},\n    {\"label\": \"圣骑士 (Paladin - 需暗影通关 - 禁用)\", \"value\": \"paladin\", \"group\": \"近战狂暴系 (Melee)\", \"disabled\": true},\n    {\"label\": \"潜行者 (Rogue - 致命背刺)\", \"value\": \"rogue\", \"group\": \"近战狂暴系 (Melee)\"},\n    {\"label\": \"大魔导师 (Archmage - 暴风雪)\", \"value\": \"archmage\", \"group\": \"远程魔法系 (Caster)\"},\n    {\"label\": \"暗影术士 (Warlock - 诅咒之箭)\", \"value\": \"warlock\", \"group\": \"远程魔法系 (Caster)\"}\n]\nadd_child(sel)"
    },
    {
      "title": "6. 自定义选项模板与插槽 (Custom Option Template & Slots)",
      "render": "\n          <div style=\"display:flex; flex-direction:column; gap:8px;\">\n            <div id=\"demo_select_custom\" style=\"width: 380px;\"></div>\n            <span style=\"font-size:12px; color:var(--text-secondary);\">✨ 深度支持自定义 HTML / Godot 场景节点，展示带英雄头像、专属技能与 SSR/SR 品阶标签的高级选项。</span>\n          </div>\n        ",
      "code": "# GDScript: 自定义选项模板与插槽\nvar sel = GSelect.new()\nsel.filterable = true\nsel.clearable = true\n\n# 点语法访问插槽\nsel.slotName = \"prefix\"\nsel.prefix.icon = \"wand-magic-sparkles\"\n\nsel.slotName = \"empty\"\nsel.empty.text = \"没有找到符合条件的神话伙伴\"\n\n# 动态自定义渲染\nsel.item_selected.connect(func(idx, val, label):\n    print(\"出战伙伴切换:\", val)\n)\nadd_child(sel)"
    }
  ],
  "props": [
    {
      "name": "options",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "选项数据源 [{\"label\": \"\", \"value\": \"\", \"disabled\": false, \"group\": \"\"}]",
      "version": "v1.0"
    },
    {
      "name": "selected_index",
      "type": "int",
      "default": "-1",
      "desc": "单选模式下当前选中项的索引",
      "version": "v1.0"
    },
    {
      "name": "selected_value",
      "type": "Variant",
      "default": "null",
      "desc": "当前选中的具体值 (单选模式)",
      "version": "v1.0"
    },
    {
      "name": "selected_values",
      "type": "Array",
      "default": "[]",
      "desc": "多选模式下已选中的值列表 Array[Variant]",
      "version": "v1.0"
    },
    {
      "name": "clearable",
      "type": "boolean",
      "default": "true",
      "desc": "是否支持一键清空选中值 (鼠标悬浮显示 × 图标)",
      "version": "v1.2"
    },
    {
      "name": "filterable",
      "type": "boolean",
      "default": "true",
      "desc": "是否开启下拉列表实时模糊搜索过滤输入框",
      "version": "v1.2"
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启多选 Tags 模式",
      "version": "v1.2"
    },
    {
      "name": "collapse_tags",
      "type": "boolean",
      "default": "false",
      "desc": "多选模式下是否折叠超长标签",
      "version": "v1.0"
    },
    {
      "name": "max_collapse_tags",
      "type": "int",
      "default": "1",
      "desc": "折叠标签模式下最多展示的 Tag 数量",
      "version": "v1.2"
    },
    {
      "name": "placeholder_text",
      "type": "String",
      "default": "\"请选择...\"",
      "desc": "选择框未选值时的占位提示文本",
      "version": "v1.0"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用整个选择器组件（不可点击交互）",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "item_selected(index, value, label)",
      "desc": "单选模式下选中新选项时触发",
      "params": "(index: int, value: Variant, label: String)",
      "version": "v1.0"
    },
    {
      "name": "selection_changed(values)",
      "desc": "选中值集合改变时触发（单选返回单元素数组，多选返回全量数组）",
      "params": "(values: Array)",
      "version": "v1.0"
    },
    {
      "name": "cleared()",
      "desc": "点击一键清空按钮时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "popup_visibility_changed(is_visible)",
      "desc": "下拉弹窗展开或收起状态改变时触发",
      "params": "(is_visible: bool)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "add_option(label, value=null, disabled=false, group=\"\")",
      "desc": "动态追加单个下拉选项，支持指定分组与禁用状态",
      "params": "(label: String, value: Variant, disabled: bool, group: String) -> void",
      "version": "v1.0"
    },
    {
      "name": "add_options(opt_list: Array)",
      "desc": "批量追加一组下拉选项 Array[Dictionary | String]",
      "params": "(opt_list: Array) -> void",
      "version": "v1.0"
    },
    {
      "name": "clear_options()",
      "desc": "清空全部选项数据与当前选中状态",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "show_popup()",
      "desc": "显式弹出下拉菜单并自动聚焦搜索框",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "toggle_popup()",
      "desc": "切换下拉菜单展开或收起状态",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "下拉选择框主体触发器展示内容插槽",
      "child": "Control / GText",
      "example": "<template #default><span>请选择法术流派</span></template>",
      "version": "v1.0"
    },
    {
      "name": "prefix",
      "desc": "选择框左侧前置图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #prefix><GIcon name=\"wand-magic\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "arrow",
      "desc": "自定义下拉展开箭头指示器插槽（旋转动画）",
      "child": "GIcon / TextureRect",
      "example": "<template #arrow><GIcon name=\"chevron-down\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "option",
      "desc": "自定义下拉菜单列表每一项渲染插槽（透传 { item, index }）",
      "child": "Control / HBoxContainer",
      "example": "<template #option=\"{ item }\"><GIcon :name=\"item.icon\" /> {{ item.label }}</template>",
      "version": "v1.0"
    },
    {
      "name": "empty",
      "desc": "无匹配搜索结果时的空状态插槽",
      "child": "Control / GText",
      "example": "<template #empty><span>未找到相关角色</span></template>",
      "version": "v1.0"
    }
  ]
};
