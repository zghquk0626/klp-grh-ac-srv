#!/usr/bin/env python3
"""Generate treatment landing pages from template data."""
import json
from pathlib import Path

BUILD_STAMP = "<!-- Build date: 20260919083945 -->"

TREATMENTS = [
    {
        "slug": "skin-rejuvenation",
        "idx": 0,
        "title_id": "Skin Rejuvenation & Skinbooster Surabaya | Aesthetic Clinic Revolushine",
        "title_en": "Skin Rejuvenation & Skinbooster Surabaya | Aesthetic Clinic Revolushine",
        "desc_id": "Treatment skin rejuvenation & skinbooster di Aesthetic Clinic Revolushine Surabaya: HA Glow, Salmon DNA, Rejuve, Collagen Stimulator, Exosome & Citrus Glutaglow. Konsultasi gratis!",
        "h1_id": "Skin Rejuvenation & Skinbooster Surabaya",
        "h1_en": "Skin Rejuvenation & Skinbooster Surabaya",
        "img": "img/treatments/1.rev-skinbooster.jpg",
        "img_webp": "img/treatments/1.rev-skinbooster.webp",
        "img_w": 724, "img_h": 483,
        "desc_long_id": "Treatment skin rejuvenation di Aesthetic Clinic Revolushine Surabaya fokus pada perbaikan kualitas kulit dari dalam, hidrasi, dan regenerasi sel. Dilakukan oleh dr. Yoanita Budiwiyono dengan produk dan protokol medis terbaik.",
        "desc_long_en": "Skin rejuvenation treatments at Aesthetic Clinic Revolushine Surabaya focus on improving skin quality from within \u2014 hydration, radiance, and cell regeneration. Performed by dr. Yoanita Budiwiyono using premium medical protocols and certified products.",
        "items_id": [
            {"name": "Skinbooster (HA Glow / HA Boost / HA Revive)", "desc": "Seiring bertambahnya usia, kadar Hyaluronic Acid alami tubuh mengalami penurunan. Treatment ini bertujuan untuk membantu menghidrasi kulit dari dalam, sehingga kulit tampak lebih segar dan membantu proses regenerasi kulit."},
            {"name": "Salmon DNA (PN / PDRN)", "desc": "Membantu meningkatkan kelembaban kulit, mencerahkan kulit, dan memperbaiki tekstur kulit."},
            {"name": "Collagen Stimulator Series", "desc": "Treatment injeksi yang bertujuan untuk merangsang tubuh memproduksi kolagen baru."},
            {"name": "Rejuve", "desc": "Treatment injeksi yang bertujuan untuk menyamarkan garis halus, mengecilkan pori-pori, kulit lebih kencang dan awet muda."},
            {"name": "Citrus Glutaglow", "desc": "Treatment yang bertujuan untuk menyamarkan noda hitam bekas jerawat, flek, dan mencerahkan kulit kusam."},
            {"name": "Exosome", "desc": "Treatment injeksi yang bertujuan untuk membantu mempercepat proses regenerasi sel kulit, meningkatkan elastisitas dan kekencangan kulit."}
        ],
        "enrich_id": {
            "intro": [
                "Treatment skin rejuvenation & skinbooster di Aesthetic Clinic Revolushine Surabaya dirancang untuk memperbaiki kualitas kulit dari dalam — mulai dari hidrasi, kecerahan, hingga regenerasi sel. Kategori ini cocok untuk kamu yang mengalami kulit kusam, garis halus tipis, pori-pori membesar, atau penurunan elastisitas ringan.",
                "Semua treatment dikerjakan langsung oleh dr. Yoanita Budiwiyono, American Certified Aesthetic Doctor, dengan protokol medis berbasis bukti ilmiah dan produk bersertifikat. Konsultasi pertama sepenuhnya gratis dan tanpa tekanan, sehingga kamu bisa memahami kondisi kulitmu dan memilih treatment yang paling sesuai.",
                "Sebagian besar treatment di kategori ini memiliki downtime yang minimal atau bahkan tanpa downtime sama sekali. Beberapa hasil sudah dapat dirasakan pada hari yang sama, sebagian lainnya mulai terlihat dalam 3 hingga 7 hari setelah treatment."
            ],
            "faq": [
                ["Siapa yang cocok untuk treatment skin rejuvenation?", "Cocok untuk kamu yang mulai merasakan kulit kusam, garis halus, pori-pori besar, atau kelembaban kulit menurun. Treatment ini bekerja untuk semua jenis kulit dan disesuaikan oleh dokter dengan kebutuhan masing-masing pasien."],
                ["Apakah treatment ini ada downtime?", "Kebanyakan treatment di kategori ini tanpa downtime atau hanya minimal downtime. Kamu bisa langsung kembali beraktivitas setelah treatment sesuai arahan dokter."],
                ["Kapan hasil mulai terlihat?", "Beberapa treatment menunjukkan hasil pada hari yang sama, sementara lainnya mulai terlihat dalam 3 hingga 7 hari. Hasil optimal seringkali tercapai setelah beberapa kali treatment secara berkala."],
                ["Apakah boleh dilakukan treatment berulang?", "Ya, perawatan seperti skinbooster dan treatment regeneratif umumnya dilakukan secara berkala agar kualitas kulit tetap terjaga. Dokter akan menyusun rencana perawatan berdasarkan kondisi dan tujuan kulitmu."]
            ]
        },
        "enrich_en": {
            "intro": [
                "Skin rejuvenation & skinbooster treatments at Aesthetic Clinic Revolushine Surabaya are designed to improve your skin quality from within \u2014 hydration, radiance, and cell regeneration. This category suits you if you're dealing with dull skin, fine lines, enlarged pores, or a mild loss of elasticity.",
                "All treatments are performed personally by dr. Yoanita Budiwiyono, an American Certified Aesthetic Doctor, using evidence-based medical protocols and certified products. Your first consultation is completely free and pressure-free, so you can understand your skin's condition and choose the treatment that fits best.",
                "Most treatments in this category involve minimal or even zero downtime. Some results are noticeable on the same day, while others begin to show within 3 to 7 days after treatment."
            ],
            "faq": [
                ["Who is skin rejuvenation suitable for?", "It's suitable for you if you're starting to notice dull skin, fine lines, enlarged pores, or reduced skin hydration. The treatment works on all skin types and is tailored by the doctor to each patient's needs."],
                ["Is there any downtime?", "Most treatments in this category have no downtime or only minimal downtime. You can return to your daily activities right after the treatment as directed by the doctor."],
                ["When will results start to show?", "Some treatments show results on the same day, while others begin to appear within 3 to 7 days. Optimal results are often achieved after several treatments done regularly."],
                ["Can the treatment be repeated?", "Yes, regenerative treatments such as skinbooster are generally performed on a regular schedule to maintain skin quality. The doctor will design a treatment plan based on your skin condition and goals."]
            ]
        },
    },
    {
        "slug": "clarity-texture",
        "idx": 1,
        "title_id": "Diamond Silk & Peeling Surabaya | Aesthetic Clinic Revolushine",
        "title_en": "Diamond Silk & Peeling Surabaya | Aesthetic Clinic Revolushine",
        "desc_id": "Treatment Diamond Silk, 3-Step Peeling & Plasma di Aesthetic Clinic Revolushine Surabaya untuk kulit bersih, acne scar berkurang, dan tekstur kulit merata.",
        "h1_id": "Diamond Silk & Peeling Surabaya",
        "h1_en": "Diamond Silk & Peeling Surabaya",
        "img": "img/treatments/2.rev-skinpeel.jpg",
        "img_webp": "img/treatments/2.rev-skinpeel.webp",
        "img_w": 724, "img_h": 483,
        "desc_long_id": "Treatment clarity, texture & peeling di Aesthetic Clinic Revolushine Surabaya fokus pada pembersihan mendalam, eksfoliasi, dan perbaikan permukaan kulit untuk acne dan scar.",
        "desc_long_en": "Clarity, texture & peeling treatments at Aesthetic Clinic Revolushine Surabaya focus on deep cleansing, exfoliation, and skin surface repair for acne and scars.",
        "items_id": [
            {"name": "Diamond Silk", "desc": "Quick facial yang bekerja mengangkat sel kulit mati sekaligus menginfuskan serum spesifik yang disesuaikan dengan kebutuhan kulit Anda."},
            {"name": "3-Step Peeling", "desc": "Eksfoliasi mendalam untuk mengangkat sel kulit mati, mencegah timbulnya jerawat baru, menyamarkan noda bekas jerawat, dan meratakan warna kulit."},
            {"name": "Plasma", "desc": "Terapi regenerasi sel untuk manfaat anti-aging, menghaluskan kulit, serta meratakan warna kulit yang tidak merata."}
        ],
        "enrich_id": {
            "intro": [
                "Kategori clarity, texture & peeling di Aesthetic Clinic Revolushine Surabaya berfokus pada pembersihan mendalam, eksfoliasi kulit, dan perbaikan permukaan kulit — solusi utama untuk masalah jerawat aktif, bekas jerawat (acne scar), tekstur kasar, dan warna kulit yang tidak merata.",
                "Setiap treatment dikerjakan oleh dr. Yoanita Budiwiyono dengan metode medis yang terbukti efektif dan disesuaikan dengan jenis kulit, termasuk kulit berminyak maupun kulit sensitif. Konsultasi awal dijamin gratis untuk memastikan treatment yang dipilih tepat sasaran.",
                "Untuk hasil terbaik, sebagian treatment di kategori ini membutuhkan satu hingga beberapa kali sesi. Hasil biasanya mulai terlihat dalam beberapa hari hingga beberapa minggu, tergantung jenis treatment yang dilakukan."
            ],
            "faq": [
                ["Apakah treatment ini bisa menghilangkan bekas jerawat?", "3-Step Peeling dan Plasma dapat membantu menyamarkan noda bekas jerawat dan meratakan warna kulit secara bertahap. Hasil optimal biasanya membutuhkan beberapa sesi sesuai anjuran dokter."],
                ["Apakah ada downtime setelah peeling?", "Diamond Silk tidak membutuhkan downtime. Untuk 3-Step Peeling, mungkin terdapat sedikit kemerahan selama 1 hingga 3 hari yang umumnya bisa ditutupi dengan skincare."],
                ["Apakah aman untuk kulit berminyak atau berjerawat?", "Treatment di kategori ini dirancang khusus untuk mengatasi jerawat dan tekstur kulit, sehingga umumnya aman dan bermanfaat untuk kulit berminyak. Intensitasnya akan disesuaikan dokter dengan kondisi kulitmu."],
                ["Bagaimana dengan kulit sensitif?", "Diamond Silk sangat ringan dan cocok untuk kulit sensitif. Untuk Peeling, dokter akan menyesuaikan formula dan intensitas agar tetap nyaman dan aman."]
            ]
        },
        "enrich_en": {
            "intro": [
                "The clarity, texture & peeling category at Aesthetic Clinic Revolushine Surabaya focuses on deep cleansing, skin exfoliation, and surface repair \u2014 the key solutions for active acne, acne scars, rough texture, and uneven skin tone.",
                "Every treatment is performed by dr. Yoanita Budiwiyono using proven medical methods tailored to your skin type, including oily and sensitive skin. The initial consultation is guaranteed free to make sure the treatment you choose is right on target.",
                "For best results, some treatments in this category require one to several sessions. Results usually begin to show within a few days to a few weeks, depending on the treatment performed."
            ],
            "faq": [
                ["Can this treatment fade acne scars?", "3-Step Peeling and Plasma help to gradually fade acne scar marks and even out skin tone. Optimal results usually require several sessions as recommended by the doctor."],
                ["Is there any downtime after peeling?", "Diamond Silk requires no downtime. For 3-Step Peeling, there may be slight redness for 1 to 3 days, which can usually be covered with skincare."],
                ["Is it safe for oily or acne-prone skin?", "Treatments in this category are designed specifically to address acne and skin texture, so they are generally safe and beneficial for oily skin. The intensity will be adjusted by the doctor to suit your skin."],
                ["What about sensitive skin?", "Diamond Silk is very gentle and suitable for sensitive skin. For peeling, the doctor will adjust the formula and intensity so it stays comfortable and safe."]
            ]
        },
    },
    {
        "slug": "lifting-contouring",
        "idx": 2,
        "title_id": "LIFU, Filler & Contouring Surabaya | Aesthetic Clinic Revolushine",
        "title_en": "LIFU, Filler & Contouring Surabaya | Aesthetic Clinic Revolushine",
        "desc_id": "Treatment LIFU, Filler, Jaw Shot & Fatlysis Pro di Aesthetic Clinic Revolushine Surabaya untuk wajah lebih tirus, kontur tegas, tanpa operasi.",
        "h1_id": "LIFU, Filler & Contouring Surabaya",
        "h1_en": "LIFU, Filler & Contouring Surabaya",
        "img": "img/treatments/3.rev-skinlift.jpg",
        "img_webp": "img/treatments/3.rev-skinlift.webp",
        "img_w": 724, "img_h": 483,
        "desc_long_id": "Treatment lifting & contouring di Aesthetic Clinic Revolushine Surabaya bertujuan untuk membentuk, mempertegas, dan menyeimbangkan proporsi wajah sehingga wajah lebih tirus dan simetris.",
        "desc_long_en": "Lifting & contouring treatments at Aesthetic Clinic Revolushine Surabaya aim to shape, define, and balance facial proportions for a slimmer, more symmetrical face.",
        "items_id": [
            {"name": "LIFU Face & Neck", "desc": "Treatment non injeksi yang berbasis gelombang ultrasound yang bertujuan untuk mengencangkan, mengangkat, membakar lemak, dan membentuk kontur wajah tanpa operasi, tanpa rasa sakit, dan tanpa downtime."},
            {"name": "Fatlysis Pro", "desc": "Treatment injeksi yang bertujuan untuk membantu mengurangi lemak pada area tertentu seperti perut, lengan, pipi, paha, dan double chin."},
            {"name": "Jaw Shot / Botox Rahang", "desc": "Treatment injeksi yang disuntikkan fokus pada area rahang untuk membantu mengecilkan rahang agar terlihat lebih proporsional."},
            {"name": "Filler", "desc": "Treatment injeksi yang bertujuan untuk menambah volume, memperbaiki kontur, dan mengoreksi cekungan pada wajah. Filler biasa dilakukan pada area Bibir, Dagu, Jawline, Pelipis, Bawah mata, Smile Line, Tangan, dan pada area tertentu."}
        ],
        "enrich_id": {
            "intro": [
                "Treatment lifting & contouring di Aesthetic Clinic Revolushine Surabaya bertujuan untuk membentuk, mempertegas, dan menyeimbangkan proporsi wajah — tanpa operasi, tanpa rasa sakit, dan dengan downtime yang minimal.",
                "Pilihan treatment mencakup LIFU (ultrasound non-injeksi), Fatlysis Pro (injeksi penghancur lemak), Jaw Shot / Botox Rahang, serta Dermal Filler untuk penambahan volume dan koreksi area seperti bibir, dagu, pelipis, dan bawah mata.",
                "Seluruh prosedur dilakukan langsung oleh dr. Yoanita Budiwiyono dengan pendekatan natural — hasilnya terlihat seperti versi terbaik dari dirimu, bukan berlebihan. Konsultasi awal membantu menentukan treatment yang paling sesuai dengan struktur wajahmu."
            ],
            "faq": [
                ["Apakah LIFU terasa sakit?", "LIFU umumnya nyaman dan hanya terasa hangat atau ringan. Tidak diperlukan anestesi, dan setelah treatment kamu bisa langsung beraktivitas."],
                ["Kapan hasil filler mulai terlihat?", "Hasil filler terlihat langsung setelah treatment. Bentuk akhir umumnya stabil dalam 1 hingga 2 minggu setelah pembengkakan mereda."],
                ["Bagaimana risiko dari filler?", "Risiko minimal jika dilakukan oleh dokter bersertifikat. Dapat terjadi sedikit bengkak atau memar yang biasanya hilang dalam beberapa hari."],
                ["Siapa yang paling cocok untuk treatment lifting?", "Cocok untuk kamu yang menginginkan pengencangan wajah non-invasif, pengurangan lemak pada wajah atau rahang, atau penambahan volume secara alami tanpa prosedur bedah."]
            ]
        },
        "enrich_en": {
            "intro": [
                "Lifting & contouring treatments at Aesthetic Clinic Revolushine Surabaya aim to shape, define, and balance facial proportions \u2014 without surgery, without pain, and with minimal downtime.",
                "Treatment options include LIFU (non-injectable ultrasound), Fatlysis Pro (injectable fat reduction), Jaw Shot / jaw Botox, and Dermal Filler to add volume and correct areas such as the lips, chin, temples, and under-eyes.",
                "All procedures are performed personally by dr. Yoanita Budiwiyono with a natural approach \u2014 the result looks like the best version of you, never overdone. An initial consultation helps determine the treatment that best suits your facial structure."
            ],
            "faq": [
                ["Is LIFU painful?", "LIFU is generally comfortable and only feels warm or mild. No anesthesia is needed, and you can return to activities right after the treatment."],
                ["When will filler results start to show?", "Filler results are visible immediately after the treatment. The final shape usually stabilizes within 1 to 2 weeks once swelling subsides."],
                ["What are the risks of filler?", "Risks are minimal when performed by a certified doctor. Some slight swelling or bruising may occur and usually resolves within a few days."],
                ["Who is lifting treatment most suitable for?", "It suits you if you want non-invasive facial tightening, reduction of facial or jaw fat, or natural volume enhancement without surgical procedures."]
            ]
        },
    },
    {
        "slug": "targeted-solutions",
        "idx": 3,
        "title_id": "Hair Plasma & Panda Eyes Surabaya | Aesthetic Clinic Revolushine",
        "title_en": "Hair Plasma & Panda Eyes Surabaya | Aesthetic Clinic Revolushine",
        "desc_id": "Treatment Hair Plasma, Panda Eyes & Hyperhidrosis di Aesthetic Clinic Revolushine Surabaya untuk rambut lebih lebat dan mata lebih segar.",
        "h1_id": "Hair Plasma & Panda Eyes Surabaya",
        "h1_en": "Hair Plasma & Panda Eyes Surabaya",
        "img": "img/treatments/4.rev-hairplasma.jpg",
        "img_webp": "img/treatments/4.rev-hairplasma.webp",
        "img_w": 724, "img_h": 483,
        "desc_long_id": "Solusi medis presisi untuk area spesifik di Aesthetic Clinic Revolushine Surabaya: Hair Plasma untuk rambut, Panda Eyes untuk mata, dan Hyperhidrosis untuk keringat berlebih.",
        "desc_long_en": "Precision medical solutions for specific areas at Aesthetic Clinic Revolushine Surabaya: Hair Plasma for the scalp, Panda Eyes for the under-eye area, and Hyperhidrosis for excessive sweating.",
        "items_id": [
            {"name": "Panda Eyes", "desc": "Mengencangkan kulit area bawah mata, meningkatkan sirkulasi kapiler, mencerahkan warna gelap, dan merangsang kolagen untuk tampilan mata yang lebih segar."},
            {"name": "Hair Plasma", "desc": "Perawatan spesifik pada kulit kepala untuk memperkuat akar, mencegah kerontokan, dan merangsang pertumbuhan rambut baru."},
            {"name": "Hyperhidrosis", "desc": "Solusi medis untuk menghambat produksi keringat berlebih dan mengurangi masalah bau badan secara signifikan."}
        ],
        "enrich_id": {
            "intro": [
                "Kategori targeted solutions di Aesthetic Clinic Revolushine Surabaya menawarkan solusi medis presisi untuk kondisi dan area yang spesifik — Panda Eyes untuk area bawah mata, Hair Plasma untuk kesehatan rambut, dan Hyperhidrosis untuk keringat berlebih.",
                "Solusi-solusi ini dirancang untuk masalah yang membutuhkan pendekatan lebih terfokus, melampaui perawatan wajah umum. Seluruh prosedur dilakukan oleh dr. Yoanita dengan standar medis yang terbukti dan peralatan yang aman.",
                "Konsultasi awal diperlukan untuk memastikan kondisi kamu cocok dengan salah satu solusi di atas, sekaligus merencanakan jumlah sesi yang dibutuhkan untuk hasil yang terbaik."
            ],
            "faq": [
                ["Apakah treatment Panda Eyes memerlukan downtime?", "Sebagian pasien mengalami sedikit kemerahan atau bengkak ringan di area bawah mata selama 1 hingga 2 hari, namun biasanya bisa ditutupi dan tidak mengganggu aktivitas harian."],
                ["Apakah Hair Plasma harus dilakukan berkali-kali?", "Ya, hasil optimal biasanya membutuhkan beberapa sesi. Jumlah sesi akan ditentukan dokter berdasarkan kondisi rambut kamu setelah konsultasi."],
                ["Apakah treatment Hyperhidrosis menyakitkan?", "Treatment ini umumnya nyaman. Pengurangan keringat berlebih biasanya mulai dirasakan dalam beberapa hari setelah prosedur."],
                ["Siapa yang paling cocok untuk treatment ini?", "Cocok untuk kamu yang memiliki masalah spesifik: area bawah mata gelap, rambut rontok, atau keringat berlebih yang sudah mengganggu aktivitas sehari-hari."]
            ]
        },
        "enrich_en": {
            "intro": [
                "The targeted solutions category at Aesthetic Clinic Revolushine Surabaya offers precision medical solutions for specific conditions and areas \u2014 Panda Eyes for the under-eye area, Hair Plasma for hair health, and Hyperhidrosis for excessive sweating.",
                "These solutions are designed for concerns that need a more focused approach, going beyond general facial care. All procedures are performed by dr. Yoanita using proven medical standards and safe equipment.",
                "An initial consultation is needed to confirm that your condition matches one of the solutions above, and to plan the number of sessions required for the best results."
            ],
            "faq": [
                ["Does Panda Eyes treatment require downtime?", "Some patients experience slight redness or mild swelling in the under-eye area for 1 to 2 days, but these can usually be covered and do not interfere with daily activities."],
                ["Does Hair Plasma need to be done repeatedly?", "Yes, optimal results usually require several sessions. The number of sessions is determined by the doctor based on your hair condition after the consultation."],
                ["Is the Hyperhidrosis treatment painful?", "This treatment is generally comfortable. The reduction of excessive sweating is usually noticed within a few days after the procedure."],
                ["Who is most suitable for this treatment?", "It suits anyone with a specific concern: dark under-eye area, hair loss, or excessive sweating that already interferes with daily life."]
            ]
        },
    },
    {
        "slug": "facial-experience",
        "idx": 4,
        "title_id": "Facial Surabaya | Aesthetic Clinic Revolushine",
        "title_en": "Facial Surabaya | Aesthetic Clinic Revolushine",
        "desc_id": "Facial Luxury & Facial Korea di Aesthetic Clinic Revolushine Surabaya dengan produk premium, pijatan relaksasi, dan hasil kulit lebih bersih.",
        "h1_id": "Facial Surabaya",
        "h1_en": "Facial Surabaya",
        "img": "img/treatments/5.rev-facial.jpg",
        "img_webp": "img/treatments/5.rev-facial.webp",
        "img_w": 724, "img_h": 483,
        "desc_long_id": "Treatment facial di Aesthetic Clinic Revolushine Surabaya menggunakan rangkaian produk premium untuk deep cleansing, eksfoliasi, dan relaksasi dengan pijatan wajah, bahu, punggung hingga kepala.",
        "desc_long_en": "Facial treatments at Aesthetic Clinic Revolushine Surabaya use a premium product range for deep cleansing, exfoliation, and relaxation with a massage of the face, shoulders, back, and head.",
        "items_id": [
            {"name": "Facial Luxury", "desc": "Facial dengan menggunakan rangkaian produk dari Eropa yang berbahan dasar alami dan premium sehingga proses eksfoliasinya lebih ringan. Sangat cocok untuk kulit sensitif."},
            {"name": "Facial Korea", "desc": "Facial dengan menggunakan rangkaian produk dari Korea yang bertujuan untuk menghidrasi kulit, dan membantu mengatasi jerawat."}
        ],
        "enrich_id": {
            "intro": [
                "Facial experience di Aesthetic Clinic Revolushine Surabaya menawarkan perawatan relaksasi dan pemeliharaan kulit dasar — deep cleansing, eksfoliasi lembut, hingga pijatan menyeluruh pada wajah, bahu, punggung, dan kepala.",
                "Dua pilihan utama adalah Facial Luxury dengan rangkaian produk Eropa berbahan dasar alami yang sangat cocok untuk kulit sensitif, serta Facial Korea dengan produk Korea untuk hidrasi mendalam dan membantu mengatasi jerawat.",
                "Setiap sesi berlangsung sekitar 2 jam menggunakan rangkaian produk premium, dikerjakan langsung oleh dr. Yoanita. Treatment ini cocok untuk perawatan rutin, relaksasi setelah beraktivitas, atau hadiah istimewa untuk diri sendiri."
            ],
            "faq": [
                ["Apakah facial memerlukan downtime?", "Tidak ada downtime. Kulit terlihat segar langsung setelah treatment. Beberapa pasien memilih untuk tidak ber-makeup selama beberapa jam demi hasil yang maksimal."],
                ["Apakah facial boleh dilakukan secara rutin?", "Ya, facial dapat dilakukan secara rutin, misalnya 1 hingga 2 bulan sekali, untuk menjaga kesehatan kulit. Dokter akan menyesuaikan jadwal dan jenis facial dengan kondisi kulitmu."],
                ["Apakah aman untuk kulit sensitif?", "Facial Luxury dirancang khusus dengan produk alami yang sangat lembut sehingga sangat cocok untuk kulit sensitif. Konsultasi sebelum treatment selalu dianjurkan."],
                ["Apakah facial dapat mengatasi jerawat?", "Facial Korea diformulasikan untuk membantu menghidrasi kulit dan membantu mengatasi jerawat. Untuk jerawat aktif yang parah, dokter mungkin merekomendasikan treatment lain yang lebih sesuai."]
            ]
        },
        "enrich_en": {
            "intro": [
                "The facial experience at Aesthetic Clinic Revolushine Surabaya offers relaxation and foundational skin maintenance \u2014 deep cleansing, gentle exfoliation, and a full massage of the face, shoulders, back, and head.",
                "The two main options are Facial Luxury, using natural, premium European products that are ideal for sensitive skin, and Facial Korea, using Korean products for deep hydration and help with acne.",
                "Each session lasts around 2 hours using premium products and is performed personally by dr. Yoanita. This treatment is perfect for regular maintenance, relaxation after a busy day, or a special treat for yourself."
            ],
            "faq": [
                ["Does a facial require downtime?", "No. Your skin looks fresh right after the treatment. Some patients prefer to skip makeup for a few hours for maximum results."],
                ["Can facials be done regularly?", "Yes, facials can be done regularly, for example once every 1 to 2 months, to maintain skin health. The doctor will adjust the schedule and facial type to your skin condition."],
                ["Is it safe for sensitive skin?", "Facial Luxury is specially designed with very gentle natural products, making it ideal for sensitive skin. A consultation before treatment is always recommended."],
                ["Can a facial treat acne?", "Facial Korea is formulated to help hydrate the skin and help with acne. For severe active acne, the doctor may recommend a more suitable treatment."]
            ]
        },
    },
]

