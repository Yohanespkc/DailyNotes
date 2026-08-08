#!/usr/bin/env python3
"""
Script untuk mengonversi data export percakapan Gemini dari Google Takeout (MyActivity.json / .zip)
menjadi catatan Markdown terstruktur di dalam Obsidian Vault.
"""

import os
import sys
import json
import glob
import re
import zipfile
from datetime import datetime

VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(VAULT_DIR, "01 - Notes", "AI Conversations", "Gemini")

def find_gemini_source():
    # 1. Cari file MyActivity.json / My Activity.json langsung di Downloads/Desktop/Vault
    json_paths = [
        os.path.expanduser("~/Downloads/MyActivity.json"),
        os.path.expanduser("~/Downloads/My Activity.json"),
        os.path.expanduser("~/Downloads/*/MyActivity.json"),
        os.path.expanduser("~/Downloads/*/My Activity.json"),
        os.path.expanduser("~/Downloads/Takeout/My Activity/Gemini Apps/MyActivity.json"),
        os.path.expanduser("~/Downloads/Takeout/My Activity/Gemini Apps/My Activity.json"),
        os.path.expanduser("~/Desktop/MyActivity.json"),
        os.path.expanduser("~/Desktop/My Activity.json"),
        os.path.join(VAULT_DIR, "MyActivity.json"),
        os.path.join(VAULT_DIR, "My Activity.json"),
    ]
    for p in json_paths:
        matches = glob.glob(p)
        if matches:
            return ("json", matches[0])
            
    # 2. Cari file export .zip (Google Takeout) di Downloads / Desktop
    zip_paths = [
        os.path.expanduser("~/Downloads/*.zip"),
        os.path.expanduser("~/Desktop/*.zip"),
    ]
    for zp_pattern in zip_paths:
        for zp in glob.glob(zp_pattern):
            try:
                with zipfile.ZipFile(zp, 'r') as zf:
                    for name in zf.namelist():
                        if name.endswith("MyActivity.json") or name.endswith("My Activity.json"):
                            if "gemini" in name.lower():
                                return ("zip", (zp, name))
            except Exception:
                pass
    return (None, None)

def sanitize_filename(title):
    clean = "".join(c for c in title if c.isalnum() or c in (" ", "_", "-")).strip()
    return clean[:60] if clean else "Untitled_Gemini_Chat"

def clean_html(text):
    if not text:
        return ""
    # Ganti tag <br> atau <br/> dengan baris baru
    text = re.sub(r'<br\s*/?>', '\n', text)
    # Hapus seluruh tag HTML lainnya
    text = re.sub(r'<[^>]+>', '', text)
    # Unescape HTML entities
    import html
    text = html.unescape(text)
    return text.strip()

