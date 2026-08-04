# Workspace Rules - AI Conversation Recording to Obsidian

## Rule: Auto-Sync AI Conversations to Obsidian

Whenever an AI session is completed or when creating/updating daily progress reports:
1. Ensure `python3 scripts/ai_chat_recorder.py` is executed for the active date.
2. Store AI conversation notes inside `01 - Notes/AI Conversations/YYYY-MM-DD/`.
3. Update `01 - Notes/AI Conversations/Index.md` with links to all recorded AI chat sessions.
4. Ensure the daily note (`05 - Daily Notes/Note Harian - YYYY-MM-DD.md`) contains the updated `## 💬 Percakapan AI Hari Ini` section.
