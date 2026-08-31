// =========================================================================
// Gotod Components UI - Component: tag
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tag'] = {
  "title": "Tag 标签 (GTag)",
  "desc": "用于标记和选择。支持 Light, Outline, Solid 三种质感及动态添加/关闭操作。",
  "demos": [
    {
      "title": "1. 快速构建与三大调用形态 (Quick Build: xx(str) / xx(opts) / xx(a,b,c))",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\">Primary 主要</span><span class=\"g-tag g-tag-success\">Success 成功</span><span class=\"g-tag g-tag-warning\">Warning 警告</span><span class=\"g-tag g-tag-danger\">Danger 危险</span><span class=\"g-tag g-tag-info\">Info 消息</span></div>",
      "code": "# 方式 1: 单一文本参数快捷构建\nvar tag1 = GTag.create(\"热销新品\")\n\n# 方式 2: 完整字典配置对象\nvar tag2 = GTag.create({\n    \"text\": \"SSR 传说\",\n    \"type\": \"warning\",\n    \"variant\": GTag.Variant.SOLID,\n    \"closable\": true\n})\n\n# 方式 3: 多参数位置传参 (文本, 类型, 是否可关闭)\nvar tag3 = GTag.create(\"火系魔法\", \"danger\", true)"
    },
    {
      "title": "2. 可关闭标签 (Closable Tags)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px;\">火系魔法 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了火系魔法标签', 'info')\"></i></span><span class=\"g-tag g-tag-success\" style=\"display:inline-flex; align-items:center; gap:6px;\">疾风步 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了疾风步标签', 'info')\"></i></span></div>",
      "code": "# GDScript: 可移除标签\ntag.closable = true"
    },
    {
      "title": "3. 尺寸与圆角形态 (Sizes: Small / Default / Large / Round)",
      "render": "<div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"padding:1px 6px; font-size:11px;\">Small 迷你</span><span class=\"g-tag g-tag-primary\" style=\"padding:3px 8px; font-size:12px;\">Default 默认</span><span class=\"g-tag g-tag-primary\" style=\"padding:6px 12px; font-size:14px;\">Large 大型</span><span class=\"g-tag g-tag-success\" style=\"border-radius:16px; padding:3px 12px;\">Round 胶囊圆角</span></div>",
      "code": "# GDScript: 尺寸设定\ntag.size = GTag.Size.SMALL\ntag.round = true"
    },
    {
      "title": "4. 朴素描边模式 (Plain / Outline Tags)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--primary); color:var(--primary);\">朴素主要</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--success); color:var(--success);\">朴素成功</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--danger); color:var(--danger);\">朴素危险</span></div>",
      "code": "# GDScript: 朴素边框\ntag.plain = true"
    },
    {
      "title": "5. 游戏品质稀有度标签 (Game Rarity Tags)",
      "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:#4b5563; color:#fff; font-weight:600;\">普通 (N)</span><span class=\"g-tag\" style=\"background:#2563eb; color:#fff; font-weight:600;\">精良 (R)</span><span class=\"g-tag\" style=\"background:#9333ea; color:#fff; font-weight:600;\">史诗 (SR)</span><span class=\"g-tag\" style=\"background:linear-gradient(90deg, #d97706, #f59e0b); color:#fff; font-weight:700; box-shadow:0 0 8px rgba(245,158,11,0.5);\">传说 (SSR)</span></div>",
      "code": "# GDScript: 稀有度标签\nvar ssr_tag = GTag.new(\"传说 (SSR)\")"
    },
    {
      "title": "6. 动态可编辑新增标签 (Dynamic Editable Tag Group)",
      "render": "<div style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap;\"><span class=\"g-tag g-tag-primary\">战士</span><span class=\"g-tag g-tag-primary\">法师</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\" onclick=\"showToast('添加新标签', 'info')\">+ 新增标签</button></div>",
      "code": "# GDScript: 动态标签\ntag_group.add_tag(\"刺客\")"
    }
  ],
  "props": [
    {
      "name": "text",
      "type": "String",
      "default": "\"Tag\"",
      "desc": "标签文本",
      "version": "v1.0"
    },
    {
      "name": "type",
      "type": "enum",
      "default": "DEFAULT",
      "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO",
      "version": "v1.0"
    },
    {
      "name": "variant",
      "type": "enum",
      "default": "LIGHT",
      "desc": "质感风格：LIGHT, OUTLINE, SOLID",
      "version": "v1.0"
    },
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示关闭按钮",
      "version": "v1.0"
    },
    {
      "name": "round",
      "type": "boolean",
      "default": "false",
      "desc": "是否圆角胶囊形态",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "closed()",
      "desc": "点击关闭按钮时触发",
      "params": "()",
      "version": "v1.0"
    },
    {
      "name": "clicked()",
      "desc": "点击标签本身时触发",
      "params": "()",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "create(text_or_options: Variant, type: Variant = null, closable: Variant = null) -> GTag",
      "desc": "静态多态构建工厂方法。支持单文本参数、字典配置对象、多参数位置传递三种形态",
      "params": "(text_or_options: Variant, type: Variant = null, closable: Variant = null) -> GTag",
      "version": "v1.0.6"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "标签内部文字或内容插槽",
      "child": "Label / Control",
      "example": "<template #default>Godot 4.3 渲染引擎</template>",
      "version": "v1.0"
    },
    {
      "name": "icon",
      "desc": "标签前置图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #icon><GIcon name=\"fire\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "close-icon",
      "desc": "自定义可关闭标签的关闭按钮插槽",
      "child": "GIcon / GButton",
      "example": "<template #close-icon><GIcon name=\"xmark\" /></template>",
      "version": "v1.0"
    }
  ]
};
