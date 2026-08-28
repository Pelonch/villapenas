import { useReducer, type PropsWithChildren } from 'react'
import { useAdditionalProducts } from '../hooks/useAdditionalProducts.ts'
import { usePackages } from '../hooks/usePackages.ts'
import { QuoteContext } from './context.ts'
import {
  initialQuoteSelection,
  quoteSelectionReducer,
} from './types.ts'

export function QuoteProvider({ children }: PropsWithChildren) {
  const { retry: retryPackages, state: packagesState } = usePackages()
  const {
    retry: retryAdditionalProducts,
    state: additionalProductsState,
  } = useAdditionalProducts()
  const [quoteSelection, dispatch] = useReducer(
    quoteSelectionReducer,
    initialQuoteSelection,
  )
  const additionalProducts =
    additionalProductsState.status === 'success'
      ? additionalProductsState.products
      : []

  return (
    <QuoteContext.Provider
      value={{
        additionalProductsState,
        packagesState,
        quoteSelection,
        retryAdditionalProducts,
        retryPackages,
        setEventField: (field, value) =>
          dispatch({ type: 'set-event-field', field, value }),
        setGuestCount: (guestCount) =>
          dispatch({ type: 'set-guest-count', guestCount, additionalProducts }),
        selectOption: (productId, optionId) =>
          dispatch({
            type: 'select-option',
            productId,
            optionId,
            additionalProducts,
          }),
        selectPackage: (packageId) => dispatch({ type: 'select-package', packageId }),
        toggleProduct: (productId, isSelected) =>
          dispatch({
            type: 'toggle-product',
            productId,
            isSelected,
            additionalProducts,
          }),
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}
