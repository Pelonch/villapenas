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

function removeMeta(attribute: 'name' | 'property', key: string): void {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

function removeLink(rel: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`

  document.head.querySelector(selector)?.remove()
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === 'es' ? 'es_CR' : 'en_CR'
}

export function usePageMetadata(route: Route): void {
  const translations = getTranslations(route.locale)
  const metadata = route.isNotFound
    ? translations.metadata.notFound
    : translations.metadata[route.page]
  const canonicalPath = route.isNotFound
    ? null
    : getLocalizedPath(route.locale, route.page)

  useEffect(() => {
    document.documentElement.lang = route.locale
    document.title = metadata.title
    upsertMeta('name', 'description', metadata.description)
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', metadata.openGraph.title)
    upsertMeta('name', 'twitter:description', metadata.openGraph.description)
    upsertMeta('property', 'og:site_name', siteConfig.businessName)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', metadata.openGraph.title)
    upsertMeta('property', 'og:description', metadata.openGraph.description)
    upsertMeta('property', 'og:locale', getOpenGraphLocale(route.locale))

    if (route.isNotFound || !canonicalPath) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
      removeMeta('property', 'og:url')
      removeLink('canonical')

      for (const locale of siteConfig.supportedLocales) {
        removeLink('alternate', locale)
      }

      removeLink('alternate', 'x-default')
      return
    }

    const canonicalUrl = getAbsoluteUrl(canonicalPath)

    upsertMeta('name', 'robots', 'index, follow')
    upsertLink('canonical', canonicalUrl)
    upsertMeta('property', 'og:url', canonicalUrl)

    for (const locale of siteConfig.supportedLocales) {
      upsertLink('alternate', getAbsoluteUrl(getLocalizedPath(locale, route.page)), locale)
    }

    upsertLink(
      'alternate',
      getAbsoluteUrl(getLocalizedPath(siteConfig.defaultLocale, route.page)),
      'x-default',
    )
  }, [canonicalPath, metadata, route.isNotFound, route.locale, route.page])
}
