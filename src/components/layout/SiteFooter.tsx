import { getLocalizedPath, type BrowserLocation, type Route } from '../../app/routes.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import { Container } from '../ui/Container.tsx'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

interface SiteFooterProps {
  location: BrowserLocation
  route: Route
}

export function SiteFooter({ location, route }: SiteFooterProps) {
  const translations = getTranslations(route.locale)
  const homePath = getLocalizedPath(route.locale, 'home')

  return (
    <footer className="border-t border-paper/15 bg-ink py-12 text-paper sm:py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <a
            className="font-display text-3xl tracking-[-0.045em] transition-colors hover:text-sand"
            href={homePath}
          >
            {siteConfig.businessName}
          </a>
          <div className="flex flex-col gap-7 sm:items-end">
            <nav aria-label={translations.footer.navigationLabel}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                <li>
                  <a
                    className="inline-flex min-h-11 items-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-paper/75 transition-colors hover:text-sand sm:min-h-0"
                    href={getLocalizedPath(route.locale, 'policies')}
                    aria-current={route.page === 'policies' ? 'page' : undefined}
                  >
                    {translations.navigation.policies}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex min-h-11 items-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-paper/75 transition-colors hover:text-sand sm:min-h-0"
                    href={getLocalizedPath(route.locale, 'contact')}
                    aria-current={route.page === 'contact' ? 'page' : undefined}
                  >
                    {translations.navigation.contact}
                  </a>
                </li>
              </ul>
            </nav>
            <LanguageSwitcher
              className="text-paper/75"
              activeClassName="text-gold-light"
              linkClassName="inline-flex min-h-11 min-w-11 items-center justify-center sm:min-h-0 sm:min-w-0"
              locale={route.locale}
              page={route.page}
              location={location}
            />
          </div>
        </div>
        <p className="mt-12 border-t border-paper/15 pt-5 text-xs leading-6 text-paper/60">
          {translations.footer.copyright(new Date().getFullYear())}
        </p>
      </Container>
    </footer>
  )
}