def _enrich_intro_html(t):
    return "".join(
        f"<p style='font-size:17px;line-height:1.8;color:#4a3a46;margin:0 0 14px;'>{p}</p>"
        for p in t["enrich_id"]["intro"]
    )

def _enrich_items_html(t):
    # Static (server-rendered) item cards — overridden by JS with the active language.
    return "".join(
        "<div style='background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);'>"
        f"<h3 style='font-size:19px;margin:0 0 8px;color:#333;'>{it['name']}</h3>"
        f"<p style='margin:0;color:#666;line-height:1.7;'>{it['desc']}</p></div>"
        for it in t["items_id"]
    )

def _enrich_faq_html(t):
    return "".join(
        "<div style='background:#fff;border-radius:12px;padding:20px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);'>"
        f"<h3 style='font-size:18px;margin:0 0 6px;color:var(--text-main);'>{q}</h3>"
        f"<p style='margin:0;color:#666;line-height:1.7;'>{a}</p></div>"
        for q, a in t["enrich_id"]["faq"]
    )

def _page_json(t):
    # Bilingual copy for the client-side re-render on language switch.
    return json.dumps({
        "h1": {"id": t["h1_id"], "en": t["h1_en"]},
        "desc": {"id": t["desc_long_id"], "en": t["desc_long_en"]},
        "intro": {"id": t["enrich_id"]["intro"], "en": t["enrich_en"]["intro"]},
        "faq": {"id": t["enrich_id"]["faq"], "en": t["enrich_en"]["faq"]},
    }, ensure_ascii=False)

