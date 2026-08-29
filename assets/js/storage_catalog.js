// =========================================================================
// Gotod Components UI - 9. 游戏存档与中断存储管理器 (Game Save & Checkpoint Studio)
// assets/js/storage_catalog.js
// 基于纯类 (Class-based GSaveManager) 实现中断存储、多槽位读档、覆盖与删除 (带完整 LocalStorage 缓存持久化)
// =========================================================================

const DEFAULT_SLOTS = [
  {
    slot_id: 'slot_checkpoint',
    is_checkpoint: true,
    is_empty: false,
    save_name: '⚡ 自动中断存档 (Checkpoint)',
    chapter: '第三章: 龙之秘境 (遭遇首领前夕)',
    player_level: 48,
    hp: 850,
    gold: 14500,
    playtime: '14 小时 20 分',
    saved_at: '2026-08-29 17:45:10'
  },
  {
    slot_id: 'slot_1',
    is_checkpoint: false,
    is_empty: false,
    save_name: '一周目·主线通关前夕',
    chapter: '第七章: 终焉王座 (决战时刻)',
    player_level: 80,
    hp: 2400,
    gold: 98000,
    playtime: '42 小时 15 分',
    saved_at: '2026-08-28 22:30:00'
  },
  {
    slot_id: 'slot_2',
    is_checkpoint: false,
    is_empty: false,
    save_name: '二周目·魔法师纯智力流',
    chapter: '第二章: 迷雾森林 (法师塔试炼)',
    player_level: 25,
    hp: 420,
    gold: 3200,
    playtime: '5 小时 40 分',
    saved_at: '2026-08-29 11:15:22'
  },
  {
    slot_id: 'slot_3',
    is_checkpoint: false,
    is_empty: true,
    save_name: '空存档槽位 (Empty Slot #3)',
    chapter: '暂无数据',
    player_level: 0,
    hp: 0,
    gold: 0,
    playtime: '0 小时',
    saved_at: '-'
  }
];

const DEFAULT_GAME_STATE = {
  slot_id: 'slot_checkpoint',
  save_name: '⚡ 自动中断存档 (Checkpoint)',
  chapter: '第三章: 龙之秘境 (遭遇首领前夕)',
  player_level: 48,
  hp: 850,
  gold: 14500
};

// Load Initial State from LocalStorage
function loadCachedSlots() {
  try {
    const raw = localStorage.getItem('gotod_sim_save_slots');
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_SLOTS));
}

