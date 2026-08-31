// =========================================================================
// Gotod Components UI - Component: tabs
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tabs'] = {
  "title": "Tabs 标签页 (GTabs)",
  "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。",
  "demos": [
    {
      "title": "1. 基础选项卡 (Basic Tabs)",
      "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:12px;\"><button class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary);\">角色属性</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">技能加点</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">天赋树</button></div><div style=\"font-size:13px; color:var(--text-secondary); line-height:1.6;\">力量: 142 | 敏捷: 98 | 智力: 180</div></div>",
      "code": "# GDScript: 基础选项卡\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)"
    },
    {
      "title": "2. 卡片化样式 (Card Style: type=\"card\")",
      "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; gap:4px; margin-bottom:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 12px;\">主线任务 (4)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 12px;\">支线悬赏 (12)</button></div><div style=\"font-size:13px; color:var(--text-secondary);\">当前正在进行：第 7 章 · 迷雾森林的低语</div></div>",
      "code": "# GDScript: 卡片标签页\ntabs.tab_type = GTabs.Type.CARD"
    },
    {
      "title": "3. 标签位置控制 (Position: Top / Bottom / Left / Right)",
      "render": "<div style=\"display:flex; border:1px solid var(--border-base); border-radius:var(--radius); max-width:420px; height:100px;\"><div style=\"width:100px; border-right:1px solid var(--border-base); padding:8px; display:flex; flex-direction:column; gap:4px;\"><button class=\"icon-category-btn active\" style=\"text-align:left; font-size:11px;\">常规设置</button><button class=\"icon-category-btn\" style=\"text-align:left; font-size:11px;\">画面画质</button></div><div style=\"flex:1; padding:12px; font-size:12px; color:var(--text-secondary);\">侧边竖向标签页内容区域</div></div>",
      "code": "# GDScript: 垂直左侧标签\ntabs.tab_position = GTabs.Position.LEFT"
    },
    {
      "title": "4. 自定义图标与徽标插槽 (Custom Icon & Badge Slot)",
      "render": "<div style=\"display:flex; gap:6px;\"><button class=\"icon-category-btn active\"><i class=\"fa-solid fa-envelope\"></i> 邮件 <span class=\"g-badge\" style=\"background:var(--danger); color:#fff; font-size:9px; padding:0 4px; border-radius:8px;\">3</span></button><button class=\"icon-category-btn\"><i class=\"fa-solid fa-users\"></i> 好友</button></div>",
      "code": "# GDScript: 图标徽标标签\ntabs.set_tab_icon(0, \"envelope\")"
    },
    {
      "title": "5. 动态可关闭与新增标签 (Editable & Closable Tabs)",
      "render": "<div style=\"display:flex; gap:6px; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; font-size:12px;\">关卡 1-1 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.remove()\"></i></span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">+ 开启新关卡</button></div>",
      "code": "# GDScript: 可编辑标签\ntabs.editable = true"
    },
    {
      "title": "6. 游戏商城分类切换实战 (Game Store Tabs)",
      "render": "<div style=\"max-width:440px; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px;\"><div style=\"display:flex; gap:8px; margin-bottom:12px;\"><button class=\"icon-category-btn active\">⚔️ 武器装备</button><button class=\"icon-category-btn\">🧪 炼金药水</button></div><div style=\"font-size:12px; color:var(--text-secondary);\">展示对应商店分类网格</div></div>",
      "code": "# GDScript: 商店分类\nvar store_tabs = GTabs.new()"
    }
  ],
  "props": [
    {
      "name": "model-value / current_tab",
      "type": "string / number",
      "default": "0",
      "desc": "绑定值，选中选项卡的 name 或索引，默认是第一个 tab"
    },
    {
      "name": "type",
      "type": "enum",
      "default": "'' (LINE)",
      "desc": "风格类型：LINE, CARD, BORDER_CARD, SEGMENT"
    },
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否可关闭"
    },
    {
      "name": "addable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否可增加"
    },
    {
      "name": "editable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否同时可增加和关闭"
    },
    {
      "name": "tab-position",
      "type": "enum",
      "default": "top",
      "desc": "选项卡所在位置：top, bottom, left, right"
    },
    {
      "name": "stretch",
      "type": "boolean",
      "default": "false",
      "desc": "标签的宽度是否自撑开"
    },
    {
      "name": "before-leave",
      "type": "Callable / Function",
      "default": "() => true",
      "desc": "切换标签之前的钩子函数，若返回 false 则阻止切换"
    }
  ],
  "events": [
    {
      "name": "tab_clicked(index, name)",
      "desc": "点击选中某个选项卡时触发",
      "params": "(index: int, name: String)"
    },
    {
      "name": "tab_changed(index, name)",
      "desc": "当前激活选项卡发生改变时触发",
      "params": "(index: int, name: String)"
    },
    {
      "name": "tab_added(index, name)",
      "desc": "动态添加新选项卡时触发",
      "params": "(index: int, name: String)"
    },
    {
      "name": "tab_removed(index, name)",
      "desc": "选项卡被移除销毁时触发",
      "params": "(index: int, name: String)"
    },
    {
      "name": "tab_close_requested(index, name)",
      "desc": "用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)",
      "params": "(index: int, name: String)"
    }
  ],
  "methods": [
    {
      "name": "add_tab(name, panel, closable=false, icon=null)",
      "desc": "动态追加一个选项卡及关联内容面板",
      "params": "(name: String, panel: Control, closable: bool, icon: Texture2D) -> int"
    },
    {
      "name": "add_tabs(tab_list: Array[Dictionary])",
      "desc": "批量追加一组选项卡 [{\"name\": \"\", \"panel\": Control, \"closable\": false}]",
      "params": "(tab_list: Array[Dictionary]) -> void"
    },
    {
      "name": "insert_tab(index, name, panel, closable=false, icon=null)",
      "desc": "在指定索引位置插入一个选项卡",
      "params": "(index: int, name: String, panel: Control, closable: bool, icon: Texture2D) -> void"
    },
    {
      "name": "remove_tab(index_or_name)",
      "desc": "根据索引或标题名称移除指定选项卡",
      "params": "(index_or_name: Variant) -> void"
    },
    {
      "name": "clear_tabs()",
      "desc": "清空并销毁所有选项卡及关联面板",
      "params": "() -> void"
    },
    {
      "name": "get_tab_count()",
      "desc": "获取当前选项卡总数量",
      "params": "() -> int"
    },
    {
      "name": "get_tab_name(index)",
      "desc": "获取指定索引的选项卡标题文本",
      "params": "(index: int) -> String"
    },
    {
      "name": "set_tab_title(index, new_title)",
      "desc": "动态修改指定选项卡的标题文本",
      "params": "(index: int, new_title: String) -> void"
    },
    {
      "name": "get_tab_panel(index)",
      "desc": "获取指定索引绑定的内容面板 Control 节点",
      "params": "(index: int) -> Control"
    },
    {
      "name": "set_tab_disabled(index, is_disabled)",
      "desc": "设置指定选项卡是否禁用点击切换",
      "params": "(index: int, is_disabled: bool) -> void"
    },
    {
      "name": "is_tab_disabled(index)",
      "desc": "查询指定选项卡当前是否处于禁用状态",
      "params": "(index: int) -> bool"
    },
    {
      "name": "set_tab_icon(index, icon)",
      "desc": "为指定选项卡动态设置图标纹理",
      "params": "(index: int, icon: Texture2D) -> void"
    },
    {
      "name": "find_tab_by_name(name)",
      "desc": "根据标题名称反查选项卡的索引位置 (-1 为未找到)",
      "params": "(name: String) -> int"
    },
    {
      "name": "next_tab()",
      "desc": "程序化切换至下一个标签页 (循环)",
      "params": "() -> void"
    },
    {
      "name": "prev_tab()",
      "desc": "程序化切换至上一个标签页 (循环)",
      "params": "() -> void"
    },
    {
      "name": "set_before_leave(callback)",
      "desc": "设置标签切换拦截钩子函数 Callable(cur, next) -> bool",
      "params": "(callback: Callable) -> void"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "标签页内容面板插槽（包含所有 Tab 面板）",
      "child": "Array[Control]",
      "example": "<template #default><GTabPane label=\"背包\">...</GTabPane></template>"
    },
    {
      "name": "tab",
      "desc": "自定义 Tab 头部标签按钮插槽（透传 { tab_name, active, index }）",
      "child": "HBoxContainer / GIcon / GText",
      "example": "<template #tab=\"{ name }\"><GIcon name=\"box\" /> <span>{{ name }}</span></template>"
    },
    {
      "name": "prefix",
      "desc": "Tab 栏最左侧附加控件插槽",
      "child": "Control / GIcon",
      "example": "<template #prefix><GIcon name=\"bars\" /></template>"
    },
    {
      "name": "suffix",
      "desc": "Tab 栏最右侧附加操作按钮插槽（如“+ 新增Tab”）",
      "child": "GButton / GSpace",
      "example": "<template #suffix><GButton icon=\"plus\" size=\"small\" /></template>"
    }
  ],
  "paneProps": [
    {
      "name": "label",
      "type": "string",
      "default": "''",
      "desc": "选项卡标题文字"
    },
    {
      "name": "name",
      "type": "string / number",
      "default": "''",
      "desc": "与选项卡绑定值 value 对应的标识符"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否禁用该标签页"
    },
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "该标签是否可单独关闭"
    }
  ]
};
