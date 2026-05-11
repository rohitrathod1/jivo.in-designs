const pageNav = document.querySelector('.page-nav');
const revealItems = document.querySelectorAll('.reveal, .reveal-text');
const animatedSections = document.querySelectorAll('.section, .banner-section');
const parallaxItems = document.querySelectorAll('.parallax-bg');
const glowCards = document.querySelectorAll('[data-glow]');
const countItems = document.querySelectorAll('[data-count]');
const backToTop = document.querySelector('.back-to-top');
const cursorGlow = document.querySelector('.cursor-glow');
const progressBar = document.querySelector('.scroll-progress');
const storyLinks = document.querySelectorAll('.story-rail a');
const trackedSections = [...storyLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

document.body.classList.add('is-loading');

requestAnimationFrame(() => {
  document.body.classList.remove('is-loading');
  document.querySelectorAll('.hero .reveal-text').forEach((item) => {
    item.classList.add('is-visible');
  });
});

animatedSections.forEach((section) => {
  section.querySelectorAll('.reveal').forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 120, 460)}ms`);
  });
});

function animateCount(item) {
  if (item.dataset.counted === 'true') return;

  item.dataset.counted = 'true';
  const target = Number(item.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    item.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');

      if (entry.target.matches('[data-count]')) {
        animateCount(entry.target);
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -14% 0px' }
);

revealItems.forEach((item) => observer.observe(item));
countItems.forEach((item) => observer.observe(item));
animatedSections.forEach((section) => sectionObserver.observe(section));

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? Math.min(scrollY / pageHeight, 1) : 0;

  pageNav.classList.toggle('is-scrolled', scrollY > 32);
  backToTop.classList.toggle('is-visible', scrollY > 720);
  progressBar.style.setProperty('--scroll-progress', progress);

  let activeId = 'top';

  trackedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.42) {
      activeId = section.id || 'top';
    }
  });

  storyLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
  });

  parallaxItems.forEach((item) => {
    const parent = item.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * -0.055;
    item.style.setProperty('--parallax', `${offset}px`);
  });
}

let ticking = false;

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener(
  'pointermove',
  (event) => {
    if (cursorGlow) {
      cursorGlow.style.transform = `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`;
    }
  },
  { passive: true }
);

glowCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x / 100) - 0.5) * 5;
    const rotateX = ((y / 100) - 0.5) * -5;

    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

updateScrollEffects();
