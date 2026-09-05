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
      desktopVideo: '/videos/hero.mp4',
      mobileVideo: '/videos/hero.mp4',
      poster: undefined,
    },
    aerial: {
      video: '/videos/air.mp4',
      poster: undefined,
    },
  },
} as const
