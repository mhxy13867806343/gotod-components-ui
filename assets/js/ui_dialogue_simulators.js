// =========================================================================
// Gotod Components UI - Dialogue & Story Theater Simulators
// =========================================================================
// ==========================================
// Golden Sun / JRPG GDialogue Simulator Helper
// ==========================================
let simDialogueQueue = [];
let simDialogueTimer = null;
let simDialogueFullText = '';
let simDialogueCharIdx = 0;
let simDialogueIsTyping = false;

window.openSimDialogue = function(queue) {
  if (typeof queue === 'string') queue = [{ text: queue, speaker: '神秘贤者', avatar: '🧙‍♂️' }];
  else if (!Array.isArray(queue)) queue = [queue];
  simDialogueQueue = [...queue];
  
  const mask = document.getElementById('simDialogueMask');
  if (!mask) return;
  mask.style.display = 'flex';
  window.nextSimDialogue();
};

window.nextSimDialogue = function() {
  if (simDialogueIsTyping) {
    simDialogueCharIdx = simDialogueFullText.length;
    const txtElem = document.getElementById('simDialogueText');
    if (txtElem) txtElem.innerText = simDialogueFullText;
    simDialogueIsTyping = false;
    const ind = document.getElementById('simDialogueIndicator');
    if (ind) ind.style.display = 'block';
    return;
  }
  
  if (simDialogueQueue.length === 0) {
    window.closeSimDialogue();
    return;
  }
  
  const item = simDialogueQueue.shift();
  const avatarElem = document.getElementById('simDialogueAvatar');
  const speakerElem = document.getElementById('simDialogueSpeaker');
  const txtElem = document.getElementById('simDialogueText');
  const indElem = document.getElementById('simDialogueIndicator');
  const optContainer = document.getElementById('simDialogueOptions');
  
  if (item.avatar) {
    avatarElem.innerHTML = item.avatar;
    avatarElem.style.display = 'flex';
  } else {
    avatarElem.style.display = 'none';
  }
  
  if (item.speaker) {
    speakerElem.innerText = item.speaker;
    speakerElem.style.display = 'inline-block';
  } else {
    speakerElem.style.display = 'none';
  }
  
  if (optContainer) {
    optContainer.innerHTML = '';
    optContainer.style.display = 'none';
  }
  if (indElem) indElem.style.display = 'none';
  
  simDialogueFullText = item.text || '';
  simDialogueCharIdx = 0;
  simDialogueIsTyping = true;
  if (txtElem) txtElem.innerText = '';
  
  if (simDialogueTimer) clearInterval(simDialogueTimer);
  simDialogueTimer = setInterval(() => {
    if (simDialogueCharIdx < simDialogueFullText.length) {
      simDialogueCharIdx++;
      if (txtElem) txtElem.innerText = simDialogueFullText.substr(0, simDialogueCharIdx);
    } else {
      clearInterval(simDialogueTimer);
      simDialogueIsTyping = false;
      if (item.options && item.options.length > 0 && optContainer) {
        optContainer.style.display = 'flex';
        item.options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.className = 'g-dialogue-option-btn';
          btn.innerHTML = `▶  ${opt}`;
          btn.onclick = (e) => {
            e.stopPropagation();
            showToast(`已选择: ${opt}`, 'success');
            window.nextSimDialogue();
          };
          optContainer.appendChild(btn);
        });
      } else if (indElem) {
        indElem.style.display = 'block';
      }
    }
  }, 25);
};

window.closeSimDialogue = function() {
  if (simDialogueTimer) clearInterval(simDialogueTimer);
  simDialogueIsTyping = false;
  const mask = document.getElementById('simDialogueMask');
  if (mask) mask.style.display = 'none';
};

// ==========================================
// Anime Story Theater Simulator Helper (Demo 3)
// ==========================================
const animeTheaterScript = [
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '🎭',
    speakerColor: '#ffd04b',
    text: '来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。'
  },
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '🪄',
    speakerColor: '#ffd04b',
    text: '不过……要是你敢小看我的暗影魔术，待会儿可别哭着向我求饶哦！'
  },
  {
    speaker: '旅者·卡尔',
    avatar: '⚔️',
    speakerColor: '#409eff',
    text: '（拔出符文长剑）收起你的把戏吧爱丽丝，我不会再让你伤害这里的任何村民了！'
  },
  {
    speaker: '疯狂得爱丽丝啊',
    avatar: '👑',
    speakerColor: '#ffd04b',
    text: '呵呵呵……真是有趣的眼神！那就让我们在命运的舞台上，起舞到天明吧！（✨剧情播放完毕，点击重新开始）'
  }
];

