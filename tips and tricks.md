Ran command: `ls -la web/src/lib/engines/zone* web/src/components/engines/zone*`
Viewed zone4StoryRegistry.ts:1-100
Viewed zone4StoryRegistry.ts:101-196
Viewed Zone3HelpModals.astro:1-100
Viewed Zone3HelpModals.astro:200-300
Viewed Zone3HelpModals.astro:301-438
Viewed Zone5HelpModals.astro:1-60
Viewed bertualangLevelRulesRegistry.ts:1-100
Viewed bertualangLevelRulesRegistry.ts:101-250
Viewed bertualangLevelRulesRegistry.ts:251-400
Searched for "HelpModals"
Searched for "Zone4HelpModals"
Searched for "Zone3HelpModals"
Searched for "Zone1"
Viewed %5BgameKey%5D.astro:1-60
Viewed %5BgameKey%5D.astro:61-120

Berikut adalah analisis lengkap mengenai **overlap pekerjaan**, penjelasan **mengapa proses sebelumnya memakan waktu lama**, serta **penulisan ulang Master Plan Narasi & Pedagogi (Zona 1 s.d. Zona 4)** dengan tips & trik yang 100% akurat sesuai kurikulum resmi GASING Prof. Yohanes Surya, disertai **reorganisasi sprint yang rapi, modular, dan cepat**.

---

# 🔍 1. Hasil Audit Overlap dengan Pekerjaan yang Sedang/Sudah Berjalan

Setelah memeriksa repositori `main-bf` secara teliti:

