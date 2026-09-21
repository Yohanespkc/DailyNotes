Saya cari dulu proyek-proyek yang relevan di GitHub dan konteks kebutuhan OJK terkini.Saya cari berdasarkan dua hal: apa yang sedang jadi prioritas OJK sekarang, dan apa yang sudah ada di GitHub dan bisa di-_fork_ / dipasang on-prem.

## Titik masuk yang paling jelas di OJK saat ini

Dua sinyal kebijakan yang relevan langsung dengan rencana Bapak:

- Di PTIJK Februari 2026, OJK menyatakan akan memperkuat infrastruktur pengawasan dan pelaporan melalui pengembangan sistem pengawasan terintegrasi berbasis teknologi seperti Artificial Intelligence, serta menyusun Cetak Biru (Blueprint) SupTech. Artinya OJK sedang _menyusun_ blueprint-nya — waktu yang tepat untuk menawarkan arsitektur referensi.
- Sisi penindakan sedang kewalahan secara volume: data IASC per Juni 2026 mencatat lebih dari 608 ribu kasus penipuan, 557 ribu rekening diblokir, Rp674 miliar dana diamankan, dan sampai 30 Juli 2026 Satgas PASTI menghentikan 951 entitas pinjol ilegal, 241 investasi ilegal, dari 25.729 pengaduan. Semua itu masih sangat padat kerja manual — klasifikasi aduan, penelusuran rekening, penyusunan berkas.

Ditambah beban baru: pengawasan aset kripto resmi beralih dari Bappebti ke OJK sejak Januari 2025, dan pelaku memanfaatkan AI dan aset kripto untuk menyamarkan identitas serta mengalihkan dana kejahatan.

## Proyek GitHub yang layak jadi fondasi

**1. Tazama — `github.com/tazama-lf`** (Apache-2.0)  
Ini kandidat terkuat. Platform open source fraud transaction monitoring yang dirancang untuk institusi keuangan, operator pembayaran, bank sentral, dan regulator, dikelola Linux Foundation Charities dengan dana Gates Foundation, dan sudah berstatus Digital Public Good. Arsitekturnya mikroservis, ISO 20022, rule processor + typology scoring, case management, dan deployment on-premise via Helm. Versi 4.0 (Juli 2026) sudah mencakup siklus penuh fraud management: deteksi, investigasi, respons. Yang penting untuk argumen sovereign Bapak: institusi bisa men-deploy Tazama secara modular sambil menjaga privasi, kedaulatan data, dan akuntabilitas regulatoris.

**2. Marble — `github.com/checkmarble/marble`**  
Alternatif fleksibel untuk Comply Advantage/Actimize/Fiserv, dengan core open source yang bisa di-deploy on-premise, sudah dipakai 100+ fintech, bank, dan bursa kripto di 15+ negara. Rule builder-nya ramah untuk analis non-programmer — cocok untuk pengawas OJK. Catatan: lisensinya Elastic License v2, bukan open source murni, jadi perlu dicek untuk proyek pemerintah.

**3. OpenAleph — `github.com/openaleph/openaleph`**  
Untuk sisi investigasi Satgas PASTI. Mengindeks dokumen tak terstruktur (PDF, Word, HTML) dan data terstruktur (CSV, XLS, SQL), dengan cross-referencing entitas lintas dataset, berbasis skema FollowTheMoney, dan bisa di-deploy lokal dengan Docker. Penting: tidak bergantung pada Google, Amazon, atau penyedia big tech lain kecuali Anda memang menginginkannya. Pipeline-nya sudah termasuk OCR dan transkripsi audio/video — relevan untuk bukti aduan.

**4. Arelle — `github.com/arelle/arelle`**  
Untuk sisi pelaporan. Mesin validasi XBRL open source, bersertifikat Validating Processor dari XBRL International, dengan Python API dan web service, dan dipakai lebih dari 50 regulator global. OJK sudah pakai XBRL untuk pelaporan LJK, jadi ini jalur integrasi yang paling mulus.

