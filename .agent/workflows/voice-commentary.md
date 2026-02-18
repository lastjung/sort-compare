---
description: How to add natural voice commentary to videos using Edge TTS and FFmpeg
---

# Voice Commentary Workflow

Add voice commentary to sorting race videos. The commentary text and timestamps come from the app's LIVE COMMENTARY panel.

## Prerequisites

1.  **FFmpeg**: Must be installed (`brew install ffmpeg`).
2.  **Edge TTS**: Must be installed (`pip install edge-tts`).

## Step-by-Step Guide

### 1. Run the Race (Auto-Saves Commentary)

Run the sorting race with Tournament Mode ON. When the race finishes, the app automatically saves commentary logs to `tube/commentary_YYYYMMDD_HHMM.json`.

The saved file contains exact timestamps and text:

```json
{
  "createdAt": "2026-02-18T18:09:03.000Z",
  "logs": [
    {
      "time": "1.0s",
      "text": "🏁 Race Started! 8 Contenders fighting for glory!",
      "type": "start"
    },
    {
      "time": "53.7s",
      "text": "🥇 Quick Sort takes the GOLD! Incredible speed!",
      "type": "finish-1"
    }
  ]
}
```

> **TIP**: Always use the **latest** `commentary_*.json` file in `tube/`. Check with: `ls -lt tube/commentary_*.json | head -1`

### 2. Create the Voice Script in `tube/`

Create a shell script inside the **`tube/`** folder (e.g., `tube/add_voice_HHMM.sh`).

**Template:**

```bash
#!/bin/bash

# Configuration - paths are relative to PROJECT ROOT
VIDEO_FILE="tube/YOUR_VIDEO.webm"
OUTPUT_FILE="tube/YOUR_VIDEO_final.webm"
TEMP_DIR="temp_audio"

mkdir -p "$TEMP_DIR"

# --- Generate Audio (fill in from LIVE COMMENTARY) ---

# 1. Start (0s)
edge-tts --voice en-US-AndrewMultilingualNeural --text "Race Started! 8 Contenders fighting for glory!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Intermediate (10s)
edge-tts --voice en-US-AndrewMultilingualNeural --text "Looks like Quick Sort and Merge Sort are pulling ahead as expected!" --write-media "$TEMP_DIR/02_mid.mp3"

# 3. 1st Place (e.g., 53.7s - READ FROM LIVE COMMENTARY)
edge-tts --voice en-US-AndrewMultilingualNeural --text "Quick Sort takes the GOLD! Incredible speed!" --write-media "$TEMP_DIR/03_first.mp3"

# 4. 2nd Place (e.g., 62.3s)
edge-tts --voice en-US-AndrewMultilingualNeural --text "Merge Sort takes Silver! Just missed it!" --write-media "$TEMP_DIR/04_second.mp3"

# --- Merge with Video ---
# amix inputs = 1 (original audio) + N (commentary tracks)

ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_mid.mp3" \
    -i "$TEMP_DIR/03_first.mp3" \
    -i "$TEMP_DIR/04_second.mp3" \
    -filter_complex \
    "[1]adelay=0|0[a1]; \
     [2]adelay=10000|10000[a2]; \
     [3]adelay=53700|53700[a3]; \
     [4]adelay=62300|62300[a4]; \
     [0:a][a1][a2][a3][a4]amix=inputs=5[aout]" \
    -map 0:v -map "[aout]" \
    -c:v copy -c:a libvorbis \
    "$OUTPUT_FILE"

rm -rf "$TEMP_DIR"
echo "Done! Created $OUTPUT_FILE"
```

### 3. Run the Script (from project root)

```bash
chmod +x tube/add_voice_HHMM.sh
./tube/add_voice_HHMM.sh
```

> **WARNING**: Always run from the **project root** (`sort-compare/`), NOT from inside `tube/`. The `VIDEO_FILE` path is relative to root.

## Tips

- **Timestamps:** Read exact seconds from the LIVE COMMENTARY panel in the video.
- **Video Length:** Check with `ffmpeg -i tube/video.webm` to avoid commentary past the end.
- **amix inputs:** Must equal 1 (original) + number of commentary tracks. If you have 4 tracks, set `inputs=5`.
- **Natural Voice Options:**
  - `en-US-AndrewMultilingualNeural` (Male, Most Natural - DEFAULT)
  - `en-US-EmmaMultilingualNeural` (Female, Most Natural)
  - `en-US-JennyNeural` (Female, Friendly)
  - `ko-KR-SunHiNeural` (Korean, Standard Female)
  - `en-US-ChristopherNeural` (Male, Pro Caster Style)
