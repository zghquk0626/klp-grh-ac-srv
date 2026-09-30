#!/usr/bin/env python3
"""Generate blog post pages + listing + RSS from Markdown posts. Stdlib only.

Usage: python3 generate_blog_pages.py

Source format: blog/posts/<name>.md
  ---
  slug: judul-posting            # [a-z0-9-], also the output filename
  date: 2026-10-05               # YYYY-MM-DD
  cover: img/blog/judul.jpg      # fallback image (required)
  cover_webp: img/blog/judul.webp  # optional webp sibling
  title_id: Judul ... | Aesthetic Clinic Revolushine
  title_en: Title ... | Aesthetic Clinic Revolushine
  h1_id: Judul Posting            # defaults to title without suffix
  h1_en: Post Title
  excerpt_id: Ringkasan 1-2 kalimat.
  excerpt_en: 1-2 sentence summary.
  desc_id: Meta description ID.  # defaults to excerpt
  desc_en: Meta description EN.
  ---
  <ID body in Markdown>
  ===EN===
  <EN body in Markdown>

Files starting with "_" (e.g. _template.md) are skipped.
Outputs: blog/<slug>.html, blog/index.html, blog/feed.xml
"""
import html
import json
import re
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

BUILD_STAMP = "<!-- Build date: 20260930072527 -->"

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "blog" / "posts"
OUT_DIR = ROOT / "blog"
SITE = "https://revolushine.id"
WA_GENERIC = ("https://wa.me/6287736386388?text=Saya%20melihat%20treatment%20wajah%20dari%20website%20"
              "Aesthetic%20Clinic%20Revolushine%2C%20apakah%20bisa%20konsultasi%20terlebih%20dahulu%3F")

# ---------------------------------------------------------------- front matter

REQUIRED = ["slug", "date"]


def parse_post(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.S)
    if not m:
        raise ValueError(f"{path.name}: missing --- front-matter block")
    meta = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        v = v.strip()
        if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
            v = v[1:-1]
        meta[k.strip()] = v
    for k in REQUIRED:
        if k not in meta:
            raise ValueError(f"{path.name}: front-matter missing '{k}'")
    if not re.fullmatch(r"[a-z0-9-]+", meta["slug"]):
        raise ValueError(f"{path.name}: slug must match [a-z0-9-]+")
    try:
        meta["_date"] = datetime.strptime(meta["date"], "%Y-%m-%d").date()
    except ValueError:
        raise ValueError(f"{path.name}: date must be YYYY-MM-DD")
    for lang_key, fb_key in [("h1_id", "title_id"), ("h1_en", "title_en"),
                             ("desc_id", "excerpt_id"), ("desc_en", "excerpt_en")]:
        if lang_key not in meta:
            meta[lang_key] = meta.get(fb_key, "")
    for k in ["title_id", "title_en", "h1_id", "h1_en",
              "excerpt_id", "excerpt_en", "desc_id", "desc_en"]:
        meta.setdefault(k, "")
    parts = re.split(r"(?m)^\s*===EN===\s*$", m.group(2).strip())
    meta["body_id"] = parts[0].strip()
    if len(parts) > 1:
        meta["body_en"] = parts[1].strip()
    else:
        meta["body_en"] = meta["body_id"]
        print(f"  note: {path.name} has no ===EN=== section, EN falls back to ID")
    if not meta.get("cover"):
        raise ValueError(f"{path.name}: front-matter missing 'cover'")
    return meta


# ------------------------------------------------------- mini markdown (safe)

P_STYLE = "font-size:17px;line-height:1.85;color:#4a3a46;margin:0 0 16px;"
H2_STYLE = "font-size:24px;margin:32px 0 12px;color:var(--text-main);line-height:1.35;"
H3_STYLE = "font-size:20px;margin:26px 0 10px;color:var(--text-main);line-height:1.4;"
LI_STYLE = "font-size:17px;line-height:1.8;color:#4a3a46;margin:0 0 8px;"
UL_STYLE = "padding-left:24px;margin:0 0 16px;"
QUOTE_STYLE = "border-left:3px solid var(--accent);padding:4px 0 4px 16px;color:var(--text-muted);margin:0 0 16px;font-size:17px;line-height:1.8;"
PRE_STYLE = "background:#f6f1f4;padding:16px;border-radius:12px;overflow:auto;margin:0 0 16px;font-size:14px;"
IMG_STYLE = "max-width:100%;height:auto;border-radius:12px;margin:8px 0;"


