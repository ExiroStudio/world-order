# 🌍 World Order — Monopoli Ideologi Dunia

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3-FBF0DF?style=for-the-badge&logo=bun)](https://bun.sh/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

**World Order** adalah game papan (monopoli) edukatif bertema sejarah dan geopolitik dunia. Permainan ini mempertemukan 4 ideologi besar dunia yang saling bersaing untuk menguasai wilayah peradaban, mengelola modal kas, menjawab kuis pengetahuan sejarah, dan mengeksekusi keunggulan (*perk*) khas masing-masing ideologi.

---

## 🌟 Fitur Utama

### 1. ⚔️ 4 Ideologi Besar Dunia & Perk Unik
Setiap ideologi memiliki peran sejarah dan kekuatan khas (*perk*) yang mengubah taktik permainan:
- 🔵 **Liberalisme** (*Pasar Bebas*): Menerima kompensasi ekstra **+$20** dari bank setiap kali wilayah kekuasaannya dikunjungi oleh ideologi lain.
- 🔴 **Komunisme** (*Kolektivisasi*): Mendapatkan diskon harga **20%** saat membeli wilayah negara baru.
- 🔘 **Fasisme** (*Ekspansi Paksa*): Hanya membayar **50%** saat terkena dampak *malus* Basis Kekuatan atau Upeti Kongres Dunia.
- 🟢 **Kapitalisme** (*Profit Maksimal*): Mendapatkan bonus pemasukan ekstra **+25%** setiap kali melintasi atau mendarat di petak Kongres Dunia.

### 2. 🕹️ 2 Mode Permainan
- **🎮 Mode Offline / Lokal (Pass-and-Play)**: Dimainkan dalam 1 layar (*hotseat*) bergantian. Sangat cocok untuk presentasi kelompok atau pembelajaran interaktif di kelas tanpa memerlukan koneksi internet.
- **🌐 Mode Online Multiplayer**: Bermain bersama antar-perangkat secara *real-time* ditenagai oleh Firebase Firestore dengan sistem lobi berbasis Kode Room 6 karakter.

### 3. 🛡️ Sistem Anti-Kecurangan (Anti-Cheat System)
Diperkuat dengan pertahanan keamanan bertingkat untuk menjamin keadilan permainan:
- **🔒 Proteksi Seleksi & Salin Teks**: Menonaktifkan blok seleksi teks, gestur tahan lama (*long-press*) di mobile & desktop, klik kanan (*context menu*), serta *keyboard shortcut* penyalinan. Elemen formulir tetap interaktif secara aman.
- **🚨 Akibat Meninggalkan Permainan**:
  - Memantau pergerakan tab/aplikasi (`visibilitychange` & `blur`) saat giliran pemain sedang berlangsung.
  - Memicu konsekuensi geopolitik tematik: *"Anda meninggalkan permainan, para ideologi mulai mencuri dari anda"*.
  - Pemotongan kas sebesar **$100 × jumlah negara** yang dimiliki (didistribusikan ke ideologi rival), serta pembatalan otomatis kuis pertanyaan jika beralih tab saat kuis aktif.
- **🔀 Pengacakan Opsi Kuis**: Posisi pilihan jawaban diacak secara dinamis pada setiap giliran untuk mencegah hafalan pola jawaban.

---

## 🛠️ Stack Teknologi

- **Frontend & Framework**: [Next.js 16 (App Router + Turbopack)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), Google Fonts (*Fraunces Serif* & *Inter*)
- **Realtime Database**: [Firebase Firestore](https://firebase.google.com/) (Transaction-based State Arbiter)
- **Runtime & Unit Testing**: [Bun](https://bun.sh/) (`bun test` unit test suite)

---

## 📁 Struktur Proyek

```text
world-order/
├── src/
│   ├── app/
│   │   ├── api/room/        # Endpoint API Room Multiplayer (Create, Join, Start, Action)
│   │   ├── local/           # Halaman Permainan Mode Lokal (Pass-and-Play)
│   │   ├── room/[code]/     # Halaman Permainan Mode Online Multiplayer
│   │   ├── globals.css      # Styling Global & Proteksi Anti-Cheat CSS
│   │   └── page.tsx         # Main Menu / Landing Page
│   ├── components/          # Komponen UI (Board, Tile, Scoreboard, Modals, GameLog, dll)
│   ├── hooks/               # Custom Hook (useAntiCheat)
│   ├── lib/                 # Core Engine, Board Tiles, Game Config, Firestore Store & Test Suite
│   └── types/               # TypeScript Definitions & Types
├── public/                  # Asset Statis & Favicon
├── README.md                # Dokumentasi Proyek
├── package.json
└── tsconfig.json
```

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) v18+ atau [Bun](https://bun.sh/) (Direkomendasikan)

### 1. Kloning Repositori & Instalasi Dependensi
```bash
git clone https://github.com/ExiroStudio/world-order.git
cd world-order

# Menggunakan Bun (Direkomendasikan)
bun install

# Atau menggunakan NPM
npm install
```

### 2. Konfigurasi Environment Variables (`.env`)
Buat file `.env` di direktori utama repositori dan isi dengan kredensial Firebase Anda:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Jalankan Server Pengembang (Development Server)
```bash
bun dev
# atau
npm run dev
```
Buka peramban dan akses `http://localhost:3000`.

### 4. Menjalankan Unit Test
```bash
bun test
```

### 5. Build Produksi
```bash
bun run build
bun start
```

---

## 📄 Hak Cipta & Lisensi

© 2026 **Kelompok 9** — *World Order • Monopoli Ideologi Dunia*. Seluruh Hak Cipta Dilindungi Undang-Undang.
