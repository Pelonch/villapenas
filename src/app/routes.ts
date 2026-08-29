import { siteConfig } from '../config/site.ts'
import type { Locale } from '../i18n/types.ts'
import { pageIds, type PageId } from './types.ts'

export interface Route {
  locale: Locale
  page: PageId
  isRoot: boolean
  isNotFound: boolean
}

export interface BrowserLocation {
  pathname: string
  search: string
  hash: string
}

export const homeAnchorIds = [
  'ubicacion',
  'amenidades',
  'paquetes',
  'cotizador',
] as const

export type HomeAnchorId = (typeof homeAnchorIds)[number]

const localizedHomeAnchorIds: Record<Locale, Record<HomeAnchorId, string>> = {
  es: {
    ubicacion: 'ubicacion',
    amenidades: 'amenidades',
    paquetes: 'paquetes',
    cotizador: 'cotizador',
  },
  en: {
    ubicacion: 'ubicacion',
    amenidades: 'amenidades',
    paquetes: 'paquetes',
    cotizador: 'quote',
  },
}

const localizedPaths: Record<Locale, Record<PageId, string>> = {
  es: {
    home: '/es',
    policies: '/es/politicas',
    contact: '/es/contacto',
  },
  en: {
    home: '/en',
    policies: '/en/policies',
    contact: '/en/contact',
  },
}

function normalizePathname(pathname: string): string {
  const pathWithoutTrailingSlash = pathname.replace(/\/+$/, '')

  return pathWithoutTrailingSlash || '/'
}

export function getRoute(pathname: string): Route {
  const normalizedPathname = normalizePathname(pathname)

  if (normalizedPathname === '/') {
    return {
      locale: siteConfig.defaultLocale,
      page: 'home',
      isRoot: true,
      isNotFound: false,
    }
  }

  for (const locale of siteConfig.supportedLocales) {
    for (const page of pageIds) {
      if (localizedPaths[locale][page] === normalizedPathname) {
        return { locale, page, isRoot: false, isNotFound: false }
      }
    }
  }

  const locale = siteConfig.supportedLocales.find(
    (supportedLocale) =>
      normalizedPathname === `/${supportedLocale}` ||
      normalizedPathname.startsWith(`/${supportedLocale}/`),
  )

  return {
    locale: locale ?? siteConfig.defaultLocale,
    page: 'home',
    isRoot: false,
    isNotFound: true,
  }
}

export function getLocalizedPath(locale: Locale, page: PageId): string {
  return localizedPaths[locale][page]
}

export function getHomeAnchorHash(locale: Locale, anchorId: HomeAnchorId): string {
  return localizedHomeAnchorIds[locale][anchorId]
}

export function getHomeAnchorHref(locale: Locale, anchorId: HomeAnchorId): string {
  return `${getLocalizedPath(locale, 'home')}#${getHomeAnchorHash(locale, anchorId)}`
}

export function getHomeAnchorId(hash: string): HomeAnchorId | null {
  const hashId = hash.replace(/^#/, '')

  for (const locale of siteConfig.supportedLocales) {
    for (const homeAnchorId of homeAnchorIds) {
      if (localizedHomeAnchorIds[locale][homeAnchorId] === hashId) {
        return homeAnchorId
      }
    }
  }

  return null
}

export function getLocalizedHref(
  locale: Locale,
  page: PageId,
  location: Pick<BrowserLocation, 'search' | 'hash'>,
): string {
  const homeAnchorId = page === 'home' ? getHomeAnchorId(location.hash) : null
  const hash = homeAnchorId
    ? `#${getHomeAnchorHash(locale, homeAnchorId)}`
    : location.hash

  return `${getLocalizedPath(locale, page)}${location.search}${hash}`
}
