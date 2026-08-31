// =========================================================================
// Gotod Components UI - Component: textarea
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['textarea'] = {
  "title": "Textarea 文本域 (GTextarea)",
  "desc": "用于多行文本输入的组件，支持自适应高度（autosize）、最大字数限制与字数实时统计、只读/禁用以及玩家留言板/公会宣言场景。",
  "demos": [
    {
      "title": "1. 基础多行输入 (Basic Multi-line Input)",
      "render": "\n      <div style=\"max-width:380px;\">\n        <textarea class=\"g-input\" rows=\"3\" style=\"width:100%; resize:vertical;\" placeholder=\"请输入您的游戏心得或建议...\"></textarea>\n      </div>\n    ",
      "code": "# GDScript: 基础文本域\nvar textarea = GTextarea.new()\ntextarea.placeholder = \"请输入您的游戏心得...\"\ntextarea.rows = 3\nadd_child(textarea)"
    },
    {
      "title": "2. 顶部 Header 与底部 Footer 复合插槽 (Header & Footer Slots: 工具栏 + 发布栏)",
      "render": "\n      <div style=\"max-width:400px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface);\">\n        <!-- Header Slot -->\n        <div style=\"padding:6px 10px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; gap:8px; align-items:center; font-size:12px;\">\n          <span style=\"font-size:11px; font-weight:700; color:var(--primary);\"><i class=\"fa-solid fa-puzzle-piece\"></i> #header 插槽:</span>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"加粗\"><b>B</b></button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"斜体\"><i>I</i></button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"代码块\">&lt;/&gt;</button>\n          <button class=\"g-btn g-btn-default\" style=\"padding:1px 6px; font-size:11px;\" title=\"插入表情\">😀</button>\n        </div>\n        <!-- Default Slot Area -->\n        <textarea class=\"g-input\" rows=\"3\" style=\"width:100%; border:none; background:transparent; border-radius:0; padding:10px; font-size:12px;\" placeholder=\"支持在顶部 header 插槽放置富文本工具栏，底部 footer 插槽放置字数统计与操作按钮...\"></textarea>\n        <!-- Footer Slot -->\n        <div style=\"padding:6px 10px; background:var(--bg-card); border-top:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; font-size:11px;\">\n          <span style=\"color:var(--text-secondary);\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--warning);\"></i> #footer 插槽: 38/500 字</span>\n          <div style=\"display:flex; gap:6px;\">\n            <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\">存为草稿</button>\n            <button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:2px 10px;\" onclick=\"showToast('发布成功！已触发 footer 插槽提交', 'success')\">立即发布</button>\n          </div>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 使用 Header 与 Footer 插槽\nvar ta = GTextarea.new()\n\n# 1. 挂载 Header 工具栏插槽\nta.slotName = \"header\"\nta.header.add_child(toolbar_hbox)\n\n# 2. 挂载 Footer 操作栏插槽\nta.slotName = \"footer\"\nta.footer.add_child(submit_btn)\nta.footer.show_word_limit = true"
    },
    {
      "title": "3. 自适应高度 (Autosize Height: min_rows / max_rows)",
      "render": "\n      <div style=\"max-width:380px;\">\n        <textarea class=\"g-input\" rows=\"2\" style=\"width:100%;\" placeholder=\"内容增多时高度自适应扩展 (min: 2, max: 6)...\" oninput=\"this.style.height = ''; this.style.height = this.scrollHeight + 'px'\"></textarea>\n      </div>\n    ",
      "code": "# GDScript: 自适应高度\ntextarea.autosize = true\ntextarea.min_rows = 2\ntextarea.max_rows = 6"
    },
    {
      "title": "4. 限制字数与统计计数器 (Maxlength & Word Count)",
      "render": "\n      <div style=\"max-width:380px; position:relative;\">\n        <textarea class=\"g-input\" rows=\"3\" maxlength=\"200\" style=\"width:100%;\" placeholder=\"最多输入 200 字公会宣言...\" oninput=\"document.getElementById('taCount').innerText = this.value.length + '/200'\"></textarea>\n        <div id=\"taCount\" style=\"position:absolute; bottom:6px; right:10px; font-size:11px; color:var(--text-secondary);\">0/200</div>\n      </div>\n    ",
      "code": "# GDScript: 字数统计\ntextarea.max_length = 200\ntextarea.show_word_limit = true"
    },
    {
      "title": "5. 只读与禁用状态 (Readonly & Disabled)",
      "render": "\n      <div style=\"max-width:380px; display:flex; flex-direction:column; gap:8px;\">\n        <textarea class=\"g-input\" rows=\"2\" readonly style=\"width:100%; background:var(--bg-surface);\" placeholder=\"【用户协议】本软件遵循 MIT 开源协议...\">【用户协议】本软件遵循 MIT 开源协议...</textarea>\n        <textarea class=\"g-input\" rows=\"2\" disabled style=\"width:100%; opacity:0.5;\" placeholder=\"已禁用的输入框...\"></textarea>\n      </div>\n    ",
      "code": "# GDScript: 只读模式\ntextarea.readonly = true"
    },
    {
      "title": "6. 游戏玩家公会战前誓师宣言 (Game Guild Declaration)",
      "render": "\n      <div style=\"max-width:380px; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px; background:var(--bg-surface);\">\n        <div style=\"font-size:12px; font-weight:600; margin-bottom:6px;\">🛡️ 公会战前誓师宣言</div>\n        <textarea class=\"g-input\" rows=\"2\" style=\"width:100%; font-size:12px;\" placeholder=\"誓死保卫龙息要塞，今晚 20:00 准时集结！\">誓死保卫龙息要塞，今晚 20:00 准时集结！</textarea>\n        <button class=\"g-btn g-btn-primary\" style=\"margin-top:8px; font-size:11px; padding:2px 10px;\" onclick=\"showToast('公会宣言已发布全服！', 'success')\">发布宣言</button>\n      </div>\n    ",
      "code": "# GDScript: 公会宣言编辑\ntextarea.text = \"誓死保卫龙息要塞...\""
    }
  ],
  "props": [
    {
      "name": "text",
      "type": "String",
      "default": "\"\"",
      "desc": "文本域绑定内容",
      "version": "v1.0"
    },
    {
      "name": "rows",
      "type": "int",
      "default": "3",
      "desc": "默认行数",
      "version": "v1.0"
    },
    {
      "name": "autosize",
      "type": "bool",
      "default": "false",
      "desc": "是否自适应高度",
      "version": "v1.0"
    },
    {
      "name": "max_length",
      "type": "int",
      "default": "-1",
      "desc": "最大输入字符数",
      "version": "v1.0"
    },
    {
      "name": "show_word_limit",
      "type": "bool",
      "default": "false",
      "desc": "是否展示字数统计",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "text_changed",
      "params": "(new_text: String)",
      "desc": "文本内容改变时触发",
      "version": "v1.0"
    }
  ],
  "methods": [],
  "slots": [
    {
      "name": "default",
      "desc": "文本域主体 TextEdit 内容插槽",
      "child": "TextEdit / Control",
      "example": "<template #default><TextEdit placeholder=\"请输入...\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "文本域顶部工具栏插槽（如富文本加粗、表情选择器、快捷模板短语）",
      "child": "Control / HBoxContainer",
      "example": "<template #header><div class=\"toolbar\">...</div></template>",
      "version": "v1.0"
    },
    {
      "name": "footer",
      "desc": "文本域底部操作栏插槽（如实时字数统计、发布按钮、一键清空）",
      "child": "Control / HBoxContainer",
      "example": "<template #footer><GButton type=\"primary\">发布留言</GButton></template>",
      "version": "v1.0"
    },
    {
      "name": "prefix",
      "desc": "文本域左上角/前置指示图标或标签插槽",
      "child": "GIcon / GTag / TextureRect",
      "example": "<template #prefix><GIcon name=\"feather\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "suffix",
      "desc": "文本域右下角快捷动作插槽",
      "child": "GButton / GIcon",
      "example": "<template #suffix><GButton size=\"small\">清空</GButton></template>",
      "version": "v1.0"
    }
  ]
};
