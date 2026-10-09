Ran command: `find web/src/games/Zone4Level* -maxdepth 2 -name "*.astro" | sort`
Ran command: `find web/src/games/Zone4Level* -name "*Bermain*.astro" | sort`
Ran command: `ls -la AnalisaHasil/`
Ran command: `ls -la AnalisaHasil/Penjumlahan/ AnalisaHasil/Perkalian/ AnalisaHasil/Pengurangan/`
Viewed PERENCANAAN_SISTEM_LAPORAN_PENJUMLAHAN.md:1-150
Viewed PERENCANAAN_SISTEM_LAPORAN_PENGURANGAN.md:1-160
Viewed SB1Bermain1.astro:1-120
Viewed SB1Bermain1.astro:121-240
Viewed SB1Bermain1.astro:241-370
Viewed SB1Bermain1.astro:371-494
Viewed SB1Bermain1.astro:1-140
Viewed SB1Bermain1.astro:200-320
Viewed SB1Bermain2.astro:1-140
Viewed SB1Bermain3.astro:1-140
Viewed SB1Bermain3.astro:180-260
Viewed SB1Bermain4.astro:1-140
Viewed SB2Bermain1.astro:1-140
Viewed SB2Bermain2.astro:1-140
Viewed SB2Bermain3.astro:1-140
Viewed SB2Bermain4.astro:1-140
Viewed SB1Bermain1.astro:1-140
Viewed z4l3BermainMath.ts:1-140
Viewed z4l3BermainMath.ts:141-208
Viewed SB1Bermain2.astro:1-140
Viewed SB2Bermain1.astro:1-140
Viewed SB2Bermain2.astro:1-140
Viewed SB1Bermain1.astro:1-140
Viewed z4l4BermainMath.ts:1-140
Viewed z4l4BermainMath.ts:141-223
Viewed SB1Bermain2.astro:1-140
Viewed SB2Bermain1.astro:1-140
Viewed SB2Bermain2.astro:1-140
Viewed SB1Bermain1.astro:1-140
Viewed SB1Bermain1.astro:200-300
Viewed SB1Bermain2.astro:1-140
Viewed SB1Bermain1.astro:1-140
Viewed SB1Bermain2.astro:1-140
Searched for "z4l"
Ran command: `find web/src -name "*questionBanner*"`
Searched for "z4"
Viewed questionBannerSimplifier.ts:1-60
Searched for "z4"
Searched for "z4"
Viewed howToPlayRegistry.ts:300-349
Ran command: `find web/src -name "*PedagogicalEnricher*"`
Viewed howToPlayPedagogicalEnricher.ts:1-140
Viewed laporanPenguranganRegistry.ts:1-140
Viewed laporanPenguranganRegistry.ts:141-260
Viewed laporanPenguranganRegistry.ts:261-373
Ran command: `ls -la web/src/data/*pengurangan* web/src/data/*Pengurangan*`
Ran command: `ls web/src/data/`
Ran command: `find web/src -name "*pengurangan*" -o -name "*Pengurangan*"`
Viewed penguranganRaporStore.ts:1-140
Viewed raporPenguranganPrintController.ts:1-100
Viewed raporPenguranganPrintController.ts:101-236
Ran command: `ls -la web/tests/unit/*pengurangan* web/tests/unit/*Pengurangan*`
Ran command: `ls web/tests/unit/`
Viewed penguasaanCardSprint1.test.ts:1-60
Ran command: `node --test --import tsx web/tests/unit/penguasaan*.test.ts`

# 📑 LAPORAN AUDIT MENDALAM 21 PERMAINAN ZONA 4 (PENGURANGAN — NALANDA & QUTUB MINAR)
**Platform Pembelajaran Matematika GASING (*Sacred Octagon*)**  
*Audit Kode Langsung, Mekanika Interaksi, Kurikulum Riil, dan Analisis Kesiapan 12 Standar Rapor*

---

## 1. Ringkasan Eksekutif Audit

Sesuai arahan, telah dilakukan audit teknis dan pedagogis **satu demi satu secara presisi terhadap seluruh 21 games Asyiknya Bermain di Zona 4 (Pengurangan)** langsung pada berkas sumber kode `.astro` di `web/src/games/Zone4Level*`.

### Distribusi 21 Games Asyiknya Bermain Zona 4:
* **Level 1 (1 Game):** Pengenalan Konkret Pengurangan Objek (Kuil Nalanda).
* **Level 2 (8 Games):** Mencongak Pengurangan Bilangan 1-Digit & Teman 10 (Maharashtra & Kuil Nalanda).
  * *Sub-Bab 1 (4 Games):* Pengurangan 9 kurang, 8 kurang, 7 & 6 kurang, dan 1-digit sebarang.
  * *Sub-Bab 2 (4 Games):* Pengurangan 10 menggunakan pasangan 10, campuran hasil 1-digit, 10 kurang cepat, dan drill refleks.
* **Level 3 (4 Games):** Pengurangan 2-Digit dengan 1-Digit (India Kuno).
  * *Sub-Bab 1 (2 Games):* Tanpa meminjam (satuan bisa dikurangi), puluhan $< 5$ dan puluhan $> 5$.
  * *Sub-Bab 2 (2 Games):* Puluhan bulat minus 1-digit (pasangan 10) & teknik meminjam.
