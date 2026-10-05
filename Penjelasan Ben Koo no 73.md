Ran command: `gh pr view 73`
Ran command: `gh pr view 73 --json title,author,headRefName,baseRefName,commits,createdAt,updatedAt,url`
Ran command: `gh pr view 73 --json commits --jq '.commits[] | "\(.oid[0:10]) | \(.authoredDate) | \(.messageHeadline)"'`
Ran command: `git log --since="2 days ago" --oneline -n 30`
Ran command: `gh pr view 73 --comments`
Ran command: `git log -n 1 origin/main`
Ran command: `gh pr view 73 --json state,mergedAt`

Berikut adalah penjelasan lengkap mengenai isi dari **Pull Request #73** serta rangkuman komprehensif mengenai **apa saja yang telah kita kerjakan sejak kemarin**:

---

### 🔍 Bagian 1: Apa Isi dari Pull Request #73 (`fix/ci-red-main`)?

[PR #73](https://github.com/GASINGACADEMY/SacredOctagon/pull/73) dibuat oleh Ben Koo (dibantu Devin AI) pada branch `fix/ci-red-main`. PR ini bertujuan utama **memperbaiki kegagalan berkelanjutan pada pipeline CI di branch `main`** (yang sebelumnya sempat merah selama 8+ run berturut-turut), sekaligus menuntaskan audit modularitas (Rule 24):

#### 1. Perbaikan Kegagalan Pipeline CI (`main`)
* **Build Gate (Aset Audio Hilang):**
  * `npm run build` gagal di `validate-all-assets.js` karena 4 file audio (`tick.mp3`, `go.mp3`, `gameover.mp3`, dll.) yang dirujuk oleh `ChampionshipAudioBridge.ts` belum ada fisiknya di repo.
  * Solusi: Dibuat `KNOWN_MISSING_ASSETS` allowlist terarsip di [validate-all-assets.js](file:///Users/yohanessurya/Documents/Development/so/web/scripts/validate-all-assets.js) agar build tidak gagal fatal, sembari mencatatnya di registry utang teknis (*Debt Registry*).
* **Unit Tests (Sharding Registry):**
  * Uji unit `calculateZoneScore` sempat gagal menghasilkan skor `0` karena file *sharded registry* (hasil dari `npm run registry:shard`) belum ter-generate saat CI unit test berjalan.
  * Solusi: Ditambahkan tahapan `npm run registry:shard` sebelum pengujian unit di [playwright-zone1.yml](file:///Users/yohanessurya/Documents/Development/so/.github/workflows/playwright-zone1.yml).
* **Case-Sensitivity Filesystem (Linux CI vs macOS):**
  * macOS bersifat *case-insensitive*, sedangkan server Linux CI bersifat *case-sensitive*. Terdapat ketidakcocokan huruf kapital pada referensi file (seperti `frog_platform.webp`, `effect_f.webp`, `z4l6sb1_belajar_2.webm`).
  * Solusi: Huruf besar/kecil diseragamkan ke lowercase dan baseline `game-lock.baseline.json` dibekukan ulang dengan sign-off Rule 44.
* **Modernisasi E2E Test Zone 1 (`zone1-bermain-all.spec.ts`):**
  * Skrip E2E lama masih mencoba menavigasi via menu URL usang (`/zone/1/level/N`), padahal sistem navigasi sudah beralih ke isolated runner. Skrip diperbarui agar langsung memanggil `/game/<gameId>`.
* **Legacy Bermain Adapter Facade:**
  * Game-game Zona 1 yang terkunci byte-lock (Rule 44) memanggil `container._bermainEngine.audio.playSFX(...)` atau `registerEvent`, sementara engine Cordis modern tidak mengekspos properti tersebut.
  * Solusi: Dibuat adapter `LegacyBermainAdapter` dan `PraiseAdapter` di `BermainMode` agar game warisan tetap berjalan tanpa menyentuh file gamenya.

#### 2. Dekomposisi Modularitas Skala Besar (Rule 24 $< 500$ LOC)
PR #73 juga memecah lebih dari 14 file komponen monolith yang sebelumnya melebihi 500 baris:
* `AvatarSelector.astro` (845 $\to$ modul subkomponen)
* `PremiumOverlay.astro` (612 $\to$ subkomponen)
* `InteractiveWorldMap.astro` & `LobbyScreen.astro`
* `ProfileBanner.astro` & `BadgePortfolio.astro`
* `welcome.astro` & `WelcomeScreen.astro` (744/629 $\to$ 83/95 baris)
* `GameIntroOverlay.astro` (518 $\to$ 327 baris)
* `RankRewardGuideModal.astro` (787 $\to$ 170 baris)
* `GameLevelShell.astro` (580 $\to$ 162 baris)
* `RoadMap.astro` (649 $\to$ 192 baris)
* `BelajarInteractiveMenuEngine.astro` (683 $\to$ 302 baris)
* `play.astro` (756 $\to$ 116 baris) & `AppDashboard.astro` (933 $\to$ 278 baris)
* Penyelarasan baseline guardrail G-03 (`zero-window-globals`) karena variabel global dipindahkan dari file `.astro` ke controller TypeScript.

---

### 🚀 Bagian 2: Apa Saja yang Telah Kita Kerjakan Sejak Kemarin?

Di branch aktif kita (**`New-Build`**), berikut adalah rangkaian pekerjaan yang telah berhasil kita selesaikan secara bertahap:

#### 1. Sertifikasi Final Non-Breaking Modularity (Sprint 197 – 202)
* **Sprint 197 (`AssessmentRunner`):** Penyatuan alur evaluasi Pre-Test dan Post-Test ke dalam satu runner modular.
* **Sprint 198 (`ArcadeMenuShell`):** Harmonisasi menu Arcade Game (OcTul, OcKai, OcJan, OcTar) dan standarisasi tantangan GEMPO.
* **Sprint 199 (`Registry Sharding`):** Pemecahan registry kurikulum besar menjadi pecahan modular berbasis lazy-loader tanpa mengganggu game aktif.
* **Sprint 200 (Robustness Suite & 14-Guard):** Menjalankan gate kepatuhan `npm run guard:all` (14/14 lulus) dan verifikasi stres pengujian Tier-2.
* **Sprint 201 & 202 (Dokumentasi & Konvergensi):** Rekonsiliasi log mingguan di [docs/changelog/2026-W41.md](file:///Users/yohanessurya/Documents/Development/so/docs/changelog/2026-W41.md).

#### 2. Klarifikasi Video Pembelajaran Zona 2 Level 3 (Sprint 203)
* Mengkaji arsitektur video pembelajaran Zona 2 Level 3: memastikan sinkronisasi antara opsi 1 video YouTube gabungan dengan modul interaktif lokal (offline/PWA), serta memverifikasi paritas antarmuka *Belajar Player*.

#### 3. Restorasi Penuh Desain Asli Math Championship (Tuntutan User Kemarin Malam)
* Menanggapi hilangnya elemen visual asli Math Championship akibat perombakan PR #59:
  * Mengembalikan tampilan **Arena Duel 2 Petarung Besar** di tengah layar lengkap dengan bilah HP (*Health Points*), combo multiplier, dan bilah timer dinamis.
  * Mengembalikan 3 mode pertandingan tim: **Radar Kilat**, **Tantang Sekolah (School vs School)**, dan **Kode Ruangan (Private Room)**.
  * Memulihkan audio synthesizer Web Audio API (`tick.mp3`, `go.mp3`, `gameover.mp3`, dan efek piala).
  * Menjaga arsitektur tetap modular: memecah UI ke dalam subkomponen [ChampionshipArenaView.astro](file:///Users/yohanessurya/Documents/Development/so/web/src/components/championship/ChampionshipArenaView.astro) dan [ChampionshipTeamModes.astro](file:///Users/yohanessurya/Documents/Development/so/web/src/components/championship/ChampionshipTeamModes.astro) sehingga **seluruh file $< 500$ LOC** (Commit `2708264a46`).

#### 4. Restorasi Peta Interaktif & Avatar Draggable (Sprint 204 — Hari Ini)
* Mengembalikan fitur interaktif peta yang sempat tereduksi saat proses modularisasi:
  * **Avatar Draggable (Drag-to-Play):** Dibuat controller mandiri [WorldMapAvatarController.ts](file:///Users/yohanessurya/Documents/Development/so/web/src/lib/worldMap/modular/WorldMapAvatarController.ts) (465 LOC). Ksatria (Gaber Z1, Rakha Z2, Putu Z3, Anike Z4, Ameera Z5) kini kembali tampil anggun, bisa diseret ke tombol level dengan sorotan emas berdenyut, memicu animasi berjalan & snap, serta **otomatis membuka menu level**.
  * **Desain Mewah Modal GEMPO:** Mengembalikan kartu *dark-glassmorphism* transparan, badge *Misi Poin Ekstra*, dan tombol 3D api `🔥 AYO TAMBAH POINT`.
  * **Feedback Interaktif Sublevel:** Menampilkan *in-button rotating spinner* saat tombol game diklik dan proteksi anti-double click.
  * **Penegakan Batasan Ketat Zona 1–5:** Sesuai instruksi Anda, **hanya Zona 1 sampai Zona 5 yang aktif dan ditampilkan**. Zona 6–8 tetap tersembunyi dan otomatis diarahkan kembali ke `/play` jika diakses (Commit `faa22f6b44`).

---

### 📊 Status Saat Ini
* Seluruh kode hasil pemulihan Math Championship dan Peta Interaktif telah diverifikasi lewat **Playwright E2E browser**, **0 error oxlint**, dan **100% lulus unit test**.
* Commit terbaru `faa22f6b44` sudah berhasil terdorong (*pushed*) ke remote branch `origin/New-Build`.