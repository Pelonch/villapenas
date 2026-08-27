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

export interface PageContent {
  heading: string
  placeholder: string
}

export interface TranslationCatalog {
  navigation: {
    label: string
  } & Record<PageId, string>
  languageSwitcher: {
    label: string
  }
  pages: Record<PageId, PageContent>
  metadata: Record<PageId, PageMetadata>
}
