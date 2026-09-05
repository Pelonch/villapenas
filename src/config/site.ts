import { supportedLocales, type Locale } from '../i18n/types.ts'

interface SiteConfig {
  businessName: string
  whatsappNumber: string
  googleMapsUrl: string
  defaultLocale: Locale
  supportedLocales: readonly Locale[]
  productionUrl: string | null
}

function getProductionUrl(): string | null {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (!configuredUrl) {
    return null
  }

  const url = new URL(configuredUrl)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('VITE_SITE_URL must use http or https.')
  }

  return url.origin
}

export const siteConfig = {
  businessName: 'Villa Peñas',
  whatsappNumber: '+506 8850-7712',
  googleMapsUrl: 'https://maps.app.goo.gl/HP9MBJkZyfovstMv9',
  defaultLocale: 'es',
  supportedLocales,
  // Set VITE_SITE_URL to the final production origin before launch.
  productionUrl: getProductionUrl(),
} as const satisfies SiteConfig
