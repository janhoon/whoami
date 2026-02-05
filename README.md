# whoami - Jan Hoon's Portfolio

Personal portfolio site built with **Nuxt 3**, **Vue 3**, **Tailwind CSS v4**, and **@vueuse/motion**.

## Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3 + Nitro)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [@vueuse/motion](https://motion.vueuse.org/)
- **Icons:** [@nuxt/icon](https://nuxt.com/modules/icon) (Iconify)
- **Blog:** [@nuxt/content](https://content.nuxt.com/) (Markdown)
- **Analytics:** [PostHog](https://posthog.com/) (optional)
- **Deployment:** Docker → Coolify

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
node .output/server/index.mjs
```

## Docker

### Build & run locally

```bash
cd site

# Build image
docker build -t whoami .

# Run container
docker run -p 3000:3000 whoami

# Run with PostHog analytics
docker run -p 3000:3000 -e NUXT_PUBLIC_POSTHOG_KEY=your_key whoami
```

### Test the build

```bash
curl http://localhost:3000
```

## Deployment (Coolify)

### Setup

1. **Connect repository** to Coolify (GitHub integration)
2. **Configure build:**
   - Base directory: `site`
   - Dockerfile path: `site/Dockerfile`
   - Build command: *(handled by Dockerfile)*
3. **Set environment variables** in Coolify dashboard:
   - `NUXT_PUBLIC_POSTHOG_KEY` (optional - PostHog project key)
4. **Configure domain** and SSL in Coolify
5. **Enable auto-deploy** on push to main branch

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NUXT_PUBLIC_POSTHOG_KEY` | No | PostHog analytics project API key |
| `NODE_ENV` | No | Set to `production` (default in Docker) |
| `PORT` | No | Server port (default: 3000) |
| `HOST` | No | Server host (default: 0.0.0.0) |

### Health Check

The container includes a health check at `GET /` with 30s intervals.

## Project Structure

```
site/
├── app.vue                  # Root component
├── nuxt.config.ts           # Nuxt configuration
├── Dockerfile               # Multi-stage Docker build
├── assets/
│   ├── css/main.css         # Global styles + Tailwind
│   └── fonts/               # JetBrains Mono, Geist fonts
├── components/
│   ├── BlogFooter.vue       # Blog post footer with author info
│   ├── BlogPreview.vue      # Blog post list/preview
│   ├── BlogTitle.vue        # Blog post title header
│   ├── BuyMeACoffee.vue     # Coffee donation button
│   ├── ProjectShowcase.vue  # Featured projects
│   ├── RadialMenu.vue       # Circular navigation menu
│   ├── SocialLinks.vue      # Social media links
│   └── ui/Badge.vue         # Badge UI component
├── composables/utils.ts     # cn() utility (clsx + tailwind-merge)
├── content/blog/            # Blog posts (Markdown)
├── data/blog_posts.json     # Blog post index
├── layouts/
│   ├── default.vue          # Default layout
│   └── blog.vue             # Blog layout with header
├── pages/
│   ├── index.vue            # Homepage
│   ├── [...slug].vue        # 404 catch-all
│   └── blog/
│       ├── index.vue        # Blog listing
│       └── [slug].vue       # Individual blog post
├── plugins/posthog.client.ts # PostHog analytics plugin
├── public/
│   ├── favicon.ico
│   └── images/              # Static images (pfp, social icons)
└── server/routes/
    ├── robots.txt.ts        # robots.txt endpoint
    └── sitemap.xml.ts       # XML sitemap endpoint
```

## Troubleshooting

### Build fails with OOM

The Nuxt build can be memory-intensive. Ensure at least 2GB RAM is available for the build step. In Coolify, set the build memory limit accordingly.

### Icons not loading

Icons are served via Iconify's API on first load, then cached. Ensure the container has outbound internet access, or configure `icon.serverBundle` in `nuxt.config.ts` for offline mode.

### PostHog not tracking

- Verify `NUXT_PUBLIC_POSTHOG_KEY` is set correctly
- PostHog events are proxied through `/ingest` to avoid ad blockers
- Check browser console for errors
