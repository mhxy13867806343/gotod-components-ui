// =========================================================================
// Gotod Components UI - Component Catalog Part 6 / 6
// Group: tag, badge, avatar, progress, tabs, collapse, steps, space
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
Object.assign(window.COMPONENT_CATALOG, {
  "tag": {
    "title": "Tag 标签 (GTag)",
    "desc": "用于标记和选择。支持 Light, Outline, Solid 三种质感及动态添加/关闭操作。",
    "demos": [
      {
        "title": "1. 基础主题色 (Basic Types: Primary / Success / Warning / Danger / Info)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\">Primary 主要</span><span class=\"g-tag g-tag-success\">Success 成功</span><span class=\"g-tag g-tag-warning\">Warning 警告</span><span class=\"g-tag g-tag-danger\">Danger 危险</span><span class=\"g-tag g-tag-info\">Info 消息</span></div>",
        "code": "# GDScript: 基础标签\nvar tag_p = GTag.new(\"Primary\", GotodTheme.Type.PRIMARY)\nadd_child(tag_p)"
      },
      {
        "title": "2. 可关闭标签 (Closable Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px;\">火系魔法 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了火系魔法标签', 'info')\"></i></span><span class=\"g-tag g-tag-success\" style=\"display:inline-flex; align-items:center; gap:6px;\">疾风步 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer; font-size:11px;\" onclick=\"this.parentElement.remove(); showToast('移除了疾风步标签', 'info')\"></i></span></div>",
        "code": "# GDScript: 可移除标签\ntag.closable = true"
      },
      {
        "title": "3. 尺寸与圆角形态 (Sizes: Small / Default / Large / Round)",
        "render": "<div style=\"display:flex; gap:12px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"padding:1px 6px; font-size:11px;\">Small 迷你</span><span class=\"g-tag g-tag-primary\" style=\"padding:3px 8px; font-size:12px;\">Default 默认</span><span class=\"g-tag g-tag-primary\" style=\"padding:6px 12px; font-size:14px;\">Large 大型</span><span class=\"g-tag g-tag-success\" style=\"border-radius:16px; padding:3px 12px;\">Round 胶囊圆角</span></div>",
        "code": "# GDScript: 尺寸设定\ntag.size = GTag.Size.SMALL\ntag.round = true"
      },
      {
        "title": "4. 朴素描边模式 (Plain / Outline Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--primary); color:var(--primary);\">朴素主要</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--success); color:var(--success);\">朴素成功</span><span class=\"g-tag\" style=\"background:transparent; border:1px solid var(--danger); color:var(--danger);\">朴素危险</span></div>",
        "code": "# GDScript: 朴素边框\ntag.plain = true"
      },
      {
        "title": "5. 游戏品质稀有度标签 (Game Rarity Tags)",
        "render": "<div style=\"display:flex; gap:10px; flex-wrap:wrap; align-items:center;\"><span class=\"g-tag\" style=\"background:#4b5563; color:#fff; font-weight:600;\">普通 (N)</span><span class=\"g-tag\" style=\"background:#2563eb; color:#fff; font-weight:600;\">精良 (R)</span><span class=\"g-tag\" style=\"background:#9333ea; color:#fff; font-weight:600;\">史诗 (SR)</span><span class=\"g-tag\" style=\"background:linear-gradient(90deg, #d97706, #f59e0b); color:#fff; font-weight:700; box-shadow:0 0 8px rgba(245,158,11,0.5);\">传说 (SSR)</span></div>",
        "code": "# GDScript: 稀有度标签\nvar ssr_tag = GTag.new(\"传说 (SSR)\")"
      },
      {
        "title": "6. 动态可编辑新增标签 (Dynamic Editable Tag Group)",
        "render": "<div style=\"display:flex; gap:8px; align-items:center; flex-wrap:wrap;\"><span class=\"g-tag g-tag-primary\">战士</span><span class=\"g-tag g-tag-primary\">法师</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\" onclick=\"showToast('添加新标签', 'info')\">+ 新增标签</button></div>",
        "code": "# GDScript: 动态标签\ntag_group.add_tag(\"刺客\")"
      }
    ],
    "props": [
      {
        "name": "text",
        "type": "String",
        "default": "\"Tag\"",
        "desc": "标签文本"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "DEFAULT",
        "desc": "色彩类型：DEFAULT, PRIMARY, SUCCESS, WARNING, DANGER, INFO"
      },
      {
        "name": "variant",
        "type": "enum",
        "default": "LIGHT",
        "desc": "质感风格：LIGHT, OUTLINE, SOLID"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "是否显示关闭按钮"
      },
      {
        "name": "round",
        "type": "boolean",
        "default": "false",
        "desc": "是否圆角胶囊形态"
      }
    ],
    "events": [
      {
        "name": "closed()",
        "desc": "点击关闭按钮时触发",
        "params": "()"
      },
      {
        "name": "clicked()",
        "desc": "点击标签本身时触发",
        "params": "()"
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "标签内部文字或内容插槽",
        "child": "Label / Control",
        "example": "<template #default>Godot 4.3 渲染引擎</template>"
      },
      {
        "name": "icon",
        "desc": "标签前置图标插槽",
        "child": "GIcon / TextureRect",
        "example": "<template #icon><GIcon name=\"fire\" /></template>"
      },
      {
        "name": "close-icon",
        "desc": "自定义可关闭标签的关闭按钮插槽",
        "child": "GIcon / GButton",
        "example": "<template #close-icon><GIcon name=\"xmark\" /></template>"
      }
    ]
  },
  "badge": {
    "title": "Badge 徽标 (GBadge)",
    "desc": "按钮和图标上的数字或状态标记。支持 99+ 溢出保护与小红圆点模式。",
    "demos": [
      {
        "title": "1. 基础数值徽标 (Basic Count Badge)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">未读私信</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">5</span></div><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-primary\">公会申请</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--warning); color:#fff; font-size:11px; padding:1px 6px; border-radius:10px; font-weight:600;\">12</span></div></div>",
        "code": "# GDScript: 基础徽标\nvar badge = GBadge.new(5)\nbtn.add_child(badge)"
      },
      {
        "title": "2. 最大值封顶截断 (Max Value: 99+ / 999+)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">背包爆满</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--danger); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:600;\">99+</span></div><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">金币收益</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:var(--success); color:#fff; font-size:10px; padding:1px 5px; border-radius:10px; font-weight:600;\">999+</span></div></div>",
        "code": "# GDScript: 最大值封顶\nbadge.value = 150\nbadge.max = 99"
      },
      {
        "title": "3. 小红点模式 (Dot Mode: is_dot)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><i class=\"fa-solid fa-bell\" style=\"font-size:22px; color:var(--text-primary);\"></i><span style=\"position:absolute; top:-2px; right:-2px; width:8px; height:8px; background:var(--danger); border-radius:50%;\"></span></div><div style=\"position:relative; display:inline-block;\"><i class=\"fa-solid fa-envelope\" style=\"font-size:22px; color:var(--primary);\"></i><span style=\"position:absolute; top:-2px; right:-2px; width:8px; height:8px; background:var(--danger); border-radius:50%;\"></span></div></div>",
        "code": "# GDScript: 小红点\nbadge.is_dot = true"
      },
      {
        "title": "4. 自定义色彩方案 (Custom Status Colors)",
        "render": "<div style=\"display:flex; gap:24px; align-items:center; flex-wrap:wrap;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-default\">神话掉落</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:#a855f7; color:#fff; font-size:10px; padding:1px 5px; border-radius:10px;\">NEW</span></div></div>",
        "code": "# GDScript: 自定义颜色\nbadge.badge_color = Color(\"#a855f7\")"
      },
      {
        "title": "5. 独立展示徽标 (Standalone Badge)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><span class=\"g-badge\" style=\"background:var(--primary); color:#fff; font-size:12px; padding:2px 8px; border-radius:10px;\">版本 v1.0.4</span><span class=\"g-badge\" style=\"background:var(--success); color:#fff; font-size:12px; padding:2px 8px; border-radius:10px;\">服务器正常</span></div>",
        "code": "# GDScript: 独立徽标\nvar stand_badge = GBadge.new(\"版本 v1.0.4\", GotodTheme.Type.PRIMARY)"
      },
      {
        "title": "6. 游戏呼吸闪烁动态角标 (Glowing / Breathing Badge)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center;\"><div style=\"position:relative; display:inline-block;\"><button class=\"g-btn g-btn-warning\" style=\"font-weight:700;\">🎁 免费十连抽</button><span class=\"g-badge\" style=\"position:absolute; top:-6px; right:-8px; background:#ef4444; color:#fff; font-size:10px; padding:1px 6px; border-radius:10px; box-shadow:0 0 10px #ef4444;\">HOT</span></div></div>",
        "code": "# GDScript: 呼吸动画徽标\nbadge.pulse_animation = true"
      }
    ],
    "props": [
      {
        "name": "value",
        "type": "int",
        "default": "0",
        "desc": "徽标显示数字"
      },
      {
        "name": "max_value",
        "type": "int",
        "default": "99",
        "desc": "最大值，超出显示 max_value+"
      },
      {
        "name": "is_dot",
        "type": "boolean",
        "default": "false",
        "desc": "是否仅显示小红圆点"
      },
      {
        "name": "hidden",
        "type": "boolean",
        "default": "false",
        "desc": "是否隐藏徽标"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "徽标所依附的主体节点插槽",
        "child": "GButton / GAvatar / GIcon / Control",
        "example": "<template #default><GButton icon=\"bell\">通知中心</GButton></template>"
      },
      {
        "name": "content",
        "desc": "自定义角标内部内容插槽（替代纯数字）",
        "child": "GIcon / Label",
        "example": "<template #content><GIcon name=\"fire\" style=\"color:yellow;\" /></template>"
      }
    ]
  },
  "avatar": {
    "title": "Avatar 头像 (GAvatar)",
    "desc": "用来代表用户或事物，支持图片、图标或字符展示。",
    "demos": [
      {
        "title": "1. 基础尺寸与形状 (Sizes: Small / Default / Large & Circle / Square)",
        "render": "<div style=\"display:flex; gap:20px; align-items:center; flex-wrap:wrap;\"><div style=\"width:32px; height:32px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; font-weight:600;\">S</div><div style=\"width:40px; height:40px; border-radius:50%; background:var(--success); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:600;\">M</div><div style=\"width:54px; height:54px; border-radius:50%; background:var(--warning); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:18px; font-weight:600;\">L</div><div style=\"width:40px; height:40px; border-radius:8px; background:#8da5f5; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:600;\">方</div></div>",
        "code": "# GDScript: 基础头像\nvar avatar = GAvatar.new()\navatar.size = GAvatar.Size.MEDIUM"
      },
      {
        "title": "2. 图标与文字头像 (Icon & Text Avatars)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:40px; height:40px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:inline-flex; align-items:center; justify-content:center; color:var(--primary); font-size:18px;\"><i class=\"fa-solid fa-user\"></i></div><div style=\"width:40px; height:40px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:13px; font-weight:600;\">亚瑟</div></div>",
        "code": "# GDScript: 图标/文字头像\nvar icon_avatar = GAvatar.new_icon(\"user\")"
      },
      {
        "title": "3. 图片加载失败回退 (Image Fallback)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center;\"><div style=\"width:40px; height:40px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:inline-flex; align-items:center; justify-content:center; color:var(--text-secondary); font-size:14px;\"><i class=\"fa-solid fa-image\"></i></div><span style=\"font-size:12px; color:var(--text-secondary);\">当图片资源损坏或不存在时，自动回退到 fallback 占位图标</span></div>",
        "code": "# GDScript: 图片回退\navatar.fallback_icon = \"user\""
      },
      {
        "title": "4. 头像组叠放 (AvatarGroup Stack)",
        "render": "<div style=\"display:flex; align-items:center;\"><div style=\"width:36px; height:36px; border-radius:50%; background:#409eff; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); z-index:4;\">勇</div><div style=\"width:36px; height:36px; border-radius:50%; background:#67c23a; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); margin-left:-10px; z-index:3;\">法</div><div style=\"width:36px; height:36px; border-radius:50%; background:#e6a23c; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:12px; border:2px solid var(--bg-card); margin-left:-10px; z-index:2;\">道</div></div>",
        "code": "# GDScript: 头像组\nvar group = GAvatarGroup.new()"
      },
      {
        "title": "5. 结合徽标与在线状态指示 (Online Status Badge)",
        "render": "<div style=\"display:flex; gap:20px; align-items:center;\"><div style=\"position:relative; display:inline-block;\"><div style=\"width:42px; height:42px; border-radius:50%; background:var(--primary); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:600;\">队长</div><span style=\"position:absolute; bottom:0; right:0; width:10px; height:10px; background:var(--success); border-radius:50%; border:2px solid var(--bg-card);\" title=\"在线\"></span></div></div>",
        "code": "# GDScript: 在线状态\navatar.status = GAvatar.Status.ONLINE"
      },
      {
        "title": "6. 游戏 VIP 传说光环头像框 (Game VIP Avatar Frame)",
        "render": "<div style=\"display:flex; gap:24px; align-items:center;\"><div style=\"position:relative; display:inline-block; padding:4px; border-radius:50%; background:linear-gradient(135deg, #ffd700, #ff8c00); box-shadow:0 0 12px rgba(255,215,0,0.6);\"><div style=\"width:46px; height:46px; border-radius:50%; background:#1e1b4b; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:18px;\">👑</div><span style=\"position:absolute; top:-6px; right:-4px; background:#ef4444; color:#fff; font-size:9px; font-weight:800; padding:1px 4px; border-radius:4px;\">VIP8</span></div></div>",
        "code": "# GDScript: VIP 头像框\navatar.frame_texture = preload(\"res://assets/frames/vip_gold.png\")"
      }
    ],
    "props": [
      {
        "name": "avatar_size",
        "type": "float",
        "default": "40.0",
        "desc": "头像尺寸 (像素)"
      },
      {
        "name": "shape",
        "type": "enum",
        "default": "CIRCLE",
        "desc": "形状：CIRCLE (圆形), SQUARE (圆角矩形)"
      },
      {
        "name": "text",
        "type": "String",
        "default": "\"U\"",
        "desc": "无图片时的文字首字母"
      },
      {
        "name": "texture",
        "type": "Texture2D",
        "default": "null",
        "desc": "头像图片纹理"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "自定义头像内部文字或自定义图像节点插槽",
        "child": "Label / TextureRect",
        "example": "<template #default><span>K</span></template>"
      },
      {
        "name": "badge",
        "desc": "头像角标（如在线状态小绿点、等级徽章）插槽",
        "child": "GBadge / Control",
        "example": "<template #badge><span class=\"online-status-dot\"></span></template>"
      }
    ]
  },
  "progress": {
    "title": "Progress 进度条 (GProgress)",
    "desc": "用于展示操作进度，告知用户当前状态和预期。支持线性条状与圆形环状。",
    "demos": [
      {
        "title": "1. 基础直线进度条 (Basic Line Progress)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--primary); width:70%; height:100%;\"></div></div><div style=\"display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary);\"><span>主线任务下载中</span><span>70%</span></div></div>",
        "code": "# GDScript: 基础进度条\nvar prog = GProgress.new()\nprog.percentage = 70.0\nadd_child(prog)"
      },
      {
        "title": "2. 百分比内显与粗细定制 (Text Inside & Stroke Width)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:20px; border-radius:10px; overflow:hidden; position:relative;\"><div style=\"background:var(--success); width:85%; height:100%; display:flex; align-items:center; justify-content:flex-end; padding-right:8px; color:#fff; font-size:11px; font-weight:600;\">85%</div></div></div>",
        "code": "# GDScript: 内显文字\nprog.text_inside = true\nprog.stroke_width = 20.0"
      },
      {
        "title": "3. 状态主题色与渐变配置 (Theme Status & Gradients)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:400px;\"><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:var(--success); width:100%; height:100%;\"></div></div><div style=\"background:var(--bg-surface); height:8px; border-radius:4px; overflow:hidden;\"><div style=\"background:linear-gradient(90deg, #3b82f6, #a855f7); width:90%; height:100%;\"></div></div></div>",
        "code": "# GDScript: 渐变色\nprog.gradient = Gradient.new()"
      },
      {
        "title": "4. 环形进度条 (Circle Progress)",
        "render": "<div style=\"display:flex; gap:28px; align-items:center;\"><div style=\"width:70px; height:70px; border-radius:50%; border:6px solid var(--bg-surface); border-top-color:var(--primary); border-right-color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--primary);\">60%</div></div>",
        "code": "# GDScript: 环形进度\nprog.type = GProgress.Type.CIRCLE"
      },
      {
        "title": "5. 仪表盘进度条 (Dashboard Progress)",
        "render": "<div style=\"display:flex; align-items:center; gap:20px;\"><div style=\"width:80px; height:45px; border:6px solid var(--bg-surface); border-bottom:none; border-top-left-radius:50px; border-top-right-radius:50px; border-top-color:var(--warning); display:flex; align-items:flex-end; justify-content:center; font-size:13px; font-weight:700; color:var(--warning);\">75%</div><span style=\"font-size:12px; color:var(--text-secondary);\">引擎负荷率</span></div>",
        "code": "# GDScript: 仪表盘\nprog.type = GProgress.Type.DASHBOARD"
      },
      {
        "title": "6. 游戏 RPG 复合状态条 (Game HP / MP / EXP Bars)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:8px; max-width:360px; background:rgba(0,0,0,0.3); padding:12px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#ef4444; font-weight:700;\">HP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#ef4444; width:82%; height:100%;\"></div></div><span style=\"font-size:11px; color:#ef4444;\">4,100 / 5,000</span></div><div style=\"display:flex; align-items:center; gap:8px; font-size:12px;\"><span style=\"width:30px; color:#3b82f6; font-weight:700;\">MP</span><div style=\"flex:1; background:#333; height:12px; border-radius:6px; overflow:hidden;\"><div style=\"background:#3b82f6; width:45%; height:100%;\"></div></div><span style=\"font-size:11px; color:#3b82f6;\">900 / 2,000</span></div></div>",
        "code": "# GDScript: 游戏血条/蓝条\nvar hp_bar = GProgress.new_game_bar(\"HP\", 4100, 5000, Color(\"#ef4444\"))"
      }
    ],
    "props": [
      {
        "name": "percentage",
        "type": "float",
        "default": "0.0",
        "desc": "进度百分比 (0~100)"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "LINE",
        "desc": "类型：LINE (线性), CIRCLE (环形)"
      },
      {
        "name": "status",
        "type": "enum",
        "default": "PRIMARY",
        "desc": "状态色彩"
      },
      {
        "name": "stroke_width",
        "type": "float",
        "default": "6.0",
        "desc": "进度条线条粗细"
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "set_percentage(val: float)",
        "desc": "平滑更新进度条数值",
        "params": "(val: float) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "自定义进度条内部/右侧进度文字渲染插槽（透传 { percentage }）",
        "child": "Label / GText",
        "example": "<template #default=\"{ percentage }\"><span>{{ percentage }}% 已下载</span></template>"
      }
    ]
  },
  "tabs": {
    "title": "Tabs 标签页 (GTabs)",
    "desc": "分隔内容上有关联但属于不同类别的数据集合。深度还原 Element Plus、Naive UI 与 Ant Design Tabs 规范，支持基础划线、卡片化、边框卡片、自定义图标、动态增减标签、自定义触发器与四方位位置设置。",
    "demos": [
      {
        "title": "1. 基础选项卡 (Basic Tabs)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; border-bottom:1px solid var(--border-base); margin-bottom:12px;\"><button class=\"icon-category-btn active\" style=\"border-radius:0; border-bottom:2px solid var(--primary);\">角色属性</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">技能加点</button><button class=\"icon-category-btn\" style=\"border-radius:0;\">天赋树</button></div><div style=\"font-size:13px; color:var(--text-secondary); line-height:1.6;\">力量: 142 | 敏捷: 98 | 智力: 180</div></div>",
        "code": "# GDScript: 基础选项卡\nvar tabs = GTabs.new()\ntabs.add_tab(\"角色属性\", character_panel)"
      },
      {
        "title": "2. 卡片化样式 (Card Style: type=\"card\")",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;\"><div style=\"display:flex; gap:4px; margin-bottom:12px;\"><button class=\"g-btn g-btn-primary\" style=\"font-size:12px; padding:4px 12px;\">主线任务 (4)</button><button class=\"g-btn g-btn-default\" style=\"font-size:12px; padding:4px 12px;\">支线悬赏 (12)</button></div><div style=\"font-size:13px; color:var(--text-secondary);\">当前正在进行：第 7 章 · 迷雾森林的低语</div></div>",
        "code": "# GDScript: 卡片标签页\ntabs.tab_type = GTabs.Type.CARD"
      },
      {
        "title": "3. 标签位置控制 (Position: Top / Bottom / Left / Right)",
        "render": "<div style=\"display:flex; border:1px solid var(--border-base); border-radius:var(--radius); max-width:420px; height:100px;\"><div style=\"width:100px; border-right:1px solid var(--border-base); padding:8px; display:flex; flex-direction:column; gap:4px;\"><button class=\"icon-category-btn active\" style=\"text-align:left; font-size:11px;\">常规设置</button><button class=\"icon-category-btn\" style=\"text-align:left; font-size:11px;\">画面画质</button></div><div style=\"flex:1; padding:12px; font-size:12px; color:var(--text-secondary);\">侧边竖向标签页内容区域</div></div>",
        "code": "# GDScript: 垂直左侧标签\ntabs.tab_position = GTabs.Position.LEFT"
      },
      {
        "title": "4. 自定义图标与徽标插槽 (Custom Icon & Badge Slot)",
        "render": "<div style=\"display:flex; gap:6px;\"><button class=\"icon-category-btn active\"><i class=\"fa-solid fa-envelope\"></i> 邮件 <span class=\"g-badge\" style=\"background:var(--danger); color:#fff; font-size:9px; padding:0 4px; border-radius:8px;\">3</span></button><button class=\"icon-category-btn\"><i class=\"fa-solid fa-users\"></i> 好友</button></div>",
        "code": "# GDScript: 图标徽标标签\ntabs.set_tab_icon(0, \"envelope\")"
      },
      {
        "title": "5. 动态可关闭与新增标签 (Editable & Closable Tabs)",
        "render": "<div style=\"display:flex; gap:6px; align-items:center;\"><span class=\"g-tag g-tag-primary\" style=\"display:inline-flex; align-items:center; gap:6px; font-size:12px;\">关卡 1-1 <i class=\"fa-solid fa-xmark\" style=\"cursor:pointer;\" onclick=\"this.parentElement.remove()\"></i></span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">+ 开启新关卡</button></div>",
        "code": "# GDScript: 可编辑标签\ntabs.editable = true"
      },
      {
        "title": "6. 游戏商城分类切换实战 (Game Store Tabs)",
        "render": "<div style=\"max-width:440px; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px;\"><div style=\"display:flex; gap:8px; margin-bottom:12px;\"><button class=\"icon-category-btn active\">⚔️ 武器装备</button><button class=\"icon-category-btn\">🧪 炼金药水</button></div><div style=\"font-size:12px; color:var(--text-secondary);\">展示对应商店分类网格</div></div>",
        "code": "# GDScript: 商店分类\nvar store_tabs = GTabs.new()"
      }
    ],
    "props": [
      {
        "name": "model-value / current_tab",
        "type": "string / number",
        "default": "0",
        "desc": "绑定值，选中选项卡的 name 或索引，默认是第一个 tab"
      },
      {
        "name": "type",
        "type": "enum",
        "default": "'' (LINE)",
        "desc": "风格类型：LINE, CARD, BORDER_CARD, SEGMENT"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否可关闭"
      },
      {
        "name": "addable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否可增加"
      },
      {
        "name": "editable",
        "type": "boolean",
        "default": "false",
        "desc": "标签是否同时可增加和关闭"
      },
      {
        "name": "tab-position",
        "type": "enum",
        "default": "top",
        "desc": "选项卡所在位置：top, bottom, left, right"
      },
      {
        "name": "stretch",
        "type": "boolean",
        "default": "false",
        "desc": "标签的宽度是否自撑开"
      },
      {
        "name": "before-leave",
        "type": "Callable / Function",
        "default": "() => true",
        "desc": "切换标签之前的钩子函数，若返回 false 则阻止切换"
      }
    ],
    "events": [
      {
        "name": "tab_clicked(index, name)",
        "desc": "点击选中某个选项卡时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_changed(index, name)",
        "desc": "当前激活选项卡发生改变时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_added(index, name)",
        "desc": "动态添加新选项卡时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_removed(index, name)",
        "desc": "选项卡被移除销毁时触发",
        "params": "(index: int, name: String)"
      },
      {
        "name": "tab_close_requested(index, name)",
        "desc": "用户点击关闭叉号时触发 (可在此拦截或弹窗二次确认)",
        "params": "(index: int, name: String)"
      }
    ],
    "methods": [
      {
        "name": "add_tab(name, panel, closable=false, icon=null)",
        "desc": "动态追加一个选项卡及关联内容面板",
        "params": "(name: String, panel: Control, closable: bool, icon: Texture2D) -> int"
      },
      {
        "name": "add_tabs(tab_list: Array[Dictionary])",
        "desc": "批量追加一组选项卡 [{\"name\": \"\", \"panel\": Control, \"closable\": false}]",
        "params": "(tab_list: Array[Dictionary]) -> void"
      },
      {
        "name": "insert_tab(index, name, panel, closable=false, icon=null)",
        "desc": "在指定索引位置插入一个选项卡",
        "params": "(index: int, name: String, panel: Control, closable: bool, icon: Texture2D) -> void"
      },
      {
        "name": "remove_tab(index_or_name)",
        "desc": "根据索引或标题名称移除指定选项卡",
        "params": "(index_or_name: Variant) -> void"
      },
      {
        "name": "clear_tabs()",
        "desc": "清空并销毁所有选项卡及关联面板",
        "params": "() -> void"
      },
      {
        "name": "get_tab_count()",
        "desc": "获取当前选项卡总数量",
        "params": "() -> int"
      },
      {
        "name": "get_tab_name(index)",
        "desc": "获取指定索引的选项卡标题文本",
        "params": "(index: int) -> String"
      },
      {
        "name": "set_tab_title(index, new_title)",
        "desc": "动态修改指定选项卡的标题文本",
        "params": "(index: int, new_title: String) -> void"
      },
      {
        "name": "get_tab_panel(index)",
        "desc": "获取指定索引绑定的内容面板 Control 节点",
        "params": "(index: int) -> Control"
      },
      {
        "name": "set_tab_disabled(index, is_disabled)",
        "desc": "设置指定选项卡是否禁用点击切换",
        "params": "(index: int, is_disabled: bool) -> void"
      },
      {
        "name": "is_tab_disabled(index)",
        "desc": "查询指定选项卡当前是否处于禁用状态",
        "params": "(index: int) -> bool"
      },
      {
        "name": "set_tab_icon(index, icon)",
        "desc": "为指定选项卡动态设置图标纹理",
        "params": "(index: int, icon: Texture2D) -> void"
      },
      {
        "name": "find_tab_by_name(name)",
        "desc": "根据标题名称反查选项卡的索引位置 (-1 为未找到)",
        "params": "(name: String) -> int"
      },
      {
        "name": "next_tab()",
        "desc": "程序化切换至下一个标签页 (循环)",
        "params": "() -> void"
      },
      {
        "name": "prev_tab()",
        "desc": "程序化切换至上一个标签页 (循环)",
        "params": "() -> void"
      },
      {
        "name": "set_before_leave(callback)",
        "desc": "设置标签切换拦截钩子函数 Callable(cur, next) -> bool",
        "params": "(callback: Callable) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "标签页内容面板插槽（包含所有 Tab 面板）",
        "child": "Array[Control]",
        "example": "<template #default><GTabPane label=\"背包\">...</GTabPane></template>"
      },
      {
        "name": "tab",
        "desc": "自定义 Tab 头部标签按钮插槽（透传 { tab_name, active, index }）",
        "child": "HBoxContainer / GIcon / GText",
        "example": "<template #tab=\"{ name }\"><GIcon name=\"box\" /> <span>{{ name }}</span></template>"
      },
      {
        "name": "prefix",
        "desc": "Tab 栏最左侧附加控件插槽",
        "child": "Control / GIcon",
        "example": "<template #prefix><GIcon name=\"bars\" /></template>"
      },
      {
        "name": "suffix",
        "desc": "Tab 栏最右侧附加操作按钮插槽（如“+ 新增Tab”）",
        "child": "GButton / GSpace",
        "example": "<template #suffix><GButton icon=\"plus\" size=\"small\" /></template>"
      }
    ],
    "paneProps": [
      {
        "name": "label",
        "type": "string",
        "default": "''",
        "desc": "选项卡标题文字"
      },
      {
        "name": "name",
        "type": "string / number",
        "default": "''",
        "desc": "与选项卡绑定值 value 对应的标识符"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "desc": "是否禁用该标签页"
      },
      {
        "name": "closable",
        "type": "boolean",
        "default": "false",
        "desc": "该标签是否可单独关闭"
      }
    ]
  },
  "collapse": {
    "title": "Collapse 折叠面板 (GCollapse)",
    "desc": "通过折叠面板收纳内容区域。具备点击平滑展开/折叠动效与箭头旋转。",
    "demos": [
      {
        "title": "1. 基础折叠面板 (Basic Collapse)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;\"><div style=\"padding:10px 14px; background:var(--bg-surface); cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:600;\" onclick=\"const el = this.nextElementSibling; el.style.display = el.style.display==='none'?'block':'none';\"><span>🛡️ 防御机制与护甲计算公式</span><i class=\"fa-solid fa-chevron-down\"></i></div><div style=\"padding:12px 14px; font-size:12px; color:var(--text-secondary); line-height:1.6; border-top:1px solid var(--border-base);\">有效承伤 = 原始伤害 × [ 100 / (100 + 护甲值) ]。护甲越高，边际减伤收益衰减。</div></div>",
        "code": "# GDScript: 基础折叠\nvar collapse = GCollapse.new()\ncollapse.add_item(\"🛡️ 防御机制\", armor_info_node)"
      },
      {
        "title": "2. 手风琴互斥模式 (Accordion Mode)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; font-size:13px;\"><div style=\"padding:10px 14px; background:var(--bg-surface); border-bottom:1px solid var(--border-base); font-weight:600;\">第一章：王城的沦陷 (展开中)</div><div style=\"padding:10px 14px; font-size:12px; color:var(--text-secondary); border-bottom:1px solid var(--border-base);\">在战火中守卫最后的圣骑士军团...</div><div style=\"padding:10px 14px; background:var(--bg-surface); font-weight:600;\">第二章：深渊的回响 (已折叠)</div></div>",
        "code": "# GDScript: 手风琴\ncollapse.accordion = true"
      },
      {
        "title": "3. 自定义头部与图标插槽 (Custom Header & Icon Slot)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden;\"><div style=\"padding:10px 14px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; font-size:13px;\"><div style=\"display:flex; align-items:center; gap:8px;\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"color:#a855f7;\"></i><span style=\"font-weight:600;\">终极禁咒·陨石术</span><span class=\"g-tag g-tag-danger\" style=\"font-size:10px; padding:1px 4px;\">Lv.MAX</span></div><i class=\"fa-solid fa-angle-right\"></i></div></div>",
        "code": "# GDScript: 自定义头部\nitem.header.icon = \"wand-magic-sparkles\""
      },
      {
        "title": "4. 禁用指定面板项 (Disabled Item)",
        "render": "<div style=\"max-width:420px; border:1px solid var(--border-base); border-radius:var(--radius); overflow:hidden; opacity:0.5;\"><div style=\"padding:10px 14px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; font-size:13px; cursor:not-allowed;\"><span>🔒 噩梦难度通关日志 (通关地狱难度后解锁)</span><i class=\"fa-solid fa-lock\"></i></div></div>",
        "code": "# GDScript: 禁用面板\ncollapse.set_item_disabled(2, true)"
      },
      {
        "title": "5. 极简无边框折叠 (Borderless Collapse)",
        "render": "<div style=\"max-width:420px; font-size:13px;\"><div style=\"padding:8px 0; border-bottom:1px solid var(--border-base); font-weight:600; display:flex; justify-content:space-between;\"><span>查看掉落概率公示</span><i class=\"fa-solid fa-chevron-down\" style=\"font-size:12px;\"></i></div></div>",
        "code": "# GDScript: 无边框\ncollapse.borderless = true"
      },
      {
        "title": "6. 游戏 RPG 任务详情追踪日志 (Quest Log Collapse)",
        "render": "<div style=\"max-width:420px; border:1px solid #67c23a; border-radius:var(--radius); overflow:hidden; background:rgba(103,194,58,0.05);\"><div style=\"padding:10px 14px; font-size:13px; font-weight:700; color:var(--success); display:flex; justify-content:space-between;\"><span>✅ [主线] 寻找失落的古代符文</span><span>100%</span></div><div style=\"padding:10px 14px; font-size:12px; color:var(--text-secondary); line-height:1.6; border-top:1px solid rgba(103,194,58,0.2);\">已在遗忘神殿深处找到远古符文石。</div></div>",
        "code": "# GDScript: 任务详情折叠\nvar quest_collapse = GCollapse.new()"
      }
    ],
    "props": [
      {
        "name": "title",
        "type": "String",
        "default": "\"Collapse Title\"",
        "desc": "标题"
      },
      {
        "name": "is_open",
        "type": "boolean",
        "default": "false",
        "desc": "是否展开"
      },
      {
        "name": "accordion",
        "type": "boolean",
        "default": "false",
        "desc": "是否手风琴互斥模式"
      }
    ],
    "events": [
      {
        "name": "toggled(is_open)",
        "desc": "展开/收起状态改变时触发",
        "params": "(is_open: bool)"
      }
    ],
    "methods": [
      {
        "name": "toggle()",
        "desc": "切换展开与收起状态",
        "params": "() -> void"
      },
      {
        "name": "set_open(open_state: bool)",
        "desc": "显式设置面板展开或收起",
        "params": "(open_state: bool) -> void"
      }
    ],
    "slots": [
      {
        "name": "default",
        "desc": "折叠面板展开后的主体内容插槽",
        "child": "Control / VBoxContainer",
        "example": "<template #default><div>画质等级: 超高 / 60FPS / 动态光影</div></template>"
      },
      {
        "name": "title",
        "desc": "自定义折叠面板标题栏插槽（透传 { is_expanded }）",
        "child": "HBoxContainer / GText",
        "example": "<template #title=\"{ is_expanded }\"><span>高级图形渲染设置</span></template>"
      },
      {
        "name": "extra",
        "desc": "折叠面板标题栏右侧操作项插槽",
        "child": "GButton / GTag",
        "example": "<template #extra><GTag type=\"success\">推荐配置</GTag></template>"
      },
      {
        "name": "arrow",
        "desc": "自定义展开/折叠箭头指示图标插槽（透传 { is_expanded }）",
        "child": "GIcon / TextureRect",
        "example": "<template #arrow=\"{ is_expanded }\"><GIcon :name=\"is_expanded ? 'angle-up' : 'angle-down'\" /></template>"
      }
    ]
  },
  "steps": {
    "title": "Steps 步骤条 (GSteps)",
    "desc": "引导用户按照流程完成任务的分步导航条。支持点击下一步/上一步动态驱动连线与状态点亮。",
    "demos": [
      {
        "title": "1. 基础横向步骤条 (Basic Horizontal Steps)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">1</span><span>创建角色</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary); font-weight:600;\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center;\">2</span><span>分配属性</span></div><div style=\"flex:1; height:2px; background:var(--border-base); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--text-secondary);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--bg-surface); border:1px solid var(--border-base); display:flex; align-items:center; justify-content:center;\">3</span><span>进入世界</span></div></div>",
        "code": "# GDScript: 基础步骤条\nvar steps = GSteps.new()\nsteps.active = 1\nsteps.add_step(\"创建角色\")\nsteps.add_step(\"分配属性\")"
      },
      {
        "title": "2. 含错误状态步骤条 (Error Step Status)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:440px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-check\"></i></span><span>实名认证</span></div><div style=\"flex:1; height:2px; background:var(--danger); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--danger);\"><span style=\"width:24px; height:24px; border-radius:50%; background:var(--danger); color:#fff; display:flex; align-items:center; justify-content:center;\"><i class=\"fa-solid fa-xmark\"></i></span><span>充值失败</span></div></div>",
        "code": "# GDScript: 错误状态\nsteps.set_step_status(1, GSteps.Status.ERROR)"
      },
      {
        "title": "3. 垂直步骤条 (Vertical Steps)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px; max-width:300px; font-size:12px;\"><div style=\"display:flex; gap:12px;\"><span style=\"width:22px; height:22px; border-radius:50%; background:var(--success); color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px;\"><i class=\"fa-solid fa-check\"></i></span><div><div style=\"font-weight:600; color:var(--text-primary);\">第 1 章：新手营地</div><div style=\"color:var(--text-secondary); font-size:11px;\">已通过考核</div></div></div></div>",
        "code": "# GDScript: 垂直步骤\nsteps.direction = GSteps.Direction.VERTICAL"
      },
      {
        "title": "4. 点状极简步骤条 (Dot Steps)",
        "render": "<div style=\"display:flex; align-items:center; gap:8px; max-width:300px;\"><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--primary);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--primary);\"></span><div style=\"flex:1; height:2px; background:var(--border-base);\"></div><span style=\"width:10px; height:10px; border-radius:50%; background:var(--border-base);\"></span></div>",
        "code": "# GDScript: 点状步骤\nsteps.is_dot = true"
      },
      {
        "title": "5. 自定义图标步骤条 (Custom Icon Steps)",
        "render": "<div style=\"display:flex; justify-content:space-between; align-items:center; max-width:360px; font-size:12px;\"><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--success);\"><i class=\"fa-solid fa-user-shield\" style=\"font-size:18px;\"></i><span>创建档案</span></div><div style=\"flex:1; height:2px; background:var(--primary); margin:0 8px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--primary);\"><i class=\"fa-solid fa-wand-magic-sparkles\" style=\"font-size:18px;\"></i><span>选择专精</span></div></div>",
        "code": "# GDScript: 图标步骤\nsteps.set_step_icon(0, \"user-shield\")"
      },
      {
        "title": "6. 游戏剧情章节通关进度树 (Game Story Quest Steps)",
        "render": "<div style=\"max-width:440px; background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-base);\"><div style=\"font-weight:700; font-size:13px; margin-bottom:10px; color:#ffd04b;\">👑 王国救赎主线流程</div><div style=\"display:flex; justify-content:space-between; font-size:11px;\"><span style=\"color:var(--success);\">① 召集勇者 ✅</span><span style=\"color:var(--success);\">② 锻造圣剑 ✅</span><span style=\"color:var(--primary); font-weight:700;\">③ 讨伐恶龙 ⚔️</span><span style=\"color:var(--text-secondary);\">④ 加冕登基</span></div></div>",
        "code": "# GDScript: 游戏剧情步骤\nvar quest_steps = GSteps.new_story_flow(chapter_data)"
      }
    ],
    "props": [
      {
        "name": "steps",
        "type": "Array[String]",
        "default": "[]",
        "desc": "步骤名称列表"
      },
      {
        "name": "current_step / active",
        "type": "int",
        "default": "0",
        "desc": "当前激活步骤索引 (从 0 开始)"
      },
      {
        "name": "direction",
        "type": "enum",
        "default": "HORIZONTAL",
        "desc": "显示方向：HORIZONTAL, VERTICAL"
      },
      {
        "name": "finish_status",
        "type": "enum",
        "default": "SUCCESS",
        "desc": "已完成步骤的状态类型"
      }
    ],
    "events": [
      {
        "name": "step_changed(current_step)",
        "desc": "当前步骤改变时触发",
        "params": "(current_step: int)"
      }
    ],
    "methods": [
      {
        "name": "add_step(title: String)",
        "desc": "动态追加单个步骤",
        "params": "(title: String) -> void"
      },
      {
        "name": "add_steps(step_list: Array)",
        "desc": "批量设置/追加步骤列表 [\"步骤1\", \"步骤2\"]",
        "params": "(step_list: Array) -> void"
      },
      {
        "name": "next()",
        "desc": "前进至下一步",
        "params": "() -> void"
      },
      {
        "name": "prev()",
        "desc": "返回上一步",
        "params": "() -> void"
      },
      {
        "name": "set_step(index: int)",
        "desc": "直接跳转到指定步骤",
        "params": "(index: int) -> void"
      }
    ],
    "slots": [
      {
        "name": "icon",
        "desc": "自定义步骤节点图标插槽（透传 { index, status }）",
        "child": "GIcon / TextureRect",
        "example": "<template #icon=\"{ index }\"><GIcon name=\"circle-check\" /></template>"
      },
      {
        "name": "title",
        "desc": "自定义步骤标题插槽（透传 { index, title }）",
        "child": "GText / Label",
        "example": "<template #title=\"{ index, title }\"><span>步骤 {{ index + 1 }}: {{ title }}</span></template>"
      },
      {
        "name": "description",
        "desc": "自定义步骤详细描述插槽（透传 { index, desc }）",
        "child": "Label / Control",
        "example": "<template #description=\"{ desc }\"><small>{{ desc }}</small></template>"
      }
    ]
  },
  "space": {
    "title": "Space 间距布局 (GSpace)",
    "desc": "设置组件之间的间距。避免组件紧贴在一起，提升页面结构的规整度。支持水平/垂直方向与自动换行 (Wrap)。",
    "demos": [
      {
        "title": "1. 基础水平间距 (Basic Horizontal Space)",
        "render": "<div style=\"display:flex; gap:12px; align-items:center; flex-wrap:wrap;\"><button class=\"g-btn g-btn-primary\">按钮 1</button><button class=\"g-btn g-btn-success\">按钮 2</button><button class=\"g-btn g-btn-warning\">按钮 3</button></div>",
        "code": "# GDScript: 基础水平间距\nvar space = GSpace.new()\nspace.add_child(btn1)\nspace.add_child(btn2)"
      },
      {
        "title": "2. 垂直排列间距 (Vertical Space)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:10px; max-width:240px;\"><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 1</div><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 2</div><div class=\"g-card\" style=\"padding:8px 12px; font-size:12px;\">背包格 3</div></div>",
        "code": "# GDScript: 垂直间距\nspace.direction = GSpace.Direction.VERTICAL\nspace.size = 10.0"
      },
      {
        "title": "3. 间距尺寸预设 (Sizes: Small / Middle / Large)",
        "render": "<div style=\"display:flex; flex-direction:column; gap:12px;\"><div style=\"display:flex; gap:8px; align-items:center;\"><span style=\"font-size:11px; width:60px;\">Small(8px):</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">A</button><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">B</button></div><div style=\"display:flex; gap:24px; align-items:center;\"><span style=\"font-size:11px; width:60px;\">Large(24px):</span><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">A</button><button class=\"g-btn g-btn-default\" style=\"padding:2px 8px; font-size:11px;\">B</button></div></div>",
        "code": "# GDScript: 间距预设\nspace.size = GSpace.Size.LARGE"
      },
      {
        "title": "4. 垂直居中对齐方式 (Alignment: Center)",
        "render": "<div style=\"display:flex; gap:16px; align-items:center; background:var(--bg-surface); padding:10px; border-radius:6px;\"><button class=\"g-btn g-btn-primary\" style=\"height:32px;\">标准按钮</button><span style=\"font-size:16px; font-weight:700;\">大号文字</span><span class=\"g-tag g-tag-success\">居中对齐</span></div>",
        "code": "# GDScript: 对齐方式\nspace.alignment = GSpace.Alignment.CENTER"
      },
      {
        "title": "5. 带分隔符间距 (Space with Divider)",
        "render": "<div style=\"display:flex; gap:10px; align-items:center; font-size:13px;\"><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">用户协议</a><span style=\"color:var(--border-base);\">|</span><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">隐私政策</a><span style=\"color:var(--border-base);\">|</span><a href=\"javascript:void(0)\" style=\"color:var(--primary);\">联系客服</a></div>",
        "code": "# GDScript: 带分隔符\nspace.spacer = GDivider.new_vertical()"
      },
      {
        "title": "6. 游戏技能快捷栏网格间距排版 (Game Skill Bar Layout)",
        "render": "<div style=\"display:flex; gap:10px; align-items:center; background:rgba(0,0,0,0.4); padding:10px 14px; border-radius:10px; border:1px solid var(--border-base);\"><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#38bdf8; font-size:20px;\">⚔️</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#f87171; font-size:20px;\">🔥</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#c084fc; font-size:20px;\">⚡</div><div style=\"width:44px; height:44px; background:#1e293b; border:1px solid #475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-size:20px;\">🧪</div></div>",
        "code": "# GDScript: 技能栏排版\nvar skill_space = GSpace.new_horizontal(10.0)"
      }
    ],
    "props": [
      {
        "name": "gap",
        "type": "float",
        "default": "12.0",
        "desc": "子节点间距 (像素)"
      },
      {
        "name": "wrap",
        "type": "boolean",
        "default": "true",
        "desc": "超出容器宽度时是否自动换行"
      },
      {
        "name": "direction",
        "type": "enum",
        "default": "HORIZONTAL",
        "desc": "排列方向：HORIZONTAL, VERTICAL"
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "desc": "间距容器内所有自动排列的子节点插槽",
        "child": "Array[Control]",
        "example": "<template #default><GButton>选项A</GButton><GButton>选项B</GButton></template>"
      },
      {
        "name": "split",
        "desc": "子元素之间的自定义分隔符插槽",
        "child": "GDivider / Control",
        "example": "<template #split><GDivider vertical /></template>"
      }
    ]
  }
});
