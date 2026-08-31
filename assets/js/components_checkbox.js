// =========================================================================
// Gotod Components UI - Component: checkbox
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['checkbox'] = {
  "title": "Checkbox 多选框 (GCheckbox & Group)",
  "desc": "在一组可选项中进行多项选择。支持全选与半选 (Indeterminate) 状态联动。",
  "demos": [
    {
      "title": "1. 基础多选框 (Basic Checkbox)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"checkbox\" checked style=\"accent-color:var(--primary);\"><span>自动拾取金币</span></label><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"checkbox\" style=\"accent-color:var(--primary);\"><span>低血量自动喝药</span></label></div>",
      "code": "# GDScript: 基础复选框\nvar cb = GCheckbox.new(\"自动拾取金币\")\ncb.checked = true\nadd_child(cb)"
    },
    {
      "title": "2. 禁用状态 (Disabled Checkbox)",
      "render": "<div style=\"display:flex; gap:16px; align-items:center; opacity:0.5;\"><label style=\"display:inline-flex; align-items:center; gap:6px; font-size:13px;\"><input type=\"checkbox\" checked disabled><span>主线任务锁定 (必选)</span></label></div>",
      "code": "# GDScript: 禁用\ncb.disabled = true"
    },
    {
      "title": "3. 多选框组 (Checkbox Group)",
      "render": "<div style=\"max-width:380px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"margin-bottom:8px; font-weight:600; font-size:13px;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer;\"><input type=\"checkbox\" checked style=\"accent-color:var(--primary);\"><span>全选职业技能</span></label></div><div style=\"display:flex; gap:12px; font-size:12px; margin-left:18px;\"><label><input type=\"checkbox\" checked> 破甲击</label><label><input type=\"checkbox\" checked> 旋风斩</label><label><input type=\"checkbox\"> 盾牌猛击</label></div></div>",
      "code": "# GDScript: 多选框组\nvar group = GCheckboxGroup.new()\ngroup.options = [\"破甲击\", \"旋风斩\", \"盾牌猛击\"]"
    },
    {
      "title": "4. 按钮样式形态 (Button Style Checkbox)",
      "render": "<div style=\"display:flex; gap:8px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">✓ 战士</button><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 10px;\">✓ 法师</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 10px;\">牧师</button></div>",
      "code": "# GDScript: 按钮样式\ncb.checkbox_type = GCheckbox.Type.BUTTON"
    },
    {
      "title": "5. 游戏副本掉落筛选多选器 (Game Drop Filter)",
      "render": "<div style=\"display:flex; gap:8px; flex-wrap:wrap; font-size:12px;\"><span class=\"g-tag g-tag-primary\" style=\"cursor:pointer;\">✓ 传说装备 (SSR)</span><span class=\"g-tag g-tag-primary\" style=\"cursor:pointer;\">✓ 稀有材料</span><span class=\"g-tag\" style=\"background:var(--bg-surface); border:1px solid var(--border-base); cursor:pointer;\">普通消耗品</span></div>",
      "code": "# GDScript: 掉落筛选\nvar filter = GCheckboxGroup.new_filter_group([\"SSR\", \"材料\", \"消耗品\"])"
    }
  ],
  "props": [
    {
      "name": "checked / v-model",
      "type": "boolean",
      "default": "false",
      "desc": "是否勾选"
    },
    {
      "name": "text / label",
      "type": "String",
      "default": "\"Checkbox\"",
      "desc": "说明文字"
    },
    {
      "name": "button_style",
      "type": "boolean",
      "default": "false",
      "desc": "是否启用类似分段按钮的样式外观"
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "desc": "半选/不确定状态"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用"
    }
  ],
  "events": [
    {
      "name": "toggled(checked)",
      "desc": "勾选状态改变时触发",
      "params": "(checked: bool)"
    }
  ],
  "methods": [
    {
      "name": "set_checked(val: bool)",
      "desc": "设置勾选状态",
      "params": "(val: bool) -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "复选框右侧描述文本或富文本标签插槽",
      "child": "Label / RichTextLabel / Control",
      "example": "<template #default>我已阅读并同意《服务协议》</template>"
    },
    {
      "name": "icon",
      "desc": "自定义复选勾选状态图标插槽（透传 { checked }）",
      "child": "GIcon / TextureRect",
      "example": "<template #icon=\"{ checked }\"><GIcon :name=\"checked ? 'square-check' : 'square'\" /></template>"
    }
  ]
};
