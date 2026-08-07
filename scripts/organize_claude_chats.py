#!/usr/bin/env python3
"""
Script untuk mengelompokkan 300+ percakapan Claude ke dalam sub-folder kategori
dan membuatkan Index terorganisir di Obsidian.
"""

import os
import glob
import re
import shutil

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLAUDE_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "Claude")

CATEGORIES = {
    "01 - GASING & Pendidikan": [
        "gasing", "matematika", "math", "penjumlahan", "perkalian", "pembagian", "pengurangan",
        "edukasi", "education", "quiz", "game edukatif", "game", "tutor", "pedagogy", "sekolah", "pelatihan tni"
    ],
    "02 - Programming & Software": [
        "programming", "code", "python", "react", "playwright", "html", "javascript", "web app",
        "dashboard", "developer", "git", "api", "coding", "css", "script"
    ],
    "03 - Data & Analytics": [
        "grafana", "farol", "data", "analytics", "visualization", "excel", "statistika", "papua",
        "regional", "chart", "metrics"
    ],
    "04 - Keuangan & Saham": [
        "stock", "saham", "investasi", "trading", "financial", "keuangan", "tokenisasi", "pay later",
        "cicilan", "rups", "harga"
    ],
    "05 - Teknologi & AI Tools": [
        "devin", "windsurf", "hosting", "bmad", "agent", "ai", "earphone", "mac", "claude", "ollama",
        "hardware", "openrouter", "omnirouter"
    ]
}

DEFAULT_CATEGORY = "06 - Sains & Topik Umum"

def classify_text(filename, content):
    text = (filename + " " + content).lower()
    for cat_name, keywords in CATEGORIES.items():
        for kw in keywords:
            if kw in text:
                return cat_name
    return DEFAULT_CATEGORY

def organize():
    files = glob.glob(os.path.join(CLAUDE_DIR, "*.md"))
    cat_summary = {}

    for f in files:
        basename = os.path.basename(f)
        if basename.startswith("README") or basename.startswith("Index"):
            continue
            
        with open(f, "r", encoding="utf-8", errors="ignore") as fp:
            content = fp.read(1500)
            
        category = classify_text(basename, content)
        target_dir = os.path.join(CLAUDE_DIR, category)
        os.makedirs(target_dir, exist_ok=True)
        
        target_path = os.path.join(target_dir, basename)
        shutil.move(f, target_path)
        
        if category not in cat_summary:
            cat_summary[category] = []
        cat_summary[category].append(basename)

    # Buat Index Terstruktur
    index_file = os.path.join(CLAUDE_DIR, "Index - Claude Conversations.md")
    idx_md = [
        "---",
        'title: "Index Percakapan Claude"',
        "tags:",
        "  - ai-chat",
        "  - claude",
        "  - index",
        "---\n",
        "# 📚 Indeks Terkelompok Percakapan Claude\n",
        "Koleksi seluruh riwayat percakapan Claude yang telah dikelompokkan secara otomatis berdasarkan kategori topik.\n"
    ]

    for cat in sorted(CATEGORIES.keys()) + [DEFAULT_CATEGORY]:
        # Scrape current items in directory
        dir_path = os.path.join(CLAUDE_DIR, cat)
        if os.path.exists(dir_path):
            item_files = sorted(os.listdir(dir_path))
            idx_md.append(f"## 📁 {cat} ({len(item_files)} Catatan)\n")
            for fn in item_files:
                if fn.endswith(".md"):
                    display_title = fn[:-3]
                    # Link obsidian
                    idx_md.append(f"- [[{cat}/{display_title}|{display_title}]]")
            idx_md.append("\n")

    with open(index_file, "w", encoding="utf-8") as out:
        out.write("\n".join(idx_md))

    print(f"✅ Berhasil mengelompokkan percakapan ke dalam {len(cat_summary)} kategori!")

if __name__ == "__main__":
    organize()
