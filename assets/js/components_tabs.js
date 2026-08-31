// =========================================================================
// Gotod Components UI - Component: tabs
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tabs'] = {
  "title": "Tabs 标签页 (GTabs)",
  "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。",
  "demos": [
    {
      "title": "1. 基础滑动下划线选项卡 (Basic Tabs: 真实点击切换内容)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <!-- Tab Headers Bar -->\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"t1Btn0\" class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary); font-weight:600; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===0);\n                b.style.borderBottom = i===0 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'block';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'none';\n            \">角色属性</button>\n            <button id=\"t1Btn1\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===1);\n                b.style.borderBottom = i===1 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'block';\n              document.getElementById('t1P2').style.display = 'none';\n            \">技能加点</button>\n            <button id=\"t1Btn2\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===2);\n                b.style.borderBottom = i===2 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'block';\n            \">天赋树</button>\n          </div>\n          <!-- Tab Content Panels -->\n          <div id=\"t1P0\" style=\"font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>💪 <b>力量</b>: 142 <span style=\"color:var(--success); font-size:11px;\">(+15% 物理攻击)</span></div>\n            <div>⚡ <b>敏捷</b>: 98 <span style=\"color:var(--primary); font-size:11px;\">(+8% 暴击率)</span></div>\n            <div>🧠 <b>智力</b>: 180 <span style=\"color:var(--warning); font-size:11px;\">(+240 魔法值)</span></div>\n          </div>\n          <div id=\"t1P1\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🔥 <b>烈焰风暴</b> (Lv.5) - 消耗 45 MP，造成 320% 范围火伤</div>\n            <div>❄️ <b>极寒冰锥</b> (Lv.3) - 消耗 30 MP，造成 180% 伤害并减速 40%</div>\n          </div>\n          <div id=\"t1P2\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🌟 <b>狂暴之心</b> (Tier 1) - 生命值低于 30% 时攻击力提升 50%</div>\n            <div>🛡️ <b>坚韧意志</b> (Tier 2) - 受到的控制持续时间缩短 25%</div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 基础选项卡与面板切换\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)\ntabs.add_tab(\"技能加点\", skill_panel)\ntabs.add_tab(\"天赋树\", talent_panel)\nadd_child(tabs)"
    },
    {
      "title": "2. 卡片化与胶囊样式 (Card Style: type=\"card\")",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <!-- Card Tab Buttons -->\n          <div style=\"display:flex; gap:6px; margin-bottom:14px;\">\n            <button id=\"t2Btn0\" class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:5px 14px;\" onclick=\"\n              document.getElementById('t2Btn0').className = 'g-btn g-btn-primary';\n              document.getElementById('t2Btn1').className = 'g-btn g-btn-default';\n              document.getElementById('t2P0').style.display = 'block';\n              document.getElementById('t2P1').style.display = 'none';\n            \">📜 主线任务 (4)</button>\n            <button id=\"t2Btn1\" class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:5px 14px;\" onclick=\"\n              document.getElementById('t2Btn0').className = 'g-btn g-btn-default';\n              document.getElementById('t2Btn1').className = 'g-btn g-btn-primary';\n              document.getElementById('t2P0').style.display = 'none';\n              document.getElementById('t2P1').style.display = 'block';\n            \">⚔️ 支线悬赏 (12)</button>\n          </div>\n          <div id=\"t2P0\" style=\"font-size:13px; color:var(--text-regular);\">\n            <div style=\"font-weight:700; color:var(--primary); margin-bottom:4px;\">🎯 第 7 章 · 迷雾森林的低语</div>\n            <div style=\"font-size:12px; color:var(--text-secondary);\">前往遗忘神庙寻找失落的月神法杖 (已完成 2/3)</div>\n          </div>\n          <div id=\"t2P1\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n            <div style=\"font-weight:700; color:var(--warning); margin-bottom:4px;\">💰 悬赏通缉：击杀暴食恶魔</div>\n            <div style=\"font-size:12px; color:var(--text-secondary);\">赏金: 5,000 金币 + 史诗级轻铠一件</div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 卡片化标签页\ntabs.tab_type = GTabs.Type.CARD"
    },
    {
      "title": "3. 标签四方位位置控制 (Position: Left 垂直侧边栏 vs Top 顶部)",
      "render": "\n        <div style=\"display:flex; border:1px solid var(--border-base); border-radius:8px; max-width:440px; height:120px; background:var(--bg-surface); overflow:hidden;\">\n          <!-- Left Vertical Tab List -->\n          <div style=\"width:110px; border-right:1px solid var(--border-base); padding:8px; display:flex; flex-direction:column; gap:4px; background:var(--bg-card);\">\n            <button id=\"t3Btn0\" class=\"icon-category-btn active\" style=\"text-align:left; font-size:11px; padding:6px 8px; width:100%; border-radius:4px;\" onclick=\"\n              document.getElementById('t3Btn0').classList.add('active');\n              document.getElementById('t3Btn1').classList.remove('active');\n              document.getElementById('t3P0').style.display = 'block';\n              document.getElementById('t3P1').style.display = 'none';\n            \">⚙️ 常规设置</button>\n            <button id=\"t3Btn1\" class=\"icon-category-btn\" style=\"text-align:left; font-size:11px; padding:6px 8px; width:100%; border-radius:4px;\" onclick=\"\n              document.getElementById('t3Btn0').classList.remove('active');\n              document.getElementById('t3Btn1').classList.add('active');\n              document.getElementById('t3P0').style.display = 'none';\n              document.getElementById('t3P1').style.display = 'block';\n            \">🎮 画面画质</button>\n          </div>\n          <!-- Right Content Area -->\n          <div style=\"flex:1; padding:14px; font-size:12px; color:var(--text-regular);\">\n            <div id=\"t3P0\">\n              <div style=\"font-weight:700; margin-bottom:6px;\">音频与常规设置</div>\n              <div style=\"color:var(--text-secondary);\">主音量: 80% | 背景音乐: 开 | 自动存档: 开启</div>\n            </div>\n            <div id=\"t3P1\" style=\"display:none;\">\n              <div style=\"font-weight:700; margin-bottom:6px;\">画面渲染配置</div>\n              <div style=\"color:var(--text-secondary);\">分辨率: 2560x1440 | 阴影质量: 极致 | 垂直同步: 开启</div>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 垂直左侧标签页\ntabs.tab_position = GTabs.Position.LEFT"
    },
    {
      "title": "4. 自定义图标与未读徽标插槽 (Icon & Badge Integration)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; gap:8px; margin-bottom:12px;\">\n            <button id=\"t4Btn0\" class=\"icon-category-btn active\" style=\"padding:6px 12px; display:inline-flex; align-items:center; gap:6px;\" onclick=\"\n              document.getElementById('t4Btn0').classList.add('active');\n              document.getElementById('t4Btn1').classList.remove('active');\n              document.getElementById('t4P0').style.display = 'block';\n              document.getElementById('t4P1').style.display = 'none';\n            \">\n              <i class=\"fa-solid fa-envelope\"></i> 邮箱系统\n              <span class=\"g-badge\" style=\"background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:700;\">3</span>\n            </button>\n            <button id=\"t4Btn1\" class=\"icon-category-btn\" style=\"padding:6px 12px; display:inline-flex; align-items:center; gap:6px;\" onclick=\"\n              document.getElementById('t4Btn0').classList.remove('active');\n              document.getElementById('t4Btn1').classList.add('active');\n              document.getElementById('t4P0').style.display = 'none';\n              document.getElementById('t4P1').style.display = 'block';\n            \">\n              <i class=\"fa-solid fa-users\"></i> 好友列表 (12)\n            </button>\n          </div>\n          <div id=\"t4P0\" style=\"font-size:12px; color:var(--text-secondary);\">\n            📩 收到系统维护补偿邮件：【钻石 x 500】点击附件即可一键领取。\n          </div>\n          <div id=\"t4P1\" style=\"display:none; font-size:12px; color:var(--text-secondary);\">\n            👥 当前在线好友：8 人 | 离线好友：4 人\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 图标与徽标插槽\ntabs.set_tab_icon(0, \"envelope\")\ntabs.set_tab_badge(0, 3)"
    },
    {
      "title": "5. 动态可关闭与新增标签页 (Editable & Dynamic Add/Remove Tabs)",
      "render": "\n        <div style=\"max-width:460px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:14px;\">\n          <!-- Dynamic Tabs Header -->\n          <div id=\"dynTabHeaders\" style=\"display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin-bottom:12px;\">\n            <span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; font-size:12px; padding:4px 8px;\">\n              关卡 1-1\n              <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('已关闭关卡 1-1', 'info');\"></i>\n            </span>\n            <span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; font-size:12px; padding:4px 8px;\">\n              关卡 1-2\n              <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('已关闭关卡 1-2', 'info');\"></i>\n            </span>\n            <button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px; height:26px;\" onclick=\"\n              window.dynTabIdx = (window.dynTabIdx || 2) + 1;\n              const span = document.createElement('span');\n              span.className = 'g-tag g-tag-primary';\n              span.style = 'display:inline-flex; align-items:center; gap:6px; font-size:12px; padding:4px 8px;';\n              span.innerHTML = '关卡 1-' + window.dynTabIdx + ' <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast(\\'已关闭标签\\', \\'info\\');\"></i>';\n              this.parentNode.insertBefore(span, this);\n              showToast('已新增关卡 1-' + window.dynTabIdx + ' 标签页', 'success');\n            \">\n              <i class=\"fa-solid fa-plus\"></i> 新增关卡\n            </button>\n          </div>\n          <div style=\"font-size:12px; color:var(--text-secondary);\">\n            💡 点击右上角 <b>+ 新增关卡</b> 实时动态创建 Tab；点击 <b>×</b> 销毁对应标签页。\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 动态增删标签页\ntabs.editable = true\ntabs.tab_added.connect(func(i, name): print(\"新增标签:\", name))\ntabs.tab_removed.connect(func(i, name): print(\"关闭标签:\", name))"
    },
    {
      "title": "6. 游戏商城商品分类联动展示 (Game Store Category Filtering)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:14px;\">\n          <div style=\"display:flex; gap:8px; margin-bottom:12px;\">\n            <button id=\"t6Btn0\" class=\"icon-category-btn active\" style=\"padding:6px 12px;\" onclick=\"\n              document.getElementById('t6Btn0').classList.add('active');\n              document.getElementById('t6Btn1').classList.remove('active');\n              document.getElementById('t6P0').style.display = 'grid';\n              document.getElementById('t6P1').style.display = 'none';\n            \">⚔️ 武器装备</button>\n            <button id=\"t6Btn1\" class=\"icon-category-btn\" style=\"padding:6px 12px;\" onclick=\"\n              document.getElementById('t6Btn0').classList.remove('active');\n              document.getElementById('t6Btn1').classList.add('active');\n              document.getElementById('t6P0').style.display = 'none';\n              document.getElementById('t6P1').style.display = 'grid';\n            \">🧪 炼金药剂</button>\n          </div>\n          <!-- Weapon Grid -->\n          <div id=\"t6P0\" style=\"display:grid; grid-template-columns:1fr 1fr; gap:10px;\">\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🗡️ 龙鳞破天剑</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">攻击力 +240 | 12,000 🪙</div>\n            </div>\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🏹 精灵逐风弓</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">攻速 +35% | 9,800 🪙</div>\n            </div>\n          </div>\n          <!-- Potion Grid -->\n          <div id=\"t6P1\" style=\"display:none; grid-template-columns:1fr 1fr; gap:10px;\">\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🧪 远古生命源泉</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">瞬回 2000 HP | 150 🪙</div>\n            </div>\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">⚡ 疾风迅捷药水</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">移速 +50% | 80 🪙</div>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 游戏商城多品类标签联动\nvar store_tabs = GTabs.new()\nstore_tabs.add_tab(\"武器装备\", weapon_grid)\nstore_tabs.add_tab(\"炼金药剂\", potion_grid)"
    }
  ],
  "props": [
    {
      "name": "model-value / current_tab",
      "type": "string / number",
      "default": "0",
      "desc": "绑定值，选中选项卡的 name 或索引，默认是第一个 tab",
      "version": "v1.0.0"
    },
    {
      "name": "type",
      "type": "enum",
      "default": "'' (LINE)",
      "desc": "风格类型：LINE (划线式), CARD (卡片式), BORDER_CARD (边框卡片), SEGMENT (分段器)",
      "version": "v1.0.0"
    },
    {
      "name": "closable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否可关闭",
      "version": "v1.0.0"
    },
    {
      "name": "addable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否可增加",
      "version": "v1.0.0"
    },
    {
      "name": "editable",
      "type": "boolean",
      "default": "false",
      "desc": "标签是否同时可增加和关闭",
      "version": "v1.0.5"
    },
    {
      "name": "tab-position",
      "type": "enum",
      "default": "top",
      "desc": "选项卡所在位置：top (顶部), bottom (底部), left (左侧竖向), right (右侧竖向)",
      "version": "v1.0.0"
    },
    {
      "name": "stretch",
      "type": "boolean",
      "default": "false",
      "desc": "标签的宽度是否自撑开",
      "version": "v1.0.0"
    },
    {
      "name": "before-leave",
      "type": "Callable / Function",
      "default": "() => true",
      "desc": "切换标签之前的钩子函数，若返回 false 则阻止切换",
      "version": "v1.0.5"
    }
  ],
  "events": [
    {
      "name": "tab_clicked",
      "desc": "点击选中某个选项卡时触发",
      "params": "(index: int, name: String)",
      "version": "v1.0.0"
    },
    {
      "name": "tab_changed",
      "desc": "当前激活选项卡发生改变时触发",
      "params": "(index: int, name: String)",
      "version": "v1.0.0"
    },
    {
      "name": "tab_added",
      "desc": "动态添加新选项卡时触发",
      "params": "(index: int, name: String)",
      "version": "v1.0.5"
    },
    {
      "name": "tab_removed",
      "desc": "选项卡被移除销毁时触发",
      "params": "(index: int, name: String)",
      "version": "v1.0.5"
    },
    {
      "name": "tab_close_requested",
      "desc": "用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)",
      "params": "(index: int, name: String)",
      "version": "v1.0.5"
    }
  ],
  "methods": [
    {
      "name": "add_tab(name, panel, closable=false, icon=null)",
      "desc": "动态追加一个选项卡及关联内容面板",
      "params": "(name: String, panel: Control) -> void",
      "version": "v1.0.0"
    },
    {
      "name": "remove_tab(index)",
      "desc": "移除指定索引处的选项卡",
      "params": "(index: int) -> void",
      "version": "v1.0.0"
    },
    {
      "name": "set_current_tab(index)",
      "desc": "程序化切换当前激活的选项卡",
      "params": "(index: int) -> void",
      "version": "v1.0.0"
    },
    {
      "name": "set_tab_icon(index, icon_name)",
      "desc": "为指定索引处的标签设置图标",
      "params": "(index: int, icon_name: String) -> void",
      "version": "v1.0.5"
    },
    {
      "name": "set_tab_badge(index, count)",
      "desc": "为指定索引处的标签设置右上角未读徽标数",
      "params": "(index: int, count: int) -> void",
      "version": "v1.0.5"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "默认插槽，放置子标签页内容面板 (GTabPane 节点集合)",
      "child": "GTabPane / Control",
      "example": "<GTabs><GTabPane label=\"Tab 1\">Content 1</GTabPane></GTabs>",
      "version": "v1.0.0"
    },
    {
      "name": "prefix",
      "desc": "标签栏前置自定义挂件区域（如搜索框、大区选择器）",
      "child": "Control",
      "example": "<template #prefix><GInput placeholder=\"搜索...\" /></template>",
      "version": "v1.0.5"
    },
    {
      "name": "suffix",
      "desc": "标签栏后置自定义操作区域（如一键全部关闭、配置齿轮）",
      "child": "Control",
      "example": "<template #suffix><GButton icon=\"gear\" /></template>",
      "version": "v1.0.5"
    },
    {
      "name": "tab-label",
      "desc": "自定义单个 Tab 标签头部渲染插槽（用于复杂图文混排）",
      "child": "Control",
      "example": "<template #tab-label=\"{ tab }\"><GIcon :name=\"tab.icon\" /> {{ tab.label }}</template>",
      "version": "v1.0.5"
    }
  ]
};
