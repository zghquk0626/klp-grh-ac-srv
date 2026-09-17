# Aesthetic Clinic Revolushine — Website

Website for **Aesthetic Clinic Revolushine** (Dr. Yoanita Budiwiyono, dipl. AAAM), a boutique aesthetic clinic in Surabaya. Live at **https://revolushine.id** (GitHub Pages + Cloudflare DNS).

Bilingual Indonesian/English, conversion-focused: interactive Treatment Quiz, AI-style chat widget, end-of-quiz "Konsultasi Pertama GRATIS" promo, persistent WhatsApp hand-offs.

## Features
- **Treatment Quiz** (2 questions → personalized recommendation → WhatsApp)
- **Chat widget** — time-aware greeting, quick chips, name/city capture (shared cookies with the quiz promo)
- **Free-consultation promo** at the end of the quiz (uses the visitor's name from the chat cookie or asks once)
- **Before/after slider + patient testimonials** (reviews + Instagram portfolio)
- **Promo carousel** with lightbox, **FAQ** section, **5 treatment landing pages**
- **SEO/AEO**: MedicalBusiness + FAQPage schema (home), MedicalProcedure schema (treatment pages), `robots.txt` (GPTBot + Google-Extended allowed), `sitemap.xml` (hreflang alternates for `?lang=en`), `llms.txt`

## Performance & accessibility (Sep 2026)
- **Images**: `optimize_images.py` resizes promo/before-after/hero in place (longest side 1200–1400px), generates 200px `*-thumb.webp` thumbnails, and preserves originals under `img/*/original/`. All `<img>` tags carry explicit `width`/`height`; below-fold images are `loading="lazy"`.
- **Render path**: gsap/ScrollTrigger/Lenis are `defer`red; Lenis/GSAP scroll init is delayed to ~2.5s so it can't block LCP; Flickity stylesheet + lib are loaded only when the testimonials section approaches the viewport.
- **Motion**: single Lenis driver via `gsap.ticker`, `prefers-reduced-motion` disables smooth scroll and the 3D carousel autoplay.
- **A11y**: `<main>` landmark + skip links on all pages, accessible names on promo dots, non-redundant thumbnail alts.
- Build stamp `<!-- Build date: YYYYMMDDHHMMSS -->` after `<!DOCTYPE html>` on every page.

## Quick start
No build step. Serve the folder statically:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project structure
```
index.html                 Homepage
treatments/*.html          Generated treatment landing pages (do NOT edit directly)
generate_treatment_pages.py  Generates treatments/*.html (single source of truth)
script.js                  Animations, quiz, chat widget, quiz promo, cookies
quiz-logic.js              Quiz recommendation engine
js/i18n.js                 All UI copy (en/id) + setLang()
js/chat-data.js            Chat widget copy + auto-replies
js/treatment-data.js       Treatment categories & items
css/styles.css, css/chat.css
robots.txt, sitemap.xml, llms.txt
convert_to_webp.py         Bulk image → WebP helper
optimize_images.py         In-place resize + thumbnail generator (perf work)
```

## Regenerating treatment pages
Edit `generate_treatment_pages.py` (data + template), then:

```bash
python3 generate_treatment_pages.py
```

## Editing copy
- **UI copy:** `js/i18n.js` → add keys to both `en` and `id`, reference with `data-i18n` / `data-i18n-html` / `data-i18n-placeholder`.
- **Chat copy:** `js/chat-data.js` (greeting, chips, auto-replies, WhatsApp compose templates).
- Any static block added to `index.html` that also appears on treatment pages must be mirrored in `generate_treatment_pages.py`.

## Deploying
```bash
git add -A
git commit -m "description"
git push origin main   # SSH remote (git@github.com:zghquk0626/klp-grh-ac-srv.git)
```

## Adding treatment prices (later)
A hidden price stub already exists on the homepage and each treatment page:

```html
<p class="price-from" hidden>
  <span data-i18n="price_from">Mulai dari</span>
  <span><!-- HARGA: isi nominal (mis. Rp 500rb) lalu hapus atribut "hidden" --></span>
</p>
```

To enable: remove the `hidden` attribute and fill in the nominal. Label text is the i18n key `price_from`. Only publish prices that the clinic has provided.

## Contact
- WhatsApp: https://wa.me/6287736386388
- Instagram / TikTok: @revolushine.id
- Address: Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A, Pradahkalikendal, Dukuhpakis, Surabaya