**5. Pendukung:** `opensanctions/yente` (mesin screening sanksi/PEP self-hosted), IBM AMLSim (generator data transaksi sintetis dengan tipologi pencucian uang — penting karena Bapak tidak akan dapat data asli OJK di awal), dan dua daftar kurasi: `AI4Risk/awesome-graph-based-fraud-detection` serta `ishandutha2007/Awesome-Transaction-Monitoring`.

## Lapisan AI lokal (sovereign)

Untuk bagian LLM-nya: : Qwen 3  Serving pakai vLLM, parsing dokumen pakai Docling, orkestrasi RAG pakai RAGFlow — semuanya jalan di GPU on-prem, nol data keluar.

## Tiga kandidat proyek konkret

**A. SupTech Aduan Engine (paling cepat memberi bukti nilai).** Klasifikasi + deduplikasi + triase otomatis 25 ribu+ pengaduan entitas ilegal per tahun, ekstraksi entitas (nama platform, rekening, nomor HP, URL) ke graf FollowTheMoney, lalu clustering untuk menemukan satu sindikat di balik 50 aplikasi berbeda. Stack: OpenAleph + LLM lokal + Docling. Bisa jalan dengan data publik siaran pers Satgas PASTI sebagai PoC — tanpa perlu izin data OJK dulu.

**B. Reference Implementation SupTech Nasional.** Fork Tazama, lokalkan ke konteks Indonesia (adapter BI-FAST/QRIS, tipologi scam lokal: click-to-earn, impersonation entitas berizin, MLM kripto), jadikan kontribusi upstream. Ini yang paling nyambung dengan Blueprint SupTech yang sedang disusun OJK, dan posisinya kuat: Indonesia bukan hanya pengguna DPG, tapi kontributor.

**C. Regulatory Copilot.** RAG di atas seluruh POJK/SEOJK/PADK dengan sitasi pasal wajib dan _zero_ jawaban tanpa sumber. Paling mudah dibangun, tapi paling mudah pula ditiru — nilai jualnya ada di kualitas korpus dan evaluasi, bukan teknologinya.

Saran saya: mulai dari **A**, karena bisa didemokan dalam 6–8 minggu dengan data publik, langsung menyentuh rasa sakit yang nyata, dan menjadi pintu masuk ke B yang skalanya jauh lebih besar.


---

## FASE 0 — Sebelum menemui OJK (3–4 minggu)

Jangan datang membawa slide. Datang membawa layar yang jalan. Ini pembeda terbesar.

**Langkah 1. Rakit tulang punggung.** Fork `tazama-lf/tazama`, jalankan dengan Docker Compose di lab INA AI. Beri makan dataset sintetis IBM AML (HI-Small) — dataset ini sudah berlabel pencucian uang per transaksi, jadi Bapak bisa menunjukkan deteksi berjalan tanpa pernah menyentuh data nasabah. Ini poin politis penting: **PoC berjalan nol data OJK.**

**Langkah 2. Pasang lapisan investigasi.** Deploy `openaleph/openaleph` via Docker. Masukkan seluruh siaran pers Satgas PASTI dan daftar entitas ilegal OJK (semuanya publik). Jalankan cross-referencing entitas. Hasil yang Bapak cari: bukti bahwa 951 entitas pinjol ilegal itu sebenarnya bertumpu pada segelintir sindikat yang sama — berbagi nomor HP, rekening penampung, atau pola nama aplikasi.

**Langkah 3. Pasang lapisan AI lokal.** Urutannya:

- `vLLM` sebagai serving engine → Qwen 3 (reasoning) + Sahabat-AI/SEA-LION (bahasa & dialek)
- `LazarusNLP/all-indo-e5-small-v4` untuk embedding
- `PaddlePaddle/PaddleOCR-VL` (mode tabel) untuk laporan keuangan; `rednote-hilab/dots.ocr` untuk scan sulit
- `cahya/whisper-medium-id` untuk transkrip rekaman aduan
- SEA-Guard sebagai guardrail
- Semua di satu server GPU on-prem. **Cabut kabel internet saat demo.** Itu bukti sovereignty yang tidak bisa dibantah.

**Langkah 4. Bangun OJK-Bench v0.** Ambil 200–300 pertanyaan regulasi dari POJK/SEOJK publik, dengan jawaban ber-sitasi pasal. Uji: GPT-5, Claude, Qwen, Sahabat-AI. Publikasikan hasilnya. Ini aset paling strategis Bapak — siapa yang memegang benchmark, memegang standar penilaian vendor.

