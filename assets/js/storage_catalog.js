// =========================================================================
// Gotod Components UI - 数据存储与本地缓存工坊 (Storage & DataStore Studio)
// assets/js/storage_catalog.js
// 基于纯类 (Class-based GStorage & GDataStore) 实现轻量化 CRUD 与持久化，告别 SQLite 依赖
// =========================================================================

// In-Memory Simulated Database for Web Demos
window.simStorageData = {
  'player_profile': { 'name': '勇者亚瑟', 'level': 52, 'vip': true },
  'sound_volume': 0.85,
  'theme_mode': 'dark'
};

window.simInventoryCollection = [
  { id: '101', name: '🔥 烈焰魔杖', type: 'WEAPON', level: 1, atk: 85 },
  { id: '102', name: '🛡️ 圣光重盾', type: 'ARMOR', level: 3, def: 120 },
  { id: '103', name: '⚡ 疾风之靴', type: 'BOOTS', level: 2, spd: 45 }
];

// Key-Value Handlers
window.simSetStorageKey = function() {
  const k = document.getElementById('simStorageKey').value.trim();
  const v = document.getElementById('simStorageVal').value.trim();
  if (!k) {
    showToast('请输入键名 (Key)', 'warning');
    return;
  }
  let parsedVal = v;
  try { parsedVal = JSON.parse(v); } catch(e) {}

  window.simStorageData[k] = parsedVal;
  renderSimStorageViewer();
  showToast(`【GStorage】已写入缓存: ${k}`, 'success');
};

window.simRemoveStorageKey = function(key) {
  delete window.simStorageData[key];
  renderSimStorageViewer();
  showToast(`【GStorage】已删除键: ${key}`, 'info');
};

window.simClearAllStorage = function() {
  window.simStorageData = {};
  renderSimStorageViewer();
  showToast('【GStorage】所有本地缓存已清空', 'info');
};

window.renderSimStorageViewer = function() {
  const container = document.getElementById('simStorageJsonViewer');
  if (container) {
    container.innerText = JSON.stringify(window.simStorageData, null, 2);
  }
};

// DataStore Collection CRUD Handlers
window.simInsertItem = function() {
  const name = document.getElementById('simItemName').value.trim() || '神秘宝剑';
  const atk = parseInt(document.getElementById('simItemAtk').value) || 60;
  const newDoc = {
    id: (Math.floor(Math.random() * 900) + 100).toString(),
    name: name,
    type: 'WEAPON',
    level: 1,
    atk: atk
  };
  window.simInventoryCollection.push(newDoc);
  renderSimInventoryTable();
  showToast(`【GDataStore】成功插入记录: ${name} (ID: ${newDoc.id})`, 'success');
};

window.simUpgradeItem = function(id) {
  const item = window.simInventoryCollection.find(i => i.id === id);
  if (item) {
    item.level += 1;
    item.atk = Math.round(item.atk * 1.25);
    renderSimInventoryTable();
    showToast(`【GDataStore】装备已强化至 +${item.level}！攻击力: ${item.atk}`, 'success');
  }
};

window.simDeleteItem = function(id) {
  window.simInventoryCollection = window.simInventoryCollection.filter(i => i.id !== id);
  renderSimInventoryTable();
  showToast(`【GDataStore】已删除记录 ID: ${id}`, 'info');
};

window.renderSimInventoryTable = function() {
  const tbody = document.getElementById('simInventoryTableBody');
  if (!tbody) return;

  if (window.simInventoryCollection.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-disabled); padding:16px;">背包数据库为空，请点击上方按钮插入装备记录</td></tr>`;
    return;
  }

  tbody.innerHTML = window.simInventoryCollection.map(item => `
    <tr>
      <td style="font-family:var(--font-mono); color:var(--primary); font-weight:700;">#${item.id}</td>
      <td style="font-weight:600;">${item.name}</td>
      <td><span class="g-tag g-tag-info" style="font-size:10px;">${item.type}</span></td>
      <td><span class="g-tag g-tag-warning" style="font-size:10px; font-weight:700;">+${item.level} (攻:${item.atk})</span></td>
      <td style="display:flex; gap:6px;">
        <button class="g-btn g-btn-primary" style="height:24px; padding:0 8px; font-size:11px;" onclick="simUpgradeItem('${item.id}')">
          <i class="fa-solid fa-arrow-up"></i> 强化 (Update)
        </button>
        <button class="g-btn g-btn-danger" style="height:24px; padding:0 8px; font-size:11px;" onclick="simDeleteItem('${item.id}')">
          <i class="fa-solid fa-trash"></i> 删除 (Delete)
        </button>
      </td>
    </tr>
  `).join('');
};

