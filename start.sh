#!/usr/bin/env bash

# Resolve project root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=================================================="
echo "           🚀 STARTING LUXORA SERVICES           "
echo "=================================================="

# 1. Check & start MongoDB if needed
if ! nc -z 127.0.0.1 27017 >/dev/null 2>&1; then
    echo "📦 Starting MongoDB..."
    if [ -f /opt/homebrew/etc/mongod.conf ]; then
        mongod --config /opt/homebrew/etc/mongod.conf --fork
    else
        mongod --fork --logpath "$DIR/mongo.log" --dbpath /opt/homebrew/var/mongodb 2>/dev/null || true
    fi
else
    echo " MongoDB is already running on port 27017"
fi

# 2. Stop any existing LUXORA backend / frontend instances
"$DIR/stop.sh" >/dev/null 2>&1 || true

# 3. Start Backend on port 8001 with nohup & disown
echo "⚙️  Starting LUXORA Backend on port 8001..."
cd "$DIR/backend"
nohup node src/index.js > "$DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$DIR/.backend.pid"
disown $BACKEND_PID 2>/dev/null || true

# 4. Start Frontend on port 5175 with nohup & disown
echo "🎨 Starting LUXORA Frontend on port 5175..."
cd "$DIR/frontend"
nohup npx vite --port 5175 --clearScreen false > "$DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$DIR/.frontend.pid"
disown $FRONTEND_PID 2>/dev/null || true

cd "$DIR"

# Wait a brief moment to verify startup
sleep 2

echo ""
echo "=================================================="
echo "          ✨ LUXORA IS UP AND RUNNING!           "
echo "=================================================="
echo "🌐 Frontend : http://localhost:5175"
echo "🔌 Backend  : http://localhost:8001"
echo "💾 Database : mongodb://127.0.0.1:27017/ecommerce"
echo "📄 Logs     : tail -f backend.log frontend.log"
echo "🛑 Stop     : ./stop.sh"
echo "=================================================="
