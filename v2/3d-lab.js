/* Shared v2 3D documentation interactions. The Godot snippets are intentionally kept next to each preview. */
(function (global) {
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
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      setStatus('Shader code copied to clipboard', '#86efac');
    }
  };
  document.addEventListener('click', function (event) {
    var button = event.target.closest('button');
    if (!button || !button.textContent) return;
    if (button.textContent.indexOf('旋转 Mesh') >= 0) global.Gotod3DLab.rotate();
    if (button.textContent.indexOf('重新发射粒子') >= 0) setStatus('GPUParticles3D emission restarted', '#86efac');
  });
})(window);