let animeTheaterIndex = 0;
let animeTheaterIsTyping = false;
let animeTheaterTimer = null;
let animeTheaterTargetText = '';

window.simAnimeTheaterNext = function() {
  const textEl = document.getElementById('animeDialogueText');
  if (animeTheaterIsTyping) {
    if (animeTheaterTimer) clearInterval(animeTheaterTimer);
    animeTheaterIsTyping = false;
    if (textEl) textEl.innerText = animeTheaterTargetText;
    return;
  }
  animeTheaterIndex = (animeTheaterIndex + 1) % animeTheaterScript.length;
  playAnimeTheaterLine(animeTheaterIndex);
};

window.simAnimeTheaterSkip = function() {
  if (animeTheaterTimer) clearInterval(animeTheaterTimer);
  animeTheaterIndex = animeTheaterScript.length - 1;
  playAnimeTheaterLine(animeTheaterIndex, true);
  if (window.showToast) {
    showToast('已跳过当前剧情，直达决战台词！', 'warning');
  }
};

function playAnimeTheaterLine(idx, instant) {
  const data = animeTheaterScript[idx];
  const avatarEl = document.getElementById('animeStandeeAvatar');
  const speakerEl = document.getElementById('animeDialogueSpeaker');
  const textEl = document.getElementById('animeDialogueText');
  if (!avatarEl || !speakerEl || !textEl) return;

  avatarEl.style.transform = 'scale(1.25) translateY(-8px)';
  setTimeout(() => {
    avatarEl.innerHTML = data.avatar;
    avatarEl.style.transform = 'scale(1) translateY(0)';
  }, 120);

  speakerEl.innerText = data.speaker;
  speakerEl.style.color = data.speakerColor || '#ffd04b';

  animeTheaterTargetText = data.text;
  if (animeTheaterTimer) clearInterval(animeTheaterTimer);

  if (instant) {
    textEl.innerText = data.text;
    animeTheaterIsTyping = false;
    return;
  }

  animeTheaterIsTyping = true;
  textEl.innerText = '';
  let charIdx = 0;
  animeTheaterTimer = setInterval(() => {
    if (charIdx < data.text.length) {
      charIdx++;
      textEl.innerText = data.text.substr(0, charIdx);
    } else {
      clearInterval(animeTheaterTimer);
      animeTheaterIsTyping = false;
    }
  }, 22);
}

// ==========================================
// Sci-Fi Polygon Bubble Dialogue Simulator (Demo 5)
// ==========================================
const scifiScript = [
  {
    speaker: 'シマトラ',
    text: '誰が、どうやって、何の目的で――\nそのあたりは、これから調査するのである。'
  },
  {
    speaker: 'オペレーター',
    text: '高エネルギー反応を感知！第3セクターに接近中の未確認生体シグナルを確認！'
  },
  {
    speaker: 'シマトラ',
    text: '全艦、第一種戦闘配置！迎撃プロトコル【Type-09】を展開せよ！'
  }
];
let scifiIndex = 0;
let scifiIsTyping = false;
let scifiTimer = null;
let scifiAutoInterval = null;
let scifiTargetText = '';

window.simSciFiNext = function() {
  const textEl = document.getElementById('scifiDialogueText');
  if (scifiIsTyping) {
    if (scifiTimer) clearInterval(scifiTimer);
    scifiIsTyping = false;
    if (textEl) textEl.innerText = scifiTargetText;
    return;
  }
  scifiIndex = (scifiIndex + 1) % scifiScript.length;
  playSciFiLine(scifiIndex);
};

window.simSciFiToggleAuto = function() {
  const autoBtn = document.getElementById('scifiAutoBtn');
  if (scifiAutoInterval) {
    clearInterval(scifiAutoInterval);
    scifiAutoInterval = null;
    if (autoBtn) {
      autoBtn.style.background = '#1b356d';
      autoBtn.style.color = '#fff';
      autoBtn.innerText = 'AUTO';
    }
    if (window.showToast) showToast('已关闭自动播放 (AUTO OFF)', 'info');
  } else {
    if (autoBtn) {
      autoBtn.style.background = '#409eff';
      autoBtn.style.color = '#000';
      autoBtn.innerText = 'AUTO ●';
    }
    if (window.showToast) showToast('已开启自动播放 (AUTO ON)', 'success');
    window.simSciFiNext();
    scifiAutoInterval = setInterval(() => {
      window.simSciFiNext();
    }, 2800);
  }
};

