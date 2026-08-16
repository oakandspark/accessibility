#!/bin/sh

set -e

echo "Compiling typescript -> javascript"
npm exec tsc 

echo "Compiling schema"
glib-compile-schemas schemas/

echo "Installing extension"
[ ! -d _build ] && mkdir _build
cp -v dist/*.js stylesheet.css metadata.json schemas/gschemas.compiled _build/;

(cd _build; zip -ur ../gaia@oakandspark.com.shell-extension.zip .)
#(cd _build; gnome-extensions pack -o ..) 

# Deploying....
# rsync -av --mkpath /work/gnome/sticky-keys/_build/ /home/dev/.local/share/gnome-shell/extensions/accessibility@oakandspark.com/; gnome-extensions enable accessibility@oakandspark.com
