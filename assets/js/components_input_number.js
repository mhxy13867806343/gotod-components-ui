// =========================================================================
// Gotod Components UI - Component: input-number
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['input-number'] = {
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
      "desc": "当前数值",
      "version": "v1.0"
    },
    {
      "name": "min_value / min",
      "type": "float",
      "default": "0.0",
      "desc": "最小值",
      "version": "v1.2"
    },
    {
      "name": "max_value / max",
      "type": "float",
      "default": "100.0",
      "desc": "最大值",
      "version": "v1.2"
    },
    {
      "name": "step",
      "type": "float",
      "default": "1.0",
      "desc": "步进值",
      "version": "v1.0"
    },
    {
      "name": "precision",
      "type": "int",
      "default": "0",
      "desc": "小数数值精度",
      "version": "v1.2"
    }
  ],
  "events": [
    {
      "name": "value_changed(new_value)",
      "desc": "数值改变时触发",
      "params": "(new_value: float)",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "increase()",
      "desc": "数值按 step 增加",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "decrease()",
      "desc": "数值按 step 减少",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "decrease-icon",
      "desc": "自定义递减按钮图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #decrease-icon><GIcon name=\"minus\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "increase-icon",
      "desc": "自定义递增按钮图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #increase-icon><GIcon name=\"plus\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "prefix",
      "desc": "输入框前置单位插槽（如货币符号 ¥）",
      "child": "GText / Label",
      "example": "<template #prefix>¥</template>",
      "version": "v1.0"
    },
    {
      "name": "suffix",
      "desc": "输入框后置单位插槽（如计量单位“件/个”）",
      "child": "GText / Label",
      "example": "<template #suffix>件</template>",
      "version": "v1.0"
    }
  ]
};
