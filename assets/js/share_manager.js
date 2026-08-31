// =========================================================================
// Gotod Components UI - Social Share Integration (Overtrue Share.js)
// 全站社交分享组件系统 (支持微信/QQ/QQ空间/微博/豆瓣/Twitter/Facebook及二维码)
// =========================================================================

(function() {
  'use strict';

  // 1. Open Share Modal Dialog
  window.openShareModal = function(customTitle, customUrl) {
    const curTitle = customTitle || document.title || 'gotod-components-ui | Godot 4.x Vue-Style Component Library';
    const curUrl = customUrl || window.location.href;
    const curDesc = 'Godot 4.x 全套 Vue 风格游戏 UI 组件库与主题工坊，支持全平台跨端编译！';

    // Remove existing modal if any
    const existing = document.getElementById('gotodShareModalOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'gotodShareModalOverlay';
    overlay.className = 'g-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: gFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    overlay.innerHTML = `
      <div class="g-modal-box" style="
        background: var(--bg-surface, #18181c);
        border: 1px solid var(--border-base, rgba(255,255,255,0.12));
        border-radius: 12px;
        box-shadow: 0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
        width: 90%;
        max-width: 480px;
        padding: 0;
        overflow: hidden;
        animation: gZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      " onclick="event.stopPropagation()">
        
        <!-- Header -->
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-base, rgba(255,255,255,0.08)); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card, #202024);">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: var(--text-primary);">
            <i class="fa-solid fa-share-nodes" style="color: var(--primary);"></i>
            <span>分享此页面 (Share Page)</span>
          </div>
          <button id="gotodShareCloseBtn" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 18px; line-height: 1; padding: 4px;" title="关闭">×</button>
        </div>

        <!-- Body -->
        <div style="padding: 24px 20px; text-align: center;">
          <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; word-break: break-all;">
            ${curTitle}
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
            ${curDesc}
          </p>

          <!-- Overtrue Social Share HTML5 Container -->
          <div class="social-share" 
               data-sites="wechat,qq,qzone,weibo,douban,twitter,facebook" 
               data-title="${curTitle.replace(/"/g, '&quot;')}" 
               data-description="${curDesc}" 
               data-url="${curUrl}"
               style="display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin: 16px 0 24px 0;">
          </div>

          <!-- Quick Copy Link Box -->
          <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-card); border: 1px solid var(--border-base); border-radius: 6px; padding: 6px 10px; margin-top: 16px;">
            <input type="text" readonly value="${curUrl}" id="shareUrlInputBox" style="flex: 1; background: transparent; border: none; color: var(--text-secondary); font-size: 12px; outline: none; font-family: var(--font-mono, monospace);">
            <button class="g-btn g-btn-primary" style="height: 28px; padding: 0 12px; font-size: 12px; white-space: nowrap; border-radius: 4px;" onclick="window.copyShareCurrentLink()">
              <i class="fa-regular fa-copy"></i> 复制链接
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 12px 20px; background: var(--bg-card); border-top: 1px solid var(--border-base); display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-secondary);">
          <span>Powered by Overtrue Share.js</span>
          <a href="https://overtrue.me/share.js/" target="_blank" style="color: var(--primary); text-decoration: none;">组件主页 →</a>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Initialize Overtrue Social Share instance
    if (window.socialShare) {
      window.socialShare('.social-share');
    }

    overlay.onclick = () => overlay.remove();
    document.getElementById('gotodShareCloseBtn').onclick = () => overlay.remove();
  };

  // 2. Copy Current URL to Clipboard
  window.copyShareCurrentLink = function() {
    const input = document.getElementById('shareUrlInputBox');
    const url = input ? input.value : window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        if (window.showToast) window.showToast('✅ 分享链接已成功复制到剪贴板！', 'success');
      }).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      if (window.showToast) window.showToast('✅ 分享链接已复制到剪贴板！', 'success');
    } catch (e) {
      if (window.showToast) window.showToast('复制失败，请手动长按复制', 'warning');
    }
    document.body.removeChild(textArea);
  }

})();
