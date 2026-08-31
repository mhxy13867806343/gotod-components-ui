// =========================================================================
// Gotod Components UI - Component: tabs
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tabs'] = {
  "title": "Tabs 标签页 (GTabs)",
  "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、四方位切换、标签拖拽排序（Drag & Drop）、动态增删改查（双击重命名/关闭/新建）与插槽自定义。",
  "demos": [
    {
      "title": "1. 基础滑动下划线选项卡 (Basic Tabs: 实时点击切换内容)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"t1Btn0\" class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary); font-weight:600; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===0);\n                b.style.borderBottom = i===0 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'block';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'none';\n            \">角色属性</button>\n            <button id=\"t1Btn1\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===1);\n                b.style.borderBottom = i===1 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'block';\n              document.getElementById('t1P2').style.display = 'none';\n            \">技能加点</button>\n            <button id=\"t1Btn2\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===2);\n                b.style.borderBottom = i===2 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'block';\n            \">天赋树</button>\n          </div>\n          <div id=\"t1P0\" style=\"font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>💪 <b>力量</b>: 142 <span style=\"color:var(--success); font-size:11px;\">(+15% 物理攻击)</span></div>\n            <div>⚡ <b>敏捷</b>: 98 <span style=\"color:var(--primary); font-size:11px;\">(+8% 暴击率)</span></div>\n            <div>🧠 <b>智力</b>: 180 <span style=\"color:var(--warning); font-size:11px;\">(+240 魔法值)</span></div>\n          </div>\n          <div id=\"t1P1\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🔥 <b>烈焰风暴</b> (Lv.5) - 消耗 45 MP，造成 320% 范围火伤</div>\n            <div>❄️ <b>极寒冰锥</b> (Lv.3) - 消耗 30 MP，造成 180% 伤害并减速 40%</div>\n          </div>\n          <div id=\"t1P2\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🌟 <b>狂暴之心</b> (Tier 1) - 生命值低于 30% 时攻击力提升 50%</div>\n            <div>🛡️ <b>坚韧意志</b> (Tier 2) - 受到的控制持续时间缩短 25%</div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 基础选项卡与面板切换\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)\ntabs.add_tab(\"技能加点\", skill_panel)\ntabs.add_tab(\"天赋树\", talent_panel)\nadd_child(tabs)"
    },
    {
      "title": "2. 动态增删改查：新增、双击修改/重命名与关闭 (CRUD: Add, Rename, Remove Tabs)",
      "render": "\n        <div id=\"tabCrudBox\" style=\"max-width:500px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <!-- Top Operation Toolbar -->\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border-base); padding-bottom:8px;\">\n            <div style=\"font-size:12px; color:var(--text-secondary);\">\n              💡 <b>操作指南</b>：点击切换 | 双击或点 ✏️ 重命名 | 点 × 关闭\n            </div>\n            <button class=\"g-btn g-btn-primary\" style=\"height:26px; padding:0 10px; font-size:11px;\" onclick=\"\n              window.crudTabCount = (window.crudTabCount || 3) + 1;\n              const bar = document.getElementById('crudTabBar');\n              const panelBox = document.getElementById('crudPanelBox');\n              const newId = 'crudT_' + window.crudTabCount;\n              \n              // Create Tab Header\n              const tab = document.createElement('div');\n              tab.id = newId;\n              tab.className = 'g-tag g-tag-primary';\n              tab.style = 'display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;';\n              tab.innerHTML = '<span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">自定义面板 ' + window.crudTabCount + '</span> <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i> <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" onclick=\"window.removeCrudTab(\\'' + newId + '\\')\"></i>';\n              tab.onclick = function(e){ if(!e.target.classList.contains('fa-xmark') && !e.target.classList.contains('fa-pen') && e.target.tagName !== 'INPUT') window.selectCrudTab(newId); };\n              bar.appendChild(tab);\n\n              // Create Panel\n              const p = document.createElement('div');\n              p.id = 'panel_' + newId;\n              p.style = 'display:none; font-size:13px; color:var(--text-regular); line-height:1.6;';\n              p.innerHTML = '📄 这是 <b>自定义面板 ' + window.crudTabCount + '</b> 的内容区。<br><span style=\"color:var(--text-secondary); font-size:11px;\">创建时间: ' + new Date().toLocaleTimeString() + '</span>';\n              panelBox.appendChild(p);\n\n              window.selectCrudTab(newId);\n              showToast('已成功新增【自定义面板 ' + window.crudTabCount + '】', 'success');\n            \">\n              <i class=\"fa-solid fa-plus\"></i> 新增标签\n            </button>\n          </div>\n\n          <!-- Tab Headers -->\n          <div id=\"crudTabBar\" style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:14px;\">\n            <div id=\"crudT_1\" class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px; box-shadow:0 0 0 2px var(--primary);\" onclick=\"window.selectCrudTab('crudT_1')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">地图关卡 A</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_1')\"></i>\n            </div>\n            <div id=\"crudT_2\" class=\"g-tag g-tag-default\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;\" onclick=\"window.selectCrudTab('crudT_2')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">怪物配置 B</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_2')\"></i>\n            </div>\n            <div id=\"crudT_3\" class=\"g-tag g-tag-default\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;\" onclick=\"window.selectCrudTab('crudT_3')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">掉落物列表 C</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_3')\"></i>\n            </div>\n          </div>\n\n          <!-- Tab Panels Container -->\n          <div id=\"crudPanelBox\" style=\"background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:12px; min-height:60px;\">\n            <div id=\"panel_crudT_1\" style=\"font-size:13px; color:var(--text-regular);\">\n              🗺️ <b>地图关卡 A 内容</b>：包含地下城第 1~5 层的地牢地形与刷怪点数据。\n            </div>\n            <div id=\"panel_crudT_2\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              👾 <b>怪物配置 B 内容</b>：包含哥布林、暗影弓手与地狱巨犬的血量与攻击力数值。\n            </div>\n            <div id=\"panel_crudT_3\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              💎 <b>掉落物列表 C 内容</b>：包含史诗金币袋、红宝石及强化卷轴掉落概率矩阵。\n            </div>\n          </div>\n        </div>\n\n        <script>\n          window.selectCrudTab = function(id) {\n            const bar = document.getElementById('crudTabBar');\n            const panelBox = document.getElementById('crudPanelBox');\n            if(!bar || !panelBox) return;\n            Array.from(bar.children).forEach(t => {\n              const isCur = t.id === id;\n              t.className = isCur ? 'g-tag g-tag-primary' : 'g-tag g-tag-default';\n              t.style.boxShadow = isCur ? '0 0 0 2px var(--primary)' : 'none';\n            });\n            Array.from(panelBox.children).forEach(p => {\n              p.style.display = (p.id === 'panel_' + id) ? 'block' : 'none';\n            });\n          };\n\n          window.editTabTitle = function(spanEl) {\n            if(!spanEl || spanEl.querySelector('input')) return;\n            const oldText = spanEl.innerText;\n            spanEl.innerHTML = '<input type=\"text\" value=\"' + oldText + '\" style=\"width:90px; height:20px; font-size:11px; padding:0 4px; border:1px solid var(--primary); border-radius:3px; outline:none; background:var(--bg-card); color:var(--text-primary);\" autofocus>';\n            const input = spanEl.querySelector('input');\n            input.focus();\n            input.select();\n            function finish() {\n              const newTitle = input.value.trim() || oldText;\n              spanEl.innerText = newTitle;\n              showToast('标签已重命名为：' + newTitle, 'info');\n            }\n            input.onblur = finish;\n            input.onkeydown = function(e){ if(e.key==='Enter') finish(); };\n          };\n\n          window.removeCrudTab = function(id) {\n            const tab = document.getElementById(id);\n            const panel = document.getElementById('panel_' + id);\n            const bar = document.getElementById('crudTabBar');\n            if(bar && bar.children.length <= 1) {\n              showToast('至少保留一个标签页，无法继续删除！', 'warning');\n              return;\n            }\n            if(tab) tab.remove();\n            if(panel) panel.remove();\n            showToast('已关闭并移除标签页', 'info');\n            // Select first remaining\n            if(bar && bar.children.length > 0) {\n              window.selectCrudTab(bar.children[0].id);\n            }\n          };\n        </script>\n      ",
      "code": "# GDScript: 动态增删改（可新增、重命名与关闭）\nvar tabs = GTabs.new()\ntabs.editable = true\ntabs.add_tab(\"地图关卡 A\", panel_a)\ntabs.add_tab(\"怪物配置 B\", panel_b)\n\n# 动态重命名标签名称\ntabs.set_tab_title(0, \"地下城 BOSS 战关卡\")\n\n# 信号监听\ntabs.tab_added.connect(func(idx, name): print(\"新增标签:\", name))\ntabs.tab_removed.connect(func(idx, name): print(\"关闭标签:\", name))\ntabs.tab_renamed.connect(func(idx, new_name): print(\"重命名为:\", new_name))"
    },
    {
      "title": "3. 标签自由拖拽排序与前后移动 (Draggable & Reorderable Tabs: 拖拽调整顺序)",
      "render": "\n        <div style=\"max-width:500px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;\">\n            <span style=\"font-size:12px; color:var(--text-secondary);\"><i class=\"fa-solid fa-up-down-left-right\" style=\"color:var(--primary);\"></i> 🖱️ <b>按住标签左右拖拽</b> 即可实时改变前后排列顺序：</span>\n            <span id=\"dragOrderTip\" class=\"g-tag g-tag-success\" style=\"font-size:10px; padding:1px 6px;\">排序已同步</span>\n          </div>\n\n          <!-- Drag & Drop Tab Bar -->\n          <div id=\"sortableTabBar\" style=\"display:flex; gap:8px; align-items:center; margin-bottom:14px; padding:6px; background:var(--bg-card); border-radius:6px; border:1px dashed var(--border-base); min-height:44px;\">\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"🎒 装备栏\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>🎒 装备栏</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"🧪 消耗药剂\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>🧪 消耗药剂</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"📜 任务道具\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>📜 任务道具</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"💎 宝石镶嵌\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>💎 宝石镶嵌</span>\n            </div>\n          </div>\n\n          <!-- Position Swap Buttons for Mobile / Touch -->\n          <div style=\"display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary);\">\n            <span>快捷移动按钮：</span>\n            <div style=\"display:flex; gap:6px;\">\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"window.shiftTabLeft()\">⬅️ 向左移动首项</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"window.shiftTabRight()\">➡️ 向右移动末项</button>\n            </div>\n          </div>\n        </div>\n\n        <script>\n          (function(){\n            const container = document.getElementById('sortableTabBar');\n            if(!container) return;\n            let draggedItem = null;\n\n            container.addEventListener('dragstart', function(e){\n              if(e.target.classList.contains('drag-tab-item')) {\n                draggedItem = e.target;\n                e.target.style.opacity = '0.4';\n                e.target.style.cursor = 'grabbing';\n              }\n            });\n\n            container.addEventListener('dragend', function(e){\n              if(e.target.classList.contains('drag-tab-item')) {\n                e.target.style.opacity = '1';\n                e.target.style.cursor = 'grab';\n                const items = Array.from(container.querySelectorAll('.drag-tab-item')).map(el => el.getAttribute('data-name'));\n                showToast('标签顺序已更新: ' + items.join(' → '), 'success');\n              }\n            });\n\n            container.addEventListener('dragover', function(e){\n              e.preventDefault();\n              const afterElement = getDragAfterElement(container, e.clientX);\n              if (draggedItem) {\n                if (afterElement == null) {\n                  container.appendChild(draggedItem);\n                } else {\n                  container.insertBefore(draggedItem, afterElement);\n                }\n              }\n            });\n\n            function getDragAfterElement(container, x) {\n              const draggableElements = [...container.querySelectorAll('.drag-tab-item:not([style*=\"opacity: 0.4\"])')];\n              return draggableElements.reduce((closest, child) => {\n                const box = child.getBoundingClientRect();\n                const offset = x - box.left - box.width / 2;\n                if (offset < 0 && offset > closest.offset) {\n                  return { offset: offset, element: child };\n                } else {\n                  return closest;\n                }\n              }, { offset: Number.NEGATIVE_INFINITY }).element;\n            }\n\n            window.shiftTabLeft = function() {\n              const first = container.firstElementChild;\n              if (first) {\n                container.appendChild(first);\n                showToast('已调整标签排序', 'info');\n              }\n            };\n            window.shiftTabRight = function() {\n              const last = container.lastElementChild;\n              if (last) {\n                container.insertBefore(last, container.firstElementChild);\n                showToast('已调整标签排序', 'info');\n              }\n            };\n          })();\n        </script>\n      ",
      "code": "# GDScript: 启用标签拖拽重排与移动\nvar tabs = GTabs.new()\ntabs.draggable = true # 允许用户鼠标/手指拖拽标签重新排序\ntabs.reorderable = true\n\n# 标签排序改变信号\ntabs.tab_reordered.connect(func(from_index: int, to_index: int):\n    print(\"标签从 %d 移动至 %d\" % [from_index, to_index])\n)\n\n# 亦可程序化移动标签位置\ntabs.move_tab(0, 2) # 将第 0 个标签移动到索引 2"
    },
    {
      "title": "4. 卡片化与胶囊样式 (Card Style: type=\"card\")",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; gap:6px; margin-bottom:14px;\">\n            <button id=\"t2Btn0\" class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:5px 14px;\" onclick=\"\n              document.getElementById('t2Btn0').className = 'g-btn g-btn-primary';\n              document.getElementById('t2Btn1').className = 'g-btn g-btn-default';\n              document.getElementById('t2P0').style.display = 'block';\n              document.getElementById('t2P1').style.display = 'none';\n            \">📜 主线任务 (4)</button>\n            <button id=\"t2Btn1\" class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:5px 14px;\" onclick=\"\n              document.getElementById('t2Btn0').className = 'g-btn g-btn-default';\n              document.getElementById('t2Btn1').className = 'g-btn g-btn-primary';\n              document.getElementById('t2P0').style.display = 'none';\n              document.getElementById('t2P1').style.display = 'block';\n            \">⚔️ 支线悬赏 (12)</button>\n          </div>\n          <div id=\"t2P0\" style=\"font-size:13px; color:var(--text-regular);\">\n            <div style=\"font-weight:700; color:var(--primary); margin-bottom:4px;\">🎯 第 7 章 · 迷雾森林的低语</div>\n            <div style=\"font-size:12px; color:var(--text-secondary);\">前往遗忘神庙寻找失落的月神法杖 (已完成 2/3)</div>\n          </div>\n          <div id=\"t2P1\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n            <div style=\"font-weight:700; color:var(--warning); margin-bottom:4px;\">💰 悬赏通缉：击杀暴食恶魔</div>\n            <div style=\"font-size:12px; color:var(--text-secondary);\">赏金: 5,000 金币 + 史诗级轻铠一件</div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 卡片化标签页\ntabs.tab_type = GTabs.Type.CARD"
    },
    {
      "title": "5. 标签四方位位置控制 (Position: Left 垂直侧边栏 vs Top 顶部)",
      "render": "\n        <div style=\"display:flex; border:1px solid var(--border-base); border-radius:8px; max-width:440px; height:120px; background:var(--bg-surface); overflow:hidden;\">\n          <div style=\"width:110px; border-right:1px solid var(--border-base); padding:8px; display:flex; flex-direction:column; gap:4px; background:var(--bg-card);\">\n            <button id=\"t3Btn0\" class=\"icon-category-btn active\" style=\"text-align:left; font-size:11px; padding:6px 8px; width:100%; border-radius:4px;\" onclick=\"\n              document.getElementById('t3Btn0').classList.add('active');\n              document.getElementById('t3Btn1').classList.remove('active');\n              document.getElementById('t3P0').style.display = 'block';\n              document.getElementById('t3P1').style.display = 'none';\n            \">⚙️ 常规设置</button>\n            <button id=\"t3Btn1\" class=\"icon-category-btn\" style=\"text-align:left; font-size:11px; padding:6px 8px; width:100%; border-radius:4px;\" onclick=\"\n              document.getElementById('t3Btn0').classList.remove('active');\n              document.getElementById('t3Btn1').classList.add('active');\n              document.getElementById('t3P0').style.display = 'none';\n              document.getElementById('t3P1').style.display = 'block';\n            \">🎮 画面画质</button>\n          </div>\n          <div style=\"flex:1; padding:14px; font-size:12px; color:var(--text-regular);\">\n            <div id=\"t3P0\">\n              <div style=\"font-weight:700; margin-bottom:6px;\">音频与常规设置</div>\n              <div style=\"color:var(--text-secondary);\">主音量: 80% | 背景音乐: 开 | 自动存档: 开启</div>\n            </div>\n            <div id=\"t3P1\" style=\"display:none;\">\n              <div style=\"font-weight:700; margin-bottom:6px;\">画面渲染配置</div>\n              <div style=\"color:var(--text-secondary);\">分辨率: 2560x1440 | 阴影质量: 极致 | 垂直同步: 开启</div>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 垂直左侧标签页\ntabs.tab_position = GTabs.Position.LEFT"
    },
    {
      "title": "6. 自定义图标与未读徽标插槽 (Icon & Badge Integration)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; gap:8px; margin-bottom:12px;\">\n            <button id=\"t4Btn0\" class=\"icon-category-btn active\" style=\"padding:6px 12px; display:inline-flex; align-items:center; gap:6px;\" onclick=\"\n              document.getElementById('t4Btn0').classList.add('active');\n              document.getElementById('t4Btn1').classList.remove('active');\n              document.getElementById('t4P0').style.display = 'block';\n              document.getElementById('t4P1').style.display = 'none';\n            \">\n              <i class=\"fa-solid fa-envelope\"></i> 邮箱系统\n              <span class=\"g-badge\" style=\"background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:700;\">3</span>\n            </button>\n            <button id=\"t4Btn1\" class=\"icon-category-btn\" style=\"padding:6px 12px; display:inline-flex; align-items:center; gap:6px;\" onclick=\"\n              document.getElementById('t4Btn0').classList.remove('active');\n              document.getElementById('t4Btn1').classList.add('active');\n              document.getElementById('t4P0').style.display = 'none';\n              document.getElementById('t4P1').style.display = 'block';\n            \">\n              <i class=\"fa-solid fa-users\"></i> 好友列表 (12)\n            </button>\n          </div>\n          <div id=\"t4P0\" style=\"font-size:12px; color:var(--text-secondary);\">\n            📩 收到系统维护补偿邮件：【钻石 x 500】点击附件即可一键领取。\n          </div>\n          <div id=\"t4P1\" style=\"display:none; font-size:12px; color:var(--text-secondary);\">\n            👥 当前在线好友：8 人 | 离线好友：4 人\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 图标与徽标插槽\ntabs.set_tab_icon(0, \"envelope\")\ntabs.set_tab_badge(0, 3)"
    },
    {
      "title": "7. 游戏商城商品分类联动展示 (Game Store Category Filtering)",
      "render": "\n        <div style=\"max-width:440px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:14px;\">\n          <div style=\"display:flex; gap:8px; margin-bottom:12px;\">\n            <button id=\"t6Btn0\" class=\"icon-category-btn active\" style=\"padding:6px 12px;\" onclick=\"\n              document.getElementById('t6Btn0').classList.add('active');\n              document.getElementById('t6Btn1').classList.remove('active');\n              document.getElementById('t6P0').style.display = 'grid';\n              document.getElementById('t6P1').style.display = 'none';\n            \">⚔️ 武器装备</button>\n            <button id=\"t6Btn1\" class=\"icon-category-btn\" style=\"padding:6px 12px;\" onclick=\"\n              document.getElementById('t6Btn0').classList.remove('active');\n              document.getElementById('t6Btn1').classList.add('active');\n              document.getElementById('t6P0').style.display = 'none';\n              document.getElementById('t6P1').style.display = 'grid';\n            \">🧪 炼金药剂</button>\n          </div>\n          <div id=\"t6P0\" style=\"display:grid; grid-template-columns:1fr 1fr; gap:10px;\">\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🗡️ 龙鳞破天剑</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">攻击力 +240 | 12,000 🪙</div>\n            </div>\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🏹 精灵逐风弓</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">攻速 +35% | 9,800 🪙</div>\n            </div>\n          </div>\n          <div id=\"t6P1\" style=\"display:none; grid-template-columns:1fr 1fr; gap:10px;\">\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">🧪 远古生命源泉</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">瞬回 2000 HP | 150 🪙</div>\n            </div>\n            <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n              <div style=\"font-weight:700;\">⚡ 疾风迅捷药水</div>\n              <div style=\"color:#e6a23c; font-size:11px; margin-top:2px;\">移速 +50% | 80 🪙</div>\n            </div>\n          </div>\n        </div>\n      ",
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
      "desc": "标签是否同时可增加、双击重命名和关闭",
      "version": "v1.0.5"
    },
    {
      "name": "draggable / reorderable",
      "type": "boolean",
      "default": "false",
      "desc": "是否允许玩家鼠标/手指拖拽标签重新排序",
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
      "name": "tab_renamed",
      "desc": "选项卡被编辑重命名时触发",
      "params": "(index: int, new_title: String)",
      "version": "v1.0.5"
    },
    {
      "name": "tab_reordered",
      "desc": "选项卡被拖拽移动改变顺序时触发",
      "params": "(from_index: int, to_index: int)",
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
      "name": "set_tab_title(index, new_title)",
      "desc": "重命名或更新指定索引处选项卡的标题文本",
      "params": "(index: int, new_title: String) -> void",
      "version": "v1.0.5"
    },
    {
      "name": "move_tab(from_index, to_index)",
      "desc": "将指定索引处的标签移动到新的索引位置",
      "params": "(from_index: int, to_index: int) -> void",
      "version": "v1.0.5"
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
