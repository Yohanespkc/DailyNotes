

Berikut adalah rincian seluruh perubahan yang ada di *working tree* sejak commit terakhir (`2d7d5cabf7`):

---

### 1. 👩‍🏫 Sinkronisasi Tanya Marcia & Rapor Kemajuan Belajar AI
Memastikan saat siswa membuka video Tanya Marcia atau petunjuk bantuan, intervensi tersebut tercatat secara akurat di grafik rapor kemajuan akhir:
- **[bermainController.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/bermainController.ts):**
  - Menambahkan fungsi `recordMarciaHelp()` untuk mendeteksi kapan video dibuka dari berbagai sumber (tombol video, petunjuk Cara Bermain, atau tombol bantuan).
  - Menjaga agar penandaan `marciaIntervention` di riwayat percobaan (*attemptHistory*) tidak terduplikasi dalam satu ronde yang sama.
- **[marciaVideoRegistry.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/marciaVideoRegistry.ts):**
  - Memicu event global `marciaVideoOpened` saat modal pemutar video Marcia dipanggil.
- **[EngineOverlayManager.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/EngineOverlayManager.ts):**
  - Memperbaiki narasi diagnosis: jika siswa sempat dibantu video Marcia, evaluasi otomatis menyebutkan: *"Dengan bantuan penjelasan video Marcia dan ketangguhan mencoba, siswa berhasil menyelesaikan..."*.
  - Menjaga koordinat label badge Marcia (`labelX`) agar tetap berada di dalam bidang grafik SVG (tidak terpotong di tepi layar).
- **[TopDownCalculationEngine.astro](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/TopDownCalculationEngine.astro), [TopDownFeedbackBridge.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/topdown/TopDownFeedbackBridge.ts), & [TopDownProgressReport.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/topdown/TopDownProgressReport.ts):**
  - Menyambungkan data `marciaHelpCount` ke rapor kemajuan permainan hitung susun (perkalian/pembagian kolom).

---

### 2. 🍓 Anti-Tumpang-Tindih Audio & Pacing Pujian (Zone 1 Level 3 Bermain 2)
Memperbaiki audio game buah berbicara agar suara soal tidak bertabrakan dengan audio pujian:
- **[controller.ts](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/games/z1l3-bermain2/controller.ts):**
  - Menambahkan penghenti audio terpadu (`stopAllAudios()`).
  - Menambahkan antrean suara target (`scheduleTargetSpeech`) yang mengecek apakah audio pujian sedang berbicara sebelum memutar soal berikutnya (mencegah tabrakan suara).
  - Menerapkan aturan standar pacing pujian GASING:
    - Jawaban benar pertama di sesi: 100% dipuji.
    - Ronde berikutnya: ~35–40% frekuensi untuk mencegah kejenuhan audio (*praise fatigue*).

---

### 3. 🍜 Balon Kata Pujian di Game Mangkok Bakso (Zone 3 Level 2 Bermain 2)
- **[SB7Bermain2.astro](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone3Level2/SB7Bermain2.astro):**
  - Menambahkan balon kata (*speech bubble*) pujian saat pemain memilih mangkok yang benar (`engine.showSpeechBubble(praiseText, 2000)`).

---

