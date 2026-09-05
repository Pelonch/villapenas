import { useEffect, useState } from 'react'
import { getInstagramPosts } from '../services/instagram.ts'
import type { InstagramPostWithPreview } from '../types/instagram.ts'

export type InstagramPostsLoadState =
  | { status: 'loading' }
  | { status: 'success'; posts: readonly InstagramPostWithPreview[] }
  | { status: 'error' }

interface UseInstagramPostsResult {
  state: InstagramPostsLoadState
  retry: () => void
}

export function useInstagramPosts(): UseInstagramPostsResult {
  const [state, setState] = useState<InstagramPostsLoadState>({ status: 'loading' })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    void getInstagramPosts(controller.signal).then(
      (posts) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', posts })
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
