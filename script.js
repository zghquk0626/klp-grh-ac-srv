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

// ── TREATMENT MODAL DATA ──
const treatmentData = [
  {
    title: 'Skin Rejuvenation & Boosters',
    en: {
      tagline: 'Category 1',
      subtitle: 'Improving skin quality from within — hydration, brightness, and cell regeneration.',
      items: [
        { name: 'Skinbooster (HA Glow / HA Boost / HA Revive)', desc: 'As we age, the body\'s natural Hyaluronic Acid levels decline. This treatment helps hydrate the skin from within, leaving it looking fresher and supporting the skin\'s natural regeneration process.' },
        { name: 'Salmon DNA (PN / PDRN)', desc: 'Helps improve skin moisture levels, brighten the complexion, and improve skin texture.' },
        { name: 'Collagen Stimulator Series', desc: 'Injectable treatment designed to stimulate the body to produce new collagen.' },
        { name: 'Rejuve', desc: 'Injectable treatment designed to smooth fine lines, minimize pores, and keep skin firmer and more youthful.' },
        { name: 'Citrus Glutaglow', desc: 'Treatment designed to fade dark spots from acne scars and hyperpigmentation, and brighten dull skin.' },
        { name: 'Exosome', desc: 'Injectable treatment designed to accelerate the skin cell regeneration process and improve skin elasticity and firmness.' }
      ]
    },
    id: {
      tagline: 'Kategori 1',
      subtitle: 'Fokus pada perbaikan kualitas kulit dari dalam, hidrasi, dan regenerasi sel.',
      items: [
        { name: 'Skinbooster (HA Glow / HA Boost / HA Revive)', desc: 'Seiring bertambahnya usia, kadar <em>Hyaluronic Acid</em> alami tubuh mengalami penurunan. Treatment ini bertujuan untuk membantu menghidrasi kulit dari dalam, sehingga kulit tampak lebih segar dan membantu proses regenerasi kulit.' },
        { name: 'Salmon DNA (PN / PDRN)', desc: 'Membantu meningkatkan kelembaban kulit, mencerahkan kulit, dan memperbaiki tekstur kulit.' },
        { name: 'Collagen Stimulator Series', desc: 'Treatment injeksi yang bertujuan untuk merangsang tubuh memproduksi kolagen baru.' },
        { name: 'Rejuve', desc: 'Treatment injeksi yang bertujuan untuk menyamarkan garis halus, mengecilkan pori-pori, kulit lebih kencang dan awet muda.' },
        { name: 'Citrus Glutaglow', desc: 'Treatment yang bertujuan untuk menyamarkan noda hitam bekas jerawat, flek, dan mencerahkan kulit kusam.' },
        { name: 'Exosome', desc: 'Treatment injeksi yang bertujuan untuk membantu mempercepat proses regenerasi sel kulit, meningkatkan elastisitas dan kekencangan kulit.' }
      ]
    }
  },
  {
    title: 'Clarity, Texture & Peeling',
    en: {
      tagline: 'Category 2',
      subtitle: 'Focused on deep cleansing, exfoliation, and skin surface repair for acne and scars.',
      items: [
        { name: 'Diamond Silk', desc: 'A quick facial that removes dead skin cells while infusing specific serums tailored to your skin needs.' },
        { name: '3-Step Peeling', desc: 'Deep exfoliation to remove dead skin cells, prevent new acne, fade acne scars, and even out skin tone.' },
        { name: 'Plasma', desc: 'Cell regeneration therapy for anti-aging benefits, skin smoothing, and evening out uneven skin tone.' }
      ]
    },
    id: {
      tagline: 'Kategori 2',
      subtitle: 'Fokus pada pembersihan, eksfoliasi, dan perbaikan permukaan kulit (acne & scar).',
      items: [
        { name: 'Diamond Silk', desc: '<em>Quick facial</em> yang bekerja mengangkat sel kulit mati sekaligus menginfuskan serum spesifik yang disesuaikan dengan kebutuhan kulit Anda.' },
        { name: '3-Step Peeling', desc: 'Eksfoliasi mendalam untuk mengangkat sel kulit mati, mencegah timbulnya jerawat baru, menyamarkan noda bekas jerawat, dan meratakan warna kulit.' },
        { name: 'Plasma', desc: 'Terapi regenerasi sel untuk manfaat <em>anti-aging</em>, menghaluskan kulit, serta meratakan warna kulit yang tidak merata.' }
      ]
    }
  },
  {
    title: 'Lifting & Contouring',
    en: {
      tagline: 'Category 3',
      subtitle: 'Treatment focused on shaping, defining, and balancing facial proportions for a slimmer and more symmetrical face.',
      items: [
        { name: 'LIFU Face & Neck', desc: 'A non-injectable treatment using ultrasound waves designed to tighten skin, lift, burn fat, and sculpt facial contours — without surgery, minimal pain, and zero downtime.' },
        { name: 'Fatlysis Pro', desc: 'Injectable treatment designed to reduce fat in specific areas such as the abdomen, arms, cheeks, thighs, and double chin.' },
        { name: 'Jaw Shot / Botox Rahang', desc: 'Botox injection focused on the jaw area to help slim the jaw for a more proportionate look.' },
        { name: 'Filler', desc: 'Injectable treatment designed to add volume, improve contour, and correct hollows on the face. Commonly applied to the Lips, Chin, Jawline, Temples, Under-eyes, Smile Lines, Hands, and other specific areas.' }
      ]
    },
    id: {
      tagline: 'Kategori 3',
      subtitle: 'Treatment yang bertujuan untuk membentuk, mempertegas, dan menyeimbangkan proporsi wajah sehingga wajah lebih tirus dan simetris.',
      items: [
        { name: 'LIFU Face & Neck', desc: 'Treatment non injeksi yang berbasis gelombang ultrasound yang bertujuan untuk mengencangkan, mengangkat, membakar lemak, dan membentuk kontur wajah tanpa operasi, tanpa rasa sakit, dan tanpa downtime.' },
        { name: 'Fatlysis Pro', desc: 'Treatment injeksi yang bertujuan untuk membantu mengurangi lemak pada area tertentu seperti perut, lengan, pipi, paha, dan double chin.' },
        { name: 'Jaw Shot / Botox Rahang', desc: 'Treatment injeksi yang disuntikkan fokus pada area rahang untuk membantu mengecilkan rahang agar terlihat lebih proporsional.' },
        { name: 'Filler', desc: 'Treatment injeksi yang bertujuan untuk menambah volume, memperbaiki kontur, dan mengoreksi cekungan pada wajah. Filler biasa dilakukan pada area Bibir, Dagu, Jawline, Pelipis, Bawah mata, Smile Line, Tangan, dan pada area tertentu.' }
      ]
    }
  },
  {
    title: 'Targeted Specific Solutions',
    en: {
      tagline: 'Category 4',
      subtitle: 'Medical solutions for targeted areas and specific concerns.',
      items: [
        { name: 'Panda Eyes', desc: 'Tightens under-eye skin, improves capillary circulation, brightens dark discoloration, and stimulates collagen for fresher-looking eyes.' },
        { name: 'Hair Plasma', desc: 'Targeted scalp treatment to strengthen hair roots, prevent hair loss, and stimulate new hair growth.' },
        { name: 'Hyperhidrosis', desc: 'Medical solution to inhibit excessive sweat production and significantly reduce body odor concerns.' }
      ]
    },
    id: {
      tagline: 'Kategori 4',
      subtitle: 'Solusi medis untuk area spesifik.',
      items: [
        { name: 'Panda Eyes', desc: 'Mengencangkan kulit area bawah mata, meningkatkan sirkulasi kapiler, mencerahkan warna gelap, dan merangsang kolagen untuk tampilan mata yang lebih segar.' },
        { name: 'Hair Plasma', desc: 'Perawatan spesifik pada kulit kepala untuk memperkuat akar, mencegah kerontokan, dan merangsang pertumbuhan rambut baru.' },
        { name: 'Hyperhidrosis', desc: 'Solusi medis untuk menghambat produksi keringat berlebih dan mengurangi masalah bau badan secara signifikan.' }
      ]
    }
  },
  {
    title: 'Facial Experience',
    en: {
      tagline: 'Category 5',
      subtitle: 'Basic non-injectable treatment designed to deep-cleanse pores, exfoliate dead skin cells, and relax with a full facial, shoulder, back and head massage. Each session takes approximately 2 hours using premium product ranges.',
      items: [
        { name: 'Facial Luxury', desc: 'A facial using premium European-origin skincare products with natural-based formulas for a gentler exfoliation process. Highly suitable for sensitive skin.' },
        { name: 'Facial Korea', desc: 'A facial using Korean skincare products designed to deeply hydrate the skin and help address acne concerns.' }
      ]
    },
    id: {
      tagline: 'Kategori 5',
      subtitle: 'Treatment dasar non injeksi yang bertujuan untuk membersihkan komedo, mengangkat sel kulit mati, membantu menjaga kulit agar tetap bersih, dan merelaksasi diri dengan pijatan wajah, bahu, punggung hingga kepala. Seluruh proses facial menghabiskan waktu sekitar 2 jam dan menggunakan rangkaian produk premium.',
      items: [
        { name: 'Facial Luxury', desc: 'Facial dengan menggunakan rangkaian produk dari Eropa yang berbahan dasar alami dan premium sehingga proses eksfoliasinya lebih ringan. Sangat cocok untuk kulit sensitif.' },
        { name: 'Facial Korea', desc: 'Facial dengan menggunakan rangkaian produk dari Korea yang bertujuan untuk menghidrasi kulit, dan membantu mengatasi jerawat.' }
      ]
    }
  }
];

