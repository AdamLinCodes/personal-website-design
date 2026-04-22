#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${1:-/opt/personal-website-design}"
cd "$REPO_DIR"

git pull
docker compose up -d --build

echo "Deployment complete."
