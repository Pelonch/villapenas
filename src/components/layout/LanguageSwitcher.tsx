import { getLocalizedHref, type BrowserLocation } from '../../app/routes.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import type { Locale } from '../../i18n/types.ts'
import type { PageId } from '../../app/types.ts'

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
            onClick={onNavigate}
          >
            {targetLocale.toUpperCase()}
          </a>
        </div>
      ))}
    </div>
  )
}