window.STORAGE_CATALOG = {
  // --------------------------------------------------------
  // 1. GStorage Key-Value 缓存与持久化
  // --------------------------------------------------------
  'storage-key-value': {
    title: '💾 GStorage (类化 Key-Value 本地缓存与落盘持久化)',
    desc: '轻量级纯静态 RefCounted 类，提供内存+磁盘 (user://) 双级存储。支持过期时间 (TTL)、复杂字典/数组序列化，无需配置复杂的 SQLite 驱动。',
    demos: [
      {
        title: 'Key-Value 缓存增删改查交互沙盒 (Interactive KV Sandbox)',
        render: `
          <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; width:100%;">
            
            <!-- Left: KV Controls -->
            <div style="display:flex; flex-direction:column; gap:12px; background:var(--bg-surface); padding:16px; border:1px solid var(--border-base); border-radius:var(--radius);">
              <div>
                <label style="font-size:12px; font-weight:600;">键名 (Key):</label>
                <input id="simStorageKey" class="g-input" type="text" value="user_token" style="width:100%; height:32px; margin-top:4px;">
              </div>
              <div>
                <label style="font-size:12px; font-weight:600;">键值 (Value, 支持 JSON 或基本类型):</label>
                <input id="simStorageVal" class="g-input" type="text" value='{"token": "xyz_8899", "role": "admin"}' style="width:100%; height:32px; margin-top:4px;">
              </div>
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button class="g-btn g-btn-primary" style="flex:1;" onclick="simSetStorageKey()">
                  <i class="fa-solid fa-floppy-disk"></i> 写入/修改 (set_item)
                </button>
                <button class="g-btn g-btn-default" onclick="simClearAllStorage()">清空全部</button>
              </div>
            </div>

            <!-- Right: Simulated Disk JSON Viewer -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="font-size:12px; font-weight:700; color:var(--text-secondary);">
                user://gotod_storage.json 磁盘持久化实时镜像:
              </div>
              <pre class="code-box" style="margin:0; height:100%; max-height:200px; overflow-y:auto;"><code id="simStorageJsonViewer">{
  "player_profile": {
    "name": "勇者亚瑟",
    "level": 52,
    "vip": true
  },
  "sound_volume": 0.85,
  "theme_mode": "dark"
}</code></pre>
            </div>

          </div>
        `,
        code: `# GDScript: 极简纯类本地缓存 API
# 1. 写入/修改数据 (支持设置 60 秒过期)
GStorage.set_item("player_gold", 5000)
GStorage.set_item("daily_reward_claim", true, 86400.0) # 24小时后自动过期

# 2. 读取数据 (带默认回退值)
var gold = GStorage.get_item("player_gold", 0)
var profile = GStorage.get_item("player_profile", {"level": 1})

# 3. 函数式修改已有数据
GStorage.update_item("player_gold", func(old_val): return old_val + 200)

# 4. 判断与删除
if GStorage.has_item("player_gold"):
    GStorage.remove_item("player_gold")`
      }
    ]
  },

  // --------------------------------------------------------
  // 2. GDataStore 类 NoSQL 文档集合 CRUD
  // --------------------------------------------------------
  'storage-datastore': {
    title: '📦 GDataStore (类 NoSQL 集合文档 CRUD 引擎)',
    desc: '基于文档集合（Collection）的单表增删改查引擎。提供唯一 ID、精准条件过滤、分页查询与字段更新，完全替代小型单机游戏中的 SQLite。',
    demos: [
      {
        title: '游戏背包数据集合 CRUD 演练 (Collection CRUD Sandbox)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            
            <!-- Insert Bar -->
            <div style="display:flex; gap:10px; align-items:center; background:var(--bg-surface); padding:12px; border:1px solid var(--border-base); border-radius:var(--radius); flex-wrap:wrap;">
              <span style="font-size:12px; font-weight:700;">插入新装备:</span>
              <input id="simItemName" class="g-input" type="text" placeholder="装备名称 (如: 龙鳞铠甲)" style="width:160px; height:30px;">
              <input id="simItemAtk" class="g-input" type="number" placeholder="攻击力" value="95" style="width:90px; height:30px;">
              <button class="g-btn g-btn-success" style="height:30px; font-size:12px;" onclick="simInsertItem()">
                <i class="fa-solid fa-plus"></i> 插入记录 (Insert)
              </button>
            </div>

            <!-- Items Table -->
            <table class="api-table" style="margin-top:0;">
              <thead>
                <tr>
                  <th style="width:15%;">唯一 ID</th>
                  <th style="width:30%;">物品名称</th>
                  <th style="width:15%;">类型</th>
                  <th style="width:20%;">属性状态</th>
                  <th style="width:20%;">操作 (Actions)</th>
                </tr>
              </thead>
              <tbody id="simInventoryTableBody">
                <tr>
                  <td style="font-family:var(--font-mono); color:var(--primary); font-weight:700;">#101</td>
                  <td style="font-weight:600;">🔥 烈焰魔杖</td>
                  <td><span class="g-tag g-tag-info" style="font-size:10px;">WEAPON</span></td>
                  <td><span class="g-tag g-tag-warning" style="font-size:10px; font-weight:700;">+1 (攻:85)</span></td>
                  <td style="display:flex; gap:6px;">
                    <button class="g-btn g-btn-primary" style="height:24px; padding:0 8px; font-size:11px;" onclick="simUpgradeItem('101')"><i class="fa-solid fa-arrow-up"></i> 强化</button>
                    <button class="g-btn g-btn-danger" style="height:24px; padding:0 8px; font-size:11px;" onclick="simDeleteItem('101')"><i class="fa-solid fa-trash"></i> 删除</button>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:var(--font-mono); color:var(--primary); font-weight:700;">#102</td>
                  <td style="font-weight:600;">🛡️ 圣光重盾</td>
                  <td><span class="g-tag g-tag-info" style="font-size:10px;">ARMOR</span></td>
                  <td><span class="g-tag g-tag-warning" style="font-size:10px; font-weight:700;">+3 (攻:120)</span></td>
                  <td style="display:flex; gap:6px;">
                    <button class="g-btn g-btn-primary" style="height:24px; padding:0 8px; font-size:11px;" onclick="simUpgradeItem('102')"><i class="fa-solid fa-arrow-up"></i> 强化</button>
                    <button class="g-btn g-btn-danger" style="height:24px; padding:0 8px; font-size:11px;" onclick="simDeleteItem('102')"><i class="fa-solid fa-trash"></i> 删除</button>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:var(--font-mono); color:var(--primary); font-weight:700;">#103</td>
                  <td style="font-weight:600;">⚡ 疾风之靴</td>
                  <td><span class="g-tag g-tag-info" style="font-size:10px;">BOOTS</span></td>
                  <td><span class="g-tag g-tag-warning" style="font-size:10px; font-weight:700;">+2 (攻:45)</span></td>
                  <td style="display:flex; gap:6px;">
                    <button class="g-btn g-btn-primary" style="height:24px; padding:0 8px; font-size:11px;" onclick="simUpgradeItem('103')"><i class="fa-solid fa-arrow-up"></i> 强化</button>
                    <button class="g-btn g-btn-danger" style="height:24px; padding:0 8px; font-size:11px;" onclick="simDeleteItem('103')"><i class="fa-solid fa-trash"></i> 删除</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        `,
        code: `# GDScript: 集合 CRUD 替代 SQLite
# 1. 插入记录 (Create)
var new_item = GDataStore.insert("inventory", {
    "name": "龙鳞铠甲",
    "type": "ARMOR",
    "def": 180,
    "level": 1
})
print("新插入装备ID:", new_item.id)

# 2. 查询记录 (Read / Find)
var all_weapons = GDataStore.find("inventory", {"type": "WEAPON"})
var single_item = GDataStore.find_by_id("inventory", "101")

# 3. 更新记录 (Update)
GDataStore.update_by_id("inventory", "101", {
    "level": 10,
    "atk": 220
})

# 4. 分页查询 (Pagination)
var page_data = GDataStore.paginate("inventory", 1, 10)
print("总装备数:", page_data.total, "当前页数据:", page_data.items)

# 5. 删除记录 (Delete)
GDataStore.delete_by_id("inventory", "101")`
      }
    ]
  }
};
