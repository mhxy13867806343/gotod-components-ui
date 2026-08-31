// =========================================================================
// Gotod Components UI - Component: stepper
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['stepper'] = {
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
};
