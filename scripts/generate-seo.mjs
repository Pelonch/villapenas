import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createServer, loadEnv } from 'vite'

const distDirectory = resolve(process.cwd(), 'dist')
const indexPath = resolve(distDirectory, 'index.html')
const seoStartMarker = '<!-- villa-penas-seo:start -->'
const seoEndMarker = '<!-- villa-penas-seo:end -->'
const environment = {
  ...loadEnv('production', process.cwd(), ''),
  ...process.env,
}

function getSiteOrigin(value) {
  if (!value?.trim()) {
    throw new Error('VITE_SITE_URL is required to generate production SEO files.')
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

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }

    return entities[character]
  })
}

function getAbsoluteUrl(pathname, origin) {
  return new URL(pathname, origin).toString()
}

async function loadSeoSource() {
  // Load the TypeScript route and translation modules so initial HTML and SPA metadata share data.
  const viteServer = await createServer({
    appType: 'custom',
    logLevel: 'error',
    server: { middlewareMode: true },
  })

  try {
    const { getTranslations } = await viteServer.ssrLoadModule('/src/i18n/translations.ts')
    const { getLocalizedPath } = await viteServer.ssrLoadModule('/src/app/routes.ts')
    const { pageIds } = await viteServer.ssrLoadModule('/src/app/types.ts')
    const { siteConfig } = await viteServer.ssrLoadModule('/src/config/site.ts')
    const { getOpenGraphLocale } = await viteServer.ssrLoadModule('/src/app/metadata.ts')

    return { getLocalizedPath, getOpenGraphLocale, getTranslations, pageIds, siteConfig }
  } finally {
    await viteServer.close()
  }
}

function renderSeoHead({
  getLocalizedPath,
  getOpenGraphLocale,
  getTranslations,
  locale,
  origin,
  page,
  siteConfig,
}) {
  const metadata = getTranslations(locale).metadata[page]
  const canonicalUrl = getAbsoluteUrl(getLocalizedPath(locale, page), origin)
  const alternateLinks = siteConfig.supportedLocales.map((alternateLocale) => {
    const alternateUrl = getAbsoluteUrl(getLocalizedPath(alternateLocale, page), origin)

    return `<link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}" />`
  })
  const defaultUrl = getAbsoluteUrl(
    getLocalizedPath(siteConfig.defaultLocale, page),
    origin,
  )

  return [
    '<meta name="robots" content="index, follow" />',
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    ...alternateLinks,
    `<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.businessName)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${getOpenGraphLocale(locale)}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.openGraph.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.openGraph.description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.openGraph.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.openGraph.description)}" />`,
    `<title>${escapeHtml(metadata.title)}</title>`,
  ].join('\n    ')
}

function createLocalizedHtml(baseHtml, locale, seoHead) {
  const seoBlock = `${seoStartMarker}[\\s\\S]*?${seoEndMarker}`

  if (!new RegExp(seoBlock).test(baseHtml)) {
    throw new Error('The localized SEO marker was not found in dist/index.html.')
  }

  return baseHtml
    .replace(/<html lang="[^"]+">/, `<html lang="${locale}">`)
    .replace(new RegExp(seoBlock), seoHead)
}

function createSitemap(origin, seoSource) {
  const urls = seoSource.siteConfig.supportedLocales.flatMap((locale) =>
    seoSource.pageIds.map((page) => {
      const path = seoSource.getLocalizedPath(locale, page)

      return `  <url><loc>${getAbsoluteUrl(path, origin)}</loc></url>`
    }),
  )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const siteOrigin = getSiteOrigin(environment.VITE_SITE_URL)
const baseHtml = await readFile(indexPath, 'utf8')
const seoSource = await loadSeoSource()
const robotsPath = resolve(distDirectory, 'robots.txt')
const sitemapPath = resolve(distDirectory, 'sitemap.xml')
const robots = [
  'User-agent: *',
  'Allow: /',
  `Sitemap: ${getAbsoluteUrl('/sitemap.xml', siteOrigin)}`,
  '',
].join('\n')

for (const locale of seoSource.siteConfig.supportedLocales) {
  for (const page of seoSource.pageIds) {
    const routePath = seoSource.getLocalizedPath(locale, page)
    const routeIndexPath = resolve(distDirectory, `.${routePath}`, 'index.html')
    const seoHead = renderSeoHead({ ...seoSource, locale, origin: siteOrigin, page })

    await mkdir(dirname(routeIndexPath), { recursive: true })
    await writeFile(routeIndexPath, createLocalizedHtml(baseHtml, locale, seoHead), 'utf8')
  }
}

await writeFile(robotsPath, robots, 'utf8')
await writeFile(sitemapPath, createSitemap(siteOrigin, seoSource), 'utf8')
