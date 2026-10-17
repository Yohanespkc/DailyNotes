saya ingin solusinya tidak mengobati di satu titik saja untuk setiap masalah, tapi solusinya dilihat dari view yang lebih besar. Artinya solusi yang diberikan akan menuntaskan masalah ini dan masalah-masalah lain yang mungkin akan muncul. Cpba kamu analisa, bisakah kamu menemukan solusi seperti itu untuk semua masalah ini?

Sangat bisa, Pak! Justru ketika kita menarik mundur sudut pandang ke **level Arsitektur Sistem (Macro-View)**, kita melihat bahwa 128 laporan defect yang tersisa di kedua file Excel tersebut **bukanlah 128 masalah yang berdiri sendiri**, melainkan gejala dari **6 Celah Sistemik di Level Engine Utama**.

Bahkan, saat saya menelusuri arsitektur `Zone4LadderEngine` dan `Zone3BertualangEngine` barusan dari sudut pandang makro, saya menemukan **akar masalah sistemik** mengapa **seluruh 5 game Bertualang Zona 4** macet di _"SOAL: Bersiaplah, Ksatria! !"_ dan mengapa kontrol mobile-nya melompat ke atas layar!

Berikut adalah **6 Solusi Sistemik (Universal Engine Invariants)** yang tidak hanya mengobati satu titik, tetapi **menyembuhkan seluruh game sekaligus dan mencegah masalah serupa muncul lagi di masa depan**:

---

### **🌐 6 Solusi Sistemik (Macro-Architecture View)**

#### 1. Sistemik Engine Laporan & Skor: **Single Source of Truth (SSOT) Session Evaluator & Self-Healing Telemetry**

- **Masalah Jika Diobati Per Titik:** Mengubah rumus di satu kartu atau memperbaiki pengiriman skor di tiap-tiap game satu per satu.
- **Solusi View Besar (di `overlayProgressReportModal.ts` & `engineOverlayManager.ts`):** Kita membangun **1 Evaluator Kanonik Tunggal** yang memaksakan **4 Invarian Mutlak** untuk seluruh 180+ game:
    1. **Satu Angka Akurasi Tunggal (`Canonical Accuracy`):** Kotak _Ketepatan_, _Badge Penguasaan Materi_, _Grafik_, dan _Catatan_ wajib membaca **1 variabel persentase yang sama persis**. Secara otomatis tidak mungkin lagi muncul perbedaan `90%` vs `91%` di game mana pun.
    2. **Invarian Anti-Kontradiksi Pedagogis:**
        - Klaim _"✨ Penguasaan Sempurna tanpa hambatan kesalahan"_ **dikunci secara matematis** hanya boleh muncul jika `wrongAttempts === 0 && accuracy === 100 && livesLost === 0`.
        - Jika siswa pernah salah (`wrongAttempts > 0`), namun teks soal tidak mengandung simbol `+-×÷` (sehingga ekstraktor topik kosong, seperti di Zona 1, soal cerita, audio, atau gambar), engine **secara otomatis mengambil nama konsep dari Registry Kurikulum game tersebut**! Dengan demikian laporan diagnostik selalu menyebut topik yang tepat dan tidak akan pernah lagi salah klaim "Sempurna" di game mana pun.
        - Pesan motivasi dikunci murni pada tingkat penguasaan (`>= 80% Expert`, `60–79% Mahir`, `< 60% Perlu Latihan`), sehingga peraih _Expert_ tidak akan pernah lagi diberi pesan gagal _"Jangan berkecil hati"_.
    3. **Self-Healing Score & Round Sync (Sinkronisasi Mandiri dari HUD):** Banyak game custom mengubah skor langsung di DOM HUD (`.bermain-score` / `.bermain-v-total`) tanpa memanggil `score.addBase()`. Dengan memasang _DOM-to-State Self-Healing_ tepat saat layar selesai muncul dan saat tombol **Laporan Kemajuan / Rincian Skor** diklik, apabila `score.total === 0` sementara angka di HUD `> 0`, engine **otomatis menyedot angka skor & ronde dari HUD**! Masalah `Total Skor = 0` tuntas untuk seluruh game sekarang dan seterusnya.

---

#### 2. Sistemik `BermainEngine`: **Universal Input-Lock Watchdog, Sub-Modal Timer Guard, & Grid Completion Handler**