* **Level 4 (4 Games):** Pengurangan 2-Digit dengan 2-Digit (Menara Qutub Minar).
  * *Sub-Bab 1 (2 Games):* Tanpa meminjam (puluhan $< 5$ dan puluhan besar).
  * *Sub-Bab 2 (2 Games):* Puluhan murni minus 2-digit & teknik meminjam 2-digit.
* **Level 5 (2 Games):** Pengurangan 3-Digit (Savana India).
  * *Sub-Bab 1 (2 Games):* Pengurangan 3-digit dasar & 3-digit berjenjang (3 tier).
* **Level 6 (2 Games):** Pengurangan Multi-Digit Raksasa & Teka-Teki Silang (Perpustakaan Taj Mahal).
  * *Sub-Bab 1 (2 Games):* Pengurangan 4-digit bertingkat & TTS Matematika 13×13 (20 persamaan terhubung).

---

## 2. Hasil Audit Mendalam Game per Game (Game 1 s.d. 21)

---

### 🔹 LEVEL 1: Konsep Konkret Pengurangan (1 Game)

#### Game 1: `z4l1-sb1bermain1` — Misteri Kuil Nalanda
* **Berkas:** [`web/src/games/Zone4Level1/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level1/SB1Bermain1.astro) (494 baris)
* **Latar Cerita:** Kuil kuno Nalanda di mana makhluk hidup (kodok di daun teratai, virus, bunga teratai, kupu-kupu) muncul secara misterius.
* **Konsep Matematika GASING:**
  * Pengurangan konkret himpunan objek visual ($A - B = C$).
  * Nilai $A \in \{2 \dots 9\}$, $B \in \{1 \dots A-1\}$.
* **Mekanika & Interaksi:**
  * **Fase 1 (Audio & Aksi):** Narasi audio Web Speech TTS Indonesia bersuara: *"Ada [A] kodok. Ambil [B] kodok."* Siswa harus mengetuk sejumlah $B$ kodok di layar sampai menghilang dengan animasi skala mengecil.
  * **Fase 2 (Penghitungan Sisa):** Narasi berbunyi: *"Berapa sisanya?"*. Numpad aktif, siswa menghitung sisa objek di layar, mengetikkan angka jawaban, lalu menekan tombol **OK**.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa (`maxLives=5`), per-question timer.
* **Audit Teks & Banner:**
  * In-game Question: *"Klik objek sesuai instruksi dan masukan jawabannya!"* (Diakhiri tanda seru `!`).
  * `aiHelpRegistry.ts`: Menggunakan template teks generik lama (*"Jawab setiap tantangan Belajar Pengurangan secepat dan setepat mungkin..."*). **Perlu disempurnakan.**

---

### 🔹 LEVEL 2: Mencongak Pengurangan 1-Digit & Teman 10 (8 Games)

#### Game 2: `z4l2-sb1bermain1` — Surat Rahasia Maharashtra
* **Berkas:** [`web/src/games/Zone4Level2/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB1Bermain1.astro) (393 baris)
* **Latar Cerita:** Pembawa pesan Rohan di Maharashtra abad ke-12 mengantarkan surat rahasia berangka pengurangan ke rumah tujuan.
* **Konsep Matematika GASING:**
  * Pengurangan angka 9 ($9 - 1, 9 - 2, 9 - 3, \dots, 9 - 9$).
* **Mekanika & Interaksi:**
  * Kartu Memori 3D Flip (10 kartu di layar: 5 kartu surat berisikan soal $9 - x$ dan 5 kartu rumah berisikan angka jawaban $y$).
  * Pemain membalik 1 kartu surat dan 1 kartu rumah yang berpasangan.
* **Ronde, Nyawa & Timer:**
  * 10 ronde (setiap ronde mengocok 5 pasang dari bank soal pengurangan 9).
  * 5 nyawa, batas waktu 60 detik.
  * Sesuai mandat Rule Part 1 Section 3, kesalahan flip kartu wajar ($\le 4$ kali) **tidak mengurangi nyawa** (`lifeLossOnWrong: false`).
* **Audit Teks & Banner:**
  * Initial Question: *"Cocokkan Surat & Rumah!"*
  * `howToPlayRegistry.ts`: Cocok dan berakhiran `!`.
  * `aiHelpRegistry.ts`: Masih teks generik, perlu dilengkapi tips GASING pengurangan 9.

#### Game 3: `z4l2-sb1bermain2` — Sandi Tulang Gua Maharashtra
* **Berkas:** [`web/src/games/Zone4Level2/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB1Bermain2.astro) (465 baris)
* **Latar Cerita:** Membantu anjing-anjing di lereng gua batu kuno Maharashtra mencocokkan tulang makanannya.
* **Konsep Matematika GASING:**
  * Pengurangan angka 8 ($8 - 1, 8 - 2, 8 - 3, \dots, 8 - 8$).
* **Mekanika & Interaksi:**
  * Karakter anjing membawa papan soal di dada dan karakter anjing membawa tulang jawaban melayang di arena (*bobbing animation*).
  * Pemain mengetuk anjing pembawa soal lalu mengetuk anjing pembawa tulang jawaban.
* **Ronde, Nyawa & Timer:**
  * 2 ronde (masing-masing 4 pasang kartu = 8 pasangan total).
  * 5 nyawa, 60 detik per ronde, `lifeLossOnWrong: false`.
* **Temuan Kritis Audit:**
  * Di `howToPlayRegistry.ts` baris 266: tertulis *"mencocokkan anjing yang membawa soal pengurangan 9..."* $\rightarrow$ **Koreksi:** Ini adalah materi **pengurangan 8**, bukan 9!

#### Game 4: `z4l2-sb1bermain3` — Bola Meriam Kuil Nalanda
* **Berkas:** [`web/src/games/Zone4Level2/SB1Bermain3.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB1Bermain3.astro) (1040 baris — memiliki *Architectural Exemption Justification*)
* **Latar Cerita:** Menembakkan meriam marmer kuno untuk memecahkan bata batu prasasti Nalanda.
* **Konsep Matematika GASING:**
  * Pengurangan angka 7 ($7 - 1$ s.d. $7 - 7$) dan angka 6 ($6 - 1$ s.d. $6 - 6$).
