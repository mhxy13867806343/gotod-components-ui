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
            <!-- Phantom Scroll Height Spacer (48px per item * 1,000,000 = 48,000,000px, scaled) -->
            <div id="vListPhantom" style="height:480000px; position:absolute; left:0; top:0; right:0; z-index:-1;"></div>
            
            <!-- Visible Items Slice Layer -->
            <div id="vListContent" style="position:absolute; left:0; right:0; top:0; padding:6px; display:flex; flex-direction:column; gap:6px;">
              <!-- Dynamically populated on scroll -->
            </div>
          </div>

          <div style="font-size:11px; color:var(--text-secondary); margin-top:10px; display:flex; justify-content:space-between;">
            <span>💡 任意拖动右侧滚动条测试百万条瞬时定位速度与 60 FPS 极速刷新。</span>
            <span id="vListPosTip" style="color:var(--primary); font-weight:700;">当前视口：第 1 ~ 10 条</span>
          </div>
        </div>

        <script>
          (function(){
            const ITEM_HEIGHT = 46;
            const TOTAL_ITEMS = 1000000;
            const VISIBLE_COUNT = 10;
            const BUFFER = 3;

            window.onVListScroll = function(container) {
              const scrollTop = container.scrollTop;
              const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
              const endIndex = Math.min(TOTAL_ITEMS, startIndex + VISIBLE_COUNT + BUFFER * 2);

              const content = document.getElementById('vListContent');
              if(!content) return;

              content.style.transform = 'translateY(' + (startIndex * ITEM_HEIGHT) + 'px)';

              let html = '';
              for(let i = startIndex; i < endIndex; i++) {
                const rank = i + 1;
                const score = (10000000 - i * 9.8).toFixed(0);
                let medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : '⚔️'));
                let bg = rank <= 3 ? 'background:rgba(24,160,88,0.08); border-color:var(--primary);' : 'background:var(--bg-surface);';
                
                html += '<div style=\"height:' + (ITEM_HEIGHT - 6) + 'px; ' + bg + ' border:1px solid var(--border-base); border-radius:6px; padding:0 12px; display:flex; justify-content:space-between; align-items:center; font-size:12px;\">';
                html += '  <div style=\"display:flex; align-items:center; gap:8px;\">';
                html += '    <span style=\"font-weight:700; width:60px;\">' + medal + ' #' + rank + '</span>';
                html += '    <span>传奇勇士_' + (i % 9999 + 1000) + '</span>';
                html += '  </div>';
                html += '  <div style=\"font-weight:700; color:#e6a23c; font-family:var(--font-mono);\">' + score + ' 战力</div>';
                html += '</div>';
              }

              content.innerHTML = html;
              const posTip = document.getElementById('vListPosTip');
              if(posTip) posTip.innerText = '当前视口：第 ' + (startIndex + 1) + ' ~ ' + endIndex + ' 条';
              const domCount = document.getElementById('vListDomCount');
              if(domCount) domCount.innerText = '⚡ 实际渲染节点: ' + (endIndex - startIndex) + ' 个';
            };

            window.scrollVListTo = function(idx) {
              const container = document.getElementById('vListContainer');
              if(container) {
                container.scrollTop = idx * ITEM_HEIGHT;
                window.onVListScroll(container);
                showToast('已极速定位至第 ' + (idx + 1) + ' 条数据', 'info');
              }
            };

            setTimeout(() => {
              const c = document.getElementById('vListContainer');
              if(c) window.onVListScroll(c);
            }, 50);
          })();
        </script>
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
      "default": "48.0",
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
