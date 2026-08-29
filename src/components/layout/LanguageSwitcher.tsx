import {
  getLocalizedHref,
  type BrowserLocation,
} from '../../app/routes.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import type { Locale } from '../../i18n/types.ts'
import type { PageId } from '../../app/types.ts'
import type { MouseEvent } from 'react'

interface LanguageSwitcherProps {
  className?: string
  locale: Locale
  page: PageId
  location: Pick<BrowserLocation, 'search' | 'hash'>
  onNavigate?: () => void
}

export function LanguageSwitcher({
  className = '',
  locale,
  page,
  location,
  onNavigate,
}: LanguageSwitcherProps) {
  const translations = getTranslations(locale)

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    targetLocale: Locale,
  ) => {
    onNavigate?.()

    if (
      targetLocale === locale ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()
    window.history.pushState(null, '', event.currentTarget.href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div
      className={`flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] ${className}`}
      role="group"
      aria-label={translations.languageSwitcher.label}
    >
      {siteConfig.supportedLocales.map((targetLocale, index) => (
        <div key={targetLocale} className="flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <a
            className={`rounded-sm px-1 py-2 transition-colors hover:text-gold ${
              targetLocale === locale ? 'text-gold' : ''
            }`}
            href={getLocalizedHref(targetLocale, page, location)}
            aria-current={targetLocale === locale ? 'true' : undefined}
            onClick={(event) => handleNavigate(event, targetLocale)}
          >
            {targetLocale.toUpperCase()}
          </a>
        </div>
      ))}
    </div>
  )
}
