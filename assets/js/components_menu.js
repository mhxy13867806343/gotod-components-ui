// =========================================================================
// Gotod Components UI - Component: menu
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['menu'] = {
  "title": "Menu 菜单导航 (GMenu)",
  "desc": "为应用提供导航功能的菜单组件，对标 Element Plus Menu。支持水平/垂直模式、子菜单展开/浮层弹出、激活态、默认展开、唯一展开、禁用菜单项，以及 AUTO/TOP/BOTTOM 弹出方向。",
  "demos": [
    {
      "title": "1. 顶栏菜单 (Horizontal Menu)",
      "render": `
        <div class="g-menu g-menu-horizontal" style="max-width:760px;">
          <button class="g-menu-item is-active" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-gauge-high"></i> 总览</button>
          <div class="g-sub-menu g-sub-menu-popup">
            <button class="g-menu-item g-sub-menu-title" type="button" onclick="window.toggleGMenuSub(event)">
              <span><i class="fa-solid fa-layer-group"></i> 工作台</span>
              <i class="fa-solid fa-chevron-down g-sub-menu-arrow"></i>
            </button>
            <div class="g-sub-menu-panel" role="menu">
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-boxes-stacked"></i> 资源库</button>
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-clapperboard"></i> 场景管理</button>
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-rocket"></i> 发布设置</button>
            </div>
          </div>
          <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-list-check"></i> 订单</button>
          <button class="g-menu-item is-disabled" disabled><i class="fa-solid fa-lock"></i> 已禁用</button>
        </div>
      `,
      "code": "# GDScript: 横向菜单，子菜单点击后按剩余空间向上或向下弹出\nvar menu = GMenu.new()\nmenu.mode = GMenu.MenuMode.HORIZONTAL\nmenu.popper_placement = GMenu.PopperPlacement.AUTO\nmenu.items = [\n    { \"index\": \"dashboard\", \"label\": \"总览\", \"icon\": \"⌂\" },\n    { \"index\": \"workspace\", \"label\": \"工作台\", \"icon\": \"▣\", \"children\": [\n        { \"index\": \"assets\", \"label\": \"资源库\", \"icon\": \"▦\" },\n        { \"index\": \"scenes\", \"label\": \"场景管理\", \"icon\": \"▶\" }\n    ] },\n    { \"index\": \"orders\", \"label\": \"订单\", \"icon\": \"≡\" }\n]\nmenu.active_index = \"dashboard\"\nmenu.item_selected.connect(func(index, key_path, item):\n    print(index, key_path, item)\n)\nadd_child(menu)"
    },
    {
      "title": "2. 侧栏子菜单 (Vertical Sub Menu)",
      "render": `
        <div class="g-menu" style="max-width:280px;">
          <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-house"></i> 首页</button>
          <div class="g-sub-menu">
            <button class="g-menu-item g-sub-menu-title" type="button" onclick="window.toggleGMenuSub(event)">
              <span><i class="fa-solid fa-folder-tree"></i> 工作区</span>
              <i class="fa-solid fa-chevron-down g-sub-menu-arrow"></i>
            </button>
            <div class="g-sub-menu-panel">
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-boxes-stacked"></i> 资源库</button>
              <button class="g-menu-item is-active" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-clapperboard"></i> 场景管理</button>
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-rocket"></i> 发布设置</button>
            </div>
          </div>
          <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-gear"></i> 设置</button>
        </div>
      `,
      "code": "# GDScript: 纵向手风琴展开，子项带 icon，不额外缩进\nvar menu = GMenu.new()\nmenu.items = [\n    { \"index\": \"home\", \"label\": \"首页\", \"icon\": \"⌂\" },\n    { \"index\": \"workspace\", \"label\": \"工作区\", \"icon\": \"▣\", \"children\": [\n        { \"index\": \"assets\", \"label\": \"资源库\", \"icon\": \"▦\" },\n        { \"index\": \"scenes\", \"label\": \"场景管理\", \"icon\": \"▶\" }\n    ] },\n    { \"index\": \"settings\", \"label\": \"设置\", \"icon\": \"⚙\" }\n]\nmenu.default_openeds = [\"workspace\"]\nmenu.active_index = \"scenes\"\nmenu.open_submenu(\"workspace\")\nprint(menu.is_submenu_open(\"workspace\"))\nadd_child(menu)"
    },
    {
      "title": "3. 右侧浮动入口合并菜单 (Dock Menu)",
      "render": `
        <div class="g-menu" style="max-width:240px;">
          <a class="g-menu-item" href="v2/v-vue/"><i class="fa-brands fa-vuejs" style="color:#42b883;"></i> Vue 版</a>
          <a class="g-menu-item" href="v2/v-jquery/"><i class="fa-brands fa-js" style="color:#f7df1e;"></i> JQ 版</a>
          <a class="g-menu-item" href="library/"><i class="fa-solid fa-book-open-reader" style="color:#67e8f9;"></i> Library</a>
        </div>
      `,
      "code": "# GDScript: 版本资料入口菜单\nvar menu = GMenu.new()\nmenu.items = [\n    { \"index\": \"vue\", \"label\": \"Vue 版\", \"icon\": \"V\" },\n    { \"index\": \"jquery\", \"label\": \"JQ 版\", \"icon\": \"JS\" },\n    { \"index\": \"library\", \"label\": \"Library\", \"icon\": \"L\" }\n]\nmenu.item_selected.connect(func(index, key_path, item):\n    GMessage.info(\"打开入口: \" + str(item.get(\"label\", index)), self)\n)\nadd_child(menu)"
    },
    {
      "title": "4. 插槽自定义标题与图标 (Slots)",
      "render": `
        <div class="g-menu" style="max-width:280px;">
          <div class="g-sub-menu is-open">
            <button class="g-menu-item g-sub-menu-title" type="button" onclick="window.toggleGMenuSub(event)">
              <span class="g-menu-slot-title"><i class="fa-solid fa-wand-magic-sparkles"></i> #title 插槽标题</span>
              <i class="fa-solid fa-chevron-down g-sub-menu-arrow"></i>
            </button>
            <div class="g-sub-menu-panel">
              <button class="g-menu-item is-active" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-star"></i> #icon 自定义图标项</button>
              <button class="g-menu-item" type="button" onclick="window.activateGMenuItem(this)"><i class="fa-solid fa-code"></i> #default 菜单内容</button>
            </div>
          </div>
        </div>
      `,
      "code": "# GDScript: 点语法插槽\nvar menu = GMenu.new()\nmenu.slotName = \"title\"\nmenu.title.text = \"Workspace\"\nmenu.slotName = \"icon\"\nvar icon = GIcon.new()\nicon.icon_name = \"folder-tree\"\nmenu.icon = icon\nmenu.default.text = \"Navigator One\""
    }
  ],
  "props": [
    { "name": "mode", "type": "enum", "default": "VERTICAL", "desc": "菜单展示模式：VERTICAL / HORIZONTAL", "version": "v1.0" },
    { "name": "items", "type": "Array[Dictionary]", "default": "[]", "desc": "菜单数据，支持 index、label、icon、disabled、children", "version": "v1.0" },
    { "name": "active_index", "type": "String", "default": "''", "desc": "当前激活菜单项 index", "version": "v1.0" },
    { "name": "default_openeds", "type": "Array[String]", "default": "[]", "desc": "默认展开的子菜单 index 列表", "version": "v1.0" },
    { "name": "unique_opened", "type": "bool", "default": "false", "desc": "是否只保持一个子菜单展开", "version": "v1.0" },
    { "name": "collapse", "type": "bool", "default": "false", "desc": "是否折叠菜单，仅保留图标/首字，子菜单改为浮层弹出", "version": "v1.0" },
    { "name": "popper_placement", "type": "enum", "default": "AUTO", "desc": "子菜单浮层方向：AUTO 按剩余空间向上或向下，也可强制 TOP / BOTTOM", "version": "v1.0" },
    { "name": "popper_offset", "type": "int", "default": "8", "desc": "浮层与触发项之间的间距（像素）", "version": "v1.0" },
    { "name": "item_height", "type": "int", "default": "40", "desc": "菜单项最小高度", "version": "v1.0" }
  ],
  "events": [
    { "name": "item_selected", "desc": "点击普通菜单项时触发", "params": "(index: String, key_path: Array, item: Dictionary)", "version": "v1.0" },
    { "name": "submenu_opened", "desc": "子菜单展开时触发", "params": "(index: String, key_path: Array)", "version": "v1.0" },
    { "name": "submenu_closed", "desc": "子菜单收起时触发", "params": "(index: String, key_path: Array)", "version": "v1.0" }
  ],
  "methods": [
    { "name": "add_item(index, label, icon_text='', disabled=false, children=[])", "desc": "追加菜单项或子菜单", "params": "(String, String, String, bool, Array[Dictionary]) -> void", "version": "v1.0" },
    { "name": "select(index: String)", "desc": "程序化选中菜单项并触发选择事件", "params": "(index: String) -> void", "version": "v1.0" },
    { "name": "toggle_submenu(index: String)", "desc": "展开或收起指定子菜单", "params": "(index: String) -> void", "version": "v1.0" },
    { "name": "open_submenu(index: String)", "desc": "展开指定子菜单；unique_opened 为 true 时会关闭其它子菜单", "params": "(index: String) -> void", "version": "v1.0" },
    { "name": "close_submenu(index: String)", "desc": "收起指定子菜单", "params": "(index: String) -> void", "version": "v1.0" },
    { "name": "close_all_submenus()", "desc": "关闭全部已展开子菜单", "params": "() -> void", "version": "v1.0" },
    { "name": "is_submenu_open(index: String)", "desc": "判断指定子菜单当前是否展开", "params": "(index: String) -> bool", "version": "v1.0" },
    { "name": "resolve_popup_position(anchor_rect, popup_size, viewport_rect=Rect2())", "desc": "按锚点、浮层尺寸和视口剩余空间计算弹出坐标，AUTO 会向上或向下翻转", "params": "(Rect2, Vector2, Rect2) -> Vector2", "version": "v1.0" },
    { "name": "clear_items()", "desc": "清空全部菜单项", "params": "() -> void", "version": "v1.0" },
    { "name": "get_slot(slot_name: String)", "desc": "获取 title / icon / default 等插槽代理", "params": "(slot_name: String) -> GSlotProxy", "version": "v1.0" }
  ],
  "slots": [
    { "name": "default", "desc": "菜单项内容区域", "child": "GMenuItem / Button / Label", "example": "<template #default>Navigator One</template>", "version": "v1.0" },
    { "name": "title", "desc": "子菜单标题区域", "child": "Label / HBoxContainer", "example": "<template #title>Workspace</template>", "version": "v1.0" },
    { "name": "icon", "desc": "菜单项前置图标区域", "child": "GIcon / TextureRect", "example": "<template #icon><GIcon name=\"folder-tree\" /></template>", "version": "v1.0" },
    { "name": "item", "desc": "单个菜单项自定义内容", "child": "Control", "example": "<template #item>{ label }</template>", "version": "v1.0" },
    { "name": "submenu", "desc": "子菜单浮层内容区域", "child": "VBoxContainer / GMenu", "example": "<template #submenu>...</template>", "version": "v1.0" }
  ]
};
