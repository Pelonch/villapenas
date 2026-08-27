import { Container } from '../components/ui/Container.tsx'
import { siteConfig } from '../config/site.ts'
import type { PlaceholderPageContent } from '../i18n/types.ts'

export interface PlaceholderPageProps {
  content: PlaceholderPageContent
}

export function PagePlaceholder({ content }: PlaceholderPageProps) {
  return (
    <section className="min-h-[70svh] bg-paper py-32 sm:py-40" aria-labelledby="page-title">
      <Container className="max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {siteConfig.businessName}
        </p>
        <h1
          id="page-title"
          className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl"
        >
          {content.heading}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-ink/70 sm:text-lg">
          {content.placeholder}
        </p>
      </Container>
    </section>
  )
}