def generate_page(t):
    intro_html = _enrich_intro_html(t)
    items_html = _enrich_items_html(t)
    faq_html = _enrich_faq_html(t)
    page_json = _page_json(t)
    return f'''<!DOCTYPE html>
{BUILD_STAMP}
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{t["title_id"]}</title>
<meta name="description" content="{t["desc_id"]}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://revolushine.id/treatments/{t["slug"]}.html" />
<link rel="alternate" hreflang="id" href="https://revolushine.id/treatments/{t["slug"]}.html" />
<link rel="alternate" hreflang="en" href="https://revolushine.id/treatments/{t["slug"]}.html?lang=en" />
<link rel="alternate" hreflang="x-default" href="https://revolushine.id/treatments/{t["slug"]}.html" />
<meta property="og:title" content="{t["title_id"]}" />
<meta property="og:description" content="{t["desc_id"]}" />
<meta property="og:image" content="https://revolushine.id/{t["img"]}" />
<meta property="og:url" content="https://revolushine.id/treatments/{t["slug"]}.html" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="id_ID" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{t["title_id"]}" />
<meta name="twitter:description" content="{t["desc_id"]}" />
<meta name="twitter:image" content="https://revolushine.id/{t["img"]}" />
<meta name="theme-color" content="#25d366" />
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preload" as="font" type="font/ttf" href="../font/FuturaCyrillicBold.ttf" crossorigin>
<link rel="icon" type="image/png" href="../img/rev-icon-web.png" />
<link rel="apple-touch-icon" href="../img/rev-icon-web.png" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6V0XLB1LF7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-6V0XLB1LF7');
</script>
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)}};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '4473264393002216');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=4473264393002216&ev=PageView&noscript=1" /></noscript>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Aesthetic Clinic Revolushine",
  "url": "https://revolushine.id/",
  "description": "Klinik kecantikan Aesthetic Clinic Revolushine di Graha Famili Surabaya oleh dr. Yoanita Budiwiyono.",
  "telephone": "+6287736386388",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A",
    "addressLocality": "Pradahkalikendal, Dukuhpakis",
    "addressRegion": "Surabaya",
    "postalCode": "60221",
    "addressCountry": "ID"
  }},
  "geo": {{
    "@type": "GeoCoordinates",
    "latitude": -7.2824,
    "longitude": 112.6732
  }},
  "openingHoursSpecification": [{{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "20:00"
  }}]
}}
</script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "{t["h1_id"]}",
  "description": "{t["desc_long_id"]}",
  "url": "https://revolushine.id/treatments/{t["slug"]}.html",
  "image": "https://revolushine.id/{t["img"]}",
  "bodyLocation": "Wajah",
  "performer": {{
    "@type": "Physician",
    "name": "dr. Yoanita Budiwiyono, dipl. AAAM"
  }},
  "provider": {{
    "@type": "MedicalBusiness",
    "name": "Aesthetic Clinic Revolushine",
    "url": "https://revolushine.id/"
  }}
}}
</script>
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<a class="skip-link" href="#main" data-i18n="skip_link">Lewati ke konten utama</a>

<nav id="nav">
  <a href="../" class="nav-logo"><picture><source srcset="../img/revolushine-logo-main.webp" type="image/webp"><img loading="lazy" decoding="async" src="../img/revolushine-logo-main.png" alt="Aesthetic Clinic Revolushine" class="nav-logo-img" width="140" height="34"></picture></a>
  <ul class="nav-links">
    <li><a href="../#hotspot" data-i18n="nav_treatments">Treatment</a></li>
    <li><a href="../#testimonials" data-i18n="nav_testimonials">Testimoni</a></li>
    <li><a href="../#about" data-i18n="nav_about">Dokter Kami</a></li>
    <li><button type="button" class="nav-quiz-btn" onclick="openQuiz()" data-i18n="nav_quiz">Treatment Quiz</button></li>
    <li class="lang-switcher desktop-lang">
      <button class="lang-btn" id="langEn" onclick="setLang('en')">ENG</button>
      <button class="lang-btn active" id="langId" onclick="setLang('id')">IND</button>
    </li>
    <li><a href="https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F" class="nav-cta" data-i18n="nav_book">Konsultasi Sekarang</a></li>
  </ul>
  <div class="lang-switcher mobile-lang">
    <button class="lang-btn" id="mobileLangEn" onclick="setLang('en')">ENG</button>
    <button class="lang-btn active" id="mobileLangId" onclick="setLang('id')">IND</button>
  </div>
  <button class="burger-btn" id="burgerBtn" onclick="toggleMobileMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-menu-close" onclick="toggleMobileMenu()" aria-label="Close menu">&#10005;</button>
  <ul>
    <li><a href="../#hotspot" onclick="toggleMobileMenu()" data-i18n="nav_treatments">Treatment</a></li>
    <li><a href="../#testimonials" onclick="toggleMobileMenu()" data-i18n="nav_testimonials">Testimoni</a></li>
    <li><a href="../#about" onclick="toggleMobileMenu()" data-i18n="nav_about">Dokter Kami</a></li>
    <li><button type="button" class="nav-quiz-btn" onclick="toggleMobileMenu();openQuiz()" data-i18n="nav_quiz">Treatment Quiz</button></li>
    <li><a href="https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F" class="nav-cta" onclick="toggleMobileMenu()" data-i18n="nav_book">Konsultasi Sekarang</a></li>
  </ul>
</div>

<main id="main">

<header class="hero" style="background-image:url('../{t["img"]}');background-size:cover;background-position:center;min-height:50vh;display:flex;align-items:center;">
  <div class="hero-content" style="max-width:700px;padding:80px 24px 40px;">
    <a href="../" style="color:#fff;font-size:14px;text-decoration:none;opacity:0.8;" data-i18n="t_back">&#8592; Kembali ke Beranda</a>
    <h1 class="title-xl" style="color:#fff;margin-top:16px;font-size:clamp(28px,5vw,48px);"><span id="tH1">{t["h1_id"]}</span></h1>
    <p style="color:#fff;opacity:0.9;margin-top:12px;font-size:17px;line-height:1.6;"><span id="tDesc">{t["desc_long_id"]}</span></p>
    <a href="https://wa.me/6287736386388?text=Saya%20tertarik%20dengan%20treatment%20{t["slug"].replace("-","%20")}%20di%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%3F" class="btn-book-hero" target="_blank" rel="noopener" style="display:inline-block;margin-top:20px;background:#25d366;color:#fff;padding:14px 32px;border-radius:50px;font-weight:600;text-decoration:none;" data-i18n="t_cta_btn">Konsultasi via WhatsApp</a>
  </div>
</header>

<section class="section" style="padding:60px 24px;max-width:900px;margin:0 auto;">
  <p class="price-from" hidden style="text-align:center;color:var(--text-muted);font-size:16px;margin-bottom:16px;"><span data-i18n="price_from">Mulai dari</span> <span><!-- HARGA: isi nominal (mis. Rp 500rb) lalu hapus atribut "hidden" --></span></p>
  <h2 style="font-size:28px;margin-bottom:12px;"><span id="tAboutH2">Tentang {t["h1_id"]}</span></h2>
  <div id="tIntro">{intro_html}</div>
  <h2 style="font-size:28px;margin-bottom:12px;" data-i18n="treat_tagline">Treatment Tersedia</h2>
  <div id="treatmentItems" style="display:grid;gap:20px;margin-top:24px;">{items_html}</div>
</section>

<section class="section" style="padding:20px 24px;max-width:900px;margin:0 auto;">
  <h2 style="font-size:28px;margin-bottom:16px;" data-i18n="t_faq_h2">Pertanyaan yang Sering Diajukan</h2>
  <div id="tFaq" style="display:grid;gap:16px;">{faq_html}</div>
</section>

<section class="section" style="padding:40px 24px;text-align:center;">
  <p style="font-size:17px;color:var(--text-muted);margin-bottom:20px;" data-i18n="t_cta_lead">Butuh konsultasi lebih lanjut? Hubungi kami langsung.</p>
  <a href="https://wa.me/6287736386388?text=Saya%20tertarik%20dengan%20treatment%20{t["slug"].replace("-","%20")}%20di%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%3F" class="btn-book-hero" target="_blank" rel="noopener" style="display:inline-block;background:#25d366;color:#fff;padding:14px 32px;border-radius:50px;font-weight:600;text-decoration:none;" data-i18n="t_cta_btn">Konsultasi via WhatsApp</a>
</section>

</main>
<footer>
  <div class="foot-grid">
    <div>
      <picture><source srcset="../img/revolushine-logo-main.webp" type="image/webp"><img loading="lazy" decoding="async" src="../img/revolushine-logo-main.png" alt="Aesthetic Clinic Revolushine" class="foot-logo-img" width="120" height="29"></picture>
      <p style="font-size:17px;color:var(--text-muted);line-height:1.7" data-i18n-html="foot_desc">Perawatan estetika aman berbasis bukti ilmiah.<br>#InsecureNoMore</p>
    </div>
    <div class="foot-col">
      <h2 data-i18n="foot_nav_h">Jelajahi</h2>
      <ul class="foot-nav-links">
        <li><a href="../#hotspot" data-i18n="nav_treatments">Treatment</a></li>
        <li><a href="../#testimonials" data-i18n="nav_testimonials">Testimoni</a></li>
        <li><a href="../#about" data-i18n="nav_about">Dokter Kami</a></li>
        <li><a href="../privacy.html">Privacy Policy</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h2 data-i18n="foot_connect_h">Hubungi Kami</h2>
      <ul>
        <li><a href="https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F" class="foot-icon-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> <span data-i18n="foot_wa">Konsultasi via WhatsApp</span></a></li>
        <li><a href="https://www.instagram.com/revolushine.id/" class="foot-icon-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> <span>Instagram</span></a></li>
        <li><a href="https://www.tiktok.com/@revolushine.id" class="foot-icon-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.11a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.83 4.83 0 01-.38.67z"/></svg> <span>TikTok</span></a></li>
        <li class="foot-address" style="margin-top:4px;"><a href="https://share.google/8bDS7EQUC5UBWy87x" target="_blank" rel="noopener" data-i18n="foot_address" style="color:inherit;text-decoration:none;">Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Kec. Dukuhpakis, Surabaya.</a></li>
        <li><a href="https://www.google.com/maps/search/?api=1&query=Aesthetic+Clinic+Revolushine+Surabaya" class="foot-icon-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg> <span data-i18n="foot_review">Lihat review kami di Google</span></a></li>
      </ul>
    </div>
  </div>
  <div class="foot-bottom">
    <span data-i18n="foot_copy">&#169; 2026 Aesthetic Clinic Revolushine. Hak cipta dilindungi.</span>
  </div>
</footer>

<div class="whatsapp-float-wrap">
  <a href="https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F" class="whatsapp-float" target="_blank" rel="noopener">
    <picture><source srcset="../img/WhatsApp-Logo.wine.webp" type="image/webp"><img loading="lazy" decoding="async" src="../img/WhatsApp-Logo.wine.png" alt="WhatsApp" class="whatsapp-float-icon" width="50" height="50" /></picture>
  </a>
</div>

<div class="quiz-overlay" id="quizOverlay" data-lenis-prevent>
  <button class="qclose" onclick="closeQuiz()" aria-label="Close">&#10005;</button>
  <div class="qmodal">
    <div class="qprogress">
      <div class="qdot on" id="dot1"></div>
      <div class="qdot" id="dot2"></div>
    </div>
    <div class="qscreen on" id="q1">
      <div class="q-label-row">
        <p class="q-label" data-i18n="q1_label">Pertanyaan 1 dari 2</p>
      </div>
      <p class="q-title" data-i18n-html="q1_title">Apa yang paling ingin<br>kamu ubah dari<br>kulitmu hari ini?</p>
      <div class="q-options">
        <button class="qopt" onclick="pick(1,'lines')"><div class="opt-lbl">A</div><div><div class="opt-main" data-i18n="q1a_main">Garis halus & kerutan</div><div class="opt-sub" data-i18n="q1a_sub">Dahi, antara alis, sudut mata</div></div></button>
        <button class="qopt" onclick="pick(1,'volume')"><div class="opt-lbl">B</div><div><div class="opt-main" data-i18n="q1b_main">Volume hilang</div><div class="opt-sub" data-i18n="q1b_sub">Bibir tipis, pelipis cekung, pipi & rahang</div></div></button>
        <button class="qopt" onclick="pick(1,'texture')"><div class="opt-lbl">C</div><div><div class="opt-main" data-i18n="q1c_main">Tekstur tidak merata</div><div class="opt-sub" data-i18n="q1c_sub">Permukaan kasar, pori besar, atau kulit berbintil</div></div></button>
        <button class="qopt" onclick="pick(1,'glow')"><div class="opt-lbl">D</div><div><div class="opt-main" data-i18n="q1d_main">Kulit kusam & dehidrasi</div><div class="opt-sub" data-i18n="q1d_sub">Kurang glow, tampak lelah, tidak bercahaya</div></div></button>
        <button class="qopt" onclick="pick(1,'chubby')"><div class="opt-lbl">E</div><div><div class="opt-main" data-i18n="q1e_main">Kulit kendur, dagu ganda & jawline kurang tegas</div><div class="opt-sub" data-i18n="q1e_sub">Kulit kendur, garis rahang kurang tegas, lemak berlebih</div></div></button>
      </div>
    </div>
    <div class="qscreen" id="q2">
      <div class="q-label-row">
        <p class="q-label" data-i18n="q2_label">Pertanyaan 2 dari 2</p>
        <button class="q-back" onclick="goBack(2)" data-i18n="quiz_back">&#8592; Kembali</button>
      </div>
      <p class="q-title" data-i18n-html="q2_title">Bagaimana pendapatmu<br>tentang waktu pemulihan?</p>
      <div class="q-options">
        <button class="qopt" onclick="pick(2,'none')"><div class="opt-lbl">A</div><div><div class="opt-main" data-i18n="q2a_main">Tanpa downtime</div><div class="opt-sub" data-i18n="q2a_sub">Saya harus langsung beraktivitas setelahnya</div></div></button>
        <button class="qopt" onclick="pick(2,'downtime')"><div class="opt-lbl">B</div><div><div class="opt-main" data-i18n="q2b_main">Tidak masalah ada downtime</div><div class="opt-sub" data-i18n="q2b_sub">Sedikit kemerahan atau bengkak tidak apa untuk perubahan nyata</div></div></button>
      </div>
    </div>
    <div class="qresult" id="qresult">
      <p class="q-label" data-i18n="quiz_result_label">Treatment yang Direkomendasikan</p>
      <div class="res-name" id="resName"></div>
      <p class="res-desc" id="resDesc"></p>
      <a id="resWA" href="https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F" class="btn-primary" target="_blank" rel="noopener" data-i18n="nav_book">Konsultasi Sekarang</a>
      <div class="qpromo" id="qpromo">
        <div class="qpromo-offer">
          <p class="qpromo-tag" data-i18n="quiz_promo_tag">Special Offer</p>
          <h3 class="qpromo-title" data-i18n="quiz_promo_title">First Consultation FREE</h3>
          <p class="qpromo-body" data-i18n="quiz_promo_body">Claim your first consultation with dr. Yoanita for free and get the best treatment recommendation for your skin.</p>
          <button type="button" class="qpromo-btn" onclick="claimFreeConsult()" data-i18n="quiz_promo_cta">Claim FREE Consultation</button>
        </div>
        <div class="qpromo-name">
          <p class="qpromo-body" data-i18n="quiz_promo_askname">May I know your name?</p>
          <div class="qpromo-name-row">
            <input type="text" id="qpromoNameInput" data-i18n-placeholder="quiz_promo_name_ph" placeholder="Your name" aria-label="Your name" onkeydown="if(event.key==='Enter')submitFreeConsultName()">
            <button type="button" class="qpromo-btn" onclick="submitFreeConsultName()" data-i18n="quiz_promo_send">Send</button>
          </div>
        </div>
        <div class="qpromo-done">
          <p class="qpromo-body" data-i18n="quiz_promo_done">Your message for our team is ready. Click the button below if WhatsApp hasn&#39;t opened.</p>
          <a class="qpromo-btn" id="qpromoOpenWa" href="#" target="_blank" rel="noopener" data-i18n="quiz_promo_openwa">Open WhatsApp</a>
        </div>
      </div>
      <div style="text-align:center"><button class="btn-retry" onclick="resetQuiz()" data-i18n="quiz_retry">&#8592; Ulangi quiz</button></div>
    </div>
  </div>
</div>

<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="../js/i18n.js"></script>
<script src="../js/treatment-data.js"></script>
<script src="../quiz-logic.js"></script>
<script src="../script.js"></script>
<script>
(function() {{
  var PAGE = {page_json};
  var idx = {t["idx"]};
  var esc = function(s) {{ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }};
  var itemCard = '<div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);"><h3 style="font-size:18px;margin:0 0 8px;color:#333;">';
  var faqCard = '<div style="background:#fff;border-radius:12px;padding:20px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);"><h3 style="font-size:18px;margin:0 0 6px;color:var(--text-main);">';
  function render(lang) {{
    var L = lang || 'id';
    var d = (typeof treatmentData !== 'undefined' && treatmentData[idx]) ? (treatmentData[idx][L] || treatmentData[idx].en) : null;
    var el;
    if ((el = document.getElementById('tH1'))) el.innerHTML = esc(PAGE.h1[L] || PAGE.h1.id);
    if ((el = document.getElementById('tDesc'))) el.innerHTML = esc(PAGE.desc[L] || PAGE.desc.id);
    if ((el = document.getElementById('tAboutH2'))) el.textContent = (L === 'en' ? 'About ' : 'Tentang ') + (PAGE.h1[L] || PAGE.h1.id);
    if ((el = document.getElementById('tIntro'))) el.innerHTML = (PAGE.intro[L] || PAGE.intro.id).map(function(p) {{ return '<p style="font-size:17px;line-height:1.8;color:#4a3a46;margin:0 0 14px;">' + esc(p) + '</p>'; }}).join('');
    if ((el = document.getElementById('tFaq'))) el.innerHTML = (PAGE.faq[L] || PAGE.faq.id).map(function(f) {{ return faqCard + esc(f[0]) + '</h3><p style="margin:0;color:#666;line-height:1.7;">' + esc(f[1]) + '</p></div>'; }}).join('');
    if (d && (el = document.getElementById('treatmentItems'))) el.innerHTML = d.items.map(function(it) {{ return itemCard + esc(it.name) + '</h3><p style="margin:0;color:#666;line-height:1.6;">' + it.desc + '</p></div>'; }}).join('');
  }}
  document.addEventListener('langchange', function() {{ render(currentLang); }});
  if (window.location.search.indexOf('lang=en') !== -1 && typeof setLang === 'function') setLang('en');
  render(currentLang || 'id');
}})();
</script>
</body>
</html>'''

outdir = Path(__file__).parent / "treatments"
outdir.mkdir(exist_ok=True)
for t in TREATMENTS:
    outpath = outdir / f'{t["slug"]}.html'
    outpath.write_text(generate_page(t), encoding="utf-8")
    print(f"Created: {outpath}")
