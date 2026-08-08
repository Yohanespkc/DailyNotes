Ran command: `which grafana-server || brew list grafana`
Ran command: `brew services list || pgrep -f grafana`
Ran command: `curl -I http://localhost:3000`

**Grafana sudah terinstal dan sedang berjalan secara aktif** di sistem macOS Anda melalui Homebrew!

### 📊 Status Service Grafana saat ini:
- **Status**: `STARTED` (Aktif)
- **URL Grafana**: [http://localhost:3000](http://localhost:3000)
- **Default Login**: 
  - **Username**: `admin`
  - **Password**: `admin` (atau password yang telah Anda set sebelumnya)

---

## 🛠️ 3 Cara Menghubungkan & Menggunakan Grafana di Obsidian

### Cara 1: Menampilkan Dashboard Grafana di Dalam Catatan Obsidian (iFrame HTML)

Anda bisa memasukkan panel Grafana secara langsung ke dalam catatan Markdown (`.md`) di Obsidian menggunakan tag `<iframe>`:

```html
<iframe 
  src="http://localhost:3000/d-solo/YOUR_DASHBOARD_ID/your-dashboard-name?orgId=1&panelId=1&kiosk" 
  width="100%" 
  height="450" 
  frameborder="0">
</iframe>
```

> ⚠️ **Catatan Iframe Embedding**: Jika panel Grafana tidak muncul di Obsidian, aktifkan opsi embedding di konfigurasi Grafana:
> Edit `/opt/homebrew/etc/grafana/grafana.ini`, cari `[security]` dan ubah menjadi:
> ```ini
> [security]
> allow_embedding = true
> ```

---

### Cara 2: Membuka Grafana Sebagai Sidebar / Tab di Obsidian (Plugin Custom Frames)

Jika Anda ingin membuka Grafana sebagai tampilan utuh di sidebar Obsidian:
1. Buka **Obsidian Settings** -> **Community Plugins**.
2. Cari dan install plugin **Custom Frames**.
3. Tambahkan frame baru dengan URL: `http://localhost:3000`.
4. Anda akan memiliki ikon Grafana di sidebar Obsidian untuk melihat semua statistik dan dashboard secara langsung.

---

### Cara 3: Mengirim Log Catatan Obsidian ke Grafana (Loki & Alloy)

Sistem Anda juga sudah mengaktifkan **Loki** & **Grafana Alloy**. Anda bisa menggunakan Grafana untuk menganalisis statistik catatan harian atau log Obsidian Anda melalui Loki Data Source di `http://localhost:3000`.