def md_inline(s):
    """Inline formatting on already-escaped text. Returns HTML."""
    codes = []

    def stash(m):
        codes.append(m.group(1))
        return f"\x00{len(codes) - 1}\x00"

    s = re.sub(r"`([^`]+)`", stash, s)
    s = re.sub(r"!\[([^\]]*)\]\(([^)\s]+)\)",
               lambda m: f'<img loading="lazy" decoding="async" src="{m.group(2)}" alt="{m.group(1)}" style="{IMG_STYLE}">', s)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)",
               lambda m: f'<a href="{m.group(2)}" style="color:var(--bg-dark);">{m.group(1)}</a>', s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", s)
    for i, c in enumerate(codes):
        s = s.replace(f"\x00{i}\x00", f"<code>{c}</code>")
    return s


def md_to_html(src):
    lines = src.splitlines()
    out = []
    para = []
    list_buf = []
    list_tag = None
    quote_buf = []
    in_code = False
    code_buf = []

    def flush_para():
        if para:
            out.append(f'<p style="{P_STYLE}">' + md_inline(" ".join(para)) + "</p>")
            para.clear()

    def flush_list():
        nonlocal list_tag
        if list_buf:
            items = "".join(f'<li style="{LI_STYLE}">{md_inline(x)}</li>' for x in list_buf)
            out.append(f"<{list_tag} style=\"{UL_STYLE}\">" + items + f"</{list_tag}>")
            list_buf.clear()
            list_tag = None

    def flush_quote():
        if quote_buf:
            out.append(f'<blockquote style="{QUOTE_STYLE}">' + md_inline(" ".join(quote_buf)) + "</blockquote>")
            quote_buf.clear()

    for raw in lines:
        line = raw.rstrip()
        if line.strip().startswith("```"):
            if in_code:
                out.append(f'<pre style="{PRE_STYLE}"><code>' + "\n".join(code_buf) + "</code></pre>")
                code_buf.clear()
                in_code = False
            else:
                flush_para(); flush_list(); flush_quote()
                in_code = True
            continue
        if in_code:
            code_buf.append(html.escape(raw))
            continue
        esc = html.escape(line)
        stripped = line.strip()
        if not stripped:
            flush_para(); flush_list(); flush_quote()
            continue
        mh = re.match(r"^(#{1,3})\s+(.*)$", stripped)
        if mh:
            flush_para(); flush_list(); flush_quote()
            level = len(mh.group(1))
            tag = "h2" if level <= 2 else "h3"
            style = H2_STYLE if level <= 2 else H3_STYLE
            out.append(f"<{tag} style=\"{style}\">" + md_inline(html.escape(mh.group(2))) + f"</{tag}>")
            continue
        if stripped.startswith(">"):
            flush_para(); flush_list()
            quote_buf.append(stripped[1:].strip())
            continue
        else:
            flush_quote()
        mu = re.match(r"^[-*]\s+(.*)$", stripped)
        mo = re.match(r"^\d+[.)]\s+(.*)$", stripped)
        if mu or mo:
            flush_para()
            tag = "ul" if mu else "ol"
            if list_tag != tag:
                flush_list()
                list_tag = tag
            list_buf.append((mu or mo).group(1))
            continue
        flush_list()
        para.append(esc)
    flush_para(); flush_list(); flush_quote()
    return "\n".join(out)


def read_minutes(body_md):
    words = len(re.findall(r"\w+", body_md))
    return max(1, round(words / 200))


def cover_dims(cover):
    try:
        from PIL import Image
        im = Image.open(ROOT / cover)
        return im.size
    except Exception:
        return (None, None)


def cover_picture(cover, cover_webp, alt, hero=False):
    w, h = cover_dims(cover)
    size = f' width="{w}" height="{h}"' if w else ""
    style = ("width:100%;height:auto;border-radius:20px;display:block;" if hero
             else "width:100%;height:200px;object-fit:cover;display:block;")
    img = (f'<img loading="lazy" decoding="async" src="../{cover}" alt="{html.escape(alt)}"'
           f"{size} style=\"{style}\">")
    # auto-detect WebP if no cover_webp specified but file exists
    detected_webp = ""
    if not cover_webp:
        possible = cover.replace('.jpeg', '.webp').replace('.jpg', '.webp')
        import os
        if os.path.exists(ROOT / possible):
            detected_webp = possible
    if detected_webp:
        return (f"<picture><source srcset=\"../{detected_webp}\" type=\"image/webp\">" + img + "</picture>")
    if cover_webp:
        return (f"<picture><source srcset=\"../{cover_webp}\" type=\"image/webp\">" + img + "</picture>")
    return img


