// =========================================================================
// Gotod Components UI - Component: table (GTable & GTableV2)
// 深度参考 Element Plus Table & TableV2 规范
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['table'] = {
  "title": "Table 表格与 TableV2 虚拟化表格 (GTable)",
  "desc": "基于 Element Plus Table 与 TableV2 规范设计。支持斑马纹、多选/单选、列排序与筛选、固定表头/固定列、展开行、自定义单元格作用域插槽 (Scoped Slots) 以及十万级数据 TableV2 虚拟化渲染。",
  "demos": [
    {
      "title": "1. 基础表格与斑马纹 (Basic Table & Stripe)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px;">🛡️ 公会主力英雄出战名册</span>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.toggleTableStripe()">切换斑马纹</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.toggleTableBorder()">切换边框</button>
            </div>
          </div>
          <div style="overflow-x:auto;">
            <table id="demoTable1" class="g-table g-table-stripe" style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
              <thead>
                <tr style="background:var(--bg-card); border-bottom:2px solid var(--border-base); color:var(--text-secondary);">
                  <th style="padding:10px 14px;">英雄名</th>
                  <th style="padding:10px 14px;">职业</th>
                  <th style="padding:10px 14px;">等级</th>
                  <th style="padding:10px 14px;">战力</th>
                  <th style="padding:10px 14px;">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 14px; font-weight:600;">👑 亚瑟 (Arthur)</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-primary" style="font-size:10.5px;">圣骑士</span></td>
                  <td style="padding:10px 14px; font-family:var(--font-mono);">Lv.95</td>
                  <td style="padding:10px 14px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">885,000</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-success" style="font-size:10.5px;">出战中</span></td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-base); background:rgba(0,0,0,0.02);">
                  <td style="padding:10px 14px; font-weight:600;">🏹 希尔瓦娜斯</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-warning" style="font-size:10.5px;">游侠</span></td>
                  <td style="padding:10px 14px; font-family:var(--font-mono);">Lv.92</td>
                  <td style="padding:10px 14px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">762,400</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-success" style="font-size:10.5px;">出战中</span></td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 14px; font-weight:600;">🧙 吉安娜</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-danger" style="font-size:10.5px;">大法师</span></td>
                  <td style="padding:10px 14px; font-family:var(--font-mono);">Lv.90</td>
                  <td style="padding:10px 14px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">698,000</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-default" style="font-size:10.5px;">休息中</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "code": "# GDScript: 基础表格与斑马纹\nvar table = GTable.new()\ntable.stripe = true\ntable.border = true\ntable.columns = [\n    { \"prop\": \"name\", \"label\": \"英雄名\", \"width\": 160 },\n    { \"prop\": \"role\", \"label\": \"职业\", \"width\": 100 },\n    { \"prop\": \"level\", \"label\": \"等级\", \"width\": 80 },\n    { \"prop\": \"power\", \"label\": \"战力\", \"width\": 120 }\n]\ntable.data = hero_list\nadd_child(table)"
    },
    {
      "title": "2. 多选、排序与自定义操作插槽 (Selection, Sort & Scoped Slot)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.batchRewardTable()">🎁 批量发放经验</button>
              <button class="g-btn g-btn-danger" style="font-size:11px; padding:3px 10px;" onclick="window.batchDeleteTable()">🗑️ 批量移出出战</button>
            </div>
            <span id="tableSelTip" style="font-size:11px; color:var(--text-secondary);">已勾选: 0 / 3 项</span>
          </div>
          <div style="overflow-x:auto;">
            <table class="g-table" style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
              <thead>
                <tr style="background:var(--bg-card); border-bottom:2px solid var(--border-base); color:var(--text-secondary);">
                  <th style="padding:10px 12px; width:36px; text-align:center;">
                    <input type="checkbox" id="tableSelectAll" onchange="window.onTableSelectAll(this)" style="cursor:pointer;">
                  </th>
                  <th style="padding:10px 12px;">物品名称</th>
                  <th style="padding:10px 12px; cursor:pointer;" onclick="window.sortTableByPrice()">
                    <span>单价 (金币)</span> <i class="fa-solid fa-sort" style="color:var(--primary); font-size:11px;"></i>
                  </th>
                  <th style="padding:10px 12px;">库存</th>
                  <th style="padding:10px 12px; text-align:right;">操作</th>
                </tr>
              </thead>
              <tbody id="tableSelectBody">
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
                  <td style="padding:10px 12px; font-weight:600;">💎 远古泰坦龙晶</td>
                  <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">5,000</td>
                  <td style="padding:10px 12px;">99+</td>
                  <td style="padding:10px 12px; text-align:right;">
                    <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 远古泰坦龙晶', 'info')">上架</button>
                    <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
                  <td style="padding:10px 12px; font-weight:600;">🧪 特效神圣生命药水</td>
                  <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">120</td>
                  <td style="padding:10px 12px;">500</td>
                  <td style="padding:10px 12px; text-align:right;">
                    <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 特效神圣生命药水', 'info')">上架</button>
                    <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 12px; text-align:center;"><input type="checkbox" class="table-row-cb" onchange="window.onTableRowSelect()"></td>
                  <td style="padding:10px 12px; font-weight:600;">📜 禁忌回城卷轴</td>
                  <td style="padding:10px 12px; font-weight:700; color:#e6a23c; font-family:var(--font-mono);">800</td>
                  <td style="padding:10px 12px;">32</td>
                  <td style="padding:10px 12px; text-align:right;">
                    <button class="g-btn g-btn-default" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('上架售卖: 禁忌回城卷轴', 'info')">上架</button>
                    <button class="g-btn g-btn-danger" style="font-size:10.5px; padding:2px 6px;" onclick="showToast('已销毁道具', 'warning')">销毁</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "code": "# GDScript: 多选与排序\ntable.selection_mode = GTable.SelectionMode.MULTI\ntable.sort_change.connect(func(prop, order):\n    print(\"排序改变: \", prop, order)\n)\ntable.selection_change.connect(func(rows):\n    print(\"已勾选: \", rows.size())\n)"
    },
    {
      "title": "3. TableV2 十万级虚拟化超高性能表格 (Virtualized TableV2 100,000+ Rows)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; gap:6px; align-items:center;">
              <span class="g-tag g-tag-success" style="font-size:11px; padding:2px 8px; font-weight:700;">
                📊 TableV2 数据量: 100,000 行
              </span>
              <span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 8px; font-weight:700;">
                ⚡ 视口虚拟渲染: 8 行
              </span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(0)">🔝 顶部</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(50000)">🚀 跳至第 5万行</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(99990)">🔚 底部</button>
            </div>
          </div>

          <!-- Fixed Table Header -->
          <div style="background:var(--bg-card); border:1px solid var(--border-base); border-bottom:none; border-radius:6px 6px 0 0; padding:8px 12px; display:flex; font-size:12px; font-weight:700; color:var(--text-secondary);">
            <div style="width:70px;">排名</div>
            <div style="width:140px;">角色名称</div>
            <div style="width:90px;">阵营</div>
            <div style="width:110px;">通关层数</div>
            <div style="flex:1; text-align:right;">全服总积分</div>
          </div>

          <!-- Virtual Scroll Body -->
          <div id="tableV2Container" style="height:220px; overflow-y:auto; position:relative; background:var(--bg-card); border:1px solid var(--border-base); border-radius:0 0 6px 6px;" onscroll="window.onTableV2Scroll(this)">
            <div id="tableV2Phantom" style="height:3600000px; position:absolute; left:0; top:0; right:0; z-index:-1;"></div>
            <div id="tableV2Content" style="position:absolute; left:0; right:0; top:0; display:flex; flex-direction:column;">
              <!-- Populated via onTableV2Scroll -->
            </div>
          </div>
        </div>
      `,
      "code": "# GDScript: TableV2 虚拟化表格\nvar table_v2 = GTableV2.new()\ntable_v2.row_height = 36\ntable_v2.total_rows = 100000\ntable_v2.fixed_header = true\ntable_v2.columns = [\n    { \"prop\": \"rank\", \"label\": \"排名\", \"width\": 70 },\n    { \"prop\": \"name\", \"label\": \"角色名称\", \"width\": 140 },\n    { \"prop\": \"score\", \"label\": \"总积分\", \"width\": 120 }\n]\nadd_child(table_v2)"
    }
  ],
  "props": [
    {
      "name": "data",
      "type": "Array",
      "default": "[]",
      "desc": "表格显示的数据源数组",
      "version": "v1.4.0"
    },
    {
      "name": "columns",
      "type": "Array",
      "default": "[]",
      "desc": "表格列配置列表（含 prop, label, width, fixed, sortable 等）",
      "version": "v1.4.0"
    },
    {
      "name": "stripe",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示斑马纹隔行变色",
      "version": "v1.4.0"
    },
    {
      "name": "border",
      "type": "boolean",
      "default": "false",
      "desc": "是否带有纵向边框与单元格分界线",
      "version": "v1.4.0"
    },
    {
      "name": "selection_mode",
      "type": "enum",
      "default": "NONE",
      "desc": "选择模式：NONE (无), SINGLE (单选), MULTI (多选复选框)",
      "version": "v1.4.0"
    },
    {
      "name": "fixed_header",
      "type": "boolean",
      "default": "true",
      "desc": "向下滚动时表头是否自动吸顶固定",
      "version": "v1.4.0"
    },
    {
      "name": "virtualized",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启 TableV2 虚拟滚动引擎（支持 10万+ 行）",
      "version": "v1.4.0"
    }
  ],
  "events": [
    {
      "name": "selection_change",
      "desc": "当选择项发生变化时触发",
      "params": "(selected_rows: Array)",
      "version": "v1.4.0"
    },
    {
      "name": "row_click",
      "desc": "当某一行被点击时触发",
      "params": "(row: Dictionary, index: int)",
      "version": "v1.4.0"
    },
    {
      "name": "sort_change",
      "desc": "当表格的排序条件发生变化时触发",
      "params": "(prop: String, order: String)",
      "version": "v1.4.0"
    }
  ],
  "methods": [
    {
      "name": "clear_selection()",
      "desc": "用于多选表格，清空用户的全部选择",
      "params": "() -> void",
      "version": "v1.4.0"
    },
    {
      "name": "toggle_row_selection(row: Dictionary, selected: bool)",
      "desc": "用于多选表格，切换某一行的选中状态",
      "params": "(row: Dictionary, selected: bool) -> void",
      "version": "v1.4.0"
    },
    {
      "name": "scroll_to_row(index: int)",
      "desc": "虚拟化表格 TableV2 滚动到指定行索引",
      "params": "(index: int) -> void",
      "version": "v1.4.0"
    }
  ],
  "slots": [
    {
      "name": "cell",
      "desc": "自定义单元格作用域插槽 (Scoped Slot 数据透传)",
      "child": "Control",
      "example": "<template #cell=\"{ row, column, value }\"><GTag>{{ value }}</GTag></template>",
      "version": "v1.4.0"
    },
    {
      "name": "header",
      "desc": "自定义表头插槽",
      "child": "Control",
      "example": "<template #header=\"{ column }\"><span>{{ column.label }}</span></template>",
      "version": "v1.4.0"
    },
    {
      "name": "empty",
      "desc": "空数据时显示的自定义占位插槽",
      "child": "Control",
      "example": "<template #empty><GEmpty text=\"暂无表格数据\" /></template>",
      "version": "v1.4.0"
    }
  ]
};
