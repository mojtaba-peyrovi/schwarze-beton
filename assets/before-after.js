(function () {
  'use strict';

  function initSlider(el) {
    var range = el.querySelector('.bac__range');
    if (!range) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setPos(val) {
      var clamped = Math.min(100, Math.max(0, parseFloat(val) || 0));
      range.value = clamped;
      el.style.setProperty('--split', clamped + '%');
    }

    function posFromClientX(clientX) {
      var rect = el.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    // Keyboard (range input drives position)
    range.addEventListener('input', function () {
      el.style.setProperty('--split', range.value + '%');
    });

    // Mouse drag
    var dragging = false;
    el.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      dragging = true;
      setPos(posFromClientX(e.clientX));
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      setPos(posFromClientX(e.clientX));
    });
    document.addEventListener('mouseup', function () { dragging = false; });

    // Touch
    el.addEventListener('touchstart', function (e) {
      setPos(posFromClientX(e.touches[0].clientX));
    }, { passive: true });
    el.addEventListener('touchmove', function (e) {
      setPos(posFromClientX(e.touches[0].clientX));
      e.preventDefault();
    }, { passive: false });

    // Initial render
    setPos(range.value);

    // Disable easing for reduced-motion users
    if (prefersReduced) {
      el.classList.add('bac--instant');
    }
  }

  function initAll() {
    document.querySelectorAll('[data-bac]').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
