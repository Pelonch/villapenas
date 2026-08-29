import { supportedLocales, type Locale } from '../i18n/types.ts'

interface SiteConfig {
  businessName: string
  whatsappNumber: string
  googleMapsUrl: string
  depositColones: number
  defaultLocale: Locale
  supportedLocales: readonly Locale[]
  productionUrl: string | null
}

function getProductionUrl(): string | null {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim()

  return configuredUrl ? configuredUrl.replace(/\/+$/, '') : null
}

export const siteConfig = {
  businessName: 'Villa Peñas',
  whatsappNumber: '+506 8850-7712',
  googleMapsUrl: 'https://maps.app.goo.gl/HP9MBJkZyfovstMv9',
  depositColones: 20_000,
  defaultLocale: 'es',
  supportedLocales,
  // Set VITE_SITE_URL to the final production origin before launch.
  productionUrl: getProductionUrl(),
} as const satisfies SiteConfig
