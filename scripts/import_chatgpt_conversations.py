#!/usr/bin/env python3
"""
Script untuk mengonversi data export percakapan ChatGPT (conversations.json / .zip)
menjadi catatan Markdown terstruktur di dalam Obsidian Vault.
"""

import os
import sys
import json
import glob
import zipfile
from datetime import datetime

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "ChatGPT")

def find_chatgpt_source():
    # 1. Cari file conversations.json langsung di Downloads/Desktop
    json_paths = [
        os.path.expanduser("~/Downloads/conversations.json"),
        os.path.expanduser("~/Downloads/*/conversations.json"),
        os.path.expanduser("~/Desktop/conversations.json"),
        os.path.join(VAULT_DIR, "conversations.json"),
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
    return clean[:60] if clean else "Untitled_ChatGPT_Chat"

def extract_messages_from_mapping(mapping):
    messages = []
    if not mapping:
        return messages

    # Kumpulkan pesan berdasarkan urutan create_time
    nodes = list(mapping.values())
    raw_msgs = []
    for node in nodes:
        msg = node.get("message")
        if msg and msg.get("content") and msg.get("content", {}).get("parts"):
            role = msg.get("author", {}).get("role", "")
            if role in ["user", "assistant"]:
                parts = msg.get("content", {}).get("parts", [])
                text_parts = [p for p in parts if isinstance(p, str) and p.strip()]
                if text_parts:
                    text = "\n".join(text_parts)
                    ctime = msg.get("create_time") or 0
                    raw_msgs.append((ctime, role, text))

    raw_msgs.sort(key=lambda x: x[0])
    return raw_msgs

def process_chatgpt_data(json_data_bytes):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    data = json.loads(json_data_bytes.decode('utf-8'))
    
    total_count = 0

    for chat in data:
        title = chat.get("title") or "Percakapan ChatGPT"
        create_time = chat.get("create_time") or 0
        
        try:
            dt = datetime.fromtimestamp(create_time)
            date_str = dt.strftime("%Y-%m-%d")
            time_str = dt.strftime("%H.%M")
            year = dt.strftime("%Y")
        except Exception:
            date_str = datetime.now().strftime("%Y-%m-%d")
            time_str = "00.00"
            year = datetime.now().strftime("%Y")

        file_name = f"{date_str} - {time_str} - {sanitize_filename(title)}.md"
        filepath = os.path.join(OUTPUT_DIR, file_name)

        md_content = []
        md_content.append("---")
        md_content.append(f'title: "{title}"')
        md_content.append("tags:")
        md_content.append("  - ai-chat")
        md_content.append("  - chatgpt")
        md_content.append(f"date: {date_str}")
        md_content.append(f"year: {year}")
        md_content.append("---\n")
        md_content.append(f"# 💬 {title}\n")
        md_content.append(f"**Tanggal:** `{date_str} {time_str}`  ")
        md_content.append(f"**Sumber:** ChatGPT Export  \n")
        md_content.append("---\n")

        mapping = chat.get("mapping", {})
        messages = extract_messages_from_mapping(mapping)
        
        for ctime, role, text in messages:
            if role == "user":
                md_content.append(f"### 👤 User:\n{text}\n")
            elif role == "assistant":
                md_content.append(f"### 🤖 ChatGPT:\n{text}\n")

        with open(filepath, "w", encoding="utf-8") as out:
            out.write("\n".join(md_content))
        total_count += 1

    print(f"✅ Berhasil mengimpor {total_count} percakapan ChatGPT ke:\n   {OUTPUT_DIR}")

if __name__ == "__main__":
    stype, spath = find_chatgpt_source()
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        arg = sys.argv[1]
        if arg.endswith('.zip'):
            stype, spath = 'zip', arg
        else:
            stype, spath = 'json', arg

    if stype == 'json':
        print(f"📖 Membaca data ChatGPT dari JSON: {spath}")
        with open(spath, 'rb') as f:
            process_chatgpt_data(f.read())
    elif stype == 'zip':
        print(f"📦 Membaca data ChatGPT dari file ZIP: {spath}")
        with zipfile.ZipFile(spath, 'r') as zf:
            json_bytes = zf.read('conversations.json')
            process_chatgpt_data(json_bytes)
    else:
        print("❌ File 'conversations.json' atau '.zip' export dari ChatGPT belum ditemukan di folder Downloads.")
        print("\nSilakan unduh Export Data dari ChatGPT:")
        print("1. Buka chatgpt.com -> Klik Foto Profil -> Settings -> Data Controls -> Export Data")
        print("2. Simpan file zip ke folder Downloads")
        print("3. Jalankan kembali script ini: python3 scripts/import_chatgpt_conversations.py")
