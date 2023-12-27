#!/bin/bash

# Exec the script to send documents do queue
node -r ts-node/register --env-file=.env queue/send-initial-documents.ts

# Starts the application
exec yarn start