#!/bin/bash

# Voice Commentary for smart-record_2026-02-18T19-30-01.webm
# Source: tube/commentary_20260218_1429.json
# Voice: en-US-AndrewMultilingualNeural (Most Natural)

VIDEO_FILE="tube/smart-record_2026-02-18T19-30-01.webm"
OUTPUT_FILE="tube/smart-record_1930_final.webm"
TEMP_DIR="temp_audio_1930"
VOICE="en-US-AndrewMultilingualNeural"

mkdir -p "$TEMP_DIR"

# 1. Start (1.0s)
edge-tts --voice $VOICE --text "Race Started! 8 Contenders fighting for glory!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Intermediate (10.0s)
edge-tts --voice $VOICE --text "Looks like Quick Sort and Merge Sort are pulling ahead as expected!" --write-media "$TEMP_DIR/02_mid.mp3"

# 3. 1st Place - Quick Sort (86.2s)
edge-tts --voice $VOICE --text "Quick Sort takes the GOLD! Incredible speed!" --write-media "$TEMP_DIR/03_first.mp3"

# 4. 2nd Place - Merge Sort (100.5s)
edge-tts --voice $VOICE --text "Merge Sort takes Silver! Just missed it!" --write-media "$TEMP_DIR/04_second.mp3"

# 5. 3rd Place - Shell Sort (112.7s)
edge-tts --voice $VOICE --text "Shell Sort grabs Bronze! Top 3 decided!" --write-media "$TEMP_DIR/05_third.mp3"

# 6. Speed Up (118.9s)
edge-tts --voice $VOICE --text "Bubble and Cocktail sorts have a long way to go. Speeding up for you!" --write-media "$TEMP_DIR/06_speedup.mp3"

# 7. Race Finished (144.0s)
edge-tts --voice $VOICE --text "Race Finished! Winner: Quick Sort, 2nd: Merge Sort, 3rd: Shell Sort, and Last Place: Bubble Sort." --write-media "$TEMP_DIR/07_finish.mp3"

# Merge: 7 commentary tracks + 1 original = inputs=8
ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_mid.mp3" \
    -i "$TEMP_DIR/03_first.mp3" \
    -i "$TEMP_DIR/04_second.mp3" \
    -i "$TEMP_DIR/05_third.mp3" \
    -i "$TEMP_DIR/06_speedup.mp3" \
    -i "$TEMP_DIR/07_finish.mp3" \
    -filter_complex \
    "[1]adelay=1000|1000[a1]; \
     [2]adelay=10000|10000[a2]; \
     [3]adelay=86200|86200[a3]; \
     [4]adelay=100500|100500[a4]; \
     [5]adelay=112700|112700[a5]; \
     [6]adelay=118900|118900[a6]; \
     [7]adelay=144000|144000[a7]; \
     [0:a][a1][a2][a3][a4][a5][a6][a7]amix=inputs=8[aout]" \
    -map 0:v -map "[aout]" \
    -c:v copy -c:a libvorbis \
    "$OUTPUT_FILE"

rm -rf "$TEMP_DIR"
echo "Done! Created $OUTPUT_FILE"
