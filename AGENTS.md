# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is
Static, bilingual (ID primary / EN toggle) marketing site for **Revolushine Aesthetic Clinic** (Dr. Yoanita Budiwiyono), Surabaya. Hosted on GitHub Pages behind Cloudflare DNS at `https://revolushine.id`. No build step for the site itself; a couple of small Python generators are used.

## Deploy + access
- Remote: `git@github.com:zghquk0626/klp-grh-ac-srv.git` (SSH). HTTPS push is NOT configured and `gh` CLI is NOT installed — always push via the SSH remote.
- Deploy = `git add -A && git commit -m "..."` then `git push origin main`. Only commit/push when the user explicitly asks.
- Local preview: `python3 -m http.server 8000` from the repo root (all asset paths are relative or absolute-friendly).
- Key facts: WhatsApp `+62 877-3638-6388` → `https://wa.me/6287736386388?...` everywhere; Instagram `@revolushine.id`; hours Mon–Sat 09:00–20:00 WIB; address Plaza Graha Famili, Jl. Mayjend. Jonosewojo D-3A, Dukuhpakis, Surabaya.

## File map
- `index.html` — homepage (hero, treatments carousel, before/after, testimonials, promo, FAQ, quiz overlay, chat widget, footer).
- `treatments/*.html` — 5 GENERATED pages. Do NOT hand-edit them; edit `generate_treatment_pages.py` then run `python3 generate_treatment_pages.py`.
- `generate_treatment_pages.py` — source of truth for treatment pages. Holds `TREATMENTS` data (meta, `items_id`, `enrich_id` intro/FAQ copy) and the full page template (f-string, so `{t[...]}` interpolates and JSON-LD braces must be doubled as `{{ }}`). Shared blocks (quiz result incl. `.qpromo`, footer, chat/price stubs) live here AND in `index.html` — keep them in sync.
- `script.js` — Lenis + GSAP/ScrollTrigger animations, quiz logic, end-of-quiz promo, chat widget IIFE, cookie helpers.
- `quiz-logic.js` — quiz → treatment recommendation engine (`getQuizRecommendation`, `treatmentDetails`).
- `js/i18n.js` — `translations = { en, id }`, `currentLang`, `setLang()` (dispatches `langchange`). Handles `data-i18n` (textContent), `data-i18n-html` (innerHTML), `data-i18n-placeholder`.
- `js/chat-data.js` — chat widget copy (greeting, chips, auto-replies, compose templates). NOT in i18n.js (i18n.js only holds `chat_status`).
- `js/treatment-data.js` — treatment categories + items (en/id) for modal grid; also statically embedded into generated pages.
- `css/styles.css` and `css/chat.css` — styles. Chat CSS only loaded on the homepage.
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO/AEO files at root.

## Conventions / rules
- **i18n:** add new copy to BOTH `en` and `id` blocks in `js/i18n.js`, HTML uses `data-i18n`/`data-i18n-html`/`data-i18n-placeholder`. Chat copy goes in `js/chat-data.js` instead and is read via `chatData[currentLang] || chatData.id`.
- **Chat + quiz share the visitor's name via cookies** `rvChatName` and `rvChatLoc` (1-yr, SameSite=Lax, Secure on https). Always use the module-scope helpers `setChatCookie()` / `getChatCookie()` and `CHAT_COOKIE` in `script.js` (both the chat IIFE and quiz promo use them). Never ask for something the cookie already knows.
- **Chat widget behavior:** appears once after 60s OR 30% scroll (`TRIGGER` in script.js). It auto-opens once on wide screens (>640px); on narrow/phone screens it instead shows a semitransparent `.chat-capsule` pill ("Hello, may we help you?" / ID "Halo, boleh kami bantu?") that opens the chat on tap and hides after 9s (copy key `capsule` in `chat-data.js`). Window height is intentionally capped (desktop `min(480px, calc(100vh - 170px))`, mobile `min(420px, 55vh)`) to avoid covering content. On treatment pages the chat IIFE early-returns; they keep the WhatsApp float.
- **`window.open(url, '_blank', 'noopener')`** calls for WhatsApp hand-offs must be synchronous within the click handler (popup blockers).
- **End-of-quiz promo:** `.qpromo` card in the quiz result sends `Saya {name} mau tahu lebih lanjut tentang treatment {treatment} untuk keluhan: {list}` (i18n key `quiz_promo_wa`); problems = localized labels of quiz answers. Keep `.qpromo` markup identical in `index.html` and the generator template.
- **Animations:** `.g-fade` elements are VISIBLE by default; the hidden animated state is only applied via `.anim-ready` on `<html>`, added by `script.js` once GSAP is confirmed loaded. Never change `.g-fade` back to `opacity:0` by default, and respect `prefers-reduced-motion`.
- **Price stub (hidden):** a `.price-from` element with `hidden` attribute exists on `index.html` and each generated treatment page. To enable later: remove `hidden` and fill the nominal inside the span. Label text i18n key = `price_from`. Do not publish real prices without a clinic-provided amount.
- **Images:** pair `.jpg`/`.JPEG` + `.webp` via `<picture>`. Bulk WebP conversion helper = `convert_to_webp.py`.

## Validation (run before finishing)
- `node --check script.js js/i18n.js js/chat-data.js quiz-logic.js js/treatment-data.js`
- `python3 -c "import ast; ast.parse(open('generate_treatment_pages.py').read())"`
- Every `<script type="application/ld+json">` must parse as valid JSON.
- `python3 -m http.server` smoke check: `/`, one `treatments/*.html`, `/llms.txt`, `/js/i18n.js` return 200.
- After generator changes: rerun `python3 generate_treatment_pages.py` and confirm the 5 files were rewritten.

## SEO / AEO (what the established schemas are)
- `robots.txt` explicitly allows GPTBot and Google-Extended.
- `index.html`: `MedicalBusiness` + bilingual `FAQPage` (16 questions: 8 EN + 8 ID, mirroring the 8 visible `faq-item` accordion entries).
- Treatment pages: `MedicalBusiness` + `MedicalProcedure` per page.
- `sitemap.xml` lists all pages; `llms.txt` gives an AI-readable summary.