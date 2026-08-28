import type { PageId } from '../app/types.ts'
import type { TravelTimeId } from '../config/location.ts'

export const supportedLocales = ['es', 'en'] as const

export type Locale = (typeof supportedLocales)[number]

export interface PageMetadata {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
  }
}

export interface PlaceholderPageContent {
  heading: string
  placeholder: string
}

export interface HomeSectionContent {
  eyebrow: string
  heading: string
  placeholder: string
  status: string
}

export type AmenityGroupId = 'rancho' | 'pool' | 'bbq'

export interface AmenityImage {
  src: string
  alt: string
}

export interface AmenityGroup {
  id: AmenityGroupId
  category: string
  title: string
  description: string
  images: readonly [AmenityImage, AmenityImage, AmenityImage]
}

export interface AmenitiesContent {
  eyebrow: string
  heading: string
  description: string
  groups: readonly AmenityGroup[]
}

export interface PackagesContent {
  eyebrow: string
  heading: string
  description: string
  priceLabel: string
  includedServices: string
  showAllServices: string
  showLessServices: string
  selectPackage: string
  loading: string
  empty: string
  error: string
  retry: string
  packageImageAlt: (packageName: string) => string
  formatPrice: (priceColones: number) => string
}

export interface SocialItemContent {
  alt: string
  caption: string
}

export interface InstagramContent {
  eyebrow: string
  heading: string
  description: string
  viewOnInstagram: string
  openPost: (caption: string) => string
  profileCta: string
  profileCtaNewTab: string
  items: Readonly<Record<string, SocialItemContent | undefined>>
}

export interface HeroContent {
  heading: string
  aerialPreviewLabel: string
  openAerialDialog: string
  aerialDialogTitle: string
  closeAerialDialog: string
}

export interface LocationContent {
  eyebrow: string
  heading: string
  description: string
  address: string
  openMaps: string
  openMapsNewTab: string
  travelTimesLabel: string
  travelTimeLabels: Record<TravelTimeId, string>
  formatTravelTime: (minutes: number) => string
  illustratedMapAlt: string
}

export interface HomePageContent {
  hero: HeroContent
  location: LocationContent
  amenities: AmenitiesContent
  packages: PackagesContent
  instagram: InstagramContent
  quote: HomeSectionContent
}

export interface TranslationCatalog {
  loader: {
    tagline: string
  }
  navigation: {
    label: string
    location: string
    amenities: string
    packages: string
    quote: string
    openMenu: string
    closeMenu: string
  } & Record<PageId, string>
  languageSwitcher: {
    label: string
  }
  footer: {
    navigationLabel: string
    copyright: (year: number) => string
  }
  pages: {
    home: HomePageContent
    policies: PlaceholderPageContent
    contact: PlaceholderPageContent
  }
  metadata: Record<PageId, PageMetadata>
}
