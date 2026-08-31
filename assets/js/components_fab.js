// =========================================================================
// Gotod Components UI - Component: fab (GFab)
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['fab'] = {
  "title": "FAB 悬浮按钮 (GFab)",
  "desc": "悬浮在游戏界面或应用四角的快捷操作按钮，支持多方向展开（水平/垂直）、多动作子菜单、拖拽贴边吸附与徽标集成。",
  "demos": [
    {
      "title": "1. 快速构建与三大调用形态 (Quick Build: xx(items) / xx(opts) / xx(a,b,c))",
      "render": `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <button class="g-btn g-btn-primary" onclick="showToast('GFab.create([item1, item2])', 'success')">1. 动作列表快捷构建</button>
        <button class="g-btn g-btn-success" onclick="showToast('GFab.create({ direction, items, on_click })', 'success')">2. 字典对象完整配置</button>
        <button class="g-btn g-btn-warning" onclick="showToast('GFab.create(items, \"vertical\", BOTTOM_RIGHT)', 'warning')">3. 多参数位置传参</button>
      </div>
    `,
      "code": "# 方式 1: 批量动作数组快捷构建 / add_actions\nvar fab1 = GFab.create([\n    { \"name\": \"plus\", \"label\": \"新建副本\", \"icon\": icon_plus },\n    { \"name\": \"qrcode\", \"label\": \"扫码加入\", \"icon\": icon_qr }\n])\n\n# 也可以实例上随时批量追加动作：\nfab1.add_actions([\n    { \"name\": \"chat\", \"label\": \"公会聊天\" },\n    { \"name\": \"setting\", \"label\": \"快捷设置\" }\n])\n\n# 方式 2: 完整字典配置对象\nvar fab2 = GFab.create({\n    \"direction\": \"vertical\",\n    \"auto_collapse\": true,\n    \"items\": [\n        { \"name\": \"save\", \"label\": \"保存进度\" },\n        { \"name\": \"share\", \"label\": \"分享战报\" }\n    ],\n    \"on_click\": func(idx, item_name): GMessage.success(\"点击了: \" + item_name)\n})\n\n# 方式 3: 多参数位置传参 (动作列表, 展开方向, 悬浮锚点位置)\nvar fab3 = GFab.create(items_list, \"vertical\", GFab.Position.BOTTOM_RIGHT)"
    },
    {
      "title": "2. 多动作横向展开菜单 (Expandable Action Menu: 点击齿轮展开 3 项操作)",
      "render": `
      <div style="position:relative; height:90px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; display:flex; align-items:center; padding:0 16px; gap:12px;">
        <!-- Main Trigger -->
        <button id="fabGearTrigger" class="g-btn g-btn-primary" style="width:44px; height:44px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 12px rgba(64,158,255,0.4); transition:transform 0.3s;" onclick="
          const menu = document.getElementById('fabGearSubMenu');
          const isHidden = menu.style.display === 'none';
          if (isHidden) {
            menu.style.display = 'flex';
            this.style.transform = 'rotate(90deg)';
            this.className = 'g-btn g-btn-danger';
          } else {
            menu.style.display = 'none';
            this.style.transform = 'rotate(0deg)';
            this.className = 'g-btn g-btn-primary';
          }
        ">
          <i class="fa-solid fa-gear"></i>
        </button>

        <span style="font-size:12px; color:var(--text-secondary);">← 点击齿轮展开/收起快捷动作：</span>

        <!-- Expanded Sub-actions -->
        <div id="fabGearSubMenu" style="display:flex; gap:10px; align-items:center;">
          <button class="g-btn g-btn-default" style="width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;" title="保存数据" onclick="showToast('数据已成功保存至 Slot 1！', 'success')">
            <i class="fa-solid fa-save"></i>
          </button>
          <button class="g-btn g-btn-default" style="width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;" title="分享战报" onclick="showToast('已生成战报分享海报！', 'info')">
            <i class="fa-solid fa-share-nodes"></i>
          </button>
          <button class="g-btn g-btn-danger" style="width:38px; height:38px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:14px;" title="退出房间" onclick="showToast('已安全退出当前公会战！', 'warning')">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
    `,
      "code": "# GDScript: 横向展开动作菜单\nvar fab = GFab.new(\"gear\")\nfab.direction = GFab.Direction.RIGHT\nfab.add_actions([\n    { \"name\": \"save\", \"label\": \"保存数据\" },\n    { \"name\": \"share\", \"label\": \"分享战报\" },\n    { \"name\": \"exit\", \"label\": \"退出房间\" }\n])"
    },
    {
      "title": "3. 游戏战斗快捷药剂轮盘 (Game Quick Item Potion FAB)",
      "render": `
      <div style="display:flex; gap:16px; align-items:center; background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-base); max-width:420px; position:relative; overflow:hidden;">
        <button class="g-btn g-btn-danger" style="width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 0 14px rgba(239,68,68,0.5); cursor:pointer;" onclick="
          showToast('🧪 使用大生命药水: 生命值恢复 +500 HP！', 'success');
          const pop = document.getElementById('fabHpPop');
          pop.style.opacity = '1';
          pop.style.transform = 'translateY(-20px)';
          setTimeout(() => {
            pop.style.opacity = '0';
            pop.style.transform = 'translateY(0)';
          }, 1200);
        ">
          🧪
        </button>
        <div style="font-size:12px;">
          <div style="font-weight:700; color:var(--text-primary);">战斗快捷消耗品 (Quick Potion)</div>
          <div style="color:var(--text-secondary); margin-top:2px;">点击药剂瓶实时使用并飘字回血</div>
        </div>
        <span id="fabHpPop" style="position:absolute; right:30px; font-weight:800; color:#22c55e; font-size:16px; opacity:0; transition:all 0.6s cubic-bezier(0.16, 1, 0.3, 1);">+500 HP 💚</span>
      </div>
    `,
      "code": "# GDScript: 游戏药剂快捷轮盘\nvar potion_fab = GFab.new_quick_item(\"potion_red\")\npotion_fab.clicked.connect(func(): Player.heal(500))"
    },
    {
      "title": "4. 自由拖拽与任意位置放置 (Draggable to Any Position & 磁性贴边模式)",
      "render": `
      <div id="fabDragContainer" style="position:relative; height:160px; background:var(--bg-surface); border:2px dashed var(--primary); border-radius:8px; overflow:hidden; user-select:none; padding:12px;">
        <!-- Header Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; color:var(--text-primary); font-weight:600;"><i class="fa-solid fa-arrows-up-down-left-right" style="color:var(--primary);"></i> 🖱️ 鼠标/手指按住 FAB 自由拖拽至任意位置：</span>
            <span id="fabPosBadge" class="g-tag g-tag-primary" style="font-size:10px; padding:1px 6px; border-radius:6px; font-family:monospace;">坐标: (20, 60)</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="display:inline-flex; align-items:center; gap:4px; font-size:11px; color:var(--text-secondary); cursor:pointer;">
              <input type="checkbox" id="fabAutoDock"> 松手时自动贴边
            </label>
            <div style="display:flex; gap:4px;">
              <button class="g-btn g-btn-default" style="font-size:10px; padding:1px 5px;" onclick="const f=document.getElementById('draggableFab'); f.style.transition='all 0.3s'; f.style.left='14px'; f.style.top='14px'; document.getElementById('fabPosBadge').innerText='坐标: (14, 14)'; showToast('已移动至左上角', 'info');">↖ 左上</button>
              <button class="g-btn g-btn-default" style="font-size:10px; padding:1px 5px;" onclick="const f=document.getElementById('draggableFab'); const c=f.parentElement; f.style.transition='all 0.3s'; f.style.left=(c.clientWidth-58)+'px'; f.style.top='14px'; document.getElementById('fabPosBadge').innerText='坐标: ('+Math.round(c.clientWidth-58)+', 14)'; showToast('已移动至右上角', 'info');">↗ 右上</button>
              <button class="g-btn g-btn-default" style="font-size:10px; padding:1px 5px;" onclick="const f=document.getElementById('draggableFab'); const c=f.parentElement; f.style.transition='all 0.3s'; f.style.left=((c.clientWidth-44)/2)+'px'; f.style.top='60px'; document.getElementById('fabPosBadge').innerText='坐标: ('+Math.round((c.clientWidth-44)/2)+', 60)'; showToast('已居中放置', 'info');">🎯 居中</button>
            </div>
          </div>
        </div>
        <!-- 2D Draggable FAB Circle Button -->
        <div id="draggableFab" style="position:absolute; left:20px; top:60px; width:44px; height:44px; border-radius:50%; background:var(--primary); color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:grab; box-shadow:0 6px 16px rgba(0,0,0,0.35); z-index:10;" onmousedown="window.startFabDrag(event, this)" ontouchstart="window.startFabDrag(event, this)">
          <i class="fa-solid fa-arrows-up-down-left-right" style="color:#ffffff !important; pointer-events:none;"></i>
        </div>
      </div>
    `,
      "code": "# GDScript: 自由拖拽放置到任意位置 (支持 XY 二维自由拖拽与可选吸附)\nfab.draggable = true\nfab.free_position = true # 允许拖拽放置在屏幕任意位置\nfab.magnetic_dock = false # 可选: 松手是否吸附最近边缘"
    },
    {
      "title": "5. 带未读徽标与一键已读 (Badge & Notification Integration)",
      "render": `
      <div style="display:flex; gap:16px; align-items:center;">
        <div style="position:relative; display:inline-block;">
          <button id="fabMsgBtn" class="g-btn g-btn-primary" style="width:48px; height:48px; border-radius:50%; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(64,158,255,0.4);" onclick="
            const b = document.getElementById('fabMsgBadge');
            b.style.display = 'none';
            showToast('已查看所有未读私信，徽标已清除！', 'success');
          ">
            <i class="fa-solid fa-comment-dots" style="font-size:20px;"></i>
          </button>
          <span id="fabMsgBadge" class="g-badge" style="position:absolute; top:-4px; right:-4px; background:var(--danger); color:#fff; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700;">8</span>
        </div>
        <span style="font-size:12px; color:var(--text-secondary);">点击悬浮聊天按钮可查看未读消息并自动清空未读角标</span>
      </div>
    `,
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
      "default": "HORIZONTAL",
      "desc": "菜单展开方向 (HORIZONTAL 水平 / VERTICAL 垂直)",
      "version": "v1.0"
    },
    {
      "name": "fab_position",
      "type": "GFab.Position",
      "default": "BOTTOM_RIGHT",
      "desc": "悬浮锚点位置 (BOTTOM_RIGHT / BOTTOM_LEFT / TOP_RIGHT / TOP_LEFT)",
      "version": "v1.0"
    },
    {
      "name": "auto_collapse_on_click",
      "type": "bool",
      "default": "true",
      "desc": "点击子菜单项后是否自动折叠收起",
      "version": "v1.0"
    },
    {
      "name": "expand_duration",
      "type": "float",
      "default": "0.25",
      "desc": "展开/收起平滑过渡补间时长 (秒)",
      "version": "v1.0"
    },
    {
      "name": "draggable",
      "type": "bool",
      "default": "false",
      "desc": "是否允许玩家在屏幕上拖拽移动位置",
      "version": "v1.2"
    },
    {
      "name": "magnetic_dock",
      "type": "bool",
      "default": "true",
      "desc": "松手后是否自动吸附贴靠到最近边缘",
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
      "name": "item_clicked",
      "params": "(index: int, item_name: String)",
      "desc": "点击子动作菜单项时触发，携带项索引与名称标识",
      "version": "v1.0"
    },
    {
      "name": "expanded_changed",
      "params": "(is_expanded: bool)",
      "desc": "展开或收起状态发生变更时触发",
      "version": "v1.0"
    }
  ],
  "methods": [
    {
      "name": "create(items_or_options: Variant, direction: Variant = null, position: Variant = null) -> GFab",
      "desc": "静态多态构建工厂方法。支持动作数组单值、字典配置对象、多参数位置传递三种形态",
      "params": "(items_or_options: Variant, direction: Variant = null, position: Variant = null) -> GFab",
      "version": "v1.0.6"
    },
    {
      "name": "add_actions(action_list: Array) -> void",
      "desc": "批量追加一组子操作菜单项 [{\"name\": \"plus\", \"label\": \"新建\", \"icon\": Texture2D}]",
      "params": "(action_list: Array) -> void",
      "version": "v1.0.6"
    },
    {
      "name": "add_action(item_name: String, label: String = \"\", icon: Texture2D = null) -> void",
      "desc": "向悬浮菜单追加单个操作项",
      "params": "(item_name: String, label: String = \"\", icon: Texture2D = null) -> void",
      "version": "v1.0"
    },
    {
      "name": "toggle() -> void",
      "desc": "切换当前悬浮菜单的展开/折叠状态",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "expand() -> void",
      "desc": "展开悬浮操作子菜单",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "collapse() -> void",
      "desc": "收起悬浮操作子菜单",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": []
};
