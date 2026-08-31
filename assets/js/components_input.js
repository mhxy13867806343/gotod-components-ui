// =========================================================================
// Gotod Components UI - Component: input
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['input'] = {
  "title": "Input 输入框 (GInput)",
  "desc": "通过鼠标或键盘输入字符的基础表单控件。包含基础用法、一键清空、密码切换、带前缀/后缀、校验状态描边、禁用与尺寸控制等完整场景。",
  "demos": [
    {
      "title": "1. 基础输入与禁用状态 (Basic Input & Disabled)",
      "render": "\n      <div style=\"display:flex; gap:12px; max-width:440px; flex-wrap:wrap;\">\n        <input type=\"text\" class=\"g-input\" placeholder=\"请输入玩家昵称...\" style=\"width:200px;\">\n        <input type=\"text\" class=\"g-input\" placeholder=\"已禁用输入\" disabled style=\"width:200px; opacity:0.5;\">\n      </div>\n    ",
      "code": "# GDScript: 基础输入框\nvar input = GInput.new()\ninput.placeholder = \"请输入玩家昵称...\"\nadd_child(input)"
    },
    {
      "title": "2. 状态验证与反馈边框 (Validation Status: Success / Warning / Error)",
      "render": "\n      <div style=\"display:flex; flex-direction:column; gap:12px; max-width:380px;\">\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"Arthur_Legend\" style=\"width:100%; border-color:var(--success); padding-right:32px;\">\n            <i class=\"fa-solid fa-circle-check\" style=\"position:absolute; right:10px; top:10px; color:var(--success);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--success); margin-top:2px; display:block;\">✓ 昵称格式正确且未被占用</span>\n        </div>\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"13800\" style=\"width:100%; border-color:var(--warning); padding-right:32px;\">\n            <i class=\"fa-solid fa-triangle-exclamation\" style=\"position:absolute; right:10px; top:10px; color:var(--warning);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--warning); margin-top:2px; display:block;\">⚠ 手机号位数不足 11 位</span>\n        </div>\n        <div>\n          <div style=\"position:relative;\">\n            <input type=\"text\" class=\"g-input\" value=\"invalid_email@\" style=\"width:100%; border-color:var(--danger); padding-right:32px;\">\n            <i class=\"fa-solid fa-circle-xmark\" style=\"position:absolute; right:10px; top:10px; color:var(--danger);\"></i>\n          </div>\n          <span style=\"font-size:11px; color:var(--danger); margin-top:2px; display:block;\">✗ 请输入有效的电子邮箱格式 (xxx@domain.com)</span>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 状态校验\ninput.status = GInput.Status.ERROR # SUCCESS, WARNING, ERROR\ninput.status_message = \"请输入有效的电子邮箱\""
    },
    {
      "title": "3. 正则表达式实时格式校验 (Regex Realtime Validation)",
      "render": "\n      <div style=\"max-width:380px;\">\n        <input type=\"text\" class=\"g-input\" id=\"regInput\" placeholder=\"输入 6~16 位英文+数字账号...\" style=\"width:100%;\" oninput=\"\n          const val = this.value;\n          const reg = /^[a-zA-Z0-9]{6,16}$/;\n          const tip = document.getElementById('regTip');\n          if (!val) {\n            this.style.borderColor = 'var(--border-base)';\n            tip.innerText = '格式要求：6~16 位英文字母与数字组合';\n            tip.style.color = 'var(--text-secondary)';\n          } else if (reg.test(val)) {\n            this.style.borderColor = 'var(--success)';\n            tip.innerText = '✓ 账号格式合法！';\n            tip.style.color = 'var(--success)';\n          } else {\n            this.style.borderColor = 'var(--danger)';\n            tip.innerText = '✗ 格式错误：只能包含 6~16 位英文或数字！';\n            tip.style.color = 'var(--danger)';\n          }\n        \">\n        <span id=\"regTip\" style=\"font-size:11px; color:var(--text-secondary); margin-top:4px; display:block;\">格式要求：6~16 位英文字母与数字组合</span>\n      </div>\n    ",
      "code": "# GDScript: 正则校验规则\ninput.validation_pattern = \"^[a-zA-Z0-9]{6,16}$\"\ninput.validate_on_input = true\ninput.validation_failed.connect(func(err): print(\"校验失败:\", err))"
    },
    {
      "title": "4. 异步防抖远程查重校验 (Async Validator: Username Availability Check)",
      "render": "\n      <div style=\"max-width:380px;\">\n        <div style=\"position:relative;\">\n          <input type=\"text\" class=\"g-input\" id=\"asyncInput\" placeholder=\"输入玩家昵称实时查重...\" style=\"width:100%; padding-right:32px;\" oninput=\"\n            const spin = document.getElementById('asyncSpin');\n            const tip = document.getElementById('asyncTip');\n            spin.style.display = 'block';\n            tip.innerText = '正在向服务器校验昵称唯一性...';\n            tip.style.color = 'var(--text-secondary)';\n            clearTimeout(window.asyncTimer);\n            window.asyncTimer = setTimeout(() => {\n              spin.style.display = 'none';\n              if (document.getElementById('asyncInput').value === 'admin' || document.getElementById('asyncInput').value === 'godot') {\n                document.getElementById('asyncInput').style.borderColor = 'var(--danger)';\n                tip.innerText = '✗ 该昵称已被其他玩家注册，请更换！';\n                tip.style.color = 'var(--danger)';\n              } else {\n                document.getElementById('asyncInput').style.borderColor = 'var(--success)';\n                tip.innerText = '✓ 该昵称可以使用！';\n                tip.style.color = 'var(--success)';\n              }\n            }, 600);\n          \">\n          <i id=\"asyncSpin\" class=\"fa-solid fa-spinner fa-spin\" style=\"display:none; position:absolute; right:10px; top:10px; color:var(--primary);\"></i>\n        </div>\n        <span id=\"asyncTip\" style=\"font-size:11px; color:var(--text-secondary); margin-top:4px; display:block;\">输入昵称后自动联网查重</span>\n      </div>\n    ",
      "code": "# GDScript: 异步防抖远程查重\ninput.debounce_time = 0.5\ninput.set_async_validator(func(val):\n    var res = await Network.check_username(val)\n    return res.is_available\n)"
    },
    {
      "title": "5. 复合型插槽矩阵 (Compound Slots: #prepend / #append / #prefix / #suffix)",
      "render": "\n    <div style=\"display:flex; flex-direction:column; gap:12px; max-width:420px;\">\n      <!-- Prepend + Append Slot -->\n      <div>\n        <div style=\"font-size:11px; color:var(--text-secondary); margin-bottom:4px;\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--primary);\"></i> #prepend (前置选择) + #append (后置按钮)</div>\n        <div style=\"display:flex; border:1px solid var(--border-base); border-radius:6px; overflow:hidden;\">\n          <select style=\"background:var(--bg-surface); border:none; border-right:1px solid var(--border-base); font-size:12px; padding:0 8px; color:var(--text-primary); outline:none;\">\n            <option>https://</option>\n            <option>http://</option>\n          </select>\n          <input type=\"text\" value=\"api.godot-game.com/v1\" style=\"flex:1; border:none; background:transparent; padding:6px 10px; font-size:12px; color:var(--text-primary); outline:none;\">\n          <button class=\"g-btn g-btn-primary\" style=\"border-radius:0; font-size:11px; padding:0 12px;\" onclick=\"showToast('正在测试 API 连通性...', 'info')\">测试连接</button>\n        </div>\n      </div>\n\n      <!-- Prefix + Suffix Slot -->\n      <div>\n        <div style=\"font-size:11px; color:var(--text-secondary); margin-bottom:4px;\"><i class=\"fa-solid fa-puzzle-piece\" style=\"color:var(--warning);\"></i> #prefix (前置图标) + #suffix (后置单位与复制)</div>\n        <div style=\"display:flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:0 10px;\">\n          <i class=\"fa-solid fa-coins\" style=\"color:#e6a23c; margin-right:8px; font-size:13px;\"></i>\n          <input type=\"number\" value=\"88800\" style=\"flex:1; border:none; background:transparent; padding:6px 0; font-size:12px; color:var(--text-primary); font-weight:700; outline:none;\">\n          <span style=\"font-size:11px; color:var(--warning); font-weight:600; margin-right:8px;\">金币</span>\n          <button class=\"g-btn g-btn-default\" style=\"padding:2px 6px; font-size:10px;\" onclick=\"navigator.clipboard.writeText('88800'); showToast('金币数已复制！', 'success')\"><i class=\"fa-solid fa-copy\"></i></button>\n        </div>\n      </div>\n    </div>\n  ",
      "code": "# GDScript: 使用复合型插槽 (Prepend / Append / Prefix / Suffix)\nvar input = GInput.new()\n\n# 1. 挂载 Prepend 前置大区选择器插槽\ninput.slotName = \"prepend\"\ninput.prepend.add_child(region_select)\n\n# 2. 挂载 Append 后置搜索按钮插槽\ninput.slotName = \"append\"\ninput.append.add_child(search_btn)\n\n# 3. 挂载 Prefix / Suffix 图标与货币单位插槽\ninput.prefix_icon = \"coins\"\ninput.suffix_text = \"金币\""
    },
    {
      "title": "5. 密码显隐与强弱程度检测 (Password Toggle & Strength Indicator)",
      "render": "\n      <div style=\"max-width:360px; display:flex; flex-direction:column; gap:6px;\">\n        <div class=\"icon-search-wrapper\" style=\"width:100%;\">\n          <input type=\"password\" class=\"g-input\" id=\"pwdInputVal\" value=\"Godot4UI@\" style=\"width:100%; padding-right:32px;\" oninput=\"\n            const v = this.value;\n            const bar = document.getElementById('pwdBar');\n            let score = 0;\n            if (v.length >= 6) score += 33;\n            if (/[A-Z]/.test(v) && /[0-9]/.test(v)) score += 33;\n            if (/[^a-zA-Z0-9]/.test(v)) score += 34;\n            bar.style.width = score + '%';\n            bar.style.background = score > 70 ? 'var(--success)' : (score > 35 ? 'var(--warning)' : 'var(--danger)');\n          \">\n          <span style=\"position:absolute; right:8px; cursor:pointer; color:var(--text-secondary);\" onclick=\"const p=document.getElementById('pwdInputVal'); p.type=p.type==='password'?'text':'password';\">\n            <i class=\"fa-solid fa-eye\"></i>\n          </span>\n        </div>\n        <div style=\"background:var(--bg-surface); height:4px; border-radius:2px; overflow:hidden;\">\n          <div id=\"pwdBar\" style=\"background:var(--success); width:100%; height:100%; transition:all 0.3s;\"></div>\n        </div>\n        <span style=\"font-size:11px; color:var(--text-secondary);\">密码强度：强 (包含大写字母、数字及特殊符号)</span>\n      </div>\n    ",
      "code": "# GDScript: 密码强度校验\ninput.show_password = true\ninput.enable_strength_meter = true"
    },
    {
      "title": "6. 一键清空与前后缀插槽 (Clearable & Suffix Slots)",
      "render": "\n      <div style=\"display:flex; flex-direction:column; gap:10px; max-width:360px;\">\n        <div class=\"icon-search-wrapper\" style=\"width:100%;\">\n          <input type=\"text\" class=\"g-input\" value=\"弑神者·亚瑟\" style=\"width:100%; padding-right:28px;\" oninput=\"this.nextElementSibling.style.display=this.value?'block':'none'\">\n          <span style=\"position:absolute; right:8px; cursor:pointer; color:var(--text-secondary);\" onclick=\"this.previousElementSibling.value=''; this.style.display='none';\">\n            <i class=\"fa-solid fa-circle-xmark\"></i>\n          </span>\n        </div>\n        <div style=\"display:flex; align-items:center; background:var(--bg-card); border:1px solid var(--border-base); border-radius:4px; padding:0 8px;\">\n          <input type=\"number\" class=\"g-input\" value=\"5000\" style=\"border:none; background:none; flex:1; font-size:12px;\">\n          <span style=\"color:var(--warning); font-size:12px; font-weight:700;\">🪙 金币</span>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 一键清空与插槽\ninput.clearable = true\ninput.suffix_text = \"🪙 金币\""
    },
    {
      "title": "7. 游戏控制台命令行输入框 (Game Dev Console Command Input)",
      "render": "\n      <div style=\"max-width:400px; background:#0f172a; border:1px solid #334155; border-radius:6px; padding:6px 10px; display:flex; align-items:center; gap:8px;\">\n        <span style=\"color:#22c55e; font-family:monospace; font-weight:700;\">root@game:~#</span>\n        <input type=\"text\" value=\"spawn_boss --type=dragon --level=100\" style=\"background:none; border:none; color:#f8fafc; font-family:monospace; font-size:12px; flex:1; outline:none;\" onkeydown=\"if(event.key==='Enter') showToast('已执行指令: 生成 100 级魔龙 BOSS！', 'success')\">\n        <button class=\"g-btn g-btn-primary\" style=\"padding:2px 8px; font-size:10px;\" onclick=\"showToast('指令执行完毕！', 'success')\">执行 (Enter)</button>\n      </div>\n    ",
      "code": "# GDScript: 游戏指令输入框\nvar console_input = GInput.new_console_command()"
    }
  ],
  "props": [
    {
      "name": "text / v-model",
      "type": "String",
      "default": "\"\"",
      "desc": "输入框绑定的文本内容"
    },
    {
      "name": "placeholder_text",
      "type": "String",
      "default": "\"Please input...\"",
      "desc": "输入框占位文本"
    },
    {
      "name": "clearable",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示一键清空按钮"
    },
    {
      "name": "secret / show-password",
      "type": "boolean",
      "default": "false",
      "desc": "是否为密码密文模式"
    },
    {
      "name": "show_password_toggle",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示密码切换眼睛图标"
    },
    {
      "name": "prefix_text",
      "type": "String",
      "default": "\"\"",
      "desc": "前缀文本"
    },
    {
      "name": "suffix_text",
      "type": "String",
      "default": "\"\"",
      "desc": "后缀文本"
    },
    {
      "name": "status",
      "type": "enum",
      "default": "DEFAULT",
      "desc": "校验边框状态：DEFAULT, ERROR, WARNING, SUCCESS"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用输入"
    },
    {
      "name": "max_length",
      "type": "int",
      "default": "0",
      "desc": "最大字符输入长度限制 (0 为不限制)"
    },
    {
      "name": "status",
      "type": "GInput.Status",
      "default": "NORMAL",
      "desc": "校验状态 (NORMAL / SUCCESS / WARNING / ERROR)"
    },
    {
      "name": "status_message",
      "type": "String",
      "default": "\"\"",
      "desc": "校验失败提示文案"
    },
    {
      "name": "validation_pattern",
      "type": "String",
      "default": "\"\"",
      "desc": "正则表达式校验规则"
    },
    {
      "name": "validate_on_input",
      "type": "bool",
      "default": "false",
      "desc": "输入时是否实时触发校验"
    }
  ],
  "events": [
    {
      "name": "text_changed(new_text)",
      "desc": "输入文本改变时触发",
      "params": "(new_text: String)"
    },
    {
      "name": "text_submitted(new_text)",
      "desc": "按回车提交时触发",
      "params": "(new_text: String)"
    },
    {
      "name": "cleared()",
      "desc": "点击清除按钮时触发",
      "params": "()"
    },
    {
      "name": "focus_entered()",
      "desc": "输入框获取焦点时触发",
      "params": "()"
    },
    {
      "name": "focus_exited()",
      "desc": "输入框失去焦点时触发",
      "params": "()"
    }
  ],
  "methods": [
    {
      "name": "clear()",
      "desc": "清空当前输入框内容并发出 cleared 信号",
      "params": "() -> void"
    },
    {
      "name": "grab_focus()",
      "desc": "使输入框获取焦点并调出光标",
      "params": "() -> void"
    },
    {
      "name": "select_all()",
      "desc": "全选输入框内的所有文本",
      "params": "() -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "输入框主体控件插槽",
      "child": "LineEdit / Control",
      "example": "<template #default><LineEdit placeholder=\"请输入...\" /></template>"
    },
    {
      "name": "prefix",
      "desc": "输入框内嵌前置图标/文字插槽 (Prefix Slot)",
      "child": "GIcon / GText / TextureRect",
      "example": "<template #prefix><GIcon name=\"magnifying-glass\" /></template>"
    },
    {
      "name": "suffix",
      "desc": "输入框内嵌后置图标/操作按钮/单位插槽 (Suffix Slot)",
      "child": "GIcon / GButton / GText",
      "example": "<template #suffix><GText>🪙 金币</GText></template>"
    },
    {
      "name": "prepend",
      "desc": "输入框外置前置复合控件插槽 (如下拉选择协议头、大区选择) (Prepend Slot)",
      "child": "GSelect / GButton / Control",
      "example": "<template #prepend><GSelect options=\"https://,http://\" /></template>"
    },
    {
      "name": "append",
      "desc": "输入框外置后置复合按钮插槽 (如一键搜索按钮、发送验证码按钮) (Append Slot)",
      "child": "GButton / Control",
      "example": "<template #append><GButton type=\"primary\">搜索</GButton></template>"
    }
  ]
};
