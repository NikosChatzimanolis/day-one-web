#!/bin/sh
# Renders the phone assistant's share cards into public/share/ with headless Chrome.
#   sh scripts/share-cards/render.sh [version, default v1]
# Use a NEW version when the pictures change: WhatsApp and the image CDN cache a picture by its address.
set -e
V="${1:-v1}"
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/../../public/share"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
mkdir -p "$OUT"
shot() { # name  width  height
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size="$2,$3" \
    --virtual-time-budget=8000 --screenshot="$TMP/$1.png" "file://$HERE/phone-assistant.html#$1" >/dev/null 2>&1
  sips -z "$3" "$2" -s format jpeg -s formatOptions 86 "$TMP/$1.png" --out "$OUT/phone-assistant-$1-$V.jpg" >/dev/null
  echo "$(basename "$OUT/phone-assistant-$1-$V.jpg") $(($(stat -f%z "$OUT/phone-assistant-$1-$V.jpg") / 1024)) KB"
}
for l in el en ru; do shot "$l-og" 1200 630; done
for l in el en; do shot "$l-card" 1080 1350; done
rm -rf "$TMP"
