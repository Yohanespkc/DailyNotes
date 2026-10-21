Rangkaian sprint yang baru saja diselesaikan (**SPRINT-ERB-00** sampai **SPRINT-ERB-06**) adalah pembangunan **infrastruktur pengujian responsif dan sertifikasi kompatibilitas perangkat (Device-Sensitive Testing Infrastructure)** untuk halaman web dan aplikasi Anda.

---

### 1. Untuk Apa Sprint Ini Dilakukan? (Latar Belakang & Tujuan)

Sebuah halaman web sering kali tampak sempurna di laptop pengembang, namun saat dibuka oleh pengguna di berbagai ponsel atau tablet nyata, sering muncul masalah:
1. **Layout Bocor (*Horizontal Overflow*)**: Konten melebar keluar layar sehingga muncul scrollbar horizontal yang merusak tampilan.
2. **Ergonomi Sentuh Buruk**: Tombol terlalu kecil (< 44px) sehingga sulit ditekan jempol pengguna di smartphone.
3. **Kehilangan Data Saat Layar Diputar**: Formulir atau state input pengguna hilang ketika layar dirotasi antara portrait dan landscape.
4. **Pengujian Manual yang Melelahkan**: Mengetes ulang setiap tombol dan alur klik di belasan jenis layar memakan waktu lama dan rentan kelalaian manusia.

**Tujuannya**: Membangun sistem yang bisa **merekam interaksi pengguna sekali saja**, lalu **memutarnya ulang (*replay*) secara otomatis di 16 kombinasi perangkat** (iPhone, Galaxy, Pixel, iPad, Desktop) sekaligus **menguji 15 parameter teknis** dan **menerbitkan sertifikat kelayakan (*MCard Certification*)** secara matematis dan anti-manipulasi (*tamper-proof*).

---

### 2. Apa Hasil yang Kita Peroleh? (Deliverables)

Dari seri sprint ini, Anda kini memiliki 7 modul kemampuan baru:

