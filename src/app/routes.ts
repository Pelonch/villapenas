import { siteConfig } from '../config/site.ts'
import type { Locale } from '../i18n/types.ts'
import { pageIds, type PageId } from './types.ts'

export interface Route {
  locale: Locale
  page: PageId
  isRoot: boolean
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
    }
  }

  for (const locale of siteConfig.supportedLocales) {
    for (const page of pageIds) {
      if (localizedPaths[locale][page] === normalizedPathname) {
        return { locale, page, isRoot: false }
      }
    }
  }

  return {
    locale: siteConfig.defaultLocale,
    page: 'home',
    isRoot: false,
  }
}

export function getLocalizedPath(locale: Locale, page: PageId): string {
  return localizedPaths[locale][page]
}

export function getHomeAnchorHref(locale: Locale, anchorId: HomeAnchorId): string {
  return `${getLocalizedPath(locale, 'home')}#${anchorId}`
}

export function getHomeAnchorId(hash: string): HomeAnchorId | null {
  const anchorId = hash.replace(/^#/, '')

  for (const homeAnchorId of homeAnchorIds) {
    if (homeAnchorId === anchorId) {
      return homeAnchorId
    }
  }

  return null
}

export function getLocalizedHref(
  locale: Locale,
  page: PageId,
  location: Pick<BrowserLocation, 'search' | 'hash'>,
): string {
  return `${getLocalizedPath(locale, page)}${location.search}${location.hash}`
}
