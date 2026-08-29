// =========================================================================
// Gotod Components UI - 9. 游戏存档与中断存储管理器 (Game Save & Checkpoint Studio)
// assets/js/storage_catalog.js
// 基于纯类 (Class-based GSaveManager) 实现中断存储、多槽位读档、覆盖与删除
// =========================================================================

// In-Memory Simulated Save Slots State
window.simSaveSlots = [
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

// Current Active Game State
window.currentGameState = {
  slot_id: 'slot_checkpoint',
  save_name: '⚡ 自动中断存档 (Checkpoint)',
  chapter: '第三章: 龙之秘境 (遭遇首领前夕)',
  player_level: 48,
  hp: 850,
  gold: 14500
};

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

  updateCurrentGameStatusUI();
  showToast(`【读取存档成功】已加载: ${slot.save_name}`, 'success');
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

  renderSimSaveSlots();
  showToast(`【删除成功】已清空存档槽位: ${slotId}`, 'info');
};

// Update UI
window.updateCurrentGameStatusUI = function() {
  const s = window.currentGameState;
  const nameElem = document.getElementById('curGameSaveName');
  const chapElem = document.getElementById('curGameChapter');
  const lvlElem = document.getElementById('curGameLevel');
  const hpElem = document.getElementById('curGameHp');
  const goldElem = document.getElementById('curGameGold');

  if (nameElem) nameElem.innerText = s.save_name;
  if (chapElem) chapElem.innerText = s.chapter;
  if (lvlElem) lvlElem.innerText = `Lv. ${s.player_level}`;
  if (hpElem) hpElem.innerText = `${s.hp} HP`;
  if (goldElem) goldElem.innerText = `${s.gold} G`;
};

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
          <button class="g-btn g-btn-primary" style="height:32px; font-size:12px;" onclick="saveToSimSlot('${slot.slot_id}')">
            <i class="fa-solid fa-floppy-disk"></i> 写入新存档 (Save)
          </button>
        </div>
      `;
    }

    const badgeColor = slot.is_checkpoint ? 'warning' : 'primary';
    const tagText = slot.is_checkpoint ? '中断自动存档' : '玩家手动存档';

    return `
      <div style="background:var(--bg-surface); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:16px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:14px; color:var(--text-primary);">${slot.save_name}</span>
            <span class="g-tag g-tag-${badgeColor}" style="font-size:10px;">${tagText}</span>
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
          <button class="g-btn g-btn-success" style="height:28px; font-size:11px;" onclick="loadSimSlot('${slot.slot_id}')">
            <i class="fa-solid fa-play"></i> 读取存档 (Load)
          </button>
          <button class="g-btn g-btn-primary" style="height:28px; font-size:11px;" onclick="saveToSimSlot('${slot.slot_id}')">
            <i class="fa-solid fa-floppy-disk"></i> 覆盖保存 (Save)
          </button>
          <button class="g-btn g-btn-danger" style="height:28px; font-size:11px;" onclick="deleteSimSlot('${slot.slot_id}')">
            <i class="fa-solid fa-trash"></i> 删除 (Delete)
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
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius-lg); padding:14px 18px;">
              <div style="display:flex; align-items:center; gap:16px;">
                <div style="font-size:1.8rem; color:var(--primary);"><i class="fa-solid fa-gamepad"></i></div>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">当前正在运行的游戏进度状态:</div>
                  <div style="display:flex; gap:12px; align-items:center; margin-top:2px;">
                    <strong id="curGameChapter" style="color:var(--text-primary); font-size:14px;">第三章: 龙之秘境</strong>
                    <span id="curGameLevel" class="g-tag g-tag-primary" style="font-size:11px; font-weight:700;">Lv. 48</span>
                    <span id="curGameHp" class="g-tag g-tag-danger" style="font-size:11px;">850 HP</span>
                    <span id="curGameGold" class="g-tag g-tag-warning" style="font-size:11px;">14500 G</span>
                  </div>
                </div>
              </div>

              <!-- Quick Trigger Checkpoint Button -->
              <button class="g-btn g-btn-warning" style="height:34px; font-weight:700;" onclick="triggerSimCheckpoint()">
                <i class="fa-solid fa-bolt"></i> 触发中断存储 (save_checkpoint)
              </button>
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
