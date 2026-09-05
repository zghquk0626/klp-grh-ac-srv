// ── LANGUAGE SWITCHER ──
const translations = {
  en: {
    nav_treatments: 'Treatments', nav_testimonials: 'Testimonials', nav_about: 'Our Doctor',
    nav_quiz: 'Treatment Quiz', nav_book: 'Book Consultation',
    hero_tagline: 'Aesthetic Clinic Surabaya',
    hero_h1: 'Insecure <em>no more.</em>',
    hero_copy: 'Begin your skin journey with Revolushine,<br>where natural radiance is uncovered.',
    btn_quiz: 'Treatment Quiz',
    ba_hint: 'slide',
    card0_desc: 'Improving skin quality from within — hydration, brightness, and cell regeneration.',
    card1_desc: 'Deep cleansing, exfoliation, and skin surface repair for acne and scars.',
    card2_desc: 'Facial structure shaping, fat reduction, and non-surgical skin tightening.',
    card3_desc: 'Precision medical solutions for specific areas and targeted concerns.',
    card4_desc: 'Relaxation and foundational skin maintenance treatments.',
    t_card_read: 'Read More',
    testi_hint: '← slide to see →',
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
    ba_label0: 'Lip Filler', ba_label1: 'Scar & Acne', ba_label2: 'Chin Filler',
    ba_label3: 'Skinbooster', ba_label4: 'Hair Plasma', ba_label5: 'Melasma', ba_label6: 'LIFU',
    treat_tagline: 'Signature Procedures',
    treat_h2: 'Our <em>Treatments.</em>',
    promo_tagline: 'Special Offers',
    promo_h2: 'Promo &amp; <em>Packages.</em>',
    promo_hint: 'tap image to see the details',
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
    about_tagline: 'Our Doctor',
    about_creds: 'Board-Certified Aesthetic Physician',
    about_p1: 'Revolushine was built to bridge the gap between clinical excellence and heartfelt care. Led by Dr. Yoanita, we provide a sanctuary where your concerns are heard, and treatments are meticulously customized.',
    about_p2: 'Her approach isn\'t to fix what isn\'t broken. It\'s to listen deeply, understand fully, and enhance what\'s already there using academic-medical-center protocols. The result never looks like a treatment—it just looks like the best version of you.',
    about_edu_head: 'Education',
    about_edu2: 'American Certified Aesthetic Doctor',
    about_exp_head: 'Experience',
    about_exp_role: 'Owner & Founder',
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
    faq5_a: 'Results vary depending on the treatment. Botox and Rejuve typically last 4\u20136 months. Filler can last around 1 year or more. Skinbooster results can last around 1 month or more depending on the formula used. LIFU results can last up to 6 months.',
    faq6_q: 'Is it safe for pregnant or nursing mothers?',
    faq6_a: 'Pregnant mothers are not recommended to undergo injectable treatments. They may safely have medical facial, Diamond Silk, and LIFU at low energy. For nursing mothers, facial, Diamond Silk, and LIFU at low energy are safe. For injectable treatments such as Skinbooster, Filler, and others, we will conduct a prior consultation as safety data for nursing mothers is still limited. The decision will be tailored to each patient\'s individual condition.',
    foot_desc: 'Safe, evidence-based aesthetic care.<br>#InsecureNoMore',
    foot_nav_h: 'Explore', foot_connect_h: 'Connect',
    foot_wa: 'WhatsApp Consultation',
    foot_address: 'Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Kec. Dukuhpakis, Surabaya.',
    foot_copy: '\u00a9 2026 Revolushine Clinics. All rights reserved.'
  },
  id: {
    nav_treatments: 'Treatment', nav_testimonials: 'Testimoni', nav_about: 'Dokter Kami',
    nav_quiz: 'Treatment Quiz', nav_book: 'Konsultasi Sekarang',
    hero_tagline: 'Klinik Estetika Surabaya',
    hero_h1: 'Tak lagi <em>insecure.</em>',
    hero_copy: 'Mulai perjalanan kulitmu bersama Revolushine,<br>di mana kecantikan alami kamu terpancar.',
    btn_quiz: 'Treatment Quiz',
    ba_hint: 'geser',
    card0_desc: 'Perbaikan kualitas kulit dari dalam, hidrasi, dan regenerasi sel.',
    card1_desc: 'Pembersihan mendalam, eksfoliasi, dan perbaikan permukaan kulit.',
    card2_desc: 'Pembentukan struktur wajah, pembakaran lemak, dan pengencangan kulit.',
    card3_desc: 'Solusi medis presisi untuk area dan kondisi spesifik.',
    card4_desc: 'Perawatan relaksasi dan pemeliharaan kulit dasar.',
    t_card_read: 'Baca Selengkapnya',
    testi_hint: '← geser untuk melihat →',
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
    ba_label0: 'Filler Bibir', ba_label1: 'Scar Acne', ba_label2: 'Filler Dagu',
    ba_label3: 'Skinbooster', ba_label4: 'Hair Plasma', ba_label5: 'Melasma', ba_label6: 'LIFU',
    treat_tagline: 'Prosedur Unggulan',
    treat_h2: 'Treatment <em>Kami.</em>',
    promo_tagline: 'Penawaran Spesial',
    promo_h2: 'Promo &amp; <em>Paket.</em>',
    promo_hint: 'ketuk gambar untuk melihat detail',
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
    about_tagline: 'Dokter Kami',
    about_creds: 'Dokter Estetika Bersertifikat',
    about_p1: 'Revolushine dibangun untuk menjembatani kesenjangan antara keunggulan klinis dan kepedulian yang tulus. Dipimpin oleh Dr. Yoanita, kami menyediakan ruang di mana kekhawatiranmu didengar dan perawatan dirancang khusus untukmu.',
    about_p2: 'Pendekatannya bukan memperbaiki yang tidak rusak. Melainkan mendengarkan dengan sepenuh hati, memahami sepenuhnya, dan menonjolkan apa yang sudah ada menggunakan protokol medis akademis. Hasilnya tidak pernah terlihat seperti treatment\u2014hanya terlihat seperti versi terbaik dari dirimu.',
    about_edu_head: 'Pendidikan',
    about_edu2: 'American Certified Aesthetic Doctor',
    about_exp_head: 'Pengalaman',
    about_exp_role: 'Owner & Founder',
    faq_tagline: 'Ada Pertanyaan?',
    faq_h2: 'Pertanyaan yang Sering<br><em>Ditanyakan.</em>',
    faq1_q: 'Treatment apa saja yang tersedia di Revolushine?',
    faq1_a: 'Revolushine menawarkan berbagai perawatan estetika termasuk Botox, Rejuvenasi, Dermal Filler (bibir, pelipis, pipi & dagu), LIFU Face & Neck, Skinbooster, Subsisi, Medical Facial, Peeling, Diamond Silk, Hair Plasma, Korean Facial, dan lainnya \u2014 semua disesuaikan oleh Dr. Yoanita dengan kebutuhan kulitmu.',
    faq2_q: 'Apakah konsultasi gratis?',
    faq2_a: 'Ya. Konsultasi pertamamu dengan Dr. Yoanita sepenuhnya gratis. Kami percaya bahwa memahami kebutuhanmu lebih penting sebelum merekomendasikan treatment apapun \u2014 tanpa tekanan, tanpa terburu-buru.',
    faq3_q: 'Berapa lama hasil treatmentnya mulai terlihat?',
    faq3_a: 'Hasil treatment biasanya mulai terlihat sekitar 3 hingga 7 hari, bervariasi tergantung treatment apa yang dilakukan. Contohnya: Lifu, hasil mulai terlihat pada hari H hingga sekitar 30 hari kemudian. Skinbooster, botox, dan rejuve biasanya hasil mulai terlihat pada hari ke-3. Facial, hasil akan mulai terlihat pada hari H.',
    faq4_q: 'Apakah ada downtime setelah treatment?',
    faq4_a: 'Ada beberapa treatment yang membutuhkan downtime sekitar 3 hari, seperti Skinbooster Salmon DNA, Subsisi, dan treatment injeksi lainnya tergantung kandungan yang ada dalam Skinboosternya. Untuk Facial, Peeling, Diamond Silk, dan Lifu tidak ada downtime.',
    faq5_q: 'Berapa lama hasil treatment biasanya bertahan?',
    faq5_a: 'Hasil treatment bisa bertahan bervariasi tergantung treatmentnya. Treatment botox dan Rejuve biasanya bisa bertahan 4\u20136 bulan. Treatment filler bisa bertahan sekitar 1 tahun hingga lebih. Treatment Skinbooster bisa bertahan sekitar 1 bulan hingga lebih tergantung kandungan yang ada dalam Skinboosternya. Lifu bisa bertahan hingga 6 bulan.',
    faq6_q: 'Apakah aman untuk ibu hamil dan menyusui?',
    faq6_a: 'Ibu hamil tidak disarankan melakukan treatment injeksi. Ibu hamil cukup melakukan medical facial, Diamond Silk, dan LIFU low energy. Untuk ibu menyusui, facial, Diamond Silk, dan LIFU low energy aman dilakukan. Namun untuk tindakan injeksi seperti Skinbooster, Filler, dan beberapa treatment lainnya, kami akan melakukan konsultasi terlebih dahulu karena data keamanan untuk ibu menyusui masih terbatas. Keputusan tindakan akan disesuaikan dengan kondisi masing-masing pasien.',
    foot_desc: 'Perawatan estetika aman berbasis bukti ilmiah.<br>#InsecureNoMore',
    foot_nav_h: 'Jelajahi', foot_connect_h: 'Hubungi Kami',
    foot_wa: 'Konsultasi via WhatsApp',
    foot_address: 'Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Kec. Dukuhpakis, Surabaya.',
    foot_copy: '\u00a9 2026 Revolushine Clinics. Hak cipta dilindungi.'
  }
};

let currentLang = 'id';

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  if (typeof resultsCases !== 'undefined' && typeof activeCase !== 'undefined') {
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
  }
  const enIds = ['langEn', 'mobileLangEn'];
  const idIds = ['langId', 'mobileLangId'];
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = lang === 'en' ? enIds.includes(btn.id) : idIds.includes(btn.id);
    btn.classList.toggle('active', isActive);
  });
}

setLang('id');