- **Masalah Jika Diobati Per Titik:** Memperbaiki macet setelah klik salah di _Adu Cepat Burung_, _Bola Meriam_, mem-pause timer di _Gua Gelap_, atau memperbaiki TTS satu per satu.
- **Solusi View Besar (di `bermainController.ts` & `bermainRoundAndOutcome.ts`):**
    1. **Universal Sub-Modal Timer Guard:** Di level `BermainEngine`, jika di dalam `.bermain-arena` terdeteksi ada sub-overlay pemilihan mode/tingkat yang sedang aktif (seperti _"Pilih Mode!"_ di _Rahasia Gua Gelap_ atau game lainnya), engine **otomatis mem-pause timer**, dan saat mode dipilih/ditutup, timer **otomatis di-reset penuh ke `timePerQuestion` (`35s`)**!
    2. **Universal Post-Mistake Liveness Recovery (Anti-Macet Setelah Jawaban Salah):** Setiap kali `health.damage()` terpanggil dan nyawa masih tersisa (`lives > 0`), engine menjalankan _watchdog_ otomatis: memastikan `isProcessing` terbuka kembali setelah animasi salah selesai, dan jika objek soal di layar sudah habis/hilang akibat animasi gagal (seperti mangkuk yang dimakan burung di _Adu Cepat Burung_), engine otomatis memanggil `onGenerateQuestion` untuk menyajikan soal pengganti di ronde tersebut tanpa pernah membiarkan layar macet!
    3. **Universal Single-Board / TTS Completion Protocol:** Untuk seluruh game berbasis papan penuh (seperti TTS di Zona 2 dan Zona 4), penyelesaian seluruh kotak otomatis menghentikan timer seketika (`timer.pause()`), menghitung akurasi `firstTry` secara proporsional per-kotak (`(totalKotak - salahKlik) / totalKotak`), dan langsung memicu _Victory Overlay_ tanpa pernah nyasar ke "Soal 2/10" atau terkena _Timeout_ saat selebrasi.

---

#### 3. Sistemik `BertualangEngine`: **Deterministic Module Init & Unified Viewport Layering (Menuntaskan Seluruh Masalah Bertualang Zona 3, 4, 5 Sekaligus)**

- **Temuan Akar Masalah Makro di Kode Barusan:** Mengapa **seluruh 5 game Bertualang Zona 4** macet di teks `"SOAL: Bersiaplah, Ksatria! !"` dan tombol kontrol mobile-nya berada di bagian atas layar?
    1. **Race Condition Inisialisasi Modul (`_controllerInitialized` Poisoning):** Di `zone4LadderController.ts:29-37`, kode menyetel `container._controllerInitialized = true` di baris 30, lalu memanggil `window.initZone3BertualangEngine?.(gameId)` di baris 36. Karena script `Zone4LadderEngine` dieksekusi oleh browser **sebelum** script `Zone3BertualangEngine` selesai mendaftarkan fungsi ke `window`, nilai `engineApi` menjadi `undefined`, fungsi langsung `return` (keluar), namun `container._controllerInitialized` sudah terlanjur `true`! Akibatnya controller tangga **mati permanen** di seluruh Level 2–6 dan layar membeku di teks HTML awal `"SOAL: Bersiaplah, Ksatria! !"`!
    2. **Tabrakan CSS `inset: 0 !important` vs `height: 52px !important`:** Di `Zone4LadderEngine.astro:233`, `.z3-mobile-controls-bar` diberi `inset: 0 !important` (yang menyetel `top: 0 !important`), sedangkan di `zone3BertualangTheme.css:139` diberi `height: 52px !important`. Di CSS, jika elemen memiliki `top: 0` dan `height: 52px`, browser menempelkan bar setinggi 52px tersebut **di puncak layar (`top: 0`)**, sehingga tombol jalan & lompat naik ke bawah HUD atas!
