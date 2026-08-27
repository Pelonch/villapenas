import { getTranslations } from '../i18n/translations.ts'
import { ContactPage } from '../pages/ContactPage.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { PoliciesPage } from '../pages/PoliciesPage.tsx'
import type { Route } from './routes.ts'

interface RouteViewProps {
  route: Route
}

export function RouteView({ route }: RouteViewProps) {
  const pages = getTranslations(route.locale).pages

  switch (route.page) {
    case 'home':
      return <HomePage content={pages.home} />
    case 'policies':
      return <PoliciesPage content={pages.policies} />
    case 'contact':
      return <ContactPage content={pages.contact} />
  }
}
