// =========================================================================
// Gotod Components UI - Component: form
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['form'] = {
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
};
