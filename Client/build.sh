#!/bin/bash

mkdir -p dist/css/
mkdir -p dist/js/

cp index.html dist/index.html
cp launcher.css dist/css/launcher.css
cp launcher.js dist/js/launcher.js
cp bower_components/clientjs/dist/client.min.js dist/js/client.min.js
cp semantic/dist/semantic.min.js dist/js/semantic.min.js
cp semantic/dist/semantic.min.css dist/css/semantic.min.css

mkdir -p dist/css/themes/basic/
cp -r semantic/dist/themes/default dist/css/themes/
