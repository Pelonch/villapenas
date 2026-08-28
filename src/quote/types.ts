import type { AdditionalProduct } from '../types/additionalProducts.ts'
import { getGuestCapacity } from './capacity.ts'

export interface QuoteSelection {
  eventDate: string
  guestCount: number | null
  selectedPackageId: number | null
  selectedProductIds: ReadonlySet<number>
  selectedOptionIdsByProduct: ReadonlyMap<number, number>
  startTime: string
}

export type QuoteEventField = 'eventDate' | 'startTime'

export interface QuoteEventDetails {
  eventDate: string
  guestCount: number | null
  startTime: string
}

export type QuoteAction =
  | { type: 'set-event-field'; field: QuoteEventField; value: string }
  | {
      type: 'set-guest-count'
      guestCount: number | null
      additionalProducts: readonly AdditionalProduct[]
    }
  | { type: 'select-package'; packageId: number }
  | {
      type: 'toggle-product'
      productId: number
      isSelected: boolean
      additionalProducts: readonly AdditionalProduct[]
    }
  | {
      type: 'select-option'
      productId: number
      optionId: number
      additionalProducts: readonly AdditionalProduct[]
    }

export const initialQuoteSelection: QuoteSelection = {
  eventDate: '',
  guestCount: null,
  selectedPackageId: null,
  selectedProductIds: new Set(),
  selectedOptionIdsByProduct: new Map(),
  startTime: '',
}

export function quoteSelectionReducer(
  state: QuoteSelection,
  action: QuoteAction,
): QuoteSelection {
  switch (action.type) {
    case 'set-event-field':
      return { ...state, [action.field]: action.value }
    case 'set-guest-count': {
      const guestCount = action.guestCount
      const { maximumGuests } = getGuestCapacity(state, action.additionalProducts)

      return {
        ...state,
        guestCount:
          guestCount !== null && Number.isInteger(guestCount) && guestCount >= 1
            ? Math.min(guestCount, maximumGuests)
            : null,
      }
    }
    case 'select-package':
      return { ...state, selectedPackageId: action.packageId }
    case 'toggle-product': {
      const selectedProductIds = new Set(state.selectedProductIds)
      const selectedOptionIdsByProduct = new Map(state.selectedOptionIdsByProduct)

      if (action.isSelected) {
        selectedProductIds.add(action.productId)
      } else {
        selectedProductIds.delete(action.productId)
        selectedOptionIdsByProduct.delete(action.productId)
      }

      const nextSelection = {
        ...state,
        selectedProductIds,
        selectedOptionIdsByProduct,
      }
      const { maximumGuests } = getGuestCapacity(
        nextSelection,
        action.additionalProducts,
      )

      return {
        ...nextSelection,
        guestCount:
          state.guestCount === null
            ? null
            : Math.min(state.guestCount, maximumGuests),
      }
    }
    case 'select-option': {
      const selectedProductIds = new Set(state.selectedProductIds)
      const selectedOptionIdsByProduct = new Map(state.selectedOptionIdsByProduct)

      selectedProductIds.add(action.productId)
      selectedOptionIdsByProduct.set(action.productId, action.optionId)

      const nextSelection = {
        ...state,
        selectedProductIds,
        selectedOptionIdsByProduct,
      }
      const { maximumGuests } = getGuestCapacity(
        nextSelection,
        action.additionalProducts,
      )

      return {
        ...nextSelection,
        guestCount:
          state.guestCount === null
            ? null
            : Math.min(state.guestCount, maximumGuests),
      }
    }
  }
}
