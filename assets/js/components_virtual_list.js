// =========================================================================
// Gotod Components UI - Component: virtual-list (GVirtualList)
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['virtual-list'] = {
  "title": "Virtual List 虚拟长列表 (GVirtualList)",
  "desc": "支持百万级数据超高性能虚拟长列表平滑渲染，GPU 节点自动回收与可视窗口动态切片，内存零激增。专为海量背包道具、全服战力排行榜、巨型聊天记录及战斗日志流设计。",
  "demos": [
    {
      "title": "1. 百万级数据虚拟滚动实战 (1,000,000 Items Real-time Virtualizer)",
      "render": `
        <div style="max-width:540px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- Top Memory & Benchmarks Toolbar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; gap:6px; align-items:center;">
              <span class="g-tag g-tag-success" style="font-size:11px; padding:2px 8px; font-weight:700;">
                📊 总数据量: 1,000,000 条
              </span>
              <span class="g-tag g-tag-primary" style="font-size:11px; padding:2px 8px; font-weight:700;" id="vListDomCount">
                ⚡ 实际渲染节点: 10 个
              </span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollVListTo(0)">🔝 回顶部</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollVListTo(500000)">🚀 跳至 50万</button>
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.scrollVListTo(999990)">🔚 到底部</button>
            </div>
          </div>

          <!-- Virtual Scroll Viewport Simulator -->
          <div id="vListContainer" style="height:260px; overflow-y:auto; position:relative; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base);" onscroll="window.onVListScroll(this)">
            <!-- Phantom Scroll Height Spacer (46px per item * 1,000,000 = 46,000,000px) -->
            <div id="vListPhantom" style="height:46000000px; position:absolute; left:0; top:0; right:0; z-index:-1;"></div>
            
            <!-- Visible Items Slice Layer -->
            <div id="vListContent" style="position:absolute; left:0; right:0; top:0; padding:6px; display:flex; flex-direction:column; gap:6px; transform: translateY(0px);">
              <div style="height:40px; background:rgba(24,160,88,0.08); border:1px solid var(--primary); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">🥇 #1</span><span>传奇勇士_9999</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">10000000 战力</div>
              </div>
              <div style="height:40px; background:rgba(24,160,88,0.08); border:1px solid var(--primary); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">🥈 #2</span><span>传奇勇士_8888</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">9999990 战力</div>
              </div>
              <div style="height:40px; background:rgba(24,160,88,0.08); border:1px solid var(--primary); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">🥉 #3</span><span>传奇勇士_7777</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">9999980 战力</div>
              </div>
              <div style="height:40px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">⚔️ #4</span><span>传奇勇士_6666</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">9999971 战力</div>
              </div>
              <div style="height:40px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">⚔️ #5</span><span>传奇勇士_5555</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">9999961 战力</div>
              </div>
              <div style="height:40px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <div style="display:flex; align-items:center; gap:8px;"><span style="font-weight:700; width:60px;">⚔️ #6</span><span>传奇勇士_4444</span></div>
                <div style="font-weight:700; color:#e6a23c; font-family:var(--font-mono);">9999951 战力</div>
              </div>
            </div>
          </div>

          <div style="font-size:11px; color:var(--text-secondary); margin-top:10px; display:flex; justify-content:space-between;">
            <span>💡 任意拖动右侧滚动条测试百万条瞬时定位速度与 60 FPS 极速刷新。</span>
            <span id="vListPosTip" style="color:var(--primary); font-weight:700;">当前视口：第 1 ~ 10 条</span>
          </div>
        </div>
      `,
      "code": "# GDScript: 百万级虚拟长列表\nvar vlist = GVirtualList.new()\nvlist.item_height = 46\nvlist.total_count = 1000000\nvlist.item_render.connect(func(index: int, node: Control):\n    var data = leaderboard[index]\n    node.get_node(\"Name\").text = data.name\n    node.get_node(\"Score\").text = str(data.score)\n)\nadd_child(vlist)"
    },
    {
      "title": "2. 动态高度与自动预估 (Dynamic Item Height Calculation)",
      "render": `
        <div style="max-width:540px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <div style="margin-bottom:10px; font-size:12px; color:var(--text-secondary);">
            💡 虚拟列表支持图文混排、自适应聊天气泡及折叠评论的高度预估与精确锚定：
          </div>
          <div style="height:180px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); padding:12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto;">
            <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12px; border:1px solid var(--border-base);">
              💬 <b>[世界频道] 亚瑟</b>: 今晚 8 点公会战准时集合！(高度: 38px)
            </div>
            <div style="background:var(--bg-surface); padding:10px 12px; border-radius:6px; font-size:12px; border:1px solid var(--border-base);">
              📜 <b>[系统广播]</b>: 玩家「灭绝之影」成功打造出【+15 弑神之怒】神话法杖，全服广播祝贺！(高度: 56px)
            </div>
            <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12px; border:1px solid var(--border-base);">
              🗡️ <b>[队伍] 游侠</b>: 已经就位，随时开怪。(高度: 38px)
            </div>
          </div>
        </div>
      `,
      "code": "# GDScript: 动态高度与预估\nvlist.estimated_item_height = 48\nvlist.dynamic_height = true"
    }
  ],
  "props": [
    {
      "name": "total_count",
      "type": "int",
      "default": "0",
      "desc": "总数据量（支持百万/千万级数量）",
      "version": "v1.3.0"
    },
    {
      "name": "item_height",
      "type": "float",
      "default": "46.0",
      "desc": "固定条目高度（开启 dynamic_height 时作为预估参考高度）",
      "version": "v1.3.0"
    },
    {
      "name": "dynamic_height",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启不规则动态条目高度自适应计算",
      "version": "v1.3.0"
    },
    {
      "name": "buffer_count",
      "type": "int",
      "default": "4",
      "desc": "视口上下边缘预加载缓冲节点数量",
      "version": "v1.3.0"
    },
    {
      "name": "scroll_to_index",
      "type": "int",
      "default": "0",
      "desc": "程序化瞬时滚动定位至指定索引目标",
      "version": "v1.3.0"
    }
  ],
  "events": [
    {
      "name": "item_render",
      "desc": "当某个虚拟节点进入可视区域需要刷新渲染数据时触发",
      "params": "(index: int, item_control: Control)",
      "version": "v1.3.0"
    },
    {
      "name": "scroll_changed",
      "desc": "列表发生滚动、当前首尾可视索引改变时触发",
      "params": "(start_index: int, end_index: int)",
      "version": "v1.3.0"
    },
    {
      "name": "reach_bottom",
      "desc": "滚动到底部时触发（常用于下一页分页追加数据）",
      "params": "()",
      "version": "v1.3.0"
    }
  ],
  "methods": [
    {
      "name": "scroll_to(index: int, animated: bool = false)",
      "desc": "程序化平滑或瞬时滚动定位到指定索引条目",
      "params": "(index: int, animated: bool) -> void",
      "version": "v1.3.0"
    },
    {
      "name": "refresh()",
      "desc": "重置并重新计算全列表虚拟切片与视口高度",
      "params": "() -> void",
      "version": "v1.3.0"
    },
    {
      "name": "get_visible_range()",
      "desc": "获取当前视口内正在渲染的数据首尾索引区间",
      "params": "() -> Vector2i",
      "version": "v1.3.0"
    }
  ],
  "slots": [
    {
      "name": "item",
      "desc": "单行虚拟条目的自定义模板渲染插槽",
      "child": "Control",
      "example": "<template #item=\"{ index, data }\"><GCard>{{ data.title }}</GCard></template>",
      "version": "v1.3.0"
    },
    {
      "name": "empty",
      "desc": "当列表总数 total_count 为 0 时的缺省占位插槽",
      "child": "Control",
      "example": "<template #empty><GEmpty text=\"暂无记录\" /></template>",
      "version": "v1.3.0"
    }
  ]
};
