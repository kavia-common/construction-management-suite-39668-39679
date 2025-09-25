#!/bin/bash
cd /home/kavia/workspace/code-generation/construction-management-suite-39668-39679/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

