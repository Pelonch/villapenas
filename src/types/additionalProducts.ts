export interface AdditionalProductOption {
  id: number
  productId: number
  extraHours: number | null
  name: string
  description: string | null
  includedQuantity: number | null
  peopleQuantity: number | null
  unitOfMeasure: string | null
  priceColones: number
  order: number
}

export interface AdditionalProduct {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  options: readonly AdditionalProductOption[]
}
