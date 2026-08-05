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

# Logging setup
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
console = logging.StreamHandler(sys.stdout)
console.setLevel(logging.INFO)
logging.getLogger().addHandler(console)

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
    # Check if filename contains 'gemini' or starts with typical Gemini download prefix
    if "gemini" in name_lower:
        return True
    return False

def is_file_ready(file_path: Path) -> bool:
    """Ensure file download is complete and file is not locked/writing."""
    # Ignore temporary download files
    if file_path.name.endswith((".crdownload", ".download", ".tmp")):
        return False
    try:
        initial_size = file_path.stat().st_size
        if initial_size == 0:
            return False
        time.sleep(0.5)
        return file_path.stat().st_size == initial_size
    except (OSError, FileNotFoundError):
        return False

def sync_gemini_images():
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    synced_set = load_synced_log()
    copied_count = 0

    for file_path in DOWNLOADS_DIR.iterdir():
        if is_gemini_image(file_path) and is_file_ready(file_path):
            file_key = f"{file_path.name}_{file_path.stat().st_size}"
            if file_key in synced_set:
                continue

            target_path = TARGET_DIR / file_path.name
            # Handle collision if file already exists in target
            counter = 1
            while target_path.exists() and target_path.stat().st_size != file_path.stat().st_size:
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

    # Initial sync
    copied = sync_gemini_images()
    logging.info(f"Initial sync complete. Copied {copied} new image(s).")

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
