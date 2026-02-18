#!/bin/bash

# Configuration
VIDEO_FILE="tube/smart-record_2026-02-18T17-30-49.webm"
OUTPUT_FILE="tube/smart-record_final_commentary.webm"
TEMP_DIR="temp_audio"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Commentary Script and Timestamps
# 1. Start (0s)
edge-tts --voice en-US-ChristopherNeural --text "Race Started! 8 Contenders fighting for glory!" --write-media "$TEMP_DIR/01_start.mp3"

# 2. Intermediate (10s)
edge-tts --voice en-US-ChristopherNeural --text "Looks like Quick Sort and Merge Sort are pulling ahead as expected!" --write-media "$TEMP_DIR/02_intermediate.mp3"

# 3. Speed Up (Rank 4) - Estimating around 45s for a 1m36s race
edge-tts --voice en-US-ChristopherNeural --text "Bubble and Cocktail sorts have a long way to go. Speeding up for you!" --write-media "$TEMP_DIR/03_speedup.mp3"

# 4. Finish (End) - Video is 1m36s, placing at 92s
edge-tts --voice en-US-ChristopherNeural --text "Race Finished! Insertion Sort takes the last place. Better luck next time!" --write-media "$TEMP_DIR/04_finish.mp3"

# Merge Audio with Video
# Using complex filter to mix audio at specific timestamps
# 01_start at 0s
# 02_intermediate at 10s
# 03_speedup at 45s
# 04_finish at 92s

ffmpeg -y -i "$VIDEO_FILE" \
    -i "$TEMP_DIR/01_start.mp3" \
    -i "$TEMP_DIR/02_intermediate.mp3" \
    -i "$TEMP_DIR/03_speedup.mp3" \
    -i "$TEMP_DIR/04_finish.mp3" \
    -filter_complex \
    "[1]adelay=1000|1000[a1]; \
     [2]adelay=10000|10000[a2]; \
     [3]adelay=45000|45000[a3]; \
     [4]adelay=92000|92000[a4]; \
     [0:a][a1][a2][a3][a4]amix=inputs=5[aout]" \
    -map 0:v -map "[aout]" \
    -c:v copy -c:a libvorbis \
    "$OUTPUT_FILE"

# Cleanup
rm -rf "$TEMP_DIR"

echo "Done! Created $OUTPUT_FILE"
