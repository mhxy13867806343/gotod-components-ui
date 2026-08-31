// =========================================================================
// Gotod Components UI - Component: ai-dialogue (GAIDialogueTree)
// 智能 AI 对话树与大语言模型/行为树动态分支推理引擎
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['ai-dialogue'] = {
  "title": "AI 对话树与动态剧情推理 (GAIDialogueTree)",
  "desc": "无缝对接大语言模型 (LLM / 本地 Ollama / 远程 API) 与行为树。支持 NPC 情绪状态机、记忆上下文持久化、根据玩家性格与历史抉择动态生成智能多分支剧本推理。",
  "demos": [
    {
      "title": "1. 智能 NPC 动态情绪与多分支对话推理 (Live AI Branching RPG Dialogue)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- NPC Header & Mood Status Indicator -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #4f46e5, #9333ea); display:flex; align-items:center; justify-content:center; font-size:20px;">
                🧙‍♂️
              </div>
              <div>
                <div style="font-size:13px; font-weight:700; display:flex; align-items:center; gap:6px;">
                  <span>大法师 · 艾尔温 (Elwin)</span>
                  <span id="aiNpcMoodTag" class="g-tag g-tag-primary" style="font-size:10px; padding:1px 6px;">态度: 友善 (Friendly)</span>
                </div>
                <div style="font-size:11px; color:var(--text-secondary);">守望者之塔掌门人 | 记忆节点: 4 条</div>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="g-btn g-btn-default" style="font-size:11px; padding:2px 8px;" onclick="window.resetAIDialogue()">🔄 重置剧本树</button>
            </div>
          </div>

          <!-- Live Dialogue Bubble Stream -->
          <div id="aiDialogueStream" style="height:180px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); padding:12px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; margin-bottom:12px;">
            <div style="display:flex; gap:8px; align-items:flex-start;">
              <span style="font-size:16px;">🧙‍♂️</span>
              <div style="background:var(--bg-surface); padding:8px 12px; border-radius:6px; font-size:12.5px; border:1px solid var(--border-base); color:var(--text-regular); line-height:1.6; max-width:85%;">
                旅行者，你身上流淌着远古符文的气息... 是为了封印深渊魔核而来的吗？
              </div>
            </div>
          </div>

          <!-- Dynamic Branch Options (AI Evaluated) -->
          <div style="font-size:11.5px; font-weight:700; color:var(--text-secondary); margin-bottom:8px;">
            🤖 AI 动态生成的决策分支 (根据玩家声望与魅力值解锁)：
          </div>
          <div id="aiOptionsContainer" style="display:flex; flex-direction:column; gap:6px;">
            <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('honest')">
              🗣️ [诚实] 是的，我必须摧毁它以挽救王国 (需要智力 ≥ 12)
            </button>
            <button class="g-btn g-btn-default" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('bargain')">
              💰 [商贾] 我想要那件蕴含禁忌力量的古代法杖，做个交易吧
            </button>
            <button class="g-btn g-btn-danger" style="justify-content:flex-start; text-align:left; font-size:12px; padding:6px 12px;" onclick="window.chooseAIOption('threat')">
              ⚔️ [威吓] 把封印钥匙交出来，否则休怪我剑下无情！
            </button>
          </div>
        </div>
      `,
      "code": "# GDScript: AI 对话树与动态推理\nvar ai_dialogue = GAIDialogueTree.new()\nai_dialogue.npc_id = \"mage_elwin\"\nai_dialogue.system_prompt = \"你是一位睿智严厉的大法师，坚守深渊封印石...\"\nai_dialogue.decision_branch_selected.connect(func(branch_id, player_choice):\n    ai_dialogue.infer_next_step(player_choice)\n)\nadd_child(ai_dialogue)"
    }
  ],
  "props": [
    {
      "name": "npc_id",
      "type": "String",
      "default": "\"npc_default\"",
      "desc": "当前对话 NPC 的唯一身份标识与独立记忆槽位",
      "version": "v1.5.0"
    },
    {
      "name": "system_prompt",
      "type": "String",
      "default": "\"\"",
      "desc": "大语言模型角色人设 System Prompt",
      "version": "v1.5.0"
    },
    {
      "name": "context_window_size",
      "type": "int",
      "default": "10",
      "desc": "短期记忆保留的对话轮次上限",
      "version": "v1.5.0"
    },
    {
      "name": "temperature",
      "type": "float",
      "default": "0.7",
      "desc": "剧本发散度与多样性 (0.0 精确确定 ~ 1.0 创意丰富)",
      "version": "v1.5.0"
    }
  ],
  "events": [
    {
      "name": "options_generated",
      "desc": "当 AI 推理生成出新的多分支决策选项时触发",
      "params": "(branches: Array[Dictionary])",
      "version": "v1.5.0"
    },
    {
      "name": "mood_changed",
      "desc": "NPC 情绪态度因玩家选择改变时广播（如 友善 -> 敌对）",
      "params": "(old_mood: String, new_mood: String)",
      "version": "v1.5.0"
    }
  ],
  "methods": [
    {
      "name": "infer_next_step(user_text: String)",
      "desc": "将玩家回复送入推理引擎，自动生成 NPC 台词与新决策分支",
      "params": "(user_text: String) -> void",
      "version": "v1.5.0"
    },
    {
      "name": "add_memory_fact(fact_text: String)",
      "desc": "向 NPC 长期记忆库中永久写入一条世界事件或玩家事迹",
      "params": "(fact_text: String) -> void",
      "version": "v1.5.0"
    }
  ]
};