* **Mekanika & Interaksi:**
  * HTML5 Canvas Brick Breaker (*physics engine* pantulan bola).
  * Di atas terdapat susunan bata S-Octagon (Baris 1: soal $7 - x$, Baris 2: soal $6 - x$).
  * Bola meriam memiliki nilai angka hasil. Pemain mengarahkan penembak (*aiming shooter*) ke bata dengan soal yang cocok.
  * Terdapat 3 Sesi bertahap:
    * Sesi 1: Bata standar 2 baris.
    * Sesi 2: Ditambah batu penghalang M-Octagon.
    * Sesi 3: Batu dan bata tersebar acak dengan banyak pantulan.
* **Ronde, Nyawa & Timer:** 3 sesi, 5 nyawa, waktu 70 detik per sesi, terdapat pemilih kecepatan bola (Lambat, Cepat, Sangat Cepat).
* **Audit Teks & Banner:**
  * In-game Banner: *"Hancurkan seluruh bata!"*
  * `aiHelpRegistry.ts`: Sudah memiliki deskripsi spesifik bola pantul, namun belum diakhiri tanda seru `!`.

#### Game 5: `z4l2-sb1bermain4` — Telur Emas Kuil Nalanda
* **Berkas:** [`web/src/games/Zone4Level2/SB1Bermain4.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB1Bermain4.astro) (382 baris)
* **Latar Cerita:** Menemukan sarang telur emas berkekuatan magis di ruang suci Nalanda.
* **Konsep Matematika GASING:**
  * Mencongak pengurangan 1-digit sebarang dari $9 - x$ hingga $2 - x$ dengan hasil $0 \dots 8$.
* **Mekanika & Interaksi:**
  * Kartu target menampilkan angka hasil (misal: **Target nilai: 4**).
  * Di bawahnya tersedia 6 butir telur emas bercangkang retak 3D dengan tulisan ekspresi pengurangan (misal: $7-3, 9-2, 8-4, 5-1$).
  * Pemain mengetuk telur emas yang memiliki nilai sama dengan target. Telur pecah dengan SFX Web Audio *crack*.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, countdown timer.
* **Temuan Kritis Audit:**
  * Di `aiHelpRegistry.ts`: Entri `z4l2-sb1bermain4` **hilang** (malah tertukar dengan `z4l2-sb2bermain4` yang mencantumkan deskripsi telur emas ini). **Wajib diperbaiki.**

#### Game 6: `z4l2-sb2bermain1` — Selendang Sutra Pasar Nalanda
* **Berkas:** [`web/src/games/Zone4Level2/SB2Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB2Bermain1.astro) (382 baris)
* **Latar Cerita:** Pasar kain sutra Nalanda kuno, menghubungkan gulungan kain warna-warni.
* **Konsep Matematika GASING:**
  * Pengurangan 10 menggunakan **Pasangan 10 (Teman 10)**: $10 - x$ bernilai pasangan 10 dari $x$.
* **Mekanika & Interaksi:**
  * Kartu Memori Triplet 3 Kolom:
    1. Kolom 1 (Kiri): PENGURANGAN ($10 - 1$ s.d. $10 - 9$).
    2. Kolom 2 (Tengah): PASANGAN 10 (angka $1$ s.d. $9$).
    3. Kolom 3 (Kanan): JAWABAN ($1$ s.d. $9$).
  * Siswa membuka 1 kartu dari masing-masing kolom. Jika ketiga kartu cocok (misal: $10 - 3$, Pasangan $3$, dan Jawaban $7$), garis SVG kain selendang sutra terbentang menghubungkan ketiganya!
* **Ronde, Nyawa & Timer:** 9 pasang triplet ($10-1$ s.d. $10-9$), 5 nyawa, `lifeLossOnWrong: false`.
* **Audit Teks & Banner:** Banner dan howToPlay sudah sinkron dan diakhiri `!`.

