const pageNav = document.querySelector('.page-nav');
const progressBar = document.querySelector('.scroll-progress');
const revealItems = document.querySelectorAll('.reveal, .reveal-text');
const glowCards = document.querySelectorAll('[data-glow]');
const backToTop = document.querySelector('.back-to-top');
const cursorGlow = document.querySelector('.cursor-glow');

const recipes = {
  'canola-stir-fry': {
    title: 'Golden Canola Veggie Stir Fry',
    product: 'Canola Oil',
    duration: '12 min',
    calories: '320 kcal',
    creator: 'Ananya Kitchen',
    avatar: 'AK',
    bio: 'Wellness Chef creating clean, premium vegetarian recipes.',
    video: 'videos/recipe1.mp4',
    productImage: '/image/placeholder.png',
    summary: 'A cinematic recipe feature designed for product storytelling, creator credibility, and a smooth watch-to-cook journey.',
    description: 'A polished, fresh vegetable stir fry built around a clean canola oil cooking moment. The recipe keeps vegetables crisp, glossy, and colorful while giving the product a natural role in the story.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Jivo Canola Oil', 'Broccoli florets', 'Bell peppers', 'Carrots', 'Beans', 'Garlic and ginger', 'Salt, pepper, and lemon'],
    benefits: ['Light everyday cooking', 'Colorful vegetable variety', 'Balanced texture and crunch', 'Creator-friendly product moment'],
    steps: [
      'Wash all vegetables thoroughly and pat them dry before cutting.',
      'Slice bell peppers, carrots, onions, beans, and broccoli into even pieces.',
      'Keep garlic, ginger, and green chilli finely chopped for quick tempering.',
      'Place a wide pan on medium heat and let it warm evenly.',
      'Add Jivo Canola Oil and allow it to shimmer gently.',
      'Add garlic and ginger, then stir until aromatic.',
      'Add onions and cook until the edges turn translucent.',
      'Add carrots and beans first because they need more cooking time.',
      'Add broccoli and bell peppers once the firmer vegetables soften slightly.',
      'Season with salt, crushed pepper, and a small pinch of chilli flakes.',
      'Toss the vegetables on high heat to keep them crisp.',
      'Add a spoon of light soy or lemon juice for brightness.'
    ],
  },
  'mustard-dal': {
    title: 'Comfort Dal With Mustard Tempering',
    product: 'Mustard Oil',
    duration: '22 min',
    calories: '410 kcal',
    creator: 'Riya Sethi',
    avatar: 'RS',
    bio: 'Home cook focused on warm Indian comfort recipes.',
    video: 'videos/recipe2.mp4',
    productImage: '/image/placeholder.png',
    summary: 'A warm homestyle video recipe focused on aroma, simplicity, and everyday wellness.',
    description: 'A comforting dal with a bold mustard oil tempering, designed for close-up aroma shots and a clear ingredient-led cooking journey.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Jivo Mustard Oil', 'Yellow dal', 'Garlic slices', 'Cumin seeds', 'Tomato', 'Turmeric', 'Coriander leaves'],
    benefits: ['Protein-rich comfort bowl', 'Aromatic tempering', 'Simple everyday prep', 'Warm family-style serving'],
    steps: [
      'Rinse dal until the water runs mostly clear.',
      'Pressure cook dal with turmeric, salt, and enough water.',
      'Whisk the cooked dal until smooth but not completely thin.',
      'Warm a small tempering pan on medium heat.',
      'Add Jivo Mustard Oil and heat until fragrant.',
      'Lower the flame before adding cumin seeds.',
      'Add garlic slices and cook until lightly golden.',
      'Add dried red chilli and a pinch of asafoetida.',
      'Pour the tempering over the dal carefully.',
      'Simmer the dal for five minutes so flavors combine.',
      'Finish with coriander leaves.',
      'Serve with steamed rice or roti.'
    ],
  },
  'olive-pasta': {
    title: 'Olive Herb Pasta Plate',
    product: 'Olive Oil',
    duration: '18 min',
    calories: '390 kcal',
    creator: 'Dev Verma',
    avatar: 'DV',
    bio: 'Food filmmaker creating clean quick-meal stories.',
    video: 'videos/recipe3.mp4',
    productImage: '/image/placeholder.png',
    summary: 'A cinematic quick meal concept built around clean texture, herbs, and Jivo Olive Oil.',
    description: 'A glossy herb pasta that uses olive oil as the foundation for flavor, sheen, and a premium plating moment.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Jivo Olive Oil', 'Pasta', 'Garlic', 'Cherry tomatoes', 'Mixed herbs', 'Spinach', 'Black pepper'],
    benefits: ['Quick weeknight cooking', 'Fresh herb finish', 'Balanced sauce texture', 'Elegant plating potential'],
    steps: [
      'Boil pasta in salted water until al dente.',
      'Reserve a cup of pasta water before draining.',
      'Warm Jivo Olive Oil in a broad pan.',
      'Add sliced garlic and cook on low heat.',
      'Add chilli flakes and mixed herbs.',
      'Add cherry tomatoes and toss gently.',
      'Add the boiled pasta into the pan.',
      'Splash reserved pasta water to emulsify the sauce.',
      'Season with salt and crushed black pepper.',
      'Toss until the pasta looks glossy.',
      'Add spinach or basil leaves at the end.',
      'Drizzle a small amount of Jivo Olive Oil before serving.'
    ],
  },
  'ghee-breakfast': {
    title: 'Desi Ghee Breakfast Bowl',
    product: 'Desi Ghee',
    duration: '14 min',
    calories: '360 kcal',
    creator: 'Nisha Kapoor',
    avatar: 'NK',
    bio: 'Nutrition creator with premium breakfast and bowl recipes.',
    video: 'videos/recipe1.mp4',
    productImage: '/image/placeholder.png',
    summary: 'A fresh breakfast edit designed for product-led recipe discovery and creator storytelling.',
    description: 'A warm breakfast bowl with a refined ghee note, styled for natural product placement and clean morning energy.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Jivo Desi Ghee', 'Cooked oats or grains', 'Mixed nuts', 'Seeds', 'Fruit', 'Honey', 'Cinnamon'],
    benefits: ['Satisfying breakfast', 'Good fats', 'Textural crunch', 'Balanced portioning'],
    steps: [
      'Prepare cooked grains or oats as the base.',
      'Warm a small spoon of Jivo Desi Ghee.',
      'Toast nuts until fragrant.',
      'Add seeds and stir briefly.',
      'Slice seasonal fruits.',
      'Spoon the grain base into a bowl.',
      'Add toasted nuts over the top.',
      'Arrange fruits with clean spacing.',
      'Add honey only if needed.',
      'Sprinkle cinnamon lightly.',
      'Add a tiny ghee drizzle for richness.',
      'Serve immediately with a clean top shot.'
    ],
  },
  'wheatgrass-smoothie': {
    title: 'Wheatgrass Morning Smoothie',
    product: 'Wheatgrass',
    duration: '8 min',
    calories: '210 kcal',
    creator: 'Mira Studio',
    avatar: 'MS',
    bio: 'Wellness creator styling fresh drinks and green rituals.',
    video: 'videos/recipe2.mp4',
    productImage: '/image/placeholder.png',
    summary: 'A clean green blend for a fresh start, styled for wellness-led product storytelling.',
    description: 'A smooth, fresh wheatgrass blend created for a crisp morning ritual and a clean product-led recipe moment.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Jivo Wheatgrass', 'Banana', 'Apple', 'Cucumber', 'Lemon', 'Mint', 'Cold water'],
    benefits: ['Fresh green start', 'Light and hydrating', 'Quick prep', 'Wellness-forward story'],
    steps: [
      'Chill all produce before blending.',
      'Wash cucumber, apple, and mint thoroughly.',
      'Slice the fruit into blender-friendly pieces.',
      'Add water to the blender jar first.',
      'Add Jivo Wheatgrass and the prepared produce.',
      'Squeeze in lemon for brightness.',
      'Blend until smooth and vivid green.',
      'Taste and adjust with more lemon if needed.',
      'Pour into a chilled glass.',
      'Add mint on top for freshness.',
      'Place the product near the glass for the closing shot.',
      'Serve immediately for best color and texture.'
    ],
  },
  'healthy-snack-bites': {
    title: 'Healthy Millet Snack Bites',
    product: 'Healthy Snacks',
    duration: '16 min',
    calories: '280 kcal',
    creator: 'Kavya Rao',
    avatar: 'KR',
    bio: 'Snack stylist creating practical family-friendly recipe edits.',
    video: 'videos/recipe3.mp4',
    productImage: '/image/placeholder.png',
    summary: 'Crisp, wholesome bites created for quick reels, pantry discovery, and family snacking.',
    description: 'A crisp snack bite recipe with wholesome grains and a premium plating finish for discovery-led recipe cards.',
    gallery: ['../image/placeholder.png', '../image/placeholder.png', '../image/placeholder.png'],
    ingredients: ['Millet flour', 'Jivo cooking oil', 'Curd', 'Sesame seeds', 'Spices', 'Coriander', 'Lemon'],
    benefits: ['Snackable format', 'Whole grain base', 'Family-friendly portion', 'Great for short-form videos'],
    steps: [
      'Mix millet flour, spices, and sesame seeds.',
      'Add curd gradually to form a soft dough.',
      'Rest the dough for five minutes.',
      'Shape small bite-sized discs.',
      'Warm a pan on medium heat.',
      'Brush lightly with Jivo cooking oil.',
      'Place the bites with even spacing.',
      'Cook until the base turns golden.',
      'Flip and cook the second side.',
      'Add coriander and lemon after cooking.',
      'Plate with chutney in a small bowl.',
      'Serve warm for the best texture.'
    ],
  },
};

