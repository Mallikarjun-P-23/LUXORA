#!/usr/bin/env bash

# Resolve project root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=================================================="
echo "           🛑 STOPPING LUXORA SERVICES           "
echo "=================================================="

# 1. Kill backend using saved PID
if [ -f "$DIR/.backend.pid" ]; then
    BPID=$(cat "$DIR/.backend.pid")
    if ps -p "$BPID" > /dev/null 2>&1; then
        echo "Stopping backend (PID $BPID)..."
        kill "$BPID" 2>/dev/null || true
    fi
    rm -f "$DIR/.backend.pid"
fi

# 2. Kill frontend using saved PID
if [ -f "$DIR/.frontend.pid" ]; then
    FPID=$(cat "$DIR/.frontend.pid")
    if ps -p "$FPID" > /dev/null 2>&1; then
        echo "Stopping frontend (PID $FPID)..."
        kill "$FPID" 2>/dev/null || true
    fi
    rm -f "$DIR/.frontend.pid"
fi

# 3. Clean up any remaining processes specifically bound to ports 8001 and 5175
# (Leaves port 5173 and all other projects untouched)
P8001=$(lsof -ti :8001 2>/dev/null || true)
if [ -n "$P8001" ]; then
    echo "Releasing port 8001 (PID $P8001)..."
    kill -9 $P8001 2>/dev/null || true
fi

P5175=$(lsof -ti :5175 2>/dev/null || true)
if [ -n "$P5175" ]; then
    echo "Releasing port 5175 (PID $P5175)..."
    kill -9 $P5175 2>/dev/null || true
fi

echo " LUXORA backend and frontend have stopped successfully."
echo "=================================================="
