Ran command: `git branch -a && git log -n 5 --oneline`
Ran command: `git status`
Ran command: `git log -n 3 --stat 0d3a265ac8`
Ran command: `git show --stat 0d3a265ac8`
Ran command: `git show 0d3a265ac8 --name-only`
Viewed SPRINT_PLAN_IOS_DEPLOYMENT.md:1-138

Berikut adalah panduan lengkap dan praktis untuk menjalankan **Sacred Octagon (SO) di iOS Simulator** di Mac Anda:

---

### Cara 1: Lewat Terminal (Paling Praktis & Otomatis)

Cukup buka terminal di folder proyek SO dan jalankan perintah:

```bash
make ios-run
```

Perintah `make ios-run` ini secara otomatis melakukan 4 tahap sekaligus:
1. **`make package`** — Mengemas seluruh halaman Astro PWA dan aset game ke dalam bundle mobile (`mobile/dist/`).
2. **`make ios-boot`** — Membuka dan menyalakan (*boot*) iOS Simulator (iPhone 18 Pro / seri terbaru).
3. **`make ios-build`** — Mengompilasi core native Rust Tauri 2 dan membungkusnya menjadi `SacredOctagon.app`.
4. **Deploy & Launch** — Menginstal dan langsung membuka Sacred Octagon dalam mode *Landscape* di Simulator.

---

### Cara 2: Lewat Aplikasi Xcode (Visual GUI)

Karena proyek Xcode (**`sacred-octagon-mobile.xcodeproj`**) saat ini sudah terbuka di layar Mac Anda:

1. Perhatikan bilah menu atas (toolbar) di jendela **Xcode**.
2. Di samping teks skema **`sacred-octagon-mobile_iOS`**, klik menu dropdown perangkat (*destination selector*).
3. Pilih salah satu simulator:
   * **`SacredOctagon-iPhone18`** *(rekomendasi, sudah siap)*
   * Atau **`iPhone 18 Pro`** / **`iPhone 17`**
4. Klik tombol **Play / Run ▶** di pojok kiri atas (atau tekan shortcut keyboard **`Cmd + R`**).
5. Xcode akan otomatis melakukan build, menyalakan simulator, dan menampilkan game di layar simulator lengkap dengan konsol debug.

---

### Perintah Bantuan Tambahan

* **Melihat Log Aplikasi Secara Real-time (Console Debug):**
  ```bash
  make ios-logs
  ```
* **Cek Kesiapan Toolchain:**
  ```bash
  make doctor
  ```
* **Jika Anda Melakukan Perubahan Kode Game / Web:**
  Cukup jalankan kembali:
  ```bash
  make package && make ios-run
  ```