// =========================================================================
// Gotod Components UI - Component: icon
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['icon'] = {
  "title": "Icon 矢量图标 (GIcon)",
  "desc": "专为 Godot 4 打造的高性能全场景矢量图标组件。现已全量集成 25,988+ 款分类矢量图标库（Godot @icons、GameIcons、Tabler、Lucide、FontAwesome、Remix、IconPark、Pixel、Brands 等），支持多子目录智能自动寻址与下划线/中划线模糊自愈。同时支持原生 SVG XML 字符串直接解析与动态加载渲染（零文件依赖）！",
  "demos": [
    {
      "title": "1. 26,000+ 本地离线图库 & 原生 SVG 字符串全能构建中心",
      "render": "\n          <div class=\"icon-gallery-container\" id=\"iconGalleryContainer\">\n            <div style=\"display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text-regular); background:rgba(64, 158, 255, 0.08); border:1px solid rgba(64, 158, 255, 0.25); border-radius:var(--radius); padding:8px 14px;\">\n              <i class=\"fa-solid fa-circle-info\" style=\"color:var(--primary); font-size:14px;\"></i>\n              <span>💡 <strong>全量集成提示</strong>：插件已完整集成 25,988+ 极限压缩矢量图标库并支持<strong>原生 SVG 字符串直接动态加载</strong>！点击卡片即可一键复制 GDScript、@icon 注解或 SVG 源码！</span>\n            </div>\n\n            <!-- Copy Format & Quick Tools -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:8px 12px; font-size:12px;\">\n              <div style=\"display:flex; align-items:center; gap:6px; flex-wrap:wrap;\">\n                <span style=\"font-weight:600; color:var(--text-primary);\">📋 点击复制格式:</span>\n                <div style=\"display:flex; gap:4px;\" id=\"copyFormatBtnGroup\">\n                  <button class=\"icon-category-btn active\" onclick=\"window.setCopyFormat('gdscript', this)\" title=\"复制 GIcon 实例化代码\">GDScript 实例</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('annotation', this)\" title=\"复制 @icon 注解路径\">@icon 注解</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('csharp', this)\" title=\"复制 C# 实例化代码\">C# (.NET)</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('bbcode', this)\" title=\"复制富文本 [img] 标签\">BBCode [img]</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('svg', this)\" title=\"复制原生 SVG 源码\">SVG 源码</button>\n                  <button class=\"icon-category-btn\" onclick=\"window.setCopyFormat('datauri', this)\" title=\"复制 Base64 DataURI\">Base64 DataURI</button>\n                </div>\n              </div>\n              <div style=\"display:flex; align-items:center; gap:8px;\">\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('favorites', this)\" style=\"color:#f59e0b; font-weight:600;\">\n                  <i class=\"fa-solid fa-star\"></i> ⭐ 我的收藏\n                </button>\n              </div>\n            </div>\n\n            <!-- Library Source Selector -->\n            <div style=\"display:flex; gap:6px; flex-wrap:wrap; align-items:center;\">\n              <span style=\"font-size:12px; font-weight:600; color:var(--text-secondary);\">10 大主流图库:</span>\n              <button class=\"icon-category-btn active\" onclick=\"window.filterIconLib('all', this)\">全部图库 (<span id=\"iconCountBadge\">26,000+</span>)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('gameicons', this)\">⚔️ GameIcons RPG (4,134+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('pixel', this)\">👾 PixelArt 像素 (1,306+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('nieobie', this)\">🎒 Nieobie 游戏 (815+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('at-icons', this)\">🎮 Godot @icons (623+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('iconpark', this)\">🚀 字节 IconPark (2,658+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('tabler', this)\">⚡ Tabler UI (6,232+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('remix', this)\">💎 RemixIcon (3,229+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('lucide', this)\">✨ Lucide UI (1,854+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('fontawesome', this)\">🏷️ FontAwesome 6 (1,407+)</button>\n              <button class=\"icon-category-btn\" onclick=\"window.filterIconLib('brands', this)\">🌐 品牌与科技 (3,730+)</button>\n            </div>\n\n            <!-- Categories and Search -->\n            <div class=\"icon-toolbar\">\n              <div class=\"icon-category-tabs\">\n                <button class=\"icon-category-btn active\" onclick=\"window.filterIconCategory('all', this)\">全部分类</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('game', this)\">⚔️ 游戏战斗与魔法</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('items', this)\">🎒 装备道具与食材</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('ui', this)\">🎛️ 基础 UI 与控件</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('media', this)\">🎵 媒体音效与设备</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('nature', this)\">🍃 自然建筑与天气</button>\n                <button class=\"icon-category-btn\" onclick=\"window.filterIconCategory('system', this)\">⚙️ 系统节点与科技</button>\n              </div>\n              <div class=\"icon-search-wrapper\">\n                <input type=\"text\" id=\"iconSearchInput\" class=\"icon-search-input\" placeholder=\"🔍 搜索 26,000+ 离线 / 300,000+ 全网图标 (如 arrow_turn_up_right, sword)...\" \n                       oninput=\"window.handleIconSearchInput(this.value)\">\n                <span id=\"iconSearchClearBtn\" class=\"icon-search-clear-btn\" onclick=\"window.clearIconSearch()\" style=\"display:none;\" title=\"一键清空搜索内容\">\n                  <i class=\"fa-solid fa-circle-xmark\"></i>\n                </span>\n              </div>\n            </div>\n\n            <!-- Size & Color Controls -->\n            <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; font-size:12px; color:var(--text-secondary); background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius); padding:10px 14px;\">\n              <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n                <span id=\"iconFilteredCount\" style=\"font-weight:600; color:var(--text-primary); margin-right:6px;\">共检索到 25,988 个图标</span>\n                <span>尺寸 (偶数步进):</span>\n                <div style=\"display:flex; align-items:center; gap:4px;\" id=\"iconSizeBtnGroup\">\n                  <button class=\"icon-size-btn\" data-size=\"10\" onclick=\"window.changeIconSize(10, this)\">10px</button>\n                  <button class=\"icon-size-btn active\" data-size=\"16\" onclick=\"window.changeIconSize(16, this)\">16px (默认)</button>\n                  <button class=\"icon-size-btn\" data-size=\"24\" onclick=\"window.changeIconSize(24, this)\">24px</button>\n                  <button class=\"icon-size-btn\" data-size=\"32\" onclick=\"window.changeIconSize(32, this)\">32px</button>\n                  <button class=\"icon-size-btn\" data-size=\"48\" onclick=\"window.changeIconSize(48, this)\">48px</button>\n                  <button class=\"icon-size-btn\" data-size=\"64\" onclick=\"window.changeIconSize(64, this)\">64px</button>\n                  <button class=\"icon-size-btn\" data-size=\"96\" onclick=\"window.changeIconSize(96, this)\">96px</button>\n                  <button class=\"icon-size-btn\" data-size=\"128\" onclick=\"window.changeIconSize(128, this)\">128px</button>\n                </div>\n\n                <div class=\"icon-size-input-wrapper\" title=\"自定义输入偶数尺寸 (步长 2px)\">\n                  <button class=\"icon-size-step-btn\" onclick=\"window.stepIconSize(-2)\" title=\"减小 2px\"><i class=\"fa-solid fa-minus\"></i></button>\n                  <input type=\"number\" id=\"iconCustomSizeInput\" class=\"icon-custom-size-input\" value=\"16\" min=\"8\" max=\"256\" step=\"2\"\n                         oninput=\"window.changeIconSizeInput(this.value)\" onchange=\"window.changeIconSize(this.value, null)\">\n                  <span style=\"font-size:10px; color:var(--text-secondary); font-weight:600;\">px</span>\n                  <button class=\"icon-size-step-btn\" onclick=\"window.stepIconSize(2)\" title=\"增加 2px\"><i class=\"fa-solid fa-plus\"></i></button>\n                </div>\n              </div>\n\n              <div style=\"display:flex; align-items:center; gap:10px; flex-wrap:wrap;\">\n                <span style=\"font-weight:500;\">Godot 着色方案:</span>\n                <div style=\"display:flex; align-items:center; gap:8px;\">\n                  <span class=\"icon-color-swatch active\" style=\"background:#409eff;\" onclick=\"window.changeIconColor('#409eff', this)\" title=\"Element 蓝 (#409eff)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#8da5f5;\" onclick=\"window.changeIconColor('#8da5f5', this)\" title=\"Godot Node2D 蓝 (#8da5f5)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#8df58d;\" onclick=\"window.changeIconColor('#8df58d', this)\" title=\"Godot Control 绿 (#8df58d)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#fc7f7f;\" onclick=\"window.changeIconColor('#fc7f7f', this)\" title=\"Godot Node3D 红 (#fc7f7f)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ff9f43;\" onclick=\"window.changeIconColor('#ff9f43', this)\" title=\"Godot Animation 橙 (#ff9f43)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#a855f7;\" onclick=\"window.changeIconColor('#a855f7', this)\" title=\"神话/魔法紫 (#a855f7)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ffffff;\" onclick=\"window.changeIconColor('#ffffff', this)\" title=\"原生 Node 白 (#ffffff)\"></span>\n                  <span class=\"icon-color-swatch\" style=\"background:#ffd04b;\" onclick=\"window.changeIconColor('#ffd04b', this)\" title=\"金币/成就黄 (#ffd04b)\"></span>\n                  \n                  <div style=\"display:flex; align-items:center; gap:4px; margin-left:4px; padding-left:8px; border-left:1px solid var(--border-base);\">\n                    <span style=\"font-size:11px;\">自定义:</span>\n                    <input type=\"color\" id=\"iconCustomColorInput\" class=\"icon-custom-color-picker\" value=\"#409eff\" \n                           onchange=\"window.changeIconColor(this.value, null)\" oninput=\"window.changeIconColor(this.value, null)\" \n                           title=\"点击打开全色域取色盘\">\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"icon-grid-list\" id=\"iconGridList\"></div>\n            <div class=\"icon-pagination-bar\" id=\"iconPaginationBar\"></div>\n          </div>\n        ",
      "code": "# =========================================================================\n# GDScript 丰富调用形态 (全量 25,000+ 矢量图库智能检索 & 原生 SVG 解析)\n# =========================================================================\n\n# 方式 1: 单一图标名称快捷构建 (智能全分类检索，支持 arrow_turn_up_right / sword 等)\nvar icon1 = GIcon.create(\"arrow_turn_up_right\")\n\n# 方式 2: 原生 SVG XML 字符串直接构建 (零文件依赖，动态渲染)\nvar svg_str = \"\"\"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"red\"/></svg>\"\"\"\nvar icon_svg = GIcon.from_svg(svg_str, 32.0)\n# 或直接传入 create():\nvar icon_svg2 = GIcon.create(svg_str, 32.0)\n\n# 方式 3: 完整字典配置对象 (支持尺寸、着色、旋转动画)\nvar icon2 = GIcon.create({\n    \"name\": \"arrow_turn_up_right\",\n    \"size\": 24.0,\n    \"color\": Color(\"#409eff\"),\n    \"spin\": false\n})\n\n# 方式 4: 多参数位置传参 (名称, 尺寸, 着色)\nvar icon3 = GIcon.create(\"gamepad\", 32.0, Color(\"#67c23a\"))\n\n# 方式 5: 在自定义 Node 顶部使用 @icon 注解 (Godot 4 原生支持)\n@icon(\"res://addons/gotod_ui/assets/icons/node/arrow_turn_up_right.svg\")\nclass_name MyCustomWeaponNode extends Node2D\n\n# =========================================================================\n# C# (Godot .NET) 示例:\n# =========================================================================\n// var icon = GIcon.create(\"arrow_turn_up_right\", 24.0f, new Color(\"#409eff\"));\n// AddChild(icon);"
    },
    {
      "title": "2. 常用尺寸与主题着色 (Scalable Sizes & Theme Colors)",
      "render": "\n          <div style=\"display:flex; gap:24px; align-items:center; flex-wrap:wrap;\">\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-gamepad\" style=\"font-size:16px; color:var(--primary);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">16px (迷你)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-shield\" style=\"font-size:24px; color:var(--success);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">24px (标准)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-coins\" style=\"font-size:32px; color:var(--warning);\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">32px (中型)</span>\n            </div>\n            <div style=\"display:flex; flex-direction:column; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-wand-magic-sparkles\" style=\"font-size:44px; color:#a855f7;\"></i>\n              <span style=\"font-size:11px; color:var(--text-secondary);\">44px (神话特大)</span>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 多尺寸与色彩设定\nvar icon_mini = GIcon.new(\"gamepad\", 16.0, GotodTheme.get_color(\"primary\"))\nvar icon_std = GIcon.new(\"shield\", 24.0, GotodTheme.get_color(\"success\"))\nvar icon_large = GIcon.new(\"wand-magic-sparkles\", 44.0, Color(\"#a855f7\"))\nadd_child(icon_large)"
    },
    {
      "title": "3. 持续旋转动画 (Spin Animation & Loading)",
      "render": "\n          <div style=\"display:flex; gap:28px; align-items:center;\">\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:24px; color:var(--primary);\"></i>\n              <span style=\"font-size:13px;\">加载中... (spinner spin)</span>\n            </div>\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-rotate fa-spin\" style=\"font-size:24px; color:var(--warning);\"></i>\n              <span style=\"font-size:13px;\">同步中... (rotate spin)</span>\n            </div>\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-gear fa-spin\" style=\"font-size:24px; color:var(--success);\"></i>\n              <span style=\"font-size:13px;\">引擎运转中 (gear spin)</span>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 开启持续旋转动画\nvar loading_icon = GIcon.new(\"spinner\", 24.0, Color(\"#409eff\"))\nloading_icon.spin = true # 👈 开启持续匀速旋转动画\nadd_child(loading_icon)"
    },
    {
      "title": "4. 结合按钮、输入框与徽标组件装配 (Component Integration)",
      "render": "\n          <div style=\"display:flex; gap:16px; align-items:center; flex-wrap:wrap;\">\n            <button class=\"g-btn g-btn-primary\" onclick=\"showToast('点击了带魔法棒图标的按钮', 'success')\">\n              <i class=\"fa-solid fa-wand-magic-sparkles\"></i> 强化附魔\n            </button>\n            <button class=\"g-btn g-btn-danger\" onclick=\"showToast('点击了战斗开战按钮', 'info')\">\n              <i class=\"fa-solid fa-fire\"></i> 立即开战\n            </button>\n            <div style=\"position:relative; display:inline-block;\">\n              <i class=\"fa-solid fa-bell\" style=\"font-size:22px; color:var(--text-primary);\"></i>\n              <span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;\">9+</span>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 结合按钮插槽装配图标\nvar btn = GButton.new()\nbtn.text = \"强化附魔\"\nbtn.icon = GIcon.new(\"wand-magic-sparkles\") # 自动装配前缀图标\nadd_child(btn)"
    }
  ],
  "props": [
    {
      "name": "icon_name",
      "type": "String",
      "default": "\"gamepad\"",
      "desc": "图标名称（支持 25,988+ 矢量图库智能模糊检索或直接传入 <svg> 字符串）",
      "version": "v1.0"
    },
    {
      "name": "svg_data",
      "type": "String",
      "default": "\"\"",
      "desc": "原生 SVG 文本内容（支持直接粘贴 XML 格式矢量图）",
      "version": "v1.6.3"
    },
    {
      "name": "icon_size",
      "type": "float",
      "default": "16.0",
      "desc": "图标渲染尺寸（像素宽高）",
      "version": "v1.0"
    },
    {
      "name": "icon_color",
      "type": "Color",
      "default": "Color.WHITE",
      "desc": "图标调制着色 (modulate)",
      "version": "v1.0"
    },
    {
      "name": "spin",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启持续顺时针旋转动画",
      "version": "v1.0"
    }
  ],
  "events": [],
  "methods": [
    {
      "name": "create(name_or_options: Variant, size: Variant = null, color: Variant = null) -> GIcon",
      "desc": "静态多态构建工厂方法。支持单图标名、原生 SVG 字符串、字典配置对象、多参数位置传递",
      "params": "(name_or_options: Variant, size: Variant = null, color: Variant = null) -> GIcon",
      "version": "v1.0.6"
    },
    {
      "name": "from_svg(svg_content: String, size: float = 16.0, color: Color = Color.WHITE) -> GIcon",
      "desc": "直接从原生 SVG 字符串构建 GIcon 实例（零文件依赖）",
      "params": "(svg_content: String, size: float, color: Color) -> GIcon",
      "version": "v1.6.3"
    },
    {
      "name": "set_svg(svg_content: String) -> void",
      "desc": "动态设置并解析加载 SVG XML 文本",
      "params": "(svg_content: String) -> void",
      "version": "v1.6.3"
    },
    {
      "name": "_init(name=\"gamepad\", size=16.0, color=Color.WHITE)",
      "desc": "便捷构造函数",
      "params": "(name: String, size: float, color: Color) -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "自定义矢量图形或纹理节点插槽",
      "child": "TextureRect / Control",
      "example": "<template #default><TextureRect texture=\"res://icon.png\" /></template>",
      "version": "v1.0"
    },
    {
      "name": "badge",
      "desc": "图标右上角徽标插槽",
      "child": "GBadge / Control",
      "example": "<template #badge><GBadge value=\"99+\" /></template>",
      "version": "v1.2"
    }
  ]
};
