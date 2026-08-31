// =========================================================================
// Gotod Components UI - Game Engine VFX & Studio Simulators (3D HUD, Haptic, Particles, Shader, AI)
// =========================================================================
// =========================================================================
// GHud3D Global Demo Helpers
// =========================================================================
window.bossCurrentHp = 750000;
window.trigger3DHit = function() {
  window.bossCurrentHp = Math.max(0, window.bossCurrentHp - 3450);
  const hpPercent = (window.bossCurrentHp / 1000000) * 100;
  const bar = document.getElementById('hud3dBossHp');
  const text = document.getElementById('hud3dHpText');
  const dmg = document.getElementById('hud3dDamageText');

  if (bar) bar.style.width = hpPercent + '%';
  if (text) text.innerText = window.bossCurrentHp.toLocaleString() + ' / 1,000,000';

  if (dmg) {
    dmg.style.opacity = '1';
    dmg.style.transform = 'translateY(-24px) scale(1.15)';
    setTimeout(() => {
      dmg.style.opacity = '0';
      dmg.style.transform = 'translateY(0) scale(1)';
    }, 550);
  }

  if (window.triggerHaptic) window.triggerHaptic('heavy');
  if (window.showToast) window.showToast('💥 暴击命中 3D 空间 BOSS -3450 伤害！', 'error');
};

window.trigger3DHeal = function() {
  window.bossCurrentHp = Math.min(1000000, window.bossCurrentHp + 1200);
  const hpPercent = (window.bossCurrentHp / 1000000) * 100;
  const bar = document.getElementById('hud3dBossHp');
  const text = document.getElementById('hud3dHpText');

  if (bar) bar.style.width = hpPercent + '%';
  if (text) text.innerText = window.bossCurrentHp.toLocaleString() + ' / 1,000,000';

  if (window.triggerHaptic) window.triggerHaptic('light');
  if (window.showToast) window.showToast('💚 为 3D BOSS 恢复 +1200 生命值！', 'success');
};

// =========================================================================
// GHaptic Global Demo Helpers
// =========================================================================
window.triggerHaptic = function(type) {
  const patterns = {
    light: 15,
    medium: 35,
    heavy: 70,
    success: [20, 40, 20],
    warning: [40, 60, 40],
    error: [60, 40, 60, 40, 100]
  };

  const ms = patterns[type] || 30;
  if (navigator.vibrate) {
    try {
      navigator.vibrate(ms);
    } catch (e) {}
  }

  const statusText = document.getElementById('hapticStatusText');
  const box = document.getElementById('hapticFeedbackBox');
  if (statusText) {
    statusText.innerText = `已触发【${type.toUpperCase()}】触觉马达振动 (${Array.isArray(ms) ? ms.join('+') + 'ms' : ms + 'ms'})`;
  }
  if (box) {
    box.style.borderColor = 'var(--primary)';
    box.style.background = 'rgba(24,160,88,0.08)';
    setTimeout(() => {
      box.style.borderColor = 'var(--border-base)';
      box.style.background = 'var(--bg-card)';
    }, 300);
  }

  if (window.showToast) window.showToast(`马达触觉反馈: ${type.toUpperCase()}`, 'info');
};

// =========================================================================
// GParticleStudio Global Demo Helpers
// =========================================================================
window.particleStudioState = {
  amount: 60,
  spread: 180,
  velocity: 280,
  gravity: 400,
  preset: 'coin',
  particles: []
};

window.initParticleStudio = function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dt = 0.016;
    const active = [];

    window.particleStudioState.particles.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += window.particleStudioState.gravity * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);

      if (p.life > 0) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        active.push(p);
      }
    });

    window.particleStudioState.particles = active;
    const badge = document.getElementById('particleCountBadge');
    if (badge) badge.innerText = '活动粒子: ' + active.length;

    requestAnimationFrame(renderLoop);
  }

  renderLoop();
  setTimeout(() => window.triggerParticleBurst(), 100);
};

