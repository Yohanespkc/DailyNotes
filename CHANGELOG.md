# Changelog

All notable changes to this vault repository and local AI daily report system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-08-04

### Added
- **Automated AI Conversation Recorder (`scripts/ai_chat_recorder.py`)**: Extractor and parser for Antigravity & AI coding tool session transcripts.
- **Dedicated Obsidian Notes for AI Chats**: Saves individual sessions under `01 - Notes/AI Conversations/YYYY-MM-DD/` with YAML frontmatter, tool invocations, user request overview, and cleaned dialogue transcript.
- **Master AI Conversation Index (`01 - Notes/AI Conversations/Index.md`)**: Automatically updated master log index of all AI conversations grouped by date.
- **Daily Note Integration**: Automatically appends `## 💬 Percakapan AI Hari Ini` section to daily progress reports (`05 - Daily Notes/Note Harian - YYYY-MM-DD.md`).
- **Workspace Customization Rule (`.agents/AGENTS.md`)**: Configured workspace-level rule to ensure auto-sync of AI conversations to Obsidian.

### Changed
- **Daily Report Generator (`daily_report_generator.py`)**: Updated to automatically trigger `ai_chat_recorder.py` during report generation.
- **Schedule**: Updated daily report execution time to **18:00 (6:00 PM)**.

## [1.2.0] - 2026-08-03

### Added
- **YouTube Video Clipper Feature (✂️)**: Added Ribbon icon button and Command Palette action `"Potong Video YouTube (Trim MP4 + AI Summary)"`.
- **Exact Segment MP4 Clipping**: Configured `yt-dlp` with `--download-sections` and `--force-keyframes-at-cuts` to download only exact timestamp segments (e.g. 0:00 - 0:42, ~2.2MB).
- **Transcript-Based AI Summaries**: Integrated `fetchTranscriptForSegment()` to extract spoken subtitles for the cut segment and feed actual transcript text to local LLM models (`gemma4`, `gasing-tutor`, `qwen`).
- **Electron FFmpeg PATH Resolution**: Added `--ffmpeg-location` and custom `PATH` environment variables to `exec()` for seamless execution inside Obsidian GUI on macOS.

### Changed
- **Output Storage Path**: Consolidated video clip destination path from `/video/` to `02 - Resources/Videos/potongan video/`.
- **Single Video Player Display**: Removed duplicate iframe embed so notes present only a single local `.mp4` video player (`![[02 - Resources/Videos/potongan video/clip_...mp4]]`).

## [1.1.0] - 2026-08-03

### Added
- **Local AI Daily Progress Report Automation**: Integrated Python generator script `daily_report_generator.py` configured to run at 20:00 daily via `crontab`.
- **Daily Report Note (`2026-08-03.md`)**: Created initial report note under `05 - Daily Notes/` covering activity from 2026-08-02 to 2026-08-03 morning.
- **Documentation**: Added repository `README.md` and `CHANGELOG.md` for tracking structural updates.

### Changed
- Configured report output targets directly to Obsidian Vault folder `05 - Daily Notes/`.
