#!/usr/bin/env python3
"""
Script untuk mengelompokkan percakapan ChatGPT ke dalam sub-folder kategori
dan membuatkan Index terorganisir di Obsidian.
"""

import os
import glob
import shutil
import re

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHATGPT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "ChatGPT")

CATEGORIES = {
    "01 - GASING & Matematika": [
        "gasing", "matematika", "math", "pythagoras", "sums", "penjumlahan", "game edukasi", "pelatihan",
        "perkalian", "trigonometri", "pecahan", "angka", "segitiga", "pembagian", "aritmatika", "bilangan",
        "kalkulus", "aljabar", "diferensial", "integral", "fungsi kubik", "persamaan kuadratik", "kuadrat",
        "aritmetika", "hitung", "desimal", "sinus", "cosinus", "tangen", "logika komputasional"
    ],
    "02 - Pemrograman & IT": [
        "git", "embedding", "sistem operasi", "hermes", "openclaw", "antigravity", "bug bounty", "nasa", "code",
        "programming", "python", "javascript", "html", "css", "api", "database", "sql", "react", "next.js",
        "github", "ai", "llm", "gpt", "prompt", "server", "linux", "coding", "software", "bug", "debugging",
        "web app", "terminal", "script", "cron", "json", "docker", "deploy", "website"
    ],
    "03 - Game & Hiburan": [
        "brick breaker", "game", "octagon", "ksatria", "catur", "puzzle", "musik", "lagu", "film", "anime",
        "gaming", "permainan", "lirik", "chord", "guitar", "piano", "art", "gambar", "novel", "cerita"
    ],
    "04 - Sejarah, Bisnis & Umum": [
        "soekarno", "unicorn", "huawei", "noda kuning", "tempat tinggal", "laut", "perusahaan", "sejarah",
        "bisnis", "ekonomi", "politik", "indonesia", "papua", "columbia", "lpdp", "universitas", "kuliah",
        "beasiswa", "sekolah", "pendidikan", "belajar", "sains", "fisika", "astronomi", "planet", "wisata",
        "travel", "suku", "pemerintah", "presiden", "menteri", "sosial", "budaya"
    ]
}

DEFAULT_CATEGORY = "05 - Topik Umum Lainnya"

def classify_text(filename, content):
    # Buang frontmatter YAML di bagian paling atas
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            body = parts[2]
        else:
            body = content
    else:
        body = content

    text = (filename + " " + body).lower()
    for cat_name, keywords in CATEGORIES.items():
        for kw in keywords:
            # Use regex for word boundaries for short or alphanumeric keywords to prevent false positives (like 'ai' in 'lain')
            if len(kw) <= 4 or kw.isalnum():
                pattern = r'\b' + re.escape(kw) + r'\b'
                if re.search(pattern, text):
                    return cat_name
            else:
                if kw in text:
                    return cat_name
    return DEFAULT_CATEGORY

def organize():
    # Cari secara rekursif agar bisa memproses ulang file yang sudah terlanjur dipindahkan
    files = glob.glob(os.path.join(CHATGPT_DIR, "**", "*.md"), recursive=True)
    cat_summary = {}

    for f in files:
        basename = os.path.basename(f)
        if basename.startswith("README") or basename.startswith("Index"):
            continue
            
        with open(f, "r", encoding="utf-8", errors="ignore") as fp:
            content = fp.read(1500)
            
        category = classify_text(basename, content)
        target_dir = os.path.join(CHATGPT_DIR, category)
        os.makedirs(target_dir, exist_ok=True)
        
        target_path = os.path.join(target_dir, basename)
        if os.path.abspath(f) != os.path.abspath(target_path):
            shutil.move(f, target_path)
        
        if category not in cat_summary:
            cat_summary[category] = []
        cat_summary[category].append(basename)

    # Bersihkan folder kategori yang kosong jika ada
    for cat in list(CATEGORIES.keys()) + [DEFAULT_CATEGORY]:
        dir_path = os.path.join(CHATGPT_DIR, cat)
        if os.path.exists(dir_path) and os.path.isdir(dir_path) and not os.listdir(dir_path):
            try:
                os.rmdir(dir_path)
            except Exception:
                pass

    # Buat Index Terstruktur
    index_file = os.path.join(CHATGPT_DIR, "Index - ChatGPT Conversations.md")
    idx_md = [
        "---",
        'title: "Index Percakapan ChatGPT"',
        "tags:",
        "  - ai-chat",
        "  - chatgpt",
        "  - index",
        "---\n",
        "# 📚 Indeks Terkelompok Percakapan ChatGPT\n",
        "Koleksi seluruh riwayat percakapan ChatGPT yang telah dikelompokkan secara otomatis berdasarkan kategori topik.\n"
    ]

    for cat in sorted(CATEGORIES.keys()) + [DEFAULT_CATEGORY]:
        dir_path = os.path.join(CHATGPT_DIR, cat)
        if os.path.exists(dir_path):
            item_files = sorted(os.listdir(dir_path))
            if item_files:
                idx_md.append(f"## 📁 {cat} ({len(item_files)} Catatan)\n")
                for fn in item_files:
                    if fn.endswith(".md"):
                        display_title = fn[:-3]
                        idx_md.append(f"- [[{cat}/{display_title}|{display_title}]]")
                idx_md.append("\n")

    with open(index_file, "w", encoding="utf-8") as out:
        out.write("\n".join(idx_md))

    print(f"✅ Berhasil mengelompokkan percakapan ChatGPT ke dalam {len(cat_summary)} kategori!")

if __name__ == "__main__":
    organize()