| Zona | Status di Codebase Saat Ini | Status Overlap & Analisis |
| :--- | :--- | :--- |
| **Zona 2** *(Penjumlahan)* | ✅ **SUDAH LIVE (Push 1 - `3c1e7cf7be`)** | **OVERLAP PENUH (Selesai).** Berkas [`zone2StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone2/zone2StoryRegistry.ts) (199 LOC) dan [`Zone2HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone2/Zone2HelpModals.astro) (440 LOC) sudah aktif di production. Bab 1–6 (Sungai Tigris, Xander, Ziggurat, Gerbang Ishtar, Jembatan Gantung, dan Gua Kristal Stalaktit) sudah 100% terintegrasi. |
| **Zona 5** *(Pembagian)* | ✅ **SUDAH LIVE (Push 3 - `3f93906cb6`)** | **OVERLAP PENUH (Selesai).** Berkas [`zone5StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone5/zone5StoryRegistry.ts) (203 LOC), [`Zone5HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone5/Zone5HelpModals.astro) (420 LOC), dan [`bertualangLevelRulesRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/shared/bertualangLevelRulesRegistry.ts) (494 LOC) sudah terpasang, lulus unit test 3/3 dan audit 371 game files lock pass. **Draf rencana lama mencantumkan "Sprint D: Finalisasi zone5StoryRegistry", padahal Zona 5 sudah selesai dan tidak perlu diulang!** |
| **Zona 4** *(Pengurangan)* | 🟡 **SUDAH ADA SEBAGIAN** | **OVERLAP PARSIAL.** Berkas [`zone4StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone4/zone4StoryRegistry.ts) (196 LOC) dan [`Zone4HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone4/Zone4HelpModals.astro) (456 LOC) sudah ada di codebase. Hanya memerlukan penyesuaian minor pada teks dialog teater & tips Śūnya terbaru serta unit test. |
| **Zona 1** *(Mengenal Bilangan)* | 📦 **CADANGAN SIAP (Scratch Backup)** | **BELUM DIGABUNG.** Berkas `zone1StoryRegistry.ts` dan `Zone1HelpModals.astro` sudah disiapkan dan dicadangkan di folder scratch, tinggal dipasang secara modular ke codebase dan di-hook ke [`[gameKey].astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/pages/game/[gameKey].astro). |
| **Zona 3** *(Perkalian)* | ⚪ **BELUM MEMILIKI REGISTRY MODULAR** | **BELUM DIKERJAKAN.** [`Zone3HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone3/Zone3HelpModals.astro) saat ini masih berupa bantuan generik tanpa modal cerita Bab 1–6 Crotone/Pythagoras/Samos. Diperlukan berkas modular baru `zone3StoryRegistry.ts` (< 300 LOC). |

---

# ❓ 2. Mengapa Sebelumnya Terasa Lama Sekali?

1. **Monolitik Batching (Mengerjakan Semua Zona Sekaligus):** Sebelumnya ada upaya memproses Zona 1, Zona 3, dan Zona 5 secara bersamaan dalam satu giliran raksasa. Hal ini menyebabkan token konteks membengkak, proses kompilasi melambat, dan resiko regresi meningkat.
2. **Browser E2E Terlalu Berat Saat Development Awal:** Menjalankan Playwright browser secara penuh untuk seluruh game di setiap iterasi minor memakan waktu 3–5 menit per run dan rawan timeout.
3. **Solusi Efektif yang Terbukti (Pola Push 3):**
   - Kerjakan **1 Zona per 1 Sprint** secara terisolasi.
   - Gunakan **Fast Unit Test (Tier 2)** (< 2 detik) untuk validasi logika data & registri.
   - Audit kepatuhan **Game Lock Guard (371 files locked)** dan **oxlint** secara instan.
   - Pengerjaan menjadi sangat cepat, rapi, dan langsung hijau.

---

# 🗺️ Master Plan Narasi & Pedagogi (Zona 1 s.d. Zona 4)
*Diselaraskan dengan Standar Emas Zona 5, Aturan Byte-Lock 371 File, dan Metodologi Resmi GASING Prof. Yohanes Surya.*

---

## 🏛️ ZONA 1: _The Game of Numbers_ (Mengenal Bilangan & Nilai Tempat)
**Latar Utama:** Peradaban Lembah Sungai Nil, Padang Pasir Sahara, & Istana Megah Firaun (~3000 SM)  
**Misi Utama:** Menguasai visualisasi bilangan konkret, konsep bundel puluhan, pengelompokan 3-digit ratusan/ribuan, serta 7 Kartu Warna Nilai Tempat GASING demi menyelamatkan pangan warga dari badai pasir mutan dan merebut **Fragmen ke-1 Sacred Octagon**.

---

#### 📜 Level 1 (Bab I): _The Farm Land_ — Panen Buah Semangka di Tepi Sungai Nil
- **Latar:** Lahan Pertanian Subur Tepi Sungai Nil & Gerbang Oase Pertama.
- **Sinopsis Cerita:** Ksatria Gaber terlempar ke tepi Sungai Nil masa Mesir Kuno. Petani desa panik karena semangka dan melon mereka diserbu kawanan Piko Mutant Belalang rakus. Gaber membantu petani mengelompokkan buah ke dalam keranjang oktagon dengan visualisasi konkret bilangan 1 sampai 10.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Di bawah terik matahari tepian Sungai Nil, angin gurun membawa aroma tanah basah dan desingan sayap kawanan belalang mutan._  
  > **Petani Oase:** "Ksatria asing! Kawanan belalang mutan pimpinan Blaze merusak lumbung pangan kami! Buah semangka panen kami berserakan tak terhitung!"  
  > **Ksatria Gaber:** "Tenang, Paman! Jangan panik dan jangan menghitung satu per satu dengan jari yang lambat! Gunakan Aturan 5 GASING: letakkan 5 semangka di baris atas dan sisanya di bawah. Sekali lirik langsung terbaca jumlahnya!"  
  > **Ksatria Cilik Nil:** "Luar biasa! Sekali lirik kelompok 5 dan 2 langsung terbaca 7 semangka! Ayo bersihkan lumbung dari kawanan belalang!"
- **Gameplay & Rintangan:** Bertahan di pematang sawah tepi Sungai Nil dari serbuan Piko Mutant Belalang dan Kumbang Lumpur.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal kuantitas konkret 1 s.d. 5 semangka).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal kuantitas konkret 6 s.d. 10 dengan Aturan 5 susun 2 baris).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal mencongak cepat lambang bilangan 1 s.d. 10 acak).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Aturan 5 Visual:** Bilangan 1–5 dilihat dalam satu baris penuh. Bilangan 6–10 **WAJIB** disusun dalam 2 baris ("5 di atas, sisanya di bawah"). Angka 7 = 5 dan 2; Angka 8 = 5 dan 3.
  - **Pantangan Menghitung Jari:** Hindari menghitung satu demi satu dengan jari lambat. Latih mata menangkap pola kelompok benda secara refleks!

---

#### 📜 Level 2 (Bab II): _The Nile River_ — Arus Deras & Formasi Kapal Papirus
- **Latar:** Dermaga Aliran Sungai Nil & Labirin Rawa Rumput Papirus Kuno.
- **Sinopsis Cerita:** Gaber menyusuri Sungai Nil dengan perahu papirus. Arus sungai dihadang kawanan Mutant Buaya Air dan Kepiting Beracun yang membawa kode angka puluhan (11 s.d. 100). Gaber mengajarkan cara memandang puluhan sebagai satu bundel utuh 10.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Air Sungai Nil bergolak kehijauan saat deretan perahu buaya mutan mencoba menenggelamkan konvoi kargo papirus._  
  > **Ksatria Cilik Nil:** "Ksatria Gaber! Angka-angka di punggung buaya mencapai puluhan! Ada 34, 57, 82... bagaimana membacanya secepat kilat?"  
  > **Ksatria Gaber:** "Ingat rahasia bundel sepuluh GASING! Bilangan 34 artinya ada 3 bundel sepuluhan dan 4 satuan lepas. Angka depan adalah jumlah ikatan, angka belakang adalah benda lepas!"  
  > **Ksatria Cilik Nil:** "Aku paham! Tiga ikat sepuluh bernilai 30, ditambah 4 menjadi 34! Meriam perahu siap menembak buaya mutan!"
- **Gameplay & Rintangan:** Melompati pusaran air deras dan menepis semburan mutan buaya menggunakan tembakan koordinat bilangan puluhan.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal bilangan kelipatan 10 murni: 10, 20, ..., 90).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal bilangan puluhan belasan: 11 s.d. 50).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal bilangan puluhan dan satuan acak: 51 s.d. 99).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Konsep Bundel 10:** Pahami puluhan sebagai ikatan utuh. Angka di tempat puluhan menunjukkan berapa kali kelompok 10 terbentuk.
  - **Struktur Kiri ke Kanan:** Baca selalu dari nilai tempat terbesar di sebelah kiri baru beralih ke satuan di sebelah kanan.

---

#### 📜 Level 3 (Bab III): _The Desert Fortress_ — Badai Pasir di Benteng Oase Sahara
- **Latar:** Padang Pasir Sahara yang Gersang & Benteng Tanah Liat Kuno.
- **Sinopsis Cerita:** Badai pasir dahsyat menerjang benteng oase. Wizard Mutant Pasir menciptakan ilusi angka ratusan ($101\text{--}1.000$) untuk mengaburkan gerbang benteng. Gaber mengajarkan pembacaan struktur 3-digit dan kehati-hatian posisi angka nol di tengah vs di belakang.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Pasir merah beterbangan menutupi sinar matahari. Gerbang kayu benteng berderit menahan hantaman badai pasir gurun._  
  > **Penjaga Benteng:** "Fatamorgana monster pasir mengecoh kami! Mereka memunculkan angka ratusan seperti 408 dan 480 untuk merusak kunci gerbang!"  
  > **Ksatria Gaber:** "Perhatikan letak angka nol! Pada 408, ratusannya 4, puluhannya kosong (nol), satuannya 8. Pada 480, puluhannya 8 dan satuannya kosong! Baca mantap dari kiri ke kanan!"  
  > **Penjaga Benteng:** "Gerbang benteng terkunci kokoh! Sihir ilusi pasir monster buyar oleh ketelitian mencongak kita!"
- **Gameplay & Rintangan:** Bertahan di tembok benteng tanah liat dari serbuan Kalajengking Raksasa dan pusaran badai pasir.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal ratusan bulat: 100, 200, ..., 900).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal ratusan dengan angka nol di tengah: 101 s.d. 909).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal ratusan lengkap acak: 101 s.d. 999).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Struktur 3 Digit:** Ratusan selalu terdiri dari 3 digit: [Ratusan][Puluhan][Satuan].
  - **Waspada Posisi Angka Nol:** Nol di tengah berarti tidak ada puluhan lepas (contoh: $507 =$ lima ratus tujuh). Nol di ujung berarti tidak ada satuan lepas (contoh: $570 =$ lima ratus tujuh puluh).

---

#### 📜 Level 4 (Bab IV): _The Pharaoh Palace_ — Aula Pilar Megah Ribuan & Jutaan
- **Latar:** Pelataran Marmer & Aula Seribu Pilar Istana Megah Firaun.
- **Sinopsis Cerita:** Gaber tiba di aula istana ibu kota. Para juru tulis kerajaan kewalahan mencatat perbendaharaan emas yang mencapai ribuan hingga jutaan ($1.001\text{--}1.000.000$). Jenderal mutan menyusup memanipulasi naskah papirus. Gaber mendemonstrasikan sistem pengelompokan 3 angka dengan tanda titik pemisah ribuan.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Obor emas menyala di sepanjang pilar marmer berukir hieroglif. Sang Raja Muda mengamati naskah kerajaan dengan cemas._  
  > **Juru Tulis Istana:** "Angka-angka upeti emas mencapai jutaan! $1.250.000$ keping emas! Sulit sekali membaca bilangan sebesar ini tanpa tersandung!"  
  > **Ksatria Gaber:** "Kelompokkan setiap 3 digit dari belakang dengan tanda titik! Tiga digit pertama adalah Keluarga Satuan, tiga digit berikutnya adalah Keluarga Ribuan, dan di depannya Keluarga Jutaan. Baca kelompoknya, lalu sebut nama keluarganya!"  
  > **Juru Tulis Istana:** "Satu juta, dua ratus lima puluh ribu! Sangat mudah dan mengalir! Berkas istana aman dari sabotase penyusup!"
- **Gameplay & Rintangan:** Menangkis serbuan Pengawal Berzirah Emas Mutan dan lemparan tombak api di aula pilar istana.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal bilangan ribuan: $1.000\text{--}9.999$).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal bilangan puluh ribuan & ratus ribuan).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal bilangan hingga satu juta: $1.000.000$).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Metode Keluarga 3-Digit:** Kelompokkan angka tiap 3 digit dari belakang: [Jutaan] . [Ribuan] . [Satuan].
  - **Membaca Tanpa Terbata-bata:** Cukup baca 3 digit di dalam kelompoknya seperti membaca bilangan ratusan biasa, lalu sematkan nama keluarganya di belakang.

---

#### 📜 Level 5 (Bab V): _The Crystal Mountain_ — Tambang Nilai Tempat Pegunungan Kristal
- **Latar:** Lereng Tambang Kristal Berkilau & Tembok Pertahanan Tebing Batu.
- **Sinopsis Cerita:** Di pegunungan kristal, bijih kristal energi memiliki kode warna nilai tempat GASING. Mutant Shaders memecahkan wadah kristal di lereng tambang. Gaber membimbing para penambang menyusun formasi tembok pertahanan nilai tempat.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Pendar cahaya kristal aneka warna memancar dari dinding tebing cadas di bawah langit senja lembah nil._  
  > **Kepala Penambang:** "Mutant Shaders memecahkan wadah energi! Kristal ribuan dan ratusan bercampur baur di lantai tambang!"  
  > **Ksatria Gaber:** "Urai bilangan berdasarkan 7 Kartu Warna Nilai Tempat GASING! Bilangan 7.425 diurai menjadi: 7 kristal ribuan merah ($7.000$), 4 kristal ratusan biru ($400$), 2 kristal puluhan hitam ($20$), dan 5 kristal satuan putih ($5$)!"  
  > **Kepala Penambang:** "Tembok energi kristal kembali aktif! Spektrum warna ini melumpuhkan seluruh monster lereng tebing!"
- **Gameplay & Rintangan:** Menyusun pilar kristal pertahanan dan menembakkan laser spektrum warna ke arah Mutant Shaders.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal mengurai nilai tempat 3-digit).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal mengurai nilai tempat 4-digit).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal dekomposisi nilai tempat acak hingga 5-digit).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **7 Standar Warna Kartu GASING:** 🟣 Ungu (Jutaan), 🟢 Hijau (Ratus Ribuan), 🟡 Kuning (Puluh Ribuan), 🔴 Merah (Ribuan), 🔵 Biru (Ratusan), ⚫ Hitam (Puluhan), ⚪ Putih (Satuan).
  - **Beda "Tempat" dan "Nilai":** Angka 5 pada 8.520 menempati **tempat ratusan** dan mempunyai **nilai 500**.

---

#### 📜 Level 6 (Bab VI): _The Cave of Sacred Octagon_ — Kamar Rahasia Piramida & Fragmen Pertama
- **Latar:** Kamar Bawah Tanah Piramida Kuno & Altar Sarkofagus Emas.
- **Sinopsis Cerita:** Gaber mencapai altar kamar suci piramida. Segel Fragmen ke-1 Sacred Octagon terkunci oleh teka-teki komparasi bilangan besar ($>, <, =$). Boss Mumi Raksasa melempar balok batu piramida. Gaber membandingkan bilangan secara kilat dari digit paling kiri untuk membuka segel dan merebut Fragmen Pertama!
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Udara dingin menyergap di kamar piramida berukir hieroglif emas. Patung Anubis menjaga gerbang batu bersandi matematika._  
  > **Pendeta Penjaga Segel:** "Ksatria! Boss Mumi Raksasa menyegel altar! Bandingkan bilangan penjaga ini sebelum lantai kamar runtuh!"  
  > **Ksatria Gaber:** "Bandingkan selalu dari digit paling kiri! Bandingkan $45.820$ dengan $45.910$: digit puluh ribu dan ribuan sama, tapi ratusan $9 > 8$, maka $45.910$ pasti lebih besar!"  
  > **Pendeta Penjaga Segel:** "Segel batu terbuka! Inilah Fragmen Pertama Sacred Octagon! Teruskan perjuanganmu ke Babilonia!"
- **Gameplay & Rintangan:** Pertarungan klimaks menghadapi Boss Mumi Raksasa, runtuhan batu langit-langit, dan gempa ruangan piramida.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal perbandingan 2 bilangan: 3 & 4 digit).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal perbandingan bilangan 5 digit).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal mengurutkan 4 bilangan dari terkecil ke terbesar).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Hitung Digit Dulu:** Bilangan dengan jumlah digit lebih banyak pasti bernilai lebih besar ($10.000 > 9.999$).
  - **Scan Kiri ke Kanan:** Jika jumlah digitnya sama, bandingkan digit demi digit mulai dari posisi paling kiri sampai menemukan digit yang berbeda.

---

## 🏛️ ZONA 2: _The Ancient City_ (Penjumlahan / Addition)
**Latar Utama:** Peradaban Babilonia Kuno Era Raja Hammurabi (~1750 SM)  
**Misi Utama:** Membebaskan kalung pusaka Xander, membongkar fitnah Pangeran Felizio, menguasai Penjumlahan GASING (Pasangan 10 & Lirik Kanan tanpa "carry"), dan merebut **Fragmen ke-2 Sacred Octagon**.

---

#### 📜 Level 1 (Bab I): _The Mysterious Kid_ — Fitnah Pencurian di Kanal Eufrat
- **Latar:** Dermaga Sungai Eufrat & Patung Hammurabi.
- **Sinopsis Cerita:** Gaber melerai saudagar emas Nebo yang menuduh anak jalanan lusuh bernama Xander mencuri kalung berlogo Sacred Octagon. Polisi menyita kalung ke Treasure House. Gaber mengawal perahu dagang di Sungai Tigris mengumpulkan koin tebusan dengan penjumlahan dasar 1–5.
- **Kutipan Dialog Teater:**
  > **Nebo:** "Anak lusuh ini mencuri kalung berharga bermata batu segi delapan dari tokoku!"  
  > **Xander:** "Aku tidak mencuri! Ini kalung peninggalan ibuku!"  
  > **Ksatria Gaber:** "Lambang itu adalah Sacred Octagon! Xander, kita kawal perahu dagang di Sungai Tigris. Penjumlahan kilat $1\text{--}5$ GASING akan mengumpulkan koin tebusan untuk membebaskan kalungmu!"
- **Gameplay:** Mengawal perahu dagang kayu di Sungai Tigris dari serbuan Mutant Piko perenang cepat.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal hasil 2, 3, 4); Gelombang 2 (150 Poin / 8 soal hasil 5 dan bilangan rumpang); Gelombang 3 (250 Poin / 6 soal kombinasi 1–5). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Kombinasi Konkret 1–5:** Kuasai kombinasi 5: $(1 + 4)$ dan $(2 + 3)$. Dilarang menghitung jari satu per satu!

---

#### 📜 Level 2 (Bab II): _The Little Fugitive_ — Pendakian Bukit Ziggurat Treasure House
- **Latar:** Lembah Perbukitan Berbatu & Tangga Kuno Ziggurat Menuju Treasure House.
- **Sinopsis Cerita:** Koin terkumpul, namun antek Blaze mengerahkan Piko Mutant bukit menghujani tangga ziggurat dengan batu cadas. Gaber dan Xander menaiki lift batu menggunakan tembakan energi Pasangan 10.
- **Kutipan Dialog Teater:**
  > **Xander:** "Treasure House ada di puncak tebing, tapi mutan menghujani kita dengan batu cadas!"  
  > **Ksatria Gaber:** "Tetap di belakangku! Pasangan 10 GASING adalah perisai terkuat kita!"  
  > **Xander:** "Hebat sekali! $4 + 4 = 8$, dan $3 + 7 = 10$ seketika hancur! Jalan terbuka!"
- **Gameplay:** Menghindari lemparan batu parabola dan menaiki lift vertikal sambil menembak mutan.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal hasil 6–7); Gelombang 2 (150 Poin / 8 soal hasil 8–9); Gelombang 3 (250 Poin / 6 soal Pasangan 10 murni). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Wajib Pasangan 10:** $9 \leftrightarrow 1, 8 \leftrightarrow 2, 7 \leftrightarrow 3, 6 \leftrightarrow 4, 5 \leftrightarrow 5$. Bilangan 6–10 dipahami sebagai $5 + \text{sisa}$ ($7 = 5 + 2$). Mutlak dilarang menyebut istilah "Kawan 10"!

---

#### 📜 Level 3 (Bab III): _The Canal Attack_ — Serbuan Monster Bertato di Bendungan Aqueduct
- **Latar:** Puncak Bendungan Kanal Aqueduct Raksasa Babilonia.
- **Sinopsis Cerita:** Kalung berhasil ditebus, namun bendungan kanal kota diserbu monster air raksasa bertato angka misterius ($11\text{--}20$). Gaber mengajarkan teknik "Lengkapi Menjadi 10".
- **Kutipan Dialog Teater:**
  > **Sang Kolonel:** "Monster bertato angka aneh ini kebal pedang perunggu kami!"  
  > **Ksatria Gaber:** "Itu tato matematika! Soal di dadanya: $9 + 6$. Ambil 1 dari 6 untuk melengkapi 9 menjadi 10 utuh. Sisa 6 adalah 5. Hasilnya seketika 15!"  
  > **Sang Kolonel:** "Luar biasa! Meriam berdaya 15 langsung melenyapkan monster itu!"
- **Gameplay:** Mengendalikan ballista perahu pada 3 jalur kanal (Top, Mid, Bottom) melawan monster amfibi.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal $10 + n$); Gelombang 2 (150 Poin / 8 soal $9 + n$ & $8 + n$); Gelombang 3 (250 Poin / 6 soal $7 + n$ & $6 + n$). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Teknik Lengkapi Menjadi 10:** Untuk $8 + 5$, pinjam 2 dari 5 sehingga 8 menjadi 10 utuh, sisanya 3. Hasilnya $10 + 3 = 13$ tanpa menghitung jari.

---

#### 📜 Level 4 (Bab IV): _The Gate of Ishtar_ — Pengepungan Gerbang Ishtar & Terowongan Rahasia
- **Latar:** Gerbang Keramik Biru Ishtar & Terowongan Bawah Tanah.
- **Sinopsis Cerita:** Kota dikepung mutant Blaze. Di lorong bawah tanah, 4 portal batu dimensi kuno hanya bisa dibuka dengan kecepatan penjumlahan 2 angka tanpa coret-coret simpanan menggunakan teknik **Lirik Kanan**.
- **Kutipan Dialog Teater:**
  > **Panglima Penjaga:** "Portal dimensi ini terkunci dan akan meledak jika salah dijawab!"  
  > **Ksatria Gaber:** "Gunakan teknik Lirik Kanan GASING dari puluhan terdepan: $47 + 28$. Puluhan $4 + 2 = 6$, lirik kanan $7 + 8 = 15$ (ada simpanan 1). Maka puluhan seketika jadi 7, satuannya 5. Langsung terbaca: 75!"  
  > **Xander:** "Portal dimensi terbuka lebar dan tidak ada yang retak!"
- **Gameplay:** Memilih portal yang benar di labirin 5x5 kisi bawah tanah, menghindari portal retak.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal 2-digit tanpa lirik); Gelombang 2 (150 Poin / 8 soal 2-digit 1 lirik kanan); Gelombang 3 (250 Poin / 6 soal 2-digit lirik kanan beruntun). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Mandat Lirik Kanan (Anti-Carry):** Selalu jumlahkan puluhan dari kiri. Lirik angka satuan di kanannya: jika hasil jumlah satuan $\ge 10$, langsung tambahkan 1 pada puluhannya saat itu juga. Istilah "carry" dilarang keras!

---

#### 📜 Level 5 (Bab V): _The Adventure in the Palace_ — Rahasia Pangeran & Jembatan Taman Gantung
- **Latar:** Markas Komandan & Jembatan Berkelok Taman Gantung Babilonia.
- **Sinopsis Cerita:** Xander ternyata adalah Pangeran Alexander, putra Pangeran Felizio (arsitek Taman Gantung yang diculik Blaze). Gaber dan Alexander melintasi winding bridge Taman Gantung dengan penjumlahan 3 angka untuk menemui Sang Ratu.
- **Kutipan Dialog Teater:**
  > **Pangeran Alexander:** "Ayahku disekap... Gaber, jembatan ini dipasangi bom waktu matematika oleh mutant istana!"  
  > **Ksatria Gaber:** "$364 + 482$: Ratusan $3 + 4 = 7$, lirik puluhan $6 + 8 = 14$ (jadi 8). Lirik satuan $4 + 2 = 6$. Hasil kilat: 846!"  
  > **Pangeran Alexander:** "Jembatan aman! Mari temui Ratu dan bersihkan nama ayahku!"
- **Gameplay:** Melintasi 30 petak jembatan serpentine di bawah ancaman timer bomb 10 detik.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal 3-digit tanpa lirik); Gelombang 2 (150 Poin / 8 soal 3-digit lirik tunggal); Gelombang 3 (250 Poin / 6 soal 3-digit lirik ganda). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Lirik Kanan Berantai:** Ratusan $\rightarrow$ Puluhan $\rightarrow$ Satuan dikerjakan dari kiri ke kanan. Jawab langsung terucap di bibir tanpa kertas buram!

---

#### 📜 Level 6 (Bab VI): _The Secret Cavern_ — Gua Kristal Stalaktit & Fragmen ke-2 Sacred Octagon
- **Latar:** Paviliun Ratu & Gua Stalaktit Kristal Terdalam Babilonia.
- **Sinopsis Cerita:** Pangeran Felizio disekap di balik 3 Pilar Rune Stalaktit. Dengan penjumlahan ribuan dan puluhan ribu dari depan, Gaber meruntuhkan pilar kutukan, membebaskan Pangeran Felizio, dan menerima Fragmen ke-2 Sacred Octagon!
- **Kutipan Dialog Teater:**
  > **Pangeran Felizio:** "Pilar stalaktit ini mengunci energiku dengan angka puluhan ribu!"  
  > **Ksatria Gaber:** "Satukan kolom sejenis dari kiri ke kanan! $45.200 + 38.450$: Puluh ribuan $4 + 3 = 7$, lirik ribuan $5 + 8 = 13$ (jadi 8). Ratusan 6, puluhan 5, satuan 0. Hasil: 83.650!"  
  > **Pangeran Felizio:** "Segel hancur! Ambillah Fragmen ke-2 Sacred Octagon ini, Ksatria Gaber!"
- **Gameplay:** Memecahkan 3 Pilar Rune Stalaktit di tengah gempa bumi gua dan runtuhan kristal tajam.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal 4-digit ribuan); Gelombang 2 (150 Poin / 8 soal 5-digit puluh ribuan); Gelombang 3 (250 Poin / 6 soal multi-digit masif). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Kolom Sejenis dari Depan:** Sejajarkan nilai tempat di dalam pikiran. Kerjakan ribuan dengan ribuan, ratusan dengan ratusan dari depan ke belakang.

---

## 🏛️ ZONA 3: _The Secret of Pythagoras_ (Perkalian / Multiplication)
**Latar Utama:** Peradaban Yunani Kuno, Kota Pesisir Crotone & Pulau Samos (~530 SM)  
**Misi Utama:** Menguasai hakikat perkalian konkret (Wadah & Isi), mencongak kilat tabel perkalian dasar, metode bintang 2-digit, serta dekomposisi perkalian bilangan besar bersama Mazhab Pythagoras demi merebut **Fragmen ke-3 Sacred Octagon**.

---

#### 📜 Level 1 (Bab I): _The Chaos in Crotone_ — Kekacauan di Pasar Pelabuhan Crotone
- **Latar:** Pelabuhan Batu Kota Crotone & Pasar Tradisional Yunani Kuno.
- **Sinopsis Cerita:** Gaber tiba di pelabuhan Crotone. Peti-peti dagang minyak zaitun diacak-acak Mutant Kepiting Cakar Besi. Seorang anak bernama Omega menangis kebingungan. Gaber mengajarkan hakikat perkalian secara visual sebagai konsep **Wadah (Kotak) dan Isi** ($a \times b = a$ wadah berisi $b$ benda) tanpa hafalan buta.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Layar perahu Yunani berkibar di pelabuhan Crotone. Kepiting mutan bercapit perunggu merayap memecahkan peti kayu pedagang._  
  > **Omega:** "Ksatria! Peti buah zaitunku dihancurkan monster! Bagaimana menghitung sisa barang ini tanpa sempoa kayu?"  
  > **Ksatria Gaber:** "Tenang, Omega! Lihat 3 peti kayu ini. Masing-masing peti berisi 4 botol minyak zaitun. Perkalian $3 \times 4$ hakikatnya adalah 3 wadah berisi masing-masing 4 benda ($4 + 4 + 4 = 12$)! Perkalian adalah pengelompokan yang adil!"  
  > **Omega:** "Aku mengerti! 3 kelompok dari 4 benda adalah 12! Tembakan ketapel zaitun tepat mengenai titik lemah capit monster!"
- **Gameplay & Rintangan:** Mempertahankan gerbang benteng Le Castella dari serbuan Mutant Kepiting di 3 jalur (Tower Defense).
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal konsep wadah & isi faktor 1, 2, 3).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal konsep perkalian konkret faktor 4, 5).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal visualisasi perkalian konkret campur).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Hakikat Wadah dan Isi:** Perkalian $a \times b$ dibaca: "$a$ kelompok/wadah, masing-masing berisi $b$ benda". Secara konkret $3 \times 4$ (3 kotak isi 4 apel) berbeda maknanya dengan $4 \times 3$ (4 kotak isi 3 apel) meskipun hasil akhirnya sama-sama 12!

---

#### 📜 Level 2 (Bab II): _The Village of Numbers_ — Lembah Perguruan Pythagoras & Perkalian 1–10
- **Latar:** Perguruan Matematika Lembah Zaitun & Altar Simbol Angka Crotone.
- **Sinopsis Cerita:** Gaber dan filsuf Sigma (ayah Omega) tiba di perguruan Pythagoras. Wizard Mutant Harpy menyerang dengan semburan api. Untuk menyalakan meriam pertahanan, murid perguruan harus mencongak perkalian 1 sampai 10 secara refleks dengan trik Pasangan 10 dan sifat simetri komutatif.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Pilar marmer putih berdiri anggun di kebun pohon zaitun. Di langit, kawanan monster Harpy bersayap api menukik tajam._  
  > **Sigma (Filsuf Crotone):** "Perguruan kami menolak hafalan buta! Mutan bergerak terlalu cepat untuk sempoa!"  
  > **Ksatria Gaber:** "Gunakan trik perkalian GASING! Perkalian 9 menggunakan Pasangan 10: digit depan berkurang 1, digit belakang adalah pasangan 10-nya ($9 \times 7 \rightarrow 63$). Untuk perkalian 5, kalikan separuhnya lalu kali 10!"  
  > **Theano (Filsuf Wanita):** "Luar biasa! Seluruh murid menjawab secepat kilat! Meriam pertahanan perguruan berhasil menghalau kawanan Harpy!"
- **Gameplay & Rintangan:** Tower Defense melawan kawanan monster terbang Harpy dan proyektil bola api (menepis dengan Jam Ajaib `C`).
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal perkalian dasar faktor 2, 5, 10).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal perkalian faktor 3, 4, 9 via Pasangan 10).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal perkalian dasar faktor 6, 7, 8 acak).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Trik Perkalian 9 via Pasangan 10:** Untuk $9 \times n$, digit puluhan adalah $(n - 1)$, digit satuan adalah Pasangan 10 dari $n$ ($9 \times 8 \rightarrow$ puluhan 7, satuan pasangan 8 yaitu 2 $\rightarrow 72$).
  - **Sifat Simetri Komutatif:** Jika sudah tahu $6 \times 8 = 48$, maka $8 \times 6$ otomatis 48. Cukup kuasai setengah dari tabel perkalian!

---

#### 📜 Level 3 (Bab III): _The Secret Mission_ — Pertahanan Lembah: Perkalian 2 Angka dengan 1 Angka
- **Latar:** Ngarai Cadas Crotone & Menara Pengawas Perbatasan.
- **Sinopsis Cerita:** Pasukan Golem Lapis Baja mutan menyerbu menara perbatasan membawa soal perkalian 2 angka dengan 1 angka ($64 \times 7$). Gaber mendemonstrasikan metode perkalian GASING dari kiri ke kanan.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Batu tebing ngarai berguncang saat kawanan Golem Lapis Baja berbaris mendekati menara benteng._  
  > **Sigma:** "Ksatria Gaber! Monster ini membawa angka besar: $64 \times 7$! Jika menghitung susun ke bawah dari belakang, benteng keburu roboh!"  
  > **Ksatria Gaber:** "Kalikan dari depan, Sigma! $64 \times 7$: Puluhan $60 \times 7 = 420$. Satuan $4 \times 7 = 28$. Gabungkan di kepala: $420 + 28 = 448$! Langsung tembakkan balista!"  
  > **Sigma:** "Tepat sasaran! Golem hancur berkeping-keping! Metode dari depan ini luar biasa cepat!"
- **Gameplay & Rintangan:** Menahan laju Golem Lapis Baja dan membasmi anak mutan pecah menggunakan Senter Ajaib `F`.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal puluhan bulat $\times$ satuan: $40 \times 6$).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal 2-digit $\times$ 1-digit tanpa simpanan besar).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal 2-digit $\times$ 1-digit campuran).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Kalikan dari Depan (Kiri ke Kanan):** Urai bilangan menjadi puluhan dan satuan: $(a0 + b) \times c = (a0 \times c) + (b \times c)$. Contoh $34 \times 6 = (30 \times 6) + (4 \times 6) = 180 + 24 = 204$.

---

#### 📜 Level 4 (Bab IV): _The Math Traveler_ — Pelayaran ke Samos: Perkalian 2 Angka dengan 2 Angka
- **Latar:** Dek Kapal Tempur Trireme di Laut Aegea & Badai Ombak Topan.
- **Sinopsis Cerita:** Berlayar menuju Pulau Samos, kapal Gaber, Sigma, dan Omega dikepung kapal bajak laut mutan Blaze. Sistem katrol meriam kapal membutuhkan kalkulasi perkalian 2 angka dengan 2 angka ($23 \times 14$). Gaber mengajarkan **Metode Bintang / Silang Mendatar** GASING.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Gelombang ombak tiga meter menghantam lambung kapal Trireme. Kilat menyambar menerangi bendera bajak laut mutan._  
  > **Omega:** "Kapal musuh mengepung kita! Meriam meminta jawaban $23 \times 14$ untuk mengunci sasaran!"  
  > **Ksatria Gaber:** "Gunakan Metode Bintang Silang GASING!  
  > 1) Depan $\times$ Depan: $2 \times 1 = 2$ ($200$).  
  > 2) Silang Tengah: $(2 \times 4) + (3 \times 1) = 8 + 3 = 11$ ($110$).  
  > 3) Belakang $\times$ Belakang: $3 \times 4 = 12$.  
  > Jumlahkan di kepala: $200 + 110 + 12 = 322$!"  
  > **Sigma:** "Tembakan meriam tepat sasaran! Kapal perompak mutan tenggelam!"
- **Gameplay & Rintangan:** Menangkis tembakan panah api dari kapal bajak laut dan menjaga kestabilan dek kapal di tengah badai ombak.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal belasan $\times$ belasan: $11\text{--}19$).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal 2-digit faktor puluhan mudah).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal 2-digit $\times$ 2-digit umum).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Metode Bintang / Silang:** Untuk $AB \times CD$: (1) $A \times C$, (2) $(A \times D) + (B \times C)$, (3) $B \times D$.
  - **Trik Belasan (11–19):** $14 \times 13 = (14 + 3) \times 10 + (4 \times 3) = 170 + 12 = 182$ dalam 2 detik!

---

#### 📜 Level 5 (Bab V): _The Prison of Babylon / Crotone_ — Lorong Penjara & Perkalian 3 Angka
- **Latar:** Benteng Penjara Bawah Tanah Crotone & Jeruji Besi Bersegel Angka.
- **Sinopsis Cerita:** Master Pythagoras disekap di benteng penjara bawah tanah. Jeruji besi dialiri medan sihir yang hanya padam dengan perkalian bilangan 3 angka ($423 \times 5$). Gaber memimpin misi penerobosan dengan perkalian ratusan berantai dari kiri ke kanan.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Tetesan air menggema di lorong batu penjara bawah tanah yang remang-remang diterangi obor minyak._  
  > **Pythagoras:** "Ksatria Gaber... medan sihir jeruji ini mengunci energiku dengan perkalian ratusan yang sangat padat!"  
  > **Ksatria Gaber:** "Metode GASING menembus ratusan dengan mudah, Master! $423 \times 5$: Ratusan $400 \times 5 = 2.000$. Puluhan $20 \times 5 = 100$ (jadi $2.100$). Satuan $3 \times 5 = 15$. Hasil langsung terbaca: 2.115!"  
  > **Pythagoras:** "Jeruji besi terbuka! Pengetahuan matematika telah mematahkan belenggu tirani!"
- **Gameplay & Rintangan:** Bertarung di koridor sempit penjara, menangkis semburan gas beracun dan Monster Laba-Laba Raksasa.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal ratusan $\times$ satuan mudah: faktor 2, 3, 5).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal ratusan $\times$ satuan sulit: faktor 6, 7, 8, 9).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal ratusan $\times$ 1-digit lirik ganda).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Alur Akumulasi Kiri ke Kanan:** Kalikan ratusan $\rightarrow$ kalikan puluhan $\rightarrow$ kalikan satuan. Akumulasikan hasil perolehan secara mencongak tanpa mencatat di kertas.

---

#### 📜 Level 6 (Bab VI): _The Hometown of Math_ — Altar Kuil Pythagoras di Samos & Fragmen ke-3
- **Latar:** Altar Puncak Kuil Segitiga Suci Pulau Samos & Tebing Laut Mediterania.
- **Sinopsis Cerita:** Tiba di kuil puncak Samos, altar Fragmen ke-3 dijaga Boss Titan Baja Berkepala Tiga. Master Pythagoras dan Gaber menyatukan kekuatan perkalian bilangan besar multi-digit melalui dekomposisi nilai tempat untuk menghancurkan perisai titan dan merebut Fragmen ke-3!
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Di puncak bukit Samos berlatar laut biru Mediterania, altar marmer segi delapan memancarkan pendar cahaya keemasan._  
  > **Master Pythagoras:** "Inilah Altar Tetraktys! Namun Titan Baja Berkepala Tiga mengunci altar dengan sandi ribuan!"  
  > **Ksatria Gaber:** "Pecah faktor perkalian banyak angka dengan dekomposisi nilai tempat GASING! Tiap digit terurai harmonis dari kiri ke kanan!"  
  > **Master Pythagoras:** "Perisai titan hancur lebur! Terimalah Fragmen ke-3 Sacred Octagon ini, Ksatria Gaber!"
- **Gameplay & Rintangan:** Boss Battle melawan Titan Berkepala Tiga, gempa runtuhan pilar kuil, dan sambaran petir.
- **Aturan Skor:**
  - **Gelombang 1:** Maksimal 100 Poin (10 soal perkalian 4-digit ribuan $\times$ 1-digit).
  - **Gelombang 2:** Maksimal 150 Poin (8 soal perkalian 3-digit $\times$ 2-digit).
  - **Gelombang 3:** Maksimal 250 Poin (6 soal perkalian bilangan multi-digit masif).
  - **Total:** Maksimal 500 Poin (+ Bonus Kecepatan).
- **Tips & Trik GASING (Pedagogi):**
  - **Dekomposisi Bilangan Besar:** Sederhanakan perkalian bilangan besar dengan sifat distributif: $(A + B) \times C = (A \times C) + (B \times C)$. Pecah ribuan, ratusan, dan puluhan secara teratur.

---

## 🏛️ ZONA 4: _The Forbidden Number_ (Pengurangan & Konsep Angka Nol Śūnya)
**Latar Utama:** Peradaban India Kuno (1206 M) Universitas Nalanda, Sumur Berundak Chand Baori, Menara Qutub Minar, Taj Mahal (1653 M), & Kuil Prasasti Nol Gwalior  
**Misi Utama:** Mengubah pengurangan rumit menjadi penjumlahan kilat via Pasangan 10 & Lirik Kanan (tanpa hitung mundur), menyingkap rahasia angka nol Śūnya, serta merebut **Fragmen ke-4 Sacred Octagon**.

---

#### 📜 Level 1 (Bab I): _The Ruin of Nalanda_ — Reruntuhan Universitas Nalanda & Pencopet Pasar
- **Latar:** Pasar Tradisional & Tangga Reruntuhan Universitas Nalanda, Bihar (1206 M).
- **Sinopsis Cerita:** Gaber melerai pemuda berpedang Fadil yang menuduh anak kecil Hasan mencopet tas Sacred Octagon. Hasan terpaksa mencuri demi obat ayahnya. Gaber menolong Hasan, namun gerombolan mutant tiba-tiba menculik Fadil ke puncak reruntuhan tangga batu Nalanda.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Asap tebal membubung di antara reruntuhan perpustakaan bata merah Nalanda. Hasan menangis memeluk tas tua berlogo segi delapan._  
  > **Hasan:** "Tolong! Kakak Fadil diculik monster ke puncak tangga batu Nalanda karena melindungi naskah Guru Arya!"  
  > **Fadil (Terbelenggu di Puncak):** "Ksatria! Jangan biarkan mutant merebut petunjuk rahasia Sacred Octagon!"  
  > **Ksatria Gaber:** "Bertahanlah, Fadil! Dengan konsep pengurangan dasar GASING (mengambil konkret, bukan menghitung mundur), aku akan memanjat tangga batu ini dan membebaskanmu!"
- **Gameplay & Rintangan:** Memanjat tangga batu reruntuhan Nalanda sambil menangkis lemparan bata merah dari Wizard Mutant.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal pengurangan dasar $\le 5$); Gelombang 2 (150 Poin / 8 soal pengurangan konkret $5 - n$); Gelombang 3 (250 Poin / 6 soal mencongak pengurangan dasar). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **PANTANGAN MUTLAK GASING: Jangan Menghitung Mundur!** Pengurangan diartikan sebagai mengambil sebagian benda secara konkret atau mencari selisih langsung. Menghitung mundur dengan jari membuat siswa lambat dan rentan salah!

---

#### 📜 Level 2 (Bab II): _The Caves of Maharashtra_ — Pelarian Shunya di Lorong Gua Gelap
- **Latar:** Desa Pertanian Membara & Lorong Bertingkat Gua Maharashtra.
- **Sinopsis Cerita:** Gaber dan Fadil mencari Shunya (cucu Guru Arya sang penjaga rahasia angka nol). Kepala Desa Rohan Laghari mengabarkan Shunya terdesak ke lorong gua bertingkat karena diburu mutant obor api. Gaber mengajarkan teknik mengubah pengurangan menjadi penjumlahan via Pasangan 10.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Tetesan stalaktit bersahutan dengan derak obor api mutan di lorong gelap bertingkat dinding batu Maharashtra._  
  > **Rohan Laghari:** "Ksatria! Shunya terdesak ke puncak undakan goa! Mutan hendak membakar gulungan angka nol kakeknya!"  
  > **Shunya (Di Puncak Goa):** "Fadil! Ksatria! Mutan-mutan ini membawa soal pengurangan belasan yang rumit!"  
  > **Ksatria Gaber:** "Ubah pengurangan menjadi penjumlahan, Shunya! $12 - 7$: Pecah 12 jadi 10 dan 2. $10 - 7 = 3$ (Pasangan 7 adalah 3). Tambahkan sisa satuan: $3 + 2 = 5$! Langsung terjawab: 5!"  
  > **Shunya:** "Luar biasa! Pengurangan belasan lenyap berganti penjumlahan kilat!"
- **Gameplay & Rintangan:** Memanjat tangga gua di tengah kobaran api jerami dan Piko Mutant pelompat tebing.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal $10 - n$); Gelombang 2 (150 Poin / 8 soal pengurangan belasan $11\text{--}18$ via Pasangan 10); Gelombang 3 (250 Poin / 6 soal pengurangan 1 angka campur). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Ubah Menjadi Penjumlahan via Pasangan 10:** Untuk $13 - 8$: ambil 10 dikurangi 8 menghasilkan 2 (Pasangan 8), lalu tambahkan dengan 3 sisa satuannya $\rightarrow 2 + 3 = 5$. Tanpa menghafal tabel pengurangan!

---

#### 📜 Level 3 (Bab III): _The Stepwell of Gujarat_ — Air Bah di Sumur Berundak Chand Baori
- **Latar:** Kuil Air & 3.500 Anak Tangga Geometris Sumur Berundak Chand Baori, Gujarat.
- **Sinopsis Cerita:** Shunya mengamankan guci petunjuk kakeknya di dasar sumur. Kawanan Wizard Mutant Lele menyumbat saluran air, menaikkan air bah untuk menenggelamkan guci. Gaber memanjat undakan tangga di tengah naiknya air bah menggunakan **Lirik Kanan** 2 angka dengan 1 angka.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Pola simetris ribuan anak tangga Chand Baori perlahan terendam air bah kehijauan yang meluap dari saluran bawah tanah._  
  > **Petapa Bijak:** "Selamatkan guci petunjuk kakek Shunya sebelum air bah menenggelamkan seluruh tangga kuil!"  
  > **Fadil:** "Permukaan air naik semakin cepat! Soal pada mutan: $43 - 8$!"  
  > **Ksatria Gaber:** "Lirik kanan pada satuan! $3 < 8$, maka puluhan berkurang 1 ($4 - 1 = 3$). Satuan hasil = Satuan Atas + Pasangan 10 Satuan Bawah ($3 + 2 = 5$). Hasil mencongak seketika: 35!"  
  > **Fadil:** "Tangga batu berhasil kita panjat sebelum air bah menenggelamkan guci petunjuk!"
- **Gameplay & Rintangan:** Memanjat 25 anak tangga batu geometris mendahului naiknya air bah dan menepis racun mutan lele.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal pengurangan 2-digit tanpa pinjam/lirik); Gelombang 2 (150 Poin / 8 soal 2-digit dengan teknik Lirik Kanan); Gelombang 3 (250 Poin / 6 soal 2-digit dikurangi 1-digit campur). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Rumus Emas Lirik Kanan Pengurangan:** Lirik angka satuan di sebelah kanan: jika satuan atas $<$ satuan bawah, maka **Puluhan dikurangi 1**, dan **Satuan Hasil = Satuan Atas + Pasangan 10 Satuan Bawah**. Contoh: $43 - 8 \rightarrow$ puluhan jadi 3, satuan $3 + 2 = 5 \rightarrow 35$.

---

#### 📜 Level 4 (Bab IV): _The Tower of Victory_ — Pengepungan Menara Qutub Minar di Delhi
- **Latar:** Pelataran Bata Merah & Tangga Spiral Menara Qutub Minar (73 Meter).
- **Sinopsis Cerita:** Pasukan serigala mutant pemanah api mengepung menara kemenangan. Gulungan pesan darurat yang ditinggalkan Shunya berada di balkon tertinggi menara. Gaber memimpin pendakian tangga spiral dengan teknik pengurangan 2 angka dengan 2 angka dari depan.
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Hujan panah api menerangi dinding batu pasir merah menara Qutub Minar yang menjulang ke langit malam._  
  > **Sultan Delhi:** "Menara kemenangan ini dibangun dengan kalkulasi arsitektur Guru Arya! Mutan hendak membakar gulungan di balkon atas!"  
  > **Fadil:** "Soal di pintu tangga: $73 - 38$!"  
  > **Ksatria Gaber:** "Kerjakan dari puluhan paling depan! Lirik satuan: $3 < 8$, maka puluhan $7 - 3 - 1 = 3$. Satuan hasil: $3 + \text{Pasangan } 8 \text{ (yaitu } 2) = 5$. Hasil kilat: 35!"  
  > **Sultan Delhi:** "Pintu balkon terbuka! Gulungan pesan darurat terselamatkan!"
- **Gameplay & Rintangan:** Memanjat tangga spiral menara sambil menghindari rontokan batu dan panah api musuh.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal 2-digit dengan 2-digit tanpa lirik); Gelombang 2 (150 Poin / 8 soal 2-digit dengan 2-digit lirik kanan); Gelombang 3 (250 Poin / 6 soal 2-digit bersusun campuran). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Pengurangan 2-Digit dari Depan:** Kurangkan puluhan atas dengan puluhan bawah. Jika kolom satuan di kanannya butuh bantuan ($A_{\text{satuan}} < B_{\text{satuan}}$), kurangkan puluhan tersebut dengan 1 lagi. Kolom satuan langsung dijumlahkan dengan pasangan 10 bawah.

---

#### 📜 Level 5 (Bab V): _The Palace of Love_ — Panah Beracun di Kubah Marmer Taj Mahal (1653 M)
- **Latar:** Pelataran Marmer Putih & Kubah Megah Taj Mahal, Agra (Anomali Dimensi Waktu).
- **Sinopsis Cerita:** Terlempar ke tahun 1653, arsitek Ahmad Lahauri mengabarkan Shunya baru saja diculik. Dalam penyergapan, anak panah beracun menancap di bahu Fadil! Gaber menggendong Fadil menaiki tangga balkon marmer menuju ruang obat sambil menuntaskan pengurangan 3 angka ($524 - 168$).
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Marmer putih berkilau di bawah sinar bulan. Fadil terhuyung menahan racun gelap yang menjalar di lengannya._  
  > **Ustad Ahmad Lahauri:** "Pangeran Fadil terluka parah! Cepat bawa dia ke ruang obat di kubah atas sebelum racun melumpuhkan jantungnya!"  
  > **Fadil:** "Gaber... jangan pedulikan aku... selamatkan Shunya di Kuil Gwalior..."  
  > **Ksatria Gaber:** "Aku tidak akan meninggalkanmu! Pengurangan 3 angka GASING dikerjakan dari ratusan: $524 - 168$. Ratusan $5 - 1 - 1 = 3$. Puluhan $2 + 4 - 1 = 5$. Satuan $4 + 2 = 6$. Hasil seketika: 356!"  
  > **Ustad Ahmad Lahauri:** "Obat penawar berhasil dijangkau! Racun dinetralkan!"
- **Gameplay & Rintangan:** Menggendong Fadil menaiki tangga marmer sambil menembakkan laser penawar ke arah Wizard Mutant beracun.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal pengurangan ratusan tanpa lirik); Gelombang 2 (150 Poin / 8 soal pengurangan ratusan lirik tunggal); Gelombang 3 (250 Poin / 6 soal pengurangan ratusan lirik ganda). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Lirik Kanan Berantai 3-Digit:** Kerjakan ratusan $\rightarrow$ puluhan $\rightarrow$ satuan dari kiri ke kanan. Semua kolom yang kurang langsung diselesaikan dengan menjumlahkan pasangan 10 tanpa coretan kertas.

---

#### 📜 Level 6 (Bab VI): _The Forbidden Number_ — Prasasti Angka Nol di Kuil Kuno Gwalior & Fragmen ke-4
- **Latar:** Ruang Altar Bawah Tanah Kuil Kuno Gwalior (Prasasti Angka Nol Pertama di Dunia).
- **Sinopsis Cerita:** Gaber membawa Fadil tiba di Kuil Gwalior. Shunya menyambut dengan pedang sebelum kesalahpahaman diluruskan. Shunya menunjukkan dinding prasasti angka nol suci (_Śūnya_). Monster kutukan memasang kutukan pengurangan bilangan ribuan berangka nol ($5.000 - 2.478$). Gaber menuntaskannya dengan **Rahasia Pasangan 9 dan Pasangan 10 Śūnya**, membuka gerbang dimensi, dan merebut Fragmen ke-4 Sacred Octagon!
- **Kutipan Dialog Teater (Modal Cerita):**
  > _Di dinding batu basalt kuno Gwalior, lingkaran kecil angka nol terpahat anggun di antara deretan mantra matematika Sansekerta._  
  > **Shunya:** "Inilah Prasasti Śūnya kakekku! Namun monster Blaze memasang kutukan pengurangan ribuan berangka nol: $5.000 - 2.478$!"  
  > **Ksatria Gaber:** "Kuasai rahasia Śūnya GASING! Angka terdepan berkurang 1 ($5 - 1 = 4$). Kurangkan dari depan:  
  > Ribuan $4 - 2 = 2$.  
  > Ratusan gunakan Pasangan 9 ($9 - 4 = 5$).  
  > Puluhan gunakan Pasangan 9 ($9 - 7 = 2$).  
  > Satuan paling ujung gunakan Pasangan 10 ($10 - 8 = 2$).  
  > Hasil langsung terbaca: 2.522!"  
  > **Shunya:** "Prasasti bersinar emas! Angka nol bukanlah ketiadaan, melainkan pemegang nilai tempat peradaban! Terimalah Fragmen ke-4 Sacred Octagon ini, Ksatria!"
- **Gameplay & Rintangan:** Menangkis runtuhan batu obsidian terkutuk dan membasmi Titan Bayangan penjaga altar prasasti.
- **Aturan Skor:** Gelombang 1 (100 Poin / 10 soal ratusan berangka nol: $500 - 234$); Gelombang 2 (150 Poin / 8 soal ribuan berangka nol: $4.000 - 1.625$); Gelombang 3 (250 Poin / 6 soal puluhan ribu berangka nol komprehensif). Total 500 Poin.
- **Tips & Trik GASING (Pedagogi):**
  - **Trik Emas Śūnya (Semua Pasangan 9, Ujung Pasangan 10):** Untuk pengurangan bilangan kelipatan nol ($N.000 - ABC$):  
    1. Digit terdepan kurangi 1 ($N - 1$).  
    2. Semua digit tengah di atas angka nol gunakan **Pasangan 9** ($9 - \text{angka}$).  
    3. Digit satuan paling akhir gunakan **Pasangan 10** ($10 - \text{angka}$).  
    *Hasilnya seketika keluar dalam 2 detik tanpa pusing meminjam beruntun!*

---

# 🚀 Roadmap Eksekusi Sprint yang Dirapikan (Lean, Fast, Zero Overhead)

Dengan dikeluarkannya **Zona 2** dan **Zona 5** dari daftar pekerjaan baru (karena sudah live di production), cakupan sprint menjadi sangat terfokus dan efisien:

```
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 1: Integrasi & Registri Cerita Zona 1 (Mengenal Bilangan)        │
│ - Pulihkan scratch/zone1-backup/ ke web/src/lib/engines/zone1/         │
│   (zone1StoryRegistry.ts < 300 LOC & Zone1HelpModals.astro < 450 LOC)   │
│ - Sambungkan ke [gameKey].astro untuk Z1L1 s.d. Z1L6                    │
│ - Unit Test (zone1StoryRegistry.test.ts) & Byte-Lock Check (371 files)  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 2: Pembangunan zone3StoryRegistry & Upgrade Modals Zona 3       │
│ - Buat web/src/lib/engines/zone3/zone3StoryRegistry.ts (< 300 LOC)     │
│ - Upgrade Zone3HelpModals.astro agar merender Bab 1–6 Crotone/Pythagoras│
│ - Terapkan dialog teater, tips Wadah & Isi, Bintang Silang, & Skor Baku │
│ - Unit Test (zone3StoryRegistry.test.ts) & Byte-Lock Check (371 files)  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 3: Sinkronisasi Cerita & Tips Śūnya Zona 4 (Pengurangan)        │
│ - Sesuaikan zone4StoryRegistry.ts & Zone4HelpModals.astro (< 450 LOC)  │
│ - Terapkan dialog teater Nalanda/Gwalior & Trik Emas Pasangan 9 & 10   │
│ - Unit Test (zone4StoryRegistry.test.ts) & Byte-Lock Check (371 files)  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 4: Cross-Zone Quality Gate, Paritas UI/HUD, & Rilis Bersih      │
│ - Verifikasi konsistensi 3 tombol HUD ([📜 CERITA], [⭐ SKOR], [💡 TIPS]) │
│   di seluruh Zona 1, Zona 2, Zona 3, Zona 4, dan Zona 5                │
│ - Jalankan Full Test Suite: npm run test:unit, oxlint (0 errors)       │
│ - Jalankan npm run guard:game-lock (371/371 game files locked)         │
│ - Dokumentasikan laporan harian di kerjaYS/ dan commit & push bersih   │
└────────────────────────────────────────────────────────────────────────┘
```

### Rincian Per Sprint:

1. **Sprint 1 (Zona 1 — Mengenal Bilangan & Nilai Tempat):**
   - **Target Berkas:**
     - [`web/src/lib/engines/zone1/zone1StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone1/zone1StoryRegistry.ts) (< 300 LOC)
     - [`web/src/components/engines/zone1/Zone1HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone1/Zone1HelpModals.astro) (< 450 LOC)
     - Sambungkan ke [`web/src/pages/game/[gameKey].astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/pages/game/[gameKey].astro)
   - **Testing:** `web/tests/unit/zone1StoryRegistry.test.ts` (100% pass) + `guard:game-lock` (371 files locked).