# ---------------------------------------------------------------- templates

MEDICAL_JSONLD = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Aesthetic Clinic Revolushine",
  "url": "https://revolushine.id/",
  "description": "Klinik kecantikan Aesthetic Clinic Revolushine di Graha Famili Surabaya oleh dr. Yoanita Budiwiyono.",
  "telephone": "+6287736386388",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plaza Graha Famili, Ruko, Jl. Mayjend. Jonosewojo D-3A",
    "addressLocality": "Pradahkalikendal, Dukuhpakis",
    "addressRegion": "Surabaya",
    "postalCode": "60221",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.2824,
    "longitude": 112.6732
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "20:00"
  }]
}
</script>"""

HEAD_TOP = """<!DOCTYPE html>
{stamp}
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{canonical}" />
<link rel="alternate" hreflang="id" href="{canonical}" />
<link rel="alternate" hreflang="en" href="{canonical_en}" />
<link rel="alternate" hreflang="x-default" href="{canonical}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:image" content="{og_image}" />
<meta property="og:url" content="{canonical}" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="id_ID" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{desc}" />
<meta name="twitter:image" content="{og_image}" />
<meta name="theme-color" content="#C9184A" />
<link rel="preconnect" href="https://www.googletagmanager.com">
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
"""

NAV = """<a class="skip-link" href="#main" data-i18n="skip_link">Lewati ke konten utama</a>

<nav id="nav">
  <a href="../" class="nav-logo"><picture><source srcset="../img/revolushine-logo-main.webp" type="image/webp"><img loading="lazy" decoding="async" src="../img/revolushine-logo-main.png" alt="Aesthetic Clinic Revolushine" class="nav-logo-img" width="140" height="34"></picture></a>
  <ul class="nav-links">
    <li><a href="../#hotspot" data-i18n="nav_treatments">Treatment</a></li>
    <li><a href="../#testimonials" data-i18n="nav_testimonials">Testimoni</a></li>
    <li><a href="../#about" data-i18n="nav_about">Dokter Kami</a></li>
    <li><a href="../blog/" data-i18n="nav_blog">Blog</a></li>
    <li><button type="button" class="nav-quiz-btn" onclick="openQuiz()" data-i18n="nav_quiz">Treatment Quiz</button></li>
    <li class="lang-switcher desktop-lang">
      <button class="lang-btn" id="langEn" onclick="setLang('en')">ENG</button>
      <button class="lang-btn active" id="langId" onclick="setLang('id')">IND</button>
    </li>
    <li><a href="{wa}" class="nav-cta" data-i18n="nav_book">Konsultasi Sekarang</a></li>
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
    <li><a href="../blog/" onclick="toggleMobileMenu()" data-i18n="nav_blog">Blog</a></li>
    <li><button type="button" class="nav-quiz-btn" onclick="toggleMobileMenu();openQuiz()" data-i18n="nav_quiz">Treatment Quiz</button></li>
    <li><a href="{wa}" class="nav-cta" onclick="toggleMobileMenu()" data-i18n="nav_book">Konsultasi Sekarang</a></li>
  </ul>
</div>
"""

FOOTER = """<footer>
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
        <li><a href="../blog/" data-i18n="nav_blog">Blog</a></li>
        <li><a href="../privacy.html">Privacy Policy</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h2 data-i18n="foot_connect_h">Hubungi Kami</h2>
      <ul>
        <li><a href="{wa}" class="foot-icon-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> <span data-i18n="foot_wa">Konsultasi via WhatsApp</span></a></li>
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
  <a href="{wa}" class="whatsapp-float" target="_blank" rel="noopener">
    <picture><source srcset="../img/WhatsApp-Logo.wine.webp" type="image/webp"><img loading="lazy" decoding="async" src="../img/WhatsApp-Logo.wine.png" alt="WhatsApp" class="whatsapp-float-icon" width="50" height="50" /></picture>
  </a>
