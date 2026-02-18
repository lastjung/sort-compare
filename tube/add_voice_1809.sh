#!/bin/bash

# Configuration
VIDEO_FILE="tube/smart-record_2026-02-18T18-09-03.webm"
OUTPUT_FILE="tube/smart-record_1809_final.webm"
TEMP_DIR="temp_audio_1809"

# Create temp directory
mkdir -p "$TEMP_DIR"

# 1. Start (0s)
edge-tts --voice en-US-ChristopherNeural --text "Race Started! 8 Contenders fighting for glory!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Intermediate (10s)
edge-tts --voice en-US-ChristopherNeural --text "Looks like Quick Sort and Merge Sort are pulling ahead as expected!" --write-media "$TEMP_DIR/02_intermediate.mp3"

# 3. Quick Sort Winner (53.7s)
edge-tts --voice en-US-ChristopherNeural --text "Quick Sort takes the GOLD! Incredible speed!" --write-media "$TEMP_DIR/03_winner.mp3"

# 4. Merge Sort 2nd (62.3s)
edge-tts --voice en-US-ChristopherNeural --text "Merge Sort takes Silver! Just missed it!" --write-media "$TEMP_DIR/04_second.mp3"

# Merge Audio with Video
ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_intermediate.mp3" \
    -i "$TEMP_DIR/03_winner.mp3" \
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

# Cleanup
rm -rf "$TEMP_DIR"

echo "Done! Created $OUTPUT_FILE"
