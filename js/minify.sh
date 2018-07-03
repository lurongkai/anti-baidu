#!/bin/bash

if ! [ -x $(command -v uglifyjs) ]; then
   if ! [ -x $(command -v npm) ]; then
       echo "Cannot find 'npm', please install it!"
       exit -1;
   fi
   npm install uglifyjs -g
fi
uglifyjs anti-baidu-latest.js \
    -o anti-baidu-latest.min.js \
    -c -m --source-map "content='anti-baidu-latest.min.js.map'" 
echo "Minified anti-baidu-lastest.js to anti-baidu-latest.min.js!"

