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
  activo: boolean
}

interface AdditionalProductOptionDto {
  id: number
  productoAdicionalId: number
  extraHours: number | null
  nombre: string
  descripcion: string | null
  unidadMedida: string | null
  cantidadIncluida: number | null
  cantidadPersonas: number | null
  precioVentaColones: number
  activo: boolean
  orden: number
  productoAdicional: AdditionalProductDto
}

interface AdditionalProductOptionsResponseDto {
  datos: readonly AdditionalProductOptionDto[]
}

type JsonRecord = Record<string, unknown>

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readNonNegativeWholeNumber(value: unknown): number | null {
  const number = readFiniteNumber(value)

  return number !== null && number >= 0 && Number.isInteger(number) ? number : null
}

function readString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function readBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null
}

function parseAdditionalProduct(value: unknown): AdditionalProductDto | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readFiniteNumber(value.id)
  const nombre = readString(value.nombre)
  const activo = readBoolean(value.activo)

  if (id === null || nombre === null || activo === null) {
    return null
  }

  return {
    id,
    nombre,
    descripcion: readString(value.descripcion),
    imagenUrl: readString(value.imagenUrl),
    activo,
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
  const activo = readBoolean(value.activo)
  const orden = readFiniteNumber(value.orden)
  const productoAdicional = parseAdditionalProduct(value.productoAdicional)

  if (
    id === null ||
    productoAdicionalId === null ||
    nombre === null ||
    precioVentaColones === null ||
    activo === null ||
    orden === null ||
    productoAdicional === null ||
    productoAdicional.id !== productoAdicionalId
  ) {
    return null
  }

  return {
    id,
    productoAdicionalId,
    extraHours: readNonNegativeWholeNumber(value.extraHours),
    nombre,
    descripcion: readString(value.descripcion),
    unidadMedida: readString(value.unidadMedida),
    cantidadIncluida: readFiniteNumber(value.cantidadIncluida),
    cantidadPersonas: readFiniteNumber(value.cantidadPersonas),
    precioVentaColones,
    activo,
    orden,
    productoAdicional,
  }
}

function parseAdditionalProductOptionsResponse(
  value: unknown,
): AdditionalProductOptionsResponseDto {
  if (!isRecord(value) || !Array.isArray(value.datos)) {
    throw new Error('Invalid additional product options response.')
  }

  const options: AdditionalProductOptionDto[] = []

  for (const optionValue of value.datos) {
    const option = parseAdditionalProductOption(optionValue)

    if (option === null) {
      throw new Error('Invalid additional product option in response.')
    }

    options.push(option)
  }

  return { datos: options }
}

function toAdditionalProductOption(
  option: AdditionalProductOptionDto,
): AdditionalProductOption {
  return {
    id: option.id,
    productId: option.productoAdicionalId,
    name: option.nombre,
    description: option.descripcion,
    // Future duration-bearing options must provide this numeric field explicitly.
    extraHours: readNonNegativeWholeNumber(option.extraHours),
    includedQuantity: option.cantidadIncluida,
    peopleQuantity: option.cantidadPersonas,
    unitOfMeasure: option.unidadMedida,
    priceColones: option.precioVentaColones,
    order: option.orden,
  }
}

function toAdditionalProducts(
  options: readonly AdditionalProductOptionDto[],
): readonly AdditionalProduct[] {
  const products = new Map<
    number,
    Omit<AdditionalProduct, 'options'> & { options: AdditionalProductOption[] }
  >()

  for (const option of options) {
    if (!option.activo || !option.productoAdicional.activo) {
      continue
    }

    const product = products.get(option.productoAdicionalId)

    if (product) {
      product.options.push(toAdditionalProductOption(option))
      continue
    }

    products.set(option.productoAdicionalId, {
      id: option.productoAdicional.id,
      name: option.productoAdicional.nombre,
      description: option.productoAdicional.descripcion,
      imageUrl: option.productoAdicional.imagenUrl,
      options: [toAdditionalProductOption(option)],
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
  const url = apiConfig.getUrl('opciones-productos-adicionales')
  url.searchParams.set('activo', 'true')
  url.searchParams.set('limite', '100')

  const request: RequestInit = { headers: { Accept: 'application/json' } }

  if (signal) {
    request.signal = signal
  }

  const response = await fetch(url, request)

  if (!response.ok) {
    throw new Error('Unable to load additional products.')
  }

  const optionsResponse = parseAdditionalProductOptionsResponse(await response.json())

  return toAdditionalProducts(optionsResponse.datos)
}
