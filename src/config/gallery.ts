import galleryPhotoCatalog from './galleryPhotos.json'
import type { GalleryCategoryId, Locale } from '../i18n/types.ts'

export const galleryCategoryIds = [
  'pool',
  'rancho',
  'bbq',
  'playground',
  'outdoors',
  'aerial',
] as const satisfies readonly GalleryCategoryId[]

interface GalleryImageVariant {
  src: string
  width: number
  height: number
}

export interface GalleryPhoto {
  id: string
  category: GalleryCategoryId
  alt: Record<Locale, string>
  images: {
    sm: GalleryImageVariant
    md: GalleryImageVariant
    full: GalleryImageVariant
  }
}

function isGalleryCategory(category: string): category is GalleryCategoryId {
  return galleryCategoryIds.some((candidate) => candidate === category)
}

export const galleryPhotos: readonly GalleryPhoto[] = galleryPhotoCatalog.photos.map(
  (photo) => {
    if (!isGalleryCategory(photo.category)) {
      throw new Error(`Unsupported gallery category: ${photo.category}`)
    }

    return {
      id: photo.id,
      category: photo.category,
      alt: photo.alt,
      images: photo.images,
    }
  },
)

if (galleryPhotos.length !== galleryPhotoCatalog.photoCount) {
  throw new Error('Gallery photo catalog count does not match its photos.')
}