</div>
"""

# NOTE: quiz overlay duplicated from generate_treatment_pages.py — keep in sync.
QUIZ = """<div class="quiz-overlay" id="quizOverlay" data-lenis-prevent>
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
      <a id="resWA" href="{wa}" class="btn-primary" target="_blank" rel="noopener" data-i18n="nav_book">Konsultasi Sekarang</a>
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
"""

SCRIPTS_BLOG = """<script src="../js/i18n.js"></script>
<script src="../quiz-logic.js"></script>
<script src="../script.js"></script>
"""


def blogposting_jsonld(p):
    data = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": p["h1_id"],
        "description": p["desc_id"],
        "url": f"{SITE}/blog/{p['slug']}.html",
        "image": f"{SITE}/{p['cover']}",
        "datePublished": p["date"],
        "dateModified": p["date"],
        "inLanguage": ["id", "en"],
        "author": {"@type": "Physician", "name": "dr. Yoanita Budiwiyono, dipl. AAAM"},
        "publisher": {"@type": "MedicalBusiness", "name": "Aesthetic Clinic Revolushine",
                      "url": SITE + "/"},
    }
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + "\n</script>"


def fmt_date(d):
    months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
              "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    return f"{d.day} {months[d.month - 1]} {d.year}"


def fmt_date_en(d):
    return d.strftime("%d %b %Y").lstrip("0")
    months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
              "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    return f"{d.day} {months[d.month - 1]} {d.year}"


def generate_post(p, prev_post, next_post):
    url = f"{SITE}/blog/{p['slug']}.html"
    head = HEAD_TOP.format(
        stamp=BUILD_STAMP, title=html.escape(p["title_id"]), desc=html.escape(p["desc_id"]),
        canonical=url, canonical_en=url + "?lang=en", og_image=f"{SITE}/{p['cover']}")
    body_id = md_to_html(p["body_id"])
    body_en = md_to_html(p["body_en"])
    mins = {"id": read_minutes(p["body_id"]), "en": read_minutes(p["body_en"])}
    page_json = json.dumps({
        "h1": {"id": p["h1_id"], "en": p["h1_en"]},
        "excerpt": {"id": p["excerpt_id"], "en": p["excerpt_en"]},
        "body": {"id": body_id, "en": body_en},
        "mins": mins,
        "meta": {"id": f"{fmt_date(p['_date'])} &middot; {mins['id']} mnt baca &middot; dr. Yoanita Budiwiyono",
                 "en": f"{fmt_date_en(p['_date'])} &middot; {mins['en']} min read &middot; dr. Yoanita Budiwiyono"},
        "prev": ({"slug": prev_post["slug"], "h1": {"id": prev_post["h1_id"], "en": prev_post["h1_en"]}}
                 if prev_post else None),
        "next": ({"slug": next_post["slug"], "h1": {"id": next_post["h1_id"], "en": next_post["h1_en"]}}
                 if next_post else None),
    }, ensure_ascii=False)
    hero_pic = cover_picture(p["cover"], p.get("cover_webp"), p["h1_id"], hero=True)
    date_id = fmt_date(p["_date"])
    meta_id = f"{date_id} &middot; {mins['id']} mnt baca &middot; dr. Yoanita Budiwiyono"
    prev_html = (f'<a id="bPrev" href="{prev_post["slug"]}.html" style="color:var(--bg-dark);text-decoration:none;font-size:16px;"></a>'
                 if prev_post else "")
    next_html = (f'<a id="bNext" href="{next_post["slug"]}.html" style="color:var(--bg-dark);text-decoration:none;font-size:16px;"></a>'
                 if next_post else "")
    return f"""{head}
{blogposting_jsonld(p)}
{MEDICAL_JSONLD}
<link rel="stylesheet" href="../styles.css">
</head>
<body>
{NAV.format(wa=WA_GENERIC)}
<main id="main">
<article style="padding:120px 24px 20px;max-width:760px;margin:0 auto;">
  <a href="./" style="color:var(--text-muted);font-size:14px;text-decoration:none;" data-i18n="blog_back">&#8592; Semua Artikel</a>
  <h1 id="bH1" style="font-size:clamp(28px,5vw,44px);line-height:1.2;margin:16px 0 12px;">{html.escape(p["h1_id"])}</h1>
  <p id="bMeta" style="font-size:14px;color:var(--text-muted);margin:0 0 24px;">{meta_id}</p>
  <div style="margin:0 0 32px;">{hero_pic}</div>
  <div id="bBody">{body_id}</div>
</article>
<nav style="max-width:760px;margin:0 auto;padding:20px 24px 40px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;">
  <span>{prev_html}</span>
  <span>{next_html}</span>
