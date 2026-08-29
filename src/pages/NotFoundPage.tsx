import { getLocalizedPath } from '../app/routes.ts'
import { Button } from '../components/ui/Button.tsx'
import { Container } from '../components/ui/Container.tsx'
import { siteConfig } from '../config/site.ts'
import type { Locale, NotFoundPageContent } from '../i18n/types.ts'

interface NotFoundPageProps {
  content: NotFoundPageContent
  locale: Locale
}

export function NotFoundPage({ content, locale }: NotFoundPageProps) {
  return (
    <article className="min-h-[70svh] bg-paper pt-36 pb-20 text-ink sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36">
      <Container className="max-w-4xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {content.eyebrow} / {siteConfig.businessName}
        </p>
        <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
          {content.heading}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-ink/75 sm:mt-10 sm:text-lg">
          {content.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4 sm:mt-12">
          <Button href={getLocalizedPath(locale, 'home')}>
            {content.homeCta}
          </Button>
          <Button href={getLocalizedPath(locale, 'contact')} variant="secondary">
            {content.contactCta}
          </Button>
        </div>
      </Container>
    </article>
  )
}
