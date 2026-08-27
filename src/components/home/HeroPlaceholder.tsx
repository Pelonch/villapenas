import { Container } from '../ui/Container.tsx'
import type { HomeSectionContent } from '../../i18n/types.ts'

interface HeroPlaceholderProps {
  content: HomeSectionContent
}

export function HeroPlaceholder({ content }: HeroPlaceholderProps) {
  return (
    <section
      className="bg-ink text-paper"
      aria-labelledby="home-title"
    >
      <Container className="flex min-h-[min(44rem,82svh)] items-end py-28 sm:py-32">
        <div className="max-w-4xl border-l border-gold pl-6 sm:pl-9">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-sand">
            {content.eyebrow}
          </p>
          <h1
            id="home-title"
            className="mt-6 font-display text-6xl leading-[0.82] tracking-[-0.065em] text-paper sm:text-7xl lg:text-8xl"
          >
            {content.heading}
          </h1>
          <div className="mt-12 max-w-md border-t border-paper/25 pt-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              {content.status}
            </p>
            <p className="mt-3 text-sm leading-7 text-paper/75 sm:text-base">
              {content.placeholder}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