def process_gemini_data(json_data_bytes):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    try:
        data = json.loads(json_data_bytes.decode('utf-8'))
    except Exception as e:
        print(f"❌ Gagal mem-parse JSON data: {e}")
        return 0

    # Kelompokkan entri aktivitas berdasarkan conversation ID (dari titleUrl)
    conversations = {}
    
    for entry in data:
        # Google Takeout Gemini format
        title = entry.get("title", "")
        title_url = entry.get("titleUrl", "")
        time_str = entry.get("time", "")
        details = entry.get("details", [])
        
        # Ekstrak conversation ID dari titleUrl
        # Contoh: https://gemini.google.com/app/c/12345abcdef
        match = re.search(r'/app/c/([a-zA-Z0-9_\-]+)', title_url)
        conv_id = match.group(1) if match else "unknown_conversation"
        
        # Ekstrak isi teks obrolan
        content = ""
        if details and isinstance(details, list):
            for d in details:
                if isinstance(d, dict) and "value" in d:
                    content = d["value"]
                    break
        if not content:
            # Fallback ke title
            content = title
            
        content = clean_html(content)
        
        # Tentukan peran (User vs Gemini)
        is_response = False
        if "responded" in title.lower() or "gemini response" in title.lower() or "jawaban gemini" in title.lower():
            is_response = True
        if details and isinstance(details, list):
            for d in details:
                if isinstance(d, dict) and d.get("name") in ["Response", "Model Response", "Jawaban"]:
                    is_response = True
                    
        role = "assistant" if is_response else "user"
        
        # Simpan ke conversation
        if conv_id not in conversations:
            conversations[conv_id] = []
            
        conversations[conv_id].append({
            "time": time_str,
            "role": role,
            "text": content,
            "title": title
        })

    total_imported = 0

    # Tulis setiap percakapan ke file Markdown
    for conv_id, messages in conversations.items():
        if not messages:
            continue
            
        # Urutkan secara kronologis
        messages.sort(key=lambda x: x["time"])
        
        # Ambil metadata dari pesan pertama
        first_msg = messages[0]
        first_time_str = first_msg["time"]
        
        # Parsing tanggal dan waktu
        # Format Takeout biasanya: 2026-08-08T12:00:00.000Z
        try:
            # Hilangkan bagian milidetik dan Z untuk kemudahan parsing
            clean_time = re.sub(r'\.\d+Z$', 'Z', first_time_str)
            if clean_time.endswith('Z'):
                dt = datetime.strptime(clean_time, "%Y-%m-%dT%H:%M:%SZ")
            else:
                dt = datetime.fromisoformat(clean_time)
            date_str = dt.strftime("%Y-%m-%d")
            time_str = dt.strftime("%H.%M")
            year = dt.strftime("%Y")
        except Exception:
            date_str = datetime.now().strftime("%Y-%m-%d")
            time_str = "00.00"
            year = datetime.now().strftime("%Y")

        # Cari topik utama untuk judul file
        # Prioritaskan prompt user pertama
        title_text = ""
        for m in messages:
            if m["role"] == "user":
                title_text = m["text"].split('\n')[0]
                break
        if not title_text:
            title_text = f"Percakapan Gemini {conv_id[:8]}"
            
        # Potong judul agar tidak terlalu panjang
        title_text = title_text[:50]
        file_name = f"{date_str} - {time_str} - {sanitize_filename(title_text)}.md"
        filepath = os.path.join(OUTPUT_DIR, file_name)

        md_content = []
        md_content.append("---")
        md_content.append(f'title: "{title_text}"')
        md_content.append("tags:")
        md_content.append("  - ai-chat")
        md_content.append("  - gemini")
        md_content.append(f"date: {date_str}")
        md_content.append(f"year: {year}")
        md_content.append(f'session_id: "{conv_id}"')
        md_content.append("---\n")
        md_content.append(f"# 💬 {title_text}\n")
        md_content.append(f"**Tanggal:** `{date_str} {time_str}`  ")
        md_content.append(f"**Sumber:** Gemini Export (Google Takeout)  \n")
        md_content.append("---\n")

        for msg in messages:
            text = msg["text"]
            if msg["role"] == "user":
                md_content.append(f"### 👤 User:\n{text}\n")
            else:
                md_content.append(f"### 🤖 Gemini:\n{text}\n")

        with open(filepath, "w", encoding="utf-8") as out:
            out.write("\n".join(md_content))
        total_imported += 1

    return total_imported

if __name__ == "__main__":
    stype, spath = find_gemini_source()
    
    # Izinkan argument path kustom
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        arg = sys.argv[1]
        if arg.endswith('.zip'):
            stype = 'zip'
            spath = (arg, None)  # Cari file JSON di dalam zip secara dinamis
        else:
            stype = 'json'
            spath = arg

    total_imported = 0
    if stype == 'json':
        print(f"📖 Membaca data Gemini dari JSON: {spath}")
        with open(spath, 'rb') as f:
            total_imported = process_gemini_data(f.read())
    elif stype == 'zip':
        zip_path, json_entry_name = spath
        print(f"📦 Membaca data Gemini dari file ZIP Takeout: {zip_path}")
        with zipfile.ZipFile(zip_path, 'r') as zf:
            if json_entry_name is None:
                # Cari entry secara dinamis jika tidak diberikan
                for name in zf.namelist():
                    if name.endswith("MyActivity.json") or name.endswith("My Activity.json"):
                        if "gemini" in name.lower():
                            json_entry_name = name
                            break
            
            if json_entry_name:
                print(f"   -> Mengekstrak {json_entry_name}...")
                json_bytes = zf.read(json_entry_name)
                total_imported = process_gemini_data(json_bytes)
            else:
                print("❌ Gagal menemukan file 'MyActivity.json' di dalam ZIP.")
    
    if total_imported > 0:
        print(f"✅ Berhasil mengimpor {total_imported} percakapan Gemini ke:\n   {OUTPUT_DIR}")
    else:
        print("❌ File export dari Gemini belum ditemukan di folder Downloads.")
        print("\nSilakan unduh Export Data dari Google Takeout:")
        print("1. Buka takeout.google.com -> Deselect All -> Check 'My Activity'")
        print("2. Klik 'All activity data included' -> Pilih HANYA 'Gemini Apps'")
        print("3. Ubah format dari HTML ke JSON, lalu unduh file ZIP")
        print("4. Simpan file zip ke folder Downloads")
        print("5. Jalankan kembali script ini: python3 scripts/import_gemini_conversations.py")