1. **Laboratorium Pengujian Interaktif Terstruktur (`ERB-00`)**:
   - Lab UI (`responsive-lab.html`) telah dimodularisasi penuh menjadi komponen ESM bersih di [`js/harness/`](file:///Users/yohanessurya/Documents/Development/MCard_TDD/LandingPage/js/harness/), terhubung lewat API terkontrol `window.__lab`.
2. **Perekam Interaksi Tanpa Beban UI (`ERB-01` - Ring Buffer & FSM)**:
   - Menggunakan algoritma *Circular Ring Buffer* yang mencatat setiap klik, ketikan, dan scroll di memori tanpa menurunkan frame rate (FPS) layar ataupun membuat browser macet.
3. **Profil Perangkat & Tingkat Kejujuran Emulasi (`ERB-05` - Fidelity Tiers)**:
   - Mengenali 8 profil perangkat resmi (iPhone 16 Pro, Galaxy S24, Pixel 8, iPad Air, MacBook, dll.) dengan model transparansi bertingkat:
     - **T0**: Iframe lab biasa (hanya ukuran layar).
     - **T1**: Emulasi browser Playwright (termasuk touch, rasio piksel DPR, dan User Agent mobile).
     - **T2**: Emulasi jaringan lambat (3G/3T) & pembatasan CPU.
     - **T3**: Perangkat fisik nyata di jaringan lokal (LAN).
4. **Normalisasi Koordinat Universal & Privasi (`ERB-02`)**:
   - Posisi sentuhan/klik dikonversi ke persentase relatif `[0.0, 1.0]`. Klik di sudut tombol pada layar ponsel dapat diputar ulang secara presisi di layar iPad atau desktop.
   - Otomatis menyensor kata sandi dan data sensitif (`INV-PRV-01`).
   - Otomatis mendeteksi tombol yang ukurannya kekecilan untuk jari pengguna (`INV-DEV-02`).
5. **Penyimpanan Permanen Kriptografis (`ERB-03` - MCard Triad Pipeline)**:
   - Setiap rekaman dan telemetri (FPS, jank, CLS/layout shift) disimpan permanen ke database SQLite lewat endpoint `/api/test-runs` dengan hash **Blake3**, sehingga riwayat uji tidak bisa dipalsukan.
6. **Robot Pemutar Ulang Deterministic Playwright (`ERB-04`)**:
   - Driver otomatis yang dapat memutar kembali alur interaksi pengguna dengan kecepatan 1x, 2x, atau 5x, membandingkan DOM digest akhir untuk memastikan sistem bekerja stabil.
7. **Katalog 15 Pengujian Conformance & Sertifikasi Digital (`ERB-06`)**:
   - Menguji 15 syarat otomatis: bebas overflow horizontal, bebas error console, meta viewport valid, tombol sentuh memenuhi standar aksesibilitas WCAG, safe-area notch, hingga preferensi reduced-motion.
   - Menerbitkan rekaman sertifikat resmi `urn:mcard:certification:responsive:v1` jika target lolos uji bebas overflow (`INV-DEV-01`) dan reflow rotasi stabil (`INV-DEV-03`).

---

### 3. Bagaimana Cara Melihat Hasilnya?

Anda dapat melihat dan menguji hasilnya melalui 3 cara:

#### Cara A: Melalui Antarmuka Visual (Browser)
Pastikan server lokal sedang berjalan (saat ini sudah aktif di port 3001), lalu buka browser ke:
👉 **`http://localhost:3001/responsive-lab.html`**

Di halaman ini Anda akan melihat:
1. **Recording Ribbon (Pita Kontrol Perekaman di Bawah Toolbar)**:
   - Tombol **🔴 Start**, **⏸ Pause**, **⏹ Stop**, dan tombol **💾 Save Test-Run**.
   - Indikator live event count, drop count, status touch warning, dan badge fidelity (contoh: `T0 · viewport only`).
2. **Panel Conformance (Di Sidebar Kiri)**:
   - Saat Anda memilih target dan perangkat, panel **Conformance** langsung menampilkan riwayat kelulusan check untuk perangkat tersebut (jumlah check *Pass*, *Fail*, *Skip* beserta daftar status per-item).
3. **Rotasi & Preset Layar**:
   - Klik chip perangkat (misal: *iPhone 16 Pro* atau *iPad Air*) lalu tekan tombol **🔄 Rotate (90°)** untuk melihat reflow halaman secara instan.

---

#### Cara B: Melalui Terminal (Pengujian Otomatis & Sertifikasi)
Buka terminal di direktori proyek dan jalankan perintah-perintah berikut:

1. **Melihat Sapuan 16 Kombinasi Perangkat Sekaligus**:
   ```bash
   npm run test:responsive
   ```
   *Hasil*: Playwright akan menjalankan browser dan mencetak tabel matriks 16 perangkat (8 device × portrait & landscape) lengkap dengan status overflow 0px dan deteksi error console.

2. **Menjalankan Pengujian Conformance & Menerbitkan Sertifikat MCard**:
   ```bash
   TARGET_URL=app.html MINT_RESULTS=1 npm run test:conformance
   ```
   *Hasil*: Menjalankan seluruh katalog check dan mencetak banner sertifikasi:
   ```text
   ================== DEVICE CONFORMANCE SUITE SUMMARY ==================
   TOTAL CONFORMANCE: 16/16 passed
   ----------------------------------------------------------------------
   CERTIFICATION VERDICT: 🏆 CERTIFIED (INV-DEV-01 & INV-DEV-03)
   Failures: None
   ----------------------------------------------------------------------
   [Certification] Minted MCard under urn:mcard:certification_latest:localhost-3001-app-html
   ```

3. **Melihat Uji Pemutaran Ulang Interaksi (*Replay*)**:
   ```bash
   npm run test:replay
   ```
   *Hasil*: Menjalankan 4 skenario pemutaran ulang otomatis pada kecepatan normal dan cepat dengan verifikasi integritas hash.

4. **Menjalankan Seluruh Unit Test (73 Tests)**:
   ```bash
   npm run test:unit
   ```
   *Hasil*: 12 suite unit test (Ring Buffer, FSM, normalisasi event, telemetri, diff API, geometry) berjalan hijau 100%.

---

#### Cara C: Memeriksa Data Kriptografis Melalui API Backend
Anda dapat langsung mengakses endpoint REST yang dibuat:
- **Melihat status conformance terbaru per target**:
  Buka di browser atau jalankan:
  ```bash
  curl "http://localhost:3001/api/test-runs/conformance/latest?target=http://localhost:3001/app.html"
  ```
- **Melihat diff regresi antar pengujian (mendeteksi perubahan pass/fail)**:
  ```bash
  curl "http://localhost:3001/api/test-runs/conformance/diff?target=http://localhost:3001/app.html&device=iphone-16-pro&orientation=portrait"
  ```