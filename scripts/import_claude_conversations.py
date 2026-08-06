#!/usr/bin/env python3
"""
Script untuk mengonversi data export percakapan Claude (conversations.json) 
menjadi catatan Markdown terstruktur di dalam Obsidian Vault.
"""

import os
import sys
import json
import glob
from datetime import datetime

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "Claude")

def find_conversations_json():
    # Cari di folder Downloads, Desktop, atau folder script saat ini
    search_paths = [
        os.path.expanduser("~/Downloads/conversations.json"),
        os.path.expanduser("~/Downloads/*/conversations.json"),
        os.path.expanduser("~/Desktop/conversations.json"),
        os.path.join(VAULT_DIR, "conversations.json"),
        os.path.join(VAULT_DIR, "scripts", "conversations.json"),
    ]
    for p in search_paths:
        matches = glob.glob(p)
        if matches:
            return matches[0]
    return None

def sanitize_filename(title):
    clean = "".join(c for c in title if c.isalnum() or c in (" ", "_", "-")).strip()
    return clean[:60] if clean else "Untitled_Claude_Chat"

def process_claude_export(json_path):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for chat in data:
        name = chat.get("name") or "Percakapan Claude"
        created_at_str = chat.get("created_at", "")
        
        try:
            dt = datetime.fromisoformat(created_at_str.replace("Z", "+00:00"))
            date_str = dt.strftime("%Y-%m-%d")
            time_str = dt.strftime("%H.%M")
        except Exception:
            date_str = datetime.now().strftime("%Y-%m-%d")
            time_str = "00.00"

        file_name = f"{date_str} - {time_str} - {sanitize_filename(name)}.md"
        filepath = os.path.join(OUTPUT_DIR, file_name)

        md_content = []
        md_content.append("---")
        md_content.append(f'title: "{name}"')
        md_content.append("tags:")
        md_content.append("  - ai-chat")
        md_content.append("  - claude")
        md_content.append(f"date: {date_str}")
        md_content.append("---\n")
        md_content.append(f"# 💬 {name}\n")
        md_content.append(f"**Tanggal:** `{date_str} {time_str}`  ")
        md_content.append(f"**Sumber:** Claude Desktop / Claude.ai\n")
        md_content.append("---\n")

        messages = chat.get("chat_messages", [])
        for msg in messages:
            sender = msg.get("sender", "unknown")
            text = msg.get("text", "")
            
            # Format pesan
            if sender == "human":
                md_content.append(f"### 👤 User:\n{text}\n")
            elif sender == "assistant":
                md_content.append(f"### 🤖 Claude:\n{text}\n")
            else:
                md_content.append(f"### 💬 {sender.capitalize()}:\n{text}\n")

        with open(filepath, "w", encoding="utf-8") as out:
            out.write("\n".join(md_content))
        count += 1

    print(f"✅ Sukses mengonversi {count} percakapan Claude ke Obsidian di folder:\n   {OUTPUT_DIR}")

if __name__ == "__main__":
    target = find_conversations_json()
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        target = sys.argv[1]
    
    if not target:
        print("❌ File 'conversations.json' tidak ditemukan!")
        print("Silakan letakkan file 'conversations.json' dari export Claude.ai di folder Downloads atau jalankan:")
        print("   python3 scripts/import_claude_conversations.py /path/ke/conversations.json")
    else:
        print(f"📖 Membaca data dari: {target}")
        process_claude_export(target)
