// =========================================================================
// Gotod Components UI - Component: avatar
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['avatar'] = {
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
};
