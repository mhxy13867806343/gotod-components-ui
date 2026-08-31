// =========================================================================
// Gotod Components UI - Component: collapse
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['collapse'] = {
  "title": "Collapse 折叠面板 (GCollapse)",
  "desc": "通过折叠面板收纳内容区域。深度支持手风琴互斥模式、移动端触控手势左右/上下滑动展开、自定义三次贝塞尔 (Cubic-Bezier) 与弹簧回弹过渡曲线。",
  "demos": [
    {
      "title": "1. 基础折叠面板与触控滑动展开手势 (Gesture Swipe & Basic Collapse)",
      "render": "\n        <div style=\"max-width:480px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface);\">\n          <div id=\"cItemHeader1\" style=\"padding:12px 16px; background:var(--bg-card); cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700; user-select:none;\" onclick=\"\n            const body = document.getElementById('cItemBody1');\n            const arrow = document.getElementById('cItemArrow1');\n            const isOpen = body.style.display !== 'none';\n            body.style.display = isOpen ? 'none' : 'block';\n            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';\n          \">\n            <span>🛡️ 防御机制与护甲减伤计算公式</span>\n            <i id=\"cItemArrow1\" class=\"fa-solid fa-chevron-down\" style=\"transition:transform 0.3s ease;\"></i>\n          </div>\n          <div id=\"cItemBody1\" style=\"padding:14px 16px; font-size:12.5px; color:var(--text-regular); line-height:1.7; border-top:1px solid var(--border-base); background:var(--bg-surface);\">\n            有效承伤 = 原始伤害 × [ 100 / (100 + 护甲值) ]。<br>\n            <span style=\"color:var(--text-secondary); font-size:11px;\">💡 提示：在移动端或触摸板上支持直接按住向下拉动展开或收起。</span>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 基础折叠与手势展开\nvar collapse = GCollapse.new()\ncollapse.gesture_enabled = true # 开启触控手势滑动展开\ncollapse.add_item(\"🛡️ 防御机制\", armor_node)"
    },
    {
      "title": "2. 自定义三次贝塞尔与弹簧回弹过渡曲线 (Custom Transition Curves)",
      "render": "\n        <div style=\"max-width:480px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; background:var(--bg-surface);\">\n          <div style=\"padding:12px 16px; background:var(--bg-card); cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700;\" onclick=\"\n            const body = document.getElementById('cItemCurveBody');\n            const arrow = document.getElementById('cItemCurveArrow');\n            const isOpen = body.style.maxHeight !== '0px';\n            body.style.maxHeight = isOpen ? '0px' : '120px';\n            body.style.opacity = isOpen ? '0' : '1';\n            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';\n          \">\n            <span style=\"display:flex; align-items:center; gap:8px;\">\n              <i class=\"fa-solid fa-wand-magic-sparkles\" style=\"color:#a855f7;\"></i>\n              <span>终极禁咒·陨石术 (弹簧过渡曲线)</span>\n            </span>\n            <i id=\"cItemCurveArrow\" class=\"fa-solid fa-chevron-down\" style=\"transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\"></i>\n          </div>\n          <div id=\"cItemCurveBody\" style=\"max-height:0px; opacity:0; overflow:hidden; transition:max-height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease; padding:0 16px; font-size:12.5px; color:var(--text-regular); line-height:1.7; background:var(--bg-surface);\">\n            <div style=\"padding:12px 0; border-top:1px solid var(--border-base);\">\n              🔥 消耗 120 MP，召唤天外烈焰陨石轰击全场，造成 850% 范围真实伤害并眩晕 2.5 秒。<br>\n              <span style=\"color:var(--primary); font-size:11px;\">过渡曲线：cubic-bezier(0.34, 1.56, 0.64, 1) 弹簧果冻回弹。</span>\n            </div>\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 自定义过渡曲线与回弹\ncollapse.transition_curve = Tween.TRANS_BACK # TRANS_SPRING / TRANS_CUBIC\ncollapse.transition_duration = 0.35"
    },
    {
      "title": "3. 手风琴互斥模式 (Accordion Mode)",
      "render": "\n        <div style=\"max-width:480px; border:1px solid var(--border-base); border-radius:8px; overflow:hidden; font-size:13px; background:var(--bg-surface);\">\n          <div id=\"accH1\" style=\"padding:10px 14px; background:var(--bg-card); border-bottom:1px solid var(--border-base); font-weight:700; cursor:pointer; display:flex; justify-content:space-between;\" onclick=\"\n            document.getElementById('accB1').style.display = 'block';\n            document.getElementById('accB2').style.display = 'none';\n          \">\n            <span>第一章：王城的沦陷</span>\n            <span class=\"g-tag g-tag-primary\" style=\"font-size:10px;\">展开中</span>\n          </div>\n          <div id=\"accB1\" style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary); border-bottom:1px solid var(--border-base);\">\n            在战火中守卫最后的圣骑士军团，抵御暗影军团的第 1 波猛攻...\n          </div>\n          <div id=\"accH2\" style=\"padding:10px 14px; background:var(--bg-card); font-weight:700; cursor:pointer; display:flex; justify-content:space-between;\" onclick=\"\n            document.getElementById('accB1').style.display = 'none';\n            document.getElementById('accB2').style.display = 'block';\n          \">\n            <span>第二章：深渊的回响</span>\n            <span class=\"g-tag g-tag-default\" style=\"font-size:10px;\">折叠</span>\n          </div>\n          <div id=\"accB2\" style=\"display:none; padding:12px 14px; font-size:12px; color:var(--text-secondary);\">\n            潜入深渊裂缝寻找失落的魔皇圣剑封印石...\n          </div>\n        </div>\n      ",
      "code": "# GDScript: 手风琴互斥\ncollapse.accordion = true"
    }
  ],
  "props": [
    {
      "name": "accordion",
      "type": "boolean",
      "default": "false",
      "desc": "是否手风琴互斥模式（同时间仅允许展开 1 个面板）",
      "version": "v1.0"
    },
    {
      "name": "gesture_enabled",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启移动端触控手势滑动展开与收起",
      "version": "v1.3.0"
    },
    {
      "name": "transition_curve",
      "type": "enum",
      "default": "Tween.TRANS_CUBIC",
      "desc": "过渡展开曲线：TRANS_CUBIC, TRANS_BACK (弹簧回弹), TRANS_QUAD, TRANS_SPRING",
      "version": "v1.3.0"
    },
    {
      "name": "transition_duration",
      "type": "float",
      "default": "0.3",
      "desc": "平滑展开/折叠过渡动画耗时（秒）",
      "version": "v1.3.0"
    },
    {
      "name": "borderless",
      "type": "boolean",
      "default": "false",
      "desc": "是否开启极简无边框样式",
      "version": "v1.0"
    }
  ],
  "events": [
    {
      "name": "change",
      "desc": "当前展开面板激活项改变时触发",
      "params": "(active_names: Array)",
      "version": "v1.0"
    },
    {
      "name": "gesture_triggered",
      "desc": "玩家通过手指触控手势滑动触发折叠/展开时广播",
      "params": "(item_index: int, is_expand: bool)",
      "version": "v1.3.0"
    }
  ],
  "methods": [
    {
      "name": "toggle(index: int)",
      "desc": "切换指定索引面板的折叠/展开状态",
      "params": "(index: int) -> void",
      "version": "v1.0"
    },
    {
      "name": "expand_all()",
      "desc": "一键展开全部折叠面板",
      "params": "() -> void",
      "version": "v1.0"
    },
    {
      "name": "collapse_all()",
      "desc": "一键收起全部折叠面板",
      "params": "() -> void",
      "version": "v1.0"
    }
  ],
  "slots": [
    {
      "name": "default",
      "desc": "面板主体内容插槽",
      "child": "Control",
      "example": "<GCollapseItem>Content</GCollapseItem>",
      "version": "v1.0"
    },
    {
      "name": "header",
      "desc": "自定义单个折叠面板标题栏插槽",
      "child": "Control",
      "example": "<template #header><i class=\"fa-solid fa-star\"></i> Custom Title</template>",
      "version": "v1.3.0"
    }
  ]
};
