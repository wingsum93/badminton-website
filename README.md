# Badminton Coaching Website

Static badminton coaching website built with Node/Tailwind and served by Nginx in Docker.

## Local Build

```bash
npm ci
npm run build
npm run check
```

## Docker Run Locally

```bash
docker compose up -d --build
```

The site is available at:

```text
http://localhost:9413
```

## Approach 1: Auto Build Image and Deploy to Mac Mini

Use this when GitHub should build the container image and the Mac mini should only pull and restart it. This keeps CPU and RAM usage low on a 16 GB Mac mini.

This guide uses GitHub Container Registry:

```text
ghcr.io/<github-owner>/badminton-website:latest
```

Replace the placeholders before running commands:

```bash
export GITHUB_OWNER="<github-owner>"
export MAC_MINI_USER="<mac-mini-ssh-user>"
export MAC_MINI_HOST="<mac-mini-host-or-ip>"
export BADMINTON_WEBSITE_PORT="9413"
```

### 1. Prepare the Mac Mini Deploy Folder

Run this on the Mac mini:

```bash
export GITHUB_OWNER="<github-owner>"
export BADMINTON_WEBSITE_PORT="9413"
sudo mkdir -p /opt/badminton-website
sudo chown "$USER" /opt/badminton-website
cd /opt/badminton-website
```

Create the deploy compose file on the Mac mini:

```bash
cat > docker-compose.yml <<'YAML'
name: badminton-website

services:
  web:
    image: ghcr.io/<github-owner>/badminton-website:latest
    ports:
      - "${BADMINTON_WEBSITE_PORT:-9413}:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "wget -q --spider http://127.0.0.1/ || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
YAML
```

Replace the image owner in the compose file:

```bash
sed -i.bak "s|<github-owner>|$GITHUB_OWNER|g" docker-compose.yml
```

Start the site once:

```bash
docker compose pull
docker compose up -d
docker compose ps
```

### 2. Add GitHub Repository Secrets

In GitHub, open:

```text
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Add these secrets:

```text
MAC_MINI_HOST=<mac-mini-host-or-ip>
MAC_MINI_USER=<mac-mini-ssh-user>
MAC_MINI_SSH_KEY=<private-ssh-key-that-can-login-to-the-mac-mini>
MAC_MINI_PORT=22
BADMINTON_WEBSITE_PORT=9413
```

If the GHCR image is private, also create a GitHub personal access token with package read permission:

```text
GHCR_USERNAME=<github-username>
GHCR_TOKEN=<github-token-with-read-packages>
```

Then run this once on the Mac mini:

```bash
echo "<github-token-with-read-packages>" | docker login ghcr.io -u "<github-username>" --password-stdin
```

### 3. Add the GitHub Actions Workflow

Create the workflow folder:

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/build-and-deploy.yml`:

```bash
cat > .github/workflows/build-and-deploy.yml <<'YAML'
name: Build and deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  IMAGE_NAME: ghcr.io/${{ github.repository_owner }}/badminton-website

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:latest
            ${{ env.IMAGE_NAME }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy on Mac mini
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.MAC_MINI_HOST }}
          username: ${{ secrets.MAC_MINI_USER }}
          key: ${{ secrets.MAC_MINI_SSH_KEY }}
          port: ${{ secrets.MAC_MINI_PORT || 22 }}
          script: |
            set -e
            cd /opt/badminton-website
            export BADMINTON_WEBSITE_PORT="${{ secrets.BADMINTON_WEBSITE_PORT || 9413 }}"
            docker compose pull
            docker compose up -d
            docker image prune -f
            docker compose ps
YAML
```

Commit and push:

```bash
git add README.md doc/PORTAINER_WATCHTOWER_DEPLOY.md .github/workflows/build-and-deploy.yml
git commit -m "Add automated container deploy workflow"
git push
```

### 4. Verify Deployment

Check the container on the Mac mini:

```bash
ssh "$MAC_MINI_USER@$MAC_MINI_HOST" "cd /opt/badminton-website && docker compose ps"
```

Check the site:

```bash
curl -I "http://$MAC_MINI_HOST:$BADMINTON_WEBSITE_PORT"
```

Manual redeploy command:

```bash
ssh "$MAC_MINI_USER@$MAC_MINI_HOST" "cd /opt/badminton-website && docker compose pull && docker compose up -d"
```

## Approach 2: Watchtower Auto Deploy

For a Portainer-based Watchtower setup using the OrbStack Docker engine, see [doc/PORTAINER_WATCHTOWER_DEPLOY.md](doc/PORTAINER_WATCHTOWER_DEPLOY.md).
