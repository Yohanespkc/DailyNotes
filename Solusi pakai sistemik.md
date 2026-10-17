Viewed belajarPlayerControls.ts:1-250
Viewed BelajarPlayerArena.astro:1-120
Viewed belajarVideoPlayback.ts:120-260
Viewed belajar-engine-1.css:1-204
Viewed BelajarTopHud.astro:1-100
Created SPRINT_PLAN_PERBAIKAN_TOTAL_DEFECT_PAMERAN.md

**Benar sekali, Prof!** Dengan masuknya perubahan **Mode Eksplorasi / Free-Seek** pada komit `185e852c2b` (`feat(belajar-s0): restore modular Asyiknya Belajar and free-seek-without-reward`), seluruh item pada **Fase 3 lama (`BelajarEngine`) sudah tuntas 100%**:
- **`DEF-092` (Tombol `+20s`):** Sudah bebas melompat ke titik mana pun di sepanjang video.
- **`DEF-104` (*Scrubber timeline*):** Sudah bebas digeser maju/mundur ke titik mana pun tanpa diblokir `maxWatchedTime`.
- **`DEF-093` (Tinggi *frame* video di layar):** Sudah tuntas melalui aturan `max-height: calc(100dvh - 110px)` di [belajar-engine-1.css](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/styles/engines/belajar/belajar-engine-1.css#L114-L119) dan penyatuan *banner* judul di [BelajarTopHud.astro](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/belajar/BelajarTopHud.astro#L20-L25).

Dokumen perencanaan di [SPRINT_PLAN_PERBAIKAN_TOTAL_DEFECT_PAMERAN.md](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/docs/sprints/yohanespkc-sprint/SPRINT_PLAN_PERBAIKAN_TOTAL_DEFECT_PAMERAN.md) telah saya tulis ulang menjadi **5 Fase Fokus** sebagai berikut:

---

### 📋 RENCANA PERBAIKAN SISTEMIK 5 FASE (BRANCH `New-Build`)

---

### **FASE 1: Perbaikan Sistemik `BertualangEngine` (Zona 4, Zona 3, & Zona 5)**
- **Solusi (`XXX`):**
  1. **Direct Module Import & Post-Init Guard** di [`zone4LadderController.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone4LadderController.ts): Mengimpor langsung `initZone3BertualangEngine` dari [`zone3BertualangController.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone3BertualangController.ts) (menghilangkan *race condition* `window.initZone3BertualangEngine` yang membuat `_controllerInitialized = true` terkunci permanen sebelum *engine* siap).
  2. **Sinkronisasi Class `hidden` & Z-Index Modal Transisi Wave** di [`Zone4LadderEngine.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/Zone4LadderEngine.astro) & [`zone4LadderEndgame.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone4LadderEndgame.ts): Mencabut class `hidden` saat `.z4-wave-modal` diaktifkan di akhir Gelombang 1 & 2.
  3. **Bottom-Pinning Bar Kontrol Mobile** di [`zone4-ladder-engine.css`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/styles/games/zone4-ladder-engine.css): Mengganti `inset: 0 !important` (yang menarik bar tombol ke `top: 0` saat `height: 52px` aktif) menjadi `top: auto !important; left: 0 !important; right: 0 !important; bottom: calc(max(0.5rem, env(safe-area-inset-bottom, 0px)) + 12px) !important;`.
  4. **Sanitasi Tanda Seru Ganda (`! !` $\rightarrow$ `!`)** di [`zone4LadderPhysics.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone4LadderPhysics.ts) & [`zone3BertualangController.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone3BertualangController.ts).
  5. **Sinkronisasi Teks Bantuan (Zona 3 L2)** di [`howToPlayRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/howToPlayRegistry.ts) (2 Gelombang) & **Auto-Scroll Numpad Pertarungan (Zona 5 L4)** di [`zone5BertualangController.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone5BertualangController.ts).
- **Masalah yang Disembuhkan (`YYY`):** **24 temuan QA sekaligus** — seluruh *Bertualang* Zona 4 Level 2–6 yang macet di `"SOAL: Bersiaplah, Ksatria! !"` (`DEF-069, DEF-071, DEF-074, DEF-077, DEF-080, DEF-082, DEF-085, DEF-087`), macet akhir Gelombang 1 (`DEF-058, DEF-072`), tombol *mobile* pindah ke atas layar (`DEF-060, DEF-070, DEF-075, DEF-081, DEF-083, DEF-086`), tanda seru ganda `! !` (`DEF-059, DEF-076, DEF-084`), serta `DEF-024` & `DEF-112`.
- **Games yang Berubah (`ZZZ`):** Seluruh *Asyiknya Bertualang* Zona 4 (Level 1–6), Zona 3 Level 2, dan Zona 5 Level 4.
- **Hasil Bisa Dicek di (`AAA, BBB, CCC`):**
  1. **Zona 4 Level 1 Bertualang:** *Runtuhkan Menara Babel* (`/play?zone=4&level=1&game=z4-l1-bertualang`)
  2. **Zona 4 Level 2 Bertualang:** *Misi Ksatria Tangga* (`/play?zone=4&level=2&game=z4-l2-bertualang`)
  3. **Zona 4 Level 3–6 Bertualang:** (`/play?zone=4&level=3&game=z4-l3-bertualang` s/d `level=6`)
  4. **Zona 3 Level 2 Bertualang:** (`/play?zone=3&level=2&game=z3-l2-bertualang`)
  5. **Zona 5 Level 4 Bertualang:** (`/play?zone=5&level=4&game=z5-l4-bertualang`)
- **Jaminan Aman:** `window.initZone3BertualangEngine` tetap dipertahankan sehingga seluruh *Bertualang* Zona 3 (Level 1–4) tidak terganggu sama sekali.

---

### **FASE 2: Perbaikan Sistemik `EngineOverlayManager` (Laporan Kemajuan Belajar, Rincian Skor, & Kontradiksi Evaluasi)**
- **Solusi (`XXX`):**
  1. **Unifikasi Sumber Kebenaran Tunggal Akurasi** di [`overlayProgressReportModal.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/overlay/overlayProgressReportModal.ts): Menyamakan persentase `KETEPATAN` pada Laporan Kemajuan Belajar dengan `firstTryRate` di layar Kemenangan (tidak ada lagi selisih `91%` vs `90%`).
  2. **Guard Ketat Evaluasi Konsep Matematika:** Klaim `"✨ Penguasaan Sempurna — Seluruh soal diselesaikan dengan akurat tanpa kesalahan!"` hanya boleh muncul jika **`wrongAttempts === 0 && accuracy === 100`**. Jika pernah salah (`wrongAttempts > 0`), sistem menarik topik konsep dari [`laporanMengenalBilanganRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/laporanMengenalBilanganRegistry.ts) atau menampilkan evaluasi ketelitian percobaan pertama.
  3. **Penghapusan Kontradiksi Peringkat vs Pesan:** Menghapus `|| wrongAttempts >= 4` pada cabang `accuracy < 60` (baris 53) agar peraih **⭐ Expert (80%–90%)** tidak pernah mendapat pesan `"Jangan berkecil hati!"`.
  4. **Self-Healing Rincian Skor (`0 Poin` $\rightarrow$ Skor Aktual):** Membaca *fallback* langsung dari DOM layar Kemenangan (`.bermain-v-base`, `.bermain-v-bonus`, `.bermain-v-total`) bila `score === 0`.
  5. **Sinkronisasi Deskripsi Hewan/Topik** di [`laporanMengenalBilanganRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/laporanMengenalBilanganRegistry.ts) (burung, semangka, apel, serta perbaikan typo `"Loncatan"` $\rightarrow$ `"Lompatan"`).
- **Masalah yang Disembuhkan (`YYY`):** **42 temuan QA sekaligus** di Zona 1 s/d Zona 5 (`DEF-002, DEF-003, DEF-004, DEF-006, DEF-008, DEF-009, DEF-010, DEF-011, DEF-014, DEF-015, DEF-016, DEF-017, DEF-018, DEF-021, DEF-030, DEF-031, DEF-036, DEF-038, DEF-041, DEF-043, DEF-044, DEF-046, DEF-051, DEF-056, DEF-062, DEF-065, DEF-066, DEF-078, DEF-079, DEF-094, DEF-095, DEF-096, DEF-099, DEF-100, DEF-101, DEF-102, DEF-105, DEF-108, DEF-109, DEF-111`).
- **Games yang Berubah (`ZZZ`):** Seluruh *game* `BermainEngine` di Zona 1 s/d Zona 5 yang menggunakan modal Laporan Kemajuan Belajar.
- **Hasil Bisa Dicek di (`AAA, BBB, CCC`):**
  1. **Zona 1 Level 4 Bermain 3:** *Kandang Burung Mesir* (`/play?zone=1&level=4&game=sb1-bermain3`)
  2. **Zona 1 Level 3 Bermain 3:** *Lompatan Kodok Pintar* (`/play?zone=1&level=3&game=sb1-bermain3`)
  3. **Zona 2 Level 2 SB3 Bermain 3:** *Ketapel Apel Felizio* (`/play?zone=2&level=2&game=sb3-bermain3`)
  4. **Zona 3 Level 2 SB3 Bermain 3:** *Tepuk Nyamuk Nakal* (`/play?zone=3&level=2&game=sb3-bermain3`)
  5. **Zona 4 Level 1 SB1 Bermain 4:** *Memanah Semangka* (`/play?zone=4&level=1&game=sb1-bermain4`)
  6. **Zona 5 Level 2 SB1 Bermain 1:** *Pohon Apel Pembagian* (`/play?zone=5&level=2&game=sb1-bermain1`)
- **Jaminan Aman:** Hanya menyentuh tampilan modal laporan tanpa mengubah perhitungan poin di *database* maupun aturan kelulusan.

---

### **FASE 3: Perbaikan Sistemik Navigasi Peta Zona (`ZoneLevelMap.astro`)**
- **Solusi (`XXX`):**
  - Mengubah *handler* `#zlm-sublevel-close` di [`ZoneLevelMap.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/ZoneLevelMap.astro#L563-L571) agar menekan tombol `<` pada daftar sub-game (*Asyiknya Belajar 1–6* / *Asyiknya Bermain 1–4*) menutup `#zlm-sublevel-popup` dan **membuka kembali `#zlm-level-popup` (pop-up pemilihan 3 mode)** pada level & zona yang sama, tanpa me-reset URL ke `?zone=1`.
- **Masalah yang Disembuhkan (`YYY`):** **3 temuan QA lintas Zona 1–5** (`DEF-090, DEF-091, DEF-113`).
- **Games / Halaman yang Berubah (`ZZZ`):** Peta Level Zona 1 s/d Zona 5 (`/play?zone=1` s/d `/play?zone=5`).
- **Hasil Bisa Dicek di (`AAA, BBB, CCC`):**
  1. **Peta Zona 5 (`/play?zone=5`)** $\rightarrow$ Klik Level 1 $\rightarrow$ Klik *Asyiknya Bermain* $\rightarrow$ Klik tombol `<` di pojok kiri atas pop-up (pastikan kembali ke pop-up Mode di Zona 5, bukan terlempar ke Zona 1).
  2. **Peta Zona 2 (`/play?zone=2`)** & **Peta Zona 3 (`/play?zone=3`)** dengan alur yang sama.
- **Jaminan Aman:** Tombol `✕` pada pop-up Mode utama dan tombol `<` di pojok kiri atas Peta Zona tetap berfungsi seperti semula.

---

### **FASE 4: Perbaikan Terfokus 9 Game `BermainEngine` Spesifik (Aturan Nyawa, Layout, & Timer)**
- **Solusi (`XXX`):**
  1. **Misteri Jubah ([`z3l2-sb1bermain1.css`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/styles/games/z3l2-sb1bermain1.css)):** Grid 4 kolom (`4x2`) untuk 8 kartu (`DEF-012`) & perapian posisi badge angka (`DEF-013`).
  2. **Adu Cepat Burung ([`Zone3Level2/SB7Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone3Level2/SB7Bermain2.astro)):** Saat salah klik dan nyawa berkurang, me-regenerasi soal baru + me-reset timer tanpa memanggil `advanceRound()` yang terblokir *guard* ronde (`DEF-032, DEF-033, DEF-035`).
  3. **Wortel Ajaib ([`Zone3Level2/SB8Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone3Level2/SB8Bermain1.astro) & [`z3l2-sb8bermain1.css`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/styles/games/z3l2-sb8bermain1.css)):** Tinggi kartu responsif agar 2 baris wortel tidak terpotong layar (`DEF-037`) & penalti nyawa langsung mengurangi hati (`DEF-039, DEF-040`).
  4. **TTS Papirus Kuno ([`Zone4Level6/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone4Level6/SB1Bermain2.astro)):** Set `totalRounds={1}`, `engine.timer.pause()` saat selesai, dan akurasi proporsional 20 kotak (`DEF-078, DEF-079`).
  5. **Bola Meriam Babilonia ([`z4l2-sb1bermain3/controller.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/games/z4l2-sb1bermain3/controller.ts)):** Sinkronisasi `updateReportMetrics` & *styling* bola meriam (`DEF-061, DEF-063`).
  6. **Rahasia Gua Gelap ([`Zone4Level3/SB2Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone4Level3/SB2Bermain2.astro)):** Ruang aman kiri bawah agar batu angka tidak tertutup Profesor Algebra (`DEF-067`).
  7. **Lompatan Kodok ([`Zone1Level3/SB1Bermain3.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone1Level3/SB1Bermain3.astro)), Misteri Gua Kristal ([`Zone1Level5/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone1Level5/SB1Bermain1.astro)), & Ular Tangga ([`Zone2Level5/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/games/Zone2Level5/SB1Bermain2.astro)):** Sinkronisasi skor laporan (`DEF-004`), perbaikan tombol "Coba Lagi" saat *Game Over* (`DEF-005`), dan percepatan giliran dadu `1500ms` $\rightarrow$ `650ms` (`DEF-097`).
- **Masalah yang Disembuhkan (`YYY`):** **18 temuan QA spesifik** pada 9 *game* di atas.
- **Games yang Berubah (`ZZZ`) & Bisa Dicek di (`AAA, BBB, CCC`):** Kesembilan *game* di atas secara spesifik.
- **Jaminan Aman:** Seluruh perubahan bersifat *scoped* hanya pada *file* masing-masing *game* tanpa menyentuh *game* lain.

---

### **FASE 5: Optimasi Responsif HUD Top Bar pada Layar Mobile Sempit (`360×800` Portrait)**
- **Solusi (`XXX`):**
  - Menambahkan aturan `@media screen and (max-width: 385px) and (orientation: portrait)` di [`bermain-engine-2.css`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/styles/engines/bermain/bermain-engine-2.css) yang memadatkan *gap* dan *padding* pada grup kapsul kanan (`.bermain-hud-container > div:last-child`) agar 6 kapsul atas muat 100% di dalam lebar `360px` tanpa keluar layar kanan.
- **Masalah yang Disembuhkan (`YYY`):** **28 temuan QA Mobile (`360×800`)** di mana indikator Ronde dan tombol Pause `||` terpotong di sisi kanan layar (`DEF-019, DEF-020, DEF-022, DEF-023, DEF-026, DEF-027, DEF-028, DEF-029, DEF-034, DEF-042, DEF-045, DEF-047, DEF-050, DEF-053, DEF-055, DEF-064, DEF-068, DEF-073`, dll.).
- **Games yang Berubah (`ZZZ`):** Tampilan HUD atas seluruh *game* `BermainEngine` khusus pada layar *mobile portrait* sempit ($\le 385\text{px}$).
- **Hasil Bisa Dicek di (`AAA, BBB, CCC`):**
  1. **Zona 3 Level 2 SB3 Bermain 2:** *Lompatan Kanguru* (`/play?zone=3&level=2&game=sb3-bermain2` pada viewport `360×800`)
  2. **Zona 4 Level 2 SB1 Bermain 4:** *Memanah Semangka* (`/play?zone=4&level=2&game=sb1-bermain4` pada viewport `360×800`)
  3. **Zona 5 Level 1 SB1 Bermain 1:** *Membagi Permen* (`/play?zone=5&level=1&game=sb1-bermain1` pada viewport `360×800`)
- **Jaminan Aman:** Sama sekali tidak menyentuh `.bermain-hud-center` (Timer Bar hijau tetap di baris kedua di bawah HUD atas sesuai standar), dan tidak mengubah tampilan Desktop/Tablet/iPhone Pro Max.

---

Apakah kita langsung mulai eksekusi **Fase 1** sekarang?