# EduRise Learning Portal

Platform Learning Management System (LMS) modern yang berfokus pada kecepatan, SEO, dan pengalaman pengguna yang mulus. Dibangun menggunakan ekosistem **Next.js 15**, **Tailwind CSS**, dan **TypeScript**.

---

## 🚀 Instruksi Instalasi

1. **Clone & Masuk ke Folder**
   ```bash
   git clone https://github.com/ikhwanuddin39/edurise-portal
   cd edurise-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

4. **Akun Uji Coba (Demo)**
   - **Email**: `user@gmail.com`
   - **Password**: `password123`

---

## 🏗️ Keputusan Arsitektur

### 1. Pemisahan Komponen (Server vs Client)
Kita menerapkan strategi **Server-First**. Secara default, semua komponen adalah Server Components untuk meminimalkan beban JavaScript di sisi browser.
- **Server Components**: Digunakan untuk bagian yang berinteraksi dengan data (fetching) dan layout statis (seperti `Navbar`, `Footer`, `StatsCards`, dan `CourseCard`). Ini membuat performa LCP (Largest Contentful Paint) sangat cepat.
- **Client Components**: Hanya digunakan pada bagian yang membutuhkan interaktivitas tinggi, seperti `FilterModal`, `SearchBar`, dan form input. Kita menandainya dengan direktif `"use client"`.

### 2. Struktur Folder & Route Groups
- **Route Groups `(auth)` & `(main)`**: Digunakan untuk memisahkan logika layout tanpa mempengaruhi URL.
  - `(auth)`: Untuk halaman login/register dengan layout minimalis.
  - `(main)`: Membungkus halaman inti aplikasi (Dashboard, Course, Profile) yang berbagi layout Header & Footer yang sama.
- **Shared Components**: Komponen yang bisa dipakai berulang kali disimpan di folder `components/shared` untuk menjaga prinsip DRY (*Don't Repeat Yourself*).

---

## 📊 State Management & Data Fetching

### State Management
Kami memilih untuk **tidak menggunakan library pihak ketiga** (seperti Redux atau Zustand). Alasannya:
- **URL sebagai State**: Untuk fitur filter dan pencarian di Katalog Kursus, kami menggunakan `URLSearchParams`. Ini memungkinkan user untuk melakukan *bookmark* atau membagikan link kursus dengan filter yang sudah aktif (SEO-friendly).
- **React State (useState)**: Digunakan hanya untuk UI state lokal yang bersifat efemeral, seperti status *open/close* modal atau nilai input form sementara.
- **Server State**: Next.js App Router secara otomatis menangani *caching* dan revalidasi data, sehingga kita tidak perlu menyimpan data global di sisi client.

### Data Fetching
Kami menggunakan **Native Fetch API** yang dibungkus dalam helper `serverFetch`.
- **Alasan**: Fetch API di Next.js sudah memiliki fitur caching dan deduplikasi bawaan. Menggunakan library seperti Axios hanya akan menambah ukuran bundle tanpa memberikan keuntungan signifikan untuk skala proyek ini.
- **Server-Side Fetching**: Sebagian besar pengambilan data dilakukan langsung di Server Components untuk menghindari *request waterfall* di sisi browser stage.

---

## 🔒 Strategi Keamanan Simulasi

Salah satu aspek krusial adalah cara kami menyimpan token autentikasi. Kami memilih **HttpOnly Cookies** daripada `localStorage`.

**Kenapa bukan LocalStorage?**
- `localStorage` bisa diakses oleh JavaScript mana pun yang berjalan di halaman tersebut. Jika ada library pihak ketiga yang terinfeksi (serangan XSS), token bisa dicuri dengan mudah.

**Argumen Keamanan Kami:**
- **HttpOnly**: Flag ini membuat cookie tidak bisa dibaca oleh JavaScript browser, sehingga serangan XSS tidak bisa mengambil token.
- **SameSite Strict**: Mencegah serangan CSRF (Cross-Site Request Forgery) dengan memastikan browser hanya mengirimkan cookie jika permintaan berasal dari domain yang sama.
- **Server-Side Validation**: Karena token ada di cookie, server bisa langsung memvalidasi autentikasi saat melakukan SSR (Server-Side Rendering) sebelum halaman dikirim ke user.

---

## 🛠️ Catatan Implementasi Khusus
- **Skeleton Screens**: Kami menggunakan komponen Skeleton pada Dashboard dan Profil untuk memberikan transisi visual yang halus saat menunggu data dari API, menghindari efek "layout shift".
- **Optimistic Updates (Manual Logic)**: Pada bagian pengaturan notifikasi, kami menerapkan logika perubahan instan di UI dengan kontrol manual (Save Button) untuk memastikan data benar-benar tersinkronisasi sebelum dianggap sukses secara permanen.
