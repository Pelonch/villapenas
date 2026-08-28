import { apiConfig } from '../config/api.ts'
import type { PackageService, VenuePackage } from '../types/packages.ts'

interface ServiceDto {
  id: number
  nombre: string
  descripcion: string | null
  unidadMedida: string | null
  activo: boolean
}

interface PackageServiceDto {
  id: number
  paqueteId: number
  servicioId: number
  cantidad: number | null
  detalle: string | null
  orden: number
  servicio: ServiceDto
}

interface PackageDto {
  id: number
  nombre: string
  descripcion: string | null
  precioColones: number
  activo: boolean
  paquetesServicios: readonly PackageServiceDto[]
}

interface PackagesResponseDto {
  datos: readonly PackageDto[]
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

function readBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null
}

function parseService(value: unknown): ServiceDto | null {
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
    unidadMedida: readString(value.unidadMedida),
    activo,
  }
}

function parsePackageService(value: unknown): PackageServiceDto | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readFiniteNumber(value.id)
  const paqueteId = readFiniteNumber(value.paqueteId)
  const servicioId = readFiniteNumber(value.servicioId)
  const orden = readFiniteNumber(value.orden)
  const servicio = parseService(value.servicio)

  if (
    id === null ||
    paqueteId === null ||
    servicioId === null ||
    orden === null ||
    servicio === null
  ) {
    return null
  }

  return {
    id,
    paqueteId,
    servicioId,
    cantidad: readFiniteNumber(value.cantidad),
    detalle: readString(value.detalle),
    orden,
    servicio,
  }
}

function parsePackage(value: unknown): PackageDto | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readFiniteNumber(value.id)
  const nombre = readString(value.nombre)
  const precioColones = readFiniteNumber(value.precioColones)
  const activo = readBoolean(value.activo)

  if (id === null || nombre === null || precioColones === null || activo === null) {
    return null
  }

  const packageServices: PackageServiceDto[] = []

  if (Array.isArray(value.paquetesServicios)) {
    for (const packageServiceValue of value.paquetesServicios) {
      const packageService = parsePackageService(packageServiceValue)

      if (packageService === null) {
        return null
      }

      packageServices.push(packageService)
    }
  }

  return {
    id,
    nombre,
    descripcion: readString(value.descripcion),
    precioColones,
    activo,
    paquetesServicios: packageServices,
  }
}

function parsePackagesResponse(value: unknown): PackagesResponseDto {
  if (!isRecord(value) || !Array.isArray(value.datos)) {
    throw new Error('Invalid packages response.')
  }

  const packages: PackageDto[] = []

  for (const packageValue of value.datos) {
    const venuePackage = parsePackage(packageValue)

    if (venuePackage === null) {
      throw new Error('Invalid package in response.')
    }

    packages.push(venuePackage)
  }

  return { datos: packages }
}

function toPackageService(packageService: PackageServiceDto): PackageService {
  return {
    id: packageService.id,
    serviceId: packageService.servicioId,
    name: packageService.servicio.nombre,
    quantity: packageService.cantidad,
    detail: packageService.detalle,
    order: packageService.orden,
  }
}

function toVenuePackage(packageDto: PackageDto): VenuePackage {
  const services = packageDto.paquetesServicios
    .map((packageService, index) => ({ packageService, index }))
    .filter(({ packageService }) => packageService.servicio.activo)
    .sort(
      (first, second) =>
        first.packageService.orden - second.packageService.orden ||
        first.index - second.index,
    )
    .map(({ packageService }) => toPackageService(packageService))

  return {
    id: packageDto.id,
    name: packageDto.nombre,
    description: packageDto.descripcion,
    priceColones: packageDto.precioColones,
    services,
  }
}

export async function fetchPackages(
  signal?: AbortSignal,
): Promise<readonly VenuePackage[]> {
  const url = new URL(`${apiConfig.baseUrl}/paquetes`, window.location.origin)
  url.searchParams.set('activo', 'true')
  url.searchParams.set('limite', '100')

  const request: RequestInit = { headers: { Accept: 'application/json' } }

  if (signal) {
    request.signal = signal
  }

  const response = await fetch(url, request)

  if (!response.ok) {
    throw new Error('Unable to load packages.')
  }

  const packagesResponse = parsePackagesResponse(await response.json())

  return packagesResponse.datos
    .filter((venuePackage) => venuePackage.activo)
    .map(toVenuePackage)
}
