#!/bin/sh
zip -r ./pkg/tab_viewer_`date +%Y-%m-%d.%H:%M:%S`.zip . -x "package_images/*" "pkg/*" "scripts/*" ".idea/*" ".git/*" ".gitignore" ".DS_Store"
