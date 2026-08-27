import { Container } from '../ui/Container.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'
import type { HomeSectionContent } from '../../i18n/types.ts'

export type PlaceholderTone = 'paper' | 'cream' | 'sand' | 'olive' | 'ink'

interface StructuralPlaceholderSectionProps {
  content: HomeSectionContent
  id: string
  index: number
  tone: PlaceholderTone
}

const toneClasses: Record<
  PlaceholderTone,
  { section: string; panel: string; panelText: string; headingTone: 'dark' | 'light' }
> = {
  paper: {
    section: 'bg-paper text-ink',
    panel: 'border-ink/15 bg-cream/45',
    panelText: 'text-ink/70',
    headingTone: 'dark',
  },
  cream: {
    section: 'bg-cream text-ink',
    panel: 'border-ink/15 bg-paper/45',
    panelText: 'text-ink/70',
    headingTone: 'dark',
  },
  sand: {
    section: 'bg-sand text-ink',
    panel: 'border-ink/20 bg-paper/35',
    panelText: 'text-ink/75',
    headingTone: 'dark',
  },
  olive: {
    section: 'bg-olive text-paper',
    panel: 'border-paper/25 bg-moss/30',
    panelText: 'text-paper/75',
    headingTone: 'light',
  },
  ink: {
    section: 'bg-ink text-paper',
    panel: 'border-paper/20 bg-bark/40',
    panelText: 'text-paper/75',
    headingTone: 'light',
  },
}

export function StructuralPlaceholderSection({
  content,
  id,
  index,
  tone,
}: StructuralPlaceholderSectionProps) {
  const styles = toneClasses[tone]
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-24 sm:py-32 lg:py-40 ${styles.section}`}
      aria-labelledby={titleId}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow={`${String(index).padStart(2, '0')} / ${content.eyebrow}`}
            id={titleId}
            title={content.heading}
            tone={styles.headingTone}
          />
          <div className={`border p-6 sm:p-8 ${styles.panel}`}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {content.status}
            </p>
            <p className={`mt-8 max-w-md text-base leading-8 ${styles.panelText}`}>
              {content.placeholder}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
