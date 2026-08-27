import { en } from './en.ts'
import { es } from './es.ts'
import type { Locale, TranslationCatalog } from './types.ts'

export const translations: Record<Locale, TranslationCatalog> = {
  es,
  en,
}

export function getTranslations(locale: Locale): TranslationCatalog {
  return translations[locale]
}
