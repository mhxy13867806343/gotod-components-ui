// =========================================================================
// Gotod Components UI - Component: dialogue
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['dialogue'] = {
  "title": "Dialogue 剧情对话系统 (GDialogue & Prompts)",
  "desc": "专为 JRPG 战术游戏、文字冒险 AVG / GalGame、MMORPG 任务交接与 NPC 互动设计的全功能剧情对话系统。支持打字机逐字输出、说话者印章姓名牌、立绘插槽、多段对话队列、分支选择支、科幻六边形气泡与头顶悬浮按键提示。",
  "demos": [
    {
      "title": "1. 两人双向立绘对峙对话 (Dual-Character Confrontation & Active Highlighting)",
      "render": "\n          <div style=\"background:#0c111d; border:2px solid #233554; border-radius:12px; padding:20px; display:flex; flex-direction:column; gap:16px; position:relative; overflow:hidden;\">\n            <!-- Dual Standee Portraits: Hero on Left, Villain on Right -->\n            <div style=\"display:flex; justify-content:space-between; align-items:flex-end; padding:0 30px; height:120px;\">\n              <div id=\"dualSpeakerLeft\" style=\"display:flex; flex-direction:column; align-items:center; transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(64,158,255,0.4));\">🧙‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#409eff; background:rgba(64,158,255,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">罗宾 (Robin)</span>\n              </div>\n\n              <div id=\"dualSpeakerRight\" style=\"display:flex; flex-direction:column; align-items:center; opacity:0.4; transform:scale(0.92); transition:all 0.3s ease;\">\n                <div style=\"font-size:56px; filter:drop-shadow(0 4px 10px rgba(245,108,108,0.4));\">🦹‍♂️</div>\n                <span style=\"font-size:12px; font-weight:700; color:#f56c6c; background:rgba(245,108,108,0.15); padding:2px 8px; border-radius:4px; margin-top:4px;\">萨堤罗斯 (Saturos)</span>\n              </div>\n            </div>\n\n            <!-- Dialogue Box with Dynamic Side Switching -->\n            <div style=\"background:linear-gradient(180deg, #0a1f44 0%, #051026 100%); border:3px solid #d4d9e6; border-radius:6px; padding:14px 18px; color:#fff;\">\n              <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;\">\n                <span id=\"dualActiveSpeakerName\" style=\"background:#1b356d; border:1px solid #ffd04b; color:#ffd04b; font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px;\">罗宾</span>\n                <span style=\"font-size:11px; color:#a4b0be;\">点击下方按钮切换对话角色</span>\n              </div>\n              <div id=\"dualDialogText\" style=\"font-size:15px; line-height:1.6; min-height:48px;\">\n                萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！\n              </div>\n            </div>\n\n            <!-- Interactive Controller Buttons -->\n            <div style=\"display:flex; gap:10px;\">\n              <button class=\"g-btn g-btn-primary\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerLeft').style.opacity = '1';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerRight').style.opacity = '0.35';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '罗宾';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#409eff';\n                document.getElementById('dualActiveSpeakerName').style.color = '#409eff';\n                document.getElementById('dualDialogText').innerText = '萨堤罗斯！放弃点燃元素灯塔的野心吧，否则整个维亚德大陆都将被毁灭！';\n              \">▶ 罗宾发言 (左侧主角高亮)</button>\n\n              <button class=\"g-btn g-btn-danger\" style=\"flex:1;\" onclick=\"\n                document.getElementById('dualSpeakerRight').style.opacity = '1';\n                document.getElementById('dualSpeakerRight').style.transform = 'scale(1.05)';\n                document.getElementById('dualSpeakerLeft').style.opacity = '0.35';\n                document.getElementById('dualSpeakerLeft').style.transform = 'scale(0.92)';\n                document.getElementById('dualActiveSpeakerName').innerText = '萨堤罗斯';\n                document.getElementById('dualActiveSpeakerName').style.borderColor = '#f56c6c';\n                document.getElementById('dualActiveSpeakerName').style.color = '#f56c6c';\n                document.getElementById('dualDialogText').innerText = '哼，天真的小鬼！封印精神力只会让世界慢慢衰亡，点燃灯塔才是唯一的救赎！';\n              \">▶ 萨堤罗斯发言 (右侧反派高亮)</button>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 2人面对面双向立绘对峙对话 (自动高亮当前说话者，未说话者半透明淡出)\nGDialogue.converse([\n    {\n        \"speaker\": \"罗宾\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"left\",\n        \"text\": \"萨堤罗斯！放弃点燃元素灯塔的野心吧！\"\n    },\n    {\n        \"speaker\": \"萨堤罗斯\",\n        \"left_avatar\": preload(\"res://portraits/robin.png\"),\n        \"right_avatar\": preload(\"res://portraits/saturos.png\"),\n        \"side\": \"right\",\n        \"text\": \"哼，天真的小鬼！点燃灯塔才是拯救世界的唯一救赎！\"\n    }\n])"
    },
    {
      "title": "2. 场景宝箱开启与战利品掉落触发 (Treasure Chest Loot Trigger)",
      "render": "\n          <div style=\"background:#151009; border:2px solid #5c4326; border-radius:12px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:20px;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div id=\"simChestIcon\" style=\"font-size:48px; cursor:pointer; transition:all 0.3s ease;\" onclick=\"\n                this.style.transform = 'scale(1.2) rotate(-8deg)';\n                setTimeout(() => {\n                  this.innerHTML = '✨🎁';\n                  this.style.transform = 'scale(1)';\n                  openSimDialogue({\n                    text: '开启了【远古龙神遗迹宝箱】！\\n获得战利品：【神圣誓约之刃 +12】x1，【神话强化石】x5，金币 x8,800！',\n                    speaker: '宝箱开启',\n                    avatar: '🗡️'\n                  });\n                }, 300);\n              \">📦</div>\n              <div>\n                <div style=\"font-weight:700; color:#ffd700; font-size:14px;\">远古龙神遗迹宝箱 (点击开箱)</div>\n                <div style=\"font-size:11px; color:#eed8ae; margin-top:2px;\">点击宝箱触发开箱判定、掉落动效与战利品对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-warning\" style=\"height:34px;\" onclick=\"document.getElementById('simChestIcon').click()\">\n              <i class=\"fa-solid fa-key\"></i> 开启宝箱 (Open Chest)\n            </button>\n          </div>\n        ",
      "code": "# GDScript: 点击宝箱触发开箱对话与掉落物展示\nfunc _on_treasure_chest_clicked():\n    play_chest_open_animation()\n    GDialogue.loot_chest(\"远古龙神遗迹宝箱\", [\n        \"【神圣誓约之刃 +12】x1\",\n        \"【神话强化石】x5\",\n        \"金币 x8,800\"\n    ], func():\n        add_items_to_inventory()\n        GMessage.success(\"物品已收入背包！\")\n    )"
    },
    {
      "title": "3. 二次元/手游立绘剧场对话与【跳过剧情 >>】(Anime Story Theater - 对标截图)",
      "render": "\n          <div style=\"position:relative; width:100%; min-height:220px; background:linear-gradient(135deg, #180d2b 0%, #0d0617 100%); border:2px solid #5a2e8c; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:16px; user-select:none;\">\n            <!-- Top Right: Skip Story Button [ 跳过剧情 >> ] -->\n            <div style=\"display:flex; justify-content:flex-end;\">\n              <button class=\"g-btn g-btn-default\" style=\"background:rgba(230,162,60,0.15); border:1px solid #ffd04b; color:#ffd04b; font-weight:800; font-size:12px; height:28px; padding:0 14px; border-radius:14px; cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.background='rgba(230,162,60,0.3)'\" onmouseleave=\"this.style.background='rgba(230,162,60,0.15)'\" onclick=\"simAnimeTheaterSkip()\">\n                跳过剧情 &gt;&gt;\n              </button>\n            </div>\n\n            <!-- Left Character Standee + Bottom Dialogue Bar -->\n            <div style=\"display:flex; align-items:flex-end; gap:16px;\">\n              <div id=\"animeStandeeAvatar\" style=\"font-size:72px; line-height:1; filter:drop-shadow(0 0 16px rgba(186,85,211,0.5)); flex-shrink:0; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\">🎭</div>\n              \n              <!-- Full-width Translucent Purple Dialogue Bar (Clickable to continue) -->\n              <div id=\"animeDialogueBox\" title=\"点击继续剧情\" style=\"flex:1; background:rgba(35, 15, 60, 0.88); border:1px solid #8a4baf; border-radius:8px; padding:12px 18px; position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.6); cursor:pointer; transition:all 0.2s;\" onmouseenter=\"this.style.borderColor='#ffd04b'; this.style.boxShadow='0 0 16px rgba(255,208,75,0.25)';\" onmouseleave=\"this.style.borderColor='#8a4baf'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.6)';\" onclick=\"simAnimeTheaterNext()\">\n                <div id=\"animeDialogueSpeaker\" style=\"font-weight:800; color:#ffd04b; font-size:14px; margin-bottom:4px; text-shadow:0 0 8px rgba(255,208,75,0.6);\">疯狂得爱丽丝啊</div>\n                <div id=\"animeDialogueText\" style=\"font-size:13px; color:#f1f2f6; line-height:1.5; min-height:40px;\">\n                  来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\n                </div>\n                <!-- Golden Next Chevron > (Clickable button) -->\n                <div id=\"animeDialogueNextBtn\" title=\"点击继续\" style=\"position:absolute; right:14px; bottom:10px; color:#ffd04b; font-size:18px; font-weight:800; animation:gBlink 0.6s infinite alternate; padding:2px 8px; border-radius:4px; background:rgba(255,208,75,0.1); border:1px solid rgba(255,208,75,0.3);\">&gt;</div>\n              </div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 二次元手游剧场式立绘对话 (带跳过剧情按钮与点击继续)\nvar theater_dialog = GDialogue.say({\n    \"speaker\": \"疯狂得爱丽丝啊\",\n    \"avatar\": preload(\"res://portraits/alice_mask.png\"),\n    \"text\": \"来，品尝一下火焰的滋味吧！开玩笑的，这么好看的衣服，万一被烧坏就可惜了。\",\n    \"allow_skip\": true\n})\ntheater_dialog.next_line_triggered.connect(func():\n    print(\"玩家点击继续，进入下一句剧场台词\")\n)"
    },
    {
      "title": "4. 《梦幻西游》经典 NPC 任务交接与红色选项分支 (Westward Journey NPC Quest)",
      "render": "\n          <div style=\"background:#0e131d; border:2px solid #4a5568; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px;\">\n            <div style=\"display:flex; gap:16px; align-items:flex-end;\">\n              <!-- Left NPC 3D Bust with Name -->\n              <div style=\"display:flex; flex-direction:column; align-items:center; width:90px;\">\n                <div style=\"width:72px; height:72px; background:radial-gradient(circle, #2d3748, #1a202c); border:2px solid #718096; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:36px;\">🥋</div>\n                <span style=\"font-size:12px; font-weight:700; color:#fff; background:#2d3748; padding:2px 8px; border-radius:4px; margin-top:-6px; border:1px solid #4a5568;\">首席大弟子</span>\n              </div>\n\n              <!-- CRT Scanline Dark Dialogue Box with Red Clickable Branches -->\n              <div style=\"flex:1; background:rgba(15, 20, 30, 0.95); border:2px solid #cbd5e0; border-radius:8px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;\">\n                <div style=\"color:#fff; font-size:13px; font-weight:600;\">\n                  敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\n                </div>\n                <div style=\"display:flex; flex-direction:column; gap:4px; margin-top:2px;\">\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发战斗：进入首席弟子挑战副本！', 'danger')\">\n                    ▶ 我奉师傅之命，特来挑战——看招！\n                  </a>\n                  <a href=\"javascript:void(0)\" style=\"color:#ff3333; font-weight:700; font-size:13px; text-decoration:none;\" onclick=\"showToast('触发剧情：我是路过拜访你的师傅老人家的。', 'info')\">\n                    ▶ 我是路过拜访你的师傅老人家的。\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 《梦幻西游》NPC 任务交接与红字选择支\nvar diag = GDialogue.ask(\n    \"敢来挑战我？看来是不要命了！想尝尝我的厉害可以说！\",\n    [\n        \"我奉师傅之命，特来挑战——看招！\",\n        \"我是路过拜访你的师傅老人家的。\"\n    ],\n    \"首席大弟子\",\n    avatar_chief\n)\ndiag.option_selected.connect(func(idx, text):\n    if idx == 0:\n        start_chief_boss_battle()\n    else:\n        open_dialog_greeting()\n)"
    },
    {
      "title": "5. 科幻/二次元斜切六边形气泡 (Sci-Fi Hexagonal Polygon Bubble - 对标截图)",
      "render": "\n          <div style=\"background:radial-gradient(circle at center, #1b2640 0%, #0a0f1d 100%); border:2px solid #2b4c7e; border-radius:12px; padding:20px; position:relative; overflow:hidden; display:flex; flex-direction:column; gap:16px; user-select:none;\">\n            <!-- Top Controls [ AUTO ] [ SKIP ] -->\n            <div style=\"display:flex; justify-content:flex-end; gap:8px;\">\n              <button id=\"scifiAutoBtn\" class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiToggleAuto()\">AUTO</button>\n              <button class=\"g-btn g-btn-default\" style=\"background:#1b356d; border:1px solid #409eff; color:#fff; font-size:11px; height:24px; padding:0 10px; border-radius:12px; cursor:pointer; transition:all 0.2s;\" onclick=\"simSciFiSkip()\">SKIP</button>\n            </div>\n\n            <!-- Hexagonal Tech Dialogue Bubble -->\n            <div id=\"scifiDialogueBox\" title=\"点击继续对话\" style=\"position:relative; background:#0d1a33; border:2px solid #409eff; padding:16px 24px; border-radius:14px; clip-path:polygon(0% 0%, 94% 0%, 100% 50%, 94% 100%, 0% 100%); box-shadow:0 0 16px rgba(64,158,255,0.3); cursor:pointer; min-height:80px;\" onclick=\"simSciFiNext()\">\n              <!-- Speaker Tag Badge -->\n              <div id=\"scifiSpeakerTag\" style=\"position:absolute; top:-12px; left:20px; background:#409eff; color:#fff; font-size:11px; font-weight:800; padding:2px 14px; border-radius:4px; clip-path:polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%);\">\n                シマトラ\n              </div>\n              <div id=\"scifiDialogueText\" style=\"color:#fff; font-size:13px; line-height:1.6; margin-top:2px;\">\n                誰が、どうやって、何の目的で――<br>そのあたりは、これから調査するのである\n              </div>\n              <div style=\"position:absolute; right:36px; bottom:10px; color:#409eff; font-size:14px; font-weight:800; animation:gBlink 0.6s infinite alternate;\">&gt;&gt;</div>\n            </div>\n          </div>\n        ",
      "code": "# GDScript: 科幻/二次元斜切六边形气泡对话框\nvar scifi_diag = GDialogue.say(\"誰が、どうやって、何の目的で――\\nそのあたりは、これから調査するのである\", \"シマトラ\")"
    },
    {
      "title": "6. 《黄金太阳》经典 JRPG 对话框 (Golden Sun Style)",
      "render": "\n          <div style=\"display:flex; gap:12px; align-items:center;\">\n            <button class=\"g-btn g-btn-primary\" onclick=\"openSimDialogue([\n              { text: '修炼精神力的话，会学到不同的招式。', speaker: '神秘长者', avatar: '🧙‍♂️' },\n              { text: '去北方的索罗神殿吧，四大元素的封印正在苏醒！', speaker: '神秘长者', avatar: '🧙‍♂️' }\n            ])\">\n              <i class=\"fa-solid fa-play\"></i> 播放黄金太阳经典对话\n            </button>\n          </div>\n        ",
      "code": "# GDScript: 黄金太阳经典对话\nGDialogue.say(\"修炼精神力的话，会学到不同的招式。\", \"神秘长者\")"
    },
    {
      "title": "7. 像素 RPG 靠近 NPC 头顶悬浮交互按键 (Floating Prompt [ R ] / [ E ])",
      "render": "\n          <div style=\"background:#1e2b18; padding:16px 20px; border-radius:10px; border:2px solid #3c5a2e; display:flex; align-items:center; justify-content:space-between;\">\n            <div style=\"display:flex; align-items:center; gap:16px;\">\n              <div style=\"font-size:36px; position:relative;\">\n                🧔‍♂️\n                <div style=\"position:absolute; top:-16px; right:-8px; background:#000; color:#fff; border:2px solid #fff; border-radius:50%; width:20px; height:20px; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; animation:gBlink 0.6s infinite alternate;\">R</div>\n              </div>\n              <div>\n                <div style=\"font-weight:700; color:#a3e635; font-size:13px;\">湖畔垂钓翁·姜老</div>\n                <div style=\"font-size:11px; color:#d9f99d; margin-top:2px;\">靠近时自动浮现 [ R ] 交互按键，按 R 或点击开始对话</div>\n              </div>\n            </div>\n            <button class=\"g-btn g-btn-primary\" style=\"height:32px; font-size:12px;\" onclick=\"openSimDialogue({ text: '小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！', speaker: '姜老', avatar: '🎣' })\">\n              按 R 键交谈\n            </button>\n          </div>\n        ",
      "code": "# GDScript: 为 2D NPC 绑定头顶交互按键\nGInteractPrompt.attach_to(npc_old_man, \"R\", func():\n    GDialogue.say(\"小伙子，这片湖里的金鳞龙鲤可不是那么好钓的！\", \"姜老\", avatar_old_man)\n)"
    }
  ],
  "props": [
    {
      "name": "typing_speed",
      "type": "float",
      "default": "0.03",
      "desc": "打字机单字输出时间间隔 (秒)"
    },
    {
      "name": "position",
      "type": "enum",
      "default": "BOTTOM",
      "desc": "对话框位置：BOTTOM (底部居中), TOP (顶部), CENTER (居中)"
    }
  ],
  "events": [
    {
      "name": "text_completed()",
      "desc": "当前句打字机输出完毕时触发",
      "params": "()"
    },
    {
      "name": "dialogue_finished()",
      "desc": "整段对话队列全部播放完毕并关闭时触发",
      "params": "()"
    },
    {
      "name": "option_selected(index, text)",
      "desc": "玩家点击分支选项时触发",
      "params": "(index: int, text: String)"
    }
  ],
  "methods": [
    {
      "name": "say(lines, speaker=\"\", avatar=null)",
      "desc": "播放单句或多句对话队列",
      "params": "(lines: Variant, speaker: String, avatar: Texture2D) -> GDialogue"
    },
    {
      "name": "ask(question, options, speaker=\"\", avatar=null)",
      "desc": "播放带分支选择支的剧情对话",
      "params": "(question: String, options: Array, speaker: String, avatar: Texture2D) -> GDialogue"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "剧情对话正文打字机富文本区域",
      "child": "RichTextLabel / Control",
      "example": "<template #default>勇士，燃烧军团的阴影已笼罩艾泽拉斯！</template>"
    },
    {
      "name": "name",
      "desc": "说话者姓名牌印章区域",
      "child": "GText / PanelContainer",
      "example": "<template #name><span>大魔导师·卡德加 (Lv.99)</span></template>"
    },
    {
      "name": "avatar",
      "desc": "说话者半身立绘/动态插画插槽",
      "child": "TextureRect / AnimatedSprite2D",
      "example": "<template #avatar><TextureRect texture=\"res://npc_khadgar.png\" /></template>"
    },
    {
      "name": "options",
      "desc": "分支选择支列表插槽（透传 { option_list }）",
      "child": "VBoxContainer / GButton",
      "example": "<template #options><GButton>接受拯救世界任务</GButton></template>"
    },
    {
      "name": "next-icon",
      "desc": "右下角打字机完毕后的翻页闪烁指示图标插槽",
      "child": "GIcon / TextureRect",
      "example": "<template #next-icon><GIcon name=\"angles-down\" /></template>"
    }
  ]
};
