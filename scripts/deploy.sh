#!/bin/bash
set -e

PROJECT_NAME="${PROJECT_NAME:-portfolio-v2}"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/$PROJECT_NAME/app}"
LOG_DIR="/opt/$PROJECT_NAME/logs"
LOG_FILE="$LOG_DIR/deploy_$(date +%Y%m%d_%H%M%S).log"

mkdir -p "$LOG_DIR"
exec > >(tee -a "$LOG_FILE")
exec 2>&1

echo "$(date): Navigating to $DEPLOY_DIR"
cd "$DEPLOY_DIR"

echo "$(date): Pulling latest changes"
git pull origin main

echo "$(date): Stopping existing containers"
docker compose -p "$PROJECT_NAME" down || true

echo "$(date): Building and starting containers"
docker compose -p "$PROJECT_NAME" up --build -d

echo "$(date): Pruning old images"
docker image prune -f --filter "label=com.docker.compose.project=$PROJECT_NAME" || true

echo "$(date): Reloading Nginx"
sudo nginx -t && sudo nginx -s reload || true

echo "$(date): Deployment completed"
