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

    let animationFrame = 0
    const scrollToTarget = (behavior: ScrollBehavior) => {
      document.getElementById(anchorId)?.scrollIntoView({
        behavior,
        block: 'start',
      })
    }
    const scheduleScroll = (behavior: ScrollBehavior) => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        scrollToTarget(behavior)
      })
    }

    // The package cards replace their skeleton after the initial fragment scroll.
    // Realign quote links on that one upstream layout transition.
    scheduleScroll(prefersReducedMotion ? 'auto' : 'smooth')

    if (anchorId !== 'cotizador') {
      return () => {
        window.cancelAnimationFrame(animationFrame)
      }
    }

    const packagesSection = document.getElementById('paquetes')

    if (packagesSection?.getAttribute('aria-busy') !== 'true') {
      return () => {
        window.cancelAnimationFrame(animationFrame)
      }
    }

    const observer = new MutationObserver(() => {
      if (packagesSection.getAttribute('aria-busy') === 'true') {
        return
      }

      observer.disconnect()
      scheduleScroll('auto')
    })

    observer.observe(packagesSection, {
      attributeFilter: ['aria-busy'],
      attributes: true,
    })

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [hash, prefersReducedMotion, route.page])
}
