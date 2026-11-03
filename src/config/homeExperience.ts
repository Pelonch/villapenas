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
      desktop: {
        video: '/videos/hero/hero-desktop.mp4',
        poster: '/images/hero/hero-poster.webp',
      },
      mobile: {
        video: '/videos/hero/hero-mobile.mp4',
        poster: '/images/hero/hero-mobile-poster.webp',
      },
    },
    aerial: {
      desktop: {
        previewVideo: '/videos/aerial/aerial-desktop-preview.mp4',
        fullVideo: '/videos/aerial/aerial-desktop-full.mp4',
        poster: '/images/aerial/aerial-desktop-poster.webp',
      },
      mobile: {
        previewVideo: '/videos/aerial/aerial-mobile-preview.mp4',
        fullVideo: '/videos/aerial/aerial-mobile-full.mp4',
        poster: '/images/aerial/aerial-mobile-poster.webp',
      },
    },
  },
} as const
