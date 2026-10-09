Searched for "RaporPerkalian"
Searched for "RaporPengurangan"
Listed directory AnalisaHasil
Listed directory Perkalian
Listed directory Pengurangan
Viewed PEDOMAN_STANDAR_SISTEM_RAPOR_PENGUASAAN_GASING.md:1-150
Viewed PEDOMAN_STANDAR_SISTEM_RAPOR_PENGUASAAN_GASING.md:151-234
Viewed PERENCANAAN_SISTEM_LAPORAN_PERKALIAN.md:1-100

Pertanyaan yang sangat jeli dan tepat sekali! 

Poin 1–6 yang saya tuliskan sebelumnya merupakan **ringkasan eksekusi garis besar**, sehingga **memang masih ada beberapa komponen kunci dan pilar penting dari pengerjaan Perkalian (Zona 3) dan Pengurangan (Zona 4) yang belum tertulis secara eksplisit**.

Agar tidak ada satu pun detail yang terlewat saat kita terapkan pada **Zona 1 (Mengenal Bilangan)** maupun zona-zona lainnya nanti, berikut adalah **komponen-komponen krusial dari Perkalian & Pengurangan yang wajib ditambahkan**, disusul dengan **Daftar Standar Baku Terpadu (12 Komponen Penuh)**.

---

## 🔍 Apa Saja yang Belum Masuk di Poin 1–6 Sebelumnya?

Jika kita membandingkan dengan sistem di **Perkalian (Zona 3)** dan **Pengurangan (Zona 4)** serta pedoman resmi di `AnalisaHasil/Pengurangan/PEDOMAN_STANDAR_SISTEM_RAPOR_PENGUASAAN_GASING.md`, ada **6 komponen krusial** yang belum disebutkan di poin 1–6 sebelumnya:

### 1. In-Game Realtime Evaluation Card (Overlay Akhir Permainan)
- **Di Perkalian & Pengurangan:** Ketika anak selesai bermain game (baik di layar Kemenangan maupun Game Over), sistem tidak hanya menampilkan skor/bintang, melainkan otomatis memunculkan **Kartu Evaluasi Penguasaan GASING (`PenguasaanCard.astro`)** via `EngineOverlayManager.ts`.
- **Fungsi:** Menampilkan akurasi %, badge tingkatan (*Expert/Good/Okay/Beginner*), dan kalimat kemampuan konkret secara instan saat itu juga, serta menjadi pemicu pencatatan data ke memori/server.

### 2. Triple-Layer Storage & SQLite Backend API
- **Di Perkalian & Pengurangan:** Data capaian anak tidak hanya disimpan di memori browser, melainkan menggunakan arsitektur 3 lapis:
  1. *Lapis 1:* **Reactive Store (NanoStores)** untuk pembaruan UI instan tanpa reload.
  2. *Lapis 2:* **LocalStorage Offline-First** (`gasing_[zona]_stats`) agar anak bisa bermain lancar di daerah tanpa sinyal internet.
  3. *Lapis 3:* **SQLite Database Server** (`/api/progress/rapor-[zona]` ke `web/data/progress.db`) agar data tersimpan permanen dan dapat diakses sekolah/guru dari perangkat lain.

### 3. Dua Visualisasi Grafik Chart.js Dinamis (Bebas Memory Leak)
- **Di Perkalian & Pengurangan:** Dashboard bukan sekadar tabel angka, tetapi wajib menyajikan 2 grafik:
  - **Grafik 1 (Bar Chart):** Frekuensi Bermain Tiap Game dengan **Garis Ambang Batas 3x**. Game yang dimainkan $<3\times$ berwarna oranye (penanda jam terbang kurang); game $\ge 3\times$ berwarna hijau emerald.
  - **Grafik 2 (Stacked Bar Chart):** Rasio Capaian Sempurna (*Perfect* 100%), Lulus (*Passed* 60–99%), dan Butuh Latihan (*Failed* $<60\%$) per Level (Level 1 s.d. 6).
  - Wajib memiliki controller dengan pembersihan instan `destroyCharts()` saat modal ditutup agar RAM peramban tidak bocor.

