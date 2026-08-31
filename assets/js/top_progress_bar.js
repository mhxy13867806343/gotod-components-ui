// =========================================================================
// Gotod Components UI - Top Dual-Mode Progress Bar
// 纯原生 CSS+JS 实现：
// 1. 刷新 / 路由切换 / 页面加载缓冲进度条 (Loading / Transition Mode)
// 2. 页面上下滚动阅读进度条 (Scroll Reading Progress Mode)
// =========================================================================

(function() {
  'use strict';

  let bar = null;
  let loadTimer = null;
  let isNavigating = false;
  let currentProgress = 0;

  function getBar() {
    if (!bar) {
      bar = document.getElementById('topProgressBar');
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'topProgressBar';
        bar.className = 'top-progress-bar';
        document.body.prepend(bar);
      }
    }
    return bar;
  }

  // -------------------------------------------------------------
  // Mode 1: Navigation & Loading / Refresh Progress
  // -------------------------------------------------------------
  window.startTopProgress = function() {
    const el = getBar();
    if (!el) return;

    if (loadTimer) clearInterval(loadTimer);
    isNavigating = true;
    currentProgress = 18;
    el.classList.remove('scroll-mode');
    el.classList.add('active');
    el.style.width = currentProgress + '%';

    loadTimer = setInterval(() => {
      if (currentProgress < 88) {
        currentProgress += Math.random() * 12 + 6;
        el.style.width = Math.min(88, currentProgress) + '%';
      }
    }, 100);
  };

  window.finishTopProgress = function() {
    const el = getBar();
    if (!el) return;

    if (loadTimer) {
      clearInterval(loadTimer);
      loadTimer = null;
    }

    currentProgress = 100;
    el.style.width = '100%';

    setTimeout(() => {
      if (isNavigating) {
        el.classList.remove('active');
        setTimeout(() => {
          el.style.width = '0%';
          isNavigating = false;
          updateScrollProgress(); // Switch back to scroll progress
        }, 220);
      }
    }, 280);
  };

  // -------------------------------------------------------------
  // Mode 2: Scroll Reading Progress
  // -------------------------------------------------------------
  function updateScrollProgress() {
    if (isNavigating) return; // Don't override navigation loading
    const el = getBar();
    if (!el) return;

    const scrollEl = document.scrollingElement || document.documentElement || document.body;
    const mainEl = document.getElementById('mainContent');

    // Calculate window scroll and main container scroll
    const windowScrollTop = window.pageYOffset || scrollEl.scrollTop || 0;
    const windowMaxScroll = (scrollEl.scrollHeight || 1) - (window.innerHeight || 1);
    
    let ratio = 0;
    if (windowMaxScroll > 20) {
      ratio = windowScrollTop / windowMaxScroll;
    } else if (mainEl) {
      const mainScrollTop = mainEl.scrollTop || 0;
      const mainMaxScroll = (mainEl.scrollHeight || 1) - (mainEl.clientHeight || 1);
      if (mainMaxScroll > 20) {
        ratio = mainScrollTop / mainMaxScroll;
      }
    }

    ratio = Math.max(0, Math.min(1, ratio));
    const pct = (ratio * 100).toFixed(1);

    if (ratio > 0.005) {
      el.classList.add('scroll-mode');
      el.classList.add('active');
      el.style.width = pct + '%';
    } else {
      el.style.width = '0%';
      el.classList.remove('scroll-mode');
      el.classList.remove('active');
    }
  }

  // -------------------------------------------------------------
  // Global Event Bindings
  // -------------------------------------------------------------
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('DOMContentLoaded', () => {
    getBar();
    const mainEl = document.getElementById('mainContent');
    if (mainEl) {
      mainEl.addEventListener('scroll', updateScrollProgress, { passive: true });
    }
    // Simulate initial page load progress
    window.startTopProgress();
    setTimeout(window.finishTopProgress, 350);
  });

  // Listen to popstate / hashchange for SPA route transitions
  window.addEventListener('hashchange', () => {
    window.startTopProgress();
    setTimeout(window.finishTopProgress, 280);
  });

})();
