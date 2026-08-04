#!/usr/bin/env python3
import os
import sys
import json
import glob
import re
import time
from datetime import datetime

PRIMARY_VAULT_DIR = "/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing"
ICLOUD_VAULT_DIR = "/Users/yohanessurya/Library/Mobile Documents/com~apple~CloudDocs/Documents/Obsidian Vault"
BRAIN_DIR = os.path.expanduser("~/.gemini/antigravity-ide/brain")

AI_NOTES_REL_DIR = "01 - Notes/AI Conversations"
DAILY_NOTES_REL_DIR = "05 - Daily Notes"

def sanitize_filename(name):
    name = re.sub(r'[\\/*?:"<>|]', '', name)
    name = name.replace('\n', ' ').replace('\r', '').strip()
    if len(name) > 60:
        name = name[:60].rstrip() + "..."
    return name or "AI Session"

def clean_user_text(text):
    if not isinstance(text, str):
        return ""
    if '<USER_REQUEST>' in text:
        try:
            text = text.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0]
        except IndexError:
            pass
    text = re.sub(r'<ADDITIONAL_METADATA>.*?</ADDITIONAL_METADATA>', '', text, flags=re.DOTALL)
    text = re.sub(r'<USER_SETTINGS_CHANGE>.*?</USER_SETTINGS_CHANGE>', '', text, flags=re.DOTALL)
    text = re.sub(r'<EPHEMERAL_MESSAGE>.*?</EPHEMERAL_MESSAGE>', '', text, flags=re.DOTALL)
    return text.strip()

def parse_transcript(log_file):
    dialogue = []
    user_requests = []
    tools_used = set()
    start_time = None
    end_time = None

    if not os.path.exists(log_file):
        return None

    mtime = os.path.getmtime(log_file)
    end_time = datetime.fromtimestamp(mtime).strftime("%H:%M:%S")

    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    for line in lines:
        try:
            data = json.loads(line)
        except Exception:
            continue

        source = data.get('source')
        stype = data.get('type')
        content = data.get('content', '')
        tool_calls = data.get('tool_calls', [])

        for tc in tool_calls:
            tname = tc.get('name') or tc.get('function', {}).get('name')
            if tname:
                tools_used.add(tname)

        if stype == 'USER_INPUT' and source == 'USER_EXPLICIT':
            cleaned = clean_user_text(str(content))
            if cleaned:
                user_requests.append(cleaned)
                dialogue.append(('USER', cleaned))
        elif stype == 'PLANNER_RESPONSE' and source == 'MODEL':
            if isinstance(content, str) and content.strip():
                # Filter out pure system instruction echoes if needed
                text = content.strip()
                dialogue.append(('AI', text))

    if not dialogue:
        return None

    first_req = user_requests[0] if user_requests else "AI Conversation Session"
    title = first_req.split('\n')[0]
    title = sanitize_filename(title)

    return {
        'title': title,
        'user_requests': user_requests,
        'tools_used': sorted(list(tools_used)),
        'dialogue': dialogue,
        'end_time': end_time,
        'mtime': mtime
    }

