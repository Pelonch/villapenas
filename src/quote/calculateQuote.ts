import type { AdditionalProduct } from '../types/additionalProducts.ts'
import type { VenuePackage } from '../types/packages.ts'
import type { QuoteSelection } from './types.ts'

export interface QuoteExtraLine {
  extraHours: number
  peopleQuantity: number | null
  productId: number
  productName: string
  optionId: number
  optionName: string
  priceColones: number
}

export interface QuoteCalculation {
  selectedPackage: VenuePackage | null
  extras: readonly QuoteExtraLine[]
  incompleteProducts: readonly AdditionalProduct[]
  packageSubtotal: number
  selectedExtraHours: number
  additionalSubtotal: number
  estimatedTotal: number | null
}

export function calculateQuote(
  selection: QuoteSelection,
  packages: readonly VenuePackage[],
  additionalProducts: readonly AdditionalProduct[],
): QuoteCalculation {
  const selectedPackage =
    packages.find((venuePackage) => venuePackage.id === selection.selectedPackageId) ?? null

  if (selectedPackage === null) {
    return {
      selectedPackage: null,
      extras: [],
      incompleteProducts: [],
      packageSubtotal: 0,
      selectedExtraHours: 0,
      additionalSubtotal: 0,
      estimatedTotal: null,
    }
  }

  const extras: QuoteExtraLine[] = []
  const incompleteProducts: AdditionalProduct[] = []

  for (const product of additionalProducts) {
    if (!selection.selectedProductIds.has(product.id)) {
      continue
    }

    const selectedOptionId = selection.selectedOptionIdsByProduct.get(product.id)
    const selectedOption = product.options.find(
      (option) => option.id === selectedOptionId,
    )

    if (!selectedOption) {
      incompleteProducts.push(product)
      continue
    }

    extras.push({
      extraHours: selectedOption.extraHours ?? 0,
      peopleQuantity: selectedOption.peopleQuantity,
      productId: product.id,
      productName: product.name,
      optionId: selectedOption.id,
      optionName: selectedOption.name,
      priceColones: selectedOption.priceColones,
    })
  }

  const additionalSubtotal = extras.reduce(
    (total, extra) => total + extra.priceColones,
    0,
  )
  const selectedExtraHours = extras.reduce(
    (total, extra) => total + extra.extraHours,
    0,
  )

  return {
    selectedPackage,
    extras,
    incompleteProducts,
    packageSubtotal: selectedPackage.priceColones,
    selectedExtraHours,
    additionalSubtotal,
    estimatedTotal: selectedPackage.priceColones + additionalSubtotal,
  }
}
