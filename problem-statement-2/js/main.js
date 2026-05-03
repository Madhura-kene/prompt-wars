// =============================================
// ELECTIQ — MAIN JS
// =============================================

// NAV HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// COUNT-UP ANIMATION
function countUp(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(countUp);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) observer.observe(statsStrip);
