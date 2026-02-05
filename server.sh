#!/bin/bash

# 1. 경로 설정 (범용 표준)
PID_DIR="node_modules/.cache"
PID_FILE="$PID_DIR/dev-server.pid"

# 2. 실행 중인 서버 종료 함수
stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo "Stopping Server (PID: $PID)..."
            kill $PID
            rm "$PID_FILE"
            echo "Server stopped."
            exit 0
        else
            echo "Stale PID file found. Removing..."
            rm "$PID_FILE"
        fi
    fi
}

# 3. 메인 로직: 이미 실행 중이면 종료(Toggle)
if [ -f "$PID_FILE" ]; then
    stop_server
fi

# 4. 서버 시작
mkdir -p "$PID_DIR"
echo "Starting Vite Dev Server..."

# 프로젝트 상황에 맞는 시작 명령어 (Vite)
pnpm dev &

echo $! > "$PID_FILE"
echo "Server started in background (PID: $!)."
