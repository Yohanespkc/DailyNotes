#!/usr/bin/env python3
"""
Script untuk mengonversi seluruh data export percakapan Claude (conversations.json / .zip)
dari tahun 2025 hingga sekarang menjadi catatan Markdown terstruktur di dalam Obsidian Vault.
"""

import os
import sys
import json
import glob
import zipfile
from datetime import datetime

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "Claude")

def find_conversations_source():
    # 1. Cari file conversations.json langsung
    json_paths = [
        os.path.expanduser("~/Downloads/conversations.json"),
        os.path.expanduser("~/Downloads/*/conversations.json"),
        os.path.expanduser("~/Desktop/conversations.json"),
        os.path.join(VAULT_DIR, "conversations.json"),
        os.path.join(VAULT_DIR, "scripts", "conversations.json"),
    ]
    for p in json_paths:
        matches = glob.glob(p)
        if matches:
            return ("json", matches[0])
            
    # 2. Cari file export .zip di Downloads / Desktop
    zip_paths = [
        os.path.expanduser("~/Downloads/*.zip"),
        os.path.expanduser("~/Desktop/*.zip"),
    ]
    for zp_pattern in zip_paths:
        for zp in glob.glob(zp_pattern):
            try:
                with zipfile.ZipFile(zp, 'r') as zf:
                    if 'conversations.json' in zf.namelist():
                        return ("zip", zp)
            except Exception:
                pass
    return (None, None)

def sanitize_filename(title):
    clean = "".join(c for c in title if c.isalnum() or c in (" ", "_", "-")).strip()
    return clean[:60] if clean else "Untitled_Claude_Chat"

def process_claude_json_bytes(json_data_bytes):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    data = json.loads(json_data_bytes.decode('utf-8'))
    
    count_2025 = 0
    total_count = 0

    for chat in data:
        name = chat.get("name") or "Percakapan Claude"
        created_at_str = chat.get("created_at", "")
        
        try:
            dt = datetime.fromisoformat(created_at_str.replace("Z", "+00:00"))
            date_str = dt.strftime("%Y-%m-%d")
            time_str = dt.strftime("%H.%M")
            year = dt.strftime("%Y")
        except Exception:
            date_str = datetime.now().strftime("%Y-%m-%d")
            time_str = "00.00"
            year = datetime.now().strftime("%Y")

        if year == "2025":
            count_2025 += 1

        file_name = f"{date_str} - {time_str} - {sanitize_filename(name)}.md"
        filepath = os.path.join(OUTPUT_DIR, file_name)

        md_content = []
        md_content.append("---")
        md_content.append(f'title: "{name}"')
        md_content.append("tags:")
        md_content.append("  - ai-chat")
        md_content.append("  - claude")
        md_content.append(f"date: {date_str}")
        md_content.append(f"year: {year}")
        md_content.append("---\n")
        md_content.append(f"# 💬 {name}\n")
        md_content.append(f"**Tanggal:** `{date_str} {time_str}`  ")
        md_content.append(f"**Sumber:** Claude.ai Export  \n")
        md_content.append("---\n")

        messages = chat.get("chat_messages", [])
        for msg in messages:
            sender = msg.get("sender", "unknown")
            text = msg.get("text", "")
            if sender == "human":
                md_content.append(f"### 👤 User:\n{text}\n")
            elif sender == "assistant":
                md_content.append(f"### 🤖 Claude:\n{text}\n")
            else:
                md_content.append(f"### 💬 {sender.capitalize()}:\n{text}\n")

        with open(filepath, "w", encoding="utf-8") as out:
            out.write("\n".join(md_content))
        total_count += 1

    print(f"✅ Berhasil mengimpor {total_count} percakapan Claude (Termasuk {count_2025} percakapan tahun 2025) ke:\n   {OUTPUT_DIR}")

if __name__ == "__main__":
    stype, spath = find_conversations_source()
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        arg = sys.argv[1]
        if arg.endswith('.zip'):
            stype, spath = 'zip', arg
        else:
            stype, spath = 'json', arg

    if stype == 'json':
        print(f"📖 Membaca dari JSON: {spath}")
        with open(spath, 'rb') as f:
            process_claude_json_bytes(f.read())
    elif stype == 'zip':
        print(f"📦 Membaca dari file ZIP: {spath}")
        with zipfile.ZipFile(spath, 'r') as zf:
            json_bytes = zf.read('conversations.json')
            process_claude_json_bytes(json_bytes)
    else:
        print("❌ File 'conversations.json' atau '.zip' export dari Claude belum ditemukan di folder Downloads.")
        print("\nSilakan unduh Export Data dari Claude.ai:")
        print("1. Buka claude.ai -> Settings -> Account -> Export Data")
        print("2. Simpan file zip / conversations.json ke folder Downloads")
        print("3. Jalankan kembali script ini: python3 scripts/import_claude_conversations.py")
