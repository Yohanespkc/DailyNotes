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

Untuk bagian LLM-nya: Sahabat-AI adalah pilihan paling defensible secara politis — koleksi LLM open source untuk Bahasa Indonesia dan bahasa daerah, kolaborasi Indosat dan GoTo, dibangun sebagai bukti komitmen Indonesia pada kedaulatan AI, dibangun di atas SEA-LION dari AI Singapore dan tersedia di Ollama. Realistisnya, untuk akurasi tugas teknis, kombinasikan: Qwen 3 atau SEA-LION untuk reasoning, Sahabat-AI untuk pemahaman bahasa/dialek pengaduan. Serving pakai vLLM, parsing dokumen pakai Docling, orkestrasi RAG pakai RAGFlow — semuanya jalan di GPU on-prem, nol data keluar.

## Tiga kandidat proyek konkret

**A. SupTech Aduan Engine (paling cepat memberi bukti nilai).** Klasifikasi + deduplikasi + triase otomatis 25 ribu+ pengaduan entitas ilegal per tahun, ekstraksi entitas (nama platform, rekening, nomor HP, URL) ke graf FollowTheMoney, lalu clustering untuk menemukan satu sindikat di balik 50 aplikasi berbeda. Stack: OpenAleph + LLM lokal + Docling. Bisa jalan dengan data publik siaran pers Satgas PASTI sebagai PoC — tanpa perlu izin data OJK dulu.

**B. Reference Implementation SupTech Nasional.** Fork Tazama, lokalkan ke konteks Indonesia (adapter BI-FAST/QRIS, tipologi scam lokal: click-to-earn, impersonation entitas berizin, MLM kripto), jadikan kontribusi upstream. Ini yang paling nyambung dengan Blueprint SupTech yang sedang disusun OJK, dan posisinya kuat: Indonesia bukan hanya pengguna DPG, tapi kontributor.

**C. Regulatory Copilot.** RAG di atas seluruh POJK/SEOJK/PADK dengan sitasi pasal wajib dan _zero_ jawaban tanpa sumber. Paling mudah dibangun, tapi paling mudah pula ditiru — nilai jualnya ada di kualitas korpus dan evaluasi, bukan teknologinya.

Saran saya: mulai dari **A**, karena bisa didemokan dalam 6–8 minggu dengan data publik, langsung menyentuh rasa sakit yang nyata, dan menjadi pintu masuk ke B yang skalanya jauh lebih besar.

Mau saya bantu susun arsitektur teknis dan proposal untuk salah satu dari tiga ini?