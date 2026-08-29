import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'

const distDirectory = resolve(process.cwd(), 'dist')
const environment = {
  ...loadEnv('production', process.cwd(), ''),
  ...process.env,
}

function getSiteOrigin(value) {
  if (!value?.trim()) {
    return null
  }

  let url

  try {
    url = new URL(value.trim())
  } catch {
    throw new Error('VITE_SITE_URL must be a valid absolute http(s) origin.')
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('VITE_SITE_URL must use http or https.')
  }

  return url.origin
}

function createSitemap(origin) {
  const paths = [
    '/es',
    '/en',
    '/es/contacto',
    '/en/contact',
    '/es/politicas',
    '/en/policies',
  ]
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, origin).toString()}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const siteOrigin = getSiteOrigin(environment.VITE_SITE_URL)
const robotsPath = resolve(distDirectory, 'robots.txt')
const sitemapPath = resolve(distDirectory, 'sitemap.xml')
const robots = [
  'User-agent: *',
  'Allow: /',
  ...(siteOrigin ? [`Sitemap: ${new URL('/sitemap.xml', siteOrigin).toString()}`] : []),
  '',
].join('\n')

await mkdir(distDirectory, { recursive: true })
await writeFile(robotsPath, robots, 'utf8')

if (siteOrigin) {
  await writeFile(sitemapPath, createSitemap(siteOrigin), 'utf8')
} else {
  await rm(sitemapPath, { force: true })
}