window.spawnParticlesAt = function(x, y) {
  const cfg = window.particleStudioState;
  const colors = {
    coin: ['#ffd700', '#ffea00', '#ffa500', '#ffffff'],
    gacha: ['#a855f7', '#ec4899', '#3b82f6', '#ffd700'],
    fire: ['#ef4444', '#f97316', '#fbbf24', '#ffffff'],
    magic: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ffffff']
  };
  const colorList = colors[cfg.preset] || colors.coin;

  for (let i = 0; i < cfg.amount; i++) {
    const angleRad = (Math.random() * cfg.spread - cfg.spread / 2 - 90) * (Math.PI / 180);
    const speed = cfg.velocity * (0.5 + Math.random() * 0.8);
    const maxLife = 0.6 + Math.random() * 0.8;

    window.particleStudioState.particles.push({
      x: x,
      y: y,
      vx: Math.cos(angleRad) * speed,
      vy: Math.sin(angleRad) * speed,
      life: maxLife,
      maxLife: maxLife,
      size: 2.5 + Math.random() * 3.5,
      color: colorList[Math.floor(Math.random() * colorList.length)]
    });
  }
};

window.triggerParticleBurst = function() {
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    window.spawnParticlesAt(canvas.width / 2, canvas.height / 2 + 30);
    if (window.showToast) window.showToast('🚀 触发粒子爆发 (Burst)!', 'success');
  }
};

window.onParticleCanvasClick = function(e, container) {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  window.spawnParticlesAt(x, y);
};

window.applyParticlePreset = function(preset) {
  window.particleStudioState.preset = preset;
  if (preset === 'coin') {
    window.particleStudioState.amount = 60;
    window.particleStudioState.spread = 160;
    window.particleStudioState.velocity = 320;
    window.particleStudioState.gravity = 450;
  } else if (preset === 'gacha') {
    window.particleStudioState.amount = 120;
    window.particleStudioState.spread = 360;
    window.particleStudioState.velocity = 260;
    window.particleStudioState.gravity = 0;
  } else if (preset === 'fire') {
    window.particleStudioState.amount = 80;
    window.particleStudioState.spread = 90;
    window.particleStudioState.velocity = 350;
    window.particleStudioState.gravity = -200;
  } else if (preset === 'magic') {
    window.particleStudioState.amount = 70;
    window.particleStudioState.spread = 240;
    window.particleStudioState.velocity = 200;
    window.particleStudioState.gravity = 80;
  }

  // Update controls
  const cA = document.getElementById('pCtrlAmount');
  const cS = document.getElementById('pCtrlSpread');
  const cV = document.getElementById('pCtrlVelocity');
  const cG = document.getElementById('pCtrlGravity');
  if (cA) cA.value = window.particleStudioState.amount;
  if (cS) cS.value = window.particleStudioState.spread;
  if (cV) cV.value = window.particleStudioState.velocity;
  if (cG) cG.value = window.particleStudioState.gravity;

  const pA = document.getElementById('pValAmount');
  const pS = document.getElementById('pValSpread');
  const pV = document.getElementById('pValVelocity');
  const pG = document.getElementById('pValGravity');
  if (pA) pA.innerText = window.particleStudioState.amount;
  if (pS) pS.innerText = window.particleStudioState.spread + '°';
  if (pV) pV.innerText = window.particleStudioState.velocity;
  if (pG) pG.innerText = window.particleStudioState.gravity;

  window.triggerParticleBurst();
};

window.updateParticleParam = function(param, val) {
  window.particleStudioState[param] = parseFloat(val);
  const targetLabel = document.getElementById('pVal' + param.charAt(0).toUpperCase() + param.slice(1));
  if (targetLabel) {
    targetLabel.innerText = param === 'spread' ? val + '°' : val;
  }
};

window.copyGodotParticleCode = function() {
  const cfg = window.particleStudioState;
  const code = `# Godot 4 GPUParticles2D 材质与代码\nvar particles = GPUParticles2D.new()\nvar mat = ParticleProcessMaterial.new()\nmat.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_POINT\nmat.spread = ${cfg.spread}.0\nmat.initial_velocity_min = ${cfg.velocity * 0.8}.0\nmat.initial_velocity_max = ${cfg.velocity * 1.2}.0\nmat.gravity = Vector3(0, ${cfg.gravity}, 0)\nparticles.amount = ${cfg.amount}\nparticles.process_material = mat\nparticles.one_shot = true\nadd_child(particles)\nparticles.emitting = true`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      if (window.showToast) window.showToast('已复制 Godot 4 GPUParticles2D 材质配置！', 'success');
    });
  } else {
    if (window.showToast) window.showToast('材质配置生成完毕！', 'success');
  }
};

