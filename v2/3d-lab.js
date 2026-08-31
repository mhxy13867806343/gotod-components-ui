/* Shared v2 3D documentation interactions. The Godot snippets are intentionally kept next to each preview. */
(function (global) {
  var csharpCodes = [
    'using Godot;\nusing GotodUI;\n\npublic partial class Scene3DComponent : Node3D\n{\n    [Export] public Camera3D Camera { get; set; }\n\n    public override void _Ready()\n    {\n        var mesh = new MeshInstance3D { Mesh = new BoxMesh() };\n        AddChild(mesh);\n\n        var outline = new GButton\n        { Text = "Inspect Mesh", Variant = GButton.Variant.Outline };\n        AddChild(outline);\n        Camera?.LookAt(GlobalPosition);\n    }\n}',
    'using Godot;\nusing GotodUI;\n\npublic partial class ShaderCard : MeshInstance3D\n{\n    public override void _Ready()\n    {\n        var material = GetActiveMaterial(0) as ShaderMaterial;\n        material?.SetShaderParameter("rim_power", 2.5f);\n        material?.SetShaderParameter("edge_color", new Color(0.2f, 0.8f, 1.0f));\n    }\n}',
    'using Godot;\nusing GotodUI;\n\npublic partial class WorldLighting : Node3D\n{\n    public override void _Ready()\n    {\n        var env = new Environment\n        {\n            BackgroundMode = Environment.BGMode.Sky,\n            GlowEnabled = true, FogEnabled = true,\n            TonemapMode = Environment.ToneMapper.Aces\n        };\n        GetNode<WorldEnvironment>("WorldEnvironment").Environment = env;\n    }\n}',
    'using Godot;\nusing GotodUI;\n\npublic partial class FXEmitter : Node3D\n{\n    [Export] public ParticleProcessMaterial ParticleMaterial { get; set; }\n\n    public override void _Ready()\n    {\n        var particles = new GpuParticles3D\n        { Amount = 512, Lifetime = 2.0, ProcessMaterial = ParticleMaterial };\n        AddChild(particles);\n        // 大量相同网格使用 MultiMeshInstance3D\n    }\n}'
  ];
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return;
    }
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  function installCodeTools() {
    var grid = document.querySelector('.lab-grid');
    if (!grid || grid.querySelector('.lab-language-tabs')) return;
    var tabs = document.createElement('div');
    tabs.className = 'lab-language-tabs lab-wide';
    tabs.innerHTML = '<button class="active" data-language="gdscript">GDScript</button><button data-language="csharp">C# (.NET)</button><small>示例代码可直接复制</small>';
    grid.prepend(tabs);
    grid.querySelectorAll('.lab-code pre').forEach(function (pre, index) {
      pre.dataset.gdscript = pre.textContent;
      var copy = document.createElement('button');
      copy.className = 'lab-code-copy';
      copy.type = 'button';
      copy.textContent = '复制';
      copy.addEventListener('click', function () {
        var text = pre.textContent;
        copyText(text);
        var title = pre.closest('.lab-card').querySelector('h2');
        var language = tabs.querySelector('[data-language="csharp"].active') ? 'C#' : 'GDScript';
        var message = (title ? title.textContent.split('·')[0].trim() : '示例') + ' - ' + language + '代码复制成功';
        setStatus(message, '#86efac');
        copy.textContent = '已复制';
        setTimeout(function () { copy.textContent = '复制'; }, 1200);
      });
      pre.parentElement.appendChild(copy);
    });
    tabs.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      var isCSharp = button.dataset.language === 'csharp';
      tabs.querySelectorAll('button').forEach(function (item) { item.classList.toggle('active', item === button); });
      grid.querySelectorAll('.lab-code pre').forEach(function (pre, index) {
        pre.textContent = isCSharp ? (csharpCodes[index] || pre.dataset.gdscript) : pre.dataset.gdscript;
      });
      setStatus(isCSharp ? 'C# (.NET) code selected' : 'GDScript code selected');
    });
  }
  if (!global.showToast) {
    global.showToast = function (message) {
      var status = document.getElementById('labStatus');
      if (status) { status.textContent = message; status.style.color = '#86efac'; }
    };
  }
  function setStatus(text, color) {
    var node = document.getElementById('labStatus');
    if (!node) return;
    node.textContent = text;
    node.style.color = color || '#67e8f9';
  }
  global.Gotod3DLab = {
    rotate: function () {
      var cube = document.getElementById('labCube');
      if (cube) cube.style.transform = 'rotate(' + (28 + Math.floor(Math.random() * 180)) + 'deg) skewY(-8deg)';
      setStatus('MeshInstance3D transform updated');
    },
    shader: function (value) {
      var orb = document.getElementById('labOrb');
      if (orb) orb.style.filter = 'hue-rotate(' + value + 'deg)';
      var label = document.getElementById('shaderValue');
      if (label) label.textContent = value + '°';
      setStatus('ShaderMaterial uniform updated');
    },
    environment: function (enabled) {
      var scene = document.getElementById('labScene');
      if (scene) scene.style.filter = enabled ? 'brightness(1.35) saturate(1.3)' : 'brightness(.65) saturate(.75)';
      setStatus(enabled ? 'WorldEnvironment glow enabled' : 'WorldEnvironment glow disabled');
    },
    copy: function (text) {
      copyText(text);
      setStatus('Shader code copied to clipboard', '#86efac');
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installCodeTools);
  else installCodeTools();
  document.addEventListener('click', function (event) {
    var button = event.target.closest('button');
    if (!button || !button.textContent) return;
    if (button.textContent.indexOf('旋转 Mesh') >= 0) global.Gotod3DLab.rotate();
    if (button.textContent.indexOf('重新发射粒子') >= 0) {
      var particle = button.closest('.lab-preview').querySelector('[style*="font-size:48px"]');
      if (particle) { particle.style.transform = 'scale(1.35) rotate(18deg)'; particle.style.filter = 'drop-shadow(0 0 24px #fbbf24)'; }
      setStatus('GPUParticles3D emission restarted', '#86efac');
    }
    if (button.textContent.indexOf('启用 Glow') >= 0) {
      var scene = document.getElementById('labScene');
      if (scene) { scene.style.filter = 'brightness(1.35) saturate(1.3)'; scene.style.boxShadow = 'inset 0 0 55px rgba(34,211,238,.4)'; }
      setStatus('WorldEnvironment glow enabled', '#86efac');
    }
    if (button.textContent.indexOf('低功耗') >= 0) {
      var lowPowerScene = document.getElementById('labScene');
      if (lowPowerScene) { lowPowerScene.style.filter = 'brightness(.65) saturate(.75)'; lowPowerScene.style.boxShadow = 'none'; }
      setStatus('WorldEnvironment low power mode', '#fbbf24');
    }
  });
  document.addEventListener('input', function (event) {
    if (event.target.matches('input[type="range"]') && event.target.closest('.lab-preview')) {
      global.Gotod3DLab.shader(event.target.value);
    }
  });
})(window);
