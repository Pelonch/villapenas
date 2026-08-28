const packagePlaceholderImageSrc = '/images/brand/amenity-placeholder.png'

export const packageImageSources: Readonly<Record<number, string>> = {}

export function getPackageImageSource(packageId: number): string {
  return packageImageSources[packageId] ?? packagePlaceholderImageSrc
}
