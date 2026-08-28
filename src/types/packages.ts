export interface PackageService {
  id: number
  serviceId: number
  name: string
  quantity: number | null
  detail: string | null
  order: number
}

export interface VenuePackage {
  id: number
  name: string
  description: string | null
  priceColones: number
  services: readonly PackageService[]
}
