import type { TranslationCatalog } from './types.ts'

export const es = {
  loader: {
    tagline: 'Tu momento comienza aquí',
  },
  navigation: {
    label: 'Navegación principal',
    home: 'Inicio',
    policies: 'Políticas',
    contact: 'Contacto',
    location: 'Ubicación',
    amenities: 'Amenidades',
    packages: 'Paquetes',
    quote: 'Cotizar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  languageSwitcher: {
    label: 'Cambiar idioma',
  },
  footer: {
    navigationLabel: 'Información de Villa Peñas',
    copyright: (year) => `© ${year} Villa Peñas. Todos los derechos reservados.`,
  },
  pages: {
    home: {
      hero: {
        heading: 'Villa Peñas',
        aerialPreviewLabel: 'Vista aérea',
        openAerialDialog: 'Abrir vista aérea ampliada',
        aerialDialogTitle: 'Vista aérea de Villa Peñas',
        closeAerialDialog: 'Cerrar vista aérea',
      },
      location: {
        eyebrow: 'Ubicación',
        heading: 'Cerca de todo,\nlejos de la rutina.',
        description:
          'Villa Peñas se encuentra en Chirco, Santa Cruz, Guanacaste, Costa Rica, en una ubicación de fácil acceso desde Santa Cruz y varios de los principales destinos de la zona.',
        address:
          '1 km sur de la entrada a Moya,\nChirco, Santa Cruz, Guanacaste, Costa Rica.',
        openMaps: 'Abrir en Google Maps',
        openMapsNewTab:
          'Abrir la ubicación de Villa Peñas en Google Maps en una pestaña nueva',
        mapTitle: 'Ubicación de Villa Peñas en Google Maps',
        mapFallbackDescription:
          'Consulta la ubicación exacta y la ruta actualizada en Google Maps.',
        travelTimesLabel: 'Tiempos aproximados en vehículo',
        travelTimeLabels: {
          santaCruz: 'Santa Cruz',
          tamarindo: 'Tamarindo',
          haciendaPinilla: 'Hacienda Pinilla',
          avellanasBeach: 'Playa Avellanas',
          guanacasteAirport: 'Aeropuerto de Guanacaste (LIR)',
        },
        formatTravelTime: (minutes) => `${minutes} min`,
      },
      amenities: {
        eyebrow: 'Amenidades',
        heading: 'Espacios pensados para compartir',
        placeholder:
          'La presentación editorial de las amenidades se desarrollará en esta sección.',
        status: 'Sección en desarrollo',
      },
      packages: {
        eyebrow: 'Paquetes',
        heading: 'Tu celebración, a tu manera',
        placeholder:
          'Los paquetes dinámicos y su información del backend se integrarán en esta sección.',
        status: 'Sección en desarrollo',
      },
      instagram: {
        eyebrow: 'Instagram',
        heading: 'Momentos en Villa Peñas',
        placeholder:
          'La selección visual de Instagram se incorporará en esta sección.',
        status: 'Sección en desarrollo',
      },
      quote: {
        eyebrow: 'Cotización',
        heading: 'Cotiza tu evento',
        placeholder:
          'El cotizador informativo se desarrollará aquí sin crear reservas ni confirmar disponibilidad.',
        status: 'Sección en desarrollo',
      },
    },
    policies: {
      heading: 'Políticas',
      placeholder: 'Las políticas de Villa Peñas se publicarán aquí.',
    },
    contact: {
      heading: 'Contacto',
      placeholder: 'La información de contacto de Villa Peñas estará disponible aquí.',
    },
  },
  metadata: {
    home: {
      title: 'Villa Peñas | Espacio para eventos en Santa Cruz, Guanacaste',
      description:
        'Villa Peñas es un espacio privado para celebraciones y eventos en Santa Cruz, Guanacaste, con piscina, rancho, cocina equipada, área BBQ y más.',
      openGraph: {
        title: 'Villa Peñas | Espacio para eventos en Santa Cruz, Guanacaste',
        description:
          'Villa Peñas es un espacio privado para celebraciones y eventos en Santa Cruz, Guanacaste.',
      },
    },
    policies: {
      title: 'Villa Peñas | Políticas',
      description:
        'Consulta las políticas de adelanto, cancelación y cambios de fecha de Villa Peñas.',
      openGraph: {
        title: 'Villa Peñas | Políticas',
        description: 'Consulta las políticas de Villa Peñas.',
      },
    },
    contact: {
      title: 'Villa Peñas | Contacto',
      description:
        'Encuentra la información de contacto de Villa Peñas en Santa Cruz, Guanacaste.',
      openGraph: {
        title: 'Villa Peñas | Contacto',
        description: 'Encuentra la información de contacto de Villa Peñas.',
      },
    },
  },
} satisfies TranslationCatalog
