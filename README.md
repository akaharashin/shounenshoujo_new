# Shounen Shoujo

Website resmi **Shounen Shoujo** — komunitas J-Pop & Anikura Indonesia yang aktif
menghadirkan Random Play Dance (RPD), Odottemita, dan Utattemita di berbagai event
Jejepangan. Situs statik satu halaman (landing page) dengan dukungan tema terang/gelap
dan multi-bahasa (ID / EN / JA).

## Tech Stack

- **Vue 3.5** (Single-File Component, `<script setup>`)
- **Vite 7** (build & dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, token tema `@theme` di `src/style.css` — tanpa `tailwind.config`)
- `vite-plugin-image-optimizer` (kompresi gambar saat build; butuh `sharp`)
- Deploy: **Netlify** (https://shounenshoujo.netlify.app/)

## Menjalankan

```bash
npm install      # pasang dependency
npm run dev      # dev server (hot reload)
npm run build    # build produksi → dist/
npm run preview  # preview hasil build secara lokal
```

> Catatan: agar `vite-plugin-image-optimizer` berjalan saat build, pasang juga
> `sharp` (dan `svgo` bila perlu) sebagai devDependency.

## Deploy (Netlify)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Aset publik (logo, thumbnail, `robots.txt`, `sitemap.xml`) ada di `public/`.

## Struktur Singkat

```
index.html                       # entry + meta SEO + skrip anti-FOUC tema
src/
  main.js                        # bootstrap Vue
  App.vue                        # wrapper, render <ShounenShoujo>
  style.css                      # token tema (@theme) + base
  components/ShounenShoujo.vue   # seluruh isi situs (hero, about, kegiatan, kontak, footer)
public/image/                    # logo & thumbnail (.webp)
```
