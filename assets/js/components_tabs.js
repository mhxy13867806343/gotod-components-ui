// =========================================================================
// Gotod Components UI - Component: tabs
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['tabs'] = {
  "title": "Tabs 标签页 (GTabs)",
  "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI、Ant Design 与 Vant UI 规范，支持基础划线、卡片化、吸顶模式（Sticky Header）、四方位切换、标签拖拽排序（Drag & Drop）、动态增删改查（双击重命名/关闭/新建）、内容切换过渡动画（Fade/Slide/Zoom）、异步懒加载与 before-leave 切换拦截钩子。",
  "demos": [
    {
      "title": "1. 基础滑动下划线选项卡 (Basic Tabs: 实时点击切换内容)",
      "render": "\n        <div style=\"max-width:460px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"t1Btn0\" class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary); font-weight:600; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===0);\n                b.style.borderBottom = i===0 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'block';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'none';\n            \">角色属性</button>\n            <button id=\"t1Btn1\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===1);\n                b.style.borderBottom = i===1 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'block';\n              document.getElementById('t1P2').style.display = 'none';\n            \">技能加点</button>\n            <button id=\"t1Btn2\" class=\"icon-category-btn\" style=\"border-radius:0; padding:6px 14px;\" onclick=\"\n              ['t1Btn0','t1Btn1','t1Btn2'].forEach((id, i) => {\n                const b = document.getElementById(id);\n                b.classList.toggle('active', i===2);\n                b.style.borderBottom = i===2 ? '2px solid var(--primary)' : 'none';\n              });\n              document.getElementById('t1P0').style.display = 'none';\n              document.getElementById('t1P1').style.display = 'none';\n              document.getElementById('t1P2').style.display = 'block';\n            \">天赋树</button>\n          </div>\n          <div id=\"t1P0\" style=\"font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>💪 <b>力量</b>: 142 <span style=\"color:var(--success); font-size:11px;\">(+15% 物理攻击)</span></div>\n            <div>⚡ <b>敏捷</b>: 98 <span style=\"color:var(--primary); font-size:11px;\">(+8% 暴击率)</span></div>\n            <div>🧠 <b>智力</b>: 180 <span style=\"color:var(--warning); font-size:11px;\">(+240 魔法值)</span></div>\n          </div>\n          <div id=\"t1P1\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🔥 <b>烈焰风暴</b> (Lv.5) - 消耗 45 MP，造成 320% 范围火伤</div>\n            <div>❄️ <b>极寒冰锥</b> (Lv.3) - 消耗 30 MP，造成 180% 伤害并减速 40%</div>\n          </div>\n          <div id=\"t1P2\" style=\"display:none; font-size:13px; color:var(--text-regular); line-height:1.8;\">\n            <div>🌟 <b>狂暴之心</b> (Tier 1) - 生命值低于 30% 时攻击力提升 50%</div>\n            <div>🛡️ <b>坚韧意志</b> (Tier 2) - 受到的控制持续时间缩短 25%</div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 基础选项卡与面板切换\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)\ntabs.add_tab(\"技能加点\", skill_panel)\ntabs.add_tab(\"天赋树\", talent_panel)\nadd_child(tabs)"
    },
    {
      "title": "2. 滚动吸顶模式 (Sticky Header Tabs: 向下滚动时标签栏自动贴顶悬浮)",
      "render": "\n        <div style=\"max-width:480px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;\">\n          <div style=\"padding:10px 14px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;\">\n            <span style=\"font-size:12px; color:var(--text-secondary);\"><i class=\"fa-solid fa-thumbtack\" style=\"color:var(--primary);\"></i> 试着在下方列表内向下滑动页面：</span>\n            <label style=\"display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; font-weight:600;\">\n              <input type=\"checkbox\" id=\"tabStickyToggle\" checked onchange=\"\n                const header = document.getElementById('stickyTabHeader');\n                header.style.position = this.checked ? 'sticky' : 'static';\n                showToast(this.checked ? '已开启 Tabs 吸顶模式' : '已关闭 Tabs 吸顶模式', 'info');\n              \"> 启用 sticky 吸顶模式\n            </label>\n          </div>\n\n          <div id=\"stickyScrollContainer\" style=\"height:220px; overflow-y:auto; position:relative; scroll-behavior:smooth;\">\n            <div style=\"height:90px; background:linear-gradient(135deg, #1e3a8a, #0f172a); padding:16px; color:#fff; display:flex; flex-direction:column; justify-content:center;\">\n              <div style=\"font-weight:700; font-size:15px;\">🏰 遗忘神庙 · 讨伐物资清单</div>\n              <div style=\"font-size:11px; opacity:0.75; margin-top:4px;\">向下滚动列表时，下方分类栏将自动吸附贴顶固定！</div>\n            </div>\n\n            <div id=\"stickyTabHeader\" style=\"position:sticky; top:0; z-index:10; background:var(--bg-surface); border-bottom:1px solid var(--border-base); box-shadow:0 2px 8px rgba(0,0,0,0.15); display:flex; gap:6px; padding:6px 12px;\">\n              <button class=\"g-btn g-btn-primary\" style=\"font-size:11px; padding:3px 10px;\" onclick=\"showToast('切换至武器栏', 'info')\">⚔️ 武器装备</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:3px 10px;\" onclick=\"showToast('切换至防具栏', 'info')\">🛡️ 传奇护甲</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:3px 10px;\" onclick=\"showToast('切换至药剂栏', 'info')\">🧪 炼金消耗品</button>\n            </div>\n\n            <div style=\"padding:12px; display:flex; flex-direction:column; gap:8px;\">\n              <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n                <b>🗡️ 龙鳞破天剑 (Lv.80)</b><br><span style=\"color:var(--text-secondary); font-size:11px;\">攻击力 +480 | 暴击伤害 +35%</span>\n              </div>\n              <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n                <b>🏹 精灵逐风长弓 (Lv.75)</b><br><span style=\"color:var(--text-secondary); font-size:11px;\">攻击速度 +40% | 命中率 +100%</span>\n              </div>\n              <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n                <b>🪄 远古大魔导师法杖 (Lv.85)</b><br><span style=\"color:var(--text-secondary); font-size:11px;\">法术强度 +620 | 冷却缩减 +20%</span>\n              </div>\n              <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n                <b>🛡️ 泰坦重型神盾 (Lv.80)</b><br><span style=\"color:var(--text-secondary); font-size:11px;\">物理防御 +360 | 格挡率 45%</span>\n              </div>\n              <div style=\"background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-base); font-size:12px;\">\n                <b>🧪 远古生命复苏圣水</b><br><span style=\"color:var(--text-secondary); font-size:11px;\">战斗中瞬间恢复 100% HP 与全状态异常</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 启用标签栏滚动吸顶模式 (Sticky Header)\nvar tabs = GTabs.new()\ntabs.sticky = true # 开启滚动吸顶\ntabs.offset_top = 0 # 吸顶距离容器顶部的像素偏移量\nscroll_container.add_child(tabs)"
    },
    {
      "title": "3. 内容切换动画与过渡效果 (Content Transitions: Fade / Slide / Zoom)",
      "render": "\n        <div style=\"max-width:480px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;\">\n            <span style=\"font-size:12px; color:var(--text-secondary);\">选择过渡动画模式：</span>\n            <select id=\"tabAnimType\" class=\"g-input\" style=\"width:140px; height:28px; font-size:11px; padding:0 8px;\">\n              <option value=\"fade\">💫 淡入 (Fade In)</option>\n              <option value=\"slide\">➡️ 横向滑入 (Slide In)</option>\n              <option value=\"zoom\">🔍 缩放弹入 (Zoom In)</option>\n            </select>\n          </div>\n\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"animBtn0\" class=\"icon-category-btn active\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAnimatedTab(0)\">⚔️ 战斗总览</button>\n            <button id=\"animBtn1\" class=\"icon-category-btn\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAnimatedTab(1)\">🏆 成就荣誉</button>\n            <button id=\"animBtn2\" class=\"icon-category-btn\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAnimatedTab(2)\">📜 历史战绩</button>\n          </div>\n\n          <div id=\"animPanelContainer\" style=\"background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:14px; min-height:80px; overflow:hidden; position:relative;\">\n            <div id=\"animPanel0\" style=\"font-size:13px; color:var(--text-regular); transition:all 0.35s cubic-bezier(0.16, 1, 0.3, 1);\">\n              ⚔️ <b>当前赛季胜率</b>: 68.5% (共 142 场，MVP 次数: 38 次)<br>\n              <span style=\"color:var(--text-secondary); font-size:11px;\">段位：傲视宗师 · 482 胜点</span>\n            </div>\n            <div id=\"animPanel1\" style=\"display:none; font-size:13px; color:var(--text-regular); transition:all 0.35s cubic-bezier(0.16, 1, 0.3, 1);\">\n              🏆 <b>最新解锁成就</b>：【弑神之怒】—— 在单场对局中连续击杀 3 位世界 BOSS！<br>\n              <span style=\"color:var(--warning); font-size:11px;\">成就点数 +500 | 稀有称号「灭绝之影」</span>\n            </div>\n            <div id=\"animPanel2\" style=\"display:none; font-size:13px; color:var(--text-regular); transition:all 0.35s cubic-bezier(0.16, 1, 0.3, 1);\">\n              📜 <b>最近 3 场对战</b>：<br>\n              • 胜利 18-3 (MVP) · 深渊暗礁 · 25 分钟前<br>\n              • 胜利 12-5 · 熔岩火窟 · 1 小时前\n            </div>\n          </div>\n        </div>\n\n        <script>\n          window.switchAnimatedTab = function(idx) {\n            [0, 1, 2].forEach(i => {\n              const btn = document.getElementById('animBtn' + i);\n              const p = document.getElementById('animPanel' + i);\n              const isCur = i === idx;\n              btn.classList.toggle('active', isCur);\n              if (isCur) {\n                p.style.display = 'block';\n                const anim = document.getElementById('tabAnimType').value;\n                if (anim === 'fade') {\n                  p.style.opacity = '0';\n                  p.style.transform = 'none';\n                  setTimeout(() => { p.style.opacity = '1'; }, 20);\n                } else if (anim === 'slide') {\n                  p.style.opacity = '0';\n                  p.style.transform = 'translateX(24px)';\n                  setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'translateX(0)'; }, 20);\n                } else if (anim === 'zoom') {\n                  p.style.opacity = '0';\n                  p.style.transform = 'scale(0.92)';\n                  setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'scale(1)'; }, 20);\n                }\n              } else {\n                p.style.display = 'none';\n              }\n            });\n          };\n        </script>\n      ",
      "code": "# GDScript: 启用内容过渡动画 (Transition Effect)\nvar tabs = GTabs.new()\ntabs.transition_type = GTabs.Transition.SLIDE # FADE, SLIDE, ZOOM, NONE\ntabs.transition_duration = 0.25 # 过渡耗时 (秒)"
    },
    {
      "title": "4. 异步数据懒加载与加载指示器 (Async Lazy Data Loading on Tab Switch)",
      "render": "\n        <div style=\"max-width:480px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"asyncTabBtn0\" class=\"icon-category-btn active\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAsyncTab(0)\">本地配置 (即时)</button>\n            <button id=\"asyncTabBtn1\" class=\"icon-category-btn\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAsyncTab(1)\">📈 全服排行榜 (异步)</button>\n            <button id=\"asyncTabBtn2\" class=\"icon-category-btn\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.switchAsyncTab(2)\">📦 跨服拍卖行 (异步)</button>\n          </div>\n\n          <div style=\"background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:16px; min-height:90px; position:relative;\">\n            <div id=\"asyncTabSpinner\" style=\"display:none; text-align:center; padding:18px 0;\">\n              <i class=\"fa-solid fa-spinner fa-spin\" style=\"font-size:20px; color:var(--primary); margin-bottom:8px;\"></i>\n              <div style=\"font-size:12px; color:var(--text-secondary);\">正在向远程游戏服务器拉取数据...</div>\n            </div>\n\n            <div id=\"asyncPanel0\" style=\"font-size:13px; color:var(--text-regular);\">\n              ⚙️ <b>本地缓存配置</b>：当前渲染画质为「极致」，声音开启，帧率锁定 120 FPS。\n            </div>\n            <div id=\"asyncPanel1\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              🥇 <b>第 1 名</b>：弑神者·亚瑟 (战力: 9,842,100)<br>\n              🥈 <b>第 2 名</b>：暗影游侠·艾琳 (战力: 9,120,400)<br>\n              🥉 <b>第 3 名</b>：神圣法皇·卡尔 (战力: 8,980,000)\n            </div>\n            <div id=\"asyncPanel2\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              💎 <b>今日热门拍品</b>：<br>\n              • 【+15 绝世神罚之剑】一口价: 800,000 🪙<br>\n              • 【太古龙神坐骑封印石】当前最高出价: 520,000 🪙\n            </div>\n          </div>\n        </div>\n\n        <script>\n          window.switchAsyncTab = function(idx) {\n            [0, 1, 2].forEach(i => {\n              document.getElementById('asyncTabBtn' + i).classList.toggle('active', i === idx);\n              document.getElementById('asyncPanel' + i).style.display = 'none';\n            });\n\n            if (idx === 0) {\n              document.getElementById('asyncTabSpinner').style.display = 'none';\n              document.getElementById('asyncPanel0').style.display = 'block';\n            } else {\n              const spinner = document.getElementById('asyncTabSpinner');\n              const panel = document.getElementById('asyncPanel' + idx);\n              spinner.style.display = 'block';\n\n              setTimeout(() => {\n                spinner.style.display = 'none';\n                panel.style.display = 'block';\n                panel.style.opacity = '0';\n                setTimeout(() => { panel.style.opacity = '1'; }, 20);\n                showToast('已完成远程数据异步拉取！', 'success');\n              }, 500);\n            }\n          };\n        </script>\n      ",
      "code": "# GDScript: 异步懒加载标签页 (Async Lazy Load)\nvar tabs = GTabs.new()\ntabs.tab_selected.connect(func(index):\n    if index == 1 and not is_ranking_loaded:\n        tabs.set_tab_loading(1, true) # 显示加载菊花\n        var data = await Network.fetch_leaderboard()\n        tabs.update_tab_content(1, data)\n        tabs.set_tab_loading(1, false)\n)"
    },
    {
      "title": "5. 切换前拦截与二次确认钩子 (Async before-leave Guard Hook)",
      "render": "\n        <div style=\"max-width:480px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:14px; gap:8px;\">\n            <button id=\"guardTabBtn0\" class=\"icon-category-btn active\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.trySwitchGuardTab(0)\">📝 角色信息编辑 (未保存)</button>\n            <button id=\"guardTabBtn1\" class=\"icon-category-btn\" style=\"padding:6px 14px; font-weight:600;\" onclick=\"window.trySwitchGuardTab(1)\">📊 战绩统计</button>\n          </div>\n\n          <div id=\"guardPanel0\" style=\"font-size:13px; color:var(--text-regular);\">\n            <div style=\"margin-bottom:8px;\">玩家昵称：</div>\n            <input type=\"text\" id=\"guardInputName\" class=\"g-input\" value=\"Arthur_Godot_Hero\" style=\"width:100%; margin-bottom:6px;\">\n            <span style=\"font-size:11px; color:var(--warning);\">⚠ 当前处于编辑修改状态，未点击保存时切换标签会触发 before-leave 拦截！</span>\n          </div>\n          <div id=\"guardPanel1\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n            📊 <b>战绩统计面板</b>：MVP 率 32%，总助攻 840 次。\n          </div>\n        </div>\n\n        <script>\n          window.trySwitchGuardTab = function(targetIdx) {\n            const currentIdx = document.getElementById('guardTabBtn0').classList.contains('active') ? 0 : 1;\n            if (currentIdx === targetIdx) return;\n\n            if (currentIdx === 0) {\n              const confirmSwitch = confirm('【before-leave 拦截提示】\\n您正在编辑角色信息且尚未保存，确定要放弃修改并切换标签页吗？');\n              if (!confirmSwitch) {\n                showToast('已取消切换，停留在当前编辑面板', 'info');\n                return;\n              }\n            }\n\n            document.getElementById('guardTabBtn0').classList.toggle('active', targetIdx === 0);\n            document.getElementById('guardTabBtn1').classList.toggle('active', targetIdx === 1);\n            document.getElementById('guardPanel0').style.display = targetIdx === 0 ? 'block' : 'none';\n            document.getElementById('guardPanel1').style.display = targetIdx === 1 ? 'block' : 'none';\n            showToast('已允许切换至新面板', 'success');\n          };\n        </script>\n      ",
      "code": "# GDScript: 切换前异步拦截器 (before-leave Guard)\ntabs.before_leave = func(from_idx: int, to_idx: int) -> bool:\n    if from_idx == 0 and has_unsaved_changes:\n        var confirmed = await GDialog.confirm(\"当前表单尚未保存，确认切换吗？\")\n        return confirmed # 返回 true 允许切换，false 阻止并停留在原地\n    return true"
    },
    {
      "title": "6. 动态增删改查：新增、双击修改/重命名与关闭 (CRUD: Add, Rename, Remove Tabs)",
      "render": "\n        <div id=\"tabCrudBox\" style=\"max-width:520px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border-base); padding-bottom:8px;\">\n            <div style=\"font-size:12px; color:var(--text-secondary);\">\n              💡 <b>操作指南</b>：点击切换 | 双击或点 ✏️ 重命名 | 点 × 关闭\n            </div>\n            <button class=\"g-btn g-btn-primary\" style=\"height:26px; padding:0 10px; font-size:11px;\" onclick=\"window.addCrudTab()\">\n              <i class=\"fa-solid fa-plus\"></i> 新增标签\n            </button>\n          </div>\n\n          <div id=\"crudTabBar\" style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:14px;\">\n            <div id=\"crudT_1\" class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px; box-shadow:0 0 0 2px var(--primary);\" onclick=\"if(!event.target.classList.contains('fa-xmark') && !event.target.classList.contains('fa-pen') && event.target.tagName !== 'INPUT') window.selectCrudTab('crudT_1')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">地图关卡 A</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_1')\"></i>\n            </div>\n            <div id=\"crudT_2\" class=\"g-tag g-tag-default\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;\" onclick=\"if(!event.target.classList.contains('fa-xmark') && !event.target.classList.contains('fa-pen') && event.target.tagName !== 'INPUT') window.selectCrudTab('crudT_2')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">怪物配置 B</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_2')\"></i>\n            </div>\n            <div id=\"crudT_3\" class=\"g-tag g-tag-default\" style=\"display:inline-flex; align-items:center; gap:6px; cursor:pointer; padding:4px 10px; font-size:12px; border-radius:6px;\" onclick=\"if(!event.target.classList.contains('fa-xmark') && !event.target.classList.contains('fa-pen') && event.target.tagName !== 'INPUT') window.selectCrudTab('crudT_3')\">\n              <span class=\"tab-title\" ondblclick=\"window.editTabTitle(this)\">掉落物列表 C</span>\n              <i class=\"fa-solid fa-pen\" style=\"font-size:10px; opacity:0.6;\" title=\"重命名\" onclick=\"window.editTabTitle(this.previousElementSibling)\"></i>\n              <i class=\"fa-solid fa-xmark\" style=\"font-size:11px; margin-left:2px;\" title=\"关闭\" onclick=\"window.removeCrudTab('crudT_3')\"></i>\n            </div>\n          </div>\n\n          <div id=\"crudPanelBox\" style=\"background:var(--bg-card); border:1px solid var(--border-base); border-radius:6px; padding:12px; min-height:60px;\">\n            <div id=\"panel_crudT_1\" style=\"font-size:13px; color:var(--text-regular);\">\n              🗺️ <b>地图关卡 A 内容</b>：包含地下城第 1~5 层的地牢地形与刷怪点数据。\n            </div>\n            <div id=\"panel_crudT_2\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              👾 <b>怪物配置 B 内容</b>：包含哥布林、暗影弓手与地狱巨犬的血量与攻击力数值。\n            </div>\n            <div id=\"panel_crudT_3\" style=\"display:none; font-size:13px; color:var(--text-regular);\">\n              💎 <b>掉落物列表 C 内容</b>：包含史诗金币袋、红宝石及强化卷轴掉落概率矩阵。\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 动态增删改（可新增、重命名与关闭）\nvar tabs = GTabs.new()\ntabs.editable = true\ntabs.add_tab(\"地图关卡 A\", panel_a)\ntabs.add_tab(\"怪物配置 B\", panel_b)\ntabs.set_tab_title(0, \"地下城 BOSS 战关卡\") # 动态重命名"
    },
    {
      "title": "7. 标签自由拖拽排序与前后移动 (Draggable & Reorderable Tabs: 拖拽调整顺序)",
      "render": "\n        <div style=\"max-width:520px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;\">\n            <span style=\"font-size:12px; color:var(--text-secondary);\"><i class=\"fa-solid fa-arrows-up-down-left-right\" style=\"color:var(--primary);\"></i> 🖱️ <b>按住标签左右拖拽</b> 即可实时改变前后排列顺序：</span>\n            <span id=\"dragOrderTip\" class=\"g-tag g-tag-success\" style=\"font-size:10px; padding:1px 6px;\">排序就绪</span>\n          </div>\n\n          <div id=\"sortableTabBar\" style=\"display:flex; gap:8px; align-items:center; margin-bottom:14px; padding:8px; background:var(--bg-card); border-radius:6px; border:1px dashed var(--border-base); min-height:46px; user-select:none;\">\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"🎒 装备栏\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\" ondragstart=\"window.onTabDragStart(event, this)\" ondragover=\"window.onTabDragOver(event, this)\" ondrop=\"window.onTabDrop(event, this)\" ondragend=\"window.onTabDragEnd(event, this)\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>🎒 装备栏</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"🧪 消耗药剂\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\" ondragstart=\"window.onTabDragStart(event, this)\" ondragover=\"window.onTabDragOver(event, this)\" ondrop=\"window.onTabDrop(event, this)\" ondragend=\"window.onTabDragEnd(event, this)\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>🧪 消耗药剂</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"📜 任务道具\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\" ondragstart=\"window.onTabDragStart(event, this)\" ondragover=\"window.onTabDragOver(event, this)\" ondrop=\"window.onTabDrop(event, this)\" ondragend=\"window.onTabDragEnd(event, this)\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>📜 任务道具</span>\n            </div>\n            <div class=\"drag-tab-item g-btn g-btn-default\" draggable=\"true\" data-name=\"💎 宝石镶嵌\" style=\"cursor:grab; font-size:12px; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;\" ondragstart=\"window.onTabDragStart(event, this)\" ondragover=\"window.onTabDragOver(event, this)\" ondrop=\"window.onTabDrop(event, this)\" ondragend=\"window.onTabDragEnd(event, this)\">\n              <i class=\"fa-solid fa-grip-vertical\" style=\"color:var(--text-secondary); font-size:11px;\"></i>\n              <span>💎 宝石镶嵌</span>\n            </div>\n          </div>\n\n          <div style=\"display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary);\">\n            <span>快捷调序按钮：</span>\n            <div style=\"display:flex; gap:6px;\">\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"window.shiftTabLeft()\">⬅️ 向左移动首项</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:11px; padding:2px 8px;\" onclick=\"window.shiftTabRight()\">➡️ 向右移动末项</button>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 启用标签拖拽重排与移动\nvar tabs = GTabs.new()\ntabs.draggable = true\ntabs.reorderable = true\ntabs.move_tab(0, 2) # 程序化移动标签"
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
      "name": "sticky",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启滚动吸顶固定模式（在滚动容器内向下滚动时标签栏自动贴顶悬浮）",
      "version": "v1.2"
    },
    {
      "name": "offset_top",
      "type": "int",
      "default": "0",
      "desc": "吸顶时与视口/滚动容器顶部的像素偏移量（支持自定义顶部安全区）",
      "version": "v1.2"
    },
    {
      "name": "type",
      "type": "enum",
      "default": "'' (LINE)",
      "desc": "风格类型：LINE (划线式), CARD (卡片式), BORDER_CARD (边框卡片), SEGMENT (分段器)",
      "version": "v1.0.0"
    },
    {
      "name": "transition_type",
      "type": "enum",
      "default": "GTabs.Transition.FADE",
      "desc": "内容切换动画过渡类型：NONE, FADE (淡入), SLIDE (滑动), ZOOM (缩放)",
      "version": "v1.2"
    },
    {
      "name": "transition_duration",
      "type": "float",
      "default": "0.25",
      "desc": "过渡动画时长（单位：秒）",
      "version": "v1.2"
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
      "version": "v1.2"
    },
    {
      "name": "draggable / reorderable",
      "type": "boolean",
      "default": "false",
      "desc": "是否允许玩家鼠标/手指拖拽标签重新排序",
      "version": "v1.2"
    },
    {
      "name": "tab-position",
      "type": "enum",
      "default": "top",
      "desc": "选项卡所在位置：top (顶部), bottom (底部), left (左侧竖向), right (右侧竖向)",
      "version": "v1.0.0"
    },
    {
      "name": "before-leave",
      "type": "Callable / Function",
      "default": "() => true",
      "desc": "切换标签之前的异步/同步钩子函数，若返回 false 则阻止切换",
      "version": "v1.2"
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
      "name": "tab_sticky_state_changed",
      "desc": "标签栏吸顶状态改变时触发（进入吸顶/脱离吸顶）",
      "params": "(is_sticky: bool)",
      "version": "v1.2"
    },
    {
      "name": "tab_added",
      "desc": "动态添加新选项卡时触发",
      "params": "(index: int, name: String)",
      "version": "v1.2"
    },
    {
      "name": "tab_removed",
      "desc": "选项卡被移除销毁时触发",
      "params": "(index: int, name: String)",
      "version": "v1.2"
    },
    {
      "name": "tab_renamed",
      "desc": "选项卡被编辑重命名时触发",
      "params": "(index: int, new_title: String)",
      "version": "v1.2"
    },
    {
      "name": "tab_reordered",
      "desc": "选项卡被拖拽移动改变顺序时触发",
      "params": "(from_index: int, to_index: int)",
      "version": "v1.2"
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
      "name": "set_sticky(enabled, offset_top=0)",
      "desc": "程序化开启或关闭吸顶悬浮固定模式",
      "params": "(enabled: bool, offset_top: int) -> void",
      "version": "v1.2"
    },
    {
      "name": "set_tab_loading(index, is_loading)",
      "desc": "设置指定标签是否显示异步旋转 Loading 指示器",
      "params": "(index: int, is_loading: bool) -> void",
      "version": "v1.2"
    },
    {
      "name": "set_tab_title(index, new_title)",
      "desc": "重命名或更新指定索引处选项卡的标题文本",
      "params": "(index: int, new_title: String) -> void",
      "version": "v1.2"
    },
    {
      "name": "move_tab(from_index, to_index)",
      "desc": "将指定索引处的标签移动到新的索引位置",
      "params": "(from_index: int, to_index: int) -> void",
      "version": "v1.2"
    },
    {
      "name": "set_current_tab(index)",
      "desc": "程序化切换当前激活的选项卡",
      "params": "(index: int) -> void",
      "version": "v1.0.0"
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
      "version": "v1.2"
    },
    {
      "name": "suffix",
      "desc": "标签栏后置自定义操作区域（如一键全部关闭、配置齿轮）",
      "child": "Control",
      "example": "<template #suffix><GButton icon=\"gear\" /></template>",
      "version": "v1.2"
    }
  ]
};