#### Game 7: `z4l2-sb2bermain2` — Cermin Sinar Matahari
* **Berkas:** [`web/src/games/Zone4Level2/SB2Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB2Bermain2.astro) (472 baris)
* **Latar Cerita:** Cermin optik kuno memantulkan sinar matahari di pelataran desa Nalanda.
* **Konsep Matematika GASING:**
  * Campuran pengurangan variatif yang menghasilkan 1 digit ($10-2, 9-4, 8-3, 10-7, \dots$).
* **Mekanika & Interaksi:**
  * Permainan memori 3D flip kartu di dada karakter melayang.
  * Mencocokkan kartu matahari (soal campuran) dengan cermin (jawaban).
* **Ronde, Nyawa & Timer:** 2 ronde (masing-masing 5 pasang kartu = 10 pasang total), 5 nyawa, `lifeLossOnWrong: false`.
* **Temuan Audit:**
  * Di `howToPlayRegistry.ts` baris 267: tertulis *"mencocokkan soal pengurangan 8"* $\rightarrow$ **Koreksi:** Ini adalah **campuran pengurangan hasil 1 digit**, bukan hanya pengurangan 8.

#### Game 8: `z4l2-sb2bermain3` — Perangkap Telur Mutant
* **Berkas:** [`web/src/games/Zone4Level2/SB2Bermain3.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB2Bermain3.astro) (339 baris)
* **Latar Cerita:** Menghancurkan telur-telur mutant di lembah pengurangan sebelum menetas.
* **Konsep Matematika GASING:**
  * Mencongak cepat **10 kurang** ($10-1$ s.d. $10-9$).
* **Mekanika & Interaksi:**
  * Kotak target di atas menampilkan angka hasil (misal: **Target nilai: 7**).
  * 5 telur mutant bertuliskan soal $10-x$ ($10-3, 10-5, 10-8, \dots$).
  * Pemain mengetuk telur yang jika dihitung hasilnya sama dengan target (yaitu $10-3 = 7$).
* **Ronde, Nyawa & Timer:** 15 ronde cepat, 5 nyawa, countdown timer.
* **Audit Teks & Banner:** Banner dan howToPlay sudah rapi dan diakhiri `!`.

#### Game 9: `z4l2-sb2bermain4` — Tantangan Desa Maharashtra
* **Berkas:** [`web/src/games/Zone4Level2/SB2Bermain4.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level2/SB2Bermain4.astro) (274 baris)
* **Latar Cerita:** Ujian kelulusan mencongak cepat di balai desa Maharashtra.
* **Konsep Matematika GASING:**
  * Drill refleks pengurangan sembarang di bawah 10 ($a - b$ dengan $a \le 10, b \le a$).
* **Mekanika & Interaksi:**
  * Soal besar di tengah: `? − ? = ?` (misal: $9 - 4 = ?$).
  * 3 tombol pilihan ganda besar di bawahnya.
* **Ronde, Nyawa & Timer:** 20 ronde mencongak cepat, 5 nyawa, timer per soal.
* **Audit Teks & Banner:** Banner dan howToPlay sudah konsisten.

---

### 🔹 LEVEL 3: Pengurangan 2-Digit dengan 1-Digit (4 Games)

#### Game 10: `z4l3-sb1bermain1` — Bowling Kuno India
* **Berkas:** [`web/src/games/Zone4Level3/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level3/SB1Bermain1.astro) (417 baris)
* **Generator Soal:** [`web/src/lib/math/z4l3BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l3BermainMath.ts) (`generateBowlingIndiaQuestion`)
* **Latar Cerita:** Arena permainan bowling batu kuno di pelataran istana India.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit dengan 1-digit **tanpa meminjam**:
    * Angka puluhan di bawah 5 ($A \in \{10 \dots 49\}$).
    * Satuan bisa dikurangi langsung ($a_0 \ge B$). Contoh: $19 - 3 = 16, 27 - 4 = 23, 46 - 2 = 44$.
* **Mekanika & Interaksi:**
  * Kotak soal di atas: $19 - 3 = ?$.
  * Pin bowling kayu berjajar dengan angka jawaban dan pengecoh pedagogis (*distractor* kesalahan umum GASING).
  * Siswa mengklik pin yang tepat, bola bowling meluncur dan pin tumbang hancur berkeping-keping (*physics debris particle effect*).
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, countdown timer.
* **Audit Teks & Banner:** Teks banner sudah diakhiri `!`.

#### Game 11: `z4l3-sb1bermain2` — Pasar Malam India Kuno
* **Berkas:** [`web/src/games/Zone4Level3/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level3/SB1Bermain2.astro) (269 baris)
* **Latar Cerita:** Kios bazar festival pasar malam India kuno.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit dengan 1-digit **tanpa meminjam**:
    * Angka puluhan besar ($a_1 \ge 6, A \in \{60 \dots 99\}$).
    * Satuan bisa dikurangi ($a_0 \ge B$). Contoh: $87 - 4 = 83, 78 - 5 = 73, 98 - 6 = 92$.
* **Mekanika & Interaksi:**
  * Soal di papan kios teal: $87 - 4 = ?$.
  * 3 pilihan ganda angka jawaban.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, timer per soal.
* **Audit Teks & Banner:** Banner: *"Pilihlah jawaban yang tepat!"* (Diakhiri tanda seru `!`).

#### Game 12: `z4l3-sb2bermain1` — Memanah Guci Kerajaan
* **Berkas:** [`web/src/games/Zone4Level3/SB2Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level3/SB2Bermain1.astro) (375 baris)
* **Generator Soal:** [`web/src/lib/math/z4l3BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l3BermainMath.ts) (`generateMemanahGuciQuestion`)
* **Latar Cerita:** Arena panahan istana kerajaan membidik guci tanah liat.
* **Konsep Matematika GASING:**
  * **Puluhan Bulat dikurangi 1-Digit:**
    * Angka puluhan berakhiran nol ($A \in \{10, 20, 30, \dots, 90\}$) dikurangi 1-digit ($B \in \{1 \dots 9\}$).
    * Menguatkan teknik GASING: Kurangi 1 pada puluhan, lalu cari **Teman 10** dari satuan pengurang! Contoh: $20 - 7 = 13$, $50 - 4 = 46$, $80 - 9 = 71$.
