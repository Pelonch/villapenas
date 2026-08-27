import { getTranslations } from '../i18n/translations.ts'
import { ContactPage } from '../pages/ContactPage.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { PoliciesPage } from '../pages/PoliciesPage.tsx'
import type { Route } from './routes.ts'

interface RouteViewProps {
  route: Route
}

export function RouteView({ route }: RouteViewProps) {
  const content = getTranslations(route.locale).pages[route.page]

  switch (route.page) {
    case 'home':
      return <HomePage content={content} />
    case 'policies':
      return <PoliciesPage content={content} />
    case 'contact':
      return <ContactPage content={content} />
  }
}