// =========================================================================
// GAIDialogueTree Global Demo Helpers
// =========================================================================
window.chooseAIOption = function(type) {
  const stream = document.getElementById('aiDialogueStream');
  const optContainer = document.getElementById('aiOptionsContainer');
  const moodTag = document.getElementById('aiNpcMoodTag');
  if (!stream || !optContainer) return;

  let playerText = '';
  let npcReply = '';
  let newMood = '友善 (Friendly)';
  let moodTagClass = 'g-tag g-tag-primary';

  if (type === 'honest') {
    playerText = '是的，我必须摧毁它以挽救王国！';
    npcReply = '很好，年轻人... 你的眼神中没有贪婪。拿着这块【破晓符文】，它能破除魔核的暗影护盾！';
    newMood = '崇敬 (Admiring)';
    moodTagClass = 'g-tag g-tag-success';
  } else if (type === 'bargain') {
    playerText = '我想要那件蕴含禁忌力量的古代法杖，做个交易吧。';
    npcReply = '哼，凡人终究渴望力量。法杖我可以给你，但你必须替我带回三块深渊原石作为等价交换。';
    newMood = '中立审视 (Neutral)';
    moodTagClass = 'g-tag g-tag-warning';
  } else if (type === 'threat') {
    playerText = '把封印钥匙交出来，否则休怪我剑下无情！';
    npcReply = '放肆！胆敢在守望者之塔拔剑相向，受死吧，狂妄之徒！[触发战斗事件]';
    newMood = '敌对开战 (Hostile)';
    moodTagClass = 'g-tag g-tag-danger';
  }

  // Append Player Bubble
  stream.innerHTML += `
    <div style="display:flex; justify-content:flex-end; gap:8px; align-items:flex-start;">
      <div style="background:var(--primary); color:#fff; padding:8px 12px; border-radius:6px; font-size:12.5px; line-height:1.6; max-width:85%;">
        ${playerText}
      </div>
      <span style="font-size:16px;">👤</span>
    </div>
  `;
  stream.scrollTop = stream.scrollHeight;

  // Simulate AI Thinking
  optContainer.innerHTML = `<div style="font-size:12px; color:var(--text-secondary); padding:8px 0;"><i class="fa-solid fa-spinner fa-spin" style="color:var(--primary);"></i> AI 推理引擎正在根据上下文演算剧情分支...</div>`;

  setTimeout(() => {
    // Append NPC Reply
    stream.innerHTML += `
      <div style="display:flex; gap:8px; align-items:flex-start;">
        <span style="font-size:16px;">🧙‍♂️</span>
        <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12.5px; border:1px solid var(--border-base); color:var(--text-regular); line-height:1.6; max-width:85%;">
          ${npcReply}
        </div>
      </div>
    `;
    stream.scrollTop = stream.scrollHeight;

    // Update Mood
    if (moodTag) {
      moodTag.className = moodTagClass;
      moodTag.innerText = '态度: ' + newMood;
    }

    // Render Next Branches
    if (type === 'threat') {
      optContainer.innerHTML = `
        <button class="g-btn g-btn-danger" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('已进入回合制 BOSS 战斗场景！', 'error')">
          ⚔️ [开战] 拔剑迎战 大法师艾尔温！
        </button>
      `;
    } else {
      optContainer.innerHTML = `
        <button class="g-btn g-btn-primary" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('已接受任务：前往深渊核心！', 'success')">
          📜 [接受] 领受使命，前往深渊之井
        </button>
        <button class="g-btn g-btn-default" style="font-size:12px; padding:6px 12px;" onclick="window.showToast('继续询问世界观细节', 'info')">
          ❓ [追问] 关于封印魔核的历史起源...
        </button>
      `;
    }

    if (window.showToast) window.showToast('AI 剧情分支推理完成！', 'info');
  }, 450);
};

