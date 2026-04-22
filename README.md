# personal-website-design

Portfolio site for adamlin.online.

## Local development

```bash
npm install
npm run dev
```

## Production build check

```bash
npm run build
npm run start
```

## VPS deployment with Docker + Traefik

This repo includes a production `Dockerfile` and `docker-compose.yml` for running behind an existing Traefik instance.

### One-time setup on the VPS

```bash
cd /opt
git clone https://github.com/AdamLinCodes/personal-website-design.git
cd personal-website-design
docker compose up -d --build
```

### Updating the site later

```bash
cd /opt/personal-website-design
git pull
docker compose up -d --build
```

### DNS

Point both records at the VPS public IP:

- `A @ -> <VPS_IP>`
- `A www -> <VPS_IP>`

Leave CDN or proxying off until the site is confirmed working with Traefik HTTPS.
