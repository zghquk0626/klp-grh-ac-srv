// ── LENIS SMOOTH SCROLL ──
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));

// ── GSAP ANIMATIONS ──
ScrollTrigger.batch('.g-fade', {
  onEnter: els => gsap.to(els, { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out' }),
  start: 'top 85%', once: true
});

// ── 3D CAROUSEL LOGIC ──
const cards3D = Array.from(document.querySelectorAll('.t-card-3d'));
const total = cards3D.length;
let currentIndex = 0;

const carouselStates = {
  active: { x: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 3, z: 0 },
  next: { x: 300, scale: 0.85, rotateY: -12, opacity: 0.6, zIndex: 2, z: -150 },
  prev: { x: -300, scale: 0.85, rotateY: 12, opacity: 0.6, zIndex: 2, z: -150 },
  'hidden-right': { x: 540, scale: 0.7, rotateY: -20, opacity: 0, zIndex: 1, z: -250 },
  'hidden-left': { x: -540, scale: 0.7, rotateY: 20, opacity: 0, zIndex: 1, z: -250 }
};

function updateCarousel() {
  cards3D.forEach((card, i) => {
    const dist = (i - currentIndex + total) % total;
    let stateName = 'hidden-left';
    if (dist === 0) stateName = 'active';
    else if (dist === 1) stateName = 'next';
    else if (dist === total - 1) stateName = 'prev';
    else if (dist <= Math.floor(total / 2)) stateName = 'hidden-right';

    const target = carouselStates[stateName];
    card.classList.remove('active', 'next', 'prev', 'hidden-left', 'hidden-right');
    card.classList.add(stateName);
    card.style.zIndex = target.zIndex;
    card.style.pointerEvents = stateName === 'hidden-left' || stateName === 'hidden-right' ? 'none' : 'auto';

    gsap.killTweensOf(card);
    gsap.to(card, {
      '--card-x': `${target.x}px`,
      '--card-scale': target.scale,
      '--card-rotateY': `${target.rotateY}deg`,
      '--card-z': `${target.z}px`,
      opacity: target.opacity,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  });
}

function moveCarousel(index) { currentIndex = index; updateCarousel(); }
function prevCarousel() { currentIndex = (currentIndex - 1 + total) % total; updateCarousel(); }
function nextCarousel() { currentIndex = (currentIndex + 1) % total; updateCarousel(); }
function animateCarouselTo(index) {
  currentIndex = index;
  updateCarousel();
}
function handleTreatmentCardClick(index, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (window.innerWidth <= 768) {
    openTreatmentModal(index);
    return;
  }

  moveCarousel(index);
}
updateCarousel();

// Touch swipe for 3D carousel
(function() {
  const wrap = document.getElementById('carousel3D');
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let isHorizontalSwipe = false;

  wrap.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = true;
    isHorizontalSwipe = false;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isHorizontalSwipe = true;
      e.preventDefault();
    }
  }, { passive: false });

  wrap.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;

    if (!isHorizontalSwipe) return;

    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 70) {
      dx < 0 ? animateCarouselTo((currentIndex + 1) % total) : animateCarouselTo((currentIndex - 1 + total) % total);
    }
  }, { passive: true });
})();

// ── FLICKITY TESTIMONIALS (INFINITE) ──
new Flickity('#tSlider', {
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  autoPlay: 4500,
  prevNextButtons: false,
  pageDots: false
});

// ── QUIZ LOGIC ──
const quizState = { q1: null, q2: null };

function pick(q, v) {
  if (q === 1) {
    quizState.q1 = v;
    goTo(2);
    return;
  }
  if (q === 2) {
    quizState.q2 = v;
    showResult();
    return;
  }
}

function goBack(fromQ){
  quizState.q2 = null;
  const prev = fromQ - 1;
  document.querySelectorAll('.qscreen').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.qdot').forEach((d,i) => d.classList.toggle('on', i < prev));
  document.getElementById('q' + prev).classList.add('on');
}

function goTo(n){
  document.querySelectorAll('.qscreen').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.qdot').forEach((d,i) => d.classList.toggle('on', i < n));
  document.getElementById('q'+n).classList.add('on');
}

function showResult(){
  const result = getQuizRecommendation(quizState.q1, quizState.q2);
  document.querySelectorAll('.qscreen').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.qdot').forEach(d => d.classList.add('on'));
  document.getElementById('resName').textContent = result.n;
  document.getElementById('resDesc').textContent = result.d;
  const msg = `Saya melihat treatment ${result.n} dari website Revolushine, apakah bisa konsultasi terlebih dahulu?`;
  document.getElementById('resWA').href = `https://wa.me/6287736386388?text=${encodeURIComponent(msg)}`;
  document.getElementById('qresult').classList.add('on');
}