**Langkah 5. Siapkan tiga skenario demo, masing-masing 3 menit:**

1. Aduan masuk (teks + voice note) → transkrip → klasifikasi → ekstraksi entitas → muncul di graf, ketahuan satu sindikat
2. Upload laporan keuangan PDF → tabel terekstrak → anomali rasio terdeteksi
3. Pertanyaan regulasi → jawaban dengan sitasi pasal + skor OJK-Bench di layar

---

## FASE 1 — Siapa yang ditemui dan apa yang disampaikan

**Tiga pintu masuk, prioritas dalam urutan ini:**

1. **Kepala Eksekutif IAKD, Adi Budiarso** — membawahi Inovasi Teknologi Sektor Keuangan, Aset Keuangan Digital, dan Aset Kripto. OJK ke depan akan mengembangkan kerangka regulasi adaptif berbasis risiko, memperkuat pengawasan berbasis teknologi dan ketahanan siber, sekaligus **mendorong pengembangan produk dan talenta digital dalam negeri** — kalimat terakhir itu persis pintu masuk Bapak.
2. **Kepala Eksekutif PEPK, Dicky Kartikoyono** — market conduct, pelindungan konsumen, Satgas PASTI. Ini yang merasakan sakitnya 25.729 pengaduan entitas ilegal.
3. **Tim penyusun Cetak Biru SupTech** — dan OJK Infinity / regulatory sandbox sebagai jalur uji coba formal.

**Lima pesan yang disampaikan, dalam urutan ini:**

**Pesan 1 — Kaitkan ke komitmen OJK sendiri, bukan ke produk Bapak.** "OJK menyatakan di PTIJK 2026 akan menyusun Cetak Biru SupTech dan sistem pengawasan terintegrasi berbasis AI. Kami datang membawa arsitektur referensi open source yang bisa mengisi cetak biru itu."

**Pesan 2 — Bingkai kedaulatan secara konkret, bukan slogan.** "Semua model berjalan di server OJK. Tidak ada satupun data pengaduan atau data nasabah yang keluar dari jaringan OJK. Demo ini saya jalankan tanpa koneksi internet."

**Pesan 3 — Tunjukkan bahwa ini sudah menjadi standar global, bukan eksperimen.** Tazama dikelola Linux Foundation Charities, didanai Gates Foundation, berstatus Digital Public Good, dan dirancang untuk bank sentral serta regulator. Arsitekturnya menekankan kedaulatan data, privasi, dan transparansi, sejalan dengan prioritas pemerintah. Posisikan Indonesia bukan sebagai pengguna, tapi **kontributor upstream**.

**Pesan 4 — Tawarkan benchmark lebih dulu, sistem belakangan.** "Sebelum OJK membeli sistem AI manapun, OJK perlu alat untuk mengujinya. Kami menawarkan OJK-Bench sebagai kontribusi terbuka." Ini permintaan yang hampir mustahil ditolak — biayanya nol bagi OJK, dan langsung menaikkan posisi tawar mereka terhadap vendor.

**Pesan 5 — Minta yang kecil.** Jangan minta anggaran atau data di pertemuan pertama. Minta: satu _sponsor_ di level departemen, akses ke sandbox, dan izin melanjutkan PoC dengan data sintetis. Anggaran menyusul setelah demo kedua.

---

## FASE 2 — Dokumen yang diserahkan

Maksimal 12 halaman, urutan ini:

1. Masalah dalam angka OJK sendiri (IASC, Satgas PASTI, beban pengawasan kripto pasca peralihan dari Bappebti)
2. Kesenjangan: proses masih padat kerja manual
3. Arsitektur referensi (satu diagram, GitHub + Hugging Face dipetakan per lapisan)
4. Bukti kedaulatan: tabel komponen → lisensi → lokasi eksekusi → aliran data
5. Tata kelola: audit trail, human-in-the-loop, explainability, model **tidak** berada di jalur keputusan penindakan
6. Roadmap 12 bulan
7. Yang kami minta sekarang (satu halaman, sangat spesifik)

---