- **Solusi Sistemik:**
    1. Ganti pemanggilan `window.initZone3BertualangEngine` dengan **import modul ES langsung** (`import { initZone3BertualangEngine } from './zone3BertualangController'`), dan jangan pernah menyetel `_controllerInitialized = true` sebelum `engineApi` sukses terikat.
    2. Pindahkan `.z4-wave-modal` keluar dari slot `.z3l1-bt-arena` dan cabut class `hidden` saat transisi gelombang agar perpindahan Gelombang 1 →\rightarrow→ 2 →\rightarrow→ 3 berjalan 100% mulus di semua level.
    3. Ubah CSS `.z3-mobile-controls-bar` menjadi `top: auto !important; bottom: calc(max(0.5rem, env(safe-area-inset-bottom, 0px)) + 12px) !important;` dan normalisasi tanda seru di fungsi `updateQuestion` (`.replace(/(\s*!)+$/, '!')`) sehingga **tidak pernah ada tanda seru ganda `"! !"` di zona mana pun**.

---

#### 4. Sistemik `BelajarEngine`: **Unified Seek-to-WatchTime Synchronizer & Dual-Axis Viewport Fit**

- **Solusi View Besar (di `belajarController.ts` & `BelajarEngine.astro`):**
    1. **Unified `+20s` Seek & Watch-Time Credit:** Mengintegrasikan tombol `+20s` langsung dengan _Watch-Time Validator_ di `belajarController.ts`. Di seluruh ratusan video pembelajaran Zona 1–8, klik `+20s` akan memajukan video 20 detik sekaligus mengkreditkan durasi tersebut ke `accumulatedWatchTime` & `maxReachedTime`, sehingga tombol `+20s` selalu berfungsi dan **tidak akan pernah memicu penalti gagal tonton di akhir video**.
    2. **Dual-Axis Viewport Fit (`max-h` + `aspect-video`):** Memasang pembatas tinggi dinamis `max-h-[calc(100dvh-185px)]` pada `.belajar-video-frame` di `BelajarEngine.astro` sehingga pada **semua rasio layar** (MacBook 16:10, iPad 4:3, Monitor 16:9, maupun Fullscreen), progress bar bawah video dijamin tidak akan pernah terpotong.

---

#### 5. Sistemik Navigasi Peta: **2-Tier Modal Stack & Zone-Preserving URL State (`ZoneLevelMap.astro`)**

- **Solusi View Besar (di `ZoneLevelMap.astro`):** Mengubah sistem popup peta di seluruh zona menjadi **Stack 2 Tingkat**:
    - Jika pengguna sedang di tingkat 2 (daftar sub-game _Belajar 1, Belajar 2_ / _Bermain 1..4_), tombol `Kembali` selalu kembali 1 tingkat ke menu pemilihan mode Level (_Belajar / Bermain / Bertualang_).
    - Jika pengguna di tingkat 1, tombol `Kembali` menutup popup ke peta sambil mempertahankan `?zone=${activeZone}` di URL (tidak pernah me-reset URL ke kosong yang membuat mental ke `?zone=1`).

---

#### 6. Sistemik Layout Mobile & Aset Visual: **Global 360px HUD Auto-Fit & SVG Canvas Bypass Guard**

- **Solusi View Besar:**
    1. **Global 360px HUD Auto-Fit (`bermain-engine-2.css`):** Satu aturan CSS terpusat untuk viewport sempit (`<= 385px` portrait) merapatkan grup kapsul kanan HUD (tempat _Total Poin Akun_ baru ditambahkan) sehingga tombol Pause (`||`) di seluruh 150+ game otomatis masuk di dalam `< 356px` tanpa menyentuh posisi Timer Bar di baris kedua.
    2. **Universal SVG/WebP Guard pada `removeWhiteBG()`:** Mencegah fungsi penghapus background putih memproses file `.svg` (yang sudah transparan namun sering gagal di-render ke `<canvas>` sebelum dimensi siap, seperti pada _Wortel Ajaib_), serta memperbaiki CSS spesifik yang menimpa `.absolute` atau mengosongkan dimensi kartu (`.robe-card-container`).

---

### **🎯 Kesimpulan**

Dengan pendekatan **6 Pilar Sistemik (Macro-View)** ini:

- Kita **bukan sekadar menambal satu titik per game**, melainkan memperbaiki **mesin penggerak (engine) dan aturan globalnya**.
- Satu perbaikan di level engine langsung menuntaskan puluhan temuan di Excel sekaligus **melindungi game-game lain di Zona 1 s.d. Zona 8** agar tidak pernah mengalami masalah yang sama.

Apakah Bapak setuju untuk langsung saya terapkan **6 Pilar Sistemik** ini (melalui **Sprint R-1 s.d. Sprint R-7** yang terverifikasi Playwright di belakang layar)?