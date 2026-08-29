import { useEffect, useState } from 'react'
import { RouteView } from './app/RouteView.tsx'
import { useCurrentRoute } from './app/useCurrentRoute.ts'
import { useHomeAnchorScroll } from './app/useHomeAnchorScroll.ts'
import { homeExperienceConfig } from './config/homeExperience.ts'
import { InitialLoader, type LoaderPhase } from './components/home/InitialLoader.tsx'
import { SiteFooter } from './components/layout/SiteFooter.tsx'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import { usePageMetadata } from './app/metadata.ts'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.ts'
import { getTranslations } from './i18n/translations.ts'

type InitialLoaderPhase = LoaderPhase | 'complete'
type HeroMediaState = 'loading' | 'ready' | 'unavailable'

const initialEntrySessionKey = 'villa-penas-initial-entry'

function claimInitialEntry(): boolean {
  try {
    const hasEntered = window.sessionStorage.getItem(initialEntrySessionKey) === 'true'

    window.sessionStorage.setItem(initialEntrySessionKey, 'true')

    return !hasEntered
  } catch {
    return true
  }
}

function App() {
  const { location, route } = useCurrentRoute()
  const [isInitialEntry] = useState(claimInitialEntry)
  const [shouldShowInitialLoader] = useState(
    () => isInitialEntry && !route.isNotFound && route.page === 'home',
  )
  const [loaderPhase, setLoaderPhase] = useState<InitialLoaderPhase>(
    shouldShowInitialLoader ? 'visible' : 'complete',
  )
  const [heroMediaState, setHeroMediaState] = useState<HeroMediaState>('loading')
  const [minimumLoaderDurationElapsed, setMinimumLoaderDurationElapsed] = useState(false)
  const [maximumLoaderWaitElapsed, setMaximumLoaderWaitElapsed] = useState(false)
  const [isHeroHeaderVisible, setIsHeroHeaderVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  usePageMetadata(route)
  useHomeAnchorScroll(route, location.hash, prefersReducedMotion)

  useEffect(() => {
    if (!shouldShowInitialLoader) {
      return
    }

    const minimumDurationTimer = window.setTimeout(() => {
      setMinimumLoaderDurationElapsed(true)
    }, homeExperienceConfig.loader.minimumDurationMs)
    const maximumWaitTimer = window.setTimeout(() => {
      setMaximumLoaderWaitElapsed(true)
    }, homeExperienceConfig.loader.maximumWaitMs)

    return () => {
      window.clearTimeout(minimumDurationTimer)
      window.clearTimeout(maximumWaitTimer)
    }
  }, [shouldShowInitialLoader])

  useEffect(() => {
    if (
      loaderPhase !== 'visible' ||
      !minimumLoaderDurationElapsed ||
      (!prefersReducedMotion &&
        heroMediaState === 'loading' &&
        !maximumLoaderWaitElapsed)
    ) {
      return
    }

    const transitionTimer = window.setTimeout(() => {
      setLoaderPhase('leaving')
    }, 0)

    return () => {
      window.clearTimeout(transitionTimer)
    }
  }, [
    heroMediaState,
    loaderPhase,
    maximumLoaderWaitElapsed,
    minimumLoaderDurationElapsed,
    prefersReducedMotion,
  ])

  useEffect(() => {
    if (loaderPhase !== 'leaving') {
      return
    }

    const exitTimer = window.setTimeout(
      () => setLoaderPhase('complete'),
      prefersReducedMotion ? 0 : homeExperienceConfig.loader.exitDurationMs,
    )

    return () => {
      window.clearTimeout(exitTimer)
    }
  }, [loaderPhase, prefersReducedMotion])

  const isHomeExperienceActive =
    !route.isNotFound && route.page === 'home' && loaderPhase === 'complete'
  const headerVisibility =
    route.isNotFound || route.page !== 'home' || (isHomeExperienceActive && isHeroHeaderVisible)
      ? 'visible'
      : 'hidden'
  const loaderContent = getTranslations(route.locale).loader

  return (
    <div>
      <SiteHeader
        location={location}
        route={route}
        visibility={headerVisibility}
      />
      <main>
        <RouteView
          route={route}
          isHomeExperienceActive={isHomeExperienceActive}
          onHeroHeaderVisibilityChange={setIsHeroHeaderVisible}
          onHeroMediaReady={() => setHeroMediaState('ready')}
          onHeroMediaUnavailable={() => setHeroMediaState('unavailable')}
        />
      </main>
      <SiteFooter location={location} route={route} />
      {shouldShowInitialLoader && loaderPhase !== 'complete' ? (
        <InitialLoader phase={loaderPhase} tagline={loaderContent.tagline} />
      ) : null}
    </div>
  )
}

export default App