window.simSciFiSkip = function() {
  if (scifiTimer) clearInterval(scifiTimer);
  if (scifiAutoInterval) {
    clearInterval(scifiAutoInterval);
    scifiAutoInterval = null;
    const autoBtn = document.getElementById('scifiAutoBtn');
    if (autoBtn) {
      autoBtn.style.background = '#1b356d';
      autoBtn.style.color = '#fff';
      autoBtn.innerText = 'AUTO';
    }
  }
  scifiIndex = scifiScript.length - 1;
  playSciFiLine(scifiIndex, true);
  if (window.showToast) showToast('已跳过通信对话', 'warning');
};

function playSciFiLine(idx, instant) {
  const data = scifiScript[idx];
  const speakerEl = document.getElementById('scifiSpeakerTag');
  const textEl = document.getElementById('scifiDialogueText');
  if (!speakerEl || !textEl) return;

  speakerEl.innerText = data.speaker;
  scifiTargetText = data.text;
  if (scifiTimer) clearInterval(scifiTimer);

  if (instant) {
    textEl.innerText = data.text;
    scifiIsTyping = false;
    return;
  }

  scifiIsTyping = true;
  textEl.innerText = '';
  let charIdx = 0;
  scifiTimer = setInterval(() => {
    if (charIdx < data.text.length) {
      charIdx++;
      textEl.innerText = data.text.substr(0, charIdx);
    } else {
      clearInterval(scifiTimer);
      scifiIsTyping = false;
    }
  }, 20);
}

// ==========================================
// Third-Party Ecosystem Simulators (QFramework / Dialogic)
// ==========================================
let simQFGoldCount = 1200;
let simQFPotionCount = 5;

window.simQFrameworkBuy = function() {
  if (simQFGoldCount < 100) {
    if (window.showToast) showToast('【Command Rejected】金币不足，无法执行购买指令！', 'danger');
    return;
  }
  simQFGoldCount -= 100;
  simQFPotionCount += 1;
  const goldEl = document.getElementById('simQFGoldCount');
  const potionEl = document.getElementById('simQFPotionCount');
  if (goldEl) goldEl.innerText = simQFGoldCount;
  if (potionEl) potionEl.innerText = simQFPotionCount;
  if (window.showToast) {
    showToast('【Command Executed】BuyPotionCommand 执行成功！金币 -100，生命药水 +1', 'success');
  }
};

window.simQFrameworkFull = function() {
  if (window.showToast) {
    showToast('【Event Fired】收到 InventoryFullEvent 事件：背包已满！', 'warning');
  }
};

let simQuestCurrentStep = 0;
const simQuestStepsData = [
  { title: '前往暗影森林调查', desc: '靠近爱丽丝并进行交谈' },
  { title: '通过爱丽丝的试炼', desc: '击败出现的暗影分身' },
  { title: '返回营地领取报酬', desc: '获得神秘魔杖与丰厚金币' }
];

window.simQuestNextStep = function() {
  simQuestCurrentStep = (simQuestCurrentStep + 1) % simQuestStepsData.length;
  const stepIdxEl = document.getElementById('simQuestStepBadge');
  const stepDescEl = document.getElementById('simQuestStepDesc');
  if (stepIdxEl) stepIdxEl.innerText = `阶段 ${simQuestCurrentStep + 1}/3: ${simQuestStepsData[simQuestCurrentStep].title}`;
  if (stepDescEl) stepDescEl.innerText = simQuestStepsData[simQuestCurrentStep].desc;
  if (window.showToast) {
    showToast(`【Quest Event】任务进度已更新：${simQuestStepsData[simQuestCurrentStep].title}`, 'info');
  }
};

window.switchMemorySlotTab = function(panelIndex, btnEl) {
  for (let i = 0; i < 4; i++) {
    const p = document.getElementById('memorySlotPanel' + i);
    if (p) p.style.display = (i === panelIndex ? 'flex' : 'none');
  }
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach((b, idx) => {
      if (idx === panelIndex) {
        b.className = 'g-btn g-btn-primary';
      } else {
        b.className = 'g-btn g-btn-default';
      }
    });
  }
};





