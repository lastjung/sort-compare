#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./create_voice_script.sh <video_file>"
  exit 1
fi

VIDEO_FILE="$1"
SCRIPT_NAME="add_voice_$(date +%s).sh"

cat <<EOF > "$SCRIPT_NAME"
#!/bin/bash

# Configuration
VIDEO_FILE="$VIDEO_FILE"
TEMP_DIR="temp_audio"

# Create temp directory
mkdir -p "\$TEMP_DIR"

# --- Generate Audio ---
# Add your commentary lines here!
# Use 'edge-tts --voice en-US-ChristopherNeural --list-voices' to see options

# 1. Start
edge-tts --voice en-US-ChristopherNeural --text "Race Started!" --write-media "\$TEMP_DIR/01_start.mp3"

# --- Merge with Video ---
# Adjust timestamps (milliseconds)
ffmpeg -y -i "\$VIDEO_FILE" \\
    -i "\$TEMP_DIR/01_start.mp3" \\
    -filter_complex \\
    "[1]adelay=1000|1000[a1]; \\
     [0:a][a1]amix=inputs=2[aout]" \\
    -map 0:v -map "[aout]" \\
    -c:v copy -c:a libvorbis \\
    "temp_output.webm"

# Overwrite Original
mv "temp_output.webm" "\$VIDEO_FILE"

# Cleanup
rm -rf "\$TEMP_DIR"

echo "Updated \$VIDEO_FILE with voice commentary!"
EOF

chmod +x "$SCRIPT_NAME"
echo "Created script: $SCRIPT_NAME"
echo "Edit it to add your lines, then run it!"
