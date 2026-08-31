// =========================================================================
// Gotod Components UI - Component: i18n (GI18n)
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['i18n'] = {
  "title": "i18n 国际化多语言引擎 (GI18n)",
  "desc": "无缝对接 Godot 4 国际化 Translation 词条系统，支持全场景多语言动态热切换、动态参数插值、复数形式与按需异步语言包加载。",
  "demos": [
    {
      "title": "1. 实时全场景多语言动态热切换 (Live Multi-Language Switching)",
      "render": `
        <div style="max-width:540px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- Language Selector Buttons -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <span style="font-size:12px; color:var(--text-secondary);"><i class="fa-solid fa-language" style="color:var(--primary);"></i> 选择当前语言 (Locale)：</span>
            <div style="display:flex; gap:6px;">
              <button id="i18nBtn_zh" class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.switchDemoLang('zh')">🇨🇳 简体中文</button>
              <button id="i18nBtn_en" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchDemoLang('en')">🇺🇸 English</button>
              <button id="i18nBtn_ja" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchDemoLang('ja')">🇯🇵 日本語</button>
              <button id="i18nBtn_ko" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchDemoLang('ko')">🇰🇷 한국어</button>
            </div>
          </div>

          <!-- Live Translated Game UI Card Simulator -->
          <div style="background:var(--bg-card); border-radius:6px; border:1px solid var(--border-base); padding:16px;">
            <div style="font-size:14px; font-weight:700; color:var(--primary); margin-bottom:6px;" id="i18nTitle">
              🏰 遗忘神庙 · 讨伐任务
            </div>
            <div style="font-size:12px; color:var(--text-regular); line-height:1.6; margin-bottom:10px;" id="i18nDesc">
              勇士 Arthur，你已成功升至 Lv.88！目前剩余 350 点体力，准备好迎接最终 BOSS 战了吗？
            </div>
            <div style="display:flex; gap:8px;">
              <button class="g-btn g-btn-primary" style="font-size:12px; padding:4px 14px;" id="i18nBtnStart">
                ⚔️ 开始远征
              </button>
              <button class="g-btn g-btn-default" style="font-size:12px; padding:4px 14px;" id="i18nBtnShop">
                🛒 道具补给
              </button>
            </div>
          </div>
        </div>
      `,
      "code": "# GDScript: 国际化多语言引擎\nGI18n.set_locale(\"en\") # 动态热切换\nvar text = GI18n.t(\"quest.desc\", { \"name\": \"Arthur\", \"level\": 88 })\nlabel.text = text"
    },
    {
      "title": "2. 动态参数插值与复数格式化 (Parameter Interpolation)",
      "render": `
        <div style="max-width:540px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">
            💡 支持在 GDScript 词条中使用 <code>{param}</code> 占位符进行安全传参插值：
          </div>
          <div style="background:var(--bg-card); padding:10px 14px; border-radius:6px; border:1px solid var(--border-base); font-size:12px; color:var(--text-regular); line-height:1.6;">
            <b>词条定义</b>: <code>"inventory.item_gain": "获得了 {count} 个 {item_name}！"</code><br>
            <b>运行时输出</b>: <span style="color:var(--success); font-weight:700;">获得了 5 个 远古龙晶！</span>
          </div>
        </div>
      `,
      "code": "# GDScript: 参数插值\nvar msg = GI18n.t(\"inventory.item_gain\", {\n    \"count\": 5,\n    \"item_name\": \"远古龙晶\"\n})"
    }
  ],
  "props": [
    {
      "name": "locale",
      "type": "String",
      "default": "\"zh_CN\"",
      "desc": "当前激活的语言代码（如 zh_CN, en_US, ja_JP, ko_KR）",
      "version": "v1.3.0"
    },
    {
      "name": "fallback_locale",
      "type": "String",
      "default": "\"en_US\"",
      "desc": "当指定词条缺失时的默认回退语言",
      "version": "v1.3.0"
    },
    {
      "name": "auto_reload",
      "type": "boolean",
      "default": "true",
      "desc": "切换语言时是否自动遍历通知所有挂载的 UI 节点刷新词条",
      "version": "v1.3.0"
    }
  ],
  "events": [
    {
      "name": "locale_changed",
      "desc": "语言环境发生热切换时全局广播触发",
      "params": "(new_locale: String)",
      "version": "v1.3.0"
    }
  ],
  "methods": [
    {
      "name": "t(key: String, params: Dictionary = {})",
      "desc": "核心翻译函数，支持词条多层路径与 {param} 动态插值",
      "params": "(key: String, params: Dictionary) -> String",
      "version": "v1.3.0"
    },
    {
      "name": "set_locale(new_locale: String)",
      "desc": "动态切换全局语言并触发全 UI 节点自动重绘",
      "params": "(new_locale: String) -> void",
      "version": "v1.3.0"
    },
    {
      "name": "has_key(key: String, locale: String = \"\")",
      "desc": "检查指定语言或当前语言中是否存在该词条",
      "params": "(key: String, locale: String) -> bool",
      "version": "v1.3.0"
    }
  ]
};
