import { getTranslations } from '../i18n/translations.ts'
import { ContactPage } from '../pages/ContactPage.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { PoliciesPage } from '../pages/PoliciesPage.tsx'
import type { Route } from './routes.ts'

interface RouteViewProps {
  route: Route
  isHomeExperienceActive: boolean
  onHeroHeaderVisibilityChange: (isVisible: boolean) => void
  onHeroMediaReady: () => void
  onHeroMediaUnavailable: () => void
}

export function RouteView({
  route,
  isHomeExperienceActive,
  onHeroHeaderVisibilityChange,
  onHeroMediaReady,
  onHeroMediaUnavailable,
}: RouteViewProps) {
  const translations = getTranslations(route.locale)
  const pages = translations.pages

  switch (route.page) {
    case 'home':
      return (
        <HomePage
          content={pages.home}
          isExperienceActive={isHomeExperienceActive}
          onHeaderVisibilityChange={onHeroHeaderVisibilityChange}
          onMediaReady={onHeroMediaReady}
          onMediaUnavailable={onHeroMediaUnavailable}
          quoteLabel={translations.navigation.quote}
        />
      )
    case 'policies':
      return <PoliciesPage content={pages.policies} />
    case 'contact':
      return <ContactPage content={pages.contact} />
  }
}