</nav>
<section class="section" style="padding:40px 24px;text-align:center;">
  <p style="font-size:17px;color:var(--text-muted);margin-bottom:20px;" data-i18n="t_cta_lead">Butuh konsultasi lebih lanjut? Hubungi kami langsung.</p>
  <a href="{WA_GENERIC}" class="btn-book-hero" target="_blank" rel="noopener" style="display:inline-block;background:#25d366;color:#fff;padding:14px 32px;border-radius:50px;font-weight:600;text-decoration:none;" data-i18n="t_cta_btn">Konsultasi via WhatsApp</a>
</section>
</main>
{FOOTER.format(wa=WA_GENERIC)}
{QUIZ.format(wa=WA_GENERIC)}
{SCRIPTS_BLOG}
<script>
(function() {{
  var PAGE = {page_json};
  function render(lang) {{
    var L = (lang === 'en') ? 'en' : 'id';
    var el;
    if ((el = document.getElementById('bH1'))) el.textContent = PAGE.h1[L] || PAGE.h1.id;
    if ((el = document.getElementById('bBody'))) el.innerHTML = PAGE.body[L] || PAGE.body.id;
    if ((el = document.getElementById('bMeta'))) el.innerHTML = PAGE.meta[L] || PAGE.meta.id;
    if ((el = document.getElementById('bPrev')) && PAGE.prev) el.textContent = '\\u2190 ' + (PAGE.prev.h1[L] || PAGE.prev.h1.id);
    if ((el = document.getElementById('bNext')) && PAGE.next) el.textContent = (PAGE.next.h1[L] || PAGE.next.h1.id) + ' \\u2192';
  }}
  document.addEventListener('langchange', function() {{ render(currentLang); }});
  if (window.location.search.indexOf('lang=en') !== -1 && typeof setLang === 'function') setLang('en');
  render(currentLang || 'id');
}})();
</script>
</body>
</html>"""


def generate_index(posts):
    url = SITE + "/blog/"
    head = HEAD_TOP.format(
        stamp=BUILD_STAMP,
        title="Blog | Aesthetic Clinic Revolushine Surabaya",
        desc="Artikel seputar perawatan kulit, treatment estetika, dan tips dari dr. Yoanita Budiwiyono di Aesthetic Clinic Revolushine Surabaya.",
        canonical=url, canonical_en=url + "?lang=en",
        og_image=SITE + "/img/revolushine-social-preview.jpg")
    cards_json = json.dumps([{
        "slug": p["slug"], "date": fmt_date(p["_date"]),
        "cover": p["cover"], "cover_webp": p.get("cover_webp", ""),
        "title": {"id": p["h1_id"], "en": p["h1_en"]},
        "excerpt": {"id": p["excerpt_id"], "en": p["excerpt_en"]},
        "mins": {"id": read_minutes(p["body_id"]), "en": read_minutes(p["body_en"])},
    } for p in posts], ensure_ascii=False)
    empty = ""
    if not posts:
        empty = """<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted);">
    <p style="font-size:18px;margin:0 0 8px;">Artikel segera hadir. / Articles coming soon.</p>
    <p style="font-size:15px;margin:0;">Ikuti Instagram <a href="https://www.instagram.com/revolushine.id/" style="color:var(--bg-dark);">@revolushine.id</a> untuk update terbaru.</p>
  </div>"""
    return f"""{head}
{MEDICAL_JSONLD}
<link rel="stylesheet" href="../styles.css">
</head>
<body>
{NAV.format(wa=WA_GENERIC)}
<main id="main">
<section style="padding:120px 24px 60px;max-width:1000px;margin:0 auto;">
  <a href="../" style="color:var(--text-muted);font-size:14px;text-decoration:none;" data-i18n="t_back">&#8592; Kembali ke Beranda</a>
  <h1 style="font-size:clamp(30px,5vw,46px);margin:16px 0 12px;" data-i18n="blog_h1">Blog</h1>
  <p style="font-size:17px;color:var(--text-muted);margin:0 0 36px;" data-i18n="blog_lead">Artikel seputar kulit &amp; treatment dari tim Aesthetic Clinic Revolushine.</p>
  <div id="blogGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:28px;">
  {empty}
  </div>
