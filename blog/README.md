# Blog — cara menambah artikel

Blog di-generate dari file Markdown oleh `generate_blog_pages.py`
(stdlib Python saja, tanpa install tambahan):

```bash
python3 generate_blog_pages.py
```

## 1. Tulis artikel

Duplikat `blog/posts/_template.md` menjadi file baru, mis.
`blog/posts/2026-10-05-judul-posting.md`, lalu isi:

- **Front-matter** (di antara dua garis `---`):
  - `slug`: huruf kecil, angka, strip saja → jadi `blog/<slug>.html`
  - `date`: `YYYY-MM-DD` (urutan terbaru dulu, dipakai RSS + sitemap)
  - `cover`: gambar fallback, mis. `img/blog/judul.jpg` (wajib)
  - `cover_webp`: versi webp, mis. `img/blog/judul.webp` (opsional, disarankan)
  - `title_id` / `title_en`: judul tab browser + SEO
  - `h1_id` / `h1_en`: judul artikel (default = title)
  - `excerpt_id` / `excerpt_en`: ringkasan untuk kartu listing + RSS
  - `desc_id` / `desc_en`: meta description (default = excerpt)
- **Isi ID** di bawah front-matter, **isi EN** setelah baris `===EN===`
  (kalau `===EN===` tidak ada, versi EN = versi ID + peringatan di log).
- Markdown yang didukung: `#`/`##`/`###`, paragraf, **tebal**,
  *miring*, `kode`, [tautan](url), ![gambar](src), list `-`/`1.`,
  `>` kutipan, blok ``` kode.
- File berawalan `_` (seperti `_template.md`) di-skip generator.

## 2. Siapkan gambar cover

Taruh di `img/blog/`, ikut konvensi situs (pair `.jpg` + `.webp`
via `<picture>`, mis. pakai `convert_to_webp.py` / `optimize_images.py`).
Dimensi dibaca otomatis via PIL kalau tersedia.

## 3. Generate + validasi

```bash
python3 generate_blog_pages.py
node --check script.js js/i18n.js
python3 -m http.server 8000  # cek /blog/ dan /blog/<slug>.html → 200
```

## 4. Publish

- `sitemap.xml` dirawat manual (lihat AGENTS.md): tambahkan entri
  `blog/` + tiap `blog/<slug>.html` (generator mencetak `lastmod`).
- `git add -A && git commit && git push origin main` (hanya bila diminta).