function openTreatmentModal(index) {
  const data = treatmentData[index];
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const d = data[lang] || data.en;
  document.getElementById('tmodalTagline').textContent = d.tagline;
  document.getElementById('tmodalTitle').textContent = data.title;
  document.getElementById('tmodalSubtitle').textContent = d.subtitle;
  const body = document.getElementById('tmodalBody');
  body.innerHTML = d.items.map((item, i) =>
    (i > 0 ? '<div class="tmodal-sep"></div>' : '') +
    '<div class="tmodal-item">' +
    '<div class="tmodal-item-title">' + item.name + '</div>' +
    '<div class="tmodal-item-desc">' + item.desc + '</div>' +
    '</div>'
  ).join('');
  body.scrollTop = 0;
  document.getElementById('treatmentModal').classList.add('open');
  document.documentElement.classList.add('modal-lock');
}

function closeTreatmentModal() {
  document.getElementById('treatmentModal').classList.remove('open');
  document.documentElement.classList.remove('modal-lock');
}

// Close modal on overlay click
document.getElementById('treatmentModal').addEventListener('click', function(e) {
  if (e.target === this) closeTreatmentModal();
});

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
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const d = c[lang] || c.en;
    Promise.all([preloadImage(c.before), preloadImage(c.after)]).then(() => {
      beforeImg.src = c.before;
      afterImg.src = c.after;
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
  document.getElementById('plbImg').src = promoImages[plbIdx];
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

// ── LANGUAGE SWITCHER ──
const translations = {
  en: {
    // Nav
    nav_treatments: 'Treatments', nav_testimonials: 'Testimonials', nav_about: 'Our Doctor',
    nav_quiz: 'Treatment Quiz', nav_book: 'Book Consultation',
    // Hero
    hero_tagline: 'Aesthetic Clinic Surabaya',
    hero_h1: 'Radiance,<br><em>naturally</em> yours.',
    hero_copy: 'Begin your skin journey with Revolushine,<br>where natural radiance is uncovered.',
    btn_quiz: 'Treatment Quiz',
    // Hero
    hero_h1: 'Insecure <em>no more.</em>',
    ba_hint: 'slide',
    // Treatment carousel
    card0_desc: 'Improving skin quality from within — hydration, brightness, and cell regeneration.',
    card1_desc: 'Deep cleansing, exfoliation, and skin surface repair for acne and scars.',
    card2_desc: 'Facial structure shaping, fat reduction, and non-surgical skin tightening.',
    card3_desc: 'Precision medical solutions for specific areas and targeted concerns.',
    card4_desc: 'Relaxation and foundational skin maintenance treatments.',
    t_card_read: 'Read More',
    // Testimonials
    testi_hint: '← slide to see →',
    // Quiz
    q1_label: 'Question 1 of 2', q1_title: "What's the one thing<br>you'd change about<br>your skin today?",
    q1a_main: 'Fine lines & wrinkles', q1a_sub: "Forehead, between brows, crow's feet",
    q1b_main: 'Lost volume', q1b_sub: 'Thin lips, sunken temples, cheeks & jawline',
    q1c_main: 'Uneven texture', q1c_sub: 'Rough surface, large pores, or bumpy skin',
    q1d_main: 'Dull, dehydrated skin', q1d_sub: 'No glow, tired-looking, lackluster',
    q1e_main: 'Sagging skin, double chin & undefined jawline', q1e_sub: 'Loose skin, undefined jawline, excess fat',
    q1f_main: 'Hair loss', q1f_sub: 'Thinning, shedding, or weak hair growth',
    q1g_main: 'Chubby & double chin', q1g_sub: 'Uneven facial proportions, excess fat',
    q2_label: 'Question 2 of 2', q2_title: 'How do you feel about<br>recovery time?',
    q2a_main: 'Zero downtime', q2a_sub: 'I need to be back to life immediately',
    q2b_main: 'I can handle some downtime', q2b_sub: 'Minor redness or swelling is fine for real change',
    q3_label: 'Question 3 of 3', q3_title: 'What kind of change<br>are you hoping for?',
    q3a_main: 'Refreshed, no dramatic change', q3a_sub: 'I want to feel better without looking different',
    q3b_main: 'Fresher, healthier skin', q3b_sub: 'Better glow, hydration, and overall skin quality',
    q3c_main: 'Better contour & shape', q3c_sub: 'Lift, define, or slim specific features',
    quiz_result_label: 'Your Recommended Treatment', quiz_retry: '← Take the quiz again', quiz_back: '← Back',
    // Before/After labels
    ba_label0: 'Lip Filler', ba_label1: 'Scar & Acne', ba_label2: 'Chin Filler',
    ba_label3: 'Skinbooster', ba_label4: 'Hair Plasma', ba_label5: 'Melasma', ba_label6: 'LIFU',
    // Treatment section
    treat_tagline: 'Signature Procedures',
    treat_h2: 'Our <em>Treatments.</em>',
    // Promo section
    promo_tagline: 'Special Offers',
    promo_h2: 'Promo &amp; <em>Packages.</em>',
    promo_hint: 'tap image to see the details',
    // Testimonials
    testi_tagline: 'Patient Experiences',
    testi_h2: 'Research-Backed<br><em>Outcomes.</em>',
    testi1_quote: '"Highly skilled doctor, excellent products — the results are truly visible."',
    testi1_treat: 'Revolushine',
    testi2_quote: '"After just one facial, the results were already noticeable. Service was excellent too!"',
    testi2_treat: 'Facial',
    testi3_quote: '"Dr. Yoan is so communicative, results are great, and the pricing fits my budget."',
    testi3_treat: 'Revolushine',
    testi4_quote: '"The lip filler results are amazing — so satisfied because it looks completely natural."',
    testi4_treat: 'Lip Filler',
    testi5_quote: '"The service and explanations are excellent. I\'m so comfortable here that I worry no other place will match this experience."',
    testi5_treat: 'Revolushine',
    testi6_quote: '"Fast response and absolutely no upselling. Treatment is recommended based on actual need — no pressure at all."',
    testi6_treat: 'Revolushine',
    testi7_quote: '"Friendly service and such a comfortable facial experience!"',
    testi7_treat: 'Facial',
    testi8_quote: '"The doctor is friendly and communicative — great results at an affordable price."',
    testi8_treat: 'Revolushine',
    testi9_quote: '"I\u2019m Yani from Hong Kong — I travelled here for treatment and was so happy to receive a discount from Dr. Yoan. Thank you, Doc!"',
    testi9_treat: 'Revolushine',
    // About Us
    about_tagline: 'Our Doctor',
    about_creds: 'Board-Certified Aesthetic Physician',
    about_p1: 'Revolushine was built to bridge the gap between clinical excellence and heartfelt care. Led by Dr. Yoanita, we provide a sanctuary where your concerns are heard, and treatments are meticulously customized.',
    about_p2: 'Her approach isn\'t to fix what isn\'t broken. It\'s to listen deeply, understand fully, and enhance what\'s already there using academic-medical-center protocols. The result never looks like a treatment—it just looks like the best version of you.',
    about_edu_head: 'Education',
    about_edu2: 'American Certified Aesthetic Doctor',
    about_exp_head: 'Experience',
    about_exp_role: 'Owner & Founder',
    // FAQ
    faq_tagline: 'Have Questions?',
    faq_h2: 'Frequently Asked<br><em>Questions.</em>',
    faq1_q: 'What treatments does Revolushine offer?',
    faq1_a: 'Revolushine offers a comprehensive range of aesthetic treatments including Botox, Rejuvenation, Dermal Filler (lips, temples, cheeks & chin), LIFU Face & Neck, Skinbooster, Subsisi, Medical Facial, Peeling, Diamond Silk, Hair Plasma, Korean Facial, and more — all tailored by Dr. Yoanita to your unique skin profile and goals.',
    faq2_q: 'Is the consultation free?',
    faq2_a: 'Yes. Your first consultation with Dr. Yoanita is fully complimentary. We believe in understanding your concerns before recommending any treatment — no pressure, no rush.',
    faq3_q: 'When will results start to show?',
    faq3_a: 'Results typically start to appear within 3 to 7 days, varying by treatment. For example: LIFU results can be seen from the day of treatment up to around 30 days later. Skinbooster, Botox, and Rejuve results typically start showing on day 3. Facial results are visible on the same day.',
    faq4_q: 'Is there downtime after treatments?',
    faq4_a: 'Some treatments require around 3 days of downtime, such as Skinbooster Salmon DNA, Subsisi, and other injectable treatments depending on the ingredients used. Facial, Peeling, Diamond Silk, and LIFU have no downtime.',
    faq5_q: 'How long do results typically last?',
    faq5_a: 'Results vary depending on the treatment. Botox and Rejuve typically last 4–6 months. Filler can last around 1 year or more. Skinbooster results can last around 1 month or more depending on the formula used. LIFU results can last up to 6 months.',
    faq6_q: 'Is it safe for pregnant or nursing mothers?',
    faq6_a: 'Pregnant mothers are not recommended to undergo injectable treatments. They may safely have medical facial, Diamond Silk, and LIFU at low energy. For nursing mothers, facial, Diamond Silk, and LIFU at low energy are safe. For injectable treatments such as Skinbooster, Filler, and others, we will conduct a prior consultation as safety data for nursing mothers is still limited. The decision will be tailored to each patient\'s individual condition.',
    // Footer
    foot_desc: 'Safe, evidence-based aesthetic care.<br>#InsecureNoMore',
    foot_nav_h: 'Explore', foot_connect_h: 'Connect',
    foot_wa: 'WhatsApp Consultation',
    foot_address: 'Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Kec. Dukuhpakis, Surabaya.',
    foot_copy: '© 2026 Revolushine Clinics. All rights reserved.'
  },
  id: {
    // Nav
    nav_treatments: 'Treatment', nav_testimonials: 'Testimoni', nav_about: 'Dokter Kami',
    nav_quiz: 'Treatment Quiz', nav_book: 'Konsultasi Sekarang',
    // Hero
    hero_tagline: 'Klinik Estetika Surabaya',
    hero_h1: 'Kecantikan,<br><em>milikmu</em> seutuhnya.',
    hero_copy: 'Mulai perjalanan kulitmu bersama Revolushine,<br>di mana kecantikan alami kamu terpancar.',
    btn_quiz: 'Treatment Quiz',
    // Hero
    hero_h1: 'Tak lagi <em>insecure.</em>',
    ba_hint: 'geser',
    // Treatment carousel
    card0_desc: 'Perbaikan kualitas kulit dari dalam, hidrasi, dan regenerasi sel.',
    card1_desc: 'Pembersihan mendalam, eksfoliasi, dan perbaikan permukaan kulit.',
    card2_desc: 'Pembentukan struktur wajah, pembakaran lemak, dan pengencangan kulit.',
    card3_desc: 'Solusi medis presisi untuk area dan kondisi spesifik.',
    card4_desc: 'Perawatan relaksasi dan pemeliharaan kulit dasar.',
    t_card_read: 'Baca Selengkapnya',
    // Testimonials
    testi_hint: '← geser untuk melihat →',
    // Quiz
    q1_label: 'Pertanyaan 1 dari 2', q1_title: 'Apa yang paling ingin<br>kamu ubah dari<br>kulitmu hari ini?',
    q1a_main: 'Garis halus & kerutan', q1a_sub: 'Dahi, antara alis, sudut mata',
    q1b_main: 'Volume hilang', q1b_sub: 'Bibir tipis, pelipis cekung, pipi & rahang',
    q1c_main: 'Tekstur tidak merata', q1c_sub: 'Permukaan kasar, pori besar, atau kulit berbintil',
    q1d_main: 'Kulit kusam & dehidrasi', q1d_sub: 'Kurang glow, tampak lelah, tidak bercahaya',
    q1e_main: 'Kulit kendur, dagu ganda & jawline kurang tegas', q1e_sub: 'Kulit kendur, garis rahang kurang tegas, lemak berlebih',
    q1f_main: 'Kerontokan rambut', q1f_sub: 'Rambut menipis, rontok, atau pertumbuhan lemah',
    q1g_main: 'Pipi tembem & dagu ganda', q1g_sub: 'Proporsi wajah tidak merata, lemak berlebih',
    q2_label: 'Pertanyaan 2 dari 2', q2_title: 'Bagaimana pendapatmu<br>tentang waktu pemulihan?',
    q2a_main: 'Tanpa downtime', q2a_sub: 'Saya harus langsung beraktivitas setelahnya',
    q2b_main: 'Tidak masalah ada downtime', q2b_sub: 'Sedikit kemerahan atau bengkak tidak apa untuk perubahan nyata',
    q3_label: 'Pertanyaan 3 dari 3', q3_title: 'Perubahan seperti apa<br>yang kamu harapkan?',
    q3a_main: 'Segar, tanpa perubahan dramatis', q3a_sub: 'Ingin terasa lebih baik tanpa terlihat berbeda',
    q3b_main: 'Kulit lebih segar & sehat', q3b_sub: 'Glow lebih baik, terhidrasi, dan kualitas kulit meningkat',
    q3c_main: 'Kontur & bentuk lebih baik', q3c_sub: 'Angkat, definisikan, atau ramping fitur tertentu',
    quiz_result_label: 'Treatment yang Direkomendasikan', quiz_retry: '← Ulangi quiz', quiz_back: '← Kembali',
    // Before/After labels
    ba_label0: 'Filler Bibir', ba_label1: 'Scar Acne', ba_label2: 'Filler Dagu',
    ba_label3: 'Skinbooster', ba_label4: 'Hair Plasma', ba_label5: 'Melasma', ba_label6: 'LIFU',
    // Treatment section
    treat_tagline: 'Prosedur Unggulan',
    treat_h2: 'Treatment <em>Kami.</em>',
    // Promo section
    promo_tagline: 'Penawaran Spesial',
    promo_h2: 'Promo &amp; <em>Paket.</em>',
    promo_hint: 'ketuk gambar untuk melihat detail',
    // Testimonials
    testi_tagline: 'Pengalaman Pasien',
    testi_h2: 'Hasil Terbukti<br><em>Secara Ilmiah.</em>',
    testi1_quote: '"Dokternya kompeten banget, produknya bagus, dan hasilnya memang terlihat nyata."',
    testi1_treat: 'Revolushine',
    testi2_quote: '"Baru sekali facial langsung hasilnya terasa, servicenya juga memuaskan!"',
    testi2_treat: 'Facial',
    testi3_quote: '"Dokter Yoan komunikatif banget, hasilnya sesuai harapan, dan harganya masuk di budget."',
    testi3_treat: 'Revolushine',
    testi4_quote: '"Hasil filler bibirnya bagus banget. Puas karena hasilnya terlihat natural."',
    testi4_treat: 'Filler Bibir',
    testi5_quote: '"Pelayanan dan penjelasannya sangat baik. Sudah cocok di sini, jadi takut tidak akan sepuas ini kalau pindah ke tempat lain."',
    testi5_treat: 'Revolushine',
    testi6_quote: '"Fast respon dan gak ada upselling. Treatment-nya seperlunya aja sesuai kebutuhan, tidak dipaksa-paksa."',
    testi6_treat: 'Revolushine',
    testi7_quote: '"Pelayanannya ramah dan facial-nya nyaman sekali!"',
    testi7_treat: 'Facial',
    testi8_quote: '"Dokternya bersahabat dan komunikatif, harganya juga affordable."',
    testi8_treat: 'Revolushine',
    testi9_quote: '"saya yani dari Hongkong, jauh-jauh datang buat perawatan, happy banget dapat discount dari dokter Yoan, thanks Dok"',
    testi9_treat: 'Revolushine',
    // About Us
    about_tagline: 'Dokter Kami',
    about_creds: 'Dokter Estetika Bersertifikat',
    about_p1: 'Revolushine dibangun untuk menjembatani kesenjangan antara keunggulan klinis dan kepedulian yang tulus. Dipimpin oleh Dr. Yoanita, kami menyediakan ruang di mana kekhawatiranmu didengar dan perawatan dirancang khusus untukmu.',
    about_p2: 'Pendekatannya bukan memperbaiki yang tidak rusak. Melainkan mendengarkan dengan sepenuh hati, memahami sepenuhnya, dan menonjolkan apa yang sudah ada menggunakan protokol medis akademis. Hasilnya tidak pernah terlihat seperti treatment—hanya terlihat seperti versi terbaik dari dirimu.',
    about_edu_head: 'Pendidikan',
    about_edu2: 'American Certified Aesthetic Doctor',
    about_exp_head: 'Pengalaman',
    about_exp_role: 'Owner & Founder',
    // FAQ
    faq_tagline: 'Ada Pertanyaan?',
    faq_h2: 'Pertanyaan yang Sering<br><em>Ditanyakan.</em>',
    faq1_q: 'Treatment apa saja yang tersedia di Revolushine?',
    faq1_a: 'Revolushine menawarkan berbagai perawatan estetika termasuk Botox, Rejuvenasi, Dermal Filler (bibir, pelipis, pipi & dagu), LIFU Face & Neck, Skinbooster, Subsisi, Medical Facial, Peeling, Diamond Silk, Hair Plasma, Korean Facial, dan lainnya — semua disesuaikan oleh Dr. Yoanita dengan kebutuhan kulitmu.',
    faq2_q: 'Apakah konsultasi gratis?',
    faq2_a: 'Ya. Konsultasi pertamamu dengan Dr. Yoanita sepenuhnya gratis. Kami percaya bahwa memahami kebutuhanmu lebih penting sebelum merekomendasikan treatment apapun — tanpa tekanan, tanpa terburu-buru.',
    faq3_q: 'Berapa lama hasil treatmentnya mulai terlihat?',
    faq3_a: 'Hasil treatment biasanya mulai terlihat sekitar 3 hingga 7 hari, bervariasi tergantung treatment apa yang dilakukan. Contohnya: Lifu, hasil mulai terlihat pada hari H hingga sekitar 30 hari kemudian. Skinbooster, botox, dan rejuve biasanya hasil mulai terlihat pada hari ke-3. Facial, hasil akan mulai terlihat pada hari H.',
    faq4_q: 'Apakah ada downtime setelah treatment?',
    faq4_a: 'Ada beberapa treatment yang membutuhkan downtime sekitar 3 hari, seperti Skinbooster Salmon DNA, Subsisi, dan treatment injeksi lainnya tergantung kandungan yang ada dalam Skinboosternya. Untuk Facial, Peeling, Diamond Silk, dan Lifu tidak ada downtime.',
    faq5_q: 'Berapa lama hasil treatment biasanya bertahan?',
    faq5_a: 'Hasil treatment bisa bertahan bervariasi tergantung treatmentnya. Treatment botox dan Rejuve biasanya bisa bertahan 4–6 bulan. Treatment filler bisa bertahan sekitar 1 tahun hingga lebih. Treatment Skinbooster bisa bertahan sekitar 1 bulan hingga lebih tergantung kandungan yang ada dalam Skinboosternya. Lifu bisa bertahan hingga 6 bulan.',
    faq6_q: 'Apakah aman untuk ibu hamil dan menyusui?',
    faq6_a: 'Ibu hamil tidak disarankan melakukan treatment injeksi. Ibu hamil cukup melakukan medical facial, Diamond Silk, dan LIFU low energy. Untuk ibu menyusui, facial, Diamond Silk, dan LIFU low energy aman dilakukan. Namun untuk tindakan injeksi seperti Skinbooster, Filler, dan beberapa treatment lainnya, kami akan melakukan konsultasi terlebih dahulu karena data keamanan untuk ibu menyusui masih terbatas. Keputusan tindakan akan disesuaikan dengan kondisi masing-masing pasien.',
    // Footer
    foot_desc: 'Perawatan estetika aman berbasis bukti ilmiah.<br>#InsecureNoMore',
    foot_nav_h: 'Jelajahi', foot_connect_h: 'Hubungi Kami',
    foot_wa: 'Konsultasi via WhatsApp',
    foot_address: 'Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Kec. Dukuhpakis, Surabaya.',
    foot_copy: '© 2026 Revolushine Clinics. Hak cipta dilindungi.'
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  // Plain text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  // HTML elements (contain em, br, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  // Update active before/after case text
  const c = resultsCases[activeCase];
  if (c) {
    const d = c[lang] || c.en;
    const tagEl = document.getElementById('baTagline');
    const titleEl = document.getElementById('baTitle');
    const copyEl = document.getElementById('baCopy');
    if (tagEl) tagEl.textContent = d.tagline;
    if (titleEl) titleEl.innerHTML = d.title;
    if (copyEl) copyEl.textContent = d.copy;
  }
  // Update lang button states
  const enIds = ['langEn', 'mobileLangEn'];
  const idIds = ['langId', 'mobileLangId'];
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = lang === 'en' ? enIds.includes(btn.id) : idIds.includes(btn.id);
    btn.classList.toggle('active', isActive);
  });
}

// Apply English translations on initial page load
setLang('en');
