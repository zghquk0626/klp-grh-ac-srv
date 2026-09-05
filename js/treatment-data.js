// ── TREATMENT MODAL DATA ──
const treatmentData = [
  {
    title: 'Skin Rejuvenation & Boosters',
    en: {
      tagline: 'Category 1',
      subtitle: 'Improving skin quality from within \u2014 hydration, brightness, and cell regeneration.',
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
        { name: 'LIFU Face & Neck', desc: 'A non-injectable treatment using ultrasound waves designed to tighten skin, lift, burn fat, and sculpt facial contours \u2014 without surgery, minimal pain, and zero downtime.' },
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
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'id';
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
