import { AmenitiesSection } from '../components/home/AmenitiesSection.tsx'
import { FloatingQuoteCta } from '../components/home/FloatingQuoteCta.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { LocationSection } from '../components/home/LocationSection.tsx'
import {
  StructuralPlaceholderSection,
  type PlaceholderTone,
} from '../components/home/StructuralPlaceholderSection.tsx'
import type { HomePageContent, HomeSectionContent } from '../i18n/types.ts'

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
    content: HomeSectionContent
    id: string
    index: number
    tone: PlaceholderTone
  }> = [
    { content: content.packages, id: 'paquetes', index: 3, tone: 'ink' },
    { content: content.instagram, id: 'instagram', index: 4, tone: 'olive' },
    { content: content.quote, id: 'cotizador', index: 5, tone: 'sand' },
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
      <LocationSection content={content.location} />
      <AmenitiesSection content={content.amenities} />
      {sections.map((section) => (
        <StructuralPlaceholderSection
          key={section.id}
          content={section.content}
          id={section.id}
          index={section.index}
          tone={section.tone}
        />
      ))}
      <FloatingQuoteCta isVisible={isExperienceActive} label={quoteLabel} />
    </>
  )
}
