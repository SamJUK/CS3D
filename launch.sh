#!/usr/bin/env bash

set -xe

# Close all sub processes on exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# Core
npx vite base --port 7500 --strictPort &
npx vite viewer --port 7501 --strictPort &

# Examples
npx vite examples/marketplace --port 7502 --strictPort &
npx vite examples/viewer --port 7503 --strictPort &
npx vite sandbox --port 7504 --strictPort &

while true; do sleep 9999; done