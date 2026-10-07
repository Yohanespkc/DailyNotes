Ran command: `cat ~/.ssh/config`
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