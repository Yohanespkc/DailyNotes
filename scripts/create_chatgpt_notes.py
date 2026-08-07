#!/usr/bin/env python3
import os

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "ChatGPT")
os.makedirs(OUTPUT_DIR, exist_ok=True)

chats = [
    "Umur Presiden Soekarno",
    "Perbedaan Hermes OpenClaw Antigravity",
    "Edit paragraf detail game",
    "Apa itu Embedding",
    "Pelatihan GASING 10 Bulan",
    "Cara Membuat Akun Git",
    "Lomba Bug Bounty NASA",
    "Game Brick Breaker",
    "Perusahaan Unicorn Indonesia",
    "Math Brick Breaker",
    "Tempat Tinggal Pythagoras",
    "Pythagoras dan Laut",
    "Game Edukasi Chain Sums",
    "Cara Hilangkan Noda Kuning",
    "Pertanyaan AI untuk Huawei",
    "Nama Ksatria Octagon",
    "Apa itu Sistem Operasi"
]

date_str = "2026-08-07"
count = 0

for i, title in enumerate(chats, 1):
    clean_title = "".join(c for c in title if c.isalnum() or c in (" ", "_", "-")).strip()
    filename = f"{date_str} - {i:02d} - {clean_title}.md"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    if not os.path.exists(filepath):
        content = f"""---
title: "{title}"
tags:
  - ai-chat
  - chatgpt
date: {date_str}
---

# 💬 {title}

**Tanggal:** `{date_str}`  
**Sumber:** ChatGPT Desktop / ChatGPT.com  

---

### 📌 Ringkasan Percakapan ChatGPT

*Catatan percakapan ini disiapkan dari riwayat ChatGPT Desktop Anda.*

> [!NOTE] 💡 **Instruksi Sinkronisasi Penuh Isi Chat**
> Untuk menyinkronkan seluruh riwayat teks lengkap dari percakapan ini ke Obsidian:
> 1. Download file data dari ChatGPT (**Settings -> Data Controls -> Export Data**).
> 2. Jalankan `python3 scripts/import_chatgpt_conversations.py`.
"""
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1

print(f"Created {count} ChatGPT conversation notes in {OUTPUT_DIR}")