## FASE 3 — Roadmap yang ditawarkan

|Bulan|Tahap|Data|Keluaran|
|---|---|---|---|
|1–3|PoC|Sintetis + publik|OJK-Bench v1, demo 3 skenario|
|4–6|Pilot terbatas|Data historis teranonimisasi, 1 departemen|Validasi akurasi vs analis manusia|
|7–9|Sandbox|Data nyata, lingkup terbatas|Audit keamanan, uji tata kelola|
|10–12|Produksi bertahap|Penuh|Serah terima + pelatihan internal OJK|

---

## Yang harus dihindari — ini sama pentingnya

- **Jangan janjikan angka akurasi sebelum diuji.** Regulator akan mengingat angka itu selamanya.
- **Jangan minta data nasabah di awal.** Permintaan itu bisa menghentikan pembicaraan sebelum dimulai.
- **Hati-hati lisensi Marble** — Elastic License v2, bukan open source murni, ada batasan penyediaan sebagai layanan terkelola. Untuk instansi negara ini harus diklarifikasi legal lebih dulu. Tazama (Apache-2.0) jauh lebih aman sebagai fondasi.
- **Jangan posisikan AI sebagai pengambil keputusan.** Untuk penindakan, AI menyaring dan memprioritaskan; manusia yang memutuskan. Sampaikan ini eksplisit — ini yang membuat pengawas merasa dibantu, bukan terancam.
- **Jangan sebut ini "menggantikan sistem OJK".** Sebut: melengkapi, dan mengisi cetak biru yang sedang mereka susun sendiri.

---

Satu hal terakhir yang saya sarankan dipertimbangkan matang: kekuatan terbesar posisi Bapak bukan pada teknologinya — Tazama dan model-model HF itu bisa dipasang siapa saja. Kekuatannya ada pada **kredibilitas institusional** Bapak dan kemampuan menjadi jembatan antara OJK, IT-DEL, dan komunitas open source global. Jual itu.


================

## 1. Lapisan LLM (reasoning berbahasa Indonesia)



Rekomendasi saya: Qwen 3 sebagai _reasoning engine_, TOBA LM  sebagai _language layer_ untuk teks pengaduan yang penuh slang dan dialek.

## 2. Lapisan retrieval (paling kritis untuk RAG POJK)

- **`LazarusNLP/all-indo-e5-small-v4`** — `intfloat/multilingual-e5-small` yang di-fine-tune pada seluruh dataset supervised Indonesia yang tersedia; ini model embedding Indonesia terbaik dari koleksi LazarusNLP. Ukurannya kecil (0.1B), jadi murah untuk indeks jutaan pasal.
- **`BAAI/bge-m3`** dan **`intfloat/multilingual-e5-large`** — sebagai pembanding; keduanya masih unggul pada rata-rata seluruh 131 task MMTEB.
- **`asmud/indonesian-embedding-small`** — turunan dari all-indo-e5-small-v4 dengan varian ONNX terkuantisasi 8-bit (113MB), berguna kalau nanti mau jalan di CPU kantor daerah.

Catatan jujur: tidak ada satupun embedding model yang dilatih khusus pada teks regulasi keuangan Indonesia. Ini celah nyata — dan justru peluang kontribusi yang paling tinggi nilainya (saya kembali ke ini di bawah).

## 3. Lapisan dokumen (laporan keuangan, prospektus, POJK PDF)

Ini area yang paling banyak kemajuannya dalam setahun terakhir:

- **`rednote-hilab/dots.ocr`** dan penerusnya **dots.mocr** (3B) — parsing dokumen multibahasa, pada Elo gabungan dots.mocr mencapai 1124,7, di atas PaddleOCR-VL-1.5 (920,5) dan GLM-OCR (892,5).
- **`PaddlePaddle/PaddleOCR-VL`** (0.9B) — hanya 0,9B parameter, mendukung 109 bahasa, punya mode khusus tabel ke HTML dan chart. Untuk ekstraksi tabel laporan keuangan, mode tabel ini sangat berguna.
- **`ibm-granite/granite-docling-258M`** — 258M parameter, output DocTags terstruktur dengan token lokasi. Ringan, cocok untuk pipeline volume tinggi.
- **`datalab-to/chandra`** — skor olmOCR-bench 83,1, tertinggi di antara model terbuka, mendukung 40+ bahasa. Pilih ini kalau akurasi lebih penting daripada biaya.