### 4. Diagnostik Cerdas "Top Strengths" & "Action Items" pada Dokumen Cetak
- **Di Perkalian & Pengurangan:** Lembar cetak A4 tidak hanya mencetak tabel mentah, tetapi dilengkapi algoritma otomatis:
  - **Top Strengths:** Menampilkan 2–3 materi terkuat di mana anak meraih akurasi tertinggi dan sesi sempurna terbanyak (membangun rasa percaya diri anak).
  - **Action Items:** Menyeleksi materi yang paling sering gagal/timeout, memberikan instruksi konkret materi apa yang harus diulang bersama guru, dan video Asyiknya Belajar / Tanya Marcia mana yang perlu ditonton ulang.

### 5. Format Cetak Resmi A4 Berkop dengan Tanda Tangan Ganda
- **Di Perkalian & Pengurangan:** Fitur cetak menyediakan layout surat resmi:
  - Kop resmi lembaga (*Sacred Octagon & GASING Academy*).
  - Data identitas siswa, NIS, kelas, sekolah, kabupaten/kota, tanggal evaluasi.
  - Catatan evaluasi pedagogis guru pembimbing.
  - **Kolom Pengesahan Tanda Tangan Ganda:** Tanda tangan Guru Pembimbing (dengan NIP/ID) dan tanda tangan Orang Tua/Wali Murid.

### 6. Deep-Link URL Parameter & Otomasi Pengujian E2E (Playwright)
- **Deep-Link URL:** Dashboard mendukung parameter `?openRapor=[nama_materi]` (misal: `?openRaporMengenalBilangan=true`) sehingga dashboard bisa langsung membuka modal rapor terkait dari tautan notifikasi atau rapor profil.
- **Otomasi E2E Playwright:** Pengujian otomatis (`e2e/rapor-[zona].spec.ts`) yang memvalidasi alur pembukaan modal, render canvas grafik, pratinjau cetak A4, dan kepatuhan tampilan mobile portrait (390×844) tanpa crash.

---

## 🏛️ DAFTAR STANDAR BAKU TERPADU (12 KOMPONEN LENGKAP)
### *Canonical Blueprint untuk Diterapkan pada Zona 1 (Mengenal Bilangan) & Zona Lainnya*

Menggabungkan seluruh keunggulan dari **Perkalian (Zona 3)**, **Pengurangan (Zona 4)**, dan inovasi terbaru **Penjumlahan (Zona 2)**, berikut adalah **12 Komponen Standar Baku** yang tidak boleh ada yang tertinggal:

```
┌────────────────────────────────────────────────────────────────────────┐
│             STANDAR BAKU SISTEM RAPOR GASING (12 PILAR)                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Audit Gameplay Nyata & Pemetaan Angka Konkret                       │
│ 2. Sinkronisasi Teks Luar (howToPlay, aiHelp, Banner) [No Game Edit]   │
│ 3. Master Sprint Plan & Dokumen Perencanaan Pedagogis (AnalisaHasil)   │
│ 4. Single Source of Truth (SSOT) Types & Registry Formula Konkret      │
│ 5. In-Game 3 Pilar Panduan Lengkap pada Tombol [ ? ] HUD               │
│ 6. In-Game Evaluation Overlay (PenguasaanCard pada Layar Akhir Game)   │
│ 7. Triple-Layer Storage (NanoStores + LocalStorage + SQLite Server)    │
│ 8. Dashboard Rapor Interaktif: 4 KPI, Sebaran Tingkat, Matriks Filter  │
│ 9. Dua Grafik Chart.js Dinamis (Target 3x & Rasio Hasil per Level)     │
│ 10. Pop-Up '📖 Panduan & Info Game' pada Tiap Baris Tabel Dashboard    │
│ 11. Dokumen Cetak Resmi A4: Top Strengths, Action Items, TTD Ganda     │
│ 12. Quality Gate: Rule 24 (<500 LOC), Rule 25 (0 Oxlint), Test E2E/Unit│
└────────────────────────────────────────────────────────────────────────┘
```

