# 🚀 Panduan Lengkap Cloudflare D1 Database & Git Deployment untuk Ronald 3D

Website Ronald 3D telah dilengkapi dengan backend serverless API terintegrasi (`functions/api/events.js`), file schema SQLite (`schema.sql`), dan CMS Modal interaktif yang siap terhubung langsung dengan **Cloudflare D1 Database**.

---

## 📋 Langkah 1: Push Project ke GitHub / Git

1. Inisialisasi Git di komputer Anda (jika belum):
```bash
git init
git add .
git commit -m "feat: Ronald 3D Website with Cloudflare D1 CMS & 6-column Calendar"
```

2. Hubungkan ke remote repository GitHub Anda:
```bash
git branch -M main
git remote add origin https://github.com/pedansaresahku-bit/dj-ronald-3d.git
git push -u origin main
```

---

## 🗄️ Langkah 2: Buat Database Cloudflare D1

Jalankan perintah berikut di terminal (atau buat langsung melalui Cloudflare Dashboard):

```bash
# Login ke Cloudflare jika belum
npx wrangler login

# Buat database D1
npx wrangler d1 create ronald3d-db
```

Wrangler akan memberikan output seperti ini:
```toml
[[d1_databases]]
binding = "DB"
database_name = "ronald3d-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

> **PENTING:** Salin `database_id` yang dihasilkan ke dalam file `wrangler.toml` di baris `database_id = "..."`.

---

## ⚡ Langkah 3: Eksekusi Schema Database & Seed Data Tour

Jalankan file `schema.sql` untuk membuat tabel `events` dan mengisi 20 jadwal tur resmi September 2026 ke Cloudflare D1:

### A. Untuk Database Production (Cloudflare Remote):
```bash
npx wrangler d1 execute ronald3d-db --remote --file=./schema.sql
```

### B. Untuk Pengujian Lokal (Local Testing):
```bash
npx wrangler d1 execute ronald3d-db --local --file=./schema.sql
```

---

## 🌐 Langkah 4: Hubungkan ke Cloudflare Pages (Deploy via Git)

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Masuk ke **Workers & Pages** > Klik **Create application** > Pilih tab **Pages** > **Connect to Git**
3. Pilih repository GitHub Anda (`ronald-3d`).
4. Atur Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**.

### 🔗 Langkah 5: Binding D1 Database ke Cloudflare Pages
Setelah proses deploy pertama selesai:
1. Di Cloudflare Dashboard, buka project Pages Anda (**ronald-3d**).
2. Masuk ke tab **Settings** > **Functions**.
3. Gulir ke bawah ke bagian **D1 Database Bindings** > Klik **Add binding**:
   - **Variable name**: `DB`  *(Wajib huruf besar `DB`)*
   - **D1 database**: `ronald3d-db`
4. Klik **Save**.
5. Lakukan redeploy (atau buat commit baru di Git) agar fungsi Pages membaca binding D1 yang baru.

---

## 🖥️ Cara Menjalankan Lokal dengan D1 (Wrangler Pages Dev)

Untuk menjalankan server lokal yang langsung terhubung ke D1 lokal:

```bash
npx wrangler pages dev . --d1 DB=ronald3d-db --local
```

Website akan berjalan di `http://localhost:8788`.
- Buka website > klik tombol icon **CMS** di bagian Kalender.
- Status akan menampilkan: **"Cloudflare D1: Connected"**.
- Semua penambahan jadwal event baru akan disimpan langsung ke database SQLite D1!

---

## 🛠️ Ringkasan API Endpoints Cloudflare Pages

| Endpoint | Method | Fungsi |
| :--- | :--- | :--- |
| `/api/events` | `GET` | Mengambil seluruh jadwal event dari tabel `events` di D1 |
| `/api/events` | `POST` | Menambahkan jadwal event baru ke D1 |
| `/api/events` | `PUT` | Memperbarui jadwal event yang sudah ada di D1 |
| `/api/events` | `DELETE` | Menghapus event berdasarkan ID (`?id=gig-xxx`) di D1 |

*Catatan: Sistem dilengkapi dengan fail-safe otomatis. Jika dijalankan di environment tanpa D1 (seperti preview statis lokal biasa), CMS tetap berfungsi mulus menggunakan `localStorage` tanpa error.*
