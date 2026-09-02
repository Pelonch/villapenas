import { amenityImageSources } from '../config/amenities.ts'
import type { InstagramPost } from '../types/instagram.ts'

export const mockInstagramPosts = [
  {
    id: 'pool-at-dusk',
    mediaType: 'VIDEO',
    mediaUrl: amenityImageSources.pool[2],
    thumbnailUrl: amenityImageSources.pool[2],
  },
  {
    id: 'rancho-gathering',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: amenityImageSources.rancho[0],
  },
  {
    id: 'bbq-after-dark',
    mediaType: 'IMAGE',
    mediaUrl: amenityImageSources.bbq[1],
  },
  {
    id: 'pool-and-gardens',
    mediaType: 'IMAGE',
    mediaUrl: amenityImageSources.pool[0],
  },
  {
    id: 'playground-afternoon',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: amenityImageSources.pool[1],
  },
  {
    id: 'open-air-rancho',
    mediaType: 'IMAGE',
    mediaUrl: amenityImageSources.rancho[1],
  },
] as const satisfies readonly InstagramPost[]
