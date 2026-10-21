Viewed responsive-replay.spec.js:1-60
Viewed device-conformance.spec.js:1-60
Viewed device-conformance.spec.js:60-120
Viewed conformance-panel.js:1-100
Searched for "Octagon Extra"
Searched for "LobbyScreen"

Rekaman Anda sebanyak **11 event** sudah berhasil tersimpan dengan aman ke dalam database MCard (`💾 urn:mcard:test_run:... (096eb63e)`).

Tampilan yang sedang terbuka di layar Anda adalah **Lobby Screen / Main Menu** dari Sacred Octagon. Untuk mendeteksi dan memperbaiki tampilan agar rapi di berbagai jenis *devices* (ponsel layar kecil, sedang, tablet, hingga desktop), berikut **4 langkah praktis yang bisa Anda ikuti**:

---

### Langkah 1: Uji Tampilan Langsung di Berbagai Preset Layar (Visual Testing)

Pada panel sebelah kiri di workbench Responsive Lab Anda:

1. **Uji Layar Ponsel Compact (Paling Rawan Rusak)**:
   - Klik tombol **`Samsung Galaxy S24 (360px)`** dan **`iPhone SE (375px)`**.
   - Perhatikan apakah:
     - Avatar di tengah menutupi kartu profil "Ksatria Pintar" di kiri atas?
     - Deretan tombol di kanan bawah (*MAIN, LOMBA, Octagon Extra, PRETEST*) meluap keluar layar atau bertumpuk?
     - Indikator permata di kiri bawah saling berhimpitan?
2. **Uji Mode Miring (Landscape)**:
   - Klik tombol **`↔ Horizontal (Landscape)`** atau **`Rotate (90°)`**.
   - Karena ketinggian layar ponsel saat landscape sangat pendek (sekitar 360px–393px), periksa apakah tombol *MAIN* terpotong di bagian bawah.
3. **Uji Tablet**:
   - Klik **`iPad Mini (744px)`** atau **`iPad Air 11" (820px)`** untuk memastikan elemen tidak terlalu renggang atau kosong.

---

### Langkah 2: Jalankan Conformance Audit Otomatis

Selain melihat manual, Anda bisa menjalankan pemindaian otomatis ke seluruh matriks device (7 perangkat × 2 orientasi = 14 pengujian) melalui terminal:

```bash
TARGET_URL=http://localhost:4321/ npm run test:conformance
```

Engine Playwright akan otomatis menguji setiap device dan mengecek:
- ❌ **Horizontal Overflow**: Apakah ada elemen yang bocor ke samping (*scrollbar* horizontal tak diinginkan).
- ❌ **Tap Target Size**: Apakah tombol sentuh terlalu kecil untuk jari (< 44px).
- ❌ **Console Errors**: Apakah ada crash skrip atau styling saat viewport berubah ukuran.

Hasilnya akan otomatis diperbarui pada panel **CONFORMANCE** di kiri bawah layar workbench Anda.

---

### Langkah 3: Melakukan Perbaikan di Kode Game (`so`)

Layar yang sedang Anda lihat diatur oleh komponen Astro berikut di repo Sacred Octagon:
- File Utama: [`LobbyScreen.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/dashboard/LobbyScreen.astro)
- Bar Permata Kiri Bawah: [`LobbyInventoryBar.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/ui/LobbyInventoryBar.astro)
- Tombol Aksi Kanan Bawah: Menu action buttons di dalam Lobby

#### Pola Perbaikan CSS yang Biasa Diterapkan:

1. **Menggunakan `clamp()` dan Viewport Relatif**:
   Agar avatar dan tombol mengecil proporsional di layar sempit:
   ```css
   .lobby-avatar {
     height: clamp(240px, 45vh, 480px);
     max-width: 90vw;
   }
   ```
2. **Media Query Khusus Layar Sempit (≤ 390px)**:
   Untuk Samsung S24 dan iPhone SE:
   ```css
   @media (max-width: 390px) {
     .action-buttons-group {
       transform: scale(0.85);
       transform-origin: bottom right;
       bottom: 0.75rem;
       right: 0.75rem;
     }
     .profile-header-card {
       transform: scale(0.85);
       transform-origin: top left;
     }
   }
   ```
3. **Media Query Khusus Landscape Pendek (Tinggi ≤ 500px)**:
   ```css
   @media (max-height: 500px) and (orientation: landscape) {
     .lobby-avatar {
       height: 65vh; /* Avatar tidak boleh memenuhi 100% tinggi agar tidak tertutup tombol */
     }
     .action-buttons-group {
       gap: 0.35rem; /* Rapatkan jarak antar tombol */
     }
   }
   ```
4. **Safe Area Inset (Ponsel Ber-Notch / Dynamic Island)**:
   ```css
   .bottom-bar {
     padding-bottom: max(1rem, env(safe-area-inset-bottom));
   }
   ```

---

### Langkah 4: Buktikan dengan Rekaman Ulang (*Deterministic Replay*)

Setelah kode CSS diperbaiki, Anda **tidak perlu menguji klik tombol satu per satu dari awal**:
Jalankan:
```bash
TARGET_URL=http://localhost:4321/ npm run test:replay
```
Replay engine akan otomatis memutar kembali rekaman 11 event (`096eb63e`) tadi pada layout baru, memastikan tombol-tombol yang tadi diklik tetap bisa ditekan dengan sempurna dan tidak terjadi regresi layout.