function loadCachedGameState() {
  try {
    const raw = localStorage.getItem('gotod_cur_game_state');
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
}

window.simSaveSlots = loadCachedSlots();
window.currentGameState = loadCachedGameState();

function persistSaveState() {
  try {
    localStorage.setItem('gotod_sim_save_slots', JSON.stringify(window.simSaveSlots));
    localStorage.setItem('gotod_cur_game_state', JSON.stringify(window.currentGameState));
  } catch(e) {}
}

// Actions: Trigger Checkpoint Suspend Save
window.triggerSimCheckpoint = function() {
  const now = new Date().toLocaleString();
  const cpSlot = window.simSaveSlots.find(s => s.slot_id === 'slot_checkpoint');
  if (cpSlot) {
    cpSlot.saved_at = now;
    cpSlot.chapter = '第四章: 熔岩地窟 (自动检查点)';
    cpSlot.player_level = window.currentGameState.player_level + 1;
    cpSlot.hp = 920;
    cpSlot.gold = window.currentGameState.gold + 500;
  }
  
  // Sync to current state
  window.currentGameState = {
    slot_id: 'slot_checkpoint',
    save_name: cpSlot.save_name,
    chapter: cpSlot.chapter,
    player_level: cpSlot.player_level,
    hp: cpSlot.hp,
    gold: cpSlot.gold
  };

  persistSaveState();
  updateCurrentGameStatusUI();
  renderSimSaveSlots();
  showToast('【中断存储】游戏已自动捕获当前进度并写入检查点存档！', 'success');
};

// Actions: Load Save Slot
window.loadSimSlot = function(slotId) {
  const slot = window.simSaveSlots.find(s => s.slot_id === slotId);
  if (!slot || slot.is_empty) {
    showToast('该槽位为空，无法读取！', 'warning');
    return;
  }

  window.currentGameState = {
    slot_id: slot.slot_id,
    save_name: slot.save_name,
    chapter: slot.chapter,
    player_level: slot.player_level,
    hp: slot.hp,
    gold: slot.gold
  };

  persistSaveState();
  updateCurrentGameStatusUI();
  renderSimSaveSlots();
  showToast(`【读取存档成功】已加载: ${slot.save_name} (Lv.${slot.player_level})`, 'success');
};

// Actions: Overwrite / Save Slot
window.saveToSimSlot = function(slotId) {
  const slot = window.simSaveSlots.find(s => s.slot_id === slotId);
  if (!slot) return;

  const now = new Date().toLocaleString();
  slot.is_empty = false;
  slot.save_name = `手动存档 (${now.split(' ')[1] || 'New'})`;
  slot.chapter = window.currentGameState.chapter;
  slot.player_level = window.currentGameState.player_level;
  slot.hp = window.currentGameState.hp;
  slot.gold = window.currentGameState.gold;
  slot.saved_at = now;

  persistSaveState();
  renderSimSaveSlots();
  showToast(`【保存成功】数据已写入槽位: ${slot.slot_id}`, 'success');
};

// Actions: Delete Save Slot
window.deleteSimSlot = function(slotId) {
  const slot = window.simSaveSlots.find(s => s.slot_id === slotId);
  if (!slot || slot.is_empty) return;

  slot.is_empty = true;
  slot.save_name = `空存档槽位 (${slot.slot_id})`;
  slot.chapter = '暂无数据';
  slot.player_level = 0;
  slot.hp = 0;
  slot.gold = 0;
  slot.saved_at = '-';

  persistSaveState();
  renderSimSaveSlots();
  showToast(`【删除成功】已清空存档槽位: ${slotId}`, 'info');
};

// Reset All Save Slots to Default
window.resetSimSaveSlots = function() {
  window.simSaveSlots = JSON.parse(JSON.stringify(DEFAULT_SLOTS));
  window.currentGameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
  persistSaveState();
  updateCurrentGameStatusUI();
  renderSimSaveSlots();
  showToast('已重置所有存档槽位数据', 'info');
};

// Update Header Status Bar UI
window.updateCurrentGameStatusUI = function() {
  const s = window.currentGameState;
  const chapElem = document.getElementById('curGameChapter');
  const lvlElem = document.getElementById('curGameLevel');
  const hpElem = document.getElementById('curGameHp');
  const goldElem = document.getElementById('curGameGold');

  if (chapElem) chapElem.innerText = s.chapter;
  if (lvlElem) lvlElem.innerText = `Lv. ${s.player_level}`;
  if (hpElem) hpElem.innerText = `${s.hp} HP`;
  if (goldElem) goldElem.innerText = `${s.gold} G`;
};

// Render Save Slots List with Clean Inline SVGs
window.renderSimSaveSlots = function() {
  const container = document.getElementById('simSaveSlotsGrid');
  if (!container) return;

  container.innerHTML = window.simSaveSlots.map(slot => {
    if (slot.is_empty) {
      return `
        <div style="background:var(--bg-surface); border:1px dashed var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; justify-content:space-between; align-items:center; opacity:0.75;">
          <div>
            <div style="font-weight:700; font-size:14px; color:var(--text-disabled);">${slot.save_name}</div>
            <div style="font-size:11px; color:var(--text-disabled); margin-top:4px;">未占用，可随时写入新存档</div>
          </div>
          <button class="g-btn g-btn-primary" style="height:32px; font-size:12px; gap:6px;" onclick="saveToSimSlot('${slot.slot_id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>写入新存档 (Save)</span>
          </button>
        </div>
      `;
    }

    const badgeColor = slot.is_checkpoint ? 'warning' : 'primary';
    const tagText = slot.is_checkpoint ? '中断自动存档' : '玩家手动存档';
    const isCurrent = window.currentGameState.slot_id === slot.slot_id;

    return `
      <div style="background:var(--bg-surface); border:1px solid ${isCurrent ? 'var(--primary)' : 'var(--border-base)'}; border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:10px; transition:border-color 0.2s;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:14px; color:var(--text-primary);">${slot.save_name}</span>
            <span class="g-tag g-tag-${badgeColor}" style="font-size:10px;">${tagText}</span>
            ${isCurrent ? `<span class="g-tag g-tag-success" style="font-size:10px; font-weight:700;">● 当前运行中</span>` : ''}
          </div>
          <span style="font-size:11px; color:var(--text-disabled); font-family:var(--font-mono);">保存时间: ${slot.saved_at}</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; padding:10px; background:rgba(0,0,0,0.25); border-radius:var(--radius); font-size:12px;">
          <div><span style="color:var(--text-secondary);">章节:</span> <strong>${slot.chapter}</strong></div>
          <div><span style="color:var(--text-secondary);">等级:</span> <strong style="color:var(--primary);">Lv.${slot.player_level}</strong></div>
          <div><span style="color:var(--text-secondary);">生命:</span> <strong style="color:var(--danger);">${slot.hp} HP</strong></div>
          <div><span style="color:var(--text-secondary);">金币:</span> <strong style="color:var(--warning);">${slot.gold} G</strong></div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:2px;">
          <button class="g-btn g-btn-success" style="height:28px; font-size:11px; gap:4px;" onclick="loadSimSlot('${slot.slot_id}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>读取存档 (Load)</span>
          </button>
          <button class="g-btn g-btn-primary" style="height:28px; font-size:11px; gap:4px;" onclick="saveToSimSlot('${slot.slot_id}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>覆盖保存 (Save)</span>
          </button>
          <button class="g-btn g-btn-danger" style="height:28px; font-size:11px; gap:4px;" onclick="deleteSimSlot('${slot.slot_id}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            <span>删除 (Delete)</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
};

window.STORAGE_CATALOG = {
  // --------------------------------------------------------
  // 1. 游戏多槽位存档与中断存储系统
  // --------------------------------------------------------
  'storage-save-slots': {
    title: '💾 游戏多槽位存档与中断存储 (Game Save & Checkpoint Manager)',
    desc: '基于类 (Class-based GSaveManager) 实现的多槽位存档管理、游戏暂停/切后台中断存储 (Checkpoint Save)、读取存档与槽位覆盖/删除。完全替代 SQLite，轻量极速！',
    demos: [
      {
        title: '游戏存档/读档/中断存储交互面板 (Interactive Save Slots UI)',
        render: `
          <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
            
            <!-- Top Controls & Current Game State Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:14px 18px; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:16px;">
                <div style="font-size:1.8rem; color:var(--primary);">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
                </div>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">当前正在运行的游戏进度状态 (已缓存至 LocalStorage):</div>
                  <div style="display:flex; gap:12px; align-items:center; margin-top:2px;">
                    <strong id="curGameChapter" style="color:var(--text-primary); font-size:14px;">第三章: 龙之秘境</strong>
                    <span id="curGameLevel" class="g-tag g-tag-primary" style="font-size:11px; font-weight:700;">Lv. 48</span>
                    <span id="curGameHp" class="g-tag g-tag-danger" style="font-size:11px;">850 HP</span>
                    <span id="curGameGold" class="g-tag g-tag-warning" style="font-size:11px;">14500 G</span>
                  </div>
                </div>
              </div>

              <!-- Quick Trigger Checkpoint Button & Reset -->
              <div style="display:flex; gap:8px;">
                <button class="g-btn g-btn-warning" style="height:34px; font-weight:700; gap:6px;" onclick="triggerSimCheckpoint()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  <span>触发中断存储 (save_checkpoint)</span>
                </button>
                <button class="g-btn g-btn-default" style="height:34px; font-size:11px;" onclick="resetSimSaveSlots()">
                  重置槽位
                </button>
              </div>
            </div>

            <!-- Save Slots List Container -->
            <div id="simSaveSlotsGrid" style="display:flex; flex-direction:column; gap:12px;">
              <!-- Dynamically Rendered Slots -->
            </div>

          </div>
        `,
        code: `# GDScript: 游戏存档、中断存储与读取全套调用:

# 1. 触发中断存储 (如关卡检查点、游戏切入后台暂停时):
func _on_level_checkpoint_reached(checkpoint_name: String) -> void:
    GSaveManager.save_checkpoint(checkpoint_name, {
        "player_pos": player.global_position,
        "hp": player.hp,
        "inventory": bag.get_all_items(),
        "quests": quest_manager.get_active_quests()
    })
    GMessage.success("已自动保存中断进度: " + checkpoint_name, self)

# 2. 从主菜单点击【继续游戏 (Resume)】从中断点恢复:
func _on_resume_button_pressed() -> void:
    if GSaveManager.has_checkpoint():
        var save_data = GSaveManager.resume_checkpoint()
        restore_game_world(save_data["data"])
    else:
        GMessage.info("暂无中断存档", self)

# 3. 玩家手动在指定槽位存档/覆盖 (Save Slot):
func _on_save_slot_pressed(slot_id: String) -> void:
    GSaveManager.save_slot(slot_id, collect_game_state(), {
        "save_name": "第七章 决战时刻",
        "chapter": "终焉王座",
        "player_level": player.level
    })

# 4. 读取指定槽位存档 (Load Slot):
func _on_load_slot_pressed(slot_id: String) -> void:
    var save_package = GSaveManager.load_slot(slot_id)
    if not save_package.is_empty():
        restore_game_world(save_package["data"])

# 5. 删除指定槽位存档 (Delete Slot):
func _on_delete_slot_pressed(slot_id: String) -> void:
    GSaveManager.delete_slot(slot_id)`
      }
    ]
  }
};
