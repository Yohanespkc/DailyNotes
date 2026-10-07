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