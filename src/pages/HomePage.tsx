import { useState } from 'react'
import { AmenitiesSection } from '../components/home/AmenitiesSection.tsx'
import { FloatingQuoteCta } from '../components/home/FloatingQuoteCta.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { InstagramSection } from '../components/home/InstagramSection.tsx'
import { LocationSection } from '../components/home/LocationSection.tsx'
import { PackagesSection } from '../components/home/PackagesSection.tsx'
import { QuoteCalculator } from '../components/home/QuoteCalculator.tsx'
import { getHomeAnchorHref } from '../app/routes.ts'
import type { HomePageContent, Locale } from '../i18n/types.ts'
import { QuoteProvider } from '../quote/QuoteProvider.tsx'

interface HomePageProps {
  content: HomePageContent
  locale: Locale
  isExperienceActive: boolean
  onHeaderVisibilityChange: (isVisible: boolean) => void
  onMediaReady: () => void
  onMediaUnavailable: () => void
  quoteLabel: string
}

export function HomePage({
  content,
  locale,
  isExperienceActive,
  onHeaderVisibilityChange,
  onMediaReady,
  onMediaUnavailable,
  quoteLabel,
}: HomePageProps) {
  const [isQuoteVisibleOnMobile, setIsQuoteVisibleOnMobile] = useState(false)

  return (
    <QuoteProvider>
      <Hero
        content={content.hero}
        isExperienceActive={isExperienceActive}
        onHeaderVisibilityChange={onHeaderVisibilityChange}
        onMediaReady={onMediaReady}
        onMediaUnavailable={onMediaUnavailable}
      />
      <LocationSection content={content.location} />
      <AmenitiesSection content={content.amenities} />
      <PackagesSection content={content.packages} locale={locale} />
      <InstagramSection content={content.instagram} />
      <QuoteCalculator
        content={content.quote}
        locale={locale}
        onMobileVisibilityChange={setIsQuoteVisibleOnMobile}
      />
      <FloatingQuoteCta
        isHiddenOnMobile={isQuoteVisibleOnMobile}
        isVisible={isExperienceActive}
        label={quoteLabel}
        href={getHomeAnchorHref(locale, 'cotizador')}
      />
    </QuoteProvider>
  )
}
