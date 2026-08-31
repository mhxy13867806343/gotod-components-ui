// =========================================================================
// Gotod Components UI - Component: table (GTable & GTableV2)
// Modern Vue / Element Plus 风格数据表格与十万级超高性能虚拟化表格
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['table'] = {
  "title": "Table 表格与 TableV2 虚拟化表格 (GTable)",
  "desc": "全面参考 Element Plus 设计规范，用于展示多条结构化数据。支持斑马纹、带边框、多选勾选、列排序、自定义单元格与操作插槽 (Scoped Slot)、空数据状态 (Empty)，以及 100,000+ 行十万级数据 TableV2 超高性能虚拟化极速滚动。",
  "demos": [
    {
      "title": "1. 基础表格与斑马纹/边框 (Basic Table & Stripe / Border)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">🎮 英雄战力排行榜 (基础展示)</span>
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
                  <th style="padding:10px 14px;">战斗力</th>
                  <th style="padding:10px 14px;">出战状态</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--border-base);">
                  <td style="padding:10px 14px; font-weight:600;">⚔️ 圣骑士 · 乌瑟尔</td>
                  <td style="padding:10px 14px;"><span class="g-tag g-tag-primary" style="font-size:10.5px;">圣骑士</span></td>
                  <td style="padding:10px 14px; font-family:var(--font-mono);">Lv.99</td>
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
      "title": "2. 多选、排序、操作插槽与空状态 (Selection, Sort, Actions & Empty State)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.showToast('已为选中项发放经验！', 'success')">🎁 批量发放经验</button>
              <button class="g-btn g-btn-danger" style="font-size:11px; padding:3px 10px;" onclick="window.batchDeleteTable()">🗑️ 批量移出出战</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.resetDemoTableData()">🔄 恢复数据</button>
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
      "code": "# GDScript: 多选与排序\ntable.selection_mode = GTable.SelectionMode.MULTI\ntable.sort_change.connect(func(prop, order):\n    print(\"排序字段: \", prop, \" 升降序: \", order)\n)\ntable.empty_text = \"暂无道具数据\""
    },
    {
      "title": "3. TableV2 十万级超高性能虚拟化表格 (100,000+ Rows Virtualized Table)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--bg-card); border-bottom:1px solid var(--border-base); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="g-tag g-tag-danger" style="font-size:10.5px; padding:2px 6px;">⚡ 100,000 条</span>
              <span style="font-size:12px; font-weight:700;">全服无尽之塔天梯榜 (TableV2 虚拟滚动)</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(0)">Top 1</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(50000)">第 50,000 名</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollTableV2To(99990)">底部 10 万名</button>
            </div>
          </div>

          <!-- Fixed Table Header -->
          <div style="display:flex; background:var(--bg-card); border-bottom:2px solid var(--border-base); padding:8px 12px; font-size:12px; font-weight:700; color:var(--text-secondary);">
            <div style="width:70px;">排名</div>
            <div style="width:140px;">玩家昵称</div>
            <div style="width:90px;">阵营</div>
            <div style="width:110px;">通关层数</div>
            <div style="flex:1; text-align:right;">赛季天梯积分</div>
          </div>

          <!-- Virtual Scroll Viewport -->
          <div id="tableV2Container" style="height:288px; overflow-y:auto; position:relative; background:var(--bg-surface);" onscroll="window.onTableV2Scroll(this)">
            <div id="tableV2Phantom" style="height:3600000px; width:1px; position:absolute; top:0; left:0; pointer-events:none;"></div>
            <div id="tableV2Content" style="position:absolute; top:0; left:0; right:0;"></div>
          </div>
        </div>
      `,
      "code": "# GDScript: TableV2 虚拟表格使用\nvar table_v2 = GTableV2.new()\ntable_v2.row_height = 36\ntable_v2.total_count = 100000\ntable_v2.row_renderer = func(row_node, index, data):\n    row_node.get_node(\"RankLabel\").text = \"#\" + str(index + 1)\n    row_node.get_node(\"ScoreLabel\").text = str(data.score)\nadd_child(table_v2)"
    }
  ],
  "props": [
    {
      "name": "data",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "表格绑定的结构化数据集",
      "version": "v1.4.0"
    },
    {
      "name": "columns",
      "type": "Array[Dictionary]",
      "default": "[]",
      "desc": "列配置数组（支持 prop, label, width, sortable, align 等）",
      "version": "v1.4.0"
    },
    {
      "name": "stripe",
      "type": "boolean",
      "default": "false",
      "desc": "是否显示隔行斑马纹背景",
      "version": "v1.4.0"
    },
    {
      "name": "border",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启纵向与单元格边框分界线",
      "version": "v1.4.0"
    },
    {
      "name": "selection_mode",
      "type": "enum",
      "default": "NONE",
      "desc": "行选择模式：NONE (无), SINGLE (单选), MULTI (多选勾选)",
      "version": "v1.4.0"
    },
    {
      "name": "empty_text",
      "type": "String",
      "default": "\"暂无数据\"",
      "desc": "当表格数据为空或被清空时显示的空状态占位提示文本",
      "version": "v1.4.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "自定义表格列声明或子控件",
      "version": "v1.4.0"
    },
    {
      "name": "empty",
      "desc": "当 data 为空时显示的自定义空状态插槽视图（可自定义图文与恢复按钮）",
      "version": "v1.4.0"
    },
    {
      "name": "cell",
      "desc": "作用域插槽：自定义特定单元格渲染（透传 row_data, column, index）",
      "version": "v1.4.0"
    }
  ],
  "events": [
    {
      "name": "selection_change",
      "desc": "当用户勾选多选框或切换选中行时触发",
      "params": "(selected_rows: Array[Dictionary])",
      "version": "v1.4.0"
    },
    {
      "name": "sort_change",
      "desc": "当用户点击可排序表头触发列排序时广播",
      "params": "(prop: String, order: String)",
      "version": "v1.4.0"
    },
    {
      "name": "row_click",
      "desc": "当某一行被点击时触发",
      "params": "(row_data: Dictionary, index: int)",
      "version": "v1.4.0"
    }
  ],
  "methods": [
    {
      "name": "clear_selection()",
      "desc": "清空当前已勾选的所有多选行",
      "params": "() -> void",
      "version": "v1.4.0"
    },
    {
      "name": "toggle_row_selection(index: int, selected: bool)",
      "desc": "程序化切换指定行的勾选状态",
      "params": "(index: int, selected: bool) -> void",
      "version": "v1.4.0"
    },
    {
      "name": "sort(prop: String, order: String = \"asc\")",
      "desc": "按指定字段与排序方向对表格进行排布",
      "params": "(prop: String, order: String) -> void",
      "version": "v1.4.0"
    }
  ]
};
