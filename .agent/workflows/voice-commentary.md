---
description: How to add natural voice commentary to videos using Edge TTS and FFmpeg
---

# Voice Commentary Workflow

This guide explains how to add professional-sounding voice commentary to your videos.

## Prerequisites

1.  **FFmpeg**: Must be installed (`brew install ffmpeg`).
2.  **Edge TTS**: Must be installed (`pip install edge-tts`).
    - Check with: `edge-tts --version`

## Step-by-Step Guide

### 1. Create a Commentary Script

Create a shell script (e.g., `update_voice.sh`) in your project folder. This script will generate the audio and merge it.

**Example Template:**

```bash
#!/bin/bash

# Configuration
VIDEO_FILE="path/to/your_video.webm"
TEMP_DIR="temp_audio"

# Create temp directory
mkdir -p "$TEMP_DIR"

# --- Generate Audio ---
# Use Edge TTS for natural voice (e.g., en-US-ChristopherNeural)
# Adjust timestamps in the merge step below!

# 1. Start
edge-tts --voice en-US-ChristopherNeural --text "Race Started! Good luck!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Middle Event
edge-tts --voice en-US-ChristopherNeural --text "Look at them go!" --write-media "$TEMP_DIR/02_mid.mp3"

# --- Merge with Video ---
# Timestamps are in milliseconds (e.g., 10000 = 10s)

ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_mid.mp3" \
    -filter_complex \
    "[1]adelay=0|0[a1]; \
     [2]adelay=10000|10000[a2]; \
     [0:a][a1][a2]amix=inputs=3[aout]" \
    -map 0:v -map "[aout]" \
    -c:v copy -c:a libvorbis \
    "temp_output.webm"

# --- Overwrite Original ---
mv "temp_output.webm" "$VIDEO_FILE"

# Cleanup
rm -rf "$TEMP_DIR"

echo "Updated $VIDEO_FILE with voice commentary!"
```

### 2. Run the Script

Make the script executable and run it:

```bash
chmod +x update_voice.sh
./update_voice.sh
```

## Tips

- **Timestamps:** Provide timestamps exactly where you want the audio to start.
- **Video Length:** Always check your video length (`ffmpeg -i video.webm`) to ensure your commentary doesn't go past the end.
- **Voice Options:**
  - `en-US-ChristopherNeural` (Male, Professional/Caster style)
  - `en-US-AriaNeural` (Female, Clear)
  - `ko-KR-SunHiNeural` (Korean, Female)
  - `ko-KR-InJoonNeural` (Korean, Male)