</section>
</main>
{FOOTER.format(wa=WA_GENERIC)}
{QUIZ.format(wa=WA_GENERIC)}
{SCRIPTS_BLOG}
<script>
(function() {{
  var POSTS = {cards_json};
  function card(p, L) {{
    var img = '<img loading="lazy" decoding="async" src="../' + p.cover + '" alt="" style="width:100%;height:200px;object-fit:cover;display:block;">';
    if (p.cover_webp) img = '<picture><source srcset="../' + p.cover_webp + '" type="image/webp">' + img + '</picture>';
    var more = (L === 'en') ? 'Read &rarr;' : 'Baca &rarr;';
    var mins = (L === 'en') ? p.mins.en + ' min read' : p.mins.id + ' mnt baca';
    return '<a href="' + p.slug + '.html" style="display:block;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);text-decoration:none;color:inherit;">'
      + img
      + '<div style="padding:20px 22px 24px;"><p style="font-size:13px;color:var(--text-muted);margin:0 0 8px;">' + p.date + ' &middot; ' + mins + '</p>'
      + '<h2 style="font-size:19px;margin:0 0 8px;line-height:1.4;">' + p.title[L] + '</h2>'
      + '<p style="font-size:15px;color:var(--text-muted);margin:0 0 12px;line-height:1.65;">' + p.excerpt[L] + '</p>'
      + '<span style="color:var(--bg-dark);font-size:15px;font-weight:600;">' + more + '</span></div></a>';
  }}
  function render(lang) {{
    var L = (lang === 'en') ? 'en' : 'id';
    var grid = document.getElementById('blogGrid');
    if (grid && POSTS.length) grid.innerHTML = POSTS.map(function(p) {{ return card(p, L); }}).join('');
  }}
  document.addEventListener('langchange', function() {{ render(currentLang); }});
  if (window.location.search.indexOf('lang=en') !== -1 && typeof setLang === 'function') setLang('en');
  render(currentLang || 'id');
}})();
</script>
</body>
</html>"""


def generate_rss(posts):
    items = []
    for p in posts:
        link = f"{SITE}/blog/{p['slug']}.html"
        pub = p["_date"].strftime("%a, %d %b %Y 00:00:00 +0700")
        items.append(
            "  <item>\n"
            f"    <title>{xml_escape(p['h1_id'])}</title>\n"
            f"    <link>{link}</link>\n"
            f"    <guid>{link}</guid>\n"
            f"    <pubDate>{pub}</pubDate>\n"
            f"    <description>{xml_escape(p['excerpt_id'])}</description>\n"
            "  </item>")
    return ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
            "<rss version=\"2.0\">\n<channel>\n"
            "  <title>Blog Aesthetic Clinic Revolushine</title>\n"
            f"  <link>{SITE}/blog/</link>\n"
            "  <description>Artikel seputar perawatan kulit dan treatment estetika dari Aesthetic Clinic Revolushine Surabaya.</description>\n"
            "  <language>id</language>\n"
            + "\n".join(items) + ("\n" if items else "")
            + "</channel>\n</rss>\n")


def main():
    OUT_DIR.mkdir(exist_ok=True)
    (ROOT / "img" / "blog").mkdir(exist_ok=True)
    posts = []
    if POSTS_DIR.exists():
        for path in sorted(POSTS_DIR.glob("*.md")):
            if path.name.startswith("_"):
                continue
            posts.append(parse_post(path))
    posts.sort(key=lambda p: p["_date"], reverse=True)
    slugs = [p["slug"] for p in posts]
    if len(set(slugs)) != len(slugs):
        raise ValueError("duplicate slugs: " + ", ".join(slugs))
    for i, p in enumerate(posts):
        prev_post = posts[i - 1] if i > 0 else None
        next_post = posts[i + 1] if i < len(posts) - 1 else None
        out = OUT_DIR / f"{p['slug']}.html"
        out.write_text(generate_post(p, prev_post, next_post), encoding="utf-8")
        print(f"Created: {out}")
    (OUT_DIR / "index.html").write_text(generate_index(posts), encoding="utf-8")
    print(f"Created: {OUT_DIR / 'index.html'} ({len(posts)} posts)")
    (OUT_DIR / "feed.xml").write_text(generate_rss(posts), encoding="utf-8")
    print(f"Created: {OUT_DIR / 'feed.xml'}")
    if posts:
        print("\nSitemap entries to add (sitemap.xml is hand-maintained):")
        print(f"  blog/ lastmod {posts[0]['date']}")
        for p in posts:
            print(f"  blog/{p['slug']}.html lastmod {p['date']}")


if __name__ == "__main__":
    main()