window.resetAIDialogue = function() {
  const stream = document.getElementById('aiDialogueStream');
  const optContainer = document.getElementById('aiOptionsContainer');
  const moodTag = document.getElementById('aiNpcMoodTag');
  if (stream) {
    stream.innerHTML = `
      <div style="display:flex; gap:8px; align-items:flex-start;">
        <span style="font-size:16px;">🧙‍♂️</span>
        <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12.5px; border:1px solid var(--border-base); color:var(--text-regular); line-height:1.6; max-width:85%;">
          旅行者，你身上流淌着远古符文的气息... 是为了封印深渊魔核而来的吗？
        </div>
      </div>
    `;
  }
  if (moodTag) {
    moodTag.className = 'g-tag g-tag-primary';
    moodTag.innerText = '态度: 友善 (Friendly)';
  }
  if (optContainer) {
    optContainer.innerHTML = `
      <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('honest')">
        🗣️ [诚实] 是的，我必须摧毁它以挽救王国 (需要智力 ≥ 12)
      </button>
      <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('bargain')">
        💰 [商贾] 我想要那件蕴含禁忌力量的古代法杖，做个交易吧
      </button>
      <button class="g-btn g-btn-danger" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('threat')">
        ⚔️ [威吓] 把封印钥匙交出来，否则休怪我剑下无情！
      </button>
    `;
  }
  if (window.showToast) window.showToast('AI 对话树已重置为初始状态', 'info');
};

// =========================================================================
// GSkeletonParticleBinder Global Demo Helpers
// =========================================================================
window.skeletonDemoState = {
  socket: 'weapon',
  followRotation: true,
  animTime: 0,
  isAttacking: false,
  attackProgress: 0,
  particles: []
};

window.initSkeletonDemo = function() {
  const canvas = document.getElementById('skeletonCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dt = 0.016;
    window.skeletonDemoState.animTime += dt * 3;

    if (window.skeletonDemoState.isAttacking) {
      window.skeletonDemoState.attackProgress += dt * 3.5;
      if (window.skeletonDemoState.attackProgress >= 1) {
        window.skeletonDemoState.isAttacking = false;
        window.skeletonDemoState.attackProgress = 0;
      }
    }

    const t = window.skeletonDemoState.animTime;
    const isAtk = window.skeletonDemoState.isAttacking;
    const atkP = window.skeletonDemoState.attackProgress;

    // Character Base Position
    const rootX = canvas.width / 2;
    const rootY = canvas.height / 2 + 50;

    // Breathing / Idle movement
    const breathY = Math.sin(t * 1.5) * 3;

    // Bone joints
    const hipX = rootX;
    const hipY = rootY - 45 + breathY;
    const chestX = hipX;
    const chestY = hipY - 40;
    const headX = chestX;
    const headY = chestY - 22;

    // Arms
    let armAngleR = Math.sin(t * 2) * 0.2 + 0.8;
    if (isAtk) {
      armAngleR = -1.2 + Math.sin(atkP * Math.PI) * 3.0;
    }
    const handRX = chestX + Math.cos(armAngleR) * 35;
    const handRY = chestY + Math.sin(armAngleR) * 35;

    // Weapon Tip
    const swordAngle = armAngleR + 0.4;
    const swordTipX = handRX + Math.cos(swordAngle) * 45;
    const swordTipY = handRY + Math.sin(swordAngle) * 45;

    // Feet
    const footLX = hipX - 18 + Math.sin(t * 2) * 4;
    const footLY = rootY;
    const footRX = hipX + 18 - Math.sin(t * 2) * 4;
    const footRY = rootY;

    // Draw Skeleton Bones
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6366f1';

    // Spine
    ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(chestX, chestY); ctx.stroke();
    // Head
    ctx.fillStyle = '#a5b4fc';
    ctx.beginPath(); ctx.arc(headX, headY, 12, 0, Math.PI * 2); ctx.fill();
    // Legs
    ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(footLX, footLY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(footRX, footRY); ctx.stroke();
    // Arms
    ctx.beginPath(); ctx.moveTo(chestX, chestY); ctx.lineTo(handRX, handRY); ctx.stroke();

    // Weapon Sword/Staff
    if (window.skeletonDemoState.socket === 'staff') {
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(handRX - 10, handRY - 10); ctx.lineTo(swordTipX, swordTipY); ctx.stroke();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.arc(swordTipX, swordTipY, 6, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(handRX, handRY); ctx.lineTo(swordTipX, swordTipY); ctx.stroke();
    }

    // Determine Active Socket Position & Rotation
    let socketX = swordTipX;
    let socketY = swordTipY;
    let socketAngle = swordAngle;

    if (window.skeletonDemoState.socket === 'feet') {
      socketX = (footLX + footRX) / 2;
      socketY = footLY;
      socketAngle = Math.PI / 2;
    }

    // Update Label
    const label = document.getElementById('curBoneLabel');
    if (label) {
      label.innerText = window.skeletonDemoState.socket + ` (X: ${Math.round(socketX)}, Y: ${Math.round(socketY)})`;
    }

    // Spawn Particles at Socket
    if (isAtk || Math.random() < 0.6) {
      const pColor = window.skeletonDemoState.socket === 'staff' ? '#ec4899' : (window.skeletonDemoState.socket === 'feet' ? '#94a3b8' : '#f59e0b');
      const spreadAngle = window.skeletonDemoState.followRotation ? socketAngle + (Math.random() - 0.5) * 0.8 : -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = isAtk ? 180 + Math.random() * 120 : 40 + Math.random() * 60;
      
      window.skeletonDemoState.particles.push({
        x: socketX,
        y: socketY,
        vx: Math.cos(spreadAngle) * speed,
        vy: Math.sin(spreadAngle) * speed,
        life: 0.5,
        maxLife: 0.5,
        size: isAtk ? 3.5 : 2.0,
        color: pColor
      });
    }

    // Render & Update Particles
    const active = [];
    window.skeletonDemoState.particles.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      const alpha = Math.max(0, p.life / p.maxLife);
      if (p.life > 0) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        active.push(p);
      }
    });
    window.skeletonDemoState.particles = active;

    requestAnimationFrame(loop);
  }

  loop();
};