def record_sessions_for_date(target_date_str=None):
    if not target_date_str:
        target_date_str = datetime.now().strftime("%Y-%m-%d")

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Processing AI Conversations for date: {target_date_str}")

    target_primary_dir = os.path.join(PRIMARY_VAULT_DIR, AI_NOTES_REL_DIR, target_date_str)
    os.makedirs(target_primary_dir, exist_ok=True)

    target_icloud_dir = os.path.join(ICLOUD_VAULT_DIR, AI_NOTES_REL_DIR, target_date_str)
    try:
        os.makedirs(target_icloud_dir, exist_ok=True)
    except Exception:
        pass

    sessions = []

    for uuid_dir in glob.glob(os.path.join(BRAIN_DIR, '*')):
        log_file = os.path.join(uuid_dir, '.system_generated', 'logs', 'transcript.jsonl')
        if not os.path.exists(log_file):
            continue

        mtime = os.path.getmtime(log_file)
        session_date = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")
        if session_date != target_date_str:
            continue

        uuid = os.path.basename(uuid_dir)
        parsed = parse_transcript(log_file)
        if not parsed:
            continue

        parsed['uuid'] = uuid
        parsed['start_time'] = datetime.fromtimestamp(mtime).strftime("%H.%M")
        sessions.append(parsed)

    sessions.sort(key=lambda x: x['mtime'])

    created_notes = []

    for s in sessions:
        file_title = f"{target_date_str} - {s['start_time']} - {s['title']}.md"
        primary_filepath = os.path.join(target_primary_dir, file_title)
        icloud_filepath = os.path.join(target_icloud_dir, file_title)

        tools_str = ", ".join([f"`{t}`" for t in s['tools_used']]) if s['tools_used'] else "None"
        req_list_md = "\n".join([f"- {req.splitlines()[0]}" for req in s['user_requests']])

        dialogue_md_list = []
        for speaker, text in s['dialogue']:
            if speaker == 'USER':
                dialogue_md_list.append(f"### 👤 User\n\n{text}\n")
            else:
                dialogue_md_list.append(f"### 🤖 AI Agent (Antigravity)\n\n{text}\n")

        dialogue_content = "\n---\n\n".join(dialogue_md_list)

        note_content = f"""---
title: "{s['title']}"
date: {target_date_str}
time: "{s['start_time']}"
ai_tool: "Antigravity AI Agent"
session_id: "{s['uuid']}"
tags:
  - ai-chat
  - antigravity
  - obsidian-note
---

# 💬 AI Conversation: {s['title']}

> [!INFO] Metadata Session
> - **Date & Time**: {target_date_str} {s['start_time']}
> - **AI Tool**: Antigravity (Gemini AI Agent)
> - **Session ID**: `{s['uuid']}`
> - **Tools Used**: {tools_str}
> - **Total Requests**: {len(s['user_requests'])}

## 📌 Topik & Request Utama
{req_list_md}

## 📜 Transkrip Percakapan

{dialogue_content}

---

## 🔗 References & Links
- **Daily Note**: [[Note Harian - {target_date_str}]]
- **Index**: [[01 - Notes/AI Conversations/Index|Index AI Conversations]]
"""

        with open(primary_filepath, "w", encoding="utf-8") as f:
            f.write(note_content)

        try:
            with open(icloud_filepath, "w", encoding="utf-8") as f:
                f.write(note_content)
        except Exception:
            pass

        created_notes.append({
            'title': s['title'],
            'time': s['start_time'],
            'uuid': s['uuid'],
            'rel_path': f"{AI_NOTES_REL_DIR}/{target_date_str}/{file_title[:-3]}",
            'filename': file_title
        })

    # Update Index Note
    update_index_note(target_date_str, created_notes)

    # Update Daily Note
    update_daily_note(target_date_str, created_notes)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Successfully created {len(created_notes)} AI conversation notes for {target_date_str}!")
    return created_notes

def update_index_note(target_date_str, created_notes):
    index_file = os.path.join(PRIMARY_VAULT_DIR, AI_NOTES_REL_DIR, "Index.md")
    os.makedirs(os.path.dirname(index_file), exist_ok=True)

    header = """---
title: "Index AI Conversations"
tags:
  - ai-chat
  - index
---

# 🤖 Index Percakapan AI (AI Conversations Log)

Catatan otomatis seluruh rekaman percakapan dengan AI (Antigravity / AI Coding Tools).

"""

    existing_content = ""
    if os.path.exists(index_file):
        with open(index_file, "r", encoding="utf-8") as f:
            existing_content = f.read()

    new_section = f"## 📅 {target_date_str}\n\n"
    for n in created_notes:
        new_section += f"- **[{n['time']}]** [[{n['filename'][:-3]}|{n['title']}]] *(ID: `{n['uuid'][:8]}`)*\n"
    new_section += "\n"

    if f"## 📅 {target_date_str}" in existing_content:
        # Replace existing date section
        pattern = re.compile(rf"## 📅 {target_date_str}\n\n.*?(?=\n## 📅 |\Z)", re.DOTALL)
        updated = pattern.sub(new_section.strip() + "\n\n", existing_content)
    else:
        if "# 🤖 Index Percakapan AI (AI Conversations Log)" in existing_content:
            parts = existing_content.split("# 🤖 Index Percakapan AI (AI Conversations Log)\n\n")
            updated = parts[0] + "# 🤖 Index Percakapan AI (AI Conversations Log)\n\n" + parts[1] + "\n" + new_section
        else:
            updated = header + new_section

    with open(index_file, "w", encoding="utf-8") as f:
        f.write(updated)

def update_daily_note(target_date_str, created_notes):
    daily_dir = os.path.join(PRIMARY_VAULT_DIR, DAILY_NOTES_REL_DIR)
    daily_file1 = os.path.join(daily_dir, f"{target_date_str}.md")
    daily_file2 = os.path.join(daily_dir, f"Note Harian - {target_date_str}.md")

    ai_section = "\n## 💬 Percakapan AI Hari Ini\n\n"
    for n in created_notes:
        ai_section += f"- **[{n['time']}]** [[{n['filename'][:-3]}|{n['title']}]]\n"
    ai_section += "\n"

    for dfile in [daily_file1, daily_file2]:
        if os.path.exists(dfile):
            with open(dfile, "r", encoding="utf-8") as f:
                content = f.read()

            if "## 💬 Percakapan AI Hari Ini" in content:
                pattern = re.compile(r"## 💬 Percakapan AI Hari Ini\n\n.*?(?=\n## |\Z)", re.DOTALL)
                content = pattern.sub(ai_section.strip() + "\n\n", content)
            else:
                content += "\n" + ai_section

            with open(dfile, "w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    date_arg = sys.argv[1] if len(sys.argv) > 1 else None
    record_sessions_for_date(date_arg)