* **Mekanika & Interaksi:**
  * Busur dan anak panah SVG interaktif di bawah.
  * Siswa mengetuk guci sasaran yang bernilai benar, busur mengarah secara dinamis, anak panah melesat, dan guci pecah berkeping-keping (*shatter polygon clip-path*).
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, countdown timer.
* **Audit Teks & Banner:** Sudah rapi dan diakhiri `!`.

#### Game 13: `z4l3-sb2bermain2` — Rahasia Gua Gelap
* **Berkas:** [`web/src/games/Zone4Level3/SB2Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level3/SB2Bermain2.astro) (316 baris)
* **Generator Soal:** [`web/src/lib/math/z4l3BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l3BermainMath.ts) (`generateRahasiaGuaGelapQuestion`)
* **Latar Cerita:** Menjelajahi gua kristal gelap menggunakan obor matematika.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit dengan 1-digit **dengan teknik meminjam/menukar**:
    * Satuan tidak bisa dikurangi langsung ($a_0 < B$).
    * Memerlukan jembatan Teman 10: $(B - a_0)$ lalu cari pasangan 10-nya atau $10 - B + a_0$. Contoh: $21 - 5 = 16, 52 - 7 = 45, 83 - 8 = 75$.
* **Mekanika & Interaksi:**
  * Terdapat pemilih mode di awal: **📐 Pengurangan 2 Angka** atau **📊 Pengurangan Belasan** ($11 \dots 18 - 2 \dots 9$).
  * Soal di papan kristal ungu: $21 - 5 = ?$. 3 pilihan ganda.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, timer 15 detik per soal.
* **Audit Teks & Banner:** Diakhiri `!`.

---

### 🔹 LEVEL 4: Pengurangan 2-Digit dengan 2-Digit (4 Games)

#### Game 14: `z4l4-sb1bermain1` — Bowling Menara Qutub
* **Berkas:** [`web/src/games/Zone4Level4/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level4/SB1Bermain1.astro) (441 baris)
* **Generator Soal:** [`web/src/lib/math/z4l4BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l4BermainMath.ts) (`generateBowlingQutubQuestion`)
* **Latar Cerita:** Pelataran Menara Qutub abad pertengahan.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit dengan 2-digit **tanpa meminjam**:
    * Angka puluhan di bawah 5 ($a_1 \in \{2, 3, 4\}$).
    * Puluhan dan satuan bisa dikurangi langsung ($a_1 \ge b_1, a_0 \ge b_0$). Contoh: $28 - 14 = 14, 39 - 25 = 14, 47 - 32 = 15$.
* **Mekanika & Interaksi:**
  * Bola bowling merah dilempar ke pin berangka jawaban di pelataran menara. Pin tumbang dengan efek partikel puing.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, countdown slider.
* **Audit Teks & Banner:** Diakhiri `!`.

#### Game 15: `z4l4-sb1bermain2` — Tantangan Menara Qutub
* **Berkas:** [`web/src/games/Zone4Level4/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level4/SB1Bermain2.astro) (241 baris)
* **Latar Cerita:** Kuis tantangan matematika di balkon menara tinggi Qutub Minar.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit tanpa meminjam dengan angka puluhan besar.
  * *Temuan Kode Langsung:* Generator di dalam berkas saat ini menguji bilangan 2-digit dikurangi satuan yang bisa dikurangi ($b \le 9, a_0 \ge b$).
* **Mekanika & Interaksi:** Pilihan ganda 3 tombol dengan kartu teal.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa.
* **Audit Teks & Banner:** Banner diakhiri `!`.

#### Game 16: `z4l4-sb2bermain1` — Memanah Labu Qutub Minar
* **Berkas:** [`web/src/games/Zone4Level4/SB2Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level4/SB2Bermain1.astro) (376 baris)
* **Generator Soal:** [`web/src/lib/math/z4l4BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l4BermainMath.ts) (`generateMemanahLabuQuestion`)
* **Latar Cerita:** Memanah labu-labu orange di kebun Menara Qutub.
* **Konsep Matematika GASING:**
  * **Puluhan Murni dikurangi Sebarang 2-Digit:**
    * Bilangan puluhan murni ($A \in \{20, 30, \dots, 90\}$) dikurangi bilangan 2-digit ($B < A$).
    * Mengasah teknik GASING lirik kanan: kurangi puluhan dengan $(b_1 + 1)$, lalu cari pasangan 10 dari satuannya! Contoh: $50 - 34 = 16$, $70 - 42 = 28$, $80 - 28 = 52$.
* **Mekanika & Interaksi:**
  * Busur panah membidik target labu orange. Labu pecah (*orange pumpkin shatter animation*).
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa, countdown timer.
* **Audit Teks & Banner:** Diakhiri `!`.

#### Game 17: `z4l4-sb2bermain2` — Puncak Menara Qutub
* **Berkas:** [`web/src/games/Zone4Level4/SB2Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level4/SB2Bermain2.astro) (226 baris)
* **Generator Soal:** [`web/src/lib/math/z4l4BermainMath.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/math/z4l4BermainMath.ts) (`generatePuncakQutubQuestion`)
* **Latar Cerita:** Ujian puncak lantai teratas Menara Qutub.
* **Konsep Matematika GASING:**
  * Pengurangan 2-digit dengan 2-digit **dengan teknik meminjam / pasangan 10**:
    * Satuan tidak bisa dikurangi langsung ($a_0 < b_0$).
    * Metode GASING dari kiri ke kanan: kurangi puluhan lalu sesuaikan dengan teman 10 satuannya. Contoh: $81 - 29 = 52, 62 - 37 = 25, 74 - 48 = 26$.
* **Mekanika & Interaksi:** Pilihan ganda 3 opsi dengan pengecoh pedagogis (*inverted units mistake* & *forgot borrow mistake*).
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa.
* **Audit Teks & Banner:** Diakhiri `!`.

---

### 🔹 LEVEL 5: Pengurangan Bilangan 3-Digit (2 Games)

#### Game 18: `z4l5-sb1bermain1` — Perburuan Kadal Savana
* **Berkas:** [`web/src/games/Zone4Level5/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level5/SB1Bermain1.astro) (449 baris)
* **Latar Cerita:** Padang savana liar, membantu bunglon/kadal savana menangkap lalat pembawa jawaban.
* **Konsep Matematika GASING:**
  * Pengurangan bilangan 3-digit dasar (ratusan dikurangi puluhan/ratusan):
    * $A \in \{100 \dots 900\}$, $B \in \{10 \dots 100\}$. Contoh: $400 - 30 = 370, 750 - 80 = 670, 800 - 250 = 550$.
