// =========================================================================
// Gotod Components UI - Component: shader-studio (GShaderStudio)
// GPU 实时着色器工坊 & 溶解/流光/扫描线/冲击波/毛玻璃背景模糊
// =========================================================================
window.COMPONENT_CATALOG = window.COMPONENT_CATALOG || {};
window.COMPONENT_CATALOG['shader-studio'] = {
  "title": "GPU 着色器 Shader 工坊 (GShaderStudio)",
  "desc": "可视化调节全屏后处理、消融溶解、彩虹流光、全息扫描线、冲击波扭曲与动态毛玻璃背景模糊滤镜。实时渲染预览并一键生成 Godot 4 标准 canvas_item Shader 源代码与 ShaderMaterial 参数配置。",
  "demos": [
    {
      "title": "1. 实时 Shader 特效与参数渲染调节 (Live GPU Shader Simulator)",
      "render": `
        <div style="max-width:680px; background:var(--bg-surface); border:1px solid var(--border-base); border-radius:8px; padding:16px;">
          <!-- Shader Preset Switcher -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border-base);">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">着色器类型：</span>
              <button id="shaderBtn_dissolve" class="g-btn g-btn-primary" style="font-size:11px; padding:3px 10px;" onclick="window.switchShaderMode('dissolve')">🔥 消融溶解 (Dissolve)</button>
              <button id="shaderBtn_hologram" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchShaderMode('hologram')">🌈 彩虹全息 (Hologram)</button>
              <button id="shaderBtn_scanline" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchShaderMode('scanline')">📺 全息扫描 (Scanline)</button>
              <button id="shaderBtn_frosted" class="g-btn g-btn-default" style="font-size:11px; padding:3px 10px;" onclick="window.switchShaderMode('frosted')">🫧 毛玻璃模糊 (Glass)</button>
            </div>
            <button class="g-btn g-btn-success" style="font-size:11px; padding:3px 12px; font-weight:700;" onclick="window.copyGodotShaderCode()">
              📋 复制 Shader 代码
            </button>
          </div>

          <!-- Live Shader Visual Preview Box -->
          <div style="position:relative; width:100%; height:220px; background:radial-gradient(circle at center, #182234 0%, #080d1a 100%); border:1px solid var(--border-base); border-radius:6px; overflow:hidden; margin-bottom:14px; display:flex; align-items:center; justify-content:center;">
            <!-- Background Image Behind Shader -->
            <div style="position:absolute; inset:0; background:linear-gradient(45deg, #1e1b4b 25%, transparent 25%), linear-gradient(-45deg, #1e1b4b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e1b4b 75%), linear-gradient(-45deg, transparent 75%, #1e1b4b 75%); background-size:24px 24px; opacity:0.3; pointer-events:none;"></div>
            
            <!-- Target Card/Object with Shader Applied -->
            <div id="shaderPreviewTarget" style="width:280px; padding:18px; border-radius:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.25); backdrop-filter:blur(8px); display:flex; flex-direction:column; align-items:center; gap:10px; box-shadow:0 8px 32px rgba(0,0,0,0.4); position:relative; overflow:hidden; transition:all 0.3s ease;">
              <!-- Overlay Scanline / Dissolve Effect Container -->
              <div id="shaderEffectOverlay" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>
              
              <div style="font-size:36px; z-index:3;">🔮</div>
              <div style="font-size:14px; font-weight:800; color:#fff; z-index:3;">远古魔法秘典 (Artifact)</div>
              <div style="font-size:11px; color:rgba(255,255,255,0.7); text-align:center; z-index:3;">GPU 片元着色器实时管线渲染</div>
            </div>

            <div id="shaderNameBadge" style="position:absolute; bottom:8px; left:12px; font-size:11px; color:#38bdf8; font-family:var(--font-mono); background:rgba(0,0,0,0.6); padding:2px 8px; border-radius:4px; border:1px solid rgba(56,189,248,0.3);">
              Shader: Dissolve (消融值: 0.35)
            </div>
          </div>

          <!-- Parameter Controllers Grid -->
          <div id="shaderParamsContainer" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; background:var(--bg-card); padding:12px; border-radius:6px; border:1px solid var(--border-base);">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>消融阈值 (Dissolve Amount)</span>
                <span id="shValAmount" style="font-weight:700; color:var(--primary);">0.35</span>
              </div>
              <input type="range" id="shCtrlAmount" min="0" max="1" step="0.02" value="0.35" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('amount', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span>边缘发光宽度 (Edge Width)</span>
                <span id="shValEdge" style="font-weight:700; color:var(--primary);">0.08</span>
              </div>
              <input type="range" id="shCtrlEdge" min="0.01" max="0.3" step="0.01" value="0.08" style="width:100%; accent-color:var(--primary);" oninput="window.updateShaderParam('edge', this.value)">
            </div>
          </div>
        </div>
      `,
      "code": "# Godot 4 官方消融着色器 (Dissolve Shader)\nshader_type canvas_item;\n\nuniform sampler2D noise_tex : hint_default_black;\nuniform float dissolve_amount : hint_range(0.0, 1.0) = 0.35;\nuniform vec4 edge_color : source_color = vec4(1.0, 0.45, 0.1, 1.0);\nuniform float edge_width = 0.08;\n\nvoid fragment() {\n    vec4 tex_color = texture(TEXTURE, UV);\n    float noise_val = texture(noise_tex, UV).r;\n    if (noise_val < dissolve_amount) {\n        discard;\n    } else if (noise_val < dissolve_amount + edge_width) {\n        COLOR = edge_color;\n    } else {\n        COLOR = tex_color;\n    }\n}"
    }
  ],
  "props": [
    {
      "name": "shader_type_mode",
      "type": "enum",
      "default": "DISSOLVE",
      "desc": "着色器预设模式：DISSOLVE (消融), HOLOGRAM (彩虹全息), SCANLINE (扫描线), FROSTED_GLASS (毛玻璃模糊)",
      "version": "v1.6.0"
    },
    {
      "name": "dissolve_amount",
      "type": "float",
      "default": "0.0",
      "desc": "消融阈值 (0.0 完整显示 ~ 1.0 完全消融灰飞烟灭)",
      "version": "v1.6.0"
    },
    {
      "name": "edge_color",
      "type": "Color",
      "default": "Color(1, 0.45, 0.1)",
      "desc": "消融边缘燃烧发光颜色",
      "version": "v1.6.0"
    },
    {
      "name": "blur_radius",
      "type": "float",
      "default": "8.0",
      "desc": "毛玻璃背景高斯模糊半径 (像素)",
      "version": "v1.6.0"
    }
  ],
  "events": [
    {
      "name": "dissolve_finished",
      "desc": "当消融动画进度从 0.0 渐变至 1.0 结束时触发",
      "params": "()",
      "version": "v1.6.0"
    }
  ],
  "methods": [
    {
      "name": "play_dissolve(duration: float = 1.0, reverse: bool = false)",
      "desc": "播放平滑消融/重组 Tween 动画",
      "params": "(duration: float, reverse: bool) -> void",
      "version": "v1.6.0"
    },
    {
      "name": "set_shader_param(param_name: String, value: Variant)",
      "desc": "动态修改 ShaderMaterial 的 Uniform 参数值",
      "params": "(param_name: String, value: Variant) -> void",
      "version": "v1.6.0"
    }
  ]
};
