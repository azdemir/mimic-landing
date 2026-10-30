#!/usr/bin/env bash
# Run the Mimic landing page locally.
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "Installing dependencies…"
  npm install
fi
echo "Starting Next.js on http://localhost:3000"
npm run dev -- --port 3000
