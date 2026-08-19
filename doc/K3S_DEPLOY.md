# k3s Deploy

This deploys the static Nginx container to k3s with the default Traefik Ingress controller.

The Kubernetes manifests use:

```text
Namespace: badminton-website
Image: ghcr.io/wingsum93/badminton-website:v0.0.0
Ingress host: badminton.example.local
```

Replace `v0.0.0` with the `v1.x.y` image tag you publish for a release.

## 1. Publish a Versioned Image

Open the `Docker Image` GitHub Actions workflow and run it manually with an image tag:

```text
v1.2.3
```

The workflow validates that the tag matches `vMAJOR.MINOR.PATCH` and publishes:

```text
ghcr.io/wingsum93/badminton-website:v1.2.3
```

It may also publish `latest` for convenience, but the k3s manifests should use the immutable `v1.x.y` tag for predictable rollouts and rollbacks.

## 2. Create the GHCR Pull Secret

Create a GitHub token that can read packages, then run this against the k3s cluster:

```bash
kubectl apply -f k8s/00-namespace.yaml

kubectl -n badminton-website create secret docker-registry ghcr \
  --docker-server=ghcr.io \
  --docker-username="<github-username>" \
  --docker-password="<github-token-with-read-packages>" \
  --docker-email="<email-address>"
```

If the secret already exists, update it by deleting and recreating it:

```bash
kubectl -n badminton-website delete secret ghcr
```

## 3. Set the Image Tag

Update the Deployment image before applying:

```bash
kubectl set image --local -f k8s/20-deployment.yaml \
  web=ghcr.io/wingsum93/badminton-website:v1.2.3 \
  -o yaml > /tmp/badminton-website-deployment.yaml
```

Then apply the manifests:

```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/10-service.yaml
kubectl apply -f /tmp/badminton-website-deployment.yaml
kubectl apply -f k8s/30-ingress.yaml
```

For a direct edit instead, replace `v0.0.0` in `k8s/20-deployment.yaml` with the release tag and run:

```bash
kubectl apply -f k8s/
```

## 4. Configure the Hostname

The committed Ingress host is a placeholder:

```text
badminton.example.local
```

Either replace it with a real DNS hostname, or add a local `/etc/hosts` entry that points to a k3s node running Traefik:

```text
<k3s-node-ip> badminton.example.local
```

TLS is intentionally not configured in these manifests.

## 5. Verify

Check rollout status:

```bash
kubectl -n badminton-website rollout status deployment/badminton-website
kubectl -n badminton-website get pods
kubectl -n badminton-website get ingress
```

Check the route:

```bash
curl -H "Host: badminton.example.local" http://<k3s-node-ip>/
```

## Tag Policy

Use `v1.x.y` tags for Kubernetes deployments. They are valid Docker tags and work well in k3s.

Do not deploy `latest` in Kubernetes. It is mutable, weaker for rollbacks, and can interact poorly with cached image pulls. Treat each `v1.x.y` tag as immutable; publish a new patch version instead of overwriting an existing tag.