window.switchBoneSocket = function(socket) {
  window.skeletonDemoState.socket = socket;
  ['weapon', 'staff', 'feet'].forEach(s => {
    const btn = document.getElementById('boneBtn_' + s);
    if (btn) btn.className = (s === socket) ? 'g-btn g-btn-primary' : 'g-btn g-btn-default';
  });
  if (window.showToast) window.showToast(`已切换粒子挂点至骨骼关节: 【${socket}】`, 'info');
};

window.playSkeletonAttackAnim = function() {
  window.skeletonDemoState.isAttacking = true;
  window.skeletonDemoState.attackProgress = 0;
  if (window.showToast) window.showToast('⚔️ 触发骨骼挥砍攻击！刀光粒子动态喷射', 'error');
};

window.toggleBoneFollowRotation = function(checked) {
  window.skeletonDemoState.followRotation = checked;
  if (window.showToast) window.showToast(`粒子发射角度继承骨骼旋转: ${checked ? '已开启' : '已关闭'}`, 'info');
};

// =========================================================================
// GShaderStudio Global Demo Helpers
// =========================================================================
window.currentShaderMode = 'dissolve';
window.shaderParams = {
  dissolve: { amount: 0.35, edge: 0.08 },
  hologram: { speed: 1.5, rim: 0.8 },
  scanline: { density: 40, opacity: 0.6 },
  frosted: { blur: 12, opacity: 0.15 }
};

