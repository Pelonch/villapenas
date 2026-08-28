import { useEffect, useState } from 'react'
import { fetchPackages } from '../services/packages.ts'
import type { VenuePackage } from '../types/packages.ts'

export type PackagesLoadState =
  | { status: 'loading' }
  | { status: 'success'; packages: readonly VenuePackage[] }
  | { status: 'error' }

interface UsePackagesResult {
  state: PackagesLoadState
  retry: () => void
}

export function usePackages(): UsePackagesResult {
  const [state, setState] = useState<PackagesLoadState>({ status: 'loading' })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    void fetchPackages(controller.signal).then(
      (packages) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', packages })
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
