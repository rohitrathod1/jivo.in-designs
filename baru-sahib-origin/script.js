const revealItems = document.querySelectorAll('.reveal, .reveal-text');
const animatedSections = document.querySelectorAll('.section, .quote-band');
const parallaxItems = document.querySelectorAll('.parallax-bg');
const backToTop = document.querySelector('.back-to-top');
const tiltCards = document.querySelectorAll('[data-tilt]');
const glowCards = document.querySelectorAll('[data-glow]');

animatedSections.forEach((section) => {
  section.querySelectorAll('.reveal').forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 120, 420)}ms`);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -12% 0px' }
);

revealItems.forEach((item) => observer.observe(item));
animatedSections.forEach((section) => sectionObserver.observe(section));

requestAnimationFrame(() => {
  document.querySelectorAll('.hero .reveal-text').forEach((item) => {
    item.classList.add('is-visible');
  });
});

function updateScrollEffects() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const rect = item.parentElement.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * -0.06;
    item.style.setProperty('--parallax', `${offset}px`);
  });

  backToTop.classList.toggle('is-visible', scrollY > 720);
}

let ticking = false;

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

glowCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');
  });
});

updateScrollEffects();
