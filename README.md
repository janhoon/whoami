# whoami - Jan Hoon's Portfolio

Personal portfolio site built with **Astro**, **Vue 3**, **Tailwind CSS v4**, and markdown content collections.

## Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Interactive UI:** [Vue 3](https://vuejs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Iconify](https://iconify.design/)
- **Blog:** Astro content collections (Markdown)
- **Analytics:** PostHog (optional)
- **Deployment:** Docker -> Coolify

## Development

```bash
cd site

# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Docker

### Build and run locally

```bash
cd site

# Build image
docker build -t whoami .

# Run container
docker run -p 3000:3000 whoami

# Run with PostHog analytics
docker run -p 3000:3000 -e PUBLIC_POSTHOG_KEY=your_key whoami
```

### Test the build

```bash
curl http://localhost:3000
```

## Deployment (Coolify)

1. Connect repository to Coolify.
2. Set base directory to `site` and Dockerfile path to `site/Dockerfile`.
3. Configure environment variables as needed.
4. Configure domain and SSL.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_POSTHOG_KEY` | No | PostHog project API key |
| `PUBLIC_POSTHOG_HOST` | No | PostHog host URL (default `https://eu.i.posthog.com`) |
| `NODE_ENV` | No | Runtime mode (`production` in Docker) |
| `PORT` | No | Server port (default: `3000`) |
| `HOST` | No | Server host (default: `0.0.0.0`) |

## Project Structure

```
site/
├── astro.config.mjs
├── Dockerfile
├── assets/
│   ├── css/main.css
│   └── fonts/
├── public/
│   ├── favicon.ico
│   └── images/
└── src/
    ├── components/
    ├── content/blog/
    ├── layouts/
    └── pages/
```
