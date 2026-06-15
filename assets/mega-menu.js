// HOS Mega Menu — hover-intent, keyboard navigation, backdrop dim, touch toggle
(function () {
  const OPEN_DELAY = 150;
  const CLOSE_DELAY = 300;

  let openTimer = null;
  let closeTimer = null;
  let activeDetails = null;

  const isTouch = () => window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Single backdrop element inserted once
  const backdrop = document.createElement('div');
  backdrop.className = 'hos-mega-backdrop';
  document.body.appendChild(backdrop);

  if (reduceMotion) {
    backdrop.style.transition = 'none';
  }

  function openMenu(details) {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    openTimer = setTimeout(() => {
      if (activeDetails && activeDetails !== details) {
        closeNow(activeDetails);
      }
      details.open = true;
      activeDetails = details;
      backdrop.classList.add('hos-mega-backdrop--active');
    }, reduceMotion ? 0 : OPEN_DELAY);
  }

  function scheduleClose(details) {
    clearTimeout(openTimer);
    closeTimer = setTimeout(() => closeNow(details), reduceMotion ? 0 : CLOSE_DELAY);
  }

  function closeNow(details) {
    details.open = false;
    if (activeDetails === details) {
      activeDetails = null;
      backdrop.classList.remove('hos-mega-backdrop--active');
    }
  }

  function initTrigger(details) {
    const summary = details.querySelector('summary');
    const panel = details.querySelector('.hos-mega-panel, .mega-menu__content');
    if (!summary || !panel) return;

    if (!isTouch()) {
      // Hover-intent on desktop
      details.addEventListener('mouseenter', () => openMenu(details));
      details.addEventListener('mouseleave', () => scheduleClose(details));
      panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      panel.addEventListener('mouseleave', () => scheduleClose(details));

      // Override native click toggle so hover is the only open trigger on desktop
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if (details.open) {
          closeNow(details);
        } else {
          openMenu(details);
        }
      });
    }
    // Touch devices: native details/summary toggle works, no override needed

    // Keyboard: Escape closes and returns focus
    details.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && details.open) {
        closeNow(details);
        summary.focus();
      }
    });

    // Arrow keys: move between sibling top-level nav items
    summary.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const allSummaries = Array.from(
          document.querySelectorAll('.header__inline-menu .list-menu > li > header-menu > details > summary, .header__inline-menu .list-menu > li > a.header__menu-item')
        );
        const idx = allSummaries.indexOf(summary);
        if (idx === -1) return;
        const next = e.key === 'ArrowRight' ? allSummaries[idx + 1] : allSummaries[idx - 1];
        if (next) next.focus();
      }
    });
  }

  function init() {
    document.querySelectorAll('.hos-mega-trigger').forEach(initTrigger);

    // Backdrop click closes active menu
    backdrop.addEventListener('click', () => {
      if (activeDetails) closeNow(activeDetails);
    });

    // Click outside closes active menu
    document.addEventListener('click', (e) => {
      if (activeDetails && !activeDetails.contains(e.target)) {
        closeNow(activeDetails);
      }
    }, { capture: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