document.body.classList.add('is-loading');

requestAnimationFrame(() => {
  document.body.classList.remove('is-loading');
  document.querySelectorAll('.hero .reveal-text, .detail-hero .reveal-text').forEach((item) => {
    item.classList.add('is-visible');
  });
});

revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 320)}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

function playVideo(video) {
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.play()
    .then(() => video.closest('.recipe-card, .detail-hero')?.classList.add('is-playing'))
    .catch(() => {});
}

function pauseVideo(video) {
  if (!video) return;
  video.pause();
  video.closest('.recipe-card, .detail-hero')?.classList.remove('is-playing');
}

document.querySelectorAll('.js-hover-video').forEach((video) => {
  const card = video.closest('.recipe-card');
  if (!card) return;

  card.addEventListener('pointerenter', () => playVideo(video));
  card.addEventListener('pointerleave', () => {
    pauseVideo(video);
    video.currentTime = 0;
  });
});

document.querySelectorAll('.js-ambient-video').forEach((video) => {
  playVideo(video);
});

const viewportVideoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.52) {
        playVideo(video);
      } else {
        pauseVideo(video);
      }
    });
  },
  { threshold: [0, 0.52, 0.74] }
);

document.querySelectorAll('.js-viewport-video').forEach((video) => {
  viewportVideoObserver.observe(video);
});

const viewportIframeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.52) {
        if (!iframe.src) iframe.src = iframe.dataset.src;
      } else if (iframe.src) {
        iframe.removeAttribute('src');
      }
    });
  },
  { threshold: [0, 0.52, 0.74] }
);

document.querySelectorAll('.js-viewport-iframe').forEach((iframe) => {
  viewportIframeObserver.observe(iframe);
});

function setupFilters() {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const section = group.closest('.section');
    const cards = section ? section.querySelectorAll('[data-recipe-grid] .recipe-card') : [];

    group.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;

      const category = button.dataset.filter;
      group.querySelectorAll('.filter-pill').forEach((pill) => pill.classList.toggle('is-active', pill === button));

      cards.forEach((card) => {
        const isMatch = category === 'All' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !isMatch);
        if (!isMatch) {
          pauseVideo(card.querySelector('.js-hover-video'));
        }
      });
    });
  });
}

function setupDetailPage() {
  const title = document.querySelector('#detailTitle');
  if (!title) return;

  const params = new URLSearchParams(window.location.search);
  const recipe = recipes[params.get('recipe')] || recipes['canola-stir-fry'];
  const heroVideo = document.querySelector('.detail-hero__video.js-viewport-video');
  const galleryImage = document.querySelector('#galleryImage');
  const galleryDots = document.querySelector('#galleryDots');
  const gallerySlider = document.querySelector('.gallery-slider');
  const ingredientList = document.querySelector('#ingredientList');
  const methodIngredientList = document.querySelector('#methodIngredientList');
  const benefitList = document.querySelector('#benefitList');
  const stepTrack = document.querySelector('#stepTrack');
  const prevStepButton = document.querySelector('[data-step-prev]');
  const nextStepButton = document.querySelector('[data-step-next]');
  let galleryIndex = 0;
  let activeStepPage = 0;
  const stepsPerPage = 5;

  document.title = `${recipe.title} | Jivo Recipe Demo`;
  title.textContent = recipe.title;
  document.querySelector('#detailProduct').textContent = recipe.product;
  document.querySelector('#detailSummary').textContent = recipe.summary;
  document.querySelector('#detailDuration').textContent = recipe.duration;
  document.querySelector('#detailCalories').textContent = recipe.calories;
  document.querySelector('#detailCreator').textContent = recipe.creator;
  document.querySelector('#detailPanelTitle').textContent = recipe.title;
  document.querySelector('#detailDescription').textContent = recipe.description;
  document.querySelector('#creatorName').textContent = recipe.creator;
  document.querySelector('#creatorBio').textContent = recipe.bio;
  document.querySelector('.creator-mini .avatar').textContent = recipe.avatar;
  document.querySelector('#methodPrepTime').textContent = `Prep Time ${recipe.duration}`;
  document.querySelector('#methodProductName').textContent = recipe.product;
  document.querySelector('#methodProductImage').src = recipe.productImage;
  document.querySelector('#methodProductImage').alt = `${recipe.product} used for ${recipe.title}`;

  if (heroVideo) {
    heroVideo.innerHTML = `<source src="${recipe.video}" type="video/mp4">`;
    heroVideo.load();
  }

  ingredientList.innerHTML = recipe.ingredients.map((item) => `<li>${item}</li>`).join('');
  methodIngredientList.innerHTML = recipe.ingredients.map((item) => `<li>${item}</li>`).join('');
  benefitList.innerHTML = recipe.benefits.map((item) => `<li>${item}</li>`).join('');

  function renderSteps() {
    const start = activeStepPage * stepsPerPage;
    const pageSteps = recipe.steps.slice(start, start + stepsPerPage);

    stepTrack.classList.add('is-switching');
    window.setTimeout(() => {
      stepTrack.innerHTML = pageSteps.map((step, index) => `
        <article class="step-card">
          <span>${start + index + 1}</span>
          <p>${step}</p>
        </article>
      `).join('');

      prevStepButton.disabled = activeStepPage === 0;
      nextStepButton.disabled = start + stepsPerPage >= recipe.steps.length;
      stepTrack.classList.remove('is-switching');
    }, 140);
  }

  function renderGallery() {
    if (!galleryImage) return;
    gallerySlider?.classList.add('is-switching');
    window.setTimeout(() => {
      galleryImage.src = recipe.gallery[galleryIndex];
      galleryImage.alt = `${recipe.title} gallery image ${galleryIndex + 1}`;
      galleryDots.innerHTML = recipe.gallery.map((_, index) => `<span class="${index === galleryIndex ? 'is-active' : ''}"></span>`).join('');
      gallerySlider?.classList.remove('is-switching');
    }, 150);
  }

  document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + recipe.gallery.length) % recipe.gallery.length;
    renderGallery();
  });

  document.querySelector('[data-gallery-next]')?.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % recipe.gallery.length;
    renderGallery();
  });

  prevStepButton?.addEventListener('click', () => {
    activeStepPage = Math.max(activeStepPage - 1, 0);
    renderSteps();
  });

  nextStepButton?.addEventListener('click', () => {
    const maxPage = Math.ceil(recipe.steps.length / stepsPerPage) - 1;
    activeStepPage = Math.min(activeStepPage + 1, maxPage);
    renderSteps();
  });

  renderGallery();
  renderSteps();
}

