# EduPathway — Offline Tracker

Panduan interaktif dan checklist lokal untuk membantu calon mahasiswa
merencanakan studi ke luar negeri. Murni **frontend, tanpa backend** — semua
data (negara pilihan, progres checklist, profil) tersimpan di `localStorage`
milik perangkat pengguna, tidak ada request ke server mana pun.

## Fitur

- **Onboarding** — pilih negara tujuan (Australia, Inggris, Jerman, Jepang,
  Amerika Serikat) tanpa perlu login.
- **Dashboard Tracker** — roadmap & checklist dokumen yang di-hardcode per
  negara, dikelompokkan per kategori (Bahasa, Dokumen, Akademik, Finansial,
  Visa), dengan lingkaran persentase "siap berangkat".
- **Kontak Agen** — form Nama & Jurusan yang merakit template pesan
  WhatsApp/Email secara otomatis, lalu membuka aplikasi WhatsApp/Email
  bawaan perangkat (link `wa.me` / `mailto:`).
- **Profil** — Nama, NIM, peran perancang UI/UX, serta rating & review
  simulasi.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Build untuk produksi:

```bash
npm run build
npm run preview   # coba hasil build secara lokal
```

## Catatan teknis

- Routing memakai `react-router-dom` dengan `HashRouter` (bukan
  `BrowserRouter`) supaya hasil build statis bisa langsung dihosting di
  mana saja — termasuk GitHub Pages — tanpa perlu konfigurasi rewrite di
  server untuk client-side routing.
- Semua ikon dari `lucide-react`, tidak ada aset gambar eksternal sehingga
  bundle tetap ringan.
- Progres checklist disimpan terpisah per negara, jadi berpindah negara di
  "Ganti negara" tidak menghapus progres negara sebelumnya.

## Deploy ke GitHub Pages (opsional)

1. Set `base` di `vite.config.js` sesuai nama repo, contoh:
   ```js
   export default defineConfig({
     base: '/EduPathway/',
     // ...plugin lain tetap
   })
   ```
2. `npm run build`, lalu deploy isi folder `dist/` ke branch `gh-pages`
   (bisa pakai package `gh-pages` atau GitHub Actions).
