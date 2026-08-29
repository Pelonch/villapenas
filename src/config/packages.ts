import { provisionalVenueImageSrc } from './images.ts'

// Backend package IDs are the only stable package identifiers currently available.
export const packageImageSources: Readonly<Record<number, string>> = {
  1: '/images/packages/essentials.jpg',
  2: '/images/packages/premium.jpg',
  3: '/images/packages/courtesy.jpg',
}

export function getPackageImageSource(packageId: number): string {
  return packageImageSources[packageId] ?? provisionalVenueImageSrc
}