function resetQuiz(){
  quizState.q1 = null;
  quizState.q2 = null;
  document.getElementById('qresult').classList.remove('on');
  document.querySelectorAll('.qscreen').forEach(s => s.classList.remove('on'));
  document.getElementById('q1').classList.add('on');
  document.querySelectorAll('.qdot').forEach((d,i) => d.classList.toggle('on', i===0));
}
function openQuiz(){ document.getElementById('quizOverlay').classList.add('open'); document.documentElement.classList.add('modal-lock'); }
function closeQuiz(){ document.getElementById('quizOverlay').classList.remove('open'); document.documentElement.classList.remove('modal-lock'); setTimeout(resetQuiz, 450); }

// ── BURGER MENU ──
function toggleMobileMenu(){
  const btn = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  isOpen ? document.documentElement.classList.add('modal-lock') : document.documentElement.classList.remove('modal-lock');
}

// Treatment data and modal functions loaded from js/treatment-data.js

// ── BEFORE / AFTER RESULTS ──
const resultsCases = [
  {
    before: 'img/revolushine-beforeafter/revolushine-beforefillerbibir.jpg', after: 'img/revolushine-beforeafter/revolushine-afterfillerbibir.jpg',
    en: { tagline: 'Lip Filler', title: 'Fuller Lips,<br>Naturally Defined.', copy: 'Lip filler is an injectable treatment that adds volume to the lips for a more balanced, proportionate look. Results are visible immediately once the procedure is complete.' },
    id: { tagline: 'Filler Bibir', title: 'Bibir Lebih Bervolume,<br>Terlihat Natural.', copy: 'Filler bibir adalah treatment injeksi pada area bibir yang bertujuan untuk menambah volume bibir sehingga terlihat lebih proporsional. Hasil filler bibir terlihat langsung ketika tindakan selesai dilakukan.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforescaracne.jpg', after: 'img/revolushine-beforeafter/revolushine-afterscaracne.jpg',
    en: { tagline: 'Scar & Acne Treatment', title: 'Smoother Skin,<br>Scars Minimized.', copy: 'Treatment designed to improve skin texture, minimize acne scars, and stimulate collagen production to enhance overall skin quality. Results typically appear gradually over several months. Repeated sessions are recommended for optimal results as advised by the doctor.' },
    id: { tagline: 'Scar Acne Treatment', title: 'Kulit Lebih Halus,<br>Bekas Minimal.', copy: 'Treatment yang bertujuan untuk memperbaiki tekstur kulit, menyamarkan berkas jerawat, merangsang produksi kolagen untuk membantu meningkatkan dan memperbaiki kualitas kulit. Hasil biasanya terlihat secara bertahap dalam beberapa bulan. Untuk hasil maksimal diperlukan pengulangan secara berkala sesuai saran dari dokter.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforefillerdagu.jpg', after: 'img/revolushine-beforeafter/revolushine-afterfillerdagu.jpg',
    en: { tagline: 'Chin Filler', title: 'Defined Contour,<br>No Surgery.', copy: 'Chin filler is an injectable treatment that adds volume and improves facial contour for a more proportionate appearance. Results are visible immediately once the procedure is complete.' },
    id: { tagline: 'Filler Dagu', title: 'Kontur Wajah Lebih Tegas,<br>Tanpa Operasi.', copy: 'Filler dagu adalah treatment injeksi pada area dagu yang bertujuan untuk menambah volume dan memperbaiki kontur wajah sehingga wajah terlihat lebih proporsional. Hasil filler dagu terlihat langsung ketika tindakan selesai dilakukan.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforeskinbooster.jpg', after: 'img/revolushine-beforeafter/revolushine-afterskinbooster.jpg',
    en: { tagline: 'Skinbooster', title: 'Glowing Skin,<br>From Within.', copy: 'Injectable treatment that improves skin quality — fading dark spots, brightening dull skin, and boosting elasticity — leaving skin healthier, more hydrated, and with longer-lasting makeup. Results are typically visible within 1–3 days after the procedure.' },
    id: { tagline: 'Skinbooster', title: 'Kulit Glowing,<br>Dari Dalam.', copy: 'Treatment injeksi yang bertujuan untuk membantu meningkatkan dan memperbaiki kualitas kulit, seperti menyamarkan noda hitam, mencerahkan kulit kusam, dan membuat kulit lebih kenyal, sehingga kulit tampak lebih sehat, lembap, dan makeup lebih tahan lama. Hasil biasanya terlihat dalam 1–3 hari setelah tindakan.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforehairplasma.jpg', after: 'img/revolushine-beforeafter/revolushine-afterhairplasma.jpg',
    en: { tagline: 'Hair Plasma', title: 'Fuller Hair,<br>Less Shedding.', copy: 'Hair Plasma treatment helps reduce hair loss, stimulate hair growth, and improve hair thickness and density. Results vary per individual and typically require multiple sessions before becoming visible after a few months.' },
    id: { tagline: 'Hair Plasma', title: 'Rambut Lebih Lebat,<br>Kerontokan Berkurang.', copy: 'Hair plasma adalah treatment yang bertujuan untuk membantu mengurangi kerontokan rambut, merangsang pertumbuhan rambut, dan meningkatkan ketebalan maupun kepadatan rambut. Hasil treatment bervariasi pada setiap individu dan biasanya memerlukan beberapa sesi agar hasilnya mulai terlihat setelah beberapa bulan.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforemelasma.jpg', after: 'img/revolushine-beforeafter/revolushine-aftermelasma.jpg',
    en: { tagline: 'Melasma Treatment', title: 'Pigmentation Faded,<br>Brighter Skin.', copy: 'Melasma injection treatment targets and reduces dark pigmentation on the face. Results vary between individuals and may require repeat sessions for optimal outcomes.' },
    id: { tagline: 'Melasma', title: 'Pigmen Teratasi,<br>Wajah Lebih Cerah.', copy: 'Melasma adalah treatment injeksi yang bertujuan untuk menyamarkan pigmen hitam di wajah. Hasil treatment dapat bervariasi pada setiap individu, dan butuh pengulangan treatment untuk hasil yang maksimal.' }
  },
  {
    before: 'img/revolushine-beforeafter/revolushine-beforelifu.jpg', after: 'img/revolushine-beforeafter/revolushine-afterlifu.jpg',
    en: { tagline: 'LIFU', title: 'Defined Contour,<br>No Needles.', copy: 'LIFU targets fat, tightens skin, stimulates collagen production, and provides a lifting effect — all without needles, minimal discomfort, and zero downtime. Results typically appear gradually over weeks to months as the body builds new collagen. For optimal results, periodic sessions are recommended as advised by the doctor.' },
    id: { tagline: 'LIFU', title: 'Wajah Lebih Tegas,<br>Tanpa Jarum.', copy: 'Lifu adalah treatment yang bertujuan untuk membakar lemak, mengencangkan kulit, merangsang produksi kolagen, mempertegas kontur wajah, dan memberikan efek lifting pada wajah. Tanpa jarum, minim rasa sakit, dan tanpa downtime. Hasil lifu biasanya terlihat secara bertahap dalam beberapa minggu hingga bulan, karena tubuh memerlukan waktu untuk membentuk kolagen baru. Untuk hasil maksimal diperlukan pengulangan secara berkala sesuai saran dari dokter.' }
  }
];

let activeCase = 0;

function preloadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadResultsImages() {
  return Promise.all(resultsCases.flatMap(c => [preloadImage(c.before), preloadImage(c.after)]));
}

function switchCase(i) {
  if (i === activeCase) return;
  activeCase = i;
  const c = resultsCases[i];
  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');
  const info = document.getElementById('baInfo');
  if (!beforeImg || !afterImg) return;
  beforeImg.closest('.ba-main').style.opacity = '0.5';
  if (info) info.style.opacity = '0.5';
  setTimeout(() => {
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'id';
    const d = c[lang] || c.en;
    Promise.all([preloadImage(c.before), preloadImage(c.after)]).then(() => {
      beforeImg.src = c.before;
      afterImg.src = c.after;
      const beforeWebp = document.getElementById('baBeforeWebp');
      const afterWebp = document.getElementById('baAfterWebp');
      if (beforeWebp) beforeWebp.srcset = c.before + '.webp';
      if (afterWebp) afterWebp.srcset = c.after + '.webp';
      document.getElementById('baTagline').textContent = d.tagline;
      document.getElementById('baTitle').innerHTML = d.title;
      document.getElementById('baCopy').textContent = d.copy;
      document.querySelectorAll('.ba-thumb').forEach((t, idx) => t.classList.toggle('active', idx === i));
      beforeImg.closest('.ba-main').style.opacity = '1';
      if (info) info.style.opacity = '1';
      setSliderPos(50);
    });
  }, 220);
}

preloadResultsImages();

// ── DRAG COMPARISON SLIDER ──
(function() {
  const slider = document.getElementById('baSlider');
  if (!slider) return;
  const afterImg = document.getElementById('baAfterImg');
  const handle = document.getElementById('baHandle');
  const handleIcon = slider.querySelector('.ba-handle-icon');
  const hint = slider.querySelector('.ba-slide-hint');
  let dragging = false;
  let currentPct = 50;

  function setSliderPos(pct) {
    currentPct = Math.max(2, Math.min(98, pct));
    // Both images are identical absolute layers; only clip-path changes — no scale, no position shift
    afterImg.style.clipPath = 'inset(0 0 0 ' + currentPct + '%)';
    handle.style.left = currentPct + '%';
    if (handleIcon) { handleIcon.style.left = currentPct + '%'; }
    if (hint) hint.style.left = currentPct + '%';
  }

  function getPct(clientX) {
    const rect = slider.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  setSliderPos(50);

  slider.addEventListener('mousedown', e => { dragging = true; setSliderPos(getPct(e.clientX)); e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (dragging) setSliderPos(getPct(e.clientX)); });
  window.addEventListener('mouseup', () => { dragging = false; });

  slider.addEventListener('touchstart', e => { dragging = true; setSliderPos(getPct(e.touches[0].clientX)); e.stopPropagation(); }, { passive: false });
  slider.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); e.stopPropagation(); setSliderPos(getPct(e.touches[0].clientX)); } }, { passive: false });
  slider.addEventListener('touchend', e => { dragging = false; e.stopPropagation(); }, { passive: true });

  window.setSliderPos = setSliderPos;
})();

// ── FAQ ACCORDION ──
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── PROMO SLIDER ──
let promoIdx = 0;
const promoTotal = 4;
let promoTimer;

function goPromo(idx) {
  promoIdx = (idx + promoTotal) % promoTotal;
  const outer = document.querySelector('.promo-track-outer');
  const track = document.getElementById('promoTrack');
  if (track && outer) track.style.transform = 'translateX(-' + (promoIdx * outer.offsetWidth) + 'px)';
  document.querySelectorAll('.promo-dot').forEach((d, i) => d.classList.toggle('active', i === promoIdx));
}

function prevPromo() { clearInterval(promoTimer); goPromo(promoIdx - 1); startPromoAuto(); }
function nextPromo() { clearInterval(promoTimer); goPromo(promoIdx + 1); startPromoAuto(); }

function startPromoAuto() {
  promoTimer = setInterval(() => goPromo(promoIdx + 1), 4500);
}
startPromoAuto();

window.addEventListener('resize', () => { goPromo(promoIdx); });

(function() {
  const track = document.getElementById('promoTrack');
  if (!track) return;
  let sx = 0, sy = 0;
  track.addEventListener('touchstart', e => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
    clearInterval(promoTimer);
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? nextPromo() : prevPromo();
    } else {
      startPromoAuto();
    }
  }, { passive: true });
})();

