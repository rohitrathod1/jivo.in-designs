const revealItems = document.querySelectorAll('.reveal, .reveal-text');
const sections = document.querySelectorAll('.section');
const parallaxItems = document.querySelectorAll('.parallax-bg');
const glowCards = document.querySelectorAll('[data-glow]');
const backToTop = document.querySelector('.back-to-top');
const canvas = document.querySelector('.particles');
const context = canvas.getContext('2d');

sections.forEach((section) => {
  section.querySelectorAll('.reveal').forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 110, 440)}ms`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
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
  { threshold: 0.14, rootMargin: '0px 0px -12% 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));
sections.forEach((section) => sectionObserver.observe(section));

requestAnimationFrame(() => {
  document.querySelectorAll('.hero .reveal-text').forEach((item) => {
    item.classList.add('is-visible');
  });
});

function updateScrollEffects() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const rect = item.parentElement.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * -0.055;
    item.style.setProperty('--parallax', `${offset}px`);
  });

  backToTop.classList.toggle('is-visible', scrollY > 720);
}

let scrollTicking = false;

window.addEventListener(
  'scroll',
  () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollEffects();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  },
  { passive: true }
);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

const particles = Array.from({ length: 54 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.random() * 2.2 + 0.8,
  speed: Math.random() * 0.28 + 0.08,
  drift: Math.random() * 0.25 + 0.05,
  alpha: Math.random() * 0.45 + 0.2,
}));

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawParticles() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle) => {
    particle.y -= particle.speed / window.innerHeight;
    particle.x += Math.sin(Date.now() * 0.0004 + particle.y * 12) * particle.drift / window.innerWidth;

    if (particle.y < -0.04) {
      particle.y = 1.04;
      particle.x = Math.random();
    }

    context.beginPath();
    context.arc(particle.x * window.innerWidth, particle.y * window.innerHeight, particle.size, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 250, 240, ${particle.alpha})`;
    context.fill();
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();
updateScrollEffects();