---

### 💡 Rekomendasi Langkah Selanjutnya:
Coba klik preset **`Samsung Galaxy S24 (360px)`** dan **`iPhone SE (375px)`** di layar Anda saat ini. 

Jika ada tombol atau gambar yang tampak menumpuk atau terpotong, beritahu saya bagian mana yang kurang pas (atau kirim tangkapan layarnya), dan saya akan **langsung menuliskan perbaikan CSS-nya ke dalam kode game Sacred Octagon** untuk Anda!


Ran command: `git branch --show-current`
Ran command: `git branch --show-current`

Berikut penjelasan lengkap mengenai cabang tempat kita bekerja, hubungan antara `LandingPage` dan `SO`, serta ke mana setiap perbaikan tadi dimasukkan:

---

### 1. Di window ini kita kerja di cabang (*branch*) mana?

Di window ini, kita mengelola **dua repositori Git yang berbeda** secara sinkron:

| Repositori | Path di Komputer Anda | Branch Aktif Saat Ini |
| :--- | :--- | :--- |
| **LandingPage** (Workbench / Lab Uji) | `/Users/yohanessurya/Documents/Development/MCard_TDD/LandingPage` | **`feat/erb-infrastructure`** |
| **SacredOctagon / SO** (Game GASING) | `/Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web` | **`feat/responsive-touch-and-h1-conformance`** |

Kedua cabang ini adalah **cabang fitur khusus (*feature branch*)**, sehingga:
- Cabang **`main`** (SSOT) di kedua repo **100% aman dan tidak tersentuh**.
- Cabang **`New-Build`** di repo `SO` juga **tidak tersentuh langsung** (perubahan berada di branch `feat` yang bercabang dari `New-Build`).

---

### 2. Apakah `LandingPage` ini bagian dari `SO` juga?

**Bukan, keduanya adalah repositori terpisah dengan peran yang saling melengkapi:**

1. **`LandingPage` (Port 3001)**:
   - Ini adalah **Alat / Laboratorium Pengujian Mandiri (*Test Harness & Workbench*)**.
   - Di sinilah web Responsive UI Lab berjalan: menyediakan simulator berbagai ukuran HP/tablet, ring buffer untuk merekam interaksi pengguna, serta database MCard lokal berbasis SQLite untuk menyimpan riwayat audit dan sertifikasi.
2. **`SacredOctagon` / `SO` (Port 4321)**:
   - Ini adalah **Aplikasi Game Pembelajaran Matematika GASING** itu sendiri.
3. **Hubungannya**:
   - `LandingPage` bertindak sebagai **"Laboratorium Penguji"** (yang membungkus tampilan dalam iframe simulator).
   - `SO` bertindak sebagai **"Aplikasi Target yang Diuji"**.
   - Keduanya sengaja dipisah repositorinya agar kode game `SO` tetap bersih, ringan, dan tidak kemasukan script-script pengujian laboratorium.

---

### 3. Lalu perbaikan tadi masuk ke mana?

Perbaikan telah dipisahkan secara tepat sesuai dengan ranahnya masing-masing:

#### A. Perbaikan Tampilan Game (CSS, Tombol Sentuh, `<h1>`, Spanduk Misi)
👉 **Masuk ke Repositori Game (`SacredOctagon` / `so`)**
- **Branch**: `feat/responsive-touch-and-h1-conformance` (sudah di-push ke GitHub).
- **Commit**:
  1. [`c3547a304e`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web): Ukuran tap target 44px (input plate, tombol exit, tombol login) & heading `<h1>` semantik.
  2. [`fa940b5ccf`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web): Kerapian bar atas HUD di landscape (sembunyikan koin sementara di layar sempit), offset spanduk misi, dan pembesaran tombol misi/panah lipat.
- **File-file game yang diperbarui**:
  - `web/src/components/KsatriaInputPlate.astro`
  - `web/src/pages/welcome.astro`
  - `web/src/pages/login.astro`
  - `web/src/styles/pages/welcome.css`
  - `web/src/styles/pages/login.css`
  - `web/src/components/engines/bermain/BermainTopHudAndBanner.astro`
  - `web/src/styles/engines/bermain/bermain-engine-1.css`

#### B. Perbaikan Mesin Perekaman (Tombol Start & Handshake)
👉 **Masuk ke Repositori Laboratorium (`LandingPage`)**
- **Branch**: `feat/erb-infrastructure` (sudah di-push ke GitHub).
- **Commit**:
  - [`05603d1`](file:///Users/yohanessurya/Documents/Development/MCard_TDD/LandingPage): Mengubah `lab-probe-agent.js` menjadi *self-contained* dan menambahkan handshake ping-pong agar tombol `🔴 Start` selalu aktif normal.
- **File-file lab yang diperbarui**:
  - `js/harness/lab-probe-agent.js`
  - `js/harness/capture-probe-agent.js`

Kedua repo kini dalam kondisi **bersih (*clean working tree*)** dan seluruh perubahan fitur telah terunggah dengan aman ke GitHub pada branch fiturnya masing-masing.