#!/bin/sh

set -e

echo "Compiling typescript -> javascript"
npm exec tsc 

echo "Installing extension"
mkdir -p ~/.local/share/gnome-shell/extensions/xdotool-ext@semicomplete.com/ || true
cp -v dist/*.js stylesheet.css metadata.json ~/.local/share/gnome-shell/extensions/xdotool-ext@semicomplete.com/;

echo "Complete"
#MUTTER_DEBUG_DUMMY_MODE_SPECS=1900x1200 dbus-run-session gnome-shell --nested --wayland
