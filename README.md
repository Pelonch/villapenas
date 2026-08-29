# Villa Peñas Landing

Public bilingual React + Vite landing page for Villa Peñas.

## Production Commands

```text
npm ci
npm run build
npm start
```

`npm start` serves `dist/` with a document-only SPA fallback. Existing static files are served directly and missing static assets return `404` rather than the application shell.

The server reads Railway's `PORT` environment variable and otherwise uses port `4173` locally.

## Public Environment

Copy `.env.example` for local configuration. Every `VITE_` variable is embedded in the browser bundle and must never contain secrets.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Public NestJS API origin. It is optional only because the existing Railway API is an intentional fallback. |
| `VITE_SITE_URL` | Public frontend origin for canonical URLs and generated `sitemap.xml`. Use the temporary Railway URL for a test deployment, then update it to the final custom domain. |

When `VITE_SITE_URL` is unset, the build emits `robots.txt` without a sitemap and runtime metadata uses the current browser origin. Set it before an indexable production launch.

## Hero Media

The final assets referenced by `src/config/homeExperience.ts` belong at these public paths:

```text
public/
  videos/
    hero/
      hero-desktop.mp4
      hero-mobile.mp4
    aerial/
      aerial.mp4
  images/
    hero/
      hero-poster.webp
    aerial/
      aerial-poster.webp
```

The Hero and aerial preview render warm design-system fallback surfaces if any of these files are absent.
