import { apiConfig } from '../config/api.ts'
import type {
  AdditionalProduct,
  AdditionalProductOption,
} from '../types/additionalProducts.ts'

interface AdditionalProductDto {
  id: number
  nombre: string
  descripcion: string | null
  imagenUrl: string | null
}

interface AdditionalProductOptionDto {
  id: number
  productoAdicionalId: number
  nombre: string
  descripcion: string | null
  unidadMedida: string | null
  cantidadIncluida: number | null
  cantidadPersonas: number | null
  precioVentaColones: number
  productoAdicional: AdditionalProductDto
}

type JsonRecord = Record<string, unknown>

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function parseAdditionalProduct(value: unknown): AdditionalProductDto | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readFiniteNumber(value.id)
  const nombre = readString(value.nombre)

  if (id === null || nombre === null) {
    return null
  }

  return {
    id,
    nombre,
    descripcion: readString(value.descripcion),
    imagenUrl: readString(value.imagenUrl),
  }
}

function parseAdditionalProductOption(
  value: unknown,
): AdditionalProductOptionDto | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readFiniteNumber(value.id)
  const productoAdicionalId = readFiniteNumber(value.productoAdicionalId)
  const nombre = readString(value.nombre)
  const precioVentaColones = readFiniteNumber(value.precioVentaColones)
  const productoAdicional = parseAdditionalProduct(value.productoAdicional)

  if (
    id === null ||
    productoAdicionalId === null ||
    nombre === null ||
    precioVentaColones === null ||
    productoAdicional === null ||
    productoAdicional.id !== productoAdicionalId
  ) {
    return null
  }

  return {
    id,
    productoAdicionalId,
    nombre,
    descripcion: readString(value.descripcion),
    unidadMedida: readString(value.unidadMedida),
    cantidadIncluida: readFiniteNumber(value.cantidadIncluida),
    cantidadPersonas: readFiniteNumber(value.cantidadPersonas),
    precioVentaColones,
    productoAdicional,
  }
}

function parseAdditionalProductOptionsResponse(
  value: unknown,
): readonly AdditionalProductOptionDto[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid additional product options response.')
  }

  const options: AdditionalProductOptionDto[] = []

  for (const optionValue of value) {
    const option = parseAdditionalProductOption(optionValue)

    if (option === null) {
      throw new Error('Invalid additional product option in response.')
    }

    options.push(option)
  }

  return options
}

function toAdditionalProductOption(
  option: AdditionalProductOptionDto,
  order: number,
): AdditionalProductOption {
  return {
    id: option.id,
    productId: option.productoAdicionalId,
    // The public response has no duration metadata, so selected options add no time.
    extraHours: null,
    name: option.nombre,
    description: option.descripcion,
    includedQuantity: option.cantidadIncluida,
    peopleQuantity: option.cantidadPersonas,
    unitOfMeasure: option.unidadMedida,
    priceColones: option.precioVentaColones,
    order,
  }
}

function toAdditionalProducts(
  options: readonly AdditionalProductOptionDto[],
): readonly AdditionalProduct[] {
  const products = new Map<
    number,
    Omit<AdditionalProduct, 'options'> & { options: AdditionalProductOption[] }
  >()

  for (const [order, option] of options.entries()) {
    const product = products.get(option.productoAdicionalId)

    if (product) {
      product.options.push(toAdditionalProductOption(option, order))
      continue
    }

    products.set(option.productoAdicionalId, {
      id: option.productoAdicional.id,
      name: option.productoAdicional.nombre,
      description: option.productoAdicional.descripcion,
      imageUrl: option.productoAdicional.imagenUrl,
      options: [toAdditionalProductOption(option, order)],
    })
  }

  return Array.from(products.values()).map((product) => ({
    ...product,
    options: [...product.options].sort(
      (first, second) => first.order - second.order || first.id - second.id,
    ),
  }))
}

export async function fetchAdditionalProducts(
  signal?: AbortSignal,
): Promise<readonly AdditionalProduct[]> {
  const url = apiConfig.getUrl('public/opciones-productos-adicionales')

  const request: RequestInit = { headers: { Accept: 'application/json' } }

  if (signal) {
    request.signal = signal
  }

  const response = await fetch(url, request)

  if (!response.ok) {
    throw new Error('Unable to load additional products.')
  }

  const optionsResponse = parseAdditionalProductOptionsResponse(await response.json())

  return toAdditionalProducts(optionsResponse)
}
