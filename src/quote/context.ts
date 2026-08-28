import { createContext, useContext } from 'react'
import type { AdditionalProductsLoadState } from '../hooks/useAdditionalProducts.ts'
import type { PackagesLoadState } from '../hooks/usePackages.ts'
import type { QuoteEventField, QuoteSelection } from './types.ts'

export interface QuoteContextValue {
  additionalProductsState: AdditionalProductsLoadState
  packagesState: PackagesLoadState
  quoteSelection: QuoteSelection
  retryAdditionalProducts: () => void
  retryPackages: () => void
  setEventField: (field: QuoteEventField, value: string) => void
  setGuestCount: (guestCount: number | null) => void
  selectOption: (productId: number, optionId: number) => void
  selectPackage: (packageId: number) => void
  toggleProduct: (productId: number, isSelected: boolean) => void
}

export const QuoteContext = createContext<QuoteContextValue | null>(null)

export function useQuoteContext(): QuoteContextValue {
  const context = useContext(QuoteContext)

  if (context === null) {
    throw new Error('useQuoteContext must be used within QuoteProvider.')
  }

  return context
}
