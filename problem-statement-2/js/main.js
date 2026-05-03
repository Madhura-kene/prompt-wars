// =============================================
// ELECTIQ — MODERN JS
// =============================================

// NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// NAV HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.innerHTML = navLinks.classList.contains('open') ? '&times;' : '&#9776;';
  });
}

// COUNT-UP ANIMATION
function countUp(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(target * progress);
    
    el.textContent = current;
    
    if (frame === totalFrames) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, frameRate);
}

// SCROLL REVEAL OBSERVER
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('stats-strip')) {
        entry.target.querySelectorAll('.stat-num').forEach(countUp);
      }
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Initialize observers
document.querySelectorAll('.feature-card, .how-step, .stats-strip, .section-title').forEach(el => {
  revealObserver.observe(el);
});