Untuk dokumen OJK yang banyak scan lama dan tabel rumit, saya sarankan pola hybrid: PDF native lewat Docling, hasil scan lewat dots.ocr atau PaddleOCR-VL.

## 4. Lapisan suara (hotline IASC, rekaman penagihan pinjol)

- **`cahya/whisper-medium-id`** — WER 3,83% di Common Voice 11 dan 9,74% di FLEURS, dibanding whisper-medium asli yang 12,62%. Ada juga ekspor ONNX-nya (`OpenVoiceOS/whisper-medium-id-onnx`) untuk inferensi CPU. Modelnya sudah agak berumur — sebaiknya dibandingkan dulu dengan Whisper large-v3 dan Qwen3-Omni sebelum dipakai produksi.

Ini penting karena bukti intimidasi debt collector pinjol ilegal sebagian besar berbentuk rekaman suara dan voice note, dan sekarang ditranskrip manual.

## 5. Dataset untuk melatih & menguji model AML/fraud

- **IBM Transactions for AML** (`eexzzm/IBM-Transactions-for-Anti-Money-Laundering-HI-Small-Trans` di HF, asli di Kaggle `ealtman2019`) — transaksi tersimulasi antara individu, perusahaan, dan bank dengan label pencucian uang per transaksi, dibangun dari model aktor baik-jahat termasuk penyelundupan, pemerasan, dan judi ilegal.
- **`IBM/AMLSim`** dan **`IBM/Multi-GNN`** (GitHub) — generator data dan arsitektur multi-GNN pendampingnya.
- **SAML-D** — 9.504.852 transaksi dengan 11 tipologi normal dan 17 tipologi mencurigakan, rasio suspicious hanya 0,1039%. Rasio setimpang ini penting: model Bapak harus diuji pada ketimpangan realistis, bukan data seimbang.
- **`intanm/financial_news_id_v1.0`** — korpus berita keuangan berbahasa Indonesia; isinya sudah memuat liputan pinjol ilegal dan investasi bodong. Berguna untuk _market surveillance_ dan deteksi dini penawaran ilegal.

## 6. Guardrail

**SEA-Guard** dari AI Singapore — keluarga LLM khusus keselamatan yang di-fine-tune untuk mendeteksi dan memoderasi konten sesuai norma budaya dan standar keselamatan Asia Tenggara, dari model visual ringan untuk edge sampai multimodal berkapasitas tinggi. Untuk sistem yang dipakai regulator, lapisan ini wajib — bukan opsional.

## Celah yang kosong — dan ini justru peluang Bapak

Setelah menyisir HF, tiga hal yang **tidak ada** dan sangat dibutuhkan:

1. **Embedding model domain keuangan-regulasi Indonesia.** Tidak ada yang dilatih pada POJK/SEOJK/PADK. Membangun ini relatif murah (fine-tune all-indo-e5 atau bge-m3 dengan pasangan query-pasal), tapi dampaknya besar untuk semua sistem RAG regulator.
2. **Benchmark evaluasi SupTech Indonesia.** Tidak ada semacam "OJK-Bench" untuk mengukur apakah suatu LLM benar menjawab pertanyaan regulasi keuangan Indonesia. Tanpa ini, klaim akurasi vendor manapun tidak bisa diverifikasi OJK. Yang memiliki benchmark, memegang standar.
3. **Dataset klasifikasi pengaduan keuangan berbahasa Indonesia.** Yang ada baru rintisan komunitas kecil (misalnya `RikZD/ZNX-Search-5K`, dataset klasifikasi laporan kejahatan siber Indonesia dengan contoh pinjol ilegal dan investasi bodong Telegram) — kualitasnya belum teruji, tapi menunjukkan bentuk yang dibutuhkan.

Nomor 2 menurut saya paling strategis. Membuat _benchmark_ memposisikan Bapak sebagai penentu standar, bukan sekadar penyedia sistem — dan ini paling nyambung dengan Blueprint SupTech yang sedang disusun OJK. Biayanya pun paling ringan.

