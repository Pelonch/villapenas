import { homeExperienceConfig } from '../../config/homeExperience.ts'
import { siteConfig } from '../../config/site.ts'

export type LoaderPhase = 'visible' | 'leaving'

interface InitialLoaderProps {
  phase: LoaderPhase
  tagline: string
}

export function InitialLoader({ phase, tagline }: InitialLoaderProps) {
  const animation = homeExperienceConfig.loader.animation

  return (
    <div
      className={`fixed inset-0 z-60 grid place-items-center overflow-hidden bg-ink px-6 text-paper transition-opacity ease-out ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${homeExperienceConfig.loader.exitDurationMs}ms` }}
    >
      <div className="vp-loader-atmosphere absolute inset-0" aria-hidden="true" />
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <svg
          className="vp-loader-mark h-auto w-full max-w-[20rem] text-paper sm:max-w-[23rem]"
          viewBox="0 0 320 82"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="vp-loader-roof"
            d="M8 63 72 9l74 40 90-5"
            pathLength={1}
            style={{
              animationDelay: `${animation.mainRoofDrawDelayMs}ms`,
              animationDuration: `${animation.mainRoofDrawDurationMs}ms`,
            }}
          />
          <path
            className="vp-loader-roof vp-loader-roof-accent"
            d="m236 44 22-20 54 39"
            pathLength={1}
            style={{
              animationDelay: `${animation.secondaryRoofDrawDelayMs}ms`,
              animationDuration: `${animation.secondaryRoofDrawDurationMs}ms`,
            }}
          />
          <g
            className="vp-loader-windows"
            style={{
              animationDelay: `${animation.windowsRevealDelayMs}ms`,
              animationDuration: `${animation.windowsRevealDurationMs}ms`,
            }}
          >
            <rect x="258" y="48" width="7" height="7" />
            <rect x="269" y="48" width="7" height="7" />
            <rect x="258" y="59" width="7" height="7" />
            <rect x="269" y="59" width="7" height="7" />
          </g>
        </svg>
        <p
          className="vp-loader-title mt-6 font-display text-5xl uppercase tracking-[-0.06em] sm:text-6xl"
          style={{
            animationDelay: `${animation.wordmarkRevealDelayMs}ms`,
            animationDuration: `${animation.copyRevealDurationMs}ms`,
          }}
        >
          {siteConfig.businessName}
        </p>
        <p
          className="vp-loader-tagline mt-6 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.23em] text-cream sm:text-xs"
          style={{
            animationDelay: `${animation.taglineRevealDelayMs}ms`,
            animationDuration: `${animation.copyRevealDurationMs}ms`,
          }}
        >
          {tagline}
        </p>
      </div>
    </div>
  )
}
