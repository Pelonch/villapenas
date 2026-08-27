import { Fragment } from 'react'
import { getLocalizedHref, type BrowserLocation } from '../../app/routes.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import type { Locale } from '../../i18n/types.ts'
import type { PageId } from '../../app/types.ts'

interface LanguageSwitcherProps {
  locale: Locale
  page: PageId
  location: Pick<BrowserLocation, 'search' | 'hash'>
}

export function LanguageSwitcher({
  locale,
  page,
  location,
}: LanguageSwitcherProps) {
  const translations = getTranslations(locale)

  return (
    <nav aria-label={translations.languageSwitcher.label}>
      {siteConfig.supportedLocales.map((targetLocale, index) => (
        <Fragment key={targetLocale}>
          {index > 0 ? <span aria-hidden="true"> | </span> : null}
          <a
            href={getLocalizedHref(targetLocale, page, location)}
            aria-current={targetLocale === locale ? 'page' : undefined}
          >
            {targetLocale.toUpperCase()}
          </a>
        </Fragment>
      ))}
    </nav>
  )
}
