# Portainer Watchtower Deploy

This guide sets up Approach 2: GitHub Actions or another CI system builds and pushes the image, then Watchtower automatically updates the running container.

Assumptions:

- Portainer is running as a container.
- Portainer is connected to the OrbStack Docker engine.
- The website image is available from a registry, for example:

```text
ghcr.io/<github-owner>/badminton-website:latest
```

## 1. Create the Website Stack in Portainer

In Portainer, open:

```text
Stacks -> Add stack
```

Stack name:

```text
badminton-website
```

Paste this compose file:

```yaml
name: badminton-website

services:
  web:
    image: ghcr.io/<github-owner>/badminton-website:latest
    ports:
      - "${BADMINTON_WEBSITE_PORT:-9413}:80"
    restart: unless-stopped
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
    healthcheck:
      test: ["CMD-SHELL", "wget -q --spider http://127.0.0.1/ || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

Add this environment variable in the Portainer stack editor:

```text
BADMINTON_WEBSITE_PORT=9413
```

Deploy the stack.

## 2. Add Registry Credentials if the Image is Private

If the GHCR image is private, open Portainer:

```text
Registries -> Add registry
```

Use these values:

```text
Registry provider: Custom registry
Name: ghcr
Registry URL: ghcr.io
Username: <github-username>
Password: <github-token-with-read-packages>
```

Then update the stack and enable registry authentication for the image pull.

## 3. Create the Watchtower Stack in Portainer

In Portainer, open:

```text
Stacks -> Add stack
```

Stack name:

```text
watchtower
```

Paste this compose file:

```yaml
name: watchtower

services:
  watchtower:
    image: containrrr/watchtower:latest
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command:
      - --label-enable
      - --interval
      - "60"
      - --cleanup
      - --rolling-restart
```

Deploy the stack.

## 4. Test Watchtower Manually

Open the Watchtower stack console in Portainer, or run this from a shell that can access the same OrbStack Docker engine:

```bash
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower:latest \
  --label-enable \
  --run-once \
  --cleanup
```

Check the website container:

```bash
docker ps --filter "label=com.docker.compose.project=badminton-website"
```

Check the site:

```bash
curl -I http://localhost:9413
```

## 5. Release Flow

After setup, the release flow is:

```text
Push to main -> CI builds image -> CI pushes ghcr.io/<github-owner>/badminton-website:latest -> Watchtower pulls and restarts the website
```

Watchtower checks every 60 seconds in the stack above. Increase the interval if the server runs many containers.

## 6. Rollback

If the latest image is bad, edit the website stack image tag in Portainer from:

```text
ghcr.io/<github-owner>/badminton-website:latest
```

to a known good SHA tag:

```text
ghcr.io/<github-owner>/badminton-website:<git-sha>
```

Then redeploy the stack.
