TUGAS: Buat demo toko online single-file yang sangat memukau secara visual, selesai dan bisa langsung dibuka di browser tanpa build step. === FASE 1: PERENCANAAN (Plan Artifact) === Sebelum menulis kode, buat rencana singkat yang mencakup: - Struktur file (harus satu file: index.html, CSS dan JS inline di dalamnya) - Daftar section: Hero, Grid Produk, Keranjang (drawer), Modal checkout sukses - Daftar interaksi yang akan diuji di fase verifikasi === FASE 2: IMPLEMENTASI === Bangun toko online bernama "Nova Store" dengan spesifikasi berikut: Struktur teknis: - Satu file HTML saja (index.html), CSS dan JavaScript inline (<style> dan <script>), vanilla JS, tanpa framework, tanpa npm install, tanpa build step - Boleh pakai Google Fonts via CDN link dan ikon via inline SVG (jangan pakai library ikon eksternal yang butuh install) - Desain dark theme modern, palet warna gelap dengan aksen gradient (misal ungu-biru atau teal-emas), tipografi besar dan tegas Section wajib: 1. Hero: judul besar, subjudul, tombol CTA "Belanja Sekarang" dengan animasi gradient bergerak di background 2. Navbar: logo, search bar sederhana (filter produk real-time saat mengetik), ikon keranjang dengan badge jumlah item 3. Grid produk (minimal 8 produk dummy dengan gambar placeholder gradient/SVG, nama, harga): setiap kartu punya efek hover 3D tilt mengikuti posisi mouse, dan tombol "Tambah ke Keranjang" dengan animasi feedback (misal ikon terbang ke keranjang atau tombol berubah jadi centang sesaat) 4. Keranjang: drawer/panel yang slide-in dari kanan saat ikon keranjang diklik, list item dengan tombol tambah/kurang jumlah, subtotal yang animasinya "roll" angka saat berubah (bukan langsung loncat) 5. Checkout: tombol "Bayar Sekarang" yang saat diklik memicu animasi konfeti/particle burst dan menampilkan modal sukses dengan pesan terima kasih, lalu keranjang otomatis kosong Kualitas yang harus dipenuhi: - Semua transisi pakai CSS transition/animation yang halus (200-400ms), bukan perubahan instan - Responsif untuk layar mobile dan desktop - Tidak ada error di console browser - Tidak menggunakan localStorage/sessionStorage untuk state, cukup variabel JS di memori === FASE 3: VERIFIKASI DI BROWSER === Setelah kode selesai, buka file di browser bawaan dan uji secara berurutan: 1. Ketik sesuatu di search bar, pastikan grid produk terfilter 2. Klik tombol "Tambah ke Keranjang" pada 2-3 produk berbeda, pastikan badge keranjang bertambah dan animasi feedback muncul 3. Buka drawer keranjang, pastikan subtotal benar dan animasi angka berjalan 4. Klik "Bayar Sekarang", pastikan animasi konfeti dan modal sukses muncul, lalu keranjang kosong kembali 5. Ambil screenshot di tiap langkah penting sebagai bukti Jika ada bug atau tampilan yang rusak, perbaiki dan uji ulang sebelum lanjut ke fase berikutnya. === FASE 4: LAPORAN (Walkthrough) === Setelah semua terverifikasi, buat ringkasan singkat: apa yang dibangun, screenshot hasil akhir, dan cara membuka file (cukup double-click index.html atau buka lewat Live Server). Kriteria selesai: file index.html berjalan sempurna saat dibuka langsung di browser, semua interaksi di Fase 3 lolos tanpa error, dan visualnya terasa premium/mahal meski kodenya sederhana.





```
TUGAS: Buat demo toko online single-file yang sangat memukau secara visual, selesai dan bisa langsung dibuka di browser tanpa build step.

=== FASE 1: PERENCANAAN (Plan Artifact) ===
Sebelum menulis kode, buat rencana singkat yang mencakup:
- Struktur file (harus satu file: index.html, CSS dan JS inline di dalamnya)
- Daftar section: Hero, Grid Produk, Keranjang (drawer), Modal checkout sukses
- Daftar interaksi yang akan diuji di fase verifikasi

=== FASE 2: IMPLEMENTASI ===
Bangun toko online bernama "Nova Store" dengan spesifikasi berikut:

Struktur teknis:
- Satu file HTML saja (index.html), CSS dan JavaScript inline (<style> dan <script>), vanilla JS, tanpa framework, tanpa npm install, tanpa build step
- Boleh pakai Google Fonts via CDN link dan ikon via inline SVG (jangan pakai library ikon eksternal yang butuh install)
- Desain dark theme modern, palet warna gelap dengan aksen gradient (misal ungu-biru atau teal-emas), tipografi besar dan tegas

Section wajib:
1. Hero: judul besar, subjudul, tombol CTA "Belanja Sekarang" dengan animasi gradient bergerak di background
2. Navbar: logo, search bar sederhana (filter produk real-time saat mengetik), ikon keranjang dengan badge jumlah item
3. Grid produk (minimal 8 produk dummy dengan gambar placeholder gradient/SVG, nama, harga): setiap kartu punya efek hover 3D tilt mengikuti posisi mouse, dan tombol "Tambah ke Keranjang" dengan animasi feedback (misal ikon terbang ke keranjang atau tombol berubah jadi centang sesaat)
4. Keranjang: drawer/panel yang slide-in dari kanan saat ikon keranjang diklik, list item dengan tombol tambah/kurang jumlah, subtotal yang animasinya "roll" angka saat berubah (bukan langsung loncat)
5. Checkout: tombol "Bayar Sekarang" yang saat diklik memicu animasi konfeti/particle burst dan menampilkan modal sukses dengan pesan terima kasih, lalu keranjang otomatis kosong

Kualitas yang harus dipenuhi:
- Semua transisi pakai CSS transition/animation yang halus (200-400ms), bukan perubahan instan
- Responsif untuk layar mobile dan desktop
- Tidak ada error di console browser
- Tidak menggunakan localStorage/sessionStorage untuk state, cukup variabel JS di memori

=== FASE 3: VERIFIKASI DI BROWSER ===
Setelah kode selesai, buka file di browser bawaan dan uji secara berurutan:
1. Ketik sesuatu di search bar, pastikan grid produk terfilter
2. Klik tombol "Tambah ke Keranjang" pada 2-3 produk berbeda, pastikan badge keranjang bertambah dan animasi feedback muncul
3. Buka drawer keranjang, pastikan subtotal benar dan animasi angka berjalan
4. Klik "Bayar Sekarang", pastikan animasi konfeti dan modal sukses muncul, lalu keranjang kosong kembali
5. Ambil screenshot di tiap langkah penting sebagai bukti
Jika ada bug atau tampilan yang rusak, perbaiki dan uji ulang sebelum lanjut ke fase berikutnya.

=== FASE 4: LAPORAN (Walkthrough) ===
Setelah semua terverifikasi, buat ringkasan singkat: apa yang dibangun, screenshot hasil akhir, dan cara membuka file (cukup double-click index.html atau buka lewat Live Server).

Kriteria selesai: file index.html berjalan sempurna saat dibuka langsung di browser, semua interaksi di Fase 3 lolos tanpa error, dan visualnya terasa premium/mahal meski kodenya sederhana.
```

