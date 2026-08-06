#!/usr/bin/env python3
import os
from datetime import datetime

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "Claude")
os.makedirs(OUTPUT_DIR, exist_ok=True)

chats = [
    "Indonesian Stock Prediction App",
    "Menghubungkan Claude dengan Obsidian",
    "Transformasi pendidikan melalui GASING",
    "Program pelatihan programming TNI 5 hari",
    "Rekomendasi hosting web",
    "Harga windsurf Devin",
    "Tokenisasi asset",
    "Farol dan Grafana",
    "Pengenalan Grafana",
    "Pengenalan Playwright dan fungsinya",
    "Game edukatif penjumlahan berbasis game",
    "Cicilan untuk save pay later",
    "Agen-agen BMAD AI",
    "Converting numbers to alphabet words",
    "Rekor dunia menghafal digit pi",
    "Earphone tidak terdeteksi di Mac"
]

date_str = "2026-08-06"
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
  - claude
date: {date_str}
---

# 💬 {title}

**Tanggal:** `{date_str}`  
**Sumber:** Claude Desktop / Claude.ai  

---

### 📌 Ringkasan Percakapan Claude

*Catatan percakapan ini dibuat dari riwayat Claude Desktop Anda.*

> [!NOTE] 💡 **Instruksi Sinkronisasi Penuh Isi Chat**
> Untuk menyinkronkan seluruh riwayat teks lengkap dari percakapan ini ke Obsidian:
> 1. Download file `conversations.json` dari Claude.ai (**Settings -> Account -> Export Data**).
> 2. Jalankan `python3 scripts/import_claude_conversations.py`.
"""
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1

print(f"Created {count} Claude conversation notes in {OUTPUT_DIR}")
