import type { TranslationCatalog } from './types.ts'

export const es = {
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
        eyebrow: 'Santa Cruz, Guanacaste',
        heading: 'Villa Peñas',
        placeholder:
          'El Hero cinematográfico se desarrollará en un próximo hito.',
        status: 'Base estructural',
      },
      location: {
        eyebrow: 'Ubicación',
        heading: 'Un lugar para reunirse',
        placeholder:
          'La composición de ubicación y el mapa se desarrollarán en esta sección.',
        status: 'Sección en desarrollo',
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