// ── PROMO LIGHTBOX ──
const promoImages = [
  'img/revolushine-promo/rvl-promo-facial.JPEG',
  'img/revolushine-promo/rvl-promo-facial2.jpg',
  'img/revolushine-promo/rvl-promo-filler.jpg',
  'img/revolushine-promo/rvl-promo-prfl.jpg'
];
let plbIdx = 0;

function _plbRender() {
  const img = document.getElementById('plbImg');
  img.src = promoImages[plbIdx];
  document.querySelectorAll('.plb-dot').forEach((d, i) => d.classList.toggle('active', i === plbIdx));
  const wrap = document.querySelector('.plb-img-wrap');
  if (wrap) wrap.scrollTop = 0;
}

function openPromoModal(idx) {
  plbIdx = idx;
  _plbRender();
  document.getElementById('promoLightbox').classList.add('open');
  document.documentElement.classList.add('modal-lock');
}

function closePromoModal() {
  document.getElementById('promoLightbox').classList.remove('open');
  document.documentElement.classList.remove('modal-lock');
}

function promoModalPrev() { plbIdx = (plbIdx - 1 + promoImages.length) % promoImages.length; _plbRender(); }
function promoModalNext() { plbIdx = (plbIdx + 1) % promoImages.length; _plbRender(); }

document.getElementById('promoLightbox').addEventListener('click', function(e) {
  if (e.target === this) closePromoModal();
});

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('promoLightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closePromoModal();
  if (e.key === 'ArrowLeft') promoModalPrev();
  if (e.key === 'ArrowRight') promoModalNext();
});

(function() {
  let plbSx, plbSy;
  const el = document.getElementById('promoLightbox');
  el.addEventListener('touchstart', e => { plbSx = e.touches[0].clientX; plbSy = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - plbSx;
    const dy = e.changedTouches[0].clientY - plbSy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? promoModalNext() : promoModalPrev();
    }
  }, { passive: true });
})();

// Language switcher loaded from js/i18n.js
