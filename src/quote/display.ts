import { quoteEntityTranslations } from '../i18n/quoteEntityTranslations.ts'
import type { Locale } from '../i18n/types.ts'
import type {
  AdditionalProduct,
  AdditionalProductOption,
} from '../types/additionalProducts.ts'
import type { VenuePackage } from '../types/packages.ts'

export interface QuotePackageDisplay {
  description: string | null
  id: number
  name: string
  priceColones: number
}

export interface QuoteAdditionalProductOptionDisplay {
  description: string | null
  id: number
  includedQuantity: number | null
  name: string
  peopleQuantity: number | null
  priceColones: number
  productId: number
  unitOfMeasure: string | null
}

export interface QuoteAdditionalProductDisplay {
  description: string | null
  id: number
  name: string
  options: readonly QuoteAdditionalProductOptionDisplay[]
}

export interface QuoteCatalogDisplay {
  additionalProducts: readonly QuoteAdditionalProductDisplay[]
  packages: readonly QuotePackageDisplay[]
}

function localizeText(
  fallback: string | null,
  translation: string | undefined,
): string | null {
  return translation ?? fallback
}

function toPackageDisplay(
  venuePackage: VenuePackage,
  locale: Locale,
): QuotePackageDisplay {
  const translation = quoteEntityTranslations[locale].packages[venuePackage.id]

  return {
    id: venuePackage.id,
    name: localizeText(venuePackage.name, translation?.name) ?? venuePackage.name,
    description: localizeText(venuePackage.description, translation?.description),
    priceColones: venuePackage.priceColones,
  }
}

function toAdditionalProductOptionDisplay(
  option: AdditionalProductOption,
  locale: Locale,
): QuoteAdditionalProductOptionDisplay {
  const translation = quoteEntityTranslations[locale].additionalOptions[option.id]

  return {
    id: option.id,
    productId: option.productId,
    name: localizeText(option.name, translation?.name) ?? option.name,
    description: localizeText(option.description, translation?.description),
    includedQuantity: option.includedQuantity,
    peopleQuantity: option.peopleQuantity,
    priceColones: option.priceColones,
    unitOfMeasure: localizeText(option.unitOfMeasure, translation?.unitOfMeasure),
  }
}

function toAdditionalProductDisplay(
  product: AdditionalProduct,
  locale: Locale,
): QuoteAdditionalProductDisplay {
  const translation = quoteEntityTranslations[locale].additionalProducts[product.id]

  return {
    id: product.id,
    name: localizeText(product.name, translation?.name) ?? product.name,
    description: localizeText(product.description, translation?.description),
    options: product.options.map((option) =>
      toAdditionalProductOptionDisplay(option, locale),
    ),
  }
}

export function getQuoteCatalogDisplay(
  locale: Locale,
  packages: readonly VenuePackage[],
  additionalProducts: readonly AdditionalProduct[],
): QuoteCatalogDisplay {
  // Replace the frontend map here when the backend provides localized fields.
  return {
    packages: packages.map((venuePackage) => toPackageDisplay(venuePackage, locale)),
    additionalProducts: additionalProducts.map((product) =>
      toAdditionalProductDisplay(product, locale),
    ),
  }
}

export function getQuotePackageDisplayName(
  catalog: QuoteCatalogDisplay,
  packageId: number,
  fallbackName: string,
): string {
  return catalog.packages.find((venuePackage) => venuePackage.id === packageId)?.name ?? fallbackName
}

export function getQuoteExtraDisplayNames(
  catalog: QuoteCatalogDisplay,
  productId: number,
  fallbackProductName: string,
  optionId: number,
  fallbackOptionName: string,
): { optionName: string; productName: string } {
  const product = catalog.additionalProducts.find(
    (additionalProduct) => additionalProduct.id === productId,
  )
  const option = product?.options.find((additionalOption) => additionalOption.id === optionId)

  return {
    productName: product?.name ?? fallbackProductName,
    optionName: option?.name ?? fallbackOptionName,
  }
}
