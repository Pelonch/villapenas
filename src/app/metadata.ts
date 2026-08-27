import { useEffect } from 'react'
import { siteConfig } from '../config/site.ts'
import { getTranslations } from '../i18n/translations.ts'
import type { Locale } from '../i18n/types.ts'
import { getLocalizedPath, type Route } from './routes.ts'

function getSiteOrigin(): string {
  return siteConfig.productionUrl ?? window.location.origin
}

function getAbsoluteUrl(path: string): string {
  return new URL(path, getSiteOrigin()).toString()
}

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`
  let metaElement = document.head.querySelector<HTMLMetaElement>(selector)

  if (!metaElement) {
    metaElement = document.createElement('meta')
    metaElement.setAttribute(attribute, key)
    document.head.append(metaElement)
  }

  metaElement.content = content
}

function upsertLink(
  rel: string,
  href: string,
  hreflang?: string,
): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let linkElement = document.head.querySelector<HTMLLinkElement>(selector)

  if (!linkElement) {
    linkElement = document.createElement('link')
    linkElement.rel = rel

    if (hreflang) {
      linkElement.hreflang = hreflang
    }

    document.head.append(linkElement)
  }

  linkElement.href = href
}

function getOpenGraphLocale(locale: Locale): string {
  return locale === 'es' ? 'es_CR' : 'en_CR'
}

export function usePageMetadata(route: Route): void {
  const metadata = getTranslations(route.locale).metadata[route.page]
  const canonicalPath = getLocalizedPath(route.locale, route.page)

  useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(canonicalPath)

    document.documentElement.lang = route.locale
    document.title = metadata.title
    upsertMeta('name', 'description', metadata.description)
    upsertLink('canonical', canonicalUrl)
    upsertMeta('property', 'og:site_name', siteConfig.businessName)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', metadata.openGraph.title)
    upsertMeta('property', 'og:description', metadata.openGraph.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:locale', getOpenGraphLocale(route.locale))

    for (const locale of siteConfig.supportedLocales) {
      upsertLink('alternate', getAbsoluteUrl(getLocalizedPath(locale, route.page)), locale)
    }

    upsertLink(
      'alternate',
      getAbsoluteUrl(getLocalizedPath(siteConfig.defaultLocale, route.page)),
      'x-default',
    )
  }, [canonicalPath, metadata, route.locale, route.page])
}
