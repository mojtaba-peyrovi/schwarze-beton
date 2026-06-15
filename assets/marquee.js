/* Schwarze Beton — Marquee: pause on hover */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hos-marquee__track').forEach((track) => {
    track.addEventListener('mouseenter', () => {
      track.querySelectorAll('.hos-marquee__content').forEach((c) => {
        c.style.animationPlayState = 'paused';
      });
    });
    track.addEventListener('mouseleave', () => {
      track.querySelectorAll('.hos-marquee__content').forEach((c) => {
        c.style.animationPlayState = '';
      });
    });
  });
});
