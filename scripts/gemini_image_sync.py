#!/usr/bin/env python3
import os
import sys
import time
import shutil
import json
import logging
from pathlib import Path

# Paths configuration
DOWNLOADS_DIR = Path.home() / "Downloads"
VAULT_DIR = Path("/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing")
TARGET_DIR = VAULT_DIR / "02 - Resources" / "Gemini Images"
LOG_FILE = VAULT_DIR / "scripts" / "gemini_sync.log"
TRACKING_FILE = TARGET_DIR / ".synced_log.json"

class FlushFileHandler(logging.FileHandler):
    def emit(self, record):
        super().emit(record)
        self.flush()

# Logging setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

file_handler = FlushFileHandler(LOG_FILE, encoding='utf-8')
file_handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s", datefmt="%Y-%m-%d %H:%M:%S"))
logger.addHandler(file_handler)

console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s", datefmt="%Y-%m-%d %H:%M:%S"))
logger.addHandler(console_handler)

VALID_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}

def load_synced_log():
    if TRACKING_FILE.exists():
        try:
            with open(TRACKING_FILE, "r") as f:
                return set(json.load(f))
        except Exception as e:
            logging.error(f"Failed to read tracking log: {e}")
    return set()

def save_synced_log(synced_set):
    try:
        with open(TRACKING_FILE, "w") as f:
            json.dump(list(synced_set), f, indent=2)
    except Exception as e:
        logging.error(f"Failed to save tracking log: {e}")

def is_gemini_image(file_path: Path) -> bool:
    if not file_path.is_file():
        return False
    if file_path.suffix.lower() not in VALID_EXTENSIONS:
        return False
    name_lower = file_path.name.lower()
    return "gemini" in name_lower

def is_file_ready(file_path: Path) -> bool:
    """Ensure file download is complete and file is not locked/writing."""
    if file_path.name.endswith((".crdownload", ".download", ".tmp")):
        return False
    try:
        initial_size = file_path.stat().st_size
        if initial_size == 0:
            return False
        time.sleep(0.3)
        return file_path.stat().st_size == initial_size
    except (OSError, FileNotFoundError):
        return False

def sync_gemini_images():
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    synced_set = load_synced_log()
    copied_count = 0

    try:
        files = list(DOWNLOADS_DIR.iterdir())
    except Exception as e:
        logging.error(f"Error reading downloads directory: {e}")
        return 0

    for file_path in files:
        if not is_gemini_image(file_path):
            continue

        try:
            st_size = file_path.stat().st_size
        except (OSError, FileNotFoundError):
            continue

        file_key = f"{file_path.name}_{st_size}"
        if file_key in synced_set:
            continue

        if is_file_ready(file_path):
            target_path = TARGET_DIR / file_path.name
            counter = 1
            while target_path.exists() and target_path.stat().st_size != st_size:
                stem = file_path.stem
                suffix = file_path.suffix
                target_path = TARGET_DIR / f"{stem}_{counter}{suffix}"
                counter += 1

            try:
                shutil.copy2(file_path, target_path)
                synced_set.add(file_key)
                save_synced_log(synced_set)
                copied_count += 1
                logging.info(f"Copied Gemini image: {file_path.name} -> {target_path.name}")
            except Exception as e:
                logging.error(f"Failed to copy {file_path.name}: {e}")

    return copied_count

def main():
    daemon_mode = "--once" not in sys.argv
    logging.info(f"Starting Gemini Image Sync Service (Daemon: {daemon_mode})...")

    copied = sync_gemini_images()
    if copied > 0:
        logging.info(f"Sync step complete. Copied {copied} new image(s).")

    if not daemon_mode:
        return

    logging.info("Watching ~/Downloads for new Gemini images...")
    while True:
        try:
            sync_gemini_images()
            time.sleep(3)
        except KeyboardInterrupt:
            logging.info("Gemini Image Sync stopped by user.")
            break
        except Exception as e:
            logging.error(f"Unexpected error in sync loop: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