2. **Sprint 2 (Zona 3 — Perkalian / Mazhab Pythagoras):**
   - **Target Berkas:**
     - [`web/src/lib/engines/zone3/zone3StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone3/zone3StoryRegistry.ts) (< 300 LOC)
     - Upgrade [`web/src/components/engines/zone3/Zone3HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone3/Zone3HelpModals.astro) (< 450 LOC)
   - **Testing:** `web/tests/unit/zone3StoryRegistry.test.ts` (100% pass) + `guard:game-lock` (371 files locked).

3. **Sprint 3 (Zona 4 — Pengurangan & Konsep Nol Śūnya):**
   - **Target Berkas:**
     - Sinkronisasi teks dialog & tips Śūnya pada [`web/src/lib/engines/zone4/zone4StoryRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/zone4/zone4StoryRegistry.ts) (< 300 LOC) dan [`web/src/components/engines/zone4/Zone4HelpModals.astro`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/components/engines/zone4/Zone4HelpModals.astro) (< 450 LOC)
   - **Testing:** `web/tests/unit/zone4StoryRegistry.test.ts` (100% pass) + `guard:game-lock` (371 files locked).

4. **Sprint 4 (Harmonisasi Lintas Zona & Rilis Final):**
   - Validasi SSOT [`bertualangLevelRulesRegistry.ts`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/web/src/lib/engines/shared/bertualangLevelRulesRegistry.ts) untuk seluruh Zona 1 s.d. Zona 5.
   - Audit `npm run guard:game-lock` (wajib 371 files 100% locked).
   - Audit `npx oxlint` (0 warning, 0 error).
   - Catat laporan harian di `kerjaYS/` dan push bersih ke `origin/main-bf`.

---

Rencana ini sudah bersih dari tumpang tindih, patuh pada batasan ukuran modularitas (< 300 LOC & < 450 LOC), mematuhi mandat pedagogis Prof. Yohanes Surya, dan siap dieksekusi secara bertahap. Apakah kita langsung mulai dengan **Sprint 1 (Integrasi Zona 1)**?