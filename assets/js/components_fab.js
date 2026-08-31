// =========================================================================
// Gotod Components UI - Component: fab
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['fab'] = {
  "title": "Fab 悬浮操作按钮 (GFab)",
  "desc": "悬浮在游戏界面或应用四角的快捷操作按钮，支持多方向展开菜单（Top/Bottom/Left/Right）、快捷轮盘、边缘吸附与未读消息徽标。",
  "demos": [
    {
      "title": "1. 基础右下角悬浮按钮与展开交互 (Basic Expandable FAB: 点击切换展开/折叠)",
      "render": "\n      <div style=\"position:relative; height:130px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden; padding:12px;\">\n        <span style=\"font-size:12px; color:var(--text-secondary);\">点击右下角绿色悬浮按钮查看展开动画与操作项：</span>\n        <!-- Floating FAB Menu -->\n        <div style=\"position:absolute; bottom:12px; right:12px; display:flex; flex-direction:column; align-items:center; gap:8px;\">\n          <!-- Sub Actions (Slide in/out) -->\n          <div id=\"fabDemo1Actions\" style=\"display:none; flex-direction:column; gap:8px; align-items:center; transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\">\n            <button class=\"g-btn g-btn-primary\" style=\"width:36px; height:36px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-size:13px;\" title=\"新建副本\" onclick=\"showToast('已创建新副本队伍！', 'success')\">\n              <i class=\"fa-solid fa-plus\"></i>\n            </button>\n            <button class=\"g-btn g-btn-warning\" style=\"width:36px; height:36px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-size:13px;\" title=\"扫码加入\" onclick=\"showToast('已呼出扫码加队镜头', 'info')\">\n              <i class=\"fa-solid fa-qrcode\"></i>\n            </button>\n          </div>\n          <!-- Main Trigger Button -->\n          <button id=\"fabDemo1Trigger\" class=\"g-btn g-btn-success\" style=\"width:46px; height:46px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,0,0,0.35); font-size:18px; transition:transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);\" onclick=\"\n            const acts = document.getElementById('fabDemo1Actions');\n            const icon = document.getElementById('fabDemo1Icon');\n            const isHidden = (acts.style.display === 'none' || acts.style.display === '');\n            if (isHidden) {\n              acts.style.display = 'flex';\n              icon.style.transform = 'rotate(45deg)';\n            } else {\n              acts.style.display = 'none';\n              icon.style.transform = 'rotate(0deg)';\n            }\n          \">\n            <i id=\"fabDemo1Icon\" class=\"fa-solid fa-plus\" style=\"transition:transform 0.25s;\"></i>\n          </button>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 基础展开式悬浮按钮\nvar fab = GFab.new(\"plus\")\nfab.direction = GFab.Direction.TOP\nfab.add_action(\"plus\", \"新建副本\")\nfab.add_action(\"qrcode\", \"扫码加入\")\nadd_child(fab)"
    },
    {
      "title": "2. 多动作横向展开菜单 (Expandable Action Menu: 点击齿轮展开 3 项操作)",
      "render": "\n      <div style=\"position:relative; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; align-items:center; padding:0 16px; gap:12px;\">\n        <!-- Main Trigger -->\n        <button id=\"fabGearTrigger\" class=\"g-btn g-btn-primary\" style=\"width:44px; height:44px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 12px rgba(64,158,255,0.4); transition:transform 0.3s;\" onclick=\"\n          const menu = document.getElementById('fabGearSubMenu');\n          const isHidden = menu.style.display === 'none';\n          if (isHidden) {\n            menu.style.display = 'flex';\n            this.style.transform = 'rotate(90deg)';\n            this.className = 'g-btn g-btn-danger';\n          } else {\n            menu.style.display = 'none';\n            this.style.transform = 'rotate(0deg)';\n            this.className = 'g-btn g-btn-primary';\n          }\n        \">\n          <i class=\"fa-solid fa-gear\"></i>\n        </button>\n\n        <span style=\"font-size:12px; color:var(--text-secondary);\">← 点击齿轮展开/收起快捷动作：</span>\n\n        <!-- Expanded Sub-actions -->\n        <div id=\"fabGearSubMenu\" style=\"display:flex; gap:10px; align-items:center;\">\n          <button class=\"g-btn g-btn-default\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"保存数据\" onclick=\"showToast('数据已成功保存至 Slot 1！', 'success')\">\n            <i class=\"fa-solid fa-save\"></i>\n          </button>\n          <button class=\"g-btn g-btn-default\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"分享战报\" onclick=\"showToast('已生成战报分享海报！', 'info')\">\n            <i class=\"fa-solid fa-share-nodes\"></i>\n          </button>\n          <button class=\"g-btn g-btn-danger\" style=\"width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;\" title=\"退出房间\" onclick=\"showToast('已安全退出当前公会战！', 'warning')\">\n            <i class=\"fa-solid fa-arrow-right-from-bracket\"></i>\n          </button>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 横向展开动作菜单\nvar fab = GFab.new(\"gear\")\nfab.direction = GFab.Direction.RIGHT\nfab.add_action(\"save\", \"保存数据\")\nfab.add_action(\"share-nodes\", \"分享战报\")\nfab.add_action(\"arrow-right-from-bracket\", \"退出房间\")"
    },
    {
      "title": "3. 游戏战斗快捷药剂轮盘 (Game Quick Item Potion FAB)",
      "render": "\n      <div style=\"display:flex; gap:16px; align-items:center; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); max-width:420px; position:relative; overflow:hidden;\">\n        <button class=\"g-btn g-btn-danger\" style=\"width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 0 14px rgba(239,68,68,0.5); cursor:pointer;\" onclick=\"\n          showToast('🧪 使用大生命药水: 生命值恢复 +500 HP！', 'success');\n          const pop = document.getElementById('fabHpPop');\n          pop.style.opacity = '1';\n          pop.style.transform = 'translateY(-20px)';\n          setTimeout(() => {\n            pop.style.opacity = '0';\n            pop.style.transform = 'translateY(0)';\n          }, 1200);\n        \">\n          🧪\n        </button>\n        <div style=\"font-size:12px;\">\n          <div style=\"font-weight:700; color:var(--text-primary);\">战斗快捷消耗品 (Quick Potion)</div>\n          <div style=\"color:var(--text-secondary); margin-top:2px;\">点击药剂瓶实时使用并飘字回血</div>\n        </div>\n        <span id=\"fabHpPop\" style=\"position:absolute; right:30px; font-weight:800; color:#22c55e; font-size:16px; opacity:0; transition:all 0.6s cubic-bezier(0.16, 1, 0.3, 1);\">+500 HP 💚</span>\n      </div>\n    ",
      "code": "# GDScript: 游戏药剂快捷轮盘\nvar potion_fab = GFab.new_quick_item(\"potion_red\")\npotion_fab.clicked.connect(func(): Player.heal(500))"
    },
    {
      "title": "4. 自由拖拽与任意位置放置 (Draggable to Any Position & 磁性贴边模式)",
      "render": "\n      <div id=\"fabDragContainer\" style=\"position:relative; height:160px; background:var(--bg-surface); border:2px dashed var(--primary); border-radius:8px; overflow:hidden; user-select:none; padding:12px;\">\n        <!-- Header Controls -->\n        <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;\">\n          <div style=\"display:flex; align-items:center; gap:8px;\">\n            <span style=\"font-size:12px; color:var(--text-primary); font-weight:600;\"><i class=\"fa-solid fa-arrows-up-down-left-right\" style=\"color:var(--primary);\"></i> 🖱️ 鼠标/手指按住 FAB 自由拖拽至任意位置：</span>\n            <span id=\"fabPosBadge\" class=\"g-tag g-tag-primary\" style=\"font-size:10px; padding:1px 6px; border-radius:6px; font-family:monospace;\">坐标: (20, 60)</span>\n          </div>\n          <div style=\"display:flex; align-items:center; gap:8px;\">\n            <label style=\"display:inline-flex; align-items:center; gap:4px; font-size:11px; color:var(--text-secondary); cursor:pointer;\">\n              <input type=\"checkbox\" id=\"fabAutoDock\"> 松手时自动贴边\n            </label>\n            <div style=\"display:flex; gap:4px;\">\n              <button class=\"g-btn g-btn-default\" style=\"font-size:10px; padding:1px 5px;\" onclick=\"const f=document.getElementById('draggableFab'); f.style.transition='all 0.3s'; f.style.left='14px'; f.style.top='14px'; document.getElementById('fabPosBadge').innerText='坐标: (14, 14)'; showToast('已移动至左上角', 'info');\">↖ 左上</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:10px; padding:1px 5px;\" onclick=\"const f=document.getElementById('draggableFab'); const c=f.parentElement; f.style.transition='all 0.3s'; f.style.left=(c.clientWidth-58)+'px'; f.style.top='14px'; document.getElementById('fabPosBadge').innerText='坐标: ('+Math.round(c.clientWidth-58)+', 14)'; showToast('已移动至右上角', 'info');\">↗ 右上</button>\n              <button class=\"g-btn g-btn-default\" style=\"font-size:10px; padding:1px 5px;\" onclick=\"const f=document.getElementById('draggableFab'); const c=f.parentElement; f.style.transition='all 0.3s'; f.style.left=((c.clientWidth-44)/2)+'px'; f.style.top='60px'; document.getElementById('fabPosBadge').innerText='坐标: ('+Math.round((c.clientWidth-44)/2)+', 60)'; showToast('已居中放置', 'info');\">🎯 居中</button>\n            </div>\n          </div>\n        </div>\n        <!-- 2D Draggable FAB Circle Button -->\n        <div id=\"draggableFab\" style=\"position:absolute; left:20px; top:60px; width:44px; height:44px; border-radius:50%; background:var(--primary); color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:grab; box-shadow:0 6px 16px rgba(0,0,0,0.35); z-index:10;\" onmousedown=\"window.startFabDrag(event, this)\" ontouchstart=\"window.startFabDrag(event, this)\">\n          <i class=\"fa-solid fa-arrows-up-down-left-right\" style=\"color:#ffffff !important; pointer-events:none;\"></i>\n        </div>\n      </div>\n    ",
      "code": "# GDScript: 自由拖拽放置到任意位置 (支持 XY 二维自由拖拽与可选吸附)\nfab.draggable = true\nfab.free_position = true # 允许拖拽放置在屏幕任意位置\nfab.magnetic_dock = false # 可选: 松手是否吸附最近边缘"
    },
    {
      "title": "5. 带未读徽标与一键已读 (Badge & Notification Integration)",
      "render": "\n      <div style=\"display:flex; gap:16px; align-items:center;\">\n        <div style=\"position:relative; display:inline-block;\">\n          <button id=\"fabMsgBtn\" class=\"g-btn g-btn-primary\" style=\"width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(64,158,255,0.4);\" onclick=\"\n            const b = document.getElementById('fabMsgBadge');\n            b.style.display = 'none';\n            showToast('已查看所有未读私信，徽标已清除！', 'success');\n          \">\n            <i class=\"fa-solid fa-comment-dots\" style=\"font-size:20px;\"></i>\n          </button>\n          <span id=\"fabMsgBadge\" class=\"g-badge\" style=\"position:absolute; top:-4px; right:-4px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700;\">8</span>\n        </div>\n        <span style=\"font-size:12px; color:var(--text-secondary);\">点击悬浮聊天按钮可查看未读消息并自动清空未读角标</span>\n      </div>\n    ",
      "code": "# GDScript: 带未读消息徽标\nfab.badge = GBadge.new(8)\nfab.clicked.connect(func(): fab.badge.clear())"
    }
  ],
  "props": [
    {
      "name": "icon",
      "type": "String",
      "default": "\"plus\"",
      "desc": "悬浮按钮主图标",
      "version": "v1.0"
    },
    {
      "name": "direction",
      "type": "GFab.Direction",
      "default": "TOP",
      "desc": "菜单展开方向 (TOP / BOTTOM / LEFT / RIGHT)",
      "version": "v1.0"
    },
    {
      "name": "draggable",
      "type": "bool",
      "default": "false",
      "desc": "是否允许玩家在屏幕上拖拽",
      "version": "v1.2"
    },
    {
      "name": "magnetic_dock",
      "type": "bool",
      "default": "true",
      "desc": "松手后是否自动吸附贴边",
      "version": "v1.2"
    }
  ],
  "events": [
    {
      "name": "clicked",
      "params": "()",
      "desc": "点击主按钮触发",
      "version": "v1.0"
    },
    {
      "name": "action_selected",
      "params": "(action_name: String)",
      "desc": "点击子菜单项触发",
      "version": "v1.0"
    }
  ],
  "methods": [],
  "slots": []
};
