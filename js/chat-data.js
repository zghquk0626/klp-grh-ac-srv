// ── AI CHAT WIDGET — CONTENT & AUTO-REPLIES (EN/ID) ──
// Rendering + logic live in script.js; this file only carries the copy.

const CHAT_MAPS_URL = 'https://share.google/8bDS7EQUC5UBWy87x';

const chatData = {
  en: {
    greeting: 'Hello! 👋 Welcome to Revolushine Aesthetic Clinic.\nHow can we help you today?',
    placeholder: 'Type your message…',
    freeTextBtn: 'Tap here to send a message directly to our team:',
    freeTextReply: 'Go ahead — type your message below and press Send. It goes straight to our team via WhatsApp. 🙌',
    handoffText: 'Your message is ready. Our team will reply on WhatsApp shortly. 👇',
    waCta: 'Chat via WhatsApp',
    chips: [
      { label: '💬 Consult about my concern', reply: 'Of course! Tell us about your concern and our doctor will recommend the treatment that suits you best. ✨', waMessage: 'I would like to consult about my skin concern' },
      { label: '📅 Book an appointment', reply: 'We\'d be happy to arrange a visit that fits your schedule. 🗓️', waMessage: 'I would like to book an appointment at Revolushine' },
      { label: '📋 Latest promos & packages', reply: 'Of course! Our team will share the latest promos and packages with you. 🎉', waMessage: 'Please inform me about the latest Revolushine promos' },
      { label: '🕙 Opening hours', info: 'We are open:\n📅 Monday – Saturday\n🕘 09.00 – 20.00 WIB\n📍 Plaza Graha Famili, Dukuhpakis, Surabaya' },
      { label: '📸 Our Instagram portfolio', info: 'See our treatment results on Instagram! ✨', url: 'https://www.instagram.com/revolushine.id/', cta: 'Open Instagram' }
    ],
    autoReplies: [
      { keys: ['opening hour', 'open on', 'what time', 'hour', 'hours'], info: 'We are open:\n📅 Monday – Saturday\n🕘 09.00 – 20.00 WIB\n📍 Plaza Graha Famili, Dukuhpakis, Surabaya' },
      { keys: ['where', 'location', 'address', 'maps', 'find'], info: '📍 Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Dukuhpakis, Surabaya.', url: CHAT_MAPS_URL, cta: 'Open in Google Maps' },
      { keys: ['free', 'consultation', 'price'], info: 'Yes! Your first consultation with dr. Yoanita is completely FREE. 🎉' }
    ]
  },
  id: {
    greeting: 'Halo! 👋 Selamat datang di Revolushine Aesthetic Clinic.\nAda yang bisa kami bantu?',
    placeholder: 'Ketik pesanmu…',
    freeTextBtn: 'Klik di sini untuk langsung mengirimkan pesan ke tim kami:',
    freeTextReply: 'Silakan tulis pesanmu di bawah, lalu tekan Kirim. Pesan akan langsung diteruskan ke tim kami via WhatsApp. 🙌',
    handoffText: 'Pesanmu sudah siap. Tim kami akan membalas lewat WhatsApp. 👇',
    waCta: 'Chat via WhatsApp',
    chips: [
      { label: '💬 Konsultasi keluhan kulit saya', reply: 'Tentu! Ceritakan keluhanmu dan dokter kami akan merekomendasikan treatment yang paling sesuai. ✨', waMessage: 'Saya ingin konsultasi tentang keluhan kulit saya' },
      { label: '📅 Mau buat janji temu', reply: 'Siap! Tim kami akan bantu atur jadwal kunjungan yang paling cocok untukmu. 🗓️', waMessage: 'Saya ingin membuat appointment (janji temu) di Revolushine' },
      { label: '📋 Info promo terbaru', reply: 'Tentunya! Tim kami akan membagikan info promo & paket terbaru. 🎉', waMessage: 'Tolong infokan promo terbaru Revolushine' },
      { label: '🕙 Jam berapa buka?', info: 'Kami buka:\n📅 Senin – Sabtu\n🕘 09.00 – 20.00 WIB\n📍 Plaza Graha Famili, Dukuhpakis, Surabaya' },
      { label: '📸 Lihat portfolio kami', info: 'Lihat hasil treatment kami di Instagram! ✨', url: 'https://www.instagram.com/revolushine.id/', cta: 'Buka Instagram' }
    ],
    autoReplies: [
      { keys: ['jam buka', 'buka jam', 'jam berapa', 'buka pukul', 'jam operasional', 'buka hari'], info: 'Kami buka:\n📅 Senin – Sabtu\n🕘 09.00 – 20.00 WIB\n📍 Plaza Graha Famili, Dukuhpakis, Surabaya' },
      { keys: ['lokasi', 'alamat', 'dimana', 'di mana', 'maps', 'letak'], info: '📍 Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Dukuhpakis, Surabaya.', url: CHAT_MAPS_URL, cta: 'Buka di Google Maps' },
      { keys: ['konsultasi gratis', 'gratis', 'bayar konsultasi', 'harga konsultasi', 'free'], info: 'Ya, konsultasi pertama dengan dr. Yoanita sepenuhnya GRATIS! 🎉' }
    ]
  }
};