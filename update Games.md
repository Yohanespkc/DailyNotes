

Bapak Yohanes, berikut adalah pemetaan arsitektur yang sangat jelas mengenai **cabang mana yang terhubung ke server live (Hostinger, Google Cloud, Cloudflare)**:

---

### 🗺️ Pemetaan Branch vs Domain / Server Live

Berdasarkan konfigurasi **ArgoCD, Ingress Kubernetes di Google Cloud, dan Cloudflare**:

| Branch di Git | Domain yang Dituju | Server / Infrastruktur | Fungsi Utama |
| :--- | :--- | :--- | :--- |
| **`new-build1`** | **`so-gasing.com`**<br/>**`so-gasing.id`**<br/>**`so-gasing.online`** | **Google Cloud (GKE) + Cloudflare DNS + Hostinger** | 🌐 **Website Publik Live Saat Ini** (yang aktif diakses pengguna & dideploy oleh tim/Devin). |
| **`build`** | **`sodev.pkc.pub`** | Google Cloud Kubernetes (Staging Dev) | 🧪 Lingkungan uji coba otomatis CI/CD internal. |
| **`production`** | **`so.pkc.pub`** | Google Cloud Kubernetes (Prod Live) | 🏛️ Server produksi khusus domain internal PKC. |
| **`main` / `main-bf`** | *Localhost & Mobile Binaries* (iOS `.app` & Android `.apk`) | Komputer Pengembang (Mac) & Simulator | 💻 **Sumber Kode Inti (SSOT)**: Tempat kita membangun Native Mobile Apps iOS & Android dan fitur Bab 1–8. |

---

### 🎯 Jawaban Langsung: Branch Mana yang Perlu Di-update?

1. **Jika Update Ingin Langsung Tayang di Website Publik (`so-gasing.com`):**
   - Branch yang **WAJIB di-update adalah `new-build1`**.
   - Karena Ingress server Google Cloud dan DNS Cloudflare untuk `so-gasing.com` mendengarkan deployment dari image branch **`new-build1`**.

2. **Jika Update Terkait Native Mobile Apps (APK Android / iOS Simulator):**
   - Tetap berada di **`main-bf`** (atau di-*merge* ke **`main`**).
   - Mengapa? Karena folder arsitektur mobile native (`mobile/`, Tauri 2, Xcode, Gradle APK) dibangun dan diisolasi dengan rapi di `main-bf`.

---

### 💡 Rekomendasi Alur Praktis (Workflow Aman):

Agar kode di website (`so-gasing.com`) dan aplikasi mobile native tidak saling bentrok atau tertinggal:

1. **Kerjakan fitur / bug fix di `main-bf`:**
   Semua kode di sini sudah aman, memiliki audit kualitas `oxlint` 0 error, dan lulus pengujian.
2. **Saat siap tayang ke website publik:**
   Kirimkan (*cherry-pick* atau *merge*) perubahan tersebut ke branch **`new-build1`** lalu jalankan:
   ```bash
   git push origin new-build1
   ```
   *Pipeline Google Cloud / ArgoCD akan otomatis merakit container baru dan Cloudflare akan langsung menyajikan versi terbaru ke `so-gasing.com`.*

Apakah Bapak ingin kita sinkronkan pembaruan tertentu dari `main-bf` ke `new-build1` sekarang?