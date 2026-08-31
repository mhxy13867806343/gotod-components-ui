// =========================================================================
// Gotod Components UI - Component Catalog Part 2 / 6
// Group: textarea, input-number, stepper, switch, checkbox, radio, select
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "textarea": {
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
        "desc": "文本域绑定内容"
      },
      {
        "name": "rows",
        "type": "int",
        "default": "3",
        "desc": "默认行数"
      },
      {
        "name": "autosize",
        "type": "bool",
        "default": "false",
        "desc": "是否自适应高度"
      },
      {
        "name": "max_length",
        "type": "int",
        "default": "-1",
        "desc": "最大输入字符数"
      },
      {
        "name": "show_word_limit",
        "type": "bool",
        "default": "false",
        "desc": "是否展示字数统计"
      }
    ],
    "events": [
      {
        "name": "text_changed",
        "params": "(new_text: String)",
        "desc": "文本内容改变时触发"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "文本域主体 TextEdit 内容插槽",
        "child": "TextEdit / Control",
        "example": "<template #default><TextEdit placeholder=\"请输入...\" /></template>"
      },
      {
        "name": "header",
        "desc": "文本域顶部工具栏插槽（如富文本加粗、表情选择器、快捷模板短语）",
        "child": "Control / HBoxContainer",
        "example": "<template #header><div class=\"toolbar\">...</div></template>"
      },
      {
        "name": "footer",
        "desc": "文本域底部操作栏插槽（如实时字数统计、发布按钮、一键清空）",
        "child": "Control / HBoxContainer",
        "example": "<template #footer><GButton type=\"primary\">发布留言</GButton></template>"
      },
      {
        "name": "prefix",
        "desc": "文本域左上角/前置指示图标或标签插槽",
        "child": "GIcon / GTag / TextureRect",
        "example": "<template #prefix><GIcon name=\"feather\" /></template>"
      },
      {
        "name": "suffix",
        "desc": "文本域右下角快捷动作插槽",
        "child": "GButton / GIcon",
        "example": "<template #suffix><GButton size=\"small\">清空</GButton></template>"
      }
    ]
  },
  "input-number": {
    "title": "InputNumber 数字输入框 (GInputNumber)",
    "desc": "专用于仅允许输入数值的数字控制器，支持浮点精度（precision）、离散步长（step）、范围严格限制、按钮位置切换（Sides 左右式 / Right 右侧堆叠式）与游戏自由加点分配器。",
    "demos": [
      {
        "title": "1. 基础数字输入与极值禁用 (Basic: [1 ~ 10] 到达边界自动禁用按钮)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n        <button id=\"btnMinus1\" disabled style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo1');\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = Math.max(1, parseInt(el.value || 1) - 1);\n          el.value = val;\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-minus\"></i>\n        </button>\n        <input type=\"text\" id=\"inDemo1\" value=\"1\" style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\" oninput=\"\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = parseInt(this.value) || 1;\n          val = Math.max(1, Math.min(10, val));\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n        <button id=\"btnPlus1\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo1');\n          const minus = document.getElementById('btnMinus1');\n          const plus = document.getElementById('btnPlus1');\n          let val = Math.min(10, parseInt(el.value || 1) + 1);\n          el.value = val;\n          minus.disabled = (val <= 1);\n          minus.style.opacity = (val <= 1) ? '0.35' : '1';\n          minus.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 10);\n          plus.style.opacity = (val >= 10) ? '0.35' : '1';\n          plus.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-plus\"></i>\n        </button>\n      </div>\n      <span style=\"font-size:12px; color:var(--text-secondary); margin-left:12px;\">范围 [1, 10]，初始为 1 时减号自动 disabled 禁用</span>\n    ",
        "code": "# GDScript: 基础数字输入框（边界自动禁用按钮）\nvar num_input = GInputNumber.new()\nnum_input.value = 1\nnum_input.min_value = 1\nnum_input.max_value = 10\nadd_child(num_input)"
      },
      {
        "title": "2. 步长与精度控制 (Step: 0.25 & Range: [0.00 ~ 3.00])",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n        <button id=\"btnMinus2\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo2');\n          const minus = document.getElementById('btnMinus2');\n          const plus = document.getElementById('btnPlus2');\n          let val = Math.max(0, parseFloat(el.value || 0) - 0.25);\n          el.value = val.toFixed(2);\n          minus.disabled = (val <= 0);\n          minus.style.opacity = (val <= 0) ? '0.35' : '1';\n          minus.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 3.0);\n          plus.style.opacity = (val >= 3.0) ? '0.35' : '1';\n          plus.style.cursor = (val >= 3.0) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-minus\"></i>\n        </button>\n        <input type=\"text\" id=\"inDemo2\" value=\"1.50\" style=\"width:70px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:13px; font-weight:600; outline:none;\">\n        <button id=\"btnPlus2\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n          const el = document.getElementById('inDemo2');\n          const minus = document.getElementById('btnMinus2');\n          const plus = document.getElementById('btnPlus2');\n          let val = Math.min(3.0, parseFloat(el.value || 0) + 0.25);\n          el.value = val.toFixed(2);\n          minus.disabled = (val <= 0);\n          minus.style.opacity = (val <= 0) ? '0.35' : '1';\n          minus.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n          plus.disabled = (val >= 3.0);\n          plus.style.opacity = (val >= 3.0) ? '0.35' : '1';\n          plus.style.cursor = (val >= 3.0) ? 'not-allowed' : 'pointer';\n        \">\n          <i class=\"fa-solid fa-plus\"></i>\n        </button>\n      </div>\n      <span style=\"font-size:12px; color:var(--text-secondary); margin-left:12px;\">步长: 0.25, 精度: 2 位小数, 范围 [0.00, 3.00]</span>\n    ",
        "code": "# GDScript: 精度与步长\nnum_input.value = 1.50\nnum_input.step = 0.25\nnum_input.precision = 2\nnum_input.min_value = 0.0\nnum_input.max_value = 3.0"
      },
      {
        "title": "3. 范围严格限制与极值置灰 (Strict Range: 10 ~ 100, 步长 10)",
        "render": "\n      <div style=\"display:flex; align-items:center; gap:12px;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden;\">\n          <button id=\"btnMinus3\" style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n            const el = document.getElementById('inDemo3');\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = Math.max(10, parseInt(el.value || 50) - 10);\n            el.value = val;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n            <i class=\"fa-solid fa-minus\"></i>\n          </button>\n          <input type=\"text\" id=\"inDemo3\" value=\"100\" style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\" oninput=\"\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = parseInt(this.value) || 10;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n          <button id=\"btnPlus3\" disabled style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;\" onclick=\"\n            const el = document.getElementById('inDemo3');\n            const minus = document.getElementById('btnMinus3');\n            const plus = document.getElementById('btnPlus3');\n            let val = Math.min(100, parseInt(el.value || 50) + 10);\n            el.value = val;\n            minus.disabled = (val <= 10);\n            minus.style.opacity = (val <= 10) ? '0.35' : '1';\n            minus.style.cursor = (val <= 10) ? 'not-allowed' : 'pointer';\n            plus.disabled = (val >= 100);\n            plus.style.opacity = (val >= 100) ? '0.35' : '1';\n            plus.style.cursor = (val >= 100) ? 'not-allowed' : 'pointer';\n          \">\n            <i class=\"fa-solid fa-plus\"></i>\n          </button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">范围限定: [10, 100] (当前为 100，加号已自动 disabled 禁用)</span>\n      </div>\n    ",
        "code": "# GDScript: 严格范围约束（到 100 自动禁用 + 按钮）\nnum_input.min_value = 10\nnum_input.max_value = 100\nnum_input.value = 100\nnum_input.step = 10"
      },
      {
        "title": "4. 控制按钮位置与上下键禁用 (Controls Position: 右侧上下堆叠式, 范围 [0 ~ 20])",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center; flex-wrap:wrap;\">\n        <div style=\"display:inline-flex; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-card); overflow:hidden;\">\n          <input type=\"text\" id=\"inDemo4\" value=\"20\" style=\"width:60px; height:36px; border:none; text-align:center; background:transparent; color:var(--text-primary); font-size:14px; font-weight:600; outline:none;\">\n          <div style=\"display:flex; flex-direction:column; border-left:1px solid var(--border-base); width:26px;\">\n            <button id=\"btnUp4\" disabled style=\"flex:1; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed; opacity:0.35; font-size:10px; display:flex; align-items:center; justify-content:center; border-bottom:1px solid var(--border-base);\" onclick=\"\n              const el=document.getElementById('inDemo4');\n              const up=document.getElementById('btnUp4');\n              const down=document.getElementById('btnDown4');\n              let val = Math.min(20, parseInt(el.value||0) + 1);\n              el.value = val;\n              up.disabled = (val >= 20);\n              up.style.opacity = (val >= 20) ? '0.35' : '1';\n              up.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n              down.disabled = (val <= 0);\n              down.style.opacity = (val <= 0) ? '0.35' : '1';\n              down.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            \">\n              <i class=\"fa-solid fa-chevron-up\"></i>\n            </button>\n            <button id=\"btnDown4\" style=\"flex:1; border:none; background:var(--bg-surface); color:var(--text-primary); cursor:pointer; font-size:10px; display:flex; align-items:center; justify-content:center;\" onclick=\"\n              const el=document.getElementById('inDemo4');\n              const up=document.getElementById('btnUp4');\n              const down=document.getElementById('btnDown4');\n              let val = Math.max(0, parseInt(el.value||0) - 1);\n              el.value = val;\n              up.disabled = (val >= 20);\n              up.style.opacity = (val >= 20) ? '0.35' : '1';\n              up.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n              down.disabled = (val <= 0);\n              down.style.opacity = (val <= 0) ? '0.35' : '1';\n              down.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            \">\n              <i class=\"fa-solid fa-chevron-down\"></i>\n            </button>\n          </div>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">当前达到最大上限 20，上箭头已自动 disabled</span>\n      </div>\n    ",
        "code": "# GDScript: 右侧堆叠控制按钮（到上限自动禁用上箭头）\nnum_input.controls_position = GInputNumber.Controls.RIGHT\nnum_input.min_value = 0\nnum_input.max_value = 20\nnum_input.value = 20"
      },
      {
        "title": "5. 全局禁用与只读状态 (Disabled & Readonly)",
        "render": "\n      <div style=\"display:flex; gap:16px; align-items:center;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:6px; background:var(--bg-surface); overflow:hidden; opacity:0.4;\">\n          <button style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed;\" disabled>-</button>\n          <input type=\"text\" value=\"99\" disabled style=\"width:60px; height:36px; border:none; border-left:1px solid var(--border-base); border-right:1px solid var(--border-base); text-align:center; background:var(--bg-card); color:var(--text-secondary); cursor:not-allowed;\">\n          <button style=\"width:36px; height:36px; border:none; background:var(--bg-surface); color:var(--text-secondary); cursor:not-allowed;\" disabled>+</button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">已禁用状态 (Disabled)</span>\n      </div>\n    ",
        "code": "# GDScript: 禁用状态\nnum_input.disabled = true"
      },
      {
        "title": "6. 游戏自由加点分配器 (RPG Stat Allocator: 潜能点消耗完毕自动禁用加号)",
        "render": "\n      <div style=\"max-width:340px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\">\n        <div style=\"display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-base); padding-bottom:8px;\">\n          <span>剩余潜能点:</span>\n          <strong style=\"color:var(--primary); font-size:14px;\" id=\"statRemain\">2 点</strong>\n        </div>\n        <div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\">\n          <span>💪 力量属性 (STR):</span>\n          <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden; background:var(--bg-card);\">\n            <button id=\"btnStatMinus\" class=\"g-btn g-btn-default\" style=\"width:28px; height:28px; padding:0; border:none; border-radius:0; cursor:pointer;\" onclick=\"\n              const val = document.getElementById('statStr');\n              const rem = document.getElementById('statRemain');\n              const pBtn = document.getElementById('btnStatPlus');\n              const mBtn = document.getElementById('btnStatMinus');\n              let cur = parseInt(val.innerText);\n              let curRem = parseInt(rem.innerText);\n              if (cur > 20) {\n                cur -= 1;\n                curRem += 1;\n                val.innerText = cur;\n                rem.innerText = curRem + ' 点';\n                mBtn.disabled = (cur <= 20);\n                mBtn.style.opacity = (cur <= 20) ? '0.35' : '1';\n                mBtn.style.cursor = (cur <= 20) ? 'not-allowed' : 'pointer';\n                pBtn.disabled = (curRem <= 0);\n                pBtn.style.opacity = (curRem <= 0) ? '0.35' : '1';\n                pBtn.style.cursor = (curRem <= 0) ? 'not-allowed' : 'pointer';\n              }\n            \">-</button>\n            <span id=\"statStr\" style=\"width:36px; text-align:center; font-weight:700; font-size:13px;\">28</span>\n            <button id=\"btnStatPlus\" class=\"g-btn g-btn-primary\" style=\"width:28px; height:28px; padding:0; border:none; border-radius:0; cursor:pointer;\" onclick=\"\n              const val = document.getElementById('statStr');\n              const rem = document.getElementById('statRemain');\n              const pBtn = document.getElementById('btnStatPlus');\n              const mBtn = document.getElementById('btnStatMinus');\n              let cur = parseInt(val.innerText);\n              let curRem = parseInt(rem.innerText);\n              if (curRem > 0) {\n                cur += 1;\n                curRem -= 1;\n                val.innerText = cur;\n                rem.innerText = curRem + ' 点';\n                mBtn.disabled = (cur <= 20);\n                mBtn.style.opacity = (cur <= 20) ? '0.35' : '1';\n                mBtn.style.cursor = (cur <= 20) ? 'not-allowed' : 'pointer';\n                pBtn.disabled = (curRem <= 0);\n                pBtn.style.opacity = (curRem <= 0) ? '0.35' : '1';\n                pBtn.style.cursor = (curRem <= 0) ? 'not-allowed' : 'pointer';\n              }\n            \">+</button>\n          </div>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 潜能点分配器\nvar stat_alloc = GInputNumber.new_stat_point(\"力量\", 28, 2)"
      }
    ],
    "props": [
      {
        "name": "value / v-model",
        "type": "float",
        "default": "0.0",
        "desc": "当前数值"
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
        "desc": "步进值"
      },
      {
        "name": "precision",
        "type": "int",
        "default": "0",
        "desc": "小数数值精度"
      }
    ],
    "events": [
      {
        "name": "value_changed(new_value)",
        "desc": "数值改变时触发",
        "params": "(new_value: float)"
      }
    ],
    "methods": [
      {
        "name": "increase()",
        "desc": "数值按 step 增加",
        "params": "() -> void"
      },
      {
        "name": "decrease()",
        "desc": "数值按 step 减少",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "decrease-icon",
        "desc": "自定义递减按钮图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #decrease-icon><GIcon name=\"minus\" /></template>"
      },
      {
        "name": "increase-icon",
        "desc": "自定义递增按钮图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #increase-icon><GIcon name=\"plus\" /></template>"
      },
      {
        "name": "prefix",
        "desc": "输入框前置单位插槽（如货币符号 ¥）",
        "child": "GText / Label",
        "example": "<template #prefix>¥</template>"
      },
      {
        "name": "suffix",
        "desc": "输入框后置单位插槽（如计量单位“件/个”）",
        "child": "GText / Label",
        "example": "<template #suffix>件</template>"
      }
    ]
  },
  "stepper": {
    "title": "Stepper 步进器 (GStepper)",
    "desc": "步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数值。深度对标 Vant UI 步进器规范，支持步长、最大最小值、圆角圆圈按钮与动态限制。",
    "demos": [
      {
        "title": "1. 基础移动端步进器与极值禁用 (Basic Stepper: [1 ~ 10], 初始为 1 自动禁用减号)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n        <button id=\"stepMinus1\" disabled style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed; opacity:0.35; color:var(--text-secondary);\" onclick=\"\n          const el = document.getElementById('stepVal1');\n          const m = document.getElementById('stepMinus1');\n          const p = document.getElementById('stepPlus1');\n          let val = Math.max(1, parseInt(el.value || 1) - 1);\n          el.value = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 10);\n          p.style.opacity = (val >= 10) ? '0.35' : '1';\n          p.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">-</button>\n        <input type=\"text\" id=\"stepVal1\" value=\"1\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-primary); font-weight:600;\">\n        <button id=\"stepPlus1\" style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:pointer; color:var(--text-primary);\" onclick=\"\n          const el = document.getElementById('stepVal1');\n          const m = document.getElementById('stepMinus1');\n          const p = document.getElementById('stepPlus1');\n          let val = Math.min(10, parseInt(el.value || 1) + 1);\n          el.value = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 10);\n          p.style.opacity = (val >= 10) ? '0.35' : '1';\n          p.style.cursor = (val >= 10) ? 'not-allowed' : 'pointer';\n        \">+</button>\n      </div>\n    ",
        "code": "# GDScript: 基础步进器\nvar stepper = GStepper.new()\nstepper.value = 1\nstepper.min = 1\nstepper.max = 10\nadd_child(stepper)"
      },
      {
        "title": "2. 步长与最大购买量限制 (Step: 5 & Max: 50, 到 50 自动禁用加号)",
        "render": "\n      <div style=\"display:flex; align-items:center; gap:10px;\">\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n          <button id=\"stepMinus2\" style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('stepVal2');\n            const m = document.getElementById('stepMinus2');\n            const p = document.getElementById('stepPlus2');\n            let val = Math.max(0, parseInt(el.value || 0) - 5);\n            el.value = val;\n            m.disabled = (val <= 0);\n            m.style.opacity = (val <= 0) ? '0.35' : '1';\n            m.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 50);\n            p.style.opacity = (val >= 50) ? '0.35' : '1';\n            p.style.cursor = (val >= 50) ? 'not-allowed' : 'pointer';\n          \">-</button>\n          <input type=\"text\" id=\"stepVal2\" value=\"50\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-primary); font-weight:700;\">\n          <button id=\"stepPlus2\" disabled style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed; opacity:0.35;\" onclick=\"\n            const el = document.getElementById('stepVal2');\n            const m = document.getElementById('stepMinus2');\n            const p = document.getElementById('stepPlus2');\n            let val = Math.min(50, parseInt(el.value || 0) + 5);\n            el.value = val;\n            m.disabled = (val <= 0);\n            m.style.opacity = (val <= 0) ? '0.35' : '1';\n            m.style.cursor = (val <= 0) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 50);\n            p.style.opacity = (val >= 50) ? '0.35' : '1';\n            p.style.cursor = (val >= 50) ? 'not-allowed' : 'pointer';\n          \">+</button>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">步长 5，上限 50 (当前 50 已禁用 + 按钮)</span>\n      </div>\n    ",
        "code": "# GDScript: 步长上限\nstepper.step = 5\nstepper.max = 50\nstepper.value = 50"
      },
      {
        "title": "3. 全局禁用与只读状态 (Disabled & Readonly)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden; opacity:0.4;\">\n        <button style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed;\" disabled>-</button>\n        <input type=\"text\" value=\"0\" readonly style=\"width:40px; border:none; text-align:center; background:var(--bg-card); color:var(--text-secondary);\">\n        <button style=\"border:none; background:var(--bg-surface); padding:6px 14px; cursor:not-allowed;\" disabled>+</button>\n      </div>\n    ",
        "code": "# GDScript: 禁用步进器\nstepper.disabled = true"
      },
      {
        "title": "4. 圆形胶囊形态 (Round Capsule Stepper)",
        "render": "\n      <div style=\"display:inline-flex; align-items:center; gap:8px;\">\n        <button id=\"stepCapM\" style=\"width:28px; height:28px; border-radius:50%; border:none; background:var(--primary); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;\" onclick=\"\n          const el = document.getElementById('stepCapVal');\n          const m = document.getElementById('stepCapM');\n          const p = document.getElementById('stepCapP');\n          let val = Math.max(1, parseInt(el.innerText) - 1);\n          el.innerText = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 5);\n          p.style.opacity = (val >= 5) ? '0.35' : '1';\n          p.style.cursor = (val >= 5) ? 'not-allowed' : 'pointer';\n        \">-</button>\n        <span id=\"stepCapVal\" style=\"font-weight:700; font-size:14px; min-width:24px; text-align:center;\">3</span>\n        <button id=\"stepCapP\" style=\"width:28px; height:28px; border-radius:50%; border:none; background:var(--primary); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;\" onclick=\"\n          const el = document.getElementById('stepCapVal');\n          const m = document.getElementById('stepCapM');\n          const p = document.getElementById('stepCapP');\n          let val = Math.min(5, parseInt(el.innerText) + 1);\n          el.innerText = val;\n          m.disabled = (val <= 1);\n          m.style.opacity = (val <= 1) ? '0.35' : '1';\n          m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n          p.disabled = (val >= 5);\n          p.style.opacity = (val >= 5) ? '0.35' : '1';\n          p.style.cursor = (val >= 5) ? 'not-allowed' : 'pointer';\n        \">+</button>\n      </div>\n    ",
        "code": "# GDScript: 胶囊圆角\nstepper.round = true\nstepper.min = 1\nstepper.max = 5"
      },
      {
        "title": "5. 游戏商店批量购买药水实战 (Game Batch Item Purchase)",
        "render": "\n      <div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n        <div style=\"font-size:13px;\">\n          <div style=\"font-weight:600;\">🧪 特级生命药水</div>\n          <div style=\"font-size:11px; color:#e6a23c;\">单价: 50 🪙</div>\n        </div>\n        <div style=\"display:inline-flex; align-items:center; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\">\n          <button id=\"shopStepM\" style=\"border:none; background:var(--bg-card); padding:4px 10px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('shopStepVal');\n            const m = document.getElementById('shopStepM');\n            const p = document.getElementById('shopStepP');\n            let val = Math.max(1, parseInt(el.innerText) - 1);\n            el.innerText = val;\n            m.disabled = (val <= 1);\n            m.style.opacity = (val <= 1) ? '0.35' : '1';\n            m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 20);\n            p.style.opacity = (val >= 20) ? '0.35' : '1';\n            p.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n          \">-</button>\n          <span id=\"shopStepVal\" style=\"padding:0 8px; font-size:13px; font-weight:700;\">5</span>\n          <button id=\"shopStepP\" style=\"border:none; background:var(--bg-card); padding:4px 10px; cursor:pointer;\" onclick=\"\n            const el = document.getElementById('shopStepVal');\n            const m = document.getElementById('shopStepM');\n            const p = document.getElementById('shopStepP');\n            let val = Math.min(20, parseInt(el.innerText) + 1);\n            el.innerText = val;\n            m.disabled = (val <= 1);\n            m.style.opacity = (val <= 1) ? '0.35' : '1';\n            m.style.cursor = (val <= 1) ? 'not-allowed' : 'pointer';\n            p.disabled = (val >= 20);\n            p.style.opacity = (val >= 20) ? '0.35' : '1';\n            p.style.cursor = (val >= 20) ? 'not-allowed' : 'pointer';\n          \">+</button>\n        </div>\n      </div>\n    ",
        "code": "# GDScript: 商店批量购买步进器\nvar shop_stepper = GStepper.new_shop_item(\"potion\", 50)\nshop_stepper.max = 20"
      }
    ],
    "props": [
      {
        "name": "value",
        "type": "float",
        "default": "1.0",
        "desc": "当前输入值"
      },
      {
        "name": "min_value",
        "type": "float",
        "default": "1.0",
        "desc": "最小值限制"
      },
      {
        "name": "max_value",
        "type": "float",
        "default": "100.0",
        "desc": "最大值限制"
      },
      {
        "name": "step",
        "type": "float",
        "default": "1.0",
        "desc": "点击加减按钮每次变化的步长"
      },
      {
        "name": "integer",
        "type": "boolean",
        "default": "true",
        "desc": "是否只允许输入整数"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用步进器"
      },
      {
        "name": "round_theme",
        "type": "boolean",
        "default": "false",
        "desc": "是否启用圆角/圆圈极简主题风格"
      }
    ],
    "events": [
      {
        "name": "value_changed(val)",
        "desc": "当数值发生改变时触发",
        "params": "(val: float)"
      },
      {
        "name": "overlimit(limit_type)",
        "desc": "当点击加减超出限制范围时触发 (\"min\" / \"max\")",
        "params": "(limit_type: String)"
      }
    ],
    "methods": [
      {
        "name": "set_value(val)",
        "desc": "设置当前步进器数值",
        "params": "(val: float) -> void"
      },
      {
        "name": "get_value()",
        "desc": "获取当前步进器数值",
        "params": "() -> float"
      }
    ],
    "slots": [
      {
        "name": "minus",
        "desc": "步进器减少按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #minus><GIcon name=\"angle-left\" /></template>"
      },
      {
        "name": "plus",
        "desc": "步进器增加按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #plus><GIcon name=\"angle-right\" /></template>"
      },
      {
        "name": "default",
        "desc": "步进器中间数值输入/显示区域插槽",
        "child": "GInput / Label",
        "example": "<template #default><span>Lv. {{ level }}</span></template>"
      }
    ]
  },
  "switch": {
    "title": "Switch 开关 (GSwitch)",
    "desc": "表示两种相互对立的状态间的切换，多用于触发即时动作。支持尺寸切换、自定义色彩与禁用。",
    "demos": [
      {
        "title": "1. 基础开关状态 (Basic Switch)",
        "render": "<div style=\"display:flex; gap:20px; align-items:center;\"><label style=\"position:relative; display:inline-block; width:44px; height:24px; cursor:pointer;\"><input type=\"checkbox\" checked style=\"opacity:0; width:0; height:0;\" onchange=\"this.nextElementSibling.style.background = this.checked ? 'var(--primary)' : 'var(--border-base)'; this.nextElementSibling.firstElementChild.style.transform = this.checked ? 'translateX(20px)' : 'translateX(0)';\"><span style=\"position:absolute; top:0; left:0; right:0; bottom:0; background:var(--primary); border-radius:24px; transition:0.3s;\"><span style=\"position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:white; border-radius:50%; transition:0.3s; transform:translateX(20px);\"></span></span></label><span style=\"font-size:13px; color:var(--text-secondary);\">已开启状态</span></div>",
        "code": "# GDScript: 基础开关\nvar sw = GSwitch.new()\nsw.checked = true\nadd_child(sw)"
      },
      {
        "title": "2. 自定义主题配色 (Custom Active Color)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><span style=\"width:40px; height:22px; background:var(--success); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"width:40px; height:22px; background:var(--warning); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"width:40px; height:22px; background:var(--danger); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span></div>",
        "code": "# GDScript: 自定义色彩\nsw.active_color = GotodTheme.get_color(\"success\")"
      },
      {
        "title": "3. 内嵌文字与图标说明 (Text & Icon Inside Switch)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:56px; height:24px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; justify-content:space-between; padding:0 6px; color:#fff; font-size:10px; font-weight:700;\"><span>开</span><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></div><div style=\"width:56px; height:24px; background:var(--border-base); border-radius:20px; display:inline-flex; align-items:center; justify-content:space-between; padding:0 6px; color:var(--text-secondary); font-size:10px; font-weight:700;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span><span>关</span></div></div>",
        "code": "# GDScript: 内嵌文字\nsw.active_text = \"开\"\nsw.inactive_text = \"关\""
      },
      {
        "title": "4. 禁用状态 (Disabled Switch)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center; opacity:0.4;\"><span style=\"width:40px; height:22px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:18px; height:18px; background:#fff; border-radius:50%;\"></span></span><span style=\"font-size:12px;\">已锁定禁用</span></div>",
        "code": "# GDScript: 禁用开关\nsw.disabled = true"
      },
      {
        "title": "5. 游戏系统音效与震动设置 (Game Audio Settings)",
        "render": "<div style=\"max-width:340px; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); display:flex; flex-direction:column; gap:10px;\"><div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>🎵 背景音乐 (BGM)</span><span style=\"width:36px; height:20px; background:var(--success); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:16px; height:16px; background:#fff; border-radius:50%;\"></span></span></div><div style=\"display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><span>📳 技能命中震动</span><span style=\"width:36px; height:20px; background:var(--primary); border-radius:20px; display:inline-flex; align-items:center; padding:2px; justify-content:flex-end;\"><span style=\"width:16px; height:16px; background:#fff; border-radius:50%;\"></span></span></div></div>",
        "code": "# GDScript: 游戏音效设置\nvar bgm_switch = GSwitch.new()"
      }
    ],
    "props": [
      {
        "name": "checked / v-model",
        "type": "boolean",
        "default": "false",
        "desc": "开关开启状态"
      },
      {
        "name": "switch_size",
        "type": "enum",
        "default": "MEDIUM",
        "desc": "尺寸规格：SMALL, MEDIUM, LARGE"
      },
      {
        "name": "checked_color",
        "type": "Color",
        "default": "TRANSPARENT",
        "desc": "激活状态自定义色彩"
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
        "desc": "开关状态改变时触发",
        "params": "(checked: bool)"
      }
    ],
    "methods": [
      {
        "name": "toggle()",
        "desc": "翻转当前开关状态",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "checked-icon",
        "desc": "开启状态滑块内部图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #checked-icon><GIcon name=\"check\" /></template>"
      },
      {
        "name": "unchecked-icon",
        "desc": "关闭状态滑块内部图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #unchecked-icon><GIcon name=\"xmark\" /></template>"
      },
      {
        "name": "default",
        "desc": "开关右侧伴随文本标签插槽",
        "child": "GText / Label",
        "example": "<template #default><span>开启音效 (SFX)</span></template>"
      }
    ]
  },
  "checkbox": {
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
  },
  "radio": {
    "title": "Radio 单选框 (GRadio & Group)",
    "desc": "在一组备选项中进行单选。配合 GRadioGroup 自动管理选中互斥状态，支持常规圆形圆点与按钮化 (Button Style) 两种形态。",
    "demos": [
      {
        "title": "1. 基础单选框 (Basic Radio)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"radio\" name=\"demo_radio\" checked style=\"accent-color:var(--primary);\"><span>男 (Male)</span></label><label style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;\"><input type=\"radio\" name=\"demo_radio\" style=\"accent-color:var(--primary);\"><span>女 (Female)</span></label></div>",
        "code": "# GDScript: 基础单选框\nvar radio = GRadio.new(\"男\")\nradio.checked = true\nadd_child(radio)"
      },
      {
        "title": "2. 单选框组 (Radio Group)",
        "render": "<div style=\"display:flex; gap:16px; font-size:13px;\"><label><input type=\"radio\" name=\"pay\" checked> 微信支付</label><label><input type=\"radio\" name=\"pay\"> 支付宝</label><label><input type=\"radio\" name=\"pay\"> 游戏金币</label></div>",
        "code": "# GDScript: 单选框组\nvar group = GRadioGroup.new()\ngroup.options = [\"微信支付\", \"支付宝\", \"游戏金币\"]"
      },
      {
        "title": "3. 按钮样式形态 (RadioButton Style)",
        "render": "<div style=\"display:flex; border:1px solid var(--border-base); border-radius:4px; overflow:hidden;\"><button class=\"g-btn g-btn-primary\" style=\"border-radius:0; padding:4px 12px; font-size:12px;\">高清 1080P</button><button class=\"g-btn g-btn-default\" style=\"border-radius:0; border:none; padding:4px 12px; font-size:12px;\">超清 2K</button><button class=\"g-btn g-btn-default\" style=\"border-radius:0; border:none; padding:4px 12px; font-size:12px;\">极致 4K</button></div>",
        "code": "# GDScript: 按钮样式\ngroup.radio_type = GRadioGroup.Type.BUTTON"
      },
      {
        "title": "4. 带边框的单选卡片 (Bordered Radio Card)",
        "render": "<div style=\"display:flex; gap:12px;\"><div style=\"border:1px solid var(--primary); background:rgba(64,158,255,0.05); padding:8px 14px; border-radius:6px; font-size:13px; color:var(--primary); font-weight:600;\">月卡 (¥30)</div><div style=\"border:1px solid var(--border-base); padding:8px 14px; border-radius:6px; font-size:13px; color:var(--text-secondary);\">季卡 (¥88)</div></div>",
        "code": "# GDScript: 边框卡片\nradio.border = true"
      },
      {
        "title": "5. 游戏难度模式选择 (Game Difficulty Selector)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap;\"><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 12px;\">🌱 简单</button><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 12px; font-weight:700;\">⚔️ 普通</button><button class=\"g-btn g-btn-danger\" style=\"font-size:12px; padding:4px 12px;\">🔥 地狱</button></div>",
        "code": "# GDScript: 难度选择\nvar diff_group = GRadioGroup.new_difficulty_selector()"
      }
    ],
    "props": [
      {
        "name": "checked / v-model",
        "type": "boolean",
        "default": "false",
        "desc": "是否被选中"
      },
      {
        "name": "value",
        "type": "String",
        "default": "\"\"",
        "desc": "选项标识绑定值"
      },
      {
        "name": "button_style",
        "type": "boolean",
        "default": "false",
        "desc": "是否开启按钮式外观形态"
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
        "name": "selected()",
        "desc": "被选中时触发",
        "params": "()"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "单选框右侧描述文本插槽",
        "child": "Label / RichTextLabel / Control",
        "example": "<template #default>顺丰次日达 (+ ¥12)</template>"
      },
      {
        "name": "icon",
        "desc": "自定义单选圆点选中状态图标插槽（透传 { checked }）",
        "child": "GIcon / TextureRect",
        "example": "<template #icon=\"{ checked }\"><GIcon :name=\"checked ? 'circle-dot' : 'circle'\" /></template>"
      }
    ]
  },
  "select": {
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
        "desc": "选项数据源 [{\"label\": \"\", \"value\": \"\", \"disabled\": false, \"group\": \"\"}]"
      },
      {
        "name": "selected_index",
        "type": "int",
        "default": "-1",
        "desc": "单选模式下当前选中项的索引"
      },
      {
        "name": "selected_value",
        "type": "Variant",
        "default": "null",
        "desc": "当前选中的具体值 (单选模式)"
      },
      {
        "name": "selected_values",
        "type": "Array",
        "default": "[]",
        "desc": "多选模式下已选中的值列表 Array[Variant]"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "default": "true",
        "desc": "是否支持一键清空选中值 (鼠标悬浮显示 × 图标)"
      },
      {
        "name": "filterable",
        "type": "boolean",
        "default": "true",
        "desc": "是否开启下拉列表实时模糊搜索过滤输入框"
      },
      {
        "name": "multiple",
        "type": "boolean",
        "default": "false",
        "desc": "是否开启多选 Tags 模式"
      },
      {
        "name": "collapse_tags",
        "type": "boolean",
        "default": "false",
        "desc": "多选模式下是否折叠超长标签"
      },
      {
        "name": "max_collapse_tags",
        "type": "int",
        "default": "1",
        "desc": "折叠标签模式下最多展示的 Tag 数量"
      },
      {
        "name": "placeholder_text",
        "type": "String",
        "default": "\"请选择...\"",
        "desc": "选择框未选值时的占位提示文本"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用整个选择器组件（不可点击交互）"
      }
    ],
    "events": [
      {
        "name": "item_selected(index, value, label)",
        "desc": "单选模式下选中新选项时触发",
        "params": "(index: int, value: Variant, label: String)"
      },
      {
        "name": "selection_changed(values)",
        "desc": "选中值集合改变时触发（单选返回单元素数组，多选返回全量数组）",
        "params": "(values: Array)"
      },
      {
        "name": "cleared()",
        "desc": "点击一键清空按钮时触发",
        "params": "()"
      },
      {
        "name": "popup_visibility_changed(is_visible)",
        "desc": "下拉弹窗展开或收起状态改变时触发",
        "params": "(is_visible: bool)"
      }
    ],
    "methods": [
      {
        "name": "add_option(label, value=null, disabled=false, group=\"\")",
        "desc": "动态追加单个下拉选项，支持指定分组与禁用状态",
        "params": "(label: String, value: Variant, disabled: bool, group: String) -> void"
      },
      {
        "name": "add_options(opt_list: Array)",
        "desc": "批量追加一组下拉选项 Array[Dictionary | String]",
        "params": "(opt_list: Array) -> void"
      },
      {
        "name": "clear_options()",
        "desc": "清空全部选项数据与当前选中状态",
        "params": "() -> void"
      },
      {
        "name": "show_popup()",
        "desc": "显式弹出下拉菜单并自动聚焦搜索框",
        "params": "() -> void"
      },
      {
        "name": "toggle_popup()",
        "desc": "切换下拉菜单展开或收起状态",
        "params": "() -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "下拉选择框主体触发器展示内容插槽",
        "child": "Control / GText",
        "example": "<template #default><span>请选择法术流派</span></template>"
      },
      {
        "name": "prefix",
        "desc": "选择框左侧前置图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #prefix><GIcon name=\"wand-magic\" /></template>"
      },
      {
        "name": "arrow",
        "desc": "自定义下拉展开箭头指示器插槽（旋转动画）",
        "child": "GIcon / TextureRect",
        "example": "<template #arrow><GIcon name=\"chevron-down\" /></template>"
      },
      {
        "name": "option",
        "desc": "自定义下拉菜单列表每一项渲染插槽（透传 { item, index }）",
        "child": "Control / HBoxContainer",
        "example": "<template #option=\"{ item }\"><GIcon :name=\"item.icon\" /> {{ item.label }}</template>"
      },
      {
        "name": "empty",
        "desc": "无匹配搜索结果时的空状态插槽",
        "child": "Control / GText",
        "example": "<template #empty><span>未找到相关角色</span></template>"
      }
    ]
  }
});
