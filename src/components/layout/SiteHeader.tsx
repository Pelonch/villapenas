import { getLocalizedPath, type BrowserLocation, type Route } from '../../app/routes.ts'
import { pageIds } from '../../app/types.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

interface SiteHeaderProps {
  route: Route
  location: BrowserLocation
}

export function SiteHeader({ location, route }: SiteHeaderProps) {
  const translations = getTranslations(route.locale)

  return (
    <header>
      <nav aria-label={translations.navigation.label}>
        <a href={getLocalizedPath(route.locale, 'home')}>{siteConfig.businessName}</a>
        <ul>
          {pageIds.map((page) => (
            <li key={page}>
              <a
                href={getLocalizedPath(route.locale, page)}
                aria-current={route.page === page ? 'page' : undefined}
              >
                {translations.navigation[page]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <LanguageSwitcher
        locale={route.locale}
        page={route.page}
        location={location}
      />
    </header>
  )
}
