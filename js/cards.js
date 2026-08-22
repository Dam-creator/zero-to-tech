import anime from 'animejs/lib/anime.es.js'

function runAnimation() {
  anime({
    targets: '.card',
    opacity: [0, 1],
    translateY: [24, 0],
    delay: anime.stagger(120),
    duration: 700,
    easing: 'easeOutBack',
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAnimation);
} else {
  runAnimation();
}
