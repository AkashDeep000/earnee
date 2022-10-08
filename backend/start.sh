#!/bin/bash
pm2 describe appname > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start ./app.js
else
  pm2 restart app
fi;