#!/bin/sh

cd "$(dirname "$0")"                        # https://stackoverflow.com/questions/3349105/how-can-i-set-the-current-working-directory-to-the-directory-of-the-script-in-ba
npm install
npm start & open http://localhost:8000      # start!