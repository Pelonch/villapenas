import { quoteCapacityConfig } from '../config/quoteCapacity.ts'
import type { AdditionalProduct } from '../types/additionalProducts.ts'
import type { QuoteCalculation } from './calculateQuote.ts'
import type { QuoteSelection } from './types.ts'

export interface GuestCapacity {
  additionalGuestCapacity: number | null
  capacityOptionId: number | null
  maximumGuests: number
}

function getAdditionalGuestCapacity(value: number | null | undefined): number | null {
  return value !== null &&
    value !== undefined &&
    Number.isInteger(value) &&
    value > 0
    ? value
    : null
}

function getMaximumGuests(additionalGuestCapacity: number | null): number {
  return additionalGuestCapacity === null
    ? quoteCapacityConfig.includedGuestLimit
    : quoteCapacityConfig.includedGuestLimit + additionalGuestCapacity
}

function getCapacityProduct(
  additionalProducts: readonly AdditionalProduct[],
): AdditionalProduct | undefined {
  return additionalProducts.find(
    (product) => product.id === quoteCapacityConfig.capacityExtraProductId,
  )
}

export function getCapacityOptions(
  additionalProducts: readonly AdditionalProduct[],
): readonly AdditionalProduct['options'][number][] {
  return (
    getCapacityProduct(additionalProducts)?.options.filter(
      (option) => getAdditionalGuestCapacity(option.peopleQuantity) !== null,
    ) ?? []
  )
}

function getSelectedCapacityExtra(
  selection: QuoteSelection,
  additionalProducts: readonly AdditionalProduct[],
): AdditionalProduct['options'][number] | null {
  const capacityProduct = getCapacityProduct(additionalProducts)
  const selectedOptionId = selection.selectedOptionIdsByProduct.get(
    quoteCapacityConfig.capacityExtraProductId,
  )

  if (
    capacityProduct === undefined ||
    !selection.selectedProductIds.has(quoteCapacityConfig.capacityExtraProductId)
  ) {
    return null
  }

  return (
    capacityProduct.options.find((option) => option.id === selectedOptionId) ?? null
  )
}

export function getGuestCapacity(
  selection: QuoteSelection,
  additionalProducts: readonly AdditionalProduct[],
): GuestCapacity {
  const selectedCapacityExtra = getSelectedCapacityExtra(selection, additionalProducts)
  const additionalGuestCapacity = getAdditionalGuestCapacity(
    selectedCapacityExtra?.peopleQuantity,
  )

  return {
    additionalGuestCapacity,
    capacityOptionId:
      additionalGuestCapacity === null ? null : selectedCapacityExtra?.id ?? null,
    maximumGuests: getMaximumGuests(additionalGuestCapacity),
  }
}

export function getGuestCapacityFromCalculation(
  calculation: QuoteCalculation,
): GuestCapacity {
  const capacityExtra = calculation.extras.find(
    (extra) => extra.productId === quoteCapacityConfig.capacityExtraProductId,
  )
  const additionalGuestCapacity = getAdditionalGuestCapacity(
    capacityExtra?.peopleQuantity,
  )

  return {
    additionalGuestCapacity,
    capacityOptionId:
      additionalGuestCapacity === null ? null : capacityExtra?.optionId ?? null,
    maximumGuests: getMaximumGuests(additionalGuestCapacity),
  }
}
