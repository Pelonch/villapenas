import { useEffect, useRef, useState } from 'react'
import { homeExperienceConfig } from '../../config/homeExperience.ts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import type { HeroContent } from '../../i18n/types.ts'
import { AerialPreview } from './AerialPreview.tsx'

interface HeroProps {
  content: HeroContent
  isExperienceActive: boolean
  onHeaderVisibilityChange: (isVisible: boolean) => void
  onMediaReady: () => void
  onMediaUnavailable: () => void
}

export function Hero({
  content,
  isExperienceActive,
  onHeaderVisibilityChange,
  onMediaReady,
  onMediaUnavailable,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const showHeaderTriggerRef = useRef<HTMLSpanElement>(null)
  const hideHeaderTriggerRef = useRef<HTMLSpanElement>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches,
  )
  const [failedVideoSource, setFailedVideoSource] = useState<string | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const videoSource =
    prefersReducedMotion
      ? null
      : isMobileViewport
        ? homeExperienceConfig.media.hero.mobileVideo
        : homeExperienceConfig.media.hero.desktopVideo
  const isVideoUnavailable =
    videoSource !== null && failedVideoSource === videoSource

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateViewport = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches)
    }

    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    const showTrigger = showHeaderTriggerRef.current
    const hideTrigger = hideHeaderTriggerRef.current

    if (!showTrigger || !hideTrigger) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      onHeaderVisibilityChange(true)
      return
    }

    onHeaderVisibilityChange(false)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === showTrigger && !entry.isIntersecting) {
            onHeaderVisibilityChange(true)
          }

          if (entry.target === hideTrigger && entry.isIntersecting) {
            onHeaderVisibilityChange(false)
          }
        }
      },
      { threshold: 0 },
    )

    observer.observe(showTrigger)
    observer.observe(hideTrigger)

    return () => {
      observer.disconnect()
    }
  }, [onHeaderVisibilityChange])

  function handleMediaReady() {
    onMediaReady()

    const video = videoRef.current

    if (!video) {
      return
    }

    void video.play().catch(() => {
      setFailedVideoSource(videoSource)
    })
  }

  function handleMediaFailure() {
    setFailedVideoSource(videoSource)
    onMediaUnavailable()
  }

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-clip bg-ink text-paper sm:min-h-screen"
      aria-labelledby="home-title"
    >
      <div className="vp-hero-fallback absolute inset-0" aria-hidden="true" />
      {videoSource && !isVideoUnavailable ? (
        <video
          ref={videoRef}
          key={videoSource}
          className="absolute inset-0 size-full object-cover"
          src={videoSource}
          poster={homeExperienceConfig.media.hero.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={handleMediaReady}
          onError={handleMediaFailure}
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-ink/20"
        aria-hidden="true"
      />
      <h1 id="home-title" className="sr-only">
        {content.heading}
      </h1>
      <span
        ref={hideHeaderTriggerRef}
        className="pointer-events-none absolute left-0 top-[24%] size-px"
        aria-hidden="true"
      />
      <span
        ref={showHeaderTriggerRef}
        className="pointer-events-none absolute left-0 top-[40%] size-px"
        aria-hidden="true"
      />
      <AerialPreview content={content} isExperienceActive={isExperienceActive} />
    </section>
  )
}
