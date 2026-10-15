/** Responsive, uncropped photographs from the professional Villa Peñas session. */
interface AmenityPhotoSource {
  src: string
  srcSet: string
  width: number
  height: number
}

function photo(id: string, width: number, height: number): AmenityPhotoSource {
  const base = `/images/amenity/${id}`

  return {
    src: `${base}-1920w.webp`,
    srcSet: [960, 1920, 2880].map((size) => `${base}-${size}w.webp ${size}w`).join(', '),
    width,
    height,
  }
}

export const amenityImageSources = {
  rancho: [
    photo('amenity01.1', 3840, 5760),
    photo('amenity01.2', 5883, 3922),
    photo('amenity01.3', 5872, 3915),
  ],
  pool: [
    photo('amenity02.3', 5696, 7594),
    photo('amenity02.2', 5857, 3905),
    photo('amenity02.1', 6144, 8192),
  ],
  bbq: [
    photo('amenity03.1', 6000, 4000),
    photo('amenity03.2', 5886, 3924),
    photo('amenity03.3', 3947, 5921),
  ],
} as const
