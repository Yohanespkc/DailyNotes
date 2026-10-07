˛Ran command: `cat ~/.ssh/config`
Ran command: `cat << 'EOF' > ~/.ssh/config
Host ollamab200
    HostName 10.254.81.68
    User ollama
    Port 7722

# AWS so-gasing k3s cluster
Host sogasing-k3s-1
    HostName 54.242.146.3
    User surya
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    ServerAliveInterval 30
    ServerAliveCountMax 3
EOF
chmod 600 ~/.ssh/config
`
Ran command: `ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 sogasing-k3s-1 "whoami && hostname && uname -a"`
Ran command: `ssh sogasing-k3s-1 "uptime && df -h / && which kubectl k3s 2>&1"`

Koneksi ke server **`sogasing-k3s-1`** telah berhasil diuji dan berjalan lancar!

### 1. Konfigurasi [~/.ssh/config](file:///Users/yohanessurya/.ssh/config) yang Diperbarui:
File private key milik Anda (`~/.ssh/id_ed25519`) dan user `surya` telah dikonfigurasikan:

```ssh-config
# AWS so-gasing k3s cluster
Host sogasing-k3s-1
    HostName 54.242.146.3
    User surya
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

---

### 2. Hasil Uji Koneksi:
- **User**: `surya`
- **Internal Hostname**: `ip-172-31-26-200`
- **OS / Arsitektur**: `Ubuntu 24.04.1 LTS (Linux 6.17 AWS aarch64)`
- **Kapasitas Disk**: `29G (27G free / 7% use)`
- **Status**: Berhasil terhubung via SSH tanpa error.

---

### Cara Mengakses Langsung dari Terminal Anda:
Cukup ketik perintah berikut kapan saja:
```bash
ssh sogasing-k3s-1
```


Ran command: `ls -la ~/.ssh/*.pub 2>/dev/null`
Ran command: `ls -la ~/.ssh/`
Ran command: `cat ~/.ssh/id_ed25519.pub`

Berikut adalah **SSH Public Key** dari komputer (Mac) Anda:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGUfJeLNJzl3IfobYY3um21v3UGAJa+CXL591KldzPsa surya.yohanes@gmail.com
```

### Cara Cepat Menyalin ke Clipboard:
Jalankan perintah ini di Terminal untuk langsung meng-copy ke clipboard:
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

---

### Cara Penggunaan:
- **Jika admin server meminta public key Anda**: Berikan baris teks di atas kepada admin/pengelola server. Mereka akan menambahkannya ke dalam file `~/.ssh/authorized_keys` di mesin tujuan.
- Setelah ditambahkan oleh pihak server, jika Anda login menggunakan key ini (bukan file `.pem`), Anda cukup menghubungkannya secara langsung tanpa memerlukan file `sogasing-k8s.pem`.


Ran command: `mkdir -p ~/.ssh && touch ~/.ssh/config && chmod 700 ~/.ssh && chmod 600 ~/.ssh/config`
Viewed config:1-5
Ran command: `ls -la ~/.ssh/sogasing-k8s.pem`
Ran command: `find ~/Downloads ~/Desktop ~/.ssh -name "*sogasing*" 2>/dev/null`
Edited config
Ran command: `cat << 'EOF' >> ~/.ssh/config

# AWS so-gasing k3s cluster
Host sogasing-k3s-1
    HostName 54.242.146.3
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/sogasing-k8s.pem
    IdentitiesOnly yes
    ServerAliveInterval 30
    ServerAliveCountMax 3
EOF
`
Ran command: `cat ~/.ssh/config`
Ran command: `ls -la ~/.ssh/*.pem 2>/dev/null; ls -la ~/Downloads/*.pem 2>/dev/null`
Ran command: `chmod 600 ~/.ssh/config && ls -l ~/.ssh/config`

Konfigurasi SSH server untuk **`sogasing-k3s-1`** telah berhasil ditambahkan ke [~/.ssh/config](file:///Users/yohanessurya/.ssh/config).

### Isi Konfigurasi yang Ditambahkan:
```ssh-config
# AWS so-gasing k3s cluster
Host sogasing-k3s-1
    HostName 54.242.146.3
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/sogasing-k8s.pem
    IdentitiesOnly yes
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

---

### Catatan Penting Mengenai Private Key (`.pem`):
File key `~/.ssh/sogasing-k8s.pem` belum ditemukan di direktori `~/.ssh/`. Pastikan Anda meletakkan file key tersebut dan mengatur izin aksesnya:

```bash
# 1. Pindahkan / simpan file private key ke ~/.ssh/
mv /path/to/sogasing-k8s.pem ~/.ssh/sogasing-k8s.pem

# 2. Set permission agar aman (read-only untuk user)
chmod 400 ~/.ssh/sogasing-k8s.pem
```

Setelah file key tersedia, Anda dapat langsung terhubung dengan perintah:
```bash
ssh sogasing-k3s-1
```

Viewed package-lock.json:1-19

Ran command: `find . -name "*.apk" -o -name "*.ipa" -o -name "*.app" 2>/dev/null`
Ran command: `ls -lh ./web/public/downloads/ ./dist-shareable/ ./mobile/src-tauri/gen/android/app/build/outputs/apk/universal/debug/`
Searched for "SacredOctagon-Android.apk"
Viewed download.astro:1-100
Ran command: `curl -I https://so-gasing.com/downloads/SacredOctagon-Android.apk`
Ran command: `curl -I https://minio.pkc.pub/gasing-assets-prod/downloads/SacredOctagon-Android.apk`
Ran command: `ls scripts/`
Viewed sync-to-minio.sh:1-40
Ran command: `mc alias list 2>/dev/null`
Searched for "dist-shareable"
Searched for "dist-shareable"
Ran command: `lsof -iTCP -sTCP:LISTEN -P -n`
Ran command: `ifconfig | grep "inet "`
Ran command: `curl -I http://localhost:4321/downloads/SacredOctagon-Android.apk`
Ran command: `ssh -o BatchMode=yes -o ConnectTimeout=5 sogasing-k3s-1 "hostname && df -h"`
Ran command: `ssh sogasing-k3s-1 "kubectl get pods -A -o wide"`
Ran command: `curl -I http://192.168.50.183:4321/downloads/SacredOctagon-Android.apk`
Ran command: `ssh sogasing-k3s-1 "curl -s ifconfig.me"`
Ran command: `dig +short so-gasing.com dev.so-gasing.com`
Ran command: `dig +short cf.so-gasing.com`
Ran command: `curl -I https://cf.so-gasing.com/download`
Ran command: `curl -I https://cf.so-gasing.com/download/`

Berikut adalah link unduhan dan cara pemasangan untuk **Android** dan **iOS (iPhone/iPad)**:

---

### 1. 🤖 Untuk Android (APK & PWA)

#### Opsi A: Unduh File APK Native Langsung (496 MB)
Jika ponsel Android Anda terhubung ke **jaringan Wi-Fi yang sama** dengan MacBook ini, Anda bisa langsung mengunduhnya melalui tautan lokal berikut:
👉 **[http://192.168.50.183:4321/downloads/SacredOctagon-Android.apk](http://192.168.50.183:4321/downloads/SacredOctagon-Android.apk)**

* **Lokasi file fisik di MacBook Anda:**  
  [`dist-shareable/SacredOctagon-Android.apk`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/dist-shareable/SacredOctagon-Android.apk)  
  *(Bisa juga dipindahkan langsung ke HP via kabel USB / Android File Transfer / Google Drive / WhatsApp).*
* **Cara pasang:** Setelah terunduh, buka file `.apk` di HP Android Anda, izinkan pemasangan dari sumber ini (*Install from unknown sources*), lalu pilih **Install**.

#### Opsi B: Pasang via PWA di Chrome (Sangat Ringan, Instan tanpa unduh 500 MB)
1. Buka browser **Google Chrome** di HP Android.
2. Buka alamat: **[https://cf.so-gasing.com](https://cf.so-gasing.com)**
3. Tekan ikon **titik tiga (⋮)** di pojok kanan atas $\rightarrow$ pilih **"Instal aplikasi"** (atau *"Tambahkan ke layar utama"*).
4. Aplikasi Sacred Octagon akan langsung terpasang di HP Anda.

---

### 2. 🍏 Untuk iOS (iPhone & iPad)

> **Catatan Ekosistem Apple:**  
> Apple secara keamanan **tidak mengizinkan instalasi file installer mentah** (seperti `.apk` atau `.ipa`) langsung melalui klik tautan di web browser biasa tanpa melalui Apple App Store atau TestFlight.

Sebagai gantinya, Apple menyediakan jalur resmi **PWA Standalone (Web App Rasa Native)** yang berjalan 100% layar penuh, bebas URL bar, dan sangat responsif:

#### Cara Pasang di iPhone / iPad (Hanya 2 Langkah):
1. Buka **Safari** di iPhone atau iPad Anda.
2. Kunjungi: **[https://cf.so-gasing.com](https://cf.so-gasing.com)** (atau halaman panduan di [https://cf.so-gasing.com/download/](https://cf.so-gasing.com/download/)).
3. Tekan tombol **Bagikan (Share)** — yaitu ikon kotak dengan tanda panah ke atas di bilah bawah Safari.
4. Gulir ke bawah sedikit, lalu pilih **"Tambah ke Layar Utama" (Add to Home Screen)**.
5. Tekan tombol **"Tambah" (Add)** di pojok kanan atas.

✨ **Hasil:** Ikon **Sacred Octagon** akan langsung muncul di layar utama iPhone Anda seperti aplikasi native App Store. Saat dibuka, aplikasi tampil layar penuh (*fullscreen*), mendukung haptic touch, dan aman dari potongan Dynamic Island / notch.

---

#### 🛠️ Khusus Developer / Xcode (Jika Ingin Run Native di Mac/Simulator)
Bagi developer yang ingin menjalankan proyek native iOS di Xcode / iOS Simulator:
* **Proyek Xcode (.zip):** [`dist-shareable/SacredOctagon-iOS-XcodeProject.zip`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/dist-shareable/SacredOctagon-iOS-XcodeProject.zip)
* **Build Binary Simulator (.app):** [`mobile/src-tauri/gen/apple/build/arm64-sim/SacredOctagon.app`](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/mobile/src-tauri/gen/apple/build/arm64-sim/SacredOctagon.app)  
  *(Cukup drag & drop ke jendela Xcode iOS Simulator untuk langsung menguji).*