window.switchShaderMode = function(mode) {
  window.currentShaderMode = mode;
  ['dissolve', 'hologram', 'scanline', 'frosted'].forEach(m => {
    const btn = document.getElementById('shaderBtn_' + m);
    if (btn) btn.className = (m === mode) ? 'g-btn g-btn-primary' : 'g-btn g-btn-default';
  });

  const target = document.getElementById('shaderPreviewTarget');
  const overlay = document.getElementById('shaderEffectOverlay');
  const badge = document.getElementById('shaderNameBadge');
  const paramsBox = document.getElementById('shaderParamsContainer');

  if (!target || !overlay || !badge || !paramsBox) return;

  if (mode === 'dissolve') {
    target.style.filter = 'none';
    target.style.background = 'rgba(255,255,255,0.08)';
    overlay.style.background = 'radial-gradient(circle, rgba(255,100,20,0.5) 0%, transparent 70%)';
    badge.innerText = 'Shader: Dissolve (消融阈值: 0.35)';
    paramsBox.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
          <span>消融阈值 (Dissolve Amount)</span>
          <span id="shValAmount" style="font-weight:700; color:var(--primary);">0.35</span>
        </div>
        <input type="range" id="shCtrlAmount" min="0" max="1" step="0.02" value="0.35" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('amount', this.value)">
      </div>
    `;
  } else if (mode === 'hologram') {
    target.style.filter = 'hue-rotate(180deg) drop-shadow(0 0 16px rgba(56,189,248,0.6))';
    target.style.background = 'rgba(56,189,248,0.15)';
    overlay.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)';
    badge.innerText = 'Shader: Hologram (彩虹全息流光)';
    paramsBox.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
          <span>全息色相旋转速度 (Hue Speed)</span>
          <span id="shValSpeed" style="font-weight:700; color:var(--primary);">1.5x</span>
        </div>
        <input type="range" id="shCtrlSpeed" min="0.5" max="4" step="0.1" value="1.5" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('speed', this.value)">
      </div>
    `;
  } else if (mode === 'scanline') {
    target.style.filter = 'contrast(1.2) brightness(1.1)';
    target.style.background = 'rgba(16,185,129,0.12)';
    overlay.style.background = 'repeating-linear-gradient(0deg, rgba(0,255,100,0.15) 0px, rgba(0,255,100,0.15) 2px, transparent 2px, transparent 6px)';
    badge.innerText = 'Shader: Scanline (CRT 扫描线)';
    paramsBox.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
          <span>扫描线密度 (Density)</span>
          <span id="shValDensity" style="font-weight:700; color:var(--primary);">40 lines</span>
        </div>
        <input type="range" id="shCtrlDensity" min="10" max="80" step="5" value="40" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('density', this.value)">
      </div>
    `;
  } else if (mode === 'frosted') {
    target.style.filter = 'none';
    target.style.background = 'rgba(255,255,255,0.12)';
    target.style.backdropFilter = 'blur(16px)';
    overlay.style.background = 'none';
    badge.innerText = 'Shader: Frosted Glass (毛玻璃背景模糊)';
    paramsBox.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
          <span>背景高斯模糊强度 (Blur Radius)</span>
          <span id="shValBlur" style="font-weight:700; color:var(--primary);">16px</span>
        </div>
        <input type="range" id="shCtrlBlur" min="2" max="32" step="1" value="16" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('blur', this.value)">
      </div>
    `;
  }

  if (window.showToast) window.showToast(`已加载【${mode.toUpperCase()}】着色器管线！`, 'success');
};

window.updateShaderParam = function(param, val) {
  const target = document.getElementById('shaderPreviewTarget');
  if (param === 'amount') {
    const lbl = document.getElementById('shValAmount');
    if (lbl) lbl.innerText = val;
    if (target) target.style.opacity = Math.max(0.1, 1.0 - parseFloat(val) * 0.9);
  } else if (param === 'blur') {
    const lbl = document.getElementById('shValBlur');
    if (lbl) lbl.innerText = val + 'px';
    if (target) target.style.backdropFilter = `blur(${val}px)`;
  }
};

window.copyGodotShaderCode = function() {
  const code = `// Godot 4 官方 Shader 代码 (${window.currentShaderMode})\nshader_type canvas_item;\n\nuniform sampler2D screen_texture : hint_screen_texture, filter_linear_mipmap;\nuniform float intensity : hint_range(0.0, 1.0) = 0.5;\n\nvoid fragment() {\n    vec4 color = texture(TEXTURE, UV);\n    COLOR = color;\n}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      if (window.showToast) window.showToast('已复制 Godot 4 Shader 代码！', 'success');
    });
  } else {
    if (window.showToast) window.showToast('Shader 代码生成完毕！', 'success');
  }
};

