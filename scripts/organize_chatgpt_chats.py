#!/usr/bin/env python3
"""
Script untuk mengelompokkan percakapan ChatGPT ke dalam sub-folder kategori
dan membuatkan Index terorganisir di Obsidian.
"""

import os
import glob
import shutil

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHATGPT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "ChatGPT")

CATEGORIES = {
    "01 - GASING & Matematika": [
        "gasing", "matematika", "math", "pythagoras", "sums", "penjumlahan", "game edukasi", "pelatihan"
    ],
    "02 - Pemrograman & IT": [
        "git", "embedding", "sistem operasi", "hermes", "openclaw", "antigravity", "bug bounty", "nasa", "code", "programming"
    ],
    "03 - Game & Hiburan": [
        "brick breaker", "game", "octagon", "ksatria"
    ],
    "04 - Sejarah, Bisnis & Umum": [
        "soekarno", "unicorn", "huawei", "noda kuning", "tempat tinggal", "laut", "perusahaan"
    ]
}

DEFAULT_CATEGORY = "05 - Topik Umum Lainnya"

def classify_text(filename, content):
    text = (filename + " " + content).lower()
    for cat_name, keywords in CATEGORIES.items():
        for kw in keywords:
            if kw in text:
                return cat_name
    return DEFAULT_CATEGORY

def organize():
    files = glob.glob(os.path.join(CHATGPT_DIR, "*.md"))
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
        shutil.move(f, target_path)
        
        if category not in cat_summary:
            cat_summary[category] = []
        cat_summary[category].append(basename)

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
