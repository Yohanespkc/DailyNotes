---
title: "Panduan Import Percakapan Claude"
tags:
  - ai-chat
  - claude
  - guide
---

# 🤖 Folder Percakapan Claude Desktop / Claude.ai

Folder ini disiapkan untuk menyimpan seluruh riwayat percakapan dari **Claude Desktop** & **Claude.ai**.

---

### 🚀 Cara Mengisi Folder Ini secara Otomatis:

1. Buka [claude.ai](https://claude.ai) di browser.
2. Klik nama akun di pojok kiri bawah ➔ **Settings** ➔ **Account**.
3. Klik tombol **Export Data** *(Anthropic akan mengirim email file `.zip`)*.
4. Ekstrak file `.zip` tersebut dan simpan file **`conversations.json`** di folder `Downloads` Anda.
5. Jalankan perintah ini di Terminal:
   ```bash
   python3 scripts/import_claude_conversations.py
   ```

Setelah dijalankan, seluruh riwayat percakapan Claude Anda akan otomatis berubah menjadi catatan Markdown di dalam folder ini! 📂
