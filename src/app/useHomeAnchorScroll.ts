import { useEffect } from 'react'
import { getHomeAnchorId, type Route } from './routes.ts'

export function useHomeAnchorScroll(
  route: Route,
  hash: string,
  prefersReducedMotion: boolean,
): void {
  useEffect(() => {
    if (route.page !== 'home') {
      return
    }

    const anchorId = getHomeAnchorId(hash)

    if (anchorId === null) {
      return
    }

    // Wait for the localized home route to commit its section targets.
    const animationFrame = window.requestAnimationFrame(() => {
      document.getElementById(anchorId)?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [hash, prefersReducedMotion, route.page])
}
