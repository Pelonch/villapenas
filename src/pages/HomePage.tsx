import { FloatingQuoteCta } from '../components/home/FloatingQuoteCta.tsx'
import { Hero } from '../components/home/Hero.tsx'
import {
  StructuralPlaceholderSection,
  type PlaceholderTone,
} from '../components/home/StructuralPlaceholderSection.tsx'
import type { HomePageContent } from '../i18n/types.ts'

interface HomePageProps {
  content: HomePageContent
  isExperienceActive: boolean
  onHeaderVisibilityChange: (isVisible: boolean) => void
  onMediaReady: () => void
  onMediaUnavailable: () => void
  quoteLabel: string
}

export function HomePage({
  content,
  isExperienceActive,
  onHeaderVisibilityChange,
  onMediaReady,
  onMediaUnavailable,
  quoteLabel,
}: HomePageProps) {
  const sections: ReadonlyArray<{
    content: HomePageContent[keyof Omit<HomePageContent, 'hero'>]
    id: string
    tone: PlaceholderTone
  }> = [
    { content: content.location, id: 'ubicacion', tone: 'paper' },
    { content: content.amenities, id: 'amenidades', tone: 'cream' },
    { content: content.packages, id: 'paquetes', tone: 'ink' },
    { content: content.instagram, id: 'instagram', tone: 'olive' },
    { content: content.quote, id: 'cotizador', tone: 'sand' },
  ]

  return (
    <>
      <Hero
        content={content.hero}
        isExperienceActive={isExperienceActive}
        onHeaderVisibilityChange={onHeaderVisibilityChange}
        onMediaReady={onMediaReady}
        onMediaUnavailable={onMediaUnavailable}
      />
      {sections.map((section, index) => (
        <StructuralPlaceholderSection
          key={section.id}
          content={section.content}
          id={section.id}
          index={index + 1}
          tone={section.tone}
        />
      ))}
      <FloatingQuoteCta isVisible={isExperienceActive} label={quoteLabel} />
    </>
  )
}
