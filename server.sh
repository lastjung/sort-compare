#!/bin/bash

# 1. 경로 설정 (범용 표준)
PID_DIR="node_modules/.cache"
PID_FILE="$PID_DIR/dev-server.pid"

# 2. 실행 중인 서버(백그라운드) 정리 함수
stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo "Stopping background Server (PID: $PID)..."
            kill $PID
            rm "$PID_FILE"
            echo "Background server stopped."
        else
            echo "Cleaning up stale PID file..."
            rm "$PID_FILE"
        fi
    fi
}

# 3. 정리 수행
stop_server

# 4. 서버 시작 (포그라운드)
echo "Starting Vite Dev Server..."
echo "Press Ctrl+C to stop."
pnpm dev
