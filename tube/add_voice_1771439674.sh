#!/bin/bash

# Configuration
VIDEO_FILE="tube/smart-record_2026-02-18T18-09-03.webm"
TEMP_DIR="temp_audio"

# Create temp directory
mkdir -p "$TEMP_DIR"

# --- Generate Audio (Voice: en-US-BrianNeural) ---

# 1. Start (1s)
edge-tts --voice en-US-BrianNeural --text "Race Started! 8 Contenders fighting for glory!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Intermediate (40s)
edge-tts --voice en-US-BrianNeural --text "Looks like Quick Sort and Merge Sort are pulling ahead as expected!" --write-media "$TEMP_DIR/02_intermediate.mp3"

# 3. Speed Up (80s)
edge-tts --voice en-US-BrianNeural --text "Bubble and Cocktail sorts have a long way to go. Speeding up for you!" --write-media "$TEMP_DIR/03_speedup.mp3"

# 4. Finish (118s)
edge-tts --voice en-US-BrianNeural --text "Race Finished! Insertion Sort takes the last place. Better luck next time!" --write-media "$TEMP_DIR/04_finish.mp3"

# --- Merge with Video ---
# Start: 1s (1000ms), Mid: 40s (40000ms), Speedup: 80s (80000ms), Finish: 118s (118000ms)

ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_intermediate.mp3" \
    -i "$TEMP_DIR/03_speedup.mp3" \
    -i "$TEMP_DIR/04_finish.mp3" \
    -filter_complex \
    "[1]adelay=1000|1000[a1]; \
     [2]adelay=40000|40000[a2]; \
     [3]adelay=80000|80000[a3]; \
     [4]adelay=118000|118000[a4]; \
     [0:a][a1][a2][a3][a4]amix=inputs=5[aout]" \
    -map 0:v -map "[aout]" \
    -c:v copy -c:a libvorbis \
    "temp_output.webm"

# Overwrite Original (as per workflow)
mv "temp_output.webm" "$VIDEO_FILE"

# Cleanup
rm -rf "$TEMP_DIR"

echo "Updated $VIDEO_FILE with voice commentary using Brian Neural voice!"
