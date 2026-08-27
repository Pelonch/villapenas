import type { PageId } from '../app/types.ts'

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

export interface HomePageContent {
  hero: HomeSectionContent
  location: HomeSectionContent
  amenities: HomeSectionContent
  packages: HomeSectionContent
  instagram: HomeSectionContent
  quote: HomeSectionContent
}

export interface TranslationCatalog {
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
