// =========================================================================
// Gotod Components UI - Doc Anchor Outline Navigation (Naive UI Style TOC)
// 独立右侧页面大纲目录与高亮滚动联动引擎 (Table of Contents / Anchor Nav)
// =========================================================================

(function() {
  'use strict';

  let currentObserver = null;
  let isManualScrolling = false;

  // 1. Render Right Anchor Outline based on current doc data
  window.renderAnchorNav = function(doc, key) {
    const aside = document.getElementById('docAnchorNav');
    const container = document.getElementById('anchorNavInner');
    if (!container || !aside) return;

    if (!doc || !doc.demos || doc.demos.length === 0) {
      aside.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    aside.style.display = '';

    let html = `
      <div class="anchor-nav-header">
        <i class="fa-solid fa-bars-staggered" style="color:var(--primary); margin-right:6px; font-size:11px;"></i>
        <span>目录大纲</span>
      </div>
    `;

    // A. Platform Compatibility Table Anchor
    if (!['guide-', 'game-', 'play-', 'studio-', 'imp-', 'godot-'].some(p => key.startsWith(p))) {
      html += `
        <a href="#platformMatrix" class="anchor-nav-item" data-target="platformMatrix" onclick="window.scrollToAnchor('platformMatrix', event)">
          <i class="fa-solid fa-cubes-stacked" style="font-size:11px; opacity:0.75; margin-right:2px;"></i>
          <span>平台兼容性</span>
        </a>
      `;
    }

    // B. Demo & Step Cards Anchors (e.g. 基础类型, 朴素与变体, 胶囊圆角, Step 1, etc.)
    doc.demos.forEach((d, idx) => {
      const rawTitle = d.title || `示例 ${idx + 1}`;
      
      // Clean up title for elegant Naive UI style outline
      let cleanTitle = rawTitle
        .replace(/^Step\s*\d+[:：]\s*/i, (m) => m.trim() + ' ') // Retain "Step 1: " cleanly
        .replace(/^\d+[\.、]\s*/, '') // Strips "1. ", "2、"
        .replace(/\(.*?\)/g, '') // Strips "(...)"
        .replace(/（.*?）/g, '') // Strips "（...）"
        .trim();
      if (!cleanTitle) cleanTitle = rawTitle;

      html += `
        <a href="#demoCard_${idx}" class="anchor-nav-item" data-target="demoCard_${idx}" onclick="window.scrollToAnchor('demoCard_${idx}', event)" title="${rawTitle}">
          <span class="anchor-dot" style="display:inline-block; width:4px; height:4px; border-radius:50%; background:currentColor; opacity:0.6; flex-shrink:0;"></span>
          <span class="anchor-text" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${cleanTitle}</span>
        </a>
      `;
    });

    // C. API Tables Anchors
    const hasProps = doc.props && doc.props.length > 0;
    const hasMethods = doc.methods && doc.methods.length > 0;
    const hasEvents = doc.events && doc.events.length > 0;
    const hasSlots = doc.slots && doc.slots.length > 0;
    const hasSubProps = doc.paneProps && doc.paneProps.length > 0;

    if (hasProps || hasMethods || hasEvents || hasSlots || hasSubProps) {
      html += `<div class="anchor-nav-divider"></div>`;
      html += `<div class="anchor-nav-header" style="margin-top:6px;"><i class="fa-solid fa-book-bookmark" style="color:var(--primary); margin-right:6px; font-size:11px;"></i>API 规范</div>`;
      
      if (hasProps) {
        html += `<a href="#apiProps" class="anchor-nav-item anchor-nav-subitem" data-target="apiProps" onclick="window.scrollToAnchor('apiProps', event)"><span>Attributes 属性</span></a>`;
      }
      if (hasMethods) {
        html += `<a href="#apiMethods" class="anchor-nav-item anchor-nav-subitem" data-target="apiMethods" onclick="window.scrollToAnchor('apiMethods', event)"><span>Methods 专属方法</span></a>`;
      }
      if (hasEvents) {
        html += `<a href="#apiEvents" class="anchor-nav-item anchor-nav-subitem" data-target="apiEvents" onclick="window.scrollToAnchor('apiEvents', event)"><span>Events 自定义信号</span></a>`;
      }
      if (hasSlots) {
        html += `<a href="#apiSlots" class="anchor-nav-item anchor-nav-subitem" data-target="apiSlots" onclick="window.scrollToAnchor('apiSlots', event)"><span>Slots 具名插槽</span></a>`;
      }
      if (hasSubProps) {
        html += `<a href="#apiSubProps" class="anchor-nav-item anchor-nav-subitem" data-target="apiSubProps" onclick="window.scrollToAnchor('apiSubProps', event)"><span>Sub-props 子属性</span></a>`;
      }
    }

    container.innerHTML = html;

    // Activate the first item initially
    const firstItem = container.querySelector('.anchor-nav-item');
    if (firstItem) firstItem.classList.add('active');

    // Initialize Scroll Spy
    setTimeout(window.initAnchorScrollSpy, 100);
  };

  // 2. Smooth Scroll to Target Element with Offset
  window.scrollToAnchor = function(targetId, e) {
    if (e) e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;

    isManualScrolling = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update active class immediately on click
    const items = document.querySelectorAll('.anchor-nav-item');
    items.forEach(item => {
      if (item.getAttribute('data-target') === targetId || item.getAttribute('href') === `#${targetId}`) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });

    setTimeout(() => {
      isManualScrolling = false;
    }, 600);
  };

  // 3. Scroll Spy (Intersection Observer & Scroll Fallback)
  window.initAnchorScrollSpy = function() {
    if (currentObserver) {
      currentObserver.disconnect();
      currentObserver = null;
    }

    const targets = document.querySelectorAll('[id^="demoCard_"], #platformMatrix, #apiProps, #apiMethods, #apiEvents, #apiSlots, #apiSubProps');
    if (!targets || targets.length === 0) return;

    if ('IntersectionObserver' in window) {
      currentObserver = new IntersectionObserver((entries) => {
        if (isManualScrolling) return;

        // Find visible target nearest to top
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const activeItem = document.querySelector(`.anchor-nav-item[data-target="${id}"]`);
            if (activeItem) {
              document.querySelectorAll('.anchor-nav-item').forEach(el => el.classList.remove('active'));
              activeItem.classList.add('active');
            }
          }
        });
      }, {
        root: null,
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      });

      targets.forEach(el => currentObserver.observe(el));
    } else {
      // Fallback scroll listener
      const mainContent = document.getElementById('mainContent') || window;
      mainContent.addEventListener('scroll', () => {
        if (isManualScrolling) return;
        let currentId = '';
        targets.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentId = el.id;
          }
        });
        if (currentId) {
          document.querySelectorAll('.anchor-nav-item').forEach(item => {
            if (item.getAttribute('data-target') === currentId) item.classList.add('active');
            else item.classList.remove('active');
          });
        }
      });
    }
  };

})();
