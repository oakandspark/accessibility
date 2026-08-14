#!/bin/sh

set -e

echo "Compiling typescript -> javascript"
npm exec tsc 

echo "Installing extension"
[ ! -d _build ] && mkdir _build
cp -v dist/*.js stylesheet.css metadata.json _build/;

# Deploying....
# rsync -av --mkpath /work/gnome/sticky-keys/_build/ /home/dev/.local/share/gnome-shell/extensions/accessibility@oakandspark.com/; gnome-extensions enable accessibility@oakandspark.com