* **Mekanika & Interaksi:**
  * Soal di papan batu savana: $? - ? = ?$.
  * Di atas melayang 5 ekor lalat pembawa angka jawaban.
  * Siswa mengetuk lalat yang benar $\rightarrow$ Bunglon menjulurkan lidah panjang SVG merah muda, menangkap lalat, lalu memakannya dengan animasi zoom.
* **Ronde, Nyawa & Timer:** 10 ronde, 5 nyawa.
* **Temuan Kritis Audit:**
  * Game ini **belum terdaftar sama sekali** di `aiHelpRegistry.ts`! **Wajib ditambahkan.**

#### Game 19: `z4l5-sb1bermain2` — Tantangan Savana Liar
* **Berkas:** [`web/src/games/Zone4Level5/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level5/SB1Bermain2.astro) (292 baris)
* **Latar Cerita:** Ujian ketahanan berhitung pengurangan di savana terbuka.
* **Konsep Matematika GASING:**
  * Pengurangan 3-digit berjenjang (3 tier kesulitan):
    * **Ronde 1–5:** 3-Digit $-$ 1-Digit ($100..999 - 1..9$, misal $345 - 7$).
    * **Ronde 6–10:** 3-Digit $-$ 2-Digit ($100..999 - 10..99$, misal $428 - 56$).
    * **Ronde 11–15:** 3-Digit $-$ 3-Digit ($200..999 - 100..A$, misal $752 - 384$).
* **Mekanika & Interaksi:** Pilihan ganda 3 tombol dengan badge tier yang berubah dinamis di setiap fase.
* **Ronde, Nyawa & Timer:** 15 ronde, 5 nyawa.
* **Temuan Kritis Audit:**
  * Game ini juga **belum terdaftar sama sekali** di `aiHelpRegistry.ts`! **Wajib ditambahkan.**

---

### 🔹 LEVEL 6: Pengurangan Multi-Digit (4–5 Digit) & Teka-Teki Silang (2 Games)

#### Game 20: `z4l6-sb1bermain1` — Rahasia Perpustakaan Taj Mahal
* **Berkas:** [`web/src/games/Zone4Level6/SB1Bermain1.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level6/SB1Bermain1.astro) (473 baris)
* **Latar Cerita:** Ruang arsip perpustakaan agung Taj Mahal.
* **Konsep Matematika GASING:**
  * Pengurangan multi-digit bertingkat dengan **metode Lirik Kanan GASING**:
    * **Ronde 1–5:** 4-Digit $-$ 1-Digit ($1000..9999 - 1..9$).
    * **Ronde 6–10:** 4-Digit $-$ 2-Digit ($1000..9999 - 10..99$).
    * **Ronde 11–15:** 4-Digit $-$ 3-Digit ($1000..9999 - 100..999$).
* **Mekanika & Interaksi:**
  * Numpad layar responsif (tombol 0–9, ⌫ backspace, dan tombol **OK** hijau).
  * Siswa mengetikkan jawaban angka multi-digit satu per satu dari kiri ke kanan.
* **Ronde, Nyawa & Timer:** 15 ronde, 5 nyawa.
* **Temuan Kritis Audit:**
  * Game ini **belum terdaftar sama sekali** di `aiHelpRegistry.ts`! **Wajib ditambahkan.**

