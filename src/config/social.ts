import type { SocialMediaItem } from '../types/social.ts'

export const socialConfig = {
  instagram: {
    handle: '@eventos_villapena',
    profileUrl: 'https://www.instagram.com/eventos_villapena/',
  },
} as const

export const curatedSocialMediaItems = [
  {
    id: 'outdoor-celebration',
    mediaType: 'IMAGE',
    mediaUrl: '/images/moments/moment-01.svg',
    featured: true,
    order: 1,
    layout: 'tall',
  },
  {
    id: 'shared-table',
    mediaType: 'CAROUSEL',
    mediaUrl: '/images/moments/moment-02.svg',
    order: 2,
    layout: 'feature',
  },
  {
    id: 'celebration-detail',
    mediaType: 'IMAGE',
    mediaUrl: '/images/moments/moment-03.svg',
    order: 3,
    layout: 'standard',
  },
  {
    id: 'afternoon-gathering',
    mediaType: 'VIDEO',
    mediaUrl: '/images/moments/moment-04.svg',
    thumbnailUrl: '/images/moments/moment-04.svg',
    order: 4,
    layout: 'wide',
  },
  {
    id: 'special-moment',
    mediaType: 'VIDEO',
    mediaUrl: '/images/moments/moment-05.svg',
    thumbnailUrl: '/images/moments/moment-05.svg',
    order: 5,
    layout: 'tall',
  },
  {
    id: 'villa-details',
    mediaType: 'IMAGE',
    mediaUrl: '/images/moments/moment-06.svg',
    order: 6,
    layout: 'standard',
  },
] as const satisfies readonly SocialMediaItem[]
