document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initSmoothScroll();
  initMobileCta();
});

/* ---- Navigation ---- */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

/* ---- Floating Mobile CTA ---- */
function initMobileCta() {
  const cta = document.getElementById('mobileCta');
  const hero = document.getElementById('hero');
  if (!cta || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      cta.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