---

### Rincian Checklist Penerapan untuk Zona 1 (Mengenal Bilangan):

| No | Pilar Komponen | Yang Harus Disiapkan di Zona 1 (Mengenal Bilangan) | Status Kesiapan |
|:---:|:---|:---|:---:|
| **1** | **Audit Gameplay** | Membedah ke-20 game di `Zone1Level1` s.d. `Zone1Level6` (mengenal angka 1–10, pasangan angka, garis bilangan, membandingkan bilangan, nama & lambang bilangan) | ⏳ Siap dijalankan |
| **2** | **Koreksi Teks Luar** | Menyelaraskan teks instruksi di `howToPlayRegistry.ts`, `aiHelpRegistry.ts`, `questionBannerSimplifier.ts`, dan `extractedGameTitles.json` (semua berakhiran `!`) | ⏳ Siap disinkronkan |
| **3** | **Perencanaan & Sprint** | Dokumen di `AnalisaHasil/MengenalBilangan/PERENCANAAN_SISTEM_LAPORAN_MENGENAL_BILANGAN.md` & Sprint Plan resmi | ✅ Konsep dasar sudah ada |
| **4** | **Types & Registry SSOT** | Membuat `laporanMengenalBilanganTypes.ts` dan `laporanMengenalBilanganRegistry.ts` dengan formula konkret (misal: *"mengenal lambang bilangan dan jumlah benda 1 sampai 5 seperti menghitung 4 apel"*). | ⏳ Siap dibuat |
| **5** | **In-Game 3 Pilar** | Menghubungkan game Zona 1 ke `howToPlayPedagogicalEnricher.ts` agar modal `?` in-game menampilkan: (1) Apa yang Diukur, (2) Cara Bermain, (3) Info Game & Tips GASING. | ⏳ Siap dihubungkan |
| **6** | **In-Game Evaluation Overlay** | Mengaktifkan deteksi Zona 1 di `EngineOverlayManager.ts` agar kartu `PenguasaanCard` muncul di layar Victory/Game Over. | ⏳ Siap diaktifkan |
| **7** | **Triple-Layer Storage** | Membuat `mengenalBilanganRaporStore.ts` dan endpoint API SQLite `/api/progress/rapor-mengenal-bilangan.ts`. | ⏳ Siap dibuat |
| **8** | **Dashboard Rapor Modal** | Membuat `RaporMengenalBilanganZona1Modal.astro` dengan tema visual **Mesir Kuno / Padang Pasir** (karakteristik Zona 1). | ⏳ Siap dibuat |
| **9** | **2 Grafik Chart.js** | Menghadirkan Grafik Frekuensi (Target $\ge 3\times$) dan Grafik Rasio Hasil Sesi per Level 1–6 dengan controller `raporMengenalBilanganChartController.ts` (bebas memory leak). | ⏳ Siap dibuat |
| **10** | **Pop-Up Detail Tabel** | Menambahkan tombol `📖 Panduan & Info Game` di setiap baris tabel 20 game pada dashboard Zona 1. | ⏳ Siap dibuat |
| **11** | **Cetak A4 & Rekomendasi** | Membuat `RaporMengenalBilanganPrintModal.astro` lengkap dengan analisis Top Strengths, Action Items, dan lembar tanda tangan guru & orang tua. | ⏳ Siap dibuat |
| **12** | **Quality Gate & Testing** | Memastikan seluruh file $<500$ LOC, 0 error Oxlint, dan unit test registry lulus 100%. | ⏳ Wajib dipatuhi |

---

Dengan menambahkan seluruh komponen di atas, cetak biru kita kini **100% lengkap, setara dengan standar terbaik Perkalian & Pengurangan, plus membawa inovasi terbaru tombol Pop-Up Panduan 3 Pilar dari Penjumlahan**.

Apakah kita siap mulai mengeksekusi **Zona 1 (Mengenal Bilangan - 20 Games)** dengan standar 12 pilar lengkap ini?