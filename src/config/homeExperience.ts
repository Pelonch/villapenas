export const homeExperienceConfig = {
  loader: {
    minimumDurationMs: 1_900,
    maximumWaitMs: 3_200,
    exitDurationMs: 480,
    animation: {
      mainRoofDrawDelayMs: 100,
      mainRoofDrawDurationMs: 800,
      secondaryRoofDrawDelayMs: 560,
      secondaryRoofDrawDurationMs: 560,
      windowsRevealDelayMs: 1_050,
      windowsRevealDurationMs: 330,
      wordmarkRevealDelayMs: 1_260,
      taglineRevealDelayMs: 1_480,
      copyRevealDurationMs: 350,
    },
  },
  media: {
    hero: {
      desktopVideo: '/videos/hero/hero-desktop.mp4',
      mobileVideo: '/videos/hero/hero-mobile.mp4',
      poster: '/images/hero/hero-poster.webp',
    },
    aerial: {
      video: '/videos/aerial/aerial.mp4',
      poster: '/images/aerial/aerial-poster.webp',
    },
  },
} as const
