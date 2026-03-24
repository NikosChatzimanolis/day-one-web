#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd /Users/Nico/Documents/day-one-web
exec /opt/homebrew/bin/node node_modules/.bin/next dev --port 3000
