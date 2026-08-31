// =========================================================================
// Gotod Components UI - Component: button
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['button'] = {
  "title": "Button 按钮 (GButton)",
  "desc": "常用的操作按钮，融合 Element Plus、Naive UI、Ant Design 与 Vant 规范。包含基础类型、朴素/边框按钮、圆角/圆形胶囊、禁用/加载、不同尺寸以及通栏全宽等全部场景。",
  "demos": [
    {
      "title": "1. 基础类型 (Basic Types: Primary / Success / Warning / Danger / Info)",
      "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-default\" onclick=\"showToast('Default button')\">Default 默认</button>\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('Primary button', 'success')\">Primary 主要</button>\n            <button class=\"g-btn g-btn-success\" onclick=\"showToast('Success button', 'success')\">Success 成功</button>\n            <button class=\"g-btn g-btn-warning\" onclick=\"showToast('Warning button', 'warning')\">Warning 警告</button>\n            <button class=\"g-btn g-btn-danger\" onclick=\"showToast('Danger button', 'danger')\">Danger 危险</button>\n            <button class=\"g-btn g-btn-info\" onclick=\"showToast('Info button', 'info')\">Info 信息</button>\n          </div>\n        ",
      "code": "# GDScript: Basic Types\nvar btn_primary = GButton.new()\nbtn_primary.text = \"Primary\"\nbtn_primary.button_type = GButton.ButtonType.PRIMARY\nbtn_primary.pressed.connect(func(): GMessage.success(\"Primary clicked\"))\nadd_child(btn_primary)"
    },
    {
      "title": "2. 朴素与变体形态 (Variants: Solid / Outline / Dashed / Text / Link)",
      "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\">Solid 实心</button>\n            <button class=\"g-btn g-btn-outline\" onclick=\"showToast('Outline')\">Outline 边框</button>\n            <button class=\"g-btn g-btn-dashed\" onclick=\"showToast('Dashed')\">Dashed 虚线</button>\n            <button class=\"g-btn g-btn-text\" onclick=\"showToast('Text')\">Text 纯文本</button>\n            <button class=\"g-btn g-btn-text\" style=\"text-decoration:underline;\" onclick=\"showToast('Link')\">Link 链接</button>\n          </div>\n        ",
      "code": "# GDScript: Variants\nvar outline = GButton.new()\noutline.text = \"Outline\"\noutline.variant = GButton.Variant.OUTLINE\nadd_child(outline)"
    },
    {
      "title": "3. 圆角与圆形按钮 (Shapes: Round / Circle / Square)",
      "render": "\n          <div style=\"display:flex; gap:12px; align-items:center; flex-wrap:wrap;\">\n            <button class=\"g-btn g-btn-primary g-btn-round\" onclick=\"showToast('Round Pill')\">Round 胶囊圆角</button>\n            <button class=\"g-btn g-btn-success g-btn-round\" onclick=\"showToast('Success Pill')\">Success 胶囊</button>\n            <button class=\"g-btn g-btn-primary g-btn-round\" style=\"width:36px; height:36px; padding:0;\"><i class=\"fa-solid fa-shapes\"></i></button>\n            <button class=\"g-btn g-btn-danger g-btn-round\" style=\"width:36px; height:36px; padding:0;\"><i class=\"fa-solid fa-heart\"></i></button>\n          </div>\n        ",
      "code": "# GDScript: Shapes\nvar pill = GButton.new()\npill.text = \"Round Pill\"\npill.shape = GButton.Shape.ROUND\nadd_child(pill)"
    },
    {
      "title": "4. 加载状态与禁用 (Loading & Disabled)",
      "render": "\n          <div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\"><i class=\"fa-solid fa-spinner fa-spin\"></i> Loading 加载中</button>\n            <button class=\"g-btn g-btn-success\"><i class=\"fa-solid fa-spinner fa-spin\"></i> Loading 成功</button>\n            <button class=\"g-btn g-btn-primary\" style=\"opacity:0.5; cursor:not-allowed;\" disabled>Disabled 禁用</button>\n            <button class=\"g-btn g-btn-default\" style=\"opacity:0.5; cursor:not-allowed;\" disabled>Disabled 默认</button>\n          </div>\n        ",
      "code": "# GDScript: Loading & Disabled\nvar load_btn = GButton.new()\nload_btn.text = \"Loading\"\nload_btn.loading = true\nadd_child(load_btn)"
    },
    {
      "title": "5. 通栏全宽按钮 (Block Button: block=\"true\")",
      "render": "\n          <div style=\"width:100%; display:flex; flex-direction:column; gap:10px;\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:100%;\">Block Primary Button (100% 宽度)</button>\n            <button class=\"g-btn g-btn-default\" style=\"width:100%;\">Block Default Button</button>\n          </div>\n        ",
      "code": "# GDScript: Block Button\nvar block_btn = GButton.new()\nblock_btn.text = \"Full Width\"\nblock_btn.block = true\nadd_child(block_btn)"
    },
    {
      "title": "6. 插槽自定义内容 (Custom Slot Usage: #default & #icon & #loading)",
      "render": "\n          <div style=\"display:flex; gap:14px; flex-wrap:wrap; align-items:center;\">\n            <!-- #icon + #default slot -->\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('点击了自定义插槽按钮', 'success')\">\n              <i class=\"fa-solid fa-cart-shopping\"></i>\n              <span>购买强化石 <b style=\"color:#fcd34d; margin-left:4px;\">¥99</b></span>\n            </button>\n\n            <!-- Custom #icon slot with Badge -->\n            <button class=\"g-btn g-btn-default\" onclick=\"showToast('点击了带角标插槽按钮')\">\n              <span style=\"position:relative; display:inline-flex; align-items:center;\">\n                <i class=\"fa-solid fa-bell\"></i>\n                <span style=\"position:absolute; top:-4px; right:-6px; width:6px; height:6px; background:var(--danger); border-radius:50%;\"></span>\n              </span>\n              <span style=\"margin-left:6px;\">消息通知</span>\n            </button>\n\n            <!-- Custom #loading slot -->\n            <button class=\"g-btn g-btn-warning\">\n              <i class=\"fa-solid fa-circle-notch fa-spin\" style=\"color:#fff;\"></i>\n              <span style=\"margin-left:6px;\">同步云存档中...</span>\n            </button>\n          </div>\n        ",
      "code": "<!-- 方式 1: Vue 3 模板插槽语法 (Vue Template Slots) -->\n<GButton type=\"primary\">\n  <template #icon>\n    <GIcon name=\"cart-shopping\" color=\"yellow\" />\n  </template>\n  <template #default>\n    <span>购买强化石 <b style=\"color:#fcd34d;\">¥99</b></span>\n  </template>\n</GButton>\n\n# 方式 2: Godot GDScript 点语法直接配置 Slot (Dot Slot Property Syntax)\nvar btn = GButton.new()\nbtn.button_type = GButton.ButtonType.PRIMARY\n\n# 1. 默认插槽配置 (默认无名字 default slot)\nbtn.slotName = \"\"              # 默认 default 插槽\nbtn.slotName.text = \"购买强化石\"\nbtn.slotName.color = \"white\"\n\n# 2. 具名插槽配置 (Named slot: icon)\nbtn.slotName = \"icon\"\nbtn.icon.name = \"cart-shopping\"\nbtn.icon.color = \"yellow\"\n\n# 3. 自定义具名插槽绑定与赋值 (Custom Slot: t1)\nbtn.slotName = \"t1\"\nbtn.t1.color = \"#fcd34d\"\nbtn.t1.text = 99               # 直接修改插槽文本与色彩"
    }
  ],
  "props": [
    {
      "name": "button_type / type",
      "type": "enum",
      "default": "DEFAULT",
      "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO"
    },
    {
      "name": "variant",
      "type": "enum",
      "default": "SOLID",
      "desc": "形态样式：SOLID (实心), OUTLINE (描边), DASHED (虚线), TEXT (文字), LINK (链接)"
    },
    {
      "name": "button_size / size",
      "type": "enum",
      "default": "MEDIUM",
      "desc": "尺寸规格：SMALL, MEDIUM, LARGE"
    },
    {
      "name": "shape",
      "type": "enum",
      "default": "DEFAULT",
      "desc": "形状：DEFAULT, ROUND (胶囊), CIRCLE (圆), SQUARE (方)"
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "desc": "是否进入加载动画状态并禁用点击"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用按钮交互"
    },
    {
      "name": "block",
      "type": "boolean",
      "default": "false",
      "desc": "是否充满父级容器全宽"
    },
    {
      "name": "icon_texture / icon",
      "type": "Texture2D",
      "default": "null",
      "desc": "按钮图标纹理"
    }
  ],
  "events": [
    {
      "name": "pressed()",
      "desc": "按钮被点击时触发",
      "params": "()"
    }
  ],
  "methods": [
    {
      "name": "set_loading(is_loading: bool)",
      "desc": "动态开启或关闭按钮加载动画",
      "params": "(is_loading: bool) -> void"
    },
    {
      "name": "set_disabled(is_disabled: bool)",
      "desc": "动态禁用或启用按钮",
      "params": "(is_disabled: bool) -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "按钮内部文字或自定义节点插槽",
      "child": "GText / Label / Control",
      "example": "<template #default>确认支付 ¥99</template>"
    },
    {
      "name": "icon",
      "desc": "按钮前置自定义图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #icon><GIcon name=\"bag-shopping\" /></template>"
    },
    {
      "name": "loading",
      "desc": "自定义加载中动画或占位插槽",
      "child": "GLoading / TextureProgressBar",
      "example": "<template #loading><GLoading size=\"14\" /></template>"
    }
  ]
};
