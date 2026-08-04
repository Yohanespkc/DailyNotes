# Obsidian Vault & AI Progress Report Generator

System and vault structure for tracking local AI coding activities, educational projects, video trimming tools, AI conversation notes, and daily progress reports in Obsidian.

## 📁 Vault Directory Structure

```
.
├── .agents/              # Workspace AI rules (AGENTS.md)
├── 00 - Dashboards/      # Centralized project dashboards and tracking views
├── 01 - Notes/           # Core knowledge base and subject notes
│   └── AI Conversations/ # Automated notes of all AI coding sessions by date
│       ├── Index.md      # Master index of all recorded AI conversations
│       └── YYYY-MM-DD/   # Individual session notes for each day
├── 02 - Resources/       # Learning materials, video transcripts, and references
│   └── Videos/
│       └── potongan video/ # Trimmed MP4 video clips (e.g., 0:00 - 0:42)
├── 03 - Templates/       # Obsidian Templater templates
├── 04 - Archive/         # Archived notes and historical records
├── 05 - Daily Notes/     # Automated daily progress reports & AI chat links
├── Excalidraw/           # Interactive Excalidraw diagrams and visual notes
└── scripts/              # Python automation scripts & report generators
```

## 💬 Automated AI Conversation Recorder to Obsidian

Automated system for parsing and converting all AI coding sessions (Antigravity & AI coding tools) into dedicated, beautifully structured Obsidian markdown notes.

### Key Features
- **Individual Session Notes**: Each AI session is saved under `01 - Notes/AI Conversations/YYYY-MM-DD/YYYY-MM-DD - HH.MM - [Topic].md`.
- **Structured Metadata**: Includes YAML frontmatter, Session ID, Date/Time, list of tools invoked, main user requests, and formatted dialogue.
- **Master Index Note**: Automatically updates `01 - Notes/AI Conversations/Index.md` with links grouped by date.
- **Daily Note Integration**: Appends `## 💬 Percakapan AI Hari Ini` section to `05 - Daily Notes/Note Harian - YYYY-MM-DD.md` linking all sessions of the day.

---

## ✂️ YouTube Video Clipper & Precise AI Summary Feature

Obsidian plugin feature to trim YouTube video segments and generate accurate segment-level AI summaries.

### Highlights
- **Ribbon Icon (✂️) & Command**: `"Potong Video YouTube (Trim MP4 + AI Summary)"`.
- **Fast Segment Clipping**: Downloads only the specified time segment (e.g. `0:00` to `0:42`) into lightweight `.mp4` files using `yt-dlp --download-sections --force-keyframes-at-cuts`.
- **Saved Directory**: Automatically stored in `02 - Resources/Videos/potongan video/`.
- **Transcript-Based AI Summaries**: Automatically extracts auto-captions/subtitles for the cut duration and feeds exact spoken text to local LLM models (`gemma4`, `gasing-tutor`, `qwen`) for 100% accurate, non-hallucinated summaries.
- **Clean Single Player Embed**: Renders a single local `.mp4` video player in markdown without double iframe players.
- **Electron FFmpeg PATH Resolution**: Resolves Homebrew `/opt/homebrew/bin/ffmpeg` path execution inside Obsidian GUI.

---

## 🤖 Automated Daily Progress Report Workflow

All AI coding activities across local projects (Antigravity IDE, web apps, educational games, stock projects, and Obsidian notes) are tracked and synthesized into daily notes stored under `05 - Daily Notes/Note Harian - YYYY-MM-DD.md`.

### Features
- **Daily Execution**: Automated via `cron` scheduler every day at **18:00 (6:00 PM)**.
- **Report Template**: Structured into four main sections matching standard executive progress reports:
  1. `1 Summary`: High-level overview of accomplishments, AI app builds, and Git activity in the last 24 hours.
  2. `2 Suggestions`: Technical debt recommendations, uncommitted repository changes, and focus areas.
  3. `3 Critique`: Critical analysis of velocity, context switching, test coverage, and documentation.
  4. `4 Conclusion`: Strategic outcomes and top priorities for the next day.
  5. `## 💬 Percakapan AI Hari Ini`: Complete indexed list of all AI chat sessions recorded during the day.

---

## 🛠️ Usage & Automation Scripts

To manually trigger the daily report and AI chat recorder for any given date:

```bash
# Record AI Conversations for today or specific date:
python3 scripts/ai_chat_recorder.py [YYYY-MM-DD]

# Run Full Daily Report Generator + AI Chat Recorder:
python3 scripts/daily_report_generator.py [YYYY-MM-DD]
```