#### Game 21: `z4l6-sb1bermain2` — Teka-Teki Silang Papirus Kuno
* **Berkas:** [`web/src/games/Zone4Level6/SB1Bermain2.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/games/Zone4Level6/SB1Bermain2.astro) (569 baris — memiliki *Architectural Exemption Justification*)
* **Latar Cerita:** Mengurai gulungan papirus kuno berisi jalinan persamaan pengurangan agung.
* **Konsep Matematika GASING:**
  * Pengurangan & penjumlahan multi-digit komprehensif dalam matriks teka-teki silang saling mengunci (*crossword interconnected equations*).
* **Mekanika & Interaksi:**
  * Grid papan papirus 13×13 dengan 4 cincin persamaan (*rings*) dan 4 jembatan (*bridges*), mencakup **20 sel kosong** yang harus dipecahkan.
  * Siswa memilih sel papirus kosong, lalu mengetuk kartu angka dari nampan pilihan di bawah. Setelah 20 sel terisi benar, tombol **BACA GULUNGAN** menyala untuk menyelesaikan level.
* **Ronde, Nyawa & Timer:** 1 papan (20 kotak soal), 5 nyawa.
* **Temuan Kritis Audit:**
  * Game ini **belum terdaftar sama sekali** di `aiHelpRegistry.ts`! **Wajib ditambahkan.**

---

## 3. Matriks Lengkap Audit 21 Games Zona 4

| No | Game ID | Judul Resmi | Materi Pembelajaran Riil GASING | Mekanika Utama | Target Soal | Status Kode |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| **1** | `z4l1-sb1bermain1` | **Misteri Kuil Nalanda** | Pengurangan Konkret Objek 1–10 | Audio TTS + Klik Makhluk + Numpad | 10 Soal | 🟢 Stabil (494 LOC) |
| **2** | `z4l2-sb1bermain1` | **Surat Rahasia Maharashtra** | Mencongak 9 Kurang ($9-1 \dots 9-9$) | 3D Flip Kartu Memori (Surat & Rumah) | 10 Ronde (5 Pasang) | 🟢 Stabil (393 LOC) |
| **3** | `z4l2-sb1bermain2` | **Sandi Tulang Gua Maharashtra** | Mencongak 8 Kurang ($8-1 \dots 8-8$) | Kartu Memori Anjing & Tulang | 2 Ronde (4 Pasang) | 🟢 Stabil (465 LOC) |
| **4** | `z4l2-sb1bermain3` | **Bola Meriam Kuil Nalanda** | Mencongak 7 & 6 Kurang | Canvas Brick Breaker (3 Sesi) | 3 Sesi | 🟢 Stabil (Exempt) |
| **5** | `z4l2-sb1bermain4` | **Telur Emas Kuil Nalanda** | Mencongak 1-Digit Sebarang | Pecahkan Telur Emas Sesuai Target | 10 Ronde | 🟢 Stabil (382 LOC) |
| **6** | `z4l2-sb2bermain1` | **Selendang Sutra Pasar Nalanda** | Pengurangan 10 (Teman 10) | Memori Triplet 3 Kolom + Selendang SVG | 9 Triplet | 🟢 Stabil (382 LOC) |
| **7** | `z4l2-sb2bermain2` | **Cermin Sinar Matahari** | Campuran Pengurangan Hasil 1-Digit | Memori Cermin & Matahari | 2 Ronde (5 Pasang) | 🟢 Stabil (472 LOC) |
| **8** | `z4l2-sb2bermain3` | **Perangkap Telur Mutant** | Mencongak 10 Kurang Cepat | Target Nilai + Pecahkan Telur Mutant | 15 Ronde | 🟢 Stabil (339 LOC) |
| **9** | `z4l2-sb2bermain4` | **Tantangan Desa Maharashtra** | Drill Cepat Pengurangan $\le 10$ | Pilihan Ganda Refleks Cepat (3 Opsi) | 20 Ronde | 🟢 Stabil (274 LOC) |
| **10** | `z4l3-sb1bermain1` | **Bowling Kuno India** | 2D $-$ 1D Tanpa Pinjam (Puluhan $< 5$) | Bola Bowling + Debris Partikel Pin | 10 Ronde | 🟢 Stabil (417 LOC) |
| **11** | `z4l3-sb1bermain2` | **Pasar Malam India Kuno** | 2D $-$ 1D Tanpa Pinjam (Puluhan $> 5$) | Kios Bazar + Pilihan Ganda | 10 Ronde | 🟢 Stabil (269 LOC) |
| **12** | `z4l3-sb2bermain1` | **Memanah Guci Kerajaan** | Puluhan Bulat $-$ 1D (Teman 10) | Busur Panah SVG + Guci Shatter | 10 Ronde | 🟢 Stabil (375 LOC) |
| **13** | `z4l3-sb2bermain2` | **Rahasia Gua Gelap** | 2D $-$ 1D Dengan Meminjam / Menukar | Pemilih Mode (Belasan / 2 Angka) + MC | 10 Ronde | 🟢 Stabil (316 LOC) |
| **14** | `z4l4-sb1bermain1` | **Bowling Menara Qutub** | 2D $-$ 2D Tanpa Pinjam (Puluhan $< 5$) | Bola Bowling + Pin Menara | 10 Ronde | 🟢 Stabil (441 LOC) |
| **15** | `z4l4-sb1bermain2` | **Tantangan Menara Qutub** | 2D $-$ 2D Tanpa Pinjam Puluhan Besar | Kartu Menara + Pilihan Ganda | 10 Ronde | 🟢 Stabil (241 LOC) |
| **16** | `z4l4-sb2bermain1` | **Memanah Labu Qutub Minar** | Puluhan Murni $-$ 2-Digit Sebarang | Busur Panah + Pumpkin Shatter | 10 Ronde | 10 Ronde | 🟢 Stabil (376 LOC) |
| **17** | `z4l4-sb2bermain2` | **Puncak Menara Qutub** | 2D $-$ 2D Dengan Meminjam (GASING) | Gerbang Puncak + Pilihan Ganda | 10 Ronde | 🟢 Stabil (226 LOC) |
| **18** | `z4l5-sb1bermain1` | **Perburuan Kadal Savana** | Pengurangan 3-Digit Dasar (Ratusan) | Lidah Kadal SVG + Lalat Bergerak | 10 Ronde | 🟢 Stabil (449 LOC) |
| **19** | `z4l5-sb1bermain2` | **Tantangan Savana Liar** | Pengurangan 3-Digit Berjenjang (3 Tier) | Badge Tier Dinamis + Pilihan Ganda | 15 Ronde | 🟢 Stabil (292 LOC) |
| **20** | `z4l6-sb1bermain1` | **Rahasia Perpustakaan Taj Mahal**| 4-Digit Multi-Tier (1d, 2d, 3d) | On-Screen Numpad Input (Lirik Kanan) | 15 Ronde | 🟢 Stabil (473 LOC) |
| **21** | `z4l6-sb1bermain2` | **Teka-Teki Silang Papirus Kuno** | Pengurangan & Penjumlahan 4-Digit | Grid TTS 13×13 (20 Persamaan) | 20 Kotak | 🟢 Stabil (Exempt) |

---

## 4. Temuan Kesenjangan terhadap 12 Pilar Standar Sistem Rapor GASING

Dari audit perbandingan terhadap dokumen master [`STANDAR_12_PILAR_SISTEM_RAPOR_GASING.md`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/AnalisaHasil/STANDAR_12_PILAR_SISTEM_RAPOR_GASING.md), ditemukan 6 gap teknis utama yang harus diselesaikan:

1. **Pilar 2 (Teks Banner & AI Help):**
   * [`web/src/utils/questionBannerSimplifier.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/utils/questionBannerSimplifier.ts): **Belum memuat satupun entri Zona 4!** Seluruh 21 game perlu didaftarkan dengan teks aksi 5–10 kata diakhiri `!`.
   * [`web/src/data/aiHelpRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/aiHelpRegistry.ts): Game Level 5 dan Level 6 belum terdaftar sama sekali; entri Level 2–4 masih berupa teks generik lama.
   * [`web/src/data/howToPlayRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/howToPlayRegistry.ts): Terdapat salah tulis materi (SB1B2 tertulis pengurangan 9 padahal 8; SB2B2 tertulis pengurangan 8 padahal campuran).
