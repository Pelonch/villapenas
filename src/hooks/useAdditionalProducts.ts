import { useEffect, useState } from 'react'
import { fetchAdditionalProducts } from '../services/additionalProducts.ts'
import type { AdditionalProduct } from '../types/additionalProducts.ts'

export type AdditionalProductsLoadState =
  | { status: 'loading' }
  | { status: 'success'; products: readonly AdditionalProduct[] }
  | { status: 'error' }

interface UseAdditionalProductsResult {
  state: AdditionalProductsLoadState
  retry: () => void
}

export function useAdditionalProducts(): UseAdditionalProductsResult {
  const [state, setState] = useState<AdditionalProductsLoadState>({
    status: 'loading',
  })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    void fetchAdditionalProducts(controller.signal).then(
      (products) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', products })
        }
      },
      () => {
        if (!controller.signal.aborted) {
          setState({ status: 'error' })
        }
      },
    )

    return () => controller.abort()
  }, [requestVersion])

  return {
    state,
    retry: () => {
      setState({ status: 'loading' })
      setRequestVersion((version) => version + 1)
    },
  }
}