function setupCollaborationForms() {
  const successModal = document.querySelector('#successModal');
  const closeButton = document.querySelector('.success-modal__close');

  function closeSuccessModal() {
    successModal?.classList.remove('is-open');
    successModal?.setAttribute('aria-hidden', 'true');
  }

  function openSuccessModal() {
    successModal?.classList.add('is-open');
    successModal?.setAttribute('aria-hidden', 'false');
  }

  document.querySelectorAll('[data-file-input]').forEach((input) => {
    input.addEventListener('change', () => {
      const uploadBox = input.closest('.upload-box');
      const fileName = uploadBox?.querySelector('[data-file-name]');
      const file = input.files?.[0];

      uploadBox?.classList.toggle('has-file', Boolean(file));
      if (fileName) {
        if (!fileName.dataset.defaultText) fileName.dataset.defaultText = fileName.textContent;
        fileName.textContent = file ? file.name : fileName.dataset.defaultText;
      }
    });
  });

  document.querySelectorAll('[data-collab-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const button = form.querySelector('.collab-submit');
      button?.classList.add('is-loading');

      window.setTimeout(() => {
        button?.classList.remove('is-loading');
        openSuccessModal();
        form.reset();
        form.querySelectorAll('.upload-box').forEach((box) => {
          const fileName = box.querySelector('[data-file-name]');
          box.classList.remove('has-file');
          if (fileName?.dataset.defaultText) fileName.textContent = fileName.dataset.defaultText;
        });
      }, 700);
    });
  });

  closeButton?.addEventListener('click', closeSuccessModal);
  successModal?.addEventListener('click', (event) => {
    if (event.target === successModal) closeSuccessModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSuccessModal();
  });
}

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? Math.min(scrollY / pageHeight, 1) : 0;

  pageNav?.classList.toggle('is-scrolled', scrollY > 32);
  backToTop?.classList.toggle('is-visible', scrollY > 720);
  progressBar?.style.setProperty('--scroll-progress', progress);

  document.querySelectorAll('.hero__video').forEach((item) => {
    const rect = item.parentElement.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * -0.045;
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
      cursorGlow.style.transform = `translate3d(${event.clientX - 170}px, ${event.clientY - 170}px, 0)`;
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

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.querySelectorAll('video').forEach((video) => pauseVideo(video));
    document.querySelectorAll('.js-viewport-iframe').forEach((iframe) => iframe.removeAttribute('src'));
  }
});

setupFilters();
setupDetailPage();
setupCollaborationForms();
updateScrollEffects();