2. **Pilar 4 (Klaster Kompetensi & SSOT Registry):**
   * Berkas [`web/src/data/laporanPenguranganTypes.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/laporanPenguranganTypes.ts) **belum dibuat** (berbeda dengan Penjumlahan, Perkalian, dan Mengenal Bilangan yang memiliki 6 klaster kompetensi resmi).
   * [`web/src/data/laporanPenguranganRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/data/laporanPenguranganRegistry.ts): Belum memiliki fungsi kanonikal `normalizePenguranganGameKey` untuk menangani variasi ID game (`z4l2-sb1bermain1`, `z4l2-sb1b1`, dsb).
3. **Pilar 5 (Enricher 3 Pilar In-Game):**
   * [`web/src/utils/howToPlayPedagogicalEnricher.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/utils/howToPlayPedagogicalEnricher.ts): Baru menangani Zona 1, 2, dan 3. **Zona 4 Pengurangan belum dihubungkan.**
4. **Pilar 11 (Cetak A4 & PDF):**
   * [`web/src/lib/dashboard/raporPenguranganPrintController.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/dashboard/raporPenguranganPrintController.ts) dan [`RaporPenguranganPrintModal.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/dashboard/reports/RaporPenguranganPrintModal.astro): **Belum memiliki Bagian 3.5: Top 3 Kekuatan Utama (*Top Strengths*) & 3 Area Perlu Latihan (*Action Items*)** seperti yang sudah sukses diterapkan pada Penjumlahan dan Perkalian.
5. **Pilar 12 (Pengujian Unit & Kualitas Kode):**
   * Saat ini sudah ada 29 unit test di `web/tests/unit/penguasaan*.test.ts`, namun belum ada tes khusus untuk `howToPlayPedagogicalEnricher` pada Zona 4 dan verifikasi Top Strengths/Action Items.

---

## 5. Rekomendasi Langkah Selanjutnya

Audit menyeluruh 21 game bermain Zona 4 telah rampung dengan hasil yang sangat jelas dan terpetakan rapi. 

Langkah berikutnya adalah **merumuskan Perencanaan Master & Sprint Roadmap 12 Standar Sistem Rapor untuk Zona 4 (Pengurangan)**, yang akan membagi eksekusi ke dalam sprint modular terstruktur (mirip dengan sprint Zona 2 dan Zona 3 yang telah sukses 100% lulus uji).

Apakah Anda ingin saya segera menyusun dokumen **Perencanaan Master Sprint 12 Standar Zona 4 (Pengurangan)** sekarang?